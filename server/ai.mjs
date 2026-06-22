// Harmony AI adapter — one feature (legislation -> compliance form scaffold), three providers.
// No paid API key. Selected by AI_PROVIDER env: mock | cli | lmstudio.
//   mock     - deterministic canned scaffold. Demo-safe, always works on stage.
//   cli      - shells out to the local `claude` CLI (a Claude subscription, no API key).
//   lmstudio - local model served by LM Studio's OpenAI-compatible API on
//              http://localhost:1234 (on-prem, the data-sovereignty pitch).
// Any failure degrades gracefully to mock so the demo never breaks.

import { spawn } from 'node:child_process';

// Read env at call time, not module load: vite.config.js injects .env vars into process.env
// after this module is imported, so freezing these as top-level consts would miss .env overrides.
const claudeBin = () => process.env.CLAUDE_BIN || '/Users/vlad3v/.local/bin/claude';
const lmStudioUrl = () => process.env.LMSTUDIO_URL || 'http://localhost:1234';
const lmStudioModel = () => process.env.LMSTUDIO_MODEL || 'llama-3.2-1b-instruct';

const SYS = `You convert Western Australian Government cyber security policy text into a vendor compliance assessment form.
Return ONLY a JSON array (no prose, no markdown fences) of 4-7 objects with exactly these keys:
  "label"   - the field label (string)
  "type"    - one of: checkbox | text | select | upload | yesno
  "required"- true or false
Focus on what a supplier must evidence: Essential Eight ML1, IRAP, ISO 27001, MFA, data residency, right-to-audit.`;

function extractJsonArray(text) {
  if (!text) return null;
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end < start) return null;
  try {
    const arr = JSON.parse(text.slice(start, end + 1));
    if (!Array.isArray(arr) || !arr.length) return null;
    return arr
      .filter((f) => f && f.label)
      .map((f) => ({
        label: String(f.label).slice(0, 120),
        type: ['checkbox', 'text', 'select', 'upload', 'yesno'].includes(f.type) ? f.type : 'text',
        required: !!f.required,
      }));
  } catch {
    return null;
  }
}

export function mockFields(legislation = '') {
  const t = (legislation || '').toLowerCase();
  const fields = [
    { label: 'Essential Eight Maturity Level One self-assessment', type: 'upload', required: true },
    { label: 'IRAP assessment evidence', type: 'upload', required: /irap|sensitiv|classif/.test(t) },
    { label: 'ISO 27001 certificate', type: 'upload', required: false },
    { label: 'Data residency & hosting location', type: 'select', required: /residen|onshore|australia|local/.test(t) },
    { label: 'MFA enforcement attestation', type: 'yesno', required: /mfa|multi-factor|access/.test(t) },
    { label: 'Right-to-audit clause acknowledged', type: 'checkbox', required: true },
  ];
  return fields;
}

function runCli(legislation) {
  return new Promise((resolve, reject) => {
    const prompt = `${SYS}\n\nPolicy text:\n"""${legislation}"""`;
    const child = spawn(claudeBin(), ['-p', prompt], { timeout: 60000 });
    let out = '', err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', (e) => reject(e));
    child.on('close', (code) => {
      const fields = extractJsonArray(out);
      if (fields) resolve(fields);
      else reject(new Error(`cli returned no parseable JSON (code ${code}) ${err.slice(0, 120)}`));
    });
  });
}

// LM Studio speaks the OpenAI Chat Completions API. We pin the output to a JSON schema via
// response_format so even a small 1B model returns a clean {fields:[...]} object; extractJsonArray
// still salvages the array if a runtime ignores the schema and wraps it in prose.
async function runLmStudio(legislation) {
  const body = {
    model: lmStudioModel(),
    messages: [
      { role: 'system', content: SYS },
      { role: 'user', content: `Policy text:\n"""${legislation}"""` },
    ],
    temperature: 0.2,
    stream: false,
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'compliance_form',
        strict: true,
        schema: {
          type: 'object',
          properties: {
            fields: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  label: { type: 'string' },
                  type: { type: 'string', enum: ['checkbox', 'text', 'select', 'upload', 'yesno'] },
                  required: { type: 'boolean' },
                },
                required: ['label', 'type', 'required'],
              },
            },
          },
          required: ['fields'],
        },
      },
    },
  };
  const r = await fetch(`${lmStudioUrl()}/v1/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`lmstudio HTTP ${r.status}`);
  const data = await r.json();
  const content = data?.choices?.[0]?.message?.content || '';
  const fields = extractJsonArray(content);
  if (!fields) throw new Error('lmstudio returned no parseable JSON');
  return fields;
}

export async function generateScaffold(legislation) {
  const provider = (process.env.AI_PROVIDER || 'mock').toLowerCase();
  if (provider === 'cli') return { provider: 'cli', fields: await runCli(legislation) };
  if (provider === 'lmstudio') return { provider: `lmstudio:${lmStudioModel()}`, fields: await runLmStudio(legislation) };
  return { provider: 'mock', fields: mockFields(legislation) };
}

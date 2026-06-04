// Harmony AI adapter — one feature (legislation -> compliance form scaffold), four providers.
// No paid API key. Selected by AI_PROVIDER env: mock | cli | ollama | lmstudio.
//   mock     - deterministic canned scaffold. Demo-safe, always works on stage.
//   cli      - shells out to the local `claude` CLI (Vladimir's subscription, no API key).
//   ollama   - local model on http://localhost:11434 (on-prem, the data-sovereignty pitch).
//   lmstudio - local model via LM Studio's OpenAI-compatible API on http://localhost:1234/v1.
// Any failure degrades gracefully to mock so the demo never breaks.

import { spawn } from 'node:child_process';

const DEFAULT_CLAUDE_BIN = '/Users/vlad3v/.local/bin/claude';
const DEFAULT_OLLAMA_URL = 'http://localhost:11434';
const DEFAULT_OLLAMA_MODEL = 'qwen2.5:7b';
const DEFAULT_LMSTUDIO_URL = 'http://localhost:1234/v1';
const DEFAULT_LMSTUDIO_MODEL = 'qwen/qwen3.5-9b';
const DEFAULT_AI_TIMEOUT_MS = 8000;

function env(name, fallback) {
  return process.env[name] || fallback;
}

function aiTimeoutMs() {
  const ms = Number(process.env.AI_TIMEOUT_MS);
  return Number.isFinite(ms) && ms > 0 ? ms : DEFAULT_AI_TIMEOUT_MS;
}

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
    const child = spawn(env('CLAUDE_BIN', DEFAULT_CLAUDE_BIN), ['-p', prompt], { timeout: 60000 });
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

async function fetchJsonWithTimeout(url, options, label) {
  const timeoutMs = aiTimeoutMs();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const r = await fetch(url, { ...options, signal: controller.signal });
    if (!r.ok) throw new Error(`${label} HTTP ${r.status}`);
    return await r.json();
  } catch (e) {
    if (e?.name === 'AbortError') throw new Error(`${label} timed out after ${timeoutMs}ms`);
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}

async function runOllama(legislation) {
  const model = env('OLLAMA_MODEL', DEFAULT_OLLAMA_MODEL);
  const body = {
    model,
    prompt: `${SYS}\n\nPolicy text:\n"""${legislation}"""\n\nJSON:`,
    stream: false,
    options: { temperature: 0.2 },
  };
  const data = await fetchJsonWithTimeout(`${env('OLLAMA_URL', DEFAULT_OLLAMA_URL)}/api/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  }, 'ollama');
  const fields = extractJsonArray(data.response || '');
  if (!fields) throw new Error('ollama returned no parseable JSON');
  return fields;
}

async function runLmStudio(legislation) {
  // LM Studio exposes an OpenAI-compatible server (Developer tab / `lms server start`).
  const model = env('LMSTUDIO_MODEL', DEFAULT_LMSTUDIO_MODEL);
  const body = {
    model,
    temperature: 0.2,
    stream: false,
    messages: [
      { role: 'system', content: SYS },
      { role: 'user', content: `Policy text:\n"""${legislation}"""\n\nJSON:` },
    ],
  };
  const data = await fetchJsonWithTimeout(`${env('LMSTUDIO_URL', DEFAULT_LMSTUDIO_URL)}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  }, 'lmstudio');
  const fields = extractJsonArray(data?.choices?.[0]?.message?.content || '');
  if (!fields) throw new Error('lmstudio returned no parseable JSON');
  return fields;
}

export async function generateScaffold(legislation) {
  const provider = (process.env.AI_PROVIDER || 'mock').toLowerCase();
  if (provider === 'cli') return { provider: 'cli', fields: await runCli(legislation) };
  if (provider === 'ollama') return { provider: `ollama:${env('OLLAMA_MODEL', DEFAULT_OLLAMA_MODEL)}`, fields: await runOllama(legislation) };
  if (provider === 'lmstudio') return { provider: `lmstudio:${env('LMSTUDIO_MODEL', DEFAULT_LMSTUDIO_MODEL)}`, fields: await runLmStudio(legislation) };
  return { provider: 'mock', fields: mockFields(legislation) };
}

import { generateScaffold, mockFields } from './ai.mjs';

const MAX_AI_BODY_BYTES = 16 * 1024;
const MAX_LEGISLATION_CHARS = 4000;

function readJsonBody(req, res) {
  return new Promise((resolve, reject) => {
    let raw = '';
    let bytes = 0;
    let tooLarge = false;
    let settled = false;

    function settle(value) {
      if (settled) return;
      settled = true;
      resolve(value);
    }

    req.on('data', (chunk) => {
      if (tooLarge) return;
      bytes += chunk.length;
      if (bytes > MAX_AI_BODY_BYTES) {
        tooLarge = true;
        raw = '';
        res.statusCode = 413;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify({ error: 'Request body too large' }));
        settle(null);
        return;
      }
      raw += chunk;
    });

    req.on('end', () => {
      if (tooLarge) return;
      try {
        settle(JSON.parse(raw || '{}'));
      } catch {
        settle({});
      }
    });

    req.on('error', (err) => {
      if (!tooLarge) reject(err);
    });
  });
}

export async function handleAiScaffold(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('allow', 'POST');
    return res.end('POST only');
  }

  const payload = await readJsonBody(req, res);
  if (!payload) return;

  const legislation = String(payload.legislation || '').slice(0, MAX_LEGISLATION_CHARS);
  res.setHeader('content-type', 'application/json');
  try {
    const result = await generateScaffold(legislation);
    res.end(JSON.stringify(result));
  } catch (e) {
    // Never break the demo: fall back to the deterministic scaffold.
    res.end(JSON.stringify({
      provider: `${process.env.AI_PROVIDER || 'mock'} (fallback: mock)`,
      fields: mockFields(legislation),
      note: String(e?.message || e),
    }));
  }
}

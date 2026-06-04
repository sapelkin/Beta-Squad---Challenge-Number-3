import { createReadStream } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { handleAiScaffold } from './api.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

async function loadLocalEnv() {
  let text = '';
  try {
    text = await readFile(join(__dirname, '..', '.env'), 'utf8');
  } catch {
    return;
  }

  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function sendText(res, status, text) {
  res.statusCode = status;
  res.setHeader('content-type', 'text/plain; charset=utf-8');
  res.end(text);
}

async function findStaticFile(pathname) {
  const relative = normalize(pathname).replace(/^[/\\]+/, '');
  if (relative.startsWith('..')) return null;

  const candidate = join(distDir, relative || 'index.html');
  try {
    const info = await stat(candidate);
    if (info.isFile()) return candidate;
    if (info.isDirectory()) {
      const index = join(candidate, 'index.html');
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    return join(distDir, 'index.html');
  }

  return join(distDir, 'index.html');
}

async function serveStatic(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const file = await findStaticFile(decodeURIComponent(url.pathname));
  if (!file) return sendText(res, 403, 'Forbidden');

  try {
    res.statusCode = 200;
    res.setHeader('content-type', MIME[extname(file)] || 'application/octet-stream');
    createReadStream(file)
      .on('error', () => sendText(res, 404, 'Not found'))
      .pipe(res);
  } catch {
    sendText(res, 404, 'Not found');
  }
}

await loadLocalEnv();

const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || '127.0.0.1';

createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  if (url.pathname === '/api/ai/scaffold') {
    handleAiScaffold(req, res).catch((e) => sendText(res, 500, String(e?.message || e)));
    return;
  }

  serveStatic(req, res).catch((e) => sendText(res, 500, String(e?.message || e)));
}).listen(port, host, () => {
  console.log(`Harmony listening on http://${host}:${port}`);
});

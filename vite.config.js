import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { handleAiScaffold } from './server/api.mjs';

const AI_ROUTE = '/api/ai/scaffold';
const AI_ENV_KEYS = [
  'AI_PROVIDER',
  'AI_TIMEOUT_MS',
  'CLAUDE_BIN',
  'OLLAMA_URL',
  'OLLAMA_MODEL',
  'LMSTUDIO_URL',
  'LMSTUDIO_MODEL',
];

// Serves POST /api/ai/scaffold in dev and preview so the whole prototype runs locally.
function harmonyAiSidecar() {
  return {
    name: 'harmony-ai-sidecar',
    configureServer(server) {
      server.middlewares.use(AI_ROUTE, handleAiScaffold);
    },
    configurePreviewServer(server) {
      server.middlewares.use(AI_ROUTE, handleAiScaffold);
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load .env into process.env so the server-side AI sidecar (server/ai.mjs) can read
  // AI_PROVIDER, LMSTUDIO_*, OLLAMA_*, CLAUDE_BIN. Shell-exported vars keep priority.
  const env = loadEnv(mode, process.cwd(), '');
  for (const k of AI_ENV_KEYS) {
    if (env[k] && process.env[k] === undefined) process.env[k] = env[k];
  }
  return {
    plugins: [react(), tailwindcss(), harmonyAiSidecar()],
    server: { port: 5174, host: true },
  };
});

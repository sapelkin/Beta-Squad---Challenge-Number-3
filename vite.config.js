import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { generateScaffold, mockFields } from './server/ai.mjs';

// Serves POST /api/ai/scaffold inside the dev server so `npm run dev` runs the whole app.
function harmonyAiSidecar() {
  return {
    name: 'harmony-ai-sidecar',
    configureServer(server) {
      server.middlewares.use('/api/ai/scaffold', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          return res.end('POST only');
        }
        let raw = '';
        req.on('data', (c) => (raw += c));
        req.on('end', async () => {
          let payload = {};
          try { payload = JSON.parse(raw || '{}'); } catch { /* ignore */ }
          const legislation = String(payload.legislation || '').slice(0, 4000);
          res.setHeader('content-type', 'application/json');
          try {
            const result = await generateScaffold(legislation);
            res.end(JSON.stringify(result));
          } catch (e) {
            // never break the demo: fall back to the deterministic scaffold
            res.end(JSON.stringify({
              provider: `${process.env.AI_PROVIDER || 'mock'} (fallback: mock)`,
              fields: mockFields(legislation),
              note: String(e?.message || e),
            }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), harmonyAiSidecar()],
  server: { port: 5174, host: true },
});

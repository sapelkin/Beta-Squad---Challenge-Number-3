// Calls the Harmony AI sidecar (POST /api/ai/scaffold). Provider chosen server-side
// by AI_PROVIDER (mock | cli | ollama). Always resolves — sidecar falls back to mock.
export async function generateScaffold(legislation) {
  const res = await fetch('/api/ai/scaffold', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ legislation }),
  });
  if (!res.ok) throw new Error(`scaffold HTTP ${res.status}`);
  return res.json(); // { provider, fields: [{label,type,required}], note? }
}

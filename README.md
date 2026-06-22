# Harmony

**Vendor cyber-risk assurance, harmonised across WA Government.**
CyberWest 2026 — Challenge #3 (Beta Crew). Concept prototype.

> *How might the WA Office of Digital Government help agencies assess the cyber risk of suppliers
> before entering or renewing contracts?*

A vendor proves its cyber posture **once**, against standardised DGov templates. Every WA agency
**reuses** that verified result. One gate replaces 140+ duplicate assessments.

## Run it

```bash
npm install
npm run dev          # http://localhost:5174
```

## The three stakeholders (four surfaces)

| Route | Surface | What it shows |
|---|---|---|
| `/` | Public landing | the problem, the 3-stakeholder value stream, the headline stats |
| `/vendor` | Vendor portal | **Regular** (manual) and **Digital / MCP** (the hero: terminal → live certificate) gates, tiered by contract value + data sensitivity |
| `/agency` | Agency console | AI **template-from-policy** + search the certified **green pool** and reuse in one click |
| `/dgov` | DGov admin | assurance dashboard + **human-in-the-loop** approval queue (AI suggests, an officer decides) |

## The one real AI feature

Legislation text → compliance form scaffold, behind a 3-mode adapter (`server/ai.mjs`,
served at `POST /api/ai/scaffold`). Set `AI_PROVIDER` in `.env` (see `.env.example`). **No paid API key.**

| `AI_PROVIDER` | How | Use |
|---|---|---|
| `mock` | deterministic canned scaffold | demo-safe, never breaks on stage |
| `cli` | shells out to the local `claude` CLI | runs through a Claude subscription, **no API key** — local testing |
| `lmstudio` | local model in [LM Studio](https://lmstudio.ai) on `localhost:1234` | **on-prem, data stays in Australia** — the data-sovereignty pitch |

The code default is `mock`; `.env.example` ships with `lmstudio` so a copy-and-go setup uses the
local model. Any provider error degrades gracefully to `mock`, so the demo never breaks.

### Local AI with LM Studio (default)

The `lmstudio` provider runs **Llama-3.2-1B-Instruct-4bit** entirely on your machine via LM Studio's
OpenAI-compatible server — nothing leaves the laptop.

1. Install [LM Studio](https://lmstudio.ai) and open it.
2. **Get the model** — search the Discover (🔍) tab for `Llama-3.2-1B-Instruct-4bit` and download it
   (the 4-bit MLX build is ~0.7 GB and runs on Apple Silicon).
3. **Start the server** — Developer tab → toggle **Start Server**. It listens on `http://localhost:1234`.
   Load `Llama-3.2-1B-Instruct-4bit` (LM Studio also loads it on demand on the first request).
4. **Confirm the model id** the server exposes, and copy it into `.env` if it differs from the default:
   ```bash
   curl http://localhost:1234/v1/models
   ```
5. **Point Harmony at it:**
   ```bash
   cp .env.example .env          # ships with AI_PROVIDER=lmstudio
   # edit LMSTUDIO_MODEL in .env if step 4 showed a different id
   npm run dev
   ```
6. Open `/agency`, paste a policy clause, click **✦ Generate fields**. The badge should read
   `✦ provider: lmstudio:<model> · on-prem, data stays in WA`.

If LM Studio isn't running, the request falls back to `mock` and the form still generates.

## Demo spine (2 acts)

1. **Act 1** — a solo SaaS vendor self-certifies once via the MCP path → a DGov officer approves → green certificate.
2. **Act 2** — a *different* agency finds them in the green pool and reuses the assessment instantly.

## Scope

Clickable MVP. Smoke-and-mirrors where it doesn't change the story: no real form engine, no real
auth, the MCP install is a simulated terminal, synthetic vendor data (`src/data/vendors.js`).
Stack: React 19 + Vite + Tailwind. Design system: `DESIGN.md`.

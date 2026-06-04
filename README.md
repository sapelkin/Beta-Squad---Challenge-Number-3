# Harmony

**Vendor cyber-risk assurance, harmonised across WA Government.**
CyberWest 2026 — Challenge #3 (Beta Crew). Concept prototype.

> *How might the WA Office of Digital Government help agencies assess the cyber risk of suppliers
> before entering or renewing contracts?*

A vendor's cyber posture is **verified and recorded once**, against a standardised DGov baseline
template. Every WA agency **reuses** that assurance record as an input to its own risk-based
decision. One gate replaces 140+ duplicate assessments.

**What Harmony is not.** It does not create a new certification, and it is not an approval authority.
DGov stays consultative — it publishes the baseline templates and policy mappings, verifies and
records what a vendor already holds (ISO / SOC / IRAP status, hosting, data residency, control
answers), and adds advisory input. Each agency keeps its own assessment and procurement decision;
there is no universal pass/fail and no red/amber/green pool. *Like a Common Use Arrangement removes
duplication in procurement, Harmony removes it in cyber assurance — one layer down.*

## Run it

```bash
npm install
npm run dev          # http://localhost:5174
npm run build
npm start            # production server with /api/ai/scaffold on http://localhost:4173
```

## The three stakeholders (four surfaces)

| Route | Surface | What it shows |
|---|---|---|
| `/` | Public landing | the problem, the 3-stakeholder value stream, the headline stats |
| `/vendor` | Vendor portal | **Regular** (manual) and **Digital / MCP** (the hero: terminal → live assurance record) gates, tiered by contract value + data sensitivity |
| `/agency` | Agency console | AI **template-from-policy** + search the shared-assurance records (with provenance: who assessed, against which policy, classification, as-at date) and reuse as an input in one click |
| `/dgov` | DGov admin | assurance dashboard + **human-in-the-loop** advisory review (AI summarises, an officer verifies & publishes, the agency decides) |

## The one real AI feature

Legislation text → compliance form scaffold, behind a 4-mode adapter (`server/ai.mjs`,
served at `POST /api/ai/scaffold` in dev, preview, and production). Set `AI_PROVIDER`
in `.env` (see `.env.example`). **No paid API key.**

| `AI_PROVIDER` | How | Use |
|---|---|---|
| `mock` (default) | deterministic canned scaffold | demo-safe, never breaks on stage |
| `cli` | shells out to the local `claude` CLI | runs through a Claude subscription, **no API key** — local testing |
| `ollama` | local model on `localhost:11434` | **on-prem, data stays in Australia** — the data-sovereignty pitch |
| `lmstudio` | local model via LM Studio's OpenAI-compatible server on `localhost:1234` | local testing with `qwen/qwen3.5-9b` by default |

Any provider error or timeout degrades gracefully to `mock`, so the demo never breaks.

### Run with LM Studio

1. Start LM Studio's local server from the Developer tab, or run `lms server start`.
2. Load the Qwen 3.5 9B model in LM Studio.
3. Create `.env` from `.env.example` and set:

```bash
AI_PROVIDER=lmstudio
LMSTUDIO_URL=http://localhost:1234/v1
LMSTUDIO_MODEL=qwen/qwen3.5-9b
AI_TIMEOUT_MS=8000
```

Then run the app with `npm run dev`, or use `npm run build` followed by `npm start`
for the production server.

## Demo spine (2 acts)

1. **Act 1** — a solo SaaS vendor gets assessed once via the MCP path → a DGov officer verifies & publishes the assurance record (human-in-the-loop).
2. **Act 2** — a *different* agency finds that record (with full provenance), reuses it as an input, and makes its own risk-based call — no new questionnaire.

## Scope

Clickable MVP. Smoke-and-mirrors where it doesn't change the story: no real form engine, no real
auth, the MCP install is a simulated terminal, synthetic vendor data (`src/data/vendors.js`).
Stack: React 19 + Vite + Tailwind. Design system: `DESIGN.md`.

## What the LM Studio branch adds

This branch adds a local LM Studio connector for the scaffold-generation feature, using
LM Studio's OpenAI-compatible chat completions endpoint and the `qwen/qwen3.5-9b`
model by default. It keeps the existing `mock`, `cli`, and `ollama` paths intact, adds
request timeouts, and falls back to the deterministic mock scaffold if the local model
is unavailable.

It also extracts the AI route into a shared server handler (`server/api.mjs`), wires the
same endpoint into Vite dev/preview, and adds a lightweight production server
(`server/app.mjs`) so `npm start` can serve both the built React app and
`POST /api/ai/scaffold`.

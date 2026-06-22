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
| `mock` (default) | deterministic canned scaffold | demo-safe, never breaks on stage |
| `cli` | shells out to the local `claude` CLI | runs through a Claude subscription, **no API key** — local testing |
| `ollama` | local model on `localhost:11434` | **on-prem, data stays in Australia** — the data-sovereignty pitch |

Any provider error degrades gracefully to `mock`, so the demo never breaks.

## Demo spine (2 acts)

1. **Act 1** — a solo SaaS vendor self-certifies once via the MCP path → a DGov officer approves → green certificate.
2. **Act 2** — a *different* agency finds them in the green pool and reuses the assessment instantly.

## Scope

Clickable MVP. Smoke-and-mirrors where it doesn't change the story: no real form engine, no real
auth, the MCP install is a simulated terminal, synthetic vendor data (`src/data/vendors.js`).
Stack: React 19 + Vite + Tailwind. Design system: `DESIGN.md`.

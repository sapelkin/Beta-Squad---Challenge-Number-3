# Harmony Team Handoff

## What Is Built

- React/Vite MVP on branch `harmony-mvp`.
- Four routes: `/`, `/vendor`, `/agency`, `/dgov`.
- Vendor MCP flow: gate selection, simulated terminal, tailored checklist, live certificate.
- Agency flow: policy text to scaffold, green-pool search, one-click assessment reuse.
- DGov flow: assurance dashboard, AI recommendation, human-in-the-loop approval.
- AI sidecar at `POST /api/ai/scaffold` with `mock`, `cli`, and `lmstudio` providers. Any provider error degrades to `mock`, so it cannot fail on stage.

## Run

```bash
npm install
npm run dev
```

Default local URL: `http://localhost:5174`.

In this Codex session, the normal user-shell Node 25 path was killed with exit 137. The app built successfully with bundled Node 24:

```bash
PATH=/Users/vlad3v/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH npm run build
```

## Demo Order

1. `/`, frame the problem.
2. `/vendor`, start digital, wait for the MCP terminal, issue certificate.
3. `/dgov`, approve Sarah's SaaS.
4. `/agency`, generate scaffold, reuse Sarah's assessment.

## What To Avoid On Stage

- Do not claim the MCP integration is live. It is a simulated terminal for the prototype.
- Do not claim the policy sources are exhaustive legal advice.
- Do not run `cli` or `lmstudio` provider during the pitch unless already warmed up. Fall back to `mock`.
- Do not lead with dashboards. Lead with the two-act story.

## Strongest Build Angle

The strongest feature is not the dashboard. It is certificate reuse plus live revocation:

> A vendor proves once, DGov verifies once, every WA agency reuses the result, and MCP keeps the certificate live.

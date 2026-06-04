# Harmony Demo Script

CyberWest Challenge #3, Beta Crew.

## Demo Spine

Thesis: a supplier proves cyber posture once. Every WA agency reuses the verified result.

Hero user: follow the supplier first, then show a second agency reusing the certificate. This makes the harmonisation payoff visible in under three minutes.

## Act 1, Certify Once

1. Open `/`.
2. Say: WA agencies are asking the same supplier cyber questions repeatedly. Harmony turns that into one reusable assurance gate.
3. Click **Become a certified vendor**.
4. Keep **Solo <$1M** and **High, software** selected.
5. Click **Start digital**.
6. Let the terminal finish. Say: the MCP connection is simulated here, but the point is live evidence, not a static PDF.
7. Click **View issued certificate**.
8. Say: certificate validity is tied to the live connection. If posture lapses, the certificate can revoke instead of staying stale.

## Act 2, Reuse Across Agencies

1. Open `/dgov`.
2. Click **Approve & issue certificate** for Sarah's SaaS.
3. Say: AI recommends, a Digital Government officer decides.
4. Open `/agency`.
5. Click **Generate scaffold**.
6. Say: this is the one real AI feature, policy text becomes a compliance form scaffold.
7. Click **Reuse Sarah's assessment for this contract**.
8. Say: this is the win, a different agency gets the assurance result without asking the supplier to repeat the whole assessment.

## Pitch Lines

- "A generic tool gives you a score. Harmony gives the agency a decision and the clauses to enforce it."
- "The supplier answers once, Digital Government verifies once, every agency reuses the result."
- "MCP keeps assurance live. The certificate is not a stale document sitting in a procurement folder."

## Judge Mapping

Problem and impact: duplicated supplier cyber assessments, long questionnaires, inconsistent procurement gates.

AI solution: policy-to-form scaffold, evidence-to-verdict workflow, AI recommendations with human approval.

Feasibility: clickable React MVP, deterministic mock AI fallback, no paid API key required.

Pitch clarity: two acts, certify once, reuse instantly.

## Verified

Production build: `npm run build` using bundled Node.

Browser smoke test: landing, vendor MCP flow, certificate, DGov approval, agency scaffold, agency reuse.

Evidence screenshot: `docs/harmony-smoke.png`.

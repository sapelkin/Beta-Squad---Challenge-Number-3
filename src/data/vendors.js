// Synthetic vendor assurance records — archetypes from the WA supplier cyber-risk research.
// Clearly fictional. Used to make the shared-assurance + advisory-review demo land.
// Each record carries provenance (who assessed, against which policy, at what classification,
// as at when) so a consuming agency can make its own risk-based call — not a pass/fail pool.
export const vendors = [
  {
    id: 4471,
    name: "Sarah's SaaS Pty Ltd",
    service: 'Case management',
    tier: 'solo',
    sensitivity: 'high',
    status: 'certified',
    recordId: 'HRM-AR-4471-2026',
    assurance: 'Essential Eight ML1 · IRAP-ready',
    assessedBy: 'Dept of Communities',
    policy: 'WA Cyber Security Policy 2024 · v1.2',
    classification: 'OFFICIAL: Sensitive',
    asOf: '2026-05-12',
    aiVerdict: 'pre-approve',
    aiReason: 'Essential Eight ML1 met, IRAP-ready, MFA enforced, patch cadence ≤14 days.',
    hero: true,
  },
  {
    id: 2210,
    name: 'NorthCloud Pty',
    service: 'IRAP cloud host',
    tier: 'substantial',
    sensitivity: 'high',
    status: 'certified',
    recordId: 'HRM-AR-2210-2026',
    assurance: 'ISO 27001 · IRAP assessed',
    assessedBy: 'Dept of Finance',
    policy: 'WA Cyber Security Policy 2024 · v1.2',
    classification: 'PROTECTED',
    asOf: '2026-03-28',
    aiVerdict: 'pre-approve',
    aiReason: 'ISO 27001 + IRAP, full SIG, MFA everywhere, onshore hosting.',
  },
  {
    id: 8830,
    name: 'RapidForms',
    service: 'SaaS forms',
    tier: 'substantial',
    sensitivity: 'high',
    status: 'conditions',
    recordId: 'HRM-AR-8830-2026',
    assurance: 'SOC 2 Type II only',
    assessedBy: 'Dept of Transport',
    policy: 'WA Cyber Security Policy 2024 · v1.1',
    classification: 'OFFICIAL: Sensitive',
    asOf: '2026-04-09',
    aiVerdict: 'approve-with-conditions',
    aiReason: 'SOC 2 only, no IRAP, offshore hosting. Conditions noted: data-residency clause + IRAP path + right-to-audit.',
  },
  {
    id: 1502,
    name: 'ByteSub Co',
    service: 'Subcontractor',
    tier: 'solo',
    sensitivity: 'high',
    status: 'remediate',
    recordId: 'HRM-AR-1502-2026',
    assurance: 'No certifications on record',
    assessedBy: 'Dept of Justice',
    policy: 'WA Cyber Security Policy 2024 · v1.2',
    classification: 'OFFICIAL',
    asOf: '2026-02-20',
    aiVerdict: 'decline',
    aiReason: 'Significant gaps: no MFA (legacy email auth), unsupported software. Remediation recommended before use with sensitive data — each agency makes its own risk-based call.',
  },
];

// Severity of what the assessment FOUND — informs an agency's risk decision.
// Not an approve/reject pool: a gap for one agency need not block another.
export const STATUS_BADGE = {
  certified: { cls: 'b-green', label: '● Strong posture' },
  conditions: { cls: 'b-amber', label: '● Conditions noted' },
  remediate: { cls: 'b-red', label: '● Significant gaps' },
};

export const sampleLegislation = `WA Government Cyber Security Policy 2024 — suppliers handling government data must demonstrate ASD Essential Eight Maturity Level One and, where data sensitivity requires, hold a current IRAP assessment. Contracts must include a right-to-audit clause and confirm data residency within Australia. Multi-factor authentication must be enforced for all privileged access.`;

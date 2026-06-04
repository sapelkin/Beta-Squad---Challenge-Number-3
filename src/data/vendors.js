// Synthetic vendor pool — archetypes from the WA supplier cyber-risk research.
// Clearly fictional. Used to make the green-pool + approval-queue demo land.
export const vendors = [
  {
    id: 4471,
    name: "Sarah's SaaS Pty Ltd",
    service: 'Case management',
    tier: 'solo',
    sensitivity: 'high',
    status: 'certified',
    certId: 'HRM-CERT-4471-2026',
    assurance: 'Essential Eight ML1 · IRAP-ready',
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
    certId: 'HRM-CERT-2210-2026',
    assurance: 'ISO 27001 · IRAP assessed',
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
    assurance: 'SOC 2 Type II only',
    aiVerdict: 'approve-with-conditions',
    aiReason: 'SOC 2 only, no IRAP, offshore hosting. Require data-residency clause + IRAP path + right-to-audit.',
  },
  {
    id: 1502,
    name: 'ByteSub Co',
    service: 'Subcontractor',
    tier: 'solo',
    sensitivity: 'high',
    status: 'remediate',
    assurance: 'No certifications',
    aiVerdict: 'decline',
    aiReason: 'No certs, legacy email auth (no MFA), unsupported software in use. ASD: high-risk suppliers must not be used.',
  },
];

export const STATUS_BADGE = {
  certified: { cls: 'b-green', label: '● Certified' },
  conditions: { cls: 'b-amber', label: '● Conditions' },
  remediate: { cls: 'b-red', label: '● Remediate' },
};

export const sampleLegislation = `WA Government Cyber Security Policy 2024 — suppliers handling government data must demonstrate ASD Essential Eight Maturity Level One and, where data sensitivity requires, hold a current IRAP assessment. Contracts must include a right-to-audit clause and confirm data residency within Australia. Multi-factor authentication must be enforced for all privileged access.`;

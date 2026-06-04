// Synthetic vendor assurance records — archetypes from the WA supplier cyber-risk research.
// Clearly fictional. No universal pass/fail: each vendor carries VERIFIED facts plus a history
// of which agencies have already assessed them, against which policy, and what was found.
// Agencies use this as an input to their own risk-based decision.
export const vendors = [
  {
    id: 4471,
    name: "Sarah's SaaS Pty Ltd",
    service: 'Case management',
    tier: 'solo',
    verified: { iso27001: 'verified', irap: 'current', mfa: 'enforced', residency: 'Australia (AWS ap-southeast-2)' },
    e8: 'ML1 met',
    assessments: [
      { agency: 'Dept of Local Government', framework: 'WA Cyber Policy 2024 + E8 ML1', date: '2026-04', risks: 'None material', decision: 'Engaged' },
      { agency: 'WA Country Health', framework: 'E8 ML1 + IRAP', date: '2026-05', risks: 'None material', decision: 'Engaged' },
    ],
    hero: true,
  },
  {
    id: 2210,
    name: 'NorthCloud Pty',
    service: 'IRAP cloud host',
    tier: 'substantial',
    verified: { iso27001: 'verified', irap: 'current', mfa: 'enforced', residency: 'Australia (multi-AZ)' },
    e8: 'ML1 met',
    assessments: [
      { agency: 'Main Roads WA', framework: 'IRAP + ISO 27001', date: '2026-03', risks: 'None material', decision: 'Engaged' },
    ],
  },
  {
    id: 8830,
    name: 'RapidForms',
    service: 'SaaS forms',
    tier: 'substantial',
    verified: { iso27001: 'none', soc2: 'verified', irap: 'none', mfa: 'enforced', residency: 'Offshore (US)' },
    e8: 'Partial',
    assessments: [
      { agency: 'Dept of Transport', framework: 'WA Cyber Policy 2024', date: '2026-02', risks: 'Offshore hosting; no IRAP', decision: 'Engaged with data-residency clause' },
    ],
  },
  {
    id: 1502,
    name: 'ByteSub Co',
    service: 'Subcontractor',
    tier: 'solo',
    verified: { iso27001: 'none', soc2: 'none', irap: 'none', mfa: 'not enforced', residency: 'Unknown' },
    e8: 'Not met',
    assessments: [
      { agency: 'Dept of Local Government', framework: 'E8 ML1', date: '2026-05', risks: 'No MFA; unsupported software; no certs', decision: 'Not engaged' },
    ],
  },
];

export const sampleLegislation = `WA Government Cyber Security Policy 2024 — suppliers handling government data must demonstrate ASD Essential Eight Maturity Level One and, where data sensitivity requires, hold a current IRAP assessment. Contracts must include a right-to-audit clause and confirm data residency within Australia. Multi-factor authentication must be enforced for all privileged access.`;

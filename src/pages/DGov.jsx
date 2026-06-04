import { useState } from 'react';
import { vendors } from '../data/vendors.js';
import Questionnaire from '../components/Questionnaire.jsx';

function claimCheck(v) {
  // What DGov verifies: that CLAIMED certifications are genuine and current. Not an approval.
  const items = [];
  if (v.verified.iso27001 === 'verified') items.push({ ok: true, t: 'ISO 27001 — certificate valid & current' });
  if (v.verified.soc2 === 'verified') items.push({ ok: true, t: 'SOC 2 Type II — report on file' });
  if (v.verified.irap === 'current') items.push({ ok: true, t: 'IRAP — assessment current' });
  if (v.verified.irap === 'none') items.push({ ok: false, t: 'IRAP — not held' });
  if (v.verified.mfa !== 'enforced') items.push({ ok: false, t: 'MFA — not enforced' });
  if (v.verified.residency && v.verified.residency.startsWith('Offshore')) items.push({ ok: false, t: 'Hosting — offshore (flag for agencies)' });
  return items;
}

export default function DGov() {
  const [tab, setTab] = useState('queue');

  return (
    <div>
      <h2 className="gv">Digital Government — consultative assurance</h2>
      <p className="lede">DGov does not approve vendors or mandate agency policy. It owns the baseline template and policy mappings, verifies that claimed certifications are genuine, and adds advisory input. Agencies keep the decision.</p>

      <div className="tiles">
        <div className="tile"><b>312</b><span>Vendors with verified records</span></div>
        <div className="tile alert"><b>9</b><span>Claims awaiting verification</span></div>
        <div className="tile"><b>16</b><span>Policy mappings in the baseline</span></div>
        <div className="tile"><b>141</b><span>Agencies reusing the register</span></div>
      </div>

      <div className="seg">
        <button className={tab === 'queue' ? 'on' : ''} onClick={() => setTab('queue')}>Verify &amp; record</button>
        <button className={tab === 'baseline' ? 'on' : ''} onClick={() => setTab('baseline')}>Baseline template</button>
      </div>

      {tab === 'queue' ? (
        <div className="queue">
          <p className="sd" style={{ marginBottom: 12 }}>DGov confirms a vendor's <b>claimed</b> certifications are genuine and records them. This is verification, not approval. Whether to engage a vendor stays with the agency.</p>
          {vendors.map((v) => {
            const items = claimCheck(v);
            return (
              <div className="qrow col" key={v.id}>
                <div className="qrow-head">
                  <div className="who">{v.name}<span className="td-sub" style={{ display: 'inline', marginLeft: 8 }}>{v.service}</span></div>
                  <div className="right">
                    <button className="approve">Confirm &amp; record</button>
                  </div>
                </div>
                <div className="claimlist">
                  {items.map((it, i) => (
                    <span className={'claim ' + (it.ok ? 'ok' : 'flag')} key={i}>{it.ok ? '✓' : '⚠'} {it.t}</span>
                  ))}
                </div>
                <div className="advisory">Advisory: surfaced to agencies as input. DGov adds policy context; the agency applies its own risk appetite.</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p className="sd" style={{ marginBottom: 12 }}>The baseline DGov publishes from current policy. Agencies adopt it and tailor it; vendors answer it once. Every question maps to a live policy.</p>
          <Questionnaire mode="baseline" />
        </div>
      )}
    </div>
  );
}

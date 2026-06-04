import { useState } from 'react';
import { vendors } from '../data/vendors.js';

const VERDICT = {
  'pre-approve': { color: 'var(--green)', label: 'Strong posture' },
  'approve-with-conditions': { color: 'var(--amber)', label: 'Conditions noted' },
  decline: { color: 'var(--red)', label: 'Significant gaps' },
};

export default function DGov() {
  const queue = vendors.filter((v) => v.aiVerdict);
  const [approved, setApproved] = useState({});

  return (
    <div>
      <h2 className="gv">Digital Government — assurance dashboard</h2>
      <p className="lede">DGov's consultative role: publish the baseline templates and policy mappings, verify what vendors hold, and add advisory input. Agencies keep the assessment and procurement decision.</p>

      <div className="tiles">
        <div className="tile">
          <b>312</b>
          <span>Vendors with an assurance record</span>
        </div>
        <div className="tile alert">
          <b>7</b>
          <span>Records to refresh ≤30d</span>
        </div>
        <div className="tile alert">
          <b>3</b>
          <span>Significant gaps flagged for agencies</span>
        </div>
        <div className="tile">
          <b>141</b>
          <span>Agencies onboarded</span>
        </div>
      </div>

      <h4 style={{ fontSize: 15, color: 'var(--ink)', margin: '0 0 10px' }}>Advisory review · human-in-the-loop</h4>
      <div className="queue">
        {queue.map((v) => {
          const verdict = VERDICT[v.aiVerdict];
          const isApproved = approved[v.id];
          return (
            <div className={'qrow' + (v.hero && !isApproved ? ' focus' : '')} key={v.id}>
              <div>
                <div className="who">{v.name}</div>
                <div className="ai">
                  AI summary: <b style={{ color: verdict.color }}>{verdict.label}</b> — {v.aiReason}{' '}
                  <span style={{ color: '#999' }}>AI summarises; an officer verifies; the agency decides.</span>
                </div>
              </div>
              <div className="right">
                {isApproved ? (
                  <span className="miniseal" title="Assurance record published">✓</span>
                ) : v.aiVerdict === 'pre-approve' ? (
                  <button className="approve" onClick={() => setApproved((a) => ({ ...a, [v.id]: true }))}>
                    Verify &amp; publish record
                  </button>
                ) : v.aiVerdict === 'approve-with-conditions' ? (
                  <button className="approve" style={{ background: 'var(--amber)' }}>Note conditions</button>
                ) : (
                  <button className="approve" style={{ background: 'var(--red)' }}>Record gaps</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

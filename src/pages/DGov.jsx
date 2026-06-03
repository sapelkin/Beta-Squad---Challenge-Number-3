import { useState } from 'react';
import { vendors } from '../data/vendors.js';

const VERDICT = {
  'pre-approve': { color: 'var(--green)', label: 'Pre-approve' },
  'approve-with-conditions': { color: 'var(--amber)', label: 'Approve with conditions' },
  decline: { color: 'var(--red)', label: 'Decline' },
};

export default function DGov() {
  const queue = vendors.filter((v) => v.aiVerdict);
  const [approved, setApproved] = useState({});

  return (
    <div>
      <h2 className="gv">Digital Government — assurance dashboard</h2>
      <p className="lede">The overarching admin: standardise templates, watch the estate, and approve vendors with a human in the loop.</p>

      <div className="tiles">
        <div className="tile">
          <b>312</b>
          <span>Certified vendors</span>
        </div>
        <div className="tile alert">
          <b>7</b>
          <span>Certificates expiring ≤30d</span>
        </div>
        <div className="tile alert">
          <b>3</b>
          <span>High-risk — access blocked</span>
        </div>
        <div className="tile">
          <b>141</b>
          <span>Agencies onboarded</span>
        </div>
      </div>

      <h4 style={{ fontSize: 15, color: 'var(--ink)', margin: '0 0 10px' }}>Approval queue · human-in-the-loop</h4>
      <div className="queue">
        {queue.map((v) => {
          const verdict = VERDICT[v.aiVerdict];
          const isApproved = approved[v.id];
          return (
            <div className={'qrow' + (v.hero && !isApproved ? ' focus' : '')} key={v.id}>
              <div>
                <div className="who">{v.name}</div>
                <div className="ai">
                  AI suggestion: <b style={{ color: verdict.color }}>{verdict.label}</b> — {v.aiReason}{' '}
                  <span style={{ color: '#999' }}>AI suggests, never approves.</span>
                </div>
              </div>
              <div className="right">
                {isApproved ? (
                  <span className="miniseal" title="Certificate issued">✓</span>
                ) : v.aiVerdict === 'pre-approve' ? (
                  <button className="approve" onClick={() => setApproved((a) => ({ ...a, [v.id]: true }))}>
                    Approve &amp; issue certificate
                  </button>
                ) : v.aiVerdict === 'approve-with-conditions' ? (
                  <button className="approve" style={{ background: 'var(--amber)' }}>Review</button>
                ) : (
                  <button className="approve" style={{ background: 'var(--red)' }}>Decline</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

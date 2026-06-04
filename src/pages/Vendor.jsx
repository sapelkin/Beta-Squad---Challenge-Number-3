import { useEffect, useRef, useState } from 'react';
import Questionnaire from '../components/Questionnaire.jsx';

function TierControls({ tier, setTier, sens, setSens }) {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 18 }}>
      <div>
        <div className="ctl-l">Contract value</div>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={tier === 'solo' ? 'on' : ''} onClick={() => setTier('solo')}>Solo · &lt;$1M (MCP)</button>
          <button className={tier === 'substantial' ? 'on' : ''} onClick={() => setTier('substantial')}>Substantial · &gt;$1M</button>
        </div>
      </div>
      <div>
        <div className="ctl-l">Data sensitivity</div>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={sens === 'low' ? 'on' : ''} onClick={() => setSens('low')}>Low — goods</button>
          <button className={sens === 'high' ? 'on' : ''} onClick={() => setSens('high')}>High — software</button>
        </div>
      </div>
    </div>
  );
}

const TERMINAL_LINES = (high) => [
  { c: 'dim', t: "# Sarah's SaaS — one-time connect" },
  { c: 'cmd', t: '$ npx harmony-mcp connect --key HRM-7F3A-9K2D' },
  { c: 'ok', t: '✓ identity verified  (vendor #4471, verified at registration)' },
  { c: 'ok', t: '✓ scanning repository  github.com/sarah-saas/app' },
  { c: 'ok', t: `✓ baseline loaded  ${high ? 'software · Essential Eight ML1 + IRAP' : 'low-risk · basic'}` },
  { c: 'ok', t: '✓ MFA enforced · backups present · patch cadence ≤14d' },
  { c: 'ac', t: '→ baseline auto-answered — claimed certs sent to DGov to verify & record…' },
];

export default function Vendor() {
  const [tier, setTier] = useState('solo');
  const [sens, setSens] = useState('high');
  const [mode, setMode] = useState(null); // null | 'regular' | 'digital'
  const [step, setStep] = useState(0); // digital: 0 connecting, 1 record
  const [revealed, setRevealed] = useState(0);
  const timer = useRef(null);
  const high = sens === 'high';
  const lines = TERMINAL_LINES(high);

  useEffect(() => {
    if (mode === 'digital' && step === 0) {
      setRevealed(0);
      clearInterval(timer.current);
      timer.current = setInterval(() => {
        setRevealed((r) => {
          if (r >= lines.length) { clearInterval(timer.current); return r; }
          return r + 1;
        });
      }, 520);
    }
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, step, sens]);

  // ---- gate selection ----
  if (!mode) {
    return (
      <div>
        <h2 className="gv">Get your assurance record</h2>
        <p className="lede">Answer one baseline aligned to current policy. Harmony verifies and records what you already hold; it does not issue a new certification. Choose how you want to work with government.</p>
        <TierControls tier={tier} setTier={setTier} sens={sens} setSens={setSens} />
        <div className="gate">
          <div className="gatecard">
            <div className="tag">Regular</div>
            <h3>Manual collaboration</h3>
            <p>Answer the policy-aligned baseline and upload evidence. The platform shows the minimum for your tier with instant feedback.</p>
            <ul>
              <li>Best for goods &amp; services</li>
              <li>Paper documents accepted</li>
              <li>Claims verified &amp; recorded by DGov</li>
            </ul>
            <button className="btn ghost" onClick={() => setMode('regular')}>View the baseline →</button>
          </div>
          <div className="gatecard sel">
            <div className="tag">Digital · MCP</div>
            <h3>Automated collaboration</h3>
            <p>For software, SaaS and cloud. Connect your environment once; Harmony auto-answers the baseline and keeps it current.</p>
            <ul>
              <li>Best for digital products</li>
              <li>Baseline auto-answered from your repo</li>
              <li>Live, self-revoking assurance record</li>
            </ul>
            <button className="btn" onClick={() => { setMode('digital'); setStep(0); }}>Start digital →</button>
          </div>
        </div>
        <p className="lede" style={{ marginTop: 24, fontSize: 13 }}>
          {tier === 'solo'
            ? <><b>Solo tier (&lt;$1M):</b> the MCP path is your fast lane — connect, get recorded, become reusable.</>
            : <><b>Substantial tier (&gt;$1M):</b> full evidence pack required; an assigned officer verifies claims before recording.</>}
        </p>
      </div>
    );
  }

  // ---- regular path: shows the policy-aligned baseline questionnaire ----
  if (mode === 'regular') {
    return (
      <div>
        <h2 className="gv">The baseline you'll answer</h2>
        <p className="lede">No need to know everything upfront. Every question traces to a current WA Government or ASD policy, so you can see exactly why it is asked. Answer it once; agencies reuse the result.</p>
        <Questionnaire mode="baseline" />
        <p className="notice" style={{ marginTop: 14 }}>On submission, DGov verifies your claimed certifications and records them. Agencies reuse the record; each makes its own risk-based decision.</p>
        <div style={{ marginTop: 16 }}>
          <button className="btn ghost" onClick={() => setMode(null)}>← Back</button>
        </div>
      </div>
    );
  }

  // ---- digital / MCP: connecting ----
  if (step === 0) {
    const done = revealed >= lines.length;
    return (
      <div>
        <h2 className="gv">Connect your environment</h2>
        <p className="lede">You are already verified from step one, so Harmony's MCP server knows who you are and auto-answers the policy baseline from what you actually run.</p>
        <div className="progress"><div className="done" /><div className="cur" /><div /></div>
        <div className="term">
          {lines.slice(0, revealed).map((l, i) => (
            <div key={i} className={l.c === 'cmd' ? '' : l.c}>
              {l.c === 'cmd' ? <span><span className="p">$</span>{l.t.slice(1)}</span> : l.t}
            </div>
          ))}
          {!done && <span className="dim">▋</span>}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button className="btn" disabled={!done} onClick={() => setStep(1)}>
            {done ? 'View assurance record →' : 'Auto-answering baseline…'}
          </button>
          <button className="btn ghost" onClick={() => setMode(null)}>← Back</button>
        </div>
      </div>
    );
  }

  // ---- digital / MCP: assurance record ----
  return (
    <div>
      <h2 className="gv">Your <em>assurance record</em> is live.</h2>
      <p className="lede">Recorded on the whole-of-government assurance register and visible to every WA agency as an input to their own assessment. Harmony records what you hold; agencies decide.</p>
      <div className="progress"><div className="done" /><div className="done" /><div className="done" /></div>
      <div className="cert">
        <div className="seal">✓</div>
        <div className="lbl">Vendor Assurance Record</div>
        <h3>Sarah's SaaS Pty Ltd</h3>
        <div className="meta">
          <b>Verified:</b> ISO 27001 (current) · IRAP (current) · MFA enforced
          <br />
          <b>Essential Eight:</b> Maturity Level One met
          <br />
          <b>Data residency:</b> Australia (AWS ap-southeast-2)
          <br />
          <b>Scope:</b> digital product · {tier === 'solo' ? 'contracts <$1M' : 'contracts >$1M'}
          <br />
          <b>Status:</b> live while MCP connection holds · auto-revokes on lapse
          <br />
          <b>Record ID:</b> HRM-REC-4471-2026
        </div>
      </div>

      <h4 style={{ fontSize: 15, color: 'var(--ink)', margin: '24px 0 6px' }}>Completed baseline — auto-answered from your environment</h4>
      <p className="sd" style={{ marginBottom: 12 }}>Every answer traces to the current policy that requires it. This is what an agency reuses.</p>
      <Questionnaire mode="answered" />

      <div style={{ marginTop: 16 }}>
        <button className="btn ghost" onClick={() => { setMode(null); setStep(0); }}>↺ Run again</button>
      </div>
    </div>
  );
}

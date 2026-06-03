import { useEffect, useRef, useState } from 'react';

function TierControls({ tier, setTier, sens, setSens }) {
  return (
    <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 18 }}>
      <div>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 6 }}>
          Contract value
        </div>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={tier === 'solo' ? 'on' : ''} onClick={() => setTier('solo')}>
            Solo · &lt;$1M (MCP)
          </button>
          <button className={tier === 'substantial' ? 'on' : ''} onClick={() => setTier('substantial')}>
            Substantial · &gt;$1M
          </button>
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, color: '#888', marginBottom: 6 }}>
          Data sensitivity
        </div>
        <div className="seg" style={{ marginBottom: 0 }}>
          <button className={sens === 'low' ? 'on' : ''} onClick={() => setSens('low')}>
            Low — goods
          </button>
          <button className={sens === 'high' ? 'on' : ''} onClick={() => setSens('high')}>
            High — software
          </button>
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
  { c: 'ok', t: `✓ tailored questionnaire loaded  ${high ? 'software · Essential Eight ML1 + IRAP' : 'low-risk · basic'}` },
  { c: 'ok', t: '✓ MFA enforced · backups present · patch cadence ≤14d' },
  { c: 'ac', t: '→ posture compiled — awaiting Digital Government approval…' },
];

export default function Vendor() {
  const [tier, setTier] = useState('solo');
  const [sens, setSens] = useState('high');
  const [mode, setMode] = useState(null); // null | 'regular' | 'digital'
  const [step, setStep] = useState(0); // digital: 0 connecting, 1 certificate
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
          if (r >= lines.length) {
            clearInterval(timer.current);
            return r;
          }
          return r + 1;
        });
      }, 520);
    }
    return () => clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, step, sens]);

  const docs = high
    ? [
        'Constitutional / company documents',
        'Essential Eight ML1 self-assessment',
        'ISO 27001 or IRAP evidence',
        'MFA & access-control attestation',
        'Incident response & backup policy',
      ]
    : ['Constitutional / company documents', 'Basic security declaration'];

  // ---- gate selection ----
  if (!mode) {
    return (
      <div>
        <h2 className="gv">Become a certified vendor</h2>
        <p className="lede">Choose how you want to work with government. The platform shows you the minimum you need — nothing more.</p>
        <TierControls tier={tier} setTier={setTier} sens={sens} setSens={setSens} />
        <div className="gate">
          <div className="gatecard">
            <div className="tag">Regular</div>
            <h3>Manual collaboration</h3>
            <p>Upload your documents and the platform builds your minimum-requirements checklist with instant feedback.</p>
            <ul>
              <li>Best for goods &amp; services</li>
              <li>Paper documents accepted</li>
              <li>Human-verified certificate</li>
            </ul>
            <button className="btn ghost" onClick={() => setMode('regular')}>
              Start regular
            </button>
          </div>
          <div className="gatecard sel">
            <div className="tag">Digital · MCP</div>
            <h3>Automated collaboration</h3>
            <p>For software, SaaS and cloud. Connect your environment once; Harmony verifies it continuously.</p>
            <ul>
              <li>Best for digital products</li>
              <li>Auto-questionnaire from your repo</li>
              <li>Live, self-revoking certificate</li>
            </ul>
            <button className="btn" onClick={() => { setMode('digital'); setStep(0); }}>
              Start digital →
            </button>
          </div>
        </div>
        <p className="lede" style={{ marginTop: 24, fontSize: 13 }}>
          {tier === 'solo' ? (
            <><b>Solo tier (&lt;$1M):</b> the MCP path is your fast lane — connect, get certified, start selling.</>
          ) : (
            <><b>Substantial tier (&gt;$1M):</b> full evidence pack required; an assigned officer reviews before approval.</>
          )}
        </p>
      </div>
    );
  }

  // ---- regular path (kept light per scope) ----
  if (mode === 'regular') {
    return (
      <div>
        <h2 className="gv">Regular — minimum requirements</h2>
        <p className="lede">No need to know everything upfront. Harmony shows the minimum documents for your tier and what you sell, with instant feedback.</p>
        <TierControls tier={tier} setTier={setTier} sens={sens} setSens={setSens} />
        <div className="scaffold" style={{ maxWidth: 560 }}>
          {docs.map((d) => (
            <div className="f" key={d}>
              ⬜ {d}
              <span className="ty">upload</span>
            </div>
          ))}
        </div>
        <p className="notice" style={{ marginTop: 14 }}>Then a Digital Government officer verifies and issues your certificate (human-in-the-loop).</p>
        <div style={{ marginTop: 16 }}>
          <button className="btn ghost" onClick={() => setMode(null)}>← Back to gates</button>
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
        <p className="lede">You are already verified from step one, so Harmony's MCP server knows who you are and tailors the questionnaire to what you sell.</p>
        <div className="progress">
          <div className="done" />
          <div className="cur" />
          <div />
        </div>
        <div className="term">
          {lines.slice(0, revealed).map((l, i) => (
            <div key={i} className={l.c === 'cmd' ? '' : l.c}>
              {l.c === 'cmd' ? (
                <span>
                  <span className="p">$</span>
                  {l.t.slice(1)}
                </span>
              ) : (
                l.t
              )}
            </div>
          ))}
          {!done && <span className="dim">▋</span>}
        </div>
        <div style={{ fontSize: 12.5, color: 'var(--body)', marginTop: 12 }}>Required for your tier &amp; sensitivity:</div>
        <div className="scaffold" style={{ maxWidth: 560 }}>
          {docs.map((d) => (
            <div className="f" key={d}>
              ✓ {d}
              <span className="ty">verified</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          <button className="btn" disabled={!done} onClick={() => setStep(1)}>
            {done ? 'View issued certificate →' : 'Compiling posture…'}
          </button>
          <button className="btn ghost" onClick={() => setMode(null)}>← Back</button>
        </div>
      </div>
    );
  }

  // ---- digital / MCP: certificate ----
  return (
    <div>
      <h2 className="gv">
        You're in the <em>green pool.</em>
      </h2>
      <p className="lede">A Digital Government officer approved your posture. Your certificate is live and visible to every WA agency — no re-assessment.</p>
      <div className="progress">
        <div className="done" />
        <div className="done" />
        <div className="done" />
      </div>
      <div className="cert">
        <div className="seal">✓</div>
        <div className="lbl">Harmony Certified Vendor</div>
        <h3>Sarah's SaaS Pty Ltd</h3>
        <div className="meta">
          <b>Assurance:</b> Essential Eight ML1 · IRAP-ready
          <br />
          <b>Scope:</b> digital product · {tier === 'solo' ? 'contracts <$1M' : 'contracts >$1M'}
          <br />
          <b>Verified by:</b> Office of Digital Government (human-in-the-loop)
          <br />
          <b>Valid:</b> while MCP connection stays live · auto-revokes on lapse
          <br />
          <b>Certificate ID:</b> HRM-CERT-4471-2026
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <button className="btn ghost" onClick={() => { setMode(null); setStep(0); }}>↺ Run again</button>
      </div>
    </div>
  );
}

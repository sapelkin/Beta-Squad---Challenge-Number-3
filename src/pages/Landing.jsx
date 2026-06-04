import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
      <h2 className="gv">
        Cyber assurance, <em>verified once.</em>
      </h2>
      <p className="lede">
        Western Australian agencies and their suppliers, harmonised. A vendor's cyber posture is verified and recorded
        one time. Every agency reuses that assurance record as an input to its own risk-based decision.
      </p>
      <div className="heroSearch">
        <span>Find an assessed vendor or start your assessment…</span>
        <span className="mag">🔍</span>
      </div>

      <div className="stream">
        <div className="stnode">
          <div className="t">Digital Government</div>
          <div className="d">Consultative — publishes baseline templates &amp; policy mappings</div>
        </div>
        <div className="starrow">›</div>
        <div className="stnode">
          <div className="t">Agencies</div>
          <div className="d">Adopt the baseline · reuse verified assessments · own the decision</div>
        </div>
        <div className="starrow">›</div>
        <div className="stnode">
          <div className="t">Vendors</div>
          <div className="d">Prove posture once · reusable across government</div>
        </div>
      </div>

      <div className="cardrow">
        <Link to="/vendor" className="gcard">
          <div className="h">
            Get assessed once <span className="chev">›</span>
          </div>
          <p>One assessment, tailored to what you sell. Instant feedback. No agency-by-agency paperwork.</p>
        </Link>
        <Link to="/agency" className="gcard">
          <div className="h">
            Find an assessed vendor <span className="chev">›</span>
          </div>
          <p>See who already assessed a vendor, against which policy, and what they found — then make your own risk-based call.</p>
        </Link>
        <Link to="/dgov" className="gcard">
          <div className="h">
            For Digital Government <span className="chev">›</span>
          </div>
          <p>Publish baseline templates and policy mappings, and add advisory input — agencies keep the decision.</p>
        </Link>
      </div>

      <p className="lede" style={{ fontSize: 13, marginTop: 18 }}>
        A Common Use Arrangement removes duplication in <b>procurement</b>. Harmony removes it in <b>cyber assurance</b> —
        the same idea, one layer down. It is not an approval authority and issues no pass/fail verdict.
      </p>

      <div className="statband">
        <div className="stat">
          <b>140+</b>
          <span>WA agencies share one assessment gate</span>
        </div>
        <div className="stat">
          <b>1,200+</b>
          <span>SIG questions — answered once, not per agency</span>
        </div>
        <div className="stat">
          <b>1×</b>
          <span>verified assurance record per vendor</span>
        </div>
        <div className="stat">
          <b>↓</b>
          <span>duplicated supplier assessments across government</span>
        </div>
      </div>
      <p className="lede" style={{ fontSize: 11.5, color: '#888', marginTop: 6 }}>
        Indicative figures for a whole-of-government rollout.
      </p>
    </div>
  );
}

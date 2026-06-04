import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
      <h2 className="gv">
        Vendor cyber assurance, <em>assessed once.</em>
      </h2>
      <p className="lede">
        Western Australian agencies assess a supplier against current Digital Government policy one time. Every other
        agency reuses that assurance and makes its own risk-based decision.
      </p>
      <div className="heroSearch">
        <span>Find a vendor's assurance record or start an assessment…</span>
        <span className="mag">🔍</span>
      </div>

      <div className="stream">
        <div className="stnode">
          <div className="t">Digital Government</div>
          <div className="d">Owns the baseline template &amp; policy mappings (consultative)</div>
        </div>
        <div className="starrow">›</div>
        <div className="stnode">
          <div className="t">Agencies</div>
          <div className="d">Reuse prior assessments · keep their own risk decision</div>
        </div>
        <div className="starrow">›</div>
        <div className="stnode">
          <div className="t">Vendors</div>
          <div className="d">Answer one policy-aligned baseline · verified &amp; recorded</div>
        </div>
      </div>

      <div className="cua">
        <b>Where it sits:</b> a Common Use Arrangement removes duplication in <em>procurement</em>. Harmony removes
        duplication in <em>cyber assurance</em>. A shared baseline and reusable assurance, while every agency keeps its
        own risk and procurement decision.
      </div>

      <div className="cardrow">
        <Link to="/vendor" className="gcard">
          <div className="h">
            Become a recorded vendor <span className="chev">›</span>
          </div>
          <p>Answer one baseline aligned to current policy. We verify and record what you already hold. No agency-by-agency paperwork.</p>
        </Link>
        <Link to="/agency" className="gcard">
          <div className="h">
            Reuse a vendor assessment <span className="chev">›</span>
          </div>
          <p>See who has already assessed a vendor, against which policy, and what risks were found. Decide on your own risk appetite.</p>
        </Link>
        <Link to="/dgov" className="gcard">
          <div className="h">
            For Digital Government <span className="chev">›</span>
          </div>
          <p>Maintain the baseline template and policy mappings, verify claimed certifications, and add advisory input.</p>
        </Link>
      </div>

      <div className="statband">
        <div className="stat">
          <b>140+</b>
          <span>WA agencies, one baseline</span>
        </div>
        <div className="stat">
          <b>1,200+</b>
          <span>SIG questions — answered once</span>
        </div>
        <div className="stat">
          <b>39%</b>
          <span>of AU gov incidents start with a compromised account</span>
        </div>
        <div className="stat">
          <b>0</b>
          <span>duplicate assessments</span>
        </div>
      </div>
    </div>
  );
}

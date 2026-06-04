import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div>
      <h2 className="gv">
        Cyber assurance, <em>certified once.</em>
      </h2>
      <p className="lede">
        Western Australian agencies and their suppliers, harmonised. A vendor proves its cyber posture one time. Every
        agency reuses the verified result.
      </p>
      <div className="heroSearch">
        <span>Find a certified vendor or start your certification…</span>
        <span className="mag">🔍</span>
      </div>

      <div className="stream">
        <div className="stnode">
          <div className="t">Digital Government</div>
          <div className="d">Turns law &amp; regulation into standard templates</div>
        </div>
        <div className="starrow">›</div>
        <div className="stnode">
          <div className="t">Agencies</div>
          <div className="d">Adopt templates · reuse the certified pool</div>
        </div>
        <div className="starrow">›</div>
        <div className="stnode">
          <div className="t">Vendors</div>
          <div className="d">Certify once · sell to all of government</div>
        </div>
      </div>

      <div className="cardrow">
        <Link to="/vendor" className="gcard">
          <div className="h">
            Become a certified vendor <span className="chev">›</span>
          </div>
          <p>One assessment, tailored to what you sell. Instant feedback. No agency-by-agency paperwork.</p>
        </Link>
        <Link to="/agency" className="gcard">
          <div className="h">
            Find a certified vendor <span className="chev">›</span>
          </div>
          <p>Search the green pool. See who is already verified and reuse their assessment.</p>
        </Link>
        <Link to="/dgov" className="gcard">
          <div className="h">
            For Digital Government <span className="chev">›</span>
          </div>
          <p>Publish standardised templates and approve vendors with a human-in-the-loop.</p>
        </Link>
      </div>

      <div className="statband">
        <div className="stat">
          <b>140+</b>
          <span>WA agencies, one gate</span>
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

import { Link } from 'react-router-dom';

export default function GovHeader() {
  return (
    <div className="gv-top">
      <Link to="/" className="gv-crest">
        <div className="crest">✦</div>
        <div className="wordmark">
          <b>Harmony</b>
          <span>Office of Digital Government</span>
        </div>
      </Link>
      <div className="gv-util">
        <Link to="/vendor">Vendors</Link>
        <Link to="/agency">Agencies</Link>
        <Link to="/dgov">DGov</Link>
        <div className="gv-search">🔍 Search</div>
      </div>
    </div>
  );
}

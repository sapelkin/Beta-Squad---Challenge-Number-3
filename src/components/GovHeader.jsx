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
        <Link to="/agency" className="gv-search" aria-label="Search assessed vendors">
          🔍 <span>Search</span>
        </Link>
      </div>
    </div>
  );
}

export default function GovFooter() {
  return (
    <footer className="gv-foot">
      <div className="gv-foot-in">
        <div className="aoc">Acknowledgement of Country</div>
        The Government of Western Australia acknowledges the traditional custodians throughout Western Australia and their
        continuing connection to the land, waters and community.
        <div className="sov">
          🔒 <b>Data sovereignty:</b> all vendor and agency information is stored and processed on local servers within
          Australia, in line with current rules and regulations. Every stakeholder — government, agency and vendor — is
          verified before participating, and the harmonisation process is governed strictly under WA Government cyber
          security policy.
        </div>
        <div className="links">
          <a href="https://www.wa.gov.au/terms-and-conditions">Terms of use</a>
          <a href="https://www.wa.gov.au/privacy">Privacy</a>
          <a href="/">About this concept</a>
          <span className="mark">Concept prototype · Beta Crew · CyberWest 2026</span>
        </div>
      </div>
    </footer>
  );
}

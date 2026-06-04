import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'How it works', end: true },
  { to: '/agency', label: 'Find an assessed vendor' },
  { to: '/vendor', label: 'Get assessed' },
  { to: '/dgov', label: 'Digital Government' },
];

export default function GovNav() {
  return (
    <nav className="gv-nav">
      {LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}

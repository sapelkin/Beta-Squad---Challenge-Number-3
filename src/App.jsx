import { Routes, Route } from 'react-router-dom';
import GovHeader from './components/GovHeader.jsx';
import GovNav from './components/GovNav.jsx';
import GovFooter from './components/GovFooter.jsx';
import Landing from './pages/Landing.jsx';
import Vendor from './pages/Vendor.jsx';
import Agency from './pages/Agency.jsx';
import DGov from './pages/DGov.jsx';

export default function App() {
  return (
    <>
      <GovHeader />
      <GovNav />
      <main className="gv-body">
        <div className="gv-wrap">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/vendor" element={<Vendor />} />
            <Route path="/agency" element={<Agency />} />
            <Route path="/dgov" element={<DGov />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </div>
      </main>
      <GovFooter />
    </>
  );
}

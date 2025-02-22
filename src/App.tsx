import './App.css';
import Navbar from '@/components/ui/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/dashboard/index'; // Import Dashboard di sini
import SettingHarga from '@/pages/setting-harga';
import NotFoundPages from './pages/NotFound';
import Index from './pages/evaluasi-sales';
import ReportPage from './components/ui/report-pages/ReportPages';
import GroupMember from './pages/evaluasi-sales/GroupMember';
import PerStruk from './pages/evaluasi-sales/PerStruk';

function App() {
  return (
    <Router> {/* Router membungkus seluruh aplikasi */}
      <section className="App">
        <div className='min-h-screen'>
          <Navbar />
          <Routes> {/* Routes dipindahkan ke App */}
            <Route path="/cpg-vite" element={<Dashboard />} />
            {/* Tambahkan rute-rute lain di sini */}
            <Route path="/cpg-vite/settingharga" element={<SettingHarga />} />
            <Route path="/cpg-vite/evaluasi-sales" element={<Index />} />
            <Route path="/cpg-vite/evaluasi-sales/perdivisi" element={<ReportPage reportType="perdivisi" />} />
            <Route path="/cpg-vite/evaluasi-sales/perdepartement" element={<ReportPage reportType="perdepartement" />} />
            <Route path="/cpg-vite/evaluasi-sales/perkategori" element={<ReportPage reportType="perkategori" />} />
            <Route path="/cpg-vite/evaluasi-sales/perproduk" element={<ReportPage reportType="perproduk" />} />
            <Route path="/cpg-vite/evaluasi-sales/perproduk-tanggal" element={<ReportPage reportType="perproduk-tanggal" />} />
            <Route path="/cpg-vite/evaluasi-sales/pertanggal" element={<ReportPage reportType="pertanggal" />} />
            <Route path="/cpg-vite/evaluasi-sales/perstruk" element={<PerStruk />} />
            <Route path="/cpg-vite/evaluasi-sales/permember" element={<ReportPage reportType="permember" />} />
            <Route path="/cpg-vite/evaluasi-sales/persupplier" element={<ReportPage reportType="persupplier" />} />
            <Route path="/cpg-vite/evaluasi-sales/perkasir" element={<ReportPage reportType="perkasir" />} />
            <Route path="/cpg-vite/evaluasi-sales/perbulan" element={<ReportPage reportType="perbulan" />} />
            <Route path="/cpg-vite/evaluasi-sales/grupmember" element={<GroupMember />} />
            <Route path="/cpg-vite/*" element={<NotFoundPages />} />
          </Routes>
        </div>
      </section>
    </Router>
  );
}


export default App;
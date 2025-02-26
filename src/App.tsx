import './App.css';
import Navbar from '@/components/ui/navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/pages/dashboard/index'; // Import Dashboard di sini
import SettingHarga from '@/pages/setting-harga';
import NotFoundPages from './pages/NotFound';
import EvaluasiSalesRoutes from '@/routers/EvaluasiSalesRouter';
import InfromasiPromosi from './pages/informasi-promosi';

const basePath = import.meta.env.VITE_BASE_PATH;
function App() {
  return (
    <Router basename={basePath}> {/* Router membungkus seluruh aplikasi */}
      <section className="App">
        <div className='min-h-screen'>
          <Navbar />
          <Routes> {/* Routes dipindahkan ke App */}
            <Route path={`/`} element={<Dashboard />} />
            {/* Tambahkan rute-rute lain di sini */}
            <Route path={`/settingharga`} element={<SettingHarga />} />
            <Route path={`/evaluasi-sales/*`} element={<EvaluasiSalesRoutes />} />
            <Route path={`/informasi-promosi`} element={<InfromasiPromosi />} />
            <Route path={`/*`} element={<NotFoundPages />} />
          </Routes>
        </div>
      </section>
    </Router>
  );
}


export default App;
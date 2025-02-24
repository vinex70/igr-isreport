import { Route, Routes } from "react-router-dom";
import Index from "@/pages/evaluasi-sales/index";
import ReportPage from "@/components/ui/report-pages/ReportPages";
import PerStruk from "@/pages/evaluasi-sales/PerStruk";
import GroupMember from "@/pages/evaluasi-sales/GroupMember";

const EvaluasiSalesRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/perdivisi" element={<ReportPage reportType="perdivisi" />} />
            <Route path="/perdepartement" element={<ReportPage reportType="perdepartement" />} />
            <Route path="/perkategori" element={<ReportPage reportType="perkategori" />} />
            <Route path="/perproduk" element={<ReportPage reportType="perproduk" />} />
            <Route path="/perproduktanggal" element={<ReportPage reportType="perproduk-tanggal" />} />
            <Route path="/pertanggal" element={<ReportPage reportType="pertanggal" />} />
            <Route path="/perstruk" element={<PerStruk />} />
            <Route path="/permember" element={<ReportPage reportType="permember" />} />
            <Route path="/persupplier" element={<ReportPage reportType="persupplier" />} />
            <Route path="/perkasir" element={<ReportPage reportType="perkasir" />} />
            <Route path="/perbulan" element={<ReportPage reportType="perbulan" />} />
            <Route path="/grupmember" element={<GroupMember />} />
        </Routes>
    );
};

export default EvaluasiSalesRoutes;
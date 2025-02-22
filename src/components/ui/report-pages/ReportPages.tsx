// src/components/ui/report-pages/ReportPages.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import useFetchData from "@/hooks/useFetchData";
import columnConfigEvaluasiSales from "@/utils/column-config/ColumnConfigEvaluasiSales";
import { formatDate } from "@/utils/FormateDate";
import TableReusable from "../table-evaluasi-sales/TableEvaluasiSales";
import LoadingIgr from "../loading-igr";

const API_URL = import.meta.env.VITE_BASE_URL;

interface ReportPageProps {
    reportType: string;
}

const ReportPage: React.FC<ReportPageProps> = ({ reportType }) => {
    const location = useLocation();
    const filters = location.state || {};

    const { data, error, isLoading } = useFetchData(`${API_URL}/api/evaluasi-sales/${reportType}`, filters);

    const columns = columnConfigEvaluasiSales[reportType] || [];

    // Hitung total untuk kolom yang memiliki isNumber: true
    const totals: Record<string, number> = columns.reduce((acc, col) => {
        if (col.isNumber) {
            acc[col.key] = data.reduce((sum, row) => sum + (Number(row[col.key]) || 0), 0);
        }
        return acc;
    }, {} as Record<string, number>);

    const captions = JSON.stringify(filters, null, 2);
    const caption = (
        <div className="space-y-2">
            <h1 className="text-2xl font-bold">
                Laporan: {reportType.toUpperCase().replace("PER", "PER - ")}
            </h1>
            <p>
                Periode: {formatDate(JSON.parse(captions).startDate)} s/d {formatDate(JSON.parse(captions).endDate)}
            </p>
        </div>
    );

    return (
        <div className="container mx-auto">


            {isLoading ? (
                <LoadingIgr />
            ) : (
                <TableReusable
                    columns={columns}
                    data={data}
                    totals={totals}
                    showFooter={true}
                    inputSearch={true}
                    titleText={`${reportType.toUpperCase().replace("PER", "PER - ")}`}
                    caption={caption} />
            )}
            {error && <p className="error">{error}</p>}

        </div>
    );
};

export default ReportPage;



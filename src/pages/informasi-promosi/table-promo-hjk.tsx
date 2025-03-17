// src/pages/informasi-promosi/table-satuan-jual.tsx
import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";


type TablePromoInstoreProps = {
    plu: string | undefined;
    barcode: string | undefined;
};

interface PromoHjkItem {
    hgk_prdcd: string
    hgk_hrgjual: number
    hgk_tglawal: string
    hgk_jamawal: string
    hgk_tglakhir: string
    hgk_jamakhir: string
    hgk_hariaktif: string
};


const TablePromoHjk: React.FC<TablePromoInstoreProps> = ({ plu, barcode }) => {
    const pluSatuanJual = plu?.slice(0, 6) || "";
    const { data: PromoHjk, loading, error } = useFetchDatas<PromoHjkItem[]>(
        "/api/informasi-promosi/promo-hjk",
        { pluSatuanJual, barcode }
    );


    return (
        <div className="h-full shadow-xl">
            {loading && <p className="text-blue-500">Memuat data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && PromoHjk && PromoHjk.length > 0 && (
                <>
                    <h1 className="p-1 text-xl font-bold text-center bg-slate-300 font-mono">Table Promo HJK</h1>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-2" rowSpan={2}>#</th>
                                <th className="border p-2" rowSpan={2}>Plu</th>
                                <th className="border p-2" rowSpan={2}>Harga Khusus</th>
                                <th className="border p-2" colSpan={2}>Mulai</th>
                                <th className="border p-2" colSpan={2}>Selesai</th>
                                <th className="border p-2" rowSpan={2}>Keterangan</th>
                            </tr>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-1">Tanggal</th>
                                <th className="border p-1">Jam</th>
                                <th className="border p-1">Tanggal</th>
                                <th className="border p-1">Jam</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PromoHjk.map((item, index) => (
                                <tr className="text-center text-sm border" key={item.hgk_prdcd}>
                                    <td className="border p-1">{index + 1}</td>
                                    <td className="border p-1">{item.hgk_prdcd}</td>
                                    <td className="border p-1">{FormatNumbers(item.hgk_hrgjual)}</td>
                                    <td className="border p-1">{formatDate(item.hgk_tglawal)}</td>
                                    <td className="border p-1">{formatDate(item.hgk_jamawal)}</td>
                                    <td className="border p-1">{formatDate(item.hgk_tglakhir)}</td>
                                    <td className="border p-1">{formatDate(item.hgk_jamakhir)}</td>
                                    <td className="border p-1">{item.hgk_hariaktif}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {!loading && !error && PromoHjk && PromoHjk.length === 0 && (
                <div className="flex items-center justify-center min-h-full">
                    <p className="text-gray-500">Promo HJK tidak ditemukan !!!</p>
                </div>
            )}
        </div>
    );
};

export default TablePromoHjk;

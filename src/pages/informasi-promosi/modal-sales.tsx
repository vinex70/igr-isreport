import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import useEscapeKey from "@/hooks/useEscapeKey";

type ModalSalesProps = {
    isOpen: boolean;
    onClose: () => void;
    plu: string | undefined;
    deskripsi: string | null;
};

type SalesItem = {
    bln: string;
    qty_mb: number;
    netto_mb: number;
    qty_mm: number;
    netto_mm: number;
    qty_omi: number;
    netto_omi: number;
    qty_idm: number;
    netto_idm: number;
};

const ModalTrendSales: React.FC<ModalSalesProps> = ({ isOpen, onClose, plu, deskripsi }) => {
    const { data: dataSales, loading, error } = useFetchDatas<SalesItem[]>(
        "/api/informasi-promosi/trendsales",
        { plu }
    );

    useEscapeKey(onClose);

    // Dapatkan bulan berjalan (format 3 huruf, contoh: "Mar")
    const currentMonth = new Date().toLocaleString("en-US", { month: "short" }).toUpperCase();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white w-[90%] max-h-[90vh] p-6 rounded-md shadow-lg relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">Trend Sales - PLU: {plu} - {deskripsi}</h2>

                {loading && <p className="text-blue-500">Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && dataSales && dataSales.length > 0 ? (
                    <div className="flex-grow overflow-y-auto border">
                        <table className="table w-full">
                            <thead className="table-header sticky top-0">
                                <tr className="bg-blue-400">
                                    <th className="p-2 border" rowSpan={2}>BULAN</th>
                                    <th className="p-2 border" colSpan={2}>MEMBER BIRU</th>
                                    <th className="p-2 border" colSpan={2}>OMI</th>
                                    <th className="p-2 border" colSpan={2}>IDM</th>
                                    <th className="p-2 border" colSpan={2}>MEMBER MERAH</th>
                                    <th className="p-2 border" colSpan={2}>TOTAL</th> {/* Tambah TOTAL */}
                                </tr>
                                <tr className="bg-blue-400">
                                    <th className="p-2 border">QTY</th>
                                    <th className="p-2 border">NETTO</th>
                                    <th className="p-2 border">QTY</th>
                                    <th className="p-2 border">NETTO</th>
                                    <th className="p-2 border">QTY</th>
                                    <th className="p-2 border">NETTO</th>
                                    <th className="p-2 border">QTY</th>
                                    <th className="p-2 border">NETTO</th>
                                    <th className="p-2 border font-bold">QTY</th> {/* Header Total */}
                                    <th className="p-2 border font-bold">NETTO</th> {/* Header Total */}
                                </tr>
                            </thead>
                            <tbody>
                                {dataSales.map((Sales) => {
                                    const totalQty =
                                        Number(Sales.qty_mb) +
                                        Number(Sales.qty_mm) +
                                        Number(Sales.qty_omi) +
                                        Number(Sales.qty_idm);

                                    const totalNetto =
                                        Number(Sales.netto_mb) +
                                        Number(Sales.netto_mm) +
                                        Number(Sales.netto_omi) +
                                        Number(Sales.netto_idm);

                                    return (
                                        <tr
                                            key={Sales.bln}
                                            className={`hover:bg-blue-300 text-center ${Sales.bln.toUpperCase() === currentMonth ? "bg-blue-200" : ""
                                                }`}
                                        >
                                            <td className="p-1 border">{Sales.bln.toUpperCase()}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.qty_mb)}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.netto_mb)}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.qty_omi)}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.netto_omi)}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.qty_idm)}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.netto_idm)}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.qty_mm)}</td>
                                            <td className="p-1 border">{FormatNumbers(Sales.netto_mm)}</td>
                                            {/* Kolom Total */}
                                            <td className="p-1 border font-bold">{FormatNumbers(totalQty)}</td>
                                            <td className="p-1 border font-bold">{FormatNumbers(totalNetto)}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && !error && <p className="text-gray-500">Tidak ada data Trend Sales.</p>
                )}

                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                        onClick={onClose}
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalTrendSales;

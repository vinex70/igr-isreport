import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";
import useEscapeKey from "@/hooks/useEscapeKey";

type ModalPenerimaanProps = {
    isOpen: boolean;
    onClose: () => void;
    plu: string | undefined;
    deskripsi: string | null;
};

type PenerimaanItem = {
    mstd_typetrn: string
    mstd_kodesupplier: string
    mstd_namasupplier: string
    mstd_qty: number
    mstd_qtybonus1: number
    mstd_qtybonus2: number
    mstd_nodoc: string
    mstd_tgldoc: string
    mstd_jam: string
    mstd_lastcost: number
    mstd_avgcost: string
    mstd_create_dt: string
};

const ModalPenerimaan: React.FC<ModalPenerimaanProps> = ({ isOpen, onClose, plu, deskripsi }) => {
    const { data: penerimaanData, loading, error } = useFetchDatas<PenerimaanItem[]>(
        "/api/informasi-promosi/penerimaanproduk",
        { plu }
    );

    // Handle shortcut ESC untuk menutup modal
    useEscapeKey(onClose);

    if (!isOpen) return null; // Jangan tampilkan modal jika tidak aktif

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white w-[90%] max-h-[90vh] p-6 rounded-md shadow-lg relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">Penerimaan - PLU: {plu} - {deskripsi}</h2>

                {loading && <p className="text-blue-500">Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && penerimaanData && penerimaanData.length > 0 ? (
                    <div className="flex-grow overflow-y-auto border">
                        <table className="table w-full">
                            <thead className="table-header sticky top-0">
                                <tr className="bg-gray-200">
                                    <th className="p-2 border">Supplier</th>
                                    <th className="p-2 border">Qty</th>
                                    <th className="p-2 border">Bonus 1</th>
                                    <th className="p-2 border">Bonus 2</th>
                                    <th className="p-2 border">Docno</th>
                                    <th className="p-2 border">Tanggal</th>
                                    <th className="p-2 border">Jam</th>
                                    <th className="p-2 border">LCost</th>
                                    <th className="p-2 border">ACost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {penerimaanData.map((penerimaan) => (
                                    <tr key={penerimaan.mstd_nodoc} className="hover:bg-blue-300 text-center">
                                        <td className="p-2 border">{penerimaan.mstd_namasupplier}</td>
                                        <td className="p-2 border">{penerimaan.mstd_qty}</td>
                                        <td className="p-2 border">{penerimaan.mstd_qtybonus1}</td>
                                        <td className="p-2 border">{penerimaan.mstd_qtybonus2}</td>
                                        <td className="p-2 border">{penerimaan.mstd_nodoc}</td>
                                        <td className="p-2 border">{formatDate(penerimaan.mstd_tgldoc)}</td>
                                        <td className="p-2 border">{penerimaan.mstd_jam}</td>
                                        <td className="p-2 border">{FormatNumbers(penerimaan.mstd_lastcost)}</td>
                                        <td className="p-2 border">{FormatNumbers(penerimaan.mstd_avgcost)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && !error && <p className="text-gray-500">Tidak ada data Penerimaan.</p>
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

export default ModalPenerimaan;

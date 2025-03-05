import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";
import useEscapeKey from "@/hooks/useEscapeKey";

type ModalPbPoBtbProps = {
    isOpen: boolean;
    onClose: () => void;
    plu: string | undefined;
    deskripsi: string | null;
};

type PbPoBtbItem = {
    pbh_tglpb: string;
    pbd_nopb: string;
    pbd_prdcd: string;
    pbd_qtypb: string;
    pbd_rp: string;
    pbd_pkmt: string;
    pbd_saldoakhir: string;
    pbh_keteranganpb: string;
    pbd_nopo: string;
    tpod_tglpo: string;
    tpod_qtypo: string;
    mstd_nodoc: string;
    mstd_tgldoc: string;
    mstd_qty: string;
    mstd_rp: string;
    sup_jangkawaktukirimbarang: string;
    hgb_kodesupplier: string;
    sup_namasupplier: string;
    ket: string;
};

const ModalPbPoBtbt: React.FC<ModalPbPoBtbProps> = ({ isOpen, onClose, plu, deskripsi }) => {
    const { data: pbpobtb, loading, error } = useFetchDatas<PbPoBtbItem[]>(
        "/api/informasi-promosi/datapb-po-btb",
        { plu }
    );

    // Handle shortcut ESC untuk menutup modal
    useEscapeKey(onClose);

    if (!isOpen) return null; // Jangan tampilkan modal jika tidak aktif

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white w-[90%] max-h-[90vh] p-6 rounded-md shadow-lg relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">PB PO BTB - PLU: {plu} - {deskripsi}</h2>

                {loading && <p className="text-blue-500">Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && pbpobtb && pbpobtb.length > 0 ? (
                    <div className="flex-grow overflow-y-auto border">
                        <table className="table w-full">
                            <thead className="table-header sticky top-0 text-black">
                                <tr className="bg-blue-400 text-xs border border-white">
                                    <th className="p-2 border border-white" colSpan={7}>PB</th>
                                    <th className="p-2 border border-white" colSpan={3}>PO</th>
                                    <th className="p-2 border border-white" colSpan={8}>BTB</th>
                                </tr>

                                <tr className="bg-blue-400 text-xs border border-white">
                                    <th className="p-2 border border-white">No</th>
                                    <th className="p-2 border border-white">Tgl</th>
                                    <th className="p-2 border border-white">Qty</th>
                                    <th className="p-2 border border-white">Rp</th>
                                    <th className="p-2 border border-white">Pkmt</th>
                                    <th className="p-2 border border-white">Saldo Akhir</th>
                                    <th className="p-2 border border-white">Keterangan</th>
                                    <th className="p-2 border border-white">No</th>
                                    <th className="p-2 border border-white">Tgl</th>
                                    <th className="p-2 border border-white">Qty</th>
                                    <th className="p-2 border border-white">No</th>
                                    <th className="p-2 border border-white">Tgl</th>
                                    <th className="p-2 border border-white">Qty</th>
                                    <th className="p-2 border border-white">Rp</th>
                                    <th className="p-2 border border-white">Ket</th>
                                    <th className="p-2 border border-white">Sup</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pbpobtb.map((row) => (
                                    <tr key={row.pbd_nopb.concat(row.pbd_prdcd)} className="hover:bg-blue-200 text-center text-2xs">
                                        <td className="py-2 border">{row.pbd_nopb}</td>
                                        <td className="py-2 border">{formatDate(row.pbh_tglpb)}</td>
                                        <td className="py-2 border">{FormatNumbers(row.pbd_qtypb)}</td>
                                        <td className="py-2 border">{FormatNumbers(row.pbd_rp)}</td>
                                        <td className="py-2 border">{FormatNumbers(row.pbd_pkmt)}</td>
                                        <td className="py-2 border">{FormatNumbers(row.pbd_saldoakhir)}</td>
                                        <td className="py-2 border">{row.pbh_keteranganpb}</td>
                                        <td className="py-2 border">{row.pbd_nopo}</td>
                                        <td className="py-2 border">{formatDate(row.tpod_tglpo)}</td>
                                        <td className="py-2 border">{FormatNumbers(row.tpod_qtypo)}</td>
                                        <td className="py-2 border">{row.mstd_nodoc}</td>
                                        <td className="py-2 border">{formatDate(row.mstd_tgldoc)}</td>
                                        <td className="py-2 border">{FormatNumbers(row.mstd_qty)}</td>
                                        <td className="py-2 border">{FormatNumbers(row.mstd_rp)}</td>
                                        <td className="py-2 border">{row.ket}</td>
                                        <td className="py-2 border">{row.hgb_kodesupplier}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && !error && <p className="text-gray-500">Tidak ada data PB silakan Cek Di PB manual MD.</p>
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

export default ModalPbPoBtbt;

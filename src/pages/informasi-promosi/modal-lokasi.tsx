import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";
import useEscapeKey from "@/hooks/useEscapeKey";

type ModalLokasiProps = {
    isOpen: boolean;
    onClose: () => void;
    plu: string | undefined;
    deskripsi: string | null;
};

type LokasiItem = {
    lks_lokasi: string;
    prd_prdcd: string;
    prd_deskripsipajang: string;
    lks_koderak: string;
    lks_kodesubrak: string;
    lks_tiperak: string;
    lks_shelvingrak: string;
    lks_nourut: string;
    lks_qty: number;
    lks_expdate: string;
};

const ModalLokasi: React.FC<ModalLokasiProps> = ({ isOpen, onClose, plu, deskripsi }) => {
    const { data: lokasiData, loading, error } = useFetchDatas<LokasiItem[]>(
        "/api/informasi-promosi/lokasiproduk",
        { plu }
    );

    // Handle shortcut ESC untuk menutup modal
    useEscapeKey(onClose);

    if (!isOpen) return null; // Jangan tampilkan modal jika tidak aktif

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] p-6 rounded-md shadow-lg relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">Lokasi Stok - PLU: {plu} - {deskripsi}</h2>

                {loading && <p className="text-blue-500">Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && lokasiData && lokasiData.length > 0 ? (
                    <div className="flex-grow overflow-y-auto border">
                        <table className="table w-full">
                            <thead className="table-header sticky top-0">
                                <tr className="bg-gray-200">
                                    <th className="p-2 border">Lokasi</th>
                                    <th className="p-2 border">Rak</th>
                                    <th className="p-2 border">Sub Rak</th>
                                    <th className="p-2 border">Tipe Rak</th>
                                    <th className="p-2 border">Shelving</th>
                                    <th className="p-2 border">No Urut</th>
                                    <th className="p-2 border">Qty</th>
                                    <th className="p-2 border">Tgl Expdate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lokasiData.map((lokasi) => (
                                    <tr key={lokasi.prd_prdcd} className="hover:bg-blue-300 text-center">
                                        <td className="p-2 border">{lokasi.lks_lokasi}</td>
                                        <td className="p-2 border">{lokasi.lks_koderak}</td>
                                        <td className="p-2 border">{lokasi.lks_kodesubrak}</td>
                                        <td className="p-2 border">{lokasi.lks_tiperak}</td>
                                        <td className="p-2 border">{lokasi.lks_shelvingrak}</td>
                                        <td className="p-2 border">{lokasi.lks_nourut}</td>
                                        <td className="p-2 border">{FormatNumbers(lokasi.lks_qty)}</td>
                                        <td className="p-2 border">{formatDate(lokasi.lks_expdate)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && !error && <p className="text-gray-500">Tidak ada data lokasi.</p>
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

export default ModalLokasi;

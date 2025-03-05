import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";
import useEscapeKey from "@/hooks/useEscapeKey";

type ModalSoIcProps = {
    isOpen: boolean;
    onClose: () => void;
    plu: string | undefined;
    deskripsi: string | null;
};

type SoIcItem = {
    rso_tglso: string;
    prd_kodedivisi: string;
    prd_kodedepartement: string;
    prd_kodekategoribarang: string;
    prd_prdcd: string;
    prd_deskripsipanjang: string;
    prd_unit: string;
    prd_frac: string;
    flag: string;
    toko: number;
    gudang: number;
    rso_qtylpp: number;
    rso_qtyreset: number;
    rph: number;
    hgb_kodesupplier: string;
    sup_namasupplier: string;
};

const ModalSoIc: React.FC<ModalSoIcProps> = ({ isOpen, onClose, plu, deskripsi }) => {
    const { data: soic, loading, error } = useFetchDatas<SoIcItem[]>(
        "/api/informasi-promosi/soicproduk",
        { plu }
    );

    // Handle shortcut ESC untuk menutup modal
    useEscapeKey(onClose);

    if (!isOpen) return null; // Jangan tampilkan modal jika tidak aktif

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white w-[90%] max-h-[90vh] p-6 rounded-md shadow-lg relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-bold mb-4">SO IC - PLU: {plu} - {deskripsi}</h2>

                {loading && <p className="text-blue-500">Memuat data...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && soic && soic.length > 0 ? (
                    <div className="flex-grow overflow-y-auto border">
                        <table className="table w-full">
                            <thead className="table-header sticky top-0">
                                <tr className="bg-gray-200 text-xs">
                                    <th className="p-2 border">Tgl SO</th>
                                    <th className="p-2 border">Div</th>
                                    <th className="p-2 border">Dept</th>
                                    <th className="p-2 border">Kat</th>
                                    <th className="p-2 border">Plu</th>
                                    <th className="p-2 border">Unit</th>
                                    <th className="p-2 border">Frac</th>
                                    <th className="p-2 border">Plano Toko</th>
                                    <th className="p-2 border">Plano Gudang</th>
                                    <th className="p-2 border">Lpp</th>
                                    <th className="p-2 border">Qty Reset</th>
                                    <th className="p-2 border">Rupiah</th>
                                    <th className="p-2 border">Kd Supplier</th>
                                    <th className="p-2 border">Nama Supplier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {soic.map((lokasi) => (
                                    <tr key={lokasi.prd_prdcd} className="hover:bg-blue-300 text-center text-xs">
                                        <td className="py-2 border">{formatDate(lokasi.rso_tglso)}</td>
                                        <td className="py-2 border">{lokasi.prd_kodedivisi}</td>
                                        <td className="py-2 border">{lokasi.prd_kodedepartement}</td>
                                        <td className="py-2 border">{lokasi.prd_kodekategoribarang}</td>
                                        <td className="py-2 border">{lokasi.prd_prdcd}</td>
                                        <td className="py-2 border">{lokasi.prd_unit}</td>
                                        <td className="py-2 border">{lokasi.prd_frac}</td>
                                        <td className="py-2 border">{FormatNumbers(lokasi.toko)}</td>
                                        <td className="py-2 border">{FormatNumbers(lokasi.gudang)}</td>
                                        <td className="py-2 border">{FormatNumbers(lokasi.rso_qtylpp)}</td>
                                        <td className="py-2 border">{FormatNumbers(lokasi.rso_qtyreset)}</td>
                                        <td className="py-2 border">{FormatNumbers(lokasi.rph)}</td>
                                        <td className="py-2 border">{lokasi.hgb_kodesupplier}</td>
                                        <td className="py-2 border">{lokasi.sup_namasupplier}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    !loading && !error && <p className="text-gray-500">Tidak ada data SO IC.</p>
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

export default ModalSoIc;

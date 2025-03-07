// src/pages/informasi-promosi/table-satuan-jual.tsx
import React, { useState } from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";
import ModalSettingHarga from "./modal-setting-harga";


type TableSatuanJualProps = {
    plu: string | undefined;
    barcode: string | undefined;
    onSubmit?: (data: SatuanJualItem) => void
};

interface SatuanJualItem {
    prd_kodedepartement: string
    prd_prdcd: string
    prd_deskripsipanjang: string
    prd_unit: string
    prd_frac: string
    prd_hrgjual: number
    prd_kodetag: string
    prc_kodetag: string
    prd_avgcost: number
    prd_minjual: number
    prmd_hrgjual: number
    prmd_tglawal: string
    prmd_tglakhir: string
    prd_lastcost: number
    prd_flagbkp1: string
    prd_flagbkp2: string
    st_harga_netto: number
    st_md_netto: number
    settingHarga: number; // Tambahkan properti ini
    settingMargin: string;
};


const TableSatuanJual: React.FC<TableSatuanJualProps> = ({ plu, barcode, onSubmit = () => { } }) => {

    const pluSatuanJual = plu?.slice(0, 6)

    const { data: satuanJual, loading, error } = useFetchDatas<SatuanJualItem[]>(
        "/api/informasi-promosi/satuan-jual",
        { pluSatuanJual, barcode }
    );

    const [hargaInputs, setHargaInputs] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemsToEdit, setItemsToEdit] = useState<SatuanJualItem[]>([]);

    const HargaNetto = (prd: SatuanJualItem): number => {
        if (prd.prd_flagbkp1 === "Y" && prd.prd_flagbkp2 === "Y") {
            const hargaNetto = (prd.prd_hrgjual / 11.1) * 10;
            return hargaNetto;
        } else {
            return prd.prd_hrgjual;
        }
    }

    const HargaNettoMd = (prd: SatuanJualItem): number => {
        if (prd.prd_flagbkp1 === "Y" && prd.prd_flagbkp2 === "Y") {
            const hargaNettoMd = (prd.prmd_hrgjual / 11.1) * 10;
            return hargaNettoMd;
        } else {
            return prd.prd_hrgjual;
        }
    }

    const calculateMargin = (hargaNetto: number, avgCost: number): string => {
        if (!hargaNetto || !avgCost || hargaNetto === 0) return ''; // Hindari pembagian dengan 0
        const margin = ((hargaNetto - avgCost) / hargaNetto) * 100;
        return margin.toFixed(2); // Format dengan 2 angka desimal
    };

    // Input Setting Harga
    const handleInputHargaChange = (prd: SatuanJualItem, value: string) => {
        // Hapus semua karakter non-digit sebelum menyimpan ke state
        const numericValue = value.replace(/\D/g, "");
        setHargaInputs((prev) => ({
            ...prev,
            [prd.prd_prdcd]: numericValue,
        }));
    };

    const HandleNettoBaru = React.useCallback(
        (prd: SatuanJualItem) => {
            const HargaBaru = Number(hargaInputs[prd.prd_prdcd] || 0);
            if (prd.prd_flagbkp1 === "Y" && prd.prd_flagbkp2 === "Y") {
                return (HargaBaru / 11.1) * 10;
            } else {
                return HargaBaru;
            }
        },
        [hargaInputs] // hargaInputs adalah dependensi
    );

    const HandleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleAdd = React.useCallback(
        (prd: SatuanJualItem) => {
            const settingHarga = Number(hargaInputs[prd.prd_prdcd] || 0);
            const settingMargin = calculateMargin(HandleNettoBaru(prd), prd.prd_avgcost);

            const newItem = { ...prd, settingHarga, settingMargin };

            // Cek apakah item sudah ada di itemsToEdit
            setItemsToEdit((prevItems) => {
                const existingItemIndex = prevItems.findIndex(item => item.prd_prdcd === prd.prd_prdcd);
                if (existingItemIndex !== -1) {
                    // Jika item sudah ada, update item tersebut
                    const updatedItems = [...prevItems];
                    updatedItems[existingItemIndex] = newItem;
                    return updatedItems;
                } else {
                    // Jika item belum ada, tambahkan item baru
                    return [...prevItems, newItem];
                }
            });

            // Kirim ke onSubmit agar tetap bisa digunakan di luar
            onSubmit(newItem);
        },
        [hargaInputs, HandleNettoBaru, onSubmit]
    );

    // Fungsi untuk menghapus produk berdasarkan pluKey
    const handleDeleteProduct = (pluKey: string) => {
        setItemsToEdit((prev) => prev.filter((item) => item.prd_prdcd.slice(0, 6) !== pluKey));
    };

    return (
        <div className="h-full shadow-xl">
            {loading && <p className="text-blue-500">Memuat data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && satuanJual && satuanJual.length > 0 && (
                <>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="float-end bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold p-2 rounded">
                        View Setting Harga
                    </button>

                    <table className="table w-full">
                        <thead>
                            <tr className="border text-white text-sm">
                                <th className="text-center border bg-blue-400" rowSpan={2}>#</th>
                                <th className="text-center border bg-blue-400" rowSpan={2}>Satuan</th>
                                <th className="text-center border bg-blue-400" rowSpan={2}>Acost</th>
                                <th className="text-center border bg-blue-400" rowSpan={2}>Hrg</th>
                                <th className="text-center border bg-blue-400" rowSpan={2}>Mrg</th>
                                <th className="border text center bg-green-400" colSpan={4}>Promo MD</th>
                                <th className="border text center bg-red-400" colSpan={2}>Setting</th>
                                <th className="border text center bg-blue-400" rowSpan={2}>Action</th>
                            </tr>
                            <tr className="border text-white text-sm">
                                <th className="p-2 border bg-green-400">Hrg</th>
                                <th className="p-2 border bg-green-400">Mrg</th>
                                <th className="p-2 border bg-green-400">Awal</th>
                                <th className="p-2 border bg-green-400">Akhir</th>
                                <th className="p-2 border bg-red-400">Hrg</th>
                                <th className="p-2 border bg-red-400">Mrg</th>
                            </tr>
                        </thead>
                        <tbody>
                            {satuanJual.map((prd) => {
                                const hargaNettoValue = HargaNetto(prd);
                                const hargaNettoValueMd = HargaNettoMd(prd);
                                const hargaNettoBaru = HandleNettoBaru(prd);

                                return (
                                    <tr key={prd.prd_prdcd} className="border text-sm">
                                        <td className="p-1 border text-center">{prd.prd_prdcd.slice(-1)}</td>
                                        <td className="p-1 border text-center">{prd.prd_unit + " / " + prd.prd_frac}</td>
                                        <td className="p-1 border text-end">{FormatNumbers(prd.prd_avgcost)}</td>
                                        <td className="p-1 border text-end">{FormatNumbers(prd.prd_hrgjual)}</td>
                                        <td className="p-1 border text-end">{calculateMargin(hargaNettoValue, prd.prd_avgcost)}</td>
                                        <td className="p-1 border text-end">{FormatNumbers(prd.prmd_hrgjual)}</td>
                                        <td className="p-1 border text-end">{calculateMargin(hargaNettoValueMd, prd.prd_avgcost)}</td>
                                        <td className="p-1 border text-center">{formatDate(prd.prmd_tglawal)}</td>
                                        <td className="p-1 border text-center">{formatDate(prd.prmd_tglakhir)}</td>
                                        {/* Input setting harga */}
                                        <td className="p-1 border text-center">
                                            <input
                                                type="text"
                                                className={`w-24 text-end ${hargaInputs[prd.prd_prdcd] ? "bg-green-200" : ""}`}
                                                value={FormatNumbers(hargaInputs[prd.prd_prdcd])}
                                                onChange={(e) => handleInputHargaChange(prd, e.target.value)}
                                            />
                                        </td>

                                        <td className="p-1 border text-center">
                                            {(hargaNettoBaru ? calculateMargin(hargaNettoBaru, prd.prd_avgcost) : calculateMargin(hargaNettoValue, prd.prd_avgcost))}
                                        </td>

                                        <td className="p-1 border text-center">
                                            <button
                                                className={`${hargaInputs[prd.prd_prdcd] ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"} text-white font-bold p-1 rounded`}
                                                onClick={() => handleAdd(prd)}
                                                disabled={!hargaInputs[prd.prd_prdcd]}
                                            >
                                                Simpan
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <ModalSettingHarga isOpen={isModalOpen} onClose={HandleCloseModal} product={itemsToEdit} onDelete={handleDeleteProduct} />
                </>
            )}

            {!loading && !error && satuanJual && satuanJual.length === 0 && (
                <div className="flex items-center justify-center min-h-full">
                    <p className="text-gray-500">Produk tidak ditemukan !!!</p>
                </div>
            )}
        </div>
    );
};

export default TableSatuanJual;

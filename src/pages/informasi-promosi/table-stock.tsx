import React, { useState } from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import ModalLokasi from "@/pages/informasi-promosi/modal-lokasi";
import ModalSoIc from "@/pages/informasi-promosi/modal-soic";
import ModalPbPoBtbt from "./modal-pb-po-btb";

type TableStockProps = {
    plu: string | undefined;
    barcode: string | undefined;
};

type StockItem = {
    prd_prdcd: string;
    prc_pluomi: string;
    prd_deskripsipanjang: string;
    prd_stock: number;
    prd_frac: number;
    avg_sales: number;
    pb_out: number;
    prd_kodedivisi: string;
    div_namadivisi: string;
    prd_kodedepartement: string;
    dep_namadepartement: string;
    prd_kodekategoribarang: string;
    kat_namakategori: string;
};

// Daftar modal yang tersedia
const modals = {
    lokasi: ModalLokasi,
    pb: ModalPbPoBtbt,
    soic: ModalSoIc,
} as const;

type ModalType = keyof typeof modals;

const TableStock: React.FC<TableStockProps> = ({ plu, barcode }) => {
    const { data: stockData, loading, error } = useFetchDatas<StockItem[]>(
        "/api/informasi-promosi/datastock",
        { plu, barcode }
    );

    const [activeModal, setActiveModal] = useState<ModalType | null>(null);
    const [selectedPLU, setSelectedPLU] = useState<string | null>(null);
    const [selectedDeskripsi, setSelectedDeskripsi] = useState<string | null>(null);

    const handleOpenModal = (modalType: ModalType, plu: string, deskripsi: string) => {
        setSelectedPLU(plu);
        setSelectedDeskripsi(deskripsi);
        setActiveModal(modalType);
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setSelectedPLU(null);
        setSelectedDeskripsi(null);
    };

    return (
        <div className="border rounded-md bg-gray-50 h-full shadow-xl">
            {loading && <p className="text-blue-500">Memuat data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && stockData && stockData.length > 0 && (
                <div className="border">
                    {stockData.map((item) => (
                        <div key={item.prd_prdcd}>
                            {/* Kolom PLU */}
                            <div className="grid grid-cols-3 border">
                                <div className="col-span-1 border-r">
                                    <div className="grid grid-cols-2 border-b">
                                        <div className="p-2 font-medium border-r bg-gray-200">PLU IGR</div>
                                        <div className="p-2">{item.prd_prdcd}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="p-2 font-medium border-r bg-gray-200">PLU OMI</div>
                                        <div className="p-2">{item.prc_pluomi}</div>
                                    </div>
                                </div>

                                {/* Kolom Deskripsi */}
                                <div className="col-span-2 flex items-center justify-center p-2">
                                    <h1 className="text-center">{item.prd_deskripsipanjang}</h1>
                                </div>
                            </div>

                            {/* Kolom Stock */}
                            <div className="flex border w-full text-center">
                                <div className="flex-1 p-4 border-r">
                                    <h1 className="text-3xl font-semibold">Stock</h1>
                                </div>
                                <div className="flex-1 p-4 border-r flex items-center justify-center text-3xl">
                                    {Math.floor(item.prd_stock / item.prd_frac)} .Ctn
                                </div>
                                <div className="flex-1 p-4 flex items-center justify-center text-3xl">
                                    {item.prd_stock % item.prd_frac} .Pcs
                                </div>
                            </div>

                            {/* Kolom Avg Sales dan Pb Out */}
                            <div className="flex border w-full text-center">
                                <div className="flex-1 p-2 border-r">
                                    <h1>Avg Sales</h1>
                                </div>
                                <div className="flex-1 p-2 flex items-center justify-center">
                                    Rp. {FormatNumbers(item.avg_sales)}
                                </div>
                                <div className="flex-1 p-2 border-r">
                                    <h1>Pb Out</h1>
                                </div>
                                <div className={`flex-1 p-2 flex items-center justify-center ${item.pb_out === null ? "text-red-500" : ""}`}>
                                    {item.pb_out === null ? 0 : FormatNumbers(item.pb_out)}
                                </div>
                            </div>

                            {/* Kolom div dept katb */}
                            <div className="flex items-center justify-center border w-full p-4 text-xs">
                                ({item.prd_kodedivisi}) - {item.div_namadivisi},
                                ({item.prd_kodedepartement}) - {item.dep_namadepartement},
                                ({item.prd_kodekategoribarang}) - {item.kat_namakategori}
                            </div>

                            {/* Tombol untuk membuka modal */}
                            <div className="flex justify-center p-2 gap-2">
                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                                    onClick={() => handleOpenModal("lokasi", item.prd_prdcd, item.prd_deskripsipanjang)}
                                >
                                    Lokasi
                                </button>

                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                                    onClick={() => handleOpenModal("soic", item.prd_prdcd, item.prd_deskripsipanjang)}
                                >
                                    So Ic
                                </button>

                                <button
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                                    onClick={() => handleOpenModal("pb", item.prd_prdcd, item.prd_deskripsipanjang)}
                                >
                                    Pb
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && stockData && stockData.length === 0 && (
                <div className="flex items-center justify-center min-h-full">
                    <p className="text-gray-500">Produk tidak ditemukan !!!</p>
                </div>
            )}

            {/* Render modal secara dinamis */}
            {activeModal && selectedPLU && (
                React.createElement(modals[activeModal], {
                    isOpen: !!activeModal,
                    onClose: handleCloseModal,
                    plu: selectedPLU,
                    deskripsi: selectedDeskripsi
                })
            )}
        </div>
    );
};

export default TableStock;

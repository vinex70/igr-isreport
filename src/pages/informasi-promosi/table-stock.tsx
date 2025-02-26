import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";

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


const TableStock: React.FC<TableStockProps> = ({ plu, barcode }) => {
    const { data: stockData, loading, error } = useFetchDatas<StockItem[]>(
        "/api/informasi-promosi/datastock",
        { plu, barcode }
    );

    return (
        <div className="border rounded-md bg-gray-50 h-full">
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

                            {/* Kolom Modal */}
                            <div>

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
        </div>

    );
};

export default TableStock;

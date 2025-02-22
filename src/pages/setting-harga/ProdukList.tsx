import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportToExcelStyled } from "@/utils/excelExport";
import React from "react";

interface ProdukListProps {
    items: {
        prd_kodedivisi: string;
        prd_kodedepartement: string;
        prd_unit: string;
        prd_frac: string;
        prd_prdcd: string;
        prd_deskripsipanjang: string;
        prd_satuanbeli: string;
        prd_isibeli: number;
        prd_lastcost: number;
        prd_avgcost: number;
        prd_hrgjual: number;
        settingHarga: number;
        settingMargin: string;
        st_harga_netto: number;
        st_md_netto: number;
        prmd_hrgjual: number;
    }[];
    onHapus: (prd_prdcd: string) => void;
}

const ProdukList: React.FC<ProdukListProps> = ({ items, onHapus }) => {
    const formatRupiah = (value: number | string): string => {
        const numericValue = Number(value);
        if (isNaN(numericValue)) return "0";
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(numericValue);
    };

    // Fungsi untuk mengekspor data ke Excel
    const handleExport = () => {
        const headers = ["#", "PLU", "Deskripsi", "Satuan", "Acost", "Harga", "Setting Harga", "Margin"];
        const data = items.map((item, index) => [
            index + 1,
            item.prd_prdcd,
            item.prd_deskripsipanjang,
            `${item.prd_unit} / ${item.prd_frac}`,
            formatRupiah(item.prd_lastcost),
            formatRupiah(item.prd_hrgjual),
            formatRupiah(item.settingHarga),
            item.settingMargin + "%",
        ]);
        exportToExcelStyled({
            title: "Daftar Update Harga Produk",
            headers,
            data,
            fileName: "Daftar Update Harga Produk.xlsx",
        });
    };

    return (
        <div>
            {items.length === 0 ? "" : (
                <div className="container mx-auto my-5">
                    <h3 className="text-center text-2xl font-semibold mb-4">Daftar Update Harga Produk</h3>
                    <button
                        onClick={handleExport}
                        className="mb-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Export to Excel
                    </button>
                    <Table>
                        <TableHeader className="bg-blue-400">
                            <TableRow>
                                <TableHead className="text-xs text-black border border-solid text-center">#</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">PLU</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">Deskripsi</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">Satuan</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">Acost</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">Harga</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">Setting Harga</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">Margin</TableHead>
                                <TableHead className="text-xs text-black border border-solid text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((prd, index) => (
                                <TableRow key={prd.prd_prdcd}>
                                    {[
                                        index + 1,
                                        prd.prd_prdcd,
                                        prd.prd_deskripsipanjang,
                                        `${prd.prd_unit} / ${prd.prd_frac}`,
                                        formatRupiah(Number(prd.prd_avgcost)),
                                        formatRupiah(Number(prd.prd_hrgjual)),
                                        formatRupiah(Number(prd.settingHarga)),
                                        prd.settingMargin + " %",
                                    ].map((cell, idx) => (
                                        <TableCell
                                            key={idx}
                                            className="text-xs text-black border border-solid text-center"
                                        >
                                            {cell}
                                        </TableCell>
                                    ))}
                                    <TableCell className="text-xs text-black border border-solid text-center">
                                        <button
                                            onClick={() => onHapus(prd.prd_prdcd)}
                                            className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
};

export default ProdukList;

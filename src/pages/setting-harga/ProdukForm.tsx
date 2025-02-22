// pages/setting-harga/ProdukForm.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React, { useState } from "react";

interface ProdukFormProps {
    produk: {
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
        st_harga_netto: number;
        st_md_netto: number;
        prmd_hrgjual: number;
        prd_flagbkp1: string;
        prd_flagbkp2: string;
    }[];
    onSubmit: (item: {
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
        settingHarga: number; // Tambahkan properti ini
        settingMargin: string;
        st_harga_netto: number;
        st_md_netto: number;
        prmd_hrgjual: number;
        prd_flagbkp1: string;
        prd_flagbkp2: string;
    }) => void;
}

const ProdukForm: React.FC<ProdukFormProps> = React.memo(({ produk, onSubmit }) => {
    const [hargaInputs, setHargaInputs] = useState<{ [key: string]: string }>({});
    // const [marginInputs, setMarginInputs] = useState<{ [key: string]: string }>({});


    const hargaNetto = (prd: typeof produk[number]): number => {
        if (prd.prd_flagbkp1 === "Y" && prd.prd_flagbkp2 === "Y") {
            const hargaNetto = (prd.prd_hrgjual / 11.1) * 10;
            return hargaNetto;
        } else {
            return prd.prd_hrgjual;
        }
    }

    const hargaNettoMd = (prd: typeof produk[number]): number => {
        if (prd.prd_flagbkp1 === "Y" && prd.prd_flagbkp2 === "Y") {
            const hargaNetto = (prd.prmd_hrgjual / 11.1) * 10;
            return hargaNetto;
        } else {
            return prd.st_md_netto;
        }
    }

    const formatRupiah = (value: number | string): string => {
        // Pastikan nilai menjadi angka valid
        const numericValue = Number(value);
        if (isNaN(numericValue)) return "0";

        // Format angka dengan separator ribuan (.) dan desimal (,)
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2, // Sesuaikan jumlah desimal jika diperlukan
        }).format(numericValue);
    };

    const calculateMargin = (hargaNetto: number, avgCost: number): string => {
        if (!hargaNetto || !avgCost || hargaNetto === 0) return ''; // Hindari pembagian dengan 0
        const margin = ((hargaNetto - avgCost) / hargaNetto) * 100;
        return margin.toFixed(2); // Format dengan 2 angka desimal
    };

    // const handleInputMarginChange = (prdcd: string, value: string) => {
    //     // Hapus semua karakter non-digit sebelum menyimpan ke state
    //     const numericValue = value.replace(/\D/g, "");
    //     setMarginInputs((prev) => ({
    //         ...prev,
    //         [prdcd]: numericValue,
    //     }));
    // };

    const handleInputHargaChange = (prdcd: string, value: string) => {
        // Hapus semua karakter non-digit sebelum menyimpan ke state
        const numericValue = value.replace(/\D/g, "");
        setHargaInputs((prev) => ({
            ...prev,
            [prdcd]: numericValue,
        }));
    };

    const handleNettoBaru = React.useCallback(
        (prd: typeof produk[number]) => {
            const HargaBaru = Number(hargaInputs[prd.prd_prdcd] || 0);
            if (prd.prd_flagbkp1 === "Y" && prd.prd_flagbkp2 === "Y") {
                return (HargaBaru / 11.1) * 10;
            } else {
                return HargaBaru;
            }
        },
        [hargaInputs] // hargaInputs adalah dependensi
    );

    // const handleMarginBaru = (prd: typeof produk[number]) => {
    //     const Mgr = Number(marginInputs[prd.prd_prdcd] || 0);
    //     if (Mgr === 0) return 0
    //     const Netto = prd.prd_avgcost / (1 - (Mgr / 100))
    //     if (prd.prd_flagbkp1 === "Y" && prd.prd_flagbkp2 == "Y") {
    //         const Harga = (Netto * 11.1) / 10
    //         return Harga
    //     } else {
    //         return Netto
    //     }
    // }

    const handleAdd = React.useCallback(
        (prd: typeof produk[number]) => {
            const settingHarga = Number(hargaInputs[prd.prd_prdcd] || 0);
            const settingMargin = calculateMargin(handleNettoBaru(prd), prd.prd_avgcost);
            onSubmit({ ...prd, settingHarga, settingMargin });
        },
        [onSubmit, hargaInputs, handleNettoBaru],
    );

    return (
        <div className="container mx-auto">
            {produk.length === 0 ? (
                <div className="text-center">
                    <p>Tidak ada data produk.</p>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-semibold">{produk[0].prd_prdcd} - {produk[0].prd_deskripsipanjang}</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="bg-blue-500 text-xs text-black border border-solid text-center" rowSpan={2}>#</TableHead>
                                <TableHead className="bg-blue-500 text-xs text-black border border-solid text-center" rowSpan={2}>Satuan</TableHead>
                                <TableHead className="bg-blue-500 text-xs text-black border border-solid text-center" rowSpan={2}>Acost</TableHead>
                                <TableHead className="bg-blue-500 text-xs text-black border border-solid text-center" rowSpan={2}>Harga</TableHead>
                                <TableHead className="bg-blue-500 text-xs text-black border border-solid text-center" rowSpan={2}>Margin</TableHead>
                                <TableHead className="bg-green-500 text-xs text-black border border-solid text-center" colSpan={2}>Promosi MD</TableHead>
                                <TableHead className="bg-red-400 text-xs text-black border border-solid text-center" colSpan={2}>Setting</TableHead>
                                <TableHead className="bg-blue-500 text-xs text-black border border-solid text-center" rowSpan={2}>Add</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead className="bg-green-500 text-xs text-black border border-solid text-center">Hrg MD</TableHead>
                                <TableHead className="bg-green-500 text-xs text-black border border-solid text-center">Mgr MD</TableHead>
                                <TableHead className="bg-red-400 text-xs text-black border border-solid text-center">Harga</TableHead>
                                <TableHead className="bg-red-400 text-xs text-black border border-solid text-center">Margin</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {produk.map((prd) => {
                                const hargaNettoValue = hargaNetto(prd);
                                const hargaNettoMdValue = hargaNettoMd(prd);
                                const NettoBaru = handleNettoBaru(prd);
                                // const MarginBaru = handleMarginBaru(prd);

                                return (

                                    <TableRow key={prd.prd_prdcd}>
                                        {[
                                            prd.prd_prdcd.slice(-1),
                                            `${prd.prd_unit} / ${prd.prd_frac}`,
                                            formatRupiah(prd.prd_avgcost),
                                            formatRupiah(Number(prd.prd_hrgjual)),
                                            calculateMargin(hargaNettoValue, prd.prd_avgcost) + " %",
                                            formatRupiah(prd.prmd_hrgjual),
                                            calculateMargin(hargaNettoMdValue, prd.prd_avgcost) + " %",
                                        ].map((cell, idx) => (
                                            <TableCell key={idx} className="text-xs text-black border border-solid text-center">
                                                {cell}
                                            </TableCell>
                                        ))}
                                        <TableCell className="text-xs text-black border border-solid text-center">
                                            <Input
                                                type="text"
                                                value={formatRupiah(hargaInputs[prd.prd_prdcd])}
                                                onChange={(e) => handleInputHargaChange(prd.prd_prdcd, e.target.value)}
                                                className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0 text-center"
                                            />
                                        </TableCell>

                                        <TableCell className="text-xs text-black border border-solid text-center">
                                            {(NettoBaru ? `${calculateMargin(NettoBaru, prd.prd_avgcost)} %` : "")}
                                        </TableCell>


                                        <TableCell className="text-xs text-black border border-solid text-center">
                                            <Button
                                                className={`${hargaInputs[prd.prd_prdcd] ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"} text-white font-bold py-2 px-4 rounded`}
                                                onClick={() => handleAdd(prd)}
                                                disabled={!hargaInputs[prd.prd_prdcd]} // Nonaktifkan tombol jika input harga kosong
                                            >
                                                Tambah
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
});

export default ProdukForm;

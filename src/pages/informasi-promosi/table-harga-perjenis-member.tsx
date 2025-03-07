// src/pages/informasi-promosi/table-satuan-jual.tsx
import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";


type TableHargaPerjenisMemberProps = {
    plu: string | undefined;
    barcode: string | undefined;
};

interface HargaPerjenisMemberItem {
    plu: string;
    hrgmm: number;
    cbmm: number;
    hrg_netmm: number;
    hrgbiru: number;
    cbbiru: number;
    hrg_netbiru: number;
    hrgpla: number;
    cbpla: number;
    hrg_netpla: number;
};


const TableHargaPerjenisMember: React.FC<TableHargaPerjenisMemberProps> = ({ plu, barcode }) => {

    const pluSatuanJual = plu?.slice(0, 6)

    const { data: HargaPerjenisMember, loading, error } = useFetchDatas<HargaPerjenisMemberItem[]>(
        "/api/informasi-promosi/cashback-jenismember",
        { pluSatuanJual, barcode }
    );

    console.log(HargaPerjenisMember);

    return (
        <div className="h-full shadow-xl">
            {loading && <p className="text-blue-500">Memuat data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && HargaPerjenisMember && HargaPerjenisMember.length > 0 && (
                <>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center text-sm border">
                                <th className="text-white bg-gray-400" rowSpan={2}>#</th>
                                <th className="text-white bg-red-500" colSpan={3}>Member Merah</th>
                                <th className="text-white bg-blue-500" colSpan={3}>Member Biru</th>
                                <th className="text-white bg-zinc-600" colSpan={3}>Member Platinum</th>
                            </tr>
                            <tr className="text-center text-sm border">
                                <th className="text-white border bg-red-500">Harga</th>
                                <th className="text-white border bg-red-500">Cb</th>
                                <th className="text-white border bg-red-500">Harga Net</th>
                                <th className="text-white border bg-blue-500">Harga</th>
                                <th className="text-white border bg-blue-500">Cb</th>
                                <th className="text-white border bg-blue-500">Harga Net</th>
                                <th className="text-white border bg-zinc-600">Harga</th>
                                <th className="text-white border bg-zinc-600">Cb</th>
                                <th className="text-white border bg-zinc-600">Harga Net</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HargaPerjenisMember.map((item) => (
                                <tr key={item.plu} className="text-center text-sm border">
                                    <td className="border">{item.plu.slice(-1)}</td>
                                    <td className="border">{FormatNumbers(item.hrgmm)}</td>
                                    <td className="border">{FormatNumbers(item.cbmm)}</td>
                                    <td className="border">{FormatNumbers(item.hrg_netmm)}</td>
                                    <td className="border">{FormatNumbers(item.hrgbiru)}</td>
                                    <td className="border">{FormatNumbers(item.cbbiru)}</td>
                                    <td className="border">{FormatNumbers(item.hrg_netbiru)}</td>
                                    <td className="border">{FormatNumbers(item.hrgpla)}</td>
                                    <td className="border">{FormatNumbers(item.cbpla)}</td>
                                    <td className="border">{FormatNumbers(item.hrg_netpla)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {!loading && !error && HargaPerjenisMember && HargaPerjenisMember.length === 0 && (
                <div className="flex items-center justify-center min-h-full">
                    <p className="text-gray-500">Produk tidak ditemukan !!!</p>
                </div>
            )}
        </div>
    );
};

export default TableHargaPerjenisMember;

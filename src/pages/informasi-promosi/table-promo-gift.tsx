// src/pages/informasi-promosi/table-satuan-jual.tsx
import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";


type TablePromoGiftProps = {
    plu: string | undefined;
    barcode: string | undefined;
};

interface PromoGiftItem {
    gif_prdcd: string;
    gif_kode_promosi: string;
    gif_nama_promosi: string;
    gif_min_beli_pcs: number;
    gif_min_beli_rph: number;
    gif_mulai: string;
    gif_selesai: string;
    gif_jenis_promosi: string;
    gif_min_total_struk: number;
    gif_min_total_sponsor: number;
    gif_max_jml_hari: number;
    gif_max_frek_hari: number;
    gif_max_jml_event: number;
    gif_max_frek_event: number;
    gif_jenis_hadiah: string;
    gif_plu_hadiah: string;
    gif_nama_hadiah: string;
    gif_jumlah_hadiah: number;
    gif_reguler: string;
    gif_reguler_biruplus: string;
    gif_freepass: string;
    gif_retailer: string;
    gif_silver: string;
    gif_gold1: string;
    gif_gold2: string;
    gif_gold3: string;
    gif_platinum: string;
    gfh_tglakhir: string;
    gfh_flagigr: string;
    gfh_flagklik: string;
    gfh_flagspi: string;
    gfh_flagtmi: string;
};


const TablePromoGift: React.FC<TablePromoGiftProps> = ({ plu, barcode }) => {
    const pluSatuanJual = plu?.slice(0, 6) || "";
    const { data: PromoGift, loading, error } = useFetchDatas<PromoGiftItem[]>(
        "/api/informasi-promosi/promo-gift",
        { pluSatuanJual, barcode }
    );

    const jenisMember = (item: PromoGiftItem) => {
        const arrayJenisMember: React.ReactNode[] = [];

        if (item.gif_reguler === "1" || item.gif_reguler_biruplus === "1") {
            arrayJenisMember.push(<span className="bg-blue-500 text-white px-1 rounded text-2xs" key="Mb">Mb</span>);
        }
        if (item.gif_freepass === "1") {
            arrayJenisMember.push(<span className="bg-white text-white px-1 rounded text-2xs" key="Free">Free</span>);
        }
        if (item.gif_retailer === "1" || item.gif_gold1 === "1" || item.gif_gold2 === "1" || item.gif_gold3 === "1" || item.gif_silver === "1") {
            arrayJenisMember.push(<span className="bg-red-500 text-white px-1 rounded text-2xs" key="Mm">Mm</span>);
        }
        if (item.gif_platinum === "1") {
            arrayJenisMember.push(<span className="bg-zinc-500 text-white px-1 rounded text-2xs" key="Sil">Pla</span>);
        }

        return arrayJenisMember.length > 0 ? (
            <div className="flex justify-around">
                {arrayJenisMember}
            </div>
        ) : null;
    }

    const flagPromo = (item: PromoGiftItem) => {
        const arrayFlagPromo: React.ReactNode[] = [];

        if (item.gfh_flagigr === "Y") {
            arrayFlagPromo.push(<span className="bg-blue-500 text-white px-1 rounded text-2xs" key="IGR">IGR</span>);
        }
        if (item.gfh_flagklik === "Y") {
            arrayFlagPromo.push(<span className="bg-yellow-400 text-black px-1 rounded text-2xs" key="Klik">Klik</span>);
        }
        if (item.gfh_flagspi === "Y") {
            arrayFlagPromo.push(<span className="bg-zinc-500 text-white px-1 rounded text-2xs" key="SPI">SPI</span>);
        }
        if (item.gfh_flagtmi === "Y") {
            arrayFlagPromo.push(<span className="bg-red-500 text-white px-1 rounded text-2xs" key="TMI">TMI</span>);
        }

        return arrayFlagPromo.length > 0 ? (
            <div className="flex justify-around items-center">
                {arrayFlagPromo}
            </div>
        ) : null;
    }

    return (
        <div className="h-full shadow-xl">
            {loading && <p className="text-blue-500">Memuat data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && PromoGift && PromoGift.length > 0 && (
                <>
                    <h1 className="p-1 text-xl font-bold text-center bg-slate-300 font-mono">Table Promo Gift</h1>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-2" rowSpan={2}>Kode</th>
                                <th className="border p-2" rowSpan={2}>Nama Promosi</th>
                                <th className="border p-2" colSpan={2}>Minimum Beli</th>
                                <th className="border p-2" colSpan={2}>Minimum Total Belanja</th>
                                <th className="border p-2" colSpan={2}>Maximum Total Belanja</th>
                                <th className="border p-2" colSpan={2}>Maximum / Event</th>
                                <th className="border p-2" colSpan={2}>Hadiah</th>
                                <th className="border p-2" colSpan={2}>Periode</th>
                                <th className="border p-2" rowSpan={2}>Jenis Mem</th>
                                <th className="border p-2" rowSpan={2}>Flag Promo</th>
                            </tr>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-1">Qty</th>
                                <th className="border p-1">Rph</th>
                                <th className="border p-1">Struk</th>
                                <th className="border p-1">Sponsor</th>
                                <th className="border p-1">Jumlh / Hari</th>
                                <th className="border p-1">Frek / Hari</th>
                                <th className="border p-1">Jumlh / Event</th>
                                <th className="border p-1">Frek / Event</th>
                                <th className="border p-1">Qty</th>
                                <th className="border p-1">Nama</th>
                                <th className="border p-1">Awal</th>
                                <th className="border p-1">Mulai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PromoGift.map((item) => (
                                <tr className="text-center text-sm border" key={item.gif_kode_promosi.concat(item.gif_prdcd)}>
                                    <td className="border p-2">{item.gif_kode_promosi}</td>
                                    <td className="border p-2">{item.gif_nama_promosi}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_min_beli_pcs)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_min_beli_rph)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_min_total_struk)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_min_total_sponsor)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_max_jml_hari)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_max_frek_hari)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_max_jml_event)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_max_frek_event)}</td>
                                    <td className="border p-2">{FormatNumbers(item.gif_jumlah_hadiah)}</td>
                                    <td className="border p-2">{item.gif_nama_hadiah}</td>
                                    <td className="border p-2">{formatDate(item.gif_mulai)}</td>
                                    <td className="border p-2">{formatDate(item.gif_selesai)}</td>
                                    <td className="border p-2">{jenisMember(item)}</td>
                                    <td className="border p-2">{flagPromo(item)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {!loading && !error && PromoGift && PromoGift.length === 0 && (
                <div className="flex items-center justify-center min-h-full">
                    <p className="text-gray-500">Promo Gift tidak ditemukan !!!</p>
                </div>
            )}
        </div>
    );
};

export default TablePromoGift;

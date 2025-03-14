// src/pages/informasi-promosi/table-satuan-jual.tsx
import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";


type TablePromoInstoreProps = {
    plu: string | undefined;
    barcode: string | undefined;
};

interface PromoInstoreItem {
    isd_prdcd: string
    isd_kodepromosi: string
    isd_jenispromosi: string
    ish_tglawal: string
    ish_tglakhir: string
    isd_minpcs: number
    isd_minrph: string
    ish_minstruk: number
    ish_prdcdhadiah: string
    bprp_ketpanjang: string
    ish_jmlhadiah: number
    ish_kelipatanhadiah: string
    ish_qtyalokasi: number
    ish_qtyalokasiout: number
    ish_reguler: string
    ish_regulerbiruplus: string
    ish_freepass: string
    ish_retailer: string
    ish_silver: string
    ish_gold1: string
    ish_gold2: string
    ish_gold3: string
    ish_platinum: string
};


const TablePromoInstore: React.FC<TablePromoInstoreProps> = ({ plu, barcode }) => {
    const pluSatuanJual = plu?.slice(0, 6) || "";
    const { data: PromoInstore, loading, error } = useFetchDatas<PromoInstoreItem[]>(
        "/api/informasi-promosi/promo-instore",
        { pluSatuanJual, barcode }
    );

    const jenisMember = (item: PromoInstoreItem) => {
        const arrayJenisMember: React.ReactNode[] = [];

        if (item.ish_reguler === "1" || item.ish_regulerbiruplus === "1") {
            arrayJenisMember.push(<span className="bg-blue-500 text-white px-1 rounded text-2xs" key="Mb">Mb</span>);
        }
        if (item.ish_freepass === "1") {
            arrayJenisMember.push(<span className="bg-white text-white px-1 rounded text-2xs" key="Free">Free</span>);
        }
        if (item.ish_retailer === "1" || item.ish_gold1 === "1" || item.ish_gold2 === "1" || item.ish_gold3 === "1" || item.ish_silver === "1") {
            arrayJenisMember.push(<span className="bg-red-500 text-white px-1 rounded text-2xs" key="Mm">Mm</span>);
        }
        if (item.ish_platinum === "1") {
            arrayJenisMember.push(<span className="bg-zinc-500 text-white px-1 rounded text-2xs" key="Sil">Pla</span>);
        }

        return arrayJenisMember.length > 0 ? (
            <div className="flex justify-around">
                {arrayJenisMember}
            </div>
        ) : null;
    }


    return (
        <div className="h-full shadow-xl">
            {loading && <p className="text-blue-500">Memuat data...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && PromoInstore && PromoInstore.length > 0 && (
                <>
                    <h1 className="p-1 text-xl font-bold text-center bg-slate-300 font-mono">Table Promo Instore</h1>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-2" rowSpan={2}>#</th>
                                <th className="border p-2" rowSpan={2}>Kode</th>
                                <th className="border p-2" colSpan={2}>Periode</th>
                                <th className="border p-2" colSpan={3}>Min Belanja</th>
                                <th className="border p-2" colSpan={6}>Hadiah</th>
                                <th className="border p-2" rowSpan={2}>Jenis Mem</th>
                            </tr>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-1">Mulai</th>
                                <th className="border p-1">Akhir</th>
                                <th className="border p-1">Qty</th>
                                <th className="border p-1">Sponsor</th>
                                <th className="border p-1">Struk Rp</th>
                                <th className="border p-1">Plu</th>
                                <th className="border p-1">Nama</th>
                                <th className="border p-1">Jml</th>
                                <th className="border p-1">Klpt</th>
                                <th className="border p-1">Alokasi</th>
                                <th className="border p-1">Sisa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PromoInstore.map((item, index) => (
                                <tr className="text-center text-sm border" key={item.isd_kodepromosi.concat(item.ish_prdcdhadiah).concat(item.isd_prdcd)}>
                                    <td className="border p-1">{index + 1}</td>
                                    <td className="border p-1">{item.isd_kodepromosi + ' - ' + item.isd_jenispromosi}</td>
                                    <td className="border p-1">{formatDate(item.ish_tglawal)}</td>
                                    <td className="border p-1">{formatDate(item.ish_tglakhir)}</td>
                                    <td className="border p-1">{FormatNumbers(item.isd_minpcs)}</td>
                                    <td className="border p-1">{FormatNumbers(item.isd_minrph)}</td>
                                    <td className="border p-1">{FormatNumbers(item.ish_minstruk)}</td>
                                    <td className="border p-1">{item.ish_prdcdhadiah}</td>
                                    <td className="border p-1">{item.bprp_ketpanjang}</td>
                                    <td className="border p-1">{item.ish_jmlhadiah}</td>
                                    <td className="border p-1">{item.ish_kelipatanhadiah}</td>
                                    <td className="border p-1">{FormatNumbers(item.ish_qtyalokasi)}</td>
                                    <td className="border p-1">{FormatNumbers(item.ish_qtyalokasi - item.ish_qtyalokasiout)}</td>
                                    <td className="border p-1">{jenisMember(item)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {!loading && !error && PromoInstore && PromoInstore.length === 0 && (
                <div className="flex items-center justify-center min-h-full">
                    <p className="text-gray-500">Promo Instore tidak ditemukan !!!</p>
                </div>
            )}
        </div>
    );
};

export default TablePromoInstore;

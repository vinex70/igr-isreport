// src/pages/informasi-promosi/table-satuan-jual.tsx
import React from "react";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useFetchDatas from "@/hooks/useFetchDatas";
import { formatDate } from "@/utils/FormateDate";


type TablePromoCashbackProps = {
    plu: string | undefined;
    barcode: string | undefined;
};

interface PromoCashbackItem {
    cbd_prdcd: string;
    cbd_kodepromosi: string;
    cbh_namapromosi: string;
    cbd_minstruk: number;
    cbh_minrphprodukpromo: number;
    cbh_mintotbelanja: number;
    cbd_cashback: number;
    alokasi: number;
    alokasi_keluar: number;
    cbk_sisa: number;
    cbd_maxstruk: number;
    cbd_maxmemberperhari: number;
    cbd_maxfrekperevent: number;
    cbd_maxrphperevent: number;
    cbd_alokasistok: number;
    cbh_tglawal: string;
    cbh_tglakhir: string;
    cbd_flagkelipatan: number;
    cba_reguler: string
    cba_reguler_biruplus: string
    cba_freepass: string
    cba_retailer: string
    cba_silver: string
    cba_gold1: string
    cba_gold2: string
    cba_gold3: string
    cba_platinum: string
    cbh_flagigr: string;
    cbh_flagklik: string;
    cbh_flagspi: string;
    cbh_flagtmi: string;
};


const TablePromoCashback: React.FC<TablePromoCashbackProps> = ({ plu, barcode }) => {

    const { data: PromoCashback, loading, error } = useFetchDatas<PromoCashbackItem[]>(
        "/api/informasi-promosi/promo-cashback",
        { plu, barcode }
    );

    const jenisMember = (item: PromoCashbackItem) => {
        const arrayJenisMember: React.ReactNode[] = [];

        if (item.cba_reguler === "1" || item.cba_reguler_biruplus === "1") {
            arrayJenisMember.push(<span className="bg-blue-500 text-white px-1 rounded text-2xs" key="Mb">Mb</span>);
        }
        if (item.cba_freepass === "1") {
            arrayJenisMember.push(<span className="bg-white text-white px-1 rounded text-2xs" key="Free">Free</span>);
        }
        if (item.cba_retailer === "1" || item.cba_gold1 === "1" || item.cba_gold2 === "1" || item.cba_gold3 === "1" || item.cba_silver === "1") {
            arrayJenisMember.push(<span className="bg-red-500 text-white px-1 rounded text-2xs" key="Mm">Mm</span>);
        }
        if (item.cba_platinum === "1") {
            arrayJenisMember.push(<span className="bg-zinc-500 text-white px-1 rounded text-2xs" key="Sil">Pla</span>);
        }

        return arrayJenisMember.length > 0 ? (
            <div className="flex justify-around">
                {arrayJenisMember}
            </div>
        ) : null;
    }

    const flagPromo = (item: PromoCashbackItem) => {
        const arrayFlagPromo: React.ReactNode[] = [];

        if (item.cbh_flagigr === "Y") {
            arrayFlagPromo.push(<span className="bg-blue-500 text-white px-1 rounded text-2xs" key="IGR">IGR</span>);
        }
        if (item.cbh_flagklik === "Y") {
            arrayFlagPromo.push(<span className="bg-yellow-400 text-black px-1 rounded text-2xs" key="Klik">Klik</span>);
        }
        if (item.cbh_flagspi === "Y") {
            arrayFlagPromo.push(<span className="bg-zinc-500 text-white px-1 rounded text-2xs" key="SPI">SPI</span>);
        }
        if (item.cbh_flagtmi === "Y") {
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

            {!loading && !error && PromoCashback && PromoCashback.length > 0 && (
                <>
                    <h1 className="p-1 text-xl font-bold text-center bg-slate-300 font-mono">Table Promo Cashback</h1>
                    <table className="w-full">
                        <thead>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-2" rowSpan={2}>Kode</th>
                                <th className="border p-2" rowSpan={2}>Nama Promosi</th>
                                <th className="border p-2" colSpan={3}>Minimum Beli/Struk</th>
                                <th className="border p-2" rowSpan={2}>Nilai CB</th>
                                <th className="border p-2" rowSpan={2}>Jumlah Alokasi</th>
                                <th className="border p-2" rowSpan={2}>Alokasi Keluar</th>
                                <th className="border p-2" rowSpan={2}>Sisa</th>
                                <th className="border p-2" colSpan={4}>Maximum Beli/Struk</th>
                                <th className="border p-2" colSpan={2}>Periode</th>
                                <th className="border p-2" rowSpan={2}>Jenis Mem</th>
                                <th className="border p-2" rowSpan={2}>Flag Promo</th>
                            </tr>
                            <tr className="text-center text-sm text-white font-bold border bg-blue-500">
                                <th className="border p-1">Harga</th>
                                <th className="border p-1">Sponsor Rp</th>
                                <th className="border p-1">Total Rp</th>
                                <th className="border p-1">Struk</th>
                                <th className="border p-1">Mem / Hari</th>
                                <th className="border p-1">Frek / Event</th>
                                <th className="border p-1">Rp / Event</th>
                                <th className="border p-1">Mulai</th>
                                <th className="border p-1">Selesai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PromoCashback.map((item) => (
                                <tr className="text-center text-sm border" key={item.cbd_kodepromosi.concat(item.cbd_prdcd)}>
                                    <td className="border p-2">{item.cbd_kodepromosi}</td>
                                    <td className="border p-2">{item.cbh_namapromosi}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbd_minstruk)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbh_minrphprodukpromo)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbh_mintotbelanja)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbd_cashback)}</td>
                                    <td className="border p-2">{FormatNumbers(item.alokasi)}</td>
                                    <td className="border p-2">{FormatNumbers(item.alokasi_keluar)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbk_sisa)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbd_maxstruk)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbd_maxmemberperhari)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbd_maxfrekperevent)}</td>
                                    <td className="border p-2">{FormatNumbers(item.cbd_maxrphperevent)}</td>
                                    <td className="border p-2">{formatDate(item.cbh_tglawal)}</td>
                                    <td className="border p-2">{formatDate(item.cbh_tglakhir)}</td>
                                    <td className="border">{jenisMember(item)}</td>
                                    <td className="border">{flagPromo(item)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}

            {!loading && !error && PromoCashback && PromoCashback.length === 0 && (
                <div className="flex items-center justify-center min-h-full">
                    <p className="text-gray-500">Promo Cashback tidak ditemukan !!!</p>
                </div>
            )}
        </div>
    );
};

export default TablePromoCashback;

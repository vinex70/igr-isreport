import React, { useEffect, useState } from "react";
import useEscapeKey from "@/hooks/useEscapeKey";
import { FormatNumbers } from "@/utils/FormatNumbers";
import useExportExcel from "@/hooks/useExportExcel"; // Impor useExportExcel
import { formatDate } from "@/utils/FormateDate";

type SatuanJualItem = {
    prd_kodedepartement: string;
    prd_prdcd: string;
    prd_deskripsipanjang: string;
    prd_unit: string;
    prd_frac: string;
    prd_hrgjual: number;
    prd_kodetag: string;
    prc_kodetag: string;
    prd_avgcost: number;
    prd_minjual: number;
    prmd_hrgjual: number;
    prmd_tglawal: string;
    prmd_tglakhir: string;
    prd_lastcost: number;
    prd_flagbkp1: string;
    prd_flagbkp2: string;
    st_harga_netto: number;
    st_md_netto: number;
    settingHarga: number;
    settingMargin: string;
};

type ModalLokasiProps = {
    isOpen: boolean;
    onClose: () => void;
    product: SatuanJualItem[];
    onDelete: (pluKey: string) => void;
};

const ModalSettingHarga: React.FC<ModalLokasiProps> = ({ isOpen, onClose, product, onDelete }) => {
    useEscapeKey(onClose);
    const [displayData, setDisplayData] = useState<SatuanJualItem[]>(product);
    const { exportToExcelStyled } = useExportExcel(); // Gunakan useExportExcel

    useEffect(() => {
        setDisplayData(product);
    }, [product]);

    if (!isOpen || !displayData || displayData.length === 0) return null;

    const groupedData: { [key: string]: { harga0?: number; harga1?: number; harga2?: number; harga3?: number } } = {};

    displayData.forEach((item) => {
        const pluKey = item.prd_prdcd.slice(0, 6);
        const lastDigit = item.prd_prdcd.slice(-1);

        if (!groupedData[pluKey]) {
            groupedData[pluKey] = {};
        }

        if (lastDigit === "0") {
            groupedData[pluKey].harga0 = item.settingHarga;
        } else if (lastDigit === "1") {
            groupedData[pluKey].harga1 = item.settingHarga;
        } else if (lastDigit === "2") {
            groupedData[pluKey].harga2 = item.settingHarga;
        } else if (lastDigit === "3") {
            groupedData[pluKey].harga3 = item.settingHarga;
        }
    });

    const handleDelete = (pluKey: string) => {
        const newData = displayData.filter((item) => item.prd_prdcd.slice(0, 6) !== pluKey);
        setDisplayData(newData);
        onDelete(pluKey);
    };

    const prepareExportData = () => {
        const headers = [
            "#",
            "Plu",
            "Deskripsi",
            "Satuan",
            "Acost",
            "Harga",
            "kode 0",
            "kode 1",
            "kode 2",
            "kode 3",
        ];

        const data = Object.keys(groupedData).map((pluKey, index) => {
            const firstItem = displayData.find((item) => item.prd_prdcd.slice(0, 6) === pluKey);
            return [
                index + 1,
                pluKey + "0",
                firstItem?.prd_deskripsipanjang || "-",
                firstItem ? `${firstItem.prd_unit}/${firstItem.prd_frac}` : "-",
                FormatNumbers(firstItem?.prd_avgcost || "-"),
                FormatNumbers(firstItem?.prd_hrgjual || "-"),
                FormatNumbers(groupedData[pluKey].harga0 || "-"),
                FormatNumbers(groupedData[pluKey].harga1 || "-"),
                FormatNumbers(groupedData[pluKey].harga2 || "-"),
                FormatNumbers(groupedData[pluKey].harga3 || "-"),
            ];
        });

        return { headers, data };
    };

    const handleExport = () => {
        const { headers, data } = prepareExportData();
        exportToExcelStyled({
            title: "Setting Harga",
            headers,
            data,
            fileName: `Setting Harga ${formatDate(new Date().toLocaleDateString())}.xlsx`,
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] p-6 rounded-md shadow-lg relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Setting Harga</h2>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
                            onClick={handleExport} // Panggil handleExport saat tombol diklik
                        >
                            Export to Excel
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            onClick={onClose}
                        >
                            Tutup
                        </button>
                    </div>
                </div>

                <div className="flex-grow overflow-y-auto border shadow-xl mb-2">
                    <table className="w-full border-collapse">
                        <thead className="table-header sticky top-0">
                            <tr className="text-sm">
                                <th className="text-center border bg-blue-400 p-2" rowSpan={2}>#</th>
                                <th className="text-center border bg-blue-400 p-2" rowSpan={2}>Plu</th>
                                <th className="text-center border bg-blue-400 p-2" rowSpan={2}>Deskripsi</th>
                                <th className="text-center border bg-blue-400 p-2" rowSpan={2}>Satuan</th>
                                <th className="text-center border bg-blue-400 p-2" rowSpan={2}>Acost</th>
                                <th className="text-center border bg-blue-400 p-2" rowSpan={2}>Harga</th>
                                <th className="text-center border bg-blue-400 p-2" colSpan={4}>Seting Harga</th>
                                <th className="text-center border bg-blue-400 p-2" rowSpan={2}>Action</th>
                            </tr>
                            <tr>
                                <th className="text-center border bg-blue-400 p-2">0</th>
                                <th className="text-center border bg-blue-400 p-2">1</th>
                                <th className="text-center border bg-blue-400 p-2">2</th>
                                <th className="text-center border bg-blue-400 p-2">3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(groupedData).map((pluKey, index) => {
                                const firstItem = displayData.find((item) => item.prd_prdcd.slice(0, 6) === pluKey);
                                return (
                                    <tr key={pluKey} className="border text-xs">
                                        <td className="border p-2 text-center">{index + 1}</td>
                                        <td className="border p-2 text-center">{firstItem?.prd_prdcd}</td>
                                        <td className="border p-2">{firstItem?.prd_deskripsipanjang || "-"}</td>
                                        <td className="border p-2 text-center">{firstItem ? `${firstItem.prd_unit}/${firstItem.prd_frac}` : "-"}</td>
                                        <td className="border p-2 text-right">{FormatNumbers(firstItem?.prd_avgcost || "-")}</td>
                                        <td className="border p-2 text-right">{FormatNumbers(firstItem?.prd_hrgjual || "-")}</td>
                                        <td className="border p-2 text-right">{FormatNumbers(groupedData[pluKey].harga0 || "-")}</td>
                                        <td className="border p-2 text-right">{FormatNumbers(groupedData[pluKey].harga1 || "-")}</td>
                                        <td className="border p-2 text-right">{FormatNumbers(groupedData[pluKey].harga2 || "-")}</td>
                                        <td className="border p-2 text-right">{FormatNumbers(groupedData[pluKey].harga3 || "-")}</td>
                                        <td className="border p-2 text-center">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold p-2 rounded"
                                                onClick={() => handleDelete(pluKey)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ModalSettingHarga;
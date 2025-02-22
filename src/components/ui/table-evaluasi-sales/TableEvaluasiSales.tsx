import React from "react";
import { FormatNumbers, FormatPercentage } from "@/utils/FormatNumbers";
import { IoSearchSharp } from "react-icons/io5";
import { RiFileExcel2Line } from "react-icons/ri";
import useExportExcel from "@/hooks/useExportExcel"; // Import custom hook
import useSearch from "@/hooks/useSearch"; // Import custom hook untuk pencarian
import { ApiSalesDetail } from "@/types/apiDataSalesDetail";

interface Column {
    key: string | keyof ApiSalesDetail;
    label: string;
    isNumber?: boolean;
}

interface TableReusableProps {
    columns: Column[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[];
    totals?: Record<string, number>;
    className?: string;
    showFooter?: boolean;
    caption?: React.ReactNode;
    inputSearch?: boolean;
    titleText: string;
}

const TableReusable: React.FC<TableReusableProps> = ({
    columns,
    data,
    totals = {},
    className = "",
    showFooter = true,
    caption,
    inputSearch,
    titleText,
}) => {
    // Gunakan custom hook useSearch
    const { searchTerm, handleSearch, filteredData } = useSearch(data, columns.map((col) => col.key));

    // Gunakan custom hook useExportExcel
    const { exportToExcelStyled } = useExportExcel();

    const handleExport = () => {
        const headers = columns.map((col) => col.label);
        const excelData = filteredData.map((row, index) =>
            columns.map((col, colIndex) =>
                colIndex === 0
                    ? index + 1 // Nomor urut
                    : col.key === "dtl_margin_percent"
                        ? row["dtl_netto"]
                            ? `${FormatPercentage((Number(row["dtl_margin"]) / Number(row["dtl_netto"])) * 100)} %`
                            : "0 %"
                        : col.isNumber
                            ? FormatNumbers(Number(row[col.key]))
                            : row[col.key] || "-"
            )
        );

        // Tambahkan total jika ada
        if (showFooter && totals && Object.keys(totals).length > 0) {
            excelData.push(
                columns.map((col, colIndex) =>
                    colIndex === 0
                        ? "Total"
                        : col.key === "dtl_margin_percent"
                            ? totals["dtl_netto"]
                                ? `${FormatPercentage((totals["dtl_margin"] / totals["dtl_netto"]) * 100)} %`
                                : "0 %"
                            : col.isNumber
                                ? FormatNumbers(totals[col.key] || 0)
                                : ""
                )
            );
        }

        exportToExcelStyled({
            title: titleText,
            headers,
            data: excelData,
            fileName: `${titleText}.xlsx`,
        });
    };

    return (
        <>
            <div className="flex justify-between items-center my-5">
                {caption && <h1>{caption}</h1>}
                <div className="flex gap-4">
                    {inputSearch && (
                        <div className="relative flex items-center">
                            <label htmlFor="searchInput" className="absolute right-5 text-lg text-gray-500 cursor-pointer">
                                <IoSearchSharp size={30} className="text-blue-500" />
                            </label>
                            <input
                                id="searchInput"
                                type="text"
                                placeholder="Search..."
                                className="border rounded-md w-96 py-2 px-3 border-black focus:outline-none focus:border-blue-500"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    )}
                    <button
                        onClick={handleExport}
                        className="flex justify-center items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                        <RiFileExcel2Line size={30} className="mr-2" /> Export to Excel
                    </button>
                </div>
            </div>
            <div className="max-h-[70vh] overflow-y-auto shadow-xl">
                <table className={`table w-full border-2 ${className}`}>
                    <thead className="sticky top-0 border bg-blue-400 text-center">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="font-bold">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="border">
                        {filteredData.length > 0 ? (
                            filteredData.map((row, index) => (
                                <tr key={index} className="border hover:bg-blue-200">
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={col.key}
                                            className={`border ${col.isNumber ? "text-right pr-2" : "text-center"}`}
                                        >
                                            {colIndex === 0
                                                ? index + 1
                                                : col.key === "dtl_margin_percent"
                                                    ? row["dtl_netto"]
                                                        ? `${FormatPercentage((Number(row["dtl_margin"]) / Number(row["dtl_netto"])) * 100)} %`
                                                        : "0 %"
                                                    : col.isNumber
                                                        ? FormatNumbers(Number(row[col.key]))
                                                        : row[col.key] || "-"}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                    {showFooter && totals && Object.keys(totals).length > 0 && (
                        <tfoot className="sticky bottom-0 bg-gray-300 font-bold">
                            <tr>
                                <td colSpan={columns.filter((col) => !col.isNumber).length} className="text-right p-2">
                                    Total
                                </td>
                                {columns
                                    .filter((col) => col.isNumber) // Hanya untuk kolom angka
                                    .map((col) => (
                                        <td key={col.key} className="text-right p-2">
                                            {col.key === "dtl_margin_percent"
                                                ? totals["dtl_netto"]
                                                    ? `${FormatPercentage((totals["dtl_margin"] / totals["dtl_netto"]) * 100)} %`
                                                    : "0 %"
                                                : FormatNumbers(totals[col.key] || 0)}
                                        </td>
                                    ))}
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </>
    );
};

export default TableReusable;
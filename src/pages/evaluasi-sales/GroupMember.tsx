import useFetchData from "@/hooks/useFetchData";
import useSearch from "@/hooks/useSearch"; // Import custom hook
import { FormatNumbers, FormatPercentage } from "@/utils/FormatNumbers";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import LoadingIgr from "@/components/ui/loading-igr";
import { exportToExcelStyled } from "@/utils/excelExport";
import { RiFileExcel2Line } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { formatDate } from "@/utils/FormateDate";
import { MdSubdirectoryArrowLeft } from "react-icons/md";

const API_URL = import.meta.env.VITE_BASE_URL;

const GroupMember = () => {
    const location = useLocation();
    const filters = location.state || {};

    const { data, error, isLoading } = useFetchData(`${API_URL}/api/evaluasi-sales/${filters.selectedReport}`, filters);

    // Gunakan custom hook useSearch
    const { searchTerm, handleSearch, filteredData } = useSearch(data, [
        "dtl_tipemember",
        "dtl_outlet",
        "dtl_namaoutlet",
        "dtl_suboutlet",
        "dtl_namasuboutlet",
        "dtl_cusno",
        "dtl_struk",
        "dtl_prdcd_ctn",
        "dtl_qty_pcs",
        "dtl_gross",
        "dtl_netto",
        "dtl_margin",
    ]);

    const groupedData = useMemo(() => {
        const counts: { [key: string]: number } = {};
        data.forEach((item) => {
            counts[item.dtl_tipemember] = (counts[item.dtl_tipemember] || 0) + 1;
        });
        return counts;
    }, [data]);

    let prevGroup = "";

    const handleExport = () => {
        if (!data.length) return;

        const headers = [
            "#",
            "Group",
            "Outlet",
            "Nama Outlet",
            "Sub Outlet",
            "Nama Sub Outlet",
            "Member",
            "Struk",
            "Produk",
            "Qty In Pcs",
            "Gross",
            "Netto",
            "Margin",
            "%"
        ];

        const excelData = data.map((item, index) => [
            index + 1,
            item.dtl_tipemember,
            item.dtl_outlet,
            item.dtl_namaoutlet,
            item.dtl_suboutlet,
            item.dtl_namasuboutlet,
            FormatNumbers(item.dtl_cusno),
            FormatNumbers(item.dtl_struk),
            FormatNumbers(item.dtl_prdcd_ctn),
            FormatNumbers(item.dtl_qty_pcs),
            FormatNumbers(item.dtl_gross),
            FormatNumbers(item.dtl_netto),
            FormatNumbers(item.dtl_margin),
            FormatPercentage(item.dtl_margin / item.dtl_netto * 100) + " %"
        ]);

        // Tambahkan baris total
        const totalRow = [
            "Total", "", "", "", "", "",
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_cusno), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_struk), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_prdcd_ctn), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_qty_pcs), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_gross), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_netto), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_margin), 0)),
            FormatPercentage(
                (data.reduce((sum, item) => sum + Number(item.dtl_margin), 0) /
                    data.reduce((sum, item) => sum + Number(item.dtl_netto), 0)) * 100
            ) + " %"
        ];

        excelData.push(totalRow);

        exportToExcelStyled({
            title: `Evaluasi Sales - ${filters.selectedReport.toUpperCase()}`,
            headers,
            data: excelData,
            fileName: `Evaluasi Sales - ${filters.selectedReport.toUpperCase()}.xlsx`,
        });
    };

    return (
        <>
            {isLoading ? <LoadingIgr /> : error ? <p className="error">{error}</p > :
                <div className="container mx-auto">
                    <div className="my-5">
                        <Link to="/evaluasi-sales">
                            <button className="flex items-center gap-2 justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                <MdSubdirectoryArrowLeft size={30} />  Back Evaluasi Sales
                            </button>
                        </Link>
                    </div>

                    <div className="flex justify-between items-center my-5">
                        <div>
                            <h1 className="text-2xl font-bold">Laporan : Evaluasi Sales - {filters.selectedReport.toUpperCase()}</h1>
                            <p>Periode : {formatDate(filters.startDate)} s/d {formatDate(filters.endDate)}</p>
                        </div>
                        <div className="flex gap-4">
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
                            <button onClick={handleExport} className="flex justify-center items-center bg-green-500 text-white px-4 rounded-md hover:bg-green-700">
                                <RiFileExcel2Line size={30} className="mr-2" /> Export to Excel
                            </button>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <div className="max-h-[70vh] overflow-y-auto shadow-xl">
                            <table className="table w-full border-2">
                                <thead className="sticky top-0 bg-blue-400 text-center">
                                    <tr className="border">
                                        <th className="text-center text-white">#</th>
                                        <th className="text-center text-white">Group</th>
                                        <th className="text-center text-white" colSpan={2}>Outlet</th>
                                        <th className="text-center text-white" colSpan={2}>Sub Outlet</th>
                                        <th className="text-center text-white">Member</th>
                                        <th className="text-center text-white">Struk</th>
                                        <th className="text-center text-white">Produk</th>
                                        <th className="text-center text-white">Qty In Pcs</th>
                                        <th className="text-center text-white">Gross</th>
                                        <th className="text-center text-white">Netto</th>
                                        <th className="text-center text-white">Margin</th>
                                        <th className="text-center text-white">%</th>
                                    </tr>
                                </thead>
                                <tbody className="border">
                                    {filteredData.map((item, index) => {
                                        const isFirstOccurrence = item.dtl_tipemember !== prevGroup;
                                        if (isFirstOccurrence) prevGroup = item.dtl_tipemember;

                                        return (
                                            <tr key={index} className="hover:bg-blue-200">
                                                <td className="border">{index + 1}</td>
                                                {isFirstOccurrence && (
                                                    <td rowSpan={groupedData[item.dtl_tipemember]} className="align-middle text-center border">
                                                        {item.dtl_tipemember}
                                                    </td>
                                                )}
                                                <td className="border">{item.dtl_outlet}</td>
                                                <td className="border">{item.dtl_namaoutlet}</td>
                                                <td className="border">{item.dtl_suboutlet}</td>
                                                <td className="border">{item.dtl_namasuboutlet}</td>
                                                <td className="border text-end">{FormatNumbers(item.dtl_cusno)}</td>
                                                <td className="border text-end">{FormatNumbers(item.dtl_struk)}</td>
                                                <td className="border text-end">{FormatNumbers(item.dtl_prdcd_ctn)}</td>
                                                <td className="border text-end">{FormatNumbers(item.dtl_qty_pcs)}</td>
                                                <td className="border text-end">{FormatNumbers(item.dtl_gross)}</td>
                                                <td className="border text-end">{FormatNumbers(item.dtl_netto)}</td>
                                                <td className="border text-end">{FormatNumbers(item.dtl_margin)}</td>
                                                <td className="border text-end">{FormatPercentage(item.dtl_margin / item.dtl_netto * 100)} %</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot className="table-footer sticky bottom-0 bg-gray-300 font-bold">
                                    <tr>
                                        <td colSpan={6} className="text-end">Total:</td>
                                        <td className="text-end">{FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_cusno), 0))}</td>
                                        <td className="text-end">{FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_struk), 0))}</td>
                                        <td className="text-end">{FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_prdcd_ctn), 0))}</td>
                                        <td className="text-end">{FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_qty_pcs), 0))}</td>
                                        <td className="text-end">{FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_gross), 0))}</td>
                                        <td className="text-end">{FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_netto), 0))}</td>
                                        <td className="text-end">{FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_margin), 0))}</td>
                                        <td className="text-end">
                                            {FormatPercentage(
                                                (data.reduce((sum, item) => sum + Number(item.dtl_margin), 0) /
                                                    data.reduce((sum, item) => sum + Number(item.dtl_netto), 0)) * 100
                                            )} %
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default GroupMember;
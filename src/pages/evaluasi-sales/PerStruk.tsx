import { useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import useSearch from "@/hooks/useSearch";
import { FormatNumbers, FormatPercentage } from "@/utils/FormatNumbers";
import { Link, useLocation } from "react-router-dom";
import LoadingIgr from "@/components/ui/loading-igr";
import { exportToExcelStyled } from "@/utils/excelExport";
import { RiFileExcel2Line } from "react-icons/ri";
import { IoSearchSharp } from "react-icons/io5";
import { formatDate } from "@/utils/FormateDate";
import StrukModal from "@/components/ui/modal-struk"; // Import komponen modal
import { MdSubdirectoryArrowLeft } from "react-icons/md";

const API_URL = import.meta.env.VITE_BASE_URL;

const PerStruk = () => {
    const location = useLocation();
    const filters = location.state || {};

    const { data, error, isLoading } = useFetchData(`${API_URL}/api/evaluasi-sales/${filters.selectedReport}`, filters);

    // Gunakan custom hook useSearch
    const { searchTerm, handleSearch, filteredData } = useSearch(data, [
        "dtl_struk",
        "dtl_stat",
        "dtl_cusno",
        "dtl_namamember",
        "dtl_prdcd_ctn",
        "dtl_qty_pcs",
        "dtl_gross",
        "dtl_netto",
        "dtl_margin",
        "dtl_flagmemberkhusus",
    ]);

    // State untuk modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFilename, setSelectedFilename] = useState<string | null>(null);

    const handleExport = () => {
        if (!data.length) return;

        const headers = [
            "#",
            "Struk",
            "Station",
            "Kd Mem",
            "Nama",
            "Produk",
            "Qty In Pcs",
            "Gross",
            "Netto",
            "Margin",
            "%",
            "Jenis Mem",
        ];

        const excelData = data.map((item, index) => [
            index + 1,
            item.dtl_struk,
            item.dtl_stat,
            item.dtl_cusno,
            item.dtl_namamember,
            FormatNumbers(item.dtl_prdcd_ctn),
            FormatNumbers(item.dtl_qty_pcs),
            FormatNumbers(item.dtl_gross),
            FormatNumbers(item.dtl_netto),
            FormatNumbers(item.dtl_margin),
            FormatPercentage(item.dtl_margin / item.dtl_netto * 100) + " %",
            item.dtl_flagmemberkhusus,
        ]);

        // Tambahkan baris total
        const totalRow = [
            "Total", "", "", "", "",
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_prdcd_ctn), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_qty_pcs), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_gross), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_netto), 0)),
            FormatNumbers(data.reduce((sum, item) => sum + Number(item.dtl_margin), 0)),
            FormatPercentage(
                (data.reduce((sum, item) => sum + Number(item.dtl_margin), 0) /
                    data.reduce((sum, item) => sum + Number(item.dtl_netto), 0)) * 100
            ) + " %" || "",
            "",
        ];

        excelData.push(totalRow);

        exportToExcelStyled({
            title: `Evaluasi Sales - ${filters.selectedReport.toUpperCase()}`,
            headers,
            data: excelData,
            fileName: `Evaluasi Sales - ${filters.selectedReport.toUpperCase()}.xlsx`,
        });
    };

    interface Item {
        dtl_struk: string;
        dtl_stat: string;
        dtl_cusno: string;
        dtl_kasir: string;
        dtl_namamember: string;
        dtl_prdcd_ctn: string;
        dtl_qty_pcs: number;
        dtl_gross: number;
        dtl_netto: number;
        dtl_margin: number;
        dtl_flagmemberkhusus: string;
        dtl_method: string;
    }

    const handleViewStruk = (item: Item) => {
        const filename = `${item.dtl_kasir === 'IK1' || item.dtl_kasir === 'IK2' || item.dtl_kasir === 'IK3' ? 'IKIOSK/' + item.dtl_struk.slice(0, 8) : item.dtl_struk.slice(0, 8)}/${item.dtl_stat}/${item.dtl_struk}.TXT`;
        const encodedFilename = encodeURIComponent(filename);

        setSelectedFilename(encodedFilename);
        setIsModalOpen(true);
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
                                        <th className="text-left text-white">Struk</th>
                                        <th className="text-left text-white">Station</th>
                                        <th className="text-left text-white" colSpan={2}>Member</th>
                                        <th className="text-center text-white">Produk</th>
                                        <th className="text-end text-white">In Pcs</th>
                                        <th className="text-end text-white">Gross</th>
                                        <th className="text-end text-white">Netto</th>
                                        <th className="text-end text-white">Margin</th>
                                        <th className="text-center text-white">%</th>
                                        <th className="text-center text-white">Jenis Mem</th>
                                        <th className="text-center text-white">Method</th>
                                        <th className="text-center text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="border">
                                    {filteredData.map((item, index) => {
                                        return (
                                            <tr key={item.dtl_struk.concat(item.dtl_stat)} className="hover:bg-blue-200 border">
                                                <td className="text-left">{index + 1}</td>
                                                <td className="text-center">{item.dtl_struk}</td>
                                                <td className="text-center">{item.dtl_stat}</td>
                                                <td className="text-center">{item.dtl_cusno}</td>
                                                <td className="text-left">{item.dtl_namamember}</td>
                                                <td className="text-end">{FormatNumbers(item.dtl_prdcd_ctn)}</td>
                                                <td className="text-end">{FormatNumbers(item.dtl_qty_pcs)}</td>
                                                <td className="text-end">{FormatNumbers(item.dtl_gross)}</td>
                                                <td className="text-end">{FormatNumbers(item.dtl_netto)}</td>
                                                <td className="text-end">{FormatNumbers(item.dtl_margin)}</td>
                                                <td className="text-end">{FormatPercentage(item.dtl_margin / item.dtl_netto * 100)} %</td>
                                                <td className="text-center">{item.dtl_flagmemberkhusus}</td>
                                                <td className="text-center">{item.dtl_method}</td>
                                                <td className="text-center">
                                                    <button
                                                        onClick={() => handleViewStruk(item)}
                                                        className="bg-blue-500 rounded mx-2 hover:bg-blue-700 text-white py-1 px-2"
                                                    >
                                                        Struk
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot className="table-footer sticky bottom-0 bg-gray-300 font-bold">
                                    <tr>
                                        <td colSpan={5} className="text-end">Total:</td>
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
                                        <td colSpan={3}></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            }

            {/* Tampilkan modal jika isModalOpen true */}
            {isModalOpen && selectedFilename && (
                <StrukModal
                    filename={selectedFilename}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </>
    );
};

export default PerStruk;
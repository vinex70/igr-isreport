import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { filterKlikSchema } from "@/schemas/FilterSchema";
import { z } from "zod";
import axios from "axios";
import { ApiDataKlik } from "@/types/apiDataKlik.types";
import { zodResolver } from "@hookform/resolvers/zod";
import useSort from "@/hooks/useSort";
import usePagination from "@/hooks/usePagination";
import { LuRefreshCw } from "react-icons/lu";

type FilterKlikSchema = z.infer<typeof filterKlikSchema>;

const CardMonitoringKlik: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [dataPb, setDataPb] = useState<ApiDataKlik[]>([]);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const { sortedData, sortConfig, handleSort } = useSort<ApiDataKlik>(dataPb);
    const {
        page,
        rowsPerPage,
        rowsPerPageOptions,
        paginatedData,
        handleChangePage,
        handleChangeRowsPerPage,
    } = usePagination({
        data: sortedData,
        initialPage: 0,
        initialRowsPerPage: 10,
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FilterKlikSchema>({
        resolver: zodResolver(filterKlikSchema),
    });

    const fetchData = React.useCallback<SubmitHandler<FilterKlikSchema>>(async (filters) => {
        try {
            const response = await axios.get<{ data: ApiDataKlik[] }>(`${baseUrl}/api/klik/perday`, {
                params: filters,
            });
            setDataPb(response.data.data);
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
            setDataPb([]);
        }
    }, [baseUrl]);

    // Fungsi untuk mendapatkan tanggal 7 hari lalu dan hari ini
    const getLast7Days = () => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);

        const formatDate = (date: Date) => date.toISOString().split("T")[0];

        return {
            startDate: formatDate(sevenDaysAgo),
            endDate: formatDate(today),
        };
    };

    // Fetch data otomatis pada saat render pertama
    useEffect(() => {
        const { startDate, endDate } = getLast7Days();
        fetchData({ startDate, endDate });
    }, [fetchData]); // Hanya dijalankan sekali saat komponen di-mount

    const handleRefresh = () => {
        const { startDate, endDate } = getLast7Days();
        fetchData({ startDate, endDate });
    }

    const headers = [
        { label: "No", key: "index" },
        { label: "Tgl", key: "obi_tglpb" },
        { label: "Belum Send HH", key: "belum_send_hh" },
        { label: "Proses Pickin", key: "proses_picking" },
        { label: "Siap Struk Cod", key: "siap_struk_cod" },
        { label: "Siap Struk Isaku-VA", key: "siap_struk_non_cod" },
        { label: "Selesai Struk", key: "selesai_struk" },
        { label: "Batal", key: "batal" },
        { label: "Total Pb", key: "total_pb" },
        { label: "Total Rp Order", key: "total_order" }
    ];

    return (
        <>
            <div className="py-6">
                <div className="flex justify-between items-end">
                    <form onSubmit={handleSubmit(fetchData)}>
                        <div className="flex flex-row gap-4 justify-start justify-items-center">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                                    Start Date:
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    {...register("startDate")}
                                    className="border rounded px-2 py-1 w-full"
                                />
                                {errors.startDate && (
                                    <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                                    End Date:
                                </label>
                                <input
                                    type="date"
                                    id="endDate"
                                    {...register("endDate")}
                                    className="border rounded px-2 py-1 w-full"
                                />
                                {errors.endDate && (
                                    <p className="text-red-500 text-sm">{errors.endDate.message}</p>
                                )}
                            </div>

                            <div className="flex items-end gap-2">
                                <Button
                                    type="submit"
                                    className="bg-blue-400 hover:bg-blue-600 text-white font-semibold"
                                >
                                    Apply Filter
                                </Button>

                                <Button
                                    type="reset"
                                >
                                    reset
                                </Button>
                            </div>
                        </div>
                    </form>

                    <Button
                        className="bg-blue-400"
                        onClick={handleRefresh}>
                        <LuRefreshCw />
                    </Button>
                </div>

                <div className="flex justify-center items-center bg-slate-400 mt-4 h-10">
                    <h1 className="font-bold text-lg">LAPORAN PB KLIK PER TANGGAL</h1>
                </div>

                {/* Table */}
                <div className="shadow-lg overflow-y-auto">
                    <div className="table w-full">
                        <div className="table-header-group sticky top-0 bg-blue-400 hover:bg-blue-500">
                            <div className="table-row">
                                {headers.map(({ label, key }) => (
                                    <div
                                        key={label}
                                        className="table-cell cursor-pointer px-4 py-2 text-left font-semibold"
                                        onClick={() => handleSort(key as keyof ApiDataKlik)}
                                    >
                                        {label}{" "}
                                        {sortConfig.key === key && (
                                            <span>
                                                {sortConfig.direction === "ascending" ? "🔼" : "🔽"}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="table-row-group">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((item, index) => (
                                    <div key={item.obi_tglpb} className="table-row border border-gray-400">
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {index + 1 + page * rowsPerPage}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.obi_tglpb}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.belum_send_hh}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.proses_picking}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.siap_struk_cod}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.siap_struk_non_cod}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.selesai_struk}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.batal}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2">
                                            {item.total_pb}
                                        </div>
                                        <div className="table-cell border border-gray-400 px-4 py-2 text-end">
                                            {new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(item.total_order)}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <h2 className="title-font font-medium text-3xl text-gray-900">
                                        {error ? error : "No data available . . ."}
                                    </h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-2 flex justify-end">
                    <div className="flex items-center gap-6">
                        <div>
                            <span>
                                Showing {page * rowsPerPage + 1} -{" "}
                                {Math.min((page + 1) * rowsPerPage, dataPb.length)} of {dataPb.length}
                            </span>
                        </div>
                        <div>
                            <label>
                                Rows per page:
                                <select
                                    value={rowsPerPage}
                                    onChange={(e) => handleChangeRowsPerPage(e)}
                                    className="ml-2 border rounded px-2 py-1"
                                >
                                    {rowsPerPageOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                disabled={page === 0}
                                onClick={() => handleChangePage(null, page - 1)}
                                className="px-4 py-2 border rounded bg-blue-400 hover:bg-blue-600 text-white"
                            >
                                Prev
                            </Button>
                            <Button
                                disabled={(page + 1) * rowsPerPage >= dataPb.length}
                                onClick={() => handleChangePage(null, page + 1)}
                                className="px-4 py-2 border rounded bg-blue-400 hover:bg-blue-600 text-white"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default CardMonitoringKlik;

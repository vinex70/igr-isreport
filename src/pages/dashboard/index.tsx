import React, { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PbMasuk from "../klik/PbMasuk";
import SiapPicking from "../klik/SiapPicking";
import SiapScanning from "../klik/SiapScanning";
import DraftStruk from "../klik/DraftStruk";
import SiapStruk from "../klik/SiapStruk";
import AmbilDitoko from "../klik/AmbilDiToko";
import CodBelumSelesai from "../klik/CodBelumSelesai";
import SelesaiStruk from "../klik/SelesaiStruk";
import { filterKlikSchema } from "@/schemas/FilterSchema";
import { ApiDataKlik } from "@/types/apiDataKlik.types";
import ModalDetailKlik from "@/components/ui/modal-detail-klik/ModalDetailKlik";
import { NextDaySameDay } from "@/components/ui/card-nextday-sameday/nextday-sameday";
import CardMonitoringKlik from "@/components/ui/card-monitoring-klik";

type FilterKlikSchema = z.infer<typeof filterKlikSchema>;

const Dashboard: React.FC = () => {
    const [data, setData] = useState<ApiDataKlik[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<ApiDataKlik[]>([]);  // State to manage the selected item for the modal
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const isWithinOneHour = (maxDeliveryTime: Date, currentTime: Date) => {
        const diffInMs = maxDeliveryTime.getTime() - currentTime.getTime();
        const diffInHours = diffInMs / (1000 * 60 * 60); // Menghitung selisih dalam jam
        return diffInHours <= 2 && diffInHours > 0; // Jika selisihnya lebih dari 0 jam dan kurang dari atau sama dengan 1 jam
    };
    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FilterKlikSchema>({
        resolver: zodResolver(filterKlikSchema),
    });

    const fetchData: SubmitHandler<FilterKlikSchema> = async (filters) => {
        setLoading(true);
        try {
            // ambil data dari API dengan filter yang diberikan dari React Hook Form
            const response = await axios.get<{ data: ApiDataKlik[] }>(`${baseUrl}/api/klik`, {
                params: filters,
            });
            setData(response.data.data);
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle row click and open modal
    const handleDetailClick = (item: ApiDataKlik) => {
        console.log(item);
        setSelectedItem([item]);  // Set the selected item
        setIsModalOpen(true);  // Open the modal
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);  // Close the modal
        setSelectedItem([]);  // Clear the selected item
    };


    return (
        <div className="container mx-auto">
            <div className="container flex justify-center px-32 py-10 mx-auto">
                <div className="flex justify-around flex-wrap gap-y-4 items-center max-w-screen-lg dark:bg-gray-800">
                    <PbMasuk />
                    <SiapPicking />
                    <SiapScanning />
                    <DraftStruk />
                    <SiapStruk />
                    <AmbilDitoko />
                    <CodBelumSelesai />
                    <SelesaiStruk />
                </div>
            </div>

            <div>
                <CardMonitoringKlik />
            </div>

            <div>
                <div className="text-center py-2">
                    <h1 className="bg-slate-400 font-bold text-lg">NextDay Dan SameDay Hari ini</h1>
                </div>
                <NextDaySameDay />
            </div>

            <h1 className="text-2xl font-bold mb-4">Klik Data Table</h1>

            {/* Filter Form */}
            <form onSubmit={handleSubmit(fetchData)} className="mb-4 flex space-x-4">
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

                <div>
                    <label htmlFor="status" className="block text-sm font-medium mb-1">
                        Status:
                    </label>
                    <select
                        id="status"
                        {...register("status")}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">All</option>
                        <option value="1">SIAP PICKING</option>
                        <option value="2">SIAP SCANNING</option>
                        <option value="3">SIAP DRAFT STRUK</option>
                        <option value="5">SIAP STRUK</option>
                        <option value="6">SELESAI STRUK</option>
                        <option value="N">SIAP SEND HH</option>
                        <option value="B">BATAL</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm">{errors.status.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="ekspedisi" className="block text-sm font-medium mb-1">
                        Ekspedisi:
                    </label>
                    <select
                        id="ekspedisi"
                        {...register("ekspedisi")}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">All</option>
                        <option value="mobil">Mobil</option>
                        <option value="motor">Motor</option>
                        <option value="amtok">Amtok</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm">{errors.status.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="obi_shippingservice" className="block text-sm font-medium mb-1">
                        Service:
                    </label>
                    <select
                        id="obi_shippingservice"
                        {...register("obi_shippingservice")}
                        className="border rounded px-2 py-1"
                    >
                        <option value="">All</option>
                        <option value="NEXTDAY">NEXTDAY</option>
                        <option value="SAMEDAY">SAMEDAY</option>
                    </select>
                    {errors.status && (
                        <p className="text-red-500 text-sm">{errors.status.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="trxPb" className="block text-sm font-medium mb-1">
                        Trx:
                    </label>
                    <input
                        type="text"
                        id="trxPb"
                        {...register("trxPb")}
                        className="border rounded px-2 py-1 w-full"
                    />
                    {errors.trxPb && (
                        <p className="text-red-500 text-sm">{errors.trxPb.message}</p>
                    )}
                </div>

                <div className="flex items-end">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Apply Filter
                    </button>
                </div>
            </form>

            {/* Tabel Data */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && data.length === 0 && (
                <p>No data to display. Apply filters to load data.</p>
            )}
            {!loading && !error && data.length > 0 && (
                <table className="table-auto my-10 border-collapse border border-gray-400 max-w-fit mx-auto">
                    <thead className="bg-blue-300">
                        <tr>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>No</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Status</th>
                            <th className="border px-4 py-2 text-xs" colSpan={2}>PB</th>
                            <th className="border px-4 py-2 text-xs" colSpan={2}>DSP</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Trx</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Kode Member</th>
                            <th className="border px-4 py-2 text-xs" colSpan={2}>Item</th>
                            <th className="border px-4 py-2 text-xs" colSpan={2}>Rupiah</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Tipe</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Ekspedisi</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Service</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Max Kirim</th>
                            <th className="border px-4 py-2 text-xs" rowSpan={2}>Action</th>
                        </tr>
                        <tr>
                            <th className="border px-4 py-2 text-xs">Tgl</th>
                            <th className="border px-4 py-2 text-xs">Jam</th>
                            <th className="border px-4 py-2 text-xs">Tgl</th>
                            <th className="border px-4 py-2 text-xs">Jam</th>
                            <th className="border px-4 py-2 text-xs">Order</th>
                            <th className="border px-4 py-2 text-xs">Real</th>
                            <th className="border px-4 py-2 text-xs">Order</th>
                            <th className="border px-4 py-2 text-xs">Real</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr
                                    key={item.trx}
                                    className={`hover:bg-gray-200 cursor-pointer
                                        ${item.status === 'BATAL'
                                            ? 'bg-zinc-500 text-white hover:bg-red-600'
                                            : item.status !== 'SIAP STRUK' && item.status !== 'SELESAI STRUK' &&
                                                new Date(item.obi_maxdeliverytime) <= new Date() // Jika maxdeliverytime sudah lewat atau sama dengan hari ini
                                                ? 'bg-red-500 hover:bg-red-600'
                                                : item.status !== 'SIAP STRUK' && item.status !== 'SELESAI STRUK' &&
                                                    isWithinOneHour(new Date(item.obi_maxdeliverytime), new Date()) // Jika maxdeliverytime kurang dari 1 jam
                                                    ? 'bg-orange-500 hover:bg-orang-600'
                                                    : ''
                                        }`}
                                >
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{index + 1}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{item.status}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{new Date(item.obi_tglpb).toLocaleDateString('id-ID')}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        {new Date(item.obi_createdt).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        }).replace(/\./g, ':')}
                                    </td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{item.obi_draftstruk && new Date(item.obi_draftstruk).toLocaleDateString('id-ID')}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        {item.obi_draftstruk && new Date(item.obi_draftstruk).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        }).replace(/\./g, ':')}
                                    </td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{item.trx}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{item.obi_kdmember}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        {new Intl.NumberFormat('id-ID').format(Number(item?.obi_itemorder) || 0)}
                                    </td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        {new Intl.NumberFormat('id-ID').format(Number(item?.obi_realitem) || 0)}
                                    </td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        {new Intl.NumberFormat('id-ID').format(Number(item?.obi_ttlorder) || 0)}
                                    </td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        {new Intl.NumberFormat('id-ID').format(Number(item?.obi_realorder) || 0)}
                                    </td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{item.obi_tipebayar}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{item.ekspedisi}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">{item.obi_shippingservice}</td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        {(() => {
                                            const date = new Date(item.obi_maxdeliverytime);
                                            const day = String(date.getDate()).padStart(2, '0');
                                            const month = String(date.getMonth() + 1).padStart(2, '0');
                                            const year = date.getFullYear();
                                            const hours = String(date.getHours()).padStart(2, '0');
                                            const minutes = String(date.getMinutes()).padStart(2, '0');
                                            const seconds = String(date.getSeconds()).padStart(2, '0');
                                            return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
                                        })()}
                                    </td>
                                    <td className="border border-gray-300 text-center px-2 py-2 text-xs">
                                        <button
                                            onClick={() => handleDetailClick(item)}  // Trigger the modal with the item
                                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        >
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>
            )}
            {/* Modal */}
            <ModalDetailKlik
                isOpen={isModalOpen}
                onClose={closeModal}
                obiKey={selectedItem.length > 0 ? selectedItem[0].obi_key : ''}
                data={selectedItem}
            />
        </div>
    );
};

export default Dashboard;

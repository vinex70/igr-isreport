import React, { useEffect, useState } from "react";
import axios from "axios";
import { ApiDataKlik } from "@/types/apiDataKlik.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IoCloseSharp } from "react-icons/io5";
import { formatDateTime } from "@/utils/FormatDateTime";
import Barcode from "react-barcode";

interface ModalDetailProps {
    isOpen: boolean;
    onClose: () => void;
    obiKey: string;
    data: ApiDataKlik[]; // Proper type for `data`
}

const ModalDetailKlik: React.FC<ModalDetailProps> = ({ isOpen, onClose, obiKey }) => {
    const [detailData, setDetailData] = useState<ApiDataKlik[]>([]); // Store fetched data
    const [loading, setLoading] = useState<boolean>(false); // Loading state
    const [error, setError] = useState<string | null>(null); // Error message state

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        // Fetch detail data when modal opens or obiKey changes
        const fetchDetailData = async (obiKey: ModalDetailProps["obiKey"]) => {
            if (isOpen && obiKey) {
                setLoading(true);
                setError(null); // Reset error on each fetch attempt
                try {
                    const response = await axios.get<{ data: ApiDataKlik[] }>(`${baseUrl}/api/klik/detail/${obiKey}`);
                    setDetailData(response.data.data); // Assuming response.data is the correct structure
                } catch (err: unknown) {
                    if (axios.isAxiosError(err)) {
                        setError(err.response?.data?.message || "Network or server error");
                    } else if (err instanceof Error) {
                        setError(err.message);
                    } else {
                        setError("An unexpected error occurred");
                    }
                    setDetailData([]); // Clear data on error
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchDetailData(obiKey);
    }, [isOpen, obiKey]);

    // Add event listener for "Esc" key press
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12">
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-red-500 text-white items-center rounded-xl p-2">
                        <IoCloseSharp />
                    </button>
                </div>
                <div className="flex justify-center MB-4">
                    <Barcode value={detailData[0]?.obi_nopb || ""} format="CODE128" height={50} width={1} fontSize={12} /> {/* Generate Barcode */}
                </div>
                <div className="flex justify-between mb-4">
                    {/* Kiri */}
                    <div className="flex justify-between">
                        <div className="text-left mr-4">
                            <h2 className="text-md font-bold">Member</h2>
                            <h2 className="text-md font-bold">Item Order</h2>
                        </div>
                        <div>
                            <h2 className="text-md font-bold mx-2">:</h2>
                            <h2 className="text-md font-bold mx-2">:</h2>
                        </div>
                        <div className="text-left">
                            <h2 className="text-md font-bold text-wrap">{detailData[0]?.obi_kdmember} - {detailData[0]?.cus_namamember}</h2>
                            <h2 className="text-md font-bold">{detailData.length}</h2>
                        </div>
                    </div>
                    {/* Tengah */}
                    {/* Kanan */}
                    <div className="flex justify-between">
                        <div className="text-left mr-2">
                            <h2 className="text-md font-bold">Tgl Pb</h2>
                            <h2 className="text-md font-bold">Max Kirim</h2>
                            <h2 className="text-md font-bold">Service</h2>
                            <h2 className="text-md font-bold">Status IPP</h2>
                        </div>
                        <div>
                            <h2 className="text-md font-bold mx-2">:</h2>
                            <h2 className="text-md font-bold mx-2">:</h2>
                            <h2 className="text-md font-bold mx-2">:</h2>
                            <h2 className="text-md font-bold mx-2">:</h2>
                        </div>
                        <div className="text-left">
                            <h2 className="text-md font-bold">{formatDateTime(detailData[0]?.obi_createdt)}</h2>
                            <h2 className="text-md font-bold">{formatDateTime(detailData[0]?.obi_maxdeliverytime)}</h2>
                            <h2 className="text-md font-bold">{detailData[0]?.obi_shippingservice}</h2>
                            <h2 className="text-md font-bold">{detailData[0]?.sti_noawb ? `Sudah Serah Terima IPP - ${detailData[0]?.sti_tipeproses}` : "-"}</h2>
                        </div>
                    </div>
                </div>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {detailData && !loading && !error && (
                    <div className="max-h-96 overflow-y-auto">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="bg-blue-500 hover:bg-blue-600">
                                    <TableHead className="text-white">No</TableHead>
                                    <TableHead className="text-white">Plu</TableHead>
                                    <TableHead className="text-white">Deskripsi</TableHead>
                                    <TableHead className="text-white">Qty Order</TableHead>
                                    <TableHead className="text-white">Qty Real</TableHead>
                                    <TableHead className="text-white">Picker</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {detailData.map((item, index) => (
                                    <TableRow key={index} className="border border-black">
                                        <TableCell className="px-4 py-2 border">{index + 1}</TableCell>
                                        <TableCell className="px-4 py-2 border">{item.obi_prdcd}</TableCell>
                                        <TableCell className="px-4 py-2 border">{item.prd_deskripsipanjang}</TableCell>
                                        <TableCell className="px-4 py-2 border text-center">{item.obi_qtyorder}</TableCell>
                                        <TableCell className="px-4 py-2 border text-center">{item.obi_qtyrealisasi}</TableCell>
                                        <TableCell className="px-4 py-2 border text-center">{item.obi_picker}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalDetailKlik;

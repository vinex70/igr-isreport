import { useEffect, useState } from "react";
import axios from "axios";

import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ApiDataKlik } from "@/types/apiDataKlik.types";
import ModalDetailKlik from "../modal-detail-klik/ModalDetailKlik";

export const SamedayDiatas12 = () => {
    const [data, setData] = useState<ApiDataKlik[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<ApiDataKlik[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.VITE_BASE_URL;
                const now = new Date();
                const startDate = now.toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format

                const response = await axios.get<{ data: ApiDataKlik[] }>(`${baseUrl}/api/klik/nextdaysameday`, {
                    params: {
                        stt: "> 12",
                        startDate: startDate,
                        recidSamdayNextday: 1,
                        obi_shippingservice: "SAMEDAY",
                    },
                });

                if (response.data) {
                    setData(response.data.data);
                } else {
                    setError("No data received");
                }
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

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
        <div className="max-h-96 overflow-y-auto">
            <div className="table w-full">
                <TableHeader className="table-header-group sticky top-0 bg-blue-400">
                    <TableRow className="table-row">
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">No</TableHead>
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">Tgl</TableHead>
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">Trx</TableHead>
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">Nama Member</TableHead>
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">Notif Rokok</TableHead>
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">Item</TableHead>
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">Status</TableHead>
                        <TableHead className="table-cell text-xs text-black border border-solid text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data ? (

                        data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="text-center text-xs text-gray-500 border border-solid"
                                >
                                    No data available.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((item, index: number) => {
                                return (
                                    <TableRow key={item.obi_key}>
                                        <TableCell className="text-xs text-black border border-solid text-center">{index + 1}</TableCell>
                                        <TableCell className="text-xs text-black border border-solid text-center">{new Date(item.obi_tglpb).toLocaleDateString('id-ID')}</TableCell>
                                        <TableCell className="text-xs text-black border border-solid text-center">{item.trx}</TableCell>
                                        <TableCell className="text-xs text-black border border-solid text-center">{item.cus_namamember}</TableCell>
                                        <TableCell className={`text-xs ${item.notif_rokok === 'ADA ROKOK' ? 'text-red-500' : 'text-black'} border border-solid text-center`}>{item.notif_rokok}</TableCell>
                                        <TableCell className="text-xs text-black border border-solid text-center">
                                            {new Intl.NumberFormat('id-ID').format(Number(item?.obi_itemorder) || 0)}
                                        </TableCell>
                                        <TableCell className="text-xs text-black border border-solid text-center">{item.status}</TableCell>
                                        <TableCell className="text-xs text-black border border-solid text-center">
                                            <button
                                                onClick={() => handleDetailClick(item)}  // Trigger the modal with the item
                                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                Detail
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )

                    ) : (<h2 className="title-font font-medium text-3xl text-gray-900">
                        {error ? error : "Loading..."}
                    </h2>)}
                </TableBody>
            </div>

            {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}

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

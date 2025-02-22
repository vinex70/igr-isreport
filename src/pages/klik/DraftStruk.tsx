import { useEffect, useState } from "react";
import axios from "axios";
import CardDashboard from "@/components/ui/card-dashboard/CardDashboard";
import { ApiDataKlik } from "@/types/apiDataKlik.types";


const DraftStruk = () => {
    const [data, setData] = useState<ApiDataKlik[]>([]); // Menyesuaikan tipe data menjadi array
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BASE_URL;
        const fetchData = async () => {
            try {
                const { data } = await axios.get<ApiDataKlik[]>(`${baseUrl}/api/klik/detail`, {
                    params: {
                        status: 3
                    }
                });

                setData(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            }
        };

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, []);

    const fetchDetailData = async (): Promise<React.ReactNode> => {
        return (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">No</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Tgl</th>
                        <th scope="col" className="px-6 py-3">Trx</th>
                        <th scope="col" className="px-6 py-3">Member</th>
                        <th scope="col" className="px-6 py-3">Tipe</th>
                        <th scope="col" className="px-6 py-3">Service</th>
                        <th scope="col" className="px-6 py-3">Item</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{item.status}</td>
                            <td className="px-6 py-4">{new Date(item.obi_tglpb).toLocaleDateString('id-ID')}</td>
                            <td className="px-6 py-4">{item.trx}</td>
                            <td className="px-6 py-4">{item.obi_kdmember} - {item.cus_namamember}</td>
                            <td className="px-6 py-4">{item.obi_tipebayar}</td>
                            <td className="px-6 py-4">{item.obi_shippingservice}</td>
                            <td className="px-6 py-4">
                                {new Intl.NumberFormat('id-ID').format(Number(item?.obi_itemorder) || 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const content = error
        ? error
        : data && data.length > 0
            ? data.length.toString()
            : "0";

    return (
        <CardDashboard title="Draft Struk" content={content} fetchDetailData={fetchDetailData} />
    );
};

export default DraftStruk;

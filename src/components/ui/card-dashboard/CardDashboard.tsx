import { useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal-detail/modal";

interface CardDashboardProps {
    title: string;
    content: string;
    fetchDetailData: () => Promise<React.ReactNode>; // Function to fetch detail data
}

const CardDashboard: React.FC<CardDashboardProps> = ({ title, content, fetchDetailData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailData, setDetailData] = useState<React.ReactNode>(<p>Loading...</p>);

    const handleDetailClick = async () => {
        setIsModalOpen(true);
        try {
            const data = await fetchDetailData();
            setDetailData(data);
        } catch {
            setDetailData(<p>Error fetching detail data.</p>);
        }
    };

    return (
        <div className="relative dark:text-white">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg dark:bg-gray-200"></span>
            <div
                className="relative w-56 p-2 bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-gray-300 rounded-lg hover:scale-105 transition duration-500"
            >
                <div className="flex justify-center items-center">
                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
                </div>
                <h2 className="text-black font-bold text-2xl dark:text-gray-300 text-center">
                    {content}
                </h2>
                <div className="flex justify-end">
                    <Button
                        variant="link"
                        onClick={handleDetailClick}
                    >
                        <p className="item-center text-blue-400">Detail &rarr;</p>
                    </Button>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Detail: ${title}`}>
                {detailData}
            </Modal>
        </div>
    );
};

export default CardDashboard;

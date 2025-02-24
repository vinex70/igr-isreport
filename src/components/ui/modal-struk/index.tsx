import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdPrint } from "react-icons/io";

interface StrukModalProps {
    filename: string;
    onClose: () => void;
}

const API_URL = import.meta.env.VITE_BASE_URL;

const StrukModal: React.FC<StrukModalProps> = ({ filename, onClose }) => {
    const [content, setContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStrukContent = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/struk?filename=${filename}`);
                setContent(response.data.content);
            } catch {
                setError("Gagal memuat konten struk.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchStrukContent();

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [filename, onClose]);

    const handlePrint = () => {
        const iframe = document.createElement("iframe");
        iframe.style.position = "absolute";
        iframe.style.top = "-1000px";
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write(`
                <html>
                    <head>
                        <title>Print Struk</title>
                        <style>
                            body { font-family: Arial, sans-serif; white-space: pre-wrap; height: fit-content; }
                            pre { background: #f4f4f4; padding: 5px; border-radius: 5px; margin: 0 auto; }
                            @media print {
                                body {
                                    width: 80mm; /* Lebar kertas saat dicetak */
                                    height: auto; /* Tinggi disesuaikan dengan konten */
                                    margin: 0;
                                    padding: 0;
                                }
                                    pre {
                                    background: none; /* Hapus background saat dicetak */
                                    border: none;
                                    padding: 0;
                                }
                        </style>
                    </head>
                    <body>
                        <pre>${content}</pre>
                    </body>
                </html>
            `);
            iframeDoc.close();

            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();

            setTimeout(() => {
                document.body.removeChild(iframe);
            }, 1000);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-xl max-h-[70vh] overflow-y-auto">
                <div className="flex sticky top-0 justify-between items-center mb-4 bg-white z-10">
                    <h2 className="text-xl font-bold">Detail Struk</h2>
                    <button
                        onClick={handlePrint}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center"
                    >
                        <IoMdPrint className="mr-2" size={30} />
                        Print
                    </button>
                </div>
                {isLoading ? (
                    <p>Memuat...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div>
                        <pre className="flex justify-center whitespace-pre-wrap bg-gray-100 p-2 rounded">{content}</pre>
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
};

export default StrukModal;
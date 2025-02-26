import React, { useState, useEffect, useCallback } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import useFetchDatas from "@/hooks/useFetchDatas";
import usePagination from "@/hooks/usePaginations";
import { promoSchema, PromoFormValues } from "@/schemas/schemaInformasiProduk";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormatNumbers } from "@/utils/FormatNumbers";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (kodeplu: string) => void; // Mengirim kode PLU ke induk
};

type SerchProduk = {
    div: string;
    kodeplu: string;
    prd_deskripsipanjang: string;
    lpp: string;
};

const SerchProduk: React.FC<ModalProps> = ({ isOpen, onClose, onSelect }) => {
    const { register, watch, formState: { errors }, reset } = useForm<PromoFormValues>({
        resolver: zodResolver(promoSchema),
    });

    const [searchParams, setSearchParams] = useState<Record<string, string> | null>(null);
    const [shouldFetch, setShouldFetch] = useState(false);

    // Ambil nilai input secara real-time
    const searchValue = watch("serchProduk")?.trim() || "";

    // Fetch data hanya saat shouldFetch === true
    const { data: dataProduk, loading, error } = useFetchDatas<SerchProduk[]>(
        shouldFetch ? "/api/informasi-promosi/dataproduk" : "",
        shouldFetch ? searchParams ?? undefined : undefined
    );

    // Gunakan custom hook pagination
    const { paginatedData, PaginationControls } = usePagination<SerchProduk>({
        data: dataProduk ?? [],
    });

    // Reset pencarian saat modal ditutup
    useEffect(() => {
        if (!isOpen) {
            setShouldFetch(false);
            setSearchParams(null);
            reset();
        }
    }, [isOpen, reset]);

    // Jalankan pencarian otomatis setelah selesai mengetik (debounce) dengan minimal 3 karakter
    useEffect(() => {
        if (searchValue.length < 3) {
            setShouldFetch(false);
            return;
        }

        const timer = setTimeout(() => {
            setSearchParams({ serchProduk: searchValue });
            setShouldFetch(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue]);

    // Handle shortcut ESC untuk menutup modal
    const handleShortcut = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        document.addEventListener("keydown", handleShortcut);
        return () => {
            document.removeEventListener("keydown", handleShortcut);
        };
    }, [handleShortcut]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]" onClick={onClose}>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] p-6 rounded-md shadow-lg relative flex flex-col" onClick={(e) => e.stopPropagation()}>
                {/* Header Modal */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Search Produk</h2>
                    <IoMdCloseCircleOutline size={30} className="text-red-500 cursor-pointer" onClick={onClose} />
                </div>

                {/* Form Pencarian */}
                <div className="mt-4">
                    <input
                        type="text"
                        {...register("serchProduk")}
                        placeholder="Masukkan minimal 3 karakter PLU atau Deskripsi Produk"
                        autoComplete="off"
                        className="border border-gray-300 rounded-md p-3 w-full"
                    />
                    {errors.serchProduk && (
                        <p className="text-red-500 text-sm mt-1">{errors.serchProduk.message}</p>
                    )}
                </div>

                {/* Tampilkan Loading atau Error */}
                {shouldFetch && loading && <p className="text-gray-500 mt-2">Sedang mencari...</p>}
                {shouldFetch && error && <p className="text-red-500 mt-2">{error}</p>}

                {/* Daftar Hasil Pencarian */}
                {shouldFetch && (
                    <div className="mt-4 overflow-auto max-h-[60vh] border border-gray-300 rounded-lg">
                        <table className="w-full min-w-full border-collapse">
                            {/* Header Table */}
                            <thead className="bg-gray-100 sticky top-0">
                                <tr className="text-left text-gray-700">
                                    <th className="p-3 border-b border-gray-300">DIV</th>
                                    <th className="p-3 border-b border-gray-300">PLU</th>
                                    <th className="p-3 border-b border-gray-300">Deskripsi</th>
                                    <th className="p-3 border-b border-gray-300">LPP</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((item, index) => (
                                        <tr key={index}
                                            onClick={() => onSelect(item.kodeplu)}
                                            className="cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                                        >
                                            <td className="p-2 border-b border-gray-300">{item.div}</td>
                                            <td className="p-2 border-b border-gray-300">{item.kodeplu}</td>
                                            <td className="p-2 border-b border-gray-300">{item.prd_deskripsipanjang}</td>
                                            <td className="p-2 border-b border-gray-300">{FormatNumbers(item.lpp)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-2 text-center text-gray-500">Tidak ada produk ditemukan.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination Controls */}
                {shouldFetch && dataProduk && dataProduk.length > 0 && <PaginationControls />}
            </div>
        </div>
    );
};

export default SerchProduk;

import React, { useState } from "react";
import ProdukList from "@/pages/setting-harga/ProdukList";
import ProdukForm from "@/pages/setting-harga/ProdukForm";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";

interface Item {
    prd_kodedivisi: string;
    prd_kodedepartement: string;
    prd_unit: string;
    prd_frac: string;
    prd_prdcd: string;
    prd_deskripsipanjang: string;
    prd_satuanbeli: string;
    prd_isibeli: number;
    prd_lastcost: number;
    prd_avgcost: number;
    prd_hrgjual: number;
    settingHarga: number;
    settingMargin: string;
    st_harga_netto: number;
    st_md_netto: number;
    prmd_hrgjual: number;
    prd_flagbkp1: string;
    prd_flagbkp2: string;
}

interface Plu {
    plu: string;
}

interface ApiDataProduk {
    prd_kodedivisi: string;
    prd_kodedepartement: string;
    prd_unit: string;
    prd_frac: string;
    prd_prdcd: string;
    prd_deskripsipanjang: string;
    prd_satuanbeli: string;
    prd_isibeli: number;
    prd_lastcost: number;
    prd_avgcost: number;
    prd_hrgjual: number;
    st_harga_netto: number;
    st_md_netto: number;
    prmd_hrgjual: number;
    prd_flagbkp1: string;
    prd_flagbkp2: string;
}

const SettingHarga: React.FC = () => {
    const [produk, setProduk] = useState<ApiDataProduk[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, reset } = useForm<Plu>();

    // Fungsi untuk mengambil data dari API
    const fetchData: SubmitHandler<Plu> = async (filters) => {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_BASE_URL;

        // Tambahkan nol di depan jika panjang kurang dari 7 karakter
        const paddedPlu = filters.plu.padStart(7, "0");

        try {
            const response = await axios.get<{ data: ApiDataProduk[] }>(`${baseUrl}/api/settingsharga`, {
                params: { plu: paddedPlu },
            });
            setProduk(response.data.data);
            setError(null);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
            setProduk([]);
        } finally {
            setLoading(false);
        }
        reset();
    };

    // Fungsi untuk menambahkan item baru ke ProdukList
    const handleOnSubmit = (newItem: Item) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    const handleHapusList = (prd_prdcd: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.prd_prdcd !== prd_prdcd));
    };

    return (
        <>
            <div className="flex justify-center items-center">
                {/* Form Pencarian */}
                <form onSubmit={handleSubmit(fetchData)} className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300">
                    <input
                        type="text"
                        {...register("plu", { required: true })}
                        placeholder="Masukkan PLU"
                        className="bg-transparent w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
                    />
                    <button type="submit" disabled={loading}
                        className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full font-medium tracking-wide border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white border-transparent py-1.5 h-[38px] -mr-3">
                        {loading ? "Loading..." : "Cari"}
                    </button>
                </form>
            </div>
            <div>
                {/* Tampilkan Error Jika Ada */}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}

                {/* Form Produk */}
                <ProdukForm produk={produk} onSubmit={handleOnSubmit} />

                {/* List Produk */}
                <ProdukList items={items} onHapus={handleHapusList} />
            </div>
        </>
    );
};

export default SettingHarga;

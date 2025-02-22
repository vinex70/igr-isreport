import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";

const API_URL = import.meta.env.VITE_BASE_URL;

interface GiftRef {
    gfh_kodepromosi: string;
    gfh_namapromosi: string;
    gfh_tglawal: string;
    gfh_tglakhir: string;
}

const GiftDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("gift"); // Pantau perubahan nilai divisi
    const [selected, setSelected] = useState(false);

    // Fetch data divisi dari API
    const { data: gift, error, isLoading } = useFetchDataAll<GiftRef[]>(`${API_URL}/api/filters/giftaktif`);

    // Reset state `selected` jika nilai `div` berubah menjadi kosong
    useEffect(() => {
        setSelected(selectedValue !== ""); // Jika kosong, atur selected jadi false
    }, [selectedValue]);

    return (
        <>
            {isLoading ? (
                <p>Loading Gift...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : "border-gray-300"}`}>
                    <select
                        id="gift"
                        {...register("gift")}
                        className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}
                    >
                        <option value="">All Gift</option>
                        {gift?.map((gfh) => (
                            <option key={gfh.gfh_kodepromosi} value={gfh.gfh_kodepromosi}>
                                {gfh.gfh_kodepromosi} - {gfh.gfh_namapromosi}  {gfh.gfh_tglawal} s/d {gfh.gfh_tglakhir}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};

export default GiftDropdown;

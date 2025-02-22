import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";
import { formatDate } from "@/utils/FormateDate";

const API_URL = import.meta.env.VITE_BASE_URL;

interface Cbredempoin {
    cbh_kodepromosi: string;
    cbh_namapromosi: string;
    cbh_tglawal: string;
    cbh_tglakhir: string;
}

const CbRedemPoinDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("cbredempoin"); // Pantau perubahan nilai divisi
    const [selected, setSelected] = useState(false);

    // Fetch data divisi dari API
    const { data: cbredempoin, error, isLoading } = useFetchDataAll<Cbredempoin[]>(`${API_URL}/api/filters/cbredempoin`);

    // Reset state `selected` jika nilai `div` berubah menjadi kosong
    useEffect(() => {
        setSelected(selectedValue !== ""); // Jika kosong, atur selected jadi false
    }, [selectedValue]);

    return (
        <>
            {isLoading ? (
                <p>Loading Cb Redem Poin...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
                    <select
                        id="cbredempoin"
                        {...register("cbredempoin")}
                        className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}
                    >
                        <option value="">Cb Redem Poin</option>
                        {cbredempoin?.map((cbh) => (
                            <option key={cbh.cbh_kodepromosi} value={cbh.cbh_kodepromosi}>
                                {cbh.cbh_kodepromosi} - {cbh.cbh_namapromosi}  {formatDate(cbh.cbh_tglawal)} s/d {formatDate(cbh.cbh_tglakhir)}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};

export default CbRedemPoinDropdown;

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";

const API_URL = import.meta.env.VITE_BASE_URL;

interface CbUc {
    cbh_kodepromosi: string;
    cbh_namapromosi: string;
    cbh_tglawal: string;
    cbh_tglakhir: string;
}

const CbUcDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("cbUc"); // Pantau perubahan nilai divisi
    const [selected, setSelected] = useState(false);

    // Fetch data divisi dari API
    const { data: cbUc, error, isLoading } = useFetchDataAll<CbUc[]>(`${API_URL}/api/filters/cbuc`);

    // Reset state `selected` jika nilai `div` berubah menjadi kosong
    useEffect(() => {
        setSelected(selectedValue !== ""); // Jika kosong, atur selected jadi false
    }, [selectedValue]);

    return (
        <>
            {isLoading ? (
                <p>Loading Cb Uniq Code...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : "border-gray-300"}`}>
                    <select
                        id="cbUc"
                        {...register("cbUc")}
                        className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}
                    >
                        <option value="">Cb Uniq Code</option>
                        {cbUc?.map((cbh) => (
                            <option key={cbh.cbh_kodepromosi} value={cbh.cbh_kodepromosi}>
                                {cbh.cbh_kodepromosi} - {cbh.cbh_namapromosi}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};

export default CbUcDropdown;

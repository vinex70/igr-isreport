import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";

const API_URL = import.meta.env.VITE_BASE_URL;

interface Division {
    div_kodedivisi: string;
    div_namadivisi: string;
}

const DivisionDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("div"); // Pantau perubahan nilai divisi
    const [selected, setSelected] = useState(false);

    // Fetch data divisi dari API
    const { data: divisions, error, isLoading } = useFetchDataAll<Division[]>(`${API_URL}/api/filters/divisi`);

    // Reset state `selected` jika nilai `div` berubah menjadi kosong
    useEffect(() => {
        setSelected(selectedValue !== ""); // Jika kosong, atur selected jadi false
    }, [selectedValue]);

    return (
        <>
            {isLoading ? (
                <p>Loading divisi...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : "border-gray-300"}`}>
                    <select
                        id="div"
                        {...register("div")}
                        className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}
                    >
                        <option value="">All Divisi</option>
                        {divisions?.map((division) => (
                            <option key={division.div_kodedivisi} value={division.div_kodedivisi}>
                                {division.div_kodedivisi} - {division.div_namadivisi}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};

export default DivisionDropdown;

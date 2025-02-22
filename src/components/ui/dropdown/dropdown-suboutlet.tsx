import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

interface SubOutlet {
    out_namaoutlet: string;
    sub_kodeoutlet: string;
    sub_kodesuboutlet: string;
    sub_namasuboutlet: string;
}

const SubOutletDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("subOutlet"); // Pantau perubahan nilai departement
    const selectedOutlet = watch("outlet");
    const [selected, setSelected] = useState(false);

    // Fetch data departement dari API
    const { data: subOutlet, error, isLoading } = useFetchDataAll<SubOutlet[]>(
        `${API_URL}/api/filters/suboutlet`
    );

    useEffect(() => {
        setSelected(selectedValue !== ""); // Jika kosong, atur selected jadi false
    }, [selectedValue]);

    // Filter departemen berdasarkan divisi yang dipilih
    const filteredSubOutlet =
        selectedOutlet && selectedOutlet !== ""
            ? subOutlet?.filter((out) => out.sub_kodeoutlet === selectedOutlet)
            : subOutlet || []; // Jika divisi belum dipilih, tampilkan semua departemen

    // Kelompokkan data berdasarkan `div_kodedivisi`
    const groupedSubOutlet = filteredSubOutlet?.reduce((acc, sub) => {
        const key = `${sub.sub_kodeoutlet} - ${sub.out_namaoutlet}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(sub);
        return acc;
    }, {} as Record<string, SubOutlet[]>);

    return (
        <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
            <select id="subOutlet" {...register("subOutlet")} disabled={isLoading} className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                <option value="">{isLoading ? "Loading Sub Outlet..." : error ? <p className="text-red-500">{error}</p> : "All Sub-Outlet"}</option>
                {groupedSubOutlet &&
                    Object.entries(groupedSubOutlet).map(([groupLabel, subOutlet]) => (
                        <optgroup key={groupLabel} label={groupLabel}>
                            {subOutlet.map((sub) => (
                                <option key={sub.sub_kodesuboutlet} value={sub.sub_kodesuboutlet}>
                                    {sub.sub_kodesuboutlet} - {sub.sub_namasuboutlet}
                                </option>
                            ))}
                        </optgroup>
                    ))}
            </select>
        </div>
    );
};

export default SubOutletDropdown;

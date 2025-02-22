import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

interface Departement {
    div_kodedivisi: string;
    div_namadivisi: string;
    dep_kodedepartement: string;
    dep_namadepartement: string;
}

const DepartementDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("dept"); // Pantau perubahan nilai departement
    const selectedDivisi = watch("div")
    const [selected, setSelected] = useState(false);

    // Fetch data departement dari API
    const { data: departements, error, isLoading } = useFetchDataAll<Departement[]>(
        `${API_URL}/api/filters/departement`
    );

    useEffect(() => {
        setSelected(selectedValue !== ""); // Jika kosong, atur selected jadi false
    }, [selectedValue]);

    // Filter departemen berdasarkan divisi yang dipilih
    const filteredDepartements =
        selectedDivisi && selectedDivisi !== ""
            ? departements?.filter((dept) => dept.div_kodedivisi === selectedDivisi)
            : departements || []; // Jika divisi belum dipilih, tampilkan semua departemen

    // Kelompokkan data berdasarkan `div_kodedivisi`
    const groupedDepartements = filteredDepartements?.reduce((acc, dept) => {
        const key = `${dept.div_kodedivisi} - ${dept.div_namadivisi}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(dept);
        return acc;
    }, {} as Record<string, Departement[]>);

    return (
        <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
            <select id="dept" {...register("dept")} disabled={isLoading} className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                <option value="">{isLoading ? "Loading Departements..." : error ? <p className="text-red-500">{error}</p> : "All Departements"}</option>
                {groupedDepartements &&
                    Object.entries(groupedDepartements).map(([groupLabel, departements]) => (
                        <optgroup key={groupLabel} label={groupLabel}>
                            {departements.map((dept) => (
                                <option key={dept.div_kodedivisi.concat(dept.dep_kodedepartement)} value={dept.div_kodedivisi.concat(dept.dep_kodedepartement)}>
                                    {dept.dep_kodedepartement} - {dept.dep_namadepartement}
                                </option>
                            ))}
                        </optgroup>
                    ))}
            </select>
        </div>
    );
};

export default DepartementDropdown;

import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

interface Kategori {
    div_kodedivisi: string;
    dep_kodedepartement: string;
    dep_namadepartement: string;
    kat_kodekategori: string;
    kat_namakategori: string;
}

const KategoriDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("kat");
    const selectedDept = watch("dept")
    const [selected, setSelected] = useState(false);

    // Fetch data departement dari API
    const { data: kategoris, error, isLoading } = useFetchDataAll<Kategori[]>(
        `${API_URL}/api/filters/kategori`
    );

    // Filter kategori berdasarkan departement yang dipilih
    const filteredKategori =
        selectedDept && selectedDept !== ""
            ? kategoris?.filter((kat) => kat.div_kodedivisi.concat(kat.dep_kodedepartement) === selectedDept)
            : kategoris || []; // Jika departemen belum dipilih, tampilkan semua kategori

    useEffect(() => {
        setSelected(selectedValue !== "");
    }, [selectedValue]);

    // Kelompokkan data berdasarkan `div_departement`
    const groupedKategori = filteredKategori?.reduce((acc, kat) => {
        const key = `${kat.dep_kodedepartement} - ${kat.dep_namadepartement}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(kat);
        return acc;
    }, {} as Record<string, Kategori[]>);


    return (
        <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
            <select id="kat" {...register("kat")} disabled={isLoading} className={`text-sm focus:outline-none w-full ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                <option value="">{isLoading ? "Loading Kategori..." : error ? <p className="text-red-500">{error}</p> : "All Kategori"}</option>
                {groupedKategori &&
                    Object.entries(groupedKategori).map(([groupLabel, kategoris]) => (
                        <optgroup key={groupLabel} label={groupLabel}>
                            {kategoris.map((kat) => (
                                <option key={kat.dep_kodedepartement.concat(kat.kat_kodekategori)} value={kat.dep_kodedepartement.concat(kat.kat_kodekategori)}>
                                    {kat.kat_kodekategori} - {kat.kat_namakategori}
                                </option>
                            ))}
                        </optgroup>
                    ))}
            </select>
        </div>
    );
};

export default KategoriDropdown

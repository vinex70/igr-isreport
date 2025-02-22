import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const laporan = [
    { label: "Per - Bulan", value: "perbulan" },
    { label: "Per - Divisi", value: "perdivisi" },
    { label: "Per - Departement", value: "perdepartement" },
    { label: "Per - Kategori", value: "perkategori" },
    { label: "Per - Produk", value: "perproduk" },
    { label: "Per - Produk Per Tanggal", value: "perproduk-tanggal" },
    { label: "Per - Tanggal", value: "pertanggal" },
    { label: "Per - Struk", value: "perstruk" },
    { label: "Per - Member", value: "permember" },
    { label: "Per - Grup Member", value: "grupmember" },
    { label: "Per - Supplier", value: "persupplier" },
    { label: "Per - Kasir", value: "perkasir" },
];

const DropdownLaporan = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("selectedReport");
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(selectedValue !== "");
    }, [selectedValue]);

    return (
        <>
            <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
                <select id="selectedReport" {...register("selectedReport")} className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                    {laporan.map((option) => (
                        <option key={option.label} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default DropdownLaporan
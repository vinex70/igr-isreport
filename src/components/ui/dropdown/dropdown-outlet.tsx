import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

interface Outlet {
    out_kodeoutlet: string;
    out_namaoutlet: string;
}

const OutletDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("outlet");
    const [selected, setSelected] = useState(false);

    // Fetch data divisi dari API
    const { data: outlet, error, isLoading } = useFetchDataAll<Outlet[]>(
        `${API_URL}/api/filters/outlet`
    );

    useEffect(() => {
        setSelected(selectedValue !== "");
    }, [selectedValue]);

    return (
        <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
            <select id="outlet" {...register("outlet")} disabled={isLoading} className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                <option value="">{isLoading ? "Loading Outlet..." : "All Outlet"}</option>
                {outlet?.map((out) => (
                    <option key={out.out_kodeoutlet} value={out.out_kodeoutlet}>
                        {out.out_kodeoutlet} - {out.out_namaoutlet}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default OutletDropdown;

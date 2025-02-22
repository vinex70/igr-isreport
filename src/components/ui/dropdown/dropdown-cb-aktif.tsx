import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";

const API_URL = import.meta.env.VITE_BASE_URL;

interface CashbackAktif {
    cbh_kodepromosi: string;
    cbh_namapromosi: string;
    cbh_tglawal: string;
    cbh_tglakhir: string;
}

const CashbackAktifDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("cbAktif");
    const [selected, setSelected] = useState(false);

    // Fetch data divisi dari API
    const { data: cashbackAktif, error, isLoading } = useFetchDataAll<CashbackAktif[]>(
        `${API_URL}/api/filters/cbaktif`
    );

    useEffect(() => {
        setSelected(selectedValue !== "");
    }, [selectedValue]);

    return (
        <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
            <select id="cbAktif" {...register("cbAktif")} disabled={isLoading} className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                <option value="">{isLoading ? "Loading Cashback..." : "All Cashback"}</option>
                {cashbackAktif?.map((cbh) => (
                    <option key={cbh.cbh_kodepromosi} value={cbh.cbh_kodepromosi}>
                        {cbh.cbh_kodepromosi} - {cbh.cbh_namapromosi}  {cbh.cbh_tglawal} s/d {cbh.cbh_tglakhir}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default CashbackAktifDropdown;

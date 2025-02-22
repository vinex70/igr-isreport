import { useFormContext } from "react-hook-form";
import useFetchDataAll from "@/hooks/useFetchDataAll";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BASE_URL;

interface KodeTag {
    tag_kodetag: string;
    tag_keterangan: string;
}

const KodeTagDropdown = () => {
    const { register, watch } = useFormContext();
    const selectedValue = watch("tag");
    const [selected, setSelected] = useState(false);

    // Fetch data divisi dari API
    const { data: kodetag, error, isLoading } = useFetchDataAll<KodeTag[]>(
        `${API_URL}/api/filters/kodetag`
    );

    useEffect(() => {
        setSelected(selectedValue !== "");
    }, [selectedValue]);

    return (
        <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
            <select id="tag" {...register("tag")} disabled={isLoading} className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                <option value="">{isLoading ? "Loading Tag..." : "All Tag"}</option>
                {kodetag?.map((tag) => (
                    <option key={tag.tag_kodetag} value={tag.tag_kodetag}>
                        {tag.tag_kodetag} - {tag.tag_keterangan}
                    </option>
                ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default KodeTagDropdown;

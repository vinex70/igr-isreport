import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";


const DropdownMemberKhusus = () => {
    const { register, watch } = useFormContext()
    const selectedValue = watch("memberKhusus")
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(selectedValue !== "");
    }, [selectedValue]);

    return (
        <>
            <div className={`p-2 border-2 border-gray-300 rounded-lg focus-within:border-blue-500 ${selected && selectedValue ? "bg-blue-50" : ""}`}>
                <select id="memberKhusus" {...register("memberKhusus")} className={`text-sm w-full focus:outline-none ${selected && selectedValue ? "bg-transparent" : "bg-white"}`}>
                    <option value="">All Member</option>
                    <option value="Y">Member Merah</option>
                    <option value="N">Member Biru</option>
                </select>
            </div>
        </>
    )
}

export default DropdownMemberKhusus
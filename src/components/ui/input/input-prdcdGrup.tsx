import { useFormContext } from "react-hook-form";
import { useState, forwardRef, useImperativeHandle } from "react";

// Definisikan tipe ref yang akan digunakan
export type PrdcdGrupInputRef = {
    reset: () => void;
};

const PrdcdGrupInput = forwardRef<PrdcdGrupInputRef>((_, ref) => {
    const { setValue } = useFormContext();
    const [prdcdGrupValue, setPrdcdGrupValue] = useState<string | null>(null);

    const handlePrdcdGrupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPrdcdGrupValue(value);

        const formattedValue = formatPrdcdGrup(value);
        setValue('prdcdGrup', formattedValue.split(',')); // Update nilai di react-hook-form
    };

    const formatPrdcdGrup = (value: string) => {
        return value
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
            .map((item) => {
                let formatted = item.padStart(7, "0");
                if (formatted[6] !== "0") {
                    formatted = formatted.slice(0, 6) + "0";
                }
                return formatted;
            })
            .join(",");
    };

    // Fungsi reset yang akan dipanggil dari komponen induk
    const reset = () => {
        setPrdcdGrupValue(null);
        setValue('prdcdGrup', []); // Reset nilai di react-hook-form
    };

    // Ekspos fungsi reset ke komponen induk melalui ref
    useImperativeHandle(ref, () => ({
        reset,
    }));

    return (
        <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${prdcdGrupValue ? "bg-blue-50" : ''}`}>
            <input
                className={`focus:border-blue-500 focus:outline-none w-full ${prdcdGrupValue ? " bg-blue-50" : ''}`}
                placeholder="PLU 0060410, 79630, 5550, 850"
                type="text"
                value={prdcdGrupValue ?? ''} // Gunakan state untuk value input
                onChange={handlePrdcdGrupChange} // Gunakan fungsi onChange yang sudah dibuat
            />
        </div>
    );
});

export default PrdcdGrupInput;
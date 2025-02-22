import { useFormContext } from "react-hook-form";
import { useState, forwardRef, useImperativeHandle } from "react";

// Definisikan tipe ref yang akan digunakan
export type KasirInputRef = {
    reset: () => void;
};

const KasirInput = forwardRef<KasirInputRef>((_, ref) => {
    const { setValue } = useFormContext();
    const [kasirValue, setKasirValue] = useState<string>(""); // Gunakan string kosong sebagai default

    const handleKasirChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKasirValue(value);

        const formattedValue = formatKasir(value);
        setValue('kasir', formattedValue.split(',')); // Update nilai di react-hook-form
    };

    const formatKasir = (value: string) => {
        // Format nilai cashback yang diinputkan
        // 1. Konversi ke uppercase
        // 2. Split menjadi array berdasarkan koma (,)
        // 3. Trim setiap item di dalam array
        // 4. Filter array untuk menghilangkan item yang kosong
        // 5. Join array menjadi string dengan koma (,) sebagai pemisah
        return value
            .toUpperCase()
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "")
            .join(",");
    };

    // Fungsi reset yang akan dipanggil dari komponen induk
    const reset = () => {
        setKasirValue(""); // Reset ke string kosong
        setValue('kasir', []); // Reset nilai di react-hook-form
    };

    // Ekspos fungsi reset ke komponen induk melalui ref
    useImperativeHandle(ref, () => ({
        reset,
    }));

    return (
        <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${kasirValue ? "bg-blue-50" : ''}`}>
            <input
                className={`focus:border-blue-500 focus:outline-none w-full ${kasirValue ? "bg-blue-50" : ''}`}
                placeholder="Id Kasir: 088,124"
                type="text"
                value={kasirValue} // Gunakan state untuk value input
                onChange={handleKasirChange} // Gunakan fungsi onChange yang sudah dibuat
            />
        </div>
    );
});

export default KasirInput;
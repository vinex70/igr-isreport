import { useFormContext } from "react-hook-form";
import { useState, forwardRef, useImperativeHandle } from "react";

// Definisikan tipe ref yang akan digunakan
export type CashbackInputRef = {
    reset: () => void;
};

const CashbackInput = forwardRef<CashbackInputRef>((_, ref) => {
    const { setValue } = useFormContext();
    const [cashbackValue, setCashbackValue] = useState<string>(""); // Gunakan string kosong sebagai default

    const handleCashbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCashbackValue(value);

        const formattedValue = formatCashback(value);
        setValue('cashback', formattedValue.split(',')); // Update nilai di react-hook-form
    };

    const formatCashback = (value: string) => {
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
        setCashbackValue(""); // Reset ke string kosong
        setValue('cashback', []); // Reset nilai di react-hook-form
    };

    // Ekspos fungsi reset ke komponen induk melalui ref
    useImperativeHandle(ref, () => ({
        reset,
    }));

    return (
        <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${cashbackValue ? "bg-blue-50" : ''}`}>
            <input
                className={`focus:border-blue-500 focus:outline-none w-full ${cashbackValue ? "bg-blue-50" : ''}`}
                placeholder="Kode CB: CGHZ1,CCGH1"
                type="text"
                value={cashbackValue} // Gunakan state untuk value input
                onChange={handleCashbackChange} // Gunakan fungsi onChange yang sudah dibuat
            />
        </div>
    );
});

export default CashbackInput;
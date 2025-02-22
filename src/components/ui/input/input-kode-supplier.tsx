import { useFormContext } from "react-hook-form";
import { useState, forwardRef, useImperativeHandle } from "react";

// Definisikan tipe ref yang akan digunakan
export type kodeSupplierInputRef = {
    reset: () => void;
};

const kodeSupplierInput = forwardRef<kodeSupplierInputRef>((_, ref) => {
    const { setValue } = useFormContext();
    const [kodeSupplierValue, setKodeSupplierValue] = useState<string>(""); // Gunakan string kosong sebagai default

    const handleKodeSupplierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setKodeSupplierValue(value);

        const formattedValue = formatKodeSupplier(value);
        setValue('kode_supplier', formattedValue.split(',')); // Update nilai di react-hook-form
    };

    const formatKodeSupplier = (value: string) => {
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
        setKodeSupplierValue(""); // Reset ke string kosong
        setValue('kode_supplier', []); // Reset nilai di react-hook-form
    };

    // Ekspos fungsi reset ke komponen induk melalui ref
    useImperativeHandle(ref, () => ({
        reset,
    }));

    return (
        <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${kodeSupplierValue ? "bg-blue-50" : ''}`}>
            <input
                className={`focus:border-blue-500 focus:outline-none w-full ${kodeSupplierValue ? "bg-blue-50" : ''}`}
                placeholder="Kode Supplier"
                type="text"
                value={kodeSupplierValue} // Gunakan state untuk value input
                onChange={handleKodeSupplierChange} // Gunakan fungsi onChange yang sudah dibuat
            />
        </div>
    );
});

export default kodeSupplierInput;
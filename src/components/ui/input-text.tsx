// src/components/ui/input-text.tsx
import { useState, forwardRef, useImperativeHandle } from "react";
import { useFormContext } from "react-hook-form";

// Tipe ref agar bisa di-reset dari komponen induk
export type TextInputRef = {
    reset: () => void;
};

interface TextInputProps {
    name: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    autoComplete?: string;
}

const TextInput = forwardRef<TextInputRef, TextInputProps>(({ name, placeholder = "Enter text", autoComplete, onChange }, ref) => {
    const { register, setValue } = useFormContext();
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (onChange) {
            onChange(value); // Kirim ke komponen induk
        }
    };

    // Fungsi reset
    const reset = () => {
        setInputValue("");
        setValue(name, ""); // Reset nilai di react-hook-form
    };

    useImperativeHandle(ref, () => ({
        reset,
    }));

    return (
        <div className={`p-2 border-2 rounded-lg focus-within:border-blue-500 ${inputValue ? "bg-blue-50" : ""}`}>
            <input
                className={`focus:border-blue-500 focus:outline-none w-full ${inputValue ? " bg-blue-50" : ""}`}
                placeholder={placeholder}
                type="text"
                {...register(name)}
                value={inputValue}
                onChange={handleChange}
                autoComplete={autoComplete}
            />
        </div>
    );
});

export default TextInput;

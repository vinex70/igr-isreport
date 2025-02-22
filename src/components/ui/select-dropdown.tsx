import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Option {
    value: string;
    label: string;
    isGroup?: boolean; // Menandakan ini adalah grup
}

interface SelectDropdownProps {
    name: string;
    options: Option[];
    placeholder?: string;
}

const SelectDropdown = ({ name, options, placeholder = "Select an option" }: SelectDropdownProps) => {
    const { setValue, watch } = useFormContext();
    const selectedValue = watch(name);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Tutup dropdown jika klik di luar
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full">
            {/* Input Select */}
            <div
                className="p-2 border-2 rounded-lg cursor-pointer bg-white flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{selectedValue ? options.find(opt => opt.value === selectedValue)?.label : placeholder}</span>
                <ChevronDown size={16} className="text-gray-500" />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1">
                    {/* Input pencarian */}
                    <input
                        type="text"
                        className="w-full p-2 border-b border-gray-300 outline-none"
                        placeholder="Cari..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* List Options */}
                    <div className="max-h-40 overflow-y-auto">
                        {/* Opsi "All" */}
                        <div
                            className="p-2 cursor-pointer hover:bg-blue-100 font-semibold"
                            onClick={() => {
                                setValue(name, "");
                                setIsOpen(false);
                            }}
                        >
                            {placeholder}
                        </div>

                        {options
                            .filter((opt) =>
                                opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                opt.value.includes(searchTerm)
                            )
                            .map((opt) => (
                                <div
                                    key={opt.value}
                                    className={`p-2 cursor-pointer ${opt.isGroup ? "bg-gray-300 font-bold text-gray-700" : "hover:bg-blue-100"
                                        }`}
                                    onClick={() => {
                                        if (!opt.isGroup) {
                                            setValue(name, opt.value);
                                            setIsOpen(false);
                                        }
                                    }}
                                >
                                    {opt.label}
                                </div>
                            ))}

                        {/* Jika tidak ada hasil */}
                        {options.length === 0 && (
                            <p className="p-2 text-gray-500">Tidak ada data</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectDropdown;

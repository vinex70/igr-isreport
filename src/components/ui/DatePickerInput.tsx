import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext, FieldError } from "react-hook-form";
import { FiCalendar, FiX } from "react-icons/fi";

interface DatePickerInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    className?: string;
    minDate?: Date; // Tanggal minimum yang diizinkan
    maxDate?: Date; // Tanggal maksimum yang diizinkan
    placeholder?: string; // Placeholder kustom
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
    name,
    label,
    error,
    className,
    minDate,
    maxDate,
    placeholder,
}) => {
    const { setValue, watch, register } = useFormContext();
    const watchedValue = watch(name);
    const [selectedDate, setSelectedDate] = useState<Date | null>(
        watchedValue ? new Date(watchedValue) : null
    );
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    // Sinkronisasi nilai form dengan state
    useEffect(() => {
        register(name); // Register input ke react-hook-form
        if (!watchedValue) {
            setSelectedDate(null);
        } else {
            setSelectedDate(new Date(watchedValue));
        }
    }, [watchedValue, register, name]);

    // Handle perubahan tanggal
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setValue(
            name,
            date
                ? `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
                : null,
            { shouldValidate: true }
        );
    };

    // Buka kalender
    const openCalendar = () => {
        setIsCalendarOpen(true);
    };

    // Tutup kalender
    const closeCalendar = () => {
        setIsCalendarOpen(false);
    };

    // Hapus tanggal yang dipilih
    const clearDate = (e: React.MouseEvent) => {
        e.stopPropagation(); // Mencegah event bubbling ke container
        setSelectedDate(null);
        setValue(name, null, { shouldValidate: true });
    };

    return (
        <div
            className={`${className ?? "flex p-2 rounded-lg border flex-col items-center w-full focus-within:border-blue-500"} cursor-pointer`}
            onClick={openCalendar} // Buka kalender saat container diklik
        >
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative w-full">
                <DatePicker
                    id={name}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd-MMM-yyyy"
                    placeholderText={
                        placeholder ||
                        name.replace("startDate", "Tanggal Mulai").replace("endDate", "Tanggal Akhir")
                    }
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    autoComplete="off"
                    open={isCalendarOpen}
                    onCalendarClose={closeCalendar} // Tutup kalender saat pengguna mengklik di luar
                    minDate={minDate} // Tanggal minimum
                    maxDate={maxDate} // Tanggal maksimum
                    className="w-full pr-10 cursor-pointer focus:outline-none"
                />
                <div className="absolute top-1 right-5 flex items-center space-x-2">
                    {selectedDate && (
                        <FiX
                            className="text-lg text-gray-500 cursor-pointer hover:text-red-500"
                            onClick={clearDate}
                        />
                    )}
                    <FiCalendar
                        className="text-lg text-gray-500 cursor-pointer hover:text-blue-500"
                        onClick={openCalendar} // Buka kalender saat ikon diklik
                    />
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default DatePickerInput;
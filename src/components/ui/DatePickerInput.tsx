import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormContext, FieldError } from "react-hook-form";
import { FiCalendar, FiX } from "react-icons/fi";

interface DatePickerInputProps {
    name: string;
    label?: string;
    error?: FieldError;
    className?: string;
    minDate?: Date;
    maxDate?: Date;
    placeholder?: string;
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
    const datePickerRef = useRef<DatePicker | null>(null); // For focusing

    useEffect(() => {
        register(name);
        if (!watchedValue) {
            setSelectedDate(null);
        } else {
            setSelectedDate(new Date(watchedValue));
        }
    }, [watchedValue, register, name]);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setValue(
            name,
            date
                ? `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`
                : null,
            { shouldValidate: true }
        );
    };

    const clearDate = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedDate(null);
        setValue(name, null, { shouldValidate: true });
    };

    const openCalendar = (e: React.MouseEvent) => {
        e.stopPropagation();
        datePickerRef.current?.setFocus();
    };

    return (
        <div
            className={`${className ?? "flex p-2 rounded-lg border flex-col items-center w-full focus-within:border-blue-500"
                }`}
        >
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative w-full">
                <DatePicker
                    id={name}
                    ref={datePickerRef}
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
                    minDate={minDate}
                    maxDate={maxDate}
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
                        onClick={openCalendar}
                    />
                </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
    );
};

export default DatePickerInput;

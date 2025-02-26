import React from "react";
import { UseFormRegister } from "react-hook-form";
import { PromoFormValues } from "@/schemas/schemaInformasiProduk";

type FormInputProps = {
    id: keyof PromoFormValues;
    label: string;
    placeholder: string;
    icon: React.ReactNode;
    register: UseFormRegister<PromoFormValues>;
    error?: string;
    className?: string;
};

const FormInput: React.FC<FormInputProps> = ({ id, placeholder, icon, register, error, className }) => {
    return (
        <div className="relative flex flex-col w-full">
            <label htmlFor={id} className="flex items-center absolute left-2 top-2 text-lg text-gray-500 cursor-pointer">
                {icon}
            </label>
            <input
                id={id}
                {...register(id)}
                className={`${className ? className : "w-full border rounded-md py-2 pl-12"} ${error ? "border-red-500" : "border-gray-300"}`}
                placeholder={placeholder}
                autoComplete="off"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default FormInput;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LuPackageSearch } from "react-icons/lu";
import { BiBarcodeReader } from "react-icons/bi";
import { FaRegQuestionCircle } from "react-icons/fa";
import FormInput from "@/pages/informasi-promosi/form-input";
import { promoSchema, PromoFormValues } from "@/schemas/schemaInformasiProduk";
import SerchProduk from "./serch-produk";

type PromoFormProps = {
    onSubmitForm: (data: PromoFormValues) => void;
};

const PromoForm: React.FC<PromoFormProps> = ({ onSubmitForm }) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue, // <-- Gunakan setValue untuk mengisi input PLU
        formState: { errors },
    } = useForm<PromoFormValues>({
        resolver: zodResolver(promoSchema),
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Function untuk menangkap kode PLU dari modal
    const onSelectProduct = (kodeplu: string) => {
        setValue("plu", kodeplu); // Isi input PLU
        setIsModalOpen(false); // Tutup modal setelah memilih
    };

    const onSubmit = (data: PromoFormValues) => {
        onSubmitForm(data);
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="flex space-x-5">
                    <div className="flex">
                        <FormInput
                            id="plu"
                            label="PLU"
                            placeholder="Masukkan PLU"
                            icon={<LuPackageSearch size={25} />}
                            register={register}
                            error={errors.plu?.message}
                            className="w-full border border-r-0 py-2 pl-12 rounded-l-md"
                        />
                        <button
                            type="button" // Agar tidak trigger submit
                            onClick={() => setIsModalOpen(true)}
                            className="flex items-center p-2 border bg-gray-200 rounded-r-md"
                        >
                            <FaRegQuestionCircle size={20} />
                        </button>
                    </div>
                    <div>
                        <FormInput
                            id="barcode"
                            label="Barcode"
                            placeholder="Masukkan Barcode"
                            icon={<BiBarcodeReader size={25} />}
                            register={register}
                            error={errors.barcode?.message}
                        />
                    </div>
                </div>

                <div className="flex space-x-5">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Reset
                    </button>
                </div>
            </form>

            {/* Gunakan komponen Modal */}
            <SerchProduk isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={onSelectProduct} />
        </>
    );
};

export default PromoForm;

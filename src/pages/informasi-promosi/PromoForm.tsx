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
        setValue,
        formState: { errors },
    } = useForm<PromoFormValues>({
        resolver: zodResolver(promoSchema),
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [lastInputData, setLastInputData] = useState<PromoFormValues | null>(null);

    // Function untuk menangkap kode PLU dari modal
    const onSelectProduct = (kodeplu: string) => {
        setValue("plu", kodeplu);
        setIsModalOpen(false);
    };

    const onSubmit = (data: PromoFormValues) => {
        // setLastInputData(data); // Simpan input terakhir sebelum reset
        onSubmitForm(data);
        reset();
    };

    // Function untuk menjalankan submit ulang dengan data terakhir
    // const handleRefresh = () => {
    //     if (lastInputData) {
    //         onSubmit(lastInputData);
    //     }
    // };

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
                            type="button"
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

                    <div className="flex space-x-2">
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
                        {/* <button
                            type="button"
                            onClick={handleRefresh}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                        >
                            Refresh
                        </button> */}
                    </div>
                </div>
            </form>

            {/* Modal Search Produk */}
            <SerchProduk isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSelect={onSelectProduct} />
        </>
    );
};

export default PromoForm;

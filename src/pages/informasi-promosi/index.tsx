import React, { useState } from "react";
import PromoForm from "@/pages/informasi-promosi/PromoForm";
import { PromoFormValues } from "@/schemas/schemaInformasiProduk";
import TableStock from "./table-stock";
import TableSatuanJual from "./table-satuan-jual";
import TableHargaPerjenisMember from "./table-harga-perjenis-member";

const InformasiPromosi: React.FC = () => {
    const [formData, setFormData] = useState<PromoFormValues | null>(null);

    const handleFormSubmit = (data: PromoFormValues) => {
        setFormData(data);
    };

    return (
        <section className="container mx-auto">
            <div className="space-y-5 my-5">
                <h1 className="text-2xl font-bold text-blue-500">
                    Informasi Promosi - Produk
                </h1>
                <div className="flex space-x-5">
                    <div className="w-3/4">
                        <div className="space-y-5">
                            {/* Form Input */}
                            <PromoForm onSubmitForm={handleFormSubmit} />
                            {formData && (
                                <>
                                    {/* Table Promo Md */}
                                    <TableSatuanJual plu={formData.plu} barcode={formData.barcode} />

                                    {/* Table Harga Jual */}
                                    <TableHargaPerjenisMember plu={formData.plu} barcode={formData.barcode} />
                                </>
                            )}
                        </div>
                    </div>
                    {/* Table Stock */}
                    <div className="w-2/4">
                        {formData && (
                            <TableStock plu={formData.plu} barcode={formData.barcode} />
                        )}
                    </div>
                </div>
            </div>

            {formData && (
                <div className="space-y-5">
                    <div className="flex space-x-5 mt-5">

                    </div>
                    {/* Table Promo Cashback */}
                    <div className="p-4 border rounded-md bg-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700">Promo Cashback:</h2>
                        <p><strong>PLU:</strong> {formData.plu}</p>
                        <p><strong>Barcode:</strong> {formData.barcode}</p>
                    </div>

                    {/* Table Promo Gift */}
                    <div className="p-4 border rounded-md bg-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700">Promo Gift:</h2>
                        <p><strong>PLU:</strong> {formData.plu}</p>
                        <p><strong>Barcode:</strong> {formData.barcode}</p>
                    </div>

                    {/* Table Promo Instore */}
                    <div className="p-4 border rounded-md bg-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700">Promo Instore:</h2>
                        <p><strong>PLU:</strong> {formData.plu}</p>
                        <p><strong>Barcode:</strong> {formData.barcode}</p>
                    </div>

                    {/* Table Promo HJK */}
                    <div className="p-4 border rounded-md bg-gray-100">
                        <h2 className="text-lg font-semibold text-gray-700">Promo HJK:</h2>
                        <p><strong>PLU:</strong> {formData.plu}</p>
                        <p><strong>Barcode:</strong> {formData.barcode}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default InformasiPromosi;

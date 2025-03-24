import React, { useState } from "react";
import PromoForm from "@/pages/informasi-promosi/PromoForm";
import { PromoFormValues } from "@/schemas/schemaInformasiProduk";
import TableStock from "./table-stock";
import TableSatuanJual from "./table-satuan-jual";
import TableHargaPerjenisMember from "./table-harga-perjenis-member";
import TablePromoCashback from "./table-promo-cashback";
import TablePromoGift from "./table-promo-gift";
import TablePromoInstore from "./table-promo-instore";
import TablePromoHjk from "./table-promo-hjk";

const InformasiPromosi: React.FC = () => {
    const [formData, setFormData] = useState<PromoFormValues | null>(null);

    const handleFormSubmit = (data: PromoFormValues) => {
        setFormData(data);
    };

    return (
        <section className="container mx-auto mb-10">
            <div className="space-y-5 my-5 mb-20 max-h-[500px]">
                <h1 className="text-2xl font-bold text-blue-500">
                    Informasi Promosi - Produk
                </h1>

                {/* Form Input */}
                <PromoForm onSubmitForm={handleFormSubmit} />
                <div className="flex space-x-5 h-full items-stretch">
                    <div className="w-3/4 h-full">
                        <div className="space-y-5 h-full">

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
                    <div className="w-2/4 h-full">
                        {formData && (
                            <TableStock plu={formData.plu} barcode={formData.barcode} />
                        )}
                    </div>
                </div>
            </div>

            {formData && (
                <div className="space-y-5">
                    {/* Table Promo Cashback */}
                    <TablePromoCashback plu={formData.plu} barcode={formData.barcode} />
                    {/* Table Promo Gift */}
                    <TablePromoGift plu={formData.plu} barcode={formData.barcode} />
                    {/* Table Promo Instore */}
                    <TablePromoInstore plu={formData.plu} barcode={formData.barcode} />
                    {/* Table Promo HJK */}
                    <TablePromoHjk plu={formData.plu} barcode={formData.barcode} />
                </div>
            )
            }
        </section >
    );
};

export default InformasiPromosi;
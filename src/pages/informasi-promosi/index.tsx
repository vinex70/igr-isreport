import React, { useState, useEffect } from "react";
import PromoForm from "@/pages/informasi-promosi/PromoForm";
import { PromoFormValues } from "@/schemas/schemaInformasiProduk";
import TableStock from "./table-stock";
import TableSatuanJual from "./table-satuan-jual";
import TableHargaPerjenisMember from "./table-harga-perjenis-member";
import TablePromoCashback from "./table-promo-cashback";
import TablePromoGift from "./table-promo-gift";
import TablePromoInstore from "./table-promo-instore";

const InformasiPromosi: React.FC = () => {
    const [formData, setFormData] = useState<PromoFormValues | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const handleFormSubmit = (data: PromoFormValues) => {
        setFormData(data);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) { // Ubah nilai 100 sesuai kebutuhan
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section className="container mx-auto mb-10">
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
                    <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} space-y-5`}>
                        {/* Table Promo Cashback */}
                        <TablePromoCashback plu={formData.plu} barcode={formData.barcode} />
                    </div>

                    <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} space-y-5`}>
                        {/* Table Promo Gift */}
                        <TablePromoGift plu={formData.plu} barcode={formData.barcode} />
                    </div>

                    <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} space-y-5`}>
                        {/* Table Promo Instore */}
                        <TablePromoInstore plu={formData.plu} barcode={formData.barcode} />
                    </div>

                    <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} space-y-5`}>
                        {/* Table Promo HJK */}
                        <div className="p-4 border rounded-md bg-gray-100">
                            <h2 className="text-lg font-semibold text-gray-700">Promo HJK:</h2>
                            <p><strong>PLU:</strong> {formData.plu}</p>
                            <p><strong>Barcode:</strong> {formData.barcode}</p>
                        </div>
                    </div>
                </div>
            )
            }
        </section >
    );
};

export default InformasiPromosi;
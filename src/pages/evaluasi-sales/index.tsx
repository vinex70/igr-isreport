import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { filterSalesDetailSchema } from "@/schemas/FilterSalesDetailSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef } from "react";
import { LuNotebookPen } from "react-icons/lu";

// Components
import SectionBox from "@/components/ui/section-box";
import DropdownLaporan from "@/components/ui/dropdown/dropdown-laporan";

// Inputs
import PrdcdGrupInput, { PrdcdGrupInputRef } from "@/components/ui/input/input-prdcdGrup";
import NamaBarangInput, { NamaBarangInputRef } from "@/components/ui/input/input-barang";
import BarcodeInput, { BarcodeInputRef } from "@/components/ui/input/input-barcode";
import MonitoringPlu, { MonitoringPluRef } from "@/components/ui/input/input-monitoring-plu";
import NamaMember, { NamaMemberInputRef } from "@/components/ui/input/input-nama-member";
import NoMember, { NoMemberInputRef } from "@/components/ui/input/input-nomember";
import MonitoringMember, { MonitoringMemberInputRef } from "@/components/ui/input/input-monitoring-member";
import StrukInput, { StrukINputRef } from "@/components/ui/input/input-struk";
import CashbackInput, { CashbackInputRef } from "@/components/ui/input/input-cashback";
import PromoInput, { PromoInputRef } from "@/components/ui/input/input-promo";
import KasirInput, { KasirInputRef } from "@/components/ui/input/input-kasir";
import KodeSupplierInput, { kodeSupplierInputRef } from "@/components/ui/input/input-kode-supplier";
import InputNamaSupplier, { NamaSupplierInputRef } from "@/components/ui/input/input-nama-supplier";
import MonitoringSupplier, { MonitoringSupplierRef } from "@/components/ui/input/input-monitoring-supplier";

// Dropdowns
import DivisionDropdown from "@/components/ui/dropdown/dropdown-divisi";
import DepartementDropdown from "@/components/ui/dropdown/dropdown-departement";
import KategoriDropdown from "@/components/ui/dropdown/dropdown-kategori";
import KodeTagDropdown from "@/components/ui/dropdown/dropdown-kodetag";
import DropdownMemberKhusus from "@/components/ui/dropdown/dropdown-member";
import OutletDropdown from "@/components/ui/dropdown/dropdown-outlet";
import SubOutletDropdown from "@/components/ui/dropdown/dropdown-suboutlet";
import CashbackAktifDropdown from "@/components/ui/dropdown/dropdown-cb-aktif";
import GiftDropdown from "@/components/ui/dropdown/dropdown-gift";
import CbRedemPoinDropdown from "@/components/ui/dropdown/dropdown-cb-redempoin";
import CbUcDropdown from "@/components/ui/dropdown/dropdown-cb-uc";

// Radios
import KasirRadio from "@/components/ui/radio/radio-kasir";
import ItemLaranganRadio from "@/components/ui/radio/radio-item-larangan";
import DatePickerInput from "@/components/ui/DatePickerInput";
import KasirRadioMethode from "@/components/ui/radio/radio-kasir-method";

// Tipe data berdasarkan schema Zod
type FormValues = z.infer<typeof filterSalesDetailSchema>;

const Index = () => {
    const methods = useForm<FormValues>({
        resolver: zodResolver(filterSalesDetailSchema),
        defaultValues: {
            selectedReport: "perdivisi",
        },
    });

    const { handleSubmit, reset } = methods;
    const navigate = useNavigate();

    // Refs
    const refs = {
        prdcdGrupInput: useRef<PrdcdGrupInputRef>(null),
        namaBarang: useRef<NamaBarangInputRef>(null),
        barcodeInput: useRef<BarcodeInputRef>(null),
        monitoringPlu: useRef<MonitoringPluRef>(null),
        namaMember: useRef<NamaMemberInputRef>(null),
        noMember: useRef<NoMemberInputRef>(null),
        monitoringMember: useRef<MonitoringMemberInputRef>(null),
        strukInput: useRef<StrukINputRef>(null),
        cashbackInput: useRef<CashbackInputRef>(null),
        promoInput: useRef<PromoInputRef>(null),
        kasirInput: useRef<KasirInputRef>(null),
        kodeSupplierInput: useRef<kodeSupplierInputRef>(null),
        namaSupplierInput: useRef<NamaSupplierInputRef>(null),
        monitoringSupplier: useRef<MonitoringSupplierRef>(null),
    };

    const onSubmit = (data: FormValues) => {
        const { startDate, endDate, selectedReport, ...filters } = data;

        if (new Date(startDate) > new Date(endDate)) {
            alert("End date cannot be earlier than start date.");
            return;
        }

        navigate(`/evaluasi-sales/${selectedReport}`, {
            state: { startDate, endDate, selectedReport, ...filters },
        });
    };

    const onReset = () => {
        reset(); // Reset form
        Object.values(refs).forEach(ref => ref.current?.reset()); // Reset semua refs
    };

    return (
        <div className="container mx-auto border border-blue-500 bg-white rounded-xl p-4 relative shadow-xl my-2">
            <div className="flex items-center border rounded-xl p-4 relative shadow-lg bg-blue-500 text-white mb-6">
                <LuNotebookPen className="text-6xl" />
                <h1 className="text-4xl font-semibold">Evaluasi - Sales Member</h1>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
                    <div className="flex gap-6 h-full">
                        {/* Kolom 1 */}
                        <div className="flex-1 flex flex-col gap-4 justify-between">
                            <SectionBox title="Periode">
                                <DatePickerInput name="startDate" />
                                <DatePickerInput name="endDate" />
                            </SectionBox>

                            <SectionBox title="Member">
                                <NamaMember ref={refs.namaMember} />
                                <NoMember ref={refs.noMember} />
                                <MonitoringMember ref={refs.monitoringMember} />
                                <StrukInput ref={refs.strukInput} />
                                <DropdownMemberKhusus />
                                <OutletDropdown />
                                <SubOutletDropdown />
                            </SectionBox>


                        </div>

                        {/* Kolom 2 */}
                        <div className="flex-1 flex flex-col gap-4 justify-between">
                            {/* Kasir */}
                            <SectionBox title="Kasir">
                                <KasirRadio />
                                <KasirRadioMethode />
                                <KasirInput ref={refs.kasirInput} />
                            </SectionBox>

                            <SectionBox title="Promo">
                                <CashbackInput ref={refs.cashbackInput} />
                                <PromoInput ref={refs.promoInput} />
                                <CashbackAktifDropdown />
                                <GiftDropdown />
                                <CbRedemPoinDropdown />
                                <CbUcDropdown />
                            </SectionBox>
                        </div>

                        {/* Kolom 3 */}
                        <div className="flex-1 flex flex-col gap-4 justify-between">
                            <SectionBox title="Produk">
                                <ItemLaranganRadio />
                                <NamaBarangInput ref={refs.namaBarang} />
                                <PrdcdGrupInput ref={refs.prdcdGrupInput} />
                                <BarcodeInput ref={refs.barcodeInput} />
                                <MonitoringPlu ref={refs.monitoringPlu} />
                                <DivisionDropdown />
                                <DepartementDropdown />
                                <KategoriDropdown />
                                <KodeTagDropdown />
                            </SectionBox>
                        </div>

                        {/* Kolom 4 */}
                        <div className="flex-1 flex flex-col gap-4">
                            <SectionBox title="Supplier">
                                <KodeSupplierInput ref={refs.kodeSupplierInput} />
                                <InputNamaSupplier ref={refs.namaSupplierInput} />
                                <MonitoringSupplier ref={refs.monitoringSupplier} />
                            </SectionBox>

                            <SectionBox title="Jenis Laporan">
                                <DropdownLaporan />
                            </SectionBox>
                        </div>
                    </div>
                    <hr className="border-1 border-blue-500 mt-4" />
                    <div className="flex justify-end">
                        <div className="flex gap-4 p-2 w-1/4">
                            <button type="submit" className="w-1/2 bg-blue-500 text-white px-4 py-2 rounded">
                                Submit
                            </button>
                            <button type="reset" className="w-1/2 bg-gray-300 px-4 py-2 rounded">
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default Index;
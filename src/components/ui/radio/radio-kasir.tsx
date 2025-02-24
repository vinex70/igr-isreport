import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const KasirRadio = () => {
    const { watch, setValue } = useFormContext();

    // Pantau perubahan nilai "kasirType"
    const kasirType = watch("kasirType", ""); // Default "allKasir"

    // Gunakan useEffect untuk mengatur nilai default saat form di-reset
    useEffect(() => {
        if (!kasirType) {
            setValue("kasirType", "");
        }
    }, [kasirType, setValue]);

    return (
        <div className="my-4">
            <div className="relative flex items-center justify-center">
                <hr className="flex-1 border-t-2 border-gray-300" />
                <span className="mx-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    KSS
                </span>
                <hr className="flex-1 border-t-2 border-gray-300" />
            </div>

            <div className="flex justify-center mt-2">
                <RadioGroup
                    value={kasirType}
                    onValueChange={(value) => setValue("kasirType", value)} // Simpan ke react-hook-form
                    className="flex justify-center items-center space-x-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="allKasir" />
                        <Label htmlFor="allKasir" className="hover:cursor-pointer">All Kasir</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-kss" id="nonKss" />
                        <Label htmlFor="nonKss" className="hover:cursor-pointer">Non-Kss</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="only-kss" id="onlyKss" />
                        <Label htmlFor="onlyKss" className="hover:cursor-pointer">Only-Kss</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default KasirRadio;

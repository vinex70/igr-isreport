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
    );
};

export default KasirRadio;

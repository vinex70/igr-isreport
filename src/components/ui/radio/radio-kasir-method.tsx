import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const KasirRadioMethode = () => {
    const { watch, setValue } = useFormContext();

    // Pantau perubahan nilai "kasirType"
    const methodType = watch("methodType", ""); // Default "allKasir"

    // Gunakan useEffect untuk mengatur nilai default saat form di-reset
    useEffect(() => {
        if (!methodType) {
            setValue("methodType", "");
        }
    }, [methodType, setValue]);

    return (
        <div className="my-4">
            <div className="relative flex items-center justify-center">
                <hr className="flex-1 border-t-2 border-gray-300" />
                <span className="mx-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Method
                </span>
                <hr className="flex-1 border-t-2 border-gray-300" />
            </div>

            <div className="flex justify-center mt-2">
                <RadioGroup
                    value={methodType}
                    onValueChange={(value) => setValue("methodType", value)} // Simpan ke react-hook-form
                    className="flex space-x-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="allMethod" />
                        <Label htmlFor="allMethod" className="hover:cursor-pointer">All Method</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="kum" id="kum" />
                        <Label htmlFor="kum" className="hover:cursor-pointer">Kum Mandiri</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="virtual" id="virtual" />
                        <Label htmlFor="virtual" className="hover:cursor-pointer">Virtual</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default KasirRadioMethode;

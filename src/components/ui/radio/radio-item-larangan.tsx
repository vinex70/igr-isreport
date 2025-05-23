import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const ItemLaranganRadio = () => {
    const { watch, setValue } = useFormContext();

    // Pantau perubahan nilai "kasirType"
    const itemLarangan = watch("pluLarangan", ""); // Default "allKasir"

    // Gunakan useEffect untuk mengatur nilai default saat form di-reset
    useEffect(() => {
        if (!itemLarangan) {
            setValue("pluLarangan", "");
        }
    }, [itemLarangan, setValue]);

    return (
        <div className="my-4">
            <div className="relative flex items-center justify-center">
                <hr className="flex-1 border-t-2 border-gray-300" />
                <span className="mx-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Item Larangan
                </span>
                <hr className="flex-1 border-t-2 border-gray-300" />
            </div>
            <div className="flex justify-center mt-2">
                <RadioGroup
                    value={itemLarangan}
                    onValueChange={(value) => setValue("pluLarangan", value)} // Simpan ke react-hook-form
                    className="flex items-center space-x-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="allItem" />
                        <Label htmlFor="allItem" className="hover:cursor-pointer">All Item</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-larangan" id="nonLarangan" />
                        <Label htmlFor="nonLarangan" className="hover:cursor-pointer">Item Non Larangan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="larangan" id="larangan" />
                        <Label htmlFor="larangan" className="hover:cursor-pointer">Item Larangan</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default ItemLaranganRadio;

import { forwardRef, useImperativeHandle, useRef } from "react";
import TextInput, { TextInputRef } from "@/components/ui/input-text";

// Tipe ref agar bisa di-reset dari komponen induk
export type NamaSupplierInputRef = {
    reset: () => void;
};

const InputNamaSupplier = forwardRef<NamaSupplierInputRef>((_, ref) => {
    const textInputRef = useRef<TextInputRef>(null);

    // Ekspos fungsi reset dari `TextInput`
    useImperativeHandle(ref, () => ({
        reset: () => textInputRef.current?.reset(),
    }));

    return <TextInput ref={textInputRef} name="namaSupplier" placeholder="Nama Supplier" autoComplete="off" />;
});

export default InputNamaSupplier;

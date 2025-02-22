import { forwardRef, useImperativeHandle, useRef } from "react";
import TextInput, { TextInputRef } from "@/components/ui/input-text";

// Tipe ref agar bisa di-reset dari komponen induk
export type BarcodeInputRef = {
    reset: () => void;
};

const BarcodeInput = forwardRef<BarcodeInputRef>((_, ref) => {
    const textInputRef = useRef<TextInputRef>(null);

    // Ekspos fungsi reset dari `TextInput`
    useImperativeHandle(ref, () => ({
        reset: () => textInputRef.current?.reset(),
    }));

    return <TextInput ref={textInputRef} name="barcode" placeholder="Barcode" autoComplete="off" />;
});

export default BarcodeInput;

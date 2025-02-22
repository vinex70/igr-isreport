import { forwardRef, useImperativeHandle, useRef } from "react";
import TextInput, { TextInputRef } from "@/components/ui/input-text";

// Tipe ref agar bisa di-reset dari komponen induk
export type StrukINputRef = {
    reset: () => void;
};

const StrukInput = forwardRef<StrukINputRef>((_, ref) => {
    const textInputRef = useRef<TextInputRef>(null);

    // Ekspos fungsi reset dari `TextInput`
    useImperativeHandle(ref, () => ({
        reset: () => textInputRef.current?.reset(),
    }));

    return <TextInput ref={textInputRef} name="struk" placeholder="Struk : 2025010108800001S" autoComplete="off" />;
});

export default StrukInput;

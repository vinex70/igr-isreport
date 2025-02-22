import { forwardRef, useImperativeHandle, useRef } from "react";
import TextInput, { TextInputRef } from "@/components/ui/input-text";

// Tipe ref agar bisa di-reset dari komponen induk
export type MonitoringPluRef = {
    reset: () => void;
};

const MonitoringPlu = forwardRef<MonitoringPluRef>((_, ref) => {
    const textInputRef = useRef<TextInputRef>(null);

    // Ekspos fungsi reset dari `TextInput`
    useImperativeHandle(ref, () => ({
        reset: () => textInputRef.current?.reset(),
    }));

    return <TextInput ref={textInputRef} name="monitoringPlu" placeholder="Kode Monitoring PLu" autoComplete="off" />;
});

export default MonitoringPlu;

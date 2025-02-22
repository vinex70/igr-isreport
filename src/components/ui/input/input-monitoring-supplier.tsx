import { forwardRef, useImperativeHandle, useRef } from "react";
import TextInput, { TextInputRef } from "@/components/ui/input-text";

// Tipe ref agar bisa di-reset dari komponen induk
export type MonitoringSupplierRef = {
    reset: () => void;
};

const MonitoringSupplier = forwardRef<MonitoringSupplierRef>((_, ref) => {
    const textInputRef = useRef<TextInputRef>(null);

    // Ekspos fungsi reset dari `TextInput`
    useImperativeHandle(ref, () => ({
        reset: () => textInputRef.current?.reset(),
    }));

    return <TextInput ref={textInputRef} name="monitoringSupplier" placeholder="Kode Monitoring Supplier" autoComplete="off" />;
});

export default MonitoringSupplier;

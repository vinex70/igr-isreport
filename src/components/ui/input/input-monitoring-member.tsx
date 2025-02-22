import { forwardRef, useImperativeHandle, useRef } from "react";
import TextInput, { TextInputRef } from "@/components/ui/input-text";

// Tipe ref agar bisa di-reset dari komponen induk
export type MonitoringMemberInputRef = {
    reset: () => void;
};

const MonitoringMember = forwardRef<MonitoringMemberInputRef>((_, ref) => {
    const textInputRef = useRef<TextInputRef>(null);

    // Ekspos fungsi reset dari `TextInput`
    useImperativeHandle(ref, () => ({
        reset: () => textInputRef.current?.reset(),
    }));

    return <TextInput ref={textInputRef} name="monitoringMember" placeholder="Kode Monitoring Member" autoComplete="off" />;
});

export default MonitoringMember;

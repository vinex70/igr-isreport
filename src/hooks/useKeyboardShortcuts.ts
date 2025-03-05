import { useEffect } from "react";

const useKeyboardShortcuts = (onShortcut: (action: string) => void) => {
    useEffect(() => {
        const handleShortcut = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "s") { // ⌘ + S
                event.preventDefault();
                onShortcut("settings");
            }
            if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "e") { // ⌘ + B
                event.preventDefault();
                onShortcut("evaluasi-sales");
            }
            if ((event.metaKey || event.ctrlKey) && event.altKey && event.key === "i") { // ⌘ + T
                event.preventDefault();
                onShortcut("informasi-promosi");
            }
        };

        document.addEventListener("keydown", handleShortcut);

        return () => {
            document.removeEventListener("keydown", handleShortcut);
        };
    }, [onShortcut]);
};

export default useKeyboardShortcuts;

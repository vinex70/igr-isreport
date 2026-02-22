import { useState, useEffect } from "react";

interface SortConfig<T> {
    key: keyof T | "";
    direction: "ascending" | "descending" | "";
}

const useSort = <T,>(data: T[]) => {
    const [sortedData, setSortedData] = useState<T[]>(data);
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
        key: "",
        direction: "",
    });

    useEffect(() => {
        setSortedData(data);
    }, [data]);

    const parseNumber = (val: unknown): number | null => {
        if (val === null || val === undefined) return null;

        // hapus koma ribuan → "303,187,123" → "303187123"
        const cleaned = String(val).replace(/,/g, "");
        const num = Number(cleaned);

        return isNaN(num) ? null : num;
    };

    const handleSort = (key: keyof T) => {
        let direction: "ascending" | "descending" = "ascending";

        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        const sorted = [...sortedData].sort((a, b) => {
            const aVal = a[key];
            const bVal = b[key];

            const numA = parseNumber(aVal);
            const numB = parseNumber(bVal);

            // ✅ kalau dua-duanya angka → sort numerik
            if (numA !== null && numB !== null) {
                return direction === "ascending"
                    ? numA - numB
                    : numB - numA;
            }

            // ✅ fallback string compare
            const strA = String(aVal ?? "");
            const strB = String(bVal ?? "");

            return direction === "ascending"
                ? strA.localeCompare(strB)
                : strB.localeCompare(strA);
        });

        setSortedData(sorted);
        setSortConfig({ key, direction });
    };

    return { sortedData, sortConfig, handleSort };
};

export default useSort;

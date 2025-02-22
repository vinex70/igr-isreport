import { useState, useEffect } from "react";

interface SortConfig<T> {
    key: keyof T | "";
    direction: "ascending" | "descending" | "";
}

// Custom hook menggunakan arrow function
const useSort = <T,>(data: T[]) => {
    const [sortedData, setSortedData] = useState<T[]>(data);
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
        key: "",
        direction: "",
    });

    // Update sortedData ketika data berubah
    useEffect(() => {
        setSortedData(data);
    }, [data]);

    // Sorting function dengan arrow function
    const handleSort = (key: keyof T) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }

        const sorted = [...sortedData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
            if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
            return 0;
        });

        setSortedData(sorted);
        setSortConfig({ key, direction });
    };

    return { sortedData, sortConfig, handleSort };
};

export default useSort;

import { useState } from "react";

const useSearch = <T extends Record<string, unknown>>(data: T[], searchKeys: (keyof T)[]) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter((item) =>
        searchKeys.some((key) =>
            String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return { searchTerm, handleSearch, filteredData };
};

export default useSearch;
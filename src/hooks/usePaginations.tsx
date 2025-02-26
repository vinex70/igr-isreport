import React, { useState } from "react";

interface UsePaginationProps<T> {
    data: T[];
    initialPage?: number;
    initialRowsPerPage?: number;
    rowsPerPageOptions?: number[];
}

const usePagination = <T,>({
    data,
    initialPage = 0,
    initialRowsPerPage = 10,
    rowsPerPageOptions = [5, 10, 25, 50, 100],
}: UsePaginationProps<T>) => {
    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

    const paginatedData = data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    // Komponen Pagination UI
    const PaginationControls = () => (
        <div className="flex justify-between items-center mt-4">
            {/* Dropdown Jumlah Baris */}
            <div className="flex items-center space-x-2">
                <label className="text-gray-700">Baris per halaman:</label>
                <select
                    className="border border-gray-300 rounded-md p-1"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                >
                    {rowsPerPageOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Navigasi Halaman */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => handleChangePage(Math.max(page - 1, 0))}
                    disabled={page === 0}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                    {"<"} Prev
                </button>
                <span className="text-gray-700">
                    Halaman {page + 1} dari {Math.ceil(data.length / rowsPerPage)}
                </span>
                <button
                    onClick={() => handleChangePage(page + 1)}
                    disabled={(page + 1) * rowsPerPage >= data.length}
                    className="px-3 py-1 border rounded-md disabled:opacity-50"
                >
                    Next {">"}
                </button>
            </div>
        </div>
    );

    return { paginatedData, PaginationControls };
};

export default usePagination;

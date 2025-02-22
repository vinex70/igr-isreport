import { useState } from "react";

interface UsePaginationProps<T> {
    data: T[]; // Data asli yang akan dipaginasi
    initialPage?: number; // Halaman awal, default: 0
    initialRowsPerPage?: number; // Jumlah baris per halaman awal, default: 10
    rowsPerPageOptions?: number[]; // Pilihan jumlah baris per halaman, default: [5, 10, 25, 50]
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

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0); // Reset ke halaman pertama
    };

    return {
        page,
        rowsPerPage,
        rowsPerPageOptions,
        paginatedData,
        handleChangePage,
        handleChangeRowsPerPage,
    };
};

export default usePagination;

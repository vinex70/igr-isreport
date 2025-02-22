import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { filterSalesDetailSchema } from "@/schemas/FilterSalesDetailSchemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiSalesDetail } from "@/types/apiDataSalesDetail";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Typography, TablePagination, CircularProgress,
} from "@mui/material";
import { exportToExcelStyled } from "@/utils/excelExport";

type NonTunaiProps = z.infer<typeof filterSalesDetailSchema>;

const NonTunai = () => {
    const [data, setData] = useState<ApiSalesDetail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // State untuk loading
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<NonTunaiProps>({
        resolver: zodResolver(filterSalesDetailSchema),
    });

    const fetchData = async (filters: NonTunaiProps) => {
        setError(null);
        setIsLoading(true); // Mulai loading
        try {
            const response = await axios.get<{ data: ApiSalesDetail[] }>(`${baseUrl}/api/detailstruk/perstruk`, {
                params: filters,
            });
            setData(response.data.data);
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data. Please try again later.");
        } finally {
            setIsLoading(false); // Selesai loading
        }
    };

    const onSubmit: SubmitHandler<NonTunaiProps> = (filters) => {
        fetchData(filters);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const formatTanggal = (tanggal: string): string => {
        const date = new Date(tanggal);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tambahkan 1 karena bulan dimulai dari 0
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const exportToExcel = async () => {
        if (data.length === 0) return;

        const headers = [
            "No",
            "Tgl",
            "Struk No",
            "Kd Member",
            "Nama Member",
            "Gross",
            "Net",
            "Margin",
            "Vir Amount",
            "Method",
        ];

        const formattedData = data.map((item, index) => [
            index + 1,
            new Date(item.dtl_tanggal).toLocaleDateString('in-ID'),
            `${formatTanggal(item.dtl_tanggal)}.${item.dtl_kasir}.${item.dtl_stat}.${item.dtl_no_struk}`,
            item.dtl_cusno,
            item.dtl_namamember,
            Number(item?.dtl_gross || 0),
            Number(item?.dtl_netto || 0),
            Number(item?.dtl_margin || 0),
            Number(item?.dtl_amount || 0),
            item.dtl_method || "-",
        ]);

        await exportToExcelStyled({
            title: "Laporan Non Tunai",
            headers,
            data: formattedData,
            fileName: "Laporan_Non_Tunai.xlsx",
        });
    };



    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <Typography variant="h4" gutterBottom>NonTunai</Typography>

            {/* Form untuk filter */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "1rem" }}>
                <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                    <TextField
                        label="Start Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register("startDate")}
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        {...register("endDate")}
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                    />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <Button type="button" onClick={() => reset()} variant="outlined" color="secondary">Reset</Button>
                </div>
            </form>

            <div className="container mx-auto mb-10">
                {/* Loading */}
                {isLoading && (
                    <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
                        <CircularProgress />
                    </div>
                )}

                {/* Tampilkan error jika ada */}
                {error && <Typography color="error">{error}</Typography>}

                {/* Tabel untuk menampilkan data */}
                {!isLoading && (
                    <>
                        {paginatedData.length > 0 && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h4" gutterBottom>NonTunai</Typography>
                                <Button
                                    className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    sx={{ backgroundColor: '#15d15a', color: 'white' }}
                                    variant="contained"
                                    onClick={() => exportToExcel()}
                                    disabled={isLoading || data.length === 0}
                                >
                                    Export to Excel
                                </Button>
                            </div>
                        )}

                        <TableContainer component={Paper} style={{ maxHeight: "400px" }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>No</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Tgl</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Struk No</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Kd Member</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Nama Member</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Gross</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Net</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Margin</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Vir Amount</TableCell>
                                        <TableCell sx={{ backgroundColor: '#0390fc', color: 'white' }}>Method</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((item, index) => (
                                            <TableRow key={item.dtl_struk}
                                                sx={{
                                                    '&:hover': {
                                                        backgroundColor: '#92c1f0', // Blue background on hover
                                                        cursor: 'pointer', // Change cursor to pointer when hovering
                                                    }
                                                }}
                                            >
                                                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                                <TableCell>{new Date(item.dtl_tanggal).toLocaleDateString('in-ID')}</TableCell>
                                                <TableCell>
                                                    {
                                                        `${formatTanggal(item.dtl_tanggal)}.${item.dtl_kasir}.${item.dtl_stat}.${item.dtl_no_struk}`
                                                    }
                                                </TableCell>
                                                <TableCell>{item.dtl_cusno}</TableCell>
                                                <TableCell>{item.dtl_namamember}</TableCell>
                                                <TableCell>{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(item?.dtl_gross) || 0)}</TableCell>
                                                <TableCell>{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(item?.dtl_netto) || 0)}</TableCell>
                                                <TableCell>{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(item?.dtl_margin) || 0)}</TableCell>
                                                <TableCell>{new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(item?.dtl_amount) || 0)}</TableCell>
                                                <TableCell>{item.dtl_method || '-'}</TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} align="center">No data available</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        < TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100]}
                            component="div"
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>)}

            </div>

        </div>
    );
};

export default NonTunai;

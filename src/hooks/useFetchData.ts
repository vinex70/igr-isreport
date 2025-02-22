// hooks/useFetchData.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { ApiSalesDetail } from "@/types/apiDataSalesDetail";
import { z } from "zod";
import { filterSalesDetailSchema } from "@/schemas/FilterSalesDetailSchemas";

// Tipe data berdasarkan schema Zod
type FilterParams = z.infer<typeof filterSalesDetailSchema>;

const useFetchData = (url: string, params: FilterParams) => {
    const [data, setData] = useState<ApiSalesDetail[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);

            try {
                // Validasi parameter menggunakan Zod
                const validatedParams = filterSalesDetailSchema.parse(params);

                // Fetch data dari API
                const response = await axios.get<{ data: ApiSalesDetail[] }>(url, {
                    params: validatedParams,
                });

                setData(response.data.data);
            } catch (err) {
                console.error("Error fetching data:", err);

                if (err instanceof z.ZodError) {
                    setError("Invalid filter parameters.");
                } else if (axios.isAxiosError(err) && err.response) {
                    setError(err.response.data?.message || "Failed to fetch data.");
                } else {
                    setError("An unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, params]);

    return { data, error, isLoading };
};

export default useFetchData;

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { z, ZodSchema } from "zod";

/**
 * Generic hook untuk fetch data dari API dengan validasi menggunakan Zod (opsional).
 *
 * @template T - Tipe data yang diharapkan dari API
 * @param url - Endpoint API yang akan di-fetch
 * @param params - Parameter query untuk API
 * @param schema - Skema validasi menggunakan Zod (opsional)
 * @returns `{ data, error, isLoading, refetch }`
 */
const useFetchDataAll = <T>(
    url: string,
    params?: Record<string, unknown>,
    schema?: ZodSchema<T>
) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Fungsi fetch data
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.get<{ status: string; data: T }>(url, { params });

            if (response.data.status !== "success") {
                throw new Error("API response is not successful.");
            }

            let validatedData = response.data.data;
            if (schema) {
                validatedData = schema.parse(response.data.data); // Validasi jika schema tersedia
            }

            setData(validatedData);
        } catch (err) {
            if (err instanceof z.ZodError) {
                setError("Invalid response format.");
                console.error("Validation error:", err.errors);
            } else if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Failed to fetch data.");
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }, [url, params, schema]);

    const valueParams = JSON.stringify(params)
    useEffect(() => {
        fetchData();
    }, [url, valueParams, fetchData]); // Gunakan JSON.stringify agar dependensi stabil

    return { data, error, isLoading, refetch: fetchData };
};

export default useFetchDataAll;

// useFetchData.ts
import { useState, useEffect, useMemo } from 'react';
import instance from '@/utils/InstanceAxios';

interface UseFetchDataResult<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

function useFetchDatas<T>(url: string, params?: Record<string, unknown>): UseFetchDataResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const paramsString = useMemo(() => JSON.stringify(params || {}), [params]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await instance.get<{ data: T }>(url, { params });
                setData(response.data.data);
            } catch (err) {
                console.error("Error: ", err);
                setError("Gagal mengambil data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, paramsString]);

    return { data, loading, error };
}

export default useFetchDatas;
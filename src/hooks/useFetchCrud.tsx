import { useEffect, useState } from 'react';
import Controller from '../config/controllers/controller';

export interface CrudHook {
    data: any;
    error: string | null;
    loading: boolean;
}

export const useFetchCrud = (): CrudHook => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedData = await Controller.getData();
                setData(fetchedData);
            } catch (error) {
                setError(error as string);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { data, loading, error };
};
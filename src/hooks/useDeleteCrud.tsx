import { useState } from 'react';
import Controller from '../config/controllers/controller';

export const useDeleteCrud = (): {
    deleteItem: (id: string) => Promise<void>;
    error: string | null;
    loading: boolean;
} => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteItem = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            await Controller.deleteData({ id, data: [] });
        } catch (error) {
            setError(error as string);
        } finally {
            setLoading(false);
        }
    };

    return { deleteItem, loading, error };
};

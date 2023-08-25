
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export interface LogoutHook {
    logout: () => Promise<void>;
    error: string | null;
    isLoading: boolean;
}

export const useLogout = (): LogoutHook => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [, removeCookies] = useCookies();
    const navigate = useNavigate();
    

    const logout = async (): Promise<void> => {
        setIsLoading(true);
        setError(null);

        try {
            // Make a request to your backend to handle logout
            await axios.post('http://localhost:9999/v1/logout');

            // Remove the refreshToken cookie
            removeCookies('refreshToken', { path: '/' });
            setIsLoading(false);
            navigate('/login')
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || 'An error occurred';
                setError(errorMessage);
            } else {
                setError('An error occurred');
            }
        }
    };

    return {
        logout,
        error,
        isLoading,
    };
};

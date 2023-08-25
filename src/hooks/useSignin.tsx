import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie'

// Define the expected response type from the API
interface SigninResponse {
    token: string
}

export interface SigninData {
    Username: string;
    Password: string;
}

export interface SigninHook {
    signin: (data: SigninData) => Promise<SigninResponse | undefined>;
    error: string | null;
    isLoading: boolean;
}

export const useSignin = (): SigninHook => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [, setCookies] = useCookies();

    const signin = async (data: SigninData): Promise<SigninResponse | undefined> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post<SigninResponse>(`http://localhost:9999/v1/login`, data);

            if (response.status === 200) {
                setIsLoading(false);
                // Set the received refreshToken in an HttpOnly cookie
                setCookies('refreshToken', response.data.token, {
                    path: '/',
                    secure: true, // Set to true in a production environment (HTTPS)
                });
                return response.data;
            } else {
                setIsLoading(false);
                setError('Something went wrong during signIn');

            }
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
        signin,
        error,
        isLoading,
    };
};

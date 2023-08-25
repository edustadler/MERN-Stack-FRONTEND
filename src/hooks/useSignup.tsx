import React, { useState } from 'react';
import axios from 'axios';



export interface SignupData {
    Email: string;
    Name: string;
    Username: string;
    Password: string;
}

export interface SignupHook {
    signup: (data: SignupData) => Promise<undefined>;
    error: string | null;
    isLoading: boolean;
}

export const useSignup = (): SignupHook => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const signup = async (data: SignupData): Promise<undefined> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`http://localhost:9999/v1/register/`, data);

            if (response.status === 200) {
                setIsLoading(false);
                return response.data;
            } else {
                setIsLoading(false);
                setError('Something went wrong during registration');
            }
        } catch (error) {
            setIsLoading(false);
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error;
                if (errorMessage.includes('email') || errorMessage.includes('Username')) {
                    setError(errorMessage);
                } else {
                    setError(errorMessage);
                }
            } else {
                setError('An error occurred');
            }
        }
    };

    return {
        signup,
        error,
        isLoading,
    };
};


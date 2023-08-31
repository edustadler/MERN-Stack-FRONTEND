import React, { ReactNode, useEffect, useReducer, useState } from 'react'
import { AppContext, authReducer } from '.';
import Controller from '../controllers/controller';



interface IProps {
    children: ReactNode;
}

export const AppContextProvider = ({ children }: IProps) => {
    const [data, setData] = useState([]);



    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        if (state.user) {
            // Only fetch data if the user is logged in
            async function fetchData() {
                try {
                    const fetchedData = await Controller.getData();
                    setData(fetchedData);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // You can also show a user-friendly error message here.
                }
            }

            fetchData();
        }
    }, [state.user]);

    return (
        <>
            <AppContext.Provider value={{
                data: data,
                ...state,
                dispatch
            }}>
                {children}
            </AppContext.Provider>
        </>
    )
}
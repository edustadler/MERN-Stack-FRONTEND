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
        async function fetchData() {
            try {
                const fetchedData: any = await Controller.getData();

                setData(fetchedData);

            } catch (error) {
                // Handle error
            }
        }

        /* async function deleteItem(id: string) {
            try {
                const response: any = await Controller.deleteData(id);
            } catch (error) {
                
            }
        } */

        fetchData();
    }, []);

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
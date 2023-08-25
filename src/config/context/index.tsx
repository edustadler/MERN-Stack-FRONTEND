import { createContext } from 'react'



export const INITIAL_STATE = [
    {
        key: '',
        title: '',
        category: '',
        value: 0,
        date: '',
        type: ''
    },
]

export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                user: action.payload
            }
            break;
        case 'LOGOUT':
            return {
                user: null
            }
            break;

        default:
            return state
    }
}


export const AppContext = createContext({
    data: INITIAL_STATE,
    reducer: authReducer
})
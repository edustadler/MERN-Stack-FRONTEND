import { useContext } from "react"
import { AppContext } from "."

export const useAppContext = () => {
    const context = useContext(AppContext)

    if(!context) {
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }

    return context
}


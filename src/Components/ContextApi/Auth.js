import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [seatsPage, setSeatsPage] = useState(null);
    const [ticketPage, setTicketPage] = useState(null);

    const navigateStatusTrue = (page) => {
        setSeatsPage(page);
    }
    const navigateStatusFalse = () => {
        setSeatsPage(null);
        setTicketPage(null);
    }

    const ticketPageSetTrue = (page) => {
        setTicketPage(page)
    }

    return (

        <AuthContext.Provider value={{ seatsPage, ticketPage, navigateStatusTrue, navigateStatusFalse, ticketPageSetTrue }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
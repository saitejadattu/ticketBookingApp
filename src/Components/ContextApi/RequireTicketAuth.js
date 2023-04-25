import { Navigate } from "react-router-dom";
import { useAuth } from "./Auth";


export const RequireTicketAuth = ({ children }) => {
    const auth = useAuth();
    if (!auth.ticketPage) {
        return <Navigate to='/seats' />
    }

    return children
}
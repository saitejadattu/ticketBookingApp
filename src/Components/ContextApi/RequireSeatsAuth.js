import { Navigate } from "react-router-dom";    
import { useAuth } from "./Auth";


export const RequireSeatsAuth =({children})=>
{
    const auth=useAuth();
    if(!auth.seatsPage)
    {
        return <Navigate to='/pick-show' />
    }
  
    return children
}
import { useContext } from "react"
import { AuthContext } from "../AuthContextProvider"
import { Navigate } from "react-router-dom"

export const PrivateRoute=({children})=>{
    const {reducerstate}=useContext(AuthContext)
    if(!reducerstate.isAuth){
        return <Navigate to='/login' />
    }
    return children
}
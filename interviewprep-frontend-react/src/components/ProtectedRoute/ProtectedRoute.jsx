import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";

const ProtectedRoute = ({children}) => {


    const {accessToken, isCheckingAuth} = useContext(AppContext); // making accessToken available
    if (isCheckingAuth) return null;
    if (!accessToken) return <Navigate to="/login" replace/>
        return children


}

export default ProtectedRoute

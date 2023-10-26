import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {getCookie} from "../../utils/cookie";

const ProtectedRouteElement = ({onlyUnAuth, children}) => {
    const location = useLocation()
    const isAuthChecked = true
    const accessToken = getCookie('token')
    if (!isAuthChecked) {
        return <div>Loading...</div>
    }
    if (onlyUnAuth && accessToken) {
        const { from } = location.state || { from: {pathname: '/'}}
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !accessToken) {
        return <Navigate to={'/login'} state={{from: location}}/>
    }

    return children
};

export default ProtectedRouteElement;
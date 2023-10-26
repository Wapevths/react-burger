import React from 'react';
import {Navigate, useLocation} from "react-router-dom";

const ProtectedRouteElement = ({onlyUnAuth, children}) => {
    const location = useLocation()
    const isAuthChecked = true
    const user = ''
    if (!isAuthChecked) {
        return <div>Loading...</div>
    }
    if (onlyUnAuth && user) {
        const { from } = location.state || { from: {pathname: '/'}}
        return <Navigate to={from}/>
    }

    if (!onlyUnAuth && !user) {
        return <Navigate to={'/login'} state={{from: location}}/>
    }

    return children
};

export default ProtectedRouteElement;
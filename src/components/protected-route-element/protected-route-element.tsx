import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {getCookie} from "../../utils/cookie";
import PropTypes from "prop-types";

interface IProtectedRouteElementProps {
    onlyUnAuth?: boolean,
    children: React.ReactElement
}

const ProtectedRouteElement =  ({onlyUnAuth, children}:IProtectedRouteElementProps) => {
    const location = useLocation()
    const isAuthChecked:boolean = true
    const accessToken:string|undefined = getCookie('token')
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

ProtectedRouteElement.propTypes = {
    onlyUnAuth: PropTypes.bool,
    children: PropTypes.element.isRequired
};

export default ProtectedRouteElement;
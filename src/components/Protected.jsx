import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
const Protected = () => {
    const jwtToken = Cookies.get('jwtToken');

    if (jwtToken) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default Protected;

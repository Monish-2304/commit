import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import Sidebar from './Sidebar';
const Protected = () => {
    const jwtToken = Cookies.get('jwtToken');
    const dispatch = useDispatch();
    if (jwtToken) {
        return (
            <>
                <div className="flex">
                    <div className="min-w-[18%]">
                        <Sidebar />
                    </div>

                    <Outlet />
                </div>
            </>
        );
    } else {
        dispatch(logout());
        return <Navigate to="/login" />;
    }
};

export default Protected;

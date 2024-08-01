import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { validateToken } from '../redux/slices/authSlice';
import Sidebar from './Sidebar';
const Protected = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        console.count('Protected component mounted');
        dispatch(validateToken());
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error || !user) {
        console.log('i entered error in protected', error, user);
        return <Navigate to="/login" />;
    }

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
};

export default Protected;

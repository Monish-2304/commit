import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadUserFromStorage,
    logout,
    validateToken,
} from '../redux/slices/authSlice';
import Sidebar from './Sidebar';
const Protected = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, error, loading } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(loadUserFromStorage());
        dispatch(validateToken());
    }, [dispatch]);
    useEffect(() => {
        if (error) {
            dispatch(logout());
            navigate('/login');
        }
    }, [error, user, dispatch, navigate]);

    if (loading)
        return (
            <div className="h-screen bg-black text-center flex justify-center items-center self-center text-4xl text-blue-500">
                Loading...
            </div>
        );

    return user ? (
        <>
            <div className="flex">
                <div className="min-w-[18%]">
                    <Sidebar />
                </div>
                <Outlet />
            </div>
        </>
    ) : null;
};

export default Protected;

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const HeaderLayout = () => {
    return (
        <>
            <Sidebar />
            <div>hello wworld</div>
            <Outlet />
        </>
    );
};

export default HeaderLayout;

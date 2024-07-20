import React, { useState } from 'react';
import Sidebar from "./Sidebar";
import Home from "../pages/Home";

const HomeLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="flex text-xl text-center text-[#7C6D76] flex h-screen w-screen bg-[#000000] overflow-x-hidden">
            <div className={`${isSidebarOpen ? "w-[18%]" : "w-[8%]"} z-20 transition-width duration-300`}>
                <Sidebar onToggle={handleSidebarToggle} />
            </div>
            <div className={`${isSidebarOpen ? "w-[82%]" : "w-[90%]"} transition-width duration-300`}>
                <Home />
            </div>
        </div>
    );
};

export default HomeLayout;

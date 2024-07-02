import React from 'react';
import { FaHome, FaTasks, FaFire } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="bg-[#D3DADC] w-1/5 h-screen flex flex-col fixed">
            <div className="flex m-4 gap-4 items-center">
                <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
                <div>Name</div>
            </div>
            <div className="flex flex-col m-6 gap-4 overflow-y-auto">
                <div>
                    <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                        <div><FaHome size={20} /></div>
                        <div>Home</div>
                    </button>
                </div>
                <div>
                    <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                        <div><FaTasks size={20} /></div>
                        <div>Tasks</div>
                    </button>
                </div>
                <div>
                    <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                        <div><FaFire size={20} /></div>
                        <div>Streaks</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

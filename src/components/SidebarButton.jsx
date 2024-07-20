import React from 'react';
import { FaHome, FaTasks, FaFire } from 'react-icons/fa';

const SidebarButton = ({ isOpen, icon: Icon, label }) => (
    <div>
        <button className={`flex gap-3 items-center hover:bg-[#BACAE8] transition-all duration-300 ${isOpen ? "w-full" : ""}`}>
            <div>
                <Icon style={{ transition: 'all 0.3s', fontSize: isOpen ? '20px' : '35px' }} />
            </div>
            {isOpen&&<div >{label}</div>}
        </button>
    </div>
);

export default SidebarButton;

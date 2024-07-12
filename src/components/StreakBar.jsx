import React from 'react';
import { FaFire } from 'react-icons/fa';

const StreakBar = () => {
    return (
        <div className="bg-[#E2BFB3] w-full h-28 flex gap-4 items-center fixed">
            <div>
                <FaFire size={20} />
            </div>
            <div>
                Highest Streak
            </div>
        </div>
    );
};

export default StreakBar;

import React, { useState } from 'react';

const Toggle = ({ onToggleChange, label, defaultToggled }) => {
    const [isToggled, setIsToggled] = useState(defaultToggled);

    const handleToggle = () => {
        setIsToggled((prevState) => {
            const newState = !prevState;
            if (onToggleChange) onToggleChange(newState);
            return newState;
        });
    };

    return (
        <div className="flex items-center space-x-3 font-semibold">
            <span className="text-slate-200 text-base">{label}</span>
            <button
                onClick={handleToggle}
                className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 ease-in-out ${isToggled ? 'bg-green-500' : 'bg-gray-300'}`}
            >
                <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isToggled ? 'translate-x-6' : ''}`}
                ></div>
            </button>
        </div>
    );
};

export default Toggle;

import React, { useEffect, useRef, useState } from 'react';
import { FaHome, FaFire, FaBars } from 'react-icons/fa';
import { AiOutlineAim } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, setLoggingOut } from '../redux/slices/authSlice';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(location.pathname);
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const openMenu = () => {
        setMenuOpen(!menuOpen);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const handleNavigation = (path) => {
        setActiveButton(path);
        navigate(path);
    };
    const handleLogout = () => {
        dispatch(setLoggingOut(true));
        dispatch(logoutUser());
    };
    return (
        <div className=" bg-black border-r-[1.5px] text-[#7C6D76] border-r-white shadow-slate-300 shadow-md  h-screen flex flex-col rounded-sm ">
            <div className="flex justify-between m-4 gap-4 items-center">
                <div className="relative" ref={menuRef}>
                    <div
                        className="flex gap-2 px-2 py-1 hover:bg-slate-200 hover:rounded-md cursor-pointer"
                        onClick={openMenu}
                    >
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                className="w-8 h-8 rounded-full"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
                        )}
                        <div>{user?.userName}</div>
                    </div>

                    {menuOpen && (
                        <div className="bg-white absolute left-0 top-12 w-[12rem] rounded-md text-left text-base px-4 py-2 flex flex-col gap-y-2">
                            <h5 className="cursor-pointer w-fit">
                                View Profile
                            </h5>
                            <h5 className="cursor-pointer w-fit">Settings</h5>
                            <h5 className="cursor-pointer w-fit">Help</h5>
                            <Link to="/login">
                                <h5
                                    className="cursor-pointer w-fit"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </h5>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="flex justify-between px-2">
                    <FaBars size={20} />
                </div>
            </div>
            <div className="flex flex-col m-6 gap-4 overflow-y-auto">
                <div>
                    <button
                        className={`flex gap-3 justify-items-center items-center px-1 py-1 rounded-md w-full ${
                            activeButton === '/home'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-[#BACAE8]'
                        }`}
                        onClick={() => handleNavigation('/home')}
                    >
                        <div>
                            <FaHome size={20} />
                        </div>
                        <div>Home</div>
                    </button>
                </div>
                <div>
                    <button
                        className={`flex gap-3 justify-items-center items-center px-1 py-1 rounded-md w-full ${
                            activeButton === '/mission'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-[#BACAE8]'
                        }`}
                        onClick={() => handleNavigation('/mission')}
                    >
                        <div>
                            <AiOutlineAim size={20} />
                        </div>
                        <div>Missions</div>
                    </button>
                </div>
                <div>
                    <button className="flex gap-3 justify-items-center items-center px-1 py-1 rounded-md hover:bg-[#BACAE8] w-full">
                        <div>
                            <FaFire size={20} />
                        </div>
                        <div>Streaks</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;

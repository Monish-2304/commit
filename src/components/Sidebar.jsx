import React, { useEffect, useRef, useState } from 'react';
import { FaHome, FaTasks, FaFire, FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const { user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuRef = useRef(null);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
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

    return (
        <div className=" bg-black border-r-[1.5px] border-r-white shadow-slate-300 shadow-md  h-screen flex flex-col rounded-sm">
            <div className="flex justify-between m-4 gap-4 items-center">
                <div className="relative" ref={menuRef}>
                    <div
                        className="flex gap-2 px-2 py-1 hover:bg-slate-200 hover:rounded-md cursor-pointer"
                        onClick={openMenu}
                    >
                        <div className="w-8 h-8 rounded-full bg-[#E7B1A6]"></div>
                        <div>{user?.username}</div>
                    </div>

                    {menuOpen && (
                        <div className="bg-white absolute left-0 top-12 w-[12rem] rounded-md text-left text-base px-4 py-2 flex flex-col gap-y-2">
                            <h5 className="cursor-pointer w-fit">
                                View Profile
                            </h5>
                            <h5 className="cursor-pointer w-fit">Settings</h5>
                            <h5 className="cursor-pointer w-fit">Help</h5>
                            <h5
                                className="cursor-pointer w-fit"
                                onClick={() => {
                                    dispatch(logout());
                                    navigate('/login');
                                    Cookies.remove('jwtToken', { path: '/' });
                                }}
                            >
                                Logout
                            </h5>
                        </div>
                    )}
                </div>
                <div className="flex justify-between px-2">
                    <FaBars size={20} />
                </div>
            </div>
            <div className="flex flex-col m-6 gap-4 overflow-y-auto">
                <div>
                    <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                        <div>
                            <FaHome size={20} />
                        </div>
                        <div>Home</div>
                    </button>
                </div>
                <div>
                    <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
                        <div>
                            <FaTasks size={20} />
                        </div>
                        <div>Tasks</div>
                    </button>
                </div>
                <div>
                    <button className="flex gap-3 justify-items-center items-center hover:bg-[#BACAE8] w-full">
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

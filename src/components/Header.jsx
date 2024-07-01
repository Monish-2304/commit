import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import Cookies from 'js-cookie';

const Header = ({ handleToggle }) => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {}, [user]);

    return (
        <div className="flex items-center justify-between p-4">
            <div>
                <h2 className=" text-lg cursor-pointer">Commit</h2>
            </div>
            <nav className="flex gap-x-6 text-[#7C6D76]">
                <h4 className=" cursor-pointer">Features</h4>
                <h4 className=" cursor-pointer">About Us</h4>
                <h4 className=" cursor-pointer">Contact Us</h4>
                {!user && (
                    <Link to="/signup">
                        <button
                            onClick={() => handleToggle(false)}
                            className=" cursor-pointer"
                        >
                            SignUp
                        </button>
                    </Link>
                )}
                {!user && (
                    <Link to="/login">
                        <button
                            onClick={() => handleToggle(true)}
                            className=" cursor-pointer"
                        >
                            Login
                        </button>
                    </Link>
                )}
                {user && (
                    <button
                        onClick={() => {
                            dispatch(logout());
                            navigate('/login');
                            Cookies.remove('jwtToken', { path: '/' });
                        }}
                        className=" cursor-pointer"
                    >
                        Logout
                    </button>
                )}
            </nav>
        </div>
    );
};

Header.propTypes = {
    handleToggle: PropTypes.func.isRequired,
};

export default Header;

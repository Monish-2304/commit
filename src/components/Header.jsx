import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
const Header = ({ handleToggle }) => {
    return (
        <div className="flex items-center justify-between p-4">
            <div>
                <h2 className=" text-lg cursor-pointer">Commit</h2>
            </div>
            <nav className="flex gap-x-6">
                <h4 className=" cursor-pointer">Features</h4>
                <h4 className=" cursor-pointer">About Us</h4>
                <h4 className=" cursor-pointer">Contact Us</h4>
                <Link to="/signup">
                <button
                    onClick={() => handleToggle(false)}
                    className=" cursor-pointer"
                >
                    SignUp
                </button>
                </Link>
                <Link to="/login">
                <button
                    onClick={() => handleToggle(true)}
                    className=" cursor-pointer"
                >
                    Login
                </button>
                </Link>
                
            </nav>
        </div>
    );
};

Header.propTypes = {
    handleToggle: PropTypes.func.isRequired,
};

export default Header;

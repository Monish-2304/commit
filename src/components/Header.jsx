import PropTypes from 'prop-types';
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
                <button
                    onClick={() => handleToggle(true)}
                    className=" cursor-pointer"
                >
                    SignUp
                </button>
                <button
                    onClick={() => handleToggle(false)}
                    className=" cursor-pointer"
                >
                    Login
                </button>
            </nav>
        </div>
    );
};

Header.propTypes = {
    handleToggle: PropTypes.func.isRequired,
};

export default Header;

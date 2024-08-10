import Header from './Header';
import { Outlet } from 'react-router-dom';

const HeaderLayout = ({ handleToggle }) => {
    return (
        <>
            <Header handleToggle={handleToggle} />
            <Outlet />
        </>
    );
};

export default HeaderLayout;

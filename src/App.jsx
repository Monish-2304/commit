import { useState } from 'react';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const handleToggle = (status) => {
        setIsLogin(status);
    };
    return (
        <div className=" bg-custom-gradient min-h-screen">
            <Header handleToggle={handleToggle} />
            <LoginPage isLogin={isLogin} />
        </div>
    );
}

export default App;

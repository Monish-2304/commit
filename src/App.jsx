import { useState } from 'react';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Protected from './components/Protected';
import HeaderLayout from './components/HeaderLayout';
import Home from './pages/Home';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const handleToggle = (status) => {
        setIsLogin(status);
    };
    return (
        <div className="bg-custom-gradient min-h-screen">
            <Header handleToggle={handleToggle} />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route element={<Protected />}>
                    <Route element={<HeaderLayout />} />
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<LoginPage />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;

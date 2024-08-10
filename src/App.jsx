import { useCallback, useState } from 'react';
import LoginPage from './pages/LoginPage';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import Protected from './components/Protected';
import Home from './pages/Home';
import Mission from './pages/Mission';
import HeaderLayout from './components/HeaderLayout';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const handleToggle = useCallback((status) => {
        setIsLogin(status);
    }, []);
    return (
        <div className="bg-custom-gradient min-h-screen">
            <Routes>
                <Route element={<HeaderLayout handleToggle={handleToggle} />}>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<LoginPage />} />
                    <Route path="*" element={<PageNotFound />} />
                </Route>
                <Route element={<Protected />}>
                    <Route path="home" element={<Home />} />
                    <Route path="mission" element={<Mission />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

import react from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "./api";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

function App() {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    return (
        <>
            <BrowserRouter basename="/MoreMusic-frontend">
                <div className="flex flex-col min-h-screen">
                    <NavBar
                        isAuthorized={isAuthorized}
                        setIsAuthorized={setIsAuthorized}
                    />
                    <div className="flex-grow">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute isAuthorized={isAuthorized}>
                                        <Home />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/login"
                                element={
                                    <Login setIsAuthorized={setIsAuthorized} />
                                }
                            />
                            <Route
                                path="/register"
                                element={<RegisterAndLogout />}
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;

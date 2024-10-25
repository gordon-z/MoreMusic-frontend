import React from "react";
import { Link } from "react-router-dom";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import MoreMusic_icon from "/MoreMusic_icon.svg";

function NavBar({ isAuthorized, setIsAuthorized }) {
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthorized(false);
        navigate("/login");
    }

    return (
        <nav className="bg-lime-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <Link
                        to="/"
                        className="flex items-center text-white text-lg font-bold"
                    >
                        <img
                            src={MoreMusic_icon}
                            alt="Logo"
                            className="h-8 w-8 mr-2"
                        />
                        MoreMusic
                    </Link>
                </div>
                <div className="space-x-4">
                    {!isAuthorized ? (
                        <>
                            <Link
                                to="/register"
                                className="text-white hover:text-gray-400"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className="text-white hover:text-gray-400"
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <button
                            className="text-white hover:text-gray-400"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

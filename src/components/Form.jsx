import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { toast } from "react-toastify";

function Form({ route, method, setIsAuthorized }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

                setIsAuthorized(true)
                
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container max-w-3xl mx-auto px-4 py-8">
            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
            >
                {/* Form Title */}
                <h1 className="text-2xl font-bold text-gray-700">{name}</h1>

                {/* Username Input */}
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />

                {/* Password Input */}
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                {/* Submit Button */}
                <button
                    className={`w-full flex items-center justify-center px-6 py-3 text-white font-semibold rounded-lg transition-colors ${
                        loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700"
                    }`}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? (
                        // Loading Spinner
                        <div className="relative w-6 h-6">
                            <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent animate-spin"></div>
                        </div>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form> 
        </div>
        
    );
}

export default Form;

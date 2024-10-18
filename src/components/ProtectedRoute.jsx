import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, isAuthorized }) {
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

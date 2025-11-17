import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { user, token } = useSelector((state) => state.auth);

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (!(user || storedUser) || !(token || storedToken)) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}

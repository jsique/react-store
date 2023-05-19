import { Navigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

export function ProtectedRoute({ children }) {
    //Context for login user
    const { user, loading } = useAuth();
    //Validate loading state
    if (loading) return <h1>Espere...</h1>;
    //Validate login user
    if (!user) return <Navigate to="/login" />;

    return <>{children}</>;
}
import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/shared/loading/Loading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading></Loading>
    }

    if (!user) {
        <Navigate to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoute;
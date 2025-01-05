import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    if (
        !isAuthenticated &&
        !(
            location.pathname.includes("/login")
        )
    ) {
        return <Navigate to="/login" />;
    }

    if (
        isAuthenticated &&
        location.pathname.includes("/login")
    ) {
        return <Navigate to="/user" />;

    }


    return <>{children}</>;
}

export default CheckAuth;
import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children }) {
  const location = useLocation();

  if (
    !isAuthenticated &&
    !(location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return <Navigate to="/login" />;
  }




  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default CheckAuth;

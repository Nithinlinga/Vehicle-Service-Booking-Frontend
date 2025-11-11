import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { decodeToken } from "../../utils/jwtUtils";
import { logout } from "../../store/authSlice";
import { useEffect } from "react";

function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();

  const token = sessionStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      try {
        const decoded = decodeToken(token);
        const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
        if (isExpired) {
          sessionStorage.removeItem("authToken");
          dispatch(logout());
        }
      } catch (e) {
        sessionStorage.removeItem("authToken");
        dispatch(logout());
      }
    } else {
      // No token at all → logout
      dispatch(logout());
    }
  }, [location, token, dispatch]);

  // If no token or not authenticated, redirect immediately
  if (!token || !isAuthenticated) {
    return <Navigate to="/session-expired" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

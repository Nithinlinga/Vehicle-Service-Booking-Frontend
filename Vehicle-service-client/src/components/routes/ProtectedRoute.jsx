import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // If not logged in, send to your unified access page
  if (!isAuthenticated) {
    return <Navigate to="/access-account" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
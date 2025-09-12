import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader";

function RoleRoute({ roles = [] }) {
  const { user,role } = useSelector((state) => state.auth);
  // console.log("User role",user.role)
  if (!user?.role) {
    // Optional: show a loader while user is being fetched
    return <div>
      <Loader/>
    </div>;
  }

  return roles.includes(role.toLowerCase())
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
}

export default RoleRoute;
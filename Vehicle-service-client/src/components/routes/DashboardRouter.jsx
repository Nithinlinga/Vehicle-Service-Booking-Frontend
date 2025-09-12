import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function DashboardRouter() {
  const { user,role } = useSelector((state) => state.auth);
console.log(role)
  if (role.toLowerCase() === "admin") return <Navigate to="/admin-dashboard" replace />;
  if (role.toLowerCase() === "mechanic") return <Navigate to="/mechanic-dashboard" replace />;
  return <Navigate to="/user-dashboard" replace />;
}
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function PublicOnlyRoute() {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dashboardPath =
    role.toLowerCase() === "admin"
      ? "/admin"
      : role.toLowerCase() === "mechanic"
      ? "/mechanic"
      : "/user";
console.log(role.toLowerCase(),"role")
  return isAuthenticated ? <Navigate to={dashboardPath} replace/> : <Outlet />;
}

export default PublicOnlyRoute;
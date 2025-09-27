import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../Loader";

function RoleRoute({ roles = [] }) {
  const { user,role } = useSelector((state) => state.auth);
  if (!user?.role) {
    return <div>
      <Loader/>
    </div>;
  }
  return roles.includes(role.toLowerCase())
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
}

export default RoleRoute;
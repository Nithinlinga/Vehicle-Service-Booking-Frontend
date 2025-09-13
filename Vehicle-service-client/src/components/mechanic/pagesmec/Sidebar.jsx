import React from "react";
import {Home,User,Wrench,IndianRupee,LogOut} from "lucide-react";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "/services", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    { to: "/earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" /> },
    { to: "/logout", label: "Logout", icon: <LogOut className="w-5 h-5" />, danger: true },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-md min-h-screen flex flex-col justify-between">
      <div>
        <div className="px-6 py-6 text-2xl font-extrabold text-cyan-500">Mechanic Logo</div>
        <nav className="mt-4 space-y-1">
          {links.map(({ to, label, icon, danger }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 font-medium rounded-lg transition
                 ${isActive ? "bg-cyan-100 text-cyan-700" : "text-gray-700 hover:bg-cyan-50 hover:text-cyan-600"}
                 ${danger ? "text-red-500 hover:text-red-600" : ""}`
              }
            >
              {icon}
              <span className="ml-3">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;


import { Outlet } from "react-router-dom";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-auto">
      {/* Sidebar */}
      <div
        className={`h-screen bg-white dark:bg-gray-800 shadow-md z-50 overflow-hidden
    ${open ? "w-64" : "w-20"} transition-[width] duration-500 ease-in-out`}
      >


        <div className="flex items-center justify-between p-4">
          {open && (
            <h1 className="ml-2 text-lg font-bold text-gray-700 dark:text-white">
              Admin
            </h1>
          )}
          <button
            onClick={() => setOpen(!open)}
            className=" top-4 right-2 bg-green-600 hover:bg-green-700 text-white p-2 rounded-md shadow-md focus:outline-none"
          >
            {open ? (
              <MdOutlineKeyboardDoubleArrowLeft size={20} />
            ) : (
              <MdKeyboardDoubleArrowRight size={20} />
            )}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-10 space-y-4 px-4">
          <NavLink to="" end className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Dashboard" : <span className="text-xl">🏠</span>}
          </NavLink>
          <NavLink to="manage-appointment" className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Appointments" : <span className="text-xl">📅</span>}
          </NavLink>
          <NavLink to="manage-service-centers" className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Service Centre" : <span className="text-xl">🛠️</span>}
          </NavLink>
          <NavLink to="profile" className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Profile" : <span className="text-xl">👤</span>}
          </NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet /> {/* This is where child routes will render */}
      </div>
    </div>
  );
};

export default AdminDashboard;

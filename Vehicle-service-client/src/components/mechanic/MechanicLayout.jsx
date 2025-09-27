    import { useState } from 'react';
    import { NavLink, Outlet } from 'react-router-dom';
    import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
    import { FaHome } from "react-icons/fa";
    import { MdOutlineMiscellaneousServices } from "react-icons/md";
    
    const MechanicLayout = () => {
      const [open, setOpen] = useState(false);
    
      return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-auto">
          <div
            className={`h-screen bg-white dark:bg-gray-800 shadow-md z-20 overflow-hidden
            ${open ? "w-64" : "w-20"} transition-[width] duration-500 ease-in-out`}
          >
            <div className="flex items-center justify-between p-4 transition-[width] duration-500 ease-in-out">
              {open && (
                <h1 className="ml-2 text-lg font-bold text-blue-700 dark:text-white">
                  Mechanic
                </h1>
              )}
              <button
                onClick={() => setOpen(!open)}
                className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-md shadow-md focus:outline-none"
              >
                {open ? (
                  <MdOutlineKeyboardDoubleArrowLeft size={20} />
                ) : (
                  <MdKeyboardDoubleArrowRight size={20} />
                )}
              </button>
            </div>
            <nav className="mt-10 space-y-4 px-4">
              <NavLink to="" end className="block text-gray-700 dark:text-white hover:text-cyan-600">
                {open ? "Dashboard" : <span className="text-xl"><FaHome /></span>}
              </NavLink>
              <NavLink to="profile" className="block text-gray-700 dark:text-white hover:text-cyan-600">
                {open ? "profilP" : <span className="text-xl"><MdOutlineMiscellaneousServices /></span>}
              </NavLink>
            </nav>
          </div>
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      );
    };
    
    export default MechanicLayout;
    
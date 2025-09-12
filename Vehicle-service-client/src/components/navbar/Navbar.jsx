import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdPower } from "react-icons/io";
import { logout } from '../../store/authSlice';
import toast from 'react-hot-toast';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const { isAuthenticated,role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    dispatch(logout());
    toast.success("Logout Success");
    navigate("/");
  };

  return (
    <div className="sticky top-6 z-30 mx-auto max-w-6xl px-4 mb-8">
      <div className="flex flex-wrap items-center justify-between rounded-xl bg-white/80 backdrop-blur-md shadow-md ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-700 transition-colors duration-700">
        <div className="flex flex-wrap items-center justify-between w-full px-6 py-4">
          {/* Left Links */}
          <div className="flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
            <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400">Home</Link>
            {isAuthenticated && (
              <Link to={`/${role}-dashboard`} className="hover:text-cyan-600 dark:hover:text-cyan-400">
                Dashboard
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/login?role=Admin" className="hover:text-cyan-600 dark:hover:text-cyan-400">
                For Admin
              </Link>
            )}
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
           {!isAuthenticated&& <Link to="/access-account" className="hover:text-cyan-600 dark:hover:text-cyan-400">Log in</Link>}
           {
            isAuthenticated && role === "user" && (
              <>
                <Link to="/services" className="hover:text-cyan-600     dark:hover:text-cyan-400">Services</Link>
                <Link to="/appointment" className="hover:text-cyan-600 dark:hover:text-cyan-400">Appointment</Link>
              </>
            )
           }
           <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400">About us</Link>
            <Link to="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400">Contact us</Link>
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              >
                <IoMdPower size={20} />
                <span className="hidden cursor-pointer sm:inline">Logout</span>
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
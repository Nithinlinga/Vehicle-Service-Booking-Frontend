import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdPower } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import { logout } from '../../store/authSlice';
import toast from 'react-hot-toast';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    dispatch(logout());
    toast.success("Logout Success");
    navigate("/");
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="sticky top-6 z-30 mx-auto px-4 mb-8">
      <div className="flex items-center justify-between rounded-xl bg-white/80 backdrop-blur-md shadow-md ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-700 transition-colors duration-700 px-6 py-4">
        
        {/* Left Section */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Link to="/" className="hover:text-cyan-600 dark:hover:text-cyan-400">Home</Link>
          {isAuthenticated && (
            <Link to={`/${role}`} className="hover:text-cyan-600 dark:hover:text-cyan-400">
              Dashboard
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/login?role=Admin" className="hover:text-cyan-600 dark:hover:text-cyan-400">
              For Admin
            </Link>
          )}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700 dark:text-slate-200">
          {!isAuthenticated && <Link to="/access-account" className="hover:text-cyan-600 dark:hover:text-cyan-400">Log in</Link>}
          {isAuthenticated && role === "user" && (
            <>
              <Link to="/user/services" className="hover:text-cyan-600 dark:hover:text-cyan-400">Services</Link>
              <Link to="/user/appointment" className="hover:text-cyan-600 dark:hover:text-cyan-400">Appointment</Link>
            </>
          )}
          <Link to="/about" className="hover:text-cyan-600 dark:hover:text-cyan-400">About us</Link>
          <Link to="/contact" className="hover:text-cyan-600 dark:hover:text-cyan-400">Contact us</Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center cursor-pointer gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <IoMdPower size={20} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button onClick={toggleMenu} className="text-slate-700 cursor-pointer dark:text-slate-200">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 rounded-xl bg-white/90 backdrop-blur-md shadow-md ring-1 ring-slate-200 dark:bg-slate-900/90 dark:ring-slate-700 p-4 space-y-3 text-sm font-medium text-slate-700 dark:text-slate-200">
          {!isAuthenticated && <Link to="/access-account" onClick={() => setMenuOpen(false)} className="block hover:text-cyan-600 dark:hover:text-cyan-400">Log in</Link>}
          {isAuthenticated && role === "user" && (
            <>
              <Link to="/user/userservices" onClick={() => setMenuOpen(false)} className="block hover:text-cyan-600 dark:hover:text-cyan-400">Services</Link>
              <Link to="/user/appointment" onClick={() => setMenuOpen(false)} className="block hover:text-cyan-600 dark:hover:text-cyan-400">Appointment</Link>
            </>
          )}
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block hover:text-cyan-600 dark:hover:text-cyan-400">About us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} className="block hover:text-cyan-600 dark:hover:text-cyan-400">Contact us</Link>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 cursor-pointer text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              <IoMdPower size={20} />
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

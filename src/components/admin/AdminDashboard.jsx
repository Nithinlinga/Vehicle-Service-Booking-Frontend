import { Outlet } from "react-router-dom";
import { useState , useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { LayoutDashboard, Wrench, CalendarClock, Users, UserCog } from 'lucide-react';
import UserServices from "../services/UserServices";
// import ServiceCenterServices from "../../services/ServiceCenterServices";
// import BookingServices from "../../services/BookingServices";
// import ServiceTypeServices from "../../services/ServiceTypeServices";

const AdminDashboard = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const allvehicles = await UserServices.getAllVehicles();
        console.log(allvehicles.data);
        setVehicleCount(allvehicles.data.length);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    // const fetchServiceCenter = async () => {
    //   try {
    //     const allServiceCenters = await ServiceCenterServices.getAllServiceCenters();
    //     console.log(allServiceCenters.data);
    //     setServiceCenterCount(allServiceCenters.data.length);
    //   } catch (error) {
    //     console.error("Error fetching service centers:", error);
    //   }
    // };
    // const fetchBookings = async () => {
    //   try {
    //     const allBookings = await BookingServices.getAllBookings();
    //     console.log(allBookings.data);
    //     setUpcomingBookingCount(allBookings.data.length);
    //   } catch (error) {
    //     console.error("Error fetching upcoming bookings:", error);
    //   }
    // };
    // const fetchServiceTypes = async () => {
    //   try {
    //     const allServiceTypes = await ServiceTypeServices.getAllServiceTypes();
    //     console.log(allServiceTypes.data);
    //     setServiceTypeCount(allServiceTypes.data.length);
    //   } catch (error) {
    //     console.error("Error fetching service types:", error);
    //   }
    // };

    fetchVehicles();
    // fetchServiceCenter();
    // fetchBookings();
    // fetchServiceTypes();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 overflow-auto">
      <div
        className={`h-screen bg-white dark:bg-gray-800 shadow-md z-20 overflow-hidden
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
        <nav className="mt-10 space-y-4 px-4">
          <NavLink to="" end className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Dashboard" : <span className="text-xl"><LayoutDashboard /></span>}
          </NavLink>
          <NavLink to="manage-service-centers" className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Service Centre" : <span className="text-xl"><Wrench /></span>}
          </NavLink>
          <NavLink to="manage-appointment" className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Manage Appointments" : <span className="text-xl"><CalendarClock /></span>}
          </NavLink>
          <NavLink to="manage-users" className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Manage Users" : <span className="text-xl"><Users /></span>}
          </NavLink>
          <NavLink to="manage-mechanics" className="block text-gray-700 dark:text-white hover:text-cyan-600">
            {open ? "Manage Mechanics" : <span className="text-xl"><UserCog /></span>}
          </NavLink>
        </nav>
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

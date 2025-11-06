import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingServices from "../../services/BookingServices";
import UserServices from "../../services/UserServices";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import { toast } from 'react-hot-toast';

const ViewAppointments = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [activeTab, setActiveTab] = useState("UPCOMING"); // 👈 NEW STATE

  const fetchAppointments = async () => {
    try {
      const response = await BookingServices.getAllBookings();
      const data = Array.isArray(response.data) ? response.data : [response.data];

      const enrichedData = await Promise.all(
        data.map(async (a) => {
          let vehicleName = "";
          let registrationNumber = "";
          let vehicleType = "";
          let centerName = "";

          try {
            const vehicleResp = await UserServices.getVehicleById(a.vehicleId);
            vehicleName = `${vehicleResp.data.make.toUpperCase()} ${vehicleResp.data.model}`;
            registrationNumber = vehicleResp.data.registrationNumber;
            vehicleType = vehicleResp.data.vehicleType;
          } catch (err) {
            console.error("Vehicle fetch failed", err);
          }

          try {
            const centerResp = await ServiceCenterServices.getServiceCenterById(a.centerId);
            centerName = centerResp.data.name;
          } catch (err) {
            console.error("Center fetch failed", err);
          }

          return {
            ...a,
            vehicleName,
            centerName,
            registrationNumber,
            vehicleType,
          };
        })
      );

      setAppointments(enrichedData);
      localStorage.setItem("appointments", JSON.stringify(enrichedData));
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments.");
    }
  };

  useEffect(() => {
    if (user?.id && user?.role) {
      fetchAppointments();
    }
  }, [user]);

  useEffect(() => {
    setUpcoming(appointments.filter((a) => a.status === "UPCOMING"));
    setPrevious(appointments.filter((a) => a.status === "COMPLETED"));
    setCancelled(appointments.filter((a) => a.status === "CANCELLED"));
  }, [appointments]);

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this Booking?");
      if (confirmed) {
        await BookingServices.deleteBookingById(id);
        toast.success("Booking Deleted Successfully");
        fetchAppointments();
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    }
  };

  // 👇 Helper to render appointments based on active tab
  const renderAppointments = (list, label, badgeColor) => {
    if (list.length === 0) {
      return <div className=" w-full  max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl  h-[300px] overflow-y-auto flex justify-center">No {label} appointments.</div>;
    }
    return (
      <div className="space-y-4">
        {list.map((a) => (
          <div
            key={a.bookingId}
            className="rounded-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/30 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-bold text-lg text-teal-800 dark:text-teal-200">
                {a.vehicleName || a.vehicle}
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Vehicle Registration number:</span> {a.registrationNumber}
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Vehicle Type:</span> {a.vehicleType}
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Service Center Name:</span> {a.centerName}
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Date:</span> {a.bookingDate?.split("T")[0]} &nbsp;
                <span className="font-semibold">Time:</span> {a.timeslot}
              </div>
              <div className="text-gray-700 dark:text-gray-200">
                <span className="font-semibold">Verified:</span> {a.isVerified}
              </div>
            </div>
            <div className="mt-3 md:mt-0 flex flex-col gap-2">
              <span className={`inline-block px-4 py-1 rounded-full ${badgeColor} text-white font-semibold text-sm mb-2`}>
                {label}
              </span>
              {label === "Upcoming" && (
                <button
                  onClick={() => handleDelete(a.bookingId)}
                  className="bg-red-400 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full shadow"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-10">
      <div className="w-full m-2 max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-8 text-center">
          Your Appointments
        </h2>

        {/* 👇 Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setActiveTab("UPCOMING")}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === "UPCOMING" ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("COMPLETED")}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === "COMPLETED" ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab("CANCELLED")}
            className={`px-4 py-2 rounded-full font-semibold ${
              activeTab === "CANCELLED" ? "bg-teal-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* 👇 Render based on active tab */}
        {activeTab === "UPCOMING" && renderAppointments(upcoming, "Upcoming", "bg-teal-600")}
        {activeTab === "COMPLETED" && renderAppointments(previous, "Completed", "bg-green-400")}
        {activeTab === "CANCELLED" && renderAppointments(cancelled, "Cancelled", "bg-red-500")}
      </div>
    </div>
  );
};

export default ViewAppointments;
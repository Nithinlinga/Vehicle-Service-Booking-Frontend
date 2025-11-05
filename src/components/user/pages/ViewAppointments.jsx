import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BookingServices from "../../services/BookingServices";
import { toast } from 'react-hot-toast';
import { getAuthHeader } from "../../../utils/getAuthHeader";

const ViewAppointments = () => {
const { user } = useSelector((state) => state.auth);
const navigate = useNavigate();

const [appointments, setAppointments] = useState([]);
const [mappedAppointments, setMappedAppointments] = useState([]);
const [upcoming, setUpcoming] = useState([]);
const [previous, setPrevious] = useState([]);
const [vehicleType, setVehicleType] = useState("CAR");

const today = new Date().toISOString().split("T")[0];

const fetchAppointments = async () => {
try {


const response = await BookingServices.getAllBookings();
const data = Array.isArray(response.data) ? response.data : [response.data];
setAppointments(data);
localStorage.setItem("appointments", JSON.stringify(data));
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

useEffect(() => {
const mapped = (appointments || []).map((a) => {
const appointmentDate = new Date(a.bookingDate).toISOString().split("T")[0];
return {
...a,
status: appointmentDate < today ? "COMPLETED" : "UPCOMING",
};
});
setMappedAppointments(mapped);
}, [appointments, today]);

useEffect(() => {
const upcomingFiltered = mappedAppointments.filter(
(a) => a.status === "UPCOMING"
);
const previousFiltered = mappedAppointments.filter(
(a) => a.status === "COMPLETED"
);
setUpcoming(upcomingFiltered);
setPrevious(previousFiltered);
}, [mappedAppointments, vehicleType]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-10">
      <div className="w-full m-2 max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-8 text-center">
          Your Appointments
        </h2>
        <div className="flex w-full h-12 bg-slate-200 dark:bg-slate-700 rounded-full mb-8 relative">
          <button
            className={`relative z-10 w-1/2 h-full rounded-full font-bold text-lg transition-colors duration-300 cursor-pointer ${vehicleType === "CAR"
                ? "bg-teal-600 text-white"
                : "text-slate-700 dark:text-slate-200"
              }`}
            onClick={() => setVehicleType("CAR")}
          >
            Cars
          </button>
          <button
            className={`relative z-10 w-1/2 h-full rounded-full font-bold text-lg transition-colors duration-300 cursor-pointer ${vehicleType === "BIKE"
                ? "bg-teal-600 text-white"
                : "text-slate-700 dark:text-slate-200"
              }`}
            onClick={() => setVehicleType("BIKE")}
          >
            Bikes
          </button>
        </div>
        <div className="mb-10">
          <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-4">
            Upcoming Appointments ({vehicleType})
          </h3>
          {upcoming.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-300 mb-6">
              No upcoming {vehicleType} appointments.
            </div>
          ) : (
            <div className="space-y-4">
              {upcoming.map((a) => {
                console.log("Upcoming appointment:", a); // Debug log

                return (
                  <div
                    key={a.bookingId}
                    className="rounded-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/30 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <div className="font-bold text-lg text-teal-800 dark:text-teal-200">
                        {a.vehicle || `${a.make} ${a.model}`}
                      </div>
                      <div className="text-gray-700 dark:text-gray-200">
                        <span className="font-semibold">Service Center Name:</span>{" "}
                        {a.name || a.centerName || a.centerId}
                      </div>
                      <div className="text-gray-700 dark:text-gray-200">
                        <span className="font-semibold">Date:</span>{" "}
                        {a.bookingDate?.split("T")[0]} &nbsp;
                        <span className="font-semibold">Time:</span> {a.timeslot}
                      </div>
                      <div className="text-gray-700 dark:text-gray-200">
                        <span className="font-semibold">Verified:</span>{" "}
                        {a.isVerified ? "Yes" : "No"}
                      </div>
                      <div className="font-bold text-lg text-teal-800 dark:text-teal-200">
                        {a.make} {a.model} ({a.year})
                      </div>
                    </div>
                    <div className="mt-3 md:mt-0 flex flex-col gap-2">
                      <span className="inline-block px-4 py-1 rounded-full bg-teal-600 text-white font-semibold text-sm mb-2">
                        Upcoming
                      </span>
                      <button
                        onClick={() => handleDelete(a.bookingId)}
                        className="bg-red-400 cursor-pointer hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full shadow"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
            Previous Appointments ({vehicleType})
          </h3>
          {previous.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-300">
              No previous {vehicleType} appointments.
            </div>
          ) : (
            <div className="space-y-4">
              {previous.map((a) => (
                <div
                  key={a.bookingId}
                  className="rounded-xl border-l-4 border-gray-400 bg-gray-50 dark:bg-gray-900/30 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-bold text-lg text-gray-800 dark:text-gray-100">
                      {a.vehicle}
                    </div>
                    <div className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold">Service Center Id:</span>{" "}
                      {a.serviceCenterId}
                    </div>
                    <div className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold">Date:</span> {a.date} &nbsp;
                      <span className="font-semibold">Time:</span> {a.timeslot}
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-col gap-2">
                    <span className="inline-block px-4 py-1 rounded-full bg-gray-400 text-white font-semibold text-sm mb-2">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointments;

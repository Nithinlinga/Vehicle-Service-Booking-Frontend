import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import BookingServices from "../../services/BookingServices";
import MechanicServices from "../../services/MechanicServices";

export default function ManageAppointments() {
  const [activeTab, setActiveTab] = useState("PENDING");
  const [bookings, setBookings] = useState([]);
  const [mechanicsByCenter, setMechanicsByCenter] = useState({});

  const fetchBookings = async () => {
    try {
      const response = await BookingServices.getAllBookingsByAdmin();
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchMechanics = async (centers) => {
    const dataMap = {};
    for (const centerId of centers) {
      try {
        const response = await MechanicServices.getMechanicsByServiceCenter(centerId);
        dataMap[centerId] = response.data;
      } catch (error) {
        console.error(`Error fetching mechanics for center ${centerId}:`, error);
        dataMap[centerId] = [];
      }
    }
    setMechanicsByCenter(dataMap);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (bookings.length > 0) {
      const centers = [...new Set(bookings.map((b) => b.centerId))];
      fetchMechanics(centers);
    }
  }, [bookings]);

  const handleVerification = async (id, status) => {
    try {
      await BookingServices.patchBookingVerifyById(id, { isVerified: status });
      fetchBookings();
    } catch (err) {
      console.error("Error updating verification:", err);
    }
  };

  const filteredBookings = {
    PENDING: bookings.filter(b => b.isVerified === "NO" && b.status === "UPCOMING"),
    VERIFIED: bookings.filter(b => b.isVerified === "YES" && b.status !== "CANCELLED"),
    REJECTED: bookings.filter(b => b.isVerified === "REJECTED"),
  };

  const renderBookings = (list, label, badgeColor) => {
    if (list.length === 0) {
      return <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl h-[300px] overflow-y-auto flex justify-center items-center">No {label} appointments.</div>;
    }

    return (
      <div className="space-y-4">
        {list.map((b) => (
          <div
            key={b.bookingId}
            className="rounded-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/30 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="font-bold text-lg text-teal-800 dark:text-teal-200">{b.vehicleName}</div>
              <div className="text-gray-700 dark:text-gray-200"><b>Service Center:</b> {b.centerName}</div>
              <div className="text-gray-700 dark:text-gray-200"><b>Date:</b> {b.bookingDate?.split("T")[0]} <b>Time:</b> {b.timeslot}</div>
              <div className="text-gray-700 dark:text-gray-200"><b>Verified:</b> {b.isVerified}</div>
            </div>
            <div className="mt-3 md:mt-0 flex items-center flex-col gap-2">
              <span className={`inline-block px-4 py-1 rounded-full ${badgeColor} text-white font-semibold text-sm mb-2`}>
                {label}
              </span>
              {label === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVerification(b.bookingId, "YES")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleVerification(b.bookingId, "REJECTED")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
              {label === "Rejected" && (
                <button
                  onClick={() => handleVerification(b.bookingId, "YES")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Accept
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
          Manage Appointments
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          {["PENDING", "VERIFIED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === tab
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "PENDING" && renderBookings(filteredBookings.PENDING, "Pending", "bg-yellow-500")}
        {activeTab === "VERIFIED" && renderBookings(filteredBookings.VERIFIED, "Verified", "bg-green-500")}
        {activeTab === "REJECTED" && renderBookings(filteredBookings.REJECTED, "Rejected", "bg-red-500")}
      </div>
    </div>
  );
}

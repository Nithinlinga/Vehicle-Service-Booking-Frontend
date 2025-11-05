import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import BookingServices from "../../services/BookingServices";
import MechanicServices from "../../services/MechanicServices";

export default function ManageAppointments() {
  const [showVerified, setShowVerified] = useState(false);
  const [showUnverified, setShowUnverified] = useState(false);
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
    // const confirmMsg =
    //   status === "YES"
    //     ? "Are you sure you want to ACCEPT this Booking?"
    //     : status === "REJECTED"
    //       ? "Are you sure you want to REJECT this Booking?"
    //       : "Are you sure you want to mark this Booking as UNVERIFIED?";
    // if (!window.confirm(confirmMsg)) return;

    try {

      await BookingServices.patchBookingVerifyById(id, {
        isVerified: status,
      })
      fetchBookings();
    } catch (err) {
      console.error("Error updating verification:", err);
    }
  };
  return (
    <div className="w-full gap-4">
      <div className="flex-1">
        <button
          onClick={() => setShowUnverified(!showUnverified)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-500"
        >
          <span>
            Pending Appointments ({bookings.filter(b => b.isVerified === "NO").length})
          </span>
          {showUnverified ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${showUnverified ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="mt-2 rounded p-3 space-y-3">
            {bookings.map(
              b =>
                b.isVerified === "NO" && (
                  <div key={b.bookingId} className="p-3 rounded shadow-sm border">
                    <div key={b.bookingId} className="p-3 rounded shadow-sm border">
                    <p><b>Service Center Name:</b> {b.serviceCenterName}</p>
                    <p><b>Date:</b> {b.date?.split("T")[0]}</p>
                    <p><b>Time:</b> {b.timeslot}</p>
                    <p><b>Vehicle Name:</b> {b.vehicleName}</p>
                  </div>
                    <div className="mt-3 sm:mt-0 flex gap-2">
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
                  </div>

                )
            )}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <button
          onClick={() => setShowVerified(!showVerified)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 transition-colors duration-500"
        >
          <span>
            All Appointments ({bookings.filter(b => b.isVerified === "YES").length})
          </span>
          {showVerified ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${showVerified ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="mt-2 rounded p-3 space-y-3">
            {bookings.map(
              (b) =>
                b.isVerified === "YES" && (
                  <div
                    key={b.bookingId}
                    className="p-4 rounded-lg shadow-md border bg-gray-50 dark:bg-gray-800 flex justify-between items-center text-gray-900 dark:text-gray-100"
                  >
                    {/* Booking Details */}
                    <div className="space-y-1">
                      <p><b>Service Center Name:</b> {b.serviceCenterName}</p>
                      <p><b>Date:</b> {b.bookingDate?.split("T")[0]}</p>
                      <p><b>Time:</b> {b.timeslot}</p>
                      <p><b>Vehicle Name:</b> {b.vehicleName}</p>
                    </div>

                    {/* Dropdown for Mechanics */}
                    {/* <div className="ml-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Assign Mechanic
                      </label>
                      <select
                        className="border rounded px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                        onChange={(e) =>
                          console.log(`Mechanic for booking ${b.bookingId}:`, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {mechanicsByCenter[b.serviceCenterName]?.map((m) => (
                          <option key={m.mechanicId} value={m.mechanicId}>
                            {m.name} ({m.expertise})
                          </option>
                        ))}
                      </select>
                    </div> */}
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <button
          onClick={() => setShowVerified(!showVerified)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-sky-600 hover:to-cyan-600 transition-colors duration-500"
        >
          <span>
            Rejected Appointments ({bookings.filter(b => b.isVerified === "REJECTED").length})
          </span>
          {showVerified ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${showVerified ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="mt-2 rounded p-3 space-y-3">
            {bookings.map(
              b =>
                b.isVerified === "REJECTED" && (
                  <div key={b.bookingId} className="p-3 rounded shadow-sm border">
                    <div key={b.bookingId} className="p-3 rounded shadow-sm border">
                    <p><b>Service Center Name:</b> {b.serviceCenterName}</p>
                    <p><b>Date:</b> {b.bookingDate?.split("T")[0]}</p>
                    <p><b>Time:</b> {b.timeslot}</p>
                    <p><b>Vehicle Name:</b> {b.vehicleName}</p>
                  </div>
                    <div className="mt-3 sm:mt-0 flex gap-2">
                      <button
                        onClick={() => handleVerification(b.bookingId, "YES")}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
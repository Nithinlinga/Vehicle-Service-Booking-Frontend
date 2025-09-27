import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import BookingServices from "../../services/BookingServices";

export default function ManageAppointments() {
  const [showVerified, setShowVerified] = useState(false);
  const [showUnverified, setShowUnverified] = useState(false);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await BookingServices.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  const handleVerification = async (id, status) => {
    const confirmMsg =
      status === "Yes"
        ? "Are you sure you want to ACCEPT this Booking?"
        : status === "Rejected"
          ? "Are you sure you want to REJECT this Booking?"
          : "Are you sure you want to mark this Booking as UNVERIFIED?";
    if (!window.confirm(confirmMsg)) return;

    try {

      await BookingServices.patchBookingVerifyById(id, {
        verify: status,
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
            Pending Appointments ({bookings.filter(b => b.isVerified === "No").length})
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
                b.isVerified === "No" && (
                  <div key={b.bookingId} className="p-3 rounded shadow-sm border">
                    <p className="font-bold text-amber-700">{b.name}</p>
                    <p>Service Center Id: {b.serviceCenterId}</p>
                    <p>Date: {b.date}</p>
                    <p>Time: {b.timeslot}</p>
                    <p>Vehicle Id: {b.vehicleId}</p>
                    <div className="mt-3 sm:mt-0 flex gap-2">
                      <button
                        onClick={() => handleVerification(b.bookingId, "Yes")}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleVerification(b.bookingId, "Rejected")}
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
            All Appointments ({bookings.filter(b => b.isVerified === "Yes").length})
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
                b.isVerified === "Yes" && (
                  <div key={b.bookingId} className="p-3 rounded shadow-sm border">
                    <p className="font-bold text-amber-700">{b.name}</p>
                    <p>Service Center Id: {b.serviceCenterId}</p>
                    <p>Date: {b.date}</p>
                    <p>Time: {b.timeslot}</p>
                    <p>Vehicle Id: {b.vehicleId}</p>
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
            Rejected Appointments ({bookings.filter(b => b.isVerified === "Rejected").length})
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
                b.isVerified === "Rejected" && (
                  <div key={b.bookingId} className="p-3 rounded shadow-sm border">
                    <p className="font-bold text-amber-700">{b.name}</p>
                    <p>Service Center Id: {b.serviceCenterId}</p>
                    <p>Date: {b.date}</p>
                    <p>Time: {b.timeslot}</p>
                    <p>Vehicle Id: {b.vehicleId}</p>
                    <div className="mt-3 sm:mt-0 flex gap-2">
                      <button
                        onClick={() => handleVerification(b.bookingId, "Yes")}
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

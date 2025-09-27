import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import BookingServices from "../services/BookingServices";
import MechanicServices from "../services/MechanicServices";

const MechanicDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [serviceCenterId,setServiceCenterId]=useState();

  const fetchServiceCenter=async()=>{
    try {
      
      const resp=await MechanicServices.getMechanicsById(user.id);
      setServiceCenterId(resp.data.servicecenterId)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchServiceCenter()
  },[])
  const fetchBookings = async () => {
    try {
      const response = await BookingServices.getBookingsByServiceCenterId(serviceCenterId);
      setBookings(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [serviceCenterId]);
  const normalizeStatus = (booking) => {
    if (booking.status === "cancelled") return "cancelled";

    const bookingDate = new Date(booking.date);
    const now = new Date();

    return bookingDate > now ? "upcoming" : "completed";
  };
  const statusCounts = bookings.reduce(
    (acc, booking) => {
      const status = normalizeStatus(booking);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    {}
  );
  const cards = [
    {
      title: "Upcoming Services",
      value: statusCounts.upcoming || 0,
      color: "text-cyan-400 border-cyan-400",
      status: "upcoming",
    },
    {
      title: "Completed Services",
      value: statusCounts.completed || 0,
      color: "text-green-400 border-green-400",
      status: "completed",
    },
  ];
  const filteredBookings = selectedStatus
    ? bookings.filter((b) => normalizeStatus(b) === selectedStatus)
    : [];

  return (
    <div className="flex-1 overflow-auto">
      <div
        className={`flex-1 ml-${sidebarOpen ? "64" : "20"} transition-all duration-300 p-8`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {cards.map(({ title, value, color, status }) => (
            <div
              key={title}
              onClick={() =>
                status === "earnings"
                  ? navigate("earnings")
                  : setSelectedStatus(status)
              }
              className={`cursor-pointer rounded-xl p-4 border-2 ${color} shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300`}
            >
              <h3 className="text-sm font-semibold mb-2">{title}</h3>
              <CountUp
                start={0}
                end={value}
                duration={2.5}
                prefix={status === "earnings" ? "₹ " : ""}
                className={`text-xl font-bold ${color}`}
              />
            </div>
          ))}
        </div>
        {selectedStatus && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 capitalize text-slate-700 dark:text-white">
              {selectedStatus} Services
            </h2>
            {filteredBookings.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                No {selectedStatus} services found.
              </p>
            ) : (
              <ul className="space-y-4">
                {filteredBookings.map((booking) => (
                  <li
                    key={booking.bookingId}
                    className="p-4 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                      Booking #{booking.bookingId}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      Date:{" "}
                      {new Date(booking.date).toLocaleDateString()} at{" "}
                      {booking.timeslot}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      Status: {normalizeStatus(booking)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicDashboard;

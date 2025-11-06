import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import BookingServices from "../services/BookingServices";
import MechanicServices from "../services/MechanicServices";
import { FaCar } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import {
  Line,
  Bar,
  Pie,
  Doughnut
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const MechanicDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [serviceCenterId,setServiceCenterId]=useState();

  const fetchServiceCenter=async()=>{
    try {
      
      const resp=await MechanicServices.getMechanic();
      
      setServiceCenterId(resp.data.centerId)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchServiceCenter()
  },[])

  const fetchBookings = async () => {
    try {
      const response = await BookingServices.getBookingByCenterId(serviceCenterId);
      console.log("Fetched bookings:", response.data);
      setBookings(response.data || []);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {      
    if (serviceCenterId) {
      fetchBookings();
    }
  }, [serviceCenterId]);
    const normalizeStatus = (booking) => {
    if (booking.isVerified === "YES") return "cancelled";

    const bookingDate = new Date(booking.date);
    const now = new Date();

    const status = bookingDate > now ? "upcoming" : "completed";
    console.log("Booking:", booking.bookingId, "Status:", status);
    return status;
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
    {
      title: "Cancelled Services",
      value: statusCounts.cancelled || 0,
      color: "text-green-400 border-green-400",
      status: "cancelled",
    },
  ];
  const filteredBookings = selectedStatus
    ? bookings.filter((b) => normalizeStatus(b) === selectedStatus)
    : [];

const workshopMetrics = [
  { title: "Vehicles Serviced", value: 128, icon: <FaCar className="text-green-400 text-2xl" /> },
  { title: "Avg Service Time", value: "2.5 hrs", icon: <FaClock className="text-green-400 text-2xl" /> },
  { title: "Parts Replaced", value: 342, icon: <FaTools className="text-green-400 text-2xl" /> },
  { title: "Revenue", value: "₹1,25,000", icon: <FaIndianRupeeSign className="text-green-400 text-2xl" /> }
];

const downtimeData = {
  labels: ["Broken Equipment", "Technician Error", "Personal Breaks"],
  datasets: [{
    data: [25, 8, 12],
    backgroundColor: ["#ef4444", "#f59e0b", "#3b82f6"]
  }]
};

const serviceTypeData = {
  labels: ["Oil Change", "Brake Repair", "AC Service", "Battery", "Others"],
  datasets: [{
    label: "Service Types",
    data: [30, 20, 15, 10, 25],
    backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"]
  }]
};

const quarterlyData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [{
    label: "Quarterly Volume",
    data: [1200, 1500, 1700, 1900],
    borderColor: "#06b6d4",
    backgroundColor: "rgba(6,182,212,0.2)",
    tension: 0.4
  }]
};

  return (
    <div className="flex-1 overflow-auto">
      <div
        className={`flex-1 ml-${sidebarOpen ? "64" : "20"} transition-all duration-300 p-8`}
      >
        {/* Service Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cards.map(({ title, value, color, status }) => (
                <div
                  key={title}
                  onClick={() =>
                    status === "earnings"
                      ? navigate("earnings")
                      : setSelectedStatus(status)
              }
              className={`cursor-pointer rounded-xl p-6 border-l-4 ${color} bg-slate-800 text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300`}
            >
              <h3 className="text-sm font-semibold mb-2 tracking-wide">{title}</h3>
              <CountUp
                start={0}
                end={value}
                duration={2.5}
                prefix={status === "earnings" ? "₹ " : ""}
                className={`text-3xl font-bold ${color}`}
              />
            </div>
          ))}
        </div>

        {/* Filtered Bookings Section */}
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
                    className="p-5 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition bg-white dark:bg-slate-800"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1">
                      Booking #{booking.bookingId}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      Date: {new Date(booking.date).toLocaleDateString()} at {booking.timeslot}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      Status: <span className="capitalize font-medium">{normalizeStatus(booking)}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <br />
        <br />
        {/* Workshop Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {workshopMetrics.map((metric) => (
            <div
              key={metric.title}
              className="bg-slate-800 text-white px-4 py-3 rounded-xl shadow-md h-[100px] flex items-center gap-4"
            >
              {/* Icon */}
              <div className="text-2xl">
                {metric.icon}
              </div>

              {/* Text */}
              <div>
                <h4 className="text-sm font-semibold">{metric.title}</h4>
                <p className="text-lg font-bold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Downtime Pie Chart */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md w-full h-[300px] flex flex-col justify-center items-center">
            <h4 className="text-base font-semibold mb-2 text-slate-700 dark:text-white">Downtime Causes</h4>
            <div className="w-[240px] h-[240px]">
              <Pie data={downtimeData} />
            </div>
          </div>

          {/* Efficiency Circular Indicator */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md w-full h-[300px] flex flex-col justify-center items-center text-center">
            <h4 className="text-base font-semibold mb-2 text-slate-700 dark:text-white">Efficiency</h4>
            <div className="w-[200px] h-[200px]">
              <Doughnut
                data={{
                  labels: ["Efficiency", "Remaining"],
                  datasets: [{
                    data: [78, 22],
                    backgroundColor: ["#06b6d4", "#e5e7eb"]
                  }]
                }}
                options={{ cutout: "70%" }}
              />
            </div>
            <p className="mt-2 text-lg font-bold text-slate-700 dark:text-white">78%</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-white">Service Types</h4>
            <Bar data={serviceTypeData} />
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
            <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-white">Quarterly Service Volume</h4>
            <Line data={quarterlyData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;

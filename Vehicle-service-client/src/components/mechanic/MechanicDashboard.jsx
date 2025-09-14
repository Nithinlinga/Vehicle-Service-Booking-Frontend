import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, User, Wrench, IndianRupee, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import CountUp from "react-countup";

// Sample service data
const allOrders = [
  { id: 1, service: "Engine Repair", status: "completed", date: "2025-08-21" },
  { id: 2, service: "Brake & Suspension", status: "upcoming", date: "2025-09-10" },
  { id: 3, service: "Car AC Service", status: "cancelled", date: "2025-08-15" },
  { id: 4, service: "Electrical Diagnostics", status: "completed", date: "2025-08-10" },
  { id: 5, service: "Oil Change", status: "upcoming", date: "2025-09-12" },
];

const MechanicDashboard = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(null);

  const cards = [
    {
      title: "Upcoming Services",
      value: 2,
      color: "text-cyan-400 border-cyan-400",
      status: "upcoming",
    },
    {
      title: "Completed Services",
      value: 2,
      color: "text-green-400 border-green-400",
      status: "completed",
    },
    {
      title: "Cancelled Services",
      value: 1,
      color: "text-red-400 border-red-400",
      status: "cancelled",
    },
    {
      title: "Weekly Earnings",
      value: 686,
      color: "text-pink-400 border-pink-400",
      status: "earnings",
    },
  ];

  const links = [
    { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "/service-history", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    { to: "/earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" /> },
  ];

  const filteredOrders = selectedStatus
    ? allOrders.filter((order) => order.status === selectedStatus)
    : [];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-slate-800 text-white">
        <div className="px-6 py-6 text-2xl font-extrabold text-cyan-400">Mechanic Panel</div>
        <nav className="mt-4 space-y-1 pl-6">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 font-medium rounded-lg transition ${
                  isActive ? "text-cyan-400" : "text-white hover:text-cyan-300"
                }`
              }
            >
              {icon}
              <span className="ml-3">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map(({ title, value, color, status }) => (
            <div
              key={title}
              onClick={() =>
                status === "earnings" ? navigate("/earnings") : setSelectedStatus(status)
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

        {/* Filtered Orders */}
        {selectedStatus && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4 capitalize text-slate-700 dark:text-white">
              {selectedStatus} Services
            </h2>
            {filteredOrders.length === 0 ? (
              <p className="text-gray-500">No {selectedStatus} services found.</p>
            ) : (
              <ul className="space-y-4">
                {filteredOrders.map((order) => (
                  <li
                    key={order.id}
                    className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold">{order.service}</h3>
                    <p className="text-sm text-gray-500">Date: {order.date}</p>
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

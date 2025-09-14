import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { TbPlaylistAdd } from "react-icons/tb";
import CountUp from "react-countup";

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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const cards = [
    { title: "Upcoming Services", value: 2, color: "text-cyan-400 border-cyan-400", status: "upcoming" },
    { title: "Completed Services", value: 2, color: "text-green-400 border-green-400", status: "completed" },
    { title: "Cancelled Services", value: 1, color: "text-red-400 border-red-400", status: "cancelled" },
    { title: "Weekly Earnings", value: 686, color: "text-pink-400 border-pink-400", status: "earnings" },
  ];

  const filteredOrders = selectedStatus
    ? allOrders.filter((order) => order.status === selectedStatus)
    : [];

  return (
    <div className="flex-1 overflow-auto">
      {/* Sidebar */}

      {/* Main Content */}
      <div className={`flex-1 ml-${sidebarOpen ? "64" : "20"} transition-all duration-300 p-8`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map(({ title, value, color, status }) => (
            <div
              key={title}
              onClick={() =>
                status === "earnings" ? navigate("earnings") : setSelectedStatus(status)
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
              <p className="text-gray-500 dark:text-gray-400">No {selectedStatus} services found.</p>
            ) : (
              <ul className="space-y-4">
                {filteredOrders.map((order) => (
                  <li
                    key={order.id}
                    className="p-4 border border-gray-200 dark:border-slate-700 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{order.service}</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Date: {order.date}</p>
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

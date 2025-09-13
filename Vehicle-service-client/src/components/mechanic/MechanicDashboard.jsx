
/*
APP.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Earnings from "./pages/Earnings";
import Logout from "./pages/Logout";
import Orders from "./components/Orders";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/services" element={<Services />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/orders/:status" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; */

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Home,User,Wrench,IndianRupee,LogOut} from "lucide-react";
import {NavLink} from "react-router-dom";


const allOrders = [
  { id: 1, service: "Engine Repair", status: "completed", date: "2025-08-21" },
  { id: 2, service: "Brake & Suspension", status: "upcoming", date: "2025-09-10" },
  { id: 3, service: "Car AC Service", status: "cancelled", date: "2025-08-15" },
  { id: 4, service: "Electrical Diagnostics", status: "completed", date: "2025-08-10" },
  { id: 5, service: "Oil Change", status: "upcoming", date: "2025-09-12" },
];

const MechanicDashboard = ()=>{
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const cards = [
    {
      title: "Upcoming Services",
      value: "2",
      color: "text-cyan-400 border-cyan-400",
      status: "upcoming",
    },
    {
      title: "Completed Services",
      value: "2",
      color: "text-green-400 border-green-400",
      status: "completed",
    },
    {
      title: "Cancelled Services",
      value: "1",
      color: "text-red-400 border-red-400",
      status: "cancelled",
    },
    {
      title: "Lifetime Earnings",
      value: "₹ 686",
      color: "text-pink-400 border-pink-400",
      status: "earnings",
    },
  ];

  const links = [
    { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "/services", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    { to: "/earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" /> },
  ];

  const filteredOrders = selectedStatus
    ? allOrders.filter(order => order.status === selectedStatus)
    : [];

  return(
    <div className="flex h-screen">
      {/*<div className="flex h-screen">    border border-white-900*/}
        <aside className="w-64 flex flex-col">
          {/*<div className="px-6 py-6 text-2xl font-extrabold text-cyan-500">Mechanic Logo</div>*/}
          <nav className="mt-10 space-y-1 pl-20">
            {links.map(({ to, label, icon, danger }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 font-medium rounded-lg transition
                  ${isActive ? " text-cyan-700" : "text-white-700  hover:text-cyan-600"}
                  ${danger ? "text-red-500 hover:text-red-600" : ""}`
                }
              >
                {icon}
                <span className="ml-3">{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
    {/*</div>*/}
    {/*<PageWrapper>
      {/* Cards */}
    <div className="mx-auto w-[800px] h-[200px] mt-12" >
      {/*<div>*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ">
          {cards.map(({ title, value, color, status }) => (
            <div
              key={title}
              onClick={() =>
              status === "earnings"
                ? navigate("/earnings")
                : setSelectedStatus(status)
              }
              className={`cursor-pointer rounded-xl p-4 border-2 ${color} shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300`}
            >
              <h3 className="text-sm font-semibold text-${color}-700">{title}</h3>
              <p className={`mt-1 text-xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>
        {/*filter dashboard */}
        {selectedStatus && (
          <div className="mt-4">
            <h2 className="text-xl font-bold text-white-800 mb-4 capitalize">
              {selectedStatus} Services
            </h2>
              {filteredOrders.length === 0 ? (
                <p className="text-white-500">No {selectedStatus} services found.</p>
                ) : (
                <ul className="space-y-4">
                  {filteredOrders.map(order => (
                    <li
                      key={order.id}
                      className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                    >
                      <h3 className="text-lg font-semibold text-white-700">{order.service}</h3>
                      <p className="text-sm text-white-500">Date: {order.date}</p>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        )}
    </div>
    
    </div>
  )
}

export default MechanicDashboard;
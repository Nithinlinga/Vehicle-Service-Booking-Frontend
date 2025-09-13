import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from './pagesmec/PageWrapper';

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
      title: "Upcoming Orders",
      value: "2",
      color: "text-cyan-400 border-cyan-400",
      status: "upcoming",
    },
    {
      title: "Completed Orders",
      value: "2",
      color: "text-green-400 border-green-400",
      status: "completed",
    },
    {
      title: "Cancelled Orders",
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

  const filteredOrders = selectedStatus
    ? allOrders.filter(order => order.status === selectedStatus)
    : [];

  return (
    <PageWrapper>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(({ title, value, color, status }) => (
          <div
            key={title}
            onClick={() =>
              status === "earnings"
                ? navigate("/earnings")
                : setSelectedStatus(status)
            }
            className={`cursor-pointer rounded-xl p-6 bg-white border-2 ${color} shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform duration-300`}
          >
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <p className={`mt-3 text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filtered Orders Section */}
      {selectedStatus && (
        <div className="mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize">
            {selectedStatus} Services
          </h2>
          {filteredOrders.length === 0 ? (
            <p className="text-gray-500">No {selectedStatus} services found.</p>
          ) : (
            <ul className="space-y-4">
              {filteredOrders.map(order => (
                <li
                  key={order.id}
                  className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-semibold text-gray-700">{order.service}</h3>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </PageWrapper>
  );
}

export default MechanicDashboard



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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {Home,User,Wrench,IndianRupee,LogOut} from "lucide-react";
import {NavLink} from "react-router-dom";

const earningsHistory = [
  {
    id: 1,
    service: "Engine Repair",
    date: "2025-08-21",
    amount: "₹ 1,200",
    customer: "Rahul Verma",
  },
  {
    id: 2,
    service: "Brake & Suspension",
    date: "2025-08-18",
    amount: "₹ 850",
    customer: "Sneha Kapoor",
  },
  {
    id: 3,
    service: "Car AC Service",
    date: "2025-08-15",
    amount: "₹ 600",
    customer: "Amit Sharma",
  },
  {
    id: 4,
    service: "Electrical Diagnostics",
    date: "2025-08-10",
    amount: "₹ 950",
    customer: "Priya Nair",
  },
];

const Earnings=()=> {
   const links = [
    { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "/services", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    { to: "/earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen">
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
        <div className="mx-auto w-[800px] h-[200px] mt-12">
            <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold text-white-700 mb-6">Earnings History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full  rounded-xl shadow-sm">
          <thead className=" text-cyan-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {earningsHistory.map(({ id, service, date, amount, customer }) => (
              <tr key={id} className=" dark:hover:bg-cyan-900 hover:bg-cyan-100 transition ">
                <td className="px-6 py-4 text-sm text-white-700">{date}</td>
                <td className="px-6 py-4 text-sm text-white-700">{service}</td>
                <td className="px-6 py-4 text-sm text-white-700">{customer}</td>
                <td className="px-6 py-4 text-sm font-bold text-cyan-600 ">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>);
}

export default Earnings;
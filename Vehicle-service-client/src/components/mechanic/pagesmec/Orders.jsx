import React from "react";
const allOrders = [
  { id: 1, service: "Engine Repair", status: "completed", date: "2025-08-21" },
  { id: 2, service: "Brake & Suspension", status: "upcoming", date: "2025-09-10" },
  { id: 3, service: "Car AC Service", status: "cancelled", date: "2025-08-15" },
  { id: 4, service: "Electrical Diagnostics", status: "completed", date: "2025-08-10" },
  { id: 5, service: "Oil Change", status: "upcoming", date: "2025-09-12" },
];

const Orders=()=>{
    const { status } = useParams();
    const filteredOrders = allOrders.filter(order => order.status === status);
    return(<div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">{status} Orders</h1>
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No {status} orders found.</p>
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
    </div>);
}
export default Orders
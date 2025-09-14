import React from "react";
import { useNavigate } from "react-router-dom";

const ManageUsers = () => {
  const navigate = useNavigate();

  // Dummy static data
  const users = [
    { userId: 1, first_name: "John", last_name: "Doe", email: "john.doe@example.com", phone: "1234567890", status: 1 },
    { userId: 2, first_name: "Jane", last_name: "Smith", email: "jane.smith@example.com", phone: "9876543210", status: 0 },
    { userId: 3, first_name: "Michael", last_name: "Brown", email: "michael.brown@example.com", phone: "5551234567", status: 1 },
    { userId: 4, first_name: "Emily", last_name: "Johnson", email: "emily.johnson@example.com", phone: "5559876543", status: 1 },
    { userId: 5, first_name: "David", last_name: "Wilson", email: "david.wilson@example.com", phone: "5556789012", status: 0 },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">Users List</h2>

      {/* Responsive grid: 1 col on small, 2 on medium, 3 on large */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((u, i) => (
          <div
            key={u.userId}
            className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">
                {i + 1}. {u.first_name} {u.last_name}
              </h3>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  u.status === 1
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {u.status === 1 ? "Active" : "Inactive"}
              </span>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              📧 {u.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              📞 {u.phone}
            </p>

            <div className="text-right">
              <button
                onClick={() => navigate(`admin/manage-users/${u.userId}`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;

import React from "react";
import { useLocation } from "react-router-dom";

const mechanics = [
  "Rahul Sharma",
  "Amit Verma",
  "Priya Singh",
  "Suresh Kumar",
  "Neha Patel",
  "Vikram Joshi",
  "Anjali Mehra",
  "Rohit Gupta",
];

const getRandomMechanic = () =>
  mechanics[Math.floor(Math.random() * mechanics.length)];

const Invoice = () => {
  const location = useLocation();
  let appointments = [];

  // If navigated with state, show only that appointment
  if (location.state && location.state.appointment) {
    appointments = [location.state.appointment];
  } else {
    // Otherwise, show all from localStorage
    try {
      const data = localStorage.getItem("appointments");
      appointments = data ? JSON.parse(data) : [];
    } catch {
      appointments = [];
    }
  }

  if (!appointments.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-300 mb-4">
            No Appointments Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please book an appointment to generate an invoice.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-10">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-8 text-center">
          Service Appointment Invoice
        </h2>
        {appointments.map((appt, idx) => (
          <div
            key={appt.id || idx}
            className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
              <div>
                <span className="font-extrabold text-gray-700 dark:text-gray-200">
                  Customer Name:
                </span>{" "}
                <span className="text-teal-800 dark:text-teal-300">
                  {appt.name}
                </span>
              </div>
              <div>
                <span className="font-extrabold text-gray-700 dark:text-gray-200">
                  Mechanic:
                </span>{" "}
                <span className="text-teal-700 dark:text-teal-300 mr-41">
                  {getRandomMechanic()}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    Vehicle:
                  </span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {appt.vehicle}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    Date:
                  </span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {appt.date}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    Time:
                  </span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {appt.time}
                  </span>
                </div>
              </div>
              <div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    Service:
                  </span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {appt.service}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    Notes:
                  </span>{" "}
                  <span className="text-gray-800 dark:text-gray-100">
                    {appt.notes || "-"}
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-200">
                    Status:
                  </span>{" "}
                  <span className="text-gray-800 dark:text-gray-100 capitalize">
                    {appt.status || "upcoming"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center mt-8">
          <button
            onClick={() => window.print()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl shadow transition text-lg"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
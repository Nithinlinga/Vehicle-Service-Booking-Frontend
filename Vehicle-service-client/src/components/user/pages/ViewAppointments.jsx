import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAppointment } from "../../../store/appointmentSlice";

const ViewAppointments = () => {
  const appointments = useSelector((state) => state.appointments);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];
  const mappedAppointments = appointments.map(a => {
    if (a.date < today) {
      return { ...a, status: "completed" };
    }
    return a;
  });

  const upcoming = mappedAppointments.filter(a => a.date >= today && a.status === "upcoming");
  const previous = mappedAppointments.filter(a => a.status === "completed");

  const handleDelete = (id) => {
    dispatch(deleteAppointment(id));
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-10">
      <div className="w-full m-2 max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-8 text-center">
          Your Appointments
        </h2>

        {/* Upcoming Appointments */}
        <div className="mb-10">
          <h3 className="text-xl font-bold text-teal-700 dark:text-teal-300 mb-4">
            Upcoming Appointments
          </h3>
          {upcoming.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-300 mb-6">No upcoming appointments.</div>
          ) : (
            <div className="space-y-4">
              {upcoming.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/30 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-bold text-lg text-teal-800 dark:text-teal-200">{a.vehicle}</div>
                    <div className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold">Service:</span> {a.service}
                    </div>
                    <div className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold">Date:</span> {a.date} &nbsp;
                      <span className="font-semibold">Time:</span> {a.time}
                    </div>
                    {a.notes && (
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Notes:</span> {a.notes}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-col gap-2">
                    <span className="inline-block px-4 py-1 rounded-full bg-teal-600 text-white font-semibold text-sm mb-2">
                      Upcoming
                    </span>
                    <button
                      onClick={() => navigate("/user/invoice", { state: { appointment: a } })}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-full shadow"
                    >
                      Invoice
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-full shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Previous Appointments */}
        <div>
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
            Previous Appointments
          </h3>
          {previous.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-300">No previous appointments.</div>
          ) : (
            <div className="space-y-4">
              {previous.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border-l-4 border-gray-400 bg-gray-50 dark:bg-gray-900/30 p-5 shadow flex flex-col md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <div className="font-bold text-lg text-gray-800 dark:text-gray-100">{a.vehicle}</div>
                    <div className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold">Service:</span> {a.service}
                    </div>
                    <div className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold">Date:</span> {a.date} &nbsp;
                      <span className="font-semibold">Time:</span> {a.time}
                    </div>
                    {a.notes && (
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">Notes:</span> {a.notes}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 md:mt-0 flex flex-col gap-2">
                    <span className="inline-block px-4 py-1 rounded-full bg-gray-400 text-white font-semibold text-sm mb-2">
                      Completed
                    </span>
                    <button
                      onClick={() => navigate("/user/invoice", { state: { appointment: a } })}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded shadow"
                    >
                      Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAppointments;

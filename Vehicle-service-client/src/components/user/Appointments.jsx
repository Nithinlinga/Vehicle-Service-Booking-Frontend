import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAppointment } from "../../store/appointmentSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const vehicles = [
  "Audi A1 S-Line",
  "VW Golf 6",
  "Toyota Camry 2017",
  "Hero Splendor Plus",
  "JAWA 42",
  "Triumph Street Twin 2022",
];

const services = [
  "General Service",
  "Oil Change",
  "Engine Check",
  "Tire Replacement",
  "AC Repair",
  "Other",
];

const Appointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    vehicle: vehicles[0],
    date: "",
    time: "",
    service: services[0],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    if (form.date < today) {
      toast.error("Please select a date afterwards");
      return;
    }
    dispatch(addAppointment(form));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-10">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-6 text-center">
          Book a Service Appointment
        </h2>
        {submitted ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-center text-green-600 font-bold text-xl">
              Appointment Booked Successfully!
            </div>
            <button
              onClick={() => navigate("/viewappointment")}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl shadow transition text-lg"
            >
              View Appointments
            </button>
            <button
              onClick={() => navigate("/invoice", { state: { appointment: form } })}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl shadow transition text-lg"
            >
              Generate Invoice
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Select Vehicle
              </label>
              <select
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                {vehicles.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  value={form.time}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Service Type
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                {services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                placeholder="Any specific requests?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow transition text-lg"
            >
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Appointments;
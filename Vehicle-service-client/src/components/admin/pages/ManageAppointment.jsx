import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function ManageAppointments() {
  const [showVerified, setShowVerified] = useState(false);
  const [showUnverified, setShowUnverified] = useState(false);

  const mechanics = [
    { bookingId: 1, vehicleName: "Audi A3", name: "Arun Kumar", serviceType: "Engine Repair", date: "16-09-25", timeslot: "11:00 AM", isverified: "yes" },
    { bookingId: 2, vehicleName: "BMW C1", name: "Ravi Shankar", serviceType: "Brake Specialist", date: "16-09-25", timeslot: "11:00 AM", isverified: "no" },
    { bookingId: 3, vehicleName: "Maruti Suzuki K10", name: "Suresh Babu", serviceType: "Electrical Systems", date: "16-09-25", timeslot: "11:00 AM", isverified: "yes" },
    { bookingId: 4, vehicleName: "Hyundai Creta", name: "Manoj Kumar", serviceType: "Transmission", date: "16-09-25", timeslot: "11:00 AM", isverified: "no" },
  ];

  const verified = mechanics.filter(m => m.isverified === "yes");
  const unverified = mechanics.filter(m => m.isverified === "no");

  return (
    <div className="w-full gap-4">
      {/* Unverified Mechanics */}
      <div className="flex-1">
        <button
          onClick={() => setShowUnverified(!showUnverified)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-500"
        >
          <span>Pending Appointments ({unverified.length})</span>
          {showUnverified ? (
            <IoIosArrowUp className="transition-transform duration-700 ease-in-out" />
          ) : (
            <IoIosArrowDown className="transition-transform duration-700 ease-in-out" />
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showUnverified ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 rounded p-3 space-y-3">
            {unverified.map(m => (
              <div key={m.bookingId} className="p-3 rounded shadow-sm border">
                <p className="font-bold text-amber-700">{m.name}</p>
                <p>Service Type: {m.serviceType}</p>
                <p>Date: {m.date}</p>
                <p>Time: {m.timeslot}</p>
                <p>Vehicle Name: {m.vehicleName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Mechanics */}
      <div className="flex-1">
        <button
          onClick={() => setShowVerified(!showVerified)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 transition-colors duration-500"
        >
          <span> All Appointments ({verified.length})</span>
          {showVerified ? (
            <IoIosArrowUp className="transition-transform duration-700 ease-in-out" />
          ) : (
            <IoIosArrowDown className="transition-transform duration-700 ease-in-out" />
          )}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${
            showVerified ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-2 rounded p-3 space-y-3">
            {verified.map(m => (
              <div key={m.bookingId} className="p-3 rounded shadow-sm border">
                <p className="font-bold text-teal-700">{m.name}</p>
                <p>Service Type: {m.serviceType}</p>
                <p>Date: {m.date}</p>
                <p>Time: {m.timeslot}</p>
                <p>Vehicle Name: {m.vehicleName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

export default function ManageMechanics() {
  const [showVerified, setShowVerified] = useState(false);
  const [showUnverified, setShowUnverified] = useState(false);

  const mechanics = [
    { mechanicId: 1, servicecenterId: "SC101", name: "Arun Kumar", expertise: "Engine Repair", availability: "Mon-Fri", rating: 4.5, isverified: "yes" },
    { mechanicId: 2, servicecenterId: "SC102", name: "Ravi Shankar", expertise: "Brake Specialist", availability: "Mon-Sat", rating: 4.2, isverified: "no" },
    { mechanicId: 3, servicecenterId: "SC103", name: "Suresh Babu", expertise: "Electrical Systems", availability: "Tue-Sun", rating: 4.8, isverified: "yes" },
    { mechanicId: 4, servicecenterId: "SC104", name: "Manoj Kumar", expertise: "Transmission", availability: "Mon-Fri", rating: 3.9, isverified: "no" },
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
          <span>Unverified Mechanics ({unverified.length})</span>
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
              <div key={m.mechanicId} className="p-3 rounded shadow-sm border">
                <p className="font-bold text-amber-700">{m.name}</p>
                <p>Expertise: {m.expertise}</p>
                <p>Availability: {m.availability}</p>
                <p>Rating: {m.rating}</p>
                <p>Service Center ID: {m.servicecenterId}</p>
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
          <span>Verified Mechanics ({verified.length})</span>
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
              <div key={m.mechanicId} className="p-3 rounded shadow-sm border">
                <p className="font-bold text-teal-700">{m.name}</p>
                <p>Expertise: {m.expertise}</p>
                <p>Availability: {m.availability}</p>
                <p>Rating: {m.rating}</p>
                <p>Service Center ID: {m.servicecenterId}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

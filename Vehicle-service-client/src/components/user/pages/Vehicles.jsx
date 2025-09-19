import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Vehicles = () => {
  const navigate = useNavigate();
  const allVehicles = useSelector((state) => state.vehicles);

  const [vehicleType, setVehicleType] = useState("car");
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const filtered = allVehicles.filter((v) => v.vehicleType === vehicleType);
    setFilteredVehicles(filtered);
    setSelected(filtered[0]);
  }, [vehicleType, allVehicles]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-teal-100 dark:from-slate-900 dark:via-slate-800 dark:to-teal-900 py-10 px-2">
      {/* Vehicle Type Selector */}
      <div className="flex justify-center mb-8">
        <div className="relative w-56 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center shadow-inner">
          <span
            className={`absolute top-1 left-1 w-26 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500 dark:from-cyan-700 dark:to-teal-700 shadow-md transition-all duration-300 ${
              vehicleType === "car" ? "translate-x-0" : "translate-x-28"
            }`}
            style={{ width: "104px" }}
          ></span>
          <button
            className={`relative z-10 w-1/2 h-full rounded-full font-bold text-lg transition-colors duration-300 ${
              vehicleType === "car"
                ? "text-white"
                : "text-slate-700 dark:text-slate-200"
            }`}
            onClick={() => setVehicleType("car")}
          >
            Cars
          </button>
          <button
            className={`relative z-10 w-1/2 h-full rounded-full font-bold text-lg transition-colors duration-300 ${
              vehicleType === "bike"
                ? "text-white"
                : "text-slate-700 dark:text-slate-200"
            }`}
            onClick={() => setVehicleType("bike")}
          >
            Bikes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        {/* Vehicle List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          {filteredVehicles.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-300">
              No {vehicleType}s added yet.
            </div>
          ) : (
            filteredVehicles.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelected(v)}
                className={`cursor-pointer rounded-xl border-2 transition-all duration-200 shadow-sm hover:shadow-lg p-4 flex items-center gap-4 ${
                  selected && selected.id === v.id
                    ? "border-teal-600 bg-white dark:bg-slate-800"
                    : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                }`}
              >
                <img
                  src={v.image || "https://www.pngmart.com/files/22/Car-PNG-Image.png"} // fallback image
                  alt={v.model}
                  className="w-16 h-16 object-contain rounded-lg bg-slate-100 dark:bg-slate-700"
                />
                <span className="font-bold text-lg text-slate-800 dark:text-slate-100">
                  {v.brand.toUpperCase()} {v.model}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Vehicle Details */}
        <div className="flex-1 flex items-center justify-center">
          {selected && (
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 flex flex-col items-center">
              <img
                src={selected.image || "https://www.pngmart.com/files/22/Car-PNG-Image.png"}
                alt={selected.model}
                className="w-48 h-48 object-contain mb-4 rounded-xl bg-slate-100 dark:bg-slate-700"
              />
              <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-2">
                {selected.brand.toUpperCase()} {selected.model}
              </div>
              <table className="w-full mb-4 border-separate border-spacing-y-1 ml-40">
                <tbody>
                  <tr>
                    <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200 w-40">Year</td>
                    <td className="py-1 text-slate-900 dark:text-slate-100">{selected.year}</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">Regstaration Number</td>
                    <td className="py-1 text-slate-900 dark:text-slate-100">{selected.regNumber}</td>
                  </tr>
                  <tr>
                    <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">Type</td>
                    <td className="py-1 text-slate-900 dark:text-slate-100">{selected.vehicleType}</td>
                  </tr>

                  {/* Conditional Rows based on vehicle type */}
                  {selected.vehicleType === 'car' ? (
                    <>
                      <tr>
                        <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">Transmission</td>
                        <td className="py-1 text-slate-900 dark:text-slate-100">{selected.transmission}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">Fuel</td>
                        <td className="py-1 text-slate-900 dark:text-slate-100">{selected.fuel}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">Doors</td>
                        <td className="py-1 text-slate-900 dark:text-slate-100">{selected.doors}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">AC</td>
                        <td className="py-1 text-slate-900 dark:text-slate-100">{selected.ac}</td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">Engine</td>
                        <td className="py-1 text-slate-900 dark:text-slate-100">{selected.engine}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">Fuel</td>
                        <td className="py-1 text-slate-900 dark:text-slate-100">{selected.fuel}</td>
                      </tr>
                      <tr>
                        <td className="py-1 pr-4 font-bold text-left text-slate-700 dark:text-slate-200">ABS</td>
                        <td className="py-1 text-slate-900 dark:text-slate-100">{selected.abs}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              <button
                onClick={() => navigate("/user/appointment", { state: { vehicle: selected } })}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow transition"
              >
                Book Appointment Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vehicles;
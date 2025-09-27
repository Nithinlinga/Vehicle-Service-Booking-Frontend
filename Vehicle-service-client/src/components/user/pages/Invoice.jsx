import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import MechanicServices from "../../services/MechanicServices";
import VehicleServices from "../../services/VehiclesServices";
import ServiceTypeServices from "../../services/ServiceTypeServices";
import {useSelector} from "react-redux";

const Invoice = () => {
  const {isAuthenticated , user} = useSelector((state) => state.auth);
  const location = useLocation();
  const { id } = useParams();

  const [appointments, setAppointments] = useState([]);
  const [mechanics, setMechanics] = useState([]);
  const [vehicles, setVehicles] = useState({});
  const [services, setServices] = useState({});

  useEffect(() => {
    if (location.state && location.state.appointment) {
      setAppointments([location.state.appointment]);
    } else {
      try {
        const data = localStorage.getItem("appointments");
        setAppointments(data ? JSON.parse(data) : []);
      } catch {
        setAppointments([]);
      }
    }
  }, [location.state]);


  useEffect(() => {
    const fetchMechanics = async () => {
      try {
        const response = await MechanicServices.getMechanics();
        setMechanics(response.data);
      } catch (error) {
        console.error("Failed to fetch mechanics:", error);
      }
    };
    fetchMechanics();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      const vehicleMap = {};
      const serviceMap = {};

      for (const appt of appointments) {
        try {
          if (appt.vehicleId && !vehicleMap[appt.vehicleId]) {
            const vehicleRes = await VehicleServices.getVehiclesByUserId(appt.vehicleId);
            vehicleMap[appt.vehicleId] = vehicleRes.data;
          }

          if (appt.serviceId && !serviceMap[appt.serviceId]) {
            const serviceRes = await ServiceTypeServices.getAllServiceTypesByServiceCenter(appt.serviceId);
            serviceMap[appt.serviceId] = serviceRes.data;
          }
        } catch (error) {
          console.error("Error fetching vehicle or service:", error);
        }
      }

      setVehicles(vehicleMap);
      setServices(serviceMap);
    };

    if (appointments.length > 0) {
      fetchDetails();
    }
  }, [appointments]);

  const getRandomMechanic = () => {
    if (mechanics.length === 0) return "N/A";
    const randomIndex = Math.floor(Math.random() * mechanics.length);
    return mechanics[randomIndex].name;
  };

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
                  {user.username}
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
                    {vehicles[appt.vehicleId]?.name || "Loading..."}
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
                    {appt.name || "Loading..."}
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

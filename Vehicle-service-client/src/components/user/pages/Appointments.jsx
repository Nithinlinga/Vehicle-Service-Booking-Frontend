import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAppointment } from "../../../store/appointmentSlice";
import toast from "react-hot-toast";
import { useNavigate, useLocation, useParams } from "react-router-dom"; // Import useLocation
import { useSelector } from "react-redux";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import ServiceTypeServices from "../../services/ServiceTypeServices";


const Appointments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const allVehicles = useSelector((state) => state.vehicles);
  const [allServiceCenters, setAllServiceCenters] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  console.log(typeof id);
  useEffect(() => {


    async function fetchData() {
      try {
        const resp = await ServiceTypeServices.getAllServiceTypesByServiceCenter(id);
        setServiceType(resp.data);
        const serviceCenters = await ServiceCenterServices.getAllServiceCenters();
        setAllServiceCenters(serviceCenters.data);
      } catch (error) {
        console.error("Error fetching service centres:", error);
      }
    }
    fetchData();
  }, [id]);
  // Get the vehicle object passed from the Vehicles page
  const vehicleFromState = location.state?.vehicle;

  // Dynamically create a list of vehicles for the dropdown
  // from the Redux store to ensure it's always up-to-date
  const vehicleOptions = allVehicles.map(
    (v) => `${v.make.toUpperCase()} ${v.model}`
  );

  // Add a default option if no vehicle is selected
  const defaultVehicleOption = "Select Vehicle";
  const vehiclesForDropdown = [defaultVehicleOption, ...vehicleOptions];


  const [form, setForm] = useState({
    name: "",
    vehicle: vehicleFromState ? `${vehicleFromState.make.toUpperCase()} ${vehicleFromState.model}` : defaultVehicleOption,
    date: "",
    time: "",
    serviceCenter: "",
    service: serviceType[0],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (vehicleFromState) {
      setForm((prevForm) => ({
        ...prevForm,
        vehicle: `${vehicleFromState.make.toUpperCase()} ${vehicleFromState.model}`,
      }));
    }
  }, [vehicleFromState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (allServiceCenters.length > 0) {
      const selected = allServiceCenters.find(sc => sc.servicecenterId === Number(id));
      if (selected) {
        setForm(prev => ({ ...prev, serviceCenter: selected.servicecenterId }));
      }
    }
  }, [allServiceCenters, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.vehicle === defaultVehicleOption) {
      toast.error("Please select a vehicle.");
      return;
    }
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
              onClick={() => navigate("/user/viewappointment")}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl shadow transition text-lg"
            >
              View Appointments
            </button>
            <button
              onClick={() => navigate("/user/invoice", { state: { appointment: form } })}
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
                className="w-full px-4 py-2 rounded border  border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                {vehiclesForDropdown.map((v) => (
                  <option key={v} value={v.vehicleId}>
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
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000) // tomorrow
                    .toISOString()
                    .split("T")[0]}
                  // max={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from today
                  //   .toISOString()
                  //   .split("T")[0]}
                  className="w-full date-input px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
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
                  className="w-full px-4 date-input  py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Service Center
              </label>
              <select
                name="serviceCenter"
                value={form.serviceCenter}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                {allServiceCenters.map((s) => (
                  <option key={s.servicecenterId} value={s.servicecenterId}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {/* Service Type */}
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Service Type
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                {serviceType.map((s) => (
                  <option key={s.serviceTypeId} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Price */}
              {form.service && (
                <div className="mt-4">
                  <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                    Price
                  </label>
                  <div className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    ₹{serviceType.find((s) => s.name === form.service)?.price}
                  </div>
                </div>
              )}
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
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
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
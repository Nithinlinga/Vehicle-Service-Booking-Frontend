import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import ServiceTypeServices from "../../services/ServiceTypeServices";
import BookingServices from "../../services/BookingServices";
import VehiclesServices from "../../services/VehiclesServices";

const Appointments = () => {
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const service_center = searchParams.get("service_center");
  const service_type = searchParams.get("service_type");
  const vehicleId = searchParams.get("vehicleId");

  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Initialize state for vehicles
  const [allVehicles, setAllVehicles] = useState([]);

  const [allServiceCenters, setAllServiceCenters] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    vehicle: "",
    vehicleId: vehicleId || "",
    date: "",
    userId: user.id,
    timeslot: "",
    serviceCenterId: service_center || "",
    service: "",
    notes: "",
  });

  // 👇 New useEffect to fetch vehicles
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const resp = await VehiclesServices.getVehiclesByUserId(user.id);
        setAllVehicles(resp.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast.error("Failed to load vehicles.");
      }
    };

    if (user && user.id) {
      fetchVehicles();
    }
  }, [user]); // Re-run when the user object changes

  const fetchServiceTypes = async (centerId) => {
    if (!centerId) return;
    try {
      const resp = await ServiceTypeServices.getAllServiceTypesByServiceCenter(
        centerId
      );
      setServiceTypes(resp.data);
      if (resp.data.length > 0) {
        const selected =
          resp.data.find((s) => String(s.serviceTypeId) === String(service_type)) ||
          resp.data[0];
        setForm((prev) => ({ ...prev, service: selected.name })); // Changed from s.name to s.description
      }
    } catch (error) {
      console.error("Error fetching service types:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const centers = await ServiceCenterServices.getAllServiceCenters();
        setAllServiceCenters(centers.data);

        let centerIdToFetch = service_center;

        if (!centerIdToFetch && centers.data.length > 0) {
          centerIdToFetch = String(centers.data[0].servicecenterId);
        }

        if (centerIdToFetch) {
          setForm((prev) => ({ ...prev, serviceCenterId: centerIdToFetch }));
          await fetchServiceTypes(centerIdToFetch);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, [service_center, service_type]);

  useEffect(() => {
    if (location.state?.vehicleId && allVehicles.length > 0) {
      const foundVehicle = allVehicles.find(
        (av) => String(av.vehicleId) === String(location.state.vehicleId)
      );
      if (foundVehicle) {
        setForm((prev) => ({
          ...prev,
          vehicle: `${foundVehicle.make.toUpperCase()} ${foundVehicle.model}`,
          vehicleId: foundVehicle.vehicleId, // Ensure vehicleId is also set
        }));
      }
    }
  }, [location.state?.vehicleId, allVehicles]);

  const handleServiceCenterChange = (e) => {
    const newCenterId = e.target.value;
    setForm((prev) => ({ ...prev, serviceCenterId: newCenterId, service: "" }));
    fetchServiceTypes(newCenterId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];
    if (form.date < today) {
      toast.error("Please select a date on or after today.");
      return;
    }
    if (!form.vehicleId) {
      toast.error("Please select a vehicle.");
      return;
    }
    try {
      const appointment = await BookingServices.addBooking(form);
      setSubmitted(true);
      toast.success("Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
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
            {/* <button
              onClick={() => navigate("/user/invoice", { state: { appointment: form } })}
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 rounded-xl shadow transition text-lg"
            >
              Generate Invoice
            </button> */}
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
                name="vehicleId"
                value={form.vehicleId}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedVehicle = allVehicles.find(
                    (v) => String(v.vehicleId) === selectedId
                  );
                  setForm((prev) => ({
                    ...prev,
                    vehicleId: selectedId,
                    vehicle: selectedVehicle
                      ? `${selectedVehicle.make.toUpperCase()} ${selectedVehicle.model}`
                      : "",
                  }));
                }}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="">Select Vehicle</option>
                {allVehicles?.map((v) => (
                  <option key={v.vehicleId} value={v.vehicleId}>
                    {v.make.toUpperCase()} {v.model}
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
                  min={new Date(Date.now() + 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]}
                  className="w-full date-input px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                  Time
                </label>
                <input
                  type="time"
                  name="timeslot"
                  required
                  value={form.timeslot}
                  onChange={handleChange}
                  className="w-full px-4 date-input py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Service Center
              </label>
              <select
                name="serviceCenterId"
                value={form.serviceCenterId}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={handleServiceCenterChange}
              >
                {allServiceCenters?.map((s) => (
                  <option key={s.servicecenterId} value={s.servicecenterId}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                Service Type
              </label>
              <select
                name="service"
                value={form.service}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
              >
                {serviceTypes?.map((s) => (
                  <option key={s.serviceTypeId} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
              {form.service && (
                <div className="mt-4">
                  <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                    Price
                  </label>
                  <div className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    ₹{serviceTypes.find((s) => s.description === form.service)?.price}
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
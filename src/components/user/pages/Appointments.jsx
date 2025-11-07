import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import ServiceTypeServices from "../../services/ServiceTypeServices";
import BookingServices from "../../services/BookingServices";
import UserServices from "../../services/UserServices";

const Appointments = () => {
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const service_center = searchParams.get("service_center");
  const service_type = searchParams.get("service_type");
  const vehicleId = Number(searchParams.get("vehicleId"));

  const navigate = useNavigate();
  const location = useLocation();

  const [allVehicles, setAllVehicles] = useState([]);

  const [allServiceCenters, setAllServiceCenters] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  const [form, setForm] = useState({
    vehicleId: vehicleId || "",
    bookingDate: "",
    customerId: user.id,
    timeslot: "",
    centerId: service_center || ""
  });

  useEffect(() => {
  const fetchVehicles = async () => {
    try {
      const resp = await UserServices.getAllVehicles();
      setAllVehicles(resp.data);
      localStorage.setItem("vehicles", JSON.stringify(resp.data));

      // If vehicleId is present in URL, pre-select it
      if (vehicleId) {
        const selectedVehicle = resp.data.find(v => v.vehicleId === vehicleId);
        if (selectedVehicle) {
          setForm((prev) => ({
            ...prev,
            vehicleId: selectedVehicle.vehicleId,
            vehicle: `${selectedVehicle.make.toUpperCase()} ${selectedVehicle.model}`,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching vehicles", error);
    }
  };
  fetchVehicles();
}, [vehicleId]);

  const fetchServiceTypes = async (centerId) => {
  const centerIdInt = Number(centerId);
  const typeIdInt = Number(service_type);

  if (!centerIdInt || isNaN(centerIdInt)) {
    console.warn("Invalid centerId:", centerId);
    return;
  }

  try {
    if (service_type && !isNaN(typeIdInt)) {
      // Fetch specific service type by ID
      const resp = await ServiceTypeServices.getServiceTypeById(centerIdInt, typeIdInt);
      setServiceTypes([resp.data]); // wrap in array for consistency
      setForm((prev) => ({
        ...prev,
        serviceTypeId: resp.data.serviceTypeId,
        serviceTypeName: resp.data.name,
        serviceTypePrice: resp.data.price,
      }));
    } else {
      // Fallback: fetch all service types
      const resp = await ServiceTypeServices.getAllServiceTypes(centerIdInt);
      setServiceTypes(resp.data);
    }
  } catch (error) {
    console.error("Error fetching service types:", error);
    toast.error("Failed to load service types.");
  }
};


  useEffect(() => {
const fetchInitialData = async () => {
try {
const centers = await ServiceCenterServices.getAllServiceCenters();
setAllServiceCenters(centers.data);

let centerIdToFetch = service_center;

if (!centerIdToFetch || centerIdToFetch === "undefined") {
  if (centers.data.length > 0) {
    centerIdToFetch = String(centers.data[0].servicecenterId);
  } else {
    toast.error("No service center available.");
    return;
  }
}
if (centerIdToFetch) {
setForm((prev) => ({ ...prev,centerId: centerIdToFetch }));
await fetchServiceTypes(centerIdToFetch);
}
} catch (error) {
console.error("Error fetching initial data:", error);
toast.error("Failed to load service centers.");
}
};

fetchInitialData();
}, [service_center]);

  useEffect(() => {
if (location.state?.vehicleId && allVehicles.length > 0) {
const foundVehicle = allVehicles.find(
(av) => String(av.vehicleId) === String(location.state.vehicleId)
);
if (foundVehicle) {
setForm((prev) => ({
...prev,
vehicle: `${foundVehicle.make.toUpperCase()} ${foundVehicle.model}`,
vehicleId: foundVehicle.vehicleId,
}));
}
}
}, [location.state?.vehicleId, allVehicles]);

  const handleServiceCenterChange = (e) => {
const newCenterId = e.target.value;
setForm((prev) => ({ ...prev,centerId: newCenterId, service: "" }));
fetchServiceTypes(newCenterId);
};

const handleChange = (e) => {
const { name, value } = e.target;
setForm((prev) => ({ ...prev, [name]: value }));
};
 const handleSubmit = async (e) => {
  e.preventDefault();

  const today = new Date().toISOString().split("T")[0];
  if (form.bookingDate < today) {
    toast.error("Please select a date on or after today.");
    return;
  }

  if (!form.vehicleId) {
    toast.error("Please select a vehicle.");
    return;
  }

  try {

    // Combine date and time into ISO format
    const fullDateTime = `${form.bookingDate}T${form.timeslot}`;

    const payload = {
      ...form,
      bookingDate: fullDateTime
    };

    const appointment = await BookingServices.addBooking(payload);

    if (appointment) {
      setSubmitted(true);
      toast.success("Appointment booked successfully!");
    }
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
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            
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
                    (v) => (v.vehicleId) === selectedId
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
                  name="bookingDate"
                  required
                  value={form.bookingDate}
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
                value={form.centerId}
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
                name="serviceTypeId"
                value={form.serviceTypeId}
                className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedService = serviceTypes.find(s => String(s.serviceTypeId) === selectedId);
                  setForm((prev) => ({
                    ...prev,
                    serviceTypeId: selectedId,
                    serviceTypeName: selectedService?.name || "",
                    serviceTypePrice: selectedService?.price || 0
                  }));
                }}
              >
                <option value="">Select Service Type</option>
                {serviceTypes?.map((s) =>
                  s.status === "ACTIVE" ? (
                    <option key={s.serviceTypeId} value={s.serviceTypeId}>
                      {s.name}
                    </option>
                  ) : null
                )}
              </select>
               {form.serviceTypeId && (
                <div className="mt-4">
                  <label className="block font-semibold mb-1 text-teal-700 dark:text-teal-300">
                    Price
                  </label>
                  <div className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    ₹{form.serviceTypePrice}
                  </div>
                </div>
              )}
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
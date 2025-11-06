import { useEffect, useState } from "react";
import BookingServices from "../../services/BookingServices";
import MechanicServices from "../../services/MechanicServices";
import { useSelector } from "react-redux";
import UserServices from "../../services/UserServices";

const Servicelog = () => {
  const { user } = useSelector((state) => state.auth);
  const [serviceLog, setServiceLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customer , setCustomer] = useState("");

  useEffect(() => {
  const fetchServiceLog = async () => {
    try {
      const mechanicResp = await MechanicServices.getMechanic(user.id);
      const bookingResp = await BookingServices.getBookingByCenterId(mechanicResp.data.centerId);
      const customerResp = await UserServices.getAllUsers();

      const enrichedBookings = bookingResp.data.map(booking => {
        const matchedCustomer = customerResp.data.find(cust => cust.id === booking.customerId);
        return {
          ...booking,
          customer: matchedCustomer || {}, // fallback to empty object
        };
      });

      setServiceLog(enrichedBookings);
    } catch (error) {
      console.error("Error fetching service log:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchServiceLog();
}, []);

  
  return (
    <div className="flex h-screen">
      <div className="mx-auto w-[800px] h-[200px] mt-12">
        <h1 className="text-2xl font-bold text-black-800 dark:text-white-100 mb-6">Service Log</h1>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <table className="min-w-full rounded-xl shadow-sm">
              <thead className="text-cyan-700 dark:text-cyan-300">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Car</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceLog.map(({ id, serviceTypeName, bookingDate, serviceTypePrice, customer, vehicleName, status }) => {
                  const formattedDate = bookingDate?.split("T")[0];
                  return (
                  <tr key={id} className="hover:bg-cyan-100 dark:hover:bg-cyan-900 transition">
                    <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{formattedDate}</td>
                    <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">
                      {customer?.firstName || "Unknown"}  {customer?.lastName || ""}
                    </td>

                    <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{serviceTypeName}</td>
                    <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{vehicleName}</td>
                    <td className="px-6 py-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">{serviceTypePrice}</td>
                    <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{status}</td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicelog;

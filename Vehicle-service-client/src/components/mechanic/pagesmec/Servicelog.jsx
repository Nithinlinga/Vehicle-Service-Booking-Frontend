const serviceLog = [
  { id: 1, service: "Engine Repair", customer: "Rahul Verma", date: "2025-08-21", amount: "₹ 1,200", car: "Honda City", status: "Completed" },
  { id: 2, service: "Brake & Suspension", customer: "Sneha Kapoor", date: "2025-08-18", amount: "₹ 850", car: "Maruti Swift", status: "Completed" },
  { id: 3, service: "Car AC Service", customer: "Amit Sharma", date: "2025-08-15", amount: "₹ 600", car: "Hyundai i20", status: "Completed" },
  { id: 4, service: "Oil Change", customer: "Priya Nair", date: "2025-08-10", amount: "₹ 950", car: "Toyota Innova", status: "Completed" },
];

const Servicelog=()=> {
  return (
    <div className="flex h-screen">
    <div className="mx-auto w-[800px] h-[200px] mt-12" >
      <h1 className="text-2xl font-bold text-black-800 dark:text-white-100 mb-6">Service Log</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full  rounded-xl shadow-sm">
          <thead className=" text-cyan-700 dark:text-cyan-300">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Car</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Amount Paid</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {serviceLog.map(({ id, service, date, amount, customer, car, status }) => (
              <tr key={id} className="hover:bg-cyan-100 dark:hover:bg-cyan-900 transition">
                <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{date}</td>
                <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{customer}</td>
                <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{service}</td>
                <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{car}</td>
                <td className="px-6 py-4 text-sm font-bold text-cyan-600 dark:text-cyan-400">{amount}</td>
                <td className="px-6 py-4 text-sm text-black-700 dark:text-white-300">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
}
export default Servicelog
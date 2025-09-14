import {User,Wrench,IndianRupee} from "lucide-react";

const earningsHistory = [
  {
    id: 1,
    service: "Engine Repair",
    date: "2025-08-21",
    amount: "₹ 1,200",
    customer: "Rahul Verma",
  },
  {
    id: 2,
    service: "Brake & Suspension",
    date: "2025-08-18",
    amount: "₹ 850",
    customer: "Sneha Kapoor",
  },
  {
    id: 3,
    service: "Car AC Service",
    date: "2025-08-15",
    amount: "₹ 600",
    customer: "Amit Sharma",
  },
  {
    id: 4,
    service: "Electrical Diagnostics",
    date: "2025-08-10",
    amount: "₹ 950",
    customer: "Priya Nair",
  },
];

const Earnings=()=> {
  return (
    <div className="flex h-screen">
        <div className="mx-auto w-[800px] h-[200px] mt-12">
            <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-bold text-white-700 mb-6">Earnings History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full  rounded-xl shadow-sm">
          <thead className=" text-cyan-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {earningsHistory.map(({ id, service, date, amount, customer }) => (
              <tr key={id} className=" dark:hover:bg-cyan-900 hover:bg-cyan-100 transition ">
                <td className="px-6 py-4 text-sm text-white-700">{date}</td>
                <td className="px-6 py-4 text-sm text-white-700">{service}</td>
                <td className="px-6 py-4 text-sm text-white-700">{customer}</td>
                <td className="px-6 py-4 text-sm font-bold text-cyan-600 ">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </div>);
}

export default Earnings;
import PageWrapper from "./PageWrapper";

const Earnings=()=>{
    return(
        <PageWrapper>
            <div className="p-6 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Earnings History</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
          <thead className="bg-cyan-50 text-cyan-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            {earningsHistory.map(({ id, service, date, amount, customer }) => (
              <tr key={id} className="border-t border-gray-100 hover:bg-cyan-50 transition">
                <td className="px-6 py-4 text-sm text-gray-700">{date}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{service}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{customer}</td>
                <td className="px-6 py-4 text-sm font-bold text-cyan-600 ">{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </PageWrapper>
    );
}

export default Earnings;
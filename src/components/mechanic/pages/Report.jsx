import React from "react";
import { Line, Bar } from "react-chartjs-2";

const Report = () => {
  // Sample Data
  const trendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Completed Services",
        data: [50, 65, 80, 70, 90, 100],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
      },
    ],
  };

  const revenueCostData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue",
        data: [120000, 150000, 180000, 200000],
        backgroundColor: "#10b981",
      },
      {
        label: "Cost",
        data: [80000, 95000, 110000, 130000],
        backgroundColor: "#ef4444",
      },
    ],
  };

  const topServices = [
    { name: "Oil Change", count: 120 },
    { name: "Brake Repair", count: 95 },
    { name: "Engine Service", count: 80 },
    { name: "Wheel Alignment", count: 60 },
  ];

  const technicians = [
    { name: "Technician A", efficiency: 85 },
    { name: "Technician B", efficiency: 78 },
    { name: "Technician C", efficiency: 92 },
  ];

  const activities = [
    "Service completed for Vehicle #123",
    "Brake parts replaced for Vehicle #98",
    "Engine diagnostics performed for Vehicle #76",
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-slate-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-slate-800 dark:text-white">
        Service Report
      </h1>

      {/* Trend Analysis */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
        <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-white">
          Service Trend (Last 6 Months)
        </h4>
        <Line data={trendData} />
      </div>

      {/* Revenue vs Cost */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
        <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-white">
          Revenue vs Cost
        </h4>
        <Bar data={revenueCostData} options={{ indexAxis: "y" }} />
      </div>

      {/* Top Services Table */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
        <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-white">
          Top Services
        </h4>
        <table className="w-full text-left text-slate-700 dark:text-white">
          <thead>
            <tr>
              <th className="pb-2">Service</th>
              <th className="pb-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {topServices.map((service) => (
              <tr key={service.name}>
                <td className="py-2">{service.name}</td>
                <td className="py-2">{service.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Technician Performance */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md mb-8">
        <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-white">
          Technician Efficiency
        </h4>
        {technicians.map((tech) => (
          <div key={tech.name} className="mb-4">
            <p>{tech.name}</p>
            <div className="w-full bg-gray-300 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${tech.efficiency}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">{tech.efficiency}%</p>
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md">
        <h4 className="text-lg font-semibold mb-4 text-slate-700 dark:text-white">
          Recent Activities
        </h4>
        <ul className="list-disc pl-5">
          {activities.map((activity, index) => (
            <li key={index} className="mb-2">
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Report;
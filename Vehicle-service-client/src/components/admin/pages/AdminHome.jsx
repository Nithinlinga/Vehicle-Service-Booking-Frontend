import React from "react";
import image1 from '../../../assets/users/1.png';
import image2 from '../../../assets/users/2.jpg';
import image3 from '../../../assets/users/3.webp';
import image4 from '../../../assets/users/4.jpg';
import CountUp from 'react-countup';
const AdminHome = () => {
  return (
    <div>
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <DashboardCard image={image2} label="Total Vehicles" end={15} />
                  <DashboardCard image={image1} label="Total Service Centers" end={20} duration={5} />
                  <DashboardCard image={image3} label="Total Appointments" end={50} />
                  <DashboardCard image={image4} label="Total Paid" end={23000} prefix="$" />
                </div>
              </div>
      {/* You can move your DashboardCard components here */}
    </div>
  );
};

export default AdminHome;

const DashboardCard = ({ image, label, end, duration = 2.5, prefix = '' }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 dark:bg-gray-900">
    <div className="flex flex-col items-center">
      <img src={image} alt={label} className="w-18 h-16 mb-4 dark:invert" />
      <p className="text-xl font-semibold text-gray-700 dark:text-white">{label}</p>
      <CountUp start={0} end={end} duration={duration} prefix={prefix} className="text-4xl font-bold text-green-600 mt-2" />
    </div>
  </div>
);

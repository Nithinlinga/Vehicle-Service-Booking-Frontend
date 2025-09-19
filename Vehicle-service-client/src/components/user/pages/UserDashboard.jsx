import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import vid from '../../../assets/video.mp4';
import './UserDashboard.css';
import img1 from '../../../assets/vehicleservicelist/1.jpg';
import img2 from '../../../assets/vehicleservicelist/2.jpg';
import img3 from '../../../assets/vehicleservicelist/3.jpg';
import img4 from '../../../assets/vehicleservicelist/4.jpg';
import img5 from '../../../assets/vehicleservicelist/5.jpg';
import img6 from '../../../assets/vehicleservicelist/6.jpg';
import img7 from '../../../assets/vehicleservicelist/7.jpg';
import img8 from '../../../assets/vehicleservicelist/8.jpg';
import img9 from '../../../assets/vehicleservicelist/9.jpg';
import img10 from '../../../assets/vehicleservicelist/10.jpg';
import img11 from '../../../assets/vehicleservicelist/11.jpg';
import img12 from '../../../assets/vehicleservicelist/12.jpg';
import Scroller from './Scroller';
import CountUp from 'react-countup';

import image1 from '../../../assets/users/1.png';
import image2 from '../../../assets/users/2.jpg';
import image3 from '../../../assets/users/3.webp';
import image5 from '../../../assets/users/5.webp';
import AddVehicleForm from './AddVehicleForm';
import { useNavigate } from 'react-router-dom';

const images = [
  [img1, img2, img3],
  [img4, img5, img6],
  [img7, img8, img9],
  [img10, img11, img12]
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
<>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Dashboard Content */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard image={image2} label="Vehicles Registered" end={6} />
            <DashboardCard image={image1} label="Services and Centers" end={20} duration={5} className="ml-4" />
            <DashboardCard image={image3} label="Total Appointments" end={30} />
            <DashboardCard image={image5} label="Upcoming Appointments" end={50} />
          </div>

          <AddVehicleForm />
        </div>

        {/* Video Section */}
        <div className="relative max-w-full h-[600px]">
          <video autoPlay muted loop className="absolute w-full h-full object-cover z-0">
            <source src={vid} />
          </video>
          <div className="relative z-10 text-center text-white p-2.5">
            <h2 className="text-[2.5rem] relative top-[270px] font-extrabold">
              Imagine the possibilities <br />with Xcelerate Auto
            </h2>
              <button className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 relative top-[300px] w-[280px] m-[14px]" onClick={() => navigate('/user/appointment')}>
                Book Your Appointment Now
              </button>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="secondone h-[400px] bg-gray-100 dark:bg-slate-900 flex flex-col items-center justify-center">
            <button className="mt-[60px] w-[280px] m-3 inline-flex items-center justify-center rounded-md bg-cyan-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400" onClick={() => navigate('/user/services')}>
              Look For Services
            </button>

          <div className="relative w-full max-w-5xl overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {images.map((group, index) => (
                <div key={index} className="flex-shrink-0 w-full flex justify-center gap-4 px-4">
                  {group.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Slide ${index}-${i}`}
                      className="w-[285px] h-[250px] rounded shadow-lg"
                      loading="lazy"
                    />
                  ))}
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-2xl dark:bg-slate-700 text-white px-3 py-10 rounded-full shadow hover:bg-gray-300 hover:text-black dark:hover:bg-slate-600"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-2xl dark:bg-slate-700 text-white px-3 py-10 rounded-full shadow hover:bg-gray-300 hover:text-black dark:hover:bg-slate-600"
            >
              ›
            </button>
          </div>
        </div>

        {/* Scroller Section */}
        <div className="flex items-center justify-center bg-gray dark:bg-gray-900 text-gray-100 h-[300px]">
          <Scroller />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

// Reusable Card Component
const DashboardCard = ({ image, label, end, duration = 2.5, prefix = '' }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 dark:bg-gray-900">
    <div className="flex flex-col items-center">
      <img src={image} alt={label} className="w-18 h-16 mb-4 dark:invert" />
      <p className="text-xl font-semibold text-gray-700 dark:text-white">{label}</p>
      <CountUp start={0} end={end} duration={duration} prefix={prefix} className="text-4xl font-bold text-green-600 mt-2" />
    </div>
  </div>
);

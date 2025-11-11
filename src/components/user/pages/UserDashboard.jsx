import { useState , useEffect } from 'react';
import vid from '../../../assets/video.mp4';
import './UserDashboard.css';
import Scroller from './Scroller';
import CountUp from 'react-countup';

import image1 from '../../../assets/users/1.png';
import image2 from '../../../assets/users/2.jpg';
import image3 from '../../../assets/users/3.webp';
import AddVehicleForm from './AddVehicleForm';
import UserServices from '../../services/UserServices';
import ServiceCenterServices from '../../services/ServiceCenterServices';
import BookingServices from '../../services/BookingServices';
import ServiceTypeServices from '../../services/ServiceTypeServices';
import {
  Doughnut
} from "react-chartjs-2";
import { Link } from 'react-router-dom';
import image5 from '../../../assets/users/5.webp';

const UserDashboard = () => {
  // const navigate = useNavigate();
  // const [currentSlide, setCurrentSlide] = useState(0);
  const [vehicleCount, setVehicleCount] = useState(0);
  const [serviceCenterCount, setServiceCenterCount] = useState(0);
  const [upcomingBookingCount, setUpcomingBookingCount] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const allvehicles = await UserServices.getAllVehicles();
        console.log(allvehicles.data);
        setVehicleCount(allvehicles.data.length);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    const fetchServiceCenter = async () => {
      try {
        const allServiceCenters = await ServiceCenterServices.getAllServiceCenters();
        console.log(allServiceCenters.data);
        setServiceCenterCount(allServiceCenters.data.length);
      } catch (error) {
        console.error("Error fetching service centers:", error);
      }
    };
    const fetchBookings = async () => {
      try {
        const allBookings = await BookingServices.getAllBookings();
        console.log(allBookings.data);
        setUpcomingBookingCount(allBookings.data.length);
      } catch (error) {
        console.error("Error fetching upcoming bookings:", error);
      }
    };
    const fetchServiceTypes = async () => {
      try {
        const allServiceTypes = await ServiceTypeServices.getAllServiceTypes();
        console.log(allServiceTypes.data);
        setServiceTypeCount(allServiceTypes.data.length);
      } catch (error) {
        console.error("Error fetching service types:", error);
      }
    };

    fetchVehicles();
    fetchServiceCenter();
    fetchBookings();
    fetchServiceTypes();
  }, []);

  // const nextSlide = () => {
  //   setCurrentSlide((prev) => (prev + 1) % images.length);
  // };

  // const prevSlide = () => {
  //   setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  // };

  return (
    <>
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to = "/user/vehicles">
              <DashboardCard image={image2} label="Vehicles Registered" end={vehicleCount} />
            </Link>
            <Link to="/user/service-centers">
              <DashboardCard image={image1} label="Services Centers" end={serviceCenterCount} duration={5} className="ml-4" />
            </Link>
            <Link to = "/user/viewappointment">
              <DashboardCard image={image3} label="Total Appointments" end={upcomingBookingCount} />
            </Link>
            <DashboardCard image={image5} label="Service Types" end={50} />
            {/* <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-md w-full h-[235px] flex flex-col justify-center items-center text-center">
                        <h4 className="text-base font-semibold mb-2 text-slate-700 dark:text-white">Efficiency</h4>
                        <div className="w-[160px] h-[160px]">
                          <Doughnut
                            data={{
                              labels: ["Efficiency", "Remaining"],
                              datasets: [{
                                data: [78, 22],
                                backgroundColor: ["#06b6d4", "#e5e7eb"]
                              }]
                            }}
                            options={{ cutout: "70%" }}
                          />
                        </div>
                        <p className="mt-2 text-lg font-bold text-slate-700 dark:text-white">78%</p>
                      </div> */}
          </div>

          <AddVehicleForm />
        </div>
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
        {/* <div className="secondone h-[400px] bg-gray-100 dark:bg-slate-900 flex flex-col items-center justify-center">
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
        </div> */}
        <div className="flex items-center justify-center bg-gray dark:bg-gray-900 text-gray-100 h-[300px]">
          <Scroller />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;

const DashboardCard = ({ image, label, end, duration = 2.5, prefix = '' }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 dark:bg-gray-900">
    <div className="flex flex-col items-center p-4">
      <img src={image} alt={label} className="w-18 h-16 mb-4 dark:invert" />
      <p className="text-xl font-semibold text-gray-700 dark:text-white">{label}</p>
      <CountUp start={0} end={end} duration={duration} prefix={prefix} className="text-4xl font-bold text-green-600 mt-2" />
    </div>
  </div>
);

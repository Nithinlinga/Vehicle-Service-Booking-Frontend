import { NavLink } from "react-router-dom";
import myImage from '../assets/image2.webp';

import { MdMiscellaneousServices } from "react-icons/md";
import { CiTimer } from "react-icons/ci";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiContactlessPayment } from "react-icons/pi";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-48">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-5xl font-bold text-gray-600">Welcome to Xcelerate Auto</p>
              <p className="text-base text-gray-700 dark:text-gray-400">
                Your ultimate vehicle service booking destination! We strive to build a platform where you can book your vehicle service with ease. We believe vehicle care should be simple, reliable, and stress-free. Whether you're booking a routine service or handling unexpected repairs, our platform connects you with trusted professionals who treat your vehicle like their own.
              </p>
              <NavLink to="/">
                <button className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-600/30 transition hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                  Visit now
                </button>
              </NavLink>
            </div>

            <div className="flex justify-center items-center relative">
              <figure className="relative w-full max-w-md">
                <div className="absolute left-1/2 -top-20 w-[60%] h-[80%] bg-indigo-600/40 -z-10 transform -translate-x-1/2"></div>
                <img
                  src={myImage}
                  alt="hero-section-photo"
                  className="w-full h-auto min-w-[10rem] max-h-[20rem] object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 text-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Service 1 */}
            <div className="flex flex-col justify-center items-center text-center bg-gray-100 text-black rounded-2xl shadow-md h-72 dark:bg-black">
              <MdMiscellaneousServices className="text-indigo-600 bg-white rounded-full p-4 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold dark:text-white">Fast wheels, faster service</h3>
            </div>

            {/* Service 2 - Two stacked items */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center bg-gray-100 text-black rounded-2xl shadow-md h-32 px-6 dark:bg-black">
                <CiTimer className="text-indigo-600 bg-white rounded-full p-3 w-20 h-14 mr-4" />
                <h3 className="text-xl font-semibold dark:text-white">Your time matters—we deliver on it</h3>
              </div>
              <div className="flex items-center bg-gray-100 text-black rounded-2xl shadow-md h-32 px-6 dark:bg-black">
                <FaRegMoneyBillAlt className="text-indigo-600 bg-white rounded-full p-3 w-18 h-14 mr-4" />
                <h3 className="text-xl font-semibold dark:text-white">If it's not right, it's refunded</h3>
              </div>
            </div>

            {/* Service 3 */}
            <div className="flex flex-col justify-center items-center text-center bg-gray-100 text-black rounded-2xl shadow-md h-72 dark:bg-black">
              <PiContactlessPayment className="text-indigo-600 bg-white rounded-full p-4 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold dark:text-white">Secure payments, secure journeys</h3>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;

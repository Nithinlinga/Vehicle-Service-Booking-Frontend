import React, { useState } from 'react';
import { FaCarSide, FaOilCan, FaWrench, FaBolt, FaCarCrash } from 'react-icons/fa';
import {GiFlatTire} from 'react-icons/gi';

// Array of services with title, description, icon, price, and details
const servicesList = [
  {
    title: "General Service",
    description: "A comprehensive health check for your vehicle, including fluid top-ups and safety inspections.",
    icon: <FaCarSide />,
    price: "$150",
    about: "Our General Service package is designed to keep your car in optimal condition. It includes a thorough inspection of all major systems and essential maintenance tasks.",
    details: [
      "Fluid top-up and checks (oil, coolant, brake fluid)",
      "Tire pressure and tread inspection",
      "Brake system inspection",
      "Battery health check",
      "Full vehicle safety report",
    ],
  },
  {
    title: "Oil Change",
    description: "Quick and professional engine oil and filter replacement to ensure engine longevity.",
    icon: <FaOilCan />,
    price: "$75",
    about: "An essential service to maintain your engine's health and performance. We use high-quality oils and filters suitable for your vehicle's make and model.",
    details: [
      "Engine oil replacement with premium oil",
      "New oil filter installation",
      "Quick inspection of other fluids",
      "Grease chassis as needed",
    ],
  },
  {
    title: "Engine Check & Diagnostics",
    description: "Advanced computer diagnostics to identify and resolve any engine-related issues.",
    icon: <FaBolt />,
    price: "$90",
    about: "Our state-of-the-art diagnostic tools can pinpoint the exact cause of any engine or performance issues, saving you time and money on unnecessary repairs.",
    details: [
      "Full engine system scan",
      "Read and clear fault codes",
      "Sensor and component testing",
      "Fuel and exhaust system analysis",
    ],
  },
  {
    title: "Tire Replacement & Repair",
    description: "Expert service for tire repair, rotation, and new tire installation to ensure your safety.",
    icon: <GiFlatTire />,
    price: "Starts from $25",
    about: "Proper tire maintenance is crucial for safety and fuel efficiency. We offer a full range of tire services, from simple repairs to full replacements.",
    details: [
      "Puncture repair and balancing",
      "Tire rotation and alignment",
      "New tire installation (wide selection of brands)",
      "Tire pressure monitoring system (TPMS) service",
    ],
  },
  {
    title: "AC & Climate Control",
    description: "Full service for your vehicle's air conditioning system, from gas refilling to component repair.",
    icon: <FaCarCrash />,
    price: "$120",
    about: "Stay cool and comfortable with our AC service. We handle everything from simple recharges to complex repairs of the climate control system.",
    details: [
      "AC system performance test",
      "Refrigerant refill",
      "Leak detection and repair",
      "Cabin air filter replacement",
    ],
  },
  {
    title: "Brake & Suspension",
    description: "Maintenance and repair of your vehicle's braking system and suspension for a smooth ride.",
    icon: <FaWrench />,
    price: "Varies",
    about: "Your safety is our top priority. Our brake and suspension services ensure your vehicle handles and stops reliably in all conditions.",
    details: [
      "Brake pad and rotor replacement",
      "Brake fluid flush and replacement",
      "Shock and strut inspection and replacement",
      "Wheel bearing and axle service",
    ],
  },
];

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-teal-700 dark:text-teal-400">
          Our Services
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          We offer a wide range of professional services to keep your vehicle running smoothly and safely.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div
              key={index}
              onClick={() => handleOpenModal(service)}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex justify-center mb-4 text-5xl text-cyan-600 dark:text-cyan-400">
                {service.icon}
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div 
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 transition-opacity duration-300 z-50"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-lg w-full transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-bold text-teal-700 dark:text-teal-400">
                {selectedService.title}
              </h3>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-3xl font-light">
                &times;
              </button>
            </div>

            <p className="text-xl font-bold mb-2 text-red-800 dark:text-red-500">
              Price: {selectedService.price}
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedService.about}
            </p>

            <h4 className="text-lg font-bold mb-2 text-teal-800 dark:text-teal-400">
              Includes:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              {selectedService.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
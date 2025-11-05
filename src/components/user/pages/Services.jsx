import { useEffect, useState } from 'react';
import { FaBolt } from "react-icons/fa";
import ServiceTypeServices from '../../services/ServiceTypeServices';
import { useNavigate, useParams } from 'react-router-dom';
import ServiceCenterServices from '../../services/ServiceCenterServices';

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { id } = useParams();
  const [serviceType, setServiceType] = useState([]);
  const [serviceCenterName, setServiceCenterName] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ServiceTypeServices.getAllServiceTypes(id);
        const sc = await ServiceCenterServices.getServiceCenterById(id);
        setServiceCenterName(sc.data.name);
        setServiceType(response.data);
      } catch (error) {
        console.log("No Services found", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 text-teal-700 dark:text-teal-400">
          Services of {serviceCenterName}
        </h1>
        <p className="text-center text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          We offer a wide range of professional services to keep your vehicle running smoothly and safely.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceType.map((service, index) => (
            <div
              key={index}
              onClick={() => handleOpenModal(service)}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex justify-center mb-4 text-5xl text-cyan-600 dark:text-cyan-400">
                <FaBolt />
              </div>
              <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
                {service.title}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400">
                {service.name}
              </p>
              <p className="text-center text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

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
                {selectedService.name}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 cursor-pointer hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 text-3xl font-light"
              >
                &times;
              </button>
            </div>

            <p className="text-xl font-bold mb-2 text-red-800 dark:text-red-500">
              Price: {selectedService.price}
            </p>

            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedService.description}
            </p>

            <h4 className="text-lg font-bold mb-2 text-teal-800 dark:text-teal-400">
              Includes:
            </h4>

            <button
              onClick={() =>
                navigate(
                  `/user/appointment?service_center=${selectedService.serviceCenterId}&service_type=${selectedService.serviceTypeId}`
                )
              }
              className="mt-4 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-3 py-1 rounded"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
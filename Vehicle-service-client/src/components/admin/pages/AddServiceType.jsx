import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import ServiceTypeServices from "../../services/ServiceTypeServices";

const AddServiceType = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [serviceCentreName, setServiceCentreName] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchServiceCentre = async () => {
      try {
        if (isEditMode) {
          const ServiceCentre = await ServiceCenterServices.getServiceCenterById(id);
          setServiceCentreName(ServiceCentre.data.name);
          const response = await ServiceTypeServices.getAllServiceTypesByServiceCenter(id);
          setServiceTypes(response.data);
        }
      } catch (error) {
        console.error("Error fetching service centre:", error);
      }
    };
    fetchServiceCentre();
  }, [id, isEditMode]);

  const handleEditClick = (service) => {
    setSelectedService({ ...service });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleSave = async () => {
    try {
      await ServiceTypeServices.updateServiceType(selectedService.serviceTypeId, selectedService);
      const updatedList = await ServiceTypeServices.getAllServiceTypesByServiceCenter(id);
      setServiceTypes(updatedList.data);
      handleModalClose();
    } catch (error) {
      console.error("Error updating service type:", error);
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full shadow-xl rounded-lg p-6 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {serviceCentreName}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {serviceTypes.map((service) => (
    <div
      key={service.serviceTypeId}
      className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
        {service.description}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-1">Price: ₹{service.price}</p>
      <p
        className={`font-medium ${
          service.status === "active"
            ? "text-green-600 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        Status: {service.status}
      </p>
      <button
        onClick={() => handleEditClick(service)}
        className="mt-4 px-4 py-1 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700"
      >
        Edit
      </button>
    </div>
  ))}
</div>

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Service Type</h3>
            <div className="space-y-3">
              <input
                type="text"
                value={selectedService.description}
                onChange={(e) =>
                  setSelectedService({ ...selectedService, description: e.target.value })
                }
                placeholder="Description"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <input
                type="number"
                value={selectedService.price}
                onChange={(e) =>
                  setSelectedService({ ...selectedService, price: e.target.value })
                }
                placeholder="Price"
                className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              <select
                value={selectedService.status}
                onChange={(e) =>
                  setSelectedService({ ...selectedService, status: e.target.value })
                }
                className="w-full p-2 border rounded dark:bg-gray-900 dark:text-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddServiceType;

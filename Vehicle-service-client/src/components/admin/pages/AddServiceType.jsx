import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import ServiceTypeServices from "../../services/ServiceTypeServices";
import { toast } from "react-hot-toast";

const AddServiceType = () => {
  const { id } = useParams();
  console.log(id);
  
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [serviceCentreName, setServiceCentreName] = useState("");
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState({});


  useEffect(() => {
    const fetchServiceCentre = async () => {
      try {
        if (isEditMode) {
          const serviceCentre = await ServiceCenterServices.getServiceCenterById(id);
          setServiceCentreName(serviceCentre.data.name);
          const response = await ServiceTypeServices.getAllServiceTypesByServiceCenter(id);
          setServiceTypes(response.data);
        }
      } catch (error) {
        console.error("Error fetching service centre:", error);
      }
    };
    fetchServiceCentre();
  }, [id, isEditMode]);

  // Function to handle opening the modal for editing
  const handleEditClick = (service) => {
    setSelectedService({ ...service });
    setIsModalOpen(true);
  };
  const validateService = (values) => {
    const errors = {};

    const descriptionRegex = /^[A-Za-z\s]{3,100}$/; // only alphabets + spaces, 3–100 chars
    const priceRegex = /^[0-9]+(\.[0-9]{1,2})?$/;   // positive number, up to 2 decimals

    // Description validation
    if (!values.description) {
      errors.description = "Description is required";
    } else if (!descriptionRegex.test(values.description)) {
      errors.description = "Description must be 3-100 alphabets only";
    }

    // Price validation
    if (!values.price) {
      errors.price = "Price is required";
    } else if (!priceRegex.test(values.price)) {
      errors.price = "Price must be a valid positive number (up to 2 decimals)";
    } else if (parseFloat(values.price) <= 0) {
      errors.price = "Price must be greater than 0";
    }

    // Status validation
    if (!values.status) {
      errors.status = "Status is required";
    } else if (!["active", "inactive"].includes(values.status)) {
      errors.status = "Invalid status";
    }

    return errors;
  };

  // ✅ Save handler
  const handleModalSave = () => {
    const validationErrors = validateService(selectedService);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // show errors in UI
      return;
    }
    else{
      handleSave();
    }
    // If no errors, clear them and proceed
    setErrors({});
    console.log("Saving service:", selectedService);
    // ... your save logic here (API call, state update, etc.)
    setIsModalOpen(false);
  };


  
  // ✅ Open modal for adding a new service
  const handleAddComponentClick = () => {
    setSelectedService({
      description: "",
      price: "",
      status: "active",
      serviceCenterId: id,
    });
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setErrors({});
    setSelectedService(null);
  };

  const handleSave = async () => {
    if (!selectedService) return;

    try {
      // Create a copy and convert price to a number before sending
      const serviceToUpdate = {
        ...selectedService,
        price: Number(selectedService.price)
      };

      // Check if it's an existing service to update or a new one to add
      if (selectedService.serviceTypeId) {
        await ServiceTypeServices.updateServiceType(selectedService.serviceTypeId, serviceToUpdate);
        toast.success("Service type updated successfully!");
      } else {
        // Assuming your service has an addServiceType method
        await ServiceTypeServices.addServiceType(serviceToUpdate); 
        toast.success("Service type added successfully!");
      }

      // Fetch the updated list from the server to refresh the UI
      const updatedListResponse = await ServiceTypeServices.getAllServiceTypesByServiceCenter(id);
      setServiceTypes(updatedListResponse.data);
      
      // Close the modal after a successful save
      handleModalClose();
    } catch (error) {
      console.error("Error saving service type:", error);
      toast.error("Failed to save service type. Please try again.");
    }
  };

  return (
    <div className="flex justify-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="w-full shadow-xl rounded-lg p-6 bg-white dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
          {serviceCentreName}
        </h2>
        <div className="mb-4">
          <button
            onClick={handleAddComponentClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Service Type
          </button>
        </div>


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

      <div>
      {/* Button to open modal */}
      {/* <button
        onClick={handleAddComponentClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Service Type
      </button> */}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              {selectedService?.serviceTypeId
                ? "Edit Service Type"
                : "Add Service Type"}
            </h3>

            <div className="space-y-3">
              {/* Description */}
              <div>
                <input
                  type="text"
                  value={selectedService?.description || ""}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                  className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <input
                  type="number"
                  value={selectedService?.price || ""}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                  className={`w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${
                    errors.price ? "border-red-500" : ""
                  }`}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <select
                  value={selectedService?.status || "active"}
                  onChange={(e) =>
                    setSelectedService({
                      ...selectedService,
                      status: e.target.value,
                    })
                  }
                  className={`w-full p-2 border rounded dark:bg-gray-900 dark:text-white ${
                    errors.status ? "border-red-500" : ""
                  }`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-400 cursor-pointer text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleModalSave}
                className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default AddServiceType;
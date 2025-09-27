import { useState, useEffect } from "react";
import ServiceCenterServices from "../../services/ServiceCenterServices";

const ManageMechanicModal = ({
  isStatusModalOpen,
  closeStatusModal,
  selectedMechanic,
  isEdit = false,
  onSave,
  isVerificationFlow = false,
}) => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(
    selectedMechanic?.status || (isVerificationFlow ? "unverified" : "active")
  );
  const [selectedServiceCenterId, setSelectedServiceCenterId] = useState(
    selectedMechanic?.servicecenterId || ""
  );
  const getServiceCenters = async () => {
    try {
      const response = await ServiceCenterServices.getAllServiceCenters();
      setServiceCenters(response.data);
    } catch (error) {
      console.error("Service centres not found", error);
    }
  };

  useEffect(() => {
    if (isStatusModalOpen) {
      if (!isVerificationFlow) {
        getServiceCenters();
      }
      setSelectedStatus(
        selectedMechanic?.status ||
          (isVerificationFlow ? "unverified" : "active")
      );
      setSelectedServiceCenterId(selectedMechanic?.servicecenterId || "");
    }
  }, [isStatusModalOpen, selectedMechanic, isVerificationFlow]);

  const handleSave = () => {
    const updatedMechanic = {
      ...selectedMechanic,
      status: selectedStatus,
      servicecenterId: isVerificationFlow
        ? selectedMechanic?.servicecenterId
        : selectedServiceCenterId,
    };
    onSave(updatedMechanic);
    closeStatusModal();
  };

  if (!isStatusModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {isVerificationFlow
            ? "Verify Mechanic"
            : isEdit
            ? "Change Mechanic Service Center"
            : "Assign Service Center"}
        </h3>

        <div className="space-y-3">
          <input
            type="text"
            value={selectedMechanic?.name || ""}
            disabled
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            value={selectedMechanic?.address || ""}
            disabled
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          >
            {isVerificationFlow ? (
              <>
                <option value="yes">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="unverified">Unverified</option>
              </>
            ) : (
              <>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </>
            )}
          </select>
          {!isVerificationFlow && (
            <select
              value={selectedServiceCenterId}
              onChange={(e) => setSelectedServiceCenterId(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            >
              <option value="none">-- Select Service Center --</option>
              {serviceCenters.map((sc) => (
                <option key={sc.servicecenterId} value={sc.servicecenterId}>
                  {sc.name} - {sc.location}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeStatusModal}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageMechanicModal;

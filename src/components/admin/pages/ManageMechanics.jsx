import React, { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import MechanicServices from "../../services/MechanicServices";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import ManageMechanicModal from "./ManageMechanicModal";

export default function ManageMechanics() {
  const [showVerified, setShowVerified] = useState(false);
  const [showUnverified, setShowUnverified] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [mechanics, setMechanics] = useState([]);
  const [serviceCentreName, setServiceCentreName] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("active");

  const fetchMechanics = async () => {
    try {
      const res = await MechanicServices.getAllMechanics();
      setMechanics(res.data);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
    }
  };
  const getServiceCenterById = async (id) => {
    try {
      const response = await ServiceCenterServices.getServiceCenterById(id)
      setServiceCentreName(response.data.name)
    } catch (error) {
      console.error("Service centre not found", error)
    }
  }
  useEffect(() => {
    fetchMechanics();
  }, []);

  const handleVerification = async (id, status) => {
    const confirmMsg =
      status === "YES"
        ? "Are you sure you want to ACCEPT this mechanic?"
        : status === "REJECTED"
          ? "Are you sure you want to REJECT this mechanic?"
          : "Are you sure you want to mark this mechanic as UNVERIFIED?";
    if (!window.confirm(confirmMsg)) return;

    try {
      await MechanicServices.updateVerificationStatus(id, status);
      fetchMechanics();
    } catch (err) {
      console.error("Error updating verification:", err);
    }
  };

  const openStatusModal = async (mechanic) => {
    setSelectedMechanic(mechanic);
    setIsStatusModalOpen(true);
  };

  const handleSaveMechanic = async (updatedMechanic) => {
    console.log("Updated mechanic:", updatedMechanic);
    await MechanicServices.updateMechanicCenter(updatedMechanic.id, updatedMechanic.centerId,updatedMechanic.status)
    await fetchMechanics()
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedMechanic(null);
  };

  const handleStatusSave = async () => {
    try {
      await MechanicServices.updateStatus(selectedMechanic.id, selectedStatus)

      await fetchMechanics()

      closeStatusModal();
    } catch (err) {
      console.error("Error updating active/inactive status:", err);
    }
  };

  const verified = mechanics.filter((m) => m.isVerified === "YES");
  const unverified = mechanics.filter((m) => m.isVerified === "NO" || m.isVerified === null);
  const rejected = mechanics.filter((m) => m.isVerified === "REJECTED");

  return (
    <div className="w-full gap-4 space-y-4">
      {/* Unverified Mechanics */}
      <div className="flex-1">
        <button
          onClick={() => setShowUnverified(!showUnverified)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-colors duration-500"
        >
          <span>Unverified Mechanics ({unverified.length})</span>
          {showUnverified ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${showUnverified ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {/* Scrollable list */}
          <div className="mt-2 rounded p-3 space-y-3 max-h-96 overflow-y-auto">
            {unverified.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded shadow-sm border flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <p className="font-bold text-amber-700">{m.name}</p>
                  <p>Expertise: {m.expertise}</p>
                  <p>Availability: {m.availability}</p>
                  <p>Rating: {m.rating}</p>
                  <p>Address: {m.address}</p>
                </div>
                <div className="mt-3 sm:mt-0 flex gap-2">
                  <button
                    onClick={() => handleVerification(m.id, "YES")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleVerification(m.id, "REJECTED")}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
            {unverified.length === 0 && (
              <p className="text-sm text-gray-500">No unverified mechanics.</p>
            )}
          </div>
        </div>
      </div>

      {/* Verified Mechanics */}
      <div className="flex-1">
        <button
          onClick={() => setShowVerified(!showVerified)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 transition-colors duration-500"
        >
          <span>Verified Mechanics ({verified.length})</span>
          {showVerified ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${showVerified ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {/* Scrollable list */}
          <div className="mt-2 rounded p-3 space-y-3 max-h-96 overflow-y-auto">
            {verified.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded shadow-sm border flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <p className="font-bold text-teal-700">{m.name}</p>
                  <p>Expertise: {m.expertise}</p>
                  <p>Availability: {m.availability}</p>
                  <p>Rating: {m.rating}</p>
                  <p>Service Center Name: {m.centerName}</p>
                  <p>Address: {m.address}</p>
                  {m.status && <p>Status: {m.status}</p>}
                </div>
                <div className="mt-3 sm:mt-0 flex gap-2">
                  <button
                    onClick={() => openStatusModal(m)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            {verified.length === 0 && (
              <p className="text-sm text-gray-500">No verified mechanics.</p>
            )}
          </div>
        </div>
      </div>

      {/* Rejected Mechanics */}
      <div className="flex-1">
        <button
          onClick={() => setShowRejected(!showRejected)}
          className="w-full flex justify-between items-center text-white py-3 px-4 rounded shadow bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-colors duration-500"
        >
          <span>Rejected Mechanics ({rejected.length})</span>
          {showRejected ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        <div
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${showRejected ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {/* Scrollable list */}
          <div className="mt-2 rounded p-3 space-y-3 max-h-96 overflow-y-auto">
            {rejected.map((m) => (
              <div
                key={m.id}
                className="p-3 rounded shadow-sm border flex flex-col sm:flex-row sm:justify-between sm:items-center"
              >
                <div>
                  <p className="font-bold text-red-700">{m.name}</p>
                  <p>Expertise: {m.expertise}</p>
                  <p>Availability: {m.availability}</p>
                  <p>Rating: {m.rating}</p>
                  <p>Service Center Name: {m.centerName}</p>
                </div>
                <div className="mt-3 sm:mt-0 flex gap-2">
                  <button
                    onClick={() => handleVerification(m.id, "YES")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </button>
                </div>
              </div>
            ))}
            {rejected.length === 0 && (
              <p className="text-sm text-gray-500">No rejected mechanics.</p>
            )}
          </div>
        </div>
      </div>
      <ManageMechanicModal
        isStatusModalOpen={isStatusModalOpen}
        closeStatusModal={() => setIsStatusModalOpen(false)}
        selectedMechanic={selectedMechanic}
        isEdit={!!selectedMechanic?.servicecenterId}
        onSave={handleSaveMechanic}
      />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import MechanicServices from "../../services/MechanicServices";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import ManageMechanicModal from "./ManageMechanicModal";

export default function ManageMechanics() {
  const [activeTab, setActiveTab] = useState("UNVERIFIED");
  const [mechanics, setMechanics] = useState([]);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState(null);

  const fetchMechanics = async () => {
    try {
      const res = await MechanicServices.getAllMechanics();
      setMechanics(res.data);
    } catch (err) {
      console.error("Error fetching mechanics:", err);
    }
  };

  useEffect(() => {
    fetchMechanics();
  }, []);

  const handleVerification = async (id, status) => {
    const confirmMsg =
      status === "YES"
        ? "Are you sure you want to ACCEPT this mechanic?"
        : "Are you sure you want to REJECT this mechanic?";
    if (!window.confirm(confirmMsg)) return;

    try {
      await MechanicServices.updateVerificationStatus(id, status);
      fetchMechanics();
    } catch (err) {
      console.error("Error updating verification:", err);
    }
  };

  const openStatusModal = (mechanic) => {
    setSelectedMechanic(mechanic);
    setIsStatusModalOpen(true);
  };

  const handleSaveMechanic = async (updatedMechanic) => {
    await MechanicServices.updateMechanicCenter(
      updatedMechanic.id,
      updatedMechanic.centerId,
      updatedMechanic.status
    );
    await fetchMechanics();
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedMechanic(null);
  };

  const verified = mechanics.filter((m) => m.isVerified === "YES");
  const unverified = mechanics.filter((m) => m.isVerified === "NO" || m.isVerified === null);
  const rejected = mechanics.filter((m) => m.isVerified === "REJECTED");

  const renderMechanics = (list, label, badgeColor) => {
    if (list.length === 0) {
      return (
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl h-[300px] overflow-y-auto flex justify-center items-center">
          No {label} mechanics.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {list.map((m) => (
          <div
            key={m.id}
            className="rounded-xl border-l-4 border-teal-500 bg-teal-50 dark:bg-teal-900/30 p-5 shadow flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <div>
              <p className="font-bold text-lg text-teal-800 dark:text-teal-200">{m.name}</p>
              <p>Expertise: {m.expertise}</p>
              <p>Availability: {m.availability}</p>
              <p>Rating: {m.rating}</p>
              <p>Address: {m.address}</p>
              {m.centerName && <p>Service Center: {m.centerName}</p>}
              {m.status && <p>Status: {m.status}</p>}
            </div>
            <div className="mt-3 sm:mt-0 flex flex-col items-center gap-2">
              <span className={`inline-block px-4 py-1 rounded-full ${badgeColor} text-white font-semibold text-sm mb-2`}>
                {label}
              </span>
              {label === "Unverified" && (
                <div className="flex gap-2">
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
              )}
              {label === "Rejected" && (
                <button
                  onClick={() => handleVerification(m.id, "YES")}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
              )}
              {label === "Verified" && (
                <button
                  onClick={() => openStatusModal(m)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-teal-900 py-10">
      <div className="w-full m-2 max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 mb-8 text-center">
          Manage Mechanics
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          {["UNVERIFIED", "VERIFIED", "REJECTED"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === tab
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "UNVERIFIED" && renderMechanics(unverified, "Unverified", "bg-yellow-500")}
        {activeTab === "VERIFIED" && renderMechanics(verified, "Verified", "bg-green-500")}
        {activeTab === "REJECTED" && renderMechanics(rejected, "Rejected", "bg-red-500")}
      </div>

      {/* Modal */}
      <ManageMechanicModal
        isStatusModalOpen={isStatusModalOpen}
        closeStatusModal={closeStatusModal}
        selectedMechanic={selectedMechanic}
        isEdit={!!selectedMechanic?.servicecenterId}
        onSave={handleSaveMechanic}
      />
    </div>
  );
}

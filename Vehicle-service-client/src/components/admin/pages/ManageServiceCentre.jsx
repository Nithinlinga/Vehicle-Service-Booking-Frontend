import React, { useEffect, useState } from "react";
import ServiceCenterServices from "../../services/ServiceCenterServices";
import { Link, useNavigate } from "react-router-dom";

const ManageServiceCentre = () => {
  const [serviceCentre, setServiceCentre] = useState([]);
  const navigate=useNavigate();


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await ServiceCenterServices.getAllServiceCenters();
      setServiceCentre(response.data);
    } catch (error) {
      console.error("Error fetching service centres:", error);
    }
  }


  return (
    <div className="m-2">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-center flex-1">
          All Service Centres
        </h2>
        <Link
          to="/admin/add-service-centers"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow"
        >
          + Add Service Centre
        </Link>
      </div>

      {/* Service Centre Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {serviceCentre.map((s) => (
        <div
          key={s.servicecenterId}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            {s.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">📍 {s.location}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">📞 {s.contact}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">⭐ Rating: {s.rating}</p>
          {s.feedback && (
            <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
              "{s.feedback}"
            </p>
          )}

          {/* Edit Button */}
          <button
            onClick={() => navigate(`/admin/add-service-centers/${s.servicecenterId}`)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
        </div>
      ))}
    </div>

     
    </div>
  );
};

export default ManageServiceCentre;

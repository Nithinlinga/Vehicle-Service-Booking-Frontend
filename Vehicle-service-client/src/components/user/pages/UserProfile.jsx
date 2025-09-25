import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserServices from "../../services/UserServices";
import { toast } from 'react-hot-toast';

const UserProfile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      UserServices.getUserById(user.id)
        .then((response) => {
          const profile = response.data[0];
          if (profile) {
            const { first_name, last_name, address, phone } = profile;
            setUserData({ first_name, last_name, address, phone });
          } else {
            toast.error("User profile not found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load user profile.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const { first_name, last_name, address, phone } = userData;

  if (isLoading) {
    return <div className="text-center mt-20 text-lg text-gray-600">Loading user profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 transition-colors duration-500">
      <main className="max-w-4xl mx-auto py-12 px-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4qdBAfjlSTjoaOGeV22tf8jgUjl_0KvJcTbOBMPWDNNX3r2MetzGgSapJFR0SpCDhCcM&usqp=CAU"
            alt="Profile"
            className="rounded-full w-32 h-32 border-4 border-indigo-400 shadow-lg object-cover"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              {first_name || "John"} {last_name || "Doe"}
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mt-2">Welcome back to your Profile</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">📞 Contact</h2>
            <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {phone || "N/A"}</p>
            <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {isAuthenticated ? user.email : "N/A"}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">📍 Address</h2>
            <p className="text-gray-700 dark:text-gray-300">{address || "N/A"}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center md:justify-end">
          <button
            onClick={() => navigate("/user/edit-profile")}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;

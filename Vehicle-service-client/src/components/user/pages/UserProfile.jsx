import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserServices from "../../services/UserServices";

const UserProfile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone: ""
  });

  useEffect(() => {
  if (user && user.id) {
    UserServices.getUserById(user.id)
      .then((response) => {
        const { first_name , last_name , address , phone } = response.data;
        setUserData({ first_name , last_name , address , phone });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }
}, [user]);

  // Destructure the data from the state for use in JSX
  const { first_name , last_name , address , phone } = userData;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      <main className="flex-1 p-10">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.qmESXk-tJOdCshigsLG6GAHaJQ"
            alt="Profile"
            className="rounded-full w-28 h-28 border-4 border-cyan-400 shadow-md"
          />
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              {name || "Loading..."}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              Senior Mechanic • {expertise || "N/A"}
              <span className="flex items-center gap-1">
                {renderStars(rating)}
              </span>
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Contact Info */}
          <div className="p-6 rounded-xl border border-cyan-300 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
              Contact Information
            </h2>
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold">📞 Phone:</span> {phone || "N/A"}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold">✉️ Email:</span>{" "}
              {isAuthenticated ? user.email : "something@gmail.com"}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold">📍 Address:</span> {address || "N/A"}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold">📅 Availability:</span> {availability || "N/A"}
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <span className="font-semibold">⭐ Rating:</span> {rating || "N/A"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/mechanic/edit-profile")}
            className="px-6 py-2 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 font-semibold rounded-xl shadow hover:bg-cyan-200 dark:hover:bg-cyan-800 transition"
          >
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
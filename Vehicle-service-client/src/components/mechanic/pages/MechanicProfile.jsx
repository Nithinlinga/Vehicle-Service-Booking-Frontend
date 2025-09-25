import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import MechanicServices from "../../services/MechanicServices";
import MechanicSkill from "../../services/MechanicSkill";
import { Star, StarHalf } from "lucide-react";

const MechanicProfile = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [mechanicData, setMechanicData] = useState({
    name: "",
    phone: "",
    address: "",
    expertise: "",
    availability: "",
    rating: null,
  });
  const [skills , setSkills] = useState([]);

  useEffect(() => {
  if (user && user.id) {
    MechanicServices.getMechanicsById(user.id)
      .then((response) => {
        const { name, phone, address, expertise, availability, rating } = response.data;
        setMechanicData({ name, phone, address, expertise, availability, rating });
      })
      .catch((error) => {
        console.error("Error fetching mechanic data:", error);
      });
    MechanicSkill.getAllSkills(user.id)
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mechanic skills:", error);
      });
  }
}, [user]);

  // Destructure the data from the state for use in JSX
  const { name, phone, address, expertise, availability, rating } = mechanicData;
  console.log(skills);
  

  // Helper function to render stars based on a numeric rating
  const renderStars = (rating) => {
      let numericRating = 0;

      // Convert string ratings to numbers
      if (typeof rating === 'string') {
        switch (rating.toLowerCase()) {
          case 'excellent':
            numericRating = 5;
            break;
          case 'good':
            numericRating = 4;
            break;
          case 'average':
            numericRating = 3;
            break;
          case 'poor':
            numericRating = 2;
            break;
          case 'very poor':
            numericRating = 1;
            break;
          default:
            numericRating = 0;
        }
      } else if (typeof rating === 'number') {
        numericRating = rating;
      } else {
        return <span>N/A</span>;
      }

      const stars = [];
      const fullStars = Math.floor(numericRating);
      const hasHalfStar = numericRating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={`full-${i}`} className="h-4 w-4 text-yellow-400" fill="currentColor" />);
      }

      if (hasHalfStar) {
        stars.push(<StarHalf key="half" className="h-4 w-4 text-yellow-400" fill="currentColor" />);
      }

      const remainingStars = 5 - stars.length;
      for (let i = 0; i < remainingStars; i++) {
        stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
      }

      return stars;
    };

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

          {/* Skills */}
            <div className="p-6 rounded-xl border border-purple-300 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
                Skills
              </h2>
              {skills && skills.length > 0 ? (
                <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
                  {skills.map((skill, index) => (
                    <li key={index}>{skill.skill_name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-slate-400">
                  No skills added yet.
                </p>
              )}
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
          <button
            onClick={() => navigate("/mechanic/edit-skills")}
            className="px-6 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-semibold rounded-xl shadow hover:bg-purple-200 dark:hover:bg-purple-800 transition"
          >
            Update Skills
          </button>
        </div>
      </main>
    </div>
  );
};

export default MechanicProfile;
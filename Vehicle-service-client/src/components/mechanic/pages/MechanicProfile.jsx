import { User, Wrench, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MechanicProfile = () => {
  const navigate = useNavigate();
  const { name, phone, email, address, skills } = useSelector((state) => state.mechanic);
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-10">
          <img
            src="https://tse2.mm.bing.net/th/id/OIP.qmESXk-tJOdCshigsLG6GAHaJQ"
            alt="Profile"
            className="rounded-full w-28 h-28 border-4 border-cyan-400 shadow-md"
          />
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">{name}</h1>
            <p className="text-slate-500 dark:text-slate-400">Senior Mechanic • 5+ Years Experience</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Contact Info */}
          <div className="p-6 rounded-xl border border-cyan-300 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-4">Contact Information</h2>
            <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">📞 Phone:</span> {phone}</p>
            <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">✉️ Email:</span> {email}</p>
            <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">📍 Address:</span> {address}</p>
          </div>

          {/* Skills */}
          <div className="p-6 rounded-xl border border-purple-300 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Skills</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Work Summary */}
        <div className="p-6 rounded-xl border border-indigo-300 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition mb-10">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">Work Summary</h2>
          <p className="text-slate-700 dark:text-slate-300">
            Experienced automobile mechanic specialized in both two-wheelers and four-wheelers.
            Known for quick diagnostics and reliable service with strong customer satisfaction.
          </p>
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

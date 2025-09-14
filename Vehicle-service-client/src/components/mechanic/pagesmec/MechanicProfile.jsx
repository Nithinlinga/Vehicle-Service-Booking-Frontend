import { User, Wrench, IndianRupee } from "lucide-react";
import { NavLink } from "react-router-dom";

const MechanicProfile = () => {
  const links = [
    { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "/service-log", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    { to: "/earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 shadow-md p-6">
        <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400 mb-8">Mechanic Panel</h2>
        <nav className="space-y-4">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300"
                    : "text-slate-700 hover:bg-cyan-50 dark:text-slate-200 dark:hover:bg-slate-700"
                }`
              }
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

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
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">John Doe</h1>
            <p className="text-slate-500 dark:text-slate-400">Senior Mechanic • 5+ Years Experience</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Contact Info */}
          <div className="p-6 rounded-xl border border-cyan-300 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-4">Contact Information</h2>
            <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">📞 Phone:</span> +91 98765 43210</p>
            <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">✉️ Email:</span> johndoe@email.com</p>
            <p className="text-slate-700 dark:text-slate-300"><span className="font-semibold">📍 Address:</span> Kolkata, India</p>
          </div>

          {/* Skills */}
          <div className="p-6 rounded-xl border border-purple-300 bg-white dark:bg-slate-800 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Skills</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
              <li>Engine Repair</li>
              <li>Brake & Suspension</li>
              <li>Car AC Service</li>
              <li>Electrical Diagnostics</li>
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
          <button className="px-6 py-2 bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 font-semibold rounded-xl shadow hover:bg-cyan-200 dark:hover:bg-cyan-800 transition">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 font-semibold rounded-xl shadow hover:bg-purple-200 dark:hover:bg-purple-800 transition">
            Update Skills
          </button>
        </div>
      </main>
    </div>
  );
};

export default MechanicProfile;

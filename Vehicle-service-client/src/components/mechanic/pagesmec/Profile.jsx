// import PageWrapper from "./PageWrapper";

// const Profile =()=>{
//     return(
//     <PageWrapper>
//     <div className="space-y-6 p-6 bg-white min-h-screen">
//       {/* Profile Header */}
//       <div className="flex items-center space-x-4">
//         https://via.placeholder.com/100
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
//           <p className="text-gray-500">Senior Mechanic • 5+ Years Experience</p>
//         </div>
//       </div>

//       {/* Contact Info & Skills */}
//       <div className="grid md:grid-cols-2 gap-6">
//         {/* Contact Info */}
//         <div className="p-6 rounded-xl bg-white border border-cyan-200 shadow-sm hover:shadow-md transition">
//           <h2 className="text-xl font-semibold text-cyan-600 mb-4">Contact Information</h2>
//           <p className="text-black"><span className="font-semibold">📞 Phone:</span> +91 98765 43210</p>
//           <p className="text-black"><span className="font-semibold">✉️ Email:</span> johndoe@email.com</p>
//           <p className="text-black"><span className="font-semibold">📍 Address:</span> Kolkata, India</p>
//         </div>

//         {/* Skills */}
//         <div className="p-6 rounded-xl bg-white border border-purple-200 shadow-sm hover:shadow-md transition">
//           <h2 className="text-xl font-semibold text-purple-600 mb-4">Skills</h2>
//           <ul className="list-disc list-inside space-y-2 text-gray-700">
//             <li>Engine Repair</li>
//             <li>Brake & Suspension</li>
//             <li>Car AC Service</li>
//             <li>Electrical Diagnostics</li>
//           </ul>
//         </div>
//       </div>

//       {/* Work Summary */}
//       <div className="p-6 rounded-xl bg-white border border-indigo-200 shadow-sm hover:shadow-md transition">
//         <h2 className="text-xl font-semibold text-indigo-600 mb-4">Work Summary</h2>
//         <p className="text-gray-700">
//           Experienced automobile mechanic specialized in both two-wheelers and four-wheelers. 
//           Known for quick diagnostics and reliable service with strong customer satisfaction.
//         </p>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex space-x-4">
//         <button className="px-6 py-2 bg-cyan-100 text-cyan-700 font-semibold rounded-xl shadow hover:bg-cyan-200 transition">
//           Edit Profile
//         </button>
//         <button className="px-6 py-2 bg-purple-100 text-purple-700 font-semibold rounded-xl shadow hover:bg-purple-200 transition">
//           Update Skills
//         </button>
//       </div>
//     </div>
//     </PageWrapper> );


// }
// export default Profile
//import PageWrapper from "../components/PageWrapper";

// src/pages/Profile.jsx
import {Home,User,Wrench,IndianRupee,LogOut} from "lucide-react";
import {NavLink} from "react-router-dom";
const Profile=()=> {
  const links = [
    { to: "/profile", label: "Profile", icon: <User className="w-5 h-5" /> },
    { to: "/services", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    { to: "/earnings", label: "Earnings", icon: <IndianRupee className="w-5 h-5" /> },
  ];
  return(
    <div className="flex h-screen">
      {/*<div className="flex h-screen">    border border-white-900*/}
        <aside className="w-64 flex flex-col">
          {/*<div className="px-6 py-6 text-2xl font-extrabold text-cyan-500">Mechanic Logo</div>*/}
          <nav className="mt-10 space-y-1 pl-20">
            {links.map(({ to, label, icon, danger }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 font-medium rounded-lg transition
                  ${isActive ? " text-cyan-700" : "text-white-700  hover:text-cyan-600"}
                  ${danger ? "text-red-500 hover:text-red-600" : ""}`
                }
              >
                {icon}
                <span className="ml-3">{label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
    <div className="mx-auto w-[800px] h-[200px] mt-12">
    <div className="space-y-6 p-6 min-h-screen">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
                    <img 
              src="https://tse2.mm.bing.net/th/id/OIP.qmESXk-tJOdCshigsLG6GAHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" 
              alt="Profile" 
              className="rounded-full w-30 h-30" 
            />
        <div>
          <h1 className="text-3xl font-bold text-cyan-700">John Doe</h1>
          <p className="text-gray-500">Senior Mechanic • 5+ Years Experience</p>
        </div>
      </div>

      {/* Contact Info & Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="p-6 rounded-xl  border border-cyan-200 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_15px_3px_rgba(34,211,238,0.7)] transition">
          <h2 className="text-xl font-semibold text-cyan-600 mb-4">Contact Information</h2>
          <p className="text-gray-700"><span className="font-semibold">📞 Phone:</span> +91 98765 43210</p>
          <p className="text-gray-700"><span className="font-semibold">✉️ Email:</span> johndoe@email.com</p>
          <p className="text-gray-700"><span className="font-semibold">📍 Address:</span> Kolkata, India</p>
        </div>

        {/* Skills */}
        <div className="p-6 rounded-xl  border border-purple-200 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_15px_3px_rgba(168,85,247,0.7)] transition">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Skills</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Engine Repair</li>
            <li>Brake & Suspension</li>
            <li>Car AC Service</li>
            <li>Electrical Diagnostics</li>
          </ul>
        </div>
      </div>

      {/* Work Summary */}
      <div className="p-6 rounded-xl  border border-indigo-200 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_15px_3px_rgba(99,102,241,0.7)] transition">
        <h2 className="text-xl font-semibold text-indigo-600 mb-4">Work Summary</h2>
        <p className="text-gray-700">
          Experienced automobile mechanic specialized in both two-wheelers and four-wheelers. 
          Known for quick diagnostics and reliable service with strong customer satisfaction.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="px-6 py-2 border text-cyan-700 font-semibold rounded-xl shadow hover:bg-cyan-200 transition">
          Edit Profile
        </button>
        <button className="px-6 py-2 border text-purple-700 font-semibold rounded-xl shadow hover:bg-purple-200 transition">
          Update Skills
        </button>
      </div>
    </div>
    </div> 
   </div> );
}
export default Profile

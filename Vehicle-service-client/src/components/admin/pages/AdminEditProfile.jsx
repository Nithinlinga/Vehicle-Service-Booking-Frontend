import { useDispatch , useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../../../store/adminSlice";
import { useNavigate } from "react-router-dom";

const AdminEditProfile = () => {
  const { name, role, email, phone, location, department, joined, bio } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({ name, role, email, phone, location, department, joined, bio });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    navigate("/admin/profile");
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "role", "email", "phone", "location", "department", "joined", "bio"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            className="w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white"
          />
        ))}
        <button type="submit" className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default AdminEditProfile

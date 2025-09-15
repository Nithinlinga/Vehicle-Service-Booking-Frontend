import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../../../store/mechanicSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { name, phone, email, address } = useSelector((state) => state.mechanic);
  const [formData, setFormData] = useState({ name, phone, email, address });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    navigate("/mechanic/profile");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "phone", "email", "address"].map((field) => (
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
};

export default EditProfile;

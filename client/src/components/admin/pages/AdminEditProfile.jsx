import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../../../store/adminSlice";
import { useNavigate } from "react-router-dom";
 

const validationRegex = {
  name: /^[A-Za-z\s]{5,}$/,
  role: /^[A-Za-z\s]{5,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  phone: /^\+?\d{10,}$/, 
  location: /^[A-Za-z\s]{3,}$/, 
  department: /^[A-Za-z\s]{2,100}$/,
  joined: /^\d{4}-\d{2}-\d{2}$/,
  bio: /^.{10,}$/
};
 
const AdminEditProfile = () => {
  const { name, role, email, phone, location, department, joined, bio } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({ name, role, email, phone, location, department, joined, bio });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      if (field === "email") return;
 
      const value = formData[field];
      const regex = validationRegex[field];
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1);
 
      if (!value.trim()) {
        newErrors[field] = `${fieldName} is required.`;
        isValid = false;
      } else if (regex && !regex.test(value)) {
        switch (field) {
          case 'name':
          case 'role':
          case 'department':
            newErrors[field] = `${fieldName} must contain more than 2 letters.`;
            break;
          case 'phone':
            newErrors[field] = 'Please enter a valid phone number (10 digits).';
            break;
          case 'location':
            newErrors[field] = 'Please enter a valid location (at least 5 characters).';
            break;
          case 'joined':
            newErrors[field] = 'Joined date must be in YYYY-MM-DD format.';
            break;
          case 'bio':
            newErrors[field] = 'Bio must be at least 10 characters long.';
            break;
          default:
            newErrors[field] = `Invalid ${fieldName} format.`;
            break;
        }
        isValid = false;
      }
    });
 
    setErrors(newErrors);
    return isValid;
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateProfile(formData));
      navigate("/admin/profile");
    }
  };
  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };
 
  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "role", "email", "phone", "location", "department", "joined", "bio"].map((field) => (
          <div key={field}>
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              disabled={field === "email"}
              onChange={(e) => handleInputChange(e, field)}
              className={`w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white ${
                errors[field] ? "border-red-500" : ""
              }`}
            />
            {errors[field] && (
              <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
            )}
          </div>
        ))}
        <button type="submit" className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">
          Save Changes
        </button>
      </form>
    </div>
  );
};
 
export default AdminEditProfile;
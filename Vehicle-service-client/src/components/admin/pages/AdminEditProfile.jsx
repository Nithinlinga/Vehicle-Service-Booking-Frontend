import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateProfile } from "../../../store/adminSlice";
import { useNavigate } from "react-router-dom";
 
// Regex patterns for validation
const validationRegex = {
  name: /^[A-Za-z\s]{5,}$/, // At least 2 letters, spaces allowed
  role: /^[A-Za-z\s]{5,}$/, // At least 2 letters, spaces allowed
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email format
  phone: /^\+?\d{10,}$/, // Optional '+' followed by 10 to 15 digits
  location: /^[A-Za-z\s]{3,}$/, // Letters, numbers, spaces, comma, dash, at least 2 chars
  department: /^[A-Za-z\s]{2,100}$/, // At least 2 letters, spaces allowed
  joined: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD format
  bio: /^.{10,}$/, // At least 10 characters
};
 
const AdminEditProfile = () => {
  const { name, role, email, phone, location, department, joined, bio } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({ name, role, email, phone, location, department, joined, bio });
  // State to hold validation errors for each field
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  // Function to validate the entire form data
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
 
    // Iterate over fields and check against regex
    Object.keys(formData).forEach((field) => {
      // Skip email validation as it's disabled and usually validated server-side/at registration
      if (field === "email") return;
 
      const value = formData[field];
      const regex = validationRegex[field];
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1); // Capitalize field name for message
 
      if (!value.trim()) {
        newErrors[field] = `${fieldName} is required.`;
        isValid = false;
      } else if (regex && !regex.test(value)) {
        // Specific error messages for better user experience
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
      // Only dispatch if validation passes
      dispatch(updateProfile(formData));
      navigate("/admin/profile");
    }
  };
 
  // Function to handle changes and clear error for the specific field
  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error for the field as user is typing
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
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // Nicer placeholder
              value={formData[field]}
              disabled={field === "email"}
              // Use the new handler
              onChange={(e) => handleInputChange(e, field)}
              className={`w-full p-3 border rounded-lg dark:bg-slate-800 dark:text-white ${
                errors[field] ? "border-red-500" : "" // Add red border on error
              }`}
            />
            {/* Display error message */}
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
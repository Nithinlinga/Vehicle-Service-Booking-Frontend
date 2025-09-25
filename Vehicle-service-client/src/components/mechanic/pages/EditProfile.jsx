// src/components/EditProfile.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MechanicServices from "../../services/MechanicServices";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";


const EditProfile = () => {
  const {isAuthenticated, user} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    expertise: '',
    availability: '',
    rating: '',
  });

  const navigate = useNavigate();

  // Initial data fetch on component mount
  useEffect(() => {
    if (user?.id) {
      MechanicServices.getMechanicsById(user.id)
        .then((response) => {
          const { name, phone, address, expertise, availability, rating } = response.data;
          setFormData({
            name,
            phone,
            email: user.email,
            address,
            expertise,
            availability,
            rating,
          });
        })
        .catch((error) => {
          console.error("Error fetching mechanic data:", error);
          toast.error("Failed to load profile data.");
        });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    MechanicServices.editMechanics(user.id, formData)
      .then(() => {
        toast.success("Profile updated successfully!");
        navigate("/mechanic/profile");
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error("Failed to update profile.");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter Name"
            value={formData.name || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Phone Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter Phone Number"
            value={formData.phone || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter Email Address"
            value={formData.email || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            readOnly // Email should be read-only if it's tied to the user's login
          />
        </div>

        {/* Address Input */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter Address"
            value={formData.address || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Expertise Input */}
        <div>
          <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</label>
          <input
            id="expertise"
            name="expertise"
            type="text"
            placeholder="Enter Expertise (e.g., Two-Wheelers, Four-Wheelers)"
            value={formData.expertise || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          />
        </div>

        {/* Availability Dropdown */}
        <div>
          <label htmlFor="availability" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Availability</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          >
            <option value="">Select Availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        {/* Rating Dropdown */}
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
          >
            <option value="">Select Rating</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
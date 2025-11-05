import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { getAuthHeader } from "../../../utils/getAuthHeader";

const UserEditProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {

          const response = await UserServices.getUserProfile();
          const profile = response.data;

          const { firstName, lastName, phone, address } = profile;
          setFormData({
            firstName,
            lastName,
            phone,
            email: user.email,
            address
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load profile data.");
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const regex = {
      firstName: /^[a-zA-Z]{2,50}$/,
      lastName: /^[a-zA-Z]{2,50}$/,
      phone: /^\d{10}$/,
      address: /^[a-zA-Z0-9\s,.'-]{5,100}$/
    };

    if (!regex.firstName.test(formData.firstName)) {
      toast.error('Invalid firstName. Only letters, 2–50 characters.');
      return;
    }
    if (!regex.lastName.test(formData.lastName)) {
      toast.error('Invalid lastName. Only letters, 2–50 characters.');
      return;
    }
    if (!regex.phone.test(formData.phone)) {
      toast.error('Invalid phone number. Only 10 digits.');
      return;
    }
    if (!regex.address.test(formData.address)) {
      toast.error('Invalid address. 5–100 characters allowed.');
      return;
    }

    try {
      await UserServices.updateUserProfile(formData);
      toast.success("Profile updated successfully!");
      navigate("/user/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            readOnly
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
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

export default UserEditProfile;

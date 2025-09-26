import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";


const UserEditProfile = () => {
  const {isAuthenticated, user} = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    address: '',
  });

  const navigate = useNavigate();

  // Initial data fetch on component mount
  useEffect(() => {
    if (user?.id) {
      UserServices.getUserById(user.id)
        .then((response) => {
          const { first_name , last_name , phone , email , address } = response.data;
          setFormData({
            first_name,
            last_name,
            phone,
            email: user.email,
            address
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          toast.error("Failed to load profile data.");
        });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = {
      first_name: /^[a-zA-Z]{2,50}$/,
      last_name: /^[a-zA-Z]{2,50}$/,
      phone: /^\d{10}$/,
      address: /^[a-zA-Z0-9\s,.'-]{5,100}$/
    }
    if(!regex.first_name.test(formData.first_name)){
      toast.error('Invalid first name. Only letters, 2–50 characters.');
      return;
    }
    if(!regex.last_name.test(formData.last_name)){
      toast.error('Invalid last name. Only letters, 2–50 characters.');
      return;
    }
    if(!regex.phone.test(formData.phone)){
      toast.error('Invalid phone number. Only 10 numbers');
      return;
    }
    if(!regex.address.test(formData.address)){
      toast.error('Invalid address. At least 5 and at max 100 characters or numbers could be included');
      return;
    }

    UserServices.updateUserById(user.id, formData)
      .then(() => {
        toast.success("Profile updated successfully!");
        navigate("/user/profile");
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
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
          <input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="Enter First Name"
            value={formData.first_name || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
          <input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Enter Last Name"
            value={formData.last_name || ''}
            onChange={handleInputChange}
            className="mt-1 w-full p-3 border rounded-lg dark:bg-slate-700 dark:text-white"
            required
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
            required
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
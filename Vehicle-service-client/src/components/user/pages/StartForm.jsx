import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import UserServices from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const StartForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      }));
    }
  }, [isAuthenticated, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated || !user?.id) {
      toast.error('User not authenticated');
      return;
    }

    const regex = {
      firstName: /^[a-zA-Z]{2,50}$/,
      lastName: /^[a-zA-Z]{2,50}$/,
      address: /^[a-zA-Z0-9\s,.'-]{5,100}$/,
      phone: /^\d{10}$/,
    };

    if (!regex.firstName.test(formData.firstName)) {
      toast.error('Invalid first name. Only letters, 2–50 characters.');
      return;
    }

    if (!regex.lastName.test(formData.lastName)) {
      toast.error('Invalid last name. Only letters, 2–50 characters.');
      return;
    }

    if (!regex.address.test(formData.address)) {
      toast.error('Invalid address. Must be 5–100 characters.');
      return;
    }

    if (!regex.phone.test(formData.phone)) {
      toast.error('Invalid phone number. Must be 10 digits.');
      return;
    }

    const newData = {
      userId: user.id,
      ...formData,
    };

    UserServices.addUser(newData)
    .then(() => {
      console.log(newData);
      toast.success('User profile created successfully!'); 
      navigate('/user/dashboard');
    })
    .catch((error) => {
      console.error('Error submitting user profile:', error);
      toast.error('Submission failed');
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-xl transition-colors duration-500">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white text-center mb-8 transition-colors duration-500">
          Complete Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main St, Anytown"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., 9876543210"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartForm;

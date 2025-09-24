import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import MechanicServices from '../../services/MechanicServices';
import ServiceCenterServices from '../../services/ServiceCenterServices';
import { useNavigate } from 'react-router-dom';
const InitialForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    expertise: '',
    availability: 'Available',
    rating: 'Excellent',
  });

  // State to control the submission message visibility
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);

  // useEffect to set the initial name from local storage on component load
  useEffect(() => {
    const authString = localStorage.getItem('auth');
    if (authString) {
      try {
        const authObject = JSON.parse(authString);
        if (authObject && authObject.username) {
          setFormData((prevData) => ({
            ...prevData,
            name: authObject.username,
          }));
        }
      } catch (error) {
        console.error("Failed to parse auth data from localStorage:", error);
      }
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Handle changes for all form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update local state for all fields
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
  e.preventDefault();

  const authString = localStorage.getItem('auth');
  if (!authString) {
    toast.error('User not authenticated');
    return;
  }

  const authObject = JSON.parse(authString);
  const mechanicId = authObject.id;

  ServiceCenterServices.getServiceCenterById(mechanicId)
    .then((serviceCenterId) => {
      const newData = {
        mechanicId,
        serviceCenterId: serviceCenterId.data.serviceCenterId,
        ...formData,
      };
      return MechanicServices.addMechanics(newData)

      .then((response) => {
        toast.success('Form submitted successfully!');
        localStorage.setItem('profileCompleted', 'true');
        navigate('/mechanic/dashboard');
        // setShowSubmissionMessage(true);
      })
      .catch((error) => {
        console.error('Error submitting mechanic:', error);
        toast.error('Submission failed');
      });

    })
    .catch((error) => {
      console.error('Error submitting form:', error);
      toast.error('Submission failed');
    });
};



  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors duration-500">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-xl transition-colors duration-500">
        <div className="flex justify-end mb-4">
        </div>
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white text-center mb-8 transition-colors duration-500">Complete Your Profile First</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1 transition-colors duration-500">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 transition-colors duration-500"
              required
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1 transition-colors duration-500">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., +1234567890"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 transition-colors duration-500"
              required
            />
          </div>

          {/* Address Field */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1 transition-colors duration-500">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main St, Anytown"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 transition-colors duration-500"
              required
            />
          </div>

          {/* Expertise Field */}
          <div>
            <label htmlFor="expertise" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1 transition-colors duration-500">
              Expertise
            </label>
            <input
              type="text"
              id="expertise"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="e.g., HVAC, Plumbing, Electrical"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 transition-colors duration-500"
              required
            />
          </div>

          {/* Availability Dropdown */}
          <div>
            <label htmlFor="availability" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1 transition-colors duration-500">
              Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-white transition-colors duration-500"
            >
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </select>
          </div>

          {/* Rating Dropdown */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1 transition-colors duration-500">
              Rating
            </label>
            <select
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-white transition-colors duration-500"
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Bad">Bad</option>
            </select>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Custom Submission Message */}
        {showSubmissionMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-500 dark:bg-green-700 text-white px-6 py-4 rounded-lg shadow-lg text-lg font-semibold animate-bounce">
              Form submitted successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InitialForm;

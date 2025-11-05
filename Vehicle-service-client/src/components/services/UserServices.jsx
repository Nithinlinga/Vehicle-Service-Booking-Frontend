import axios from "axios";
import { getAuthHeader } from "../../utils/getAuthHeader";

const api = import.meta.env.VITE_SERVER_URL;

class UserServices {
  // Create user profile
  addUser(userData) {
    return axios.post(`${api}/app2/api/v1/customer`, userData, { headers: getAuthHeader() });
  }

  // View user profile by authenticated ID (no path param, uses headers)
  getUserProfile(headers = {}) {
    return axios.get(`${api}/app2/api/v1/customer`, { headers: getAuthHeader() });
  }

  // Update user profile by authenticated ID (no path param, uses headers)
  updateUserProfile(updatedData) {
    return axios.put(`${api}/app2/api/v1/customer`, updatedData, { headers: getAuthHeader() });
  }
  
  getAllUsers(headers = {}) {
    return axios.get(`${api}/app2/api/v1/customer/all`, { headers: getAuthHeader() });
  }

  // Register a vehicle
  addVehicle(vehicleData) {
    return axios.post(`${api}/app2/api/v1/customer/vehicle`, vehicleData, { headers: getAuthHeader() });
  }
  

  // Update a vehicle by ID
  updateVehicle(vehicleId, vehicleData) {
    return axios.put(`${api}/app2/api/v1/customer/vehicle/${vehicleId}`, vehicleData, { headers: getAuthHeader() });
  }

  // View a vehicle by ID
  getVehicleById(vehicleId) {
    return axios.get(`${api}/app2/api/v1/customer/vehicle/${vehicleId}`, { headers: getAuthHeader() });
  }

  // Get all vehicles for authenticated user
  getAllVehicles() {
    return axios.get(`${api}/app2/api/v1/customer/vehicle`, { headers: getAuthHeader() });
  }
}

export default new UserServices();

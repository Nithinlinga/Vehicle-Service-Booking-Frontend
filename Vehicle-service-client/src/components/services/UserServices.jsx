import axios from "axios";

const api = import.meta.env.VITE_SERVER_URL;

class UserServices {
  // Create user profile
  addUser(userData, headers = {}) {
    return axios.post(`${api}/app2/api/v1/customer`, userData, { headers });
  }

  // View user profile by authenticated ID (no path param, uses headers)
  getUserProfile(headers = {}) {
    return axios.get(`${api}/app2/api/v1/customer`, { headers });
  }

  // Update user profile by authenticated ID (no path param, uses headers)
  updateUserProfile(updatedData, headers = {}) {
    return axios.put(`${api}/app2/api/v1/customer`, updatedData, { headers });
  }
  
  getAllUsers(headers = {}) {
    return axios.get(`${api}/app2/api/v1/customer/all`, { headers });
  }

  // Register a vehicle
  addVehicle(vehicleData, headers = {}) {
    return axios.post(`${api}/app2/api/v1/customer/vehicle`, vehicleData, { headers });
  }
  

  // Update a vehicle by ID
  updateVehicle(vehicleId, vehicleData, headers = {}) {
    return axios.put(`${api}/app2/api/v1/customer/vehicle/${vehicleId}`, vehicleData, { headers });
  }

  // View a vehicle by ID
  getVehicleById(vehicleId, headers = {}) {
    return axios.get(`${api}/app2/api/v1/customer/vehicle/${vehicleId}`, { headers });
  }

  // Get all vehicles for authenticated user
  getAllVehicles(headers = {}) {
    return axios.get(`${api}/app2/api/v1/customer/vehicle`, { headers });
  }
}

export default new UserServices();

import axios from "axios";

const api = "http://localhost:3001/vehicles";

class VehiclesServices {
  addVehicles(credentials) {
    return axios.post(`${api}`, credentials);
  }
  getVehicles() {
    return axios.get(`${api}`);
  }
  getVehiclesByUserId(userId) {
    return axios.get(`${api}/${userId}`);
  }
  getVehicleByRegistrationNumber(registration_number) {
    return axios.get(`${api}/${registration_number}`);
  }
  updateVehicleById(vehicleId, updatedData) {
    return axios.put(`${api}/${vehicleId}`, updatedData);
  }
  patchVehicleByRegistrationNumber(registration_number, updatedData) {
    return axios.patch(`${api}/${registration_number}`, updatedData);
  }
  deleteVehicleById(vehicleId) {
    return axios.delete(`${api}/${vehicleId}`);
  }
}

export default new VehiclesServices();

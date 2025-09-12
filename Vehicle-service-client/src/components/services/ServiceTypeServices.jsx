import axios from "axios";

const api = "http://localhost:3001/serviceTypes";

class ServiceTypeServices {
  getAllServiceTypes() {
    return axios.get(`${api}`);
  }
  addServiceType(data) {
    return axios.post(`${api}`, data);
  }
  updateServiceType(id, updatedData) {
    return axios.put(`${api}/${id}`, updatedData);
  }
  deleteServiceType(id) {
    return axios.delete(`${api}/${id}`);
  }
}

export default new ServiceTypeServices();

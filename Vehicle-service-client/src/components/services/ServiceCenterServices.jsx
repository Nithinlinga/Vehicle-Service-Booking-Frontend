import axios from "axios";

const api = "http://localhost:3001/serviceCenters";

class ServiceCenterServices {
  getServiceCenterById(id) {
    return axios.get(`${api}/${id}`);
  }
  getAllServiceCenters() {
    return axios.get(`${api}`);
  }
  addServiceCenter(data) {
    return axios.post(`${api}`, data);
  }
  updateServiceCenter(id, updatedData) {
    return axios.put(`${api}/${id}`, updatedData);
  }
  deleteServiceCenter(id) {
    return axios.delete(`${api}/${id}`);
  }
}

export default new ServiceCenterServices();

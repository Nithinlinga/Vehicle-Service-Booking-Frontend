import axios from "axios";
import { getAuthHeader } from "../../utils/getAuthHeader";

const BASE = import.meta.env.VITE_SERVER_URL;
const SERVICE_CENTER = `${BASE}/app3/api/v1/center`;

class ServiceCenterServices {
  getServiceCenterById(id) {
    return axios.get(`${SERVICE_CENTER}/${id}`, {
      headers: getAuthHeader()
    });
  }

  getAllServiceCenters() {
    return axios.get(`${SERVICE_CENTER}`, {
      headers: getAuthHeader()
    });
  }

  addServiceCenter(data) {
    return axios.post(`${SERVICE_CENTER}`, data, {
      headers: getAuthHeader()
    });
  }

  updateServiceCenter(id, updatedData) {
    return axios.put(`${SERVICE_CENTER}/${id}`, updatedData, {
      headers: getAuthHeader()
    });
  }

  deleteServiceCenter(id) {
    return axios.delete(`${SERVICE_CENTER}/${id}`, {
      headers: getAuthHeader()
    });
  }
  addServiceType(centerId, data) {
    return axios.post(`${SERVICE_CENTER}/${centerId}/service`, data, {
      headers: getAuthHeader()
    });
  }
}

export default new ServiceCenterServices();

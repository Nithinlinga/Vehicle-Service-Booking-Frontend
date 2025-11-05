import axios from "axios";
import { getAuthHeader } from "../../utils/getAuthHeader";

const BASE = import.meta.env.VITE_SERVER_URL;
const SERVICE_TYPE_API = `${BASE}/app3/api/v1/center/`;


class ServiceTypeServices {
  getAllServiceTypes(centerId) {
    return axios.get(`${SERVICE_TYPE_API}/${centerId}/service`, {
      headers: getAuthHeader()
    });
  }

  getServiceTypeById(centerId, typeId) {
    return axios.get(`${SERVICE_TYPE_API}/${centerId}/service/${typeId}`, {
      headers: getAuthHeader()
    });
  }

  addServiceType(centerId, data) {
    return axios.post(`${SERVICE_TYPE_API}/${centerId}/service`, data, {
      headers: getAuthHeader()
    });
  }

  updateServiceType(centerId, typeId, updatedData) {
    return axios.put(`${SERVICE_TYPE_API}/${centerId}/service/${typeId}`, updatedData, {
      headers: getAuthHeader()
    });
  }

  deleteServiceType(centerId, typeId) {
    return axios.delete(`${SERVICE_TYPE_API}/${centerId}/service/${typeId}`, {
      headers: getAuthHeader()
    });
  }
}

export default new ServiceTypeServices();

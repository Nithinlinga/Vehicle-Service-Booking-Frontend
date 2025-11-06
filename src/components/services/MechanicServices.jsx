import axios from "axios";
import { getAuthHeader } from "../../utils/getAuthHeader";

const api = import.meta.env.VITE_SERVER_URL + "/app4/api/v1/mechanic";

class MechanicServices {
  // Create mechanic profile
  addMechanic(mechanicData) {
    return axios.post(`${api}`, mechanicData, { headers: getAuthHeader() });
  }

  // Update mechanic profile by authenticated ID
  updateMechanic(mechanicData) {
    return axios.put(`${api}`, mechanicData, { headers: getAuthHeader() });
  }

  // Get mechanic profile by authenticated ID
  getMechanic() {
    return axios.get(`${api}`, { headers: getAuthHeader() });
  }

  // Get mechanic profile by authenticated ID
  getAllMechanics() {
    return axios.get(`${api}/all`, { headers: getAuthHeader() });
  }

  // Update mechanic's service center (admin only)
  updateMechanicCenter(mechanicAuthId, centerId,status) {
    return axios.patch(`${api}/center`, {
      mechanicAuthId,
      centerId,
      status
    }, { headers: getAuthHeader() });
  }

  // Update mechanic verification status (admin only)
  updateVerificationStatus(mechanicAuthId, isVerified) {
    return axios.patch(`${api}/verify`, {
      mechanicAuthId,
      isVerified
    }, { headers: getAuthHeader() });
  }
}

export default new MechanicServices();

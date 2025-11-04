import axios from "axios";

const api = import.meta.env.VITE_SERVER_URL + "/api/v1/mechanic";

class MechanicServices {
  // Create mechanic profile
  addMechanic(mechanicData, headers = {}) {
    return axios.post(`${api}`, mechanicData, { headers });
  }

  // Update mechanic profile by authenticated ID
  updateMechanic(mechanicData, headers = {}) {
    return axios.put(`${api}`, mechanicData, { headers });
  }

  // Get mechanic profile by authenticated ID
  getMechanic(headers = {}) {
    return axios.get(`${api}`, { headers });
  }

  // Update mechanic's service center (admin only)
  updateMechanicCenter(mechanicAuthId, centerId, headers = {}) {
    return axios.patch(`${api}/center`, {
      mechanicAuthId,
      centerId,
    }, { headers });
  }

  // Update mechanic verification status (admin only)
  updateVerificationStatus(mechanicAuthId, isVerified, headers = {}) {
    return axios.patch(`${api}/verify`, {
      mechanicAuthId,
      isVerified,
    }, { headers });
  }
}

export default new MechanicServices();

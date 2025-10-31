import axios from "axios";


const api = import.meta.env.VITE_AUTH_URL;

class UserServices {
  addUser(userData) {
    return axios.post(`${api}/app2/api/users`, userData);
  }
  getAllUsers() {
    return axios.get(`${api}`);
  }
  getUserById(userId) {
    return axios.get(`${api}/${userId}`);
  }
  updateUserById(userId, updatedData) {
    return axios.put(`${api}/${userId}`, updatedData);
  }
  updateUserStatus(userId, status) {
    return axios.patch(`${api}/${userId}/status`, { status });
  }
  deleteUserById(userId) {
    return axios.delete(`${api}/${userId}`);
  }
}

export default new UserServices();

import axios from "axios";

const api = "http://localhost:3001/users";

class UserServices {
  addUser(userData) {
    return axios.post(`${api}`, userData);
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

import axios from "axios";

const api = "http://localhost:3001/booking";

class BookingServices {
  addBooking(credentials) {
    return axios.post(`${api}`, credentials);
  }

  getAllBookings() {
    return axios.get(`${api}`);
  }

  getBookingById(bookingId) {
    return axios.get(`${api}/${bookingId}`);
  }

  getBookingsByUserId(userId) {
    return axios.get(`${api}/user/${userId}`);
  }

  getBookingsByVehicleId(vehicleId) {
    return axios.get(`${api}/vehicle/${vehicleId}`);
  }

  getBookingsByServiceCenterId(serviceCenterId) {
    return axios.get(`${api}/service/${serviceCenterId}`);
  }

  updateBookingById(bookingId, updatedData) {
    return axios.put(`${api}/${bookingId}`, updatedData);
  }

  patchBookingById(bookingId, updatedData) {
    return axios.patch(`${api}/${bookingId}`, updatedData);
  }

  deleteBookingById(bookingId) {
    return axios.delete(`${api}/${bookingId}`);
  }
}

export default new BookingServices();

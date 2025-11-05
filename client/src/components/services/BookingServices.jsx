import axios from "axios";
import { getAuthHeader } from "../../utils/getAuthHeader";

const BASE = import.meta.env.VITE_SERVER_URL;
const BOOKINGS = `${BASE}/app5/v1/bookings`;

class BookingServices {
  addBooking(credentials) {
    return axios.post(`${BOOKINGS}`, credentials, { headers: getAuthHeader() });
  }

  getAllBookings() {
  return axios.get(`${BOOKINGS}`, {headers: getAuthHeader()});
}


  getBookingById(bookingId, ) {
  return axios.get(`${api}/${bookingId}`, { headers: getAuthHeader() });
}


  deleteBookingById(bookingId) {
  return axios.delete(`${BOOKINGS}/${bookingId}`, {
    headers: getAuthHeader()
  });
}

patchBookingVerifyById(bookingId, verify, role) {
  return axios.patch(`${api}/${bookingId}/verify`, verify, {});
}

}

export default new BookingServices();

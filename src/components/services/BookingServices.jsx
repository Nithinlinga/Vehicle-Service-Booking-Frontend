import axios from "axios";
import { getAuthHeader } from "../../utils/getAuthHeader";

const BASE = import.meta.env.VITE_SERVER_URL;
const BOOKINGS = `${BASE}/app5/api/v1/bookings`;

class BookingServices {
  addBooking(credentials) {
    return axios.post(`${BOOKINGS}`, credentials, { headers: getAuthHeader() });
  }

  getAllBookings() {
    return axios.get(`${BOOKINGS}`, { headers: getAuthHeader() });
  }



  getAllBookingsByAdmin() {
    return axios.get(`${BOOKINGS}/all`, { headers: getAuthHeader() });
  }
  getBookingById(bookingId,) {
    return axios.get(`${api}/${bookingId}`, { headers: getAuthHeader() });
  }


  deleteBookingById(bookingId) {
    return axios.delete(`${BOOKINGS}/${bookingId}`, {
      headers: getAuthHeader()
    });
  }

  patchBookingVerifyById(bookingId, verify) {
    return axios.patch(`${BOOKINGS}/${bookingId}/verify`, verify, {headers: getAuthHeader() });
  }

}

export default new BookingServices();

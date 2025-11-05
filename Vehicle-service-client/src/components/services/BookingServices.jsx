import axios from "axios";

const BASE = import.meta.env.VITE_SERVER_URL;
const BOOKINGS = `${BASE}/app5/v1/bookings`;

class BookingServices {
  addBooking(credentials, headers) {
    return axios.post(`${BOOKINGS}`, credentials, { headers });
  }

  getAllBookings(headers) {
  return axios.get(`${BOOKINGS}`, {headers});
}


  getBookingById(bookingId, headers) {
  return axios.get(`${api}/${bookingId}`, {
    headers: {
      ...headers
    }
  });
}


  deleteBookingById(bookingId, headers) {
  return axios.delete(`${BOOKINGS}/${bookingId}`, {
    headers
  });
}

patchBookingVerifyById(bookingId, verify, role) {
  return axios.patch(`${api}/${bookingId}/verify`, verify, {
    headers: {
      "X-Role": role
    }
  });
}

}

export default new BookingServices();

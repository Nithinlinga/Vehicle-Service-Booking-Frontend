// utils/jwtUtils.js
import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};

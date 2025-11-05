// src/utils/authHeader.js
export const getAuthHeader = () => {
  const token = sessionStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

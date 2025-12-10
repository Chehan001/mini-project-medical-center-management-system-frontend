import axios from "axios";
import API_ROOT from "../services/api";

// Public API for authentication (login)
export const adminAuthApi = axios.create({
  baseURL: `${API_ROOT}/api/auth`,
});

// Protected admin API (needs JWT)
export const adminApi = axios.create({
  baseURL: `${API_ROOT}/api/admin`,
});

// Attach token to protected API requests
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default adminAuthApi;

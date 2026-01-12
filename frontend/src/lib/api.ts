import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor untuk handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, hapus dari localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        // Optional: redirect ke login
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";
import { tokenRefresh } from "./jwt/jwtConfig";

// Get the base URL from environment variables
const localBaseUrl = import.meta.env.VITE_LOCAL_BASE_URL;
const liveBaseUrl = import.meta.env.VITE_LIVE_BASE_URL;

const BASE_URL = import.meta.env.VITE_BASE_URL;

if (!BASE_URL) {
  throw new Error("Missing VITE_BASE_URL");
}

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Axios Request Interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios Response Interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await tokenRefresh();

      return axiosInstance(originalRequest); // retry request
    }

    return Promise.reject(error);
  },
);

// API connector function
export const apiConnector = async (
  method,
  endpoint,
  data = null,
  headers = {},
  params = {},
) => {
  try {
    const response = await axiosInstance.request({
      method,
      url: endpoint,
      data,
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

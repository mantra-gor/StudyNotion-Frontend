import axios from "axios";
import { tokenRefresh } from "./jwt/jwtConfig";

// Get the base URL from environment variables
const localBaseUrl = import.meta.env.VITE_LOCAL_BASE_URL;
// const liveBaseUrl = import.meta.env.VITE_LIVE_BASE_URL;

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: localBaseUrl,
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
  }
);

// Axios Response Interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      console.log("Invalid or Expired Token!");
      await tokenRefresh();
    }
    return Promise.reject(error);
  }
);

// API connector function
export const apiConnector = async (
  method,
  endpoint,
  data = null,
  headers = {},
  params = {}
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

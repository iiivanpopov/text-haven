import axios from "axios";
import { AuthResponse } from "@/api/types";

const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config?._isRetry == false) {
      originalRequest._isRetry = true;
      const response = await axios.get<AuthResponse>(`/api/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.accessToken);
      return $api.request(originalRequest);
    }
    throw error;
  },
);

export default $api;

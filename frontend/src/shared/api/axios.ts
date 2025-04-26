import axios from "axios";
import type { AuthResponse } from "@features/auth/types";
import { setAccessToken } from "@shared/lib/local-storage";

const $axios = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

$axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${process.env.API_URL}/refresh`,
          { withCredentials: true },
        );
        setAccessToken(response.data);
        return $axios.request(originalRequest);
      } catch (e) {
        console.log("Unauthorized");
      }
    }
    throw error;
  },
);

export default $axios;

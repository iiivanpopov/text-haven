import axios from "axios";
import { AuthResponse } from "@/api/types";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const accessTokenKey = "accessToken";

export const publicApi = axios.create({
  baseURL,
});

const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem(accessTokenKey);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await publicApi.get<AuthResponse>("refresh", {
          withCredentials: true,
        });

        localStorage.setItem(accessTokenKey, data.accessToken);

        return authApi(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem(accessTokenKey);
      }
    }

    throw error;
  },
);

export default authApi;

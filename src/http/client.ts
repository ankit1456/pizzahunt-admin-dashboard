import { useAuth } from "@src/state/store";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;

const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/api/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const headers = { ...originalRequest.headers };

        await refreshToken();
        return api.request({ ...originalRequest, headers });
      } catch (error) {
        useAuth.getState().logoutFromStore();
        return Promise.reject(error as Error);
      }
    }

    return Promise.reject(error as Error);
  }
);

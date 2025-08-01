import axios from "axios";
import { ApiError, TypedAxiosInstance } from "./type-wrapper";
import Config from "../config";

const axiosObject = axios.create({ baseURL: Config.API_BASE_URL });

axiosObject.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers.Authorization = jwt;
  } else {
    config.headers.Authorization = undefined;
  }

  return config;
});

axiosObject.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const errorType = error.response?.data?.error;

    if (
      errorType === "NoJWT" ||
      errorType === "ExpiredJWT" ||
      errorType === "InvalidJWT"
    ) {
      localStorage.removeItem("jwt");
      const currentPath =
        window.location.pathname +
        window.location.search +
        window.location.hash;
      window.location.href = `/auth/refresh?redirect=${encodeURIComponent(currentPath)}`;
      return;
    }

    console.error("API error:", error);

    return Promise.reject(error);
  }
);

const api: TypedAxiosInstance = {
  get: (url, config) => axiosObject.get(url as string, config),
  post: (url, data, config) => axiosObject.post(url as string, data, config),
  put: (url, data, config) => axiosObject.put(url as string, data, config),
  patch: (url, data, config) => axiosObject.patch(url as string, data, config),
  delete: (url, config) => axiosObject.delete(url as string, config)
};

export default api;

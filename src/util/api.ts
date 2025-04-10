import axios from "axios";
import { Config } from "../config";

const api = axios.create({ baseURL: Config.API_BASE_URL });

api.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers.Authorization = jwt;
  } else {
    config.headers.Authorization = undefined;
  }

  return config;
})

api.interceptors.response.use(
  response => response,
  error => {
    const errorType = error.response.data.error;

    if (errorType === "NoJWT" || errorType === "ExpiredJWT" || errorType === "InvalidJWT") {
      localStorage.removeItem("jwt");
      window.location.href = "/auth";
    }

    return error;
  }
);

export default api;
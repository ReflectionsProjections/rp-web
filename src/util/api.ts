import axios from "axios";
import { Config } from "../config";

const api = axios.create({ baseURL: Config.API_BASE_URL });

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
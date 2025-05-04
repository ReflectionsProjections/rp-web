import axios from "axios";
import { TypedAxiosInstance } from "./type-wrapper";

function createApi(baseURL: string): TypedAxiosInstance {
  const axiosObject = axios.create({ baseURL });

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
    (error: { response: { data: string } }) => {
      const errorType = error.response.data;

      if (
        errorType === "NoJWT" ||
        errorType === "ExpiredJWT" ||
        errorType === "InvalidJWT"
      ) {
        localStorage.removeItem("jwt");
        window.location.href = "/auth";
      }

      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
      return Promise.reject(error);
    }
  );

  return {
    get: (url, config) => axiosObject.get(url as string, config),
    post: (url, data, config) => axiosObject.post(url as string, data, config),
    put: (url, data, config) => axiosObject.put(url as string, data, config),
    patch: (url, data, config) =>
      axiosObject.patch(url as string, data, config),
    delete: (url, config) => axiosObject.delete(url as string, config)
  };
}

export default createApi;

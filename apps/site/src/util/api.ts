import { Config, createApi } from "@rp/shared";

const api = createApi(Config.API_BASE_URL, () => {
  localStorage.removeItem("jwt");
  window.location.href = "/login";
});

export default api;

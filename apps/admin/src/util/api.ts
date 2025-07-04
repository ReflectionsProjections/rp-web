import { Config, createApi } from "@rp/shared";
import { googleAuth } from "@rp/shared";

const api = createApi(Config.API_BASE_URL, () => {
  localStorage.removeItem("jwt");
  googleAuth(Config.GOOGLE_OAUTH_CLIENT_ID);
});

export default api;

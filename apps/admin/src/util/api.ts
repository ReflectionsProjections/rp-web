import { Config } from "@/config";
import { createApi } from "@rp/shared";

const api = createApi(Config.API_BASE_URL);

export default api;

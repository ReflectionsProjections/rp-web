import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  server: {
    port: 3004,
    allowedHosts: ["rp.rthak.com"]
  },
  plugins: [react()],
  envDir: resolve(__dirname, "../.."),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@rp/shared": resolve(__dirname, "../../shared/src")
    }
  }
});
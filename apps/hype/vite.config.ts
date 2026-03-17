import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3004
  },
  plugins: [react()],
  envPrefix: ["VITE_", "ENV"],
  envDir: resolve(__dirname, "../.."),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@rp/shared": resolve(__dirname, "../../shared/src")
    }
  }
});

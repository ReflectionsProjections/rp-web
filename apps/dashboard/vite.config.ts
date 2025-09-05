import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { resolve } from "path";

// https://vitejs.dev/config/
/// <reference types="vite-plugin-svgr/client" />
export default defineConfig({
  server: {
    port: 3006
  },
  plugins: [react(), svgr()],
  envDir: resolve(__dirname, "../.."),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@rp/shared": resolve(__dirname, "../../shared/src")
    }
  }
});

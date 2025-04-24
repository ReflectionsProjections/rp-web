import { defineConfig } from "eslint/config";
import root from "../eslint.config.mjs";

export default defineConfig([
  root,
  {
    ignores: ["**/dist", "eslint.config.mjs"]
  }
]);

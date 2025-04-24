import { defineConfig } from "eslint/config";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  reactHooks.configs["recommended-latest"],
  {
    plugins: {
      "react-refresh": reactRefresh
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true
        }
      ]
    }
  }
]);

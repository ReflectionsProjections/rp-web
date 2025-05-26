import { z } from "zod";

interface ImportMetaEnv {
  VITE_ENV?: "PRODUCTION" | "DEVELOPMENT" | "TESTING";
  VITE_DEV_JWT?: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

// Validation
const envSchema = z
  .object({
    VITE_ENV: z.enum(["PRODUCTION", "DEVELOPMENT", "TESTING"]).optional(),
    VITE_DEV_JWT: z.string().optional()
  })
  .passthrough();

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error(
    "Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  throw new Error("Environment validation failed.");
}

const env = parsed.data;

const isDefined = env.VITE_ENV !== undefined;

const isProduction = !!env.VITE_DEV_JWT || env.VITE_ENV === "PRODUCTION";

const IS_DEV = isDefined && !isProduction;

const API_BASE_URL = IS_DEV
  ? "http://localhost:3000"
  : "https://api.reflectionsprojections.org";

const Config = {
  ENV: env.VITE_ENV,
  API_BASE_URL,
  EVENT_TYPES: [
    "SPEAKER",
    "CORPORATE",
    "SPECIAL",
    "PARTNERS",
    "MEALS",
    "CHECKIN"
  ] as const,
  DEV_JWT: env.VITE_DEV_JWT
};

export default Config;

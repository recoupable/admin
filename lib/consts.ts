export const IS_PROD = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export const API_BASE_URL = IS_PROD
  ? "https://recoup-api.vercel.app"
  : "https://test-recoup-api.vercel.app";

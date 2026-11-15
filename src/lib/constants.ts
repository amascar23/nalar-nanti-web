export const LIVE_SITE_URL = "https://nalar-nanti-web.vercel.app";

/**
 * Menghasilkan base URL untuk tautan berbagi (WhatsApp, Amplop, Salin).
 * Di lingkungan browser non-localhost, menggunakan window.location.origin aktif.
 * Di localhost atau server SSR, menggunakan domain publik live Vercel.
 */
export function getShareBaseUrl(): string {
  if (typeof window !== "undefined" && window.location.origin) {
    const origin = window.location.origin;
    if (!origin.includes("localhost") && !origin.includes("127.0.0.1")) {
      return origin;
    }
  }
  return LIVE_SITE_URL;
}

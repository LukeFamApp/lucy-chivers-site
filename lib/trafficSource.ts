import { TRAFFIC_SOURCES, type TrafficSource } from "@/lib/series";

/**
 * Remembers which bio link a visitor arrived from (?from=tiktok / ?from=instagram)
 * for the rest of their visit, so the buy buttons can use that platform's Amazon
 * Attribution tag. Storage can be blocked (private windows, strict settings), so
 * every access is guarded and the fallback is always "website".
 */
const STORAGE_KEY = "lc_traffic_source";

function isTrafficSource(value: string | null): value is TrafficSource {
  return value !== null && (TRAFFIC_SOURCES as string[]).includes(value);
}

/** Read ?from= off the current URL and remember it for this visit. */
export function captureTrafficSource(): void {
  try {
    const from = new URLSearchParams(window.location.search).get("from")?.toLowerCase() ?? null;
    if (isTrafficSource(from)) sessionStorage.setItem(STORAGE_KEY, from);
  } catch {
    // Storage unavailable: buttons fall back to the website tag.
  }
}

/**
 * The source for this visit: ?from= on the current URL wins (covers landing
 * straight on a book page), then the remembered value, then "website".
 * Read-only, so it is safe to call during render.
 */
export function readTrafficSource(): TrafficSource {
  try {
    const fromUrl =
      new URLSearchParams(window.location.search).get("from")?.toLowerCase() ?? null;
    if (isTrafficSource(fromUrl)) return fromUrl;
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (isTrafficSource(stored)) return stored;
  } catch {
    // Fall through.
  }
  return "website";
}

import "server-only";
import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE_NAME = "lc_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set in the environment.");
  }
  return new TextEncoder().encode(secret);
}

/** Creates a signed, expiring JWT for the admin session cookie. */
export async function createAdminSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(getSecret());
}

/** Verifies a session token. Returns true only if it's valid and unexpired. */
export async function verifyAdminSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export const ADMIN_COOKIE_MAX_AGE = SESSION_TTL_SECONDS;

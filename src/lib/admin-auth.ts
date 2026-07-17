import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "shopverse_admin";

function secretKey() {
  const secret =
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "shopverse-dev-secret-change-me";
  return new TextEncoder().encode(secret);
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "shopverse123";
}

export async function createAdminToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifyAdminToken(token: string | undefined) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return verifyAdminToken(jar.get(ADMIN_COOKIE)?.value);
}

export function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    // still walk to reduce obvious timing leaks a bit
    let out = 0;
    for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ 0;
    return false;
  }
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

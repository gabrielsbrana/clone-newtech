import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const cookieName = "newtech_admin";
const duration = 60 * 60 * 8;
export function configured() {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_SESSION_SECRET && process.env.BLOB_READ_WRITE_TOKEN);
}
function key() {
  if (!process.env.ADMIN_SESSION_SECRET) throw new Error("Admin não configurado.");
  return new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);
}
export function validPassword(password: unknown) {
  if (typeof password !== "string" || password.length > 256) return false;
  const [salt, hash] = (process.env.ADMIN_PASSWORD_HASH || "").split(":");
  if (!salt || !hash || !/^[a-f0-9]{128}$/.test(hash)) return false;
  return timingSafeEqual(scryptSync(password, salt, 64), Buffer.from(hash, "hex"));
}
export async function authenticated(req: VercelRequest) {
  try {
    const token = req.cookies?.[cookieName];
    if (!token || !configured()) return false;
    await jwtVerify(token, key(), { algorithms: ["HS256"], issuer: "newtech", audience: "gallery-admin" });
    return true;
  } catch { return false; }
}
export async function createSession(res: VercelResponse) {
  const token = await new SignJWT({ nonce: randomBytes(16).toString("hex") })
    .setProtectedHeader({ alg: "HS256" }).setIssuer("newtech").setAudience("gallery-admin")
    .setIssuedAt().setExpirationTime(`${duration}s`).sign(key());
  res.setHeader("Set-Cookie", `${cookieName}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=${duration}`);
}
export function clearSession(res: VercelResponse) {
  res.setHeader("Set-Cookie", `${cookieName}=; HttpOnly; Secure; SameSite=Strict; Path=/api; Max-Age=0`);
}
export function sameOrigin(req: VercelRequest) {
  try {
    return new URL(req.headers.origin || "").host === req.headers.host && req.headers["x-newtech-admin"] === "1";
  } catch { return false; }
}
export function secureHeaders(res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
}

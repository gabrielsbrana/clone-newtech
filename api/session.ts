import type { VercelRequest, VercelResponse } from "@vercel/node";
import { authenticated, configured, validPassword, createSession, clearSession, sameOrigin, secureHeaders } from "../server/auth.js";

// This per-instance limit complements the generated high-entropy password.
const attempts = new Map<string, { count: number; until: number }>();
export default async function handler(req: VercelRequest, res: VercelResponse) {
  secureHeaders(res);
  if (req.method === "GET") return res.json({ authenticated: await authenticated(req), configured: configured() });
  if (!["POST", "DELETE"].includes(req.method || "")) return res.status(405).end();
  if (!sameOrigin(req)) return res.status(403).json({ error: "Origem inválida." });
  if (req.method === "DELETE") { clearSession(res); return res.json({ ok: true }); }
  if (!configured()) return res.status(503).json({ error: "O acesso administrativo ainda não foi configurado." });
  const ip = String(req.headers["x-vercel-forwarded-for"] || req.headers["x-forwarded-for"] || "unknown").split(",")[0];
  const now = Date.now();
  for (const [id, entry] of attempts) if (entry.until < now) attempts.delete(id);
  const entry = attempts.get(ip) || { count: 0, until: now + 15 * 60_000 };
  if (entry.count >= 5) { res.setHeader("Retry-After", String(Math.ceil((entry.until - now) / 1000))); return res.status(429).json({ error: "Muitas tentativas. Aguarde 15 minutos." }); }
  entry.count++; attempts.set(ip, entry);
  if (!validPassword(req.body?.password)) {
    await new Promise((resolve) => setTimeout(resolve, 750));
    return res.status(401).json({ error: "Senha incorreta." });
  }
  attempts.delete(ip);
  await createSession(res);
  return res.json({ ok: true });
}

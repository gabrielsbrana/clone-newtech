import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put } from "@vercel/blob";
import sharp from "sharp";
import { randomUUID } from "node:crypto";
import { authenticated, sameOrigin, secureHeaders } from "../server/auth.js";

export const config = { api: { bodyParser: false } };
export default async function handler(req: VercelRequest, res: VercelResponse) {
  secureHeaders(res);
  if (req.method !== "POST") return res.status(405).end();
  if (!sameOrigin(req) || !await authenticated(req)) return res.status(401).json({ error: "Entre novamente para enviar fotos." });
  if (!["image/jpeg", "image/png", "image/webp"].includes(String(req.headers["content-type"]))) return res.status(415).json({ error: "Envie uma imagem JPG, PNG ou WebP." });
  try {
    const chunks: Buffer[] = []; let size = 0;
    for await (const chunk of req) {
      size += chunk.length;
      if (size > 4 * 1024 * 1024) return res.status(413).json({ error: "A foto deve ter até 4 MB após a otimização." });
      chunks.push(Buffer.from(chunk));
    }
    const image = await sharp(Buffer.concat(chunks), { limitInputPixels: 40_000_000 }).rotate().resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
    const id = randomUUID();
    const blob = await put(`newtech/images/${id}.webp`, image, { access: "public", addRandomSuffix: false, contentType: "image/webp" });
    return res.json({ id, url: blob.url, alt: "" });
  } catch {
    return res.status(400).json({ error: "Não foi possível enviar a foto. Confirme o formato e tente novamente." });
  }
}

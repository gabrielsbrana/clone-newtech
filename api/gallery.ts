import type { VercelRequest, VercelResponse } from "@vercel/node";
import { list, put, head, BlobPreconditionFailedError } from "@vercel/blob";
import { gallerySchema } from "../shared/gallery.js";
import { authenticated, sameOrigin, secureHeaders } from "../server/auth.js";

const manifest = "newtech/gallery.json";
export default async function handler(req: VercelRequest, res: VercelResponse) {
  secureHeaders(res);
  try {
    if (req.method === "GET") {
      if (!process.env.BLOB_READ_WRITE_TOKEN) return res.json({ vehicles: null, revision: null });
      const { blobs } = await list({ prefix: manifest, limit: 1 });
      if (!blobs.length) return res.json({ vehicles: null, revision: null });
      const metadata = await head(blobs[0].url);
      const response = await fetch(`${blobs[0].url}?revision=${encodeURIComponent(metadata.etag)}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Falha ao carregar galeria.");
      const gallery = gallerySchema.parse(await response.json());
      const admin = await authenticated(req);
      return res.json({ vehicles: admin ? gallery.vehicles : gallery.vehicles.filter((v) => v.published), revision: admin ? metadata.etag : null });
    }
    if (req.method !== "PUT") return res.status(405).end();
    if (!sameOrigin(req) || !await authenticated(req)) return res.status(401).json({ error: "Entre novamente para salvar." });
    const parsed = gallerySchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.issues[0]?.message || "Galeria inválida." });
    // Only this store's uploaded images or the shipped assets may be published.
    const known = new Set<string>();
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: "newtech/images/", limit: 1000, cursor });
      page.blobs.forEach((blob) => known.add(blob.url));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    if (parsed.data.vehicles.some((v) => v.images.some((i) => i.url.startsWith("https:") && !known.has(i.url)))) return res.status(400).json({ error: "Uma das fotos não pertence a esta galeria." });
    const revision = typeof req.body.revision === "string" ? req.body.revision : undefined;
    const saved = await put(manifest, JSON.stringify(parsed.data), {
      access: "public", addRandomSuffix: false, allowOverwrite: Boolean(revision),
      ...(revision ? { ifMatch: revision } : {}), contentType: "application/json", cacheControlMaxAge: 60,
    });
    return res.json({ ok: true, revision: saved.etag });
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError || (error instanceof Error && /already exists|already exist/i.test(error.message))) return res.status(409).json({ error: "A galeria foi alterada em outra sessão. Recarregue antes de salvar." });
    console.error("Gallery operation failed", error instanceof Error ? error.message : "unknown");
    return res.status(503).json({ error: "Não foi possível acessar a galeria. Tente novamente." });
  }
}

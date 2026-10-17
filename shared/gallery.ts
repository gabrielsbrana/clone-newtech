import { z } from "zod";

export const imageSchema = z.object({
  id: z.string().min(1).max(100),
  url: z.string().max(2048).refine((url) => /^\/assets\/[a-zA-Z0-9_.-]+$/.test(url) || /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/newtech\/images\/[a-zA-Z0-9_.-]+$/.test(url)),
  alt: z.string().trim().max(200),
});
export const vehicleSchema = z.object({
  id: z.string().min(1).max(100),
  caption: z.string().trim().min(1, "Informe o nome do veículo.").max(160),
  published: z.boolean(),
  images: z.array(imageSchema).min(1, "Adicione pelo menos uma foto.").max(30),
});
export const gallerySchema = z.object({
  vehicles: z.array(vehicleSchema).max(60),
}).superRefine(({ vehicles }, ctx) => {
  if (new Set(vehicles.map((v) => v.id)).size !== vehicles.length) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Veículos duplicados." });
  }
});
export type GalleryImage = z.infer<typeof imageSchema>;
export type Vehicle = z.infer<typeof vehicleSchema>;
export type Gallery = z.infer<typeof gallerySchema>;

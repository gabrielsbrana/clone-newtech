import { useQuery } from "@tanstack/react-query";
import { defaultVehicles } from "@/lib/default-gallery";
import type { Vehicle } from "../../shared/gallery";

export async function adminRequest(path: string, options: RequestInit = {}) {
  const response = await fetch(path, { ...options, headers: { "X-Newtech-Admin": "1", ...options.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Não foi possível concluir a operação.");
  return data;
}
export function useGallery() {
  const query = useQuery({
    queryKey: ["gallery"],
    queryFn: async (): Promise<{ vehicles: Vehicle[]; revision: string | null }> => {
      const response = await fetch("/api/gallery", { cache: "no-store" });
      if (!response.ok) throw new Error("Não foi possível carregar a galeria.");
      const data = await response.json();
      return { vehicles: data.vehicles ?? defaultVehicles, revision: data.revision };
    },
    staleTime: 30_000,
  });
  return { ...query, vehicles: query.data?.vehicles ?? defaultVehicles };
}

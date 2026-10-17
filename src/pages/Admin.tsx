import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Camera, Check, Eye, EyeOff, ImagePlus, Loader2, LogOut, Plus, Save, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { adminRequest } from "@/hooks/useGallery";
import { defaultVehicles } from "@/lib/default-gallery";
import { gallerySchema, type GalleryImage, type Vehicle } from "../../shared/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function move<T>(items: T[], from: number, to: number) {
  if (to < 0 || to >= items.length) return items;
  const result = [...items]; const [item] = result.splice(from, 1); result.splice(to, 0, item); return result;
}
async function optimize(file: File): Promise<Blob> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Use fotos JPG, PNG ou WebP.");
  if (file.size > 25 * 1024 * 1024) throw new Error("Cada foto original deve ter até 25 MB.");
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d"); if (!context) throw new Error("Seu navegador não conseguiu preparar a foto.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Falha ao preparar foto.")), "image/webp", 0.85));
    if (blob.size > 4 * 1024 * 1024) throw new Error("Foto muito grande. Reduza a resolução e tente novamente.");
    return blob;
  } finally { bitmap.close(); }
}

export default function Admin() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [revision, setRevision] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState("");
  const vehicle = vehicles.find((v) => v.id === selected);

  async function load() {
    const data = await adminRequest("/api/gallery");
    const entries = data.vehicles ?? defaultVehicles;
    setVehicles(entries); setSelected(entries[0]?.id ?? null); setRevision(data.revision); setDirty(false);
  }
  useEffect(() => {
    const robots = document.createElement("meta"); robots.name = "robots"; robots.content = "noindex,nofollow"; document.head.appendChild(robots);
    document.title = "Gestão de veículos | Newtech";
    adminRequest("/api/session").then(async (session) => {
      setConfigured(session.configured); if (session.authenticated) { await load(); setLoggedIn(true); }
    }).catch((e) => setError(e.message)).finally(() => setChecking(false));
    return () => { robots.remove(); };
  }, []);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty || uploading) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn); return () => window.removeEventListener("beforeunload", warn);
  }, [dirty, uploading]);
  function edit(next: Vehicle[]) { setVehicles(next); setDirty(true); }
  function patch(updates: Partial<Vehicle>) { edit(vehicles.map((v) => v.id === selected ? { ...v, ...updates } : v)); }
  async function login(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      await adminRequest("/api/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      setPassword(""); await load(); setLoggedIn(true);
    } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  async function save() {
    const result = gallerySchema.safeParse({ vehicles });
    if (!result.success) { toast.error(result.error.issues[0]?.message || "Revise os veículos."); return; }
    setBusy(true);
    try {
      const data = await adminRequest("/api/gallery", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...result.data, revision }) });
      setRevision(data.revision); setDirty(false); toast.success("Galeria publicada no site.");
    } catch (e) { toast.error((e as Error).message); } finally { setBusy(false); }
  }
  async function uploadPhotos(files: FileList | null, target: Vehicle, replace?: number) {
    if (!files?.length) return;
    const remaining = replace === undefined ? 30 - target.images.length : 1;
    if (files.length > remaining) { toast.error("Cada veículo aceita até 30 fotos."); return; }
    setUploading(target.id);
    try {
      for (const file of Array.from(files)) {
        const optimized = await optimize(file);
        const photo: GalleryImage = await adminRequest("/api/upload", { method: "POST", headers: { "Content-Type": optimized.type }, body: optimized });
        photo.alt = target.caption;
        setVehicles((current) => current.map((v) => {
          if (v.id !== target.id) return v;
          const images = [...v.images];
          if (replace === undefined) images.push(photo); else images[replace] = photo;
          return { ...v, images };
        }));
        setDirty(true);
      }
      toast.success("Fotos enviadas. Clique em Publicar alterações para atualizar o site.");
    } catch (e) { toast.error((e as Error).message); } finally { setUploading(null); }
  }
  async function logout() {
    if (dirty && !window.confirm("Sair e descartar as alterações ainda não publicadas?")) return;
    try { await adminRequest("/api/session", { method: "DELETE" }); setDirty(false); setLoggedIn(false); setVehicles([]); }
    catch (e) { toast.error((e as Error).message); }
  }
  if (checking) return <main className="min-h-screen grid place-items-center bg-background"><Loader2 className="animate-spin" aria-label="Carregando" /></main>;
  if (!loggedIn) return <main className="min-h-screen grid place-items-center bg-background px-6">
    <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 space-y-6">
      <ShieldCheck className="text-primary h-10 w-10" />
      <div><p className="text-primary text-xs tracking-[.25em] uppercase mb-2">Newtech Blindagens</p><h1 className="text-2xl font-semibold">Gestão de veículos</h1><p className="text-muted-foreground text-sm mt-2">Entre para cuidar das fotos e dos projetos publicados.</p></div>
      {!configured && <p role="alert" className="text-sm text-amber-400">O administrador precisa configurar o acesso e o armazenamento antes do primeiro login.</p>}
      <div><label htmlFor="password" className="block text-sm mb-2">Senha de acesso</label><Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} maxLength={256} /></div>
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <Button className="w-full" disabled={busy || !configured}>{busy ? "Entrando…" : "Entrar"}</Button>
      <a href="/" className="block text-center text-sm text-muted-foreground hover:text-foreground">Voltar ao site</a>
    </form>
  </main>;
  const locked = busy || Boolean(uploading);
  return <main className="min-h-screen bg-background pb-20">
    <header className="border-b border-border sticky top-0 z-20 bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-5 py-5 flex flex-wrap gap-4 justify-between items-center">
        <div><p className="text-primary text-xs tracking-[.2em] uppercase">Newtech</p><h1 className="text-xl font-semibold">Galeria de veículos</h1></div>
        <div className="flex flex-wrap items-center gap-3"><span role="status" className="text-xs text-muted-foreground">{uploading ? "Enviando fotos…" : dirty ? "Alterações não publicadas" : "Tudo salvo"}</span><Button onClick={save} disabled={locked || !dirty}><Save className="w-4 h-4 mr-2" />{busy ? "Publicando…" : "Publicar alterações"}</Button><Button variant="outline" asChild><a href="/" target="_blank" rel="noopener noreferrer">Ver site</a></Button><Button variant="ghost" onClick={logout} disabled={locked} aria-label="Sair"><LogOut className="w-4 h-4" /></Button></div>
      </div>
    </header>
    <div className="max-w-7xl mx-auto p-5 md:p-8 grid md:grid-cols-[280px_1fr] gap-8">
      <aside className="space-y-4">
        <Button className="w-full" variant="outline" disabled={locked || vehicles.length >= 60} onClick={() => { const next: Vehicle = { id: crypto.randomUUID(), caption: "Novo veículo", published: true, images: [] }; edit([...vehicles, next]); setSelected(next.id); }}><Plus className="w-4 h-4 mr-2" />Adicionar veículo</Button>
        <p className="text-xs text-muted-foreground">A ordem abaixo é a mesma da galeria. A primeira foto é a capa de cada veículo.</p>
        {vehicles.map((item, index) => <div key={item.id} className={`rounded-xl border p-3 ${selected === item.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
          <button disabled={locked} onClick={() => setSelected(item.id)} className="flex gap-3 items-center text-left w-full"><div className="w-14 h-16 shrink-0 rounded-md overflow-hidden bg-muted">{item.images[0] ? <img src={item.images[0].url} alt="" className="w-full h-full object-cover" /> : <Camera className="m-3 w-8 text-muted-foreground" />}</div><span className="text-sm font-medium break-words">{item.caption}<span className="block text-xs font-normal text-muted-foreground mt-1">{item.images.length} fotos · {item.published ? "Visível" : "Oculto"}</span></span></button>
          <div className="flex justify-end gap-1 mt-2"><Button size="icon" variant="ghost" disabled={locked || index === 0} onClick={() => edit(move(vehicles, index, index - 1))} aria-label={`Mover ${item.caption} para cima`}><ArrowUp className="w-4 h-4" /></Button><Button size="icon" variant="ghost" disabled={locked || index === vehicles.length - 1} onClick={() => edit(move(vehicles, index, index + 1))} aria-label={`Mover ${item.caption} para baixo`}><ArrowDown className="w-4 h-4" /></Button></div>
        </div>)}
      </aside>
      {vehicle ? <section className="space-y-6 min-w-0">
        <fieldset disabled={locked} className="space-y-6 disabled:opacity-70">
          <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
            <div><label htmlFor="caption" className="text-sm block mb-2">Nome e descrição do veículo</label><Input id="caption" maxLength={160} value={vehicle.caption} onChange={(e) => patch({ caption: e.target.value })} /></div>
            <div className="flex flex-wrap justify-between gap-3"><Button variant="outline" onClick={() => patch({ published: !vehicle.published })}>{vehicle.published ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}{vehicle.published ? "Visível no site" : "Oculto no site"}</Button><Button variant="ghost" className="text-red-400" onClick={() => { if (window.confirm(`Excluir o veículo “${vehicle.caption}” e suas fotos da galeria?`)) { const next = vehicles.filter((v) => v.id !== vehicle.id); edit(next); setSelected(next[0]?.id ?? null); } }}><Trash2 className="w-4 h-4 mr-2" />Excluir veículo</Button></div>
          </div>
          <div className="flex flex-wrap gap-4 justify-between items-center"><div><h2 className="font-semibold text-lg">Fotos do veículo</h2><p className="text-sm text-muted-foreground">JPG, PNG ou WebP. As fotos são otimizadas automaticamente.</p></div><label className="cursor-pointer inline-flex items-center rounded-md border border-primary text-primary px-4 py-2 text-sm font-medium"><ImagePlus className="w-4 h-4 mr-2" />Adicionar fotos<input aria-label="Adicionar fotos" type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(e) => { void uploadPhotos(e.target.files, vehicle); e.target.value = ""; }} /></label></div>
          {!vehicle.images.length && <div className="border border-dashed border-border rounded-xl p-12 text-center text-muted-foreground">Adicione a primeira foto para publicar este veículo.</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {vehicle.images.map((image, index) => <article key={image.id} className="rounded-xl border border-border overflow-hidden bg-card">
              <div className="relative aspect-[3/4]"><img src={image.url} alt={image.alt || vehicle.caption} className="w-full h-full object-cover" />{index === 0 && <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs font-semibold">Capa</span>}</div>
              <div className="p-3 space-y-3"><label className="block text-xs text-muted-foreground">Descrição da foto<Input className="mt-1" maxLength={200} value={image.alt} placeholder={vehicle.caption} onChange={(e) => patch({ images: vehicle.images.map((i, n) => n === index ? { ...i, alt: e.target.value } : i) })} /></label>
                <div className="flex items-center justify-between gap-1"><Button size="icon" variant="ghost" disabled={locked || index === 0} aria-label="Mover foto para antes" onClick={() => patch({ images: move(vehicle.images, index, index - 1) })}><ArrowUp className="w-4 h-4" /></Button><Button size="icon" variant="ghost" disabled={locked || index === vehicle.images.length - 1} aria-label="Mover foto para depois" onClick={() => patch({ images: move(vehicle.images, index, index + 1) })}><ArrowDown className="w-4 h-4" /></Button><label className="text-xs cursor-pointer underline">Trocar<input aria-label={`Trocar foto ${index + 1}`} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { void uploadPhotos(e.target.files, vehicle, index); e.target.value = ""; }} /></label><Button variant="ghost" size="icon" className="text-red-400" aria-label={`Excluir foto ${index + 1}`} onClick={() => { if (window.confirm("Remover esta foto da galeria?")) patch({ images: vehicle.images.filter((_, n) => n !== index) }); }}><Trash2 className="w-4 h-4" /></Button></div>
                {index > 0 && <Button variant="outline" size="sm" className="w-full" onClick={() => patch({ images: move(vehicle.images, index, 0) })}><Check className="w-3 h-3 mr-2" />Usar como capa</Button>}
              </div>
            </article>)}
          </div>
        </fieldset>
      </section> : <div className="rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">Adicione um veículo para começar.</div>}
    </div>
  </main>;
}

import { useInView } from "@/hooks/useInView";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import materialsBg from "@/assets/materials-bg.jpg";

import type { GalleryImage } from "../../shared/gallery";
import { useGallery } from "@/hooks/useGallery";

const VehicleCarousel = ({ images, caption }: { images: GalleryImage[]; caption: string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 25 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  // Auto-advance on hover
  useEffect(() => {
    if (!emblaApi || !isHovered) return;
    const interval = setInterval(() => emblaApi.scrollNext(), 2000);
    return () => clearInterval(interval);
  }, [emblaApi, isHovered]);

  return (
    <div
      className="group glass-card rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <div ref={emblaRef} className="h-full">
          <div className="flex h-full">
            {images.map((img, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full h-full">
                <img
                  src={img.url}
                  alt={img.alt || `${caption} - Foto ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-4 h-4 text-foreground" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "bg-primary w-4"
                  : "bg-foreground/40 hover:bg-foreground/60"
              }`}
              aria-label={`Ir para foto ${i + 1}`}
            />
          ))}
        </div>

        {/* Photo counter */}
        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-background/60 backdrop-blur-sm text-[10px] font-medium text-foreground/80">
          {selectedIndex + 1}/{images.length}
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm font-semibold text-foreground">{caption}</p>
      </div>
    </div>
  );
};

const GallerySection = () => {
  const { ref, isInView } = useInView();
  const { vehicles } = useGallery();

  return (
    <section id="projetos" className="relative py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${materialsBg})` }} />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        <div className={`text-center mb-14 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
            <Camera className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight antialiased" style={{ lineHeight: '1.2', letterSpacing: '0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Nossos <span className="text-gradient">Projetos</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {vehicles.filter((vehicle) => vehicle.published).map(({ id, images, caption }) => (
            <VehicleCarousel key={id} images={images} caption={caption} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

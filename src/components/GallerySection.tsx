import { useInView } from "@/hooks/useInView";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import galleryVolvo from "@/assets/gallery-volvo.jpg";
import galleryVolvo2 from "@/assets/gallery-volvo-2.jpg";
import galleryVolvo3 from "@/assets/gallery-volvo-3.jpg";
import galleryVolvo4 from "@/assets/gallery-volvo-4.jpg";
import galleryBmw from "@/assets/gallery-bmw.jpg";
import galleryBmw2 from "@/assets/gallery-bmw-2.jpg";
import galleryBmw3 from "@/assets/gallery-bmw-3.jpg";
import galleryFortuner from "@/assets/gallery-fortuner.jpg";
import gallerySw42 from "@/assets/gallery-sw4-2.jpg";
import gallerySw43 from "@/assets/gallery-sw4-3.jpg";
import galleryGclass from "@/assets/gallery-gclass.jpg";
import galleryGclass2 from "@/assets/gallery-gclass-2.jpg";
import galleryGclass3 from "@/assets/gallery-gclass-3.jpg";
import galleryHaval from "@/assets/gallery-haval.jpg";
import galleryHaval2 from "@/assets/gallery-haval-2.jpg";
import galleryHaval3 from "@/assets/gallery-haval-3.jpg";
import galleryDefender1 from "@/assets/gallery-defender-1.jpg";
import galleryDefender2 from "@/assets/gallery-defender-2.jpg";
import galleryDefender3 from "@/assets/gallery-defender-3.jpg";
import galleryGle from "@/assets/gallery-gle.jpg";

const projects = [
  {
    caption: "Volvo XC90 Blindado Nível III-A",
    images: [galleryVolvo, galleryVolvo2, galleryVolvo3, galleryVolvo4],
  },
  {
    caption: "BMW X6 Blindado Nível III-A",
    images: [galleryBmw, galleryBmw2, galleryBmw3],
  },
  {
    caption: "Toyota SW4 Blindado Nível III-A",
    images: [galleryFortuner, gallerySw42, gallerySw43],
  },
  {
    caption: "Mercedes G-Class AMG Blindado Nível III-A",
    images: [galleryGclass, galleryGclass2, galleryGclass3],
  },
  {
    caption: "Haval H6 Blindado Nível III-A",
    images: [galleryHaval, galleryHaval2, galleryHaval3],
  },
  {
    caption: "Land Rover Defender Blindado Nível III-A",
    images: [galleryDefender1, galleryDefender2, galleryDefender3],
  },
];

const VehicleCarousel = ({ images, caption }: { images: string[]; caption: string }) => {
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
                  src={img}
                  alt={`${caption} - Foto ${i + 1}`}
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

  return (
    <section id="projetos" className="py-28 gradient-section" ref={ref}>
      <div className="container mx-auto px-6 max-w-6xl">
        <div className={`text-center mb-14 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
            <Camera className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight antialiased" style={{ lineHeight: '1.2', letterSpacing: '0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Nossos <span className="text-gradient">Projetos</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {projects.map(({ images, caption }) => (
            <VehicleCarousel key={caption} images={images} caption={caption} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

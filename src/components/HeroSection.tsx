import { MapPin, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Logo from "@/components/Logo";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center pt-28 md:pt-32">
        <div className="animate-fade-up flex justify-center mb-2 md:mb-3">
          <Logo className="h-12 md:h-14 lg:h-16 w-auto" />
        </div>

        <div className="animate-fade-up-delay-1">
          <p className="text-base md:text-lg lg:text-xl font-semibold text-white max-w-2xl mx-auto antialiased" style={{ lineHeight: '1.2', letterSpacing: '0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            Onde a inovação protege vidas
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-auto container mx-auto px-6 pb-10 animate-fade-up-delay-3">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground/70">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary/60" />
            Av. Vicente de Castro, 6270 - Cais do Porto, Fortaleza-CE
          </span>
          <span className="hidden md:block text-border/50">|</span>
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary/60" />
            (85) 3248-6633
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;

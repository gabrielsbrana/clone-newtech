import { MessageCircle, MapPin, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import Logo from "@/components/Logo";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="animate-fade-up flex justify-center mb-10">
          <Logo className="h-20 md:h-24 lg:h-28 w-auto" />
        </div>

        <div className="animate-fade-up-delay-1">
          <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-12 max-w-2xl mx-auto antialiased" style={{ lineHeight: '1.2', letterSpacing: '0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Onde a inovação protege vidas
          </p>
        </div>

        <div className="animate-fade-up-delay-2">
          <a
            href="https://wa.me/5585989578441"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-10 py-4 rounded-xl text-base transition-all duration-300 hover:scale-105 shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/40"
          >
            <MessageCircle className="w-5 h-5" />
            Fale conosco no WhatsApp
          </a>
        </div>

        <div className="animate-fade-up-delay-3 mt-20 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground/70">
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

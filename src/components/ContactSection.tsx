import { useInView } from "@/hooks/useInView";
import { MapPin, Phone, MessageCircle, Instagram } from "lucide-react";
import materialsBg from "@/assets/materials-bg.jpg";

const ContactSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="contato" className="relative py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${materialsBg})` }} />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="relative z-10 container mx-auto px-6 max-w-4xl">
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-14 text-white tracking-tight antialiased" style={{ lineHeight: '1.2', letterSpacing: '0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Entre em <span className="text-gradient">Contato</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 mb-14 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 antialiased">Endereço</p>
              <p className="text-sm font-medium text-white antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.7' }}>
                Av. Vicente de Castro, 6270
                <br />
                Cais do Porto, Fortaleza-CE
              </p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 antialiased">Telefone</p>
              <p className="text-sm font-medium text-white antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>(85) 98957-8441</p>
            </div>
          </div>

          <a
            href="https://wa.me/5585989578441"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-xl p-6 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 antialiased">WhatsApp</p>
              <p className="text-sm font-medium text-white antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>(85) 98957-8441</p>
            </div>
          </a>

          <a
            href="https://www.instagram.com/newtechblindagens/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-xl p-6 flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-[#E1306C]/10 border border-[#E1306C]/20 flex items-center justify-center shrink-0">
              <Instagram className="w-5 h-5 text-[#E1306C]" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm mb-1 antialiased">Instagram</p>
              <p className="text-sm font-medium text-white antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>@newtechblindagens</p>
            </div>
          </a>
        </div>

        <div className={`text-center transition-all duration-1000 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <a
            href="https://wa.me/5585989578441?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20para%20blindagem%20automotiva."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-10 py-4 rounded-xl text-base transition-all duration-300 hover:scale-105 shadow-xl shadow-primary/20"
          >
            Solicite um Orçamento
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

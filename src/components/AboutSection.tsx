import { Shield } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import carInteriorBg from "@/assets/car-interior-bg.jpg";

const AboutSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="quem-somos" className="relative py-28 overflow-hidden" ref={ref}>
      {/* Car interior background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${carInteriorBg})` }}
      />
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      
      {/* Subtle top/bottom gradient blending */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative z-10 container mx-auto px-6 max-w-3xl">
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground tracking-tight">
            Quem <span className="text-gradient">Somos</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-white antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>
            Somos a New Tech Blindagens, uma empresa especializada em blindagem automotiva de alto padrão, 
            movida por tecnologia, precisão e compromisso com a vida. Atuamos com materiais de última geração 
            e processos rigorosos, garantindo proteção nível III-A com acabamento impecável, preservando o 
            conforto, a originalidade e o desempenho de cada veículo.
          </p>
          <p className="text-sm md:text-base font-medium text-white mt-6 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>
            Mais do que blindar carros, protegemos histórias, famílias e trajetos. Acreditamos que segurança 
            é investimento em tranquilidade — e que excelência não é diferencial, é obrigação. Na New Tech, 
            inovação e confiança andam juntas. Porque proteger o que é mais importante sempre será a nossa prioridade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

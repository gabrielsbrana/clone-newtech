import { Shield, Settings, Award, BadgeCheck } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import carInteriorBg from "@/assets/car-interior-bg.jpg";

const features = [
  {
    icon: Shield,
    title: "Proteção Nível III-A",
    desc: "Segurança máxima com certificação balística.",
  },
  {
    icon: Settings,
    title: "Tecnologia Avançada",
    desc: "Materiais de última geração e processos de precisão.",
  },
  {
    icon: Award,
    title: "Acabamento Impecável",
    desc: "Preserva o conforto, a originalidade e o desempenho.",
  },
  {
    icon: BadgeCheck,
    title: "Garantia e Certificação",
    desc: "Compromisso com a qualidade e sua tranquilidade.",
  },
];

const AboutSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="quem-somos" className="relative py-24 overflow-hidden bg-background" ref={ref}>
      <div className="container mx-auto px-6">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Left: text */}
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight antialiased leading-[0.95]" style={{ letterSpacing: '-0.5px' }}>
              Quem<br />
              <span className="text-primary">Somos</span>
            </h2>
            <div className="w-16 h-[3px] bg-primary/70 mt-6 mb-8 rounded-full" />
            <div className="space-y-5 text-white/85 font-medium antialiased" style={{ letterSpacing: '0.3px', lineHeight: '1.65' }}>
              <p>
                Somos a New Tech Blindagens, uma empresa especializada em blindagem automotiva de alto padrão,
                movida por tecnologia, precisão e compromisso com a vida.
              </p>
              <p>
                Atuamos com materiais de última geração e processos rigorosos, garantindo proteção nível III-A com
                acabamento impecável, preservando o conforto, a originalidade e o desempenho de cada veículo.
              </p>
              <p>
                Mais do que blindar carros, protegemos histórias, famílias e trajetos. Acreditamos que segurança
                é investimento em tranquilidade — e que excelência não é diferencial, é obrigação. Na New Tech,
                inovação e confiança andam juntas. Porque proteger o que é mais importante sempre será a nossa prioridade.
              </p>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[5/4] shadow-2xl">
            <img
              src={carInteriorBg}
              alt="Interior de veículo blindado premium"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 lg:mt-20">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-start text-left">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-white font-semibold text-base md:text-lg mb-2 tracking-tight antialiased">
                {title}
              </h3>
              <p className="text-white/70 text-sm font-medium antialiased" style={{ letterSpacing: '0.3px', lineHeight: '1.55' }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

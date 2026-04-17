import { useInView } from "@/hooks/useInView";
import { Shield, Layers, Gem, Eye, Wrench } from "lucide-react";
import materialsBg from "@/assets/materials-bg.jpg";

const materials = [
  { icon: Shield, name: "Aço Balístico", desc: "Proteção estrutural de alto impacto" },
  { icon: Layers, name: "Aramida (Kevlar)", desc: "Fibra leve e ultraresistente" },
  { icon: Gem, name: "Polly Matrix Kevlar Next One", desc: "Composto balístico avançado" },
  { icon: Eye, name: "Vidros Blindados", desc: "Transparência com proteção máxima" },
  { icon: Wrench, name: "Reforços Estruturais", desc: "Mantas e reforços sob medida" },
];

const MaterialsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="materiais" className="relative py-28 overflow-hidden" ref={ref}>
      {/* Premium materials background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${materialsBg})` }}
      />
      <div className="absolute inset-0 bg-background/85 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-5 text-white tracking-tight antialiased" style={{ lineHeight: '1.2', letterSpacing: '0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Materiais de <span className="text-gradient">Alta Tecnologia</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-white max-w-2xl mx-auto mb-14 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>
            Trabalhamos com materiais de qualidade comprovada, pensados para oferecer segurança 
            sem comprometer conforto e desempenho.
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {materials.map(({ icon: Icon, name, desc }) => (
            <div
              key={name}
              className="glass-card rounded-xl p-6 flex items-start gap-4 group"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="font-semibold text-white text-base antialiased" style={{ letterSpacing: '0.5px' }}>{name}</span>
                <p className="text-sm font-medium text-white mt-1 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;

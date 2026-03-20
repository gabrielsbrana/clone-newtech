import { useInView } from "@/hooks/useInView";
import { Award, CheckCircle, Shield } from "lucide-react";
import nextOneLogo from "@/assets/nextone-logo-final.png";
import dupontLogo from "@/assets/dupont-logo.png";
import kevlarLogo from "@/assets/kevlar-logo.png";
import abralinLogo from "@/assets/abralin-logo.png";

const CertificationsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="certificacoes" className="py-28 gradient-bg" ref={ref}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
            <Award className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white tracking-tight antialiased" style={{ lineHeight: '1.2', letterSpacing: '0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            Certificações e <span className="text-gradient">Associações</span>
          </h2>
        </div>

        <div className={`space-y-5 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Abralin */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-3 antialiased" style={{ lineHeight: '1.3', letterSpacing: '0.5px', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
              <CheckCircle className="w-5 h-5 text-primary shrink-0" />
              Associados à Abralin
            </h3>
            <p className="text-sm font-medium text-white ml-8 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>
              Associação Brasileira de Blindagem.
            </p>
          </div>

          {/* NextOne Card */}
          <div className="glass-card rounded-2xl overflow-hidden">
            {/* Header com logo */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-8 border-b border-border/50">
              <img
                src={nextOneLogo}
                alt="NextOne Performance Ballistic Products"
                className="w-48 sm:w-56 h-auto object-contain shrink-0"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2 justify-center sm:justify-start antialiased" style={{ lineHeight: '1.3', letterSpacing: '0.5px', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  Certificado NextOne by Kevlar DuPont
                </h3>
                <p className="text-sm font-medium text-white mt-1.5 tracking-wide uppercase antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>
                  Certificação de qualidade e autenticidade balística
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-8">
              <p className="text-sm font-medium text-white mb-6 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>
                Garante a utilização de manta balística original de aramida Kevlar®, produzida pela DuPont, 
                em blindagens veiculares, assegurando máxima resistência, leveza e conformidade técnica. 
                É uma certificação de qualidade que atesta a procedência do material e a segurança da blindagem.
              </p>

              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/[0.03] border border-primary/10">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-white antialiased" style={{ lineHeight: '1.3', letterSpacing: '0.5px' }}>Autenticidade</p>
                        <p className="text-sm font-medium text-white mt-1 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>O certificado assegura que o material é Kevlar® legítimo da DuPont, evitando o uso de aramidas alternativas menos resistentes.</p>
                      </div>
                      <img src={dupontLogo} alt="Logo DuPont" className="w-[140px] h-auto object-contain shrink-0" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/[0.03] border border-primary/10">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-base font-semibold text-white antialiased" style={{ lineHeight: '1.3', letterSpacing: '0.5px' }}>Qualidade e Segurança</p>
                        <p className="text-sm font-medium text-white mt-1 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>A manta Kevlar® é conhecida por ser extremamente leve e resistente, proporcionando proteção superior contra disparos e impactos.</p>
                      </div>
                      <img src={kevlarLogo} alt="Logo Kevlar" className="w-[140px] h-auto object-contain shrink-0" />
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/[0.03] border border-primary/10">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Aplicações</p>
                    <p className="text-sm font-medium text-white mt-1 leading-relaxed tracking-wide antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>Tecnologia aplicada com excelência: a NextOne em proteção balística certificada e a NewTech em blindagens veiculares de alto desempenho.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;

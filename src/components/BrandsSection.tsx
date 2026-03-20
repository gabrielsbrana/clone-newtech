import { useInView } from "@/hooks/useInView";
import { Car } from "lucide-react";

import bmwLogo from "@/assets/brands/bmw.png";
import porscheLogo from "@/assets/brands/porsche.png";
import mercedesLogo from "@/assets/brands/mercedes.png";
import landroverLogo from "@/assets/brands/landrover.png";
import audiLogo from "@/assets/brands/audi.png";
import toyotaLogo from "@/assets/brands/toyota.png";
import hondaLogo from "@/assets/brands/honda.png";
import bydLogo from "@/assets/brands/byd.png";
import jeepLogo from "@/assets/brands/jeep.png";
import hyundaiLogo from "@/assets/brands/hyundai.png";
import jaecooLogo from "@/assets/brands/jaecoo.png";
import volvoLogo from "@/assets/brands/volvo.png";
import havalLogo from "@/assets/brands/haval.png";

const brands = [
  { name: "BMW", logo: bmwLogo },
  { name: "Porsche", logo: porscheLogo },
  { name: "Mercedes-Benz", logo: mercedesLogo },
  { name: "Land Rover", logo: landroverLogo },
  { name: "Audi", logo: audiLogo },
  { name: "Toyota", logo: toyotaLogo },
  { name: "Honda", logo: hondaLogo },
  { name: "BYD", logo: bydLogo },
  { name: "Jeep", logo: jeepLogo },
  { name: "Hyundai", logo: hyundaiLogo },
  { name: "Jaecoo", logo: jaecooLogo },
  { name: "Volvo", logo: volvoLogo },
  { name: "Haval", logo: havalLogo },
];

const BrandsSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="marcas" className="py-28 gradient-bg" ref={ref}>
      <div className="container mx-auto px-6 max-w-5xl">
        <div className={`text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
            <Car className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 text-foreground tracking-tight">
            Veículos que <span className="text-gradient">Blindamos</span>
          </h2>
          <p className="text-sm md:text-base font-medium text-white max-w-2xl mx-auto mb-14 antialiased" style={{ letterSpacing: '0.4px', lineHeight: '1.6' }}>
            Blindamos veículos das principais montadoras do mercado, sempre preservando originalidade, 
            conforto e desempenho.
          </p>
        </div>

        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="glass-card rounded-xl p-5 flex flex-col items-center justify-center gap-3 group cursor-default"
            >
              <img
                src={brand.logo}
                alt={`Logo ${brand.name}`}
                className="w-24 h-24 object-contain"
              />
              <span className="text-xs font-medium text-white uppercase tracking-widest antialiased group-hover:text-primary transition-colors duration-300" style={{ letterSpacing: '0.4px', lineHeight: '1.5' }}>
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsSection;

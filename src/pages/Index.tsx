import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BrandsSection from "@/components/BrandsSection";
import MaterialsSection from "@/components/MaterialsSection";
import CertificationsSection from "@/components/CertificationsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <BrandsSection />
      <MaterialsSection />
      <CertificationsSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default Index;

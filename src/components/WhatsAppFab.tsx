import { MessageCircle } from "lucide-react";

const WhatsAppFab = () => {
  return (
    <a
      href="https://wa.me/5585989578441"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 animate-fade-up"
      aria-label="Fale conosco no WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppFab;

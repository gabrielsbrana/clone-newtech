import { Instagram, MessageCircle } from "lucide-react";
import Logo from "@/components/Logo";

const Footer = () => {
  return (
    <footer className="py-10 border-t border-border/50 bg-background">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Logo className="h-6 w-auto opacity-50" showSubtitle={false} />
          <span className="text-xs text-muted-foreground/50">
            © 2026 Todos os direitos reservados.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/newtechblindagens/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/5585989578441"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
            aria-label="WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useSiteLogo } from "@/hooks/useSiteLogo";

const Footer = () => {
  const { data: logoUrl } = useSiteLogo();

  return (
    <footer className="py-12 px-4 border-t border-border bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            {logoUrl ? (
              <img src={logoUrl} alt="Feline's Cakery" className="h-10 w-auto object-contain mb-2" />
            ) : (
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">Feline's Cakery</h3>
            )}
            <p className="text-muted-foreground text-sm">Luxury Cakes, Made Affordable</p>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/Felines.cakery" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="mailto:favourbassey859@gmail.com" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://wa.me/2349163479043" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">&copy; {new Date().getFullYear()} Feline's Cakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

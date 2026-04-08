import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSiteLogo } from "@/hooks/useSiteLogo";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: logoUrl } = useSiteLogo();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {logoUrl && (
            <img src={logoUrl} alt="Feline's Cakery" className="h-10 w-auto object-contain" />
          )}
          <span className="text-xl font-serif font-bold text-foreground">Feline's Cakery</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cakes</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Order Now
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground" aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-4">
          <a href="#products" onClick={() => setOpen(false)} className="block text-muted-foreground hover:text-foreground">Cakes</a>
          <a href="https://wa.me/2349163479043" target="_blank" rel="noopener noreferrer" className="block text-primary font-medium">Order Now</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

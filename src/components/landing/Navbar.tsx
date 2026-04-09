import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSiteLogo } from "@/hooks/useSiteLogo";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: logoUrl } = useSiteLogo();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0d0805]/95 backdrop-blur-xl border-b border-white/5 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          {logoUrl && (
            <img src={logoUrl} alt="Feline's Cakery" className="h-9 w-auto object-contain" />
          )}
          <div>
            <span className="text-white font-serif text-xl font-bold tracking-tight">Feline's Cakery</span>
            {!logoUrl && <span className="block text-rose-400/70 text-[10px] tracking-[0.25em] uppercase font-medium -mt-0.5">Luxury Cakes</span>}
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <a href="#products" className="text-white/70 hover:text-white text-sm font-medium transition-colors tracking-wide">Our Cakes</a>
          <a href="#why-us" className="text-white/70 hover:text-white text-sm font-medium transition-colors tracking-wide">Why Us</a>
          <a href="#testimonials" className="text-white/70 hover:text-white text-sm font-medium transition-colors tracking-wide">Reviews</a>
          <a href="#story" className="text-white/70 hover:text-white text-sm font-medium transition-colors tracking-wide">Our Story</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-400 hover:bg-rose-300 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-rose-900/30"
          >
            <span>💬</span> Order Now
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white" aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0d0805]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-4">
          <a href="#products" onClick={() => setOpen(false)} className="block text-white/80 hover:text-white py-2 text-lg font-medium border-b border-white/10">Our Cakes</a>
          <a href="#why-us" onClick={() => setOpen(false)} className="block text-white/80 hover:text-white py-2 text-lg font-medium border-b border-white/10">Why Us</a>
          <a href="#testimonials" onClick={() => setOpen(false)} className="block text-white/80 hover:text-white py-2 text-lg font-medium border-b border-white/10">Reviews</a>
          <a href="#story" onClick={() => setOpen(false)} className="block text-white/80 hover:text-white py-2 text-lg font-medium border-b border-white/10">Our Story</a>
          <a href="https://wa.me/2349163479043" target="_blank" rel="noopener noreferrer" className="block w-full text-center px-6 py-3 bg-rose-400 text-white rounded-full font-semibold mt-4">
            💬 Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
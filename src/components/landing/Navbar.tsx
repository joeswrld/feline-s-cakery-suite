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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  const navLinks = [
    { href: "#products", label: "Our Cakes" },
    { href: "#why-us", label: "Why Us" },
    { href: "#testimonials", label: "Reviews" },
    { href: "#story", label: "Our Story" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-[#0d0805]/97 backdrop-blur-xl border-b border-white/8 py-3"
            : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 flex items-center justify-between h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 min-w-0" onClick={close}>
            {logoUrl && (
              <img src={logoUrl} alt="Feline's Cakery" className="h-8 w-auto object-contain shrink-0" />
            )}
            <div className="min-w-0">
              <span className="text-white font-serif text-lg sm:text-xl font-bold tracking-tight truncate block">
                Feline's Cakery
              </span>
              {!logoUrl && (
                <span className="block text-rose-400/70 text-[9px] tracking-[0.25em] uppercase font-medium -mt-0.5">
                  Luxury Cakes
                </span>
              )}
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors tracking-wide"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-rose-400 hover:bg-rose-300 text-white rounded-full text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-rose-900/30 touch-manipulation"
          >
            <span>💬</span> Order Now
          </a>

          {/* Mobile: WhatsApp icon + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://wa.me/2349163479043"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-rose-400 text-white rounded-full text-xs font-semibold touch-manipulation"
              aria-label="Order on WhatsApp"
            >
              💬 Order
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-white/10 transition-colors touch-manipulation"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — full screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#0d0805]/60 backdrop-blur-sm" onClick={close} />
        {/* Panel */}
        <div
          className={`absolute top-[60px] left-0 right-0 bg-[#0d0805] border-t border-white/10 transition-transform duration-300 ${
            open ? "translate-y-0" : "-translate-y-4"
          }`}
        >
          <div className="px-5 py-4 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="flex items-center text-white/80 hover:text-white active:text-rose-400 text-lg font-medium py-4 border-b border-white/8 transition-colors touch-manipulation"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-4 pb-2">
              <a
                href="https://wa.me/2349163479043"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="flex items-center justify-center gap-2 w-full py-4 bg-rose-400 text-white rounded-2xl font-bold text-base touch-manipulation"
              >
                💬 Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
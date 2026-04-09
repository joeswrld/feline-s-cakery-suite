import { Instagram, Mail, MessageCircle } from "lucide-react";
import { useSiteLogo } from "@/hooks/useSiteLogo";

const Footer = () => {
  const { data: logoUrl } = useSiteLogo();

  return (
    <footer className="bg-[#080503] border-t border-white/5 px-5 sm:px-6 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Top grid — stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              {logoUrl && (
                <img src={logoUrl} alt="Feline's Cakery" className="h-8 w-auto object-contain" />
              )}
              <div>
                <p className="text-white font-serif font-bold text-lg leading-tight">Feline's Cakery</p>
                <p className="text-rose-400/70 text-[10px] tracking-widest uppercase">Luxury Cakes</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Handcrafted luxury cakes made affordable for every Nigerian celebration.
            </p>
            {/* Social icons on mobile below brand */}
            <div className="flex gap-3 mt-5 lg:hidden">
              <a
                href="https://instagram.com/Felines.cakery"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-rose-400/20 flex items-center justify-center text-white/50 hover:text-rose-400 transition-colors touch-manipulation"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:favourbassey859@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-rose-400/20 flex items-center justify-center text-white/50 hover:text-rose-400 transition-colors touch-manipulation"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/2349163479043"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-rose-400/20 flex items-center justify-center text-white/50 hover:text-rose-400 transition-colors touch-manipulation"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5">
              Quick Links
            </p>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { href: "#products", label: "Our Cakes" },
                { href: "#why-us", label: "Why Feline's" },
                { href: "#testimonials", label: "Customer Reviews" },
                { href: "#story", label: "Our Story" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="block text-white/45 hover:text-white active:text-rose-400 text-sm transition-colors py-0.5 touch-manipulation"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase mb-4 sm:mb-5">
              Get in Touch
            </p>
            <div className="space-y-3 sm:space-y-4">
              <a
                href="https://wa.me/2349163479043"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/45 hover:text-white active:text-rose-400 text-sm transition-colors group touch-manipulation"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-rose-400/20 flex items-center justify-center transition-colors shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span>+234 916 347 9043 (WhatsApp)</span>
              </a>
              <a
                href="mailto:favourbassey859@gmail.com"
                className="flex items-center gap-3 text-white/45 hover:text-white active:text-rose-400 text-sm transition-colors group touch-manipulation"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-rose-400/20 flex items-center justify-center transition-colors shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="break-all">favourbassey859@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/Felines.cakery"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/45 hover:text-white active:text-rose-400 text-sm transition-colors group touch-manipulation"
              >
                <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-rose-400/20 flex items-center justify-center transition-colors shrink-0">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>@Felines.cakery</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs text-center sm:text-left">
            &copy; {new Date().getFullYear()} Feline's Cakery. All rights reserved.
          </p>
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-400/15 hover:bg-rose-400/25 border border-rose-400/20 text-rose-400 text-sm rounded-full font-medium transition-colors touch-manipulation"
          >
            💬 Order Now
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
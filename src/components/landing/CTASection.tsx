const CTASection = () => {
  const occasions = [
    { emoji: "🎂", label: "Birthdays" },
    { emoji: "💍", label: "Weddings" },
    { emoji: "🎓", label: "Graduations" },
    { emoji: "🎉", label: "Celebrations" },
    { emoji: "❤️", label: "Anniversaries" },
    { emoji: "🍼", label: "Baby Showers" },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 bg-[#0d0805] relative overflow-hidden">
      {/* Soft glow backdrop */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-rose-400/5 blur-[100px] pointer-events-none"
        aria-hidden
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Occasion pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {occasions.map((occ, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-xs sm:text-sm"
            >
              <span>{occ.emoji}</span> {occ.label}
            </span>
          ))}
        </div>

        <p className="text-rose-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3 sm:mb-4">
          Ready to Order?
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-4 sm:mb-6">
          Your Special Moment<br />
          <span className="text-rose-400">Deserves the Best</span>
        </h2>
        <p className="text-white/50 text-base sm:text-xl mb-8 sm:mb-12 max-w-xl mx-auto leading-relaxed px-2">
          Chat with us on WhatsApp and get your dream cake sorted in minutes. We'll guide you every step of the way.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
          <a
            href="https://wa.me/2349163479043?text=Hi! I'd like to order a cake. Can you help me?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-rose-400 hover:bg-rose-300 active:bg-rose-500 text-white rounded-full font-bold text-base sm:text-lg transition-all duration-300 shadow-2xl shadow-rose-900/50 touch-manipulation"
          >
            <span className="text-lg sm:text-xl">💬</span>
            Order on WhatsApp
          </a>
          <a
            href="mailto:favourbassey859@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-8 sm:px-10 py-4 sm:py-5 border border-white/20 text-white/80 rounded-full font-medium text-base hover:bg-white/5 active:bg-white/10 transition-all duration-300 touch-manipulation"
          >
            ✉ Send an Email
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-6 text-white/40 text-xs sm:text-sm mb-8 sm:mb-10">
          <span>✓ No deposit required to inquire</span>
          <span>✓ Free design consultation</span>
          <span>✓ Same-day orders accepted</span>
        </div>

        {/* Urgency nudge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-rose-400/10 border border-rose-400/20 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 text-rose-300 text-xs sm:text-sm">
          <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse shrink-0" />
          <span>We're accepting orders — spots fill fast on weekends!</span>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
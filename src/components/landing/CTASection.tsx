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
    <section className="py-28 px-6 bg-[#0d0805] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-rose-400 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Occasions strip */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {occasions.map((occ, i) => (
            <span key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-sm">
              <span>{occ.emoji}</span> {occ.label}
            </span>
          ))}
        </div>

        <p className="text-rose-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Ready to Order?</p>
        <h2 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
          Your Special Moment<br />
          <span className="text-rose-400">Deserves the Best</span>
        </h2>
        <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          Chat with us on WhatsApp and get your dream cake sorted in minutes. We'll guide you every step of the way.
        </p>

        {/* Main CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="https://wa.me/2349163479043?text=Hi! I'd like to order a cake. Can you help me?"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-rose-400 hover:bg-rose-300 text-white rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 shadow-2xl shadow-rose-900/50"
          >
            <span className="text-xl">💬</span>
            Order on WhatsApp
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="mailto:favourbassey859@gmail.com"
            className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/20 text-white/80 rounded-full font-medium text-base hover:bg-white/5 transition-all duration-300"
          >
            ✉ Send an Email
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-8 text-white/40 text-sm">
          <span className="flex items-center gap-2">✓ No deposit required to inquire</span>
          <span className="flex items-center gap-2">✓ Free design consultation</span>
          <span className="flex items-center gap-2">✓ Same-day orders accepted</span>
        </div>

        {/* Urgency nudge */}
        <div className="mt-10 inline-flex items-center gap-3 bg-rose-400/10 border border-rose-400/20 rounded-full px-6 py-3 text-rose-300 text-sm">
          <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse shrink-0" />
          We're currently accepting orders — spots fill fast on weekends!
        </div>
      </div>
    </section>
  );
};

export default CTASection;
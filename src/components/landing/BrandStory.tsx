const BrandStory = () => {
  return (
    <section id="story" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 bg-[#f8f4f0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <p className="text-rose-500 text-xs font-semibold tracking-[0.3em] uppercase mb-3 sm:mb-4">
              Our Story
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0d0805] leading-tight mb-6 sm:mb-8">
              Behind Every Cake<br />
              <span className="text-rose-400">Is a Dream</span>
            </h2>
            <div className="space-y-4 sm:space-y-5 text-[#0d0805]/60 text-sm sm:text-base leading-relaxed">
              <p>
                Feline's Cakery was born from a dream — a bold Nigerian youth building a premium cake experience
                against all odds. What started as a passion project in a small kitchen has grown into a brand that
                stands for elegance, quality, and heart.
              </p>
              <p>
                Every cake we create tells a story of dedication, love, and the belief that{" "}
                <strong className="text-[#0d0805]/80 font-semibold">luxury should be accessible to everyone</strong>.
                We pour our hearts into every layer, every frosting, every decoration.
              </p>
              <p>Because your special moments deserve nothing less than extraordinary.</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-[#0d0805]/10">
              {[
                { number: "500+", label: "Happy customers" },
                { number: "3+", label: "Years of craft" },
                { number: "100%", label: "Fresh daily" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-[#0d0805]">{stat.number}</p>
                  <p className="text-[#0d0805]/45 text-xs sm:text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/2349163479043"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-8 sm:mt-10 px-7 sm:px-8 py-4 bg-[#0d0805] hover:bg-rose-800 active:bg-rose-900 text-white rounded-full font-bold text-sm sm:text-base transition-all duration-300 touch-manipulation w-full sm:w-auto justify-center sm:justify-start"
            >
              💬 Order Your Dream Cake
            </a>
          </div>

          {/* Visual column — shown below text on mobile */}
          <div className="relative mt-2 lg:mt-0">
            <div className="aspect-square rounded-2xl sm:rounded-3xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center overflow-hidden">
              <div className="text-center p-8 sm:p-12">
                <div className="text-7xl sm:text-9xl mb-4 sm:mb-6">🎂</div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#0d0805]/70">Made with love,</p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-rose-400">served with pride.</p>
              </div>
            </div>
            {/* Floating accents — adjusted for mobile */}
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-[#0d0805] text-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-2xl">
              <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wide mb-1">Our Promise</p>
              <p className="font-serif font-bold text-base sm:text-lg leading-snug">Every bite, perfect.</p>
            </div>
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-rose-400 text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
              <p className="text-2xl sm:text-3xl font-serif font-bold leading-none">5★</p>
              <p className="text-[10px] sm:text-xs text-white/80 mt-0.5">Rated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
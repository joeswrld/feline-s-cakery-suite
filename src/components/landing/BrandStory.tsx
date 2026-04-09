const BrandStory = () => {
  return (
    <section id="story" className="py-28 px-6 bg-[#f8f4f0]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="text-rose-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Our Story</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0d0805] leading-tight mb-8">
              Behind Every Cake<br />
              <span className="text-rose-400">Is a Dream</span>
            </h2>
            <div className="space-y-5 text-[#0d0805]/60 text-base leading-relaxed">
              <p>
                Feline's Cakery was born from a dream — a bold Nigerian youth building a premium cake experience against all odds. 
                What started as a passion project in a small kitchen has grown into a brand that stands for elegance, quality, and heart.
              </p>
              <p>
                Every cake we create tells a story. A story of dedication, love, and the belief that <strong className="text-[#0d0805]/80 font-semibold">luxury should be accessible to everyone</strong>. 
                We pour our hearts into every layer, every frosting, every decoration.
              </p>
              <p>
                Because your special moments deserve nothing less than extraordinary.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-[#0d0805]/10">
              {[
                { number: "500+", label: "Happy customers" },
                { number: "3+", label: "Years of craft" },
                { number: "100%", label: "Fresh daily" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-serif font-bold text-[#0d0805]">{stat.number}</p>
                  <p className="text-[#0d0805]/45 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/2349163479043"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-[#0d0805] hover:bg-rose-800 text-white rounded-full font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
            >
              💬 Order Your Dream Cake
            </a>
          </div>

          {/* Right: Visual accent */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center overflow-hidden">
              <div className="text-center p-12">
                <div className="text-9xl mb-6">🎂</div>
                <p className="font-serif text-2xl font-bold text-[#0d0805]/70">Made with love,</p>
                <p className="font-serif text-2xl font-bold text-rose-400">served with pride.</p>
              </div>
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-4 -left-4 bg-[#0d0805] text-white rounded-2xl p-5 shadow-2xl">
              <p className="text-xs text-white/50 uppercase tracking-wide mb-1">Our Promise</p>
              <p className="font-serif font-bold text-lg">Every bite, perfect.</p>
            </div>
            {/* Second floating accent */}
            <div className="absolute -top-4 -right-4 bg-rose-400 text-white rounded-2xl p-4 shadow-xl">
              <p className="text-3xl font-serif font-bold leading-none">5★</p>
              <p className="text-xs text-white/80 mt-0.5">Rated</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
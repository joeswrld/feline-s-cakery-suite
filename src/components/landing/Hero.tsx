import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-20 overflow-hidden">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Luxury cakes display" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0805]/90 via-[#0d0805]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0805]/60 via-transparent to-transparent" />
      </div>

      
      {/* Main content */}
      <div className="relative z-10 px-6 md:px-16 max-w-3xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex -space-x-2">
            {["F","A","C","B"].map((l, i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                {l}
              </div>
            ))}
          </div>
          <p className="text-white/80 text-sm">Loved by <span className="text-white font-semibold">500+ customers</span> in Nigeria</p>
        </div>

        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-[1.05] mb-6 tracking-tight">
          Every Cake,<br />
          <span className="text-rose-300">A Masterpiece.</span>
        </h1>

        <p className="text-white/75 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
          Handcrafted luxury cakes for your most treasured moments — birthdays, weddings, celebrations. Premium quality, made affordable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-rose-400 hover:bg-rose-300 text-white rounded-full font-semibold text-base transition-all duration-300 shadow-lg shadow-rose-900/40 hover:shadow-xl hover:shadow-rose-800/40 hover:-translate-y-0.5"
          >
            <span className="text-lg">💬</span>
            Order Your Cake Now
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-full font-medium text-base hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            View Our Collection
          </a>
        </div>

        {/* Quick trust signals */}
        <div className="flex flex-wrap gap-6 mt-10">
          {[
            { icon: "✦", text: "Same-day delivery available" },
            { icon: "✦", text: "Custom designs welcome" },
            { icon: "✦", text: "100% fresh ingredients" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/70 text-sm">
              <span className="text-rose-400 text-xs">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase" style={{writingMode: 'vertical-rl'}}>Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-end pb-12 sm:pb-20 overflow-hidden">
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury cakes display"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0805]/95 via-[#0d0805]/40 to-[#0d0805]/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0805]/70 via-transparent to-transparent" />
      </div>

      {/* Floating trust badge — visible sm+ only */}
      <div className="absolute top-24 right-4 sm:top-28 sm:right-8 md:right-12 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-2 md:px-4 md:py-3 text-white text-center hidden sm:block">
        <p className="text-xl md:text-2xl font-bold leading-none">500+</p>
        <p className="text-[10px] md:text-xs opacity-80 mt-0.5">Happy Customers</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-5 sm:px-8 md:px-16 w-full max-w-3xl">
        {/* Social proof row */}
        <div className="mb-4 flex items-center gap-3 flex-wrap">
          <div className="flex -space-x-2">
            {["F","A","C","B"].map((l, i) => (
              <div
                key={i}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-rose-300 to-rose-500 border-2 border-white flex items-center justify-center text-white text-[10px] sm:text-xs font-bold"
              >
                {l}
              </div>
            ))}
          </div>
          <p className="text-white/80 text-xs sm:text-sm">
            Loved by <span className="text-white font-semibold">500+ customers</span> in Nigeria
          </p>
        </div>

        <h1 className="text-[2.6rem] leading-[1.08] sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 tracking-tight">
          Every Cake,<br />
          <span className="text-rose-300">A Masterpiece.</span>
        </h1>

        <p className="text-white/75 text-sm sm:text-base md:text-xl max-w-lg mb-7 sm:mb-10 leading-relaxed">
          Handcrafted luxury cakes for your most treasured moments — birthdays, weddings, celebrations. Premium quality, made affordable.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-[14px] bg-rose-400 active:bg-rose-500 hover:bg-rose-300 text-white rounded-full font-semibold text-base transition-all duration-300 shadow-lg shadow-rose-900/40 touch-manipulation"
          >
            <span>💬</span>
            Order Your Cake Now
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center px-7 py-[14px] border border-white/30 text-white rounded-full font-medium text-base hover:bg-white/10 active:bg-white/15 transition-all duration-300 touch-manipulation"
          >
            View Our Collection
          </a>
        </div>

        {/* Quick trust signals */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 sm:mt-8">
          {[
            "Same-day delivery",
            "Custom designs",
            "100% fresh",
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-1.5 text-white/60 text-xs sm:text-sm">
              <span className="text-rose-400 text-[8px]">✦</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
import { Sparkles, BadgeDollarSign, ShieldCheck, Truck, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Ingredients",
    description: "Only the finest, freshest ingredients — imported butter, real vanilla, premium chocolate. You'll taste the difference.",
    stat: "100%",
    statLabel: "Fresh",
  },
  {
    icon: BadgeDollarSign,
    title: "Affordable Luxury",
    description: "Luxury doesn't have to break the bank. Premium quality, prices that make sense for Nigerian families.",
    stat: "₦",
    statLabel: "Fair Price",
  },
  {
    icon: ShieldCheck,
    title: "Hygienic Kitchen",
    description: "Baked in a spotlessly clean kitchen with the highest food safety standards. Your health is our priority.",
    stat: "A+",
    statLabel: "Cleanliness",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Get your order delivered quickly, fresh and beautifully packaged to preserve every detail.",
    stat: "Fast",
    statLabel: "Delivery",
  },
  {
    icon: Clock,
    title: "Same-Day Orders",
    description: "Need a cake urgently? We accept same-day orders. Just reach out and we'll make it happen.",
    stat: "24hr",
    statLabel: "Turnaround",
  },
  {
    icon: Star,
    title: "Custom Designs",
    description: "Tell us your vision — theme, colors, size, tiers — and we'll bring it to life exactly as you imagined.",
    stat: "∞",
    statLabel: "Possibilities",
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-us" className="py-16 sm:py-24 md:py-28 px-5 sm:px-6 bg-[#f8f4f0]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <p className="text-rose-500 text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-3">
            Why Feline's
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-[#0d0805] leading-tight">
            The Difference You <br className="hidden sm:block"/>
            <span className="text-rose-400">Can Taste</span>
          </h2>
          <p className="text-[#0d0805]/50 mt-4 sm:mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed px-2">
            We're not just bakers. We're memory-makers for your most important moments.
          </p>
        </div>

        {/* Feature grid — 1 col mobile, 2 col sm, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#0d0805]/5 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500 active:scale-[0.99]"
            >
              <div className="flex items-start justify-between mb-5 sm:mb-6">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-rose-50 flex items-center justify-center group-hover:bg-rose-400 transition-colors duration-300 shrink-0">
                  <f.icon className="w-5 h-5 text-rose-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-right">
                  <p className="text-xl sm:text-2xl font-bold text-[#0d0805] font-serif leading-none">{f.stat}</p>
                  <p className="text-[10px] sm:text-xs text-[#0d0805]/40 tracking-wide uppercase mt-0.5">{f.statLabel}</p>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0d0805] mb-2 sm:mb-3">{f.title}</h3>
              <p className="text-[#0d0805]/55 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Mid-section CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-[#0d0805]/50 mb-5 text-base sm:text-lg">
            Ready to experience the Feline's difference?
          </p>
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 sm:px-10 py-4 bg-[#0d0805] hover:bg-rose-800 active:bg-rose-900 text-white rounded-full font-bold text-sm sm:text-base transition-all duration-300 shadow-lg touch-manipulation"
          >
            💬 Start Your Order
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
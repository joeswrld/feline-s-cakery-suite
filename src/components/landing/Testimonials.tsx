import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star } from "lucide-react";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return null;
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-28 px-6 bg-[#0d0805]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-rose-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              They Loved It.<br />
              <span className="text-white/35">You Will Too.</span>
            </h2>
          </div>
          {/* Overall rating */}
          <div className="shrink-0 text-right">
            <p className="text-7xl font-serif font-bold text-white leading-none">5.0</p>
            <div className="flex gap-1 justify-end mt-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-rose-400 text-rose-400" />)}
            </div>
            <p className="text-white/40 text-sm mt-1">{testimonials.length}+ verified reviews</p>
          </div>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, index) => (
            <div 
              key={t.id} 
              className={`group p-7 rounded-3xl border border-white/8 hover:border-rose-400/30 transition-all duration-500 hover:-translate-y-1 ${
                index % 3 === 0 ? 'bg-white/5' : index % 3 === 1 ? 'bg-white/3' : 'bg-rose-900/15'
              }`}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-rose-400 text-rose-400" />)}
              </div>

              {/* Quote */}
              <p className="text-white/80 leading-relaxed text-base mb-6 font-light">
                "{t.message}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                {t.photo_url ? (
                  <img src={t.photo_url} alt={t.customer_name} className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-400/30" loading="lazy" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-rose-400/20 flex items-center justify-center text-rose-400 font-bold text-sm ring-2 ring-rose-400/20">
                    {t.customer_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-white font-semibold text-sm">{t.customer_name}</p>
                  <p className="text-white/40 text-xs">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof CTA */}
        <div className="mt-14 text-center">
          <p className="text-white/40 text-base mb-6">Join hundreds of happy customers across Nigeria</p>
          <a
            href="https://wa.me/2349163479043?text=Hi! I saw your reviews and I'd love to place an order!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-4 bg-rose-400 hover:bg-rose-300 text-white rounded-full font-bold text-base transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-rose-900/40"
          >
            💬 Order Now — Join Our Happy Customers
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
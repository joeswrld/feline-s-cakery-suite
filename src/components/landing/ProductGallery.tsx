import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProductGallery = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="products" className="py-16 sm:py-24 px-5 sm:px-6 bg-[#0d0805]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-16">
          <div>
            <p className="text-rose-400 text-xs font-semibold tracking-[0.3em] uppercase mb-2 sm:mb-3">
              Our Collection
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Handcrafted<br />
              <span className="text-white/40">With Love</span>
            </h2>
          </div>
          <a
            href="https://wa.me/2349163479043?text=Hi! I'd like to order a custom cake. Can you help me?"
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 border border-white/20 text-white/80 hover:text-white hover:border-rose-400/50 rounded-full text-sm font-medium transition-all duration-300 touch-manipulation"
          >
            Request Custom Design →
          </a>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-2xl sm:rounded-3xl aspect-[4/5] animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/5"
              >
                {/* Image */}
                <div className="aspect-[4/5]">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl sm:text-7xl bg-gradient-to-br from-rose-900/20 to-rose-800/10">
                      🎂
                    </div>
                  )}
                  {/* Gradient overlay — always present, darker at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0805]/90 via-[#0d0805]/20 to-transparent" />
                </div>

                {/* Card content — always visible, not hover-gated */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white mb-1 leading-snug">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-white/55 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  )}
                  {/* CTA — always shown on mobile, hover-enhanced on desktop */}
                  <a
                    href={`https://wa.me/2349163479043?text=Hi! I'd love to order the "${product.name}" cake. What are the details and pricing?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 bg-rose-400 hover:bg-rose-300 active:bg-rose-500 text-white rounded-full text-xs sm:text-sm font-semibold transition-colors touch-manipulation sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 sm:transition-all sm:duration-300"
                  >
                    💬 Order This Cake
                  </a>
                </div>

                {/* Popular badge */}
                {index === 0 && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-rose-400 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full tracking-wide">
                    POPULAR
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <div className="text-7xl sm:text-8xl mb-5">🎂</div>
            <p className="text-white/50 text-lg sm:text-xl mb-7">Our cake collection is coming soon!</p>
            <a
              href="https://wa.me/2349163479043"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-400 text-white rounded-full font-semibold hover:bg-rose-300 transition-colors touch-manipulation"
            >
              💬 Ask About Our Cakes
            </a>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div className="mt-10 sm:mt-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-white/3 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-white font-serif text-xl sm:text-2xl font-bold">
              Don't see what you want?
            </p>
            <p className="text-white/50 mt-1 text-sm sm:text-base">
              We create fully custom designs. Just describe your dream cake.
            </p>
          </div>
          <a
            href="https://wa.me/2349163479043?text=Hi! I want a custom cake design. Can we talk?"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#0d0805] rounded-full font-bold text-sm hover:bg-rose-50 active:bg-rose-100 transition-colors touch-manipulation w-full sm:w-auto"
          >
            💬 Design Your Custom Cake
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
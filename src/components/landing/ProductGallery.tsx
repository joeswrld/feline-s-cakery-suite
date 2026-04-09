import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProductGallery = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section id="products" className="py-28 px-6 bg-[#0d0805]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-rose-400 text-xs font-semibold tracking-[0.3em] uppercase mb-3">Our Collection</p>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Handcrafted<br />
              <span className="text-white/40">With Love</span>
            </h2>
          </div>
          <a
            href="https://wa.me/2349163479043?text=Hi! I'd like to order a custom cake. Can you help me?"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/80 hover:text-white hover:border-rose-400/50 rounded-full text-sm font-medium transition-all duration-300"
          >
            Request Custom Design →
          </a>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-3xl h-96 animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={product.id} className={`group relative rounded-3xl overflow-hidden ${index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                {/* Image */}
                <div className="aspect-[4/5] bg-white/5">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-rose-900/20 to-rose-800/10">
                      🎂
                    </div>
                  )}
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0805] via-[#0d0805]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-serif font-bold text-white mb-1">{product.name}</h3>
                  {product.description && (
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                  )}
                  {/* CTA — appears on hover */}
                  <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <a
                      href={`https://wa.me/2349163479043?text=Hi! I'd love to order the "${product.name}" cake. What are the details and pricing?`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-400 hover:bg-rose-300 text-white rounded-full text-sm font-semibold transition-colors"
                    >
                      💬 Order This Cake
                    </a>
                  </div>
                </div>

                {/* "NEW" badge for first product */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 bg-rose-400 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                    POPULAR
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">🎂</div>
            <p className="text-white/50 text-xl mb-8">Our cake collection is coming soon!</p>
            <a
              href="https://wa.me/2349163479043"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-400 text-white rounded-full font-semibold hover:bg-rose-300 transition-colors"
            >
              💬 Ask About Our Cakes
            </a>
          </div>
        )}

        {/* Bottom CTA strip */}
        <div className="mt-16 p-8 rounded-3xl border border-white/10 bg-white/3 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-serif text-2xl font-bold">Don't see what you want?</p>
            <p className="text-white/50 mt-1">We create fully custom designs. Just describe your dream cake.</p>
          </div>
          <a
            href="https://wa.me/2349163479043?text=Hi! I want a custom cake design. Can we talk?"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0d0805] rounded-full font-bold text-sm hover:bg-rose-50 transition-colors"
          >
            💬 Design Your Custom Cake
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductGallery;
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
    <section id="products" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Our Collection</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Handcrafted With Love</h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-muted rounded-lg h-80 animate-pulse" />
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer animate-fade-in-up">
                <div className="aspect-square rounded-2xl overflow-hidden bg-blush mb-4">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <span className="text-6xl">🎂</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-1">{product.name}</h3>
                {product.description && (
                  <p className="text-muted-foreground text-sm">{product.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">Our cake collection is coming soon! 🎂</p>
        )}
      </div>
    </section>
  );
};

export default ProductGallery;

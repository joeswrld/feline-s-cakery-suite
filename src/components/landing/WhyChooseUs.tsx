import { Sparkles, BadgeDollarSign, ShieldCheck, Truck } from "lucide-react";

const features = [
  { icon: Sparkles, title: "Premium Ingredients", description: "Only the finest, freshest ingredients make it into our cakes." },
  { icon: BadgeDollarSign, title: "Affordable Pricing", description: "Luxury doesn't have to break the bank. Premium quality, fair prices." },
  { icon: ShieldCheck, title: "Clean & Hygienic", description: "Baked in a spotless kitchen with the highest hygiene standards." },
  { icon: Truck, title: "Fast Delivery", description: "Get your orders delivered quickly, fresh and beautifully packaged." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Why Us</p>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">Why Choose Feline's</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-card hover:shadow-lg transition-shadow duration-300 animate-fade-in-up">
              <div className="w-14 h-14 rounded-full bg-blush flex items-center justify-center mx-auto mb-5">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

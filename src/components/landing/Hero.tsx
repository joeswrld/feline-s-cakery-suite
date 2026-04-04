import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="Luxury cakes display" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/90" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in-up">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4">Feline's Cakery</p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
          Luxury Cakes, Made Affordable
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
          Freshly baked with the finest ingredients, crafted for your special moments.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/2349163479043"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
          >
            Order Now
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-medium text-lg hover:bg-foreground/5 transition-colors"
          >
            View Cakes
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

const CTASection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
          Ready to Order Your Dream Cake?
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Let us create something special for your celebration. Reach out today!
        </p>
        <a
          href="https://wa.me/2349163479043"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
        >
          💬 Chat on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default CTASection;

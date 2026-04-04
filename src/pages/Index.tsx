import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import ProductGallery from "@/components/landing/ProductGallery";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Testimonials from "@/components/landing/Testimonials";
import BrandStory from "@/components/landing/BrandStory";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProductGallery />
        <WhyChooseUs />
        <Testimonials />
        <BrandStory />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Occasions from "@/components/Occasions";
import Customizer from "@/components/Customizer";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import EggGlider from "@/components/EggGlider";

export default function Home() {
  return (
    <>
      <EggGlider />
      <Navbar />
      <Hero />
      <WhyChooseUs />
      <HowItWorks />
      <Occasions />
      <Customizer />
      <Testimonials />
      <Footer />
    </>
  );
}

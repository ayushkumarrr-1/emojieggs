import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
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
      <HowItWorks />
      <Occasions />
      <Customizer />
      <Testimonials />
      <Footer />
    </>
  );
}

import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Navbar from "@/components/home/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};

export default page;

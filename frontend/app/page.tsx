import Category from "@/components/home/Category";
import CTA from "@/components/home/CTA";
import Doctors from "@/components/home/Doctors";
import Footer from "@/components/home/Footer";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import Navbar from "@/components/home/Navbar";

const page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Category />
      <Doctors />
      <HowItWorks />
      <CTA />
      <Footer />
    </>
  );
};

export default page;

import FAQ from "../components/landing/FAQ";
import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";
import Hero from "../components/landing/Hero";
import HowItWorks from "../components/landing/HowItWorks";
import Navbar from "../components/landing/Navbar";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <Footer />
    </>
  );
};

export default LandingPage;
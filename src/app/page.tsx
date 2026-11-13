import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RandomQuoteGenerator from "@/components/RandomQuoteGenerator";
import QuoteSection from "@/components/QuoteSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#3E362E] relative selection:bg-[#C8A98E]/30 selection:text-[#3E362E]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <RandomQuoteGenerator />
        <QuoteSection />
        <AboutSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

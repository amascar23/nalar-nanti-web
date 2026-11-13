import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RandomQuoteGenerator from "@/components/RandomQuoteGenerator";
import QuoteSection from "@/components/QuoteSection";
import RequestSection from "@/components/RequestSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ThemeBackground from "@/components/ThemeBackground";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen text-[#3E362E] relative selection:bg-[#C8A98E]/30 selection:text-[#3E362E] overflow-x-hidden">
      <ThemeBackground />
      <Navbar />
      <main className="flex-grow relative z-10">
        <HeroSection />
        <RandomQuoteGenerator />
        <QuoteSection />
        <RequestSection />
        <AboutSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

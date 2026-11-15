import { getQuotes } from "@/lib/getQuotes";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MoodGuideSection from "@/components/MoodGuideSection";
import RandomQuoteGenerator from "@/components/RandomQuoteGenerator";
import QuoteSection from "@/components/QuoteSection";
import PersonalSpaceSection from "@/components/PersonalSpaceSection";
import RequestSection from "@/components/RequestSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default async function HomePage() {
  const quotes = await getQuotes();

  return (
    <div className="flex flex-col min-h-screen text-[#3E362E] dark:text-[#EDE6DC] relative selection:bg-[#C8A98E]/30 selection:text-[#3E362E] overflow-x-hidden">
      <Navbar />
      <main className="flex-grow relative z-10">
        <HeroSection quotes={quotes} />
        <MoodGuideSection quotes={quotes} />
        <RandomQuoteGenerator quotes={quotes} />
        <QuoteSection isPreview={true} quotes={quotes} />
        <PersonalSpaceSection />
        <RequestSection />
        <AboutSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

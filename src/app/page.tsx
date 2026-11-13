import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuoteSection from "@/components/QuoteSection";
import RandomReminderSection from "@/components/RandomReminderSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F2] text-[#3E362E]">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <QuoteSection />
        <RandomReminderSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}


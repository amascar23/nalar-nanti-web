import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CustomCardStudio from "@/components/CustomCardStudio";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Racik Kartu Sendiri — Nalar Nanti",
  description:
    "Tuliskan kalimat renungan, motivasi, atau bait doa versimu sendiri dan unduh menjadi kartu estetis vertikal Story 9:16 (1080 x 1920 piksel) khas Nalar Nanti (@nalarnanti).",
};

export default function RacikPage() {
  return (
    <div className="flex flex-col min-h-screen text-[#3E362E] relative selection:bg-[#C8A98E]/30 selection:text-[#3E362E] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow relative z-10 py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        {/* Tombol Navigasi Kembali ke Beranda */}
        <div className="max-w-6xl mx-auto mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#7A6F64] hover:text-[#3E362E] bg-[#F3EDE2]/80 hover:bg-[#EAE1D3] border border-[#E5DDD0] px-3.5 py-2 rounded-xl transition-all shadow-soft active:scale-95 group whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>← Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Studio Racik Kartu */}
        <CustomCardStudio />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

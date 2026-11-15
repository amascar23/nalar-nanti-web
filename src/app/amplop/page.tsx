import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import EnvelopeView from "@/components/EnvelopeView";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Amplop Pengingat — Nalar Nanti",
  description:
    "Sebuah amplop pengingat hangat dan kutipan titipan dari seseorang untukmu melalui Nalar Nanti (@nalarnanti).",
};

function EnvelopeLoadingFallback() {
  return (
    <div className="w-full max-w-lg mx-auto bg-[#F3EDE2] dark:bg-[#26221F] border border-[#DDD3C3] dark:border-[#3A332E] rounded-3xl p-8 sm:p-12 shadow-floating text-center animate-pulse">
      <div className="w-16 h-16 rounded-full bg-[#EAE1D3] dark:bg-[#322C27] border border-[#DDD3C3] dark:border-[#443C36] flex items-center justify-center mx-auto mb-4">
        <Mail className="w-8 h-8 text-[#C8A98E]" />
      </div>
      <div className="h-4 bg-[#EAE1D3] dark:bg-[#322C27] rounded-full max-w-[180px] mx-auto mb-2" />
      <div className="h-6 bg-[#EAE1D3] dark:bg-[#322C27] rounded-full max-w-[240px] mx-auto mb-4" />
      <p className="text-xs text-[#7A6F64] dark:text-[#A89F94] flex items-center justify-center gap-2">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A98E]" />
        <span>Menyiapkan amplop pengingat...</span>
      </p>
    </div>
  );
}

export default function AmplopPage() {
  return (
    <div className="flex flex-col min-h-screen text-[#3E362E] dark:text-[#EDE6DC] relative selection:bg-[#C8A98E]/30 selection:text-[#3E362E] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow relative z-10 py-6 sm:py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        {/* Tombol Navigasi Kembali ke Beranda */}
        <div className="w-full max-w-2xl mb-4 sm:mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] bg-[#F3EDE2]/80 dark:bg-[#26221F] hover:bg-[#EAE1D3] dark:hover:bg-[#322C27] border border-[#E5DDD0] dark:border-[#3A332E] px-3.5 py-2 rounded-xl transition-all shadow-soft active:scale-95 group whitespace-nowrap"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Komponen Amplop dengan Pembaca Query Params di dalam Suspense */}
        <Suspense fallback={<EnvelopeLoadingFallback />}>
          <EnvelopeView />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

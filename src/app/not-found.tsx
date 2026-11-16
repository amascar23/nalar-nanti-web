import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Compass, ArrowLeft, Home, Sparkles } from "lucide-react";

export const metadata = {
  title: "Halaman Tidak Ditemukan — Nalar Nanti",
  description: "Halaman yang kamu cari sedang menepi sejenak. Mari kembali ke ruang teduh Nalar Nanti.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen text-[#3E362E] dark:text-[#EDE6DC] relative selection:bg-[#C8A98E]/30 selection:text-[#3E362E] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full text-center">
          {/* Ikon Kompas Teduh */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] shadow-floating flex items-center justify-center text-[#C8A98E] relative group">
            <Compass className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5] group-hover:rotate-45 transition-transform duration-500 text-[#C8A98E]" />
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#8E9B8E] text-[#FAF7F2] text-[10px] font-bold flex items-center justify-center shadow-xs">
              404
            </span>
          </div>

          {/* Badge Pengantar */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
            <span>Sedang Menepi Sejenak</span>
          </div>

          {/* Judul Utama */}
          <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-3">
            Halaman Ini Belum Ditemukan
          </h1>

          {/* Pesan Empatis Khas Nalar Nanti */}
          <p className="font-serif italic text-sm sm:text-base text-[#7A6F64] dark:text-[#A89F94] leading-relaxed mb-6">
            “Kadang kita perlu tersesat sebentar untuk menyadari ke mana langkah dan hati sebenarnya ingin pulang.”
          </p>

          <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed mb-8 max-w-sm mx-auto">
            Tautan yang kamu tuju mungkin telah berpindah tempat, dihapus, atau sedang beristirahat. Mari kembali ke beranda untuk menata nalar bersama.
          </p>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:brightness-105 transition-all shadow-soft active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Pulang ke Beranda</span>
            </Link>

            <Link
              href="/koleksi"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] font-semibold text-xs sm:text-sm hover:border-[#C8A98E] transition-all shadow-soft active:scale-95"
            >
              <span>Jelajahi Koleksi Nalar</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

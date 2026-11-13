"use client";

import React, { useState } from "react";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import {
  Sparkles,
  Copy,
  Check,
  MessageCircle,
  Quote as QuoteIcon,
  ArrowDown,
  RefreshCw,
  Feather,
} from "lucide-react";

export default function HeroSection() {
  // Ambil kutipan-kutipan yang ditandai isFeatured: true
  const featuredQuotes = QUOTES_DATA.filter((q) => q.isFeatured);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  // Fallback jika tidak ada featured
  const currentQuote: QuoteItem =
    featuredQuotes[activeFeaturedIndex] || QUOTES_DATA[0];

  const handleCopyQuote = () => {
    const textToCopy = `“${currentQuote.quote}” (${currentQuote.source}) — Nalar Nanti`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  const handleShareWhatsApp = () => {
    const message = `🌿 *Nalar Hari Ini — ${currentQuote.themeTitle}*\n\n“${currentQuote.quote}”\n— ${currentQuote.source}\n\n_${currentQuote.reflection}_\n\n— Nalar Nanti (Ruang Singgah untuk Hati & Pikiran)\nhttps://nalarnanti.com`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleNextFeatured = () => {
    if (featuredQuotes.length > 1) {
      setActiveFeaturedIndex((prev) => (prev + 1) % featuredQuotes.length);
      setIsCopied(false);
    }
  };

  return (
    <section
      id="beranda"
      className="relative pt-28 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[650px] h-[550px] sm:h-[650px] bg-[#F3EDE2] rounded-full blur-3xl opacity-80 pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-4 sm:right-8 w-60 sm:w-72 h-60 sm:h-72 bg-[#8E9B8E]/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-4 sm:left-8 w-60 sm:w-72 h-60 sm:h-72 bg-[#C8A98E]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 1. Tagline kecil yang hangat di atas judul */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 rounded-full bg-[#F3EDE2] border border-[#E5DDD0] text-xs font-medium text-[#7A6F64] mb-6 sm:mb-8 shadow-soft">
          <span className="w-2 h-2 rounded-full bg-[#8E9B8E] animate-pulse" />
          <span>Ruang Singgah untuk Hati {"&"} Pikiran</span>
        </div>

        {/* 2. Judul utama yang menenangkan & deskripsi singkat */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#3E362E] max-w-3xl mx-auto leading-[1.28] sm:leading-[1.2] mb-5 sm:mb-6">
          Beri jeda sejenak, biarkan hati dan nalar menemukan{" "}
          <span className="italic font-normal text-[#C8A98E] underline decoration-[#E5DDD0] underline-offset-8">
            keteduhannya
          </span>
          .
        </h1>

        <p className="font-sans text-sm sm:text-lg text-[#7A6F64] max-w-2xl mx-auto leading-relaxed mb-10 sm:mb-12">
          Selamat datang di <strong className="text-[#3E362E] font-medium">Nalar Nanti</strong>. 
          Sebuah ruang berbagi kata-kata motivasi Islami dan refleksi kehidupan sehari-hari, 
          menemani setiap langkahmu untuk bernapas lebih tenang, menerima proses, dan berprasangka baik pada setiap ketetapan.
        </p>

        {/* 3. Kartu Sorotan Utama: "Nalar Hari Ini" */}
        <div className="max-w-2xl mx-auto text-left relative">
          <div className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-3xl p-6 sm:p-10 shadow-card transition-all duration-300 relative group overflow-hidden">
            {/* Header Kartu */}
            <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#E5DDD0]/80">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C8A98E]/20 text-[#886950]">
                  <Sparkles className="w-4 h-4 text-[#C8A98E]" />
                </span>
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <span className="font-serif text-base sm:text-lg font-semibold text-[#3E362E]">
                      Nalar Hari Ini
                    </span>
                    <span
                      suppressHydrationWarning
                      className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8E9B8E] border border-[#E5DDD0]"
                    >
                      {currentQuote.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#7A6F64] flex items-center gap-1.5 mt-0.5 font-sans">
                    <span className="font-semibold text-[#8E9B8E]">#{currentQuote.orderNumber}</span>
                    <span>•</span>
                    <span suppressHydrationWarning className="line-clamp-1">{currentQuote.themeTitle}</span>
                  </p>
                </div>
              </div>

              {featuredQuotes.length > 1 && (
                <button
                  onClick={handleNextFeatured}
                  title="Lihat kutipan pilihan lainnya"
                  aria-label="Lihat kutipan pilihan berikutnya"
                  className="inline-flex items-center gap-1.5 text-xs text-[#7A6F64] hover:text-[#3E362E] px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] hover:border-[#C8A98E] active:scale-95 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">Pilihan Lain</span>
                </button>
              )}
            </div>

            {/* Kutipan Utama */}
            <div className="relative mb-5 sm:mb-6">
              <QuoteIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#C8A98E]/30 absolute -top-3 -left-1 sm:-left-2 -z-0" />
              <blockquote
                suppressHydrationWarning
                className="font-serif italic text-lg sm:text-2xl text-[#3E362E] leading-relaxed relative z-10 pl-2"
              >
                “{currentQuote.quote}”
              </blockquote>
              <div className="mt-3 pl-2 flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium text-[#7A6F64]">
                <Feather className="w-3.5 h-3.5 text-[#C8A98E]" />
                <span suppressHydrationWarning>{currentQuote.source}</span>
              </div>
            </div>

            {/* Catatan Refleksi */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E5DDD0]/80 mb-6 sm:mb-8">
              <p className="text-[11px] uppercase tracking-wider text-[#8E9B8E] font-semibold mb-1.5">
                Renungan Singkat
              </p>
              <p
                suppressHydrationWarning
                className="font-sans text-xs sm:text-sm text-[#7A6F64] leading-relaxed"
              >
                {currentQuote.reflection}
              </p>
            </div>

            {/* 4. Dua Tombol Interaktif yang Rapi (Mobile Friendly) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="grid grid-cols-1 sm:flex items-center gap-2.5 w-full sm:w-auto">
                {/* Tombol Salin Kutipan */}
                <button
                  onClick={handleCopyQuote}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 group"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-[#8E9B8E]" />
                      <span className="text-[#8E9B8E] font-semibold">
                        Kutipan berhasil disalin!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#7A6F64] group-hover:text-[#C8A98E] transition-colors" />
                      <span>Salin Kutipan</span>
                    </>
                  )}
                </button>

                {/* Tombol Bagikan ke WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#FAF7F2]" />
                  <span>Bagikan ke WhatsApp</span>
                </button>
              </div>

              {/* Tag Penutup Kredit */}
              <span className="text-[11px] text-[#7A6F64] text-center sm:text-right italic font-serif mt-1 sm:mt-0">
                — Nalar Nanti
              </span>
            </div>

            {/* Pesan Feedback Kecil ketika Berhasil Disalin */}
            {isCopied && (
              <div className="mt-3 text-center sm:text-left text-xs font-medium text-[#8E9B8E] animate-fadeIn">
                ✓ Kutipan berhasil disalin ke papan klip! Siap dibagikan ke status atau catatanmu.
              </div>
            )}
          </div>
        </div>

        {/* Tombol Navigasi Lembut ke Bagian Bawah */}
        <div className="mt-12 sm:mt-14 flex items-center justify-center gap-5 text-xs text-[#7A6F64]">
          <a
            href="#pengingat"
            className="hover:text-[#3E362E] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Ambil Pengingat</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
          <span className="text-[#E5DDD0]">•</span>
          <a
            href="#kutipan"
            className="hover:text-[#3E362E] transition-colors"
          >
            Koleksi Nalar
          </a>
        </div>
      </div>
    </section>
  );
}

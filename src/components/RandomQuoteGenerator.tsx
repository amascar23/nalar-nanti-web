"use client";

import React, { useState, useEffect } from "react";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import {
  Sparkles,
  Copy,
  Check,
  MessageCircle,
  Quote as QuoteIcon,
  RefreshCw,
  Heart,
  Feather,
} from "lucide-react";

export default function RandomQuoteGenerator() {
  // Inisialisasi deterministik agar SSR & Client render identik 100% tanpa hydration mismatch
  const [currentQuote, setCurrentQuote] = useState<QuoteItem>(QUOTES_DATA[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [shuffleCount, setShuffleCount] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Menandai bahwa komponen telah ter-mount di client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGetRandomQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Pastikan tidak mengulang kutipan yang sama persis berturut-turut dari 18 kutipan asli
    let nextIndex = 0;
    do {
      nextIndex = Math.floor(Math.random() * QUOTES_DATA.length);
    } while (
      QUOTES_DATA.length > 1 &&
      QUOTES_DATA[nextIndex].id === currentQuote.id
    );

    setTimeout(() => {
      setCurrentQuote(QUOTES_DATA[nextIndex]);
      setIsAnimating(false);
      setIsCopied(false);
      setShuffleCount((prev) => prev + 1);
    }, 220);
  };

  const handleCopy = () => {
    // Format selaras dengan kartu @nalarnanti: "<kutipan>" — <source> (Nalar Nanti)
    const textToCopy = `“${currentQuote.quote}” — ${currentQuote.source} (Nalar Nanti)\n\n${currentQuote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌿 *Pengingat Nalar Nanti — ${currentQuote.themeTitle}*\n\n“${currentQuote.quote}”\n— ${currentQuote.source} (Nalar Nanti)\n\n_${currentQuote.reflection}_\n\n— Ruang Singgah untuk Menata Nalar & Merakit Asa\nhttps://nalarnanti.com`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="pengingat"
      className="py-14 sm:py-24 bg-[#FAF7F2] border-t border-[#E5DDD0]/70 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-[#F3EDE2] rounded-full blur-3xl opacity-80 pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-2 sm:right-12 w-44 sm:w-64 h-44 sm:h-64 bg-[#8E9B8E]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Bagian */}
        <div className="max-w-xl mx-auto mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 sm:mb-2.5">
            <Heart className="w-3.5 h-3.5 fill-[#8E9B8E]" />
            <span>Pesan untuk Jiwamu</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-2.5 sm:mb-3">
            Butuh Satu Pengingat Hari Ini?
          </h2>
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] leading-relaxed">
            Klik tombol di bawah untuk mengambil satu pesan acak yang mungkin sedang hatimu butuhkan.
          </p>
        </div>

        {/* Tombol Bergaya Pill dengan Warna Aksen #C8A98E */}
        <div className="mb-8 sm:mb-10">
          <button
            onClick={handleGetRandomQuote}
            disabled={isAnimating}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-9 sm:py-4 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-base hover:bg-[#B9967A] transition-all duration-300 shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-70 group min-h-[48px]"
          >
            <Sparkles
              className={`w-4 h-4 sm:w-5 sm:h-5 text-[#FAF7F2] ${
                isAnimating ? "animate-spin" : "group-hover:rotate-12 transition-transform"
              }`}
            />
            <span>Ambil Satu Pengingat</span>
            <RefreshCw
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FAF7F2]/80 ml-0.5 sm:ml-1 ${
                isAnimating ? "animate-spin" : ""
              }`}
            />
          </button>

          <p className="text-[11px] text-[#7A6F64]/70 mt-2 font-sans">
            Telah diambil {shuffleCount} kali sesi hening
          </p>
        </div>

        {/* Kartu Soft Cream dengan Format Selaras Kartu @nalarnanti */}
        <div className="max-w-2xl mx-auto text-left">
          <div
            className={`bg-[#F3EDE2] border border-[#E5DDD0] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-card transition-all duration-300 relative group overflow-hidden ${
              isAnimating
                ? "opacity-30 scale-[0.98] blur-[1px]"
                : "opacity-100 scale-100 blur-0"
            }`}
          >
            {/* Header Kartu: Label Kategori, Nomor Urut & Judul Tema */}
            <div className="flex items-start sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#E5DDD0]/80">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#C8A98E]/20 text-[#886950] shrink-0">
                  <Sparkles className="w-4 h-4 text-[#C8A98E]" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E]">
                      Pengingat Acak
                    </span>
                    <span
                      suppressHydrationWarning
                      className="text-[10px] text-[#886950] font-bold bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E5DDD0]"
                    >
                      #{currentQuote.orderNumber}
                    </span>
                    <span
                      suppressHydrationWarning
                      className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8E9B8E] border border-[#E5DDD0]"
                    >
                      {currentQuote.category}
                    </span>
                  </div>

                  {/* Judul Tema Kartu */}
                  <h3
                    suppressHydrationWarning
                    className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] mt-1 leading-snug"
                  >
                    {currentQuote.themeTitle}
                  </h3>
                </div>
              </div>

              <span
                suppressHydrationWarning
                className="hidden sm:inline-block text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#C8A98E]/15 text-[#886950] shrink-0"
              >
                Nuansa {currentQuote.type}
              </span>
            </div>

            {/* Teks Kutipan Utama (Lora Serif) */}
            <div className="relative mb-5 sm:mb-6">
              <QuoteIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#C8A98E]/30 absolute -top-2.5 -left-1 sm:-left-2 -z-0" />
              <blockquote
                suppressHydrationWarning
                className="font-serif italic text-base sm:text-xl md:text-2xl text-[#3E362E] leading-relaxed relative z-10 pl-2"
              >
                “{currentQuote.quote}”
              </blockquote>

              {/* Badge Sumber dengan Latar Soft Cream Hangat (#EAE1D3) */}
              <div className="mt-3.5 pl-2 flex items-center">
                <span
                  suppressHydrationWarning
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-[#EAE1D3] text-[#3E362E] border border-[#DDD3C3] shadow-soft"
                >
                  <Feather className="w-3.5 h-3.5 text-[#886950] shrink-0" />
                  <span>{currentQuote.source}</span>
                </span>
              </div>
            </div>

            {/* Catatan Refleksi */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E5DDD0]/80 mb-5 sm:mb-7">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] mb-1">
                Catatan Refleksi
              </p>
              <p
                suppressHydrationWarning
                className="font-sans text-xs sm:text-sm text-[#7A6F64] leading-relaxed"
              >
                {currentQuote.reflection}
              </p>
            </div>

            {/* Footer Kartu: Tombol Salin Kutipan dan Bagikan ke WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#E5DDD0]/70">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                {/* Tombol Salin */}
                <button
                  onClick={handleCopy}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 group"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      <span className="text-[#8E9B8E]">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A6F64] group-hover:text-[#C8A98E] transition-colors" />
                      <span>Salin Kutipan</span>
                    </>
                  )}
                </button>

                {/* Tombol Bagikan ke WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-4 py-2.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95 group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>WhatsApp</span>
                </button>
              </div>

              <span className="text-[11px] text-[#7A6F64] text-center sm:text-right italic font-serif mt-1 sm:mt-0">
                — Nalar Nanti
              </span>
            </div>

            {/* Feedback Salin */}
            {isCopied && (
              <p className="mt-3 text-xs text-[#8E9B8E] font-medium text-center sm:text-left animate-fadeIn">
                ✓ Kutipan berhasil disalin ke papan klip! Siap dibagikan ke status atau catatanmu.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

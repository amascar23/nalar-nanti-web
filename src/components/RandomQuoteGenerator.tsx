"use client";

import React, { useState } from "react";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import {
  Sparkles,
  Copy,
  Check,
  MessageCircle,
  Quote as QuoteIcon,
  RefreshCw,
  Heart,
  Calendar,
} from "lucide-react";

export default function RandomQuoteGenerator() {
  // Pilih kutipan acak awal yang siap dibaca
  const [currentQuote, setCurrentQuote] = useState<QuoteItem>(() => {
    const initialIndex = Math.floor(Math.random() * QUOTES_DATA.length);
    return QUOTES_DATA[initialIndex];
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shuffleCount, setShuffleCount] = useState(1);

  const handleGetRandomQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Pastikan tidak mengulang kutipan yang sama persis berturut-turut
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
    }, 240);
  };

  const handleCopy = () => {
    const textToCopy = `“${currentQuote.quote}”\n\n${currentQuote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌿 *Pengingat Nalar Nanti*\n\n“${currentQuote.quote}”\n\n_${currentQuote.reflection}_\n\n— https://nalarnanti.com`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
        year: "numeric",
      };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch {
      return dateString;
    }
  };

  return (
    <section
      id="pengingat"
      className="py-14 sm:py-24 bg-[#FAF7F2] border-t border-[#E5DDD0]/70 relative overflow-hidden"
    >
      {/* Subtle background blur rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[500px] h-[450px] sm:h-[500px] bg-[#F3EDE2] rounded-full blur-3xl opacity-80 pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-8 sm:right-12 w-52 sm:w-64 h-52 sm:h-64 bg-[#8E9B8E]/10 rounded-full blur-2xl pointer-events-none -z-10" />

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
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3 sm:px-9 sm:py-4 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-base hover:bg-[#B9967A] transition-all duration-300 shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-70 group"
          >
            <Sparkles className={`w-4 h-4 sm:w-5 sm:h-5 text-[#FAF7F2] ${isAnimating ? "animate-spin" : "group-hover:rotate-12 transition-transform"}`} />
            <span>Ambil Satu Pengingat</span>
            <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FAF7F2]/80 ml-0.5 sm:ml-1 ${isAnimating ? "animate-spin" : ""}`} />
          </button>
          
          <p className="text-[11px] text-[#7A6F64]/70 mt-2 font-sans">
            Telah diambil {shuffleCount} kali sesi hening
          </p>
        </div>

        {/* Kartu Soft Cream dengan Animasi Fade-in yang Lembut */}
        <div className="max-w-2xl mx-auto text-left">
          <div
            className={`bg-[#F3EDE2] border border-[#E5DDD0] rounded-3xl p-6 sm:p-10 shadow-card transition-all duration-300 relative group overflow-hidden ${
              isAnimating
                ? "opacity-30 scale-[0.98] blur-[1px]"
                : "opacity-100 scale-100 blur-0"
            }`}
          >
            {/* Header Kartu: Label Kategori Kecil & Tanggal */}
            <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 sm:pb-3.5 border-b border-[#E5DDD0]/80">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-[#FAF7F2] text-[#8E9B8E] border border-[#E5DDD0]">
                  {currentQuote.category}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#C8A98E]/15 text-[#886950]">
                  {currentQuote.type}
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 text-xs text-[#7A6F64] font-sans">
                <Calendar className="w-3 h-3 text-[#8E9B8E]" />
                {formatDate(currentQuote.date)}
              </span>
            </div>

            {/* Teks Kutipan Utama (Lora Serif) */}
            <div className="relative mb-5 sm:mb-6">
              <QuoteIcon className="w-7 h-7 sm:w-8 sm:h-8 text-[#C8A98E]/30 absolute -top-3 -left-1 sm:-left-2 -z-0" />
              <blockquote className="font-serif italic text-base sm:text-2xl text-[#3E362E] leading-relaxed relative z-10 pl-2">
                “{currentQuote.quote}”
              </blockquote>
            </div>

            {/* Teks Refleksi Singkat */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E5DDD0]/80 mb-6 sm:mb-7">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] mb-1.5">
                Catatan Refleksi
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] leading-relaxed">
                {currentQuote.reflection}
              </p>
            </div>

            {/* Footer Kartu: Tombol Salin dan Bagikan ke WhatsApp */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#E5DDD0]/70">
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                {/* Tombol Salin */}
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 group"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      <span className="text-[#8E9B8E]">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A6F64] group-hover:text-[#C8A98E] transition-colors" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                {/* Tombol Bagikan ke WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 sm:py-2 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#8E9B8E] hover:text-[#8E9B8E] transition-all shadow-soft active:scale-95 group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#8E9B8E] group-hover:scale-110 transition-transform" />
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
                ✓ Kutipan dan refleksi berhasil disalin ke papan klip!
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

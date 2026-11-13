"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    // Format: "<kutipan>" — <source> (Nalar Nanti)
    const textToCopy = `“${currentQuote.quote}” — ${currentQuote.source} (Nalar Nanti)`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2500);
  };

  const handleShareWhatsApp = () => {
    const message = `🌿 *Nalar Hari Ini — ${currentQuote.themeTitle}*\n\n“${currentQuote.quote}”\n— ${currentQuote.source} (Nalar Nanti)\n\n_${currentQuote.reflection}_\n\n— Ruang Singgah untuk Menata Nalar & Merakit Asa\nhttps://nalarnanti.com`;
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
      className="relative pt-24 pb-14 sm:pt-36 sm:pb-24 overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] h-[340px] sm:h-[650px] bg-[#F3EDE2] rounded-full blur-3xl opacity-80 pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-2 sm:right-8 w-44 sm:w-72 h-44 sm:h-72 bg-[#8E9B8E]/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-2 sm:left-8 w-44 sm:w-72 h-44 sm:h-72 bg-[#C8A98E]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Area Teks Hero dengan Background Watermark Logo Nalar Nanti */}
        <div className="relative max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Background Watermark Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[420px] md:w-[480px] h-[280px] sm:h-[420px] md:h-[480px] rounded-full overflow-hidden opacity-10 sm:opacity-[0.14] pointer-events-none select-none -z-0">
            <Image
              src="/images/logo.jpg"
              alt="Watermark Logo Nalar Nanti"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 1. Tagline kecil yang hangat di atas judul */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 rounded-full bg-[#F3EDE2]/90 backdrop-blur-xs border border-[#E5DDD0] text-xs font-medium text-[#7A6F64] mb-5 sm:mb-8 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#8E9B8E] animate-pulse shrink-0" />
            <span>Ruang Singgah untuk Menata Nalar {"&"} Merakit Asa</span>
          </div>

          {/* 2. Judul utama yang puitis dengan font Lora & deskripsi singkat */}
          <h1 className="relative z-10 font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3E362E] max-w-3xl mx-auto leading-[1.3] sm:leading-[1.2] mb-4 sm:mb-6">
            Beri jeda sejenak, biarkan nalar dan hati menemukan{" "}
            <span className="italic font-normal text-[#C8A98E] underline decoration-[#E5DDD0] underline-offset-4 sm:underline-offset-8">
              keteduhannya
            </span>
            .
          </h1>

          <p className="relative z-10 font-sans text-xs sm:text-base lg:text-lg text-[#7A6F64] max-w-2xl mx-auto leading-relaxed">
            Selamat datang di <strong className="text-[#3E362E] font-medium">Nalar Nanti</strong>, rumah digital dari akun Instagram{" "}
            <a
              href="https://www.instagram.com/nalarnanti?exln=MXJsOHM5bDVkb2F1Zg=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3E362E] font-semibold hover:text-[#C8A98E] underline decoration-[#E5DDD0] underline-offset-4 transition-colors"
            >
              @nalarnanti
            </a>{" "}
            dan Saluran WhatsApp{" "}
            <a
              href="https://whatsapp.com/channel/0029VbBLknC7IUYPlfksIh0Y"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3E362E] font-semibold hover:text-[#C8A98E] underline decoration-[#E5DDD0] underline-offset-4 transition-colors"
            >
              @NalarNanti
            </a>
            . Ruang singgah hangat yang berisi kutipan motivasi Islami serta refleksi ketenangan diri untuk menemanimu bernapas lebih lega, menerima proses, dan berprasangka baik pada setiap ketetapan.
          </p>
        </div>

        {/* 3. Kartu Sorotan Utama: "Nalar Hari Ini" (Mobile-friendly Padding) */}
        <div className="max-w-2xl mx-auto text-left relative">
          <div className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-card transition-all duration-300 relative group overflow-hidden">
            {/* Header Kartu: Judul Tema di Bagian Atas Kartu */}
            <div className="flex items-start sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#E5DDD0]/80">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#E5DDD0] shadow-soft shrink-0 bg-[#FAF7F2]">
                  <Image
                    src="/images/logo.jpg"
                    alt="Logo Nalar Nanti"
                    width={36}
                    height={36}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E]">
                      Nalar Hari Ini
                    </span>
                    <span className="text-[10px] text-[#886950] font-bold bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E5DDD0]">
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
                  <h2
                    suppressHydrationWarning
                    className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] mt-1 leading-snug"
                  >
                    {currentQuote.themeTitle}
                  </h2>
                </div>
              </div>

              {featuredQuotes.length > 1 && (
                <button
                  onClick={handleNextFeatured}
                  title="Lihat kutipan pilihan lainnya"
                  aria-label="Lihat kutipan pilihan berikutnya"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-[#7A6F64] hover:text-[#3E362E] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] hover:border-[#C8A98E] active:scale-95 transition-all shadow-soft shrink-0"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">Pilihan Lain</span>
                </button>
              )}
            </div>

            {/* Kutipan Utama dengan Font Lora */}
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
            <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-5 border border-[#E5DDD0]/80 mb-5 sm:mb-8">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8E9B8E] font-semibold mb-1">
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
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                {/* Tombol Salin Kutipan */}
                <button
                  onClick={handleCopyQuote}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 group"
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
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-2.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-[#FAF7F2]" />
                  <span>Bagikan ke WhatsApp</span>
                </button>
              </div>

              {/* Tag Penutup Kredit */}
              <a
                href="https://www.instagram.com/nalarnanti?exln=MXJsOHM5bDVkb2F1Zg=="
                target="_blank"
                rel="noopener noreferrer"
                title="Kunjungi Instagram @nalarnanti"
                className="text-[11px] text-[#7A6F64] hover:text-[#C8A98E] text-center sm:text-right italic font-serif mt-1 sm:mt-0 transition-colors inline-flex items-center justify-center sm:justify-end gap-1"
              >
                <span>— Nalar Nanti</span>
                <span className="not-italic font-sans font-medium text-[10px] text-[#C8A98E] hover:underline">(@nalarnanti)</span>
              </a>
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
        <div className="mt-10 sm:mt-14 flex items-center justify-center gap-4 sm:gap-5 text-xs text-[#7A6F64]">
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

"use client";

import React, { useState, useEffect } from "react";
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
  Download,
  Loader2,
  Bookmark,
  Mail,
} from "lucide-react";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import SendEnvelopeModal from "@/components/SendEnvelopeModal";
import { getShareBaseUrl } from "@/lib/constants";

interface HeroSectionProps {
  quotes?: QuoteItem[];
}

export default function HeroSection({ quotes = QUOTES_DATA }: HeroSectionProps) {
  const quoteList = quotes && quotes.length > 0 ? quotes : QUOTES_DATA;
  const { isSaved, toggleSave, setAllQuotes } = useSavedQuotes();

  // Sinkronkan quotes terbaru ke SavedQuotesContext
  useEffect(() => {
    if (quotes && quotes.length > 0) {
      setAllQuotes(quotes);
    }
  }, [quotes, setAllQuotes]);

  // Ambil kutipan-kutipan yang ditandai isFeatured: true
  const featuredQuotes = quoteList.filter((q) => q.isFeatured);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEnvelopeModalOpen, setIsEnvelopeModalOpen] = useState(false);

  // Fallback jika tidak ada featured
  const currentQuote: QuoteItem =
    featuredQuotes[activeFeaturedIndex] || quoteList[0] || QUOTES_DATA[0];

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
    const baseUrl = getShareBaseUrl();
    const message = `🌿 *Nalar Hari Ini — ${currentQuote.themeTitle}*\n\n“${currentQuote.quote}”\n— ${currentQuote.source} (Nalar Nanti)\n\n_${currentQuote.reflection}_\n\n— Ruang Singgah untuk Menata Nalar & Merakit Asa\n${baseUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownloadCard = async () => {
    try {
      setIsDownloading(true);
      await downloadQuoteAsImage(currentQuote);
    } catch (err) {
      console.error("Gagal mengunduh kartu kutipan:", err);
    } finally {
      setIsDownloading(false);
    }
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
      className="relative pt-24 pb-14 sm:pt-36 sm:pb-20 overflow-hidden bg-transparent"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Area Teks Hero */}
        <div className="relative max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* 1. Tagline kecil yang hangat di atas judul */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 rounded-full bg-[#F3EDE2]/90 dark:bg-[#26221F]/90 backdrop-blur-xs border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-medium text-[#7A6F64] dark:text-[#A89F94] mb-5 sm:mb-7 shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#8E9B8E] animate-pulse shrink-0" />
            <span>Ruang Teduh • Menata Nalar, Merakit Asa</span>
          </div>

          {/* 2. Judul utama yang puitis dengan font Lora & deskripsi singkat */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#3E362E] dark:text-[#EDE6DC] max-w-3xl mx-auto leading-[1.3] sm:leading-[1.25] mb-4 sm:mb-6">
            <span className="block">Beri jeda sejenak,</span>
            <span className="block mt-1 sm:mt-1.5">
              biarkan nalar dan nurani menemukan{" "}
              <span className="italic font-normal text-[#C8A98E] underline decoration-[#E5DDD0] dark:decoration-[#3A332E] underline-offset-4 sm:underline-offset-8">
                keteduhannya
              </span>
              .
            </span>
          </h1>

          {/* 3. Paragraf Pengenalan Ringkas & Hangat */}
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] dark:text-[#A89F94] max-w-xl mx-auto leading-relaxed">
            Singgahlah untuk menyimak untaian pengingat Islami dan renungan hidup—menemani harimu bernapas lebih lapang, berdamai dengan proses, dan berprasangka baik pada setiap ketetapan.
          </p>
        </div>

        {/* 3. Kartu Sorotan Utama: "Nalar Hari Ini" (Mobile-friendly Padding) */}
        <div className="max-w-2xl mx-auto text-left relative">
          <div className="bg-[#F3EDE2] dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-card transition-all duration-300 relative group overflow-hidden">
            {/* Header Kartu: Judul Tema di Bagian Atas Kartu */}
            <div className="flex items-start sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#E5DDD0]/80 dark:border-[#3A332E]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#E5DDD0] dark:border-[#3A332E] shadow-soft shrink-0 bg-[#FAF7F2] dark:bg-[#1C1917]">
                  <Image
                    src="/images/logo-hd.png"
                    alt="Logo Nalar Nanti"
                    width={72}
                    height={72}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] whitespace-nowrap">
                      Nalar Hari Ini
                    </span>
                    <span className="text-[10px] text-[#886950] dark:text-[#C8A98E] font-bold bg-[#FAF7F2] dark:bg-[#1C1917] px-2 py-0.5 rounded-full border border-[#E5DDD0] dark:border-[#3A332E] whitespace-nowrap">
                      #{currentQuote.orderNumber}
                    </span>
                    <span
                      suppressHydrationWarning
                      className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#1C1917] text-[#8E9B8E] border border-[#E5DDD0] dark:border-[#3A332E] whitespace-nowrap"
                    >
                      {currentQuote.category}
                    </span>
                  </div>
                  {/* Judul Tema Kartu */}
                  <h2
                    suppressHydrationWarning
                    className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] dark:text-[#EDE6DC] mt-1 leading-snug"
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
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] hover:border-[#C8A98E] active:scale-95 transition-all shadow-soft shrink-0"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span className="hidden sm:inline">Pilihan Lain</span>
                </button>
              )}
            </div>

            {/* Kutipan Utama dengan Font Lora */}
            <div className="relative mb-4 sm:mb-5">
              <QuoteIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A98E]/30 absolute -top-2 -left-1 sm:-left-2 -z-0" />
              <blockquote
                suppressHydrationWarning
                className="font-serif italic text-[16px] sm:text-[18px] leading-[1.8] text-[#3E362E] dark:text-[#EDE6DC] relative z-10 pl-2"
              >
                “{currentQuote.quote}”
              </blockquote>
            </div>

            {/* Catatan Refleksi */}
            <div className="bg-[#FAF7F2] dark:bg-[#1E1B18] rounded-2xl p-4 sm:p-5 border border-[#E5DDD0]/80 dark:border-[#3A332E] mb-5">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8E9B8E] font-semibold mb-1">
                Renungan Singkat
              </p>
              <p
                suppressHydrationWarning
                className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed"
              >
                {currentQuote.reflection}
              </p>
            </div>

            {/* Bagian Bawah: Satu Baris Sejajar Sumber & Lima Tombol Ikon */}
            <div className="mt-5 pt-3.5 border-t border-[#E5DDD0] dark:border-[#3A332E] flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2 min-w-0">
                {/* Sisi Kiri: Source Pill Ringkas */}
                <span
                  suppressHydrationWarning
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium px-2.5 py-1 rounded-xl bg-[#EAE1D3] dark:bg-[#322C27] text-[#3E362E] dark:text-[#EDE6DC] border border-[#DDD3C3] dark:border-[#443C36] shadow-xs shrink min-w-0"
                >
                  <Feather className="w-3 h-3 text-[#886950] dark:text-[#C8A98E] shrink-0" />
                  <span className="truncate max-w-[135px] sm:max-w-[160px]">{currentQuote.source}</span>
                </span>

                {/* Sisi Kanan: 5 Tombol Ikon Saja */}
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                  {/* 1. Simpan (Saku Hati) */}
                  <button
                    onClick={() => toggleSave(currentQuote.id)}
                    title={isSaved(currentQuote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                    aria-label={isSaved(currentQuote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 ${isSaved(currentQuote.id)
                      ? "text-[#C8A98E] bg-[#FAF7F2] dark:bg-[#1C1917]"
                      : "text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70"
                      }`}
                  >
                    <Bookmark className={`w-[15px] h-[15px] ${isSaved(currentQuote.id) ? "fill-[#C8A98E]" : ""}`} />
                  </button>

                  {/* 2. Salin */}
                  <button
                    onClick={handleCopyQuote}
                    title="Salin Kutipan"
                    aria-label="Salin Kutipan"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    {isCopied ? (
                      <Check className="w-[15px] h-[15px] text-[#8E9B8E]" />
                    ) : (
                      <Copy className="w-[15px] h-[15px]" />
                    )}
                  </button>

                  {/* 3. Bagikan WhatsApp */}
                  <button
                    onClick={handleShareWhatsApp}
                    title="Bagikan ke WhatsApp"
                    aria-label="Bagikan ke WhatsApp"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-[15px] h-[15px]" />
                  </button>

                  {/* 4. Unduh Gambar 9:16 */}
                  <button
                    onClick={handleDownloadCard}
                    disabled={isDownloading}
                    title="Simpan Gambar 9:16"
                    aria-label="Simpan Gambar 9:16"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <Loader2 className="w-[15px] h-[15px] animate-spin text-[#C8A98E]" />
                    ) : (
                      <Download className="w-[15px] h-[15px]" />
                    )}
                  </button>

                  {/* 5. Kirim Amplop */}
                  <button
                    onClick={() => setIsEnvelopeModalOpen(true)}
                    title="Kirim Amplop Pengingat"
                    aria-label="Kirim Amplop Pengingat"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#C8A98E] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    <Mail className="w-[15px] h-[15px]" />
                  </button>
                </div>
              </div>

              {/* Tag Penutup Kredit & Pesan Feedback */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] text-[#7A6F64] dark:text-[#A89F94] pt-1">
                <span className="text-[10px] sm:text-[11px] text-[#8E9B8E] font-medium text-center sm:text-left">
                  {isCopied
                    ? "✓ Kutipan berhasil disalin ke papan klip!"
                    : "Ketuk untuk menyalin, berbagi, atau menyimpan kartu"}
                </span>
                <a
                  href="https://www.instagram.com/nalarnanti/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Kunjungi Instagram @nalarnanti"
                  className="hover:text-[#C8A98E] italic font-serif transition-colors inline-flex items-center gap-1 shrink-0"
                >
                  <span>— Nalar Nanti</span>
                  <span className="not-italic font-sans font-medium text-[10px] text-[#C8A98E] hover:underline">
                    (@nalarnanti)
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tombol Navigasi Lembut ke Bagian Bawah */}
        <div className="mt-10 sm:mt-14 flex items-center justify-center gap-4 sm:gap-5 text-xs text-[#7A6F64] dark:text-[#A89F94]">
          <a
            href="#pengingat"
            className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors inline-flex items-center gap-1.5"
          >
            <span>Ambil Pengingat</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
          <span className="text-[#E5DDD0] dark:text-[#3A332E]">•</span>
          <a
            href="#kutipan"
            className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors"
          >
            Koleksi Nalar
          </a>
        </div>
      </div>

      {/* Modal Kirim Amplop Pengingat */}
      <SendEnvelopeModal
        quoteItem={currentQuote}
        isOpen={isEnvelopeModalOpen}
        onClose={() => setIsEnvelopeModalOpen(false)}
      />
    </section>
  );
}

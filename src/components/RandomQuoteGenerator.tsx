"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Download,
  Loader2,
  Bookmark,
  Mail,
  ArrowRight,
} from "lucide-react";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import SendEnvelopeModal from "@/components/SendEnvelopeModal";
import { getShareBaseUrl } from "@/lib/constants";

interface RandomQuoteGeneratorProps {
  quotes?: QuoteItem[];
}

export default function RandomQuoteGenerator({ quotes = QUOTES_DATA }: RandomQuoteGeneratorProps) {
  const quoteList = quotes && quotes.length > 0 ? quotes : QUOTES_DATA;
  // Inisialisasi deterministik agar SSR & Client render identik 100% tanpa hydration mismatch
  const [currentQuote, setCurrentQuote] = useState<QuoteItem>(quoteList[0] || QUOTES_DATA[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isEnvelopeModalOpen, setIsEnvelopeModalOpen] = useState<boolean>(false);
  const { isSaved, toggleSave } = useSavedQuotes();
  const [shuffleCount, setShuffleCount] = useState<number>(1);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Menandai bahwa komponen telah ter-mount di client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sinkronkan kutipan awal saat data quotes baru tiba
  useEffect(() => {
    if (quoteList && quoteList.length > 0) {
      setCurrentQuote(quoteList[0]);
    }
  }, [quotes]);

  const handleGetRandomQuote = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Pastikan tidak mengulang kutipan yang sama persis berturut-turut dari koleksi kutipan
    let nextIndex = 0;
    do {
      nextIndex = Math.floor(Math.random() * quoteList.length);
    } while (
      quoteList.length > 1 &&
      quoteList[nextIndex].id === currentQuote.id
    );

    setTimeout(() => {
      setCurrentQuote(quoteList[nextIndex]);
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
    const baseUrl = getShareBaseUrl();
    const text = encodeURIComponent(
      `🌿 *Pengingat Nalar Nanti — ${currentQuote.themeTitle}*\n\n“${currentQuote.quote}”\n— ${currentQuote.source} (Nalar Nanti)\n\n_${currentQuote.reflection}_\n\n— Ruang Singgah untuk Menata Nalar & Merakit Asa\n${baseUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadCard = async () => {
    try {
      setIsDownloading(true);
      await downloadQuoteAsImage(currentQuote);
    } catch (err) {
      console.error("Gagal mengunduh kartu pengingat:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="pengingat"
      className="py-10 sm:py-16 md:py-20 lg:py-24 bg-transparent border-t border-[#E5DDD0]/60 dark:border-[#3A332E]/60 relative overflow-hidden"
    >
      <span id="pengingat-acak" className="sr-only" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Bagian */}
        <div className="max-w-xl mx-auto mb-6 sm:mb-8 md:mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 sm:mb-2.5">
            <Heart className="w-3.5 h-3.5 fill-[#8E9B8E]" />
            <span>Pesan untuk Jiwamu</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-2.5 sm:mb-3">
            Butuh Penyejuk di Tengah Riuh?
          </h2>
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] dark:text-[#A89F94] leading-relaxed max-w-xl mx-auto">
            Ketuk tombol di bawah untuk menyaring sepenggal hikmah acak yang mungkin sedang dinanti oleh nuranimu.
          </p>
        </div>

        {/* Tombol Bergaya Pill dengan Warna Aksen Gradasi Terracotta */}
        <div className="mb-6 sm:mb-10 md:mb-12">
          <button
            onClick={handleGetRandomQuote}
            disabled={isAnimating}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs sm:text-base hover:brightness-105 transition-all duration-300 shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-70 group min-h-[48px]"
          >
            <Sparkles
              className={`w-4 h-4 sm:w-5 sm:h-5 text-[#FAF7F2] ${isAnimating ? "animate-spin" : "group-hover:rotate-12 transition-transform"
                }`}
            />
            <span>Ambil Satu Pengingat</span>
            <RefreshCw
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FAF7F2]/80 ml-0.5 sm:ml-1 ${isAnimating ? "animate-spin" : ""
                }`}
            />
          </button>

          <p className="text-[11px] text-[#7A6F64]/70 dark:text-[#A89F94]/70 mt-2 font-sans">
            Telah diambil {shuffleCount} kali sesi hening
          </p>
        </div>

        {/* Kartu Soft Cream dengan Format Selaras Kartu @nalarnanti */}
        <div className="max-w-2xl mx-auto text-left">
          <div
            className={`bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-5 sm:p-8 md:p-9 shadow-[0_10px_30px_-10px_rgba(200,169,142,0.18)] dark:shadow-none hover:-translate-y-1 hover:shadow-[0_16px_36px_-10px_rgba(200,169,142,0.28)] transition-all duration-300 relative group overflow-hidden ${isAnimating
              ? "opacity-30 scale-[0.98] blur-[1px]"
              : "opacity-100 scale-100 blur-0"
              }`}
          >
            {/* Header Kartu: Label Kategori, Nomor Urut & Judul Tema */}
            <div className="flex items-start sm:items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3.5 sm:pb-4 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#E5DDD0] dark:border-[#3A332E] shadow-xs shrink-0 bg-white/90 dark:bg-[#1C1917]">
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
                      Pengingat Acak
                    </span>
                    <span
                      suppressHydrationWarning
                      className="text-[10px] text-[#886950] dark:text-[#C8A98E] font-bold bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917]/80 dark:to-[#26221F]/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#E5DDD0]/70 dark:border-[#3A332E] whitespace-nowrap"
                    >
                      #{currentQuote.orderNumber}
                    </span>
                    <span
                      suppressHydrationWarning
                      className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917]/80 dark:to-[#26221F]/80 backdrop-blur-sm text-[#8E9B8E] border border-[#E5DDD0]/70 dark:border-[#3A332E] whitespace-nowrap"
                    >
                      {currentQuote.category}
                    </span>
                  </div>

                  {/* Judul Tema Kartu */}
                  <h3
                    suppressHydrationWarning
                    className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] dark:text-[#EDE6DC] mt-1 leading-snug"
                  >
                    {currentQuote.themeTitle}
                  </h3>
                </div>
              </div>

              <span
                suppressHydrationWarning
                className="hidden sm:inline-block text-[10px] font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917]/70 dark:to-[#26221F]/70 backdrop-blur-sm text-[#886950] dark:text-[#C8A98E] border border-[#E5DDD0]/70 dark:border-[#3A332E] shrink-0 whitespace-nowrap"
              >
                Nuansa {currentQuote.type}
              </span>
            </div>

            {/* Teks Kutipan Utama (Lora Serif) */}
            <div className="relative mb-5 sm:mb-6">
              <QuoteIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#C8A98E]/40 absolute -top-2.5 -left-1 sm:-left-2 -z-0" />
              <blockquote
                suppressHydrationWarning
                className="font-serif italic text-[16px] sm:text-[18px] md:text-[20px] text-[#3E362E] dark:text-[#EDE6DC] leading-[1.8] relative z-10 pl-2"
              >
                “{currentQuote.quote}”
              </blockquote>
            </div>

            {/* Catatan Refleksi */}
            <div className="bg-gradient-to-br from-white/70 to-[#FAF7F2]/60 dark:from-[#1E1B18]/70 dark:to-[#141210]/60 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-[#E5DDD0]/70 dark:border-[#3A332E] mb-5 sm:mb-6">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] mb-1">
                Catatan Refleksi
              </p>
              <p
                suppressHydrationWarning
                className="font-sans text-xs sm:text-sm text-[#6E5D4F] dark:text-[#A89F94] leading-relaxed"
              >
                {currentQuote.reflection}
              </p>
            </div>

            {/* Footer Kartu: Sumber Penulis & 5 Tombol Ikon */}
            <div className="pt-3.5 border-t border-[#E5DDD0]/70 dark:border-[#3A332E] flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                {/* Sisi Kiri: Source Pill Ringkas */}
                <span
                  suppressHydrationWarning
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] border border-[#E5DDD0] dark:border-[#443C36] shadow-xs shrink-0 self-start sm:self-auto"
                >
                  <Feather className="w-3 h-3 text-[#886950] dark:text-[#C8A98E] shrink-0" />
                  <span className="truncate">{currentQuote.source}</span>
                </span>

                {/* Sisi Kanan: 5 Tombol Ikon Saja */}
                <div className="flex items-center justify-end gap-1 sm:gap-1.5 shrink-0">
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
                    onClick={handleCopy}
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

                  {/* 3. WhatsApp */}
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

              {/* Tag Penutup Kredit & Feedback */}
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

        {/* Tautan Menuju Studio Racik Kartu */}
        <div className="mt-6 sm:mt-10 text-center">
          <Link
            href="/racik"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-gradient-to-r from-white/90 to-[#FAF7F2]/90 dark:from-[#26221F] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs sm:text-sm font-semibold text-[#886950] dark:text-[#C8A98E] hover:border-[#C8A98E] shadow-soft hover:shadow-card hover:-translate-y-0.5 active:scale-95 transition-all group"
          >
            <span>Ingin meracik kata versimu sendiri? Buka Studio Racik Kartu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
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

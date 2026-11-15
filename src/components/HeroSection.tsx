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
  Download,
  Loader2,
  Bookmark,
  Mail,
} from "lucide-react";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import SendEnvelopeModal from "@/components/SendEnvelopeModal";

export default function HeroSection() {
  // Ambil kutipan-kutipan yang ditandai isFeatured: true
  const featuredQuotes = QUOTES_DATA.filter((q) => q.isFeatured);
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEnvelopeModalOpen, setIsEnvelopeModalOpen] = useState(false);
  const { isSaved, toggleSave } = useSavedQuotes();

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
              biarkan nalar dan hati menemukan{" "}
              <span className="italic font-normal text-[#C8A98E] underline decoration-[#E5DDD0] dark:decoration-[#3A332E] underline-offset-4 sm:underline-offset-8">
                keteduhannya
              </span>
              .
            </span>
          </h1>

          {/* 3. Paragraf Pengenalan Ringkas & Hangat */}
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] dark:text-[#A89F94] max-w-xl mx-auto leading-relaxed">
            Tidak semua hal harus dipahami terburu-buru hari ini. Singgahlah sejenak untuk membaca pengingat Islami dan refleksi kehidupan—menemani langkahmu bernapas lebih lega, menerima proses, dan berprasangka baik pada setiap ketetapan.
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
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E]">
                      Nalar Hari Ini
                    </span>
                    <span className="text-[10px] text-[#886950] dark:text-[#C8A98E] font-bold bg-[#FAF7F2] dark:bg-[#1C1917] px-2 py-0.5 rounded-full border border-[#E5DDD0] dark:border-[#3A332E]">
                      #{currentQuote.orderNumber}
                    </span>
                    <span
                      suppressHydrationWarning
                      className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#1C1917] text-[#8E9B8E] border border-[#E5DDD0] dark:border-[#3A332E]"
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

            {/* Bagian Bawah: Baris 1 Sumber & Baris 2 Lima Tombol Aksi Kompak */}
            <div className="mt-6 pt-4 border-t border-[#E5DDD0] dark:border-[#3A332E] flex flex-col gap-3">
              {/* Baris 1: Source Pill */}
              <div className="flex items-center">
                <span
                  suppressHydrationWarning
                  className="inline-flex items-center gap-1.5 text-xs font-sans font-medium px-2.5 py-1 rounded-lg bg-[#EAE1D3] dark:bg-[#322C27] text-[#3E362E] dark:text-[#EDE6DC] border border-[#DDD3C3] dark:border-[#443C36] shadow-xs truncate max-w-[240px]"
                >
                  <Feather className="w-3.5 h-3.5 text-[#886950] dark:text-[#C8A98E] shrink-0" />
                  <span className="truncate">{currentQuote.source}</span>
                </span>
              </div>

              {/* Baris 2: Lima Tombol Aksi Kompak */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full">
                {/* 1. Simpan ke Saku Hati */}
                <button
                  onClick={() => toggleSave(currentQuote.id)}
                  className={`h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 whitespace-nowrap border ${
                    isSaved(currentQuote.id)
                      ? "bg-[#C8A98E] text-[#FAF7F2] border-[#C8A98E]"
                      : "bg-[#FAF7F2] dark:bg-[#1C1917] text-[#3E362E] dark:text-[#EDE6DC] border-[#E5DDD0] dark:border-[#3A332E] hover:border-[#C8A98E] hover:text-[#C8A98E]"
                  }`}
                  title={isSaved(currentQuote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      isSaved(currentQuote.id) ? "fill-[#FAF7F2] text-[#FAF7F2]" : "text-[#7A6F64] dark:text-[#A89F94]"
                    }`}
                  />
                  <span>{isSaved(currentQuote.id) ? "Tersimpan" : "Simpan"}</span>
                </button>

                {/* 2. Salin Kutipan */}
                <button
                  onClick={handleCopyQuote}
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-xs active:scale-95 group whitespace-nowrap"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      <span className="text-[#8E9B8E]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A6F64] dark:text-[#A89F94] group-hover:text-[#C8A98E] transition-colors" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                {/* 3. Bagikan ke WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-[#C8A98E] text-[#FAF7F2] hover:bg-[#B9967A] transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>WhatsApp</span>
                </button>

                {/* 4. Simpan Gambar */}
                <button
                  onClick={handleDownloadCard}
                  disabled={isDownloading}
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-xs active:scale-95 disabled:opacity-60 whitespace-nowrap"
                  title="Unduh Kartu Kutipan untuk IG Story & Status WhatsApp"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A98E]" />
                      <span>...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#7A6F64] dark:text-[#A89F94] group-hover:text-[#C8A98E] transition-colors" />
                      <span>Gambar</span>
                    </>
                  )}
                </button>

                {/* 5. Kirim Amplop */}
                <button
                  onClick={() => setIsEnvelopeModalOpen(true)}
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-xs active:scale-95 group whitespace-nowrap"
                  title="Kirim Amplop Pengingat ke teman atau orang tersayang"
                >
                  <Mail className="w-3.5 h-3.5 text-[#7A6F64] dark:text-[#A89F94] group-hover:text-[#C8A98E] transition-colors" />
                  <span>Amplop</span>
                </button>
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

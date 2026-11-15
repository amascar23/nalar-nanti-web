"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import SendEnvelopeModal from "@/components/SendEnvelopeModal";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import { getShareBaseUrl } from "@/lib/constants";
import {
  Mail,
  Sparkles,
  Heart,
  Feather,
  Copy,
  Check,
  Share2,
  Download,
  Loader2,
  ArrowRight,
  RotateCcw,
  Quote as QuoteIcon,
  MessageCircle,
  CornerDownRight,
  Send,
  Bookmark,
} from "lucide-react";

const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

interface EnvelopeViewProps {
  quotes?: QuoteItem[];
}

export default function EnvelopeView({ quotes = QUOTES_DATA }: EnvelopeViewProps) {
  const quoteList = quotes && quotes.length > 0 ? quotes : QUOTES_DATA;
  const searchParams = useSearchParams();

  // Membaca parameter dari query URL (database-free)
  const idParam = searchParams.get("id") || quoteList[0]?.id || "18";
  const recipientParam = searchParams.get("untuk") || "Sahabatku";
  const senderParam = searchParams.get("dari") || "Seseorang yang peduli";
  const noteParam = searchParams.get("pesan") || "";

  // Cari kutipan yang sesuai ID atau fallback ke kutipan pertama
  const quoteItem: QuoteItem =
    quoteList.find((q) => q.id === idParam) ||
    QUOTES_DATA.find((q) => q.id === idParam) ||
    quoteList[0] ||
    QUOTES_DATA[0];

  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const { isSaved, toggleSave } = useSavedQuotes();

  // Scroll otomatis ke konten saat amplop dibuka
  const handleOpenEnvelope = () => {
    setIsOpened(true);
  };

  const handleCopyQuote = () => {
    const textToCopy = `“${quoteItem.quote}” — ${quoteItem.source} (Nalar Nanti)\n\n${quoteItem.reflection}\n\n— Dititipkan lewat Amplop Pengingat Nalar Nanti`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWa = () => {
    const baseUrl = getShareBaseUrl();
    const text = encodeURIComponent(
      `🌿 *Amplop Pengingat Nalar Nanti — Untuk ${recipientParam}*\n\n` +
        `“${quoteItem.quote}”\n` +
        `— ${quoteItem.source}\n\n` +
        (noteParam ? `*Catatan:* “${noteParam}”\n— ${senderParam}\n\n` : "") +
        `${baseUrl}/amplop?${searchParams.toString()}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadImage = async () => {
    if (isDownloading) return;
    try {
      setIsDownloading(true);
      await downloadQuoteAsImage(quoteItem);
    } catch (err) {
      console.error("Gagal mengunduh kartu:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* ========================================================================= */}
      {/* TAMPILAN 1: AMPLOP BELUM DIBUKA (AESTHETIC WARM SAND ENVELOPE) */}
      {/* ========================================================================= */}
      {!isOpened ? (
        <div className="w-full bg-[#F3EDE2] dark:bg-[#26221F] border border-[#DDD3C3] dark:border-[#3A332E] rounded-3xl p-6 sm:p-10 shadow-floating text-center relative overflow-hidden transition-all duration-500 animate-fadeIn">
          {/* Latar Belakang Garis & Serat Halus */}
          <div className="absolute inset-0 bg-[radial-gradient(#C8A98E_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

          {/* Lipatan Segitiga Amplop (Visual Flap Atas) */}
          <div className="relative mx-auto mb-6 flex flex-col items-center">
            {/* Bentuk Amplop Kertas */}
            <div className="w-full max-w-sm h-48 sm:h-56 bg-[#FAF7F2] dark:bg-[#1C1917] rounded-2xl border border-[#E5DDD0] dark:border-[#3A332E] shadow-soft relative flex flex-col items-center justify-center p-4 overflow-hidden">
              {/* Garis lipatan amplop bersilang lembut */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 400 240"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 0 L 200 135 L 400 0"
                    stroke="#D8CBB6"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M 0 240 L 155 110"
                    stroke="#D8CBB6"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <path
                    d="M 400 240 L 245 110"
                    stroke="#D8CBB6"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                </svg>
              </div>

              {/* Segel Lilin / Wax Seal Nalar Nanti */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D8B99E] via-[#C8A98E] to-[#B28B6E] p-1 shadow-floating flex items-center justify-center border-2 border-[#FAF7F2] dark:border-[#1C1917] ring-4 ring-[#EAE1D3] dark:ring-[#322C27] animate-pulse">
                  <div className="w-full h-full rounded-full border border-[#FAF7F2]/40 flex items-center justify-center bg-[#C8A98E]/80 backdrop-blur-xs">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-[#FAF7F2]/60">
                      <Image
                        src="/images/logo-hd.png"
                        alt="Segel Lilin Nalar Nanti"
                        width={48}
                        height={48}
                        unoptimized
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <span className="text-[10px] sm:text-[11px] font-serif italic text-[#886950] dark:text-[#C8A98E] mt-3 font-semibold tracking-wide">
                  Segel Lilin Nalar Nanti
                </span>
              </div>
            </div>
          </div>

          {/* Teks Penerima & Pengirim */}
          <div className="relative z-10 space-y-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE1D3] dark:bg-[#322C27] text-[#3E362E] dark:text-[#EDE6DC] text-[11px] sm:text-xs font-medium border border-[#DDD3C3] dark:border-[#443C36]">
              <Mail className="w-3.5 h-3.5 text-[#886950] dark:text-[#C8A98E]" />
              <span>Amplop Pengingat Digital</span>
            </span>

            <p className="text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] pt-1">
              Sebuah amplop pengingat titipan untuk:
            </p>

            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight">
              “{recipientParam}”
            </h1>

            <p className="text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94]">
              Dari: <span className="font-medium text-[#3E362E] dark:text-[#EDE6DC]">{senderParam}</span>
            </p>

            <p className="text-xs text-[#7A6F64]/80 dark:text-[#A89F94]/80 max-w-sm mx-auto pt-1 leading-relaxed">
              Ada satu kalimat pengingat teduh yang dipilih khusus untukmu. Ketuk tombol di bawah untuk membuka segelnya.
            </p>
          </div>

          {/* Tombol Utama Buka Amplop */}
          <div className="relative z-10">
            <button
              onClick={handleOpenEnvelope}
              className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-sm sm:text-base hover:bg-[#B9967A] transition-all shadow-floating active:scale-95 group"
            >
              <Mail className="w-4 h-4 text-[#FAF7F2] group-hover:scale-110 transition-transform" />
              <span>Buka Amplop Pengingat</span>
              <Sparkles className="w-4 h-4 text-[#FAF7F2] animate-pulse" />
            </button>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* TAMPILAN 2: AMPLOP TERBUKA (ANIMASI FADE & SLIDE UP + ISI SURAT LENGKAP) */
        /* ========================================================================= */
        <div className="w-full space-y-6 animate-fadeIn">
          {/* Header Ucapan Pembuka Amplop */}
          <div className="text-center space-y-1.5 pb-1">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8E9B8E]/15 text-[#637063] dark:text-[#8E9B8E] text-xs font-semibold border border-[#8E9B8E]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#8E9B8E]" />
              <span>Amplop Berhasil Dibuka</span>
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
              Khusus untuk {recipientParam}
            </h2>
            <p className="text-xs text-[#7A6F64] dark:text-[#A89F94]">
              Dititipkan dengan hangat oleh{" "}
              <strong className="text-[#3E362E] dark:text-[#EDE6DC]">{senderParam}</strong>
            </p>
          </div>

          {/* 1. CATATAN HANGAT DARI PENGIRIM (Jika Ada Pesan) */}
          {noteParam && (
            <div className="bg-[#FAF7F2] dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] rounded-2xl p-5 sm:p-6 shadow-soft relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8E9B8E] mb-2.5">
                <Feather className="w-3.5 h-3.5 text-[#C8A98E]" />
                <span>Pesan Hangat Dari {senderParam}</span>
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#3E362E] dark:text-[#EDE6DC] leading-relaxed pl-1">
                “{noteParam}”
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#E5DDD0]/60 dark:border-[#3A332E] flex items-center justify-between text-[11px] text-[#7A6F64] dark:text-[#A89F94]">
                <span>— Catatan Pribadi</span>
                <span className="italic font-serif">Nalar Nanti</span>
              </div>
            </div>
          )}

          {/* 2. KARTU KUTIPAN LENGKAP */}
          <div className="bg-[#FAF7F2] dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] rounded-3xl p-6 sm:p-8 shadow-floating text-left relative overflow-hidden">
            {/* Header Profil Brand */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E5DDD0] dark:border-[#3A332E]">
              <a
                href={IG_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E5DDD0] dark:border-[#3A332E] bg-[#FAF7F2] dark:bg-[#1C1917] shrink-0 group-hover:border-[#C8A98E] transition-all">
                  <Image
                    src="/images/logo-hd.png"
                    alt="Nalar Nanti"
                    width={64}
                    height={64}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-semibold text-[#3E362E] dark:text-[#EDE6DC] group-hover:text-[#C8A98E] transition-colors">
                      @nalarnanti
                    </span>
                    <span className="text-[10px] text-[#886950] dark:text-[#C8A98E] font-bold bg-[#F3EDE2] dark:bg-[#1C1917] px-2 py-0.5 rounded-full border border-[#E5DDD0] dark:border-[#3A332E] whitespace-nowrap">
                      #{quoteItem.orderNumber}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#7A6F64] dark:text-[#A89F94]">
                    Ruang Singgah Nalar & Asa
                  </span>
                </div>
              </a>

              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#8E9B8E]/15 text-[#637063] dark:text-[#8E9B8E] whitespace-nowrap">
                {quoteItem.category}
              </span>
            </div>

            {/* Tema Kutipan */}
            <div className="mt-4 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block mb-1">
                Tema Refleksi
              </span>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                {quoteItem.themeTitle}
              </h3>
            </div>

            {/* Kutipan Utama */}
            <div className="my-5 p-5 sm:p-6 rounded-2xl bg-[#F3EDE2] dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] relative">
              <QuoteIcon className="w-8 h-8 text-[#C8A98E]/30 absolute top-3 right-4 rotate-180 pointer-events-none" />
              <blockquote className="font-serif italic text-[16px] sm:text-[18px] md:text-[20px] text-[#3E362E] dark:text-[#EDE6DC] leading-[1.8] relative z-10">
                “{quoteItem.quote}”
              </blockquote>
            </div>

            {/* Catatan Refleksi Mendalam */}
            <div className="space-y-1.5 mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block">
                Catatan Refleksi
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                {quoteItem.reflection}
              </p>
            </div>

            {/* Tombol Aksi Lengkap: Satu Baris Sejajar Sumber & 5 Tombol Ikon */}
            <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#3A332E] flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 min-w-0">
                {/* Sisi Kiri: Source Pill Ringkas */}
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium px-2.5 py-1 rounded-xl bg-[#EAE1D3] dark:bg-[#322C27] text-[#3E362E] dark:text-[#EDE6DC] border border-[#DDD3C3] dark:border-[#443C36] shadow-xs shrink min-w-0">
                  <Feather className="w-3 h-3 text-[#886950] dark:text-[#C8A98E] shrink-0" />
                  <span className="truncate max-w-[135px] sm:max-w-[160px]">{quoteItem.source}</span>
                </span>

                {/* Sisi Kanan: 5 Tombol Ikon Saja */}
                <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                  {/* 1. Simpan (Saku Hati) */}
                  <button
                    onClick={() => toggleSave(quoteItem.id)}
                    title={isSaved(quoteItem.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                    aria-label={isSaved(quoteItem.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                      isSaved(quoteItem.id)
                        ? "text-[#C8A98E] bg-[#FAF7F2] dark:bg-[#1C1917]"
                        : "text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70"
                    }`}
                  >
                    <Bookmark className={`w-[15px] h-[15px] ${isSaved(quoteItem.id) ? "fill-[#C8A98E]" : ""}`} />
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
                    onClick={handleShareWa}
                    title="Bagikan ke WhatsApp"
                    aria-label="Bagikan ke WhatsApp"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-[15px] h-[15px]" />
                  </button>

                  {/* 4. Unduh Gambar 9:16 */}
                  <button
                    onClick={handleDownloadImage}
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

                  {/* 5. Balas Kirim Amplop */}
                  <button
                    onClick={() => setIsReplyModalOpen(true)}
                    title="Balas Kirim Amplop"
                    aria-label="Balas Kirim Amplop"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#C8A98E] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    <Mail className="w-[15px] h-[15px]" />
                  </button>
                </div>
              </div>

              {/* Tombol Balas & Navigasi Beranda */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E5DDD0]/60 dark:border-[#3A332E]">
                <button
                  onClick={() => setIsReplyModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95 whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>Balas dengan Mengirim Amplop Baru</span>
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] px-4 py-2 rounded-full hover:bg-[#F3EDE2] dark:hover:bg-[#1C1917] transition-colors whitespace-nowrap"
                >
                  <span>Jelajahi Beranda Nalar Nanti</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Balas Kirim Amplop */}
      <SendEnvelopeModal
        quoteItem={quoteItem}
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
      />
    </div>
  );
}

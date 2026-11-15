"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import SendEnvelopeModal from "@/components/SendEnvelopeModal";
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
} from "lucide-react";

const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

export default function EnvelopeView() {
  const searchParams = useSearchParams();

  // Membaca parameter dari query URL (database-free)
  const idParam = searchParams.get("id") || "18";
  const recipientParam = searchParams.get("untuk") || "Sahabatku";
  const senderParam = searchParams.get("dari") || "Seseorang yang peduli";
  const noteParam = searchParams.get("pesan") || "";

  // Cari kutipan yang sesuai ID atau fallback ke kutipan pertama
  const quoteItem: QuoteItem =
    QUOTES_DATA.find((q) => q.id === idParam) || QUOTES_DATA[0];

  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

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
    const text = encodeURIComponent(
      `🌿 *Amplop Pengingat Nalar Nanti — Untuk ${recipientParam}*\n\n` +
        `“${quoteItem.quote}”\n` +
        `— ${quoteItem.source}\n\n` +
        (noteParam ? `*Catatan:* “${noteParam}”\n— ${senderParam}\n\n` : "") +
        `https://nalarnanti.com/amplop?${searchParams.toString()}`
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
        <div className="w-full bg-[#F3EDE2] border border-[#DDD3C3] rounded-3xl p-6 sm:p-10 shadow-floating text-center relative overflow-hidden transition-all duration-500 animate-fadeIn">
          {/* Latar Belakang Garis & Serat Halus */}
          <div className="absolute inset-0 bg-[radial-gradient(#C8A98E_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

          {/* Lipatan Segitiga Amplop (Visual Flap Atas) */}
          <div className="relative mx-auto mb-6 flex flex-col items-center">
            {/* Bentuk Amplop Kertas */}
            <div className="w-full max-w-sm h-48 sm:h-56 bg-[#FAF7F2] rounded-2xl border border-[#E5DDD0] shadow-soft relative flex flex-col items-center justify-center p-4 overflow-hidden">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#D8B99E] via-[#C8A98E] to-[#B28B6E] p-1 shadow-floating flex items-center justify-center border-2 border-[#FAF7F2] ring-4 ring-[#EAE1D3] animate-pulse">
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

                <span className="text-[10px] sm:text-[11px] font-serif italic text-[#886950] mt-3 font-semibold tracking-wide">
                  Segel Lilin Nalar Nanti
                </span>
              </div>
            </div>
          </div>

          {/* Teks Penerima & Pengirim */}
          <div className="relative z-10 space-y-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE1D3] text-[#3E362E] text-[11px] sm:text-xs font-medium border border-[#DDD3C3]">
              <Mail className="w-3.5 h-3.5 text-[#886950]" />
              <span>Amplop Pengingat Digital</span>
            </span>

            <p className="text-xs sm:text-sm text-[#7A6F64] pt-1">
              Sebuah amplop pengingat titipan untuk:
            </p>

            <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3E362E] tracking-tight">
              “{recipientParam}”
            </h1>

            <p className="text-xs sm:text-sm text-[#7A6F64]">
              Dari: <span className="font-medium text-[#3E362E]">{senderParam}</span>
            </p>

            <p className="text-xs text-[#7A6F64]/80 max-w-sm mx-auto pt-1 leading-relaxed">
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
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#8E9B8E]/15 text-[#637063] text-xs font-semibold border border-[#8E9B8E]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#8E9B8E]" />
              <span>Amplop Berhasil Dibuka</span>
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#3E362E]">
              Khusus untuk {recipientParam}
            </h2>
            <p className="text-xs text-[#7A6F64]">
              Dititipkan dengan hangat oleh{" "}
              <strong className="text-[#3E362E]">{senderParam}</strong>
            </p>
          </div>

          {/* 1. CATATAN HANGAT DARI PENGIRIM (Jika Ada Pesan) */}
          {noteParam && (
            <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-5 sm:p-6 shadow-soft relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8E9B8E] mb-2.5">
                <Feather className="w-3.5 h-3.5 text-[#C8A98E]" />
                <span>Pesan Hangat Dari {senderParam}</span>
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#3E362E] leading-relaxed pl-1">
                “{noteParam}”
              </p>
              <div className="mt-3 pt-2.5 border-t border-[#E5DDD0]/60 flex items-center justify-between text-[11px] text-[#7A6F64]">
                <span>— Catatan Pribadi</span>
                <span className="italic font-serif">Nalar Nanti</span>
              </div>
            </div>
          )}

          {/* 2. KARTU KUTIPAN LENGKAP */}
          <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-3xl p-6 sm:p-8 shadow-floating text-left relative overflow-hidden">
            {/* Header Profil Brand */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E5DDD0]">
              <a
                href={IG_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden border border-[#E5DDD0] bg-[#FAF7F2] shrink-0 group-hover:border-[#C8A98E] transition-all">
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
                    <span className="text-xs sm:text-sm font-semibold text-[#3E362E] group-hover:text-[#C8A98E] transition-colors">
                      @nalarnanti
                    </span>
                    <span className="text-[10px] text-[#886950] font-bold bg-[#F3EDE2] px-2 py-0.5 rounded-full border border-[#E5DDD0]">
                      #{quoteItem.orderNumber}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#7A6F64]">
                    Ruang Singgah Nalar & Asa
                  </span>
                </div>
              </a>

              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#8E9B8E]/15 text-[#637063]">
                {quoteItem.category}
              </span>
            </div>

            {/* Tema Kutipan */}
            <div className="mt-4 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block mb-1">
                Tema Refleksi
              </span>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3E362E]">
                {quoteItem.themeTitle}
              </h3>
            </div>

            {/* Kutipan Utama */}
            <div className="my-5 p-5 sm:p-6 rounded-2xl bg-[#F3EDE2] border border-[#E5DDD0] relative">
              <QuoteIcon className="w-8 h-8 text-[#C8A98E]/30 absolute top-3 right-4 rotate-180 pointer-events-none" />
              <blockquote className="font-serif italic text-base sm:text-lg md:text-xl text-[#3E362E] leading-relaxed relative z-10">
                “{quoteItem.quote}”
              </blockquote>
              <div className="mt-4 pt-3 border-t border-[#E5DDD0]/80 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-sans font-medium px-3 py-1 rounded-xl bg-[#EAE1D3] text-[#3E362E] border border-[#DDD3C3]">
                  <Feather className="w-3.5 h-3.5 text-[#886950]" />
                  <span>{quoteItem.source}</span>
                </span>
                <span className="text-[10px] text-[#7A6F64]">
                  Nuansa {quoteItem.type}
                </span>
              </div>
            </div>

            {/* Catatan Refleksi Mendalam */}
            <div className="space-y-1.5 mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block">
                Catatan Refleksi
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] leading-relaxed">
                {quoteItem.reflection}
              </p>
            </div>

            {/* Tombol Aksi Lengkap */}
            <div className="pt-4 border-t border-[#E5DDD0] flex flex-col gap-2.5">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 w-full">
                {/* Tombol Salin */}
                <button
                  onClick={handleCopyQuote}
                  className="min-h-[42px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 whitespace-nowrap"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      <span className="text-[#8E9B8E]">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A6F64]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                {/* Tombol Bagikan ke WhatsApp */}
                <button
                  onClick={handleShareWa}
                  className="min-h-[42px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-all shadow-soft active:scale-95 whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </button>

                {/* Tombol Simpan Gambar 9:16 */}
                <button
                  onClick={handleDownloadImage}
                  disabled={isDownloading}
                  className="min-h-[42px] inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 disabled:opacity-60 whitespace-nowrap"
                  title="Unduh Kartu Gambar 9:16 untuk IG Story & Status WhatsApp"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A98E]" />
                      <span>Menyiapkan...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#7A6F64]" />
                      <span>Simpan Gambar 9:16</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tombol Balas & Navigasi Beranda */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#E5DDD0]/60">
                <button
                  onClick={() => setIsReplyModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95 whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>Balas dengan Mengirim Amplop Baru</span>
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs font-medium text-[#7A6F64] hover:text-[#3E362E] px-4 py-2 rounded-full hover:bg-[#F3EDE2] transition-colors whitespace-nowrap"
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

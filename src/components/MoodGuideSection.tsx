"use client";

import React, { useState } from "react";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import {
  Heart,
  Sparkles,
  Copy,
  Check,
  MessageCircle,
  Download,
  Loader2,
  Quote as QuoteIcon,
  Feather,
  Sun,
  Compass,
  Wind,
  Shield,
  Smile,
  Bookmark,
  Mail,
} from "lucide-react";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import SendEnvelopeModal from "@/components/SendEnvelopeModal";
import { getShareBaseUrl } from "@/lib/constants";

interface MoodOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  empathyMessage: string;
  quoteIds: string[];
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    id: "penuh-lelah",
    label: "Kepala Lagi Penuh & Lelah",
    icon: Wind,
    empathyMessage:
      "Tidak apa-apa jika hari ini terasa berat. Kamu tidak harus menyelesaikan semuanya sekaligus; tarik napas pelan dan izinkan pikiranmu beristirahat sejenak.",
    quoteIds: ["2", "4", "14"],
  },
  {
    id: "cemas",
    label: "Cemas Soal Masa Depan",
    icon: Compass,
    empathyMessage:
      "Kekhawatiran sering muncul karena kita ingin mengendalikan hal yang belum terjadi. Tenangkan hatimu, apa yang memang porsimu tidak akan pernah tertukar.",
    quoteIds: ["7", "12", "15"],
  },
  {
    id: "sabar",
    label: "Butuh Penguat Sabar",
    icon: Shield,
    empathyMessage:
      "Sabar memang tidak selalu mudah, tapi setiap detik ketenangan yang kamu jaga saat diuji sedang menguatkan akarmu.",
    quoteIds: ["10", "17", "18"],
  },
  {
    id: "ikhlas",
    label: "Belajar Mengikhlaskan",
    icon: Feather,
    empathyMessage:
      "Melepaskan bukan berarti kalah, melainkan memercayakan sisanya kepada ketetapan Allah yang jauh lebih luas dari rencana kita.",
    quoteIds: ["11", "16", "6"],
  },
  {
    id: "syukur",
    label: "Ingin Lebih Bersyukur",
    icon: Smile,
    empathyMessage:
      "Kadang kebahagiaan tidak datang dari bertambahnya hal baru, melainkan dari mata yang kembali menyadari betapa cukupnya hari ini.",
    quoteIds: ["13", "9", "3"],
  },
];

interface MoodGuideSectionProps {
  quotes?: QuoteItem[];
}

export default function MoodGuideSection({ quotes = QUOTES_DATA }: MoodGuideSectionProps) {
  const quoteList = quotes && quotes.length > 0 ? quotes : QUOTES_DATA;
  const [selectedMoodId, setSelectedMoodId] = useState<string>("penuh-lelah");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [envelopeQuote, setEnvelopeQuote] = useState<QuoteItem | null>(null);
  const { isSaved, toggleSave } = useSavedQuotes();

  const activeMood =
    MOOD_OPTIONS.find((m) => m.id === selectedMoodId) || MOOD_OPTIONS[0];

  // Ambil data kutipan lengkap berdasarkan ID yang direkomendasikan
  const recommendedQuotes: QuoteItem[] = activeMood.quoteIds
    .map((id) => quoteList.find((q) => q.id === id) || QUOTES_DATA.find((q) => q.id === id))
    .filter((q): q is QuoteItem => Boolean(q));

  const handleCopy = (quote: QuoteItem) => {
    const textToCopy = `“${quote.quote}” — ${quote.source} (Nalar Nanti)\n\n${quote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const handleShareWa = (quote: QuoteItem) => {
    const baseUrl = getShareBaseUrl();
    const text = encodeURIComponent(
      `🌿 *Pengingat Nalar Nanti — ${quote.themeTitle}*\n\n` +
      `“${quote.quote}”\n` +
      `— ${quote.source} (Nalar Nanti)\n\n` +
      `*Refleksi:* ${quote.reflection}\n\n` +
      `— Ruang Singgah untuk Menata Nalar & Merakit Asa\n${baseUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (quote: QuoteItem) => {
    try {
      setDownloadingId(quote.id);
      await downloadQuoteAsImage(quote);
    } catch (err) {
      console.error("Gagal mengunduh kartu kutipan:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <section
      id="suasana-hati"
      className="py-10 sm:py-16 md:py-20 lg:py-24 bg-transparent border-t border-[#E5DDD0]/60 dark:border-[#3A332E]/60 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Seksi */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 shadow-soft">
            <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]/20" />
            <span>Teman Bicara Hati</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-2 sm:mb-3">
            Lagi Merasa Apa Hari Ini?
          </h2>

          <p className="font-sans text-xs sm:text-base text-[#7A6F64] dark:text-[#A89F94] leading-relaxed max-w-xl mx-auto">
            Pilih apa yang sedang berkecamuk di dalam benakmu, lalu temukan untaian nasihat teduh untuk meredakannya.
          </p>
        </div>

        {/* 2. Lima Pilihan Tombol Suasana Hati (Pill Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 max-w-4xl mx-auto mb-6 sm:mb-10 md:mb-12">
          {MOOD_OPTIONS.map((mood) => {
            const Icon = mood.icon;
            const isActive = mood.id === selectedMoodId;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMoodId(mood.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] border border-[#C8A98E] shadow-card scale-[1.02]"
                    : "bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] text-[#7A6F64] dark:text-[#A89F94] border border-[#E5DDD0] dark:border-[#3A332E] hover:border-[#C8A98E]/70 hover:text-[#3E362E] dark:hover:text-[#EDE6DC] shadow-soft"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${
                    isActive ? "text-[#FAF7F2]" : "text-[#886950] dark:text-[#C8A98E]"
                  }`}
                />
                <span>{mood.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. Kotak Sapaan Empatik yang Hangat */}
        <div
          key={activeMood.id}
          className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 shadow-[0_10px_30px_-10px_rgba(200,169,142,0.18)] dark:shadow-none mb-6 sm:mb-10 md:mb-14 text-center max-w-2xl mx-auto relative overflow-hidden animate-fadeIn"
        >
          <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E9B8E] mb-2 sm:mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
            <span>Pesan Hangat untukmu</span>
          </div>
          <p className="font-serif italic text-sm sm:text-lg text-[#3E362E] dark:text-[#EDE6DC] leading-relaxed max-w-xl mx-auto">
            “{activeMood.empathyMessage}”
          </p>
        </div>

        {/* 4. Tiga Kartu Kutipan Rekomendasi (Grid 2 Kolom di HP & 3 Kolom di Laptop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {recommendedQuotes.map((quote, idx) => (
            <div
              key={quote.id}
              className={`bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-7 shadow-[0_8px_24px_-8px_rgba(200,169,142,0.16)] dark:shadow-none hover:-translate-y-1 hover:shadow-[0_16px_36px_-8px_rgba(200,169,142,0.26)] transition-all duration-300 flex flex-col justify-between h-full group ${
                idx === 2 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              {/* Bagian Atas & Tengah */}
              <div className="flex-1 flex flex-col">
                {/* Header Kartu: Kategori & Nomor Urut */}
                <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-3.5 pb-2 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
                  <span className="text-[9px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/75 dark:bg-[#1C1917]/80 backdrop-blur-sm border border-[#E5DDD0]/80 dark:border-[#3A332E] text-[#8E9B8E] whitespace-nowrap shadow-xs truncate">
                    {quote.category}
                  </span>
                  <span className="text-[9px] sm:text-[11px] font-bold text-[#886950] dark:text-[#C8A98E] bg-white/75 dark:bg-[#1C1917]/80 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 rounded-full border border-[#E5DDD0]/80 dark:border-[#3A332E] whitespace-nowrap shadow-xs">
                    #{quote.orderNumber || quote.id}
                  </span>
                </div>

                {/* Judul Tema Kartu */}
                <h3 className="font-serif text-xs sm:text-base font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-1.5 sm:mb-3 group-hover:text-[#886950] dark:group-hover:text-[#C8A98E] transition-colors leading-snug">
                  {quote.themeTitle}
                </h3>

                {/* Teks Kutipan Utama */}
                <div className="relative mb-3 sm:mb-5 flex-1">
                  <QuoteIcon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C8A98E]/40 mb-1 sm:mb-2 group-hover:text-[#C8A98E] transition-colors" />
                  <p className="font-serif italic text-xs sm:text-[16px] leading-[1.65] sm:leading-[1.8] text-[#3E362E] dark:text-[#EDE6DC] line-clamp-4">
                    “{quote.quote}”
                  </p>
                </div>
              </div>

              {/* Bagian Bawah: Sumber Penulis & Tombol Aksi Lengkap (Tidak Terpotong) */}
              <div className="mt-3 sm:mt-5 pt-2.5 sm:pt-3.5 border-t border-[#E5DDD0]/70 dark:border-[#3A332E] flex flex-col gap-2">
                {/* Baris 1: Sumber Kutipan (Jelas & Utuh) */}
                <div className="flex items-center justify-between gap-1.5 min-w-0">
                  <span className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-sans font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] border border-[#E5DDD0] dark:border-[#443C36] shadow-xs shrink-0 max-w-full">
                    <Feather className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#886950] dark:text-[#C8A98E] shrink-0" />
                    <span className="truncate">{quote.source}</span>
                  </span>
                </div>

                {/* Baris 2: Tombol Aksi Lengkap (Lega & Nyaman Diklik, Muat Utuh) */}
                <div className="flex items-center justify-end gap-1 flex-wrap">
                  {/* 1. Simpan (Saku Hati) */}
                  <button
                    onClick={() => toggleSave(quote.id)}
                    title={isSaved(quote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                    aria-label={isSaved(quote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                      isSaved(quote.id)
                        ? "text-[#C8A98E] bg-[#FAF7F2] dark:bg-[#1C1917] shadow-xs"
                        : "text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70"
                    }`}
                  >
                    <Bookmark className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSaved(quote.id) ? "fill-[#C8A98E]" : ""}`} />
                  </button>

                  {/* 2. Salin */}
                  <button
                    onClick={() => handleCopy(quote)}
                    title="Salin Kutipan"
                    aria-label="Salin Kutipan"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    {copiedId === quote.id ? (
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#8E9B8E]" />
                    ) : (
                      <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    )}
                  </button>

                  {/* 3. Bagikan WhatsApp */}
                  <button
                    onClick={() => handleShareWa(quote)}
                    title="Bagikan ke WhatsApp"
                    aria-label="Bagikan ke WhatsApp"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>

                  {/* 4. Unduh Gambar 9:16 */}
                  <button
                    onClick={() => handleDownload(quote)}
                    disabled={downloadingId === quote.id}
                    title="Simpan Gambar 9:16"
                    aria-label="Simpan Gambar 9:16"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {downloadingId === quote.id ? (
                      <Loader2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin text-[#C8A98E]" />
                    ) : (
                      <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    )}
                  </button>

                  {/* 5. Kirim Amplop */}
                  <button
                    onClick={() => setEnvelopeQuote(quote)}
                    title="Kirim Amplop Pengingat"
                    aria-label="Kirim Amplop Pengingat"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#C8A98E] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                  >
                    <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Kirim Amplop Pengingat */}
      <SendEnvelopeModal
        quoteItem={envelopeQuote}
        isOpen={Boolean(envelopeQuote)}
        onClose={() => setEnvelopeQuote(null)}
      />
    </section>
  );
}


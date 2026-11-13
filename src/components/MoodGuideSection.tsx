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
} from "lucide-react";
import { useSavedQuotes } from "@/context/SavedQuotesContext";

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

export default function MoodGuideSection() {
  const [selectedMoodId, setSelectedMoodId] = useState<string>("penuh-lelah");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { isSaved, toggleSave } = useSavedQuotes();

  const activeMood =
    MOOD_OPTIONS.find((m) => m.id === selectedMoodId) || MOOD_OPTIONS[0];

  // Ambil data kutipan lengkap berdasarkan ID yang direkomendasikan
  const recommendedQuotes: QuoteItem[] = activeMood.quoteIds
    .map((id) => QUOTES_DATA.find((q) => q.id === id))
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
    const text = encodeURIComponent(
      `🌿 *Pengingat Nalar Nanti — ${quote.themeTitle}*\n\n` +
      `“${quote.quote}”\n` +
      `— ${quote.source} (Nalar Nanti)\n\n` +
      `*Refleksi:* ${quote.reflection}\n\n` +
      `— Ruang Singgah untuk Menata Nalar & Merakit Asa\nhttps://nalarnanti.com`
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
      className="py-16 sm:py-24 bg-transparent border-t border-[#E5DDD0]/60 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Header Seksi */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EDE2] border border-[#E5DDD0] text-xs font-semibold text-[#886950] mb-3 shadow-soft">
            <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]/20" />
            <span>Teman Bicara Hati</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-3">
            Lagi Merasa Apa Hari Ini?
          </h2>

          <p className="font-sans text-xs sm:text-base text-[#7A6F64] leading-relaxed">
            Pilih suasana hatimu saat ini, biarkan Nalar Nanti menyuguhkan pengingat yang paling pas untuk menemanimu.
          </p>
        </div>

        {/* 2. Lima Pilihan Tombol Suasana Hati (Pill Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-4xl mx-auto mb-8 sm:mb-10">
          {MOOD_OPTIONS.map((mood) => {
            const Icon = mood.icon;
            const isActive = mood.id === selectedMoodId;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMoodId(mood.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all active:scale-95 duration-200 ${
                  isActive
                    ? "bg-[#C8A98E] text-[#FAF7F2] border border-[#C8A98E] shadow-card scale-[1.02]"
                    : "bg-[#F3EDE2] text-[#7A6F64] border border-[#E5DDD0] hover:border-[#C8A98E]/70 hover:text-[#3E362E] shadow-soft"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-[#FAF7F2]" : "text-[#886950]"
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
          className="p-5 sm:p-7 rounded-3xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft mb-8 sm:mb-12 text-center max-w-3xl mx-auto relative overflow-hidden animate-fadeIn"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#8E9B8E] mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
            <span>Pesan Hangat untukmu</span>
          </div>
          <p className="font-serif italic text-base sm:text-xl text-[#3E362E] leading-relaxed max-w-2xl mx-auto">
            “{activeMood.empathyMessage}”
          </p>
        </div>

        {/* 4. Tiga Kartu Kutipan Rekomendasi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {recommendedQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-3xl p-5 sm:p-6 shadow-soft hover:shadow-card hover:border-[#C8A98E]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Kartu: Judul Tema & Kategori */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#8E9B8E]">
                    {quote.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-[#886950] bg-[#FAF7F2] px-2 py-0.5 rounded-full border border-[#E5DDD0]">
                      #{quote.id}
                    </span>
                    <button
                      onClick={() => toggleSave(quote.id)}
                      title={isSaved(quote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-all active:scale-95 ${
                        isSaved(quote.id)
                          ? "bg-[#C8A98E] text-[#FAF7F2] border-[#C8A98E]"
                          : "bg-[#FAF7F2] text-[#7A6F64] border-[#E5DDD0] hover:border-[#C8A98E] hover:text-[#3E362E]"
                      }`}
                    >
                      <Bookmark className={`w-3 h-3 ${isSaved(quote.id) ? "fill-[#FAF7F2]" : ""}`} />
                      <span>{isSaved(quote.id) ? "Tersimpan" : "Simpan"}</span>
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#3E362E] mb-3 group-hover:text-[#886950] transition-colors leading-snug">
                  {quote.themeTitle}
                </h3>

                {/* Teks Kutipan Utama */}
                <div className="relative mb-5">
                  <QuoteIcon className="w-5 h-5 text-[#C8A98E]/40 mb-2 group-hover:text-[#C8A98E] transition-colors" />
                  <p className="font-serif italic text-sm sm:text-base leading-relaxed text-[#3E362E]">
                    “{quote.quote}”
                  </p>
                </div>

                {/* Pill Sumber */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium px-2.5 py-1 rounded-xl bg-[#EAE1D3] text-[#3E362E] border border-[#DDD3C3] shadow-soft">
                    <Feather className="w-3 h-3 text-[#886950]" />
                    <span className="truncate max-w-[200px]">{quote.source}</span>
                  </span>
                </div>
              </div>

              {/* Tiga Tombol Aksi Lengkap: Salin, Bagikan WA, dan Simpan Gambar */}
              <div className="pt-3.5 border-t border-[#E5DDD0]/70 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  {/* Tombol Salin */}
                  <button
                    onClick={() => handleCopy(quote)}
                    className="min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 group/copy"
                    title="Salin kutipan"
                  >
                    {copiedId === quote.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                        <span className="text-[#8E9B8E]">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#7A6F64] group-hover/copy:text-[#C8A98E] transition-colors" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>

                  {/* Tombol Bagikan ke WhatsApp */}
                  <button
                    onClick={() => handleShareWa(quote)}
                    className="min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
                    title="Bagikan ke WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#FAF7F2]" />
                    <span>WhatsApp</span>
                  </button>
                </div>

                {/* Tombol Simpan Gambar (Unduh PNG 9:16) */}
                <button
                  onClick={() => handleDownload(quote)}
                  disabled={downloadingId === quote.id}
                  className="w-full min-h-[40px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 disabled:opacity-50 group/download"
                  title="Unduh Kartu Gambar untuk Story & Status"
                >
                  {downloadingId === quote.id ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A98E]" />
                      <span>Menyiapkan Gambar...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#7A6F64] group-hover/download:text-[#C8A98E] transition-colors" />
                      <span>Simpan Gambar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


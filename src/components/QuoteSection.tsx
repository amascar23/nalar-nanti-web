"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { QUOTES_DATA, QuoteItem, QuoteCategory } from "@/data/quotes";
import {
  Quote,
  Copy,
  Check,
  Share2,
  Feather,
  Search,
  X,
  ArrowRight,
  BookOpen,
  Compass,
  Instagram,
  Download,
  Loader2,
  Bookmark,
  Mail,
} from "lucide-react";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import SendEnvelopeModal from "@/components/SendEnvelopeModal";
import { getShareBaseUrl } from "@/lib/constants";

const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

interface QuoteSectionProps {
  isPreview?: boolean;
  quotes?: QuoteItem[];
}

export default function QuoteSection({ isPreview = false, quotes = QUOTES_DATA }: QuoteSectionProps) {
  const quoteList = quotes && quotes.length > 0 ? quotes : QUOTES_DATA;
  const [selectedType, setSelectedType] = useState<"Semua" | "Islami" | "Umum">("Semua");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedModalQuote, setSelectedModalQuote] = useState<QuoteItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isModalCopied, setIsModalCopied] = useState<boolean>(false);
  const [isModalDownloading, setIsModalDownloading] = useState<boolean>(false);
  const [envelopeQuote, setEnvelopeQuote] = useState<QuoteItem | null>(null);
  const { isSaved, toggleSave } = useSavedQuotes();

  // Tab filter kategori sesuai data asli @nalarnanti
  const categories: ("Semua" | QuoteCategory)[] = [
    "Semua",
    "Refleksi Islami",
    "Tenang & Hati",
    "Proses & Bertumbuh",
    "Jejak Awal Nalar Nanti",
  ];

  // Kunci scroll body saat modal aktif
  useEffect(() => {
    if (selectedModalQuote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedModalQuote]);

  // Tangani tombol ESC untuk menutup modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedModalQuote(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter kutipan cerdas: berdasarkan tipe, kategori, dan kata kunci (isi, judul tema, atau tokoh/sumber)
  const filteredQuotes = quoteList.filter((item) => {
    const matchType = selectedType === "Semua" || item.type === selectedType;
    const matchCat = selectedCategory === "Semua" || item.category === selectedCategory;

    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      item.quote.toLowerCase().includes(query) ||
      item.themeTitle.toLowerCase().includes(query) ||
      item.source.toLowerCase().includes(query) ||
      item.reflection.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchType && matchCat && matchSearch;
  });

  // Tampilkan 3 kutipan terbaru untuk mode preview landing page, atau hasil filter untuk halaman penuh
  const displayedQuotes = isPreview ? quoteList.slice(0, 3) : filteredQuotes;

  const handleCopy = (quote: QuoteItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToCopy = `“${quote.quote}” — ${quote.source} (Nalar Nanti)\n\n${quote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyInModal = (quote: QuoteItem) => {
    const textToCopy = `“${quote.quote}” — ${quote.source} (Nalar Nanti)\n\n${quote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setIsModalCopied(true);
    setTimeout(() => {
      setIsModalCopied(false);
    }, 2200);
  };

  const handleShareWa = (quote: QuoteItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const baseUrl = getShareBaseUrl();
    const text = encodeURIComponent(
      `🌿 *Nalar Nanti — ${quote.themeTitle}*\n\n` +
      `“${quote.quote}”\n` +
      `— ${quote.source} (Nalar Nanti)\n\n` +
      `*Refleksi:* ${quote.reflection}\n\n` +
      `— Ruang Singgah untuk Menata Nalar & Merakit Asa\n${baseUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleDownloadCard = async (quote: QuoteItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      setDownloadingId(quote.id);
      await downloadQuoteAsImage(quote);
    } catch (err) {
      console.error("Gagal mengunduh kartu kutipan:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadModalQuote = async (quote: QuoteItem) => {
    try {
      setIsModalDownloading(true);
      await downloadQuoteAsImage(quote);
    } catch (err) {
      console.error("Gagal mengunduh kartu refleksi:", err);
    } finally {
      setIsModalDownloading(false);
    }
  };

  return (
    <section id="kutipan" className="py-10 sm:py-16 md:py-20 lg:py-24 bg-transparent border-t border-[#E5DDD0]/60 dark:border-[#3A332E]/60 relative">
      <span id="koleksi" className="sr-only" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10 md:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 block">
            Ruang Refleksi
          </span>
          {isPreview ? (
            <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-3">
              Koleksi Nalar
            </h2>
          ) : (
            <h1 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-3">
              Koleksi Nalar
            </h1>
          )}
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] dark:text-[#A89F94] leading-relaxed max-w-xl mx-auto">
            {isPreview
              ? "Untaian kata penyejuk, hikmah Islami, dan renungan hidup pilihan @nalarnanti. Ketuk salah satu kartu untuk menyimak catatan refleksi selengkapnya."
              : `Arsip lengkap ${quoteList.length} kutipan penyejuk, hikmah Islami, dan renungan hidup dari @nalarnanti. Ketuk salah satu kartu untuk menyimak catatan refleksi selengkapnya.`}
          </p>
        </div>

        {/* Search Bar & Quick Filters (Hanya muncul di halaman penuh /koleksi) */}
        {!isPreview && (
          <div className="max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3.5 sm:space-y-4">
            {/* Kolom Pencarian Cerdas (mencari kutipan, judul tema, atau tokoh/sumber) */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#7A6F64] dark:text-[#A89F94] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kutipan, judul tema, atau tokoh (contoh: Rumi, Syafi'i, Ali, Bukhari, waktu)..."
                className="w-full pl-10 sm:pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-base sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/70 dark:placeholder-[#A89F94]/70 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Bersihkan pencarian"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#7A6F64] hover:text-[#3E362E] hover:bg-white/70 dark:hover:bg-[#1C1917] active:scale-95 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Cepat Tipe Kutipan: "Semua Tipe", "Islami", dan "Umum" */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
              <div className="inline-flex items-center p-1 bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] rounded-full shadow-soft">
                {(["Semua", "Islami", "Umum"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${selectedType === type
                      ? "bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] shadow-soft"
                      : "text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC]"
                      }`}
                  >
                    {type === "Semua" ? "Semua Tipe" : type}
                  </button>
                ))}
              </div>

              <p className="text-xs text-[#7A6F64] dark:text-[#A89F94] font-medium">
                Menampilkan {filteredQuotes.length} dari {quoteList.length} kutipan
              </p>
            </div>

            {/* Tab Filter Kategori */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${selectedCategory === cat
                    ? "bg-gradient-to-r from-[#3E362E] to-[#52473D] dark:from-[#C8A98E] dark:to-[#B9967A] text-[#FAF7F2] shadow-soft"
                    : "bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] text-[#7A6F64] dark:text-[#A89F94] border border-[#E5DDD0] dark:border-[#3A332E] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:border-[#C8A98E]/60"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Grid Kartu Koleksi Nalar: 3 kolom di laptop saat preview (1 baris), atau 3/2/1 kolom saat halaman penuh */}
        <div
          className={`grid gap-4 sm:gap-7 lg:gap-8 ${isPreview
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
        >
          {displayedQuotes.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedModalQuote(item);
                setIsModalCopied(false);
              }}
              className="flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 shadow-[0_8px_24px_-8px_rgba(200,169,142,0.16)] dark:shadow-none hover:shadow-[0_14px_32px_-8px_rgba(200,169,142,0.26)] hover:-translate-y-1 active:scale-[0.99] transition-all duration-300 relative group cursor-pointer text-left overflow-hidden"
            >
              <div className="flex flex-col flex-1">
                {/* Header Kartu: Label Kategori Kecil & Identitas Feed Instagram @nalarnanti */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <a
                      href={IG_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      title="Kunjungi profil Instagram @nalarnanti"
                      className="flex items-center gap-1.5 group/ig hover:text-[#C8A98E] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full overflow-hidden border border-[#E5DDD0] dark:border-[#3A332E] bg-white/90 dark:bg-[#1C1917] shrink-0 group-hover/ig:border-[#C8A98E] transition-colors shadow-xs">
                        <Image
                          src="/images/logo-hd.png"
                          alt="Nalar Nanti"
                          width={48}
                          height={48}
                          unoptimized
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#7A6F64] dark:text-[#A89F94] group-hover/ig:text-[#C8A98E] tracking-tight transition-colors">
                        @nalarnanti
                      </span>
                    </a>
                    <span className="text-[10px] text-[#886950] dark:text-[#C8A98E] font-bold bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917]/80 dark:to-[#26221F]/80 backdrop-blur-sm px-1.5 py-0.5 rounded-full border border-[#E5DDD0]/70 dark:border-[#3A332E] whitespace-nowrap">
                      #{item.orderNumber}
                    </span>
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917]/80 dark:to-[#26221F]/80 backdrop-blur-sm border border-[#E5DDD0]/70 dark:border-[#3A332E] text-[#8E9B8E] whitespace-nowrap">
                    {item.category}
                  </span>
                </div>

                {/* Bagian Atas Kartu: Judul Tema Kartu (themeTitle) */}
                <div className="mb-3">
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] dark:text-[#EDE6DC] group-hover:text-[#886950] dark:group-hover:text-[#C8A98E] transition-colors leading-snug">
                    {item.themeTitle}
                  </h3>
                </div>

                {/* Bagian Tengah: Teks Kutipan Utama dengan Font Lora */}
                <div className="relative mb-5 flex-1">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A98E]/40 mb-2 group-hover:text-[#C8A98E] transition-colors" />
                  <p className="font-serif italic text-[16px] sm:text-[18px] leading-[1.8] text-[#3E362E] dark:text-[#EDE6DC] line-clamp-4">
                    “{item.quote}”
                  </p>
                </div>
              </div>

              {/* Bagian Bawah Kartu: Sumber & Baca Refleksi di Atas, Nuansa & 5 Tombol Aksi Lengkap di Bawah */}
              <div className="mt-5 pt-3.5 border-t border-[#E5DDD0]/70 dark:border-[#3A332E] flex flex-col gap-2.5">
                {/* Baris 1: Sumber Kutipan di Kiri & Petunjuk "Baca refleksi →" di Kanan */}
                <div className="flex items-center justify-between text-xs text-[#7A6F64] dark:text-[#A89F94] gap-2 min-w-0">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-sans font-medium px-2.5 py-1 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] border border-[#E5DDD0] dark:border-[#443C36] shadow-xs max-w-[62%] truncate">
                    <Feather className="w-3 h-3 text-[#886950] dark:text-[#C8A98E] shrink-0" />
                    <span className="truncate">{item.source}</span>
                  </span>

                  <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#C8A98E] group-hover:text-[#B9967A] transition-colors shrink-0">
                    <span>Baca refleksi</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Baris 2: Nuansa di Kiri & 5 Tombol Aksi Lengkap di Kanan (Muat Utuh Tanpa Terpotong) */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E5DDD0]/50 dark:border-[#3A332E]/50">
                  <span className="text-[10px] text-[#7A6F64]/70 dark:text-[#A89F94]/70 font-sans whitespace-nowrap">
                    Nuansa {item.type}
                  </span>

                  {/* Tombol Mini Aksi: 5 Ikon Sejajar (w-7 h-7, gap-1, seluruhnya muat dalam kartu) */}
                  <div className="flex items-center gap-1 shrink-0 flex-wrap justify-end">
                    {/* 1. Simpan (Saku Hati) */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(item.id);
                      }}
                      title={isSaved(item.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                      aria-label={isSaved(item.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                      className={`w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center transition-all active:scale-95 ${isSaved(item.id)
                          ? "text-[#C8A98E] bg-[#FAF7F2] dark:bg-[#1C1917] shadow-xs"
                          : "text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70"
                        }`}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${isSaved(item.id) ? "fill-[#C8A98E]" : ""
                          }`}
                      />
                    </button>

                    {/* 2. Salin */}
                    <button
                      onClick={(e) => handleCopy(item, e)}
                      title="Salin Kutipan"
                      aria-label="Salin Kutipan"
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* 3. Bagikan WhatsApp */}
                    <button
                      onClick={(e) => handleShareWa(item, e)}
                      title="Bagikan ke WhatsApp"
                      aria-label="Bagikan ke WhatsApp"
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* 4. Unduh Gambar 9:16 */}
                    <button
                      onClick={(e) => handleDownloadCard(item, e)}
                      disabled={downloadingId === item.id}
                      title="Simpan Gambar 9:16"
                      aria-label="Simpan Gambar 9:16"
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {downloadingId === item.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A98E]" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                    </button>

                    {/* 5. Kirim Amplop */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEnvelopeQuote(item);
                      }}
                      title="Kirim Amplop Pengingat"
                      aria-label="Kirim Amplop Pengingat"
                      className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#C8A98E] hover:bg-[#EAE1D3]/70 dark:hover:bg-[#3A332E]/70 transition-all active:scale-95"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Selengkapnya (Hanya Tampil di Mode Preview Landing Page) */}
        {isPreview && (
          <div className="mt-8 sm:mt-12 text-center">
            <Link
              href="/koleksi"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] hover:brightness-105 font-semibold text-xs sm:text-sm shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all group whitespace-nowrap"
            >
              <span>Lihat Selengkapnya ({quoteList.length} Kutipan)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}

        {/* Empty State bila pencarian tidak ditemukan (Hanya di mode halaman penuh) */}
        {!isPreview && filteredQuotes.length === 0 && (
          <div className="text-center py-14 sm:py-16 bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1C1917] rounded-3xl border border-[#E5DDD0] dark:border-[#3A332E] max-w-md mx-auto mt-6 p-6 shadow-soft">
            <BookOpen className="w-8 h-8 text-[#C8A98E] mx-auto mb-3" />
            <p className="font-serif text-lg text-[#3E362E] dark:text-[#EDE6DC] mb-2 font-medium">
              Tidak ada kutipan yang sesuai
            </p>
            <p className="text-xs text-[#7A6F64] dark:text-[#A89F94] max-w-xs mx-auto mb-5 leading-relaxed">
              Coba gunakan kata kunci lain (misal: Rumi, Syafi'i, sabar) atau kembalikan pilihan ke semua kategori.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("Semua");
                setSelectedCategory("Semua");
              }}
              className="text-xs font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] hover:brightness-105 transition-all shadow-soft active:scale-95"
            >
              Reset Filter {"&"} Pencarian
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL / POP-UP BACA REFLEKSI (Nuansa Cream Lembut Khas @nalarnanti) */}
      {/* ========================================================================= */}
      {selectedModalQuote && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-quote-title"
          className="fixed inset-0 z-50 bg-[#3E362E]/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedModalQuote(null)}
        >
          <div
            className="bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-[0_20px_50px_-15px_rgba(200,169,142,0.25)] relative text-left max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <div className="flex items-center gap-2">
                <a
                  href={IG_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Kunjungi profil Instagram @nalarnanti"
                  className="flex items-center gap-2 group/modalig"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-[#E5DDD0] dark:border-[#3A332E] bg-white/90 dark:bg-[#1C1917] shrink-0 group-hover/modalig:border-[#C8A98E] transition-all shadow-xs">
                    <Image
                      src="/images/logo-hd.png"
                      alt="Nalar Nanti"
                      width={64}
                      height={64}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] group-hover/modalig:text-[#C8A98E] transition-colors">
                      @nalarnanti
                    </span>
                    <span className="text-[10px] text-[#886950] dark:text-[#C8A98E] font-bold bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917]/80 dark:to-[#26221F]/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#E5DDD0]/70 dark:border-[#3A332E] whitespace-nowrap">
                      #{selectedModalQuote.orderNumber}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917]/80 dark:to-[#26221F]/80 backdrop-blur-sm text-[#8E9B8E] border border-[#E5DDD0]/70 dark:border-[#3A332E] whitespace-nowrap">
                      {selectedModalQuote.category}
                    </span>
                  </div>
                </a>
              </div>

              {/* Tombol Tutup - Touch friendly */}
              <button
                onClick={() => setSelectedModalQuote(null)}
                aria-label="Tutup jendela refleksi"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-white/70 dark:hover:bg-[#1C1917] active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Judul Tema Kartu (themeTitle) di Modal */}
            <div className="mt-4 mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block mb-1">
                Tema Refleksi
              </span>
              <h3 id="modal-quote-title" className="font-serif text-xl sm:text-2xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] leading-snug">
                {selectedModalQuote.themeTitle}
              </h3>
            </div>

            {/* Kutipan Utama dalam Modal (Lora Font) */}
            <div className="mb-5 sm:mb-6 relative">
              <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A98E]/50 mb-2" />
              <blockquote className="font-serif italic text-[16px] sm:text-[18px] md:text-[20px] text-[#3E362E] dark:text-[#EDE6DC] leading-[1.8]">
                “{selectedModalQuote.quote}”
              </blockquote>

              {/* Pill/Badge Sumber (source) */}
              <div className="mt-4 flex items-center">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-medium px-3.5 py-1.5 rounded-full bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] border border-[#E5DDD0] dark:border-[#443C36] shadow-xs">
                  <Feather className="w-3.5 h-3.5 text-[#886950] dark:text-[#C8A98E]" />
                  <span>{selectedModalQuote.source}</span>
                </span>
              </div>
            </div>

            {/* Catatan Refleksi Lengkap */}
            <div className="bg-gradient-to-br from-white/70 to-[#FAF7F2]/60 dark:from-[#1E1B18]/70 dark:to-[#141210]/60 backdrop-blur-sm border border-[#E5DDD0]/70 dark:border-[#3A332E] rounded-2xl p-4 sm:p-6 mb-6">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8E9B8E] mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Catatan Refleksi</span>
              </div>
              <p className="font-sans text-xs sm:text-base text-[#6E5D4F] dark:text-[#EDE6DC] leading-relaxed">
                {selectedModalQuote.reflection}
              </p>
            </div>

            {/* Tombol Aksi di Modal: 5 Tombol Kompak */}
            <div className="flex flex-col gap-3 pt-3.5 border-t border-[#E5DDD0] dark:border-[#3A332E]">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {/* 1. Saku Hati / Simpan */}
                <button
                  onClick={() => toggleSave(selectedModalQuote.id)}
                  className={`h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95 whitespace-nowrap ${isSaved(selectedModalQuote.id)
                    ? "bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2]"
                    : "bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#1C1917] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] border border-[#E5DDD0] dark:border-[#3A332E] hover:border-[#C8A98E]"
                    }`}
                  title={isSaved(selectedModalQuote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                  aria-label={isSaved(selectedModalQuote.id) ? "Hapus dari Saku Hati" : "Simpan ke Saku Hati"}
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${isSaved(selectedModalQuote.id) ? "fill-[#FAF7F2] text-[#FAF7F2]" : "text-[#7A6F64] dark:text-[#A89F94]"
                      }`}
                  />
                  <span>{isSaved(selectedModalQuote.id) ? "Tersimpan" : "Simpan"}</span>
                </button>

                {/* 2. Salin */}
                <button
                  onClick={() => handleCopyInModal(selectedModalQuote)}
                  title="Salin Kutipan"
                  aria-label="Salin Kutipan"
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#1C1917] dark:to-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  {isModalCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      <span className="text-[#8E9B8E]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A6F64] dark:text-[#A89F94]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>

                {/* 3. WhatsApp */}
                <button
                  onClick={() => handleShareWa(selectedModalQuote)}
                  title="Bagikan ke WhatsApp"
                  aria-label="Bagikan ke WhatsApp"
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] hover:brightness-105 transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>WhatsApp</span>
                </button>

                {/* 4. Simpan Gambar */}
                <button
                  onClick={() => handleDownloadModalQuote(selectedModalQuote)}
                  disabled={isModalDownloading}
                  title="Simpan Gambar 9:16"
                  aria-label="Simpan Gambar 9:16"
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#1C1917] dark:to-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-xs active:scale-95 disabled:opacity-60 whitespace-nowrap"
                >
                  {isModalDownloading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C8A98E]" />
                      <span>...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-[#7A6F64] dark:text-[#A89F94]" />
                      <span>Gambar</span>
                    </>
                  )}
                </button>

                {/* 5. Kirim Amplop */}
                <button
                  onClick={() => setEnvelopeQuote(selectedModalQuote)}
                  title="Kirim Amplop Pengingat"
                  aria-label="Kirim Amplop Pengingat"
                  className="h-8 px-2.5 rounded-lg text-xs font-semibold inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#1C1917] dark:to-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-xs active:scale-95 whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5 text-[#7A6F64] dark:text-[#A89F94]" />
                  <span>Amplop</span>
                </button>
              </div>

              {/* Tombol Tutup Tambahan */}
              <button
                onClick={() => setSelectedModalQuote(null)}
                className="text-xs text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] pt-1 pb-0.5 transition-colors text-center"
              >
                Tutup jendela refleksi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Kirim Amplop Pengingat */}
      <SendEnvelopeModal
        quoteItem={envelopeQuote}
        isOpen={Boolean(envelopeQuote)}
        onClose={() => setEnvelopeQuote(null)}
      />
    </section>
  );
}

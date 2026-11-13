"use client";

import React, { useState, useEffect } from "react";
import { QUOTES_DATA, QuoteItem, QuoteCategory } from "@/data/quotes";
import { formatIndonesianDate } from "@/lib/utils";
import {
  Quote,
  Copy,
  Check,
  Share2,
  Calendar,
  Search,
  X,
  ArrowRight,
  BookOpen,
  Compass,
} from "lucide-react";

export default function QuoteSection() {
  const [selectedType, setSelectedType] = useState<"Semua" | "Islami" | "Umum">("Semua");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedModalQuote, setSelectedModalQuote] = useState<QuoteItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalCopied, setIsModalCopied] = useState<boolean>(false);

  const categories: ("Semua" | QuoteCategory)[] = [
    "Semua",
    "Refleksi Islami",
    "Tenang & Hati",
    "Proses & Bertumbuh",
    "Pengingat Diri",
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

  // Filter kutipan berdasarkan tipe, kategori, dan kata kunci pencarian
  const filteredQuotes = QUOTES_DATA.filter((item) => {
    const matchType = selectedType === "Semua" || item.type === selectedType;
    const matchCat = selectedCategory === "Semua" || item.category === selectedCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      item.quote.toLowerCase().includes(query) ||
      item.reflection.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query);

    return matchType && matchCat && matchSearch;
  });

  const handleCopy = (quote: QuoteItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const textToCopy = `“${quote.quote}”\n\n${quote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleCopyInModal = (quote: QuoteItem) => {
    const textToCopy = `“${quote.quote}”\n\n${quote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setIsModalCopied(true);
    setTimeout(() => {
      setIsModalCopied(false);
    }, 2200);
  };

  const handleShareWa = (quote: QuoteItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = encodeURIComponent(
      `🌿 *Nalar Nanti — Ruang Teduh untuk Berpikir & Merasa*\n\n` +
      `“${quote.quote}”\n\n` +
      `*Refleksi:* ${quote.reflection}\n\n` +
      `— Baca selengkapnya di https://nalarnanti.com atau IG: @nalarnanti`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const formatDate = (dateString: string) => {
    return formatIndonesianDate(dateString, true);
  };

  return (
    <section id="kutipan" className="py-16 sm:py-28 bg-[#FAF7F2] border-t border-[#E5DDD0]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 block">
            Ruang Refleksi
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-3">
            Koleksi Nalar
          </h2>
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] leading-relaxed">
            Kumpulan kata-kata penenang, motivasi Islami, dan renungan kehidupan. Klik salah satu kartu untuk membaca catatan refleksi lengkapnya.
          </p>
        </div>

        {/* Search Bar & Quick Filters */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3.5 sm:space-y-4">
          {/* Kolom Pencarian Sederhana (font-size 16px di mobile mencegah auto-zoom iOS) */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#7A6F64] absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kutipan (contoh: sabar, doa, lelah, mekar)..."
              className="w-full pl-10 sm:pl-11 pr-10 py-3 sm:py-3.5 rounded-2xl bg-[#F3EDE2] border border-[#E5DDD0] text-base sm:text-sm text-[#3E362E] placeholder-[#7A6F64]/70 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Bersihkan pencarian"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#FAF7F2] active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Cepat Nuansa (Islami & Umum) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
            <div className="inline-flex items-center p-1 bg-[#F3EDE2] border border-[#E5DDD0] rounded-full shadow-soft">
              {(["Semua", "Islami", "Umum"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                    selectedType === type
                      ? "bg-[#C8A98E] text-[#FAF7F2] shadow-soft"
                      : "text-[#7A6F64] hover:text-[#3E362E]"
                  }`}
                >
                  {type === "Semua" ? "Semua Nuansa" : `Nuansa ${type}`}
                </button>
              ))}
            </div>

            <p className="text-xs text-[#7A6F64] font-medium">
              Menampilkan {filteredQuotes.length} kutipan
            </p>
          </div>

          {/* Tab Filter Kategori */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium transition-all active:scale-95 ${
                  selectedCategory === cat
                    ? "bg-[#3E362E] text-[#FAF7F2] shadow-soft"
                    : "bg-[#F3EDE2] text-[#7A6F64] border border-[#E5DDD0] hover:text-[#3E362E] hover:border-[#C8A98E]/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Kartu Koleksi Nalar: 3 kolom di laptop, 2 kolom di tablet, 1 kolom di HP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredQuotes.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedModalQuote(item);
                setIsModalCopied(false);
              }}
              className="flex flex-col justify-between p-5 sm:p-7 rounded-3xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft hover:shadow-card hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 relative group cursor-pointer text-left overflow-hidden"
            >
              <div>
                {/* Header Kartu Bergaya Feed Instagram @nalarnanti */}
                <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5 pb-3 border-b border-[#E5DDD0]/70">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#C8A98E]">
                      <Compass className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-semibold text-[#7A6F64] tracking-tight">
                      @nalarnanti
                    </span>
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#8E9B8E]">
                    {item.category}
                  </span>
                </div>

                {/* Teks Kutipan Utama (Lora Serif) */}
                <div className="relative mb-5">
                  <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8A98E]/40 mb-2 group-hover:text-[#C8A98E] transition-colors" />
                  <p className="font-serif italic text-base sm:text-lg leading-relaxed text-[#3E362E] line-clamp-4">
                    “{item.quote}”
                  </p>
                </div>
              </div>

              {/* Footer Kartu & Petunjuk Klik Refleksi */}
              <div className="pt-3.5 border-t border-[#E5DDD0]/70 flex flex-col gap-2.5">
                <div className="flex items-center justify-between text-xs text-[#7A6F64]">
                  <span className="inline-flex items-center gap-1.5 text-[11px]">
                    <Calendar className="w-3 h-3 text-[#8E9B8E]" />
                    {formatDate(item.date)}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => handleCopy(item, e)}
                      title="Salin kutipan"
                      aria-label="Salin kutipan"
                      className="p-1.5 rounded-lg text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#FAF7F2] active:scale-95 transition-all"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleShareWa(item, e)}
                      title="Bagikan ke WhatsApp"
                      aria-label="Bagikan kutipan ke WhatsApp"
                      className="p-1.5 rounded-lg text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#FAF7F2] active:scale-95 transition-all"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Petunjuk kecil: "Klik untuk baca refleksi →" */}
                <div className="flex items-center gap-1 text-xs font-semibold text-[#C8A98E] group-hover:text-[#B9967A] transition-colors pt-0.5">
                  <span>Klik untuk baca refleksi</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State bila pencarian tidak ditemukan */}
        {filteredQuotes.length === 0 && (
          <div className="text-center py-14 sm:py-16 bg-[#F3EDE2] rounded-3xl border border-[#E5DDD0] max-w-md mx-auto mt-6 p-6">
            <BookOpen className="w-8 h-8 text-[#C8A98E] mx-auto mb-3" />
            <p className="font-serif text-lg text-[#3E362E] mb-2 font-medium">
              Tidak ada kutipan yang sesuai
            </p>
            <p className="text-xs text-[#7A6F64] max-w-xs mx-auto mb-5 leading-relaxed">
              Coba gunakan kata kunci lain atau kembalikan pilihan ke semua kategori.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("Semua");
                setSelectedCategory("Semua");
              }}
              className="text-xs font-semibold px-5 py-2.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
            >
              Reset Filter {"&"} Pencarian
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL / POP-UP BACA REFLEKSI (Nuansa Soft Cream) */}
      {/* ========================================================================= */}
      {selectedModalQuote && (
        <div
          className="fixed inset-0 z-50 bg-[#3E362E]/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedModalQuote(null)}
        >
          <div
            className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-3xl p-5 sm:p-9 max-w-xl w-full shadow-floating relative text-left max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-[#E5DDD0]">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#F3EDE2] border border-[#E5DDD0] flex items-center justify-center text-[#C8A98E]">
                  <Compass className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#3E362E]">
                      @nalarnanti
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#8E9B8E]/15 text-[#637063]">
                      {selectedModalQuote.category}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#7A6F64]">
                    {formatDate(selectedModalQuote.date)}
                  </span>
                </div>
              </div>

              {/* Tombol Tutup - Touch friendly */}
              <button
                onClick={() => setSelectedModalQuote(null)}
                aria-label="Tutup jendela refleksi"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#F3EDE2] active:scale-95 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Kutipan Utama dalam Modal (Lora Font) */}
            <div className="mb-5 sm:mb-6">
              <Quote className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A98E]/50 mb-2" />
              <blockquote className="font-serif italic text-lg sm:text-2xl text-[#3E362E] leading-relaxed">
                “{selectedModalQuote.quote}”
              </blockquote>
            </div>

            {/* Catatan Refleksi Panjang */}
            <div className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-2xl p-4 sm:p-6 mb-6">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8E9B8E] mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Catatan Refleksi</span>
              </div>
              <p className="font-sans text-xs sm:text-base text-[#3E362E] leading-relaxed">
                {selectedModalQuote.reflection}
              </p>
            </div>

            {/* Tombol Aksi di Modal (Mobile Friendly 2 Kolom) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-[#E5DDD0]">
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
                {/* Tombol Salin */}
                <button
                  onClick={() => handleCopyInModal(selectedModalQuote)}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 rounded-full bg-[#F3EDE2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95"
                >
                  {isModalCopied ? (
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
                  onClick={() => handleShareWa(selectedModalQuote)}
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#FAF7F2]" />
                  <span>WhatsApp</span>
                </button>
              </div>

              {/* Tombol Tutup Tambahan */}
              <button
                onClick={() => setSelectedModalQuote(null)}
                className="text-xs text-[#7A6F64] hover:text-[#3E362E] py-1 transition-colors text-center"
              >
                Tutup jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { QUOTES_DATA, QuoteItem, QuoteCategory } from "@/data/quotes";
import { Quote, Copy, Check, Share2, Sparkles, BookOpen, Calendar } from "lucide-react";

export default function QuoteSection() {
  const [selectedType, setSelectedType] = useState<"Semua" | "Islami" | "Umum">("Semua");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedReflectionId, setExpandedReflectionId] = useState<string | null>(null);

  const categories: ("Semua" | QuoteCategory)[] = [
    "Semua",
    "Refleksi Islami",
    "Tenang & Hati",
    "Proses & Bertumbuh",
    "Pengingat Diri",
  ];

  const filteredQuotes = QUOTES_DATA.filter((item) => {
    const matchType = selectedType === "Semua" || item.type === selectedType;
    const matchCat = selectedCategory === "Semua" || item.category === selectedCategory;
    return matchType && matchCat;
  });

  const handleCopy = (quote: QuoteItem) => {
    const textToCopy = `"${quote.quote}"\n\n${quote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleShareWa = (quote: QuoteItem) => {
    const text = encodeURIComponent(
      `🌿 *Nalar Nanti — Ruang Teduh untuk Berpikir & Merasa*\n\n` +
      `“${quote.quote}”\n\n` +
      `*Refleksi:* ${quote.reflection}\n\n` +
      `— Baca selengkapnya di https://nalarnanti.com atau IG: @nalarnanti`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString("id-ID", options);
    } catch {
      return dateString;
    }
  };

  return (
    <section id="kutipan" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E5DDD0]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 block">
            Koleksi Kutipan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-4">
            Untaian Kalimat Penenang Batin
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6F64] leading-relaxed">
            Temukan pesan yang paling berbicara pada keadaan hatimu hari ini. Setiap kutipan dilengkapi catatan refleksi untuk menemani jedamu.
          </p>

          {/* Type Switcher (Semua / Islami / Umum) */}
          <div className="inline-flex items-center p-1 bg-[#F3EDE2] border border-[#E5DDD0] rounded-full mt-6 mb-4 shadow-soft">
            {(["Semua", "Islami", "Umum"] as const).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  setSelectedCategory("Semua");
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedType === type
                    ? "bg-[#C8A98E] text-[#FAF7F2] shadow-soft"
                    : "text-[#7A6F64] hover:text-[#3E362E]"
                }`}
              >
                {type === "Semua" ? "Semua Aliran" : `Nuansa ${type}`}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#3E362E] text-[#FAF7F2]"
                    : "bg-[#F3EDE2] text-[#7A6F64] border border-[#E5DDD0] hover:text-[#3E362E] hover:border-[#C8A98E]/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quotes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map((item) => {
            const isExpanded = expandedReflectionId === item.id;

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between p-7 rounded-2xl bg-[#F3EDE2] border transition-all duration-300 relative group ${
                  item.isFeatured
                    ? "border-[#C8A98E] ring-1 ring-[#C8A98E]/40 shadow-card"
                    : "border-[#E5DDD0] shadow-soft hover:shadow-card hover:-translate-y-1"
                }`}
              >
                <div>
                  {/* Top Meta row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#7A6F64] font-medium">
                        {item.category}
                      </span>
                      {item.isFeatured && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#C8A98E]/15 text-[#886950]">
                          <Sparkles className="w-3 h-3 text-[#C8A98E]" />
                          Pilihan
                        </span>
                      )}
                    </div>
                    <Quote className="w-5 h-5 text-[#C8A98E]/60 group-hover:text-[#C8A98E] transition-colors" />
                  </div>

                  {/* Main Quote */}
                  <p className="font-serif italic text-base sm:text-lg leading-relaxed text-[#3E362E] mb-5">
                    “{item.quote}”
                  </p>

                  {/* Instagram-style Reflection Note */}
                  <div className="bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-xl p-4 mb-5 text-xs text-[#7A6F64] leading-relaxed">
                    <div className="flex items-center justify-between mb-1.5 text-[#8E9B8E] font-semibold">
                      <span className="inline-flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                        <BookOpen className="w-3 h-3" />
                        Catatan Refleksi
                      </span>
                      <button
                        onClick={() =>
                          setExpandedReflectionId(isExpanded ? null : item.id)
                        }
                        className="text-[11px] text-[#C8A98E] hover:underline"
                      >
                        {isExpanded ? "Ringkas" : "Baca Lengkap"}
                      </button>
                    </div>
                    <p className={isExpanded ? "line-clamp-none" : "line-clamp-2"}>
                      {item.reflection}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Date & Actions */}
                <div className="pt-3 border-t border-[#E5DDD0]/70 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#7A6F64]/80 font-sans">
                    <Calendar className="w-3 h-3 text-[#8E9B8E]" />
                    {formatDate(item.date)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item)}
                      title="Salin kutipan & refleksi"
                      aria-label="Salin kutipan ke papan klip"
                      className="p-1.5 rounded-lg text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#FAF7F2] transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-[#8E9B8E]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleShareWa(item)}
                      title="Bagikan ke WhatsApp"
                      aria-label="Bagikan kutipan ke WhatsApp"
                      className="p-1.5 rounded-lg text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#FAF7F2] transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State fallback */}
        {filteredQuotes.length === 0 && (
          <div className="text-center py-12 bg-[#F3EDE2] rounded-2xl border border-[#E5DDD0] max-w-md mx-auto">
            <p className="font-serif text-base text-[#3E362E] mb-2">
              Belum ada kutipan pada filter ini
            </p>
            <button
              onClick={() => {
                setSelectedType("Semua");
                setSelectedCategory("Semua");
              }}
              className="text-xs font-semibold px-4 py-2 rounded-full bg-[#C8A98E] text-[#FAF7F2]"
            >
              Kembalikan ke Semua
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import { Quote, Copy, Check, Share2 } from "lucide-react";

export default function QuoteSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["Semua", "Jeda", "Penerimaan", "Ketenangan", "Pertumbuhan", "Harapan"];

  const filteredQuotes =
    selectedCategory === "Semua"
      ? QUOTES_DATA
      : QUOTES_DATA.filter((item) => item.category === selectedCategory);

  const handleCopy = (quote: QuoteItem) => {
    const textToCopy = `"${quote.quote}" — Nalar Nanti`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleShareWa = (quote: QuoteItem) => {
    const text = encodeURIComponent(`"${quote.quote}"\n\n— Nalar Nanti (Ruang Teduh untuk Berpikir & Merasa)`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <section id="kutipan" className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E5DDD0]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 block">
            Kutipan Pilihan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-4">
            Untaian Kalimat Penenang Batin
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6F64]">
            Pilih tema yang sedang dibutuhkan oleh hatimu hari ini. Biarkan maknanya meresap pelan-pelan.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-[#C8A98E] text-[#FAF7F2] shadow-soft"
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
          {filteredQuotes.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between p-7 rounded-2xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#7A6F64] font-medium">
                    {item.category}
                  </span>
                  <Quote className="w-5 h-5 text-[#C8A98E]/60 group-hover:text-[#C8A98E] transition-colors" />
                </div>

                <p className="font-serif italic text-base sm:text-lg leading-relaxed text-[#3E362E] mb-6">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DDD0]/70 flex items-center justify-between">
                <span className="text-xs text-[#7A6F64] font-sans">
                  {item.note || "Nalar Nanti"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(item)}
                    title="Salin kutipan"
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
          ))}
        </div>
      </div>
    </section>
  );
}

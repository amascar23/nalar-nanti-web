"use client";

import React, { useState } from "react";
import { REMINDERS_DATA, ReminderItem } from "@/data/reminders";
import { RefreshCw, Copy, Check, Share2, Compass, Sparkles } from "lucide-react";

export default function RandomReminderSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentReminder: ReminderItem = REMINDERS_DATA[currentIndex];

  const handleShuffle = () => {
    setIsRotating(true);
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * REMINDERS_DATA.length);
    } while (nextIndex === currentIndex && REMINDERS_DATA.length > 1);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setIsRotating(false);
      setCopied(false);
    }, 280);
  };

  const handleCopy = () => {
    const text = `[Pengingat Nalar Nanti]\n${currentReminder.title}\n\n"${currentReminder.body}"\n\nAksi lembut: ${currentReminder.actionPrompt}\n\n— https://nalarnanti.com`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWa = () => {
    const text = encodeURIComponent(
      `🌿 *Pengingat Nalar Nanti*\n\n*${currentReminder.title}*\n"${currentReminder.body}"\n\n_Refleksi:_ ${currentReminder.actionPrompt}\n\n(Ruang Teduh untuk Berpikir & Merasa)`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <section
      id="pengingat"
      className="py-20 sm:py-28 bg-[#F3EDE2]/40 border-t border-[#E5DDD0]/60 relative overflow-hidden"
    >
      {/* Decorative calm background elements */}
      <div className="absolute -top-24 right-0 w-80 h-80 bg-[#C8A98E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 w-80 h-80 bg-[#8E9B8E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EDE2] border border-[#E5DDD0] text-xs font-semibold text-[#8E9B8E] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Interaktif</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-4">
            Pengingat Acak Hari Ini
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6F64]">
            Setiap kali kamu merasa overwhelm, acak pengingat ini untuk menemukan kembali pusat ketenanganmu.
          </p>
        </div>

        {/* Central Card */}
        <div className="relative bg-[#F3EDE2] border border-[#E5DDD0] rounded-3xl p-8 sm:p-12 shadow-card max-w-2xl mx-auto transition-all">
          {/* Top category tag & Icon */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5DDD0]/70">
            <span className="text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#7A6F64] border border-[#E5DDD0]">
              {currentReminder.theme}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#7A6F64]">
              <Compass className="w-4 h-4 text-[#C8A98E]" />
              <span>Nalar Nanti</span>
            </div>
          </div>

          {/* Dynamic Content */}
          <div
            className={`transition-opacity duration-300 ${
              isRotating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3E362E] mb-5 leading-snug">
              {currentReminder.title}
            </h3>

            <p className="font-sans text-base sm:text-lg text-[#7A6F64] leading-relaxed mb-8">
              {currentReminder.body}
            </p>

            {/* Micro action box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] mb-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#8E9B8E] mb-1.5">
                Langkah Lembut Untukmu
              </p>
              <p className="font-sans text-sm text-[#3E362E] font-medium">
                {currentReminder.actionPrompt}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E5DDD0]/70">
            <button
              onClick={handleShuffle}
              disabled={isRotating}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#B9967A] transition-all shadow-soft active:scale-95 disabled:opacity-60"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRotating ? "animate-spin" : ""}`}
              />
              <span>Acak Pengingat Baru</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-medium text-[#7A6F64] hover:text-[#3E362E] hover:border-[#C8A98E] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShareWa}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-medium text-[#7A6F64] hover:text-[#3E362E] hover:border-[#8E9B8E] transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-[#8E9B8E]" />
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


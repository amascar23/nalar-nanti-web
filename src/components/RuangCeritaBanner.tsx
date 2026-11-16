"use client";

import React from "react";
import Link from "next/link";
import { Heart, ArrowRight, ShieldCheck, Mail, Sparkles } from "lucide-react";

export default function RuangCeritaBanner() {
  return (
    <section
      id="ruang-cerita"
      className="py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E5DDD0]/60 dark:border-[#3A332E]/60 relative overflow-hidden"
    >
      <div className="bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_12px_36px_-10px_rgba(200,169,142,0.20)] dark:shadow-none relative text-center">
        {/* Dekorasi Aksen Lingkaran Halus di Sudut */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(#C8A98E_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Badge Pengantar */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 sm:mb-4 shadow-soft">
            <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]/20" />
            <span>Ruang Aman &amp; Rahasia</span>
          </div>

          {/* Judul Utama */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-3">
            Ruang Bercerita
          </h2>

          {/* Kalimat Pengantar Empatis */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#7A6F64] dark:text-[#A89F94] leading-relaxed mb-6 max-w-xl mx-auto">
            Punya beban yang ingin ditaruh sejenak? Curahkan keluh kesah, kegelisahan, atau mintalah sudut pandang.
            Setiap cerita dibaca langsung oleh admin Nalar Nanti, dan kamu bisa menerima surat balasan hangat langsung ke emailmu.
          </p>

          {/* Tiga Badge Fitur Penjamin Rasa Nyaman */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-7 text-[11px] sm:text-xs text-[#7A6F64] dark:text-[#A89F94]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-[#1E1B18]/70 border border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8E9B8E]" />
              <span>Boleh Anonim</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-[#1E1B18]/70 border border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <Mail className="w-3.5 h-3.5 text-[#886950] dark:text-[#C8A98E]" />
              <span>Balasan ke Email (Opsional)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 dark:bg-[#1E1B18]/70 border border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
              <span>100% Privat</span>
            </span>
          </div>

          {/* Tombol Utama Menuju Halaman Ruang Cerita */}
          <div>
            <Link
              href="/ruang-cerita"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:brightness-105 transition-all duration-300 shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 active:scale-95 group"
            >
              <span>Mulai Bercerita</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

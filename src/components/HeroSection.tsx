"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowDown, Feather, Heart } from "lucide-react";

export default function HeroSection() {
  const [breathingPhase, setBreathingPhase] = useState<"Tarik" | "Tahan" | "Hembuskan">("Tarik");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (breathingPhase === "Tarik") {
          setBreathingPhase("Tahan");
          return 4;
        } else if (breathingPhase === "Tahan") {
          setBreathingPhase("Hembuskan");
          return 6;
        } else {
          setBreathingPhase("Tarik");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive, breathingPhase]);

  return (
    <section
      id="beranda"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-[#FAF7F2]"
    >
      {/* Subtle organic background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#F3EDE2] rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#8E9B8E]/10 rounded-full blur-2xl opacity-60 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Soft Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3EDE2] border border-[#E5DDD0] text-xs font-medium text-[#7A6F64] mb-8 shadow-soft">
          <span className="w-2 h-2 rounded-full bg-[#8E9B8E] animate-pulse" />
          <span>Ruang Teduh untuk Berpikir &amp; Merasa</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#3E362E] max-w-3xl mx-auto leading-[1.25] sm:leading-[1.2] mb-6">
          Ketika dunia terasa tergesa, beri jeda untuk{" "}
          <span className="italic font-normal text-[#C8A98E] underline decoration-[#E5DDD0] underline-offset-8">
            nalar dan rasa
          </span>
          .
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-base sm:text-lg text-[#7A6F64] max-w-2xl mx-auto leading-relaxed mb-10">
          Selamat datang di <strong className="text-[#3E362E] font-medium">Nalar Nanti</strong>. 
          Sebuah tempat singgah dari bisingnya hari. Menemukan hening, merawat penerimaan, 
          dan mengingat bahwa tidak semua hal harus selesai seketika.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#pengingat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-medium text-sm hover:bg-[#B9967A] transition-all shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
            <span>Buka Pengingat Acak</span>
          </a>

          <a
            href="#kutipan"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#F3EDE2] text-[#3E362E] border border-[#E5DDD0] font-medium text-sm hover:border-[#C8A98E] hover:bg-[#EAE2D5] transition-all"
          >
            <Feather className="w-4 h-4 text-[#7A6F64]" />
            <span>Telusuri Kutipan</span>
          </a>
        </div>

        {/* Interactive Breathing Micro-feature */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft text-left transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#FAF7F2] text-[#8E9B8E] border border-[#E5DDD0]">
                <Heart className="w-4 h-4" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#7A6F64] font-semibold">
                  Jeda Sejenak
                </p>
                <h3 className="font-serif text-sm font-semibold text-[#3E362E]">
                  Latihan Napas 4-4-6
                </h3>
              </div>
            </div>

            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-[#E5DDD0] bg-[#FAF7F2] hover:bg-[#C8A98E] hover:text-[#FAF7F2] hover:border-[#C8A98E] transition-all"
            >
              {isBreathingActive ? "Hentikan" : "Mulai Napas"}
            </button>
          </div>

          {isBreathingActive ? (
            <div className="text-center py-4 bg-[#FAF7F2] rounded-xl border border-[#E5DDD0]/70">
              <div className="relative inline-flex items-center justify-center w-24 h-24 mb-3">
                <div
                  className={`absolute inset-0 rounded-full bg-[#8E9B8E]/25 transition-all duration-1000 ${
                    breathingPhase === "Tarik"
                      ? "scale-110 bg-[#8E9B8E]/30"
                      : breathingPhase === "Tahan"
                      ? "scale-105 bg-[#C8A98E]/30"
                      : "scale-90 bg-[#8E9B8E]/15"
                  }`}
                />
                <div className="z-10 text-center">
                  <span className="block font-serif text-base font-semibold text-[#3E362E]">
                    {breathingPhase}
                  </span>
                  <span className="text-xs text-[#7A6F64] font-sans">
                    {secondsLeft}s
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#7A6F64] italic">
                {breathingPhase === "Tarik" && "Tarik napas lembut melalui hidung..."}
                {breathingPhase === "Tahan" && "Tahan napas, rasakan kedamaian..."}
                {breathingPhase === "Hembuskan" && "Lepaskan perlahan melalui mulut..."}
              </p>
            </div>
          ) : (
            <p className="text-xs text-[#7A6F64] leading-relaxed">
              Duduk dengan nyaman, letakkan gawai jika perlu, dan luangkan satu menit untuk menyelaraskan kembali degup napasmu.
            </p>
          )}
        </div>
      </div>

      <div className="text-center mt-12 text-[#7A6F64]">
        <a
          href="#kutipan"
          aria-label="Gulir ke bagian kutipan"
          className="inline-flex items-center justify-center p-2 rounded-full hover:bg-[#F3EDE2] transition-colors"
        >
          <ArrowDown className="w-4 h-4 animate-bounce text-[#7A6F64]" />
        </a>
      </div>
    </section>
  );
}

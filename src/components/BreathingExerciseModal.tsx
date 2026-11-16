"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Play, Pause, RotateCcw, Wind, Sparkles, Heart } from "lucide-react";

interface BreathingExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BreathPhase = "tarik" | "tahan" | "hembus";

const PHASE_CONFIG: Record<
  BreathPhase,
  { label: string; instruction: string; color: string; scale: string }
> = {
  tarik: {
    label: "Tarik Napas",
    instruction: "Tarik napas perlahan lewat hidung, rasakan rongga dadamu mengembang...",
    color: "#8E9B8E", // Sage calm
    scale: "scale-125",
  },
  tahan: {
    label: "Tahan Napas",
    instruction: "Tahan dengan tenang dan rileks, nikmati jeda hening ini...",
    color: "#C8A98E", // Warm Terracotta
    scale: "scale-125",
  },
  hembus: {
    label: "Hembuskan",
    instruction: "Hembuskan perlahan lewat bibir, lepaskan semua beban dan ketegangan...",
    color: "#B9967A", // Soft Earth
    scale: "scale-90",
  },
};

export default function BreathingExerciseModal({
  isOpen,
  onClose,
}: BreathingExerciseModalProps) {
  const [phase, setPhase] = useState<BreathPhase>("tarik");
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [completedCycles, setCompletedCycles] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Kunci scroll body saat modal aktif & dengarkan tombol ESC
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsActive(true);
      setPhase("tarik");
      setSecondsLeft(4);
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Siklus hitung mundur 4-4-4 detik
  useEffect(() => {
    if (!isOpen || !isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transisi fase saat detik mencapai 0
        setPhase((currentPhase) => {
          if (currentPhase === "tarik") {
            return "tahan";
          } else if (currentPhase === "tahan") {
            return "hembus";
          } else {
            // Selesai satu siklus penuh 4-4-4
            setCompletedCycles((c) => c + 1);
            return "tarik";
          }
        });

        return 4; // Reset ke 4 detik untuk fase berikutnya
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isActive]);

  const handleReset = () => {
    setPhase("tarik");
    setSecondsLeft(4);
    setIsActive(true);
  };

  if (!isOpen) return null;

  const currentCfg = PHASE_CONFIG[phase];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="breathing-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3E362E]/60 dark:bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_-15px_rgba(200,169,142,0.30)] dark:shadow-none text-center overflow-hidden"
      >
        {/* Tombol Tutup Silang */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup jendela latihan napas"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:border-[#C8A98E] flex items-center justify-center transition-all active:scale-95 shadow-soft z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Badge Header */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 shadow-soft">
          <Wind className="w-3.5 h-3.5 text-[#8E9B8E]" />
          <span>Latihan Napas 4-4-4</span>
        </div>

        <h2
          id="breathing-modal-title"
          className="font-serif text-xl sm:text-2xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-1"
        >
          Hening &amp; Bernapas Sejenak
        </h2>

        <p className="font-sans text-xs text-[#7A6F64] dark:text-[#A89F94] mb-6">
          Irama pernapasan lambat untuk meredakan ketegangan dan menenangkan saraf.
        </p>

        {/* Lingkaran Animasi Napas (Breathing Orb) */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto my-4 flex items-center justify-center select-none">
          {/* Cincin Luar Berdenyut */}
          <div
            className={`absolute inset-0 rounded-full transition-all duration-1000 ease-in-out opacity-25 ${
              phase === "tarik"
                ? "scale-110 bg-[#8E9B8E]"
                : phase === "tahan"
                ? "scale-110 bg-[#C8A98E]"
                : "scale-90 bg-[#B9967A]"
            }`}
          />

          {/* Lingkaran Utama */}
          <div
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-white/60 dark:border-white/10 shadow-[0_12px_36px_-8px_rgba(200,169,142,0.35)] dark:shadow-none flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
              phase === "tarik"
                ? "scale-110 bg-gradient-to-br from-[#E8EFE8] to-[#D5E2D5] dark:from-[#263228] dark:to-[#1E2620]"
                : phase === "tahan"
                ? "scale-110 bg-gradient-to-br from-[#FAF0E4] to-[#F2E0CD] dark:from-[#352B24] dark:to-[#26201B]"
                : "scale-90 bg-gradient-to-br from-[#F5EBE1] to-[#EAD8C7] dark:from-[#2B231D] dark:to-[#1F1915]"
            }`}
          >
            <span className="font-serif font-bold text-3xl sm:text-4xl text-[#3E362E] dark:text-[#EDE6DC] leading-none mb-1">
              {secondsLeft}
            </span>
            <span className="font-sans font-semibold text-xs sm:text-sm tracking-wide text-[#886950] dark:text-[#C8A98E] uppercase">
              {currentCfg.label}
            </span>
          </div>
        </div>

        {/* Kalimat Panduan Fase */}
        <p className="font-serif italic text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] min-h-[38px] px-4 leading-relaxed transition-all">
          “{currentCfg.instruction}”
        </p>

        {/* Kontrol Interaktif: Jeda, Lanjut, Ulang */}
        <div className="mt-6 pt-4 border-t border-[#E5DDD0]/70 dark:border-[#3A332E] flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs hover:brightness-105 active:scale-95 transition-all shadow-soft"
          >
            {isActive ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Jeda</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Lanjutkan</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            title="Mulai ulang latihan napas"
            className="w-9 h-9 rounded-full bg-white/80 dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] flex items-center justify-center active:scale-95 transition-all shadow-soft"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Penghitung Siklus yang Berhasil Dilalui */}
        <div className="mt-3 text-[11px] text-[#7A6F64]/80 dark:text-[#A89F94]/80">
          {completedCycles > 0 ? (
            <span className="inline-flex items-center gap-1 text-[#8E9B8E] font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Sudah menyelesaikan {completedCycles} siklus napas tenang</span>
            </span>
          ) : (
            <span>Siklus 4 detik tarik, 4 detik tahan, 4 detik hembuskan</span>
          )}
        </div>
      </div>
    </div>
  );
}

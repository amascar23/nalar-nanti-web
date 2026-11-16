"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Share2,
  X,
  RefreshCw,
  Smartphone,
  Check,
  Copy,
  Heart,
  Feather,
} from "lucide-react";
import { JAR_QUOTES, JarQuoteItem } from "@/data/jarQuotes";
import { getShareBaseUrl } from "@/lib/constants";

// Data 15 gulungan kertas mini di dalam perut toples
interface MiniScrollData {
  id: number;
  cx: number;
  cy: number;
  angle: number;
  colorType: "terracotta" | "sage" | "gold";
}

const MINI_SCROLLS: MiniScrollData[] = [
  // Lapisan Bawah (dasar toples)
  { id: 1, cx: 95, cy: 326, angle: -14, colorType: "terracotta" },
  { id: 2, cx: 138, cy: 334, angle: 7, colorType: "sage" },
  { id: 3, cx: 182, cy: 332, angle: -9, colorType: "gold" },
  { id: 4, cx: 226, cy: 324, angle: 16, colorType: "terracotta" },

  // Lapisan Kedua
  { id: 5, cx: 82, cy: 298, angle: 24, colorType: "sage" },
  { id: 6, cx: 124, cy: 302, angle: -18, colorType: "gold" },
  { id: 7, cx: 168, cy: 300, angle: 11, colorType: "terracotta" },
  { id: 8, cx: 216, cy: 294, angle: -22, colorType: "sage" },

  // Lapisan Ketiga
  { id: 9, cx: 96, cy: 268, angle: -19, colorType: "gold" },
  { id: 10, cx: 140, cy: 270, angle: 15, colorType: "terracotta" },
  { id: 11, cx: 184, cy: 266, angle: -11, colorType: "sage" },
  { id: 12, cx: 228, cy: 262, angle: 25, colorType: "gold" },

  // Lapisan Atas
  { id: 13, cx: 122, cy: 236, angle: -7, colorType: "terracotta" },
  { id: 14, cx: 164, cy: 238, angle: 17, colorType: "sage" },
  { id: 15, cx: 198, cy: 234, angle: -21, colorType: "gold" },
];

export default function NalarJarSection() {
  const [activeQuote, setActiveQuote] = useState<JarQuoteItem | null>(null);
  const [viewedQuoteIds, setViewedQuoteIds] = useState<number[]>([]);
  const [isOpeningLetter, setIsOpeningLetter] = useState<boolean>(false);
  const [isLaunchingScroll, setIsLaunchingScroll] = useState<boolean>(false);
  const [isJarShaking, setIsJarShaking] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Status sensor goyang (Shake detector)
  const [supportsShake, setSupportsShake] = useState<boolean>(false);
  const [needsIosPermission, setNeedsIosPermission] = useState<boolean>(false);
  const [isShakeEnabled, setIsShakeEnabled] = useState<boolean>(false);

  const lastShakeTimeRef = useRef<number>(0);
  const lastAccRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

  // Fungsi mengacak kutipan eksklusif tanpa mengulang sebelum 24 kutipan habis
  const drawNextQuote = useCallback(() => {
    if (isLaunchingScroll || isOpeningLetter) return;

    // Animasi goyang toples & peluncuran gulungan
    setIsJarShaking(true);
    setIsLaunchingScroll(true);

    setTimeout(() => {
      setIsJarShaking(false);
    }, 450);

    setTimeout(() => {
      // Tentukan kutipan yang belum terbaca
      let pool = JAR_QUOTES.filter((q) => !viewedQuoteIds.includes(q.id));
      let updatedViewed = [...viewedQuoteIds];

      if (pool.length === 0) {
        // Reset jika semua 24 sudah dibaca
        pool = JAR_QUOTES;
        updatedViewed = [];
      }

      const randomIndex = Math.floor(Math.random() * pool.length);
      const selected = pool[randomIndex];

      setViewedQuoteIds([...updatedViewed, selected.id]);
      setActiveQuote(selected);
      setIsLaunchingScroll(false);
      setIsOpeningLetter(true);
    }, 650);
  }, [isLaunchingScroll, isOpeningLetter, viewedQuoteIds]);

  // Handler goyangan perangkat (Shake detection)
  const handleDeviceMotion = useCallback(
    (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x === null || acc.y === null || acc.z === null) return;

      const now = Date.now();
      if (now - lastShakeTimeRef.current < 1500) return; // Cooldown 1.5 detik

      const deltaX = Math.abs(acc.x - lastAccRef.current.x);
      const deltaY = Math.abs(acc.y - lastAccRef.current.y);
      const deltaZ = Math.abs(acc.z - lastAccRef.current.z);

      lastAccRef.current = { x: acc.x, y: acc.y, z: acc.z };

      // Ambang batas goyangan
      if ((deltaX > 15 && deltaY > 15) || (deltaX > 20 || deltaY > 20 || deltaZ > 20)) {
        lastShakeTimeRef.current = now;
        drawNextQuote();
      }
    },
    [drawNextQuote]
  );

  // Inisialisasi pendeteksi goyangan pada perangkat mobile
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("DeviceMotionEvent" in window) {
      setSupportsShake(true);
      const deviceMotion = window.DeviceMotionEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };

      if (typeof deviceMotion?.requestPermission === "function") {
        setNeedsIosPermission(true);
      } else {
        // Android / non-iOS: langsung dengarkan motion
        window.addEventListener("devicemotion", handleDeviceMotion);
        setIsShakeEnabled(true);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("devicemotion", handleDeviceMotion);
      }
    };
  }, [handleDeviceMotion]);

  // Minta izin sensor gerak untuk iOS 13+
  const requestIosShakePermission = async () => {
    try {
      const deviceMotion = window.DeviceMotionEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied">;
      };
      if (typeof deviceMotion?.requestPermission === "function") {
        const permissionState = await deviceMotion.requestPermission();
        if (permissionState === "granted") {
          window.addEventListener("devicemotion", handleDeviceMotion);
          setIsShakeEnabled(true);
          setNeedsIosPermission(false);
        }
      }
    } catch (err) {
      console.warn("Sensor goyang ditolak/tidak tersedia:", err);
    }
  };

  // Kunci scroll body saat modal surat terbuka & dengarkan tombol ESC
  useEffect(() => {
    if (isOpeningLetter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpeningLetter(false);
      }
    };

    if (isOpeningLetter) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpeningLetter]);

  // Salin teks surat ke clipboard
  const handleCopyLetter = () => {
    if (!activeQuote) return;
    const textToCopy = `📜 “${activeQuote.quote}”\n\n💌 Catatan Kecil: ${activeQuote.encouragement}\n\n— Toples Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Bagikan ke WhatsApp
  const handleShareWhatsApp = () => {
    if (!activeQuote) return;
    const origin = getShareBaseUrl();
    const message =
      `📜 *Toples Nalar — ${activeQuote.tag}*\n\n` +
      `“${activeQuote.quote}”\n\n` +
      `💌 *Catatan Kecil Untukmu:*\n${activeQuote.encouragement}\n\n` +
      `— Ambil gulungan pesanmu sendiri di:\n${origin}/#toples-nalar`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="toples-nalar"
      className="py-10 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E5DDD0]/60 dark:border-[#3A332E]/60 relative overflow-hidden"
    >
      {/* Header Bagian Toples Nalar */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 shadow-soft">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
          <span>24 Gulungan Pesan Kebaikan</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-2.5">
          Toples Nalar
        </h2>

        <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed max-w-md mx-auto">
          Di dalam toples kaca ini tersimpan gulungan kertas berpita yang siap menenangkan langkahmu. Ketuk toples atau goyangkan ponselmu untuk mengambil satu pesan.
        </p>
      </div>

      {/* Kontainer Interaktif Toples Kaca */}
      <div className="max-w-md mx-auto text-center flex flex-col items-center">
        {/* Area Ilustrasi Toples SVG */}
        <div
          onClick={drawNextQuote}
          role="button"
          tabIndex={0}
          aria-label="Ketuk toples untuk mengambil satu gulungan kertas nalar"
          onKeyDown={(e) => e.key === "Enter" && drawNextQuote()}
          className={`relative cursor-pointer select-none transition-transform duration-300 focus:outline-none group ${
            isJarShaking ? "animate-[jarWiggle_0.4s_ease-in-out_infinite]" : "hover:scale-[1.02] active:scale-95"
          }`}
        >
          {/* Efek Kilau / Cahaya Aura Hangat di Belakang Toples */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,142,0.22)_0%,transparent_70%)] rounded-full blur-2xl pointer-events-none" />

          {/* Animasi Gulungan Kertas yang Meluncur Naik Saat Diklik */}
          {isLaunchingScroll && (
            <div className="absolute left-1/2 -top-8 -translate-x-1/2 z-30 pointer-events-none animate-[launchScroll_0.65s_cubic-bezier(0.2,0.8,0.2,1)_forwards]">
              <div className="w-20 h-6 rounded-full bg-gradient-to-r from-[#FFFDF9] via-[#F7ECDA] to-[#E8D4B7] border border-[#DFC9A6] shadow-lg flex items-center justify-center relative rotate-[-12deg]">
                <div className="w-3.5 h-full bg-[#C86D5B] rounded-xs shadow-xs" />
                <span className="text-[9px] text-[#A85242] absolute">✦</span>
              </div>
            </div>
          )}

          {/* SVG Custom Toples Kaca Berkualitas Tinggi (320 x 380) */}
          <svg
            viewBox="0 0 320 380"
            className="w-64 sm:w-72 h-auto drop-shadow-[0_16px_30px_rgba(184,149,110,0.22)] dark:drop-shadow-[0_16px_30px_rgba(0,0,0,0.5)] transition-all"
          >
            <defs>
              {/* Gradasi Tutup Gabus Kayu */}
              <linearGradient id="corkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DFBA8E" />
                <stop offset="50%" stopColor="#C39A6A" />
                <stop offset="100%" stopColor="#9C7345" />
              </linearGradient>

              {/* Gradasi Dinding Kaca Toples */}
              <linearGradient id="glassWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.15" />
                <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
              </linearGradient>

              {/* Pantulan Cahaya Lengkung Kiri Kaca */}
              <linearGradient id="glassHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>

              {/* Gradasi Gulungan Kertas Cream */}
              <linearGradient id="scrollPaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFDF9" />
                <stop offset="40%" stopColor="#F9F0DF" />
                <stop offset="100%" stopColor="#EAD8BE" />
              </linearGradient>

              {/* Bayangan Gulungan */}
              <filter id="scrollShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#8B6C4F" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* 1. Dinding Belakang Kaca Transparan */}
            <path
              d="M 115 80 Q 50 120 46 160 L 46 320 Q 50 355 160 358 Q 270 355 274 320 L 274 160 Q 270 120 205 80 Z"
              fill="rgba(255, 253, 248, 0.25)"
              stroke="rgba(229, 221, 208, 0.75)"
              strokeWidth="2.5"
            />

            {/* 2. Isi Perut Toples: 15 Gulungan Kertas Cream Berpita Tertumpuk Alami */}
            <g id="mini-scrolls-pile">
              {MINI_SCROLLS.map((scroll) => {
                const ribbonColor =
                  scroll.colorType === "terracotta"
                    ? "#C86D5B"
                    : scroll.colorType === "sage"
                    ? "#8FA38A"
                    : "#D4AF7A";

                const knotColor =
                  scroll.colorType === "terracotta"
                    ? "#B05543"
                    : scroll.colorType === "sage"
                    ? "#74886F"
                    : "#B8935C";

                return (
                  <g
                    key={scroll.id}
                    transform={`translate(${scroll.cx}, ${scroll.cy}) rotate(${scroll.angle})`}
                    filter="url(#scrollShadow)"
                    className="transition-transform duration-300 hover:scale-105"
                  >
                    {/* Badan Silinder Gulungan Kertas */}
                    <rect
                      x="-22"
                      y="-7"
                      width="44"
                      height="14"
                      rx="4"
                      fill="url(#scrollPaperGrad)"
                      stroke="#DEC9AB"
                      strokeWidth="0.8"
                    />

                    {/* Spiral Lekukan Gulungan Kertas di Ujung Kiri */}
                    <ellipse cx="-20" cy="0" rx="2" ry="5.5" fill="#E2CFB4" stroke="#CBB496" strokeWidth="0.6" />
                    <circle cx="-20" cy="0" r="1" fill="#FFFDF9" />

                    {/* Spiral Lekukan Gulungan Kertas di Ujung Kanan */}
                    <ellipse cx="20" cy="0" rx="2" ry="5.5" fill="#FAF1E0" stroke="#CBB496" strokeWidth="0.6" />

                    {/* Pita Pengikat di Bagian Tengah */}
                    <rect x="-3" y="-7" width="6" height="14" rx="1" fill={ribbonColor} />

                    {/* Simpul Pita / Segel Lilin Mini di Tengah */}
                    <circle cx="0" cy="0" r="2.5" fill={knotColor} />
                    <circle cx="-0.6" cy="-0.6" r="0.8" fill="#FFFFFF" opacity="0.6" />
                  </g>
                );
              })}
            </g>

            {/* 3. Dinding Depan Kaca dengan Pantulan Glare */}
            <path
              d="M 115 80 Q 50 120 46 160 L 46 320 Q 50 355 160 358 Q 270 355 274 320 L 274 160 Q 270 120 205 80 Z"
              fill="url(#glassWallGrad)"
              stroke="rgba(229, 221, 208, 0.9)"
              strokeWidth="2.5"
            />

            {/* Pantulan Cahaya Melengkung di Sisi Kiri Kaca */}
            <path
              d="M 60 160 Q 56 240 68 310"
              fill="none"
              stroke="url(#glassHighlight)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <path
              d="M 72 165 Q 68 220 76 280"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Pantulan Cahaya Tipis di Sisi Kanan Kaca */}
            <path
              d="M 260 170 Q 264 240 256 300"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.25"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Dasar Toples Kaca (Bibir Bawah Tebal) */}
            <ellipse
              cx="160"
              cy="348"
              rx="98"
              ry="11"
              fill="none"
              stroke="rgba(229, 221, 208, 0.8)"
              strokeWidth="2"
            />

            {/* 4. Leher Kaca Toples */}
            <rect
              x="114"
              y="62"
              width="92"
              height="20"
              rx="3"
              fill="rgba(255, 255, 255, 0.4)"
              stroke="#DEC9AB"
              strokeWidth="2"
            />
            {/* Bibir Kaca Leher */}
            <ellipse
              cx="160"
              cy="62"
              rx="46"
              ry="7"
              fill="rgba(255, 255, 255, 0.5)"
              stroke="#DEC9AB"
              strokeWidth="2"
            />

            {/* 5. Tutup Gabus Kayu Bertekstur */}
            <path
              d="M 119 62 L 122 36 Q 160 30 198 36 L 201 62 Z"
              fill="url(#corkGrad)"
              stroke="#9C7345"
              strokeWidth="1.5"
            />
            <ellipse cx="160" cy="36" rx="38" ry="6.5" fill="#E8C59B" stroke="#9C7345" strokeWidth="1" />
            {/* Tekstur Bintik Gabus */}
            <circle cx="145" cy="46" r="1.2" fill="#845D35" opacity="0.4" />
            <circle cx="172" cy="50" r="1.5" fill="#845D35" opacity="0.4" />
            <circle cx="160" cy="44" r="1" fill="#845D35" opacity="0.3" />

            {/* 6. Lilitan Tali Rami di Leher Toples & Pita Simpul */}
            <ellipse cx="160" cy="72" rx="46.5" ry="5.5" fill="none" stroke="#C2A176" strokeWidth="3" />
            <ellipse cx="160" cy="74.5" rx="46.5" ry="5.5" fill="none" stroke="#9F7E53" strokeWidth="2.5" />

            {/* Simpul Pita Tali Rami di Sisi Kiri */}
            <g transform="translate(118, 74)">
              <circle cx="0" cy="0" r="3" fill="#A88255" />
              <path d="M 0 0 C -10 -6, -14 4, 0 1" fill="none" stroke="#C2A176" strokeWidth="2" />
              <path d="M 0 0 C -6 10, -12 12, -8 18" fill="none" stroke="#9F7E53" strokeWidth="1.8" />
              <path d="M 0 0 C -3 8, -6 16, -2 22" fill="none" stroke="#C2A176" strokeWidth="1.8" />
            </g>

            {/* 7. Label Kertas Gantung "Toples Nalar" */}
            <g transform="translate(108, 96) rotate(-8)">
              {/* Benang Penggantung Label */}
              <line x1="10" y1="-22" x2="16" y2="0" stroke="#B08D5F" strokeWidth="1.5" strokeDasharray="2,2" />
              {/* Kertas Label */}
              <rect
                x="0"
                y="0"
                width="84"
                height="34"
                rx="6"
                fill="#FFFDF8"
                stroke="#D8C3A5"
                strokeWidth="1.2"
                filter="url(#scrollShadow)"
              />
              {/* Lubang Mata Itik Label */}
              <circle cx="12" cy="17" r="3" fill="#F0E3D0" stroke="#B08D5F" strokeWidth="1" />
              {/* Teks Label */}
              <text
                x="48"
                y="18"
                textAnchor="middle"
                fontSize="9.5"
                fontFamily="serif"
                fontWeight="bold"
                fill="#5E4C3D"
                letterSpacing="0.5"
              >
                Toples Nalar
              </text>
              <text x="48" y="27" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fill="#A48970">
                24 Pesan Kebaikan
              </text>
            </g>

            {/* 8. Partikel Bintang Emas Berkilau Halus di Luar Toples */}
            <text x="50" y="110" fontSize="13" fill="#D4AF7A" opacity="0.8" className="animate-pulse">
              ✦
            </text>
            <text x="265" y="140" fontSize="15" fill="#D4AF7A" opacity="0.75" className="animate-pulse">
              ✦
            </text>
            <text x="245" y="320" fontSize="11" fill="#D4AF7A" opacity="0.6">
              ✦
            </text>
          </svg>
        </div>

        {/* Tombol Utama & Keterangan Sensor Goyang */}
        <div className="mt-5 sm:mt-6 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={drawNextQuote}
            disabled={isLaunchingScroll || isOpeningLetter}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-9 sm:py-4 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:brightness-105 transition-all duration-300 shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-70 group"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Ambil Satu Gulungan</span>
          </button>

          {/* Indikator Status Goyang & Tombol Izin iOS */}
          {supportsShake && (
            <div className="text-[11px] text-[#7A6F64] dark:text-[#A89F94] flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#C8A98E] animate-bounce" />
              {needsIosPermission && !isShakeEnabled ? (
                <button
                  type="button"
                  onClick={requestIosShakePermission}
                  className="text-[#886950] dark:text-[#C8A98E] underline font-medium hover:text-[#3E362E]"
                >
                  Aktifkan Sensor Goyang HP
                </button>
              ) : (
                <span>Atau goyangkan ponselmu untuk mengambil pesan</span>
              )}
            </div>
          )}

          <span className="text-[11px] text-[#7A6F64]/70 dark:text-[#A89F94]/70">
            {viewedQuoteIds.length > 0
              ? `Sudah dibuka ${viewedQuoteIds.length} dari 24 gulungan`
              : "Ketuk toples kapan pun kamu membutuhkan jeda"}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL SURAT ESTETIK SAAT GULUNGAN DIBUKA (UNROLLED VINTAGE LETTER) */}
      {/* ========================================================================= */}
      {isOpeningLetter && activeQuote && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Surat Gulungan Toples Nalar"
          className="fixed inset-0 z-50 bg-[#3E362E]/60 dark:bg-black/75 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-6 animate-fadeIn overflow-y-auto"
          onClick={() => setIsOpeningLetter(false)}
        >
          {/* Kontainer Lembar Surat Vintage Bertekstur */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg my-auto animate-[letterUnroll_0.45s_cubic-bezier(0.16,1,0.3,1)_forwards]"
          >
            {/* Tombol Tutup Silang di Luar Surat Kanan Atas */}
            <button
              type="button"
              onClick={() => setIsOpeningLetter(false)}
              aria-label="Tutup gulungan surat"
              className="absolute -top-11 right-0 sm:-right-2 w-8 h-8 rounded-full bg-white/80 dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:scale-105 active:scale-95 flex items-center justify-center shadow-md transition-all z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 1. GULUNGAN 3D ATAS (TOP CYLINDER ROLL) */}
            <div className="relative h-5 sm:h-6 -mx-1 sm:-mx-2 rounded-full bg-gradient-to-r from-[#DFC9A6] via-[#FFFDF8] to-[#D4BC96] border-y border-[#CBB496] shadow-[0_4px_10px_rgba(184,149,110,0.35)] flex items-center justify-between px-3 overflow-hidden z-10">
              <div className="w-3 h-full rounded-full bg-gradient-to-r from-[#B99F7A] to-[#DFC9A6] opacity-70" />
              <div className="w-3 h-full rounded-full bg-gradient-to-l from-[#B99F7A] to-[#DFC9A6] opacity-70" />
            </div>

            {/* 2. LEMBARAN KERTAS SURAT (BODY PARCHMENT) */}
            <div className="relative bg-gradient-to-b from-[#FCF8F0] via-[#FAF3E5] to-[#F5EAD6] text-[#3E362E] shadow-[0_20px_50px_-15px_rgba(184,149,110,0.35)] border-x border-[#DEC9AB] px-4 py-6 sm:px-8 sm:py-8 overflow-hidden">
              {/* Efek Garis Serat Kertas Lembut */}
              <div className="absolute inset-0 bg-[radial-gradient(#D5BF9E_0.75px,transparent_0.75px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

              {/* Ornamen Garis Bingkai Ganda Klasik */}
              <div className="relative border border-[#D5BF9E]/75 rounded-2xl p-4 sm:p-7 bg-[#FFFDF9]/60 backdrop-blur-[1px]">
                {/* Watermark Ornamen Daun Kering di Sudut Atas */}
                <div className="absolute top-2 left-2 text-[#C8A98E]/20 pointer-events-none select-none">
                  <Feather className="w-7 h-7 rotate-45" />
                </div>
                <div className="absolute top-2 right-2 text-[#C8A98E]/20 pointer-events-none select-none">
                  <Feather className="w-7 h-7 -rotate-45" />
                </div>

                {/* Header Surat: Tag Lencana & Pembatas Puitis */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8FA38A]/15 border border-[#8FA38A]/35 text-[#4E6649] text-xs font-semibold tracking-wide shadow-2xs mb-2">
                    <Heart className="w-3 h-3 text-[#C86D5B] fill-[#C86D5B]" />
                    <span>{activeQuote.tag}</span>
                  </div>

                  <div className="text-[11px] text-[#A8876E] tracking-widest font-serif block select-none">
                    ─── ✦ ───
                  </div>

                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#A48970] mt-1 block">
                    Gulungan #{activeQuote.id} dari 24 Toples Nalar
                  </span>
                </div>

                {/* Teks Kutipan Utama dengan Font Serif Anggun */}
                <div className="relative my-4 sm:my-6 px-1 sm:px-3 text-center">
                  <p className="font-serif italic text-sm sm:text-base md:text-lg leading-[1.8] sm:leading-[1.9] text-[#3E362E] font-medium">
                    “{activeQuote.quote}”
                  </p>
                </div>

                {/* Kotak Catatan Kecil Untukmu (Encouragement Box) */}
                <div className="my-4 p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#FAF3E5] to-[#F3E7D3] border border-[#E0D0B8] text-left relative shadow-xs">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#886950] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#C86D5B]" />
                    <span>Catatan Kecil Untukmu:</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#6E5D4F] leading-relaxed">
                    {activeQuote.encouragement}
                  </p>
                </div>

                {/* Footer Surat: Segel Lilin Mini (*Wax Seal*) & Identitas Nalar Nanti */}
                <div className="pt-3 mt-3 border-t border-[#DEC9AB]/60 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {/* Cap Segel Lilin Mungil Bertema Terracotta */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#D97D6B] via-[#C86D5B] to-[#9E4737] shadow-md border border-[#F2C0B5]/50 flex items-center justify-center text-[#FFFDF8] shrink-0">
                      <span className="font-serif font-bold text-xs tracking-tighter">NN</span>
                    </div>
                    <div>
                      <span className="font-serif italic font-semibold text-xs text-[#3E362E] block leading-tight">
                        Nalar Nanti
                      </span>
                      <span className="text-[10px] font-sans text-[#8A7663] block">
                        Ruang Teduh untuk Berpikir & Merasa
                      </span>
                    </div>
                  </div>

                  {/* Tombol Salin Surat Cepat */}
                  <button
                    type="button"
                    onClick={handleCopyLetter}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF3E5] hover:bg-[#F3E7D3] border border-[#DEC9AB] text-[11px] font-medium text-[#7A6F64] hover:text-[#3E362E] transition-all active:scale-95 shadow-2xs"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-[#8E9B8E]" />
                        <span className="text-[#8E9B8E]">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* 3. GULUNGAN 3D BAWAH (BOTTOM CYLINDER ROLL) */}
            <div className="relative h-5 sm:h-6 -mx-1 sm:-mx-2 rounded-full bg-gradient-to-r from-[#DFC9A6] via-[#FFFDF8] to-[#D4BC96] border-y border-[#CBB496] shadow-[0_8px_16px_rgba(184,149,110,0.35)] flex items-center justify-between px-3 overflow-hidden z-10">
              <div className="w-3 h-full rounded-full bg-gradient-to-r from-[#B99F7A] to-[#DFC9A6] opacity-70" />
              <div className="w-3 h-full rounded-full bg-gradient-to-l from-[#B99F7A] to-[#DFC9A6] opacity-70" />
            </div>

            {/* Tombol Aksi Pasca Buka: Ambil Lain, Bagikan WhatsApp, Tutup */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpeningLetter(false);
                  setTimeout(() => {
                    drawNextQuote();
                  }, 250);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs shadow-soft hover:brightness-105 active:scale-95 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ambil Gulungan Lain</span>
              </button>

              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/90 dark:bg-[#26221F] border border-[#DEC9AB] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] font-semibold text-xs shadow-soft hover:border-[#8E9B8E] hover:text-[#5F755A] active:scale-95 transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-[#8FA38A]" />
                <span>Bagikan ke WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setIsOpeningLetter(false)}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-xs text-[#FAF7F2] hover:underline transition-colors"
              >
                Tutup Gulungan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

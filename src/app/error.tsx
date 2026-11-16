"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, Sparkles } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error secara aman
    console.error("Terjadi galat pada halaman Nalar Nanti:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F5EFE5] dark:from-[#1C1917] dark:via-[#191614] dark:to-[#141210] text-[#3E362E] dark:text-[#EDE6DC]">
      <div className="max-w-md w-full text-center">
        {/* Ikon Error Berkarakter Teduh */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] shadow-floating flex items-center justify-center text-[#C8A98E]">
          <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5] text-[#C8A98E]" />
        </div>

        {/* Badge Pengantar */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 shadow-soft">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
          <span>Jeda Sejenak</span>
        </div>

        {/* Judul Utama */}
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-3">
          Terjadi Jeda yang Tak Terduga
        </h1>

        {/* Pesan Penenang */}
        <p className="font-serif italic text-sm sm:text-base text-[#7A6F64] dark:text-[#A89F94] leading-relaxed mb-6">
          “Tarik napas perlahan. Beberapa hal butuh waktu untuk ditata kembali dengan tenang.”
        </p>

        <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed mb-8 max-w-sm mx-auto">
          Sistem kami mengalami sedikit hambatan teknis saat memuat halaman ini. Silakan coba muat ulang atau kembali ke beranda.
        </p>

        {/* Tombol Aksi */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:brightness-105 transition-all shadow-soft active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Halaman</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] font-semibold text-xs sm:text-sm hover:border-[#C8A98E] transition-all shadow-soft active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

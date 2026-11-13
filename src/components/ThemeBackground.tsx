import React from "react";
import Image from "next/image";

/**
 * 🌿 ThemeBackground
 * Menghadirkan tampilan latar belakang Warm Cream (#FAF7F2) yang bersih dan merata
 * dengan watermark gambar logo lingkaran Nalar Nanti tepat di tengah layar (fixed inset-0).
 *
 * Sesuai ketentuan:
 * - Warna dasar halaman: Warm Cream #FAF7F2 bersih & merata
 * - Posisi: fixed inset-0 flex items-center justify-center
 * - Ukuran: w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] dengan object-contain
 * - Transparansi: opacity-[0.08] yang sangat lembut dan menyatu manis (mix-blend-multiply)
 * - Layering: pointer-events-none select-none dan -z-10 agar tidak menghalangi klik
 */
export default function ThemeBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden -z-10 flex items-center justify-center bg-[#FAF7F2]"
    >
      {/* Gambar Logo Lingkaran Nalar Nanti Tepat di Tengah Layar */}
      <div className="relative w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] md:w-[520px] md:h-[520px] opacity-[0.08] mix-blend-multiply">
        <Image
          src="/images/logo.jpg"
          alt="Watermark Logo Nalar Nanti"
          fill
          sizes="(max-width: 640px) 300px, (max-width: 768px) 440px, 520px"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

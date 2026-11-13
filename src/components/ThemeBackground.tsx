import React from "react";
import Image from "next/image";

/**
 * 🌿 ThemeBackground
 * Menghadirkan tampilan latar belakang Warm Cream (#FAF7F2) yang bersih dan merata
 * dengan watermark gambar logo lingkaran Nalar Nanti tepat di tengah layar (fixed inset-0).
 *
 * Menggunakan:
 * - Posisi: fixed inset-0 flex items-center justify-center z-0
 * - Ukuran: w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[640px] lg:h-[640px]
 * - object-cover: memotong margin kosong di kiri-kanan gambar asli sehingga logo lingkaran tampil penuh & presisi di tengah
 * - Opacity: opacity-[0.11] sm:opacity-[0.13] dengan mix-blend-multiply menyatu anggun di atas warna #FAF7F2
 * - Layering: pointer-events-none select-none di layer z-0 (di belakang konten utama relative z-10)
 */
export default function ThemeBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 flex items-center justify-center"
    >
      {/* Gambar Logo Lingkaran Nalar Nanti Tepat di Tengah Layar (HD Lossless) */}
      <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[640px] lg:h-[640px] opacity-[0.12] sm:opacity-[0.14] mix-blend-multiply">
        <Image
          src="/images/logo-hd.png"
          alt="Watermark Logo Nalar Nanti"
          fill
          unoptimized
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}


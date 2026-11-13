import React from "react";
import Image from "next/image";

/**
 * 🌿 ThemeBackground
 * Menghadirkan tema latar belakang artistik untuk Nalar Nanti:
 * - Tekstur halus serat kertas buku (organic paper texture)
 * - Gradasi hangat bernuansa cream, warm parchment, dan soft amber
 * - Watermark motif logo Nalar Nanti (buku, bulan sabit, bunga lili, dan lingkaran estetis)
 *   yang menyatu secara halus ke seluruh penjuru halaman tanpa mengganggu keterbacaan teks.
 */
export default function ThemeBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none overflow-hidden -z-10"
    >
      {/* 1. Base Gradient Canvas (Warm Parchment) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FAF7F2] to-[#F5EFE6]" />

      {/* 2. Tekstur Halus Serat Kertas (SVG Paper Grain) */}
      <div
        className="absolute inset-0 opacity-[0.028] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 240 240' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Ambient Atmospheric Glow Orbs */}
      {/* Glow Hangat Area Atas (Hero) */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[340px] sm:w-[700px] h-[340px] sm:h-[700px] bg-[#F3EDE2] rounded-full blur-3xl opacity-80" />
      <div className="absolute top-48 right-[-100px] sm:right-[-50px] w-72 sm:w-96 h-72 sm:h-96 bg-[#C8A98E]/10 rounded-full blur-3xl" />
      <div className="absolute top-96 left-[-100px] sm:left-[-50px] w-72 sm:w-96 h-72 sm:h-96 bg-[#8E9B8E]/10 rounded-full blur-3xl" />

      {/* Glow Hangat Area Tengah (Koleksi Nalar) */}
      <div className="absolute top-[1600px] right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#C8A98E]/10 rounded-full blur-3xl" />
      <div className="absolute top-[2200px] left-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#8E9B8E]/10 rounded-full blur-3xl" />

      {/* Glow Hangat Area Bawah (Titip Nalar & Tentang) */}
      <div className="absolute top-[3200px] left-1/2 -translate-x-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-[#F3EDE2] rounded-full blur-3xl opacity-75" />

      {/* 4. Watermark Motif Logo Nalar Nanti sebagai Tema Utama Latar Belakang */}

      {/* Watermark 1: Area Hero Atas (Kanan Atas / Membingkai Area Header & Hero) */}
      <div className="absolute top-4 sm:top-8 right-[-100px] sm:right-[-40px] lg:right-[2%] w-[380px] sm:w-[600px] lg:w-[720px] h-[380px] sm:h-[600px] lg:h-[720px] opacity-[0.07] sm:opacity-[0.09] mix-blend-multiply rounded-full overflow-hidden">
        <Image
          src="/images/logo.jpg"
          alt="Latar Belakang Nalar Nanti"
          fill
          sizes="(max-width: 768px) 380px, (max-width: 1200px) 600px, 720px"
          className="object-cover"
          priority
        />
      </div>

      {/* Watermark 2: Area Tengah (Koleksi Nalar & Inspirasi) */}
      <div className="absolute top-[38%] left-[-120px] sm:left-[-60px] lg:left-[1%] w-[340px] sm:w-[540px] lg:w-[640px] h-[340px] sm:h-[540px] lg:h-[640px] opacity-[0.05] sm:opacity-[0.07] mix-blend-multiply rounded-full overflow-hidden transform -rotate-12">
        <Image
          src="/images/logo.jpg"
          alt="Latar Belakang Nalar Nanti"
          fill
          sizes="(max-width: 768px) 340px, (max-width: 1200px) 540px, 640px"
          className="object-cover"
        />
      </div>

      {/* Watermark 3: Area Bawah (Ruang Titip Nalar & Tentang) */}
      <div className="absolute bottom-[200px] right-[-100px] sm:right-[-40px] lg:right-[2%] w-[340px] sm:w-[520px] lg:w-[620px] h-[340px] sm:h-[520px] lg:h-[620px] opacity-[0.05] sm:opacity-[0.07] mix-blend-multiply rounded-full overflow-hidden transform rotate-6">
        <Image
          src="/images/logo.jpg"
          alt="Latar Belakang Nalar Nanti"
          fill
          sizes="(max-width: 768px) 340px, (max-width: 1200px) 520px, 620px"
          className="object-cover"
        />
      </div>
    </div>
  );
}

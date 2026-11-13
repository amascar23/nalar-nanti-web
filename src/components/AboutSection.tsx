"use client";

import React from "react";
import {
  Instagram,
  MessageCircle,
  ExternalLink,
  Heart,
  Feather,
  Compass,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/**
 * 💡 PANDUAN TAUTAN KOMUNITAS:
 * Ubah URL di bawah ini dengan tautan saluran WhatsApp resmi Anda saat sudah siap.
 */
const WA_CHANNEL_URL = "https://whatsapp.com/channel/0029VbBLknC7IUYPlfksIh0Y";
const IG_PROFILE_URL = "https://instagram.com/nalarnanti";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-[#E5DDD0]/70 relative overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#F3EDE2] rounded-full blur-3xl opacity-70 pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#8E9B8E]/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#C8A98E]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* 1. CERITA FILOSOFI "NALAR NANTI" */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Filosofi &amp; Ruang Teduh</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-4">
            Tentang Nalar Nanti &amp; Ruang Terhubung
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#7A6F64] leading-relaxed">
            Sebuah rumah singgah digital untuk merawat akal budi dan keteduhan batin, di tengah dunia yang tak henti menuntut kita untuk selalu lekas.
          </p>
        </div>

        {/* Narrative Box Filosofi */}
        <div className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-3xl p-8 sm:p-12 mb-16 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Kolom Narasi Kiri */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#886950]">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
                <span>Makna di Balik Nama</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3E362E] leading-snug">
                Tidak semua hal harus dipahami <br className="hidden sm:inline" />
                <span className="text-[#C8A98E] italic underline decoration-[#E5DDD0] underline-offset-4">
                  terburu-buru hari ini
                </span>
                .
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#7A6F64] leading-relaxed">
                Di tengah linimasa yang bergerak serba cepat dan menuntut kepastian instan, 
                <strong> Nalar Nanti</strong> hadir sebagai jeda yang ramah. Ada hari-hari di mana isi kepala kita terasa bising dan hati diliputi cemas. Di sanalah kita diingatkan bahwa akal manusia tidak dirancang untuk memikul seluruh beban esok hari sekaligus.
              </p>

              <p className="font-sans text-sm sm:text-base text-[#7A6F64] leading-relaxed">
                Ada hal-hal yang perlu <strong>dinalar perlahan dengan hati yang tenang</strong>, dipeluk dengan <strong>doa yang cukup</strong>, dan dilalui dengan <strong>langkah yang ikhlas</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]/80">
                  <span className="font-serif text-base font-semibold text-[#3E362E] block mb-1">
                    🌿 Nalar
                  </span>
                  <p className="text-xs text-[#7A6F64] leading-relaxed">
                    Kejernihan akal sehat untuk memilah mana yang berada dalam kuasamu dan mana yang sebaiknya dipasrahkan.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]/80">
                  <span className="font-serif text-base font-semibold text-[#3E362E] block mb-1">
                    🕊️ Nanti
                  </span>
                  <p className="text-xs text-[#7A6F64] leading-relaxed">
                    Izin welas asih untuk menunda kepanikan, menghormati proses, dan percaya bahwa setiap bunga memiliki musim mekarnya masing-masing.
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom Refleksi Kanan (Quote Card Estetik) */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-7 shadow-soft relative text-left">
                <Feather className="w-8 h-8 text-[#C8A98E]/40 mb-3" />
                <blockquote className="font-serif italic text-base sm:text-lg text-[#3E362E] leading-relaxed mb-4">
                  “Ketika kamu merasa lelah dan arah jalanmu belum terlihat jelas, jangan memaksakan jawaban. Duduklah sejenak, rapikan napasmu, dan biarkan hatimu beristirahat di pelukan doa.”
                </blockquote>
                <div className="pt-3 border-t border-[#E5DDD0]/70 flex items-center justify-between text-xs text-[#7A6F64]">
                  <span className="font-medium">— Catatan Teduh Nalar Nanti</span>
                  <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DUA KARTU AJAKAN BERGABUNG (COMMUNITY CARDS) */}
        {/* ========================================================================= */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 block">
            Ruang Terhubung
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3E362E] tracking-tight mb-2">
            Mari Bertumbuh &amp; Singgah Bersama
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#7A6F64]">
            Pilih cara yang paling nyaman untuk menghadirkan ketenangan di harimu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {/* ----------------------------------------------------------------------- */}
          {/* KARTU 1: INSTAGRAM (@nalarnanti) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 relative group">
            <div>
              {/* Top Tag & Icon */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5DDD0]/80">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#C8A98E] shadow-soft group-hover:scale-105 transition-transform">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#886950] border border-[#E5DDD0]">
                  Visual &amp; Carousel
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-serif text-2xl font-semibold text-[#3E362E] mb-1">
                Instagram @nalarnanti
              </h4>
              <p className="text-xs text-[#C8A98E] font-medium mb-4">
                Ruang visual kutipan &amp; renungan harian
              </p>

              <p className="font-sans text-sm text-[#7A6F64] leading-relaxed mb-6">
                Ikuti akun Instagram <strong>@nalarnanti</strong> untuk menikmati visual kutipan harian yang estetik, carousel refleksi mendalam, dan tulisan penyejuk yang siap menemani linimasamu setiap petang.
              </p>

              {/* Keunggulan / Fitur */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#3E362E] font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Kutipan visual estetik dan menenangkan di feed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Carousel renungan bertema tawakal, sabar, dan proses hidup</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Ruang berbagi dan saling menguatkan di kolom komentar</span>
                </li>
              </ul>
            </div>

            {/* Tombol CTA Instagram */}
            <a
              href={IG_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#B9967A] transition-all shadow-soft active:scale-95 group/btn"
            >
              <Instagram className="w-4 h-4 text-[#FAF7F2]" />
              <span>Ikuti di Instagram @nalarnanti</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* KARTU 2: SALURAN WHATSAPP (@NalarNanti) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="flex flex-col justify-between p-8 sm:p-9 rounded-3xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 relative group">
            <div>
              {/* Top Tag & Icon */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5DDD0]/80">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#8E9B8E] shadow-soft group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#637063] border border-[#E5DDD0]">
                  Pesan Langsung
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-serif text-2xl font-semibold text-[#3E362E] mb-1">
                Saluran WhatsApp @NalarNanti
              </h4>
              <p className="text-xs text-[#8E9B8E] font-medium mb-4">
                Pengingat teduh langsung di aplikasi WhatsApp-mu
              </p>

              <p className="font-sans text-sm text-[#7A6F64] leading-relaxed mb-6">
                Bergabunglah ke Saluran WhatsApp <strong>@NalarNanti</strong> untuk menerima pesan refleksi singkat dan kutipan penyejuk hati setiap hari. Hening tanpa dering notifikasi berisik, tanpa spam, dan nomor teleponmu tetap terjaga aman.
              </p>

              {/* Keunggulan / Fitur */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#3E362E] font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Satu pesan penenang batin saat memulai atau mengakhiri hari</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>100% privasi terjaga (nomor kontak tidak terlihat anggota lain)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Mudah dibagikan langsung ke status atau keluarga tercinta</span>
                </li>
              </ul>
            </div>

            {/* Tombol CTA WhatsApp */}
            <a
              href={WA_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-full bg-[#8E9B8E] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#7D8C7D] transition-all shadow-soft active:scale-95 group/btn"
            >
              <MessageCircle className="w-4 h-4 text-[#FAF7F2]" />
              <span>Gabung Saluran WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

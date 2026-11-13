"use client";

import React from "react";
import Image from "next/image";
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

const WA_CHANNEL_URL = "https://whatsapp.com/channel/0029VbBLknC7IUYPlfksIh0Y";
const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

export default function AboutSection() {
  return (
    <section
      id="tentang"
      className="py-14 sm:py-20 bg-transparent border-t border-[#E5DDD0]/60 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* ========================================================================= */}
        {/* 1. CERITA FILOSOFI "NALAR NANTI" SEJAK TITIK AWAL */}
        {/* ========================================================================= */}
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Filosofi & Ruang Teduh</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-3">
            Tentang Nalar Nanti & Ruang Terhubung
          </h2>
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] leading-relaxed max-w-xl mx-auto">
            Bermula dari sebuah Titik Awal sederhana untuk Menata Nalar, Merakit Asa—sebuah rumah singgah digital untuk merawat ketenangan hati dan kejernihan pikiran.
          </p>
        </div>

        {/* Narrative Box Filosofi */}
        <div className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 mb-14 sm:mb-16 shadow-soft relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Kolom Narasi Kiri */}
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#886950]">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
                <span>Bermula dari Titik Awal</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3E362E] leading-snug">
                Tidak semua hal harus dipahami <br className="hidden sm:inline" />
                <span className="text-[#C8A98E] italic underline decoration-[#E5DDD0] underline-offset-4">
                  terburu-buru hari ini
                </span>
                .
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#7A6F64] leading-relaxed">
                Perjalanan <strong>Nalar Nanti</strong> bermula dari sebuah <em>Titik Awal</em> sederhana: keberanian untuk berhenti sejenak dari keriuhan dunia, menata isi kepala yang penuh, dan melangkah kembali dengan niat yang jujur.
              </p>

              <p className="font-sans text-sm sm:text-base text-[#7A6F64] leading-relaxed">
                Kami meyakini esensi <strong>Menata Nalar, Merakit Asa</strong>—bahwa ada hal-hal dalam hidup yang tidak perlu dipaksa terjawab hari ini. Ada hal-hal yang perlu <strong>dinalar perlahan dengan hati yang tenang</strong>, dipeluk dengan <strong>doa yang cukup</strong>, dan dilalui dengan <strong>rasa ikhlas</strong>.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]/80">
                  <span className="font-serif text-base font-semibold text-[#3E362E] block mb-1">
                    🌿 Menata Nalar
                  </span>
                  <p className="text-xs text-[#7A6F64] leading-relaxed">
                    Kejernihan akal dan kelapangan hati untuk memilah mana yang berada dalam kuasamu, melepaskan beban yang bukan milikmu, dan bertindak dengan tenang.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0]/80">
                  <span className="font-serif text-base font-semibold text-[#3E362E] block mb-1">
                    🕊️ Merakit Asa
                  </span>
                  <p className="text-xs text-[#7A6F64] leading-relaxed">
                    Harapan baik yang dirawat perlahan lewat doa dan prasangka baik, percaya bahwa ketetapan-Nya selalu mekar pada waktu yang paling tepat.
                  </p>
                </div>
              </div>
            </div>

            {/* Kolom Refleksi Kanan (Quote Postingan Pertama: Titik Awal) */}
            <div className="lg:col-span-5">
              <div className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl p-7 sm:p-8 shadow-soft relative text-left">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5DDD0]/70">
                  <span className="text-[11px] font-semibold text-[#8E9B8E] uppercase tracking-wider">
                    Jejak Awal Nalar Nanti
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAE1D3] text-[#3E362E] border border-[#DDD3C3]">
                    Postingan #1
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-[#E5DDD0] shadow-soft shrink-0 bg-[#FAF7F2]">
                    <Image
                      src="/images/logo-hd.png"
                      alt="Logo Nalar Nanti"
                      width={88}
                      height={88}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-serif text-sm font-semibold text-[#3E362E] block">
                      Nalar Nanti
                    </span>
                    <span className="text-[11px] text-[#8E9B8E] font-medium block">
                      menata nalar, merakit rasa.
                    </span>
                  </div>
                </div>
                <blockquote className="font-serif italic text-base sm:text-lg text-[#3E362E] leading-relaxed mb-4">
                  “Setiap perjalanan panjang selalu dimulai dari satu titik awal yang sederhana: keberanian untuk berhenti sejenak, menata pikiran, dan melangkah dengan niat yang jujur.”
                </blockquote>
                <div className="pt-3 border-t border-[#E5DDD0]/70 flex items-center justify-between text-xs text-[#7A6F64]">
                  <span className="font-medium font-serif italic">— Titik Awal (Nalar Nanti)</span>
                  <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. DUA KARTU KOMUNITAS: INSTAGRAM & SALURAN WHATSAPP */}
        {/* ========================================================================= */}
        <div className="mb-8 text-center max-w-xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8E9B8E] mb-2 block">
            Ruang Terhubung
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3E362E] tracking-tight mb-2">
            Mari Bertumbuh & Singgah Bersama
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#7A6F64]">
            Pilih ruang yang paling nyaman untuk menghadirkan ketenangan di keseharianmu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          {/* ----------------------------------------------------------------------- */}
          {/* KARTU 1: INSTAGRAM (@nalarnanti) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="flex flex-col justify-between p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 relative group">
            <div>
              {/* Top Tag & Icon */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5DDD0]/80">
                <a
                  href={IG_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#C8A98E] shadow-soft group-hover:scale-105 hover:border-[#C8A98E] transition-all"
                  aria-label="Kunjungi profil Instagram @nalarnanti"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#886950] border border-[#E5DDD0]">
                  Visual & Carousel
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-serif text-2xl font-semibold text-[#3E362E] mb-1">
                <a
                  href={IG_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C8A98E] transition-colors"
                >
                  Instagram @nalarnanti
                </a>
              </h4>
              <p className="text-xs text-[#C8A98E] font-medium mb-4">
                Arsip visual desain kartu soft cream & seri kutipan lengkap
              </p>

              <p className="font-sans text-sm text-[#7A6F64] leading-relaxed mb-6">
                Ikuti akun Instagram{" "}
                <a
                  href={IG_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#3E362E] hover:text-[#C8A98E] underline decoration-[#E5DDD0] underline-offset-4 transition-colors"
                >
                  @nalarnanti
                </a>{" "}
                untuk melihat arsip visual desain kartu cream yang estetik, membaca seri carousel kutipan dan renungan dari postingan awal hingga terbaru, serta bertukar cerita di kolom komentar.
              </p>

              {/* Keunggulan / Fitur */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#3E362E] font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Arsip visual desain kartu cream yang tenang dan rapi di feed</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Carousel renungan mendalam bertema ikhlas, sabar, dan bertumbuh</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Ruang saling mendoakan dan menguatkan di kolom komentar</span>
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
              <span>Kunjungi Instagram @nalarnanti</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover/btn:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* ----------------------------------------------------------------------- */}
          {/* KARTU 2: SALURAN WHATSAPP (@NalarNanti) */}
          {/* ----------------------------------------------------------------------- */}
          <div className="flex flex-col justify-between p-6 sm:p-9 rounded-2xl sm:rounded-3xl bg-[#F3EDE2] border border-[#E5DDD0] shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 relative group">
            <div>
              {/* Top Tag & Icon */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E5DDD0]/80">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#8E9B8E] shadow-soft group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-[#FAF7F2] text-[#637063] border border-[#E5DDD0]">
                  Pengingat Langsung
                </span>
              </div>

              {/* Title & Description */}
              <h4 className="font-serif text-2xl font-semibold text-[#3E362E] mb-1">
                Saluran WhatsApp @NalarNanti
              </h4>
              <p className="text-xs text-[#8E9B8E] font-medium mb-4">
                Pengingat harian langsung di notifikasi ponselmu
              </p>

              <p className="font-sans text-sm text-[#7A6F64] leading-relaxed mb-6">
                Bergabunglah ke Saluran WhatsApp <strong>@NalarNanti</strong> untuk menerima satu pesan pengingat penyejuk hati setiap hari langsung di ponselmu. Hening tanpa notifikasi berisik, tanpa spam, dan nomor teleponmu tetap 100% terjaga aman.
              </p>

              {/* Keunggulan / Fitur */}
              <ul className="space-y-2.5 mb-8 text-xs text-[#3E362E] font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Satu pesan penenang batin saat memulai atau mengakhiri hari</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>100% privasi terjaga (nomor telepon tidak terlihat oleh siapapun)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8E9B8E] shrink-0" />
                  <span>Praktis dibagikan ke status WhatsApp atau orang-orang terdekat</span>
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

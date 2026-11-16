import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, Heart, ShieldCheck, LifeBuoy } from "lucide-react";

/**
 * 💡 Tautan media sosial Nalar Nanti
 */
const WA_CHANNEL_URL = "https://whatsapp.com/channel/0029VbBLknC7IUYPlfksIh0Y";
const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#F3EDE2] via-[#EFE8DC] to-[#EAE1D3] dark:from-[#1E1B18] dark:via-[#1A1715] dark:to-[#161412] border-t border-[#E5DDD0] dark:border-[#3A332E] pt-14 sm:pt-20 pb-36 sm:pb-24 lg:pb-28 text-[#7A6F64] dark:text-[#A89F94]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Info & Socials */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#E5DDD0] dark:border-[#3A332E]">
          {/* Brand Info */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#E5DDD0] dark:border-[#3A332E] shadow-soft shrink-0 bg-white/80 dark:bg-[#1C1917]">
                <Image
                  src="/images/logo-hd.png"
                  alt="Logo Nalar Nanti"
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#3E362E] dark:text-[#EDE6DC]">
                Nalar Nanti
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
              Ruang Teduh untuk Berpikir &amp; Merasa. Sebuah oase hening untuk menemani langkah-langkahmu menuju ketenangan batin, keikhlasan hati, dan pikiran yang jernih.
            </p>
          </div>

          {/* Social Channels / Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Instagram Link */}
            <a
              href={IG_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kunjungi Instagram @nalarnanti"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft group"
            >
              <Instagram className="w-4 h-4 text-[#C8A98E] group-hover:scale-110 transition-transform" />
              <span>Instagram: @nalarnanti</span>
            </a>

            {/* WhatsApp Channel Link */}
            <a
              href={WA_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gabung Saluran WhatsApp Nalar Nanti"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#8E9B8E] hover:text-[#8E9B8E] transition-all shadow-soft group"
            >
              <MessageCircle className="w-4 h-4 text-[#8E9B8E] group-hover:scale-110 transition-transform" />
              <span>Saluran WhatsApp: @NalarNanti</span>
            </a>
          </div>
        </div>

        {/* Disclaimer Krisis & Bantuan Emosional */}
        <div className="py-6 border-b border-[#E5DDD0]/70 dark:border-[#3A332E] flex items-start gap-3 text-left">
          <LifeBuoy className="w-4 h-4 text-[#886950] dark:text-[#C8A98E] shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
            <strong className="text-[#3E362E] dark:text-[#EDE6DC]">Catatan Kasih:</strong> Nalar Nanti adalah ruang literasi dan refleksi pribadi, bukan layanan medis atau konseling psikologis darurat. Jika kamu atau seseorang yang kamu kenal sedang berada dalam krisis emosional atau butuh pertolongan segera, silakan hubungi <strong className="text-[#3E362E] dark:text-[#EDE6DC]">Hotline Kemenkes 119 ext. 8</strong> atau tenaga profesional kesehatan mental terdekat.
          </p>
        </div>

        {/* Navigasi Footer & Tautan Penting */}
        <div className="py-6 border-b border-[#E5DDD0]/70 dark:border-[#3A332E] flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-xs text-[#7A6F64] dark:text-[#A89F94]">
          <Link href="/#beranda" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Beranda
          </Link>
          <Link href="/#suasana-hati" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Suasana Hati
          </Link>
          <Link href="/#pengingat" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Pengingat Acak
          </Link>
          <Link href="/koleksi" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Koleksi Nalar
          </Link>
          <Link href="/#toples-nalar" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Toples Nalar
          </Link>
          <Link href="/racik" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Racik Kartu
          </Link>
          <Link href="/ruang-cerita" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Ruang Cerita
          </Link>
          <Link href="/#ruang-jeda" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Ruang Jeda
          </Link>
          <Link href="/#tentang" className="hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors whitespace-nowrap">
            Tentang Kami
          </Link>
          <Link href="/privasi" className="text-[#886950] dark:text-[#C8A98E] font-medium hover:underline whitespace-nowrap">
            Kebijakan Privasi
          </Link>
        </div>

        {/* Bottom Bar: Copyright Dinamis */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7A6F64] dark:text-[#A89F94]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left">
            <span>Dirajut dengan tenang</span>
            <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]" />
            <span>untuk setiap jiwa yang butuh jeda.</span>
          </div>

          <p className="text-center sm:text-right text-[11px] sm:text-xs">
            © {currentYear} <strong className="font-serif font-medium text-[#3E362E] dark:text-[#EDE6DC]">Nalar Nanti</strong>. Menata Nalar, Merakit Asa.
          </p>
        </div>
      </div>
    </footer>
  );
}

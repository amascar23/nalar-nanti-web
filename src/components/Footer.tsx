import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, MessageCircle, Heart } from "lucide-react";

/**
 * 💡 Tautan media sosial Nalar Nanti
 */
const WA_CHANNEL_URL = "https://whatsapp.com/channel/0029VbBLknC7IUYPlfksIh0Y";
const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

export default function Footer() {
  return (
    <footer className="bg-[#F3EDE2] border-t border-[#E5DDD0] pt-14 pb-12 text-[#7A6F64]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#E5DDD0]">
          {/* Brand Info */}
          <div className="max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#E5DDD0] shadow-soft shrink-0 bg-[#FAF7F2]">
                <Image
                  src="/images/logo-hd.png"
                  alt="Logo Nalar Nanti"
                  width={80}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif text-2xl font-semibold tracking-tight text-[#3E362E]">
                Nalar Nanti
              </span>
            </div>
            <p className="font-sans text-sm text-[#7A6F64] leading-relaxed">
              Ruang Teduh untuk Berpikir {"&"} Merasa. Sebuah oase hening untuk menemani langkah-langkahmu menuju ketenangan batin, keikhlasan hati, dan pikiran yang jernih.
            </p>
          </div>

          {/* Social Channels / Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {/* Instagram Link */}
            <a
              href={IG_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft group"
            >
              <Instagram className="w-4 h-4 text-[#C8A98E] group-hover:scale-110 transition-transform" />
              <span>Instagram: @nalarnanti</span>
            </a>

            {/* WhatsApp Channel Link */}
            <a
              href={WA_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#8E9B8E] hover:text-[#8E9B8E] transition-all shadow-soft group"
            >
              <MessageCircle className="w-4 h-4 text-[#8E9B8E] group-hover:scale-110 transition-transform" />
              <span>Saluran WhatsApp: @NalarNanti</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6F64]">
          <div className="flex items-center gap-1.5">
            <span>Dirajut dengan tenang</span>
            <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]" />
            <span>untuk setiap jiwa yang butuh jeda.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="#beranda" className="hover:text-[#3E362E] transition-colors">
              Beranda
            </Link>
            <Link href="#pengingat" className="hover:text-[#3E362E] transition-colors">
              Pengingat Acak
            </Link>
            <Link href="#kutipan" className="hover:text-[#3E362E] transition-colors">
              Koleksi Nalar
            </Link>
            <Link href="#tentang" className="hover:text-[#3E362E] transition-colors">
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

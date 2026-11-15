"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles, Instagram, Bookmark, Moon, Sun } from "lucide-react";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import { useTheme } from "@/context/ThemeContext";

const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { savedCount, openDrawer, isLoaded } = useSavedQuotes();
  const { theme, toggleTheme, isMounted: isThemeMounted } = useTheme();

  const navLinks = [
    { label: "Beranda", href: "/" },
    { label: "Suasana Hati", href: "/#suasana-hati" },
    { label: "Koleksi Nalar", href: "/koleksi" },
    { label: "Racik Kartu", href: "/racik" },
    { label: "Ruang Jeda", href: "/#ruang-jeda" },
    { label: "Titip Nalar", href: "/#titip-nalar" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/90 to-[#FAF7F2]/80 dark:from-[#1C1917]/95 dark:via-[#1C1917]/90 dark:to-[#1C1917]/80 backdrop-blur-md border-b border-[#E5DDD0] dark:border-[#3A332E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4 lg:gap-8">
        {/* 1. Zona Kiri: Identitas Brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90 active:scale-98 shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#EAE1D3] dark:from-[#322C27] dark:to-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] flex items-center justify-center overflow-hidden shrink-0 shadow-soft">
            <Image
              src="/images/logo-hd.png"
              alt="Logo Nalar Nanti"
              width={72}
              height={72}
              unoptimized
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-serif font-semibold text-lg sm:text-xl tracking-tight text-[#3E362E] dark:text-[#EDE6DC] whitespace-nowrap">
            Nalar Nanti
          </span>
        </Link>

        {/* 2. Zona Tengah: Menu Navigasi Satu Baris Rapi (Desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 text-[13.5px] font-medium text-[#7A6F64] dark:text-[#A89F94] flex-1 max-w-xl mx-auto">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap hover:text-[#3E362E] dark:hover:text-[#EDE6DC] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C8A98E] hover:after:w-full after:transition-all"
            >
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* 3. Zona Kanan: Tombol Utilitas & CTA Utama (Desktop) */}
        <div className="hidden lg:flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
          {/* 1. Tombol Saku Hati */}
          <button
            onClick={openDrawer}
            aria-label="Buka Saku Hati"
            title="Kutipan Tersimpan di Saku Hati"
            className="h-9 px-3 rounded-xl border border-[#E5DDD0] dark:border-[#3A332E] bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] hover:from-[#F3EDE2] hover:to-[#EAE1D3] dark:hover:from-[#322C27] dark:hover:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all shadow-soft active:scale-95 shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]/20 shrink-0" />
            <span className="whitespace-nowrap">Saku Hati</span>
            {isLoaded && savedCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#D4B59D] to-[#C8A98E] text-[#FAF7F2] text-[10px] font-bold shrink-0">
                {savedCount}
              </span>
            )}
          </button>

          {/* 2. Tombol Mode Baca Malam (Dark Mode) */}
          <button
            onClick={toggleTheme}
            aria-label={
              isThemeMounted && theme === "dark"
                ? "Beralih ke Mode Pagi (Soft Cream)"
                : "Beralih ke Mode Baca Malam (Warm Espresso)"
            }
            title={
              isThemeMounted && theme === "dark"
                ? "Beralih ke Mode Pagi (Soft Cream)"
                : "Beralih ke Mode Baca Malam (Warm Espresso)"
            }
            className="w-9 h-9 rounded-xl border border-[#E5DDD0] dark:border-[#3A332E] bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] hover:from-[#F3EDE2] hover:to-[#EAE1D3] dark:hover:from-[#322C27] dark:hover:to-[#26221F] flex items-center justify-center text-[#3E362E] dark:text-[#EDE6DC] shrink-0 transition-all shadow-soft active:scale-95 group"
          >
            {isThemeMounted && theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#C8A98E] group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-[#7A6F64] dark:text-[#A89F94] group-hover:text-[#C8A98E] transition-colors" />
            )}
          </button>

          {/* 3. Tombol Ikon Instagram */}
          <a
            href={IG_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Kunjungi Instagram @nalarnanti"
            aria-label="Kunjungi profil Instagram @nalarnanti"
            className="w-9 h-9 rounded-xl border border-[#E5DDD0] dark:border-[#3A332E] bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] hover:from-[#F3EDE2] hover:to-[#EAE1D3] dark:hover:from-[#322C27] dark:hover:to-[#26221F] flex items-center justify-center text-[#3E362E] dark:text-[#EDE6DC] shrink-0 transition-all shadow-soft active:scale-95 group"
          >
            <Instagram className="w-4 h-4 text-[#7A6F64] dark:text-[#A89F94] group-hover:text-[#C8A98E] transition-colors" />
          </a>

          {/* 4. Tombol CTA Utama ("Tarik Napas") */}
          <Link
            href="/#pengingat"
            className="h-9 px-4 rounded-xl bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] hover:from-[#C8A98E] hover:to-[#A8876E] text-[#FAF7F2] text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-soft transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="whitespace-nowrap">Tarik Napas</span>
          </Link>
        </div>

        {/* 4. Tampilan Mobile & Tablet (lg:hidden) */}
        <div className="flex lg:hidden items-center gap-2">
          {/* 1. Tombol Ringkas Saku Hati */}
          <button
            onClick={openDrawer}
            aria-label="Buka Saku Hati"
            title="Kutipan Tersimpan di Saku Hati"
            className="h-9 px-2.5 sm:px-3 rounded-xl border border-[#E5DDD0] dark:border-[#3A332E] bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] hover:from-[#F3EDE2] hover:to-[#EAE1D3] dark:hover:from-[#322C27] dark:hover:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition-all shadow-soft active:scale-95 shrink-0"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]/20 shrink-0" />
            <span className="hidden xs:inline whitespace-nowrap">Saku Hati</span>
            {isLoaded && savedCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#D4B59D] to-[#C8A98E] text-[#FAF7F2] text-[10px] font-bold shrink-0">
                {savedCount}
              </span>
            )}
          </button>

          {/* 2. Tombol Mode Baca Malam (Mobile) */}
          <button
            onClick={toggleTheme}
            aria-label={
              isThemeMounted && theme === "dark"
                ? "Beralih ke Mode Pagi"
                : "Beralih ke Mode Baca Malam"
            }
            title={
              isThemeMounted && theme === "dark"
                ? "Beralih ke Mode Pagi"
                : "Beralih ke Mode Baca Malam"
            }
            className="w-9 h-9 rounded-xl border border-[#E5DDD0] dark:border-[#3A332E] bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] hover:from-[#F3EDE2] hover:to-[#EAE1D3] dark:hover:from-[#322C27] dark:hover:to-[#26221F] flex items-center justify-center text-[#3E362E] dark:text-[#EDE6DC] transition-all shadow-soft active:scale-95 shrink-0 group"
          >
            {isThemeMounted && theme === "dark" ? (
              <Sun className="w-4 h-4 text-[#C8A98E]" />
            ) : (
              <Moon className="w-4 h-4 text-[#7A6F64] dark:text-[#A89F94] group-hover:text-[#C8A98E]" />
            )}
          </button>

          {/* 3. Tombol Menu Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="w-9 h-9 rounded-xl border border-[#E5DDD0] dark:border-[#3A332E] bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] hover:from-[#F3EDE2] hover:to-[#EAE1D3] dark:hover:from-[#322C27] dark:hover:to-[#26221F] flex items-center justify-center text-[#3E362E] dark:text-[#EDE6DC] transition-colors active:scale-95 shrink-0"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 5. Dropdown Menu Mobile & Tablet */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-b from-[#FAF7F2] to-[#F3EDE2] dark:from-[#1C1917] dark:to-[#26221F] border-b border-[#E5DDD0] dark:border-[#3A332E] px-4 pt-3 pb-6 space-y-2 shadow-card animate-fadeIn">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#F3EDE2] dark:hover:bg-[#26221F] active:bg-[#E5DDD0]/60 dark:active:bg-[#3A332E]/60 transition-colors whitespace-nowrap"
              >
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="pt-2 space-y-2 border-t border-[#E5DDD0]/70 dark:border-[#3A332E] mt-2">
            {/* Tombol Toggle Mode Baca Malam di Menu Mobile */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#F3EDE2]/70 dark:bg-[#26221F]/70 border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] transition-all shadow-soft active:scale-98"
            >
              <div className="flex items-center gap-2">
                {isThemeMounted && theme === "dark" ? (
                  <Sun className="w-4 h-4 text-[#C8A98E]" />
                ) : (
                  <Moon className="w-4 h-4 text-[#7A6F64] dark:text-[#A89F94]" />
                )}
                <span>Mode Tampilan</span>
              </div>
              <span className="text-[11px] text-[#C8A98E] font-medium">
                {isThemeMounted && theme === "dark" ? "Mode Malam (Espresso)" : "Mode Pagi (Cream)"}
              </span>
            </button>

            {/* Tombol CTA Tarik Napas */}
            <Link
              href="/#pengingat"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-semibold px-4 py-3 rounded-xl bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] hover:from-[#C8A98E] hover:to-[#A8876E] text-[#FAF7F2] transition-all shadow-soft active:scale-98 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Tarik Napas — Ambil Pengingat</span>
            </Link>

            {/* Link Instagram */}
            <a
              href={IG_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-semibold px-4 py-2.5 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-98 whitespace-nowrap"
            >
              <Instagram className="w-4 h-4 text-[#C8A98E] shrink-0" />
              <span className="whitespace-nowrap">Kunjungi Instagram @nalarnanti</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

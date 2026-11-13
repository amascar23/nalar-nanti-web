"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sparkles, Instagram, Bookmark } from "lucide-react";
import { useSavedQuotes } from "@/context/SavedQuotesContext";

const IG_PROFILE_URL = "https://www.instagram.com/nalarnanti/";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { savedCount, openDrawer } = useSavedQuotes();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Suasana Hati", href: "#suasana-hati" },
    { label: "Pengingat Acak", href: "#pengingat" },
    { label: "Koleksi Nalar", href: "#kutipan" },
    { label: "Tentang", href: "#tentang" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md shadow-soft border-b border-[#E5DDD0]/80 py-3 sm:py-3.5"
          : "bg-[#FAF7F2]/70 backdrop-blur-sm border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#beranda"
          className="group flex items-center gap-2.5 sm:gap-3 transition-opacity hover:opacity-90 active:scale-98"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#E5DDD0] shadow-soft group-hover:scale-105 transition-transform bg-[#F3EDE2] shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Logo Nalar Nanti"
              width={36}
              height={36}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#3E362E]">
              Nalar Nanti
            </span>
            <span className="hidden xs:inline-block text-[10px] font-sans px-2 py-0.5 rounded-full bg-[#8E9B8E]/15 text-[#637063] font-medium">
              ruang teduh
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#7A6F64] hover:text-[#3E362E] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#C8A98E] hover:after:w-full after:transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Saku Hati */}
          <button
            onClick={openDrawer}
            aria-label="Buka Saku Hati"
            title="Kutipan Tersimpan di Saku Hati"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-95 group"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]/20 group-hover:fill-[#C8A98E] transition-colors" />
            <span className="hidden xs:inline">Saku Hati</span>
            {savedCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Instagram Direct Link Icon */}
          <a
            href={IG_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Kunjungi Instagram @nalarnanti"
            aria-label="Kunjungi profil Instagram @nalarnanti"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#7A6F64] hover:text-[#C8A98E] hover:border-[#C8A98E] transition-all shadow-soft active:scale-95 group"
          >
            <Instagram className="w-4 h-4 text-[#7A6F64] group-hover:text-[#C8A98E] group-hover:scale-110 transition-all" />
          </a>

          <a
            href="#pengingat"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-[#C8A98E] text-[#FAF7F2] hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tarik Napas</span>
          </a>

          {/* Mobile Menu Button - min 44px tap target */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Buka menu navigasi"
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl text-[#3E362E] hover:bg-[#F3EDE2] active:bg-[#E5DDD0]/50 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E5DDD0] px-4 pt-3 pb-6 space-y-2 shadow-card animate-fadeIn">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3.5 py-3 rounded-xl text-sm font-medium text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#F3EDE2] active:bg-[#E5DDD0]/60 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                openDrawer();
              }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-2xl text-xs font-semibold text-[#3E362E] bg-[#F3EDE2] border border-[#E5DDD0] hover:border-[#C8A98E] transition-all shadow-soft active:scale-98"
            >
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#C8A98E] fill-[#C8A98E]" />
                <span>Buka Saku Hati</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-[11px] font-bold">
                {savedCount} tersimpan
              </span>
            </button>

            <a
              href="#pengingat"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-semibold px-4 py-3.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] hover:bg-[#B9967A] transition-all shadow-soft active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ambil Satu Pengingat</span>
            </a>

            <a
              href={IG_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-semibold px-4 py-3 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-98"
            >
              <Instagram className="w-4 h-4 text-[#C8A98E]" />
              <span>Kunjungi Instagram @nalarnanti</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

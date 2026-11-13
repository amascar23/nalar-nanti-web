"useClient";
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Compass } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Beranda", href: "#beranda" },
    { label: "Kutipan", href: "#kutipan" },
    { label: "Pengingat Acak", href: "#pengingat" },
    { label: "Tentang", href: "#tentang" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md shadow-soft border-b border-[#E5DDD0]/70 py-3.5"
          : "bg-[#FAF7F2]/60 backdrop-blur-sm border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#beranda"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-85"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#C8A98E] group-hover:scale-125 transition-transform" />
          <span className="font-serif text-2xl font-semibold tracking-tight text-[#3E362E]">
            Nalar Nanti
          </span>
          <span className="hidden sm:inline-block text-xs font-sans px-2 py-0.5 rounded-full bg-[#8E9B8E]/15 text-[#637063] font-medium ml-1">
            ruang teduh
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
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
        <div className="flex items-center gap-3">
          <a
            href="#pengingat"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-[#C8A98E] text-[#FAF7F2] hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tarik Napas</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Buka menu navigasi"
            className="md:hidden p-2 rounded-lg text-[#3E362E] hover:bg-[#F3EDE2] transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E5DDD0] px-4 pt-2 pb-6 space-y-3 shadow-card animate-fadeIn">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#F3EDE2] transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <a
              href="#pengingat"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-semibold px-4 py-3 rounded-full bg-[#C8A98E] text-[#FAF7F2] hover:bg-[#B9967A] transition-colors shadow-soft"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ambil Pengingat Hari Ini</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}


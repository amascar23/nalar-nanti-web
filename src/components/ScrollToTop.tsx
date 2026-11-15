"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const toggleVisibility = () => {
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-30 transition-all duration-300 pointer-events-none ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Kembali ke atas halaman"
        title="Kembali ke atas"
        className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#3E362E] hover:text-[#FAF7F2] hover:bg-[#C8A98E] hover:border-[#C8A98E] shadow-card hover:shadow-floating flex items-center justify-center transition-all duration-300 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#C8A98E]/50"
      >
        <ArrowUp className="w-4 h-4 text-[#7A6F64] group-hover:text-[#FAF7F2] group-hover:-translate-y-0.5 transition-all" />
      </button>
    </div>
  );
}

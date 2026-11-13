"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 pointer-events-none ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4"
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas halaman"
        title="Kembali ke atas"
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#3E362E] hover:text-[#FAF7F2] hover:bg-[#C8A98E] hover:border-[#C8A98E] shadow-card hover:shadow-floating flex items-center justify-center transition-all duration-300 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-[#C8A98E]/50"
      >
        <ArrowUp className="w-5 h-5 text-[#7A6F64] group-hover:text-[#FAF7F2] group-hover:-translate-y-0.5 transition-all" />
      </button>
    </div>
  );
}


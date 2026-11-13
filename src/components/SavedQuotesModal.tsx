"use client";

import React, { useState, useEffect } from "react";
import { useSavedQuotes } from "@/context/SavedQuotesContext";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";
import { downloadQuoteAsImage } from "@/utils/downloadQuoteCard";
import {
  Bookmark,
  X,
  Trash2,
  Copy,
  Check,
  MessageCircle,
  Download,
  Loader2,
  Quote as QuoteIcon,
  Feather,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function SavedQuotesModal() {
  const { isDrawerOpen, closeDrawer, savedIds, removeSaved } = useSavedQuotes();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Kunci scroll body saat modal/drawer terbuka
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // Tutup dengan tombol ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDrawer();
      }
    };
    if (isDrawerOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  // Cari data lengkap kutipan yang tersimpan (urutan sesuai urutan penyimpanan terbaru di atas)
  const savedQuotes: QuoteItem[] = [...savedIds]
    .reverse()
    .map((id) => QUOTES_DATA.find((q) => q.id === id))
    .filter((q): q is QuoteItem => Boolean(q));

  const handleCopy = (quote: QuoteItem) => {
    const textToCopy = `“${quote.quote}” — ${quote.source} (Nalar Nanti)\n\n${quote.reflection}\n\n— Nalar Nanti (@nalarnanti)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleShareWa = (quote: QuoteItem) => {
    const text = encodeURIComponent(
      `🌿 *Kutipan Saku Hati — ${quote.themeTitle}*\n\n` +
      `“${quote.quote}”\n` +
      `— ${quote.source} (Nalar Nanti)\n\n` +
      `*Refleksi:* ${quote.reflection}\n\n` +
      `— Ruang Singgah untuk Menata Nalar & Merakit Asa\nhttps://nalarnanti.com`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (quote: QuoteItem) => {
    try {
      setDownloadingId(quote.id);
      await downloadQuoteAsImage(quote);
    } catch (err) {
      console.error("Gagal mengunduh kartu dari Saku Hati:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Gelap Transparan */}
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className="fixed inset-0 bg-[#3E362E]/40 backdrop-blur-xs transition-opacity animate-fadeIn"
      />

      {/* Laci / Panel Drawer Sisi Kanan */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E5DDD0] shadow-floating flex flex-col h-full animate-fadeIn">
          {/* 1. Header Drawer */}
          <div className="p-5 sm:p-6 border-b border-[#E5DDD0] bg-[#F3EDE2]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#C8A98E] shadow-soft shrink-0">
                <Bookmark className="w-5 h-5 fill-[#C8A98E]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#3E362E] tracking-tight">
                    Saku Hati
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#C8A98E] text-[#FAF7F2]">
                    {savedQuotes.length}
                  </span>
                </div>
                <p className="text-xs text-[#7A6F64]">
                  Kutipan favorit yang kamu tandai
                </p>
              </div>
            </div>

            <button
              onClick={closeDrawer}
              aria-label="Tutup Saku Hati"
              className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[#7A6F64] hover:text-[#3E362E] hover:border-[#C8A98E] flex items-center justify-center transition-all active:scale-95 shadow-soft"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Daftar Kutipan Tersimpan (Scrollable Area) */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {savedQuotes.length === 0 ? (
              // Tampilan jika Saku Hati masih kosong
              <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-[#F3EDE2]/70 border border-[#E5DDD0] my-auto">
                <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] flex items-center justify-center text-[#C8A98E] shadow-soft mb-4">
                  <Bookmark className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#3E362E] mb-2">
                  Saku Hatimu Masih Kosong
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#7A6F64] leading-relaxed max-w-xs mb-5">
                  Saku hatimu masih kosong. Tandai kutipan yang menyentuh hatimu agar mudah dibaca kembali kapan saja.
                </p>
                <button
                  onClick={() => {
                    closeDrawer();
                    const el = document.getElementById("kutipan") || document.getElementById("suasana-hati");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-xs font-semibold hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
                >
                  <span>Jelajahi Kutipan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              // Daftar Kartu Tersimpan
              savedQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="bg-[#F3EDE2] border border-[#E5DDD0] rounded-2xl p-4 sm:p-5 shadow-soft hover:shadow-card transition-all"
                >
                  {/* Top: Judul Tema & Tombol Hapus */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-semibold text-[#8E9B8E] uppercase tracking-wider block mb-0.5">
                        {quote.category}
                      </span>
                      <h4 className="font-serif text-base font-semibold text-[#3E362E] leading-snug">
                        {quote.themeTitle}
                      </h4>
                    </div>
                    <button
                      onClick={() => removeSaved(quote.id)}
                      title="Hapus dari Saku Hati"
                      aria-label="Hapus dari Saku Hati"
                      className="p-1.5 rounded-lg text-[#7A6F64] hover:text-rose-600 hover:bg-[#FAF7F2] transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quote Body */}
                  <div className="mb-3">
                    <p className="font-serif italic text-xs sm:text-sm leading-relaxed text-[#3E362E] line-clamp-3">
                      “{quote.quote}”
                    </p>
                  </div>

                  {/* Source Pill */}
                  <div className="mb-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium px-2 py-0.5 rounded-lg bg-[#EAE1D3] text-[#3E362E] border border-[#DDD3C3]">
                      <Feather className="w-2.5 h-2.5 text-[#886950]" />
                      <span className="truncate max-w-[180px]">{quote.source}</span>
                    </span>
                  </div>

                  {/* Actions: Salin, Bagikan WA, Simpan Gambar */}
                  <div className="pt-2.5 border-t border-[#E5DDD0]/70 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      {/* Salin */}
                      <button
                        onClick={() => handleCopy(quote)}
                        className="px-2.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[11px] font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all flex items-center gap-1 active:scale-95"
                      >
                        {copiedId === quote.id ? (
                          <>
                            <Check className="w-3 h-3 text-[#8E9B8E]" />
                            <span className="text-[#8E9B8E]">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[#7A6F64]" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>

                      {/* WhatsApp */}
                      <button
                        onClick={() => handleShareWa(quote)}
                        className="px-2.5 py-1.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] text-[11px] font-semibold hover:bg-[#B9967A] transition-all flex items-center gap-1 active:scale-95"
                      >
                        <MessageCircle className="w-3 h-3 text-[#FAF7F2]" />
                        <span>WA</span>
                      </button>
                    </div>

                    {/* Simpan Gambar PNG */}
                    <button
                      onClick={() => handleDownload(quote)}
                      disabled={downloadingId === quote.id}
                      className="px-2.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E5DDD0] text-[11px] font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all flex items-center gap-1 active:scale-95 disabled:opacity-50"
                      title="Unduh Kartu Gambar"
                    >
                      {downloadingId === quote.id ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin text-[#C8A98E]" />
                          <span>Unduh...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3 text-[#7A6F64]" />
                          <span>Gambar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 3. Footer Drawer */}
          {savedQuotes.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E5DDD0] bg-[#F3EDE2]/60 flex items-center justify-between text-xs text-[#7A6F64]">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C8A98E]" />
                <span>Tersimpan di browser ini</span>
              </div>
              <button
                onClick={closeDrawer}
                className="font-semibold text-[#3E362E] hover:text-[#C8A98E] transition-colors"
              >
                Tutup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


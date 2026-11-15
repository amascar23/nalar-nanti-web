"use client";

import React, { useState, useEffect } from "react";
import { QuoteItem } from "@/data/quotes";
import {
  Mail,
  X,
  Copy,
  Check,
  MessageCircle,
  Heart,
  Sparkles,
  ArrowRight,
  Quote as QuoteIcon,
  Send,
  Feather,
} from "lucide-react";

interface SendEnvelopeModalProps {
  quoteItem: QuoteItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function SendEnvelopeModal({
  quoteItem,
  isOpen,
  onClose,
}: SendEnvelopeModalProps) {
  const [recipient, setRecipient] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [generatedLink, setGeneratedLink] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Kunci scroll body saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Tutup dengan tombol ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Reset form saat modal ditutup atau ganti kutipan
  const handleClose = () => {
    setRecipient("");
    setSender("");
    setNote("");
    setGeneratedLink("");
    setIsCopied(false);
    onClose();
  };

  if (!isOpen || !quoteItem) return null;

  const handleCreateLink = (e: React.FormEvent) => {
    e.preventDefault();
    const toName = recipient.trim() || "Sahabatku";
    const fromName = sender.trim() || "Seseorang yang peduli";
    const personalNote = note.trim();

    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://nalarnanti.com";

    const params = new URLSearchParams();
    params.set("id", quoteItem.id);
    params.set("untuk", toName);
    params.set("dari", fromName);
    if (personalNote) {
      params.set("pesan", personalNote);
    }

    const url = `${origin}/amplop?${params.toString()}`;
    setGeneratedLink(url);
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    if (!generatedLink) return;
    const toName = recipient.trim() || "sahabatku";
    const waText =
      `🌿 *Amplop Pengingat Nalar Nanti*\n\n` +
      `Hai ${toName}, ada sebuah amplop pengingat kecil dan catatan hangat yang dititipkan untukmu:\n\n` +
      `${generatedLink}\n\n` +
      `— Ruang Singgah untuk Menata Nalar & Merakit Asa`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#3E362E]/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="bg-[#FAF7F2] border border-[#E5DDD0] rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-floating relative text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E5DDD0]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#EAE1D3] border border-[#E5DDD0] flex items-center justify-center text-[#886950] shrink-0">
              <Mail className="w-4 h-4 text-[#886950]" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] leading-tight">
                Kirim Amplop Pengingat
              </h3>
              <p className="text-[11px] text-[#7A6F64]">
                Dedikasikan kutipan ini kepada teman atau orang tersayang
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Tutup jendela"
            className="p-1.5 rounded-full text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#F3EDE2] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ringkasan Kutipan yang Dipilih */}
        <div className="my-4 p-3.5 sm:p-4 rounded-2xl bg-[#F3EDE2] border border-[#E5DDD0] text-xs text-[#3E362E] relative">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8E9B8E] mb-1">
            <QuoteIcon className="w-3 h-3 text-[#C8A98E]" />
            <span>Kutipan yang Didonasikan (#{quoteItem.orderNumber || quoteItem.id})</span>
          </div>
          <p className="font-serif italic text-xs sm:text-sm text-[#3E362E] line-clamp-2 leading-relaxed">
            “{quoteItem.quote}”
          </p>
          <span className="text-[10px] text-[#7A6F64] mt-1 block">
            — {quoteItem.source}
          </span>
        </div>

        {!generatedLink ? (
          /* FORM PEMBUATAN AMPLOP */
          <form onSubmit={handleCreateLink} className="space-y-4">
            {/* Input 1: Untuk Siapa (Nama Penerima) */}
            <div>
              <label
                htmlFor="recipient-name"
                className="block text-xs font-semibold text-[#3E362E] mb-1.5"
              >
                Untuk Siapa? (Nama / Panggilan Penerima) <span className="text-[#C8A98E]">*</span>
              </label>
              <input
                id="recipient-name"
                type="text"
                required
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="Contoh: Sahabatku / Aisyah / Teman Baik"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] text-xs sm:text-sm text-[#3E362E] placeholder-[#7A6F64]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
              />
            </div>

            {/* Input 2: Dari Siapa (Nama Pengirim) */}
            <div>
              <label
                htmlFor="sender-name"
                className="block text-xs font-semibold text-[#3E362E] mb-1.5"
              >
                Dari Siapa? (Nama / Inisial Pengirim)
              </label>
              <input
                id="sender-name"
                type="text"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                placeholder="Contoh: Seseorang yang peduli / [Namamu]"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] text-xs sm:text-sm text-[#3E362E] placeholder-[#7A6F64]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
              />
              <p className="text-[10px] text-[#7A6F64]/80 mt-1">
                Opsional — default: <em>"Seseorang yang peduli"</em>
              </p>
            </div>

            {/* Input 3: Catatan Hangat Singkat (Maks 160 Karakter) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="personal-note"
                  className="block text-xs font-semibold text-[#3E362E]"
                >
                  Catatan Hangat Singkat
                </label>
                <span className="text-[10px] text-[#7A6F64]">
                  {note.length}/160
                </span>
              </div>
              <textarea
                id="personal-note"
                rows={3}
                maxLength={160}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Lagi kepikiran kamu, semoga kalimat ini bisa sedikit menenangkan harimu ya."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E5DDD0] text-xs sm:text-sm text-[#3E362E] placeholder-[#7A6F64]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft leading-relaxed resize-none"
              />
            </div>

            {/* Tombol Buat Link Amplop */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#B9967A] transition-all shadow-soft active:scale-98 group"
              >
                <Sparkles className="w-4 h-4 text-[#FAF7F2]" />
                <span>Buat Link Amplop Pengingat</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        ) : (
          /* HASIL LINK SIAP DIBAGIKAN */
          <div className="space-y-4 animate-fadeIn">
            <div className="p-4 rounded-2xl bg-[#8E9B8E]/10 border border-[#8E9B8E]/30 text-center">
              <span className="text-xs font-semibold text-[#637063] block mb-1">
                ✉️ Amplop Pengingat Siap Dikirim!
              </span>
              <p className="text-[11px] text-[#7A6F64]">
                Tautan unik untuk <strong>{recipient.trim() || "Sahabatmu"}</strong> sudah siap. Penerima akan disambut dengan animasi amplop terbuka.
              </p>
            </div>

            {/* Kotak Tautan */}
            <div>
              <label className="block text-[11px] font-semibold text-[#7A6F64] mb-1">
                Tautan Amplop Digital
              </label>
              <div className="flex items-center gap-2 p-1.5 bg-[#F3EDE2] border border-[#E5DDD0] rounded-xl">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="bg-transparent border-none text-xs text-[#3E362E] px-2 w-full focus:outline-none select-all truncate font-mono"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="min-h-[36px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#E5DDD0] text-xs font-semibold text-[#3E362E] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shrink-0 active:scale-95"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                      <span className="text-[#8E9B8E]">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A6F64]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Aksi Bagikan */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-semibold text-xs sm:text-sm hover:bg-[#20ba59] transition-all shadow-soft active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Kirim Langsung via WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setGeneratedLink("")}
                className="w-full text-xs text-[#7A6F64] hover:text-[#3E362E] py-2 transition-colors text-center"
              >
                ← Ubah nama atau catatan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

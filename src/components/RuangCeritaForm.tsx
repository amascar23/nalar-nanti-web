"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Heart,
  Send,
  Sparkles,
  Feather,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Lock,
  Mail,
  ShieldCheck,
  Compass,
  Smile,
  Quote as QuoteIcon,
  ArrowLeft,
  Copy,
  Check,
} from "lucide-react";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/constants";
import { QUOTES_DATA, QuoteItem } from "@/data/quotes";

// 4 Pilihan Suasana Cerita
export type StoryMood =
  | "Sekadar Meluapkan Isi Hati"
  | "Sedang Lelah & Butuh Penguat"
  | "Butuh Saran / Sudut Pandang"
  | "Titip Doa";

const MOOD_OPTIONS: { id: StoryMood; label: string; icon: React.ElementType; desc: string }[] = [
  {
    id: "Sekadar Meluapkan Isi Hati",
    label: "Sekadar Meluapkan Isi Hati",
    icon: Feather,
    desc: "Ingin berbagi cerita atau unek-unek tanpa perlu penghakiman.",
  },
  {
    id: "Sedang Lelah & Butuh Penguat",
    label: "Sedang Lelah & Butuh Penguat",
    icon: Sparkles,
    desc: "Langkah terasa berat, butuh pelukan kata dan suntikan asa.",
  },
  {
    id: "Butuh Saran / Sudut Pandang",
    label: "Butuh Saran / Sudut Pandang",
    icon: Compass,
    desc: "Sedang bimbang dan menanti pandangan teduh dari admin.",
  },
  {
    id: "Titip Doa",
    label: "Titip Doa",
    icon: Heart,
    desc: "Ada harapan atau hajat yang ingin didoakan bersama secara hening.",
  },
];

export default function RuangCeritaForm() {
  const [name, setName] = useState<string>("");
  const [selectedMood, setSelectedMood] = useState<StoryMood>("Sekadar Meluapkan Isi Hati");
  const [story, setStory] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [isCopiedQuote, setIsCopiedQuote] = useState<boolean>(false);

  // Kutipan penguat bawaan (Kutipan No. 2: "Apa Kabar Hari Ini?")
  const comfortingQuote: QuoteItem =
    QUOTES_DATA.find((q) => q.id === "2") || QUOTES_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!story.trim()) {
      setErrorMessage("Mohon tuliskan isi ceritamu terlebih dahulu sebelum mengirim.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const senderName = name.trim() || "Sahabat Nalar (Anonim)";
    const senderEmail = email.trim();

    // Payload lengkap untuk Web3Forms
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `[Ruang Bercerita Nalar Nanti] - ${selectedMood}`,
      from_name: `${senderName} via Nalar Nanti`,
      nama_pengirim: senderName,
      suasana_cerita: selectedMood,
      isi_cerita: story.trim(),
      message: `Ada cerita baru yang dititipkan di Ruang Bercerita Nalar Nanti:\n\n` +
        `👤 Pengirim: ${senderName}\n` +
        `🌿 Suasana Hati: ${selectedMood}\n` +
        `📬 Email Balasan: ${senderEmail || "Tidak mencantumkan email (hanya ingin mencurahkan isi hati secara hening)"}\n\n` +
        `----------------------------------------\n` +
        `ISI CERITA / CURHATAN:\n` +
        `----------------------------------------\n` +
        `${story.trim()}\n\n` +
        `----------------------------------------\n` +
        `💡 Tips Admin: Jika pengirim mencantumkan email, Anda dapat langsung menekan tombol 'Reply' di Gmail untuk membalas surat ini langsung ke email mereka.`,
    };

    // Sertakan replyto agar tombol Reply di Gmail langsung tertuju ke email pengirim
    if (senderEmail) {
      payload.email = senderEmail;
      payload.replyto = senderEmail;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setSubmittedEmail(senderEmail);
        setIsSubmitted(true);
        setStory("");
        setName("");
        setEmail("");
      } else {
        setErrorMessage(
          data.message ||
            "Mohon maaf, terjadi kendala saat menyampaikan ceritamu. Silakan periksa koneksi internet dan coba lagi."
        );
      }
    } catch {
      setErrorMessage(
        "Gagal terhubung ke server. Pastikan perangkatmu terhubung ke internet lalu coba kirimkan kembali."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setStory("");
    setName("");
    setEmail("");
    setSubmittedEmail("");
  };

  const handleCopyComfortingQuote = () => {
    const textToCopy = `“${comfortingQuote.quote}” — ${comfortingQuote.source} (Nalar Nanti)\n\n${comfortingQuote.reflection}\n\n— Ruang Bercerita Nalar Nanti`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopiedQuote(true);
    setTimeout(() => setIsCopiedQuote(false), 2200);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* ========================================================================= */}
      {/* KONDISI 1: SUKSES TERKIRIM (CONFIRMATION SCREEN DENGAN KUTIPAN PENGUAT) */}
      {/* ========================================================================= */}
      {isSubmitted ? (
        <div className="bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_12px_36px_-10px_rgba(200,169,142,0.20)] dark:shadow-none text-center animate-fadeIn">
          {/* Ikon Sukses */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8E9B8E]/15 border border-[#8E9B8E]/30 flex items-center justify-center mx-auto mb-5 text-[#637063] dark:text-[#8E9B8E] shadow-soft">
            <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#8E9B8E]" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#8E9B8E] block mb-2">
            Cerita Berhasil Diterima
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-3">
            Terima Kasih Sudah Membagi Ceritamu
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] max-w-lg mx-auto leading-relaxed mb-6">
            {submittedEmail ? (
              <>
                Ceritamu telah terkirim secara aman dan rahasia ke ruang admin Nalar Nanti.
                Karena kamu menyertakan alamat email, insya Allah kami akan membaca dan membalas
                suratmu langsung ke <strong className="text-[#3E362E] dark:text-[#EDE6DC]">{submittedEmail}</strong> dengan
                penuh keteduhan.
              </>
            ) : (
              <>
                Ceritamu telah terkirim secara rahasia dan anonim. Napasmu sudah cukup berat
                hari ini, terima kasih banyak sudah bertahan dan berani menaruh sejenak bebanmu
                di sini. Semoga hatimu perlahan menemukan rasa lapang.
              </>
            )}
          </p>

          {/* Kartu Kutipan Penguat Hangat Khas Nalar Nanti */}
          <div className="my-6 p-5 sm:p-7 rounded-2xl bg-white/75 dark:bg-[#1C1917]/80 border border-[#E5DDD0]/80 dark:border-[#3A332E] shadow-xs text-left relative overflow-hidden">
            <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#FAF7F2] dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#8E9B8E]">
                Pengingat untuk Hatimu
              </span>
              <span className="text-[10px] font-sans text-[#7A6F64] dark:text-[#A89F94]">
                #{comfortingQuote.orderNumber || "2"} • {comfortingQuote.themeTitle}
              </span>
            </div>

            <QuoteIcon className="w-4 h-4 text-[#C8A98E]/40 mb-2" />
            <p className="font-serif italic text-sm sm:text-base leading-relaxed text-[#3E362E] dark:text-[#EDE6DC] mb-3">
              “{comfortingQuote.quote}”
            </p>

            <p className="font-sans text-xs text-[#7A6F64] dark:text-[#A89F94] leading-relaxed mb-4">
              {comfortingQuote.reflection}
            </p>

            <div className="flex items-center justify-between pt-2.5 border-t border-[#E5DDD0]/60 dark:border-[#3A332E] text-xs">
              <span className="text-[11px] font-medium text-[#886950] dark:text-[#C8A98E]">
                — {comfortingQuote.source}
              </span>
              <button
                type="button"
                onClick={handleCopyComfortingQuote}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF7F2] dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[11px] font-medium text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] active:scale-95 transition-all"
              >
                {isCopiedQuote ? (
                  <>
                    <Check className="w-3 h-3 text-[#8E9B8E]" />
                    <span className="text-[#8E9B8E]">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Pengingat</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tombol Aksi Pasca Kirim */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:brightness-105 transition-all shadow-soft active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Tulis Cerita Lainnya</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-[#3E362E] dark:text-[#EDE6DC] font-semibold text-xs sm:text-sm hover:border-[#C8A98E] transition-all shadow-soft active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* KONDISI 2: FORMULIR INPUT RUANG BERCERITA */
        /* ========================================================================= */
        <div className="bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_12px_36px_-10px_rgba(200,169,142,0.20)] dark:shadow-none relative">
          {/* Header Card Form */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 shadow-soft">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A98E]" />
              <span>Ruang Privat • 100% Rahasia &amp; Aman</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-3">
              Katakan Apa Saja, Hatimu Didengar
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
              Tarik napas perlahan. Di ruang ini kamu tidak perlu terlihat sempurna. Tuliskan apa pun yang mengganjal
              di dada, keluh kesah yang sulit diceritakan ke orang sekitar, atau mintalah sudut pandang. Setiap pesan
              dibaca langsung oleh admin Nalar Nanti.
            </p>
          </div>

          {/* Alert Pesan Error jika Pengiriman Gagal */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-[#EAE1D3]/80 dark:bg-[#3A332E]/80 border border-[#D4B59D] dark:border-[#52473D] text-[#886950] dark:text-[#E8D4C1] text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#886950] dark:text-[#E8D4C1]" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
            {/* 1. Nama / Sapaan (Opsional) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F64] dark:text-[#A89F94]">
                  Nama / Sapaan
                </label>
                <span className="text-[11px] text-[#8E9B8E] font-medium">Opsional (Boleh Anonim)</span>
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Boleh dikosongkan jika ingin anonim (misal: Sahabat Nalar)"
                className="w-full px-4 py-3 sm:py-3.5 rounded-2xl bg-white/85 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-xs"
              />
            </div>

            {/* 2. Suasana Cerita (Pilihan Tombol Pill) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F64] dark:text-[#A89F94] mb-2.5">
                Suasana Hatimu Saat Ini
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MOOD_OPTIONS.map((mood) => {
                  const Icon = mood.icon;
                  const isSelected = selectedMood === mood.id;
                  return (
                    <button
                      key={mood.id}
                      type="button"
                      onClick={() => setSelectedMood(mood.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all flex items-start gap-3 active:scale-[0.99] group ${
                        isSelected
                          ? "bg-gradient-to-r from-white to-[#FAF7F2] dark:from-[#26221F] dark:to-[#1E1B18] border-[#C8A98E] ring-1 ring-[#C8A98E]/50 shadow-soft"
                          : "bg-white/60 dark:bg-[#1E1B18]/60 border-[#E5DDD0] dark:border-[#3A332E] hover:border-[#C8A98E]/60 hover:bg-white/80 dark:hover:bg-[#1E1B18]"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "bg-[#C8A98E] text-[#FAF7F2]"
                            : "bg-[#FAF7F2] dark:bg-[#26221F] text-[#7A6F64] dark:text-[#A89F94] group-hover:text-[#C8A98E]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`block text-xs font-semibold mb-0.5 leading-snug ${
                            isSelected
                              ? "text-[#3E362E] dark:text-[#EDE6DC]"
                              : "text-[#7A6F64] dark:text-[#A89F94]"
                          }`}
                        >
                          {mood.label}
                        </span>
                        <span className="block text-[11px] text-[#7A6F64]/80 dark:text-[#A89F94]/80 leading-normal">
                          {mood.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Isi Cerita / Curhatan (Wajib) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F64] dark:text-[#A89F94]">
                  Isi Cerita / Curahan Hatimu <span className="text-[#C8A98E]">*</span>
                </label>
                <span className="text-[11px] text-[#7A6F64]/70 dark:text-[#A89F94]/70">
                  {story.length > 0 ? `${story.length} karakter` : "Wajib diisi"}
                </span>
              </div>
              <textarea
                value={story}
                onChange={(e) => setStory(e.target.value)}
                required
                rows={7}
                placeholder="Tuliskan apa saja yang sedang memberatkan pundakmu, mengganjal di dadamu, atau yang sedang kamu doakan. Tidak ada kata yang salah di sini..."
                className="w-full px-4 py-3.5 rounded-2xl bg-white/85 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all resize-y shadow-xs leading-relaxed"
              />
            </div>

            {/* 4. Alamat Email untuk Balasan (Opsional) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F64] dark:text-[#A89F94]">
                  Alamat Email untuk Balasan
                </label>
                <span className="text-[11px] text-[#8E9B8E] font-medium">Opsional</span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#7A6F64] dark:text-[#A89F94] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com (opsional)"
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl bg-white/85 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-xs"
                />
              </div>
              <p className="font-sans text-[11px] text-[#7A6F64] dark:text-[#A89F94] leading-relaxed mt-2 pl-1">
                Isi emailmu jika ingin menerima surat balasan &amp; motivasi dari Nalar Nanti. Kosongkan jika hanya
                ingin bercerita.
              </p>
            </div>

            {/* Jaminan Privasi & Tombol Kirim */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !story.trim()}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] hover:brightness-105 text-[#FAF7F2] font-semibold text-sm shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                    <span>Sedang Menyampaikan Ceritamu...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#FAF7F2] group-hover:translate-x-1 transition-transform" />
                    <span>Kirim Cerita ke Nalar Nanti</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-[#7A6F64] dark:text-[#A89F94]">
                <Lock className="w-3.5 h-3.5 text-[#8E9B8E] shrink-0" />
                <span>
                  Ceritamu 100% aman dan hanya dibaca oleh admin Nalar Nanti.
                </span>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

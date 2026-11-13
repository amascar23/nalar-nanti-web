"use client";

import React, { useState } from "react";
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
} from "lucide-react";

type RequestMode = "Request Tema / Cerita" | "Titip Kata-Kata Sendiri";
type NuanceOption =
  | "Refleksi Islami"
  | "Tenang & Hati"
  | "Proses & Bertumbuh"
  | "Bebas";

export default function RequestSection() {
  const [activeTab, setActiveTab] =
    useState<RequestMode>("Request Tema / Cerita");
  const [name, setName] = useState<string>("");
  const [nuance, setNuance] = useState<NuanceOption>("Refleksi Islami");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const nuanceOptions: NuanceOption[] = [
    "Refleksi Islami",
    "Tenang & Hati",
    "Proses & Bertumbuh",
    "Bebas",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      jenis_kiriman: activeTab,
      pengirim: name.trim() || "Anonim",
      nuansa: nuance,
      pesan: message.trim(),
      _subject: "Kiriman Baru Nalar Nanti — " + activeTab,
      _template: "table",
    };

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/nalarnantii@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        setMessage("");
        setName("");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setErrorMessage(
          errorData.message ||
            "Mohon maaf, terjadi kendala saat mengirimkan pesan. Silakan coba sesaat lagi."
        );
      }
    } catch {
      setErrorMessage(
        "Gagal terhubung ke jaringan. Pastikan internetmu aktif dan coba kirim kembali."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setErrorMessage(null);
    setMessage("");
    setName("");
  };

  return (
    <section
      id="titip-nalar"
      className="py-14 sm:py-20 bg-transparent border-t border-[#E5DDD0]/60 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] bg-[#F3EDE2] rounded-full blur-3xl opacity-80 pointer-events-none -z-10" />
      <div className="absolute top-10 right-4 sm:right-12 w-48 sm:w-64 h-48 sm:h-64 bg-[#C8A98E]/10 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-4 sm:left-12 w-48 sm:w-64 h-48 sm:h-64 bg-[#8E9B8E]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Header Seksi */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          {/* Badge Kecil */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EDE2] border border-[#E5DDD0] text-xs font-medium text-[#7A6F64] mb-3 sm:mb-4 shadow-soft">
            <Heart className="w-3.5 h-3.5 text-[#C8A98E] fill-[#C8A98E]/20" />
            <span>Ruang Berbagi Cerita</span>
          </div>

          {/* Judul Utama dengan Font Lora */}
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-[#3E362E] tracking-tight mb-3">
            Titip Nalar & Request Kata
          </h2>

          {/* Subjudul Singkat */}
          <p className="font-sans text-xs sm:text-base text-[#7A6F64] leading-relaxed max-w-xl mx-auto">
            Punya tema yang ingin dibahas atau kalimat refleksi yang ingin
            dititipkan? Kirimkan secara privat ke ruang admin Nalar Nanti.
          </p>
        </div>

        {/* Kartu Formulir Utama */}
        <div className="max-w-2xl mx-auto bg-[#F3EDE2] border border-[#E5DDD0] rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-card relative">
          {isSubmitted ? (
            /* Kotak Konfirmasi Lembut (Success State) */
            <div className="py-8 sm:py-10 text-center animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#8E9B8E]/15 border border-[#8E9B8E]/30 flex items-center justify-center mx-auto mb-5 text-[#637063] shadow-soft">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#8E9B8E]" />
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block mb-1">
                Pesan Terkirim
              </span>

              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#3E362E] mb-3">
                Terima kasih sudah menitipkan nalar.
              </h3>

              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] max-w-md mx-auto leading-relaxed mb-8">
                Pesanmu sudah diterima secara privat oleh admin Nalar Nanti.
                Setiap cerita dan titipan kata akan dibaca dengan tenang untuk
                menjadi pengingat teduh bersama.
              </p>

              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#B9967A] transition-all shadow-soft active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Kirim Pesan Lainnya</span>
              </button>
            </div>
          ) : (
            /* Formulir Input */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dua Tab Pilihan Mode */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#7A6F64] mb-2.5">
                  Pilih Jenis Kiriman
                </label>
                <div className="p-1.5 bg-[#FAF7F2] border border-[#E5DDD0] rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-1.5 shadow-soft">
                  <button
                    type="button"
                    onClick={() => setActiveTab("Request Tema / Cerita")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-98 ${
                      activeTab === "Request Tema / Cerita"
                        ? "bg-[#3E362E] text-[#FAF7F2] shadow-soft"
                        : "text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#F3EDE2]/60"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Request Tema / Cerita</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("Titip Kata-Kata Sendiri")}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-98 ${
                      activeTab === "Titip Kata-Kata Sendiri"
                        ? "bg-[#3E362E] text-[#FAF7F2] shadow-soft"
                        : "text-[#7A6F64] hover:text-[#3E362E] hover:bg-[#F3EDE2]/60"
                    }`}
                  >
                    <Feather className="w-4 h-4" />
                    <span>Titip Kata-Kata Sendiri</span>
                  </button>
                </div>
              </div>

              {/* Isian 1: Nama / Inisial / Username IG (Opsional) */}
              <div>
                <label
                  htmlFor="pengirim"
                  className="block text-xs font-semibold text-[#3E362E] mb-1.5"
                >
                  Nama / Inisial / Username IG
                </label>
                <input
                  id="pengirim"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Sahabat Nalar / @username / Hamba Allah"
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] text-base sm:text-sm text-[#3E362E] placeholder-[#7A6F64]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
                />
                <p className="text-[11px] text-[#7A6F64]/80 mt-1.5">
                  Opsional — kosongkan jika ingin mengirim sebagai Anonim
                </p>
              </div>

              {/* Isian 2: Nuansa Tulisan (Pill Options) */}
              <div>
                <label className="block text-xs font-semibold text-[#3E362E] mb-2">
                  Nuansa Tulisan
                </label>
                <div className="flex flex-wrap gap-2">
                  {nuanceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setNuance(option)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium border transition-all active:scale-95 ${
                        nuance === option
                          ? "bg-[#C8A98E] text-[#FAF7F2] border-[#C8A98E] shadow-soft font-semibold"
                          : "bg-[#FAF7F2] text-[#7A6F64] border-[#E5DDD0] hover:border-[#C8A98E]/60 hover:text-[#3E362E]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Isian 3: Kolom Pesan Utama (Textarea, Wajib Diisi) */}
              <div>
                <label
                  htmlFor="pesan"
                  className="block text-xs font-semibold text-[#3E362E] mb-1.5"
                >
                  {activeTab === "Request Tema / Cerita"
                    ? "Tema atau perasaan apa yang ingin dibahas? *"
                    : "Tuliskan kata-kata motivasi atau refleksimu *"}
                </label>
                <textarea
                  id="pesan"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={
                    activeTab === "Request Tema / Cerita"
                      ? "Contoh: Tolong buatkan pengingat tentang ikhlas dan sabar saat rencana belum berjalan sesuai harapan..."
                      : "Tulis kalimat refleksimu di sini..."
                  }
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#E5DDD0] text-base sm:text-sm text-[#3E362E] placeholder-[#7A6F64]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft leading-relaxed resize-y"
                />
              </div>

              {/* Error Alert jika terjadi kegagalan */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-[#EAE1D3]/80 border border-[#C8A98E] text-xs text-[#886950] flex items-start gap-2.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-[#C8A98E] shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Tombol Kirim Utama & Catatan Privasi */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !message.trim()}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#B9967A] transition-all shadow-soft active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                      <span>Sedang mengirim...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#FAF7F2] group-hover:translate-x-0.5 transition-transform" />
                      <span>Kirim ke Ruang Nalar</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] text-[#7A6F64]">
                  <Lock className="w-3 h-3 text-[#8E9B8E]" />
                  <span>
                    Pesan dikirimkan secara privat dan aman langsung ke ruang admin.
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}


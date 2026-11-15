"use client";

import React, { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  Lock,
  Unlock,
  Calendar,
  Trash2,
  Check,
  Feather,
  Clock,
  Send,
  Eye,
  X,
  FileText,
  Mail,
  ShieldCheck,
  Plus,
  BookOpen,
} from "lucide-react";

// Tipe Data untuk Tab 1: Jejak Syukur
interface GratitudeEntry {
  id: string;
  date: string; // ISO string
  dateDisplay: string;
  items: [string, string, string];
}

// Tipe Data untuk Tab 2: Kapsul Waktu
interface TimeCapsuleEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string; // ISO string
  unlockDate: string; // ISO string
  daysLocked: number;
}

const STORAGE_KEY_SYUKUR = "nalar_nanti_syukur";
const STORAGE_KEY_KAPSUL = "nalar_nanti_kapsul";

export default function PersonalSpaceSection() {
  const [activeTab, setActiveTab] = useState<"syukur" | "kapsul">("syukur");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // State untuk Tab 1 (Syukur)
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>([]);
  const [item1, setItem1] = useState("");
  const [item2, setItem2] = useState("");
  const [item3, setItem3] = useState("");
  const [isSyukurSavedFeedback, setIsSyukurSavedFeedback] = useState(false);

  // State untuk Tab 2 (Kapsul Waktu)
  const [capsuleEntries, setCapsuleEntries] = useState<TimeCapsuleEntry[]>([]);
  const [capsuleTitle, setCapsuleTitle] = useState("");
  const [capsuleContent, setCapsuleContent] = useState("");
  const [capsuleDays, setCapsuleDays] = useState<number>(7);
  const [isCapsuleSavedFeedback, setIsCapsuleSavedFeedback] = useState(false);
  const [openedCapsule, setOpenedCapsule] = useState<TimeCapsuleEntry | null>(null);

  // Baca data dari localStorage hanya di client setelah mount (bebas hydration error)
  useEffect(() => {
    setIsMounted(true);

    try {
      if (typeof window !== "undefined") {
        const rawSyukur = localStorage.getItem(STORAGE_KEY_SYUKUR);
        if (rawSyukur) {
          setGratitudeEntries(JSON.parse(rawSyukur));
        }

        const rawKapsul = localStorage.getItem(STORAGE_KEY_KAPSUL);
        if (rawKapsul) {
          setCapsuleEntries(JSON.parse(rawKapsul));
        }
      }
    } catch (e) {
      console.warn("Gagal membaca data jeda dari localStorage", e);
    }
  }, []);

  // Simpan catatan syukur ke localStorage
  const handleSaveGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    if (!item1.trim() && !item2.trim() && !item3.trim()) {
      alert("Tuliskan setidaknya satu hal yang kamu syukuri hari ini.");
      return;
    }

    const now = new Date();
    const dateDisplay = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);

    const newEntry: GratitudeEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      date: now.toISOString(),
      dateDisplay,
      items: [
        item1.trim() || "Napas yang masih tenang",
        item2.trim() || "Kebaikan kecil yang ditemui",
        item3.trim() || "Kesempatan untuk memperbaiki diri",
      ],
    };

    const updated = [newEntry, ...gratitudeEntries];
    setGratitudeEntries(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SYUKUR, JSON.stringify(updated));
      } catch (e) {
        console.error("Gagal menyimpan riwayat syukur:", e);
      }
    }

    // Kirim catatan syukur secara anonim ke backend API -> Google Sheets admin
    try {
      fetch("/api/jeda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "syukur",
          items: newEntry.items,
          dateDisplay,
          timestamp: now.toISOString(),
        }),
      }).catch((err) => console.log("Catatan tersimpan lokal:", err));
    } catch (_) {
      // Abaikan jika offline / fetch gagal
    }

    // Reset input form
    setItem1("");
    setItem2("");
    setItem3("");
    setIsSyukurSavedFeedback(true);
    setTimeout(() => setIsSyukurSavedFeedback(false), 3000);
  };

  // Hapus satu entri syukur
  const handleDeleteGratitude = (id: string) => {
    const updated = gratitudeEntries.filter((item) => item.id !== id);
    setGratitudeEntries(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SYUKUR, JSON.stringify(updated));
      } catch (e) {
        console.error("Gagal menghapus entri syukur:", e);
      }
    }
  };

  // Simpan surat kapsul waktu ke localStorage
  const handleSaveCapsule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!capsuleContent.trim()) {
      alert("Tuliskan isi surat atau harapanmu terlebih dahulu.");
      return;
    }

    const now = new Date();
    const unlockDate = new Date(now.getTime() + capsuleDays * 24 * 60 * 60 * 1000);

    const newCapsule: TimeCapsuleEntry = {
      id: `capsule-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: capsuleTitle.trim() || "Surat untuk Masa Depan",
      content: capsuleContent.trim(),
      createdAt: now.toISOString(),
      unlockDate: unlockDate.toISOString(),
      daysLocked: capsuleDays,
    };

    const updated = [newCapsule, ...capsuleEntries];
    setCapsuleEntries(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_KAPSUL, JSON.stringify(updated));
      } catch (e) {
        console.error("Gagal menyimpan kapsul waktu:", e);
      }
    }

    // Kirim kapsul waktu secara anonim ke backend API -> Google Sheets admin
    try {
      fetch("/api/jeda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "kapsul",
          title: newCapsule.title,
          content: newCapsule.content,
          daysLocked: newCapsule.daysLocked,
          unlockDate: new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(unlockDate),
          timestamp: now.toISOString(),
        }),
      }).catch((err) => console.log("Kapsul waktu tersimpan lokal:", err));
    } catch (_) {
      // Abaikan jika offline / fetch gagal
    }

    // Reset formulir
    setCapsuleTitle("");
    setCapsuleContent("");
    setIsCapsuleSavedFeedback(true);
    setTimeout(() => setIsCapsuleSavedFeedback(false), 3000);
  };

  // Hapus surat kapsul waktu
  const handleDeleteCapsule = (id: string) => {
    if (confirm("Apakah kamu yakin ingin menghapus surat kapsul waktu ini?")) {
      const updated = capsuleEntries.filter((item) => item.id !== id);
      setCapsuleEntries(updated);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY_KAPSUL, JSON.stringify(updated));
        } catch (e) {
          console.error("Gagal menghapus kapsul waktu:", e);
        }
      }
      if (openedCapsule?.id === id) {
        setOpenedCapsule(null);
      }
    }
  };

  // Hitung jumlah hari unik meluangkan jeda
  const uniqueDaysCount = (() => {
    if (!gratitudeEntries.length) return 0;
    const dateStrings = gratitudeEntries.map((e) => e.date.split("T")[0]);
    return new Set(dateStrings).size;
  })();

  // Helper status unlock kapsul waktu
  const getCapsuleStatus = (entry: TimeCapsuleEntry) => {
    const now = new Date();
    const unlock = new Date(entry.unlockDate);
    const diffMs = unlock.getTime() - now.getTime();
    const isUnlocked = diffMs <= 0;

    const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return {
      isUnlocked,
      daysLeft: Math.max(1, daysLeft),
      createdDisplay: new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(entry.createdAt)),
      unlockDisplay: new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(unlock),
    };
  };

  return (
    <section
      id="ruang-jeda"
      className="py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#E5DDD0]/60 dark:border-[#3A332E]/60 scroll-mt-20"
    >
      {/* Header Utama Seksi */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FAF7F2] to-[#EAE1D3] dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] text-xs font-semibold border border-[#DDD3C3] dark:border-[#443C36] shadow-soft mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#886950] dark:text-[#C8A98E]" />
          <span>Ruang Jeda Pribadi • Aman &amp; Anonim</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-2">
          Hening Sejenak, Rawat Hatimu Sendiri
        </h2>
        <p className="text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
          Semua catatan di bawah ini tersimpan khusus di browser perangkatmu sebagai ruang hening pribadi,
          bebas dari penilaian siapa pun.
        </p>
      </div>

      {/* Kontainer Kartu Utama */}
      <div className="bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl shadow-[0_12px_36px_-10px_rgba(200,169,142,0.20)] dark:shadow-none p-5 sm:p-8 md:p-10 relative overflow-hidden">
        {/* Dekorasi Garis Halus */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(#C8A98E_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        {/* Tab Switcher: Tab 1 (Syukur) vs Tab 2 (Kapsul Waktu) */}
        <div className="flex p-1.5 bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#1E1B18] dark:to-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] rounded-2xl max-w-md mx-auto mb-8 relative z-10 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab("syukur")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-98 ${
              activeTab === "syukur"
                ? "bg-gradient-to-r from-white/95 to-[#FAF7F2]/95 dark:from-[#26221F] dark:to-[#1C1917] text-[#3E362E] dark:text-[#EDE6DC] shadow-soft border border-[#E5DDD0] dark:border-[#3A332E]"
                : "text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC]"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                activeTab === "syukur" ? "text-[#C8A98E] fill-[#C8A98E]/20" : "text-[#7A6F64] dark:text-[#A89F94]"
              }`}
            />
            <span>Jejak Jeda & Syukur</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("kapsul")}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-98 ${
              activeTab === "kapsul"
                ? "bg-gradient-to-r from-white/95 to-[#FAF7F2]/95 dark:from-[#26221F] dark:to-[#1C1917] text-[#3E362E] dark:text-[#EDE6DC] shadow-soft border border-[#E5DDD0] dark:border-[#3A332E]"
                : "text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC]"
            }`}
          >
            <Clock
              className={`w-4 h-4 ${
                activeTab === "kapsul" ? "text-[#886950] dark:text-[#C8A98E]" : "text-[#7A6F64] dark:text-[#A89F94]"
              }`}
            />
            <span>Kapsul Waktu Nalar</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: JEJAK JEDA & SYUKUR (DAILY GRATITUDE CHECK-IN) */}
        {/* ========================================================================= */}
        {activeTab === "syukur" && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Header Tab & Penghitung Hari */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DDD0] dark:border-[#3A332E]">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block mb-1">
                  Daily Gratitude Check-in
                </span>
                <p className="font-serif text-sm sm:text-base font-semibold text-[#3E362E] dark:text-[#EDE6DC] leading-relaxed">
                  Sebelum hari berganti, luangkan sejenak untuk menuliskan 3 hal sederhana yang patut disyukuri.
                </p>
              </div>

              {/* Penghitung Hari Lembut */}
              <div
                suppressHydrationWarning
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F3EDE2] dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-medium text-[#3E362E] dark:text-[#EDE6DC] shrink-0"
              >
                <span className="text-sm">🌿</span>
                <span suppressHydrationWarning>
                  {isMounted && uniqueDaysCount > 0
                    ? `Sudah ${uniqueDaysCount} hari kamu meluangkan jeda`
                    : "Mulai jejak jeda pertamamu"}
                </span>
              </div>
            </div>

            {/* Formulir 3 Baris Syukur */}
            <form onSubmit={handleSaveGratitude} className="space-y-3.5">
              <div className="space-y-2.5">
                {/* Baris 1 */}
                <div className="flex items-center gap-3 p-1.5 sm:p-2 bg-gradient-to-r from-white/80 to-[#FAF7F2]/70 dark:from-[#1E1B18]/70 dark:to-[#141210]/70 border border-[#E5DDD0] dark:border-[#3A332E] rounded-2xl focus-within:border-[#C8A98E] focus-within:ring-1 focus-within:ring-[#C8A98E] transition-all shadow-xs">
                  <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-[#EAE1D3] dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] text-xs font-serif font-bold flex items-center justify-center shrink-0 border border-[#DDD3C3]/60 dark:border-[#443C36]">
                    1.
                  </span>
                  <input
                    type="text"
                    value={item1}
                    onChange={(e) => setItem1(e.target.value)}
                    placeholder="Contoh: Secangkir teh hangat di pagi hari yang menenangkan..."
                    maxLength={140}
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none"
                  />
                </div>

                {/* Baris 2 */}
                <div className="flex items-center gap-3 p-1.5 sm:p-2 bg-gradient-to-r from-white/80 to-[#FAF7F2]/70 dark:from-[#1E1B18]/70 dark:to-[#141210]/70 border border-[#E5DDD0] dark:border-[#3A332E] rounded-2xl focus-within:border-[#C8A98E] focus-within:ring-1 focus-within:ring-[#C8A98E] transition-all shadow-xs">
                  <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-[#EAE1D3] dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] text-xs font-serif font-bold flex items-center justify-center shrink-0 border border-[#DDD3C3]/60 dark:border-[#443C36]">
                    2.
                  </span>
                  <input
                    type="text"
                    value={item2}
                    onChange={(e) => setItem2(e.target.value)}
                    placeholder="Contoh: Kabar baik atau sapaan hangat dari keluarga..."
                    maxLength={140}
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none"
                  />
                </div>

                {/* Baris 3 */}
                <div className="flex items-center gap-3 p-1.5 sm:p-2 bg-gradient-to-r from-white/80 to-[#FAF7F2]/70 dark:from-[#1E1B18]/70 dark:to-[#141210]/70 border border-[#E5DDD0] dark:border-[#3A332E] rounded-2xl focus-within:border-[#C8A98E] focus-within:ring-1 focus-within:ring-[#C8A98E] transition-all shadow-xs">
                  <span className="w-7 h-7 rounded-xl bg-gradient-to-r from-[#FAF7F2] to-[#EAE1D3] dark:from-[#322C27] dark:to-[#26221F] text-[#3E362E] dark:text-[#EDE6DC] text-xs font-serif font-bold flex items-center justify-center shrink-0 border border-[#DDD3C3]/60 dark:border-[#443C36]">
                    3.
                  </span>
                  <input
                    type="text"
                    value={item3}
                    onChange={(e) => setItem3(e.target.value)}
                    placeholder="Contoh: Napas yang masih lega dan hati yang tetap bertahan..."
                    maxLength={140}
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none"
                  />
                </div>
              </div>

              {/* Tombol Simpan & Pesan Feedback */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] text-xs sm:text-sm font-semibold hover:brightness-105 transition-all shadow-soft active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Simpan Jejak Hari Ini</span>
                </button>

                {isSyukurSavedFeedback && (
                  <span className="text-xs text-[#8E9B8E] font-medium inline-flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-3.5 h-3.5" />
                    <span>Jejak syukur berhasil tersimpan di perambanmu.</span>
                  </span>
                )}
              </div>
            </form>

            {/* Riwayat Catatan Syukur Hari Sebelumnya */}
            <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#3A332E]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-sm sm:text-base font-semibold text-[#3E362E] dark:text-[#EDE6DC] flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#886950] dark:text-[#C8A98E]" />
                  <span>Riwayat Jejak Syukur</span>
                </h3>
                <span className="text-[11px] text-[#7A6F64] dark:text-[#A89F94]">
                  {isMounted ? `${gratitudeEntries.length} catatan tersimpan` : "Memuat..."}
                </span>
              </div>

              {!isMounted ? (
                <div className="p-6 text-center rounded-2xl bg-[#F3EDE2]/60 dark:bg-[#1E1B18]/60 border border-[#E5DDD0] dark:border-[#3A332E] text-xs text-[#7A6F64] dark:text-[#A89F94] animate-pulse">
                  Memuat catatan riwayat syukur...
                </div>
              ) : gratitudeEntries.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-[#F3EDE2]/60 dark:bg-[#1E1B18]/60 border border-[#E5DDD0] dark:border-[#3A332E] text-xs text-[#7A6F64] dark:text-[#A89F94]">
                  Belum ada jejak syukur yang tersimpan. Tuliskan 3 hal sederhana hari ini untuk memulai kebiasaan heningmu.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[360px] overflow-y-auto pr-1">
                  {gratitudeEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-2xl bg-gradient-to-br from-white/80 to-[#FAF7F2]/75 dark:from-[#1E1B18]/80 dark:to-[#141210]/70 border border-[#E5DDD0] dark:border-[#3A332E] text-left relative group hover:border-[#C8A98E] hover:-translate-y-0.5 transition-all shadow-[0_4px_16px_-4px_rgba(200,169,142,0.12)] dark:shadow-none"
                    >
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
                        <span className="text-[11px] font-semibold text-[#886950] dark:text-[#C8A98E]">
                          {entry.dateDisplay}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteGratitude(entry.id)}
                          title="Hapus catatan ini"
                          className="opacity-60 group-hover:opacity-100 p-1 text-[#7A6F64] dark:text-[#A89F94] hover:text-[#a04b4b] transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <ul className="space-y-1.5 text-xs text-[#3E362E] dark:text-[#EDE6DC]">
                        {entry.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#C8A98E] font-bold shrink-0">•</span>
                            <span className="line-clamp-2 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: KAPSUL WAKTU NALAR (SURAT UNTUK DIRI DI MASA DEPAN) */}
        {/* ========================================================================= */}
        {activeTab === "kapsul" && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Header Tab */}
            <div className="pb-4 border-b border-[#E5DDD0] dark:border-[#3A332E]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block mb-1">
                Surat untuk Diri di Masa Depan
              </span>
              <p className="font-serif text-sm sm:text-base font-semibold text-[#3E362E] dark:text-[#EDE6DC] leading-relaxed">
                Titipkan doa, harapan, atau pengingat untuk dirimu sendiri di masa depan. Surat ini akan tersegel hingga waktunya tiba.
              </p>
            </div>

            {/* Formulir Kapsul Waktu */}
            <form onSubmit={handleSaveCapsule} className="space-y-4">
              {/* Input Judul Surat */}
              <div>
                <label
                  htmlFor="capsule-title"
                  className="block text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-1.5"
                >
                  Judul Surat
                </label>
                <input
                  id="capsule-title"
                  type="text"
                  maxLength={50}
                  value={capsuleTitle}
                  onChange={(e) => setCapsuleTitle(e.target.value)}
                  placeholder="Contoh: Untuk diriku bulan depan / Pengingat saat lelah"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917] dark:to-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
                />
              </div>

              {/* Textarea Isi Surat */}
              <div>
                <label
                  htmlFor="capsule-content"
                  className="block text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-1.5"
                >
                  Isi Surat & Harapan <span className="text-[#C8A98E]">*</span>
                </label>
                <textarea
                  id="capsule-content"
                  rows={4}
                  required
                  value={capsuleContent}
                  onChange={(e) => setCapsuleContent(e.target.value)}
                  placeholder="Ceritakan apa yang sedang kamu rasakan hari ini, apa yang sedang kamu doakan, dan apa yang ingin kamu ingatkan pada dirimu nanti..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-white/80 to-[#FAF7F2]/80 dark:from-[#1C1917] dark:to-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft leading-relaxed resize-none"
                />
              </div>

              {/* Pilihan Waktu Buka (Pill Buttons) */}
              <div>
                <label className="block text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-2">
                  Segel Hingga Kapan?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "7 Hari Lagi", days: 7 },
                    { label: "14 Hari Lagi", days: 14 },
                    { label: "30 Hari Lagi", days: 30 },
                  ].map((option) => (
                    <button
                      key={option.days}
                      type="button"
                      onClick={() => setCapsuleDays(option.days)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 border ${
                        capsuleDays === option.days
                          ? "bg-gradient-to-r from-[#D4B59D] via-[#C8A98E] to-[#B9967A] text-[#FAF7F2] border-[#C8A98E] shadow-soft"
                          : "bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#1E1B18] dark:to-[#26221F] text-[#7A6F64] dark:text-[#A89F94] border-[#E5DDD0] dark:border-[#3A332E] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:border-[#C8A98E]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tombol Segel Kapsul Waktu */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#3E362E] to-[#52473D] dark:from-[#D4B59D] dark:via-[#C8A98E] dark:to-[#B9967A] text-[#FAF7F2] text-xs sm:text-sm font-semibold hover:brightness-105 transition-all shadow-soft active:scale-95 group"
                >
                  <Lock className="w-4 h-4 text-[#C8A98E] dark:text-[#FAF7F2] group-hover:scale-110 transition-transform" />
                  <span>Segel Kapsul Waktu</span>
                </button>

                {isCapsuleSavedFeedback && (
                  <span className="text-xs text-[#8E9B8E] font-medium inline-flex items-center gap-1.5 animate-fadeIn">
                    <Check className="w-3.5 h-3.5" />
                    <span>Surat berhasil disegel dan disimpan di browser.</span>
                  </span>
                )}
              </div>
            </form>

            {/* Daftar Kapsul Waktu Tersimpan */}
            <div className="pt-4 border-t border-[#E5DDD0] dark:border-[#3A332E]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-serif text-sm sm:text-base font-semibold text-[#3E362E] dark:text-[#EDE6DC] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#886950] dark:text-[#C8A98E]" />
                  <span>Daftar Kapsul Waktu Tersimpan</span>
                </h3>
                <span className="text-[11px] text-[#7A6F64] dark:text-[#A89F94]">
                  {isMounted ? `${capsuleEntries.length} surat disegel` : "Memuat..."}
                </span>
              </div>

              {!isMounted ? (
                <div className="p-6 text-center rounded-2xl bg-[#F3EDE2]/60 dark:bg-[#1E1B18]/60 border border-[#E5DDD0] dark:border-[#3A332E] text-xs text-[#7A6F64] dark:text-[#A89F94] animate-pulse">
                  Memuat surat kapsul waktu...
                </div>
              ) : capsuleEntries.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-[#F3EDE2]/60 dark:bg-[#1E1B18]/60 border border-[#E5DDD0] dark:border-[#3A332E] text-xs text-[#7A6F64] dark:text-[#A89F94]">
                  Belum ada surat masa depan yang disegel. Tuliskan pesan untuk dirimu beberapa hari ke depan.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {capsuleEntries.map((capsule) => {
                    const status = getCapsuleStatus(capsule);

                    return (
                      <div
                        key={capsule.id}
                        className={`p-4 sm:p-5 rounded-2xl border text-left relative transition-all shadow-soft hover:-translate-y-0.5 ${
                          status.isUnlocked
                            ? "bg-gradient-to-br from-white/90 to-[#FAF7F2]/80 dark:bg-[#26221F] border-[#8E9B8E]/50 ring-1 ring-[#8E9B8E]/30"
                            : "bg-gradient-to-br from-white/80 to-[#FAF7F2]/75 dark:from-[#1E1B18]/80 dark:to-[#141210]/70 border-[#E5DDD0] dark:border-[#3A332E]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 pb-2 mb-2 border-b border-[#E5DDD0] dark:border-[#3A332E]">
                          <div>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
                                status.isUnlocked
                                  ? "bg-[#8E9B8E]/20 text-[#4c5c4e] dark:text-[#8E9B8E]"
                                  : "bg-[#EAE1D3] dark:bg-[#322C27] text-[#886950] dark:text-[#C8A98E]"
                              }`}
                            >
                              {status.isUnlocked ? (
                                <>
                                  <Unlock className="w-3 h-3 text-[#8E9B8E]" />
                                  <span>✨ Siap Dibuka!</span>
                                </>
                              ) : (
                                <>
                                  <Lock className="w-3 h-3 text-[#886950] dark:text-[#C8A98E]" />
                                  <span>Tersegel • {status.daysLeft} hari lagi</span>
                                </>
                              )}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-[#3E362E] dark:text-[#EDE6DC] line-clamp-1">
                              {capsule.title}
                            </h4>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteCapsule(capsule.id)}
                            title="Hapus surat kapsul"
                            className="text-[#7A6F64] dark:text-[#A89F94] hover:text-[#a04b4b] p-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-[11px] text-[#7A6F64] dark:text-[#A89F94] space-y-1 mb-3">
                          <p>
                            Ditulis: <span>{status.createdDisplay}</span>
                          </p>
                          <p>
                            Waktu buka:{" "}
                            <span className="font-medium text-[#3E362E] dark:text-[#EDE6DC]">
                              {status.unlockDisplay}
                            </span>
                          </p>
                        </div>

                        {/* Aksi Berdasarkan Status Kapsul */}
                        {status.isUnlocked ? (
                          <button
                            type="button"
                            onClick={() => setOpenedCapsule(capsule)}
                            className="w-full py-2 px-3 rounded-xl bg-[#8E9B8E] hover:bg-[#7d8a7d] text-[#FAF7F2] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-soft active:scale-95"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Buka Surat Masa Lalu</span>
                          </button>
                        ) : (
                          <div className="p-2.5 rounded-xl bg-[#EAE1D3]/50 dark:bg-[#322C27]/50 border border-[#DDD3C3] dark:border-[#443C36] text-[11px] text-[#7A6F64] dark:text-[#A89F94] text-center flex items-center justify-center gap-1.5">
                            <Lock className="w-3 h-3 text-[#886950] dark:text-[#C8A98E]" />
                            <span>Isi surat terkunci hingga {status.unlockDisplay}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL BACA SURAT KAPSUL MASA LALU YANG SUDAH TERBUKA */}
      {/* ========================================================================= */}
      {openedCapsule && (
        <div
          className="fixed inset-0 z-50 bg-[#3E362E]/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setOpenedCapsule(null)}
        >
          <div
            className="bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-[0_20px_50px_-15px_rgba(200,169,142,0.25)] relative text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal Surat */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E5DDD0] dark:border-[#3A332E] mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#EAE1D3] dark:bg-[#322C27] border border-[#DDD3C3] dark:border-[#443C36] flex items-center justify-center text-[#886950] dark:text-[#C8A98E]">
                  <Mail className="w-4 h-4 text-[#886950] dark:text-[#C8A98E]" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8E9B8E] block">
                    Surat dari Masa Lalu
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                    {openedCapsule.title}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpenedCapsule(null)}
                aria-label="Tutup jendela surat"
                className="p-1.5 rounded-full text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] hover:bg-[#F3EDE2] dark:hover:bg-[#1C1917] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Kertas Surat Personal */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F3EDE2] dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-sm text-[#3E362E] dark:text-[#EDE6DC] relative mb-4">
              <div className="text-[11px] text-[#7A6F64] dark:text-[#A89F94] mb-3 pb-2 border-b border-[#E5DDD0]/70 dark:border-[#3A332E] flex items-center justify-between">
                <span>Ditulis pada: {new Date(openedCapsule.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span className="font-serif italic">— Nalar Nanti</span>
              </div>
              <p className="font-serif italic text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                {openedCapsule.content}
              </p>
            </div>

            {/* Tombol Tutup */}
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpenedCapsule(null)}
                className="px-5 py-2.5 rounded-full bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] hover:bg-[#F3EDE2] dark:hover:bg-[#26221F] transition-all"
              >
                Tutup Surat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

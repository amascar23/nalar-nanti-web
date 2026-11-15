"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Download,
  Copy,
  Check,
  RotateCcw,
  Feather,
  Quote as QuoteIcon,
  Palette,
  Loader2,
  Share2,
  Heart,
  Eye,
  Sliders,
  Type,
  User,
} from "lucide-react";

// Tipe untuk Nuansa Kertas
export type PaperThemeId = "warm-cream" | "soft-sage" | "muted-latte";

interface PaperThemeConfig {
  id: PaperThemeId;
  name: string;
  subtitle: string;
  bgHex: string;
  cardHex: string;
  borderHex: string;
  accentHex: string;
  textHex: string;
  mutedHex: string;
  washiHex: string;
  canvasConfig: {
    bgTop: string;
    bgBottom: string;
    cardFront: string;
    cardBack: string;
    cardBorder: string;
    accent: string;
    text: string;
    muted: string;
    washi: string;
    glow: string;
  };
}

const PAPER_THEMES: Record<PaperThemeId, PaperThemeConfig> = {
  "warm-cream": {
    id: "warm-cream",
    name: "Warm Cream",
    subtitle: "Hangat & Tenang",
    bgHex: "#FAF7F2",
    cardHex: "#F3EDE2",
    borderHex: "#E5DDD0",
    accentHex: "#C8A98E",
    textHex: "#3E362E",
    mutedHex: "#7A6F64",
    washiHex: "#DFCBB2",
    canvasConfig: {
      bgTop: "#FAF7F2",
      bgBottom: "#F1E7D8",
      cardFront: "#FAF7F2",
      cardBack: "#E8DEC9",
      cardBorder: "#E5DDD0",
      accent: "#C8A98E",
      text: "#3E362E",
      muted: "#7A6F64",
      washi: "#DFCBB2",
      glow: "#E6D3BC",
    },
  },
  "soft-sage": {
    id: "soft-sage",
    name: "Soft Sage",
    subtitle: "Sejuk & Damai",
    bgHex: "#F2F6F2",
    cardHex: "#E4ECE4",
    borderHex: "#CCDACC",
    accentHex: "#8E9B8E",
    textHex: "#2F3A32",
    mutedHex: "#5E6E61",
    washiHex: "#C5D4C5",
    canvasConfig: {
      bgTop: "#F2F6F2",
      bgBottom: "#E2ECE2",
      cardFront: "#F4F8F4",
      cardBack: "#DCE8DC",
      cardBorder: "#CCDACC",
      accent: "#7F9681",
      text: "#2F3A32",
      muted: "#5E6E61",
      washi: "#CCDACC",
      glow: "#D6E5D6",
    },
  },
  "muted-latte": {
    id: "muted-latte",
    name: "Muted Latte",
    subtitle: "Teduh & Klasik",
    bgHex: "#F5EDE4",
    cardHex: "#EAE0D3",
    borderHex: "#D8C6B3",
    accentHex: "#B58E6B",
    textHex: "#3E362E",
    mutedHex: "#786757",
    washiHex: "#D9C4B0",
    canvasConfig: {
      bgTop: "#F5EDE4",
      bgBottom: "#E8DACB",
      cardFront: "#FAF5EF",
      cardBack: "#E4D4C3",
      cardBorder: "#D8C6B3",
      accent: "#B58E6B",
      text: "#3E362E",
      muted: "#786757",
      washi: "#D9C4B0",
      glow: "#EADCCE",
    },
  },
};

// Inspirasi teks refleksi cepat
const INSPIRATION_PRESETS = [
  {
    label: "Jeda Sejenak",
    title: "Jeda Sejenak",
    text: "Di antara hiruk-pikuk yang tak kunjung reda, izinkan hatimu beristirahat. Apa yang ditakdirkan untukmu takkan pernah melewatkanmu.",
  },
  {
    label: "Doa Ketenangan",
    title: "Doa Hari Ini",
    text: "Ya Rabb, lapangkan dadaku saat sempit, jernihkan pikiranku saat kalut, dan dekap hatiku dengan rasa percaya pada rencana-Mu.",
  },
  {
    label: "Sabar & Waktu",
    title: "Tentang Waktu",
    text: "Bunga tidak mekar sekaligus dalam satu malam. Bersabarlah dengan prosesmu sendiri, setiap langkah kecilmu tetaplah sebuah kemajuan.",
  },
  {
    label: "Rasa Syukur",
    title: "Ruang Syukur",
    text: "Terkadang hal paling berharga bukanlah yang berlimpah, melainkan napas yang masih tenang dan hati yang masih mampu berprasangka baik.",
  },
];

export default function CustomCardStudio() {
  const [title, setTitle] = useState("Catatan Hari Ini");
  const [quoteText, setQuoteText] = useState(
    "Di antara hiruk-pikuk yang tak kunjung reda, izinkan hatimu jeda sejenak. Apa yang ditakdirkan untukmu takkan pernah melewatkanmu."
  );
  const [author, setAuthor] = useState("Sahabat Nalar");
  const [selectedThemeId, setSelectedThemeId] =
    useState<PaperThemeId>("warm-cream");
  const [isDownloading, setIsDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const activeTheme = PAPER_THEMES[selectedThemeId];

  // Helper salin teks ke papan klip
  const handleCopyText = () => {
    const textToCopy = `${title ? `[${title}]\n\n` : ""}“${quoteText}”\n\n— ${
      author.trim() || "Sahabat Nalar"
    }\n\n— Diracik di ruang teduh @nalarnanti (nalarnanti.com)`;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // Helper memuat gambar logo Nalar Nanti dengan fallback & safety timeout
  const loadLogoImage = (): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => resolve(null), 2000);
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        clearTimeout(timer);
        resolve(img);
      };
      img.onerror = () => {
        const fallback = new window.Image();
        fallback.crossOrigin = "anonymous";
        fallback.onload = () => {
          clearTimeout(timer);
          resolve(fallback);
        };
        fallback.onerror = () => {
          clearTimeout(timer);
          resolve(null);
        };
        fallback.src = "/logo-hd.png";
      };
      img.src = "/images/logo-hd.png";
    });
  };

  // Helper memecah teks ke beberapa baris
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
    const paragraphs = text.split("\n");
    const lines: string[] = [];

    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) {
        lines.push("");
        continue;
      }
      const words = trimmed.split(/\s+/);
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = ctx.measureText(testLine).width;
        if (testWidth > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
    }
    return lines;
  };

  // Helper membuat rounded rect
  const drawRoundedRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }
  };

  // Fungsi mengunduh kartu lewat HTML5 Canvas (1080 x 1920 piksel)
  const handleDownloadCard = async () => {
    if (isDownloading) return;
    if (!quoteText.trim()) {
      alert("Silakan tuliskan kalimat refleksi terlebih dahulu.");
      return;
    }

    try {
      setIsDownloading(true);

      // Siapkan Canvas resolusi tinggi Story 9:16
      const canvas = document.createElement("canvas");
      const WIDTH = 1080;
      const HEIGHT = 1920;
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Gagal menginisialisasi context Canvas 2D");
      }

      const conf = activeTheme.canvasConfig;

      // Tunggu font Google (Lora / Serif) jika tersedia di document
      if (typeof document !== "undefined" && document.fonts) {
        try {
          await document.fonts.ready;
        } catch {
          // Lanjutkan jika fonts.ready tidak didukung
        }
      }

      // 1. LATAR BELAKANG GRADASI
      const bgGrad = ctx.createLinearGradient(0, 0, 0, HEIGHT);
      bgGrad.addColorStop(0, conf.bgTop);
      bgGrad.addColorStop(1, conf.bgBottom);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Pendaran radial glow lembut
      const glowTop = ctx.createRadialGradient(
        WIDTH - 120,
        140,
        20,
        WIDTH - 120,
        140,
        480
      );
      glowTop.addColorStop(0, "rgba(200, 169, 142, 0.22)");
      glowTop.addColorStop(1, "rgba(200, 169, 142, 0)");
      ctx.fillStyle = glowTop;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      const glowBottom = ctx.createRadialGradient(140, HEIGHT - 180, 20, 140, HEIGHT - 180, 500);
      glowBottom.addColorStop(0, "rgba(200, 169, 142, 0.18)");
      glowBottom.addColorStop(1, "rgba(200, 169, 142, 0)");
      ctx.fillStyle = glowBottom;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Tekstur serat kertas prosedural halus
      ctx.fillStyle = conf.text;
      for (let i = 0; i < 90000; i++) {
        const rx = (Math.sin(i * 12.9898) * 43758.5453) % 1;
        const ry = (Math.cos(i * 78.233) * 43758.5453) % 1;
        const px = Math.floor(Math.abs(rx) * WIDTH);
        const py = Math.floor(Math.abs(ry) * HEIGHT);
        ctx.globalAlpha = 0.02;
        ctx.fillRect(px, py, 1.2, 1.2);
      }
      ctx.globalAlpha = 1.0;

      // 2. KARTU BELAKANG BERLAPIS (DIMIRINGKAN -2 DERAJAT)
      ctx.save();
      ctx.translate(WIDTH / 2, HEIGHT / 2);
      ctx.rotate((-2 * Math.PI) / 180);
      drawRoundedRect(ctx, -450, -820, 900, 1640, 44);
      ctx.fillStyle = conf.cardBack;
      ctx.fill();
      ctx.strokeStyle = conf.cardBorder;
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // 3. KARTU UTAMA DEPAN
      const cardX = (WIDTH - 900) / 2; // 90
      const cardY = (HEIGHT - 1640) / 2; // 140
      const cardW = 900;
      const cardH = 1640;

      // Bayangan kartu utama
      ctx.save();
      ctx.shadowColor = "rgba(62, 54, 46, 0.12)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 18;
      drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 44);
      ctx.fillStyle = conf.cardFront;
      ctx.fill();
      ctx.restore();

      // Garis tepi kartu utama
      drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 44);
      ctx.strokeStyle = conf.cardBorder;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Garis bingkai dalam ganda (Double Hairline Border)
      drawRoundedRect(ctx, cardX + 18, cardY + 18, cardW - 36, cardH - 36, 32);
      ctx.strokeStyle = conf.accent;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // 4. AKSEN WASHI TAPE DI ATAS KARTU
      ctx.save();
      const tapeW = 220;
      const tapeH = 46;
      const tapeX = WIDTH / 2 - tapeW / 2;
      const tapeY = cardY - 14;
      ctx.fillStyle = conf.washi;
      ctx.globalAlpha = 0.88;
      ctx.fillRect(tapeX, tapeY, tapeW, tapeH);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.strokeRect(tapeX, tapeY, tapeW, tapeH);
      ctx.restore();

      // 5. WATERMARK LOGO DI TENGAH KARTU
      const logoImg = await loadLogoImage();
      if (logoImg) {
        ctx.save();
        ctx.globalAlpha = 0.065;
        const logoSize = 360;
        ctx.drawImage(
          logoImg,
          WIDTH / 2 - logoSize / 2,
          HEIGHT / 2 - logoSize / 2,
          logoSize,
          logoSize
        );
        ctx.restore();
      }

      // 6. HEADER KARTU (LOGO KECIL & BRANDING RACIKAN)
      const headerY = cardY + 90;
      if (logoImg) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(WIDTH / 2, headerY, 32, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logoImg, WIDTH / 2 - 32, headerY - 32, 64, 64);
        ctx.restore();

        // Border logo kecil
        ctx.beginPath();
        ctx.arc(WIDTH / 2, headerY, 32, 0, Math.PI * 2);
        ctx.strokeStyle = conf.accent;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Teks Kategori / Label Racikan
      ctx.fillStyle = conf.accent;
      ctx.font = "bold 20px 'Cinzel', 'Lora', serif";
      ctx.textAlign = "center";
      ctx.letterSpacing = "4px";
      ctx.fillText(
        "✦ NALAR NANTI • RACIKAN PRIBADI ✦",
        WIDTH / 2,
        headerY + 70
      );

      // Judul Kartu (Jika ada)
      let contentStartY = headerY + 120;
      if (title.trim()) {
        ctx.fillStyle = conf.text;
        ctx.font = "bold 32px 'Lora', 'Playfair Display', Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText(title.trim(), WIDTH / 2, contentStartY);
        contentStartY += 55;

        // Garis aksen bawah judul
        ctx.strokeStyle = conf.accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(WIDTH / 2 - 80, contentStartY - 20);
        ctx.lineTo(WIDTH / 2 + 80, contentStartY - 20);
        ctx.stroke();
      }

      // 7. TEKS REFLEKSI / DO’A UTAMA (DINAMIS DENGAN WRAPPING)
      const cleanQuote = quoteText.trim();
      const quoteLength = cleanQuote.length;

      // Hitung ukuran font adaptif
      let fontSize = 44;
      let lineHeight = 72;
      if (quoteLength > 150) {
        fontSize = 38;
        lineHeight = 62;
      } else if (quoteLength < 70) {
        fontSize = 50;
        lineHeight = 80;
      }

      ctx.font = `italic ${fontSize}px 'Lora', 'Playfair Display', Georgia, serif`;
      ctx.fillStyle = conf.text;
      ctx.textAlign = "center";

      const maxTextWidth = 720;
      const quoteLines = wrapText(ctx, cleanQuote, maxTextWidth);

      // Hitung posisi vertikal teks agar seimbang di area tengah kartu
      const totalTextHeight = quoteLines.length * lineHeight;
      const middleAreaHeight = 650;
      const textStartY =
        contentStartY + Math.max(30, (middleAreaHeight - totalTextHeight) / 2);

      // Kutipan Pembuka Atas (Glyph Petik)
      ctx.fillStyle = conf.accent;
      ctx.font = "italic 72px 'Lora', serif";
      ctx.globalAlpha = 0.5;
      ctx.fillText("“", WIDTH / 2, textStartY - 20);
      ctx.globalAlpha = 1.0;

      // Gambar baris demi baris teks refleksi
      ctx.fillStyle = conf.text;
      ctx.font = `italic ${fontSize}px 'Lora', 'Playfair Display', Georgia, serif`;
      quoteLines.forEach((line, idx) => {
        ctx.fillText(line, WIDTH / 2, textStartY + idx * lineHeight + 40);
      });

      // 8. TANDA TANGAN / NAMA PENULIS
      const authorText = `— ${author.trim() || "Sahabat Nalar"}`;
      const authorY = textStartY + quoteLines.length * lineHeight + 110;

      // Pill Nama Penulis
      ctx.font = "500 24px 'Plus Jakarta Sans', system-ui, sans-serif";
      const authorMetrics = ctx.measureText(authorText);
      const pillW = authorMetrics.width + 70;
      const pillH = 52;
      const pillX = WIDTH / 2 - pillW / 2;
      const pillY = authorY - 36;

      drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 16);
      ctx.fillStyle = conf.cardBack;
      ctx.fill();
      ctx.strokeStyle = conf.cardBorder;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = conf.text;
      ctx.textAlign = "center";
      ctx.fillText(authorText, WIDTH / 2, authorY);

      // 9. FOOTER KARTU
      const footerY = cardY + cardH - 100;

      // Garis pemisah halus
      ctx.strokeStyle = conf.cardBorder;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cardX + 80, footerY - 40);
      ctx.lineTo(cardX + cardW - 80, footerY - 40);
      ctx.stroke();

      // Brand Instagram
      ctx.fillStyle = conf.accent;
      ctx.font = "bold 22px 'Lora', Georgia, serif";
      ctx.textAlign = "center";
      ctx.fillText("@nalarnanti", WIDTH / 2, footerY - 10);

      // Kalimat footer khas
      ctx.fillStyle = conf.muted;
      ctx.font = "400 18px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText(
        "Diracik di ruang teduh @nalarnanti • nalarnanti.com",
        WIDTH / 2,
        footerY + 22
      );

      // Tanggal racikan halus
      const todayStr = new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());
      ctx.fillStyle = conf.muted;
      ctx.font = "italic 16px 'Lora', serif";
      ctx.fillText(`Disimpan pada ${todayStr}`, WIDTH / 2, footerY + 52);

      // 10. TRIGGER DOWNLOAD (DENGAN FALLBACK DATA-URL AMAN)
      const safeSlug = title.trim()
        ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : "refleksi";
      const filename = `nalar-nanti-${safeSlug}.png`;

      const triggerDownload = (downloadUrl: string, revokeUrl?: string) => {
        const a = document.createElement("a");
        a.download = filename;
        a.href = downloadUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        if (revokeUrl) {
          URL.revokeObjectURL(revokeUrl);
        }
        setIsDownloading(false);
      };

      if (typeof canvas.toBlob === "function") {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              triggerDownload(url, url);
            } else {
              const dataUrl = canvas.toDataURL("image/png", 1.0);
              triggerDownload(dataUrl);
            }
          },
          "image/png",
          1.0
        );
      } else {
        const dataUrl = canvas.toDataURL("image/png", 1.0);
        triggerDownload(dataUrl);
      }
    } catch (err) {
      console.error("Gagal mengunduh kartu custom:", err);
      alert("Terjadi kendala saat menyiapkan gambar. Silakan coba kembali.");
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header Pengantar Studio */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EAE1D3] dark:bg-[#322C27] text-[#3E362E] dark:text-[#EDE6DC] text-xs font-semibold border border-[#DDD3C3] dark:border-[#443C36] shadow-soft mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#886950] dark:text-[#C8A98E]" />
          <span>Studio Racik Kartu Nalar Nanti</span>
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-2">
          Tuliskan Nalar, Unduh Sebagai Pengingat
        </h1>
        <p className="text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
          Tuangkan doa, kalimat penguat, atau renungan hatimu sendiri ke dalam
          kartu estetis berlapis gaya Nalar Nanti, lalu unduh dalam format vertikal
          Story 9:16 resolusi tinggi (1080 x 1920 piksel).
        </p>
      </div>

      {/* Grid 2 Kolom: Editor Kiri & Live Preview Kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* ========================================================================= */}
        {/* PANEL EDITOR DI SISI KIRI (lg:col-span-6) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FAF7F2] dark:bg-[#26221F] border border-[#E5DDD0] dark:border-[#3A332E] rounded-3xl p-6 sm:p-8 shadow-floating">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD0] dark:border-[#3A332E] mb-5">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#C8A98E]" />
                <h2 className="font-serif text-base sm:text-lg font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                  Panel Racik Kalimat
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTitle("");
                  setQuoteText("");
                  setAuthor("");
                }}
                className="text-[11px] text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] inline-flex items-center gap-1 transition-colors"
                title="Kosongkan formulir"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Rekomendasi Inspirasi Cepat */}
            <div className="mb-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E9B8E] block mb-2">
                Butuh Inspirasi Cepat?
              </span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {INSPIRATION_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setTitle(preset.title);
                      setQuoteText(preset.text);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#F3EDE2] dark:bg-[#1E1B18] hover:bg-[#EAE1D3] dark:hover:bg-[#322C27] text-[#3E362E] dark:text-[#EDE6DC] border border-[#E5DDD0] dark:border-[#3A332E] transition-all active:scale-95 shadow-soft"
                  >
                    + {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Input 1: Judul Singkat (Opsional) */}
              <div>
                <label
                  htmlFor="card-title"
                  className="block text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-1.5"
                >
                  Judul Singkat <span className="text-[#7A6F64] dark:text-[#A89F94] font-normal">(Opsional)</span>
                </label>
                <input
                  id="card-title"
                  type="text"
                  maxLength={40}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Catatan Malam Ini / Ruang Doa"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
                />
              </div>

              {/* Input 2: Textarea Kalimat Refleksi / Doa (Wajib, Maks 220 Karakter) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="card-quote"
                    className="block text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC]"
                  >
                    Tuliskan Kalimat Refleksi atau Doamu{" "}
                    <span className="text-[#C8A98E]">*</span>
                  </label>
                  <span
                    className={`text-[10px] font-mono ${
                      quoteText.length >= 200
                        ? "text-[#C8A98E] font-bold"
                        : "text-[#7A6F64] dark:text-[#A89F94]"
                    }`}
                  >
                    {quoteText.length}/220
                  </span>
                </div>
                <textarea
                  id="card-quote"
                  rows={4}
                  required
                  maxLength={220}
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  placeholder="Tuliskan renungan, kalimat penguat, atau bait doa yang ingin kamu simpan..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft leading-relaxed resize-none"
                />
              </div>

              {/* Input 3: Nama / Penulis (Opsional) */}
              <div>
                <label
                  htmlFor="card-author"
                  className="block text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-1.5"
                >
                  Nama / Penulis <span className="text-[#7A6F64] dark:text-[#A89F94] font-normal">(Opsional)</span>
                </label>
                <input
                  id="card-author"
                  type="text"
                  maxLength={35}
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Contoh: Sahabat Nalar / [Namamu]"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs sm:text-sm text-[#3E362E] dark:text-[#EDE6DC] placeholder-[#7A6F64]/60 dark:placeholder-[#A89F94]/60 focus:outline-none focus:border-[#C8A98E] focus:ring-1 focus:ring-[#C8A98E] transition-all shadow-soft"
                />
                <p className="text-[10px] text-[#7A6F64]/80 dark:text-[#A89F94]/80 mt-1">
                  Default jika kosong: <em>"Sahabat Nalar"</em>
                </p>
              </div>

              {/* Input 4: Pilihan 3 Nuansa Kertas Estetik (Color Swatches) */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] mb-2.5">
                  Pilih Nuansa Kertas Estetik:
                </label>
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {(Object.keys(PAPER_THEMES) as PaperThemeId[]).map((tId) => {
                    const theme = PAPER_THEMES[tId];
                    const isSelected = selectedThemeId === tId;
                    return (
                      <button
                        key={tId}
                        type="button"
                        onClick={() => setSelectedThemeId(tId)}
                        className={`p-3 rounded-2xl border text-left transition-all active:scale-95 flex flex-col justify-between relative ${
                          isSelected
                            ? "border-[#3E362E] dark:border-[#C8A98E] ring-2 ring-[#C8A98E] shadow-floating"
                            : "border-[#E5DDD0] dark:border-[#3A332E] hover:border-[#C8A98E]/70 shadow-soft"
                        }`}
                        style={{ backgroundColor: theme.cardHex }}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#3E362E] text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: theme.accentHex }}
                          />
                          <span
                            className="font-serif font-semibold text-xs leading-none truncate"
                            style={{ color: theme.textHex }}
                          >
                            {theme.name}
                          </span>
                        </div>
                        <span
                          className="text-[10px] opacity-80"
                          style={{ color: theme.mutedHex }}
                        >
                          {theme.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LIVE PREVIEW & UNDUH GAMBAR 9:16 DI SISI KANAN (lg:col-span-6) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#7A6F64] dark:text-[#A89F94]">
              <Eye className="w-4 h-4 text-[#C8A98E]" />
              <span>Pratinjau Langsung (Story 9:16)</span>
            </div>
            <span className="text-[10px] text-[#8E9B8E] font-medium">
              Siap diunduh 1080 x 1920 px
            </span>
          </div>

          {/* Kotak Mockup Kartu Live Preview Vertikal 9:16 */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] relative rounded-3xl p-4 sm:p-5 shadow-floating flex flex-col justify-between overflow-hidden transition-all duration-300"
            style={{ backgroundColor: activeTheme.bgHex }}
          >
            {/* Latar Belakang Kartu Belakang Dimiringkan */}
            <div
              className="absolute inset-4 rounded-3xl -rotate-2 border pointer-events-none transition-all duration-300"
              style={{
                backgroundColor: activeTheme.canvasConfig.cardBack,
                borderColor: activeTheme.borderHex,
              }}
            />

            {/* Kartu Utama Depan */}
            <div
              className="relative z-10 w-full h-full rounded-2xl border p-5 sm:p-6 flex flex-col justify-between shadow-soft overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: activeTheme.canvasConfig.cardFront,
                borderColor: activeTheme.borderHex,
              }}
            >
              {/* Garis Bingkai Dalam Ganda */}
              <div
                className="absolute inset-2.5 rounded-xl border pointer-events-none opacity-40"
                style={{ borderColor: activeTheme.accentHex }}
              />

              {/* Aksen Washi Tape Atas */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 border border-white/40 shadow-xs pointer-events-none opacity-90"
                style={{ backgroundColor: activeTheme.washiHex }}
              />

              {/* Header Kartu */}
              <div className="text-center pt-2 relative z-10">
                <div className="w-9 h-9 mx-auto rounded-full overflow-hidden border bg-white mb-2 shadow-soft"
                  style={{ borderColor: activeTheme.accentHex }}
                >
                  <Image
                    src="/images/logo-hd.png"
                    alt="Logo Nalar Nanti"
                    width={48}
                    height={48}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
                <span
                  className="font-serif font-bold text-[9px] tracking-widest block uppercase"
                  style={{ color: activeTheme.accentHex }}
                >
                  ✦ Nalar Nanti • Racikan ✦
                </span>
                {title.trim() && (
                  <h3
                    className="font-serif font-semibold text-xs sm:text-sm mt-1 leading-snug line-clamp-1"
                    style={{ color: activeTheme.textHex }}
                  >
                    {title.trim()}
                  </h3>
                )}
              </div>

              {/* Bagian Tengah: Teks Kutipan Refleksi */}
              <div className="my-auto py-2 text-center relative z-10">
                <QuoteIcon
                  className="w-5 h-5 mx-auto mb-1 rotate-180 opacity-40"
                  style={{ color: activeTheme.accentHex }}
                />
                <p
                  className="font-serif italic text-xs sm:text-sm leading-relaxed px-1 line-clamp-6"
                  style={{ color: activeTheme.textHex }}
                >
                  “{quoteText.trim() || "Tuliskan kalimat refleksimu..."}”
                </p>
                <div className="mt-3">
                  <span
                    className="inline-flex items-center gap-1 text-[10px] font-sans px-2.5 py-0.5 rounded-lg border shadow-xs"
                    style={{
                      backgroundColor: activeTheme.cardHex,
                      borderColor: activeTheme.borderHex,
                      color: activeTheme.textHex,
                    }}
                  >
                    <Feather className="w-2.5 h-2.5" style={{ color: activeTheme.accentHex }} />
                    <span>{author.trim() || "Sahabat Nalar"}</span>
                  </span>
                </div>
              </div>

              {/* Footer Kartu */}
              <div
                className="pt-2 border-t text-center relative z-10"
                style={{ borderColor: activeTheme.borderHex }}
              >
                <span
                  className="font-serif font-bold text-[10px] block"
                  style={{ color: activeTheme.accentHex }}
                >
                  @nalarnanti
                </span>
                <span
                  className="text-[8px] font-sans opacity-70 block"
                  style={{ color: activeTheme.mutedHex }}
                >
                  Diracik di ruang teduh @nalarnanti • nalarnanti.com
                </span>
              </div>
            </div>
          </div>

          {/* Tombol Aksi: Unduh Gambar 9:16 & Salin Teks */}
          <div className="w-full max-w-[340px] sm:max-w-[380px] mt-5 space-y-2.5">
            <button
              type="button"
              onClick={handleDownloadCard}
              disabled={isDownloading || !quoteText.trim()}
              className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#C8A98E] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#B9967A] transition-all shadow-floating active:scale-98 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#FAF7F2]" />
                  <span>Meracik Gambar 1080x1920...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#FAF7F2]" />
                  <span>Unduh Gambar Story (9:16)</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleCopyText}
              disabled={!quoteText.trim()}
              className="w-full min-h-[42px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FAF7F2] dark:bg-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#3E362E] dark:text-[#EDE6DC] hover:border-[#C8A98E] hover:text-[#C8A98E] transition-all shadow-soft active:scale-98 disabled:opacity-50"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#8E9B8E]" />
                  <span className="text-[#8E9B8E]">Teks Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#7A6F64]" />
                  <span>Salin Teks Kutipan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

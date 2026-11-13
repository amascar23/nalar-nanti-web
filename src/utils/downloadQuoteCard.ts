import { QuoteItem } from "@/data/quotes";

/**
 * Helper untuk menggambar rounded rectangle pada Canvas
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
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
}

/**
 * Helper untuk memecah teks menjadi baris-baris (automatic word-wrap)
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
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
}

/**
 * 🎨 downloadQuoteAsImage
 * Menggambar kartu kutipan estetik beresolusi tinggi 1080 x 1920 (rasio 9:16 vertikal)
 * untuk Instagram Story & WhatsApp Status menggunakan HTML5 Canvas native.
 */
export async function downloadQuoteAsImage(
  quoteItem: QuoteItem | {
    id: string;
    themeTitle?: string;
    quote: string;
    source: string;
    category?: string;
    orderNumber?: number;
  }
): Promise<void> {
  if (typeof window === "undefined") return;

  // Tunggu web fonts agar ter-render sempurna jika tersedia
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready;
    } catch {
      // Abaikan jika browser tidak mendukung
    }
  }

  // Siapkan canvas 1080 x 1920 (9:16)
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 1. Latar Utama Luar: Warm Cream (#FAF7F2)
  ctx.fillStyle = "#FAF7F2";
  ctx.fillRect(0, 0, 1080, 1920);

  // 2. Bingkai Kartu Dalam: Soft Sand (#F3EDE2) dengan garis tepi #E5DDD0
  const cardX = 72;
  const cardY = 110;
  const cardW = 936;
  const cardH = 1700;
  const cardRadius = 42;

  // Bayangan halus kartu
  ctx.save();
  ctx.shadowColor = "rgba(62, 54, 46, 0.08)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 16;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.fillStyle = "#F3EDE2";
  ctx.fill();
  ctx.restore();

  // Border kartu utama
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.strokeStyle = "#E5DDD0";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Garis bingkai dalam sekunder (aksen passe-partout halus)
  const innerMargin = 22;
  drawRoundedRect(
    ctx,
    cardX + innerMargin,
    cardY + innerMargin,
    cardW - innerMargin * 2,
    cardH - innerMargin * 2,
    cardRadius - 14
  );
  ctx.strokeStyle = "rgba(229, 221, 208, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 3. Ornamen & Logo Bagian Atas
  // Coba muat logo Nalar Nanti
  const logoImage = new Image();
  logoImage.crossOrigin = "anonymous";
  logoImage.src = "/images/logo.jpg";
  await new Promise((resolve) => {
    logoImage.onload = resolve;
    logoImage.onerror = resolve;
  });

  const logoCenterX = 540;
  const logoCenterY = cardY + 115;
  const logoRadius = 42;

  if (logoImage.complete && logoImage.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(logoCenterX, logoCenterY, logoRadius, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(
      logoImage,
      logoCenterX - logoRadius,
      logoCenterY - logoRadius,
      logoRadius * 2,
      logoRadius * 2
    );
    ctx.restore();

    // Lingkaran border di sekitar logo
    ctx.beginPath();
    ctx.arc(logoCenterX, logoCenterY, logoRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#E5DDD0";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Teks Header: "NALAR NANTI" dengan letter-spacing lebar
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#7A6F64";
  ctx.fillText("N A L A R   N A N T I", 540, cardY + 195);

  // Subheader Tagline / Kategori
  const categoryText = quoteItem.category
    ? quoteItem.category.toUpperCase()
    : "RUANG SINGGAH MENATA NALAR & MERAKIT ASA";
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#8E9B8E";
  ctx.fillText(categoryText, 540, cardY + 232);

  // Ornamen Garis Minimalis Atas (Muted Latte #C8A98E)
  const lineYTop = cardY + 275;
  ctx.strokeStyle = "#C8A98E";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(430, lineYTop);
  ctx.lineTo(515, lineYTop);
  ctx.moveTo(565, lineYTop);
  ctx.lineTo(650, lineYTop);
  ctx.stroke();

  // Titik tengah ornamen atas
  ctx.fillStyle = "#C8A98E";
  ctx.beginPath();
  ctx.arc(540, lineYTop, 4, 0, Math.PI * 2);
  ctx.fill();

  // 4. Perhitungan & Pengaturan Posisi Area Tengah (Teks & Kutipan)
  const maxContentWidth = 760;

  // Ukuran font adaptif berdasarkan panjang kutipan
  const quoteLength = quoteItem.quote.length;
  let quoteFontSize = 48;
  if (quoteLength > 170) {
    quoteFontSize = 38;
  } else if (quoteLength > 120) {
    quoteFontSize = 42;
  } else if (quoteLength < 70) {
    quoteFontSize = 54;
  }
  const quoteLineHeight = Math.round(quoteFontSize * 1.58);

  ctx.font = `italic 500 ${quoteFontSize}px "Lora", Georgia, "Times New Roman", serif`;
  const quoteLines = wrapText(ctx, `“${quoteItem.quote}”`, maxContentWidth);

  // Ukuran Theme Title
  const hasTheme = Boolean(quoteItem.themeTitle);
  const themeFontSize = 32;
  const themeLineHeight = 44;
  let themeLines: string[] = [];
  if (hasTheme && quoteItem.themeTitle) {
    ctx.font = `600 ${themeFontSize}px "Lora", Georgia, serif`;
    themeLines = wrapText(ctx, quoteItem.themeTitle, maxContentWidth);
  }

  // Ukuran Pill Sumber
  const sourceText = quoteItem.source ? `— ${quoteItem.source}` : "— Nalar Nanti";
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  const sourceTextWidth = ctx.measureText(sourceText).width;
  const pillPaddingX = 28;
  const pillW = Math.max(220, sourceTextWidth + pillPaddingX * 2);
  const pillH = 54;

  // Total tinggi blok tengah
  const quoteBlockHeight = quoteLines.length * quoteLineHeight;
  const themeBlockHeight = hasTheme ? themeLines.length * themeLineHeight + 24 : 0;
  const totalCenterHeight = themeBlockHeight + 50 + quoteBlockHeight + 60 + pillH;

  // Batas vertikal area tengah: Y = 430 s/d Y = 1530 (tinggi 1100)
  const centerAreaTop = cardY + 320;
  const centerAreaHeight = 1180;
  let currentY = centerAreaTop + Math.max(0, Math.floor((centerAreaHeight - totalCenterHeight) / 2));

  // A. Render Judul Tema (themeTitle)
  if (hasTheme && themeLines.length > 0) {
    ctx.textAlign = "center";
    ctx.font = `600 ${themeFontSize}px "Lora", Georgia, serif`;
    ctx.fillStyle = "#886950";
    for (const line of themeLines) {
      ctx.fillText(line, 540, currentY + themeLineHeight / 2);
      currentY += themeLineHeight;
    }
    currentY += 28;
  }

  // B. Ikon Kutipan Estetik (Karakter Quote Besar Halus)
  ctx.font = 'italic 72px "Lora", Georgia, serif';
  ctx.fillStyle = "rgba(200, 169, 142, 0.45)";
  ctx.fillText("“", 540, currentY + 16);
  currentY += 46;

  // C. Render Kutipan Utama (Georgia / Lora Serif, Deep Espresso #3E362E)
  ctx.font = `italic 500 ${quoteFontSize}px "Lora", Georgia, "Times New Roman", serif`;
  ctx.fillStyle = "#3E362E";
  for (const line of quoteLines) {
    ctx.fillText(line, 540, currentY + quoteLineHeight / 2);
    currentY += quoteLineHeight;
  }

  // D. Render Pill/Kotak Sumber (source)
  currentY += 56;
  const pillX = 540 - pillW / 2;
  const pillY = currentY;

  // Gambar background pill
  drawRoundedRect(ctx, pillX, pillY, pillW, pillH, 18);
  ctx.fillStyle = "#EAE1D3";
  ctx.fill();
  ctx.strokeStyle = "#DDD3C3";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Teks sumber di dalam pill
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#3E362E";
  ctx.fillText(sourceText, 540, pillY + pillH / 2 + 1);

  // 5. Ornamen & Watermark Bagian Bawah
  const lineYBottom = cardY + cardH - 130;
  ctx.strokeStyle = "#C8A98E";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(430, lineYBottom);
  ctx.lineTo(515, lineYBottom);
  ctx.moveTo(565, lineYBottom);
  ctx.lineTo(650, lineYBottom);
  ctx.stroke();

  // Titik tengah ornamen bawah
  ctx.fillStyle = "#C8A98E";
  ctx.beginPath();
  ctx.arc(540, lineYBottom, 4, 0, Math.PI * 2);
  ctx.fill();

  // Watermark Halus di Bawah Kartu
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#7A6F64";
  ctx.fillText("@nalarnanti • Ruang Teduh untuk Berpikir & Merasa", 540, cardY + cardH - 78);

  ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#A19588";
  ctx.fillText("nalarnanti.com", 540, cardY + cardH - 45);

  // 6. Konversi ke PNG & Otomatis Unduh
  return new Promise<void>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Gagal membuat gambar kartu kutipan"));
        return;
      }
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = `nalar-nanti-${quoteItem.id}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve();
    }, "image/png");
  });
}


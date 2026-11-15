import { QuoteItem } from "@/data/quotes";

export type QuoteCardData =
  | QuoteItem
  | {
      id: string;
      themeTitle?: string;
      quote: string;
      source: string;
      category?: string;
      orderNumber?: number;
      reflection?: string;
    };

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
 * Helper untuk memecah teks dengan batasan baris maksimal (misal catatan refleksi 2-3 baris)
 */
function wrapTextLimited(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines: number = 3
): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth && currentLine) {
      if (lines.length === maxLines - 1) {
        lines.push(currentLine + "...");
        return lines;
      }
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }
  return lines;
}

/**
 * Gambar ornamen bintang empat sudut (sparkle)
 */
function drawSparkle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - size);
  ctx.quadraticCurveTo(cx, cy, cx + size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + size);
  ctx.quadraticCurveTo(cx, cy, cx - size, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - size);
  ctx.fill();
  ctx.restore();
}

/**
 * Gambar ornamen bulan sabit minimalis
 */
function drawCrescentMoon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  color: string,
  lineWidth: number = 2
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, radius, -0.55 * Math.PI, 0.55 * Math.PI, false);
  ctx.quadraticCurveTo(
    cx - radius * 0.25,
    cy,
    cx + radius * Math.cos(-0.55 * Math.PI),
    cy + radius * Math.sin(-0.55 * Math.PI)
  );
  ctx.stroke();
  ctx.restore();
}

/**
 * Gambar ornamen ranting dedaunan halus
 */
function drawBotanicalBranch(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  angleRad: number,
  length: number,
  color: string
) {
  ctx.save();
  ctx.translate(startX, startY);
  ctx.rotate(angleRad);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";

  // Batang melengkung lembut
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(length * 0.5, -length * 0.12, length, 0);
  ctx.stroke();

  // Daun-daun halus di sepanjang batang
  const steps = [0.28, 0.52, 0.76, 0.96];
  steps.forEach((t, idx) => {
    const lx = length * t;
    const ly = -length * 0.12 * Math.sin(t * Math.PI);
    const side = idx % 2 === 0 ? 1 : -1;
    ctx.beginPath();
    ctx.ellipse(lx, ly + side * 14, 13, 5, side * 0.55, 0, Math.PI * 2);
    ctx.stroke();
  });

  ctx.restore();
}

/**
 * Gambar ikon kamera Instagram minimalis secara native via Canvas
 */
function drawInstagramIcon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  const half = size / 2;

  // Bingkai luar membulat
  drawRoundedRect(ctx, cx - half, cy - half, size, size, size * 0.28);
  ctx.stroke();

  // Lensa lingkaran tengah
  ctx.beginPath();
  ctx.arc(cx, cy, size * 0.26, 0, Math.PI * 2);
  ctx.stroke();

  // Titik sensor/flash
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx + size * 0.26, cy - size * 0.26, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Muat logo Nalar Nanti secara aman dengan fallback
 */
function loadLogoImage(): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => {
      // Coba path alternatif jika path pertama gagal
      const fallbackImg = new Image();
      fallbackImg.crossOrigin = "anonymous";
      fallbackImg.onload = () => resolve(fallbackImg);
      fallbackImg.onerror = () => resolve(null);
      fallbackImg.src = "/logo-hd.png";
    };
    img.src = "/images/logo-hd.png";
  });
}

/**
 * 🎨 downloadQuoteAsImage
 * Menggambar kartu kutipan estetik beresolusi tinggi 1080 x 1920 (rasio 9:16 vertikal)
 * untuk Instagram Story & WhatsApp Status menggunakan HTML5 Canvas native.
 *
 * Pembaruan Desain Editorial & Scrapbook:
 * 1. Latar gradien vertikal Warm Cream (#FAF7F2 -> #F1E7D8) dengan 2 soft radial glow & tekstur serat kertas halus.
 * 2. Kartu berlapis: kartu belakang miring -2° (#E8DEC9) + kartu depan utama (#F8F3EB) dengan double hairline border (#C8A98E).
 * 3. Hiasan washi tape kertas semi-transparan di atas kartu.
 * 4. Ilustrasi fine line-art (ranting dedaunan, bulan sabit, bintang ✦) di sudut-sudut kartu.
 * 5. Watermark logo lingkaran Nalar Nanti (540x540) di tengah dengan opasitas sangat lembut (0.06).
 * 6. Header berkelas dengan logo mini, pill kategori, tanda petik 120px, font serif Lora/Georgia, dan kotak refleksi bermakna.
 * 7. Footer estetik dengan ikon Instagram & tagline resmi.
 */
export async function downloadQuoteAsImage(
  quoteItem: QuoteCardData
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

  // Muat logo lingkaran Nalar Nanti
  const logoImage = await loadLogoImage();

  // Siapkan canvas 1080 x 1920 (rasio 9:16)
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // =========================================================================
  // 1. LATAR BELAKANG BERTEKSTUR & PENCAHAYAAN LEMBUT
  // =========================================================================
  // A. Gradien vertikal Warm Cream (#FAF7F2 -> #F1E7D8)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
  bgGrad.addColorStop(0, "#FAF7F2");
  bgGrad.addColorStop(1, "#F1E7D8");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1920);

  // B. Pendaran cahaya radial lembut di sudut kanan atas
  const glowTR = ctx.createRadialGradient(1080, 0, 60, 1080, 0, 750);
  glowTR.addColorStop(0, "rgba(230, 211, 188, 0.45)");
  glowTR.addColorStop(1, "rgba(230, 211, 188, 0)");
  ctx.fillStyle = glowTR;
  ctx.fillRect(0, 0, 1080, 1920);

  // C. Pendaran cahaya radial lembut di sudut kiri bawah
  const glowBL = ctx.createRadialGradient(0, 1920, 60, 0, 1920, 780);
  glowBL.addColorStop(0, "rgba(230, 211, 188, 0.45)");
  glowBL.addColorStop(1, "rgba(230, 211, 188, 0)");
  ctx.fillStyle = glowBL;
  ctx.fillRect(0, 0, 1080, 1920);

  // D. Tekstur serat kertas halus (subtle paper grain, procedural)
  try {
    const grainCanvas = document.createElement("canvas");
    grainCanvas.width = 140;
    grainCanvas.height = 140;
    const gCtx = grainCanvas.getContext("2d");
    if (gCtx) {
      const imgData = gCtx.createImageData(140, 140);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 85 + 170) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = (Math.random() * 22) | 0; // Sangat tipis & lembut
      }
      gCtx.putImageData(imgData, 0, 0);
      ctx.save();
      ctx.globalAlpha = 0.025;
      const pattern = ctx.createPattern(grainCanvas, "repeat");
      if (pattern) {
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, 1080, 1920);
      }
      ctx.restore();
    }
  } catch {
    // Abaikan jika tidak didukung
  }

  // =========================================================================
  // 2. KARTU BERLAPIS GAYA EDITORIAL / SCRAPBOOK
  // =========================================================================
  const cardW = 900;
  const cardH = 1640;
  const cardX = (1080 - cardW) / 2; // 90px
  const cardY = (1920 - cardH) / 2; // 140px
  const cardRadius = 44;

  // A. Lapisan kartu belakang yang dimiringkan -2 derajat (#E8DEC9)
  ctx.save();
  ctx.translate(540, 960);
  ctx.rotate((-2 * Math.PI) / 180);
  ctx.translate(-540, -960);

  ctx.shadowColor = "rgba(62, 54, 46, 0.06)";
  ctx.shadowBlur = 34;
  ctx.shadowOffsetY = 14;

  drawRoundedRect(
    ctx,
    cardX - 6,
    cardY - 4,
    cardW + 12,
    cardH + 8,
    cardRadius
  );
  ctx.fillStyle = "#E8DEC9";
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "#D8CBB6";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();

  // B. Kartu utama di lapisan depan (posisi tegak, #F8F3EB)
  ctx.save();
  ctx.shadowColor = "rgba(62, 54, 46, 0.08)";
  ctx.shadowBlur = 46;
  ctx.shadowOffsetY = 16;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.fillStyle = "#F8F3EB";
  ctx.fill();
  ctx.restore();

  // Garis tepi luar kartu utama
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, cardRadius);
  ctx.strokeStyle = "#E5DDD0";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Garis bingkai dalam ganda (double hairline border) berwarna #C8A98E
  const gapOuter = 16;
  drawRoundedRect(
    ctx,
    cardX + gapOuter,
    cardY + gapOuter,
    cardW - gapOuter * 2,
    cardH - gapOuter * 2,
    cardRadius - 10
  );
  ctx.strokeStyle = "rgba(200, 169, 142, 0.55)";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  const gapInner = 24;
  drawRoundedRect(
    ctx,
    cardX + gapInner,
    cardY + gapInner,
    cardW - gapInner * 2,
    cardH - gapInner * 2,
    cardRadius - 16
  );
  ctx.strokeStyle = "rgba(200, 169, 142, 0.3)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // C. Aksen dekoratif washi tape (selotip kertas semi-transparan #DFCBB2)
  ctx.save();
  const tapeW = 190;
  const tapeH = 36;
  const tapeX = 540 - tapeW / 2;
  const tapeY = cardY - 16;
  ctx.shadowColor = "rgba(62, 54, 46, 0.08)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = "rgba(223, 203, 178, 0.9)";
  ctx.fillRect(tapeX, tapeY, tapeW, tapeH);

  // Tekstur garis diagonal halus pada washi tape
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "rgba(175, 155, 130, 0.35)";
  ctx.lineWidth = 1;
  for (let x = tapeX + 8; x < tapeX + tapeW - 4; x += 12) {
    ctx.beginPath();
    ctx.moveTo(x, tapeY + 2);
    ctx.lineTo(x + 5, tapeY + tapeH - 2);
    ctx.stroke();
  }
  ctx.restore();

  // =========================================================================
  // 3. ILUSTRASI LINE-ART & WATERMARK LOGO NALAR NANTI
  // =========================================================================
  // A. Watermark logo lingkaran Nalar Nanti besar (540x540) di tengah area kartu
  if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.drawImage(logoImage, 540 - 270, 960 - 270, 540, 540);
    ctx.restore();
  }

  // B. Hiasan line-art sudut kanan atas
  drawBotanicalBranch(
    ctx,
    cardX + cardW - 75,
    cardY + 80,
    -0.75,
    75,
    "rgba(200, 169, 142, 0.45)"
  );
  drawCrescentMoon(
    ctx,
    cardX + cardW - 65,
    cardY + 68,
    22,
    "rgba(200, 169, 142, 0.45)",
    1.8
  );
  drawSparkle(ctx, cardX + cardW - 35, cardY + 45, 8, "#C8A98E");
  drawSparkle(ctx, cardX + 45, cardY + 50, 6, "rgba(200, 169, 142, 0.5)");

  // C. Hiasan line-art sudut kiri bawah
  drawBotanicalBranch(
    ctx,
    cardX + 75,
    cardY + cardH - 80,
    2.4,
    75,
    "rgba(200, 169, 142, 0.45)"
  );
  drawCrescentMoon(
    ctx,
    cardX + 65,
    cardY + cardH - 68,
    20,
    "rgba(200, 169, 142, 0.45)",
    1.8
  );
  drawSparkle(ctx, cardX + 35, cardY + cardH - 45, 8, "#C8A98E");
  drawSparkle(
    ctx,
    cardX + cardW - 45,
    cardY + cardH - 50,
    6,
    "rgba(200, 169, 142, 0.5)"
  );

  // =========================================================================
  // 4. HEADER ATAS
  // =========================================================================
  // Logo lingkaran mini (96 x 96 piksel, radius 48)
  const headerLogoCenterX = 540;
  const headerLogoCenterY = cardY + 120;
  const headerLogoRadius = 48;

  if (logoImage && logoImage.complete && logoImage.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      headerLogoCenterX,
      headerLogoCenterY,
      headerLogoRadius,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(
      logoImage,
      headerLogoCenterX - headerLogoRadius,
      headerLogoCenterY - headerLogoRadius,
      headerLogoRadius * 2,
      headerLogoRadius * 2
    );
    ctx.restore();

    // Bingkai lingkaran tipis #C8A98E di sekitar logo
    ctx.beginPath();
    ctx.arc(
      headerLogoCenterX,
      headerLogoCenterY,
      headerLogoRadius,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = "#C8A98E";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Teks Header: "NALAR NANTI" dengan letter-spacing lebar
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font =
    '700 24px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#7A6F64";
  ctx.fillText("N A L A R   N A N T I", 540, cardY + 204);

  // Badge Pill Kategori & Nomor Seri (#18 • REFLEKSI ISLAMI)
  const orderNum = quoteItem.orderNumber || quoteItem.id;
  const categoryRaw = quoteItem.category
    ? quoteItem.category.toUpperCase()
    : "REFLEKSI ISLAMI";
  const pillCategoryText = `#${orderNum} • ${categoryRaw}`;

  ctx.font =
    '600 15px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  const catTextWidth = ctx.measureText(pillCategoryText).width;
  const catPillW = catTextWidth + 32;
  const catPillH = 34;
  const catPillY = cardY + 230;

  drawRoundedRect(ctx, 540 - catPillW / 2, catPillY, catPillW, catPillH, 17);
  ctx.fillStyle = "#FAF7F2";
  ctx.fill();
  ctx.strokeStyle = "#E5DDD0";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = "#8E9B8E";
  ctx.fillText(pillCategoryText, 540, catPillY + catPillH / 2 + 1);

  // Garis pemisah tipis dengan ornamen bintang empat sudut (✦)
  const lineYHeader = cardY + 292;
  ctx.strokeStyle = "rgba(200, 169, 142, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(380, lineYHeader);
  ctx.lineTo(510, lineYHeader);
  ctx.moveTo(570, lineYHeader);
  ctx.lineTo(700, lineYHeader);
  ctx.stroke();

  drawSparkle(ctx, 540, lineYHeader, 6.5, "#C8A98E");

  // =========================================================================
  // 5. FOOTER BAWAH
  // =========================================================================
  const lineYFooter = cardY + cardH - 128;
  ctx.strokeStyle = "rgba(200, 169, 142, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(380, lineYFooter);
  ctx.lineTo(510, lineYFooter);
  ctx.moveTo(570, lineYFooter);
  ctx.lineTo(700, lineYFooter);
  ctx.stroke();

  drawSparkle(ctx, 540, lineYFooter, 6.5, "#C8A98E");

  // Baris Instagram @nalarnanti (ikon kamera native + teks)
  const igText = "@nalarnanti";
  ctx.font =
    '600 21px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  const igTextWidth = ctx.measureText(igText).width;
  const igRowWidth = 24 + 10 + igTextWidth;
  const igStartX = 540 - igRowWidth / 2;
  const igCenterY = cardY + cardH - 84;

  drawInstagramIcon(ctx, igStartX + 12, igCenterY, 22, "#3E362E");
  ctx.textAlign = "left";
  ctx.fillStyle = "#3E362E";
  ctx.fillText(igText, igStartX + 34, igCenterY + 1);

  // Tagline Bawah
  ctx.textAlign = "center";
  ctx.font =
    '400 16px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#8A7E72";
  ctx.fillText(
    "Ruang Teduh untuk Menata Nalar & Merakit Asa • nalarnanti.com",
    540,
    cardY + cardH - 46
  );

  // =========================================================================
  // 6. AREA TENGAH: KUTIPAN UTAMA, JUDUL TEMA, PILL SUMBER & KOTAK REFLEKSI
  // =========================================================================
  const maxContentWidth = 740;

  // A. Perhitungan teks kutipan utama (ukuran adaptif: 44px atau 38px)
  const quoteLength = quoteItem.quote.length;
  let quoteFontSize = 44;
  let quoteLineHeight = 68;
  if (quoteLength > 180) {
    quoteFontSize = 38;
    quoteLineHeight = 58;
  } else if (quoteLength > 130) {
    quoteFontSize = 41;
    quoteLineHeight = 63;
  }
  ctx.font = `italic 500 ${quoteFontSize}px "Lora", Georgia, serif`;
  const quoteLines = wrapText(ctx, `“${quoteItem.quote}”`, maxContentWidth);
  const quoteBlockH = quoteLines.length * quoteLineHeight;

  // B. Judul tema
  const hasTheme = Boolean(quoteItem.themeTitle);
  const themeFontSize = 30;
  const themeLineHeight = 42;
  let themeLines: string[] = [];
  if (hasTheme && quoteItem.themeTitle) {
    ctx.font = `600 ${themeFontSize}px "Lora", Georgia, serif`;
    themeLines = wrapText(ctx, quoteItem.themeTitle, maxContentWidth);
  }
  const themeBlockH = hasTheme ? themeLines.length * themeLineHeight : 0;

  // C. Pill sumber
  const sourceText = quoteItem.source ? `— ${quoteItem.source}` : "— Nalar Nanti";
  ctx.font =
    '600 22px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  const sourceWidth = ctx.measureText(sourceText).width;
  const sourcePillW = Math.max(210, sourceWidth + 56);
  const sourcePillH = 48;

  // D. Cuplikan kotak refleksi singkat (maksimal 2-3 baris)
  const hasReflection = Boolean(quoteItem.reflection);
  const reflectionFontSize = 20;
  const reflectionLineHeight = 32;
  let reflectionLines: string[] = [];
  if (hasReflection && quoteItem.reflection) {
    ctx.font = `italic 400 ${reflectionFontSize}px "Lora", Georgia, serif`;
    reflectionLines = wrapTextLimited(
      ctx,
      quoteItem.reflection,
      maxContentWidth - 64,
      3
    );
  }
  const refBoxPadY = 18;
  const refHeaderH = 22;
  const refTextH = reflectionLines.length * reflectionLineHeight;
  const refBoxH = hasReflection
    ? refBoxPadY * 2 + refHeaderH + 10 + refTextH
    : 0;

  // E. Penyeimbangan vertikal area tengah
  // Batas area yang tersedia antara header dan footer:
  const centerTop = cardY + 310;
  const centerBottom = lineYFooter - 30;
  const availableCenterH = centerBottom - centerTop;

  // Total tinggi elemen konten tengah + jarak antar-elemen
  const quoteMarkH = 60; // Tanda petik besar
  const spacingQuoteToTheme = hasTheme ? 18 : 0;
  const spacingThemeToQuote = 28;
  const spacingQuoteToSource = 36;
  const spacingSourceToRef = hasReflection ? 36 : 0;

  const totalCenterHeight =
    quoteMarkH +
    spacingQuoteToTheme +
    themeBlockH +
    spacingThemeToQuote +
    quoteBlockH +
    spacingQuoteToSource +
    sourcePillH +
    spacingSourceToRef +
    refBoxH;

  // Mulai posisi Y dengan vertical centering
  let curY =
    centerTop + Math.max(0, Math.floor((availableCenterH - totalCenterHeight) / 2));

  // 1. Tanda Petik Dekoratif Besar (120px, opasitas 0.35)
  ctx.textAlign = "center";
  ctx.font = 'italic 120px "Lora", Georgia, serif';
  ctx.fillStyle = "rgba(200, 169, 142, 0.35)";
  ctx.fillText("“", 540, curY + 45);
  curY += quoteMarkH;

  // 2. Judul Tema (themeTitle)
  if (hasTheme && themeLines.length > 0) {
    curY += spacingQuoteToTheme;
    ctx.textAlign = "center";
    ctx.font = `600 ${themeFontSize}px "Lora", Georgia, serif`;
    ctx.fillStyle = "#8A6B4F";
    for (const line of themeLines) {
      ctx.fillText(line, 540, curY + themeLineHeight / 2);
      curY += themeLineHeight;
    }
  }

  // 3. Teks Kutipan Utama (Georgia, serif, Deep Espresso #3E362E)
  curY += spacingThemeToQuote;
  ctx.textAlign = "center";
  ctx.font = `italic 500 ${quoteFontSize}px "Lora", Georgia, serif`;
  ctx.fillStyle = "#3E362E";
  for (const line of quoteLines) {
    ctx.fillText(line, 540, curY + quoteLineHeight / 2);
    curY += quoteLineHeight;
  }

  // 4. Pill Sumber
  curY += spacingQuoteToSource;
  const sPillX = 540 - sourcePillW / 2;
  const sPillY = curY;

  drawRoundedRect(ctx, sPillX, sPillY, sourcePillW, sourcePillH, 20);
  ctx.fillStyle = "#EAE1D3";
  ctx.fill();
  ctx.strokeStyle = "#D6C7B2";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font =
    '600 22px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = "#3E362E";
  ctx.fillText(sourceText, 540, sPillY + sourcePillH / 2 + 1);
  curY += sourcePillH;

  // 5. Kotak Refleksi Lembut (#F2EAE0) dengan garis aksen vertikal kiri #C8A98E
  if (hasReflection && reflectionLines.length > 0) {
    curY += spacingSourceToRef;
    const refBoxW = maxContentWidth;
    const refBoxX = 540 - refBoxW / 2;
    const refBoxY = curY;

    // Background kotak refleksi
    drawRoundedRect(ctx, refBoxX, refBoxY, refBoxW, refBoxH, 18);
    ctx.fillStyle = "#F2EAE0";
    ctx.fill();
    ctx.strokeStyle = "#E5DDD0";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Garis aksen vertikal di sisi kiri (#C8A98E)
    ctx.save();
    ctx.fillStyle = "#C8A98E";
    drawRoundedRect(ctx, refBoxX + 2, refBoxY + 8, 5, refBoxH - 16, 2.5);
    ctx.fill();
    ctx.restore();

    // Label Header Catatan Refleksi
    ctx.textAlign = "left";
    ctx.font =
      '600 13px -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, sans-serif';
    ctx.fillStyle = "#8E9B8E";
    ctx.fillText("✦ CATATAN REFLEKSI", refBoxX + 26, refBoxY + refBoxPadY + 8);

    // Teks Catatan Refleksi
    let refTextY = refBoxY + refBoxPadY + refHeaderH + 12;
    ctx.font = `italic 400 ${reflectionFontSize}px "Lora", Georgia, serif`;
    ctx.fillStyle = "#5C5248";
    for (const rLine of reflectionLines) {
      ctx.fillText(rLine, refBoxX + 26, refTextY + reflectionLineHeight / 2);
      refTextY += reflectionLineHeight;
    }
  }

  // =========================================================================
  // 7. KONVERSI KE PNG & OTOMATIS UNDUH
  // =========================================================================
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

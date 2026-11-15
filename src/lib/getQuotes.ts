import { QUOTES_DATA, QuoteItem, QuoteCategory, QuoteType } from "@/data/quotes";

export const GOOGLE_SHEETS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdbM3fPIk3b92BVQSLJK2T8i-8DMO6fVMLxiWXy1kZ2y6nEDyngN-dJodt9jSIA8FunZL7a6K68TR2/pub?gid=0&single=true&output=csv";

/**
 * Parser CSV standar RFC-4180
 * Mendukung tanda koma, baris baru (\n atau \r\n), dan tanda kutip ganda yang di-escape ("")
 * di dalam sel bertanda kutip tanpa merusak format kutipan panjang.
 */
export function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let insideQuotes = false;
  let i = 0;

  while (i < csvText.length) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        currentField += '"';
        i += 2;
        continue;
      } else {
        insideQuotes = !insideQuotes;
        i++;
        continue;
      }
    }

    if (!insideQuotes) {
      if (char === ",") {
        currentRow.push(currentField);
        currentField = "";
        i++;
        continue;
      }

      if (char === "\r") {
        if (nextChar === "\n") {
          i++;
        }
        currentRow.push(currentField);
        currentField = "";
        rows.push(currentRow);
        currentRow = [];
        i++;
        continue;
      }

      if (char === "\n") {
        currentRow.push(currentField);
        currentField = "";
        rows.push(currentRow);
        currentRow = [];
        i++;
        continue;
      }
    }

    currentField += char;
    i++;
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows.filter((r) => r.some((cell) => cell.trim().length > 0));
}

function sanitizeCategory(val: string): QuoteCategory {
  const v = val.trim();
  if (v.toLowerCase().includes("islam")) return "Refleksi Islami";
  if (v.toLowerCase().includes("tenang") || v.toLowerCase().includes("hati"))
    return "Tenang & Hati";
  if (v.toLowerCase().includes("proses") || v.toLowerCase().includes("tumbuh"))
    return "Proses & Bertumbuh";
  if (v.toLowerCase().includes("jejak") || v.toLowerCase().includes("awal"))
    return "Jejak Awal Nalar Nanti";
  if (
    v === "Refleksi Islami" ||
    v === "Tenang & Hati" ||
    v === "Proses & Bertumbuh" ||
    v === "Jejak Awal Nalar Nanti"
  ) {
    return v as QuoteCategory;
  }
  return "Refleksi Islami";
}

function sanitizeType(val: string): QuoteType {
  const v = val.trim().toLowerCase();
  if (v === "umum") return "Umum";
  return "Islami";
}

/**
 * Mengambil dan mengurai data kutipan terbaru dari Google Sheets CSV.
 * Menggunakan ISR Next.js (next: { revalidate: 60 }) dengan timeout aman dan fallback ke QUOTES_DATA.
 */
export async function getQuotes(): Promise<QuoteItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(GOOGLE_SHEETS_CSV_URL, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`Respon Google Sheets gagal dengan status ${res.status}`);
      return QUOTES_DATA;
    }

    const csvText = await res.text();
    if (!csvText || csvText.trim().length === 0) {
      return QUOTES_DATA;
    }

    const rows = parseCSV(csvText);
    if (rows.length < 2) {
      return QUOTES_DATA;
    }

    // Mapping header kolom secara dinamis
    const header = rows[0].map((h) => h.trim().toLowerCase());
    const idIdx = header.indexOf("id") !== -1 ? header.indexOf("id") : 0;
    const themeIdx =
      header.findIndex((h) => h.includes("theme") || h.includes("judul")) !== -1
        ? header.findIndex((h) => h.includes("theme") || h.includes("judul"))
        : 1;
    const quoteIdx =
      header.findIndex(
        (h) => h.includes("quote") || h.includes("kutipan") || h === "isi"
      ) !== -1
        ? header.findIndex(
            (h) => h.includes("quote") || h.includes("kutipan") || h === "isi"
          )
        : 2;
    const sourceIdx =
      header.findIndex((h) => h.includes("source") || h.includes("sumber")) !==
      -1
        ? header.findIndex((h) => h.includes("source") || h.includes("sumber"))
        : 3;
    const reflIdx =
      header.findIndex(
        (h) =>
          h.includes("reflection") ||
          h.includes("refleksi") ||
          h.includes("renungan")
      ) !== -1
        ? header.findIndex(
            (h) =>
              h.includes("reflection") ||
              h.includes("refleksi") ||
              h.includes("renungan")
          )
        : 4;
    const catIdx =
      header.findIndex((h) => h.includes("category") || h.includes("kategori")) !==
      -1
        ? header.findIndex(
            (h) => h.includes("category") || h.includes("kategori")
          )
        : 5;
    const typeIdx =
      header.findIndex(
        (h) => h.includes("type") || h.includes("tipe") || h.includes("nuansa")
      ) !== -1
        ? header.findIndex(
            (h) =>
              h.includes("type") || h.includes("tipe") || h.includes("nuansa")
          )
        : 6;

    const parsedQuotes: QuoteItem[] = [];

    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      if (!row || row.length < 3) continue;

      const rawId = (row[idIdx] || `${r}`).trim();
      const numId = parseInt(rawId, 10);
      const orderNumber = !isNaN(numId) ? numId : r;
      const themeTitle = (row[themeIdx] || "").trim();
      const quote = (row[quoteIdx] || "").trim();
      const source = (row[sourceIdx] || "Nalar Nanti").trim();
      const reflection = (row[reflIdx] || "").trim();
      const category = sanitizeCategory(row[catIdx] || "");
      const type = sanitizeType(row[typeIdx] || "");

      // Abaikan jika tidak ada teks kutipan
      if (!quote) continue;

      parsedQuotes.push({
        id: rawId,
        orderNumber,
        isFeatured: false,
        themeTitle: themeTitle || `Pengingat #${rawId}`,
        quote,
        source: source || "Nalar Nanti",
        reflection: reflection || quote,
        category,
        type,
      });
    }

    if (parsedQuotes.length === 0) {
      return QUOTES_DATA;
    }

    // Urutkan ID terbesar ke terkecil (sehingga kutipan baru otomatis di depan)
    parsedQuotes.sort((a, b) => b.orderNumber - a.orderNumber);

    // Tandai kutipan teratas (terbaru) sebagai featured
    if (parsedQuotes.length > 0) {
      parsedQuotes[0].isFeatured = true;
    }

    return parsedQuotes;
  } catch (err) {
    console.warn(
      "Gagal memuat kutipan dari Google Sheets, menggunakan fallback QUOTES_DATA:",
      err
    );
    return QUOTES_DATA;
  }
}

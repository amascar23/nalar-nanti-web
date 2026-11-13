const MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const SHORT_MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

/**
 * Format tanggal YYYY-MM-DD secara deterministik tanpa dependensi timezone/ICU.
 * Mencegah hydration mismatch antara SSR dan Client.
 */
export function formatIndonesianDate(dateString: string, isShort = false): string {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const year = parts[0];
    const monthIndex = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const months = isShort ? SHORT_MONTH_NAMES : MONTH_NAMES;
    const monthName = months[monthIndex] || parts[1];
    return `${day} ${monthName} ${year}`;
  }
  return dateString;
}

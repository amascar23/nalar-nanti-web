export interface QuoteItem {
  id: string;
  quote: string;
  category: "Jeda" | "Penerimaan" | "Ketenangan" | "Pertumbuhan" | "Harapan";
  note?: string;
}

export const QUOTES_DATA: QuoteItem[] = [
  {
    id: "q-1",
    quote: "Tak semua tanya harus terjawab hari ini. Sebagian hal butuh waktu untuk mengendap, hingga jernih dengan sendirinya.",
    category: "Jeda",
    note: "Catatan Petang",
  },
  {
    id: "q-2",
    quote: "Berhenti sejenak bukanlah tanda menyerah. Itu adalah cara kita menghormati napas yang telah setia menemani perjalanan.",
    category: "Jeda",
    note: "Ruang Teduh",
  },
  {
    id: "q-3",
    quote: "Berdamailah dengan hal-hal yang berada di luar kendali jemarimu. Yang perlu kau jaga adalah keteduhan di dalam dada.",
    category: "Penerimaan",
    note: "Refleksi Diri",
  },
  {
    id: "q-4",
    quote: "Bunga tidak pernah berlomba mekar dengan bunga di sebelahnya. Masing-masing mekar di musimnya sendiri.",
    category: "Pertumbuhan",
    note: "Pelajaran Waktu",
  },
  {
    id: "q-5",
    quote: "Hening bukan berarti kosong. Di dalam keheningan, kita belajar mendengarkan apa yang selama ini teredam oleh kebisingan dunia.",
    category: "Ketenangan",
    note: "Hening",
  },
  {
    id: "q-6",
    quote: "Ada hari-hari di mana bertahan dan tetap melangkah perlahan adalah kemenangan terbesar yang kau miliki.",
    category: "Harapan",
    note: "Pengingat Lembut",
  },
  {
    id: "q-7",
    quote: "Jangan terlalu keras pada dirimu sendiri. Kau sedang belajar, sedang tumbuh, dan sedang mencari bentuk terbaikmu.",
    category: "Penerimaan",
    note: "Peluk Diri",
  },
  {
    id: "q-8",
    quote: "Nanti akan tiba masanya ketika apa yang dulu membuatmu cemas, kini hanya menjadi cerita yang kau senyumi penuh syukur.",
    category: "Harapan",
    note: "Nalar Nanti",
  },
  {
    id: "q-9",
    quote: "Beri ruang bagi perasaanmu untuk hadir tanpa buru-buru dihakimi. Merasa sedih atau lelah itu manusiawi.",
    category: "Penerimaan",
    note: "Ruang Rasa",
  },
];

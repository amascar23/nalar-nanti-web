/**
 * ============================================================================
 * KOLEKSI DATA KUTIPAN — NALAR NANTI (Ruang Teduh untuk Berpikir & Merasa)
 * ============================================================================
 * 
 * 💡 PANDUAN MENAMBAHKAN KUTIPAN BARU:
 * 1. Tambahkan objek baru ke dalam array `QUOTES_DATA`.
 * 2. Format properti yang wajib diisi:
 *    - `id`: ID unik berupa string (misal: "q-13", "q-14").
 *    - `quote`: Teks kutipan utama yang puitis, menyentuh, atau menenangkan.
 *    - `reflection`: Penjelasan/refleksi mendalam 2-4 kalimat (gaya caption Instagram).
 *    - `category`: Pilih salah satu kategori resmi:
 *         • "Refleksi Islami"   (tawakal, doa, qada-qadar, sajadah, syukur)
 *         • "Tenang & Hati"      (keheningan, bernapas, melepaskan resah)
 *         • "Proses & Bertumbuh" (ritme hidup, belajar, menghargai proses)
 *         • "Pengingat Diri"     (menerima diri, batas kendali, jeda)
 *    - `type`: "Islami" | "Umum"
 *    - `date`: Format tanggal string (misal: "2026-11-13").
 *    - `isFeatured`: boolean (true untuk menandai kutipan pilihan utama hari ini).
 * ============================================================================
 */

export type QuoteCategory =
  | "Refleksi Islami"
  | "Tenang & Hati"
  | "Proses & Bertumbuh"
  | "Pengingat Diri";

export type QuoteType = "Islami" | "Umum";

export interface QuoteItem {
  id: string;
  quote: string;
  reflection: string;
  category: QuoteCategory;
  type: QuoteType;
  date: string;
  isFeatured: boolean;
}

export const QUOTES_DATA: QuoteItem[] = [
  // --------------------------------------------------------------------------
  // KOLEKSI REFLEKSI ISLAMI (Tawakal, Sabar, & Ketenangan Hati)
  // --------------------------------------------------------------------------
  {
    id: "q-1",
    quote: "Serahkan apa yang tak mampu kau dekap kepada Sang Pemilik Skenario Terbaik. Tenanglah, doa yang tulus tidak pernah tersesat di langit.",
    reflection: "Seringkali lelah kita bukan karena beban yang terlalu berat, melainkan karena kita berusaha memikul apa yang seharusnya kita pasrahkan. Belajar tawakal adalah seni melepaskan genggaman jemari kita, lalu membiarkan takdir Allah bekerja dengan cara-Nya yang paling indah.",
    category: "Refleksi Islami",
    type: "Islami",
    date: "2026-11-13",
    isFeatured: true,
  },
  {
    id: "q-2",
    quote: "Bukan tugasmu mengatur kapan doa harus dikabulkan. Tugasmu hanyalah tetap mengetuk pintu langit dengan hati yang berprasangka baik.",
    reflection: "Menunggu memang bagian tersukar dari sebuah perjalanan doa. Namun ketahuilah, Allah tidak pernah menunda sesuatu kecuali untuk mempersiapkanmu menjadi pribadi yang lebih lapang saat menerimanya kelak.",
    category: "Refleksi Islami",
    type: "Islami",
    date: "2026-11-12",
    isFeatured: false,
  },
  {
    id: "q-3",
    quote: "Dunia ini diciptakan berisik agar kita rindu bersimpuh dalam hening. Di atas sajadah, seluruh resah menemukan tempat pulang.",
    reflection: "Ketika pikiranmu mulai kalut oleh ekspektasi manusia, carilah tempat paling hening untuk bersujud. Di sanalah kerendahan hati kita diangkat menjadi ketenangan yang tak bisa dibeli oleh apa pun di dunia ini.",
    category: "Tenang & Hati",
    type: "Islami",
    date: "2026-11-11",
    isFeatured: false,
  },
  {
    id: "q-4",
    quote: "Bisa jadi yang paling kau tangisi hari ini adalah cara Allah menyelamatkanmu dari jurang yang tak pernah kau duga.",
    reflection: "Pandangan manusia amat terbatas; kita hanya melihat sepenggal hari ini, sementara Allah merancang hingga keabadian. Belajarlah berdamai dengan ketetapan-Nya, sebab apa yang luput darimu memang tidak pernah ditakdirkan untukmu.",
    category: "Refleksi Islami",
    type: "Islami",
    date: "2026-11-10",
    isFeatured: false,
  },
  {
    id: "q-5",
    quote: "Bersama setiap kesulitan ada kemudahan yang sedang berjalan mendekat. Jangan biarkan gelapnya malam membuatmu ragu fajar akan terbit.",
    reflection: "Rasa sesak tidak pernah datang sendirian; ia selalu berpasangan dengan kelapangan yang telah Allah janjikan di dalam firman-Nya. Tetaplah melangkah satu demi satu napas, pertolongan-Nya selalu tiba tepat pada waktunya.",
    category: "Pengingat Diri",
    type: "Islami",
    date: "2026-11-09",
    isFeatured: false,
  },
  {
    id: "q-6",
    quote: "Kedamaian hidup tidak terletak pada seberapa banyak yang kita genggam, melainkan pada seberapa tulus rasa syukur yang bersemayam di dada.",
    reflection: "Kita sering luput mensyukuri nikmat napas yang masih mengalir dan tubuh yang masih mampu berdiri tegak. Padahal, bahagia paling sejati bermula dari hati yang senantiasa merasa cukup dengan pemberian Rabb-nya.",
    category: "Tenang & Hati",
    type: "Islami",
    date: "2026-11-08",
    isFeatured: false,
  },

  // --------------------------------------------------------------------------
  // KOLEKSI REFLEKSI UMUM (Berproses, Menerima Diri, & Melangkah Perlahan)
  // --------------------------------------------------------------------------
  {
    id: "q-7",
    quote: "Bunga tidak pernah terburu-buru mekar hanya karena melihat mawar di sebelahnya telah semerbak. Masing-masing memiliki musimnya sendiri.",
    reflection: "Berhenti membandingkan bab pertama perjalananmu dengan bab pertengahan orang lain. Setiap dari kita memiliki jam biologis dan peta kehidupan yang berbeda; berjalan perlahan tetaplah bergerak maju.",
    category: "Proses & Bertumbuh",
    type: "Umum",
    date: "2026-11-07",
    isFeatured: true,
  },
  {
    id: "q-8",
    quote: "Menjadi manusia berarti mengizinkan dirimu berantakan sesekali. Kau tidak harus selalu utuh untuk layak dicintai dan dihargai.",
    reflection: "Terlalu lama kita membebani pundak dengan tuntutan untuk selalu kuat di mata dunia. Hari ini, peluklah rasa lelahmu; dari celah kerapuhan itulah kebijaksanaan dan ketulusan hati lahir.",
    category: "Pengingat Diri",
    type: "Umum",
    date: "2026-11-06",
    isFeatured: false,
  },
  {
    id: "q-9",
    quote: "Tak semua tanya harus terjawab hari ini. Sebagian hal butuh waktu untuk mengendap hingga ia jernih dengan sendirinya.",
    reflection: "Beri jeda bagi kepalamu yang bising oleh ribuan skenario masa depan. Hidup bukanlah perlombaan lari cepat, melainkan seni mengolah rasa dan merawat kewarasan dari hari ke hari.",
    category: "Tenang & Hati",
    type: "Umum",
    date: "2026-11-05",
    isFeatured: false,
  },
  {
    id: "q-10",
    quote: "Kau tidak bertanggung jawab atas cuaca di luar sana, namun kau selalu berhak memilih bagaimana menyalakan lilin ketenangan di dalam rumah jiwamu.",
    reflection: "Pilah energimu dengan bijaksana. Respon orang lain, ekspektasi lingkungan, dan hal di luar kendalimu bukan beban yang wajib kau pikul. Lindungi keteduhan batinmu sebagai prioritas utama.",
    category: "Pengingat Diri",
    type: "Umum",
    date: "2026-11-04",
    isFeatured: false,
  },
  {
    id: "q-11",
    quote: "Kegagalan bukanlah jurang akhir, melainkan tanah subur tempat benih ketangguhan baru sedang berakar perlahan.",
    reflection: "Setiap langkah yang tersandung selalu menyisakan pemahaman baru jika kita mau menerimanya dengan lapang dada. Jangan takut melangkah lagi; kali ini kau berjalan bukan dari nol, melainkan dari bekal pengalaman.",
    category: "Proses & Bertumbuh",
    type: "Umum",
    date: "2026-11-03",
    isFeatured: false,
  },
  {
    id: "q-12",
    quote: "Jangan terlalu sibuk merindukan puncak gunung hingga kau lupa menikmati indahnya pepohonan yang menaungi jalan setapakmu.",
    reflection: "Hari esok memang perlu dipersiapkan, tetapi kehidupan nyata sedang berlangsung detik ini juga. Hadirlah seutuhnya hari ini: nikmati segelas teh hangatmu dan rasakan nikmatnya bernapas tanpa rasa cemas.",
    category: "Tenang & Hati",
    type: "Umum",
    date: "2026-11-02",
    isFeatured: false,
  },
];

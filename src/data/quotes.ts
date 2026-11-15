/**
 * ============================================================================
 * KOLEKSI KUTIPAN ASLI @nalarnanti (18 Postingan Lengkap)
 * Diurutkan dari yang terbaru (No. 18) hingga postingan pertama (No. 1 "Titik Awal")
 * ============================================================================
 */

export type QuoteCategory =
  | "Refleksi Islami"
  | "Tenang & Hati"
  | "Proses & Bertumbuh"
  | "Jejak Awal Nalar Nanti";

export type QuoteType = "Islami" | "Umum";

export interface QuoteItem {
  id: string;
  themeTitle: string;
  quote: string;
  source: string;
  reflection: string;
  category: QuoteCategory;
  type: QuoteType;
  orderNumber: number;
  isFeatured: boolean;
}

export const QUOTES_DATA: QuoteItem[] = [
  {
    id: "18",
    orderNumber: 18,
    isFeatured: true,
    themeTitle: "Kelola Waktu demi Keseharian",
    quote:
      "Sesungguhnya amalan yang paling dicintai oleh Allah adalah amalan yang dikerjakan secara konsisten, meskipun bentuknya terlihat berupa hal-hal yang kecil.",
    source: "HR. Bukhari & Muslim",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Tidak perlu menunggu langkah besar untuk memulai kebaikan. Langkah kecil yang dijaga setiap hari dengan hati yang hadir jauh lebih bermakna di sisi-Nya.",
  },
  {
    id: "17",
    orderNumber: 17,
    isFeatured: false,
    themeTitle: "Kelola Sikap demi Ketenangan",
    quote:
      "Keselamatan seorang manusia terletak pada kemampuannya menjaga lisan serta ketenangannya dalam merespons dan mengabaikan segala hal yang tidak berguna.",
    source: "HR. Tirmidzi",
    category: "Tenang & Hati",
    type: "Islami",
    reflection:
      "Tidak semua hal perlu ditanggapi dan tidak semua ucapan perlu dibalas. Memilih diam pada hal yang tidak bermanfaat adalah cara terbaik menjaga kejernihan hati.",
  },
  {
    id: "16",
    orderNumber: 16,
    isFeatured: false,
    themeTitle: "Rintis Mulai demi Keikhlasan",
    quote:
      "Mulailah memperbaiki diri sendiri sebelum kamu menuntut perubahan dari dunia di sekitarmu. Sesungguhnya, nalar yang jernih selalu tahu di mana ia harus mulai melangkah dan mengambil tanggung jawab.",
    source: "Ali bin Abi Thalib RA",
    category: "Proses & Bertumbuh",
    type: "Islami",
    reflection:
      "Perubahan yang paling menenangkan selalu dimulai dari dalam diri sendiri. Saat kita fokus membenahi langkah pribadi, dunia di sekitar pun terasa lebih lapang.",
  },
  {
    id: "15",
    orderNumber: 15,
    isFeatured: false,
    themeTitle: "Nikmati Waktu demi Kematangan",
    quote:
      "Jangan terburu-buru, sebab keindahan butuh waktu untuk tumbuh. Ketahuilah bahwa kebijaksanaan tidak datang dari ketergesaan, melainkan dari kesabaran jiwa yang mau menikmati setiap prosesnya.",
    source: "Jalaluddin Rumi",
    category: "Proses & Bertumbuh",
    type: "Umum",
    reflection:
      "Beri ruang bagi dirimu untuk bertumbuh tanpa paksaan. Segala sesuatu yang matang pada waktunya akan selalu memiliki akar yang lebih kuat.",
  },
  {
    id: "14",
    orderNumber: 14,
    isFeatured: false,
    themeTitle: "Pahami Batas demi Ketenangan",
    quote:
      "Mencari keridhaan seluruh manusia adalah hal yang mustahil. Jangan habiskan energimu untuk itu, cukup fokus memperbaiki apa yang ada di dalam dirimu.",
    source: "Imam Syafi'i",
    category: "Tenang & Hati",
    type: "Islami",
    reflection:
      "Melepaskan keinginan untuk selalu dipahami semua orang adalah awal dari kedamaian. Cukup jaga niat baikmu dan terus perbaiki diri.",
  },
  {
    id: "13",
    orderNumber: 13,
    isFeatured: false,
    themeTitle: "Hayati Cukup demi Keberkahan",
    quote:
      "Kekayaan yang sejati bukanlah diukur dari banyaknya harta benda yang kamu miliki, melainkan dari hadirnya rasa cukup dan lapangnya hati dalam menerima setiap porsi kehidupan.",
    source: "HR. Bukhari & Muslim",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Rasa cukup membuat hal sederhana terasa melimpah. Saat hati lapang menerima apa yang ada hari ini, di situlah keberkahan menetap.",
  },
  {
    id: "12",
    orderNumber: 12,
    isFeatured: false,
    themeTitle: "Terima Porsi demi Kedamaian",
    quote:
      "Allah telah membagi rezeki dan takdir untuk setiap hamba-Nya dengan sangat adil. Maka jangan pernah kamu merasa cemas atau takut akan apa yang belum menjadi porsimu.",
    source: "Ibnu Qayyim Al-Jauziyyah",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Apa yang memang ditakdirkan untukmu tidak akan pernah tertukar alamat. Tenangkan pikiranmu dari rasa cemas akan sesuatu yang belum tiba.",
  },
  {
    id: "11",
    orderNumber: 11,
    isFeatured: false,
    themeTitle: "Relakan Harap demi Ketenangan",
    quote:
      "Aku sudah merasakan semua pahitnya kehidupan dan yang paling pahit adalah berharap kepada manusia. Maka gantungkan segala harapanmu hanya kepada Allah, agar hatimu selalu menemukan ketenangan.",
    source: "Sayyidina Ali bin Abi Thalib",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Manusia memiliki batas dalam memenuhi harapan kita, sedangkan Allah tidak pernah mengecewakan hamba yang bersandar sepenuhnya kepada-Nya.",
  },
  {
    id: "10",
    orderNumber: 10,
    isFeatured: false,
    themeTitle: "Pahami Dunia demi Keikhlasan",
    quote:
      "Janganlah kamu bersedih atas urusan dunia, karena kesedihan hanya akan mendatangkan kegelapan di dalam hati. Dan janganlah kamu terlalu bangga dengan kenikmatannya, karena ia tidak akan pernah kekal.",
    source: "Sayyidina Umar bin Khattab RA",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Segala sesuatu di dunia ini bersifat sementara—baik sedihnya maupun senangnya. Sikapi keduanya dengan hati yang seimbang dan ikhlas.",
  },
  {
    id: "9",
    orderNumber: 9,
    isFeatured: false,
    themeTitle: "Mulai Perlahan",
    quote:
      "Mulai saja dari langkah kecil yang paling mampu kamu lakukan hari ini. Tidak perlu menunggu semuanya sempurna untuk memulai kebaikan.",
    source: "Nalar Nanti",
    category: "Proses & Bertumbuh",
    type: "Umum",
    reflection:
      "Sering kali kita tertahan karena menunggu waktu yang paling sempurna, padahal keberanian untuk mulai hari ini sudah merupakan separuh perjalanan.",
  },
  {
    id: "8",
    orderNumber: 8,
    isFeatured: false,
    themeTitle: "Selamat Datang di Nalar Nanti",
    quote:
      "Selamat datang di Nalar Nanti — sebuah ruang singgah untuk berpikir lebih jernih, merasa lebih tenang, dan berprasangka baik pada setiap ketetapan.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Ruang ini hadir sebagai teman dudukmu saat pikiran sedang ramai. Ambil napas sejenak, baca pelan-pelan, dan temukan keteduhanmu di sini.",
  },
  {
    id: "7",
    orderNumber: 7,
    isFeatured: false,
    themeTitle: "Ruang Tunggu",
    quote:
      "Ada fase dalam hidup di mana kita sedang berada di ruang tunggu. Bukan berarti diam tanpa arah, melainkan sedang dipersiapkan untuk sesuatu yang lebih tepat pada waktunya.",
    source: "Nalar Nanti",
    category: "Tenang & Hati",
    type: "Umum",
    reflection:
      "Menunggu memang sering menguji kesabaran, namun di ruang tunggu itulah hati dilatih untuk percaya bahwa waktu terbaik sedang disiapkan.",
  },
  {
    id: "6",
    orderNumber: 6,
    isFeatured: false,
    themeTitle: "Menata Nalar, Merakit Asa",
    quote:
      "Menata nalar agar tetap jernih di tengah riuhnya keadaan, sambil perlahan merakit asa dengan doa dan usaha yang tidak tergesa.",
    source: "Nalar Nanti",
    category: "Proses & Bertumbuh",
    type: "Umum",
    reflection:
      "Ketika pikiran tertata dengan tenang, harapan pun kembali menemukan bentuknya. Pelan-pelan saja, yang penting terus berjalan.",
  },
  {
    id: "5",
    orderNumber: 5,
    isFeatured: false,
    themeTitle: "Halo, Ruang Teduh",
    quote:
      "Halo, terima kasih sudah singgah. Semoga setiap kata yang kamu temukan di ruang kecil ini bisa menjadi teman berbincang yang menenangkan pikiranmu hari ini.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Setiap kalimat ditulis sebagai pengingat sederhana bagi diri sendiri dan siapa pun yang sedang membutuhkan jeda.",
  },
  {
    id: "4",
    orderNumber: 4,
    isFeatured: false,
    themeTitle: "Pikiran Malam",
    quote:
      "Malam selalu punya cara untuk memunculkan kembali hal-hal yang belum selesai dipikirkan. Letakkan sejenak kekhawatiranmu; tidak semua pertanyaan harus dijawab malam ini, ada hal-hal yang cukup dinalar nanti.",
    source: "Nalar Nanti",
    category: "Tenang & Hati",
    type: "Umum",
    reflection:
      "Izinkan dirimu beristirahat dengan tenang malam ini. Esok hari akan datang dengan kejernihan pikiran yang baru.",
  },
  {
    id: "3",
    orderNumber: 3,
    isFeatured: false,
    themeTitle: "Fokus dari Dalam",
    quote:
      "Sebelum sibuk merapikan banyak hal di luar sana, mulailah dengan menata apa yang ada di dalam diri. Ketenangan lahir saat kita berhenti membandingkan langkah sendiri dengan orang lain.",
    source: "Nalar Nanti",
    category: "Proses & Bertumbuh",
    type: "Umum",
    reflection:
      "Setiap orang memiliki garis waktu dan ujiannya masing-masing. Fokuslah merawat ketenangan di dalam dirimu sendiri.",
  },
  {
    id: "2",
    orderNumber: 2,
    isFeatured: false,
    themeTitle: "Apa Kabar Hari Ini?",
    quote:
      "Apa kabar hari ini? Jika kepala terasa penuh dan langkah terasa berat, singgahlah sejenak. Tidak apa-apa untuk merasa lelah, tinggalkan jejak ceritamu di sini sebelum kembali melangkah.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Mengakui bahwa diri sedang lelah bukanlah tanda kelemahan, melainkan bentuk kejujuran agar kita tahu kapan harus berhenti sejenak.",
  },
  {
    id: "1",
    orderNumber: 1,
    isFeatured: false,
    themeTitle: "Titik Awal",
    quote:
      "Setiap perjalanan panjang selalu dimulai dari satu titik awal yang sederhana: keberanian untuk berhenti sejenak, menata pikiran, dan melangkah dengan niat yang jujur.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Dari titik awal inilah Nalar Nanti lahir—sebagai catatan perjalanan untuk terus belajar memahami hidup dengan hati yang lebih lapang.",
  },
];

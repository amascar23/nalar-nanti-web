/**
 * ============================================================================
 * KOLEKSI KUTIPAN ASLI @nalarnanti (18 Postingan Lengkap - Edisi Refinemen Diksi)
 * Diurutkan dari yang terbaru (No. 18) hingga postingan pertama (No. 1)
 * Variasi diksi kaya, puitis, dan bebas dari formula judul/frasa yang berulang.
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
    themeTitle: "Kebaikan Kecil yang Terjaga",
    quote:
      "Sesungguhnya amalan yang paling dicintai oleh Allah adalah amalan yang dikerjakan secara konsisten, meskipun bentuknya terlihat berupa hal-hal yang kecil.",
    source: "HR. Bukhari & Muslim",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Tidak perlu menanti momentum besar untuk merajut kebaikan. Ketekunan sederhana yang dirawat setiap hari dengan hati yang hadir jauh lebih bermakna di hadapan-Nya.",
  },
  {
    id: "17",
    orderNumber: 17,
    isFeatured: false,
    themeTitle: "Menjaga Lisan, Memilih Hening",
    quote:
      "Keselamatan seorang manusia terletak pada kemampuannya menjaga lisan serta ketenangannya dalam merespons dan mengabaikan segala hal yang tidak berguna.",
    source: "HR. Tirmidzi",
    category: "Tenang & Hati",
    type: "Islami",
    reflection:
      "Tidak setiap riak harus ditanggapi dan tidak semua ucapan wajib dibalas. Menahan diri dari hal yang sia-sia adalah benteng terbaik menjaga kemurnian batin.",
  },
  {
    id: "16",
    orderNumber: 16,
    isFeatured: false,
    themeTitle: "Membenahi Langkah Pribadi",
    quote:
      "Mulailah memperbaiki diri sendiri sebelum kamu menuntut perubahan dari dunia di sekitarmu. Sesungguhnya, nalar yang jernih selalu tahu di mana ia harus mulai melangkah dan mengambil tanggung jawab.",
    source: "Ali bin Abi Thalib RA",
    category: "Proses & Bertumbuh",
    type: "Islami",
    reflection:
      "Transformasi yang paling meneduhkan senantiasa bermula dari ruang terdalam diri. Saat kita sibuk merapikan langkah pribadi, semesta di sekitar pun terasa kian lapang.",
  },
  {
    id: "15",
    orderNumber: 15,
    isFeatured: false,
    themeTitle: "Tumbuh Tanpa Tergesa",
    quote:
      "Jangan terburu-buru, sebab keindahan butuh waktu untuk tumbuh. Ketahuilah bahwa kebijaksanaan tidak datang dari ketergesaan, melainkan dari kesabaran jiwa yang mau menikmati setiap prosesnya.",
    source: "Jalaluddin Rumi",
    category: "Proses & Bertumbuh",
    type: "Umum",
    reflection:
      "Beri izin bagi dirimu untuk berproses tanpa desakan. Segala sesuatu yang mekar pada masanya akan selalu memiliki akar yang jauh lebih kukuh.",
  },
  {
    id: "14",
    orderNumber: 14,
    isFeatured: false,
    themeTitle: "Melepas Tuntutan Manusia",
    quote:
      "Mencari keridhaan seluruh manusia adalah hal yang mustahil. Jangan habiskan energimu untuk itu, cukup fokus memperbaiki apa yang ada di dalam dirimu.",
    source: "Imam Syafi'i",
    category: "Tenang & Hati",
    type: "Islami",
    reflection:
      "Melepaskan dahaga untuk selalu disukai atau dipahami semua orang adalah pintu gerbang kedamaian. Cukup jaga niatmu tetap lurus dan teruslah berbenah.",
  },
  {
    id: "13",
    orderNumber: 13,
    isFeatured: false,
    themeTitle: "Kekayaan Bernama Rasa Cukup",
    quote:
      "Kekayaan yang sejati bukanlah diukur dari banyaknya harta benda yang kamu miliki, melainkan dari hadirnya rasa cukup dan lapangnya hati dalam menerima setiap porsi kehidupan.",
    source: "HR. Bukhari & Muslim",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Qanaah mengubah hal yang sederhana menjadi terasa melimpah ruah. Di saat dada lapang menerima apa yang ada hari ini, keberkahan akan tinggal menetap.",
  },
  {
    id: "12",
    orderNumber: 12,
    isFeatured: false,
    themeTitle: "Porsi Takdir yang Tak Tertukar",
    quote:
      "Allah telah membagi rezeki dan takdir untuk setiap hamba-Nya dengan sangat adil. Maka jangan pernah kamu merasa cemas atau takut akan apa yang belum menjadi porsimu.",
    source: "Ibnu Qayyim Al-Jauziyyah",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Apa yang digariskan untukmu tidak akan pernah tersasar ke pelukan orang lain. Istirahatkan pikiranmu dari kecemasan terhadap hari esok yang belum tiba.",
  },
  {
    id: "11",
    orderNumber: 11,
    isFeatured: false,
    themeTitle: "Bersandar Tanpa Kecewa",
    quote:
      "Aku sudah merasakan semua pahitnya kehidupan dan yang paling pahit adalah berharap kepada manusia. Maka gantungkan segala harapanmu hanya kepada Allah, agar hatimu selalu menemukan ketenangan.",
    source: "Sayyidina Ali bin Abi Thalib",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Kemampuan manusia sangat terbatas untuk memikul ekspektasi kita. Sandarkan seluruh harapmu hanya kepada Dzat yang tak pernah ingkar janji.",
  },
  {
    id: "10",
    orderNumber: 10,
    isFeatured: false,
    themeTitle: "Keseimbangan Menghadapi Dunia",
    quote:
      "Janganlah kamu bersedih atas urusan dunia, karena kesedihan hanya akan mendatangkan kegelapan di dalam hati. Dan janganlah kamu terlalu bangga dengan kenikmatannya, karena ia tidak akan pernah kekal.",
    source: "Sayyidina Umar bin Khattab RA",
    category: "Refleksi Islami",
    type: "Islami",
    reflection:
      "Dunia ini hanyalah persinggahan sementara—duka dan tawanya silih berganti. Sambut keduanya dengan hati yang tawaduk, lapang, dan bersahaja.",
  },
  {
    id: "9",
    orderNumber: 9,
    isFeatured: false,
    themeTitle: "Keberanian Memulai Sederhana",
    quote:
      "Tak perlu menunggu segalanya sempurna untuk memulai hal baik. Cukup ambil satu tindakan nyata yang paling mampu kamu kerjakan hari ini.",
    source: "Nalar Nanti",
    category: "Proses & Bertumbuh",
    type: "Umum",
    reflection:
      "Kerap kali yang memberatkan bukanlah panjangnya jalan di depan, melainkan keraguan di awal. Begitu kakimu terayun, pintu-pintu kemudahan akan mulai menyingkap.",
  },
  {
    id: "8",
    orderNumber: 8,
    isFeatured: false,
    themeTitle: "Ruang Teduh untuk Berpikir",
    quote:
      "Beri jeda bagi kepalamu yang bising untuk berpikir lebih jernih, bernapas lebih lapang, dan berprasangka baik pada setiap takdir.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Ketika dunia luar terasa terlalu bising, kembalilah menyapa ke dalam. Ketenangan sejati senantiasa bersemi di dalam hening yang disadari.",
  },
  {
    id: "7",
    orderNumber: 7,
    isFeatured: false,
    themeTitle: "Menemukan Makna di Ruang Tunggu",
    quote:
      "Ada masa di mana kita seolah ditempatkan di ruang tunggu. Bukan berarti langkahmu mandek, melainkan jiwamu sedang dipersiapkan untuk menerima hal yang lebih baik.",
    source: "Nalar Nanti",
    category: "Tenang & Hati",
    type: "Umum",
    reflection:
      "Menanti memang kerap menguji kesabaran. Namun di sela penantian itulah hatimu ditempa untuk yakin bahwa waktu terbaik Allah tak pernah terlambat.",
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
      "Ketika pikiran tertata bening, harapan kembali menemukan kompasnya. Berjalanlah perlahan, yang terpenting arah langkahmu tidak padam.",
  },
  {
    id: "5",
    orderNumber: 5,
    isFeatured: false,
    themeTitle: "Kawan Duduk di Kala Lelah",
    quote:
      "Jika harimu terasa melelahkan, jadikan jeda ini sebagai kawan duduk yang ramah bagi jiwamu sebelum kembali menapaki perjalanan.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Kita kerap lupa bahwa raga dan batin pun berhak beristirahat. Luangkan beberapa menit untuk bernapas tanpa penghakiman.",
  },
  {
    id: "4",
    orderNumber: 4,
    isFeatured: false,
    themeTitle: "Meletakkan Beban di Ujung Malam",
    quote:
      "Malam selalu punya cara memanggil kembali hal-hal yang belum selesai dipikirkan. Letakkan sejenak gundahmu; tidak semua tanya harus tuntas malam ini, ada hal yang cukup dinalar nanti.",
    source: "Nalar Nanti",
    category: "Tenang & Hati",
    type: "Umum",
    reflection:
      "Rebahkan dirimu dengan rasa aman malam ini. Fajar esok akan menyapa bersama ketajaman nalar dan kelapangan dada yang baru.",
  },
  {
    id: "3",
    orderNumber: 3,
    isFeatured: false,
    themeTitle: "Menatap Linimasa Sendiri",
    quote:
      "Sebelum sibuk merapikan banyak hal di luar sana, tengoklah apa yang berkecamuk di dalam diri. Kedamaian mekar saat kita berhenti membandingkan langkah sendiri dengan orang lain.",
    source: "Nalar Nanti",
    category: "Proses & Bertumbuh",
    type: "Umum",
    reflection:
      "Tiap insan memiliki lintasan dan musim bertumbuhnya masing-masing. Rawat kebunmu sendiri dengan tekun dan penuh syukur.",
  },
  {
    id: "2",
    orderNumber: 2,
    isFeatured: false,
    themeTitle: "Mengakui Rasa Lelah",
    quote:
      "Tidak apa-apa jika hari ini tidak berjalan seindah rencanamu. Mengakui bahwa diri sedang letih adalah bentuk welas asih paling jujur pada diri sendiri.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Menjadi tegar bukan berarti pantang rehat. Ada waktu untuk melaju kencang, dan ada waktu untuk duduk memulihkan tenaga.",
  },
  {
    id: "1",
    orderNumber: 1,
    isFeatured: false,
    themeTitle: "Keberanian Memulai Titik Awal",
    quote:
      "Setiap perjalanan bermakna selalu berakar dari satu titik awal yang sederhana: keberanian untuk berhenti sejenak, menjernihkan niat, dan melangkah apa adanya.",
    source: "Nalar Nanti",
    category: "Jejak Awal Nalar Nanti",
    type: "Umum",
    reflection:
      "Dari titik mula inilah Nalar Nanti bertumbuh—sebagai pengingat abadi bahwa hidup selalu memberi ruang untuk memulai kembali dengan hati yang lebih lapang.",
  },
];

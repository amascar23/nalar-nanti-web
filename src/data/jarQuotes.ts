/**
 * ============================================================================
 * KUTIPAN EKSKLUSIF TOPLES NALAR (24 Gulungan Kertas)
 * Khusus untuk fitur interaktif Toples Nalar.
 * Terpisah dari src/data/quotes.ts & Google Sheets.
 * ============================================================================
 */

export interface JarQuoteItem {
  id: number;
  tag: string;
  quote: string;
  encouragement: string;
}

export const JAR_QUOTES: JarQuoteItem[] = [
  {
    id: 1,
    tag: "Peluk Diri",
    quote:
      "Tidak apa-apa jika hari ini langkahmu terasa lebih pelan dari kemarin. Pohon yang paling kokoh pun tidak tumbuh tergesa-gesa; ia menguatkan akarnya diam-diam di dalam tanah sebelum berani menjulang tinggi.",
    encouragement:
      "Tarik napas sebentar, ya. Kamu tidak tertinggal—kamu sedang bertumbuh dengan ritmemu sendiri.",
  },
  {
    id: 2,
    tag: "Bangkit Lagi",
    quote:
      "Jatuh berkali-kali bukan tanda bahwa kamu tidak mampu, melainkan bukti bahwa kamu cukup berani untuk terus mencoba di saat orang lain memilih berhenti sebelum memulai.",
    encouragement:
      "Bersihkan debu di lututmu pelan-pelan. Hari ini masih punya ruang untuk bab baru yang lebih baik.",
  },
  {
    id: 3,
    tag: "Harapan Baru",
    quote:
      "Seberat apa pun malam yang sedang kamu lewati sekarang, ia tidak pernah punya kuasa untuk menahan terbitnya matahari esok pagi.",
    encouragement:
      "Bertahanlah sedikit lagi. Hal-hal baik sering kali datang tepat setelah kita memutuskan untuk tidak menyerah.",
  },
  {
    id: 4,
    tag: "Menghargai Proses",
    quote:
      "Ada banyak perjuangan yang tidak terlihat oleh mata manusia, tidak mendapat tepuk tangan siapa pun, namun dicatat dengan begitu teliti oleh langit.",
    encouragement:
      "Terima kasih sudah bertahan sejauh ini, bahkan untuk hal-hal berat yang tidak pernah kamu ceritakan ke siapa-siapa.",
  },
  {
    id: 5,
    tag: "Berdamai dengan Lelah",
    quote:
      "Manusia bukan mesin yang harus selalu menyala tanpa jeda. Merasa lelah, menangis, lalu beristirahat sejenak adalah bagian yang sah dari perjalanan pulang menuju kuat.",
    encouragement:
      "Izinkan dirimu istirahat malam ini tanpa rasa bersalah. Esok kita lanjutkan lagi dengan tenaga yang utuh.",
  },
  {
    id: 6,
    tag: "Percaya Diri",
    quote:
      "Kamu tidak perlu menjadi versi tiruan dari siapa pun untuk pantas dihargai. Kehadiranmu yang tulus sudah membawa warna yang tidak bisa digantikan oleh orang lain.",
    encouragement:
      "Jangan kecilkan dirimu sendiri. Kamu jauh lebih berharga dan mampu daripada yang sering kamu khawatirkan.",
  },
  {
    id: 7,
    tag: "Ketenangan Batin",
    quote:
      "Tidak semua pintu yang tertutup adalah penolakan; sebagian besar adalah cara lembut semesta melindungimu dari ruang yang tidak akan membuat jiwamu bertumbuh.",
    encouragement:
      "Lepaskan yang memang bukan untukmu dengan lapang—ada tempat pulang yang jauh lebih hangat sedang disiapkan.",
  },
  {
    id: 8,
    tag: "Semangat Pagi",
    quote:
      "Kamu tidak harus langsung menyelesaikan seluruh tangga hari ini. Cukup fokus menapaki satu anak tangga di depan mata dengan hati yang hadir sepenuhnya.",
    encouragement:
      "Mulai dari satu hal kecil hari ini. Langkah mungil yang nyata jauh lebih berarti daripada rencana besar yang terus ditunda.",
  },
  {
    id: 9,
    tag: "Sembuh Pelan-Pelan",
    quote:
      "Luka yang dalam memang butuh waktu untuk menutup, dan tidak ada batas waktu yang memaksamu harus segera terlihat baik-baik saja di hadapan dunia.",
    encouragement:
      "Pelan-pelan saja sembuhnya. Tidak ada yang sedang mengejarmu untuk segera berlari.",
  },
  {
    id: 10,
    tag: "Cahaya Kecil",
    quote:
      "Bahkan di ruangan yang paling gelap sekalipun, satu nyala lilin kecil sudah cukup untuk mematahkan kuasa gulita.",
    encouragement:
      "Sekecil apa pun kebaikan dan usahamu hari ini, percayalah itu sedang menerangi jalanmu sendiri.",
  },
  {
    id: 11,
    tag: "Keberanian",
    quote:
      "Rasa takut sering kali hanya bayangan yang membesar sebelum kita melangkah. Begitu kaki mulai bergerak, bayangan itu perlahan mengecil di belakang punggung.",
    encouragement:
      "Coba ambil satu langkah kecil dulu. Kamu tidak sendirian dalam perjalanan ini.",
  },
  {
    id: 12,
    tag: "Syukur Sederhana",
    quote:
      "Kadang kita terlalu sibuk mencari keajaiban di kejauhan, sampai lupa bahwa masih bisa bernapas lega hari ini adalah jawaban dari doa-doa kita di masa lalu.",
    encouragement:
      "Coba ingat satu hal kecil yang berjalan lancar hari ini—hatimu layak merayakannya.",
  },
  {
    id: 13,
    tag: "Validasi Rasa",
    quote:
      "Tidak apa-apa jika hari ini kamu belum punya semua jawabannya. Hidup memang bukan soal menebak seluruh peta, melainkan berjalan dengan iman meski kabut belum sepenuhnya turun.",
    encouragement:
      "Kamu tidak harus tahu semuanya sekarang. Jalani saja hari ini dengan jujur dan lembut pada dirimu.",
  },
  {
    id: 14,
    tag: "Kekuatan Hati",
    quote:
      "Lihatlah ke belakang sebentar: sudah berapa banyak badai yang dulu kamu kira tidak akan sanggup kamu lewati, namun nyatanya hari ini kamu masih berdiri di sini?",
    encouragement:
      "Kamu sudah selamat dari 100% hari-hari tersulitmu. Badai yang ini pun pasti akan berlalu.",
  },
  {
    id: 15,
    tag: "Jeda Sejenak",
    quote:
      "Air yang keruh tidak akan pernah menjadi jernih jika terus diaduk. Ia hanya butuh didiamkan sejenak agar seluruh endapannya turun dengan sendirinya.",
    encouragement:
      "Tutup layar sejenak, minum segelas air, dan biarkan pikiranmu tenang sebelum mengambil keputusan apa pun.",
  },
  {
    id: 16,
    tag: "Keikhlasan",
    quote:
      "Apa yang ditakdirkan menjadi milikmu tidak akan pernah tersesat mencari alamatmu, dan apa yang melewatimu memang tidak pernah ditulis untuk memberatkan pundakmu.",
    encouragement:
      "Tenangkan hatimu. Tugasmu hanya berikhtiar sebaik mungkin, sisanya biarkan tangan Tuhan yang merapikan.",
  },
  {
    id: 17,
    tag: "Bangga pada Diri",
    quote:
      "Mungkin pencapaianmu hari ini belum sebesar yang kamu impikan, tapi fakta bahwa kamu tetap memilih berbuat baik di tengah lelahmu adalah kemenangan yang luar biasa.",
    encouragement:
      "Tepuk bahumu sendiri malam ini. Kamu sudah melakukan yang terbaik dengan kapasitas yang kamu punya hari ini.",
  },
  {
    id: 18,
    tag: "Awal Baru",
    quote:
      "Selama napas masih berembus, tidak ada kata terlambat untuk memperbaiki arah, memaafkan kesalahan kemarin, dan menanam benih harapan yang baru.",
    encouragement:
      "Hari kemarin sudah selesai. Hari ini adalah halaman putih yang siap kamu tulis ulang dengan penuh kasih.",
  },
  {
    id: 19,
    tag: "Ketulusan",
    quote:
      "Hal-hal yang dikerjakan dengan hati yang tulus mungkin terasa lambat hasilnya, namun akarnya menghujam jauh lebih dalam dan bertahan jauh lebih lama.",
    encouragement:
      "Terus jaga ketulusan niatmu. Apa yang tumbuh dari hati akan selalu menemukan jalan menuju hati yang lain.",
  },
  {
    id: 20,
    tag: "Ditemani",
    quote:
      "Di saat kamu merasa sepi dan tak dimengerti siapa pun, ingatlah bahwa ada doa-doa baik yang diam-diam menyebut namamu dan ada penjagaan yang tak pernah sedetik pun meninggalkanmu.",
    encouragement:
      "Kamu tidak pernah benar-benar sendirian. Selalu ada ruang aman bagimu untuk pulang dan bercerita.",
  },
  {
    id: 21,
    tag: "Kegagalan yang Mendidik",
    quote:
      "Rencana yang gagal bukanlah akhir dari cerita; ia hanyalah belokan tajam yang mengarahkanmu menuju pemandangan yang jauh lebih indah dari dugaanmu.",
    encouragement:
      "Jangan hukum dirimu terlalu keras atas rencana yang meleset. Belajarlah darinya, lalu tersenyumlah lagi.",
  },
  {
    id: 22,
    tag: "Kelembutan",
    quote:
      "Dunia di luar sana mungkin sering terasa keras dan menuntut, maka jadilah rumah yang paling lembut dan ramah untuk dirimu sendiri.",
    encouragement:
      "Bicaralah pada dirimu sendiri dengan nada selembut saat kamu menenangkan sahabat yang sedang bersedih.",
  },
  {
    id: 23,
    tag: "Ketekunan",
    quote:
      "Tetesan air yang jatuh pelan namun tak pernah berhenti mampu melubangi batu karang yang paling keras sekalipun.",
    encouragement:
      "Jangan remehkan konsistensi kecilmu setiap hari. Sedikit demi sedikit, semuanya sedang membentuk masa depanmu.",
  },
  {
    id: 24,
    tag: "Pulang ke Diri",
    quote:
      "Kamu tidak harus selalu kuat untuk dicintai, dan kamu tidak harus selalu sempurna untuk layak menerima kebahagiaan.",
    encouragement:
      "Hari ini, cukup jadi dirimu apa adanya. Itu sudah lebih dari cukup.",
  },
];

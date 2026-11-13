export interface ReminderItem {
  id: string;
  theme: string;
  title: string;
  body: string;
  actionPrompt: string;
}

export const REMINDERS_DATA: ReminderItem[] = [
  {
    id: "rem-1",
    theme: "Napas & Jeda",
    title: "Turunkan pundakmu yang tegang",
    body: "Tarik napas panjang lewat hidung selama 4 detik, tahan 4 detik, lalu hembuskan perlahan selama 6 detik. Sadari bahwa saat ini kamu aman.",
    actionPrompt: "Lepaskan ketegangan di rahang dan dahi sekarang juga.",
  },
  {
    id: "rem-2",
    theme: "Penerimaan Hari Ini",
    title: "Cukup untuk hari ini",
    body: "Kamu tidak harus menyelesaikan seluruh teka-teki hidupmu sebelum matahari terbenam. Apa yang sudah kau usahakan hari ini sudah bernilai.",
    actionPrompt: "Katakan dalam hati: 'Aku sudah berusaha dengan sebaik-baiknya kemampuanku hari ini.'",
  },
  {
    id: "rem-3",
    theme: "Ritme Sendiri",
    title: "Jangan bandingkan musimmu",
    body: "Orang lain mungkin sedang memanen, sementara kamu baru saja menabur benih. Menabur adalah proses yang sakral, jangan remehkan fase ini.",
    actionPrompt: "Tutup aplikasi media sosial sejenak dan minum segelas air hangat.",
  },
  {
    id: "rem-4",
    theme: "Ketenangan Batin",
    title: "Pikiranmu bukan ramalan mutlak",
    body: "Kekhawatiran seringkali hanya cerita karangan otak yang mencoba melindungimu dari hal yang belum terjadi. Sadari bahwa ketakutan itu belum nyata.",
    actionPrompt: "Tuliskan 1 hal sederhana yang paling kau syukuri dari sekelilingmu saat ini.",
  },
  {
    id: "rem-5",
    theme: "Ruang Merasa",
    title: "Boleh lelah, asal jangan menyerah pada diri sendiri",
    body: "Istirahat adalah bagian penting dari perjalanan panjang. Mesin saja bisa panas jika dipaksa bekerja tanpa jeda, apalagi hati dan pikiranmu.",
    actionPrompt: "Rebahkan punggungmu selama 5 menit tanpa memegang gawai.",
  },
  {
    id: "rem-6",
    theme: "Nalar & Kejernihan",
    title: "Mana yang bisa kau kontrol?",
    body: "Pilah energimu. Respon orang lain di luar kuasamu, namun caramu merespon dan menjaga kebaikan hatimu sepenuhnya milikmu.",
    actionPrompt: "Fokuskan pandangan pada satu titik di luar jendela dan nikmati pemandangan sejenak.",
  },
];

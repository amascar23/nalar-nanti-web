# Nalar Nanti — Ruang Teduh untuk Berpikir & Merasa

Website modern, hangat, dan minimalis untuk brand **Nalar Nanti**, dibangun menggunakan Next.js (App Router), TypeScript, dan Tailwind CSS.

---

## 🎨 Palet Warna & Tipografi

### Palet Visual (Soft Cream Palette)
* **Background Utama**: `#FAF7F2` (`bg-[#FAF7F2]` / `bg-cream-base`)
* **Background Kartu/Card**: `#F3EDE2` (`bg-[#F3EDE2]` / `bg-cream-card`)
* **Border Halus**: `#E5DDD0` (`border-[#E5DDD0]` / `border-cream-border`)
* **Teks Utama**: `#3E362E` (`text-[#3E362E]` / `text-cream-dark`)
* **Teks Sekunder**: `#7A6F64` (`text-[#7A6F64]` / `text-cream-muted`)
* **Aksen Tombol / Highlight**: `#C8A98E` (`bg-[#C8A98E]` / `bg-cream-accent`)
* **Aksen Pendukung (Sage Calmness)**: `#8E9B8E` (`text-[#8E9B8E]` / `bg-[#8E9B8E]`)

### Tipografi (Google Fonts)
* **Judul & Kutipan (Serif)**: `Lora`
* **Teks Isi, Navigasi, & Tombol (Sans-serif)**: `Plus Jakarta Sans`

---

## ✨ Fitur-fitur Utama

1. **Navbar Minimalis**:
   * Header fixed/sticky dengan efek backdrop blur halus saat bergulir.
   * Brand logo "Nalar Nanti" dengan tipografi serif elegan dan badge "ruang teduh".
   * Menu navigasi halus: **Beranda**, **Kutipan**, **Pengingat Acak**, **Tentang**.
   * Tombol aksi cepat *"Tarik Napas"* dan drawer navigasi mobile responsif.

2. **Hero Section yang Hangat & Menenangkan**:
   * Headline pembuka puitis: *"Ketika dunia terasa tergesa, beri jeda untuk nalar dan rasa."*
   * Widget interaktif latihan napas 4-4-6 (*Box Breathing*) dengan animasi visual siklus tarik, tahan, dan hembuskan napas.
   * Tombol aksi langsung ke Pengingat Acak dan Penjelajahan Kutipan.

3. **Bagian Kutipan Pilihan**:
   * Kurasi kutipan yang menenangkan batin dengan filter kategori: *Semua*, *Jeda*, *Penerimaan*, *Ketenangan*, *Pertumbuhan*, *Harapan*.
   * Kartu kutipan menggunakan latar `#F3EDE2`, border `#E5DDD0`, dan tipografi Lora.
   * Fitur interaktif: Salin kutipan ke clipboard & bagikan ke WhatsApp.

4. **Pengingat Acak (Interactive Mindful Reminder)**:
   * Generator kartu refleksi acak dengan animasi transisi yang halus.
   * Berisi tema, judul pengingat, pesan mendalam, serta panduan langkah lembut (*gentle action prompt*).
   * Tombol *Acak Pengingat Baru*, salin teks pengingat, dan bagikan ke WhatsApp.

5. **Tentang Nalar Nanti**:
   * Eksplorasi filosofi makna *Nalar* (kejernihan akal sehat) dan *Nanti* (izin welas asih untuk menunda kepanikan dan menghormati waktu).
   * 3 Pilar Refleksi: *Beri Jeda*, *Ruang Rasa*, dan *Nalar yang Jernih*.

6. **Pemandu Suasana Hati (Mood Guide)**:
   * Fitur interaktif untuk memilih suasana hati saat ini: *Kepala Lagi Penuh & Lelah*, *Cemas Soal Masa Depan*, *Butuh Penguat Sabar*, *Belajar Mengikhlaskan*, dan *Ingin Lebih Bersyukur*.
   * Menyuguhkan sapaan empatik yang hangat serta 3 kutipan rekomendasi relevan.

7. **Saku Hati (Bookmark Favorit Offline)**:
   * Pengunjung dapat menandai dan menyimpan kutipan favorit tanpa perlu akun / login (tersimpan di `localStorage`).
   * Tombol pintas "Saku Hati" dengan lencana hitungan pada navigasi dan laci (*drawer*) bernuansa Soft Cream.

8. **Unduh Kartu Kutipan (PNG 9:16 Story & Status)**:
   * Menggambar kartu kutipan estetik beresolusi 1080 x 1920 piksel langsung di browser menggunakan HTML5 Canvas native (ringan tanpa dependensi luar).
   * Siap dibagikan langsung ke Instagram Story maupun Status WhatsApp.

9. **Suara Teduh (Ambient Audio)**:
   * Menghasilkan audio rintik hujan lembut dan dengung ambient menenangkan menggunakan Web Audio API native tanpa file audio eksternal.
   * Dilengkapi kontrol toggle di pojok kiri bawah dengan transisi *fade-in* dan *fade-out* yang halus.

10. **Pratinjau Tautan Dinamis (OpenGraph & Social Share)**:
    * Kartu pratinjau sosial otomatis berukuran 1200 x 630 piksel via `next/og` saat dibagikan ke WhatsApp, Instagram DM, dan media sosial lainnya.

11. **Footer Bersih & Terhubung**:
    * Identitas resmi: **"Nalar Nanti — Ruang Teduh untuk Berpikir & Merasa"**.
    * Tautan langsung ke media sosial:
      * **Instagram**: [@nalarnanti](https://www.instagram.com/nalarnanti/)
      * **Saluran WhatsApp**: [@NalarNanti](https://whatsapp.com/channel/0029VbBLknC7IUYPlfksIh0Y)

---

## 🚀 Menjalankan Proyek Secara Lokal

### Prasyarat
* Node.js versi 18+ (disarankan Node.js 20+)
* npm atau package manager yang kompatibel

### Perintah
1. **Jalankan Server Pengembangan**:
   ```bash
   npm run dev
   ```
   Buka [http://localhost:3000](http://localhost:3000) pada browser Anda.

2. **Build untuk Produksi**:
   ```bash
   npm run build
   ```

3. **Jalankan Build Produksi**:
   ```bash
   npm run start
   ```

---

## 🌿 Struktur Direktori
```
nalarNanti/
├── src/
│   ├── app/
│   │   ├── globals.css         # Styling global Tailwind, scrollbar & animasi napas
│   │   ├── layout.tsx          # Konfigurasi Google Fonts (Lora & Plus Jakarta Sans) & metadata
│   │   └── page.tsx            # Halaman utama Nalar Nanti
│   ├── components/
│   │   ├── Navbar.tsx          # Navigasi minimalis responsif
│   │   ├── HeroSection.tsx     # Hero banner & widget latihan napas 4-4-6
│   │   ├── QuoteSection.tsx    # Bagian kutipan berfilter kategori & aksi salin
│   │   ├── RandomReminderSection.tsx # Generator pengingat acak interaktif
│   │   ├── AboutSection.tsx    # Narasi filosofi & 3 pilar Nalar Nanti
│   │   └── Footer.tsx          # Footer bersih & tautan Instagram/WhatsApp
│   └── data/
│       ├── quotes.ts           # Data kutipan pilihan
│       └── reminders.ts        # Data pengingat mindfulness
├── package.json
├── tailwind.config.ts          # Konfigurasi palet warna Soft Cream & tipografi
├── tsconfig.json
└── next.config.ts
```


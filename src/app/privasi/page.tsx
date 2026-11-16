import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { ShieldCheck, Lock, Heart, ArrowLeft, Mail, Database, Cookie, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Kebijakan Privasi — Nalar Nanti",
  description:
    "Komitmen privasi Nalar Nanti: ruang hening yang menghormati privasimu tanpa pelacakan agresif, tanpa iklan, dan menjaga data batinmu tetap aman di perangkatmu sendiri.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen text-[#3E362E] dark:text-[#EDE6DC] relative selection:bg-[#C8A98E]/30 selection:text-[#3E362E] overflow-x-hidden">
      <Navbar />

      <main className="flex-grow relative z-10 py-10 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Tombol Kembali ke Beranda */}
          <div className="mb-6 sm:mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#7A6F64] dark:text-[#A89F94] hover:text-[#3E362E] dark:hover:text-[#EDE6DC] bg-gradient-to-r from-[#FAF7F2] to-[#F3EDE2] dark:from-[#26221F] dark:to-[#1C1917] hover:border-[#C8A98E] border border-[#E5DDD0] dark:border-[#3A332E] px-3.5 py-2 rounded-xl transition-all shadow-soft active:scale-95 group whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>← Kembali ke Beranda</span>
            </Link>
          </div>

          {/* Header Kebijakan Privasi */}
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#1E1B18] border border-[#E5DDD0] dark:border-[#3A332E] text-xs font-semibold text-[#886950] dark:text-[#C8A98E] mb-3 shadow-soft">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C8A98E]" />
              <span>Komitmen Keterbukaan &amp; Keamanan Data</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-semibold text-[#3E362E] dark:text-[#EDE6DC] tracking-tight mb-3">
              Kebijakan Privasi Nalar Nanti
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
              Terakhir diperbarui: {new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date())}.
              Nalar Nanti dibangun dengan prinsip dasar bahwa ruang perenungan batin harus selalu menjadi tempat yang aman, teduh, dan menghormati privasimu seutuhnya.
            </p>
          </div>

          {/* Konten Kebijakan */}
          <div className="space-y-6 sm:space-y-8 bg-gradient-to-br from-[#FAF7F2] via-[#F3EDE2] to-[#EAE1D3] dark:from-[#26221F] dark:via-[#221E1B] dark:to-[#1C1917] border border-[#E5DDD0] dark:border-[#3A332E] ring-1 ring-inset ring-white/70 dark:ring-white/5 rounded-3xl p-6 sm:p-10 shadow-[0_12px_36px_-10px_rgba(200,169,142,0.20)] dark:shadow-none text-left">
            {/* Bagian 1 */}
            <section className="space-y-3 pb-6 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <div className="flex items-center gap-2.5 text-[#886950] dark:text-[#C8A98E]">
                <Database className="w-5 h-5 shrink-0" />
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                  1. Penyimpanan Lokal di Perangkatmu (Local Storage)
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                Fitur refleksi pribadi pada website ini meliputi:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                <li><strong className="text-[#3E362E] dark:text-[#EDE6DC]">Saku Hati:</strong> daftar kutipan yang kamu simpan sebagai pengingat favorit.</li>
                <li><strong className="text-[#3E362E] dark:text-[#EDE6DC]">Jejak Syukur:</strong> 3 hal harian yang kamu syukuri di Ruang Jeda.</li>
                <li><strong className="text-[#3E362E] dark:text-[#EDE6DC]">Kapsul Waktu:</strong> surat dan harapan yang kamu kunci untuk dirimu di masa depan.</li>
                <li><strong className="text-[#3E362E] dark:text-[#EDE6DC]">Preferensi Tema:</strong> pilihan Mode Pagi (Soft Cream) atau Mode Malam (Warm Espresso).</li>
              </ul>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                Seluruh data di atas disimpan secara <em>eksklusif di penyimpanan lokal (localStorage) browser perangkatmu</em>. Kami tidak menyimpannya di basis data eksternal ataupun melacak isi jurnal batinmu. Kamu memegang kendali penuh atas data ini.
              </p>
            </section>

            {/* Bagian 2 */}
            <section className="space-y-3 pb-6 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <div className="flex items-center gap-2.5 text-[#886950] dark:text-[#C8A98E]">
                <Mail className="w-5 h-5 shrink-0" />
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                  2. Formulir Ruang Bercerita &amp; Titip Nalar
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                Saat kamu mengirimkan cerita di halaman <strong className="text-[#3E362E] dark:text-[#EDE6DC]">Ruang Bercerita</strong> atau formulir <strong className="text-[#3E362E] dark:text-[#EDE6DC]">Titip Nalar</strong>:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                <li>Pesanmu diteruskan melalui layanan formulir aman (<a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C8A98E]">Web3Forms</a> dan <a href="https://formsubmit.co" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#C8A98E]">FormSubmit</a>) langsung menuju kotak masuk email privat admin pengelola Nalar Nanti.</li>
                <li><strong className="text-[#3E362E] dark:text-[#EDE6DC]">Opsionalitas Identitas:</strong> Kamu bebas mencantumkan sapaan samaran atau mengosongkan nama (anonim).</li>
                <li><strong className="text-[#3E362E] dark:text-[#EDE6DC]">Alamat Email:</strong> Jika kamu menyertakan alamat email, alamat tersebut hanya akan digunakan untuk membalas curhatan atau saran secara personal, dan tidak pernah dimasukkan ke daftar nawala (newsletter) pemasaran atau dijual ke pihak ketiga.</li>
              </ul>
            </section>

            {/* Bagian 3 */}
            <section className="space-y-3 pb-6 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <div className="flex items-center gap-2.5 text-[#886950] dark:text-[#C8A98E]">
                <Cookie className="w-5 h-5 shrink-0" />
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                  3. Ketiadaan Pelacak Pihak Ketiga &amp; Iklan
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                Website Nalar Nanti berprinsip <em>privacy-first</em>:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                <li>Tidak memasang script pelacak pihak ketiga (seperti Facebook Pixel atau Google AdSense).</li>
                <li>Tidak menampilkan iklan komersial maupun pop-up yang mengganggu ketenangan membaca.</li>
                <li>Audio latar belakang (Instrumen Teduh) dijalankan 100% menggunakan <em>Web Audio API native</em> browser tanpa mengambil berkas audio dari pelacak luar.</li>
              </ul>
            </section>

            {/* Bagian 4 */}
            <section className="space-y-3 pb-6 border-b border-[#E5DDD0]/70 dark:border-[#3A332E]">
              <div className="flex items-center gap-2.5 text-[#886950] dark:text-[#C8A98E]">
                <Trash2 className="w-5 h-5 shrink-0" />
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                  4. Hak Menghapus Data Mandiri
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                Kamu dapat menghapus seluruh catatan syukur, kapsul waktu, maupun kutipan tersimpan kapan saja langsung dari antarmuka pengguna website ini melalui tombol hapus pada masing-masing item, atau dengan membersihkan <em>cache / local storage</em> browsermu.
              </p>
            </section>

            {/* Bagian 5 */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-[#886950] dark:text-[#C8A98E]">
                <Heart className="w-5 h-5 shrink-0" />
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#3E362E] dark:text-[#EDE6DC]">
                  5. Hubungi Kami
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-[#7A6F64] dark:text-[#A89F94] leading-relaxed">
                Jika kamu memiliki pertanyaan, masukan, atau permohonan terkait privasimu di Nalar Nanti, kamu dapat menghubungi kami dengan hangat melalui:
              </p>
              <div className="p-4 rounded-2xl bg-white/70 dark:bg-[#1E1B18]/70 border border-[#E5DDD0] dark:border-[#3A332E] text-xs sm:text-sm space-y-1">
                <p><strong>Email Admin:</strong> <a href="mailto:nalarnantii@gmail.com" className="text-[#886950] dark:text-[#C8A98E] underline">nalarnantii@gmail.com</a></p>
                <p><strong>Instagram:</strong> <a href="https://www.instagram.com/nalarnanti/" target="_blank" rel="noopener noreferrer" className="text-[#886950] dark:text-[#C8A98E] underline">@nalarnanti</a></p>
                <p><strong>Saluran WhatsApp:</strong> <a href="https://whatsapp.com/channel/0029VbBLknC7IUYPlfksIh0Y" target="_blank" rel="noopener noreferrer" className="text-[#886950] dark:text-[#C8A98E] underline">Saluran @NalarNanti</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

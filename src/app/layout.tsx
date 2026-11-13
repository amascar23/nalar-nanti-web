import type { Metadata, Viewport } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nalarnanti.com"),
  title: "Nalar Nanti — Kata Motivasi Islami & Refleksi Hati",
  description:
    "Ruang teduh untuk berpikir dan merasa. Kumpulan kata-kata motivasi Islami, kutipan penyejuk hati, pengingat acak harian, dan refleksi kehidupan sehari-hari.",
  keywords: [
    "Nalar Nanti",
    "Kata Motivasi Islami",
    "Refleksi Hati",
    "Ruang Teduh",
    "Kutipan Ketenangan",
    "Pengingat Acak",
    "Tawakal dan Sabar",
    "Self Healing Islami",
    "Mindfulness Indonesia",
    "Jeda Kehidupan",
  ],
  authors: [{ name: "Nalar Nanti", url: "https://instagram.com/nalarnanti" }],
  creator: "Nalar Nanti",
  publisher: "Nalar Nanti",
  alternates: {
    canonical: "https://nalarnanti.com",
  },
  openGraph: {
    title: "Nalar Nanti — Kata Motivasi Islami & Refleksi Hati",
    description:
      "Ruang teduh untuk berpikir dan merasa. Kumpulan kata-kata motivasi Islami, kutipan penyejuk hati, pengingat acak harian, dan refleksi kehidupan sehari-hari.",
    url: "https://nalarnanti.com",
    siteName: "Nalar Nanti",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalar Nanti — Kata Motivasi Islami & Refleksi Hati",
    description:
      "Ruang teduh untuk berpikir dan merasa. Kumpulan kata-kata motivasi Islami, kutipan penyejuk hati, pengingat acak harian, dan refleksi kehidupan sehari-hari.",
    creator: "@nalarnanti",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${lora.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-[#FAF7F2] text-[#3E362E] min-h-screen flex flex-col antialiased selection:bg-[#C8A98E]/30 selection:text-[#3E362E] touch-manipulation">
        {children}
      </body>
    </html>
  );
}

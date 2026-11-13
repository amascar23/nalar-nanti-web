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
  title: "Nalar Nanti — Menata Nalar, Merakit Asa",
  description:
    "Ruang singgah digital untuk Menata Nalar, Merakit Asa. Rumah digital resmi dari akun Instagram @nalarnanti dan Saluran WhatsApp @NalarNanti berisi kata motivasi Islami, pengingat harian, dan refleksi ketenangan diri.",
  keywords: [
    "Nalar Nanti",
    "Menata Nalar Merakit Asa",
    "@nalarnanti",
    "@NalarNanti",
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
  authors: [{ name: "Nalar Nanti", url: "https://www.instagram.com/nalarnanti/" }],
  creator: "Nalar Nanti",
  publisher: "Nalar Nanti",
  alternates: {
    canonical: "https://nalarnanti.com",
  },
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
    apple: "/logo.jpg",
  },
  openGraph: {
    title: "Nalar Nanti — Menata Nalar, Merakit Asa",
    description:
      "Ruang singgah digital untuk Menata Nalar, Merakit Asa. Rumah digital resmi dari akun Instagram @nalarnanti dan Saluran WhatsApp @NalarNanti berisi kata motivasi Islami, pengingat harian, dan refleksi ketenangan diri.",
    url: "https://nalarnanti.com",
    siteName: "Nalar Nanti",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.jpg",
        width: 1024,
        height: 576,
        alt: "Logo Nalar Nanti",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalar Nanti — Menata Nalar, Merakit Asa",
    description:
      "Ruang singgah digital untuk Menata Nalar, Merakit Asa. Rumah digital resmi dari akun Instagram @nalarnanti dan Saluran WhatsApp @NalarNanti berisi kata motivasi Islami, pengingat harian, dan refleksi ketenangan diri.",
    creator: "@nalarnanti",
    images: ["/logo.jpg"],
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
    <html lang="id" className={`${lora.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body
        className="font-sans bg-[#FAF7F2] text-[#3E362E] min-h-screen flex flex-col antialiased selection:bg-[#C8A98E]/30 selection:text-[#3E362E] touch-manipulation"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

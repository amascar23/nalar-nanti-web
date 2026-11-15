import type { Metadata, Viewport } from "next";
import { Lora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { SavedQuotesProvider } from "@/context/SavedQuotesContext";
import SavedQuotesModal from "@/components/SavedQuotesModal";
import AmbientSoundToggle from "@/components/AmbientSoundToggle";
import ThemeBackground from "@/components/ThemeBackground";
import { getQuotes } from "@/lib/getQuotes";

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
  metadataBase: new URL("https://nalar-nanti-web.vercel.app"),
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
    canonical: "https://nalar-nanti-web.vercel.app",
  },
  icons: {
    icon: "/logo-hd.png",
    shortcut: "/logo-square.png",
    apple: "/logo-hd.png",
  },
  openGraph: {
    title: "Nalar Nanti — Menata Nalar, Merakit Asa",
    description:
      "Ruang singgah digital untuk Menata Nalar, Merakit Asa. Rumah digital resmi dari akun Instagram @nalarnanti dan Saluran WhatsApp @NalarNanti berisi kata motivasi Islami, pengingat harian, dan refleksi ketenangan diri.",
    url: "https://nalar-nanti-web.vercel.app",
    siteName: "Nalar Nanti",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nalar Nanti — Menata Nalar, Merakit Asa",
    description:
      "Ruang singgah digital untuk Menata Nalar, Merakit Asa. Rumah digital resmi dari akun Instagram @nalarnanti dan Saluran WhatsApp @NalarNanti berisi kata motivasi Islami, pengingat harian, dan refleksi ketenangan diri.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const quotes = await getQuotes();

  return (
    <html lang="id" className={`${lora.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body
        className="font-sans bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2] to-[#F5EFE5] dark:from-[#1C1917] dark:via-[#191614] dark:to-[#141210] text-[#3E362E] dark:text-[#EDE6DC] min-h-screen flex flex-col antialiased selection:bg-[#C8A98E]/30 selection:text-[#3E362E] dark:selection:text-[#EDE6DC] touch-manipulation relative transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <ThemeBackground />
          <SavedQuotesProvider initialQuotes={quotes}>
            {children}
            <SavedQuotesModal />
            <AmbientSoundToggle />
          </SavedQuotesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

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
  title: "Nalar Nanti — Ruang Teduh untuk Berpikir & Merasa",
  description:
    "Ruang teduh untuk berpikir dan merasa. Temukan jeda, kutipan menenangkan, dan pengingat acak untuk menemani hari-harimu di tengah dunia yang serba lekas.",
  keywords: [
    "Nalar Nanti",
    "Ruang Teduh",
    "Kutipan Ketenangan",
    "Pengingat Acak",
    "Refleksi Diri",
    "Mindfulness Indonesia",
    "Jeda",
  ],
  authors: [{ name: "Nalar Nanti" }],
  openGraph: {
    title: "Nalar Nanti — Ruang Teduh untuk Berpikir & Merasa",
    description:
      "Temukan jeda, kutipan menenangkan, dan pengingat acak untuk menemani hari-harimu.",
    url: "https://nalarnanti.com",
    siteName: "Nalar Nanti",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${lora.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans bg-cream text-cream-dark min-h-screen flex flex-col antialiased selection:bg-cream-accent/30 selection:text-cream-dark">
        {children}
      </body>
    </html>
  );
}


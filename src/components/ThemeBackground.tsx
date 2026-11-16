import React from "react";

/**
 * 🌿 ThemeBackground
 * Menghadirkan tampilan latar belakang Warm Cream (#FAF7F2) yang bersih, tenang, dan merata
 * dengan ambient gradient halus tanpa elemen watermark teks yang mengganggu celah kartu.
 */
export default function ThemeBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,169,142,0.10),rgba(250,247,242,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(200,169,142,0.05),rgba(28,25,23,0))]"
    />
  );
}

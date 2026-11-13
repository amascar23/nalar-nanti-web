import { ImageResponse } from "next/og";

// Metadata gambar
export const alt = "Nalar Nanti — Menata Nalar, Merakit Asa";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * 🎨 OpenGraph Image Generator untuk Nalar Nanti
 * Menghasilkan kartu pratinjau tautan 1200 x 630 piksel secara otomatis
 * bertema Soft Cream (#FAF7F2 & #F3EDE2) untuk Instagram, WhatsApp, dan media sosial.
 * Menggunakan font sistem bawaan tanpa fetch font luar agar kompilasi selalu instan.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF7F2",
          padding: "44px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Bingkai Dalam Kartu Soft Sand */}
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#F3EDE2",
            border: "2px solid #E5DDD0",
            borderRadius: "32px",
            padding: "50px 60px",
          }}
        >
          {/* Header Tagline Kecil */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#8E9B8E",
              }}
            />
            <span
              style={{
                fontSize: "17px",
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#7A6F64",
                fontFamily: "sans-serif",
                fontWeight: 600,
              }}
            >
              Ruang Singgah Digital
            </span>
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#8E9B8E",
              }}
            />
          </div>

          {/* Area Tengah: Judul Utama & Subjudul Puitis */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "14px",
            }}
          >
            {/* Ornamen Garis Minimalis Atas */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginBottom: "6px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "2px",
                  backgroundColor: "#C8A98E",
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "#C8A98E",
                }}
              />
              <div
                style={{
                  width: "56px",
                  height: "2px",
                  backgroundColor: "#C8A98E",
                }}
              />
            </div>

            {/* Judul Besar Nalar Nanti */}
            <h1
              style={{
                fontSize: "76px",
                fontWeight: 600,
                color: "#3E362E",
                margin: 0,
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              Nalar Nanti
            </h1>

            {/* Subjudul Hangat */}
            <p
              style={{
                fontSize: "26px",
                color: "#7A6F64",
                margin: 0,
                maxWidth: "760px",
                lineHeight: 1.4,
                fontStyle: "italic",
              }}
            >
              Ruang Singgah untuk Menata Nalar & Merakit Asa
            </p>

            {/* Ornamen Garis Minimalis Bawah */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "2px",
                  backgroundColor: "#C8A98E",
                }}
              />
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "#C8A98E",
                }}
              />
              <div
                style={{
                  width: "56px",
                  height: "2px",
                  backgroundColor: "#C8A98E",
                }}
              />
            </div>
          </div>

          {/* Footer Social Connect */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "22px",
              borderTop: "1px solid #E5DDD0",
              width: "100%",
              fontFamily: "sans-serif",
            }}
          >
            <span
              style={{
                fontSize: "17px",
                color: "#7A6F64",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              Instagram @nalarnanti • Saluran WhatsApp @NalarNanti
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

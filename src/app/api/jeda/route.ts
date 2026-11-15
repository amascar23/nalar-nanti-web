import { NextResponse } from "next/server";
import { GOOGLE_SHEETS_JEDA_WEBHOOK_URL } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    const webhookUrl =
      process.env.GOOGLE_SHEETS_JEDA_WEBHOOK_URL || GOOGLE_SHEETS_JEDA_WEBHOOK_URL;

    // Jika webhook URL belum diisi, kita lewati pengiriman tapi tetap beri response ok
    if (!webhookUrl || webhookUrl.trim() === "") {
      return NextResponse.json({
        status: "skipped",
        message: "Webhook Google Sheets belum dikonfigurasi",
      });
    }

    // Teruskan data ke Google Apps Script Webhook
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn("Peringatan: Webhook Google Sheets mengembalikan kode", res.status);
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error("Gagal mengirim catatan jeda ke Google Sheets:", error);
    // Mengembalikan 200 agar frontend pengguna tetap mulus dan tersimpan di localStorage
    return NextResponse.json({ status: "error", error: String(error) }, { status: 200 });
  }
}

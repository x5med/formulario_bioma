import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const configured = process.env.EBOOK_URL?.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol !== "https:") throw new Error("A URL do ebook precisa usar HTTPS.");
      return NextResponse.redirect(url, { status: 302, headers: { "Cache-Control": "no-store" } });
    } catch (error) {
      console.error("[Bioma ebook] EBOOK_URL inválida:", error instanceof Error ? error.message : error);
      return NextResponse.json({ error: "O arquivo não está disponível no momento." }, { status: 503 });
    }
  }

  try {
    const pdf = await readFile(path.join(process.cwd(), "public", "ebook-bioma.pdf"));
    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=ebook-bioma-2.pdf",
        "Content-Length": String(pdf.byteLength),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("[Bioma ebook] PDF não configurado:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "O arquivo não está disponível no momento." }, { status: 503 });
  }
}

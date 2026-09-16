import { NextResponse } from "next/server";
import { sendToMetrics } from "@/lib/metrics";

export const runtime = "nodejs";

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") || 0) > 8_000) {
    return NextResponse.json({ error: "Dados muito grandes." }, { status: 413 });
  }
  const body = await request.json().catch(() => null) as Record<string, unknown> | null;
  if (!body || Array.isArray(body)) return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
  if (text(body.website, 100)) return NextResponse.json({ ok: true }, { status: 202 });

  const lead = {
    name: text(body.name, 180),
    email: text(body.email, 240).toLowerCase(),
    phone: text(body.phone, 40).replace(/\D/g, ""),
    utmSource: text(body.utmSource, 120) || "ebook_bioma_2",
    utmMedium: text(body.utmMedium, 120) || "site",
    utmCampaign: text(body.utmCampaign, 160) || "ebook_bioma_2",
    referrer: text(body.referrer, 500),
  };
  if (lead.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.phone.length < 10 || lead.phone.length > 13) {
    return NextResponse.json({ error: "Revise nome, e-mail e WhatsApp." }, { status: 400 });
  }

  try {
    await sendToMetrics(lead);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("[Bioma ebook] Falha de sincronização:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Não foi possível registrar o cadastro." }, { status: 502 });
  }
}

"use client";

import { useState, type FormEvent } from "react";

type SyncState = "idle" | "sending" | "sent" | "failed";
type LeadData = { name: string; email: string; phone: string; website: string; utmSource: string; utmMedium: string; utmCampaign: string; referrer: string };

function getAttribution() {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "ebook_equipe_consistencia",
    utmMedium: params.get("utm_medium") || "site",
    utmCampaign: params.get("utm_campaign") || "ebook_equipe_consistencia",
    referrer: document.referrer || window.location.href,
  };
}

export function LeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [syncState, setSyncState] = useState<SyncState>("idle");
  const [pending, setPending] = useState<LeadData | null>(null);

  async function sendLead(payload: LeadData) {
    setSyncState("sending");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
        cache: "no-store",
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setSyncState("sent");
      setPending(null);
    } catch {
      setSyncState("failed");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2 || digits.length < 10 || digits.length > 13) return;
    const payload = { name: name.trim(), email: email.trim(), phone: digits, website, ...getAttribution() };
    setPending(payload);
    setSubmitted(true);
    void sendLead(payload);
  }

  if (submitted) {
    return (
      <div className="success-panel" aria-live="polite">
        <div className="success-icon" aria-hidden="true">✓</div>
        <p className="section-kicker">EBOOK LIBERADO</p>
        <h2>Seu ebook está pronto, {name.trim().split(/\s+/)[0]}<span>.</span></h2>
        <p className="success-copy">Comece pelo diagnóstico da sua clínica e avance para processos, treinamento e autonomia com padrão.</p>
        <a className="primary-button download-button" href="/ebook-equipe-e-consistencia.pdf" download="ebook-equipe-e-consistencia-escalamed.pdf">
          <span>BAIXAR EBOOK GRATUITO</span><span className="button-arrow" aria-hidden="true">↓</span>
        </a>
        <div className={`sync-status sync-${syncState}`} role="status">
          {syncState === "sending" && <><span className="status-spinner" /> Finalizando seu cadastro em segundo plano…</>}
          {syncState === "sent" && <><span className="status-check">✓</span> Cadastro confirmado.</>}
          {syncState === "failed" && <><span className="status-warning">!</span> Não foi possível registrar seus dados. <button type="button" onClick={() => pending && void sendLead(pending)}>Tentar novamente</button></>}
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <p className="section-kicker">EQUIPE E CONSISTÊNCIA</p>
      <h2>Uma equipe que entrega qualidade <strong>sem depender do improviso<span>.</span></strong></h2>
      <p className="form-intro">Baixe o guia prático para identificar gargalos, ouvir sua equipe, criar padrões e delegar com segurança. Preencha seus dados e acesse agora.</p>

      <div className="fields">
        <label className="field"><span>Nome completo <b>*</b></span><input type="text" name="name" autoComplete="name" placeholder="Seu nome" minLength={2} maxLength={180} required value={name} onChange={event => setName(event.target.value)} /></label>
        <label className="field"><span>E-mail <b>*</b></span><input type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" maxLength={240} required value={email} onChange={event => setEmail(event.target.value)} /></label>
        <label className="field"><span>WhatsApp <b>*</b></span><input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" minLength={10} maxLength={25} required value={phone} onChange={event => setPhone(event.target.value)} /><small>Com DDD. Usaremos o número para identificar seu cadastro.</small></label>
      </div>
      <label className="honeypot" aria-hidden="true">Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label>
      <button className="primary-button" type="submit"><span>QUERO BAIXAR O EBOOK</span><span className="button-arrow" aria-hidden="true">↗</span></button>
    </form>
  );
}

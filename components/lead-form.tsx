"use client";

import { useState, type FormEvent } from "react";
import { EBOOK_DELIVERY_REQUEST_TEXT, EBOOK_WHATSAPP_CONSENT_TEXT } from "@/lib/consent";

type SyncState = "idle" | "sending" | "registered" | "registration_failed";
type LeadData = { name: string; email: string; phone: string; website: string; utmSource: string; utmMedium: string; utmCampaign: string; referrer: string; pageUrl: string; formSubmissionId: string; whatsappConsent: boolean };

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
  const [whatsappConsent, setWhatsappConsent] = useState(false);
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
      setSyncState("registered");
      setPending(null);
    } catch {
      setSyncState("registration_failed");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2 || digits.length < 10 || digits.length > 13) return;
    const payload = { name: name.trim(), email: email.trim(), phone: digits, website, whatsappConsent, formSubmissionId: crypto.randomUUID(), pageUrl: window.location.href, ...getAttribution() };
    setPending(payload);
    setSubmitted(true);
    void sendLead(payload);
  }

  if (submitted) {
    const registrationFailed = syncState === "registration_failed";
    return (
      <div className="success-panel" aria-live="polite">
        <div className="success-icon" aria-hidden="true">✓</div>
        <p className="section-kicker">PEDIDO RECEBIDO</p>
        <h2>{registrationFailed ? "Seu pedido precisa de atenção" : "Pedido recebido"}, {name.trim().split(/\s+/)[0]}<span>.</span></h2>
        <p className="success-copy">{registrationFailed ? "Confira abaixo o estado do seu pedido." : <>Nossa equipe comercial entrará em contato pelo WhatsApp informado para encaminhar o ebook <strong>Equipe e Consistência</strong>.</>}</p>
        <div className={`sync-status sync-${syncState}`} role="status">
          {syncState === "sending" && <><span className="status-spinner" /> Registrando seu pedido…</>}
          {syncState === "registered" && <><span className="status-check">✓</span> Cadastro registrado. Aguarde o contato da nossa equipe.</>}
          {syncState === "registration_failed" && <><span className="status-warning">!</span> Não foi possível registrar o pedido. <button type="button" onClick={() => pending && void sendLead(pending)}>Tentar novamente</button></>}
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <p className="section-kicker">EQUIPE E CONSISTÊNCIA</p>
      <h2>Uma equipe que entrega qualidade <strong>sem depender do improviso<span>.</span></strong></h2>
      <p className="form-intro">Receba no WhatsApp o guia prático para identificar gargalos, ouvir sua equipe, criar padrões e delegar com segurança.</p>

      <div className="fields">
        <label className="field"><span>Nome completo <span className="required-mark" aria-hidden="true">*</span></span><input type="text" name="name" autoComplete="name" placeholder="Como podemos chamar você?" minLength={2} maxLength={180} required value={name} onChange={event => setName(event.target.value)} /></label>
        <label className="field"><span>E-mail <span className="required-mark" aria-hidden="true">*</span></span><input type="email" name="email" autoComplete="email" placeholder="voce@exemplo.com" maxLength={240} required value={email} onChange={event => setEmail(event.target.value)} /></label>
        <label className="field"><span>WhatsApp <span className="required-mark" aria-hidden="true">*</span></span><input type="tel" name="phone" autoComplete="tel" inputMode="tel" placeholder="(11) 99999-9999" minLength={10} maxLength={25} required value={phone} onChange={event => setPhone(event.target.value)} /><small>Com DDD. Nossa equipe entrará em contato por este número.</small></label>
      </div>
      <div className="consent-block">
        <input id="whatsapp-consent" name="whatsappConsent" type="checkbox" checked={whatsappConsent} onChange={event => setWhatsappConsent(event.target.checked)} />
        <div><label htmlFor="whatsapp-consent">{EBOOK_WHATSAPP_CONSENT_TEXT}</label><a href="https://metrics.x5med.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de Privacidade ↗</a></div>
      </div>
      <label className="honeypot" aria-hidden="true">Website<input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></label>
      <button className="primary-button" type="submit"><span>SOLICITAR EBOOK NO WHATSAPP</span><span className="button-arrow" aria-hidden="true">↗</span></button>
      <p className="delivery-note">{EBOOK_DELIVERY_REQUEST_TEXT}</p>
    </form>
  );
}

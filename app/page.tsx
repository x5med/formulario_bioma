import Image from "next/image";
import { LeadForm } from "@/components/lead-form";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="brand-panel">
        <div className="brand-grid" aria-hidden="true" />
        <div className="brand-glow" aria-hidden="true" />
        <div className="brand-panel-inner">
          <header className="brand-header">
            <Image src="/escalamed-logo-dark.png" alt="EscalaMed" width={675} height={120} priority className="brand-logo" />
            <span className="edition-label">MATERIAL DIGITAL <span>•</span> BIOMA 2</span>
          </header>

          <div className="brand-message">
            <div className="eyebrow"><span /> CONTEÚDO ESCALAMED</div>
            <h1>SEU PRÓXIMO<br /><em>PASSO</em> COMEÇA<br />AQUI<span className="gold-dot">.</span></h1>
            <p>Preencha seus dados para acessar o ebook da campanha Bioma 2. É simples e leva menos de um minuto.</p>
          </div>

          <div className="book-stage" aria-hidden="true">
            <div className="book-shadow" />
            <div className="book-back" />
            <div className="book-cover">
              <div className="book-cover-grid" />
              <span className="book-kicker">ESCALAMED / EBOOK</span>
              <span className="book-title">BIOMA<br />2<span>.</span></span>
              <span className="book-rule" />
              <span className="book-bottom">MATERIAL DIGITAL</span>
              <span className="book-arrow">↗</span>
            </div>
            <span className="book-orbit book-orbit-one" />
            <span className="book-orbit book-orbit-two" />
          </div>

          <footer className="brand-footer"><span className="footer-rule" /> ESTRATÉGIA. GESTÃO. CRESCIMENTO.</footer>
        </div>
      </div>

      <section className="form-panel" aria-label="Cadastro para acesso ao ebook">
        <div className="form-panel-inner">
          <div className="form-topline"><span className="step-index">01 / 01</span><span className="step-caption">ACESSO AO EBOOK</span></div>
          <LeadForm />
          <p className="data-footnote">Seus dados são enviados à EscalaMed para registrar seu interesse no material. <a href="https://metrics.x5med.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade ↗</a></p>
        </div>
      </section>
    </main>
  );
}

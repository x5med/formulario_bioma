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
            <span className="edition-label">EBOOK PRÁTICO <span>•</span> PARA MÉDICOS</span>
          </header>

          <div className="brand-message">
            <div className="eyebrow"><span /> JORNADA DE APRENDIZADOS PARA A CLASSE MÉDICA</div>
            <h1>EQUIPE E<br /><em>CONSISTÊNCIA</em><span className="gold-dot">.</span></h1>
            <p className="brand-lead">O cuidado precisa se repetir com qualidade.</p>
            <p className="brand-copy">Uma prática médica sustentável exige estratégia e conexão. Descubra como ouvir sua equipe, criar processos claros, treinar na prática e delegar com segurança.</p>
          </div>

          <div className="book-stage">
            <Image
              src="/ebook-capa.png"
              alt="Capa do ebook Equipe e Consistência da EscalaMed"
              width={1055}
              height={1491}
              priority
              className="book-cover-image"
            />
          </div>

          <footer className="brand-footer"><span className="footer-rule" /> CRESCIMENTO COM PROCESSO, CONSISTÊNCIA E EXPERIÊNCIA.</footer>
        </div>
      </div>

      <section className="form-panel" aria-label="Cadastro para baixar o ebook Equipe e Consistência">
        <div className="form-panel-inner">
          <div className="form-topline"><span className="step-index">EBOOK GRATUITO</span><span className="step-caption">ACESSO IMEDIATO</span></div>
          <LeadForm />
          <p className="data-footnote">Seus dados são enviados à EscalaMed para registrar seu acesso ao ebook. <a href="https://metrics.x5med.com.br/politica-de-privacidade" target="_blank" rel="noopener noreferrer">Política de privacidade ↗</a></p>
        </div>
      </section>
    </main>
  );
}

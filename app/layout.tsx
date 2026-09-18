import type { Metadata } from "next";
import { Anton, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });

export const metadata: Metadata = {
  title: "Ebook Equipe e Consistência | EscalaMed",
  description: "Receba pelo WhatsApp o ebook gratuito da EscalaMed sobre processos, treinamento e delegação para construir uma equipe que entrega qualidade com consistência.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${anton.variable}`}>{children}</body>
    </html>
  );
}

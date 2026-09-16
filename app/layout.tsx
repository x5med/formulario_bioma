import type { Metadata } from "next";
import { Anton, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });

export const metadata: Metadata = {
  title: "Ebook Bioma 2 | EscalaMed",
  description: "Cadastre-se para acessar o ebook Bioma 2 da EscalaMed.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${anton.variable}`}>{children}</body>
    </html>
  );
}

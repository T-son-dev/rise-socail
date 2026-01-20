import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rise | Gestão de Redes Sociais",
  description: "Sistema de gestão de redes sociais com aprovação de conteúdo e integração Asaas",
  keywords: "redes sociais, gestão, aprovação, conteúdo, marketing digital, Asaas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

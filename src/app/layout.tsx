import type { Metadata } from "next";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import WebVitalsReporter from "@/components/WebVitalsReporter";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "QODEC | Arquitetura Digital de Elite",
  description: "Onde a inteligência sistêmica encontra o design de luxo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${montserrat.variable} ${sourceCodePro.variable} antialiased bg-aionNavy text-aionWhite`}
      >
        <SmoothScroll>
          <WebVitalsReporter />
          <Header />
          {children}
        </SmoothScroll>
        <Script src="https://cdn.lordicon.com/lordicon.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

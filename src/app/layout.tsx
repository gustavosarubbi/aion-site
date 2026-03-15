import type { Metadata } from "next";
import { Montserrat, Source_Code_Pro } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/header";
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
  metadataBase: new URL("https://qodec.digital"),
  title: {
    default: "QODEC | Arquitetura Digital de Elite",
    template: "%s | QODEC",
  },
  description: "Onde a inteligência sistêmica encontra o design de luxo.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QODEC | Arquitetura Digital de Elite",
    description: "Onde a inteligência sistêmica encontra o design de luxo.",
    url: "https://qodec.digital",
    siteName: "QODEC",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QODEC | Arquitetura Digital de Elite",
    description: "Onde a inteligência sistêmica encontra o design de luxo.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  );
}

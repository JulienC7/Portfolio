import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Saira300, Cinzel400, Cinzel700 } from "@/fonts/fonts";
import "./globals.css";
import "@/styles/Header.scss";
import "@/styles/Nav.scss";
import "@/styles/About.scss";
import "@/styles/Projects.scss";
import "@/styles/ProjectDetail.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Julien Clavier | Portfolio Développeur Web",
    template: "%s | Julien Clavier",
  },
  description:
    "Portfolio de Julien Clavier, étudiant développeur web. Projets, compétences et contact.",
  keywords: ["portfolio", "développeur web", "Julien Clavier"],
  authors: [{ name: "Julien Clavier" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Julien Clavier Portfolio",
    title: "Julien Clavier | Portfolio Développeur Web",
    description: "Portfolio étudiant avec mes projets web et mes infos de contact.",
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
    <html
      lang="fr"
      className={`${Saira300.variable} ${Cinzel400.variable} ${Cinzel700.variable}`}
    >
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
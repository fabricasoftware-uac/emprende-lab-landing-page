import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
  
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#2e1a47",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "EmprendeLab | Laboratorio de Emprendimiento e Innovación",
    template: "%s | EmprendeLab"
  },
  description: "Lanzamos tus ideas al espacio. Te acompañamos en cada etapa de tu viaje hacia el éxito a través de aceleración, consultoría y formación especializada.",
  generator: "EmprendeLab",
  keywords: ["EmprendeLab", "Empresas", "laboratorio de innovacion", "potenciar", "emprendimiento", "impulsar", "aceleración"],
  authors: [{ name: "EmprendeLab" }],
  openGraph: {
    title: "EmprendeLab | Laboratorio de Emprendimiento e Innovación",
    description: "Lanzamos tus ideas al espacio. Te acompañamos en cada etapa de tu viaje hacia el éxito a través de aceleración, consultoría y formación especializada.",
    url: "https://www.emprendelab-web.com",
    siteName: "EmprendeLab",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/placeholder_elab.svg",
        width: 1200,
        height: 630,
        alt: "EmprendeLab",
      }
    ]
  },
  icons: {
    icon: [
      {
        url: "/dark_elab_favicon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/light_elab_favicon.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/apple-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
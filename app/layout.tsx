import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emprendelab",
  description: "Emprendelab, Impulsando la innovación y el emprendimiento",
  generator: "Emprendelab",
  icons: {
    icon: [
      {
        url: "/elab_dark.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/elab_light.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
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

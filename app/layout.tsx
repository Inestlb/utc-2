import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UTC Industrie | Solutions industrielles",
  description: "Distributeur de solutions industrielles en automatisme, motorisation et connectique en Algérie.",
  keywords: ["produits industriels", "automatisation", "capteurs", "solutions industrielles", "ifm", "wago", "lenze"],
  authors: [{ name: "UTC" }],
  creator: "UTC",
  metadataBase: new URL('https://utc-export.com'),
  openGraph: {
    title: "UTC Industrie | Solutions industrielles",
    description: "Distributeur de solutions industrielles en automatisme, motorisation et connectique en Algérie.",
    url: 'https://utc-export.com',
    siteName: 'UTC Industrie',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: "summary_large_image",
    title: "UTC - Solutions Industrielles",
    description: "Distributeur de solutions industrielles en automatisme, motorisation et connectique en Algérie.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#F97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@fontsource-variable/noto-sans-jp";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dotjava.org"),
  title: {
    default: "dotjava | Java・Excel・Oracle 学習サイト",
    template: "%s | dotjava",
  },
  description:
    "Javaの基礎からバージョンごとの新機能、Web開発、入出力、Excel、Oracle Databaseまで、全てをコード例と共に学習できるリファレンスサイト。",
  openGraph: {
    type: "website",
    siteName: "dotjava",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "dotjava",
  url: "https://dotjava.org",
  description:
    "Javaの基礎からバージョンごとの新機能、Web開発、入出力、Excel、Oracle Databaseまで、全てをコード例と共に学習できるリファレンスサイト。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@fontsource-variable/noto-sans-jp";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GrokButton } from "@/components/grok-button";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cl.naokitakata.com"),
  title: {
    default: "CL | Java・Spring Boot・DB・DevOps 学習サイト",
    template: "%s | CL",
  },
  description:
    "Java、Spring Boot、データベース、DevOps、フロントエンドまで40以上のセクションをコード例と共に体系的に学習できるサイト。",
  openGraph: {
    type: "website",
    siteName: "CL",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CL",
  url: "https://cl.naokitakata.com",
  description:
    "Java、Spring Boot、データベース、DevOps、フロントエンドまで40以上のセクションをコード例と共に体系的に学習できるサイト。",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://cl.naokitakata.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
        <GrokButton />
      </body>
    </html>
  );
}

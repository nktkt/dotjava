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
  title: "Java学習サイト | Java 8 ~ 24 完全ガイド",
  description:
    "Javaの基礎からバージョンごとの新機能まで、全てをコード例と共に学習できるリファレンスサイト。Java 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24 対応。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistMono.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

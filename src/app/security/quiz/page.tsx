import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Javaセキュリティクイズ | Java学習サイト",
  description:
    "Javaセキュリティの知識をDuolingo風クイズでテスト。暗号化、認証・認可、XSS、CSRF、Spring Securityなどをハート・XP・ストリーク付きのインタラクティブな出題で楽しく学習。",
};

export default function Page() {
  return <ClientPage />;
}

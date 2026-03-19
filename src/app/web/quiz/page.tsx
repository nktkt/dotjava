import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java Web開発クイズ | Java学習サイト",
  description:
    "Java Web開発の知識をDuolingo風クイズでテスト。Servlet、Spring Boot、REST API、セキュリティなどをハート・XP・ストリーク付きのインタラクティブな出題で楽しく学習。",
};

export default function Page() {
  return <ClientPage />;
}

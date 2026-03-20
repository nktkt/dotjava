import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "チートシート・早見表 | Java学習サイト",
  description:
    "Java構文、Spring Boot アノテーション、Git コマンド、SQL、Linux コマンドなどの早見表・チートシートを一覧で確認。",
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "マイクロサービス クイズ | Java学習サイト",
  description: "サービス分割、API Gateway、サーキットブレーカーの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

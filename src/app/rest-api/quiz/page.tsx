import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "REST API クイズ | Java学習サイト",
  description: "RESTful設計、HTTPメソッド、ステータスコード、認証の知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

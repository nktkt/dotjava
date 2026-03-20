import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "クリーンコード クイズ | Java学習サイト",
  description: "命名規則、SOLID原則、リファクタリングの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

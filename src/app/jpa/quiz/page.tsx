import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "JPA クイズ | Java学習サイト",
  description: "エンティティ設計、JPQL、N+1問題、キャッシュの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

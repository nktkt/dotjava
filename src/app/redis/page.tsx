import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Redis完全ガイド | Java学習サイト",
  description: "Redisの基礎からSpring Boot連携、キャッシュ戦略、Pub/Sub、分散ロックまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

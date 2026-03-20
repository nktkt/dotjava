import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "アルゴリズム クイズ | Java学習サイト",
  description: "ソート、探索、データ構造、動的計画法の知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

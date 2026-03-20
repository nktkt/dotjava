import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "パフォーマンス クイズ | Java学習サイト",
  description: "JVM、GC、プロファイリング、最適化の知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

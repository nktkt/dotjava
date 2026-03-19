import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java パフォーマンスチューニング",
  description: "JVMアーキテクチャ、GC、プロファイリング、メモリリーク検出、JMH まで",
};

export default function Page() {
  return <ClientPage />;
}

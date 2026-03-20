import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "並行処理 クイズ | Java学習サイト",
  description: "Thread、synchronized、ExecutorService、CompletableFutureの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

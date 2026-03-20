import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Docker クイズ | Java学習サイト",
  description: "Dockerfile、マルチステージビルド、Composeの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "JVMメモリ管理ガイド | Java学習サイト",
  description: "JVMアーキテクチャ、GCアルゴリズム、メモリリーク調査、プロファイリングまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

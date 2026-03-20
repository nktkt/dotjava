import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Linux クイズ | Java学習サイト",
  description: "コマンドライン操作、テキスト処理、プロセス管理の知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

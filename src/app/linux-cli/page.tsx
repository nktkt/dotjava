import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Linux コマンドライン ガイド",
  description: "ファイル操作、テキスト処理、プロセス管理、ネットワーク、Javaアプリデプロイ、シェルスクリプトまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

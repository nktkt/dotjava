import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Eclipse IDE ガイド",
  description:
    "インストール・初期設定、エディタ機能、デバッグ、リファクタリング、ビルド・実行、プラグインまで、Eclipse IDE を体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

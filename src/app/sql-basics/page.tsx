import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "SQL基礎 完全ガイド",
  description: "テーブル定義、SELECT、JOIN、集約関数、サブクエリ、ウィンドウ関数、トランザクション、チューニングまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "SQL クイズ | Java学習サイト",
  description: "SQL基礎からJOIN、サブクエリ、ウィンドウ関数までテスト。",
};

export default function Page() {
  return <ClientPage />;
}

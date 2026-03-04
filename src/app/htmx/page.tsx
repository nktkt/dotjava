import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "HTMX 学習",
  description:
    "HTMX の基礎からリクエスト制御、トリガー、UIパターン、拡張機能、サーバー統合まで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

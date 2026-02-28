import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Excel ガイド",
  description:
    "基本操作から数式・関数、ピボットテーブル、グラフ、VBAマクロまで、Excelの実務スキルを体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

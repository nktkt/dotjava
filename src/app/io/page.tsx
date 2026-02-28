import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java 入出力ガイド",
  description:
    "ストリームの基礎からCSV、JSON、XML、Excelの読み書き、ネットワーク通信、文字エンコーディングまで、Javaの入出力処理を網羅的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

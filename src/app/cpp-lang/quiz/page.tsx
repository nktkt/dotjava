import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "C++クイズ | Java学習サイト",
  description:
    "C++の基礎文法・中級・上級・実践の知識をDuolingo風クイズでテスト。ハート・XP・ストリーク付きのインタラクティブな出題で楽しく学習。",
};

export default function Page() {
  return <ClientPage />;
}

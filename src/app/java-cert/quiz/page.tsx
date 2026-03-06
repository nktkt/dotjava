import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java資格クイズ | Java学習サイト",
  description:
    "Java SE Bronze・Silver・Goldの資格試験対策クイズ。Duolingo風のインタラクティブな出題で楽しく学習。ハート・XP・ストリーク付き。",
};

export default function Page() {
  return <ClientPage />;
}

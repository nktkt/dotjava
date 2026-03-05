import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Oracle資格クイズ | Java学習サイト",
  description:
    "ORACLE MASTER Silver SQL・Bronze DBA・Silver DBA・Gold DBAの資格試験対策クイズ。Duolingo風のインタラクティブな出題で楽しく学習。ハート・XP・ストリーク付き。",
};

export default function Page() {
  return <ClientPage />;
}

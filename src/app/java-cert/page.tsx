import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java資格試験対策 | Java学習サイト",
  description:
    "Oracle Certified Java Programmer Bronze・Silver・Goldの資格試験対策。出題範囲の体系的な学習、頻出パターン、模擬問題で合格力を養成。",
};

export default function Page() {
  return <ClientPage />;
}

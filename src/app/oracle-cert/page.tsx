import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Oracle資格試験対策（ORACLE MASTER） | Java学習サイト",
  description:
    "ORACLE MASTER Silver SQL・Bronze DBA・Silver DBA・Gold DBAの資格試験対策。出題範囲の体系的な学習、頻出パターン、模擬問題で合格力を養成。",
};

export default function Page() {
  return <ClientPage />;
}

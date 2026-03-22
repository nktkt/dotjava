import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java 学習ガイド | dotjava",
  description:
    "Java 8〜26のバージョン別ガイド、トピック別学習、I/O、並行処理、アルゴリズム、JVM、クリーンコードまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

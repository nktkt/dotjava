import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "C言語学習 | Java学習サイト",
  description:
    "C言語の基礎から上級・実践まで体系的に学習。ポインタ、メモリ管理、データ構造、マルチスレッド、ネットワークプログラミングまでカバー。Duolingo風クイズで知識を定着。",
};

export default function Page() {
  return <ClientPage />;
}

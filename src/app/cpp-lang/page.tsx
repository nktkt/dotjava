import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "C++学習 | Java学習サイト",
  description:
    "C++の基礎から上級・実践まで体系的に学習。クラス、テンプレート、STL、スマートポインタ、並行処理、モダンC++までカバー。Duolingo風クイズで知識を定着。",
};

export default function Page() {
  return <ClientPage />;
}

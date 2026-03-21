import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java実践演習 | Java学習サイト",
  description: "Javaの基礎文法からオブジェクト指向、Stream API、デザインパターンまで実践的な演習問題。",
};

export default function Page() {
  return <ClientPage />;
}

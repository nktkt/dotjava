import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "デザインパターン",
  description:
    "GoF 23のデザインパターンをJavaのコード例と共に学習。生成・構造・振る舞いパターンを網羅的に解説。",
};

export default function Page() {
  return <ClientPage />;
}

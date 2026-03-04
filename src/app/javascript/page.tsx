import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "JavaScript 学習",
  description:
    "基礎文法、関数・スコープ、オブジェクト・配列、非同期処理、DOM操作、モダンJavaScript、実践パターンまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

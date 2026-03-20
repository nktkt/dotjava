import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Kotlin クイズ | Java学習サイト",
  description: "Kotlinの基礎文法、Null安全、コルーチンの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

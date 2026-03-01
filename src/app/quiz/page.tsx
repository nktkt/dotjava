import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "クイズ",
  description: "Java・Excel・Oracle/SQLの知識をクイズで腕試し。カテゴリや難易度を選んで挑戦できます。",
};

export default function Page() {
  return <ClientPage />;
}

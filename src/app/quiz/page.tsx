import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java クイズ",
  description: "Javaの知識をクイズで腕試し。基礎文法からモダンJavaまで、難易度別に挑戦できます。",
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Spring Bootテスト完全ガイド | Java学習サイト",
  description: "JUnit 5、Mockito、MockMvc、Testcontainersを使ったSpring Bootテストを体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

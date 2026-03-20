import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "テスト クイズ | Java学習サイト",
  description: "JUnit5、Mockito、Spring Boot Testの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

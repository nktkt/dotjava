import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java テスト観点・テスト技法 完全ガイド",
  description:
    "JUnit 5、Mockito、Spring Boot テスト、統合テスト、テスト観点チェックリスト、TDD/BDD、パフォーマンステストまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

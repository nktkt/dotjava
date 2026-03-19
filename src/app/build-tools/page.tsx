import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Maven / Gradle ビルドツール",
  description: "Maven と Gradle の基礎から依存管理、マルチモジュール、CI/CD 連携まで",
};

export default function Page() {
  return <ClientPage />;
}

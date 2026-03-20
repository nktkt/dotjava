import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "CI/CD クイズ | Java学習サイト",
  description: "GitHub Actions、Jenkins、テスト自動化の知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

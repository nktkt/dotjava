import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "CI/CD 完全ガイド",
  description: "GitHub Actions、Jenkins、テスト自動化、コンテナCI/CD、モニタリングまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

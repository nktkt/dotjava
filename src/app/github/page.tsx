import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "GitHub 使い方ガイド | Java学習",
  description:
    "GitHubの基礎からリポジトリ管理、コラボレーション、GitHub Actions、セキュリティまで体系的に学習",
};

export default function Page() {
  return <ClientPage />;
}

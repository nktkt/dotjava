import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "GitHub PR ガイド",
  description:
    "Git基礎からGitHub PR作成、コードレビュー、ブランチ戦略、GitHub Actions まで、チーム開発に必要なGit/GitHub スキルを体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

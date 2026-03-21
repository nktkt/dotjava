import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Git実践ガイド | Java学習サイト",
  description: "Gitの仕組み、ブランチ戦略、マージ・リベース、コンフリクト解決、プルリクエスト実践まで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

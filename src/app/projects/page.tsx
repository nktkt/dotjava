import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "実践プロジェクト集 | Java学習サイト",
  description:
    "TODO アプリ、REST API、掲示板、バッチ処理など、Java/Spring Bootの実践プロジェクトをステップバイステップで学習。",
};

export default function Page() {
  return <ClientPage />;
}

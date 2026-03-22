import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "実践プロジェクト集",
  description:
    "TODO API、ブログ、認証、バッチ処理、マイクロサービスなど Java/Spring Boot の実践プロジェクトをステップバイステップで構築。",
};

export default function Page() {
  return <ClientPage />;
}

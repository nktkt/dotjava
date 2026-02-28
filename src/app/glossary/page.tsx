import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java 用語集",
  description:
    "Javaプログラミングに関する重要な用語を網羅的に解説。検索やカテゴリフィルターで素早く見つけられます。",
};

export default function Page() {
  return <ClientPage />;
}

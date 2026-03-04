import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "HTML 学習",
  description:
    "基礎構造、テキスト要素、フォーム、メディア、セマンティクス、SEO、モダンHTMLまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

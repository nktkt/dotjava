import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java 面接でよく聞かれる質問100選",
  description:
    "Java面接で頻出の質問100問を基礎・中級・上級に分類して解説。コード例付きで回答のポイントを学習できます。",
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Bootstrap CSS 学習",
  description:
    "Bootstrap 5 の基礎・導入からレイアウト、コンポーネント、フォーム、ユーティリティ、カスタマイズまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java セキュリティガイド",
  description:
    "セキュリティ基礎、認証・認可、暗号化、Webセキュリティ、セキュアコーディング、テスト・運用まで、Javaセキュリティを体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

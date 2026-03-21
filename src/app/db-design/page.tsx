import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "データベース設計ガイド | Java学習サイト",
  description: "正規化、ER図、インデックス設計、クエリチューニング、トランザクション管理まで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

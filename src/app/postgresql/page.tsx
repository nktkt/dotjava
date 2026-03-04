import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "PostgreSQL 学習",
  description:
    "PostgreSQL の基礎からSQL操作、ウィンドウ関数、PL/pgSQL、インデックス、クエリ最適化、運用管理まで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Oracle Database ガイド",
  description:
    "SQL基礎からPL/SQL、パフォーマンスチューニング、管理・運用まで、Oracle Databaseを体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

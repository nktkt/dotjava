import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "JPA / Hibernate ガイド",
  description: "エンティティ設計、JPQL、Spring Data JPA、パフォーマンス最適化まで",
};

export default function Page() {
  return <ClientPage />;
}

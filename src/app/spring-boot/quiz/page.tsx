import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Spring Boot クイズ | Java学習サイト",
  description: "Spring BootのDI、REST API、JPA、Securityの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

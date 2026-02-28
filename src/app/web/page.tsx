import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java Web開発ガイド",
  description:
    "Servletの基礎からSpring Boot、REST API設計、セキュリティ、テスト、Dockerデプロイまで、JavaによるWebアプリケーション開発を体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

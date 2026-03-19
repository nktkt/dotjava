import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "REST API 設計・実装ガイド",
  description: "REST原則、OpenAPI/Swagger、認証、テスト、ドキュメントまで",
};

export default function Page() {
  return <ClientPage />;
}

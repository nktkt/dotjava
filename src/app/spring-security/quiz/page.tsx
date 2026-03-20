import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Spring Security クイズ | Java学習サイト",
  description: "認証・認可、JWT、OAuth2、CORS/CSRFの知識をテスト。",
};

export default function Page() {
  return <ClientPage />;
}

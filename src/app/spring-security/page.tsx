import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Spring Security・JWT・OAuth2 ガイド",
  description: "Spring Securityの基本設定からJWT認証、OAuth2ログイン、RBAC、CORS/CSRF対策まで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

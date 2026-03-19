import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Docker × Java ガイド",
  description: "Dockerfile、JVMコンテナ設定、Spring Boot Docker化、CI/CD まで",
};

export default function Page() {
  return <ClientPage />;
}

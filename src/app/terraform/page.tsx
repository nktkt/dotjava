import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Terraform入門ガイド | Java学習サイト",
  description: "TerraformによるIaCの基礎からAWS構築、モジュール設計、CI/CD連携まで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

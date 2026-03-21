import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "OWASPセキュリティ実践 | Java学習サイト",
  description: "OWASP Top 10をJava/Spring Bootで対策する実践ガイド。",
};

export default function Page() {
  return <ClientPage />;
}

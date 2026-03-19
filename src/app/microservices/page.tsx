import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "マイクロサービス入門",
  description: "API Gateway、サーキットブレーカー、Saga、CQRS、オブザーバビリティまで",
};

export default function Page() {
  return <ClientPage />;
}

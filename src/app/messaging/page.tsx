import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "メッセージキュー完全ガイド | Java学習サイト",
  description: "Kafka、RabbitMQの基礎からSpring Boot連携、信頼性保証まで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

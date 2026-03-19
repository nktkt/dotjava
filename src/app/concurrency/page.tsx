import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java 並行処理ガイド",
  description: "Thread、synchronized、CompletableFuture、Virtual Threads まで体系的に学習",
};

export default function Page() {
  return <ClientPage />;
}

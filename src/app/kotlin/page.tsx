import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Kotlin for Java開発者 ガイド",
  description: "Kotlinの基礎文法、Null安全、コルーチン、Java相互運用、Spring Boot×Kotlinまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}

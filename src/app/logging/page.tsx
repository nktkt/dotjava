import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java ロギングガイド",
  description: "SLF4J、Logback、Log4j2、構造化ログ、モニタリングまで体系的に学習",
};

export default function Page() {
  return <ClientPage />;
}

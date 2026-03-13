import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java API リファレンス",
  description:
    "String, List, Map, Stream, Optional, HttpClient, スレッド, 日付時刻など、Java標準APIを体系的に解説。コード例付きリファレンス。",
};

export default function Page() {
  return <ClientPage />;
}

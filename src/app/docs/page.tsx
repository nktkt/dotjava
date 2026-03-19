import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java API リファレンス",
  description:
    "String, List, Map, Stream, Optional, HttpClient, スレッド, 日付時刻など、Java標準APIを体系的に解説。コード例付きリファレンス。",
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Java API リファレンス",
  description:
    "String, List, Map, Stream, Optional, HttpClient, スレッド, 日付時刻など、Java標準APIを体系的に解説。コード例付きリファレンス。",
  provider: {
    "@type": "Organization",
    name: "dotjava",
    url: "https://dotjava.org",
  },
  url: "https://dotjava.org/docs",
  inLanguage: "ja",
  isAccessibleForFree: true,
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <ClientPage />
    </>
  );
}

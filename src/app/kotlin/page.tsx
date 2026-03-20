import type { Metadata } from "next";
import ClientPage from "./_client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Kotlin for Java開発者 ガイド",
  description: "Kotlinの基礎文法、Null安全、コルーチン、Java相互運用、Spring Boot×Kotlinまで体系的に学習。",
};

export default function Page() {
  return (
    <>
      <ClientPage />
      <Script
        id="kotlin-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
    {
      "@type": "Question",
      "name": "KotlinとJavaの主な違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "KotlinはNull安全、データクラス、拡張関数、コルーチンなどの機能を備え、Javaより簡潔なコードが書けます。JVM上で動作し、Javaとの100%互換性があります。"
      }
    },
    {
      "@type": "Question",
      "name": "Kotlinのコルーチンとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "コルーチンはKotlinの軽量な非同期処理機構です。suspend関数、launch、asyncを使い、コールバック地獄を避けながら非同期処理を直感的に記述できます。スレッドより軽量で、数千の並行処理を効率的に実行できます。"
      }
    },
    {
      "@type": "Question",
      "name": "KotlinのNull安全とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Kotlinでは型システムレベルでnullを管理します。String型はnull不可、String?型はnull許容です。?.（安全呼び出し）、?:（エルビス演算子）、let関数などで安全にnullを扱えます。"
      }
    }
            ]
          })
        }}
      />
    </>
  );
}

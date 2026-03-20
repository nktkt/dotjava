import type { Metadata } from "next";
import ClientPage from "./_client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Spring Boot 完全ガイド",
  description: "DI/IoC、REST API、Spring Data JPA、Spring Security、デプロイまで体系的に学習",
};

export default function Page() {
  return (
    <>
      <ClientPage />
      <Script
        id="spring-boot-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
    {
      "@type": "Question",
      "name": "Spring Bootとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spring Bootは、Springフレームワークを使ったアプリケーション開発を簡素化するフレームワークです。自動設定、組み込みサーバー、スターター依存関係により、最小限の設定で本番品質のアプリケーションを構築できます。"
      }
    },
    {
      "@type": "Question",
      "name": "Spring BootとSpring Frameworkの違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spring Frameworkは包括的なJavaフレームワークで、Spring BootはそのSpring Frameworkの上に構築された自動設定ツールです。Spring Bootは規約によりXML設定を不要にし、組み込みサーバーで即座に実行可能なアプリケーションを提供します。"
      }
    },
    {
      "@type": "Question",
      "name": "@SpringBootApplicationアノテーションの役割は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "@SpringBootApplicationは@Configuration、@EnableAutoConfiguration、@ComponentScanの3つを組み合わせたメタアノテーションです。Springの自動設定を有効化し、コンポーネントスキャンを実行します。"
      }
    }
            ]
          })
        }}
      />
    </>
  );
}

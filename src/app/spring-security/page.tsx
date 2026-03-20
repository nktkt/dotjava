import type { Metadata } from "next";
import ClientPage from "./_client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Spring Security・JWT・OAuth2 ガイド",
  description: "Spring Securityの基本設定からJWT認証、OAuth2ログイン、RBAC、CORS/CSRF対策まで体系的に学習。",
};

export default function Page() {
  return (
    <>
      <ClientPage />
      <Script
        id="spring-security-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
    {
      "@type": "Question",
      "name": "Spring Securityとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spring Securityは、Java アプリケーションに認証・認可機能を提供するフレームワークです。フォーム認証、OAuth2、JWT、CSRF保護など、包括的なセキュリティ機能を提供します。"
      }
    },
    {
      "@type": "Question",
      "name": "JWTとセッション認証の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "セッション認証はサーバー側でセッション状態を管理しますが、JWTはトークンにユーザー情報を含むステートレスな認証方式です。JWTはスケーラビリティに優れ、マイクロサービスに適しています。"
      }
    },
    {
      "@type": "Question",
      "name": "CSRFとは何ですか？どう対策しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CSRF（Cross-Site Request Forgery）は、ユーザーが認証済みのサイトに対して意図しないリクエストを送信させる攻撃です。Spring SecurityはCSRFトークンを自動生成し、各リクエストで検証することで対策します。"
      }
    }
            ]
          })
        }}
      />
    </>
  );
}

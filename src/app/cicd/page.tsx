import type { Metadata } from "next";
import ClientPage from "./_client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "CI/CD 完全ガイド",
  description: "GitHub Actions、Jenkins、テスト自動化、コンテナCI/CD、モニタリングまで体系的に学習。",
};

export default function Page() {
  return (
    <>
      <ClientPage />
      <Script
        id="cicd-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
    {
      "@type": "Question",
      "name": "CI/CDとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CI（継続的インテグレーション）はコード変更を頻繁にメインブランチに統合しテストを自動実行する手法、CD（継続的デリバリー/デプロイ）は本番環境へのリリースを自動化する手法です。"
      }
    },
    {
      "@type": "Question",
      "name": "GitHub ActionsとJenkinsの違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "GitHub ActionsはGitHubに統合されたクラウドCI/CDで、YAML設定で手軽に始められます。Jenkinsはオープンソースの自己ホスト型CI/CDサーバーで、プラグインによる高い拡張性が特徴です。"
      }
    },
    {
      "@type": "Question",
      "name": "テストピラミッドとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "テストピラミッドは、ユニットテスト（多数・高速）を底辺、統合テスト（中程度）を中間、E2Eテスト（少数・低速）を頂点とするテスト戦略の考え方です。下層ほど多く、上層ほど少なくすることでコストと信頼性のバランスを取ります。"
      }
    }
            ]
          })
        }}
      />
    </>
  );
}

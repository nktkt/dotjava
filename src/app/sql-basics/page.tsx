import type { Metadata } from "next";
import ClientPage from "./_client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "SQL基礎 完全ガイド",
  description: "テーブル定義、SELECT、JOIN、集約関数、サブクエリ、ウィンドウ関数、トランザクション、チューニングまで体系的に学習。",
};

export default function Page() {
  return (
    <>
      <ClientPage />
      <Script
        id="sql-basics-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
    {
      "@type": "Question",
      "name": "SQLのJOINの種類は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "主にINNER JOIN（両テーブルの一致行のみ）、LEFT JOIN（左テーブル全行＋右の一致行）、RIGHT JOIN（右テーブル全行＋左の一致行）、FULL OUTER JOIN（両テーブル全行）、CROSS JOIN（直積）があります。"
      }
    },
    {
      "@type": "Question",
      "name": "インデックスとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "インデックスはデータベーステーブルの検索を高速化するデータ構造です。B-TreeやHashなどの構造で、WHERE句やJOIN条件のカラムに作成します。読み取りは速くなりますが、挿入・更新時のオーバーヘッドが増えます。"
      }
    },
    {
      "@type": "Question",
      "name": "トランザクションのACID特性とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Atomicity（原子性：全て成功か全て失敗）、Consistency（一貫性：整合性を維持）、Isolation（分離性：他トランザクションの影響を受けない）、Durability（永続性：コミット後のデータは失われない）の4特性です。"
      }
    }
            ]
          })
        }}
      />
    </>
  );
}

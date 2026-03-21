import type { Metadata } from "next";
import ClientPage from "./_client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "JMeter 負荷テスト完全ガイド | Java学習サイト",
  description:
    "Apache JMeterのインストールから負荷テスト実践、REST APIテスト、分散テストまで体系的に学習。",
};

export default function Page() {
  return (
    <>
      <ClientPage />
      <Script
        id="jmeter-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "JMeterとは何ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Apache JMeterはJava製のオープンソース負荷テストツールです。Webアプリケーション、REST API、データベースなどの性能テストを実施でき、GUIとCLIの両方で操作できます。",
                },
              },
              {
                "@type": "Question",
                name: "JMeterで負荷テストを始めるには？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Java 8以上をインストール後、JMeterをダウンロードして起動します。テスト計画にスレッドグループを追加し、HTTPリクエストサンプラーで対象URLを設定、リスナーで結果を確認するのが基本的な流れです。",
                },
              },
              {
                "@type": "Question",
                name: "JMeterの分散テストとは？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "分散テストは複数のマシン（スレーブ）からテストを実行する方法です。1台のマスターが複数のスレーブを制御し、大規模な負荷を生成できます。jmeter-server を各スレーブで起動し、マスターのremote_hostsに登録して使用します。",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}

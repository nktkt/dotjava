import type { Metadata } from "next";
import ClientPage from "./_client";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Linux コマンドライン ガイド",
  description: "ファイル操作、テキスト処理、プロセス管理、ネットワーク、Javaアプリデプロイ、シェルスクリプトまで体系的に学習。",
};

export default function Page() {
  return (
    <>
      <ClientPage />
      <Script
        id="linux-cli-faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
    {
      "@type": "Question",
      "name": "grepコマンドとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "grepはテキストファイルからパターンに一致する行を検索するコマンドです。正規表現対応で、-rで再帰検索、-iで大文字小文字無視、-nで行番号表示など多数のオプションがあります。"
      }
    },
    {
      "@type": "Question",
      "name": "パイプ(|)とリダイレクト(>)の違いは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "パイプ(|)はコマンドの出力を次のコマンドの入力に渡します。リダイレクト(>)はコマンドの出力をファイルに書き込みます。例：ls | grep txt はファイル一覧からtxtを含む行を抽出、ls > list.txt は一覧をファイルに保存します。"
      }
    },
    {
      "@type": "Question",
      "name": "systemctlとは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "systemctlはsystemdのサービス管理コマンドです。start/stop/restart/status でサービス制御、enable/disable で自動起動設定ができます。Javaアプリをsystemdサービスとして登録すれば、OS起動時に自動起動できます。"
      }
    }
            ]
          })
        }}
      />
    </>
  );
}

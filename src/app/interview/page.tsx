import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java 面接でよく聞かれる質問250選",
  description:
    "Java面接で頻出の質問250問を基礎・中級・上級に分類して解説。コード例付きで回答のポイントを学習できます。",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Java の主な特徴を3つ挙げてください",
      acceptedAnswer: {
        "@type": "Answer",
        text: "① プラットフォーム非依存（Write Once, Run Anywhere）: JVM 上で動作するため OS を問わない。② オブジェクト指向: カプセル化・継承・ポリモーフィズムを言語レベルでサポート。③ ガベージコレクション: メモリ管理を自動化し、メモリリークを軽減する。",
      },
    },
    {
      "@type": "Question",
      name: "JDK・JRE・JVM の違いは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "JVM（Java Virtual Machine）はバイトコードを実行する仮想マシン。JRE（Java Runtime Environment）は JVM + 標準ライブラリで、Java アプリの実行環境。JDK（Java Development Kit）は JRE + コンパイラ（javac）等の開発ツールで、開発環境。Java 11 以降は JRE の単独配布は廃止され、JDK に統合されている。",
      },
    },
    {
      "@type": "Question",
      name: "== と equals() の違いは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "== は参照の比較（同じオブジェクトを指しているか）を行う。プリミティブ型では値の比較になる。equals() はオブジェクトの内容（論理的等価性）を比較する。String や Integer などは equals() をオーバーライドして値の比較を行う。",
      },
    },
    {
      "@type": "Question",
      name: "final キーワードの使い方を説明してください",
      acceptedAnswer: {
        "@type": "Answer",
        text: "final は3つの文脈で使用できる。① 変数: 再代入不可（定数化）。② メソッド: サブクラスでのオーバーライドを禁止。③ クラス: 継承を禁止（例: String クラス）。不変性を保証し、安全なコードを書くために重要。",
      },
    },
    {
      "@type": "Question",
      name: "static キーワードの意味と使い方を説明してください",
      acceptedAnswer: {
        "@type": "Answer",
        text: "static はクラスレベルに属することを示す修飾子。① static フィールド: 全インスタンスで共有される変数。② static メソッド: インスタンスなしで呼び出せるメソッド。③ static ブロック: クラスロード時に1度だけ実行される初期化ブロック。④ static 内部クラス: 外部クラスのインスタンスなしで使えるネストクラス。",
      },
    },
    {
      "@type": "Question",
      name: "オーバーロードとオーバーライドの違いは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "オーバーロード（Overload）は同一クラス内で同名メソッドを引数の型・数を変えて定義すること。コンパイル時に解決される。オーバーライド（Override）はサブクラスで親クラスのメソッドを再定義すること。実行時に解決される。",
      },
    },
    {
      "@type": "Question",
      name: "抽象クラスとインターフェースの違いは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "抽象クラスは abstract 修飾子を持つクラスで、抽象メソッドと具象メソッドを両方持てる。単一継承のみ。インターフェースはメソッドのシグネチャを定義する契約。Java 8 以降は default メソッドや static メソッドも持てる。多重実装が可能。",
      },
    },
    {
      "@type": "Question",
      name: "カプセル化とは何ですか？そのメリットは？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "カプセル化はデータ（フィールド）とそれを操作するメソッドを1つのクラスにまとめ、外部からの直接アクセスを制限すること。メリットは ① 内部実装の隠蔽 ② データの整合性保護 ③ 再利用性の向上。",
      },
    },
    {
      "@type": "Question",
      name: "String が不変（immutable）であるとはどういう意味ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "String オブジェクトは一度作成されると内容を変更できない。文字列操作は新しい String オブジェクトを生成する。不変であるメリットは ① スレッドセーフ ② 文字列プールによるメモリ効率 ③ ハッシュ値のキャッシュ ④ セキュリティ。頻繁な文字列連結には StringBuilder を使う。",
      },
    },
    {
      "@type": "Question",
      name: "ArrayList と LinkedList の違いは何ですか？",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ArrayList は内部的に配列を使用。インデックスによるランダムアクセスが O(1) で高速。LinkedList は二重連結リスト。先頭・末尾への挿入・削除が O(1)。ランダムアクセスは O(n) で低速。一般的には ArrayList が推奨される。",
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ClientPage />
    </>
  );
}

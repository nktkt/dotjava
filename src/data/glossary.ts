export interface GlossaryTerm {
  term: string;
  reading?: string;
  category: string;
  description: string;
  related?: string[];
  since?: string;
  code?: string;
}

export const glossaryCategories = [
  { id: "basics", name: "基礎", color: "#259D63" },
  { id: "oop", name: "オブジェクト指向", color: "#0017C1" },
  { id: "types", name: "型・データ", color: "#C26A00" },
  { id: "concurrency", name: "並行処理", color: "#6B21A8" },
  { id: "memory", name: "メモリ・実行環境", color: "#EC0000" },
  { id: "api", name: "API・ライブラリ", color: "#0891B2" },
  { id: "pattern", name: "パターン・設計", color: "#546E7A" },
  { id: "modern", name: "モダンJava", color: "#000F80" },
] as const;

export const glossaryTerms: GlossaryTerm[] = [
  // ===== 基礎 =====
  {
    term: "JDK",
    reading: "ジェイディーケー",
    category: "basics",
    description:
      "Java Development Kit の略。Javaアプリケーションの開発に必要なコンパイラ（javac）、JRE、各種ツールを含む開発キット。Oracle JDK と OpenJDK が主要な配布元。",
    related: ["JRE", "JVM", "javac"],
  },
  {
    term: "JRE",
    reading: "ジェイアールイー",
    category: "basics",
    description:
      "Java Runtime Environment の略。Javaアプリケーションを実行するための環境。JVM とコアライブラリで構成される。Java 11以降はJDKに統合され単独配布は廃止。",
    related: ["JDK", "JVM"],
  },
  {
    term: "JVM",
    reading: "ジェイブイエム",
    category: "basics",
    description:
      "Java Virtual Machine の略。Javaバイトコードを各OS上で実行する仮想マシン。「Write Once, Run Anywhere」を実現する中核技術。HotSpot、GraalVM などの実装がある。",
    related: ["JDK", "JRE", "バイトコード", "JIT"],
  },
  {
    term: "javac",
    reading: "ジャバシー",
    category: "basics",
    description:
      "Javaコンパイラ。.java ソースファイルを .class バイトコードファイルに変換する。JDKに含まれるコマンドラインツール。",
    related: ["JDK", "バイトコード"],
    code: `$ javac HelloWorld.java   # コンパイル
$ java HelloWorld         # 実行`,
  },
  {
    term: "バイトコード",
    reading: "バイトコード",
    category: "basics",
    description:
      "Javaソースコードをコンパイルして生成される中間コード。JVMが解釈・実行する。プラットフォームに依存しないため、同じ .class ファイルをどのOSでも実行できる。",
    related: ["JVM", "javac", "JIT"],
  },
  {
    term: "クラスパス",
    reading: "クラスパス",
    category: "basics",
    description:
      "JVMがクラスファイルやライブラリ（JAR）を検索するパスの集合。-cp オプションまたは CLASSPATH 環境変数で指定する。",
    related: ["JVM", "JAR", "モジュールパス"],
    code: `$ java -cp lib/*:. com.example.Main`,
  },
  {
    term: "パッケージ",
    reading: "パッケージ",
    category: "basics",
    description:
      "クラスを論理的にグループ化する名前空間の仕組み。ディレクトリ構造と対応し、名前の衝突を防ぐ。慣例としてドメイン名の逆順（com.example.app）を使用する。",
    related: ["モジュール", "import"],
    code: `package com.example.service;

import java.util.List;
import com.example.model.User;`,
  },
  {
    term: "JAR",
    reading: "ジャー",
    category: "basics",
    description:
      "Java Archive の略。複数の .class ファイル、リソース、メタデータを1つにまとめたZIP形式のアーカイブ。ライブラリの配布や実行可能ファイルとして使用される。",
    related: ["クラスパス", "マニフェスト"],
  },
  {
    term: "main メソッド",
    reading: "メインメソッド",
    category: "basics",
    description:
      "Javaアプリケーションのエントリポイント。public static void main(String[] args) というシグネチャで定義する。JVMがこのメソッドからプログラムの実行を開始する。",
    code: `public class App {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    term: "import",
    reading: "インポート",
    category: "basics",
    description:
      "他のパッケージに属するクラスを現在のファイルで使用するための宣言。java.lang パッケージのクラス（String, System等）は自動的にインポートされる。",
    related: ["パッケージ"],
    code: `import java.util.List;           // 単一クラス
import java.util.*;              // ワイルドカード
import static java.lang.Math.PI; // static import`,
  },
  {
    term: "リテラル",
    reading: "リテラル",
    category: "basics",
    description:
      "ソースコード内に直接記述される固定値。整数リテラル（42）、浮動小数点リテラル（3.14）、文字リテラル（'A'）、文字列リテラル（\"Hello\"）、真偽値リテラル（true/false）、nullリテラルがある。",
    code: `int dec = 42;          // 10進数
int hex = 0xFF;        // 16進数
int bin = 0b1010;      // 2進数
long big = 100_000L;   // アンダースコア区切り
String s = "Hello";    // 文字列リテラル`,
  },
  {
    term: "スコープ",
    reading: "スコープ",
    category: "basics",
    description:
      "変数やメソッドが参照可能な範囲。ブロックスコープ（{}内）、メソッドスコープ、クラススコープ（フィールド）がある。内側のスコープから外側は参照可能だが、逆は不可。",
  },

  // ===== オブジェクト指向 =====
  {
    term: "クラス",
    reading: "クラス",
    category: "oop",
    description:
      "オブジェクトの設計図。フィールド（状態）とメソッド（振る舞い）を定義する。Javaプログラムの基本単位であり、すべてのコードはクラス内に記述される。",
    related: ["オブジェクト", "インスタンス", "コンストラクタ"],
  },
  {
    term: "オブジェクト",
    reading: "オブジェクト",
    category: "oop",
    description:
      "クラスを基に生成された実体（インスタンス）。状態（フィールドの値）と振る舞い（メソッド）を持つ。new キーワードで生成される。",
    related: ["クラス", "インスタンス"],
  },
  {
    term: "インスタンス",
    reading: "インスタンス",
    category: "oop",
    description:
      "クラスから生成された具体的なオブジェクトのこと。「オブジェクト」とほぼ同義だが、特定のクラスとの関係を強調する場合に使う。",
    related: ["クラス", "オブジェクト", "コンストラクタ"],
  },
  {
    term: "コンストラクタ",
    reading: "コンストラクタ",
    category: "oop",
    description:
      "オブジェクトの初期化を行う特殊なメソッド。クラス名と同じ名前を持ち、戻り値の型を持たない。new で呼び出される。オーバーロード可能。",
    related: ["クラス", "インスタンス", "this"],
    code: `public class User {
    private String name;
    public User() { this("匿名"); }         // デフォルト
    public User(String name) { this.name = name; }
}`,
  },
  {
    term: "継承",
    reading: "けいしょう",
    category: "oop",
    description:
      "既存のクラス（スーパークラス）の特性を引き継いで新しいクラス（サブクラス）を作る仕組み。extends キーワードで宣言する。Javaは単一継承のみ。コードの再利用性を高める。",
    related: ["extends", "super", "オーバーライド", "ポリモーフィズム"],
  },
  {
    term: "ポリモーフィズム",
    reading: "ポリモーフィズム",
    category: "oop",
    description:
      "多態性。同じインターフェースや親クラスの型で参照しつつ、実行時に実際の型に応じた振る舞いをすること。オーバーライドとインターフェースで実現される。",
    related: ["継承", "オーバーライド", "インターフェース"],
    code: `Animal animal = new Dog();  // 親型で参照
animal.speak();  // Dog の speak() が実行される`,
  },
  {
    term: "カプセル化",
    reading: "カプセルか",
    category: "oop",
    description:
      "データ（フィールド）を private にして外部から直接アクセスさせず、公開メソッド（getter/setter）経由で操作する設計原則。不正な状態変更を防ぐ。",
    related: ["アクセス修飾子", "getter", "setter"],
  },
  {
    term: "抽象クラス",
    reading: "ちゅうしょうクラス",
    category: "oop",
    description:
      "abstract キーワードで宣言されたクラス。インスタンス化できず、サブクラスに抽象メソッドの実装を強制する。一部のメソッドにデフォルト実装を持たせることも可能。",
    related: ["abstract", "継承", "インターフェース"],
  },
  {
    term: "インターフェース",
    reading: "インターフェース",
    category: "oop",
    description:
      "メソッドのシグネチャを定義する型。クラスが implements で実装する。Java 8以降はデフォルトメソッドやstaticメソッドも持てる。多重実装が可能。",
    related: ["implements", "デフォルトメソッド", "抽象クラス"],
  },
  {
    term: "オーバーロード",
    reading: "オーバーロード",
    category: "oop",
    description:
      "同じクラス内で同名のメソッドを、異なる引数リスト（数、型、順序）で複数定義すること。コンパイル時に呼び出すメソッドが決定される（静的束縛）。",
    related: ["オーバーライド"],
    code: `int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }`,
  },
  {
    term: "オーバーライド",
    reading: "オーバーライド",
    category: "oop",
    description:
      "サブクラスでスーパークラスのメソッドを再定義すること。@Override アノテーションの付与が推奨される。実行時に実際の型のメソッドが呼ばれる（動的束縛）。",
    related: ["継承", "ポリモーフィズム", "オーバーロード"],
  },
  {
    term: "this",
    reading: "ディス",
    category: "oop",
    description:
      "現在のインスタンス自身を参照するキーワード。フィールドとローカル変数の名前が同じ場合の区別や、同クラスの別コンストラクタの呼び出し（this()）に使用する。",
    related: ["super", "コンストラクタ"],
  },
  {
    term: "super",
    reading: "スーパー",
    category: "oop",
    description:
      "スーパークラス（親クラス）のメンバを参照するキーワード。super.method() で親メソッドの呼び出し、super() で親コンストラクタの呼び出しを行う。",
    related: ["this", "継承", "コンストラクタ"],
  },
  {
    term: "static",
    reading: "スタティック",
    category: "oop",
    description:
      "クラスに属する（インスタンスに属さない）メンバを宣言するキーワード。staticフィールドは全インスタンスで共有され、staticメソッドはインスタンス不要で呼び出せる。",
    related: ["クラス", "インスタンス"],
    code: `public class Counter {
    private static int count = 0;  // クラス変数
    public static int getCount() { return count; }
}`,
  },
  {
    term: "final",
    reading: "ファイナル",
    category: "oop",
    description:
      "変更不可を示すキーワード。finalフィールドは再代入不可（定数）、finalメソッドはオーバーライド不可、finalクラスは継承不可になる。",
    related: ["定数", "イミュータブル"],
    code: `final int MAX = 100;           // 再代入不可
final class Utility { }        // 継承不可`,
  },
  {
    term: "アクセス修飾子",
    reading: "アクセスしゅうしょくし",
    category: "oop",
    description:
      "クラスやメンバの可視性を制御するキーワード。public（すべて）、protected（同パッケージ+サブクラス）、パッケージプライベート（同パッケージ、修飾子なし）、private（同クラスのみ）の4段階。",
    related: ["カプセル化"],
  },
  {
    term: "内部クラス",
    reading: "ないぶクラス",
    category: "oop",
    description:
      "クラスの中に定義されるクラスの総称。メンバクラス、staticネストクラス、ローカルクラス、匿名クラスの4種類がある。外部クラスのメンバにアクセスできる（staticネストクラスを除く）。",
    related: ["匿名クラス", "ラムダ式"],
  },

  // ===== 型・データ =====
  {
    term: "プリミティブ型",
    reading: "プリミティブがた",
    category: "types",
    description:
      "Javaの基本データ型。byte, short, int, long, float, double, char, boolean の8種類。オブジェクトではなく、スタック上に直接値が格納される。",
    related: ["ラッパークラス", "オートボクシング"],
  },
  {
    term: "参照型",
    reading: "さんしょうがた",
    category: "types",
    description:
      "オブジェクトへの参照（アドレス）を格納する型。クラス型、インターフェース型、配列型が該当。プリミティブ型以外はすべて参照型。",
    related: ["プリミティブ型", "null"],
  },
  {
    term: "ラッパークラス",
    reading: "ラッパークラス",
    category: "types",
    description:
      "プリミティブ型をオブジェクトとして扱うためのクラス。Integer, Long, Double, Boolean など。コレクションに格納する際に必要。",
    related: ["プリミティブ型", "オートボクシング"],
  },
  {
    term: "オートボクシング",
    reading: "オートボクシング",
    category: "types",
    description:
      "プリミティブ型とラッパークラスの間の自動変換。ボクシング（int → Integer）とアンボクシング（Integer → int）がコンパイラにより自動的に行われる。",
    related: ["プリミティブ型", "ラッパークラス"],
    code: `Integer obj = 42;      // オートボクシング (int → Integer)
int num = obj;         // アンボクシング (Integer → int)`,
  },
  {
    term: "ジェネリクス",
    reading: "ジェネリクス",
    category: "types",
    description:
      "型パラメータを使って、型安全で再利用可能なクラスやメソッドを定義する機能。Java 5で導入。コンパイル時の型チェックで ClassCastException を防ぐ。",
    related: ["型パラメータ", "ワイルドカード", "型消去"],
    since: "Java 5",
    code: `List<String> list = new ArrayList<>();  // String型に限定
Box<Integer> box = new Box<>(42);`,
  },
  {
    term: "型消去",
    reading: "かたしょうきょ",
    category: "types",
    description:
      "コンパイル時にジェネリクスの型情報が除去される仕組み。実行時にはジェネリクスの型パラメータ情報は保持されない。後方互換性のための設計上の妥協。",
    related: ["ジェネリクス"],
  },
  {
    term: "ワイルドカード",
    reading: "ワイルドカード",
    category: "types",
    description:
      "ジェネリクスで不特定の型を表す「?」。上限境界（? extends T: Tのサブタイプ）、下限境界（? super T: Tのスーパータイプ）、非境界（?）がある。",
    related: ["ジェネリクス", "PECS"],
    code: `List<? extends Number> nums;   // Number以下を読み取り
List<? super Integer> ints;    // Integer以上に書き込み`,
  },
  {
    term: "Enum（列挙型）",
    reading: "イーナム",
    category: "types",
    description:
      "固定された定数の集合を型安全に定義するクラス。フィールドやメソッドも持てる。switch文やシングルトンパターンに活用される。",
    related: ["定数", "switch"],
    since: "Java 5",
    code: `public enum Color { RED, GREEN, BLUE }`,
  },
  {
    term: "配列",
    reading: "はいれつ",
    category: "types",
    description:
      "同じ型の要素を固定長で格納するデータ構造。0から始まるインデックスでアクセスする。生成後にサイズ変更は不可。可変長が必要な場合は ArrayList を使用。",
    related: ["ArrayList", "コレクション"],
    code: `int[] nums = {1, 2, 3};
String[] names = new String[5];
int[][] matrix = new int[3][4]; // 多次元配列`,
  },
  {
    term: "イミュータブル",
    reading: "イミュータブル",
    category: "types",
    description:
      "生成後に状態が変更できないオブジェクトの性質。String, Integer, LocalDate などが代表例。スレッドセーフで安全に共有できる。Record も不変。",
    related: ["String", "final", "Record"],
  },
  {
    term: "null",
    reading: "ヌル",
    category: "types",
    description:
      "参照型変数が「どのオブジェクトも参照していない」ことを示す特殊な値。nullに対してメソッドを呼ぶと NullPointerException が発生する。Optional で安全に扱える。",
    related: ["NullPointerException", "Optional"],
  },

  // ===== 並行処理 =====
  {
    term: "スレッド",
    reading: "スレッド",
    category: "concurrency",
    description:
      "プログラム内で並行して実行される処理の単位。Thread クラスまたは Runnable インターフェースで作成する。Java 21以降は Virtual Thread も利用可能。",
    related: ["Runnable", "ExecutorService", "Virtual Thread"],
  },
  {
    term: "synchronized",
    reading: "シンクロナイズド",
    category: "concurrency",
    description:
      "排他制御のためのキーワード。メソッドまたはブロックに付与し、同時に1つのスレッドだけがそのコードを実行できるようにする。モニタロックを使用。",
    related: ["スレッド", "デッドロック", "Lock"],
  },
  {
    term: "デッドロック",
    reading: "デッドロック",
    category: "concurrency",
    description:
      "2つ以上のスレッドが互いにロックの解放を待ち合い、永久に処理が進まなくなる状態。ロックの取得順序を統一するなどで防止する。",
    related: ["synchronized", "Lock"],
  },
  {
    term: "ExecutorService",
    reading: "エグゼキュータサービス",
    category: "concurrency",
    description:
      "スレッドプールを管理し、タスクの実行をフレームワークに委譲するインターフェース。Executors ファクトリクラスで生成する。直接 Thread を管理するより安全で効率的。",
    related: ["スレッド", "Future", "Callable"],
    since: "Java 5",
  },
  {
    term: "Future",
    reading: "フューチャー",
    category: "concurrency",
    description:
      "非同期処理の結果を表すインターフェース。get() で結果を取得（ブロッキング）、isDone() で完了チェックができる。CompletableFuture で拡張される。",
    related: ["ExecutorService", "CompletableFuture", "Callable"],
  },
  {
    term: "CompletableFuture",
    reading: "コンプリータブルフューチャー",
    category: "concurrency",
    description:
      "非同期処理を宣言的にチェーンできるクラス。thenApply, thenCompose, exceptionally 等のメソッドで処理パイプラインを構築する。",
    related: ["Future", "非同期処理"],
    since: "Java 8",
  },
  {
    term: "Virtual Thread",
    reading: "バーチャルスレッド",
    category: "concurrency",
    description:
      "JVMが管理する軽量スレッド。OSスレッドに比べて極めて低コストで大量（数百万単位）に生成可能。ブロッキングI/Oを多用するサーバーアプリに最適。",
    related: ["スレッド", "ExecutorService", "Structured Concurrency"],
    since: "Java 21",
  },
  {
    term: "Structured Concurrency",
    reading: "ストラクチャードコンカレンシー",
    category: "concurrency",
    description:
      "並行タスクのライフサイクルをスコープで管理する仕組み。親タスクの終了時に子タスクも確実に終了させる。エラーハンドリングとキャンセルが構造的に安全。",
    related: ["Virtual Thread", "StructuredTaskScope"],
    since: "Java 21 (Preview)",
  },
  {
    term: "volatile",
    reading: "ボラタイル",
    category: "concurrency",
    description:
      "フィールドの値がCPUキャッシュではなくメインメモリから読み書きされることを保証するキーワード。スレッド間での変数の可視性を確保する。原子性は保証しない。",
    related: ["synchronized", "Atomic"],
  },

  // ===== メモリ・実行環境 =====
  {
    term: "ガベージコレクション",
    reading: "ガベージコレクション",
    category: "memory",
    description:
      "不要になったオブジェクトのメモリを自動的に回収する仕組み。JVMが管理し、開発者が明示的にメモリ解放する必要がない。G1GC, ZGC, Shenandoah 等のアルゴリズムがある。",
    related: ["JVM", "ヒープ", "GCルート"],
  },
  {
    term: "ヒープ",
    reading: "ヒープ",
    category: "memory",
    description:
      "オブジェクトが動的に確保されるメモリ領域。new で生成されたオブジェクトはヒープに格納される。ガベージコレクションの対象。-Xmx でサイズを指定。",
    related: ["スタック", "ガベージコレクション"],
  },
  {
    term: "スタック",
    reading: "スタック",
    category: "memory",
    description:
      "メソッドの呼び出し情報（ローカル変数、引数、戻りアドレス）を格納するメモリ領域。各スレッドに専用のスタックが割り当てられる。LIFO構造。",
    related: ["ヒープ", "スタックトレース"],
  },
  {
    term: "スタックトレース",
    reading: "スタックトレース",
    category: "memory",
    description:
      "例外発生時にメソッドの呼び出し履歴を表示したもの。デバッグに不可欠な情報。上から例外の発生箇所、下に向かって呼び出し元が表示される。",
    related: ["例外", "スタック"],
  },
  {
    term: "JIT",
    reading: "ジット",
    category: "memory",
    description:
      "Just-In-Time コンパイラの略。実行中にバイトコードを機械語（ネイティブコード）に動的にコンパイルし、パフォーマンスを最適化する。ホットスポット（頻繁に実行されるコード）を検出して最適化する。",
    related: ["JVM", "バイトコード"],
  },
  {
    term: "クラスローダ",
    reading: "クラスローダ",
    category: "memory",
    description:
      "クラスファイルをJVMにロードする仕組み。Bootstrap、Platform、Application の3つの標準クラスローダがあり、委譲モデルで動作する。",
    related: ["JVM", "クラスパス"],
  },
  {
    term: "リフレクション",
    reading: "リフレクション",
    category: "memory",
    description:
      "実行時にクラスの構造（フィールド、メソッド、コンストラクタ）を調べたり操作したりする機能。フレームワークやDIコンテナで多用されるが、パフォーマンスコストがある。",
    related: ["Class", "アノテーション"],
    code: `Class<?> clazz = Class.forName("com.example.User");
Method method = clazz.getMethod("getName");
Object result = method.invoke(instance);`,
  },

  // ===== API・ライブラリ =====
  {
    term: "Stream API",
    reading: "ストリームエーピーアイ",
    category: "api",
    description:
      "コレクションの要素に対して関数型スタイルの操作（filter, map, reduce 等）をチェーンで記述するAPI。遅延評価で効率的に処理される。並列処理もサポート。",
    related: ["ラムダ式", "コレクション", "関数型プログラミング"],
    since: "Java 8",
  },
  {
    term: "Optional",
    reading: "オプショナル",
    category: "api",
    description:
      "値が存在するかもしれないし、しないかもしれないことを表すコンテナクラス。null の代わりに使用し、NullPointerException を防ぐ。map, flatMap, orElse 等のメソッドで安全に値を操作する。",
    related: ["null", "NullPointerException", "Stream API"],
    since: "Java 8",
  },
  {
    term: "ラムダ式",
    reading: "ラムダしき",
    category: "api",
    description:
      "関数型インターフェースの実装を簡潔に記述する匿名関数。(引数) -> 式 の構文で書く。Stream API や Collections のメソッドで多用される。",
    related: ["関数型インターフェース", "メソッド参照", "Stream API"],
    since: "Java 8",
    code: `// 基本構文
(a, b) -> a + b

// ブロック構文
(x) -> {
    int result = x * 2;
    return result;
}`,
  },
  {
    term: "メソッド参照",
    reading: "メソッドさんしょう",
    category: "api",
    description:
      "既存のメソッドをラムダ式の代わりに直接渡す構文。クラス名::メソッド名 で記述する。コードがより簡潔になる。",
    related: ["ラムダ式", "関数型インターフェース"],
    since: "Java 8",
    code: `list.forEach(System.out::println);    // インスタンスメソッド
list.stream().map(String::toUpperCase); // 任意オブジェクトのメソッド
list.stream().map(Integer::valueOf);    // staticメソッド`,
  },
  {
    term: "関数型インターフェース",
    reading: "かんすうがたインターフェース",
    category: "api",
    description:
      "抽象メソッドを1つだけ持つインターフェース。ラムダ式の型として使用される。@FunctionalInterface で明示的に宣言可能。Function, Predicate, Consumer, Supplier が代表的。",
    related: ["ラムダ式", "Function", "Predicate"],
    since: "Java 8",
  },
  {
    term: "コレクション",
    reading: "コレクション",
    category: "api",
    description:
      "オブジェクトの集合を管理するためのフレームワーク。List（順序付き）、Set（重複なし）、Map（キーと値のペア）が主要インターフェース。java.util パッケージに含まれる。",
    related: ["List", "Set", "Map", "Iterator"],
  },
  {
    term: "Iterator",
    reading: "イテレータ",
    category: "api",
    description:
      "コレクションの要素を順に走査するためのインターフェース。hasNext() で要素の有無を確認し、next() で要素を取得する。拡張for文の裏で使用される。",
    related: ["コレクション", "Iterable"],
  },
  {
    term: "Comparable / Comparator",
    reading: "コンパラブル / コンパレータ",
    category: "api",
    description:
      "オブジェクトの順序付けを定義するインターフェース。Comparable はクラス自身に自然順序を定義し、Comparator は外部から任意の順序を定義する。",
    related: ["ソート", "TreeSet", "TreeMap"],
    code: `// Comparable - 自然順序
class User implements Comparable<User> {
    public int compareTo(User o) { return this.name.compareTo(o.name); }
}
// Comparator - 外部定義
users.sort(Comparator.comparing(User::getAge).reversed());`,
  },

  // ===== パターン・設計 =====
  {
    term: "デザインパターン",
    reading: "デザインパターン",
    category: "pattern",
    description:
      "ソフトウェア設計の典型的な問題に対する再利用可能な解決策のテンプレート。GoFの23パターンが有名。Singleton, Factory, Observer, Strategy, Builder 等。",
    related: ["Singleton", "Builder", "Observer"],
  },
  {
    term: "Singleton",
    reading: "シングルトン",
    category: "pattern",
    description:
      "クラスのインスタンスが1つだけであることを保証するデザインパターン。設定やログ、接続プールなどグローバルに1つだけ必要なリソースに使う。Enumで実装するのが最も安全。",
    related: ["デザインパターン"],
  },
  {
    term: "Builder",
    reading: "ビルダー",
    category: "pattern",
    description:
      "複雑なオブジェクトの構築過程を抽象化するパターン。メソッドチェーンで読みやすくパラメータを設定し、最後に build() で生成する。Lombokの @Builder で自動生成も可能。",
    related: ["デザインパターン", "イミュータブル"],
  },
  {
    term: "DI（依存性注入）",
    reading: "ディーアイ",
    category: "pattern",
    description:
      "Dependency Injection。オブジェクトが必要とする依存オブジェクトを外部から提供する設計パターン。疎結合を実現し、テスト容易性を向上させる。Spring Framework の中核概念。",
    related: ["インターフェース", "Spring"],
  },
  {
    term: "PECS",
    reading: "ペクス",
    category: "pattern",
    description:
      "Producer Extends, Consumer Super の略。ジェネリクスのワイルドカードを使う際の原則。データを提供する側は extends、消費する側は super を使う。",
    related: ["ジェネリクス", "ワイルドカード"],
    code: `// Producer (読み取り) - extends
void printAll(List<? extends Number> list) { ... }

// Consumer (書き込み) - super
void addInts(List<? super Integer> list) { ... }`,
  },
  {
    term: "例外",
    reading: "れいがい",
    category: "pattern",
    description:
      "プログラム実行中に発生する異常事態を表すオブジェクト。チェック例外（Exception）は処理を強制され、非チェック例外（RuntimeException）は任意。Error はシステム障害。",
    related: ["try-catch", "throws", "NullPointerException"],
  },
  {
    term: "チェック例外 / 非チェック例外",
    reading: "チェックれいがい / ひチェックれいがい",
    category: "pattern",
    description:
      "チェック例外（IOException等）はtry-catchまたはthrowsでの処理がコンパイラにより強制される。非チェック例外（NullPointerException等）は RuntimeException のサブクラスで、処理は任意。",
    related: ["例外", "RuntimeException", "IOException"],
  },
  {
    term: "アノテーション",
    reading: "アノテーション",
    category: "pattern",
    description:
      "ソースコードにメタデータを付与する仕組み。@Override, @Deprecated, @SuppressWarnings が標準。フレームワークではカスタムアノテーションで宣言的プログラミングを実現。",
    related: ["リフレクション", "@Override"],
    since: "Java 5",
  },

  // ===== モダンJava =====
  {
    term: "Record",
    reading: "レコード",
    category: "modern",
    description:
      "不変のデータキャリアクラスを簡潔に定義する構文。コンストラクタ、getter、equals、hashCode、toString が自動生成される。ボイラープレートを大幅に削減。",
    related: ["イミュータブル", "Sealed Class"],
    since: "Java 16",
    code: `public record Point(int x, int y) {}
var p = new Point(1, 2);
System.out.println(p.x()); // 1`,
  },
  {
    term: "Sealed Class",
    reading: "シールドクラス",
    category: "modern",
    description:
      "継承を許可するクラスを permits で明示的に制限するクラス。代数的データ型をJavaで表現でき、パターンマッチングと組み合わせて網羅的な処理が可能。",
    related: ["Record", "パターンマッチング", "継承"],
    since: "Java 17",
    code: `public sealed interface Shape
    permits Circle, Rectangle {}`,
  },
  {
    term: "パターンマッチング",
    reading: "パターンマッチング",
    category: "modern",
    description:
      "値の型や構造に基づいて条件分岐し、同時にデータを分解（デストラクチャリング）する機能。instanceof やswitch文で使用。Record Pattern でネストした分解も可能。",
    related: ["switch式", "Record", "Sealed Class", "instanceof"],
    since: "Java 16 / 21",
    code: `if (obj instanceof String s) { ... }

return switch (shape) {
    case Circle(var r) -> Math.PI * r * r;
    case Rectangle(var w, var h) -> w * h;
};`,
  },
  {
    term: "switch式",
    reading: "スイッチしき",
    category: "modern",
    description:
      "switchを式として使用し、値を返せるようにした構文。アロー構文（->）でbreakが不要に。yield で複雑なブロックから値を返すことも可能。",
    related: ["パターンマッチング"],
    since: "Java 14",
    code: `String type = switch (code) {
    case 1, 2 -> "A";
    case 3    -> "B";
    default   -> "Unknown";
};`,
  },
  {
    term: "テキストブロック",
    reading: "テキストブロック",
    category: "modern",
    description:
      '三重引用符 (""") で複数行の文字列リテラルを記述する機能。JSON, HTML, SQL などの埋め込みが読みやすくなる。インデント管理も自動。',
    related: ["String"],
    since: "Java 15",
    code: `String json = """
    {
        "name": "Alice",
        "age": 30
    }
    """;`,
  },
  {
    term: "var",
    reading: "バー",
    category: "modern",
    description:
      "ローカル変数の型推論キーワード。コンパイラが初期化子から型を推論する。フィールド、メソッドの戻り値、パラメータには使用不可。可読性を損なわない範囲で使用する。",
    since: "Java 10",
    code: `var list = new ArrayList<String>(); // ArrayList<String>
var stream = list.stream();          // Stream<String>`,
  },
  {
    term: "モジュール",
    reading: "モジュール",
    category: "modern",
    description:
      "パッケージの上位にある、より大きな単位のコード構造化の仕組み。module-info.java で依存関係と公開APIを明示的に宣言する。Project Jigsaw として導入。",
    related: ["パッケージ", "クラスパス"],
    since: "Java 9",
  },
  {
    term: "Sequenced Collections",
    reading: "シーケンスドコレクション",
    category: "modern",
    description:
      "要素の出現順序が定義されたコレクションの共通インターフェース。getFirst(), getLast(), reversed() 等のメソッドを提供。List, Deque, SortedSet, LinkedHashSet 等が実装。",
    related: ["コレクション", "List"],
    since: "Java 21",
  },
  {
    term: "Stream Gatherers",
    reading: "ストリームギャザラー",
    category: "modern",
    description:
      "Stream APIにカスタム中間操作を定義する仕組み。windowFixed, windowSliding, fold, mapConcurrent 等の組み込みGathererが提供される。gather() メソッドで使用。",
    related: ["Stream API"],
    since: "Java 24",
    code: `var windows = stream
    .gather(Gatherers.windowFixed(3))
    .toList();`,
  },
  {
    term: "Scoped Values",
    reading: "スコープドバリュー",
    category: "modern",
    description:
      "スレッド内でスコープを限定してデータを共有する仕組み。ThreadLocal の代替として設計され、Virtual Thread との相性が良い。不変で、子スコープで上書き可能。",
    related: ["Virtual Thread", "ThreadLocal"],
    since: "Java 21 (Preview)",
  },
];

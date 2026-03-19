export interface InterviewQuestion {
  id: number;
  question: string;
  answer: string;
  category: string;
  level: string;
  code?: string;
}

export const interviewLevels = [
  { id: "basic", name: "基礎", color: "var(--color-dads-success)", description: "Java の基本文法・概念に関する質問" },
  { id: "intermediate", name: "中級", color: "var(--color-dads-blue)", description: "実務経験を問う設計・実装の質問" },
  { id: "advanced", name: "上級", color: "var(--color-dads-error)", description: "アーキテクチャ・内部実装に踏み込む質問" },
] as const;

export const interviewCategories = [
  { id: "basics", name: "基本文法" },
  { id: "oop", name: "オブジェクト指向" },
  { id: "collections", name: "コレクション" },
  { id: "exceptions", name: "例外処理" },
  { id: "strings", name: "文字列" },
  { id: "concurrency", name: "並行処理" },
  { id: "memory", name: "メモリ・JVM" },
  { id: "streams", name: "Stream・ラムダ" },
  { id: "design", name: "設計・パターン" },
  { id: "spring", name: "Spring・フレームワーク" },
  { id: "db", name: "データベース" },
  { id: "testing", name: "テスト" },
  { id: "modern", name: "モダンJava" },
  { id: "io", name: "入出力・ファイル" },
  { id: "network", name: "ネットワーク・API" },
  { id: "security", name: "セキュリティ" },
  { id: "build", name: "ビルド・ツール" },
  { id: "performance", name: "パフォーマンス" },
] as const;

export const interviewQuestions: InterviewQuestion[] = [
  // ===== 基礎 (1-40) =====
  {
    id: 1,
    question: "Java の主な特徴を3つ挙げてください",
    answer: "① プラットフォーム非依存（Write Once, Run Anywhere）: JVM 上で動作するため OS を問わない。② オブジェクト指向: カプセル化・継承・ポリモーフィズムを言語レベルでサポート。③ ガベージコレクション: メモリ管理を自動化し、メモリリークを軽減する。その他にも強い型付け、マルチスレッドサポート、豊富な標準ライブラリなどが挙げられる。",
    category: "basics",
    level: "basic",
  },
  {
    id: 2,
    question: "JDK・JRE・JVM の違いは何ですか？",
    answer: "JVM（Java Virtual Machine）はバイトコードを実行する仮想マシン。JRE（Java Runtime Environment）は JVM + 標準ライブラリで、Java アプリの実行環境。JDK（Java Development Kit）は JRE + コンパイラ（javac）等の開発ツールで、開発環境。Java 11 以降は JRE の単独配布は廃止され、JDK に統合されている。",
    category: "basics",
    level: "basic",
  },
  {
    id: 3,
    question: "プリミティブ型を全て挙げてください",
    answer: "Java のプリミティブ型は 8 つ。整数型: byte（8bit）、short（16bit）、int（32bit）、long（64bit）。浮動小数点型: float（32bit）、double（64bit）。文字型: char（16bit Unicode）。論理型: boolean。それぞれに対応するラッパークラス（Integer、Double 等）が存在する。",
    category: "basics",
    level: "basic",
    code: `byte b = 127;        // -128 ~ 127
short s = 32767;     // -32768 ~ 32767
int i = 2147483647;  // 約±21億
long l = 100L;       // 約±922京
float f = 3.14f;     // 単精度
double d = 3.14;     // 倍精度
char c = 'A';        // Unicode文字
boolean flag = true;  // true/false`,
  },
  {
    id: 4,
    question: "== と equals() の違いは何ですか？",
    answer: "== は参照の比較（同じオブジェクトを指しているか）を行う。プリミティブ型では値の比較になる。equals() はオブジェクトの内容（論理的等価性）を比較する。String や Integer などはequals() をオーバーライドして値の比較を行う。自作クラスで equals() をオーバーライドする場合は hashCode() も一緒にオーバーライドする必要がある。",
    category: "basics",
    level: "basic",
    code: `String s1 = new String("Hello");
String s2 = new String("Hello");
System.out.println(s1 == s2);      // false（参照が異なる）
System.out.println(s1.equals(s2)); // true（内容が同じ）

String s3 = "Hello";
String s4 = "Hello";
System.out.println(s3 == s4);      // true（文字列プールで同一参照）`,
  },
  {
    id: 5,
    question: "final キーワードの使い方を説明してください",
    answer: "final は3つの文脈で使用できる。① 変数: 再代入不可（定数化）。ただし参照型の場合、オブジェクトの中身は変更可能。② メソッド: サブクラスでのオーバーライドを禁止。③ クラス: 継承を禁止（例: String クラス）。不変性を保証し、安全なコードを書くために重要。",
    category: "basics",
    level: "basic",
    code: `// 変数
final int MAX = 100;       // 再代入不可
final List<String> list = new ArrayList<>();
list.add("OK");            // 中身の変更は可能

// メソッド
class Parent {
    final void doSomething() { } // オーバーライド不可
}

// クラス
final class Immutable { }  // 継承不可`,
  },
  {
    id: 6,
    question: "static キーワードの意味と使い方を説明してください",
    answer: "static はクラスレベルに属することを示す修飾子。① static フィールド: 全インスタンスで共有される変数。② static メソッド: インスタンスなしで呼び出せるメソッド（this は使えない）。③ static ブロック: クラスロード時に1度だけ実行される初期化ブロック。④ static 内部クラス: 外部クラスのインスタンスなしで使えるネストクラス。",
    category: "basics",
    level: "basic",
    code: `class Counter {
    static int count = 0;       // 共有変数
    static { count = 10; }      // 静的初期化ブロック

    static int getCount() {     // 静的メソッド
        return count;
    }
}
// Counter.getCount() でインスタンス不要で呼べる`,
  },
  {
    id: 7,
    question: "オーバーロードとオーバーライドの違いは何ですか？",
    answer: "オーバーロード（Overload）は同一クラス内で同名メソッドを引数の型・数を変えて定義すること。コンパイル時に解決される（静的多態性）。オーバーライド（Override）はサブクラスで親クラスのメソッドを再定義すること。実行時に解決される（動的多態性）。オーバーライドではシグネチャが同一で、@Override アノテーションを付けるのが推奨される。",
    category: "oop",
    level: "basic",
    code: `// オーバーロード（同名・異引数）
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

// オーバーライド（親メソッドの再定義）
class Animal {
    void speak() { System.out.println("..."); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Woof!"); }
}`,
  },
  {
    id: 8,
    question: "抽象クラスとインターフェースの違いは何ですか？",
    answer: "抽象クラスは abstract 修飾子を持つクラスで、抽象メソッド（実装なし）と具象メソッド（実装あり）を両方持てる。単一継承のみ。コンストラクタやフィールドを持てる。インターフェースはメソッドのシグネチャを定義する契約。Java 8 以降は default メソッドや static メソッドも持てる。多重実装が可能。「is-a」関係には抽象クラス、「can-do」能力にはインターフェースを使う。",
    category: "oop",
    level: "basic",
  },
  {
    id: 9,
    question: "カプセル化とは何ですか？そのメリットは？",
    answer: "カプセル化はデータ（フィールド）とそれを操作するメソッドを1つのクラスにまとめ、外部からの直接アクセスを制限すること。フィールドを private にし、getter/setter を通じてアクセスさせる。メリットは ① 内部実装の隠蔽（変更が外部に影響しない）② データの整合性保護（バリデーション可能）③ 再利用性の向上。",
    category: "oop",
    level: "basic",
  },
  {
    id: 10,
    question: "String が不変（immutable）であるとはどういう意味ですか？",
    answer: "String オブジェクトは一度作成されると内容を変更できない。文字列操作（concat、replace 等）は新しい String オブジェクトを生成する。不変であるメリットは ① スレッドセーフ ② 文字列プールによるメモリ効率 ③ ハッシュ値のキャッシュ（HashMap のキーに安全）④ セキュリティ（パスワード等の改ざん防止）。頻繁な文字列連結には StringBuilder を使う。",
    category: "strings",
    level: "basic",
    code: `String s = "Hello";
s.concat(" World"); // 元の s は変わらない
s = s.concat(" World"); // 新しい String が作られ参照を置き換え

// 頻繁な連結は StringBuilder を使う
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);
}
String result = sb.toString();`,
  },
  {
    id: 11,
    question: "String・StringBuilder・StringBuffer の違いは？",
    answer: "String は不変。文字列連結のたびに新しいオブジェクトが生成される。StringBuilder は可変で、同一オブジェクト上で文字列操作を行うため高速。スレッドセーフではない。StringBuffer は StringBuilder と同じ API だがメソッドが synchronized でスレッドセーフ。その分やや低速。通常は StringBuilder を使い、マルチスレッドで共有する場合のみ StringBuffer を使う。",
    category: "strings",
    level: "basic",
  },
  {
    id: 12,
    question: "ArrayList と LinkedList の違いは何ですか？",
    answer: "ArrayList は内部的に配列を使用。インデックスによるランダムアクセスが O(1) で高速。末尾への追加は O(1)（配列拡張時は O(n)）。中間への挿入・削除は O(n)。LinkedList は二重連結リスト。先頭・末尾への挿入・削除が O(1)。ランダムアクセスは O(n) で低速。一般的には ArrayList が推奨される。",
    category: "collections",
    level: "basic",
  },
  {
    id: 13,
    question: "HashMap の仕組みを簡単に説明してください",
    answer: "HashMap はキーのハッシュ値をもとにバケット（内部配列のインデックス）を決定し、キーと値のペアを格納する。ハッシュ衝突が発生した場合は連結リスト（Java 8 以降は要素数が多いとツリー構造）で管理する。get/put は平均 O(1)。キーには equals() と hashCode() の正しい実装が必要。",
    category: "collections",
    level: "basic",
  },
  {
    id: 14,
    question: "チェック例外と非チェック例外の違いは何ですか？",
    answer: "チェック例外（検査例外）は Exception のサブクラスで RuntimeException 以外のもの。コンパイラがハンドリングを強制する（try-catch または throws 宣言が必要）。例: IOException、SQLException。非チェック例外は RuntimeException のサブクラス。ハンドリングは任意。プログラムのバグに起因するもの。例: NullPointerException、ArrayIndexOutOfBoundsException。",
    category: "exceptions",
    level: "basic",
  },
  {
    id: 15,
    question: "try-with-resources とは何ですか？",
    answer: "Java 7 で導入された構文。AutoCloseable を実装したリソースを try() 内で宣言すると、ブロック終了時に自動的に close() が呼ばれる。finally ブロックでのリソース解放が不要になり、コードが簡潔になる。複数リソースもセミコロンで区切って宣言可能。",
    category: "exceptions",
    level: "basic",
    code: `// try-with-resources
try (var reader = new BufferedReader(new FileReader("file.txt"));
     var writer = new BufferedWriter(new FileWriter("out.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line);
    }
} // reader, writer は自動的に close される`,
  },
  {
    id: 16,
    question: "アクセス修飾子の種類とスコープを説明してください",
    answer: "Java には4つのアクセス修飾子がある。public: どこからでもアクセス可能。protected: 同一パッケージ＋サブクラスからアクセス可能。デフォルト（修飾子なし）: 同一パッケージからのみアクセス可能。private: 同一クラスからのみアクセス可能。最小限のアクセス修飾子を選ぶのがベストプラクティス。",
    category: "basics",
    level: "basic",
  },
  {
    id: 17,
    question: "コンストラクタとは何ですか？特徴を説明してください",
    answer: "コンストラクタはオブジェクト生成時に呼ばれる特殊なメソッド。クラス名と同じ名前で、戻り値の型を持たない。デフォルトコンストラクタは引数なしのコンストラクタで、明示的にコンストラクタを定義しない場合にコンパイラが自動生成する。this() で同クラスの別コンストラクタ、super() で親クラスのコンストラクタを呼び出せる。",
    category: "oop",
    level: "basic",
  },
  {
    id: 18,
    question: "ポリモーフィズム（多態性）とは何ですか？",
    answer: "ポリモーフィズムは同一のインターフェースや親クラスの参照で、異なる具象クラスのオブジェクトを扱える性質。実行時に実際のオブジェクトの型に応じたメソッドが呼ばれる（動的ディスパッチ）。これにより「変更に強い」コードが書ける。例えば List<String> 型の変数に ArrayList でも LinkedList でも代入できる。",
    category: "oop",
    level: "basic",
    code: `List<String> list = new ArrayList<>(); // 実装の差替えが容易
// List<String> list = new LinkedList<>();

Animal animal = new Dog();
animal.speak(); // Dog の speak() が呼ばれる`,
  },
  {
    id: 19,
    question: "Java のメモリ領域（ヒープとスタック）の違いは？",
    answer: "スタックはメソッド呼び出しごとにフレームが作られ、ローカル変数やメソッド引数が格納される。LIFO で管理され、メソッド終了時に自動解放。スレッドごとに独立。ヒープは new で生成されたオブジェクトが格納される領域。全スレッドで共有。ガベージコレクタによって不要なオブジェクトが回収される。",
    category: "memory",
    level: "basic",
  },
  {
    id: 20,
    question: "ガベージコレクション（GC）とは何ですか？",
    answer: "GC は参照されなくなったオブジェクトのメモリを自動的に解放する仕組み。開発者が明示的に free() を呼ぶ必要がない。GC の対象になるのは到達不能なオブジェクト（ルートから参照が辿れないもの）。System.gc() は GC を「提案」するだけで実行を保証しない。GC には様々なアルゴリズム（G1GC、ZGC 等）がある。",
    category: "memory",
    level: "basic",
  },
  {
    id: 21,
    question: "Generics（ジェネリクス）の利点は何ですか？",
    answer: "ジェネリクスは型をパラメータ化する機能（Java 5 で導入）。利点は ① コンパイル時の型安全性（ClassCastException を防止）② キャストが不要になる ③ コードの再利用性向上。型消去（Type Erasure）によりコンパイル後はジェネリクス情報が消え、実行時には Object として扱われる。",
    category: "basics",
    level: "basic",
    code: `// ジェネリクスなし（危険）
List list = new ArrayList();
list.add("Hello");
String s = (String) list.get(0); // キャスト必要

// ジェネリクスあり（安全）
List<String> list = new ArrayList<>();
list.add("Hello");
String s = list.get(0); // キャスト不要`,
  },
  {
    id: 22,
    question: "enum（列挙型）の特徴と使い方を説明してください",
    answer: "enum は固定の定数集合を型安全に表現する機能。内部的にはクラスであり、フィールド、メソッド、コンストラクタを持てる。switch 文で使え、values() で全定数の配列を取得できる。int 定数と比べて型安全性が高く、可読性も向上する。Singleton パターンの実装にも使える。",
    category: "basics",
    level: "basic",
    code: `enum Status {
    ACTIVE("有効"), INACTIVE("無効"), DELETED("削除");

    private final String label;
    Status(String label) { this.label = label; }
    public String getLabel() { return label; }
}

Status s = Status.ACTIVE;
System.out.println(s.getLabel()); // "有効"`,
  },
  {
    id: 23,
    question: "Iterator とは何ですか？for-each との関係は？",
    answer: "Iterator はコレクションの要素を順次アクセスするためのインターフェース。hasNext()、next()、remove() メソッドを持つ。for-each 文（拡張 for 文）は内部的に Iterator を使用する。Iterable インターフェースを実装したクラスは for-each で利用可能。反復中に要素を安全に削除する場合は Iterator の remove() を使う。",
    category: "collections",
    level: "basic",
  },
  {
    id: 24,
    question: "HashSet と TreeSet の違いは何ですか？",
    answer: "HashSet は HashMap をベースとし、要素の順序を保証しない。追加・検索・削除が平均 O(1)。TreeSet は赤黒木をベースとし、要素をソート順（自然順序または Comparator）で保持する。操作は O(log n)。順序が必要なら TreeSet、パフォーマンス重視なら HashSet を使う。LinkedHashSet は挿入順序を保持する。",
    category: "collections",
    level: "basic",
  },
  {
    id: 25,
    question: "ラムダ式とは何ですか？",
    answer: "ラムダ式は関数型インターフェース（抽象メソッドが1つだけのインターフェース）の匿名実装を簡潔に記述する構文（Java 8 で導入）。(引数) -> { 処理 } の形式で書く。匿名クラスの冗長さを解消し、コレクション操作や非同期処理のコールバックを簡潔に記述できる。",
    category: "streams",
    level: "basic",
    code: `// 匿名クラス（従来）
Comparator<String> comp = new Comparator<String>() {
    public int compare(String a, String b) {
        return a.length() - b.length();
    }
};

// ラムダ式
Comparator<String> comp = (a, b) -> a.length() - b.length();

// メソッド参照
list.forEach(System.out::println);`,
  },
  {
    id: 26,
    question: "Stream API の基本的な使い方を説明してください",
    answer: "Stream API はコレクションの要素を宣言的に処理するための API（Java 8 で導入）。ソースからストリームを生成し、中間操作（filter、map、sorted 等）を連鎖させ、終端操作（collect、forEach、reduce 等）で結果を得る。遅延評価されるため、終端操作が呼ばれるまで中間操作は実行されない。",
    category: "streams",
    level: "basic",
    code: `List<String> names = List.of("Alice", "Bob", "Charlie", "David");

List<String> result = names.stream()
    .filter(n -> n.length() > 3)   // 中間操作: フィルタ
    .map(String::toUpperCase)       // 中間操作: 変換
    .sorted()                       // 中間操作: ソート
    .collect(Collectors.toList());  // 終端操作: リスト化
// [ALICE, CHARLIE, DAVID]`,
  },
  {
    id: 27,
    question: "Optional とは何ですか？なぜ使うのですか？",
    answer: "Optional は値が存在するかもしれないし、存在しないかもしれないことを明示するコンテナクラス（Java 8 で導入）。null を直接返す代わりに Optional を使うことで NullPointerException を防止し、値の有無に対する処理を強制できる。メソッドの戻り値に使うのが主な用途。フィールドやメソッド引数には使わない。",
    category: "streams",
    level: "basic",
    code: `Optional<User> user = userRepository.findById(id);

// 値の取得方法
String name = user
    .map(User::getName)
    .orElse("Unknown");

// 存在する場合のみ処理
user.ifPresent(u -> System.out.println(u.getName()));`,
  },
  {
    id: 28,
    question: "インターフェースの default メソッドとは何ですか？",
    answer: "Java 8 で導入された、インターフェースにデフォルト実装を持たせる機能。既存のインターフェースに新しいメソッドを追加しても、実装クラスが壊れない（後方互換性）。複数のインターフェースが同名の default メソッドを持つ場合、実装クラスで明示的にオーバーライドが必要。",
    category: "basics",
    level: "basic",
    code: `interface Greeter {
    default String greet(String name) {
        return "Hello, " + name;
    }
}

class JapaneseGreeter implements Greeter {
    @Override
    public String greet(String name) {
        return "こんにちは、" + name;
    }
}`,
  },
  {
    id: 29,
    question: "Map の主な実装クラスの違いを説明してください",
    answer: "HashMap: 順序なし、null キー/値を許容、最も高速（O(1)）。LinkedHashMap: 挿入順序を保持、HashMap より若干遅い。TreeMap: キーのソート順で保持（O(log n)）。Hashtable: synchronized でスレッドセーフだが低速、null 不可、レガシー。ConcurrentHashMap: 高パフォーマンスなスレッドセーフ実装。",
    category: "collections",
    level: "basic",
  },
  {
    id: 30,
    question: "this と super の違いは何ですか？",
    answer: "this は現在のオブジェクト自身への参照。this.field でフィールドアクセス、this() で同クラスの別コンストラクタを呼び出す。super は親クラスへの参照。super.method() で親メソッドの呼び出し、super() で親コンストラクタを呼び出す。コンストラクタ内の this() / super() は必ず先頭に書く必要がある。",
    category: "oop",
    level: "basic",
  },
  {
    id: 31,
    question: "配列と ArrayList の違いは何ですか？",
    answer: "配列は固定長でサイズ変更不可、プリミティブ型も格納可能、型安全。ArrayList は可変長で要素の追加・削除が容易、オブジェクトのみ格納（プリミティブは自動ボクシング）、ジェネリクスで型安全。配列は多次元をサポート。パフォーマンスは配列がわずかに優れるが、柔軟性では ArrayList が優位。",
    category: "collections",
    level: "basic",
  },
  {
    id: 32,
    question: "Comparable と Comparator の違いは？",
    answer: "Comparable はクラス自身が実装する自然順序を定義するインターフェース（compareTo メソッド）。1つのクラスに1つの順序しか定義できない。Comparator は外部から順序を定義するインターフェース（compare メソッド）。複数の異なるソート基準を定義可能。ラムダ式で簡潔に書ける。",
    category: "collections",
    level: "basic",
    code: `// Comparable: クラス内で自然順序を定義
class Student implements Comparable<Student> {
    public int compareTo(Student o) {
        return this.name.compareTo(o.name);
    }
}

// Comparator: 外部からソート基準を指定
students.sort(Comparator.comparing(Student::getAge));
students.sort(Comparator.comparing(Student::getName).reversed());`,
  },
  {
    id: 33,
    question: "Java のパッケージとは何ですか？",
    answer: "パッケージはクラスを論理的にグループ化する名前空間の仕組み。名前の衝突を防止し、アクセス制御の単位にもなる。ディレクトリ構造と対応する。java.util、java.io などの標準パッケージのほか、逆ドメイン名（com.example.app）で独自パッケージを定義する慣習がある。",
    category: "basics",
    level: "basic",
  },
  {
    id: 34,
    question: "Java でのコメントの種類を説明してください",
    answer: "Java には3種類のコメントがある。① 行コメント（// ...）: 行末まで。② ブロックコメント（/* ... */）: 複数行。③ Javadoc コメント（/** ... */）: API ドキュメント生成用。@param、@return、@throws 等のタグが使える。javadoc コマンドで HTML ドキュメントを生成できる。",
    category: "basics",
    level: "basic",
  },
  {
    id: 35,
    question: "型キャスト（アップキャスト・ダウンキャスト）とは？",
    answer: "アップキャストは子クラスを親クラスの型に変換すること。暗黙的に行われ安全。ダウンキャストは親クラスを子クラスの型に変換すること。明示的なキャストが必要で、実行時に ClassCastException が発生する可能性がある。instanceof で型チェックしてからダウンキャストするのが安全。",
    category: "oop",
    level: "basic",
    code: `Animal animal = new Dog(); // アップキャスト（暗黙的）

if (animal instanceof Dog dog) { // パターンマッチング (Java 16+)
    dog.fetch(); // ダウンキャスト不要
}`,
  },
  {
    id: 36,
    question: "Java の変数スコープについて説明してください",
    answer: "Java の変数スコープは宣言位置で決まる。① インスタンス変数: クラス内で宣言、オブジェクトの生存期間中有効。② クラス変数（static）: クラスのロードから終了まで有効。③ ローカル変数: メソッド/ブロック内で宣言、そのブロック内のみ有効。④ パラメータ: メソッドの引数、メソッド内で有効。ブロック {} で囲むとさらにスコープを限定できる。",
    category: "basics",
    level: "basic",
  },
  {
    id: 37,
    question: "null とは何ですか？NullPointerException の防止策は？",
    answer: "null は参照型変数が「何も参照していない」ことを示す特別な値。null に対してメソッドを呼ぶと NullPointerException（NPE）が発生する。防止策は ① Optional の活用 ② null チェック ③ Objects.requireNonNull() ④ @NonNull アノテーション ⑤ null を返さない設計（空コレクションを返す等）。",
    category: "basics",
    level: "basic",
  },
  {
    id: 38,
    question: "autoboxing と unboxing とは何ですか？",
    answer: "autoboxing はプリミティブ型を対応するラッパークラスに自動変換すること（int → Integer）。unboxing はラッパークラスをプリミティブ型に自動変換すること（Integer → int）。Java 5 で導入された。便利だが、パフォーマンスへの影響や null の unboxing による NPE に注意が必要。",
    category: "basics",
    level: "basic",
    code: `Integer a = 100;     // autoboxing: int → Integer
int b = a;           // unboxing: Integer → int

Integer c = null;
int d = c;           // NullPointerException!`,
  },
  {
    id: 39,
    question: "Java で多重継承ができない理由は？",
    answer: "Java はクラスの多重継承を禁止している（ダイヤモンド問題の回避）。クラス A を継承する B と C があり、D が B と C の両方を継承すると、A のメソッドがどちらの経路で呼ばれるか曖昧になる。代わりにインターフェースの多重実装で多態性を実現する。Java 8 の default メソッドにより、インターフェースでも同様の問題が起きうるが、コンパイラが検出する。",
    category: "oop",
    level: "basic",
  },
  {
    id: 40,
    question: "Java におけるイミュータブル（不変）オブジェクトとは？",
    answer: "作成後に状態を変更できないオブジェクト。設計指針: ① クラスを final にする ② フィールドを private final にする ③ setter を提供しない ④ 可変オブジェクトのフィールドは防御的コピーを返す。String、Integer、LocalDate などが不変。スレッドセーフで、Map のキーに安全に使える。Java 16 の record は不変オブジェクトの定義を簡素化する。",
    category: "oop",
    level: "basic",
    code: `// record で不変オブジェクトを簡潔に定義 (Java 16+)
record Point(int x, int y) {}

Point p = new Point(10, 20);
// p.x = 30; // コンパイルエラー（setter がない）`,
  },

  // ===== 中級 (41-75) =====
  {
    id: 41,
    question: "synchronized キーワードの仕組みを説明してください",
    answer: "synchronized はスレッド間の排他制御を行うキーワード。モニター（ロック）を取得し、同時に1スレッドのみがブロック内のコードを実行できる。メソッドに付ける場合は this（インスタンスメソッド）または Class オブジェクト（static メソッド）がロック対象。synchronized ブロックでは任意のオブジェクトをロックとして指定できる。",
    category: "concurrency",
    level: "intermediate",
    code: `// メソッドレベル
public synchronized void increment() {
    count++;
}

// ブロックレベル（より細かい制御）
public void increment() {
    synchronized (this) {
        count++;
    }
}`,
  },
  {
    id: 42,
    question: "volatile キーワードの役割は何ですか？",
    answer: "volatile はフィールドの値がメインメモリから直接読み書きされることを保証する修飾子。各スレッドの CPU キャッシュに古い値が残る「可視性」の問題を防ぐ。ただし volatile はアトミック性を保証しない（count++ のような複合操作はスレッドセーフにならない）。フラグ変数や状態通知に使われる。",
    category: "concurrency",
    level: "intermediate",
    code: `class Worker {
    private volatile boolean running = true;

    public void stop() { running = false; }

    public void run() {
        while (running) { // volatile なので変更が即座に見える
            doWork();
        }
    }
}`,
  },
  {
    id: 43,
    question: "スレッドプールとは何ですか？ExecutorService の使い方は？",
    answer: "スレッドプールは事前に作成したスレッドを再利用する仕組み。スレッドの生成コストを削減し、同時実行数を制限できる。ExecutorService はスレッドプールの管理インターフェース。Executors.newFixedThreadPool() 等で作成。submit() でタスクを投入し、Future で結果を受け取る。使用後は shutdown() で終了する。",
    category: "concurrency",
    level: "intermediate",
    code: `ExecutorService executor = Executors.newFixedThreadPool(4);

Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "完了";
});

String result = future.get(); // ブロッキングで結果取得
executor.shutdown();`,
  },
  {
    id: 44,
    question: "デッドロックとは何ですか？どう防ぎますか？",
    answer: "デッドロックは2つ以上のスレッドが互いに相手のロック解放を待ち続け、永久にブロックされる状態。防止策: ① ロックの取得順序を統一する ② タイムアウト付きロック（tryLock）を使う ③ ロックの粒度を小さくする ④ 可能なら Lock-free なデータ構造（ConcurrentHashMap 等）を使う。",
    category: "concurrency",
    level: "intermediate",
  },
  {
    id: 45,
    question: "Java のリフレクションとは何ですか？",
    answer: "リフレクションは実行時にクラスの構造（メソッド、フィールド、コンストラクタ）を調査・操作する機能。Class オブジェクトからメソッド呼び出しやフィールドアクセスを動的に行える。フレームワーク（Spring、JPA 等）で多用される。デメリットはパフォーマンス低下、型安全性の喪失、カプセル化の破壊。",
    category: "memory",
    level: "intermediate",
    code: `Class<?> clazz = Class.forName("com.example.User");
Object obj = clazz.getDeclaredConstructor().newInstance();
Method method = clazz.getMethod("getName");
String name = (String) method.invoke(obj);`,
  },
  {
    id: 46,
    question: "Java のアノテーションの仕組みを説明してください",
    answer: "アノテーションはメタデータをコードに付与する仕組み。@Override、@Deprecated などの標準アノテーションのほか、カスタムアノテーションも定義できる。リテンションポリシー（SOURCE/CLASS/RUNTIME）で利用可能なフェーズが決まる。RUNTIME アノテーションはリフレクションで実行時に取得可能で、フレームワークの DI や ORM で活用される。",
    category: "basics",
    level: "intermediate",
    code: `// カスタムアノテーションの定義
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Cacheable {
    int ttl() default 300;
}

// 使用
@Cacheable(ttl = 600)
public User findById(Long id) { ... }`,
  },
  {
    id: 47,
    question: "SOLID 原則を簡単に説明してください",
    answer: "S: 単一責任の原則 - クラスは1つの責任のみ持つ。O: 開放閉鎖の原則 - 拡張に開き、修正に閉じる。L: リスコフの置換原則 - サブクラスは親クラスと置換可能であるべき。I: インターフェース分離の原則 - クライアントが使わないメソッドへの依存を強制しない。D: 依存性逆転の原則 - 抽象に依存し、具象に依存しない。",
    category: "design",
    level: "intermediate",
  },
  {
    id: 48,
    question: "Singleton パターンをスレッドセーフに実装する方法は？",
    answer: "主な方法は3つ。① enum Singleton（最も推奨）: JVM レベルで単一インスタンスを保証。② static inner class（Bill Pugh）: 遅延初期化かつスレッドセーフ。③ double-checked locking: volatile + synchronized の組み合わせ。Spring の @Component（デフォルトで Singleton スコープ）を使うのが実務では最も一般的。",
    category: "design",
    level: "intermediate",
    code: `// enum（最も安全・簡潔）
enum Singleton {
    INSTANCE;
    public void doSomething() { }
}

// static inner class（遅延初期化）
class Singleton {
    private Singleton() {}
    private static class Holder {
        static final Singleton INSTANCE = new Singleton();
    }
    public static Singleton getInstance() {
        return Holder.INSTANCE;
    }
}`,
  },
  {
    id: 49,
    question: "依存性注入（DI）とは何ですか？",
    answer: "DI はオブジェクトの依存関係を外部から注入するデザインパターン。クラス内で new で依存オブジェクトを生成するのではなく、コンストラクタや setter を通じて外部から渡す。メリットは ① テスタビリティ向上（モック注入が容易）② 疎結合 ③ 設定の柔軟性。Spring Framework の中核機能。",
    category: "design",
    level: "intermediate",
    code: `// DI なし（密結合）
class OrderService {
    private UserRepository repo = new UserRepositoryImpl();
}

// DI あり（疎結合）
class OrderService {
    private final UserRepository repo;
    public OrderService(UserRepository repo) { // コンストラクタ注入
        this.repo = repo;
    }
}`,
  },
  {
    id: 50,
    question: "Java の例外処理のベストプラクティスは？",
    answer: "① 具体的な例外をキャッチする（Exception で一括キャッチしない）② ログを残す（例外を握りつぶさない）③ チェック例外は回復可能な場合のみ使う ④ カスタム例外で業務エラーを表現する ⑤ try-with-resources でリソースを管理 ⑥ finally でのreturn を避ける ⑦ 例外のスタックトレースを保持する（cause を渡す）。",
    category: "exceptions",
    level: "intermediate",
    code: `// 悪い例
try { ... } catch (Exception e) { } // 握りつぶし

// 良い例
try { ... }
catch (IOException e) {
    log.error("ファイル読み込み失敗: {}", path, e);
    throw new BusinessException("処理に失敗しました", e);
}`,
  },
  {
    id: 51,
    question: "Java の Stream で並列処理を行う方法と注意点は？",
    answer: "parallelStream() または stream().parallel() で並列ストリームを生成する。内部的に ForkJoinPool を使い、データを分割して複数スレッドで処理する。注意点: ① 共有可変状態を避ける ② 要素数が少ないと逆に遅い ③ 順序が保証されない場合がある ④ I/O バウンドな処理には不向き ⑤ forEachOrdered() で順序を維持できるがパフォーマンスが落ちる。",
    category: "streams",
    level: "intermediate",
  },
  {
    id: 52,
    question: "CompletableFuture とは何ですか？",
    answer: "CompletableFuture は非同期プログラミングのための API（Java 8 で導入）。Future と異なり、コールバックを連鎖でき、複数の非同期処理を合成できる。thenApply（変換）、thenCompose（フラット変換）、thenCombine（2つの結果を合成）、exceptionally（エラーハンドリング）などのメソッドで宣言的に非同期パイプラインを構築できる。",
    category: "concurrency",
    level: "intermediate",
    code: `CompletableFuture.supplyAsync(() -> fetchUser(id))
    .thenApply(user -> user.getEmail())
    .thenCompose(email -> sendEmail(email))
    .exceptionally(ex -> {
        log.error("処理失敗", ex);
        return null;
    });`,
  },
  {
    id: 53,
    question: "Java の関数型インターフェースの代表例を挙げてください",
    answer: "java.util.function パッケージに主要な関数型インターフェースが定義されている。Predicate<T>: T→boolean（フィルタ条件）。Function<T,R>: T→R（変換）。Consumer<T>: T→void（副作用のある処理）。Supplier<T>: ()→T（生成）。BiFunction<T,U,R>: (T,U)→R。UnaryOperator<T>: T→T（同型変換）。",
    category: "streams",
    level: "intermediate",
  },
  {
    id: 54,
    question: "HashMap と ConcurrentHashMap の違いは？",
    answer: "HashMap はスレッドセーフではない。複数スレッドから同時にアクセスするとデータ破壊が起きる。ConcurrentHashMap はロックの粒度を細かくし（セグメントロック→ Java 8 以降はノードロック＋CAS）、高い並行性を実現。null キー/値は不可。読み取りはロックフリー。Collections.synchronizedMap() より高パフォーマンス。",
    category: "concurrency",
    level: "intermediate",
  },
  {
    id: 55,
    question: "JPA とは何ですか？Hibernate との関係は？",
    answer: "JPA（Java Persistence API）は Java のORM（Object-Relational Mapping）標準仕様。エンティティクラスとデータベーステーブルをマッピングし、SQL を直接書かずにデータ操作を行える。Hibernate は JPA の最も広く使われている実装プロバイダ。JPA はインターフェース（仕様）であり、Hibernate はその具体的な実装。",
    category: "db",
    level: "intermediate",
  },
  {
    id: 56,
    question: "Spring Boot の自動構成（Auto Configuration）とは？",
    answer: "Spring Boot がクラスパス上のライブラリを検出し、適切な Bean を自動的に構成する仕組み。例えば spring-boot-starter-web があれば DispatcherServlet、Tomcat を自動構成。@ConditionalOnClass、@ConditionalOnMissingBean などの条件アノテーションで制御される。application.properties/yml でカスタマイズ可能。",
    category: "spring",
    level: "intermediate",
  },
  {
    id: 57,
    question: "Spring の DI コンテナ（ApplicationContext）の役割は？",
    answer: "ApplicationContext は Bean のライフサイクル管理、DI、AOP、イベント発行、国際化などを担う Spring の中核コンポーネント。@Component 等でマークされたクラスをスキャンし、依存関係を解決してインスタンスを生成・管理する。デフォルトで Singleton スコープで管理される。",
    category: "spring",
    level: "intermediate",
  },
  {
    id: 58,
    question: "N+1 問題とは何ですか？対策は？",
    answer: "N+1 問題は JPA/ORM で親エンティティ1件取得後、関連エンティティを N 件分個別にクエリ発行してしまう問題。対策: ① JOIN FETCH（JPQL の JOIN FETCH でまとめて取得）② @EntityGraph（JPA 2.1）③ @BatchSize（Hibernate のバッチロード）④ DTO プロジェクション（必要なカラムだけ取得）。",
    category: "db",
    level: "intermediate",
    code: `// N+1 問題が発生するコード
List<Order> orders = orderRepository.findAll(); // 1回
for (Order o : orders) {
    o.getUser().getName(); // N回クエリが発行される
}

// 解決: JOIN FETCH
@Query("SELECT o FROM Order o JOIN FETCH o.user")
List<Order> findAllWithUser();`,
  },
  {
    id: 59,
    question: "REST API 設計のベストプラクティスは？",
    answer: "① リソース指向の URL 設計（/users、/users/{id}）② HTTP メソッドの適切な使用（GET=取得、POST=作成、PUT=更新、DELETE=削除）③ 適切なステータスコード（200、201、400、404、500）④ ページネーション ⑤ バージョニング（/api/v1/）⑥ HATEOAS ⑦ 一貫したエラーレスポンス形式。",
    category: "spring",
    level: "intermediate",
  },
  {
    id: 60,
    question: "トランザクション管理で @Transactional の動作は？",
    answer: "@Transactional はメソッドの実行をトランザクション内で行う Spring のアノテーション。メソッド開始時にトランザクション開始、正常終了でコミット、例外発生でロールバック。デフォルトでは RuntimeException でのみロールバック。propagation（伝播）、isolation（分離レベル）、readOnly などの属性で制御可能。",
    category: "spring",
    level: "intermediate",
    code: `@Transactional(
    propagation = Propagation.REQUIRED,  // デフォルト
    isolation = Isolation.READ_COMMITTED,
    rollbackFor = Exception.class,       // チェック例外でもロールバック
    readOnly = false,
    timeout = 30
)
public void transferMoney(Long from, Long to, BigDecimal amount) {
    // この中の処理は1つのトランザクション
}`,
  },
  {
    id: 61,
    question: "equals() と hashCode() の契約（contract）とは？",
    answer: "① equals が true の2オブジェクトは同じ hashCode を返す（必須）。② hashCode が同じでも equals が true とは限らない（ハッシュ衝突）。③ equals は反射的、対称的、推移的、一貫性がある。この契約を破ると HashMap、HashSet が正しく動作しない。IDE の自動生成や Objects.hash() を活用して正しく実装する。",
    category: "oop",
    level: "intermediate",
  },
  {
    id: 62,
    question: "Java のジェネリクスにおけるワイルドカード（?）の使い方は？",
    answer: "? はアンバウンドワイルドカード（任意の型）。? extends T は上限境界ワイルドカード（T のサブクラス、読み取り専用）。? super T は下限境界ワイルドカード（T のスーパークラス、書き込み専用）。PECS 原則: Producer は extends、Consumer は super を使う。",
    category: "basics",
    level: "intermediate",
    code: `// 読み取り（Producer → extends）
void printAll(List<? extends Number> list) {
    for (Number n : list) { System.out.println(n); }
}

// 書き込み（Consumer → super）
void addIntegers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}`,
  },
  {
    id: 63,
    question: "Java のクラスローダーの仕組みを説明してください",
    answer: "クラスローダーは .class ファイルを JVM にロードする仕組み。3層の委譲モデル: ① Bootstrap ClassLoader（Java コアライブラリ）② Platform ClassLoader（拡張ライブラリ）③ Application ClassLoader（クラスパス上のクラス）。親に委譲してから自身でロードする（双親委任モデル）。カスタムクラスローダーも作成可能。",
    category: "memory",
    level: "intermediate",
  },
  {
    id: 64,
    question: "Java のシリアライゼーションとは何ですか？注意点は？",
    answer: "オブジェクトをバイトストリームに変換してファイルやネットワーク経由で送受信する機能。Serializable インターフェースを実装する。注意点: ① serialVersionUID を明示的に定義する ② transient フィールドは除外される ③ セキュリティリスク（デシリアライゼーション攻撃）④ 代替手段として JSON（Jackson）の使用を推奨。",
    category: "basics",
    level: "intermediate",
  },
  {
    id: 65,
    question: "単体テストのベストプラクティスは？",
    answer: "① AAA パターン（Arrange-Act-Assert）で構造化 ② 1テストに1アサーション（原則）③ テスト名は何をテストするか明確に ④ 外部依存はモック化（Mockito）⑤ テストは独立して実行可能に ⑥ エッジケースも網羅 ⑦ テストも本番コードと同じ品質で書く ⑧ カバレッジだけでなくテストの質を重視。",
    category: "testing",
    level: "intermediate",
    code: `@Test
void shouldReturnDiscountedPrice_whenVIPCustomer() {
    // Arrange
    var customer = new Customer("VIP");
    var product = new Product("Book", 1000);

    // Act
    int price = pricingService.calculate(customer, product);

    // Assert
    assertEquals(800, price); // 20% off
}`,
  },
  {
    id: 66,
    question: "Mockito の基本的な使い方を説明してください",
    answer: "Mockito はモックオブジェクトを作成するテストフレームワーク。@Mock でモックを生成、when().thenReturn() で戻り値を設定、verify() でメソッド呼び出しを検証する。@InjectMocks でテスト対象にモックを自動注入。any()、eq() などのマッチャーで柔軟な引数指定が可能。",
    category: "testing",
    level: "intermediate",
    code: `@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock UserRepository repository;
    @InjectMocks UserService service;

    @Test
    void shouldReturnUser() {
        when(repository.findById(1L))
            .thenReturn(Optional.of(new User("Alice")));

        User user = service.findById(1L);

        assertEquals("Alice", user.getName());
        verify(repository).findById(1L);
    }
}`,
  },
  {
    id: 67,
    question: "Builder パターンとは何ですか？いつ使いますか？",
    answer: "Builder パターンはコンストラクタの引数が多い場合に、メソッドチェーンでオブジェクトを段階的に構築するパターン。可読性の向上、不変オブジェクトの構築、オプションパラメータの柔軟な設定が可能。Lombok の @Builder で自動生成できる。コンストラクタが4つ以上の引数を持つ場合に検討する。",
    category: "design",
    level: "intermediate",
    code: `User user = User.builder()
    .name("Alice")
    .email("alice@example.com")
    .age(30)
    .role(Role.ADMIN)
    .build();`,
  },
  {
    id: 68,
    question: "Strategy パターンとは何ですか？",
    answer: "Strategy パターンはアルゴリズムをカプセル化し、実行時に切り替え可能にするパターン。if-else の連鎖を排除し、開放閉鎖の原則に従う。Java ではインターフェースと DI で実装する。Comparator がStrategy パターンの典型例。ラムダ式と組み合わせると簡潔に書ける。",
    category: "design",
    level: "intermediate",
  },
  {
    id: 69,
    question: "Java 8 以降で追加された主な機能を挙げてください",
    answer: "Java 8: ラムダ式、Stream API、Optional、default メソッド、java.time API。Java 11: var（ラムダ引数）、HttpClient、String の新メソッド。Java 14: switch 式、record（プレビュー）。Java 16: record（正式）、パターンマッチング instanceof。Java 17（LTS）: sealed class。Java 21（LTS）: virtual threads、パターンマッチング switch。",
    category: "modern",
    level: "intermediate",
  },
  {
    id: 70,
    question: "record とは何ですか？通常のクラスとの違いは？",
    answer: "record は不変のデータキャリアクラスを簡潔に定義する構文（Java 16 で正式導入）。コンパイラが自動的に private final フィールド、コンストラクタ、getter、equals()、hashCode()、toString() を生成する。継承不可（暗黙的に final）。DTO や値オブジェクトの定義に最適。",
    category: "modern",
    level: "intermediate",
    code: `// record の定義（1行で完結）
record User(Long id, String name, String email) {}

// 等価なクラス定義は約30行必要
// - private final フィールド × 3
// - コンストラクタ
// - getter × 3
// - equals(), hashCode(), toString()`,
  },
  {
    id: 71,
    question: "sealed class とは何ですか？",
    answer: "sealed class は継承できるクラスを明示的に制限する機能（Java 17 で正式導入）。permits 句で許可するサブクラスを列挙する。サブクラスは final、sealed、non-sealed のいずれかを宣言する必要がある。パターンマッチング switch と組み合わせて、型安全な分岐処理を実現できる。代数的データ型を Java で表現可能にする。",
    category: "modern",
    level: "intermediate",
    code: `sealed interface Shape permits Circle, Rectangle, Triangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}
record Triangle(double base, double height) implements Shape {}

// パターンマッチング (Java 21+)
double area = switch (shape) {
    case Circle c -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.w() * r.h();
    case Triangle t -> 0.5 * t.base() * t.height();
};`,
  },
  {
    id: 72,
    question: "Spring の AOP（アスペクト指向プログラミング）とは？",
    answer: "AOP は横断的関心事（ロギング、トランザクション、セキュリティ等）を本来のビジネスロジックから分離するプログラミングパラダイム。Spring AOP ではプロキシパターンで実現。@Aspect でアスペクトを定義し、@Before、@After、@Around などのアドバイスでメソッド実行の前後に処理を挿入する。",
    category: "spring",
    level: "intermediate",
    code: `@Aspect
@Component
class LoggingAspect {
    @Around("execution(* com.example.service.*.*(..))")
    Object logExecutionTime(ProceedingJoinPoint jp) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = jp.proceed();
        long ms = System.currentTimeMillis() - start;
        log.info("{} executed in {}ms", jp.getSignature(), ms);
        return result;
    }
}`,
  },
  {
    id: 73,
    question: "Java のイベント駆動型プログラミングの仕組みは？",
    answer: "Java では Observer パターン（Java 9 で非推奨）やリスナーパターンでイベント駆動を実現する。Spring では ApplicationEvent と @EventListener で疎結合なイベント駆動が可能。@Async と組み合わせて非同期イベント処理も実現できる。メッセージキュー（Kafka、RabbitMQ）を使うとマイクロサービス間のイベント駆動も可能。",
    category: "design",
    level: "intermediate",
  },
  {
    id: 74,
    question: "Java のコレクションフレームワークの全体像を説明してください",
    answer: "最上位の Iterable の下に Collection があり、3つのサブインターフェースに分かれる。List（順序あり・重複可）: ArrayList、LinkedList。Set（重複不可）: HashSet、TreeSet、LinkedHashSet。Queue/Deque（先入先出/両端）: ArrayDeque、PriorityQueue。別系統で Map（キーバリュー）: HashMap、TreeMap、ConcurrentHashMap。Collections ユーティリティクラスで不変化やソートが可能。",
    category: "collections",
    level: "intermediate",
  },
  {
    id: 75,
    question: "Spring Security の認証と認可の仕組みは？",
    answer: "認証（Authentication）はユーザーの身元を確認するプロセス。UsernamePasswordAuthenticationFilter がフォーム/Basic 認証を処理し、AuthenticationManager がユーザー情報を検証する。認可（Authorization）は認証済みユーザーのアクセス権を判定。@PreAuthorize、@Secured、SecurityFilterChain で URL/メソッドレベルのアクセス制御を行う。",
    category: "spring",
    level: "intermediate",
  },

  // ===== 上級 (76-100) =====
  {
    id: 76,
    question: "JVM のメモリ構造を詳しく説明してください",
    answer: "JVM メモリは大きく分けてヒープ（Young Generation + Old Generation）とノンヒープ（Metaspace、コードキャッシュ等）に分かれる。Young Gen はさらに Eden と Survivor（S0/S1）に分かれる。新しいオブジェクトは Eden に配置され、Minor GC で生存オブジェクトが Survivor を経由して Old Gen に昇格する。Metaspace はクラスメタデータを格納し、ネイティブメモリを使用する。",
    category: "memory",
    level: "advanced",
  },
  {
    id: 77,
    question: "GC アルゴリズムの種類と選び方を説明してください",
    answer: "① Serial GC: 単一スレッド、小規模アプリ向け。② Parallel GC: 複数スレッドでスループット重視。③ G1GC（Java 9 以降のデフォルト）: リージョンベースで停止時間を予測制御。④ ZGC: 超低レイテンシ（停止時間 < 1ms）、大ヒープ対応。⑤ Shenandoah: ZGC と同様に低レイテンシ。レスポンスタイム重視なら ZGC/G1GC、スループット重視なら Parallel GC を選ぶ。",
    category: "memory",
    level: "advanced",
    code: `// GC の指定（JVM オプション）
// -XX:+UseG1GC          G1GC（推奨）
// -XX:+UseZGC           ZGC（低レイテンシ）
// -XX:+UseParallelGC    Parallel GC
// -XX:MaxGCPauseMillis=200  目標停止時間
// -Xlog:gc*             GC ログ出力`,
  },
  {
    id: 78,
    question: "JIT コンパイラの仕組みを説明してください",
    answer: "JIT（Just-In-Time）コンパイラは頻繁に実行されるバイトコードをネイティブコードに変換して高速化する仕組み。HotSpot JVM は C1（クライアント）と C2（サーバー）の2段階 JIT を持つ。C1 は高速にコンパイルし、C2 は高度な最適化を行う（Tiered Compilation）。インライン化、ループ展開、脱仮想化などの最適化を実施する。",
    category: "memory",
    level: "advanced",
  },
  {
    id: 79,
    question: "Java Memory Model（JMM）とは何ですか？",
    answer: "JMM はマルチスレッド環境でのメモリの可視性と順序を定義する仕様。happens-before 関係で操作の順序を保証する。volatile の書き込みは後続の読み取りに可視。synchronized ブロックの終了は次の取得に可視。スレッド間でのデータ共有には適切な同期が必要で、JMM がその規則を定義する。",
    category: "concurrency",
    level: "advanced",
  },
  {
    id: 80,
    question: "Virtual Threads（仮想スレッド）とは何ですか？",
    answer: "Java 21 で正式導入された軽量スレッド。OS スレッド（プラットフォームスレッド）と異なり、JVM が管理する軽量なスレッドで、数百万のスレッドを同時に作成可能。I/O バウンドな処理の並行性を大幅に向上させる。Thread.ofVirtual() や Executors.newVirtualThreadPerTaskExecutor() で使用する。",
    category: "concurrency",
    level: "advanced",
    code: `// Virtual Threads (Java 21+)
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 100_000; i++) {
        executor.submit(() -> {
            // I/O バウンドな処理
            var response = httpClient.send(request, bodyHandler);
            process(response);
        });
    }
} // 10万の仮想スレッドも効率的に実行`,
  },
  {
    id: 81,
    question: "マイクロサービスアーキテクチャの利点と課題は？",
    answer: "利点: ① 独立したデプロイ ② 技術スタックの自由 ③ スケーラビリティ ④ 障害の局所化 ⑤ チームの自律性。課題: ① 分散システムの複雑さ ② サービス間通信のレイテンシ ③ データ一貫性（Saga パターン等が必要）④ 運用コスト増 ⑤ テストの複雑化 ⑥ サービス境界の設計が困難。小規模システムではモノリスが適切な場合も多い。",
    category: "design",
    level: "advanced",
  },
  {
    id: 82,
    question: "CQRS パターンとは何ですか？",
    answer: "CQRS（Command Query Responsibility Segregation）は読み取り（Query）と書き込み（Command）の責務を分離するパターン。読み取りと書き込みで異なるモデル・データストアを使用でき、それぞれ最適化できる。読み取りはスケールアウトしやすくなる。Event Sourcing と組み合わせることが多い。複雑さが増すため、必要な場合のみ採用する。",
    category: "design",
    level: "advanced",
  },
  {
    id: 83,
    question: "Event Sourcing パターンとは何ですか？",
    answer: "Event Sourcing は現在の状態を保存する代わりに、状態変更のイベントを時系列で保存するパターン。イベントを再生することで任意の時点の状態を復元できる。完全な監査ログ、デバッグの容易さ、時間旅行（過去の状態参照）が可能。CQRS と組み合わせて使うことが多い。イベントストアの設計と読み取りモデルの更新が課題。",
    category: "design",
    level: "advanced",
  },
  {
    id: 84,
    question: "Java のモジュールシステム（JPMS）とは？",
    answer: "Java 9 で導入された Java Platform Module System。module-info.java でモジュールの依存関係と公開パッケージを宣言する。強力なカプセル化を実現し、内部 API へのアクセスを制限できる。JDK 自体もモジュール化されている（java.base、java.sql 等）。jlink でカスタムランタイムイメージを作成できる。",
    category: "modern",
    level: "advanced",
    code: `// module-info.java
module com.example.app {
    requires java.sql;
    requires spring.core;
    exports com.example.app.api;    // 公開パッケージ
    opens com.example.app.model to spring.core; // リフレクション許可
}`,
  },
  {
    id: 85,
    question: "Java のパフォーマンスチューニングの手法は？",
    answer: "① プロファイリング（JVisualVM、async-profiler）でボトルネック特定 ② GC チューニング（ヒープサイズ、GC アルゴリズム選定）③ データ構造の最適化 ④ 文字列操作の最適化（StringBuilder）⑤ キャッシュの活用 ⑥ データベースクエリの最適化（インデックス、N+1 問題）⑦ 非同期/並列処理の活用 ⑧ JIT 最適化を意識したコード。推測ではなく計測に基づくこと。",
    category: "memory",
    level: "advanced",
  },
  {
    id: 86,
    question: "Java のセキュリティに関するベストプラクティスは？",
    answer: "① SQL インジェクション防止（プリペアドステートメント）② XSS 防止（出力エスケープ）③ CSRF 防止（トークン検証）④ パスワードハッシュ化（BCrypt）⑤ HTTPS の強制 ⑥ 最小権限の原則 ⑦ 依存ライブラリの脆弱性チェック ⑧ 入力バリデーション ⑨ シリアライゼーション攻撃への対策 ⑩ セキュアな乱数生成（SecureRandom）。",
    category: "spring",
    level: "advanced",
  },
  {
    id: 87,
    question: "型消去（Type Erasure）とは何ですか？影響は？",
    answer: "型消去はコンパイル時にジェネリクスの型パラメータを消去する仕組み。実行時には List<String> と List<Integer> の区別がない（共に List）。影響: ① ジェネリクスの型パラメータで instanceof が使えない ② ジェネリクスの配列を作れない ③ 型パラメータで new T() できない。Super Type Token やリフレクションで回避策がある。",
    category: "basics",
    level: "advanced",
    code: `// 型消去の影響
List<String> strings = new ArrayList<>();
List<Integer> integers = new ArrayList<>();

// 実行時は同じ型
System.out.println(strings.getClass() == integers.getClass()); // true

// コンパイルエラー
// if (obj instanceof List<String>) { } // 不可
if (obj instanceof List<?>) { } // ワイルドカードなら可`,
  },
  {
    id: 88,
    question: "Java の Proxy パターン（動的プロキシ）の仕組みは？",
    answer: "java.lang.reflect.Proxy でインターフェースの動的プロキシを生成できる。InvocationHandler でメソッド呼び出しをインターセプトし、前後に処理を追加できる。Spring AOP は CGLIB（クラスプロキシ）またはJDK 動的プロキシ（インターフェースプロキシ）を使って実現されている。@Transactional や @Cacheable もプロキシで動作する。",
    category: "design",
    level: "advanced",
  },
  {
    id: 89,
    question: "WeakReference・SoftReference・PhantomReference の違いは？",
    answer: "WeakReference: GC 発生時に即回収される。WeakHashMap のキーに使用。SoftReference: メモリ不足時にのみ回収される。キャッシュに適する。PhantomReference: オブジェクトが GC されたことを検知する用途。get() は常に null。ReferenceQueue と組み合わせてファイナライズ代替として使用。通常の参照（Strong Reference）は GC 対象にならない。",
    category: "memory",
    level: "advanced",
  },
  {
    id: 90,
    question: "分散トランザクションの実現方法は？",
    answer: "① 2PC（Two-Phase Commit）: 全参加者の合意でコミット。強い一貫性だが可用性が低い。② Saga パターン: 各サービスのローカルトランザクションを連鎖させ、失敗時は補償トランザクションで巻き戻す。③ TCC（Try-Confirm-Cancel）: リソースを仮押さえし、確定/取消。マイクロサービスでは Saga パターンが一般的。結果整合性（Eventual Consistency）を受け入れる設計が重要。",
    category: "design",
    level: "advanced",
  },
  {
    id: 91,
    question: "GraalVM とは何ですか？Native Image の利点は？",
    answer: "GraalVM は高性能な多言語仮想マシン。Graal JIT コンパイラと Native Image 機能を持つ。Native Image はAOT（Ahead-of-Time）コンパイルで Java アプリをネイティブバイナリに変換する。利点: ① 起動時間が大幅に短縮（ミリ秒レベル）② メモリ使用量が削減 ③ コンテナ環境に最適。制限: リフレクションに制限があり、GraalVM 設定が必要。Spring Boot 3 は Native Image を公式サポート。",
    category: "modern",
    level: "advanced",
  },
  {
    id: 92,
    question: "Java のメモリリークの原因と検出方法は？",
    answer: "原因: ① コレクションへの追加のみで削除しない ② リスナー/コールバックの未解除 ③ static フィールドでの参照保持 ④ ThreadLocal の未クリア ⑤ ClassLoader リーク ⑥ unclosed リソース。検出: ① ヒープダンプ解析（Eclipse MAT）② プロファイラ（VisualVM、JFR）③ -XX:+HeapDumpOnOutOfMemoryError ④ jmap / jcmd でヒープ情報取得。",
    category: "memory",
    level: "advanced",
  },
  {
    id: 93,
    question: "Java Flight Recorder（JFR）とは何ですか？",
    answer: "JFR は JVM に内蔵された低オーバーヘッドのプロファイリング・診断ツール。CPU、メモリ、スレッド、I/O、GC などのイベントを継続的に記録する。本番環境でも使用可能な低オーバーヘッド（通常1%未満）。JDK Mission Control（JMC）でデータを可視化・分析する。-XX:StartFlightRecording で起動時から記録開始。",
    category: "memory",
    level: "advanced",
    code: `// JFR の起動オプション
// java -XX:StartFlightRecording=duration=60s,filename=recording.jfr -jar app.jar

// jcmd で実行中のアプリに対して開始
// jcmd <PID> JFR.start duration=60s filename=recording.jfr`,
  },
  {
    id: 94,
    question: "Reactive Programming（リアクティブプログラミング）とは？",
    answer: "非同期データストリームに基づくプログラミングパラダイム。Reactive Streams 仕様で Publisher/Subscriber/Subscription/Processor のインターフェースを定義。バックプレッシャー（消費者が処理速度を制御）が特徴。実装として Project Reactor（Spring WebFlux）、RxJava がある。ノンブロッキング I/O で高スループットを実現する。",
    category: "modern",
    level: "advanced",
  },
  {
    id: 95,
    question: "Java のクラスファイルのバージョニングと互換性は？",
    answer: "Java のクラスファイルにはメジャーバージョン番号がある（Java 8=52、11=55、17=61、21=65）。JVM は自身のバージョン以下のクラスファイルのみ実行可能。--release フラグでターゲットバージョンを指定してコンパイルでき、古い API のみ使用することを保証できる。マルチリリース JAR で複数バージョン対応も可能。",
    category: "memory",
    level: "advanced",
  },
  {
    id: 96,
    question: "Spring Boot のアクチュエーター（Actuator）の役割は？",
    answer: "Spring Boot Actuator は本番環境でのアプリケーション監視・管理のためのエンドポイントを提供する。/health（ヘルスチェック）、/metrics（メトリクス）、/info（アプリ情報）、/env（環境変数）、/loggers（ログレベル動的変更）、/threaddump（スレッドダンプ）など。Prometheus、Grafana との連携でメトリクスの可視化が可能。",
    category: "spring",
    level: "advanced",
  },
  {
    id: 97,
    question: "Java アプリケーションの Docker コンテナ化のベストプラクティスは？",
    answer: "① マルチステージビルドでイメージサイズ削減 ② JRE ベースの軽量イメージ（eclipse-temurin:21-jre-alpine）使用 ③ コンテナ対応の JVM 設定（-XX:MaxRAMPercentage）④ jlink でカスタム JRE 作成 ⑤ 非 root ユーザーで実行 ⑥ .dockerignore の設定 ⑦ ヘルスチェックの設定 ⑧ グレースフルシャットダウン対応。",
    category: "modern",
    level: "advanced",
    code: `# マルチステージビルド
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar

FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S app && adduser -S app -G app
USER app
COPY --from=build /app/build/libs/*.jar app.jar
HEALTHCHECK CMD wget -q --spider http://localhost:8080/actuator/health
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]`,
  },
  {
    id: 98,
    question: "Java のパターンマッチングの進化を説明してください",
    answer: "Java 16: instanceof パターンマッチング（キャスト不要）。Java 17: switch のパターンマッチング（プレビュー）。Java 21: switch パターンマッチング（正式）+ record パターン + ガード付きパターン（when）。sealed class と組み合わせて、全パターンの網羅性をコンパイラが検証できる。将来的に配列パターンや名前付きパターンも検討されている。",
    category: "modern",
    level: "advanced",
    code: `// Java 21: パターンマッチング switch
Object obj = ...;
String result = switch (obj) {
    case Integer i when i > 0 -> "正の整数: " + i;
    case Integer i            -> "整数: " + i;
    case String s             -> "文字列: " + s;
    case null                 -> "null";
    default                   -> "その他: " + obj;
};

// record パターン
record Point(int x, int y) {}
if (obj instanceof Point(int x, int y)) {
    System.out.println(x + ", " + y);
}`,
  },
  {
    id: 99,
    question: "Java のテストピラミッドとテスト戦略を説明してください",
    answer: "テストピラミッドは下から ① 単体テスト（最多、高速、JUnit + Mockito）② 統合テスト（中程度、Spring Boot Test、Testcontainers）③ E2E テスト（最少、低速、Selenium 等）の3層構造。単体テストを厚く、E2E テストを薄くするのが基本。契約テスト（Spring Cloud Contract）でマイクロサービス間のインターフェースを検証する手法もある。",
    category: "testing",
    level: "advanced",
  },
  {
    id: 100,
    question: "Java の将来（Project Loom、Panama、Valhalla）について説明してください",
    answer: "Project Loom: Virtual Threads（Java 21 で正式導入済み）と Structured Concurrency で並行プログラミングを簡素化。Project Panama: JNI を置き換える Foreign Function & Memory API でネイティブコードとの連携を改善（Java 22 で正式導入）。Project Valhalla: Value Types（プリミティブクラス）の導入でメモリ効率とパフォーマンスを向上させる（開発中）。",
    category: "modern",
    level: "advanced",
  },

  // ===== 追加: 例外処理 (101-106) =====
  {
    id: 101,
    question: "try-with-resources の仕組みと AutoCloseable の関係を説明してください",
    answer: "try-with-resources は Java 7 で導入された構文で、AutoCloseable インターフェースを実装したリソースを自動的に close() する。try ブロック終了時（正常終了・例外発生とも）に close() が呼ばれる。複数リソースは宣言の逆順に close される。close() で発生した例外は suppressed exception として元の例外に付与される。",
    category: "exceptions",
    level: "basic",
    code: `// try-with-resources
try (var br = new BufferedReader(new FileReader("data.txt"));
     var bw = new BufferedWriter(new FileWriter("out.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        bw.write(line);
        bw.newLine();
    }
} // bw.close() → br.close() の順に自動実行

// AutoCloseable の実装
public class MyResource implements AutoCloseable {
    @Override
    public void close() {
        System.out.println("リソース解放");
    }
}`,
  },
  {
    id: 102,
    question: "checked 例外と unchecked 例外の設計指針を説明してください",
    answer: "checked 例外（Exception のサブクラス）は呼び出し元に回復処理を強制したい場合に使う（例: IOException、SQLException）。unchecked 例外（RuntimeException のサブクラス）はプログラミングエラーを示す場合に使う（例: NullPointerException、IllegalArgumentException）。現代の設計では、ビジネスロジックの例外は unchecked にし、フレームワーク境界では checked にする傾向がある。Spring は checked 例外を unchecked にラップする設計思想を採用している。",
    category: "exceptions",
    level: "intermediate",
  },
  {
    id: 103,
    question: "例外チェーン（Exception Chaining）とは何ですか？",
    answer: "例外チェーンは、ある例外を別の例外の原因（cause）として保持する仕組み。低レベルの例外をキャッチして、より意味のある高レベルの例外に変換する際に使う。getCause() で元の例外を取得できる。これにより例外の発生原因を辿ることができ、デバッグが容易になる。",
    category: "exceptions",
    level: "intermediate",
    code: `try {
    // DB操作
    connection.executeQuery(sql);
} catch (SQLException e) {
    // 低レベル例外を業務例外にラップ
    throw new UserNotFoundException("ユーザーが見つかりません", e);
}

// カスタム例外クラス
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);  // causeを保持
    }
}`,
  },
  {
    id: 104,
    question: "マルチキャッチと例外の再スローについて説明してください",
    answer: "Java 7 のマルチキャッチでは | で複数の例外型を1つの catch で処理できる。この場合変数は暗黙的に final になる。再スロー（rethrow）では、Java 7 以降 コンパイラが try ブロックで実際にスローされる例外型を追跡し、より精密な型チェックを行う。",
    category: "exceptions",
    level: "intermediate",
    code: `// マルチキャッチ
try {
    // 処理
} catch (IOException | SQLException e) {
    logger.error("入出力またはDB例外", e);
    throw e;  // そのまま再スロー
}

// 精密な再スロー (Java 7+)
public void process() throws IOException, SQLException {
    try {
        riskyOperation();
    } catch (Exception e) {
        logger.error("エラー", e);
        throw e;  // コンパイラはIOException|SQLExceptionと認識
    }
}`,
  },
  {
    id: 105,
    question: "Suppressed Exception とは何ですか？",
    answer: "try-with-resources で、try ブロック内で例外が発生し、さらに close() でも例外が発生した場合、close() の例外は suppressed exception として元の例外に付与される。getSuppressed() で取得可能。これにより両方の例外情報を保持でき、デバッグ時にリソース解放の問題も特定できる。手動で addSuppressed() を呼ぶこともできる。",
    category: "exceptions",
    level: "advanced",
    code: `try (var resource = new MyResource()) {
    throw new RuntimeException("メイン例外");
}
// MyResource.close() が IllegalStateException をスローした場合:
// RuntimeException がスローされ、
// IllegalStateException は suppressed に格納

// suppressed exception の取得
catch (RuntimeException e) {
    System.out.println("メイン: " + e.getMessage());
    for (Throwable suppressed : e.getSuppressed()) {
        System.out.println("Suppressed: " + suppressed.getMessage());
    }
}`,
  },
  {
    id: 106,
    question: "例外処理のアンチパターンを3つ挙げてください",
    answer: "① 例外の握りつぶし: catch ブロックで何もしない。障害の原因究明が不可能になる。② catch (Exception e) の乱用: 全例外を一括キャッチすると、プログラミングエラー（NPE等）まで隠蔽される。③ 例外のフロー制御利用: 例外を通常の制御フロー（ループ脱出等）に使うのはパフォーマンスが悪く可読性も低下する。その他、ログ出力して再スローする二重ログや、不要なラッピングもアンチパターン。",
    category: "exceptions",
    level: "intermediate",
    code: `// ❌ アンチパターン1: 例外の握りつぶし
try {
    riskyOperation();
} catch (Exception e) {
    // 何もしない → 障害が闇に葬られる
}

// ❌ アンチパターン2: 例外によるフロー制御
try {
    int i = 0;
    while (true) {
        array[i++].process();  // ArrayIndexOutOfBoundsで終了
    }
} catch (ArrayIndexOutOfBoundsException e) { }

// ✅ 正しいパターン
for (int i = 0; i < array.length; i++) {
    array[i].process();
}`,
  },

  // ===== 追加: 文字列 (107-113) =====
  {
    id: 107,
    question: "String の不変性（Immutability）が重要な理由を説明してください",
    answer: "① スレッドセーフ: 不変なので同期なしにスレッド間で共有可能。② 文字列プール: 同一内容のリテラルが同じインスタンスを共有でき、メモリ効率が良い。③ セキュリティ: DB接続文字列やパスワードが外部から変更されない。④ ハッシュキャッシュ: hashCode() の計算結果をキャッシュでき、HashMap のキーとして高速。⑤ クラスローディング: クラス名が不変であることで安全にクラスをロードできる。",
    category: "strings",
    level: "basic",
  },
  {
    id: 108,
    question: "String、StringBuilder、StringBuffer の使い分けを説明してください",
    answer: "String は不変で、連結のたびに新しいオブジェクトが生成される。StringBuilder は可変で非同期（スレッドセーフでない）、単一スレッドでの文字列操作に最適。StringBuffer は可変で同期化（スレッドセーフ）だが StringBuilder より遅い。ループ内での文字列連結には StringBuilder を使う。Java のコンパイラは + 演算子を StringBuilder に最適化するが、ループ内では毎回新しい StringBuilder が作られるため明示的に使うべき。",
    category: "strings",
    level: "basic",
    code: `// ❌ 遅い: ループ内で + 演算子
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;  // 毎回新しい String オブジェクト生成
}

// ✅ 速い: StringBuilder
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();

// StringBuffer はマルチスレッド環境で使用
StringBuffer sbuf = new StringBuffer();  // synchronized`,
  },
  {
    id: 109,
    question: "String.intern() の動作とメモリへの影響を説明してください",
    answer: "intern() は文字列プール（String Pool）にその文字列が存在すればその参照を返し、なければプールに追加して返す。Java 7 以降、文字列プールはヒープ上にある（以前は PermGen）。大量の intern() はメモリ圧迫やGC負荷の原因になりうる。定数的に使われる文字列のメモリ最適化に有効だが、乱用は禁物。リテラル文字列は自動的に intern される。",
    category: "strings",
    level: "advanced",
    code: `String s1 = new String("hello");  // ヒープに新規作成
String s2 = s1.intern();           // プールの "hello" を返す
String s3 = "hello";               // プールの "hello" を参照

System.out.println(s1 == s2);  // false
System.out.println(s2 == s3);  // true（同じプール内参照）
System.out.println(s1 == s3);  // false`,
  },
  {
    id: 110,
    question: "Java 11以降で追加された便利な String メソッドを挙げてください",
    answer: "Java 11: isBlank()（空白のみか判定）、strip()（Unicode対応trim）、stripLeading()、stripTrailing()、lines()（行ごとのStream）、repeat(n)。Java 12: indent(n)（インデント調整）、transform()（関数適用）。Java 13: Text Block（\"\"\"...\"\"\"）。Java 15: formatted()（String.format相当）、stripIndent()。これらにより文字列操作がより簡潔になった。",
    category: "strings",
    level: "basic",
    code: `// Java 11
"  hello  ".strip();        // "hello"
"  ".isBlank();             // true
"abc".repeat(3);            // "abcabcabc"
"a\\nb\\nc".lines().count(); // 3

// Java 13: テキストブロック
String json = """
    {
        "name": "Java",
        "version": 21
    }
    """;

// Java 12
"hello".indent(4);          // "    hello\\n"
"hello".transform(s -> s.toUpperCase()); // "HELLO"`,
  },
  {
    id: 111,
    question: "正規表現のパフォーマンス最適化について説明してください",
    answer: "Pattern.compile() は正規表現のコンパイルにコストがかかるため、繰り返し使用する場合は static final でプリコンパイルする。バックトラッキングの多い正規表現（ネストした量指定子）はReDoS脆弱性の原因になる。Possessive quantifier（++, *+）やAtomic group（(?>...)）でバックトラッキングを抑制できる。単純な文字列検索には contains()、startsWith() を使い、正規表現を避ける。",
    category: "strings",
    level: "advanced",
    code: `// ❌ 毎回コンパイル
for (String line : lines) {
    if (line.matches("\\\\d{3}-\\\\d{4}")) { ... }
}

// ✅ プリコンパイル
private static final Pattern ZIP = Pattern.compile("\\\\d{3}-\\\\d{4}");
for (String line : lines) {
    if (ZIP.matcher(line).matches()) { ... }
}

// Possessive quantifier でバックトラック抑制
Pattern safe = Pattern.compile("a{1,10}+b");`,
  },
  {
    id: 112,
    question: "文字エンコーディングと Charset の扱いについて説明してください",
    answer: "Java の char は UTF-16 で、サロゲートペアで BMP 外の文字を表す。String.getBytes() はデフォルトエンコーディング（プラットフォーム依存）を使うため、常に Charset を明示すべき。StandardCharsets.UTF_8 を推奨。Java 18 からデフォルトが UTF-8 に統一された。codePointAt() でサロゲートペアを考慮したコードポイント処理が可能。",
    category: "strings",
    level: "intermediate",
    code: `// ❌ プラットフォーム依存
byte[] bytes = str.getBytes();

// ✅ エンコーディング明示
byte[] bytes = str.getBytes(StandardCharsets.UTF_8);
String s = new String(bytes, StandardCharsets.UTF_8);

// サロゲートペアの扱い
String emoji = "😀";
emoji.length();           // 2（char数、サロゲートペア）
emoji.codePointCount(0, emoji.length()); // 1（実際の文字数）
emoji.codePoints().count(); // 1`,
  },
  {
    id: 113,
    question: "StringJoiner と String.join() の使い方を説明してください",
    answer: "StringJoiner（Java 8）は区切り文字、プレフィックス、サフィックスを指定して文字列を結合する。空の場合のデフォルト値も設定可能。String.join() は StringJoiner の簡易版で、区切り文字と要素を指定する。Collectors.joining() は Stream の終端操作として使う。これらにより、ループ内で区切り文字の判定をする必要がなくなった。",
    category: "strings",
    level: "basic",
    code: `// String.join()
String csv = String.join(", ", "Java", "Python", "Go");
// "Java, Python, Go"

// StringJoiner
StringJoiner sj = new StringJoiner(", ", "[", "]");
sj.add("A").add("B").add("C");
sj.toString();  // "[A, B, C]"

// 空の場合のデフォルト値
StringJoiner empty = new StringJoiner(", ", "[", "]");
empty.setEmptyValue("なし");
empty.toString();  // "なし"

// Collectors.joining()
List.of("a", "b", "c").stream()
    .collect(Collectors.joining(", ", "(", ")"));
// "(a, b, c)"`,
  },

  // ===== 追加: DB (114-120) =====
  {
    id: 114,
    question: "JDBC の基本的な処理フローを説明してください",
    answer: "① DriverManager.getConnection() で接続取得。② Connection から Statement/PreparedStatement を作成。③ executeQuery()（SELECT）または executeUpdate()（INSERT/UPDATE/DELETE）を実行。④ ResultSet から結果を取得。⑤ リソースを close()。現代では try-with-resources で自動 close し、コネクションプール（HikariCP 等）を使う。直接 JDBC を使うより JPA/MyBatis 等の ORM が一般的。",
    category: "db",
    level: "basic",
    code: `// JDBC基本処理
try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement(
         "SELECT name, age FROM users WHERE id = ?")) {
    ps.setLong(1, userId);
    try (ResultSet rs = ps.executeQuery()) {
        if (rs.next()) {
            String name = rs.getString("name");
            int age = rs.getInt("age");
        }
    }
}`,
  },
  {
    id: 115,
    question: "PreparedStatement を使うべき理由は何ですか？",
    answer: "① SQLインジェクション防止: パラメータがエスケープされ、悪意のある入力を無害化。② パフォーマンス: SQL文がプリコンパイルされ、同じ構造のクエリを繰り返し実行する際に高速。③ 型安全性: setInt()、setString() 等で型を明示でき、型変換エラーを防止。④ 可読性: SQL文とパラメータが分離され、コードが読みやすい。Statement は動的 SQL 生成にのみ使い、ユーザー入力を含むクエリには必ず PreparedStatement を使う。",
    category: "db",
    level: "basic",
    code: `// ❌ SQLインジェクション脆弱性
String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
// userInput = "'; DROP TABLE users; --" → テーブル削除

// ✅ PreparedStatement（安全）
PreparedStatement ps = conn.prepareStatement(
    "SELECT * FROM users WHERE name = ?");
ps.setString(1, userInput);  // 自動エスケープ`,
  },
  {
    id: 116,
    question: "JPA と Hibernate の関係を説明してください",
    answer: "JPA（Java Persistence API）は Java EE/Jakarta EE の ORM 標準仕様（インターフェース）。Hibernate は JPA の最も有名な実装（プロバイダ）。JPA はアノテーション（@Entity, @Table, @Id 等）と EntityManager API を定義し、Hibernate がその実装を提供する。EclipseLink も別のJPA実装。Spring Data JPA は JPA をさらに抽象化し、リポジトリパターンでCRUD操作を簡素化する。",
    category: "db",
    level: "intermediate",
    code: `// JPA エンティティ
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;
}

// Spring Data JPA リポジトリ
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
    @Query("SELECT u FROM User u WHERE u.age > :age")
    List<User> findOlderThan(@Param("age") int age);
}`,
  },
  {
    id: 117,
    question: "N+1 問題とその解決策を説明してください",
    answer: "N+1問題は、親エンティティN件を取得した後、各親に対して子エンティティを1件ずつ取得し、計N+1回のクエリが発生する問題。解決策: ① JOIN FETCH: JPQL で関連を一括取得。② @EntityGraph: JPA 2.1のアノテーションで関連のフェッチ方法を指定。③ @BatchSize: Hibernate が IN句でバッチ取得。④ サブセレクト: 関連をサブクエリで一括取得。パフォーマンスに大きく影響するため、必ず対策が必要。",
    category: "db",
    level: "advanced",
    code: `// ❌ N+1問題
List<User> users = em.createQuery("SELECT u FROM User u").getResultList();
for (User u : users) {
    u.getOrders().size();  // 各ユーザーごとに SELECT 発行
}

// ✅ JOIN FETCH で1回のクエリに
List<User> users = em.createQuery(
    "SELECT DISTINCT u FROM User u JOIN FETCH u.orders"
).getResultList();

// ✅ @EntityGraph
@EntityGraph(attributePaths = {"orders"})
List<User> findAll();`,
  },
  {
    id: 118,
    question: "トランザクション分離レベルを説明してください",
    answer: "① READ_UNCOMMITTED: ダーティリード可能。最も低い分離レベル。② READ_COMMITTED: コミット済みデータのみ読取。Oracle、PostgreSQL のデフォルト。③ REPEATABLE_READ: トランザクション中に読んだデータは変わらない。MySQL のデフォルト。④ SERIALIZABLE: 最も厳格。トランザクションが完全に直列化される。分離レベルが高いほどデータ整合性は高まるが、並行性能は低下する。",
    category: "db",
    level: "advanced",
    code: `// Spring での分離レベル指定
@Transactional(isolation = Isolation.READ_COMMITTED)
public void transferMoney(Long from, Long to, BigDecimal amount) {
    Account src = accountRepo.findById(from).orElseThrow();
    Account dst = accountRepo.findById(to).orElseThrow();
    src.debit(amount);
    dst.credit(amount);
}

// 異常現象
// ダーティリード:     未コミットデータの読取
// ノンリピータブルリード: 同一行の再読取で値が変わる
// ファントムリード:   同一条件の再検索で行数が変わる`,
  },
  {
    id: 119,
    question: "コネクションプールの仕組みと HikariCP について説明してください",
    answer: "コネクションプールは事前にDB接続を作成してプールし、再利用する仕組み。接続の作成・破棄コスト（TCP接続、認証等）を削減する。HikariCP は最速のJavaコネクションプールで、Spring Boot のデフォルト。主要設定: maximumPoolSize（最大接続数）、minimumIdle（最小アイドル数）、connectionTimeout（取得タイムアウト）、maxLifetime（接続の最大生存時間）。プールサイズは CPU コア数 × 2 + ディスク数が目安。",
    category: "db",
    level: "intermediate",
    code: `# application.yml (Spring Boot)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    hikari:
      maximum-pool-size: 10
      minimum-idle: 5
      connection-timeout: 30000   # 30秒
      max-lifetime: 1800000       # 30分
      idle-timeout: 600000        # 10分
      leak-detection-threshold: 60000  # リーク検出`,
  },
  {
    id: 120,
    question: "楽観的ロックと悲観的ロックの違いを説明してください",
    answer: "楽観的ロック: 競合は稀だと仮定し、更新時にバージョン番号やタイムスタンプで競合を検出する。JPA の @Version アノテーションで実現。競合時は OptimisticLockException。悲観的ロック: 競合が多い場合に使い、SELECT FOR UPDATE でDBレベルで行をロックする。デッドロックのリスクがある。一般的にはWebアプリでは楽観的ロック、バッチ処理では悲観的ロックが適している。",
    category: "db",
    level: "advanced",
    code: `// 楽観的ロック（JPA @Version）
@Entity
public class Product {
    @Id private Long id;
    @Version private Long version;  // 更新のたびにインクリメント
    private int stock;
}

// 悲観的ロック
@Lock(LockModeType.PESSIMISTIC_WRITE)
@Query("SELECT p FROM Product p WHERE p.id = :id")
Product findByIdForUpdate(@Param("id") Long id);

// 楽観的ロック競合のハンドリング
try {
    productService.updateStock(productId, quantity);
} catch (OptimisticLockException e) {
    // リトライまたはユーザーに通知
}`,
  },

  // ===== 追加: テスト (121-128) =====
  {
    id: 121,
    question: "JUnit 5 のアーキテクチャと主要アノテーションを説明してください",
    answer: "JUnit 5 = JUnit Platform（テスト実行基盤）+ JUnit Jupiter（JUnit 5のAPI）+ JUnit Vintage（JUnit 3/4 互換）。主要アノテーション: @Test、@BeforeEach/@AfterEach（各テスト前後）、@BeforeAll/@AfterAll（クラス前後、static）、@DisplayName（表示名）、@Nested（ネストクラス）、@ParameterizedTest（パラメータ化テスト）、@Tag（タグ付け）、@Disabled（無効化）。",
    category: "testing",
    level: "basic",
    code: `@DisplayName("ユーザーサービスのテスト")
class UserServiceTest {

    @BeforeEach
    void setUp() { /* 各テスト前 */ }

    @Test
    @DisplayName("名前でユーザーを検索できる")
    void findByName() {
        User user = service.findByName("Alice");
        assertNotNull(user);
        assertEquals("Alice", user.getName());
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "  "})
    @DisplayName("空白名は例外")
    void blankNameThrows(String name) {
        assertThrows(IllegalArgumentException.class,
            () -> service.findByName(name));
    }

    @Nested
    @DisplayName("管理者の場合")
    class AdminTests {
        @Test void canDeleteUser() { /* ... */ }
    }
}`,
  },
  {
    id: 122,
    question: "Mockito の基本的な使い方を説明してください",
    answer: "Mockito はモックオブジェクトを作成するフレームワーク。@Mock でモック作成、@InjectMocks でテスト対象にモックを注入。when().thenReturn() でスタブ（戻り値設定）、verify() で呼び出し検証。doThrow() で例外をスロー、ArgumentCaptor で引数キャプチャ。spy() は実オブジェクトの部分モック。モックは外部依存（DB、API等）を分離してユニットテストを可能にする。",
    category: "testing",
    level: "intermediate",
    code: `@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock UserRepository userRepo;
    @Mock EmailService emailService;
    @InjectMocks OrderService orderService;

    @Test
    void placeOrder_sendsEmail() {
        // スタブ設定
        when(userRepo.findById(1L))
            .thenReturn(Optional.of(new User("Alice")));

        orderService.placeOrder(1L, "item-001");

        // 呼び出し検証
        verify(emailService).sendConfirmation(
            eq("Alice"), anyString());
        verify(userRepo, times(1)).findById(1L);
    }
}`,
  },
  {
    id: 123,
    question: "テストダブル（Test Double）の種類を説明してください",
    answer: "① Dummy: 引数を満たすためだけの空オブジェクト。② Stub: 決まった値を返す。テスト対象の間接入力を制御。③ Spy: 実オブジェクトの呼び出しを記録。④ Mock: 呼び出しを検証するオブジェクト。期待する呼び出しを設定し、テスト終了時に検証。⑤ Fake: 簡易的な実装（例: インメモリDB）。Martin Fowler の定義に基づく分類で、Mockito は主に Mock と Spy を提供する。",
    category: "testing",
    level: "intermediate",
  },
  {
    id: 124,
    question: "Spring Boot でのテスト手法を説明してください",
    answer: "@SpringBootTest はアプリケーション全体をロードする統合テスト。@WebMvcTest はControllerレイヤーのみテスト（Service等はモック）。@DataJpaTest はJPAリポジトリのテスト（組み込みDB使用）。@MockBean でSpringコンテキスト内のBeanをモック置換。テストスライスを適切に使い分けることで、テスト速度と網羅性のバランスを取る。",
    category: "testing",
    level: "intermediate",
    code: `// コントローラーテスト
@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean UserService userService;

    @Test
    void getUser_returns200() throws Exception {
        when(userService.findById(1L))
            .thenReturn(new UserDto("Alice"));

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Alice"));
    }
}

// リポジトリテスト
@DataJpaTest
class UserRepositoryTest {
    @Autowired UserRepository repo;

    @Test void findByEmail_returnsUser() {
        repo.save(new User("test@example.com"));
        assertNotNull(repo.findByEmail("test@example.com"));
    }
}`,
  },
  {
    id: 125,
    question: "Testcontainers とは何ですか？",
    answer: "Testcontainers は Docker コンテナを使って統合テスト用の外部サービス（DB、Redis、Kafka 等）を自動起動・停止するライブラリ。@Container でコンテナを宣言し、@Testcontainers で管理。テストごとにクリーンな環境を提供し、H2等の組み込みDBでは再現できないDB固有の動作（PostgreSQLのJSONB等）をテスト可能。CI/CD環境でもDockerがあれば動作する。",
    category: "testing",
    level: "advanced",
    code: `@Testcontainers
@SpringBootTest
class UserIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void configureDB(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void createUser_persistsToPostgres() {
        // 本物のPostgreSQLに対してテスト
    }
}`,
  },
  {
    id: 126,
    question: "テストカバレッジとミューテーションテストについて説明してください",
    answer: "テストカバレッジは行カバレッジ（C0）、分岐カバレッジ（C1）、条件カバレッジ（C2）がある。JaCoCo が Java の標準的なカバレッジ計測ツール。しかし、カバレッジ100%でもバグを検出できないことがある。ミューテーションテストは、コードに意図的な変異（条件反転、定数変更等）を加え、テストがそれを検出できるか検証する。PIT が Java のミューテーションテストツール。",
    category: "testing",
    level: "advanced",
    code: `// build.gradle (JaCoCo + PIT)
plugins {
    id 'jacoco'
    id 'info.solidsoft.pitest' version '1.15.0'
}

jacocoTestReport {
    reports {
        xml.required = true
        html.required = true
    }
}

pitest {
    targetClasses = ['com.example.service.*']
    mutators = ['DEFAULTS']
    outputFormats = ['HTML']
}

// 実行
// ./gradlew jacocoTestReport   # カバレッジ
// ./gradlew pitest             # ミューテーション`,
  },
  {
    id: 127,
    question: "テスト駆動開発（TDD）のサイクルを説明してください",
    answer: "TDD は Red → Green → Refactor の3ステップサイクル。① Red: 失敗するテストを書く。② Green: テストが通る最小限のコードを書く。③ Refactor: テストが通ったまま、コードを改善する。メリット: 設計がテスト可能になる、リグレッション防止、ドキュメント代わり。注意点: 過度なモックは脆いテストになる。BDD（振る舞い駆動）は TDD の発展形で、Given-When-Then で仕様を記述する。",
    category: "testing",
    level: "intermediate",
  },
  {
    id: 128,
    question: "アサーションライブラリ AssertJ の利点を説明してください",
    answer: "AssertJ は流暢な（fluent）アサーション API を提供するライブラリ。JUnit の assertEquals より可読性が高い。メソッドチェーンで複数のアサーションを連続記述でき、コレクション、例外、Optional 等に特化したアサーションが豊富。エラーメッセージも詳細でデバッグしやすい。Spring Boot Test のデフォルト依存に含まれている。",
    category: "testing",
    level: "basic",
    code: `// JUnit
assertEquals("Alice", user.getName());
assertTrue(users.size() >= 3);

// AssertJ（流暢で可読性が高い）
assertThat(user.getName()).isEqualTo("Alice");
assertThat(users)
    .hasSize(5)
    .extracting(User::getName)
    .contains("Alice", "Bob")
    .doesNotContain("Unknown");

// 例外のアサーション
assertThatThrownBy(() -> service.findById(-1L))
    .isInstanceOf(IllegalArgumentException.class)
    .hasMessageContaining("ID");

// Optional
assertThat(optional).isPresent().hasValue("hello");`,
  },

  // ===== 追加: Stream・ラムダ (129-136) =====
  {
    id: 129,
    question: "Stream の中間操作と終端操作の違いを説明してください",
    answer: "中間操作（intermediate）は遅延評価で、Streamを返す。filter()、map()、flatMap()、sorted()、distinct()、peek()、limit()、skip() 等。終端操作（terminal）は即座に実行され、結果を返すとStreamは消費される。collect()、forEach()、reduce()、count()、findFirst()、anyMatch()、toList() 等。中間操作はパイプラインを構築するだけで、終端操作が呼ばれるまで実行されない。",
    category: "streams",
    level: "basic",
    code: `List<String> result = names.stream()
    .filter(name -> name.length() > 3)    // 中間操作
    .map(String::toUpperCase)              // 中間操作
    .sorted()                              // 中間操作
    .distinct()                            // 中間操作
    .collect(Collectors.toList());         // 終端操作（ここで実行）

// 終端操作の種類
long count = stream.count();
Optional<T> first = stream.findFirst();
boolean any = stream.anyMatch(predicate);
T reduced = stream.reduce(identity, accumulator);
stream.forEach(System.out::println);`,
  },
  {
    id: 130,
    question: "Collectors の主要なメソッドを説明してください",
    answer: "toList(), toSet(), toMap(): コレクションに変換。groupingBy(): キーでグルーピング。partitioningBy(): boolean で2分割。joining(): 文字列結合。counting(), summingInt(), averagingDouble(): 集計。toUnmodifiableList(): 不変リスト。collectingAndThen(): コレクタの結果を変換。downstream collector で多段集計も可能。",
    category: "streams",
    level: "intermediate",
    code: `// グルーピング
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

// 多段集計（部署ごとの平均給与）
Map<String, Double> avgSalary = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::getDepartment,
        Collectors.averagingDouble(Employee::getSalary)
    ));

// パーティション
Map<Boolean, List<Integer>> evenOdd = numbers.stream()
    .collect(Collectors.partitioningBy(n -> n % 2 == 0));

// toMap（キー重複時のマージ関数）
Map<String, Integer> nameToAge = people.stream()
    .collect(Collectors.toMap(
        Person::getName,
        Person::getAge,
        (existing, replacement) -> existing  // 重複時は先を優先
    ));`,
  },
  {
    id: 131,
    question: "flatMap() の用途と使い方を説明してください",
    answer: "flatMap() は各要素を Stream に変換し、それらを1つの Stream に平坦化する。入れ子のコレクション（List<List<T>>）をフラットにする場合や、Optional のネストを解消する場合に使う。map() は 1:1 変換だが、flatMap() は 1:N 変換して結果を連結する。",
    category: "streams",
    level: "intermediate",
    code: `// List<List<T>> をフラット化
List<List<String>> nested = List.of(
    List.of("a", "b"),
    List.of("c", "d"),
    List.of("e")
);
List<String> flat = nested.stream()
    .flatMap(Collection::stream)
    .toList();  // [a, b, c, d, e]

// 1行を単語に分割してフラット化
List<String> words = lines.stream()
    .flatMap(line -> Arrays.stream(line.split("\\\\s+")))
    .toList();

// Optional の flatMap
Optional<String> city = user
    .flatMap(User::getAddress)
    .flatMap(Address::getCity);`,
  },
  {
    id: 132,
    question: "parallel Stream の注意点を説明してください",
    answer: "parallelStream() は ForkJoinPool.commonPool() で並列処理する。注意点: ① 副作用のある操作（共有変数の変更）は禁止。② 順序依存の処理には不向き（forEachOrdered で順序保証可）。③ 少量データではオーバーヘッドで逆に遅くなる。④ I/O バウンド処理には不向き（共有プールを占有）。⑤ カスタム ForkJoinPool で分離可能。ベンチマークなしに安易に使わない。",
    category: "streams",
    level: "advanced",
    code: `// ❌ 副作用あり（スレッドセーフでない）
List<String> results = new ArrayList<>();
stream.parallel().forEach(results::add);  // 危険

// ✅ Collectors で安全に収集
List<String> results = stream.parallel()
    .collect(Collectors.toList());

// カスタム ForkJoinPool で分離
ForkJoinPool customPool = new ForkJoinPool(4);
List<Result> results = customPool.submit(() ->
    data.parallelStream()
        .map(this::heavyComputation)
        .toList()
).get();`,
  },
  {
    id: 133,
    question: "関数型インターフェースの種類を説明してください",
    answer: "java.util.function パッケージの主要な関数型インターフェース: Function<T,R>（変換、T→R）、Predicate<T>（判定、T→boolean）、Consumer<T>（消費、T→void）、Supplier<T>（生成、()→T）、BiFunction<T,U,R>（2引数変換）、BiPredicate<T,U>（2引数判定）、UnaryOperator<T>（T→T）、BinaryOperator<T>（(T,T)→T）。プリミティブ特殊化版（IntFunction、ToIntFunction 等）もある。",
    category: "streams",
    level: "basic",
    code: `// Function: 変換
Function<String, Integer> length = String::length;
length.apply("hello");  // 5

// Predicate: 判定
Predicate<String> isLong = s -> s.length() > 5;
isLong.test("hello");  // false
isLong.and(s -> s.startsWith("H"));  // 合成

// Consumer: 消費
Consumer<String> printer = System.out::println;

// Supplier: 生成
Supplier<List<String>> listFactory = ArrayList::new;

// 合成
Function<String, String> upper = String::toUpperCase;
Function<String, String> trim = String::trim;
Function<String, String> trimAndUpper = trim.andThen(upper);`,
  },
  {
    id: 134,
    question: "メソッド参照の4つの形式を説明してください",
    answer: "① 静的メソッド参照: ClassName::staticMethod（例: Integer::parseInt）。② インスタンスメソッド参照（特定オブジェクト）: instance::method（例: System.out::println）。③ インスタンスメソッド参照（任意オブジェクト）: ClassName::method（例: String::length）。④ コンストラクタ参照: ClassName::new（例: ArrayList::new）。ラムダ式の簡潔な代替で、可読性が向上する。",
    category: "streams",
    level: "basic",
    code: `// ① 静的メソッド参照
Function<String, Integer> parse = Integer::parseInt;

// ② 特定インスタンスのメソッド参照
PrintStream out = System.out;
Consumer<String> print = out::println;

// ③ 任意インスタンスのメソッド参照
Function<String, String> upper = String::toUpperCase;
// ラムダ等価: s -> s.toUpperCase()

// ④ コンストラクタ参照
Supplier<List<String>> newList = ArrayList::new;
Function<String, User> createUser = User::new;

// 実践例
List<String> names = users.stream()
    .map(User::getName)        // ③
    .map(String::toUpperCase)  // ③
    .toList();`,
  },
  {
    id: 135,
    question: "Optional の正しい使い方とアンチパターンを説明してください",
    answer: "Optional は値の存在/不在を明示する型で、null を返す代わりにメソッドの戻り値として使う。推奨: orElse()、orElseGet()、orElseThrow()、map()、flatMap()、ifPresent() で処理。アンチパターン: ① フィールドに Optional を使う（シリアライゼーション不可）。② メソッド引数に Optional を使う。③ Optional.get() を isPresent() チェックなしに呼ぶ。④ Optional をコレクション要素に使う。",
    category: "streams",
    level: "intermediate",
    code: `// ✅ 正しい使い方
Optional<User> user = repository.findById(id);

// map でチェーン
String city = user
    .map(User::getAddress)
    .map(Address::getCity)
    .orElse("不明");

// orElseThrow
User u = user.orElseThrow(
    () -> new NotFoundException("User not found"));

// ifPresentOrElse (Java 9+)
user.ifPresentOrElse(
    u -> process(u),
    () -> handleNotFound()
);

// ❌ アンチパターン
if (optional.isPresent()) {
    return optional.get();  // map/orElse を使うべき
}`,
  },
  {
    id: 136,
    question: "Stream.reduce() の使い方を説明してください",
    answer: "reduce() は Stream の要素を1つの値に集約する終端操作。3つの形式: ① reduce(BinaryOperator): Optional を返す。② reduce(identity, BinaryOperator): 初期値あり。③ reduce(identity, BiFunction, BinaryOperator): 並列処理用の combiner 付き。sum、max、min、文字列結合などの集約処理に使う。複雑な集約は Collectors を使った方が読みやすい。",
    category: "streams",
    level: "intermediate",
    code: `// 合計
int sum = numbers.stream()
    .reduce(0, Integer::sum);

// 最大値
Optional<Integer> max = numbers.stream()
    .reduce(Integer::max);

// 文字列結合
String concat = words.stream()
    .reduce("", (a, b) -> a + " " + b);

// 並列処理用（combiner付き）
int total = numbers.parallelStream()
    .reduce(0,
        (subtotal, element) -> subtotal + element,
        Integer::sum  // 部分結果の結合
    );`,
  },

  // ===== 追加: 入出力・ファイル (137-140) =====
  {
    id: 137,
    question: "Java NIO と旧 IO の違いを説明してください",
    answer: "旧IO（java.io）はストリーム指向でブロッキング。NIO（java.nio、Java 1.4）はバッファ指向でノンブロッキングI/O対応。NIO2（Java 7）は Path、Files クラスで簡便なファイル操作、WatchService でファイル監視を追加。主な違い: IO はストリーム（Stream）、NIO はチャネル（Channel）とバッファ（Buffer）。IO はバイト/文字単位、NIO はバッファ単位。NIO は Selector で複数チャネルを1スレッドで管理可能。",
    category: "io",
    level: "intermediate",
    code: `// 旧IO
try (BufferedReader br = new BufferedReader(
        new FileReader("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        process(line);
    }
}

// NIO2 (推奨)
Path path = Path.of("data.txt");
List<String> lines = Files.readAllLines(path);
String content = Files.readString(path);
Stream<String> stream = Files.lines(path);  // 遅延読み込み

// ファイル書き込み
Files.writeString(Path.of("out.txt"), "Hello");
Files.write(Path.of("out.txt"), lines);`,
  },
  {
    id: 138,
    question: "シリアライゼーション（直列化）の仕組みと注意点を説明してください",
    answer: "シリアライゼーションはオブジェクトをバイトストリームに変換すること。Serializable インターフェースを実装し、ObjectOutputStream/ObjectInputStream で入出力。serialVersionUID でバージョン管理。注意点: ① セキュリティリスク（デシリアライゼーション攻撃）。② transient フィールドは除外。③ 継承時の挙動が複雑。現代では JSON（Jackson、Gson）による直列化が主流で、Java のシリアライゼーションは避けるべきとされる。",
    category: "io",
    level: "intermediate",
    code: `// Serializable の実装
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password;  // 直列化から除外
}

// 直列化
try (var oos = new ObjectOutputStream(
        new FileOutputStream("user.ser"))) {
    oos.writeObject(user);
}

// 復元
try (var ois = new ObjectInputStream(
        new FileInputStream("user.ser"))) {
    User user = (User) ois.readObject();
}

// ✅ 現代的な方法: JSON (Jackson)
ObjectMapper mapper = new ObjectMapper();
String json = mapper.writeValueAsString(user);
User user = mapper.readValue(json, User.class);`,
  },
  {
    id: 139,
    question: "Files クラスの便利なメソッドを挙げてください",
    answer: "Java 7+: readAllBytes()、readAllLines()、write()、copy()、move()、delete()、createDirectories()、newBufferedReader()、walk()（ディレクトリ再帰走査）、find()。Java 11+: readString()、writeString()。Java 12+: mismatch()（ファイル比較）。これらは旧IO のストリーム構築を不要にし、1行でファイル操作を完結できる。大きなファイルには lines() で遅延読み込みを使う。",
    category: "io",
    level: "basic",
    code: `// ファイル読み込み
String content = Files.readString(Path.of("file.txt"));
List<String> lines = Files.readAllLines(Path.of("file.txt"));
byte[] bytes = Files.readAllBytes(Path.of("image.png"));

// ファイル書き込み
Files.writeString(Path.of("out.txt"), "Hello World");
Files.write(Path.of("data.csv"), lines);

// コピー・移動・削除
Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
Files.move(source, target, StandardCopyOption.ATOMIC_MOVE);
Files.deleteIfExists(Path.of("temp.txt"));

// ディレクトリ走査
try (Stream<Path> paths = Files.walk(Path.of("src"))) {
    paths.filter(p -> p.toString().endsWith(".java"))
         .forEach(System.out::println);
}`,
  },
  {
    id: 140,
    question: "バイトストリームと文字ストリームの違いは？",
    answer: "バイトストリーム（InputStream/OutputStream）は生のバイトデータ（画像、音声等）を扱う。文字ストリーム（Reader/Writer）はテキストデータを文字エンコーディングを考慮して扱う。InputStreamReader/OutputStreamWriter がバイトと文字の橋渡し。BufferedInputStream/BufferedReader でバッファリングにより性能向上。文字データには必ず文字ストリームを使い、エンコーディングを明示する。",
    category: "io",
    level: "basic",
    code: `// バイトストリーム（画像等）
try (InputStream is = new FileInputStream("image.png");
     OutputStream os = new FileOutputStream("copy.png")) {
    is.transferTo(os);  // Java 9+
}

// 文字ストリーム（テキスト）
try (Reader r = new BufferedReader(
        new InputStreamReader(
            new FileInputStream("data.txt"),
            StandardCharsets.UTF_8));
     Writer w = new BufferedWriter(
        new OutputStreamWriter(
            new FileOutputStream("out.txt"),
            StandardCharsets.UTF_8))) {
    // 読み書き
}`,
  },
  // ===== ネットワーク・API (141-148) =====
  {
    id: 141,
    question: "JavaでHTTP通信を行う方法を比較してください（HttpClient, RestTemplate, WebClient）",
    answer: "Java 11 標準の HttpClient は非同期対応でモダンな API を提供する。Spring の RestTemplate は同期的で直感的だが、Spring 5 以降は非推奨となりメンテナンスモードに移行した。WebClient はリアクティブ対応の非ブロッキングクライアントで、Mono/Flux を返す。新規プロジェクトでは WebClient または HttpClient の使用が推奨される。",
    category: "network",
    level: "intermediate",
    code: `// Java 11 HttpClient
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .GET()
    .build();
HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

// Spring RestTemplate
RestTemplate rest = new RestTemplate();
User user = rest.getForObject("/api/users/1", User.class);

// Spring WebClient
WebClient webClient = WebClient.create("https://api.example.com");
Mono<User> userMono = webClient.get()
    .uri("/users/{id}", 1)
    .retrieve()
    .bodyToMono(User.class);`,
  },
  {
    id: 142,
    question: "REST API設計のベストプラクティスを説明してください",
    answer: "REST API ではリソース指向の URI 設計（名詞を使い、複数形にする）、適切な HTTP メソッドの使い分け（GET=取得、POST=作成、PUT=更新、DELETE=削除）が基本となる。バージョニング、ページネーション、HATEOAS、一貫性のあるエラーレスポンス形式も重要である。また、べき等性の保証やステータスコードの正しい使用、リクエスト/レスポンスの JSON フォーマット統一も求められる。",
    category: "network",
    level: "intermediate",
  },
  {
    id: 143,
    question: "JavaでWebSocketを使う方法を説明してください",
    answer: "WebSocket は HTTP とは異なり、サーバーとクライアント間で双方向のリアルタイム通信を実現するプロトコルである。Spring では @EnableWebSocket アノテーションと WebSocketHandler の実装で簡単にサーバー側を構築できる。STOMP プロトコルと SockJS を組み合わせることで、メッセージブローカーを介したより高レベルなメッセージングも可能になる。",
    category: "network",
    level: "advanced",
    code: `// Spring WebSocket 設定
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws").withSockJS();
    }
}

// メッセージ送信コントローラー
@Controller
public class ChatController {
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public ChatMessage send(ChatMessage message) {
        return message;
    }
}`,
  },
  {
    id: 144,
    question: "Javaのソケットプログラミングの基礎を説明してください",
    answer: "Java ではjava.net.Socket（クライアント側）と java.net.ServerSocket（サーバー側）を使って TCP ソケット通信を行う。ServerSocket は指定ポートで接続を待ち受け、accept() でクライアント接続を受け付ける。InputStream/OutputStream を使ってデータの読み書きを行い、通信後は必ずソケットを閉じる必要がある。",
    category: "network",
    level: "basic",
    code: `// サーバー側
try (ServerSocket server = new ServerSocket(8080)) {
    System.out.println("サーバー起動: ポート 8080");
    Socket client = server.accept();
    BufferedReader in = new BufferedReader(
        new InputStreamReader(client.getInputStream()));
    PrintWriter out = new PrintWriter(
        client.getOutputStream(), true);
    String message = in.readLine();
    out.println("受信: " + message);
}

// クライアント側
try (Socket socket = new Socket("localhost", 8080)) {
    PrintWriter out = new PrintWriter(
        socket.getOutputStream(), true);
    BufferedReader in = new BufferedReader(
        new InputStreamReader(socket.getInputStream()));
    out.println("Hello Server!");
    System.out.println(in.readLine());
}`,
  },
  {
    id: 145,
    question: "gRPCとProtocol Buffersについて説明してください",
    answer: "gRPC は Google が開発した高性能な RPC フレームワークで、Protocol Buffers（protobuf）をインターフェース定義言語として使用する。HTTP/2 ベースで双方向ストリーミングをサポートし、REST に比べてバイナリ形式のため高速である。マイクロサービス間通信に適しており、Java では protobuf プラグインでスタブコードを自動生成できる。",
    category: "network",
    level: "advanced",
    code: `// user.proto（Protocol Buffers 定義）
syntax = "proto3";
service UserService {
    rpc GetUser (UserRequest) returns (UserResponse);
    rpc ListUsers (Empty) returns (stream UserResponse);
}
message UserRequest {
    int64 id = 1;
}
message UserResponse {
    int64 id = 1;
    string name = 2;
    string email = 3;
}

// Java サーバー実装
public class UserServiceImpl extends UserServiceGrpc.UserServiceImplBase {
    @Override
    public void getUser(UserRequest req,
            StreamObserver<UserResponse> responseObserver) {
        UserResponse response = UserResponse.newBuilder()
            .setId(req.getId())
            .setName("Taro")
            .setEmail("taro@example.com")
            .build();
        responseObserver.onNext(response);
        responseObserver.onCompleted();
    }
}`,
  },
  {
    id: 146,
    question: "HTTPステータスコードの使い分けを説明してください",
    answer: "1xx は情報レスポンス、2xx は成功（200 OK、201 Created、204 No Content）、3xx はリダイレクト（301 永久移動、304 未変更）を示す。4xx はクライアントエラー（400 Bad Request、401 Unauthorized、403 Forbidden、404 Not Found、409 Conflict、422 Unprocessable Entity）、5xx はサーバーエラー（500 Internal Server Error、502 Bad Gateway、503 Service Unavailable）を示す。適切なステータスコードを返すことで、クライアントが正しくエラーハンドリングできる。",
    category: "network",
    level: "basic",
  },
  {
    id: 147,
    question: "APIバージョニング戦略を説明してください",
    answer: "API バージョニングには主に4つの方式がある。① URI パス方式（/api/v1/users）: 最も一般的で分かりやすい。② クエリパラメータ方式（/api/users?version=1）: URL が見やすいが見落とされやすい。③ ヘッダー方式（Accept: application/vnd.api.v1+json）: URL がクリーンだが実装が複雑。④ コンテンツネゴシエーション方式: Media Type で指定する。一般的には URI パス方式が推奨され、後方互換性を保ちながら段階的に移行するのがベストプラクティスである。",
    category: "network",
    level: "intermediate",
  },
  {
    id: 148,
    question: "レート制限の実装方法を説明してください",
    answer: "レート制限はAPI の過負荷を防ぐ仕組みで、トークンバケットアルゴリズムやスライディングウィンドウアルゴリズムで実装される。Spring では Filter やインターセプターで実装でき、Redis を使った分散レート制限も一般的である。レスポンスヘッダー（X-RateLimit-Limit、X-RateLimit-Remaining、Retry-After）で残りリクエスト数をクライアントに通知する。",
    category: "network",
    level: "advanced",
    code: `// Bucket4j を使ったレート制限の例
@Component
public class RateLimitFilter extends OncePerRequestFilter {
    private final Map<String, Bucket> buckets =
        new ConcurrentHashMap<>();

    private Bucket createBucket() {
        return Bucket.builder()
            .addLimit(Bandwidth.classic(
                10, Refill.greedy(10, Duration.ofMinutes(1))))
            .build();
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws ServletException, IOException {
        String ip = request.getRemoteAddr();
        Bucket bucket = buckets.computeIfAbsent(ip,
            k -> createBucket());
        if (bucket.tryConsume(1)) {
            chain.doFilter(request, response);
        } else {
            response.setStatus(429);
            response.getWriter().write("Too Many Requests");
        }
    }
}`,
  },
  // ===== セキュリティ (149-155) =====
  {
    id: 149,
    question: "Javaのセキュリティマネージャの役割を説明してください",
    answer: "SecurityManager は Java アプリケーションのサンドボックスを制御し、ファイルアクセス・ネットワーク接続・クラスロードなどの操作に対してポリシーベースのアクセス制御を行っていた。java.policy ファイルで権限を定義し、checkPermission() で操作の許可・拒否を判定していた。ただし Java 17 で非推奨となり、Java 24 で削除された。現在はコンテナやOSレベルのセキュリティ機構を代替として使用することが推奨される。",
    category: "security",
    level: "intermediate",
  },
  {
    id: 150,
    question: "Javaでの暗号化（対称・非対称）の実装方法を説明してください",
    answer: "対称鍵暗号（AES）は同一の鍵で暗号化・復号を行い、高速だが鍵の共有が課題となる。非対称鍵暗号（RSA）は公開鍵で暗号化し秘密鍵で復号する方式で、鍵交換が安全だが低速である。Java では javax.crypto パッケージの Cipher クラスで両方の暗号方式を実装でき、実際のシステムでは両者を組み合わせた ハイブリッド暗号方式が一般的である。",
    category: "security",
    level: "advanced",
    code: `// AES 対称鍵暗号
KeyGenerator keyGen = KeyGenerator.getInstance("AES");
keyGen.init(256);
SecretKey secretKey = keyGen.generateKey();

Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
GCMParameterSpec spec = new GCMParameterSpec(128, iv);
cipher.init(Cipher.ENCRYPT_MODE, secretKey, spec);
byte[] encrypted = cipher.doFinal(plainText.getBytes());

// RSA 非対称鍵暗号
KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
kpg.initialize(2048);
KeyPair keyPair = kpg.generateKeyPair();

Cipher rsaCipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
rsaCipher.init(Cipher.ENCRYPT_MODE, keyPair.getPublic());
byte[] rsaEncrypted = rsaCipher.doFinal(data);`,
  },
  {
    id: 151,
    question: "ハッシュ化とソルトの仕組みを説明してください",
    answer: "ハッシュ化は元データから固定長のダイジェストを生成する一方向関数で、パスワード保存に使われる。ソルトはハッシュ化前にパスワードに付加するランダムな値で、レインボーテーブル攻撃を防ぐ。Java では MessageDigest（SHA-256 等）や bcrypt/scrypt/Argon2 などの専用アルゴリズムが利用でき、パスワード保存には BCrypt のようなストレッチング付きアルゴリズムが推奨される。",
    category: "security",
    level: "intermediate",
    code: `// MessageDigest でのハッシュ化（ソルト付き）
SecureRandom random = new SecureRandom();
byte[] salt = new byte[16];
random.nextBytes(salt);

MessageDigest md = MessageDigest.getInstance("SHA-256");
md.update(salt);
byte[] hashed = md.digest(password.getBytes(StandardCharsets.UTF_8));
String encoded = Base64.getEncoder().encodeToString(hashed);

// BCrypt を使ったパスワードハッシュ化（推奨）
// Spring Security の BCryptPasswordEncoder
BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
String hashedPassword = encoder.encode("myPassword");
boolean matches = encoder.matches("myPassword", hashedPassword);`,
  },
  {
    id: 152,
    question: "SQLインジェクション対策を説明してください",
    answer: "SQL インジェクションは、ユーザー入力を直接 SQL 文に埋め込むことで不正な SQL を実行させる攻撃である。対策として PreparedStatement のパラメータバインド（プレースホルダ）が最も基本的で効果的であり、JPA/Hibernate などの ORM フレームワークも内部でパラメータバインドを使用している。入力値のバリデーションや最小権限のデータベースユーザー使用も併せて実施すべきである。",
    category: "security",
    level: "basic",
    code: `// NG: SQLインジェクションの脆弱性あり
String query = "SELECT * FROM users WHERE name = '" + input + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(query);
// input が「' OR '1'='1」なら全レコードが取得される

// OK: PreparedStatement でパラメータバインド
String query = "SELECT * FROM users WHERE name = ? AND age > ?";
PreparedStatement pstmt = conn.prepareStatement(query);
pstmt.setString(1, input);  // 安全にエスケープされる
pstmt.setInt(2, 18);
ResultSet rs = pstmt.executeQuery();

// OK: Spring Data JPA（内部でパラメータバインド）
@Query("SELECT u FROM User u WHERE u.name = :name")
List<User> findByName(@Param("name") String name);`,
  },
  {
    id: 153,
    question: "XSS対策とCSRF対策について説明してください",
    answer: "XSS（クロスサイトスクリプティング）は悪意のあるスクリプトをWebページに挿入する攻撃で、出力時の HTML エスケープ、Content-Security-Policy ヘッダーの設定、入力値のサニタイズで対策する。CSRF（クロスサイトリクエストフォージェリ）は正規ユーザーのセッションを利用して不正なリクエストを送信する攻撃で、CSRF トークンの検証、SameSite Cookie 属性の設定で防御する。Spring Security はデフォルトで CSRF 保護を有効にしている。",
    category: "security",
    level: "intermediate",
  },
  {
    id: 154,
    question: "Spring Securityの認証・認可の仕組みを説明してください",
    answer: "Spring Security は FilterChain ベースのセキュリティフレームワークで、認証（Authentication）はユーザーの身元確認、認可（Authorization）はリソースへのアクセス権の制御を行う。SecurityFilterChain で HTTP セキュリティ設定を行い、UserDetailsService でユーザー情報をロードする。@PreAuthorize や hasRole() などのアノテーション・メソッドでメソッドレベルの認可制御も可能である。",
    category: "security",
    level: "intermediate",
    code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .formLogin(form -> form
                .loginPage("/login").permitAll())
            .oauth2Login(Customizer.withDefaults())
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

// メソッドレベル認可
@PreAuthorize("hasRole('ADMIN') or #userId == principal.id")
public User getUser(Long userId) { ... }`,
  },
  {
    id: 155,
    question: "JWTの仕組みと実装方法を説明してください",
    answer: "JWT（JSON Web Token）はヘッダー、ペイロード、署名の3パートで構成されるトークン形式で、ステートレスな認証に使われる。ヘッダーにアルゴリズム、ペイロードにクレーム（ユーザー情報、有効期限等）、署名に改ざん検知用のハッシュが含まれる。サーバー側でセッションを持たないため水平スケーリングしやすいが、トークンの失効管理やサイズ、セキュアな保存が課題となる。",
    category: "security",
    level: "advanced",
    code: `// jjwt ライブラリを使った JWT の生成と検証
// トークン生成
String token = Jwts.builder()
    .setSubject(user.getUsername())
    .claim("roles", user.getRoles())
    .setIssuedAt(new Date())
    .setExpiration(new Date(System.currentTimeMillis()
        + 86400000)) // 24時間
    .signWith(secretKey, SignatureAlgorithm.HS256)
    .compact();

// トークン検証
Claims claims = Jwts.parserBuilder()
    .setSigningKey(secretKey)
    .build()
    .parseClaimsJws(token)
    .getBody();
String username = claims.getSubject();
Date expiration = claims.getExpiration();

// Spring Security フィルターでの利用
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            // トークン検証 → SecurityContext に設定
        }
        chain.doFilter(request, response);
    }
}`,
  },
  // ===== ビルド・ツール (156-161) =====
  {
    id: 156,
    question: "MavenとGradleの違いを説明してください",
    answer: "Maven は XML ベース（pom.xml）で設定より規約（Convention over Configuration）のアプローチを取り、ライフサイクルが固定的で学習しやすい。Gradle は Groovy/Kotlin DSL ベース（build.gradle）で柔軟なビルドスクリプトが書け、インクリメンタルビルドやビルドキャッシュにより大規模プロジェクトで高速に動作する。新規プロジェクトでは Gradle が選ばれることが多いが、Maven も依然として広く使われている。",
    category: "build",
    level: "basic",
  },
  {
    id: 157,
    question: "Gradleのビルドスクリプト構成を説明してください",
    answer: "Gradle のビルドスクリプトは build.gradle（Groovy）または build.gradle.kts（Kotlin DSL）で記述する。plugins ブロックでプラグイン適用、dependencies ブロックで依存関係を定義し、implementation/api/testImplementation などのスコープで依存の可視性を制御する。settings.gradle でマルチプロジェクト構成を定義し、gradle.properties でプロジェクトプロパティを管理する。",
    category: "build",
    level: "intermediate",
    code: `// build.gradle.kts (Kotlin DSL)
plugins {
    java
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "com.example"
version = "1.0.0"

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.test {
    useJUnitPlatform()
}`,
  },
  {
    id: 158,
    question: "依存関係管理とバージョン競合の解決方法を説明してください",
    answer: "依存関係の推移的解決により、異なるバージョンの同一ライブラリが競合することがある（Jar Hell）。Maven では dependencyManagement で統一バージョンを指定し、exclusion で不要な推移的依存を除外する。Gradle では resolutionStrategy で強制バージョンを指定でき、strictly で厳密なバージョン制約を設定できる。dependency:tree や dependencies タスクで依存関係ツリーを確認することが問題解決の第一歩である。",
    category: "build",
    level: "intermediate",
  },
  {
    id: 159,
    question: "マルチモジュールプロジェクトの構成方法を説明してください",
    answer: "マルチモジュールプロジェクトは、関連する複数のサブプロジェクトを1つのルートプロジェクトで管理する構成で、コードの再利用や関心の分離を実現する。Gradle では settings.gradle に include でサブプロジェクトを列挙し、各モジュールに独立した build.gradle を配置する。共通設定は allprojects/subprojects ブロックやプラグインで共有し、モジュール間の依存は project(\":module-name\") で参照する。",
    category: "build",
    level: "advanced",
    code: `// settings.gradle.kts
rootProject.name = "my-app"
include("domain", "api", "infrastructure", "common")

// ルートの build.gradle.kts
subprojects {
    apply(plugin = "java")
    repositories { mavenCentral() }
    java { sourceCompatibility = JavaVersion.VERSION_21 }
}

// api/build.gradle.kts
plugins {
    id("org.springframework.boot")
}
dependencies {
    implementation(project(":domain"))
    implementation(project(":infrastructure"))
    implementation("org.springframework.boot:spring-boot-starter-web")
}

// domain/build.gradle.kts（純粋なJava）
dependencies {
    // フレームワーク依存なし
}`,
  },
  {
    id: 160,
    question: "GitHub ActionsでJavaプロジェクトのCIパイプラインを構築する方法を説明してください",
    answer: "GitHub Actions は .github/workflows ディレクトリに YAML ファイルを配置してワークフローを定義する。Java プロジェクトでは setup-java アクションで JDK を設定し、Gradle/Maven でビルド・テストを実行する。テスト結果やカバレッジレポートのアップロード、Docker イメージのビルドとプッシュ、デプロイまでを自動化できる。キャッシュの活用により CI の実行時間を短縮することも重要である。",
    category: "build",
    level: "intermediate",
    code: `# .github/workflows/ci.yml
name: Java CI
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '21'
      - uses: gradle/actions/setup-gradle@v3
      - run: ./gradlew build
      - run: ./gradlew test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-report
          path: build/reports/tests/`,
  },
  {
    id: 161,
    question: "Dockerでのマルチステージビルドについて説明してください",
    answer: "マルチステージビルドは1つの Dockerfile に複数の FROM ステージを定義し、ビルド環境と実行環境を分離する手法である。ビルドステージで JDK とビルドツール（Gradle/Maven）を使ってアプリをコンパイルし、実行ステージでは JRE のみの軽量イメージに成果物だけをコピーする。これによりイメージサイズの削減、攻撃対象の最小化、ビルドの再現性が向上する。",
    category: "build",
    level: "intermediate",
    code: `# Dockerfile（マルチステージビルド）
# ステージ1: ビルド
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY gradle/ gradle/
COPY gradlew build.gradle.kts settings.gradle.kts ./
RUN ./gradlew dependencies --no-daemon
COPY src/ src/
RUN ./gradlew bootJar --no-daemon

# ステージ2: 実行
FROM eclipse-temurin:21-jre-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s CMD wget -q --spider \\
  http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]`,
  },
  // ===== パフォーマンス (162-168) =====
  {
    id: 162,
    question: "JVMのチューニングパラメータについて説明してください",
    answer: "JVM チューニングではヒープサイズ（-Xms/-Xmx）、GC アルゴリズムの選択、メタスペースサイズなどを調整する。コンテナ環境では -XX:MaxRAMPercentage で相対指定し、GC ログ（-Xlog:gc*）でパフォーマンスを分析する。チューニングは計測→ボトルネック特定→調整→再計測のサイクルで行い、まずアプリケーションコードの最適化を優先すべきである。",
    category: "performance",
    level: "advanced",
    code: `# 本番環境向け JVM オプション例
java \\
  -Xms2g -Xmx2g \\               # ヒープサイズ固定
  -XX:+UseG1GC \\                 # G1 GC を使用
  -XX:MaxGCPauseMillis=200 \\     # GC 停止時間の目標
  -XX:+UseStringDeduplication \\  # 文字列重複排除
  -XX:MetaspaceSize=256m \\       # メタスペース初期値
  -Xlog:gc*:file=gc.log:time \\  # GC ログ出力
  -XX:+HeapDumpOnOutOfMemoryError \\
  -XX:HeapDumpPath=/tmp/heapdump.hprof \\
  -jar app.jar

# コンテナ環境向け
java \\
  -XX:MaxRAMPercentage=75.0 \\   # コンテナメモリの75%
  -XX:+UseZGC \\                  # 低レイテンシ GC
  -jar app.jar`,
  },
  {
    id: 163,
    question: "Javaのプロファイリングツールの使い方を説明してください",
    answer: "Java のプロファイリングツールには、JDK 付属の JFR（Java Flight Recorder）と JMC（Java Mission Control）、VisualVM、async-profiler などがある。JFR は低オーバーヘッドで本番環境でも使用でき、CPU 使用率、メモリ割当て、ロック競合、I/O 待ちなどを記録する。プロファイリングの手順は、まず CPU プロファイルでホットスポットを特定し、次にメモリプロファイルでアロケーション量の多い箇所を調べ、最後にスレッドダンプでロック競合を分析する。",
    category: "performance",
    level: "intermediate",
  },
  {
    id: 164,
    question: "メモリリークの検出と対処方法を説明してください",
    answer: "Java のメモリリークは、不要なオブジェクトへの参照が残り続けることで GC が回収できなくなる状態である。典型的な原因は、static コレクションへの無限追加、リスナーの未解除、クローズされないリソース、ClassLoader リークなどがある。ヒープダンプ（jmap -dump）を MAT や VisualVM で分析し、支配ツリーや参照チェーンからリーク箇所を特定する。",
    category: "performance",
    level: "advanced",
    code: `// メモリリークの典型例と対策

// NG: static なコレクションにオブジェクトを追加し続ける
public class CacheManager {
    private static final Map<String, Object> cache =
        new HashMap<>(); // 際限なく増加
    public static void put(String key, Object value) {
        cache.put(key, value); // 削除されない
    }
}

// OK: サイズ制限付きキャッシュを使用
public class CacheManager {
    private static final Map<String, Object> cache =
        new LinkedHashMap<>(100, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(
                    Map.Entry<String, Object> eldest) {
                return size() > 1000; // 最大1000件
            }
        };
}

// ヒープダンプの取得
// jmap -dump:live,format=b,file=heap.hprof <PID>
// jcmd <PID> GC.heap_dump heap.hprof`,
  },
  {
    id: 165,
    question: "データベースクエリの最適化方法を説明してください",
    answer: "クエリ最適化では、まず EXPLAIN/EXPLAIN ANALYZE で実行計画を確認し、フルテーブルスキャンが発生していないか確認する。適切なインデックスの作成、N+1 問題の解決（JOIN FETCH やバッチサイズ設定）、不要なカラムの取得回避（SELECT * を避ける）が基本である。JPA では @EntityGraph やプロジェクション、ネイティブクエリの活用も検討し、クエリキャッシュやコネクションプーリング（HikariCP）の設定も重要である。",
    category: "performance",
    level: "intermediate",
  },
  {
    id: 166,
    question: "キャッシュ戦略（Redis、Caffeine）を説明してください",
    answer: "キャッシュはデータアクセスの高速化に有効で、ローカルキャッシュ（Caffeine）と分散キャッシュ（Redis）を使い分ける。Caffeine は JVM 内で動作し超高速だがプロセス間共有ができず、Redis はネットワーク越しだが複数サーバーで共有可能である。Spring Cache の @Cacheable アノテーションで透過的にキャッシュを適用でき、TTL や最大サイズの設定、キャッシュ無効化戦略（Write-Through、Cache-Aside 等）を適切に選択する必要がある。",
    category: "performance",
    level: "intermediate",
    code: `// Spring Cache + Caffeine
@Configuration
@EnableCaching
public class CacheConfig {
    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager manager = new CaffeineCacheManager();
        manager.setCaffeine(Caffeine.newBuilder()
            .maximumSize(10_000)
            .expireAfterWrite(Duration.ofMinutes(10))
            .recordStats());
        return manager;
    }
}

// キャッシュの利用
@Service
public class UserService {
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @CacheEvict(value = "users", key = "#user.id")
    public User update(User user) {
        return userRepository.save(user);
    }

    @CacheEvict(value = "users", allEntries = true)
    public void clearCache() {}
}`,
  },
  {
    id: 167,
    question: "非同期処理とリアクティブプログラミングの違いを説明してください",
    answer: "非同期処理（CompletableFuture、@Async）はタスクを別スレッドで実行し、結果を後で受け取る仕組みで、スレッドプールで管理される。リアクティブプログラミング（Project Reactor、RxJava）はデータストリームを宣言的に処理し、バックプレッシャーで流量制御を行う。リアクティブは少数のスレッドで大量の並行処理を効率的にさばけるが、デバッグが難しくスタックトレースが追いにくいため、要件に応じた使い分けが重要である。",
    category: "performance",
    level: "advanced",
    code: `// CompletableFuture による非同期処理
CompletableFuture<User> userFuture =
    CompletableFuture.supplyAsync(() -> userService.findById(1L));
CompletableFuture<List<Order>> ordersFuture =
    CompletableFuture.supplyAsync(() -> orderService.findByUserId(1L));

// 両方の結果を合成
CompletableFuture<UserProfile> profile = userFuture
    .thenCombine(ordersFuture, (user, orders) ->
        new UserProfile(user, orders));

// Project Reactor によるリアクティブ処理
Mono<User> userMono = userRepository.findById(1L);
Flux<Order> ordersFlux = orderRepository.findByUserId(1L);

Mono<UserProfile> profileMono = userMono
    .zipWith(ordersFlux.collectList())
    .map(tuple -> new UserProfile(tuple.getT1(), tuple.getT2()))
    .onErrorResume(e -> Mono.just(UserProfile.empty()))
    .timeout(Duration.ofSeconds(5));`,
  },
  {
    id: 168,
    question: "JMHによるマイクロベンチマークの方法を説明してください",
    answer: "JMH（Java Microbenchmark Harness）は OpenJDK が提供するベンチマークフレームワークで、JIT コンパイル、ウォームアップ、デッドコード除去などの JVM の最適化を考慮した正確な計測ができる。@Benchmark アノテーションでベンチマークメソッドを定義し、@State でベンチマーク状態を管理する。@Warmup と @Measurement でウォームアップ回数と計測回数を設定し、@BenchmarkMode で計測モード（スループット、平均時間等）を指定する。",
    category: "performance",
    level: "advanced",
    code: `@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 5, time = 1)
@Fork(1)
@State(Scope.Benchmark)
public class StringBenchmark {

    @Param({"10", "100", "1000"})
    private int size;

    @Benchmark
    public String concatWithPlus() {
        String result = "";
        for (int i = 0; i < size; i++) {
            result += "a";
        }
        return result;
    }

    @Benchmark
    public String concatWithBuilder() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < size; i++) {
            sb.append("a");
        }
        return sb.toString();
    }

    public static void main(String[] args) throws Exception {
        Options opt = new OptionsBuilder()
            .include(StringBenchmark.class.getSimpleName())
            .build();
        new Runner(opt).run();
    }
}`,
  },
  // ===== 追加のコレクション (169-176) =====
  {
    id: 169,
    question: "ConcurrentHashMapの内部実装を説明してください",
    answer: "ConcurrentHashMap は Java 8 以降、CAS（Compare-And-Swap）操作とバケット単位の synchronized ロックで高い並行性を実現している。従来の Hashtable のようなマップ全体のロックではなく、各バケットの先頭ノードのみをロックするため、異なるバケットへの同時アクセスが可能である。バケットの要素数が閾値を超えると赤黒木に変換され、最悪ケースの検索時間が O(n) から O(log n) に改善される。",
    category: "collections",
    level: "advanced",
    code: `ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<>();

// アトミックな操作
map.putIfAbsent("key", 0);
map.compute("key", (k, v) -> v == null ? 1 : v + 1);
map.merge("key", 1, Integer::sum);

// 並列バルク操作（parallelismThreshold）
map.forEach(2, (key, value) ->
    System.out.println(key + ": " + value));

long sum = map.reduceValues(2, Long::sum);

// 注意: size() は概算値
// 正確なサイズが必要なら mappingCount() を使用
long count = map.mappingCount();

// NG: check-then-act はスレッドセーフではない
if (!map.containsKey("key")) { // 別スレッドが割り込む可能性
    map.put("key", value);
}
// OK: putIfAbsent を使う
map.putIfAbsent("key", value);`,
  },
  {
    id: 170,
    question: "TreeMapとLinkedHashMapの使い分けを説明してください",
    answer: "TreeMap は赤黒木ベースで要素をキーの自然順序（または Comparator）でソートして格納し、範囲検索や最小・最大の取得が O(log n) で可能である。LinkedHashMap は挿入順序（またはアクセス順序）を保持するハッシュマップで、イテレーション順が予測可能で LRU キャッシュの実装にも使われる。HashMap は順序を保証しないが最も高速（O(1)）で、用途に応じて使い分けることが重要である。",
    category: "collections",
    level: "intermediate",
    code: `// TreeMap: ソート済み
TreeMap<String, Integer> treeMap = new TreeMap<>();
treeMap.put("banana", 2);
treeMap.put("apple", 1);
treeMap.put("cherry", 3);
System.out.println(treeMap.firstKey()); // "apple"
System.out.println(treeMap.lastKey());  // "cherry"
// 範囲検索
SortedMap<String, Integer> sub =
    treeMap.subMap("apple", "cherry"); // apple, banana

// LinkedHashMap: 挿入順序を保持
LinkedHashMap<String, Integer> linkedMap = new LinkedHashMap<>();
linkedMap.put("banana", 2);
linkedMap.put("apple", 1);
linkedMap.forEach((k, v) ->
    System.out.println(k)); // banana, apple

// LRU キャッシュとして利用
LinkedHashMap<String, Object> lru =
    new LinkedHashMap<>(16, 0.75f, true) { // accessOrder=true
        @Override
        protected boolean removeEldestEntry(
                Map.Entry<String, Object> e) {
            return size() > 100;
        }
    };`,
  },
  {
    id: 171,
    question: "DequeとQueueの使い分けを説明してください",
    answer: "Queue は FIFO（先入先出）のデータ構造で、要素の追加は末尾、取得は先頭から行う。Deque（Double-Ended Queue）は両端キューで、先頭と末尾の両方から要素の追加・取得が可能であり、スタック（LIFO）としても使える。実装クラスとして ArrayDeque（配列ベース、高速）、LinkedList（リンクリストベース）、PriorityQueue（優先度付きキュー）がある。",
    category: "collections",
    level: "basic",
    code: `// Queue（FIFO）
Queue<String> queue = new LinkedList<>();
queue.offer("A");   // 末尾に追加
queue.offer("B");
queue.offer("C");
queue.poll();        // "A"（先頭から取得・削除）
queue.peek();        // "B"（先頭を参照のみ）

// Deque（両端キュー）
Deque<String> deque = new ArrayDeque<>();
deque.offerFirst("B"); // 先頭に追加
deque.offerFirst("A"); // 先頭に追加
deque.offerLast("C");  // 末尾に追加
deque.pollFirst();     // "A"
deque.pollLast();      // "C"

// Deque をスタック（LIFO）として使用
Deque<String> stack = new ArrayDeque<>();
stack.push("A"); // 先頭に追加
stack.push("B");
stack.pop();     // "B"（先頭から取得・削除）

// PriorityQueue（優先度付き）
PriorityQueue<Integer> pq = new PriorityQueue<>();
pq.offer(3); pq.offer(1); pq.offer(2);
pq.poll(); // 1（最小値から取得）`,
  },
  {
    id: 172,
    question: "イミュータブルコレクション（List.of, Map.of等）について説明してください",
    answer: "Java 9 で導入された List.of()、Set.of()、Map.of() ファクトリメソッドは、変更不可能（イミュータブル）なコレクションを簡潔に生成する。null 要素は許可されず、追加・削除・変更を試みると UnsupportedOperationException がスローされる。Collections.unmodifiableList() との違いは、後者は元のリストのビューであり元が変更されると影響を受けるが、List.of() は完全な独立したコピーである点にある。",
    category: "collections",
    level: "basic",
    code: `// Java 9+ ファクトリメソッド
List<String> list = List.of("A", "B", "C");
Set<String> set = Set.of("X", "Y", "Z");
Map<String, Integer> map = Map.of("a", 1, "b", 2);

// 変更しようとすると例外
// list.add("D"); // UnsupportedOperationException

// 11個以上のエントリには Map.ofEntries を使用
Map<String, Integer> largeMap = Map.ofEntries(
    Map.entry("key1", 1),
    Map.entry("key2", 2),
    Map.entry("key3", 3)
);

// Java 10: コレクションのコピー
List<String> copy = List.copyOf(mutableList);

// Stream からイミュータブルコレクションへ
List<String> immutable = stream
    .collect(Collectors.toUnmodifiableList());

// Collections.unmodifiableList との違い
List<String> original = new ArrayList<>(List.of("A"));
List<String> view = Collections.unmodifiableList(original);
original.add("B");
System.out.println(view.size()); // 2（元の変更が反映される）`,
  },
  {
    id: 173,
    question: "WeakHashMapとソフト参照について説明してください",
    answer: "WeakHashMap はキーが弱参照（WeakReference）で保持されるため、キーへの強参照がなくなると GC によりエントリが自動的に削除される。メモリセンシティブなキャッシュやメタデータの関連付けに使われる。ソフト参照（SoftReference）は弱参照より強く、メモリが不足した場合にのみ GC が回収するため、メモリに余裕がある限りキャッシュを保持したい場合に適している。",
    category: "collections",
    level: "advanced",
  },
  {
    id: 174,
    question: "NavigableSetとNavigableMapの使い方を説明してください",
    answer: "NavigableSet/NavigableMap は SortedSet/SortedMap を拡張し、要素のナビゲーション（最近接要素の検索、範囲ビュー、降順ビュー）を提供するインターフェースである。TreeSet と TreeMap が主な実装クラスで、floor/ceiling（以下・以上の最近接要素）、lower/higher（未満・超過の最近接要素）、subSet/subMap（範囲ビュー）などのメソッドが利用できる。スコア範囲の検索やスケジュール管理などのユースケースに適している。",
    category: "collections",
    level: "intermediate",
    code: `NavigableSet<Integer> scores = new TreeSet<>(
    List.of(50, 60, 70, 80, 90, 100));

// 最近接要素の検索
scores.floor(75);    // 70（75以下で最大）
scores.ceiling(75);  // 80（75以上で最小）
scores.lower(80);    // 70（80未満で最大）
scores.higher(80);   // 90（80超で最小）

// 範囲ビュー
scores.subSet(60, true, 90, true); // [60, 70, 80, 90]
scores.headSet(70, true);          // [50, 60, 70]
scores.tailSet(80, false);         // [90, 100]

// 降順ビュー
NavigableSet<Integer> desc = scores.descendingSet();
// [100, 90, 80, 70, 60, 50]

// NavigableMap
NavigableMap<LocalDate, String> events = new TreeMap<>();
events.put(LocalDate.of(2024, 3, 1), "会議");
events.put(LocalDate.of(2024, 3, 15), "発表");
// 指定日以降の最初のイベント
Map.Entry<LocalDate, String> next =
    events.ceilingEntry(LocalDate.of(2024, 3, 10));`,
  },
  {
    id: 175,
    question: "EnumSetとEnumMapの特徴と使い方を説明してください",
    answer: "EnumSet は enum 型専用の Set 実装で、内部的にビットベクターを使用するため HashSet より遥かに高速かつ省メモリである。EnumMap は enum 型をキーとする Map 実装で、内部は配列ベースのため HashMap より高速に動作する。enum を Set や Map のキーとして使う場合は、パフォーマンスとメモリ効率の観点から EnumSet/EnumMap を選択すべきである。",
    category: "collections",
    level: "intermediate",
    code: `enum Permission { READ, WRITE, EXECUTE, DELETE }

// EnumSet の生成方法
EnumSet<Permission> readOnly = EnumSet.of(Permission.READ);
EnumSet<Permission> all = EnumSet.allOf(Permission.class);
EnumSet<Permission> none = EnumSet.noneOf(Permission.class);
EnumSet<Permission> readWrite =
    EnumSet.range(Permission.READ, Permission.WRITE);

// 集合演算
EnumSet<Permission> userPerms =
    EnumSet.of(Permission.READ, Permission.WRITE);
EnumSet<Permission> adminPerms = EnumSet.allOf(Permission.class);
userPerms.containsAll(EnumSet.of(Permission.DELETE)); // false

// EnumMap
EnumMap<Permission, String> descriptions =
    new EnumMap<>(Permission.class);
descriptions.put(Permission.READ, "読み取り権限");
descriptions.put(Permission.WRITE, "書き込み権限");
descriptions.put(Permission.EXECUTE, "実行権限");
descriptions.put(Permission.DELETE, "削除権限");

// forEach はenum定義順でイテレーション
descriptions.forEach((perm, desc) ->
    System.out.println(perm + ": " + desc));`,
  },
  {
    id: 176,
    question: "Collectionsユーティリティメソッドについて説明してください",
    answer: "java.util.Collections クラスはコレクション操作のための静的ユーティリティメソッドを提供する。ソート（sort）、シャッフル（shuffle）、検索（binarySearch）、最大・最小（max/min）、頻度（frequency）などの操作や、同期化ラッパー（synchronizedList 等）、型安全ラッパー（checkedList 等）も提供する。Java 8 以降は Stream API でも同等の操作が可能だが、破壊的操作（sort、shuffle、reverse 等）は Collections クラスが依然有用である。",
    category: "collections",
    level: "basic",
    code: `List<Integer> list = new ArrayList<>(List.of(3, 1, 4, 1, 5));

// ソート・シャッフル・反転
Collections.sort(list);              // [1, 1, 3, 4, 5]
Collections.reverse(list);           // [5, 4, 3, 1, 1]
Collections.shuffle(list);           // ランダム順
Collections.sort(list, Comparator.reverseOrder()); // 降順

// 検索・統計
int idx = Collections.binarySearch(list, 3); // ソート済みの場合
int freq = Collections.frequency(list, 1);   // 1 の出現回数
int max = Collections.max(list);
int min = Collections.min(list);

// 不変・同期化ラッパー
List<String> immutable =
    Collections.unmodifiableList(mutableList);
List<String> syncList =
    Collections.synchronizedList(new ArrayList<>());

// 単一要素・空コレクション
List<String> single = Collections.singletonList("only");
List<String> empty = Collections.emptyList();

// 埋め・コピー・入れ替え
Collections.fill(list, 0);           // 全要素を 0 に
Collections.swap(list, 0, 1);        // 要素の入れ替え`,
  },
  // ===== 追加のOOP (177-184) =====
  {
    id: 177,
    question: "SOLIDの原則を具体例で説明してください",
    answer: "SOLID は5つの設計原則の頭文字である。S（単一責任）: クラスは1つの責務のみ持つ。O（開放閉鎖）: 拡張に開かれ修正に閉じる。L（リスコフ置換）: サブクラスは親クラスと置換可能であるべき。I（インターフェース分離）: クライアントに不要なメソッドを強制しない。D（依存性逆転）: 具体クラスではなく抽象に依存する。これらを守ることで、保守性・拡張性・テスト容易性の高いコードが実現できる。",
    category: "oop",
    level: "intermediate",
  },
  {
    id: 178,
    question: "委譲（Delegation）と継承の使い分けを説明してください",
    answer: "継承は「is-a」の関係（犬は動物である）を表現し、親クラスの機能を再利用する。委譲は「has-a」の関係（車はエンジンを持つ）で、別オブジェクトに処理を委ねる構成（Composition）である。継承は結合度が高く、親の変更が子に影響するため、「継承より委譲を優先する（Favor Composition over Inheritance）」が推奨される。Java ではインターフェースと委譲を組み合わせることで柔軟な設計が可能になる。",
    category: "oop",
    level: "intermediate",
    code: `// NG: 継承の乱用
class Stack<E> extends ArrayList<E> {
    public void push(E item) { add(item); }
    public E pop() { return remove(size() - 1); }
    // add(), get() 等の不要なメソッドが公開されてしまう
}

// OK: 委譲（Composition）
class Stack<E> {
    private final List<E> list = new ArrayList<>();

    public void push(E item) { list.add(item); }
    public E pop() { return list.remove(list.size() - 1); }
    public E peek() { return list.get(list.size() - 1); }
    public boolean isEmpty() { return list.isEmpty(); }
    public int size() { return list.size(); }
    // 必要なメソッドだけを公開
}`,
  },
  {
    id: 179,
    question: "イミュータブルオブジェクトの作り方を説明してください",
    answer: "イミュータブル（不変）オブジェクトは生成後に状態を変更できないオブジェクトで、スレッドセーフで副作用がなく安全に共有できる。作成ルールは ① クラスを final にする ② フィールドを private final にする ③ setter を提供しない ④ 可変オブジェクトのフィールドは防御的コピーを行う。Java 16 以降では record クラスで簡潔にイミュータブルオブジェクトを作成できる。",
    category: "oop",
    level: "intermediate",
    code: `// 伝統的なイミュータブルクラス
public final class Money {
    private final BigDecimal amount;
    private final Currency currency;
    private final List<String> tags;

    public Money(BigDecimal amount, Currency currency,
            List<String> tags) {
        this.amount = amount;
        this.currency = currency;
        this.tags = List.copyOf(tags); // 防御的コピー
    }

    public BigDecimal getAmount() { return amount; }
    public Currency getCurrency() { return currency; }
    public List<String> getTags() {
        return tags; // List.copyOf は既に不変
    }

    // 変更が必要な場合は新しいインスタンスを返す
    public Money add(Money other) {
        if (!this.currency.equals(other.currency))
            throw new IllegalArgumentException("通貨が異なります");
        return new Money(
            this.amount.add(other.amount),
            this.currency, this.tags);
    }
}

// record を使った簡潔な定義（Java 16+）
public record Point(double x, double y) {
    public double distanceTo(Point other) {
        return Math.hypot(x - other.x, y - other.y);
    }
}`,
  },
  {
    id: 180,
    question: "sealed classの用途を説明してください",
    answer: "sealed class（Java 17 正式導入）は、そのクラスを継承できるサブクラスを permits で限定することで、型の階層構造を制限する。これにより switch 式でパターンマッチングを行う際にコンパイラが全パターンの網羅性を検証でき、default 句が不要になる。代数的データ型（ADT）の表現に適しており、ドメインモデリングや状態管理で有効に活用できる。",
    category: "oop",
    level: "intermediate",
    code: `// sealed interface で許可するサブクラスを制限
public sealed interface Shape
    permits Circle, Rectangle, Triangle {
    double area();
}

public record Circle(double radius) implements Shape {
    public double area() {
        return Math.PI * radius * radius;
    }
}

public record Rectangle(double w, double h) implements Shape {
    public double area() { return w * h; }
}

public record Triangle(double b, double h) implements Shape {
    public double area() { return 0.5 * b * h; }
}

// パターンマッチングで網羅性が保証される
public String describe(Shape shape) {
    return switch (shape) {
        case Circle c    -> "半径 %.1f の円".formatted(c.radius());
        case Rectangle r -> "%s x %s の四角形".formatted(r.w(), r.h());
        case Triangle t  -> "底辺 %.1f の三角形".formatted(t.b());
        // default 不要（全サブクラスを網羅）
    };
}`,
  },
  {
    id: 181,
    question: "recordクラスの使い方を説明してください",
    answer: "record（Java 16 正式導入）はイミュータブルなデータキャリアクラスを簡潔に定義する機能で、コンストラクタ、getter、equals()、hashCode()、toString() が自動生成される。DTO やバリューオブジェクトの定義に最適で、従来のボイラープレートコードを大幅に削減できる。カスタムコンストラクタ（コンパクトコンストラクタ）でバリデーションを追加することも可能である。",
    category: "oop",
    level: "basic",
    code: `// 基本的な record
public record User(String name, String email, int age) {}

// 使用例
User user = new User("太郎", "taro@example.com", 25);
String name = user.name();  // getter（get プレフィックスなし）
System.out.println(user);   // User[name=太郎, email=taro@example.com, age=25]

// コンパクトコンストラクタでバリデーション
public record Email(String value) {
    public Email {
        if (!value.contains("@")) {
            throw new IllegalArgumentException(
                "無効なメール: " + value);
        }
        value = value.toLowerCase(); // 正規化
    }
}

// カスタムメソッドの追加
public record Range(int min, int max) {
    public Range {
        if (min > max) throw new IllegalArgumentException();
    }
    public boolean contains(int value) {
        return value >= min && value <= max;
    }
    public int size() { return max - min + 1; }
}`,
  },
  {
    id: 182,
    question: "enumの高度な使い方を説明してください",
    answer: "Java の enum はクラスの一種であり、フィールド、コンストラクタ、メソッド、抽象メソッドを持つことができる。各定数ごとに異なる振る舞いを定義する戦略パターンの実装、インターフェースの実装、シングルトンパターンの安全な実装にも使われる。EnumSet や EnumMap と組み合わせることで高性能なコレクション操作が可能になり、switch 式との相性も良い。",
    category: "oop",
    level: "intermediate",
    code: `// 戦略パターンとしての enum
public enum Operation {
    ADD("+") {
        @Override public double apply(double a, double b) {
            return a + b;
        }
    },
    SUBTRACT("-") {
        @Override public double apply(double a, double b) {
            return a - b;
        }
    },
    MULTIPLY("*") {
        @Override public double apply(double a, double b) {
            return a * b;
        }
    };

    private final String symbol;
    Operation(String symbol) { this.symbol = symbol; }
    public abstract double apply(double a, double b);

    @Override
    public String toString() { return symbol; }
}

// 使用例
double result = Operation.ADD.apply(3, 4); // 7.0

// インターフェース実装
public enum HttpStatus implements StatusCode {
    OK(200, "OK"),
    NOT_FOUND(404, "Not Found"),
    SERVER_ERROR(500, "Internal Server Error");

    private final int code;
    private final String message;
    HttpStatus(int code, String message) {
        this.code = code; this.message = message;
    }
    @Override public int getCode() { return code; }
    public String getMessage() { return message; }
}`,
  },
  {
    id: 183,
    question: "インナークラスの種類と用途を説明してください",
    answer: "Java のインナークラスは4種類ある。① 非 static インナークラス: 外部クラスのインスタンスに紐付き、外部の全メンバーにアクセス可能。② static ネストクラス: 外部クラスのインスタンス不要で、static メンバーのみアクセス可能。③ ローカルクラス: メソッド内で定義され、スコープが限定される。④ 匿名クラス: 名前を持たず、インターフェースや抽象クラスのその場限りの実装に使われる。Java 8 以降はラムダ式が匿名クラスの多くを代替している。",
    category: "oop",
    level: "intermediate",
    code: `public class Outer {
    private String outerField = "外部";

    // ① 非staticインナークラス
    class Inner {
        void show() {
            System.out.println(outerField); // 外部にアクセス可
        }
    }

    // ② staticネストクラス
    static class Nested {
        void show() {
            // outerField にはアクセス不可
            System.out.println("staticネスト");
        }
    }

    void method() {
        // ③ ローカルクラス
        class Local {
            void show() { System.out.println("ローカル"); }
        }
        new Local().show();

        // ④ 匿名クラス
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("匿名クラス");
            }
        };

        // ラムダ式で置き換え可能
        Runnable lambda = () -> System.out.println("ラムダ");
    }
}

// 使い分け
Outer.Inner inner = new Outer().new Inner();
Outer.Nested nested = new Outer.Nested(); // Outer不要`,
  },
  {
    id: 184,
    question: "アノテーションの自作方法を説明してください",
    answer: "カスタムアノテーションは @interface で定義し、@Target で適用対象、@Retention で保持期間を指定する。リフレクション（Runtime 保持）でアノテーション情報を取得して動的な処理を実行したり、アノテーションプロセッサ（Source/Class 保持）でコンパイル時にコード生成やバリデーションを行える。Spring やJakarta EE のフレームワークはアノテーションを多用しており、自作することで同様の宣言的プログラミングが可能になる。",
    category: "oop",
    level: "advanced",
    code: `// カスタムアノテーションの定義
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Retry {
    int maxAttempts() default 3;
    long delay() default 1000;
    Class<? extends Exception>[] retryOn()
        default { RuntimeException.class };
}

// アノテーションの使用
public class ApiClient {
    @Retry(maxAttempts = 5, delay = 2000)
    public String callExternalApi() {
        return httpClient.get("/api/data");
    }
}

// リフレクションでアノテーション処理
public class RetryHandler {
    public static Object execute(Object target, String methodName)
            throws Exception {
        Method method = target.getClass()
            .getMethod(methodName);
        Retry retry = method.getAnnotation(Retry.class);
        if (retry == null) return method.invoke(target);

        for (int i = 0; i < retry.maxAttempts(); i++) {
            try {
                return method.invoke(target);
            } catch (Exception e) {
                if (i == retry.maxAttempts() - 1) throw e;
                Thread.sleep(retry.delay());
            }
        }
        return null;
    }
}`,
  },
  // ===== 追加のSpring (185-192) =====
  {
    id: 185,
    question: "DIとIoCコンテナの仕組みを説明してください",
    answer: "DI（依存性注入）はオブジェクトの依存関係を外部から注入する設計パターンで、IoC（制御の反転）コンテナがオブジェクトの生成・管理・注入を担う。Spring の IoC コンテナ（ApplicationContext）は Bean の定義を読み込み、依存グラフを解決して適切な順序でインスタンス化する。DI により疎結合が実現され、テスト時にモックへの差し替えが容易になる。注入方法にはコンストラクタ注入（推奨）、セッター注入、フィールド注入がある。",
    category: "spring",
    level: "basic",
  },
  {
    id: 186,
    question: "Spring Boot Auto-configurationの仕組みを説明してください",
    answer: "Auto-configuration はクラスパス上の依存ライブラリを検出し、適切な Bean を自動的に設定する仕組みである。META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports に登録されたクラスが候補となり、@Conditional 系アノテーション（@ConditionalOnClass、@ConditionalOnMissingBean 等）で条件に合致した場合のみ適用される。ユーザーが明示的に Bean を定義した場合はそちらが優先され、自動設定を上書きできる。",
    category: "spring",
    level: "advanced",
  },
  {
    id: 187,
    question: "Spring AOPの仕組みと使い方を説明してください",
    answer: "AOP（アスペクト指向プログラミング）は横断的関心事（ロギング、トランザクション、セキュリティ等）をビジネスロジックから分離する技術である。Spring AOP はプロキシベース（JDK 動的プロキシまたは CGLIB）で実装され、@Aspect クラスに @Before、@After、@Around 等のアドバイスを定義する。ポイントカット式で適用対象メソッドを指定し、実行時にプロキシが介入してアドバイスを実行する。",
    category: "spring",
    level: "advanced",
    code: `@Aspect
@Component
public class LoggingAspect {

    // ポイントカット: service パッケージの全メソッド
    @Pointcut("execution(* com.example.service..*(..))")
    public void serviceLayer() {}

    // 実行前アドバイス
    @Before("serviceLayer()")
    public void logBefore(JoinPoint jp) {
        log.info("実行開始: {}", jp.getSignature().getName());
    }

    // 実行時間計測（Around アドバイス）
    @Around("serviceLayer()")
    public Object measureTime(ProceedingJoinPoint pjp)
            throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return pjp.proceed();
        } finally {
            long elapsed = System.currentTimeMillis() - start;
            log.info("{}の実行時間: {}ms",
                pjp.getSignature().getName(), elapsed);
        }
    }

    // 例外発生時アドバイス
    @AfterThrowing(pointcut = "serviceLayer()",
        throwing = "ex")
    public void logException(JoinPoint jp, Exception ex) {
        log.error("例外発生 {}: {}",
            jp.getSignature().getName(), ex.getMessage());
    }
}`,
  },
  {
    id: 188,
    question: "@Transactionalの動作原理と注意点を説明してください",
    answer: "@Transactional は Spring AOP のプロキシを通じてトランザクション管理を行う。メソッド呼び出し時にプロキシがトランザクションを開始し、正常終了でコミット、RuntimeException 発生時にロールバックする。注意点として、同一クラス内のメソッド呼び出し（self-invocation）ではプロキシを経由しないためトランザクションが適用されない、checked exception ではデフォルトでロールバックされない、private メソッドには適用できないなどがある。",
    category: "spring",
    level: "intermediate",
    code: `@Service
public class OrderService {

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = orderRepository.save(
            new Order(request));
        paymentService.charge(order);
        inventoryService.decrease(order.getItems());
        return order; // 全て成功でコミット
    }

    // rollbackFor で checked exception もロールバック対象に
    @Transactional(rollbackFor = Exception.class)
    public void processPayment(Payment payment)
            throws PaymentException {
        // ...
    }

    // 読み取り専用トランザクション（最適化）
    @Transactional(readOnly = true)
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    // NG: self-invocation（プロキシを経由しない）
    public void process() {
        createOrder(request); // @Transactional が効かない！
    }

    // 伝搬属性の指定
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void auditLog(String message) {
        // 親トランザクションと独立
    }
}`,
  },
  {
    id: 189,
    question: "Spring Batchの基本構成を説明してください",
    answer: "Spring Batch は大量データの一括処理（バッチ処理）フレームワークで、Job → Step → （Reader → Processor → Writer）の階層構造で構成される。ItemReader がデータを読み込み、ItemProcessor で加工し、ItemWriter で書き出す Chunk 指向処理が基本パターンである。ジョブのリスタート、スキップ、リトライ機能を備え、JobRepository でジョブ実行状態を永続化してフォールトトレランスを実現する。",
    category: "spring",
    level: "advanced",
  },
  {
    id: 190,
    question: "Spring WebFluxとリアクティブプログラミングについて説明してください",
    answer: "Spring WebFlux は Netty ベースの非ブロッキング Web フレームワークで、少数のスレッドで大量の同時接続を効率的に処理する。Project Reactor の Mono（0-1 件）と Flux（0-N 件）を使って非同期データストリームを宣言的に処理し、バックプレッシャーで流量制御を行う。I/O バウンドな高並行処理に適しているが、CPU バウンドな処理やブロッキング I/O が多い場合は従来の Spring MVC が適している。",
    category: "spring",
    level: "advanced",
    code: `// WebFlux コントローラー（アノテーション方式）
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository repository;

    @GetMapping
    public Flux<User> findAll() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Mono<User> findById(@PathVariable Long id) {
        return repository.findById(id)
            .switchIfEmpty(Mono.error(
                new NotFoundException("ユーザー未発見")));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<User> create(@RequestBody Mono<User> user) {
        return user.flatMap(repository::save);
    }
}

// 関数型ルーティング方式
@Bean
public RouterFunction<ServerResponse> routes(UserHandler handler) {
    return RouterFunctions.route()
        .GET("/api/users", handler::findAll)
        .GET("/api/users/{id}", handler::findById)
        .POST("/api/users", handler::create)
        .build();
}`,
  },
  {
    id: 191,
    question: "Spring Profilesの使い方を説明してください",
    answer: "Spring Profiles は環境（開発・テスト・本番）に応じて設定を切り替える仕組みで、application-{profile}.yml にプロファイル固有の設定を記述する。@Profile アノテーションで特定のプロファイルでのみ有効になる Bean を定義でき、spring.profiles.active プロパティまたは環境変数で有効なプロファイルを指定する。デフォルトプロファイルの設定が基本となり、アクティブプロファイルの設定で上書きされる。",
    category: "spring",
    level: "basic",
    code: `# application.yml（共通設定）
spring:
  application:
    name: my-app

# application-dev.yml（開発環境）
spring:
  datasource:
    url: jdbc:h2:mem:devdb
  jpa:
    show-sql: true

# application-prod.yml（本番環境）
spring:
  datasource:
    url: jdbc:postgresql://db-server:5432/proddb
  jpa:
    show-sql: false

---
// プロファイル固有の Bean
@Configuration
public class DataSourceConfig {
    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2).build();
    }

    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl("jdbc:postgresql://...");
        return ds;
    }
}

// 起動時の指定
// java -jar app.jar --spring.profiles.active=prod
// SPRING_PROFILES_ACTIVE=prod java -jar app.jar`,
  },
  {
    id: 192,
    question: "Beanスコープの種類を説明してください",
    answer: "Spring Bean のスコープは主に5種類ある。① singleton（デフォルト）: コンテナに1つだけインスタンスが存在し、全ての注入先で同じオブジェクトを共有する。② prototype: 注入のたびに新しいインスタンスが生成される。③ request: HTTP リクエストごとに1インスタンス。④ session: HTTP セッションごとに1インスタンス。⑤ application: ServletContext ごとに1インスタンス。singleton Bean に prototype Bean を注入する場合は Provider やプロキシを使って遅延取得する必要がある。",
    category: "spring",
    level: "intermediate",
  },
  // ===== 追加のモダンJava・設計 (193-200) =====
  {
    id: 193,
    question: "マイクロサービスの利点と課題を説明してください",
    answer: "マイクロサービスの利点は、独立したデプロイ・スケーリング、技術スタックの自由な選択、チームの自律性、障害の局所化である。課題は、分散システム特有の複雑さ（ネットワーク遅延、部分障害、データ一貫性）、サービス間通信のオーバーヘッド、分散トレーシングやログ集約の必要性、運用コストの増大である。小規模チームではモノリスから始め、境界が明確になった部分から段階的に分割する「モノリスファースト」アプローチが推奨される。",
    category: "design",
    level: "advanced",
  },
  {
    id: 194,
    question: "イベント駆動アーキテクチャについて説明してください",
    answer: "イベント駆動アーキテクチャ（EDA）はサービス間をイベント（状態変化の通知）で非同期に連携させるアーキテクチャパターンである。イベントプロデューサーがイベントを発行し、メッセージブローカー（Kafka、RabbitMQ 等）を介してイベントコンシューマーが受信・処理する。サービス間の疎結合を実現し、スケーラビリティとレジリエンスが向上するが、イベント順序の保証、べき等性の確保、イベントスキーマの進化管理が設計上の課題となる。",
    category: "design",
    level: "advanced",
  },
  {
    id: 195,
    question: "CQRSパターンを説明してください",
    answer: "CQRS（Command Query Responsibility Segregation）はデータの書き込み（Command）と読み取り（Query）を別々のモデル・データストアに分離するパターンである。書き込み側はドメインロジックに最適化されたモデル、読み取り側はクエリに最適化された非正規化されたビューを持つ。イベントソーシングと組み合わせることが多く、読み書きを独立してスケーリングできる利点があるが、結果整合性やシステム複雑度の増大が課題となる。",
    category: "design",
    level: "advanced",
  },
  {
    id: 196,
    question: "サーキットブレーカーパターンを説明してください",
    answer: "サーキットブレーカーは外部サービス呼び出しの連続失敗を検知して一時的にリクエストを遮断し、障害の連鎖（カスケード障害）を防ぐパターンである。状態は Closed（正常通過）→ Open（リクエスト遮断）→ Half-Open（試行的に通過させ復旧を確認）の3つで遷移する。Java では Resilience4j ライブラリが広く使われ、リトライ、レート制限、バルクヘッドなどの他のレジリエンスパターンと組み合わせて使用する。",
    category: "design",
    level: "advanced",
    code: `// Resilience4j を使ったサーキットブレーカー
CircuitBreakerConfig config = CircuitBreakerConfig.custom()
    .failureRateThreshold(50)         // 失敗率50%でOpen
    .waitDurationInOpenState(
        Duration.ofSeconds(30))       // Open→HalfOpen待機
    .slidingWindowSize(10)            // 直近10回で判定
    .permittedNumberOfCallsInHalfOpenState(3)
    .build();

CircuitBreaker cb = CircuitBreaker.of("userService", config);

// 関数のラップ
Supplier<User> decorated = CircuitBreaker
    .decorateSupplier(cb, () -> userService.findById(1L));

// Try で結果をハンドリング
Try<User> result = Try.ofSupplier(decorated)
    .recover(CallNotPermittedException.class,
        e -> User.fallback());

// Spring Boot + アノテーション方式
@CircuitBreaker(name = "userService",
    fallbackMethod = "fallback")
public User getUser(Long id) {
    return restTemplate.getForObject(
        "http://user-service/api/users/" + id, User.class);
}

public User fallback(Long id, Exception e) {
    return new User(id, "N/A", "サービス利用不可");
}`,
  },
  {
    id: 197,
    question: "Java 21のVirtual Threads（仮想スレッド）の使い方を説明してください",
    answer: "Virtual Threads（Project Loom）は Java 21 で正式導入された軽量スレッドで、OS スレッド（プラットフォームスレッド）に比べて極めて低コストで大量に生成できる。I/O ブロッキング時にキャリアスレッドを解放するため、スレッドプールのチューニングが不要になり、従来の1リクエスト1スレッドモデルで高い並行性を実現できる。既存のブロッキングコードをそのまま活用でき、リアクティブプログラミングの複雑さを回避できる。",
    category: "modern",
    level: "intermediate",
    code: `// Virtual Thread の生成方法
Thread vt = Thread.ofVirtual()
    .name("my-vthread")
    .start(() -> System.out.println("仮想スレッド実行中"));

// ExecutorService による利用（推奨）
try (var executor =
        Executors.newVirtualThreadPerTaskExecutor()) {
    // 10万タスクを同時に実行可能
    List<Future<String>> futures = IntStream.range(0, 100_000)
        .mapToObj(i -> executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return "結果: " + i;
        }))
        .toList();

    for (Future<String> f : futures) {
        System.out.println(f.get());
    }
}

// Spring Boot 3.2+ での有効化
# application.yml
spring:
  threads:
    virtual:
      enabled: true  # Tomcat が仮想スレッドを使用`,
  },
  {
    id: 198,
    question: "Java 22-23の新機能を説明してください",
    answer: "Java 22 では Foreign Function & Memory API（JNI の代替）が正式導入され、ネイティブコードとの安全な連携が可能になった。unnamed variables（_）で未使用変数を明示でき、Gatherers API で Stream の中間操作をカスタム定義できるようになった。Java 23 ではプリミティブ型のパターンマッチング（プレビュー）、Markdown ドキュメントコメント、Structured Concurrency（プレビュー）などが追加されている。",
    category: "modern",
    level: "intermediate",
    code: `// Java 22: unnamed variables（_）
try {
    int result = Integer.parseInt(str);
} catch (NumberFormatException _) {
    // 例外変数を使わない場合に _ を使用
    System.out.println("数値変換に失敗");
}

// パターンマッチングでの使用
if (obj instanceof Point(int x, int _)) {
    // y 座標は不要
    System.out.println("x = " + x);
}

// Java 22: Gatherers（Stream の中間操作カスタマイズ）
List<List<Integer>> windows = Stream.of(1, 2, 3, 4, 5)
    .gather(Gatherers.windowSliding(3))
    .toList();
// [[1,2,3], [2,3,4], [3,4,5]]

// Java 23: Structured Concurrency（プレビュー）
try (var scope =
        new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<User> userTask =
        scope.fork(() -> findUser(id));
    Subtask<List<Order>> ordersTask =
        scope.fork(() -> findOrders(id));
    scope.join().throwIfFailed();
    return new UserProfile(
        userTask.get(), ordersTask.get());
}`,
  },
  {
    id: 199,
    question: "Garbage Collectorの種類と選び方を説明してください",
    answer: "Java には複数の GC アルゴリズムがある。Serial GC はシングルスレッドで小規模アプリ向け、Parallel GC はスループット重視、G1 GC（デフォルト）はバランスの良い汎用 GC で大きなヒープにも対応する。ZGC は超低レイテンシ（停止時間 1ms 以下）で大規模メモリ向け、Shenandoah GC も低レイテンシ GC である。選択基準は、レイテンシ要件が厳しい場合は ZGC、スループット重視なら Parallel GC、一般的な用途では G1 GC が推奨される。",
    category: "modern",
    level: "advanced",
    code: `# GC の指定方法
java -XX:+UseSerialGC -jar app.jar     # Serial GC
java -XX:+UseParallelGC -jar app.jar   # Parallel GC
java -XX:+UseG1GC -jar app.jar         # G1 GC（デフォルト）
java -XX:+UseZGC -jar app.jar          # ZGC
java -XX:+UseShenandoahGC -jar app.jar # Shenandoah

# G1 GC のチューニング例
java -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\      # 最大停止時間目標
     -XX:G1HeapRegionSize=16m \\      # リージョンサイズ
     -XX:InitiatingHeapOccupancyPercent=45 \\
     -Xlog:gc*:file=gc.log:time \\
     -jar app.jar

# ZGC のチューニング例（Java 21+）
java -XX:+UseZGC \\
     -XX:+ZGenerational \\            # 世代別ZGC
     -Xmx16g \\
     -Xlog:gc*:file=gc.log:time \\
     -jar app.jar`,
  },
  {
    id: 200,
    question: "12-Factor Appの原則をJavaで実践する方法を説明してください",
    answer: "12-Factor App はクラウドネイティブアプリケーション構築の方法論である。Java/Spring Boot では ① コードベース: Git で一元管理 ② 依存関係: Gradle/Maven で明示宣言 ③ 設定: 環境変数や Spring Profiles で外部化 ④ バッキングサービス: DataSource を付け替え可能に ⑤ ビルド・リリース・実行: CI/CD パイプラインで分離 ⑥ プロセス: ステートレスに保ちセッションは外部ストアへ ⑦ ポートバインディング: 組み込みTomcat ⑧ 並行性: プロセスモデルでスケールアウト ⑨ 廃棄容易性: graceful shutdown ⑩ 開発/本番一致: Docker で環境統一 ⑪ ログ: stdout に出力 ⑫ 管理プロセス: 1回限りのタスクも同一コードベースで実行する。",
    category: "design",
    level: "advanced",
  },
];

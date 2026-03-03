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
];

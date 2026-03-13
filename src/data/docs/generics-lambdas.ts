import type { DocsChapter } from "../java-docs";

export const genericsLambdasChapters: DocsChapter[] = [
  {
    id: "generics",
    title: "ジェネリクス",
    category: "generics-lambdas",
    description: "型パラメータ、境界型、ワイルドカード、型消去",
    sections: [
      {
        title: "ジェネリクスの基本",
        content:
          "ジェネリクスはクラスやメソッドに型パラメータを導入し、型安全なコードを実現します。コンパイル時に型チェックが行われ、実行時のClassCastExceptionを防ぎます。",
        code: `// ジェネリッククラス
public class Box<T> {
    private T content;

    public void set(T content) { this.content = content; }
    public T get() { return content; }
}

Box<String> stringBox = new Box<>();
stringBox.set("Hello");
String s = stringBox.get();        // キャスト不要

// 複数の型パラメータ
public class Pair<K, V> {
    private K key;
    private V value;
    public Pair(K key, V value) { this.key = key; this.value = value; }
    public K getKey() { return key; }
    public V getValue() { return value; }
}
Pair<String, Integer> pair = new Pair<>("age", 25);

// ジェネリックメソッド
public static <T> List<T> listOf(T... items) {
    return new ArrayList<>(Arrays.asList(items));
}
List<String> names = listOf("Alice", "Bob");

// ジェネリックインターフェース
public interface Repository<T, ID> {
    T findById(ID id);
    List<T> findAll();
    void save(T entity);
    void delete(ID id);
}`,
      },
      {
        title: "境界型とワイルドカード",
        content:
          "境界型パラメータ（extends）で型の上限を指定できます。ワイルドカード（?）は上限境界（extends）、下限境界（super）、非境界の3種類があります。PECS原則（Producer-extends, Consumer-super）で使い分けます。",
        code: `// 上限境界: T は Number のサブクラスのみ
public static <T extends Number> double sum(List<T> list) {
    double total = 0;
    for (T item : list) total += item.doubleValue();
    return total;
}
sum(List.of(1, 2, 3));           // int → Integer → Number ✓
sum(List.of(1.5, 2.5));          // double → Double → Number ✓

// 複数の境界
public static <T extends Comparable<T> & Serializable> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// ワイルドカード
// 上限境界（読み取り用 = Producer）
void printNumbers(List<? extends Number> list) {
    for (Number n : list) System.out.println(n);
    // list.add(1);  // コンパイルエラー（書き込み不可）
}

// 下限境界（書き込み用 = Consumer）
void addIntegers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
    // Integer i = list.get(0);  // コンパイルエラー（型不明）
}

// PECS 原則
// Producer-extends: データを読む → <? extends T>
// Consumer-super:  データを書く → <? super T>
public static <T> void copy(
    List<? extends T> src,    // 読み取り元
    List<? super T> dest      // 書き込み先
) {
    for (T item : src) dest.add(item);
}`,
      },
    ],
  },
  {
    id: "lambdas",
    title: "ラムダ式",
    category: "generics-lambdas",
    description: "関数型インターフェース、メソッド参照、Predicate/Function/Consumer",
    sections: [
      {
        title: "ラムダ式の基本",
        content:
          "ラムダ式は関数型インターフェース（抽象メソッドが1つのインターフェース）の簡潔な実装です。(引数) -> {本体} の構文で、匿名クラスをよりシンプルに記述できます。",
        code: `// ラムダ式の構文
Runnable r = () -> System.out.println("Hello");

Comparator<String> comp = (a, b) -> a.length() - b.length();

// 複数行の本体
Comparator<String> comp2 = (a, b) -> {
    int diff = a.length() - b.length();
    return diff != 0 ? diff : a.compareTo(b);
};

// 主要な関数型インターフェース (java.util.function)
Predicate<String> isEmpty = s -> s.isEmpty();
Function<String, Integer> toLength = s -> s.length();
Consumer<String> printer = s -> System.out.println(s);
Supplier<String> greeting = () -> "Hello, World!";
UnaryOperator<String> toUpper = s -> s.toUpperCase();
BinaryOperator<Integer> sum = (a, b) -> a + b;
BiFunction<String, Integer, String> repeat = (s, n) -> s.repeat(n);

// Predicate の合成
Predicate<String> notEmpty = isEmpty.negate();
Predicate<String> isShort = s -> s.length() < 5;
Predicate<String> shortAndNotEmpty = notEmpty.and(isShort);

// Function の合成
Function<String, String> trim = String::trim;
Function<String, String> upper = String::toUpperCase;
Function<String, String> pipeline = trim.andThen(upper);`,
      },
      {
        title: "メソッド参照",
        content:
          "メソッド参照はラムダ式をさらに簡潔にする構文です。クラス::メソッド名 の形式で、4つの種類があります。既存のメソッドをそのまま関数型インターフェースとして渡せます。",
        code: `// 4種類のメソッド参照

// 1. static メソッド参照: クラス名::staticメソッド
Function<String, Integer> parse = Integer::parseInt;
parse.apply("42");  // 42

// 2. インスタンスメソッド参照（特定のオブジェクト）: インスタンス::メソッド
String prefix = "Hello, ";
Function<String, String> greet = prefix::concat;
greet.apply("Java");  // "Hello, Java"

// 3. インスタンスメソッド参照（任意のオブジェクト）: クラス名::メソッド
Function<String, String> toUpper = String::toUpperCase;
toUpper.apply("hello");  // "HELLO"

// 4. コンストラクタ参照: クラス名::new
Supplier<List<String>> listFactory = ArrayList::new;
Function<String, StringBuilder> sbFactory = StringBuilder::new;

// 実践的な使用例
List<String> names = List.of("Charlie", "Alice", "Bob");

// ソート
names.stream().sorted(String::compareToIgnoreCase);

// 変換
List<Integer> lengths = names.stream()
    .map(String::length)       // メソッド参照
    .toList();

// フィルタ
names.stream()
    .filter(Predicate.not(String::isEmpty))  // 否定
    .forEach(System.out::println);           // 出力`,
      },
    ],
  },
  {
    id: "annotations",
    title: "アノテーション",
    category: "generics-lambdas",
    description: "組み込みアノテーション、カスタム定義、メタアノテーション",
    sections: [
      {
        title: "アノテーションの使い方",
        content:
          "アノテーションはコードにメタデータを付与する仕組みです。コンパイラへの指示、ランタイムでの処理、コード生成ツールへの情報提供に使います。@Override, @Deprecated, @SuppressWarnings などが標準で用意されています。",
        code: `// 標準アノテーション
@Override                        // メソッドオーバーライドを明示
public String toString() { return "..."; }

@Deprecated(since = "21", forRemoval = true)  // 非推奨
public void oldMethod() {}

@SuppressWarnings("unchecked")   // 警告を抑制
public void method() {}

@FunctionalInterface             // 関数型インターフェースを保証
interface Converter<F, T> {
    T convert(F from);
}

@SafeVarargs                     // 可変長引数の型安全を保証
public final <T> void process(T... items) {}

// カスタムアノテーション
@Retention(RetentionPolicy.RUNTIME)   // 実行時に保持
@Target(ElementType.METHOD)           // メソッドに付与可能
public @interface Benchmark {
    String value() default "";
    int warmup() default 3;
    int iterations() default 10;
}

// 使用
@Benchmark(value = "sort test", iterations = 100)
public void sortTest() {
    // ...
}

// リフレクションで読み取り
Method m = MyClass.class.getMethod("sortTest");
Benchmark b = m.getAnnotation(Benchmark.class);
System.out.println(b.value());       // "sort test"
System.out.println(b.iterations());  // 100

// リピーティングアノテーション（Java 8+）
@Repeatable(Schedules.class)
@interface Schedule { String day(); }
@interface Schedules { Schedule[] value(); }

@Schedule(day = "Mon")
@Schedule(day = "Wed")
public void task() {}`,
      },
    ],
  },
  {
    id: "pattern-matching",
    title: "パターンマッチング",
    category: "generics-lambdas",
    description: "instanceof, switch式, レコードパターン, ガードパターン (Java 16-21+)",
    sections: [
      {
        title: "パターンマッチングの進化",
        content:
          "パターンマッチングはJava 16のinstanceofパターンから始まり、Java 21のswitchパターン、レコードパターンへと進化しました。型チェックと変数束縛を1ステップで行い、安全で簡潔なコードを実現します。",
        code: `// instanceof パターン (Java 16+)
// 従来
if (obj instanceof String) {
    String s = (String) obj;       // キャストが必要
    System.out.println(s.length());
}
// パターンマッチング
if (obj instanceof String s) {     // チェック + 束縛
    System.out.println(s.length());
}

// switch パターン (Java 21+)
String format(Object obj) {
    return switch (obj) {
        case Integer i  -> "int: %d".formatted(i);
        case Long l     -> "long: %d".formatted(l);
        case Double d   -> "double: %.2f".formatted(d);
        case String s   -> "string: \\"%s\\"".formatted(s);
        case null       -> "null";
        default         -> obj.toString();
    };
}

// ガードパターン（when 句）
String classify(Number n) {
    return switch (n) {
        case Integer i when i < 0  -> "負の整数";
        case Integer i when i == 0 -> "ゼロ";
        case Integer i             -> "正の整数";
        case Double d when d.isNaN() -> "NaN";
        case Double d              -> "小数: " + d;
        default -> "その他の数値";
    };
}

// レコードパターン (Java 21+)
record Point(int x, int y) {}

void printPoint(Object obj) {
    if (obj instanceof Point(int x, int y)) {
        System.out.println("x=" + x + ", y=" + y);
    }
}

// ネストしたレコードパターン
record Line(Point start, Point end) {}

double length(Object obj) {
    return switch (obj) {
        case Line(Point(var x1, var y1), Point(var x2, var y2)) ->
            Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        default -> 0;
    };
}`,
      },
    ],
  },
];

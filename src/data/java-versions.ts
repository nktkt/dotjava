export interface JavaFeature {
  title: string;
  description: string;
  code?: string;
  since?: string;
}

export interface JavaVersion {
  id: string;
  version: number;
  name: string;
  releaseDate: string;
  lts: boolean;
  color: string;
  summary: string;
  features: JavaFeature[];
}

export const javaVersions: JavaVersion[] = [
  {
    id: "java-8",
    version: 8,
    name: "Java 8",
    releaseDate: "2014年3月",
    lts: true,
    color: "var(--color-dads-blue)",
    summary: "ラムダ式、Stream API、Optional など、Javaの書き方を根本的に変えた革命的バージョン",
    features: [
      {
        title: "ラムダ式",
        description: "関数型プログラミングスタイルを実現する無名関数。コードを簡潔に書ける。",
        code: `// Java 7以前
Collections.sort(list, new Comparator<String>() {
    @Override
    public int compare(String a, String b) {
        return a.compareTo(b);
    }
});

// Java 8 ラムダ式
Collections.sort(list, (a, b) -> a.compareTo(b));

// メソッド参照
Collections.sort(list, String::compareTo);`,
      },
      {
        title: "Stream API",
        description: "コレクションに対して関数型スタイルの操作（フィルタ、マップ、集約等）をチェーンで記述できる。",
        code: `List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

// フィルタ + 変換 + 収集
List<String> result = names.stream()
    .filter(name -> name.length() > 3)
    .map(String::toUpperCase)
    .sorted()
    .collect(Collectors.toList());
// [ALICE, CHARLIE, DAVID]

// 集約操作
int total = IntStream.rangeClosed(1, 100).sum(); // 5050

// 並列ストリーム
long count = names.parallelStream()
    .filter(name -> name.startsWith("A"))
    .count();`,
      },
      {
        title: "Optional",
        description: "nullを安全に扱うためのコンテナクラス。NullPointerExceptionを防ぐ。",
        code: `// Optional の生成
Optional<String> opt1 = Optional.of("Hello");
Optional<String> opt2 = Optional.empty();
Optional<String> opt3 = Optional.ofNullable(null);

// 値の取得と操作
String value = opt1.orElse("デフォルト値");
opt1.ifPresent(v -> System.out.println(v));

// チェーン操作
String result = Optional.ofNullable(user)
    .map(User::getAddress)
    .map(Address::getCity)
    .orElse("不明");`,
      },
      {
        title: "デフォルトメソッド",
        description: "インターフェースにデフォルト実装を持たせることができる。",
        code: `public interface Vehicle {
    // 抽象メソッド
    String getBrand();

    // デフォルトメソッド
    default void honk() {
        System.out.println("ビーッ！");
    }

    // staticメソッド
    static Vehicle create(String brand) {
        return () -> brand;
    }
}`,
      },
      {
        title: "新しい Date/Time API (java.time)",
        description: "従来のDate/Calendarに代わる、不変でスレッドセーフな日時API。",
        code: `// 現在日時
LocalDate today = LocalDate.now();
LocalTime now = LocalTime.now();
LocalDateTime dateTime = LocalDateTime.now();
ZonedDateTime zoned = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));

// 日時の操作（不変）
LocalDate nextWeek = today.plusWeeks(1);
LocalDate birthday = LocalDate.of(1990, Month.JANUARY, 15);

// 期間の計算
Period period = Period.between(birthday, today);
Duration duration = Duration.ofHours(5);

// フォーマット
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy年MM月dd日");
String formatted = today.format(fmt);`,
      },
      {
        title: "関数型インターフェース",
        description: "1つの抽象メソッドを持つインターフェース。ラムダ式の型として使用される。",
        code: `// 主要な関数型インターフェース
Function<String, Integer> toLength = String::length;
Predicate<String> isLong = s -> s.length() > 5;
Consumer<String> printer = System.out::println;
Supplier<String> hello = () -> "Hello!";
UnaryOperator<String> toUpper = String::toUpperCase;
BinaryOperator<Integer> add = Integer::sum;

// カスタム関数型インターフェース
@FunctionalInterface
interface Converter<F, T> {
    T convert(F from);
}

Converter<String, Integer> converter = Integer::valueOf;`,
      },
      {
        title: "CompletableFuture",
        description: "非同期処理を宣言的に記述するためのクラス。",
        code: `CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .thenApply(result -> format(result))
    .exceptionally(ex -> "エラー: " + ex.getMessage());

// 複数の非同期処理の合成
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

CompletableFuture<String> combined = f1.thenCombine(f2,
    (s1, s2) -> s1 + " " + s2);`,
      },
    ],
  },
  {
    id: "java-9",
    version: 9,
    name: "Java 9",
    releaseDate: "2017年9月",
    lts: false,
    color: "var(--color-dads-success)",
    summary: "モジュールシステム (Project Jigsaw) の導入、JShell、コレクションファクトリメソッドなど",
    features: [
      {
        title: "モジュールシステム (Project Jigsaw)",
        description: "アプリケーションを論理的なモジュールに分割し、依存関係を明示的に管理する。",
        code: `// module-info.java
module com.example.myapp {
    // 他のモジュールへの依存
    requires java.base;        // 暗黙的
    requires java.sql;
    requires transitive java.logging;

    // パッケージの公開
    exports com.example.myapp.api;
    exports com.example.myapp.model to com.example.client;

    // サービスの提供と利用
    provides com.example.spi.MyService
        with com.example.impl.MyServiceImpl;
    uses com.example.spi.MyService;

    // リフレクションアクセスの許可
    opens com.example.myapp.internal to com.google.gson;
}`,
      },
      {
        title: "JShell (REPL)",
        description: "Javaコードを対話的に実行できるRead-Eval-Print Loop。",
        code: `// ターミナルで jshell を起動
$ jshell

jshell> int x = 10
x ==> 10

jshell> System.out.println("Hello: " + x)
Hello: 10

jshell> List.of(1, 2, 3).stream().sum()
$3 ==> 6

jshell> /exit`,
      },
      {
        title: "コレクションファクトリメソッド",
        description: "不変コレクションを簡潔に生成するファクトリメソッド。",
        code: `// Java 8以前
List<String> list = Collections.unmodifiableList(
    Arrays.asList("a", "b", "c"));

// Java 9
List<String> list = List.of("a", "b", "c");
Set<String> set = Set.of("x", "y", "z");
Map<String, Integer> map = Map.of(
    "one", 1,
    "two", 2,
    "three", 3
);

// 10個以上のエントリにはofEntries
Map<String, Integer> bigMap = Map.ofEntries(
    Map.entry("key1", 1),
    Map.entry("key2", 2)
);`,
      },
      {
        title: "Stream APIの改善",
        description: "takeWhile, dropWhile, ofNullable, iterate の追加。",
        code: `// takeWhile - 条件を満たす間取得
Stream.of(1, 2, 3, 4, 5, 1)
    .takeWhile(n -> n < 4)
    .forEach(System.out::println); // 1, 2, 3

// dropWhile - 条件を満たす間スキップ
Stream.of(1, 2, 3, 4, 5, 1)
    .dropWhile(n -> n < 4)
    .forEach(System.out::println); // 4, 5, 1

// ofNullable
Stream<String> stream = Stream.ofNullable(null); // 空のStream

// iterate with hasNext
Stream.iterate(1, n -> n < 100, n -> n * 2)
    .forEach(System.out::println); // 1, 2, 4, 8, 16, 32, 64`,
      },
      {
        title: "Optional の改善",
        description: "ifPresentOrElse, or, stream メソッドの追加。",
        code: `Optional<String> opt = Optional.of("Hello");

// ifPresentOrElse
opt.ifPresentOrElse(
    value -> System.out.println("値: " + value),
    () -> System.out.println("空です")
);

// or - 代替のOptionalを返す
Optional<String> result = opt
    .or(() -> Optional.of("デフォルト"));

// stream - OptionalをStreamに変換
Stream<String> stream = opt.stream();`,
      },
      {
        title: "インターフェースのprivateメソッド",
        description: "インターフェース内でprivateメソッドを定義できるようになった。",
        code: `public interface Logger {
    default void logInfo(String msg) {
        log("INFO", msg);
    }

    default void logError(String msg) {
        log("ERROR", msg);
    }

    // privateメソッドで共通ロジックを共有
    private void log(String level, String msg) {
        System.out.println("[" + level + "] " + msg);
    }
}`,
      },
      {
        title: "try-with-resources の改善",
        description: "実質的にfinalな変数をtry-with-resourcesで直接使用可能に。",
        code: `// Java 8 - 新しい変数が必要
BufferedReader br = new BufferedReader(new FileReader("file.txt"));
try (BufferedReader br2 = br) {
    // ...
}

// Java 9 - 既存の変数をそのまま使用
BufferedReader br = new BufferedReader(new FileReader("file.txt"));
try (br) {
    String line = br.readLine();
}`,
      },
    ],
  },
  {
    id: "java-10",
    version: 10,
    name: "Java 10",
    releaseDate: "2018年3月",
    lts: false,
    color: "var(--color-dads-warning)",
    summary: "ローカル変数の型推論 (var)、不変コレクション収集など",
    features: [
      {
        title: "ローカル変数の型推論 (var)",
        description: "ローカル変数宣言で型をvarキーワードで省略可能に。コンパイラが型を推論する。",
        code: `// 型推論あり
var list = new ArrayList<String>();    // ArrayList<String>
var stream = list.stream();            // Stream<String>
var map = Map.of("key", "value");      // Map<String, String>

// for文でも使用可能
for (var entry : map.entrySet()) {
    var key = entry.getKey();
    var value = entry.getValue();
}

// 注意: 以下では使用不可
// var x;                    // 初期化子が必要
// var arr = {1, 2, 3};     // 配列初期化子はNG
// var f = (String s) -> s; // ラムダにはNG`,
      },
      {
        title: "不変コレクションの copyOf",
        description: "既存のコレクションから不変コピーを作成するメソッド。",
        code: `List<String> mutable = new ArrayList<>(List.of("a", "b", "c"));
List<String> immutable = List.copyOf(mutable);

Set<String> immutableSet = Set.copyOf(mutable);
Map<String, Integer> immutableMap = Map.copyOf(
    Map.of("a", 1, "b", 2)
);

// Collectors.toUnmodifiableList()
List<String> result = stream
    .collect(Collectors.toUnmodifiableList());`,
      },
      {
        title: "Optional.orElseThrow()",
        description: "引数なしのorElseThrow()メソッドの追加。get()の代替。",
        code: `Optional<String> opt = Optional.of("Hello");

// Java 8 - get() は空の場合にNoSuchElementException
String val1 = opt.get(); // 非推奨的な使い方

// Java 10 - orElseThrow() で意図を明確に
String val2 = opt.orElseThrow(); // NoSuchElementException`,
      },
    ],
  },
  {
    id: "java-11",
    version: 11,
    name: "Java 11",
    releaseDate: "2018年9月",
    lts: true,
    color: "var(--color-dads-blue)",
    summary: "LTS版。HTTPクライアント正式版、String新メソッド、ファイル読み書き簡素化など",
    features: [
      {
        title: "HTTP Client API (正式版)",
        description: "java.net.http パッケージの HTTP/1.1 および HTTP/2 対応クライアント。",
        code: `HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .build();

// 同期リクエスト
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .header("Accept", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString());
System.out.println(response.body());

// 非同期リクエスト
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);

// POSTリクエスト
HttpRequest postReq = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"name\\":\\"Alice\\"}"))
    .build();`,
      },
      {
        title: "String の新メソッド",
        description: "isBlank(), lines(), strip(), repeat() などの便利メソッドが追加。",
        code: `// isBlank - 空白のみかチェック
"  ".isBlank();          // true
"Hello".isBlank();       // false

// lines - 行ごとにStream分割
"line1\\nline2\\nline3".lines()
    .forEach(System.out::println);

// strip - Unicode対応のtrim
"  Hello  ".strip();         // "Hello"
"  Hello  ".stripLeading();  // "Hello  "
"  Hello  ".stripTrailing(); // "  Hello"

// repeat - 文字列の繰り返し
"Ha".repeat(3);              // "HaHaHa"`,
      },
      {
        title: "ファイル読み書きの簡素化",
        description: "Files.readString / writeString で1行でファイル操作が可能に。",
        code: `// ファイル読み込み
String content = Files.readString(Path.of("file.txt"));

// ファイル書き込み
Files.writeString(
    Path.of("output.txt"),
    "Hello, World!",
    StandardOpenOption.CREATE
);`,
      },
      {
        title: "ラムダ引数での var 使用",
        description: "ラムダ式のパラメータにvarを使用でき、アノテーションの付与が可能に。",
        code: `// varを使用してアノテーションを付与
list.stream()
    .map((@NotNull var s) -> s.toUpperCase())
    .collect(Collectors.toList());`,
      },
      {
        title: "単一ファイル実行",
        description: "javacなしで単一のJavaファイルを直接実行可能に。",
        code: `// HelloWorld.java を直接実行
$ java HelloWorld.java

// シバン行でスクリプトとしても実行可能
#!/usr/bin/java --source 11
public class Script {
    public static void main(String[] args) {
        System.out.println("スクリプトとして実行！");
    }
}`,
      },
    ],
  },
  {
    id: "java-12",
    version: 12,
    name: "Java 12",
    releaseDate: "2019年3月",
    lts: false,
    color: "var(--color-dads-cyan)",
    summary: "Switch式 (プレビュー)、Stringの新メソッド、Collectors.teeing など",
    features: [
      {
        title: "Switch式 (プレビュー)",
        description: "switchを式として使用可能に。アロー構文で記述する。",
        code: `// 従来のswitch文
String text;
switch (day) {
    case MONDAY:
    case FRIDAY:
        text = "平日";
        break;
    case SATURDAY:
    case SUNDAY:
        text = "週末";
        break;
    default:
        text = "その他";
}

// Java 12 switch式（プレビュー）
String text = switch (day) {
    case MONDAY, FRIDAY -> "平日";
    case SATURDAY, SUNDAY -> "週末";
    default -> "その他";
};`,
      },
      {
        title: "String の indent / transform",
        description: "文字列のインデント調整と変換メソッド。",
        code: `// indent - 各行にインデントを追加
String indented = "Hello\\nWorld".indent(4);
// "    Hello\\n    World\\n"

// transform - 変換パイプライン
String result = "hello"
    .transform(s -> s + " world")
    .transform(String::toUpperCase);
// "HELLO WORLD"`,
      },
      {
        title: "Collectors.teeing",
        description: "2つのCollectorを同時に実行し、結果をマージする。",
        code: `// 平均と個数を同時に計算
var result = Stream.of(1, 2, 3, 4, 5)
    .collect(Collectors.teeing(
        Collectors.averagingInt(Integer::intValue),
        Collectors.counting(),
        (avg, count) -> "平均: " + avg + ", 個数: " + count
    ));
// "平均: 3.0, 個数: 5"`,
      },
      {
        title: "CompactNumberFormat",
        description: "数値を短い形式（1K, 1Mなど）でフォーマット。",
        code: `NumberFormat fmt = NumberFormat.getCompactNumberInstance(
    Locale.JAPANESE, NumberFormat.Style.SHORT);
System.out.println(fmt.format(1000));      // "1千"
System.out.println(fmt.format(1000000));   // "100万"

NumberFormat fmtEn = NumberFormat.getCompactNumberInstance(
    Locale.US, NumberFormat.Style.SHORT);
System.out.println(fmtEn.format(1000));    // "1K"
System.out.println(fmtEn.format(1000000)); // "1M"`,
      },
    ],
  },
  {
    id: "java-13",
    version: 13,
    name: "Java 13",
    releaseDate: "2019年9月",
    lts: false,
    color: "var(--color-dads-purple)",
    summary: "テキストブロック (プレビュー)、Switch式のyield (プレビュー)",
    features: [
      {
        title: "テキストブロック (プレビュー)",
        description: '三重引用符 (""") で複数行の文字列リテラルを記述可能。',
        code: `// Java 12以前
String json = "{\\n" +
    "  \\"name\\": \\"Alice\\",\\n" +
    "  \\"age\\": 30\\n" +
    "}";

// Java 13 テキストブロック（プレビュー）
String json = """
        {
          "name": "Alice",
          "age": 30
        }
        """;

// HTMLテンプレート
String html = """
        <html>
            <body>
                <p>Hello, World!</p>
            </body>
        </html>
        """;`,
      },
      {
        title: "Switch式の yield キーワード",
        description: "switchブロック内で値を返すためのyieldキーワード。",
        code: `// アロー構文（単純な場合）
String result = switch (status) {
    case 0 -> "成功";
    case 1 -> "警告";
    default -> "エラー";
};

// ブロック + yield（複雑な処理の場合）
String result = switch (status) {
    case 0 -> "成功";
    case 1 -> {
        logger.warn("Warning detected");
        yield "警告";
    }
    default -> {
        logger.error("Error: " + status);
        yield "エラー";
    }
};`,
      },
    ],
  },
  {
    id: "java-14",
    version: 14,
    name: "Java 14",
    releaseDate: "2020年3月",
    lts: false,
    color: "var(--color-dads-error)",
    summary: "Switch式 (正式版)、Records (プレビュー)、instanceof パターンマッチング (プレビュー)、NullPointerException改善",
    features: [
      {
        title: "Switch式 (正式版)",
        description: "Java 12, 13でプレビューだったSwitch式が正式機能に。",
        code: `// switch式（正式版）
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY              -> 9;
};`,
      },
      {
        title: "Records (プレビュー)",
        description: "不変データクラスを簡潔に定義。equals, hashCode, toStringが自動生成される。",
        code: `// 従来のデータクラス（ボイラープレートが多い）
public class Point {
    private final int x;
    private final int y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    public int x() { return x; }
    public int y() { return y; }
    // equals, hashCode, toString も必要...
}

// Java 14 Record（プレビュー）
public record Point(int x, int y) {}

// 使用例
var p = new Point(1, 2);
System.out.println(p.x());     // 1
System.out.println(p);         // Point[x=1, y=2]

// カスタムコンストラクタ
public record Range(int min, int max) {
    public Range {
        if (min > max) throw new IllegalArgumentException();
    }
}`,
      },
      {
        title: "instanceof パターンマッチング (プレビュー)",
        description: "instanceofチェック後の明示的なキャストが不要に。",
        code: `// Java 13以前
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Java 14 パターンマッチング（プレビュー）
if (obj instanceof String s) {
    System.out.println(s.length());
}

// 条件も追加可能
if (obj instanceof String s && s.length() > 5) {
    System.out.println(s.toUpperCase());
}`,
      },
      {
        title: "NullPointerException の改善",
        description: "どの変数がnullだったかを具体的に示すメッセージ。",
        code: `// Java 13以前
// Exception: java.lang.NullPointerException

// Java 14
// java.lang.NullPointerException:
//   Cannot invoke "String.length()" because "user.getName()" is null

// 例
user.getAddress().getCity().getName();
// NullPointerException:
//   Cannot invoke "City.getName()" because
//   the return value of "Address.getCity()" is null`,
      },
    ],
  },
  {
    id: "java-15",
    version: 15,
    name: "Java 15",
    releaseDate: "2020年9月",
    lts: false,
    color: "var(--color-dads-purple)",
    summary: "テキストブロック (正式版)、Sealed Classes (プレビュー)、Recordsの改善",
    features: [
      {
        title: "テキストブロック (正式版)",
        description: "Java 13, 14でプレビューだったテキストブロックが正式機能に。",
        code: `// テキストブロック（正式版）
String query = """
        SELECT id, name, email
        FROM users
        WHERE active = true
        ORDER BY name
        """;

// エスケープシーケンス
String text = """
        行の最後のスペース保持\\s
        改行なしで次の行に続く\\
        次の行の内容
        """;`,
      },
      {
        title: "Sealed Classes (プレビュー)",
        description: "クラスの継承を指定したクラスのみに制限する。",
        code: `// Sealed Class（プレビュー）
public sealed class Shape
    permits Circle, Rectangle, Triangle {
}

public final class Circle extends Shape {
    private final double radius;
    public Circle(double radius) { this.radius = radius; }
}

public final class Rectangle extends Shape {
    private final double width, height;
    public Rectangle(double w, double h) {
        this.width = w; this.height = h;
    }
}

public non-sealed class Triangle extends Shape {
    // non-sealed: さらにサブクラスを許可
}`,
      },
      {
        title: "Hidden Classes",
        description: "フレームワークが動的にクラスを生成するための仕組み。直接利用は想定されていない。",
        code: `// フレームワーク/ライブラリ開発者向け
// 動的プロキシやラムダ式の実装に使用される
Lookup lookup = MethodHandles.lookup();
Class<?> hiddenClass = lookup.defineHiddenClass(
    classBytes,
    true,
    ClassOption.NESTMATE
).lookupClass();`,
      },
    ],
  },
  {
    id: "java-16",
    version: 16,
    name: "Java 16",
    releaseDate: "2021年3月",
    lts: false,
    color: "var(--color-dads-success)",
    summary: "Records (正式版)、instanceof パターンマッチング (正式版)、Stream.toList()",
    features: [
      {
        title: "Records (正式版)",
        description: "Java 14, 15でプレビューだったRecordが正式機能に。",
        code: `// Record（正式版）
public record User(String name, String email, int age) {
    // コンパクトコンストラクタ
    public User {
        Objects.requireNonNull(name);
        Objects.requireNonNull(email);
        if (age < 0) throw new IllegalArgumentException();
    }

    // カスタムメソッド
    public String displayName() {
        return name + " <" + email + ">";
    }
}

// ローカルRecord
void process() {
    record Pair(String key, int value) {}
    var pair = new Pair("test", 42);
}`,
      },
      {
        title: "instanceof パターンマッチング (正式版)",
        description: "Java 14, 15でプレビューだったinstanceofパターンマッチングが正式機能に。",
        code: `// パターンマッチング（正式版）
public boolean equals(Object o) {
    return o instanceof Point p
        && this.x == p.x
        && this.y == p.y;
}

// ガード条件付き
if (obj instanceof String s && !s.isEmpty()) {
    System.out.println(s);
}`,
      },
      {
        title: "Stream.toList()",
        description: "Stream結果を不変リストに変換する簡潔なメソッド。",
        code: `// Java 15以前
List<String> list = stream
    .collect(Collectors.toList());

// Java 16
List<String> list = stream.toList();

// 注意: toList() は不変リストを返す
var numbers = Stream.of(1, 2, 3).toList();
// numbers.add(4); // UnsupportedOperationException`,
      },
    ],
  },
  {
    id: "java-17",
    version: 17,
    name: "Java 17",
    releaseDate: "2021年9月",
    lts: true,
    color: "var(--color-dads-blue)",
    summary: "LTS版。Sealed Classes (正式版)、switchのパターンマッチング (プレビュー)、新しい乱数API",
    features: [
      {
        title: "Sealed Classes (正式版)",
        description: "継承を特定のクラスに制限する機能が正式に。代数的データ型をJavaで表現可能に。",
        code: `// Sealed Class（正式版）
public sealed interface Shape
    permits Circle, Rectangle, Triangle {}

public record Circle(double radius) implements Shape {}
public record Rectangle(double width, double height) implements Shape {}
public record Triangle(double a, double b, double c) implements Shape {}

// パターンマッチングと組み合わせ（将来）
double area = switch (shape) {
    case Circle c    -> Math.PI * c.radius() * c.radius();
    case Rectangle r -> r.width() * r.height();
    case Triangle t  -> calculateTriangle(t);
};`,
      },
      {
        title: "switch のパターンマッチング (プレビュー)",
        description: "switch文/式で型パターンやガード条件を使用可能に。",
        code: `// 型パターン（プレビュー）
static String format(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("整数: %d", i);
        case Long l    -> String.format("長整数: %d", l);
        case Double d  -> String.format("小数: %.2f", d);
        case String s  -> String.format("文字列: %s", s);
        case null      -> "null";
        default        -> obj.toString();
    };
}`,
      },
      {
        title: "新しい乱数生成API",
        description: "統一された乱数生成インターフェースと新しいアルゴリズム。",
        code: `// 新しい乱数API
RandomGenerator rng = RandomGeneratorFactory
    .of("L128X1024MixRandom")
    .create();

// 基本的な使用
int randomInt = rng.nextInt(100);
double randomDouble = rng.nextDouble();

// ストリーム生成
IntStream ints = rng.ints(10, 0, 100);

// ジャンプ可能な乱数生成器
RandomGenerator.JumpableGenerator jrng =
    (RandomGenerator.JumpableGenerator)
    RandomGeneratorFactory.of("Xoshiro256PlusPlus").create();
jrng.jump(); // 状態をジャンプ`,
      },
    ],
  },
  {
    id: "java-18",
    version: 18,
    name: "Java 18",
    releaseDate: "2022年3月",
    lts: false,
    color: "var(--color-dads-cyan)",
    summary: "UTF-8がデフォルト、シンプルWebサーバー、javadocのコードスニペット",
    features: [
      {
        title: "UTF-8がデフォルト文字エンコーディングに",
        description: "プラットフォーム間でのエンコーディングの一貫性が保証される。",
        code: `// Java 17以前 - プラットフォームにより異なる
// Windows: windows-1252
// macOS/Linux: UTF-8

// Java 18 - すべてのプラットフォームでUTF-8
Charset defaultCharset = Charset.defaultCharset();
// -> UTF-8 （どのOSでも）

// FileReaderのデフォルトもUTF-8
var reader = new FileReader("file.txt"); // UTF-8で読み込み`,
      },
      {
        title: "シンプルWebサーバー",
        description: "静的ファイルを配信する簡易HTTPサーバーを1コマンドで起動。",
        code: `// コマンドラインから起動
$ jwebserver
// -> localhost:8000 でサーバー起動

// ポートとディレクトリを指定
$ jwebserver -p 9000 -d /path/to/files

// Java APIからも使用可能
var server = SimpleFileServer.createFileServer(
    new InetSocketAddress(8080),
    Path.of("/www"),
    SimpleFileServer.OutputLevel.INFO
);
server.start();`,
      },
      {
        title: "javadoc の @snippet タグ",
        description: "javadocにコードスニペットを埋め込む新しい方法。",
        code: `/**
 * 使用例:
 * {@snippet :
 *     List<String> list = List.of("a", "b", "c");
 *     list.forEach(System.out::println);  // @highlight
 * }
 *
 * 外部ファイルからスニペットを読み込み:
 * {@snippet file="Example.java" region="main"}
 */
public class MyClass { }`,
      },
    ],
  },
  {
    id: "java-19",
    version: 19,
    name: "Java 19",
    releaseDate: "2022年9月",
    lts: false,
    color: "var(--color-dads-warning)",
    summary: "Virtual Threads (プレビュー)、Structured Concurrency (インキュベーター)、Record Patterns (プレビュー)",
    features: [
      {
        title: "Virtual Threads (プレビュー)",
        description: "軽量スレッドにより、大量の並行処理を低コストで実現。",
        code: `// Virtual Threadの作成
Thread vThread = Thread.ofVirtual().start(() -> {
    System.out.println("Virtual Thread!");
});

// ExecutorServiceとの統合
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // 100万個のタスクも軽量に処理
    IntStream.range(0, 1_000_000).forEach(i -> {
        executor.submit(() -> {
            Thread.sleep(Duration.ofSeconds(1));
            return i;
        });
    });
}`,
      },
      {
        title: "Record Patterns (プレビュー)",
        description: "Recordの構成要素をパターンマッチングで分解（デストラクチャリング）。",
        code: `record Point(int x, int y) {}

// Record Pattern（プレビュー）
if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y);
}

// ネストしたパターン
record Line(Point start, Point end) {}

if (obj instanceof Line(Point(var x1, var y1), Point(var x2, var y2))) {
    double length = Math.sqrt(
        Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}`,
      },
      {
        title: "Structured Concurrency (インキュベーター)",
        description: "並行タスクのライフサイクルを構造化して管理する。",
        code: `// Structured Concurrency（インキュベーター）
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<String> user = scope.fork(() -> findUser(id));
    Subtask<Integer> order = scope.fork(() -> fetchOrder(id));

    scope.join();           // 両方のタスクを待機
    scope.throwIfFailed();  // エラーがあれば例外

    return new Response(user.get(), order.get());
}`,
      },
    ],
  },
  {
    id: "java-20",
    version: 20,
    name: "Java 20",
    releaseDate: "2023年3月",
    lts: false,
    color: "var(--color-dads-cyan)",
    summary: "Scoped Values (インキュベーター)、Virtual Threads / Record Patterns の改善",
    features: [
      {
        title: "Scoped Values (インキュベーター)",
        description: "スレッド内で安全にデータを共有する仕組み。ThreadLocalの代替。",
        code: `// Scoped Values（インキュベーター）
private static final ScopedValue<String> USER =
    ScopedValue.newInstance();

void handleRequest(String username) {
    ScopedValue.where(USER, username).run(() -> {
        // このスコープ内でUSERにアクセス可能
        processRequest();
    });
}

void processRequest() {
    String user = USER.get(); // "Alice"
    // ...
}`,
      },
      {
        title: "Record Patterns の改善",
        description: "switch文でのRecord Patternsがより柔軟に。",
        code: `sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

// switch でのRecord Pattern
double area = switch (shape) {
    case Circle(var r)       -> Math.PI * r * r;
    case Rectangle(var w, var h) -> w * h;
};`,
      },
      {
        title: "Virtual Threads の改善 (第2プレビュー)",
        description: "Virtual Threadsの安定性とパフォーマンスが向上。",
        code: `// Thread.Builder API
Thread.Builder builder = Thread.ofVirtual().name("worker-", 0);

// ThreadFactoryとして使用
ThreadFactory factory = builder.factory();

// ExecutorService
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    List<Future<String>> futures = executor.invokeAll(
        List.of(
            () -> fetchFromApi("https://api1.example.com"),
            () -> fetchFromApi("https://api2.example.com"),
            () -> fetchFromApi("https://api3.example.com")
        )
    );
}`,
      },
    ],
  },
  {
    id: "java-21",
    version: 21,
    name: "Java 21",
    releaseDate: "2023年9月",
    lts: true,
    color: "var(--color-dads-blue)",
    summary: "LTS版。Virtual Threads (正式版)、Pattern Matching完成形、Sequenced Collections、String Templates (プレビュー)",
    features: [
      {
        title: "Virtual Threads (正式版)",
        description: "軽量スレッドが正式機能に。大量の並行I/O処理を効率的に実行。",
        code: `// Virtual Threadの基本的な使い方
Thread.startVirtualThread(() -> {
    System.out.println("Virtual Thread実行中");
});

// ExecutorServiceとの統合（推奨）
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // HTTPサーバーのハンドラなど
    executor.submit(() -> handleRequest(request));
}

// Spring Boot等でも自動的に活用可能
// application.properties:
// spring.threads.virtual.enabled=true`,
      },
      {
        title: "switch のパターンマッチング (正式版)",
        description: "型パターン、ガード条件、null処理を含む完全なパターンマッチング。",
        code: `// 完全なパターンマッチング（正式版）
String describe(Object obj) {
    return switch (obj) {
        case null              -> "null値";
        case Integer i when i < 0 -> "負の整数: " + i;
        case Integer i         -> "整数: " + i;
        case String s when s.isEmpty() -> "空文字列";
        case String s          -> "文字列: " + s;
        case int[] arr         -> "配列（長さ: " + arr.length + "）";
        default                -> "その他: " + obj;
    };
}`,
      },
      {
        title: "Record Patterns (正式版)",
        description: "Recordの分解パターンが正式機能に。ネストしたパターンも対応。",
        code: `sealed interface Expr permits Num, Add, Mul {}
record Num(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}
record Mul(Expr left, Expr right) implements Expr {}

// 再帰的なパターンマッチング
int eval(Expr expr) {
    return switch (expr) {
        case Num(var v)                    -> v;
        case Add(var left, var right)      -> eval(left) + eval(right);
        case Mul(var left, var right)      -> eval(left) * eval(right);
    };
}

// Expr: (1 + 2) * 3
Expr expr = new Mul(new Add(new Num(1), new Num(2)), new Num(3));
int result = eval(expr); // 9`,
      },
      {
        title: "Sequenced Collections",
        description: "要素の順序を持つコレクションに共通のインターフェースを導入。",
        code: `// SequencedCollection - 順序付きコレクション
SequencedCollection<String> list = new ArrayList<>(
    List.of("a", "b", "c"));

list.getFirst();      // "a"
list.getLast();        // "c"
list.addFirst("z");
list.addLast("d");
list.reversed();      // 逆順ビュー

// SequencedMap
SequencedMap<String, Integer> map = new LinkedHashMap<>();
map.put("one", 1);
map.put("two", 2);

map.firstEntry();     // one=1
map.lastEntry();      // two=2
map.pollFirstEntry(); // one=1を取得して削除`,
      },
      {
        title: "String Templates (プレビュー)",
        description: "安全な文字列補間。SQLインジェクション防止などにも活用。",
        code: `// String Templates（プレビュー）
String name = "Alice";
int age = 30;

// STR テンプレートプロセッサ
String msg = STR."Hello \\{name}, you are \\{age} years old";
// "Hello Alice, you are 30 years old"

// 式も埋め込み可能
String calc = STR."\\{name} will be \\{age + 10} in 10 years";

// 複数行
String json = STR."""
    {
        "name": "\\{name}",
        "age": \\{age}
    }
    """;`,
      },
      {
        title: "Unnamed Patterns と Variables",
        description: "使用しない変数やパターンをアンダースコア (_) で明示。",
        code: `// 未使用変数
try {
    // ...
} catch (Exception _) {
    // 例外変数を使わない場合
    System.out.println("エラーが発生しました");
}

// switch での未使用パターン
switch (obj) {
    case Point(var x, _) -> System.out.println("x=" + x);
    // y座標は不要
}

// ラムダの未使用パラメータ
map.forEach((_, value) -> System.out.println(value));`,
      },
    ],
  },
  {
    id: "java-22",
    version: 22,
    name: "Java 22",
    releaseDate: "2024年3月",
    lts: false,
    color: "var(--color-dads-purple)",
    summary: "Unnamed Variables (正式版)、Statements before super() (プレビュー)、Stream Gatherers (プレビュー)",
    features: [
      {
        title: "Unnamed Variables と Patterns (正式版)",
        description: "アンダースコア(_)で使用しない変数・パターンを明示する機能が正式化。",
        code: `// catch句
try {
    Integer.parseInt(str);
} catch (NumberFormatException _) {
    System.out.println("数値ではありません");
}

// for-each
int count = 0;
for (var _ : collection) {
    count++;
}

// switch pattern
switch (obj) {
    case Circle(var r) -> computeArea(r);
    case Rectangle(_, var h) -> h; // 幅は不要
    default -> 0;
}`,
      },
      {
        title: "Statements before super() (プレビュー)",
        description: "コンストラクタでsuper()の前に文を記述可能に。バリデーションが容易に。",
        code: `// Java 21以前 - super()の前に文を書けない
public class PositiveInteger extends Number {
    public PositiveInteger(int value) {
        // if (value <= 0) throw ... // コンパイルエラー！
        super(value);
    }
}

// Java 22（プレビュー）- super()の前にバリデーション
public class PositiveInteger extends Number {
    public PositiveInteger(int value) {
        if (value <= 0) {
            throw new IllegalArgumentException(
                "値は正数でなければなりません: " + value);
        }
        super(value);
    }
}`,
      },
      {
        title: "Stream Gatherers (プレビュー)",
        description: "Streamの中間操作をカスタム定義できる新API。",
        code: `// Stream Gatherers（プレビュー）
// 固定サイズのウィンドウ
List<List<Integer>> windows = Stream.of(1, 2, 3, 4, 5)
    .gather(Gatherers.windowFixed(3))
    .toList();
// [[1, 2, 3], [4, 5]]

// スライディングウィンドウ
List<List<Integer>> sliding = Stream.of(1, 2, 3, 4, 5)
    .gather(Gatherers.windowSliding(3))
    .toList();
// [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// fold（畳み込み）
Optional<String> result = Stream.of("a", "b", "c")
    .gather(Gatherers.fold(() -> "",
        (acc, elem) -> acc + elem))
    .findFirst();
// "abc"`,
      },
    ],
  },
  {
    id: "java-23",
    version: 23,
    name: "Java 23",
    releaseDate: "2024年9月",
    lts: false,
    color: "var(--color-dads-cyan)",
    summary: "Primitive Types in Patterns (プレビュー)、Markdown javadoc、Structured Concurrency / Scoped Values (プレビュー)",
    features: [
      {
        title: "Primitive Types in Patterns (プレビュー)",
        description: "パターンマッチングでプリミティブ型を直接使用可能に。",
        code: `// プリミティブ型のパターンマッチング（プレビュー）
String describe(Object obj) {
    return switch (obj) {
        case int i when i > 0    -> "正の整数";
        case int i               -> "整数: " + i;
        case double d when d > 0 -> "正の小数";
        case double d            -> "小数: " + d;
        default                  -> "その他";
    };
}

// instanceof でもプリミティブ型が使用可能
if (obj instanceof int i) {
    System.out.println("整数値: " + i);
}`,
      },
      {
        title: "Markdown Javadoc コメント",
        description: "JavadocでMarkdown形式のコメントが記述可能に。",
        code: `/// # ユーザーサービス
///
/// ユーザーの **CRUD操作** を提供するサービスクラス。
///
/// ## 使用例
///
/// \`\`\`java
/// var service = new UserService();
/// var user = service.findById(1);
/// \`\`\`
///
/// - [User] エンティティを操作する
/// - スレッドセーフではない
///
/// @param id ユーザーID
/// @return ユーザーオブジェクト
public User findById(int id) { ... }`,
      },
      {
        title: "Structured Concurrency (第3プレビュー)",
        description: "構造化された並行処理の改善版。",
        code: `// Structured Concurrency（第3プレビュー）
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Subtask<User> userTask = scope.fork(() -> fetchUser(id));
    Subtask<List<Order>> ordersTask = scope.fork(() -> fetchOrders(id));

    scope.join();
    scope.throwIfFailed();

    // 両方の結果を組み合わせ
    return new UserProfile(userTask.get(), ordersTask.get());
}

// ShutdownOnSuccess - 最初に成功したものを使用
try (var scope = new StructuredTaskScope.ShutdownOnSuccess<String>()) {
    scope.fork(() -> fetchFromMirror1());
    scope.fork(() -> fetchFromMirror2());
    scope.fork(() -> fetchFromMirror3());

    scope.join();
    return scope.result(); // 最初の成功結果
}`,
      },
      {
        title: "Stream Gatherers (第2プレビュー)",
        description: "カスタム中間操作の改善。",
        code: `// カスタムGathererの作成
Gatherer<String, ?, String> distinctByLength =
    Gatherer.ofSequential(
        () -> new HashSet<Integer>(),
        (state, element, downstream) -> {
            if (state.add(element.length())) {
                downstream.push(element);
                return true;
            }
            return true;
        }
    );

// 使用
List<String> result = Stream.of("a", "bb", "c", "dd", "eee")
    .gather(distinctByLength)
    .toList();
// ["a", "bb", "eee"]`,
      },
    ],
  },
  {
    id: "java-24",
    version: 24,
    name: "Java 24",
    releaseDate: "2025年3月",
    lts: false,
    color: "var(--color-dads-warning)",
    summary: "Stream Gatherers (正式版)、Flexible Constructor Bodies (第2プレビュー)、Scoped Values / Structured Concurrency の改善",
    features: [
      {
        title: "Stream Gatherers (正式版)",
        description: "カスタムStreamの中間操作が正式機能に。",
        code: `// Stream Gatherers（正式版）
// 固定ウィンドウ
var batches = Stream.of(1, 2, 3, 4, 5, 6, 7)
    .gather(Gatherers.windowFixed(3))
    .toList();
// [[1, 2, 3], [4, 5, 6], [7]]

// スライディングウィンドウ
var sliding = Stream.of(1, 2, 3, 4, 5)
    .gather(Gatherers.windowSliding(2))
    .toList();
// [[1, 2], [2, 3], [3, 4], [4, 5]]

// mapConcurrent - 並行マッピング
var results = urls.stream()
    .gather(Gatherers.mapConcurrent(10, url -> fetch(url)))
    .toList();`,
      },
      {
        title: "Flexible Constructor Bodies (第2プレビュー)",
        description: "コンストラクタ内でsuper()/this()の前にフィールドの初期化が可能に。",
        code: `// Flexible Constructor Bodies（第2プレビュー）
public class Server extends BaseServer {
    private final int port;

    public Server(int port) {
        // super()の前にフィールド初期化
        this.port = validatePort(port);
        super(createConfig(port));
    }

    private static int validatePort(int port) {
        if (port < 0 || port > 65535) {
            throw new IllegalArgumentException("Invalid port");
        }
        return port;
    }
}`,
      },
      {
        title: "Scoped Values (第2プレビュー)",
        description: "改善されたスコープ限定値。Virtual Threadsとの統合が強化。",
        code: `// Scoped Values（第2プレビュー）
static final ScopedValue<User> CURRENT_USER = ScopedValue.newInstance();

void handleRequest(Request req) {
    User user = authenticate(req);
    ScopedValue.where(CURRENT_USER, user).run(() -> {
        processBusinessLogic();
        // ネストしたスコープ
        ScopedValue.where(CURRENT_USER, adminUser).run(() -> {
            adminOperation(); // ここではadminUser
        });
        // ここではuserに戻る
    });
}`,
      },
      {
        title: "Class-File API (正式版)",
        description: "Javaクラスファイルを読み書きするための標準API。",
        code: `// Class-File API（正式版）
ClassFile cf = ClassFile.of();

// クラスファイルの生成
byte[] bytes = cf.build(ClassDesc.of("com.example.Hello"),
    clb -> clb.withMethod("greet",
        MethodTypeDesc.of(CD_String),
        ClassFile.ACC_PUBLIC | ClassFile.ACC_STATIC,
        mb -> mb.withCode(cb -> {
            cb.ldc("Hello, World!");
            cb.areturn();
        })
    )
);

// クラスファイルの読み込み
ClassModel model = cf.parse(bytes);
for (var method : model.methods()) {
    System.out.println(method.methodName());
}`,
      },
    ],
  },
  {
    id: "java-25",
    version: 25,
    name: "Java 25",
    releaseDate: "2025年9月",
    lts: true,
    color: "var(--color-dads-blue)",
    summary: "LTS版。Scoped Values (正式版)、Module Import Declarations、Compact Source Files、Flexible Constructor Bodies (正式版)、Compact Object Headers",
    features: [
      {
        title: "Scoped Values (正式版)",
        description: "スレッド内で安全にデータを共有する仕組みが正式機能に。ThreadLocalの代替として、不変で軽量なスコープ限定値を提供する。Virtual Threadsとの相性も良い。",
        code: `// Scoped Values（正式版）
static final ScopedValue<String> CURRENT_USER = ScopedValue.newInstance();

void handleRequest(Request req) {
    String user = authenticate(req);

    // スコープ内でのみ値が有効
    ScopedValue.where(CURRENT_USER, user).run(() -> {
        processRequest();    // CURRENT_USER.get() → user
        auditLog();          // CURRENT_USER.get() → user

        // ネストしたスコープ（一時的に上書き）
        ScopedValue.where(CURRENT_USER, "system").run(() -> {
            systemOperation(); // CURRENT_USER.get() → "system"
        });
        // 元のスコープに戻る
        // CURRENT_USER.get() → user
    });
    // スコープ外 → CURRENT_USER.get() は NoSuchElementException
}

// ThreadLocal との違い:
// - ScopedValue は不変（set() がない）
// - スコープ終了時に自動クリーンアップ
// - Virtual Thread でもメモリ効率が良い`,
      },
      {
        title: "Module Import Declarations (正式版)",
        description: "モジュール単位でインポートを宣言できる機能。モジュールがエクスポートする全パッケージを一括インポートでき、コードの冒頭のimport文を大幅に削減できる。",
        code: `// モジュールインポート宣言（正式版）
// java.baseモジュールの全パッケージを一括インポート
import module java.base;

// java.sqlモジュールの全パッケージを一括インポート
import module java.sql;

// これにより以下の個別importが不要に:
// import java.util.*;
// import java.util.stream.*;
// import java.io.*;
// import java.nio.file.*;
// import java.sql.*;
// ...

public class Example {
    public static void main(String[] args) {
        // List, Map, Stream 等がそのまま使える
        var list = List.of("a", "b", "c");
        var result = list.stream()
            .filter(s -> !s.isEmpty())
            .toList();

        // Path, Files もそのまま使える
        var path = Path.of("file.txt");
        var content = Files.readString(path);
    }
}`,
      },
      {
        title: "Compact Source Files (正式版)",
        description: "初心者向けに、mainメソッドの宣言やクラス宣言を省略できる機能が正式化。小さなプログラムを簡潔に記述できる。",
        code: `// Java 24以前
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// Java 25 Compact Source Files（正式版）
// クラス宣言もmainの修飾子も不要
void main() {
    println("Hello, World!");
}

// インスタンスメインメソッド
// java.io.IO のメソッドが暗黙的に利用可能
void main() {
    String name = readln("名前を入力: ");
    println("こんにちは、" + name + "さん！");

    // 複数行入力
    println("趣味を入力（空行で終了）:");
    var hobbies = new ArrayList<String>();
    String line;
    while (!(line = readln()).isEmpty()) {
        hobbies.add(line);
    }
    println("趣味: " + hobbies);
}`,
      },
      {
        title: "Flexible Constructor Bodies (正式版)",
        description: "コンストラクタでsuper()やthis()の前にフィールド初期化やバリデーションを行える機能が正式化。",
        code: `// Flexible Constructor Bodies（正式版）
public class PositiveRange extends Range {
    private final int validatedMin;
    private final int validatedMax;

    public PositiveRange(int min, int max) {
        // super()の前にバリデーションとフィールド初期化が可能
        if (min < 0 || max < 0) {
            throw new IllegalArgumentException("負の値は不可");
        }
        if (min > max) {
            throw new IllegalArgumentException("min > max");
        }
        this.validatedMin = min;
        this.validatedMax = max;
        super(min, max); // バリデーション後にsuper()呼び出し
    }
}

// this()の前でも同様
public class Server {
    public Server(String host, int port) {
        // this()の前でバリデーション
        Objects.requireNonNull(host, "host is null");
        if (port < 0 || port > 65535) {
            throw new IllegalArgumentException("Invalid port: " + port);
        }
        this(host + ":" + port);
    }

    private Server(String address) { /* ... */ }
}`,
      },
      {
        title: "Compact Object Headers",
        description: "オブジェクトヘッダーのサイズを従来の128ビットから64ビットに縮小。メモリ使用量を削減し、データ密度とGC効率を向上させる。",
        code: `// Compact Object Headers（JEP 519）
// オブジェクトヘッダーが128ビット → 64ビットに縮小

// 効果: ヒープ使用量が約10-20%削減
// 特に小さなオブジェクトが多いアプリケーションで効果大

// 有効化（デフォルトで有効）
// java -XX:+UseCompactObjectHeaders MyApp

// 確認方法
// java -XX:+PrintFlagsFinal -version 2>&1 | grep CompactObjectHeaders

// メモリ効率の改善例:
// Integer オブジェクト: 16バイト → 12バイト (25%削減)
// Boolean オブジェクト: 16バイト → 9バイト  (44%削減)
// 空の ArrayList:      40バイト → 32バイト (20%削減)

// 大量のオブジェクトを扱うアプリケーションで
// ヒープサイズの削減とGCの効率化が期待できる`,
      },
      {
        title: "Key Derivation Function API (正式版)",
        description: "秘密鍵から追加の鍵を導出するための標準API。TLS、暗号プロトコルの実装に使用される。",
        code: `// Key Derivation Function API（正式版）
import javax.crypto.KDF;

// HKDF（HMAC-based Key Derivation Function）の使用
KDF hkdf = KDF.getInstance("HKDF-SHA256");

// 入力鍵マテリアルから鍵を導出
SecretKey inputKey = /* 元の秘密鍵 */;

// Extract-then-Expand
KDF.Parameters params = HKDFParameterSpec.expandOnly(
    inputKey,
    "application-key".getBytes(),  // info
    32                              // 出力長（バイト）
);

SecretKey derivedKey = hkdf.deriveKey("AES", params);

// 複数の鍵を同じ入力から導出
SecretKey encKey = hkdf.deriveKey("AES",
    HKDFParameterSpec.expandOnly(inputKey, "enc".getBytes(), 32));
SecretKey macKey = hkdf.deriveKey("HmacSHA256",
    HKDFParameterSpec.expandOnly(inputKey, "mac".getBytes(), 32));`,
      },
    ],
  },
  {
    id: "java-26",
    version: 26,
    name: "Java 26",
    releaseDate: "2026年3月",
    lts: false,
    color: "var(--color-dads-cyan)",
    summary: "HTTP/3対応、Ahead-of-Time Object Caching、G1 GCスループット改善、Applet API削除",
    features: [
      {
        title: "HTTP/3 for HTTP Client API (正式版)",
        description: "標準HTTPクライアントがHTTP/3（QUIC）プロトコルに対応。低遅延・高信頼性のHTTP通信が可能に。",
        code: `// HTTP/3 対応（正式版）
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_3) // HTTP/3を指定
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .header("Accept", "application/json")
    .GET()
    .build();

// HTTP/3 で通信（QUICベース）
HttpResponse<String> response = client.send(
    request, HttpResponse.BodyHandlers.ofString());

System.out.println("Protocol: " + response.version()); // HTTP_3
System.out.println("Body: " + response.body());

// HTTP/3 の利点:
// - QUIC（UDPベース）による低遅延接続
// - ヘッドオブラインブロッキングの解消
// - 接続の高速なマイグレーション（WiFi↔モバイル）
// - TLS 1.3 が組み込み

// 非同期リクエストも同様に利用可能
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);`,
      },
      {
        title: "Ahead-of-Time Object Caching",
        description: "事前コンパイル時にオブジェクトをキャッシュし、アプリケーションの起動時間とウォームアップ時間を大幅に短縮。ZGCを含むすべてのGCで利用可能に。",
        code: `// Ahead-of-Time Object Caching（JEP 516）
// 任意のGCで AOT キャッシュを利用可能に

// Step 1: トレーニング実行でキャッシュを作成
// $ java -XX:AOTMode=record -XX:AOTConfiguration=app.aotconf -jar app.jar
// $ java -XX:AOTMode=create -XX:AOTConfiguration=app.aotconf \\
//        -XX:AOTCache=app.aot -jar app.jar

// Step 2: キャッシュを使ってアプリケーションを起動
// $ java -XX:AOTCache=app.aot -jar app.jar

// ZGC（低遅延GC）でも利用可能
// $ java -XX:+UseZGC -XX:AOTCache=app.aot -jar app.jar

// 効果:
// - 起動時間の大幅な短縮
// - ウォームアップ時間の短縮
// - クラスのロードとリンクが事前完了
// - String やその他のオブジェクトがキャッシュ済み`,
      },
      {
        title: "G1 GC スループット改善",
        description: "G1ガベージコレクタの同期処理を削減し、スループットを向上。特にマルチスレッド環境での性能が改善される。",
        code: `// G1 GC: Improve Throughput by Reducing Synchronization（JEP 522）
// G1 GCの内部同期を削減してスループットを向上

// G1 GCはJavaのデフォルトGC
// $ java -XX:+UseG1GC MyApp  // デフォルトで有効

// 主な改善点:
// - カードテーブルの更新における同期の削減
// - 並行マーキング中のスレッド間競合の軽減
// - リージョン管理の効率化

// パフォーマンス比較（概算）:
// JDK 25 G1 GC: ベースライン
// JDK 26 G1 GC: スループット約5-15%向上（ワークロード依存）

// GCログで確認
// $ java -Xlog:gc*:file=gc.log -jar app.jar

// JFR（Java Flight Recorder）で詳細なGC分析
// $ java -XX:StartFlightRecording=filename=recording.jfr -jar app.jar`,
      },
      {
        title: "Applet API の削除",
        description: "Java 9で非推奨化され、Java 17で削除予定としてマークされていたApplet APIが完全に削除。",
        code: `// Applet API の削除（JEP 504）
// 以下のクラスとインターフェースが削除:
// - java.applet.Applet
// - java.applet.AppletContext
// - java.applet.AppletStub
// - java.applet.AudioClip
// - javax.swing.JApplet

// 歴史:
// Java 9  (2017): @Deprecated
// Java 17 (2021): @Deprecated(forRemoval=true)
// Java 26 (2026): 完全削除

// 移行ガイド:
// Applet → Java Web Start → デスクトップアプリ or Webアプリ

// 代替手段:
// 1. JavaFX でデスクトップGUIアプリケーション
// 2. Spring Boot + Web フロントエンド
// 3. jpackage でネイティブインストーラー作成
// $ jpackage --input lib --main-jar app.jar \\
//   --main-class com.example.Main --name MyApp`,
      },
      {
        title: "Lazy Constants (第2プレビュー)",
        description: "遅延初期化される定数を安全かつ簡潔に定義するAPI。初回アクセス時にのみ計算され、以降はキャッシュされる。",
        code: `// Lazy Constants（第2プレビュー）
import java.lang.StableValue;

class AppConfig {
    // 遅延初期化される定数
    // 初回アクセス時にのみ計算、以降はキャッシュ
    private static final StableValue<DatabaseConnection> DB_CONN =
        StableValue.of(() -> {
            System.out.println("DB接続を初期化...");
            return new DatabaseConnection("jdbc:...");
        });

    // スレッドセーフに初回アクセス時のみ初期化
    public static DatabaseConnection getConnection() {
        return DB_CONN.get();
    }
}

// 従来のdouble-checked lockingパターンが不要に:
// private static volatile Connection instance;
// public static Connection get() {
//     if (instance == null) {
//         synchronized (AppConfig.class) {
//             if (instance == null) {
//                 instance = new Connection();
//             }
//         }
//     }
//     return instance;
// }`,
      },
    ],
  },
];

import type { DocsChapter } from "../java-docs";

export const apiChapters: DocsChapter[] = [
  {
    id: "string-api",
    title: "String API",
    category: "api",
    description: "String, StringBuilder, StringBuffer, テキストブロック",
    sections: [
      {
        title: "String クラス",
        content:
          "String は不変（immutable）オブジェクトです。一度生成された文字列は変更できません。Java 11以降に多くの便利なメソッドが追加されました。テキストブロック（Java 15+）で複数行文字列を簡潔に記述できます。",
        code: `// 基本操作
String s = "Hello, World!";
s.length();                         // 13
s.charAt(0);                        // 'H'
s.isEmpty();                        // false
s.isBlank();                        // false (Java 11+)
s.contains("World");                // true
s.startsWith("Hello");              // true
s.indexOf("o");                     // 4
s.substring(7, 12);                 // "World"

// 変換
s.toUpperCase();                    // "HELLO, WORLD!"
s.toLowerCase();                    // "hello, world!"
"  hello  ".strip();                // "hello" (Java 11+)
"  hello  ".stripLeading();         // "hello  "
"ha".repeat(3);                     // "hahaha" (Java 11+)
"a,b,c".split(",");                 // ["a", "b", "c"]
String.join("-", "a", "b", "c");    // "a-b-c"
"Hello".replace('l', 'r');          // "Herro"

// フォーマット
"名前: %s, 年齢: %d".formatted("太郎", 25);  // Java 15+
String.format("%.2f", 3.14159);     // "3.14"

// テキストブロック (Java 15+)
String json = """
        {
            "name": "Java",
            "version": 21
        }
        """;

// StringBuilder（可変文字列）
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(" ").append("World");
sb.insert(5, ",");                  // "Hello, World"
sb.reverse();                       // "dlroW ,olleH"
String result = sb.toString();`,
      },
    ],
  },
  {
    id: "number-math",
    title: "数値と Math",
    category: "api",
    description: "ラッパークラス、Math、BigDecimal、オートボクシング",
    sections: [
      {
        title: "数値クラスとMath",
        content:
          "プリミティブ型にはそれぞれラッパークラスがあり、オートボクシングで自動変換されます。Mathクラスは数学関数を提供し、BigDecimalは高精度な10進数計算に使用します。",
        code: `// ラッパークラスとオートボクシング
Integer a = 42;                      // int → Integer（ボクシング）
int b = a;                           // Integer → int（アンボクシング）
Integer.parseInt("123");             // String → int
Integer.valueOf(123);                // int → Integer
Integer.MAX_VALUE;                   // 2147483647
Integer.toBinaryString(10);          // "1010"
Integer.toHexString(255);            // "ff"

// キャッシュ (-128 〜 127)
Integer x = 127, y = 127;
x == y;                              // true（キャッシュ）
Integer p = 128, q = 128;
p == q;                              // false（新規オブジェクト）
p.equals(q);                        // true

// Math クラス
Math.abs(-5);                        // 5
Math.max(3, 7);                      // 7
Math.min(3, 7);                      // 3
Math.pow(2, 10);                     // 1024.0
Math.sqrt(144);                      // 12.0
Math.ceil(2.3);                      // 3.0
Math.floor(2.7);                     // 2.0
Math.round(2.5);                     // 3
Math.random();                       // 0.0 〜 1.0 未満
Math.PI;                             // 3.141592653589793

// BigDecimal（金融計算向け）
BigDecimal price = new BigDecimal("19.99");
BigDecimal tax = new BigDecimal("0.10");
BigDecimal total = price.add(price.multiply(tax))
    .setScale(2, RoundingMode.HALF_UP);  // 21.99

// double の浮動小数点誤差
0.1 + 0.2;                          // 0.30000000000000004
new BigDecimal("0.1").add(new BigDecimal("0.2")); // 0.3`,
      },
    ],
  },
  {
    id: "datetime",
    title: "日付と時刻",
    category: "api",
    description: "LocalDate/Time/DateTime, ZonedDateTime, Duration, Period, フォーマット",
    sections: [
      {
        title: "日付・時刻クラス (Java 8+)",
        content:
          "java.timeパッケージは不変でスレッドセーフな日付・時刻APIを提供します。LocalDate（日付）、LocalTime（時刻）、LocalDateTime（日付+時刻）、ZonedDateTime（タイムゾーン付き）で用途に応じて使い分けます。",
        code: `// 現在の日付・時刻
LocalDate today = LocalDate.now();
LocalTime now = LocalTime.now();
LocalDateTime dateTime = LocalDateTime.now();
ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));

// 生成
LocalDate date = LocalDate.of(2025, 6, 15);
LocalTime time = LocalTime.of(14, 30, 45);
LocalDateTime dt = LocalDateTime.of(date, time);

// 情報取得
date.getYear();                  // 2025
date.getMonth();                 // JUNE
date.getDayOfWeek();             // SUNDAY
date.isLeapYear();               // false

// 加減算（不変 — 新しいオブジェクトを返す）
date.plusDays(10);
date.plusMonths(3);
date.minusYears(1);

// 期間
Period period = Period.between(
    LocalDate.of(2024, 1, 1), LocalDate.of(2025, 6, 15));
// 1年5ヶ月14日

Duration duration = Duration.between(
    LocalTime.of(9, 0), LocalTime.of(17, 30));
duration.toHours();              // 8

// フォーマット
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy年MM月dd日");
date.format(fmt);                // "2025年06月15日"
LocalDate.parse("2025年06月15日", fmt);

// タイムゾーン変換
ZonedDateTime tokyo = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
ZonedDateTime utc = tokyo.withZoneSameInstant(ZoneId.of("UTC"));

// Instant（エポック秒）
Instant instant = Instant.now();
long epochSecond = instant.getEpochSecond();`,
      },
    ],
  },
  {
    id: "regex",
    title: "正規表現",
    category: "api",
    description: "Pattern, Matcher, 文字クラス、量指定子、グループ",
    sections: [
      {
        title: "正規表現の使い方",
        content:
          "java.util.regex パッケージの Pattern と Matcher で正規表現を使用します。Pattern.compile() でパターンをコンパイルし、Matcher でマッチング操作を行います。String クラスの matches(), replaceAll(), split() も内部で正規表現を使用します。",
        code: `// Pattern と Matcher
Pattern pattern = Pattern.compile("\\\\d{3}-\\\\d{4}");
Matcher matcher = pattern.matcher("郵便番号: 100-0001");
matcher.find();                      // true
matcher.group();                     // "100-0001"

// String のメソッド
"abc123".matches(".*\\\\d+");          // true
"a,b,,c".split(",");                // ["a", "b", "", "c"]
"a,b,,c".split(",", -1);           // 末尾の空文字も保持
"Hello World".replaceAll("\\\\w+", "*"); // "* *"

// グループ
Pattern p = Pattern.compile("(\\\\d{4})-(\\\\d{2})-(\\\\d{2})");
Matcher m = p.matcher("日付: 2025-06-15");
if (m.find()) {
    m.group(0);  // "2025-06-15"（全体）
    m.group(1);  // "2025"
    m.group(2);  // "06"
    m.group(3);  // "15"
}

// 名前付きグループ
Pattern np = Pattern.compile(
    "(?<year>\\\\d{4})-(?<month>\\\\d{2})-(?<day>\\\\d{2})");
Matcher nm = np.matcher("2025-06-15");
if (nm.find()) {
    nm.group("year");   // "2025"
    nm.group("month");  // "06"
}

// 主な正規表現パターン
// \\d  数字       \\D  数字以外     \\w  単語文字
// \\s  空白       .   任意の1文字   ^   先頭
// $   末尾       *   0回以上       +   1回以上
// ?   0〜1回     {n}  n回          {n,m} n〜m回
// []  文字クラス  ()  グループ      |   OR

// 全マッチの取得 (Java 9+)
List<String> allNumbers = Pattern.compile("\\\\d+")
    .matcher("abc123def456ghi789")
    .results()
    .map(MatchResult::group)
    .toList();  // [123, 456, 789]`,
      },
    ],
  },
  {
    id: "http-client",
    title: "HttpClient",
    category: "api",
    description: "HTTP通信クライアント、GET/POST、非同期リクエスト (Java 11+)",
    sections: [
      {
        title: "HTTPリクエストの送信",
        content:
          "HttpClientはJava 11で追加されたモダンなHTTPクライアントです。HTTP/2、非同期処理をサポートし、HttpRequest.Builder でリクエストを構築、HttpResponse.BodyHandlers でレスポンスを処理します。",
        code: `// HttpClient の生成
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .followRedirects(HttpClient.Redirect.NORMAL)
    .build();

// GET リクエスト
HttpRequest getReq = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Accept", "application/json")
    .GET()
    .build();

HttpResponse<String> res = client.send(
    getReq, HttpResponse.BodyHandlers.ofString());
res.statusCode();                  // 200
res.body();                        // レスポンスボディ

// POST リクエスト
String json = """
    {"name": "Java", "version": 21}
    """;
HttpRequest postReq = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/items"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(json))
    .build();

// 非同期リクエスト
client.sendAsync(getReq, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println)
    .join();

// ファイルダウンロード
client.send(
    HttpRequest.newBuilder(URI.create("https://example.com/file.zip")).build(),
    HttpResponse.BodyHandlers.ofFile(Path.of("file.zip")));`,
      },
    ],
  },
  {
    id: "reflection",
    title: "リフレクション",
    category: "api",
    description: "Class, Method, Field, Constructor の動的アクセス",
    sections: [
      {
        title: "リフレクションAPI",
        content:
          "リフレクションは実行時にクラスの構造を調べ、メソッドやフィールドに動的にアクセスする機能です。フレームワーク、DI、テストツールで多用されますが、パフォーマンスとセキュリティへの影響があるため、通常のコードでは避けるべきです。",
        code: `// Class オブジェクトの取得
Class<?> cls1 = String.class;
Class<?> cls2 = "Hello".getClass();
Class<?> cls3 = Class.forName("java.lang.String");

// クラス情報の取得
cls1.getName();                    // "java.lang.String"
cls1.getSimpleName();              // "String"
cls1.getSuperclass();              // class java.lang.Object
cls1.getInterfaces();              // [Serializable, ...]
cls1.getModifiers();               // public final

// フィールドのアクセス
class MyClass {
    private String name = "Java";
}
Field field = MyClass.class.getDeclaredField("name");
field.setAccessible(true);         // private でもアクセス可能に
MyClass obj = new MyClass();
String value = (String) field.get(obj);  // "Java"
field.set(obj, "Kotlin");                // 値を変更

// メソッドの呼び出し
Method method = String.class.getMethod("toUpperCase");
String result = (String) method.invoke("hello");  // "HELLO"

// コンストラクタ
Constructor<MyClass> ctor = MyClass.class.getDeclaredConstructor();
MyClass instance = ctor.newInstance();

// アノテーションの取得
Method m = MyClass.class.getMethod("myMethod");
if (m.isAnnotationPresent(Deprecated.class)) {
    Deprecated dep = m.getAnnotation(Deprecated.class);
    System.out.println("since: " + dep.since());
}`,
      },
    ],
  },
];

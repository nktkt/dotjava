import type { DocsChapter } from "../java-docs";

export const languageBasicsChapters: DocsChapter[] = [
  {
    id: "variables",
    title: "変数とデータ型",
    category: "language-basics",
    description: "変数の宣言、命名規則、プリミティブ型とリテラル",
    sections: [
      {
        title: "変数の種類と命名規則",
        content:
          "Javaの変数はインスタンス変数（フィールド）、クラス変数（static）、ローカル変数、パラメータの4種類があります。命名はキャメルケースが慣例で、先頭は文字・$・_ で始まる必要があります。定数は大文字のスネークケースで記述します。",
        code: `public class VariableDemo {
    // インスタンス変数（フィールド）- オブジェクトごとに保持
    private String name;
    private int age;

    // クラス変数（static）- クラスで共有
    static int instanceCount = 0;

    // 定数 - final で変更不可
    static final int MAX_SIZE = 100;
    static final String DEFAULT_NAME = "Unknown";

    public void method(String param) {  // パラメータ
        // ローカル変数 - メソッド内でのみ有効
        int localVar = 10;
        String message = "Hello, " + param;
    }

    // 命名規則
    // ✓ camelCase: userName, totalCount, isValid
    // ✓ 定数: MAX_VALUE, DEFAULT_TIMEOUT
    // ✗ 避けるべき: x, data2, myVar (意味不明)
    // ✗ 不正: 1name, -count, class (予約語)
}`,
      },
      {
        title: "プリミティブ型",
        content:
          "Javaには8つのプリミティブ型があります。整数型（byte, short, int, long）、浮動小数点型（float, double）、文字型（char）、論理型（boolean）です。各型にはサイズと値の範囲が定められています。",
        code: `// 整数型
byte  b = 127;                    // 8bit:  -128 〜 127
short s = 32767;                  // 16bit: -32768 〜 32767
int   i = 2_147_483_647;         // 32bit: 約±21億
long  l = 9_223_372_036_854_775_807L; // 64bit: Lサフィックス必要

// 浮動小数点型
float  f = 3.14f;                // 32bit: fサフィックス必要
double d = 3.141592653589793;    // 64bit: デフォルト

// 文字型
char c = 'A';                    // 16bit Unicode文字
char unicode = '\\u3042';         // 'あ'

// 論理型
boolean flag = true;             // true または false

// リテラルの表記
int decimal  = 255;              // 10進数
int hex      = 0xFF;             // 16進数
int octal    = 0377;             // 8進数
int binary   = 0b1111_1111;      // 2進数 (Java 7+)
long bigNum  = 1_000_000L;       // アンダースコア区切り (Java 7+)

// デフォルト値（フィールドのみ。ローカル変数は初期化必須）
// 数値型: 0, 浮動小数点: 0.0, char: '\\u0000'
// boolean: false, 参照型: null`,
      },
    ],
  },
  {
    id: "operators",
    title: "演算子",
    category: "language-basics",
    description: "算術、比較、論理、ビット、三項、代入演算子の使い方",
    sections: [
      {
        title: "算術・代入・比較演算子",
        content:
          "算術演算子は四則演算と剰余を行います。代入演算子は変数に値を設定します。比較演算子は2つの値を比較してboolean値を返します。プリミティブ型は == で値を比較し、オブジェクトは equals() で比較します。",
        code: `// 算術演算子
int a = 10, b = 3;
a + b;    // 13  加算
a - b;    // 7   減算
a * b;    // 30  乗算
a / b;    // 3   除算（整数）
a % b;    // 1   剰余
10.0 / 3; // 3.333...（浮動小数点）

// インクリメント・デクリメント
int x = 5;
x++;      // 後置: 式の値は5、xは6
++x;      // 前置: 式の値は7、xも7
x--;      // 後置: 式の値は7、xは6

// 代入演算子
x += 5;   // x = x + 5
x -= 3;   // x = x - 3
x *= 2;   // x = x * 2
x /= 4;   // x = x / 4
x %= 3;   // x = x % 3

// 比較演算子
a == b;   // false  等しい
a != b;   // true   等しくない
a > b;    // true   より大きい
a >= b;   // true   以上
a < b;    // false  より小さい
a <= b;   // false  以下`,
      },
      {
        title: "論理・ビット・三項演算子",
        content:
          "論理演算子は条件の結合に使います。&&（AND）と||（OR）は短絡評価を行います。ビット演算子はビット単位の操作、三項演算子は条件による値の選択に使用します。",
        code: `// 論理演算子（短絡評価）
boolean p = true, q = false;
p && q;   // false（AND: 両方true）
p || q;   // true（OR: どちらかtrue）
!p;       // false（NOT: 反転）

// 短絡評価: 左辺で結果が確定すれば右辺は評価されない
String s = null;
if (s != null && s.length() > 0) { /* 安全 */ }

// ビット演算子
int x = 0b1010, y = 0b1100;
x & y;    // 0b1000 (AND)
x | y;    // 0b1110 (OR)
x ^ y;    // 0b0110 (XOR)
~x;       // ビット反転
x << 2;   // 左シフト（×4）
x >> 1;   // 右シフト（÷2、符号維持）
x >>> 1;  // 符号なし右シフト

// 三項演算子
int age = 20;
String status = (age >= 18) ? "成人" : "未成年";

// instanceof 演算子
Object obj = "Hello";
if (obj instanceof String str) {   // パターンマッチング (Java 16+)
    System.out.println(str.length());
}`,
      },
    ],
  },
  {
    id: "control-flow",
    title: "制御フロー",
    category: "language-basics",
    description: "if/else、for、while、do-while、break、continue",
    sections: [
      {
        title: "条件分岐",
        content:
          "if/else 文は条件に応じて処理を分岐します。複数の条件は else if で連鎖できます。Java 14+ の switch 式は値を返すことができ、網羅性チェックも行われます。",
        code: `// if / else if / else
int score = 85;
String grade;
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else if (score >= 70) {
    grade = "C";
} else {
    grade = "D";
}

// switch文（従来）
int day = 3;
switch (day) {
    case 1: System.out.println("月"); break;
    case 2: System.out.println("火"); break;
    case 3: System.out.println("水"); break;
    default: System.out.println("他"); break;
}

// switch式（Java 14+）
String dayName = switch (day) {
    case 1 -> "月曜日";
    case 2 -> "火曜日";
    case 3 -> "水曜日";
    case 4 -> "木曜日";
    case 5 -> "金曜日";
    case 6, 7 -> "週末";
    default -> throw new IllegalArgumentException("不正な日: " + day);
};`,
      },
      {
        title: "ループ",
        content:
          "for文は回数指定のループ、while文は条件ベースのループ、do-while文は最低1回実行するループです。拡張for文（for-each）は配列やコレクションの反復に使用します。break は脱出、continue はスキップに使います。",
        code: `// for文
for (int i = 0; i < 5; i++) {
    System.out.println(i);         // 0, 1, 2, 3, 4
}

// 拡張for文（for-each）
int[] numbers = {10, 20, 30, 40, 50};
for (int n : numbers) {
    System.out.println(n);
}

// while文
int count = 0;
while (count < 3) {
    System.out.println(count++);   // 0, 1, 2
}

// do-while文（最低1回実行）
int input;
do {
    input = readInput();
} while (input < 0);

// break（ループを脱出）
for (int i = 0; i < 100; i++) {
    if (i == 5) break;             // i==5 でループ終了
}

// continue（現在の反復をスキップ）
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;     // 偶数をスキップ
    System.out.println(i);         // 1, 3, 5, 7, 9
}

// ラベル付きbreak（ネストしたループから脱出）
outer:
for (int i = 0; i < 5; i++) {
    for (int j = 0; j < 5; j++) {
        if (i * j > 6) break outer;
    }
}`,
      },
    ],
  },
  {
    id: "arrays",
    title: "配列",
    category: "language-basics",
    description: "配列の宣言、初期化、多次元配列、操作メソッド",
    sections: [
      {
        title: "配列の基本",
        content:
          "配列は同じ型の要素を固定長で格納するコンテナです。宣言時にサイズを指定し、後から変更できません。要素にはインデックス（0始まり）でアクセスします。length プロパティで配列の長さを取得できます。",
        code: `// 宣言と初期化
int[] numbers = new int[5];           // サイズ指定（初期値0）
int[] values = {1, 2, 3, 4, 5};      // 初期値付き
String[] names = new String[]{"Alice", "Bob", "Charlie"};

// アクセス
numbers[0] = 10;                     // 代入
int first = values[0];               // 取得（1）
int length = values.length;          // 長さ（5）

// 最後の要素
int last = values[values.length - 1]; // 5

// 配列のコピー
int[] copy = Arrays.copyOf(values, values.length);
int[] partial = Arrays.copyOfRange(values, 1, 4); // {2, 3, 4}
int[] dest = new int[5];
System.arraycopy(values, 0, dest, 0, 5);

// 多次元配列
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
int val = matrix[1][2];              // 6

// ジャグ配列（行ごとに長さが異なる）
int[][] jagged = new int[3][];
jagged[0] = new int[]{1, 2};
jagged[1] = new int[]{3, 4, 5};
jagged[2] = new int[]{6};`,
      },
      {
        title: "配列の操作",
        content:
          "Arrays クラスはソート、検索、比較、変換などの配列操作メソッドを提供します。配列は Stream に変換して関数型操作を行うこともできます。",
        code: `int[] arr = {5, 2, 8, 1, 9, 3};

// ソート
Arrays.sort(arr);                     // {1, 2, 3, 5, 8, 9}

// 二分探索（ソート済み前提）
int idx = Arrays.binarySearch(arr, 5); // インデックス

// 比較
int[] a = {1, 2, 3};
int[] b = {1, 2, 3};
Arrays.equals(a, b);                  // true

// 埋め尽くし
Arrays.fill(arr, 0);                  // 全要素を0に

// 文字列表現
System.out.println(Arrays.toString(arr));   // [0, 0, 0, ...]
int[][] m = {{1, 2}, {3, 4}};
System.out.println(Arrays.deepToString(m)); // [[1, 2], [3, 4]]

// Stream への変換
int sum = Arrays.stream(new int[]{1, 2, 3, 4, 5}).sum();  // 15
List<String> list = Arrays.stream(new String[]{"a", "b"})
    .map(String::toUpperCase)
    .toList();                        // [A, B]

// リストへの変換
List<Integer> fixed = Arrays.asList(1, 2, 3);  // 固定サイズ
List<Integer> mutable = new ArrayList<>(Arrays.asList(1, 2, 3));`,
      },
    ],
  },
  {
    id: "switch-expressions",
    title: "switch式とswitch文",
    category: "language-basics",
    description: "従来のswitch文からswitch式、パターンマッチングまで",
    sections: [
      {
        title: "switch式 (Java 14+)",
        content:
          "switch式はswitch文を拡張し、値を返せるようになりました。アロー構文（->）でフォールスルーを防止し、複数のcaseラベルをカンマで列挙できます。yield キーワードでブロックから値を返します。",
        code: `// switch式（アロー構文）
int dayNum = 3;
String dayName = switch (dayNum) {
    case 1 -> "Monday";
    case 2 -> "Tuesday";
    case 3 -> "Wednesday";
    case 4 -> "Thursday";
    case 5 -> "Friday";
    case 6, 7 -> "Weekend";
    default -> "Invalid";
};

// ブロック付き switch式（yield で値を返す）
String description = switch (dayNum) {
    case 1, 2, 3, 4, 5 -> {
        String name = getDayName(dayNum);
        yield name + " is a weekday";
    }
    case 6, 7 -> {
        yield "It's the weekend!";
    }
    default -> throw new IllegalArgumentException();
};

// enum での switch（defaultが不要 — 網羅性チェック）
enum Season { SPRING, SUMMER, AUTUMN, WINTER }
Season season = Season.SPRING;
String weather = switch (season) {
    case SPRING -> "Warm";
    case SUMMER -> "Hot";
    case AUTUMN -> "Cool";
    case WINTER -> "Cold";
    // default 不要（全enumが網羅されているため）
};`,
      },
      {
        title: "パターンマッチング for switch (Java 21+)",
        content:
          "Java 21ではswitchでの型パターンマッチングが正式機能になりました。型に基づく分岐、ガードパターン（when）、null処理、sealed classとの組み合わせが可能です。",
        code: `// 型パターン
Object obj = "Hello";
String result = switch (obj) {
    case Integer i -> "整数: " + i;
    case String s  -> "文字列: " + s;
    case null      -> "null";
    default        -> "その他: " + obj;
};

// ガードパターン（when 句）
String classify(Object obj) {
    return switch (obj) {
        case Integer i when i > 0  -> "正の整数";
        case Integer i when i < 0  -> "負の整数";
        case Integer i             -> "ゼロ";
        case String s when s.isEmpty() -> "空文字列";
        case String s              -> "文字列: " + s;
        case null                  -> "null";
        default                    -> "不明";
    };
}

// sealed class との組み合わせ
sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}

double area(Shape shape) {
    return switch (shape) {
        case Circle c    -> Math.PI * c.radius() * c.radius();
        case Rectangle r -> r.w() * r.h();
        // default 不要（sealed で全サブタイプが網羅）
    };
}`,
      },
    ],
  },
  {
    id: "var-type",
    title: "var 型推論",
    category: "language-basics",
    description: "ローカル変数型推論 var の使い方と注意点 (Java 10+)",
    sections: [
      {
        title: "var の使い方",
        content:
          "Java 10で導入された var キーワードにより、ローカル変数の型をコンパイラに推論させることができます。初期化式から型が明らかな場合にコードを簡潔にできます。ただしフィールド、メソッドパラメータ、戻り値の型には使用できません。",
        code: `// var を使った型推論
var name = "Java";                    // String
var count = 42;                       // int
var pi = 3.14;                        // double
var list = new ArrayList<String>();   // ArrayList<String>
var map = Map.of("a", 1, "b", 2);    // Map<String, Integer>

// 便利な使い方
var stream = list.stream()
    .filter(s -> s.length() > 3)
    .map(String::toUpperCase);        // Stream<String>

// try-with-resources
try (var reader = new BufferedReader(new FileReader("data.txt"))) {
    var line = reader.readLine();
}

// for文
for (var entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// ラムダ式のパラメータ (Java 11+)
list.stream()
    .map((@NonNull var s) -> s.toUpperCase())
    .toList();

// 使えない場所
// var field = "NG";             // フィールド ✗
// void method(var param) {}     // パラメータ ✗
// var x;                        // 初期化なし ✗
// var y = null;                 // nullからは推論不可 ✗
// var z = {1, 2, 3};            // 配列初期化子 ✗`,
      },
    ],
  },
];

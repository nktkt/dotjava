export interface KotlinSection {
  title: string;
  content: string;
  code?: string;
}

export interface KotlinChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: KotlinSection[];
}

export interface KotlinCategory {
  id: string;
  name: string;
  color: string;
}

export const kotlinCategories: KotlinCategory[] = [
  { id: "basics", name: "基礎文法", color: "#7F52FF" },
  { id: "features", name: "Kotlin特有機能", color: "#059669" },
  { id: "practice", name: "実践", color: "#D97706" },
];

export const kotlinChapters: KotlinChapter[] = [
  // ===== 基礎文法 =====
  {
    id: "basic-syntax",
    title: "Kotlinの基本構文",
    category: "basics",
    description:
      "Javaとの違いを意識しながら、Kotlinの変数宣言・型推論・文字列テンプレート・when式など基本構文を学ぶ",
    sections: [
      {
        title: "val と var ― 変数宣言",
        content:
          "Kotlinでは変数宣言に val（読み取り専用）と var（再代入可能）の2つのキーワードを使います。Javaの final に相当するのが val であり、Kotlinでは原則として val を優先的に使い、不変性を保つことが推奨されます。var は再代入が必要な場合にのみ使います。Java と異なり、型名は変数名の後にコロンを付けて記述しますが、初期値から型を推論できる場合は省略可能です。",
        code: `// Kotlin の変数宣言
val name: String = "太郎"   // 読み取り専用（Javaのfinal相当）
var age: Int = 25           // 再代入可能

// 型推論により型を省略できる
val city = "東京"           // String と推論される
var count = 0               // Int と推論される

// val は再代入できない
// name = "花子"  // コンパイルエラー

// var は再代入できる
age = 26

// --- Java との比較 ---
// Java:
//   final String name = "太郎";
//   int age = 25;
//   age = 26;`,
      },
      {
        title: "型推論と基本型",
        content:
          "Kotlinはコンパイル時に強力な型推論を行うため、多くの場面で型を明示する必要がありません。Javaのプリミティブ型（int, long, double など）はKotlinでは存在せず、すべてオブジェクト型（Int, Long, Double）として扱います。ただし、コンパイル後はJVMのプリミティブ型に最適化されるため、パフォーマンス上の懸念はありません。数値型の暗黙的な変換は行われないため、明示的な変換メソッド（toInt(), toLong() など）を使います。",
        code: `// 基本型（すべてオブジェクト型）
val intVal: Int = 42
val longVal: Long = 100L
val doubleVal: Double = 3.14
val boolVal: Boolean = true
val charVal: Char = 'A'

// 型推論の例
val message = "Hello"       // String
val pi = 3.14               // Double
val count = 100             // Int
val bigNumber = 100_000L    // Long（アンダースコアで桁区切り可能）

// 数値の明示的変換（暗黙変換はない）
val i: Int = 42
val l: Long = i.toLong()    // 明示的に変換が必要
// val l2: Long = i         // コンパイルエラー！

// --- Java との比較 ---
// Java:
//   int i = 42;
//   long l = i;  // 暗黙的にwidening変換される`,
      },
      {
        title: "文字列テンプレート",
        content:
          "Kotlinでは文字列の中に変数や式を直接埋め込むことができます。$変数名 で変数の値を展開し、${式} で任意の式を評価して埋め込みます。Javaの String.format() や文字列連結（+）に比べて、はるかに読みやすく簡潔に文字列を構築できます。複数行文字列にはトリプルクォート（\"\"\"）を使い、trimIndent() でインデントを除去できます。",
        code: `// 文字列テンプレート
val name = "太郎"
val age = 25

// \$ で変数を埋め込み
val greeting = "こんにちは、\${name}さん！"
println(greeting)  // こんにちは、太郎さん！

// \${} で式を埋め込み
val info = "\${name}さんは\${age}歳、来年は\${age + 1}歳です"
println(info)  // 太郎さんは25歳、来年は26歳です

// 複数行文字列（トリプルクォート）
val json = """
    {
        "name": "\${name}",
        "age": \${age}
    }
""".trimIndent()

// --- Java との比較 ---
// Java:
//   String greeting = "こんにちは、" + name + "さん！";
//   String info = String.format("%sさんは%d歳", name, age);`,
      },
      {
        title: "when 式",
        content:
          "when はJavaの switch 文を大幅に強化した式です。値を返すことができ、任意の条件式やパターンマッチングが可能です。in で範囲チェック、is で型チェック、カンマ区切りで複数の値を同時にマッチングできます。when を式として使う場合（値を変数に代入する場合など）、else ブランチが必須になります。when に引数を渡さない形式では、if-else チェーンの代わりとして使えます。",
        code: `// 基本的な when 式
val x = 3
val result = when (x) {
    1 -> "one"
    2 -> "two"
    3, 4 -> "three or four"  // 複数の値
    in 5..10 -> "5〜10の範囲"  // 範囲チェック
    else -> "other"
}
println(result)  // three or four

// 型チェック（スマートキャスト）
fun describe(obj: Any): String = when (obj) {
    is String -> "文字列: 長さ=\${obj.length}"  // スマートキャスト
    is Int -> "整数: \${obj * 2}"
    is List<*> -> "リスト: サイズ=\${obj.size}"
    else -> "不明な型"
}

// 引数なしの when（if-else チェーンの代替）
val score = 85
val grade = when {
    score >= 90 -> "A"
    score >= 80 -> "B"
    score >= 70 -> "C"
    else -> "D"
}

// --- Java との比較 ---
// Java (switch式 / Java 14+):
//   String result = switch (x) {
//       case 1 -> "one";
//       case 2 -> "two";
//       default -> "other";
//   };`,
      },
      {
        title: "if 式と範囲",
        content:
          "Kotlinでは if は文ではなく式（expression）です。そのため三項演算子（? :）は存在せず、if-else をそのまま値として返せます。また、IntRange や LongRange などの範囲型を .. 演算子で簡潔に表現でき、for ループや in 演算子での範囲チェックに使えます。downTo, step, until を組み合わせることで柔軟な範囲操作が可能です。",
        code: `// if は式（値を返せる）
val a = 10
val b = 20
val max = if (a > b) a else b  // 三項演算子は不要
println(max)  // 20

// 範囲（Range）
val range = 1..10  // 1から10まで（10を含む）

// in で範囲チェック
val score = 85
if (score in 80..100) {
    println("合格！")
}

// for ループでの範囲
for (i in 1..5) {
    print("\$i ")  // 1 2 3 4 5
}

for (i in 10 downTo 1 step 2) {
    print("\$i ")  // 10 8 6 4 2
}

for (i in 0 until 5) {
    print("\$i ")  // 0 1 2 3 4 （5を含まない）
}

// --- Java との比較 ---
// Java:
//   int max = (a > b) ? a : b;
//   for (int i = 1; i <= 5; i++) { ... }`,
      },
    ],
  },
  {
    id: "functions-lambda",
    title: "関数とラムダ",
    category: "basics",
    description:
      "Kotlinの関数定義、拡張関数、高階関数、ラムダ式を学び、簡潔で表現力豊かなコードの書き方を習得する",
    sections: [
      {
        title: "関数定義（fun）",
        content:
          "Kotlinでは fun キーワードで関数を定義します。戻り値の型はコロンの後に記述し、単一式の関数は = で簡潔に書けます（式本体関数）。デフォルト引数を設定できるため、Javaのようにメソッドをオーバーロードする必要が大幅に減ります。名前付き引数を使えば、引数の順序を気にせず呼び出せ、可読性が向上します。戻り値がない場合は Unit 型（Javaの void 相当）を使いますが、省略可能です。",
        code: `// 基本的な関数定義
fun greet(name: String): String {
    return "こんにちは、\${name}さん！"
}

// 式本体関数（単一式の場合、= で簡潔に書ける）
fun add(a: Int, b: Int): Int = a + b

// 戻り値の型推論（式本体関数のみ）
fun multiply(a: Int, b: Int) = a * b

// デフォルト引数（オーバーロード不要）
fun createUser(
    name: String,
    age: Int = 20,
    city: String = "東京"
): String = "\${name}(\${age}歳, \${city})"

// 名前付き引数
val user = createUser(name = "太郎", city = "大阪")
println(user)  // 太郎(20歳, 大阪)

// Unit 型（void相当、省略可能）
fun printMessage(msg: String): Unit {
    println(msg)
}

// --- Java との比較 ---
// Java ではデフォルト引数がないため、オーバーロードが必要:
//   String createUser(String name) { return createUser(name, 20, "東京"); }
//   String createUser(String name, int age) { ... }
//   String createUser(String name, int age, String city) { ... }`,
      },
      {
        title: "拡張関数",
        content:
          "拡張関数はKotlinの非常に強力な機能で、既存のクラスにメソッドを追加できます。元のクラスのソースコードを変更せず、継承も不要です。レシーバ型（拡張対象のクラス）を関数名の前に付けて定義し、関数内では this でレシーバオブジェクトにアクセスできます。Javaのユーティリティクラス（StringUtils など）を置き換える洗練された方法です。拡張プロパティも同様に定義可能です。",
        code: `// 拡張関数の定義
fun String.addExclamation(): String {
    return this + "！"  // this はレシーバオブジェクト
}

println("Hello".addExclamation())  // Hello！

// 引数付きの拡張関数
fun String.repeat(n: Int, separator: String = ""): String {
    return (1..n).joinToString(separator) { this }
}

println("Ha".repeat(3, "-"))  // Ha-Ha-Ha

// 実用的な拡張関数
fun Int.isEven(): Boolean = this % 2 == 0
fun Int.isOdd(): Boolean = !this.isEven()

println(4.isEven())  // true
println(3.isOdd())   // true

// 拡張プロパティ
val String.wordCount: Int
    get() = this.split("\\s+".toRegex()).size

println("Hello World Kotlin".wordCount)  // 3

// Nullable型への拡張関数
fun String?.orEmpty(): String = this ?: ""

// --- Java との比較 ---
// Java:
//   public class StringUtils {
//       public static String addExclamation(String s) {
//           return s + "！";
//       }
//   }
//   StringUtils.addExclamation("Hello");`,
      },
      {
        title: "高階関数",
        content:
          "高階関数とは、関数を引数に取る、または関数を戻り値として返す関数のことです。Kotlinでは関数型を (引数型) -> 戻り値型 で表現します。これにより、処理の一部を呼び出し側に委譲する柔軟な設計が可能になります。inline キーワードを付けると、ラムダ式がコンパイル時にインライン展開され、関数オブジェクト生成のオーバーヘッドを回避できます。標準ライブラリの let, run, apply, also, with はすべて高階関数です。",
        code: `// 関数型の引数
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

val sum = calculate(3, 5) { a, b -> a + b }
val product = calculate(3, 5) { a, b -> a * b }
println("sum=\$sum, product=\$product")  // sum=8, product=15

// 関数を戻り値として返す
fun getOperation(type: String): (Int, Int) -> Int {
    return when (type) {
        "add" -> { a, b -> a + b }
        "sub" -> { a, b -> a - b }
        else -> { _, _ -> 0 }
    }
}

val op = getOperation("add")
println(op(10, 3))  // 13

// inline で最適化
inline fun measureTime(block: () -> Unit): Long {
    val start = System.currentTimeMillis()
    block()
    return System.currentTimeMillis() - start
}

val elapsed = measureTime {
    // 重い処理
    Thread.sleep(100)
}
println("処理時間: \${elapsed}ms")

// --- Java との比較 ---
// Java (関数型インターフェース):
//   int calculate(int a, int b, BiFunction<Integer,Integer,Integer> op) {
//       return op.apply(a, b);
//   }
//   calculate(3, 5, (a, b) -> a + b);`,
      },
      {
        title: "ラムダ式",
        content:
          "ラムダ式は名前を持たない関数リテラルです。Kotlinのラムダ式は {} で囲み、引数 -> 本体 の形式で書きます。引数が1つの場合は暗黙の it パラメータが使えます。最後の式が自動的に戻り値になります（return は不要）。関数の最後の引数がラムダの場合、括弧の外に出して書けるトレーリングラムダ構文が使え、DSLライクな記述が可能になります。",
        code: `// ラムダ式の基本
val square: (Int) -> Int = { x -> x * x }
println(square(5))  // 25

// 引数が1つの場合は it を使える
val double: (Int) -> Int = { it * 2 }
println(double(5))  // 10

// トレーリングラムダ（最後の引数がラムダの場合）
val numbers = listOf(1, 2, 3, 4, 5)

// 通常の書き方
numbers.filter({ it > 3 })

// トレーリングラムダ（推奨）
numbers.filter { it > 3 }

// 複数行のラムダ（最後の式が戻り値）
val transform: (String) -> String = { input ->
    val trimmed = input.trim()
    val upper = trimmed.uppercase()
    upper  // これが戻り値
}

// ラムダの連鎖
val result = numbers
    .filter { it % 2 == 0 }
    .map { it * 10 }
    .joinToString()
println(result)  // 20, 40

// 分割代入（destructuring）
val map = mapOf("a" to 1, "b" to 2)
map.forEach { (key, value) ->
    println("\$key -> \$value")
}

// --- Java との比較 ---
// Java:
//   Function<Integer, Integer> square = x -> x * x;
//   numbers.stream().filter(x -> x > 3).collect(...);`,
      },
      {
        title: "スコープ関数（let, run, apply, also, with）",
        content:
          "スコープ関数はKotlin標準ライブラリの高階関数で、オブジェクトのコンテキスト内でコードブロックを実行します。let はnull安全な変換に、apply はオブジェクトの初期化に、also はデバッグログ等の副作用に、run はオブジェクトの設定と結果の計算に、with は既存オブジェクトへの操作に使います。this（レシーバ）と it（引数）のどちらでオブジェクトを参照するか、ラムダの結果とオブジェクト自身のどちらを返すかで使い分けます。",
        code: `// let: null チェック＋変換に最適
val name: String? = "Kotlin"
val length = name?.let {
    println("名前: \$it")
    it.length  // 戻り値
}
println(length)  // 6

// apply: オブジェクトの初期化に最適（thisでアクセス、オブジェクトを返す）
val user = User().apply {
    this.name = "太郎"
    this.age = 25
    this.email = "taro@example.com"
}

// also: 副作用（ログ等）に最適（itでアクセス、オブジェクトを返す）
val numbers = mutableListOf(1, 2, 3)
    .also { println("初期リスト: \$it") }
    .also { it.add(4) }

// run: 設定＋計算に最適（thisでアクセス、ラムダの結果を返す）
val result = StringBuilder().run {
    append("Hello")
    append(", ")
    append("Kotlin")
    toString()  // ラムダの結果を返す
}
println(result)  // Hello, Kotlin

// with: 既存オブジェクトへの複数操作
val config = Configuration()
with(config) {
    host = "localhost"
    port = 8080
    timeout = 5000
}

// 使い分けの覚え方:
// let   → it参照、ラムダ結果を返す → null安全な変換
// apply → this参照、オブジェクトを返す → 初期化
// also  → it参照、オブジェクトを返す → 副作用（ログ等）
// run   → this参照、ラムダ結果を返す → 設定＋計算
// with  → this参照、ラムダ結果を返す → 既存オブジェクト操作`,
      },
    ],
  },
  {
    id: "classes-objects",
    title: "クラスとオブジェクト",
    category: "basics",
    description:
      "data class、sealed class、object宣言、companion objectなど、Kotlinのクラスシステムを学ぶ",
    sections: [
      {
        title: "data class",
        content:
          "data class はデータ保持を目的としたクラスで、equals()、hashCode()、toString()、copy()、componentN() メソッドが自動生成されます。Javaで数十行のボイラープレートが必要だった POJO が、Kotlinでは1行で定義できます。Java 16 で導入された record に似ていますが、copy() による部分的な変更や分割代入に対応している点が異なります。プライマリコンストラクタに少なくとも1つの val または var パラメータが必要です。",
        code: `// data class の定義（1行で完結）
data class User(
    val name: String,
    val age: Int,
    val email: String = ""
)

// 自動生成されるメソッド
val user1 = User("太郎", 25, "taro@example.com")
val user2 = User("太郎", 25, "taro@example.com")

// toString() が自動生成
println(user1)  // User(name=太郎, age=25, email=taro@example.com)

// equals() が自動生成（構造的等価性）
println(user1 == user2)  // true

// hashCode() が自動生成
println(user1.hashCode() == user2.hashCode())  // true

// copy() で部分的に変更した新しいインスタンスを生成
val user3 = user1.copy(age = 26)
println(user3)  // User(name=太郎, age=26, email=taro@example.com)

// 分割代入（componentN() が自動生成）
val (name, age, email) = user1
println("\$name は \${age}歳")  // 太郎 は 25歳

// --- Java との比較 ---
// Java (record / Java 16+):
//   public record User(String name, int age, String email) {}
// Java (従来):
//   equals, hashCode, toString, getter を手動実装（数十行）`,
      },
      {
        title: "sealed class / sealed interface",
        content:
          "sealed class（sealed interface）は、継承を同一ファイル内（またはモジュール内）に制限するクラスです。when式と組み合わせると、コンパイラがすべてのサブクラスを把握しているため、else ブランチが不要になり、新しいサブクラスを追加した際にコンパイルエラーで漏れを検出できます。代数的データ型（ADT）を表現するのに最適で、API のレスポンスやUI の状態管理などに広く使われます。",
        code: `// sealed class の定義
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String, val code: Int) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// when 式で網羅的にハンドリング（else 不要）
fun handleResult(result: Result<String>) {
    when (result) {
        is Result.Success -> println("成功: \${result.data}")
        is Result.Error -> println("エラー: \${result.message} (\${result.code})")
        is Result.Loading -> println("読み込み中...")
        // else 不要！新しいサブクラス追加時にコンパイルエラーで検出
    }
}

// 使用例
handleResult(Result.Success("データ取得完了"))
handleResult(Result.Error("Not Found", 404))
handleResult(Result.Loading)

// sealed interface（Kotlin 1.5+）
sealed interface Shape {
    data class Circle(val radius: Double) : Shape
    data class Rectangle(val width: Double, val height: Double) : Shape
    data class Triangle(val base: Double, val height: Double) : Shape
}

fun area(shape: Shape): Double = when (shape) {
    is Shape.Circle -> Math.PI * shape.radius * shape.radius
    is Shape.Rectangle -> shape.width * shape.height
    is Shape.Triangle -> shape.base * shape.height / 2
}

// --- Java との比較 ---
// Java (sealed class / Java 17+):
//   public sealed class Result permits Success, Error, Loading {}
//   public record Success(String data) extends Result {}`,
      },
      {
        title: "object 宣言とシングルトン",
        content:
          "object 宣言はシングルトンパターンをKotlin言語レベルでサポートする機能です。object キーワードで宣言すると、クラスの定義とその唯一のインスタンス生成が同時に行われ、スレッドセーフなシングルトンが保証されます。Javaのようにprivateコンストラクタ＋static getInstance() パターンを書く必要がありません。また、object 式（無名オブジェクト）を使えば、Javaの匿名クラスに相当する一時的なオブジェクトを作成できます。",
        code: `// object 宣言（シングルトン）
object DatabaseConfig {
    val url = "jdbc:postgresql://localhost:5432/mydb"
    val driver = "org.postgresql.Driver"
    var maxConnections = 10

    fun connect() {
        println("データベースに接続: \$url")
    }
}

// 直接アクセス（インスタンス生成不要）
DatabaseConfig.connect()
println(DatabaseConfig.maxConnections)  // 10

// object でインターフェース実装
object JsonParser : Parser {
    override fun parse(input: String): Any {
        // JSON パース処理
        return mapOf("key" to "value")
    }
}

// object 式（無名オブジェクト / Javaの匿名クラス相当）
val listener = object : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) {
        println("クリック: (\${e.x}, \${e.y})")
    }
}

// object 式で複数インターフェースを実装
val combined = object : Serializable, Comparable<String> {
    override fun compareTo(other: String): Int = 0
}

// --- Java との比較 ---
// Java:
//   public class DatabaseConfig {
//       private static final DatabaseConfig INSTANCE = new DatabaseConfig();
//       private DatabaseConfig() {}
//       public static DatabaseConfig getInstance() { return INSTANCE; }
//   }`,
      },
      {
        title: "companion object",
        content:
          "Kotlinにはstatic メンバーが存在しませんが、代わりに companion object を使って同様の機能を実現します。companion object はクラスに付随するシングルトンオブジェクトで、クラス名を通じてメンバーにアクセスできます。ファクトリメソッドパターンの実装に最適で、名前を付けることも、インターフェースを実装することもできます。Javaからは Companion を経由するか、@JvmStatic アノテーションで直接アクセスできます。",
        code: `// companion object（static メンバーの代替）
class User private constructor(
    val name: String,
    val email: String
) {
    companion object {
        // 定数（Javaの static final 相当）
        const val MAX_NAME_LENGTH = 50

        // ファクトリメソッド
        fun create(name: String, email: String): User {
            require(name.length <= MAX_NAME_LENGTH) {
                "名前は\${MAX_NAME_LENGTH}文字以内"
            }
            return User(name, email)
        }

        fun fromCsv(csv: String): User {
            val (name, email) = csv.split(",")
            return User(name.trim(), email.trim())
        }
    }

    override fun toString() = "User(\$name, \$email)"
}

// クラス名で直接アクセス
val user = User.create("太郎", "taro@example.com")
val user2 = User.fromCsv("花子, hanako@example.com")
println(User.MAX_NAME_LENGTH)  // 50

// 名前付き companion object
class MyClass {
    companion object Factory {
        fun create(): MyClass = MyClass()
    }
}
val instance = MyClass.create()      // 名前省略可
val instance2 = MyClass.Factory.create()  // 名前でもアクセス可

// --- Java との比較 ---
// Java:
//   public class User {
//       public static final int MAX_NAME_LENGTH = 50;
//       public static User create(String name, String email) { ... }
//   }`,
      },
      {
        title: "継承とインターフェース",
        content:
          "Kotlinのクラスはデフォルトで final（継承不可）です。継承を許可するには open 修飾子を明示的に付ける必要があり、これは「継承のための設計」を促進します。メソッドのオーバーライドには override キーワードが必須で、Javaの @Override アノテーションと異なりコンパイラレベルで強制されます。インターフェースはデフォルト実装を持つことができ、プロパティも宣言できます。",
        code: `// open 修飾子で継承を許可（デフォルトはfinal）
open class Animal(val name: String) {
    open fun sound(): String = "..."  // オーバーライド可能
    fun describe(): String = "\${name}: \${sound()}"  // final
}

class Dog(name: String) : Animal(name) {
    override fun sound(): String = "ワン！"
}

class Cat(name: String) : Animal(name) {
    override fun sound(): String = "ニャー！"
}

println(Dog("ポチ").describe())  // ポチ: ワン！
println(Cat("タマ").describe())  // タマ: ニャー！

// インターフェース（デフォルト実装＋プロパティ）
interface Drawable {
    val color: String  // 抽象プロパティ
    fun draw()
    fun description(): String = "\${color}の図形"  // デフォルト実装
}

interface Resizable {
    fun resize(factor: Double)
}

// 複数インターフェースの実装
class Circle(
    override val color: String,
    var radius: Double
) : Drawable, Resizable {
    override fun draw() = println("半径\${radius}の\${color}い円を描画")
    override fun resize(factor: Double) { radius *= factor }
}

val circle = Circle("赤", 5.0)
circle.draw()          // 半径5.0の赤い円を描画
println(circle.description())  // 赤の図形

// --- Java との比較 ---
// Java: クラスはデフォルトで継承可能（finalで防ぐ）
// Kotlin: クラスはデフォルトでfinal（openで許可する）`,
      },
    ],
  },

  // ===== Kotlin特有機能 =====
  {
    id: "null-safety",
    title: "Null安全",
    category: "features",
    description:
      "KotlinのNull安全機構を学び、NullPointerExceptionを型システムレベルで防ぐ方法を習得する",
    sections: [
      {
        title: "Nullable 型と非Null型",
        content:
          "KotlinはNull安全を型システムに組み込んでおり、デフォルトですべての型はnullを許容しません。null を扱う可能性がある場合は、型の後に ? を付けて Nullable 型として宣言します。これにより、NullPointerException の発生をコンパイル時に検出でき、Javaで頻発する実行時の NPE を大幅に削減できます。Nullable 型のメンバーに直接アクセスするとコンパイルエラーになるため、安全な呼び出しが強制されます。",
        code: `// 非Null型（デフォルト）― null を代入できない
val name: String = "太郎"
// name = null  // コンパイルエラー！

// Nullable型 ― ? を付ける
var nickname: String? = "たっちゃん"
nickname = null  // OK

// Nullable型のメンバーには直接アクセスできない
// println(nickname.length)  // コンパイルエラー！

// 安全な呼び出し演算子 ?. を使う
println(nickname?.length)  // null（nicknameがnullならnullを返す）

// 非Null型への変換が必要な場合
fun greet(name: String) {  // 非Null型を受け取る
    println("Hello, \$name")
}
// greet(nickname)  // コンパイルエラー！ String? → String は不可

// --- Java との比較 ---
// Java: すべての参照型が null になり得る（コンパイル時に検出不可）
//   String name = null;       // コンパイルOK
//   name.length();            // 実行時にNullPointerException
// Kotlin: コンパイル時にnull安全性が保証される`,
      },
      {
        title: "安全呼び出し演算子（?.）とエルビス演算子（?:）",
        content:
          "安全呼び出し演算子 ?. は、レシーバがnullでない場合のみメンバーにアクセスし、nullの場合はnullを返します。チェーンで使え、途中でnullになると残りはすべてnullが返ります。エルビス演算子 ?: はnullの場合のデフォルト値を指定でき、Javaの Optional.orElse() に似ています。?. と ?: を組み合わせることで、nullチェックを簡潔に記述できます。",
        code: `// 安全呼び出し演算子 ?.
data class Address(val city: String, val zipCode: String?)
data class Company(val name: String, val address: Address?)
data class Employee(val name: String, val company: Company?)

val employee = Employee("太郎", Company("ABC社", Address("東京", "100-0001")))
val nullEmployee: Employee? = null

// チェーンで安全にアクセス
val zipCode = employee.company?.address?.zipCode
println(zipCode)  // 100-0001

val nullZip = nullEmployee?.company?.address?.zipCode
println(nullZip)  // null（途中でnullならnull）

// エルビス演算子 ?: （デフォルト値）
val city = employee.company?.address?.city ?: "不明"
println(city)  // 東京

val unknownCity = nullEmployee?.company?.address?.city ?: "不明"
println(unknownCity)  // 不明

// エルビス演算子で早期リターン
fun getCity(employee: Employee?): String {
    val company = employee?.company ?: return "社員情報なし"
    val address = company.address ?: return "住所なし"
    return address.city
}

// エルビス演算子で例外スロー
fun requireCity(employee: Employee?): String {
    return employee?.company?.address?.city
        ?: throw IllegalArgumentException("住所が必要です")
}

// --- Java との比較 ---
// Java:
//   String city = Optional.ofNullable(employee)
//       .map(Employee::getCompany)
//       .map(Company::getAddress)
//       .map(Address::getCity)
//       .orElse("不明");`,
      },
      {
        title: "let と安全な変換",
        content:
          "let スコープ関数は Nullable 型の安全な変換に非常に便利です。?.let を使うと、値がnullでない場合のみブロックを実行し、ブロック内では非Null型として扱えます。if による null チェックよりも関数型プログラミングスタイルで書けます。また、run、also なども同様に ?. と組み合わせて使えます。",
        code: `// ?.let による安全な変換
val name: String? = "Kotlin"

// null でない場合のみブロック実行
name?.let { nonNullName ->
    println("名前: \$nonNullName")
    println("長さ: \${nonNullName.length}")
}

// null の場合はブロックがスキップされる
val nullName: String? = null
nullName?.let {
    println("これは実行されない")
}

// let + エルビス演算子でデフォルト値
val length = name?.let { it.length } ?: 0
println(length)  // 6

// 実用例: リストからnullを除外して変換
val numbers: List<String?> = listOf("1", "2", null, "4", null)

// filterNotNull + map
val parsed = numbers.filterNotNull().map { it.toInt() }
println(parsed)  // [1, 2, 4]

// mapNotNull（filterNotNull + map の簡潔版）
val parsed2 = numbers.mapNotNull { it?.toIntOrNull() }
println(parsed2)  // [1, 2, 4]

// ?.also でログ出力
fun findUser(id: Int): User? = if (id > 0) User("太郎", 25) else null

findUser(1)?.also { println("ユーザー発見: \$it") }
    ?: println("ユーザーが見つかりません")

// --- Java との比較 ---
// Java:
//   Optional.ofNullable(name).ifPresent(n -> {
//       System.out.println("名前: " + n);
//   });`,
      },
      {
        title: "require / check / !! 演算子",
        content:
          "require() はメソッドの事前条件チェックに使い、条件を満たさない場合 IllegalArgumentException をスローします。check() は状態チェックに使い、IllegalStateException をスローします。!! 演算子（非null表明演算子）は値がnullでないことをプログラマが保証する場合に使い、nullなら NullPointerException が発生します。!!の使用はできるだけ避け、安全な代替手段を優先すべきです。",
        code: `// require: 引数の事前条件チェック
fun createUser(name: String, age: Int): User {
    require(name.isNotBlank()) { "名前は空にできません" }
    require(age in 0..150) { "年齢は0〜150の範囲: \$age" }
    return User(name, age)
}

// createUser("", 25)   // IllegalArgumentException: 名前は空にできません
// createUser("太郎", -1) // IllegalArgumentException: 年齢は0〜150の範囲: -1

// requireNotNull: null チェック
fun processUser(user: User?) {
    val nonNullUser = requireNotNull(user) { "ユーザーが必要です" }
    println(nonNullUser.name)  // 非Null型として使える
}

// check: 状態チェック
class Connection {
    var isConnected = false

    fun sendData(data: String) {
        check(isConnected) { "接続が確立されていません" }
        println("送信: \$data")
    }
}

// checkNotNull
fun getConfig(key: String): String {
    val value: String? = System.getenv(key)
    return checkNotNull(value) { "環境変数 \$key が設定されていません" }
}

// !! 演算子（非null表明）― 使用は最小限に！
val name: String? = "Kotlin"
val length = name!!.length  // nullなら NPE
println(length)  // 6

// !! の代わりに安全な方法を使う（推奨）
// 悪い例: val len = name!!.length
// 良い例: val len = name?.length ?: 0
// 良い例: val len = requireNotNull(name).length`,
      },
      {
        title: "スマートキャスト",
        content:
          "Kotlinのスマートキャストは、型チェック後に自動的にキャストを行う機能です。is 演算子で型をチェックした後のブロック内では、明示的なキャストなしにそのスタンスのメソッドやプロパティにアクセスできます。null チェック後も同様で、if (x != null) の後では x は非Null型として扱えます。これにより、Javaで頻繁に必要だった instanceof 後のキャストが不要になります。",
        code: `// 型チェック後のスマートキャスト
fun describe(obj: Any): String {
    // is チェック後は自動的にキャストされる
    if (obj is String) {
        return "文字列(長さ=\${obj.length})"  // String として扱える
    }
    if (obj is List<*>) {
        return "リスト(サイズ=\${obj.size})"  // List として扱える
    }
    return obj.toString()
}

// when 式でのスマートキャスト
fun process(value: Any) = when (value) {
    is Int -> "整数の2倍: \${value * 2}"
    is String -> "文字列の大文字: \${value.uppercase()}"
    is List<*> -> "リストの先頭: \${value.firstOrNull()}"
    else -> "不明: \$value"
}

// null チェック後のスマートキャスト
fun greet(name: String?) {
    if (name != null) {
        // ここでは name は String 型（非Null）
        println("こんにちは、\${name.uppercase()}")
    }
}

// && / || 条件でのスマートキャスト
fun validate(input: Any?) {
    if (input is String && input.length > 5) {
        println("5文字以上の文字列: \$input")
    }
}

// 安全なキャスト as?
val obj: Any = "Hello"
val str: String? = obj as? String    // 成功: "Hello"
val num: Int? = obj as? Int          // 失敗: null（ClassCastExceptionにならない）

// --- Java との比較 ---
// Java:
//   if (obj instanceof String) {
//       String str = (String) obj;  // 明示的キャストが必要
//       System.out.println(str.length());
//   }
// Java 16+: if (obj instanceof String str) { ... }  // パターンマッチ`,
      },
    ],
  },
  {
    id: "collections",
    title: "コレクション操作",
    category: "features",
    description:
      "List、Set、Mapの操作とfilter/map/flatMapなどの関数型コレクション操作、シーケンスによる遅延評価を学ぶ",
    sections: [
      {
        title: "List / Set / Map の生成",
        content:
          "Kotlinのコレクションには不変（Immutable）と可変（Mutable）の2種類があり、デフォルトは不変です。listOf(), setOf(), mapOf() で不変コレクションを、mutableListOf(), mutableSetOf(), mutableMapOf() で可変コレクションを生成します。この不変/可変の明示的な区別により、意図しない変更を防ぎ、スレッドセーフなプログラミングが容易になります。Javaの Collections.unmodifiableList() のように実行時ではなく、コンパイル時に安全性が保証されます。",
        code: `// 不変コレクション（デフォルト・推奨）
val fruits = listOf("りんご", "バナナ", "みかん")
val uniqueNumbers = setOf(1, 2, 3, 2, 1)  // {1, 2, 3}
val capitals = mapOf(
    "日本" to "東京",
    "アメリカ" to "ワシントン",
    "イギリス" to "ロンドン"
)

// fruits.add("ぶどう")  // コンパイルエラー！ 不変リスト

// 可変コレクション
val mutableFruits = mutableListOf("りんご", "バナナ")
mutableFruits.add("みかん")  // OK
mutableFruits += "ぶどう"     // += 演算子も使える

val mutableMap = mutableMapOf("a" to 1)
mutableMap["b"] = 2  // 追加
mutableMap += "c" to 3

// 空コレクション
val emptyList = emptyList<String>()
val emptyMap = emptyMap<String, Int>()

// 不変→可変の変換
val mutable = fruits.toMutableList()
mutable.add("ぶどう")

// 可変→不変の変換
val immutable: List<String> = mutable.toList()

// buildList（Kotlin 1.6+）
val numbers = buildList {
    add(1)
    add(2)
    addAll(listOf(3, 4, 5))
}

// --- Java との比較 ---
// Java:
//   List<String> fruits = List.of("りんご", "バナナ");  // Java 9+ 不変
//   List<String> mutable = new ArrayList<>(fruits);     // 可変`,
      },
      {
        title: "filter / map / flatMap",
        content:
          "Kotlinのコレクション操作は、Javaの Stream API よりも簡潔で直感的です。filter で条件に合う要素を抽出し、map で各要素を変換し、flatMap でネストしたコレクションを平坦化します。Javaと異なり、stream() の呼び出しや collect() による収集が不要で、結果はそのままコレクションとして返されます。メソッドチェーンで複数の操作を連結でき、非常に読みやすいコードになります。",
        code: `val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// filter: 条件に合う要素を抽出
val evens = numbers.filter { it % 2 == 0 }
println(evens)  // [2, 4, 6, 8, 10]

// map: 各要素を変換
val doubled = numbers.map { it * 2 }
println(doubled)  // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter + map の連鎖
val result = numbers
    .filter { it % 2 == 0 }
    .map { it * it }
println(result)  // [4, 16, 36, 64, 100]

// flatMap: ネストを平坦化
val words = listOf("Hello World", "Kotlin Java")
val chars = words.flatMap { it.split(" ") }
println(chars)  // [Hello, World, Kotlin, Java]

// groupBy: グループ化
data class Student(val name: String, val grade: Int)
val students = listOf(
    Student("太郎", 1), Student("花子", 2),
    Student("次郎", 1), Student("三郎", 2)
)
val byGrade = students.groupBy { it.grade }
println(byGrade)  // {1=[太郎, 次郎], 2=[花子, 三郎]}

// associate: Mapに変換
val nameToGrade = students.associate { it.name to it.grade }
println(nameToGrade)  // {太郎=1, 花子=2, 次郎=1, 三郎=2}

// --- Java との比較 ---
// Java:
//   List<Integer> evens = numbers.stream()
//       .filter(n -> n % 2 == 0)
//       .collect(Collectors.toList());
// Kotlin は stream()/collect() が不要で簡潔`,
      },
      {
        title: "reduce / fold / その他の集約操作",
        content:
          "reduce と fold はコレクションの要素を1つの値に集約する関数です。reduce は最初の要素を初期値として使い、fold は明示的に初期値を指定します。他にも sum, average, count, min, max, joinToString など多彩な集約関数があります。partition で条件によるリスト分割、zip で2つのリストの組み合わせ、windowed でスライディングウィンドウ処理など、標準ライブラリだけで多くの操作が可能です。",
        code: `val numbers = listOf(1, 2, 3, 4, 5)

// reduce: 先頭要素を初期値として集約
val sum = numbers.reduce { acc, n -> acc + n }
println(sum)  // 15

// fold: 初期値を指定して集約
val sumWithInitial = numbers.fold(100) { acc, n -> acc + n }
println(sumWithInitial)  // 115

// 便利な集約関数
println(numbers.sum())        // 15
println(numbers.average())    // 3.0
println(numbers.count())      // 5
println(numbers.min())        // 1
println(numbers.max())        // 5

// joinToString: 要素を文字列に連結
val csv = numbers.joinToString(separator = ",")
println(csv)  // 1,2,3,4,5

val formatted = numbers.joinToString(
    prefix = "[", postfix = "]", separator = " | "
)
println(formatted)  // [1 | 2 | 3 | 4 | 5]

// partition: 条件で2つのリストに分割
val (evens, odds) = numbers.partition { it % 2 == 0 }
println("偶数: \$evens, 奇数: \$odds")  // 偶数: [2, 4], 奇数: [1, 3, 5]

// zip: 2つのリストを組み合わせ
val names = listOf("太郎", "花子", "次郎")
val ages = listOf(25, 22, 28)
val pairs = names.zip(ages)
println(pairs)  // [(太郎, 25), (花子, 22), (次郎, 28)]

// windowed: スライディングウィンドウ
val windows = numbers.windowed(size = 3, step = 1)
println(windows)  // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]

// chunked: 固定サイズに分割
val chunks = numbers.chunked(2)
println(chunks)  // [[1, 2], [3, 4], [5]]`,
      },
      {
        title: "シーケンス（遅延評価）",
        content:
          "シーケンス（Sequence）はKotlinの遅延評価コレクションで、JavaのStream APIに相当します。通常のコレクション操作は各ステップで中間リストを生成しますが、シーケンスは最終操作（toList(), first(), count() など）が呼ばれるまで計算を遅延し、要素ごとにパイプライン全体を処理します。大量のデータを複数ステップで変換する場合にメモリ効率とパフォーマンスが向上します。ただし、小さなコレクションではオーバーヘッドが増えるため、通常のコレクション操作の方が適切です。",
        code: `// 通常のコレクション操作（即時評価・中間リスト生成）
val result1 = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .filter { println("filter: \$it"); it % 2 == 0 }  // 全要素を処理 → 中間リスト
    .map { println("map: \$it"); it * 10 }             // 全要素を処理 → 中間リスト
    .first()                                           // 先頭を取得
// filter: 1, 2, 3, ... 10 → map: 2, 4, 6, 8, 10 → first

// シーケンス（遅延評価・中間リストなし）
val result2 = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    .asSequence()
    .filter { println("filter: \$it"); it % 2 == 0 }
    .map { println("map: \$it"); it * 10 }
    .first()
// filter: 1 → filter: 2 → map: 2 → 完了！（最小限の処理）

// シーケンスの生成方法
val seq1 = sequenceOf(1, 2, 3)
val seq2 = listOf(1, 2, 3).asSequence()
val seq3 = generateSequence(1) { it + 1 }  // 無限シーケンス

// 無限シーケンスの活用
val first10Primes = generateSequence(2) { it + 1 }
    .filter { n -> (2 until n).none { n % it == 0 } }
    .take(10)
    .toList()
println(first10Primes)  // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

// 大量データの処理（シーケンス推奨）
val largeList = (1..1_000_000).toList()
val efficientResult = largeList.asSequence()
    .filter { it % 3 == 0 }
    .map { it * 2 }
    .take(100)
    .toList()

// --- Java との比較 ---
// Java Stream API:
//   List<Integer> result = list.stream()
//       .filter(n -> n % 2 == 0)
//       .map(n -> n * 10)
//       .findFirst()
//       .orElse(0);`,
      },
      {
        title: "コレクションの便利な操作",
        content:
          "Kotlinの標準ライブラリには、Javaにはない便利なコレクション操作関数が多数用意されています。any/all/none で条件チェック、first/last/single で要素取得、distinctBy で重複除去、sortedBy でソート、take/drop で部分取得など、日常的に必要な操作がすべて揃っています。これらを組み合わせることで、複雑なデータ処理を簡潔かつ読みやすく記述できます。",
        code: `data class Product(val name: String, val price: Int, val category: String)

val products = listOf(
    Product("ノートPC", 120000, "電子機器"),
    Product("マウス", 3000, "電子機器"),
    Product("コーヒー", 500, "飲料"),
    Product("紅茶", 400, "飲料"),
    Product("キーボード", 8000, "電子機器")
)

// any / all / none
println(products.any { it.price > 100000 })  // true
println(products.all { it.price > 0 })        // true
println(products.none { it.price < 0 })       // true

// first / last / single（見つからない場合は例外）
val expensive = products.first { it.price > 100000 }
println(expensive.name)  // ノートPC

// firstOrNull（見つからない場合はnull）
val cheap = products.firstOrNull { it.price < 100 }
println(cheap)  // null

// sortedBy / sortedByDescending
val byPrice = products.sortedBy { it.price }
val byPriceDesc = products.sortedByDescending { it.price }

// distinctBy: 重複除去
val uniqueCategories = products.distinctBy { it.category }
println(uniqueCategories.map { it.category })  // [電子機器, 飲料]

// take / drop
val top3 = products.sortedByDescending { it.price }.take(3)

// sumOf / maxOf / minOf
val totalPrice = products.sumOf { it.price }
println("合計: \${totalPrice}円")  // 合計: 131900円

val maxPrice = products.maxOf { it.price }
println("最高額: \${maxPrice}円")  // 最高額: 120000円

// groupBy + mapValues で集計
val avgByCategory = products
    .groupBy { it.category }
    .mapValues { (_, items) -> items.map { it.price }.average() }
println(avgByCategory)  // {電子機器=43666.67, 飲料=450.0}`,
      },
    ],
  },
  {
    id: "coroutines",
    title: "コルーチン",
    category: "features",
    description:
      "Kotlinコルーチンの基本概念であるsuspend関数、launch、async/await、Flowを学び、非同期プログラミングを習得する",
    sections: [
      {
        title: "suspend 関数",
        content:
          "suspend 関数はコルーチンの基本要素で、実行を中断（suspend）して再開できる関数です。suspend 修飾子を付けて定義し、他の suspend 関数またはコルーチンビルダー内からのみ呼び出せます。通常の関数からは直接呼び出せません。ネットワーク通信やデータベースアクセスなどの長時間処理を、コールバックやRxJavaのような複雑な仕組みなしに、同期的なコードスタイルで記述できます。スレッドをブロックせずに中断するため、効率的な非同期処理が実現できます。",
        code: `import kotlinx.coroutines.*

// suspend 関数の定義
suspend fun fetchUser(id: Int): User {
    delay(1000)  // 1秒待機（スレッドをブロックしない）
    return User("太郎", 25)
}

suspend fun fetchOrders(userId: Int): List<Order> {
    delay(500)
    return listOf(Order("商品A"), Order("商品B"))
}

// suspend 関数は他の suspend 関数から呼べる
suspend fun getUserWithOrders(id: Int): UserWithOrders {
    val user = fetchUser(id)          // 中断ポイント1
    val orders = fetchOrders(id)      // 中断ポイント2
    return UserWithOrders(user, orders)
}

// コルーチンビルダーから呼ぶ
fun main() = runBlocking {
    val result = getUserWithOrders(1)
    println(result)
}

// 通常の関数からは呼べない
// fun badExample() {
//     fetchUser(1)  // コンパイルエラー！
// }

// --- Java との比較 ---
// Java (CompletableFuture):
//   CompletableFuture<User> fetchUser(int id) {
//       return CompletableFuture.supplyAsync(() -> {
//           Thread.sleep(1000);
//           return new User("太郎", 25);
//       });
//   }
// Java はコールバックのネストが深くなりがち`,
      },
      {
        title: "launch と Job",
        content:
          "launch はコルーチンビルダーの1つで、新しいコルーチンを起動し、Job オブジェクトを返します。結果を返さない「Fire and Forget」型の非同期処理に使います。Job を通じてコルーチンのキャンセルや完了待ちが可能です。CoroutineScope が構造化された並行性を提供し、スコープ内のすべてのコルーチンが完了するまで親が待機します。これにより、コルーチンのリーク（完了しないコルーチンが残る問題）を防ぎます。",
        code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // launch でコルーチンを起動
    val job: Job = launch {
        println("コルーチン開始")
        delay(1000)
        println("コルーチン完了")
    }

    println("メインスレッド続行")
    job.join()  // コルーチンの完了を待つ
    println("すべて完了")
    // 出力: メインスレッド続行 → コルーチン開始 → コルーチン完了 → すべて完了

    // 複数のコルーチンを並行実行
    val startTime = System.currentTimeMillis()

    val job1 = launch {
        delay(1000)
        println("処理1完了")
    }
    val job2 = launch {
        delay(1000)
        println("処理2完了")
    }

    job1.join()
    job2.join()
    val elapsed = System.currentTimeMillis() - startTime
    println("合計時間: \${elapsed}ms")  // 約1000ms（並行実行）

    // コルーチンのキャンセル
    val longJob = launch {
        repeat(1000) { i ->
            println("処理中... \$i")
            delay(500)
        }
    }
    delay(1500)
    longJob.cancel()  // キャンセル
    longJob.join()    // キャンセル完了を待つ
    println("キャンセル完了")

    // Dispatcher でスレッドを指定
    launch(Dispatchers.IO) {
        // I/O操作（ファイル、ネットワーク、DB）
        println("IO: \${Thread.currentThread().name}")
    }
    launch(Dispatchers.Default) {
        // CPU集約型の処理
        println("Default: \${Thread.currentThread().name}")
    }
}`,
      },
      {
        title: "async / await",
        content:
          "async は結果を返すコルーチンビルダーで、Deferred<T> オブジェクトを返します。await() メソッドで結果を取得でき、複数の async コルーチンを同時に起動することで並行処理を実現します。launch が「処理を実行する」のに対し、async は「値を計算して返す」という違いがあります。複数のAPI呼び出しを並行実行して結果を集約するケースに最適です。",
        code: `import kotlinx.coroutines.*

// async/await の基本
fun main() = runBlocking {
    // 逐次実行（遅い）
    val startSeq = System.currentTimeMillis()
    val user = fetchUser(1)         // 1000ms
    val orders = fetchOrders(1)     // 500ms
    println("逐次: \${System.currentTimeMillis() - startSeq}ms")  // 約1500ms

    // 並行実行（速い）
    val startPar = System.currentTimeMillis()
    val userDeferred = async { fetchUser(1) }      // 同時に開始
    val ordersDeferred = async { fetchOrders(1) }  // 同時に開始
    val userResult = userDeferred.await()           // 結果を待つ
    val ordersResult = ordersDeferred.await()       // 結果を待つ
    println("並行: \${System.currentTimeMillis() - startPar}ms")  // 約1000ms

    // coroutineScope で構造化された並行処理
    val dashboard = coroutineScope {
        val stats = async { fetchStats() }
        val notifications = async { fetchNotifications() }
        val profile = async { fetchProfile() }

        Dashboard(
            stats = stats.await(),
            notifications = notifications.await(),
            profile = profile.await()
        )
    }

    // awaitAll で複数の結果を一括取得
    val ids = listOf(1, 2, 3, 4, 5)
    val users = ids.map { id ->
        async { fetchUser(id) }
    }.awaitAll()  // すべての結果を待つ

    println("取得ユーザー数: \${users.size}")
}

suspend fun fetchStats(): Stats { delay(800); return Stats() }
suspend fun fetchNotifications(): List<String> { delay(600); return listOf() }
suspend fun fetchProfile(): Profile { delay(400); return Profile() }

// --- Java との比較 ---
// Java (CompletableFuture):
//   CompletableFuture<User> userF = fetchUserAsync(1);
//   CompletableFuture<List<Order>> ordersF = fetchOrdersAsync(1);
//   CompletableFuture.allOf(userF, ordersF).join();
//   User user = userF.get();`,
      },
      {
        title: "Flow（リアクティブストリーム）",
        content:
          "Flow はKotlinのリアクティブストリームで、複数の値を非同期に生成・消費するための仕組みです。RxJava の Observable や Java の Stream API に似ていますが、コルーチンとシームレスに統合されています。flow {} ビルダーで値を emit し、collect で消費します。コールドストリーム（collect されるまで実行されない）であり、map, filter, transform などのオペレータで変換できます。バックプレッシャーは自動的に処理されます。",
        code: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Flow の生成
fun numberFlow(): Flow<Int> = flow {
    for (i in 1..5) {
        delay(100)    // 非同期処理
        emit(i)       // 値を発行
    }
}

// Flow の消費
fun main() = runBlocking {
    // collect で値を受け取る
    numberFlow().collect { value ->
        println("受信: \$value")
    }

    // オペレータで変換
    numberFlow()
        .filter { it % 2 == 0 }
        .map { it * 10 }
        .collect { println("変換後: \$it") }
    // 変換後: 20, 変換後: 40

    // flowOf / asFlow で簡易生成
    flowOf(1, 2, 3).collect { println(it) }
    listOf("a", "b", "c").asFlow().collect { println(it) }

    // StateFlow（状態管理、最新値を保持）
    val stateFlow = MutableStateFlow(0)

    launch {
        repeat(5) {
            delay(100)
            stateFlow.value = it + 1
        }
    }

    // SharedFlow（イベントのブロードキャスト）
    val eventFlow = MutableSharedFlow<String>()

    launch {
        eventFlow.emit("ユーザーログイン")
        eventFlow.emit("データ更新")
    }

    // エラーハンドリング
    numberFlow()
        .catch { e -> println("エラー: \${e.message}") }
        .onCompletion { println("完了") }
        .collect { println(it) }

    // combine: 複数のFlowを結合
    val flow1 = flowOf(1, 2, 3)
    val flow2 = flowOf("a", "b", "c")
    flow1.zip(flow2) { num, str -> "\$num-\$str" }
        .collect { println(it) }  // 1-a, 2-b, 3-c
}

// --- Java との比較 ---
// RxJava:
//   Observable.interval(100, TimeUnit.MILLISECONDS)
//       .take(5)
//       .filter(n -> n % 2 == 0)
//       .subscribe(n -> System.out.println(n));`,
      },
      {
        title: "例外処理とキャンセル",
        content:
          "コルーチンの例外処理は構造化された並行性に従い、子コルーチンの例外は親に伝播します。CoroutineExceptionHandler を使ってグローバルな例外処理が可能です。supervisorScope を使うと、1つの子コルーチンの失敗が他の子に影響しません。キャンセルは協調的（cooperative）で、コルーチンは自身がキャンセルされたかを定期的にチェックする必要があります。delay() や yield() は自動的にキャンセルをチェックします。",
        code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // try-catch での例外処理
    val result = try {
        coroutineScope {
            async {
                fetchUser(-1)  // 例外が発生
            }.await()
        }
    } catch (e: Exception) {
        println("エラー: \${e.message}")
        null
    }

    // supervisorScope: 子の失敗が他に影響しない
    supervisorScope {
        val job1 = launch {
            delay(100)
            throw RuntimeException("処理1失敗")
        }
        val job2 = launch {
            delay(200)
            println("処理2は正常完了")  // これは実行される
        }
    }

    // CoroutineExceptionHandler
    val handler = CoroutineExceptionHandler { _, exception ->
        println("キャッチ: \${exception.message}")
    }
    val scope = CoroutineScope(Dispatchers.Default + handler)
    scope.launch {
        throw RuntimeException("ハンドラーで捕捉")
    }

    // キャンセルの協調的チェック
    val job = launch {
        var i = 0
        while (isActive) {  // キャンセルをチェック
            println("処理中: \${i++}")
            delay(100)  // キャンセルポイント
        }
    }
    delay(350)
    job.cancelAndJoin()
    println("キャンセル完了")

    // withTimeout: タイムアウト付き実行
    try {
        val data = withTimeout(1000) {
            fetchUser(1)  // 1000ms以内に完了しなければ例外
        }
        println(data)
    } catch (e: TimeoutCancellationException) {
        println("タイムアウト！")
    }

    // withTimeoutOrNull: タイムアウト時にnullを返す
    val data = withTimeoutOrNull(500) {
        delay(1000)
        "結果"
    }
    println(data)  // null（タイムアウト）
}`,
      },
    ],
  },

  // ===== 実践 =====
  {
    id: "java-interop",
    title: "JavaとKotlinの相互運用",
    category: "practice",
    description:
      "JavaコードからKotlinを呼び出す方法、KotlinからJavaを呼び出す方法、アノテーションによる相互運用のカスタマイズを学ぶ",
    sections: [
      {
        title: "@JvmStatic と @JvmField",
        content:
          "KotlinコードをJavaから呼び出す際、companion object のメンバーは Companion クラスを経由してアクセスする必要があります。@JvmStatic を付けると、Javaから静的メソッドとして直接呼び出せるようになります。@JvmField はKotlinプロパティのgetter/setter を生成せず、Javaのフィールドとして直接公開します。これらのアノテーションは、Java と Kotlin が混在するプロジェクトで、Java側のコードを自然に保つために重要です。",
        code: `// Kotlin側のコード
class UserRepository {
    companion object {
        // @JvmStatic なし → Java: UserRepository.Companion.create()
        fun create(): UserRepository = UserRepository()

        // @JvmStatic あり → Java: UserRepository.getInstance()
        @JvmStatic
        fun getInstance(): UserRepository = UserRepository()

        // @JvmField で定数をフィールドとして公開
        @JvmField
        val DEFAULT_PAGE_SIZE = 20

        // const val は自動的にJavaの static final になる
        const val MAX_RESULTS = 100
    }
}

// object のメンバーも同様
object AppConfig {
    @JvmStatic
    fun getVersion(): String = "1.0.0"

    @JvmField
    val DEBUG = true
}

// @JvmField でプロパティをフィールドとして公開
class User(
    @JvmField val name: String,
    @JvmField var age: Int
)

// --- Java から呼び出す場合 ---
// @JvmStatic なし:
//   UserRepository.Companion.create();
// @JvmStatic あり:
//   UserRepository.getInstance();  // 自然なJavaコード
//
// @JvmField なし:
//   user.getName();  // getter経由
// @JvmField あり:
//   user.name;       // フィールド直接アクセス
//
// const val:
//   UserRepository.MAX_RESULTS;  // 自動的にstatic final`,
      },
      {
        title: "@JvmOverloads と @JvmName",
        content:
          "@JvmOverloads はKotlinのデフォルト引数を持つ関数に対して、Javaから呼び出し可能なオーバーロードメソッドを自動生成します。Kotlinではデフォルト引数で1つの関数だけ定義すれば済みますが、Javaにはデフォルト引数がないため、このアノテーションが必要です。@JvmName はKotlinのプロパティや関数のJVM上での名前をカスタマイズします。型消去による名前衝突の回避や、Java側で自然なメソッド名にする場合に使います。",
        code: `// @JvmOverloads: デフォルト引数からオーバーロードを生成
class MessageBuilder {
    @JvmOverloads
    fun build(
        text: String,
        fontSize: Int = 14,
        color: String = "black",
        bold: Boolean = false
    ): String {
        return "[\$color/\${fontSize}px\${if (bold) "/bold" else ""}] \$text"
    }
}

// Java から呼び出す場合、以下のオーバーロードが生成される:
//   build(String text)
//   build(String text, int fontSize)
//   build(String text, int fontSize, String color)
//   build(String text, int fontSize, String color, boolean bold)

// コンストラクタにも使える
class Config @JvmOverloads constructor(
    val host: String = "localhost",
    val port: Int = 8080,
    val timeout: Long = 5000L
)
// Java: new Config(), new Config("example.com"),
//       new Config("example.com", 9090), etc.

// @JvmName: JVM上の名前を変更
@get:JvmName("isEnabled")
val enabled: Boolean = true
// Java: obj.isEnabled() （@JvmNameなしだと obj.getEnabled()）

// 型消去による衝突の回避
@JvmName("filterStrings")
fun filter(list: List<String>): List<String> = list.filter { it.isNotEmpty() }

@JvmName("filterInts")
fun filter(list: List<Int>): List<Int> = list.filter { it > 0 }
// JVM上では型消去で List<String> と List<Int> が同じ List になるため、
// @JvmName で異なるメソッド名を付ける

// --- Java との比較 ---
// Java ではオーバーロードを手動で定義する必要がある:
//   String build(String text) { return build(text, 14); }
//   String build(String text, int fontSize) { return build(text, fontSize, "black"); }
//   // ... 4つのメソッド`,
      },
      {
        title: "SAM 変換（関数型インターフェース）",
        content:
          "SAM（Single Abstract Method）変換は、Javaの関数型インターフェース（抽象メソッドが1つのインターフェース）をKotlinのラムダ式で実装できる機能です。JavaのRunnable、Callable、Comparator、各種リスナーなどをラムダで簡潔に書けます。Kotlin 1.4以降では、fun interface キーワードでKotlinでもSAMインターフェースを定義できます。Java API をKotlinから呼び出す際に、コードが大幅に簡潔になります。",
        code: `// Java の関数型インターフェースをラムダで実装
// Runnable
val task: Runnable = Runnable { println("実行中") }
Thread(task).start()

// より簡潔に
Thread { println("実行中") }.start()

// Comparator
val comparator = Comparator<String> { a, b -> a.length - b.length }
val sorted = listOf("banana", "apple", "cherry").sortedWith(comparator)

// 簡潔に
val sorted2 = listOf("banana", "apple", "cherry")
    .sortedWith(Comparator.comparingInt { it.length })

// Java API のリスナー
// button.setOnClickListener { view -> handleClick(view) }

// Callable
import java.util.concurrent.*
val executor = Executors.newSingleThreadExecutor()
val future = executor.submit(Callable {
    Thread.sleep(1000)
    "結果"
})
println(future.get())  // 結果

// Kotlin の fun interface（SAMインターフェース）
fun interface Transformer<T, R> {
    fun transform(value: T): R
}

// ラムダで実装
val intToString = Transformer<Int, String> { "値: \$it" }
println(intToString.transform(42))  // 値: 42

// 関数の引数として
fun <T, R> applyTransform(value: T, transformer: Transformer<T, R>): R {
    return transformer.transform(value)
}
val result = applyTransform(100) { it * 2 }  // SAM変換
println(result)  // 200

// --- Java との比較 ---
// Java (ラムダ以前):
//   Thread t = new Thread(new Runnable() {
//       @Override
//       public void run() { System.out.println("実行中"); }
//   });
// Java (ラムダ):
//   Thread t = new Thread(() -> System.out.println("実行中"));`,
      },
      {
        title: "Java → Kotlin 変換のベストプラクティス",
        content:
          "既存のJavaプロジェクトをKotlinに段階的に移行する際のベストプラクティスを紹介します。IntelliJ IDEA の「Convert Java File to Kotlin File」機能で自動変換した後、Kotlinらしいコードにリファクタリングします。nullアノテーション（@Nullable, @NotNull）をJava側に追加しておくと、変換後のKotlinコードのnull安全性が向上します。JavaとKotlinのファイルは同一プロジェクト内で共存でき、相互に呼び出し可能です。",
        code: `// === Java のコード ===
// public class UserService {
//     @Nullable
//     public User findById(long id) {
//         if (id <= 0) return null;
//         return new User("太郎", 25);
//     }
//
//     public List<User> findAll() {
//         return Collections.unmodifiableList(users);
//     }
//
//     public void processUsers(List<User> users) {
//         for (User user : users) {
//             if (user != null && user.getName() != null) {
//                 System.out.println(user.getName().toUpperCase());
//             }
//         }
//     }
// }

// === Kotlin に変換後（リファクタリング済み）===
class UserService {
    fun findById(id: Long): User? {
        if (id <= 0) return null
        return User("太郎", 25)
    }

    fun findAll(): List<User> = users.toList()

    fun processUsers(users: List<User>) {
        users.forEach { user ->
            user.name?.uppercase()?.let { println(it) }
        }
    }
}

// 変換のポイント:
// 1. @Nullable → Nullable型 (?)
// 2. getter/setter → プロパティ
// 3. Collections.unmodifiable → toList()
// 4. null チェック → ?. と let
// 5. for-each → forEach
// 6. static メソッド → companion object
// 7. StringBuilder → buildString {}
// 8. try-with-resources → .use {}

// try-with-resources の変換例
// Java:
//   try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
//       String line = br.readLine();
//   }

// Kotlin:
val text = java.io.File("file.txt").bufferedReader().use { reader ->
    reader.readText()
}

// Java Stream → Kotlin コレクション操作
// Java: users.stream().filter(u -> u.getAge() > 20).collect(Collectors.toList())
// Kotlin:
val adults = users.filter { it.age > 20 }`,
      },
      {
        title: "プラットフォーム型と null 安全の注意点",
        content:
          "KotlinからJavaコードを呼び出す際、Javaの戻り値はプラットフォーム型（String! のように表記される）になります。プラットフォーム型はNullableとしても非Nullとしても扱えますが、実行時にnullが返された場合はNullPointerExceptionが発生する危険性があります。Java側に @Nullable / @NotNull アノテーションを付けることで、Kotlin側で適切なNull安全性が推論されます。Java ライブラリを使う際は、戻り値がnullを返す可能性があるかドキュメントを確認し、必要に応じてNullable型として受け取ることが重要です。",
        code: `// Java のメソッド（nullアノテーションなし）
// public class JavaUtils {
//     public static String getValue() { ... }  // nullを返す可能性あり
// }

// Kotlin から呼び出す場合
// 戻り値は String!（プラットフォーム型）
val value1: String = JavaUtils.getValue()   // 非Nullとして扱う（危険）
val value2: String? = JavaUtils.getValue()  // Nullableとして扱う（安全）

// 安全なパターン（推奨）
val safeName: String = JavaUtils.getValue() ?: "デフォルト"

// Java側にアノテーションを追加（推奨）
// import org.jetbrains.annotations.Nullable;
// import org.jetbrains.annotations.NotNull;
//
// @NotNull
// public static String getName() { return "太郎"; }
//
// @Nullable
// public static String getNickname() { return null; }

// Kotlinから呼ぶと正しく推論される
// val name: String = JavaUtils.getName()       // OK: 非Null型
// val nick: String? = JavaUtils.getNickname()  // OK: Nullable型

// Java コレクションの注意点
// Java: List<String> はKotlinでは MutableList<String!>!
// → 要素もNullable、リスト自体もNullable

// 安全に受け取る
fun processJavaList(javaList: List<String?>?) {
    val safeList: List<String> = javaList
        ?.filterNotNull()
        ?: emptyList()
    safeList.forEach { println(it) }
}

// 対応するnullアノテーション一覧:
// JetBrains: @Nullable / @NotNull
// Android:   @Nullable / @NonNull
// JSR-305:   @Nullable / @Nonnull
// Spring:    @Nullable / @NonNull
// これらはすべてKotlinコンパイラが認識する`,
      },
    ],
  },
  {
    id: "spring-boot-kotlin",
    title: "Spring Boot × Kotlin",
    category: "practice",
    description:
      "KotlinでSpring Bootアプリケーションを開発する方法、Kotlin DSL、テストの書き方を学ぶ",
    sections: [
      {
        title: "Spring Boot プロジェクトの構成",
        content:
          "Spring Boot は Kotlin を公式にサポートしており、Spring Initializr で Kotlin を選択してプロジェクトを生成できます。build.gradle.kts（Kotlin DSL）を使い、kotlin-spring プラグインで @Configuration や @Service などのクラスを自動的に open にします（Kotlinのクラスはデフォルトfinalのため）。kotlin-jpa プラグインは JPA エンティティに引数なしコンストラクタを生成します。これらのプラグインにより、Kotlinでも Spring Boot をスムーズに使えます。",
        code: `// build.gradle.kts
plugins {
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("jvm") version "1.9.21"
    kotlin("plugin.spring") version "1.9.21"  // openを自動付与
    kotlin("plugin.jpa") version "1.9.21"     // 引数なしコンストラクタ生成
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
}

// アプリケーションのエントリーポイント
@SpringBootApplication
class MyApplication

fun main(args: Array<String>) {
    runApplication<MyApplication>(*args)
}

// REST コントローラ
@RestController
@RequestMapping("/api/users")
class UserController(
    private val userService: UserService  // コンストラクタインジェクション
) {
    @GetMapping
    fun findAll(): List<UserResponse> = userService.findAll()

    @GetMapping("/{id}")
    fun findById(@PathVariable id: Long): UserResponse =
        userService.findById(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    fun create(@RequestBody @Valid request: CreateUserRequest): UserResponse =
        userService.create(request)
}`,
      },
      {
        title: "エンティティとリポジトリ",
        content:
          "KotlinでJPAエンティティを定義する場合、data class は equals/hashCode の自動生成がJPAのプロキシと相性が悪いため、通常のクラスを使います。kotlin-jpa プラグインがno-argコンストラクタを生成するため、手動で追加する必要はありません。Spring Data のリポジトリインターフェースはJavaと同様に定義でき、Kotlinの null 安全性を活かして Optional の代わりに Nullable 型を使えます。",
        code: `// JPA エンティティ（data classではなく通常のクラスを使用）
@Entity
@Table(name = "users")
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false, unique = true)
    var email: String,

    @Column(nullable = false)
    var age: Int,

    @CreatedDate
    var createdAt: LocalDateTime = LocalDateTime.now()
) {
    // toString, equals, hashCode は必要に応じて手動定義
    override fun toString() = "User(id=\$id, name=\$name)"
}

// リポジトリ（Optional ではなく Nullable 型を使用）
interface UserRepository : JpaRepository<User, Long> {
    // Optional<User> ではなく User? を返す
    fun findByEmail(email: String): User?

    fun findByAgeGreaterThan(age: Int): List<User>

    @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword%")
    fun searchByName(@Param("keyword") keyword: String): List<User>
}

// サービス層
@Service
@Transactional(readOnly = true)
class UserService(
    private val userRepository: UserRepository
) {
    fun findAll(): List<UserResponse> =
        userRepository.findAll().map { it.toResponse() }

    fun findById(id: Long): UserResponse? =
        userRepository.findById(id).orElse(null)?.toResponse()

    @Transactional
    fun create(request: CreateUserRequest): UserResponse {
        val user = User(
            name = request.name,
            email = request.email,
            age = request.age
        )
        return userRepository.save(user).toResponse()
    }
}

// 拡張関数で変換ロジックを分離
fun User.toResponse() = UserResponse(
    id = this.id,
    name = this.name,
    email = this.email,
    age = this.age
)`,
      },
      {
        title: "Kotlin DSL の活用",
        content:
          "Kotlinの言語機能（ラムダ式、拡張関数、型安全ビルダー）を活用して、ドメイン固有言語（DSL）を構築できます。Spring Framework でも Router Function DSL（WebFlux/WebMvc.fn）やBean Definition DSL が用意されています。型安全なビルダーパターンにより、設定ミスをコンパイル時に検出でき、IDE の補完も効くため生産性が向上します。",
        code: `// Spring Router Function DSL（WebMvc.fn）
@Configuration
class RouterConfig {
    @Bean
    fun userRoutes(handler: UserHandler) = router {
        "/api/users".nest {
            GET("") { handler.findAll(it) }
            GET("/{id}") { handler.findById(it) }
            POST("") { handler.create(it) }
            PUT("/{id}") { handler.update(it) }
            DELETE("/{id}") { handler.delete(it) }
        }
    }
}

// Bean Definition DSL
fun beans() = beans {
    bean<UserService>()
    bean<UserRepository>()
    bean {
        UserHandler(ref())  // ref() で依存性を自動解決
    }
}

// 独自DSLの例: クエリビルダー
class QueryBuilder {
    private val conditions = mutableListOf<String>()
    private var orderBy: String? = null
    private var limit: Int? = null

    fun where(condition: String) { conditions += condition }
    fun orderBy(field: String) { orderBy = field }
    fun limit(n: Int) { limit = n }

    fun build(): String = buildString {
        append("SELECT * FROM users")
        if (conditions.isNotEmpty()) {
            append(" WHERE ")
            append(conditions.joinToString(" AND "))
        }
        orderBy?.let { append(" ORDER BY \$it") }
        limit?.let { append(" LIMIT \$it") }
    }
}

fun query(block: QueryBuilder.() -> Unit): String {
    return QueryBuilder().apply(block).build()
}

// DSL の使用
val sql = query {
    where("age > 20")
    where("status = 'active'")
    orderBy("name")
    limit(10)
}
println(sql)
// SELECT * FROM users WHERE age > 20 AND status = 'active' ORDER BY name LIMIT 10

// 型安全ビルダーの例: HTML DSL
fun html(block: HtmlBuilder.() -> Unit): String =
    HtmlBuilder().apply(block).build()

val page = html {
    head { title("Kotlin DSL") }
    body {
        h1("Welcome")
        p("Kotlin DSL で HTML を構築")
    }
}`,
      },
      {
        title: "テスト（JUnit 5 + MockK）",
        content:
          "KotlinでのSpring Bootテストは、JUnit 5 に加えて MockK（Kotlinネイティブのモッキングライブラリ）や SpringMockK を使うのが一般的です。Mockito はKotlinのfinalクラスや非Null型との相性が悪いため、MockK が推奨されます。テスト関数名にバッククォートで日本語名を付けられるのもKotlinの特徴です。kotlin-test ライブラリを使えば、assertionsをより読みやすく書けます。",
        code: `// 依存関係: build.gradle.kts
// testImplementation("io.mockk:mockk:1.13.8")
// testImplementation("com.ninja-squad:springmockk:4.0.2")

// ユニットテスト（MockK）
class UserServiceTest {
    private val userRepository = mockk<UserRepository>()
    private val userService = UserService(userRepository)

    @Test
    fun \`ユーザーをIDで検索できる\`() {
        // Given
        val user = User(id = 1, name = "太郎", email = "taro@example.com", age = 25)
        every { userRepository.findById(1L) } returns Optional.of(user)

        // When
        val result = userService.findById(1L)

        // Then
        assertNotNull(result)
        assertEquals("太郎", result!!.name)
        verify(exactly = 1) { userRepository.findById(1L) }
    }

    @Test
    fun \`存在しないIDはnullを返す\`() {
        every { userRepository.findById(999L) } returns Optional.empty()

        val result = userService.findById(999L)

        assertNull(result)
    }
}

// 統合テスト（SpringMockK）
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @MockkBean
    lateinit var userService: UserService

    @Test
    fun \`全ユーザーを取得できる\`() {
        val users = listOf(
            UserResponse(1, "太郎", "taro@example.com", 25)
        )
        every { userService.findAll() } returns users

        mockMvc.get("/api/users") {
            accept = MediaType.APPLICATION_JSON
        }.andExpect {
            status { isOk() }
            jsonPath("\$.length()") { value(1) }
            jsonPath("\$[0].name") { value("太郎") }
        }
    }

    @Test
    fun \`存在しないユーザーは404\`() {
        every { userService.findById(999L) } returns null

        mockMvc.get("/api/users/999")
            .andExpect { status { isNotFound() } }
    }
}`,
      },
      {
        title: "Spring Boot + Kotlin のベストプラクティス",
        content:
          "Spring Boot と Kotlin を組み合わせる際のベストプラクティスをまとめます。コンストラクタインジェクション（Kotlinのプライマリコンストラクタ）を使い、lateinit var でのフィールドインジェクションを避けます。設定プロパティは data class で型安全に定義し、バリデーションには JSR-303 アノテーションを活用します。拡張関数でドメインロジックを整理し、sealed class でエラーハンドリングを型安全に行うのが効果的です。",
        code: `// 1. コンストラクタインジェクション（推奨）
@Service
class OrderService(
    private val orderRepository: OrderRepository,
    private val userService: UserService,
    private val notificationService: NotificationService
)
// lateinit var + @Autowired は避ける

// 2. 設定プロパティ（data class + @ConfigurationProperties）
@ConfigurationProperties(prefix = "app")
data class AppProperties(
    val name: String = "MyApp",
    val maxRetries: Int = 3,
    val database: DatabaseProperties = DatabaseProperties()
) {
    data class DatabaseProperties(
        val url: String = "",
        val poolSize: Int = 10
    )
}

// 3. バリデーション付きリクエストDTO
data class CreateUserRequest(
    @field:NotBlank(message = "名前は必須です")
    @field:Size(max = 50, message = "名前は50文字以内")
    val name: String,

    @field:Email(message = "有効なメールアドレスを入力")
    val email: String,

    @field:Min(0) @field:Max(150)
    val age: Int
)

// 4. sealed class でエラーハンドリング
sealed class ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>()
    data class Error(val message: String, val code: Int) : ApiResult<Nothing>()
}

@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidation(e: MethodArgumentNotValidException): ResponseEntity<Map<String, Any>> {
        val errors = e.bindingResult.fieldErrors
            .associate { it.field to (it.defaultMessage ?: "不正な値") }
        return ResponseEntity.badRequest().body(
            mapOf("errors" to errors, "message" to "バリデーションエラー")
        )
    }
}

// 5. 拡張関数でロジックを整理
fun User.isAdult(): Boolean = this.age >= 18
fun List<User>.activeUsers(): List<User> = this.filter { it.status == "active" }

// 6. Kotlin コルーチン + WebFlux
@RestController
class ReactiveUserController(private val userService: UserService) {
    @GetMapping("/api/users/{id}")
    suspend fun findById(@PathVariable id: Long): UserResponse =
        userService.findById(id)
            ?: throw ResponseStatusException(HttpStatus.NOT_FOUND)
}`,
      },
    ],
  },
];

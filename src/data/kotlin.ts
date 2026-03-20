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
  { id: "android", name: "Android開発", color: "#3DDC84" },
  { id: "ecosystem", name: "エコシステム", color: "#2563EB" },
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

  // ===== 型システムとジェネリクス =====
  {
    id: "type-system",
    title: "型システムとジェネリクス",
    category: "basics",
    description:
      "Kotlinの型階層（Any, Unit, Nothing）、ジェネリクス、共変・反変（in/out）、型消去と具体化（reified）、型エイリアスとインライン型を学ぶ",
    sections: [
      {
        title: "Kotlinの型階層（Any, Unit, Nothing）",
        content:
          "Kotlinの型システムはすべての型が階層構造を持ちます。Any はすべての非null型のスーパークラスであり、Javaの Object に相当します。Unit は戻り値がないことを示す型で、Javaの void に相当しますが、Unit はれっきとしたオブジェクト型でシングルトンインスタンスを持ちます。Nothing はすべての型のサブタイプであり、値が存在しないことを表します。例外をスローする関数や無限ループなど、正常に戻ることがない関数の戻り値型として使われます。Any? はnullable型を含むすべての型のスーパータイプです。",
        code: `// Any: すべての非null型のスーパークラス
fun printInfo(value: Any) {
    println("値: \${value}, 型: \${value::class.simpleName}")
}
printInfo(42)        // 値: 42, 型: Int
printInfo("Hello")   // 値: Hello, 型: String
printInfo(listOf(1)) // 値: [1], 型: ArrayList

// Any のメンバー: equals, hashCode, toString
val obj: Any = "Kotlin"
println(obj.equals("Kotlin"))  // true
println(obj.hashCode())        // ハッシュ値
println(obj.toString())        // Kotlin

// Unit: void相当だが、オブジェクト型
fun logMessage(msg: String): Unit {
    println("[LOG] \${msg}")
}

// Unit はジェネリクスで活用できる
val callback: () -> Unit = { println("完了") }
val results: List<Unit> = listOf(Unit, Unit)

// Nothing: 正常に戻らない関数の戻り値型
fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}

// Nothing は全型のサブタイプなので型推論に役立つ
val value: String = if (true) "OK" else fail("エラー")

// Nothing? は null のみ取りうる型
val n: Nothing? = null`,
      },
      {
        title: "ジェネリクスの基本",
        content:
          "Kotlinのジェネリクスは型パラメータを使って型安全な汎用コードを書くための仕組みです。クラスや関数に型パラメータ <T> を付けて定義します。Javaと同様に型消去（type erasure）が行われますが、Kotlinでは宣言側で変位（variance）を指定できる宣言サイト変位や、reified型パラメータによる型消去の回避など、Javaにはない強力な機能があります。ジェネリック制約（上界）を指定することで、型パラメータに特定のスーパータイプを要求できます。",
        code: `// ジェネリッククラス
class Stack<T> {
    private val elements = mutableListOf<T>()

    fun push(element: T) {
        elements.add(element)
    }

    fun pop(): T {
        if (elements.isEmpty()) throw NoSuchElementException("スタックが空です")
        return elements.removeAt(elements.size - 1)
    }

    fun peek(): T = elements.last()
    fun isEmpty(): Boolean = elements.isEmpty()
    override fun toString(): String = elements.toString()
}

val intStack = Stack<Int>()
intStack.push(1)
intStack.push(2)
println(intStack.pop())  // 2

// ジェネリック関数
fun <T> singletonList(item: T): List<T> = listOf(item)
val list = singletonList("Kotlin")  // 型推論でString

// 上界制約（Javaの <T extends Comparable<T>> に相当）
fun <T : Comparable<T>> maxOf(a: T, b: T): T {
    return if (a >= b) a else b
}
println(maxOf(3, 7))        // 7
println(maxOf("abc", "xyz")) // xyz

// 複数の制約（where句）
fun <T> ensureValid(value: T)
    where T : CharSequence,
          T : Comparable<T> {
    require(value.length > 0) { "空文字列は不可" }
    println("有効な値: \${value}")
}
ensureValid("Hello")  // 有効な値: Hello`,
      },
      {
        title: "共変・反変（out / in）",
        content:
          "ジェネリクスの変位（variance）は型パラメータの代入互換性を制御します。Kotlinでは宣言サイト変位をサポートしており、out キーワードで共変（covariant）、in キーワードで反変（contravariant）を指定します。共変（out T）は T を出力（戻り値）にのみ使用でき、Producer<Dog> を Producer<Animal> として扱えます。反変（in T）は T を入力（引数）にのみ使用でき、Consumer<Animal> を Consumer<Dog> として扱えます。Javaの <? extends T> が out T に、<? super T> が in T に対応します。",
        code: `// 共変（out）: 型パラメータを出力（戻り値）にのみ使用
interface Producer<out T> {
    fun produce(): T
    // fun consume(item: T)  // コンパイルエラー！out は引数に使えない
}

open class Animal(val name: String)
class Dog(name: String, val breed: String) : Animal(name)

class DogProducer : Producer<Dog> {
    override fun produce(): Dog = Dog("ポチ", "柴犬")
}

// Dog は Animal のサブタイプなので、Producer<Dog> を Producer<Animal> として扱える
val animalProducer: Producer<Animal> = DogProducer()
println(animalProducer.produce().name)  // ポチ

// 反変（in）: 型パラメータを入力（引数）にのみ使用
interface Consumer<in T> {
    fun consume(item: T)
    // fun produce(): T  // コンパイルエラー！in は戻り値に使えない
}

class AnimalConsumer : Consumer<Animal> {
    override fun consume(item: Animal) {
        println("動物を処理: \${item.name}")
    }
}

// Animal は Dog のスーパータイプなので、Consumer<Animal> を Consumer<Dog> として扱える
val dogConsumer: Consumer<Dog> = AnimalConsumer()
dogConsumer.consume(Dog("タロウ", "秋田犬"))

// 使用サイト変位（型プロジェクション）
fun copy(from: Array<out Animal>, to: Array<in Animal>) {
    for (i in from.indices) {
        to[i] = from[i]
    }
}

// スター投影（Javaの <?> に相当）
fun printAll(list: List<*>) {
    list.forEach { println(it) }
}`,
      },
      {
        title: "型消去と具体化（reified）",
        content:
          "JVM上ではジェネリクスの型情報はコンパイル時に消去されます（型消去 / type erasure）。そのため、実行時に is List<String> のようなジェネリック型チェックは通常できません。Kotlinでは inline 関数と reified 型パラメータを組み合わせることで、この制限を回避できます。reified を付けた型パラメータは実行時にも型情報が保持され、is チェックや ::class の取得が可能になります。これはKotlin独自の強力な機能で、Javaには同等の仕組みがありません。",
        code: `// 型消去により実行時にジェネリック型を取得できない
// fun <T> isType(value: Any): Boolean {
//     return value is T  // コンパイルエラー：型消去のため
// }

// reified + inline で型情報を保持
inline fun <reified T> isType(value: Any): Boolean {
    return value is T  // OK！reified により型情報が保持される
}

println(isType<String>("Hello"))  // true
println(isType<Int>("Hello"))     // false
println(isType<List<*>>(listOf(1, 2)))  // true

// reified で型安全なキャスト
inline fun <reified T> filterByType(list: List<Any>): List<T> {
    return list.filterIsInstance<T>()
}

val mixed: List<Any> = listOf(1, "hello", 2.0, "world", 3)
val strings = filterByType<String>(mixed)
println(strings)  // [hello, world]
val ints = filterByType<Int>(mixed)
println(ints)  // [1, 3]

// reified でクラス参照を取得
inline fun <reified T> printClassName() {
    println("クラス名: \${T::class.simpleName}")
    println("Java クラス: \${T::class.java}")
}
printClassName<String>()  // クラス名: String

// 実用例: JSON デシリアライゼーション
inline fun <reified T> fromJson(json: String): T {
    val mapper = ObjectMapper()
    return mapper.readValue(json, T::class.java)
}

data class User(val name: String, val age: Int)
val user = fromJson<User>("""{"name":"太郎","age":25}""")
println(user)  // User(name=太郎, age=25)

// reified はインライン関数でのみ使用可能
// fun <reified T> notInline() {}  // コンパイルエラー`,
      },
      {
        title: "型エイリアスとインライン型（value class）",
        content:
          "型エイリアス（typealias）は既存の型に別名を付ける機能で、長い型名を短くしたり、意図を明確にするのに使います。ただし型エイリアスは新しい型を作るわけではなく、コンパイル時に元の型に置き換えられます。一方、value class（旧 inline class）は実行時のオーバーヘッドなしに新しい型を定義できる機能です。プリミティブ型をラップして型安全性を高めるのに最適で、ドメイン駆動設計のValue Objectパターンを軽量に実現できます。",
        code: `// 型エイリアス: 長い型に短い別名を付ける
typealias UserMap = Map<String, List<User>>
typealias Predicate<T> = (T) -> Boolean
typealias ClickHandler = (view: View, x: Int, y: Int) -> Unit

// 使用例
fun findUsers(predicate: Predicate<User>): List<User> {
    val allUsers = listOf(
        User("太郎", 25),
        User("花子", 30),
        User("次郎", 20)
    )
    return allUsers.filter(predicate)
}

val adults = findUsers { it.age >= 25 }
println(adults)  // [User(太郎, 25), User(花子, 30)]

// value class（インライン型）: ゼロオーバーヘッドのラッパー型
@JvmInline
value class UserId(val value: Long)

@JvmInline
value class Email(val value: String) {
    init {
        require(value.contains("@")) { "無効なメール: \${value}" }
    }

    val domain: String
        get() = value.substringAfter("@")
}

// 型安全性の確保（IDの取り違え防止）
@JvmInline
value class OrderId(val value: Long)

fun findUser(userId: UserId): User? = null
fun findOrder(orderId: OrderId): Order? = null

val userId = UserId(123L)
val orderId = OrderId(456L)

findUser(userId)    // OK
// findUser(orderId) // コンパイルエラー！型が異なる

// 実行時にはアンボクシングされるためオーバーヘッドなし
val email = Email("taro@example.com")
println(email.domain)  // example.com

// 関数型の型エイリアスでコールバック定義を明確化
typealias OnSuccess<T> = (T) -> Unit
typealias OnError = (Exception) -> Unit

fun fetchData(
    onSuccess: OnSuccess<String>,
    onError: OnError
) {
    try {
        onSuccess("データ取得成功")
    } catch (e: Exception) {
        onError(e)
    }
}`,
      },
    ],
  },
  // ===== 委譲パターン =====
  {
    id: "delegation",
    title: "委譲パターン",
    category: "features",
    description:
      "by キーワードによるクラス委譲、委譲プロパティ（lazy, observable, vetoable）、Map委譲、カスタム委譲の実装方法を学ぶ",
    sections: [
      {
        title: "by キーワードによるクラス委譲",
        content:
          "Kotlinでは by キーワードを使ってクラス委譲（Delegation Pattern）を言語レベルでサポートしています。インターフェースの実装を別のオブジェクトに委譲することで、継承を使わずにコードの再利用が可能になります。GoFのデコレータパターンをボイラープレートなしに実現でき、「継承より委譲」の原則を容易に適用できます。委譲先のオブジェクトのメソッドが自動的に呼び出され、必要なメソッドだけをオーバーライドして振る舞いを変更できます。",
        code: `// インターフェースの定義
interface Logger {
    fun log(message: String)
    fun error(message: String)
    fun warn(message: String)
}

// 基本的な実装
class ConsoleLogger : Logger {
    override fun log(message: String) = println("[INFO] \${message}")
    override fun error(message: String) = println("[ERROR] \${message}")
    override fun warn(message: String) = println("[WARN] \${message}")
}

// by で委譲（ConsoleLogger にすべてを委譲し、一部をオーバーライド）
class TimestampLogger(
    private val delegate: Logger
) : Logger by delegate {
    // log のみオーバーライド。error, warn は delegate に自動委譲
    override fun log(message: String) {
        val timestamp = java.time.LocalDateTime.now()
        delegate.log("[\${timestamp}] \${message}")
    }
}

val logger = TimestampLogger(ConsoleLogger())
logger.log("処理開始")   // [INFO] [2024-01-01T10:00:00] 処理開始
logger.error("失敗")     // [ERROR] 失敗（委譲される）

// 複数インターフェースの委譲
interface Printer {
    fun printDoc(content: String)
}

interface Scanner {
    fun scan(): String
}

class SimplePrinter : Printer {
    override fun printDoc(content: String) = println("印刷: \${content}")
}

class SimpleScanner : Scanner {
    override fun scan(): String = "スキャン結果"
}

// 複合機：2つのインターフェースをそれぞれ委譲
class MultiFunctionDevice(
    printer: Printer,
    scanner: Scanner
) : Printer by printer, Scanner by scanner

val device = MultiFunctionDevice(SimplePrinter(), SimpleScanner())
device.printDoc("資料")  // 印刷: 資料
println(device.scan())   // スキャン結果`,
      },
      {
        title: "委譲プロパティ: lazy, observable, vetoable",
        content:
          "Kotlinの委譲プロパティ（delegated properties）は、プロパティの get/set を別のオブジェクトに委譲する仕組みです。標準ライブラリには便利な委譲プロパティが用意されています。lazy は初回アクセス時に値を計算してキャッシュし、observable はプロパティの変更を監視してコールバックを実行し、vetoable は変更を条件付きで拒否できます。これらを活用することで、ボイラープレートコードを大幅に削減できます。",
        code: `import kotlin.properties.Delegates

// lazy: 遅延初期化（初回アクセス時に計算し、結果をキャッシュ）
class DatabaseConnection {
    // 重い初期化を遅延させる
    val connection: Connection by lazy {
        println("データベース接続を初期化...")
        DriverManager.getConnection("jdbc:postgresql://localhost/mydb")
    }
    // connectionを使うまでDBに接続しない
}

// lazy のスレッドセーフモード指定
val config: Map<String, String> by lazy(LazyThreadSafetyMode.SYNCHRONIZED) {
    println("設定を読み込み中...")
    loadConfigFromFile()
}

// observable: プロパティ変更の監視
class UserProfile {
    var name: String by Delegates.observable("未設定") { prop, old, new ->
        println("\${prop.name} が '\${old}' から '\${new}' に変更されました")
    }

    var score: Int by Delegates.observable(0) { _, old, new ->
        if (new > old) println("スコアUP: \${old} → \${new}")
        else println("スコアDOWN: \${old} → \${new}")
    }
}

val profile = UserProfile()
profile.name = "太郎"  // name が '未設定' から '太郎' に変更されました
profile.score = 100    // スコアUP: 0 → 100
profile.score = 80     // スコアDOWN: 100 → 80

// vetoable: 条件を満たさない変更を拒否
class BankAccount {
    var balance: Int by Delegates.vetoable(0) { _, _, newValue ->
        newValue >= 0  // 残高がマイナスになる変更は拒否
    }
}

val account = BankAccount()
account.balance = 1000
println(account.balance)  // 1000
account.balance = -500    // 拒否される
println(account.balance)  // 1000（変更されない）`,
      },
      {
        title: "Map委譲",
        content:
          "KotlinではMapをプロパティの委譲先として使用できます。val プロパティには Map を、var プロパティには MutableMap を委譲します。プロパティ名がMapのキーとして使われ、Mapから値が取得されます。JSONやYAMLのパース結果など、動的なキー・バリューデータをオブジェクトのプロパティとして扱いたい場合に非常に便利です。設定ファイルの読み込みやAPIレスポンスのマッピングなどで活用されます。",
        code: `// Map 委譲: Map のキーをプロパティ名として使う
class UserConfig(map: Map<String, Any?>) {
    val name: String by map
    val age: Int by map
    val email: String by map
}

val configMap = mapOf(
    "name" to "太郎",
    "age" to 25,
    "email" to "taro@example.com"
)

val userConfig = UserConfig(configMap)
println(userConfig.name)   // 太郎
println(userConfig.age)    // 25
println(userConfig.email)  // taro@example.com

// MutableMap 委譲: 書き込み可能なプロパティ
class MutableSettings(map: MutableMap<String, Any?>) {
    var theme: String by map
    var fontSize: Int by map
    var darkMode: Boolean by map
}

val settingsMap = mutableMapOf<String, Any?>(
    "theme" to "default",
    "fontSize" to 14,
    "darkMode" to false
)

val settings = MutableSettings(settingsMap)
println(settings.theme)  // default

settings.theme = "dark"
settings.darkMode = true
// Map も更新される
println(settingsMap["theme"])     // dark
println(settingsMap["darkMode"])  // true

// 実用例: JSONレスポンスのパース
fun parseApiResponse(json: String): Map<String, Any?> {
    // 実際にはJSON パーサーを使用
    return mapOf(
        "id" to 1,
        "title" to "Kotlin入門",
        "published" to true
    )
}

class Article(response: Map<String, Any?>) {
    val id: Int by response
    val title: String by response
    val published: Boolean by response

    override fun toString() = "Article(id=\${id}, title=\${title})"
}

val article = Article(parseApiResponse("{}"))
println(article)  // Article(id=1, title=Kotlin入門)`,
      },
      {
        title: "カスタム委譲プロパティ",
        content:
          "独自の委譲プロパティを作成するには、ReadOnlyProperty<R, T> または ReadWriteProperty<R, T> インターフェースを実装するか、operator fun getValue / operator fun setValue を持つクラスを定義します。バリデーション付きプロパティ、キャッシュ付きプロパティ、ログ出力付きプロパティなど、プロパティのアクセスパターンを再利用可能な形でカプセル化できます。provideDelegate 演算子を使えば、委譲の初期化時にバリデーションを行うこともできます。",
        code: `import kotlin.reflect.KProperty

// カスタム委譲クラス: バリデーション付きプロパティ
class Validated<T>(
    private var value: T,
    private val validator: (T) -> Boolean,
    private val errorMessage: String = "無効な値"
) {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): T = value

    operator fun setValue(thisRef: Any?, property: KProperty<*>, newValue: T) {
        if (validator(newValue)) {
            value = newValue
        } else {
            throw IllegalArgumentException(
                "\${property.name}: \${errorMessage} (値: \${newValue})"
            )
        }
    }
}

// 使用例
class RegistrationForm {
    var age: Int by Validated(0, { it in 0..150 }, "年齢は0〜150")
    var email: String by Validated("", { it.contains("@") }, "無効なメール形式")
    var name: String by Validated("", { it.isNotBlank() }, "空文字不可")
}

val form = RegistrationForm()
form.age = 25       // OK
form.name = "太郎"  // OK
// form.age = 200   // IllegalArgumentException: age: 年齢は0〜150

// キャッシュ付き委譲プロパティ（TTL付き）
class CachedProperty<T>(
    private val ttlMillis: Long,
    private val loader: () -> T
) {
    private var cachedValue: T? = null
    private var lastLoadTime: Long = 0

    operator fun getValue(thisRef: Any?, property: KProperty<*>): T {
        val now = System.currentTimeMillis()
        if (cachedValue == null || now - lastLoadTime > ttlMillis) {
            cachedValue = loader()
            lastLoadTime = now
            println("\${property.name} をリロード")
        }
        return cachedValue!!
    }
}

// 委譲プロパティを作成するヘルパー関数
fun <T> cached(ttlMillis: Long = 60_000, loader: () -> T) =
    CachedProperty(ttlMillis, loader)

class ApiClient {
    // 60秒キャッシュ
    val users: List<String> by cached(60_000) {
        println("APIからユーザー一覧を取得中...")
        listOf("太郎", "花子", "次郎")
    }
}

val client = ApiClient()
println(client.users)  // APIから取得（初回）
println(client.users)  // キャッシュから返す`,
      },
      {
        title: "クラス委譲の実践パターン",
        content:
          "クラス委譲は実際のプロジェクトで様々なパターンに活用できます。ログ付きラッパー、アクセス制御付きコレクション、イベント発行機能の追加など、既存クラスの機能を拡張する際に威力を発揮します。継承よりも柔軟で、インターフェースに対して実装を差し替えやすいため、テスタブルな設計にも貢献します。Kotlinでは委譲がゼロオーバーヘッドでコンパイルされるため、パフォーマンス面の心配もありません。",
        code: `// パターン1: アクセス制御付きコレクション
class ReadOnlyAfterInit<T>(
    private val inner: MutableList<T> = mutableListOf()
) : List<T> by inner {
    private var initialized = false

    fun initialize(items: List<T>) {
        check(!initialized) { "既に初期化済み" }
        inner.addAll(items)
        initialized = true
    }
}

val items = ReadOnlyAfterInit<String>()
items.initialize(listOf("A", "B", "C"))
println(items[0])   // A
println(items.size) // 3
// items.initialize(listOf("D"))  // IllegalStateException

// パターン2: イベント通知付きリスト
interface ListChangeListener<T> {
    fun onAdd(item: T)
    fun onRemove(item: T)
}

class ObservableList<T>(
    private val inner: MutableList<T> = mutableListOf(),
    private val listener: ListChangeListener<T>
) : MutableList<T> by inner {
    override fun add(element: T): Boolean {
        val result = inner.add(element)
        if (result) listener.onAdd(element)
        return result
    }

    override fun remove(element: T): Boolean {
        val result = inner.remove(element)
        if (result) listener.onRemove(element)
        return result
    }
}

val observableList = ObservableList<String>(
    listener = object : ListChangeListener<String> {
        override fun onAdd(item: String) = println("追加: \${item}")
        override fun onRemove(item: String) = println("削除: \${item}")
    }
)
observableList.add("Kotlin")   // 追加: Kotlin
observableList.add("Java")     // 追加: Java
observableList.remove("Java")  // 削除: Java

// パターン3: リポジトリの委譲でキャッシュ層を追加
interface UserRepository {
    fun findById(id: Long): User?
    fun findAll(): List<User>
    fun save(user: User): User
}

class CachedUserRepository(
    private val delegate: UserRepository
) : UserRepository by delegate {
    private val cache = mutableMapOf<Long, User>()

    override fun findById(id: Long): User? {
        return cache.getOrPut(id) {
            delegate.findById(id) ?: return null
        }
    }

    override fun save(user: User): User {
        val saved = delegate.save(user)
        cache[saved.id] = saved  // キャッシュを更新
        return saved
    }
}`,
      },
    ],
  },
  // ===== DSL構築 =====
  {
    id: "dsl",
    title: "DSL構築",
    category: "features",
    description:
      "レシーバー付きラムダ、型安全ビルダー、@DslMarkerを活用したドメイン固有言語（DSL）の構築方法を学ぶ",
    sections: [
      {
        title: "レシーバー付きラムダ",
        content:
          "レシーバー付きラムダ（Lambda with Receiver）はKotlinのDSL構築の基盤となる機能です。通常のラムダ式 (引数) -> 戻り値 に対して、レシーバー型を追加した レシーバー型.(引数) -> 戻り値 という関数型です。ラムダ内で this でレシーバーオブジェクトにアクセスでき、レシーバーのメンバーを直接呼び出せます。標準ライブラリの apply, run, with もこの仕組みで実装されています。拡張関数と組み合わせることで、自然な記述のDSLを構築できます。",
        code: `// 通常のラムダ
val normalLambda: (StringBuilder) -> Unit = { sb ->
    sb.append("Hello")
    sb.append(" World")
}

// レシーバー付きラムダ: this で StringBuilder にアクセス
val receiverLambda: StringBuilder.() -> Unit = {
    append("Hello")   // this.append("Hello") と同じ
    append(" World")
}

// 実行方法
val sb1 = StringBuilder()
normalLambda(sb1)

val sb2 = StringBuilder()
sb2.receiverLambda()  // レシーバーオブジェクトに対して呼び出し

// buildString の自作実装
fun buildString(action: StringBuilder.() -> Unit): String {
    val sb = StringBuilder()
    sb.action()  // レシーバー付きラムダを呼び出し
    return sb.toString()
}

val result = buildString {
    append("Kotlin ")
    append("DSL ")
    append("構築")
}
println(result)  // Kotlin DSL 構築

// 実用例: 設定ビルダー
class ServerConfig {
    var host: String = "localhost"
    var port: Int = 8080
    var maxConnections: Int = 100
    var ssl: Boolean = false

    override fun toString() =
        "Server(\${host}:\${port}, maxConn=\${maxConnections}, ssl=\${ssl})"
}

fun server(config: ServerConfig.() -> Unit): ServerConfig {
    return ServerConfig().apply(config)
}

val myServer = server {
    host = "api.example.com"
    port = 443
    maxConnections = 500
    ssl = true
}
println(myServer)  // Server(api.example.com:443, maxConn=500, ssl=true)`,
      },
      {
        title: "型安全ビルダー",
        content:
          "型安全ビルダー（Type-safe Builder）はレシーバー付きラムダを組み合わせて、階層的な構造をDSLとして記述するパターンです。各レベルのビルダークラスがレシーバーとして機能し、ネストされたラムダで子要素を追加します。コンパイル時に型チェックが行われるため、不正な構造はコンパイルエラーになります。HTML、設定ファイル、テスト仕様などの階層構造を直感的に記述できます。",
        code: `// メニューDSLの例
class MenuItem(val name: String, val price: Int)

class MenuCategory(val name: String) {
    private val items = mutableListOf<MenuItem>()

    fun item(name: String, price: Int) {
        items.add(MenuItem(name, price))
    }

    fun display() {
        println("【\${name}】")
        items.forEach { println("  \${it.name}: \${it.price}円") }
    }
}

class Menu(val restaurantName: String) {
    private val categories = mutableListOf<MenuCategory>()

    fun category(name: String, init: MenuCategory.() -> Unit) {
        val cat = MenuCategory(name)
        cat.init()
        categories.add(cat)
    }

    fun display() {
        println("=== \${restaurantName} メニュー ===")
        categories.forEach { it.display() }
    }
}

fun menu(name: String, init: Menu.() -> Unit): Menu {
    val m = Menu(name)
    m.init()
    return m
}

// DSL として使用
val lunchMenu = menu("Kotlin食堂") {
    category("メイン") {
        item("カレーライス", 800)
        item("ハンバーグ定食", 950)
        item("パスタセット", 900)
    }
    category("ドリンク") {
        item("コーヒー", 300)
        item("紅茶", 300)
        item("オレンジジュース", 250)
    }
    category("デザート") {
        item("ケーキ", 400)
        item("アイスクリーム", 350)
    }
}
lunchMenu.display()
// === Kotlin食堂 メニュー ===
// 【メイン】
//   カレーライス: 800円
//   ハンバーグ定食: 950円
//   パスタセット: 900円
// 【ドリンク】
//   ...`,
      },
      {
        title: "@DslMarker によるスコープ制御",
        content:
          "@DslMarker はDSL構築時にレシーバーのスコープを制御するためのメタアノテーションです。ネストされたラムダ内で外側のレシーバーに暗黙的にアクセスすることを禁止し、誤った使い方をコンパイルエラーで防ぎます。例えば、HTML DSLでtableタグの中に直接tdタグを書くことを防げます。@DslMarker を付けたアノテーションをビルダークラスに適用することで、DSLの構造的な正しさを型システムで保証できます。",
        code: `// DslMarker アノテーションの定義
@DslMarker
annotation class FormDsl

// フォームDSL のビルダークラス群
@FormDsl
class Form(val action: String) {
    private val fields = mutableListOf<FormField>()
    private val buttons = mutableListOf<String>()

    fun textField(init: TextField.() -> Unit) {
        val field = TextField()
        field.init()
        fields.add(field)
    }

    fun selectField(init: SelectField.() -> Unit) {
        val field = SelectField()
        field.init()
        fields.add(field)
    }

    fun submitButton(label: String) {
        buttons.add(label)
    }

    fun render(): String = buildString {
        appendLine("<form action=\"\${action}\">")
        fields.forEach { appendLine("  \${it.render()}") }
        buttons.forEach { appendLine("  <button type=\"submit\">\${it}</button>") }
        appendLine("</form>")
    }
}

@FormDsl
abstract class FormField {
    var name: String = ""
    var label: String = ""
    var required: Boolean = false
    abstract fun render(): String
}

@FormDsl
class TextField : FormField() {
    var placeholder: String = ""
    var maxLength: Int = 255

    override fun render(): String {
        val req = if (required) " required" else ""
        return "<label>\${label}</label>" +
            "<input type=\"text\" name=\"\${name}\" " +
            "placeholder=\"\${placeholder}\" maxlength=\"\${maxLength}\"\${req}>"
    }
}

@FormDsl
class SelectField : FormField() {
    private val options = mutableListOf<Pair<String, String>>()

    fun option(value: String, label: String) {
        options.add(value to label)
    }

    override fun render(): String = buildString {
        append("<label>\${label}</label><select name=\"\${name}\">")
        options.forEach { (v, l) -> append("<option value=\"\${v}\">\${l}</option>") }
        append("</select>")
    }
}

// DSLエントリポイント
fun form(action: String, init: Form.() -> Unit): Form {
    return Form(action).apply(init)
}

// 使用例
val loginForm = form("/login") {
    textField {
        name = "username"
        label = "ユーザー名"
        placeholder = "メールアドレスを入力"
        required = true
        // submitButton("送信")  // コンパイルエラー！@DslMarker により外側スコープにアクセス不可
    }
    submitButton("ログイン")
}
println(loginForm.render())`,
      },
      {
        title: "HTML DSL の実装例",
        content:
          "HTML DSLはKotlinのDSL構築の代表的な応用例です。kotlinx.html ライブラリが公式に提供されていますが、ここではDSL構築の理解を深めるために、HTMLの基本構造を型安全に生成するDSLを自作します。各HTMLタグをビルダークラスとして定義し、レシーバー付きラムダでネスト構造を表現します。属性の設定、テキストコンテンツの追加、子要素の追加をすべて型安全に行えるようにします。",
        code: `// HTML DSL の基盤
@DslMarker
annotation class HtmlDsl

@HtmlDsl
open class Tag(val name: String) {
    val children = mutableListOf<Any>()  // Tag または String
    val attributes = mutableMapOf<String, String>()

    fun attr(key: String, value: String) {
        attributes[key] = value
    }

    operator fun String.unaryPlus() {
        children.add(this)
    }

    override fun toString(): String = buildString {
        append("<\${name}")
        attributes.forEach { (k, v) -> append(" \${k}=\"\${v}\"") }
        append(">")
        children.forEach { append(it.toString()) }
        append("</\${name}>")
    }
}

class HTML : Tag("html") {
    fun head(init: Head.() -> Unit) = initTag(Head(), init)
    fun body(init: Body.() -> Unit) = initTag(Body(), init)
}

class Head : Tag("head") {
    fun title(text: String) {
        val t = Tag("title")
        t.children.add(text)
        children.add(t)
    }
    fun meta(charset: String) {
        val m = Tag("meta")
        m.attr("charset", charset)
        children.add(m)
    }
}

class Body : Tag("body") {
    fun h1(init: Tag.() -> Unit) = initTag(Tag("h1"), init)
    fun p(init: Tag.() -> Unit) = initTag(Tag("p"), init)
    fun div(init: Div.() -> Unit) = initTag(Div(), init)
    fun ul(init: UL.() -> Unit) = initTag(UL(), init)
    fun a(href: String, init: Tag.() -> Unit) {
        val a = Tag("a")
        a.attr("href", href)
        a.init()
        children.add(a)
    }
}

class Div : Tag("div") {
    fun p(init: Tag.() -> Unit) = initTag(Tag("p"), init)
    fun h2(init: Tag.() -> Unit) = initTag(Tag("h2"), init)
}

class UL : Tag("ul") {
    fun li(init: Tag.() -> Unit) = initTag(Tag("li"), init)
}

fun <T : Tag> Tag.initTag(tag: T, init: T.() -> Unit): T {
    tag.init()
    children.add(tag)
    return tag
}

// DSL エントリポイント
fun html(init: HTML.() -> Unit): HTML = HTML().apply(init)

// 使用例
val page = html {
    head {
        meta("UTF-8")
        title("Kotlin DSL サンプル")
    }
    body {
        h1 { +"Kotlin DSL へようこそ" }
        div {
            attr("class", "content")
            h2 { +"特徴" }
            p { +"型安全にHTMLを構築できます" }
        }
        ul {
            li { +"簡潔な構文" }
            li { +"コンパイル時チェック" }
            li { +"IDEサポート" }
        }
        a("https://kotlinlang.org") { +"Kotlin公式サイト" }
    }
}
println(page)`,
      },
      {
        title: "テスト DSL の実装例",
        content:
          "テストDSLはBDD（振る舞い駆動開発）スタイルのテスト記述を実現するDSLです。KotlinのテストフレームワークであるKotestやSpekもDSLを活用しています。ここでは、given-when-then スタイルのテスト仕様をDSLで記述する例を示します。infix関数やレシーバー付きラムダを組み合わせることで、自然言語に近いテストコードを実現できます。実プロジェクトではKotestなどのライブラリを使うことが推奨されます。",
        code: `// テスト DSL の定義
@DslMarker
annotation class TestDsl

@TestDsl
class TestSuite(val name: String) {
    private val specs = mutableListOf<TestSpec>()
    private var passCount = 0
    private var failCount = 0

    fun scenario(name: String, init: TestSpec.() -> Unit) {
        val spec = TestSpec(name)
        spec.init()
        specs.add(spec)
    }

    fun run() {
        println("テストスイート: \${name}")
        println("=".repeat(50))
        specs.forEach { spec ->
            try {
                spec.execute()
                passCount++
                println("  ✓ \${spec.name}")
            } catch (e: AssertionError) {
                failCount++
                println("  ✗ \${spec.name}: \${e.message}")
            }
        }
        println("=".repeat(50))
        println("結果: \${passCount} 成功, \${failCount} 失敗")
    }
}

@TestDsl
class TestSpec(val name: String) {
    private var givenBlock: (() -> Unit)? = null
    private var whenBlock: (() -> Unit)? = null
    private var thenBlock: (() -> Unit)? = null

    fun given(description: String, block: () -> Unit) {
        givenBlock = block
    }

    fun whenever(description: String, block: () -> Unit) {
        whenBlock = block
    }

    fun then(description: String, block: () -> Unit) {
        thenBlock = block
    }

    fun execute() {
        givenBlock?.invoke()
        whenBlock?.invoke()
        thenBlock?.invoke()
    }
}

// アサーション用の infix 関数
infix fun <T> T.shouldBe(expected: T) {
    if (this != expected) {
        throw AssertionError("期待値: \${expected}, 実際: \${this}")
    }
}

infix fun <T> Collection<T>.shouldContain(element: T) {
    if (!this.contains(element)) {
        throw AssertionError("\${this} に \${element} が含まれていません")
    }
}

fun Boolean.shouldBeTrue() {
    if (!this) throw AssertionError("true が期待されましたが false でした")
}

// DSL エントリポイント
fun describe(name: String, init: TestSuite.() -> Unit): TestSuite {
    return TestSuite(name).apply(init)
}

// 使用例
val tests = describe("電卓のテスト") {
    scenario("足し算が正しく動作する") {
        var result = 0
        given("2つの数値がある") { }
        whenever("足し算を実行する") { result = 2 + 3 }
        then("正しい結果が返る") { result shouldBe 5 }
    }

    scenario("リストのフィルタリング") {
        var filtered = emptyList<Int>()
        given("数値リストがある") { }
        whenever("偶数をフィルタする") {
            filtered = listOf(1, 2, 3, 4, 5).filter { it % 2 == 0 }
        }
        then("偶数のみ残る") {
            filtered shouldBe listOf(2, 4)
            filtered shouldContain 2
        }
    }
}
tests.run()`,
      },
    ],
  },
  // ===== Android Kotlin基礎 =====
  {
    id: "android-basics",
    title: "Android Kotlin基礎",
    category: "android",
    description:
      "Activity/Fragment、ViewModel/LiveData、ViewBinding、Jetpack Compose基礎、ナビゲーションなどAndroid開発の基礎をKotlinで学ぶ",
    sections: [
      {
        title: "Activity と Fragment",
        content:
          "ActivityはAndroidアプリの画面を表す基本コンポーネントです。Kotlinでは簡潔な記法でActivityを定義でき、Javaの冗長なボイラープレートが大幅に削減されます。FragmentはActivity内で再利用可能なUI部品で、画面の一部を担当します。KTX拡張により、Fragmentの取得やトランザクションがより直感的に書けます。ライフサイクルを理解し、適切にリソース管理を行うことが重要です。",
        code: `// Activity の定義
class MainActivity : AppCompatActivity() {

    // ViewBinding を使ったビューの参照
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // ビューの操作
        binding.greetingText.text = "こんにちは、Kotlin！"
        binding.actionButton.setOnClickListener {
            showMessage("ボタンが押されました")
        }

        // Fragment の追加
        if (savedInstanceState == null) {
            supportFragmentManager.commit {
                replace(R.id.fragmentContainer, HomeFragment())
            }
        }
    }

    private fun showMessage(msg: String) {
        Snackbar.make(binding.root, msg, Snackbar.LENGTH_SHORT).show()
    }
}

// Fragment の定義
class HomeFragment : Fragment(R.layout.fragment_home) {

    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentHomeBinding.bind(view)

        binding.titleText.text = "ホーム画面"
        binding.refreshButton.setOnClickListener {
            loadData()
        }
    }

    private fun loadData() {
        // データ読み込み処理
        binding.statusText.text = "データを読み込みました"
    }

    // メモリリーク防止のためbindingを解放
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

// Intent による画面遷移（KTX拡張）
fun navigateToDetail(context: Context, itemId: Long) {
    val intent = Intent(context, DetailActivity::class.java).apply {
        putExtra("ITEM_ID", itemId)
        addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
    }
    context.startActivity(intent)
}`,
      },
      {
        title: "ViewModel と LiveData",
        content:
          "ViewModelはUIに関連するデータを保持し、画面の回転などの構成変更を跨いでデータを保持するJetpackコンポーネントです。LiveDataはライフサイクルを認識するオブザーバブルなデータホルダーで、Activityの状態に応じて自動的に更新を通知・停止します。ViewModelとLiveDataを組み合わせることで、UIとビジネスロジックを分離した堅牢なアーキテクチャを構築できます。StateFlowやSharedFlowを使ったCoroutinesベースのアプローチも近年主流になっています。",
        code: `// ViewModel の定義
class TaskViewModel(
    private val repository: TaskRepository
) : ViewModel() {

    // LiveData: UIが監視するデータ
    private val _tasks = MutableLiveData<List<Task>>()
    val tasks: LiveData<List<Task>> = _tasks

    // ローディング状態
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    // エラーメッセージ（イベントとして1回だけ消費）
    private val _errorMessage = MutableLiveData<Event<String>>()
    val errorMessage: LiveData<Event<String>> = _errorMessage

    init {
        loadTasks()
    }

    fun loadTasks() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                val result = repository.getTasks()
                _tasks.value = result
            } catch (e: Exception) {
                _errorMessage.value = Event("読み込み失敗: \${e.message}")
            } finally {
                _isLoading.value = false
            }
        }
    }

    fun addTask(title: String) {
        viewModelScope.launch {
            try {
                repository.addTask(Task(title = title))
                loadTasks()  // リストを更新
            } catch (e: Exception) {
                _errorMessage.value = Event("追加失敗: \${e.message}")
            }
        }
    }
}

// Activity で ViewModel を使用
class TaskActivity : AppCompatActivity() {

    // ViewModel の取得（by viewModels デリゲート）
    private val viewModel: TaskViewModel by viewModels {
        TaskViewModelFactory(TaskRepository(database.taskDao()))
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // LiveData の監視
        viewModel.tasks.observe(this) { tasks ->
            // UIを更新（RecyclerView等）
            adapter.submitList(tasks)
        }

        viewModel.isLoading.observe(this) { isLoading ->
            binding.progressBar.isVisible = isLoading
        }

        viewModel.errorMessage.observe(this) { event ->
            event.getContentIfNotHandled()?.let { message ->
                Snackbar.make(binding.root, message, Snackbar.LENGTH_LONG).show()
            }
        }
    }
}

// StateFlow を使った現代的なアプローチ
class ModernViewModel(
    private val repository: TaskRepository
) : ViewModel() {
    private val _uiState = MutableStateFlow(TaskUiState())
    val uiState: StateFlow<TaskUiState> = _uiState.asStateFlow()

    fun loadTasks() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            try {
                val tasks = repository.getTasks()
                _uiState.update { it.copy(tasks = tasks, isLoading = false) }
            } catch (e: Exception) {
                _uiState.update { it.copy(error = e.message, isLoading = false) }
            }
        }
    }
}

data class TaskUiState(
    val tasks: List<Task> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)`,
      },
      {
        title: "ViewBinding",
        content:
          "ViewBindingはXMLレイアウトのビューに型安全にアクセスするための仕組みです。findViewById を使う従来の方法に比べて、NullPointerExceptionや型キャストエラーのリスクがなく、コンパイル時にビューの存在と型が保証されます。レイアウトファイルごとにバインディングクラスが自動生成され、各ビューのIDに対応するプロパティが用意されます。build.gradleで有効化するだけで使い始められ、DataBindingよりも軽量です。",
        code: `// build.gradle.kts での有効化
// android {
//     buildFeatures {
//         viewBinding = true
//     }
// }

// activity_main.xml に対して ActivityMainBinding が自動生成される
// <LinearLayout>
//     <TextView android:id="@+id/titleText" ... />
//     <Button android:id="@+id/submitButton" ... />
//     <RecyclerView android:id="@+id/itemList" ... />
// </LinearLayout>

// Activity での使用
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // レイアウトのインフレートとバインディングの取得
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 型安全にビューにアクセス（findViewByIdは不要）
        binding.titleText.text = "タスク一覧"
        binding.submitButton.setOnClickListener {
            handleSubmit()
        }

        // RecyclerView のセットアップ
        binding.itemList.apply {
            layoutManager = LinearLayoutManager(this@MainActivity)
            adapter = TaskAdapter()
        }
    }

    private fun handleSubmit() {
        binding.submitButton.isEnabled = false
        binding.titleText.text = "送信中..."
    }
}

// Fragment での使用（メモリリーク防止が重要）
class ItemFragment : Fragment(R.layout.fragment_item) {

    // Fragment のビューのライフサイクルに合わせて管理
    private var _binding: FragmentItemBinding? = null
    private val binding get() = _binding!!

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        _binding = FragmentItemBinding.bind(view)

        binding.itemName.text = "サンプルアイテム"
        binding.itemDescription.text = "これは説明文です"
        binding.deleteButton.setOnClickListener {
            deleteItem()
        }
    }

    private fun deleteItem() {
        binding.deleteButton.isEnabled = false
        // 削除処理
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null  // メモリリーク防止
    }
}

// RecyclerView の ViewHolder でも ViewBinding を活用
class TaskViewHolder(
    private val binding: ItemTaskBinding
) : RecyclerView.ViewHolder(binding.root) {

    fun bind(task: Task) {
        binding.taskTitle.text = task.title
        binding.taskDate.text = task.createdAt.format()
        binding.taskCheckbox.isChecked = task.isCompleted
        binding.taskCheckbox.setOnCheckedChangeListener { _, checked ->
            onTaskChecked(task.id, checked)
        }
    }

    companion object {
        fun create(parent: ViewGroup): TaskViewHolder {
            val binding = ItemTaskBinding.inflate(
                LayoutInflater.from(parent.context), parent, false
            )
            return TaskViewHolder(binding)
        }
    }
}`,
      },
      {
        title: "Jetpack Compose 基礎",
        content:
          "Jetpack ComposeはAndroidの宣言的UIフレームワークです。XMLレイアウトの代わりにKotlinコードでUIを記述し、状態の変化に応じて自動的にUIを再描画（リコンポジション）します。@Composable関数でUI要素を定義し、remember や mutableStateOf で状態を管理します。Composeを使うことで、UIコードが大幅に簡潔になり、プレビュー機能によりリアルタイムでUIを確認しながら開発できます。",
        code: `// 基本的な Composable 関数
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "こんにちは、\${name}さん！",
        modifier = modifier.padding(16.dp),
        fontSize = 20.sp,
        fontWeight = FontWeight.Bold
    )
}

// 状態管理
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }

    Column(
        modifier = Modifier.padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = "カウント: \${count}",
            fontSize = 24.sp
        )
        Spacer(modifier = Modifier.height(8.dp))
        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            Button(onClick = { count-- }) {
                Text("−")
            }
            Button(onClick = { count++ }) {
                Text("＋")
            }
        }
    }
}

// リスト表示
@Composable
fun TaskList(tasks: List<Task>, onToggle: (Task) -> Unit) {
    LazyColumn(
        modifier = Modifier.fillMaxSize(),
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(tasks, key = { it.id }) { task ->
            TaskCard(task = task, onToggle = { onToggle(task) })
        }
    }
}

@Composable
fun TaskCard(task: Task, onToggle: () -> Unit) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = task.isCompleted,
                onCheckedChange = { onToggle() }
            )
            Spacer(modifier = Modifier.width(8.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = task.title,
                    fontWeight = FontWeight.Medium,
                    textDecoration = if (task.isCompleted)
                        TextDecoration.LineThrough else TextDecoration.None
                )
                Text(
                    text = task.dueDate ?: "期限なし",
                    fontSize = 12.sp,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }
        }
    }
}

// ViewModel と連携
@Composable
fun TaskScreen(viewModel: TaskViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    when {
        uiState.isLoading -> CircularProgressIndicator()
        uiState.error != null -> ErrorMessage(uiState.error!!)
        else -> TaskList(
            tasks = uiState.tasks,
            onToggle = { viewModel.toggleTask(it) }
        )
    }
}`,
      },
      {
        title: "ナビゲーション",
        content:
          "Navigation ComponentはAndroidアプリの画面遷移を管理するJetpackライブラリです。ナビゲーショングラフでアプリの画面構成を定義し、Safe Argsプラグインで型安全に引数を受け渡せます。FragmentベースとComposeベースの両方に対応しています。バックスタックの管理、ディープリンク、ボトムナビゲーションとの統合など、画面遷移に関する多くの課題を統一的に解決できます。",
        code: `// Compose Navigation の定義
@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = "home"
    ) {
        // ホーム画面
        composable("home") {
            HomeScreen(
                onTaskClick = { taskId ->
                    navController.navigate("detail/\${taskId}")
                },
                onSettingsClick = {
                    navController.navigate("settings")
                }
            )
        }

        // 詳細画面（引数付き）
        composable(
            route = "detail/{taskId}",
            arguments = listOf(
                navArgument("taskId") { type = NavType.LongType }
            )
        ) { backStackEntry ->
            val taskId = backStackEntry.arguments?.getLong("taskId") ?: 0L
            DetailScreen(
                taskId = taskId,
                onBack = { navController.popBackStack() }
            )
        }

        // 設定画面
        composable("settings") {
            SettingsScreen(
                onBack = { navController.popBackStack() }
            )
        }
    }
}

// Sealed class でルートを型安全に管理
sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Settings : Screen("settings")
    data class Detail(val taskId: Long) : Screen("detail/\${taskId}") {
        companion object {
            const val ROUTE = "detail/{taskId}"
        }
    }
}

// ボトムナビゲーション付きレイアウト
@Composable
fun MainScreen() {
    val navController = rememberNavController()
    val items = listOf(
        BottomNavItem("ホーム", Icons.Default.Home, "home"),
        BottomNavItem("検索", Icons.Default.Search, "search"),
        BottomNavItem("設定", Icons.Default.Settings, "settings")
    )

    Scaffold(
        bottomBar = {
            NavigationBar {
                val currentRoute = navController
                    .currentBackStackEntryAsState().value
                    ?.destination?.route

                items.forEach { item ->
                    NavigationBarItem(
                        icon = { Icon(item.icon, item.label) },
                        label = { Text(item.label) },
                        selected = currentRoute == item.route,
                        onClick = {
                            navController.navigate(item.route) {
                                popUpTo(navController.graph.startDestinationId) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(padding)
        ) {
            composable("home") { HomeScreen(navController) }
            composable("search") { SearchScreen(navController) }
            composable("settings") { SettingsScreen(navController) }
        }
    }
}

data class BottomNavItem(
    val label: String,
    val icon: ImageVector,
    val route: String
)`,
      },
    ],
  },
  // ===== Android実践パターン =====
  {
    id: "android-advanced",
    title: "Android実践パターン",
    category: "android",
    description:
      "Room DB、Retrofit + Coroutines、Hilt DI、WorkManager、DataStoreなどAndroid実践的な開発パターンをKotlinで学ぶ",
    sections: [
      {
        title: "Room データベース",
        content:
          "RoomはSQLiteのラッパーライブラリで、型安全なデータベースアクセスを提供するJetpackコンポーネントです。@Entity でテーブルを、@Dao でデータアクセスオブジェクトを、@Database でデータベースを定義します。Kotlin Coroutines や Flow との統合により、非同期かつリアクティブなデータベース操作が可能です。コンパイル時にSQLの検証が行われるため、実行時エラーを未然に防げます。",
        code: `// Entity（テーブル定義）
@Entity(tableName = "tasks")
data class TaskEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    @ColumnInfo(name = "title")
    val title: String,
    @ColumnInfo(name = "description")
    val description: String? = null,
    @ColumnInfo(name = "is_completed")
    val isCompleted: Boolean = false,
    @ColumnInfo(name = "created_at")
    val createdAt: Long = System.currentTimeMillis(),
    @ColumnInfo(name = "priority")
    val priority: Int = 0
)

// DAO（データアクセスオブジェクト）
@Dao
interface TaskDao {
    // Flow で変更をリアクティブに監視
    @Query("SELECT * FROM tasks ORDER BY priority DESC, created_at DESC")
    fun getAllTasks(): Flow<List<TaskEntity>>

    @Query("SELECT * FROM tasks WHERE id = :taskId")
    suspend fun getTaskById(taskId: Long): TaskEntity?

    @Query("SELECT * FROM tasks WHERE is_completed = :completed")
    fun getTasksByStatus(completed: Boolean): Flow<List<TaskEntity>>

    @Query("SELECT COUNT(*) FROM tasks WHERE is_completed = 0")
    fun getIncompleteCount(): Flow<Int>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(task: TaskEntity): Long

    @Update
    suspend fun update(task: TaskEntity)

    @Delete
    suspend fun delete(task: TaskEntity)

    @Query("DELETE FROM tasks WHERE is_completed = 1")
    suspend fun deleteCompleted(): Int

    // トランザクション
    @Transaction
    suspend fun replaceAll(tasks: List<TaskEntity>) {
        deleteAll()
        insertAll(tasks)
    }

    @Query("DELETE FROM tasks")
    suspend fun deleteAll()

    @Insert
    suspend fun insertAll(tasks: List<TaskEntity>)
}

// Database 定義
@Database(
    entities = [TaskEntity::class],
    version = 1,
    exportSchema = true
)
@TypeConverters(Converters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun taskDao(): TaskDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getInstance(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "app_database"
                )
                .addMigrations(MIGRATION_1_2)
                .build()
                .also { INSTANCE = it }
            }
        }

        private val MIGRATION_1_2 = object : Migration(1, 2) {
            override fun migrate(db: SupportSQLiteDatabase) {
                db.execSQL("ALTER TABLE tasks ADD COLUMN due_date INTEGER")
            }
        }
    }
}

// Repository での使用
class TaskRepository(private val dao: TaskDao) {
    val allTasks: Flow<List<TaskEntity>> = dao.getAllTasks()

    suspend fun addTask(title: String, description: String? = null) {
        dao.insert(TaskEntity(title = title, description = description))
    }

    suspend fun toggleComplete(task: TaskEntity) {
        dao.update(task.copy(isCompleted = !task.isCompleted))
    }
}`,
      },
      {
        title: "Retrofit と Coroutines",
        content:
          "RetrofitはHTTPクライアントライブラリで、REST APIとの通信を型安全なインターフェースとして定義できます。Kotlin Coroutinesと組み合わせることで、suspend関数としてAPI呼び出しを定義し、非同期通信を同期的なコードのように記述できます。OkHttpインターセプターでログ出力や認証トークンの付与を行い、Gsonやkotlinx.serializationでJSONの自動変換を行います。",
        code: `// API インターフェースの定義
interface ApiService {
    @GET("users")
    suspend fun getUsers(): List<UserResponse>

    @GET("users/{id}")
    suspend fun getUser(@Path("id") userId: Long): UserResponse

    @POST("users")
    suspend fun createUser(@Body request: CreateUserRequest): UserResponse

    @PUT("users/{id}")
    suspend fun updateUser(
        @Path("id") userId: Long,
        @Body request: UpdateUserRequest
    ): UserResponse

    @DELETE("users/{id}")
    suspend fun deleteUser(@Path("id") userId: Long)

    @GET("users")
    suspend fun searchUsers(
        @Query("q") query: String,
        @Query("page") page: Int = 1,
        @Query("limit") limit: Int = 20
    ): PaginatedResponse<UserResponse>
}

// データクラス
@Serializable
data class UserResponse(
    val id: Long,
    val name: String,
    val email: String,
    @SerialName("created_at")
    val createdAt: String
)

@Serializable
data class CreateUserRequest(
    val name: String,
    val email: String
)

// Retrofit インスタンスの構築
object ApiClient {
    private val okHttpClient = OkHttpClient.Builder()
        .addInterceptor(HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        })
        .addInterceptor { chain ->
            val request = chain.request().newBuilder()
                .addHeader("Authorization", "Bearer \${TokenManager.getToken()}")
                .addHeader("Accept", "application/json")
                .build()
            chain.proceed(request)
        }
        .connectTimeout(30, TimeUnit.SECONDS)
        .readTimeout(30, TimeUnit.SECONDS)
        .build()

    val apiService: ApiService = Retrofit.Builder()
        .baseUrl("https://api.example.com/v1/")
        .client(okHttpClient)
        .addConverterFactory(Json.asConverterFactory("application/json".toMediaType()))
        .build()
        .create(ApiService::class.java)
}

// Repository での使用
class UserRepository(private val api: ApiService) {
    // 結果をResult型でラップ
    suspend fun getUsers(): Result<List<UserResponse>> {
        return try {
            Result.success(api.getUsers())
        } catch (e: HttpException) {
            Result.failure(ApiError("API エラー: \${e.code()}", e))
        } catch (e: IOException) {
            Result.failure(NetworkError("ネットワークエラー", e))
        }
    }

    // Flow でページネーション
    fun searchUsers(query: String): Flow<PagingData<UserResponse>> {
        return Pager(
            config = PagingConfig(pageSize = 20),
            pagingSourceFactory = { UserPagingSource(api, query) }
        ).flow
    }
}

// ViewModel での使用
class UserViewModel(private val repository: UserRepository) : ViewModel() {
    private val _users = MutableStateFlow<UiState<List<UserResponse>>>(UiState.Loading)
    val users: StateFlow<UiState<List<UserResponse>>> = _users.asStateFlow()

    fun loadUsers() {
        viewModelScope.launch {
            _users.value = UiState.Loading
            repository.getUsers()
                .onSuccess { _users.value = UiState.Success(it) }
                .onFailure { _users.value = UiState.Error(it.message ?: "不明なエラー") }
        }
    }
}`,
      },
      {
        title: "Hilt による依存性注入",
        content:
          "HiltはAndroid向けの依存性注入（DI）フレームワークで、Dagger2の上に構築されています。アノテーションベースで依存関係を定義し、コンパイル時にDIコードが生成されるため、実行時のオーバーヘッドがありません。@HiltAndroidApp、@AndroidEntryPoint、@Inject、@Module、@Provides などのアノテーションで簡潔にDI設定を行えます。ViewModelへのインジェクションもシームレスにサポートされています。",
        code: `// Application クラスに @HiltAndroidApp を付与
@HiltAndroidApp
class MyApplication : Application()

// Module の定義（依存関係のバインディング）
@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideOkHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor())
            .connectTimeout(30, TimeUnit.SECONDS)
            .build()
    }

    @Provides
    @Singleton
    fun provideRetrofit(okHttpClient: OkHttpClient): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://api.example.com/v1/")
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Provides
    @Singleton
    fun provideApiService(retrofit: Retrofit): ApiService {
        return retrofit.create(ApiService::class.java)
    }
}

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {

    @Provides
    @Singleton
    fun provideDatabase(@ApplicationContext context: Context): AppDatabase {
        return Room.databaseBuilder(
            context, AppDatabase::class.java, "app_database"
        ).build()
    }

    @Provides
    fun provideTaskDao(database: AppDatabase): TaskDao {
        return database.taskDao()
    }
}

// Repository（コンストラクタインジェクション）
@Singleton
class TaskRepository @Inject constructor(
    private val api: ApiService,
    private val taskDao: TaskDao
) {
    fun getTasks(): Flow<List<Task>> = taskDao.getAllTasks()

    suspend fun refreshTasks() {
        val remoteTasks = api.getTasks()
        taskDao.replaceAll(remoteTasks.map { it.toEntity() })
    }

    suspend fun addTask(task: Task) {
        val entity = task.toEntity()
        taskDao.insert(entity)
        api.createTask(task.toRequest())
    }
}

// ViewModel（@HiltViewModel で自動インジェクション）
@HiltViewModel
class TaskViewModel @Inject constructor(
    private val repository: TaskRepository,
    private val savedStateHandle: SavedStateHandle
) : ViewModel() {

    val tasks = repository.getTasks()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    fun refresh() {
        viewModelScope.launch {
            repository.refreshTasks()
        }
    }
}

// Activity での使用
@AndroidEntryPoint
class TaskActivity : AppCompatActivity() {

    // Hilt が自動的に ViewModel を提供
    private val viewModel: TaskViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // viewModel は自動的に依存関係が注入済み
        lifecycleScope.launch {
            viewModel.tasks.collect { tasks ->
                updateUI(tasks)
            }
        }
    }
}`,
      },
      {
        title: "WorkManager",
        content:
          "WorkManagerはバックグラウンドタスクを確実に実行するためのJetpackライブラリです。アプリが終了してもデバイスが再起動しても、スケジュールされたタスクは保証されて実行されます。一回限りのタスク（OneTimeWorkRequest）と定期タスク（PeriodicWorkRequest）をサポートし、ネットワーク接続や充電状態などの制約条件を設定できます。タスクのチェーン実行や進捗の監視も可能です。",
        code: `// Worker の定義
class SyncWorker(
    context: Context,
    params: WorkerParameters
) : CoroutineWorker(context, params) {

    override suspend fun doWork(): Result {
        val userId = inputData.getLong("USER_ID", -1)
        if (userId == -1L) return Result.failure()

        return try {
            // 進捗を通知
            setProgress(workDataOf("progress" to 0))

            // データの同期処理
            val repository = getRepository()
            val localData = repository.getLocalChanges(userId)

            setProgress(workDataOf("progress" to 50))

            repository.syncToServer(localData)

            setProgress(workDataOf("progress" to 100))

            // 成功時に結果データを返す
            val outputData = workDataOf(
                "SYNCED_COUNT" to localData.size,
                "TIMESTAMP" to System.currentTimeMillis()
            )
            Result.success(outputData)
        } catch (e: IOException) {
            // リトライ（最大3回まで自動リトライ）
            if (runAttemptCount < 3) Result.retry()
            else Result.failure(workDataOf("ERROR" to e.message))
        } catch (e: Exception) {
            Result.failure(workDataOf("ERROR" to e.message))
        }
    }

    private fun getRepository(): SyncRepository {
        // Hilt を使う場合は @HiltWorker で自動注入可能
        return SyncRepository(ApiClient.apiService)
    }
}

// タスクのスケジュール
class WorkScheduler(private val context: Context) {

    private val workManager = WorkManager.getInstance(context)

    // 一回限りのタスク
    fun scheduleSyncNow(userId: Long) {
        val inputData = workDataOf("USER_ID" to userId)

        val constraints = Constraints.Builder()
            .setRequiredNetworkType(NetworkType.CONNECTED)
            .setRequiresBatteryNotLow(true)
            .build()

        val request = OneTimeWorkRequestBuilder<SyncWorker>()
            .setInputData(inputData)
            .setConstraints(constraints)
            .setBackoffCriteria(
                BackoffPolicy.EXPONENTIAL,
                Duration.ofMinutes(1)
            )
            .addTag("sync")
            .build()

        workManager.enqueueUniqueWork(
            "sync_\${userId}",
            ExistingWorkPolicy.REPLACE,
            request
        )
    }

    // 定期タスク（最短15分間隔）
    fun schedulePeriodicSync() {
        val request = PeriodicWorkRequestBuilder<SyncWorker>(
            repeatInterval = 1, TimeUnit.HOURS,
            flexInterval = 15, TimeUnit.MINUTES
        )
            .setConstraints(
                Constraints.Builder()
                    .setRequiredNetworkType(NetworkType.UNMETERED)
                    .setRequiresCharging(true)
                    .build()
            )
            .build()

        workManager.enqueueUniquePeriodicWork(
            "periodic_sync",
            ExistingPeriodicWorkPolicy.KEEP,
            request
        )
    }

    // タスクの監視
    fun observeSync(userId: Long): LiveData<WorkInfo> {
        return workManager.getWorkInfosForUniqueWorkLiveData("sync_\${userId}")
            .map { workInfos -> workInfos.firstOrNull() ?: return@map null }
    }

    // チェーンタスク
    fun scheduleChainedWork() {
        val download = OneTimeWorkRequestBuilder<DownloadWorker>().build()
        val process = OneTimeWorkRequestBuilder<ProcessWorker>().build()
        val upload = OneTimeWorkRequestBuilder<UploadWorker>().build()

        workManager
            .beginWith(download)
            .then(process)
            .then(upload)
            .enqueue()
    }
}`,
      },
      {
        title: "DataStore",
        content:
          "DataStoreはSharedPreferencesの後継として設計されたデータ永続化ライブラリです。Preferences DataStoreはキー・バリュー形式で、Proto DataStoreはProtocol Buffersベースの型安全なストレージを提供します。Kotlin CoroutinesとFlowの上に構築されており、非同期かつスレッドセーフにデータの読み書きが可能です。SharedPreferencesの同期的なブロッキングI/Oやコミットの失敗といった問題を解決します。",
        code: `// Preferences DataStore の定義
private val Context.settingsDataStore by preferencesDataStore(
    name = "settings"
)

// キーの定義
object PrefsKeys {
    val DARK_MODE = booleanPreferencesKey("dark_mode")
    val FONT_SIZE = intPreferencesKey("font_size")
    val USER_NAME = stringPreferencesKey("user_name")
    val LANGUAGE = stringPreferencesKey("language")
    val NOTIFICATION_ENABLED = booleanPreferencesKey("notification_enabled")
}

// 設定リポジトリ
class SettingsRepository(private val context: Context) {

    // Flow でリアクティブに読み取り
    val darkMode: Flow<Boolean> = context.settingsDataStore.data
        .catch { exception ->
            if (exception is IOException) emit(emptyPreferences())
            else throw exception
        }
        .map { preferences ->
            preferences[PrefsKeys.DARK_MODE] ?: false
        }

    val fontSize: Flow<Int> = context.settingsDataStore.data
        .map { it[PrefsKeys.FONT_SIZE] ?: 14 }

    // 複数の設定をまとめて読み取り
    val settings: Flow<AppSettings> = context.settingsDataStore.data
        .map { prefs ->
            AppSettings(
                darkMode = prefs[PrefsKeys.DARK_MODE] ?: false,
                fontSize = prefs[PrefsKeys.FONT_SIZE] ?: 14,
                userName = prefs[PrefsKeys.USER_NAME] ?: "",
                language = prefs[PrefsKeys.LANGUAGE] ?: "ja",
                notificationEnabled = prefs[PrefsKeys.NOTIFICATION_ENABLED] ?: true
            )
        }

    // 個別の設定を更新
    suspend fun setDarkMode(enabled: Boolean) {
        context.settingsDataStore.edit { preferences ->
            preferences[PrefsKeys.DARK_MODE] = enabled
        }
    }

    suspend fun setFontSize(size: Int) {
        context.settingsDataStore.edit { preferences ->
            preferences[PrefsKeys.FONT_SIZE] = size
        }
    }

    // 複数の設定を一括更新（アトミック）
    suspend fun updateSettings(
        darkMode: Boolean? = null,
        fontSize: Int? = null,
        language: String? = null
    ) {
        context.settingsDataStore.edit { preferences ->
            darkMode?.let { preferences[PrefsKeys.DARK_MODE] = it }
            fontSize?.let { preferences[PrefsKeys.FONT_SIZE] = it }
            language?.let { preferences[PrefsKeys.LANGUAGE] = it }
        }
    }

    // 全設定をクリア
    suspend fun clearAll() {
        context.settingsDataStore.edit { it.clear() }
    }
}

data class AppSettings(
    val darkMode: Boolean,
    val fontSize: Int,
    val userName: String,
    val language: String,
    val notificationEnabled: Boolean
)

// ViewModel での使用
@HiltViewModel
class SettingsViewModel @Inject constructor(
    private val repository: SettingsRepository
) : ViewModel() {

    val settings = repository.settings
        .stateIn(
            scope = viewModelScope,
            started = SharingStarted.WhileSubscribed(5_000),
            initialValue = AppSettings(
                darkMode = false, fontSize = 14,
                userName = "", language = "ja",
                notificationEnabled = true
            )
        )

    fun toggleDarkMode() {
        viewModelScope.launch {
            val current = settings.value.darkMode
            repository.setDarkMode(!current)
        }
    }

    fun updateFontSize(size: Int) {
        viewModelScope.launch {
            repository.setFontSize(size)
        }
    }
}

// Compose UI での使用
@Composable
fun SettingsScreen(viewModel: SettingsViewModel = hiltViewModel()) {
    val settings by viewModel.settings.collectAsStateWithLifecycle()

    Column(modifier = Modifier.padding(16.dp)) {
        SwitchPreference(
            title = "ダークモード",
            checked = settings.darkMode,
            onCheckedChange = { viewModel.toggleDarkMode() }
        )
        SliderPreference(
            title = "フォントサイズ: \${settings.fontSize}",
            value = settings.fontSize.toFloat(),
            onValueChange = { viewModel.updateFontSize(it.toInt()) }
        )
    }
}`,
      },
    ],
  },
  // ===== Kotlin Multiplatform =====
  {
    id: "multiplatform",
    title: "Kotlin Multiplatform",
    category: "ecosystem",
    description:
      "KMP（Kotlin Multiplatform）の概要、expect/actual、共有ロジック、Compose Multiplatform、プロジェクト構成を学ぶ",
    sections: [
      {
        title: "KMP（Kotlin Multiplatform）概要",
        content:
          "Kotlin Multiplatform（KMP）はKotlinコードを複数のプラットフォーム（Android、iOS、Web、デスクトップ、サーバー）で共有するための技術です。ビジネスロジック、データ層、ネットワーク通信などを共通コード（commonMain）として記述し、UI部分は各プラットフォーム固有の技術で実装します。Compose Multiplatformを使えばUIも共有可能です。2023年にStable版となり、Netflix、McDonald's、VMwareなど多くの企業が採用しています。",
        code: `// KMP プロジェクトの build.gradle.kts
plugins {
    kotlin("multiplatform") version "2.0.0"
    id("com.android.library")
}

kotlin {
    // ターゲットプラットフォームの定義
    androidTarget {
        compilations.all {
            kotlinOptions { jvmTarget = "17" }
        }
    }

    // iOS ターゲット
    iosX64()
    iosArm64()
    iosSimulatorArm64()

    // JVM ターゲット（デスクトップ/サーバー）
    jvm("desktop")

    // ソースセットの設定
    sourceSets {
        // 共通コード
        val commonMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
                implementation("io.ktor:ktor-client-core:2.3.8")
            }
        }

        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }

        // Android 固有コード
        val androidMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-android:2.3.8")
            }
        }

        // iOS 固有コード
        val iosMain by creating {
            dependsOn(commonMain)
            dependencies {
                implementation("io.ktor:ktor-client-darwin:2.3.8")
            }
        }

        // デスクトップ固有コード
        val desktopMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-cio:2.3.8")
            }
        }
    }
}

// プロジェクト構造:
// shared/
//   src/
//     commonMain/kotlin/   ← 共通コード
//     androidMain/kotlin/  ← Android固有
//     iosMain/kotlin/      ← iOS固有
//     desktopMain/kotlin/  ← デスクトップ固有`,
      },
      {
        title: "expect / actual メカニズム",
        content:
          "expect / actual はKMP における「プラットフォーム固有の実装を定義する」メカニズムです。commonMain で expect 宣言（インターフェースのようなもの）を定義し、各プラットフォームのソースセットで actual 実装を提供します。クラス、関数、プロパティ、オブジェクトに適用でき、コンパイル時にプラットフォームに応じた実装が選択されます。これにより、共通コードからプラットフォーム固有のAPIを型安全に呼び出せます。",
        code: `// === commonMain === (共通コード)

// expect 宣言: プラットフォーム固有の実装が必要
expect class Platform() {
    val name: String
    val version: String
}

expect fun currentTimeMillis(): Long

expect fun generateUUID(): String

// expect クラス
expect class FileStorage(basePath: String) {
    suspend fun readText(fileName: String): String
    suspend fun writeText(fileName: String, content: String)
    suspend fun exists(fileName: String): Boolean
}

// 共通コードから expect を使用
class AppInfo(private val platform: Platform) {
    fun getDescription(): String {
        return "アプリ v1.0 - \${platform.name} \${platform.version}"
    }

    fun generateId(): String {
        val uuid = generateUUID()
        val timestamp = currentTimeMillis()
        return "\${uuid}-\${timestamp}"
    }
}

// === androidMain === (Android 実装)
actual class Platform actual constructor() {
    actual val name: String = "Android"
    actual val version: String = "\${Build.VERSION.SDK_INT}"
}

actual fun currentTimeMillis(): Long = System.currentTimeMillis()

actual fun generateUUID(): String = java.util.UUID.randomUUID().toString()

actual class FileStorage actual constructor(private val basePath: String) {
    actual suspend fun readText(fileName: String): String {
        return File(basePath, fileName).readText()
    }
    actual suspend fun writeText(fileName: String, content: String) {
        File(basePath, fileName).writeText(content)
    }
    actual suspend fun exists(fileName: String): Boolean {
        return File(basePath, fileName).exists()
    }
}

// === iosMain === (iOS 実装)
actual class Platform actual constructor() {
    actual val name: String = UIDevice.currentDevice.systemName
    actual val version: String = UIDevice.currentDevice.systemVersion
}

actual fun currentTimeMillis(): Long =
    (NSDate().timeIntervalSince1970 * 1000).toLong()

actual fun generateUUID(): String =
    NSUUID().UUIDString()

actual class FileStorage actual constructor(private val basePath: String) {
    private val fileManager = NSFileManager.defaultManager
    actual suspend fun readText(fileName: String): String {
        val path = "\${basePath}/\${fileName}"
        return NSString.stringWithContentsOfFile(path, NSUTF8StringEncoding, null)
            ?: throw FileNotFoundException(path)
    }
    actual suspend fun writeText(fileName: String, content: String) {
        val path = "\${basePath}/\${fileName}"
        (content as NSString).writeToFile(path, true, NSUTF8StringEncoding, null)
    }
    actual suspend fun exists(fileName: String): Boolean {
        return fileManager.fileExistsAtPath("\${basePath}/\${fileName}")
    }
}`,
      },
      {
        title: "共有ロジック（ビジネスロジック・データ層）",
        content:
          "KMPの最大の利点は、ビジネスロジックとデータ層を一度だけ実装し、全プラットフォームで共有できることです。リポジトリパターン、ユースケース、バリデーション、データ変換ロジックなどを commonMain に配置します。Ktor（HTTP通信）、kotlinx.serialization（JSON変換）、SQLDelight（データベース）、kotlinx-datetime（日時処理）などのマルチプラットフォーム対応ライブラリを活用することで、プラットフォーム固有のコードを最小限に抑えられます。",
        code: `// === commonMain === 共有ビジネスロジック

// ドメインモデル
data class Article(
    val id: String,
    val title: String,
    val content: String,
    val author: String,
    val publishedAt: Instant,
    val tags: List<String>
)

// API レスポンス
@Serializable
data class ArticleResponse(
    val id: String,
    val title: String,
    val content: String,
    val author: String,
    @SerialName("published_at")
    val publishedAt: String,
    val tags: List<String>
) {
    fun toDomain(): Article = Article(
        id = id,
        title = title,
        content = content,
        author = author,
        publishedAt = Instant.parse(publishedAt),
        tags = tags
    )
}

// API クライアント（Ktor を使用）
class ArticleApi(private val httpClient: HttpClient) {
    suspend fun getArticles(page: Int = 1): List<ArticleResponse> {
        return httpClient.get("https://api.example.com/articles") {
            parameter("page", page)
            parameter("limit", 20)
        }.body()
    }

    suspend fun getArticle(id: String): ArticleResponse {
        return httpClient.get("https://api.example.com/articles/\${id}").body()
    }

    suspend fun searchArticles(query: String): List<ArticleResponse> {
        return httpClient.get("https://api.example.com/articles/search") {
            parameter("q", query)
        }.body()
    }
}

// リポジトリ（データ層の抽象化）
class ArticleRepository(
    private val api: ArticleApi,
    private val cache: ArticleCache
) {
    suspend fun getArticles(forceRefresh: Boolean = false): List<Article> {
        if (!forceRefresh) {
            val cached = cache.getAll()
            if (cached.isNotEmpty()) return cached
        }

        val articles = api.getArticles().map { it.toDomain() }
        cache.saveAll(articles)
        return articles
    }

    suspend fun getArticle(id: String): Article {
        cache.get(id)?.let { return it }
        val article = api.getArticle(id).toDomain()
        cache.save(article)
        return article
    }
}

// ユースケース（ビジネスルール）
class GetTrendingArticlesUseCase(
    private val repository: ArticleRepository
) {
    suspend operator fun invoke(limit: Int = 10): List<Article> {
        return repository.getArticles()
            .sortedByDescending { it.publishedAt }
            .take(limit)
    }
}

// バリデーション（共有ロジック）
object ArticleValidator {
    fun validateTitle(title: String): ValidationResult {
        return when {
            title.isBlank() -> ValidationResult.Error("タイトルは必須です")
            title.length < 5 -> ValidationResult.Error("タイトルは5文字以上")
            title.length > 200 -> ValidationResult.Error("タイトルは200文字以内")
            else -> ValidationResult.Valid
        }
    }
}

sealed class ValidationResult {
    object Valid : ValidationResult()
    data class Error(val message: String) : ValidationResult()
}

// Ktor HttpClient のファクトリ（プラットフォーム共通設定）
fun createHttpClient(): HttpClient = HttpClient {
    install(ContentNegotiation) { json(Json { ignoreUnknownKeys = true }) }
    install(Logging) { level = LogLevel.INFO }
    install(HttpTimeout) {
        requestTimeoutMillis = 30_000
        connectTimeoutMillis = 10_000
    }
    defaultRequest {
        header("Accept", "application/json")
    }
}`,
      },
      {
        title: "Compose Multiplatform",
        content:
          "Compose MultiplatformはJetBrainsが開発する、Jetpack Composeを複数プラットフォーム（Android、iOS、デスクトップ、Web）に拡張するフレームワークです。同じComposable関数でUI を記述し、各プラットフォームのネイティブUIとしてレンダリングされます。iOS対応は2024年にStable版となり、Android開発者のスキルをそのまま活かしてクロスプラットフォーム開発ができるようになりました。",
        code: `// === commonMain === 共有UI

// 共通の Composable 関数
@Composable
fun App() {
    MaterialTheme {
        var currentScreen by remember { mutableStateOf<AppScreen>(AppScreen.List) }

        when (val screen = currentScreen) {
            is AppScreen.List -> ArticleListScreen(
                onArticleClick = { currentScreen = AppScreen.Detail(it) }
            )
            is AppScreen.Detail -> ArticleDetailScreen(
                articleId = screen.articleId,
                onBack = { currentScreen = AppScreen.List }
            )
        }
    }
}

sealed class AppScreen {
    object List : AppScreen()
    data class Detail(val articleId: String) : AppScreen()
}

// 記事一覧画面
@Composable
fun ArticleListScreen(
    onArticleClick: (String) -> Unit,
    viewModel: ArticleListViewModel = remember { ArticleListViewModel() }
) {
    val articles by viewModel.articles.collectAsState()
    val isLoading by viewModel.isLoading.collectAsState()

    Column(modifier = Modifier.fillMaxSize()) {
        TopAppBar(title = { Text("記事一覧") })

        if (isLoading) {
            Box(
                modifier = Modifier.fillMaxSize(),
                contentAlignment = Alignment.Center
            ) {
                CircularProgressIndicator()
            }
        } else {
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(articles) { article ->
                    ArticleCard(
                        article = article,
                        onClick = { onArticleClick(article.id) }
                    )
                }
            }
        }
    }
}

// 共通UIコンポーネント
@Composable
fun ArticleCard(article: Article, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = article.title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(4.dp))
            Text(
                text = article.author,
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(8.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(4.dp)) {
                article.tags.take(3).forEach { tag ->
                    AssistChip(
                        onClick = {},
                        label = { Text(tag, fontSize = 11.sp) }
                    )
                }
            }
        }
    }
}

// === androidMain === Android エントリポイント
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { App() }
    }
}

// === iosMain === iOS エントリポイント
fun MainViewController(): UIViewController {
    return ComposeUIViewController { App() }
}

// === desktopMain === デスクトップエントリポイント
fun main() = application {
    Window(
        onCloseRequest = ::exitApplication,
        title = "Kotlin記事アプリ",
        state = rememberWindowState(width = 900.dp, height = 700.dp)
    ) {
        App()
    }
}`,
      },
      {
        title: "KMP プロジェクト構成と実践",
        content:
          "KMPプロジェクトを実際に構成する際は、共有モジュールとプラットフォーム固有モジュールを適切に分離することが重要です。shared モジュールにビジネスロジックとデータ層を配置し、各プラットフォームのアプリモジュールからそれを参照します。DIの設計、テスト戦略、CI/CD設定など、プロジェクト運用の観点も含めた実践的な構成方法を理解しましょう。KMP対応ライブラリのエコシステムも急速に成長しています。",
        code: `// プロジェクト全体構造
// my-kmp-app/
// ├── build.gradle.kts          (ルート)
// ├── settings.gradle.kts
// ├── shared/                   (共有モジュール)
// │   ├── build.gradle.kts
// │   └── src/
// │       ├── commonMain/kotlin/com/example/shared/
// │       │   ├── di/           (DI設定)
// │       │   ├── data/         (リポジトリ、API)
// │       │   ├── domain/       (ユースケース、モデル)
// │       │   └── util/         (ユーティリティ)
// │       ├── androidMain/kotlin/
// │       └── iosMain/kotlin/
// ├── androidApp/               (Android アプリ)
// │   ├── build.gradle.kts
// │   └── src/main/
// ├── iosApp/                   (iOS アプリ / Xcode)
// │   └── iosApp/
// └── desktopApp/               (デスクトップアプリ)

// === shared/build.gradle.kts ===
// KMP対応ライブラリの依存関係
// commonMain {
//   dependencies {
//     // HTTP通信
//     implementation("io.ktor:ktor-client-core:2.3.8")
//     // JSON
//     implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.3")
//     // 非同期処理
//     implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0")
//     // 日時
//     implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.6.0")
//     // DI
//     implementation("org.kodein.di:kodein-di:7.21.2")
//     // DB
//     implementation("app.cash.sqldelight:runtime:2.0.1")
//     // 設定保存
//     implementation("com.russhwolf:multiplatform-settings:1.1.1")
//   }
// }

// === 共有モジュールの DI 設定 ===
// commonMain
class SharedModule {
    val httpClient: HttpClient = createHttpClient()
    val json: Json = Json { ignoreUnknownKeys = true }

    // API
    val articleApi: ArticleApi by lazy { ArticleApi(httpClient) }
    val userApi: UserApi by lazy { UserApi(httpClient) }

    // リポジトリ
    val articleRepository: ArticleRepository by lazy {
        ArticleRepository(articleApi, InMemoryArticleCache())
    }

    // ユースケース
    val getTrendingArticles: GetTrendingArticlesUseCase by lazy {
        GetTrendingArticlesUseCase(articleRepository)
    }
}

// Androidアプリでの使用
// androidApp/src/main/kotlin/
class MyAndroidApp : Application() {
    val shared = SharedModule()

    override fun onCreate() {
        super.onCreate()
        // Android固有の初期化
    }
}

// iOSアプリでの使用（Swift から呼び出し）
// iOSHelper.kt (iosMain)
object IosHelper {
    private val shared = SharedModule()

    fun getArticleRepository() = shared.articleRepository
    fun getTrendingArticlesUseCase() = shared.getTrendingArticles
}

// Swift 側:
// let useCase = IosHelper.shared.getTrendingArticlesUseCase()

// === テスト（commonTest） ===
class ArticleRepositoryTest {
    private val fakeApi = FakeArticleApi()
    private val cache = InMemoryArticleCache()
    private val repository = ArticleRepository(fakeApi, cache)

    @Test
    fun getArticlesReturnsCachedData() = runTest {
        // 初回はAPIから取得
        val articles = repository.getArticles()
        assertEquals(3, articles.size)

        // 2回目はキャッシュから
        fakeApi.shouldFail = true
        val cached = repository.getArticles()
        assertEquals(3, cached.size)
    }
}`,
      },
    ],
  },

  {
    id: "error-handling",
    title: "エラーハンドリング",
    category: "features",
    description:
      "try/catch/finally、Result型、runCatching、sealed classによるエラーモデリング、Eitherパターンなど、Kotlinの堅牢なエラーハンドリング手法を学ぶ",
    sections: [
      {
        title: "try / catch / finally",
        content:
          "Kotlinの例外処理はJavaと同様にtry/catch/finallyを使いますが、大きな違いとしてKotlinにはチェック例外がありません。すべての例外は非チェック例外として扱われるため、throws宣言が不要です。また、tryは式として値を返すことができるため、変数への代入が可能です。catchブロックでは複数の例外型をキャッチでき、finallyブロックはリソースの解放などに使います。use関数を使えば、AutoCloseableなリソースを安全に管理できます。",
        code: `// try は式として値を返せる
val number: Int = try {
    "123".toInt()
} catch (e: NumberFormatException) {
    println("数値変換失敗: \${e.message}")
    0  // デフォルト値
}
println(number)  // 123

// 複数の例外をキャッチ
fun readConfig(path: String): Map<String, String> {
    return try {
        val file = java.io.File(path)
        file.readLines()
            .filter { it.contains("=") }
            .associate {
                val (key, value) = it.split("=", limit = 2)
                key.trim() to value.trim()
            }
    } catch (e: java.io.FileNotFoundException) {
        println("設定ファイルが見つかりません: \${path}")
        emptyMap()
    } catch (e: java.io.IOException) {
        println("読み取りエラー: \${e.message}")
        emptyMap()
    } finally {
        println("設定ファイル読み込み処理完了")
    }
}

// use 関数でリソースを安全に管理（try-with-resources相当）
fun countLines(path: String): Int {
    return java.io.BufferedReader(java.io.FileReader(path)).use { reader ->
        reader.lineSequence().count()
    }
}

// Nothing 型を返す関数（常に例外をスローする関数）
fun fail(message: String): Nothing {
    throw IllegalStateException(message)
}

val value: String = map["key"] ?: fail("キーが見つかりません")`,
      },
      {
        title: "Result 型と runCatching",
        content:
          "Kotlin標準ライブラリのResult<T>型は、成功値または失敗（例外）を保持する型です。runCatching関数はブロック内の処理を実行し、結果をResult型で返します。例外がスローされた場合は自動的にキャッチしてResult.failureとして返すため、try/catchを書く必要がなくなります。Result型にはmap、mapCatching、recover、fold、getOrElse、getOrDefaultなど豊富な操作メソッドが用意されており、関数型スタイルでエラーハンドリングを連鎖させることができます。",
        code: `// runCatching で例外を安全にキャッチ
val result: Result<Int> = runCatching {
    "42".toInt()
}
println(result.isSuccess)    // true
println(result.getOrNull())  // 42

// 失敗のケース
val failed: Result<Int> = runCatching {
    "abc".toInt()  // NumberFormatException
}
println(failed.isFailure)  // true
println(failed.exceptionOrNull()?.message)  // For input string: "abc"

// getOrElse / getOrDefault でデフォルト値を取得
val safeValue = failed.getOrElse { exception ->
    println("変換失敗: \${exception.message}")
    -1
}
println(safeValue)  // -1

// map / mapCatching でチェーン処理
data class User(val id: Int, val name: String)

fun fetchUserName(idStr: String): Result<String> {
    return runCatching {
        idStr.toInt()
    }.mapCatching { id ->
        // DBからユーザー取得をシミュレート
        if (id <= 0) throw IllegalArgumentException("無効なID: \$id")
        User(id, "ユーザー\$id")
    }.map { user ->
        user.name
    }
}

println(fetchUserName("5").getOrNull())   // ユーザー5
println(fetchUserName("abc").isFailure)   // true

// recover で失敗時にリカバリ
val recovered = failed.recover { exception ->
    println("リカバリ: \${exception.message}")
    0
}
println(recovered.getOrNull())  // 0

// fold で成功・失敗を統一的に処理
val message = result.fold(
    onSuccess = { "成功: 値は\$it" },
    onFailure = { "失敗: \${it.message}" }
)
println(message)  // 成功: 値は42`,
      },
      {
        title: "sealed class でのエラーモデリング",
        content:
          "sealed classを使うと、成功と失敗のケースを型安全に表現できます。標準のResult型は例外ベースですが、sealed classを使えばビジネスエラーを例外に頼らず明示的にモデリングできます。when式と組み合わせることで、すべてのケースを網羅的に処理でき、ケースの追加忘れをコンパイル時に検出できます。これはドメイン駆動設計（DDD）において非常に有効なパターンです。",
        code: `// ビジネスエラーを sealed class でモデリング
sealed class ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>()
    sealed class Error : ApiResult<Nothing>() {
        data class NetworkError(val cause: Throwable) : Error()
        data class HttpError(val code: Int, val message: String) : Error()
        data class ParseError(val rawBody: String) : Error()
        data object Unauthorized : Error()
        data object NotFound : Error()
    }
}

// 使用例：API呼び出し
data class UserProfile(val id: Int, val name: String, val email: String)

fun fetchProfile(userId: Int): ApiResult<UserProfile> {
    return when {
        userId <= 0 ->
            ApiResult.Error.HttpError(400, "無効なユーザーID")
        userId == 999 ->
            ApiResult.Error.NotFound
        else ->
            ApiResult.Success(
                UserProfile(userId, "田中太郎", "tanaka@example.com")
            )
    }
}

// when 式で網羅的に処理（else 不要 = ケース追加時にコンパイルエラー）
fun handleResult(result: ApiResult<UserProfile>): String {
    return when (result) {
        is ApiResult.Success ->
            "ユーザー: \${result.data.name} (\${result.data.email})"
        is ApiResult.Error.NetworkError ->
            "ネットワークエラー: \${result.cause.message}"
        is ApiResult.Error.HttpError ->
            "HTTPエラー \${result.code}: \${result.message}"
        is ApiResult.Error.ParseError ->
            "パースエラー: \${result.rawBody.take(100)}"
        ApiResult.Error.Unauthorized ->
            "認証エラー: ログインしてください"
        ApiResult.Error.NotFound ->
            "リソースが見つかりません"
    }
}

// 実行
val profile = fetchProfile(1)
println(handleResult(profile))  // ユーザー: 田中太郎 (tanaka@example.com)

val notFound = fetchProfile(999)
println(handleResult(notFound))  // リソースが見つかりません`,
      },
      {
        title: "Either パターン",
        content:
          "Eitherパターンは関数型プログラミングでよく使われるエラーハンドリング手法で、Left（失敗）とRight（成功）の2つの値のどちらかを保持します。Kotlinではsealed classで簡単に実装でき、例外を使わずにエラーを伝播できます。mapやflatMapを実装することで、成功時のみ処理を連鎖させるモナド的な操作が可能になります。ArrowライブラリのEitherを使えばより高機能な実装を利用できますが、基本的な用途ではカスタム実装で十分です。",
        code: `// Either をシンプルに実装
sealed class Either<out L, out R> {
    data class Left<L>(val value: L) : Either<L, Nothing>()
    data class Right<R>(val value: R) : Either<Nothing, R>()

    // map: 成功側の値を変換
    fun <T> map(transform: (R) -> T): Either<L, T> = when (this) {
        is Left -> this
        is Right -> Right(transform(value))
    }

    // flatMap: 成功側の値を変換（変換結果も Either）
    fun <T> flatMap(transform: (R) -> Either<L, T>): Either<L, T> = when (this) {
        is Left -> this
        is Right -> transform(value)
    }

    // fold: 両方のケースを処理
    fun <T> fold(onLeft: (L) -> T, onRight: (R) -> T): T = when (this) {
        is Left -> onLeft(value)
        is Right -> onRight(value)
    }
}

// ドメインエラーを定義
sealed class DomainError(val message: String) {
    class ValidationError(message: String) : DomainError(message)
    class BusinessRuleError(message: String) : DomainError(message)
    class ExternalServiceError(message: String) : DomainError(message)
}

// バリデーション関数
data class Email(val value: String)
data class Age(val value: Int)

fun validateEmail(input: String): Either<DomainError, Email> {
    return if (input.contains("@") && input.contains(".")) {
        Either.Right(Email(input))
    } else {
        Either.Left(DomainError.ValidationError("無効なメールアドレス: \$input"))
    }
}

fun validateAge(input: Int): Either<DomainError, Age> {
    return if (input in 0..150) {
        Either.Right(Age(input))
    } else {
        Either.Left(DomainError.ValidationError("無効な年齢: \$input"))
    }
}

// flatMap で処理をチェーン
data class RegistrationData(val email: Email, val age: Age)

fun register(emailStr: String, ageInt: Int): Either<DomainError, RegistrationData> {
    return validateEmail(emailStr).flatMap { email ->
        validateAge(ageInt).map { age ->
            RegistrationData(email, age)
        }
    }
}

// 使用例
val success = register("user@example.com", 25)
val result = success.fold(
    onLeft = { "エラー: \${it.message}" },
    onRight = { "登録成功: \${it.email.value}, \${it.age.value}歳" }
)
println(result)  // 登録成功: user@example.com, 25歳

val failure = register("invalid", 25)
println(failure.fold({ it.message }, { "OK" }))  // 無効なメールアドレス: invalid`,
      },
      {
        title: "実践的なエラーハンドリング設計",
        content:
          "実際のアプリケーションでは、複数のエラーハンドリング手法を組み合わせて使います。外部ライブラリやI/O操作ではrunCatchingやtry/catchを使い、ドメイン層ではsealed classやEitherパターンを使うのが一般的です。コルーチンではCoroutineExceptionHandlerを使って非同期処理のエラーをハンドリングします。また、複数のバリデーションエラーを蓄積するAccumulatedエラーパターンも実務では重要です。",
        code: `// 複数のバリデーションエラーを蓄積するパターン
data class ValidationErrors(val errors: List<String>) {
    companion object {
        fun of(vararg errors: String) = ValidationErrors(errors.toList())
    }
    fun merge(other: ValidationErrors) =
        ValidationErrors(errors + other.errors)
}

sealed class Validated<out E, out T> {
    data class Valid<T>(val value: T) : Validated<Nothing, T>()
    data class Invalid<E>(val error: E) : Validated<E, Nothing>()
}

// バリデーションの蓄積
data class UserForm(val name: String, val email: String, val age: Int)

fun validateForm(name: String, email: String, age: Int):
        Validated<ValidationErrors, UserForm> {
    val errors = mutableListOf<String>()

    if (name.isBlank()) errors.add("名前は必須です")
    if (name.length > 50) errors.add("名前は50文字以内です")
    if (!email.contains("@")) errors.add("メールアドレスが無効です")
    if (age !in 0..150) errors.add("年齢が範囲外です")

    return if (errors.isEmpty()) {
        Validated.Valid(UserForm(name, email, age))
    } else {
        Validated.Invalid(ValidationErrors(errors))
    }
}

// 実行例
when (val result = validateForm("", "invalid", -5)) {
    is Validated.Valid -> println("登録: \${result.value}")
    is Validated.Invalid -> {
        println("バリデーションエラー:")
        result.error.errors.forEach { println("  - \$it") }
    }
}
// 出力:
// バリデーションエラー:
//   - 名前は必須です
//   - メールアドレスが無効です
//   - 年齢が範囲外です

// リポジトリ層：外部I/Oのエラーをドメインエラーに変換
sealed class DbError(val message: String) {
    class ConnectionFailed(message: String) : DbError(message)
    class RecordNotFound(val id: Int) : DbError("ID=\$id のレコードが見つかりません")
    class DuplicateKey(val key: String) : DbError("重複キー: \$key")
}

class UserRepository {
    fun findById(id: Int): Either<DbError, UserProfile> {
        return runCatching {
            // DB接続をシミュレート
            if (id == 1) UserProfile(1, "田中太郎", "tanaka@example.com")
            else throw NoSuchElementException("Not found")
        }.fold(
            onSuccess = { Either.Right(it) },
            onFailure = { Either.Left(DbError.RecordNotFound(id)) }
        )
    }
}

val repo = UserRepository()
val user = repo.findById(1)
println(user)  // Right(UserProfile(1, 田中太郎, tanaka@example.com))

val missing = repo.findById(99)
println(missing)  // Left(RecordNotFound(id=99))`,
      },
    ],
  },
  {
    id: "testing-kotlin",
    title: "Kotlinテスト",
    category: "practice",
    description:
      "JUnit5、Kotest、MockKなどのテストフレームワークを活用し、コルーチンやプロパティベーステストを含む実践的なKotlinテスト手法を学ぶ",
    sections: [
      {
        title: "JUnit5 + Kotlin",
        content:
          "KotlinでのJUnit5テストはJavaとほぼ同じですが、Kotlinの言語機能によりさらに簡潔に書けます。バッククォートで囲んだ関数名を使えば、日本語のテスト名が可能です。@Nested内部クラスでテストをグループ化し、@ParameterizedTestでデータ駆動テストを実現します。また、assertThrowsの代わりにKotlinらしいassertFailsやassertThrows<T>のreified型パラメータが使えます。",
        code: `import org.junit.jupiter.api.*
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.CsvSource
import org.junit.jupiter.params.provider.ValueSource

// テスト対象のクラス
class Calculator {
    fun add(a: Int, b: Int): Int = a + b
    fun divide(a: Int, b: Int): Int {
        require(b != 0) { "0で割ることはできません" }
        return a / b
    }
}

class CalculatorTest {
    private lateinit var calculator: Calculator

    @BeforeEach
    fun setUp() {
        calculator = Calculator()
    }

    @Test
    fun \`足し算が正しく動作すること\`() {
        assertEquals(5, calculator.add(2, 3))
        assertEquals(0, calculator.add(-1, 1))
        assertEquals(-3, calculator.add(-1, -2))
    }

    @Test
    fun \`0で割るとIllegalArgumentExceptionが発生すること\`() {
        val exception = assertThrows<IllegalArgumentException> {
            calculator.divide(10, 0)
        }
        assertEquals("0で割ることはできません", exception.message)
    }

    @Nested
    inner class \`割り算テスト\` {
        @ParameterizedTest(name = "{0} ÷ {1} = {2}")
        @CsvSource("10,2,5", "9,3,3", "100,10,10")
        fun \`正常な割り算\`(a: Int, b: Int, expected: Int) {
            assertEquals(expected, calculator.divide(a, b))
        }
    }

    @ParameterizedTest
    @ValueSource(ints = [1, 2, 3, 4, 5])
    fun \`正の数同士の足し算は正の数になること\`(value: Int) {
        assertTrue(calculator.add(value, value) > 0)
    }
}`,
      },
      {
        title: "Kotest（BDDスタイル）",
        content:
          "KotestはKotlinネイティブのテストフレームワークで、複数のテストスタイル（FunSpec, StringSpec, BehaviorSpec, DescribeSpecなど）をサポートします。BehaviorSpecではGiven/When/Then形式でBDDスタイルのテストを記述でき、ビジネスロジックのテストに適しています。Kotest独自のマッチャー（shouldBe, shouldContain, shouldThrowなど）は非常に読みやすく、テストの意図を明確に表現できます。",
        code: `import io.kotest.core.spec.style.BehaviorSpec
import io.kotest.core.spec.style.FunSpec
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe
import io.kotest.matchers.string.shouldContain
import io.kotest.matchers.string.shouldStartWith
import io.kotest.matchers.collections.shouldContainAll
import io.kotest.matchers.collections.shouldHaveSize
import io.kotest.assertions.throwables.shouldThrow

// テスト対象
data class User(val name: String, val email: String, val age: Int) {
    init {
        require(name.isNotBlank()) { "名前は必須です" }
        require(age in 0..150) { "年齢は0〜150の範囲です" }
        require(email.contains("@")) { "無効なメールアドレスです" }
    }
}

// BehaviorSpec: Given/When/Then スタイル
class UserBehaviorTest : BehaviorSpec({
    Given("有効なユーザー情報が提供された場合") {
        val name = "田中太郎"
        val email = "tanaka@example.com"
        val age = 30

        When("ユーザーを作成すると") {
            val user = User(name, email, age)

            Then("正しい値が設定される") {
                user.name shouldBe "田中太郎"
                user.email shouldContain "@"
                user.age shouldBe 30
            }
        }
    }

    Given("無効な名前が提供された場合") {
        When("空文字でユーザーを作成すると") {
            Then("IllegalArgumentExceptionが発生する") {
                val exception = shouldThrow<IllegalArgumentException> {
                    User("", "test@example.com", 25)
                }
                exception.message shouldBe "名前は必須です"
            }
        }
    }
})

// StringSpec: 最もシンプルなスタイル
class UserStringTest : StringSpec({
    "ユーザーの名前が正しく設定される" {
        val user = User("山田花子", "yamada@example.com", 25)
        user.name shouldBe "山田花子"
    }

    "年齢が範囲外の場合に例外が発生する" {
        shouldThrow<IllegalArgumentException> {
            User("テスト", "test@example.com", 200)
        }
    }
})`,
      },
      {
        title: "MockK によるモックテスト",
        content:
          "MockKはKotlin専用のモックライブラリで、Kotlinの言語機能（コルーチン、拡張関数、トップレベル関数など）を完全にサポートします。every/answersでモックの振る舞いを定義し、verify/confirmVerifiedで呼び出しを検証します。coEvery/coVerifyを使えばsuspend関数のモックも容易です。spyk（スパイ）を使うと実際のオブジェクトの一部だけをモックできます。",
        code: `import io.mockk.*
import io.mockk.impl.annotations.MockK
import io.mockk.impl.annotations.InjectMockKs
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

// プロダクションコード
data class Product(val id: Int, val name: String, val price: Int)

interface ProductRepository {
    fun findById(id: Int): Product?
    fun findAll(): List<Product>
    suspend fun save(product: Product): Product
}

class ProductService(private val repository: ProductRepository) {
    fun getProduct(id: Int): Product {
        return repository.findById(id)
            ?: throw NoSuchElementException("商品ID=\$id が見つかりません")
    }

    fun getExpensiveProducts(threshold: Int): List<Product> {
        return repository.findAll().filter { it.price >= threshold }
    }
}

// テスト
class ProductServiceTest {
    @MockK
    private lateinit var repository: ProductRepository

    private lateinit var service: ProductService

    @BeforeEach
    fun setUp() {
        MockKAnnotations.init(this)
        service = ProductService(repository)
    }

    @Test
    fun \`商品IDで商品を取得できること\`() {
        // モックの振る舞いを定義
        val expected = Product(1, "Kotlin入門書", 3000)
        every { repository.findById(1) } returns expected

        // 実行
        val result = service.getProduct(1)

        // 検証
        assert(result == expected)
        verify(exactly = 1) { repository.findById(1) }
        confirmVerified(repository)
    }

    @Test
    fun \`高額商品のフィルタリングが正しく動作すること\`() {
        every { repository.findAll() } returns listOf(
            Product(1, "本", 1500),
            Product(2, "PC", 150000),
            Product(3, "マウス", 3000),
            Product(4, "モニター", 50000)
        )

        val result = service.getExpensiveProducts(10000)

        assert(result.size == 2)
        assert(result.all { it.price >= 10000 })

        verify { repository.findAll() }
    }

    @Test
    fun \`スパイを使った部分モック\`() {
        val realList = mutableListOf("a", "b", "c")
        val spyList = spyk(realList)

        // 一部だけモック
        every { spyList.size } returns 100

        assert(spyList[0] == "a")  // 実際の値
        assert(spyList.size == 100) // モックされた値
    }
}`,
      },
      {
        title: "テストコルーチン（runTest）",
        content:
          "Kotlinコルーチンのテストにはkotlinx-coroutines-testライブラリのrunTestを使います。runTestは仮想時間を使用するため、delay()を含むコルーチンも即座にテストが完了します。TestDispatcherを使ってディスパッチャーを制御でき、advanceTimeByやadvanceUntilIdleで時間の進行を明示的にコントロールできます。Turbineライブラリを使えばFlowのテストも容易に行えます。",
        code: `import kotlinx.coroutines.*
import kotlinx.coroutines.test.*
import kotlinx.coroutines.flow.*
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

// テスト対象のサービス
class NotificationService {
    suspend fun sendWithRetry(
        message: String,
        maxRetries: Int = 3
    ): Result<String> {
        repeat(maxRetries) { attempt ->
            try {
                delay(1000L * (attempt + 1))  // リトライ間隔
                // 送信処理シミュレーション
                return Result.success("送信完了: \$message")
            } catch (e: Exception) {
                if (attempt == maxRetries - 1) {
                    return Result.failure(e)
                }
            }
        }
        return Result.failure(Exception("送信失敗"))
    }

    fun observeNotifications(): Flow<String> = flow {
        var count = 0
        while (true) {
            delay(5000)  // 5秒ごとにポーリング
            count++
            emit("通知 #\$count")
        }
    }
}

class NotificationServiceTest {

    @Test
    fun \`リトライ付き送信が成功すること\`() = runTest {
        val service = NotificationService()
        val result = service.sendWithRetry("テストメッセージ")

        assertEquals(true, result.isSuccess)
        assertEquals("送信完了: テストメッセージ", result.getOrNull())
    }

    @Test
    fun \`仮想時間でFlowをテスト\`() = runTest {
        val service = NotificationService()
        val results = mutableListOf<String>()

        // 最初の3件だけ取得
        val job = launch {
            service.observeNotifications()
                .take(3)
                .collect { results.add(it) }
        }

        // 仮想時間を進める
        advanceTimeBy(15_001)  // 15秒 + 1ms
        job.join()

        assertEquals(3, results.size)
        assertEquals("通知 #1", results[0])
        assertEquals("通知 #2", results[1])
        assertEquals("通知 #3", results[2])
    }

    @Test
    fun \`TestScopeでディスパッチャーを注入\`() = runTest {
        val testDispatcher = UnconfinedTestDispatcher(testScheduler)

        val service = NotificationService()
        val results = mutableListOf<String>()

        backgroundScope.launch(testDispatcher) {
            service.observeNotifications()
                .take(2)
                .collect { results.add(it) }
        }

        advanceTimeBy(10_001)
        assertEquals(2, results.size)
    }
}`,
      },
      {
        title: "プロパティベーステスト",
        content:
          "プロパティベーステストは、具体的なテストケースを手動で書く代わりに、入力をランダムに生成してプロパティ（性質）が常に成り立つことを検証するテスト手法です。KotestのProperty Testingモジュールを使えば、Arb（Arbitrary）ジェネレータで様々な入力を自動生成し、forAllやcheckAllで性質を検証できます。エッジケースの見落としを防ぎ、より網羅的なテストが可能になります。",
        code: `import io.kotest.core.spec.style.FunSpec
import io.kotest.property.forAll
import io.kotest.property.checkAll
import io.kotest.property.Arb
import io.kotest.property.arbitrary.*
import io.kotest.matchers.shouldBe
import io.kotest.matchers.ints.shouldBeGreaterThanOrEqual
import io.kotest.matchers.string.shouldHaveLength

// テスト対象の関数群
fun reverseString(s: String): String = s.reversed()

fun sortList(list: List<Int>): List<Int> = list.sorted()

data class Money(val amount: Int, val currency: String) {
    operator fun plus(other: Money): Money {
        require(currency == other.currency) {
            "通貨が異なります: \$currency vs \${other.currency}"
        }
        return Money(amount + other.amount, currency)
    }
}

class PropertyBasedTest : FunSpec({

    test("文字列の反転を2回適用すると元に戻る") {
        forAll<String> { input ->
            reverseString(reverseString(input)) == input
        }
    }

    test("反転後の文字列長は元の文字列長と同じ") {
        forAll<String> { input ->
            reverseString(input).length == input.length
        }
    }

    test("ソート後のリストは昇順になっている") {
        forAll(Arb.list(Arb.int())) { list ->
            val sorted = sortList(list)
            sorted.zipWithNext().all { (a, b) -> a <= b }
        }
    }

    test("ソート後のリストは元のリストと同じ要素を持つ") {
        forAll(Arb.list(Arb.int())) { list ->
            val sorted = sortList(list)
            sorted.size == list.size && sorted.toSet() == list.toSet()
        }
    }

    test("金額の加算は可換性を持つ") {
        checkAll(Arb.int(0..1_000_000), Arb.int(0..1_000_000)) { a, b ->
            val moneyA = Money(a, "JPY")
            val moneyB = Money(b, "JPY")

            val result1 = moneyA + moneyB
            val result2 = moneyB + moneyA

            result1.amount shouldBe result2.amount
        }
    }

    test("金額の加算は結合性を持つ") {
        checkAll(
            Arb.int(0..100_000),
            Arb.int(0..100_000),
            Arb.int(0..100_000)
        ) { a, b, c ->
            val x = Money(a, "JPY")
            val y = Money(b, "JPY")
            val z = Money(c, "JPY")

            val left = (x + y) + z
            val right = x + (y + z)

            left.amount shouldBe right.amount
        }
    }

    test("カスタムジェネレータでユーザーデータを生成") {
        val emailArb = Arb.string(5..10, Codepoint.alphanumeric()).map {
            "\$it@example.com"
        }
        val userArb = Arb.bind(
            Arb.string(1..20),
            emailArb,
            Arb.int(18..100)
        ) { name, email, age ->
            User(name.ifBlank { "default" }, email, age)
        }

        forAll(userArb) { user ->
            user.age in 18..100 && user.email.contains("@")
        }
    }
})`,
      },
    ],
  },
  {
    id: "ktor",
    title: "Ktor Webフレームワーク",
    category: "ecosystem",
    description:
      "JetBrains製の軽量WebフレームワークKtorを使い、サーバー構築・ルーティング・シリアライゼーション・認証・HTTPクライアント機能を学ぶ",
    sections: [
      {
        title: "Ktor Server 基礎",
        content:
          "KtorはJetBrainsが開発したKotlinネイティブの軽量Webフレームワークです。コルーチンベースで非同期処理が自然に書け、プラグイン（Plugin）アーキテクチャにより必要な機能だけを追加できます。embeddedServerでサーバーを起動し、Netty、Jetty、CIOなどのエンジンを選択できます。Application.module()でプラグインやルーティングを設定し、モジュール分割で大規模アプリにも対応できます。",
        code: `import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.http.*

// 最小構成のKtorサーバー
fun main() {
    embeddedServer(Netty, port = 8080) {
        // プラグインのインストール
        install(ContentNegotiation) {
            json()  // JSON シリアライゼーション
        }

        // ルーティング設定
        routing {
            get("/") {
                call.respondText(
                    "Hello, Ktor!",
                    contentType = ContentType.Text.Plain
                )
            }

            get("/health") {
                call.respond(
                    HttpStatusCode.OK,
                    mapOf("status" to "UP", "version" to "1.0.0")
                )
            }
        }
    }.start(wait = true)
}

// モジュール分割パターン（大規模アプリ向け）
fun Application.module() {
    configurePlugins()     // プラグイン設定
    configureRouting()     // ルーティング設定
    configureSecurity()    // セキュリティ設定
}

fun Application.configurePlugins() {
    install(ContentNegotiation) {
        json(kotlinx.serialization.json.Json {
            prettyPrint = true
            isLenient = true
            ignoreUnknownKeys = true
        })
    }
}

// application.conf (HOCON形式) での設定
// ktor {
//     deployment {
//         port = 8080
//         host = 0.0.0.0
//     }
//     application {
//         modules = [ com.example.ApplicationKt.module ]
//     }
// }`,
      },
      {
        title: "ルーティング",
        content:
          "Ktorのルーティングは直感的なDSLで定義します。HTTPメソッド（get, post, put, delete, patch）ごとにハンドラを設定し、パスパラメータやクエリパラメータを簡単に取得できます。route関数でパスをグループ化してネストでき、RESTful APIの設計が容易です。リクエストボディの受信にはcall.receive<T>()を使い、Kotlinxシリアライゼーションと連携して自動的にデシリアライズされます。",
        code: `import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.http.*
import kotlinx.serialization.Serializable

@Serializable
data class TaskRequest(val title: String, val description: String)

@Serializable
data class TaskResponse(
    val id: Int,
    val title: String,
    val description: String,
    val completed: Boolean
)

// インメモリデータストア
val tasks = mutableListOf<TaskResponse>()
var nextId = 1

fun Application.configureRouting() {
    routing {
        // APIのグループ化
        route("/api/v1") {
            route("/tasks") {
                // 一覧取得: GET /api/v1/tasks?completed=true
                get {
                    val completed = call.request.queryParameters["completed"]
                        ?.toBooleanStrictOrNull()
                    val result = if (completed != null) {
                        tasks.filter { it.completed == completed }
                    } else {
                        tasks
                    }
                    call.respond(result)
                }

                // 個別取得: GET /api/v1/tasks/{id}
                get("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull()
                        ?: return@get call.respond(
                            HttpStatusCode.BadRequest,
                            mapOf("error" to "無効なIDです")
                        )
                    val task = tasks.find { it.id == id }
                        ?: return@get call.respond(
                            HttpStatusCode.NotFound,
                            mapOf("error" to "タスクが見つかりません")
                        )
                    call.respond(task)
                }

                // 作成: POST /api/v1/tasks
                post {
                    val request = call.receive<TaskRequest>()
                    val task = TaskResponse(
                        id = nextId++,
                        title = request.title,
                        description = request.description,
                        completed = false
                    )
                    tasks.add(task)
                    call.respond(HttpStatusCode.Created, task)
                }

                // 更新: PUT /api/v1/tasks/{id}
                put("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull()
                        ?: return@put call.respond(
                            HttpStatusCode.BadRequest,
                            mapOf("error" to "無効なIDです")
                        )
                    val request = call.receive<TaskRequest>()
                    val index = tasks.indexOfFirst { it.id == id }
                    if (index == -1) {
                        call.respond(HttpStatusCode.NotFound)
                        return@put
                    }
                    tasks[index] = tasks[index].copy(
                        title = request.title,
                        description = request.description
                    )
                    call.respond(tasks[index])
                }

                // 削除: DELETE /api/v1/tasks/{id}
                delete("/{id}") {
                    val id = call.parameters["id"]?.toIntOrNull()
                        ?: return@delete call.respond(HttpStatusCode.BadRequest)
                    val removed = tasks.removeIf { it.id == id }
                    if (removed) call.respond(HttpStatusCode.NoContent)
                    else call.respond(HttpStatusCode.NotFound)
                }
            }
        }
    }
}`,
      },
      {
        title: "Serialization（シリアライゼーション）",
        content:
          "KtorではKotlinx.serializationプラグインを使ってJSON/XML/CBORなどのシリアライゼーション・デシリアライゼーションを行います。@Serializableアノテーションを付けたdata classを定義すれば、リクエスト・レスポンスの変換が自動的に行われます。カスタムシリアライザーを作成して複雑な変換ロジックにも対応でき、日付型やenum型のカスタマイズも容易です。ContentNegotiationプラグインでAcceptヘッダーに基づく自動コンテンツネゴシエーションも可能です。",
        code: `import kotlinx.serialization.*
import kotlinx.serialization.json.*
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import java.time.LocalDateTime

// 基本的なシリアライズ可能なクラス
@Serializable
data class ApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val error: String? = null,
    val timestamp: Long = System.currentTimeMillis()
) {
    companion object {
        fun <T> ok(data: T) = ApiResponse(success = true, data = data)
        fun <T> error(message: String) =
            ApiResponse<T>(success = false, error = message)
    }
}

// ネストしたデータクラス
@Serializable
data class OrderRequest(
    val customerId: Int,
    val items: List<OrderItem>,
    val shippingAddress: Address,
    val note: String? = null  // null許容フィールド
)

@Serializable
data class OrderItem(
    val productId: Int,
    val quantity: Int,
    val unitPrice: Double
)

@Serializable
data class Address(
    val postalCode: String,
    val prefecture: String,
    val city: String,
    val street: String
)

// カスタムシリアライザー（LocalDateTime用）
object LocalDateTimeSerializer : KSerializer<LocalDateTime> {
    override val descriptor: SerialDescriptor =
        PrimitiveSerialDescriptor("LocalDateTime", PrimitiveKind.STRING)

    override fun serialize(encoder: Encoder, value: LocalDateTime) {
        encoder.encodeString(value.toString())
    }

    override fun deserialize(decoder: Decoder): LocalDateTime {
        return LocalDateTime.parse(decoder.decodeString())
    }
}

@Serializable
data class Event(
    val name: String,
    @Serializable(with = LocalDateTimeSerializer::class)
    val startAt: LocalDateTime,
    @Serializable(with = LocalDateTimeSerializer::class)
    val endAt: LocalDateTime
)

// Ktor の ContentNegotiation 設定
fun Application.configureSerialization() {
    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true          // 整形出力
            isLenient = true            // 緩いパース
            ignoreUnknownKeys = true    // 未知のキーを無視
            encodeDefaults = true       // デフォルト値も出力
            coerceInputValues = true    // null を デフォルト値に変換
        })
    }
}

// 使用例
val json = Json { prettyPrint = true }
val order = OrderRequest(
    customerId = 1,
    items = listOf(
        OrderItem(101, 2, 1500.0),
        OrderItem(102, 1, 3000.0)
    ),
    shippingAddress = Address("100-0001", "東京都", "千代田区", "1-1-1")
)
val jsonString = json.encodeToString(order)
val decoded = json.decodeFromString<OrderRequest>(jsonString)`,
      },
      {
        title: "認証（Authentication）",
        content:
          "Ktorの認証はAuthenticationプラグインで実装します。Basic認証、Bearer（JWT）認証、OAuth、セッション認証など複数の認証方式をサポートしています。authenticate {}ブロックでルートを保護し、call.principal<T>()で認証済みユーザーの情報を取得できます。JWT認証ではトークンの生成・検証を行い、ロールベースの認可も実装可能です。複数の認証方式を組み合わせることもできます。",
        code: `import io.ktor.server.application.*
import io.ktor.server.auth.*
import io.ktor.server.auth.jwt.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.http.*
import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import java.util.Date

// JWT設定
object JwtConfig {
    private const val SECRET = "your-secret-key"
    private const val ISSUER = "ktor-app"
    private const val AUDIENCE = "ktor-users"
    private const val VALIDITY_MS = 3_600_000L  // 1時間

    val algorithm = Algorithm.HMAC256(SECRET)

    fun generateToken(userId: Int, role: String): String {
        return JWT.create()
            .withIssuer(ISSUER)
            .withAudience(AUDIENCE)
            .withClaim("userId", userId)
            .withClaim("role", role)
            .withExpiresAt(Date(System.currentTimeMillis() + VALIDITY_MS))
            .sign(algorithm)
    }
}

// 認証設定
fun Application.configureSecurity() {
    install(Authentication) {
        // Basic認証
        basic("auth-basic") {
            realm = "Ktor App"
            validate { credentials ->
                if (credentials.name == "admin"
                    && credentials.password == "password") {
                    UserIdPrincipal(credentials.name)
                } else null
            }
        }

        // JWT認証
        jwt("auth-jwt") {
            realm = "Ktor App"
            verifier(
                JWT.require(JwtConfig.algorithm)
                    .withIssuer("ktor-app")
                    .withAudience("ktor-users")
                    .build()
            )
            validate { credential ->
                val userId = credential.payload.getClaim("userId").asInt()
                val role = credential.payload.getClaim("role").asString()
                if (userId != null) {
                    JWTPrincipal(credential.payload)
                } else null
            }
            challenge { _, _ ->
                call.respond(
                    HttpStatusCode.Unauthorized,
                    mapOf("error" to "トークンが無効または期限切れです")
                )
            }
        }
    }

    routing {
        // ログインエンドポイント（認証不要）
        post("/login") {
            val token = JwtConfig.generateToken(userId = 1, role = "admin")
            call.respond(mapOf("token" to token))
        }

        // JWT認証で保護されたルート
        authenticate("auth-jwt") {
            get("/me") {
                val principal = call.principal<JWTPrincipal>()!!
                val userId = principal.payload.getClaim("userId").asInt()
                val role = principal.payload.getClaim("role").asString()
                call.respond(mapOf(
                    "userId" to userId.toString(),
                    "role" to role
                ))
            }

            // ロールベース認可
            route("/admin") {
                intercept(ApplicationCallPipeline.Call) {
                    val principal = call.principal<JWTPrincipal>()
                    val role = principal?.payload
                        ?.getClaim("role")?.asString()
                    if (role != "admin") {
                        call.respond(
                            HttpStatusCode.Forbidden,
                            mapOf("error" to "管理者権限が必要です")
                        )
                        finish()
                    }
                }
                get("/users") {
                    call.respond(mapOf("users" to listOf("user1", "user2")))
                }
            }
        }
    }
}`,
      },
      {
        title: "Ktor クライアント機能",
        content:
          "KtorはHTTPクライアント機能も提供しており、外部APIとの通信にサーバーと同じシリアライゼーション設定を共有できます。HttpClientはコルーチンベースで非同期リクエストを自然に記述でき、タイムアウト、リトライ、ロギングなどのプラグインも利用可能です。レスポンスの自動デシリアライゼーション、ファイルアップロード、WebSocket通信にも対応しています。テスト時にはMockEngineを使ってHTTP通信をモックできます。",
        code: `import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.cio.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.logging.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.Serializable

@Serializable
data class GitHubRepo(
    val name: String,
    val full_name: String,
    val description: String? = null,
    val stargazers_count: Int = 0,
    val language: String? = null
)

// HTTPクライアントの設定
val client = HttpClient(CIO) {
    // JSONシリアライゼーション
    install(ContentNegotiation) {
        json(kotlinx.serialization.json.Json {
            ignoreUnknownKeys = true
            isLenient = true
        })
    }

    // ロギング
    install(Logging) {
        level = LogLevel.INFO
    }

    // タイムアウト設定
    install(HttpTimeout) {
        requestTimeoutMillis = 10_000
        connectTimeoutMillis = 5_000
        socketTimeoutMillis = 5_000
    }

    // デフォルトリクエスト設定
    defaultRequest {
        header("Accept", "application/json")
        header("User-Agent", "Ktor-Client/1.0")
    }
}

// 外部APIの呼び出し
suspend fun fetchGitHubRepos(username: String): List<GitHubRepo> {
    return client.get("https://api.github.com/users/\$username/repos") {
        parameter("sort", "stars")
        parameter("per_page", 10)
    }.body()
}

// POST リクエスト
@Serializable
data class CreateIssue(val title: String, val body: String)

suspend fun createIssue(
    owner: String,
    repo: String,
    issue: CreateIssue,
    token: String
): HttpResponse {
    return client.post("https://api.github.com/repos/\$owner/\$repo/issues") {
        bearerAuth(token)
        contentType(ContentType.Application.Json)
        setBody(issue)
    }
}

// リトライパターン
suspend fun <T> withRetry(
    maxRetries: Int = 3,
    delayMs: Long = 1000,
    block: suspend () -> T
): T {
    var lastException: Exception? = null
    repeat(maxRetries) { attempt ->
        try {
            return block()
        } catch (e: Exception) {
            lastException = e
            println("リトライ \${attempt + 1}/\$maxRetries: \${e.message}")
            kotlinx.coroutines.delay(delayMs * (attempt + 1))
        }
    }
    throw lastException!!
}

// テスト用のMockEngine
import io.ktor.client.engine.mock.*

val mockClient = HttpClient(MockEngine) {
    engine {
        addHandler { request ->
            when (request.url.encodedPath) {
                "/api/users" -> respond(
                    content = """[{"name":"test","full_name":"test/repo"}]""",
                    status = HttpStatusCode.OK,
                    headers = headersOf(
                        HttpHeaders.ContentType, "application/json"
                    )
                )
                else -> respondError(HttpStatusCode.NotFound)
            }
        }
    }
    install(ContentNegotiation) { json() }
}`,
      },
    ],
  },
  {
    id: "kotlin-script",
    title: "Kotlin Script & Gradle KTS",
    category: "ecosystem",
    description:
      "Kotlin Scriptの基礎からbuild.gradle.kts、カスタムタスク、プラグイン開発、ビルドロジックの共通化まで、Kotlinによるビルドシステムの活用法を学ぶ",
    sections: [
      {
        title: "Kotlin Script（kts）基礎",
        content:
          "Kotlin Script（.kts）はKotlinをスクリプト言語として使う機能です。コンパイルなしで直接実行でき、シェルスクリプトやPythonスクリプトの代替として利用できます。ファイルの拡張子を.ktsにし、kotlincまたはkotlinコマンドで実行します。スクリプト内ではトップレベルに式や文を記述でき、main関数は不要です。@file:DependsOnアノテーションで外部ライブラリの依存関係を宣言することもできます。",
        code: `#!/usr/bin/env kotlin
// ファイル名: deploy.main.kts

// 外部依存関係の宣言
@file:DependsOn("com.squareup.okhttp3:okhttp:4.12.0")
@file:DependsOn("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")

import java.io.File
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

// トップレベルコード（main関数不要）
val timestamp = LocalDateTime.now()
    .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
println("スクリプト開始: \$timestamp")

// コマンドライン引数
val args = args  // 自動的に利用可能
val env = args.firstOrNull() ?: "development"
println("環境: \$env")

// ファイル操作ユーティリティ
fun findFiles(dir: String, extension: String): List<File> {
    return File(dir).walkTopDown()
        .filter { it.extension == extension }
        .toList()
}

// CSVファイルの処理
fun processCSV(path: String): List<Map<String, String>> {
    val file = File(path)
    if (!file.exists()) {
        println("ファイルが見つかりません: \$path")
        return emptyList()
    }

    val lines = file.readLines()
    if (lines.isEmpty()) return emptyList()

    val headers = lines.first().split(",").map { it.trim() }
    return lines.drop(1).map { line ->
        val values = line.split(",").map { it.trim() }
        headers.zip(values).toMap()
    }
}

// シェルコマンドの実行
fun exec(command: String): String {
    val process = ProcessBuilder("sh", "-c", command)
        .redirectErrorStream(true)
        .start()
    val output = process.inputStream.bufferedReader().readText()
    val exitCode = process.waitFor()
    if (exitCode != 0) {
        error("コマンド失敗 (exit=\$exitCode): \$command\\n\$output")
    }
    return output.trim()
}

// 使用例
val gitBranch = exec("git branch --show-current")
println("現在のブランチ: \$gitBranch")

val kotlinFiles = findFiles("src", "kt")
println("Kotlinファイル数: \${kotlinFiles.size}")`,
      },
      {
        title: "build.gradle.kts の基本構成",
        content:
          "build.gradle.ktsはGradleのビルドスクリプトをKotlinで記述する形式です。GroovyベースのGradleに比べ、IDEの補完・リファクタリング・型チェックが効くため、大規模プロジェクトでの保守性が大幅に向上します。plugins {}でプラグインを宣言し、dependencies {}で依存関係を管理します。repositories {}でリポジトリを指定し、tasks {}でカスタムタスクを定義します。settings.gradle.ktsでマルチプロジェクト構成を管理します。",
        code: `// build.gradle.kts
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "1.9.21"
    kotlin("plugin.serialization") version "1.9.21"
    application
    id("com.github.johnrengelman.shadow") version "8.1.1"
}

group = "com.example"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    // Kotlin標準ライブラリ
    implementation(kotlin("stdlib"))
    implementation(kotlin("reflect"))

    // コルーチン
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")

    // シリアライゼーション
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")

    // Ktor
    val ktorVersion = "2.3.7"
    implementation("io.ktor:ktor-server-core:\$ktorVersion")
    implementation("io.ktor:ktor-server-netty:\$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation:\$ktorVersion")
    implementation("io.ktor:ktor-serialization-kotlinx-json:\$ktorVersion")

    // ロギング
    implementation("ch.qos.logback:logback-classic:1.4.11")

    // テスト
    testImplementation(kotlin("test"))
    testImplementation("io.kotest:kotest-runner-junit5:5.8.0")
    testImplementation("io.kotest:kotest-assertions-core:5.8.0")
    testImplementation("io.mockk:mockk:1.13.8")
}

// Kotlin コンパイル設定
tasks.withType<KotlinCompile> {
    kotlinOptions {
        jvmTarget = "17"
        freeCompilerArgs += listOf(
            "-Xjsr305=strict",
            "-opt-in=kotlin.RequiresOptIn"
        )
    }
}

// テスト設定
tasks.test {
    useJUnitPlatform()
    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = true
    }
}

// アプリケーション設定
application {
    mainClass.set("com.example.MainKt")
}

// settings.gradle.kts（マルチプロジェクト構成）
// rootProject.name = "my-kotlin-app"
// include("app", "core", "api", "shared")`,
      },
      {
        title: "カスタムタスクの定義",
        content:
          "Gradle KTSではKotlinの型安全なDSLを使ってカスタムタスクを定義できます。register関数で遅延タスクを登録し、doFirst/doLastで実行時のアクションを定義します。DefaultTaskを継承したカスタムタスククラスを作成すれば、@TaskActionアノテーションで実行ロジックを定義し、@Inputや@OutputFileでプロパティを宣言的に管理できます。タスク間の依存関係はdependsOnやfinalizedByで設定します。",
        code: `import org.gradle.api.DefaultTask
import org.gradle.api.tasks.*
import java.io.File

// シンプルなカスタムタスク
tasks.register("hello") {
    group = "custom"
    description = "挨拶を表示するタスク"

    doLast {
        println("こんにちは、Gradle KTS！")
        println("プロジェクト名: \${project.name}")
        println("バージョン: \${project.version}")
    }
}

// タスククラスの定義
abstract class GenerateApiDocs : DefaultTask() {
    @get:InputDirectory
    abstract var sourceDir: File

    @get:OutputFile
    abstract var outputFile: File

    @TaskAction
    fun generate() {
        val kotlinFiles = sourceDir.walkTopDown()
            .filter { it.extension == "kt" }
            .toList()

        val docs = buildString {
            appendLine("# API ドキュメント")
            appendLine("生成日時: \${java.time.LocalDateTime.now()}")
            appendLine()

            kotlinFiles.forEach { file ->
                val content = file.readText()
                // data class を抽出
                val classRegex = Regex(
                    """data class (\w+)\(([\s\S]*?)\)"""
                )
                classRegex.findAll(content).forEach { match ->
                    appendLine("## \${match.groupValues[1]}")
                    appendLine("${"```"}kotlin")
                    appendLine(match.value)
                    appendLine("${"```"}")
                    appendLine()
                }
            }
        }

        outputFile.writeText(docs)
        println("ドキュメント生成完了: \${outputFile.absolutePath}")
        println("処理ファイル数: \${kotlinFiles.size}")
    }
}

// タスクの登録
tasks.register<GenerateApiDocs>("generateApiDocs") {
    group = "documentation"
    description = "KotlinソースからAPIドキュメントを生成"

    sourceDir = file("src/main/kotlin")
    outputFile = file("\${layout.buildDirectory.get()}/docs/api.md")
}

// タスク間の依存関係
tasks.register("deployLocal") {
    group = "deployment"
    description = "ローカル環境にデプロイ"

    dependsOn("build", "generateApiDocs")
    finalizedBy("cleanTemp")

    doLast {
        println("ローカルデプロイ完了")
    }
}

// 条件付きタスク
tasks.register("checkEnvironment") {
    doLast {
        val requiredVars = listOf("DATABASE_URL", "API_KEY")
        val missing = requiredVars.filter {
            System.getenv(it) == null
        }
        if (missing.isNotEmpty()) {
            throw GradleException(
                "環境変数が未設定: \${missing.joinToString()}"
            )
        }
        println("環境チェック: OK")
    }
}`,
      },
      {
        title: "Gradleプラグイン開発",
        content:
          "Gradle KTSでカスタムプラグインを開発すると、ビルドロジックを再利用可能なモジュールとしてパッケージ化できます。Pluginインターフェースを実装してapplyメソッドでプラグインの設定を行い、拡張（Extension）オブジェクトでプラグインのパラメータをDSLで設定可能にします。buildSrcディレクトリにプラグインを配置すれば、プロジェクト内で即座に利用できます。独立したプラグインとしてMaven/Gradleリポジトリに公開することも可能です。",
        code: `// buildSrc/build.gradle.kts
plugins {
    \`kotlin-dsl\`
}

repositories {
    mavenCentral()
}

// buildSrc/src/main/kotlin/CodeQualityPlugin.kt
import org.gradle.api.Plugin
import org.gradle.api.Project
import org.gradle.api.provider.Property
import org.gradle.api.tasks.Input

// プラグインの設定用 Extension
abstract class CodeQualityExtension {
    @get:Input
    abstract val maxLineLength: Property<Int>

    @get:Input
    abstract val failOnWarning: Property<Boolean>

    @get:Input
    abstract val excludePatterns: Property<List<String>>

    init {
        maxLineLength.convention(120)
        failOnWarning.convention(false)
        excludePatterns.convention(emptyList())
    }
}

// プラグイン本体
class CodeQualityPlugin : Plugin<Project> {
    override fun apply(project: Project) {
        // Extension の登録
        val extension = project.extensions.create(
            "codeQuality",
            CodeQualityExtension::class.java
        )

        // チェックタスクの登録
        project.tasks.register("checkCodeQuality") {
            group = "verification"
            description = "コード品質をチェックする"

            doLast {
                val maxLength = extension.maxLineLength.get()
                val failOnWarn = extension.failOnWarning.get()
                val excludes = extension.excludePatterns.get()
                var warnings = 0

                project.fileTree("src/main/kotlin")
                    .matching { exclude(excludes) }
                    .files
                    .forEach { file ->
                        file.readLines().forEachIndexed { idx, line ->
                            if (line.length > maxLength) {
                                println(
                                    "WARN: \${file.name}:\${idx + 1}" +
                                    " 行が\${maxLength}文字を超えています" +
                                    "（\${line.length}文字）"
                                )
                                warnings++
                            }
                        }
                    }

                println("チェック完了: 警告 \$warnings 件")
                if (failOnWarn && warnings > 0) {
                    throw org.gradle.api.GradleException(
                        "コード品質チェックに失敗: \$warnings 件の警告"
                    )
                }
            }
        }
    }
}

// build.gradle.kts での使用
// plugins {
//     id("code-quality")  // buildSrc内のプラグイン
// }
//
// codeQuality {
//     maxLineLength.set(100)
//     failOnWarning.set(true)
//     excludePatterns.set(listOf("**/generated/**"))
// }`,
      },
      {
        title: "ビルドロジックの共通化",
        content:
          "マルチモジュールプロジェクトでは、各サブプロジェクト間でビルドロジックを共通化することが重要です。Convention Pluginsパターンを使えば、共通の設定をbuildSrcにプラグインとして定義し、各モジュールのbuild.gradle.ktsで適用するだけで統一された設定を維持できます。Version Catalogを使えば依存関係のバージョン管理も一元化でき、大規模プロジェクトの保守性が大幅に向上します。",
        code: `// gradle/libs.versions.toml（Version Catalog）
// [versions]
// kotlin = "1.9.21"
// ktor = "2.3.7"
// kotest = "5.8.0"
// coroutines = "1.7.3"
//
// [libraries]
// kotlin-stdlib = { module = "org.jetbrains.kotlin:kotlin-stdlib",
//                    version.ref = "kotlin" }
// ktor-server-core = { module = "io.ktor:ktor-server-core",
//                       version.ref = "ktor" }
// ktor-server-netty = { module = "io.ktor:ktor-server-netty",
//                        version.ref = "ktor" }
// coroutines-core = { module = "org.jetbrains.kotlinx:kotlinx-coroutines-core",
//                      version.ref = "coroutines" }
// kotest-runner = { module = "io.kotest:kotest-runner-junit5",
//                    version.ref = "kotest" }
//
// [bundles]
// ktor-server = ["ktor-server-core", "ktor-server-netty"]
//
// [plugins]
// kotlin-jvm = { id = "org.jetbrains.kotlin.jvm", version.ref = "kotlin" }

// buildSrc/src/main/kotlin/kotlin-common-conventions.gradle.kts
// Convention Plugin: Kotlinの共通設定
plugins {
    kotlin("jvm")
}

group = "com.example"

repositories {
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    testImplementation(kotlin("test"))
}

kotlin {
    jvmToolchain(17)
}

tasks.test {
    useJUnitPlatform()
}

// buildSrc/src/main/kotlin/ktor-app-conventions.gradle.kts
// Convention Plugin: Ktorアプリ共通設定
plugins {
    id("kotlin-common-conventions")
    application
}

dependencies {
    // Version Catalog から取得
    implementation(libs.ktor.server.core)
    implementation(libs.ktor.server.netty)
    implementation(libs.coroutines.core)
    testImplementation(libs.kotest.runner)
}

// 各サブプロジェクトでの使用
// app/build.gradle.kts
plugins {
    id("ktor-app-conventions")
}

application {
    mainClass.set("com.example.app.MainKt")
}

dependencies {
    implementation(project(":core"))
    implementation(project(":api"))
}

// core/build.gradle.kts
plugins {
    id("kotlin-common-conventions")
}

// settings.gradle.kts
// rootProject.name = "my-kotlin-project"
// include("app", "core", "api", "shared")
//
// dependencyResolutionManagement {
//     versionCatalogs {
//         create("libs") {
//             from(files("gradle/libs.versions.toml"))
//         }
//     }
// }`,
      },
    ],
  },
  {
    id: "functional",
    title: "関数型プログラミング",
    category: "features",
    description:
      "不変性、Arrow ライブラリ、モナド、関数合成、パターンマッチングなど、Kotlinでの関数型プログラミング手法を体系的に学ぶ",
    sections: [
      {
        title: "不変性とイミュータブルデータ",
        content:
          "関数型プログラミングの基盤は不変性（Immutability）です。Kotlinではval、不変コレクション（List, Set, Map）、data classのcopyメソッドにより、イミュータブルなデータ操作を言語レベルでサポートしています。不変データは副作用がなく、並行処理での安全性が保証され、テストやデバッグが容易になります。深いネストのデータ構造を更新するにはcopyを連鎖させるか、レンズ（Lens）パターンを使います。",
        code: `// data class は不変データの基本
data class Address(val city: String, val street: String)
data class User(
    val name: String,
    val age: Int,
    val address: Address,
    val tags: List<String>
)

// copy() でイミュータブルな更新
val user = User("田中", 30, Address("東京", "渋谷1-1"), listOf("kotlin", "java"))

// 名前だけ変更した新しいオブジェクト（元のuserは変更されない）
val renamed = user.copy(name = "山田")

// ネストしたプロパティの更新
val moved = user.copy(address = user.address.copy(city = "大阪"))

// コレクションのイミュータブル操作
val original = listOf(1, 2, 3)
val added = original + 4           // [1, 2, 3, 4] 新しいリスト
val removed = original - 2         // [1, 3] 新しいリスト
val mapped = original.map { it * 2 }  // [2, 4, 6] 新しいリスト

// イミュータブルなMap操作
val config = mapOf("host" to "localhost", "port" to "8080")
val updated = config + ("port" to "3000")  // portを上書きした新しいMap
val withNew = config + ("debug" to "true") // 追加した新しいMap

// シンプルなLensパターン
data class Lens<S, A>(
    val get: (S) -> A,
    val set: (S, A) -> S
)

// User -> Address のレンズ
val userAddress = Lens<User, Address>(
    get = { it.address },
    set = { user, address -> user.copy(address = address) }
)

// Address -> city のレンズ
val addressCity = Lens<Address, String>(
    get = { it.city },
    set = { address, city -> address.copy(city = city) }
)

// レンズの合成
fun <S, A, B> Lens<S, A>.compose(other: Lens<A, B>): Lens<S, B> = Lens(
    get = { s -> other.get(this.get(s)) },
    set = { s, b -> this.set(s, other.set(this.get(s), b)) }
)

val userCity = userAddress.compose(addressCity)
val updatedUser = userCity.set(user, "福岡")
println(updatedUser.address.city)  // 福岡`,
      },
      {
        title: "Arrow ライブラリ",
        content:
          "Arrowは Kotlin向けの関数型プログラミングライブラリで、Either、Option、Validated、IOなどの関数型データ型を提供します。Arrow 1.x系では関数型プログラミングの概念をKotlinのコルーチンと自然に統合し、型安全なエラーハンドリングや副作用の管理を可能にします。Raised DSLを使えば、命令的なスタイルで関数型のエラーハンドリングを記述でき、学習コストを抑えながら関数型の恩恵を受けられます。",
        code: `import arrow.core.*
import arrow.core.raise.*

// Option: nullの代替
fun findUser(id: Int): Option<String> {
    val users = mapOf(1 to "田中", 2 to "山田", 3 to "佐藤")
    return users[id].toOption()
}

val user1 = findUser(1)  // Some("田中")
val user9 = findUser(9)  // None

// Option のチェーン操作
val greeting = findUser(1)
    .map { name -> "こんにちは、\${name}さん" }
    .getOrElse { "ゲストさん、こんにちは" }
println(greeting)  // こんにちは、田中さん

// Either: 型安全なエラーハンドリング
sealed class AppError {
    data class NotFound(val id: Int) : AppError()
    data class Validation(val field: String, val message: String) : AppError()
    data class Unauthorized(val reason: String) : AppError()
}

data class UserProfile(val id: Int, val name: String, val email: String)

fun fetchUser(id: Int): Either<AppError, UserProfile> {
    return if (id > 0) {
        UserProfile(id, "ユーザー\$id", "user\$id@example.com").right()
    } else {
        AppError.Validation("id", "IDは正の数である必要があります").left()
    }
}

// Either のチェーン
val result = fetchUser(1)
    .map { it.name }
    .flatMap { name ->
        if (name.isNotBlank()) name.right()
        else AppError.Validation("name", "名前が空です").left()
    }
    .fold(
        ifLeft = { "エラー: \$it" },
        ifRight = { "成功: \$it" }
    )
println(result)  // 成功: ユーザー1

// Raise DSL（Arrow 1.2+）: 命令的スタイルで関数型エラーハンドリング
fun Raise<AppError>.processOrder(userId: Int, amount: Int): String {
    // ensure: 条件を満たさない場合はエラーを raise
    ensure(amount > 0) {
        AppError.Validation("amount", "金額は正の数である必要があります")
    }

    // bind(): Either から値を取り出す（失敗時は自動的に raise）
    val user = fetchUser(userId).bind()

    return "注文完了: \${user.name}, 金額: \${amount}円"
}

// Raise DSL の実行
val orderResult: Either<AppError, String> = either {
    processOrder(1, 5000)
}
println(orderResult)  // Right(注文完了: ユーザー1, 金額: 5000円)`,
      },
      {
        title: "モナド（Option / Either）",
        content:
          "モナドは値をコンテキスト（成功/失敗、存在/不在など）で包み、そのコンテキストを維持しながら処理をチェーンするデザインパターンです。KotlinではOption（値の有無）やEither（成功/失敗）が代表的なモナドです。flatMap（bind）により、モナド内の値を取り出して別のモナドを返す関数に渡す連鎖が可能です。これにより、null チェックの連鎖やtry/catchのネストを排除し、読みやすいコードを書けます。",
        code: `// モナドの本質: flatMap による処理の連鎖

// Option モナドの実装
sealed class Maybe<out T> {
    data class Just<T>(val value: T) : Maybe<T>()
    data object Empty : Maybe<Nothing>()

    fun <R> map(transform: (T) -> R): Maybe<R> = when (this) {
        is Just -> Just(transform(value))
        is Empty -> Empty
    }

    fun <R> flatMap(transform: (T) -> Maybe<R>): Maybe<R> = when (this) {
        is Just -> transform(value)
        is Empty -> Empty
    }

    fun getOrElse(default: () -> T): T = when (this) {
        is Just -> value
        is Empty -> default()
    }
}

// 実用例: DB検索の連鎖（null チェック地獄を解消）
data class Company(val name: String, val ceoId: Int?)
data class Employee(val name: String, val departmentId: Int?)
data class Department(val name: String)

fun findCompany(id: Int): Maybe<Company> =
    if (id == 1) Maybe.Just(Company("TechCorp", 100))
    else Maybe.Empty

fun findEmployee(id: Int): Maybe<Employee> =
    if (id == 100) Maybe.Just(Employee("田中CEO", 10))
    else Maybe.Empty

fun findDepartment(id: Int): Maybe<Department> =
    if (id == 10) Maybe.Just(Department("経営企画部"))
    else Maybe.Empty

// flatMap で安全にチェーン
val departmentName = findCompany(1)
    .flatMap { company ->
        company.ceoId?.let { findEmployee(it) } ?: Maybe.Empty
    }
    .flatMap { employee ->
        employee.departmentId?.let { findDepartment(it) } ?: Maybe.Empty
    }
    .map { it.name }
    .getOrElse { "不明" }

println(departmentName)  // 経営企画部

// Either モナドの for-comprehension 風パターン
sealed class Result<out E, out T> {
    data class Ok<T>(val value: T) : Result<Nothing, T>()
    data class Err<E>(val error: E) : Result<E, Nothing>()

    fun <R> map(f: (T) -> R): Result<E, R> = when (this) {
        is Ok -> Ok(f(value))
        is Err -> this
    }

    fun <R> flatMap(f: (T) -> Result<@UnsafeVariance E, R>): Result<E, R> =
        when (this) {
            is Ok -> f(value)
            is Err -> this
        }
}

// バリデーションの連鎖
fun validateName(name: String): Result<String, String> =
    if (name.isNotBlank()) Result.Ok(name)
    else Result.Err("名前は必須です")

fun validateAge(age: Int): Result<String, Int> =
    if (age in 0..150) Result.Ok(age)
    else Result.Err("年齢が範囲外です")

data class ValidUser(val name: String, val age: Int)

fun createValidUser(name: String, age: Int): Result<String, ValidUser> =
    validateName(name).flatMap { validName ->
        validateAge(age).map { validAge ->
            ValidUser(validName, validAge)
        }
    }

println(createValidUser("太郎", 25))   // Ok(ValidUser(太郎, 25))
println(createValidUser("", 25))       // Err(名前は必須です)`,
      },
      {
        title: "関数合成",
        content:
          "関数合成とは、複数の小さな関数を組み合わせて新しい関数を作るテクニックです。Kotlinでは中置関数やoperator overloadを使って関数合成演算子を定義できます。andThen（f の後に g を適用）とcompose（g の後に f を適用）が基本的な合成操作です。関数合成により、データ変換パイプラインを宣言的に構築でき、各ステップを独立してテスト・再利用できるようになります。",
        code: `// 関数合成の基本演算子を定義
infix fun <A, B, C> ((A) -> B).andThen(g: (B) -> C): (A) -> C =
    { a -> g(this(a)) }

infix fun <A, B, C> ((B) -> C).compose(g: (A) -> B): (A) -> C =
    { a -> this(g(a)) }

// 基本的な関数合成
val double: (Int) -> Int = { it * 2 }
val addOne: (Int) -> Int = { it + 1 }
val square: (Int) -> Int = { it * it }

// double してから addOne する
val doubleAndAddOne = double andThen addOne
println(doubleAndAddOne(5))  // 11 = (5 * 2) + 1

// square してから double する
val squareThenDouble = double compose square
println(squareThenDouble(3))  // 18 = (3^2) * 2

// 3つ以上の合成
val pipeline = double andThen addOne andThen square
println(pipeline(3))  // 49 = ((3*2)+1)^2

// 実用例: テキスト処理パイプライン
val trim: (String) -> String = { it.trim() }
val lowercase: (String) -> String = { it.lowercase() }
val removeSpaces: (String) -> String = { it.replace("\\s+".toRegex(), "-") }
val truncate: (String) -> String = { it.take(50) }

// URLスラッグ生成パイプライン
val toSlug = trim andThen lowercase andThen removeSpaces andThen truncate
println(toSlug("  Hello World Kotlin  "))  // hello-world-kotlin

// パイプライン演算子（|> 風）
infix fun <A, B> A.pipe(f: (A) -> B): B = f(this)

val result = "  Hello World  " pipe trim pipe lowercase pipe removeSpaces
println(result)  // hello-world

// 実用例: データ変換パイプライン
data class RawOrder(val items: List<String>, val quantities: List<Int>)
data class OrderLine(val item: String, val quantity: Int, val total: Int)

val prices = mapOf("りんご" to 100, "バナナ" to 200, "みかん" to 150)

val parseOrder: (RawOrder) -> List<Pair<String, Int>> = { order ->
    order.items.zip(order.quantities)
}

val calculateTotals: (List<Pair<String, Int>>) -> List<OrderLine> = { items ->
    items.map { (item, qty) ->
        val price = prices[item] ?: 0
        OrderLine(item, qty, price * qty)
    }
}

val filterPositive: (List<OrderLine>) -> List<OrderLine> = { lines ->
    lines.filter { it.total > 0 }
}

val formatSummary: (List<OrderLine>) -> String = { lines ->
    val total = lines.sumOf { it.total }
    lines.joinToString("\\n") {
        "  \${it.item} x\${it.quantity} = \${it.total}円"
    } + "\\n合計: \${total}円"
}

// パイプラインの合成
val processOrder = parseOrder andThen calculateTotals andThen
    filterPositive andThen formatSummary

val order = RawOrder(
    items = listOf("りんご", "バナナ", "みかん"),
    quantities = listOf(3, 2, 5)
)
println(processOrder(order))`,
      },
      {
        title: "パターンマッチング（when + sealed）",
        content:
          "Kotlinのwhen式とsealed class/interfaceを組み合わせると、関数型言語のパターンマッチングに近い表現力を得られます。sealed型により取り得る状態を網羅的に列挙でき、when式でコンパイル時に全ケースの処理が保証されます。分解宣言（destructuring）を活用すれば、マッチした値のプロパティに直接アクセスでき、ガード条件と組み合わせた高度なパターンも記述できます。再帰的なデータ構造の処理にも適しています。",
        code: `// 数式を表す再帰的データ構造（AST: 抽象構文木）
sealed interface Expr {
    data class Num(val value: Double) : Expr
    data class Add(val left: Expr, val right: Expr) : Expr
    data class Mul(val left: Expr, val right: Expr) : Expr
    data class Neg(val expr: Expr) : Expr
    data class Var(val name: String) : Expr
}

// パターンマッチングによる評価
fun eval(expr: Expr, env: Map<String, Double> = emptyMap()): Double =
    when (expr) {
        is Expr.Num -> expr.value
        is Expr.Add -> eval(expr.left, env) + eval(expr.right, env)
        is Expr.Mul -> eval(expr.left, env) * eval(expr.right, env)
        is Expr.Neg -> -eval(expr.expr, env)
        is Expr.Var -> env[expr.name]
            ?: error("未定義の変数: \${expr.name}")
    }

// パターンマッチングによる文字列表現
fun show(expr: Expr): String = when (expr) {
    is Expr.Num -> expr.value.toString()
    is Expr.Add -> "(\${show(expr.left)} + \${show(expr.right)})"
    is Expr.Mul -> "(\${show(expr.left)} * \${show(expr.right)})"
    is Expr.Neg -> "(-\${show(expr.expr)})"
    is Expr.Var -> expr.name
}

// 最適化（定数畳み込み）
fun optimize(expr: Expr): Expr = when (expr) {
    is Expr.Add -> {
        val l = optimize(expr.left)
        val r = optimize(expr.right)
        when {
            l is Expr.Num && l.value == 0.0 -> r
            r is Expr.Num && r.value == 0.0 -> l
            l is Expr.Num && r is Expr.Num ->
                Expr.Num(l.value + r.value)
            else -> Expr.Add(l, r)
        }
    }
    is Expr.Mul -> {
        val l = optimize(expr.left)
        val r = optimize(expr.right)
        when {
            l is Expr.Num && l.value == 0.0 -> Expr.Num(0.0)
            r is Expr.Num && r.value == 0.0 -> Expr.Num(0.0)
            l is Expr.Num && l.value == 1.0 -> r
            r is Expr.Num && r.value == 1.0 -> l
            else -> Expr.Mul(l, r)
        }
    }
    is Expr.Neg -> when (val inner = optimize(expr.expr)) {
        is Expr.Neg -> inner.expr  // 二重否定の除去
        is Expr.Num -> Expr.Num(-inner.value)
        else -> Expr.Neg(inner)
    }
    is Expr.Num, is Expr.Var -> expr
}

// 使用例
val expr = Expr.Add(
    Expr.Mul(Expr.Num(2.0), Expr.Var("x")),
    Expr.Add(Expr.Num(3.0), Expr.Num(4.0))
)

val env = mapOf("x" to 5.0)
println(show(expr))            // ((2.0 * x) + (3.0 + 4.0))
println(eval(expr, env))       // 17.0
println(show(optimize(expr)))  // ((2.0 * x) + 7.0)

// 状態管理のパターンマッチング
sealed class UiState<out T> {
    data object Loading : UiState<Nothing>()
    data class Success<T>(val data: T) : UiState<T>()
    data class Error(val message: String, val retry: () -> Unit) : UiState<Nothing>()
    data object Empty : UiState<Nothing>()
}

fun <T> renderState(state: UiState<T>, render: (T) -> String): String =
    when (state) {
        is UiState.Loading -> "読み込み中..."
        is UiState.Success -> render(state.data)
        is UiState.Error -> "エラー: \${state.message}"
        is UiState.Empty -> "データがありません"
    }`,
      },
    ],
  },
  {
    id: "concurrency-patterns",
    title: "並行処理パターン",
    category: "practice",
    description:
      "Channel、SharedFlow/StateFlow、Mutex/Semaphore、アクターモデル、構造化並行性など、Kotlinコルーチンを活用した実践的な並行処理パターンを学ぶ",
    sections: [
      {
        title: "Channel",
        content:
          "ChannelはKotlinコルーチン間でデータを安全にやり取りするための通信プリミティブです。GoのChannelに似た概念で、送信側（send）と受信側（receive）がサスペンドしながらデータを受け渡します。Channelには容量（バッファ）を指定でき、RENDEZVOUS（バッファなし）、BUFFERED、CONFLATED（最新値のみ保持）、UNLIMITED の4種類があります。produce ビルダーを使えば、Channel をコルーチンと組み合わせたプロデューサーを簡潔に書けます。",
        code: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// 基本的な Channel の使い方
suspend fun basicChannel() = coroutineScope {
    val channel = Channel<Int>(capacity = 5)  // バッファ付きChannel

    // プロデューサー
    launch {
        for (i in 1..10) {
            println("送信: \$i")
            channel.send(i)
            delay(100)
        }
        channel.close()  // 送信完了を通知
    }

    // コンシューマー
    launch {
        for (value in channel) {  // close() まで繰り返す
            println("受信: \$value")
            delay(200)  // 処理に時間がかかる
        }
        println("全て受信完了")
    }
}

// produce ビルダーでプロデューサーを作成
fun CoroutineScope.generateNumbers(max: Int): ReceiveChannel<Int> = produce {
    for (i in 1..max) {
        send(i)
        delay(100)
    }
}

// パイプラインパターン（Channel の連鎖）
fun CoroutineScope.square(numbers: ReceiveChannel<Int>): ReceiveChannel<Int> =
    produce {
        for (n in numbers) {
            send(n * n)
        }
    }

fun CoroutineScope.filter(
    numbers: ReceiveChannel<Int>,
    predicate: (Int) -> Boolean
): ReceiveChannel<Int> = produce {
    for (n in numbers) {
        if (predicate(n)) send(n)
    }
}

suspend fun pipelineExample() = coroutineScope {
    val numbers = generateNumbers(20)
    val squared = square(numbers)
    val filtered = filter(squared) { it > 50 }

    for (value in filtered) {
        println("結果: \$value")
    }
}

// Fan-out: 複数のワーカーで並列処理
suspend fun fanOutExample() = coroutineScope {
    val tasks = Channel<String>(capacity = 100)

    // タスクの投入
    launch {
        val jobs = listOf("レポート生成", "メール送信", "データ集計",
            "バックアップ", "通知処理", "ログ解析")
        jobs.forEach { tasks.send(it) }
        tasks.close()
    }

    // 3つのワーカーで並列処理
    repeat(3) { workerId ->
        launch {
            for (task in tasks) {
                println("ワーカー\$workerId: \$task 処理中")
                delay((100L..500L).random())
                println("ワーカー\$workerId: \$task 完了")
            }
        }
    }
}`,
      },
      {
        title: "SharedFlow / StateFlow",
        content:
          "SharedFlowとStateFlowはKotlinのホットFlowで、複数のコレクターにデータをブロードキャストします。StateFlowは常に最新の状態を保持し、UIの状態管理に最適です。SharedFlowはイベントの配信に使い、replayキャッシュや追加のバッファを設定できます。MutableStateFlowのvalueプロパティでスレッドセーフに状態を更新でき、updateメソッドでアトミックな更新も可能です。collectはsuspend関数なので、コルーチン内で自然に使えます。",
        code: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// StateFlow: 状態管理
class CounterViewModel {
    // 内部は Mutable、外部には読み取り専用を公開
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()

    private val _uiState = MutableStateFlow<UiState>(UiState.Idle)
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    sealed class UiState {
        data object Idle : UiState()
        data object Loading : UiState()
        data class Success(val message: String) : UiState()
        data class Error(val error: String) : UiState()
    }

    fun increment() {
        _count.update { it + 1 }  // アトミックな更新
    }

    suspend fun loadData() {
        _uiState.value = UiState.Loading
        try {
            delay(1000)  // API呼び出しのシミュレーション
            _uiState.value = UiState.Success("データ読み込み完了")
        } catch (e: Exception) {
            _uiState.value = UiState.Error(e.message ?: "不明なエラー")
        }
    }
}

// SharedFlow: イベントの配信
class EventBus {
    private val _events = MutableSharedFlow<AppEvent>(
        replay = 0,          // リプレイキャッシュなし
        extraBufferCapacity = 64,  // バッファ
        onBufferOverflow = BufferOverflow.DROP_OLDEST
    )
    val events: SharedFlow<AppEvent> = _events.asSharedFlow()

    sealed class AppEvent {
        data class UserLoggedIn(val userId: Int) : AppEvent()
        data class OrderPlaced(val orderId: String) : AppEvent()
        data class NotificationReceived(val message: String) : AppEvent()
    }

    suspend fun emit(event: AppEvent) {
        _events.emit(event)
    }
}

// 使用例
suspend fun stateFlowExample() = coroutineScope {
    val viewModel = CounterViewModel()

    // 状態の監視
    val job = launch {
        viewModel.uiState.collect { state ->
            when (state) {
                is CounterViewModel.UiState.Idle ->
                    println("待機中")
                is CounterViewModel.UiState.Loading ->
                    println("読み込み中...")
                is CounterViewModel.UiState.Success ->
                    println("成功: \${state.message}")
                is CounterViewModel.UiState.Error ->
                    println("エラー: \${state.error}")
            }
        }
    }

    viewModel.loadData()
    delay(1500)
    job.cancel()
}

// SharedFlow のイベント処理
suspend fun eventBusExample() = coroutineScope {
    val bus = EventBus()

    // 複数のサブスクライバー
    launch {
        bus.events
            .filterIsInstance<EventBus.AppEvent.OrderPlaced>()
            .collect { println("注文処理: \${it.orderId}") }
    }

    launch {
        bus.events.collect { println("ログ: \$it") }
    }

    delay(100)
    bus.emit(EventBus.AppEvent.UserLoggedIn(1))
    bus.emit(EventBus.AppEvent.OrderPlaced("ORD-001"))
    delay(500)
    coroutineContext.cancelChildren()
}`,
      },
      {
        title: "Mutex / Semaphore",
        content:
          "コルーチンでの排他制御にはMutexを使います。JavaのsynchronizedやReentrantLockとは異なり、Mutexはスレッドをブロックせずサスペンドするため、コルーチンとの相性が良いです。withLockブロックで安全にクリティカルセクションを保護できます。Semaphoreは同時実行数を制限するために使い、外部API呼び出しのレート制限やリソースプールの管理に有効です。AtomicIntegerやatomicfu も並行性制御の選択肢です。",
        code: `import kotlinx.coroutines.*
import kotlinx.coroutines.sync.*
import java.util.concurrent.atomic.AtomicInteger

// Mutex: 排他制御
class BankAccount(initialBalance: Int) {
    private var balance = initialBalance
    private val mutex = Mutex()

    suspend fun transfer(amount: Int): Boolean = mutex.withLock {
        if (balance >= amount) {
            delay(10)  // 処理のシミュレーション
            balance -= amount
            println("出金: \${amount}円, 残高: \${balance}円")
            true
        } else {
            println("残高不足: 残高\${balance}円 < \${amount}円")
            false
        }
    }

    suspend fun deposit(amount: Int) = mutex.withLock {
        delay(10)
        balance += amount
        println("入金: \${amount}円, 残高: \${balance}円")
    }

    suspend fun getBalance(): Int = mutex.withLock { balance }
}

// Mutex を使った安全な並行処理
suspend fun mutexExample() = coroutineScope {
    val account = BankAccount(10000)

    // 100個の並行出金
    val jobs = (1..100).map {
        launch {
            account.transfer(100)
        }
    }
    jobs.joinAll()

    println("最終残高: \${account.getBalance()}円")  // 正確に0円
}

// Semaphore: 同時実行数の制限
class RateLimitedApiClient(maxConcurrent: Int = 5) {
    private val semaphore = Semaphore(maxConcurrent)
    private val requestCount = AtomicInteger(0)

    suspend fun <T> request(
        endpoint: String,
        block: suspend () -> T
    ): T {
        return semaphore.withPermit {
            val current = requestCount.incrementAndGet()
            println("API呼び出し開始: \$endpoint " +
                "(並行数: \$current)")
            try {
                block()
            } finally {
                requestCount.decrementAndGet()
            }
        }
    }
}

// Semaphore の使用例
suspend fun semaphoreExample() = coroutineScope {
    val client = RateLimitedApiClient(maxConcurrent = 3)

    // 10個のリクエストを同時実行（最大3並行）
    val results = (1..10).map { id ->
        async {
            client.request("/api/users/\$id") {
                delay((100L..500L).random())  // API処理のシミュレーション
                "ユーザー\$id のデータ"
            }
        }
    }.awaitAll()

    println("取得完了: \${results.size}件")
}

// スレッドセーフなキャッシュ
class CoroutineCache<K, V> {
    private val cache = mutableMapOf<K, V>()
    private val mutex = Mutex()

    suspend fun getOrPut(key: K, compute: suspend () -> V): V {
        // 楽観的読み取り
        mutex.withLock { cache[key] }?.let { return it }

        // キャッシュミス時は計算して格納
        val value = compute()
        mutex.withLock {
            cache.getOrPut(key) { value }
        }
        return value
    }

    suspend fun invalidate(key: K) = mutex.withLock {
        cache.remove(key)
    }

    suspend fun size(): Int = mutex.withLock { cache.size }
}`,
      },
      {
        title: "アクターモデル",
        content:
          "アクターモデルは、状態を持つオブジェクトがメッセージを受信して処理する並行処理パターンです。各アクターは自身の状態を外部に公開せず、メッセージ（Channel経由）でのみ通信します。これにより、共有状態へのロックが不要になり、デッドロックのリスクを排除できます。Kotlinではコルーチン + Channel + sealed classでアクターパターンを実装でき、状態マシンの構築に適しています。",
        code: `import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

// アクターへのメッセージを定義
sealed class CartMessage {
    data class AddItem(
        val productId: String,
        val name: String,
        val price: Int,
        val quantity: Int
    ) : CartMessage()

    data class RemoveItem(val productId: String) : CartMessage()

    data class UpdateQuantity(
        val productId: String,
        val quantity: Int
    ) : CartMessage()

    data class GetTotal(
        val response: CompletableDeferred<Int>
    ) : CartMessage()

    data class GetItems(
        val response: CompletableDeferred<List<CartItem>>
    ) : CartMessage()

    data object Clear : CartMessage()
}

data class CartItem(
    val productId: String,
    val name: String,
    val price: Int,
    val quantity: Int
) {
    val subtotal: Int get() = price * quantity
}

// アクターの実装
fun CoroutineScope.shoppingCartActor(): Channel<CartMessage> {
    val channel = Channel<CartMessage>()

    launch {
        // アクターのローカル状態（外部からアクセス不可）
        val items = mutableMapOf<String, CartItem>()

        for (msg in channel) {
            when (msg) {
                is CartMessage.AddItem -> {
                    val existing = items[msg.productId]
                    items[msg.productId] = if (existing != null) {
                        existing.copy(
                            quantity = existing.quantity + msg.quantity
                        )
                    } else {
                        CartItem(msg.productId, msg.name,
                            msg.price, msg.quantity)
                    }
                    println("追加: \${msg.name} x\${msg.quantity}")
                }

                is CartMessage.RemoveItem -> {
                    val removed = items.remove(msg.productId)
                    println("削除: \${removed?.name ?: "不明"}")
                }

                is CartMessage.UpdateQuantity -> {
                    items[msg.productId]?.let {
                        items[msg.productId] = it.copy(
                            quantity = msg.quantity
                        )
                    }
                }

                is CartMessage.GetTotal -> {
                    val total = items.values.sumOf { it.subtotal }
                    msg.response.complete(total)
                }

                is CartMessage.GetItems -> {
                    msg.response.complete(items.values.toList())
                }

                CartMessage.Clear -> {
                    items.clear()
                    println("カートをクリアしました")
                }
            }
        }
    }

    return channel
}

// アクターの使用例
suspend fun actorExample() = coroutineScope {
    val cart = shoppingCartActor()

    // 商品を追加
    cart.send(CartMessage.AddItem("P001", "Kotlin入門書", 3000, 1))
    cart.send(CartMessage.AddItem("P002", "ノートPC", 150000, 1))
    cart.send(CartMessage.AddItem("P001", "Kotlin入門書", 3000, 2))

    // 合計を取得（リクエスト/レスポンスパターン）
    val totalDeferred = CompletableDeferred<Int>()
    cart.send(CartMessage.GetTotal(totalDeferred))
    println("合計: \${totalDeferred.await()}円")  // 159000円

    // 商品一覧を取得
    val itemsDeferred = CompletableDeferred<List<CartItem>>()
    cart.send(CartMessage.GetItems(itemsDeferred))
    itemsDeferred.await().forEach {
        println("  \${it.name}: \${it.price}円 x \${it.quantity}")
    }

    cart.close()
}`,
      },
      {
        title: "構造化並行性（Structured Concurrency）",
        content:
          "構造化並行性はKotlinコルーチンの中核概念で、すべてのコルーチンが明確なスコープ内で管理されることを保証します。親コルーチンは子コルーチンの完了を待ち、子が失敗すれば親もキャンセルされ、親がキャンセルされれば全ての子もキャンセルされます。これによりリソースリークや孤立したコルーチンを防ぎます。coroutineScope、supervisorScope、withContextを使い分けることで、適切なエラー伝播とキャンセルポリシーを設計できます。",
        code: `import kotlinx.coroutines.*

// coroutineScope: 子の失敗で全体がキャンセルされる
suspend fun fetchDashboardData(): DashboardData = coroutineScope {
    // 全APIを並列で呼び出し
    val userDeferred = async { fetchUserProfile() }
    val ordersDeferred = async { fetchRecentOrders() }
    val statsDeferred = async { fetchStatistics() }

    // 全て揃うまで待機（1つでも失敗すれば他もキャンセル）
    DashboardData(
        user = userDeferred.await(),
        orders = ordersDeferred.await(),
        stats = statsDeferred.await()
    )
}

data class DashboardData(
    val user: String,
    val orders: List<String>,
    val stats: Map<String, Int>
)

suspend fun fetchUserProfile(): String {
    delay(500)
    return "田中太郎"
}
suspend fun fetchRecentOrders(): List<String> {
    delay(800)
    return listOf("注文1", "注文2")
}
suspend fun fetchStatistics(): Map<String, Int> {
    delay(600)
    return mapOf("total" to 100, "thisMonth" to 15)
}

// supervisorScope: 子の失敗が他の子に影響しない
suspend fun sendNotifications(
    userIds: List<Int>
): Map<Int, Result<String>> = supervisorScope {
    userIds.map { userId ->
        userId to async {
            runCatching {
                sendNotification(userId)
            }
        }
    }.associate { (id, deferred) ->
        id to deferred.await()
    }
}

suspend fun sendNotification(userId: Int): String {
    delay(100)
    if (userId == 3) throw RuntimeException("ユーザー\$userId: 送信失敗")
    return "ユーザー\$userId: 送信成功"
}

// タイムアウト付きの並行処理
suspend fun fetchWithTimeout() {
    // withTimeout: タイムアウトで例外
    try {
        val result = withTimeout(3000) {
            fetchSlowData()
        }
        println("結果: \$result")
    } catch (e: TimeoutCancellationException) {
        println("タイムアウト: \${e.message}")
    }

    // withTimeoutOrNull: タイムアウトで null
    val result = withTimeoutOrNull(1000) {
        fetchSlowData()
    }
    println("結果: \${result ?: "タイムアウト（デフォルト値を使用）"}")
}

suspend fun fetchSlowData(): String {
    delay(2000)
    return "遅いデータ"
}

// 実践的なパターン: 並行処理ユーティリティ
suspend fun <T, R> Iterable<T>.parallelMap(
    concurrency: Int = 10,
    transform: suspend (T) -> R
): List<R> = coroutineScope {
    val semaphore = kotlinx.coroutines.sync.Semaphore(concurrency)
    map { item ->
        async {
            semaphore.withPermit {
                transform(item)
            }
        }
    }.awaitAll()
}

// 使用例
suspend fun parallelExample() = coroutineScope {
    val userIds = (1..100).toList()

    // 最大10並行でユーザーデータを取得
    val users = userIds.parallelMap(concurrency = 10) { id ->
        delay(100)  // API呼び出しのシミュレーション
        "ユーザー\$id"
    }
    println("取得完了: \${users.size}件")

    // レース: 最初に完了した結果を使う
    suspend fun <T> raceOf(vararg blocks: suspend () -> T): T =
        coroutineScope {
            select {
                blocks.forEach { block ->
                    async { block() }.onAwait { it }
                }
            }.also { coroutineContext.cancelChildren() }
        }

    val fastest = raceOf(
        { delay(300); "サーバーA" },
        { delay(100); "サーバーB" },
        { delay(200); "サーバーC" }
    )
    println("最速: \$fastest")  // サーバーB
}`,
      },
    ],
  },

];

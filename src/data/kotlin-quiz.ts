export type KotlinLevel = "basics" | "features" | "practice";

export interface KotlinQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: KotlinLevel;
  chapter: string;
}

export const kotlinQuizQuestions: KotlinQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: Kotlin基本文法 (kotlin-basics) 5問
  // ════════════════════════════════════════
  {
    id: "kotlin-basics-q01",
    question: "Kotlinでvalとvarの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "valは再代入可能、varは再代入不可" },
      { label: "B", text: "valは再代入不可（読み取り専用）、varは再代入可能" },
      { label: "C", text: "valはプリミティブ型専用、varは参照型専用" },
      { label: "D", text: "両者に違いはなく互換性がある" },
    ],
    correctLabel: "B",
    explanation:
      "valはJavaのfinalに相当し、一度代入すると再代入できません（読み取り専用）。varは再代入可能な変数です。Kotlinでは不変性を推奨するため、可能な限りvalを使うことがベストプラクティスです。",
    level: "basics",
    chapter: "kotlin-basics",
  },
  {
    id: "kotlin-basics-q02",
    question: "次のKotlinコードの出力は何ですか？",
    choices: [
      { label: "A", text: "Hello null" },
      { label: "B", text: "Hello " },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "NullPointerException" },
    ],
    correctLabel: "C",
    explanation:
      "Kotlinではnull安全が言語レベルでサポートされています。String型はnullを許容しません。nullを代入するにはString?型（Nullable型）にする必要があります。これによりコンパイル時にNullPointerExceptionを防止できます。",
    code: "val name: String = null\nprintln(\"Hello \$name\")",
    level: "basics",
    chapter: "kotlin-basics",
  },
  {
    id: "kotlin-basics-q03",
    question: "Kotlinのwhen式について正しい説明はどれですか？",
    choices: [
      { label: "A", text: "Javaのswitch文と完全に同じ機能である" },
      { label: "B", text: "整数型のみ使用できる" },
      { label: "C", text: "式として値を返すことができ、任意の型で分岐できる" },
      { label: "D", text: "elseブランチは省略できない" },
    ],
    correctLabel: "C",
    explanation:
      "whenはJavaのswitch文の強化版です。式として値を返せるため変数に代入でき、任意の型や条件式で分岐できます。elseブランチは、whenを式として使い全パターンを網羅できない場合に必須です。文として使う場合は省略可能です。",
    code: "val result = when (x) {\n    is String -> \"文字列です\"\n    is Int -> \"整数です\"\n    else -> \"その他\"\n}",
    level: "basics",
    chapter: "kotlin-basics",
  },
  {
    id: "kotlin-basics-q04",
    question: "Kotlinのデータクラスが自動生成するメソッドとして含まれないものはどれですか？",
    choices: [
      { label: "A", text: "equals() / hashCode()" },
      { label: "B", text: "toString()" },
      { label: "C", text: "copy()" },
      { label: "D", text: "toJson()" },
    ],
    correctLabel: "D",
    explanation:
      "data classはequals()、hashCode()、toString()、copy()、componentN()関数を自動生成します。toJson()は自動生成されません。JSON変換にはGsonやKotlinx.serializationなどの外部ライブラリが必要です。",
    code: "data class User(val name: String, val age: Int)",
    level: "basics",
    chapter: "kotlin-basics",
  },
  {
    id: "kotlin-basics-q05",
    question: "Kotlinの拡張関数について正しい説明はどれですか？",
    choices: [
      { label: "A", text: "既存クラスのソースコードを変更してメソッドを追加する" },
      { label: "B", text: "クラスを継承せずに新しい関数を追加できる" },
      { label: "C", text: "privateメンバーにアクセスできる" },
      { label: "D", text: "Javaから呼び出すことはできない" },
    ],
    correctLabel: "B",
    explanation:
      "拡張関数はクラスの継承やソースコード変更なしに、既存クラスに新しい関数を追加する機能です。ただしクラスのprivateメンバーにはアクセスできません。Javaからは静的メソッドとして呼び出せます。",
    code: "fun String.addExclamation(): String = this + \"!\"\n\n\"Hello\".addExclamation() // \"Hello!\"",
    level: "basics",
    chapter: "kotlin-basics",
  },
  // ════════════════════════════════════════
  // features: Kotlin高度な機能 (kotlin-features) 5問
  // ════════════════════════════════════════
  {
    id: "kotlin-features-q01",
    question: "Kotlinのコルーチンでsuspend関数を呼び出せる場所として正しいものはどれですか？",
    choices: [
      { label: "A", text: "どこからでも呼び出せる" },
      { label: "B", text: "別のsuspend関数またはコルーチンスコープ内のみ" },
      { label: "C", text: "mainメソッドからのみ" },
      { label: "D", text: "Threadクラス内からのみ" },
    ],
    correctLabel: "B",
    explanation:
      "suspend関数は別のsuspend関数またはコルーチンビルダー（launch, async等）のブロック内からのみ呼び出せます。通常の関数から直接呼び出すとコンパイルエラーになります。これによりコルーチンの実行コンテキストが保証されます。",
    level: "features",
    chapter: "kotlin-features",
  },
  {
    id: "kotlin-features-q02",
    question: "Kotlinのsealed classの利点として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "パフォーマンスが通常のクラスより高い" },
      { label: "B", text: "when式で全サブクラスを網羅でき、elseが不要になる" },
      { label: "C", text: "自動的にシリアライズ可能になる" },
      { label: "D", text: "マルチスレッドで安全に使える" },
    ],
    correctLabel: "B",
    explanation:
      "sealed classは継承を同一モジュール内に制限します。これによりwhen式でコンパイラが全サブクラスを把握でき、全パターンを網羅していればelseブランチが不要になります。パターン漏れをコンパイル時に検出できるため、型安全なコードが書けます。",
    code: "sealed class Result {\n    data class Success(val data: String) : Result()\n    data class Error(val msg: String) : Result()\n}\n\nfun handle(r: Result) = when (r) {\n    is Result.Success -> r.data\n    is Result.Error -> r.msg\n    // elseが不要\n}",
    level: "features",
    chapter: "kotlin-features",
  },
  {
    id: "kotlin-features-q03",
    question: "Kotlinのスコープ関数let, apply, also, runの中で、レシーバオブジェクトをthisで参照し、ラムダの結果を返すものはどれですか？",
    choices: [
      { label: "A", text: "let" },
      { label: "B", text: "apply" },
      { label: "C", text: "run" },
      { label: "D", text: "also" },
    ],
    correctLabel: "C",
    explanation:
      "runはレシーバオブジェクトをthisで参照し、ラムダの最後の式の値を返します。applyはthisで参照しますがオブジェクト自身を返します。letはitで参照しラムダの結果を返します。alsoはitで参照しオブジェクト自身を返します。",
    level: "features",
    chapter: "kotlin-features",
  },
  {
    id: "kotlin-features-q04",
    question: "Kotlinの委譲プロパティ（by lazy）について正しい説明はどれですか？",
    choices: [
      { label: "A", text: "アプリケーション起動時に即座に初期化される" },
      { label: "B", text: "初回アクセス時に初期化され、以降はキャッシュされた値を返す" },
      { label: "C", text: "アクセスのたびに毎回初期化処理が実行される" },
      { label: "D", text: "var宣言でのみ使用できる" },
    ],
    correctLabel: "B",
    explanation:
      "by lazyは遅延初期化を実現する委譲プロパティです。初回アクセス時にラムダが実行され値が計算されます。2回目以降はキャッシュされた値が返されます。val宣言でのみ使用でき、デフォルトでスレッドセーフです。",
    code: "val heavyData: List<String> by lazy {\n    println(\"初期化実行\")\n    loadFromDatabase()\n}",
    level: "features",
    chapter: "kotlin-features",
  },
  {
    id: "kotlin-features-q05",
    question: "Kotlinのフロー（Flow）について正しい説明はどれですか？",
    choices: [
      { label: "A", text: "同期的にデータを一括で返す仕組みである" },
      { label: "B", text: "非同期にデータのストリームを扱うコールドストリームである" },
      { label: "C", text: "常にバックグラウンドスレッドで実行される" },
      { label: "D", text: "RxJavaと同一のライブラリである" },
    ],
    correctLabel: "B",
    explanation:
      "FlowはKotlinコルーチンの一部で、非同期にデータのストリームを扱うコールドストリームです。collectされるまでデータは発行されません。RxJavaのObservableに似ていますが、コルーチンベースでよりシンプルに記述できます。",
    level: "features",
    chapter: "kotlin-features",
  },
  // ════════════════════════════════════════
  // practice: Kotlin実践 (kotlin-practice) 5問
  // ════════════════════════════════════════
  {
    id: "kotlin-practice-q01",
    question: "KotlinでJavaのコレクションとの相互運用について正しいものはどれですか？",
    choices: [
      { label: "A", text: "KotlinのListとJavaのListは完全に異なるクラスである" },
      { label: "B", text: "KotlinのListはJavaのjava.util.Listにコンパイルされる" },
      { label: "C", text: "JavaのListをKotlinで使うには必ず変換が必要" },
      { label: "D", text: "KotlinではJavaのコレクションは使用できない" },
    ],
    correctLabel: "B",
    explanation:
      "KotlinのコレクションはJVMレベルではJavaのコレクションと同じクラスです。KotlinのListはjava.util.Listにコンパイルされます。Kotlinでは読み取り専用（List）と可変（MutableList）を型レベルで区別しますが、実行時には同じJavaクラスです。",
    level: "practice",
    chapter: "kotlin-practice",
  },
  {
    id: "kotlin-practice-q02",
    question: "次のKotlinコードの出力として正しいものはどれですか？",
    choices: [
      { label: "A", text: "[2, 4, 6]" },
      { label: "B", text: "[1, 2, 3, 4, 5]" },
      { label: "C", text: "[4, 16]" },
      { label: "D", text: "[2, 8]" },
    ],
    correctLabel: "C",
    explanation:
      "filterで偶数（2, 4）を抽出し、mapでそれぞれを2乗します。2*2=4、4*4=16となるため、結果は[4, 16]です。Kotlinのコレクション操作はメソッドチェーンで直感的に記述できます。",
    code: "val nums = listOf(1, 2, 3, 4, 5)\nval result = nums.filter { it % 2 == 0 }.map { it * it }\nprintln(result)",
    level: "practice",
    chapter: "kotlin-practice",
  },
  {
    id: "kotlin-practice-q03",
    question: "Kotlinのnull安全演算子「?.」の動作として正しいものはどれですか？",
    choices: [
      { label: "A", text: "nullの場合にNullPointerExceptionをスローする" },
      { label: "B", text: "nullの場合はnullを返し、非nullの場合はメソッドを実行する" },
      { label: "C", text: "nullの場合にデフォルト値を返す" },
      { label: "D", text: "nullをnon-null型に強制変換する" },
    ],
    correctLabel: "B",
    explanation:
      "セーフコール演算子（?.）はレシーバがnullの場合はnullを返し、非nullの場合のみメソッドを呼び出します。NullPointerExceptionを安全に回避できます。デフォルト値を指定するにはエルビス演算子（?:）を組み合わせます。",
    code: "val name: String? = null\nprintln(name?.length)       // null\nprintln(name?.length ?: 0)  // 0",
    level: "practice",
    chapter: "kotlin-practice",
  },
  {
    id: "kotlin-practice-q04",
    question: "KotlinでSpring Bootアプリケーションを開発する際の注意点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "Kotlinでは Spring Bootは使用できない" },
      { label: "B", text: "クラスとメソッドにopenを付けるか、allopen プラグインを使う必要がある" },
      { label: "C", text: "JavaのアノテーションはKotlinでは一切使えない" },
      { label: "D", text: "Gradleは使えず、Mavenのみサポートされる" },
    ],
    correctLabel: "B",
    explanation:
      "KotlinのクラスはデフォルトでfinalのためSpringのプロキシが作れません。kotlin-spring（allopen）プラグインを使うと、@Component、@Transactional等が付いたクラスが自動的にopenになります。Spring BootはKotlinを公式サポートしています。",
    level: "practice",
    chapter: "kotlin-practice",
  },
  {
    id: "kotlin-practice-q05",
    question: "Kotlinのコルーチンでstructured concurrencyの利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "コルーチンが無限に実行される" },
      { label: "B", text: "親のスコープがキャンセルされると子のコルーチンも自動的にキャンセルされる" },
      { label: "C", text: "常にグローバルスコープで実行される" },
      { label: "D", text: "例外が発生しても処理が続行される" },
    ],
    correctLabel: "B",
    explanation:
      "Structured Concurrencyにより、親スコープがキャンセルされると全ての子コルーチンも自動的にキャンセルされます。これによりリソースリークを防ぎ、エラー伝播も適切に行われます。GlobalScopeの使用は推奨されません。",
    level: "practice",
    chapter: "kotlin-practice",
  },
];

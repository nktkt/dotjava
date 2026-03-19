export interface JavaError {
  id: string;
  title: string;
  category: string;
  description: string;
  cause: string;
  errorCode?: string;
  fixCode?: string;
  tips?: string[];
}

export const errorCategories = [
  { id: "runtime", name: "実行時例外", color: "var(--color-dads-error)" },
  { id: "checked", name: "チェック例外", color: "var(--color-dads-warning)" },
  { id: "error", name: "エラー", color: "var(--color-dads-purple)" },
  { id: "compile", name: "コンパイルエラー", color: "var(--color-dads-blue)" },
  { id: "logic", name: "論理エラー", color: "var(--color-dads-gray)" },
  { id: "spring", name: "Spring/フレームワーク", color: "#6DB33F" },
  { id: "build", name: "ビルド・デプロイ", color: "#4A90D9" },
  { id: "jdbc", name: "DB・JDBC", color: "#336791" },
] as const;

export const javaErrors: JavaError[] = [
  // ===== 実行時例外 (Runtime Exceptions) =====
  {
    id: "null-pointer-exception",
    title: "NullPointerException",
    category: "runtime",
    description:
      "null参照に対してメソッド呼び出しやフィールドアクセスを行った際にスローされる例外。Javaで最も頻繁に遭遇する実行時例外の一つ。",
    cause:
      "変数がnullの状態でメソッドを呼び出したり、フィールドにアクセスしたりすると発生する。初期化されていないオブジェクト、メソッドからのnull戻り値、コレクション内のnull要素などが主な原因。",
    errorCode: `String name = null;
int length = name.length(); // NullPointerException!`,
    fixCode: `String name = null;

// 方法1: null チェック
if (name != null) {
    int length = name.length();
}

// 方法2: Optional を使用 (推奨)
Optional<String> optName = Optional.ofNullable(name);
int length = optName.map(String::length).orElse(0);`,
    tips: [
      "Java 14以降では NullPointerException のメッセージに、どの変数がnullだったか詳細が表示される",
      "Optional を活用してnullの可能性を型で明示する",
      "メソッドの戻り値がnullになり得る場合は、Javadocに明記するか Optional を返す",
    ],
  },
  {
    id: "array-index-out-of-bounds",
    title: "ArrayIndexOutOfBoundsException",
    category: "runtime",
    description:
      "配列のインデックスが有効範囲外（0未満または配列長以上）の場合にスローされる例外。",
    cause:
      "配列のサイズを超えるインデックスや、負のインデックスでアクセスしようとした場合に発生する。ループの境界条件の誤りが最も多い原因。",
    errorCode: `int[] numbers = {1, 2, 3};
System.out.println(numbers[3]); // ArrayIndexOutOfBoundsException!
// 有効なインデックスは 0, 1, 2 のみ`,
    fixCode: `int[] numbers = {1, 2, 3};

// 方法1: 範囲チェック
if (index >= 0 && index < numbers.length) {
    System.out.println(numbers[index]);
}

// 方法2: 拡張for文を使う
for (int num : numbers) {
    System.out.println(num);
}`,
    tips: [
      "ループ条件は i < array.length（<=ではなく<）を使用する",
      "可能であれば拡張for文や Stream API を使いインデックスアクセスを避ける",
      "配列よりも ArrayList を使うと境界チェックが容易になる",
    ],
  },
  {
    id: "class-cast-exception",
    title: "ClassCastException",
    category: "runtime",
    description:
      "オブジェクトを互換性のない型にキャストしようとした際にスローされる例外。",
    cause:
      "継承関係にないクラスへのキャストや、実際の型と異なる型へのダウンキャストが原因。ジェネリクスの型消去により、コンパイル時にはエラーにならないケースもある。",
    errorCode: `Object obj = "Hello";
Integer num = (Integer) obj; // ClassCastException!
// String を Integer にキャストできない`,
    fixCode: `Object obj = "Hello";

// 方法1: instanceof チェック
if (obj instanceof Integer) {
    Integer num = (Integer) obj;
}

// 方法2: パターンマッチング (Java 16+)
if (obj instanceof Integer num) {
    System.out.println(num * 2);
}`,
    tips: [
      "ダウンキャストの前に必ず instanceof でチェックする",
      "Java 16以降のパターンマッチング instanceof を活用する",
      "ジェネリクスを適切に使用して不要なキャストを減らす",
    ],
  },
  {
    id: "illegal-argument-exception",
    title: "IllegalArgumentException",
    category: "runtime",
    description:
      "メソッドに不正または不適切な引数が渡された場合にスローされる例外。",
    cause:
      "メソッドの仕様上受け入れられない値（負の値、nullなど）が引数として渡された場合に発生。API の契約違反を示す。",
    errorCode: `// 負の容量は指定できない
ArrayList<String> list = new ArrayList<>(-1);
// IllegalArgumentException: Illegal Capacity: -1`,
    fixCode: `// 引数のバリデーションを行う
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException(
            "年齢は0〜150の範囲で指定してください: " + age);
    }
    this.age = age;
}

// 呼び出し側
try {
    person.setAge(25); // OK
} catch (IllegalArgumentException e) {
    System.err.println(e.getMessage());
}`,
    tips: [
      "自作メソッドでも引数チェックを行い、不正な場合は IllegalArgumentException をスローする",
      "Objects.requireNonNull() でnullチェックを簡潔に書ける",
      "エラーメッセージには、どの引数がなぜ不正なのか具体的に記述する",
    ],
  },
  {
    id: "number-format-exception",
    title: "NumberFormatException",
    category: "runtime",
    description:
      "文字列を数値型に変換しようとした際に、文字列が適切な数値形式でない場合にスローされる例外。IllegalArgumentException のサブクラス。",
    cause:
      "Integer.parseInt() や Double.parseDouble() などで数値に変換できない文字列（空文字、文字混在、範囲外の数値など）を渡した場合に発生する。",
    errorCode: `String input = "abc";
int number = Integer.parseInt(input);
// NumberFormatException: For input string: "abc"`,
    fixCode: `String input = "abc";

// 方法1: try-catch で処理
try {
    int number = Integer.parseInt(input);
    System.out.println("数値: " + number);
} catch (NumberFormatException e) {
    System.out.println("数値に変換できません: " + input);
}

// 方法2: 事前に正規表現でチェック
if (input.matches("-?\\d+")) {
    int number = Integer.parseInt(input);
}`,
    tips: [
      "ユーザー入力は必ず変換前にバリデーションする",
      "空文字列やnullも NumberFormatException の原因になるため、事前にチェックする",
      "小数を扱う場合は Double.parseDouble() を使用し、ロケール依存の書式に注意する",
    ],
  },
  {
    id: "concurrent-modification-exception",
    title: "ConcurrentModificationException",
    category: "runtime",
    description:
      "コレクションの反復処理中にコレクションが構造的に変更された場合にスローされる例外。マルチスレッドだけでなく、シングルスレッドでも発生する。",
    cause:
      "for-each ループや Iterator で反復処理中に、コレクションに対して add/remove を行うと発生する。Iterator の remove() メソッド以外の方法で要素を削除しようとした場合が典型的。",
    errorCode: `List<String> list = new ArrayList<>(
    Arrays.asList("A", "B", "C"));

for (String s : list) {
    if (s.equals("B")) {
        list.remove(s); // ConcurrentModificationException!
    }
}`,
    fixCode: `List<String> list = new ArrayList<>(
    Arrays.asList("A", "B", "C"));

// 方法1: Iterator.remove() を使用
Iterator<String> it = list.iterator();
while (it.hasNext()) {
    if (it.next().equals("B")) {
        it.remove(); // OK
    }
}

// 方法2: removeIf を使用 (推奨)
list.removeIf(s -> s.equals("B"));`,
    tips: [
      "for-each ループ内でコレクションを変更しない",
      "Java 8以降は removeIf() メソッドを使用するのが最も簡潔",
      "マルチスレッド環境では ConcurrentHashMap や CopyOnWriteArrayList を検討する",
    ],
  },
  {
    id: "unsupported-operation-exception",
    title: "UnsupportedOperationException",
    category: "runtime",
    description:
      "要求されたオペレーションがサポートされていない場合にスローされる例外。不変コレクションへの変更操作で頻繁に発生する。",
    cause:
      "Arrays.asList() や List.of() で作成された固定サイズまたは不変のリストに対して、add/remove/set を行うと発生する。Collections.unmodifiableList() で作成されたリストも同様。",
    errorCode: `List<String> list = List.of("A", "B", "C");
list.add("D"); // UnsupportedOperationException!

// Arrays.asList() でも同様
List<String> list2 = Arrays.asList("X", "Y");
list2.add("Z"); // UnsupportedOperationException!`,
    fixCode: `// 変更可能なリストを作成する
List<String> list = new ArrayList<>(List.of("A", "B", "C"));
list.add("D"); // OK

// Arrays.asList() の場合も同様
List<String> list2 = new ArrayList<>(Arrays.asList("X", "Y"));
list2.add("Z"); // OK`,
    tips: [
      "List.of() や Map.of() は不変コレクションを返すことを覚えておく",
      "変更が必要な場合は new ArrayList<>() でラップする",
      "意図的に不変にする場合は Collections.unmodifiableList() を使い、変更不可であることをドキュメントに明記する",
    ],
  },
  {
    id: "arithmetic-exception",
    title: "ArithmeticException",
    category: "runtime",
    description:
      "算術演算で異常な結果が発生した場合にスローされる例外。最も一般的なのはゼロ除算。",
    cause:
      "整数のゼロ除算（/ 0 や % 0）が主な原因。浮動小数点数（double/float）のゼロ除算では例外は発生せず、Infinity や NaN になる点に注意。",
    errorCode: `int a = 10;
int b = 0;
int result = a / b; // ArithmeticException: / by zero`,
    fixCode: `int a = 10;
int b = 0;

// 方法1: 事前チェック
if (b != 0) {
    int result = a / b;
} else {
    System.out.println("0で割ることはできません");
}

// 方法2: try-catch
try {
    int result = a / b;
} catch (ArithmeticException e) {
    System.out.println("計算エラー: " + e.getMessage());
}`,
    tips: [
      "除算の前に除数が0でないことを必ず確認する",
      "double/float のゼロ除算は例外ではなく Infinity になるため、別途 Double.isInfinite() でチェックする",
      "BigDecimal で正確な計算を行う場合は、丸めモード（RoundingMode）を指定する",
    ],
  },
  {
    id: "illegal-state-exception",
    title: "IllegalStateException",
    category: "runtime",
    description:
      "メソッドが呼び出されたタイミングや状態が不適切な場合にスローされる例外。オブジェクトの状態がメソッドの前提条件を満たしていないことを示す。",
    cause:
      "例えば、すでに閉じられたストリームへの操作、next() を呼ばずに Iterator.remove() を呼ぶ、ビルダーパターンで必須フィールドが未設定のまま build() を呼ぶなどの場合に発生する。",
    errorCode: `Iterator<String> it = list.iterator();
it.remove(); // IllegalStateException!
// next() を呼ぶ前に remove() はできない

// Scanner を閉じた後に読み取り
Scanner sc = new Scanner(System.in);
sc.close();
sc.nextLine(); // IllegalStateException!`,
    fixCode: `// Iterator: next() の後に remove() を呼ぶ
Iterator<String> it = list.iterator();
if (it.hasNext()) {
    it.next();     // まず次の要素へ移動
    it.remove();   // OK
}

// リソースは try-with-resources で管理
try (Scanner sc = new Scanner(System.in)) {
    String line = sc.nextLine();
    // sc はブロック終了時に自動的に閉じられる
}`,
    tips: [
      "オブジェクトのライフサイクル（初期化済み、使用中、クローズ済み）を意識する",
      "自作クラスでは、不正な状態での操作に対して IllegalStateException をスローして早期にバグを検出する",
      "try-with-resources を使ってリソースの閉じ忘れを防ぐ",
    ],
  },
  {
    id: "string-index-out-of-bounds",
    title: "StringIndexOutOfBoundsException",
    category: "runtime",
    description:
      "文字列のインデックスが有効範囲外の場合にスローされる例外。charAt()、substring() などで発生する。",
    cause:
      "文字列の長さを超えるインデックスや負のインデックスを指定した場合に発生する。空文字列に対する charAt(0) も典型的な原因。",
    errorCode: `String str = "Hello";
char ch = str.charAt(5); // StringIndexOutOfBoundsException!
// 有効なインデックスは 0〜4

String sub = str.substring(2, 10); // 範囲外!`,
    fixCode: `String str = "Hello";

// 範囲チェックを行う
if (!str.isEmpty() && index < str.length()) {
    char ch = str.charAt(index);
}

// substring は文字列長を超えないよう注意
int end = Math.min(10, str.length());
String sub = str.substring(2, end);`,
    tips: [
      "charAt() を使う前に isEmpty() で空文字列チェックをする",
      "substring() の第2引数は「終了位置（含まない）」であることに注意する",
      "文字列操作が多い場合は Apache Commons Lang の StringUtils を検討する",
    ],
  },

  // ===== チェック例外 (Checked Exceptions) =====
  {
    id: "io-exception",
    title: "IOException",
    category: "checked",
    description:
      "入出力操作に失敗した場合にスローされるチェック例外。ファイル操作やネットワーク通信で頻繁に発生する。",
    cause:
      "ファイルの読み書き中のディスクエラー、ネットワーク接続の断絶、ストリームが予期せず閉じられた場合などに発生する。",
    errorCode: `// コンパイルエラー: IOException を処理していない
BufferedReader reader = new BufferedReader(
    new FileReader("data.txt"));
String line = reader.readLine();`,
    fixCode: `// 方法1: try-with-resources (推奨)
try (BufferedReader reader = new BufferedReader(
        new FileReader("data.txt"))) {
    String line = reader.readLine();
    System.out.println(line);
} catch (IOException e) {
    System.err.println("ファイル読み取りエラー: " + e.getMessage());
}

// 方法2: throws で呼び出し元に委譲
public String readFile(String path) throws IOException {
    return Files.readString(Path.of(path));
}`,
    tips: [
      "try-with-resources を使用してリソースの確実なクローズを保証する",
      "Java NIO（java.nio.file.Files）を使うと簡潔に記述できる",
      "ログにはスタックトレースを含めて原因を特定しやすくする",
    ],
  },
  {
    id: "file-not-found-exception",
    title: "FileNotFoundException",
    category: "checked",
    description:
      "指定されたパスのファイルが存在しない、またはアクセスできない場合にスローされるチェック例外。IOException のサブクラス。",
    cause:
      "ファイルパスのタイプミス、ファイルの削除、権限不足、相対パスの基準ディレクトリの誤りなどが原因。",
    errorCode: `// 存在しないファイルを開こうとする
FileInputStream fis = new FileInputStream("config.txt");
// FileNotFoundException: config.txt (No such file or directory)`,
    fixCode: `Path path = Path.of("config.txt");

// 方法1: 事前に存在チェック
if (Files.exists(path)) {
    try (var reader = Files.newBufferedReader(path)) {
        String content = reader.readLine();
    }
} else {
    System.out.println("ファイルが見つかりません: " + path);
}

// 方法2: try-catch で処理
try (var fis = new FileInputStream("config.txt")) {
    // ファイル処理
} catch (FileNotFoundException e) {
    System.err.println("ファイルが見つかりません: " + e.getMessage());
}`,
    tips: [
      "Files.exists() で事前にファイルの存在を確認する",
      "相対パスではなく絶対パスを使用すると問題を避けやすい",
      "クラスパスリソースの場合は getClass().getResourceAsStream() を使用する",
    ],
  },
  {
    id: "sql-exception",
    title: "SQLException",
    category: "checked",
    description:
      "データベースアクセスエラーが発生した場合にスローされるチェック例外。SQL構文エラー、接続失敗、制約違反など幅広い原因がある。",
    cause:
      "SQL文の構文ミス、存在しないテーブル/カラムへのアクセス、一意制約違反、データベース接続の切断、ドライバの未登録などが主な原因。",
    errorCode: `// SQL構文エラーの例
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(
    "SELCT * FROM users"); // "SELECT" のタイプミス
// SQLException: Syntax error in SQL statement`,
    fixCode: `// PreparedStatement で安全にクエリを実行
String sql = "SELECT * FROM users WHERE id = ?";

try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
    pstmt.setInt(1, userId);
    try (ResultSet rs = pstmt.executeQuery()) {
        while (rs.next()) {
            String name = rs.getString("name");
            System.out.println(name);
        }
    }
} catch (SQLException e) {
    System.err.println("SQLエラー: " + e.getMessage());
    System.err.println("SQLState: " + e.getSQLState());
}`,
    tips: [
      "PreparedStatement を使用してSQLインジェクションを防ぎ、構文エラーも減らす",
      "接続プーリング（HikariCPなど）を使用して接続管理を効率化する",
      "getSQLState() や getErrorCode() で詳細なエラー情報を取得する",
    ],
  },
  {
    id: "class-not-found-exception",
    title: "ClassNotFoundException",
    category: "checked",
    description:
      "Class.forName() やクラスローダーが指定されたクラスを見つけられない場合にスローされるチェック例外。",
    cause:
      "クラスパスにJARが含まれていない、完全修飾名の誤り、依存ライブラリの不足、JDBCドライバの未配置などが原因。",
    errorCode: `// JDBCドライバが存在しない場合
Class.forName("com.mysql.cj.jdbc.Driver");
// ClassNotFoundException: com.mysql.cj.jdbc.Driver`,
    fixCode: `// 方法1: 依存関係を正しく設定 (Maven の場合)
// pom.xml に以下を追加:
// <dependency>
//     <groupId>com.mysql</groupId>
//     <artifactId>mysql-connector-j</artifactId>
//     <version>8.0.33</version>
// </dependency>

// 方法2: JDBC 4.0以降はドライバの明示的ロード不要
// ServiceLoader で自動検出される
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/mydb", "user", "pass");`,
    tips: [
      "JDBC 4.0以降（Java 6+）では Class.forName() でのドライバロードは不要",
      "Maven/Gradle の依存関係が正しいか確認する",
      "IDE のクラスパス設定で必要なJARが含まれているか確認する",
    ],
  },
  {
    id: "interrupted-exception",
    title: "InterruptedException",
    category: "checked",
    description:
      "スレッドが待機中（sleep, wait, join）に他のスレッドから割り込まれた場合にスローされるチェック例外。",
    cause:
      "Thread.sleep()、Object.wait()、Thread.join() などで待機中のスレッドに対して interrupt() が呼ばれた場合に発生する。スレッドのキャンセル機構として使われる。",
    errorCode: `// 割り込みの不適切な処理
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    // 何もしない ← アンチパターン!
}`,
    fixCode: `// 方法1: 割り込みステータスを復元 (推奨)
try {
    Thread.sleep(1000);
} catch (InterruptedException e) {
    Thread.currentThread().interrupt(); // ステータス復元
    return; // 処理を中断
}

// 方法2: throws で呼び出し元に伝播
public void doWork() throws InterruptedException {
    Thread.sleep(1000);
    // 割り込まれた場合は呼び出し元が処理
}`,
    tips: [
      "InterruptedException を空の catch で握りつぶさない",
      "catch したら Thread.currentThread().interrupt() で割り込みステータスを復元する",
      "並行処理には ExecutorService と Future の利用を検討する",
    ],
  },
  {
    id: "parse-exception",
    title: "ParseException",
    category: "checked",
    description:
      "文字列の解析（パース）中に予期しないエラーが発生した場合にスローされるチェック例外。日付や数値のフォーマット変換で頻出。",
    cause:
      "SimpleDateFormat や MessageFormat で、期待するフォーマットと実際の文字列が一致しない場合に発生する。ロケールやタイムゾーンの設定ミスも原因になる。",
    errorCode: `SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
Date date = sdf.parse("2024-01-15"); // ParseException!
// フォーマットが "yyyy/MM/dd" なのに "-" 区切りで渡している`,
    fixCode: `// 方法1: 正しいフォーマットを使用
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
Date date = sdf.parse("2024-01-15"); // OK

// 方法2: java.time API を使用 (推奨)
LocalDate date = LocalDate.parse("2024-01-15"); // ISO形式
// カスタムフォーマット
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
LocalDate date2 = LocalDate.parse("2024/01/15", fmt);`,
    tips: [
      "SimpleDateFormat はスレッドセーフでないため、java.time API（DateTimeFormatter）を使用する",
      "DateTimeParseException は ParseException とは異なるクラスなので注意",
      "入力値の形式が不明な場合は、複数のフォーマットを順に試す",
    ],
  },

  // ===== エラー (Errors) =====
  {
    id: "out-of-memory-error",
    title: "OutOfMemoryError",
    category: "error",
    description:
      "JVMのヒープメモリが不足した場合にスローされるエラー。アプリケーションが利用可能なメモリを使い果たしたことを示す。通常、catchして回復することは困難。",
    cause:
      "大量のオブジェクト生成、メモリリーク（不要なオブジェクトへの参照が残る）、巨大なコレクションの保持、大きなファイルの一括読み込みなどが原因。",
    errorCode: `// 無限にオブジェクトを追加し続ける
List<byte[]> list = new ArrayList<>();
while (true) {
    list.add(new byte[1024 * 1024]); // 1MBずつ追加
    // OutOfMemoryError: Java heap space
}`,
    fixCode: `// 方法1: ストリーム処理で大きなファイルを行ごとに読む
try (Stream<String> lines = Files.lines(Path.of("large.txt"))) {
    lines.forEach(line -> processLine(line));
}

// 方法2: 不要な参照を解放する
List<Data> cache = new ArrayList<>();
// 処理後に不要なデータはクリア
cache.clear();

// 方法3: WeakReference を使ってGCを許可する
Map<Key, WeakReference<Value>> cache =
    new WeakHashMap<>();`,
    tips: [
      "JVM起動時に -Xmx オプションでヒープサイズを調整する（例: -Xmx512m）",
      "大きなファイルはストリーム処理で少しずつ読み込む",
      "VisualVM や jmap でヒープダンプを取得してメモリリークを調査する",
    ],
  },
  {
    id: "stack-overflow-error",
    title: "StackOverflowError",
    category: "error",
    description:
      "スレッドのスタック領域が不足した場合にスローされるエラー。主に無限再帰が原因で発生する。",
    cause:
      "再帰メソッドの終了条件の誤りや欠如による無限再帰、相互に呼び合うメソッド、非常に深いメソッド呼び出しチェーンなどが原因。",
    errorCode: `// 終了条件のない再帰
public static int factorial(int n) {
    return n * factorial(n - 1); // StackOverflowError!
    // n == 0 の終了条件がない
}`,
    fixCode: `// 方法1: 正しい終了条件を追加
public static int factorial(int n) {
    if (n <= 1) return 1; // 終了条件
    return n * factorial(n - 1);
}

// 方法2: ループに変換（深い再帰を避ける）
public static long factorial(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
    tips: [
      "再帰メソッドには必ず明確な終了条件（base case）を設ける",
      "再帰が深くなる可能性がある場合はループに書き換える",
      "-Xss オプションでスタックサイズを変更できるが、根本解決にはならない",
    ],
  },
  {
    id: "no-class-def-found-error",
    title: "NoClassDefFoundError",
    category: "error",
    description:
      "コンパイル時には存在していたクラスが、実行時に見つからない場合にスローされるエラー。ClassNotFoundException とは異なり、JVMレベルで発生する。",
    cause:
      "コンパイル後にクラスパスからJARやクラスファイルが削除された、バージョン不一致、static初期化ブロックで例外が発生した場合などに起きる。",
    errorCode: `// コンパイル時にはライブラリが存在していたが、
// 実行時にはクラスパスから欠落している
import com.example.MyLibrary;

public class App {
    public static void main(String[] args) {
        MyLibrary lib = new MyLibrary();
        // NoClassDefFoundError: com/example/MyLibrary
    }
}`,
    fixCode: `// 方法1: クラスパスに必要なJARを含める
// java -cp "app.jar:lib/*" com.example.App

// 方法2: Maven/Gradle で依存関係を正しく管理する
// build.gradle の例:
// dependencies {
//     implementation 'com.example:my-library:1.0.0'
// }

// 方法3: fat JAR (uber JAR) を作成して依存関係をバンドル
// Maven: maven-shade-plugin を使用
// Gradle: shadowJar プラグインを使用`,
    tips: [
      "ClassNotFoundException と NoClassDefFoundError の違いを理解する（前者はリフレクション時、後者はクラスリンク時）",
      "static初期化ブロックの例外が原因の場合、ExceptionInInitializerError が先に発生することがある",
      "デプロイ時に全ての依存JARが含まれているか確認する",
    ],
  },

  // ===== コンパイルエラー (Compile Errors) =====
  {
    id: "cannot-find-symbol",
    title: "cannot find symbol",
    category: "compile",
    description:
      "コンパイラが参照された変数、メソッド、クラスを見つけられない場合に発生するコンパイルエラー。",
    cause:
      "変数名やメソッド名のタイプミス、import文の不足、変数のスコープ外からのアクセス、宣言前の使用などが原因。",
    errorCode: `public class Main {
    public static void main(String[] args) {
        // "message" を宣言していない
        System.out.println(mesage); // タイプミス
        // error: cannot find symbol
        //   symbol: variable mesage
    }
}`,
    fixCode: `public class Main {
    public static void main(String[] args) {
        String message = "Hello, World!";
        System.out.println(message); // 正しい変数名
    }
}`,
    tips: [
      "エラーメッセージの symbol 行で、何が見つからないか確認する",
      "IDE の自動補完機能を活用してタイプミスを防ぐ",
      "必要な import 文が記述されているか確認する（IDE の自動インポート機能を活用）",
    ],
  },
  {
    id: "incompatible-types",
    title: "incompatible types",
    category: "compile",
    description:
      "互換性のない型の代入や変換を行おうとした場合に発生するコンパイルエラー。型安全性を保証するための重要なチェック。",
    cause:
      "異なる型への暗黙的な変換（例: String を int に代入）、縮小変換（double を int に代入）、ジェネリクスの型不一致などが原因。",
    errorCode: `int number = "42"; // String を int に代入
// error: incompatible types: String cannot be converted to int

double pi = 3.14;
int approx = pi; // double を int に代入
// error: incompatible types: possible lossy conversion`,
    fixCode: `// 文字列から数値へは明示的に変換
int number = Integer.parseInt("42");

// 縮小変換はキャストを使用
double pi = 3.14;
int approx = (int) pi; // 明示的キャスト (小数点以下は切り捨て)

// より安全な方法
int rounded = (int) Math.round(pi); // 四捨五入`,
    tips: [
      "暗黙的な型変換（拡大変換: int→long）は安全だが、縮小変換には明示的キャストが必要",
      "文字列と数値の変換には Integer.parseInt()、String.valueOf() などを使用する",
      "ジェネリクスの型パラメータの不一致にも注意する",
    ],
  },
  {
    id: "unreported-exception",
    title: "unreported exception",
    category: "compile",
    description:
      "チェック例外を処理（catch）も宣言（throws）もしていない場合に発生するコンパイルエラー。Javaのチェック例外機構による強制。",
    cause:
      "チェック例外をスローする可能性のあるメソッドを呼び出す際に、try-catch で捕捉するか、throws 句で宣言するかのどちらかが必要。",
    errorCode: `public class Main {
    public static void main(String[] args) {
        Thread.sleep(1000);
        // error: unreported exception InterruptedException;
        // must be caught or declared to be thrown
    }
}`,
    fixCode: `// 方法1: try-catch で処理
public static void main(String[] args) {
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    }
}

// 方法2: throws で宣言
public static void main(String[] args) throws InterruptedException {
    Thread.sleep(1000);
}`,
    tips: [
      "IDE が赤線で示す例外は、try-catch か throws のどちらかで対処する",
      "RuntimeException とそのサブクラスはチェック例外ではないため、宣言不要",
      "ライブラリのメソッドが何をスローするかは Javadoc で確認する",
    ],
  },
  {
    id: "missing-return-statement",
    title: "missing return statement",
    category: "compile",
    description:
      "戻り値のあるメソッドで、全ての実行パスにおいて return 文が記述されていない場合に発生するコンパイルエラー。",
    cause:
      "if-else の一部の分岐で return が欠けている、switch 文の default が無い、ループの後に return が無いなどが原因。",
    errorCode: `public static String getGrade(int score) {
    if (score >= 80) {
        return "A";
    } else if (score >= 60) {
        return "B";
    }
    // score < 60 の場合に return がない!
    // error: missing return statement
}`,
    fixCode: `public static String getGrade(int score) {
    if (score >= 80) {
        return "A";
    } else if (score >= 60) {
        return "B";
    } else {
        return "C"; // 全ての条件をカバー
    }
}

// または early return パターン
public static String getGrade(int score) {
    if (score >= 80) return "A";
    if (score >= 60) return "B";
    return "C"; // デフォルト値
}`,
    tips: [
      "全ての条件分岐で return があることを確認する",
      "if-else は必ず else を含めるか、メソッド末尾にデフォルトの return を置く",
      "switch 式（Java 14+）を使うと、網羅性チェックがコンパイラ側で行われる",
    ],
  },
  {
    id: "variable-not-initialized",
    title: "variable might not have been initialized",
    category: "compile",
    description:
      "ローカル変数が初期化されないまま使用される可能性がある場合に発生するコンパイルエラー。Javaはローカル変数の自動初期化を行わない。",
    cause:
      "ローカル変数を宣言したが、条件分岐によっては値が代入されないパスが存在する場合に発生する。フィールド変数はデフォルト値（0, null, false）で初期化されるが、ローカル変数はされない。",
    errorCode: `public static void main(String[] args) {
    int result;
    boolean condition = checkSomething();
    if (condition) {
        result = 42;
    }
    System.out.println(result); // 初期化されていない可能性!
    // error: variable result might not have been initialized
}`,
    fixCode: `// 方法1: 宣言時に初期値を設定
int result = 0; // デフォルト値を設定
if (condition) {
    result = 42;
}
System.out.println(result);

// 方法2: 全ての分岐で代入を保証
int result;
if (condition) {
    result = 42;
} else {
    result = 0;
}
System.out.println(result);`,
    tips: [
      "ローカル変数は宣言時に初期値を設定する習慣をつける",
      "フィールド変数はデフォルト値で初期化されるが、明示的に書いた方が読みやすい",
      "final 変数は1回だけ代入すればよいが、全てのパスで代入が必要",
    ],
  },
  {
    id: "non-static-from-static",
    title: "non-static method cannot be referenced from a static context",
    category: "compile",
    description:
      "static メソッド（例: main）から、インスタンスメソッドやインスタンス変数に直接アクセスしようとした場合に発生するコンパイルエラー。",
    cause:
      "static メソッドはインスタンスに属さないため、this を持たない。そのためインスタンスメンバーに直接アクセスすることはできない。初心者が main メソッド内で書く際に最も多く遭遇する。",
    errorCode: `public class Main {
    String name = "Java";

    void greet() {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        greet(); // エラー!
        // error: non-static method greet() cannot be
        // referenced from a static context
    }
}`,
    fixCode: `public class Main {
    String name = "Java";

    void greet() {
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args) {
        // 方法1: インスタンスを生成してから呼ぶ
        Main obj = new Main();
        obj.greet(); // OK

        // 方法2: メソッドを static にする
        // static void greet() { ... }
    }
}`,
    tips: [
      "main メソッドから自クラスのメソッドを呼ぶにはインスタンス生成が必要",
      "ユーティリティメソッド（状態を持たない）は static にするのが適切",
      "static と非 static の違いを理解することが Java の基礎として重要",
    ],
  },

  // ===== 論理エラー (Logic Errors) =====
  {
    id: "off-by-one-error",
    title: "Off-by-one エラー（境界値の誤り）",
    category: "logic",
    description:
      "ループの反復回数や配列のインデックスが1つずれる論理エラー。コンパイルエラーや実行時例外にならないため発見が難しい。",
    cause:
      "ループの開始値・終了値の条件（< と <=、0始まりと1始まりの混同）、配列の最後の要素へのアクセス、文字列の部分取得範囲などが原因。",
    errorCode: `// 意図: 配列の全要素を処理する
int[] arr = {10, 20, 30, 40, 50};

// <= を使うと1回多くループする
for (int i = 0; i <= arr.length; i++) {
    System.out.println(arr[i]);
    // i=5 で ArrayIndexOutOfBoundsException
}

// 意図: 1〜10を出力する
for (int i = 0; i < 10; i++) {
    System.out.println(i); // 0〜9 が出力される（1つずれ）
}`,
    fixCode: `// 配列の全要素を処理（正しい境界条件）
int[] arr = {10, 20, 30, 40, 50};
for (int i = 0; i < arr.length; i++) { // < を使用
    System.out.println(arr[i]);
}

// 1〜10を出力する（正しい開始値）
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}

// より安全: 拡張for文を使う
for (int value : arr) {
    System.out.println(value);
}`,
    tips: [
      "ループ境界は「0始まりなら <、1始まりなら <=」と覚える",
      "可能な限り拡張for文や Stream API でインデックスを使わない方法を選ぶ",
      "テスト時は境界値（最初の要素、最後の要素、空配列）を必ず確認する",
    ],
  },
  {
    id: "infinite-loop",
    title: "無限ループ",
    category: "logic",
    description:
      "ループの終了条件が満たされず、プログラムが永遠にループし続ける論理エラー。CPU使用率が100%に張り付き、プログラムが応答しなくなる。",
    cause:
      "ループ変数の更新忘れ、終了条件の誤り、浮動小数点数の等値比較などが原因。while ループで特に起きやすい。",
    errorCode: `// 例1: ループ変数の更新忘れ
int i = 0;
while (i < 10) {
    System.out.println(i);
    // i++ を忘れている → 永遠に i=0
}

// 例2: 浮動小数点数の等値比較
double x = 0.0;
while (x != 1.0) {
    x += 0.1; // 0.1 は正確に表現できないため、
               // x は 1.0 にならない
}`,
    fixCode: `// 例1: ループ変数を必ず更新する
int i = 0;
while (i < 10) {
    System.out.println(i);
    i++; // 忘れずに更新
}
// より安全: for文を使用
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// 例2: 浮動小数点数は範囲比較を使う
double x = 0.0;
while (x < 1.0) { // != ではなく < を使用
    x += 0.1;
}
// または回数ベースで制御
for (int i = 0; i < 10; i++) {
    double x = i * 0.1;
}`,
    tips: [
      "while ループよりも for ループを使うとループ変数の更新忘れを防げる",
      "浮動小数点数の == 比較は避け、範囲比較（< や >）または Math.abs(a - b) < epsilon を使う",
      "開発中は無限ループ対策としてカウンタやタイムアウトを設けると安全",
    ],
  },
  {
    id: "equals-vs-double-equals",
    title: "== と equals() の混同",
    category: "logic",
    description:
      "オブジェクトの値比較で == 演算子を使ってしまう論理エラー。== は参照（メモリアドレス）を比較し、equals() は値を比較する。",
    cause:
      "String や Integer などのオブジェクト型で == を使うと、値ではなくオブジェクトの参照が同じかを比較してしまう。文字列リテラルはインターンプールにより == でも true になることがあるため、バグが顕在化しにくい。",
    errorCode: `String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);      // false (参照が異なる)

Integer a = 200;
Integer b = 200;
System.out.println(a == b);        // false (-128〜127以外)
// ※ -128〜127 はキャッシュされるため true になる`,
    fixCode: `String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1.equals(s2));  // true (値が同じ)

Integer a = 200;
Integer b = 200;
System.out.println(a.equals(b));    // true (値が同じ)

// null安全な比較
System.out.println(Objects.equals(s1, s2)); // true

// プリミティブ型 (int, double等) は == でOK
int x = 10, y = 10;
System.out.println(x == y); // true`,
    tips: [
      "オブジェクト型の比較は必ず equals() を使用する",
      "null の可能性がある場合は Objects.equals() を使用する",
      "Integer は -128〜127 の範囲でキャッシュされるため、== でも true になることがあるが、依存してはいけない",
    ],
  },
  {
    id: "mutable-shared-state",
    title: "可変オブジェクトの共有",
    category: "logic",
    description:
      "可変（mutable）なオブジェクトを意図せず共有してしまい、一方の変更が他方にも影響する論理エラー。特に Date や配列、コレクションで発生しやすい。",
    cause:
      "参照型のフィールドを直接返したり、引数をそのまま格納したりすると、外部から内部状態を変更できてしまう。防御的コピー（defensive copy）の欠如が原因。",
    errorCode: `public class Period {
    private Date start;

    public Period(Date start) {
        this.start = start; // 参照をそのまま格納
    }

    public Date getStart() {
        return start; // 参照をそのまま返す
    }
}

Date d = new Date();
Period p = new Period(d);
d.setYear(200); // Period の内部状態も変わってしまう!`,
    fixCode: `public class Period {
    private final Date start;

    public Period(Date start) {
        // 防御的コピー
        this.start = new Date(start.getTime());
    }

    public Date getStart() {
        // 防御的コピーを返す
        return new Date(start.getTime());
    }
}

// より良い方法: 不変クラスを使用 (推奨)
public class Period {
    private final LocalDate start; // 不変

    public Period(LocalDate start) {
        this.start = start; // コピー不要
    }

    public LocalDate getStart() {
        return start; // そのまま返せる
    }
}`,
    tips: [
      "Date の代わりに java.time の不変クラス（LocalDate, Instant等）を使用する",
      "コレクションを返す場合は Collections.unmodifiableList() でラップするか、List.copyOf() を使う",
      "レコード（Java 16+）を使用すると自然にイミュータブルなクラスを作れる",
    ],
  },
  {
    id: "hashcode-equals-contract",
    title: "equals と hashCode の不整合",
    category: "logic",
    description:
      "equals() をオーバーライドしたが hashCode() をオーバーライドしなかった（またはその逆の）論理エラー。HashMap や HashSet で正しく動作しなくなる。",
    cause:
      "Javaの契約として「equals() が true を返す2つのオブジェクトは、同じ hashCode を返さなければならない」というルールがある。これを守らないと、HashMap でキーが見つからなくなる等の問題が起きる。",
    errorCode: `public class User {
    private String name;

    @Override
    public boolean equals(Object o) {
        if (o instanceof User other) {
            return name.equals(other.name);
        }
        return false;
    }
    // hashCode() をオーバーライドしていない!
}

Set<User> set = new HashSet<>();
set.add(new User("Alice"));
set.contains(new User("Alice")); // false になる可能性!`,
    fixCode: `public class User {
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o instanceof User other) {
            return Objects.equals(name, other.name);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(name); // equals と一貫性を保つ
    }
}

// より簡単: record を使用 (Java 16+)
record User(String name) {}
// equals, hashCode, toString が自動生成される`,
    tips: [
      "equals() をオーバーライドしたら必ず hashCode() もオーバーライドする",
      "IDE の自動生成機能やLombokの @EqualsAndHashCode を活用する",
      "Java 16以降は record を使うと equals/hashCode が自動実装される",
    ],
  },

  // ===== 追加のエラー =====
  {
    id: "index-out-of-bounds-exception",
    title: "IndexOutOfBoundsException",
    category: "runtime",
    description:
      "List などのコレクションで無効なインデックスを使用した場合にスローされる例外。ArrayIndexOutOfBoundsException の親クラス的な位置づけ。",
    cause:
      "ArrayList.get() や List.set() で範囲外のインデックスを指定した場合に発生する。空のリストに get(0) を呼ぶケースが典型的。",
    errorCode: `List<String> list = new ArrayList<>();
String first = list.get(0); // IndexOutOfBoundsException!
// リストが空なのでインデックス0は存在しない

List<String> items = List.of("A", "B");
items.get(5); // IndexOutOfBoundsException!`,
    fixCode: `List<String> list = new ArrayList<>();

// 方法1: サイズチェック
if (!list.isEmpty()) {
    String first = list.get(0);
}

// 方法2: Optional で安全にアクセス
Optional<String> first = list.stream().findFirst();
first.ifPresent(System.out::println);

// 方法3: 範囲内か確認
int index = 5;
if (index >= 0 && index < list.size()) {
    String item = list.get(index);
}`,
    tips: [
      "リストにアクセスする前に isEmpty() や size() でサイズを確認する",
      "最初の要素へのアクセスは stream().findFirst() で Optional を返すと安全",
      "Collections.emptyList() を返す場合、呼び出し側での空チェックを忘れないようにする",
    ],
  },
  {
    id: "class-cast-generics",
    title: "ジェネリクスの型消去による ClassCastException",
    category: "runtime",
    description:
      "ジェネリクスの型消去（type erasure）により、実行時の型チェックが行えず発生する ClassCastException。コンパイル時の警告を無視した場合に起きやすい。",
    cause:
      "raw型の使用や @SuppressWarnings(\"unchecked\") で警告を抑制してジェネリクスの型安全性を無視した場合、実行時にキャスト失敗が発生する。",
    errorCode: `// raw型の使用（非推奨）
List list = new ArrayList();
list.add("Hello");
list.add(42);

// コンパイルは通るが実行時にエラー
for (Object item : list) {
    String s = (String) item; // 42 で ClassCastException!
}`,
    fixCode: `// ジェネリクスを正しく使用
List<String> list = new ArrayList<>();
list.add("Hello");
// list.add(42); // コンパイルエラーで防止される

for (String s : list) {
    System.out.println(s); // 安全
}

// 異なる型を格納する必要がある場合
List<Object> mixed = new ArrayList<>();
mixed.add("Hello");
mixed.add(42);
for (Object item : mixed) {
    if (item instanceof String s) {
        System.out.println("文字列: " + s);
    } else if (item instanceof Integer n) {
        System.out.println("数値: " + n);
    }
}`,
    tips: [
      "raw型を使用せず、必ず型パラメータを指定する",
      "@SuppressWarnings(\"unchecked\") は本当に安全な場合にのみ使用する",
      "コンパイラ警告は無視せず、全て解消する習慣をつける",
    ],
  },
  {
    id: "deadlock",
    title: "デッドロック",
    category: "logic",
    description:
      "2つ以上のスレッドが互いにロックの解放を待ち合い、永久に処理が進まなくなる論理エラー。プログラムがフリーズして応答しなくなる。",
    cause:
      "複数のロックを異なる順序で取得するスレッドが存在する場合に発生する。スレッドAがロック1を持ちロック2を待ち、スレッドBがロック2を持ちロック1を待つ状況。",
    errorCode: `Object lock1 = new Object();
Object lock2 = new Object();

// スレッド1
new Thread(() -> {
    synchronized (lock1) {
        Thread.sleep(100);
        synchronized (lock2) { /* 処理 */ }
    }
}).start();

// スレッド2
new Thread(() -> {
    synchronized (lock2) { // lock2 → lock1 の順
        Thread.sleep(100);
        synchronized (lock1) { /* 処理 */ }
        // デッドロック発生!
    }
}).start();`,
    fixCode: `Object lock1 = new Object();
Object lock2 = new Object();

// 解決策: 全てのスレッドで同じ順序でロックを取得
// スレッド1
new Thread(() -> {
    synchronized (lock1) {
        synchronized (lock2) { /* 処理 */ }
    }
}).start();

// スレッド2
new Thread(() -> {
    synchronized (lock1) { // 同じ順序: lock1 → lock2
        synchronized (lock2) { /* 処理 */ }
    }
}).start();

// より安全: java.util.concurrent を使用
ReentrantLock lock = new ReentrantLock();
if (lock.tryLock(1, TimeUnit.SECONDS)) {
    try { /* 処理 */ }
    finally { lock.unlock(); }
}`,
    tips: [
      "複数のロックを取得する場合は、全スレッドで同じ順序にする",
      "synchronized よりも java.util.concurrent のLockクラスを使い、tryLock() でタイムアウトを設定する",
      "jstack コマンドでデッドロックの検出・診断ができる",
    ],
  },

  // ===== 追加: 実行時例外 =====
  {
    id: "negative-array-size",
    title: "NegativeArraySizeException",
    category: "runtime",
    description: "配列のサイズに負の値を指定した場合にスローされる例外。",
    cause: "new int[-1] のように、配列の長さとして負の整数を渡すと発生する。ユーザー入力や計算結果を配列サイズに使用する場合に注意が必要。",
    errorCode: `int size = -5;
int[] array = new int[size]; // NegativeArraySizeException!`,
    fixCode: `int size = -5;
if (size < 0) {
    throw new IllegalArgumentException("配列サイズは0以上: " + size);
}
int[] array = new int[size];`,
    tips: [
      "配列サイズにユーザー入力を使う場合は必ずバリデーションする",
      "Math.max(0, size) で負の値を防ぐこともできる",
    ],
  },
  {
    id: "array-store-exception",
    title: "ArrayStoreException",
    category: "runtime",
    description: "配列に互換性のない型のオブジェクトを格納しようとした場合にスローされる例外。",
    cause: "Java の配列は共変（covariant）であるため、Object[] arr = new String[3] のような代入が可能だが、arr[0] = 1 のように異なる型を格納すると実行時にエラーになる。",
    errorCode: `Object[] arr = new String[3];
arr[0] = 42; // ArrayStoreException!
// String配列にIntegerは格納できない`,
    fixCode: `// 型安全なコレクションを使用
List<String> list = new ArrayList<>();
// list.add(42); // コンパイルエラーで検出

// 配列を使う場合は正しい型で
String[] arr = new String[3];
arr[0] = "Hello";`,
    tips: [
      "配列よりもジェネリクス付きのコレクションを使うと型安全性が高まる",
      "配列の共変性はJavaの設計上の問題であり、ジェネリクスでは修正されている",
    ],
  },
  {
    id: "empty-stack-exception",
    title: "EmptyStackException",
    category: "runtime",
    description: "空のStackからpop()やpeek()しようとした場合にスローされる例外。",
    cause: "java.util.Stack が空の状態で要素を取り出そうとすると発生する。Deque（ArrayDeque）でも同様にNoSuchElementExceptionが発生する。",
    errorCode: `Stack<String> stack = new Stack<>();
stack.pop(); // EmptyStackException!

Deque<String> deque = new ArrayDeque<>();
deque.pop(); // NoSuchElementException!`,
    fixCode: `Stack<String> stack = new Stack<>();
if (!stack.isEmpty()) {
    String item = stack.pop();
}

// 推奨: Deque を使用
Deque<String> deque = new ArrayDeque<>();
String item = deque.poll(); // 空の場合は null を返す`,
    tips: [
      "java.util.Stack よりも ArrayDeque の使用が推奨される",
      "poll()/peek() は空の場合に null を返し、例外をスローしない",
    ],
  },
  {
    id: "no-such-element-exception",
    title: "NoSuchElementException",
    category: "runtime",
    description: "要素が存在しないコレクションやイテレータから要素を取得しようとした場合にスローされる例外。",
    cause: "Iterator の hasNext() を確認せずに next() を呼んだ場合、空の Optional に get() した場合、空の Stream で findFirst().get() した場合などに発生する。",
    errorCode: `// Iterator
List<String> list = List.of();
Iterator<String> it = list.iterator();
it.next(); // NoSuchElementException!

// Optional
Optional<String> opt = Optional.empty();
opt.get(); // NoSuchElementException!`,
    fixCode: `// Iterator
if (it.hasNext()) {
    String item = it.next();
}

// Optional (推奨)
String value = opt.orElse("デフォルト値");
String value2 = opt.orElseThrow(
    () -> new RuntimeException("値がありません"));`,
    tips: [
      "Optional.get() は原則使わず、orElse/orElseGet/orElseThrow を使う",
      "Iterator は hasNext() で確認してから next() を呼ぶ",
      "for-each 文を使えば Iterator の管理が不要になる",
    ],
  },
  {
    id: "stack-overflow-recursive",
    title: "再帰呼び出しによるStackOverflowError",
    category: "runtime",
    description: "終了条件のない再帰や、再帰の深さが深すぎる場合にコールスタックが溢れてスローされるエラー。",
    cause: "再帰メソッドの終了条件（ベースケース）が正しく定義されていない、または入力データが大きすぎて再帰の深さが -Xss で設定されたスタックサイズを超えた場合に発生する。",
    errorCode: `// 終了条件がない再帰
int factorial(int n) {
    return n * factorial(n - 1); // 無限再帰！
}`,
    fixCode: `// 終了条件を追加
int factorial(int n) {
    if (n <= 1) return 1; // ベースケース
    return n * factorial(n - 1);
}

// 深い再帰はループに変換
long factorialIterative(int n) {
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
    tips: [
      "再帰は必ず終了条件（ベースケース）を定義する",
      "深い再帰が予想される場合はループに変換する",
      "-Xss オプションでスタックサイズを増やすことも可能（根本解決ではない）",
    ],
  },
  {
    id: "security-exception",
    title: "SecurityException",
    category: "runtime",
    description: "セキュリティマネージャがセキュリティ違反を検出した場合にスローされる例外。",
    cause: "セキュリティマネージャが有効な環境で、許可されていない操作（ファイルアクセス、ネットワーク接続、システムプロパティの変更など）を行おうとした場合に発生する。Appletやサンドボックス環境で多く見られた。",
    errorCode: `// セキュリティマネージャが有効な環境で
System.setSecurityManager(new SecurityManager());
System.exit(0); // SecurityException!`,
    fixCode: `// ポリシーファイルで権限を設定
// java.policy:
// grant {
//     permission java.lang.RuntimePermission "exitVM.*";
// };

// または SecurityManager を使わない（Java 17以降は非推奨）`,
    tips: [
      "Java 17 で SecurityManager は非推奨になり、将来的に削除予定",
      "モダンなJavaではコンテナやOSレベルのセキュリティ機構を使用する",
    ],
  },
  {
    id: "pattern-syntax-exception",
    title: "PatternSyntaxException",
    category: "runtime",
    description: "正規表現のパターン構文が不正な場合にスローされる例外。",
    cause: "Pattern.compile() や String.matches() に不正な正規表現パターンを渡した場合に発生する。エスケープ忘れ、括弧の不一致、不正な量指定子などが原因。",
    errorCode: `// エスケープ忘れ
String pattern = "[a-z";  // 閉じ括弧がない
Pattern.compile(pattern); // PatternSyntaxException!

"hello".matches("***");  // 不正な量指定子`,
    fixCode: `// 正しいパターン
Pattern.compile("[a-z]");

// 特殊文字のエスケープ
Pattern.compile("\\\\[value\\\\]"); // 角括弧をリテラルとして

// Pattern.quote() でリテラルエスケープ
String userInput = "[test]";
Pattern.compile(Pattern.quote(userInput));`,
    tips: [
      "ユーザー入力を正規表現に使う場合は Pattern.quote() でエスケープする",
      "正規表現パターンは static final で定義し、再利用する",
      "複雑なパターンはコメント付き（Pattern.COMMENTS）で可読性を上げる",
    ],
  },
  {
    id: "date-time-exception",
    title: "DateTimeException",
    category: "runtime",
    description: "日付・時刻APIで不正な値を指定した場合にスローされる例外。java.time パッケージ（Java 8+）で使用。",
    cause: "月に13を指定、日に32を指定、存在しない日付（2月30日等）を作成しようとした場合に発生する。",
    errorCode: `LocalDate.of(2024, 13, 1); // DateTimeException: 月が範囲外
LocalDate.of(2024, 2, 30); // DateTimeException: 2月30日は存在しない
LocalTime.of(25, 0);       // DateTimeException: 時が範囲外`,
    fixCode: `// 正しい日付の作成
LocalDate date = LocalDate.of(2024, 2, 29); // うるう年なのでOK

// 文字列からのパース（例外ハンドリング付き）
try {
    LocalDate parsed = LocalDate.parse("2024-02-30");
} catch (DateTimeParseException e) {
    System.out.println("不正な日付: " + e.getMessage());
}

// 月末の取得
LocalDate lastDay = YearMonth.of(2024, 2).atEndOfMonth();
// 2024-02-29`,
    tips: [
      "java.time API は不正な値を許容しないので安全",
      "レガシーな Date/Calendar より java.time の使用を推奨",
      "YearMonth.atEndOfMonth() で月末を安全に取得できる",
    ],
  },
  {
    id: "type-not-present-exception",
    title: "TypeNotPresentException",
    category: "runtime",
    description: "アノテーション処理中に、参照されている型が見つからない場合にスローされる例外。",
    cause: "アノテーションの要素が参照するクラスがクラスパスに存在しない場合に発生する。コンパイル時には存在したが、実行時に依存ライブラリが不足している場合が多い。",
    errorCode: `// コンパイル時には存在したクラスが実行時にない
@MyAnnotation(value = MissingClass.class)
public class Example { }
// TypeNotPresentException!`,
    fixCode: `// 依存ライブラリをクラスパスに追加
// build.gradle
dependencies {
    implementation 'com.example:missing-lib:1.0'
}

// Maven
// <dependency>
//     <groupId>com.example</groupId>
//     <artifactId>missing-lib</artifactId>
// </dependency>`,
    tips: [
      "依存関係の管理ツール（Gradle/Maven）で全ての必要なライブラリを宣言する",
      "optional 依存の場合はリフレクションで存在チェックする",
    ],
  },
  {
    id: "completion-exception",
    title: "CompletionException",
    category: "runtime",
    description: "CompletableFuture の非同期処理中に例外が発生した場合にラップされてスローされる例外。",
    cause: "CompletableFuture のチェーン（thenApply, thenCompose等）内で例外が発生すると、CompletionException にラップされる。join() で結果を取得する際にスローされる。",
    errorCode: `CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> {
        throw new RuntimeException("非同期エラー");
    });
future.join(); // CompletionException!`,
    fixCode: `CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> riskyOperation())
    .exceptionally(ex -> {
        logger.error("非同期処理失敗", ex);
        return "デフォルト値";
    });

// handle() で成功・失敗の両方を処理
future.handle((result, ex) -> {
    if (ex != null) return "エラー: " + ex.getMessage();
    return result;
});`,
    tips: [
      "exceptionally() や handle() でエラーハンドリングする",
      "get() は ExecutionException をスロー、join() は CompletionException をスロー",
      "CompletionException.getCause() で元の例外を取得できる",
    ],
  },
  {
    id: "missing-format-argument",
    title: "MissingFormatArgumentException",
    category: "runtime",
    description: "String.format() や printf() でフォーマット文字列の引数が不足している場合にスローされる例外。",
    cause: "フォーマット指定子（%s, %d等）の数と引数の数が一致しない場合に発生する。",
    errorCode: `// 引数が足りない
String.format("名前: %s, 年齢: %d", "太郎");
// MissingFormatArgumentException: Format specifier '%d'

System.out.printf("%s は %d 歳で %s に住んでいます%n", "太郎", 25);
// MissingFormatArgumentException!`,
    fixCode: `// 引数の数を一致させる
String.format("名前: %s, 年齢: %d", "太郎", 25);

// インデックス指定で再利用
String.format("%1$s は %2$d 歳。%1$s さんこんにちは", "太郎", 25);

// Java 15+ formatted()
"名前: %s, 年齢: %d".formatted("太郎", 25);`,
    tips: [
      "フォーマット指定子と引数の数を常に一致させる",
      "IDE の警告機能を活用してフォーマットミスを検出する",
      "テンプレートエンジンの使用も検討する",
    ],
  },
  {
    id: "illegal-format-conversion",
    title: "IllegalFormatConversionException",
    category: "runtime",
    description: "String.format() でフォーマット指定子と引数の型が一致しない場合にスローされる例外。",
    cause: "%d に文字列を渡す、%s にフォーマット不可能なオブジェクトを渡すなど、型の不一致で発生する。",
    errorCode: `String.format("%d", "文字列"); // IllegalFormatConversionException!
// %d は整数用だが文字列を渡している`,
    fixCode: `// 正しい型の組み合わせ
String.format("%s", "文字列");  // %s: 文字列
String.format("%d", 42);       // %d: 整数
String.format("%f", 3.14);     // %f: 浮動小数点
String.format("%b", true);     // %b: 真偽値
String.format("%tF", LocalDate.now()); // %t: 日時`,
    tips: [
      "%s は任意のオブジェクトの toString() を呼ぶので最も安全",
      "型に迷う場合は %s を使えば例外は発生しない",
    ],
  },

  // ===== 追加: チェック例外 =====
  {
    id: "malformed-url-exception",
    title: "MalformedURLException",
    category: "checked",
    description: "不正な形式のURLを指定した場合にスローされるチェック例外。",
    cause: "プロトコルが指定されていない、不正な文字が含まれるなど、URLの形式が正しくない場合に発生する。",
    errorCode: `URL url = new URL("not-a-valid-url");
// MalformedURLException: no protocol

URL url2 = new URL("htp://example.com");
// MalformedURLException: unknown protocol`,
    fixCode: `// 正しいURL
URL url = new URL("https://example.com/api/users");

// Java 20+: URI.toURL() を推奨
URI uri = URI.create("https://example.com");
URL url = uri.toURL();

// バリデーション
try {
    URI uri = new URI(userInput);
    uri.toURL(); // 形式チェック
} catch (URISyntaxException | MalformedURLException e) {
    System.out.println("不正なURL: " + e.getMessage());
}`,
    tips: [
      "URL コンストラクタよりも URI を使い、URI.create() や new URI() を推奨",
      "ユーザー入力の URL は必ずバリデーションする",
    ],
  },
  {
    id: "socket-exception",
    title: "SocketException / ConnectException",
    category: "checked",
    description: "ソケット操作中にエラーが発生した場合にスローされる例外。ConnectException は接続拒否された場合のサブクラス。",
    cause: "接続先サーバーが起動していない、ポートが間違っている、ファイアウォールでブロックされている、ネットワークが利用不可能な場合などに発生する。",
    errorCode: `// サーバーが起動していない場合
Socket socket = new Socket("localhost", 9999);
// ConnectException: Connection refused

// タイムアウト
URL url = new URL("https://slow-server.example.com");
url.openConnection().getInputStream();
// SocketTimeoutException`,
    fixCode: `// タイムアウト設定とリトライ
Socket socket = new Socket();
try {
    socket.connect(new InetSocketAddress("localhost", 9999), 5000);
} catch (ConnectException e) {
    System.out.println("接続失敗: " + e.getMessage());
    // リトライロジック
}

// HttpClient でのタイムアウト設定
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();`,
    tips: [
      "ネットワーク操作には必ずタイムアウトを設定する",
      "リトライ時は指数バックオフ（Exponential Backoff）を使う",
      "接続エラーは環境依存なので、適切なログ出力が重要",
    ],
  },
  {
    id: "unsupported-encoding-exception",
    title: "UnsupportedEncodingException",
    category: "checked",
    description: "指定された文字エンコーディングがサポートされていない場合にスローされるチェック例外。",
    cause: "String.getBytes(\"encoding\") や new InputStreamReader(is, \"encoding\") でサポートされていないエンコーディング名を指定した場合に発生する。",
    errorCode: `byte[] bytes = "Hello".getBytes("UTF-99");
// UnsupportedEncodingException!`,
    fixCode: `// StandardCharsets を使用（例外が発生しない）
byte[] bytes = "Hello".getBytes(StandardCharsets.UTF_8);

// Charset.forName() でバリデーション
if (Charset.isSupported("Shift_JIS")) {
    byte[] sjis = "こんにちは".getBytes(Charset.forName("Shift_JIS"));
}`,
    tips: [
      "文字列のエンコーディング指定は StandardCharsets 定数を使い、文字列リテラルを避ける",
      "StandardCharsets.UTF_8 を使えば UnsupportedEncodingException は発生しない",
    ],
  },
  {
    id: "timeout-exception",
    title: "TimeoutException",
    category: "checked",
    description: "操作がタイムアウトした場合にスローされるチェック例外。Future.get() やロックの取得待ちなどで使用される。",
    cause: "Future.get(timeout, unit) で指定時間内に結果が得られなかった場合や、CompletableFuture.orTimeout() で設定したタイムアウトを超過した場合に発生する。",
    errorCode: `ExecutorService executor = Executors.newSingleThreadExecutor();
Future<String> future = executor.submit(() -> {
    Thread.sleep(10000); // 10秒かかる処理
    return "完了";
});
future.get(3, TimeUnit.SECONDS); // TimeoutException!`,
    fixCode: `try {
    String result = future.get(3, TimeUnit.SECONDS);
} catch (TimeoutException e) {
    future.cancel(true); // タスクをキャンセル
    System.out.println("処理がタイムアウトしました");
}

// CompletableFuture (Java 9+)
CompletableFuture.supplyAsync(() -> heavyTask())
    .orTimeout(3, TimeUnit.SECONDS)
    .exceptionally(ex -> "タイムアウト時のデフォルト値");`,
    tips: [
      "非同期処理には必ずタイムアウトを設定する",
      "タイムアウト後は future.cancel(true) でタスクをキャンセルする",
      "CompletableFuture.orTimeout() で簡潔にタイムアウト処理を記述できる",
    ],
  },
  {
    id: "clone-not-supported",
    title: "CloneNotSupportedException",
    category: "checked",
    description: "Cloneable インターフェースを実装していないオブジェクトで clone() を呼んだ場合にスローされるチェック例外。",
    cause: "clone() メソッドは Object クラスに定義されているが、Cloneable を実装していないクラスで呼ぶと例外になる。",
    errorCode: `class MyClass {
    int value;
}
MyClass obj = new MyClass();
obj.clone(); // CloneNotSupportedException!`,
    fixCode: `// 方法1: Cloneable を実装
class MyClass implements Cloneable {
    int value;
    @Override
    public MyClass clone() {
        try {
            return (MyClass) super.clone();
        } catch (CloneNotSupportedException e) {
            throw new AssertionError(); // 到達しない
        }
    }
}

// 方法2: コピーコンストラクタ（推奨）
class MyClass {
    int value;
    MyClass(MyClass other) {
        this.value = other.value;
    }
}`,
    tips: [
      "clone() よりもコピーコンストラクタやファクトリメソッドの使用を推奨",
      "Effective Java でも clone() の使用は非推奨とされている",
    ],
  },
  {
    id: "reflection-exception",
    title: "ReflectiveOperationException 系",
    category: "checked",
    description: "リフレクション操作中に発生する例外の総称。NoSuchMethodException、NoSuchFieldException、IllegalAccessException を含む。",
    cause: "存在しないメソッドやフィールドへのアクセス、アクセス修飾子による制限、インスタンス化できないクラスの操作などで発生する。",
    errorCode: `// 存在しないメソッド
Class<?> cls = String.class;
cls.getMethod("nonExistent"); // NoSuchMethodException!

// privateフィールドへのアクセス
Field field = cls.getDeclaredField("value");
field.get("hello"); // IllegalAccessException!`,
    fixCode: `// メソッドの存在確認
try {
    Method m = cls.getMethod("length");
    Object result = m.invoke("hello"); // 5
} catch (NoSuchMethodException e) {
    System.out.println("メソッドが見つかりません");
}

// privateフィールドへのアクセス
Field field = cls.getDeclaredField("value");
field.setAccessible(true); // アクセス許可
Object value = field.get("hello");`,
    tips: [
      "リフレクションは型安全性が失われるため、可能な限り避ける",
      "Java 9以降のモジュールシステムではアクセス制限が厳格化された",
      "フレームワーク開発以外ではリフレクションの使用は稀",
    ],
  },

  // ===== 追加: エラー =====
  {
    id: "virtual-machine-error",
    title: "InternalError / VirtualMachineError",
    category: "error",
    description: "JVM内部でリカバリ不能なエラーが発生した場合にスローされるエラー。OutOfMemoryError や StackOverflowError の親クラス。",
    cause: "JVMのバグ、ネイティブメモリの枯渇、JNIの不正な使用、ハードウェア障害など、アプリケーションコードでは対処できない問題で発生する。",
    errorCode: `// 例: ネイティブメモリの枯渇
// java.lang.OutOfMemoryError: Direct buffer memory
ByteBuffer.allocateDirect(Integer.MAX_VALUE);

// メタスペースの枯渇
// java.lang.OutOfMemoryError: Metaspace`,
    fixCode: `// JVMオプションで対処
// -XX:MaxDirectMemorySize=256m  (ダイレクトバッファ)
// -XX:MaxMetaspaceSize=256m     (メタスペース)
// -XX:+HeapDumpOnOutOfMemoryError (ダンプ出力)
// -XX:HeapDumpPath=/tmp/dump.hprof

// ダイレクトバッファの適切な管理
ByteBuffer buffer = ByteBuffer.allocateDirect(1024);
// 使用後にGCを促す（ただし保証はない）`,
    tips: [
      "VirtualMachineError は catch しても回復できないことが多い",
      "-XX:+HeapDumpOnOutOfMemoryError で障害解析用のダンプを取得する",
      "モニタリングツール（JMX、Prometheus等）でJVMメトリクスを監視する",
    ],
  },
  {
    id: "unsatisfied-link-error",
    title: "UnsatisfiedLinkError",
    category: "error",
    description: "ネイティブライブラリ（.dll, .so, .dylib）のロードに失敗した場合にスローされるエラー。",
    cause: "System.loadLibrary() で指定したネイティブライブラリが見つからない、またはアーキテクチャ（32bit/64bit）が不一致の場合に発生する。",
    errorCode: `// ネイティブライブラリが見つからない
System.loadLibrary("mylib");
// UnsatisfiedLinkError: no mylib in java.library.path`,
    fixCode: `// ライブラリパスの指定
// java -Djava.library.path=/path/to/libs MyApp

// 絶対パスで指定
System.load("/usr/local/lib/libmylib.so");

// 存在確認
try {
    System.loadLibrary("mylib");
} catch (UnsatisfiedLinkError e) {
    System.err.println("ネイティブライブラリが見つかりません: " + e);
    // フォールバック処理
}`,
    tips: [
      "java.library.path にライブラリのディレクトリを追加する",
      "OS とアーキテクチャ（x86/ARM）の一致を確認する",
      "Java 22+ の Foreign Function & Memory API でJNIを置き換え可能",
    ],
  },
  {
    id: "exception-in-initializer",
    title: "ExceptionInInitializerError",
    category: "error",
    description: "static初期化ブロックまたはstaticフィールドの初期化中に例外が発生した場合にスローされるエラー。",
    cause: "クラスのロード時にstatic初期化子で未チェック例外が発生すると、その例外がExceptionInInitializerErrorにラップされる。以後そのクラスはNoClassDefFoundErrorでロード不可になる。",
    errorCode: `class Config {
    static final int PORT = Integer.parseInt("abc"); // NumberFormatException
    // → ExceptionInInitializerError にラップされる
}

class Startup {
    static {
        throw new RuntimeException("初期化失敗");
        // ExceptionInInitializerError!
    }
}`,
    fixCode: `class Config {
    static final int PORT;
    static {
        try {
            PORT = Integer.parseInt(
                System.getenv().getOrDefault("PORT", "8080"));
        } catch (NumberFormatException e) {
            throw new ExceptionInInitializerError(
                "PORT の設定が不正: " + e.getMessage());
        }
    }
}`,
    tips: [
      "static 初期化ブロックでは例外処理を慎重に行う",
      "初期化エラーは getCause() で元の例外を取得できる",
      "一度失敗すると NoClassDefFoundError でクラスが使用不可になる",
    ],
  },
  {
    id: "assertion-error",
    title: "AssertionError",
    category: "error",
    description: "assert文のアサーションが失敗した場合にスローされるエラー。テストや内部不変条件の検証に使用する。",
    cause: "assert 式 が false になった場合に発生する。-ea（enableassertions）オプションで有効化する必要がある。デフォルトでは無効。",
    errorCode: `// -ea オプションで実行
int age = -1;
assert age >= 0 : "年齢は0以上: " + age;
// AssertionError: 年齢は0以上: -1`,
    fixCode: `// assert は内部不変条件の検証に使用
private void processAge(int age) {
    assert age >= 0 && age <= 150 : "不正な年齢: " + age;
    // ...
}

// 公開APIのバリデーションには例外を使う
public void setAge(int age) {
    if (age < 0 || age > 150) {
        throw new IllegalArgumentException("不正な年齢: " + age);
    }
}`,
    tips: [
      "assert は開発・テスト時の内部検証用。本番では無効化されることが前提",
      "公開APIの引数チェックには IllegalArgumentException を使う",
      "テストでは JUnit の assert メソッドや AssertJ を使う",
    ],
  },

  // ===== 追加: Spring/フレームワーク =====
  {
    id: "bean-creation-exception",
    title: "BeanCreationException",
    category: "spring",
    description: "SpringのBean（コンポーネント）の生成に失敗した場合にスローされる例外。アプリケーション起動時に最もよく遭遇するSpring例外。",
    cause: "コンストラクタインジェクションの依存が見つからない、設定値が不正、Bean初期化メソッドで例外が発生するなどの原因。循環依存も典型的な原因。",
    errorCode: `// 依存するBeanが見つからない
@Service
public class OrderService {
    private final PaymentGateway gateway; // Beanが未定義
    public OrderService(PaymentGateway gateway) {
        this.gateway = gateway;
    }
}
// BeanCreationException: No qualifying bean of type 'PaymentGateway'`,
    fixCode: `// 1. 依存するBeanを定義
@Component
public class StripePaymentGateway implements PaymentGateway {
    // ...
}

// 2. Optional な依存には @Autowired(required = false)
@Autowired(required = false)
private PaymentGateway gateway;

// 3. 複数の実装がある場合は @Qualifier で指定
@Autowired
@Qualifier("stripeGateway")
private PaymentGateway gateway;`,
    tips: [
      "エラーメッセージの 'No qualifying bean' 部分をよく読み、どのBeanが不足しているか確認する",
      "循環依存は設計の見直しが必要（@Lazy で一時回避は可能）",
      "コンポーネントスキャンの範囲が正しいか確認する",
    ],
  },
  {
    id: "no-such-bean-definition",
    title: "NoSuchBeanDefinitionException",
    category: "spring",
    description: "要求されたBeanがSpringコンテナに定義されていない場合にスローされる例外。",
    cause: "@Component、@Service、@Repository 等のアノテーションが付いていない、コンポーネントスキャンの範囲外、条件付きBeanの条件が満たされていないなどが原因。",
    errorCode: `// アノテーションが付いていない
public class MyService { } // @Service がない

@Autowired
private MyService service; // NoSuchBeanDefinitionException!`,
    fixCode: `// アノテーションを追加
@Service
public class MyService { }

// または Java Config で定義
@Configuration
public class AppConfig {
    @Bean
    public MyService myService() {
        return new MyService();
    }
}`,
    tips: [
      "クラスに @Component / @Service / @Repository / @Controller が付いているか確認",
      "@ComponentScan のベースパッケージを確認する",
      "条件付きBean（@ConditionalOnProperty 等）の条件を確認する",
    ],
  },
  {
    id: "http-message-not-readable",
    title: "HttpMessageNotReadableException",
    category: "spring",
    description: "Spring MVCでリクエストボディのデシリアライズに失敗した場合にスローされる例外。",
    cause: "不正なJSON形式のリクエストボディ、Content-Typeヘッダーの不一致、型の不一致（文字列フィールドに数値等）などで発生する。",
    errorCode: `// 不正なJSON
// POST /api/users
// Content-Type: application/json
// Body: { name: "太郎" }  ← キーがクォートされていない
// HttpMessageNotReadableException!

// 型の不一致
// Body: { "age": "twenty" }  ← 数値フィールドに文字列
@PostMapping("/users")
public User create(@RequestBody User user) { ... }`,
    fixCode: `// 正しいJSONを送信
// { "name": "太郎", "age": 25 }

// グローバルエラーハンドリング
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(
            HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest()
            .body(new ErrorResponse("リクエスト形式が不正です"));
    }
}`,
    tips: [
      "API のリクエストには Content-Type: application/json を設定する",
      "@RestControllerAdvice でグローバルにエラーハンドリングする",
      "Jackson のデシリアライズエラーメッセージは詳細なので、クライアントにはマスクする",
    ],
  },
  {
    id: "method-not-allowed",
    title: "HttpRequestMethodNotSupportedException",
    category: "spring",
    description: "サポートされていないHTTPメソッドでリクエストした場合にスローされる例外（405 Method Not Allowed）。",
    cause: "@GetMapping のエンドポイントに POST リクエストを送った場合や、@RequestMapping の method 属性と一致しないメソッドでアクセスした場合に発生する。",
    errorCode: `@GetMapping("/users")
public List<User> getUsers() { ... }

// POST /users → 405 Method Not Allowed
// HttpRequestMethodNotSupportedException`,
    fixCode: `// 正しいHTTPメソッドを使用
@GetMapping("/users")       // GET のみ
@PostMapping("/users")      // POST のみ
@PutMapping("/users/{id}")  // PUT のみ
@DeleteMapping("/users/{id}") // DELETE のみ

// 複数メソッドを許可
@RequestMapping(value = "/users",
    method = {RequestMethod.GET, RequestMethod.POST})`,
    tips: [
      "REST API では適切なHTTPメソッドを使い分ける",
      "CORS 設定が原因で OPTIONS リクエストが405になるケースもある",
    ],
  },
  {
    id: "data-integrity-violation",
    title: "DataIntegrityViolationException",
    category: "spring",
    description: "DBの整合性制約（一意制約、外部キー制約、NOT NULL制約等）に違反した場合にSpring Dataがスローする例外。",
    cause: "一意制約のカラムに重複値を挿入、NOT NULLカラムにnullを挿入、外部キーが参照するレコードが存在しないなどの場合に発生する。SQLExceptionをSpringがラップしたもの。",
    errorCode: `// 一意制約違反
@Entity
public class User {
    @Column(unique = true)
    private String email;
}

userRepo.save(new User("test@example.com"));
userRepo.save(new User("test@example.com")); // DataIntegrityViolationException!`,
    fixCode: `// 事前チェック
if (userRepo.existsByEmail(email)) {
    throw new DuplicateEmailException("既に登録済みのメールアドレスです");
}

// または例外ハンドリング
try {
    userRepo.save(user);
} catch (DataIntegrityViolationException e) {
    if (e.getCause() instanceof ConstraintViolationException) {
        throw new DuplicateEmailException("メールアドレスが重複しています");
    }
    throw e;
}`,
    tips: [
      "一意制約違反は事前チェックか例外ハンドリングで対応する",
      "Spring の @ExceptionHandler でユーザーフレンドリーなエラーメッセージを返す",
      "根本原因は getCause() で確認する",
    ],
  },
  {
    id: "lazy-initialization-exception",
    title: "LazyInitializationException",
    category: "spring",
    description: "Hibernateの遅延読み込み（Lazy Loading）がセッション外で実行された場合にスローされる例外。",
    cause: "JPA/Hibernate でデフォルトの FetchType.LAZY で読み込まれた関連エンティティに、トランザクション（セッション）終了後にアクセスすると発生する。コントローラーでエンティティの関連コレクションにアクセスする場合に多い。",
    errorCode: `@Entity
public class User {
    @OneToMany(mappedBy = "user") // デフォルト: LAZY
    private List<Order> orders;
}

// サービス層でトランザクション終了後
User user = userService.findById(1L);
user.getOrders().size(); // LazyInitializationException!`,
    fixCode: `// 方法1: JOIN FETCH
@Query("SELECT u FROM User u JOIN FETCH u.orders WHERE u.id = :id")
User findByIdWithOrders(@Param("id") Long id);

// 方法2: @EntityGraph
@EntityGraph(attributePaths = {"orders"})
Optional<User> findById(Long id);

// 方法3: DTO に変換（推奨）
@Transactional(readOnly = true)
public UserDto getUserWithOrders(Long id) {
    User user = repo.findByIdWithOrders(id);
    return UserDto.from(user); // トランザクション内で変換
}`,
    tips: [
      "エンティティをそのままコントローラーから返さず、DTO に変換する",
      "open-in-view はアンチパターンとされ、spring.jpa.open-in-view=false を推奨",
      "必要な関連データは JOIN FETCH や @EntityGraph で明示的に取得する",
    ],
  },

  // ===== 追加: DB・JDBC =====
  {
    id: "jdbc-connection-failure",
    title: "JDBC接続エラー",
    category: "jdbc",
    description: "データベースへの接続に失敗した場合にスローされる例外。SQLExceptionのサブクラス。",
    cause: "データベースが起動していない、接続URLが間違っている、認証情報が不正、ファイアウォールでブロック、コネクションプールの枯渇などで発生する。",
    errorCode: `// 接続URLが間違っている
Connection conn = DriverManager.getConnection(
    "jdbc:postgresql://localhost:5432/wrongdb",
    "user", "password");
// SQLException: FATAL: database "wrongdb" does not exist

// コネクションプール枯渇
// HikariPool-1 - Connection is not available, request timed out after 30000ms`,
    fixCode: `# application.yml で正しい接続設定
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: myuser
    password: mypassword
    hikari:
      maximum-pool-size: 10
      connection-timeout: 30000
      # 接続テスト
      connection-test-query: SELECT 1

# 接続エラー時のリトライ
# spring.datasource.hikari.initialization-fail-timeout: 0`,
    tips: [
      "JDBC URLの形式を確認する（jdbc:postgresql://host:port/db）",
      "データベースが起動していることを確認する",
      "コネクションプールのサイズとタイムアウトを適切に設定する",
      "HikariCP のメトリクスを監視してプール枯渇を検知する",
    ],
  },
  {
    id: "sql-syntax-error",
    title: "SQLSyntaxErrorException",
    category: "jdbc",
    description: "SQL文の構文が不正な場合にスローされる例外。",
    cause: "SQLのキーワードのスペルミス、テーブル名・カラム名の誤り、カンマの過不足、予約語の衝突などで発生する。",
    errorCode: `// テーブル名の誤り
SELECT * FROM usr; -- テーブル名は "users"

// 予約語との衝突
CREATE TABLE order (  -- "order" はSQL予約語
    id INT PRIMARY KEY
);

// カンマの余分
SELECT name, age, FROM users;`,
    fixCode: `-- テーブル名を正しく
SELECT * FROM users;

-- 予約語はバッククォート等でエスケープ
CREATE TABLE \`order\` (id INT PRIMARY KEY);
-- PostgreSQL: "order"

-- JPA の @Table で明示
@Entity
@Table(name = "orders") // 予約語を避ける
public class Order { }`,
    tips: [
      "テーブル名・カラム名にSQLの予約語を使わない",
      "SQLログを有効にしてJPAが生成するSQLを確認する",
      "spring.jpa.show-sql=true でSQL出力",
    ],
  },
  {
    id: "transaction-rollback",
    title: "TransactionRollbackException",
    category: "jdbc",
    description: "トランザクションがロールバックされた場合にスローされる例外。デッドロック検出やタイムアウトでも発生する。",
    cause: "トランザクション中に例外が発生、デッドロックが検出された、タイムアウト、楽観的ロックの競合などで発生する。Spring では @Transactional メソッドで unchecked 例外がスローされると自動ロールバック。",
    errorCode: `@Transactional
public void transfer(Long fromId, Long toId, BigDecimal amount) {
    Account from = accountRepo.findById(fromId).orElseThrow();
    Account to = accountRepo.findById(toId).orElseThrow();
    from.debit(amount);  // 残高不足で RuntimeException
    to.credit(amount);   // ここには到達しない
}
// → トランザクション全体がロールバック`,
    fixCode: `@Transactional
public void transfer(Long fromId, Long toId, BigDecimal amount) {
    Account from = accountRepo.findByIdForUpdate(fromId)
        .orElseThrow(() -> new AccountNotFoundException(fromId));

    if (from.getBalance().compareTo(amount) < 0) {
        throw new InsufficientFundsException("残高不足");
    }

    Account to = accountRepo.findByIdForUpdate(toId)
        .orElseThrow(() -> new AccountNotFoundException(toId));

    from.debit(amount);
    to.credit(amount);
}

// checked例外でもロールバックしたい場合
@Transactional(rollbackFor = BusinessException.class)`,
    tips: [
      "unchecked例外は自動ロールバック、checked例外はrollbackForで指定が必要",
      "デッドロック防止: ロックの取得順序を統一する",
      "@Transactional の self-invocation（同一クラス内呼び出し）では AOP が効かない",
    ],
  },
  // ===== コンパイルエラー (Compile Errors) - 追加分 =====
  {
    id: "duplicate-class",
    title: "duplicate class エラー",
    category: "compile",
    description:
      "同じ完全修飾名（パッケージ名 + クラス名）を持つクラスが複数のファイルに定義されている場合に発生するコンパイルエラー。プロジェクトの構成ミスやコピー＆ペーストの際に起きやすい。",
    cause:
      "同じパッケージ内に同名のクラスファイルが2つ存在する、または異なるソースディレクトリに同じパッケージ・クラス名の組み合わせが存在する場合に発生する。マルチモジュールプロジェクトや、テストコードで本番コードと同名のクラスを作ってしまうケースもある。",
    errorCode: `// ファイル1: src/main/java/com/example/Utils.java
package com.example;
public class Utils {
    public static String format(String s) { return s.trim(); }
}

// ファイル2: src/main/java/com/example/util/Utils.java
package com.example; // パッケージ名が同じ（ディレクトリと不一致）
public class Utils {  // duplicate class!
    public static int parse(String s) { return Integer.parseInt(s); }
}
// error: duplicate class: com.example.Utils`,
    fixCode: `// ファイル1: src/main/java/com/example/StringUtils.java
package com.example;
public class StringUtils {
    public static String format(String s) { return s.trim(); }
}

// ファイル2: src/main/java/com/example/util/ParseUtils.java
package com.example.util; // パッケージ名を正しく設定
public class ParseUtils {
    public static int parse(String s) { return Integer.parseInt(s); }
}`,
    tips: [
      "パッケージ名はディレクトリ構造と一致させる（com.example → com/example/）",
      "クラス名が衝突する場合は、より具体的な名前（StringUtils, DateUtils 等）にリネームする",
      "IDE の「重複クラス」検出機能を活用して早期に発見する",
      "マルチモジュールプロジェクトでは、各モジュールのパッケージ名を明確に分ける",
    ],
  },
  {
    id: "method-does-not-override",
    title: "method does not override エラー",
    category: "compile",
    description:
      "@Override アノテーションを付けたメソッドが、実際にはスーパークラスやインターフェースのメソッドをオーバーライドしていない場合に発生するコンパイルエラー。メソッドシグネチャの不一致が原因。",
    cause:
      "メソッド名のタイプミス、引数の型や数の不一致、戻り値型の互換性のなさ、アクセス修飾子の制限違反（例: public を protected に変更）などが原因。スーパークラスのメソッドシグネチャが変更された場合にも発生する。",
    errorCode: `public class Animal {
    public void speak(String sound) {
        System.out.println(sound);
    }
}

public class Dog extends Animal {
    @Override
    public void speak(int volume) { // 引数の型が異なる!
        System.out.println("Woof! Volume: " + volume);
    }
    // error: method does not override or implement
    // a method from a supertype
}`,
    fixCode: `public class Animal {
    public void speak(String sound) {
        System.out.println(sound);
    }
}

public class Dog extends Animal {
    @Override
    public void speak(String sound) { // 正しいシグネチャ
        System.out.println("Dog says: " + sound);
    }
}`,
    tips: [
      "@Override アノテーションを必ず付けて、コンパイル時にオーバーライドの正しさを検証する",
      "IDE の「メソッドのオーバーライド」自動生成機能を使うと、シグネチャの不一致を防げる",
      "スーパークラスのメソッドを変更した際は、サブクラスの @Override メソッドも確認する",
      "オーバーロード（同名で異なる引数）とオーバーライド（同じシグネチャ）の違いを意識する",
    ],
  },
  {
    id: "illegal-start-of-expression",
    title: "illegal start of expression",
    category: "compile",
    description:
      "構文的に式（expression）が期待される場所に不正なトークンが現れた場合に発生するコンパイルエラー。アクセス修飾子の誤った位置、セミコロンの欠落、波括弧の不整合など、さまざまな構文ミスで発生する。",
    cause:
      "メソッド内部で public/private などのアクセス修飾子を使用した場合、セミコロンの付け忘れ、波括弧の対応の崩れ、不正な演算子の使用などが原因。実際のエラー箇所より数行上に原因があることも多い。",
    errorCode: `public class Main {
    public static void main(String[] args) {
        // メソッド内でアクセス修飾子を使用（不可）
        private int count = 0;
        // error: illegal start of expression

        // セミコロンの欠落
        String name = "Java"  // ← セミコロンが無い
        System.out.println(name);
        // error: illegal start of expression
    }
}`,
    fixCode: `public class Main {
    public static void main(String[] args) {
        // ローカル変数にアクセス修飾子は不要
        int count = 0;

        // セミコロンを正しく付ける
        String name = "Java";
        System.out.println(name);
    }
}`,
    tips: [
      "ローカル変数にはアクセス修飾子（public, private 等）を付けられない",
      "エラーが発生した行だけでなく、直前の行にセミコロン忘れがないか確認する",
      "IDE の自動フォーマット（Ctrl+Shift+F / Cmd+Shift+F）で波括弧の対応を確認する",
      "エラーメッセージの位置と実際の原因がずれることがあるため、周辺のコードも確認する",
    ],
  },
  {
    id: "reached-end-of-file",
    title: "reached end of file while parsing",
    category: "compile",
    description:
      "ソースファイルの終端に達したが、まだ閉じ波括弧（}）が不足している場合に発生するコンパイルエラー。クラスやメソッドの波括弧が正しく閉じられていないことを示す。",
    cause:
      "波括弧の開き（{）と閉じ（}）の数が合っていない場合に発生する。深いネスト、コピー＆ペーストのミス、条件分岐やループのブロックの閉じ忘れなどが原因。",
    errorCode: `public class Main {
    public static void main(String[] args) {
        if (args.length > 0) {
            for (String arg : args) {
                System.out.println(arg);
            // } ← for の閉じ括弧を忘れている
        }
    }
// error: reached end of file while parsing`,
    fixCode: `public class Main {
    public static void main(String[] args) {
        if (args.length > 0) {
            for (String arg : args) {
                System.out.println(arg);
            } // for の閉じ括弧
        } // if の閉じ括弧
    } // main の閉じ括弧
} // class の閉じ括弧`,
    tips: [
      "IDE の波括弧マッチング機能（対応する括弧のハイライト）を活用する",
      "コードのインデントを正しく保つことで、波括弧の不整合を視覚的に発見しやすくなる",
      "IDE の自動フォーマットを実行して、構造の崩れを検出する",
      "波括弧の対応が分かりにくくなったら、メソッドを分割してネストを浅くする",
    ],
  },
  {
    id: "unclosed-string-literal",
    title: "unclosed string literal",
    category: "compile",
    description:
      "文字列リテラルが正しく閉じられていない場合に発生するコンパイルエラー。ダブルクォーテーション（\"）の閉じ忘れや、文字列リテラル内での改行が原因。",
    cause:
      "ダブルクォーテーションの閉じ忘れ、文字列内の改行（従来のString では不可）、エスケープされていないダブルクォーテーションの使用などが原因。長い文字列を複数行にまたがって記述しようとした場合にも発生する。",
    errorCode: `// 閉じクォーテーションの欠落
String message = "Hello, World!;
// error: unclosed string literal

// 文字列内での改行（Java 14以前）
String html = "<html>
    <body>Hello</body>
</html>"; // error: unclosed string literal

// エスケープ忘れ
String json = "{"name": "Java"}";
// error: unclosed string literal`,
    fixCode: `// クォーテーションを正しく閉じる
String message = "Hello, World!";

// 方法1: 文字列連結
String html = "<html>\\n" +
    "    <body>Hello</body>\\n" +
    "</html>";

// 方法2: テキストブロック（Java 15+、推奨）
String html = """
    <html>
        <body>Hello</body>
    </html>
    """;

// ダブルクォーテーションのエスケープ
String json = "{\\"name\\": \\"Java\\"}";

// テキストブロックならエスケープ不要
String json = """
    {"name": "Java"}
    """;`,
    tips: [
      "Java 15以降はテキストブロック（\"\"\"...\"\"\"）で複数行文字列を簡潔に書ける",
      "文字列内にダブルクォーテーションを含める場合は \\\" でエスケープする",
      "IDE のシンタックスハイライトで、文字列が正しく閉じられているか視覚的に確認する",
      "テキストブロック内では \\n や \\\" は不要だが、末尾の空白制御に注意する",
    ],
  },
  {
    id: "cannot-assign-final",
    title: "cannot assign a value to final variable",
    category: "compile",
    description:
      "final 修飾子が付いた変数に再代入しようとした場合に発生するコンパイルエラー。final 変数は一度だけ値を代入でき、以降は変更できない。",
    cause:
      "final 宣言されたローカル変数、フィールド、またはメソッドパラメータに対して値を再代入しようとすると発生する。コンストラクタ外での final フィールドへの代入もエラーとなる。",
    errorCode: `public class Config {
    private final String appName = "MyApp";

    public void updateName(String name) {
        appName = name; // error: cannot assign a value to final variable appName
    }
}

public void process(final int value) {
    value = value + 1; // error: cannot assign a value to final variable value
}`,
    fixCode: `public class Config {
    private final String appName; // コンストラクタで初期化

    public Config(String appName) {
        this.appName = appName; // final フィールドはコンストラクタで1回だけ代入可能
    }

    public String getAppName() {
        return appName;
    }

    // 値を変更したい場合は新しいインスタンスを作成
    public Config withAppName(String newName) {
        return new Config(newName);
    }
}

public void process(int value) { // final を外すか
    int result = value + 1;      // 別の変数に代入する
}`,
    tips: [
      "final を使うことで意図しない再代入を防ぎ、コードの安全性を高められる",
      "不変オブジェクト（Immutable Object）パターンでは、全フィールドを final にする",
      "final は変数の再代入を禁止するが、オブジェクトの内部状態の変更は防げない（例: final List の要素追加は可能）",
      "Java 16+ の record を使うと、全フィールドが自動的に final になる",
    ],
  },
  {
    id: "raw-type-warning",
    title: "unchecked or unsafe operations (raw type)",
    category: "compile",
    description:
      "ジェネリクスの型パラメータを指定せずに raw 型を使用した場合に発生するコンパイラ警告。コンパイルは成功するが、実行時に ClassCastException が発生するリスクがある。",
    cause:
      "List、Map、Set などのジェネリクスクラスを型パラメータなしで使用すると、型安全性が失われる。古いJavaコード（Java 5以前）との互換性のために raw 型は許容されているが、新しいコードでは使用すべきでない。",
    errorCode: `// raw 型の使用（非推奨）
List list = new ArrayList();        // 型パラメータなし
list.add("Hello");
list.add(42);                        // どんな型でも追加できてしまう

Map map = new HashMap();
map.put("key", "value");
map.put(123, true);                  // 型の混在

// Note: unchecked or unsafe operations
// Recompile with -Xlint:unchecked for details.`,
    fixCode: `// 型パラメータを正しく指定
List<String> list = new ArrayList<>();  // String のみ許可
list.add("Hello");
// list.add(42);  // コンパイルエラーで防止される

Map<String, String> map = new HashMap<>();
map.put("key", "value");
// map.put(123, true);  // コンパイルエラーで防止される

// 異なる型を格納する必要がある場合は共通の型を使う
List<Object> mixed = new ArrayList<>();
// または sealed interface を使って型を限定する`,
    tips: [
      "ジェネリクスクラスには必ず型パラメータを指定する（例: List<String>）",
      "ダイヤモンド演算子（<>）を使って右辺の型推論を活用する",
      "コンパイラ警告を-Xlint:unchecked オプションで詳細表示し、全て解消する",
      "@SuppressWarnings(\"unchecked\") は最後の手段とし、使う場合はコメントで理由を記載する",
    ],
  },
  {
    id: "dead-code-unreachable",
    title: "unreachable statement",
    category: "compile",
    description:
      "return、throw、break、continue の後に到達不可能なコードがある場合に発生するコンパイルエラー。実行されないコードは論理ミスの可能性が高いため、Javaコンパイラはこれをエラーとして検出する。",
    cause:
      "return 文の後にコードを記述した場合、throw の後に処理を書いた場合、無条件の break/continue の後にコードがある場合、while(true) ループの後にコードがある場合などに発生する。",
    errorCode: `public int getValue() {
    return 42;
    System.out.println("この行は実行されない");
    // error: unreachable statement
}

public void process(int x) {
    if (x > 0) {
        throw new IllegalArgumentException("正の数は不可");
        log("例外をスロー"); // error: unreachable statement
    }
}`,
    fixCode: `public int getValue() {
    int value = 42;
    System.out.println("値: " + value); // return の前に移動
    return value;
}

public void process(int x) {
    if (x > 0) {
        log("例外をスローします"); // throw の前に移動
        throw new IllegalArgumentException("正の数は不可");
    }
}

// 条件付きで早期リターンする場合
public String findItem(String key) {
    if (key == null) {
        return "デフォルト"; // 早期リターン
    }
    // ここは到達可能（key != null の場合）
    return repository.find(key);
}`,
    tips: [
      "return や throw の前に必要な処理（ログ出力等）を行うようにする",
      "到達不可能なコードは論理ミスのサインであることが多い",
      "IDE のグレーアウト表示で到達不可能なコードを視覚的に確認できる",
      "デバッグ用のコードを残す場合は、条件分岐の中に入れる",
    ],
  },
  {
    id: "possible-lossy-conversion",
    title: "possible lossy conversion",
    category: "compile",
    description:
      "データ損失の可能性がある縮小変換（narrowing conversion）を暗黙的に行おうとした場合に発生するコンパイルエラー。long から int、double から float、int から short/byte などの変換が対象。",
    cause:
      "大きな型から小さな型への暗黙的な代入（long → int、double → int 等）を行おうとすると、値の一部が失われる可能性があるためコンパイラがエラーを出す。計算結果の型が意図と異なるケースもある。",
    errorCode: `long bigNumber = 100L;
int number = bigNumber;  // error: possible lossy conversion from long to int

double price = 19.99;
int yen = price;  // error: possible lossy conversion from double to int

// 計算結果が意図せず大きな型になるケース
int a = 1000000;
int b = 1000000;
int result = a * b;  // オーバーフロー! (long にすべき)`,
    fixCode: `long bigNumber = 100L;
// 方法1: 明示的キャスト（値が範囲内であることが確実な場合）
int number = (int) bigNumber;

// 方法2: Math.toIntExact() で安全に変換（範囲外なら例外をスロー）
int safeNumber = Math.toIntExact(bigNumber);

double price = 19.99;
// 四捨五入して変換
int yen = (int) Math.round(price);

// 大きな計算結果は long を使用
long a = 1000000L;
long b = 1000000L;
long result = a * b;  // オーバーフローしない`,
    tips: [
      "Math.toIntExact() を使うと、long から int への変換でオーバーフロー時に ArithmeticException をスローしてくれる",
      "金額計算では BigDecimal を使用し、浮動小数点数の変換を避ける",
      "キャストする前に、値が変換先の型の範囲内であることを確認する",
      "計算途中のオーバーフローにも注意し、必要に応じて long やBigInteger を使用する",
    ],
  },
  {
    id: "annotation-processing-error",
    title: "アノテーション処理エラー",
    category: "compile",
    description:
      "Lombok、MapStruct、Dagger などのアノテーションプロセッサが正しく構成されていない場合に発生するコンパイルエラー。ビルドツールの設定不備が主な原因。",
    cause:
      "アノテーションプロセッサの依存関係が annotationProcessor/kapt として宣言されていない、Lombok プラグインが IDE にインストールされていない、プロセッサのバージョンと Java バージョンの非互換などが原因。",
    errorCode: `// Lombok を使用したクラス
@Data
@Builder
public class User {
    private String name;
    private int age;
}

// ビルドエラー:
// error: cannot find symbol
//   symbol: method builder()
//   location: class User
//
// build.gradle に annotationProcessor が未設定の場合:
// dependencies {
//     implementation 'org.projectlombok:lombok:1.18.30'
//     // annotationProcessor が無い!
// }`,
    fixCode: `// build.gradle での正しい設定
dependencies {
    compileOnly 'org.projectlombok:lombok:1.18.30'
    annotationProcessor 'org.projectlombok:lombok:1.18.30'

    // テスト用にも必要
    testCompileOnly 'org.projectlombok:lombok:1.18.30'
    testAnnotationProcessor 'org.projectlombok:lombok:1.18.30'
}

// MapStruct の場合
dependencies {
    implementation 'org.mapstruct:mapstruct:1.5.5.Final'
    annotationProcessor 'org.mapstruct:mapstruct-processor:1.5.5.Final'
}

// Maven の場合 (pom.xml)
// <build>
//   <plugins>
//     <plugin>
//       <groupId>org.apache.maven.plugins</groupId>
//       <artifactId>maven-compiler-plugin</artifactId>
//       <configuration>
//         <annotationProcessorPaths>
//           <path>
//             <groupId>org.projectlombok</groupId>
//             <artifactId>lombok</artifactId>
//             <version>1.18.30</version>
//           </path>
//         </annotationProcessorPaths>
//       </configuration>
//     </plugin>
//   </plugins>
// </build>`,
    tips: [
      "Lombok を使う場合、IDE に Lombok プラグインのインストールと「Enable annotation processing」の有効化が必要",
      "Gradle では compileOnly と annotationProcessor の両方を宣言する",
      "Java のメジャーバージョンを上げた場合、アノテーションプロセッサの対応バージョンも確認する",
      "ビルドエラーが解消しない場合は、IDE のキャッシュクリアと再ビルドを試す",
    ],
  },

  // ===== 論理エラー (Logic Errors) - 追加分 =====
  {
    id: "null-in-collection",
    title: "コレクション内のnull",
    category: "logic",
    description:
      "コレクション（List、Set、Map）に null 要素が混入し、ストリーム処理やソート時に予期しない NullPointerException が発生する論理エラー。コンパイル時には検出されず、特定のデータパターンでのみ顕在化する。",
    cause:
      "外部データソース（DB、API）から null を含むデータを取得してコレクションに格納した場合、Comparator でソートする際や Stream の map/filter 操作で null 要素を処理しようとすると NPE が発生する。",
    errorCode: `List<String> names = new ArrayList<>();
names.add("Alice");
names.add(null);      // null が混入
names.add("Charlie");

// ソートで NPE
Collections.sort(names);
// NullPointerException: Cannot invoke "Comparable.compareTo(Object)"

// Stream 操作で NPE
List<Integer> lengths = names.stream()
    .map(String::length)  // null.length() で NPE!
    .toList();`,
    fixCode: `List<String> names = new ArrayList<>();
names.add("Alice");
names.add(null);
names.add("Charlie");

// 方法1: null をフィルタリングしてからソート
List<String> sorted = names.stream()
    .filter(Objects::nonNull)
    .sorted()
    .toList();

// 方法2: null を許容する Comparator を使用
names.sort(Comparator.nullsLast(Comparator.naturalOrder()));

// 方法3: null を除外してから処理
List<Integer> lengths = names.stream()
    .filter(Objects::nonNull)
    .map(String::length)
    .toList();

// 方法4: そもそも null を入れない（推奨）
List<String> safeNames = names.stream()
    .map(n -> n != null ? n : "Unknown")
    .toList();`,
    tips: [
      "コレクションに null を格納しないことを原則とし、Optional や空文字列・デフォルト値を使う",
      "DBから取得したデータは null チェックを行ってからコレクションに追加する",
      "Comparator.nullsFirst() / nullsLast() で null の扱いを明示する",
      "List.of() や Set.of() は null 要素を許可しないため、入力値のバリデーションに活用できる",
    ],
  },
  {
    id: "string-comparison-locale",
    title: "文字列比較のロケール依存",
    category: "logic",
    description:
      "String.toLowerCase() や String.toUpperCase() をロケール指定なしで使用した場合、特定のロケール（特にトルコ語）で意図しない結果を返す論理エラー。国際化対応で見落としやすいバグの一つ。",
    cause:
      "トルコ語ロケールでは小文字の 'i' の大文字は 'İ'（ドット付き I）であり、英語の 'I' とは異なる。そのため \"FILE\".toLowerCase() がトルコ語ロケールのシステムで \"fıle\" になり、文字列比較が失敗する（Turkish I 問題）。",
    errorCode: `// ロケール未指定で小文字変換
String protocol = "HTTP";

// トルコ語ロケールのシステムでは "http" にならない
String lower = protocol.toLowerCase(); // "http"（英語）/ "hTTP" の t が変わる

// 文字列比較が失敗する可能性
if (protocol.toLowerCase().equals("http")) {
    // トルコ語ロケールでは false になる場合がある!
    connectHttp();
}

// 大文字小文字を無視した比較でも問題
String input = "TITLE";
boolean match = input.toLowerCase().equals("title");
// トルコ語ロケールでは false の可能性`,
    fixCode: `// 方法1: Locale を明示的に指定（推奨）
String protocol = "HTTP";
String lower = protocol.toLowerCase(Locale.ROOT); // 常に "http"

if (protocol.toLowerCase(Locale.ROOT).equals("http")) {
    connectHttp(); // どのロケールでも正しく動作
}

// 方法2: equalsIgnoreCase() を使用
if (protocol.equalsIgnoreCase("http")) {
    connectHttp(); // ロケール非依存の比較
}

// 方法3: 定数との比較では定数側で呼ぶ
String userInput = getUserInput();
if ("http".equalsIgnoreCase(userInput)) {
    connectHttp();
}`,
    tips: [
      "プログラム内部の文字列比較には Locale.ROOT または Locale.ENGLISH を指定する",
      "ユーザー表示用の変換にはユーザーのロケールを使い、内部処理用と区別する",
      "equalsIgnoreCase() は多くの場合でロケール問題を回避できるが、完全ではない",
      "国際化対応のテストでは、トルコ語ロケール（Locale.forLanguageTag(\"tr\")）でのテストを追加する",
    ],
  },
  {
    id: "float-precision",
    title: "浮動小数点の精度問題",
    category: "logic",
    description:
      "float/double の浮動小数点数で正確な計算ができない論理エラー。0.1 + 0.2 が 0.3 にならないなど、2進数での表現の限界により丸め誤差が発生する。金額計算で特に致命的。",
    cause:
      "0.1 や 0.2 のような10進小数は、2進浮動小数点数（IEEE 754）では正確に表現できない。演算を繰り返すと誤差が蓄積し、等値比較が失敗したり、金額が1円ずれたりする。",
    errorCode: `// 0.1 + 0.2 は 0.3 にならない
double result = 0.1 + 0.2;
System.out.println(result);           // 0.30000000000000004
System.out.println(result == 0.3);    // false!

// 金額計算での誤差
double price = 19.99;
double quantity = 100;
double total = price * quantity;
System.out.println(total);            // 1998.9999999999998
// 期待値: 1999.0

// 誤差の蓄積
double sum = 0.0;
for (int i = 0; i < 10; i++) {
    sum += 0.1;
}
System.out.println(sum == 1.0);       // false!`,
    fixCode: `// 方法1: BigDecimal を使用（金額計算では必須）
BigDecimal price = new BigDecimal("19.99");  // 文字列で初期化!
BigDecimal quantity = new BigDecimal("100");
BigDecimal total = price.multiply(quantity);
System.out.println(total); // 1999.00（正確）

// 注意: new BigDecimal(0.1) は不正確！
// BigDecimal bad = new BigDecimal(0.1);     // 0.1000000000000000055...
BigDecimal good = new BigDecimal("0.1");     // 正確に 0.1

// 方法2: 整数で計算（セント/銭単位で管理）
long priceInCents = 1999; // 19.99ドル → 1999セント
long total = priceInCents * 100;

// 方法3: 近似比較
double a = 0.1 + 0.2;
double b = 0.3;
boolean isEqual = Math.abs(a - b) < 1e-10; // true`,
    tips: [
      "金額や正確性が求められる計算には必ず BigDecimal を使用する",
      "BigDecimal は文字列コンストラクタ（new BigDecimal(\"0.1\")）を使うこと。double コンストラクタでは誤差が入る",
      "浮動小数点数の等値比較（==）は避け、許容誤差（epsilon）を使った比較にする",
      "BigDecimal の除算では必ず丸めモード（RoundingMode.HALF_UP 等）を指定する",
    ],
  },
  {
    id: "autoboxing-null",
    title: "オートアンボクシングのNullPointerException",
    category: "logic",
    description:
      "null の Integer/Long/Double などのラッパー型をプリミティブ型にアンボクシング（自動変換）しようとした際に発生する NullPointerException。コンパイル時にはエラーにならず、実行時に突然発生するため発見が難しい。",
    cause:
      "Integer 型の変数が null の場合に int 型に代入・比較・演算すると、Java がオートアンボクシングを行おうとして NPE が発生する。Map.get() の戻り値や、DB から取得した nullable なカラムで特に起きやすい。",
    errorCode: `// Map から取得した値が null の場合
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
// "Bob" は登録されていない

int bobScore = scores.get("Bob"); // null → int でNPE!
// NullPointerException

// 三項演算子でのオートアンボクシング
Integer value = null;
int result = (value != null) ? value : getDefault();
// getDefault() が int を返す場合、value 側もアンボクシングされてNPEの可能性

// メソッドの戻り値
public Integer findAge(String name) { return null; }
int age = findAge("unknown"); // NPE!`,
    fixCode: `// 方法1: getOrDefault() を使用
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
int bobScore = scores.getOrDefault("Bob", 0); // null の場合は 0

// 方法2: null チェック後にアンボクシング
Integer value = scores.get("Bob");
int safeValue = (value != null) ? value : 0;

// 方法3: Optional を使用
int score = Optional.ofNullable(scores.get("Bob")).orElse(0);

// 方法4: メソッドの戻り値を Optional にする
public Optional<Integer> findAge(String name) {
    // ...
    return Optional.empty();
}
int age = findAge("unknown").orElse(0);`,
    tips: [
      "Map.get() の戻り値をプリミティブ型に直接代入しない。getOrDefault() を使う",
      "Integer/Long/Boolean などのラッパー型フィールドが null になり得るか常に意識する",
      "メソッドの戻り値が null になる可能性がある場合は Optional を返すことを検討する",
      "条件式（三項演算子）で片方がプリミティブ、片方がラッパー型の場合、思わぬアンボクシングに注意する",
    ],
  },
  {
    id: "time-zone-bug",
    title: "タイムゾーンのバグ",
    category: "logic",
    description:
      "日付・時刻の処理でタイムゾーンを考慮せずにコーディングし、異なるタイムゾーンのサーバーやユーザー環境で時刻がずれる論理エラー。グローバルなアプリケーションやクラウド環境で頻発する。",
    cause:
      "LocalDateTime やレガシーな Date をタイムゾーン情報なしで使用し、JVM のデフォルトタイムゾーンに依存してしまう。サーバーが UTC で動作し、ユーザーが JST の場合に9時間のずれが発生するなどの問題が起きる。",
    errorCode: `// タイムゾーンを考慮しないコード
LocalDateTime now = LocalDateTime.now();
// サーバーのタイムゾーンに依存する!

// DB に保存する際にタイムゾーンが失われる
String dateStr = "2024-03-15 10:30:00";
LocalDateTime ldt = LocalDateTime.parse(dateStr,
    DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
// これは「どの」10:30? JST? UTC?

// Date の罠
Date date = new Date(); // UTC のミリ秒を保持
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
String formatted = sdf.format(date);
// JVM のデフォルトタイムゾーンで変換される`,
    fixCode: `// 方法1: ZonedDateTime でタイムゾーンを明示（推奨）
ZonedDateTime nowJst = ZonedDateTime.now(ZoneId.of("Asia/Tokyo"));
ZonedDateTime nowUtc = ZonedDateTime.now(ZoneOffset.UTC);

// 方法2: Instant で UTC の絶対時刻を扱う
Instant now = Instant.now(); // 常に UTC
ZonedDateTime jst = now.atZone(ZoneId.of("Asia/Tokyo"));

// 方法3: DB保存時はUTCで統一
Instant createdAt = Instant.now();
// DB には UTC で保存し、表示時にユーザーのタイムゾーンに変換
ZonedDateTime userTime = createdAt.atZone(userTimeZone);

// 方法4: DateTimeFormatter にタイムゾーンを設定
DateTimeFormatter formatter = DateTimeFormatter
    .ofPattern("yyyy-MM-dd HH:mm:ss")
    .withZone(ZoneId.of("Asia/Tokyo"));
String formatted = formatter.format(Instant.now());`,
    tips: [
      "サーバー間やDB保存には UTC（Instant）を使い、ユーザー表示時にローカルタイムに変換する",
      "JVM のデフォルトタイムゾーン（TimeZone.getDefault()）に依存しないコードを書く",
      "タイムゾーン名は \"JST\" ではなく \"Asia/Tokyo\" のような IANA タイムゾーンIDを使う",
      "夏時間（DST）のある地域では、時刻の加減算に Duration ではなく Period を使い分ける",
    ],
  },
  {
    id: "resource-leak",
    title: "リソースリーク",
    category: "logic",
    description:
      "ファイル、データベース接続、ネットワークソケットなどのリソースが適切にクローズされず、メモリリークやファイルディスクリプタの枯渇を引き起こす論理エラー。長期間稼働するサーバーアプリケーションで特に深刻。",
    cause:
      "try-finally でのクローズ忘れ、例外発生時のクローズ漏れ、メソッドをまたいだリソース管理の不備などが原因。close() を呼ぶ前に例外が発生すると、リソースが開いたままになる。",
    errorCode: `// リソースが閉じられない危険なコード
public String readFile(String path) throws IOException {
    FileReader reader = new FileReader(path);
    BufferedReader br = new BufferedReader(reader);
    String content = br.readLine();
    // br.close() を忘れている!
    // 例外が発生した場合もクローズされない
    return content;
}

// Connection のリーク
public List<User> getUsers() throws SQLException {
    Connection conn = dataSource.getConnection();
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM users");
    // 例外が発生すると conn が閉じられない!
    List<User> users = mapResults(rs);
    conn.close();
    return users;
}`,
    fixCode: `// 方法1: try-with-resources（推奨）
public String readFile(String path) throws IOException {
    try (BufferedReader br = new BufferedReader(
            new FileReader(path))) {
        return br.readLine();
        // 自動的にクローズされる（例外時も）
    }
}

// 方法2: 複数リソースの管理
public List<User> getUsers() throws SQLException {
    try (Connection conn = dataSource.getConnection();
         Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery("SELECT * FROM users")) {
        return mapResults(rs);
        // 全て逆順に自動クローズされる
    }
}

// 方法3: AutoCloseable の実装
public class MyResource implements AutoCloseable {
    @Override
    public void close() {
        // リソース解放処理
    }
}`,
    tips: [
      "AutoCloseable/Closeable を実装したオブジェクトは必ず try-with-resources で管理する",
      "IDE の警告「Resource leak」を無視しない",
      "接続プーリング（HikariCP 等）を使用してもConnection の close() は必要（プールに返却される）",
      "Java 9以降は、事前に宣言した変数を try-with-resources で使用できる（effectively final であれば）",
    ],
  },
  {
    id: "thread-safety-singleton",
    title: "シングルトンのスレッドセーフティ",
    category: "logic",
    description:
      "マルチスレッド環境でスレッドセーフでないシングルトンパターンを使用し、複数のインスタンスが生成されてしまう論理エラー。状態の不整合やリソースの二重初期化など深刻な問題を引き起こす。",
    cause:
      "単純な null チェックによるレイジー初期化は、複数のスレッドが同時にチェックを通過すると複数のインスタンスが生成されてしまう。volatile なしの double-checked locking も JVM のメモリモデル上安全でない場合がある。",
    errorCode: `// スレッドセーフでないシングルトン
public class DatabasePool {
    private static DatabasePool instance;

    private DatabasePool() {
        // 重い初期化処理（DB接続プール作成など）
        System.out.println("インスタンス生成!");
    }

    public static DatabasePool getInstance() {
        if (instance == null) {
            // 複数スレッドが同時にここに到達する可能性!
            instance = new DatabasePool();
            // → インスタンスが複数生成される
        }
        return instance;
    }
}`,
    fixCode: `// 方法1: enum シングルトン（最も推奨）
public enum DatabasePool {
    INSTANCE;

    private final HikariDataSource dataSource;

    DatabasePool() {
        // JVMが1回だけ初期化を保証する
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:mysql://localhost/db");
        dataSource = new HikariDataSource(config);
    }

    public Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}
// 使用: DatabasePool.INSTANCE.getConnection()

// 方法2: static inner class（Holder パターン）
public class DatabasePool {
    private DatabasePool() {}

    private static class Holder {
        static final DatabasePool INSTANCE = new DatabasePool();
    }

    public static DatabasePool getInstance() {
        return Holder.INSTANCE; // 初回アクセス時にのみ初期化
    }
}`,
    tips: [
      "Java では enum シングルトンが最も安全かつ簡潔な実装方法（Effective Java 推奨）",
      "enum シングルトンはシリアライズやリフレクション攻撃にも安全",
      "Spring などの DI フレームワークを使用している場合は、フレームワークのシングルトンスコープを利用する",
      "synchronized を使う場合はパフォーマンスへの影響を考慮し、double-checked locking + volatile を使用する",
    ],
  },
  {
    id: "iterator-modification",
    title: "ループ中のコレクション変更",
    category: "logic",
    description:
      "拡張 for 文（for-each）や Iterator で反復処理中にコレクションの要素を追加・削除すると ConcurrentModificationException が発生する論理エラー。シングルスレッドでも発生する。",
    cause:
      "Java の拡張 for 文は内部的に Iterator を使用しており、反復中にコレクションの構造が変更されると fail-fast 機構が検出して例外をスローする。add() や remove() だけでなく、clear() や sort() なども構造変更に該当する。",
    errorCode: `List<Integer> numbers = new ArrayList<>(
    List.of(1, 2, 3, 4, 5, 6, 7, 8));

// for-each ループ中に要素を削除しようとする
for (Integer num : numbers) {
    if (num % 2 == 0) {
        numbers.remove(num); // ConcurrentModificationException!
    }
}

// インデックスベースのループでも問題がある
for (int i = 0; i < numbers.size(); i++) {
    if (numbers.get(i) % 2 == 0) {
        numbers.remove(i);
        // インデックスがずれて要素がスキップされる!
    }
}`,
    fixCode: `List<Integer> numbers = new ArrayList<>(
    List.of(1, 2, 3, 4, 5, 6, 7, 8));

// 方法1: removeIf() を使用（最も推奨）
numbers.removeIf(num -> num % 2 == 0);
// 結果: [1, 3, 5, 7]

// 方法2: Iterator.remove() を使用
Iterator<Integer> it = numbers.iterator();
while (it.hasNext()) {
    if (it.next() % 2 == 0) {
        it.remove(); // Iterator 経由なら安全
    }
}

// 方法3: Stream でフィルタリングして新しいリストを作成
List<Integer> oddNumbers = numbers.stream()
    .filter(num -> num % 2 != 0)
    .collect(Collectors.toList());

// 方法4: 逆順ループ（インデックスベース）
for (int i = numbers.size() - 1; i >= 0; i--) {
    if (numbers.get(i) % 2 == 0) {
        numbers.remove(i); // 逆順ならインデックスずれの影響なし
    }
}`,
    tips: [
      "要素の削除には removeIf() が最も簡潔でバグが少ない",
      "元のコレクションを変更せず、Stream で新しいコレクションを作る方法も検討する",
      "マルチスレッド環境では CopyOnWriteArrayList の使用を検討する（ただし書き込みコストが高い）",
      "コレクションへの要素追加が必要な場合は、別のリストに追加してから addAll() で結合する",
    ],
  },
  {
    id: "shallow-copy-bug",
    title: "シャローコピーのバグ",
    category: "logic",
    description:
      "オブジェクトのシャローコピー（浅いコピー）を行った結果、コピー元とコピー先がネストされたオブジェクトを共有し、一方の変更が他方にも影響する論理エラー。防御的コピーの不備として現れる。",
    cause:
      "clone() や new ArrayList<>(original) などによるコピーは、トップレベルの参照のみをコピーし、参照先のオブジェクトは共有される。ネストされたリストやミュータブルなフィールドを持つオブジェクトで問題が顕在化する。",
    errorCode: `// リストのシャローコピー
List<List<String>> original = new ArrayList<>();
original.add(new ArrayList<>(List.of("A", "B")));
original.add(new ArrayList<>(List.of("C", "D")));

List<List<String>> copy = new ArrayList<>(original); // シャローコピー

// コピー先を変更すると...
copy.get(0).add("X");
System.out.println(original.get(0)); // [A, B, X] ← 元も変わる!

// オブジェクトのコピーでも同様
class Team {
    String name;
    List<String> members;
}
Team teamA = new Team();
teamA.members = new ArrayList<>(List.of("Alice", "Bob"));

// フィールドをコピーしただけ
Team teamB = new Team();
teamB.name = teamA.name;
teamB.members = teamA.members; // 同じリストを共有!
teamB.members.add("Charlie");  // teamA.members にも影響!`,
    fixCode: `// 方法1: ディープコピーを明示的に行う
List<List<String>> original = new ArrayList<>();
original.add(new ArrayList<>(List.of("A", "B")));
original.add(new ArrayList<>(List.of("C", "D")));

List<List<String>> deepCopy = original.stream()
    .map(ArrayList::new) // 各内部リストも新しくコピー
    .collect(Collectors.toList());

deepCopy.get(0).add("X");
System.out.println(original.get(0)); // [A, B] ← 影響なし!

// 方法2: コピーコンストラクタでディープコピー
class Team {
    private final String name;
    private final List<String> members;

    public Team(Team other) {
        this.name = other.name;
        this.members = new ArrayList<>(other.members); // 防御的コピー
    }
}

// 方法3: 不変オブジェクトを使用（根本的解決）
record Team(String name, List<String> members) {
    public Team {
        members = List.copyOf(members); // 不変リストに変換
    }
}`,
    tips: [
      "コレクションをコピーする場合は、ネストされたオブジェクトも個別にコピーする必要がある",
      "不変オブジェクト（record + List.copyOf 等）を使えば、コピーの問題自体が発生しない",
      "clone() のオーバーライドよりも、コピーコンストラクタやファクトリメソッドを推奨する",
      "外部からの引数を格納する際は防御的コピーを行い、内部状態を守る",
    ],
  },
  {
    id: "switch-fall-through",
    title: "switch文のfall-through",
    category: "logic",
    description:
      "switch 文で break を書き忘れたために、意図しない case に処理が落ちていく（fall-through）論理エラー。コンパイルエラーにならないため発見が遅れやすく、テストで特定のケースを通した時にのみ問題が顕在化する。",
    cause:
      "Java の従来の switch 文では、break を書かないと次の case に処理が継続する仕様になっている。この仕様は C 言語から受け継がれたもので、意図的に使われることもあるが、大半はバグの原因となる。",
    errorCode: `// break の書き忘れ
public String getDayType(int day) {
    String type;
    switch (day) {
        case 1:
            type = "月曜日";
            // break を忘れている!
        case 2:
            type = "火曜日"; // day=1 でもここが実行される
            break;
        case 6:
        case 7:
            type = "週末";
            break;
        default:
            type = "平日";
    }
    return type; // day=1 の場合 "火曜日" が返される!
}`,
    fixCode: `// 方法1: switch 式を使用（Java 14+、最も推奨）
public String getDayType(int day) {
    return switch (day) {
        case 1 -> "月曜日";
        case 2 -> "火曜日";
        case 3 -> "水曜日";
        case 4 -> "木曜日";
        case 5 -> "金曜日";
        case 6, 7 -> "週末";
        default -> "不明";
    }; // break 不要、fall-through なし
}

// 方法2: 従来の switch 文では break を忘れずに記述
public String getDayType(int day) {
    String type;
    switch (day) {
        case 1:
            type = "月曜日";
            break; // 必ず break を書く
        case 2:
            type = "火曜日";
            break;
        default:
            type = "平日";
            break;
    }
    return type;
}`,
    tips: [
      "Java 14以降の switch 式（->）を使うと、fall-through が発生せず安全",
      "従来の switch 文を使う場合は、意図的な fall-through にはコメント（// fall through）を記載する",
      "IDE の警告「Switch statement without break」を有効にして検出する",
      "enum を switch 式で使う場合、全ケースを網羅しないとコンパイルエラーになり安全",
    ],
  },
  {
    id: "integer-overflow",
    title: "整数オーバーフロー",
    category: "logic",
    description:
      "int や long の演算結果がその型の最大値/最小値を超えた場合、例外が発生せずに値が静かにラップアラウンドする論理エラー。セキュリティ上の脆弱性やデータ破損の原因にもなる。",
    cause:
      "Java の整数演算はオーバーフロー時に例外をスローせず、2の補数表現でラップアラウンドする。int の最大値（約21億）を超える計算、ミリ秒単位の時間計算、配列サイズの計算などで発生しやすい。",
    errorCode: `// int のオーバーフロー
int a = Integer.MAX_VALUE; // 2147483647
int b = a + 1;
System.out.println(b); // -2147483648（ラップアラウンド!）

// 掛け算でのオーバーフロー
int seconds = 60 * 60 * 24 * 365 * 100; // 100年の秒数
System.out.println(seconds); // 負の値になる!

// 配列サイズの計算
int width = 100000;
int height = 100000;
int size = width * height; // オーバーフロー!
byte[] buffer = new byte[size]; // 不正なサイズ`,
    fixCode: `// 方法1: Math.addExact() / Math.multiplyExact() で検出
try {
    int result = Math.addExact(Integer.MAX_VALUE, 1);
} catch (ArithmeticException e) {
    System.out.println("オーバーフロー検出: " + e.getMessage());
}

// 方法2: long を使用する
long seconds = 60L * 60 * 24 * 365 * 100; // L をつけて long 演算にする
System.out.println(seconds); // 3153600000（正しい値）

// 方法3: BigInteger を使用する
BigInteger big = BigInteger.valueOf(Integer.MAX_VALUE);
BigInteger result = big.add(BigInteger.ONE);
System.out.println(result); // 2147483648

// 方法4: 計算前に範囲チェック
long area = (long) width * height; // long にキャストしてから計算
if (area > Integer.MAX_VALUE) {
    throw new IllegalArgumentException("サイズが大きすぎます");
}`,
    tips: [
      "Math.addExact()、Math.subtractExact()、Math.multiplyExact() でオーバーフロー時に例外をスローさせる",
      "リテラルの計算では最初の値に L を付けて long 演算を強制する（60L * 60 * 24）",
      "金額や ID には long を使い、int の範囲（約±21億）に収まるか常に意識する",
      "Java ではオーバーフローが静かに発生するため、重要な計算には必ず範囲チェックを入れる",
    ],
  },
  {
    id: "catching-generic-exception",
    title: "汎用例外のキャッチ",
    category: "logic",
    description:
      "catch(Exception e) や catch(Throwable t) で広範な例外を一括キャッチすることで、本来検知すべきバグや異常を握りつぶしてしまう論理エラー。問題の発見が大幅に遅れ、デバッグが困難になる。",
    cause:
      "面倒だからと Exception で一括キャッチすると、NullPointerException や IllegalArgumentException などのプログラミングエラーも飲み込んでしまう。特に空の catch ブロックや、ログだけ出して処理を続行するパターンが危険。",
    errorCode: `// 全ての例外を一括キャッチ（アンチパターン）
public User findUser(String id) {
    try {
        int userId = Integer.parseInt(id);
        User user = repository.findById(userId);
        return user;
    } catch (Exception e) {
        // NPE も NumberFormatException も全部ここに来る
        return null; // null を返してバグを隠蔽
    }
}

// 空の catch ブロック（最悪のパターン）
try {
    processData();
} catch (Exception e) {
    // 何もしない ← バグが完全に見えなくなる
}`,
    fixCode: `// 方法1: 具体的な例外を個別にキャッチ
public User findUser(String id) {
    try {
        int userId = Integer.parseInt(id);
        return repository.findById(userId);
    } catch (NumberFormatException e) {
        log.warn("不正なユーザーID形式: {}", id);
        throw new InvalidParameterException("ユーザーIDは数値で指定してください", e);
    } catch (DataAccessException e) {
        log.error("DB接続エラー", e);
        throw new ServiceException("ユーザー検索中にエラーが発生しました", e);
    }
    // NPE はキャッチしない → バグとして即座に検出される
}

// 方法2: multi-catch を使用（同じ処理をする場合）
try {
    processData();
} catch (IOException | SQLException e) {
    log.error("データ処理エラー: {}", e.getMessage(), e);
    throw new ProcessingException("処理に失敗しました", e);
}

// 方法3: やむを得ず Exception をキャッチする場合はログと再スロー
try {
    externalApi.call();
} catch (Exception e) {
    log.error("外部API呼び出しエラー", e);
    throw e; // 再スローして呼び出し元に伝播
}`,
    tips: [
      "Exception ではなく、発生しうる具体的な例外クラスをキャッチする",
      "catch ブロックでは必ずログ出力か再スローを行い、例外を握りつぶさない",
      "RuntimeException（NPE、ClassCastException 等）はキャッチせず、バグとして即座に修正する",
      "フレームワークのグローバル例外ハンドラ（@ControllerAdvice 等）で一括処理する場合も、具体的な例外ごとにハンドリングする",
    ],
  },

  // ===== ビルド・デプロイ (Build) =====
  {
    id: "jar-version-conflict",
    title: "JAR バージョン競合",
    category: "build",
    description:
      "異なるバージョンの同一ライブラリがクラスパス上に存在し、実行時に NoSuchMethodError や ClassNotFoundException が発生するビルドエラー。依存関係の推移的解決により、意図しないバージョンが選択されることが原因。",
    cause:
      "ライブラリ A が guava 30.0 に依存し、ライブラリ B が guava 31.0 に依存する場合、どちらのバージョンが使われるかはビルドツールの解決戦略に依存する。古いバージョンが選択されると、新しい API を使ったコードが実行時にエラーになる。",
    errorCode: `// 実行時エラーの例
Exception in thread "main" java.lang.NoSuchMethodError:
    'com.google.common.collect.ImmutableList
     com.google.common.collect.ImmutableList.toImmutableList()'
// guava の古いバージョンが使われている

// 依存関係の確認（Gradle）
// ./gradlew dependencies --configuration runtimeClasspath
// +--- com.example:library-a:1.0
// |    \\--- com.google.guava:guava:30.0-jre
// +--- com.example:library-b:2.0
// |    \\--- com.google.guava:guava:31.0-jre -> 30.0-jre (競合!)`,
    fixCode: `// build.gradle での解決方法

// 方法1: 特定バージョンを強制する
configurations.all {
    resolutionStrategy {
        force 'com.google.guava:guava:31.0-jre'
    }
}

// 方法2: 推移的依存を除外して明示的に宣言
dependencies {
    implementation('com.example:library-a:1.0') {
        exclude group: 'com.google.guava', module: 'guava'
    }
    implementation 'com.google.guava:guava:31.0-jre' // 明示的に最新を宣言
}

// 方法3: BOM (Bill of Materials) で統一管理
dependencies {
    implementation platform('com.google.cloud:libraries-bom:26.0.0')
    implementation 'com.google.guava:guava' // バージョンはBOMで管理
}

// Maven の場合 (pom.xml)
// <dependencyManagement>
//   <dependencies>
//     <dependency>
//       <groupId>com.google.guava</groupId>
//       <artifactId>guava</artifactId>
//       <version>31.0-jre</version>
//     </dependency>
//   </dependencies>
// </dependencyManagement>`,
    tips: [
      "./gradlew dependencies や mvn dependency:tree で依存関係ツリーを確認する",
      "BOM（Bill of Materials）を活用してライブラリ群のバージョンを統一管理する",
      "Spring Boot を使っている場合は spring-boot-dependencies BOM が多くのバージョンを管理してくれる",
      "CI/CD パイプラインに依存関係の脆弱性チェック（dependabot、OWASP dependency-check）を組み込む",
    ],
  },
  {
    id: "class-not-found-runtime",
    title: "ClassNotFoundException (実行時)",
    category: "build",
    description:
      "コンパイル時にはクラスパスに存在していたクラスが、実行時（デプロイ後）に見つからない場合に発生するエラー。JAR の配置不足やクラスパスの設定ミスが原因で、デプロイ後に初めて発覚することが多い。",
    cause:
      "コンパイル時には IDE やビルドツールが依存関係を解決するが、実行時のクラスパスに必要な JAR が含まれていない場合に発生する。scope が provided や compileOnly のライブラリ、リフレクションで動的にロードするクラスなどが典型的。",
    errorCode: `// 実行時にクラスが見つからない
java -jar myapp.jar
// Exception in thread "main"
// java.lang.ClassNotFoundException: org.postgresql.Driver

// Gradle で compileOnly にしている場合
// build.gradle:
// dependencies {
//     compileOnly 'org.postgresql:postgresql:42.6.0'
//     // compileOnly = コンパイル時のみ → 実行JARに含まれない!
// }

// リフレクションでのロード
Class<?> clazz = Class.forName("com.example.Plugin");
// 外部プラグインがクラスパスにない場合 ClassNotFoundException`,
    fixCode: `// 方法1: 依存スコープを正しく設定
// build.gradle:
dependencies {
    implementation 'org.postgresql:postgresql:42.6.0'
    // implementation = コンパイル時 + 実行時の両方で使用
}

// 方法2: Fat JAR (Shadow JAR) を作成
// build.gradle:
plugins {
    id 'com.github.johnrengelman.shadow' version '8.1.1'
}
// ./gradlew shadowJar → 全依存関係を1つのJARにバンドル

// 方法3: クラスパスを明示的に指定して実行
// java -cp "myapp.jar:lib/*" com.example.Main

// 方法4: リフレクションの場合は存在チェック
try {
    Class<?> clazz = Class.forName("com.example.Plugin");
    // プラグインが存在する場合の処理
} catch (ClassNotFoundException e) {
    log.info("プラグインが見つかりません。デフォルト動作を使用します");
}`,
    tips: [
      "compileOnly/provided スコープはサーブレットコンテナが提供するライブラリ（javax.servlet 等）にのみ使用する",
      "Fat JAR（Shadow JAR / Uber JAR）を使うと依存関係の配置ミスを防げる",
      "Docker イメージにデプロイする場合は、全ての依存 JAR が COPY されているか確認する",
      "java -verbose:class オプションでクラスのロード元を確認できる",
    ],
  },
  {
    id: "maven-dependency-not-found",
    title: "Maven/Gradle 依存解決エラー",
    category: "build",
    description:
      "Maven や Gradle がライブラリ（アーティファクト）をリモートリポジトリから取得できない場合に発生するビルドエラー。ネットワーク問題、リポジトリ設定不備、存在しないバージョンの指定などが原因。",
    cause:
      "社内プライベートリポジトリの URL 未設定、アーティファクト名やバージョンのタイプミス、ネットワークプロキシの設定不備、リポジトリの認証情報の欠如などが原因。",
    errorCode: `// Gradle のエラー例
> Could not resolve com.example:my-library:2.0.0.
  > Could not find com.example:my-library:2.0.0 in any of the following repositories:
    - mavenCentral (https://repo.maven.apache.org/maven2/)

// Maven のエラー例
// [ERROR] Failed to execute goal on project myapp:
// Could not find artifact com.example:my-library:jar:2.0.0
// in central (https://repo.maven.apache.org/maven2)

// プロキシ環境でのエラー
// > Could not HEAD 'https://repo.maven.apache.org/...'
// > Connect to proxy.company.com:8080 failed`,
    fixCode: `// build.gradle: リポジトリの設定
repositories {
    mavenCentral()  // Maven Central

    // 社内リポジトリを追加
    maven {
        url = uri("https://nexus.company.com/repository/maven-releases/")
        credentials {
            username = project.findProperty("nexusUser") ?: ""
            password = project.findProperty("nexusPassword") ?: ""
        }
    }

    // GitHub Packages
    maven {
        url = uri("https://maven.pkg.github.com/OWNER/REPO")
        credentials {
            username = System.getenv("GITHUB_USER")
            password = System.getenv("GITHUB_TOKEN")
        }
    }
}

// gradle.properties: プロキシ設定
// systemProp.http.proxyHost=proxy.company.com
// systemProp.http.proxyPort=8080
// systemProp.https.proxyHost=proxy.company.com
// systemProp.https.proxyPort=8080

// キャッシュクリアして再取得
// ./gradlew build --refresh-dependencies
// mvn clean install -U`,
    tips: [
      "アーティファクトの groupId, artifactId, version を Maven Central（search.maven.org）で確認する",
      "ネットワーク問題の場合は ./gradlew build --refresh-dependencies でキャッシュを更新する",
      "社内リポジトリの認証情報は gradle.properties に記載し、バージョン管理から除外する",
      "オフライン環境では ./gradlew build --offline でローカルキャッシュのみを使用できる",
    ],
  },
  {
    id: "java-version-mismatch",
    title: "Javaバージョン不一致",
    category: "build",
    description:
      "新しいバージョンの Java でコンパイルされたクラスファイルを、古いバージョンの JVM で実行しようとした場合に発生する UnsupportedClassVersionError。CI/CDと本番環境のバージョン不一致でよく発生する。",
    cause:
      "Java 17 でコンパイルしたクラスを Java 11 の JVM で実行しようとすると、クラスファイルのバージョン番号が JVM のサポート範囲を超えているためエラーになる。開発環境とデプロイ環境の Java バージョン不一致が原因。",
    errorCode: `// 実行時エラー
java -jar myapp.jar
// Exception in thread "main"
// java.lang.UnsupportedClassVersionError:
//   com/example/Main has been compiled by a more recent version
//   of the Java Runtime (class file version 61.0),
//   this version of the Java Runtime only recognizes
//   class file versions up to 55.0
//
// class file version 55 = Java 11
// class file version 61 = Java 17

// バージョン確認
java -version
// openjdk version "11.0.20" ← 古い!`,
    fixCode: `// 方法1: 実行環境の Java バージョンを合わせる
// Java 17 をインストールして使用
// export JAVA_HOME=/usr/lib/jvm/java-17
// export PATH=$JAVA_HOME/bin:$PATH

// 方法2: コンパイル時にターゲットバージョンを指定
// build.gradle
java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
}

// Maven の場合
// <properties>
//     <maven.compiler.source>11</maven.compiler.source>
//     <maven.compiler.target>11</maven.compiler.target>
// </properties>

// 方法3: --release フラグで完全な互換性を保証
// build.gradle (Kotlin DSL)
tasks.withType<JavaCompile> {
    options.release.set(11) // Java 11 互換のバイトコードを生成
}

// 方法4: Docker で Java バージョンを固定
// FROM eclipse-temurin:17-jre-alpine
// COPY build/libs/myapp.jar /app/myapp.jar
// ENTRYPOINT ["java", "-jar", "/app/myapp.jar"]`,
    tips: [
      "開発・CI/CD・本番環境の Java バージョンを統一する",
      "--release フラグは -source/-target よりも厳密で、指定バージョンに存在しない API の使用もエラーにしてくれる",
      "Docker を使って実行環境の Java バージョンを固定すると、環境差異を排除できる",
      "クラスファイルバージョンの対応表: Java 8=52, 11=55, 17=61, 21=65",
    ],
  },
  {
    id: "encoding-compile-error",
    title: "ソースファイルのエンコーディングエラー",
    category: "build",
    description:
      "ソースファイルのエンコーディング（UTF-8, Shift_JIS 等）とコンパイラが想定するエンコーディングが異なる場合に発生するコンパイルエラー。日本語のコメントや文字列リテラルが文字化けし、コンパイルに失敗する。",
    cause:
      "Windows のデフォルトエンコーディング（Shift_JIS / MS932）で保存されたソースファイルを、UTF-8 を想定したビルド環境でコンパイルする場合や、その逆の場合に発生する。チーム開発で異なる OS のメンバーがいると起きやすい。",
    errorCode: `// コンパイルエラー
javac Main.java
// Main.java:3: error: unmappable character (0xE3) for encoding windows-31j
//     System.out.println("日本語テスト");
//                                 ^
// 1 error

// Gradle ビルドでのエラー
./gradlew build
// > Compilation failed; see the compiler error output for details.
// error: unmappable character for encoding UTF-8`,
    fixCode: `// 方法1: Gradle でエンコーディングを指定
// build.gradle
tasks.withType(JavaCompile) {
    options.encoding = 'UTF-8'
}

tasks.withType(Javadoc) {
    options.encoding = 'UTF-8'
}

// Maven の場合
// <properties>
//     <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
//     <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
// </properties>

// 方法2: javac コマンドで直接指定
// javac -encoding UTF-8 Main.java

// 方法3: .editorconfig でチーム全体の設定を統一
// .editorconfig ファイル:
// [*.java]
// charset = utf-8
// end_of_line = lf
// indent_style = space
// indent_size = 4`,
    tips: [
      "プロジェクト全体で UTF-8 に統一することを強く推奨する",
      ".editorconfig ファイルを使って、エディタのエンコーディング設定をチーム全体で統一する",
      "IDE の設定でファイルエンコーディングを UTF-8 に設定する（IntelliJ: Settings → Editor → File Encodings）",
      "Git の設定で改行コードの自動変換（core.autocrlf）も併せて設定する",
    ],
  },
  {
    id: "memory-on-deploy",
    title: "デプロイ時のメモリ不足",
    category: "build",
    description:
      "アプリケーションのデプロイ時または起動時にメモリ不足が発生するエラー。Docker コンテナのメモリ制限や JVM のヒープ設定が適切でないことが原因。OOMKilled や OutOfMemoryError として顕在化する。",
    cause:
      "Docker コンテナのメモリ制限を超えた場合にコンテナが強制終了（OOMKilled）される。JVM のデフォルトヒープサイズがコンテナのメモリ制限を超えている場合や、メタスペース・スレッドスタックのメモリが考慮されていない場合に発生する。",
    errorCode: `# Docker コンテナが OOMKilled される
docker run -m 256m myapp
# コンテナが突然停止する
# docker inspect: "OOMKilled": true

# JVM のメモリ設定なし → デフォルトでホストメモリの1/4を使おうとする
FROM eclipse-temurin:17-jre
COPY app.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
# コンテナのメモリ制限 256MB に対して
# JVM がヒープに 1GB 以上確保しようとして失敗

# Kubernetes での OOMKilled
# kubectl describe pod myapp
# Last State: Terminated
# Reason: OOMKilled
# Exit Code: 137`,
    fixCode: `# 方法1: JVM のメモリ設定を明示的に指定
FROM eclipse-temurin:17-jre-alpine
COPY app.jar /app.jar
ENTRYPOINT ["java", \\
  "-Xms128m", \\
  "-Xmx192m", \\
  "-XX:MaxMetaspaceSize=64m", \\
  "-jar", "/app.jar"]

# 方法2: コンテナメモリに基づく自動設定（推奨）
FROM eclipse-temurin:17-jre-alpine
COPY app.jar /app.jar
ENTRYPOINT ["java", \\
  "-XX:MaxRAMPercentage=75.0", \\
  "-XX:InitialRAMPercentage=50.0", \\
  "-jar", "/app.jar"]
# コンテナのメモリ制限の75%をJVMヒープに割り当て

# Kubernetes のリソース設定
# resources:
#   requests:
#     memory: "256Mi"
#   limits:
#     memory: "512Mi"`,
    tips: [
      "-XX:MaxRAMPercentage を使うと、コンテナのメモリ制限に応じて自動的にヒープサイズが調整される",
      "JVM のヒープ以外にも、メタスペース、スレッドスタック、ネイティブメモリなどが消費されるため、-Xmx はコンテナメモリの70-80%程度に抑える",
      "Java 10以降はコンテナのメモリ制限を自動認識するが、MaxRAMPercentage の明示的な設定を推奨する",
      "jcmd や JMX でアプリケーションの実際のメモリ使用量を計測し、適切な値を決定する",
    ],
  },

  // ===== DB・JDBC =====
  {
    id: "optimistic-lock-exception",
    title: "OptimisticLockException",
    category: "jdbc",
    description:
      "JPA の楽観的ロックで、他のトランザクションが先にデータを更新したためにバージョン不一致が検出された場合にスローされる例外。複数ユーザーが同時に同じデータを編集する画面で頻繁に発生する。",
    cause:
      "@Version アノテーションを使った楽観的ロックにおいて、エンティティ読み込み時のバージョンと更新実行時のバージョンが異なる場合に発生する。ユーザーAとユーザーBが同じレコードを同時に編集し、先に保存した方が成功、後から保存する方でエラーになる。",
    errorCode: `@Entity
public class Product {
    @Id
    private Long id;
    private String name;
    private int price;

    @Version
    private Long version; // 楽観的ロック用のバージョンカラム
}

// ユーザーA: Product(id=1, version=1) を読み込み
// ユーザーB: Product(id=1, version=1) を読み込み
// ユーザーA: price を更新 → version=2 で保存成功
// ユーザーB: name を更新 → version=1 で更新しようとする
//
// javax.persistence.OptimisticLockException:
// Row was updated or deleted by another transaction`,
    fixCode: `// 方法1: リトライ機構を実装
@Service
public class ProductService {

    @Retryable(
        value = OptimisticLockException.class,
        maxAttempts = 3,
        backoff = @Backoff(delay = 100))
    @Transactional
    public Product updatePrice(Long id, int newPrice) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("商品が見つかりません"));
        product.setPrice(newPrice);
        return productRepository.save(product);
    }
}

// 方法2: 手動リトライ
public Product updateWithRetry(Long id, int newPrice) {
    int maxRetries = 3;
    for (int i = 0; i < maxRetries; i++) {
        try {
            return updatePrice(id, newPrice);
        } catch (OptimisticLockException e) {
            if (i == maxRetries - 1) throw e;
            // 最新データを再読み込みしてリトライ
        }
    }
    throw new RuntimeException("更新に失敗しました");
}

// 方法3: フロントエンドでバージョンを保持して競合を検知
@PutMapping("/products/{id}")
public ResponseEntity<?> updateProduct(
        @PathVariable Long id,
        @RequestBody ProductUpdateRequest request) {
    try {
        Product updated = productService.update(id, request);
        return ResponseEntity.ok(updated);
    } catch (OptimisticLockException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
            .body("他のユーザーが先に更新しました。画面を再読み込みしてください。");
    }
}`,
    tips: [
      "楽観的ロックは読み取りが多く競合が少ない場合に適している（悲観的ロックはその逆）",
      "Spring Retry（@Retryable）を使うとリトライ処理を簡潔に実装できる",
      "フロントエンドでバージョン番号を保持し、更新時に送信することで競合をユーザーに通知できる",
      "頻繁に競合する場合は、悲観的ロック（@Lock(LockModeType.PESSIMISTIC_WRITE)）への切り替えを検討する",
    ],
  },
  {
    id: "entity-not-found",
    title: "EntityNotFoundException",
    category: "jdbc",
    description:
      "JPA の遅延ロード（Lazy Loading）で参照先のエンティティが存在しない場合にスローされる例外。getReference() で取得したプロキシオブジェクトのプロパティにアクセスした際に、対象レコードが既に削除されている場合に発生する。",
    cause:
      "EntityManager.getReference() はプロキシオブジェクトを返し、実際のDB問い合わせはプロパティアクセス時に遅延実行される。その時点でレコードが存在しなければ EntityNotFoundException がスローされる。また、@ManyToOne の参照先が削除された場合にも発生する。",
    errorCode: `// getReference で存在しないエンティティを参照
EntityManager em = ...;
Product product = em.getReference(Product.class, 999L);
// ここではDBアクセスしない（プロキシを返す）

String name = product.getName();
// ここでDBアクセスが発生 → レコードがない!
// javax.persistence.EntityNotFoundException:
// Unable to find Product with id 999

// リレーション先が削除されたケース
@Entity
public class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    private Customer customer; // customer が削除された場合
}

Order order = orderRepository.findById(1L).get();
String customerName = order.getCustomer().getName();
// EntityNotFoundException!`,
    fixCode: `// 方法1: find() を使用して null チェック（推奨）
Product product = em.find(Product.class, 999L);
if (product == null) {
    throw new ResourceNotFoundException("商品ID: 999 は存在しません");
}
String name = product.getName(); // 安全

// 方法2: Optional を使用（Spring Data JPA）
Product product = productRepository.findById(999L)
    .orElseThrow(() -> new ResourceNotFoundException(
        "商品ID: 999 は存在しません"));

// 方法3: リレーション先の存在チェック
@Entity
public class Order {
    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE) // Hibernate固有
    private Customer customer;
}

// 方法4: 外部キー制約でデータ整合性を保証
// ALTER TABLE orders ADD CONSTRAINT fk_customer
// FOREIGN KEY (customer_id) REFERENCES customers(id)
// ON DELETE RESTRICT; -- 参照されている場合は削除を拒否`,
    tips: [
      "getReference() は遅延ロードのプロキシを返すため、存在確認には find() を使う",
      "Spring Data JPA の findById() は Optional を返すため、存在しない場合の処理を明示的に記述できる",
      "外部キー制約（ON DELETE RESTRICT / CASCADE）でデータベースレベルの整合性を保証する",
      "論理削除（deleted フラグ）を使っている場合は、クエリに削除フラグの条件を含めるか @Where を使う",
    ],
  },
  {
    id: "constraint-violation",
    title: "ConstraintViolationException (Bean Validation)",
    category: "jdbc",
    description:
      "Bean Validation（@NotNull, @Size, @Email 等）のバリデーション制約に違反した場合にスローされる例外。REST API の入力チェックや JPA エンティティの保存時に発生する。",
    cause:
      "@Valid アノテーションと Bean Validation アノテーション（@NotNull, @NotBlank, @Size, @Min, @Max, @Email 等）を使用したバリデーションで、入力値が制約を満たさない場合に発生する。コントローラ層とサービス層の両方で発生しうる。",
    errorCode: `// エンティティのバリデーション定義
public class UserRequest {
    @NotBlank(message = "名前は必須です")
    private String name;

    @Email(message = "メールアドレスの形式が正しくありません")
    private String email;

    @Min(value = 0, message = "年齢は0以上を指定してください")
    @Max(value = 150, message = "年齢は150以下を指定してください")
    private int age;
}

// バリデーションエラーが適切に処理されていない
@PostMapping("/users")
public User createUser(@Valid @RequestBody UserRequest request) {
    return userService.create(request);
}
// 400 Bad Request が返されるが、エラーメッセージが分かりにくい

// javax.validation.ConstraintViolationException:
// Validation failed for classes [UserRequest]`,
    fixCode: `// 方法1: @ControllerAdvice でグローバルに処理（推奨）
@RestControllerAdvice
public class ValidationExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
            errors.put(error.getField(), error.getDefaultMessage())
        );

        Map<String, Object> response = Map.of(
            "status", "error",
            "errors", errors
        );
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleConstraintViolation(
            ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getConstraintViolations().forEach(v ->
            errors.put(v.getPropertyPath().toString(), v.getMessage())
        );
        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }
}

// レスポンス例:
// {
//   "status": "error",
//   "errors": {
//     "name": "名前は必須です",
//     "email": "メールアドレスの形式が正しくありません"
//   }
// }`,
    tips: [
      "@Valid（javax.validation）と @Validated（Spring）の違いを理解する。@Validated はグループ指定が可能",
      "バリデーションメッセージは messages.properties に外出しして国際化対応する",
      "ネストしたオブジェクトのバリデーションには、フィールドにも @Valid を付ける必要がある",
      "カスタムバリデーションアノテーションを作成して、複雑なビジネスルールのチェックを宣言的に記述できる",
    ],
  },
  {
    id: "batch-update-exception",
    title: "BatchUpdateException",
    category: "jdbc",
    description:
      "JDBC のバッチ更新（一括 INSERT/UPDATE）の実行中に一部のステートメントが失敗した場合にスローされる例外。大量データの一括処理で発生し、どのレコードが失敗したかの特定が難しい。",
    cause:
      "バッチ内の一部のSQLが制約違反（一意制約、NOT NULL 制約等）、データ型不正、参照先の欠如などで失敗した場合に発生する。バッチ処理の途中でエラーが起きるため、一部は成功し一部は失敗した状態になりうる。",
    errorCode: `// JDBC バッチ処理
try (PreparedStatement pstmt = conn.prepareStatement(
        "INSERT INTO users (id, name, email) VALUES (?, ?, ?)")) {

    for (User user : users) {
        pstmt.setLong(1, user.getId());
        pstmt.setString(2, user.getName());
        pstmt.setString(3, user.getEmail()); // 重複メールでエラー
        pstmt.addBatch();
    }

    pstmt.executeBatch();
    // java.sql.BatchUpdateException:
    // Duplicate entry 'test@example.com' for key 'users.email'
    // → どのレコードが失敗したか分からない!
}

// JPA でのバッチ処理
@Transactional
public void saveAll(List<User> users) {
    userRepository.saveAll(users);
    // 途中で制約違反 → 全件ロールバック
}`,
    fixCode: `// 方法1: BatchUpdateException から詳細情報を取得
try {
    pstmt.executeBatch();
} catch (BatchUpdateException e) {
    int[] updateCounts = e.getUpdateCounts();
    for (int i = 0; i < updateCounts.length; i++) {
        if (updateCounts[i] == Statement.EXECUTE_FAILED) {
            log.error("バッチ処理の{}番目のレコードが失敗", i);
        }
    }
    // 根本原因を取得
    SQLException cause = e.getNextException();
    log.error("原因: {}", cause.getMessage());
}

// 方法2: チャンク分割で影響範囲を限定
@Transactional
public void saveInChunks(List<User> users) {
    int chunkSize = 100;
    for (int i = 0; i < users.size(); i += chunkSize) {
        List<User> chunk = users.subList(i,
            Math.min(i + chunkSize, users.size()));
        try {
            userRepository.saveAll(chunk);
            userRepository.flush();
        } catch (Exception e) {
            log.error("チャンク {} でエラー: {}", i / chunkSize, e.getMessage());
            // 失敗したチャンクのみリトライまたはスキップ
        }
    }
}

// 方法3: ON DUPLICATE KEY (MySQL) / ON CONFLICT (PostgreSQL)
String sql = """
    INSERT INTO users (id, name, email) VALUES (?, ?, ?)
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    """;`,
    tips: [
      "バッチ処理は適切なチャンクサイズ（100〜1000件程度）に分割して実行する",
      "BatchUpdateException の getUpdateCounts() でどのレコードが失敗したか特定できる",
      "JPA の saveAll() で大量データを扱う場合は、定期的に flush() と clear() を呼んでメモリを解放する",
      "UPSERT（ON CONFLICT / ON DUPLICATE KEY）を活用して、重複エラーを回避する設計を検討する",
    ],
  },
];

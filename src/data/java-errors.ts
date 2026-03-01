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
];

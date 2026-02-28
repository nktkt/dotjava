export interface IoSection {
  title: string;
  content: string;
  code?: string;
}

export interface IoChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: IoSection[];
}

export const ioCategories = [
  { id: "stream", name: "ストリーム基礎", color: "#0017C1" },
  { id: "file", name: "ファイル操作", color: "#259D63" },
  { id: "csv", name: "CSV", color: "#C26A00" },
  { id: "json", name: "JSON", color: "#6B21A8" },
  { id: "xml", name: "XML", color: "#EC0000" },
  { id: "excel", name: "Excel", color: "#259D63" },
  { id: "network", name: "ネットワークI/O", color: "#0891B2" },
  { id: "advanced", name: "応用", color: "#546E7A" },
] as const;

export const ioChapters: IoChapter[] = [
  // ===== ストリーム基礎 =====
  {
    id: "io-stream",
    title: "入出力ストリームの基礎",
    category: "stream",
    description: "InputStream / OutputStream、Reader / Writer の使い方と使い分け",
    sections: [
      {
        title: "バイトストリームと文字ストリーム",
        content:
          "Javaの入出力は「ストリーム」という抽象概念でデータの流れを扱います。バイトストリーム（InputStream/OutputStream）は生のバイナリデータを扱い、文字ストリーム（Reader/Writer）はテキストデータを文字コード変換しながら扱います。",
        code: `// === バイトストリーム（バイナリデータ向け） ===
// ファイルからバイト列を読み込み
try (InputStream in = new FileInputStream("image.png");
     OutputStream out = new FileOutputStream("copy.png")) {

    byte[] buffer = new byte[8192];
    int bytesRead;
    while ((bytesRead = in.read(buffer)) != -1) {
        out.write(buffer, 0, bytesRead);
    }
}

// === 文字ストリーム（テキスト向け） ===
// ファイルからテキストを1行ずつ読み込み
try (BufferedReader reader = new BufferedReader(
        new FileReader("data.txt", StandardCharsets.UTF_8));
     BufferedWriter writer = new BufferedWriter(
        new FileWriter("output.txt", StandardCharsets.UTF_8))) {

    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line.toUpperCase());
        writer.newLine();
    }
}

// === ブリッジクラス（バイト ↔ 文字 変換） ===
try (Reader reader = new InputStreamReader(
        new FileInputStream("data.txt"), StandardCharsets.UTF_8);
     Writer writer = new OutputStreamWriter(
        new FileOutputStream("out.txt"), StandardCharsets.UTF_8)) {
    // バイトストリームを文字ストリームとして扱える
}`,
      },
      {
        title: "try-with-resources とストリームの自動クローズ",
        content:
          "ストリームは使用後に必ずclose()する必要があります。try-with-resources文を使えば、AutoCloseableを実装したリソースを自動的にクローズできます。",
        code: `// try-with-resources（推奨）
try (var reader = new BufferedReader(new FileReader("file.txt"))) {
    String content = reader.readLine();
} // ← 自動的にclose()される（例外発生時も）

// 複数リソース
try (var in = new FileInputStream("input.dat");
     var out = new FileOutputStream("output.dat");
     var bin = new BufferedInputStream(in);
     var bout = new BufferedOutputStream(out)) {
    bin.transferTo(bout);  // Java 9+
}

// 従来の方法（非推奨）
BufferedReader reader = null;
try {
    reader = new BufferedReader(new FileReader("file.txt"));
    // 処理
} finally {
    if (reader != null) {
        reader.close();  // close自体が例外を投げる可能性
    }
}`,
      },
    ],
  },
  {
    id: "standard-io",
    title: "標準入出力とコンソール",
    category: "stream",
    description: "System.in/out/err、Scanner、Console、printf の使い方",
    sections: [
      {
        title: "標準入出力",
        content:
          "System.in（標準入力）、System.out（標準出力）、System.err（標準エラー出力）はJavaプログラムの基本的な入出力手段です。",
        code: `// === 標準出力 ===
System.out.println("改行あり出力");
System.out.print("改行なし出力");
System.out.printf("名前: %s, 年齢: %d歳%n", "Alice", 30);
System.out.printf("価格: %,.2f円%n", 1234567.89);
// 価格: 1,234,567.89円

// フォーマット指定子
// %s  - 文字列     %d  - 10進整数
// %f  - 浮動小数点  %e  - 指数表記
// %n  - 改行       %b  - boolean
// %x  - 16進数     %o  - 8進数
// %tF - 日付       %tT - 時刻

// === 標準エラー出力 ===
System.err.println("エラーメッセージ");

// === 標準入力（Scanner） ===
Scanner scanner = new Scanner(System.in);
System.out.print("名前を入力: ");
String name = scanner.nextLine();

System.out.print("年齢を入力: ");
int age = scanner.nextInt();
scanner.nextLine();  // 改行を消費

System.out.print("身長を入力: ");
double height = scanner.nextDouble();

// === Console（パスワード入力向け） ===
Console console = System.console();
if (console != null) {
    String user = console.readLine("ユーザー名: ");
    char[] password = console.readPassword("パスワード: ");
    // パスワードはchar[]で受け取り、使用後にゼロクリア
    Arrays.fill(password, '\\0');
}`,
      },
    ],
  },

  // ===== ファイル操作 =====
  {
    id: "nio-files",
    title: "NIO.2 ファイル操作",
    category: "file",
    description: "Path, Files クラスによるモダンなファイル操作、ディレクトリ走査",
    sections: [
      {
        title: "Path と Files の基本",
        content:
          "Java 7で導入されたjava.nio.fileパッケージは、従来のjava.io.Fileに代わるモダンなファイル操作APIです。Pathはファイルパスを表し、Filesは静的メソッドでファイル操作を提供します。",
        code: `// === Pathの基本 ===
Path path = Path.of("data", "users", "alice.txt");
Path absolute = path.toAbsolutePath();
Path parent = path.getParent();         // data/users
Path fileName = path.getFileName();     // alice.txt
String ext = path.toString();           // data/users/alice.txt

// パスの結合
Path resolved = Path.of("data").resolve("output.csv");
// data/output.csv

// 相対パスの計算
Path rel = Path.of("/a/b").relativize(Path.of("/a/b/c/d"));
// c/d

// === ファイルの読み書き（簡易） ===
// テキスト全体を一度に読み込み
String content = Files.readString(Path.of("file.txt"));
List<String> lines = Files.readAllLines(Path.of("file.txt"),
    StandardCharsets.UTF_8);
byte[] bytes = Files.readAllBytes(Path.of("image.png"));

// テキスト全体を書き込み
Files.writeString(Path.of("output.txt"), "Hello World");
Files.write(Path.of("lines.txt"), List.of("line1", "line2", "line3"));

// 追記モード
Files.writeString(Path.of("log.txt"), "新しいログ\\n",
    StandardOpenOption.CREATE, StandardOpenOption.APPEND);`,
      },
      {
        title: "ファイル操作とディレクトリ走査",
        content:
          "ファイルのコピー、移動、削除、属性の取得、ディレクトリの再帰的走査などの操作です。",
        code: `// === ファイル操作 ===
Path src = Path.of("source.txt");
Path dst = Path.of("dest.txt");

Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
Files.move(src, dst, StandardCopyOption.ATOMIC_MOVE);
Files.delete(dst);                // 存在しなければ例外
Files.deleteIfExists(dst);        // 存在しなければfalse

// ファイル情報
boolean exists = Files.exists(path);
boolean isDir = Files.isDirectory(path);
long size = Files.size(path);
FileTime modified = Files.getLastModifiedTime(path);

// ディレクトリ作成
Files.createDirectory(Path.of("newdir"));
Files.createDirectories(Path.of("a/b/c/d")); // 中間ディレクトリも作成

// === ディレクトリ走査 ===
// 直下のファイル一覧
try (Stream<Path> entries = Files.list(Path.of("."))) {
    entries.filter(Files::isRegularFile)
           .forEach(System.out::println);
}

// 再帰的走査
try (Stream<Path> walk = Files.walk(Path.of("src"))) {
    List<Path> javaFiles = walk
        .filter(p -> p.toString().endsWith(".java"))
        .toList();
}

// パターンマッチ走査（glob）
try (DirectoryStream<Path> stream =
        Files.newDirectoryStream(Path.of("."), "*.{csv,tsv}")) {
    for (Path entry : stream) {
        System.out.println(entry);
    }
}

// ファイル検索（find）
try (Stream<Path> found = Files.find(Path.of("project"),
        10, // 最大深度
        (path2, attrs) -> attrs.isRegularFile()
            && path2.toString().endsWith(".log"))) {
    found.forEach(System.out::println);
}`,
      },
      {
        title: "一時ファイルとファイル監視",
        content:
          "一時ファイルの作成と、ファイルシステムの変更をリアルタイムで監視する WatchService の使い方です。",
        code: `// === 一時ファイル・ディレクトリ ===
Path tempFile = Files.createTempFile("prefix_", ".tmp");
Path tempDir = Files.createTempDirectory("myapp_");
// JVM終了時に削除
tempFile.toFile().deleteOnExit();

// === ファイル監視 (WatchService) ===
WatchService watcher = FileSystems.getDefault().newWatchService();
Path dir = Path.of("watched_dir");

dir.register(watcher,
    StandardWatchEventKinds.ENTRY_CREATE,
    StandardWatchEventKinds.ENTRY_MODIFY,
    StandardWatchEventKinds.ENTRY_DELETE);

System.out.println("ファイル監視を開始...");
while (true) {
    WatchKey key = watcher.take();  // ブロッキング
    for (WatchEvent<?> event : key.pollEvents()) {
        WatchEvent.Kind<?> kind = event.kind();
        Path changed = (Path) event.context();
        System.out.printf("%s: %s%n", kind.name(), changed);
    }
    if (!key.reset()) break;
}`,
      },
    ],
  },
  {
    id: "properties",
    title: "プロパティファイルとリソース",
    category: "file",
    description: "Properties、ResourceBundle、クラスパスリソースの読み込み",
    sections: [
      {
        title: "プロパティファイル",
        content:
          "key=value 形式の設定ファイル。アプリケーション設定、メッセージ、環境依存の値の管理に使用されます。",
        code: `// === config.properties ===
// db.host=localhost
// db.port=5432
// db.name=mydb
// app.name=MyApplication
// app.debug=true

// 読み込み
Properties props = new Properties();
try (InputStream in = Files.newInputStream(Path.of("config.properties"))) {
    props.load(in);
}
String host = props.getProperty("db.host");
int port = Integer.parseInt(props.getProperty("db.port", "3306"));

// クラスパスからの読み込み（JAR内のリソース）
try (InputStream in = getClass().getResourceAsStream("/config.properties")) {
    props.load(in);
}

// 書き込み
props.setProperty("app.version", "2.0");
try (OutputStream out = Files.newOutputStream(Path.of("config.properties"))) {
    props.store(out, "Updated configuration");
}

// === ResourceBundle（国際化対応） ===
// messages_ja.properties:  greeting=こんにちは
// messages_en.properties:  greeting=Hello
ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.JAPANESE);
String greeting = bundle.getString("greeting"); // "こんにちは"

// === クラスパスリソースの読み込み ===
// src/main/resources/data/template.txt を読む
URL url = getClass().getClassLoader().getResource("data/template.txt");
String template = Files.readString(Path.of(url.toURI()));

// InputStream版
try (InputStream in = getClass().getClassLoader()
        .getResourceAsStream("data/template.txt")) {
    String text = new String(in.readAllBytes(), StandardCharsets.UTF_8);
}`,
      },
    ],
  },

  // ===== CSV =====
  {
    id: "csv-basic",
    title: "CSV の読み書き（標準API）",
    category: "csv",
    description: "標準ライブラリのみでCSVファイルを読み書きする方法",
    sections: [
      {
        title: "CSVの読み込み",
        content:
          "Javaの標準ライブラリだけでCSVファイルを読み込む方法です。簡単なCSVであれば split() で十分ですが、引用符やエスケープが必要な場合は専用ライブラリを使うべきです。",
        code: `// === 基本的なCSV読み込み ===
// users.csv:
// id,name,email,age
// 1,Alice,alice@example.com,30
// 2,Bob,bob@example.com,25
// 3,"Charlie, Jr.",charlie@example.com,35

Path csvPath = Path.of("users.csv");
List<String[]> rows = new ArrayList<>();

try (BufferedReader reader = Files.newBufferedReader(csvPath,
        StandardCharsets.UTF_8)) {
    String header = reader.readLine(); // ヘッダー行をスキップ
    String line;
    while ((line = reader.readLine()) != null) {
        String[] fields = line.split(",");
        rows.add(fields);
    }
}

// レコードにマッピング
record User(long id, String name, String email, int age) {}

List<User> users = Files.lines(csvPath)
    .skip(1)  // ヘッダースキップ
    .map(line -> line.split(","))
    .map(f -> new User(
        Long.parseLong(f[0].trim()),
        f[1].trim(),
        f[2].trim(),
        Integer.parseInt(f[3].trim())))
    .toList();`,
      },
      {
        title: "CSVの書き込み",
        content:
          "JavaオブジェクトをCSV形式でファイルに出力する方法です。",
        code: `// === 基本的なCSV書き込み ===
List<User> users = List.of(
    new User(1, "Alice", "alice@example.com", 30),
    new User(2, "Bob", "bob@example.com", 25),
    new User(3, "Charlie", "charlie@example.com", 35)
);

Path outputPath = Path.of("output.csv");

try (BufferedWriter writer = Files.newBufferedWriter(outputPath,
        StandardCharsets.UTF_8)) {

    // BOM付きUTF-8（Excelで開く場合）
    writer.write("\\uFEFF");

    // ヘッダー
    writer.write("id,name,email,age");
    writer.newLine();

    // データ行
    for (User user : users) {
        writer.write(String.format("%d,\\"%s\\",\\"%s\\",%d",
            user.id(),
            user.name().replace("\\"", "\\"\\""),  // ダブルクォートのエスケープ
            user.email(),
            user.age()));
        writer.newLine();
    }
}

// PrintWriter を使った方法
try (var pw = new PrintWriter(Files.newBufferedWriter(outputPath))) {
    pw.println("id,name,email,age");
    users.forEach(u ->
        pw.printf("%d,%s,%s,%d%n", u.id(), u.name(), u.email(), u.age()));
}`,
      },
    ],
  },
  {
    id: "csv-library",
    title: "CSV ライブラリ（OpenCSV / Apache Commons CSV）",
    category: "csv",
    description: "実務で使われるCSVライブラリの使い方。複雑なCSVも安全に処理",
    sections: [
      {
        title: "OpenCSV",
        content:
          "OpenCSV はJavaで最もよく使われるCSVライブラリの一つです。引用符、エスケープ、Bean マッピングなどを正しく処理します。",
        code: `// build.gradle
// implementation 'com.opencsv:opencsv:5.9'

// === 読み込み ===
try (CSVReader reader = new CSVReaderBuilder(
        new FileReader("data.csv", StandardCharsets.UTF_8))
        .withSkipLines(1)  // ヘッダースキップ
        .build()) {

    List<String[]> allRows = reader.readAll();
    for (String[] row : allRows) {
        System.out.println(row[0] + " - " + row[1]);
    }
}

// 1行ずつ読む（大きなファイル向け）
try (CSVReader reader = new CSVReader(
        new FileReader("big_data.csv"))) {
    String[] row;
    while ((row = reader.readNext()) != null) {
        processRow(row);
    }
}

// === Bean マッピング（アノテーション） ===
public class UserCsv {
    @CsvBindByName(column = "id")
    private long id;

    @CsvBindByName(column = "name")
    private String name;

    @CsvBindByName(column = "email")
    private String email;

    @CsvBindByName(column = "age")
    private int age;

    // getter/setter
}

// アノテーションベースの自動マッピング
try (Reader reader = new FileReader("users.csv")) {
    CsvToBean<UserCsv> csvToBean = new CsvToBeanBuilder<UserCsv>(reader)
        .withType(UserCsv.class)
        .withIgnoreLeadingWhiteSpace(true)
        .build();

    List<UserCsv> users = csvToBean.parse();
    users.forEach(u -> System.out.println(u.getName()));
}

// === 書き込み ===
try (CSVWriter writer = new CSVWriter(
        new FileWriter("output.csv", StandardCharsets.UTF_8))) {

    writer.writeNext(new String[]{"id", "name", "email", "age"});
    writer.writeNext(new String[]{"1", "Alice", "alice@example.com", "30"});
    writer.writeNext(new String[]{"2", "Bob", "bob@example.com", "25"});
}

// Beanからの書き込み
try (Writer writer = new FileWriter("output.csv")) {
    StatefulBeanToCsv<UserCsv> beanToCsv =
        new StatefulBeanToCsvBuilder<UserCsv>(writer).build();
    beanToCsv.write(users);
}`,
      },
      {
        title: "Apache Commons CSV",
        content:
          "Apache Commons CSV は柔軟なCSVフォーマット定義と、ヘッダー名によるカラムアクセスが特徴です。",
        code: `// build.gradle
// implementation 'org.apache.commons:commons-csv:1.12.0'

// === 読み込み ===
try (Reader reader = Files.newBufferedReader(Path.of("data.csv"));
     CSVParser parser = new CSVParser(reader,
         CSVFormat.DEFAULT.builder()
             .setHeader()               // 最初の行をヘッダーとして扱う
             .setSkipHeaderRecord(true)  // ヘッダー行をスキップ
             .setIgnoreEmptyLines(true)
             .setTrim(true)
             .build())) {

    for (CSVRecord record : parser) {
        // ヘッダー名でアクセス
        String name = record.get("name");
        String email = record.get("email");
        int age = Integer.parseInt(record.get("age"));
        System.out.printf("%s (%s) - %d歳%n", name, email, age);
    }
}

// === 書き込み ===
try (BufferedWriter writer = Files.newBufferedWriter(Path.of("output.csv"));
     CSVPrinter printer = new CSVPrinter(writer,
         CSVFormat.DEFAULT.builder()
             .setHeader("ID", "名前", "メール", "年齢")
             .build())) {

    printer.printRecord(1, "Alice", "alice@example.com", 30);
    printer.printRecord(2, "Bob", "bob@example.com", 25);
    printer.printRecord(3, "Charlie", "charlie@example.com", 35);
}

// TSV（タブ区切り）
CSVFormat tsvFormat = CSVFormat.TDF.builder()
    .setHeader()
    .setSkipHeaderRecord(true)
    .build();

// Excel形式
CSVFormat excelFormat = CSVFormat.EXCEL.builder()
    .setHeader()
    .setSkipHeaderRecord(true)
    .build();`,
      },
    ],
  },

  // ===== JSON =====
  {
    id: "json-jackson",
    title: "JSON 処理（Jackson）",
    category: "json",
    description: "Jackson によるJSON読み書き。デファクトスタンダードのJSONライブラリ",
    sections: [
      {
        title: "ObjectMapper の基本",
        content:
          "Jackson はJavaのデファクトJSON処理ライブラリです。ObjectMapper でJavaオブジェクトとJSONの相互変換（シリアライズ/デシリアライズ）を行います。Spring Boot に標準で含まれています。",
        code: `// build.gradle
// implementation 'com.fasterxml.jackson.core:jackson-databind:2.18.2'
// implementation 'com.fasterxml.jackson.datatype:jackson-datatype-jsr310:2.18.2'

ObjectMapper mapper = new ObjectMapper();
mapper.registerModule(new JavaTimeModule()); // Java 8日時型対応

// === Java → JSON（シリアライズ） ===
record User(long id, String name, String email, int age) {}

User user = new User(1, "Alice", "alice@example.com", 30);
String json = mapper.writeValueAsString(user);
// {"id":1,"name":"Alice","email":"alice@example.com","age":30}

// 整形出力
String pretty = mapper.writerWithDefaultPrettyPrinter()
    .writeValueAsString(user);

// ファイルに書き出し
mapper.writeValue(new File("user.json"), user);

// === JSON → Java（デシリアライズ） ===
String jsonStr = """
    {"id":1,"name":"Alice","email":"alice@example.com","age":30}
    """;
User parsed = mapper.readValue(jsonStr, User.class);

// ファイルから読み込み
User fromFile = mapper.readValue(new File("user.json"), User.class);

// リスト型
String jsonArray = """
    [
        {"id":1,"name":"Alice"},
        {"id":2,"name":"Bob"}
    ]
    """;
List<User> users = mapper.readValue(jsonArray,
    new TypeReference<List<User>>() {});

// Map としてパース
Map<String, Object> map = mapper.readValue(jsonStr,
    new TypeReference<Map<String, Object>>() {});`,
      },
      {
        title: "アノテーションによるカスタマイズ",
        content:
          "Jacksonアノテーションで、JSONの出力形式やマッピングを細かく制御できます。",
        code: `public class Product {
    @JsonProperty("product_id")       // JSONキー名をカスタマイズ
    private Long id;

    private String name;

    @JsonIgnore                       // シリアライズ/デシリアライズ対象外
    private String internalCode;

    @JsonFormat(pattern = "yyyy-MM-dd")  // 日付フォーマット
    private LocalDate releaseDate;

    @JsonInclude(JsonInclude.Include.NON_NULL)  // nullの場合は出力しない
    private String description;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)  // デシリアライズのみ
    private String password;
}

// 未知のプロパティを無視
@JsonIgnoreProperties(ignoreUnknown = true)
public record ApiResponse(
    @JsonProperty("status_code") int statusCode,
    String message,
    Object data
) {}

// ObjectMapper 全体の設定
ObjectMapper mapper = JsonMapper.builder()
    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false)
    .serializationInclusion(JsonInclude.Include.NON_NULL)
    .build();`,
      },
      {
        title: "JSONの木構造操作（JsonNode）",
        content:
          "スキーマが不定のJSONや動的なJSONを処理する場合は、JsonNode で木構造として操作します。",
        code: `// JSON を JsonNode として読み込み
String json = """
    {
        "users": [
            {"name": "Alice", "scores": [90, 85, 92]},
            {"name": "Bob", "scores": [78, 88, 95]}
        ],
        "metadata": {"total": 2}
    }
    """;

JsonNode root = mapper.readTree(json);

// 値の取得
int total = root.path("metadata").path("total").asInt();
String firstName = root.path("users").get(0).path("name").asText();

// 配列の走査
JsonNode users = root.path("users");
for (JsonNode user : users) {
    String name = user.path("name").asText();
    JsonNode scores = user.path("scores");
    double avg = StreamSupport.stream(scores.spliterator(), false)
        .mapToInt(JsonNode::asInt)
        .average()
        .orElse(0);
    System.out.printf("%s: 平均 %.1f%n", name, avg);
}

// JsonNode の動的構築
ObjectNode newUser = mapper.createObjectNode();
newUser.put("name", "Charlie");
newUser.put("email", "charlie@example.com");
ArrayNode scores = newUser.putArray("scores");
scores.add(80).add(90).add(85);`,
      },
    ],
  },
  {
    id: "json-gson",
    title: "JSON 処理（Gson）",
    category: "json",
    description: "Google Gson によるJSON処理。シンプルで軽量なJSONライブラリ",
    sections: [
      {
        title: "Gson の基本",
        content:
          "Gson は Google が開発したシンプルなJSONライブラリです。設定なしですぐに使え、Jackson より軽量です。",
        code: `// build.gradle
// implementation 'com.google.code.gson:gson:2.11.0'

Gson gson = new Gson();

// === Java → JSON ===
record User(long id, String name, String email) {}

User user = new User(1, "Alice", "alice@example.com");
String json = gson.toJson(user);
// {"id":1,"name":"Alice","email":"alice@example.com"}

// 整形出力
Gson prettyGson = new GsonBuilder().setPrettyPrinting().create();
String pretty = prettyGson.toJson(user);

// === JSON → Java ===
User parsed = gson.fromJson(json, User.class);

// リスト型
String jsonArray = """
    [{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]
    """;
Type listType = new TypeToken<List<User>>(){}.getType();
List<User> users = gson.fromJson(jsonArray, listType);

// ファイルI/O
try (Writer writer = new FileWriter("data.json")) {
    gson.toJson(users, writer);
}
try (Reader reader = new FileReader("data.json")) {
    List<User> loaded = gson.fromJson(reader, listType);
}

// GsonBuilder でカスタマイズ
Gson customGson = new GsonBuilder()
    .setDateFormat("yyyy-MM-dd")
    .serializeNulls()              // nullも出力
    .setFieldNamingPolicy(
        FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES)
    .create();`,
      },
    ],
  },

  // ===== XML =====
  {
    id: "xml",
    title: "XML の読み書き",
    category: "xml",
    description: "DOM, SAX, StAX, JAXB によるXML処理",
    sections: [
      {
        title: "DOM（Document Object Model）",
        content:
          "XMLドキュメント全体をメモリ上にツリー構造として読み込みます。小中規模のXMLに適しています。",
        code: `// === XML読み込み（DOM） ===
// users.xml:
// <users>
//   <user id="1">
//     <name>Alice</name>
//     <email>alice@example.com</email>
//   </user>
//   <user id="2">
//     <name>Bob</name>
//     <email>bob@example.com</email>
//   </user>
// </users>

DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
DocumentBuilder builder = factory.newDocumentBuilder();
Document doc = builder.parse(new File("users.xml"));

NodeList userNodes = doc.getElementsByTagName("user");
for (int i = 0; i < userNodes.getLength(); i++) {
    Element userEl = (Element) userNodes.item(i);
    String id = userEl.getAttribute("id");
    String name = userEl.getElementsByTagName("name")
        .item(0).getTextContent();
    String email = userEl.getElementsByTagName("email")
        .item(0).getTextContent();
    System.out.printf("ID: %s, Name: %s, Email: %s%n", id, name, email);
}

// === XML書き込み（DOM） ===
Document newDoc = builder.newDocument();
Element root = newDoc.createElement("users");
newDoc.appendChild(root);

Element user = newDoc.createElement("user");
user.setAttribute("id", "1");
Element name = newDoc.createElement("name");
name.setTextContent("Alice");
user.appendChild(name);
root.appendChild(user);

// ファイルに出力
TransformerFactory tf = TransformerFactory.newInstance();
Transformer transformer = tf.newTransformer();
transformer.setOutputProperty(OutputKeys.INDENT, "yes");
transformer.transform(new DOMSource(newDoc),
    new StreamResult(new File("output.xml")));`,
      },
      {
        title: "JAXB（Javaオブジェクト ↔ XML）",
        content:
          "JAXB はアノテーションベースでJavaオブジェクトとXMLを相互変換します。Java 11以降は外部ライブラリとして追加が必要です。",
        code: `// build.gradle
// implementation 'jakarta.xml.bind:jakarta.xml.bind-api:4.0.2'
// runtimeOnly 'org.glassfish.jaxb:jaxb-runtime:4.0.5'

// アノテーションベースのマッピング
@XmlRootElement(name = "user")
@XmlAccessorType(XmlAccessType.FIELD)
public class UserXml {
    @XmlAttribute
    private long id;

    private String name;
    private String email;

    @XmlElement(name = "created_at")
    private String createdAt;

    // getter/setter, デフォルトコンストラクタ必須
}

@XmlRootElement(name = "users")
public class UserListXml {
    @XmlElement(name = "user")
    private List<UserXml> users;
}

// Java → XML（マーシャリング）
JAXBContext context = JAXBContext.newInstance(UserListXml.class);
Marshaller marshaller = context.createMarshaller();
marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
marshaller.marshal(userList, new File("users.xml"));

// XML → Java（アンマーシャリング）
Unmarshaller unmarshaller = context.createUnmarshaller();
UserListXml loaded = (UserListXml) unmarshaller
    .unmarshal(new File("users.xml"));`,
      },
    ],
  },

  // ===== Excel =====
  {
    id: "excel",
    title: "Excel ファイルの読み書き（Apache POI）",
    category: "excel",
    description: "Apache POI で .xlsx / .xls ファイルを読み書きする",
    sections: [
      {
        title: "Excel読み込み",
        content:
          "Apache POI はJavaで最もよく使われるExcel操作ライブラリです。.xlsx (XSSF) と .xls (HSSF) の両方に対応しています。",
        code: `// build.gradle
// implementation 'org.apache.poi:poi-ooxml:5.3.0'

// === Excelファイル読み込み ===
try (Workbook workbook = WorkbookFactory.create(
        new File("users.xlsx"))) {

    Sheet sheet = workbook.getSheetAt(0);  // 最初のシート
    // または: workbook.getSheet("ユーザー一覧")

    // ヘッダー行を取得
    Row headerRow = sheet.getRow(0);
    for (Cell cell : headerRow) {
        System.out.print(cell.getStringCellValue() + "\\t");
    }

    // データ行をイテレート
    for (int i = 1; i <= sheet.getLastRowNum(); i++) {
        Row row = sheet.getRow(i);
        if (row == null) continue;

        // セルの型に応じた読み取り
        long id = (long) row.getCell(0).getNumericCellValue();
        String name = row.getCell(1).getStringCellValue();
        String email = row.getCell(2).getStringCellValue();

        // 日付セル
        Cell dateCell = row.getCell(3);
        if (dateCell != null && dateCell.getCellType() == CellType.NUMERIC
                && DateUtil.isCellDateFormatted(dateCell)) {
            LocalDate date = dateCell.getLocalDateTimeCellValue()
                .toLocalDate();
            System.out.println("日付: " + date);
        }

        System.out.printf("ID: %d, Name: %s, Email: %s%n",
            id, name, email);
    }
}`,
      },
      {
        title: "Excel書き込み",
        content:
          "新しいExcelファイルの作成、スタイル設定、複数シートの操作方法です。",
        code: `// === Excelファイル書き込み ===
try (Workbook workbook = new XSSFWorkbook()) { // .xlsx

    Sheet sheet = workbook.createSheet("売上レポート");

    // ヘッダースタイル
    CellStyle headerStyle = workbook.createCellStyle();
    Font headerFont = workbook.createFont();
    headerFont.setBold(true);
    headerFont.setFontHeightInPoints((short) 12);
    headerStyle.setFont(headerFont);
    headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
    headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    headerStyle.setBorderBottom(BorderStyle.THIN);

    // ヘッダー行
    Row header = sheet.createRow(0);
    String[] columns = {"ID", "商品名", "価格", "数量", "合計", "日付"};
    for (int i = 0; i < columns.length; i++) {
        Cell cell = header.createCell(i);
        cell.setCellValue(columns[i]);
        cell.setCellStyle(headerStyle);
    }

    // 金額フォーマット
    CellStyle moneyStyle = workbook.createCellStyle();
    DataFormat format = workbook.createDataFormat();
    moneyStyle.setDataFormat(format.getFormat("#,##0"));

    // 日付フォーマット
    CellStyle dateStyle = workbook.createCellStyle();
    dateStyle.setDataFormat(format.getFormat("yyyy/mm/dd"));

    // データ行
    int rowNum = 1;
    for (SalesRecord record : salesData) {
        Row row = sheet.createRow(rowNum++);
        row.createCell(0).setCellValue(record.id());
        row.createCell(1).setCellValue(record.productName());

        Cell priceCell = row.createCell(2);
        priceCell.setCellValue(record.price());
        priceCell.setCellStyle(moneyStyle);

        row.createCell(3).setCellValue(record.quantity());

        // 数式
        Cell totalCell = row.createCell(4);
        totalCell.setCellFormula("C" + (rowNum) + "*D" + (rowNum));
        totalCell.setCellStyle(moneyStyle);

        Cell dateCell = row.createCell(5);
        dateCell.setCellValue(record.date());
        dateCell.setCellStyle(dateStyle);
    }

    // 列幅の自動調整
    for (int i = 0; i < columns.length; i++) {
        sheet.autoSizeColumn(i);
    }

    // ファイル出力
    try (FileOutputStream fos = new FileOutputStream("report.xlsx")) {
        workbook.write(fos);
    }
}`,
      },
    ],
  },

  // ===== ネットワーク I/O =====
  {
    id: "network-io",
    title: "ネットワーク入出力",
    category: "network",
    description: "Socket, URL, HttpClient によるネットワーク通信",
    sections: [
      {
        title: "HTTP通信（HttpClient）",
        content:
          "Java 11 で正式導入された HttpClient で、外部APIへのHTTPリクエストを送信しレスポンスを処理します。",
        code: `// === HttpClient による HTTP通信 ===
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .followRedirects(HttpClient.Redirect.NORMAL)
    .build();

// GET リクエスト → JSONパース
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Accept", "application/json")
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());

System.out.println("Status: " + response.statusCode());
String body = response.body();

// Jackson でパース
ObjectMapper mapper = new ObjectMapper();
List<User> users = mapper.readValue(body,
    new TypeReference<List<User>>() {});

// POST リクエスト（JSONボディ）
String jsonBody = mapper.writeValueAsString(
    new User(0, "Alice", "alice@example.com"));

HttpRequest postReq = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
    .build();

HttpResponse<String> postRes = client.send(postReq,
    HttpResponse.BodyHandlers.ofString());

// ファイルダウンロード
HttpRequest dlReq = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com/report.csv"))
    .build();

HttpResponse<Path> dlRes = client.send(dlReq,
    HttpResponse.BodyHandlers.ofFile(Path.of("downloaded.csv")));`,
      },
      {
        title: "ソケット通信",
        content:
          "低レベルのTCPソケット通信の基本。サーバーとクライアント間の双方向通信を実装します。",
        code: `// === TCPサーバー ===
try (ServerSocket serverSocket = new ServerSocket(8080)) {
    System.out.println("サーバー起動: ポート 8080");

    while (true) {
        Socket clientSocket = serverSocket.accept();  // 接続待機

        // 各クライアントをスレッドで処理
        Thread.startVirtualThread(() -> {
            try (var in = new BufferedReader(
                    new InputStreamReader(clientSocket.getInputStream()));
                 var out = new PrintWriter(
                    clientSocket.getOutputStream(), true)) {

                String message;
                while ((message = in.readLine()) != null) {
                    System.out.println("受信: " + message);
                    out.println("Echo: " + message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}

// === TCPクライアント ===
try (Socket socket = new Socket("localhost", 8080);
     var out = new PrintWriter(socket.getOutputStream(), true);
     var in = new BufferedReader(
         new InputStreamReader(socket.getInputStream()))) {

    out.println("Hello, Server!");
    String response = in.readLine();
    System.out.println("応答: " + response);
}`,
      },
    ],
  },

  // ===== 応用 =====
  {
    id: "data-conversion",
    title: "データ変換パターン",
    category: "advanced",
    description: "CSV↔JSON、JSON↔XML など、異なるフォーマット間の変換パターン",
    sections: [
      {
        title: "CSV → JSON 変換",
        content:
          "CSVファイルを読み込んで JSON ファイルに変換する実践的なパターンです。",
        code: `// === CSV → JSON 変換 ===
public class CsvToJsonConverter {
    private final ObjectMapper mapper = new ObjectMapper()
        .enable(SerializationFeature.INDENT_OUTPUT);

    public void convert(Path csvPath, Path jsonPath) throws IOException {
        List<Map<String, String>> records = new ArrayList<>();

        try (Reader reader = Files.newBufferedReader(csvPath);
             CSVParser parser = new CSVParser(reader,
                 CSVFormat.DEFAULT.builder()
                     .setHeader().setSkipHeaderRecord(true)
                     .build())) {

            for (CSVRecord record : parser) {
                Map<String, String> row = new LinkedHashMap<>();
                record.toMap().forEach(row::put);
                records.add(row);
            }
        }

        mapper.writeValue(jsonPath.toFile(), records);
        System.out.printf("変換完了: %d件%n", records.size());
    }
}

// === JSON → CSV 変換 ===
public class JsonToCsvConverter {
    private final ObjectMapper mapper = new ObjectMapper();

    public void convert(Path jsonPath, Path csvPath) throws IOException {
        List<Map<String, Object>> records = mapper.readValue(
            jsonPath.toFile(),
            new TypeReference<List<Map<String, Object>>>() {});

        if (records.isEmpty()) return;

        // ヘッダーを全レコードのキーから収集
        Set<String> headers = new LinkedHashSet<>();
        records.forEach(r -> headers.addAll(r.keySet()));

        try (BufferedWriter writer = Files.newBufferedWriter(csvPath);
             CSVPrinter printer = new CSVPrinter(writer,
                 CSVFormat.DEFAULT.builder()
                     .setHeader(headers.toArray(String[]::new))
                     .build())) {

            for (Map<String, Object> record : records) {
                List<Object> values = headers.stream()
                    .map(h -> record.getOrDefault(h, ""))
                    .toList();
                printer.printRecord(values);
            }
        }
    }
}`,
      },
      {
        title: "バッチ処理・大容量ファイル処理",
        content:
          "メモリに収まらない大容量ファイルをストリーミングで処理するパターンです。",
        code: `// === 大容量CSVのストリーミング処理 ===
public class LargeFileProcessor {

    // メモリ効率よく処理（1行ずつ読み込み）
    public long processLargeCsv(Path inputPath, Path outputPath)
            throws IOException {
        long processedCount = 0;

        try (BufferedReader reader = Files.newBufferedReader(inputPath);
             BufferedWriter writer = Files.newBufferedWriter(outputPath)) {

            // ヘッダーコピー
            String header = reader.readLine();
            writer.write(header);
            writer.newLine();

            // 1行ずつストリーミング処理
            String line;
            while ((line = reader.readLine()) != null) {
                String processed = transformLine(line);
                if (processed != null) {
                    writer.write(processed);
                    writer.newLine();
                    processedCount++;
                }

                // 進捗表示
                if (processedCount % 100_000 == 0) {
                    System.out.printf("処理済み: %,d行%n", processedCount);
                }
            }
        }
        return processedCount;
    }

    // Stream APIを使った大容量ファイル処理
    public Map<String, Long> aggregateByCityStream(Path csvPath)
            throws IOException {
        try (Stream<String> lines = Files.lines(csvPath)) {
            return lines
                .skip(1)  // ヘッダー
                .map(line -> line.split(","))
                .filter(fields -> fields.length >= 4)
                .collect(Collectors.groupingBy(
                    fields -> fields[3],  // city列
                    Collectors.counting()
                ));
        }
    }
}

// === バッファサイズの調整（大容量向け） ===
int bufferSize = 64 * 1024; // 64KB
try (BufferedReader reader = new BufferedReader(
        new FileReader(largePath.toFile()), bufferSize);
     BufferedWriter writer = new BufferedWriter(
        new FileWriter(outputPath.toFile()), bufferSize)) {
    // 処理
}`,
      },
    ],
  },
  {
    id: "encoding",
    title: "文字エンコーディング",
    category: "advanced",
    description: "UTF-8, Shift_JIS, 文字化け対策、BOM処理",
    sections: [
      {
        title: "文字エンコーディングの基本",
        content:
          "文字エンコーディングはテキストデータをバイト列に変換するルールです。Javaプログラムで文字化けを防ぐためには、入力と出力のエンコーディングを正しく指定する必要があります。",
        code: `// === 主要なエンコーディング ===
Charset utf8 = StandardCharsets.UTF_8;          // Unicode（推奨）
Charset sjis = Charset.forName("Shift_JIS");    // 日本語Windows
Charset eucjp = Charset.forName("EUC-JP");      // 日本語Unix
Charset iso8859 = StandardCharsets.ISO_8859_1;   // Latin

// === エンコーディング指定での読み書き ===
// UTF-8で読み込み
String content = Files.readString(path, StandardCharsets.UTF_8);

// Shift_JISで読み込み（レガシーファイル対応）
List<String> lines = Files.readAllLines(path, Charset.forName("Shift_JIS"));

// 文字コード変換（Shift_JIS → UTF-8）
Path sjisFile = Path.of("old_data.csv");
Path utf8File = Path.of("new_data.csv");

try (BufferedReader reader = Files.newBufferedReader(sjisFile,
        Charset.forName("Shift_JIS"));
     BufferedWriter writer = Files.newBufferedWriter(utf8File,
        StandardCharsets.UTF_8)) {
    reader.transferTo(writer);
}

// === BOM (Byte Order Mark) 処理 ===
// BOM付きUTF-8の読み込み
String text = Files.readString(path);
if (text.startsWith("\\uFEFF")) {
    text = text.substring(1);  // BOMを除去
}

// BOM付きUTF-8で書き込み（Excel向け）
try (BufferedWriter writer = Files.newBufferedWriter(path,
        StandardCharsets.UTF_8)) {
    writer.write("\\uFEFF");  // BOM
    writer.write("ID,名前,メール\\n");
    writer.write("1,太郎,taro@example.com\\n");
}

// === 文字化け検出 ===
// バイト列から文字コードを推定
byte[] rawBytes = Files.readAllBytes(path);
CharsetDetector detector = new CharsetDetector();  // ICU4J
detector.setText(rawBytes);
CharsetMatch match = detector.detect();
System.out.println("推定エンコーディング: " + match.getName());`,
      },
    ],
  },
];

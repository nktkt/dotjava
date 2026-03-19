export interface DesignPatternSection {
  title: string;
  content: string;
  code?: string;
}

export interface DesignPattern {
  id: string;
  title: string;
  category: "creational" | "structural" | "behavioral";
  description: string;
  sections: DesignPatternSection[];
}

export const patternCategories = [
  { id: "creational", name: "生成パターン", color: "var(--color-dads-success)" },
  { id: "structural", name: "構造パターン", color: "var(--color-dads-blue)" },
  { id: "behavioral", name: "振る舞いパターン", color: "var(--color-dads-warning)" },
] as const;

export const designPatterns: DesignPattern[] = [
  // ===== 生成パターン (Creational) =====
  {
    id: "singleton",
    title: "Singleton",
    category: "creational",
    description:
      "クラスのインスタンスがただ一つしか生成されないことを保証し、そのインスタンスへのグローバルなアクセスポイントを提供する",
    sections: [
      {
        title: "概要",
        content:
          "Singleton パターンは、あるクラスのインスタンスが一つだけ存在することを保証するデザインパターンです。設定情報の管理、ログ出力、データベース接続プールなど、アプリケーション全体で唯一のオブジェクトが必要な場面で使われます。コンストラクタを private にし、静的メソッドを通じてインスタンスを提供します。",
      },
      {
        title: "構造",
        content:
          "Singleton パターンの主要な構成要素は次の通りです。(1) private なコンストラクタ: 外部からのインスタンス生成を防ぐ。(2) private static なインスタンス変数: 唯一のインスタンスを保持する。(3) public static な getInstance メソッド: インスタンスへのアクセスポイントを提供する。スレッドセーフにするには、enum を使う方法が最もシンプルで推奨されています。",
      },
      {
        title: "実装例",
        content:
          "以下はアプリケーション設定と DB 接続プールを Singleton で実装した例です。enum 方式（推奨）と double-checked locking の両方を示し、設定ファイルの読み込みや接続プール管理など実用的な処理を含みます。",
        code: `// 推奨: enum による Singleton（シリアライズ・リフレクション攻撃に安全）
public enum AppConfig {
    INSTANCE;

    private final Map<String, String> properties = new ConcurrentHashMap<>();
    private final Path configPath = Path.of("config/app.properties");

    AppConfig() {
        loadFromFile();
    }

    private void loadFromFile() {
        try (var reader = Files.newBufferedReader(configPath)) {
            var props = new Properties();
            props.load(reader);
            props.forEach((k, v) -> properties.put(k.toString(), v.toString()));
            System.out.println("設定読み込み完了: " + properties.size() + " 件");
        } catch (IOException e) {
            // デフォルト設定をセット
            properties.put("app.name", "MyApplication");
            properties.put("db.pool.size", "10");
            properties.put("server.port", "8080");
        }
    }

    public String get(String key) {
        return properties.get(key);
    }

    public String getOrDefault(String key, String defaultValue) {
        return properties.getOrDefault(key, defaultValue);
    }

    public int getInt(String key, int defaultValue) {
        String val = properties.get(key);
        return val != null ? Integer.parseInt(val) : defaultValue;
    }

    public void reload() {
        properties.clear();
        loadFromFile();
    }
}

// 使用例
String appName = AppConfig.INSTANCE.get("app.name");
int port = AppConfig.INSTANCE.getInt("server.port", 8080);

// 従来の方法: double-checked locking（スレッドセーフな遅延初期化）
public class ConnectionPool {
    private static volatile ConnectionPool instance;
    private final List<Connection> pool;
    private final int maxSize;

    private ConnectionPool(int maxSize) {
        this.maxSize = maxSize;
        this.pool = new ArrayList<>(maxSize);
        // プール初期化: 最小接続数を事前作成
        for (int i = 0; i < Math.min(3, maxSize); i++) {
            pool.add(createConnection());
        }
        System.out.println("接続プール初期化: " + pool.size() + " 接続");
    }

    public static ConnectionPool getInstance() {
        if (instance == null) {                     // 1st check (ロック不要)
            synchronized (ConnectionPool.class) {
                if (instance == null) {             // 2nd check (ロック内)
                    instance = new ConnectionPool(
                        AppConfig.INSTANCE.getInt("db.pool.size", 10));
                }
            }
        }
        return instance;
    }

    public synchronized Connection acquire() {
        if (pool.isEmpty() && pool.size() < maxSize) {
            pool.add(createConnection());
        }
        return pool.isEmpty() ? null : pool.removeFirst();
    }

    public synchronized void release(Connection conn) {
        if (pool.size() < maxSize) pool.add(conn);
    }

    private Connection createConnection() { /* DB接続生成 */ return null; }
}`,
      },
      {
        title: "使いどころ",
        content:
          "Singleton パターンは以下の場面で有効です。(1) アプリケーション設定の管理: 設定値を一元管理する場合。(2) ログ出力: 一つのログマネージャーで統一的にログを記録する場合。(3) 接続プール: データベース接続やスレッドプールなどリソースの共有管理。ただし、グローバル状態を作るためテストが困難になるデメリットがあります。DI フレームワーク（Spring など）を使える環境ではコンテナ管理の方が望ましいケースも多いです。",
      },
    ],
  },
  {
    id: "factory-method",
    title: "Factory Method",
    category: "creational",
    description:
      "オブジェクト生成のインターフェースを定義し、どのクラスをインスタンス化するかをサブクラスに委ねる",
    sections: [
      {
        title: "概要",
        content:
          "Factory Method パターンは、オブジェクトの生成処理をサブクラスに委譲するパターンです。直接 new でオブジェクトを生成するのではなく、ファクトリメソッドを通じて生成することで、クライアントコードと具体的なクラスの結合を緩くします。新しい製品クラスを追加しても既存コードを変更する必要がありません。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は4つです。(1) Product: 生成されるオブジェクトのインターフェース。(2) ConcreteProduct: Product の具体的な実装クラス。(3) Creator: ファクトリメソッドを宣言する抽象クラス。(4) ConcreteCreator: ファクトリメソッドをオーバーライドして具体的な ConcreteProduct を生成するクラス。",
      },
      {
        title: "実装例",
        content:
          "以下はレポートのエクスポート機能における Factory Method の実装例です。sealed インターフェースで型安全にし、PDF / CSV / Excel といったエクスポート形式をサブクラスで切り替えます。",
        code: `// Product インターフェース: ドキュメントのエクスポーター
public sealed interface DocumentExporter permits PdfExporter, CsvExporter, ExcelExporter {
    // ドキュメントデータを指定形式にエクスポートする
    byte[] export(List<Map<String, Object>> data);
    String getContentType();
    String getFileExtension();
}

// ConcreteProduct: PDF エクスポーター
public final class PdfExporter implements DocumentExporter {
    @Override
    public byte[] export(List<Map<String, Object>> data) {
        // PDF ライブラリ（例: iText）でバイト列を生成
        var doc = new PdfDocument();
        var table = doc.addTable(data.getFirst().keySet());
        data.forEach(row -> table.addRow(row.values()));
        return doc.toBytes();
    }

    @Override
    public String getContentType() { return "application/pdf"; }
    @Override
    public String getFileExtension() { return ".pdf"; }
}

// ConcreteProduct: CSV エクスポーター
public final class CsvExporter implements DocumentExporter {
    @Override
    public byte[] export(List<Map<String, Object>> data) {
        var sb = new StringBuilder();
        // ヘッダー行
        sb.append(String.join(",", data.getFirst().keySet())).append("\\n");
        // データ行
        data.forEach(row ->
            sb.append(row.values().stream()
                .map(Object::toString)
                .collect(Collectors.joining(","))
            ).append("\\n")
        );
        return sb.toString().getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public String getContentType() { return "text/csv"; }
    @Override
    public String getFileExtension() { return ".csv"; }
}

// ConcreteProduct: Excel エクスポーター
public final class ExcelExporter implements DocumentExporter {
    @Override
    public byte[] export(List<Map<String, Object>> data) {
        // Apache POI でワークブックを生成
        var workbook = new XSSFWorkbook();
        var sheet = workbook.createSheet("Report");
        // ヘッダーとデータを書き込み（省略）
        return workbook.toBytes();
    }

    @Override
    public String getContentType() {
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    }
    @Override
    public String getFileExtension() { return ".xlsx"; }
}

// Creator: レポート生成の骨格を定義
public abstract class ReportGenerator {
    // Factory Method — サブクラスがエクスポーターを決定する
    protected abstract DocumentExporter createExporter();

    // テンプレートメソッド的に利用
    public final Path generateReport(String reportName,
            List<Map<String, Object>> data) throws IOException {
        DocumentExporter exporter = createExporter();
        byte[] content = exporter.export(data);
        Path filePath = Path.of("reports",
            reportName + exporter.getFileExtension());
        Files.write(filePath, content);
        System.out.printf("レポート生成完了: %s (%s, %d bytes)%n",
            filePath, exporter.getContentType(), content.length);
        return filePath;
    }
}

// ConcreteCreator
public class PdfReportGenerator extends ReportGenerator {
    @Override
    protected DocumentExporter createExporter() {
        return new PdfExporter();
    }
}

public class CsvReportGenerator extends ReportGenerator {
    @Override
    protected DocumentExporter createExporter() {
        return new CsvExporter();
    }
}

// 使用例: エクスポート形式を切り替え
ReportGenerator generator = new PdfReportGenerator();
var salesData = List.of(
    Map.of("商品", "ノートPC", "数量", 50, "売上", 5_000_000),
    Map.of("商品", "マウス",   "数量", 200, "売上", 600_000)
);
Path report = generator.generateReport("月次売上", salesData);`,
      },
      {
        title: "使いどころ",
        content:
          "Factory Method パターンは以下の場面で有効です。(1) 生成するオブジェクトの型を実行時に決定したい場合。(2) フレームワークやライブラリで拡張ポイントを提供したい場合。(3) テスト時にモックオブジェクトに差し替えたい場合。Java 標準ライブラリでは Calendar.getInstance() や NumberFormat.getInstance() などが代表的な例です。",
      },
    ],
  },
  {
    id: "abstract-factory",
    title: "Abstract Factory",
    category: "creational",
    description:
      "関連する一連のオブジェクト群を、具体的なクラスを指定せずに生成するためのインターフェースを提供する",
    sections: [
      {
        title: "概要",
        content:
          "Abstract Factory パターンは、関連するオブジェクトのファミリーをまとめて生成するパターンです。例えば、UIテーマ（ライト/ダーク）に応じたボタン・テキストフィールド・チェックボックスなど、一連の関連オブジェクトを整合性を保ちながら生成できます。Factory Method が一つのオブジェクト生成に焦点を当てるのに対し、Abstract Factory はオブジェクト群の生成を扱います。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) AbstractFactory: 関連オブジェクト群を生成するメソッドを宣言するインターフェース。(2) ConcreteFactory: 特定のファミリーに属するオブジェクトを生成する。(3) AbstractProduct: 各製品のインターフェース。(4) ConcreteProduct: 各製品の具体的な実装。(5) Client: AbstractFactory と AbstractProduct のみに依存する。",
      },
      {
        title: "実装例",
        content:
          "以下はマルチデータベース対応のリポジトリ層を Abstract Factory で実装した例です。PostgreSQL / MySQL など、DB製品ごとに接続・トランザクション・マイグレーションを一式生成し、整合性を保ちます。",
        code: `// AbstractProduct: データベース接続
public interface DbConnection {
    void connect(String url);
    void close();
    ResultSet executeQuery(String sql);
}

// AbstractProduct: トランザクションマネージャー
public interface TransactionManager {
    void begin();
    void commit();
    void rollback();
}

// AbstractProduct: マイグレーションツール
public interface MigrationTool {
    void migrate(String scriptPath);
    int getCurrentVersion();
}

// ConcreteProduct (PostgreSQL 系)
public class PostgresConnection implements DbConnection {
    @Override
    public void connect(String url) {
        System.out.println("PostgreSQL へ接続: " + url);
        // PgConnection の初期化処理
    }
    @Override
    public void close() { System.out.println("PostgreSQL 接続クローズ"); }
    @Override
    public ResultSet executeQuery(String sql) {
        System.out.println("PostgreSQL 実行: " + sql);
        return null; // 実際は ResultSet を返す
    }
}

public class PostgresTransactionManager implements TransactionManager {
    @Override
    public void begin() { System.out.println("BEGIN (PostgreSQL MVCC)"); }
    @Override
    public void commit() { System.out.println("COMMIT"); }
    @Override
    public void rollback() { System.out.println("ROLLBACK"); }
}

public class PostgresMigration implements MigrationTool {
    @Override
    public void migrate(String scriptPath) {
        System.out.println("Flyway で PostgreSQL マイグレーション: " + scriptPath);
    }
    @Override
    public int getCurrentVersion() { return 5; }
}

// ConcreteProduct (MySQL 系)
public class MySqlConnection implements DbConnection {
    @Override
    public void connect(String url) {
        System.out.println("MySQL へ接続: " + url);
    }
    @Override
    public void close() { System.out.println("MySQL 接続クローズ"); }
    @Override
    public ResultSet executeQuery(String sql) {
        System.out.println("MySQL 実行: " + sql);
        return null;
    }
}

public class MySqlTransactionManager implements TransactionManager {
    @Override
    public void begin() { System.out.println("START TRANSACTION (MySQL InnoDB)"); }
    @Override
    public void commit() { System.out.println("COMMIT"); }
    @Override
    public void rollback() { System.out.println("ROLLBACK"); }
}

public class MySqlMigration implements MigrationTool {
    @Override
    public void migrate(String scriptPath) {
        System.out.println("Liquibase で MySQL マイグレーション: " + scriptPath);
    }
    @Override
    public int getCurrentVersion() { return 3; }
}

// AbstractFactory
public interface DatabaseFactory {
    DbConnection createConnection();
    TransactionManager createTransactionManager();
    MigrationTool createMigrationTool();
}

// ConcreteFactory
public class PostgresFactory implements DatabaseFactory {
    public DbConnection createConnection() { return new PostgresConnection(); }
    public TransactionManager createTransactionManager() {
        return new PostgresTransactionManager();
    }
    public MigrationTool createMigrationTool() { return new PostgresMigration(); }
}

public class MySqlFactory implements DatabaseFactory {
    public DbConnection createConnection() { return new MySqlConnection(); }
    public TransactionManager createTransactionManager() {
        return new MySqlTransactionManager();
    }
    public MigrationTool createMigrationTool() { return new MySqlMigration(); }
}

// Client: DB 製品の具体クラスに一切依存しない
public class ApplicationRepository {
    private final DbConnection connection;
    private final TransactionManager txManager;

    public ApplicationRepository(DatabaseFactory factory, String dbUrl) {
        this.connection = factory.createConnection();
        this.txManager = factory.createTransactionManager();
        connection.connect(dbUrl);
    }

    public void saveUser(String name) {
        txManager.begin();
        try {
            connection.executeQuery(
                "INSERT INTO users (name) VALUES ('" + name + "')");
            txManager.commit();
        } catch (Exception e) {
            txManager.rollback();
            throw e;
        }
    }
}

// 使用例: 環境変数でDB製品を切り替え
DatabaseFactory factory = switch (System.getenv("DB_TYPE")) {
    case "mysql" -> new MySqlFactory();
    default      -> new PostgresFactory();
};
var repo = new ApplicationRepository(factory, "jdbc:postgresql://localhost/mydb");
repo.saveUser("太郎");`,
      },
      {
        title: "使いどころ",
        content:
          "Abstract Factory パターンは以下の場面で有効です。(1) 関連するオブジェクト群の整合性を保ちたい場合（例: 同じテーマのUI部品）。(2) 製品ファミリーの切り替えを容易にしたい場合。(3) 具体的なクラスへの依存を排除したい場合。Java では javax.xml.parsers.DocumentBuilderFactory や java.sql.DriverManager などがこのパターンを使っています。",
      },
    ],
  },
  {
    id: "builder",
    title: "Builder",
    category: "creational",
    description:
      "複雑なオブジェクトの構築過程を抽象化し、同じ構築過程で異なる表現のオブジェクトを生成する",
    sections: [
      {
        title: "概要",
        content:
          "Builder パターンは、複雑なオブジェクトの構築を段階的に行うパターンです。コンストラクタの引数が多い場合や、オプションのパラメータが多い場合に特に有効です。メソッドチェーンを使った流暢なAPI（Fluent API）を実現し、可読性の高いオブジェクト構築コードを書くことができます。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Builder: オブジェクトの各部分を構築するメソッドを定義するインターフェース。(2) ConcreteBuilder: Builder を実装し、実際の構築処理を行う。(3) Product: 構築される複雑なオブジェクト。(4) Director（省略可）: Builder を使ってオブジェクトを構築する手順を定義する。現代の Java では Director を省略し、Builder に直接メソッドチェーンを使うことが多いです。",
      },
      {
        title: "実装例",
        content:
          "以下は HTTP リクエストオブジェクトを構築する Builder パターンの実装例です。メソッドチェーンによる流暢な API を実現しています。",
        code: `public class HttpRequest {
    private final String url;
    private final String method;
    private final Map<String, String> headers;
    private final String body;
    private final int timeout;

    private HttpRequest(Builder builder) {
        this.url = builder.url;
        this.method = builder.method;
        this.headers = Collections.unmodifiableMap(builder.headers);
        this.body = builder.body;
        this.timeout = builder.timeout;
    }

    // Getters ...

    public static class Builder {
        private final String url;              // 必須
        private String method = "GET";         // デフォルト値
        private Map<String, String> headers = new HashMap<>();
        private String body;
        private int timeout = 30_000;

        public Builder(String url) {
            this.url = Objects.requireNonNull(url);
        }

        public Builder method(String method) {
            this.method = method;
            return this;
        }

        public Builder header(String key, String value) {
            this.headers.put(key, value);
            return this;
        }

        public Builder body(String body) {
            this.body = body;
            return this;
        }

        public Builder timeout(int timeout) {
            this.timeout = timeout;
            return this;
        }

        public HttpRequest build() {
            if (body != null && "GET".equals(method)) {
                throw new IllegalStateException(
                    "GETリクエストにボディは設定できません");
            }
            return new HttpRequest(this);
        }
    }
}

// 使用例
HttpRequest request = new HttpRequest.Builder("https://api.example.com/users")
    .method("POST")
    .header("Content-Type", "application/json")
    .header("Authorization", "Bearer token123")
    .body("{\\"name\\": \\"太郎\\"}")
    .timeout(5000)
    .build();`,
      },
      {
        title: "使いどころ",
        content:
          "Builder パターンは以下の場面で有効です。(1) コンストラクタ引数が4つ以上ある場合（Effective Java 推奨）。(2) オプションパラメータが多い不変オブジェクトを構築する場合。(3) 同じ構築過程で異なる表現を生成する場合。Java 標準ライブラリでは StringBuilder、Stream.Builder、Locale.Builder などがこのパターンを使っています。Lombok の @Builder アノテーションでも自動生成できます。",
      },
    ],
  },
  {
    id: "prototype",
    title: "Prototype",
    category: "creational",
    description:
      "生成するオブジェクトの原型となるインスタンスを用い、それをコピーして新しいオブジェクトを生成する",
    sections: [
      {
        title: "概要",
        content:
          "Prototype パターンは、既存のオブジェクトをコピー（クローン）することで新しいオブジェクトを生成するパターンです。オブジェクトの生成コストが高い場合や、クラス階層が複雑で new による生成が難しい場合に有効です。Java では Cloneable インターフェースと clone() メソッドがこのパターンの基盤を提供しています。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Prototype: 自身を複製するメソッドを宣言するインターフェース。(2) ConcretePrototype: 複製メソッドを実装する具体的なクラス。(3) Client: Prototype に複製を依頼してオブジェクトを取得する。浅いコピー（shallow copy）と深いコピー（deep copy）の違いに注意が必要です。",
      },
      {
        title: "実装例",
        content:
          "以下はドキュメントテンプレートを複製して新しいドキュメントを作成する例です。コピーコンストラクタを使った安全な実装を示します。",
        code: `// Prototype インターフェース
public interface DocumentPrototype {
    DocumentPrototype clone();
}

// ConcretePrototype
public class SpreadsheetDocument implements DocumentPrototype {
    private String title;
    private List<String> sheets;
    private Map<String, String> styles;

    public SpreadsheetDocument(String title) {
        this.title = title;
        this.sheets = new ArrayList<>();
        this.styles = new HashMap<>();
    }

    // コピーコンストラクタ（深いコピー）
    private SpreadsheetDocument(SpreadsheetDocument source) {
        this.title = source.title;
        this.sheets = new ArrayList<>(source.sheets);
        this.styles = new HashMap<>(source.styles);
    }

    @Override
    public SpreadsheetDocument clone() {
        return new SpreadsheetDocument(this);
    }

    public void addSheet(String name) { sheets.add(name); }
    public void setStyle(String key, String value) {
        styles.put(key, value);
    }
    public void setTitle(String title) { this.title = title; }

    @Override
    public String toString() {
        return "SpreadsheetDocument{title='" + title
            + "', sheets=" + sheets + "}";
    }
}

// プロトタイプ管理レジストリ
public class DocumentRegistry {
    private final Map<String, DocumentPrototype> prototypes
        = new HashMap<>();

    public void register(String key, DocumentPrototype prototype) {
        prototypes.put(key, prototype);
    }

    public DocumentPrototype create(String key) {
        DocumentPrototype prototype = prototypes.get(key);
        if (prototype == null) {
            throw new IllegalArgumentException(
                "未登録のテンプレート: " + key);
        }
        return prototype.clone();
    }
}

// 使用例
DocumentRegistry registry = new DocumentRegistry();
SpreadsheetDocument template = new SpreadsheetDocument("月次報告");
template.addSheet("売上");
template.addSheet("経費");
template.setStyle("font", "Meiryo");
registry.register("monthly-report", template);

// テンプレートから複製
SpreadsheetDocument jan = (SpreadsheetDocument) registry.create("monthly-report");
jan.setTitle("1月度報告");`,
      },
      {
        title: "使いどころ",
        content:
          "Prototype パターンは以下の場面で有効です。(1) オブジェクトの生成コストが高い場合（DB 問い合わせ、ネットワーク通信など）。(2) 既存のオブジェクトを雛形として少しだけ変更したい場合。(3) クラスの種類が実行時に決まる場合。Java では Object.clone() が提供されていますが、コピーコンストラクタの方が安全で推奨されます。Java の record 型では wither パターンが代替になることもあります。",
      },
    ],
  },

  // ===== 構造パターン (Structural) =====
  {
    id: "adapter",
    title: "Adapter",
    category: "structural",
    description:
      "互換性のないインターフェースを持つクラスを、クライアントが期待するインターフェースに変換して協調動作させる",
    sections: [
      {
        title: "概要",
        content:
          "Adapter パターンは、既存クラスのインターフェースを別のインターフェースに変換するパターンです。インターフェースの不一致により直接使えないクラス同士を組み合わせて使えるようにします。電源プラグの変換アダプターと同じ考え方で、既存のコードを変更せずに異なるシステム間の橋渡しを行います。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Target: クライアントが利用するインターフェース。(2) Adaptee: 既存のクラスで、異なるインターフェースを持つ。(3) Adapter: Adaptee を Target のインターフェースに変換するクラス。(4) Client: Target インターフェースを通じて操作を行う。実装方法にはクラスアダプタ（継承）とオブジェクトアダプタ（委譲）がありますが、委譲を使う方が柔軟です。",
      },
      {
        title: "実装例",
        content:
          "以下はロギングシステムで、レガシーライブラリとクラウドログサービスを統一インターフェースに適合させる Adapter の実装例です。2 種類の Adaptee を同じ Target に変換します。",
        code: `// Target: アプリケーションが期待する統一ログインターフェース
public interface AppLogger {
    void info(String message);
    void warn(String message);
    void error(String message, Throwable cause);
}

// Adaptee 1: 外部ライブラリ（Log4j 風の異なる API）
public class LegacyLogger {
    // レベルを数値で受け取る古い API
    public void log(int level, String msg) {
        System.out.printf("[Legacy Lv%d] %s%n", level, msg);
    }
    public void log(int level, String msg, Throwable t) {
        System.out.printf("[Legacy Lv%d] %s: %s%n", level, msg, t.getMessage());
    }
    // レベル定数
    public static final int INFO = 20, WARN = 30, ERROR = 40;
}

// Adaptee 2: クラウド用ログサービス（REST API 風）
public class CloudLogService {
    public void sendLog(String severity, String payload,
                        Map<String, String> metadata) {
        System.out.printf("[Cloud:%s] %s %s%n", severity, payload, metadata);
    }
}

// Adapter 1: LegacyLogger を AppLogger に適合させる
public class LegacyLoggerAdapter implements AppLogger {
    private final LegacyLogger legacy;

    public LegacyLoggerAdapter(LegacyLogger legacy) {
        this.legacy = legacy;
    }

    @Override
    public void info(String message) {
        legacy.log(LegacyLogger.INFO, message);
    }

    @Override
    public void warn(String message) {
        legacy.log(LegacyLogger.WARN, message);
    }

    @Override
    public void error(String message, Throwable cause) {
        legacy.log(LegacyLogger.ERROR, message, cause);
    }
}

// Adapter 2: CloudLogService を AppLogger に適合させる
public class CloudLogAdapter implements AppLogger {
    private final CloudLogService service;
    private final String appName;

    public CloudLogAdapter(CloudLogService service, String appName) {
        this.service = service;
        this.appName = appName;
    }

    @Override
    public void info(String message) {
        service.sendLog("INFO", message,
            Map.of("app", appName, "timestamp", Instant.now().toString()));
    }

    @Override
    public void warn(String message) {
        service.sendLog("WARNING", message,
            Map.of("app", appName, "timestamp", Instant.now().toString()));
    }

    @Override
    public void error(String message, Throwable cause) {
        service.sendLog("ERROR", message + " | " + cause.getMessage(),
            Map.of("app", appName, "stackTrace",
                Arrays.stream(cause.getStackTrace())
                    .limit(5)
                    .map(StackTraceElement::toString)
                    .collect(Collectors.joining("\\n"))));
    }
}

// 使用例: 環境に応じてロガーを切り替え
AppLogger logger = switch (System.getenv("LOG_TARGET")) {
    case "cloud" -> new CloudLogAdapter(new CloudLogService(), "my-app");
    default      -> new LegacyLoggerAdapter(new LegacyLogger());
};
// クライアントは AppLogger だけを知っていればよい
logger.info("アプリケーション起動");
logger.error("DB接続失敗", new RuntimeException("Connection refused"));`,
      },
      {
        title: "使いどころ",
        content:
          "Adapter パターンは以下の場面で有効です。(1) 既存のクラスを修正できないが、別のインターフェースで利用したい場合。(2) サードパーティライブラリを統一インターフェースでラップしたい場合。(3) レガシーシステムと新システムの統合。Java では InputStreamReader（InputStream を Reader に変換）や Arrays.asList()（配列を List に変換）がこのパターンの典型例です。",
      },
    ],
  },
  {
    id: "bridge",
    title: "Bridge",
    category: "structural",
    description:
      "抽象化と実装を分離し、それぞれを独立して変更できるようにする",
    sections: [
      {
        title: "概要",
        content:
          "Bridge パターンは、抽象（Abstraction）と実装（Implementation）を別々のクラス階層に分離し、それぞれを独立に拡張できるようにするパターンです。「機能のクラス階層」と「実装のクラス階層」を橋渡し（ブリッジ）することで、組み合わせの爆発を防ぎます。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Abstraction: 抽象化レイヤーのインターフェースを定義し、Implementation への参照を保持する。(2) RefinedAbstraction: Abstraction を拡張する。(3) Implementation: 実装レイヤーのインターフェース。(4) ConcreteImplementation: Implementation の具体的な実装。",
      },
      {
        title: "実装例",
        content:
          "以下はチャートライブラリの例です。チャートの種類（棒グラフ/円グラフ）とレンダリング形式（SVG/PNG）を Bridge で分離し、独立に組み合わせられます。",
        code: `// Implementation: レンダリングエンジン（描画の「実装」を担当）
public interface Renderer {
    void renderShape(String shapeType, Map<String, Double> params);
    void renderText(String text, double x, double y, int fontSize);
    byte[] exportAsBytes();
    String getFormat();
}

// ConcreteImplementation: SVG レンダラー
public class SvgRenderer implements Renderer {
    private final StringBuilder svg = new StringBuilder("<svg>");

    @Override
    public void renderShape(String type, Map<String, Double> params) {
        // SVG の XML 要素として描画
        switch (type) {
            case "circle" -> svg.append(String.format(
                "<circle cx=\\"%.0f\\" cy=\\"%.0f\\" r=\\"%.0f\\"/>",
                params.get("x"), params.get("y"), params.get("radius")));
            case "rect" -> svg.append(String.format(
                "<rect x=\\"%.0f\\" y=\\"%.0f\\" width=\\"%.0f\\" height=\\"%.0f\\"/>",
                params.get("x"), params.get("y"),
                params.get("width"), params.get("height")));
        }
    }

    @Override
    public void renderText(String text, double x, double y, int fontSize) {
        svg.append(String.format(
            "<text x=\\"%.0f\\" y=\\"%.0f\\" font-size=\\"%d\\">%s</text>",
            x, y, fontSize, text));
    }

    @Override
    public byte[] exportAsBytes() {
        return (svg + "</svg>").getBytes(StandardCharsets.UTF_8);
    }
    @Override
    public String getFormat() { return "SVG"; }
}

// ConcreteImplementation: Canvas (ラスター画像) レンダラー
public class CanvasRenderer implements Renderer {
    private final BufferedImage image;
    private final Graphics2D g2d;

    public CanvasRenderer(int width, int height) {
        image = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        g2d = image.createGraphics();
    }

    @Override
    public void renderShape(String type, Map<String, Double> params) {
        switch (type) {
            case "circle" -> g2d.drawOval(
                params.get("x").intValue(), params.get("y").intValue(),
                params.get("radius").intValue() * 2,
                params.get("radius").intValue() * 2);
            case "rect" -> g2d.drawRect(
                params.get("x").intValue(), params.get("y").intValue(),
                params.get("width").intValue(), params.get("height").intValue());
        }
    }

    @Override
    public void renderText(String text, double x, double y, int fontSize) {
        g2d.setFont(new Font("SansSerif", Font.PLAIN, fontSize));
        g2d.drawString(text, (float) x, (float) y);
    }

    @Override
    public byte[] exportAsBytes() {
        var baos = new ByteArrayOutputStream();
        try { ImageIO.write(image, "PNG", baos); } catch (IOException e) { /**/ }
        return baos.toByteArray();
    }
    @Override
    public String getFormat() { return "PNG"; }
}

// Abstraction: チャート（「機能」を担当）
public abstract class Chart {
    protected final Renderer renderer;    // Implementation への参照（橋）
    protected final String title;

    protected Chart(Renderer renderer, String title) {
        this.renderer = renderer;
        this.title = title;
    }

    // テンプレート: 描画 → エクスポート
    public final byte[] draw() {
        renderer.renderText(title, 10, 20, 16);  // タイトル描画
        drawContent();                             // サブクラスが定義
        return renderer.exportAsBytes();
    }

    protected abstract void drawContent();
}

// RefinedAbstraction: 棒グラフ
public class BarChart extends Chart {
    private final Map<String, Double> data;

    public BarChart(Renderer renderer, String title,
                    Map<String, Double> data) {
        super(renderer, title);
        this.data = data;
    }

    @Override
    protected void drawContent() {
        int x = 30;
        for (var entry : data.entrySet()) {
            double height = entry.getValue();
            renderer.renderShape("rect", Map.of(
                "x", (double) x, "y", 200 - height,
                "width", 40.0, "height", height));
            renderer.renderText(entry.getKey(), x, 220, 10);
            x += 60;
        }
    }
}

// RefinedAbstraction: 円グラフ（機能の拡張は Renderer と独立）
public class PieChart extends Chart {
    private final Map<String, Double> data;

    public PieChart(Renderer renderer, String title,
                    Map<String, Double> data) {
        super(renderer, title);
        this.data = data;
    }

    @Override
    protected void drawContent() {
        // 各セクションを円弧として描画（簡略化）
        renderer.renderShape("circle",
            Map.of("x", 150.0, "y", 150.0, "radius", 80.0));
        renderer.renderText(data.toString(), 10, 260, 10);
    }
}

// 使用例: チャート種類 x レンダラーを自由に組み合わせ
var sales = Map.of("Q1", 120.0, "Q2", 95.0, "Q3", 150.0, "Q4", 180.0);

// 棒グラフ × SVG
byte[] svgBar = new BarChart(new SvgRenderer(), "四半期売上", sales).draw();

// 円グラフ × PNG
byte[] pngPie = new PieChart(
    new CanvasRenderer(400, 300), "売上構成", sales).draw();

// 棒グラフ × PNG（チャート種類とレンダラーを独立に切替可能）
byte[] pngBar = new BarChart(
    new CanvasRenderer(600, 400), "四半期売上", sales).draw();`,
      },
      {
        title: "使いどころ",
        content:
          "Bridge パターンは以下の場面で有効です。(1) 抽象化と実装の両方を独立に拡張したい場合。(2) サブクラスの組み合わせ爆発を避けたい場合。(3) 実装を実行時に切り替えたい場合。Java では JDBC ドライバーの仕組みが代表例で、JDBC API（抽象化）と各データベースドライバ（実装）が分離されています。",
      },
    ],
  },
  {
    id: "composite",
    title: "Composite",
    category: "structural",
    description:
      "個々のオブジェクトとオブジェクトの合成物を同一視し、再帰的なツリー構造を表現する",
    sections: [
      {
        title: "概要",
        content:
          "Composite パターンは、個々のオブジェクト（Leaf）と、それらを含む複合オブジェクト（Composite）を同一のインターフェースで扱えるようにするパターンです。ファイルシステムのファイルとフォルダ、GUI のコンポーネント階層、組織図など、ツリー構造を持つデータを扱う場面で有効です。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Component: Leaf と Composite に共通のインターフェース。(2) Leaf: 子要素を持たない末端のオブジェクト。(3) Composite: 子要素（Component）を複数持ち、操作を子に委譲するオブジェクト。クライアントは Component インターフェースだけを知っていればよく、Leaf か Composite かを意識する必要がありません。",
      },
      {
        title: "実装例",
        content:
          "以下はファイルシステムを表現する Composite パターンの実装例です。ファイルとディレクトリを同一のインターフェースで扱います。",
        code: `// Component
public interface FileSystemEntry {
    String getName();
    long getSize();
    void print(String indent);
}

// Leaf
public class File implements FileSystemEntry {
    private final String name;
    private final long size;

    public File(String name, long size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public String getName() { return name; }

    @Override
    public long getSize() { return size; }

    @Override
    public void print(String indent) {
        System.out.println(indent + "📄 " + name
            + " (" + size + " bytes)");
    }
}

// Composite
public class Directory implements FileSystemEntry {
    private final String name;
    private final List<FileSystemEntry> children = new ArrayList<>();

    public Directory(String name) {
        this.name = name;
    }

    public void add(FileSystemEntry entry) {
        children.add(entry);
    }

    public void remove(FileSystemEntry entry) {
        children.remove(entry);
    }

    @Override
    public String getName() { return name; }

    @Override
    public long getSize() {
        return children.stream()
            .mapToLong(FileSystemEntry::getSize)
            .sum();
    }

    @Override
    public void print(String indent) {
        System.out.println(indent + "📁 " + name
            + " (" + getSize() + " bytes)");
        children.forEach(c -> c.print(indent + "  "));
    }
}

// 使用例
Directory root = new Directory("project");
Directory src = new Directory("src");
src.add(new File("Main.java", 1200));
src.add(new File("Utils.java", 800));
root.add(src);
root.add(new File("README.md", 500));
root.print("");
// 📁 project (2500 bytes)
//   📁 src (2000 bytes)
//     📄 Main.java (1200 bytes)
//     📄 Utils.java (800 bytes)
//   📄 README.md (500 bytes)`,
      },
      {
        title: "使いどころ",
        content:
          "Composite パターンは以下の場面で有効です。(1) オブジェクトの部分-全体のツリー構造を表現したい場合。(2) クライアントが個々のオブジェクトと複合オブジェクトを区別なく扱いたい場合。(3) 再帰的な構造をもつデータをモデリングする場合。Java では java.awt.Component と java.awt.Container、DOM ツリーの Node 階層が典型例です。",
      },
    ],
  },
  {
    id: "decorator",
    title: "Decorator",
    category: "structural",
    description:
      "オブジェクトに動的に新しい機能を追加する。サブクラス化に代わる柔軟な拡張方法を提供する",
    sections: [
      {
        title: "概要",
        content:
          "Decorator パターンは、既存オブジェクトをラップして機能を追加するパターンです。継承ではなく委譲を使うことで、実行時に機能を動的に追加・削除できます。複数の機能を自由に組み合わせられるため、サブクラスの組み合わせ爆発を防ぎます。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Component: 機能追加対象の共通インターフェース。(2) ConcreteComponent: 基本的な機能を持つ具象クラス。(3) Decorator: Component を実装し、内部に Component への参照を持つ抽象クラス。(4) ConcreteDecorator: 具体的な付加機能を実装するクラス。",
      },
      {
        title: "実装例",
        content:
          "以下はデータ入出力に圧縮・暗号化機能を動的に追加する Decorator パターンの実装例です。",
        code: `// Component
public interface DataSource {
    void writeData(String data);
    String readData();
}

// ConcreteComponent
public class FileDataSource implements DataSource {
    private final String filename;
    private String storedData = "";

    public FileDataSource(String filename) {
        this.filename = filename;
    }

    @Override
    public void writeData(String data) {
        this.storedData = data;
        System.out.println("ファイル '" + filename + "' に書き込み");
    }

    @Override
    public String readData() {
        System.out.println("ファイル '" + filename + "' から読み込み");
        return storedData;
    }
}

// Decorator
public abstract class DataSourceDecorator implements DataSource {
    protected final DataSource wrappee;

    protected DataSourceDecorator(DataSource source) {
        this.wrappee = source;
    }

    @Override
    public void writeData(String data) { wrappee.writeData(data); }

    @Override
    public String readData() { return wrappee.readData(); }
}

// ConcreteDecorator
public class CompressionDecorator extends DataSourceDecorator {
    public CompressionDecorator(DataSource source) {
        super(source);
    }

    @Override
    public void writeData(String data) {
        String compressed = compress(data);
        System.out.println("データを圧縮しました");
        super.writeData(compressed);
    }

    @Override
    public String readData() {
        String data = super.readData();
        System.out.println("データを解凍しました");
        return decompress(data);
    }

    private String compress(String data) { return "compressed:" + data; }
    private String decompress(String data) {
        return data.replace("compressed:", "");
    }
}

public class EncryptionDecorator extends DataSourceDecorator {
    public EncryptionDecorator(DataSource source) {
        super(source);
    }

    @Override
    public void writeData(String data) {
        String encrypted = encrypt(data);
        System.out.println("データを暗号化しました");
        super.writeData(encrypted);
    }

    @Override
    public String readData() {
        String data = super.readData();
        System.out.println("データを復号しました");
        return decrypt(data);
    }

    private String encrypt(String data) { return "encrypted:" + data; }
    private String decrypt(String data) {
        return data.replace("encrypted:", "");
    }
}

// 使用例: 機能を自由に組み合わせ
DataSource source = new EncryptionDecorator(
    new CompressionDecorator(
        new FileDataSource("data.txt")
    )
);
source.writeData("機密データ");
String result = source.readData();`,
      },
      {
        title: "使いどころ",
        content:
          "Decorator パターンは以下の場面で有効です。(1) 機能を動的に追加・削除したい場合。(2) 継承による拡張が現実的でないほど組み合わせが多い場合。(3) 既存クラスを変更せずに機能を拡張したい場合。Java の I/O ストリーム（BufferedInputStream、DataInputStream など）が最も有名な適用例です。Collections.unmodifiableList() なども Decorator パターンの一種です。",
      },
    ],
  },
  {
    id: "facade",
    title: "Facade",
    category: "structural",
    description:
      "複雑なサブシステムへの統一的なインターフェースを提供し、サブシステムを使いやすくする",
    sections: [
      {
        title: "概要",
        content:
          "Facade パターンは、複雑なサブシステム群に対するシンプルな窓口を提供するパターンです。クライアントはサブシステムの複雑な内部構造を知る必要がなく、Facade を通じて必要な操作を行えます。「窓口」として機能し、サブシステム間の依存関係や複雑な処理手順を隠蔽します。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Facade: サブシステムへの簡略化されたインターフェースを提供するクラス。(2) Subsystem Classes: 実際の機能を提供する複数のクラス群。Facade はサブシステムの機能を制限するものではなく、便利なショートカットを提供するものです。必要であればクライアントはサブシステムに直接アクセスすることもできます。",
      },
      {
        title: "実装例",
        content:
          "以下は EC サイトの注文処理における Facade パターンの実装例です。在庫確認、決済、配送手配という複雑な処理をまとめています。",
        code: `// サブシステム: 在庫管理
public class InventoryService {
    public boolean checkStock(String productId, int quantity) {
        System.out.println("在庫確認: " + productId);
        return true;
    }

    public void reduceStock(String productId, int quantity) {
        System.out.println("在庫を " + quantity + " 個減らしました");
    }
}

// サブシステム: 決済処理
public class PaymentService {
    public boolean processPayment(String userId, double amount) {
        System.out.println("決済処理: " + amount + " 円");
        return true;
    }

    public void refund(String transactionId) {
        System.out.println("返金処理: " + transactionId);
    }
}

// サブシステム: 配送手配
public class ShippingService {
    public String createShipment(String orderId, String address) {
        System.out.println("配送手配: " + orderId);
        return "TRACK-" + orderId;
    }
}

// サブシステム: 通知
public class NotificationService {
    public void sendOrderConfirmation(String userId, String orderId) {
        System.out.println("注文確認メール送信: " + orderId);
    }
}

// Facade
public class OrderFacade {
    private final InventoryService inventory = new InventoryService();
    private final PaymentService payment = new PaymentService();
    private final ShippingService shipping = new ShippingService();
    private final NotificationService notification = new NotificationService();

    public String placeOrder(String userId, String productId,
                             int quantity, String address) {
        // 1. 在庫確認
        if (!inventory.checkStock(productId, quantity)) {
            throw new RuntimeException("在庫不足です");
        }

        // 2. 決済
        double amount = calculateTotal(productId, quantity);
        if (!payment.processPayment(userId, amount)) {
            throw new RuntimeException("決済に失敗しました");
        }

        // 3. 在庫引き落とし
        inventory.reduceStock(productId, quantity);

        // 4. 配送手配
        String orderId = "ORD-" + System.currentTimeMillis();
        String trackingNumber = shipping.createShipment(orderId, address);

        // 5. 確認通知
        notification.sendOrderConfirmation(userId, orderId);

        return orderId;
    }

    private double calculateTotal(String productId, int quantity) {
        return 1000.0 * quantity; // 簡略化
    }
}

// 使用例: 複雑な処理を1行で実行
OrderFacade orderFacade = new OrderFacade();
String orderId = orderFacade.placeOrder(
    "user123", "PROD-001", 2, "東京都渋谷区...");`,
      },
      {
        title: "使いどころ",
        content:
          "Facade パターンは以下の場面で有効です。(1) 複雑なサブシステムへのシンプルなアクセスが必要な場合。(2) レイヤードアーキテクチャでレイヤー間のインターフェースを定義する場合。(3) マイクロサービスの API Gateway としてサービス群をまとめる場合。Spring Framework の JdbcTemplate や RestTemplate も Facade パターンの例です。",
      },
    ],
  },
  {
    id: "flyweight",
    title: "Flyweight",
    category: "structural",
    description:
      "多数のきめ細かいオブジェクトを共有することで、メモリ使用量を削減する",
    sections: [
      {
        title: "概要",
        content:
          "Flyweight パターンは、大量のオブジェクトを効率的に扱うために、共有可能な部分（内在状態）を共有し、オブジェクトごとに異なる部分（外在状態）を外部から渡すパターンです。メモリ消費を大幅に削減できるため、テキストエディタの文字表現、ゲームのパーティクルシステムなどで使われます。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Flyweight: 共有されるオブジェクトのインターフェース。(2) ConcreteFlyweight: 内在状態を保持し共有されるオブジェクト。(3) FlyweightFactory: Flyweight の生成と管理を行い、同じ内在状態のオブジェクトを再利用する。(4) Client: 外在状態を管理し、Flyweight に渡す。",
      },
      {
        title: "実装例",
        content:
          "以下はゲームの地形タイルを効率的に管理する Flyweight パターンの実装例です。同じ種類のタイルはテクスチャなどの重いデータを共有します。",
        code: `// Flyweight: タイルの共有部分（テクスチャ、移動コスト等）
public class TileType {
    private final String name;
    private final String texture;   // 重いデータ
    private final int movementCost;
    private final boolean walkable;

    public TileType(String name, String texture,
                    int movementCost, boolean walkable) {
        this.name = name;
        this.texture = texture;
        this.movementCost = movementCost;
        this.walkable = walkable;
    }

    public void render(int x, int y) {
        System.out.printf("%s を (%d, %d) に描画 [texture=%s]%n",
            name, x, y, texture);
    }

    public int getMovementCost() { return movementCost; }
    public boolean isWalkable() { return walkable; }
}

// FlyweightFactory
public class TileFactory {
    private static final Map<String, TileType> tileTypes
        = new HashMap<>();

    public static TileType getTileType(String name) {
        return tileTypes.computeIfAbsent(name, key ->
            switch (key) {
                case "grass"  -> new TileType("草原",
                    "grass.png", 1, true);
                case "water"  -> new TileType("水",
                    "water.png", 3, false);
                case "forest" -> new TileType("森",
                    "forest.png", 2, true);
                case "mountain" -> new TileType("山",
                    "mountain.png", 5, false);
                default -> throw new IllegalArgumentException(
                    "未知のタイル: " + key);
            }
        );
    }

    public static int getTypeCount() {
        return tileTypes.size();
    }
}

// Client: マップ（外在状態として座標を管理）
public class GameMap {
    private final TileType[][] tiles;
    private final int width, height;

    public GameMap(int width, int height) {
        this.width = width;
        this.height = height;
        this.tiles = new TileType[height][width];
    }

    public void setTile(int x, int y, String tileTypeName) {
        tiles[y][x] = TileFactory.getTileType(tileTypeName);
    }

    public void render() {
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                if (tiles[y][x] != null) tiles[y][x].render(x, y);
            }
        }
    }
}

// 使用例: 10000 タイルでも TileType は4種類のみ
GameMap map = new GameMap(100, 100);
for (int y = 0; y < 100; y++)
    for (int x = 0; x < 100; x++)
        map.setTile(x, y, x % 3 == 0 ? "water" : "grass");
System.out.println("タイル種類数: " + TileFactory.getTypeCount());`,
      },
      {
        title: "使いどころ",
        content:
          "Flyweight パターンは以下の場面で有効です。(1) 同じデータを持つオブジェクトが大量に必要な場合。(2) メモリ使用量がパフォーマンスのボトルネックとなる場合。(3) オブジェクトの状態を内在状態と外在状態に分離できる場合。Java では String のインターンプール（String.intern()）、Integer.valueOf() のキャッシュ（-128〜127）、Boolean.valueOf() がこのパターンを使っています。",
      },
    ],
  },
  {
    id: "proxy",
    title: "Proxy",
    category: "structural",
    description:
      "他のオブジェクトへのアクセスを制御するための代理オブジェクトを提供する",
    sections: [
      {
        title: "概要",
        content:
          "Proxy パターンは、あるオブジェクトへのアクセスを制御するために、そのオブジェクトの代理（Proxy）を提供するパターンです。アクセス制御、遅延初期化、ログ記録、キャッシュなど、オブジェクトへのアクセスに追加の処理を挟むことができます。クライアントは本物のオブジェクトと同じインターフェースで Proxy を扱えます。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Subject: RealSubject と Proxy に共通のインターフェース。(2) RealSubject: 実際の処理を行うオブジェクト。(3) Proxy: RealSubject への参照を持ち、アクセスを制御するオブジェクト。Proxy にはいくつかの種類があります。Virtual Proxy（遅延初期化）、Protection Proxy（アクセス制御）、Remote Proxy（リモートアクセス）、Caching Proxy（結果のキャッシュ）などです。",
      },
      {
        title: "実装例",
        content:
          "以下はデータベースクエリの結果をキャッシュする Caching Proxy の実装例です。",
        code: `// Subject
public interface UserRepository {
    User findById(long id);
    List<User> findAll();
}

// RealSubject
public class DatabaseUserRepository implements UserRepository {
    @Override
    public User findById(long id) {
        System.out.println("DBクエリ実行: SELECT * FROM users WHERE id = " + id);
        // 実際にはDBアクセスを行う
        return new User(id, "User" + id);
    }

    @Override
    public List<User> findAll() {
        System.out.println("DBクエリ実行: SELECT * FROM users");
        return List.of(new User(1, "Alice"), new User(2, "Bob"));
    }
}

// Proxy (Caching Proxy)
public class CachingUserRepository implements UserRepository {
    private final UserRepository delegate;
    private final Map<Long, User> cache = new ConcurrentHashMap<>();
    private List<User> allUsersCache;
    private long cacheTimestamp;
    private static final long CACHE_TTL = 60_000; // 60秒

    public CachingUserRepository(UserRepository delegate) {
        this.delegate = delegate;
    }

    @Override
    public User findById(long id) {
        return cache.computeIfAbsent(id, delegate::findById);
    }

    @Override
    public List<User> findAll() {
        if (allUsersCache == null || isCacheExpired()) {
            allUsersCache = delegate.findAll();
            cacheTimestamp = System.currentTimeMillis();
        }
        return allUsersCache;
    }

    private boolean isCacheExpired() {
        return System.currentTimeMillis() - cacheTimestamp > CACHE_TTL;
    }

    public void clearCache() {
        cache.clear();
        allUsersCache = null;
    }
}

// 使用例
UserRepository repo = new CachingUserRepository(
    new DatabaseUserRepository());
User user1 = repo.findById(1);  // DBアクセス
User user2 = repo.findById(1);  // キャッシュから取得（DBアクセスなし）`,
      },
      {
        title: "使いどころ",
        content:
          "Proxy パターンは以下の場面で有効です。(1) 重いオブジェクトの遅延初期化（Virtual Proxy）。(2) アクセス権限の制御（Protection Proxy）。(3) リモートオブジェクトへのアクセス（Remote Proxy）。(4) クエリ結果のキャッシュ（Caching Proxy）。Java では java.lang.reflect.Proxy（動的プロキシ）、Spring AOP のプロキシ、JPA のLazy Loading がこのパターンの代表例です。",
      },
    ],
  },

  // ===== 振る舞いパターン (Behavioral) =====
  {
    id: "chain-of-responsibility",
    title: "Chain of Responsibility",
    category: "behavioral",
    description:
      "リクエストを処理するオブジェクトの連鎖を構成し、リクエストを処理できるオブジェクトに到達するまで連鎖に沿って渡していく",
    sections: [
      {
        title: "概要",
        content:
          "Chain of Responsibility パターンは、リクエストの送信者と受信者を分離し、複数のハンドラオブジェクトを鎖のように繋げて、リクエストが処理されるまで順番に渡していくパターンです。各ハンドラは自身でリクエストを処理するか、次のハンドラに渡すかを判断します。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Handler: リクエストを処理するインターフェースと次のハンドラへの参照を持つ。(2) ConcreteHandler: 特定の種類のリクエストを処理する具体的なハンドラ。(3) Client: チェーンを構成し、先頭のハンドラにリクエストを送る。各ハンドラは単一責任の原則に従い、自分が担当する処理だけを行います。",
      },
      {
        title: "実装例",
        content:
          "以下はサポートチケットの段階的エスカレーションを実装した例です。",
        code: `// Handler
public abstract class SupportHandler {
    private SupportHandler next;

    public SupportHandler setNext(SupportHandler next) {
        this.next = next;
        return next;
    }

    public void handle(SupportTicket ticket) {
        if (canHandle(ticket)) {
            process(ticket);
        } else if (next != null) {
            next.handle(ticket);
        } else {
            System.out.println("対応できるハンドラがありません: "
                + ticket.getDescription());
        }
    }

    protected abstract boolean canHandle(SupportTicket ticket);
    protected abstract void process(SupportTicket ticket);
}

public record SupportTicket(String description, Priority priority) {
    public enum Priority { LOW, MEDIUM, HIGH, CRITICAL }
    public String getDescription() { return description; }
    public Priority getPriority() { return priority; }
}

// ConcreteHandler
public class FaqHandler extends SupportHandler {
    @Override
    protected boolean canHandle(SupportTicket ticket) {
        return ticket.getPriority() == SupportTicket.Priority.LOW;
    }

    @Override
    protected void process(SupportTicket ticket) {
        System.out.println("FAQ対応: " + ticket.getDescription());
    }
}

public class Level1Support extends SupportHandler {
    @Override
    protected boolean canHandle(SupportTicket ticket) {
        return ticket.getPriority() == SupportTicket.Priority.MEDIUM;
    }

    @Override
    protected void process(SupportTicket ticket) {
        System.out.println("L1サポート対応: " + ticket.getDescription());
    }
}

public class Level2Support extends SupportHandler {
    @Override
    protected boolean canHandle(SupportTicket ticket) {
        return ticket.getPriority() == SupportTicket.Priority.HIGH;
    }

    @Override
    protected void process(SupportTicket ticket) {
        System.out.println("L2エンジニア対応: " + ticket.getDescription());
    }
}

public class ManagerSupport extends SupportHandler {
    @Override
    protected boolean canHandle(SupportTicket ticket) {
        return true; // マネージャーはすべて対応
    }

    @Override
    protected void process(SupportTicket ticket) {
        System.out.println("マネージャー対応: " + ticket.getDescription());
    }
}

// 使用例
SupportHandler chain = new FaqHandler();
chain.setNext(new Level1Support())
     .setNext(new Level2Support())
     .setNext(new ManagerSupport());

chain.handle(new SupportTicket("パスワードリセット",
    SupportTicket.Priority.LOW));
chain.handle(new SupportTicket("本番障害",
    SupportTicket.Priority.CRITICAL));`,
      },
      {
        title: "使いどころ",
        content:
          "Chain of Responsibility パターンは以下の場面で有効です。(1) リクエストの処理を複数のハンドラに分散させたい場合。(2) 処理の順序を動的に変更したい場合。(3) ミドルウェアやフィルターチェーンの実装。Java では Servlet の Filter チェーン、java.util.logging の Handler、Spring Security のフィルターチェーンが代表例です。",
      },
    ],
  },
  {
    id: "command",
    title: "Command",
    category: "behavioral",
    description:
      "リクエストをオブジェクトとしてカプセル化し、パラメータ化、キュー化、ログ記録、取り消し操作を可能にする",
    sections: [
      {
        title: "概要",
        content:
          "Command パターンは、操作（リクエスト）をオブジェクトとしてカプセル化するパターンです。操作をオブジェクト化することで、操作の記録、取り消し（Undo）、やり直し（Redo）、キューイング、遅延実行などが可能になります。操作の呼び出し元と実行元を分離できます。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Command: 操作を実行するメソッドを宣言するインターフェース。(2) ConcreteCommand: 特定の操作とその引数を保持し、Receiver に処理を委譲する。(3) Receiver: 実際のビジネスロジックを持つクラス。(4) Invoker: Command を保持し実行するクラス。(5) Client: ConcreteCommand を生成し、Invoker に設定する。",
      },
      {
        title: "実装例",
        content:
          "以下はテキストエディタの Undo/Redo 機能を Command パターンで実装した例です。",
        code: `// Command インターフェース
public interface EditorCommand {
    void execute();
    void undo();
}

// Receiver
public class TextEditor {
    private final StringBuilder content = new StringBuilder();

    public void insert(int position, String text) {
        content.insert(position, text);
    }

    public void delete(int position, int length) {
        content.delete(position, position + length);
    }

    public String getContent() { return content.toString(); }
}

// ConcreteCommand: テキスト挿入
public class InsertCommand implements EditorCommand {
    private final TextEditor editor;
    private final int position;
    private final String text;

    public InsertCommand(TextEditor editor, int position, String text) {
        this.editor = editor;
        this.position = position;
        this.text = text;
    }

    @Override
    public void execute() {
        editor.insert(position, text);
    }

    @Override
    public void undo() {
        editor.delete(position, text.length());
    }
}

// ConcreteCommand: テキスト削除
public class DeleteCommand implements EditorCommand {
    private final TextEditor editor;
    private final int position;
    private final int length;
    private String deletedText;

    public DeleteCommand(TextEditor editor, int position, int length) {
        this.editor = editor;
        this.position = position;
        this.length = length;
    }

    @Override
    public void execute() {
        deletedText = editor.getContent()
            .substring(position, position + length);
        editor.delete(position, length);
    }

    @Override
    public void undo() {
        editor.insert(position, deletedText);
    }
}

// Invoker: コマンド履歴管理
public class CommandHistory {
    private final Deque<EditorCommand> undoStack = new ArrayDeque<>();
    private final Deque<EditorCommand> redoStack = new ArrayDeque<>();

    public void execute(EditorCommand command) {
        command.execute();
        undoStack.push(command);
        redoStack.clear();
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            EditorCommand cmd = undoStack.pop();
            cmd.undo();
            redoStack.push(cmd);
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            EditorCommand cmd = redoStack.pop();
            cmd.execute();
            undoStack.push(cmd);
        }
    }
}

// 使用例
TextEditor editor = new TextEditor();
CommandHistory history = new CommandHistory();

history.execute(new InsertCommand(editor, 0, "Hello "));
history.execute(new InsertCommand(editor, 6, "World"));
System.out.println(editor.getContent()); // "Hello World"

history.undo();
System.out.println(editor.getContent()); // "Hello "

history.redo();
System.out.println(editor.getContent()); // "Hello World"`,
      },
      {
        title: "使いどころ",
        content:
          "Command パターンは以下の場面で有効です。(1) Undo/Redo 機能の実装。(2) 操作のログ記録と再実行。(3) タスクキューやジョブスケジューラ。(4) マクロ（複数コマンドの一括実行）。Java では Runnable インターフェース、SwingのAction、CompletableFuture がこのパターンの考え方を取り入れています。",
      },
    ],
  },
  {
    id: "iterator",
    title: "Iterator",
    category: "behavioral",
    description:
      "集約オブジェクトの内部表現を公開せずに、要素へ順次アクセスする方法を提供する",
    sections: [
      {
        title: "概要",
        content:
          "Iterator パターンは、コレクションの内部構造を公開せずに、要素を順番にアクセスする手段を提供するパターンです。配列、リスト、ツリーなど異なるデータ構造に対して統一的な走査方法を提供できます。Java では Iterable / Iterator インターフェースとして言語レベルでサポートされています。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Iterator: 要素へのアクセスメソッド（hasNext, next）を宣言するインターフェース。(2) ConcreteIterator: 特定のコレクションに対する走査ロジックを実装する。(3) Aggregate: Iterator を生成するメソッドを持つインターフェース。(4) ConcreteAggregate: 具体的なコレクション。Java の拡張 for 文（for-each）は Iterable インターフェースを利用しています。",
      },
      {
        title: "実装例",
        content:
          "以下は組織の部署ツリーを深さ優先で走査するカスタム Iterator の実装例です。",
        code: `// 部署クラス
public class Department implements Iterable<Department> {
    private final String name;
    private final List<Department> subDepartments = new ArrayList<>();

    public Department(String name) {
        this.name = name;
    }

    public void addSubDepartment(Department dept) {
        subDepartments.add(dept);
    }

    public String getName() { return name; }
    public List<Department> getSubDepartments() { return subDepartments; }

    @Override
    public Iterator<Department> iterator() {
        return new DepthFirstIterator(this);
    }
}

// ConcreteIterator: 深さ優先走査
public class DepthFirstIterator implements Iterator<Department> {
    private final Deque<Department> stack = new ArrayDeque<>();

    public DepthFirstIterator(Department root) {
        stack.push(root);
    }

    @Override
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    @Override
    public Department next() {
        if (!hasNext()) {
            throw new NoSuchElementException();
        }
        Department current = stack.pop();
        // 子部署を逆順でスタックに積む（正順で走査するため）
        List<Department> subs = current.getSubDepartments();
        for (int i = subs.size() - 1; i >= 0; i--) {
            stack.push(subs.get(i));
        }
        return current;
    }
}

// 使用例
Department company = new Department("本社");
Department dev = new Department("開発部");
dev.addSubDepartment(new Department("フロントエンドチーム"));
dev.addSubDepartment(new Department("バックエンドチーム"));
Department sales = new Department("営業部");
sales.addSubDepartment(new Department("国内営業"));
company.addSubDepartment(dev);
company.addSubDepartment(sales);

// for-each で走査（Iterator パターン）
for (Department dept : company) {
    System.out.println(dept.getName());
}
// 本社 → 開発部 → フロントエンドチーム → バックエンドチーム → 営業部 → 国内営業`,
      },
      {
        title: "使いどころ",
        content:
          "Iterator パターンは以下の場面で有効です。(1) コレクションの内部構造を隠蔽したい場合。(2) 異なるデータ構造に対して統一的な走査手段を提供したい場合。(3) 複数の走査方法（深さ優先、幅優先など）をサポートしたい場合。Java では java.util.Iterator、Iterable インターフェース、Stream API がこのパターンの実装です。for-each 文が使えるのは Iterable のおかげです。",
      },
    ],
  },
  {
    id: "mediator",
    title: "Mediator",
    category: "behavioral",
    description:
      "オブジェクト間の相互作用を仲介者オブジェクトにカプセル化し、オブジェクト同士の直接参照をなくす",
    sections: [
      {
        title: "概要",
        content:
          "Mediator パターンは、複数のオブジェクト間の複雑なやり取りを仲介者（Mediator）に集約するパターンです。各オブジェクトは他のオブジェクトを直接参照せず、Mediator を通じて通信します。これにより、オブジェクト間の結合度を下げ、相互作用のロジックを一箇所に集中できます。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Mediator: 同僚オブジェクト間の通信インターフェースを定義する。(2) ConcreteMediator: 同僚オブジェクト間の調整ロジックを実装する。(3) Colleague: Mediator への参照を持ち、他の Colleague とは Mediator を通じてやり取りする。(4) ConcreteColleague: 具体的な同僚オブジェクト。",
      },
      {
        title: "実装例",
        content:
          "以下はチャットルームを仲介者としたメッセージングシステムの実装例です。",
        code: `// Mediator
public interface ChatMediator {
    void sendMessage(String message, User sender);
    void addUser(User user);
}

// Colleague
public abstract class User {
    protected final String name;
    protected final ChatMediator mediator;

    protected User(String name, ChatMediator mediator) {
        this.name = name;
        this.mediator = mediator;
    }

    public abstract void send(String message);
    public abstract void receive(String message, String from);
    public String getName() { return name; }
}

// ConcreteMediator
public class ChatRoom implements ChatMediator {
    private final List<User> users = new ArrayList<>();
    private final List<String> messageLog = new ArrayList<>();

    @Override
    public void sendMessage(String message, User sender) {
        String logEntry = sender.getName() + ": " + message;
        messageLog.add(logEntry);

        for (User user : users) {
            if (user != sender) {
                user.receive(message, sender.getName());
            }
        }
    }

    @Override
    public void addUser(User user) {
        users.add(user);
        // 入室通知
        for (User u : users) {
            if (u != user) {
                u.receive(user.getName() + " が入室しました", "システム");
            }
        }
    }

    public List<String> getMessageLog() {
        return Collections.unmodifiableList(messageLog);
    }
}

// ConcreteColleague
public class ChatUser extends User {
    public ChatUser(String name, ChatMediator mediator) {
        super(name, mediator);
    }

    @Override
    public void send(String message) {
        System.out.println(name + " が送信: " + message);
        mediator.sendMessage(message, this);
    }

    @Override
    public void receive(String message, String from) {
        System.out.println(name + " が受信 [" + from + "]: " + message);
    }
}

// 使用例
ChatMediator chatRoom = new ChatRoom();
User alice = new ChatUser("Alice", chatRoom);
User bob = new ChatUser("Bob", chatRoom);
User charlie = new ChatUser("Charlie", chatRoom);

chatRoom.addUser(alice);
chatRoom.addUser(bob);
chatRoom.addUser(charlie);

alice.send("こんにちは！");
bob.send("やあ、Alice！");`,
      },
      {
        title: "使いどころ",
        content:
          "Mediator パターンは以下の場面で有効です。(1) 多数のオブジェクトが相互に通信し、結合度が高くなっている場合。(2) GUI のダイアログで複数のコンポーネント間の連携を管理する場合。(3) イベントバスやメッセージブローカーの実装。Java では java.util.Timer（タスクのスケジューリングを仲介）、Spring の ApplicationContext（Bean 間の依存関係を仲介）が代表例です。",
      },
    ],
  },
  {
    id: "memento",
    title: "Memento",
    category: "behavioral",
    description:
      "カプセル化を破壊せずにオブジェクトの内部状態を保存し、後でその状態に復元できるようにする",
    sections: [
      {
        title: "概要",
        content:
          "Memento パターンは、オブジェクトの状態をスナップショットとして保存し、後からその状態に復元できるようにするパターンです。カプセル化を維持したまま状態を外部に保存できるため、Undo 機能やチェックポイント機能の実装に適しています。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Originator: 状態を保存・復元したいオブジェクト。Memento を生成し、Memento から状態を復元する。(2) Memento: Originator の内部状態のスナップショット。不変オブジェクトとして実装するのが望ましい。(3) Caretaker: Memento を保管するが、中身にはアクセスしない。いつ保存・復元するかを管理する。",
      },
      {
        title: "実装例",
        content:
          "以下はゲームのセーブ/ロード機能を Memento パターンで実装した例です。",
        code: `// Memento（不変オブジェクト）
public record GameSave(
    String playerName,
    int level,
    int hp,
    int score,
    LocalDateTime savedAt
) {}

// Originator
public class Game {
    private String playerName;
    private int level;
    private int hp;
    private int score;

    public Game(String playerName) {
        this.playerName = playerName;
        this.level = 1;
        this.hp = 100;
        this.score = 0;
    }

    public void play() {
        level++;
        score += (int) (Math.random() * 100);
        hp -= (int) (Math.random() * 30);
        System.out.printf("プレイ中... Lv:%d HP:%d Score:%d%n",
            level, hp, score);
    }

    // Memento を生成
    public GameSave save() {
        System.out.println("ゲームをセーブしました");
        return new GameSave(playerName, level, hp, score,
            LocalDateTime.now());
    }

    // Memento から復元
    public void load(GameSave save) {
        this.playerName = save.playerName();
        this.level = save.level();
        this.hp = save.hp();
        this.score = save.score();
        System.out.printf("ゲームをロードしました (Lv:%d HP:%d Score:%d)%n",
            level, hp, score);
    }

    @Override
    public String toString() {
        return String.format("Game{player='%s', Lv:%d, HP:%d, Score:%d}",
            playerName, level, hp, score);
    }
}

// Caretaker
public class SaveManager {
    private final List<GameSave> saves = new ArrayList<>();

    public void saveGame(Game game) {
        saves.add(game.save());
    }

    public GameSave getLatestSave() {
        if (saves.isEmpty()) {
            throw new IllegalStateException("セーブデータがありません");
        }
        return saves.getLast();
    }

    public List<GameSave> getAllSaves() {
        return Collections.unmodifiableList(saves);
    }
}

// 使用例
Game game = new Game("勇者太郎");
SaveManager saveManager = new SaveManager();

game.play();
saveManager.saveGame(game);  // チェックポイント

game.play();
game.play();  // HPが減少...

System.out.println("ピンチ！ロードします");
game.load(saveManager.getLatestSave());`,
      },
      {
        title: "使いどころ",
        content:
          "Memento パターンは以下の場面で有効です。(1) Undo/Redo 機能の状態管理。(2) トランザクションのロールバック。(3) ゲームのセーブ/ロード機能。(4) エディタの履歴管理。Java では java.io.Serializable を使ったオブジェクトの直列化が Memento の一形態と言えます。状態が大きい場合はメモリ消費に注意し、差分のみを保存する工夫が必要です。",
      },
    ],
  },
  {
    id: "observer",
    title: "Observer",
    category: "behavioral",
    description:
      "オブジェクトの状態変化を他のオブジェクトに自動的に通知し、依存オブジェクトを更新する",
    sections: [
      {
        title: "概要",
        content:
          "Observer パターンは、あるオブジェクト（Subject）の状態が変化した際に、それに依存するすべてのオブジェクト（Observer）に自動的に通知するパターンです。pub/sub（出版-購読）モデルとも呼ばれ、イベント駆動プログラミングの基盤となる重要なパターンです。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Subject: Observer の登録・削除・通知のメソッドを持つ。(2) ConcreteSubject: 状態を保持し、変化時に Observer に通知する。(3) Observer: 通知を受け取るインターフェース。(4) ConcreteObserver: 通知を受けて具体的な処理を行う。疎結合にするため、Subject は Observer のインターフェースだけを知っています。",
      },
      {
        title: "実装例",
        content:
          "以下は EC サイトの注文イベントを監視する Observer パターンの実装例です。sealed インターフェースで型安全なイベント型を定義し、メール通知・在庫管理・監査ログの各サービスが独立してイベントを購読します。",
        code: `// イベント型を sealed で定義（型安全な Observer）
public sealed interface OrderEvent {
    String orderId();
    LocalDateTime timestamp();

    record Created(String orderId, String customerId,
                   long totalAmount, LocalDateTime timestamp) implements OrderEvent {}
    record Paid(String orderId, String transactionId,
                LocalDateTime timestamp) implements OrderEvent {}
    record Shipped(String orderId, String trackingNumber,
                   LocalDateTime timestamp) implements OrderEvent {}
    record Cancelled(String orderId, String reason,
                     LocalDateTime timestamp) implements OrderEvent {}
}

// Observer インターフェース（ジェネリクスでイベント型を制約）
@FunctionalInterface
public interface EventListener<T extends OrderEvent> {
    void onEvent(T event);
}

// Subject: 型安全なイベントバス
public class OrderEventBus {
    // イベント型ごとにリスナーを管理
    private final Map<Class<? extends OrderEvent>,
        List<EventListener<? extends OrderEvent>>> listeners
            = new ConcurrentHashMap<>();

    @SuppressWarnings("unchecked")
    public <T extends OrderEvent> void subscribe(
            Class<T> eventType, EventListener<T> listener) {
        listeners.computeIfAbsent(eventType,
            k -> new CopyOnWriteArrayList<>()).add(listener);
    }

    @SuppressWarnings("unchecked")
    public <T extends OrderEvent> void publish(T event) {
        var eventListeners = listeners.getOrDefault(
            event.getClass(), List.of());
        for (var listener : eventListeners) {
            ((EventListener<T>) listener).onEvent(event);
        }
    }
}

// ConcreteObserver 1: メール通知サービス
public class EmailNotificationService {
    public void register(OrderEventBus bus) {
        // 注文作成時に確認メール
        bus.subscribe(OrderEvent.Created.class, event ->
            System.out.printf("メール送信: 注文 %s を承りました（%,d円）%n",
                event.orderId(), event.totalAmount()));

        // 出荷時に発送通知メール
        bus.subscribe(OrderEvent.Shipped.class, event ->
            System.out.printf("メール送信: 注文 %s 発送済（追跡: %s）%n",
                event.orderId(), event.trackingNumber()));

        // キャンセル時にキャンセル確認メール
        bus.subscribe(OrderEvent.Cancelled.class, event ->
            System.out.printf("メール送信: 注文 %s キャンセル（理由: %s）%n",
                event.orderId(), event.reason()));
    }
}

// ConcreteObserver 2: 在庫管理サービス
public class InventoryService {
    public void register(OrderEventBus bus) {
        bus.subscribe(OrderEvent.Created.class, event -> {
            System.out.println("在庫引当: 注文 " + event.orderId());
            // 在庫DBの引当処理...
        });
        bus.subscribe(OrderEvent.Cancelled.class, event -> {
            System.out.println("在庫戻入: 注文 " + event.orderId());
            // 在庫の引当解除...
        });
    }
}

// ConcreteObserver 3: 監査ログサービス
public class AuditLogService {
    public void register(OrderEventBus bus) {
        // すべてのイベントをログに記録
        for (var type : List.of(OrderEvent.Created.class,
                OrderEvent.Paid.class, OrderEvent.Shipped.class,
                OrderEvent.Cancelled.class)) {
            bus.subscribe(type, event ->
                System.out.printf("[AUDIT %s] %s: %s%n",
                    event.timestamp(), event.getClass().getSimpleName(),
                    event.orderId()));
        }
    }
}

// 使用例
var bus = new OrderEventBus();
new EmailNotificationService().register(bus);
new InventoryService().register(bus);
new AuditLogService().register(bus);

// 注文ライフサイクル: 各イベントを発行すると全 Observer に通知
var now = LocalDateTime.now();
bus.publish(new OrderEvent.Created("ORD-001", "CUST-42", 15_800, now));
bus.publish(new OrderEvent.Paid("ORD-001", "TX-abc123", now.plusMinutes(1)));
bus.publish(new OrderEvent.Shipped("ORD-001", "JP1234567890", now.plusHours(3)));`,
      },
      {
        title: "使いどころ",
        content:
          "Observer パターンは以下の場面で有効です。(1) イベント駆動のアーキテクチャ（GUI イベント、メッセージング）。(2) MVC パターンの Model と View の連携。(3) リアクティブプログラミングの基盤。(4) 設定変更の自動反映。Java では java.beans.PropertyChangeListener、java.util.concurrent.Flow（Reactive Streams）、Spring の ApplicationEvent がこのパターンの実装です。",
      },
    ],
  },
  {
    id: "state",
    title: "State",
    category: "behavioral",
    description:
      "オブジェクトの内部状態に応じて振る舞いを変更する。状態遷移をオブジェクト指向で表現する",
    sections: [
      {
        title: "概要",
        content:
          "State パターンは、オブジェクトの内部状態に応じて振る舞いを変えるパターンです。状態ごとにクラスを作成し、状態遷移を明確にモデル化します。if-else や switch 文による状態判定を排除し、各状態の振る舞いを個別のクラスにカプセル化することで、コードの保守性と拡張性が向上します。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Context: 現在の状態への参照を保持し、クライアントへのインターフェースを提供する。(2) State: 状態ごとの振る舞いを宣言するインターフェース。(3) ConcreteState: 特定の状態における振る舞いを実装するクラス。Context は処理を現在の State オブジェクトに委譲します。",
      },
      {
        title: "実装例",
        content:
          "以下は自動販売機の状態遷移を State パターンで実装した例です。",
        code: `// State インターフェース
public interface VendingMachineState {
    void insertCoin(VendingMachine machine);
    void selectProduct(VendingMachine machine, String product);
    void dispense(VendingMachine machine);
}

// Context
public class VendingMachine {
    private VendingMachineState state;
    private int balance = 0;
    private String selectedProduct;

    public VendingMachine() {
        this.state = new IdleState();
    }

    public void setState(VendingMachineState state) {
        this.state = state;
    }

    public void insertCoin() { state.insertCoin(this); }
    public void selectProduct(String product) {
        state.selectProduct(this, product);
    }
    public void dispense() { state.dispense(this); }

    // 内部状態管理
    public void addBalance(int amount) { balance += amount; }
    public int getBalance() { return balance; }
    public void resetBalance() { balance = 0; }
    public void setSelectedProduct(String product) {
        selectedProduct = product;
    }
    public String getSelectedProduct() { return selectedProduct; }
}

// ConcreteState: 待機状態
public class IdleState implements VendingMachineState {
    @Override
    public void insertCoin(VendingMachine machine) {
        machine.addBalance(100);
        System.out.println("100円投入。残高: " + machine.getBalance() + "円");
        machine.setState(new HasCoinState());
    }

    @Override
    public void selectProduct(VendingMachine machine, String product) {
        System.out.println("先にコインを投入してください");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("先にコインを投入してください");
    }
}

// ConcreteState: コイン投入済み
public class HasCoinState implements VendingMachineState {
    @Override
    public void insertCoin(VendingMachine machine) {
        machine.addBalance(100);
        System.out.println("追加投入。残高: " + machine.getBalance() + "円");
    }

    @Override
    public void selectProduct(VendingMachine machine, String product) {
        machine.setSelectedProduct(product);
        System.out.println(product + " を選択しました");
        machine.setState(new DispensingState());
        machine.dispense();
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("商品を選択してください");
    }
}

// ConcreteState: 商品排出中
public class DispensingState implements VendingMachineState {
    @Override
    public void insertCoin(VendingMachine machine) {
        System.out.println("しばらくお待ちください");
    }

    @Override
    public void selectProduct(VendingMachine machine, String product) {
        System.out.println("しばらくお待ちください");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println(machine.getSelectedProduct() + " を排出しました");
        machine.resetBalance();
        machine.setState(new IdleState());
    }
}

// 使用例
VendingMachine vm = new VendingMachine();
vm.selectProduct("コーラ");  // 先にコインを投入してください
vm.insertCoin();              // 100円投入
vm.insertCoin();              // 追加投入
vm.selectProduct("コーラ");  // コーラ を選択 → 排出`,
      },
      {
        title: "使いどころ",
        content:
          "State パターンは以下の場面で有効です。(1) オブジェクトの振る舞いが状態によって大きく異なる場合。(2) 状態遷移のロジックが複雑な場合。(3) 状態に応じた条件分岐が多く可読性が低下している場合。Java では java.lang.Thread の状態管理（NEW, RUNNABLE, BLOCKED 等）や、ワークフローエンジン、ネットワークプロトコルの状態管理などが代表例です。",
      },
    ],
  },
  {
    id: "strategy",
    title: "Strategy",
    category: "behavioral",
    description:
      "アルゴリズムのファミリーを定義し、各アルゴリズムをカプセル化して交換可能にする",
    sections: [
      {
        title: "概要",
        content:
          "Strategy パターンは、アルゴリズムを個別のクラスにカプセル化し、実行時に切り替えられるようにするパターンです。同じ問題に対する複数の解法を用意し、状況に応じて最適なアルゴリズムを選択できます。if-else による分岐を排除し、開放/閉鎖原則（OCP）に従った設計を実現します。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Strategy: アルゴリズムの共通インターフェース。(2) ConcreteStrategy: 具体的なアルゴリズムの実装。(3) Context: Strategy への参照を保持し、クライアントへのインターフェースを提供する。Java 8 以降では、関数型インターフェースとラムダ式を使った簡潔な実装も可能です。",
      },
      {
        title: "実装例",
        content:
          "以下は EC サイトの決済処理を Strategy パターンで実装した例です。クレジットカード・銀行振込・QR コード決済を sealed インターフェースで型安全に定義し、実行時に切り替えられます。",
        code: `// Strategy インターフェース: 決済処理の戦略
public sealed interface PaymentStrategy
        permits CreditCardPayment, BankTransferPayment, QrCodePayment {
    /** 決済を実行し、トランザクション ID を返す */
    PaymentResult pay(PaymentRequest request);
    /** この決済手段が利用可能かチェック */
    boolean supports(String currency);
}

// 決済リクエスト / 結果を record で定義
public record PaymentRequest(
    String orderId, long amount, String currency, String customerEmail
) {}

public record PaymentResult(
    String transactionId, boolean success, String message
) {}

// ConcreteStrategy: クレジットカード決済
public final class CreditCardPayment implements PaymentStrategy {
    private final String cardNumber;
    private final String expiry;
    private final String cvv;

    public CreditCardPayment(String cardNumber, String expiry, String cvv) {
        this.cardNumber = cardNumber;
        this.expiry = expiry;
        this.cvv = cvv;
    }

    @Override
    public PaymentResult pay(PaymentRequest req) {
        // カード番号の簡易バリデーション
        if (cardNumber.length() != 16) {
            return new PaymentResult(null, false, "無効なカード番号");
        }
        // 外部決済 API を呼び出す（簡略化）
        String txId = "CC-" + UUID.randomUUID().toString().substring(0, 8);
        System.out.printf("カード決済: %s %,d %s [****%s]%n",
            req.orderId(), req.amount(), req.currency(),
            cardNumber.substring(12));
        return new PaymentResult(txId, true, "カード決済完了");
    }

    @Override
    public boolean supports(String currency) {
        // クレジットカードは主要通貨をサポート
        return Set.of("JPY", "USD", "EUR").contains(currency);
    }
}

// ConcreteStrategy: 銀行振込
public final class BankTransferPayment implements PaymentStrategy {
    private final String bankCode;
    private final String accountNumber;

    public BankTransferPayment(String bankCode, String accountNumber) {
        this.bankCode = bankCode;
        this.accountNumber = accountNumber;
    }

    @Override
    public PaymentResult pay(PaymentRequest req) {
        // 振込依頼を生成
        String txId = "BT-" + UUID.randomUUID().toString().substring(0, 8);
        System.out.printf("銀行振込: %s %,d %s → 銀行 %s 口座 %s%n",
            req.orderId(), req.amount(), req.currency(),
            bankCode, accountNumber);
        return new PaymentResult(txId, true,
            "振込依頼受付済（入金確認まで1-2営業日）");
    }

    @Override
    public boolean supports(String currency) {
        return "JPY".equals(currency); // 国内銀行振込は日本円のみ
    }
}

// ConcreteStrategy: QRコード決済 (PayPay, LINE Pay 等)
public final class QrCodePayment implements PaymentStrategy {
    private final String providerId;  // "paypay", "linepay" など

    public QrCodePayment(String providerId) {
        this.providerId = providerId;
    }

    @Override
    public PaymentResult pay(PaymentRequest req) {
        if (req.amount() > 500_000) {
            return new PaymentResult(null, false,
                "QR決済は50万円以下が上限です");
        }
        String txId = "QR-" + UUID.randomUUID().toString().substring(0, 8);
        System.out.printf("QR決済 [%s]: %s %,d %s%n",
            providerId, req.orderId(), req.amount(), req.currency());
        return new PaymentResult(txId, true, providerId + " 決済完了");
    }

    @Override
    public boolean supports(String currency) {
        return "JPY".equals(currency);
    }
}

// Context: 注文の決済処理
public class PaymentProcessor {
    private PaymentStrategy strategy;

    public PaymentProcessor(PaymentStrategy strategy) {
        this.strategy = Objects.requireNonNull(strategy);
    }

    /** 戦略を実行時に切り替え可能 */
    public void setStrategy(PaymentStrategy strategy) {
        this.strategy = Objects.requireNonNull(strategy);
    }

    /** 決済を実行（通貨チェック → 決済 → 結果ログ） */
    public PaymentResult processPayment(PaymentRequest request) {
        if (!strategy.supports(request.currency())) {
            return new PaymentResult(null, false,
                request.currency() + " はこの決済手段に対応していません");
        }
        PaymentResult result = strategy.pay(request);
        System.out.printf("決済結果: %s [%s] %s%n",
            result.transactionId(), result.success() ? "成功" : "失敗",
            result.message());
        return result;
    }
}

// 使用例
var request = new PaymentRequest("ORD-2025-001", 12_800, "JPY", "user@example.com");

// カード決済
var processor = new PaymentProcessor(
    new CreditCardPayment("4111111111111111", "12/26", "123"));
processor.processPayment(request);

// 実行時に QR 決済に切り替え
processor.setStrategy(new QrCodePayment("paypay"));
processor.processPayment(request);

// ラムダ風にファクトリで戦略を選択する例
PaymentStrategy selected = switch (userChoice) {
    case "card"     -> new CreditCardPayment(cardNo, exp, cvv);
    case "bank"     -> new BankTransferPayment(bankCode, acctNo);
    case "qr"       -> new QrCodePayment("paypay");
    default         -> throw new IllegalArgumentException("未対応の決済手段");
};`,
      },
      {
        title: "使いどころ",
        content:
          "Strategy パターンは以下の場面で有効です。(1) 同じ処理に対して複数のアルゴリズムを切り替えたい場合。(2) 条件分岐で振る舞いを変えているコードをリファクタリングする場合。(3) 実行時にアルゴリズムを動的に選択する場合。Java では Comparator（ソート戦略）、java.util.function パッケージの関数型インターフェース、Spring の各種 Strategy インターフェースがこのパターンの代表例です。",
      },
    ],
  },
  {
    id: "template-method",
    title: "Template Method",
    category: "behavioral",
    description:
      "アルゴリズムの骨格を定義し、具体的なステップの実装をサブクラスに委ねる",
    sections: [
      {
        title: "概要",
        content:
          "Template Method パターンは、処理の流れ（テンプレート）を親クラスで定義し、個々のステップの実装をサブクラスに委ねるパターンです。アルゴリズムの構造は変えずに、各ステップの詳細だけを変更できます。「フレームワーク」が提供する拡張ポイントの典型的な実装方法です。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) AbstractClass: テンプレートメソッド（final）を定義し、アルゴリズムの骨格を記述する。抽象メソッドで各ステップを宣言する。(2) ConcreteClass: AbstractClass を継承し、抽象メソッドを実装する。フック（hook）メソッドはデフォルト実装を持ち、必要に応じてオーバーライドする。",
      },
      {
        title: "実装例",
        content:
          "以下はデータ処理パイプラインを Template Method パターンで実装した例です。読み込み・変換・出力の流れは固定しつつ、各ステップの詳細をサブクラスで定義します。",
        code: `// AbstractClass
public abstract class DataProcessor {
    // Template Method（final で骨格を固定）
    public final void process() {
        List<String> rawData = readData();
        List<String> cleanedData = cleanData(rawData);
        List<String> transformedData = transformData(cleanedData);
        if (shouldValidate()) {  // フック
            validateData(transformedData);
        }
        outputData(transformedData);
        onComplete();  // フック
    }

    // 抽象メソッド（サブクラスが実装必須）
    protected abstract List<String> readData();
    protected abstract List<String> transformData(List<String> data);
    protected abstract void outputData(List<String> data);

    // 共通処理
    private List<String> cleanData(List<String> data) {
        return data.stream()
            .filter(s -> s != null && !s.isBlank())
            .map(String::trim)
            .toList();
    }

    // フックメソッド（オーバーライド任意）
    protected boolean shouldValidate() { return true; }
    protected void validateData(List<String> data) {
        System.out.println("データ検証: " + data.size() + " 件OK");
    }
    protected void onComplete() {
        System.out.println("処理完了");
    }
}

// ConcreteClass: CSV処理
public class CsvProcessor extends DataProcessor {
    private final String filePath;

    public CsvProcessor(String filePath) {
        this.filePath = filePath;
    }

    @Override
    protected List<String> readData() {
        System.out.println("CSVファイル読み込み: " + filePath);
        return List.of("Tokyo,100", "Osaka,200", "", "Nagoya,150");
    }

    @Override
    protected List<String> transformData(List<String> data) {
        return data.stream()
            .map(line -> line.toUpperCase())
            .toList();
    }

    @Override
    protected void outputData(List<String> data) {
        data.forEach(line -> System.out.println("出力: " + line));
    }
}

// ConcreteClass: API処理
public class ApiProcessor extends DataProcessor {
    @Override
    protected List<String> readData() {
        System.out.println("API からデータ取得");
        return List.of("{\\"id\\": 1}", "{\\"id\\": 2}");
    }

    @Override
    protected List<String> transformData(List<String> data) {
        return data.stream()
            .map(json -> "processed:" + json)
            .toList();
    }

    @Override
    protected void outputData(List<String> data) {
        System.out.println("DBに保存: " + data.size() + " 件");
    }

    @Override
    protected boolean shouldValidate() { return false; }
}

// 使用例
DataProcessor csv = new CsvProcessor("sales.csv");
csv.process();

DataProcessor api = new ApiProcessor();
api.process();`,
      },
      {
        title: "使いどころ",
        content:
          "Template Method パターンは以下の場面で有効です。(1) アルゴリズムの骨格を固定し、詳細だけを変更可能にしたい場合。(2) フレームワークの拡張ポイントを提供する場合。(3) 複数クラスに共通する処理をまとめる場合。Java では AbstractList、HttpServlet（doGet/doPost）、Spring の JdbcTemplate、JUnit のテストライフサイクル（@BeforeEach/@Test/@AfterEach）がこのパターンを使っています。",
      },
    ],
  },
  {
    id: "visitor",
    title: "Visitor",
    category: "behavioral",
    description:
      "データ構造の要素に対して行う処理を、データ構造から分離して別クラスに定義する",
    sections: [
      {
        title: "概要",
        content:
          "Visitor パターンは、オブジェクト構造の要素に対する操作を、要素クラスから分離して Visitor クラスに定義するパターンです。新しい操作を追加する際にデータ構造のクラスを変更する必要がなく、操作の追加が容易になります。ダブルディスパッチの仕組みを利用して、要素の型に応じた処理を実現します。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) Visitor: 各要素に対する visit メソッドを宣言するインターフェース。(2) ConcreteVisitor: 各要素に対する具体的な処理を実装する。(3) Element: Visitor を受け入れる accept メソッドを持つインターフェース。(4) ConcreteElement: accept メソッドで自身を引数に Visitor の visit を呼び出す。Java 17 以降では sealed クラスとパターンマッチングで同様の機能を実現できます。",
      },
      {
        title: "実装例",
        content:
          "以下は数式の AST（抽象構文木）を Visitor パターンで処理する例です。sealed インターフェースと record で型安全なノードを定義し、評価（Evaluator）と整形表示（PrettyPrinter）を別々の Visitor として実装します。",
        code: `// Element: sealed で閉じた型階層を定義（Java 17+）
public sealed interface AstNode {
    void accept(AstVisitor visitor);

    // ConcreteElement: 数値リテラル
    record NumberLiteral(double value) implements AstNode {
        @Override
        public void accept(AstVisitor visitor) { visitor.visit(this); }
    }

    // ConcreteElement: 二項演算 (加算、減算、乗算、除算)
    record BinaryOp(AstNode left, String operator, AstNode right) implements AstNode {
        @Override
        public void accept(AstVisitor visitor) { visitor.visit(this); }
    }

    // ConcreteElement: 変数参照
    record Variable(String name) implements AstNode {
        @Override
        public void accept(AstVisitor visitor) { visitor.visit(this); }
    }

    // ConcreteElement: 関数呼び出し
    record FunctionCall(String name, List<AstNode> args) implements AstNode {
        @Override
        public void accept(AstVisitor visitor) { visitor.visit(this); }
    }
}

// Visitor インターフェース
public interface AstVisitor {
    void visit(AstNode.NumberLiteral node);
    void visit(AstNode.BinaryOp node);
    void visit(AstNode.Variable node);
    void visit(AstNode.FunctionCall node);
}

// ConcreteVisitor 1: 式を評価して計算結果を返す
public class Evaluator implements AstVisitor {
    private final Map<String, Double> variables;
    private double result;

    public Evaluator(Map<String, Double> variables) {
        this.variables = variables;
    }

    public double getResult() { return result; }

    @Override
    public void visit(AstNode.NumberLiteral node) {
        result = node.value();
    }

    @Override
    public void visit(AstNode.BinaryOp node) {
        node.left().accept(this);
        double left = result;
        node.right().accept(this);
        double right = result;
        result = switch (node.operator()) {
            case "+" -> left + right;
            case "-" -> left - right;
            case "*" -> left * right;
            case "/" -> {
                if (right == 0) throw new ArithmeticException("ゼロ除算");
                yield left / right;
            }
            default -> throw new IllegalArgumentException(
                "未知の演算子: " + node.operator());
        };
    }

    @Override
    public void visit(AstNode.Variable node) {
        Double val = variables.get(node.name());
        if (val == null) throw new IllegalArgumentException(
            "未定義の変数: " + node.name());
        result = val;
    }

    @Override
    public void visit(AstNode.FunctionCall node) {
        double[] args = node.args().stream()
            .mapToDouble(arg -> { arg.accept(this); return result; })
            .toArray();
        result = switch (node.name()) {
            case "max" -> Arrays.stream(args).max().orElse(0);
            case "min" -> Arrays.stream(args).min().orElse(0);
            case "sqrt" -> Math.sqrt(args[0]);
            default -> throw new IllegalArgumentException(
                "未知の関数: " + node.name());
        };
    }
}

// ConcreteVisitor 2: AST を可読文字列に変換（別の操作を追加）
public class PrettyPrinter implements AstVisitor {
    private final StringBuilder sb = new StringBuilder();

    public String getOutput() { return sb.toString(); }

    @Override
    public void visit(AstNode.NumberLiteral node) {
        sb.append(node.value());
    }

    @Override
    public void visit(AstNode.BinaryOp node) {
        sb.append("(");
        node.left().accept(this);
        sb.append(" ").append(node.operator()).append(" ");
        node.right().accept(this);
        sb.append(")");
    }

    @Override
    public void visit(AstNode.Variable node) {
        sb.append(node.name());
    }

    @Override
    public void visit(AstNode.FunctionCall node) {
        sb.append(node.name()).append("(");
        for (int i = 0; i < node.args().size(); i++) {
            if (i > 0) sb.append(", ");
            node.args().get(i).accept(this);
        }
        sb.append(")");
    }
}

// 使用例: AST 構築 → 複数の Visitor で操作
// 式: max(x, 10) + y * 2
AstNode ast = new AstNode.BinaryOp(
    new AstNode.FunctionCall("max", List.of(
        new AstNode.Variable("x"),
        new AstNode.NumberLiteral(10))),
    "+",
    new AstNode.BinaryOp(
        new AstNode.Variable("y"),
        "*",
        new AstNode.NumberLiteral(2)));

// Visitor 1: 整形表示
var printer = new PrettyPrinter();
ast.accept(printer);
System.out.println(printer.getOutput()); // (max(x, 10) + (y * 2))

// Visitor 2: 評価（x=7, y=3 の場合）
var evaluator = new Evaluator(Map.of("x", 7.0, "y", 3.0));
ast.accept(evaluator);
System.out.println("結果: " + evaluator.getResult()); // 16.0`,
      },
      {
        title: "使いどころ",
        content:
          "Visitor パターンは以下の場面で有効です。(1) 複雑なオブジェクト構造に対して多様な操作を追加したい場合。(2) データ構造は安定しているが、操作が頻繁に追加される場合。(3) AST（抽象構文木）の操作やコンパイラの実装。Java では javax.lang.model.element.ElementVisitor（アノテーションプロセッサ）、java.nio.file.FileVisitor がこのパターンを使っています。Java 17 以降の sealed + switch パターンマッチングが代替となる場合もあります。",
      },
    ],
  },
  {
    id: "interpreter",
    title: "Interpreter",
    category: "behavioral",
    description:
      "言語の文法規則をクラスで表現し、文を解釈して実行する仕組みを提供する",
    sections: [
      {
        title: "概要",
        content:
          "Interpreter パターンは、簡単な言語（DSL: ドメイン固有言語）の文法をクラスとして表現し、その文法に従って式を評価・実行するパターンです。正規表現、SQL、数式パーサー、設定ファイルのルールエンジンなど、繰り返し出現する問題を小さな言語で表現して解釈する場面に適しています。",
      },
      {
        title: "構造",
        content:
          "主な登場人物は次の通りです。(1) AbstractExpression: 式を解釈するメソッド（interpret）を宣言するインターフェース。(2) TerminalExpression: 文法の終端記号に対応する式。変数やリテラルなど。(3) NonterminalExpression: 文法の非終端記号に対応する式。他の Expression を組み合わせて構成する。(4) Context: 解釈に必要なグローバル情報を保持する。(5) Client: 構文木を組み立て、interpret を呼び出す。",
      },
      {
        title: "実装例",
        content:
          "以下はブール式を解釈する Interpreter パターンの実装例です。変数の AND、OR、NOT 演算を表現します。",
        code: `// AbstractExpression
public interface BoolExpression {
    boolean interpret(Map<String, Boolean> context);
}

// TerminalExpression: 変数
public class Variable implements BoolExpression {
    private final String name;

    public Variable(String name) {
        this.name = name;
    }

    @Override
    public boolean interpret(Map<String, Boolean> context) {
        Boolean value = context.get(name);
        if (value == null) {
            throw new IllegalArgumentException(
                "未定義の変数: " + name);
        }
        return value;
    }

    @Override
    public String toString() { return name; }
}

// TerminalExpression: 定数
public class Constant implements BoolExpression {
    private final boolean value;

    public Constant(boolean value) { this.value = value; }

    @Override
    public boolean interpret(Map<String, Boolean> context) {
        return value;
    }

    @Override
    public String toString() { return String.valueOf(value); }
}

// NonterminalExpression
public class And implements BoolExpression {
    private final BoolExpression left, right;

    public And(BoolExpression left, BoolExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean interpret(Map<String, Boolean> context) {
        return left.interpret(context) && right.interpret(context);
    }

    @Override
    public String toString() { return "(" + left + " AND " + right + ")"; }
}

public class Or implements BoolExpression {
    private final BoolExpression left, right;

    public Or(BoolExpression left, BoolExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean interpret(Map<String, Boolean> context) {
        return left.interpret(context) || right.interpret(context);
    }

    @Override
    public String toString() { return "(" + left + " OR " + right + ")"; }
}

public class Not implements BoolExpression {
    private final BoolExpression expr;

    public Not(BoolExpression expr) { this.expr = expr; }

    @Override
    public boolean interpret(Map<String, Boolean> context) {
        return !expr.interpret(context);
    }

    @Override
    public String toString() { return "NOT " + expr; }
}

// 使用例: (isAdmin OR (isMember AND NOT isBanned))
BoolExpression rule = new Or(
    new Variable("isAdmin"),
    new And(
        new Variable("isMember"),
        new Not(new Variable("isBanned"))
    )
);

Map<String, Boolean> user1 = Map.of(
    "isAdmin", false, "isMember", true, "isBanned", false);
Map<String, Boolean> user2 = Map.of(
    "isAdmin", false, "isMember", true, "isBanned", true);

System.out.println(rule);  // (isAdmin OR (isMember AND NOT isBanned))
System.out.println("user1: " + rule.interpret(user1));  // true
System.out.println("user2: " + rule.interpret(user2));  // false`,
      },
      {
        title: "使いどころ",
        content:
          "Interpreter パターンは以下の場面で有効です。(1) 簡単な DSL（ドメイン固有言語）を実装する場合。(2) 設定ファイルのルールを動的に評価する場合。(3) 数式や検索クエリのパーサー。ただし、文法が複雑になるとクラス数が爆発するため、複雑な言語にはパーサーコンビネーターや ANTLR などのツールの利用を検討すべきです。Java では java.util.regex.Pattern や javax.el.ExpressionFactory がこのパターンの例です。",
      },
    ],
  },
];

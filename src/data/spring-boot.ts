export interface SpringBootSection {
  title: string;
  content: string;
  code?: string;
}

export interface SpringBootChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: SpringBootSection[];
}

export const springBootCategories = [
  { id: "core", name: "Spring Core", color: "#6DB33F" },
  { id: "boot", name: "Spring Boot", color: "#2563EB" },
  { id: "web", name: "Web・REST API", color: "#DC2626" },
  { id: "data", name: "データアクセス", color: "#7C3AED" },
  { id: "security", name: "Spring Security", color: "#D97706" },
  { id: "cloud", name: "設定・運用", color: "#0891B2" },
] as const;

export const springBootChapters: SpringBootChapter[] = [
  // ===== Spring Core =====
  {
    id: "di-ioc",
    title: "DI と IoC コンテナ",
    category: "core",
    description:
      "Spring の根幹である依存性注入（DI）と制御の反転（IoC）コンテナの仕組みを学ぶ",
    sections: [
      {
        title: "Bean 登録",
        content:
          "Spring IoC コンテナはアプリケーション内のオブジェクト（Bean）を管理し、必要に応じて生成・注入します。@Component、@Service、@Repository、@Controller などのステレオタイプアノテーションをクラスに付与すると、コンポーネントスキャンによって自動的に Bean として登録されます。これにより、開発者は new でオブジェクトを生成する必要がなくなり、疎結合な設計が実現できます。",
        code: `// ステレオタイプアノテーションによるBean登録
@Service
public class UserService {
    // Spring が自動的にインスタンスを生成・管理する
    public User findById(Long id) {
        // ...
    }
}

@Repository
public class UserRepository {
    // データアクセス層を示す
    // 永続化例外の自動変換も行われる
}

@Controller
public class UserController {
    // Webリクエストを処理する層
}

// コンポーネントスキャンの対象パッケージ
@SpringBootApplication // 内部で@ComponentScanを含む
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}`,
      },
      {
        title: "コンストラクタインジェクション",
        content:
          "依存性注入にはコンストラクタ注入・フィールド注入・セッター注入の3種類がありますが、Spring 公式ではコンストラクタインジェクションが推奨されています。コンストラクタ注入は final フィールドと組み合わせることで不変性を保証でき、必須の依存関係が明確になります。コンストラクタが1つだけの場合は @Autowired を省略できます。",
        code: `@Service
public class OrderService {

    // finalで不変性を保証
    private final OrderRepository orderRepository;
    private final PaymentService paymentService;
    private final NotificationService notificationService;

    // コンストラクタが1つなら @Autowired 省略可
    public OrderService(OrderRepository orderRepository,
                        PaymentService paymentService,
                        NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.paymentService = paymentService;
        this.notificationService = notificationService;
    }

    public Order createOrder(OrderRequest request) {
        Order order = orderRepository.save(
            new Order(request.items())
        );
        paymentService.process(order);
        notificationService.sendConfirmation(order);
        return order;
    }
}`,
      },
      {
        title: "Bean スコープ",
        content:
          "Bean のスコープはインスタンスのライフサイクルを制御します。デフォルトは singleton でアプリケーション全体で1つのインスタンスが共有されます。prototype はリクエストごとに新しいインスタンスを生成します。Web アプリケーションでは request・session・application スコープも利用可能です。ステートレスなサービス層は singleton、状態を持つオブジェクトは prototype を使い分けましょう。",
        code: `// デフォルト: singleton（1つのインスタンスを共有）
@Service
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class CacheService {
    private final Map<String, Object> cache = new ConcurrentHashMap<>();
    // アプリ全体で同一インスタンス
}

// prototype: 毎回新しいインスタンスを生成
@Component
@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
public class ReportGenerator {
    private final List<String> data = new ArrayList<>();
    // 呼び出しごとに新しいインスタンス
}

// Webスコープ: リクエストごとに新しいインスタンス
@Component
@RequestScope  // @Scope("request") と同等
public class RequestContext {
    private String traceId;
    private Instant startTime;

    @PostConstruct
    public void init() {
        this.traceId = UUID.randomUUID().toString();
        this.startTime = Instant.now();
    }
}`,
      },
      {
        title: "@Configuration と @Bean",
        content:
          "サードパーティライブラリのクラスや、生成ロジックが複雑なオブジェクトは @Component でアノテーションを付けられません。そのような場合は @Configuration クラス内で @Bean メソッドを定義し、プログラム的に Bean を生成します。@Bean メソッドの戻り値が Bean として登録され、メソッド名がデフォルトの Bean 名になります。",
        code: `@Configuration
public class AppConfig {

    // RestClient の Bean を手動登録
    @Bean
    public RestClient restClient(RestClient.Builder builder) {
        return builder
            .baseUrl("https://api.example.com")
            .defaultHeader(HttpHeaders.CONTENT_TYPE,
                MediaType.APPLICATION_JSON_VALUE)
            .requestInterceptor((req, body, execution) -> {
                req.getHeaders().set("X-API-Key", "secret");
                return execution.execute(req, body);
            })
            .build();
    }

    // ObjectMapper のカスタマイズ
    @Bean
    public ObjectMapper objectMapper() {
        return JsonMapper.builder()
            .addModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .build();
    }

    // DataSource の定義
    @Bean
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
}`,
      },
      {
        title: "プロファイル",
        content:
          "Spring プロファイルを使うと、環境（開発・テスト・本番）ごとに異なる Bean 定義や設定を切り替えることができます。@Profile アノテーションで特定プロファイル時のみ有効な Bean を定義し、spring.profiles.active プロパティでアクティブなプロファイルを指定します。application-{profile}.yml ファイルによる設定の切り替えと組み合わせると、環境差異を柔軟に吸収できます。",
        code: `// 開発環境用のBean
@Configuration
@Profile("dev")
public class DevConfig {
    @Bean
    public MailSender mailSender() {
        // 開発時はコンソールにメール内容を出力
        return new ConsoleMailSender();
    }
}

// 本番環境用のBean
@Configuration
@Profile("prod")
public class ProdConfig {
    @Bean
    public MailSender mailSender() {
        // 本番ではSMTPで実際に送信
        return new SmtpMailSender();
    }
}

// プロファイルの指定方法
// 1. application.yml
//    spring:
//      profiles:
//        active: dev
//
// 2. 環境変数
//    SPRING_PROFILES_ACTIVE=prod
//
// 3. コマンドライン引数
//    java -jar app.jar --spring.profiles.active=prod
//
// 4. テスト時
@SpringBootTest
@ActiveProfiles("test")
class UserServiceTest {
    // test プロファイルで実行
}`,
      },
    ],
  },

  // ===== Spring Boot =====
  {
    id: "boot-quickstart",
    title: "Spring Boot 入門",
    category: "boot",
    description:
      "Spring Boot 3.x のプロジェクト作成から起動まで、基本構成と自動構成の仕組みを理解する",
    sections: [
      {
        title: "Spring Initializr",
        content:
          "Spring Initializr（start.spring.io）は Spring Boot プロジェクトのひな形を生成するWebツールです。Java のバージョン、ビルドツール（Maven/Gradle）、依存関係を選択するだけで、すぐに実行可能なプロジェクトが手に入ります。Spring Boot 3.x は Java 17 以上が必須で、Java 21 を選択すると仮想スレッドなどの最新機能が利用できます。",
        code: `# Spring Initializr（CLI版）でプロジェクト生成
# https://start.spring.io と同等の操作をコマンドで実行

# Spring Boot CLI を使う場合
$ spring init \\
    --boot-version=3.4.1 \\
    --java-version=21 \\
    --build=gradle \\
    --dependencies=web,data-jpa,postgresql,actuator,validation \\
    --group-id=com.example \\
    --artifact-id=my-app \\
    --name=my-app \\
    my-app.zip

# または curl で直接生成
$ curl https://start.spring.io/starter.zip \\
    -d type=gradle-project \\
    -d language=java \\
    -d bootVersion=3.4.1 \\
    -d javaVersion=21 \\
    -d dependencies=web,data-jpa,postgresql \\
    -d groupId=com.example \\
    -d artifactId=my-app \\
    -o my-app.zip`,
      },
      {
        title: "プロジェクト構成",
        content:
          "Spring Boot プロジェクトは Convention over Configuration の思想に基づき、標準的なディレクトリ構成を採用しています。src/main/java にアプリケーションコード、src/main/resources に設定ファイルと静的リソース、src/test にテストコードを配置します。メインクラスに @SpringBootApplication を付与することで、コンポーネントスキャン・自動構成・設定の読み込みが一括で有効になります。",
        code: `// 標準的なプロジェクト構成
// my-app/
// ├── build.gradle          ← ビルド設定
// ├── src/
// │   ├── main/
// │   │   ├── java/com/example/myapp/
// │   │   │   ├── MyAppApplication.java    ← エントリポイント
// │   │   │   ├── controller/
// │   │   │   ├── service/
// │   │   │   ├── repository/
// │   │   │   ├── entity/
// │   │   │   └── config/
// │   │   └── resources/
// │   │       ├── application.yml           ← 設定ファイル
// │   │       ├── static/                   ← 静的ファイル
// │   │       └── templates/                ← テンプレート
// │   └── test/java/com/example/myapp/
// └── gradle/

@SpringBootApplication  // 3つのアノテーションを内包
// = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class MyAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyAppApplication.class, args);
    }
}`,
      },
      {
        title: "application.yml",
        content:
          "application.yml（または application.properties）はアプリケーションの設定を一元管理するファイルです。サーバーポート、データベース接続情報、ログレベルなど、あらゆる設定を記述できます。YAML 形式は階層構造が見やすく、Spring Boot 3.x では型安全な @ConfigurationProperties によるバインドが推奨されています。",
        code: `# application.yml の基本設定
server:
  port: 8080
  shutdown: graceful

spring:
  application:
    name: my-app
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: \${DB_USER:postgres}
    password: \${DB_PASS:password}
    hikari:
      maximum-pool-size: 10
  jpa:
    open-in-view: false
    hibernate:
      ddl-auto: validate

logging:
  level:
    root: INFO
    com.example.myapp: DEBUG
    org.hibernate.SQL: DEBUG

---
# 型安全な設定バインド
@ConfigurationProperties(prefix = "app")
public record AppProperties(
    String name,
    int maxRetries,
    Duration timeout
) {}

// application.yml
// app:
//   name: MyApp
//   max-retries: 3
//   timeout: 30s`,
      },
      {
        title: "組み込み Tomcat",
        content:
          "Spring Boot は組み込みサーバー（デフォルトは Tomcat）を内蔵しており、WAR ファイルを外部サーバーにデプロイする必要がありません。java -jar コマンド一つでアプリケーションを起動でき、コンテナ環境との相性が抜群です。Tomcat の代わりに Jetty や Undertow に切り替えることも簡単で、スレッドプールやタイムアウトの設定も application.yml から行えます。",
        code: `// build.gradle - 組み込みサーバーの切り替え

// デフォルト: Tomcat（spring-boot-starter-webに含まれる）
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

// Undertow に切り替える場合
dependencies {
    implementation('org.springframework.boot:spring-boot-starter-web') {
        exclude group: 'org.springframework.boot',
                module: 'spring-boot-starter-tomcat'
    }
    implementation 'org.springframework.boot:spring-boot-starter-undertow'
}

// application.yml - サーバー設定
// server:
//   port: 8080
//   tomcat:
//     threads:
//       max: 200       # 最大スレッド数
//       min-spare: 10  # 最小スレッド数
//     connection-timeout: 5s
//     max-connections: 8192
//
// # Java 21 仮想スレッドを有効化
// spring:
//   threads:
//     virtual:
//       enabled: true  # Tomcat が仮想スレッドを使用`,
      },
      {
        title: "Auto-Configuration",
        content:
          "Spring Boot の自動構成（Auto-Configuration）は、クラスパス上のライブラリを検出し、適切な Bean を自動的に登録する仕組みです。例えば spring-boot-starter-data-jpa を依存に追加するだけで、DataSource・EntityManagerFactory・TransactionManager が自動構成されます。@ConditionalOnClass や @ConditionalOnMissingBean などの条件付きアノテーションにより、開発者が明示的に定義した Bean が優先されるため、必要に応じてカスタマイズも容易です。",
        code: `// Auto-Configurationの仕組みを理解する

// 1. 自動構成クラスの例（Spring Boot内部）
@AutoConfiguration
@ConditionalOnClass(DataSource.class)
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean // 開発者定義のBeanがなければ
    public DataSource dataSource(DataSourceProperties props) {
        return DataSourceBuilder.create()
            .url(props.getUrl())
            .username(props.getUsername())
            .password(props.getPassword())
            .build();
    }
}

// 2. 自動構成の確認: 起動時に --debug フラグ
// $ java -jar app.jar --debug
// 出力例:
//   Positive matches:  ← 適用された自動構成
//     DataSourceAutoConfiguration matched
//   Negative matches:  ← 適用されなかった自動構成
//     MongoAutoConfiguration did not match

// 3. 特定の自動構成を除外
@SpringBootApplication(exclude = {
    DataSourceAutoConfiguration.class
})
public class MyAppApplication { }`,
      },
    ],
  },
  {
    id: "boot-actuator",
    title: "Actuator と監視",
    category: "boot",
    description:
      "Spring Boot Actuator による本番運用の監視・ヘルスチェック・メトリクス収集を学ぶ",
    sections: [
      {
        title: "/health と /metrics",
        content:
          "Spring Boot Actuator は本番運用に必要なエンドポイント群を提供します。/actuator/health はアプリケーションの稼働状態を返し、ロードバランサーや Kubernetes のヘルスチェックに使われます。/actuator/metrics はJVMメモリ・GC・HTTPリクエスト数などの詳細メトリクスを公開します。management.endpoints.web.exposure.include で公開するエンドポイントを制御しましょう。",
        code: `// build.gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
}

// application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,info,prometheus
  endpoint:
    health:
      show-details: when-authorized  # 認証済みユーザーに詳細表示
      show-components: always

// GET /actuator/health のレスポンス例
// {
//   "status": "UP",
//   "components": {
//     "db": { "status": "UP", "details": { "database": "PostgreSQL" } },
//     "diskSpace": { "status": "UP", "details": { "free": "50GB" } },
//     "ping": { "status": "UP" }
//   }
// }

// GET /actuator/metrics/jvm.memory.used
// {
//   "name": "jvm.memory.used",
//   "measurements": [{ "statistic": "VALUE", "value": 2.5E8 }],
//   "availableTags": [{ "tag": "area", "values": ["heap","nonheap"] }]
// }`,
      },
      {
        title: "カスタムヘルスインジケータ",
        content:
          "外部サービスや独自コンポーネントの健全性を監視するには、カスタムヘルスインジケータを実装します。HealthIndicator インターフェースを実装して Bean として登録するだけで、/actuator/health のレスポンスに自動的に組み込まれます。外部 API の疎通確認やキャッシュの状態チェックなど、アプリケーション固有の監視要件に対応できます。",
        code: `@Component
public class ExternalApiHealthIndicator implements HealthIndicator {

    private final RestClient restClient;

    public ExternalApiHealthIndicator(RestClient restClient) {
        this.restClient = restClient;
    }

    @Override
    public Health health() {
        try {
            var response = restClient.get()
                .uri("/ping")
                .retrieve()
                .toBodilessEntity();

            if (response.getStatusCode().is2xxSuccessful()) {
                return Health.up()
                    .withDetail("service", "External API")
                    .withDetail("status", "reachable")
                    .build();
            }
            return Health.down()
                .withDetail("status", response.getStatusCode())
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}

// レスポンスに "externalApi": {"status":"UP"} が追加される`,
      },
      {
        title: "Micrometer",
        content:
          "Micrometer は Spring Boot のメトリクス収集のファサードライブラリで、Prometheus・Datadog・New Relic など様々な監視システムに対応しています。Counter・Gauge・Timer・DistributionSummary の4種類のメーターを使い分け、ビジネスメトリクスやパフォーマンス指標を計測できます。@Timed アノテーションでメソッドの実行時間を自動計測することも可能です。",
        code: `@Service
public class OrderService {

    private final Counter orderCounter;
    private final Timer orderProcessingTimer;
    private final MeterRegistry registry;

    public OrderService(MeterRegistry registry) {
        this.registry = registry;
        this.orderCounter = Counter.builder("orders.created")
            .description("注文作成数")
            .tag("type", "online")
            .register(registry);
        this.orderProcessingTimer = Timer.builder("orders.processing.time")
            .description("注文処理時間")
            .register(registry);
    }

    public Order createOrder(OrderRequest request) {
        return orderProcessingTimer.record(() -> {
            Order order = processOrder(request);
            orderCounter.increment();
            return order;
        });
    }

    // @Timedアノテーションでも計測可能
    @Timed(value = "orders.cancel.time", description = "注文キャンセル処理時間")
    public void cancelOrder(Long orderId) {
        // キャンセル処理
    }
}`,
      },
      {
        title: "ログレベル動的変更",
        content:
          "Actuator の /actuator/loggers エンドポイントを使うと、アプリケーション再起動なしにログレベルを動的に変更できます。本番環境で問題調査のために一時的に DEBUG ログを有効にし、調査完了後に元に戻す運用が可能です。セキュリティ上、このエンドポイントへのアクセスは認証・認可で保護することが重要です。",
        code: `// application.yml でエンドポイントを公開
management:
  endpoints:
    web:
      exposure:
        include: health,metrics,loggers

// 現在のログレベルを確認
// GET /actuator/loggers/com.example.myapp
// {
//   "configuredLevel": null,
//   "effectiveLevel": "INFO"
// }

// ログレベルを動的に変更（POST）
// POST /actuator/loggers/com.example.myapp
// Content-Type: application/json
// { "configuredLevel": "DEBUG" }

// curlでの実行例
$ curl -X POST http://localhost:8080/actuator/loggers/com.example.myapp \\
    -H "Content-Type: application/json" \\
    -d '{"configuredLevel":"DEBUG"}'

// ログレベルをリセット（元に戻す）
$ curl -X POST http://localhost:8080/actuator/loggers/com.example.myapp \\
    -H "Content-Type: application/json" \\
    -d '{"configuredLevel":null}'`,
      },
      {
        title: "Prometheus 連携",
        content:
          "Prometheus は Pull 型のメトリクス収集システムで、Spring Boot Actuator と Micrometer の Prometheus レジストリを組み合わせることで、Prometheus 形式のメトリクスエンドポイント（/actuator/prometheus）を公開できます。Grafana と連携すれば、リアルタイムなダッシュボードで JVM メモリ・HTTP リクエスト・カスタムメトリクスを可視化できます。",
        code: `// build.gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-actuator'
    runtimeOnly 'io.micrometer:micrometer-registry-prometheus'
}

// application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,prometheus
  prometheus:
    metrics:
      export:
        enabled: true

// GET /actuator/prometheus のレスポンス例（Prometheus形式）
// # HELP jvm_memory_used_bytes Used JVM memory
// # TYPE jvm_memory_used_bytes gauge
// jvm_memory_used_bytes{area="heap",} 2.5E8
// jvm_memory_used_bytes{area="nonheap",} 8.0E7
//
// # HELP http_server_requests_seconds HTTP request duration
// # TYPE http_server_requests_seconds summary
// http_server_requests_seconds_count{method="GET",uri="/api/users",} 150
// http_server_requests_seconds_sum{method="GET",uri="/api/users",} 3.2

// prometheus.yml（Prometheus側の設定）
// scrape_configs:
//   - job_name: 'spring-boot-app'
//     metrics_path: '/actuator/prometheus'
//     scrape_interval: 15s
//     static_configs:
//       - targets: ['app-server:8080']`,
      },
    ],
  },

  // ===== Web・REST API =====
  {
    id: "rest-controller",
    title: "REST API 開発",
    category: "web",
    description:
      "Spring MVC で RESTful API を構築する方法、バリデーション、エラーハンドリングを習得する",
    sections: [
      {
        title: "@RestController",
        content:
          "@RestController は @Controller と @ResponseBody を組み合わせたアノテーションで、メソッドの戻り値が自動的に JSON としてレスポンスボディに書き込まれます。@RequestMapping や @GetMapping / @PostMapping などで URL パスとHTTPメソッドをマッピングします。Spring Boot 3.x では record 型を活用した DTO 定義が簡潔で推奨されます。",
        code: `@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserResponse> findAll() {
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public UserResponse findById(@PathVariable Long id) {
        return userService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@RequestBody UserCreateRequest request) {
        return userService.create(request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}

// record型でDTOを定義
public record UserCreateRequest(String name, String email) {}
public record UserResponse(Long id, String name, String email) {}`,
      },
      {
        title: "リクエスト / レスポンス",
        content:
          "Spring MVC はリクエストパラメータ・パス変数・リクエストボディ・ヘッダーなど、様々な入力を柔軟にバインドします。@PathVariable でURLパス変数、@RequestParam でクエリパラメータ、@RequestBody でJSON ボディを受け取ります。レスポンスは Jackson によって Java オブジェクトから JSON への変換が自動的に行われ、record 型や LocalDateTime も正しくシリアライズされます。",
        code: `@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    // パス変数: /api/v1/products/42
    @GetMapping("/{id}")
    public ProductResponse findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    // クエリパラメータ: /api/v1/products?category=BOOK&minPrice=1000
    @GetMapping
    public List<ProductResponse> search(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int minPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return productService.search(category, minPrice, page, size);
    }

    // リクエストヘッダーの取得
    @PostMapping
    public ProductResponse create(
            @RequestBody ProductCreateRequest request,
            @RequestHeader("X-Request-Id") String requestId) {
        log.info("Request ID: {}", requestId);
        return productService.create(request);
    }
}

// record + Java 21
public record ProductCreateRequest(
    String name,
    int price,
    String category
) {}`,
      },
      {
        title: "バリデーション @Valid",
        content:
          "Bean Validation（Jakarta Validation）を使うと、リクエストの入力値検証を宣言的に行えます。DTO のフィールドに @NotBlank、@Size、@Email、@Min / @Max などのアノテーションを付け、コントローラーの引数に @Valid を指定するだけで自動検証されます。カスタムバリデータを作成すれば、独自のビジネスルールにも対応できます。",
        code: `// バリデーション付きDTO
public record UserCreateRequest(
    @NotBlank(message = "名前は必須です")
    @Size(min = 1, max = 100, message = "名前は1〜100文字で入力してください")
    String name,

    @NotBlank(message = "メールアドレスは必須です")
    @Email(message = "正しいメールアドレス形式で入力してください")
    String email,

    @Min(value = 0, message = "年齢は0以上で入力してください")
    @Max(value = 150, message = "年齢は150以下で入力してください")
    Integer age
) {}

// コントローラーで@Validを付与
@PostMapping
public UserResponse create(@Valid @RequestBody UserCreateRequest request) {
    return userService.create(request);
}

// カスタムバリデータの例
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueEmailValidator.class)
public @interface UniqueEmail {
    String message() default "このメールアドレスは既に登録されています";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}`,
      },
      {
        title: "エラーハンドリング @RestControllerAdvice",
        content:
          "@RestControllerAdvice はアプリケーション全体の例外処理を一元管理するクラスに付与します。@ExceptionHandler メソッドで例外の種類ごとにレスポンスを定義し、RFC 7807 の ProblemDetail 形式でエラー情報を返すのが Spring Boot 3.x の標準的なアプローチです。バリデーションエラー・ビジネスエラー・システムエラーをそれぞれ適切なHTTPステータスで返しましょう。",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {

    // リソース未検出
    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleNotFound(ResourceNotFoundException e) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
            HttpStatus.NOT_FOUND, e.getMessage()
        );
        problem.setTitle("リソースが見つかりません");
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    // バリデーションエラー
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidation(MethodArgumentNotValidException e) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setTitle("入力値が不正です");

        var errors = e.getBindingResult().getFieldErrors().stream()
            .collect(Collectors.toMap(
                FieldError::getField,
                FieldError::getDefaultMessage
            ));
        problem.setProperty("errors", errors);
        return problem;
    }

    // 予期しないエラー
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleUnexpected(Exception e) {
        log.error("予期しないエラー", e);
        return ProblemDetail.forStatusAndDetail(
            HttpStatus.INTERNAL_SERVER_ERROR, "内部エラーが発生しました"
        );
    }
}`,
      },
      {
        title: "ResponseEntity",
        content:
          "ResponseEntity はHTTPレスポンス全体（ステータスコード・ヘッダー・ボディ）を細かく制御するためのクラスです。201 Created でロケーションヘッダーを返す、条件付きで 204 No Content を返す、キャッシュヘッダーを設定するなど、REST API の仕様に忠実なレスポンスを構築できます。ビルダーパターンで直感的に記述できます。",
        code: `@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    // 201 Created + Locationヘッダー
    @PostMapping
    public ResponseEntity<UserResponse> create(
            @Valid @RequestBody UserCreateRequest request) {
        UserResponse user = userService.create(request);
        URI location = URI.create("/api/v1/users/" + user.id());
        return ResponseEntity
            .created(location)
            .body(user);
    }

    // 条件付きレスポンス
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> findById(@PathVariable Long id) {
        return userService.findOptional(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    // カスタムヘッダー付きレスポンス
    @GetMapping("/export")
    public ResponseEntity<byte[]> exportCsv() {
        byte[] csv = userService.exportToCsv();
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=users.csv")
            .contentType(MediaType.APPLICATION_OCTET_STREAM)
            .body(csv);
    }
}`,
      },
    ],
  },

  // ===== データアクセス =====
  {
    id: "spring-data-jpa",
    title: "Spring Data JPA",
    category: "data",
    description:
      "Spring Data JPA によるリポジトリパターンのデータアクセスとクエリ構築手法を学ぶ",
    sections: [
      {
        title: "JpaRepository",
        content:
          "Spring Data JPA の JpaRepository はインターフェースを定義するだけで CRUD 操作が自動実装されます。save・findById・findAll・deleteById などの基本メソッドが使え、エンティティクラスとの対応付けは型パラメータで行います。Spring Boot の自動構成により、DataSource や EntityManager の設定も最小限で済みます。",
        code: `// エンティティ定義
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;

    // コンストラクタ・getter・setter
    protected User() {} // JPA用

    public User(String name, String email) {
        this.name = name;
        this.email = email;
        this.status = UserStatus.ACTIVE;
    }
}

// リポジトリインターフェース（実装不要）
public interface UserRepository extends JpaRepository<User, Long> {
    // save, findById, findAll, deleteById 等が自動提供
}`,
      },
      {
        title: "クエリメソッド命名規則",
        content:
          "Spring Data JPA はメソッド名からクエリを自動生成する命名規則を持っています。findBy・countBy・existsBy をプレフィックスにし、エンティティのフィールド名と条件キーワード（And・Or・Between・Like・OrderBy など）を組み合わせます。複雑すぎるクエリは可読性が下がるため、3条件程度を超える場合は @Query の使用を検討しましょう。",
        code: `public interface UserRepository extends JpaRepository<User, Long> {

    // 単一条件
    List<User> findByName(String name);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);

    // 複数条件（AND / OR）
    List<User> findByStatusAndName(UserStatus status, String name);

    // LIKE検索
    List<User> findByNameContaining(String keyword);

    // 日付範囲
    List<User> findByCreatedAtBetween(
        LocalDateTime start, LocalDateTime end);

    // ソート
    List<User> findByStatusOrderByCreatedAtDesc(UserStatus status);

    // IN句
    List<User> findByStatusIn(List<UserStatus> statuses);

    // 件数カウント
    long countByStatus(UserStatus status);

    // 上位N件
    List<User> findTop5ByStatusOrderByCreatedAtDesc(
        UserStatus status);

    // 削除
    void deleteByStatus(UserStatus status);
}`,
      },
      {
        title: "@Query",
        content:
          "@Query アノテーションを使うと、JPQL（Java Persistence Query Language）やネイティブ SQL で任意のクエリを記述できます。命名規則だけでは表現しにくい集計クエリやサブクエリ、JOIN を伴う複雑な検索に適しています。@Modifying と組み合わせれば UPDATE / DELETE 文も実行でき、パフォーマンス重視の一括更新にも対応できます。",
        code: `public interface UserRepository extends JpaRepository<User, Long> {

    // JPQL（エンティティ名・フィールド名で記述）
    @Query("SELECT u FROM User u WHERE u.status = :status AND u.name LIKE %:keyword%")
    List<User> searchByStatusAndKeyword(
        @Param("status") UserStatus status,
        @Param("keyword") String keyword);

    // DTO Projection（record型に直接マッピング）
    @Query("""
        SELECT new com.example.dto.UserSummary(u.id, u.name, u.email)
        FROM User u
        WHERE u.status = :status
        """)
    List<UserSummary> findSummaryByStatus(@Param("status") UserStatus status);

    // ネイティブSQL
    @Query(value = "SELECT * FROM users WHERE email = :email", nativeQuery = true)
    Optional<User> findByEmailNative(@Param("email") String email);

    // 一括更新（@Modifying必須）
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.createdAt < :date")
    int deactivateOldUsers(
        @Param("status") UserStatus status,
        @Param("date") LocalDateTime date);
}`,
      },
      {
        title: "Specification",
        content:
          "JpaSpecificationExecutor を使うと、動的な検索条件を組み合わせてクエリを構築できます。検索画面の複数条件フィルタのように、ユーザーの入力に応じて WHERE 句を動的に組み立てるケースに最適です。各条件を Specification として定義し、and・or・not で組み合わせることで、再利用可能で保守性の高い検索ロジックが実現できます。",
        code: `// リポジトリにJpaSpecificationExecutorを追加
public interface UserRepository
        extends JpaRepository<User, Long>,
                JpaSpecificationExecutor<User> {
}

// Specificationの定義
public class UserSpecifications {

    public static Specification<User> hasStatus(UserStatus status) {
        return (root, query, cb) ->
            status == null ? null : cb.equal(root.get("status"), status);
    }

    public static Specification<User> nameContains(String keyword) {
        return (root, query, cb) ->
            keyword == null ? null : cb.like(root.get("name"), "%" + keyword + "%");
    }

    public static Specification<User> createdAfter(LocalDateTime date) {
        return (root, query, cb) ->
            date == null ? null : cb.greaterThan(root.get("createdAt"), date);
    }
}

// サービス層で動的に条件を組み立て
@Service
public class UserService {
    public Page<User> search(UserSearchCriteria criteria, Pageable pageable) {
        Specification<User> spec = Specification
            .where(UserSpecifications.hasStatus(criteria.status()))
            .and(UserSpecifications.nameContains(criteria.keyword()))
            .and(UserSpecifications.createdAfter(criteria.from()));
        return userRepository.findAll(spec, pageable);
    }
}`,
      },
      {
        title: "ページネーション",
        content:
          "Spring Data JPA は Pageable インターフェースでページネーションとソートを簡単に実現します。コントローラーの引数に Pageable を受け取るだけで、page・size・sort のクエリパラメータが自動バインドされます。リポジトリメソッドの戻り値を Page<T> にすれば、総件数・総ページ数も含むレスポンスが得られます。",
        code: `// コントローラー: Pageableを自動バインド
@GetMapping
public Page<UserResponse> findAll(
        @PageableDefault(size = 20, sort = "createdAt",
            direction = Sort.Direction.DESC) Pageable pageable) {
    return userService.findAll(pageable);
}

// リクエスト例:
// GET /api/v1/users?page=0&size=20&sort=name,asc

// サービス層
@Service
public class UserService {
    public Page<UserResponse> findAll(Pageable pageable) {
        return userRepository.findAll(pageable)
            .map(user -> new UserResponse(
                user.getId(), user.getName(), user.getEmail()
            ));
    }
}

// Pageレスポンスの構造
// {
//   "content": [ { "id": 1, "name": "田中" }, ... ],
//   "pageable": { "pageNumber": 0, "pageSize": 20 },
//   "totalElements": 150,
//   "totalPages": 8,
//   "first": true,
//   "last": false,
//   "numberOfElements": 20
// }

// Slice（総件数不要な場合 = COUNT不要で高速）
public interface UserRepository extends JpaRepository<User, Long> {
    Slice<User> findByStatus(UserStatus status, Pageable pageable);
}`,
      },
    ],
  },
  {
    id: "transaction-mgmt",
    title: "トランザクション管理",
    category: "data",
    description:
      "Spring の宣言的トランザクション管理の仕組みと、伝播属性・分離レベルの使い分けを理解する",
    sections: [
      {
        title: "@Transactional",
        content:
          "@Transactional はメソッドやクラスに付与するだけでトランザクション制御を宣言的に適用できるアノテーションです。Spring AOP のプロキシがメソッド呼び出しをインターセプトし、メソッド開始時にトランザクションを開始、正常終了でコミット、例外発生時にロールバックを行います。読み取り専用の処理には readOnly = true を指定することで、JPA のダーティチェックが無効化されパフォーマンスが向上します。",
        code: `@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final StockService stockService;
    private final PaymentService paymentService;

    // 更新系: デフォルトのトランザクション
    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order(request.userId(), request.items());
        // 在庫引当 → 支払い → 注文保存 が1つのトランザクション
        stockService.reserve(order.getItems());
        paymentService.charge(order.getTotalAmount());
        return orderRepository.save(order);
        // メソッド正常終了 → 自動コミット
        // 例外発生 → 自動ロールバック
    }

    // 読み取り専用: パフォーマンス最適化
    @Transactional(readOnly = true)
    public List<Order> findByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
        // ダーティチェックが無効化され高速
    }

    // タイムアウト設定
    @Transactional(timeout = 5) // 5秒でタイムアウト
    public void processLargeOrder(LargeOrderRequest request) {
        // 長時間かかる可能性のある処理
    }
}`,
      },
      {
        title: "伝播属性（Propagation）",
        content:
          "トランザクションの伝播属性は、メソッドが既存トランザクション内から呼ばれた場合の振る舞いを定義します。デフォルトの REQUIRED は既存トランザクションがあれば参加し、なければ新規作成します。REQUIRES_NEW は常に新しいトランザクションを開始し、呼び出し元のトランザクションを一時停止します。独立したトランザクションが必要な監査ログ記録などに使い分けましょう。",
        code: `@Service
public class OrderService {

    // REQUIRED（デフォルト）: 既存TXに参加、なければ新規
    @Transactional(propagation = Propagation.REQUIRED)
    public Order createOrder(OrderRequest request) {
        Order order = orderRepository.save(new Order(request));
        auditService.logAction("ORDER_CREATED", order.getId());
        return order;
    }
}

@Service
public class AuditService {

    // REQUIRES_NEW: 常に新しいTXで実行
    // → 呼び出し元がロールバックしてもログは残る
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logAction(String action, Long targetId) {
        auditRepository.save(new AuditLog(action, targetId));
    }
}

// 主な伝播属性:
// REQUIRED      - 既存TXに参加 / なければ新規（デフォルト）
// REQUIRES_NEW  - 常に新規TX（既存TXは一時停止）
// MANDATORY     - 既存TX必須（なければ例外）
// SUPPORTS      - TXあれば参加、なければTXなしで実行
// NOT_SUPPORTED - TXなしで実行（既存TXは一時停止）
// NEVER         - TXなしで実行（TXがあれば例外）
// NESTED        - ネストしたTX（セーブポイント）`,
      },
      {
        title: "分離レベル（Isolation）",
        content:
          "トランザクション分離レベルは、同時実行トランザクション間でのデータの見え方を制御します。READ_COMMITTED（PostgreSQL のデフォルト）はコミット済みデータのみ読み取り、ダーティリードを防ぎます。SERIALIZABLE は最も厳密ですがパフォーマンスが低下します。通常はデータベースのデフォルト分離レベルで十分ですが、残高計算など整合性が重要な処理では明示的に指定することが推奨されます。",
        code: `@Service
public class AccountService {

    // DEFAULT: DBのデフォルト分離レベルを使用
    @Transactional(isolation = Isolation.DEFAULT)
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        // 通常の処理
    }

    // SERIALIZABLE: 残高操作など厳密な整合性が必要な場合
    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void transferStrict(Long fromId, Long toId, BigDecimal amount) {
        Account from = accountRepository.findById(fromId).orElseThrow();
        Account to = accountRepository.findById(toId).orElseThrow();

        if (from.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("残高不足");
        }
        from.withdraw(amount);
        to.deposit(amount);
    }
}

// 分離レベルと防止できる問題:
//                       ダーティ  ノンリピータブル  ファントム
//                       リード    リード            リード
// READ_UNCOMMITTED      ×         ×                ×
// READ_COMMITTED        ○         ×                ×
// REPEATABLE_READ       ○         ○                ×
// SERIALIZABLE          ○         ○                ○
//
// ○ = 防止できる  × = 発生する可能性あり`,
      },
      {
        title: "ロールバック制御",
        content:
          "デフォルトでは、非チェック例外（RuntimeException のサブクラス）が発生するとロールバックされ、チェック例外ではコミットされます。rollbackFor / noRollbackFor 属性で、ロールバック対象の例外を明示的にカスタマイズできます。ビジネス例外でもロールバックが必要なケースや、特定の例外ではロールバックしたくないケースに使い分けましょう。",
        code: `@Service
public class PaymentService {

    // チェック例外でもロールバックさせる
    @Transactional(rollbackFor = PaymentException.class)
    public void processPayment(PaymentRequest request) throws PaymentException {
        // PaymentException（チェック例外）でもロールバックされる
        paymentGateway.charge(request.amount());
    }

    // 特定の例外ではロールバックしない
    @Transactional(noRollbackFor = DuplicateNotificationException.class)
    public void completeOrder(Long orderId) {
        orderRepository.updateStatus(orderId, OrderStatus.COMPLETED);
        try {
            notificationService.sendEmail(orderId);
        } catch (DuplicateNotificationException e) {
            // 通知の重複はロールバック不要、ログだけ記録
            log.warn("通知が重複しました: {}", orderId);
        }
    }

    // プログラム的にロールバックをマーク
    @Transactional
    public void riskyOperation() {
        try {
            // 処理
        } catch (Exception e) {
            // ロールバックを明示的にマーク
            TransactionAspectSupport.currentTransactionStatus()
                .setRollbackOnly();
            log.error("処理失敗、ロールバックします", e);
        }
    }
}`,
      },
      {
        title: "注意点（self-invocation 等）",
        content:
          "Spring の @Transactional はプロキシベースの AOP で実現されているため、同一クラス内のメソッド呼び出し（self-invocation）ではプロキシを経由せず、トランザクションが適用されません。この問題を回避するには、処理を別クラスに切り出すか、ApplicationContext から自身の Bean を取得する方法があります。また、private メソッドに @Transactional を付けても無視されるため、public メソッドに適用する必要があります。",
        code: `@Service
public class UserService {

    // NG: self-invocation（トランザクションが効かない！）
    public void registerUser(UserRequest request) {
        // このメソッドはプロキシを経由しない
        saveUser(request);  // ← @Transactionalが無視される！
    }

    @Transactional
    public void saveUser(UserRequest request) {
        userRepository.save(new User(request));
        // self-invocation のため、TX制御されない
    }

    // NG: private メソッド（プロキシがオーバーライドできない）
    @Transactional  // ← 効かない！
    private void internalSave(User user) {
        userRepository.save(user);
    }
}

// OK: 別クラスに切り出す（推奨パターン）
@Service
public class UserService {
    private final UserPersistenceService persistenceService;

    public void registerUser(UserRequest request) {
        // 別Beanの呼び出し → プロキシ経由 → TX有効
        persistenceService.saveUser(request);
    }
}

@Service
public class UserPersistenceService {
    @Transactional
    public void saveUser(UserRequest request) {
        userRepository.save(new User(request));
        // 正しくトランザクション制御される
    }
}`,
      },
    ],
  },

  // ===== Spring Security =====
  {
    id: "security-basics",
    title: "Spring Security 基礎",
    category: "security",
    description:
      "Spring Security のフィルタチェーン、認証・認可の仕組み、パスワード管理、CSRF/CORS 設定を学ぶ",
    sections: [
      {
        title: "SecurityFilterChain",
        content:
          "Spring Security 6.x（Spring Boot 3.x）では SecurityFilterChain を Bean として定義し、HTTPセキュリティの設定を行います。従来の WebSecurityConfigurerAdapter は廃止され、関数型のラムダ DSL が標準となりました。リクエストごとのアクセス制御、認証方式の指定、CSRF 設定などをメソッドチェーンで宣言的に記述できます。",
        code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                // 公開エンドポイント
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/actuator/health").permitAll()
                // 管理者のみ
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                // その他は認証必須
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .csrf(csrf -> csrf.disable())  // REST API では無効化
            .httpBasic(Customizer.withDefaults())
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
      },
      {
        title: "認証フロー",
        content:
          "Spring Security の認証フローは、AuthenticationFilter がリクエストから認証情報を抽出し、AuthenticationManager → AuthenticationProvider → UserDetailsService の順に処理が委譲されます。認証が成功すると SecurityContextHolder に Authentication オブジェクトが格納され、以降のリクエスト処理で参照できます。JWT やOAuth2 などの認証方式も同じフレームワーク上で統一的に扱えます。",
        code: `// 認証フロー概要:
// Request → Filter → AuthenticationManager → AuthenticationProvider
//                                                    ↓
//                                            UserDetailsService
//                                                    ↓
//                                          SecurityContextHolder

// JWT認証フィルタの実装例
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String token = resolveToken(request);

        if (token != null && tokenProvider.validateToken(token)) {
            String username = tokenProvider.getUsername(token);
            UserDetails userDetails =
                userDetailsService.loadUserByUsername(username);

            var auth = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        chain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }
}`,
      },
      {
        title: "UserDetailsService",
        content:
          "UserDetailsService はユーザー名からユーザー情報を取得するインターフェースで、loadUserByUsername メソッドを実装します。データベースから取得したユーザーエンティティを Spring Security の UserDetails 形式に変換して返す役割を担います。GrantedAuthority にロールや権限を設定し、アクセス制御の判定に使われます。",
        code: `@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "ユーザーが見つかりません: " + username));

        return org.springframework.security.core.userdetails.User
            .builder()
            .username(user.getEmail())
            .password(user.getPassword())  // BCryptハッシュ済み
            .roles(user.getRoles().stream()
                .map(Role::getName)
                .toArray(String[]::new))
            .accountLocked(!user.isActive())
            .build();
    }
}

// コントローラーで認証ユーザー情報を取得
@GetMapping("/me")
public UserResponse getCurrentUser(
        @AuthenticationPrincipal UserDetails userDetails) {
    return userService.findByEmail(userDetails.getUsername());
}`,
      },
      {
        title: "パスワードエンコーディング",
        content:
          "パスワードは平文で保存せず、必ずハッシュ化して保存します。Spring Security は BCryptPasswordEncoder を推奨しており、ソルト付きのハッシュを自動生成します。DelegatingPasswordEncoder を使えば、複数のエンコーダーを透過的に切り替え可能で、既存システムのパスワードハッシュからの段階的な移行も実現できます。",
        code: `@Configuration
public class SecurityConfig {

    // BCrypt（推奨）
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // コストファクター12
    }

    // 複数エンコーダーの段階移行
    // @Bean
    // public PasswordEncoder passwordEncoder() {
    //     return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    //     // {bcrypt}$2a$10$... → BCrypt で検証
    //     // {sha256}abc123... → SHA-256 で検証
    // }
}

// ユーザー登録時のパスワードハッシュ化
@Service
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Transactional
    public User register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException("メールアドレスが既に登録されています");
        }

        User user = new User(
            request.name(),
            request.email(),
            passwordEncoder.encode(request.password()) // ハッシュ化
        );
        return userRepository.save(user);
    }

    // パスワード検証
    public boolean verifyPassword(String rawPassword, String encoded) {
        return passwordEncoder.matches(rawPassword, encoded);
    }
}`,
      },
      {
        title: "CSRF / CORS",
        content:
          "CSRF（Cross-Site Request Forgery）はブラウザベースの攻撃を防ぐ仕組みで、Spring Security はデフォルトで有効です。ステートレスな REST API（JWT 等）ではCSRF を無効化するのが一般的です。CORS（Cross-Origin Resource Sharing）はフロントエンドとバックエンドが異なるオリジンの場合に必要で、許可するオリジン・メソッド・ヘッダーを明示的に設定します。",
        code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {
        return http
            // CSRF: REST API（JWT）ではトークンが不要なため無効化
            .csrf(csrf -> csrf.disable())
            // CORS: 許可設定を適用
            .cors(cors -> cors.configurationSource(corsConfigSource()))
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(
            "https://example.com",
            "http://localhost:3000"  // 開発環境フロントエンド
        ));
        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of(
            "Authorization", "Content-Type", "X-Request-Id"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}`,
      },
    ],
  },

  // ===== 設定・運用 =====
  {
    id: "boot-deployment",
    title: "デプロイと運用",
    category: "cloud",
    description:
      "Spring Boot アプリケーションの JAR パッケージング、Docker 化、環境別設定、運用設定を学ぶ",
    sections: [
      {
        title: "JAR パッケージング",
        content:
          "Spring Boot は実行可能 JAR（fat JAR / uber JAR）としてパッケージングされ、java -jar コマンドだけで起動できます。Gradle の bootJar タスク（Maven では spring-boot:repackage）がアプリケーションコードと全依存ライブラリを1つの JAR に含めます。JVM のヒープサイズや GC 設定は起動時のオプションで指定し、本番環境では G1GC や ZGC の選択が重要になります。",
        code: `# Gradle でビルド
$ ./gradlew bootJar

# ビルド成果物
# build/libs/my-app-1.0.0.jar

# 基本起動
$ java -jar my-app-1.0.0.jar

# 本番向けJVMオプション付き起動
$ java \\
    -Xms512m -Xmx1024m \\
    -XX:+UseZGC \\
    -XX:+ZGenerational \\
    -Dspring.profiles.active=prod \\
    -jar my-app-1.0.0.jar

# プロパティの上書き
$ java -jar my-app-1.0.0.jar \\
    --server.port=9090 \\
    --spring.datasource.url=jdbc:postgresql://db:5432/prod

# build.gradle での設定
tasks.named('bootJar') {
    archiveBaseName = 'my-app'
    archiveVersion = '1.0.0'
    // Layer Tools有効化（Docker最適化用）
    layered {
        enabled = true
    }
}`,
      },
      {
        title: "Docker 化",
        content:
          "Spring Boot アプリケーションを Docker 化する際は、マルチステージビルドとレイヤー分割が重要です。Spring Boot の layertools を使うと、依存ライブラリ層とアプリケーション層を分離でき、コード変更時のイメージ再ビルドが高速になります。Eclipse Temurin（旧 AdoptOpenJDK）の Java 21 イメージをベースに使い、非 root ユーザーで実行するのがベストプラクティスです。",
        code: `# Dockerfile（マルチステージ + レイヤー分割）
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app
COPY . .
RUN ./gradlew bootJar --no-daemon

# レイヤー抽出
FROM eclipse-temurin:21-jdk AS layers
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

# 実行イメージ
FROM eclipse-temurin:21-jre
WORKDIR /app

# 非rootユーザー
RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup
USER appuser

# レイヤー順に配置（変更頻度が低い順）
COPY --from=layers /app/dependencies/ ./
COPY --from=layers /app/spring-boot-loader/ ./
COPY --from=layers /app/snapshot-dependencies/ ./
COPY --from=layers /app/application/ ./

EXPOSE 8080
ENTRYPOINT ["java", "-XX:+UseZGC", "org.springframework.boot.loader.launch.JarLauncher"]`,
      },
      {
        title: "環境別設定",
        content:
          "Spring Boot では application-{profile}.yml による環境別設定ファイルと、環境変数によるプロパティ上書きを組み合わせて、環境ごとの差分を管理します。開発環境ではインメモリDB と詳細ログ、本番環境では外部DB と最小限のログという使い分けが典型的です。機密情報は環境変数やシークレット管理サービスから取得し、設定ファイルには含めないようにします。",
        code: `# application.yml（共通設定）
spring:
  application:
    name: my-app

# application-dev.yml（開発環境）
spring:
  datasource:
    url: jdbc:h2:mem:devdb
    driver-class-name: org.h2.Driver
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
  h2:
    console:
      enabled: true
logging:
  level:
    com.example: DEBUG

# application-prod.yml（本番環境）
spring:
  datasource:
    url: \${DB_URL}
    username: \${DB_USER}
    password: \${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
logging:
  level:
    root: WARN
    com.example: INFO

# docker-compose.yml での環境変数設定
# services:
#   app:
#     environment:
#       SPRING_PROFILES_ACTIVE: prod
#       DB_URL: jdbc:postgresql://db:5432/proddb
#       DB_USER: appuser
#       DB_PASSWORD_FILE: /run/secrets/db_password`,
      },
      {
        title: "Graceful Shutdown",
        content:
          "Graceful Shutdown を有効にすると、シャットダウンシグナル受信後も処理中のリクエストを完了してからアプリケーションを停止します。Kubernetes のローリングアップデートやコンテナ環境で、リクエストの欠損なくデプロイするために不可欠な設定です。タイムアウト期間内に処理が完了しない場合は強制終了されるため、適切なタイムアウト値を設定しましょう。",
        code: `# application.yml
server:
  shutdown: graceful  # Graceful Shutdownを有効化

spring:
  lifecycle:
    timeout-per-shutdown-phase: 30s  # 最大30秒待機

# シャットダウンの流れ:
# 1. SIGTERMシグナル受信
# 2. 新規リクエストの受付を停止（503を返す）
# 3. 処理中のリクエストの完了を待機
# 4. タイムアウト後、強制終了
# 5. @PreDestroy / DisposableBean のクリーンアップ実行

// @PreDestroy でリソース解放
@Service
public class CacheService implements DisposableBean {

    @PreDestroy
    public void cleanup() {
        log.info("キャッシュをフラッシュしています...");
        cache.flush();
    }

    @Override
    public void destroy() {
        log.info("リソースを解放しています...");
        // 接続プールのクローズなど
    }
}

# Kubernetes の設定例
# spec:
#   terminationGracePeriodSeconds: 60
#   containers:
#     - name: app
#       lifecycle:
#         preStop:
#           exec:
#             command: ["sh", "-c", "sleep 5"]  # LB切替の猶予`,
      },
      {
        title: "ログ設定",
        content:
          "Spring Boot はデフォルトで Logback を使用し、application.yml からログレベル・出力先・フォーマットを設定できます。本番環境ではJSON 形式のログ出力が推奨され、ELK Stack（Elasticsearch・Logstash・Kibana）や Loki での集約・検索が容易になります。MDC（Mapped Diagnostic Context）でリクエストIDを埋め込むと、分散トレーシングでのログ追跡に役立ちます。",
        code: `# application.yml での基本設定
logging:
  level:
    root: INFO
    com.example.myapp: DEBUG
    org.hibernate.SQL: DEBUG
  file:
    name: logs/app.log
  logback:
    rollingpolicy:
      max-file-size: 100MB
      max-history: 30

# logback-spring.xml（詳細設定が必要な場合）
# <configuration>
#   <springProfile name="prod">
#     <appender name="JSON" class="...JsonLayout">
#       <layout>
#         <timestampFormat>yyyy-MM-dd'T'HH:mm:ss.SSS</timestampFormat>
#       </layout>
#     </appender>
#   </springProfile>
# </configuration>

// MDCでリクエストIDを追跡
@Component
public class RequestTraceFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest req,
            HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {
        String traceId = Optional
            .ofNullable(req.getHeader("X-Request-Id"))
            .orElse(UUID.randomUUID().toString());
        MDC.put("traceId", traceId);
        res.setHeader("X-Request-Id", traceId);
        try {
            chain.doFilter(req, res);
        } finally {
            MDC.clear();
        }
    }
}`,
      },
    ],
  },
];

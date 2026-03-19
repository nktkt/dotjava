export interface MicroservicesSection {
  title: string;
  content: string;
  code?: string;
}

export interface MicroservicesChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: MicroservicesSection[];
}

export const microservicesCategories = [
  { id: "basics", name: "基礎概念", color: "#7C3AED" },
  { id: "patterns", name: "設計パターン", color: "#DC2626" },
  { id: "infrastructure", name: "インフラ", color: "#2563EB" },
] as const;

export const microservicesChapters: MicroservicesChapter[] = [
  // ===== 基礎概念 =====
  {
    id: "microservices-overview",
    title: "マイクロサービスとは",
    category: "basics",
    description:
      "モノリスとの比較、マイクロサービスのメリット・デメリット、サービス分割の指針",
    sections: [
      {
        title: "マイクロサービスアーキテクチャの概要",
        content:
          "マイクロサービスアーキテクチャは、アプリケーションを小さく独立したサービスの集合として構築するアーキテクチャスタイルです。各サービスは特定のビジネス機能に特化し、独立してデプロイ・スケーリング可能です。サービス間は API（REST/gRPC）やメッセージキューで通信します。Netflix、Amazon、LINE など多くの大規模サービスが採用しており、チームの自律性とデプロイの柔軟性を両立できます。",
        code: `// マイクロサービスの構成例（Spring Boot）
// 各サービスは独立したSpring Bootアプリケーション

// === ユーザーサービス ===
@SpringBootApplication
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
        // ポート: 8081
    }
}

// === 注文サービス ===
@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
        // ポート: 8082
    }
}

// === 商品サービス ===
@SpringBootApplication
public class ProductServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProductServiceApplication.class, args);
        // ポート: 8083
    }
}

// 各サービスは独自のDB・設定・デプロイパイプラインを持つ
// user-service/   → PostgreSQL (users DB)
// order-service/  → PostgreSQL (orders DB)
// product-service/ → MongoDB (products DB)`,
      },
      {
        title: "モノリスとの比較",
        content:
          "モノリスアーキテクチャは全機能が1つのデプロイ単位にまとまった構造です。開発初期はシンプルで理解しやすいですが、規模が大きくなるとビルド時間の増大、部分的なスケーリングの困難さ、チーム間の調整コスト、技術スタックの固定化が問題になります。マイクロサービスは独立デプロイと技術選択の自由を提供しますが、分散システム固有の複雑さ（ネットワーク障害、データ整合性、運用コスト）が伴います。モノリスから段階的にマイクロサービスに移行する「ストラングラーパターン」も実践的な選択です。",
        code: `// モノリス vs マイクロサービスの構造比較

// === モノリス構成 ===
// monolith-app/
//   src/main/java/com/example/
//     user/        ← 全機能が1つのアプリに
//     order/
//     product/
//     payment/
//   pom.xml        ← 1つのビルド設定
//   Dockerfile     ← 1つのデプロイ単位

// === マイクロサービス構成 ===
// user-service/          ← 独立したリポジトリ/プロジェクト
//   src/ pom.xml Dockerfile
// order-service/
//   src/ pom.xml Dockerfile
// product-service/
//   src/ pom.xml Dockerfile

// ストラングラーパターンでの段階的移行
@RestController
public class LegacyProxyController {
    private final RestClient restClient;

    public LegacyProxyController(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("http://new-user-service").build();
    }

    // 新サービスに段階的にルーティング
    @GetMapping("/api/users/{id}")
    public ResponseEntity<String> getUser(@PathVariable Long id) {
        // 新しいマイクロサービスに転送
        return restClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .toEntity(String.class);
    }
}`,
      },
      {
        title: "メリットとデメリット",
        content:
          "メリットは (1) 独立デプロイ：各サービスを個別にリリースでき、リリース頻度が向上する、(2) 技術選択の自由：サービスごとに最適な言語・DB を選べる、(3) スケーラビリティ：負荷の高いサービスだけスケールアウトできる、(4) 障害分離：1つのサービスの障害が全体に波及しにくい、(5) チームの自律性：小さなチームが独立して開発できる。デメリットは (1) 分散システムの複雑さ、(2) 運用コストの増大、(3) データ整合性の確保が困難、(4) テスト・デバッグの難しさ、(5) ネットワークレイテンシの増加です。",
      },
      {
        title: "サービス分割の指針",
        content:
          "サービスの分割にはドメイン駆動設計（DDD）の境界づけられたコンテキスト（Bounded Context）が有効です。ビジネスドメインに沿って分割し、1つのサービスが1つの責務を持つようにします。分割の目安は (1) データのオーナーシップが明確、(2) チーム単位で開発可能、(3) 独立してデプロイ可能、(4) 変更頻度が異なる部分を分離。最初から細かく分割せず、モノリスで始めて境界が見えてから分割する「モノリスファースト」が推奨されます。",
        code: `// DDDの境界づけられたコンテキストに基づく分割例
// ECサイトのドメインモデル

// === ユーザーコンテキスト ===
// 責務: ユーザー管理、認証、プロフィール
@Entity
public class User {
    @Id private Long id;
    private String email;
    private String name;
    // このコンテキスト内でのみ詳細情報を保持
}

// === 注文コンテキスト ===
// 責務: 注文管理、注文履歴
@Entity
public class Order {
    @Id private Long id;
    private Long userId;  // ユーザーIDのみ参照（Userエンティティは持たない）
    private List<OrderLine> lines;
    private OrderStatus status;
}

// === 商品コンテキスト ===
// 責務: 商品カタログ、在庫管理
@Entity
public class Product {
    @Id private Long id;
    private String name;
    private BigDecimal price;
    private int stockQuantity;
}

// === 決済コンテキスト ===
// 責務: 決済処理、返金
// → 各コンテキストが独立したマイクロサービスになる
// → コンテキスト間はIDで参照し、APIで通信する`,
      },
      {
        title: "マイクロサービスの適用判断",
        content:
          "マイクロサービスは全てのプロジェクトに適しているわけではありません。チームが小さい（10人未満）、ドメインが単純、開発初期でビジネスの変化が激しい場合はモノリスの方が効率的です。マイクロサービスが適するのは、(1) 複数チームが並行開発する大規模プロジェクト、(2) 部分的なスケーリングが必要、(3) 異なる技術スタックが必要な部分がある、(4) 独立したリリースサイクルが求められる場合です。Conway の法則（組織構造がアーキテクチャに反映される）も考慮しましょう。",
      },
    ],
  },
  {
    id: "service-communication",
    title: "サービス間通信",
    category: "basics",
    description:
      "REST/gRPC、同期・非同期通信、メッセージキュー（Kafka/RabbitMQ）の使い分け",
    sections: [
      {
        title: "同期通信と非同期通信",
        content:
          "サービス間通信は同期と非同期に大別されます。同期通信（REST/gRPC）はリクエスト・レスポンス型で、呼び出し元がレスポンスを待ちます。シンプルですが、呼び出し先のサービスがダウンすると呼び出し元も影響を受けます。非同期通信（メッセージキュー）はメッセージを介して間接的に通信し、疎結合を実現します。送信側はメッセージを送った時点で処理完了し、受信側は自分のペースで処理します。非同期は耐障害性に優れますが、即座の結果取得が困難です。",
        code: `// 同期通信: REST呼び出し（Spring RestClient）
@Service
public class OrderService {
    private final RestClient userClient;
    private final RestClient productClient;

    public OrderService(RestClient.Builder builder) {
        this.userClient = builder.baseUrl("http://user-service").build();
        this.productClient = builder.baseUrl("http://product-service").build();
    }

    // 同期的にユーザー情報を取得
    public UserDto getUser(Long userId) {
        return userClient.get()
            .uri("/api/users/{id}", userId)
            .retrieve()
            .body(UserDto.class);
    }

    // 同期的に在庫を確認
    public boolean checkStock(Long productId, int quantity) {
        StockDto stock = productClient.get()
            .uri("/api/products/{id}/stock", productId)
            .retrieve()
            .body(StockDto.class);
        return stock.available() >= quantity;
    }
}

// 非同期通信: メッセージ送信（後のセクションで詳述）
// orderCreatedPublisher.publish(new OrderCreatedEvent(orderId));`,
      },
      {
        title: "REST APIによる通信",
        content:
          "REST は最も一般的なサービス間通信方式です。HTTP/JSON ベースでシンプルかつ広くサポートされています。Spring Boot では RestClient（Spring 6.1+）、WebClient（リアクティブ）、OpenFeign（宣言的）を使用します。サービスディスカバリと組み合わせてサービス名でアクセスし、ロードバランシングを行います。タイムアウト、リトライ、サーキットブレーカーを必ず設定し、障害の連鎖を防ぎます。",
        code: `// RestClient でサービス間REST通信（Spring Boot 3.2+）
@Configuration
public class RestClientConfig {
    @Bean
    public RestClient userServiceClient(RestClient.Builder builder) {
        return builder
            .baseUrl("http://user-service") // サービスディスカバリ名
            .defaultHeader("Content-Type", "application/json")
            .requestInterceptor((req, body, exec) -> {
                System.out.println("呼び出し: " + req.getURI());
                return exec.execute(req, body);
            })
            .build();
    }
}

// OpenFeignを使った宣言的REST呼び出し
@FeignClient(name = "product-service",
    fallback = ProductClientFallback.class)
public interface ProductClient {

    @GetMapping("/api/products/{id}")
    ProductDto getProduct(@PathVariable Long id);

    @GetMapping("/api/products")
    List<ProductDto> searchProducts(@RequestParam String keyword);

    @PostMapping("/api/products/{id}/reserve")
    void reserveStock(@PathVariable Long id,
                      @RequestBody ReserveRequest request);
}

// フォールバック（サービス障害時の代替処理）
@Component
public class ProductClientFallback implements ProductClient {
    public ProductDto getProduct(Long id) {
        return new ProductDto(id, "不明な商品", BigDecimal.ZERO);
    }
    public List<ProductDto> searchProducts(String keyword) {
        return List.of();
    }
    public void reserveStock(Long id, ReserveRequest req) {
        throw new ServiceUnavailableException("在庫サービス停止中");
    }
}`,
      },
      {
        title: "gRPCによる通信",
        content:
          "gRPC は Google が開発した高性能な RPC フレームワークです。Protocol Buffers（protobuf）でインターフェースを定義し、HTTP/2 上で通信します。バイナリシリアライゼーションのため REST より高速で、双方向ストリーミングもサポートします。Java では grpc-spring-boot-starter で簡単に導入でき、サービス間の内部通信に適しています。ただし、ブラウザからの直接アクセスには gRPC-Web やゲートウェイが必要です。",
        code: `// gRPCサービスの定義（user_service.proto）
// syntax = "proto3";
// package com.example.user;
//
// service UserService {
//   rpc GetUser(GetUserRequest) returns (UserResponse);
//   rpc ListUsers(ListUsersRequest) returns (stream UserResponse);
// }
//
// message GetUserRequest { int64 id = 1; }
// message UserResponse {
//   int64 id = 1;
//   string name = 2;
//   string email = 3;
// }

// gRPCサーバー実装（Spring Boot）
@GrpcService
public class UserGrpcService extends UserServiceGrpc.UserServiceImplBase {

    private final UserRepository userRepository;

    public UserGrpcService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void getUser(GetUserRequest request,
                        StreamObserver<UserResponse> responseObserver) {
        User user = userRepository.findById(request.getId())
            .orElseThrow(() -> new StatusRuntimeException(
                Status.NOT_FOUND.withDescription("ユーザー未検出")));

        UserResponse response = UserResponse.newBuilder()
            .setId(user.getId())
            .setName(user.getName())
            .setEmail(user.getEmail())
            .build();

        responseObserver.onNext(response);    // レスポンス送信
        responseObserver.onCompleted();        // 完了通知
    }
}`,
      },
      {
        title: "メッセージキュー（Kafka）",
        content:
          "Apache Kafka は高スループットの分散メッセージングプラットフォームです。トピックにメッセージを発行（Publish）し、コンシューマグループが購読（Subscribe）する Pub/Sub モデルです。メッセージはディスクに永続化され、コンシューマは自分のペースで処理できます。パーティションによる並列処理、レプリケーションによる耐障害性を備え、イベント駆動アーキテクチャの中核として使われます。Spring Kafka で簡単に統合できます。",
        code: `// Spring Kafka によるメッセージ送受信
// === プロデューサー（注文サービス） ===
@Service
public class OrderEventPublisher {
    private final KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;

    public OrderEventPublisher(
            KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // 注文作成イベントを発行
    public void publishOrderCreated(Order order) {
        var event = new OrderCreatedEvent(
            order.getId(), order.getUserId(), order.getTotalAmount());
        kafkaTemplate.send("order-events", order.getId().toString(), event)
            .whenComplete((result, ex) -> {
                if (ex == null) {
                    System.out.println("イベント発行成功: " + order.getId());
                } else {
                    System.err.println("イベント発行失敗: " + ex.getMessage());
                }
            });
    }
}

// === コンシューマー（通知サービス） ===
@Service
public class NotificationConsumer {

    @KafkaListener(topics = "order-events",
                   groupId = "notification-group")
    public void handleOrderCreated(OrderCreatedEvent event) {
        System.out.println("注文通知: " + event.orderId());
        // メール送信やプッシュ通知の処理
    }
}

// イベントクラス
public record OrderCreatedEvent(
    Long orderId, Long userId, BigDecimal totalAmount) {}`,
      },
      {
        title: "メッセージキュー（RabbitMQ）",
        content:
          "RabbitMQ は AMQP プロトコルに基づくメッセージブローカーです。Exchange（ルーティング）、Queue（メッセージの蓄積）、Binding（ルール）の3つの概念で構成されます。Direct、Topic、Fanout、Headers の4種類の Exchange でメッセージの配送先を柔軟に制御できます。Kafka がログ型のストリーム処理に強いのに対し、RabbitMQ は複雑なルーティングやタスクキューに適しています。Spring AMQP で簡単に統合可能です。",
        code: `// Spring AMQP（RabbitMQ）によるメッセージ送受信
// === 設定 ===
@Configuration
public class RabbitMQConfig {
    // キューの定義
    @Bean
    public Queue orderQueue() {
        return QueueBuilder.durable("order.queue")
            .withArgument("x-dead-letter-exchange", "dlx") // DLQ設定
            .build();
    }

    // トピックExchangeの定義
    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange("order.exchange");
    }

    // バインディング: order.# パターンでルーティング
    @Bean
    public Binding binding(Queue orderQueue, TopicExchange orderExchange) {
        return BindingBuilder.bind(orderQueue)
            .to(orderExchange).with("order.#");
    }
}

// === プロデューサー ===
@Service
public class OrderMessageSender {
    private final RabbitTemplate rabbitTemplate;

    public OrderMessageSender(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendOrderCreated(OrderCreatedEvent event) {
        rabbitTemplate.convertAndSend(
            "order.exchange", "order.created", event);
        System.out.println("RabbitMQにメッセージ送信: " + event);
    }
}

// === コンシューマー ===
@Service
public class OrderMessageReceiver {
    @RabbitListener(queues = "order.queue")
    public void receive(OrderCreatedEvent event) {
        System.out.println("注文受信: " + event.orderId());
    }
}`,
      },
    ],
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    category: "basics",
    description:
      "Spring Cloud Gatewayによるルーティング、レート制限、認証の集約",
    sections: [
      {
        title: "API Gatewayの役割",
        content:
          "API Gateway はクライアントとマイクロサービス群の間に位置するエントリーポイントです。クライアントは個々のサービスを直接呼び出す代わりに、Gateway を通じてアクセスします。主な責務は (1) リクエストルーティング、(2) 認証・認可の集約、(3) レート制限、(4) ロードバランシング、(5) レスポンスの集約（BFF パターン）、(6) ロギング・メトリクスの収集です。Spring Cloud Gateway は Spring エコシステムで推奨される Gateway 実装です。",
        code: `// Spring Cloud Gateway の基本設定（application.yml）
// spring:
//   cloud:
//     gateway:
//       routes:
//         - id: user-service
//           uri: lb://user-service    # サービスディスカバリ連携
//           predicates:
//             - Path=/api/users/**    # パスベースルーティング
//           filters:
//             - StripPrefix=1
//
//         - id: order-service
//           uri: lb://order-service
//           predicates:
//             - Path=/api/orders/**
//           filters:
//             - StripPrefix=1
//             - name: CircuitBreaker
//               args:
//                 name: orderCB
//                 fallbackUri: forward:/fallback/orders

// Javaベースのルート設定
@Configuration
public class GatewayRouteConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("user-service", r -> r
                .path("/api/users/**")
                .filters(f -> f.stripPrefix(1))
                .uri("lb://user-service"))
            .route("product-service", r -> r
                .path("/api/products/**")
                .filters(f -> f
                    .stripPrefix(1)
                    .addRequestHeader("X-Gateway", "true"))
                .uri("lb://product-service"))
            .build();
    }
}`,
      },
      {
        title: "ルーティングとフィルター",
        content:
          "Spring Cloud Gateway のルートは Predicate（条件）と Filter（処理）で構成されます。Predicate でリクエストの振り分け条件（パス、ヘッダー、メソッド、時間帯など）を定義し、Filter でリクエスト・レスポンスの変換処理を行います。Pre フィルター（リクエスト転送前）と Post フィルター（レスポンス返却前）があり、認証チェック、ヘッダー追加、リクエストログ、レスポンス変換などに使用します。Global フィルターは全ルートに適用されます。",
        code: `// カスタムGlobalフィルター：リクエストログ
@Component
public class LoggingFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(LoggingFilter.class);

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                              GatewayFilterChain chain) {
        var request = exchange.getRequest();
        String path = request.getPath().toString();
        String method = request.getMethod().toString();
        long startTime = System.currentTimeMillis();

        log.info("リクエスト開始: {} {} from {}",
            method, path, request.getRemoteAddress());

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            long elapsed = System.currentTimeMillis() - startTime;
            int status = exchange.getResponse().getStatusCode().value();
            log.info("リクエスト完了: {} {} → {} ({}ms)",
                method, path, status, elapsed);
        }));
    }

    @Override
    public int getOrder() {
        return -1; // 最優先で実行
    }
}`,
      },
      {
        title: "レート制限",
        content:
          "レート制限はサービスを過負荷から保護する重要な機能です。Spring Cloud Gateway では RequestRateLimiter フィルターで Redis ベースのレート制限を実現します。Token Bucket アルゴリズムにより、一定期間内のリクエスト数を制限します。ユーザー単位、IP 単位、API キー単位など柔軟な制限キーを設定でき、プランに応じた制限値の変更も可能です。429 Too Many Requests レスポンスで制限超過を通知します。",
        code: `// Redis ベースのレート制限設定
@Configuration
public class RateLimitConfig {

    // レート制限キーの定義（ユーザーIDまたはIPアドレス）
    @Bean
    public KeyResolver userKeyResolver() {
        return exchange -> {
            String userId = exchange.getRequest()
                .getHeaders().getFirst("X-User-Id");
            if (userId != null) {
                return Mono.just(userId);
            }
            // 未認証の場合はIPアドレスで制限
            return Mono.just(exchange.getRequest()
                .getRemoteAddress().getAddress().getHostAddress());
        };
    }
}

// application.yml でのレート制限設定
// spring.cloud.gateway.routes:
//   - id: api-rate-limited
//     uri: lb://api-service
//     predicates:
//       - Path=/api/**
//     filters:
//       - name: RequestRateLimiter
//         args:
//           redis-rate-limiter.replenishRate: 10  # 1秒あたり10リクエスト
//           redis-rate-limiter.burstCapacity: 20  # バースト時の最大20
//           redis-rate-limiter.requestedTokens: 1 # 1リクエスト=1トークン
//           key-resolver: "#{@userKeyResolver}"

// レスポンスヘッダーで残りリクエスト数を通知
// X-RateLimit-Remaining: 15
// X-RateLimit-Burst-Capacity: 20
// X-RateLimit-Replenish-Rate: 10`,
      },
      {
        title: "認証の集約",
        content:
          "API Gateway に認証処理を集約することで、各マイクロサービスから認証ロジックを排除し、一貫したセキュリティポリシーを適用できます。JWT トークンの検証を Gateway で行い、検証済みのユーザー情報をヘッダーで下流サービスに伝搬します。OAuth2 の Resource Server として動作させるか、カスタムフィルターで認証チェックを実装します。公開 API（ログイン等）は認証をスキップするホワイトリストを設定します。",
        code: `// JWT認証フィルターの実装
@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final JwtDecoder jwtDecoder;
    // 認証不要なパス
    private static final List<String> WHITE_LIST = List.of(
        "/api/auth/login", "/api/auth/register", "/actuator/health"
    );

    public JwtAuthenticationFilter(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange,
                              GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().toString();

        // ホワイトリストはスキップ
        if (WHITE_LIST.stream().anyMatch(path::startsWith)) {
            return chain.filter(exchange);
        }

        // Authorizationヘッダーからトークン取得
        String authHeader = exchange.getRequest()
            .getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        // JWT検証後、ユーザー情報をヘッダーに追加して下流へ
        var jwt = jwtDecoder.decode(token);
        var mutated = exchange.getRequest().mutate()
            .header("X-User-Id", jwt.getSubject())
            .header("X-User-Roles", String.join(",", jwt.getClaimAsStringList("roles")))
            .build();
        return chain.filter(exchange.mutate().request(mutated).build());
    }

    @Override
    public int getOrder() { return 0; }
}`,
      },
      {
        title: "BFFパターンとレスポンス集約",
        content:
          "BFF（Backend for Frontend）パターンは、フロントエンドの種類（Web、モバイル、IoT）ごとに専用の API Gateway を設けるパターンです。各 BFF がクライアントに最適化されたレスポンスを返すため、フロントエンドの開発効率が向上します。レスポンス集約では、複数のマイクロサービスの結果を Gateway で結合して1つのレスポンスとして返します。これによりクライアントからの API 呼び出し回数を削減し、ネットワーク効率を改善できます。",
        code: `// レスポンス集約（複数サービスの結果をまとめて返す）
@RestController
@RequestMapping("/api/bff")
public class BffController {

    private final RestClient userClient;
    private final RestClient orderClient;
    private final RestClient productClient;

    public BffController(RestClient.Builder builder) {
        this.userClient = builder.baseUrl("http://user-service").build();
        this.orderClient = builder.baseUrl("http://order-service").build();
        this.productClient = builder.baseUrl("http://product-service").build();
    }

    // ダッシュボード用に複数サービスのデータを集約
    @GetMapping("/dashboard/{userId}")
    public DashboardResponse getDashboard(@PathVariable Long userId) {
        // 並行してデータを取得（CompletableFuture）
        var userFuture = CompletableFuture.supplyAsync(() ->
            userClient.get().uri("/users/{id}", userId)
                .retrieve().body(UserDto.class));

        var ordersFuture = CompletableFuture.supplyAsync(() ->
            orderClient.get().uri("/orders?userId={id}", userId)
                .retrieve().body(new ParameterizedTypeReference<List<OrderDto>>() {}));

        // 結果を集約して返す
        return new DashboardResponse(
            userFuture.join(),
            ordersFuture.join()
        );
    }
}

record DashboardResponse(UserDto user, List<OrderDto> recentOrders) {}`,
      },
    ],
  },

  // ===== 設計パターン =====
  {
    id: "circuit-breaker",
    title: "サーキットブレーカー",
    category: "patterns",
    description:
      "Resilience4jによるサーキットブレーカー、リトライ、フォールバック、バルクヘッド",
    sections: [
      {
        title: "サーキットブレーカーとは",
        content:
          "サーキットブレーカーは、外部サービスの障害がシステム全体に波及するのを防ぐパターンです。電気のブレーカーと同様に、障害を検知すると回路を「開く（Open）」ことで障害サービスへのリクエストを遮断します。3つの状態があります：Closed（正常、リクエストを通す）、Open（障害検知、リクエストを即座に失敗させる）、Half-Open（回復確認、一部リクエストを通して回復を判定）。Resilience4j は Java 向けの軽量な障害耐性ライブラリで、Spring Boot と統合して使用します。",
        code: `// Resilience4j サーキットブレーカーの設定（application.yml）
// resilience4j:
//   circuitbreaker:
//     instances:
//       userService:
//         slidingWindowSize: 10           # 直近10回のリクエストで判定
//         failureRateThreshold: 50        # 失敗率50%でOpen
//         waitDurationInOpenState: 10s    # Open状態の維持時間
//         permittedNumberOfCallsInHalfOpenState: 3  # Half-Openで3回試行
//         slidingWindowType: COUNT_BASED  # カウントベースの判定

// サーキットブレーカーの適用
@Service
public class UserServiceClient {

    private final RestClient restClient;

    public UserServiceClient(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("http://user-service").build();
    }

    @CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
    public UserDto getUser(Long userId) {
        return restClient.get()
            .uri("/api/users/{id}", userId)
            .retrieve()
            .body(UserDto.class);
    }

    // フォールバック: サーキットブレーカーOpen時の代替処理
    private UserDto getUserFallback(Long userId, Throwable ex) {
        System.err.println("フォールバック実行: " + ex.getMessage());
        return new UserDto(userId, "一時的に取得不可", "N/A");
    }
}`,
      },
      {
        title: "リトライ",
        content:
          "リトライは一時的な障害（ネットワークの瞬断、タイムアウトなど）に対して自動的に再試行する仕組みです。Resilience4j の Retry はリトライ回数、待機時間、リトライ対象の例外を設定できます。指数バックオフ（Exponential Backoff）を使うと、リトライ間隔を徐々に延ばして負荷を軽減します。冪等（idempotent）でない操作（注文作成など）にリトライを適用する際は、重複実行に注意が必要です。",
        code: `// Resilience4j リトライの設定と実装
// resilience4j:
//   retry:
//     instances:
//       paymentService:
//         maxAttempts: 3                       # 最大3回試行
//         waitDuration: 1s                     # 待機時間1秒
//         enableExponentialBackoff: true        # 指数バックオフ有効
//         exponentialBackoffMultiplier: 2       # 倍率2（1s→2s→4s）
//         retryExceptions:                      # リトライ対象の例外
//           - java.net.ConnectException
//           - java.net.SocketTimeoutException
//         ignoreExceptions:                     # リトライしない例外
//           - com.example.BusinessException

@Service
public class PaymentServiceClient {

    private final RestClient restClient;

    public PaymentServiceClient(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("http://payment-service").build();
    }

    @Retry(name = "paymentService", fallbackMethod = "paymentFallback")
    @CircuitBreaker(name = "paymentService") // リトライ後にサーキットブレーカー
    public PaymentResult processPayment(PaymentRequest request) {
        System.out.println("決済API呼び出し試行...");
        return restClient.post()
            .uri("/api/payments")
            .body(request)
            .retrieve()
            .body(PaymentResult.class);
    }

    private PaymentResult paymentFallback(PaymentRequest request, Throwable ex) {
        System.err.println("決済フォールバック: " + ex.getMessage());
        return new PaymentResult("PENDING", "後ほど再処理します");
    }
}`,
      },
      {
        title: "フォールバック戦略",
        content:
          "フォールバックは障害時の代替処理を提供する仕組みです。戦略は (1) デフォルト値を返す（キャッシュされたデータ、固定値）、(2) 代替サービスを呼び出す（レプリカ、縮退版）、(3) キューに入れて後で再処理する、(4) ユーザーにエラーを通知する、の4種類があります。フォールバックメソッドはメイン処理と同じ引数 + Throwable パラメータを取り、例外の種類に応じて異なる処理を行えます。ビジネス要件に応じて適切な戦略を選択します。",
        code: `// 複数のフォールバック戦略の実装
@Service
public class ProductRecommendationService {

    private final RestClient aiServiceClient;
    private final ProductRepository productRepository;
    private final CacheManager cacheManager;

    // メイン処理: AI推薦サービスを呼び出し
    @CircuitBreaker(name = "aiService", fallbackMethod = "fallbackRecommend")
    public List<ProductDto> getRecommendations(Long userId) {
        return aiServiceClient.get()
            .uri("/api/recommend/{userId}", userId)
            .retrieve()
            .body(new ParameterizedTypeReference<>() {});
    }

    // フォールバック1: キャッシュから取得
    private List<ProductDto> fallbackRecommend(Long userId, Throwable ex) {
        System.out.println("AI障害→キャッシュ参照: " + ex.getMessage());

        var cached = cacheManager.getCache("recommendations");
        if (cached != null && cached.get(userId) != null) {
            return (List<ProductDto>) cached.get(userId).get();
        }
        return fallbackPopularProducts(userId, ex); // 次のフォールバック
    }

    // フォールバック2: 人気商品を返す
    private List<ProductDto> fallbackPopularProducts(Long userId, Throwable ex) {
        System.out.println("キャッシュなし→人気商品を返却");
        return productRepository.findTop10ByOrderBySalesCountDesc()
            .stream()
            .map(p -> new ProductDto(p.getId(), p.getName(), p.getPrice()))
            .toList();
    }
}`,
      },
      {
        title: "バルクヘッド",
        content:
          "バルクヘッド（隔壁）パターンは、リソースを分離して障害の影響範囲を限定するパターンです。船の隔壁が浸水を区画内に封じ込めるように、サービスごとにスレッドプールやセマフォを分離します。これにより、1つのサービスが遅延しても他のサービスの処理に影響しません。Resilience4j では SemaphoreBulkhead（セマフォ方式）と FixedThreadPoolBulkhead（スレッドプール方式）を提供しています。",
        code: `// バルクヘッドの設定と実装
// resilience4j:
//   bulkhead:
//     instances:
//       userService:
//         maxConcurrentCalls: 10          # 同時実行数の上限
//         maxWaitDuration: 500ms          # 待機時間の上限
//       externalApi:
//         maxConcurrentCalls: 5           # 外部APIは少なめに制限
//         maxWaitDuration: 1s

@Service
public class ResilientOrderService {

    private final RestClient userClient;
    private final RestClient inventoryClient;

    public ResilientOrderService(RestClient.Builder builder) {
        this.userClient = builder.baseUrl("http://user-service").build();
        this.inventoryClient = builder.baseUrl("http://inventory-service").build();
    }

    // ユーザーサービスへの同時アクセスを10に制限
    @Bulkhead(name = "userService", fallbackMethod = "userBulkheadFallback")
    @CircuitBreaker(name = "userService")
    @Retry(name = "userService")
    public UserDto getUser(Long userId) {
        return userClient.get()
            .uri("/api/users/{id}", userId)
            .retrieve()
            .body(UserDto.class);
    }

    // バルクヘッド制限時のフォールバック
    private UserDto userBulkheadFallback(Long userId,
                                          BulkheadFullException ex) {
        System.err.println("同時実行数超過: " + ex.getMessage());
        return new UserDto(userId, "処理中", "しばらくお待ちください");
    }
}

// アノテーションの適用順序（外側から内側）:
// Retry → CircuitBreaker → Bulkhead → 実際の処理`,
      },
      {
        title: "タイムリミッターと組み合わせ",
        content:
          "TimeLimiter は処理のタイムアウトを設定するパターンです。外部サービスの応答が遅い場合に、一定時間で処理を打ち切ります。Resilience4j の全パターン（CircuitBreaker、Retry、Bulkhead、TimeLimiter、RateLimiter）は組み合わせて使用でき、アノテーションの順序で適用順を制御します。Actuator と連携してメトリクスを取得し、Prometheus/Grafana で可視化することで障害の傾向をリアルタイムに把握できます。",
        code: `// 全パターンの組み合わせ設定
// resilience4j:
//   timelimiter:
//     instances:
//       orderService:
//         timeoutDuration: 3s           # 3秒でタイムアウト
//         cancelRunningFuture: true     # タイムアウト時にキャンセル

// Actuatorでメトリクスを公開
// management:
//   endpoints:
//     web:
//       exposure:
//         include: health,metrics,circuitbreakers
//   health:
//     circuitbreakers:
//       enabled: true

@Service
public class FullyResilientService {

    // 適用順序: Retry → CircuitBreaker → Bulkhead → TimeLimiter
    @Retry(name = "orderService")
    @CircuitBreaker(name = "orderService",
                    fallbackMethod = "createOrderFallback")
    @Bulkhead(name = "orderService")
    @TimeLimiter(name = "orderService")
    public CompletableFuture<OrderResult> createOrder(OrderRequest req) {
        return CompletableFuture.supplyAsync(() -> {
            // 注文作成ロジック
            return callOrderService(req);
        });
    }

    private OrderResult createOrderFallback(OrderRequest req, Throwable ex) {
        System.err.println("注文作成障害: " + ex.getClass().getSimpleName());
        // 非同期で再処理キューに追加
        return new OrderResult("QUEUED", "注文を受け付けました。後ほど処理します。");
    }

    private OrderResult callOrderService(OrderRequest req) {
        // 実際のサービス呼び出し
        return new OrderResult("SUCCESS", "注文完了");
    }
}`,
      },
    ],
  },
  {
    id: "saga-pattern",
    title: "Sagaパターン",
    category: "patterns",
    description:
      "分散トランザクション管理、コレオグラフィとオーケストレーション、補償トランザクション",
    sections: [
      {
        title: "分散トランザクションの課題",
        content:
          "マイクロサービスでは各サービスが独自の DB を持つため、複数サービスにまたがるトランザクション（分散トランザクション）が必要になります。従来の 2 Phase Commit（2PC）は可用性を犠牲にし、マイクロサービスには不向きです。Saga パターンは、各サービスのローカルトランザクションを連鎖させ、失敗時は補償トランザクション（Compensation）で整合性を回復します。結果整合性（Eventual Consistency）を受け入れる設計が前提です。",
        code: `// ECサイトの注文処理における分散トランザクション
// 関連する3つのサービスのローカルトランザクション:
//
// 1. 注文サービス: 注文レコード作成
// 2. 在庫サービス: 在庫を減らす
// 3. 決済サービス: 決済処理
//
// 成功フロー:
//   注文作成 → 在庫引当 → 決済処理 → 注文確定
//
// 在庫引当失敗時の補償:
//   注文作成 → 在庫引当失敗 → 注文キャンセル（補償）
//
// 決済失敗時の補償:
//   注文作成 → 在庫引当 → 決済失敗 → 在庫戻し（補償）→ 注文キャンセル（補償）

// 各ステップの定義
public enum OrderSagaStep {
    CREATE_ORDER,       // 注文作成
    RESERVE_INVENTORY,  // 在庫引当
    PROCESS_PAYMENT,    // 決済処理
    CONFIRM_ORDER       // 注文確定
}

// 補償トランザクションの対応
// CREATE_ORDER       → cancelOrder（注文キャンセル）
// RESERVE_INVENTORY  → releaseInventory（在庫戻し）
// PROCESS_PAYMENT    → refundPayment（返金）
// CONFIRM_ORDER      → （補償不要、最終ステップ）

public record SagaResult(boolean success, String message,
                          OrderSagaStep failedStep) {}`,
      },
      {
        title: "コレオグラフィ方式",
        content:
          "コレオグラフィ（Choreography）は、各サービスが自律的にイベントを発行・購読して Saga を進める方式です。中央の制御者はなく、サービス間のイベント連鎖でフローが進みます。シンプルなフローに適しており、サービスの追加が容易です。ただし、フロー全体の可視性が低く、サービス数が増えるとイベントの連鎖が複雑になるデメリットがあります。Kafka や RabbitMQ のイベント基盤を活用します。",
        code: `// コレオグラフィ方式の実装例
// === 注文サービス（Saga開始） ===
@Service
public class OrderSagaChoreography {
    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, Object> kafka;

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        // ステップ1: 注文作成（ローカルトランザクション）
        Order order = new Order(request.userId(), request.items(),
            OrderStatus.PENDING);
        orderRepository.save(order);

        // イベント発行 → 在庫サービスが購読
        kafka.send("order-events",
            new OrderCreatedEvent(order.getId(), order.getItems()));
        return order;
    }

    // 在庫引当成功イベントを受信
    @KafkaListener(topics = "inventory-events", groupId = "order-saga")
    public void onInventoryReserved(InventoryReservedEvent event) {
        // イベント発行 → 決済サービスが購読
        kafka.send("payment-events",
            new PaymentRequestEvent(event.orderId(), event.totalAmount()));
    }

    // 在庫引当失敗イベントを受信 → 補償トランザクション
    @KafkaListener(topics = "inventory-events", groupId = "order-saga")
    public void onInventoryFailed(InventoryFailedEvent event) {
        // 補償: 注文をキャンセル
        orderRepository.updateStatus(event.orderId(), OrderStatus.CANCELLED);
        System.out.println("注文キャンセル（在庫不足）: " + event.orderId());
    }
}`,
      },
      {
        title: "オーケストレーション方式",
        content:
          "オーケストレーション（Orchestration）は、中央のオーケストレーター（Saga コーディネーター）がフロー全体を制御する方式です。オーケストレーターが各サービスに順次コマンドを送り、結果に応じて次のステップや補償処理を決定します。フロー全体の可視性が高く、複雑なビジネスロジックに対応しやすいです。オーケストレーターが SPOF になるリスクがあるため、冗長化が必要です。ステートマシンで状態遷移を管理するのが一般的です。",
        code: `// オーケストレーション方式の実装例
@Service
public class OrderSagaOrchestrator {
    private final OrderRepository orderRepository;
    private final RestClient inventoryClient;
    private final RestClient paymentClient;

    // Sagaの実行（オーケストレーターがフロー制御）
    @Transactional
    public SagaResult executeSaga(CreateOrderRequest request) {
        Long orderId = null;
        try {
            // ステップ1: 注文作成
            Order order = orderRepository.save(
                new Order(request.userId(), request.items(), OrderStatus.PENDING));
            orderId = order.getId();

            // ステップ2: 在庫引当
            inventoryClient.post()
                .uri("/api/inventory/reserve")
                .body(new ReserveRequest(orderId, request.items()))
                .retrieve().toBodilessEntity();

            // ステップ3: 決済処理
            paymentClient.post()
                .uri("/api/payments")
                .body(new PaymentRequest(orderId, request.totalAmount()))
                .retrieve().toBodilessEntity();

            // 全ステップ成功 → 注文確定
            orderRepository.updateStatus(orderId, OrderStatus.CONFIRMED);
            return new SagaResult(true, "注文完了", null);

        } catch (Exception ex) {
            // 失敗時: 補償トランザクション実行
            compensate(orderId, ex);
            return new SagaResult(false, ex.getMessage(), null);
        }
    }

    private void compensate(Long orderId, Exception ex) {
        System.err.println("Saga補償実行: " + ex.getMessage());
        try { paymentClient.post().uri("/api/payments/{id}/refund", orderId)
                .retrieve().toBodilessEntity(); } catch (Exception ignored) {}
        try { inventoryClient.post().uri("/api/inventory/release/{id}", orderId)
                .retrieve().toBodilessEntity(); } catch (Exception ignored) {}
        if (orderId != null) {
            orderRepository.updateStatus(orderId, OrderStatus.CANCELLED);
        }
    }
}`,
      },
      {
        title: "補償トランザクション",
        content:
          "補償トランザクション（Compensating Transaction）は、Saga の途中でエラーが発生した場合に、既に完了したステップの影響を取り消す処理です。データベースの ROLLBACK と異なり、ビジネスロジックとして「取り消し操作」を実装する必要があります。注文作成の補償は注文キャンセル、在庫引当の補償は在庫戻し、決済の補償は返金処理です。補償トランザクション自体が失敗する可能性もあるため、リトライや手動介入の仕組みも必要です。",
        code: `// 補償トランザクションの実装例
@Service
public class InventoryCompensationService {

    private final InventoryRepository inventoryRepository;

    // 正常処理: 在庫引当
    @Transactional
    public void reserveInventory(Long orderId, List<OrderItem> items) {
        for (OrderItem item : items) {
            var inventory = inventoryRepository
                .findByProductId(item.getProductId())
                .orElseThrow(() -> new RuntimeException("商品不明: " + item.getProductId()));

            if (inventory.getStock() < item.getQuantity()) {
                throw new InsufficientStockException(
                    "在庫不足: " + item.getProductId());
            }
            inventory.setStock(inventory.getStock() - item.getQuantity());
            inventoryRepository.save(inventory);

            // 引当記録を保存（補償時に参照）
            inventoryRepository.saveReservation(
                new Reservation(orderId, item.getProductId(), item.getQuantity()));
        }
        System.out.println("在庫引当完了: 注文ID=" + orderId);
    }

    // 補償処理: 在庫戻し
    @Transactional
    public void releaseInventory(Long orderId) {
        var reservations = inventoryRepository.findReservationsByOrderId(orderId);
        for (var reservation : reservations) {
            var inventory = inventoryRepository
                .findByProductId(reservation.getProductId()).orElseThrow();
            // 引当分を戻す
            inventory.setStock(inventory.getStock() + reservation.getQuantity());
            inventoryRepository.save(inventory);
        }
        inventoryRepository.deleteReservationsByOrderId(orderId);
        System.out.println("在庫補償（戻し）完了: 注文ID=" + orderId);
    }
}`,
      },
      {
        title: "Sagaのベストプラクティス",
        content:
          "Saga パターンを効果的に実装するためのベストプラクティスを紹介します。(1) 冪等性の確保：同じ操作が複数回実行されても結果が変わらないようにする。(2) 操作ログの記録：各ステップの実行状態を永続化し、障害復旧時に再開可能にする。(3) タイムアウト設定：ステップごとにタイムアウトを設け、無限待ちを防ぐ。(4) 監視・アラート：Saga の成功/失敗率、実行時間を監視する。(5) 手動介入の仕組み：自動補償が失敗した場合の管理画面を用意する。",
        code: `// 冪等性を確保した Saga ステップ実装
@Service
public class IdempotentPaymentService {

    private final PaymentRepository paymentRepository;

    // 冪等な決済処理（同じorderId で重複実行しても安全）
    @Transactional
    public PaymentResult processPayment(Long orderId, BigDecimal amount) {
        // 既に処理済みかチェック
        var existing = paymentRepository.findByOrderId(orderId);
        if (existing.isPresent()) {
            System.out.println("重複リクエスト（スキップ）: " + orderId);
            return existing.get().toResult(); // 既存の結果を返す
        }

        // 決済処理を実行
        var payment = new Payment(orderId, amount, PaymentStatus.SUCCESS);
        paymentRepository.save(payment);
        System.out.println("決済完了: " + orderId + " / " + amount + "円");
        return payment.toResult();
    }

    // 冪等な返金処理
    @Transactional
    public void refundPayment(Long orderId) {
        var payment = paymentRepository.findByOrderId(orderId);
        if (payment.isEmpty() || payment.get().getStatus() == PaymentStatus.REFUNDED) {
            System.out.println("返金不要（未決済または返金済み）: " + orderId);
            return;
        }
        payment.get().setStatus(PaymentStatus.REFUNDED);
        paymentRepository.save(payment.get());
        System.out.println("返金完了: " + orderId);
    }
}

// Saga実行ログの記録
@Entity
@Table(name = "saga_log")
public class SagaLog {
    @Id @GeneratedValue private Long id;
    private String sagaId;     // Saga識別子
    private String step;       // ステップ名
    private String status;     // SUCCESS / FAILED / COMPENSATED
    private LocalDateTime executedAt;
}`,
      },
    ],
  },
  {
    id: "cqrs-event-sourcing",
    title: "CQRS・イベントソーシング",
    category: "patterns",
    description:
      "コマンドとクエリの分離、イベントソーシング、イベントストアの設計",
    sections: [
      {
        title: "CQRSとは",
        content:
          "CQRS（Command Query Responsibility Segregation）は、データの書き込み（コマンド）と読み取り（クエリ）を分離するアーキテクチャパターンです。書き込みモデルはビジネスルールの検証とドメインロジックに集中し、読み取りモデルは表示に最適化されたデータ構造を持ちます。これにより、書き込みと読み取りを独立してスケーリングでき、それぞれに最適なデータストアを選択できます。読み取りが書き込みより圧倒的に多いシステムで特に効果的です。",
        code: `// CQRS: コマンドとクエリの分離
// === コマンド側（書き込みモデル） ===
@Service
public class OrderCommandService {
    private final OrderRepository orderRepository;
    private final ApplicationEventPublisher eventPublisher;

    public OrderCommandService(OrderRepository orderRepository,
                                ApplicationEventPublisher eventPublisher) {
        this.orderRepository = orderRepository;
        this.eventPublisher = eventPublisher;
    }

    // コマンド: 注文を作成（ビジネスルールを検証）
    @Transactional
    public Long createOrder(CreateOrderCommand command) {
        // ドメインロジック: バリデーション
        if (command.items().isEmpty()) {
            throw new IllegalArgumentException("注文明細が空です");
        }
        Order order = Order.create(command.userId(), command.items());
        orderRepository.save(order);

        // イベント発行 → 読み取りモデルを非同期更新
        eventPublisher.publishEvent(
            new OrderCreatedEvent(order.getId(), order.getUserId()));
        return order.getId();
    }
}

// === クエリ側（読み取りモデル） ===
@Service
public class OrderQueryService {
    private final OrderReadRepository readRepository; // 読み取り専用DB

    public OrderQueryService(OrderReadRepository readRepository) {
        this.readRepository = readRepository;
    }

    // クエリ: 表示用に最適化されたデータを返す
    public OrderSummaryDto getOrderSummary(Long orderId) {
        return readRepository.findSummaryById(orderId);
    }

    public List<OrderListDto> getUserOrders(Long userId, Pageable pageable) {
        return readRepository.findByUserId(userId, pageable);
    }
}`,
      },
      {
        title: "読み取りモデルの更新",
        content:
          "CQRS では書き込みモデルの変更をイベントとして発行し、読み取りモデルを非同期で更新します。このプロジェクション処理により、読み取りモデルは常に書き込みモデルと結果整合性を保ちます。Spring のイベントリスナーや Kafka を使ってイベントを伝搬し、専用のプロジェクターが読み取り DB を更新します。読み取り DB には Redis、Elasticsearch、非正規化された RDB テーブルなど、クエリに最適なストアを選択します。",
        code: `// 読み取りモデルの更新（プロジェクション）
@Component
public class OrderProjection {
    private final OrderReadRepository readRepository;

    public OrderProjection(OrderReadRepository readRepository) {
        this.readRepository = readRepository;
    }

    // 注文作成イベントを受信 → 読み取りモデルを作成
    @EventListener
    @Async
    public void on(OrderCreatedEvent event) {
        var summary = new OrderSummaryView();
        summary.setOrderId(event.orderId());
        summary.setUserId(event.userId());
        summary.setStatus("PENDING");
        summary.setCreatedAt(LocalDateTime.now());
        readRepository.save(summary);
        System.out.println("読み取りモデル作成: " + event.orderId());
    }

    // 注文ステータス更新イベント → 読み取りモデルを更新
    @EventListener
    @Async
    public void on(OrderStatusChangedEvent event) {
        readRepository.updateStatus(event.orderId(), event.newStatus());
        System.out.println("読み取りモデル更新: " + event.orderId());
    }
}

// 読み取り専用のビューエンティティ（非正規化）
@Entity
@Table(name = "order_summary_view")
public class OrderSummaryView {
    @Id private Long orderId;
    private Long userId;
    private String userName;       // ユーザー名も含む（JOIN不要に）
    private String status;
    private BigDecimal totalAmount;
    private int itemCount;         // 明細数も事前計算
    private LocalDateTime createdAt;
}`,
      },
      {
        title: "イベントソーシングとは",
        content:
          "イベントソーシングは、エンティティの状態を直接保存する代わりに、状態変化のイベントを時系列で保存するパターンです。現在の状態はイベントをリプレイ（再生）して構築します。銀行口座の残高が取引履歴から計算できるのと同じ考え方です。利点は (1) 完全な監査ログ、(2) 過去の任意の時点の状態を再現可能、(3) イベント駆動アーキテクチャとの親和性、(4) デバッグしやすい。デメリットは複雑さの増大とイベントストアの管理コストです。",
        code: `// イベントソーシングの基本実装
// === ドメインイベントの定義 ===
public sealed interface OrderEvent {
    Long orderId();
    LocalDateTime occurredAt();

    record OrderCreated(Long orderId, Long userId,
        List<OrderItem> items, LocalDateTime occurredAt) implements OrderEvent {}

    record OrderItemAdded(Long orderId, OrderItem item,
        LocalDateTime occurredAt) implements OrderEvent {}

    record OrderConfirmed(Long orderId,
        LocalDateTime occurredAt) implements OrderEvent {}

    record OrderCancelled(Long orderId, String reason,
        LocalDateTime occurredAt) implements OrderEvent {}
}

// === 集約（Aggregate）: イベントから状態を復元 ===
public class OrderAggregate {
    private Long id;
    private Long userId;
    private List<OrderItem> items = new ArrayList<>();
    private OrderStatus status;

    // イベントのリプレイで状態を構築
    public static OrderAggregate fromEvents(List<OrderEvent> events) {
        var aggregate = new OrderAggregate();
        events.forEach(aggregate::apply);
        return aggregate;
    }

    private void apply(OrderEvent event) {
        switch (event) {
            case OrderEvent.OrderCreated e -> {
                this.id = e.orderId();
                this.userId = e.userId();
                this.items = new ArrayList<>(e.items());
                this.status = OrderStatus.PENDING;
            }
            case OrderEvent.OrderConfirmed e -> this.status = OrderStatus.CONFIRMED;
            case OrderEvent.OrderCancelled e -> this.status = OrderStatus.CANCELLED;
            case OrderEvent.OrderItemAdded e -> this.items.add(e.item());
        }
    }
}`,
      },
      {
        title: "イベントストアの実装",
        content:
          "イベントストアは、ドメインイベントを永続化するデータストアです。RDB のテーブル、EventStoreDB（専用DB）、Kafka のトピックなどで実装します。各イベントは集約ID、イベント型、ペイロード（JSON）、バージョン番号、タイムスタンプで構成されます。楽観的ロック（バージョン番号）で並行更新の競合を防ぎます。スナップショットを定期的に保存することで、リプレイの高速化が図れます。",
        code: `// RDBベースのイベントストア実装
@Entity
@Table(name = "event_store")
public class StoredEvent {
    @Id @GeneratedValue
    private Long eventId;

    @Column(nullable = false)
    private String aggregateId;   // 集約ID（例: orderId）

    @Column(nullable = false)
    private String aggregateType; // 集約型（例: "Order"）

    @Column(nullable = false)
    private int version;          // バージョン番号（楽観的ロック）

    @Column(nullable = false)
    private String eventType;     // イベント型名

    @Column(columnDefinition = "jsonb")
    private String payload;       // イベントデータ（JSON）

    @Column(nullable = false)
    private LocalDateTime occurredAt;
}

@Repository
public class EventStoreRepository {
    private final JdbcTemplate jdbc;
    private final ObjectMapper objectMapper;

    // イベントの保存（楽観的ロックで競合を防止）
    @Transactional
    public void saveEvents(String aggregateId, int expectedVersion,
                           List<OrderEvent> events) {
        int currentVersion = getCurrentVersion(aggregateId);
        if (currentVersion != expectedVersion) {
            throw new OptimisticLockException(
                "バージョン競合: expected=" + expectedVersion
                + ", actual=" + currentVersion);
        }
        int version = expectedVersion;
        for (OrderEvent event : events) {
            jdbc.update("INSERT INTO event_store VALUES (?,?,?,?,?,?)",
                null, aggregateId, "Order", ++version,
                event.getClass().getSimpleName(),
                objectMapper.writeValueAsString(event));
        }
    }

    // イベントの読み込み
    public List<StoredEvent> getEvents(String aggregateId) {
        return jdbc.query(
            "SELECT * FROM event_store WHERE aggregate_id = ? ORDER BY version",
            rowMapper, aggregateId);
    }
}`,
      },
      {
        title: "CQRS + イベントソーシングの統合",
        content:
          "CQRS とイベントソーシングは相性が良く、組み合わせて使われることが多いです。コマンド側でイベントソーシングを使い、イベントストアに変更を記録します。イベントはプロジェクションに配信され、読み取り側のビューを更新します。この構成により、書き込みの完全な履歴とクエリに最適化されたビューの両方を実現できます。ただし、システムの複雑さが大幅に増すため、本当に必要な部分にのみ適用することが重要です。",
        code: `// CQRS + イベントソーシングの統合
@Service
public class OrderService {
    private final EventStoreRepository eventStore;
    private final ApplicationEventPublisher publisher;

    // コマンド: 注文作成（イベントソーシング）
    @Transactional
    public Long createOrder(CreateOrderCommand cmd) {
        Long orderId = generateId();

        // イベントを生成
        var event = new OrderEvent.OrderCreated(
            orderId, cmd.userId(), cmd.items(), LocalDateTime.now());

        // イベントストアに保存
        eventStore.saveEvents(orderId.toString(), 0, List.of(event));

        // プロジェクションに通知（読み取りモデル更新）
        publisher.publishEvent(event);

        return orderId;
    }

    // コマンド: 注文確定
    @Transactional
    public void confirmOrder(Long orderId) {
        // イベントから現在の状態を復元
        var events = eventStore.getEvents(orderId.toString());
        var aggregate = OrderAggregate.fromEvents(toEvents(events));

        // ビジネスルール検証
        if (aggregate.getStatus() != OrderStatus.PENDING) {
            throw new IllegalStateException("確定できない状態です");
        }

        // 新しいイベントを追加
        var event = new OrderEvent.OrderConfirmed(orderId, LocalDateTime.now());
        eventStore.saveEvents(orderId.toString(), events.size(), List.of(event));
        publisher.publishEvent(event);
    }

    // クエリ: 注文履歴の完全な再現
    public List<OrderEvent> getOrderHistory(Long orderId) {
        return toEvents(eventStore.getEvents(orderId.toString()));
    }
}`,
      },
    ],
  },

  // ===== インフラ =====
  {
    id: "service-discovery",
    title: "サービスディスカバリ",
    category: "infrastructure",
    description:
      "Eureka/Consulによるサービス登録・発見、ロードバランシング、ヘルスチェック",
    sections: [
      {
        title: "サービスディスカバリとは",
        content:
          "マイクロサービス環境では、サービスのインスタンスは動的に増減し、IPアドレスも変化します。サービスディスカバリは、サービスの場所（ホスト・ポート）を自動的に登録・発見する仕組みです。各サービスは起動時にディスカバリサーバーに自身を登録し、他のサービスを呼び出す際はディスカバリサーバーに問い合わせてアドレスを取得します。Netflix Eureka と HashiCorp Consul が代表的な実装で、Kubernetes 環境では Kubernetes の DNS ベースのサービスディスカバリも利用できます。",
        code: `// Eureka Serverの構築（Spring Cloud）
// === Eureka Server（ディスカバリサーバー） ===
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

// application.yml（Eureka Server）
// server:
//   port: 8761
// eureka:
//   client:
//     register-with-eureka: false  # 自分自身は登録しない
//     fetch-registry: false

// === Eureka Client（各マイクロサービス） ===
@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

// application.yml（Eureka Client）
// spring:
//   application:
//     name: user-service           # サービス名
// eureka:
//   client:
//     service-url:
//       defaultZone: http://localhost:8761/eureka/
//   instance:
//     prefer-ip-address: true      # ホスト名の代わりにIPを使用`,
      },
      {
        title: "Consul によるサービスディスカバリ",
        content:
          "HashiCorp Consul はサービスディスカバリに加え、分散 KV ストア、ヘルスチェック、サービスメッシュの機能を持つツールです。Eureka より多機能で、マルチデータセンター対応、ACL によるアクセス制御、DNS インターフェースを備えています。Spring Cloud Consul で簡単に統合でき、設定の外部管理（Consul KV）も可能です。Eureka が AP システム（可用性優先）なのに対し、Consul は CP システム（一貫性優先）で、Raft プロトコルでコンセンサスを取ります。",
        code: `// Consul によるサービス登録（Spring Cloud Consul）
// build.gradle
// dependencies {
//   implementation 'org.springframework.cloud:spring-cloud-starter-consul-discovery'
//   implementation 'org.springframework.cloud:spring-cloud-starter-consul-config'
// }

// application.yml
// spring:
//   application:
//     name: order-service
//   cloud:
//     consul:
//       host: localhost
//       port: 8500
//       discovery:
//         service-name: order-service
//         health-check-interval: 10s   # ヘルスチェック間隔
//         health-check-path: /actuator/health
//         instance-id: \${spring.application.name}:\${random.value}
//       config:
//         enabled: true
//         prefix: config               # Consul KVのプレフィックス
//         default-context: application

// DiscoveryClientで他サービスの情報を取得
@RestController
public class ServiceInfoController {
    private final DiscoveryClient discoveryClient;

    public ServiceInfoController(DiscoveryClient discoveryClient) {
        this.discoveryClient = discoveryClient;
    }

    @GetMapping("/api/services")
    public Map<String, List<String>> getServices() {
        Map<String, List<String>> services = new HashMap<>();
        for (String name : discoveryClient.getServices()) {
            var instances = discoveryClient.getInstances(name).stream()
                .map(i -> i.getHost() + ":" + i.getPort())
                .toList();
            services.put(name, instances);
        }
        return services; // {"user-service":["192.168.1.10:8081","192.168.1.11:8081"]}
    }
}`,
      },
      {
        title: "クライアントサイドロードバランシング",
        content:
          "サービスディスカバリで取得した複数のインスタンスにリクエストを分散するのがクライアントサイドロードバランシングです。Spring Cloud LoadBalancer がデフォルトで提供され、ラウンドロビン、ランダム、加重などのアルゴリズムを選択できます。RestClient や WebClient と統合し、サービス名（lb://user-service）でアクセスすると自動的に負荷分散されます。ヘルスチェックと連動して、異常なインスタンスを自動的に除外します。",
        code: `// Spring Cloud LoadBalancer の設定
@Configuration
public class LoadBalancerConfig {

    // ロードバランサー付きRestClientの設定
    @Bean
    @LoadBalanced  // ロードバランシング有効化
    public RestClient.Builder loadBalancedRestClientBuilder() {
        return RestClient.builder();
    }
}

// サービス名でアクセス（自動的にロードバランシング）
@Service
public class UserServiceClient {
    private final RestClient restClient;

    public UserServiceClient(@LoadBalanced RestClient.Builder builder) {
        // "user-service" はEureka/Consulに登録されたサービス名
        this.restClient = builder
            .baseUrl("http://user-service")
            .build();
    }

    public UserDto getUser(Long id) {
        // 複数インスタンスに自動的に分散
        return restClient.get()
            .uri("/api/users/{id}", id)
            .retrieve()
            .body(UserDto.class);
    }
}

// カスタムロードバランシング戦略
// @LoadBalancerClient(
//   name = "user-service",
//   configuration = CustomLBConfig.class)
// class CustomLBConfig {
//     @Bean
//     public ReactorLoadBalancer<ServiceInstance> randomLB(
//             ServiceInstanceListSupplier supplier) {
//         return new RandomLoadBalancer(supplier, "user-service");
//     }
// }`,
      },
      {
        title: "ヘルスチェック",
        content:
          "ヘルスチェックはサービスの稼働状態を定期的に確認する仕組みです。サービスディスカバリと連動し、異常なインスタンスを自動的にルーティングから除外します。Spring Boot Actuator の /actuator/health エンドポイントで、DB接続、ディスク容量、外部サービスの状態を一括監視できます。カスタムヘルスインジケーターを実装して、ビジネス固有の健全性チェック（キュー滞留数、キャッシュヒット率など）も追加可能です。",
        code: `// カスタムヘルスインジケーターの実装
import org.springframework.boot.actuate.health.*;

@Component
public class ExternalApiHealthIndicator implements HealthIndicator {

    private final RestClient restClient;

    public ExternalApiHealthIndicator(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("http://external-api").build();
    }

    @Override
    public Health health() {
        try {
            var response = restClient.get()
                .uri("/health")
                .retrieve()
                .toBodilessEntity();

            if (response.getStatusCode().is2xxSuccessful()) {
                return Health.up()
                    .withDetail("外部API", "正常")
                    .withDetail("レスポンス時間", "OK")
                    .build();
            }
            return Health.down()
                .withDetail("外部API", "異常レスポンス")
                .build();
        } catch (Exception ex) {
            return Health.down()
                .withDetail("外部API", "接続不可")
                .withException(ex)
                .build();
        }
    }
}

// application.yml
// management:
//   endpoint:
//     health:
//       show-details: always  # 詳細を常に表示
//   health:
//     diskspace:
//       enabled: true
//     db:
//       enabled: true`,
      },
      {
        title: "Kubernetes環境でのサービスディスカバリ",
        content:
          "Kubernetes 環境では、Kubernetes 自体がサービスディスカバリとロードバランシングを提供するため、Eureka/Consul は不要になることが多いです。Kubernetes Service によりサービス名で DNS 解決が行われ、kube-proxy がロードバランシングを処理します。Spring Cloud Kubernetes を使うと、Kubernetes の Service/ConfigMap/Secret を Spring アプリケーションからシームレスに利用できます。ただし、サーキットブレーカーなどのクライアントサイドの耐障害性パターンは引き続き重要です。",
        code: `// Kubernetes環境でのSpring Boot設定
// === Kubernetes Service（k8s manifest） ===
// apiVersion: v1
// kind: Service
// metadata:
//   name: user-service
// spec:
//   selector:
//     app: user-service
//   ports:
//     - port: 8080
//       targetPort: 8080

// Spring Cloud Kubernetesの設定
// application.yml
// spring:
//   application:
//     name: order-service
//   cloud:
//     kubernetes:
//       discovery:
//         enabled: true       # K8sサービスディスカバリ有効
//         all-namespaces: false
//       config:
//         enabled: true       # ConfigMap/Secret連携

// K8s環境ではサービス名で直接アクセス可能
@Service
public class K8sUserServiceClient {
    private final RestClient restClient;

    public K8sUserServiceClient(RestClient.Builder builder) {
        // K8s DNSでuser-serviceが解決される
        this.restClient = builder
            .baseUrl("http://user-service:8080")
            .build();
    }

    public UserDto getUser(Long id) {
        return restClient.get()
            .uri("/api/users/{id}", id)
            .retrieve()
            .body(UserDto.class);
    }
}

// Readiness/Liveness Probeの設定
// management.endpoint.health.probes.enabled: true
// → /actuator/health/readiness と /actuator/health/liveness`,
      },
    ],
  },
  {
    id: "observability",
    title: "オブザーバビリティ",
    category: "infrastructure",
    description:
      "分散トレーシング（Zipkin/Jaeger）、メトリクス（Prometheus/Grafana）、集中ログ（ELK）",
    sections: [
      {
        title: "オブザーバビリティの3本柱",
        content:
          "オブザーバビリティ（可観測性）は、システムの内部状態を外部から観測・理解する能力です。3本柱は (1) メトリクス：数値データの時系列（CPU使用率、リクエスト数、レイテンシ）、(2) ログ：イベントの詳細記録（エラーメッセージ、処理結果）、(3) トレース：リクエストの伝搬経路（サービス間の呼び出しチェーン）です。マイクロサービスでは問題の原因特定が困難になるため、これら3つを統合的に活用することが不可欠です。Micrometer と OpenTelemetry が Java エコシステムの標準ツールです。",
        code: `// Spring Boot 3 + Micrometer のオブザーバビリティ設定
// build.gradle
// dependencies {
//   implementation 'org.springframework.boot:spring-boot-starter-actuator'
//   implementation 'io.micrometer:micrometer-tracing-bridge-otel'
//   implementation 'io.opentelemetry:opentelemetry-exporter-otlp'
//   runtimeOnly 'io.micrometer:micrometer-registry-prometheus'
// }

// application.yml
// management:
//   endpoints:
//     web:
//       exposure:
//         include: health,metrics,prometheus
//   tracing:
//     sampling:
//       probability: 1.0   # 全リクエストをトレース（本番は0.1等）
//   otlp:
//     tracing:
//       endpoint: http://otel-collector:4318/v1/traces
//   metrics:
//     export:
//       prometheus:
//         enabled: true

// カスタムメトリクスの記録
@Service
public class OrderMetrics {
    private final MeterRegistry registry;

    public OrderMetrics(MeterRegistry registry) {
        this.registry = registry;
    }

    public void recordOrderCreated(String status) {
        registry.counter("orders.created", "status", status).increment();
    }

    public void recordOrderProcessingTime(long millis) {
        registry.timer("orders.processing.time")
            .record(millis, java.util.concurrent.TimeUnit.MILLISECONDS);
    }
}`,
      },
      {
        title: "分散トレーシング（Zipkin/Jaeger）",
        content:
          "分散トレーシングは、1つのリクエストが複数のマイクロサービスを通過する際の呼び出しチェーンを追跡する仕組みです。各リクエストにトレースID（全体の識別子）とスパンID（個々のサービスの処理区間）を付与し、サービス間で伝搬します。Zipkin と Jaeger が代表的なトレーシングバックエンドで、Spring Boot 3 では Micrometer Tracing + OpenTelemetry で自動的にトレース情報を生成・送信します。ボトルネックのサービスや遅延の原因を視覚的に特定できます。",
        code: `// 分散トレーシングの設定（Zipkin）
// application.yml
// management:
//   tracing:
//     sampling:
//       probability: 1.0
//   zipkin:
//     tracing:
//       endpoint: http://zipkin:9411/api/v2/spans

// トレースIDの伝搬は自動で行われる
// （RestClient, WebClient, Kafka, gRPC等）
@RestController
public class OrderController {
    private static final Logger log = LoggerFactory.getLogger(OrderController.class);
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/api/orders")
    public ResponseEntity<Order> createOrder(@RequestBody CreateOrderRequest req) {
        // ログにトレースID/スパンIDが自動付与される
        log.info("注文リクエスト受信: userId={}", req.userId());

        Order order = orderService.createOrder(req);

        log.info("注文作成完了: orderId={}", order.getId());
        return ResponseEntity.ok(order);
    }
}

// ログ出力例（トレースID付き）:
// 2024-01-15 10:30:00 [order-service,abc123def456,span789]
//   INFO OrderController - 注文リクエスト受信: userId=42
// 2024-01-15 10:30:01 [user-service,abc123def456,span012]
//   INFO UserService - ユーザー取得: id=42
// → 同じトレースID "abc123def456" で紐付け可能`,
      },
      {
        title: "メトリクス（Prometheus/Grafana）",
        content:
          "Prometheus は時系列データベースで、アプリケーションの /actuator/prometheus エンドポイントからメトリクスをスクレイプ（定期取得）します。Grafana で可視化し、ダッシュボードを構築します。Spring Boot Actuator + Micrometer で JVM メトリクス（ヒープ使用量、GC、スレッド数）、HTTP メトリクス（リクエスト数、レイテンシ、エラー率）、カスタムメトリクス（ビジネス指標）を自動的に公開できます。アラートルールを設定して異常を自動検知します。",
        code: `// Prometheus メトリクスの公開とカスタムメトリクス
@Configuration
public class MetricsConfig {

    // カスタムメトリクスの登録
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> commonTags() {
        return registry -> registry.config()
            .commonTags("application", "order-service",
                        "environment", "production");
    }
}

@Service
public class BusinessMetrics {
    private final Counter orderCounter;
    private final Timer orderTimer;
    private final AtomicInteger activeOrders;

    public BusinessMetrics(MeterRegistry registry) {
        // カウンター: 注文数
        this.orderCounter = Counter.builder("business.orders.total")
            .description("注文総数")
            .tag("type", "all")
            .register(registry);

        // タイマー: 注文処理時間
        this.orderTimer = Timer.builder("business.orders.duration")
            .description("注文処理時間")
            .publishPercentiles(0.5, 0.95, 0.99) // パーセンタイル
            .register(registry);

        // ゲージ: 処理中の注文数
        this.activeOrders = registry.gauge("business.orders.active",
            new AtomicInteger(0));
    }

    public void recordOrder(Runnable orderProcess) {
        activeOrders.incrementAndGet();
        orderTimer.record(() -> {
            orderProcess.run();
            orderCounter.increment();
        });
        activeOrders.decrementAndGet();
    }
}

// Prometheus設定（prometheus.yml）
// scrape_configs:
//   - job_name: 'spring-boot-apps'
//     metrics_path: '/actuator/prometheus'
//     static_configs:
//       - targets: ['order-service:8080','user-service:8081']`,
      },
      {
        title: "集中ログ（ELK Stack）",
        content:
          "ELK Stack（Elasticsearch + Logstash + Kibana）は集中ログ管理の定番です。各マイクロサービスのログを Logstash または Fluentd で収集し、Elasticsearch に格納し、Kibana で検索・可視化します。構造化ログ（JSON 形式）を使うと、Elasticsearch でのフィルタリングや集計が容易になります。Spring Boot では Logback で JSON 形式のログを出力し、トレースIDを含めることで分散トレーシングとの関連付けが可能になります。",
        code: `// 構造化ログ（JSON形式）の設定
// logback-spring.xml
// <configuration>
//   <appender name="JSON" class="ch.qos.logback.core.ConsoleAppender">
//     <encoder class="net.logstash.logback.encoder.LogstashEncoder">
//       <includeMdcKeyName>traceId</includeMdcKeyName>
//       <includeMdcKeyName>spanId</includeMdcKeyName>
//     </encoder>
//   </appender>
//   <root level="INFO">
//     <appender-ref ref="JSON" />
//   </root>
// </configuration>

// 構造化ログの出力例:
// {
//   "@timestamp": "2024-01-15T10:30:00.123+09:00",
//   "level": "INFO",
//   "logger_name": "com.example.OrderService",
//   "message": "注文作成完了",
//   "traceId": "abc123def456",
//   "spanId": "span789",
//   "service": "order-service",
//   "orderId": 12345,
//   "userId": 42
// }

// MDCにカスタムフィールドを追加
@Service
public class OrderServiceWithLogging {
    private static final Logger log = LoggerFactory.getLogger(
        OrderServiceWithLogging.class);

    public Order createOrder(CreateOrderRequest req) {
        // MDCにビジネス情報を追加（ログに自動出力される）
        MDC.put("userId", req.userId().toString());
        try {
            Order order = processOrder(req);
            MDC.put("orderId", order.getId().toString());
            log.info("注文作成完了: 合計={}", order.getTotalAmount());
            return order;
        } finally {
            MDC.clear(); // MDCクリア（スレッドプール環境で重要）
        }
    }
}`,
      },
      {
        title: "アラートとSLO監視",
        content:
          "オブザーバビリティの目的は問題の早期検出と迅速な対応です。SLI（Service Level Indicator）としてレイテンシ、可用性、エラー率を定義し、SLO（Service Level Objective）として目標値を設定します。Prometheus の Alertmanager でアラートルールを定義し、Slack やメールで通知します。RED メソッド（Rate/Error/Duration）やUSE メソッド（Utilization/Saturation/Errors）でメトリクスを体系的に監視し、ダッシュボードに集約します。",
        code: `// Prometheus アラートルールの例
// alert_rules.yml
// groups:
//   - name: spring-boot-alerts
//     rules:
//       - alert: HighErrorRate
//         expr: >
//           rate(http_server_requests_seconds_count{status=~"5.."}[5m])
//           / rate(http_server_requests_seconds_count[5m]) > 0.05
//         for: 5m
//         labels:
//           severity: critical
//         annotations:
//           summary: "エラー率が5%を超過: {{ $labels.instance }}"
//
//       - alert: HighLatency
//         expr: >
//           histogram_quantile(0.95,
//             rate(http_server_requests_seconds_bucket[5m])) > 1.0
//         for: 5m
//         labels:
//           severity: warning
//         annotations:
//           summary: "P95レイテンシが1秒を超過"

// SLO監視用のカスタムメトリクス
@Component
public class SloMonitor {
    private final MeterRegistry registry;

    public SloMonitor(MeterRegistry registry) {
        this.registry = registry;
    }

    // SLO: 99.9%の可用性（月間ダウンタイム43分以内）
    // SLO: P95レイテンシ500ms以内
    public void recordRequest(String endpoint, int status, long durationMs) {
        registry.counter("slo.requests.total",
            "endpoint", endpoint,
            "success", String.valueOf(status < 500)).increment();

        if (durationMs > 500) {
            registry.counter("slo.latency.violations",
                "endpoint", endpoint).increment();
        }
    }
}`,
      },
    ],
  },
];

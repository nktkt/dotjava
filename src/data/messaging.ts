export interface MessagingSection {
  title: string;
  content: string;
  code?: string;
}

export interface MessagingChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: MessagingSection[];
}

export interface MessagingCategory {
  id: string;
  name: string;
  color: string;
}

export const messagingCategories: MessagingCategory[] = [
  { id: "concepts", name: "メッセージング基礎", color: "#2563EB" },
  { id: "kafka", name: "Apache Kafka", color: "#231F20" },
  { id: "rabbitmq", name: "RabbitMQ", color: "#FF6600" },
];

export const messagingChapters: MessagingChapter[] = [
  // ===== メッセージング基礎 =====
  {
    id: "messaging-patterns",
    title: "メッセージングパターン",
    category: "concepts",
    description:
      "同期 vs 非同期通信、Point-to-Point vs Pub/Sub、メッセージブローカーの役割、イベント駆動アーキテクチャ",
    sections: [
      {
        title: "同期通信 vs 非同期通信",
        content:
          "マイクロサービス間の通信は大きく同期通信と非同期通信に分類されます。同期通信（REST/gRPC）はリクエスト送信後にレスポンスを待つため、呼び出し先サービスがダウンしていると呼び出し元もブロックされます。一方、非同期通信（メッセージキュー）はメッセージをブローカーに送信した時点で処理が完了し、受信側は自分のペースでメッセージを消費できます。非同期通信はサービス間の疎結合を実現し、負荷の平準化やスパイク対応に優れています。ただし、処理結果の即時取得が難しく、デバッグやトレーシングが複雑になるという課題もあります。",
        code: `// 同期通信の例（REST呼び出し）
@Service
public class OrderService {

    private final RestTemplate restTemplate;

    public OrderService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    // 同期: レスポンスを待つ → サービスがダウンしていると失敗
    public UserDto getUser(Long userId) {
        return restTemplate.getForObject(
            "http://user-service/api/users/" + userId,
            UserDto.class
        );
    }
}

// 非同期通信の例（メッセージキュー経由）
@Service
public class OrderService {

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderService(KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // 非同期: メッセージを送信して即座に返る
    public void placeOrder(Order order) {
        orderRepository.save(order);

        OrderEvent event = new OrderEvent(
            order.getId(), order.getUserId(), order.getTotal()
        );
        // ブローカーに送信 → 受信側は独立して処理
        kafkaTemplate.send("order-events", order.getId().toString(), event);
    }
}`,
      },
      {
        title: "Point-to-Point vs Pub/Sub",
        content:
          "メッセージングには2つの基本パターンがあります。Point-to-Point（P2P）パターンでは、1つのメッセージは1つのコンシューマだけが受信します。キューに入ったメッセージは1つのワーカーが取り出して処理するため、タスクの分散処理に適しています。一方、Publish/Subscribe（Pub/Sub）パターンでは、1つのメッセージが複数のサブスクライバーに配信されます。注文イベントを在庫サービス、通知サービス、分析サービスが同時に受け取るようなケースに使います。Kafkaのコンシューマグループを使えば、Pub/Sub内でP2Pの負荷分散も実現できます。",
        code: `// Point-to-Point: タスクキュー（1メッセージ → 1ワーカー）
// RabbitMQの例: 複数ワーカーで処理を分散

// --- Producer ---
@Service
public class TaskProducer {
    private final RabbitTemplate rabbitTemplate;

    public void submitTask(TaskMessage task) {
        // デフォルトExchange + ルーティングキーでキューに直接送信
        rabbitTemplate.convertAndSend("task-queue", task);
    }
}

// --- Worker 1, 2, 3 ... （同じキューから競合消費） ---
@Component
public class TaskWorker {
    @RabbitListener(queues = "task-queue")
    public void processTask(TaskMessage task) {
        // 1つのメッセージは1つのワーカーだけが受信
        log.info("処理中: {}", task.getId());
    }
}

// ============================================

// Pub/Sub: イベント通知（1メッセージ → 複数サービス）
// Kafkaの例: 各サービスが異なるConsumer Groupで全メッセージを受信

// --- Publisher ---
@Service
public class OrderEventPublisher {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void publishOrderCreated(Order order) {
        kafkaTemplate.send("order-events", new OrderEvent(order));
    }
}

// --- 在庫サービス（Consumer Group: inventory-group） ---
@KafkaListener(topics = "order-events", groupId = "inventory-group")
public void updateInventory(OrderEvent event) {
    inventoryService.reduceStock(event.getItems());
}

// --- 通知サービス（Consumer Group: notification-group） ---
@KafkaListener(topics = "order-events", groupId = "notification-group")
public void sendNotification(OrderEvent event) {
    notificationService.sendEmail(event.getUserId());
}`,
      },
      {
        title: "メッセージブローカーの役割",
        content:
          "メッセージブローカーはプロデューサー（送信者）とコンシューマー（受信者）の間に位置する仲介システムです。主な役割は、メッセージの一時保管（バッファリング）、ルーティング（宛先の振り分け）、負荷平準化（バーストトラフィックの吸収）、永続化（障害時のデータ保護）です。ブローカーの存在により、送信側と受信側は互いの存在を意識する必要がなく、独立してスケーリングやデプロイが可能です。代表的なブローカーにはApache Kafka、RabbitMQ、Amazon SQS/SNS、Apache ActiveMQなどがあります。",
        code: `// メッセージブローカーを使ったアーキテクチャ構成図（概念）
//
// ┌──────────┐    ┌─────────────────┐    ┌──────────────┐
// │ Producer │───→│ Message Broker  │───→│  Consumer A  │
// │ (注文API) │    │                 │    │ (在庫サービス) │
// └──────────┘    │  ┌───────────┐  │    └──────────────┘
//                 │  │  Queue /  │  │    ┌──────────────┐
// ┌──────────┐    │  │  Topic    │  │───→│  Consumer B  │
// │ Producer │───→│  └───────────┘  │    │ (通知サービス) │
// │ (バッチ)  │    │                 │    └──────────────┘
// └──────────┘    └─────────────────┘
//
// ブローカーの主要機能:
// 1. バッファリング - 一時的な負荷スパイクを吸収
// 2. ルーティング   - メッセージを適切なキュー/トピックへ
// 3. 永続化        - ディスクに保存し障害時にも復旧可能
// 4. 順序保証      - パーティション/キュー内での順序保持

// Spring Bootでの典型的な設定（application.yml）
// Kafka設定:
// spring:
//   kafka:
//     bootstrap-servers: localhost:9092
//     consumer:
//       group-id: my-service
//       auto-offset-reset: earliest
//     producer:
//       key-serializer: org.apache.kafka.common.serialization.StringSerializer
//       value-serializer: org.springframework.kafka.support.serializer.JsonSerializer

// RabbitMQ設定:
// spring:
//   rabbitmq:
//     host: localhost
//     port: 5672
//     username: guest
//     password: guest`,
      },
      {
        title: "イベント駆動アーキテクチャ（EDA）",
        content:
          "イベント駆動アーキテクチャ（Event-Driven Architecture）は、システムの状態変化をイベントとして発行し、関心のあるサービスがそれを購読するパターンです。命令的な「注文を処理せよ」というコマンドではなく、「注文が作成された」という事実（イベント）を発行します。これにより、発行者は購読者の存在を知る必要がなく、新しい購読者の追加が容易です。イベントソーシングではイベント自体を永続化し、状態の再構築やデバッグに活用します。CQRS（コマンドクエリ責務分離）と組み合わせることで、書き込みと読み取りを最適化できます。",
        code: `// イベント駆動アーキテクチャの実装例

// --- ドメインイベントの定義 ---
public abstract class DomainEvent {
    private final String eventId = UUID.randomUUID().toString();
    private final LocalDateTime occurredAt = LocalDateTime.now();
    private final String eventType;

    protected DomainEvent(String eventType) {
        this.eventType = eventType;
    }

    // getters...
}

public class OrderCreatedEvent extends DomainEvent {
    private final Long orderId;
    private final Long userId;
    private final BigDecimal totalAmount;
    private final List<OrderItem> items;

    public OrderCreatedEvent(Long orderId, Long userId,
                             BigDecimal totalAmount, List<OrderItem> items) {
        super("ORDER_CREATED");
        this.orderId = orderId;
        this.userId = userId;
        this.totalAmount = totalAmount;
        this.items = items;
    }
}

// --- イベント発行（Publisher） ---
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, DomainEvent> kafkaTemplate;

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        Order order = Order.create(request);
        orderRepository.save(order);

        // 状態変化をイベントとして発行
        OrderCreatedEvent event = new OrderCreatedEvent(
            order.getId(), request.getUserId(),
            order.getTotal(), order.getItems()
        );
        kafkaTemplate.send("domain-events", event);
        return order;
    }
}

// --- イベント購読者たち（Subscribers） ---
// 在庫サービス: 在庫を減らす
@KafkaListener(topics = "domain-events", groupId = "inventory-svc")
public void onOrderCreated(OrderCreatedEvent event) {
    event.getItems().forEach(item ->
        inventoryService.reduceStock(item.getProductId(), item.getQuantity())
    );
}

// 通知サービス: メール送信
@KafkaListener(topics = "domain-events", groupId = "notification-svc")
public void onOrderCreated(OrderCreatedEvent event) {
    emailService.sendOrderConfirmation(event.getUserId(), event.getOrderId());
}

// 分析サービス: 売上データ記録
@KafkaListener(topics = "domain-events", groupId = "analytics-svc")
public void onOrderCreated(OrderCreatedEvent event) {
    analyticsService.recordSale(event.getTotalAmount(), event.getItems());
}`,
      },
    ],
  },
  {
    id: "reliability",
    title: "信頼性とデリバリー保証",
    category: "concepts",
    description:
      "At-most-once/At-least-once/Exactly-once、デッドレターキュー、リトライ戦略、べき等性(Idempotency)の実装",
    sections: [
      {
        title: "メッセージデリバリー保証の3つのレベル",
        content:
          "メッセージングにおけるデリバリー保証には3つのレベルがあります。At-most-once（最大1回）はメッセージが失われる可能性がありますが、重複はありません。ログ収集のように多少の欠損を許容できるケースで使用します。At-least-once（最低1回）はメッセージの損失を防ぎますが、重複が発生する可能性があります。多くのビジネスシステムでこのレベルが使われます。Exactly-once（正確に1回）は理想的ですが、分散システムでは完全な実現が困難です。Kafkaのトランザクション機能やべき等プロデューサーを使うことで近似的に実現できます。",
        code: `// --- At-most-once（最大1回） ---
// オフセットを先にコミット → 処理失敗してもリトライしない
// spring.kafka.consumer.enable-auto-commit=true
// spring.kafka.consumer.auto-commit-interval=100

@KafkaListener(topics = "logs")
public void handleLog(LogEvent event) {
    // 自動コミット済み → 例外が発生してもメッセージは再配信されない
    logStorage.store(event);
}

// --- At-least-once（最低1回） ---
// 処理完了後にオフセットをコミット → 処理中に障害が起きると再配信
// spring.kafka.consumer.enable-auto-commit=false
// spring.kafka.listener.ack-mode=RECORD

@KafkaListener(topics = "orders")
public void handleOrder(OrderEvent event, Acknowledgment ack) {
    orderService.process(event); // 処理実行
    ack.acknowledge();           // 手動コミット（処理成功後）
    // 処理後・コミット前にクラッシュ → 再配信（重複の可能性）
}

// --- Exactly-once（正確に1回）--- Kafkaトランザクション利用
// spring.kafka.producer.transaction-id-prefix=tx-
// spring.kafka.consumer.isolation-level=read_committed

@Transactional
@KafkaListener(topics = "payments")
public void handlePayment(PaymentEvent event,
                          @Header(KafkaHeaders.RECEIVED_KEY) String key) {
    // Kafkaトランザクション内で読み取り → 処理 → 書き込み
    PaymentResult result = paymentService.process(event);
    kafkaTemplate.send("payment-results", key, result);
    // コンシュームとプロデュースが同一トランザクション
}`,
      },
      {
        title: "デッドレターキュー（DLQ）",
        content:
          "デッドレターキュー（Dead Letter Queue）は、正常に処理できなかったメッセージを別のキューに退避させる仕組みです。リトライ回数の上限に達した場合や、デシリアライズに失敗した場合などにメッセージがDLQに送られます。DLQに入ったメッセージは後から原因調査や手動での再処理が可能です。KafkaではDead Letter Topic（DLT）と呼ばれます。Spring Kafkaでは DefaultErrorHandler と DeadLetterPublishingRecoverer を使って自動的にDLTへ転送できます。DLQの監視はシステム運用上非常に重要です。",
        code: `// Spring Kafka: DLT（Dead Letter Topic）の設定

@Configuration
public class KafkaErrorConfig {

    @Bean
    public DefaultErrorHandler errorHandler(
            KafkaTemplate<String, Object> kafkaTemplate) {

        // DLTへの転送設定
        DeadLetterPublishingRecoverer recoverer =
            new DeadLetterPublishingRecoverer(kafkaTemplate,
                (record, ex) -> {
                    // 元トピック名 + ".DLT" にルーティング
                    return new TopicPartition(
                        record.topic() + ".DLT", record.partition());
                });

        // 3回リトライ後にDLTへ送信
        DefaultErrorHandler handler = new DefaultErrorHandler(
            recoverer,
            new FixedBackOff(1000L, 3L) // 1秒間隔で3回リトライ
        );

        // デシリアライズエラーはリトライ不要 → 即DLTへ
        handler.addNotRetryableExceptions(
            DeserializationException.class,
            IllegalArgumentException.class
        );

        return handler;
    }
}

// DLTメッセージの監視・再処理
@Component
public class DltListener {

    @KafkaListener(topics = "order-events.DLT", groupId = "dlt-monitor")
    public void handleDlt(ConsumerRecord<String, byte[]> record,
                          @Header(KafkaHeaders.DLT_EXCEPTION_MESSAGE)
                          String errorMessage) {
        log.error("DLTメッセージ受信: key={}, error={}",
            record.key(), errorMessage);

        // アラート通知
        alertService.sendAlert("DLTメッセージ検出: " + record.topic());

        // DBに保存して後で手動再処理
        failedMessageRepository.save(new FailedMessage(
            record.topic(), record.key(),
            new String(record.value()), errorMessage
        ));
    }
}`,
      },
      {
        title: "リトライ戦略",
        content:
          "メッセージ処理に失敗した際のリトライ戦略は、システムの信頼性に直結します。即座リトライ（Immediate Retry）は一時的な障害に対して有効ですが、外部サービスの障害時には無駄なリクエストを増やしてしまいます。固定間隔リトライ（Fixed Backoff）は一定間隔でリトライし、指数バックオフ（Exponential Backoff）はリトライごとに待ち時間を倍増させます。さらにジッター（ランダムな揺らぎ）を加えることで、複数インスタンスのリトライが同時に発生する「サンダリングハード」問題を防げます。Spring Kafkaではカスタムバックオフポリシーを設定できます。",
        code: `// リトライ戦略の実装パターン

// 1. 固定間隔リトライ（Fixed Backoff）
@Bean
public DefaultErrorHandler fixedBackoffHandler(
        DeadLetterPublishingRecoverer recoverer) {
    // 2秒間隔で5回リトライ
    return new DefaultErrorHandler(
        recoverer,
        new FixedBackOff(2000L, 5L)
    );
}

// 2. 指数バックオフ（Exponential Backoff）
@Bean
public DefaultErrorHandler exponentialBackoffHandler(
        DeadLetterPublishingRecoverer recoverer) {
    ExponentialBackOff backOff = new ExponentialBackOff();
    backOff.setInitialInterval(1000L);   // 初回: 1秒
    backOff.setMultiplier(2.0);          // 倍率: 2倍
    backOff.setMaxInterval(30000L);      // 最大: 30秒
    backOff.setMaxElapsedTime(120000L);  // 合計最大: 2分

    // リトライ間隔: 1s → 2s → 4s → 8s → 16s → 30s → 30s...
    return new DefaultErrorHandler(recoverer, backOff);
}

// 3. Spring Retryを使ったカスタムリトライ
@Configuration
@EnableRetry
public class RetryConfig {}

@Service
public class PaymentService {

    @Retryable(
        retryFor = { PaymentGatewayException.class },
        maxAttempts = 4,
        backoff = @Backoff(
            delay = 1000,
            multiplier = 2.0,
            maxDelay = 10000,
            random = true  // ジッター付き
        )
    )
    public PaymentResult processPayment(PaymentRequest request) {
        return paymentGateway.charge(request);
    }

    @Recover
    public PaymentResult recoverPayment(PaymentGatewayException ex,
                                        PaymentRequest request) {
        log.error("決済処理失敗（リトライ上限到達）: {}", request.getId());
        return PaymentResult.failed(request.getId(), ex.getMessage());
    }
}`,
      },
      {
        title: "べき等性（Idempotency）の実装",
        content:
          "At-least-once配信では同じメッセージが複数回届く可能性があるため、べき等性（Idempotency）の確保が不可欠です。べき等な処理とは、同じメッセージを何度処理しても結果が変わらない処理のことです。実装パターンとしては、一意なメッセージIDをDBに記録して重複チェックする方法、DBのUPSERT（INSERT ON CONFLICT）を使う方法、条件付き更新（楽観ロック）を使う方法があります。Kafkaのべき等プロデューサーはプロデューサーレベルでの重複排除を提供しますが、コンシューマー側のべき等性は自身で実装する必要があります。",
        code: `// べき等性の実装パターン

// パターン1: メッセージIDによる重複チェック
@Entity
@Table(name = "processed_messages")
public class ProcessedMessage {
    @Id
    private String messageId;
    private LocalDateTime processedAt;
}

@Service
public class IdempotentOrderProcessor {
    private final ProcessedMessageRepository processedRepo;
    private final OrderRepository orderRepo;

    @Transactional
    public void processOrder(OrderEvent event) {
        String messageId = event.getEventId();

        // 重複チェック
        if (processedRepo.existsById(messageId)) {
            log.info("重複メッセージをスキップ: {}", messageId);
            return;
        }

        // ビジネスロジック実行
        orderRepo.save(Order.from(event));

        // 処理済みとして記録（同一トランザクション内）
        processedRepo.save(new ProcessedMessage(
            messageId, LocalDateTime.now()
        ));
    }
}

// パターン2: DBのUPSERT（INSERT ON CONFLICT）
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    // PostgreSQLのON CONFLICT句で自然にべき等
    @Modifying
    @Query(value = """
        INSERT INTO inventory (product_id, quantity, updated_at)
        VALUES (:productId, :quantity, NOW())
        ON CONFLICT (product_id)
        DO UPDATE SET quantity = :quantity, updated_at = NOW()
        """, nativeQuery = true)
    void upsertInventory(@Param("productId") Long productId,
                         @Param("quantity") int quantity);
}

// パターン3: 楽観ロックによる条件付き更新
@Entity
public class Account {
    @Id
    private Long id;
    private BigDecimal balance;
    @Version
    private Long version; // 楽観ロック用

    public void debit(BigDecimal amount) {
        if (this.balance.compareTo(amount) < 0) {
            throw new InsufficientFundsException();
        }
        this.balance = this.balance.subtract(amount);
    }
}`,
      },
    ],
  },

  // ===== Apache Kafka =====
  {
    id: "kafka-basics",
    title: "Kafkaの基礎",
    category: "kafka",
    description:
      "トピック/パーティション/オフセット、Producer/Consumer/Consumer Group、Dockerでの環境構築、kafka-console-producerとconsumer",
    sections: [
      {
        title: "トピック・パーティション・オフセット",
        content:
          "Apache Kafkaはスケーラブルな分散イベントストリーミングプラットフォームです。メッセージはトピック（Topic）に分類され、各トピックは複数のパーティション（Partition）に分割されます。パーティション内のメッセージには連番のオフセット（Offset）が振られ、追記のみ（append-only）で書き込まれます。パーティションを増やすことで並列処理のスループットが向上します。メッセージはキーに基づいてパーティションに振り分けられるため、同じキーのメッセージは同じパーティションに入り順序が保証されます。保持期間（retention）を設定でき、デフォルトは7日間です。",
        code: `// Kafkaのデータ構造（概念図）
//
// Topic: "order-events"
// ┌─────────────────────────────────────────────┐
// │ Partition 0: [0][1][2][3][4][5][6]  ←── 追記 │
// │ Partition 1: [0][1][2][3][4]        ←── 追記 │
// │ Partition 2: [0][1][2][3][4][5]     ←── 追記 │
// └─────────────────────────────────────────────┘
//
// 各 [n] = 1メッセージ（offset番号）
// パーティション内は順序保証あり
// パーティション間の順序保証はなし

// Kafkaトピックの作成（CLIコマンド）
// $ kafka-topics.sh --create \\
//     --bootstrap-server localhost:9092 \\
//     --topic order-events \\
//     --partitions 3 \\
//     --replication-factor 1

// トピック一覧の確認
// $ kafka-topics.sh --list \\
//     --bootstrap-server localhost:9092

// トピックの詳細情報
// $ kafka-topics.sh --describe \\
//     --bootstrap-server localhost:9092 \\
//     --topic order-events
// Topic: order-events  PartitionCount: 3  ReplicationFactor: 1
//   Partition: 0  Leader: 1  Replicas: 1  Isr: 1
//   Partition: 1  Leader: 1  Replicas: 1  Isr: 1
//   Partition: 2  Leader: 1  Replicas: 1  Isr: 1

// メッセージキーによるパーティション振り分け
ProducerRecord<String, String> record = new ProducerRecord<>(
    "order-events",           // topic
    "user-123",               // key（同じキー → 同じパーティション）
    "{\\"orderId\\": 456}"       // value
);`,
      },
      {
        title: "Producer / Consumer / Consumer Group",
        content:
          "Kafkaのプロデューサーはトピックにメッセージを書き込むクライアントです。コンシューマーはトピックからメッセージを読み取ります。コンシューマーグループ（Consumer Group）は、同じgroup.idを持つコンシューマーの集合で、パーティションがグループ内のコンシューマーに均等に割り当てられます。これにより同じトピックを複数インスタンスで並列消費できます。異なるコンシューマーグループは同じメッセージをそれぞれ受信するため、Pub/Subモデルを実現できます。コンシューマーの数がパーティション数を超えると、余分なコンシューマーはアイドル状態になります。",
        code: `// Consumer Groupの動作イメージ
//
// Topic: "order-events" (3 partitions)
//
// Consumer Group A (order-service):
//   Consumer A-1 ← Partition 0
//   Consumer A-2 ← Partition 1, Partition 2
//   (パーティションが均等に分配される)
//
// Consumer Group B (analytics-service):
//   Consumer B-1 ← Partition 0, Partition 1, Partition 2
//   (全パーティションのメッセージを受信)
//
// → Group AとGroup Bは独立して全メッセージを消費

// Java Producer API の基本
Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer",
    "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer",
    "org.apache.kafka.common.serialization.StringSerializer");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// 非同期送信（コールバック付き）
producer.send(
    new ProducerRecord<>("order-events", "key-1", "message-body"),
    (metadata, exception) -> {
        if (exception != null) {
            log.error("送信失敗", exception);
        } else {
            log.info("送信成功: topic={}, partition={}, offset={}",
                metadata.topic(), metadata.partition(), metadata.offset());
        }
    }
);

// Java Consumer API の基本
Properties cProps = new Properties();
cProps.put("bootstrap.servers", "localhost:9092");
cProps.put("group.id", "order-service");
cProps.put("key.deserializer",
    "org.apache.kafka.common.serialization.StringDeserializer");
cProps.put("value.deserializer",
    "org.apache.kafka.common.serialization.StringDeserializer");
cProps.put("auto.offset.reset", "earliest");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(cProps);
consumer.subscribe(List.of("order-events"));

while (true) {
    ConsumerRecords<String, String> records =
        consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        log.info("受信: key={}, value={}, partition={}, offset={}",
            record.key(), record.value(),
            record.partition(), record.offset());
    }
}`,
      },
      {
        title: "Dockerでの環境構築",
        content:
          "Kafka開発環境はDockerで簡単に構築できます。Kafkaは従来ZooKeeperに依存していましたが、Kafka 3.3以降はKRaft（Kafka Raft）モードでZooKeeperなしの構成が可能です。ここではKRaftモードでの構築方法と、UIツールのkafka-uiを含めた構成を紹介します。docker-compose.ymlを使うことで、ブローカー、kafka-ui、必要に応じてSchema Registryなどをまとめて起動できます。kafka-uiはブラウザからトピック、コンシューマーグループ、メッセージの確認ができる便利なツールです。",
        code: `# docker-compose.yml - Kafka KRaftモード + kafka-ui
version: '3.8'
services:
  kafka:
    image: confluentinc/cp-kafka:7.6.0
    hostname: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: >
        CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,HOST:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: >
        PLAINTEXT://kafka:29092,HOST://localhost:9092
      KAFKA_LISTENERS: >
        PLAINTEXT://0.0.0.0:29092,CONTROLLER://0.0.0.0:29093,HOST://0.0.0.0:9092
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:29093
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      CLUSTER_ID: 'MkU3OEVBNTcwNTJENDM2Qk'
    volumes:
      - kafka-data:/var/lib/kafka/data

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    ports:
      - "8080:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:29092
    depends_on:
      - kafka

volumes:
  kafka-data:

# 起動コマンド
# $ docker compose up -d
# $ docker compose ps
# kafka-ui: http://localhost:8080 で管理画面にアクセス`,
      },
      {
        title: "kafka-console-producer と consumer",
        content:
          "KafkaにはCLIツールが付属しており、開発やデバッグに重宝します。kafka-console-producerでメッセージの送信、kafka-console-consumerで受信テストができます。Docker環境ではコンテナ内でコマンドを実行します。キー付きメッセージの送信、特定パーティションからの読み取り、オフセット指定での読み取りなどが可能です。これらのCLIツールを使いこなすことで、トラブルシューティングやメッセージのフロー確認が効率的に行えます。",
        code: `# Dockerコンテナ内でKafka CLIを使用

# トピック作成
docker exec -it kafka kafka-topics.sh \\
  --create \\
  --bootstrap-server localhost:9092 \\
  --topic test-topic \\
  --partitions 3 \\
  --replication-factor 1

# --- Producer（メッセージ送信） ---

# シンプルな送信（値のみ）
docker exec -it kafka kafka-console-producer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic test-topic
# > Hello Kafka
# > This is a test message

# キー付きメッセージの送信
docker exec -it kafka kafka-console-producer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic test-topic \\
  --property "parse.key=true" \\
  --property "key.separator=:"
# > user-1:{"name":"Taro","action":"login"}
# > user-2:{"name":"Hanako","action":"purchase"}

# --- Consumer（メッセージ受信） ---

# 最初から全メッセージを読む
docker exec -it kafka kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic test-topic \\
  --from-beginning

# キーとタイムスタンプも表示
docker exec -it kafka kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic test-topic \\
  --from-beginning \\
  --property "print.key=true" \\
  --property "print.timestamp=true"

# Consumer Group指定で消費
docker exec -it kafka kafka-console-consumer.sh \\
  --bootstrap-server localhost:9092 \\
  --topic test-topic \\
  --group my-test-group

# Consumer Groupのオフセット確認
docker exec -it kafka kafka-consumer-groups.sh \\
  --bootstrap-server localhost:9092 \\
  --group my-test-group \\
  --describe
# GROUP          TOPIC        PARTITION CURRENT-OFFSET LOG-END-OFFSET LAG
# my-test-group  test-topic   0         5              5              0
# my-test-group  test-topic   1         3              3              0`,
      },
    ],
  },
  {
    id: "spring-kafka",
    title: "Spring Boot + Kafka",
    category: "kafka",
    description:
      "spring-kafka依存関係と設定、@KafkaListener、KafkaTemplate、エラーハンドリングとDLT(Dead Letter Topic)",
    sections: [
      {
        title: "spring-kafka 依存関係と設定",
        content:
          "Spring BootでKafkaを使うには、spring-kafkaスターターを依存関係に追加します。Spring Bootの自動設定により、application.ymlで基本的な接続情報やシリアライザ/デシリアライザを設定するだけでKafkaTemplate や @KafkaListener が使えるようになります。JSONメッセージを扱う場合はJsonSerializer/JsonDeserializerを指定し、信頼するパッケージの設定が必要です。プロデューサーとコンシューマーの設定は個別にカスタマイズでき、複数のKafkaクラスタへの接続もサポートされています。",
        code: `<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka</artifactId>
</dependency>
<!-- テスト用 -->
<dependency>
    <groupId>org.springframework.kafka</groupId>
    <artifactId>spring-kafka-test</artifactId>
    <scope>test</scope>
</dependency>

# application.yml
spring:
  kafka:
    bootstrap-servers: localhost:9092

    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
      # べき等プロデューサーの有効化
      properties:
        enable.idempotence: true
      acks: all  # 全レプリカの書き込み確認

    consumer:
      group-id: my-service
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.springframework.kafka.support.serializer.JsonDeserializer
      properties:
        spring.json.trusted.packages: "com.example.event.*"
      # 手動コミット
      enable-auto-commit: false

    listener:
      ack-mode: RECORD  # メッセージ単位でコミット
      concurrency: 3    # コンシューマースレッド数`,
      },
      {
        title: "@KafkaListener によるメッセージ受信",
        content:
          "@KafkaListenerアノテーションを使うと、メソッド単位でKafkaトピックのリスナーを定義できます。トピック名、コンシューマーグループ、パーティション指定など柔軟な設定が可能です。メソッド引数にはメッセージのペイロードだけでなく、ConsumerRecord全体やヘッダー情報も受け取れます。フィルター機能を使えば特定条件のメッセージだけを処理でき、バッチリスナーとして複数メッセージをまとめて処理することもできます。手動ACKを使えばメッセージ処理の完了タイミングを細かく制御できます。",
        code: `// 基本的な @KafkaListener の使い方

@Component
@Slf4j
public class OrderEventConsumer {

    // シンプルなリスナー
    @KafkaListener(topics = "order-events", groupId = "order-service")
    public void handleOrderEvent(OrderEvent event) {
        log.info("注文イベント受信: {}", event.getOrderId());
        orderService.process(event);
    }

    // ConsumerRecordで全メタデータを取得
    @KafkaListener(topics = "order-events", groupId = "audit-service")
    public void handleWithMetadata(
            ConsumerRecord<String, OrderEvent> record) {
        log.info("topic={}, partition={}, offset={}, key={}, value={}",
            record.topic(), record.partition(), record.offset(),
            record.key(), record.value());
    }

    // ヘッダー情報の取得 + 手動ACK
    @KafkaListener(topics = "payment-events", groupId = "payment-service")
    public void handlePayment(
            @Payload PaymentEvent event,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset,
            Acknowledgment ack) {
        try {
            paymentService.process(event);
            ack.acknowledge(); // 処理成功時にコミット
        } catch (Exception e) {
            log.error("処理失敗: partition={}, offset={}", partition, offset);
            // ACKしない → 再配信される
            throw e;
        }
    }

    // バッチリスナー（複数メッセージをまとめて処理）
    @KafkaListener(
        topics = "log-events",
        groupId = "log-batch-service",
        containerFactory = "batchFactory"
    )
    public void handleBatch(List<LogEvent> events) {
        log.info("バッチ受信: {} 件", events.size());
        logRepository.saveAll(
            events.stream().map(LogEntity::from).toList()
        );
    }
}

// バッチリスナー用のファクトリ設定
@Bean
public ConcurrentKafkaListenerContainerFactory<String, LogEvent>
        batchFactory(ConsumerFactory<String, LogEvent> cf) {
    var factory = new ConcurrentKafkaListenerContainerFactory<String, LogEvent>();
    factory.setConsumerFactory(cf);
    factory.setBatchListener(true); // バッチモード有効化
    return factory;
}`,
      },
      {
        title: "KafkaTemplate によるメッセージ送信",
        content:
          "KafkaTemplateはSpring KafkaでメッセージをKafkaトピックに送信するための中心的なクラスです。文字列やJSONオブジェクトの送信、キー指定による特定パーティションへの振り分け、ヘッダーの付与が可能です。send()メソッドはCompletableFutureを返すため、非同期コールバックで送信結果を処理できます。トランザクション対応のKafkaTemplateを使えば、複数の送信操作をアトミックに実行できます。また、ProducerListenerを登録することで送信成功・失敗のグローバルなフック処理も設定できます。",
        code: `@Service
@Slf4j
public class EventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public EventPublisher(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // 基本的な送信
    public void sendSimple(String topic, Object message) {
        kafkaTemplate.send(topic, message);
    }

    // キー指定送信（同じキー → 同じパーティション）
    public void sendWithKey(OrderEvent event) {
        kafkaTemplate.send(
            "order-events",
            event.getUserId().toString(), // key
            event                         // value
        );
    }

    // 非同期送信 + コールバック
    public void sendAsync(OrderEvent event) {
        CompletableFuture<SendResult<String, Object>> future =
            kafkaTemplate.send("order-events", event);

        future.whenComplete((result, ex) -> {
            if (ex != null) {
                log.error("送信失敗: {}", ex.getMessage());
            } else {
                RecordMetadata metadata = result.getRecordMetadata();
                log.info("送信成功: topic={}, partition={}, offset={}",
                    metadata.topic(), metadata.partition(),
                    metadata.offset());
            }
        });
    }

    // ヘッダー付きメッセージ送信
    public void sendWithHeaders(OrderEvent event) {
        ProducerRecord<String, Object> record = new ProducerRecord<>(
            "order-events", event
        );
        record.headers()
            .add("event-type", "ORDER_CREATED".getBytes())
            .add("source", "order-service".getBytes())
            .add("correlation-id",
                UUID.randomUUID().toString().getBytes());

        kafkaTemplate.send(record);
    }

    // トランザクション送信（複数メッセージをアトミックに）
    public void sendTransactional(Order order) {
        kafkaTemplate.executeInTransaction(ops -> {
            ops.send("order-events",
                new OrderCreatedEvent(order));
            ops.send("inventory-commands",
                new ReduceStockCommand(order.getItems()));
            ops.send("notification-commands",
                new SendEmailCommand(order.getUserId()));
            return true;
            // 全メッセージが同一トランザクション内で送信
        });
    }
}`,
      },
      {
        title: "エラーハンドリングと DLT（Dead Letter Topic）",
        content:
          "Spring Kafkaではメッセージ処理のエラーを体系的にハンドリングできます。DefaultErrorHandlerを使ってリトライポリシーとDLT転送を設定し、特定の例外をリトライ対象外にすることも可能です。デシリアライズエラーはErrorHandlingDeserializerでラップして対処します。@DltHandlerアノテーションを使えば、DLTに転送されたメッセージの処理ロジックをリスナークラス内に定義できます。本番環境ではDLTの監視とアラート、定期的な再処理の仕組みが重要です。",
        code: `// 包括的なエラーハンドリング設定

@Configuration
public class KafkaErrorHandlingConfig {

    @Bean
    public DefaultErrorHandler errorHandler(
            KafkaTemplate<String, Object> kafkaTemplate) {

        // DLT転送設定
        DeadLetterPublishingRecoverer recoverer =
            new DeadLetterPublishingRecoverer(kafkaTemplate,
                (record, ex) -> new TopicPartition(
                    record.topic() + ".DLT", -1)); // -1 = ラウンドロビン

        // 指数バックオフでリトライ
        ExponentialBackOff backOff = new ExponentialBackOff(1000L, 2.0);
        backOff.setMaxElapsedTime(30000L);

        DefaultErrorHandler handler =
            new DefaultErrorHandler(recoverer, backOff);

        // リトライ不要な例外
        handler.addNotRetryableExceptions(
            DeserializationException.class,
            ValidationException.class,
            NullPointerException.class
        );

        return handler;
    }

    // デシリアライズエラー対策
    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        Map<String, Object> config = new HashMap<>();
        config.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,
            "localhost:9092");
        config.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,
            ErrorHandlingDeserializer.class);
        config.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,
            ErrorHandlingDeserializer.class);
        config.put(ErrorHandlingDeserializer.VALUE_DESERIALIZER_CLASS,
            JsonDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(config);
    }
}

// @DltHandler を使ったDLT処理
@Component
@Slf4j
public class OrderEventListener {

    @KafkaListener(topics = "order-events", groupId = "order-svc")
    public void handle(OrderEvent event) {
        // メイン処理（失敗時は自動リトライ → DLTへ）
        orderService.process(event);
    }

    @DltHandler
    public void handleDlt(OrderEvent event,
            @Header(KafkaHeaders.DLT_EXCEPTION_MESSAGE) String error,
            @Header(KafkaHeaders.DLT_ORIGINAL_TOPIC) String originalTopic) {
        log.error("DLT受信: event={}, error={}, originalTopic={}",
            event, error, originalTopic);

        // 障害レコードをDBに保存
        failedEventRepository.save(FailedEvent.builder()
            .eventType("ORDER_EVENT")
            .payload(objectMapper.writeValueAsString(event))
            .errorMessage(error)
            .originalTopic(originalTopic)
            .status("PENDING")
            .build());

        // アラート通知
        slackNotifier.alert("DLTメッセージ検出: " + event.getOrderId());
    }
}`,
      },
    ],
  },
  {
    id: "kafka-advanced",
    title: "Kafka応用",
    category: "kafka",
    description:
      "パーティショニング戦略、Kafka Streams入門、Kafka Connect、スキーマレジストリ(Avro)",
    sections: [
      {
        title: "パーティショニング戦略",
        content:
          "パーティショニング戦略はKafkaのスループットとメッセージの順序性に直接影響します。デフォルトではメッセージキーのハッシュ値に基づいてパーティションが決まり、キーがnullの場合はラウンドロビンまたはスティッキーパーティショニングが適用されます。カスタムパーティショナーを実装することで、ビジネスロジックに基づいた振り分けが可能です。注意点として、パーティション数を後から増やすとキーベースのルーティングが崩れるため、初期設計が重要です。ホットパーティション（特定パーティションへの偏り）にも注意が必要です。",
        code: `// カスタムパーティショナーの実装
public class RegionBasedPartitioner implements Partitioner {

    @Override
    public int partition(String topic, Object key, byte[] keyBytes,
                         Object value, byte[] valueBytes, Cluster cluster) {
        List<PartitionInfo> partitions = cluster.partitionsForTopic(topic);
        int numPartitions = partitions.size();

        if (key == null) {
            // キーなし → ラウンドロビン
            return ThreadLocalRandom.current().nextInt(numPartitions);
        }

        String keyStr = (String) key;

        // 地域別にパーティションを固定（順序保証のため）
        if (keyStr.startsWith("JP-")) {
            return 0; // 日本リージョン → パーティション0
        } else if (keyStr.startsWith("US-")) {
            return 1 % numPartitions;
        } else if (keyStr.startsWith("EU-")) {
            return 2 % numPartitions;
        }

        // その他 → キーのハッシュ
        return Math.abs(keyStr.hashCode()) % numPartitions;
    }

    @Override public void configure(Map<String, ?> configs) {}
    @Override public void close() {}
}

// カスタムパーティショナーの設定
// spring:
//   kafka:
//     producer:
//       properties:
//         partitioner.class: com.example.RegionBasedPartitioner

// パーティション数の設計指針
// - 目安: コンシューマーインスタンス数の倍数
// - 少なすぎ → 並列度が低くスループット不足
// - 多すぎ → メタデータ管理コスト増大、リーダー選出の遅延
// - 推奨: 初期6〜12パーティション、負荷に応じて拡張
// - 1パーティションあたり約10MB/sのスループットが目安`,
      },
      {
        title: "Kafka Streams 入門",
        content:
          "Kafka Streamsは、Kafkaに組み込まれたストリーム処理ライブラリです。別途クラスタを必要とせず、通常のJavaアプリケーションとして実行できます。KStream（レコードストリーム）とKTable（変更ログテーブル）という2つの抽象化を提供し、フィルタリング、マッピング、集約、結合などのストリーム処理がDSLで記述できます。ウィンドウ操作により時間ベースの集計（過去5分間の注文数など）も可能です。状態管理はローカルのRocksDBで行われ、変更ログトピックを通じて障害復旧もサポートされます。",
        code: `// Kafka Streams の基本的な使い方

// 依存関係
// <dependency>
//     <groupId>org.apache.kafka</groupId>
//     <artifactId>kafka-streams</artifactId>
// </dependency>

@Configuration
@EnableKafkaStreams
public class KafkaStreamsConfig {

    @Bean(name = KafkaStreamsDefaultConfiguration
        .DEFAULT_STREAMS_CONFIG_BEAN_NAME)
    public KafkaStreamsConfiguration kStreamsConfig() {
        Map<String, Object> props = new HashMap<>();
        props.put(StreamsConfig.APPLICATION_ID_CONFIG,
            "order-analytics-app");
        props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG,
            "localhost:9092");
        props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG,
            Serdes.StringSerde.class);
        props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG,
            Serdes.StringSerde.class);
        return new KafkaStreamsConfiguration(props);
    }
}

@Component
public class OrderStreamProcessor {

    @Bean
    public KStream<String, OrderEvent> orderStream(
            StreamsBuilder builder) {

        // 注文イベントストリームの定義
        KStream<String, OrderEvent> orders = builder.stream(
            "order-events",
            Consumed.with(Serdes.String(), orderEventSerde)
        );

        // 1. フィルタリング: 高額注文だけ抽出
        KStream<String, OrderEvent> highValueOrders = orders
            .filter((key, order) ->
                order.getTotal().compareTo(new BigDecimal("10000")) > 0);

        highValueOrders.to("high-value-orders");

        // 2. カテゴリ別売上の集計（5分ウィンドウ）
        orders
            .groupBy((key, order) -> order.getCategory())
            .windowedBy(TimeWindows.ofSizeWithNoGrace(
                Duration.ofMinutes(5)))
            .aggregate(
                () -> BigDecimal.ZERO,
                (category, order, total) -> total.add(order.getTotal()),
                Materialized.with(Serdes.String(), bigDecimalSerde)
            )
            .toStream()
            .map((windowedKey, total) -> KeyValue.pair(
                windowedKey.key(),
                new CategorySales(windowedKey.key(), total,
                    windowedKey.window().startTime())
            ))
            .to("category-sales");

        return orders;
    }
}`,
      },
      {
        title: "Kafka Connect",
        content:
          "Kafka Connectは、外部システムとKafka間のデータ連携を行うフレームワークです。Source Connectorは外部システム（DB、ファイル、API）からKafkaにデータを取り込み、Sink ConnectorはKafkaから外部システムにデータを書き出します。コードを書かずに設定ファイルだけでデータパイプラインを構築できるのが大きな利点です。Debeziumのようなコネクタを使えば、DBの変更データキャプチャ（CDC）をリアルタイムで実現できます。コネクタはREST APIで管理・監視が可能です。",
        code: `# Kafka Connect + Debezium（PostgreSQL CDC）の構成

# docker-compose.yml に追加
# services:
#   kafka-connect:
#     image: confluentinc/cp-kafka-connect:7.6.0
#     ports:
#       - "8083:8083"
#     environment:
#       CONNECT_BOOTSTRAP_SERVERS: kafka:29092
#       CONNECT_REST_PORT: 8083
#       CONNECT_GROUP_ID: connect-cluster
#       CONNECT_CONFIG_STORAGE_TOPIC: connect-configs
#       CONNECT_OFFSET_STORAGE_TOPIC: connect-offsets
#       CONNECT_STATUS_STORAGE_TOPIC: connect-status
#       CONNECT_CONFIG_STORAGE_REPLICATION_FACTOR: 1
#       CONNECT_OFFSET_STORAGE_REPLICATION_FACTOR: 1
#       CONNECT_STATUS_STORAGE_REPLICATION_FACTOR: 1
#       CONNECT_KEY_CONVERTER: org.apache.kafka.connect.json.JsonConverter
#       CONNECT_VALUE_CONVERTER: org.apache.kafka.connect.json.JsonConverter
#       CONNECT_PLUGIN_PATH: /usr/share/java,/usr/share/confluent-hub-components

# Debezium PostgreSQL Source Connector の登録（REST API）
# curl -X POST http://localhost:8083/connectors \\
#   -H "Content-Type: application/json" \\
#   -d '{
#     "name": "postgres-source",
#     "config": {
#       "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
#       "database.hostname": "postgres",
#       "database.port": "5432",
#       "database.user": "postgres",
#       "database.password": "postgres",
#       "database.dbname": "orders_db",
#       "topic.prefix": "cdc",
#       "table.include.list": "public.orders,public.order_items",
#       "plugin.name": "pgoutput",
#       "slot.name": "debezium_slot"
#     }
#   }'

# JDBC Sink Connector（KafkaからDBへ書き込み）
# curl -X POST http://localhost:8083/connectors \\
#   -H "Content-Type: application/json" \\
#   -d '{
#     "name": "analytics-sink",
#     "config": {
#       "connector.class": "io.confluent.connect.jdbc.JdbcSinkConnector",
#       "connection.url": "jdbc:postgresql://analytics-db:5432/analytics",
#       "connection.user": "postgres",
#       "connection.password": "postgres",
#       "topics": "order-events",
#       "auto.create": "true",
#       "insert.mode": "upsert",
#       "pk.fields": "order_id",
#       "pk.mode": "record_value"
#     }
#   }'

# コネクタの管理コマンド
# 一覧取得:  curl http://localhost:8083/connectors
# 状態確認:  curl http://localhost:8083/connectors/postgres-source/status
# 一時停止:  curl -X PUT http://localhost:8083/connectors/postgres-source/pause
# 再開:      curl -X PUT http://localhost:8083/connectors/postgres-source/resume
# 削除:      curl -X DELETE http://localhost:8083/connectors/postgres-source`,
      },
      {
        title: "スキーマレジストリ（Avro）",
        content:
          "スキーマレジストリはメッセージのスキーマを一元管理するサービスです。Confluent Schema Registryが広く使われており、Avro、JSON Schema、Protobufのスキーマをサポートします。プロデューサーはメッセージ送信時にスキーマを登録し、コンシューマーはスキーマIDを元にデシリアライズします。スキーマの互換性チェック（BACKWARD、FORWARD、FULL）により、スキーマ進化時の安全性が担保されます。AvroはコンパクトなバイナリフォーマットでJSONより効率的で、スキーマ進化に強い特徴があります。",
        code: `# Schema Registry を docker-compose.yml に追加
# schema-registry:
#   image: confluentinc/cp-schema-registry:7.6.0
#   ports:
#     - "8081:8081"
#   environment:
#     SCHEMA_REGISTRY_HOST_NAME: schema-registry
#     SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS: kafka:29092

# Avroスキーマ定義（src/main/avro/order_event.avsc）
# {
#   "type": "record",
#   "name": "OrderEvent",
#   "namespace": "com.example.avro",
#   "fields": [
#     {"name": "orderId", "type": "long"},
#     {"name": "userId", "type": "long"},
#     {"name": "totalAmount", "type": "double"},
#     {"name": "status", "type": {
#       "type": "enum",
#       "name": "OrderStatus",
#       "symbols": ["CREATED", "CONFIRMED", "SHIPPED", "DELIVERED"]
#     }},
#     {"name": "createdAt", "type": "string"},
#     {"name": "note", "type": ["null", "string"], "default": null}
#   ]
# }

<!-- pom.xml: Avro + Schema Registry 依存関係 -->
<!--
<dependency>
    <groupId>io.confluent</groupId>
    <artifactId>kafka-avro-serializer</artifactId>
    <version>7.6.0</version>
</dependency>
<dependency>
    <groupId>org.apache.avro</groupId>
    <artifactId>avro</artifactId>
    <version>1.11.3</version>
</dependency>
-->

# application.yml（Avro + Schema Registry設定）
# spring:
#   kafka:
#     properties:
#       schema.registry.url: http://localhost:8081
#     producer:
#       key-serializer: org.apache.kafka.common.serialization.StringSerializer
#       value-serializer: io.confluent.kafka.serializers.KafkaAvroSerializer
#     consumer:
#       key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
#       value-deserializer: io.confluent.kafka.serializers.KafkaAvroDeserializer
#       properties:
#         specific.avro.reader: true

// Avroを使った送受信
@Service
public class AvroOrderPublisher {
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public void publish(Order order) {
        // Avro生成クラスを使用
        OrderEvent event = OrderEvent.newBuilder()
            .setOrderId(order.getId())
            .setUserId(order.getUserId())
            .setTotalAmount(order.getTotal().doubleValue())
            .setStatus(OrderStatus.CREATED)
            .setCreatedAt(Instant.now().toString())
            .setNote(order.getNote()) // nullableフィールド
            .build();

        kafkaTemplate.send("order-events-avro", event);
    }
}

// Schema Registry REST API
// スキーマ登録:     POST /subjects/order-events-value/versions
// スキーマ取得:     GET /subjects/order-events-value/versions/latest
// 互換性チェック:   POST /compatibility/subjects/order-events-value/versions/latest`,
      },
    ],
  },

  // ===== RabbitMQ =====
  {
    id: "rabbitmq-basics",
    title: "RabbitMQの基礎",
    category: "rabbitmq",
    description:
      "Exchange/Queue/Bindingの概念、Exchange種類(Direct/Topic/Fanout/Headers)、Docker環境構築と管理画面、rabbitmqctlコマンド",
    sections: [
      {
        title: "Exchange / Queue / Binding の概念",
        content:
          "RabbitMQはAMQP（Advanced Message Queuing Protocol）ベースのメッセージブローカーです。メッセージの流れは Producer → Exchange → Queue → Consumer です。Exchangeはメッセージのルーティング役で、受け取ったメッセージをルーティングキーとBindingルールに基づいて適切なQueueに振り分けます。Queueはメッセージを格納するバッファで、コンシューマーがメッセージを取り出すまで保持します。Bindingは ExchangeとQueueを紐付けるルールで、ルーティングキーのパターンやヘッダー条件を指定できます。この分離により柔軟なメッセージルーティングが実現されます。",
        code: `// RabbitMQのメッセージフロー概念図
//
// Producer → Exchange ──Binding──→ Queue → Consumer
//                      (routing key)
//
//                    ┌──binding(key="order.created")──→ [order-queue] → Consumer A
// Producer ──→ Exchange ──binding(key="order.*")──→ [audit-queue]  → Consumer B
//                    └──binding(key="payment.*")──→ [pay-queue]    → Consumer C

// Spring AMQPでの Exchange / Queue / Binding 定義
@Configuration
public class RabbitMQConfig {

    // Exchange定義
    @Bean
    public TopicExchange orderExchange() {
        return new TopicExchange("order-exchange");
    }

    // Queue定義
    @Bean
    public Queue orderQueue() {
        return QueueBuilder.durable("order-queue")
            .withArgument("x-message-ttl", 86400000)  // TTL: 24時間
            .withArgument("x-dead-letter-exchange", "dlx-exchange")
            .withArgument("x-dead-letter-routing-key", "order.dead")
            .build();
    }

    @Bean
    public Queue auditQueue() {
        return QueueBuilder.durable("audit-queue").build();
    }

    // Binding定義（ExchangeとQueueの紐付け）
    @Bean
    public Binding orderBinding(Queue orderQueue,
                                TopicExchange orderExchange) {
        return BindingBuilder.bind(orderQueue)
            .to(orderExchange)
            .with("order.created"); // 完全一致
    }

    @Bean
    public Binding auditBinding(Queue auditQueue,
                                TopicExchange orderExchange) {
        return BindingBuilder.bind(auditQueue)
            .to(orderExchange)
            .with("order.#"); // order.で始まる全てにマッチ
    }
}`,
      },
      {
        title: "Exchange の種類（Direct / Topic / Fanout / Headers）",
        content:
          "RabbitMQには4種類のExchangeがあります。Direct Exchangeはルーティングキーの完全一致でメッセージを振り分けます。Topic Exchangeはワイルドカード（*: 1語一致、#: 0語以上一致）を使ったパターンマッチングが可能です。Fanout Exchangeはルーティングキーを無視し、バインドされた全てのキューにメッセージをブロードキャストします。Headers Exchangeはメッセージヘッダーの値に基づいてルーティングします。用途に応じて適切なExchangeタイプを選択することが重要です。最も汎用的なのはTopic Exchangeです。",
        code: `// 4種類のExchangeの設定と使い分け

@Configuration
public class ExchangeConfig {

    // === 1. Direct Exchange（完全一致ルーティング） ===
    // ユースケース: 特定のサービスにメッセージを直接送信
    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange("direct-exchange");
    }

    @Bean
    public Binding emailBinding() {
        return BindingBuilder
            .bind(emailQueue())
            .to(directExchange())
            .with("notification.email"); // 完全一致
    }

    @Bean
    public Binding smsBinding() {
        return BindingBuilder
            .bind(smsQueue())
            .to(directExchange())
            .with("notification.sms");
    }

    // === 2. Topic Exchange（パターンマッチ） ===
    // ユースケース: 柔軟なルーティング（推奨）
    @Bean
    public TopicExchange topicExchange() {
        return new TopicExchange("topic-exchange");
    }

    // "order.created" → マッチ
    // "order.updated" → マッチ
    // "order.item.added" → マッチしない（* は1語のみ）
    @Bean
    public Binding topicBinding1() {
        return BindingBuilder.bind(orderQueue())
            .to(topicExchange()).with("order.*");
    }

    // "order.created" → マッチ
    // "order.item.added" → マッチ（# は0語以上）
    @Bean
    public Binding topicBinding2() {
        return BindingBuilder.bind(auditQueue())
            .to(topicExchange()).with("order.#");
    }

    // === 3. Fanout Exchange（ブロードキャスト） ===
    // ユースケース: 全コンシューマーに通知
    @Bean
    public FanoutExchange fanoutExchange() {
        return new FanoutExchange("fanout-exchange");
    }

    @Bean
    public Binding fanoutBinding1() {
        // ルーティングキー不要 → 全キューに配信
        return BindingBuilder.bind(serviceAQueue())
            .to(fanoutExchange());
    }

    // === 4. Headers Exchange（ヘッダーベース） ===
    // ユースケース: 複数条件でのルーティング
    @Bean
    public HeadersExchange headersExchange() {
        return new HeadersExchange("headers-exchange");
    }

    @Bean
    public Binding headersBinding() {
        return BindingBuilder.bind(premiumQueue())
            .to(headersExchange())
            .whereAll(Map.of(
                "type", "order",
                "priority", "high"
            )).match(); // 全ヘッダー一致で配信
    }
}`,
      },
      {
        title: "Docker環境構築と管理画面",
        content:
          "RabbitMQの開発環境はDockerで簡単に構築できます。management タグのイメージを使えば、ポート15672でWeb管理画面（Management UI）にアクセスできます。管理画面ではExchange、Queue、Binding、接続、チャネルの確認・作成・削除が可能で、メッセージのPublishや取得も行えます。またメッセージレートやメモリ使用量のリアルタイム監視も提供しています。本番環境では適切なユーザー管理とVirtual Hostの設定が重要です。",
        code: `# docker-compose.yml - RabbitMQ + Management UI
version: '3.8'
services:
  rabbitmq:
    image: rabbitmq:3.13-management
    hostname: rabbitmq
    ports:
      - "5672:5672"    # AMQP
      - "15672:15672"  # Management UI
    environment:
      RABBITMQ_DEFAULT_USER: admin
      RABBITMQ_DEFAULT_PASS: admin123
      RABBITMQ_DEFAULT_VHOST: /
    volumes:
      - rabbitmq-data:/var/lib/rabbitmq
      - ./rabbitmq/rabbitmq.conf:/etc/rabbitmq/rabbitmq.conf
      - ./rabbitmq/definitions.json:/etc/rabbitmq/definitions.json

volumes:
  rabbitmq-data:

# rabbitmq.conf（設定ファイル）
# management.load_definitions = /etc/rabbitmq/definitions.json
# vm_memory_high_watermark.relative = 0.7
# disk_free_limit.absolute = 1GB

# 起動
# $ docker compose up -d
# 管理画面: http://localhost:15672
# ユーザー: admin / admin123

# 管理画面の主要機能:
# - Overview:    ノード情報、メッセージレート、接続数
# - Connections: クライアント接続の一覧と詳細
# - Channels:    チャネルの一覧（メッセージレート含む）
# - Exchanges:   Exchange一覧の確認・作成・削除
# - Queues:      Queue一覧、メッセージ数、コンシューマー数
#                メッセージの手動Publish/Get も可能
# - Admin:       ユーザー管理、Virtual Host管理、ポリシー設定`,
      },
      {
        title: "rabbitmqctl コマンド",
        content:
          "rabbitmqctlはRabbitMQの管理コマンドラインツールです。ノードの状態確認、ユーザー管理、Virtual Host管理、キューの確認・削除などが可能です。Docker環境ではコンテナ内でコマンドを実行します。rabbitmq-diagnosticsコマンドでヘルスチェックやメモリ使用量の確認もできます。運用時にはrabbitmqctlを使ったスクリプトによる自動監視や、キューの滞留メッセージ数に応じたアラート設定が重要です。",
        code: `# rabbitmqctl コマンド集（Docker環境）

# --- ノード状態の確認 ---
docker exec rabbitmq rabbitmqctl status
docker exec rabbitmq rabbitmqctl cluster_status

# --- ユーザー管理 ---
# ユーザー一覧
docker exec rabbitmq rabbitmqctl list_users

# ユーザー追加
docker exec rabbitmq rabbitmqctl add_user app_user app_pass

# 権限設定（Virtual Host "/" に対してフルアクセス）
docker exec rabbitmq rabbitmqctl set_permissions \\
  -p / app_user ".*" ".*" ".*"

# 管理者タグ付与
docker exec rabbitmq rabbitmqctl set_user_tags app_user administrator

# --- Queue管理 ---
# Queue一覧（メッセージ数付き）
docker exec rabbitmq rabbitmqctl list_queues \\
  name messages consumers state

# Queue詳細
docker exec rabbitmq rabbitmqctl list_queues \\
  name messages messages_ready messages_unacknowledged \\
  memory consumers

# Queueの削除
docker exec rabbitmq rabbitmqctl delete_queue order-queue

# Queueのパージ（メッセージ全削除）
docker exec rabbitmq rabbitmqctl purge_queue order-queue

# --- Exchange / Binding 確認 ---
docker exec rabbitmq rabbitmqctl list_exchanges name type
docker exec rabbitmq rabbitmqctl list_bindings \\
  source_name destination_name routing_key

# --- 接続・チャネル確認 ---
docker exec rabbitmq rabbitmqctl list_connections \\
  user peer_host peer_port state
docker exec rabbitmq rabbitmqctl list_channels \\
  connection_details consumer_count messages_unacknowledged

# --- ヘルスチェック ---
docker exec rabbitmq rabbitmq-diagnostics check_running
docker exec rabbitmq rabbitmq-diagnostics check_port_connectivity
docker exec rabbitmq rabbitmq-diagnostics memory_breakdown`,
      },
    ],
  },
  {
    id: "spring-amqp",
    title: "Spring Boot + RabbitMQ",
    category: "rabbitmq",
    description:
      "spring-boot-starter-amqp設定、@RabbitListener、RabbitTemplate、メッセージ変換(Jackson2JsonMessageConverter)",
    sections: [
      {
        title: "spring-boot-starter-amqp の設定",
        content:
          "Spring BootでRabbitMQを使うには、spring-boot-starter-amqpを依存関係に追加します。application.ymlでRabbitMQの接続情報を設定すれば、RabbitTemplateやRabbitListenerContainerFactoryが自動設定されます。ConnectionFactoryはデフォルトでCachingConnectionFactoryが使われ、接続プールが管理されます。再接続の自動リトライ、チャネルキャッシュサイズ、確認応答モードなど、本番環境に必要な設定も柔軟にカスタマイズできます。",
        code: `<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
<!-- テスト用 -->
<dependency>
    <groupId>org.springframework.amqp</groupId>
    <artifactId>spring-rabbit-test</artifactId>
    <scope>test</scope>
</dependency>

# application.yml
spring:
  rabbitmq:
    host: localhost
    port: 5672
    username: admin
    password: admin123
    virtual-host: /

    # Publisher Confirms（送信確認）
    publisher-confirm-type: correlated
    publisher-returns: true

    # コンシューマー設定
    listener:
      simple:
        acknowledge-mode: manual    # 手動ACK
        prefetch: 10                # プリフェッチ数
        concurrency: 3              # 最小コンシューマー数
        max-concurrency: 10         # 最大コンシューマー数
        retry:
          enabled: true
          initial-interval: 1000    # 初回リトライ間隔
          max-attempts: 3           # 最大リトライ回数
          multiplier: 2.0           # バックオフ倍率
          max-interval: 10000       # 最大リトライ間隔

    # 接続リカバリ
    connection-timeout: 5000
    cache:
      channel:
        size: 25                    # チャネルキャッシュサイズ

# Queue/Exchange/Bindingの設定（@Configurationで定義）
@Configuration
public class RabbitConfig {
    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            Jackson2JsonMessageConverter converter) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(converter);
        return template;
    }
}`,
      },
      {
        title: "@RabbitListener によるメッセージ受信",
        content:
          "@RabbitListenerアノテーションはRabbitMQキューからのメッセージ受信を宣言的に定義します。メソッドの引数にはメッセージのペイロード、ヘッダー、Channel、Messageオブジェクトなどを受け取れます。手動ACKモードでは Channel.basicAck()で処理成功を通知し、basicNack()やbasicReject()で再キューイングや破棄を制御します。@RabbitListenerでQueue、Exchange、Bindingの自動宣言も可能で、アプリケーション起動時にRabbitMQ上にリソースが自動作成されます。",
        code: `@Component
@Slf4j
public class OrderMessageConsumer {

    // シンプルなリスナー
    @RabbitListener(queues = "order-queue")
    public void handleOrder(OrderMessage message) {
        log.info("注文メッセージ受信: {}", message.getOrderId());
        orderService.process(message);
    }

    // 手動ACK付きリスナー
    @RabbitListener(queues = "payment-queue")
    public void handlePayment(
            OrderMessage message,
            Channel channel,
            @Header(AmqpHeaders.DELIVERY_TAG) long deliveryTag)
            throws IOException {
        try {
            paymentService.process(message);
            // 処理成功 → ACK
            channel.basicAck(deliveryTag, false);
        } catch (RetryableException e) {
            // 再試行可能 → NACK（requeue = true）
            channel.basicNack(deliveryTag, false, true);
        } catch (Exception e) {
            // 致命的エラー → REJECT（requeue = false → DLQへ）
            channel.basicReject(deliveryTag, false);
        }
    }

    // Queue/Exchange/Bindingの自動宣言付きリスナー
    @RabbitListener(bindings = @QueueBinding(
        value = @Queue(
            value = "notification-queue",
            durable = "true",
            arguments = {
                @Argument(name = "x-dead-letter-exchange",
                          value = "dlx-exchange"),
                @Argument(name = "x-message-ttl",
                          value = "60000", type = "java.lang.Integer")
            }
        ),
        exchange = @Exchange(
            value = "notification-exchange",
            type = ExchangeTypes.TOPIC
        ),
        key = "notification.#"
    ))
    public void handleNotification(NotificationMessage message) {
        log.info("通知受信: type={}, to={}",
            message.getType(), message.getRecipient());
        notificationService.send(message);
    }

    // メッセージ全体を受け取る
    @RabbitListener(queues = "audit-queue")
    public void handleAudit(Message message) {
        String body = new String(message.getBody());
        Map<String, Object> headers = message.getMessageProperties()
            .getHeaders();
        log.info("監査ログ: body={}, headers={}", body, headers);
    }
}`,
      },
      {
        title: "RabbitTemplate によるメッセージ送信",
        content:
          "RabbitTemplateはSpring AMQPでメッセージをRabbitMQに送信するための中心的なクラスです。convertAndSend()でオブジェクトを自動的にシリアライズして送信でき、Exchange名とルーティングキーを指定してルーティングを制御します。メッセージプロパティ（ヘッダー、優先度、TTL、相関IDなど）のカスタマイズも可能です。Publisher Confirmsを有効にすれば、ブローカーがメッセージを受け取ったことの確認応答を受けられます。同期的なRPC（リクエスト/リプライ）パターンもsendAndReceive()で実現できます。",
        code: `@Service
@Slf4j
public class OrderMessagePublisher {

    private final RabbitTemplate rabbitTemplate;

    public OrderMessagePublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    // 基本的な送信（Exchange + RoutingKey）
    public void sendOrderCreated(OrderMessage message) {
        rabbitTemplate.convertAndSend(
            "order-exchange",      // Exchange名
            "order.created",       // ルーティングキー
            message
        );
    }

    // メッセージプロパティのカスタマイズ
    public void sendWithProperties(OrderMessage message) {
        rabbitTemplate.convertAndSend(
            "order-exchange",
            "order.created",
            message,
            msg -> {
                MessageProperties props = msg.getMessageProperties();
                props.setHeader("event-type", "ORDER_CREATED");
                props.setCorrelationId(
                    UUID.randomUUID().toString());
                props.setPriority(
                    message.isPremium() ? 10 : 1);
                props.setExpiration("86400000"); // TTL: 24時間
                props.setContentType("application/json");
                return msg;
            }
        );
    }

    // Publisher Confirms（送信確認）
    public void sendWithConfirm(OrderMessage message) {
        CorrelationData correlationData =
            new CorrelationData(UUID.randomUUID().toString());

        rabbitTemplate.convertAndSend(
            "order-exchange", "order.created",
            message, correlationData);

        // 確認結果を非同期で取得
        correlationData.getFuture().whenComplete((confirm, ex) -> {
            if (ex != null) {
                log.error("送信エラー: {}", ex.getMessage());
            } else if (confirm.isAck()) {
                log.info("ブローカー受信確認: OK");
            } else {
                log.warn("ブローカー受信拒否: {}",
                    confirm.getReason());
            }
        });
    }

    // RPC パターン（同期リクエスト/リプライ）
    public PaymentResult requestPayment(PaymentRequest request) {
        Object response = rabbitTemplate.convertSendAndReceive(
            "payment-exchange",
            "payment.process",
            request
        );
        return (PaymentResult) response;
    }

    // キューに直接送信（デフォルトExchange使用）
    public void sendDirect(OrderMessage message) {
        rabbitTemplate.convertAndSend("order-queue", message);
    }
}`,
      },
      {
        title: "メッセージ変換（Jackson2JsonMessageConverter）",
        content:
          "RabbitMQのメッセージは本来byte[]ですが、Spring AMQPのMessageConverterを使えば、JavaオブジェクトとJSONの相互変換を透過的に行えます。Jackson2JsonMessageConverterはJacksonベースのJSON変換器で、送信時にオブジェクトをJSON化し、受信時にJSONからオブジェクトに復元します。型情報はメッセージヘッダー（__TypeId__）に格納されます。異なるサービス間でクラスパスが異なる場合は、ClassMapperでマッピングを定義します。ContentTypeDelegatingMessageConverterを使えば、Content-Typeに応じて変換器を切り替えることも可能です。",
        code: `// メッセージ変換の設定

@Configuration
public class MessageConverterConfig {

    // 基本的なJSON変換器
    @Bean
    public Jackson2JsonMessageConverter jsonMessageConverter() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return new Jackson2JsonMessageConverter(mapper);
    }

    // 異なるサービス間でのクラスマッピング
    @Bean
    public Jackson2JsonMessageConverter mappedConverter() {
        Jackson2JsonMessageConverter converter =
            new Jackson2JsonMessageConverter();

        DefaultClassMapper classMapper = new DefaultClassMapper();
        // 送信側と受信側でクラス名が異なる場合のマッピング
        Map<String, Class<?>> idClassMapping = Map.of(
            "orderEvent", OrderEvent.class,
            "paymentEvent", PaymentEvent.class,
            "notificationEvent", NotificationEvent.class
        );
        classMapper.setIdClassMapping(idClassMapping);
        converter.setClassMapper(classMapper);

        return converter;
    }

    // Content-Typeに応じた変換器の切り替え
    @Bean
    public ContentTypeDelegatingMessageConverter
            delegatingConverter() {
        ContentTypeDelegatingMessageConverter converter =
            new ContentTypeDelegatingMessageConverter();
        converter.addDelegate("application/json",
            jsonMessageConverter());
        converter.addDelegate("application/xml",
            new SimpleMessageConverter()); // バイト列として扱う
        return converter;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }

    // リスナーファクトリにも変換器を設定
    @Bean
    public SimpleRabbitListenerContainerFactory
            rabbitListenerContainerFactory(
                ConnectionFactory connectionFactory) {
        SimpleRabbitListenerContainerFactory factory =
            new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(jsonMessageConverter());
        factory.setAcknowledgeMode(AcknowledgeMode.MANUAL);
        factory.setPrefetchCount(10);
        return factory;
    }
}

// 送受信での動作
// 送信時: OrderEvent → {"orderId":1,"status":"CREATED",...}
//         ヘッダー: __TypeId__=orderEvent, content_type=application/json
// 受信時: JSON → OrderEvent（ClassMapperで型を解決）`,
      },
    ],
  },
  {
    id: "comparison",
    title: "Kafka vs RabbitMQ",
    category: "concepts",
    description:
      "アーキテクチャの違い、ユースケース別の選び方、パフォーマンス特性比較、移行と共存パターン",
    sections: [
      {
        title: "アーキテクチャの違い",
        content:
          "KafkaとRabbitMQは根本的に異なるアーキテクチャを持っています。Kafkaは分散ログシステムで、メッセージは追記専用のログ（パーティション）に永続化され、コンシューマーがオフセットを管理して読み取ります。メッセージは消費後も保持期間中は残ります。一方、RabbitMQは従来型のメッセージブローカーで、Exchangeがメッセージをルーティングし、Queueに格納されたメッセージはコンシューマーがACKすると削除されます。Kafkaはプル型（コンシューマーが能動的に取得）、RabbitMQはプッシュ型（ブローカーがコンシューマーに配信）が基本です。",
        code: `// アーキテクチャの比較図
//
// === Kafka（分散コミットログ） ===
//
// Producer → [Partition 0: msg0|msg1|msg2|msg3|msg4] ← Consumer (offset=3)
//            [Partition 1: msg0|msg1|msg2]           ← Consumer (offset=2)
//            [Partition 2: msg0|msg1|msg2|msg3]      ← Consumer (offset=1)
//
// 特徴:
// - メッセージは追記のみ（immutable log）
// - 消費後もretention期間中は保持
// - コンシューマーがオフセットを管理（プル型）
// - パーティション単位で並列処理
// - コンシューマーグループで負荷分散
//
// === RabbitMQ（メッセージブローカー） ===
//
// Producer → Exchange ──routing──→ Queue ──push──→ Consumer
//                                   ↓ ACK
//                               メッセージ削除
//
// 特徴:
// - Exchange がルーティングロジックを担当
// - ACK後にメッセージ削除（スマートブローカー）
// - ブローカーがコンシューマーに配信（プッシュ型）
// - 柔軟なルーティング（Direct/Topic/Fanout/Headers）
// - メッセージの優先度キューサポート

// 主要な違いのまとめ
// | 観点           | Kafka              | RabbitMQ           |
// |---------------|--------------------|--------------------|
// | モデル         | 分散ログ            | メッセージブローカー  |
// | 消費モデル     | プル型              | プッシュ型           |
// | メッセージ保持 | 保持期間中は残る     | ACK後に削除          |
// | 順序保証       | パーティション内     | キュー内             |
// | ルーティング   | トピック/パーティション | Exchange/Binding   |
// | プロトコル     | 独自プロトコル       | AMQP               |
// | スケーリング   | パーティション追加   | キュー/ノード追加    |`,
      },
      {
        title: "ユースケース別の選び方",
        content:
          "Kafkaが適しているのは、大量のイベントストリーミング（ログ収集、IoTデータ）、イベントソーシング、複数コンシューマーが同じデータを読むケース、データパイプライン（ETL）、リアルタイム分析です。RabbitMQが適しているのは、タスクキュー（ジョブのワーカー分散）、複雑なルーティングが必要なケース、RPC（リクエスト/リプライ）パターン、メッセージの優先度制御、既存システムとのAMQP連携です。小〜中規模であればRabbitMQが導入しやすく、大規模なイベント駆動システムにはKafkaが向いています。",
        code: `// ユースケース別の選択ガイド

// === Kafka が最適なケース ===

// 1. 大規模イベントストリーミング・ログ集約
// - 毎秒数十万メッセージの処理
// - アクセスログ、アプリログの集約
@KafkaListener(topics = "access-logs", groupId = "log-aggregator")
public void aggregateLogs(List<AccessLog> logs) {
    // バッチ処理で高スループット
    elasticsearchBulkIndexer.index(logs);
}

// 2. イベントソーシング（イベント再生が必要）
// - 過去のイベントを任意時点から再読み込み可能
// - Kafkaのログ保持により実現
// consumer.seek(partition, specificOffset); // 特定オフセットから再生

// 3. 複数サービスが同じイベントを独立消費
// Consumer Group A: 在庫更新
// Consumer Group B: 通知送信
// Consumer Group C: 分析データ記録
// → 各グループが全メッセージを独立して消費

// === RabbitMQ が最適なケース ===

// 1. タスクキュー（ワーカーパターン）
// - 画像リサイズ、PDF生成、メール送信
@RabbitListener(queues = "image-resize-queue")
public void resizeImage(ImageResizeTask task) {
    imageProcessor.resize(task.getImageId(), task.getSize());
}

// 2. 複雑なルーティング
// - 条件に応じた柔軟な振り分け
// "order.jp.premium" → 日本プレミアム処理キュー
// "order.us.*"       → US全般処理キュー
// "order.#"          → 監査ログキュー

// 3. RPCパターン（同期リクエスト/リプライ）
public BigDecimal calculateShipping(ShippingRequest req) {
    return (BigDecimal) rabbitTemplate.convertSendAndReceive(
        "shipping-exchange", "shipping.calculate", req
    );
}

// 4. メッセージ優先度
// 優先度の高い注文を先に処理
// Queue定義時: x-max-priority = 10
// 送信時: message.getMessageProperties().setPriority(10);`,
      },
      {
        title: "パフォーマンス特性の比較",
        content:
          "Kafkaは高スループットに最適化されており、シーケンシャルなディスクI/Oとゼロコピー転送により、単一ブローカーでも数百MB/秒の処理が可能です。パーティションを増やすことで線形にスケールします。RabbitMQはレイテンシの低さが特徴で、個々のメッセージの配信遅延がマイクロ秒〜ミリ秒単位です。ただし、キュー内のメッセージが大量に滞留するとパフォーマンスが低下します。Kafkaはバッチ処理に優れ、RabbitMQは個別メッセージの即時処理に優れています。",
        code: `// パフォーマンス特性の比較

// === スループット ===
// Kafka:    100,000〜1,000,000+ メッセージ/秒（パーティション数依存）
// RabbitMQ: 10,000〜50,000 メッセージ/秒（クラスタ構成依存）

// === レイテンシ ===
// Kafka:    5〜50ms（バッチ送信のため）
// RabbitMQ: 1〜10ms（即時配信）

// Kafkaの高スループット設定
// spring:
//   kafka:
//     producer:
//       batch-size: 32768           # バッチサイズ（32KB）
//       buffer-memory: 67108864     # バッファメモリ（64MB）
//       properties:
//         linger.ms: 5              # 5ms待ってバッチ送信
//         compression.type: lz4     # 圧縮で帯域削減
//     consumer:
//       fetch-min-size: 1048576     # 最小フェッチ（1MB）
//       fetch-max-wait: 500        # 最大待ち時間（500ms）
//       max-poll-records: 500      # 1回のポールで500件取得

// RabbitMQの低レイテンシ設定
// spring:
//   rabbitmq:
//     listener:
//       simple:
//         prefetch: 1               # 1件ずつ取得（レイテンシ優先）
//         concurrency: 10           # 並列コンシューマー数
//     cache:
//       channel:
//         size: 50                  # チャネルキャッシュ増加

// パフォーマンスベンチマーク用の設定例
@Bean
public ProducerFactory<String, String> highThroughputProducer() {
    Map<String, Object> config = new HashMap<>();
    config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,
        "localhost:9092");
    config.put(ProducerConfig.BATCH_SIZE_CONFIG, 65536);
    config.put(ProducerConfig.LINGER_MS_CONFIG, 10);
    config.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "lz4");
    config.put(ProducerConfig.ACKS_CONFIG, "1"); // リーダーのみACK
    config.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 134217728);
    return new DefaultKafkaProducerFactory<>(config);
}

// | 指標         | Kafka推奨設定  | RabbitMQ推奨設定 |
// |-------------|--------------|----------------|
// | バッチ処理    | linger.ms=5  | prefetch=250   |
// | 圧縮         | lz4/zstd     | N/A            |
// | ACK          | acks=1       | auto ACK       |
// | スケール方法  | パーティション増 | ノード追加       |`,
      },
      {
        title: "移行と共存パターン",
        content:
          "KafkaとRabbitMQはそれぞれ得意分野が異なるため、同一システム内で共存させることも有効な戦略です。イベントストリーミングにはKafka、タスクキューやRPCにはRabbitMQという使い分けが典型的です。RabbitMQからKafkaへの段階的移行では、ブリッジパターン（RabbitMQのメッセージをKafkaに転送するコンシューマー）を活用します。Spring Cloud Streamを使えば、ブローカーの違いを抽象化し、設定変更だけでバインダーを切り替えることも可能です。移行時はデュアルライト（両方に送信）を行い、検証後に片方を停止する方法も安全です。",
        code: `// === 共存パターン: Kafka + RabbitMQ ===

@Configuration
public class DualMessagingConfig {

    // Kafka: イベントストリーミング用
    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate(
            ProducerFactory<String, Object> pf) {
        return new KafkaTemplate<>(pf);
    }

    // RabbitMQ: タスクキュー用
    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory cf,
            Jackson2JsonMessageConverter converter) {
        RabbitTemplate template = new RabbitTemplate(cf);
        template.setMessageConverter(converter);
        return template;
    }
}

@Service
public class OrderService {
    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final RabbitTemplate rabbitTemplate;

    public void createOrder(Order order) {
        orderRepository.save(order);

        // Kafka: イベント配信（複数サービスが独立消費）
        kafkaTemplate.send("order-events",
            order.getId().toString(),
            new OrderCreatedEvent(order));

        // RabbitMQ: タスクキュー（PDF生成ワーカーへ）
        rabbitTemplate.convertAndSend(
            "task-exchange", "task.pdf",
            new GenerateInvoiceTask(order.getId()));
    }
}

// === ブリッジパターン（RabbitMQ → Kafka移行） ===

@Component
public class RabbitToKafkaBridge {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    // RabbitMQから読んでKafkaに転送
    @RabbitListener(queues = "legacy-order-queue")
    public void bridge(OrderMessage message) {
        kafkaTemplate.send("order-events",
            message.getOrderId().toString(), message);
    }
}

// === Spring Cloud Stream（ブローカー抽象化） ===

// 依存関係:
// spring-cloud-stream-binder-kafka または
// spring-cloud-stream-binder-rabbit

// application.yml（バインダー設定だけで切り替え可能）
// spring:
//   cloud:
//     stream:
//       bindings:
//         orderEventOut-out-0:
//           destination: order-events
//           binder: kafka    # ← "rabbit" に変更するだけ
//         orderEventIn-in-0:
//           destination: order-events
//           group: order-service
//           binder: kafka

// 関数ベースのプログラミングモデル
@Configuration
public class StreamConfig {

    // プロデューサー（Supplier）
    @Bean
    public Supplier<OrderEvent> orderEventOut() {
        return () -> new OrderEvent(/*...*/);
    }

    // コンシューマー（Consumer）
    @Bean
    public Consumer<OrderEvent> orderEventIn() {
        return event -> {
            log.info("受信: {}", event);
            orderService.process(event);
        };
    }
}`,
      },
    ],
  },
];

export interface LoggingSection {
  title: string;
  content: string;
  code?: string;
}

export interface LoggingChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: LoggingSection[];
}

export const loggingCategories = [
  { id: "basics", name: "ログ基礎", color: "#2563EB" },
  { id: "framework", name: "ログフレームワーク", color: "#059669" },
  { id: "practice", name: "実践・運用", color: "#D97706" },
] as const;

export const loggingChapters: LoggingChapter[] = [
  // ===== ログ基礎 =====
  {
    id: "logging-overview",
    title: "ログの基礎知識",
    category: "basics",
    description:
      "ログの重要性、ログレベル（TRACE/DEBUG/INFO/WARN/ERROR）、何をログに記録するかを学ぶ",
    sections: [
      {
        title: "ログの重要性",
        content:
          "ログはアプリケーションの動作を記録する仕組みで、障害調査、パフォーマンス分析、セキュリティ監査、ビジネス分析など多くの目的で利用されます。本番環境ではデバッガを使えないため、ログが唯一の手がかりとなることが多いです。適切なログ設計は、システムの運用性と保守性を大きく左右します。「ログがなければ、起きていないのと同じ」という格言があるほど、ログは運用の生命線です。",
        code: `// ログがないと障害調査ができない例

// NG: ログなし → 障害時に原因が分からない
public Order processOrder(OrderRequest request) {
    Order order = createOrder(request);
    paymentService.charge(order);
    inventoryService.decreaseStock(order);
    notificationService.sendConfirmation(order);
    return order;
}

// OK: 適切なログで障害時にトレース可能
@Slf4j
public class OrderService {

    public Order processOrder(OrderRequest request) {
        log.info("注文処理開始: userId={}, items={}",
            request.getUserId(), request.getItems().size());

        Order order = createOrder(request);
        log.debug("注文作成完了: orderId={}", order.getId());

        try {
            paymentService.charge(order);
            log.info("決済完了: orderId={}, amount={}",
                order.getId(), order.getTotalAmount());
        } catch (PaymentException e) {
            log.error("決済失敗: orderId={}, reason={}",
                order.getId(), e.getMessage(), e);
            throw e;
        }

        inventoryService.decreaseStock(order);
        notificationService.sendConfirmation(order);

        log.info("注文処理完了: orderId={}", order.getId());
        return order;
    }
}`,
      },
      {
        title: "ログレベル",
        content:
          "ログレベルは、ログメッセージの重要度を表す指標です。TRACE（最も詳細）、DEBUG（開発時のデバッグ情報）、INFO（正常な動作の記録）、WARN（警告、潜在的な問題）、ERROR（エラー、処理の失敗）の5段階があります。設定したレベル以上のログだけが出力されます。本番環境では通常INFOレベル以上を出力し、必要に応じてDEBUGに切り替えます。",
        code: `// ログレベルの使い分け

@Slf4j
@Service
public class UserService {

    // TRACE: 最も詳細、メソッドの入出力パラメータなど
    public User findById(Long id) {
        log.trace("findById() called with id={}", id);
        User user = userRepository.findById(id).orElseThrow();
        log.trace("findById() returning user={}", user);
        return user;
    }

    // DEBUG: 開発・デバッグ時に有用な情報
    public List<User> search(UserSearchCriteria criteria) {
        log.debug("ユーザー検索: criteria={}", criteria);
        List<User> results = userRepository.search(criteria);
        log.debug("検索結果: {}件", results.size());
        return results;
    }

    // INFO: 正常な業務イベントの記録
    public User register(UserRegistrationDto dto) {
        User user = userRepository.save(dto.toEntity());
        log.info("ユーザー登録完了: userId={}, email={}",
            user.getId(), user.getEmail());
        return user;
    }

    // WARN: 潜在的な問題、リトライ、閾値超過
    public void checkQuota(User user) {
        int usage = getStorageUsage(user);
        if (usage > 80) {
            log.warn("ストレージ使用率が閾値超過: userId={}, usage={}%",
                user.getId(), usage);
        }
    }

    // ERROR: 処理の失敗、例外発生
    public void sendEmail(String to, String subject) {
        try {
            emailClient.send(to, subject);
        } catch (EmailException e) {
            log.error("メール送信失敗: to={}, subject={}",
                to, subject, e);  // 例外は最後の引数に渡す
        }
    }
}`,
      },
      {
        title: "何をログに記録するか",
        content:
          "効果的なログには「いつ」「誰が」「何を」「どうなったか」の4要素が含まれるべきです。タイムスタンプ、リクエストID、ユーザーID、操作内容、処理結果、エラー原因などを記録します。一方で、パスワード、クレジットカード番号、個人情報などの機密データは絶対にログに記録してはいけません。ログの量と質のバランスも重要で、多すぎるとストレージを圧迫し、少なすぎると障害調査ができません。",
        code: `// ログに記録すべきもの / 記録してはいけないもの

@Slf4j
@Service
public class AuthService {

    // OK: 記録すべき情報
    public void login(LoginRequest request) {
        log.info("ログイン試行: username={}, ip={}, userAgent={}",
            request.getUsername(),
            request.getIpAddress(),
            request.getUserAgent());

        try {
            Authentication auth = authenticate(request);
            log.info("ログイン成功: username={}, roles={}",
                auth.getName(), auth.getAuthorities());
        } catch (AuthenticationException e) {
            log.warn("ログイン失敗: username={}, reason={}",
                request.getUsername(), e.getMessage());
            // 不正アクセス検知に必要
        }
    }

    // NG: 機密情報をログに出力してはいけない
    public void badLogging(LoginRequest request) {
        // log.info("ログイン: user={}, password={}",
        //     request.getUsername(), request.getPassword());  // 絶対NG！

        // log.info("決済: card={}", creditCardNumber);  // 絶対NG！

        // log.debug("ユーザー情報: {}", user.toString());
        // → toString() に個人情報が含まれていないか確認
    }

    // ログ設計のチェックリスト:
    // ✅ タイムスタンプ（自動付与）
    // ✅ ログレベル
    // ✅ リクエストID / トレースID
    // ✅ ユーザーID / セッションID
    // ✅ 操作内容（何をしたか）
    // ✅ 処理結果（成功/失敗）
    // ✅ エラー時のスタックトレース
    // ❌ パスワード、トークン
    // ❌ クレジットカード番号
    // ❌ マイナンバー、個人情報
}`,
      },
      {
        title: "ログ出力のベストプラクティス",
        content:
          "ログ出力時のパフォーマンスと可読性を両立するために、いくつかのベストプラクティスがあります。文字列結合（+演算子）ではなくパラメータ化メッセージ（{}プレースホルダ）を使うこと、例外はlog.error()の最後の引数に渡すこと、isDebugEnabled()による無駄な評価を避けること、一貫したフォーマットを使うことが重要です。",
        code: `@Slf4j
public class LoggingBestPractices {

    // 1. パラメータ化メッセージを使う（文字列結合はNG）
    public void parameterizedMessage(User user) {
        // NG: 文字列結合（ログレベルが INFO 未満でも結合が実行される）
        // log.debug("User: " + user.getName() + ", age: " + user.getAge());

        // OK: パラメータ化（ログレベルが合致しない場合は評価されない）
        log.debug("User: name={}, age={}", user.getName(), user.getAge());
    }

    // 2. 例外は最後の引数に渡す
    public void exceptionLogging() {
        try {
            riskyOperation();
        } catch (Exception e) {
            // NG: getMessage() だけではスタックトレースが失われる
            // log.error("処理失敗: " + e.getMessage());

            // OK: 例外オブジェクトを最後の引数に渡す
            log.error("処理失敗: operation=riskyOperation", e);
            // → スタックトレースが自動出力される
        }
    }

    // 3. コストの高い引数は遅延評価する
    public void lazyEvaluation(Order order) {
        // NG: toDetailString() が常に実行される
        // log.debug("注文詳細: {}", order.toDetailString());

        // OK: ログレベルチェック
        if (log.isDebugEnabled()) {
            log.debug("注文詳細: {}", order.toDetailString());
        }

        // OK: Supplier で遅延評価（Log4j2の場合）
        // log.debug("注文詳細: {}", () -> order.toDetailString());
    }

    // 4. 一貫したフォーマット
    public void consistentFormat() {
        // キーバリュー形式で統一（構造化ログへの移行が容易）
        log.info("action=create_order, orderId={}, userId={}, amount={}",
            orderId, userId, amount);

        log.info("action=payment_success, orderId={}, method={}",
            orderId, paymentMethod);
    }
}`,
      },
      {
        title: "ログレベルの運用ガイドライン",
        content:
          "ログレベルの運用は、環境ごとに適切に設定する必要があります。開発環境ではDEBUG以上、ステージング環境ではINFO以上、本番環境ではINFO以上（通常時）が基本です。障害時には本番でも一時的にDEBUGレベルに下げて詳細な情報を取得し、調査後にINFOに戻します。Spring Boot Actuatorを使えば、アプリケーションの再起動なしにログレベルを動的に変更できます。",
        code: `// 環境ごとのログレベル設定（application.yml）

// --- 開発環境 (application-dev.yml) ---
// logging:
//   level:
//     root: INFO
//     com.example: DEBUG        # 自社コードは DEBUG
//     org.hibernate.SQL: DEBUG  # 発行される SQL を表示
//     org.hibernate.type.descriptor.sql: TRACE  # SQLパラメータ表示
//     org.springframework.web: DEBUG

// --- 本番環境 (application-prod.yml) ---
// logging:
//   level:
//     root: WARN
//     com.example: INFO         # 自社コードは INFO
//     org.hibernate.SQL: WARN   # SQL は非表示
//     org.springframework: WARN

// Spring Boot Actuator でログレベルを動的に変更
// POST /actuator/loggers/com.example
// { "configuredLevel": "DEBUG" }

// Actuator の設定
// management:
//   endpoints:
//     web:
//       exposure:
//         include: loggers
//   endpoint:
//     loggers:
//       enabled: true

// プログラムからログレベルを変更する例
@RestController
@RequiredArgsConstructor
public class LogLevelController {

    @PostMapping("/admin/log-level")
    @PreAuthorize("hasRole('ADMIN')")
    public void changeLogLevel(
            @RequestParam String logger,
            @RequestParam String level) {
        LoggerContext ctx = (LoggerContext)
            LoggerFactory.getILoggerFactory();
        ctx.getLogger(logger).setLevel(Level.valueOf(level));
        // 注意: アプリ再起動で元に戻る（永続化されない）
    }
}`,
      },
    ],
  },
  {
    id: "logging-api",
    title: "SLF4JとMDC",
    category: "basics",
    description:
      "SLF4J、ファサードパターン、パラメータ化メッセージ、MDCによるコンテキスト情報の付与を学ぶ",
    sections: [
      {
        title: "SLF4J（ファサードパターン）",
        content:
          "SLF4J（Simple Logging Facade for Java）は、ログ実装への統一的なインターフェースを提供するファサード（窓口）ライブラリです。アプリケーションコードはSLF4Jに対してログ出力し、実際のログ処理はバインディングされた実装（Logback、Log4j2など）が行います。これにより、ログ実装を変更してもアプリケーションコードの修正が不要になります。",
        code: `// SLF4J のアーキテクチャ
//
// アプリケーション
//     ↓
// SLF4J API (slf4j-api.jar)    ← インターフェース
//     ↓
// SLF4J バインディング           ← 実装の切り替え
//     ├── logback-classic.jar   → Logback（Spring Boot デフォルト）
//     ├── log4j-slf4j2-impl.jar → Log4j2
//     └── slf4j-jdk14.jar       → java.util.logging

// 使い方: @Slf4j (Lombok) または LoggerFactory
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

// 方法1: 手動でLoggerを取得
public class UserService {
    private static final Logger log =
        LoggerFactory.getLogger(UserService.class);
}

// 方法2: Lombok の @Slf4j（推奨）
@Slf4j
public class UserService {
    // private static final Logger log = ... が自動生成される
}

// SLF4J API の主要メソッド
@Slf4j
public class SLF4JExample {
    public void demo() {
        log.trace("最も詳細なログ");
        log.debug("デバッグ情報: value={}", someValue);
        log.info("業務イベント: userId={}", userId);
        log.warn("警告: 閾値超過 usage={}%", usage);
        log.error("エラー発生: operation={}", operation, exception);

        // 条件付きログ
        if (log.isDebugEnabled()) {
            log.debug("高コストな情報: {}", expensiveOperation());
        }
    }
}`,
      },
      {
        title: "SLF4Jのブリッジとバインディング",
        content:
          "JavaのログライブラリにはSLF4J以外にもjava.util.logging（JUL）、Apache Commons Logging（JCL）、Log4j 1.xなど多数あります。SLF4Jはブリッジライブラリを提供しており、これら既存のログAPIの呼び出しをSLF4Jにリダイレクトできます。Spring Bootはデフォルトでこれらのブリッジが設定済みのため、全てのログがLogbackに統一されます。",
        code: `// SLF4J のブリッジとバインディングの関係

// ライブラリA          ライブラリB          自社コード
// (JUL使用)           (JCL使用)           (SLF4J使用)
//    ↓                   ↓                   ↓
// jul-to-slf4j       jcl-over-slf4j       SLF4J API
//    ↓                   ↓                   ↓
//    └───────────────────┴───────────────────┘
//                        ↓
//                  logback-classic
//                        ↓
//                     ログ出力

// Spring Boot の build.gradle（ブリッジは自動設定済み）
// dependencies {
//     implementation 'org.springframework.boot:spring-boot-starter'
//     // ↑ これだけで以下が含まれる:
//     //   - slf4j-api
//     //   - logback-classic（バインディング）
//     //   - jul-to-slf4j（JULブリッジ）
//     //   - log4j-to-slf4j（Log4j2ブリッジ）
// }

// Log4j2 に切り替える場合
// dependencies {
//     implementation('org.springframework.boot:spring-boot-starter') {
//         exclude group: 'org.springframework.boot',
//                 module: 'spring-boot-starter-logging'
//     }
//     implementation 'org.springframework.boot:spring-boot-starter-log4j2'
// }

// よくあるエラー: 複数のバインディングが存在する
// SLF4J: Class path contains multiple SLF4J bindings.
// → 解決: 不要なバインディングを exclude する
// implementation('some-library') {
//     exclude group: 'ch.qos.logback', module: 'logback-classic'
// }`,
      },
      {
        title: "パラメータ化メッセージ",
        content:
          "SLF4Jのパラメータ化メッセージは、{}プレースホルダを使ってログメッセージにパラメータを埋め込む機能です。文字列結合（+演算子）と比較して、ログレベルが出力対象外の場合にパラメータの文字列変換が行われないため、パフォーマンスに優れています。複数のパラメータや配列、例外オブジェクトにも対応しています。",
        code: `@Slf4j
public class ParameterizedLogging {

    // 1. 基本的なパラメータ化
    public void basic(String name, int age) {
        log.info("ユーザー: name={}, age={}", name, age);
        // 出力: ユーザー: name=田中, age=30
    }

    // 2. オブジェクトのパラメータ（toString() が呼ばれる）
    public void objectParam(User user) {
        log.info("ユーザー情報: {}", user);
        // user.toString() が呼ばれる
    }

    // 3. 3つ以上のパラメータ
    public void multipleParams(Order order) {
        log.info("注文: id={}, user={}, amount={}, status={}",
            order.getId(),
            order.getUserId(),
            order.getTotalAmount(),
            order.getStatus());
    }

    // 4. 例外（最後の引数が Throwable の場合、スタックトレース出力）
    public void withException(Long orderId) {
        try {
            processOrder(orderId);
        } catch (Exception e) {
            // {} は orderId に対応、e はスタックトレースとして出力
            log.error("注文処理失敗: orderId={}", orderId, e);
        }
    }

    // 5. パフォーマンス比較
    public void performance(Order order) {
        // NG: 文字列結合（DEBUG無効でも結合が実行される）
        // log.debug("Order: " + order.toDetailString());

        // OK: パラメータ化（DEBUG無効ならtoString()すら呼ばれない）
        log.debug("Order: {}", order);

        // OK: 高コスト処理はisEnabled()でガード
        if (log.isDebugEnabled()) {
            log.debug("Order detail: {}", order.toDetailString());
        }
    }
}`,
      },
      {
        title: "MDC（Mapped Diagnostic Context）",
        content:
          "MDC（マップ診断コンテキスト）は、スレッドローカルなキーバリューストアで、全てのログ出力に自動的にコンテキスト情報（リクエストID、ユーザーIDなど）を付与できます。フィルターやインターセプターでMDCに値をセットすると、そのリクエスト内の全ログに情報が付与されます。分散トレーシングとの連携にも不可欠な機能です。",
        code: `// MDC でリクエスト単位のコンテキスト情報を付与

// 1. MDC フィルターの実装
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class MdcFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain) throws ServletException, IOException {
        try {
            // リクエストIDを生成してMDCにセット
            String requestId = UUID.randomUUID().toString().substring(0, 8);
            MDC.put("requestId", requestId);
            MDC.put("clientIp", request.getRemoteAddr());
            MDC.put("method", request.getMethod());
            MDC.put("uri", request.getRequestURI());

            // 認証済みの場合、ユーザーIDもセット
            Authentication auth = SecurityContextHolder.getContext()
                .getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                MDC.put("userId", auth.getName());
            }

            // レスポンスヘッダにもリクエストIDを設定
            response.setHeader("X-Request-Id", requestId);

            chain.doFilter(request, response);
        } finally {
            MDC.clear();  // メモリリーク防止（必ずクリア）
        }
    }
}

// 2. logback-spring.xml でMDCの値を出力に含める
// <pattern>
//   %d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level
//   [requestId=%X{requestId}] [userId=%X{userId}]
//   %logger{36} - %msg%n
// </pattern>

// 3. 出力例:
// 2024-01-15 10:30:45.123 [http-nio-8080-exec-1] INFO
// [requestId=a1b2c3d4] [userId=tanaka]
// c.e.service.OrderService - 注文処理開始: orderId=100`,
      },
      {
        title: "非同期処理でのMDC伝播",
        content:
          "MDCはスレッドローカル変数を使用しているため、非同期処理（@Async、CompletableFuture、別スレッドプール）ではMDCの値が自動的に引き継がれません。非同期処理でもMDCを維持するには、MDCのコピーを明示的に伝播させるTaskDecoratorを実装する必要があります。Spring Bootでは、TaskExecutorのカスタマイズで簡単に対応できます。",
        code: `// 非同期処理での MDC 伝播

// 1. MDC伝播用 TaskDecorator
public class MdcTaskDecorator implements TaskDecorator {

    @Override
    public Runnable decorate(Runnable runnable) {
        // 呼び出し元スレッドの MDC をコピー
        Map<String, String> contextMap = MDC.getCopyOfContextMap();

        return () -> {
            try {
                // 非同期スレッドに MDC を復元
                if (contextMap != null) {
                    MDC.setContextMap(contextMap);
                }
                runnable.run();
            } finally {
                MDC.clear();  // 非同期スレッドの MDC をクリア
            }
        };
    }
}

// 2. TaskExecutor の設定
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");

        // MDC伝播デコレータを設定
        executor.setTaskDecorator(new MdcTaskDecorator());

        executor.initialize();
        return executor;
    }
}

// 3. CompletableFuture での MDC 伝播
public class MdcCompletableFuture {

    public static <T> CompletableFuture<T> supplyAsync(
            Supplier<T> supplier, Executor executor) {
        Map<String, String> contextMap = MDC.getCopyOfContextMap();

        return CompletableFuture.supplyAsync(() -> {
            try {
                if (contextMap != null) MDC.setContextMap(contextMap);
                return supplier.get();
            } finally {
                MDC.clear();
            }
        }, executor);
    }
}

// 使用例
// MdcCompletableFuture.supplyAsync(
//     () -> orderService.process(orderId), taskExecutor);`,
      },
    ],
  },

  // ===== ログフレームワーク =====
  {
    id: "logback-config",
    title: "Logback設定",
    category: "framework",
    description:
      "Logbackの設定、logback-spring.xml、Appender、Encoder、Filterの使い方を学ぶ",
    sections: [
      {
        title: "Logbackの基本設定",
        content:
          "LogbackはSpring Bootのデフォルトログ実装で、高いパフォーマンスと豊富な機能を持っています。設定ファイルはlogback-spring.xml（Spring Boot推奨）またはlogback.xmlに記述します。logback-spring.xmlを使うと、Springプロファイルに応じた設定の切り替えが可能になります。設定の基本要素はappender（出力先）、encoder（フォーマット）、logger（ログ制御）です。",
        code: `<!-- logback-spring.xml: 基本的な設定 -->
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!-- Spring Boot のデフォルト設定を読み込み -->
    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <!-- プロパティ定義 -->
    <property name="LOG_PATH" value="\${LOG_PATH:-./logs}"/>
    <property name="APP_NAME" value="my-application"/>

    <!-- コンソール出力 -->
    <appender name="CONSOLE"
              class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} %highlight(%-5level)
                [%thread] %cyan(%logger{36})
                [%X{requestId:-}] - %msg%n
            </pattern>
            <charset>UTF-8</charset>
        </encoder>
    </appender>

    <!-- ファイル出力（ローテーション付き） -->
    <appender name="FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>\${LOG_PATH}/\${APP_NAME}.log</file>
        <rollingPolicy
            class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>
                \${LOG_PATH}/\${APP_NAME}.%d{yyyy-MM-dd}.%i.log.gz
            </fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <encoder>
            <pattern>
                %d{yyyy-MM-dd HH:mm:ss.SSS} %-5level
                [%thread] %logger{36} [%X{requestId:-}] - %msg%n
            </pattern>
        </encoder>
    </appender>

    <!-- ルートロガー -->
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE"/>
    </root>

</configuration>`,
      },
      {
        title: "Appenderの種類",
        content:
          "Appenderはログの出力先を定義するコンポーネントです。ConsoleAppender（標準出力）、RollingFileAppender（ローテーション付きファイル）、AsyncAppender（非同期出力）、SMTPAppender（メール通知）などがあります。RollingFileAppenderではTimeBasedRollingPolicy（日次ローテーション）やSizeAndTimeBasedRollingPolicy（サイズ+日次）が使えます。",
        code: `<!-- 各種 Appender の設定例 -->

<!-- 1. エラーログ専用ファイル -->
<appender name="ERROR_FILE"
          class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>\${LOG_PATH}/error.log</file>
    <!-- ERROR レベル以上のみ出力 -->
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
        <level>ERROR</level>
    </filter>
    <rollingPolicy
        class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
        <fileNamePattern>
            \${LOG_PATH}/error.%d{yyyy-MM-dd}.%i.log.gz
        </fileNamePattern>
        <maxFileSize>50MB</maxFileSize>
        <maxHistory>90</maxHistory>
    </rollingPolicy>
    <encoder>
        <pattern>%d %-5level [%thread] %logger{36} - %msg%n</pattern>
    </encoder>
</appender>

<!-- 2. 非同期 Appender（パフォーマンス向上） -->
<appender name="ASYNC_FILE"
          class="ch.qos.logback.classic.AsyncAppender">
    <queueSize>1024</queueSize>
    <discardingThreshold>0</discardingThreshold>
    <neverBlock>true</neverBlock>
    <appender-ref ref="FILE"/>
</appender>

<!-- 3. JSON 形式で出力（Logstash Encoder） -->
<!-- 依存: net.logstash.logback:logstash-logback-encoder -->
<appender name="JSON_FILE"
          class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>\${LOG_PATH}/app.json</file>
    <rollingPolicy
        class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <fileNamePattern>
            \${LOG_PATH}/app.%d{yyyy-MM-dd}.json.gz
        </fileNamePattern>
        <maxHistory>30</maxHistory>
    </rollingPolicy>
    <encoder
        class="net.logstash.logback.encoder.LogstashEncoder">
        <includeMdcKeyName>requestId</includeMdcKeyName>
        <includeMdcKeyName>userId</includeMdcKeyName>
    </encoder>
</appender>

<root level="INFO">
    <appender-ref ref="CONSOLE"/>
    <appender-ref ref="ASYNC_FILE"/>
    <appender-ref ref="ERROR_FILE"/>
</root>`,
      },
      {
        title: "EncoderとPatternLayout",
        content:
          "Encoderはログメッセージのフォーマットを定義します。PatternLayoutEncoderが最も一般的で、パターン文字列でフォーマットを指定します。%d（日時）、%level（ログレベル）、%thread（スレッド名）、%logger（ロガー名）、%msg（メッセージ）、%X{key}（MDC値）などの変換指定子が使えます。カラー出力やフィールド幅の指定も可能です。",
        code: `<!-- Encoder / Pattern の詳細 -->

<!-- 主要な変換指定子 -->
<!-- %d{pattern}  : 日時（例: %d{yyyy-MM-dd HH:mm:ss.SSS}） -->
<!-- %level / %-5level : ログレベル（-5 で左寄せ5文字幅） -->
<!-- %thread      : スレッド名 -->
<!-- %logger{n}   : ロガー名（n文字に省略） -->
<!-- %msg         : ログメッセージ -->
<!-- %n           : 改行 -->
<!-- %X{key}      : MDC の値 -->
<!-- %exception   : 例外スタックトレース -->

<!-- 開発環境用: カラー付き、読みやすいフォーマット -->
<encoder>
    <pattern>
        %d{HH:mm:ss.SSS} %highlight(%-5level) %cyan(%-40.40logger{39}) : %msg%n
    </pattern>
</encoder>
<!-- 出力例: -->
<!-- 10:30:45.123 INFO  c.e.service.OrderService              : 注文処理開始 -->

<!-- 本番環境用: 構造化、パース可能なフォーマット -->
<encoder>
    <pattern>
        %d{yyyy-MM-dd'T'HH:mm:ss.SSSXXX}|%-5level|%thread|%logger{36}|%X{requestId:-none}|%X{userId:-anonymous}|%msg%n
    </pattern>
</encoder>
<!-- 出力例: -->
<!-- 2024-01-15T10:30:45.123+09:00|INFO |http-exec-1|c.e.OrderService|a1b2c3d4|tanaka|注文処理開始 -->

<!-- 例外のスタックトレースを短縮 -->
<encoder>
    <pattern>%d %-5level %logger{36} - %msg%n</pattern>
    <!-- スタックトレースの最大行数を制限 -->
    <throwableExcluded>false</throwableExcluded>
</encoder>

<!-- Logstash Encoder (JSON形式) -->
<!-- <encoder class="net.logstash.logback.encoder.LogstashEncoder"/> -->
<!-- 出力例: {"@timestamp":"2024-01-15T10:30:45.123","level":"INFO",
     "logger_name":"c.e.OrderService","message":"注文処理開始",
     "requestId":"a1b2c3d4","userId":"tanaka"} -->`,
      },
      {
        title: "FilterとLoggerの制御",
        content:
          "Filterはログイベントを選別する仕組みで、Appender単位で適用できます。ThresholdFilter（指定レベル以上）、LevelFilter（特定レベルのみ）、EvaluatorFilter（条件式）などがあります。Loggerはパッケージ単位でログレベルを細かく制御する仕組みで、additivity属性で親ロガーへの伝播を制御できます。",
        code: `<!-- Filter と Logger の設定 -->

<!-- 1. ThresholdFilter: 指定レベル以上のみ通過 -->
<appender name="ERROR_ONLY" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
        <level>ERROR</level>
    </filter>
    <!-- ERROR と FATAL のみこのファイルに出力 -->
</appender>

<!-- 2. LevelFilter: 特定レベルのみ通過/拒否 -->
<appender name="WARN_ONLY" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <filter class="ch.qos.logback.classic.filter.LevelFilter">
        <level>WARN</level>
        <onMatch>ACCEPT</onMatch>
        <onMismatch>DENY</onMismatch>
    </filter>
    <!-- WARN レベルのみこのファイルに出力 -->
</appender>

<!-- 3. Logger の階層設定 -->
<!-- パッケージ単位でログレベルを制御 -->
<logger name="com.example" level="DEBUG"/>
<logger name="com.example.repository" level="TRACE"/>
<logger name="org.springframework" level="WARN"/>
<logger name="org.hibernate.SQL" level="DEBUG"/>
<logger name="org.hibernate.type.descriptor.sql" level="TRACE"/>

<!-- additivity="false": 親ロガーに伝播しない -->
<logger name="com.example.audit" level="INFO" additivity="false">
    <appender-ref ref="AUDIT_FILE"/>
    <!-- 監査ログは専用ファイルにだけ出力 -->
</logger>

<!-- 4. Spring プロファイルによる切り替え -->
<springProfile name="dev">
    <root level="DEBUG">
        <appender-ref ref="CONSOLE"/>
    </root>
</springProfile>

<springProfile name="prod">
    <root level="INFO">
        <appender-ref ref="ASYNC_FILE"/>
        <appender-ref ref="ERROR_FILE"/>
    </root>
</springProfile>`,
      },
      {
        title: "Logback設定のベストプラクティス",
        content:
          "実運用に向けたLogback設定のベストプラクティスとして、logback-spring.xmlを使うこと（Spring Boot機能が使える）、ファイル出力は必ずローテーション設定を行うこと、非同期Appenderでパフォーマンスを確保すること、エラーログは別ファイルに分離すること、ディスク容量の上限（totalSizeCap）を設定することが挙げられます。",
        code: `<!-- 本番運用向け logback-spring.xml の完全な例 -->
<?xml version="1.0" encoding="UTF-8"?>
<configuration scan="true" scanPeriod="30 seconds">

    <include resource="org/springframework/boot/logging/logback/defaults.xml"/>

    <property name="LOG_PATH" value="\${LOG_PATH:-/var/log/myapp}"/>
    <property name="APP_NAME" value="\${APP_NAME:-myapp}"/>

    <!-- コンソール（開発 + Docker環境用） -->
    <appender name="CONSOLE"
              class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} %-5level [%15.15thread] %-40.40logger{39} [%X{requestId:-}] : %msg%n</pattern>
        </encoder>
    </appender>

    <!-- アプリケーションログ -->
    <appender name="APP_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>\${LOG_PATH}/\${APP_NAME}.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>\${LOG_PATH}/\${APP_NAME}.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <maxFileSize>100MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <encoder><pattern>%d{ISO8601} %-5level [%thread] %logger{36} [%X{requestId:-}][%X{userId:-}] - %msg%n</pattern></encoder>
    </appender>

    <!-- 非同期ラッパー -->
    <appender name="ASYNC_APP" class="ch.qos.logback.classic.AsyncAppender">
        <queueSize>2048</queueSize>
        <discardingThreshold>0</discardingThreshold>
        <appender-ref ref="APP_FILE"/>
    </appender>

    <!-- エラーログ（別ファイル） -->
    <appender name="ERROR_FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
            <level>ERROR</level>
        </filter>
        <file>\${LOG_PATH}/\${APP_NAME}-error.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>\${LOG_PATH}/\${APP_NAME}-error.%d{yyyy-MM-dd}.%i.log.gz</fileNamePattern>
            <maxFileSize>50MB</maxFileSize>
            <maxHistory>90</maxHistory>
            <totalSizeCap>2GB</totalSizeCap>
        </rollingPolicy>
        <encoder><pattern>%d{ISO8601} %-5level [%thread] %logger{36} [%X{requestId:-}] - %msg%n</pattern></encoder>
    </appender>

    <!-- 本番 -->
    <springProfile name="prod">
        <root level="INFO">
            <appender-ref ref="ASYNC_APP"/>
            <appender-ref ref="ERROR_FILE"/>
        </root>
    </springProfile>

    <!-- 開発 -->
    <springProfile name="dev | default">
        <root level="DEBUG">
            <appender-ref ref="CONSOLE"/>
        </root>
    </springProfile>

</configuration>`,
      },
    ],
  },
  {
    id: "log4j2-config",
    title: "Log4j2設定",
    category: "framework",
    description:
      "Log4j2の設定、Async Logger、LMAX Disruptor、パフォーマンス比較を学ぶ",
    sections: [
      {
        title: "Log4j2の特徴",
        content:
          "Log4j2はApache Logging Servicesが開発する高性能ログフレームワークです。Logbackと比較して、Async Logger（LMAX Disruptor使用）による圧倒的な非同期パフォーマンス、ラムダ式によるメッセージの遅延評価、ゴミ回収（GC）フリーモード、プラグインアーキテクチャなどの優位性があります。高スループットが要求されるシステムに適しています。",
        code: `// Log4j2 への切り替え（Spring Boot）

// build.gradle
// dependencies {
//     implementation('org.springframework.boot:spring-boot-starter') {
//         exclude group: 'org.springframework.boot',
//                 module: 'spring-boot-starter-logging'  // Logback除外
//     }
//     implementation 'org.springframework.boot:spring-boot-starter-log4j2'
//
//     // Async Logger を使う場合
//     implementation 'com.lmax:disruptor:3.4.4'
// }

// Log4j2 の主な利点:
// 1. Async Logger: LMAX Disruptor で非同期ログ（最速）
// 2. ラムダ式: log.debug("data: {}", () -> expensiveOp())
// 3. GCフリーモード: GCポーズを削減
// 4. Lookups: 環境変数、Spring プロパティを直接参照
// 5. 設定形式: XML, JSON, YAML, Properties

// Log4j2 でのログ出力
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class OrderService {
    private static final Logger log = LogManager.getLogger();

    public void process(Order order) {
        // ラムダ式で遅延評価（Log4j2独自機能）
        log.debug("Order detail: {}",
            () -> order.toDetailString());
        // → DEBUG が無効なら toDetailString() は実行されない

        log.info("注文処理: orderId={}, amount={}",
            order.getId(), order.getTotalAmount());
    }
}`,
      },
      {
        title: "Log4j2のXML設定",
        content:
          "Log4j2の設定ファイルはlog4j2-spring.xml（Spring Boot推奨）に記述します。Configuration要素の下にAppenders（出力先定義）とLoggers（ログ制御定義）を配置します。Logbackと似た構造ですが、設定の記法やプラグイン名が異なります。monitorInterval属性で設定ファイルの自動再読み込みが可能です。",
        code: `<!-- log4j2-spring.xml: 基本的な設定 -->
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">

    <Properties>
        <Property name="LOG_PATH">\${sys:LOG_PATH:-./logs}</Property>
        <Property name="PATTERN">
            %d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%thread]
            %logger{36} [%X{requestId}] - %msg%n
        </Property>
    </Properties>

    <Appenders>
        <!-- コンソール出力 -->
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="\${PATTERN}"/>
        </Console>

        <!-- ローテーション付きファイル出力 -->
        <RollingFile name="RollingFile"
                     fileName="\${LOG_PATH}/app.log"
                     filePattern="\${LOG_PATH}/app-%d{yyyy-MM-dd}-%i.log.gz">
            <PatternLayout pattern="\${PATTERN}"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="1"/>
                <SizeBasedTriggeringPolicy size="100MB"/>
            </Policies>
            <DefaultRolloverStrategy max="30">
                <Delete basePath="\${LOG_PATH}" maxDepth="1">
                    <IfFileName glob="app-*.log.gz"/>
                    <IfLastModified age="30d"/>
                </Delete>
            </DefaultRolloverStrategy>
        </RollingFile>

        <!-- エラーログ専用 -->
        <RollingFile name="ErrorFile"
                     fileName="\${LOG_PATH}/error.log"
                     filePattern="\${LOG_PATH}/error-%d{yyyy-MM-dd}-%i.log.gz">
            <ThresholdFilter level="ERROR" onMatch="ACCEPT" onMismatch="DENY"/>
            <PatternLayout pattern="\${PATTERN}"/>
            <Policies>
                <SizeBasedTriggeringPolicy size="50MB"/>
            </Policies>
        </RollingFile>
    </Appenders>

    <Loggers>
        <Logger name="com.example" level="debug" additivity="false">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="RollingFile"/>
        </Logger>
        <Root level="info">
            <AppenderRef ref="Console"/>
            <AppenderRef ref="RollingFile"/>
            <AppenderRef ref="ErrorFile"/>
        </Root>
    </Loggers>

</Configuration>`,
      },
      {
        title: "Async Logger（LMAX Disruptor）",
        content:
          "Async Loggerは、Log4j2の最大の強みである非同期ログ機能です。LMAX Disruptor（ロックフリーのリングバッファ）を使用し、ログ出力をバックグラウンドスレッドで行います。メインスレッドのブロッキングがほぼゼロになるため、スループットが劇的に向上します。All Async（全ログ非同期）とMixed Async（一部だけ非同期）の2つの使い方があります。",
        code: `// Async Logger の設定方法

// 方法1: All Async（全ロガーを非同期化、最もシンプル）
// JVM起動オプションに追加:
// -Dlog4j2.contextSelector=
//   org.apache.logging.log4j.core.async.AsyncLoggerContextSelector

// 方法2: Mixed Async（特定ロガーだけ非同期化）
// log4j2-spring.xml で AsyncLogger を使用:

// <?xml version="1.0" encoding="UTF-8"?>
// <Configuration>
//     <Appenders>
//         <RollingFile name="File" ...>
//             <PatternLayout pattern="..."/>
//         </RollingFile>
//     </Appenders>
//
//     <Loggers>
//         <!-- 非同期ロガー（高スループット） -->
//         <AsyncLogger name="com.example" level="info"
//                      includeLocation="false">
//             <AppenderRef ref="File"/>
//         </AsyncLogger>
//
//         <!-- 同期ロガー（通常） -->
//         <Root level="warn">
//             <AppenderRef ref="File"/>
//         </Root>
//     </Loggers>
// </Configuration>

// Disruptor の設定（システムプロパティ）
// log4j2.asyncLoggerRingBufferSize=262144      # バッファサイズ
// log4j2.asyncLoggerWaitStrategy=Timeout        # 待機戦略
// log4j2.asyncLoggerTimeout=10                  # タイムアウト(ns)

// パフォーマンス比較（64スレッド、秒間メッセージ数）:
// ┌─────────────────────────┬──────────────┐
// │ 方式                     │ メッセージ/秒 │
// ├─────────────────────────┼──────────────┤
// │ Log4j2 Async Logger     │ 18,000,000   │
// │ Log4j2 Async Appender   │  3,500,000   │
// │ Logback AsyncAppender   │  2,000,000   │
// │ Log4j2 同期              │    500,000   │
// │ Logback 同期             │    400,000   │
// └─────────────────────────┴──────────────┘
// ※ includeLocation=false で更にパフォーマンス向上`,
      },
      {
        title: "Log4j2の高度な機能",
        content:
          "Log4j2には、Lookups（動的な値参照）、Filters（高度なフィルタリング）、JsonLayout（構造化ログ）、ScriptFilter（スクリプトによる条件分岐）などの高度な機能があります。GCフリーモードを有効にすると、ログ出力時のオブジェクト生成を最小化し、GCポーズを削減できます。",
        code: `// Log4j2 の高度な機能

// 1. JSON Layout（構造化ログ）
// <Console name="JsonConsole" target="SYSTEM_OUT">
//     <JsonLayout compact="true" eventEol="true"
//                 properties="true" stacktraceAsString="true">
//         <KeyValuePair key="appName" value="\${APP_NAME}"/>
//         <KeyValuePair key="environment" value="\${ENV}"/>
//     </JsonLayout>
// </Console>

// 2. Lookups（動的値参照）
// \${env:HOME}              → 環境変数
// \${sys:user.name}         → システムプロパティ
// \${spring:app.name}       → Spring プロパティ
// \${date:yyyy-MM-dd}       → 現在日時

// 3. GCフリーモード
// -Dlog4j2.enableThreadlocals=true
// -Dlog4j2.garbagefreeThreadContextMap=true
// ※ ログメッセージでオブジェクト生成を最小化

// 4. Markers による分類
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;

public class AuditService {
    private static final Logger log = LogManager.getLogger();
    private static final Marker AUDIT = MarkerManager.getMarker("AUDIT");
    private static final Marker SECURITY = MarkerManager.getMarker("SECURITY");

    public void recordLogin(String userId) {
        log.info(AUDIT, "ユーザーログイン: userId={}", userId);
    }

    public void recordUnauthorizedAccess(String resource) {
        log.warn(SECURITY, "不正アクセス検知: resource={}", resource);
    }
}

// Marker によるフィルタリング
// <MarkerFilter marker="AUDIT" onMatch="ACCEPT" onMismatch="DENY"/>
// → AUDIT マーカー付きのログだけ監査ファイルに出力`,
      },
      {
        title: "LogbackとLog4j2の比較・選定",
        content:
          "LogbackとLog4j2はどちらも優れたログフレームワークですが、特性が異なります。Logbackは設定がシンプルでSpring Bootとの統合が自然、多くのプロジェクトで実績があります。Log4j2はAsync Loggerによる高いスループット、ラムダ式、GCフリーモードなど技術的優位性があります。一般的なWebアプリケーションではLogback、高スループットが要求されるシステムではLog4j2が適しています。",
        code: `// Logback vs Log4j2 比較表

// ┌────────────────────┬────────────┬──────────────┐
// │ 項目                │ Logback    │ Log4j2       │
// ├────────────────────┼────────────┼──────────────┤
// │ Spring Boot 統合   │ デフォルト  │ 設定変更必要  │
// │ 非同期性能          │ ○          │ ◎（Disruptor）│
// │ ラムダ式            │ ✕          │ ○            │
// │ GCフリー           │ ✕          │ ○            │
// │ 設定の簡潔さ       │ ○          │ ○            │
// │ コミュニティ        │ 大きい      │ 大きい       │
// │ Logstash連携       │ ◎          │ ○            │
// │ メモリ使用量        │ 普通       │ やや多い      │
// └────────────────────┴────────────┴──────────────┘

// 選定ガイドライン:

// Logback を選ぶ場合:
// - 一般的な Web アプリケーション
// - Spring Boot のデフォルト設定で十分
// - チームの学習コストを抑えたい
// - Logstash/ELK との連携が重要

// Log4j2 を選ぶ場合:
// - 高スループットが要求される（金融、ゲーム、IoT）
// - GCポーズの最小化が重要
// - ラムダ式で遅延評価したい
// - 大量のログを非同期で高速処理

// 移行は簡単（SLF4J ファサードのおかげ）:
// アプリケーションコードの変更は不要
// build.gradle の依存関係と設定ファイルを変更するだけ`,
      },
    ],
  },
  {
    id: "spring-boot-logging",
    title: "Spring Bootのログ設定",
    category: "framework",
    description:
      "Spring Bootデフォルトログ、application.ymlでの設定、プロファイル別ログ、Actuatorでのログレベル変更を学ぶ",
    sections: [
      {
        title: "Spring Bootのデフォルトログ",
        content:
          "Spring Bootは、spring-boot-starter-loggingを通じてLogbackをデフォルトのログ実装として含んでいます。設定なしでもコンソールにINFOレベル以上のログが出力されます。デフォルトのフォーマットには日時、ログレベル、PID、スレッド名、ロガー名、メッセージが含まれます。application.ymlの設定だけで基本的なカスタマイズが可能です。",
        code: `// Spring Boot のデフォルトログ出力フォーマット:
// 2024-01-15T10:30:45.123+09:00 INFO  12345 --- [main]
//   c.e.MyApplication : Started MyApplication in 2.3 seconds

// application.yml での基本設定

// logging:
//   # ログレベル設定
//   level:
//     root: INFO
//     com.example: DEBUG
//     org.springframework.web: DEBUG
//     org.hibernate.SQL: DEBUG
//
//   # ファイル出力
//   file:
//     name: ./logs/application.log  # ファイルパス
//     # path: ./logs  # ディレクトリだけ指定（spring.log が作られる）
//
//   # ローテーション設定
//   logback:
//     rollingpolicy:
//       max-file-size: 100MB       # 最大ファイルサイズ
//       max-history: 30            # 保持日数
//       total-size-cap: 3GB        # 総容量上限
//       clean-history-on-start: false
//
//   # コンソールのパターン
//   pattern:
//     console: "%d{HH:mm:ss.SSS} %highlight(%-5level) [%thread] %cyan(%logger{36}) - %msg%n"
//     file: "%d{yyyy-MM-dd HH:mm:ss.SSS} %-5level [%thread] %logger{36} - %msg%n"
//     dateformat: "yyyy-MM-dd HH:mm:ss.SSS"
//
//   # 特定グループのログレベル一括設定
//   group:
//     web: org.springframework.core.codec, org.springframework.http, org.springframework.web
//     sql: org.hibernate.SQL, org.jooq.tools.LoggerListener

// Spring Boot 定義済みグループ:
// web: Spring MVC 関連
// sql: SQL 関連`,
      },
      {
        title: "プロファイル別ログ設定",
        content:
          "Spring Bootのプロファイル機能を使うと、環境（dev/staging/prod）ごとにログ設定を切り替えられます。application-dev.yml、application-prod.ymlにそれぞれの設定を記述するか、logback-spring.xml内の<springProfile>タグで分岐させます。開発環境では詳細なログを出力し、本番環境では必要最小限のログに絞るのが一般的です。",
        code: `// プロファイル別のログ設定

// --- application-dev.yml ---
// logging:
//   level:
//     root: INFO
//     com.example: DEBUG
//     org.springframework.web: DEBUG
//     org.hibernate.SQL: DEBUG
//     org.hibernate.type.descriptor.sql.BasicBinder: TRACE
//   pattern:
//     console: "%d{HH:mm:ss} %highlight(%-5level) %cyan(%logger{36}) - %msg%n"

// --- application-staging.yml ---
// logging:
//   level:
//     root: INFO
//     com.example: DEBUG
//   file:
//     name: /var/log/myapp/application.log

// --- application-prod.yml ---
// logging:
//   level:
//     root: WARN
//     com.example: INFO
//     org.springframework: WARN
//   file:
//     name: /var/log/myapp/application.log
//   logback:
//     rollingpolicy:
//       max-file-size: 100MB
//       max-history: 30

// logback-spring.xml での springProfile 分岐
// <springProfile name="dev">
//     <logger name="org.hibernate.SQL" level="DEBUG"/>
//     <root level="DEBUG">
//         <appender-ref ref="CONSOLE"/>
//     </root>
// </springProfile>
//
// <springProfile name="prod">
//     <root level="INFO">
//         <appender-ref ref="ASYNC_FILE"/>
//         <appender-ref ref="ERROR_FILE"/>
//     </root>
// </springProfile>
//
// <springProfile name="!prod">  <!-- prod 以外 -->
//     <logger name="com.example" level="DEBUG"/>
// </springProfile>`,
      },
      {
        title: "Actuatorでのログレベル動的変更",
        content:
          "Spring Boot Actuatorのloggersエンドポイントを使うと、アプリケーションの再起動なしにログレベルをリアルタイムで変更できます。本番環境で障害が発生した際に、一時的にDEBUGレベルに切り替えて詳細な情報を取得し、調査後にINFOに戻すといった運用が可能です。セキュリティ上、このエンドポイントへのアクセスは制限すべきです。",
        code: `// Actuator でのログレベル動的変更

// 1. 依存関係
// implementation 'org.springframework.boot:spring-boot-starter-actuator'

// 2. application.yml
// management:
//   endpoints:
//     web:
//       exposure:
//         include: loggers, health, info
//   endpoint:
//     loggers:
//       enabled: true

// 3. 全ロガーの一覧取得
// GET /actuator/loggers
// レスポンス:
// {
//   "levels": ["OFF","ERROR","WARN","INFO","DEBUG","TRACE"],
//   "loggers": {
//     "ROOT": {"configuredLevel":"INFO","effectiveLevel":"INFO"},
//     "com.example": {"configuredLevel":"DEBUG","effectiveLevel":"DEBUG"},
//     ...
//   }
// }

// 4. 特定ロガーの確認
// GET /actuator/loggers/com.example.service
// { "configuredLevel": null, "effectiveLevel": "INFO" }

// 5. ログレベルの変更（POST）
// POST /actuator/loggers/com.example.service
// Content-Type: application/json
// { "configuredLevel": "DEBUG" }

// 6. ログレベルのリセット（nullを指定）
// POST /actuator/loggers/com.example.service
// { "configuredLevel": null }

// curl での操作例
// curl -X POST http://localhost:8080/actuator/loggers/com.example \\
//   -H "Content-Type: application/json" \\
//   -d '{"configuredLevel": "DEBUG"}'

// セキュリティ設定（本番では必須）
@Configuration
public class ActuatorSecurity {
    @Bean
    public SecurityFilterChain actuatorSecurity(HttpSecurity http)
            throws Exception {
        return http
            .securityMatcher("/actuator/**")
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().hasRole("ADMIN"))
            .build();
    }
}`,
      },
      {
        title: "Spring Bootのログカスタマイズ",
        content:
          "Spring Bootでは、バナーの変更、起動時のログカスタマイズ、リクエストログ（CommonsRequestLoggingFilter）、Hibernate SQLのフォーマット出力など、さまざまなカスタマイズが可能です。また、spring-boot-starter-webに含まれるTomcatのアクセスログも設定で有効化できます。",
        code: `// Spring Boot のログカスタマイズ

// 1. リクエストログ（全HTTPリクエストを記録）
@Configuration
public class LoggingConfig {

    @Bean
    public CommonsRequestLoggingFilter requestLoggingFilter() {
        CommonsRequestLoggingFilter filter =
            new CommonsRequestLoggingFilter();
        filter.setIncludeQueryString(true);
        filter.setIncludePayload(true);
        filter.setMaxPayloadLength(10000);
        filter.setIncludeHeaders(false);
        filter.setAfterMessagePrefix("REQUEST: ");
        return filter;
    }
}
// application.yml:
// logging.level.org.springframework.web.filter.CommonsRequestLoggingFilter: DEBUG

// 2. Tomcat アクセスログの有効化
// server:
//   tomcat:
//     accesslog:
//       enabled: true
//       directory: /var/log/myapp
//       prefix: access
//       suffix: .log
//       pattern: "%h %l %u %t \"%r\" %s %b %D"

// 3. Hibernate SQL のフォーマット出力
// spring:
//   jpa:
//     show-sql: false  # ← Hibernate のログを使わない
//     properties:
//       hibernate:
//         format_sql: true
// logging:
//   level:
//     org.hibernate.SQL: DEBUG  # SQLをロガー経由で出力
//     org.hibernate.orm.jdbc.bind: TRACE  # パラメータ値

// 4. 独自の HandlerInterceptor でリクエスト情報をログ出力
@Slf4j
@Component
public class RequestLogInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) {
        long startTime = System.currentTimeMillis();
        request.setAttribute("startTime", startTime);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request,
            HttpServletResponse response, Object handler, Exception ex) {
        long duration = System.currentTimeMillis()
            - (long) request.getAttribute("startTime");
        log.info("method={} uri={} status={} duration={}ms",
            request.getMethod(), request.getRequestURI(),
            response.getStatus(), duration);
    }
}`,
      },
      {
        title: "テスト時のログ設定",
        content:
          "テスト実行時のログ設定は、src/test/resources/logback-test.xmlまたはapplication-test.ymlで行います。テストではログ出力を最小限に抑えてテスト実行速度を向上させつつ、失敗時にはデバッグに十分な情報を残すバランスが重要です。OutputCaptureExtension（JUnit 5）を使えば、テスト内でログ出力を検証することもできます。",
        code: `// テスト時のログ設定

// src/test/resources/application-test.yml
// logging:
//   level:
//     root: WARN
//     com.example: INFO
//     org.springframework.test: WARN

// src/test/resources/logback-test.xml
// <?xml version="1.0" encoding="UTF-8"?>
// <configuration>
//     <appender name="CONSOLE"
//               class="ch.qos.logback.core.ConsoleAppender">
//         <encoder>
//             <pattern>%-5level %logger{36} - %msg%n</pattern>
//         </encoder>
//     </appender>
//     <root level="WARN">
//         <appender-ref ref="CONSOLE"/>
//     </root>
//     <logger name="com.example" level="DEBUG"/>
// </configuration>

// ログ出力のテスト（JUnit 5 + Spring Boot）
@SpringBootTest
@ExtendWith(OutputCaptureExtension.class)
class OrderServiceTest {

    @Autowired
    private OrderService orderService;

    @Test
    void 注文処理でログが出力される(CapturedOutput output) {
        orderService.processOrder(createTestOrder());

        // ログ出力を検証
        assertThat(output.getOut())
            .contains("注文処理開始")
            .contains("注文処理完了");
    }

    @Test
    void エラー時にERRORログが出力される(CapturedOutput output) {
        assertThrows(PaymentException.class, () ->
            orderService.processOrder(createInvalidOrder()));

        assertThat(output.getOut())
            .contains("ERROR")
            .contains("決済失敗");
    }
}

// Mockito で Logger をモックする方法
@ExtendWith(MockitoExtension.class)
class ServiceLogTest {
    // SLF4J のテスト用ライブラリ: slf4j-test
    // implementation 'com.github.valfirst:slf4j-test:3.0.1'
}`,
      },
    ],
  },

  // ===== 実践・運用 =====
  {
    id: "structured-logging",
    title: "構造化ログ",
    category: "practice",
    description:
      "構造化ログ、JSON形式、Logstash連携、ELKスタック、CloudWatchを学ぶ",
    sections: [
      {
        title: "構造化ログとは",
        content:
          "構造化ログは、ログメッセージを機械解析可能な形式（主にJSON）で出力する手法です。従来のテキストログはパターンマッチで解析する必要がありますが、構造化ログはフィールドが明確に分離されているため、ログ集約ツール（ELK、Datadog、CloudWatch）での検索・フィルタリング・集計が容易になります。マイクロサービスや大規模システムでは必須の技術です。",
        code: `// テキストログ vs 構造化ログ

// テキストログ（従来）:
// 2024-01-15 10:30:45 INFO [http-exec-1] OrderService - 注文処理完了: orderId=123, userId=456, amount=15000

// 構造化ログ（JSON）:
// {
//   "@timestamp": "2024-01-15T10:30:45.123+09:00",
//   "level": "INFO",
//   "thread": "http-exec-1",
//   "logger": "com.example.OrderService",
//   "message": "注文処理完了",
//   "orderId": 123,
//   "userId": 456,
//   "amount": 15000,
//   "requestId": "a1b2c3d4",
//   "duration_ms": 245
// }

// 構造化ログの利点:
// 1. 検索が容易: orderId=123 で正確にフィルタ
// 2. 集計が容易: amount の合計・平均を計算
// 3. アラート設定: duration_ms > 3000 で通知
// 4. ダッシュボード: リアルタイム可視化

// Spring Boot + Logstash Encoder で構造化ログを実現
// build.gradle:
// implementation 'net.logstash.logback:logstash-logback-encoder:7.4'

// StructuredArguments で追加フィールドを付与
import static net.logstash.logback.argument.StructuredArguments.*;

@Slf4j
public class OrderService {
    public void processOrder(Order order) {
        log.info("注文処理完了",
            kv("orderId", order.getId()),
            kv("userId", order.getUserId()),
            kv("amount", order.getTotalAmount()),
            kv("duration_ms", duration));
    }
}`,
      },
      {
        title: "Logstash Encoderの設定",
        content:
          "logstash-logback-encoderは、LogbackでJSON形式のログを出力するライブラリです。LogstashEncoderをAppenderに設定するだけで、全てのログがJSON形式で出力されます。MDCの値、カスタムフィールド、スタックトレースも構造化されたJSONとして出力されるため、ログ集約ツールでの解析が容易になります。",
        code: `<!-- logback-spring.xml: Logstash Encoder 設定 -->

<!-- JSON形式でファイル出力 -->
<appender name="JSON_FILE"
          class="ch.qos.logback.core.rolling.RollingFileAppender">
    <file>\${LOG_PATH}/app.json</file>
    <rollingPolicy
        class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
        <fileNamePattern>
            \${LOG_PATH}/app.%d{yyyy-MM-dd}.%i.json.gz
        </fileNamePattern>
        <maxFileSize>100MB</maxFileSize>
        <maxHistory>30</maxHistory>
    </rollingPolicy>

    <encoder class="net.logstash.logback.encoder.LogstashEncoder">
        <!-- カスタムフィールドを追加 -->
        <customFields>
            {"app_name":"my-service","environment":"\${SPRING_PROFILES_ACTIVE:-dev}"}
        </customFields>

        <!-- MDC のキーを含める -->
        <includeMdcKeyName>requestId</includeMdcKeyName>
        <includeMdcKeyName>userId</includeMdcKeyName>

        <!-- タイムスタンプのフォーマット -->
        <timestampPattern>yyyy-MM-dd'T'HH:mm:ss.SSSXXX</timestampPattern>

        <!-- スタックトレースの短縮 -->
        <throwableConverter
            class="net.logstash.logback.stacktrace.ShortenedThrowableConverter">
            <maxDepthPerThrowable>30</maxDepthPerThrowable>
            <shortenedClassNameLength>20</shortenedClassNameLength>
            <exclude>sun\.reflect\..*</exclude>
        </throwableConverter>
    </encoder>
</appender>

<!-- コンソールはテキスト、ファイルはJSON（ハイブリッド） -->
<springProfile name="prod">
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="JSON_FILE"/>
    </root>
</springProfile>`,
      },
      {
        title: "ELKスタック連携",
        content:
          "ELKスタックは、Elasticsearch（検索エンジン）、Logstash（ログ収集・変換）、Kibana（可視化）の3つのツールで構成されるログ管理プラットフォームです。アプリケーションのログをLogstash経由でElasticsearchに投入し、Kibanaで検索・可視化します。近年はFilebeatを加えたEFKスタックや、Elastic Agentを使う構成も一般的です。",
        code: `// ELK スタック構成

// アプリケーション → Filebeat → Logstash → Elasticsearch → Kibana
//                 (ログ収集)   (変換)      (保存・検索)     (可視化)

// 1. Filebeat 設定（filebeat.yml）
// filebeat.inputs:
//   - type: log
//     enabled: true
//     paths:
//       - /var/log/myapp/app.json
//     json.keys_under_root: true
//     json.add_error_key: true
//
// output.logstash:
//   hosts: ["logstash:5044"]

// 2. Logstash 設定（logstash.conf）
// input {
//   beats {
//     port => 5044
//   }
// }
// filter {
//   if [level] == "ERROR" {
//     mutate { add_tag => ["error"] }
//   }
// }
// output {
//   elasticsearch {
//     hosts => ["elasticsearch:9200"]
//     index => "myapp-logs-%{+YYYY.MM.dd}"
//   }
// }

// 3. Docker Compose（開発環境用）
// docker-compose.yml:
// version: '3.8'
// services:
//   elasticsearch:
//     image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
//     environment:
//       - discovery.type=single-node
//       - xpack.security.enabled=false
//     ports: ["9200:9200"]
//
//   kibana:
//     image: docker.elastic.co/kibana/kibana:8.11.0
//     ports: ["5601:5601"]
//     depends_on: [elasticsearch]
//
//   logstash:
//     image: docker.elastic.co/logstash/logstash:8.11.0
//     volumes:
//       - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
//     depends_on: [elasticsearch]

// Kibana で検索例:
// level: "ERROR" AND orderId: 123
// → orderId=123 のエラーログを瞬時に検索`,
      },
      {
        title: "CloudWatch Logs連携",
        content:
          "AWS CloudWatch Logsは、AWSのマネージドログ管理サービスです。EC2、ECS、Lambdaなどから自動的にログを収集でき、ログの検索、メトリクスフィルタによるアラート、ログインサイトによる高度な分析が可能です。Spring BootアプリケーションのログをCloudWatch Logsに送信するには、CloudWatch Agentまたはlogback-awslogs-appenderを使用します。",
        code: `// CloudWatch Logs への連携方法

// 方法1: CloudWatch Agent（推奨、EC2/ECS向け）
// amazon-cloudwatch-agent.json:
// {
//   "logs": {
//     "logs_collected": {
//       "files": {
//         "collect_list": [
//           {
//             "file_path": "/var/log/myapp/app.json",
//             "log_group_name": "/myapp/application",
//             "log_stream_name": "{instance_id}",
//             "timestamp_format": "%Y-%m-%dT%H:%M:%S"
//           }
//         ]
//       }
//     }
//   }
// }

// 方法2: Logback Appender（直接送信）
// build.gradle:
// implementation 'ca.pjer:logback-awslogs-appender:1.6.0'

// logback-spring.xml:
// <appender name="CLOUDWATCH"
//     class="ca.pjer.logback.AwsLogsAppender">
//     <layout>
//         <pattern>[%thread] %-5level %logger{36} - %msg%n</pattern>
//     </layout>
//     <logGroupName>/myapp/application</logGroupName>
//     <logStreamUuidPrefix>stream-</logStreamUuidPrefix>
//     <logRegion>ap-northeast-1</logRegion>
// </appender>

// 方法3: ECS + awslogs ドライバ（コンテナ向け、最も簡単）
// ECS タスク定義:
// "logConfiguration": {
//     "logDriver": "awslogs",
//     "options": {
//         "awslogs-group": "/ecs/myapp",
//         "awslogs-region": "ap-northeast-1",
//         "awslogs-stream-prefix": "myapp"
//     }
// }
// → コンテナの stdout/stderr が自動的に CloudWatch Logs に送信

// CloudWatch Logs Insights でのクエリ:
// fields @timestamp, level, message, orderId
// | filter level = "ERROR"
// | sort @timestamp desc
// | limit 100`,
      },
      {
        title: "ログの集約と検索戦略",
        content:
          "マイクロサービス環境では、複数サービスのログを集約して横断的に検索できる仕組みが不可欠です。リクエストIDやトレースIDで一連の処理を追跡し、サービス間のログを相関させます。ログの保持期間、インデックス戦略、コスト管理も重要な検討事項です。ホットストレージ（直近のログ）とコールドストレージ（過去のログ）を分けることでコストを最適化できます。",
        code: `// マイクロサービスでのログ集約戦略

// 1. 共通ログフォーマット（全サービスで統一）
@Slf4j
public class OrderService {
    public void process(Order order) {
        // 全サービスで同じフィールド名を使用
        log.info("action=process_order, service=order-service, " +
                 "orderId={}, userId={}, status={}",
            order.getId(), order.getUserId(), "processing");
    }
}

// 2. トレースIDで複数サービスのログを相関
// Spring Cloud Sleuth / Micrometer Tracing
// → 自動的に traceId, spanId が MDC に追加される
//
// サービスA: traceId=abc123 注文受付
// サービスB: traceId=abc123 決済処理
// サービスC: traceId=abc123 在庫更新
// → traceId=abc123 で検索すると全サービスのログが見える

// 3. ログの保持期間とコスト最適化
// ┌────────────────┬──────────────┬─────────────┐
// │ カテゴリ        │ 保持期間      │ ストレージ   │
// ├────────────────┼──────────────┼─────────────┤
// │ アプリログ      │ 30日          │ ホット       │
// │ アクセスログ    │ 90日          │ ウォーム     │
// │ 監査ログ       │ 7年           │ コールド     │
// │ デバッグログ    │ 7日           │ ホット       │
// └────────────────┴──────────────┴─────────────┘

// 4. Elasticsearch Index Lifecycle Management
// PUT _ilm/policy/app-logs-policy
// {
//   "policy": {
//     "phases": {
//       "hot":    { "actions": { "rollover": { "max_size": "50gb" }}},
//       "warm":   { "min_age": "7d",  "actions": { "shrink": {}}},
//       "cold":   { "min_age": "30d", "actions": { "freeze": {}}},
//       "delete": { "min_age": "90d", "actions": { "delete": {}}}
//     }
//   }
// }`,
      },
    ],
  },
  {
    id: "logging-best-practices",
    title: "ログ設計のベストプラクティス",
    category: "practice",
    description:
      "ログ設計原則、セキュリティ（個人情報マスク）、パフォーマンスへの影響、ログローテーションを学ぶ",
    sections: [
      {
        title: "ログ設計の原則",
        content:
          "良いログ設計には5つの原則があります。(1)目的を明確にする（何のためのログか）、(2)適切なレベルを選ぶ、(3)必要十分な情報を含める（過不足なく）、(4)一貫したフォーマットを使う、(5)コンテキスト情報を付与する（リクエストID、ユーザーIDなど）。ログは「未来の自分」や「運用チーム」が読むことを意識して設計します。",
        code: `// ログ設計の5原則を適用した例

@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentGateway gateway;

    @Transactional
    public PaymentResult processPayment(PaymentRequest request) {

        // 原則1: 目的が明確（業務イベントの記録）
        // 原則3: 必要十分な情報（何を、いくら、どの方法で）
        // 原則5: コンテキスト（orderId, userId は MDC から自動出力）
        log.info("決済処理開始: orderId={}, amount={}, method={}",
            request.getOrderId(),
            request.getAmount(),
            request.getPaymentMethod());

        long startTime = System.currentTimeMillis();

        try {
            PaymentResult result = gateway.charge(request);
            long duration = System.currentTimeMillis() - startTime;

            // 原則2: 適切なレベル（成功 → INFO）
            // 原則4: 一貫したフォーマット（key=value形式）
            log.info("決済成功: orderId={}, transactionId={}, " +
                     "duration={}ms",
                request.getOrderId(),
                result.getTransactionId(),
                duration);

            return result;

        } catch (PaymentDeclinedException e) {
            // 原則2: ビジネス上の失敗 → WARN
            log.warn("決済拒否: orderId={}, reason={}",
                request.getOrderId(), e.getDeclineReason());
            throw e;

        } catch (PaymentSystemException e) {
            // 原則2: システムエラー → ERROR + スタックトレース
            log.error("決済システムエラー: orderId={}",
                request.getOrderId(), e);
            throw e;
        }
    }
}`,
      },
      {
        title: "セキュリティとログ（個人情報マスク）",
        content:
          "ログにはパスワード、クレジットカード番号、マイナンバー、個人情報などの機密データを含めてはなりません。GDPR、個人情報保護法などの規制にも抵触する可能性があります。マスク処理は、カスタムLogbackレイアウト、@ToString(exclude)、専用のマスクユーティリティなど複数の方法で実装できます。",
        code: `// 個人情報マスクの実装方法

// 1. Logback の PatternLayout をカスタマイズ
public class MaskingPatternLayout extends PatternLayout {

    private static final Map<Pattern, String> PATTERNS = Map.of(
        // クレジットカード番号
        Pattern.compile("(\\d{4})[- ]?(\\d{4})[- ]?(\\d{4})[- ]?(\\d{4})"),
            "$1-****-****-$4",
        // メールアドレス
        Pattern.compile("([\\w.]{2})[\\w.]*@([\\w.]+)"),
            "$1***@$2",
        // 電話番号
        Pattern.compile("(0\\d{1,3})[- ]?(\\d{2,4})[- ]?(\\d{4})"),
            "$1-****-$3"
    );

    @Override
    public String doLayout(ILoggingEvent event) {
        String message = super.doLayout(event);
        for (Map.Entry<Pattern, String> entry : PATTERNS.entrySet()) {
            message = entry.getKey().matcher(message)
                .replaceAll(entry.getValue());
        }
        return message;
    }
}

// 2. DTO / Entity の toString() で制御
@Data
public class UserDto {
    private String name;

    @ToString.Exclude  // Lombok: toString() から除外
    private String password;

    // カスタム toString() でマスク
    @Override
    public String toString() {
        return "UserDto{name=" + name +
               ", email=" + maskEmail(email) +
               ", phone=" + maskPhone(phone) + "}";
    }
}

// 3. マスクユーティリティ
public class LogMask {
    public static String email(String email) {
        if (email == null) return null;
        int at = email.indexOf('@');
        if (at <= 2) return "***" + email.substring(at);
        return email.substring(0, 2) + "***" + email.substring(at);
    }

    public static String creditCard(String number) {
        if (number == null || number.length() < 8) return "****";
        return number.substring(0, 4) + "-****-****-"
            + number.substring(number.length() - 4);
    }
}`,
      },
      {
        title: "ログのパフォーマンスへの影響",
        content:
          "ログ出力はI/O操作を伴うため、パフォーマンスに影響を与えます。同期ログはI/O待ちでスレッドがブロックされ、スループットが低下します。パフォーマンスへの影響を最小化するには、非同期ログ（AsyncAppender）の使用、不要なログレベルの抑制、文字列結合の回避、toString()の遅延評価が重要です。",
        code: `// ログのパフォーマンス最適化

// 1. 非同期ログ（必須）
// <appender name="ASYNC" class="ch.qos.logback.classic.AsyncAppender">
//     <queueSize>2048</queueSize>
//     <discardingThreshold>0</discardingThreshold>
//     <neverBlock>true</neverBlock>  ← キュー満杯時にブロックしない
//     <appender-ref ref="FILE"/>
// </appender>

// 2. 不要なログを出力しない
@Slf4j
public class PerformanceAwareLogging {

    // NG: 常に文字列結合が実行される
    public void bad(Order order) {
        // log.debug("Order: " + order.toDetailString());
    }

    // OK: ログレベルチェックで無駄な処理を回避
    public void good(Order order) {
        if (log.isDebugEnabled()) {
            log.debug("Order: {}", order.toDetailString());
        }
    }

    // OK: パラメータ化メッセージ（軽量な引数のみ）
    public void better(Order order) {
        log.debug("Order: id={}, status={}",
            order.getId(), order.getStatus());
    }
}

// 3. ログ量の目安
// ┌──────────────┬──────────────────────────────┐
// │ 環境          │ 目安                          │
// ├──────────────┼──────────────────────────────┤
// │ 開発          │ 制限なし（DEBUG以上）          │
// │ ステージング   │ ~100MB/時間                    │
// │ 本番          │ ~50MB/時間（INFO以上）          │
// │ 高負荷本番    │ ~200MB/時間（非同期必須）       │
// └──────────────┴──────────────────────────────┘

// 4. ログ出力のベンチマーク結果（1秒間のメッセージ数）
// 同期ファイル出力:        ~400,000 msg/s
// AsyncAppender:          ~2,000,000 msg/s
// Log4j2 Async Logger:   ~18,000,000 msg/s
// ログなし:               ~50,000,000 msg/s`,
      },
      {
        title: "ログローテーションとストレージ管理",
        content:
          "ログローテーションは、ログファイルが際限なく大きくなるのを防ぐ仕組みです。時間ベース（日次、週次）、サイズベース（100MBごと）、またはその組み合わせでファイルを分割し、古いファイルは圧縮・削除します。ディスク容量の枯渇はシステム障害に直結するため、totalSizeCap（総容量上限）の設定は必須です。",
        code: `// ログローテーション設定

// 1. Logback: サイズ + 時間ベースのローテーション
// <rollingPolicy
//     class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
//
//     <!-- ファイル名パターン（日付 + 連番） -->
//     <fileNamePattern>
//         \${LOG_PATH}/app.%d{yyyy-MM-dd}.%i.log.gz
//     </fileNamePattern>
//
//     <!-- 1ファイルの最大サイズ -->
//     <maxFileSize>100MB</maxFileSize>
//
//     <!-- 保持日数 -->
//     <maxHistory>30</maxHistory>
//
//     <!-- 総容量上限（これを超えると古いファイルから削除） -->
//     <totalSizeCap>3GB</totalSizeCap>
//
//     <!-- 起動時に古いログを削除 -->
//     <cleanHistoryOnStart>true</cleanHistoryOnStart>
// </rollingPolicy>

// 2. ストレージ容量の見積もり
// 1リクエストあたりのログ量:  約500バイト（INFO 3行程度）
// 1秒あたりのリクエスト数:    100 req/s
// 1時間のログ量:              500B × 100 × 3600 = 約180MB
// 1日のログ量:                約4.3GB
// 30日の保持:                 約130GB（圧縮で約13GB）

// 3. ディスク監視スクリプト
// #!/bin/bash
// LOG_DIR="/var/log/myapp"
// THRESHOLD=80
// USAGE=$(df "$LOG_DIR" | tail -1 | awk '{print $5}' | tr -d '%')
// if [ "$USAGE" -gt "$THRESHOLD" ]; then
//     echo "ディスク使用率が\${USAGE}%です" | mail -s "ALERT" admin@example.com
// fi

// 4. application.yml でのローテーション設定（簡易版）
// logging:
//   file:
//     name: /var/log/myapp/application.log
//   logback:
//     rollingpolicy:
//       max-file-size: 100MB
//       max-history: 30
//       total-size-cap: 3GB`,
      },
      {
        title: "ログ運用のアンチパターン",
        content:
          "ログ運用で避けるべきアンチパターンがあります。ログの出しすぎ（ディスク枯渇）、ログの出さなすぎ（障害調査不能）、機密情報の出力、例外の握りつぶし、System.out.printlnの使用、ログレベルの不適切な使用、ローテーション未設定などが代表的です。これらを避けることで、運用品質が大幅に向上します。",
        code: `// ログのアンチパターンと改善方法

@Slf4j
public class LoggingAntiPatterns {

    // NG1: 例外の握りつぶし
    public void antiPattern1() {
        try {
            riskyOperation();
        } catch (Exception e) {
            // 何もしない or メッセージだけ
            // log.error("エラー");  // スタックトレースなし！
        }
    }
    // OK: 例外オブジェクトを渡す
    public void fixed1() {
        try {
            riskyOperation();
        } catch (Exception e) {
            log.error("処理失敗: operation=risky", e);
            throw new ServiceException("処理に失敗しました", e);
        }
    }

    // NG2: System.out.println の使用
    public void antiPattern2() {
        // System.out.println("DEBUG: " + value);
        // → レベル制御不可、ファイル出力不可、フォーマット不統一
    }
    // OK: SLF4J を使用
    public void fixed2() {
        log.debug("value={}", value);
    }

    // NG3: ループ内での大量ログ
    public void antiPattern3(List<Item> items) {
        for (Item item : items) {
            // log.info("Processing item: {}", item);  // 10万件のINFO！
        }
    }
    // OK: サマリーのみログ出力
    public void fixed3(List<Item> items) {
        log.info("バッチ処理開始: 件数={}", items.size());
        int success = 0, failure = 0;
        for (Item item : items) {
            try {
                process(item);
                success++;
            } catch (Exception e) {
                failure++;
                log.warn("処理失敗: itemId={}", item.getId());
            }
        }
        log.info("バッチ処理完了: 成功={}, 失敗={}", success, failure);
    }

    // NG4: 意味のないログメッセージ
    // log.info("here");
    // log.debug("test");
    // log.error("error occurred");  // 何のエラー？

    // OK: 5W1H が分かるメッセージ
    // log.info("ユーザー登録完了: userId={}, email={}", id, email);
    // log.error("DB接続失敗: host={}, retry={}/3", host, attempt, e);
}`,
      },
    ],
  },
  {
    id: "monitoring-alerting",
    title: "監視とアラート",
    category: "practice",
    description:
      "アラート設計、メトリクスとログの連携、分散トレーシング、Zipkin/Jaegerを学ぶ",
    sections: [
      {
        title: "アラート設計",
        content:
          "アラートは、ログやメトリクスの異常を検知して運用チームに通知する仕組みです。効果的なアラート設計では、アラート疲れ（大量の不要通知）を避けつつ、重要な問題を見逃さないバランスが重要です。アラートは「即座に対応が必要なもの」だけに限定し、「調査が必要だが緊急ではないもの」はダッシュボードで監視します。",
        code: `// アラート設計の実践

// 1. ログベースのアラート条件（CloudWatch Logs の例）
// メトリクスフィルタ:
// { $.level = "ERROR" }
// → 5分間に ERROR が10件以上 → アラート発火

// 2. Spring Boot でカスタムメトリクスを追加
@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final MeterRegistry meterRegistry;
    private final Counter orderErrorCounter;
    private final Timer orderProcessTimer;

    public OrderService(MeterRegistry registry) {
        this.meterRegistry = registry;
        this.orderErrorCounter = Counter.builder("orders.errors")
            .description("注文処理エラー数")
            .register(registry);
        this.orderProcessTimer = Timer.builder("orders.process.time")
            .description("注文処理時間")
            .register(registry);
    }

    public Order processOrder(OrderRequest request) {
        return orderProcessTimer.record(() -> {
            try {
                Order order = doProcess(request);
                log.info("注文処理成功: orderId={}", order.getId());
                return order;
            } catch (Exception e) {
                orderErrorCounter.increment();
                log.error("注文処理失敗: userId={}", request.getUserId(), e);
                throw e;
            }
        });
    }
}

// 3. アラートレベルの分類
// ┌──────────┬────────────────────────┬──────────────┐
// │ レベル    │ 条件例                  │ 通知先        │
// ├──────────┼────────────────────────┼──────────────┤
// │ Critical │ サービスダウン           │ PagerDuty    │
// │ Warning  │ ERROR率 > 5%           │ Slack + メール│
// │ Info     │ レスポンス遅延 > 3秒    │ Slack        │
// └──────────┴────────────────────────┴──────────────┘`,
      },
      {
        title: "メトリクスとログの連携",
        content:
          "メトリクス（数値データ）とログ（テキストデータ）を連携させることで、問題の検知から原因特定までをスムーズに行えます。メトリクスで「何が起きているか」を把握し、ログで「なぜ起きたか」を調査するのが基本パターンです。Spring Boot Actuator + Micrometer + Prometheusの組み合わせが一般的です。",
        code: `// メトリクスとログの連携

// 1. Spring Boot Actuator + Micrometer 設定
// build.gradle:
// implementation 'org.springframework.boot:spring-boot-starter-actuator'
// implementation 'io.micrometer:micrometer-registry-prometheus'

// application.yml:
// management:
//   endpoints:
//     web:
//       exposure:
//         include: prometheus, health, metrics, loggers
//   metrics:
//     tags:
//       application: my-service

// 2. カスタムメトリクスとログの両方を出力
@Slf4j
@Component
@RequiredArgsConstructor
public class ApiMonitor {

    private final MeterRegistry registry;

    public void recordApiCall(String endpoint, int status, long durationMs) {
        // メトリクス: Prometheus で集計・アラート
        registry.timer("api.request.duration",
            "endpoint", endpoint,
            "status", String.valueOf(status))
            .record(durationMs, TimeUnit.MILLISECONDS);

        // ログ: 詳細な調査用
        if (status >= 500) {
            log.error("API エラー: endpoint={}, status={}, duration={}ms",
                endpoint, status, durationMs);
        } else if (durationMs > 3000) {
            log.warn("API 遅延: endpoint={}, duration={}ms",
                endpoint, durationMs);
        }
    }
}

// 3. Grafana ダッシュボードから Kibana へドリルダウン
// Grafana: エラー率の急上昇を検知
//   → グラフの該当時間帯をクリック
//   → Kibana へ遷移（時間範囲が引き継がれる）
//   → 詳細なログで原因を調査

// Prometheus アラートルール例:
// groups:
//   - name: api-alerts
//     rules:
//       - alert: HighErrorRate
//         expr: rate(api_request_duration_count{status=~"5.."}[5m])
//               / rate(api_request_duration_count[5m]) > 0.05
//         for: 5m
//         labels:
//           severity: warning
//         annotations:
//           summary: "APIエラー率が5%を超過"`,
      },
      {
        title: "分散トレーシング",
        content:
          "分散トレーシングは、マイクロサービス間を横断するリクエストの流れを追跡する技術です。1つのリクエストに一意のトレースIDを割り当て、各サービスでのスパン（処理単位）を記録します。OpenTelemetry、Micrometer Tracingが標準的な実装で、Zipkin、Jaeger、AWS X-Rayが可視化ツールとして使われます。",
        code: `// 分散トレーシングの実装

// 1. 依存関係（Spring Boot 3.x + Micrometer Tracing）
// build.gradle:
// implementation 'org.springframework.boot:spring-boot-starter-actuator'
// implementation 'io.micrometer:micrometer-tracing-bridge-brave'
// implementation 'io.zipkin.reporter2:zipkin-reporter-brave'

// 2. application.yml
// management:
//   tracing:
//     sampling:
//       probability: 1.0  # 全リクエストをトレース（本番では0.1等に）
//   zipkin:
//     tracing:
//       endpoint: http://zipkin:9411/api/v2/spans

// 3. 自動的にトレースIDがログに追加される
// ログ出力例:
// 2024-01-15 10:30:45.123 INFO [my-service,abc123def456,span789] ...
//                               ^^^^^^^^^ ^^^^^^^^^^^^^^ ^^^^^^^
//                               サービス名  トレースID     スパンID

// 4. logback-spring.xml でトレース情報をログに含める
// <pattern>
//   %d{ISO8601} %-5level [%thread]
//   [traceId=%X{traceId:-} spanId=%X{spanId:-}]
//   %logger{36} - %msg%n
// </pattern>

// 5. サービス間のトレース伝播
// RestTemplate / WebClient は自動的にヘッダーを伝播
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder.build();
        // Micrometer Tracing が自動的にヘッダーを追加:
        // traceparent: 00-abc123def456-span789-01
    }
}

// 6. カスタムスパンの作成
@Slf4j
@Service
@RequiredArgsConstructor
public class PaymentService {

    private final ObservationRegistry observationRegistry;

    public PaymentResult charge(PaymentRequest request) {
        return Observation.createNotStarted("payment.charge",
                observationRegistry)
            .lowCardinalityKeyValue("method",
                request.getPaymentMethod().name())
            .observe(() -> {
                log.info("決済処理: orderId={}", request.getOrderId());
                return gateway.charge(request);
            });
    }
}`,
      },
      {
        title: "Zipkin/Jaegerによる可視化",
        content:
          "ZipkinとJaegerは、分散トレーシングデータを可視化するオープンソースツールです。Zipkinはシンプルで導入が容易、JaegerはCNCF（Cloud Native Computing Foundation）プロジェクトで機能が豊富です。サービス間の依存関係、レイテンシー、エラーの発生箇所をグラフィカルに表示し、パフォーマンスボトルネックの特定に役立ちます。",
        code: `// Zipkin / Jaeger の導入

// 1. Zipkin の起動（Docker）
// docker run -d -p 9411:9411 openzipkin/zipkin

// 2. Jaeger の起動（Docker）
// docker run -d --name jaeger \\
//   -p 16686:16686 \\  # Jaeger UI
//   -p 4317:4317 \\    # OTLP gRPC
//   -p 4318:4318 \\    # OTLP HTTP
//   jaegertracing/all-in-one:latest

// 3. Jaeger + OpenTelemetry の設定
// build.gradle:
// implementation 'io.micrometer:micrometer-tracing-bridge-otel'
// implementation 'io.opentelemetry:opentelemetry-exporter-otlp'

// application.yml:
// management:
//   tracing:
//     sampling:
//       probability: 0.1  # 本番: 10%サンプリング
// otel:
//   exporter:
//     otlp:
//       endpoint: http://jaeger:4318

// 4. Docker Compose で全スタック構築
// version: '3.8'
// services:
//   app:
//     build: .
//     environment:
//       - MANAGEMENT_ZIPKIN_TRACING_ENDPOINT=http://zipkin:9411/api/v2/spans
//     depends_on: [zipkin, elasticsearch]
//
//   zipkin:
//     image: openzipkin/zipkin
//     ports: ["9411:9411"]
//     environment:
//       - STORAGE_TYPE=elasticsearch
//       - ES_HOSTS=elasticsearch:9200
//
//   elasticsearch:
//     image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
//     environment:
//       - discovery.type=single-node

// 5. トレースの活用シーン
// - レスポンスが遅いリクエストの特定
//   → Zipkin UI で duration > 3s でフィルタ
// - サービス間の依存関係の可視化
//   → Jaeger の Dependencies ビュー
// - エラーが発生したサービスの特定
//   → error=true でフィルタし、スパンを確認`,
      },
      {
        title: "統合監視の設計",
        content:
          "ログ、メトリクス、トレースの3つの柱（Three Pillars of Observability）を統合した監視設計が、現代のシステム運用では求められます。Grafanaをダッシュボードの中心に据え、Prometheus（メトリクス）、Loki/Elasticsearch（ログ）、Tempo/Zipkin（トレース）を統合することで、問題の検知から原因特定、解決までのフローを効率化できます。",
        code: `// 統合監視（Observability）の全体設計

// Three Pillars of Observability:
// 1. メトリクス（Metrics）: 何が起きているか（数値）
// 2. ログ（Logs）: なぜ起きたか（詳細テキスト）
// 3. トレース（Traces）: どこで起きたか（サービス間フロー）

// 推奨スタック:
// ┌──────────────┬────────────┬───────────────┐
// │ ピラー        │ 収集       │ 可視化         │
// ├──────────────┼────────────┼───────────────┤
// │ メトリクス    │ Prometheus │ Grafana        │
// │ ログ         │ Loki       │ Grafana        │
// │ トレース      │ Tempo      │ Grafana        │
// └──────────────┴────────────┴───────────────┘
// ※ 全て Grafana で統合的に閲覧可能

// 障害対応フロー:
// 1. Grafana アラート: "注文サービスのエラー率が5%超過"
// 2. メトリクスダッシュボード: エラー率のグラフを確認
//    → 10:30 から急増
// 3. ログ検索: 10:30 以降の ERROR ログを確認
//    → "決済API タイムアウト" が大量に発生
// 4. トレース: 失敗リクエストのトレースを確認
//    → 決済サービスのレスポンスが 30秒（タイムアウト）
// 5. 原因特定: 決済サービスのDB接続プール枯渇
// 6. 対応: DB接続プールサイズを拡大、再起動

// Spring Boot でのObservability設定まとめ
// build.gradle:
// implementation 'org.springframework.boot:spring-boot-starter-actuator'
// implementation 'io.micrometer:micrometer-registry-prometheus'
// implementation 'io.micrometer:micrometer-tracing-bridge-brave'
// implementation 'io.zipkin.reporter2:zipkin-reporter-brave'
// implementation 'com.github.loki4j:loki-logback-appender:1.4.2'

// application.yml:
// management:
//   endpoints:
//     web:
//       exposure:
//         include: prometheus, health, metrics, loggers
//   tracing:
//     sampling:
//       probability: 0.1
//   zipkin:
//     tracing:
//       endpoint: http://tempo:9411/api/v2/spans`,
      },
    ],
  },
];

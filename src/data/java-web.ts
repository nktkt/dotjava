export interface WebSection {
  title: string;
  content: string;
  code?: string;
}

export interface WebChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: WebSection[];
}

export const webCategories = [
  { id: "foundation", name: "Web基盤", color: "#0017C1" },
  { id: "servlet", name: "Servlet/JSP", color: "#259D63" },
  { id: "spring", name: "Spring Boot", color: "#259D63" },
  { id: "data", name: "データアクセス", color: "#C26A00" },
  { id: "security", name: "セキュリティ", color: "#EC0000" },
  { id: "api", name: "API開発", color: "#6B21A8" },
  { id: "testing", name: "テスト", color: "#0891B2" },
  { id: "deploy", name: "ビルド・デプロイ", color: "#546E7A" },
  { id: "tomcat", name: "Tomcat", color: "#000F80" },
] as const;

export const webChapters: WebChapter[] = [
  // ===== Web基盤 =====
  {
    id: "http-basics",
    title: "HTTP の基礎",
    category: "foundation",
    description: "Webアプリ開発の基盤となるHTTPプロトコルの仕組みを理解する",
    sections: [
      {
        title: "HTTPリクエストとレスポンス",
        content:
          "HTTPはクライアント（ブラウザ）とサーバー間の通信プロトコルです。クライアントがリクエストを送り、サーバーがレスポンスを返す「リクエスト-レスポンスモデル」で動作します。",
        code: `// === HTTPリクエストの構造 ===
// リクエストライン
GET /api/users?page=1 HTTP/1.1

// ヘッダー
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGciOi...

// === HTTPレスポンスの構造 ===
// ステータスライン
HTTP/1.1 200 OK

// ヘッダー
Content-Type: application/json
Content-Length: 128

// ボディ
{"users": [{"id": 1, "name": "Alice"}]}`,
      },
      {
        title: "HTTPメソッド",
        content:
          "リソースに対する操作を表すメソッド。RESTful APIではCRUD操作と対応させて設計します。",
        code: `// 主要なHTTPメソッドとCRUD操作の対応
//
// GET     - リソースの取得    (Read)
// POST    - リソースの作成    (Create)
// PUT     - リソースの全更新   (Update - 全体)
// PATCH   - リソースの部分更新 (Update - 部分)
// DELETE  - リソースの削除    (Delete)
//
// === ステータスコード ===
// 200 OK            - 成功
// 201 Created       - リソース作成成功
// 204 No Content    - 成功（レスポンスボディなし）
// 301 Moved         - 恒久的リダイレクト
// 400 Bad Request   - リクエスト不正
// 401 Unauthorized  - 認証が必要
// 403 Forbidden     - アクセス禁止
// 404 Not Found     - リソース未検出
// 500 Internal Error - サーバーエラー`,
      },
    ],
  },
  {
    id: "web-architecture",
    title: "Java Webアプリのアーキテクチャ",
    category: "foundation",
    description:
      "MVC、レイヤードアーキテクチャなど、Java Webアプリの設計パターン",
    sections: [
      {
        title: "MVCパターン",
        content:
          "Model-View-Controller パターンはWebアプリの基本設計。Model（データ・ビジネスロジック）、View（画面表示）、Controller（リクエスト処理・振り分け）に責務を分離します。",
        code: `// === MVCの責務分離 ===

// Controller - リクエスト受付・レスポンス返却
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}

// Service（ビジネスロジック層）
@Service
public class UserService {
    private final UserRepository userRepository;

    public UserResponse findById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException(id));
        return UserResponse.from(user);
    }
}

// Repository（データアクセス層）
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
}

// Model / Entity
@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
}

// DTO（Data Transfer Object）
public record UserResponse(Long id, String name, String email) {
    public static UserResponse from(User user) {
        return new UserResponse(user.getId(), user.getName(), user.getEmail());
    }
}`,
      },
      {
        title: "レイヤードアーキテクチャ",
        content:
          "責務ごとに層（レイヤー）を分けて依存関係を整理する設計。上位層は下位層に依存するが、逆方向の依存は持たないのが原則です。",
        code: `// レイヤー構成（上位 → 下位）
//
// ┌─────────────────────────────────┐
// │  Presentation Layer             │  ← Controller, DTO
// │  (リクエスト/レスポンス処理)       │
// ├─────────────────────────────────┤
// │  Service Layer                  │  ← ビジネスロジック
// │  (業務処理、トランザクション管理)   │
// ├─────────────────────────────────┤
// │  Repository Layer               │  ← データアクセス
// │  (DB操作、外部API呼び出し)        │
// ├─────────────────────────────────┤
// │  Domain / Entity Layer          │  ← ドメインモデル
// │  (ビジネスオブジェクト)            │
// └─────────────────────────────────┘

// パッケージ構成の例
// com.example.myapp
// ├── controller/      ← Presentation
// │   └── UserController.java
// ├── service/         ← Service
// │   └── UserService.java
// ├── repository/      ← Repository
// │   └── UserRepository.java
// ├── entity/          ← Domain
// │   └── User.java
// ├── dto/             ← DTO
// │   ├── UserRequest.java
// │   └── UserResponse.java
// └── exception/       ← 例外
//     └── UserNotFoundException.java`,
      },
    ],
  },

  // ===== Servlet/JSP =====
  {
    id: "servlet",
    title: "Servlet",
    category: "servlet",
    description:
      "Java Webアプリの基盤技術。HTTPリクエストを処理するサーバーサイドコンポーネント",
    sections: [
      {
        title: "Servletの基本",
        content:
          "Servletは Jakarta Servlet API（旧 Java Servlet API）に基づくサーバーサイドコンポーネントです。HTTPリクエストを受け取り、処理し、レスポンスを返します。Spring MVCの内部でも使われている基盤技術です。",
        code: `// 基本的なServlet
@WebServlet("/hello")
public class HelloServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        // リクエストパラメータの取得
        String name = request.getParameter("name");
        if (name == null) name = "World";

        // レスポンスの設定
        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.println("<html><body>");
        out.println("<h1>Hello, " + name + "!</h1>");
        out.println("</body></html>");
    }

    @Override
    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if (authenticate(username, password)) {
            HttpSession session = request.getSession();
            session.setAttribute("user", username);
            response.sendRedirect("/dashboard");
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}`,
      },
      {
        title: "フィルターとリスナー",
        content:
          "フィルターはリクエスト/レスポンスの前後処理を行う仕組み。リスナーはサーブレットコンテナのイベント（セッション作成、リクエスト開始等）を検知します。",
        code: `// フィルター - 全リクエストにログ出力
@WebFilter("/*")
public class LoggingFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request,
                         ServletResponse response,
                         FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        long start = System.currentTimeMillis();

        // 前処理
        System.out.println("Request: " + req.getMethod()
            + " " + req.getRequestURI());

        chain.doFilter(request, response);  // 次のフィルタ or サーブレットへ

        // 後処理
        long elapsed = System.currentTimeMillis() - start;
        System.out.println("Response time: " + elapsed + "ms");
    }
}

// セッションリスナー
@WebListener
public class SessionListener implements HttpSessionListener {
    @Override
    public void sessionCreated(HttpSessionEvent se) {
        System.out.println("セッション作成: " + se.getSession().getId());
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        System.out.println("セッション破棄: " + se.getSession().getId());
    }
}`,
      },
    ],
  },
  {
    id: "jsp-thymeleaf",
    title: "JSP と Thymeleaf",
    category: "servlet",
    description:
      "サーバーサイドのHTMLテンプレートエンジン。JSPの基本とモダンなThymeleafの使い方",
    sections: [
      {
        title: "JSP (JavaServer Pages)",
        content:
          "HTMLにJavaコードを埋め込むテンプレート技術。Servletに変換されて実行されます。レガシーだが理解しておくべき基盤技術です。",
        code: `<%-- user-list.jsp --%>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>

<html>
<body>
    <h1>ユーザー一覧</h1>

    <%-- JSTL の c:forEach でループ --%>
    <table>
        <tr><th>ID</th><th>名前</th><th>メール</th></tr>
        <c:forEach var="user" items="\${users}">
            <tr>
                <td>\${user.id}</td>
                <td>\${user.name}</td>
                <td>\${user.email}</td>
            </tr>
        </c:forEach>
    </table>

    <%-- 条件分岐 --%>
    <c:if test="\${empty users}">
        <p>ユーザーが登録されていません。</p>
    </c:if>
</body>
</html>`,
      },
      {
        title: "Thymeleaf（推奨テンプレートエンジン）",
        content:
          "Spring Boot で推奨されるモダンなテンプレートエンジン。HTMLとして直接ブラウザで表示できる「ナチュラルテンプレート」が特徴です。",
        code: `<!-- templates/user-list.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <title>ユーザー一覧</title>
</head>
<body>
    <h1>ユーザー一覧</h1>

    <!-- ループ -->
    <table>
        <tr><th>ID</th><th>名前</th><th>メール</th></tr>
        <tr th:each="user : \${users}">
            <td th:text="\${user.id}">1</td>
            <td th:text="\${user.name}">Alice</td>
            <td th:text="\${user.email}">alice@example.com</td>
        </tr>
    </table>

    <!-- 条件分岐 -->
    <p th:if="\${#lists.isEmpty(users)}">
        ユーザーが登録されていません。
    </p>

    <!-- リンク -->
    <a th:href="@{/users/{id}(id=\${user.id})}">詳細</a>

    <!-- フォーム -->
    <form th:action="@{/users}" th:object="\${userForm}" method="post">
        <input type="text" th:field="*{name}" placeholder="名前" />
        <span th:if="\${#fields.hasErrors('name')}"
              th:errors="*{name}" class="error"></span>
        <input type="email" th:field="*{email}" placeholder="メール" />
        <button type="submit">登録</button>
    </form>
</body>
</html>`,
      },
      {
        title: "Thymeleaf を使う Controller",
        content:
          "Spring MVC の Controller から Thymeleaf テンプレートにデータを渡すパターンです。",
        code: `@Controller
@RequestMapping("/users")
public class UserViewController {

    private final UserService userService;

    public UserViewController(UserService userService) {
        this.userService = userService;
    }

    // 一覧表示
    @GetMapping
    public String list(Model model) {
        model.addAttribute("users", userService.findAll());
        return "user-list";  // templates/user-list.html
    }

    // 新規登録フォーム表示
    @GetMapping("/new")
    public String newForm(Model model) {
        model.addAttribute("userForm", new UserForm());
        return "user-form";
    }

    // 登録処理
    @PostMapping
    public String create(@Valid @ModelAttribute UserForm form,
                         BindingResult result, Model model) {
        if (result.hasErrors()) {
            return "user-form";  // バリデーションエラー時はフォーム再表示
        }
        userService.create(form);
        return "redirect:/users";  // PRGパターン
    }
}`,
      },
    ],
  },

  // ===== Spring Boot =====
  {
    id: "spring-boot-intro",
    title: "Spring Boot 入門",
    category: "spring",
    description:
      "Spring Boot の基本概念、プロジェクト作成、自動設定の仕組み",
    sections: [
      {
        title: "Spring Boot とは",
        content:
          "Spring Framework を基盤としたアプリケーションフレームワーク。自動設定（Auto-configuration）により最小限の設定でWebアプリを構築できます。組み込みサーバー（Tomcat）により、JARファイル単体で実行可能。",
        code: `// === Spring Initializr でプロジェクト作成 ===
// https://start.spring.io/ または CLI

// build.gradle (Gradle)
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.4.1'
    id 'io.spring.dependency-management' version '1.1.7'
}

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    runtimeOnly 'com.h2database:h2'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}`,
      },
      {
        title: "最初のアプリケーション",
        content:
          "Spring Boot アプリケーションの起点となるメインクラスと、基本的な REST Controller の作り方です。",
        code: `// メインクラス
@SpringBootApplication  // = @Configuration + @EnableAutoConfiguration + @ComponentScan
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}

// REST Controller
@RestController
@RequestMapping("/api/hello")
public class HelloController {

    @GetMapping
    public Map<String, String> hello() {
        return Map.of("message", "Hello, Spring Boot!");
    }

    @GetMapping("/{name}")
    public Map<String, String> helloName(@PathVariable String name) {
        return Map.of("message", "Hello, " + name + "!");
    }
}

// application.yml（設定ファイル）
// server:
//   port: 8080
// spring:
//   datasource:
//     url: jdbc:h2:mem:testdb
//   jpa:
//     hibernate:
//       ddl-auto: create-drop
//     show-sql: true`,
      },
      {
        title: "DI（依存性注入）と Bean",
        content:
          "Spring の核心機能。オブジェクトの生成と依存関係の解決をフレームワークに委譲します。@Component, @Service, @Repository で Bean を登録し、コンストラクタインジェクションで注入するのが推奨パターン。",
        code: `// Bean の登録
@Service  // ビジネスロジック層の Bean
public class OrderService {

    private final OrderRepository orderRepository;
    private final NotificationService notificationService;

    // コンストラクタインジェクション（推奨）
    // Spring が自動的に依存オブジェクトを注入
    public OrderService(OrderRepository orderRepository,
                        NotificationService notificationService) {
        this.orderRepository = orderRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = new Order(request.userId(), request.items());
        Order saved = orderRepository.save(order);
        notificationService.sendOrderConfirmation(saved);
        return saved;
    }
}

// @Configuration でBeanを手動登録
@Configuration
public class AppConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplateBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .readTimeout(Duration.ofSeconds(10))
            .build();
    }

    @Bean
    @Profile("production")  // 本番環境のみ有効
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager("users", "products");
    }
}`,
      },
    ],
  },
  {
    id: "spring-web-mvc",
    title: "Spring Web MVC",
    category: "spring",
    description:
      "Controllerの書き方、リクエストマッピング、バリデーション、例外ハンドリング",
    sections: [
      {
        title: "Controller の詳細",
        content:
          "Spring MVC の Controller は、リクエストのマッピング、パラメータバインディング、レスポンス生成を担当します。",
        code: `@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/users?page=0&size=20&sort=name
    @GetMapping
    public Page<UserResponse> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "name") String sort) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
        return userService.findAll(pageable);
    }

    // GET /api/users/123
    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable Long id) {
        return userService.findById(id);
    }

    // POST /api/users
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse create(@Valid @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }

    // PUT /api/users/123
    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id,
                               @Valid @RequestBody UpdateUserRequest request) {
        return userService.update(id, request);
    }

    // DELETE /api/users/123
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        userService.delete(id);
    }
}`,
      },
      {
        title: "バリデーション",
        content:
          "Bean Validation（Jakarta Validation）でリクエストのバリデーションを宣言的に定義します。",
        code: `// リクエストDTO にバリデーションルールを定義
public record CreateUserRequest(
    @NotBlank(message = "名前は必須です")
    @Size(max = 100, message = "名前は100文字以内です")
    String name,

    @NotBlank(message = "メールは必須です")
    @Email(message = "メール形式が不正です")
    String email,

    @NotNull(message = "年齢は必須です")
    @Min(value = 0, message = "年齢は0以上です")
    @Max(value = 150, message = "年齢は150以下です")
    Integer age,

    @Pattern(regexp = "^\\\\d{3}-\\\\d{4}$", message = "郵便番号形式が不正です")
    String zipCode
) {}

// カスタムバリデーション
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueEmailValidator.class)
public @interface UniqueEmail {
    String message() default "このメールアドレスは既に登録されています";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class UniqueEmailValidator
        implements ConstraintValidator<UniqueEmail, String> {
    private final UserRepository userRepository;

    public UniqueEmailValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext ctx) {
        return !userRepository.existsByEmail(email);
    }
}`,
      },
      {
        title: "例外ハンドリング",
        content:
          "@ControllerAdvice でアプリ全体の例外処理を一元管理できます。",
        code: `// グローバル例外ハンドラー
@RestControllerAdvice
public class GlobalExceptionHandler {

    // 404 Not Found
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse("NOT_FOUND", ex.getMessage());
    }

    // 400 Bad Request (バリデーションエラー)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .toList();
        return new ErrorResponse("VALIDATION_ERROR",
            "入力内容に誤りがあります", errors);
    }

    // 500 Internal Server Error
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGeneral(Exception ex) {
        return new ErrorResponse("INTERNAL_ERROR",
            "サーバーエラーが発生しました");
    }
}

// エラーレスポンスDTO
public record ErrorResponse(
    String code,
    String message,
    List<String> details
) {
    public ErrorResponse(String code, String message) {
        this(code, message, List.of());
    }
}

// カスタム例外
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " が見つかりません (ID: " + id + ")");
    }
}`,
      },
    ],
  },

  // ===== データアクセス =====
  {
    id: "jdbc",
    title: "JDBC",
    category: "data",
    description:
      "Java Database Connectivity。データベースアクセスの基盤技術",
    sections: [
      {
        title: "JDBC の基本",
        content:
          "JDBC は Java からリレーショナルデータベースに接続するための標準API。ドライバをロードし、Connection → Statement → ResultSet の流れでデータベースを操作します。",
        code: `// JDBC による基本的なDB操作
String url = "jdbc:mysql://localhost:3306/mydb";
String user = "root";
String password = "secret";

// try-with-resources で自動クローズ
try (Connection conn = DriverManager.getConnection(url, user, password)) {

    // SELECT - PreparedStatement でSQLインジェクション防止
    String sql = "SELECT id, name, email FROM users WHERE name LIKE ?";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setString(1, "%Alice%");

        try (ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                long id = rs.getLong("id");
                String name = rs.getString("name");
                String email = rs.getString("email");
                System.out.println(id + ": " + name + " <" + email + ">");
            }
        }
    }

    // INSERT
    String insertSql = "INSERT INTO users (name, email) VALUES (?, ?)";
    try (PreparedStatement ps = conn.prepareStatement(insertSql,
            Statement.RETURN_GENERATED_KEYS)) {
        ps.setString(1, "Bob");
        ps.setString(2, "bob@example.com");
        ps.executeUpdate();

        try (ResultSet keys = ps.getGeneratedKeys()) {
            if (keys.next()) {
                long newId = keys.getLong(1);
                System.out.println("新しいID: " + newId);
            }
        }
    }

    // トランザクション
    conn.setAutoCommit(false);
    try {
        // 複数の更新処理
        conn.commit();
    } catch (SQLException e) {
        conn.rollback();
        throw e;
    }
}`,
      },
    ],
  },
  {
    id: "spring-data-jpa",
    title: "Spring Data JPA",
    category: "data",
    description:
      "JPA / Hibernate を活用したデータアクセス。Repository パターンで簡潔にCRUD操作",
    sections: [
      {
        title: "Entity の定義",
        content:
          "JPA (Jakarta Persistence API) でデータベースのテーブルに対応する Entity クラスを定義します。",
        code: `@Entity
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
    private UserStatus status = UserStatus.ACTIVE;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // 1対多のリレーション
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<Order> orders = new ArrayList<>();

    // コンストラクタ、getter/setter ...
}

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private BigDecimal totalAmount;
    private LocalDateTime orderedAt;
}`,
      },
      {
        title: "Repository インターフェース",
        content:
          "Spring Data JPA は、インターフェースの定義だけで CRUD 操作と複雑なクエリを自動実装してくれます。",
        code: `// 基本的な Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // メソッド名からクエリを自動生成
    Optional<User> findByEmail(String email);
    List<User> findByNameContainingIgnoreCase(String name);
    List<User> findByStatusOrderByCreatedAtDesc(UserStatus status);
    boolean existsByEmail(String email);
    long countByStatus(UserStatus status);

    // ページネーション
    Page<User> findByStatus(UserStatus status, Pageable pageable);

    // @Query でカスタムJPQL
    @Query("SELECT u FROM User u WHERE u.createdAt >= :since")
    List<User> findRecentUsers(@Param("since") LocalDateTime since);

    // ネイティブSQL
    @Query(value = "SELECT * FROM users WHERE email LIKE %:domain",
           nativeQuery = true)
    List<User> findByEmailDomain(@Param("domain") String domain);

    // 更新クエリ
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
    int updateStatus(@Param("id") Long id, @Param("status") UserStatus status);
}

// Service での使用例
@Service
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Page<UserResponse> findAll(Pageable pageable) {
        return userRepository.findAll(pageable)
            .map(UserResponse::from);
    }

    @Transactional
    public UserResponse create(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException(request.email());
        }
        User user = new User(request.name(), request.email());
        return UserResponse.from(userRepository.save(user));
    }
}`,
      },
    ],
  },

  // ===== セキュリティ =====
  {
    id: "spring-security",
    title: "Spring Security",
    category: "security",
    description:
      "認証・認可、CSRF対策、CORS設定、パスワードハッシュ化など",
    sections: [
      {
        title: "Spring Security の基本設定",
        content:
          "Spring Security はフィルターチェーンベースのセキュリティフレームワーク。認証（Authentication: 誰か？）と認可（Authorization: 何ができるか？）を管理します。",
        code: `// セキュリティ設定
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .csrf(csrf -> csrf
                .csrfTokenRepository(
                    CookieCsrfTokenRepository.withHttpOnlyFalse()))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/public/**", "/api/auth/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/**").authenticated()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
                .permitAll()
            );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
      },
      {
        title: "ユーザー認証の実装",
        content:
          "UserDetailsService を実装してデータベースからユーザー情報を取得する認証処理を構築します。",
        code: `// UserDetailsService の実装
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() ->
                new UsernameNotFoundException("ユーザーが見つかりません: " + email));

        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getEmail())
            .password(user.getPasswordHash())
            .roles(user.getRole().name())
            .build();
    }
}

// ユーザー登録
@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new DuplicateEmailException(request.email());
        }
        User user = new User();
        user.setName(request.name());
        user.setEmail(request.email());
        // パスワードをBCryptでハッシュ化して保存
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setRole(Role.USER);
        userRepository.save(user);
    }
}`,
      },
      {
        title: "JWT 認証（REST API向け）",
        content:
          "ステートレスなREST APIではセッションの代わりにJWT (JSON Web Token) を使用して認証します。",
        code: `// JWT ユーティリティ
@Component
public class JwtUtil {
    @Value("\${jwt.secret}")
    private String secret;

    @Value("\${jwt.expiration:86400000}")
    private long expiration;  // 24時間

    public String generateToken(String username) {
        return Jwts.builder()
            .subject(username)
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload()
            .getSubject();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername())
            && !isTokenExpired(token);
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
}

// JWT 認証フィルター
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            String username = jwtUtil.extractUsername(token);

            if (username != null && SecurityContextHolder
                    .getContext().getAuthentication() == null) {
                UserDetails user = userDetailsService
                    .loadUserByUsername(username);
                if (jwtUtil.isTokenValid(token, user)) {
                    var auth = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities());
                    SecurityContextHolder.getContext()
                        .setAuthentication(auth);
                }
            }
        }
        chain.doFilter(request, response);
    }
}`,
      },
    ],
  },

  // ===== API開発 =====
  {
    id: "rest-api",
    title: "RESTful API 設計",
    category: "api",
    description:
      "REST API の設計原則、エンドポイント設計、HATEOAS、API バージョニング",
    sections: [
      {
        title: "REST API設計の原則",
        content:
          "RESTful API はリソース指向で設計します。URLはリソース（名詞）を表し、HTTPメソッドで操作を表現します。",
        code: `// === RESTful URL 設計 ===

// リソースの CRUD
// GET    /api/users          → 一覧取得
// GET    /api/users/123      → 1件取得
// POST   /api/users          → 新規作成
// PUT    /api/users/123      → 全体更新
// PATCH  /api/users/123      → 部分更新
// DELETE /api/users/123      → 削除

// ネストしたリソース
// GET    /api/users/123/orders       → ユーザー123の注文一覧
// POST   /api/users/123/orders       → ユーザー123に注文作成
// GET    /api/users/123/orders/456   → 注文456の詳細

// フィルタリング・ソート・ページネーション
// GET /api/users?status=active&sort=name,asc&page=0&size=20

// 検索
// GET /api/users/search?q=Alice

// === レスポンス設計 ===
// 一覧レスポンス（ページネーション付き）
{
    "content": [
        {"id": 1, "name": "Alice", "email": "alice@example.com"},
        {"id": 2, "name": "Bob", "email": "bob@example.com"}
    ],
    "page": {
        "number": 0,
        "size": 20,
        "totalElements": 42,
        "totalPages": 3
    }
}`,
      },
      {
        title: "実践的な REST API 実装",
        content:
          "ページネーション、ソート、フィルタリングを備えた実践的な API の実装例です。",
        code: `@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // 検索・フィルタリング対応の一覧API
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @PageableDefault(size = 20, sort = "createdAt",
                direction = Sort.Direction.DESC) Pageable pageable) {

        var criteria = ProductSearchCriteria.builder()
            .keyword(keyword)
            .category(category)
            .minPrice(minPrice)
            .maxPrice(maxPrice)
            .build();

        Page<ProductResponse> result =
            productService.search(criteria, pageable);
        return ResponseEntity.ok(result);
    }

    // 個別取得
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.findById(id));
    }

    // 作成（201 Created + Locationヘッダー）
    @PostMapping
    public ResponseEntity<ProductResponse> create(
            @Valid @RequestBody CreateProductRequest request) {
        ProductResponse created = productService.create(request);
        URI location = URI.create("/api/v1/products/" + created.id());
        return ResponseEntity.created(location).body(created);
    }
}`,
      },
    ],
  },
  {
    id: "webclient",
    title: "HTTP クライアント",
    category: "api",
    description:
      "WebClient, RestClient, RestTemplate を使った外部API呼び出し",
    sections: [
      {
        title: "RestClient（Spring 6.1+ 推奨）",
        content:
          "Spring 6.1 / Spring Boot 3.2 で導入された新しい同期HTTPクライアント。RestTemplate の後継で、流暢なAPIを提供します。",
        code: `// RestClient の設定
@Configuration
public class HttpClientConfig {

    @Bean
    public RestClient restClient(RestClient.Builder builder) {
        return builder
            .baseUrl("https://api.example.com")
            .defaultHeader("Accept", "application/json")
            .requestInterceptor((request, body, execution) -> {
                System.out.println("Request: " + request.getURI());
                return execution.execute(request, body);
            })
            .build();
    }
}

// Service での使用
@Service
public class ExternalApiService {

    private final RestClient restClient;

    public ExternalApiService(RestClient restClient) {
        this.restClient = restClient;
    }

    // GET リクエスト
    public List<Post> getPosts() {
        return restClient.get()
            .uri("/posts")
            .retrieve()
            .body(new ParameterizedTypeReference<List<Post>>() {});
    }

    // POST リクエスト
    public Post createPost(CreatePostRequest request) {
        return restClient.post()
            .uri("/posts")
            .contentType(MediaType.APPLICATION_JSON)
            .body(request)
            .retrieve()
            .body(Post.class);
    }

    // エラーハンドリング
    public Optional<Post> getPost(Long id) {
        return restClient.get()
            .uri("/posts/{id}", id)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError,
                (request, response) -> {
                    if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
                        throw new PostNotFoundException(id);
                    }
                })
            .body(Post.class)
            .describeConstable();  // Optional でラップ
    }
}`,
      },
      {
        title: "WebClient（リアクティブ / 非同期）",
        content:
          "Spring WebFlux が提供する非同期・ノンブロッキングHTTPクライアント。リアクティブプログラミングやWebSocket にも対応。",
        code: `// WebClient の設定
@Bean
public WebClient webClient(WebClient.Builder builder) {
    return builder
        .baseUrl("https://api.example.com")
        .defaultHeader("Authorization", "Bearer " + apiKey)
        .build();
}

// 非同期リクエスト
public Mono<User> getUserAsync(Long id) {
    return webClient.get()
        .uri("/users/{id}", id)
        .retrieve()
        .bodyToMono(User.class)
        .timeout(Duration.ofSeconds(5))
        .retry(3)
        .onErrorMap(WebClientResponseException.class,
            ex -> new ApiException("外部APIエラー", ex));
}

// 複数のAPIを並行呼び出し
public Mono<UserProfile> getUserProfile(Long userId) {
    Mono<User> userMono = getUserAsync(userId);
    Mono<List<Order>> ordersMono = getOrdersAsync(userId);

    return Mono.zip(userMono, ordersMono)
        .map(tuple -> new UserProfile(tuple.getT1(), tuple.getT2()));
}`,
      },
    ],
  },

  // ===== テスト =====
  {
    id: "testing",
    title: "テスト",
    category: "testing",
    description:
      "JUnit 5, Mockito, Spring Boot Test を使った単体テスト・統合テスト",
    sections: [
      {
        title: "JUnit 5 の基本",
        content:
          "JUnit 5（Jupiter）は Java のデファクトテスティングフレームワーク。@Test, @BeforeEach, @DisplayName 等のアノテーションでテストを記述します。",
        code: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("UserService のテスト")
class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository = new InMemoryUserRepository();
        userService = new UserService(userRepository);
    }

    @Test
    @DisplayName("ユーザーを正常に作成できる")
    void createUser_success() {
        var request = new CreateUserRequest("Alice", "alice@example.com", 30);
        var result = userService.create(request);

        assertAll(
            () -> assertNotNull(result.id()),
            () -> assertEquals("Alice", result.name()),
            () -> assertEquals("alice@example.com", result.email())
        );
    }

    @Test
    @DisplayName("重複メールアドレスで例外が発生する")
    void createUser_duplicateEmail_throwsException() {
        var request = new CreateUserRequest("Alice", "alice@example.com", 30);
        userService.create(request);

        assertThrows(DuplicateEmailException.class,
            () -> userService.create(request));
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "  "})
    @DisplayName("空白の名前で例外が発生する")
    void createUser_blankName_throwsException(String name) {
        var request = new CreateUserRequest(name, "test@example.com", 30);
        assertThrows(IllegalArgumentException.class,
            () -> userService.create(request));
    }
}`,
      },
      {
        title: "Mockito によるモック",
        content:
          "Mockito で依存オブジェクトをモック化し、テスト対象のクラスを隔離してテストします。",
        code: `@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private NotificationService notificationService;

    @InjectMocks
    private OrderService orderService;

    @Test
    @DisplayName("注文を作成し通知が送信される")
    void createOrder_sendsNotification() {
        // Arrange（準備）
        var request = new OrderRequest(1L, List.of(
            new OrderItem("商品A", 2, 1000)));
        var savedOrder = new Order(100L, 1L, 2000);

        when(orderRepository.save(any(Order.class)))
            .thenReturn(savedOrder);

        // Act（実行）
        var result = orderService.createOrder(request);

        // Assert（検証）
        assertEquals(100L, result.getId());
        verify(orderRepository).save(any(Order.class));
        verify(notificationService).sendOrderConfirmation(savedOrder);
        verifyNoMoreInteractions(notificationService);
    }
}`,
      },
      {
        title: "Spring Boot 統合テスト",
        content:
          "SpringBootTest でアプリケーションコンテキストを立ち上げ、実際のHTTPリクエストをテストします。",
        code: `@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("POST /api/users - ユーザーを作成できる")
    void createUser() throws Exception {
        var request = new CreateUserRequest("Alice", "alice@example.com", 30);

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.name").value("Alice"))
            .andExpect(jsonPath("$.email").value("alice@example.com"));
    }

    @Test
    @DisplayName("GET /api/users/{id} - ユーザーを取得できる")
    void getUser() throws Exception {
        User user = userRepository.save(new User("Bob", "bob@example.com"));

        mockMvc.perform(get("/api/users/{id}", user.getId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("Bob"));
    }

    @Test
    @DisplayName("GET /api/users/999 - 存在しないユーザーは404")
    void getUser_notFound() throws Exception {
        mockMvc.perform(get("/api/users/999"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.code").value("NOT_FOUND"));
    }
}`,
      },
    ],
  },

  // ===== ビルド・デプロイ =====
  {
    id: "build-tools",
    title: "ビルドツール（Maven / Gradle）",
    category: "deploy",
    description:
      "Maven と Gradle の基本、依存関係管理、ビルドライフサイクル",
    sections: [
      {
        title: "Maven",
        content:
          "XML ベースのビルドツール。pom.xml で依存関係とビルド設定を管理します。規約による設定（Convention over Configuration）が特徴。",
        code: `<!-- pom.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.1</version>
    </parent>

    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>

    <properties>
        <java.version>21</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>

<!-- コマンド -->
<!-- mvn clean install        ビルド -->
<!-- mvn spring-boot:run      実行 -->
<!-- mvn test                 テスト -->
<!-- mvn package              JARパッケージング -->`,
      },
      {
        title: "Gradle",
        content:
          "Groovy/Kotlin DSL ベースのビルドツール。Maven より柔軟で高速。Spring Boot の推奨ビルドツール。",
        code: `// build.gradle (Groovy DSL)
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.4.1'
    id 'io.spring.dependency-management' version '1.1.7'
}

group = 'com.example'
version = '1.0.0'

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    // Spring Boot スターター
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-security'

    // データベース
    runtimeOnly 'org.postgresql:postgresql'
    runtimeOnly 'com.h2database:h2'  // テスト用

    // テスト
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
}

tasks.named('test') {
    useJUnitPlatform()
}

// コマンド
// ./gradlew build         ビルド
// ./gradlew bootRun       実行
// ./gradlew test          テスト
// ./gradlew bootJar       JARパッケージング`,
      },
    ],
  },
  {
    id: "docker-deploy",
    title: "Docker とデプロイ",
    category: "deploy",
    description:
      "Docker コンテナ化、docker-compose、本番環境へのデプロイ",
    sections: [
      {
        title: "Dockerfile",
        content:
          "Javaアプリをコンテナイメージにパッケージングするための Dockerfile の書き方。マルチステージビルドでイメージサイズを最小化します。",
        code: `# === マルチステージビルド ===

# ステージ1: ビルド
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# 依存関係を先にダウンロード（キャッシュ活用）
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
RUN ./gradlew dependencies --no-daemon

# ソースコードをコピーしてビルド
COPY src ./src
RUN ./gradlew bootJar --no-daemon

# ステージ2: 実行用イメージ（JREのみ、軽量）
FROM eclipse-temurin:21-jre
WORKDIR /app

# セキュリティ: root以外で実行
RUN addgroup --system app && adduser --system --ingroup app app
USER app

COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
      },
      {
        title: "docker-compose",
        content:
          "アプリケーション、データベース、その他のサービスをまとめて管理する docker-compose の構成例。",
        code: `# docker-compose.yml
services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/mydb
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: secret
      SPRING_PROFILES_ACTIVE: production
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:

# コマンド
# docker compose up -d        起動
# docker compose down          停止
# docker compose logs -f app  ログ確認
# docker compose ps            状態確認`,
      },
      {
        title: "application.yml の環境別設定",
        content:
          "Spring Profiles で開発/テスト/本番環境ごとに設定を切り替えます。",
        code: `# application.yml（共通設定）
spring:
  application:
    name: my-app
  jackson:
    default-property-inclusion: non_null

server:
  port: 8080

---
# application-dev.yml（開発環境）
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:h2:mem:devdb
    driver-class-name: org.h2.Driver
  h2:
    console:
      enabled: true
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
logging:
  level:
    com.example: DEBUG
    org.springframework.web: DEBUG

---
# application-production.yml（本番環境）
spring:
  config:
    activate:
      on-profile: production
  datasource:
    url: \${DATABASE_URL}
    username: \${DATABASE_USERNAME}
    password: \${DATABASE_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
logging:
  level:
    com.example: INFO

# 起動コマンド
# java -jar app.jar --spring.profiles.active=production`,
      },
    ],
  },

  // ===== Tomcat =====
  {
    id: "tomcat-overview",
    title: "Tomcat の概要とアーキテクチャ",
    category: "tomcat",
    description:
      "Apache Tomcat の役割、アーキテクチャ、コンポーネント構成を理解する",
    sections: [
      {
        title: "Tomcat とは",
        content:
          "Apache Tomcat は、Java Servlet、JSP、WebSocket をサポートするオープンソースの Web サーバー/サーブレットコンテナです。Java EE (Jakarta EE) の完全な Application Server (WildFly, GlassFish 等) とは異なり、Servlet/JSP 仕様の実装に特化した軽量なコンテナとして広く使われています。Spring Boot のデフォルト組み込みサーバーとしても採用されています。",
        code: `// Tomcat の主な特徴
// ─────────────────────────────────────────
// 1. 軽量: Servlet/JSP 仕様に特化（フル App Server より小さい）
// 2. 高速: 起動が速く、メモリ消費も少ない
// 3. 安定: Apache Software Foundation が管理、長年の実績
// 4. Spring Boot のデフォルト内蔵サーバー
// 5. 活発なコミュニティとドキュメント

// 主なバージョンと対応仕様
// ┌──────────┬──────────────┬───────────┬──────────┐
// │ Tomcat   │ Servlet      │ Java      │ Jakarta  │
// ├──────────┼──────────────┼───────────┼──────────┤
// │ 11.0.x   │ Servlet 6.1  │ Java 17+  │ Jakarta  │
// │ 10.1.x   │ Servlet 6.0  │ Java 11+  │ Jakarta  │
// │ 9.0.x    │ Servlet 4.0  │ Java 8+   │ javax    │
// │ 8.5.x    │ Servlet 3.1  │ Java 7+   │ javax    │
// └──────────┴──────────────┴───────────┴──────────┘
// ※ Tomcat 10 以降は jakarta.* パッケージ（javax.* → jakarta.* 移行）`,
      },
      {
        title: "アーキテクチャとコンポーネント",
        content:
          "Tomcat は Server → Service → Connector + Engine → Host → Context という階層構造で構成されています。各コンポーネントの役割を理解すると、server.xml の設定や運用時のトラブルシューティングに役立ちます。",
        code: `// Tomcat のアーキテクチャ（階層構造）
// ┌─────────────────────────────────────────────┐
// │ Server (Tomcat インスタンス全体)               │
// │  ┌─────────────────────────────────────────┐ │
// │  │ Service (Catalina)                      │ │
// │  │  ┌───────────────┐  ┌────────────────┐  │ │
// │  │  │ Connector     │  │ Connector      │  │ │
// │  │  │ (HTTP:8080)   │  │ (AJP:8009)     │  │ │
// │  │  └───────┬───────┘  └───────┬────────┘  │ │
// │  │          └─────────┬────────┘            │ │
// │  │            ┌───────▼────────┐            │ │
// │  │            │ Engine         │            │ │
// │  │            │ (Catalina)     │            │ │
// │  │            │  ┌───────────┐ │            │ │
// │  │            │  │ Host      │ │            │ │
// │  │            │  │(localhost)│ │            │ │
// │  │            │  │ ┌───────┐│ │            │ │
// │  │            │  │ │Context││ │            │ │
// │  │            │  │ │(/app) ││ │            │ │
// │  │            │  │ └───────┘│ │            │ │
// │  │            │  └───────────┘ │            │ │
// │  │            └────────────────┘            │ │
// │  └─────────────────────────────────────────┘ │
// └─────────────────────────────────────────────┘

// 各コンポーネントの役割
// Server    : Tomcat プロセス全体。シャットダウンポート(8005)を持つ
// Service   : Connector と Engine をまとめる論理単位
// Connector : クライアントからの接続を受け付ける（HTTP/AJP）
// Engine    : リクエストを処理するサーブレットコンテナ本体
// Host      : 仮想ホスト（ドメインごとに分離可能）
// Context   : 個別の Web アプリケーション（WAR）`,
      },
      {
        title: "リクエスト処理フロー",
        content:
          "クライアントからのリクエストが Tomcat 内でどのように処理されるかを理解します。Connector がリクエストを受け取り、Engine → Host → Context → Servlet の順でディスパッチされ、フィルターチェーンを経由してレスポンスが返されます。",
        code: `// リクエスト処理フロー
//
// [クライアント]
//    │ HTTP リクエスト
//    ▼
// [Connector (HTTP/8080)]
//    │ リクエストパース・HttpServletRequest 生成
//    ▼
// [Engine (Catalina)]
//    │ Host を選択
//    ▼
// [Host (localhost)]
//    │ URL パスから Context を選択
//    ▼
// [Context (/myapp)]
//    │ web.xml / アノテーションから Servlet を選択
//    ▼
// [Filter Chain]
//    │ CharacterEncodingFilter
//    │ AuthenticationFilter
//    │ LoggingFilter
//    ▼
// [Servlet / Controller]
//    │ ビジネスロジック実行
//    │ レスポンス生成
//    ▼
// [Filter Chain (逆順)]
//    ▼
// [Connector]
//    │ HttpServletResponse をクライアントに送信
//    ▼
// [クライアント]

// Valve: Tomcat 独自のフィルター機能
// Pipeline に配置され、Engine/Host/Context レベルで処理を挟める
// 例: AccessLogValve, RemoteAddrValve, ErrorReportValve`,
      },
    ],
  },
  {
    id: "tomcat-install",
    title: "Tomcat のインストールと起動",
    category: "tomcat",
    description:
      "Tomcat のダウンロード、インストール、起動・停止、動作確認の手順",
    sections: [
      {
        title: "インストール手順",
        content:
          "Tomcat は公式サイトからダウンロードするか、パッケージマネージャーで導入できます。JDK が事前にインストールされている必要があります。",
        code: `# === Tomcat のインストール ===

# 1. JDK の確認
java -version
# openjdk version "21.0.x" 以上

# 2. ダウンロードと展開 (Tomcat 11 の例)
curl -O https://dlcdn.apache.org/tomcat/tomcat-11/v11.0.x/bin/apache-tomcat-11.0.x.tar.gz
tar xzf apache-tomcat-11.0.x.tar.gz
mv apache-tomcat-11.0.x /opt/tomcat

# 3. 環境変数の設定
export CATALINA_HOME=/opt/tomcat
export JAVA_HOME=/usr/lib/jvm/java-21

# macOS (Homebrew)
brew install tomcat

# === 起動と停止 ===

# 起動
$CATALINA_HOME/bin/startup.sh        # Linux/macOS
%CATALINA_HOME%\\bin\\startup.bat      # Windows

# 停止
$CATALINA_HOME/bin/shutdown.sh

# フォアグラウンド起動（ログを直接確認）
$CATALINA_HOME/bin/catalina.sh run

# === 動作確認 ===
# ブラウザで http://localhost:8080 を開く
# → Tomcat のデフォルトページが表示されれば成功
curl -I http://localhost:8080`,
      },
      {
        title: "ディレクトリ構造",
        content:
          "Tomcat のディレクトリ構造を理解すると、設定変更やデプロイがスムーズに行えます。CATALINA_HOME（インストール先）と CATALINA_BASE（インスタンス別設定）の違いも重要です。",
        code: `# Tomcat ディレクトリ構造
# ─────────────────────────────────────
# $CATALINA_HOME/
# ├── bin/              起動・停止スクリプト
# │   ├── catalina.sh   メイン起動スクリプト
# │   ├── startup.sh    起動（catalina.sh start のラッパー）
# │   ├── shutdown.sh   停止
# │   ├── setenv.sh     JVM オプション設定（自分で作成）
# │   └── catalina.bat  Windows 用
# │
# ├── conf/             設定ファイル
# │   ├── server.xml    メイン設定（Connector, Host, etc.）
# │   ├── web.xml       デフォルトの Servlet/Filter 設定
# │   ├── context.xml   グローバルコンテキスト設定
# │   ├── tomcat-users.xml  管理画面ユーザー
# │   ├── logging.properties  ログ設定
# │   └── catalina.policy     セキュリティポリシー
# │
# ├── lib/              共通ライブラリ（Servlet API 等）
# │   ├── servlet-api.jar
# │   ├── jsp-api.jar
# │   └── catalina.jar
# │
# ├── logs/             ログファイル出力先
# │   ├── catalina.out      標準出力/エラー
# │   ├── catalina.YYYY-MM-DD.log
# │   ├── localhost.YYYY-MM-DD.log
# │   └── localhost_access_log.YYYY-MM-DD.txt
# │
# ├── webapps/          Web アプリのデプロイ先
# │   ├── ROOT/         デフォルト（/）アプリ
# │   ├── manager/      管理マネージャー
# │   ├── host-manager/ ホスト管理
# │   └── myapp.war     ← WAR をここに置くと自動デプロイ
# │
# ├── work/             JSP のコンパイル結果等
# └── temp/             一時ファイル`,
      },
      {
        title: "JVM オプションとチューニング",
        content:
          "setenv.sh を作成して JVM ヒープサイズやガベージコレクタなどの起動オプションをカスタマイズします。本番環境では適切なメモリ設定が重要です。",
        code: `# $CATALINA_HOME/bin/setenv.sh を作成
#!/bin/bash

# === メモリ設定 ===
# ヒープメモリ（開発: 512m / 本番: 2g〜4g）
CATALINA_OPTS="-Xms512m -Xmx2g"

# メタスペース
CATALINA_OPTS="$CATALINA_OPTS -XX:MaxMetaspaceSize=256m"

# === ガベージコレクタ ===
# G1GC（Java 9 以降のデフォルト、汎用的）
CATALINA_OPTS="$CATALINA_OPTS -XX:+UseG1GC"
CATALINA_OPTS="$CATALINA_OPTS -XX:MaxGCPauseMillis=200"

# ZGC（Java 21+、低レイテンシ向け）
# CATALINA_OPTS="$CATALINA_OPTS -XX:+UseZGC"

# === デバッグ・監視 ===
# リモートデバッグ
# CATALINA_OPTS="$CATALINA_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005"

# JMX 有効化（監視ツール接続用）
CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote"
CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.port=9090"
CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.ssl=false"
CATALINA_OPTS="$CATALINA_OPTS -Dcom.sun.management.jmxremote.authenticate=false"

# === GC ログ ===
CATALINA_OPTS="$CATALINA_OPTS -Xlog:gc*:file=\${CATALINA_HOME}/logs/gc.log:time,level,tags:filecount=10,filesize=10m"

# === エンコーディング ===
CATALINA_OPTS="$CATALINA_OPTS -Dfile.encoding=UTF-8"

# === タイムゾーン ===
CATALINA_OPTS="$CATALINA_OPTS -Duser.timezone=Asia/Tokyo"

export CATALINA_OPTS`,
      },
    ],
  },
  {
    id: "tomcat-server-xml",
    title: "server.xml の設定",
    category: "tomcat",
    description:
      "Connector、Host、Context など server.xml の主要設定項目を詳しく解説",
    sections: [
      {
        title: "Connector の設定",
        content:
          "Connector はクライアントからの HTTP/HTTPS 接続を受け付けるコンポーネントです。ポート番号、プロトコル、スレッドプール、タイムアウトなどを設定します。",
        code: `<!-- conf/server.xml -->
<Server port="8005" shutdown="SHUTDOWN">
  <Service name="Catalina">

    <!-- === HTTP Connector === -->
    <Connector
      port="8080"
      protocol="HTTP/1.1"
      connectionTimeout="20000"
      redirectPort="8443"
      maxThreads="200"
      minSpareThreads="10"
      acceptCount="100"
      maxConnections="8192"
      URIEncoding="UTF-8"
    />

    <!-- === HTTPS Connector (SSL/TLS) === -->
    <Connector
      port="8443"
      protocol="org.apache.coyote.http11.Http11NioProtocol"
      maxThreads="200"
      SSLEnabled="true">
      <SSLHostConfig>
        <Certificate
          certificateKeystoreFile="conf/keystore.jks"
          certificateKeystorePassword="changeit"
          type="RSA" />
      </SSLHostConfig>
    </Connector>

    <!-- === AJP Connector (Apache httpd 連携) === -->
    <!--
    <Connector
      port="8009"
      protocol="AJP/1.3"
      redirectPort="8443"
      secretRequired="true"
      secret="your-secret-key"
    />
    -->

    <!-- === NIO2 Connector (高パフォーマンス) === -->
    <!--
    <Connector
      port="8080"
      protocol="org.apache.coyote.http11.Http11Nio2Protocol"
      maxThreads="300"
    />
    -->
  </Service>
</Server>

<!-- Connector のパラメータ解説 -->
<!-- maxThreads: 同時処理スレッド数の上限 (デフォルト: 200) -->
<!-- minSpareThreads: 待機スレッド最小数 (デフォルト: 10) -->
<!-- acceptCount: 全スレッドビジーのときの待ちキュー長 (デフォルト: 100) -->
<!-- maxConnections: 同時接続数の上限 (NIO: 10000) -->
<!-- connectionTimeout: 接続タイムアウト (ms) -->`,
      },
      {
        title: "Host と Context の設定",
        content:
          "Host は仮想ホストを定義し、Context は個別の Web アプリケーションの設定を行います。バーチャルホストによるマルチドメイン運用や、コンテキストパスの設定を解説します。",
        code: `<!-- conf/server.xml -->
<Engine name="Catalina" defaultHost="localhost">

  <!-- === デフォルト Host === -->
  <Host name="localhost"
        appBase="webapps"
        unpackWARs="true"
        autoDeploy="true">

    <!-- アクセスログ -->
    <Valve className="org.apache.catalina.valves.AccessLogValve"
           directory="logs"
           prefix="localhost_access_log"
           suffix=".txt"
           pattern="%h %l %u %t &quot;%r&quot; %s %b %D" />

    <!-- 特定アプリの Context 設定 -->
    <Context path="/myapp" docBase="myapp"
             reloadable="false">
      <!-- JNDI データソース -->
      <Resource name="jdbc/mydb"
                auth="Container"
                type="javax.sql.DataSource"
                driverClassName="org.postgresql.Driver"
                url="jdbc:postgresql://localhost:5432/mydb"
                username="dbuser"
                password="dbpass"
                maxTotal="50"
                maxIdle="10"
                maxWaitMillis="10000" />
    </Context>
  </Host>

  <!-- === バーチャルホスト例 === -->
  <Host name="api.example.com"
        appBase="webapps-api"
        unpackWARs="true"
        autoDeploy="true">
    <Valve className="org.apache.catalina.valves.AccessLogValve"
           directory="logs"
           prefix="api_access_log"
           suffix=".txt"
           pattern="combined" />
  </Host>

</Engine>

<!-- Host のパラメータ解説 -->
<!-- appBase: WAR/ディレクトリの検索先 (CATALINA_HOME からの相対パス) -->
<!-- unpackWARs: WAR を展開するか (true推奨) -->
<!-- autoDeploy: webapps に WAR を置くと自動デプロイ -->
<!-- reloadable: クラス変更時に自動リロード (開発時のみtrue) -->`,
      },
      {
        title: "Realm（認証・認可）の設定",
        content:
          "Realm はユーザー認証・認可の仕組みを提供します。ファイルベース、データベース、LDAP など様々なバックエンドに対応しています。",
        code: `<!-- === 1. UserDatabase Realm (tomcat-users.xml ベース) === -->
<!-- conf/server.xml -->
<Realm className="org.apache.catalina.realm.UserDatabaseRealm"
       resourceName="UserDatabase" />

<!-- conf/tomcat-users.xml -->
<tomcat-users>
  <role rolename="manager-gui"/>
  <role rolename="admin-gui"/>
  <user username="admin" password="s3cret"
        roles="manager-gui,admin-gui"/>
</tomcat-users>

<!-- === 2. DataSource Realm (DB ベース) === -->
<Realm className="org.apache.catalina.realm.DataSourceRealm"
       dataSourceName="jdbc/mydb"
       userTable="users"
       userNameCol="username"
       userCredCol="password"
       userRoleTable="user_roles"
       roleNameCol="rolename" />

<!-- === 3. JNDI Realm (LDAP ベース) === -->
<Realm className="org.apache.catalina.realm.JNDIRealm"
       connectionURL="ldap://ldap.example.com:389"
       userPattern="uid={0},ou=people,dc=example,dc=com"
       roleBase="ou=groups,dc=example,dc=com"
       roleName="cn"
       roleSearch="(uniqueMember={0})" />

<!-- === web.xml でのセキュリティ制約 === -->
<!-- 特定パスへのアクセスにロールを要求 -->
<security-constraint>
  <web-resource-collection>
    <web-resource-name>Admin Area</web-resource-name>
    <url-pattern>/admin/*</url-pattern>
  </web-resource-collection>
  <auth-constraint>
    <role-name>admin-gui</role-name>
  </auth-constraint>
</security-constraint>

<login-config>
  <auth-method>FORM</auth-method>
  <form-login-config>
    <form-login-page>/login.html</form-login-page>
    <form-error-page>/error.html</form-error-page>
  </form-login-config>
</login-config>`,
      },
    ],
  },
  {
    id: "tomcat-deploy",
    title: "アプリケーションのデプロイ",
    category: "tomcat",
    description:
      "WAR ファイルのデプロイ方法、Manager アプリの使い方、自動デプロイと手動デプロイ",
    sections: [
      {
        title: "WAR ファイルのデプロイ",
        content:
          "Tomcat へのデプロイは、WAR ファイルを webapps ディレクトリに配置する方法が基本です。Maven / Gradle から WAR を生成し、自動・手動でデプロイできます。",
        code: `// === WAR ファイルの生成 ===

// Maven
// pom.xml で <packaging>war</packaging> を指定
// $ mvn clean package
// → target/myapp.war が生成

// Gradle
// build.gradle
plugins {
    id 'java'
    id 'war'
}
// $ ./gradlew war
// → build/libs/myapp.war が生成

// === デプロイ方法 ===

// 方法1: webapps に直接配置（自動デプロイ）
// $ cp target/myapp.war $CATALINA_HOME/webapps/
// → http://localhost:8080/myapp/ でアクセス可能

// 方法2: ROOT アプリとしてデプロイ（/ でアクセス）
// $ rm -rf $CATALINA_HOME/webapps/ROOT
// $ cp target/myapp.war $CATALINA_HOME/webapps/ROOT.war

// 方法3: context.xml で外部パスからデプロイ
// conf/Catalina/localhost/myapp.xml を作成:
// <Context docBase="/path/to/myapp.war" />

// === アンデプロイ ===
// webapps から WAR と展開ディレクトリを削除
// $ rm $CATALINA_HOME/webapps/myapp.war
// $ rm -rf $CATALINA_HOME/webapps/myapp/

// === Spring Boot の WAR デプロイ ===
// SpringBootServletInitializer を継承する

// Application.java
@SpringBootApplication
public class Application extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(Application.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}`,
      },
      {
        title: "Manager アプリケーション",
        content:
          "Tomcat Manager は Web ブラウザやコマンドラインからアプリケーションのデプロイ・アンデプロイ・再起動を行えるツールです。Maven/Gradle プラグインと連携した自動デプロイにも使えます。",
        code: `<!-- === Manager の有効化 === -->
<!-- conf/tomcat-users.xml -->
<tomcat-users>
  <role rolename="manager-gui"/>
  <role rolename="manager-script"/>
  <user username="deployer" password="s3cret"
        roles="manager-gui,manager-script"/>
</tomcat-users>

<!-- Manager GUI: http://localhost:8080/manager/html -->
<!-- デプロイ、アンデプロイ、再起動がブラウザから可能 -->

<!-- === Maven Tomcat プラグイン === -->
<!-- pom.xml -->
<plugin>
  <groupId>org.apache.tomcat.maven</groupId>
  <artifactId>tomcat7-maven-plugin</artifactId>
  <version>2.2</version>
  <configuration>
    <url>http://localhost:8080/manager/text</url>
    <server>tomcat-local</server>
    <path>/myapp</path>
  </configuration>
</plugin>

<!-- settings.xml (~/.m2/settings.xml) -->
<server>
  <id>tomcat-local</id>
  <username>deployer</username>
  <password>s3cret</password>
</server>

<!-- デプロイコマンド -->
<!-- mvn tomcat7:deploy     初回デプロイ -->
<!-- mvn tomcat7:redeploy   再デプロイ -->
<!-- mvn tomcat7:undeploy   アンデプロイ -->

<!-- === curl による REST API デプロイ === -->
<!-- curl -u deployer:s3cret \\
     -T target/myapp.war \\
     "http://localhost:8080/manager/text/deploy?path=/myapp&update=true"
-->`,
      },
      {
        title: "context.xml と META-INF",
        content:
          "アプリケーション固有の設定は META-INF/context.xml に記述します。JNDI リソース、セッション管理、キャッシュ設定などをアプリ単位で構成できます。",
        code: `<!-- === アプリ固有 context.xml === -->
<!-- src/main/webapp/META-INF/context.xml -->
<Context>
    <!-- JNDI データソース（アプリ専用） -->
    <Resource name="jdbc/appdb"
              auth="Container"
              type="javax.sql.DataSource"
              factory="org.apache.tomcat.jdbc.pool.DataSourceFactory"
              driverClassName="com.mysql.cj.jdbc.Driver"
              url="jdbc:mysql://localhost:3306/appdb"
              username="appuser"
              password="apppass"
              maxActive="50"
              maxIdle="10"
              minIdle="5"
              maxWait="10000"
              validationQuery="SELECT 1"
              testOnBorrow="true"
              testWhileIdle="true"
              timeBetweenEvictionRunsMillis="30000" />

    <!-- セッションの永続化（再起動時にセッション保持） -->
    <Manager className=
      "org.apache.catalina.session.PersistentManager"
      saveOnRestart="true">
      <Store className=
        "org.apache.catalina.session.FileStore"
        directory="sessions" />
    </Manager>

    <!-- 静的リソースのキャッシュ -->
    <Resources cachingAllowed="true"
               cacheMaxSize="102400" />
</Context>

<!-- === web.xml から JNDI を参照 === -->
<resource-ref>
  <res-ref-name>jdbc/appdb</res-ref-name>
  <res-type>javax.sql.DataSource</res-type>
  <res-auth>Container</res-auth>
</resource-ref>

// Java コードから JNDI ルックアップ
Context initCtx = new InitialContext();
Context envCtx = (Context) initCtx.lookup("java:comp/env");
DataSource ds = (DataSource) envCtx.lookup("jdbc/appdb");
Connection conn = ds.getConnection();`,
      },
    ],
  },
  {
    id: "tomcat-logging",
    title: "ログ設定とトラブルシューティング",
    category: "tomcat",
    description:
      "Tomcat のログ設定、アクセスログ、アプリケーションログの管理方法",
    sections: [
      {
        title: "ログの種類と設定",
        content:
          "Tomcat は JULI (java.util.logging) をデフォルトのログフレームワークとして使用します。catalina.out、アクセスログ、アプリケーションログの3種類を適切に管理することが運用の基本です。",
        code: `# Tomcat のログファイル
# ─────────────────────────────────────
# catalina.out         : 標準出力/標準エラー（全ログ集約）
# catalina.YYYY-MM-DD.log : Tomcat エンジンのログ
# localhost.YYYY-MM-DD.log : Host レベルのログ
# localhost_access_log.YYYY-MM-DD.txt : アクセスログ
# manager.YYYY-MM-DD.log  : Manager アプリのログ

# === conf/logging.properties ===
handlers = 1catalina.org.apache.juli.AsyncFileHandler, \\
           2localhost.org.apache.juli.AsyncFileHandler, \\
           java.util.logging.ConsoleHandler

# catalina.log の設定
1catalina.org.apache.juli.AsyncFileHandler.level = FINE
1catalina.org.apache.juli.AsyncFileHandler.directory = \${catalina.base}/logs
1catalina.org.apache.juli.AsyncFileHandler.prefix = catalina.
1catalina.org.apache.juli.AsyncFileHandler.maxDays = 90
1catalina.org.apache.juli.AsyncFileHandler.encoding = UTF-8

# localhost.log の設定
2localhost.org.apache.juli.AsyncFileHandler.level = FINE
2localhost.org.apache.juli.AsyncFileHandler.directory = \${catalina.base}/logs
2localhost.org.apache.juli.AsyncFileHandler.prefix = localhost.

# コンソール出力
java.util.logging.ConsoleHandler.level = FINE
java.util.logging.ConsoleHandler.formatter = \\
  org.apache.juli.OneLineFormatter

# 特定パッケージのログレベル
org.apache.catalina.core.ContainerBase.[Catalina].level = INFO
org.apache.catalina.startup.level = INFO`,
      },
      {
        title: "アクセスログのカスタマイズ",
        content:
          "AccessLogValve でアクセスログのフォーマットを自由にカスタマイズできます。JSON 形式で出力し、分析ツールと連携することも可能です。",
        code: `<!-- conf/server.xml の Host 内に配置 -->

<!-- === 標準フォーマット (Combined) === -->
<Valve className="org.apache.catalina.valves.AccessLogValve"
       directory="logs"
       prefix="access_log"
       suffix=".txt"
       pattern="combined"
       rotatable="true"
       fileDateFormat=".yyyy-MM-dd"
       maxDays="30"
       encoding="UTF-8" />

<!-- === カスタムフォーマット === -->
<!-- %h=リモートホスト %t=日時 %r=リクエストライン -->
<!-- %s=ステータス %b=レスポンスサイズ %D=処理時間(ms) -->
<!-- %{User-Agent}i=ユーザーエージェント -->
<Valve className="org.apache.catalina.valves.AccessLogValve"
       directory="logs"
       prefix="access_log"
       suffix=".txt"
       pattern="%h %t &quot;%r&quot; %s %b %D %{X-Forwarded-For}i" />

<!-- === JSON 形式 (ログ分析ツール連携) === -->
<Valve className="org.apache.catalina.valves.AccessLogValve"
       directory="logs"
       prefix="access_log"
       suffix=".json"
       pattern='{"remote":"%h","time":"%t","method":"%m","uri":"%U","query":"%q","status":"%s","size":"%b","duration":"%D","ua":"%{User-Agent}i"}' />

<!-- === リクエストフィルタ === -->
<!-- 特定 IP からのアクセスのみ許可 -->
<Valve className="org.apache.catalina.valves.RemoteAddrValve"
       allow="192\.168\.1\.\d+|127\.0\.0\.1" />`,
      },
      {
        title: "よくあるトラブルと対処法",
        content:
          "Tomcat 運用で頻出する問題とその解決方法を解説します。ポート競合、メモリ不足、デプロイ失敗、文字化けなど。",
        code: `// === よくあるトラブルと対処法 ===

// 1. ポート 8080 がすでに使用中
// $ lsof -i :8080
// $ kill -9 <PID>
// または server.xml でポートを変更

// 2. OutOfMemoryError
// setenv.sh で -Xmx を増やす
// -Xmx2g -XX:MaxMetaspaceSize=512m
// ヒープダンプを取得して分析:
// -XX:+HeapDumpOnOutOfMemoryError
// -XX:HeapDumpPath=/tmp/heapdump.hprof

// 3. WAR がデプロイされない
// - logs/localhost.YYYY-MM-DD.log を確認
// - web.xml の構文エラーをチェック
// - 依存 JAR の不足を確認
// - work/ ディレクトリをクリアして再起動
//   rm -rf $CATALINA_HOME/work/Catalina/

// 4. 文字化け (日本語が??? になる)
// server.xml: URIEncoding="UTF-8" を追加
// web.xml に CharacterEncodingFilter を追加
// <filter>
//   <filter-name>encoding</filter-name>
//   <filter-class>
//     org.springframework.web.filter.CharacterEncodingFilter
//   </filter-class>
//   <init-param>
//     <param-name>encoding</param-name>
//     <param-value>UTF-8</param-value>
//   </init-param>
//   <init-param>
//     <param-name>forceEncoding</param-name>
//     <param-value>true</param-value>
//   </init-param>
// </filter>

// 5. セッションが消える
// context.xml で PersistentManager を設定
// ロードバランサ使用時は sticky session を有効化
// または Redis/DB でセッション共有

// 6. 起動が遅い (Linux)
// SecureRandom の初期化で /dev/random がブロックする
// -Djava.security.egd=file:/dev/urandom`,
      },
    ],
  },
  {
    id: "tomcat-security",
    title: "Tomcat のセキュリティ対策",
    category: "tomcat",
    description:
      "本番環境向けの Tomcat セキュリティ強化、SSL/TLS、不要コンポーネントの除去",
    sections: [
      {
        title: "本番環境のセキュリティ強化",
        content:
          "Tomcat をインターネットに公開する場合、デフォルト設定のままでは安全ではありません。不要なアプリの削除、エラーページのカスタマイズ、ヘッダーの設定など、基本的なセキュリティ対策を施します。",
        code: `// === 本番環境チェックリスト ===

// 1. デフォルトアプリの削除
// $ rm -rf $CATALINA_HOME/webapps/ROOT
// $ rm -rf $CATALINA_HOME/webapps/docs
// $ rm -rf $CATALINA_HOME/webapps/examples
// $ rm -rf $CATALINA_HOME/webapps/manager      (不要なら)
// $ rm -rf $CATALINA_HOME/webapps/host-manager  (不要なら)

// 2. シャットダウンポートの無効化
// server.xml: <Server port="-1" shutdown="SHUTDOWN">

// 3. サーバー情報の隠蔽
// server.xml の Connector に追加:
//   server="Apache"  (バージョン情報を隠す)

// 4. Tomcat バージョン非表示
// lib/org/apache/catalina/util/ServerInfo.properties を編集
// server.info=Apache
// server.number=0.0.0

// 5. AJP Connector の無効化（不要なら）
// server.xml から AJP Connector をコメントアウト

// 6. 自動デプロイの無効化（本番）
// <Host ... autoDeploy="false" deployOnStartup="false">

// 7. ディレクトリリスティングの無効化
// conf/web.xml の DefaultServlet:
// <init-param>
//   <param-name>listings</param-name>
//   <param-value>false</param-value>
// </init-param>`,
      },
      {
        title: "SSL/TLS の設定",
        content:
          "HTTPS を有効にして通信を暗号化します。Let's Encrypt や自己署名証明書でのセットアップ方法を解説します。",
        code: `# === 自己署名証明書の作成 (開発用) ===
keytool -genkeypair \\
  -alias tomcat \\
  -keyalg RSA \\
  -keysize 2048 \\
  -validity 365 \\
  -keystore conf/keystore.jks \\
  -storepass changeit \\
  -dname "CN=localhost,OU=Dev,O=MyCompany,L=Tokyo,C=JP"

# === Let's Encrypt (本番用) ===
# certbot でPEM証明書を取得後、PKCS12に変換
openssl pkcs12 -export \\
  -in /etc/letsencrypt/live/example.com/fullchain.pem \\
  -inkey /etc/letsencrypt/live/example.com/privkey.pem \\
  -out conf/keystore.p12 \\
  -name tomcat \\
  -passout pass:changeit

<!-- === server.xml HTTPS Connector === -->
<Connector port="8443"
           protocol="org.apache.coyote.http11.Http11NioProtocol"
           maxThreads="200"
           SSLEnabled="true">
  <SSLHostConfig
    protocols="TLSv1.2+TLSv1.3"
    ciphers="TLS_AES_256_GCM_SHA384,TLS_AES_128_GCM_SHA256">
    <Certificate
      certificateKeystoreFile="conf/keystore.p12"
      certificateKeystorePassword="changeit"
      certificateKeystoreType="PKCS12"
      type="RSA" />
  </SSLHostConfig>
</Connector>

<!-- HTTP → HTTPS リダイレクト -->
<!-- web.xml に追加 -->
<security-constraint>
  <web-resource-collection>
    <web-resource-name>HTTPS Redirect</web-resource-name>
    <url-pattern>/*</url-pattern>
  </web-resource-collection>
  <user-data-constraint>
    <transport-guarantee>CONFIDENTIAL</transport-guarantee>
  </user-data-constraint>
</security-constraint>`,
      },
      {
        title: "セキュリティヘッダーの設定",
        content:
          "HTTP レスポンスヘッダーを設定して、XSS、クリックジャッキング、MIME スニッフィングなどの攻撃を防ぎます。Filter または Valve で追加します。",
        code: `<!-- === web.xml に Filter として追加 === -->
<filter>
  <filter-name>SecurityHeadersFilter</filter-name>
  <filter-class>com.example.SecurityHeadersFilter</filter-class>
</filter>
<filter-mapping>
  <filter-name>SecurityHeadersFilter</filter-name>
  <url-pattern>/*</url-pattern>
</filter-mapping>

// SecurityHeadersFilter.java
@WebFilter("/*")
public class SecurityHeadersFilter implements Filter {
    @Override
    public void doFilter(ServletRequest req,
                         ServletResponse res,
                         FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse response = (HttpServletResponse) res;

        // XSS 保護
        response.setHeader(
            "X-Content-Type-Options", "nosniff");
        response.setHeader(
            "X-XSS-Protection", "1; mode=block");

        // クリックジャッキング対策
        response.setHeader(
            "X-Frame-Options", "DENY");

        // HTTPS 強制 (HSTS)
        response.setHeader(
            "Strict-Transport-Security",
            "max-age=31536000; includeSubDomains");

        // Content Security Policy
        response.setHeader(
            "Content-Security-Policy",
            "default-src 'self'; "
            + "script-src 'self'; "
            + "style-src 'self' 'unsafe-inline'; "
            + "img-src 'self' data:; "
            + "font-src 'self'");

        // リファラーポリシー
        response.setHeader(
            "Referrer-Policy", "strict-origin-when-cross-origin");

        // パーミッションポリシー
        response.setHeader(
            "Permissions-Policy",
            "camera=(), microphone=(), geolocation=()");

        chain.doFilter(req, res);
    }
}`,
      },
    ],
  },
  {
    id: "tomcat-embedded",
    title: "組み込み Tomcat（Embedded Tomcat）",
    category: "tomcat",
    description:
      "Tomcat をライブラリとしてアプリケーションに組み込む方法、Spring Boot の仕組み",
    sections: [
      {
        title: "Embedded Tomcat の基本",
        content:
          "Tomcat は外部サーバーとしてだけでなく、Java プログラムにライブラリとして組み込むことができます。Spring Boot はこの仕組みを使って、java -jar だけでアプリを起動可能にしています。",
        code: `// === 依存関係 (Gradle) ===
dependencies {
    implementation 'org.apache.tomcat.embed:tomcat-embed-core:11.0.2'
    implementation 'org.apache.tomcat.embed:tomcat-embed-jasper:11.0.2'
}

// === 最小構成の Embedded Tomcat ===
import org.apache.catalina.startup.Tomcat;
import org.apache.catalina.Context;
import jakarta.servlet.http.*;

public class EmbeddedTomcatApp {
    public static void main(String[] args) throws Exception {
        Tomcat tomcat = new Tomcat();
        tomcat.setPort(8080);

        // Connector を取得して初期化
        tomcat.getConnector();

        // Context（アプリケーション）を作成
        String docBase = new File(".").getAbsolutePath();
        Context ctx = tomcat.addContext("", docBase);

        // Servlet を登録
        Tomcat.addServlet(ctx, "hello", new HttpServlet() {
            @Override
            protected void doGet(HttpServletRequest req,
                                 HttpServletResponse resp)
                    throws IOException {
                resp.setContentType("application/json");
                resp.setCharacterEncoding("UTF-8");
                resp.getWriter().write(
                    """
                    {"message": "Hello from Embedded Tomcat!"}
                    """);
            }
        });
        ctx.addServletMappingDecoded("/api/hello", "hello");

        // 起動
        tomcat.start();
        System.out.println("Tomcat started on port 8080");
        tomcat.getServer().await();
    }
}`,
      },
      {
        title: "Spring Boot と Embedded Tomcat",
        content:
          "Spring Boot は内部的に Embedded Tomcat を使用しています。application.yml での設定方法や、Tomcat をカスタマイズする方法を理解しましょう。Jetty や Undertow への切り替えも簡単です。",
        code: `// === application.yml での Tomcat 設定 ===
server:
  port: 8080
  tomcat:
    # スレッドプール
    threads:
      max: 200
      min-spare: 10
    # 接続
    max-connections: 8192
    accept-count: 100
    connection-timeout: 20000
    # リクエスト制限
    max-http-form-post-size: 10MB
    max-swallow-size: 10MB
  # HTTPS
  ssl:
    key-store: classpath:keystore.p12
    key-store-password: changeit
    key-store-type: PKCS12
  # 圧縮
  compression:
    enabled: true
    mime-types: text/html,application/json,text/css,application/javascript
    min-response-size: 1024
  # アクセスログ
  servlet:
    access-log:
      enabled: true
      pattern: combined

// === Java コードでカスタマイズ ===
@Configuration
public class TomcatConfig {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory>
            tomcatCustomizer() {
        return factory -> {
            factory.addConnectorCustomizers(connector -> {
                connector.setProperty("maxThreads", "300");
                connector.setProperty("acceptCount", "150");
            });
            // アクセスログの追加
            factory.addContextValves(accessLogValve());
        };
    }

    private AccessLogValve accessLogValve() {
        AccessLogValve valve = new AccessLogValve();
        valve.setDirectory("logs");
        valve.setPrefix("access");
        valve.setSuffix(".log");
        valve.setPattern("combined");
        return valve;
    }
}

// === Tomcat → Jetty に切り替え ===
// build.gradle
dependencies {
    implementation('org.springframework.boot:spring-boot-starter-web') {
        exclude group: 'org.springframework.boot',
                module: 'spring-boot-starter-tomcat'
    }
    implementation 'org.springframework.boot:spring-boot-starter-jetty'
}`,
      },
      {
        title: "リバースプロキシとの連携",
        content:
          "本番環境では Nginx や Apache httpd をリバースプロキシとして前段に置き、Tomcat に転送する構成が一般的です。SSL 終端、ロードバランシング、静的ファイル配信をプロキシ側で行います。",
        code: `# === Nginx リバースプロキシ設定 ===
# /etc/nginx/conf.d/app.conf

upstream tomcat {
    server 127.0.0.1:8080;
    # 複数台のロードバランシング
    # server 192.168.1.10:8080;
    # server 192.168.1.11:8080;
}

server {
    listen 80;
    server_name example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # 静的ファイルは Nginx が直接配信
    location /static/ {
        alias /var/www/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # それ以外は Tomcat に転送
    location / {
        proxy_pass http://tomcat;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket サポート
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

<!-- === Tomcat 側: プロキシヘッダーの認識 === -->
<!-- server.xml の Engine 内に追加 -->
<Valve className="org.apache.catalina.valves.RemoteIpValve"
       remoteIpHeader="X-Forwarded-For"
       protocolHeader="X-Forwarded-Proto" />

<!-- Spring Boot の場合: application.yml -->
server:
  forward-headers-strategy: native
  tomcat:
    remoteip:
      remote-ip-header: X-Forwarded-For
      protocol-header: X-Forwarded-Proto`,
      },
    ],
  },
];

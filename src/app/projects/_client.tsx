"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import {
  Rocket,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  BookOpen,
  Database,
  Shield,
  Cog,
  Globe,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeEstimate: string;
  technologies: string[];
  icon: React.ReactNode;
  steps: { title: string; description: string; code?: string; language?: string }[];
}

const difficultyConfig = {
  beginner: { label: "入門", color: "#059669" },
  intermediate: { label: "中級", color: "#D97706" },
  advanced: { label: "上級", color: "#DC2626" },
};

const projects: Project[] = [
  {
    id: "todo-api",
    title: "TODO REST API",
    description:
      "Spring Boot で CRUD REST API を構築。JPA によるデータ永続化、Bean Validation、グローバル例外ハンドリング、MockMvc テストまで一通り学ぶ。",
    difficulty: "beginner",
    timeEstimate: "2-3 時間",
    technologies: ["Spring Boot", "Spring Data JPA", "H2", "Validation", "MockMvc"],
    icon: <CheckCircle2 className="h-5 w-5" />,
    steps: [
      {
        title: "プロジェクト作成",
        description:
          "Spring Initializr で依存関係を選択し、build.gradle.kts を構成します。",
        code: `// build.gradle.kts
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-validation")
    runtimeOnly("com.h2database:h2")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
}`,
      },
      {
        title: "エンティティ定義",
        description:
          "Todo エンティティを JPA アノテーションで定義。バリデーションも付与します。",
        code: `@Entity
public class Todo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank @Size(max = 200)
    private String title;

    private boolean completed;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // constructor, getter, setter
}`,
      },
      {
        title: "リポジトリ & サービス",
        description: "Spring Data JPA リポジトリとビジネスロジック層を作成します。",
        code: `public interface TodoRepository
        extends JpaRepository<Todo, Long> {
}

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepository repo;

    public List<Todo> findAll() {
        return repo.findAll(Sort.by("createdAt").descending());
    }
    public Todo create(Todo todo) {
        return repo.save(todo);
    }
    public Todo toggle(Long id) {
        Todo t = repo.findById(id).orElseThrow();
        t.setCompleted(!t.isCompleted());
        return repo.save(t);
    }
    public void delete(Long id) { repo.deleteById(id); }
}`,
      },
      {
        title: "REST コントローラ",
        description: "CRUD エンドポイントを @RestController で実装します。",
        code: `@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService service;

    @GetMapping
    public List<Todo> list() {
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo create(@Valid @RequestBody Todo todo) {
        return service.create(todo);
    }

    @PatchMapping("/{id}/toggle")
    public Todo toggle(@PathVariable Long id) {
        return service.toggle(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}`,
      },
      {
        title: "例外ハンドリング & テスト",
        description:
          "@RestControllerAdvice でエラー応答を統一し、MockMvc で統合テストを書きます。",
        code: `@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidation(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(e ->
            errors.put(e.getField(), e.getDefaultMessage()));
        return errors;
    }
}

@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {
    @Autowired MockMvc mvc;
    @Autowired ObjectMapper mapper;

    @Test
    void createAndList() throws Exception {
        var todo = new Todo();
        todo.setTitle("買い物");
        mvc.perform(post("/api/todos")
                .contentType(APPLICATION_JSON)
                .content(mapper.writeValueAsString(todo)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.title").value("買い物"));
    }
}`,
      },
    ],
  },
  {
    id: "book-manager",
    title: "書籍管理 API",
    description:
      "DTO / MapStruct 変換、ページネーション、仕様検索 (Specification) を備えた REST API。実務に近い設計パターンを学ぶ。",
    difficulty: "beginner",
    timeEstimate: "3-4 時間",
    technologies: ["Spring Boot", "JPA", "MapStruct", "Specification", "Pageable"],
    icon: <BookOpen className="h-5 w-5" />,
    steps: [
      {
        title: "エンティティ & DTO",
        description:
          "エンティティとリクエスト/レスポンス DTO を分離し、MapStruct でマッピングします。",
        code: `@Entity
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private int price;
    private LocalDate publishedDate;
}

// DTO
public record BookRequest(
    @NotBlank String title,
    @NotBlank String author,
    @Pattern(regexp = "\\\\d{13}") String isbn,
    @Min(0) int price
) {}

public record BookResponse(
    Long id, String title, String author,
    String isbn, int price, LocalDate publishedDate
) {}

// MapStruct Mapper
@Mapper(componentModel = "spring")
public interface BookMapper {
    Book toEntity(BookRequest req);
    BookResponse toResponse(Book book);
    List<BookResponse> toResponseList(List<Book> books);
}`,
      },
      {
        title: "Specification で動的検索",
        description:
          "JPA Specification を使い、タイトル・著者・価格帯による動的フィルタリングを実装します。",
        code: `public class BookSpec {
    public static Specification<Book> titleContains(String kw) {
        return (root, q, cb) ->
            kw == null ? null :
            cb.like(root.get("title"), "%" + kw + "%");
    }
    public static Specification<Book> authorIs(String author) {
        return (root, q, cb) ->
            author == null ? null :
            cb.equal(root.get("author"), author);
    }
    public static Specification<Book> priceBetween(
            Integer min, Integer max) {
        return (root, q, cb) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null)
                return cb.between(root.get("price"), min, max);
            if (min != null)
                return cb.ge(root.get("price"), min);
            return cb.le(root.get("price"), max);
        };
    }
}`,
      },
      {
        title: "ページネーション付きコントローラ",
        description:
          "Pageable を受け取り、Specification と組み合わせて検索結果を返します。",
        code: `@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {
    private final BookRepository repo;
    private final BookMapper mapper;

    @GetMapping
    public Page<BookResponse> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            Pageable pageable) {
        Specification<Book> spec = Specification
            .where(BookSpec.titleContains(title))
            .and(BookSpec.authorIs(author))
            .and(BookSpec.priceBetween(minPrice, maxPrice));
        return repo.findAll(spec, pageable)
                   .map(mapper::toResponse);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookResponse create(
            @Valid @RequestBody BookRequest req) {
        Book saved = repo.save(mapper.toEntity(req));
        return mapper.toResponse(saved);
    }
}`,
      },
    ],
  },
  {
    id: "blog-app",
    title: "ブログ Web アプリ",
    description:
      "Thymeleaf によるサーバーサイドレンダリング、Spring Security 認証、記事の CRUD、ページネーションを備えたフルスタック Web アプリ。",
    difficulty: "intermediate",
    timeEstimate: "5-8 時間",
    technologies: ["Spring Boot", "Thymeleaf", "Spring Security", "JPA", "PostgreSQL"],
    icon: <Globe className="h-5 w-5" />,
    steps: [
      {
        title: "エンティティ設計",
        description:
          "User と Post のリレーションを定義します。",
        code: `@Entity @Table(name = "posts")
public class Post {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

    private LocalDateTime publishedAt;
    private boolean published;
}

@Entity @Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true) private String username;
    private String password;
    private String displayName;
}`,
      },
      {
        title: "Spring Security 設定",
        description:
          "フォーム認証、URL ベースの認可、パスワードエンコーダを設定します。",
        code: `@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(a -> a
                .requestMatchers("/", "/posts/**",
                    "/css/**", "/register").permitAll()
                .anyRequest().authenticated())
            .formLogin(f -> f
                .loginPage("/login").permitAll())
            .logout(l -> l.logoutSuccessUrl("/"))
            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
      },
      {
        title: "コントローラ",
        description:
          "記事一覧（ページネーション付き）、詳細表示、新規作成のエンドポイントを作成します。",
        code: `@Controller
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping("/")
    public String index(Model model,
            @RequestParam(defaultValue = "0") int page) {
        Page<Post> posts = postService
            .findPublished(PageRequest.of(page, 10));
        model.addAttribute("posts", posts);
        return "index";
    }

    @GetMapping("/posts/{id}")
    public String show(@PathVariable Long id, Model m) {
        m.addAttribute("post", postService.findById(id));
        return "post/show";
    }

    @PostMapping("/posts")
    @PreAuthorize("isAuthenticated()")
    public String create(@Valid @ModelAttribute PostForm form,
            @AuthenticationPrincipal UserDetails user) {
        Post p = postService.create(form, user.getUsername());
        return "redirect:/posts/" + p.getId();
    }
}`,
      },
      {
        title: "Thymeleaf テンプレート",
        description: "記事一覧テンプレートとページネーション UI を実装します。",
        code: `<!-- templates/index.html -->
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head><title>ブログ</title></head>
<body>
  <h1>記事一覧</h1>
  <div th:each="post : \${posts.content}">
    <h2>
      <a th:href="@{/posts/{id}(id=\${post.id})}"
         th:text="\${post.title}">Title</a>
    </h2>
    <p th:text="\${post.author.displayName}">Author</p>
    <time th:text="\${#temporals.format(
        post.publishedAt, 'yyyy-MM-dd')}">Date</time>
  </div>

  <!-- ページネーション -->
  <nav th:if="\${posts.totalPages > 1}">
    <a th:each="i : \${#numbers.sequence(
        0, posts.totalPages - 1)}"
       th:href="@{/(page=\${i})}"
       th:text="\${i + 1}"
       th:classappend="\${i == posts.number}
           ? 'active' : ''">1</a>
  </nav>
</body>
</html>`,
        language: "html",
      },
    ],
  },
  {
    id: "jwt-auth",
    title: "JWT 認証 API",
    description:
      "Spring Security + JWT によるステートレス認証を実装。ログイン、トークン発行、リフレッシュ、ロールベースアクセス制御。",
    difficulty: "intermediate",
    timeEstimate: "4-6 時間",
    technologies: ["Spring Security", "JWT (jjwt)", "Spring Boot", "JPA"],
    icon: <Shield className="h-5 w-5" />,
    steps: [
      {
        title: "JWT ユーティリティ",
        description:
          "jjwt ライブラリでトークンの生成・解析・検証を行うクラスを作成します。",
        code: `@Component
public class JwtUtil {
    @Value("\${jwt.secret}")
    private String secret;

    private final long ACCESS_TTL  = 15 * 60 * 1000;  // 15 min
    private final long REFRESH_TTL = 7 * 24 * 3600_000L; // 7 days

    public String generateAccessToken(UserDetails user) {
        return buildToken(user, ACCESS_TTL);
    }

    public String generateRefreshToken(UserDetails user) {
        return buildToken(user, REFRESH_TTL);
    }

    private String buildToken(UserDetails u, long ttl) {
        return Jwts.builder()
            .subject(u.getUsername())
            .claim("roles", u.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList())
            .issuedAt(new Date())
            .expiration(new Date(
                System.currentTimeMillis() + ttl))
            .signWith(getSigningKey())
            .compact();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public boolean isValid(String token, UserDetails u) {
        return extractUsername(token)
            .equals(u.getUsername())
            && !isExpired(token);
    }

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
            Decoders.BASE64.decode(secret));
    }
}`,
      },
      {
        title: "JWT フィルター",
        description:
          "OncePerRequestFilter を継承し、リクエストごとにトークンを検証します。",
        code: `@Component
@RequiredArgsConstructor
public class JwtFilter
        extends OncePerRequestFilter {
    private final JwtUtil jwt;
    private final UserDetailsService uds;

    @Override
    protected void doFilterInternal(
            HttpServletRequest req,
            HttpServletResponse res,
            FilterChain chain)
            throws ServletException, IOException {

        String header = req.getHeader("Authorization");
        if (header == null
                || !header.startsWith("Bearer ")) {
            chain.doFilter(req, res);
            return;
        }

        String token = header.substring(7);
        String username = jwt.extractUsername(token);

        if (username != null && SecurityContextHolder
                .getContext().getAuthentication() == null) {
            UserDetails user = uds
                .loadUserByUsername(username);
            if (jwt.isValid(token, user)) {
                var auth = new UsernamePasswordAuthenticationToken(
                    user, null, user.getAuthorities());
                SecurityContextHolder.getContext()
                    .setAuthentication(auth);
            }
        }
        chain.doFilter(req, res);
    }
}`,
      },
      {
        title: "認証コントローラ",
        description: "ログイン、リフレッシュ、ユーザー登録エンドポイントを実装します。",
        code: `@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authManager;
    private final JwtUtil jwt;
    private final UserService userService;

    @PostMapping("/login")
    public TokenResponse login(
            @Valid @RequestBody LoginRequest req) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                req.username(), req.password()));
        UserDetails user = userService
            .loadUserByUsername(req.username());
        return new TokenResponse(
            jwt.generateAccessToken(user),
            jwt.generateRefreshToken(user));
    }

    @PostMapping("/refresh")
    public TokenResponse refresh(
            @RequestBody RefreshRequest req) {
        String username = jwt
            .extractUsername(req.refreshToken());
        UserDetails user = userService
            .loadUserByUsername(username);
        if (!jwt.isValid(req.refreshToken(), user))
            throw new ResponseStatusException(
                HttpStatus.UNAUTHORIZED);
        return new TokenResponse(
            jwt.generateAccessToken(user),
            req.refreshToken());
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(
            @Valid @RequestBody RegisterRequest req) {
        userService.register(req);
    }
}`,
      },
    ],
  },
  {
    id: "batch-csv",
    title: "CSV バッチ取込",
    description:
      "Spring Batch で CSV を読み込み、バリデーション・変換後に DB へ一括書込。スキップ処理、リスナー、スケジューリングも実装。",
    difficulty: "advanced",
    timeEstimate: "4-6 時間",
    technologies: ["Spring Batch", "Spring Boot", "JPA", "Scheduling"],
    icon: <Cog className="h-5 w-5" />,
    steps: [
      {
        title: "Job / Step 構成",
        description:
          "Reader → Processor → Writer の構成をチャンク単位で定義します。",
        code: `@Configuration
public class ImportJobConfig {
    @Bean
    public Job importJob(JobRepository repo,
                         Step importStep) {
        return new JobBuilder("importJob", repo)
            .incrementer(new RunIdIncrementer())
            .listener(jobListener())
            .start(importStep)
            .build();
    }

    @Bean
    public Step importStep(JobRepository repo,
            PlatformTransactionManager tx,
            ItemReader<CsvRow> reader,
            ItemProcessor<CsvRow, Employee> processor,
            ItemWriter<Employee> writer) {
        return new StepBuilder("importStep", repo)
            .<CsvRow, Employee>chunk(500, tx)
            .reader(reader)
            .processor(processor)
            .writer(writer)
            .faultTolerant()
            .skipLimit(50)
            .skip(ParseException.class)
            .listener(skipListener())
            .build();
    }
}`,
      },
      {
        title: "CSV Reader & Processor",
        description:
          "FlatFileItemReader で CSV を読み、バリデーション付きの Processor で変換します。",
        code: `@Bean
public FlatFileItemReader<CsvRow> reader() {
    return new FlatFileItemReaderBuilder<CsvRow>()
        .name("csvReader")
        .resource(new ClassPathResource(
            "data/employees.csv"))
        .delimited()
        .names("name","email","dept","salary")
        .targetType(CsvRow.class)
        .linesToSkip(1)
        .build();
}

@Component
public class EmployeeProcessor
        implements ItemProcessor<CsvRow, Employee> {
    @Override
    public Employee process(CsvRow row) {
        if (row.salary() < 0) return null; // skip
        return Employee.builder()
            .name(row.name().trim())
            .email(row.email().toLowerCase())
            .department(row.dept())
            .salary(row.salary())
            .importedAt(LocalDateTime.now())
            .build();
    }
}`,
      },
      {
        title: "リスナー & スケジューリング",
        description:
          "ジョブの実行結果をログ出力し、cron で定時実行します。",
        code: `@Component
@Slf4j
public class JobCompletionListener
    extends JobExecutionListenerSupport {

    @Override
    public void afterJob(JobExecution exec) {
        long read = exec.getStepExecutions().stream()
            .mapToLong(StepExecution::getReadCount).sum();
        long written = exec.getStepExecutions().stream()
            .mapToLong(StepExecution::getWriteCount).sum();
        long skipped = exec.getStepExecutions().stream()
            .mapToLong(StepExecution::getSkipCount).sum();

        log.info("Job completed: read={}, written={}, "
            + "skipped={}, status={}",
            read, written, skipped,
            exec.getStatus());
    }
}

@Component
@RequiredArgsConstructor
public class BatchScheduler {
    private final JobLauncher launcher;
    private final Job importJob;

    @Scheduled(cron = "0 0 2 * * *") // 毎日 02:00
    public void run() throws Exception {
        launcher.run(importJob,
            new JobParametersBuilder()
                .addLong("ts", System.currentTimeMillis())
                .toJobParameters());
    }
}`,
      },
    ],
  },
  {
    id: "order-microservice",
    title: "注文マイクロサービス",
    description:
      "Spring Cloud Gateway + Eureka + Resilience4j で注文・在庫・通知の 3 サービスを構成。サーキットブレーカーと分散トレーシングを学ぶ。",
    difficulty: "advanced",
    timeEstimate: "8-12 時間",
    technologies: [
      "Spring Cloud Gateway",
      "Eureka",
      "Resilience4j",
      "Kafka",
      "Docker Compose",
    ],
    icon: <Database className="h-5 w-5" />,
    steps: [
      {
        title: "サービス構成 & Eureka",
        description:
          "Eureka Server を立て、各サービスを登録します。",
        code: `// eureka-server/application.yml
server:
  port: 8761
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false

// order-service/application.yml
spring:
  application.name: order-service
eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/

// Order Service
@SpringBootApplication
@EnableDiscoveryClient
public class OrderServiceApp {
    public static void main(String[] args) {
        SpringApplication.run(
            OrderServiceApp.class, args);
    }
}`,
        language: "yaml",
      },
      {
        title: "API Gateway & ルーティング",
        description:
          "Spring Cloud Gateway でリクエストをルーティングし、レートリミットを設定します。",
        code: `// gateway/application.yml
spring:
  cloud:
    gateway:
      routes:
        - id: order-service
          uri: lb://order-service
          predicates:
            - Path=/api/orders/**
        - id: inventory-service
          uri: lb://inventory-service
          predicates:
            - Path=/api/inventory/**

// Rate limiter filter
@Bean
public RouteLocator routes(
        RouteLocatorBuilder b) {
    return b.routes()
        .route("order-service", r -> r
            .path("/api/orders/**")
            .filters(f -> f
                .requestRateLimiter(c -> c
                    .setRateLimiter(redisRateLimiter()))
                .circuitBreaker(c -> c
                    .setName("orderCB")
                    .setFallbackUri(
                        "forward:/fallback/order")))
            .uri("lb://order-service"))
        .build();
}`,
        language: "yaml",
      },
      {
        title: "サーキットブレーカー",
        description:
          "Resilience4j で在庫サービス呼び出しにサーキットブレーカーとリトライを適用します。",
        code: `@Service
@RequiredArgsConstructor
public class OrderService {
    private final InventoryClient inventoryClient;
    private final OrderRepository repo;
    private final KafkaTemplate<String, OrderEvent> kafka;

    @CircuitBreaker(name = "inventory",
                    fallbackMethod = "fallback")
    @Retry(name = "inventory")
    public Order placeOrder(OrderRequest req) {
        boolean inStock = inventoryClient
            .checkStock(req.productId(), req.qty());
        if (!inStock)
            throw new OutOfStockException();

        Order order = Order.builder()
            .productId(req.productId())
            .quantity(req.qty())
            .status(OrderStatus.PLACED)
            .build();
        Order saved = repo.save(order);

        kafka.send("order-events",
            new OrderEvent(saved.getId(), "PLACED"));
        return saved;
    }

    private Order fallback(OrderRequest req,
                           Throwable t) {
        return Order.builder()
            .status(OrderStatus.PENDING)
            .build();
    }
}`,
      },
      {
        title: "Docker Compose",
        description:
          "全サービスを Docker Compose で起動します。",
        code: `version: "3.9"
services:
  eureka:
    build: ./eureka-server
    ports: ["8761:8761"]

  gateway:
    build: ./gateway
    ports: ["8080:8080"]
    depends_on: [eureka]
    environment:
      EUREKA_URI: http://eureka:8761/eureka/

  order-service:
    build: ./order-service
    depends_on: [eureka, kafka, postgres]
    environment:
      EUREKA_URI: http://eureka:8761/eureka/
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/orders

  inventory-service:
    build: ./inventory-service
    depends_on: [eureka, postgres]

  kafka:
    image: confluentinc/cp-kafka:7.6.0
    ports: ["9092:9092"]

  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: orders
      POSTGRES_PASSWORD: secret`,
        language: "yaml",
      },
    ],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const diff = difficultyConfig[project.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <Card>
        <CardHeader
          className="cursor-pointer select-none"
          onClick={() => setExpanded((v) => !v)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: diff.color }}
                >
                  {project.icon}
                </span>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <Badge
                  className="text-xs text-white"
                  style={{ backgroundColor: diff.color }}
                >
                  {diff.label}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {project.timeEstimate}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" />
                  {project.steps.length} ステップ
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.technologies.map((t) => (
                  <Badge key={t} variant="outline" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
            <button className="p-1 text-muted-foreground shrink-0 mt-1">
              {expanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
          </div>
        </CardHeader>

        {expanded && (
          <CardContent className="pt-0 space-y-6">
            {project.steps.map((step, si) => (
              <div key={step.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: diff.color }}
                  >
                    {si + 1}
                  </div>
                  {si < project.steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-4">
                  <h4 className="font-bold mb-1">{step.title}</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    {step.description}
                  </p>
                  {step.code && (
                    <CodeBlock
                      code={step.code}
                      language={step.language ?? "java"}
                    />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}

export default function ProjectsClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <Rocket className="h-7 w-7 text-muted-foreground" />
          <h1 className="text-3xl md:text-4xl font-bold">実践プロジェクト集</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          ステップバイステップで Java / Spring Boot
          の実践プロジェクトを構築。入門から上級まで段階的にスキルアップできます。
        </p>
      </motion.div>

      <div className="space-y-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

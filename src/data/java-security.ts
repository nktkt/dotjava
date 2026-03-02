export interface SecuritySection {
  title: string;
  content: string;
  code?: string;
}

export interface SecurityChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: SecuritySection[];
}

export const securityCategories = [
  { id: "basics", name: "セキュリティ基礎", color: "var(--color-dads-navy)" },
  { id: "auth", name: "認証・認可", color: "var(--color-dads-blue)" },
  { id: "crypto", name: "暗号化", color: "var(--color-dads-purple)" },
  { id: "web", name: "Webセキュリティ", color: "var(--color-dads-error)" },
  { id: "coding", name: "セキュアコーディング", color: "var(--color-dads-success)" },
  { id: "ops", name: "テスト・運用", color: "var(--color-dads-warning)" },
] as const;

export const securityChapters: SecurityChapter[] = [
  // ===== セキュリティ基礎 =====
  {
    id: "security-overview",
    title: "セキュリティの基本概念",
    category: "basics",
    description: "CIA三要素、脅威モデリング、OWASP Top 10 など、セキュリティの基礎知識を学ぶ",
    sections: [
      {
        title: "CIA三要素",
        content:
          "情報セキュリティの3つの基本要素は、機密性（Confidentiality）、完全性（Integrity）、可用性（Availability）です。機密性は許可された者だけが情報にアクセスできること、完全性は情報が改ざんされていないこと、可用性は必要なときに情報にアクセスできることを意味します。",
        code: `// CIA三要素をJavaで考える

// 1. 機密性 (Confidentiality) - データの暗号化
// → パスワードはハッシュ化して保存
String hashedPassword = BCrypt.hashpw(rawPassword, BCrypt.gensalt());

// 2. 完全性 (Integrity) - データの改ざん検知
// → メッセージダイジェストで検証
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] hash = md.digest(data.getBytes(StandardCharsets.UTF_8));

// 3. 可用性 (Availability) - サービスの継続性
// → レート制限でDoS攻撃を防止
@RateLimiter(name = "apiLimiter", fallbackMethod = "fallback")
public ResponseEntity<String> api() {
    return ResponseEntity.ok("OK");
}`,
      },
      {
        title: "脅威モデリング",
        content:
          "脅威モデリングは、システムに対する潜在的な脅威を特定・分析するプロセスです。STRIDE モデル（Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege）が広く使われます。開発初期に実施することで、設計段階からセキュリティを組み込めます。",
        code: `// STRIDEモデルによる脅威分類
//
// S - Spoofing (なりすまし)
//     → 対策: 強固な認証（多要素認証、JWT）
//
// T - Tampering (改ざん)
//     → 対策: デジタル署名、入力バリデーション
//
// R - Repudiation (否認)
//     → 対策: 監査ログ、タイムスタンプ
//
// I - Information Disclosure (情報漏洩)
//     → 対策: 暗号化、アクセス制御
//
// D - Denial of Service (サービス拒否)
//     → 対策: レート制限、リソース管理
//
// E - Elevation of Privilege (権限昇格)
//     → 対策: 最小権限の原則、RBAC

// 監査ログの例
@Slf4j
@Aspect
@Component
public class AuditLogAspect {
    @Around("@annotation(Audited)")
    public Object audit(ProceedingJoinPoint jp) throws Throwable {
        String user = SecurityContextHolder.getContext()
            .getAuthentication().getName();
        log.info("User={} Action={}", user, jp.getSignature().getName());
        return jp.proceed();
    }
}`,
      },
      {
        title: "OWASP Top 10",
        content:
          "OWASP Top 10 は、Webアプリケーションで最も深刻なセキュリティリスクのランキングです。2021年版では、アクセス制御の不備、暗号化の失敗、インジェクション、安全でない設計、セキュリティの設定ミスなどが上位に挙げられています。Java開発者はこれらを理解し対策を講じる必要があります。",
        code: `// OWASP Top 10 (2021) と Java での主な対策
//
// A01: アクセス制御の不備
//   → Spring Security の @PreAuthorize
//
// A02: 暗号化の失敗
//   → BCrypt, AES-256, TLS 1.3
//
// A03: インジェクション
//   → PreparedStatement, JPA パラメータバインド
//
// A04: 安全でない設計
//   → 脅威モデリング, セキュリティ設計レビュー
//
// A05: セキュリティの設定ミス
//   → Security Headers, デフォルト設定の変更
//
// A06: 脆弱で古いコンポーネント
//   → Dependabot, OWASP Dependency-Check
//
// A07: 識別と認証の失敗
//   → 多要素認証, セッション管理
//
// A08: ソフトウェアとデータの整合性の不備
//   → 署名検証, CI/CDパイプラインの保護
//
// A09: セキュリティログと監視の失敗
//   → 構造化ログ, アラート設定
//
// A10: SSRF (サーバーサイドリクエストフォージェリ)
//   → URL検証, ネットワーク分離`,
      },
    ],
  },
  {
    id: "java-security-arch",
    title: "Javaセキュリティアーキテクチャ",
    category: "basics",
    description: "JCA/JCE、SecurityManager、サンドボックスモデルなど Java 固有のセキュリティ機構を理解する",
    sections: [
      {
        title: "JCA / JCE（Java Cryptography Architecture / Extension）",
        content:
          "JCA は Java の暗号化フレームワークで、プロバイダベースのアーキテクチャを採用しています。MessageDigest、Signature、Cipher、KeyFactory などのエンジンクラスを通じて暗号化機能を提供します。JCE は JCA を拡張し、より強力な暗号化アルゴリズムをサポートします。",
        code: `import java.security.*;
import javax.crypto.*;

// JCA プロバイダの確認
for (Provider provider : Security.getProviders()) {
    System.out.println(provider.getName() + " v" + provider.getVersion());
}

// MessageDigest（ハッシュ）
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] hash = md.digest("Hello".getBytes(StandardCharsets.UTF_8));

// Cipher（暗号化）
Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
KeyGenerator kg = KeyGenerator.getInstance("AES");
kg.init(256);
SecretKey key = kg.generateKey();

// Signature（デジタル署名）
Signature sig = Signature.getInstance("SHA256withRSA");

// SecureRandom（安全な乱数）
SecureRandom random = SecureRandom.getInstanceStrong();
byte[] nonce = new byte[16];
random.nextBytes(nonce);`,
      },
      {
        title: "SecurityManager とサンドボックス（非推奨）",
        content:
          "SecurityManager は Java のアクセス制御メカニズムで、コードがファイルアクセスやネットワーク接続などの特権操作を行う前に権限をチェックします。Java 17 で非推奨となり、将来のバージョンで削除予定です。現在はコンテナ技術やOS レベルのサンドボックスが推奨されます。",
        code: `// SecurityManager は Java 17 で @Deprecated(forRemoval=true)
// 代替としてコンテナベースの分離を推奨

// === 従来の SecurityManager（参考） ===
// policy ファイルでパーミッションを定義
// grant codeBase "file:/app/lib/-" {
//     permission java.io.FilePermission "/tmp/*", "read,write";
//     permission java.net.SocketPermission "api.example.com:443", "connect";
// };

// === 現代的な代替手段 ===
// 1. コンテナによる分離（Docker）
// FROM eclipse-temurin:21-jre-alpine
// RUN addgroup -S app && adduser -S app -G app
// USER app
// COPY --chown=app:app target/app.jar /app/app.jar

// 2. Java モジュールシステム（JPMS）による境界
// module com.example.app {
//     requires java.base;
//     requires java.sql;
//     exports com.example.app.api;  // 公開するパッケージを限定
// }

// 3. ProcessBuilder でサンドボックス実行
ProcessBuilder pb = new ProcessBuilder("java",
    "--module-path", "mods",
    "-m", "sandbox/com.example.Main");
pb.redirectErrorStream(true);
Process p = pb.start();`,
      },
      {
        title: "Java モジュールシステムとセキュリティ",
        content:
          "Java 9 で導入されたモジュールシステム（JPMS）は、強力なカプセル化を提供します。モジュール境界を定義することで、内部 API への不正アクセスを防止し、攻撃面を縮小できます。リフレクション攻撃への耐性も向上します。",
        code: `// module-info.java でアクセス制御を定義
module com.example.security {
    // 必要なモジュールだけを依存
    requires java.base;
    requires java.logging;
    requires spring.boot;
    requires spring.security.core;

    // 公開 API のみをエクスポート
    exports com.example.security.api;
    exports com.example.security.dto;

    // 内部実装は非公開（リフレクションでもアクセス不可）
    // com.example.security.internal は外部からアクセスできない

    // 特定モジュールにのみリフレクションを許可
    opens com.example.security.entity to spring.core;
}

// 不正なリフレクションアクセスはブロックされる
// java.lang.reflect.InaccessibleObjectException:
//   Unable to make field private String password accessible`,
      },
    ],
  },

  // ===== 認証・認可 =====
  {
    id: "authentication",
    title: "認証の基礎",
    category: "auth",
    description: "セッション認証、フォーム認証、Basic認証など、認証の基本的な仕組みを学ぶ",
    sections: [
      {
        title: "認証と認可の違い",
        content:
          "認証（Authentication）は「あなたは誰か」を確認するプロセスで、認可（Authorization）は「何ができるか」を決定するプロセスです。認証が先に行われ、その結果に基づいて認可が行われます。Java Web アプリでは、Servlet フィルタや Spring Security で実装します。",
        code: `// 認証 (Authentication): ユーザーの身元確認
// 認可 (Authorization): アクセス権限の確認

// Spring Security での認証・認可の流れ
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            // 認可設定
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                .anyRequest().authenticated()
            )
            // 認証方式（フォームログイン）
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .permitAll()
            );
        return http.build();
    }
}`,
      },
      {
        title: "セッション認証",
        content:
          "セッション認証は、サーバー側でセッションを管理する伝統的な方式です。ユーザーがログインするとセッション ID が発行され、Cookie を通じてクライアントに送信されます。以降のリクエストではこの Cookie を使って認証状態を維持します。",
        code: `// Servlet でのセッション管理
@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req,
                          HttpServletResponse resp)
            throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        if (authenticate(username, password)) {
            // セッション作成（既存セッションは無効化）
            req.getSession().invalidate();
            HttpSession session = req.getSession(true);
            session.setAttribute("user", username);
            session.setMaxInactiveInterval(30 * 60); // 30分

            resp.sendRedirect("/dashboard");
        } else {
            resp.sendRedirect("/login?error=true");
        }
    }
}

// セッション固定攻撃対策
// Spring Security はログイン成功時に自動でセッションIDを変更
http.sessionManagement(session -> session
    .sessionFixation().changeSessionId()
    .maximumSessions(1)  // 同時セッション数制限
    .maxSessionsPreventsLogin(true)
);`,
      },
      {
        title: "Basic 認証と Digest 認証",
        content:
          "Basic 認証は HTTP ヘッダーに Base64 エンコードした認証情報を送信するシンプルな方式です。HTTPS と組み合わせないと認証情報が平文で流れるため危険です。Digest 認証はハッシュを使ってパスワードを保護しますが、現在は TLS + トークンベース認証が主流です。",
        code: `// Basic認証の仕組み
// リクエストヘッダー:
// Authorization: Basic dXNlcjpwYXNzd29yZA==
//                      ↑ "user:password" をBase64エンコード

// Spring Security での Basic 認証設定
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/**").authenticated()
        )
        .httpBasic(Customizer.withDefaults());
    return http.build();
}

// Basic認証のデコード（参考）
String header = request.getHeader("Authorization");
if (header != null && header.startsWith("Basic ")) {
    String decoded = new String(
        Base64.getDecoder().decode(header.substring(6)),
        StandardCharsets.UTF_8
    );
    String[] credentials = decoded.split(":", 2);
    String username = credentials[0];
    String password = credentials[1];
}`,
      },
    ],
  },
  {
    id: "spring-security",
    title: "Spring Security 入門",
    category: "auth",
    description: "Spring Security の設定、フィルタチェーン、UserDetailsService を学ぶ",
    sections: [
      {
        title: "Spring Security のアーキテクチャ",
        content:
          "Spring Security は Servlet フィルタをベースにしたセキュリティフレームワークです。DelegatingFilterProxy → FilterChainProxy → SecurityFilterChain の順にリクエストが処理されます。各フィルタが認証、認可、CSRF 保護などの機能を担当します。",
        code: `// Spring Security のフィルタチェーン
// リクエスト → DelegatingFilterProxy
//           → FilterChainProxy
//           → SecurityFilterChain
//              ├─ CorsFilter
//              ├─ CsrfFilter
//              ├─ UsernamePasswordAuthenticationFilter
//              ├─ BearerTokenAuthenticationFilter
//              ├─ AuthorizationFilter
//              └─ ExceptionTranslationFilter

// 依存関係（build.gradle）
// implementation 'org.springframework.boot:spring-boot-starter-security'

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
                .requestMatchers("/", "/css/**", "/js/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login").permitAll()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/").permitAll()
            );
        return http.build();
    }
}`,
      },
      {
        title: "UserDetailsService の実装",
        content:
          "UserDetailsService は Spring Security の認証の中核インターフェースです。ユーザー名からユーザー情報をロードし、認証プロセスに提供します。データベースからユーザー情報を取得する場合、このインターフェースを実装します。",
        code: `@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "ユーザーが見つかりません: " + username));

        return org.springframework.security.core.userdetails.User
            .withUsername(user.getUsername())
            .password(user.getPassword())  // BCrypt ハッシュ済み
            .roles(user.getRoles().stream()
                .map(Role::getName)
                .toArray(String[]::new))
            .build();
    }
}

// パスワードエンコーダーの設定
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}`,
      },
      {
        title: "メソッドレベルセキュリティ",
        content:
          "Spring Security はコントローラーやサービスのメソッド単位でアクセス制御を設定できます。@PreAuthorize, @PostAuthorize, @Secured アノテーションを使い、SpEL（Spring Expression Language）で柔軟な条件を記述できます。",
        code: `@Configuration
@EnableMethodSecurity  // メソッドセキュリティを有効化
public class MethodSecurityConfig {}

@Service
public class UserService {

    // ロールベースのアクセス制御
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // 引数を使った条件
    @PreAuthorize("#userId == authentication.principal.id " +
                  "or hasRole('ADMIN')")
    public User findById(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }

    // 戻り値を使った条件
    @PostAuthorize("returnObject.owner == authentication.name")
    public Document getDocument(Long id) {
        return documentRepository.findById(id).orElseThrow();
    }

    // カスタム権限チェック
    @PreAuthorize("@permissionChecker.canEdit(#id, authentication)")
    public void updateProject(Long id, ProjectDto dto) {
        // 更新処理
    }
}`,
      },
    ],
  },
  {
    id: "jwt-auth",
    title: "JWT 認証",
    category: "auth",
    description: "JWT トークンの生成・検証、リフレッシュトークンの仕組みを学ぶ",
    sections: [
      {
        title: "JWT の構造",
        content:
          "JWT（JSON Web Token）は Header.Payload.Signature の3部分で構成されるトークンです。ステートレスな認証を実現でき、マイクロサービス間の認証に適しています。サーバー側でセッションを持たないため、水平スケーリングが容易です。",
        code: `// JWT の構造
// eyJhbGciOi... . eyJzdWIiOi... . SflKxwRJSM...
//   Header        Payload          Signature

// Header: {"alg": "HS256", "typ": "JWT"}
// Payload: {"sub": "user123", "role": "ADMIN", "exp": 1700000000}
// Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)

// 依存関係
// implementation 'io.jsonwebtoken:jjwt-api:0.12.6'
// runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.6'
// runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.6'

@Component
public class JwtTokenProvider {

    @Value("\${jwt.secret}")
    private String secretKey;

    @Value("\${jwt.expiration:3600000}")  // デフォルト1時間
    private long expiration;

    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(
            secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
            .subject(userDetails.getUsername())
            .claim("roles", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
    }
}`,
      },
      {
        title: "JWT の検証とフィルタ",
        content:
          "JWT 認証では、リクエストの Authorization ヘッダーからトークンを取得し、署名の検証、有効期限の確認を行います。Spring Security のフィルタチェーンにカスタムフィルタを追加して実装します。",
        code: `@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    // コンストラクタ省略

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
            SecurityContextHolder.getContext()
                .setAuthentication(auth);
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
}

// SecurityConfig にフィルタを登録
http.addFilterBefore(jwtFilter,
    UsernamePasswordAuthenticationFilter.class);`,
      },
      {
        title: "リフレッシュトークン",
        content:
          "アクセストークンの有効期限を短く設定し、リフレッシュトークンで更新する方式が推奨されます。アクセストークンが漏洩しても、短い有効期限により被害を最小限に抑えられます。リフレッシュトークンはデータベースに保存し、無効化できるようにします。",
        code: `@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest req) {
        // 認証
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                req.getUsername(), req.getPassword()));

        // アクセストークン（短い有効期限: 15分）
        String accessToken = jwtProvider.generateToken(auth, 15);

        // リフレッシュトークン（長い有効期限: 7日）
        String refreshToken = UUID.randomUUID().toString();
        refreshTokenRepository.save(new RefreshToken(
            refreshToken, auth.getName(),
            Instant.now().plusSeconds(7 * 24 * 3600)));

        return new TokenResponse(accessToken, refreshToken);
    }

    @PostMapping("/refresh")
    public TokenResponse refresh(@RequestBody RefreshRequest req) {
        RefreshToken stored = refreshTokenRepository
            .findByToken(req.getRefreshToken())
            .orElseThrow(() -> new AuthException("無効なトークン"));

        if (stored.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(stored);
            throw new AuthException("トークン期限切れ");
        }

        // 新しいアクセストークンを発行
        String newAccessToken = jwtProvider
            .generateTokenForUser(stored.getUsername(), 15);
        return new TokenResponse(newAccessToken,
            req.getRefreshToken());
    }
}`,
      },
    ],
  },
  {
    id: "oauth2-oidc",
    title: "OAuth 2.0 / OpenID Connect",
    category: "auth",
    description: "認可コードフロー、Spring Security OAuth2 Client の設定と実装を学ぶ",
    sections: [
      {
        title: "OAuth 2.0 の仕組み",
        content:
          "OAuth 2.0 は認可のためのフレームワークで、ユーザーがサードパーティアプリにリソースへの限定的なアクセスを許可できます。認可コードフロー、クライアントクレデンシャルフローなど複数のフローがあり、Web アプリでは認可コードフローが推奨されます。",
        code: `// OAuth 2.0 認可コードフロー
//
// 1. ユーザー → アプリ: ログインボタンをクリック
// 2. アプリ → 認可サーバー: 認可リクエスト（リダイレクト）
//    GET /authorize?response_type=code
//        &client_id=my-app
//        &redirect_uri=https://app.example.com/callback
//        &scope=openid profile email
//        &state=xyz123
//
// 3. ユーザー → 認可サーバー: ログイン＆同意
// 4. 認可サーバー → アプリ: 認可コードを返却（リダイレクト）
//    GET /callback?code=AUTH_CODE&state=xyz123
//
// 5. アプリ → 認可サーバー: コードをトークンに交換
//    POST /token
//    grant_type=authorization_code
//    &code=AUTH_CODE
//    &redirect_uri=https://app.example.com/callback
//    &client_id=my-app
//    &client_secret=SECRET
//
// 6. 認可サーバー → アプリ: アクセストークン + IDトークン
//    {"access_token": "...", "id_token": "...", "token_type": "Bearer"}`,
      },
      {
        title: "Spring Security OAuth2 Client",
        content:
          "Spring Security は OAuth2 / OpenID Connect のクライアント機能を標準サポートしています。application.yml に設定を記述するだけで、Google や GitHub などの外部プロバイダとの連携が可能です。",
        code: `// application.yml
// spring:
//   security:
//     oauth2:
//       client:
//         registration:
//           google:
//             client-id: \${GOOGLE_CLIENT_ID}
//             client-secret: \${GOOGLE_CLIENT_SECRET}
//             scope: openid, profile, email
//           github:
//             client-id: \${GITHUB_CLIENT_ID}
//             client-secret: \${GITHUB_CLIENT_SECRET}
//             scope: read:user, user:email

@Configuration
@EnableWebSecurity
public class OAuth2SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .userInfoEndpoint(info -> info
                    .userService(customOAuth2UserService))
                .successHandler(oAuth2SuccessHandler)
            );
        return http.build();
    }
}`,
      },
      {
        title: "OpenID Connect と IDトークン",
        content:
          "OpenID Connect（OIDC）は OAuth 2.0 の上に構築された認証レイヤーです。ID トークン（JWT 形式）でユーザーの身元情報を取得できます。Spring Security の OidcUser インターフェースを通じてユーザー情報にアクセスします。",
        code: `// カスタム OAuth2/OIDC ユーザーサービス
@Service
public class CustomOAuth2UserService
        extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest req)
            throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(req);

        String provider = req.getClientRegistration()
            .getRegistrationId();  // "google", "github"
        String providerId = oAuth2User.getName();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // DB にユーザーを保存/更新
        User user = userRepository
            .findByProviderAndProviderId(provider, providerId)
            .map(existing -> {
                existing.setName(name);
                return userRepository.save(existing);
            })
            .orElseGet(() -> userRepository.save(
                new User(email, name, provider, providerId)));

        return new CustomOAuth2User(user, oAuth2User.getAttributes());
    }
}

// コントローラーでユーザー情報を取得
@GetMapping("/profile")
public String profile(@AuthenticationPrincipal OidcUser user) {
    String email = user.getEmail();
    String name = user.getFullName();
    return "profile";
}`,
      },
    ],
  },

  // ===== 暗号化 =====
  {
    id: "hashing",
    title: "ハッシュとメッセージダイジェスト",
    category: "crypto",
    description: "SHA-256、BCrypt によるパスワード保管など、ハッシュの基礎と活用を学ぶ",
    sections: [
      {
        title: "ハッシュ関数の基礎",
        content:
          "ハッシュ関数は任意長のデータを固定長のハッシュ値に変換する一方向関数です。同じ入力からは常に同じ出力が得られますが、出力から入力を復元することはできません。データの整合性検証やパスワード保管に使用されます。",
        code: `import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.util.HexFormat;

// SHA-256 ハッシュの計算
MessageDigest md = MessageDigest.getInstance("SHA-256");
byte[] hash = md.digest(
    "Hello, Security!".getBytes(StandardCharsets.UTF_8));
String hexHash = HexFormat.of().formatHex(hash);
// → "a1b2c3..." (64文字の16進数文字列)

// ファイルのチェックサム計算
public static String fileChecksum(Path path) throws Exception {
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    try (InputStream is = Files.newInputStream(path);
         DigestInputStream dis = new DigestInputStream(is, md)) {
        byte[] buf = new byte[8192];
        while (dis.read(buf) != -1) {}
    }
    return HexFormat.of().formatHex(md.digest());
}

// HMAC（メッセージ認証コード）
Mac mac = Mac.getInstance("HmacSHA256");
SecretKeySpec keySpec = new SecretKeySpec(
    secretKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
mac.init(keySpec);
byte[] hmac = mac.doFinal(
    message.getBytes(StandardCharsets.UTF_8));`,
      },
      {
        title: "BCrypt によるパスワードハッシュ",
        content:
          "パスワード保管には単純な SHA-256 ではなく、BCrypt のような専用アルゴリズムを使います。BCrypt はソルト（ランダム値）を自動生成し、コストファクターによる計算量調整が可能で、ブルートフォース攻撃への耐性が高いです。",
        code: `// Spring Security の BCryptPasswordEncoder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

PasswordEncoder encoder = new BCryptPasswordEncoder();

// パスワードのハッシュ化（ソルト自動生成）
String hashed = encoder.encode("myPassword123");
// → "$2a$10$N9qo8uLOickgx2ZMRZoMye..."
//    $2a$ = BCrypt識別子
//    10   = コストファクター（2^10回反復）
//    残り = ソルト + ハッシュ値

// パスワードの検証
boolean matches = encoder.matches("myPassword123", hashed);
// → true

// コストファクターの調整（高いほど安全だが遅い）
PasswordEncoder strongEncoder = new BCryptPasswordEncoder(12);

// === やってはいけないこと ===
// NG: MD5やSHA-256単独でパスワードを保管
// String bad = DigestUtils.md5Hex(password);  // 危険！
// NG: ソルトなしのハッシュ
// NG: 自前の暗号化アルゴリズム`,
      },
      {
        title: "Argon2 と最新のパスワードハッシュ",
        content:
          "Argon2 は Password Hashing Competition（2015年）の優勝アルゴリズムで、メモリハード関数によりGPU攻撃への耐性が BCrypt より高いです。Spring Security 5.x 以降でサポートされ、新規プロジェクトでは Argon2id の使用が推奨されます。",
        code: `// Argon2 パスワードエンコーダー
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

// Argon2id（推奨）
PasswordEncoder argon2 = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();
String hashed = argon2.encode("myPassword");
boolean valid = argon2.matches("myPassword", hashed);

// 複数エンコーダーの共存（マイグレーション対応）
@Bean
public PasswordEncoder passwordEncoder() {
    Map<String, PasswordEncoder> encoders = new HashMap<>();
    encoders.put("bcrypt", new BCryptPasswordEncoder());
    encoders.put("argon2", Argon2PasswordEncoder
        .defaultsForSpringSecurity_v5_8());

    DelegatingPasswordEncoder delegate =
        new DelegatingPasswordEncoder("argon2", encoders);
    // 旧BCryptハッシュもそのまま検証可能
    // {bcrypt}$2a$10$... → BCryptで検証
    // {argon2}$argon2id$... → Argon2で検証
    return delegate;
}`,
      },
    ],
  },
  {
    id: "encryption",
    title: "暗号化と復号",
    category: "crypto",
    description: "AES、RSA による暗号化・復号と鍵管理の基礎を学ぶ",
    sections: [
      {
        title: "共通鍵暗号（AES）",
        content:
          "AES（Advanced Encryption Standard）は共通鍵暗号の標準アルゴリズムです。暗号化と復号に同じ鍵を使います。GCM モードを使用すると暗号化と同時に認証（改ざん検知）も行えるため、AES/GCM/NoPadding が推奨されます。",
        code: `import javax.crypto.*;
import javax.crypto.spec.*;
import java.security.SecureRandom;

public class AesGcmEncryption {

    private static final int KEY_SIZE = 256;  // ビット
    private static final int IV_SIZE = 12;    // バイト（GCM推奨）
    private static final int TAG_SIZE = 128;  // ビット

    // 鍵の生成
    public static SecretKey generateKey() throws Exception {
        KeyGenerator kg = KeyGenerator.getInstance("AES");
        kg.init(KEY_SIZE);
        return kg.generateKey();
    }

    // 暗号化
    public static byte[] encrypt(byte[] plaintext, SecretKey key)
            throws Exception {
        byte[] iv = new byte[IV_SIZE];
        new SecureRandom().nextBytes(iv);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.ENCRYPT_MODE, key,
            new GCMParameterSpec(TAG_SIZE, iv));
        byte[] ciphertext = cipher.doFinal(plaintext);

        // IV + 暗号文を結合して返す
        byte[] result = new byte[iv.length + ciphertext.length];
        System.arraycopy(iv, 0, result, 0, iv.length);
        System.arraycopy(ciphertext, 0, result, iv.length,
            ciphertext.length);
        return result;
    }

    // 復号
    public static byte[] decrypt(byte[] encrypted, SecretKey key)
            throws Exception {
        byte[] iv = Arrays.copyOfRange(encrypted, 0, IV_SIZE);
        byte[] ciphertext = Arrays.copyOfRange(encrypted,
            IV_SIZE, encrypted.length);

        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        cipher.init(Cipher.DECRYPT_MODE, key,
            new GCMParameterSpec(TAG_SIZE, iv));
        return cipher.doFinal(ciphertext);
    }
}`,
      },
      {
        title: "公開鍵暗号（RSA）",
        content:
          "RSA は公開鍵と秘密鍵のペアを使う非対称暗号です。公開鍵で暗号化したデータは秘密鍵でのみ復号できます。鍵交換やデジタル署名に使われますが、AES に比べて処理が重いため、大量データの暗号化にはハイブリッド暗号（RSA + AES）を使います。",
        code: `import java.security.*;
import javax.crypto.Cipher;

// RSA 鍵ペアの生成
KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
kpg.initialize(2048);  // 最低2048ビット推奨
KeyPair keyPair = kpg.generateKeyPair();
PublicKey publicKey = keyPair.getPublic();
PrivateKey privateKey = keyPair.getPrivate();

// RSA 暗号化（公開鍵で暗号化）
Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPWithSHA-256AndMGF1Padding");
cipher.init(Cipher.ENCRYPT_MODE, publicKey);
byte[] encrypted = cipher.doFinal(
    "秘密のメッセージ".getBytes(StandardCharsets.UTF_8));

// RSA 復号（秘密鍵で復号）
cipher.init(Cipher.DECRYPT_MODE, privateKey);
byte[] decrypted = cipher.doFinal(encrypted);
String message = new String(decrypted, StandardCharsets.UTF_8);

// ハイブリッド暗号: RSA で AES 鍵を暗号化
SecretKey aesKey = AesGcmEncryption.generateKey();
cipher.init(Cipher.ENCRYPT_MODE, publicKey);
byte[] encryptedAesKey = cipher.doFinal(aesKey.getEncoded());
// データ本体は AES で暗号化
byte[] encryptedData = AesGcmEncryption.encrypt(data, aesKey);`,
      },
      {
        title: "鍵管理",
        content:
          "暗号化の安全性は鍵の管理に大きく依存します。鍵をソースコードにハードコードしたり、設定ファイルに平文で保存してはいけません。Java KeyStore、環境変数、Vault などの外部シークレット管理サービスを使用します。",
        code: `// Java KeyStore（JKS/PKCS12）による鍵管理
KeyStore ks = KeyStore.getInstance("PKCS12");
try (InputStream is = Files.newInputStream(
        Path.of("keystore.p12"))) {
    ks.load(is, "keystorePass".toCharArray());
}

// 秘密鍵の取得
PrivateKey privateKey = (PrivateKey) ks.getKey(
    "mykey", "keyPass".toCharArray());

// 証明書の取得
Certificate cert = ks.getCertificate("mykey");
PublicKey publicKey = cert.getPublicKey();

// AES 鍵の保存と取得
SecretKey aesKey = generateKey();
KeyStore.SecretKeyEntry entry =
    new KeyStore.SecretKeyEntry(aesKey);
ks.setEntry("aes-key", entry,
    new KeyStore.PasswordProtection("keyPass".toCharArray()));

// === Spring Boot での設定 ===
// application.yml で環境変数を参照
// encryption:
//   key: \${ENCRYPTION_KEY}  # 環境変数から取得

// === やってはいけないこと ===
// NG: ソースコードにハードコード
// private static final String KEY = "my-secret-key";
// NG: Git にコミット
// NG: ログに鍵を出力`,
      },
    ],
  },
  {
    id: "digital-signature",
    title: "デジタル署名と証明書",
    category: "crypto",
    description: "署名の生成・検証、KeyStore、SSL/TLS の仕組みを学ぶ",
    sections: [
      {
        title: "デジタル署名の仕組み",
        content:
          "デジタル署名は、秘密鍵でデータのハッシュを暗号化して作成します。受信者は公開鍵で署名を検証し、データの完全性と送信者の真正性を確認できます。Java では java.security.Signature クラスで実装します。",
        code: `import java.security.*;

// 鍵ペア生成
KeyPairGenerator kpg = KeyPairGenerator.getInstance("RSA");
kpg.initialize(2048);
KeyPair keyPair = kpg.generateKeyPair();

// 署名の生成（秘密鍵で署名）
Signature signer = Signature.getInstance("SHA256withRSA");
signer.initSign(keyPair.getPrivate());
signer.update("重要なメッセージ".getBytes(StandardCharsets.UTF_8));
byte[] signature = signer.sign();

// 署名の検証（公開鍵で検証）
Signature verifier = Signature.getInstance("SHA256withRSA");
verifier.initVerify(keyPair.getPublic());
verifier.update("重要なメッセージ".getBytes(StandardCharsets.UTF_8));
boolean isValid = verifier.verify(signature);
// → true（データが改ざんされていなければ）

// 改ざんされたデータで検証
verifier.initVerify(keyPair.getPublic());
verifier.update("改ざんされたメッセージ".getBytes(StandardCharsets.UTF_8));
boolean isTampered = verifier.verify(signature);
// → false`,
      },
      {
        title: "SSL/TLS と HTTPS",
        content:
          "SSL/TLS は通信を暗号化するプロトコルで、HTTPS はこれを HTTP に適用したものです。証明書による認証、鍵交換、データの暗号化を行います。Spring Boot では application.yml でTLS を設定し、Let's Encrypt などで証明書を取得します。",
        code: `// Spring Boot で HTTPS を設定
// application.yml
// server:
//   port: 443
//   ssl:
//     enabled: true
//     key-store: classpath:keystore.p12
//     key-store-password: \${SSL_KEYSTORE_PASSWORD}
//     key-store-type: PKCS12
//     key-alias: tomcat

// HTTP → HTTPS リダイレクト設定
@Configuration
public class HttpsRedirectConfig {

    @Bean
    public ServletWebServerFactory servletContainer() {
        TomcatServletWebServerFactory tomcat =
            new TomcatServletWebServerFactory() {
            @Override
            protected void postProcessContext(Context context) {
                SecurityConstraint sc = new SecurityConstraint();
                sc.setUserConstraint("CONFIDENTIAL");
                SecurityCollection collection =
                    new SecurityCollection();
                collection.addPattern("/*");
                sc.addCollection(collection);
                context.addConstraint(sc);
            }
        };
        tomcat.addAdditionalTomcatConnectors(httpConnector());
        return tomcat;
    }

    private Connector httpConnector() {
        Connector connector = new Connector(
            TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
        connector.setScheme("http");
        connector.setPort(80);
        connector.setRedirectPort(443);
        return connector;
    }
}`,
      },
      {
        title: "keytool による証明書管理",
        content:
          "keytool は Java に付属する鍵と証明書の管理ツールです。自己署名証明書の作成、CSR（証明書署名要求）の生成、証明書のインポート・エクスポートを行えます。開発環境での HTTPS テストや、本番環境の証明書管理に使います。",
        code: `// keytool コマンド例

// 1. 自己署名証明書付きキーストアの作成
// keytool -genkeypair -alias tomcat -keyalg RSA -keysize 2048 \\
//         -storetype PKCS12 -keystore keystore.p12 \\
//         -validity 365 -storepass changeit \\
//         -dname "CN=localhost,OU=Dev,O=Example,L=Tokyo,C=JP"

// 2. CSR（証明書署名要求）の生成
// keytool -certreq -alias tomcat -keystore keystore.p12 \\
//         -file server.csr

// 3. 証明書のインポート
// keytool -importcert -alias ca-root -keystore keystore.p12 \\
//         -file ca-cert.pem -trustcacerts

// 4. キーストアの内容確認
// keytool -list -keystore keystore.p12 -v

// 5. Java のトラストストアに CA 証明書を追加
// keytool -importcert -alias custom-ca \\
//         -keystore $JAVA_HOME/lib/security/cacerts \\
//         -file custom-ca.pem -storepass changeit

// プログラムからトラストストアを設定
System.setProperty("javax.net.ssl.trustStore",
    "/path/to/truststore.p12");
System.setProperty("javax.net.ssl.trustStorePassword",
    "changeit");`,
      },
    ],
  },

  // ===== Webセキュリティ =====
  {
    id: "xss-prevention",
    title: "XSS 対策",
    category: "web",
    description: "クロスサイトスクリプティングの種類、エスケープ処理、CSP による防御を学ぶ",
    sections: [
      {
        title: "XSS の種類",
        content:
          "クロスサイトスクリプティング（XSS）は、攻撃者がWebページに悪意のあるスクリプトを注入する攻撃です。反射型（URL パラメータ経由）、格納型（データベースに保存）、DOM ベース（クライアント側 JavaScript で発生）の3種類があります。",
        code: `// === XSS の種類と例 ===

// 1. 反射型 XSS（Reflected XSS）
// 攻撃URL: https://example.com/search?q=<script>alert('XSS')</script>
// サーバーがクエリパラメータをそのままHTMLに出力すると発生

// 2. 格納型 XSS（Stored XSS）
// 攻撃者がコメント欄に <script>悪意のコード</script> を投稿
// 他のユーザーがそのページを表示すると実行される

// 3. DOM ベース XSS
// クライアント側 JavaScript が URL フラグメントなどを
// 安全でない方法でDOMに挿入すると発生
// document.getElementById('output').innerHTML = location.hash;

// === 脆弱なコードの例（Servlet）===
// NG: ユーザー入力をそのまま出力
@WebServlet("/search")
public class VulnerableServlet extends HttpServlet {
    protected void doGet(HttpServletRequest req,
                         HttpServletResponse resp) throws IOException {
        String query = req.getParameter("q");
        // 危険！エスケープなしで出力
        resp.getWriter().write("<p>検索結果: " + query + "</p>");
    }
}`,
      },
      {
        title: "エスケープ処理",
        content:
          "XSS 対策の基本は、出力時のエスケープ処理です。HTML コンテキスト、属性、JavaScript、URL など、出力先に応じた適切なエスケープが必要です。Thymeleaf は自動エスケープ機能があり、th:text を使えば安全です。",
        code: `// === 安全なコード ===

// 1. Thymeleaf（自動エスケープ）
// 安全: th:text はHTMLエスケープされる
// <p th:text="\${userInput}">...</p>
// → <script> は &lt;script&gt; に変換

// 危険: th:utext はエスケープされない（使用注意）
// <p th:utext="\${userInput}">...</p>

// 2. 手動エスケープ（OWASP Java Encoder）
// implementation 'org.owasp.encoder:encoder:1.2.3'
import org.owasp.encoder.Encode;

// HTML コンテキスト
String safe = Encode.forHtml(userInput);

// HTML 属性
String attrSafe = Encode.forHtmlAttribute(userInput);

// JavaScript
String jsSafe = Encode.forJavaScript(userInput);

// URL パラメータ
String urlSafe = Encode.forUriComponent(userInput);

// 3. Spring の HtmlUtils
import org.springframework.web.util.HtmlUtils;
String escaped = HtmlUtils.htmlEscape(userInput);`,
      },
      {
        title: "Content Security Policy（CSP）",
        content:
          "CSP はブラウザに対してリソースの読み込み元を制限する HTTP レスポンスヘッダーです。インラインスクリプトの実行を禁止し、許可されたドメインからのみスクリプトを読み込むよう設定できます。XSS 攻撃の影響を大幅に軽減します。",
        code: `// Spring Security で CSP を設定
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.headers(headers -> headers
        .contentSecurityPolicy(csp -> csp
            .policyDirectives(
                "default-src 'self'; " +
                "script-src 'self' 'nonce-{random}'; " +
                "style-src 'self' 'unsafe-inline'; " +
                "img-src 'self' data: https:; " +
                "font-src 'self'; " +
                "connect-src 'self' https://api.example.com; " +
                "frame-ancestors 'none'; " +
                "base-uri 'self'"
            )
        )
    );
    return http.build();
}

// CSP レポート機能
// Content-Security-Policy-Report-Only:
//   default-src 'self'; report-uri /csp-report

@PostMapping("/csp-report")
public ResponseEntity<Void> cspReport(
        @RequestBody String report) {
    log.warn("CSP Violation: {}", report);
    return ResponseEntity.ok().build();
}`,
      },
    ],
  },
  {
    id: "csrf-protection",
    title: "CSRF 対策",
    category: "web",
    description: "CSRF トークン方式、SameSite Cookie、Spring Security の CSRF 保護を学ぶ",
    sections: [
      {
        title: "CSRF 攻撃の仕組み",
        content:
          "CSRF（Cross-Site Request Forgery）は、ユーザーがログイン中のサイトに対して、攻撃者のサイトから意図しないリクエストを送信させる攻撃です。ブラウザが Cookie を自動送信する仕組みを悪用します。",
        code: `// === CSRF 攻撃の例 ===

// 1. ユーザーが bank.example.com にログイン中
// 2. 攻撃者のサイトに以下のHTMLが仕込まれている

// <form action="https://bank.example.com/transfer" method="POST">
//   <input type="hidden" name="to" value="attacker" />
//   <input type="hidden" name="amount" value="1000000" />
// </form>
// <script>document.forms[0].submit();</script>

// 3. ユーザーが攻撃者のサイトを訪問すると、
//    ブラウザが bank.example.com の Cookie を自動送信し、
//    意図しない送金が実行される

// === CSRF が成立する条件 ===
// - ユーザーが対象サイトにログイン中
// - Cookie ベースのセッション管理
// - リクエストのパラメータが予測可能
// - SameSite Cookie が設定されていない`,
      },
      {
        title: "Spring Security の CSRF 保護",
        content:
          "Spring Security は CSRF トークンによる保護を標準で有効にしています。フォーム送信時にサーバーが発行したトークンを含め、サーバー側で検証します。SPA（シングルページアプリケーション）の場合は Cookie ベースのトークンを使います。",
        code: `// Spring Security のCSRF保護（デフォルトで有効）
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.csrf(csrf -> csrf
        // SPA向け: CookieにCSRFトークンを設定
        .csrfTokenRepository(
            CookieCsrfTokenRepository.withHttpOnlyFalse())
        .csrfTokenRequestHandler(
            new CsrfTokenRequestAttributeHandler())
    );
    return http.build();
}

// Thymeleaf フォームでの使用（自動挿入）
// <form th:action="@{/transfer}" method="post">
//   <!-- CSRFトークンが自動で hidden input に追加 -->
//   <input type="text" name="amount" />
//   <button type="submit">送信</button>
// </form>

// REST API（JavaScript）での使用
// Cookie から XSRF-TOKEN を読み取り、
// ヘッダー X-XSRF-TOKEN に設定して送信
// fetch('/api/transfer', {
//   method: 'POST',
//   headers: {
//     'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ amount: 1000 })
// });`,
      },
      {
        title: "SameSite Cookie",
        content:
          "SameSite Cookie 属性は、クロスサイトリクエストでの Cookie 送信を制限します。Strict はクロスサイトでは一切送信せず、Lax はトップレベルナビゲーション（リンククリック）のみ許可します。CSRF 対策の追加レイヤーとして有効です。",
        code: `// Spring Boot での SameSite Cookie 設定
// application.yml
// server:
//   servlet:
//     session:
//       cookie:
//         same-site: lax   # strict, lax, none
//         secure: true      # HTTPS 必須
//         http-only: true   # JavaScript からアクセス不可

// プログラムでの設定
@Bean
public CookieSerializer cookieSerializer() {
    DefaultCookieSerializer serializer =
        new DefaultCookieSerializer();
    serializer.setSameSite("Lax");
    serializer.setUseSecureCookie(true);
    serializer.setUseHttpOnlyCookie(true);
    serializer.setCookieName("JSESSIONID");
    return serializer;
}

// === SameSite 属性の比較 ===
// Strict: クロスサイトでは一切Cookie送信しない
//   → 最も安全だがリンクからの遷移でログアウトになる
//
// Lax: GETリクエスト（リンククリック）のみ許可
//   → 推奨設定。POST/PUT/DELETE はブロック
//
// None: 制限なし（Secure属性が必須）
//   → サードパーティCookieが必要な場合のみ`,
      },
    ],
  },
  {
    id: "sql-injection",
    title: "SQLインジェクション対策",
    category: "web",
    description: "PreparedStatement、JPA パラメータバインド、入力検証による防御を学ぶ",
    sections: [
      {
        title: "SQLインジェクションの仕組み",
        content:
          "SQLインジェクションは、ユーザー入力をSQL文に直接埋め込むことで発生する脆弱性です。攻撃者はSQL構文を注入して、データの不正取得、改ざん、削除を行えます。OWASP Top 10 でも常に上位に位置する深刻な脆弱性です。",
        code: `// === 脆弱なコード（絶対に使ってはいけない）===
String query = "SELECT * FROM users WHERE username = '"
    + username + "' AND password = '" + password + "'";
Statement stmt = connection.createStatement();
ResultSet rs = stmt.executeQuery(query);

// 攻撃例: username に以下を入力
// ' OR '1'='1' --
// → SELECT * FROM users WHERE username = '' OR '1'='1' --'
//   AND password = ''
// → 全ユーザーが返される（認証バイパス）

// 攻撃例: データ削除
// '; DROP TABLE users; --
// → SELECT * FROM users WHERE username = '';
//   DROP TABLE users; --' AND password = ''

// 攻撃例: UNION を使ったデータ窃取
// ' UNION SELECT credit_card_number, null FROM payments --`,
      },
      {
        title: "PreparedStatement による対策",
        content:
          "PreparedStatement はパラメータバインドを使用してSQL文とデータを分離します。パラメータは自動的にエスケープされるため、SQLインジェクションを根本的に防止できます。すべてのSQL実行で PreparedStatement を使用することが基本です。",
        code: `// === 安全なコード: PreparedStatement ===
String sql = "SELECT * FROM users WHERE username = ? AND password = ?";
try (PreparedStatement pstmt = connection.prepareStatement(sql)) {
    pstmt.setString(1, username);  // パラメータバインド
    pstmt.setString(2, hashedPassword);
    try (ResultSet rs = pstmt.executeQuery()) {
        if (rs.next()) {
            return new User(rs.getString("username"));
        }
    }
}

// INSERT も同様
String insertSql = "INSERT INTO users (username, email, password) "
    + "VALUES (?, ?, ?)";
try (PreparedStatement pstmt = connection.prepareStatement(insertSql)) {
    pstmt.setString(1, username);
    pstmt.setString(2, email);
    pstmt.setString(3, hashedPassword);
    pstmt.executeUpdate();
}

// IN 句のパラメータバインド
String inSql = "SELECT * FROM users WHERE id IN (?, ?, ?)";
try (PreparedStatement pstmt = connection.prepareStatement(inSql)) {
    List<Long> ids = List.of(1L, 2L, 3L);
    for (int i = 0; i < ids.size(); i++) {
        pstmt.setLong(i + 1, ids.get(i));
    }
    // ...
}`,
      },
      {
        title: "JPA / Spring Data による安全なクエリ",
        content:
          "JPA や Spring Data JPA を使用する場合、JPQL のパラメータバインドやメソッド名クエリ生成により自動的にSQLインジェクションが防止されます。ただし、@Query でネイティブSQLを使う場合はパラメータバインドを必ず使います。",
        code: `// Spring Data JPA - メソッド名からクエリ自動生成（安全）
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    List<User> findByEmailContaining(String keyword);
}

// JPQL パラメータバインド（安全）
@Query("SELECT u FROM User u WHERE u.username = :username")
Optional<User> findByName(@Param("username") String username);

// ネイティブSQL パラメータバインド（安全）
@Query(value = "SELECT * FROM users WHERE email = :email",
       nativeQuery = true)
Optional<User> findByEmailNative(@Param("email") String email);

// === 危険なパターン（使ってはいけない）===
// NG: 文字列結合でクエリを組み立て
// @Query("SELECT u FROM User u WHERE u.name = '" + name + "'")

// Criteria API（安全）
CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<User> cq = cb.createQuery(User.class);
Root<User> root = cq.from(User.class);
cq.where(cb.equal(root.get("username"),
    cb.parameter(String.class, "username")));
TypedQuery<User> query = em.createQuery(cq);
query.setParameter("username", username);`,
      },
    ],
  },
  {
    id: "security-headers",
    title: "セキュリティヘッダー",
    category: "web",
    description: "HSTS、X-Content-Type-Options、CORS など、HTTP セキュリティヘッダーの設定を学ぶ",
    sections: [
      {
        title: "主要なセキュリティヘッダー",
        content:
          "HTTPセキュリティヘッダーは、ブラウザにセキュリティポリシーを指示する仕組みです。Spring Security はデフォルトで主要なヘッダーを設定しますが、要件に応じてカスタマイズが必要です。",
        code: `// Spring Security のデフォルトセキュリティヘッダー
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.headers(headers -> headers
        // X-Content-Type-Options: nosniff
        // → MIME タイプスニッフィング防止
        .contentTypeOptions(Customizer.withDefaults())

        // X-Frame-Options: DENY
        // → クリックジャッキング防止
        .frameOptions(frame -> frame.deny())

        // X-XSS-Protection: 0
        // → ブラウザの XSS フィルタ無効化（CSPに委任）
        .xssProtection(xss -> xss
            .headerValue(XXssProtectionHeaderWriter
                .HeaderValue.DISABLED))

        // Strict-Transport-Security: max-age=31536000
        // → HTTPS 強制（HSTS）
        .httpStrictTransportSecurity(hsts -> hsts
            .includeSubDomains(true)
            .maxAgeInSeconds(31536000)
            .preload(true))

        // Referrer-Policy: strict-origin-when-cross-origin
        .referrerPolicy(referrer -> referrer
            .policy(ReferrerPolicyHeaderWriter.ReferrerPolicy
                .STRICT_ORIGIN_WHEN_CROSS_ORIGIN))

        // Permissions-Policy（旧 Feature-Policy）
        .permissionsPolicy(permissions -> permissions
            .policy("camera=(), microphone=(), geolocation=()"))
    );
    return http.build();
}`,
      },
      {
        title: "CORS（Cross-Origin Resource Sharing）",
        content:
          "CORS は異なるオリジン間のリクエストを安全に許可する仕組みです。API サーバーとフロントエンドが異なるドメインの場合に設定が必要です。許可するオリジン、メソッド、ヘッダーを明示的に指定します。",
        code: `// Spring Security での CORS 設定
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.cors(cors -> cors
        .configurationSource(corsConfigurationSource()));
    return http.build();
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    // 許可するオリジン（ワイルドカードは避ける）
    config.setAllowedOrigins(List.of(
        "https://app.example.com",
        "https://admin.example.com"
    ));
    // 許可するHTTPメソッド
    config.setAllowedMethods(List.of(
        "GET", "POST", "PUT", "DELETE", "OPTIONS"));
    // 許可するヘッダー
    config.setAllowedHeaders(List.of(
        "Authorization", "Content-Type", "X-XSRF-TOKEN"));
    // Cookie を含むリクエストを許可
    config.setAllowCredentials(true);
    // プリフライトのキャッシュ時間
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source =
        new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
}

// コントローラー単位での設定も可能
@CrossOrigin(origins = "https://app.example.com")
@RestController
@RequestMapping("/api/users")
public class UserController { }`,
      },
      {
        title: "Cache-Control とセキュリティ",
        content:
          "機密データを含むレスポンスは、ブラウザやプロキシにキャッシュされないよう Cache-Control ヘッダーを適切に設定する必要があります。個人情報や認証情報を含むページには no-store を設定します。",
        code: `// Spring Security のデフォルト Cache-Control
// Cache-Control: no-cache, no-store, max-age=0, must-revalidate
// Pragma: no-cache
// Expires: 0

// カスタム設定
@Bean
public SecurityFilterChain filterChain(HttpSecurity http)
        throws Exception {
    http.headers(headers -> headers
        .cacheControl(Customizer.withDefaults())
    );
    return http.build();
}

// コントローラーで個別に設定
@GetMapping("/api/public/data")
public ResponseEntity<Data> getPublicData() {
    return ResponseEntity.ok()
        .cacheControl(CacheControl.maxAge(1, TimeUnit.HOURS)
            .cachePublic())
        .body(data);
}

@GetMapping("/api/private/profile")
public ResponseEntity<Profile> getProfile() {
    return ResponseEntity.ok()
        .cacheControl(CacheControl.noStore())  // キャッシュ禁止
        .body(profile);
}

// 静的リソースのキャッシュ設定（application.yml）
// spring:
//   web:
//     resources:
//       cache:
//         cachecontrol:
//           max-age: 365d  # CSS/JS は長期キャッシュ
//           cache-public: true`,
      },
    ],
  },

  // ===== セキュアコーディング =====
  {
    id: "input-validation",
    title: "入力バリデーション",
    category: "coding",
    description: "Bean Validation、サニタイズ処理、ホワイトリスト方式による安全な入力検証を学ぶ",
    sections: [
      {
        title: "Bean Validation（JSR 380）",
        content:
          "Bean Validation はアノテーションベースのバリデーションフレームワークです。@NotBlank, @Size, @Email などのアノテーションでDTOにバリデーションルールを定義し、@Valid で自動検証します。入力境界での防御の第一歩です。",
        code: `// バリデーション付きDTO
public class UserRegistrationDto {

    @NotBlank(message = "ユーザー名は必須です")
    @Size(min = 3, max = 50,
          message = "ユーザー名は3〜50文字で入力してください")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$",
             message = "英数字とアンダースコアのみ使用できます")
    private String username;

    @NotBlank(message = "メールアドレスは必須です")
    @Email(message = "正しいメールアドレスを入力してください")
    private String email;

    @NotBlank(message = "パスワードは必須です")
    @Size(min = 8, max = 100)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$",
             message = "大文字、小文字、数字を含む必要があります")
    private String password;

    @Min(value = 0) @Max(value = 150)
    private int age;
}

// コントローラーでの使用
@PostMapping("/register")
public ResponseEntity<?> register(
        @Valid @RequestBody UserRegistrationDto dto,
        BindingResult result) {
    if (result.hasErrors()) {
        List<String> errors = result.getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .toList();
        return ResponseEntity.badRequest().body(errors);
    }
    userService.register(dto);
    return ResponseEntity.ok("登録完了");
}`,
      },
      {
        title: "カスタムバリデーション",
        content:
          "標準のバリデーションアノテーションでは不足する場合、カスタムバリデータを作成できます。クロスフィールドバリデーション（パスワード確認など）やビジネスルールの検証に使用します。",
        code: `// カスタムアノテーション
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = NoHtmlValidator.class)
public @interface NoHtml {
    String message() default "HTMLタグは使用できません";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// バリデータ実装
public class NoHtmlValidator
        implements ConstraintValidator<NoHtml, String> {
    private static final Pattern HTML_PATTERN =
        Pattern.compile("<[^>]+>");

    @Override
    public boolean isValid(String value,
            ConstraintValidatorContext context) {
        if (value == null) return true;
        return !HTML_PATTERN.matcher(value).find();
    }
}

// 使用例
public class CommentDto {
    @NotBlank
    @NoHtml  // HTMLタグを禁止
    @Size(max = 1000)
    private String content;
}

// クラスレベルバリデーション（パスワード確認）
@PasswordMatch
public class PasswordChangeDto {
    @NotBlank private String password;
    @NotBlank private String confirmPassword;
}`,
      },
      {
        title: "ホワイトリスト方式とサニタイズ",
        content:
          "入力バリデーションはホワイトリスト方式（許可する値を定義）が推奨されます。ブラックリスト方式（禁止する値を定義）は回避される可能性があります。HTML を許可する場合は、OWASP Java HTML Sanitizer でサニタイズします。",
        code: `// ホワイトリスト方式の例
public class SearchDto {
    // ソート順はホワイトリストで制限
    @Pattern(regexp = "^(name|date|price)$",
             message = "無効なソート項目です")
    private String sortBy;

    @Pattern(regexp = "^(asc|desc)$")
    private String sortOrder;
}

// Enum によるホワイトリスト
public enum UserRole {
    USER, ADMIN, MODERATOR;

    public static UserRole fromString(String value) {
        try {
            return UserRole.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new ValidationException("無効なロール: " + value);
        }
    }
}

// HTML サニタイズ（OWASP Java HTML Sanitizer）
// implementation 'com.googlecode.owasp-java-html-sanitizer:owasp-java-html-sanitizer:20220608.1'
import org.owasp.html.PolicyFactory;
import org.owasp.html.Sanitizers;

PolicyFactory policy = Sanitizers.FORMATTING
    .and(Sanitizers.LINKS)
    .and(Sanitizers.BLOCKS);

// 安全なHTMLのみ許可
String safeHtml = policy.sanitize(userInput);
// <b>太字</b> → <b>太字</b> (許可)
// <script>alert('XSS')</script> → "" (除去)`,
      },
    ],
  },
  {
    id: "error-handling",
    title: "セキュアなエラーハンドリング",
    category: "coding",
    description: "情報漏洩を防ぐエラー処理、セキュアなログ管理の実践を学ぶ",
    sections: [
      {
        title: "情報漏洩を防ぐエラーレスポンス",
        content:
          "スタックトレースやシステム内部情報をエラーレスポンスに含めると、攻撃者に有用な情報を提供してしまいます。本番環境ではユーザーにはシンプルなメッセージを返し、詳細はサーバーログにのみ記録します。",
        code: `// === 危険なエラーレスポンス ===
// {
//   "error": "java.sql.SQLException",
//   "message": "Table 'mydb.users' column 'password' ...",
//   "trace": "at com.mysql.jdbc.ConnectionImpl..."
// }
// → DB構造やフレームワーク情報が漏洩

// === 安全なエラーハンドリング ===
@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log =
        LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex, HttpServletRequest request) {
        String errorId = UUID.randomUUID().toString();

        // 詳細はログに記録
        log.error("Error ID={} URI={} Message={}",
            errorId, request.getRequestURI(), ex.getMessage(), ex);

        // ユーザーにはシンプルなメッセージのみ
        return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(
                "サーバーエラーが発生しました",
                errorId));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(
            AccessDeniedException ex) {
        // 権限エラーでもリソースの存在を漏らさない
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("ページが見つかりません", null));
    }
}

record ErrorResponse(String message, String errorId) {}`,
      },
      {
        title: "セキュアなログ管理",
        content:
          "ログには認証情報（パスワード、トークン）や個人情報（クレジットカード番号など）を記録してはいけません。ログインジェクション（改行文字によるログ偽造）も防ぐ必要があります。構造化ログを使い、機密情報はマスキングします。",
        code: `// === やってはいけないログ ===
// NG: パスワードをログに記録
// log.info("Login: user={} password={}", user, password);
// NG: クレジットカード番号
// log.info("Payment: card={}", cardNumber);
// NG: トークンをログに記録
// log.info("Token: {}", jwtToken);

// === 安全なログ ===
// OK: マスキング
log.info("Login attempt: user={}", username);
log.info("Payment: card=****{}", last4Digits);

// ログインジェクション対策
// 攻撃: username = "admin\\n2024-01-01 INFO Login successful"
public static String sanitizeLogParam(String input) {
    if (input == null) return "null";
    return input.replaceAll("[\\r\\n\\t]", "_");
}
log.info("Login: user={}", sanitizeLogParam(username));

// Logback で機密情報をマスキング（logback.xml）
// <appender name="STDOUT" class="...ConsoleAppender">
//   <encoder class="...LayoutWrappingEncoder">
//     <layout class="...PatternLayout">
//       <pattern>%d %level %msg%n</pattern>
//     </layout>
//   </encoder>
// </appender>

// 構造化ログ（JSON形式）
// implementation 'net.logstash.logback:logstash-logback-encoder:7.4'
log.info("User action",
    kv("userId", userId),
    kv("action", "login"),
    kv("ip", request.getRemoteAddr()));`,
      },
      {
        title: "application.yml のセキュリティ設定",
        content:
          "Spring Boot の本番環境では、エラー詳細の公開を無効化し、Actuator エンドポイントを適切に保護します。デバッグ情報の漏洩を防ぐ設定を確認しましょう。",
        code: `# 本番環境の application-prod.yml

# エラー詳細を非公開
server:
  error:
    include-message: never
    include-binding-errors: never
    include-stacktrace: never
    include-exception: false

# Actuator のセキュリティ
management:
  endpoints:
    web:
      exposure:
        include: health, info, metrics  # 必要最小限
  endpoint:
    health:
      show-details: never  # 詳細を非公開
    env:
      enabled: false  # 環境変数を非公開

# デバッグ無効化
spring:
  jpa:
    show-sql: false          # SQL ログ無効化
  devtools:
    restart:
      enabled: false
  mvc:
    log-request-details: false

# ログレベル
logging:
  level:
    root: WARN
    com.example: INFO
    org.springframework.security: WARN
    # SQL パラメータを本番ログに出さない
    org.hibernate.orm.jdbc.bind: OFF`,
      },
    ],
  },
  {
    id: "dependency-security",
    title: "依存関係のセキュリティ",
    category: "coding",
    description: "脆弱性スキャン、SBOM、Dependabot を使った依存ライブラリの安全管理を学ぶ",
    sections: [
      {
        title: "OWASP Dependency-Check",
        content:
          "OWASP Dependency-Check は、プロジェクトの依存関係に既知の脆弱性（CVE）がないかスキャンするツールです。Gradle/Maven プラグインとして組み込み、CI/CD パイプラインで自動チェックできます。",
        code: `// build.gradle に Dependency-Check プラグインを追加
plugins {
    id 'org.owasp.dependencycheck' version '9.0.9'
}

dependencyCheck {
    // NVD API キー（取得推奨）
    nvd {
        apiKey = System.getenv("NVD_API_KEY")
    }
    // CVSS 7.0 以上で失敗（High以上）
    failBuildOnCVSS = 7.0f
    // レポート形式
    formats = ['HTML', 'JSON']
    // 抑制ファイル（誤検知対応）
    suppressionFile = 'dependency-check-suppression.xml'
}

// 実行コマンド
// ./gradlew dependencyCheckAnalyze

// 抑制ファイルの例（誤検知を除外）
// <suppressions>
//   <suppress>
//     <notes>テスト用依存のため対象外</notes>
//     <cve>CVE-2023-XXXXX</cve>
//   </suppress>
// </suppressions>`,
      },
      {
        title: "Dependabot と自動更新",
        content:
          "GitHub の Dependabot は、依存ライブラリの脆弱性を自動検出し、更新用のプルリクエストを作成します。設定ファイルを配置するだけで有効化でき、セキュリティアップデートの迅速な適用を支援します。",
        code: `// .github/dependabot.yml
// version: 2
// updates:
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
//     # 自動マージの設定（GitHub Actions）
//     # パッチバージョンは自動マージ
//
//   - package-ecosystem: "docker"
//     directory: "/"
//     schedule:
//       interval: "weekly"
//
//   - package-ecosystem: "github-actions"
//     directory: "/"
//     schedule:
//       interval: "weekly"

// GitHub Actions で Dependabot PR を自動マージ
// .github/workflows/dependabot-auto-merge.yml
// name: Auto-merge Dependabot
// on: pull_request
// permissions:
//   pull-requests: write
//   contents: write
// jobs:
//   auto-merge:
//     runs-on: ubuntu-latest
//     if: github.actor == 'dependabot[bot]'
//     steps:
//       - uses: dependabot/fetch-metadata@v2
//         id: metadata
//       - if: steps.metadata.outputs.update-type == 'version-update:semver-patch'
//         run: gh pr merge --auto --squash "$PR_URL"
//         env:
//           PR_URL: \${{ github.event.pull_request.html_url }}
//           GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}`,
      },
      {
        title: "SBOM（Software Bill of Materials）",
        content:
          "SBOM はソフトウェアの構成要素一覧で、使用しているすべてのライブラリとそのバージョンを文書化します。CycloneDX や SPDX 形式で生成し、脆弱性管理やライセンスコンプライアンスに活用します。",
        code: `// CycloneDX Gradle プラグインで SBOM 生成
plugins {
    id 'org.cyclonedx.bom' version '1.8.2'
}

cyclonedxBom {
    includeConfigs = ["runtimeClasspath"]
    outputFormat = "json"
    outputName = "sbom"
}

// 実行: ./gradlew cyclonedxBom
// → build/reports/sbom.json が生成される

// SBOM の活用例
// 1. 脆弱性の追跡
//    SBOM を脆弱性データベースと照合して
//    影響を受けるコンポーネントを特定
//
// 2. ライセンスコンプライアンス
//    使用ライブラリのライセンスを一覧化
//
// 3. サプライチェーンセキュリティ
//    依存関係の透明性を確保

// Spring Boot Actuator で SBOM を公開
// management:
//   endpoints:
//     web:
//       exposure:
//         include: sbom
//   endpoint:
//     sbom:
//       enabled: true
// GET /actuator/sbom → CycloneDX SBOM を返却`,
      },
    ],
  },

  // ===== テスト・運用 =====
  {
    id: "security-testing",
    title: "セキュリティテスト",
    category: "ops",
    description: "SAST/DAST、OWASP ZAP、Spring Security Test によるセキュリティ検証を学ぶ",
    sections: [
      {
        title: "SAST と DAST",
        content:
          "SAST（静的アプリケーションセキュリティテスト）はソースコードを解析して脆弱性を検出します。DAST（動的アプリケーションセキュリティテスト）は実行中のアプリケーションに対してテストを行います。両方を組み合わせることで、より多くの脆弱性をカバーできます。",
        code: `// === SAST ツール ===
// SpotBugs + Find Security Bugs プラグイン

// build.gradle
plugins {
    id 'com.github.spotbugs' version '6.0.7'
}

dependencies {
    spotbugsPlugins 'com.h3xstream.findsecbugs:findsecbugs-plugin:1.13.0'
}

spotbugs {
    effort = com.github.spotbugs.snom.Effort.MAX
    reportLevel = com.github.spotbugs.snom.Confidence.MEDIUM
}

// 実行: ./gradlew spotbugsMain
// 検出例:
// - SQL_INJECTION: SQLインジェクションの可能性
// - XSS_SERVLET: XSS脆弱性
// - HARD_CODE_PASSWORD: ハードコードされたパスワード
// - WEAK_MESSAGE_DIGEST: 弱いハッシュアルゴリズム

// === DAST ツール ===
// OWASP ZAP（Zed Attack Proxy）
// Docker で実行:
// docker run -t ghcr.io/zaproxy/zaproxy:stable \\
//   zap-baseline.py -t https://target-app.example.com

// CI/CD パイプラインに組み込み
// GitHub Actions 例:
// - name: OWASP ZAP Scan
//   uses: zaproxy/action-baseline@v0.12.0
//   with:
//     target: 'https://staging.example.com'`,
      },
      {
        title: "Spring Security Test",
        content:
          "Spring Security Test モジュールは、セキュリティ設定のテストを支援します。@WithMockUser でモックユーザーを設定し、認証・認可の動作を検証できます。MockMvc と組み合わせてエンドポイントのアクセス制御をテストします。",
        code: `// 依存関係
// testImplementation 'org.springframework.security:spring-security-test'

@SpringBootTest
@AutoConfigureMockMvc
class SecurityIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    // 未認証ユーザーはログインページにリダイレクト
    @Test
    void accessProtectedEndpoint_unauthenticated() throws Exception {
        mockMvc.perform(get("/admin/dashboard"))
            .andExpect(status().is3xxRedirection())
            .andExpect(redirectedUrlPattern("**/login"));
    }

    // ADMIN ロールでアクセス可能
    @Test
    @WithMockUser(roles = "ADMIN")
    void accessAdminEndpoint_withAdminRole() throws Exception {
        mockMvc.perform(get("/admin/dashboard"))
            .andExpect(status().isOk());
    }

    // USER ロールでは ADMIN エンドポイントにアクセス不可
    @Test
    @WithMockUser(roles = "USER")
    void accessAdminEndpoint_withUserRole() throws Exception {
        mockMvc.perform(get("/admin/dashboard"))
            .andExpect(status().isForbidden());
    }

    // CSRF トークンのテスト
    @Test
    @WithMockUser
    void postWithCsrf() throws Exception {
        mockMvc.perform(post("/api/data")
                .with(csrf())
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"name\\": \\"test\\"}"))
            .andExpect(status().isOk());
    }

    // CSRF トークンなしは 403
    @Test
    @WithMockUser
    void postWithoutCsrf() throws Exception {
        mockMvc.perform(post("/api/data"))
            .andExpect(status().isForbidden());
    }
}`,
      },
      {
        title: "ペネトレーションテストの基礎",
        content:
          "ペネトレーションテスト（ペンテスト）は、実際の攻撃手法を用いてシステムの脆弱性を検証するテストです。OWASP Testing Guide に基づいた体系的なテストにより、本番環境のセキュリティを評価します。",
        code: `// ペネトレーションテストのチェックリスト（OWASP準拠）

// 1. 認証テスト
//    - ブルートフォース耐性（アカウントロックアウト）
//    - パスワードポリシーの検証
//    - セッション管理の安全性

// 2. 認可テスト
//    - 水平権限昇格（他ユーザーのデータにアクセス）
//      GET /api/users/123/profile  // 自分は user 456
//    - 垂直権限昇格（管理者機能にアクセス）
//      GET /admin/users           // 一般ユーザーで試行

// 3. 入力検証テスト
//    - SQLインジェクション: ' OR '1'='1
//    - XSS: <script>alert(1)</script>
//    - パストラバーサル: ../../etc/passwd
//    - コマンドインジェクション: ; ls -la

// 4. 自動化テスト（Spring Boot Test で実装）
@Test
void sqlInjectionTest() throws Exception {
    mockMvc.perform(get("/api/users")
            .param("name", "' OR '1'='1"))
        .andExpect(status().isBadRequest());
}

@Test
void xssTest() throws Exception {
    mockMvc.perform(post("/api/comments")
            .with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\\"content\\": \\"<script>alert(1)</script>\\"}"))
        .andExpect(status().isBadRequest());
}

@Test
void pathTraversalTest() throws Exception {
    mockMvc.perform(get("/api/files/../../etc/passwd"))
        .andExpect(status().isBadRequest());
}`,
      },
    ],
  },
  {
    id: "secure-deployment",
    title: "セキュアなデプロイ",
    category: "ops",
    description: "シークレット管理、コンテナセキュリティ、HTTPS 設定の実践を学ぶ",
    sections: [
      {
        title: "シークレット管理",
        content:
          "データベースパスワード、APIキー、暗号化鍵などのシークレットは、ソースコードや設定ファイルに直接記述してはいけません。環境変数、Vault、クラウドのシークレットマネージャーを使用して安全に管理します。",
        code: `// === シークレット管理の方法 ===

// 1. 環境変数（最もシンプル）
// application.yml
// spring:
//   datasource:
//     url: jdbc:postgresql://\${DB_HOST}:\${DB_PORT}/\${DB_NAME}
//     username: \${DB_USERNAME}
//     password: \${DB_PASSWORD}

// 2. Spring Cloud Config + 暗号化
// application.yml
// spring:
//   datasource:
//     password: '{cipher}AQBz...'  // 暗号化された値

// 3. Docker Secrets
// docker-compose.yml
// services:
//   app:
//     secrets:
//       - db_password
// secrets:
//   db_password:
//     file: ./secrets/db_password.txt

// 4. HashiCorp Vault
// implementation 'org.springframework.vault:spring-vault-core'
@Configuration
public class VaultConfig {
    @Value("\${db.password}")
    private String dbPassword;  // Vault から自動取得
}

// === やってはいけないこと ===
// NG: ソースコードにハードコード
// private static final String DB_PASS = "password123";
// NG: application.yml に平文で記述して Git にコミット
// NG: ログにシークレットを出力
// NG: .env ファイルを Git にコミット

// .gitignore に必ず追加
// .env
// *.p12
// *.jks
// *-secret.*`,
      },
      {
        title: "Docker コンテナセキュリティ",
        content:
          "コンテナ化されたアプリケーションのセキュリティでは、最小限のベースイメージの使用、非 root ユーザーでの実行、不要なパッケージの排除が重要です。マルチステージビルドでビルドツールを本番イメージから排除します。",
        code: `# セキュアな Dockerfile（マルチステージビルド）

# ビルドステージ
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /build
COPY gradle/ gradle/
COPY gradlew build.gradle settings.gradle ./
RUN ./gradlew dependencies --no-daemon
COPY src/ src/
RUN ./gradlew bootJar --no-daemon

# 実行ステージ（最小イメージ）
FROM eclipse-temurin:21-jre-alpine

# 非rootユーザーを作成
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# セキュリティアップデート
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*

WORKDIR /app

# ビルド成果物のみコピー
COPY --from=builder --chown=appuser:appgroup \\
  /build/build/libs/*.jar app.jar

# 非rootユーザーで実行
USER appuser

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

# JVM セキュリティオプション
ENTRYPOINT ["java", \\
  "-XX:+UseContainerSupport", \\
  "-XX:MaxRAMPercentage=75.0", \\
  "-Djava.security.egd=file:/dev/urandom", \\
  "-jar", "app.jar"]`,
      },
      {
        title: "CI/CD パイプラインのセキュリティ",
        content:
          "CI/CD パイプラインにセキュリティチェックを組み込むことで、脆弱性を早期に検出できます（DevSecOps）。ビルド、テスト、静的解析、依存関係チェック、コンテナスキャンを自動化し、セキュリティゲートを設けます。",
        code: `# GitHub Actions: セキュリティパイプライン
# .github/workflows/security.yml
# name: Security Pipeline
# on:
#   push:
#     branches: [main]
#   pull_request:
#     branches: [main]
#
# jobs:
#   security-checks:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#
#       - name: Setup Java
#         uses: actions/setup-java@v4
#         with:
#           java-version: '21'
#           distribution: 'temurin'
#
#       # 1. ビルドとテスト
#       - name: Build and Test
#         run: ./gradlew build
#
#       # 2. SAST（静的解析）
#       - name: SpotBugs Security Check
#         run: ./gradlew spotbugsMain
#
#       # 3. 依存関係の脆弱性チェック
#       - name: OWASP Dependency Check
#         run: ./gradlew dependencyCheckAnalyze
#
#       # 4. Dockerイメージのスキャン
#       - name: Build Docker Image
#         run: docker build -t myapp:latest .
#
#       - name: Trivy Container Scan
#         uses: aquasecurity/trivy-action@master
#         with:
#           image-ref: 'myapp:latest'
#           severity: 'HIGH,CRITICAL'
#           exit-code: '1'
#
#       # 5. SBOM 生成
#       - name: Generate SBOM
#         run: ./gradlew cyclonedxBom
#
#       - name: Upload SBOM
#         uses: actions/upload-artifact@v4
#         with:
#           name: sbom
#           path: build/reports/sbom.json`,
      },
    ],
  },
];

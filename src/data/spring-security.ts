export interface SpringSecuritySection {
  title: string;
  content: string;
  code?: string;
}

export interface SpringSecurityChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: SpringSecuritySection[];
}

export interface SpringSecurityCategory {
  id: string;
  name: string;
  color: string;
}

export const springSecurityCategories: SpringSecurityCategory[] = [
  { id: "basics", name: "基礎", color: "#2563EB" },
  { id: "auth", name: "認証・認可", color: "#059669" },
  { id: "advanced", name: "実践", color: "#7C3AED" },
];

export const springSecurityChapters: SpringSecurityChapter[] = [
  // ===== 基礎 =====
  {
    id: "security-config",
    title: "Spring Securityの基本設定",
    category: "basics",
    description:
      "SecurityFilterChainを使ったHTTPセキュリティ設定の基本を学び、アプリケーションの保護を構成する",
    sections: [
      {
        title: "Spring Security の導入",
        content:
          "Spring Security は Spring ベースのアプリケーションに認証・認可機能を提供するフレームワークです。Spring Boot では spring-boot-starter-security を依存関係に追加するだけで、すべてのエンドポイントがデフォルトで保護されます。起動時にランダムなパスワードがコンソールに表示され、ユーザー名 'user' でアクセスできます。本格的なアプリケーションでは SecurityFilterChain Bean を定義してセキュリティ設定をカスタマイズします。",
        code: `// build.gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.security:spring-security-test'
}

// Spring Security を追加するだけで全エンドポイントが保護される
// コンソールに以下のようなログが出力される:
// Using generated security password: 8a5f3e2d-...
// ユーザー名: user / パスワード: 上記の生成値`,
      },
      {
        title: "SecurityFilterChain の定義",
        content:
          "Spring Security 5.7 以降では WebSecurityConfigurerAdapter は非推奨となり、SecurityFilterChain Bean を直接定義する方式が推奨されています。@Configuration と @EnableWebSecurity を付与したクラス内で、HttpSecurity を受け取り SecurityFilterChain を返す @Bean メソッドを作成します。HttpSecurity のメソッドチェーンで、URL パターンごとのアクセス制御、認証方式、ログアウト処理などを宣言的に設定できます。",
        code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                // 静的リソースと公開ページは認証不要
                .requestMatchers("/", "/css/**", "/js/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                // /admin/** は ADMIN ロールが必要
                .requestMatchers("/admin/**").hasRole("ADMIN")
                // その他はすべて認証が必要
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .permitAll()
            );

        return http.build();
    }
}`,
      },
      {
        title: "複数の SecurityFilterChain",
        content:
          "1つのアプリケーションで API 向けと Web 画面向けなど、異なるセキュリティ設定が必要な場合があります。@Order アノテーションを使って複数の SecurityFilterChain を定義し、URL パターンごとに適用する設定を分離できます。securityMatcher で対象 URL を限定し、数値が小さい（優先度が高い）ものから順にマッチングされます。",
        code: `@Configuration
@EnableWebSecurity
public class MultiSecurityConfig {

    // API 向け設定（優先度高）
    @Bean
    @Order(1)
    public SecurityFilterChain apiFilterChain(
            HttpSecurity http) throws Exception {
        http
            .securityMatcher("/api/**")
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS)
            )
            .csrf(csrf -> csrf.disable())
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    // Web 画面向け設定
    @Bean
    @Order(2)
    public SecurityFilterChain webFilterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/register").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            );

        return http.build();
    }
}`,
      },
      {
        title: "UserDetailsService の実装",
        content:
          "Spring Security の認証処理は UserDetailsService インターフェースを通じてユーザー情報を取得します。loadUserByUsername メソッドを実装し、データベースや外部サービスからユーザーを検索して UserDetails オブジェクトを返します。ユーザーが見つからない場合は UsernameNotFoundException をスローします。Spring Security が提供する User.builder() を使うと簡潔に UserDetails を構築できます。",
        code: `@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        // データベースからユーザーを検索
        AppUser user = userRepository
            .findByUsername(username)
            .orElseThrow(() ->
                new UsernameNotFoundException(
                    "ユーザーが見つかりません: " + username));

        // UserDetails オブジェクトを構築
        return User.builder()
            .username(user.getUsername())
            .password(user.getPassword()) // エンコード済み
            .roles(user.getRoles().stream()
                .map(Role::getName)
                .toArray(String[]::new))
            .accountLocked(!user.isActive())
            .build();
    }
}`,
      },
      {
        title: "Security フィルタチェーンの仕組み",
        content:
          "Spring Security はサーブレットフィルタの仕組みを利用しています。DelegatingFilterProxy が Spring コンテナ内の FilterChainProxy に処理を委譲し、FilterChainProxy が登録された SecurityFilterChain を順番に評価します。各 SecurityFilterChain 内には認証フィルタ、認可フィルタ、CSRF フィルタなど複数のフィルタが順序付けられており、リクエストがこのフィルタチェーンを通過することでセキュリティ処理が実行されます。カスタムフィルタを追加する場合は addFilterBefore / addFilterAfter で挿入位置を指定します。",
        code: `@Configuration
@EnableWebSecurity
public class FilterChainConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults())
            // カスタムフィルタを認証フィルタの前に追加
            .addFilterBefore(
                new RequestLoggingFilter(),
                UsernamePasswordAuthenticationFilter.class
            )
            // カスタムフィルタを認証フィルタの後に追加
            .addFilterAfter(
                new AuditFilter(),
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}

// カスタムフィルタの例
public class RequestLoggingFilter extends OncePerRequestFilter {

    private static final Logger log =
        LoggerFactory.getLogger(RequestLoggingFilter.class);

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {
        log.info("リクエスト: {} {}",
            request.getMethod(),
            request.getRequestURI());
        long start = System.currentTimeMillis();

        filterChain.doFilter(request, response);

        long duration = System.currentTimeMillis() - start;
        log.info("レスポンス: {} ({}ms)",
            response.getStatus(), duration);
    }
}`,
      },
    ],
  },
  {
    id: "form-auth-session",
    title: "フォーム認証とセッション管理",
    category: "basics",
    description:
      "フォームベース認証のカスタマイズとHTTPセッションの制御方法を習得する",
    sections: [
      {
        title: "カスタムログインフォーム",
        content:
          "Spring Security のデフォルトログインページを独自のデザインに置き換えることができます。formLogin で loginPage を指定し、対応するコントローラーとテンプレートを作成します。ログインフォームの action 属性は loginProcessingUrl と一致させ、ユーザー名とパスワードのパラメータ名は usernameParameter / passwordParameter で設定できます。デフォルトでは 'username' と 'password' が使われます。",
        code: `@Configuration
@EnableWebSecurity
public class FormLoginConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/login", "/register",
                    "/css/**").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("pass")
                .defaultSuccessUrl("/dashboard", true)
                .failureUrl("/login?error=true")
                .permitAll()
            );

        return http.build();
    }
}

// ログインページ用コントローラー
@Controller
public class LoginController {

    @GetMapping("/login")
    public String loginPage(
            @RequestParam(required = false) String error,
            Model model) {
        if (error != null) {
            model.addAttribute("errorMessage",
                "メールアドレスまたはパスワードが正しくありません");
        }
        return "login"; // login.html テンプレート
    }
}`,
      },
      {
        title: "認証成功・失敗ハンドラー",
        content:
          "認証成功時と失敗時の処理をカスタマイズするには、AuthenticationSuccessHandler と AuthenticationFailureHandler を実装します。成功ハンドラーではログイン履歴の記録やリダイレクト先のカスタマイズ、失敗ハンドラーではログイン試行回数の記録やアカウントロックの処理などを実装できます。",
        code: `// 認証成功ハンドラー
@Component
public class CustomSuccessHandler
        implements AuthenticationSuccessHandler {

    private final LoginHistoryService loginHistoryService;

    public CustomSuccessHandler(
            LoginHistoryService loginHistoryService) {
        this.loginHistoryService = loginHistoryService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException {
        String username = authentication.getName();
        loginHistoryService.recordSuccess(username,
            request.getRemoteAddr());

        // ロールに応じてリダイレクト先を変更
        boolean isAdmin = authentication.getAuthorities()
            .stream()
            .anyMatch(a -> a.getAuthority()
                .equals("ROLE_ADMIN"));

        if (isAdmin) {
            response.sendRedirect("/admin/dashboard");
        } else {
            response.sendRedirect("/dashboard");
        }
    }
}

// 認証失敗ハンドラー
@Component
public class CustomFailureHandler
        implements AuthenticationFailureHandler {

    private final LoginAttemptService attemptService;

    public CustomFailureHandler(
            LoginAttemptService attemptService) {
        this.attemptService = attemptService;
    }

    @Override
    public void onAuthenticationFailure(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException exception)
            throws IOException {
        String email = request.getParameter("email");
        attemptService.recordFailure(email);

        if (attemptService.isBlocked(email)) {
            response.sendRedirect(
                "/login?error=blocked");
        } else {
            response.sendRedirect(
                "/login?error=true");
        }
    }
}`,
      },
      {
        title: "セッション管理",
        content:
          "Spring Security ではセッションの作成ポリシー、同時セッション数の制御、セッション固定攻撃の防止を設定できます。SessionCreationPolicy でセッションの作成タイミングを制御し、maximumSessions で同時ログイン数を制限します。sessionFixation で認証成功時にセッション ID を変更し、セッション固定攻撃を防ぎます。",
        code: `@Configuration
@EnableWebSecurity
public class SessionConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults())
            .sessionManagement(session -> session
                // セッション作成ポリシー
                // IF_REQUIRED: 必要なときだけ作成（デフォルト）
                // ALWAYS: 常に作成
                // NEVER: 自分では作成しない
                // STATELESS: セッションを使わない（JWT向け）
                .sessionCreationPolicy(
                    SessionCreationPolicy.IF_REQUIRED)
                // セッション固定攻撃の防止
                .sessionFixation(fix -> fix
                    .changeSessionId() // 認証後にセッションID変更
                )
                // 同時セッション数の制限
                .maximumSessions(1)
                    // 既存セッションを無効化して新規ログイン許可
                    .maxSessionsPreventsLogin(false)
                    .expiredUrl("/login?expired=true")
            );

        return http.build();
    }

    // セッション同時制御に必要
    @Bean
    public HttpSessionEventPublisher
            httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }
}`,
      },
      {
        title: "Remember-Me 認証",
        content:
          "Remember-Me 機能を使うと、ブラウザを閉じた後も認証状態を維持できます。Cookie ベースの簡易方式と、データベースに永続化トークンを保存する安全な方式の2種類があります。PersistentTokenRepository を使ったトークンベースの方式が推奨されます。トークンの有効期間やCookie 名もカスタマイズ可能です。",
        code: `@Configuration
@EnableWebSecurity
public class RememberMeConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            .rememberMe(remember -> remember
                // 永続化トークン方式（推奨）
                .tokenRepository(
                    persistentTokenRepository())
                .tokenValiditySeconds(
                    60 * 60 * 24 * 14) // 14日間有効
                .rememberMeParameter("remember-me")
                .rememberMeCookieName("app-remember")
                .userDetailsService(userDetailsService())
            );

        return http.build();
    }

    @Bean
    public PersistentTokenRepository
            persistentTokenRepository() {
        JdbcTokenRepositoryImpl repo =
            new JdbcTokenRepositoryImpl();
        repo.setDataSource(dataSource);
        // 初回起動時にテーブルを自動作成
        // repo.setCreateTableOnStartup(true);
        return repo;
    }
}

// Remember-Me 用テーブル（自動作成 or 手動作成）
// CREATE TABLE persistent_logins (
//     username  VARCHAR(64) NOT NULL,
//     series    VARCHAR(64) PRIMARY KEY,
//     token     VARCHAR(64) NOT NULL,
//     last_used TIMESTAMP   NOT NULL
// );`,
      },
      {
        title: "SecurityContext とユーザー情報の取得",
        content:
          "認証済みユーザーの情報は SecurityContextHolder から取得できます。コントローラーのメソッド引数に @AuthenticationPrincipal を使うとより簡潔に取得でき、Authentication オブジェクトを直接受け取ることも可能です。カスタム UserDetails を使っている場合は、型を指定してキャストなしでアクセスできます。",
        code: `@RestController
@RequestMapping("/api/users")
public class UserController {

    // 方法1: @AuthenticationPrincipal を使う（推奨）
    @GetMapping("/me")
    public UserResponse getCurrentUser(
            @AuthenticationPrincipal UserDetails user) {
        return new UserResponse(
            user.getUsername(),
            user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList()
        );
    }

    // 方法2: カスタム UserDetails の場合
    @GetMapping("/profile")
    public ProfileResponse getProfile(
            @AuthenticationPrincipal
            CustomUserDetails user) {
        return new ProfileResponse(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getDisplayName()
        );
    }

    // 方法3: Authentication オブジェクトを受け取る
    @GetMapping("/roles")
    public List<String> getRoles(
            Authentication authentication) {
        return authentication.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .toList();
    }

    // 方法4: SecurityContextHolder から直接取得
    @GetMapping("/check")
    public boolean isAuthenticated() {
        Authentication auth = SecurityContextHolder
            .getContext().getAuthentication();
        return auth != null
            && auth.isAuthenticated()
            && !(auth instanceof
                AnonymousAuthenticationToken);
    }
}`,
      },
    ],
  },
  {
    id: "password-encoding",
    title: "パスワードエンコーディング",
    category: "basics",
    description:
      "BCryptを中心としたパスワードのハッシュ化と安全な保存・検証の方法を理解する",
    sections: [
      {
        title: "PasswordEncoder の基本",
        content:
          "Spring Security ではパスワードを平文で保存することは許可されておらず、PasswordEncoder を使ったハッシュ化が必須です。BCryptPasswordEncoder が最も一般的で推奨される実装です。BCrypt は内部にソルト（ランダム値）を含むため、同じパスワードでも毎回異なるハッシュ値が生成されます。これによりレインボーテーブル攻撃を防ぐことができます。",
        code: `@Configuration
public class PasswordConfig {

    // BCryptPasswordEncoder を Bean として登録
    @Bean
    public PasswordEncoder passwordEncoder() {
        // 強度パラメータ（デフォルト: 10）
        // 値が大きいほど計算コストが増加
        return new BCryptPasswordEncoder(12);
    }
}

// 使用例
@Service
public class UserRegistrationService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserRegistrationService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AppUser register(RegistrationRequest req) {
        // パスワードをハッシュ化して保存
        String encodedPassword =
            passwordEncoder.encode(req.password());
        // 例: $2a$12$LJ3m4ys...（毎回異なる値）

        AppUser user = new AppUser();
        user.setUsername(req.username());
        user.setPassword(encodedPassword);
        user.setEmail(req.email());

        return userRepository.save(user);
    }

    public boolean verifyPassword(String raw,
                                   String encoded) {
        // matches でハッシュ値と比較
        return passwordEncoder.matches(raw, encoded);
    }
}`,
      },
      {
        title: "DelegatingPasswordEncoder",
        content:
          "DelegatingPasswordEncoder は複数のエンコーディング方式を同時にサポートする仕組みです。PasswordEncoderFactories.createDelegatingPasswordEncoder() で生成でき、ハッシュ値の先頭に {bcrypt}、{scrypt} などのプレフィックスを付けて方式を識別します。レガシーシステムからの移行時に、古い方式のパスワードと新しい方式のパスワードを混在させることが可能です。",
        code: `@Configuration
public class DelegatingPasswordConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // デフォルトのDelegatingPasswordEncoder
        // bcrypt がデフォルトエンコーダーとして使われる
        return PasswordEncoderFactories
            .createDelegatingPasswordEncoder();
        // 生成されるハッシュ例:
        // {bcrypt}$2a$10$dXJ3SW6G7P50lGmMQgel...
    }

    // カスタム DelegatingPasswordEncoder
    @Bean
    public PasswordEncoder customPasswordEncoder() {
        String defaultEncoder = "bcrypt";
        Map<String, PasswordEncoder> encoders =
            new HashMap<>();
        encoders.put("bcrypt",
            new BCryptPasswordEncoder(12));
        encoders.put("scrypt",
            SCryptPasswordEncoder.defaultsForSpringSecurity_v5_8());
        encoders.put("argon2",
            Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8());
        // レガシー対応
        encoders.put("sha256",
            new StandardPasswordEncoder());

        return new DelegatingPasswordEncoder(
            defaultEncoder, encoders);
    }
}

// 保存されるハッシュ値の例:
// {bcrypt}$2a$12$LJ3m4ys...   → BCrypt
// {scrypt}$e0801$...           → SCrypt
// {argon2}$argon2id$v=19$...   → Argon2
// {sha256}97cde38028ad898...   → SHA-256（レガシー）`,
      },
      {
        title: "パスワードバリデーション",
        content:
          "安全なパスワードポリシーを強制するために、パスワードの複雑さをバリデーションする仕組みが必要です。Spring Security 自体にはパスワードポリシーの機能はありませんが、Bean Validation と組み合わせてカスタムバリデータを作成できます。最小文字数、大文字小文字の混在、数字・特殊文字の要求などを検証します。",
        code: `// カスタムアノテーション
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy =
    StrongPasswordValidator.class)
public @interface StrongPassword {
    String message() default
        "パスワードは8文字以上で、大文字・小文字・"
        + "数字・特殊文字を含む必要があります";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// バリデータ実装
public class StrongPasswordValidator
        implements ConstraintValidator<
            StrongPassword, String> {

    @Override
    public boolean isValid(String password,
            ConstraintValidatorContext context) {
        if (password == null) return false;

        boolean hasUpper =
            password.chars().anyMatch(
                Character::isUpperCase);
        boolean hasLower =
            password.chars().anyMatch(
                Character::isLowerCase);
        boolean hasDigit =
            password.chars().anyMatch(
                Character::isDigit);
        boolean hasSpecial =
            password.matches(".*[!@#$%^&*(),.?\":{}|<>].*");
        boolean hasMinLength =
            password.length() >= 8;

        return hasUpper && hasLower && hasDigit
            && hasSpecial && hasMinLength;
    }
}

// DTO での使用
public record RegistrationRequest(
    @NotBlank String username,
    @Email String email,
    @StrongPassword String password,
    @NotBlank String confirmPassword
) {}`,
      },
      {
        title: "パスワード移行戦略",
        content:
          "レガシーシステムからの移行では、古いハッシュアルゴリズム（MD5、SHA-1 など）で保存されたパスワードを、ログイン時に自動的に新しいアルゴリズムに移行する戦略が有効です。ユーザーがログインに成功した時点で、入力された平文パスワードを新しいアルゴリズムで再ハッシュして保存します。これにより、ユーザーにパスワード変更を強制することなく段階的に移行できます。",
        code: `@Component
public class PasswordMigrationHandler
        implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SavedRequestAwareAuthenticationSuccessHandler
        delegate = new SavedRequestAwareAuthenticationSuccessHandler();

    public PasswordMigrationHandler(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        // 現在のハッシュが最新形式か確認
        String username = authentication.getName();
        AppUser user = userRepository
            .findByUsername(username).orElseThrow();

        if (!user.getPassword().startsWith("{bcrypt}")) {
            // 古い形式 → BCrypt で再ハッシュ
            String rawPassword =
                request.getParameter("password");
            String newHash =
                passwordEncoder.encode(rawPassword);
            user.setPassword(newHash);
            userRepository.save(user);

            log.info("パスワード移行完了: {}",
                username);
        }

        delegate.onAuthenticationSuccess(
            request, response, authentication);
    }
}`,
      },
      {
        title: "パスワードリセット機能",
        content:
          "パスワードリセット機能は、ランダムなトークンを生成してメールで送信し、ユーザーがそのトークンを使って新しいパスワードを設定する流れで実装します。トークンには有効期限を設けて、使用後は無効化します。トークンの保存にはハッシュ化を行い、データベースに平文のリセットトークンを保存しないようにすることがセキュリティ上重要です。",
        code: `@Service
public class PasswordResetService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    // トークン生成・送信
    public void createResetToken(String email) {
        AppUser user = userRepository
            .findByEmail(email)
            .orElseThrow(() -> new UserNotFoundException(
                "ユーザーが見つかりません"));

        // 既存トークンを削除
        tokenRepo.deleteByUser(user);

        // ランダムトークン生成
        String token = UUID.randomUUID().toString();

        // トークンをハッシュ化して保存
        PasswordResetToken resetToken =
            new PasswordResetToken();
        resetToken.setTokenHash(
            passwordEncoder.encode(token));
        resetToken.setUser(user);
        resetToken.setExpiryDate(
            LocalDateTime.now().plusHours(1));
        tokenRepo.save(resetToken);

        // メール送信（平文トークンをURLに含める）
        String resetUrl = "https://example.com"
            + "/reset-password?token=" + token;
        emailService.sendResetEmail(
            email, resetUrl);
    }

    // パスワードリセット実行
    @Transactional
    public void resetPassword(String token,
                               String newPassword) {
        PasswordResetToken resetToken = tokenRepo
            .findAll().stream()
            .filter(t -> passwordEncoder.matches(
                token, t.getTokenHash()))
            .findFirst()
            .orElseThrow(() ->
                new InvalidTokenException(
                    "無効なトークンです"));

        if (resetToken.isExpired()) {
            tokenRepo.delete(resetToken);
            throw new InvalidTokenException(
                "トークンの有効期限が切れています");
        }

        AppUser user = resetToken.getUser();
        user.setPassword(
            passwordEncoder.encode(newPassword));
        userRepository.save(user);
        tokenRepo.delete(resetToken);
    }
}`,
      },
    ],
  },

  // ===== 認証・認可 =====
  {
    id: "jwt-auth",
    title: "JWT認証の実装",
    category: "auth",
    description:
      "JWTトークンの生成・検証を実装し、ステートレスなREST API認証を構築する",
    sections: [
      {
        title: "JWT の概要と依存関係",
        content:
          "JWT（JSON Web Token）はステートレスな認証を実現するための標準仕様（RFC 7519）です。ヘッダー・ペイロード・署名の3部分から構成され、Base64URL でエンコードされます。サーバー側でセッションを保持する必要がなく、REST API の認証に適しています。Java では jjwt（io.jsonwebtoken）ライブラリや auth0 の java-jwt ライブラリが広く使われています。",
        code: `// build.gradle - jjwt ライブラリ
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-web'

    // jjwt ライブラリ（推奨）
    implementation 'io.jsonwebtoken:jjwt-api:0.12.6'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.12.6'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.12.6'
}

// application.yml
// jwt:
//   secret: "your-256-bit-secret-key-here-must-be-long-enough"
//   expiration: 86400000  # 24時間（ミリ秒）
//   refresh-expiration: 604800000  # 7日間`,
      },
      {
        title: "JWT トークンの生成・検証サービス",
        content:
          "JwtService クラスでトークンの生成と検証を行います。SecretKey を使って HMAC-SHA256 で署名し、ペイロードにはユーザー名（subject）、発行日時、有効期限を含めます。検証時は署名の正当性と有効期限を自動的にチェックし、改ざんや期限切れのトークンを拒否します。追加のクレーム（ロールなど）を含めることも可能です。",
        code: `@Service
public class JwtService {

    @Value("\\\${jwt.secret}")
    private String secretKey;

    @Value("\\\${jwt.expiration}")
    private long expiration;

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64
            .decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // トークン生成
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .toList());

        return Jwts.builder()
            .claims(claims)
            .subject(userDetails.getUsername())
            .issuedAt(new Date())
            .expiration(new Date(
                System.currentTimeMillis() + expiration))
            .signWith(getSigningKey())
            .compact();
    }

    // トークンからユーザー名を取得
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // トークンの検証
    public boolean isTokenValid(String token,
                                 UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(
            userDetails.getUsername())
            && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaim(token,
            Claims::getExpiration).before(new Date());
    }

    private <T> T extractClaim(String token,
            Function<Claims, T> resolver) {
        Claims claims = Jwts.parser()
            .verifyWith(getSigningKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
        return resolver.apply(claims);
    }
}`,
      },
      {
        title: "JWT 認証フィルタ",
        content:
          "JWT 認証フィルタはリクエストの Authorization ヘッダーから Bearer トークンを取得し、検証を行います。トークンが有効であれば SecurityContext に認証情報をセットし、後続の処理で認証済みユーザーとして扱われます。OncePerRequestFilter を継承して、リクエストごとに1回だけ実行されるようにします。",
        code: `@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Authorization ヘッダーから Bearer トークンを取得
        String authHeader =
            request.getHeader("Authorization");

        if (authHeader == null
                || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader.substring(7);
        String username = jwtService
            .extractUsername(jwt);

        // 未認証の場合のみ処理
        if (username != null
                && SecurityContextHolder.getContext()
                    .getAuthentication() == null) {

            UserDetails userDetails =
                userDetailsService
                    .loadUserByUsername(username);

            if (jwtService.isTokenValid(
                    jwt, userDetails)) {
                // 認証トークンを作成して
                // SecurityContext にセット
                UsernamePasswordAuthenticationToken
                    authToken =
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());

                authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request));

                SecurityContextHolder.getContext()
                    .setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}`,
      },
      {
        title: "JWT 用 SecurityFilterChain 設定",
        content:
          "JWT 認証を使う REST API では、セッションを STATELESS に設定し、CSRF を無効化します。JwtAuthenticationFilter を UsernamePasswordAuthenticationFilter の前に配置して、JWT トークンによる認証を優先します。認証エンドポイント（/api/auth/**）は認証不要にし、それ以外は認証必須に設定します。",
        code: `@Configuration
@EnableWebSecurity
public class JwtSecurityConfig {

    private final JwtAuthenticationFilter
        jwtAuthFilter;
    private final AuthenticationProvider
        authenticationProvider;

    public JwtSecurityConfig(
            JwtAuthenticationFilter jwtAuthFilter,
            AuthenticationProvider authProvider) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authProvider;
    }

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/**").permitAll()
                .requestMatchers(
                    "/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(
                authenticationProvider)
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter
                    .class)
            // JWT が無効な場合の例外処理
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint(
                    (request, response, authException) -> {
                    response.setStatus(
                        HttpServletResponse
                            .SC_UNAUTHORIZED);
                    response.setContentType(
                        "application/json");
                    response.getWriter().write(
                        "{\\"error\\": \\"認証が必要です\\"}");
                })
            );

        return http.build();
    }

    @Bean
    public AuthenticationProvider
            authenticationProvider(
                UserDetailsService uds,
                PasswordEncoder encoder) {
        DaoAuthenticationProvider provider =
            new DaoAuthenticationProvider();
        provider.setUserDetailsService(uds);
        provider.setPasswordEncoder(encoder);
        return provider;
    }
}`,
      },
      {
        title: "認証コントローラーとリフレッシュトークン",
        content:
          "認証コントローラーでログインとトークンリフレッシュのエンドポイントを提供します。ログイン時にアクセストークンとリフレッシュトークンの2つを発行し、アクセストークンの有効期限が切れた場合にリフレッシュトークンを使って新しいアクセストークンを取得できるようにします。リフレッシュトークンはアクセストークンより長い有効期限を持ちます。",
        code: `@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtService jwtService;
    private final RefreshTokenService
        refreshTokenService;

    public AuthController(
            AuthenticationManager authManager,
            JwtService jwtService,
            RefreshTokenService refreshTokenService) {
        this.authManager = authManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {
        // 認証実行
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.username(),
                request.password()
            )
        );

        UserDetails user =
            (UserDetails) auth.getPrincipal();

        // アクセストークン生成
        String accessToken =
            jwtService.generateToken(user);
        // リフレッシュトークン生成・保存
        RefreshToken refreshToken =
            refreshTokenService.createToken(
                user.getUsername());

        return ResponseEntity.ok(new AuthResponse(
            accessToken,
            refreshToken.getToken(),
            "Bearer"
        ));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(
            @RequestBody RefreshRequest request) {
        RefreshToken refreshToken =
            refreshTokenService
                .findByToken(request.refreshToken())
                .orElseThrow(() ->
                    new RuntimeException(
                        "無効なリフレッシュトークン"));

        refreshTokenService
            .verifyExpiration(refreshToken);

        UserDetails user =
            (UserDetails) userDetailsService
                .loadUserByUsername(
                    refreshToken.getUsername());

        String newAccessToken =
            jwtService.generateToken(user);

        return ResponseEntity.ok(new AuthResponse(
            newAccessToken,
            refreshToken.getToken(),
            "Bearer"
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @AuthenticationPrincipal
            UserDetails user) {
        refreshTokenService
            .deleteByUsername(user.getUsername());
        return ResponseEntity.ok().build();
    }
}

// レスポンス / リクエスト DTO
public record AuthResponse(
    String accessToken,
    String refreshToken,
    String tokenType
) {}

public record LoginRequest(
    @NotBlank String username,
    @NotBlank String password
) {}

public record RefreshRequest(
    @NotBlank String refreshToken
) {}`,
      },
    ],
  },
  {
    id: "oauth2-login",
    title: "OAuth2ログイン",
    category: "auth",
    description:
      "Google・GitHubなどの外部プロバイダーを使ったOAuth2ソーシャルログインを実装する",
    sections: [
      {
        title: "OAuth2 Client の依存関係と設定",
        content:
          "Spring Security OAuth2 Client を使うと、Google や GitHub などの OAuth2 プロバイダーによるソーシャルログインを簡単に実装できます。spring-boot-starter-oauth2-client を追加し、application.yml にクライアントID とシークレットを設定するだけで基本的なOAuth2 ログインが動作します。Google や GitHub などの主要プロバイダーは CommonOAuth2Provider で事前定義されています。",
        code: `// build.gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-web'
}

// application.yml
// spring:
//   security:
//     oauth2:
//       client:
//         registration:
//           google:
//             client-id: your-google-client-id
//             client-secret: your-google-client-secret
//             scope: openid, profile, email
//           github:
//             client-id: your-github-client-id
//             client-secret: your-github-client-secret
//             scope: read:user, user:email
//
// OAuth2 のリダイレクトURI（デフォルト）:
// /login/oauth2/code/{registrationId}
// 例: /login/oauth2/code/google`,
      },
      {
        title: "OAuth2 SecurityFilterChain の設定",
        content:
          "OAuth2 ログインを SecurityFilterChain に組み込むには、oauth2Login() を設定に追加します。ログインページ、成功・失敗ハンドラー、ユーザー情報のカスタマイズなどを設定できます。oauth2Login を formLogin と併用することで、通常のフォームログインとソーシャルログインの両方を提供できます。",
        code: `@Configuration
@EnableWebSecurity
public class OAuth2SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/login",
                    "/css/**", "/error").permitAll()
                .anyRequest().authenticated()
            )
            // フォームログイン
            .formLogin(form -> form
                .loginPage("/login")
                .permitAll()
            )
            // OAuth2 ログイン
            .oauth2Login(oauth2 -> oauth2
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .failureUrl("/login?error=oauth2")
                // ユーザー情報取得後のカスタム処理
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(
                        customOAuth2UserService())
                    .oidcUserService(
                        customOidcUserService())
                )
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/login?logout")
                .permitAll()
            );

        return http.build();
    }
}

// ログインページコントローラー
@Controller
public class LoginPageController {

    @GetMapping("/login")
    public String loginPage() {
        return "login";
        // テンプレートに Google/GitHub ログインボタン
        // <a href="/oauth2/authorization/google">
        //   Google でログイン
        // </a>
        // <a href="/oauth2/authorization/github">
        //   GitHub でログイン
        // </a>
    }
}`,
      },
      {
        title: "OAuth2UserService のカスタマイズ",
        content:
          "デフォルトの OAuth2UserService はプロバイダーからユーザー情報を取得するだけですが、カスタム実装では取得した情報をデータベースに保存したり、既存アカウントとの紐付けを行ったりできます。初回ログイン時にユーザーを自動登録し、2回目以降は既存ユーザーの情報を更新する処理が一般的です。",
        code: `@Service
public class CustomOAuth2UserService
        extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(
            UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(
            OAuth2UserRequest userRequest)
            throws OAuth2AuthenticationException {

        OAuth2User oAuth2User =
            super.loadUser(userRequest);

        String provider = userRequest
            .getClientRegistration()
            .getRegistrationId(); // "google", "github"

        String providerId = oAuth2User.getName();
        String email = oAuth2User
            .getAttribute("email");
        String name = oAuth2User
            .getAttribute("name");

        // DB でユーザーを検索 or 新規作成
        AppUser user = userRepository
            .findByProviderAndProviderId(
                provider, providerId)
            .orElseGet(() -> {
                AppUser newUser = new AppUser();
                newUser.setProvider(provider);
                newUser.setProviderId(providerId);
                newUser.setEmail(email);
                newUser.setName(name);
                newUser.setRole("ROLE_USER");
                return userRepository.save(newUser);
            });

        // 既存ユーザーの情報を更新
        user.setName(name);
        user.setEmail(email);
        userRepository.save(user);

        // カスタム OAuth2User を返す
        return new CustomOAuth2User(
            oAuth2User, user);
    }
}

// カスタム OAuth2User
public class CustomOAuth2User
        implements OAuth2User {

    private final OAuth2User delegate;
    private final AppUser appUser;

    public CustomOAuth2User(OAuth2User delegate,
                             AppUser appUser) {
        this.delegate = delegate;
        this.appUser = appUser;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return delegate.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority>
            getAuthorities() {
        return List.of(new SimpleGrantedAuthority(
            appUser.getRole()));
    }

    @Override
    public String getName() {
        return delegate.getName();
    }

    public Long getUserId() {
        return appUser.getId();
    }

    public String getEmail() {
        return appUser.getEmail();
    }
}`,
      },
      {
        title: "OAuth2 と JWT の組み合わせ",
        content:
          "SPA（シングルページアプリケーション）と REST API の構成では、OAuth2 ログイン成功後に JWT トークンを発行するパターンが一般的です。OAuth2 認証成功ハンドラーで JWT を生成し、フロントエンドにリダイレクトしてトークンを渡します。以降の API アクセスは JWT で認証します。",
        code: `@Component
public class OAuth2AuthenticationSuccessHandler
        extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Value("\\\${app.frontend-url}")
    private String frontendUrl;

    public OAuth2AuthenticationSuccessHandler(
            JwtService jwtService,
            UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException {

        CustomOAuth2User oAuth2User =
            (CustomOAuth2User)
                authentication.getPrincipal();

        // OAuth2 ユーザーから UserDetails を取得
        UserDetails userDetails =
            userDetailsService.loadUserByUsername(
                oAuth2User.getEmail());

        // JWT トークンを生成
        String accessToken =
            jwtService.generateToken(userDetails);

        // フロントエンドにリダイレクト
        // トークンをURLパラメータで渡す
        String targetUrl = UriComponentsBuilder
            .fromUriString(
                frontendUrl + "/oauth2/callback")
            .queryParam("token", accessToken)
            .build().toUriString();

        getRedirectStrategy()
            .sendRedirect(request, response,
                targetUrl);
    }
}

// SecurityFilterChain での設定
@Bean
public SecurityFilterChain filterChain(
        HttpSecurity http) throws Exception {
    http
        .oauth2Login(oauth2 -> oauth2
            .successHandler(
                oAuth2AuthenticationSuccessHandler)
            .userInfoEndpoint(userInfo -> userInfo
                .userService(customOAuth2UserService)
            )
        );

    return http.build();
}`,
      },
      {
        title: "OAuth2 リソースサーバー",
        content:
          "API サーバーを OAuth2 リソースサーバーとして設定すると、外部の認証サーバーが発行した JWT トークンを検証してアクセス制御を行えます。spring-boot-starter-oauth2-resource-server を使い、JWT の発行者（issuer）URI を設定するだけで自動的にトークンの検証が行われます。カスタムの JwtAuthenticationConverter でトークンのクレームから権限を抽出できます。",
        code: `// build.gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-resource-server'
}

// application.yml
// spring:
//   security:
//     oauth2:
//       resourceserver:
//         jwt:
//           issuer-uri: https://accounts.google.com
//           # または jwk-set-uri で直接指定

@Configuration
@EnableWebSecurity
public class ResourceServerConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**")
                    .permitAll()
                .requestMatchers("/api/admin/**")
                    .hasAuthority("SCOPE_admin")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt
                    .jwtAuthenticationConverter(
                        jwtAuthenticationConverter())
                )
            );

        return http.build();
    }

    // JWT クレームから権限を抽出するカスタムコンバーター
    @Bean
    public JwtAuthenticationConverter
            jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter
            grantedAuthConverter =
                new JwtGrantedAuthoritiesConverter();
        // JWT の "roles" クレームから権限を取得
        grantedAuthConverter
            .setAuthoritiesClaimName("roles");
        grantedAuthConverter
            .setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter converter =
            new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(
            grantedAuthConverter);
        return converter;
    }
}`,
      },
    ],
  },
  {
    id: "rbac",
    title: "ロールベースアクセス制御",
    category: "auth",
    description:
      "@PreAuthorizeやメソッドセキュリティを使ったきめ細かいアクセス制御を実装する",
    sections: [
      {
        title: "メソッドセキュリティの有効化",
        content:
          "Spring Security のメソッドセキュリティを使うと、コントローラーやサービスのメソッド単位でアクセス制御を行えます。@EnableMethodSecurity を設定クラスに追加することで、@PreAuthorize、@PostAuthorize、@Secured などのアノテーションが使えるようになります。Spring Security 6 以降では @EnableMethodSecurity がデフォルトで prePostEnabled = true を含んでいます。",
        code: `@Configuration
@EnableMethodSecurity(
    // @PreAuthorize, @PostAuthorize を有効化
    // （デフォルトで true）
    prePostEnabled = true,
    // @Secured を有効化
    securedEnabled = true,
    // JSR-250 の @RolesAllowed を有効化
    jsr250Enabled = true
)
public class MethodSecurityConfig {
    // メソッドセキュリティの設定のみ
    // SecurityFilterChain は別クラスで定義
}

// @Secured の使用例
@Service
public class ReportService {

    @Secured("ROLE_ADMIN")
    public Report generateAdminReport() {
        // ADMIN ロールのみ実行可能
        return new Report("管理者レポート");
    }

    @Secured({"ROLE_ADMIN", "ROLE_MANAGER"})
    public Report generateManagerReport() {
        // ADMIN または MANAGER ロールで実行可能
        return new Report("マネージャーレポート");
    }
}

// @RolesAllowed（JSR-250）の使用例
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @RolesAllowed("ADMIN")
    @GetMapping("/admin")
    public Report adminReport() {
        return reportService.generateAdminReport();
    }
}`,
      },
      {
        title: "@PreAuthorize と SpEL 式",
        content:
          "@PreAuthorize はメソッド実行前にアクセス権限を検証する強力なアノテーションです。SpEL（Spring Expression Language）式を使って柔軟な条件を記述できます。hasRole、hasAuthority、hasAnyRole などの組み込み式に加え、AND / OR の論理演算子、メソッド引数の参照、カスタム式なども利用可能です。",
        code: `@RestController
@RequestMapping("/api/users")
public class UserController {

    // ロールベースのアクセス制御
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserResponse> getAllUsers() {
        return userService.findAll();
    }

    // 複合条件
    @PreAuthorize(
        "hasRole('ADMIN') or hasRole('MANAGER')")
    @GetMapping("/team")
    public List<UserResponse> getTeamMembers() {
        return userService.findTeamMembers();
    }

    // メソッド引数を参照
    @PreAuthorize(
        "#userId == authentication.principal.id "
        + "or hasRole('ADMIN')")
    @GetMapping("/{userId}")
    public UserResponse getUser(
            @PathVariable Long userId) {
        return userService.findById(userId);
    }

    // 権限ベースのアクセス制御
    @PreAuthorize("hasAuthority('USER_CREATE')")
    @PostMapping
    public UserResponse createUser(
            @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }

    // 認証済みユーザーのみ
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public UserResponse getCurrentUser(
            @AuthenticationPrincipal
            CustomUserDetails user) {
        return userService.findById(user.getId());
    }

    // IP アドレスによる制限
    @PreAuthorize(
        "hasRole('ADMIN') and "
        + "hasIpAddress('192.168.1.0/24')")
    @DeleteMapping("/{userId}")
    public void deleteUser(
            @PathVariable Long userId) {
        userService.delete(userId);
    }
}`,
      },
      {
        title: "@PostAuthorize と @PostFilter",
        content:
          "@PostAuthorize はメソッド実行後に戻り値を検証し、条件を満たさない場合はアクセスを拒否します。@PreFilter と @PostFilter はコレクション型の引数や戻り値をフィルタリングし、権限に基づいて要素を除外します。returnObject で戻り値を参照し、filterObject でコレクションの各要素を参照できます。",
        code: `@Service
public class DocumentService {

    private final DocumentRepository documentRepo;

    // 実行後に戻り値を検証
    // 自分のドキュメントか、管理者のみアクセス可能
    @PostAuthorize(
        "returnObject.ownerId == "
        + "authentication.principal.id "
        + "or hasRole('ADMIN')")
    public Document findById(Long documentId) {
        return documentRepo.findById(documentId)
            .orElseThrow(() ->
                new NotFoundException("文書が見つかりません"));
    }

    // 戻り値のコレクションをフィルタリング
    // 自分が所有するドキュメントのみ返す
    @PostFilter(
        "filterObject.ownerId == "
        + "authentication.principal.id "
        + "or filterObject.isPublic")
    public List<Document> findAll() {
        return documentRepo.findAll();
    }

    // 引数のコレクションをフィルタリング
    // ADMIN は全て、一般ユーザーは自分のもののみ
    @PreFilter(
        "hasRole('ADMIN') or "
        + "filterObject.ownerId == "
        + "authentication.principal.id")
    public void deleteAll(
            List<Document> documents) {
        documentRepo.deleteAll(documents);
    }

    // @PreAuthorize と @PostAuthorize の組み合わせ
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PostAuthorize(
        "returnObject.department == "
        + "authentication.principal.department "
        + "or hasRole('ADMIN')")
    public ConfidentialReport getReport(
            Long reportId) {
        return reportRepo.findById(reportId)
            .orElseThrow();
    }
}`,
      },
      {
        title: "カスタム権限評価",
        content:
          "複雑なアクセス制御ロジックは PermissionEvaluator を実装して @PreAuthorize の hasPermission 式から呼び出せます。また、@Bean としてカスタムメソッドを定義し、SpEL 式から参照することもできます。ビジネスロジックに基づく細かな権限判定をアノテーションで宣言的に記述できるようになります。",
        code: `// カスタム PermissionEvaluator
@Component
public class CustomPermissionEvaluator
        implements PermissionEvaluator {

    private final ProjectMemberRepository memberRepo;

    public CustomPermissionEvaluator(
            ProjectMemberRepository memberRepo) {
        this.memberRepo = memberRepo;
    }

    @Override
    public boolean hasPermission(
            Authentication auth,
            Object targetDomainObject,
            Object permission) {
        if (auth == null || targetDomainObject == null)
            return false;

        CustomUserDetails user =
            (CustomUserDetails) auth.getPrincipal();

        if (targetDomainObject instanceof Project project) {
            return checkProjectPermission(
                user.getId(), project,
                (String) permission);
        }
        return false;
    }

    @Override
    public boolean hasPermission(
            Authentication auth,
            Serializable targetId,
            String targetType,
            Object permission) {
        // ID ベースの権限チェック
        return false;
    }

    private boolean checkProjectPermission(
            Long userId, Project project,
            String permission) {
        return memberRepo
            .findByUserIdAndProjectId(
                userId, project.getId())
            .map(member ->
                member.hasPermission(permission))
            .orElse(false);
    }
}

// 使用例
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    // hasPermission 式を使用
    @PreAuthorize(
        "hasPermission(#project, 'EDIT')")
    @PutMapping("/{id}")
    public ProjectResponse updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {
        return projectService.update(id, project);
    }
}

// Bean メソッドを SpEL から呼び出す方法
@Component("authz")
public class AuthorizationLogic {

    public boolean isProjectMember(
            Authentication auth, Long projectId) {
        // カスタムロジック
        return true;
    }
}

// @PreAuthorize("@authz.isProjectMember(
//     authentication, #projectId)")`,
      },
      {
        title: "ロール階層とエンティティ設計",
        content:
          "RoleHierarchy を定義すると、ロール間の継承関係を設定できます。例えば ADMIN は MANAGER の権限を含み、MANAGER は USER の権限を含むといった階層を表現できます。エンティティ設計では、ユーザー・ロール・権限の3層構造（RBAC モデル）が一般的で、多対多のリレーションシップで柔軟な権限管理を実現します。",
        code: `// ロール階層の設定
@Configuration
public class RoleHierarchyConfig {

    @Bean
    public RoleHierarchy roleHierarchy() {
        return RoleHierarchyImpl.withDefaultRolePrefix()
            .role("ADMIN").implies("MANAGER")
            .role("MANAGER").implies("USER")
            .role("USER").implies("GUEST")
            .build();
    }
}

// エンティティ設計
@Entity
@Table(name = "users")
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name; // ROLE_ADMIN, ROLE_USER

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_permissions",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns =
            @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions =
        new HashSet<>();
}

@Entity
@Table(name = "permissions")
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name; // USER_READ, USER_CREATE...
}

// UserDetailsService での権限変換
// ロール + パーミッション → GrantedAuthority
// return User.builder()
//     .username(user.getUsername())
//     .password(user.getPassword())
//     .authorities(getAuthorities(user.getRoles()))
//     .build();`,
      },
    ],
  },

  // ===== 実践 =====
  {
    id: "cors-csrf",
    title: "CORS・CSRF対策",
    category: "advanced",
    description:
      "CORSの設定とCSRFトークンによるクロスサイトリクエストフォージェリ対策を実装する",
    sections: [
      {
        title: "CORS の基本設定",
        content:
          "CORS（Cross-Origin Resource Sharing）は異なるオリジンからのリクエストを制御する仕組みです。フロントエンド（例: localhost:3000）とバックエンド（例: localhost:8080）が異なるオリジンの場合、ブラウザがプリフライトリクエストを送信して許可を確認します。Spring Security では CorsConfigurationSource Bean を定義して許可するオリジン、メソッド、ヘッダーを設定します。",
        code: `@Configuration
@EnableWebSecurity
public class CorsSecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            // CORS 設定を有効化
            .cors(cors -> cors
                .configurationSource(
                    corsConfigurationSource())
            )
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource
            corsConfigurationSource() {
        CorsConfiguration config =
            new CorsConfiguration();

        // 許可するオリジン
        config.setAllowedOrigins(List.of(
            "http://localhost:3000",
            "https://app.example.com"
        ));

        // 許可する HTTP メソッド
        config.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE",
            "PATCH", "OPTIONS"
        ));

        // 許可するリクエストヘッダー
        config.setAllowedHeaders(List.of(
            "Authorization",
            "Content-Type",
            "X-Requested-With"
        ));

        // レスポンスで公開するヘッダー
        config.setExposedHeaders(List.of(
            "X-Total-Count",
            "X-Page-Number"
        ));

        // Cookie / 認証情報の送信を許可
        config.setAllowCredentials(true);

        // プリフライトのキャッシュ時間（秒）
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        // すべてのパスに適用
        source.registerCorsConfiguration(
            "/**", config);
        return source;
    }
}`,
      },
      {
        title: "CORS の環境別設定",
        content:
          "開発環境では広く許可し、本番環境では厳密に制限するなど、環境に応じた CORS 設定が必要です。@Profile や application.yml のプロパティを使って環境別の設定を切り替えます。また、パスごとに異なる CORS ポリシーを適用することもできます。",
        code: `@Configuration
public class CorsConfig {

    @Value("\\\${app.cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Value("\\\${app.cors.allow-credentials:true}")
    private boolean allowCredentials;

    @Bean
    public CorsConfigurationSource
            corsConfigurationSource() {
        CorsConfiguration apiConfig =
            new CorsConfiguration();
        apiConfig.setAllowedOrigins(allowedOrigins);
        apiConfig.setAllowedMethods(List.of(
            "GET", "POST", "PUT", "DELETE"));
        apiConfig.setAllowedHeaders(List.of("*"));
        apiConfig.setAllowCredentials(
            allowCredentials);

        // 公開 API は全オリジン許可
        CorsConfiguration publicConfig =
            new CorsConfiguration();
        publicConfig.setAllowedOrigins(
            List.of("*"));
        publicConfig.setAllowedMethods(
            List.of("GET"));
        publicConfig.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(
            "/api/public/**", publicConfig);
        source.registerCorsConfiguration(
            "/api/**", apiConfig);

        return source;
    }
}

// application-dev.yml
// app:
//   cors:
//     allowed-origins:
//       - http://localhost:3000
//       - http://localhost:5173
//     allow-credentials: true

// application-prod.yml
// app:
//   cors:
//     allowed-origins:
//       - https://app.example.com
//     allow-credentials: true`,
      },
      {
        title: "CSRF 保護の仕組み",
        content:
          "CSRF（Cross-Site Request Forgery）はユーザーの認証状態を悪用して不正なリクエストを送信する攻撃です。Spring Security はデフォルトで CSRF 保護が有効になっており、状態を変更するリクエスト（POST、PUT、DELETE など）に CSRF トークンを要求します。REST API では通常 CSRF を無効化しますが、Cookie ベースの認証を使う場合は有効にすべきです。",
        code: `@Configuration
@EnableWebSecurity
public class CsrfConfig {

    // 方法1: REST API（JWT認証）では CSRF を無効化
    @Bean
    @Order(1)
    public SecurityFilterChain apiFilterChain(
            HttpSecurity http) throws Exception {
        http
            .securityMatcher("/api/**")
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            );

        return http.build();
    }

    // 方法2: Web画面（セッション認証）では
    //        CSRF を有効にする
    @Bean
    @Order(2)
    public SecurityFilterChain webFilterChain(
            HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
                // デフォルト: HttpSessionCsrfTokenRepository
                // セッションに CSRF トークンを保存
                .csrfTokenRepository(
                    HttpSessionCsrfTokenRepository
                        .withHttpOnlyFalse())
                // 特定のパスを CSRF 保護から除外
                .ignoringRequestMatchers(
                    "/api/webhooks/**")
            )
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            )
            .formLogin(Customizer.withDefaults());

        return http.build();
    }
}

// Thymeleaf テンプレートでの CSRF トークン
// <form th:action="@{/update}" method="post">
//   <!-- 自動的に hidden フィールドが追加される -->
//   <!-- <input type="hidden" name="_csrf"
//          value="token-value"/> -->
//   <button type="submit">更新</button>
// </form>`,
      },
      {
        title: "SPA 向け CSRF 設定",
        content:
          "SPA（React、Vue.js など）とセッション認証を組み合わせる場合、CookieCsrfTokenRepository を使って CSRF トークンを Cookie 経由で共有します。フロントエンドは Cookie から CSRF トークンを読み取り、リクエストヘッダーに X-XSRF-TOKEN として送信します。Spring Security 6 では BREACH 攻撃対策のためトークンのハンドリングが変更されています。",
        code: `@Configuration
@EnableWebSecurity
public class SpaCsrfConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf
                // Cookie に CSRF トークンを保存
                // JS から読み取れるよう httpOnly=false
                .csrfTokenRepository(
                    CookieCsrfTokenRepository
                        .withHttpOnlyFalse())
                // Spring Security 6:
                // BREACH 対策のトークンハンドラー
                .csrfTokenRequestHandler(
                    new SpaCsrfTokenRequestHandler())
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/index.html",
                    "/css/**", "/js/**").permitAll()
                .anyRequest().authenticated()
            )
            // SPA のルーティング対応
            .formLogin(Customizer.withDefaults());

        return http.build();
    }
}

// Spring Security 6 対応の CSRF ハンドラー
public class SpaCsrfTokenRequestHandler
        extends CsrfTokenRequestAttributeHandler {

    private final CsrfTokenRequestHandler delegate =
        new XorCsrfTokenRequestAttributeHandler();

    @Override
    public void handle(HttpServletRequest request,
            HttpServletResponse response,
            Supplier<CsrfToken> csrfToken) {
        // CsrfToken をリクエスト属性とレスポンスの
        // Cookie に書き込む
        this.delegate.handle(
            request, response, csrfToken);
    }

    @Override
    public String resolveCsrfTokenValue(
            HttpServletRequest request,
            CsrfToken csrfToken) {
        // ヘッダーにトークンがあればそちらを使用
        String headerValue = request.getHeader(
            csrfToken.getHeaderName());
        if (StringUtils.hasText(headerValue)) {
            return super.resolveCsrfTokenValue(
                request, csrfToken);
        }
        return this.delegate.resolveCsrfTokenValue(
            request, csrfToken);
    }
}

// フロントエンド（JavaScript）での CSRF トークン送信
// const csrfToken = document.cookie
//   .split('; ')
//   .find(row => row.startsWith('XSRF-TOKEN='))
//   ?.split('=')[1];
//
// fetch('/api/data', {
//   method: 'POST',
//   headers: {
//     'X-XSRF-TOKEN': csrfToken,
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(data)
// });`,
      },
      {
        title: "セキュリティヘッダーの設定",
        content:
          "Spring Security はデフォルトで多くのセキュリティヘッダーを付与しますが、要件に応じてカスタマイズが必要な場合があります。Content-Security-Policy（CSP）、X-Frame-Options、Strict-Transport-Security（HSTS）などのヘッダーを設定して、XSS やクリックジャッキングなどの攻撃を防ぎます。",
        code: `@Configuration
@EnableWebSecurity
public class SecurityHeadersConfig {

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {
        http
            .headers(headers -> headers
                // Content-Security-Policy
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives(
                        "default-src 'self'; "
                        + "script-src 'self' "
                        + "'nonce-{random}'; "
                        + "style-src 'self' "
                        + "https://fonts.googleapis.com; "
                        + "img-src 'self' data:; "
                        + "font-src 'self' "
                        + "https://fonts.gstatic.com")
                )
                // X-Frame-Options
                .frameOptions(frame -> frame
                    .sameOrigin() // 同一オリジンのみ許可
                )
                // HSTS (HTTP Strict Transport Security)
                .httpStrictTransportSecurity(hsts ->
                    hsts
                        .includeSubDomains(true)
                        .maxAgeInSeconds(31536000)
                )
                // X-Content-Type-Options: nosniff
                .contentTypeOptions(
                    Customizer.withDefaults())
                // Referrer-Policy
                .referrerPolicy(referrer -> referrer
                    .policy(ReferrerPolicyHeaderWriter
                        .ReferrerPolicy
                        .STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                )
                // Permissions-Policy
                .permissionsPolicy(permissions ->
                    permissions.policy(
                        "camera=(), "
                        + "microphone=(), "
                        + "geolocation=(self)")
                )
            )
            .authorizeHttpRequests(auth -> auth
                .anyRequest().authenticated()
            );

        return http.build();
    }
}`,
      },
    ],
  },
  {
    id: "security-testing",
    title: "Spring Security テスト",
    category: "advanced",
    description:
      "@WithMockUserやSecurityMockMvcRequestPostProcessorsを使ったセキュリティテストの書き方を学ぶ",
    sections: [
      {
        title: "テスト環境のセットアップ",
        content:
          "Spring Security のテストには spring-security-test モジュールを使います。@WebMvcTest と組み合わせてコントローラーのセキュリティテストを行い、MockMvc でリクエストを送信して認証・認可の動作を検証します。テスト用の SecurityFilterChain 設定をインポートするか、@WithMockUser で仮のユーザーを設定してテストします。",
        code: `// build.gradle
dependencies {
    testImplementation 'org.springframework.security:spring-security-test'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

// テスト対象のコントローラー
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser(
            @AuthenticationPrincipal
            UserDetails user) {
        return userService.findByUsername(
            user.getUsername());
    }

    @PostMapping
    @PreAuthorize("hasAuthority('USER_CREATE')")
    public UserResponse createUser(
            @RequestBody CreateUserRequest request) {
        return userService.create(request);
    }
}

// テストクラスの基本構成
@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    // テストメソッドがここに入る
}`,
      },
      {
        title: "@WithMockUser によるテスト",
        content:
          "@WithMockUser アノテーションを使うと、認証済みユーザーの状態でテストを実行できます。ユーザー名、ロール、権限をアノテーションの属性で指定します。認証が必要なエンドポイントのテストや、特定のロールが必要なエンドポイントのアクセス拒否テストに使います。",
        code: `@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class UserControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    // 認証なしでアクセス → 401
    @Test
    void 未認証ユーザーはアクセスできない()
            throws Exception {
        mockMvc.perform(get("/api/users/me"))
            .andExpect(status().isUnauthorized());
    }

    // @WithMockUser で認証済みユーザーを設定
    @Test
    @WithMockUser(username = "testuser",
        roles = {"USER"})
    void 認証済みユーザーは自分の情報を取得できる()
            throws Exception {
        given(userService.findByUsername("testuser"))
            .willReturn(new UserResponse(
                1L, "testuser", "test@example.com"));

        mockMvc.perform(get("/api/users/me"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username")
                .value("testuser"));
    }

    // ADMIN ロールのテスト
    @Test
    @WithMockUser(roles = {"ADMIN"})
    void 管理者は全ユーザーを取得できる()
            throws Exception {
        given(userService.findAll())
            .willReturn(List.of(
                new UserResponse(1L, "user1",
                    "user1@example.com")));

        mockMvc.perform(get("/api/users"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)));
    }

    // 権限不足のテスト
    @Test
    @WithMockUser(roles = {"USER"})
    void 一般ユーザーは全ユーザー取得できない()
            throws Exception {
        mockMvc.perform(get("/api/users"))
            .andExpect(status().isForbidden());
    }

    // 権限ベースのテスト
    @Test
    @WithMockUser(
        authorities = {"USER_CREATE"})
    void USER_CREATE権限でユーザー作成できる()
            throws Exception {
        CreateUserRequest request =
            new CreateUserRequest(
                "newuser", "new@example.com");

        given(userService.create(any()))
            .willReturn(new UserResponse(
                2L, "newuser", "new@example.com"));

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper
                    .writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username")
                .value("newuser"));
    }
}`,
      },
      {
        title: "SecurityMockMvcRequestPostProcessors",
        content:
          "SecurityMockMvcRequestPostProcessors を使うと、MockMvc リクエストに認証情報を動的に付加できます。@WithMockUser はメソッドレベルのアノテーションですが、PostProcessors はリクエストごとに異なる認証情報を設定できるためテストの柔軟性が高まります。user()、csrf()、oauth2Login()、jwt() などのメソッドが用意されています。",
        code: `import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class PostProcessorsTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    // user() で認証ユーザーを設定
    @Test
    void user_PostProcessorで認証() throws Exception {
        mockMvc.perform(get("/api/users/me")
                .with(user("admin")
                    .roles("ADMIN")
                    .password("password")))
            .andExpect(status().isOk());
    }

    // csrf() で CSRF トークンを付加
    @Test
    void POSTリクエストにCSRFトークンを付加()
            throws Exception {
        mockMvc.perform(post("/api/users")
                .with(csrf())
                .with(user("admin").roles("ADMIN"))
                .contentType(MediaType.APPLICATION_JSON)
                .content("{}"))
            .andExpect(status().isOk());
    }

    // httpBasic() で Basic 認証
    @Test
    void Basic認証でアクセス() throws Exception {
        mockMvc.perform(get("/api/users/me")
                .with(httpBasic("user", "password")))
            .andExpect(status().isOk());
    }

    // jwt() で JWT 認証をモック
    @Test
    void JWTトークンでアクセス() throws Exception {
        mockMvc.perform(get("/api/users/me")
                .with(jwt()
                    .jwt(j -> j
                        .subject("testuser")
                        .claim("roles",
                            List.of("ROLE_USER"))
                    )
                    .authorities(
                        new SimpleGrantedAuthority(
                            "ROLE_USER"))
                ))
            .andExpect(status().isOk());
    }

    // oauth2Login() で OAuth2 ログインをモック
    @Test
    void OAuth2ログインユーザーでアクセス()
            throws Exception {
        mockMvc.perform(get("/api/users/me")
                .with(oauth2Login()
                    .attributes(attrs -> {
                        attrs.put("sub", "12345");
                        attrs.put("email",
                            "user@example.com");
                        attrs.put("name",
                            "Test User");
                    })
                    .authorities(
                        new SimpleGrantedAuthority(
                            "ROLE_USER"))
                ))
            .andExpect(status().isOk());
    }
}`,
      },
      {
        title: "カスタム UserDetails のテスト",
        content:
          "カスタム UserDetails を使っている場合、@WithMockUser では不十分なケースがあります。@WithSecurityContext を使ったカスタムアノテーションを作成するか、SecurityMockMvcRequestPostProcessors の user() メソッドにカスタム UserDetails オブジェクトを渡す方法があります。",
        code: `// カスタムアノテーション
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(
    factory = WithMockCustomUserFactory.class)
public @interface WithMockCustomUser {
    long id() default 1L;
    String username() default "testuser";
    String email() default "test@example.com";
    String[] roles() default {"USER"};
}

// SecurityContext ファクトリ
public class WithMockCustomUserFactory
        implements WithSecurityContextFactory<
            WithMockCustomUser> {

    @Override
    public SecurityContext createSecurityContext(
            WithMockCustomUser annotation) {
        SecurityContext context =
            SecurityContextHolder
                .createEmptyContext();

        // カスタム UserDetails を作成
        CustomUserDetails principal =
            new CustomUserDetails(
                annotation.id(),
                annotation.username(),
                annotation.email(),
                "encoded-password",
                Arrays.stream(annotation.roles())
                    .map(r ->
                        new SimpleGrantedAuthority(
                            "ROLE_" + r))
                    .collect(Collectors.toList())
            );

        Authentication auth =
            new UsernamePasswordAuthenticationToken(
                principal,
                null,
                principal.getAuthorities());

        context.setAuthentication(auth);
        return context;
    }
}

// テストでの使用
@WebMvcTest(UserController.class)
@Import(SecurityConfig.class)
class CustomUserTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @WithMockCustomUser(
        id = 42,
        username = "admin",
        roles = {"ADMIN"})
    void カスタムユーザーでテスト() throws Exception {
        mockMvc.perform(get("/api/users/me"))
            .andExpect(status().isOk());
    }

    // PostProcessor で直接設定する方法
    @Test
    void PostProcessorでカスタムユーザー()
            throws Exception {
        CustomUserDetails customUser =
            new CustomUserDetails(
                1L, "testuser", "test@example.com",
                "password",
                List.of(new SimpleGrantedAuthority(
                    "ROLE_USER")));

        mockMvc.perform(get("/api/users/me")
                .with(user(customUser)))
            .andExpect(status().isOk());
    }
}`,
      },
      {
        title: "統合テストとセキュリティ設定のテスト",
        content:
          "@SpringBootTest と TestRestTemplate / WebTestClient を使った統合テストでは、実際のセキュリティ設定が適用された状態でエンドポイントの動作を検証します。URL パターンごとのアクセス制御、CORS ヘッダー、CSRF 保護などが正しく機能しているかをエンドツーエンドで確認できます。",
        code: `@SpringBootTest(
    webEnvironment = SpringBootTest.WebEnvironment
        .RANDOM_PORT)
class SecurityIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @LocalServerPort
    private int port;

    @Test
    void 公開エンドポイントは認証不要() {
        ResponseEntity<String> response =
            restTemplate.getForEntity(
                "/api/public/health", String.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.OK);
    }

    @Test
    void 保護エンドポイントは認証が必要() {
        ResponseEntity<String> response =
            restTemplate.getForEntity(
                "/api/users/me", String.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void 有効な認証情報でアクセスできる() {
        ResponseEntity<String> response =
            restTemplate
                .withBasicAuth("user", "password")
                .getForEntity(
                    "/api/users/me", String.class);
        assertThat(response.getStatusCode())
            .isEqualTo(HttpStatus.OK);
    }

    // WebTestClient を使ったテスト
    @Autowired
    private WebTestClient webTestClient;

    @Test
    void WebTestClientでセキュリティテスト() {
        // 認証なし → 401
        webTestClient.get()
            .uri("/api/users/me")
            .exchange()
            .expectStatus().isUnauthorized();

        // 認証あり → 200
        webTestClient.get()
            .uri("/api/users/me")
            .headers(h -> h.setBasicAuth(
                "user", "password"))
            .exchange()
            .expectStatus().isOk();
    }

    // CORS ヘッダーのテスト
    @Test
    void CORSヘッダーが正しく設定される() {
        webTestClient.options()
            .uri("/api/users")
            .header("Origin",
                "http://localhost:3000")
            .header("Access-Control-Request-Method",
                "GET")
            .exchange()
            .expectStatus().isOk()
            .expectHeader().valueEquals(
                "Access-Control-Allow-Origin",
                "http://localhost:3000")
            .expectHeader().exists(
                "Access-Control-Allow-Methods");
    }
}`,
      },
    ],
  },
];

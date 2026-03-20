export type SpringSecurityLevel = "basics" | "auth" | "advanced";

export interface SpringSecurityQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: SpringSecurityLevel;
  chapter: string;
}

export const springSecurityQuizQuestions: SpringSecurityQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: Spring Securityの基礎 5問
  // ════════════════════════════════════════
  {
    id: "ss-basics-q01",
    question: "Spring Securityのアーキテクチャにおいて、リクエストの認証・認可処理を行う中核コンポーネントはどれですか？",
    choices: [
      { label: "A", text: "DispatcherServlet" },
      { label: "B", text: "SecurityFilterChain" },
      { label: "C", text: "ApplicationContext" },
      { label: "D", text: "DataSource" },
    ],
    correctLabel: "B",
    explanation:
      "SecurityFilterChainはSpring Securityの中核で、複数のセキュリティフィルター（認証、認可、CSRF保護等）をチェーンとして構成します。リクエストはDispatcherServletに到達する前にこのフィルターチェーンを通過し、セキュリティ処理が適用されます。",
    level: "basics",
    chapter: "ss-basics",
  },
  {
    id: "ss-basics-q02",
    question: "認証（Authentication）と認可（Authorization）の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "認証はアクセス権限の確認、認可はユーザーの身元確認" },
      { label: "B", text: "認証はユーザーの身元確認（本人確認）、認可はリソースへのアクセス権限の確認" },
      { label: "C", text: "認証と認可は同じ意味で使われる" },
      { label: "D", text: "認証はサーバー側、認可はクライアント側で行う" },
    ],
    correctLabel: "B",
    explanation:
      "認証（Authentication）は「あなたは誰ですか？」を確認する処理（ログインなど）で、認可（Authorization）は「あなたにこの操作の権限がありますか？」を確認する処理です。Spring Securityでは認証後にSecurityContextにAuthentication情報が格納され、認可判定に使用されます。",
    level: "basics",
    chapter: "ss-basics",
  },
  {
    id: "ss-basics-q03",
    question: "Spring Security 6でSecurityFilterChainを設定する方法として正しいものはどれですか？",
    code: `@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults());
        return http.build();
    }
}`,
    choices: [
      { label: "A", text: "WebSecurityConfigurerAdapterを継承する（非推奨）" },
      { label: "B", text: "@BeanメソッドでSecurityFilterChainを返し、HttpSecurityをラムダDSLで設定する" },
      { label: "C", text: "XMLでセキュリティ設定を記述する" },
      { label: "D", text: "application.propertiesのみで設定する" },
    ],
    correctLabel: "B",
    explanation:
      "Spring Security 6では、WebSecurityConfigurerAdapterは廃止され、@BeanメソッドでSecurityFilterChainを返す方式が推奨されます。HttpSecurityのラムダDSLを使って、URLごとのアクセス制御、認証方式、CSRF設定などを宣言的に設定します。",
    level: "basics",
    chapter: "ss-basics",
  },
  {
    id: "ss-basics-q04",
    question: "Spring Securityのパスワードハッシュ化で推奨されるPasswordEncoderはどれですか？",
    choices: [
      { label: "A", text: "NoOpPasswordEncoder" },
      { label: "B", text: "MD5PasswordEncoder" },
      { label: "C", text: "BCryptPasswordEncoder" },
      { label: "D", text: "SHA1PasswordEncoder" },
    ],
    correctLabel: "C",
    explanation:
      "BCryptPasswordEncoderが推奨されます。BCryptは適応型ハッシュ関数で、ソルトを自動生成し、コスト係数（ストレッチング回数）を設定可能です。NoOpPasswordEncoderは平文保存でテスト用、MD5やSHA1は高速すぎてブルートフォース攻撃に脆弱です。DelegatingPasswordEncoderで複数方式を共存させることもできます。",
    level: "basics",
    chapter: "ss-basics",
  },
  {
    id: "ss-basics-q05",
    question: "CSRF（Cross-Site Request Forgery）攻撃の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "SQLインジェクション攻撃の一種" },
      { label: "B", text: "認証済みユーザーのセッションを利用して、ユーザーの意図しないリクエストを送信する攻撃" },
      { label: "C", text: "パスワードを総当たりで推測する攻撃" },
      { label: "D", text: "XSS（クロスサイトスクリプティング）と同じ攻撃" },
    ],
    correctLabel: "B",
    explanation:
      "CSRF攻撃は、攻撃者が認証済みユーザーのブラウザを利用して、ユーザーの意図しない操作（送金、設定変更等）を行わせる攻撃です。Spring SecurityはデフォルトでCSRFトークンによる保護を有効にしています。REST API（ステートレス）ではCSRF保護を無効にし、代わりにJWTなどのトークン認証を使用します。",
    level: "basics",
    chapter: "ss-basics",
  },
  // ════════════════════════════════════════
  // auth: JWT認証とOAuth2 5問
  // ════════════════════════════════════════
  {
    id: "ss-auth-q01",
    question: "JWT（JSON Web Token）の構成要素として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ユーザー名とパスワード" },
      { label: "B", text: "Header（ヘッダー）、Payload（ペイロード）、Signature（署名）" },
      { label: "C", text: "公開鍵と秘密鍵" },
      { label: "D", text: "セッションIDとCookie" },
    ],
    correctLabel: "B",
    explanation:
      "JWTはHeader（アルゴリズムとトークンタイプ）、Payload（クレーム：ユーザー情報や有効期限）、Signature（署名：改ざん検知用）の3部分をBase64URLエンコードしてドット（.）で連結した文字列です。ステートレスな認証を実現し、サーバー側でセッション管理が不要になります。",
    level: "auth",
    chapter: "ss-auth",
  },
  {
    id: "ss-auth-q02",
    question: "JWTを使用したREST API認証フローとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "毎回のリクエストでユーザー名とパスワードを送信する" },
      { label: "B", text: "ログイン時にJWTを発行し、以降のリクエストではAuthorizationヘッダーにBearerトークンとして送信する" },
      { label: "C", text: "JWTをURLのクエリパラメータに含める" },
      { label: "D", text: "JWTをリクエストボディに毎回含める" },
    ],
    correctLabel: "B",
    explanation:
      "JWT認証フローでは、1) ログインエンドポイントでユーザー名・パスワードを検証してJWTを発行、2) クライアントがJWTを保存、3) 以降のリクエストでAuthorizationヘッダーに「Bearer <token>」として送信、4) サーバーがJWTを検証して認証します。",
    level: "auth",
    chapter: "ss-auth",
  },
  {
    id: "ss-auth-q03",
    question: "OAuth 2.0の「認可コードフロー」の手順として正しいものはどれですか？",
    choices: [
      { label: "A", text: "クライアントが直接ユーザーのパスワードを受け取ってトークンを取得する" },
      { label: "B", text: "ユーザーが認可サーバーで認証→認可コード取得→認可コードをアクセストークンと交換" },
      { label: "C", text: "クライアントがAPIキーを使って直接アクセスする" },
      { label: "D", text: "ユーザーのCookieを利用して認証する" },
    ],
    correctLabel: "B",
    explanation:
      "認可コードフロー（Authorization Code Flow）は最も安全なOAuth 2.0フローです。1) クライアントがユーザーを認可サーバーにリダイレクト、2) ユーザーがログイン・同意、3) 認可コードがクライアントに返される、4) クライアントが認可コードをバックチャネルでアクセストークンと交換します。",
    level: "auth",
    chapter: "ss-auth",
  },
  {
    id: "ss-auth-q04",
    question: "リフレッシュトークンの目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "アクセストークンの権限を拡大する" },
      { label: "B", text: "有効期限が切れたアクセストークンを、再ログインなしで新しいアクセストークンに更新する" },
      { label: "C", text: "複数のAPIに同時にアクセスする" },
      { label: "D", text: "トークンを暗号化する" },
    ],
    correctLabel: "B",
    explanation:
      "リフレッシュトークンは、アクセストークンの有効期限が切れた際に、ユーザーが再度ログインすることなく新しいアクセストークンを取得するために使用します。アクセストークンの有効期限を短く（例：15分）し、リフレッシュトークンは長期間有効にすることで、セキュリティと利便性を両立します。",
    level: "auth",
    chapter: "ss-auth",
  },
  {
    id: "ss-auth-q05",
    question: "Spring SecurityでOAuth 2.0リソースサーバーを設定する方法として正しいものはどれですか？",
    code: `@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated()
        )
        .oauth2ResourceServer(oauth2 -> oauth2
            .jwt(Customizer.withDefaults())
        );
    return http.build();
}`,
    choices: [
      { label: "A", text: "oauth2ResourceServer()でJWTベースのトークン検証を設定する" },
      { label: "B", text: "セッションベースの認証を設定する" },
      { label: "C", text: "Basic認証を設定する" },
      { label: "D", text: "フォームログインを設定する" },
    ],
    correctLabel: "A",
    explanation:
      "oauth2ResourceServer()でJWTベースのリソースサーバーを設定します。spring.security.oauth2.resourceserver.jwt.issuer-uriを設定すると、認可サーバーの公開鍵を自動取得してJWTの署名検証を行います。JWTのクレームからユーザー情報や権限を抽出し、SecurityContextに格納します。",
    level: "auth",
    chapter: "ss-auth",
  },
  // ════════════════════════════════════════
  // advanced: 高度なセキュリティ設定 5問
  // ════════════════════════════════════════
  {
    id: "ss-advanced-q01",
    question: "Spring Securityのメソッドセキュリティで使用するアノテーションとして正しいものはどれですか？",
    code: `@Service
public class UserService {

    @PreAuthorize("hasRole('ADMIN')")
    public void deleteUser(Long id) {
        // 管理者のみ実行可能
    }

    @PreAuthorize("#userId == authentication.principal.id")
    public User getUser(@Param("userId") Long userId) {
        // 本人のみ取得可能
    }
}`,
    choices: [
      { label: "A", text: "@PreAuthorizeでメソッド実行前にSpEL式で権限チェックを行う" },
      { label: "B", text: "@Transactionalで権限チェックを行う" },
      { label: "C", text: "@Securedでのみ権限チェックが可能" },
      { label: "D", text: "メソッドレベルのセキュリティは実装できない" },
    ],
    correctLabel: "A",
    explanation:
      "@PreAuthorizeはメソッド実行前にSpEL（Spring Expression Language）式で権限チェックを行います。hasRole()、hasAuthority()、メソッド引数の参照（#変数名）、認証情報へのアクセス（authentication.principal）が可能です。@EnableMethodSecurityで有効化します。",
    level: "advanced",
    chapter: "ss-advanced",
  },
  {
    id: "ss-advanced-q02",
    question: "CORSをSpring Securityで設定する際の注意点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "CORSはSpring MVCの設定のみで十分で、SecurityFilterChainでの設定は不要" },
      { label: "B", text: "SecurityFilterChainでcors()を設定しないと、CORSプリフライトリクエストがセキュリティフィルターで拒否される" },
      { label: "C", text: "CORSは自動的に設定されるため、手動設定は不要" },
      { label: "D", text: "CORSはフロントエンド側でのみ設定する" },
    ],
    correctLabel: "B",
    explanation:
      "CORSプリフライトリクエスト（OPTIONSメソッド）は認証情報を含まないため、SecurityFilterChainでcors()を設定しないと401エラーで拒否されます。CorsConfigurationSourceをBeanとして定義し、SecurityFilterChainでcors(Customizer.withDefaults())を設定する必要があります。",
    level: "advanced",
    chapter: "ss-advanced",
  },
  {
    id: "ss-advanced-q03",
    question: "セキュリティヘッダーの設定で正しいものはどれですか？",
    choices: [
      { label: "A", text: "Spring Securityはセキュリティヘッダーを一切設定しない" },
      { label: "B", text: "X-Content-Type-Options、X-Frame-Options、Content-Security-Policyなどを設定してXSSやクリックジャッキングを防ぐ" },
      { label: "C", text: "セキュリティヘッダーはパフォーマンスに影響するため設定しない方が良い" },
      { label: "D", text: "セキュリティヘッダーはNginxでのみ設定可能" },
    ],
    correctLabel: "B",
    explanation:
      "Spring Securityはデフォルトでセキュリティヘッダーを設定します。X-Content-Type-Options: nosniff（MIMEスニッフィング防止）、X-Frame-Options: DENY（クリックジャッキング防止）、Content-Security-Policy（XSS防止）などです。headers()メソッドでカスタマイズ可能です。",
    level: "advanced",
    chapter: "ss-advanced",
  },
  {
    id: "ss-advanced-q04",
    question: "Spring SecurityでカスタムUserDetailsServiceを実装する目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "画面のUIをカスタマイズするため" },
      { label: "B", text: "データベースやLDAPなど独自のデータソースからユーザー情報を読み込んで認証に使用するため" },
      { label: "C", text: "パスワードのハッシュ化方式を変更するため" },
      { label: "D", text: "HTTPSを有効にするため" },
    ],
    correctLabel: "B",
    explanation:
      "UserDetailsServiceインタフェースのloadUserByUsername()メソッドを実装することで、データベース、LDAP、外部APIなど任意のデータソースからユーザー情報を取得し、Spring Securityの認証プロセスで使用できます。UserDetails（ユーザー名、パスワード、権限リスト）を返します。",
    level: "advanced",
    chapter: "ss-advanced",
  },
  {
    id: "ss-advanced-q05",
    question: "REST APIのセキュリティにおけるベストプラクティスとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "すべてのエンドポイントを認証なしで公開する" },
      { label: "B", text: "HTTPS通信、JWT認証、入力バリデーション、レート制限、最小権限の原則を組み合わせる" },
      { label: "C", text: "セキュリティはフロントエンドのみで実装する" },
      { label: "D", text: "パスワードを平文で保存し高速なログインを実現する" },
    ],
    correctLabel: "B",
    explanation:
      "REST APIのセキュリティは多層防御が重要です。HTTPS（通信の暗号化）、JWT/OAuth2（認証・認可）、入力バリデーション（インジェクション防止）、レート制限（DoS防止）、最小権限の原則（必要最低限の権限付与）を組み合わせます。セキュリティは常にサーバー側で実装する必要があります。",
    level: "advanced",
    chapter: "ss-advanced",
  },
];

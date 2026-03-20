export type SpringBootLevel = "core" | "web" | "data" | "security" | "cloud";

export interface SpringBootQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: SpringBootLevel;
  chapter: string;
}

export const springBootQuizQuestions: SpringBootQuizQuestion[] = [
  // ════════════════════════════════════════
  // core: DI・自動設定 (di-autoconfig) 3問
  // ════════════════════════════════════════
  {
    id: "di-autoconfig-q01",
    question: "Spring Bootで@Autowiredを使わずにDIを行う推奨方法はどれですか？",
    choices: [
      { label: "A", text: "フィールドインジェクション" },
      { label: "B", text: "setterインジェクション" },
      { label: "C", text: "コンストラクタインジェクション" },
      { label: "D", text: "staticメソッドによる取得" },
    ],
    correctLabel: "C",
    explanation:
      "Spring公式ドキュメントではコンストラクタインジェクションを推奨しています。コンストラクタが1つだけの場合は@Autowiredの記述も不要です。フィールドインジェクションはテスタビリティが低く、不変性も保証できないため非推奨とされています。",
    level: "core",
    chapter: "di-autoconfig",
  },
  {
    id: "di-autoconfig-q02",
    question: "Spring Bootの自動設定（Auto Configuration）を無効化する方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})" },
      { label: "B", text: "@DisableAutoConfiguration(DataSource.class)" },
      { label: "C", text: "application.propertiesでautoconfig.enabled=falseを設定" },
      { label: "D", text: "@ComponentScan(excludeAutoConfig = true)" },
    ],
    correctLabel: "A",
    explanation:
      "@SpringBootApplicationアノテーションのexclude属性で特定の自動設定クラスを除外できます。例えばデータベースを使わないプロジェクトでDataSourceAutoConfigurationを除外するケースが一般的です。",
    code: "@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})\npublic class MyApp { }",
    level: "core",
    chapter: "di-autoconfig",
  },
  {
    id: "di-autoconfig-q03",
    question: "@Componentと@Beanの違いについて正しい説明はどれですか？",
    choices: [
      { label: "A", text: "どちらも全く同じ動作をする" },
      { label: "B", text: "@Componentはクラスに付与、@Beanは@Configurationクラス内のメソッドに付与する" },
      { label: "C", text: "@Beanはクラスに付与、@Componentはメソッドに付与する" },
      { label: "D", text: "@Componentはプロトタイプスコープ専用である" },
    ],
    correctLabel: "B",
    explanation:
      "@Componentはクラスレベルのアノテーションでコンポーネントスキャンにより自動検出されます。@Beanは@Configurationクラス内のメソッドに付与し、メソッドの戻り値をBeanとして登録します。サードパーティライブラリのクラスをBean化する際は@Beanを使います。",
    level: "core",
    chapter: "di-autoconfig",
  },
  // ════════════════════════════════════════
  // web: REST API開発 (rest-api) 3問
  // ════════════════════════════════════════
  {
    id: "rest-api-q01",
    question: "次のSpring Boot REST Controllerのコードで、POSTリクエストのJSONボディを受け取るために空欄に入るアノテーションはどれですか？",
    choices: [
      { label: "A", text: "@RequestParam" },
      { label: "B", text: "@PathVariable" },
      { label: "C", text: "@RequestBody" },
      { label: "D", text: "@ModelAttribute" },
    ],
    correctLabel: "C",
    explanation:
      "@RequestBodyはHTTPリクエストのボディをJavaオブジェクトにデシリアライズするために使います。@RequestParamはクエリパラメータ、@PathVariableはURL中のパス変数、@ModelAttributeはフォームデータのバインドに使用します。",
    code: "@PostMapping(\"/users\")\npublic ResponseEntity<User> create(_____ User user) {\n    return ResponseEntity.status(201).body(service.save(user));\n}",
    level: "web",
    chapter: "rest-api",
  },
  {
    id: "rest-api-q02",
    question: "Spring BootでREST APIのバリデーションを行う際、正しい組み合わせはどれですか？",
    choices: [
      { label: "A", text: "@Valid + @NotNullなどのBean Validationアノテーション" },
      { label: "B", text: "@Validate + @Requiredアノテーション" },
      { label: "C", text: "@Check + @NotEmptyアノテーション" },
      { label: "D", text: "手動でif文によるチェックのみ" },
    ],
    correctLabel: "A",
    explanation:
      "Spring BootではBean Validation（Jakarta Validation）を使い、DTOのフィールドに@NotNull, @Size, @Emailなどを付与し、Controller引数に@Validを付けてバリデーションを有効にします。spring-boot-starter-validationの依存関係が必要です。",
    level: "web",
    chapter: "rest-api",
  },
  {
    id: "rest-api-q03",
    question: "@RestControllerと@Controllerの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "@RestControllerはビューテンプレートを返す" },
      { label: "B", text: "@RestControllerは@Controller + @ResponseBodyを組み合わせたもの" },
      { label: "C", text: "@Controllerは JSON のみ返す" },
      { label: "D", text: "両者に機能的な違いはない" },
    ],
    correctLabel: "B",
    explanation:
      "@RestControllerは@Controllerと@ResponseBodyを合わせたアノテーションです。全メソッドの戻り値が自動的にHTTPレスポンスボディとして書き出されます。@Controllerの場合は各メソッドに@ResponseBodyを個別に付ける必要があります。",
    level: "web",
    chapter: "rest-api",
  },
  // ════════════════════════════════════════
  // data: Spring Data JPA (spring-data) 3問
  // ════════════════════════════════════════
  {
    id: "spring-data-q01",
    question: "Spring Data JPAのリポジトリインターフェースでメソッド名から自動生成されるクエリとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "findByNameAndAge → WHERE name = ? AND age = ?" },
      { label: "B", text: "findByNameAndAge → WHERE name = ? OR age = ?" },
      { label: "C", text: "findByNameAndAge → WHERE name LIKE ? AND age LIKE ?" },
      { label: "D", text: "findByNameAndAge → WHERE name IN (?) AND age IN (?)" },
    ],
    correctLabel: "A",
    explanation:
      "Spring Data JPAのクエリメソッドは命名規則に基づきクエリを自動生成します。Andは AND条件、Orは OR条件に変換されます。findByNameAndAgeは「WHERE name = ? AND age = ?」となります。",
    level: "data",
    chapter: "spring-data",
  },
  {
    id: "spring-data-q02",
    question: "Spring Data JPAでページネーションを実装する際に使用するインターフェースはどれですか？",
    choices: [
      { label: "A", text: "CrudRepository" },
      { label: "B", text: "JpaRepository" },
      { label: "C", text: "SimpleRepository" },
      { label: "D", text: "BaseRepository" },
    ],
    correctLabel: "B",
    explanation:
      "JpaRepositoryはPagingAndSortingRepositoryを継承しており、Pageableを引数に取るメソッドでページネーションを簡単に実装できます。CrudRepositoryは基本的なCRUD操作のみ提供し、ページネーションのサポートはありません。",
    code: "public interface UserRepository extends JpaRepository<User, Long> {\n    Page<User> findByStatus(String status, Pageable pageable);\n}",
    level: "data",
    chapter: "spring-data",
  },
  {
    id: "spring-data-q03",
    question: "Spring Bootでトランザクション管理を行うアノテーションはどれですか？",
    choices: [
      { label: "A", text: "@Transaction" },
      { label: "B", text: "@Transactional" },
      { label: "C", text: "@EnableTransaction" },
      { label: "D", text: "@TransactionScope" },
    ],
    correctLabel: "B",
    explanation:
      "@Transactionalをサービスクラスやメソッドに付与することでトランザクション管理が有効になります。デフォルトではRuntimeExceptionでロールバックされます。クラスに付与すると全publicメソッドに適用されます。",
    level: "data",
    chapter: "spring-data",
  },
  // ════════════════════════════════════════
  // security: Spring Security (spring-security) 3問
  // ════════════════════════════════════════
  {
    id: "spring-security-q01",
    question: "Spring Securityでパスワードを安全に保存するために推奨されるクラスはどれですか？",
    choices: [
      { label: "A", text: "MD5PasswordEncoder" },
      { label: "B", text: "PlainTextPasswordEncoder" },
      { label: "C", text: "BCryptPasswordEncoder" },
      { label: "D", text: "SHA1PasswordEncoder" },
    ],
    correctLabel: "C",
    explanation:
      "BCryptPasswordEncoderはBCryptハッシュ関数を使用し、ソルトの自動生成やコストファクターの調整が可能です。MD5やSHA1は脆弱性が知られており、パスワードハッシュには不適切です。Spring Security 5以降はDelegatingPasswordEncoderがデフォルトですが、内部的にBCryptを推奨しています。",
    level: "security",
    chapter: "spring-security",
  },
  {
    id: "spring-security-q02",
    question: "Spring Security 6でHTTPセキュリティを設定する正しい方法はどれですか？",
    choices: [
      { label: "A", text: "WebSecurityConfigurerAdapterを継承する" },
      { label: "B", text: "SecurityFilterChainをBean登録する" },
      { label: "C", text: "security.xmlに設定を記述する" },
      { label: "D", text: "@EnableGlobalSecurityアノテーションを付ける" },
    ],
    correctLabel: "B",
    explanation:
      "Spring Security 5.7以降、WebSecurityConfigurerAdapterは非推奨となり、SecurityFilterChainをBeanとして定義する方式が推奨されています。これによりコンポーネントベースの設定が可能になり、複数のSecurityFilterChainを定義できます。",
    code: "@Bean\npublic SecurityFilterChain filterChain(HttpSecurity http) throws Exception {\n    http.authorizeHttpRequests(auth -> auth\n        .requestMatchers(\"/api/public/**\").permitAll()\n        .anyRequest().authenticated());\n    return http.build();\n}",
    level: "security",
    chapter: "spring-security",
  },
  {
    id: "spring-security-q03",
    question: "Spring SecurityでCSRF保護を無効化すべき場面として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "すべてのWebアプリケーション" },
      { label: "B", text: "ステートレスなREST API（JWT認証使用）" },
      { label: "C", text: "ログイン画面がある場合" },
      { label: "D", text: "セッションベースの認証を使う場合" },
    ],
    correctLabel: "B",
    explanation:
      "CSRF保護はセッションベースの認証で重要ですが、ステートレスなREST APIでJWT等のトークン認証を使う場合はCSRFトークンが不要です。ブラウザのCookieベースのセッション管理を行わないため、CSRF攻撃のリスクがありません。",
    level: "security",
    chapter: "spring-security",
  },
  // ════════════════════════════════════════
  // cloud: Spring Cloud・本番運用 (spring-cloud) 3問
  // ════════════════════════════════════════
  {
    id: "spring-cloud-q01",
    question: "Spring Boot Actuatorの/actuator/healthエンドポイントが返すステータスとして存在しないものはどれですか？",
    choices: [
      { label: "A", text: "UP" },
      { label: "B", text: "DOWN" },
      { label: "C", text: "UNKNOWN" },
      { label: "D", text: "RUNNING" },
    ],
    correctLabel: "D",
    explanation:
      "Spring Boot Actuatorのヘルスチェックが返すステータスはUP、DOWN、OUT_OF_SERVICE、UNKNOWNの4種類です。RUNNINGというステータスは標準では存在しません。カスタムHealthIndicatorで独自のステータスを追加することは可能です。",
    level: "cloud",
    chapter: "spring-cloud",
  },
  {
    id: "spring-cloud-q02",
    question: "Spring Bootアプリケーションのプロファイルを切り替える方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "spring.profiles.active=prodを環境変数やプロパティで設定" },
      { label: "B", text: "spring.env=productionを設定" },
      { label: "C", text: "@Profile(\"prod\")をmainメソッドに付与" },
      { label: "D", text: "pom.xmlにprofile=prodを記述" },
    ],
    correctLabel: "A",
    explanation:
      "spring.profiles.activeプロパティでアクティブなプロファイルを指定できます。application-prod.ymlなどプロファイル固有の設定ファイルが読み込まれます。環境変数SPRING_PROFILES_ACTIVEやコマンドライン引数--spring.profiles.active=prodでも設定できます。",
    level: "cloud",
    chapter: "spring-cloud",
  },
  {
    id: "spring-cloud-q03",
    question: "マイクロサービス間通信でSpring Bootが推奨するHTTPクライアントはどれですか（Spring Boot 3.2以降）？",
    choices: [
      { label: "A", text: "RestTemplate" },
      { label: "B", text: "HttpURLConnection" },
      { label: "C", text: "RestClient または WebClient" },
      { label: "D", text: "Apache HttpClient直接使用" },
    ],
    correctLabel: "C",
    explanation:
      "Spring Boot 3.2以降ではRestClientが新しく導入され、同期通信での推奨HTTPクライアントとなっています。リアクティブな非同期通信にはWebClientが推奨されます。RestTemplateはメンテナンスモードとなり、新規開発では推奨されません。",
    level: "cloud",
    chapter: "spring-cloud",
  },
];

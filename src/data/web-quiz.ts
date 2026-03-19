export type WebLevel = "foundation" | "servlet" | "spring" | "data" | "security" | "api" | "testing" | "deploy" | "tomcat";

export interface WebQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: WebLevel;
  chapter: string;
}

export const webQuizQuestions: WebQuizQuestion[] = [
  // ════════════════════════════════════════
  // foundation: HTTP の基礎 (http-basics) 4問
  // ════════════════════════════════════════
  {
    id: "http-basics-q01",
    question: "HTTPステータスコード 201 が示す意味として正しいものはどれですか？",
    choices: [
      { label: "A", text: "リクエスト成功（一般）" },
      { label: "B", text: "リソースが新規作成された" },
      { label: "C", text: "リダイレクト" },
      { label: "D", text: "認証が必要" },
    ],
    correctLabel: "B",
    explanation:
      "201 Created はリクエストが成功し、新しいリソースが作成されたことを示します。REST APIでPOSTリクエストによるリソース作成成功時に返すのが一般的です。200は一般的な成功、301/302はリダイレクト、401は認証が必要であることを示します。",
    level: "foundation",
    chapter: "http-basics",
  },
  {
    id: "http-basics-q02",
    question: "冪等性（べきとうせい）を持つHTTPメソッドの組み合わせとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "GET, POST, PUT" },
      { label: "B", text: "GET, PUT, DELETE" },
      { label: "C", text: "POST, PUT, PATCH" },
      { label: "D", text: "GET, POST, DELETE" },
    ],
    correctLabel: "B",
    explanation:
      "冪等性とは同じリクエストを何度送っても結果が同じになる性質です。GET（取得）、PUT（全更新）、DELETE（削除）は冪等です。POSTは新規リソースを作成するため、実行するたびに新しいリソースが生成され、冪等ではありません。",
    level: "foundation",
    chapter: "http-basics",
  },
  {
    id: "http-basics-q03",
    question: "Content-Type ヘッダーに application/json を指定する場面として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "HTMLフォームの送信" },
      { label: "B", text: "ファイルのアップロード" },
      { label: "C", text: "REST APIでJSONデータを送受信する" },
      { label: "D", text: "静的なCSSファイルの配信" },
    ],
    correctLabel: "C",
    explanation:
      "application/json はJSON形式のデータを示すMIMEタイプです。REST APIでJSONデータをやり取りする際に使用します。HTMLフォームは application/x-www-form-urlencoded、ファイルアップロードは multipart/form-data、CSSは text/css が適切です。",
    level: "foundation",
    chapter: "http-basics",
  },
  // ════════════════════════════════════════
  // foundation: Java Webアプリのアーキテクチャ (web-architecture) 3問
  // ════════════════════════════════════════
  {
    id: "web-architecture-q01",
    question: "MVCパターンにおいて、ビジネスロジックを担当するコンポーネントはどれですか？",
    choices: [
      { label: "A", text: "Model" },
      { label: "B", text: "View" },
      { label: "C", text: "Controller" },
      { label: "D", text: "Router" },
    ],
    correctLabel: "A",
    explanation:
      "MVCパターンではModelがビジネスロジックとデータの管理を担当します。ViewはUIの表示、Controllerはユーザーの入力を受け取りModelとViewを仲介します。Routerはリクエストのルーティングを行う仕組みでMVCの基本構成要素ではありません。",
    level: "foundation",
    chapter: "web-architecture",
  },
  {
    id: "web-architecture-q02",
    question: "レイヤードアーキテクチャで、Controller → Service → Repository の依存関係が推奨される理由は何ですか？",
    choices: [
      { label: "A", text: "パフォーマンスが向上するため" },
      { label: "B", text: "各層の責務を分離し、変更の影響範囲を限定するため" },
      { label: "C", text: "コード量を減らすため" },
      { label: "D", text: "データベースへの接続が高速になるため" },
    ],
    correctLabel: "B",
    explanation:
      "レイヤードアーキテクチャでは各層が明確な責務を持ち、上位層から下位層への一方向の依存関係を保つことで、変更が他の層に影響しにくくなります。テストやリファクタリングが容易になり、保守性が高まります。",
    level: "foundation",
    chapter: "web-architecture",
  },
  {
    id: "web-architecture-q03",
    question: "DIコンテナがJava Webアプリケーションで果たす主な役割はどれですか？",
    choices: [
      { label: "A", text: "HTMLテンプレートのレンダリング" },
      { label: "B", text: "オブジェクトの生成と依存関係の注入を管理する" },
      { label: "C", text: "データベースのマイグレーション" },
      { label: "D", text: "HTTPリクエストの暗号化" },
    ],
    correctLabel: "B",
    explanation:
      "DI（Dependency Injection）コンテナは、オブジェクトのライフサイクル管理と依存関係の自動注入を行います。SpringのApplicationContextがその代表例で、@Autowiredなどでコンポーネント間の依存を解決します。",
    level: "foundation",
    chapter: "web-architecture",
  },
  // ════════════════════════════════════════
  // servlet: Servlet (servlet) 3問
  // ════════════════════════════════════════
  {
    id: "servlet-q01",
    question: "HttpServletでGETリクエストを処理するためにオーバーライドするメソッドはどれですか？",
    choices: [
      { label: "A", text: "doGet()" },
      { label: "B", text: "service()" },
      { label: "C", text: "handleGet()" },
      { label: "D", text: "processRequest()" },
    ],
    correctLabel: "A",
    explanation:
      "HttpServletクラスではHTTPメソッドに対応するdoGet()、doPost()、doPut()、doDelete()等のメソッドをオーバーライドしてリクエストを処理します。service()メソッドが内部でHTTPメソッドに応じて各doXxx()を呼び出します。",
    code: `@WebServlet("/hello")
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req,
                         HttpServletResponse resp)
            throws ServletException, IOException {
        resp.setContentType("text/html; charset=UTF-8");
        resp.getWriter().println("<h1>Hello</h1>");
    }
}`,
    level: "servlet",
    chapter: "servlet",
  },
  {
    id: "servlet-q02",
    question: "Servletフィルターの主な用途として適切でないものはどれですか？",
    choices: [
      { label: "A", text: "リクエストのログ記録" },
      { label: "B", text: "認証チェック" },
      { label: "C", text: "データベーステーブルの作成" },
      { label: "D", text: "文字エンコーディングの設定" },
    ],
    correctLabel: "C",
    explanation:
      "Servletフィルター（Filter）はリクエスト/レスポンスの前処理・後処理に使われます。ログ記録、認証チェック、文字エンコーディング設定、CORS設定などが典型的な用途です。データベーステーブルの作成はフィルターの責務ではありません。",
    level: "servlet",
    chapter: "servlet",
  },
  {
    id: "servlet-q03",
    question: "HttpSessionを使ったセッション管理で、セッションIDをクライアントに保存する仕組みとして一般的なものはどれですか？",
    choices: [
      { label: "A", text: "URLのクエリパラメータ" },
      { label: "B", text: "HTTPヘッダーのAuthorization" },
      { label: "C", text: "Cookie（JSESSIONID）" },
      { label: "D", text: "HTMLのhidden属性" },
    ],
    correctLabel: "C",
    explanation:
      "JavaのServletコンテナは通常、JSESSIONIDという名前のCookieでセッションIDをクライアントに保持します。サーバー側でHttpSessionオブジェクトとセッションIDを紐づけて状態を管理します。URLリライティングも代替手段ですが、Cookieが一般的です。",
    level: "servlet",
    chapter: "servlet",
  },
  // ════════════════════════════════════════
  // servlet: JSP と Thymeleaf (jsp-thymeleaf) 3問
  // ════════════════════════════════════════
  {
    id: "jsp-thymeleaf-q01",
    question: "Thymeleafテンプレートでモデルの値を表示する構文として正しいものはどれですか？",
    choices: [
      { label: "A", text: "<%= model.name %>" },
      { label: "B", text: "{{name}}" },
      { label: "C", text: 'th:text="${name}"' },
      { label: "D", text: "${name}" },
    ],
    correctLabel: "C",
    explanation:
      'Thymeleafではth:text="${変数名}"の形式でモデルの値を出力します。<%= %>はJSPの式、{{ }}はVue.jsなどのフロントエンドフレームワークの構文です。ThymeleafはHTMLの属性として記述するためNatural Templatingが可能です。',
    code: `<!-- Thymeleafの例 -->
<p th:text="\${userName}">デフォルト値</p>

<!-- 繰り返し -->
<tr th:each="item : \${items}">
    <td th:text="\${item.name}">名前</td>
</tr>`,
    level: "servlet",
    chapter: "jsp-thymeleaf",
  },
  {
    id: "jsp-thymeleaf-q02",
    question: "JSPとThymeleafの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "JSPはサーバーサイドで処理されるが、Thymeleafはクライアントサイドで処理される" },
      { label: "B", text: "ThymeleafのテンプレートはServletコンテナなしでもブラウザで表示できる" },
      { label: "C", text: "JSPはSpring Bootで推奨されている" },
      { label: "D", text: "ThymeleafではJavaコードを直接埋め込める" },
    ],
    correctLabel: "B",
    explanation:
      "ThymeleafはNatural Templating機能により、テンプレートファイルをそのままブラウザで開いても表示できます。JSPはServletに変換されて実行されるため単独では表示できません。Spring BootではThymeleafが推奨され、JARパッケージングでの動作もサポートされています。",
    level: "servlet",
    chapter: "jsp-thymeleaf",
  },
  {
    id: "jsp-thymeleaf-q03",
    question: "JSPでスクリプトレットの使用が推奨されない理由として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "パフォーマンスが低いため" },
      { label: "B", text: "ビューにロジックが混在し、保守性が低下するため" },
      { label: "C", text: "最新のブラウザでサポートされないため" },
      { label: "D", text: "セキュリティ上の脆弱性があるため" },
    ],
    correctLabel: "B",
    explanation:
      "スクリプトレット（<% ... %>）はJSPにJavaコードを直接埋め込むため、プレゼンテーション層とビジネスロジックが混在します。JSTL・ELやThymeleafを使い、ロジックはControllerやServiceに分離することが推奨されます。",
    level: "servlet",
    chapter: "jsp-thymeleaf",
  },
  // ════════════════════════════════════════
  // spring: Spring Boot 入門 (spring-boot-intro) 3問
  // ════════════════════════════════════════
  {
    id: "spring-boot-intro-q01",
    question: "@SpringBootApplication アノテーションに含まれるアノテーションの組み合わせとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "@Configuration, @ComponentScan, @EnableAutoConfiguration" },
      { label: "B", text: "@Component, @Autowired, @Bean" },
      { label: "C", text: "@RestController, @RequestMapping, @Service" },
      { label: "D", text: "@Entity, @Repository, @Transactional" },
    ],
    correctLabel: "A",
    explanation:
      "@SpringBootApplicationは@Configuration（設定クラス）、@ComponentScan（コンポーネントスキャン）、@EnableAutoConfiguration（自動設定）の3つを組み合わせた複合アノテーションです。これ1つで基本的な設定が完了します。",
    level: "spring",
    chapter: "spring-boot-intro",
  },
  {
    id: "spring-boot-intro-q02",
    question: "Spring Bootのapplication.ymlでサーバーポートを変更する設定として正しいものはどれですか？",
    choices: [
      { label: "A", text: "app.port: 9090" },
      { label: "B", text: "server.port: 9090" },
      { label: "C", text: "spring.server.port: 9090" },
      { label: "D", text: "http.port: 9090" },
    ],
    correctLabel: "B",
    explanation:
      "Spring Bootではserver.portプロパティでサーバーのポート番号を変更できます。デフォルトは8080です。application.ymlまたはapplication.propertiesで設定でき、環境変数SERVER_PORTでも上書き可能です。",
    level: "spring",
    chapter: "spring-boot-intro",
  },
  {
    id: "spring-boot-intro-q03",
    question: "SpringのDIで、コンストラクタインジェクションが推奨される理由として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "コード量が最も少ないため" },
      { label: "B", text: "依存関係をfinalフィールドにでき、不変性とテスト容易性が保たれるため" },
      { label: "C", text: "実行速度が最も速いため" },
      { label: "D", text: "循環依存を自動で解決するため" },
    ],
    correctLabel: "B",
    explanation:
      "コンストラクタインジェクションでは依存フィールドをfinalにでき、オブジェクト生成後に変更できない不変性が保証されます。またnullにならないことが保証され、テスト時にモックを渡しやすくなります。循環依存はむしろ検出して設計の問題を早期に発見できます。",
    level: "spring",
    chapter: "spring-boot-intro",
  },
  // ════════════════════════════════════════
  // spring: Spring Web MVC (spring-web-mvc) 3問
  // ════════════════════════════════════════
  {
    id: "spring-web-mvc-q01",
    question: "次のコードで @PathVariable が取得する値として正しいものはどれですか？（リクエスト: GET /users/42）",
    choices: [
      { label: "A", text: "null" },
      { label: "B", text: "\"users\"" },
      { label: "C", text: "42L" },
      { label: "D", text: "\"42\"" },
    ],
    correctLabel: "C",
    explanation:
      "@PathVariableはURLパスの一部を変数として取得します。{id}の部分が42に対応し、メソッド引数のLong型に自動変換されるため42L（Long値）が取得されます。型変換はSpringのConversionServiceが行います。",
    code: `@GetMapping("/users/{id}")
public ResponseEntity<User> getUser(@PathVariable Long id) {
    return ResponseEntity.ok(userService.findById(id));
}`,
    level: "spring",
    chapter: "spring-web-mvc",
  },
  {
    id: "spring-web-mvc-q02",
    question: "Spring MVCのバリデーションで、文字列が空でないことを検証するアノテーションはどれですか？",
    choices: [
      { label: "A", text: "@Required" },
      { label: "B", text: "@NotBlank" },
      { label: "C", text: "@NonNull" },
      { label: "D", text: "@Valid" },
    ],
    correctLabel: "B",
    explanation:
      "@NotBlankはnullでなく、空文字でなく、空白のみでもないことを検証します。@NotNullはnullでないことのみ検証、@NotEmptyはnullと空文字を検証します。@Validはバリデーション実行を指示するアノテーションで、個々のルールではありません。",
    level: "spring",
    chapter: "spring-web-mvc",
  },
  {
    id: "spring-web-mvc-q03",
    question: "@ControllerAdvice と @ExceptionHandler を使う主な目的は何ですか？",
    choices: [
      { label: "A", text: "DIコンテナの設定を行う" },
      { label: "B", text: "アプリケーション全体の例外を一元的にハンドリングする" },
      { label: "C", text: "データベーストランザクションを管理する" },
      { label: "D", text: "リクエストのルーティングを制御する" },
    ],
    correctLabel: "B",
    explanation:
      "@ControllerAdviceはグローバルな例外ハンドラーを定義するためのアノテーションです。@ExceptionHandlerと組み合わせることで、特定の例外に対する統一的なレスポンス（エラーJSON等）を返せます。各Controllerに個別にtry-catchを書く必要がなくなります。",
    level: "spring",
    chapter: "spring-web-mvc",
  },
  // ════════════════════════════════════════
  // data: JDBC (jdbc) 2問
  // ════════════════════════════════════════
  {
    id: "jdbc-q01",
    question: "JDBCでSQLインジェクションを防ぐために使用すべきものはどれですか？",
    choices: [
      { label: "A", text: "Statement" },
      { label: "B", text: "PreparedStatement" },
      { label: "C", text: "CallableStatement" },
      { label: "D", text: "StringBuilder" },
    ],
    correctLabel: "B",
    explanation:
      "PreparedStatementはSQL文をプリコンパイルし、パラメータをバインド変数（?）で指定するため、ユーザー入力がSQL文として解釈されることを防ぎます。Statementで文字列結合するとSQLインジェクションの脆弱性が生じます。",
    code: `// 危険: SQLインジェクションの脆弱性あり
String sql = "SELECT * FROM users WHERE name = '" + input + "'";
Statement stmt = conn.createStatement();

// 安全: PreparedStatement
String sql = "SELECT * FROM users WHERE name = ?";
PreparedStatement ps = conn.prepareStatement(sql);
ps.setString(1, input);`,
    level: "data",
    chapter: "jdbc",
  },
  {
    id: "jdbc-q02",
    question: "JDBCのConnectionオブジェクトを適切に管理する方法として最も推奨されるものはどれですか？",
    choices: [
      { label: "A", text: "グローバル変数で1つのConnectionを共有する" },
      { label: "B", text: "try-with-resourcesで使用後に自動クローズする" },
      { label: "C", text: "finallyブロックは不要で、GCに任せる" },
      { label: "D", text: "アプリケーション終了時にまとめてクローズする" },
    ],
    correctLabel: "B",
    explanation:
      "JDBCのConnection、PreparedStatement、ResultSetはAutoCloseableを実装しているため、try-with-resources文で自動クローズするのが推奨されます。リソースリークを防ぎ、コネクションプールへの返却も確実に行われます。",
    level: "data",
    chapter: "jdbc",
  },
  // ════════════════════════════════════════
  // data: Spring Data JPA (spring-data-jpa) 2問
  // ════════════════════════════════════════
  {
    id: "spring-data-jpa-q01",
    question: "Spring Data JPAのリポジトリインターフェースで、メソッド名から自動でクエリが生成される機能の名称はどれですか？",
    choices: [
      { label: "A", text: "Named Query" },
      { label: "B", text: "Query DSL" },
      { label: "C", text: "Derived Query（クエリメソッド）" },
      { label: "D", text: "Native Query" },
    ],
    correctLabel: "C",
    explanation:
      "Spring Data JPAのDerived Queryは、findByNameAndAge のようにメソッド名のルールに従うだけで自動的にJPQLクエリが生成される機能です。Named Queryは事前定義クエリ、Native Queryは生SQLを使う方法です。",
    code: `public interface UserRepository extends JpaRepository<User, Long> {
    // メソッド名からSELECT ... WHERE name = ? AND age > ? が自動生成
    List<User> findByNameAndAgeGreaterThan(String name, int age);

    // @Query で明示的に指定も可能
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);
}`,
    level: "data",
    chapter: "spring-data-jpa",
  },
  {
    id: "spring-data-jpa-q02",
    question: "JPAのN+1問題を解決する方法として適切なものはどれですか？",
    choices: [
      { label: "A", text: "LazyLoadingを無効にしてEagerLoadingに変更する" },
      { label: "B", text: "JOIN FETCHを使ったJPQLクエリを記述する" },
      { label: "C", text: "キャッシュをすべて無効にする" },
      { label: "D", text: "トランザクションを使わないようにする" },
    ],
    correctLabel: "B",
    explanation:
      "N+1問題は、関連エンティティを取得する際に1件ずつクエリが発行される問題です。JOIN FETCHを使えば1回のクエリで関連データを一括取得できます。単純にEagerLoadingにしても別のSELECTが発行される場合があり根本解決になりません。",
    level: "data",
    chapter: "spring-data-jpa",
  },
  // ════════════════════════════════════════
  // security: Spring Security (spring-security) 3問
  // ════════════════════════════════════════
  {
    id: "spring-security-q01",
    question: "Spring SecurityのSecurityFilterChainで、特定のパスへのアクセスを認証なしで許可する設定はどれですか？",
    choices: [
      { label: "A", text: "requestMatchers(\"/public/**\").authenticated()" },
      { label: "B", text: "requestMatchers(\"/public/**\").permitAll()" },
      { label: "C", text: "requestMatchers(\"/public/**\").anonymous()" },
      { label: "D", text: "requestMatchers(\"/public/**\").denyAll()" },
    ],
    correctLabel: "B",
    explanation:
      "permitAll()は認証の有無にかかわらず全てのユーザーにアクセスを許可します。authenticated()は認証済みユーザーのみ、anonymous()は匿名ユーザーのみ、denyAll()は全てのアクセスを拒否します。",
    code: `@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.authorizeHttpRequests(auth -> auth
        .requestMatchers("/public/**", "/login").permitAll()
        .requestMatchers("/admin/**").hasRole("ADMIN")
        .anyRequest().authenticated()
    );
    return http.build();
}`,
    level: "security",
    chapter: "spring-security",
  },
  {
    id: "spring-security-q02",
    question: "Spring Securityでパスワードを安全に保存するために推奨されるエンコーダーはどれですか？",
    choices: [
      { label: "A", text: "NoOpPasswordEncoder" },
      { label: "B", text: "MD5PasswordEncoder" },
      { label: "C", text: "BCryptPasswordEncoder" },
      { label: "D", text: "Base64PasswordEncoder" },
    ],
    correctLabel: "C",
    explanation:
      "BCryptPasswordEncoderはソルト付きのBCryptハッシュを使用し、計算コストを調整できるためパスワード保存に最適です。NoOpPasswordEncoderは平文保存で危険、MD5は脆弱、Base64はエンコーディングであり暗号学的ハッシュではありません。",
    level: "security",
    chapter: "spring-security",
  },
  {
    id: "spring-security-q03",
    question: "Spring SecurityのCSRF保護はどのような場合に無効化を検討してもよいですか？",
    choices: [
      { label: "A", text: "全てのWebアプリケーション" },
      { label: "B", text: "ステートレスなREST API（JWTトークン認証使用時）" },
      { label: "C", text: "HTMLフォームを使うアプリケーション" },
      { label: "D", text: "セッションベースの認証を使うアプリケーション" },
    ],
    correctLabel: "B",
    explanation:
      "CSRFトークンはブラウザのCookieベースのセッション認証で必要です。JWTなどのトークンをAuthorizationヘッダーで送信するステートレスREST APIでは、ブラウザが自動でクレデンシャルを送信しないためCSRF攻撃のリスクが低く、無効化を検討できます。",
    level: "security",
    chapter: "spring-security",
  },
  // ════════════════════════════════════════
  // api: RESTful API 設計 (rest-api) 3問
  // ════════════════════════════════════════
  {
    id: "rest-api-q01",
    question: "RESTful APIのURL設計として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "GET /getUser?id=1" },
      { label: "B", text: "POST /deleteUser/1" },
      { label: "C", text: "GET /users/1" },
      { label: "D", text: "GET /user/get/1" },
    ],
    correctLabel: "C",
    explanation:
      "RESTful APIではリソースを名詞の複数形で表現し、HTTPメソッドで操作を表します。GET /users/1 は「usersリソースのID=1を取得」を意味します。動詞をURLに含めるのは非RESTful的です。",
    level: "api",
    chapter: "rest-api",
  },
  {
    id: "rest-api-q02",
    question: "REST APIでリソースの一覧取得時にページングを実装する際、一般的に使われるパラメータの組み合わせはどれですか？",
    choices: [
      { label: "A", text: "start と end" },
      { label: "B", text: "page と size" },
      { label: "C", text: "from と to" },
      { label: "D", text: "offset と count" },
    ],
    correctLabel: "B",
    explanation:
      "Spring Data JPAのPageableではpage（ページ番号）とsize（1ページあたりの件数）が標準パラメータです。GET /users?page=0&size=20 のように使用します。sortパラメータで並び順も指定できます。",
    code: `@GetMapping("/users")
public Page<UserDto> getUsers(
        @PageableDefault(size = 20, sort = "id") Pageable pageable) {
    return userService.findAll(pageable);
}
// GET /users?page=0&size=20&sort=name,asc`,
    level: "api",
    chapter: "rest-api",
  },
  {
    id: "rest-api-q03",
    question: "@RestController と @Controller の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "@RestControllerはJSONのみ返せるが、@Controllerは何でも返せる" },
      { label: "B", text: "@RestControllerは全メソッドに@ResponseBodyが付与された状態と同等" },
      { label: "C", text: "@RestControllerはSpring Boot専用で、@Controllerは従来のSpring用" },
      { label: "D", text: "@RestControllerはGETリクエストのみ処理できる" },
    ],
    correctLabel: "B",
    explanation:
      "@RestControllerは@Controllerと@ResponseBodyを組み合わせたアノテーションです。メソッドの戻り値が自動的にHTTPレスポンスのボディに書き込まれ、デフォルトでJSON形式に変換されます。@Controllerではビュー名を返しテンプレートが使われます。",
    level: "api",
    chapter: "rest-api",
  },
  // ════════════════════════════════════════
  // api: HTTP クライアント (webclient) 2問
  // ════════════════════════════════════════
  {
    id: "webclient-q01",
    question: "Spring 6.1以降で同期HTTPクライアントとして推奨されるものはどれですか？",
    choices: [
      { label: "A", text: "RestTemplate" },
      { label: "B", text: "RestClient" },
      { label: "C", text: "HttpURLConnection" },
      { label: "D", text: "AsyncRestTemplate" },
    ],
    correctLabel: "B",
    explanation:
      "Spring 6.1で導入されたRestClientは、fluent APIを持つ同期HTTPクライアントとして推奨されます。RestTemplateはメンテナンスモードに入っており、新規開発ではRestClient（同期）またはWebClient（非同期/リアクティブ）を使用すべきです。",
    level: "api",
    chapter: "webclient",
  },
  {
    id: "webclient-q02",
    question: "WebClientが主に使用されるシーンとして最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "バッチ処理で大量データを同期的に処理する" },
      { label: "B", text: "非同期・ノンブロッキングな外部API呼び出し" },
      { label: "C", text: "データベースへの直接接続" },
      { label: "D", text: "静的ファイルの配信" },
    ],
    correctLabel: "B",
    explanation:
      "WebClientはSpring WebFluxの一部で、非同期・ノンブロッキングなHTTPクライアントです。MonoやFluxを返すリアクティブプログラミングに対応しており、外部APIの呼び出しやマイクロサービス間通信で特に有用です。",
    level: "api",
    chapter: "webclient",
  },
  // ════════════════════════════════════════
  // testing: テスト (testing) 3問
  // ════════════════════════════════════════
  {
    id: "testing-q01",
    question: "Spring Bootの統合テストで使用するアノテーションとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "@UnitTest" },
      { label: "B", text: "@SpringBootTest" },
      { label: "C", text: "@IntegrationTest" },
      { label: "D", text: "@WebTest" },
    ],
    correctLabel: "B",
    explanation:
      "@SpringBootTestはSpring Bootアプリケーションの統合テスト用アノテーションです。ApplicationContextを完全にロードしてテストを実行します。@WebMvcTestはControllerレイヤーのみのスライステストに使用します。",
    level: "testing",
    chapter: "testing",
  },
  {
    id: "testing-q02",
    question: "Mockitoでモックオブジェクトのメソッド呼び出しを設定する構文として正しいものはどれですか？",
    choices: [
      { label: "A", text: "mock(service).findById(1).thenReturn(user)" },
      { label: "B", text: "when(service.findById(1)).thenReturn(user)" },
      { label: "C", text: "expect(service.findById(1)).andReturn(user)" },
      { label: "D", text: "stub(service, \"findById\", 1).returns(user)" },
    ],
    correctLabel: "B",
    explanation:
      "Mockitoではwhen(...).thenReturn(...)パターンでモックの振る舞いを定義します。when()にモックのメソッド呼び出しを渡し、thenReturn()で戻り値を指定します。例外をスローさせたい場合はthenThrow()を使用します。",
    code: `@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock UserRepository repository;
    @InjectMocks UserService service;

    @Test
    void findById_returnsUser() {
        User user = new User(1L, "Alice");
        when(repository.findById(1L)).thenReturn(Optional.of(user));

        User result = service.findById(1L);
        assertThat(result.getName()).isEqualTo("Alice");
    }
}`,
    level: "testing",
    chapter: "testing",
  },
  {
    id: "testing-q03",
    question: "@WebMvcTest の特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "アプリケーション全体のBeanをロードする" },
      { label: "B", text: "Controller層のみをロードし、軽量なスライステストを実行する" },
      { label: "C", text: "データベースとの統合テストを実行する" },
      { label: "D", text: "フロントエンドのE2Eテストを実行する" },
    ],
    correctLabel: "B",
    explanation:
      "@WebMvcTestはController、ControllerAdvice、FilterなどのWebレイヤーのBeanのみをロードするスライステストです。ServiceやRepositoryはロードされないため、@MockBeanでモックを注入します。テストが高速に実行できるメリットがあります。",
    level: "testing",
    chapter: "testing",
  },
  // ════════════════════════════════════════
  // deploy: ビルドツール (build-tools) 1問
  // ════════════════════════════════════════
  {
    id: "build-tools-q01",
    question: "Mavenのライフサイクルにおけるフェーズの実行順序として正しいものはどれですか？",
    choices: [
      { label: "A", text: "compile → test → package → install" },
      { label: "B", text: "package → compile → test → install" },
      { label: "C", text: "test → compile → install → package" },
      { label: "D", text: "install → compile → test → package" },
    ],
    correctLabel: "A",
    explanation:
      "Mavenのデフォルトライフサイクルは validate → compile → test → package → verify → install → deploy の順で実行されます。mvn package を実行するとcompileとtestも自動的に先に実行されます。",
    level: "deploy",
    chapter: "build-tools",
  },
  // ════════════════════════════════════════
  // deploy: Docker とデプロイ (docker-deploy) 2問
  // ════════════════════════════════════════
  {
    id: "docker-deploy-q01",
    question: "Spring BootアプリケーションのDockerfileで、マルチステージビルドを使う主な利点は何ですか？",
    choices: [
      { label: "A", text: "ビルド速度が10倍になる" },
      { label: "B", text: "最終イメージにビルドツールを含めず、イメージサイズを小さくできる" },
      { label: "C", text: "Javaのバージョンを自動的に最新に更新できる" },
      { label: "D", text: "Docker Composeが不要になる" },
    ],
    correctLabel: "B",
    explanation:
      "マルチステージビルドでは、ビルド段階でMaven/Gradleを使い、実行段階ではJREと成果物のJARファイルのみを含むイメージを作成します。ビルドツールやソースコードが最終イメージに含まれないため、セキュリティとサイズの面で優れています。",
    code: `# ビルドステージ
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests

# 実行ステージ（JREのみ）
FROM eclipse-temurin:21-jre
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    level: "deploy",
    chapter: "docker-deploy",
  },
  {
    id: "docker-deploy-q02",
    question: "Spring Bootのプロファイル機能で、本番環境用の設定を分離する方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "application.yml にすべての環境設定を記述する" },
      { label: "B", text: "application-prod.yml を作成し、spring.profiles.active=prod で有効化する" },
      { label: "C", text: "本番用のJavaファイルを別途作成する" },
      { label: "D", text: "環境変数のみで設定し、設定ファイルは使わない" },
    ],
    correctLabel: "B",
    explanation:
      "Spring Bootではapplication-{profile}.ymlの命名規則で環境別設定ファイルを作成し、spring.profiles.activeで有効なプロファイルを指定します。環境変数SPRING_PROFILES_ACTIVE=prodや起動引数--spring.profiles.active=prodでも切り替えられます。",
    level: "deploy",
    chapter: "docker-deploy",
  },
];

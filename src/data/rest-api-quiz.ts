export type RestApiLevel = "design" | "implementation" | "operations";

export interface RestApiQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: RestApiLevel;
  chapter: string;
}

export const restApiQuizQuestions: RestApiQuizQuestion[] = [
  // ════════════════════════════════════════
  // design: REST API設計 5問
  // ════════════════════════════════════════
  {
    id: "rest-design-q01",
    question: "RESTfulなURI設計として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "/getUsers" },
      { label: "B", text: "/users" },
      { label: "C", text: "/api/fetchAllUsers" },
      { label: "D", text: "/user_list" },
    ],
    correctLabel: "B",
    explanation:
      "RESTful URIではリソースを名詞の複数形で表現します。HTTPメソッド（GET, POST, PUT, DELETE）で操作を表すため、URIに動詞（get, fetch等）を含めるのは不適切です。/usersに対してGETでリスト取得、POSTで新規作成、/users/{id}でGET（取得）、PUT（更新）、DELETE（削除）とします。",
    level: "design",
    chapter: "rest-design",
  },
  {
    id: "rest-design-q02",
    question: "HTTPメソッドの使い分けとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "GET: リソース作成、POST: リソース取得" },
      { label: "B", text: "PUT: 部分更新、PATCH: 全体更新" },
      { label: "C", text: "GET: リソース取得、POST: リソース作成、PUT: 全体更新、PATCH: 部分更新" },
      { label: "D", text: "DELETE: リソース更新、PUT: リソース削除" },
    ],
    correctLabel: "C",
    explanation:
      "RESTではGET（リソース取得）、POST（リソース作成）、PUT（リソース全体の更新・置換）、PATCH（リソースの部分更新）、DELETE（リソース削除）と使い分けます。GETは副作用を持たない安全なメソッドで、PUT・DELETEは冪等です。",
    level: "design",
    chapter: "rest-design",
  },
  {
    id: "rest-design-q03",
    question: "リソースの新規作成が成功した場合に返すべきHTTPステータスコードとして最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "200 OK" },
      { label: "B", text: "201 Created" },
      { label: "C", text: "204 No Content" },
      { label: "D", text: "301 Moved Permanently" },
    ],
    correctLabel: "B",
    explanation:
      "201 Createdはリソースが正常に作成されたことを示します。レスポンスのLocationヘッダーに新しいリソースのURIを含めるのがベストプラクティスです。200 OKは一般的な成功、204 No Contentは成功したがレスポンスボディがない場合（DELETE成功時など）に使用します。",
    level: "design",
    chapter: "rest-design",
  },
  {
    id: "rest-design-q04",
    question: "REST APIのバージョニング方法として一般的でないものはどれですか？",
    choices: [
      { label: "A", text: "URIパスにバージョンを含める（/api/v1/users）" },
      { label: "B", text: "リクエストヘッダーにバージョンを指定する" },
      { label: "C", text: "クエリパラメータでバージョンを指定する（?version=1）" },
      { label: "D", text: "リクエストボディにバージョンを含める" },
    ],
    correctLabel: "D",
    explanation:
      "REST APIのバージョニングには、URIパス（/api/v1/）、カスタムヘッダー（Accept-Version: v1）、メディアタイプ（Accept: application/vnd.api.v1+json）、クエリパラメータ（?version=1）が一般的です。リクエストボディにバージョンを含める方法はGETリクエストではボディを持たないため不適切です。",
    level: "design",
    chapter: "rest-design",
  },
  {
    id: "rest-design-q05",
    question: "HATEOASの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "認証トークンの形式を定義する仕様" },
      { label: "B", text: "レスポンスに関連リソースへのリンクを含め、クライアントがAPIを動的に探索できるようにする" },
      { label: "C", text: "APIのレート制限を実装する仕組み" },
      { label: "D", text: "レスポンスをGZIP圧縮する技術" },
    ],
    correctLabel: "B",
    explanation:
      "HATEOAS（Hypermedia as the Engine of Application State）はRESTの成熟度モデルの最高レベルで、レスポンスに関連するアクションやリソースへのハイパーリンクを含めます。クライアントはリンクをたどってAPIを探索でき、URIのハードコーディングが不要になります。Spring HATEOASで実装できます。",
    level: "design",
    chapter: "rest-design",
  },
  // ════════════════════════════════════════
  // implementation: REST API実装 5問
  // ════════════════════════════════════════
  {
    id: "rest-impl-q01",
    question: "Spring BootでREST APIのエンドポイントを定義する方法として正しいものはどれですか？",
    code: `@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        // ...
    }
}`,
    choices: [
      { label: "A", text: "@Controllerと@ResponseBodyを使う必要がある" },
      { label: "B", text: "@RestControllerと@GetMappingを組み合わせてREST APIを定義する" },
      { label: "C", text: "@Serviceアノテーションでエンドポイントを定義する" },
      { label: "D", text: "@Componentアノテーションでエンドポイントを定義する" },
    ],
    correctLabel: "B",
    explanation:
      "@RestControllerは@Controllerと@ResponseBodyを合わせたアノテーションで、すべてのメソッドの戻り値が自動的にJSON/XMLにシリアライズされます。@GetMapping、@PostMapping、@PutMapping、@DeleteMapping、@PatchMappingでHTTPメソッドに対応するエンドポイントを定義します。",
    level: "implementation",
    chapter: "rest-impl",
  },
  {
    id: "rest-impl-q02",
    question: "REST APIでのエラーレスポンスのベストプラクティスとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "常に200 OKを返し、ボディにエラー情報を含める" },
      { label: "B", text: "適切なHTTPステータスコードを返し、エラーの詳細をレスポンスボディに含める" },
      { label: "C", text: "500 Internal Server Errorのみを使用する" },
      { label: "D", text: "エラー時はレスポンスを返さない" },
    ],
    correctLabel: "B",
    explanation:
      "REST APIでは適切なHTTPステータスコード（400: バリデーションエラー、401: 認証エラー、404: リソース未検出、409: 競合など）を返し、レスポンスボディにエラーコード、メッセージ、詳細情報を含めます。Spring Bootでは@ExceptionHandlerやProblemDetail（RFC 7807）で統一的なエラーハンドリングを実装できます。",
    level: "implementation",
    chapter: "rest-impl",
  },
  {
    id: "rest-impl-q03",
    question: "REST APIでリスト取得のページネーションを実装する場合、一般的なクエリパラメータの組み合わせはどれですか？",
    choices: [
      { label: "A", text: "start と end" },
      { label: "B", text: "page と size（または limit と offset）" },
      { label: "C", text: "from と to" },
      { label: "D", text: "index と count" },
    ],
    correctLabel: "B",
    explanation:
      "ページネーションには「page と size」（ページ番号とページサイズ）または「limit と offset」（取得件数とスキップ数）のパラメータを使用します。レスポンスにはtotalElements、totalPages、現在のページ情報を含めます。Spring DataのPageableを使うと簡単に実装できます。",
    level: "implementation",
    chapter: "rest-impl",
  },
  {
    id: "rest-impl-q04",
    question: "DTOパターン（Data Transfer Object）をREST APIで使用する利点はどれですか？",
    choices: [
      { label: "A", text: "データベースのパフォーマンスが向上する" },
      { label: "B", text: "エンティティの内部構造をAPIの外部仕様から分離し、必要な情報のみを公開できる" },
      { label: "C", text: "認証が自動的に行われる" },
      { label: "D", text: "トランザクション管理が簡素化される" },
    ],
    correctLabel: "B",
    explanation:
      "DTOを使うことで、エンティティの内部構造（DB設計）とAPIの外部仕様（クライアントに公開するデータ）を分離できます。パスワードなどの機密情報の漏洩防止、循環参照の回避、APIの後方互換性の維持に役立ちます。MapStructやModelMapperでエンティティとDTO間の変換を効率化できます。",
    level: "implementation",
    chapter: "rest-impl",
  },
  {
    id: "rest-impl-q05",
    question: "バリデーションを実装する際のアノテーションの使い方として正しいものはどれですか？",
    code: `public class CreateUserRequest {
    @NotBlank(message = "名前は必須です")
    private String name;

    @Email(message = "メールアドレスの形式が不正です")
    private String email;

    @Min(value = 0, message = "年齢は0以上である必要があります")
    private int age;
}`,
    choices: [
      { label: "A", text: "コントローラのメソッド引数に@Validatedを付けて、Bean Validationアノテーションでバリデーションする" },
      { label: "B", text: "サービス層でif文を使って手動でバリデーションする" },
      { label: "C", text: "データベースの制約のみに頼る" },
      { label: "D", text: "フロントエンドのバリデーションのみで十分である" },
    ],
    correctLabel: "A",
    explanation:
      "Bean Validation（@NotBlank, @Email, @Min等）とコントローラの引数に@Validatedまたは@Validを付けることで、宣言的にバリデーションを実装できます。バリデーションエラーはMethodArgumentNotValidExceptionとしてスローされ、@ExceptionHandlerで統一的に処理できます。",
    level: "implementation",
    chapter: "rest-impl",
  },
  // ════════════════════════════════════════
  // operations: API運用 5問
  // ════════════════════════════════════════
  {
    id: "rest-ops-q01",
    question: "REST APIのレート制限（Rate Limiting）の目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "APIのレスポンス速度を向上させる" },
      { label: "B", text: "過剰なリクエストからAPIを保護し、公平なリソース利用を確保する" },
      { label: "C", text: "APIの認証を強化する" },
      { label: "D", text: "レスポンスデータを圧縮する" },
    ],
    correctLabel: "B",
    explanation:
      "レート制限は単位時間あたりのリクエスト数を制限し、DDoS攻撃や悪意のあるクライアントからAPIを保護します。429 Too Many Requestsステータスコードを返し、Retry-Afterヘッダーで再試行可能な時間を通知します。Token Bucket、Sliding Windowなどのアルゴリズムで実装します。",
    level: "operations",
    chapter: "rest-ops",
  },
  {
    id: "rest-ops-q02",
    question: "OpenAPI（Swagger）仕様の利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "APIの実行速度が向上する" },
      { label: "B", text: "API仕様の標準的なドキュメント化、クライアントコード生成、テスト自動化が可能" },
      { label: "C", text: "データベースのスキーマを自動生成する" },
      { label: "D", text: "サーバーのセキュリティを強化する" },
    ],
    correctLabel: "B",
    explanation:
      "OpenAPI仕様はREST APIの構造を標準フォーマット（YAML/JSON）で記述します。Swagger UIでインタラクティブなドキュメントを生成し、OpenAPI Generatorでクライアント/サーバーのコードを自動生成できます。SpringではspringdocやSpringfoxで自動的に仕様を生成できます。",
    level: "operations",
    chapter: "rest-ops",
  },
  {
    id: "rest-ops-q03",
    question: "REST APIのキャッシュ戦略で使用するHTTPヘッダーとして正しい組み合わせはどれですか？",
    choices: [
      { label: "A", text: "Content-Type と Accept" },
      { label: "B", text: "Cache-Control、ETag、Last-Modified" },
      { label: "C", text: "Authorization と Cookie" },
      { label: "D", text: "Host と Referer" },
    ],
    correctLabel: "B",
    explanation:
      "HTTPキャッシュではCache-Control（キャッシュポリシー指定）、ETag（リソースのバージョン識別子）、Last-Modified（最終更新日時）を使います。条件付きリクエスト（If-None-Match、If-Modified-Since）でキャッシュの有効性を確認し、304 Not Modifiedで帯域幅を節約します。",
    level: "operations",
    chapter: "rest-ops",
  },
  {
    id: "rest-ops-q04",
    question: "CORSの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "サーバー間のデータ同期プロトコル" },
      { label: "B", text: "異なるオリジン（ドメイン）からのリクエストを許可・制御するブラウザのセキュリティ機構" },
      { label: "C", text: "APIの暗号化方式" },
      { label: "D", text: "データベースのレプリケーション方式" },
    ],
    correctLabel: "B",
    explanation:
      "CORS（Cross-Origin Resource Sharing）は、ブラウザが異なるオリジンへのリクエストを制限する同一オリジンポリシーを緩和する仕組みです。サーバーがAccess-Control-Allow-Originヘッダーで許可するオリジンを指定します。Spring Bootでは@CrossOriginアノテーションやWebMvcConfigurerで設定します。",
    level: "operations",
    chapter: "rest-ops",
  },
  {
    id: "rest-ops-q05",
    question: "REST APIの冪等性（Idempotency）を保証するための実装方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "すべてのリクエストをPOSTメソッドで実装する" },
      { label: "B", text: "クライアントが一意のIdempotency-Keyを送信し、サーバーが重複リクエストを検出して同じレスポンスを返す" },
      { label: "C", text: "リクエストにタイムスタンプを含める" },
      { label: "D", text: "レスポンスをキャッシュしない" },
    ],
    correctLabel: "B",
    explanation:
      "冪等性キー（Idempotency-Key）は、クライアントが生成する一意のキーをリクエストヘッダーに含め、サーバーが同じキーのリクエストを重複として検出する仕組みです。決済APIなどで二重処理を防ぐために重要です。GET、PUT、DELETEは本来冪等ですが、POSTは冪等キーで冪等性を保証します。",
    level: "operations",
    chapter: "rest-ops",
  },
];

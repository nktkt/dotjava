export interface RestApiSection {
  title: string;
  content: string;
  code?: string;
}

export interface RestApiChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: RestApiSection[];
}

export const restApiCategories = [
  { id: "design", name: "API設計", color: "#059669" },
  { id: "implementation", name: "実装", color: "#2563EB" },
  { id: "operations", name: "運用・品質", color: "#D97706" },
] as const;

export const restApiChapters: RestApiChapter[] = [
  // ===== API設計 =====
  {
    id: "rest-principles",
    title: "REST原則",
    category: "design",
    description:
      "リソース設計、URI設計、HTTPメソッドの使い分け、ステータスコードの選択",
    sections: [
      {
        title: "RESTとは",
        content:
          "REST（Representational State Transfer）は、Web API の設計原則です。リソース（データ）を URI で一意に識別し、HTTP メソッドで操作を表現します。ステートレス（サーバーがクライアントの状態を保持しない）であることが原則で、スケーラビリティに優れます。統一インターフェース（Uniform Interface）により、クライアントとサーバーが疎結合になります。REST は仕様ではなく設計スタイルであり、実装の柔軟性がある反面、設計者の判断が品質を左右します。",
        code: `// RESTful APIの基本構造（Spring Boot）
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // GET /api/v1/users - 一覧取得
    @GetMapping
    public List<UserResponse> getUsers() {
        return userService.findAll();
    }

    // GET /api/v1/users/{id} - 個別取得
    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable Long id) {
        return userService.findById(id);
    }

    // POST /api/v1/users - 新規作成
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@Valid @RequestBody CreateUserRequest req) {
        return userService.create(req);
    }

    // PUT /api/v1/users/{id} - 全体更新
    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable Long id,
                                    @Valid @RequestBody UpdateUserRequest req) {
        return userService.update(id, req);
    }

    // DELETE /api/v1/users/{id} - 削除
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.delete(id);
    }
}`,
      },
      {
        title: "リソース設計",
        content:
          "リソースはビジネスドメインの概念（ユーザー、注文、商品など）を表し、URI で識別します。リソースは名詞で表現し、動詞は使いません（×/api/getUsers、○/api/users）。コレクションリソース（/users）と個別リソース（/users/123）を区別します。リソース間の関連は URI のネストで表現します（/users/123/orders）。ただし、ネストは2階層までに留め、深くなりすぎる場合はフラットな設計にします。",
        code: `// リソース設計の良い例・悪い例
@RestController
public class ApiDesignExamples {

    // 良い例: リソースは名詞、操作はHTTPメソッド
    // GET    /api/v1/products          商品一覧
    // GET    /api/v1/products/123      商品詳細
    // POST   /api/v1/products          商品作成
    // PUT    /api/v1/products/123      商品更新
    // DELETE /api/v1/products/123      商品削除

    // 良い例: リソース間の関連（2階層まで）
    // GET    /api/v1/users/42/orders   ユーザーの注文一覧
    // POST   /api/v1/orders/99/items   注文に明細追加

    // 悪い例: 動詞を使っている
    // GET  /api/v1/getProducts         ×
    // POST /api/v1/createProduct       ×
    // POST /api/v1/deleteProduct/123   ×

    // アクションが必要な場合のパターン
    // POST /api/v1/orders/99/cancel     注文キャンセル
    // POST /api/v1/users/42/activate    ユーザー有効化

    // レスポンスDTO（クライアントに必要な情報のみ）
    record ProductResponse(
        Long id,
        String name,
        BigDecimal price,
        String category,
        String imageUrl,
        LocalDateTime createdAt
    ) {}
}`,
      },
      {
        title: "URI設計のベストプラクティス",
        content:
          "URI はリソースの場所を示す住所です。設計のルールとして (1) 小文字を使用（/api/users）、(2) 複数形を使用（/users, /orders）、(3) ハイフン区切り（/order-items）、(4) 末尾のスラッシュは付けない、(5) ファイル拡張子は含めない（Content-Type で判断）、(6) クエリパラメータはフィルタリング・ソート・ページネーションに使用。一貫性のある命名規則を API 全体で統一することが最も重要です。",
      },
      {
        title: "HTTPメソッドの使い分け",
        content:
          "GET はリソースの取得（安全・冪等）、POST はリソースの新規作成（非安全・非冪等）、PUT はリソースの全体置換（非安全・冪等）、PATCH はリソースの部分更新（非安全・非冪等）、DELETE はリソースの削除（非安全・冪等）です。安全なメソッドはリソースの状態を変更せず、冪等なメソッドは何回実行しても同じ結果になります。GET で状態を変更したり、POST で取得したりしないよう注意します。",
        code: `// HTTPメソッドの適切な使い分け
@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    // GET: リソース取得（安全・冪等）
    @GetMapping("/{id}")
    public OrderResponse getOrder(@PathVariable Long id) {
        return orderService.findById(id);
    }

    // POST: リソース作成（非安全・非冪等）
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED) // 201を返す
    public OrderResponse createOrder(@Valid @RequestBody CreateOrderRequest req) {
        return orderService.create(req);
    }

    // PUT: リソース全体置換（非安全・冪等）
    @PutMapping("/{id}")
    public OrderResponse replaceOrder(@PathVariable Long id,
                                       @RequestBody OrderRequest req) {
        return orderService.replace(id, req);
    }

    // PATCH: 部分更新（非安全・非冪等）
    @PatchMapping("/{id}")
    public OrderResponse updateOrder(@PathVariable Long id,
                                      @RequestBody Map<String, Object> updates) {
        return orderService.partialUpdate(id, updates);
    }

    // DELETE: リソース削除（非安全・冪等）
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // 204を返す
    public void deleteOrder(@PathVariable Long id) {
        orderService.delete(id);
    }

    // アクション: POSTで状態変更操作
    @PostMapping("/{id}/cancel")
    public OrderResponse cancelOrder(@PathVariable Long id) {
        return orderService.cancel(id);
    }
}`,
      },
      {
        title: "ステータスコードの選択",
        content:
          "適切なステータスコードを返すことで、クライアントはレスポンスの意味を正確に理解できます。2xx（成功）：200 OK、201 Created、204 No Content。3xx（リダイレクト）：301 Moved Permanently、304 Not Modified。4xx（クライアントエラー）：400 Bad Request、401 Unauthorized、403 Forbidden、404 Not Found、409 Conflict、422 Unprocessable Entity。5xx（サーバーエラー）：500 Internal Server Error、503 Service Unavailable。エラーレスポンスは統一フォーマットで返します。",
        code: `// 統一エラーレスポンスの実装
// エラーレスポンスのフォーマット
record ErrorResponse(
    String code,          // エラーコード（機械可読）
    String message,       // エラーメッセージ（人間可読）
    String details,       // 詳細情報
    LocalDateTime timestamp
) {}

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 404 Not Found
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleNotFound(ResourceNotFoundException ex) {
        return new ErrorResponse("RESOURCE_NOT_FOUND",
            ex.getMessage(), null, LocalDateTime.now());
    }

    // 400 Bad Request（バリデーションエラー）
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(MethodArgumentNotValidException ex) {
        String details = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getField() + ": " + e.getDefaultMessage())
            .collect(Collectors.joining(", "));
        return new ErrorResponse("VALIDATION_ERROR",
            "入力値が不正です", details, LocalDateTime.now());
    }

    // 409 Conflict（ビジネスルール違反）
    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorResponse handleBusiness(BusinessException ex) {
        return new ErrorResponse(ex.getErrorCode(),
            ex.getMessage(), null, LocalDateTime.now());
    }

    // 500 Internal Server Error
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleGeneral(Exception ex) {
        return new ErrorResponse("INTERNAL_ERROR",
            "サーバー内部エラー", null, LocalDateTime.now());
    }
}`,
      },
    ],
  },
  {
    id: "api-versioning",
    title: "バージョニング戦略",
    category: "design",
    description:
      "URLパス・ヘッダー・クエリによるバージョニング、後方互換性、非推奨API管理",
    sections: [
      {
        title: "なぜバージョニングが必要か",
        content:
          "API は公開後も進化し続けます。破壊的変更（フィールドの削除、型変更、必須パラメータの追加など）を行うと、既存のクライアントが動作しなくなります。バージョニングにより、新旧のクライアントが共存でき、段階的な移行が可能になります。バージョンアップの方針として、追加は後方互換、変更・削除は新バージョンで行います。バージョンの数を最小限に抑え、管理コストとのバランスを取ることが重要です。",
        code: `// バージョニングの3つの方式の比較

// === 方式1: URLパス（最も一般的） ===
// GET /api/v1/users/123
// GET /api/v2/users/123
@RestController
@RequestMapping("/api/v1/users")
public class UserControllerV1 {
    @GetMapping("/{id}")
    public UserV1Response getUser(@PathVariable Long id) {
        // V1: 基本フィールドのみ
        return new UserV1Response(id, "田中太郎", "tanaka@example.com");
    }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    @GetMapping("/{id}")
    public UserV2Response getUser(@PathVariable Long id) {
        // V2: プロフィール情報を追加
        return new UserV2Response(id, "田中", "太郎",
            "tanaka@example.com", "東京都", "2024-01-01");
    }
}

// === 方式2: ヘッダー ===
// GET /api/users/123
// Accept: application/vnd.myapp.v2+json
// @GetMapping(value = "/{id}",
//     produces = "application/vnd.myapp.v2+json")

// === 方式3: クエリパラメータ ===
// GET /api/users/123?version=2
// @GetMapping("/{id}")
// public Object getUser(@PathVariable Long id,
//     @RequestParam(defaultValue = "1") int version)`,
      },
      {
        title: "URLパスバージョニング",
        content:
          "URL パスにバージョンを含める方式（/api/v1/users）は最も広く採用されています。利点は (1) 明示的でわかりやすい、(2) ブラウザで直接テスト可能、(3) キャッシュが容易、(4) ルーティングが簡単。欠点は (1) URL が変更される、(2) バージョンごとにコントローラが必要。Spring Boot では @RequestMapping のパスにバージョンを含め、共通ロジックはサービス層で再利用します。",
        code: `// URLパスバージョニングの実装パターン
// コントローラーはバージョン別、サービスは共通
@RestController
@RequestMapping("/api/v1/products")
public class ProductControllerV1 {
    private final ProductService productService;

    public ProductControllerV1(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ProductV1Dto getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        // V1用のレスポンスに変換
        return new ProductV1Dto(
            product.getId(), product.getName(), product.getPrice());
    }
}

@RestController
@RequestMapping("/api/v2/products")
public class ProductControllerV2 {
    private final ProductService productService;

    public ProductControllerV2(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ProductV2Dto getProduct(@PathVariable Long id) {
        Product product = productService.findById(id);
        // V2用のレスポンス（カテゴリ・在庫情報を追加）
        return new ProductV2Dto(
            product.getId(), product.getName(), product.getPrice(),
            product.getCategory(), product.getStockQuantity(),
            product.getImageUrls());
    }
}

record ProductV1Dto(Long id, String name, BigDecimal price) {}
record ProductV2Dto(Long id, String name, BigDecimal price,
    String category, int stockQuantity, List<String> imageUrls) {}`,
      },
      {
        title: "後方互換性の維持",
        content:
          "後方互換性のある変更（非破壊的変更）は新バージョンを作らずに適用できます。安全な変更は (1) フィールドの追加（新しいフィールドを追加）、(2) オプショナルパラメータの追加、(3) 新しいエンドポイントの追加、(4) レスポンスフィールドの追加。破壊的変更は (1) フィールドの削除・名前変更、(2) 型の変更、(3) 必須パラメータの追加、(4) URL の変更。Jackson の @JsonIgnoreProperties(ignoreUnknown = true) をクライアント側で設定すると、未知のフィールドを無視して後方互換性を向上できます。",
        code: `// 後方互換性を維持するレスポンス設計
// V1 レスポンス
// { "id": 1, "name": "田中太郎", "email": "tanaka@example.com" }

// V1.1 レスポンス（後方互換あり: フィールド追加のみ）
// { "id": 1, "name": "田中太郎", "email": "tanaka@example.com",
//   "phone": "090-1234-5678" }  ← 追加は安全

// V2 レスポンス（破壊的変更: nameを分割）
// { "id": 1, "firstName": "太郎", "lastName": "田中",
//   "email": "tanaka@example.com", "phone": "090-1234-5678" }

// デフォルト値で後方互換を維持するリクエスト
public record CreateUserRequest(
    @NotBlank String name,
    @Email String email,
    // 新しいフィールドはOptionalまたはデフォルト値付き
    @JsonProperty(defaultValue = "STANDARD")
    String plan,          // 既存クライアントは送らなくてOK

    @Nullable
    String phone          // nullableで追加
) {}

// クライアント側: 未知フィールドを無視
@JsonIgnoreProperties(ignoreUnknown = true)
public record UserResponse(
    Long id,
    String name,
    String email
    // サーバーが新フィールドを追加しても影響なし
) {}`,
      },
      {
        title: "非推奨APIの管理",
        content:
          "古いバージョンの API を段階的に廃止するプロセスが必要です。(1) 非推奨の通知：レスポンスヘッダーに Deprecation ヘッダーを付与し、ドキュメントに明記する。(2) 移行期間の設定：最低6ヶ月〜1年の移行期間を設ける。(3) 利用状況の監視：旧バージョンの利用者数を追跡する。(4) 段階的廃止：まず新規登録を停止し、最終的にエンドポイントを削除する。Sunset ヘッダーで廃止予定日を通知するのも効果的です。",
        code: `// 非推奨APIの実装（Deprecationヘッダー付与）
@RestController
@RequestMapping("/api/v1/users")
public class DeprecatedUserController {

    @GetMapping("/{id}")
    public ResponseEntity<UserV1Dto> getUser(@PathVariable Long id) {
        UserV1Dto user = userService.findByIdV1(id);

        return ResponseEntity.ok()
            // 非推奨ヘッダー
            .header("Deprecation", "true")
            .header("Sunset", "2025-06-30T00:00:00Z") // 廃止予定日
            .header("Link",
                "</api/v2/users/" + id + ">; rel=\"successor-version\"")
            .body(user);
    }
}

// 非推奨APIの利用を監視するインターセプター
@Component
public class DeprecationInterceptor implements HandlerInterceptor {

    private final MeterRegistry registry;

    public DeprecationInterceptor(MeterRegistry registry) {
        this.registry = registry;
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) {
        String uri = request.getRequestURI();
        // V1 APIの利用をカウント
        if (uri.startsWith("/api/v1/")) {
            registry.counter("api.deprecated.calls",
                "version", "v1",
                "path", uri,
                "client", request.getHeader("User-Agent"))
                .increment();
        }
        return true;
    }
}`,
      },
      {
        title: "バージョニング戦略の選択",
        content:
          "バージョニング戦略は組織やプロジェクトの状況で選択します。URL パスは最もシンプルで推奨されるケースが多く、パブリック API に適しています。ヘッダーバージョニングは URL を変更せず、内部 API に適していますが、テストしにくいデメリットがあります。クエリパラメータはオプション的に使えますが、キャッシュの管理が複雑です。どの方式を選んでも、組織全体で統一し、明確なバージョニングポリシーを文書化することが最も重要です。",
      },
    ],
  },
  {
    id: "pagination-filtering",
    title: "ページネーション・フィルタリング",
    category: "design",
    description:
      "カーソルベース・オフセットベースのページネーション、フィルタリング、ソート、HATEOAS",
    sections: [
      {
        title: "オフセットベースページネーション",
        content:
          "オフセットベースは最も一般的なページネーション方式で、page（ページ番号）と size（1ページあたりの件数）をクエリパラメータで指定します。SQLのLIMIT/OFFSETに直接マッピングでき、Spring DataのPageableで簡単に実装できます。デメリットは、大きなオフセットで性能が劣化すること、データの追加・削除でページの内容がずれること。管理画面やページ番号表示が必要な場面に適しています。",
        code: `// オフセットベースページネーションの実装
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET /api/v1/products?page=0&size=20&sort=price,desc
    @GetMapping
    public PageResponse<ProductDto> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort) {

        Pageable pageable = PageRequest.of(page, size, parseSort(sort));
        Page<Product> productPage = productRepository.findAll(pageable);

        return new PageResponse<>(
            productPage.getContent().stream().map(this::toDto).toList(),
            productPage.getNumber(),     // 現在のページ
            productPage.getSize(),       // ページサイズ
            productPage.getTotalElements(), // 全件数
            productPage.getTotalPages()     // 全ページ数
        );
    }

    private Sort parseSort(String sortParam) {
        String[] parts = sortParam.split(",");
        return Sort.by(Sort.Direction.fromString(parts[1]), parts[0]);
    }

    private ProductDto toDto(Product p) {
        return new ProductDto(p.getId(), p.getName(), p.getPrice());
    }
}

record PageResponse<T>(List<T> content, int page, int size,
    long totalElements, int totalPages) {}`,
      },
      {
        title: "カーソルベースページネーション",
        content:
          "カーソルベースは、最後に取得したレコードのキー（カーソル）を基準に次のページを取得する方式です。WHERE id > :cursor LIMIT :size のように実装し、インデックスを活用できるため大量データでも高速です。SNS のタイムラインや無限スクロールに最適です。デメリットはページ番号でのジャンプができないことと、ソート条件が限定されること。カーソルは Base64 エンコードして不透明（opaque）にするのが一般的です。",
        code: `// カーソルベースページネーションの実装
@RestController
@RequestMapping("/api/v1/timeline")
public class TimelineController {

    private final PostRepository postRepository;

    // GET /api/v1/timeline?cursor=abc123&size=20
    @GetMapping
    public CursorPageResponse<PostDto> getTimeline(
            @RequestParam(required = false) String cursor,
            @RequestParam(defaultValue = "20") int size) {

        // カーソルをデコード
        Long cursorId = decodeCursor(cursor);

        // カーソル以降のデータを取得（+1件で次ページの有無を判定）
        List<Post> posts;
        if (cursorId != null) {
            posts = postRepository.findByIdLessThanOrderByIdDesc(
                cursorId, Limit.of(size + 1));
        } else {
            posts = postRepository.findAllOrderByIdDesc(Limit.of(size + 1));
        }

        boolean hasNext = posts.size() > size;
        if (hasNext) {
            posts = posts.subList(0, size); // 余分な1件を除去
        }

        // 次のカーソルを生成
        String nextCursor = hasNext
            ? encodeCursor(posts.getLast().getId()) : null;

        return new CursorPageResponse<>(
            posts.stream().map(this::toDto).toList(),
            nextCursor,
            hasNext
        );
    }

    private String encodeCursor(Long id) {
        return Base64.getEncoder().encodeToString(id.toString().getBytes());
    }

    private Long decodeCursor(String cursor) {
        if (cursor == null) return null;
        return Long.parseLong(new String(Base64.getDecoder().decode(cursor)));
    }
}

record CursorPageResponse<T>(List<T> content,
    String nextCursor, boolean hasNext) {}`,
      },
      {
        title: "フィルタリング",
        content:
          "フィルタリングはクエリパラメータでリソースの絞り込み条件を指定します。シンプルなフィルタは ?status=active&category=electronics のようにキー・バリュー形式で表現します。範囲指定は ?price_min=1000&price_max=5000 や ?created_after=2024-01-01 のように命名します。複雑なフィルタには LHS Brackets（?price[gte]=1000）や RHS Colon（?filter=price:gte:1000）の方式もあります。Spring Data の Specification を使うと動的なクエリを型安全に構築できます。",
        code: `// 動的フィルタリングの実装（Spring Data Specification）
@RestController
@RequestMapping("/api/v1/products")
public class ProductSearchController {

    private final ProductRepository productRepository;

    // GET /api/v1/products?category=electronics&priceMin=1000&priceMax=5000
    //     &name=iPhone&status=ACTIVE&sort=price,asc&page=0&size=20
    @GetMapping
    public PageResponse<ProductDto> searchProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal priceMin,
            @RequestParam(required = false) BigDecimal priceMax,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String status,
            Pageable pageable) {

        Specification<Product> spec = Specification.where(null);

        if (category != null) {
            spec = spec.and((root, q, cb) ->
                cb.equal(root.get("category"), category));
        }
        if (priceMin != null) {
            spec = spec.and((root, q, cb) ->
                cb.greaterThanOrEqualTo(root.get("price"), priceMin));
        }
        if (priceMax != null) {
            spec = spec.and((root, q, cb) ->
                cb.lessThanOrEqualTo(root.get("price"), priceMax));
        }
        if (name != null) {
            spec = spec.and((root, q, cb) ->
                cb.like(root.get("name"), "%" + name + "%"));
        }

        Page<Product> page = productRepository.findAll(spec, pageable);
        return toPageResponse(page);
    }
}

// ProductRepository は JpaSpecificationExecutor を継承
// interface ProductRepository extends JpaRepository<Product, Long>,
//     JpaSpecificationExecutor<Product> {}`,
      },
      {
        title: "ソート",
        content:
          "ソートはクエリパラメータで並び順を指定します。Spring Data の Pageable は sort=field,direction の形式をサポートし、複数フィールドでのソートも可能です（sort=price,asc&sort=name,desc）。ソート可能なフィールドをホワイトリストで制限し、任意のカラム名を受け付けない（SQL インジェクション対策）ようにします。デフォルトのソート順を明示し、ソート指定がない場合でも一貫した結果を返すことが重要です。",
        code: `// ソート機能の実装（ホワイトリスト付き）
@RestController
@RequestMapping("/api/v1/products")
public class SortableProductController {

    // ソート可能なフィールドのホワイトリスト
    private static final Set<String> SORTABLE_FIELDS =
        Set.of("name", "price", "createdAt", "salesCount");

    private final ProductRepository productRepository;

    public SortableProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // GET /api/v1/products?sort=price,asc&sort=name,desc
    @GetMapping
    public PageResponse<ProductDto> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt,desc") List<String> sort) {

        // ソートフィールドのバリデーション
        List<Sort.Order> orders = sort.stream()
            .map(s -> s.split(","))
            .filter(parts -> SORTABLE_FIELDS.contains(parts[0]))
            .map(parts -> new Sort.Order(
                parts.length > 1
                    ? Sort.Direction.fromString(parts[1])
                    : Sort.Direction.ASC,
                parts[0]))
            .toList();

        if (orders.isEmpty()) {
            orders = List.of(Sort.Order.desc("createdAt")); // デフォルト
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(orders));
        Page<Product> result = productRepository.findAll(pageable);
        return toPageResponse(result);
    }

    private PageResponse<ProductDto> toPageResponse(Page<Product> page) {
        return new PageResponse<>(
            page.getContent().stream().map(this::toDto).toList(),
            page.getNumber(), page.getSize(),
            page.getTotalElements(), page.getTotalPages());
    }
}`,
      },
      {
        title: "HATEOAS",
        content:
          "HATEOAS（Hypermedia as the Engine of Application State）は、レスポンスにハイパーメディアリンクを含めることで、クライアントが API を動的に発見・遷移できるようにする REST の成熟度モデル（Level 3）です。レスポンスに次に実行可能なアクションのリンクを含めることで、クライアントは URL をハードコードする必要がなくなります。Spring HATEOAS ライブラリで RepresentationModel を使って実装します。実際にはフル HATEOAS を採用するプロジェクトは少なく、一部のリンク（ページネーションの next/prev 等）のみ採用するケースが一般的です。",
        code: `// Spring HATEOASの実装例
import org.springframework.hateoas.*;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/v1/orders")
public class HateoasOrderController {

    @GetMapping("/{id}")
    public EntityModel<OrderDto> getOrder(@PathVariable Long id) {
        OrderDto order = orderService.findById(id);

        // ハイパーメディアリンクを追加
        EntityModel<OrderDto> model = EntityModel.of(order);

        // 自分自身へのリンク
        model.add(linkTo(methodOn(HateoasOrderController.class)
            .getOrder(id)).withSelfRel());

        // 関連リソースへのリンク
        model.add(linkTo(methodOn(HateoasOrderController.class)
            .getOrderItems(id)).withRel("items"));

        // 実行可能なアクション
        if (order.status().equals("PENDING")) {
            model.add(linkTo(methodOn(HateoasOrderController.class)
                .cancelOrder(id)).withRel("cancel"));
            model.add(linkTo(methodOn(HateoasOrderController.class)
                .confirmOrder(id)).withRel("confirm"));
        }
        return model;
    }
}

// レスポンス例:
// {
//   "id": 123, "status": "PENDING", "totalAmount": 5000,
//   "_links": {
//     "self": { "href": "/api/v1/orders/123" },
//     "items": { "href": "/api/v1/orders/123/items" },
//     "cancel": { "href": "/api/v1/orders/123/cancel" },
//     "confirm": { "href": "/api/v1/orders/123/confirm" }
//   }
// }`,
      },
    ],
  },

  // ===== 実装 =====
  {
    id: "openapi-swagger",
    title: "OpenAPI/Swagger",
    category: "implementation",
    description:
      "springdoc-openapiによるAPI仕様書の自動生成、Swagger UI、コード生成",
    sections: [
      {
        title: "OpenAPIとSpringdoc",
        content:
          "OpenAPI Specification（旧Swagger）は REST API の仕様を記述する標準フォーマットです。springdoc-openapi ライブラリを使うと、Spring Boot のコントローラーから OpenAPI 仕様書（JSON/YAML）を自動生成し、Swagger UI で対話的なドキュメントを提供できます。アノテーションでエンドポイントの説明、パラメータ、レスポンス型を記述し、実装とドキュメントの乖離を防ぎます。依存関係を追加するだけで /swagger-ui.html からアクセスできます。",
        code: `// springdoc-openapi の設定
// build.gradle
// dependencies {
//   implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'
// }

// application.yml
// springdoc:
//   api-docs:
//     path: /api-docs        # OpenAPI JSONのパス
//   swagger-ui:
//     path: /swagger-ui.html # Swagger UIのパス
//     tags-sorter: alpha      # タグのアルファベット順ソート
//   info:
//     title: ユーザー管理API
//     version: v1.0.0
//     description: ユーザーの登録・管理を行うREST API

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
            .info(new Info()
                .title("ECサイトAPI")
                .version("2.0.0")
                .description("商品管理・注文処理API")
                .contact(new Contact()
                    .name("開発チーム")
                    .email("dev@example.com")))
            .addSecurityItem(new SecurityRequirement()
                .addList("bearerAuth"))
            .components(new Components()
                .addSecuritySchemes("bearerAuth",
                    new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")));
    }
}`,
      },
      {
        title: "アノテーションによるAPI記述",
        content:
          "springdoc-openapi のアノテーションを使って、API の詳細な仕様を記述します。@Operation でエンドポイントの説明、@Parameter でパラメータの説明、@ApiResponse でレスポンスの型とステータスコード、@Schema でモデルのフィールド説明を定義します。これにより、Swagger UI でクライアント開発者がAPI の仕様を正確に理解し、Try it out 機能で実際に API を呼び出してテストできます。",
        code: `// アノテーションで詳細なAPI仕様を記述
@RestController
@RequestMapping("/api/v1/products")
@Tag(name = "商品管理", description = "商品のCRUD操作")
public class DocumentedProductController {

    @Operation(
        summary = "商品を検索する",
        description = "カテゴリ・価格帯・キーワードで商品を絞り込み検索します")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "検索成功"),
        @ApiResponse(responseCode = "400", description = "パラメータ不正",
            content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @GetMapping
    public PageResponse<ProductDto> searchProducts(
            @Parameter(description = "カテゴリ名", example = "electronics")
            @RequestParam(required = false) String category,
            @Parameter(description = "最低価格", example = "1000")
            @RequestParam(required = false) BigDecimal priceMin) {
        // 実装
        return null;
    }

    @Operation(summary = "商品を登録する")
    @ApiResponse(responseCode = "201", description = "登録成功")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto createProduct(
            @Valid @RequestBody CreateProductRequest request) {
        return null;
    }
}

// リクエスト/レスポンスDTOにSchemaを付与
@Schema(description = "商品登録リクエスト")
record CreateProductRequest(
    @Schema(description = "商品名", example = "Java入門書", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank String name,
    @Schema(description = "価格（税込）", example = "2980", minimum = "0")
    @Positive BigDecimal price
) {}`,
      },
      {
        title: "Swagger UI の活用",
        content:
          "Swagger UI は OpenAPI 仕様書を視覚化する Web インターフェースです。エンドポイントの一覧表示、パラメータの説明、リクエスト/レスポンスの例、「Try it out」による API のテスト実行が可能です。グループ化（@Tag）でエンドポイントを分類し、認証トークンを設定して保護された API もテストできます。本番環境では Swagger UI を無効化するか、アクセス制限をかけるのが一般的です。",
        code: `// Swagger UIの設定カスタマイズ
// application.yml
// springdoc:
//   swagger-ui:
//     path: /swagger-ui.html
//     display-request-duration: true  # リクエスト時間を表示
//     filter: true                    # 検索フィルター有効
//     try-it-out-enabled: true        # Try it outをデフォルト有効
//     default-models-expand-depth: 2  # モデルの展開深さ
//   # 本番環境で無効化
//   # api-docs.enabled: false

// プロファイルで本番環境のSwagger UIを無効化
@Configuration
@Profile("!production")
public class SwaggerConfig {
    // 開発・ステージング環境でのみSwagger UIを有効化
}

// グループ化で大規模APIを整理
@Configuration
public class SwaggerGroupConfig {
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
            .group("公開API")
            .pathsToMatch("/api/v1/**")
            .pathsToExclude("/api/v1/admin/**")
            .build();
    }

    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
            .group("管理者API")
            .pathsToMatch("/api/v1/admin/**")
            .build();
    }
}

// アクセス: http://localhost:8080/swagger-ui.html
// OpenAPI JSON: http://localhost:8080/api-docs
// OpenAPI YAML: http://localhost:8080/api-docs.yaml`,
      },
      {
        title: "コード生成",
        content:
          "OpenAPI 仕様書からクライアントコードやサーバースタブを自動生成できます。openapi-generator は Java、TypeScript、Python など多数の言語に対応し、Maven/Gradle プラグインで CI/CD に組み込めます。API ファーストの開発では、まず OpenAPI 仕様書を作成し、そこからサーバーとクライアントのコードを生成するアプローチが推奨されます。仕様書が唯一の真実の源（Single Source of Truth）となり、実装の整合性を保証します。",
        code: `// OpenAPI Generatorの設定（build.gradle）
// plugins {
//   id 'org.openapi.generator' version '7.2.0'
// }
//
// openApiGenerate {
//   generatorName = "spring"
//   inputSpec = "$rootDir/src/main/resources/openapi/api-spec.yaml"
//   outputDir = "$buildDir/generated"
//   apiPackage = "com.example.api"
//   modelPackage = "com.example.model"
//   configOptions = [
//     interfaceOnly: "true",         // インターフェースのみ生成
//     useSpringBoot3: "true",
//     useTags: "true",
//     dateLibrary: "java8"
//   ]
// }

// 生成されたインターフェースを実装
// public interface UsersApi {
//     @GetMapping("/api/v1/users/{id}")
//     ResponseEntity<UserDto> getUser(@PathVariable Long id);
// }

@RestController
public class UserApiImpl implements UsersApi {
    private final UserService userService;

    public UserApiImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public ResponseEntity<UserDto> getUser(Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }
}

// TypeScriptクライアント生成:
// npx openapi-generator-cli generate \\
//   -i http://localhost:8080/api-docs \\
//   -g typescript-axios \\
//   -o ./generated-client`,
      },
      {
        title: "API仕様書のベストプラクティス",
        content:
          "良い API 仕様書は開発効率を大幅に向上させます。ベストプラクティスとして (1) リクエスト・レスポンスの例（example）を必ず含める、(2) エラーレスポンスの型を全パターン定義する、(3) enum 値を明示する、(4) バリデーションルール（最大長、パターン等）を記述する、(5) 認証方式を明確にする、(6) レート制限の情報を含める。仕様書のレビューを開発プロセスに組み込み、フロントエンドとバックエンドの認識合わせに活用しましょう。",
      },
    ],
  },
  {
    id: "http-client",
    title: "HTTPクライアント",
    category: "implementation",
    description:
      "RestClient（Spring 6.1）、WebClient、HttpClient、リトライ・タイムアウト設定",
    sections: [
      {
        title: "RestClient（Spring 6.1+）",
        content:
          "RestClient は Spring Framework 6.1 で導入された新しい同期 HTTP クライアントです。RestTemplate の後継として設計され、流暢な（fluent）API で直感的にリクエストを構築できます。WebClient のような関数型スタイルでありながら同期処理に特化しており、コードがシンプルです。Spring Boot 3.2+ で推奨される HTTP クライアントで、RestTemplate からの移行も容易です。",
        code: `// RestClient の基本的な使い方（Spring Boot 3.2+）
@Configuration
public class RestClientConfig {
    @Bean
    public RestClient restClient(RestClient.Builder builder) {
        return builder
            .baseUrl("https://api.example.com")
            .defaultHeader("Accept", "application/json")
            .defaultHeader("X-API-Key", "your-api-key")
            .requestInterceptor((req, body, exec) -> {
                long start = System.currentTimeMillis();
                var response = exec.execute(req, body);
                long elapsed = System.currentTimeMillis() - start;
                System.out.printf("API呼び出し: %s %s (%dms)%n",
                    req.getMethod(), req.getURI(), elapsed);
                return response;
            })
            .build();
    }
}

@Service
public class UserApiClient {
    private final RestClient restClient;

    public UserApiClient(RestClient restClient) {
        this.restClient = restClient;
    }

    // GET リクエスト
    public UserDto getUser(Long id) {
        return restClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .body(UserDto.class);
    }

    // POST リクエスト
    public UserDto createUser(CreateUserRequest request) {
        return restClient.post()
            .uri("/users")
            .contentType(MediaType.APPLICATION_JSON)
            .body(request)
            .retrieve()
            .body(UserDto.class);
    }

    // エラーハンドリング付き
    public Optional<UserDto> findUser(Long id) {
        return restClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .onStatus(HttpStatusCode::is4xxClientError, (req, res) -> {
                if (res.getStatusCode() == HttpStatus.NOT_FOUND) return;
                throw new RuntimeException("APIエラー: " + res.getStatusCode());
            })
            .body(new ParameterizedTypeReference<>() {});
    }
}`,
      },
      {
        title: "WebClient（リアクティブ）",
        content:
          "WebClient は Spring WebFlux の非同期・ノンブロッキング HTTP クライアントです。Reactor の Mono/Flux を返し、リアクティブプログラミングモデルに適しています。同時に多数の HTTP リクエストを効率的に処理でき、マイクロサービス間の通信で高いスループットが求められる場合に有効です。block() で同期的に使うこともできますが、リアクティブスタック全体で使う方が効果的です。",
        code: `// WebClient の非同期/同期利用
@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient(WebClient.Builder builder) {
        return builder
            .baseUrl("https://api.example.com")
            .defaultHeader("Accept", "application/json")
            .filter(ExchangeFilterFunction.ofRequestProcessor(req -> {
                System.out.println("リクエスト: " + req.url());
                return Mono.just(req);
            }))
            .build();
    }
}

@Service
public class AsyncApiClient {
    private final WebClient webClient;

    public AsyncApiClient(WebClient webClient) {
        this.webClient = webClient;
    }

    // 非同期でユーザー取得
    public Mono<UserDto> getUserAsync(Long id) {
        return webClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .bodyToMono(UserDto.class)
            .onErrorResume(WebClientResponseException.NotFound.class,
                e -> Mono.empty());
    }

    // 複数APIを並行呼び出し
    public Mono<DashboardDto> getDashboard(Long userId) {
        Mono<UserDto> userMono = getUserAsync(userId);
        Mono<List<OrderDto>> ordersMono = webClient.get()
            .uri("/users/{id}/orders", userId)
            .retrieve()
            .bodyToFlux(OrderDto.class)
            .collectList();

        // 並行実行して結果を合成
        return Mono.zip(userMono, ordersMono, DashboardDto::new);
    }

    // 同期的に使う場合（ブロッキング）
    public UserDto getUserSync(Long id) {
        return getUserAsync(id).block(); // ブロックして待つ
    }
}`,
      },
      {
        title: "Java標準 HttpClient",
        content:
          "Java 11 で導入された java.net.http.HttpClient は、JDK 標準の HTTP クライアントです。HTTP/2 をネイティブサポートし、同期・非同期の両方に対応します。外部ライブラリ不要で使用でき、Spring 以外の環境やライトウェイトなアプリケーションに適しています。CompletableFuture を使った非同期処理、WebSocket のサポートも備えています。",
        code: `// Java標準HttpClientの使い方
import java.net.http.*;
import java.net.URI;

public class JavaHttpClientExample {

    private static final HttpClient client = HttpClient.newBuilder()
        .version(HttpClient.Version.HTTP_2)  // HTTP/2使用
        .connectTimeout(Duration.ofSeconds(10))
        .followRedirects(HttpClient.Redirect.NORMAL)
        .build();

    // 同期GETリクエスト
    public static String getUser(Long id) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/users/" + id))
            .header("Accept", "application/json")
            .GET()
            .timeout(Duration.ofSeconds(5))
            .build();

        HttpResponse<String> response = client.send(
            request, HttpResponse.BodyHandlers.ofString());
        System.out.println("ステータス: " + response.statusCode());
        return response.body();
    }

    // 非同期POSTリクエスト
    public static CompletableFuture<String> createUserAsync(String json) {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/users"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        return client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body);
    }

    public static void main(String[] args) throws Exception {
        // 同期呼び出し
        String user = getUser(1L);
        System.out.println("ユーザー: " + user);

        // 非同期呼び出し
        createUserAsync("{\"name\":\"田中\"}")
            .thenAccept(body -> System.out.println("作成結果: " + body))
            .join();
    }
}`,
      },
      {
        title: "リトライとタイムアウト",
        content:
          "外部 API 呼び出しには必ずタイムアウトとリトライを設定します。接続タイムアウト（サーバーへの接続確立まで）とリードタイムアウト（レスポンス受信まで）を分けて設定します。リトライは一時的な障害（ネットワーク瞬断、503 Service Unavailable）に対して有効で、指数バックオフ（Exponential Backoff）で待機時間を増加させます。冪等でない操作（POST での作成など）はリトライに注意が必要です。",
        code: `// タイムアウトとリトライの設定
@Configuration
public class HttpClientConfig {

    @Bean
    public RestClient restClient(RestClient.Builder builder) {
        // タイムアウト設定
        var requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(Duration.ofSeconds(5));  // 接続タイムアウト
        requestFactory.setReadTimeout(Duration.ofSeconds(10));    // 読み取りタイムアウト

        return builder
            .baseUrl("https://api.example.com")
            .requestFactory(requestFactory)
            .build();
    }
}

// Spring Retryによるリトライ設定
// build.gradle: implementation 'org.springframework.retry:spring-retry'
@Service
public class ResilientApiClient {

    private final RestClient restClient;

    // 指数バックオフでリトライ
    @Retryable(
        retryFor = {ResourceAccessException.class, HttpServerErrorException.class},
        maxAttempts = 3,
        backoff = @Backoff(delay = 1000, multiplier = 2) // 1s→2s→4s
    )
    public UserDto getUser(Long id) {
        System.out.println("API呼び出し試行: " + LocalTime.now());
        return restClient.get()
            .uri("/users/{id}", id)
            .retrieve()
            .body(UserDto.class);
    }

    // 全リトライ失敗時のフォールバック
    @Recover
    public UserDto getUserFallback(Exception ex, Long id) {
        System.err.println("全リトライ失敗: " + ex.getMessage());
        return new UserDto(id, "取得不可", "N/A");
    }
}`,
      },
      {
        title: "HTTPクライアントの選び方",
        content:
          "HTTP クライアントは用途に応じて選択します。RestClient（推奨）は Spring Boot 3.2+ のデフォルトで、同期処理に最適です。WebClient はリアクティブ/非同期処理、並行リクエストが多い場合に選びます。Java HttpClient は Spring 以外の環境や依存関係を最小化したい場合に適しています。いずれの場合も、タイムアウト、リトライ、エラーハンドリング、ログ出力を必ず設定します。",
      },
    ],
  },
  {
    id: "file-upload-download",
    title: "ファイル操作API",
    category: "implementation",
    description:
      "マルチパートアップロード、ストリーミングダウンロード、S3連携",
    sections: [
      {
        title: "ファイルアップロード",
        content:
          "REST API でのファイルアップロードは multipart/form-data 形式で行います。Spring Boot では MultipartFile でファイルを受け取り、最大ファイルサイズや許可するファイル形式のバリデーションを行います。セキュリティの観点から、ファイル名のサニタイズ、MIME タイプの検証、ファイルサイズの制限、アップロード先ディレクトリの制限が重要です。大容量ファイルはストリーミングで処理し、メモリ消費を抑えます。",
        code: `// ファイルアップロードAPI
@RestController
@RequestMapping("/api/v1/files")
public class FileUploadController {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private static final Set<String> ALLOWED_TYPES =
        Set.of("image/jpeg", "image/png", "application/pdf");

    private final FileStorageService storageService;

    public FileUploadController(FileStorageService storageService) {
        this.storageService = storageService;
    }

    // 単一ファイルアップロード
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public FileResponse uploadFile(@RequestParam("file") MultipartFile file) {
        // バリデーション
        if (file.isEmpty()) {
            throw new BadRequestException("ファイルが空です");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new BadRequestException("ファイルサイズ上限: 10MB");
        }
        if (!ALLOWED_TYPES.contains(file.getContentType())) {
            throw new BadRequestException("許可されないファイル形式です");
        }

        // ファイル名をサニタイズして保存
        String safeFileName = sanitizeFileName(file.getOriginalFilename());
        String storedPath = storageService.store(file, safeFileName);

        return new FileResponse(safeFileName, storedPath, file.getSize());
    }

    // 複数ファイルアップロード
    @PostMapping(value = "/batch", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public List<FileResponse> uploadMultiple(
            @RequestParam("files") List<MultipartFile> files) {
        return files.stream().map(this::uploadFile).toList();
    }

    private String sanitizeFileName(String name) {
        return name.replaceAll("[^a-zA-Z0-9.\\-_]", "_");
    }
}`,
      },
      {
        title: "ファイルダウンロード",
        content:
          "ファイルダウンロードは Content-Disposition ヘッダーでブラウザにダウンロードを指示します。小さなファイルは byte[] で返せますが、大きなファイルは StreamingResponseBody や InputStreamResource でストリーミング配信し、メモリ消費を抑えます。Content-Type を正しく設定し、ファイル名に日本語を含む場合は RFC 5987 に従ってエンコードします。Range ヘッダーに対応すると、ダウンロードの中断・再開が可能になります。",
        code: `// ファイルダウンロードAPI
@RestController
@RequestMapping("/api/v1/files")
public class FileDownloadController {

    private final FileStorageService storageService;

    public FileDownloadController(FileStorageService storageService) {
        this.storageService = storageService;
    }

    // ストリーミングダウンロード（大容量ファイル対応）
    @GetMapping("/{fileId}/download")
    public ResponseEntity<StreamingResponseBody> downloadFile(
            @PathVariable String fileId) {

        FileMetadata metadata = storageService.getMetadata(fileId);

        StreamingResponseBody stream = outputStream -> {
            try (var inputStream = storageService.getInputStream(fileId)) {
                inputStream.transferTo(outputStream); // ストリーミング転送
            }
        };

        // 日本語ファイル名のエンコード
        String encodedFileName = URLEncoder.encode(
            metadata.getFileName(), StandardCharsets.UTF_8)
            .replace("+", "%20");

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename*=UTF-8''" + encodedFileName)
            .contentType(MediaType.parseMediaType(metadata.getContentType()))
            .contentLength(metadata.getFileSize())
            .body(stream);
    }

    // 画像のインライン表示
    @GetMapping("/{fileId}/preview")
    public ResponseEntity<InputStreamResource> previewImage(
            @PathVariable String fileId) {
        FileMetadata metadata = storageService.getMetadata(fileId);
        var resource = new InputStreamResource(
            storageService.getInputStream(fileId));

        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_DISPOSITION, "inline")
            .contentType(MediaType.parseMediaType(metadata.getContentType()))
            .body(resource);
    }
}`,
      },
      {
        title: "Amazon S3連携",
        content:
          "本番環境ではファイルをローカルディスクではなく Amazon S3 などのオブジェクトストレージに保存します。S3 はスケーラブルで耐久性が高く、CloudFront と組み合わせて CDN 配信も可能です。AWS SDK for Java 2.x を使って S3 にアップロード・ダウンロードし、Pre-Signed URL を発行してクライアントから直接 S3 にアクセスさせることもできます。これにより、アプリケーションサーバーの負荷を軽減できます。",
        code: `// Amazon S3 ファイルストレージサービス
@Service
public class S3StorageService {
    private final S3Client s3Client;
    private final String bucketName;

    public S3StorageService(S3Client s3Client,
                             @Value("\${aws.s3.bucket}") String bucketName) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
    }

    // S3にアップロード
    public String upload(MultipartFile file, String key) throws IOException {
        PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucketName)
            .key(key) // S3上のパス（例: uploads/2024/01/file.jpg）
            .contentType(file.getContentType())
            .build();

        s3Client.putObject(request,
            RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        System.out.println("S3アップロード完了: " + key);
        return key;
    }

    // S3からダウンロード
    public InputStream download(String key) {
        GetObjectRequest request = GetObjectRequest.builder()
            .bucket(bucketName)
            .key(key)
            .build();
        return s3Client.getObject(request);
    }

    // Pre-Signed URL生成（クライアント直接アクセス用）
    public String generatePresignedUrl(String key, Duration expiration) {
        var presigner = S3Presigner.create();
        var request = GetObjectPresignRequest.builder()
            .signatureDuration(expiration)
            .getObjectRequest(b -> b.bucket(bucketName).key(key))
            .build();
        return presigner.presignGetObject(request).url().toString();
    }
}

// Pre-Signed URLをクライアントに返す
// GET /api/v1/files/{id}/url → { "url": "https://s3...?X-Amz-..." }`,
      },
      {
        title: "アップロードの進捗とチャンク転送",
        content:
          "大容量ファイルのアップロードでは、チャンク（分割）アップロードが有効です。クライアントがファイルを小さなチャンクに分割して順次送信し、サーバー側で結合します。S3 のマルチパートアップロードを使うと、5GB 以上のファイルも効率的にアップロードでき、中断時は途中から再開可能です。WebSocket やSSE でアップロードの進捗をリアルタイムにクライアントに通知することもできます。",
        code: `// チャンクアップロードAPIの実装
@RestController
@RequestMapping("/api/v1/uploads")
public class ChunkUploadController {

    private final Map<String, List<byte[]>> uploadSessions = new ConcurrentHashMap<>();

    // アップロードセッション開始
    @PostMapping("/init")
    public Map<String, String> initUpload(@RequestBody InitUploadRequest req) {
        String uploadId = UUID.randomUUID().toString();
        uploadSessions.put(uploadId, new ArrayList<>());
        System.out.println("アップロード開始: " + req.fileName());
        return Map.of("uploadId", uploadId);
    }

    // チャンクを受信
    @PostMapping("/{uploadId}/chunks/{chunkIndex}")
    public Map<String, Object> uploadChunk(
            @PathVariable String uploadId,
            @PathVariable int chunkIndex,
            @RequestParam("chunk") MultipartFile chunk) throws IOException {

        var chunks = uploadSessions.get(uploadId);
        if (chunks == null) throw new RuntimeException("セッション不明");

        // チャンクを保存
        while (chunks.size() <= chunkIndex) chunks.add(null);
        chunks.set(chunkIndex, chunk.getBytes());

        long received = chunks.stream().filter(Objects::nonNull).count();
        System.out.printf("チャンク受信: %d/%d%n", received, chunks.size());
        return Map.of("chunkIndex", chunkIndex, "received", received);
    }

    // アップロード完了（チャンクを結合）
    @PostMapping("/{uploadId}/complete")
    @ResponseStatus(HttpStatus.CREATED)
    public FileResponse completeUpload(@PathVariable String uploadId) throws IOException {
        var chunks = uploadSessions.remove(uploadId);
        // チャンクを結合してファイルに保存
        var outputStream = new ByteArrayOutputStream();
        for (byte[] chunk : chunks) {
            outputStream.write(chunk);
        }
        System.out.println("チャンク結合完了: " + outputStream.size() + " bytes");
        return new FileResponse("uploaded-file", "/files/" + uploadId, outputStream.size());
    }
}`,
      },
      {
        title: "ファイルAPI設計のベストプラクティス",
        content:
          "ファイル操作 API の設計ポイントは (1) ファイルサイズ制限を設定（spring.servlet.multipart.max-file-size）、(2) MIME タイプを検証し、拡張子だけで判断しない、(3) アップロードされたファイル名は使わず UUID 等で保存、(4) ウイルススキャンの実施、(5) アクセス制御（認証済みユーザーのみ）、(6) CDN からの配信でサーバー負荷を軽減。大容量ファイルの場合は Pre-Signed URL でクライアント直接アップロードが効率的です。",
      },
    ],
  },

  // ===== 運用・品質 =====
  {
    id: "api-security",
    title: "API認証・セキュリティ",
    category: "operations",
    description:
      "APIキー、JWT Bearer、OAuth2、CORS、レート制限によるAPIの保護",
    sections: [
      {
        title: "APIキー認証",
        content:
          "API キー認証は最もシンプルな認証方式で、クライアントにユニークなキーを発行し、リクエストヘッダー（X-API-Key）またはクエリパラメータで送信します。実装が容易で、サーバー間通信やパブリック API の利用制限に適しています。ただし、API キーだけではユーザーの識別ができず、キーの漏洩リスクもあるため、重要な操作には JWT や OAuth2 との併用が推奨されます。キーはハッシュ化して保存し、定期的なローテーションの仕組みを用意します。",
        code: `// APIキー認証フィルターの実装
@Component
public class ApiKeyFilter extends OncePerRequestFilter {

    private final ApiKeyRepository apiKeyRepository;

    // APIキーが不要なパス
    private static final Set<String> EXCLUDED_PATHS =
        Set.of("/api/v1/auth", "/actuator/health", "/swagger-ui");

    public ApiKeyFilter(ApiKeyRepository apiKeyRepository) {
        this.apiKeyRepository = apiKeyRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        // 除外パスはスキップ
        if (EXCLUDED_PATHS.stream().anyMatch(path::startsWith)) {
            filterChain.doFilter(request, response);
            return;
        }

        // APIキーの検証
        String apiKey = request.getHeader("X-API-Key");
        if (apiKey == null || !apiKeyRepository.isValidKey(apiKey)) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json");
            response.getWriter().write(
                "{\"error\":\"無効なAPIキーです\"}");
            return;
        }

        // キーに紐づくクライアント情報をリクエストに付与
        var client = apiKeyRepository.findByKey(apiKey);
        request.setAttribute("apiClient", client);
        filterChain.doFilter(request, response);
    }
}`,
      },
      {
        title: "JWT Bearer認証",
        content:
          "JWT（JSON Web Token）は、ステートレスなトークンベース認証の標準です。ログイン時にサーバーが JWT を発行し、クライアントは Authorization: Bearer <token> ヘッダーで送信します。JWT はペイロードにユーザー情報（subject、roles等）を含み、署名で改ざんを検知します。セッション管理が不要でスケーラブルですが、トークンの失効が即座にできないデメリットがあります。リフレッシュトークンと組み合わせて使います。",
        code: `// JWT認証の実装（Spring Security）
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable()) // REST APIではCSRF不要
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/auth/**").permitAll()
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 ->
                oauth2.jwt(Customizer.withDefaults())) // JWT検証
            .build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(
            new SecretKeySpec("your-256-bit-secret-key-here-32ch".getBytes(),
                "HmacSHA256")).build();
    }
}

// JWTトークン発行
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @PostMapping("/login")
    public TokenResponse login(@RequestBody LoginRequest request) {
        // ユーザー認証処理...
        String token = Jwts.builder()
            .subject(user.getId().toString())
            .claim("roles", user.getRoles())
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 3600_000))
            .signWith(secretKey)
            .compact();
        return new TokenResponse(token, "Bearer", 3600);
    }
}`,
      },
      {
        title: "OAuth2",
        content:
          "OAuth2 は認可のためのフレームワークで、サードパーティアプリケーションにリソースへのアクセス権を委譲する仕組みです。認可コードフロー（Web アプリ）、PKCE 付き認可コード（SPA/モバイル）、クライアントクレデンシャル（サーバー間通信）の各フローがあります。Spring Security OAuth2 Resource Server でJWT ベースのアクセストークンを検証し、Spring Authorization Server で認可サーバーを構築できます。Keycloak などの IDaaS も選択肢です。",
        code: `// OAuth2 Resource Server設定（Spring Security）
// application.yml
// spring:
//   security:
//     oauth2:
//       resourceserver:
//         jwt:
//           issuer-uri: https://auth.example.com/realms/myapp
//           # または jwk-set-uri: https://auth.example.com/.well-known/jwks.json

@Configuration
@EnableWebSecurity
public class OAuth2ResourceServerConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasAuthority("SCOPE_admin")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(
                    jwtAuthConverter())))
            .build();
    }

    // JWTのClaimsからSpring Securityの権限に変換
    private JwtAuthenticationConverter jwtAuthConverter() {
        var converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            var roles = jwt.getClaimAsStringList("roles");
            if (roles == null) return List.of();
            return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        });
        return converter;
    }
}

// 認証済みユーザー情報の取得
@GetMapping("/api/v1/me")
public UserProfile getProfile(@AuthenticationPrincipal Jwt jwt) {
    String userId = jwt.getSubject();
    String email = jwt.getClaimAsString("email");
    return new UserProfile(userId, email);
}`,
      },
      {
        title: "CORS設定",
        content:
          "CORS（Cross-Origin Resource Sharing）は、異なるオリジン（ドメイン）からの API アクセスを制御する仕組みです。ブラウザはセキュリティのため、異なるオリジンへのリクエストを制限しますが、サーバーが適切な CORS ヘッダーを返すことで許可できます。Access-Control-Allow-Origin でアクセス元、Access-Control-Allow-Methods で HTTP メソッド、Access-Control-Allow-Headers でヘッダーを指定します。ワイルドカード（*）は開発用にのみ使い、本番では具体的なオリジンを指定します。",
        code: `// CORS設定（Spring Boot）
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            // 許可するオリジン（本番は具体的に指定）
            .allowedOrigins(
                "https://www.example.com",
                "https://admin.example.com")
            // 許可するHTTPメソッド
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
            // 許可するヘッダー
            .allowedHeaders("Authorization", "Content-Type", "X-API-Key")
            // レスポンスで公開するヘッダー
            .exposedHeaders("X-Total-Count", "X-Request-Id")
            // Cookie送信を許可
            .allowCredentials(true)
            // プリフライトキャッシュ時間（秒）
            .maxAge(3600);
    }
}

// Security設定内でのCORS有効化
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable())
        .build();
}

@Bean
public CorsConfigurationSource corsConfigurationSource() {
    var config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("https://www.example.com"));
    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
    config.setAllowedHeaders(List.of("*"));
    config.setAllowCredentials(true);

    var source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
}`,
      },
      {
        title: "レート制限",
        content:
          "レート制限は API の過負荷を防ぎ、公平なリソース配分を実現する仕組みです。Token Bucket（トークンバケット）アルゴリズムが一般的で、一定速度でトークンを補充し、リクエストごとにトークンを消費します。バケットが空になるとリクエストを拒否（429 Too Many Requests）します。Spring Cloud Gateway の RequestRateLimiter（Redis ベース）や、Bucket4j（インメモリ/分散キャッシュ対応）で実装できます。レート制限情報はレスポンスヘッダーで通知します。",
        code: `// Bucket4jによるレート制限の実装
// build.gradle
// implementation 'com.bucket4j:bucket4j-core:8.7.0'

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    // ユーザーごとのレート制限バケット
    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket createBucket() {
        return Bucket.builder()
            .addLimit(Bandwidth.builder()
                .capacity(100)          // バケット容量: 100トークン
                .refillGreedy(100, Duration.ofMinutes(1)) // 1分で100トークン補充
                .build())
            .build();
    }

    @Override
    public boolean preHandle(HttpServletRequest request,
            HttpServletResponse response, Object handler) throws Exception {
        String clientId = resolveClientId(request);
        Bucket bucket = buckets.computeIfAbsent(clientId, k -> createBucket());

        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);

        // レート制限情報をヘッダーに付与
        response.setHeader("X-RateLimit-Remaining",
            String.valueOf(probe.getRemainingTokens()));
        response.setHeader("X-RateLimit-Limit", "100");

        if (probe.isConsumed()) {
            return true; // リクエスト許可
        }

        // 制限超過: 429 Too Many Requests
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setHeader("Retry-After",
            String.valueOf(probe.getNanosToWaitForRefill() / 1_000_000_000));
        response.getWriter().write("{\"error\":\"レート制限超過\"}");
        return false;
    }

    private String resolveClientId(HttpServletRequest request) {
        String apiKey = request.getHeader("X-API-Key");
        return apiKey != null ? apiKey : request.getRemoteAddr();
    }
}`,
      },
    ],
  },
  {
    id: "api-testing-docs",
    title: "APIテスト・ドキュメント",
    category: "operations",
    description:
      "REST Assured、Spring MockMvc、コントラクトテスト、APIドキュメント自動生成",
    sections: [
      {
        title: "Spring MockMvcによるテスト",
        content:
          "MockMvc は Spring MVC のテストフレームワークで、HTTP サーバーを起動せずにコントローラーをテストできます。リクエストの構築、レスポンスの検証、JSON パスによるフィールドの検証が可能です。@WebMvcTest で必要なコントローラーのみをロードし、依存サービスは @MockBean でモック化します。高速に実行でき、単体テストとしてコントローラーの動作を検証するのに最適です。",
        code: `// MockMvcによるコントローラーテスト
@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @DisplayName("GET /api/v1/users/{id} - ユーザー取得成功")
    void getUser_存在するID_200を返す() throws Exception {
        // Arrange
        var user = new UserResponse(1L, "田中太郎", "tanaka@example.com");
        when(userService.findById(1L)).thenReturn(user);

        // Act & Assert
        mockMvc.perform(get("/api/v1/users/1")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("田中太郎"))
            .andExpect(jsonPath("$.email").value("tanaka@example.com"));
    }

    @Test
    @DisplayName("POST /api/v1/users - バリデーションエラー")
    void createUser_空のリクエスト_400を返す() throws Exception {
        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"\",\"email\":\"invalid\"}"))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"));
    }

    @Test
    @DisplayName("GET /api/v1/users/{id} - 存在しないID")
    void getUser_存在しないID_404を返す() throws Exception {
        when(userService.findById(999L))
            .thenThrow(new ResourceNotFoundException("ユーザーが見つかりません"));

        mockMvc.perform(get("/api/v1/users/999"))
            .andExpect(status().isNotFound());
    }
}`,
      },
      {
        title: "REST Assuredによるテスト",
        content:
          "REST Assured は Java 向けの REST API テストライブラリで、BDD スタイル（given/when/then）で直感的にテストを記述できます。実際に HTTP リクエストを送信するため、統合テストや E2E テストに適しています。@SpringBootTest と組み合わせて内蔵サーバーに対してテストを実行し、JSON の検証、ヘッダーの検証、レスポンス時間の検証などが可能です。Testcontainers と組み合わせると DB を含めた完全な統合テストが実現できます。",
        code: `// REST Assuredによる統合テスト
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiIntegrationTest {

    @LocalServerPort
    private int port;

    @BeforeEach
    void setup() {
        RestAssured.port = port;
        RestAssured.basePath = "/api/v1";
    }

    @Test
    @DisplayName("ユーザーのCRUD操作を検証")
    void userCrudTest() {
        // POST: ユーザー作成
        Long userId =
            given()
                .contentType(ContentType.JSON)
                .body("""
                    {"name": "田中太郎", "email": "tanaka@example.com"}
                    """)
            .when()
                .post("/users")
            .then()
                .statusCode(201)
                .body("name", equalTo("田中太郎"))
                .extract().jsonPath().getLong("id");

        // GET: 作成したユーザーを取得
        given()
        .when()
            .get("/users/{id}", userId)
        .then()
            .statusCode(200)
            .body("id", equalTo(userId.intValue()))
            .body("name", equalTo("田中太郎"))
            .body("email", equalTo("tanaka@example.com"));

        // PUT: ユーザー更新
        given()
            .contentType(ContentType.JSON)
            .body("{\"name\": \"田中次郎\", \"email\": \"jiro@example.com\"}")
        .when()
            .put("/users/{id}", userId)
        .then()
            .statusCode(200)
            .body("name", equalTo("田中次郎"));

        // DELETE: ユーザー削除
        given()
        .when()
            .delete("/users/{id}", userId)
        .then()
            .statusCode(204);
    }
}`,
      },
      {
        title: "コントラクトテスト",
        content:
          "コントラクトテスト（Consumer-Driven Contract Test）は、API の提供者（Producer）と利用者（Consumer）の間の契約（Contract）をテストで保証する手法です。Spring Cloud Contract を使うと、契約を DSL で定義し、Producer 側ではスタブを自動生成して実装を検証、Consumer 側ではスタブを使ってテストを実行します。マイクロサービス間の結合部分を個別にテストでき、統合テストの実行コストを削減できます。",
        code: `// Spring Cloud Contract（Producer側）
// contracts/shouldReturnUser.groovy
// Contract.make {
//     description "ユーザーIDで取得する"
//     request {
//         method GET()
//         url "/api/v1/users/1"
//         headers {
//             accept(applicationJson())
//         }
//     }
//     response {
//         status OK()
//         headers {
//             contentType(applicationJson())
//         }
//         body([
//             id: 1,
//             name: "田中太郎",
//             email: "tanaka@example.com"
//         ])
//     }
// }

// Producer側のベースクラス
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
public abstract class ContractBaseTest {

    @Autowired
    private UserController userController;

    @MockBean
    private UserService userService;

    @BeforeEach
    void setup() {
        RestAssuredMockMvc.standaloneSetup(userController);

        // コントラクトに合わせてモックを設定
        when(userService.findById(1L))
            .thenReturn(new UserResponse(1L, "田中太郎", "tanaka@example.com"));
    }
}

// Consumer側：スタブを使ったテスト
// @AutoConfigureStubRunner(
//     ids = "com.example:user-service:+:stubs:8090",
//     stubsMode = StubRunnerProperties.StubsMode.LOCAL)
// class OrderServiceContractTest {
//     @Test
//     void shouldGetUserFromStub() {
//         // スタブサーバーに対してリクエスト
//         var user = restClient.get()
//             .uri("http://localhost:8090/api/v1/users/1")
//             .retrieve().body(UserDto.class);
//         assertEquals("田中太郎", user.name());
//     }
// }`,
      },
      {
        title: "APIドキュメント自動生成",
        content:
          "API ドキュメントはコードと同期が取れていることが重要です。springdoc-openapi による Swagger UI に加え、Spring REST Docs はテストコードからドキュメントを生成する仕組みで、テストが通る＝ドキュメントが正確という保証が得られます。Asciidoctor と連携して HTML/PDF 形式のドキュメントを出力し、API のリクエスト例・レスポンス例・フィールド説明を含む完全なドキュメントを自動生成します。",
        code: `// Spring REST Docsによるドキュメント自動生成
@WebMvcTest(UserController.class)
@AutoConfigureRestDocs(outputDir = "build/generated-snippets")
class UserApiDocumentationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @DisplayName("GET /api/v1/users/{id} のドキュメント生成")
    void documentGetUser() throws Exception {
        var user = new UserResponse(1L, "田中太郎", "tanaka@example.com");
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/v1/users/{id}", 1)
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andDo(document("get-user",          // ドキュメントID
                pathParameters(
                    parameterWithName("id").description("ユーザーID")),
                responseFields(
                    fieldWithPath("id").description("ユーザーID"),
                    fieldWithPath("name").description("ユーザー名"),
                    fieldWithPath("email").description("メールアドレス"))
            ));
    }

    @Test
    @DisplayName("POST /api/v1/users のドキュメント生成")
    void documentCreateUser() throws Exception {
        var created = new UserResponse(1L, "田中太郎", "tanaka@example.com");
        when(userService.create(any())).thenReturn(created);

        mockMvc.perform(post("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"田中太郎\",\"email\":\"tanaka@example.com\"}"))
            .andExpect(status().isCreated())
            .andDo(document("create-user",
                requestFields(
                    fieldWithPath("name").description("ユーザー名"),
                    fieldWithPath("email").description("メールアドレス")),
                responseFields(
                    fieldWithPath("id").description("生成されたID"),
                    fieldWithPath("name").description("ユーザー名"),
                    fieldWithPath("email").description("メールアドレス"))
            ));
    }
}`,
      },
      {
        title: "APIテスト戦略",
        content:
          "API テストは複数のレベルで行います。(1) 単体テスト（MockMvc）：コントローラーのルーティング、バリデーション、エラーハンドリングを検証。(2) 統合テスト（REST Assured + Testcontainers）：DB を含めた完全な動作を検証。(3) コントラクトテスト（Spring Cloud Contract）：サービス間の契約を保証。(4) E2E テスト：実際のデプロイ環境で全体フローを検証。テストピラミッドに従い、単体テストを最も厚くし、上位レベルに行くほどテスト数を絞ります。",
      },
    ],
  },
];

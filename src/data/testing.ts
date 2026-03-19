export interface TestingSection {
  title: string;
  content: string;
  code?: string;
}

export interface TestingChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: TestingSection[];
}

export const testingCategories = [
  { id: "fundamentals", name: "テスト基礎", color: "#2563EB" },
  { id: "junit", name: "JUnit 5", color: "#25A162" },
  { id: "mockito", name: "Mockito・モック", color: "#DC2626" },
  { id: "spring-test", name: "Spring Boot テスト", color: "#6DB33F" },
  { id: "integration", name: "統合テスト", color: "#7C3AED" },
  { id: "viewpoint", name: "テスト観点", color: "#D97706" },
  { id: "quality", name: "品質・カバレッジ", color: "#0891B2" },
  { id: "advanced", name: "高度なテスト技法", color: "#9333EA" },
] as const;

export const testingChapters: TestingChapter[] = [
  // ===== テスト基礎 =====
  {
    id: "test-types",
    title: "テストの種類と目的",
    category: "fundamentals",
    description:
      "単体テスト、統合テスト、E2Eテスト、受け入れテストの違いと目的",
    sections: [
      {
        title: "テストピラミッド",
        content:
          "テストピラミッドは、テストを3層構造（単体テスト → 統合テスト → E2Eテスト）で分類するモデルです。上の層に行くほど実行が遅く、コストが高く、テスト数を少なくするのが原則です。単体テストを最も厚くすることで、高速なフィードバックと安定した品質を両立させます。",
        code: `/*
 * テストピラミッドの構造
 *
 *        /  E2E  \\           少数・遅い・高コスト
 *       /--------\\
 *      / 統合テスト \\         中程度
 *     /------------\\
 *    / 単体テスト     \\       多数・高速・低コスト
 *   /----------------\\
 *
 * 推奨比率の目安:
 *   単体テスト:   70%
 *   統合テスト:   20%
 *   E2Eテスト:   10%
 */

// 各層で使用する主なツール（Java）
// 単体テスト:   JUnit 5 + Mockito
// 統合テスト:   @SpringBootTest + Testcontainers
// E2Eテスト:    Selenium / Playwright`,
      },
      {
        title: "単体テスト（Unit Test）",
        content:
          "単体テストは、1つのクラスやメソッドを外部依存から独立させてテストします。外部依存（DB、API、ファイルなど）はモックに置き換えることで、高速に繰り返し実行できます。Java では JUnit 5 + Mockito が標準的な組み合わせです。",
        code: `// 単体テストの例: UserService のテスト
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("IDでユーザーを取得できる")
    void findById_存在するID_ユーザーを返す() {
        // Arrange: モックの振る舞いを定義
        User expected = new User(1L, "田中太郎");
        when(userRepository.findById(1L))
            .thenReturn(Optional.of(expected));

        // Act: テスト対象メソッドを実行
        User actual = userService.findById(1L);

        // Assert: 結果を検証
        assertEquals("田中太郎", actual.getName());
    }
}`,
      },
      {
        title: "統合テスト（Integration Test）",
        content:
          "統合テストは、複数のコンポーネントが正しく連携するかを検証します。DB接続、外部APIとの通信、メッセージキューなど、実際のインフラとの結合部分をテストします。Testcontainers を使えば、本番と同じDBをDockerで立ち上げてテストできます。",
        code: `// 統合テストの例: Repository + 実DB
@SpringBootTest
@Testcontainers
class UserRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void configureProperties(
            DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url",
            postgres::getJdbcUrl);
        registry.add("spring.datasource.username",
            postgres::getUsername);
        registry.add("spring.datasource.password",
            postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("ユーザーを保存して取得できる")
    void save_and_findById() {
        User user = new User("田中太郎", "tanaka@example.com");
        User saved = userRepository.save(user);

        Optional<User> found =
            userRepository.findById(saved.getId());
        assertTrue(found.isPresent());
        assertEquals("田中太郎", found.get().getName());
    }
}`,
      },
      {
        title: "E2Eテスト（End-to-End Test）",
        content:
          "E2Eテストは、ユーザーの操作フロー全体を再現し、システム全体が正しく動作することを確認します。Selenium や Playwright などのブラウザ自動化ツールを使い、実際のUI操作をシミュレートします。最も実行時間が長いですが、ユーザー視点での信頼性が高いテストです。",
        code: `// Selenium を使ったE2Eテストの例
class LoginE2ETest {

    private WebDriver driver;

    @BeforeEach
    void setUp() {
        driver = new ChromeDriver();
    }

    @AfterEach
    void tearDown() {
        driver.quit();
    }

    @Test
    @DisplayName("正しい認証情報でログインできる")
    void login_正しい認証情報_ダッシュボードに遷移() {
        // ログインページを開く
        driver.get("http://localhost:8080/login");

        // フォームに入力
        driver.findElement(By.id("username"))
            .sendKeys("admin");
        driver.findElement(By.id("password"))
            .sendKeys("password123");
        driver.findElement(By.id("login-btn")).click();

        // ダッシュボードに遷移したことを確認
        String currentUrl = driver.getCurrentUrl();
        assertTrue(currentUrl.contains("/dashboard"));

        // ウェルカムメッセージの確認
        String welcome = driver.findElement(
            By.className("welcome")).getText();
        assertEquals("ようこそ、adminさん", welcome);
    }
}`,
      },
      {
        title: "受け入れテスト（Acceptance Test）",
        content:
          "受け入れテストは、ビジネス要件を満たしているかを確認するテストです。BDD（振る舞い駆動開発）のGiven-When-Then形式で、非エンジニアにも理解しやすい形式で記述します。Java では Cucumber を使って実現できます。",
        code: `// Cucumber のフィーチャーファイル（.feature）
// login.feature
Feature: ユーザーログイン
  ユーザーとして
  正しい認証情報でログインしたい
  ダッシュボードにアクセスするために

  Scenario: 正しい認証情報でのログイン
    Given ユーザー "tanaka" が登録されている
    And パスワードが "secret123" である
    When ログインページで認証情報を入力する
    Then ダッシュボードが表示される

  Scenario: 誤ったパスワードでのログイン
    Given ユーザー "tanaka" が登録されている
    When 誤ったパスワードでログインする
    Then エラーメッセージ "認証に失敗しました" が表示される

// ステップ定義（Java）
public class LoginStepDefs {
    @Given("ユーザー {string} が登録されている")
    public void ユーザーが登録されている(String name) {
        userService.register(name, "secret123");
    }

    @When("ログインページで認証情報を入力する")
    public void ログイン認証情報を入力() {
        response = loginService.login("tanaka", "secret123");
    }

    @Then("ダッシュボードが表示される")
    public void ダッシュボードが表示される() {
        assertEquals(200, response.getStatusCode());
    }
}`,
      },
    ],
  },
  {
    id: "test-principles",
    title: "テスト設計の原則",
    category: "fundamentals",
    description: "FIRST原則、AAA パターン、テスト可能な設計",
    sections: [
      {
        title: "FIRST原則",
        content:
          "FIRST原則は、良い単体テストが満たすべき5つの特性です。Fast（高速に実行できる）、Independent（他のテストに依存しない）、Repeatable（何度実行しても同じ結果）、Self-validating（自動で合否を判定）、Timely（本番コードと同時に書く）の頭文字を取ったものです。",
        code: `// FIRST原則の実践例

// ❌ Fast に違反: テスト内で3秒スリープ
@Test
void bad_遅いテスト() throws Exception {
    service.startProcess();
    Thread.sleep(3000); // 遅い！
    assertEquals("完了", service.getStatus());
}

// ✅ Fast: モックで即座に結果を返す
@Test
void good_高速なテスト() {
    when(service.getStatus()).thenReturn("完了");
    assertEquals("完了", service.getStatus());
}

// ❌ Independent に違反: テスト順序に依存
static int counter = 0;
@Test void test1() { counter++; assertEquals(1, counter); }
@Test void test2() { counter++; assertEquals(2, counter); }

// ✅ Independent: 各テストが独立
@BeforeEach
void setUp() { counter = 0; } // 毎回リセット

// ❌ Repeatable に違反: 現在時刻に依存
@Test
void bad_日付依存() {
    // 実行する時間帯で結果が変わる
    assertTrue(service.isBusinessHour());
}

// ✅ Repeatable: 時刻を注入して固定
@Test
void good_日付固定() {
    Clock fixedClock = Clock.fixed(
        Instant.parse("2025-01-15T10:00:00Z"),
        ZoneId.of("Asia/Tokyo"));
    assertTrue(service.isBusinessHour(fixedClock));
}`,
      },
      {
        title: "AAAパターン",
        content:
          "AAAパターンは、テストを Arrange（準備）、Act（実行）、Assert（検証）の3段階に分ける構造です。テストの可読性が大幅に向上し、何をテストしているかが一目でわかります。各段階をコメントやブランク行で明示するのがベストプラクティスです。",
        code: `// AAAパターンの実践例
@Test
@DisplayName("合計金額が1万円以上なら送料無料になる")
void calculateShipping_合計1万円以上_送料無料() {
    // Arrange（準備）: テストに必要なオブジェクトやデータを用意
    Order order = new Order();
    order.addItem(new Item("Java入門書", 5000));
    order.addItem(new Item("テスト技法本", 6000));
    ShippingCalculator calculator = new ShippingCalculator();

    // Act（実行）: テスト対象のメソッドを呼び出す
    int shippingFee = calculator.calculate(order);

    // Assert（検証）: 期待通りの結果かを検証
    assertEquals(0, shippingFee, "1万円以上は送料無料");
}

// 複数のアサーションをまとめる場合
@Test
@DisplayName("ユーザー登録で全フィールドが正しく設定される")
void register_正常な入力_全フィールド設定() {
    // Arrange
    UserRegisterRequest request =
        new UserRegisterRequest("田中", "tanaka@example.com");

    // Act
    User user = userService.register(request);

    // Assert: assertAll で全アサーションを実行
    assertAll(
        () -> assertNotNull(user.getId()),
        () -> assertEquals("田中", user.getName()),
        () -> assertEquals("tanaka@example.com", user.getEmail()),
        () -> assertNotNull(user.getCreatedAt())
    );
}`,
      },
      {
        title: "テスト可能な設計",
        content:
          "テストしやすいコードを書くには、依存性注入（DI）を活用し、モック化しやすい設計にすることが重要です。static メソッドや new の直接呼び出しはモック化が困難なため避けます。インターフェースを介した疎結合な設計がテスト容易性を高めます。",
        code: `// ❌ テストしにくい設計: 依存を内部で生成
public class OrderService {
    public OrderResult placeOrder(Order order) {
        // new で直接生成 → モック化できない
        PaymentGateway gateway = new PaymentGateway();
        EmailSender sender = new EmailSender();

        gateway.charge(order.getTotal());
        sender.send(order.getEmail(), "注文確認");
        return new OrderResult(true);
    }
}

// ✅ テストしやすい設計: 依存性注入（DI）
public class OrderService {
    private final PaymentGateway gateway;
    private final EmailSender sender;

    // コンストラクタインジェクション
    public OrderService(PaymentGateway gateway,
                        EmailSender sender) {
        this.gateway = gateway;
        this.sender = sender;
    }

    public OrderResult placeOrder(Order order) {
        gateway.charge(order.getTotal());
        sender.send(order.getEmail(), "注文確認");
        return new OrderResult(true);
    }
}

// テスト: モックを簡単に注入できる
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock PaymentGateway gateway;
    @Mock EmailSender sender;
    @InjectMocks OrderService orderService;

    @Test
    void placeOrder_正常な注文_成功() {
        Order order = new Order("test@example.com", 1000);
        OrderResult result = orderService.placeOrder(order);
        assertTrue(result.isSuccess());
    }
}`,
      },
      {
        title: "テスト命名規則",
        content:
          "テストメソッド名は、テスト対象・条件・期待結果を含む命名が推奨されます。日本語の @DisplayName を使えば、テスト結果が読みやすくなります。チームで命名規則を統一することで、テストの可読性と保守性が向上します。",
        code: `// 命名パターン1: メソッド名_条件_期待結果
class UserServiceTest {
    @Test
    void findById_存在するID_ユーザーを返す() { ... }

    @Test
    void findById_存在しないID_例外をスロー() { ... }

    @Test
    void register_メールアドレス重複_IllegalArgumentException() { ... }
}

// 命名パターン2: @DisplayName で日本語表記
class UserServiceTest {
    @Test
    @DisplayName("存在するIDでユーザーを取得できる")
    void findById_existingId() { ... }

    @Test
    @DisplayName("存在しないIDで例外が発生する")
    void findById_nonExistingId() { ... }
}

// 命名パターン3: @Nested + @DisplayName でBDDスタイル
class UserServiceTest {
    @Nested
    @DisplayName("findById メソッド")
    class FindById {
        @Test
        @DisplayName("存在するIDならユーザーを返す")
        void returnsUser() { ... }

        @Test
        @DisplayName("存在しないIDなら例外をスローする")
        void throwsException() { ... }
    }
}`,
      },
      {
        title: "テストの独立性",
        content:
          "テスト間の依存関係は、テストの信頼性を著しく低下させます。各テストは @BeforeEach で状態をリセットし、テスト順序に依存しない設計にします。共有状態（static 変数やDB）の使用は最小限にし、テストデータは各テスト内で独立して用意します。",
        code: `// ❌ テスト間に依存がある悪い例
class UserServiceTest {
    private static User savedUser; // 共有状態！

    @Test
    @Order(1)
    void test1_ユーザー作成() {
        savedUser = userService.register("田中");
        assertNotNull(savedUser);
    }

    @Test
    @Order(2)
    void test2_ユーザー取得() {
        // test1 が先に実行されないと失敗する！
        User found = userService.findById(savedUser.getId());
        assertEquals("田中", found.getName());
    }
}

// ✅ 各テストが独立している良い例
class UserServiceTest {
    private UserService userService;

    @BeforeEach
    void setUp() {
        // 毎回新しい状態で開始
        userService = new UserService(
            new InMemoryUserRepository());
    }

    @Test
    void register_正常な名前_ユーザーが作成される() {
        User user = userService.register("田中");
        assertNotNull(user.getId());
        assertEquals("田中", user.getName());
    }

    @Test
    void findById_登録済みユーザー_取得できる() {
        // テスト内で必要なデータを準備
        User created = userService.register("佐藤");
        User found = userService.findById(created.getId());
        assertEquals("佐藤", found.getName());
    }
}`,
      },
    ],
  },
  {
    id: "test-coverage-basics",
    title: "テストケースの洗い出し方",
    category: "fundamentals",
    description:
      "同値分割、境界値分析、デシジョンテーブル、状態遷移テスト",
    sections: [
      {
        title: "同値分割法",
        content:
          "同値分割法は、入力値を「有効値」と「無効値」のグループ（同値クラス）に分け、各グループから代表値を1つ選んでテストする技法です。すべての値をテストする必要がなく、効率的にテストケースを設計できます。例えば年齢入力なら、0〜150が有効クラス、負数と151以上が無効クラスです。",
        code: `// 同値分割法の例: 年齢バリデーション
// 有効クラス: 0〜150
// 無効クラス1: 負数（-1以下）
// 無効クラス2: 151以上
class AgeValidatorTest {

    private AgeValidator validator = new AgeValidator();

    @Test
    @DisplayName("有効な年齢: 代表値25でtrue")
    void validate_有効クラスの代表値_true() {
        assertTrue(validator.isValid(25));  // 有効クラスの代表値
    }

    @Test
    @DisplayName("無効な年齢: 負数で例外")
    void validate_負数_例外をスロー() {
        assertThrows(IllegalArgumentException.class,
            () -> validator.isValid(-5));   // 無効クラス1の代表値
    }

    @Test
    @DisplayName("無効な年齢: 151以上で例外")
    void validate_151以上_例外をスロー() {
        assertThrows(IllegalArgumentException.class,
            () -> validator.isValid(200));  // 無効クラス2の代表値
    }
}`,
      },
      {
        title: "境界値分析",
        content:
          "境界値分析は、同値クラスの境界付近でバグが発生しやすいという経験則に基づくテスト技法です。min-1、min、min+1、max-1、max、max+1 の6つの値をテストします。off-by-one エラー（±1のズレ）を効果的に検出できます。",
        code: `// 境界値分析の例: スコア判定（0〜100が有効範囲）
// テストする値: -1, 0, 1, 99, 100, 101
class ScoreValidatorTest {

    @ParameterizedTest
    @DisplayName("有効な境界値でtrue")
    @ValueSource(ints = {0, 1, 99, 100})
    void isValid_有効な境界値_true(int score) {
        assertTrue(ScoreValidator.isValid(score));
    }

    @ParameterizedTest
    @DisplayName("無効な境界値でfalse")
    @ValueSource(ints = {-1, 101})
    void isValid_無効な境界値_false(int score) {
        assertFalse(ScoreValidator.isValid(score));
    }

    // 成績判定の境界値テスト
    // A: 90〜100, B: 70〜89, C: 50〜69, D: 0〜49
    @ParameterizedTest
    @CsvSource({
        "100, A",  // Aの上限
        "90,  A",  // Aの下限
        "89,  B",  // Bの上限（Aの下限-1）
        "70,  B",  // Bの下限
        "69,  C",  // Cの上限（Bの下限-1）
        "50,  C",  // Cの下限
        "49,  D",  // Dの上限（Cの下限-1）
        "0,   D",  // Dの下限
    })
    void getGrade_境界値_正しい成績(int score, String grade) {
        assertEquals(grade, GradeCalculator.getGrade(score));
    }
}`,
      },
      {
        title: "デシジョンテーブル",
        content:
          "デシジョンテーブルは、複数の条件の組み合わせによって結果が変わるロジックを表形式で整理する技法です。条件の全組み合わせを網羅することで、テスト漏れを防ぎます。割引計算や権限チェックなど、条件分岐が複雑なビジネスロジックに効果的です。",
        code: `// デシジョンテーブルの例: 割引計算
// 条件: 会員(Y/N) × クーポン(Y/N) × 1万円以上(Y/N)
// | 会員 | クーポン | 1万円以上 | 割引率 |
// |  Y   |   Y     |    Y     |  20%  |
// |  Y   |   Y     |    N     |  15%  |
// |  Y   |   N     |    Y     |  10%  |
// |  Y   |   N     |    N     |   5%  |
// |  N   |   Y     |    Y     |  10%  |
// |  N   |   Y     |    N     |   5%  |
// |  N   |   N     |    Y     |   0%  |
// |  N   |   N     |    N     |   0%  |

class DiscountCalculatorTest {
    private DiscountCalculator calc = new DiscountCalculator();

    @ParameterizedTest
    @DisplayName("条件の組み合わせで正しい割引率を返す")
    @CsvSource({
        "true,  true,  10000, 20",
        "true,  true,  5000,  15",
        "true,  false, 10000, 10",
        "true,  false, 5000,   5",
        "false, true,  10000, 10",
        "false, true,  5000,   5",
        "false, false, 10000,  0",
        "false, false, 5000,   0",
    })
    void calculate_条件の組み合わせ_正しい割引率(
            boolean isMember, boolean hasCoupon,
            int amount, int expectedDiscount) {
        int discount = calc.calculate(
            isMember, hasCoupon, amount);
        assertEquals(expectedDiscount, discount);
    }
}`,
      },
      {
        title: "状態遷移テスト",
        content:
          "状態遷移テストは、オブジェクトの状態変化を図示し、各遷移パスをテストする技法です。注文ステータスやワークフローなど、状態が変化するオブジェクトのテストに有効です。正常な遷移だけでなく、無効な遷移（不正な状態変化）もテストします。",
        code: `// 状態遷移テストの例: 注文ステータス
// 作成 → 支払済 → 発送済 → 完了
//   ↘ キャンセル  ↗（キャンセルからは復帰不可）

class OrderStateTest {

    @Test
    @DisplayName("正常な状態遷移: 作成→支払→発送→完了")
    void normalFlow_正常な遷移_完了に到達() {
        Order order = new Order();
        assertEquals(OrderStatus.CREATED, order.getStatus());

        order.pay();
        assertEquals(OrderStatus.PAID, order.getStatus());

        order.ship();
        assertEquals(OrderStatus.SHIPPED, order.getStatus());

        order.complete();
        assertEquals(OrderStatus.COMPLETED, order.getStatus());
    }

    @Test
    @DisplayName("作成状態からキャンセルできる")
    void cancel_作成状態_キャンセル成功() {
        Order order = new Order();
        order.cancel();
        assertEquals(OrderStatus.CANCELLED, order.getStatus());
    }

    @Test
    @DisplayName("完了状態からキャンセルは不可")
    void cancel_完了状態_例外をスロー() {
        Order order = new Order();
        order.pay();
        order.ship();
        order.complete();

        // 完了後のキャンセルは無効な遷移
        assertThrows(IllegalStateException.class,
            () -> order.cancel());
    }

    @Test
    @DisplayName("キャンセル状態から支払は不可")
    void pay_キャンセル状態_例外をスロー() {
        Order order = new Order();
        order.cancel();
        assertThrows(IllegalStateException.class,
            () -> order.pay());
    }
}`,
      },
      {
        title: "エラー推測",
        content:
          "エラー推測は、過去の経験やよくあるバグパターンに基づいてテストケースを設計する技法です。null、空文字、0、負数、最大値、特殊文字、同時実行などの「壊れやすいポイント」を意識的にテストします。形式的なテスト技法では見つけにくいバグを発見できます。",
        code: `// エラー推測によるテストケース
class UserServiceEdgeCaseTest {

    @Test
    @DisplayName("null の名前で例外")
    void register_null名前_例外() {
        assertThrows(IllegalArgumentException.class,
            () -> userService.register(null));
    }

    @Test
    @DisplayName("空文字の名前で例外")
    void register_空文字_例外() {
        assertThrows(IllegalArgumentException.class,
            () -> userService.register(""));
    }

    @Test
    @DisplayName("空白のみの名前で例外")
    void register_空白のみ_例外() {
        assertThrows(IllegalArgumentException.class,
            () -> userService.register("   "));
    }

    @Test
    @DisplayName("最大長を超える名前で例外")
    void register_最大長超過_例外() {
        String longName = "あ".repeat(256);
        assertThrows(IllegalArgumentException.class,
            () -> userService.register(longName));
    }

    @Test
    @DisplayName("特殊文字を含む名前が正しく保存される")
    void register_特殊文字_正常に保存() {
        User user = userService.register("O'Brien <script>");
        assertEquals("O'Brien <script>", user.getName());
    }

    @Test
    @DisplayName("同じメールアドレスで重複登録は不可")
    void register_メール重複_例外() {
        userService.register("田中", "a@example.com");
        assertThrows(DuplicateException.class,
            () -> userService.register("佐藤", "a@example.com"));
    }
}`,
      },
    ],
  },
  // ===== JUnit 5 =====
  {
    id: "junit-basics",
    title: "JUnit 5 基礎",
    category: "junit",
    description: "@Test、アサーション、ライフサイクル、実行制御",
    sections: [
      {
        title: "基本的なテスト",
        content:
          "JUnit 5 は Java のテストフレームワークのデファクトスタンダードです。@Test アノテーションでテストメソッドを定義し、assertEquals や assertTrue などのアサーションメソッドで結果を検証します。テストクラスは public でなくてもよく、パッケージプライベートで記述できます。",
        code: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

// テストクラス（public 不要）
class CalculatorTest {

    private Calculator calc = new Calculator();

    @Test
    void add_正の数同士_正しい合計() {
        assertEquals(5, calc.add(2, 3));
    }

    @Test
    void add_負の数_正しい合計() {
        assertEquals(-1, calc.add(2, -3));
    }

    @Test
    void divide_ゼロ除算_例外() {
        assertThrows(ArithmeticException.class,
            () -> calc.divide(10, 0));
    }

    @Test
    void isPositive_正の数_true() {
        assertTrue(calc.isPositive(5));
    }

    @Test
    void isPositive_負の数_false() {
        assertFalse(calc.isPositive(-3));
    }

    @Test
    void findUser_存在しない_nullを返す() {
        assertNull(calc.findUser(999));
    }

    @Test
    void findUser_存在する_非nullを返す() {
        assertNotNull(calc.findUser(1));
    }
}`,
      },
      {
        title: "アサーションの種類",
        content:
          "JUnit 5 には強力なアサーションメソッドが用意されています。assertAll で複数のアサーションを一括実行し、assertThrows で例外の発生を検証し、assertTimeout でタイムアウトをテストできます。全アサーションが実行されるため、最初の失敗で止まらず全体の問題を把握できます。",
        code: `import static org.junit.jupiter.api.Assertions.*;

class AssertionExamplesTest {

    @Test
    @DisplayName("assertAll: 複数のアサーションを一括実行")
    void assertAll_ユーザー情報の検証() {
        User user = userService.findById(1L);

        // 1つ失敗しても残りのアサーションも実行される
        assertAll("ユーザー情報",
            () -> assertEquals(1L, user.getId()),
            () -> assertEquals("田中", user.getName()),
            () -> assertEquals("tanaka@example.com",
                user.getEmail()),
            () -> assertTrue(user.isActive())
        );
    }

    @Test
    @DisplayName("assertThrows: 例外の型とメッセージを検証")
    void assertThrows_例外の詳細検証() {
        IllegalArgumentException ex = assertThrows(
            IllegalArgumentException.class,
            () -> userService.register(null)
        );
        // 例外メッセージも検証可能
        assertEquals("名前は必須です", ex.getMessage());
    }

    @Test
    @DisplayName("assertTimeout: 制限時間内に完了するか検証")
    void assertTimeout_処理時間の検証() {
        // 100ミリ秒以内に完了すること
        String result = assertTimeout(
            Duration.ofMillis(100),
            () -> service.quickProcess()
        );
        assertEquals("完了", result);
    }

    @Test
    @DisplayName("assertIterableEquals: リストの要素比較")
    void assertIterableEquals_リスト比較() {
        List<String> expected = List.of("A", "B", "C");
        List<String> actual = service.getSortedItems();
        assertIterableEquals(expected, actual);
    }
}`,
      },
      {
        title: "ライフサイクル",
        content:
          "JUnit 5 のライフサイクルアノテーションを使って、テスト前後にセットアップやクリーンアップ処理を実行できます。@BeforeEach/@AfterEach は各テストメソッドの前後に、@BeforeAll/@AfterAll はクラス内の全テストの前後に1回だけ実行されます。",
        code: `class LifecycleExampleTest {

    // クラス全体で1回だけ実行（static メソッド）
    @BeforeAll
    static void beforeAll() {
        System.out.println("=== テスト開始 ===");
        // DB接続プールの初期化など
    }

    @AfterAll
    static void afterAll() {
        System.out.println("=== テスト終了 ===");
        // リソースのクリーンアップ
    }

    // 各テストの前に実行
    @BeforeEach
    void setUp() {
        System.out.println("-- テストメソッド準備 --");
        // テストデータの初期化
    }

    // 各テストの後に実行
    @AfterEach
    void tearDown() {
        System.out.println("-- テストメソッド後片付け --");
        // 状態のリセット
    }

    @Test void test1() { System.out.println("test1 実行"); }
    @Test void test2() { System.out.println("test2 実行"); }

    // 実行順序:
    // === テスト開始 ===
    // -- テストメソッド準備 --
    // test1 実行
    // -- テストメソッド後片付け --
    // -- テストメソッド準備 --
    // test2 実行
    // -- テストメソッド後片付け --
    // === テスト終了 ===
}`,
      },
      {
        title: "テストの無効化と条件",
        content:
          "JUnit 5 では @Disabled でテストを一時的に無効化したり、@EnabledOnOs や @EnabledOnJre で実行環境に応じてテストを条件付き実行できます。CI環境でのみ実行したい重いテストや、OS固有の機能テストに便利です。",
        code: `class ConditionalTestExample {

    @Test
    @Disabled("Issue #123 の修正待ち")
    void temporarilyDisabled_一時的に無効化() {
        // このテストはスキップされる
    }

    @Test
    @EnabledOnOs(OS.MAC)
    void macOnly_Mac環境でのみ実行() {
        // macOS でのみ実行
    }

    @Test
    @EnabledOnOs({OS.LINUX, OS.MAC})
    void unixOnly_Unix系OSでのみ実行() {
        // Linux と macOS で実行
    }

    @Test
    @EnabledOnJre(JRE.JAVA_21)
    void java21Only_Java21でのみ実行() {
        // Java 21 でのみ実行
    }

    @Test
    @EnabledIfEnvironmentVariable(
        named = "CI", matches = "true")
    void ciOnly_CI環境でのみ実行() {
        // CI環境でのみ実行される重いテスト
    }

    @Test
    @EnabledIfSystemProperty(
        named = "os.arch", matches = "aarch64")
    void arm64Only_ARM64でのみ実行() {
        // ARM64 アーキテクチャでのみ実行
    }
}`,
      },
      {
        title: "テストの表示名",
        content:
          "@DisplayName でテストに人間が読みやすい名前を付けられます。日本語のテスト名を使うことで、テスト結果レポートが仕様書のように読めるようになります。@DisplayNameGeneration で命名規則を自動生成することも可能です。",
        code: `// @DisplayName でテスト名を明示
@DisplayName("ユーザーサービスのテスト")
class UserServiceTest {

    @Test
    @DisplayName("正常なリクエストでユーザーを登録できる")
    void registerUser_success() { ... }

    @Test
    @DisplayName("メールアドレスが重複している場合は例外を投げる")
    void registerUser_duplicateEmail() { ... }
}

// @DisplayNameGeneration でアンダースコアをスペースに変換
@DisplayNameGeneration(
    DisplayNameGenerator.ReplaceUnderscores.class)
class UserService_テスト {

    @Test
    void 正常なリクエストで_ユーザーを登録できる() { ... }
    // 表示名: "正常なリクエストで ユーザーを登録できる"

    @Test
    void メールアドレスが重複なら_例外をスローする() { ... }
    // 表示名: "メールアドレスが重複なら 例外をスローする"

    @Nested
    class findById_メソッド {
        @Test
        void 存在するIDなら_ユーザーを返す() { ... }
        // 表示名: "findById メソッド > 存在するIDなら ユーザーを返す"
    }
}`,
      },
    ],
  },
  {
    id: "junit-advanced",
    title: "JUnit 5 応用",
    category: "junit",
    description:
      "パラメータ化テスト、ネストテスト、動的テスト、拡張モデル",
    sections: [
      {
        title: "パラメータ化テスト",
        content:
          "パラメータ化テストを使うと、異なる入力データで同じテストロジックを繰り返し実行できます。@ValueSource で単一の値、@CsvSource でCSV形式のデータ、@MethodSource でメソッドからデータを提供し、@EnumSource でenum値を網羅的にテストします。",
        code: `class ParameterizedTestExamples {

    // @ValueSource: 単一の値を提供
    @ParameterizedTest
    @ValueSource(strings = {"hello", "world", "java"})
    void isNotBlank_非空文字列_true(String input) {
        assertFalse(input.isBlank());
    }

    // @CsvSource: 入力と期待値のペア
    @ParameterizedTest
    @DisplayName("成績判定テスト")
    @CsvSource({
        "100, A", "90, A", "89, B",
        "70, B",  "69, C", "50, C",
        "49, D",  "0, D"
    })
    void getGrade_スコア_正しい成績(int score, String grade) {
        assertEquals(grade, GradeCalculator.getGrade(score));
    }

    // @MethodSource: メソッドからデータを提供
    @ParameterizedTest
    @MethodSource("provideUserData")
    void register_各種入力_正しく登録(
            String name, String email, boolean expected) {
        assertEquals(expected,
            userService.register(name, email).isSuccess());
    }

    static Stream<Arguments> provideUserData() {
        return Stream.of(
            Arguments.of("田中", "tanaka@example.com", true),
            Arguments.of("佐藤", "sato@example.com", true),
            Arguments.of("", "empty@example.com", false)
        );
    }

    // @EnumSource: enum 値を網羅
    @ParameterizedTest
    @EnumSource(OrderStatus.class)
    void toDisplayName_全ステータス_非null(OrderStatus status) {
        assertNotNull(status.getDisplayName());
    }
}`,
      },
      {
        title: "ネストテスト",
        content:
          "@Nested アノテーションで関連するテストをグループ化し、階層的なテスト構造を作れます。BDDスタイルの Given-When-Then や、メソッドごとのテストグループ化に適しています。テスト結果のレポートが見やすくなり、テストの意図が明確になります。",
        code: `@DisplayName("UserService のテスト")
class UserServiceTest {

    private UserService userService;

    @BeforeEach
    void setUp() {
        userService = new UserService(new MockUserRepo());
    }

    @Nested
    @DisplayName("register メソッド")
    class Register {

        @Test
        @DisplayName("正常な入力でユーザーが作成される")
        void success() {
            User user = userService.register(
                "田中", "tanaka@example.com");
            assertNotNull(user.getId());
        }

        @Nested
        @DisplayName("バリデーションエラー")
        class ValidationError {

            @Test
            @DisplayName("名前がnullなら例外")
            void nullName() {
                assertThrows(
                    IllegalArgumentException.class,
                    () -> userService.register(
                        null, "a@example.com"));
            }

            @Test
            @DisplayName("メールが不正なら例外")
            void invalidEmail() {
                assertThrows(
                    IllegalArgumentException.class,
                    () -> userService.register(
                        "田中", "invalid"));
            }
        }
    }

    @Nested
    @DisplayName("findById メソッド")
    class FindById {
        @Test
        @DisplayName("存在するIDならユーザーを返す")
        void found() { ... }

        @Test
        @DisplayName("存在しないIDなら例外")
        void notFound() { ... }
    }
}`,
      },
      {
        title: "動的テスト",
        content:
          "@TestFactory を使うと、実行時にテストケースを動的に生成できます。DynamicTest.dynamicTest() でテスト名と実行内容を定義し、Stream や Collection として返します。テストデータが外部ファイルやDBから取得される場合や、大量のテストケースを自動生成したい場合に有効です。",
        code: `class DynamicTestExamples {

    // 動的テストの基本: Stream で返す
    @TestFactory
    @DisplayName("動的テスト: 文字列の長さ検証")
    Stream<DynamicTest> dynamicStringTests() {
        Map<String, Integer> testData = Map.of(
            "hello", 5,
            "Java", 4,
            "", 0,
            "テスト", 3
        );

        return testData.entrySet().stream()
            .map(entry -> dynamicTest(
                "「" + entry.getKey() + "」の長さは "
                    + entry.getValue(),
                () -> assertEquals(
                    entry.getValue(),
                    entry.getKey().length())
            ));
    }

    // Collection で返すパターン
    @TestFactory
    @DisplayName("バリデーションの動的テスト")
    Collection<DynamicTest> dynamicValidationTests() {
        Validator validator = new EmailValidator();

        return List.of(
            dynamicTest("正常なメール",
                () -> assertTrue(
                    validator.isValid("a@example.com"))),
            dynamicTest("@がないメール",
                () -> assertFalse(
                    validator.isValid("invalid"))),
            dynamicTest("空文字",
                () -> assertFalse(
                    validator.isValid(""))),
            dynamicTest("null",
                () -> assertFalse(
                    validator.isValid(null)))
        );
    }
}`,
      },
      {
        title: "テスト拡張モデル",
        content:
          "JUnit 5 の拡張モデル（@ExtendWith）を使うと、テストのライフサイクルにカスタム処理を差し込めます。ParameterResolver でテストメソッドにパラメータを注入したり、TestExecutionCondition で実行条件を制御したりできます。Mockito の MockitoExtension も拡張の一種です。",
        code: `// カスタム拡張の作成: テスト実行時間をログ出力
public class TimingExtension
        implements BeforeTestExecutionCallback,
                   AfterTestExecutionCallback {

    @Override
    public void beforeTestExecution(
            ExtensionContext context) {
        context.getStore(Namespace.GLOBAL)
            .put("startTime", System.currentTimeMillis());
    }

    @Override
    public void afterTestExecution(
            ExtensionContext context) {
        long startTime = context.getStore(Namespace.GLOBAL)
            .get("startTime", long.class);
        long duration = System.currentTimeMillis() - startTime;
        System.out.println(context.getDisplayName()
            + " : " + duration + "ms");
    }
}

// 拡張の使用
@ExtendWith(TimingExtension.class)
class MyServiceTest {

    @Test
    void someTest() {
        // テスト実行後に "someTest : 15ms" と出力される
    }
}

// 複数の拡張を組み合わせ
@ExtendWith(MockitoExtension.class)  // Mockito サポート
@ExtendWith(TimingExtension.class)   // 実行時間ログ
class CombinedExtensionTest {
    @Mock
    private UserRepository repo;

    @Test
    void test() { ... }
}`,
      },
      {
        title: "テスト実行順序",
        content:
          "JUnit 5 ではテストメソッドの実行順序を @TestMethodOrder で制御できます。@Order アノテーションで明示的に順序を指定したり、メソッド名のアルファベット順に実行できます。ただし、テスト間の独立性を保つことが原則であり、順序依存は避けるべきです。",
        code: `// メソッドの実行順序を指定
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OrderedTest {

    @Test
    @Order(1)
    @DisplayName("1番目に実行")
    void first() { ... }

    @Test
    @Order(2)
    @DisplayName("2番目に実行")
    void second() { ... }

    @Test
    @Order(3)
    @DisplayName("3番目に実行")
    void third() { ... }
}

// メソッド名のアルファベット順
@TestMethodOrder(MethodOrderer.MethodName.class)
class AlphabeticalTest {
    @Test void a_first() { ... }
    @Test void b_second() { ... }
    @Test void c_third() { ... }
}

// ランダム順序（テストの独立性を検証）
@TestMethodOrder(MethodOrderer.Random.class)
class RandomOrderTest {
    @Test void test1() { ... }
    @Test void test2() { ... }
    @Test void test3() { ... }
}

// テストインスタンスのライフサイクル
// デフォルト: テストメソッドごとに新しいインスタンス
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class PerClassLifecycleTest {
    // クラスで1つのインスタンスを共有
    // @BeforeAll/@AfterAll が static でなくてよい
    @BeforeAll
    void setUp() { /* static 不要 */ }
}`,
      },
    ],
  },
  // ===== Mockito・モック =====
  {
    id: "mockito-basics",
    title: "Mockito 基礎",
    category: "mockito",
    description: "モック作成、スタブ設定、呼び出し検証",
    sections: [
      {
        title: "モックの作成",
        content:
          "Mockito はJavaで最も広く使われるモックフレームワークです。@Mock でモックオブジェクトを作成し、@InjectMocks でテスト対象にモックを自動注入します。mock() はメソッドの戻り値がデフォルト値（null、0、false）になり、spy() は実際のメソッドを呼びつつ一部だけモック化できます。",
        code: `// MockitoExtension を使ったモックの作成
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    // モックオブジェクトを作成
    @Mock
    private UserRepository userRepository;

    @Mock
    private EmailService emailService;

    // モックを自動注入してテスト対象を作成
    @InjectMocks
    private UserService userService;

    @Test
    void findById_モックが注入される() {
        // userRepository はモック
        when(userRepository.findById(1L))
            .thenReturn(Optional.of(new User(1L, "田中")));

        User user = userService.findById(1L);
        assertEquals("田中", user.getName());
    }
}

// 手動でモックを作成する方法
class ManualMockTest {
    @Test
    void test() {
        // mock(): 全メソッドがデフォルト値を返す
        UserRepository mockRepo = mock(UserRepository.class);

        // spy(): 実オブジェクトの一部をモック化
        UserRepository spyRepo = spy(new UserRepositoryImpl());

        // mock は findAll() で空リストを返す
        assertEquals(0, mockRepo.findAll().size());
    }
}`,
      },
      {
        title: "スタブの設定",
        content:
          "スタブは、モックオブジェクトのメソッドが特定の引数で呼ばれたときに返す値を定義する設定です。when().thenReturn() で戻り値を、when().thenThrow() で例外を設定します。連続した呼び出しで異なる値を返すこともできます。",
        code: `@ExtendWith(MockitoExtension.class)
class StubExampleTest {

    @Mock
    private UserRepository repo;

    @Test
    void thenReturn_戻り値を設定() {
        // 特定の引数で呼ばれたときの戻り値を設定
        when(repo.findById(1L))
            .thenReturn(Optional.of(new User(1L, "田中")));

        // 別の引数では空のOptionalを返す
        when(repo.findById(999L))
            .thenReturn(Optional.empty());

        assertTrue(repo.findById(1L).isPresent());
        assertFalse(repo.findById(999L).isPresent());
    }

    @Test
    void thenThrow_例外をスロー() {
        when(repo.findById(-1L))
            .thenThrow(new IllegalArgumentException("不正なID"));

        assertThrows(IllegalArgumentException.class,
            () -> repo.findById(-1L));
    }

    @Test
    void 連続呼び出しで異なる値を返す() {
        when(repo.count())
            .thenReturn(0L)    // 1回目
            .thenReturn(1L)    // 2回目
            .thenReturn(5L);   // 3回目以降

        assertEquals(0L, repo.count());
        assertEquals(1L, repo.count());
        assertEquals(5L, repo.count());
        assertEquals(5L, repo.count()); // 最後の値が繰り返される
    }

    @Test
    void thenAnswer_動的な戻り値() {
        when(repo.findById(anyLong())).thenAnswer(
            invocation -> {
                Long id = invocation.getArgument(0);
                return Optional.of(new User(id, "User" + id));
            });

        assertEquals("User42", repo.findById(42L).get().getName());
    }
}`,
      },
      {
        title: "呼び出し検証",
        content:
          "verify() を使って、モックのメソッドが期待通りに呼び出されたかを検証します。呼び出し回数（times、never、atLeast、atMost）や呼び出し順序（InOrder）を検証できます。テスト対象が依存先に正しく指示を出しているか確認するのに使います。",
        code: `@ExtendWith(MockitoExtension.class)
class VerifyExampleTest {

    @Mock private UserRepository repo;
    @Mock private EmailService emailService;
    @InjectMocks private UserService userService;

    @Test
    void verify_メソッドの呼び出し回数を検証() {
        userService.register("田中", "tanaka@example.com");

        // save が1回呼ばれたことを検証
        verify(repo, times(1)).save(any(User.class));

        // メール送信が1回呼ばれた
        verify(emailService).sendWelcomeEmail(
            eq("tanaka@example.com"));

        // delete は呼ばれていない
        verify(repo, never()).delete(any());
    }

    @Test
    void verify_呼び出し回数の範囲() {
        userService.notifyAllUsers();

        // 最低1回は呼ばれた
        verify(emailService, atLeast(1))
            .sendEmail(anyString());

        // 最大10回まで
        verify(emailService, atMost(10))
            .sendEmail(anyString());
    }

    @Test
    void verify_呼び出し順序() {
        userService.register("田中", "tanaka@example.com");

        // 呼び出し順序を検証
        InOrder inOrder = inOrder(repo, emailService);
        inOrder.verify(repo).save(any(User.class));
        inOrder.verify(emailService)
            .sendWelcomeEmail(anyString());
    }

    @Test
    void verifyNoMoreInteractions_追加呼び出しなし() {
        userService.findById(1L);
        verify(repo).findById(1L);
        // 他のメソッドが呼ばれていないことを確認
        verifyNoMoreInteractions(repo);
    }
}`,
      },
      {
        title: "引数マッチャー",
        content:
          "引数マッチャーを使うと、スタブや検証で柔軟な引数指定ができます。any() は任意の値、eq() は特定の値、argThat() はカスタム条件にマッチする引数を指定します。ArgumentCaptor を使えば、実際に渡された引数をキャプチャして後から検証できます。",
        code: `@ExtendWith(MockitoExtension.class)
class MatcherExampleTest {

    @Mock private UserRepository repo;

    @Test
    void any_任意の引数にマッチ() {
        when(repo.findById(anyLong()))
            .thenReturn(Optional.of(new User(1L, "田中")));

        // どんな Long 値でもマッチ
        assertTrue(repo.findById(1L).isPresent());
        assertTrue(repo.findById(999L).isPresent());
    }

    @Test
    void eq_特定の値にマッチ() {
        // マッチャーと具体値は混在不可 → eq() で統一
        when(repo.findByNameAndEmail(
            eq("田中"), anyString()))
            .thenReturn(Optional.of(new User(1L, "田中")));

        assertTrue(repo.findByNameAndEmail(
            "田中", "any@example.com").isPresent());
    }

    @Test
    void argThat_カスタム条件() {
        when(repo.save(argThat(user ->
            user.getName().startsWith("田"))))
            .thenReturn(new User(1L, "田中"));

        User result = repo.save(new User(null, "田中"));
        assertNotNull(result.getId());
    }

    @Test
    void argumentCaptor_引数をキャプチャ() {
        ArgumentCaptor<User> captor =
            ArgumentCaptor.forClass(User.class);

        userService.register("田中", "tanaka@example.com");

        verify(repo).save(captor.capture());
        User savedUser = captor.getValue();
        assertEquals("田中", savedUser.getName());
        assertEquals("tanaka@example.com",
            savedUser.getEmail());
    }
}`,
      },
      {
        title: "void メソッドのモック",
        content:
          "戻り値がvoidのメソッドは when().thenReturn() が使えないため、doNothing()、doThrow()、doAnswer() を使います。void メソッドで例外をスローさせたり、引数を検証したりする場合に必要になります。",
        code: `@ExtendWith(MockitoExtension.class)
class VoidMethodMockTest {

    @Mock private EmailService emailService;
    @Mock private AuditLogger auditLogger;

    @Test
    void doNothing_voidメソッドを何もしない() {
        // void メソッドはデフォルトで何もしないが明示的に書く場合
        doNothing().when(auditLogger).log(anyString());

        auditLogger.log("テストログ");
        verify(auditLogger).log("テストログ");
    }

    @Test
    void doThrow_voidメソッドで例外を投げる() {
        doThrow(new RuntimeException("メール送信失敗"))
            .when(emailService)
            .sendEmail(eq("invalid@"));

        assertThrows(RuntimeException.class,
            () -> emailService.sendEmail("invalid@"));
    }

    @Test
    void doAnswer_voidメソッドでカスタム処理() {
        List<String> sentEmails = new ArrayList<>();

        doAnswer(invocation -> {
            String email = invocation.getArgument(0);
            sentEmails.add(email);  // 送信先を記録
            return null;            // void なので null を返す
        }).when(emailService).sendEmail(anyString());

        emailService.sendEmail("a@example.com");
        emailService.sendEmail("b@example.com");

        assertEquals(2, sentEmails.size());
        assertTrue(sentEmails.contains("a@example.com"));
    }

    @Test
    void doThrow_連続した呼び出し() {
        doNothing()                         // 1回目: 成功
            .doThrow(new RuntimeException()) // 2回目: 失敗
            .when(emailService).sendEmail(anyString());

        emailService.sendEmail("ok@example.com"); // 成功
        assertThrows(RuntimeException.class,
            () -> emailService.sendEmail("fail@example.com"));
    }
}`,
      },
    ],
  },
  {
    id: "mockito-advanced",
    title: "Mockito 応用",
    category: "mockito",
    description: "Spy、ArgumentCaptor、BDD スタイル、static モック",
    sections: [
      {
        title: "Spy（部分モック）",
        content:
          "@Spy は実オブジェクトをラップし、一部のメソッドだけモック化する「部分モック」です。mock() がすべてのメソッドをスタブ化するのに対し、spy() はオーバーライドしないメソッドは実際の実装が呼ばれます。既存のクラスの一部だけ振る舞いを変えたいときに使います。",
        code: `@ExtendWith(MockitoExtension.class)
class SpyExampleTest {

    // 実オブジェクトをラップした Spy
    @Spy
    private ArrayList<String> spyList = new ArrayList<>();

    @Test
    void spy_一部だけモック化() {
        // 実際の add メソッドが呼ばれる
        spyList.add("Java");
        spyList.add("Kotlin");
        assertEquals(2, spyList.size()); // 実際の size()

        // size() だけモック化
        doReturn(100).when(spyList).size();
        assertEquals(100, spyList.size()); // モックの値

        // 要素は実際に追加されている
        assertEquals("Java", spyList.get(0));
    }

    @Spy
    private UserService userService =
        new UserService(new InMemoryRepo());

    @Test
    void spy_特定メソッドだけオーバーライド() {
        // 通知メソッドだけモック化（実際のメール送信を防ぐ）
        doNothing().when(userService)
            .sendNotification(anyString());

        // register は実際の実装が呼ばれる
        User user = userService.register("田中");
        assertNotNull(user);

        // 通知が呼ばれたか検証
        verify(userService).sendNotification("田中");
    }

    // 注意: spy では when().thenReturn() を使わない
    // ❌ when(spyList.get(0)).thenReturn("X"); // 実メソッドが呼ばれる
    // ✅ doReturn("X").when(spyList).get(0);   // 安全
}`,
      },
      {
        title: "ArgumentCaptor",
        content:
          "ArgumentCaptor は、モックに渡された引数をキャプチャして後から詳細に検証するための機能です。複雑なオブジェクトが引数に渡される場合に、特定のフィールドだけを検証できます。@Captor アノテーションで宣言することも可能です。",
        code: `@ExtendWith(MockitoExtension.class)
class ArgumentCaptorTest {

    @Mock private UserRepository repo;
    @Mock private EmailService emailService;
    @InjectMocks private UserService userService;

    // @Captor で宣言
    @Captor
    private ArgumentCaptor<User> userCaptor;

    @Test
    void capture_保存されたユーザーの詳細を検証() {
        userService.register("田中", "tanaka@example.com");

        // save に渡された引数をキャプチャ
        verify(repo).save(userCaptor.capture());
        User capturedUser = userCaptor.getValue();

        // キャプチャした引数を詳細に検証
        assertEquals("田中", capturedUser.getName());
        assertEquals("tanaka@example.com",
            capturedUser.getEmail());
        assertNotNull(capturedUser.getCreatedAt());
        assertTrue(capturedUser.isActive());
    }

    @Test
    void captureAll_複数回の呼び出しを検証() {
        userService.register("田中", "a@example.com");
        userService.register("佐藤", "b@example.com");

        ArgumentCaptor<String> emailCaptor =
            ArgumentCaptor.forClass(String.class);

        // 全呼び出しの引数をキャプチャ
        verify(emailService, times(2))
            .sendWelcomeEmail(emailCaptor.capture());

        List<String> emails = emailCaptor.getAllValues();
        assertEquals(2, emails.size());
        assertEquals("a@example.com", emails.get(0));
        assertEquals("b@example.com", emails.get(1));
    }
}`,
      },
      {
        title: "BDD スタイル",
        content:
          "Mockito は BDD（振る舞い駆動開発）スタイルのAPIも提供しています。given().willReturn() でスタブを設定し、then().should() で検証を行います。テストが Given-When-Then の構造に沿って読みやすくなり、仕様書としての可読性が向上します。",
        code: `import static org.mockito.BDDMockito.*;

@ExtendWith(MockitoExtension.class)
class BddStyleTest {

    @Mock private UserRepository repo;
    @Mock private EmailService emailService;
    @InjectMocks private UserService userService;

    @Test
    @DisplayName("ユーザー登録で保存とメール送信が実行される")
    void register_BDDスタイル() {
        // Given: 事前条件の設定
        User expectedUser = new User(1L, "田中");
        given(repo.save(any(User.class)))
            .willReturn(expectedUser);

        // When: テスト対象の実行
        User result = userService.register(
            "田中", "tanaka@example.com");

        // Then: 結果の検証
        then(repo).should(times(1))
            .save(any(User.class));
        then(emailService).should()
            .sendWelcomeEmail("tanaka@example.com");
        assertEquals(1L, result.getId());
    }

    @Test
    @DisplayName("例外発生時にメール送信されない")
    void register_保存失敗_メール送信なし() {
        // Given: 保存が失敗する設定
        given(repo.save(any(User.class)))
            .willThrow(new RuntimeException("DB接続エラー"));

        // When / Then
        assertThrows(RuntimeException.class,
            () -> userService.register(
                "田中", "tanaka@example.com"));

        // メール送信は呼ばれない
        then(emailService).shouldHaveNoInteractions();
    }
}`,
      },
      {
        title: "static メソッドのモック",
        content:
          "Mockito 3.4以降では、mockStatic() で static メソッドをモック化できます。LocalDateTime.now() やUUID.randomUUID() など、テストで固定したい値を返すのに便利です。try-with-resources で自動的にモックが解除されるため、他のテストに影響しません。",
        code: `// mockito-inline の依存が必要（Mockito 5 では標準搭載）
// <dependency>
//   <groupId>org.mockito</groupId>
//   <artifactId>mockito-core</artifactId>
//   <version>5.12.0</version>
//   <scope>test</scope>
// </dependency>

class StaticMockTest {

    @Test
    @DisplayName("LocalDateTime.now() を固定する")
    void mockStatic_日時を固定() {
        LocalDateTime fixedTime =
            LocalDateTime.of(2025, 4, 1, 10, 0, 0);

        // try-with-resources で自動解除
        try (MockedStatic<LocalDateTime> mocked =
                mockStatic(LocalDateTime.class)) {

            mocked.when(LocalDateTime::now)
                .thenReturn(fixedTime);

            // テスト対象の実行
            Order order = new Order();
            assertEquals(fixedTime, order.getCreatedAt());
        }
        // ここでは元の LocalDateTime.now() に戻る
    }

    @Test
    @DisplayName("UUID.randomUUID() を固定する")
    void mockStatic_UUIDを固定() {
        UUID fixedUUID = UUID.fromString(
            "12345678-1234-1234-1234-123456789abc");

        try (MockedStatic<UUID> mocked =
                mockStatic(UUID.class)) {

            mocked.when(UUID::randomUUID)
                .thenReturn(fixedUUID);

            String id = UUID.randomUUID().toString();
            assertEquals(
                "12345678-1234-1234-1234-123456789abc", id);
        }
    }
}`,
      },
      {
        title: "final クラス/メソッドのモック",
        content:
          "Mockito 5 以降では、final クラスや final メソッドもデフォルトでモック化できます。Mockito 4 以前では mockito-inline アーティファクトを使用するか、src/test/resources/mockito-extensions に設定ファイルを配置する必要があります。ただし、モック化できない状況もあるため、設計で回避する方法も知っておくべきです。",
        code: `// Mockito 5: final クラスのモックがデフォルトで可能
final class ExternalApiClient {
    final String callApi(String endpoint) {
        // 実際のAPI呼び出し
        return httpClient.get(endpoint);
    }
}

@ExtendWith(MockitoExtension.class)
class FinalClassMockTest {

    @Mock
    private ExternalApiClient apiClient; // final でもモック可

    @Test
    void mock_finalクラスをモック化() {
        when(apiClient.callApi("/users"))
            .thenReturn("{\"name\": \"田中\"}");

        String result = apiClient.callApi("/users");
        assertEquals("{\"name\": \"田中\"}", result);
    }
}

// Mockito 4 以前: 設定ファイルが必要
// src/test/resources/mockito-extensions/
//   org.mockito.plugins.MockMaker
// 内容: mock-maker-inline

// モック化できない場合の設計による回避策
// ❌ final クラスに直接依存
// class MyService {
//     private final ExternalApi api = new ExternalApi();
// }

// ✅ インターフェースを導入して依存
interface ApiClient {
    String callApi(String endpoint);
}

class ExternalApiClientImpl implements ApiClient {
    @Override
    public String callApi(String endpoint) { ... }
}

// テストでは ApiClient インターフェースをモック化
// @Mock private ApiClient apiClient;`,
      },
    ],
  },
  // ===== Spring Boot テスト =====
  {
    id: "spring-boot-test",
    title: "Spring Boot テストの基礎",
    category: "spring-test",
    description: "@SpringBootTest、テストスライス、@MockBean",
    sections: [
      {
        title: "@SpringBootTest",
        content:
          "@SpringBootTest はアプリケーション全体の Spring コンテキストをロードして統合テストを実行するアノテーションです。webEnvironment を設定することで、実際のサーバーを起動するか、モックサーブレット環境で動作させるかを制御できます。起動に時間がかかるため、必要な場合のみ使用します。",
        code: `// 基本的な @SpringBootTest
@SpringBootTest
class ApplicationIntegrationTest {

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("アプリケーション全体が正しく起動する")
    void contextLoads() {
        assertNotNull(userService);
    }
}

// webEnvironment の設定
// MOCK（デフォルト）: モックサーブレット環境
@SpringBootTest(webEnvironment =
    SpringBootTest.WebEnvironment.MOCK)
class MockEnvTest { ... }

// RANDOM_PORT: ランダムポートで実サーバー起動
@SpringBootTest(webEnvironment =
    SpringBootTest.WebEnvironment.RANDOM_PORT)
class RandomPortTest {
    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getUser_実サーバーでテスト() {
        ResponseEntity<User> response = restTemplate
            .getForEntity("/api/users/1", User.class);
        assertEquals(HttpStatus.OK,
            response.getStatusCode());
    }
}

// 特定のプロパティをオーバーライド
@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "app.feature.flag=true"
})
class CustomPropertyTest { ... }`,
      },
      {
        title: "テストスライスの種類",
        content:
          "テストスライスは、アプリケーションの特定の層（Controller、Repository等）だけをロードする軽量なテスト手法です。@WebMvcTest は Controller 層、@DataJpaTest は Repository 層、@RestClientTest は REST クライアント、@JsonTest は JSON シリアライズ/デシリアライズに特化しています。",
        code: `// @WebMvcTest: Controller 層のみテスト
// Controller と関連するフィルタ等のみロード
@WebMvcTest(UserController.class)
class UserControllerTest {
    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;
    // ... Controller のテスト
}

// @DataJpaTest: Repository 層のみテスト
// JPA関連のBeanのみロード + 組み込みDB（H2）
@DataJpaTest
class UserRepositoryTest {
    @Autowired private UserRepository repo;
    @Autowired private TestEntityManager em;
    // ... Repository のテスト
}

// @RestClientTest: REST クライアントのテスト
@RestClientTest(WeatherClient.class)
class WeatherClientTest {
    @Autowired private WeatherClient client;
    @Autowired private MockRestServiceServer server;

    @Test
    void getWeather_モックサーバーからレスポンス() {
        server.expect(requestTo("/api/weather/tokyo"))
            .andRespond(withSuccess(
                "{\"temp\": 25}", MediaType.APPLICATION_JSON));
        Weather weather = client.getWeather("tokyo");
        assertEquals(25, weather.getTemp());
    }
}

// @JsonTest: JSON のシリアライズ/デシリアライズ
@JsonTest
class UserJsonTest {
    @Autowired private JacksonTester<User> json;

    @Test
    void serialize_JSONに変換() throws Exception {
        User user = new User(1L, "田中");
        assertThat(json.write(user))
            .extractingJsonPathStringValue("$.name")
            .isEqualTo("田中");
    }
}`,
      },
      {
        title: "@MockBean と @SpyBean",
        content:
          "@MockBean は Spring コンテキスト内のBeanをモックに置き換えるアノテーションです。@SpyBean は実際のBeanをSpyでラップし、一部のメソッドだけモック化できます。Mockitoの @Mock/@Spy と異なり、Spring の DI コンテナ内のBeanを直接差し替えるのが特徴です。",
        code: `@WebMvcTest(OrderController.class)
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    // Spring コンテキスト内の OrderService をモックに置換
    @MockBean
    private OrderService orderService;

    // Spring コンテキスト内の AuditService をSpyに置換
    @SpyBean
    private AuditService auditService;

    @Test
    void createOrder_正常リクエスト_201() throws Exception {
        // @MockBean のスタブ設定
        when(orderService.create(any()))
            .thenReturn(new Order(1L, "注文品"));

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"item\": \"Java入門書\"}"))
            .andExpect(status().isCreated());

        // @MockBean の呼び出し検証
        verify(orderService).create(any());

        // @SpyBean: 実際の audit 処理が呼ばれたか検証
        verify(auditService).logAction("ORDER_CREATED");
    }
}

// 注意: @MockBean は Springコンテキストを再生成するため
// 多用するとテストが遅くなる
// ❌ テストクラスごとに異なる @MockBean → 毎回コンテキスト再生成
// ✅ 共通の @MockBean 構成を基底クラスにまとめる
@SpringBootTest
abstract class BaseIntegrationTest {
    @MockBean protected EmailService emailService;
    @MockBean protected ExternalApiClient apiClient;
}`,
      },
      {
        title: "TestRestTemplate と WebTestClient",
        content:
          "TestRestTemplate は実サーバーを起動した状態で REST API をテストするクライアントです。WebTestClient は WebFlux 対応のリアクティブなテストクライアントで、Spring MVC でも使用可能です。どちらもリクエスト送信とレスポンス検証を流暢に記述できます。",
        code: `// TestRestTemplate: 実サーバーでのテスト
@SpringBootTest(webEnvironment =
    SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void getUser_存在するID_200とユーザー情報() {
        ResponseEntity<User> response =
            restTemplate.getForEntity("/api/users/1",
                User.class);

        assertEquals(HttpStatus.OK,
            response.getStatusCode());
        assertEquals("田中", response.getBody().getName());
    }

    @Test
    void createUser_正常リクエスト_201() {
        User newUser = new User(null, "佐藤");
        ResponseEntity<User> response =
            restTemplate.postForEntity("/api/users",
                newUser, User.class);

        assertEquals(HttpStatus.CREATED,
            response.getStatusCode());
        assertNotNull(response.getBody().getId());
    }
}

// WebTestClient: リアクティブスタイルのテスト
@SpringBootTest(webEnvironment =
    SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiWebClientTest {

    @Autowired
    private WebTestClient webTestClient;

    @Test
    void getUser_WebTestClientで検証() {
        webTestClient.get()
            .uri("/api/users/1")
            .exchange()
            .expectStatus().isOk()
            .expectBody()
            .jsonPath("$.name").isEqualTo("田中")
            .jsonPath("$.email").isNotEmpty();
    }
}`,
      },
      {
        title: "テストプロパティ",
        content:
          "Spring Boot テストでは、テスト用のプロパティを柔軟に設定できます。@TestPropertySource でプロパティファイルを指定し、application-test.yml でテスト専用の設定を定義します。@DynamicPropertySource を使えば、Testcontainers 等の動的な値もプロパティに設定できます。",
        code: `// @TestPropertySource: テスト用プロパティを指定
@SpringBootTest
@TestPropertySource(properties = {
    "app.email.enabled=false",
    "app.cache.ttl=0"
})
class DisabledEmailTest { ... }

// @TestPropertySource: プロパティファイルを指定
@SpringBootTest
@TestPropertySource(locations =
    "classpath:application-test.properties")
class CustomConfigTest { ... }

// application-test.yml（テストプロファイル）
// src/test/resources/application-test.yml
// spring:
//   datasource:
//     url: jdbc:h2:mem:testdb
//     driver-class-name: org.h2.Driver
//   jpa:
//     hibernate:
//       ddl-auto: create-drop

// @ActiveProfiles でプロファイルを有効化
@SpringBootTest
@ActiveProfiles("test")
class TestProfileTest { ... }

// @DynamicPropertySource: 動的なプロパティ設定
@SpringBootTest
@Testcontainers
class DynamicPropertyTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16");

    @DynamicPropertySource
    static void configureProperties(
            DynamicPropertyRegistry registry) {
        // Testcontainers の動的ポートを設定
        registry.add("spring.datasource.url",
            postgres::getJdbcUrl);
        registry.add("spring.datasource.username",
            postgres::getUsername);
        registry.add("spring.datasource.password",
            postgres::getPassword);
    }
}`,
      },
    ],
  },
  {
    id: "controller-test",
    title: "Controller テスト",
    category: "spring-test",
    description:
      "MockMvc によるREST APIテスト、リクエスト/レスポンスの検証",
    sections: [
      {
        title: "MockMvc の基本",
        content:
          "MockMvc は、実際のHTTPサーバーを起動せずに Controller のテストを行うフレームワークです。perform() でリクエストを送信し、andExpect() でレスポンスを検証し、andDo() でデバッグ出力を行います。GET、POST、PUT、DELETE 等のHTTPメソッドに対応しています。",
        code: `@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    @DisplayName("GET /api/users/1 - ユーザー取得")
    void getUser_存在するID_200() throws Exception {
        when(userService.findById(1L))
            .thenReturn(new User(1L, "田中", "tanaka@example.com"));

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("田中"))
            .andDo(print()); // リクエスト/レスポンスを出力
    }

    @Test
    @DisplayName("POST /api/users - ユーザー作成")
    void createUser_正常リクエスト_201() throws Exception {
        when(userService.create(any()))
            .thenReturn(new User(1L, "田中", "tanaka@example.com"));

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"田中\",\"email\":\"tanaka@example.com\"}"))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    @DisplayName("DELETE /api/users/1 - ユーザー削除")
    void deleteUser_存在するID_204() throws Exception {
        mockMvc.perform(delete("/api/users/1"))
            .andExpect(status().isNoContent());

        verify(userService).delete(1L);
    }
}`,
      },
      {
        title: "JSONレスポンスの検証",
        content:
          "MockMvc では jsonPath() を使って JSON レスポンスの各フィールドを柔軟に検証できます。ネストしたオブジェクトや配列の要素にもアクセス可能です。content().json() を使えば、JSON全体を一括比較することもできます。",
        code: `@WebMvcTest(UserController.class)
class JsonResponseTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;

    @Test
    @DisplayName("ネストしたJSONの検証")
    void getUser_ネストしたフィールドの検証() throws Exception {
        User user = new User(1L, "田中",
            new Address("東京都", "新宿区"));
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            // トップレベルフィールド
            .andExpect(jsonPath("$.name").value("田中"))
            // ネストしたオブジェクト
            .andExpect(jsonPath("$.address.city")
                .value("新宿区"))
            // 値の存在確認
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.deleted").doesNotExist());
    }

    @Test
    @DisplayName("配列レスポンスの検証")
    void listUsers_配列の検証() throws Exception {
        when(userService.findAll()).thenReturn(List.of(
            new User(1L, "田中", null),
            new User(2L, "佐藤", null)));

        mockMvc.perform(get("/api/users"))
            .andExpect(status().isOk())
            // 配列の長さ
            .andExpect(jsonPath("$", hasSize(2)))
            // 配列の要素
            .andExpect(jsonPath("$[0].name").value("田中"))
            .andExpect(jsonPath("$[1].name").value("佐藤"))
            // 配列内の条件検索
            .andExpect(jsonPath("$[?(@.id == 1)].name")
                .value("田中"));
    }

    @Test
    @DisplayName("JSON全体を一括比較")
    void getUser_JSON全体比較() throws Exception {
        when(userService.findById(1L))
            .thenReturn(new User(1L, "田中", null));

        mockMvc.perform(get("/api/users/1"))
            .andExpect(content().json(
                "{\"id\":1,\"name\":\"田中\"}",
                false)); // false: 追加フィールドを許容
    }
}`,
      },
      {
        title: "リクエストの構築",
        content:
          "MockMvc では、content() でリクエストボディを、contentType() でContent-Typeを、header() でヘッダーを、param() でクエリパラメータを設定できます。ファイルアップロードのテストでは MockMultipartFile を使います。",
        code: `@WebMvcTest(UserController.class)
class RequestBuildingTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;

    @Test
    @DisplayName("ヘッダーとクエリパラメータ付きリクエスト")
    void search_パラメータ付きGET() throws Exception {
        mockMvc.perform(get("/api/users/search")
                .param("name", "田中")
                .param("page", "0")
                .param("size", "20")
                .header("X-Request-ID", "test-123")
                .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("JSON ボディ付き PUT リクエスト")
    void updateUser_JSONボディ() throws Exception {
        String requestBody = """
            {
                "name": "田中太郎",
                "email": "taro@example.com"
            }
            """;

        mockMvc.perform(put("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("マルチパートファイルアップロード")
    void upload_ファイルアップロード() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
            "file",                    // パラメータ名
            "test.csv",                // ファイル名
            "text/csv",                // Content-Type
            "id,name\n1,田中".getBytes() // 内容
        );

        mockMvc.perform(multipart("/api/users/upload")
                .file(file)
                .param("overwrite", "true"))
            .andExpect(status().isOk());
    }
}`,
      },
      {
        title: "バリデーションのテスト",
        content:
          "@Valid によるバリデーションが正しく機能するかをテストします。不正なリクエストに対して400 Bad Requestが返されること、エラーレスポンスに適切なメッセージが含まれることを検証します。バリデーションエラーは Controller 層のテストで網羅的に確認すべきポイントです。",
        code: `// テスト対象の DTO
// public record UserRequest(
//     @NotBlank(message = "名前は必須です")
//     String name,
//     @Email(message = "メールアドレスの形式が不正です")
//     @NotBlank(message = "メールは必須です")
//     String email,
//     @Min(value = 0, message = "年齢は0以上です")
//     @Max(value = 150, message = "年齢は150以下です")
//     Integer age
// ) {}

@WebMvcTest(UserController.class)
class ValidationTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;

    @Test
    @DisplayName("名前が空の場合、400エラーが返る")
    void create_名前が空_400() throws Exception {
        String body = """
            {"name": "", "email": "a@example.com", "age": 25}
            """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors[0].field")
                .value("name"))
            .andExpect(jsonPath("$.errors[0].message")
                .value("名前は必須です"));
    }

    @Test
    @DisplayName("メールが不正な場合、400エラーが返る")
    void create_メール不正_400() throws Exception {
        String body = """
            {"name": "田中", "email": "invalid", "age": 25}
            """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors[?(@.field == 'email')]")
                .exists());
    }

    @Test
    @DisplayName("年齢が範囲外の場合、400エラーが返る")
    void create_年齢が負数_400() throws Exception {
        String body = """
            {"name": "田中", "email": "a@example.com", "age": -1}
            """;

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body))
            .andExpect(status().isBadRequest());
    }
}`,
      },
      {
        title: "認証付きテスト",
        content:
          "Spring Security が適用された Controller のテストでは、@WithMockUser でモックユーザーを設定できます。ロールや権限を指定して、認可のテストも行えます。@WithUserDetails を使えば、カスタム UserDetailsService から実際のユーザー情報をロードしてテストすることも可能です。",
        code: `@WebMvcTest(AdminController.class)
class SecurityTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private AdminService adminService;

    @Test
    @DisplayName("未認証でアクセスすると401が返る")
    void admin_未認証_401() throws Exception {
        mockMvc.perform(get("/api/admin/users"))
            .andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    @DisplayName("ADMIN ロールでアクセスすると200が返る")
    void admin_ADMINロール_200() throws Exception {
        when(adminService.findAllUsers())
            .thenReturn(List.of());

        mockMvc.perform(get("/api/admin/users"))
            .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    @DisplayName("USER ロールでは403が返る")
    void admin_USERロール_403() throws Exception {
        mockMvc.perform(get("/api/admin/users"))
            .andExpect(status().isForbidden());
    }

    @Test
    @DisplayName("JWT トークンを手動設定してテスト")
    void admin_JWTトークン付き() throws Exception {
        String token = "Bearer test-jwt-token";

        mockMvc.perform(get("/api/admin/users")
                .header("Authorization", token))
            .andExpect(status().isOk());
    }

    // @WithUserDetails: カスタム UserDetailsService を使用
    @Test
    @WithUserDetails(value = "admin@example.com",
        userDetailsServiceBeanName = "customUserDetailsService")
    void admin_カスタムユーザー_200() throws Exception {
        mockMvc.perform(get("/api/admin/users"))
            .andExpect(status().isOk());
    }
}`,
      },
    ],
  },
  {
    id: "repository-test",
    title: "Repository・DB テスト",
    category: "spring-test",
    description:
      "@DataJpaTest、テストデータ管理、トランザクション制御",
    sections: [
      {
        title: "@DataJpaTest",
        content:
          "@DataJpaTest は JPA 関連のコンポーネント（Repository、EntityManager 等）のみをロードする軽量なテストスライスです。デフォルトで組み込みDB（H2）を使用し、各テスト後に自動ロールバックされます。TestEntityManager を使えば、テストデータを直接永続化できます。",
        code: `@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    // テストデータの直接操作用
    @Autowired
    private TestEntityManager em;

    @Test
    @DisplayName("ユーザーを保存して取得できる")
    void save_and_findById() {
        // TestEntityManager でデータを永続化
        User user = em.persistAndFlush(
            new User("田中", "tanaka@example.com"));

        // Repository で取得
        Optional<User> found =
            userRepository.findById(user.getId());

        assertTrue(found.isPresent());
        assertEquals("田中", found.get().getName());
    }

    @Test
    @DisplayName("メールアドレスでユーザーを検索できる")
    void findByEmail_存在するメール_ユーザーを返す() {
        em.persistAndFlush(
            new User("田中", "tanaka@example.com"));
        em.persistAndFlush(
            new User("佐藤", "sato@example.com"));

        Optional<User> found =
            userRepository.findByEmail("tanaka@example.com");

        assertTrue(found.isPresent());
        assertEquals("田中", found.get().getName());
    }

    @Test
    @DisplayName("存在しないメールはemptyを返す")
    void findByEmail_存在しないメール_empty() {
        Optional<User> found =
            userRepository.findByEmail("none@example.com");
        assertTrue(found.isEmpty());
    }
    // 各テスト後に自動ロールバック（DB状態がリセットされる）
}`,
      },
      {
        title: "テストデータの準備",
        content:
          "テストデータの準備には複数の方法があります。@Sql でSQLファイルを実行する方法、TestEntityManager でエンティティを直接永続化する方法、data.sql で共通データを投入する方法があります。テストの目的に応じて使い分け、テストデータの管理を効率化します。",
        code: `// @Sql: テスト前にSQLファイルを実行
@DataJpaTest
@Sql("/test-data/users.sql")   // テスト前に実行
@Sql(value = "/test-data/cleanup.sql",
     executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class SqlAnnotationTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void findAll_SQLで投入したデータを取得() {
        List<User> users = userRepository.findAll();
        assertEquals(3, users.size()); // SQLで3件投入済み
    }
}

// test-data/users.sql の内容:
// INSERT INTO users (id, name, email)
// VALUES (1, '田中', 'tanaka@example.com');
// INSERT INTO users (id, name, email)
// VALUES (2, '佐藤', 'sato@example.com');
// INSERT INTO users (id, name, email)
// VALUES (3, '鈴木', 'suzuki@example.com');

// テストデータビルダーパターン
class TestDataBuilder {
    public static User createUser() {
        return new User("テスト太郎", "test@example.com");
    }

    public static User createUser(String name) {
        return new User(name, name + "@example.com");
    }

    public static Order createOrder(User user) {
        Order order = new Order();
        order.setUser(user);
        order.setTotal(1000);
        order.setStatus(OrderStatus.CREATED);
        return order;
    }
}

// ビルダーの使用例
@Test
void test_with_builder() {
    User user = em.persistAndFlush(
        TestDataBuilder.createUser("田中"));
    Order order = em.persistAndFlush(
        TestDataBuilder.createOrder(user));
    assertNotNull(order.getId());
}`,
      },
      {
        title: "カスタムクエリのテスト",
        content:
          "@Query で定義したカスタムクエリ、ネイティブクエリ、Specification を使った動的クエリが正しく動作するかをテストします。特に複雑なクエリはバグが発生しやすいため、様々な条件でのテストが重要です。",
        code: `// テスト対象の Repository
// public interface UserRepository
//     extends JpaRepository<User, Long> {
//
//     @Query("SELECT u FROM User u WHERE u.active = true")
//     List<User> findActiveUsers();
//
//     @Query("SELECT u FROM User u WHERE u.name LIKE %:keyword%")
//     List<User> searchByName(@Param("keyword") String keyword);
//
//     @Query(value = "SELECT * FROM users WHERE created_at > :date",
//            nativeQuery = true)
//     List<User> findRecentUsers(@Param("date") LocalDate date);
// }

@DataJpaTest
class CustomQueryTest {

    @Autowired private UserRepository repo;
    @Autowired private TestEntityManager em;

    @Test
    @DisplayName("アクティブなユーザーのみ取得できる")
    void findActiveUsers_アクティブのみ返す() {
        em.persistAndFlush(new User("田中", true));  // active
        em.persistAndFlush(new User("佐藤", false)); // inactive
        em.persistAndFlush(new User("鈴木", true));  // active

        List<User> active = repo.findActiveUsers();

        assertEquals(2, active.size());
        assertTrue(active.stream()
            .allMatch(User::isActive));
    }

    @Test
    @DisplayName("名前のキーワード検索ができる")
    void searchByName_部分一致で検索() {
        em.persistAndFlush(new User("田中太郎", true));
        em.persistAndFlush(new User("田中花子", true));
        em.persistAndFlush(new User("佐藤一郎", true));

        List<User> results = repo.searchByName("田中");

        assertEquals(2, results.size());
        assertTrue(results.stream()
            .allMatch(u -> u.getName().contains("田中")));
    }

    @Test
    @DisplayName("ネイティブクエリ: 最近のユーザーを取得")
    void findRecentUsers_指定日以降のユーザー() {
        // テストデータの準備と検証
        List<User> recent = repo.findRecentUsers(
            LocalDate.of(2025, 1, 1));
        assertNotNull(recent);
    }
}`,
      },
      {
        title: "トランザクションの確認",
        content:
          "@DataJpaTest ではデフォルトで各テスト後にトランザクションがロールバックされます。@Transactional の伝播属性（REQUIRED、REQUIRES_NEW等）のテストや、ロールバック条件の確認も重要です。@Commit を付けるとテスト後にコミットされます。",
        code: `@DataJpaTest
class TransactionTest {

    @Autowired private UserRepository userRepository;
    @Autowired private TestEntityManager em;

    // デフォルトで各テスト後にロールバック
    @Test
    @DisplayName("テスト後にデータがロールバックされる")
    void save_テスト後ロールバック() {
        userRepository.save(new User("田中", "a@example.com"));
        assertEquals(1, userRepository.count());
        // テスト終了後、このデータはロールバックされる
    }

    // @Commit でテスト後にコミット（通常は使わない）
    @Test
    @Commit
    @DisplayName("Commitアノテーション付きはコミットされる")
    void save_コミットされる() {
        userRepository.save(new User("佐藤", "b@example.com"));
    }

    // @Rollback(false) でもコミット可能
    @Test
    @Rollback(false)
    void save_ロールバックしない() {
        userRepository.save(new User("鈴木", "c@example.com"));
    }
}

// Service 層のトランザクションテスト
@SpringBootTest
class TransactionServiceTest {

    @Autowired private OrderService orderService;
    @Autowired private OrderRepository orderRepo;

    @Test
    @DisplayName("決済失敗時に注文がロールバックされる")
    void placeOrder_決済失敗_ロールバック() {
        assertThrows(PaymentException.class,
            () -> orderService.placeOrder(
                new OrderRequest("不正なカード")));

        // ロールバックにより注文は保存されていない
        assertEquals(0, orderRepo.count());
    }
}`,
      },
      {
        title: "Testcontainers でのDBテスト",
        content:
          "Testcontainers は、Docker コンテナとしてデータベースを起動し、本番と同じDBエンジンでテストを実行できるライブラリです。H2 などの組み込みDBとの互換性の問題を回避し、PostgreSQL や MySQL 固有の機能も正しくテストできます。",
        code: `// 依存関係（pom.xml）
// <dependency>
//   <groupId>org.testcontainers</groupId>
//   <artifactId>postgresql</artifactId>
//   <scope>test</scope>
// </dependency>
// <dependency>
//   <groupId>org.testcontainers</groupId>
//   <artifactId>junit-jupiter</artifactId>
//   <scope>test</scope>
// </dependency>

@SpringBootTest
@Testcontainers
class PostgresIntegrationTest {

    // PostgreSQL コンテナの定義
    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    // コンテナの動的ポートをプロパティに設定
    @DynamicPropertySource
    static void configureProperties(
            DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url",
            postgres::getJdbcUrl);
        registry.add("spring.datasource.username",
            postgres::getUsername);
        registry.add("spring.datasource.password",
            postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("PostgreSQLでCRUD操作が正しく動作する")
    void crud_PostgreSQL上で動作() {
        // Create
        User saved = userRepository.save(
            new User("田中", "tanaka@example.com"));
        assertNotNull(saved.getId());

        // Read
        User found = userRepository.findById(saved.getId())
            .orElseThrow();
        assertEquals("田中", found.getName());

        // Update
        found.setName("田中太郎");
        userRepository.save(found);

        // Delete
        userRepository.delete(found);
        assertTrue(userRepository.findById(
            saved.getId()).isEmpty());
    }
}`,
      },
    ],
  },
  // ===== 統合テスト (integration) =====
  {
    id: "integration-test-strategy",
    title: "統合テスト戦略",
    category: "integration",
    description:
      "統合テストの範囲、テスト環境構築、CI/CDとの連携",
    sections: [
      {
        title: "統合テストの範囲設計",
        content:
          "統合テストでは、複数のコンポーネントが正しく連携して動作するかを検証します。外部API、データベース、メッセージキュー、ファイルシステムとの連携が主な対象です。すべてを統合テストで検証するのではなく、単体テストでカバーできるロジックは単体テストに任せ、コンポーネント間のインタラクションに焦点を当てます。モックとの境界線を明確にし、外部依存をどこまで実物で検証するかを戦略的に決めることが重要です。",
      },
      {
        title: "テスト環境の構築",
        content:
          "テスト環境の構築には Docker Compose を活用し、データベースやメッセージブローカーなどの外部依存を再現可能な形で用意します。外部APIについては WireMock を使ってモックサーバーを立て、テストの安定性を確保します。テストプロファイル（application-test.yml）で本番とは異なる設定を管理し、テスト専用の接続情報やタイムアウト値を定義します。",
        code: `# docker-compose-test.yml
# テスト用のDocker Compose設定
version: '3.8'
services:
  # テスト用PostgreSQL
  test-db:
    image: postgres:15
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: testuser
      POSTGRES_PASSWORD: testpass
    ports:
      - "5433:5432"

  # WireMock で外部APIをモック
  wiremock:
    image: wiremock/wiremock:3.3.1
    ports:
      - "8089:8080"
    volumes:
      - ./wiremock:/home/wiremock

---
// WireMock のスタブ設定（Java）
@SpringBootTest
@AutoConfigureWireMock(port = 0)
class ExternalApiIntegrationTest {

    @Autowired
    private PaymentClient paymentClient;

    @Test
    void 外部決済APIとの連携を検証する() {
        // WireMock でスタブを定義
        stubFor(post(urlEqualTo("/api/payments"))
            .willReturn(aResponse()
                .withStatus(200)
                .withHeader("Content-Type", "application/json")
                .withBody("{\\"transactionId\\": \\"TXN-001\\", \\"status\\": \\"SUCCESS\\"}")
            ));

        // 実際のクライアントを使って呼び出し
        PaymentResponse response = paymentClient.processPayment(
            new PaymentRequest("ORDER-001", 5000)
        );

        // レスポンスを検証
        assertThat(response.getTransactionId()).isEqualTo("TXN-001");
        assertThat(response.getStatus()).isEqualTo("SUCCESS");
    }
}`,
      },
      {
        title: "CI/CDパイプライン",
        content:
          "CI/CDパイプラインでテストを自動実行することで、品質を継続的に保証します。GitHub Actions でプルリクエスト時に統合テストを実行し、テストの並列化で実行時間を短縮します。Gradle や Maven でユニットテストと統合テストを分離し、フィードバックループを高速化します。",
        code: `# .github/workflows/test.yml
# GitHub Actions でテストを自動実行
name: テスト実行
on: [push, pull_request]

jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: ユニットテスト実行
        run: ./gradlew test

  integration-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: testuser
          POSTGRES_PASSWORD: testpass
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: 統合テスト実行
        run: ./gradlew integrationTest

---
// build.gradle - テストの分離設定
// ユニットテストと統合テストを分けて実行
sourceSets {
    integrationTest {
        java.srcDir "src/integrationTest/java"
        resources.srcDir "src/integrationTest/resources"
        compileClasspath += main.output + test.output
        runtimeClasspath += main.output + test.output
    }
}

// 統合テスト用タスク
tasks.register('integrationTest', Test) {
    description = '統合テストを実行する'
    group = 'verification'
    testClassesDirs = sourceSets.integrationTest.output.classesDirs
    classpath = sourceSets.integrationTest.runtimeClasspath
    // ユニットテストの後に実行
    shouldRunAfter test
}`,
      },
      {
        title: "テストデータ管理",
        content:
          "統合テストではテストデータの管理が重要です。各テスト実行前にデータを初期化し、テスト後にクリーンアップすることで、テスト間の依存を排除します。Flyway や Liquibase でマイグレーションを管理し、テスト専用のデータセットを用意します。@Sql アノテーションや Testcontainers を活用して、再現可能なテスト環境を構築します。",
        code: `// テストデータの初期化とクリーンアップ
@SpringBootTest
@Transactional // 各テスト後に自動ロールバック
@Sql(scripts = "/sql/test-data.sql",
     executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
class OrderRepositoryIntegrationTest {

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void 注文データを正しく取得できる() {
        // test-data.sql で投入されたデータを使用
        List<Order> orders = orderRepository.findByCustomerId("C001");

        assertThat(orders).hasSize(3);
        assertThat(orders.get(0).getStatus()).isEqualTo(OrderStatus.CONFIRMED);
    }

    @Test
    void 日付範囲で注文を検索できる() {
        LocalDate from = LocalDate.of(2025, 1, 1);
        LocalDate to = LocalDate.of(2025, 12, 31);

        List<Order> orders = orderRepository.findByDateRange(from, to);

        assertThat(orders).isNotEmpty();
        assertThat(orders).allMatch(o ->
            !o.getOrderDate().isBefore(from) && !o.getOrderDate().isAfter(to)
        );
    }
}`,
      },
      {
        title: "テスト実行の最適化",
        content:
          "統合テストは単体テストより実行時間が長いため、最適化が重要です。テストの並列実行、テストの依存関係管理、遅いテストの特定と改善を行います。JUnit 5 の並列実行機能や、テストのグループ化による選択的実行で、フィードバック時間を短縮します。",
        code: `// junit-platform.properties - 並列実行設定
// junit.jupiter.execution.parallel.enabled=true
// junit.jupiter.execution.parallel.mode.default=concurrent
// junit.jupiter.execution.parallel.config.fixed.parallelism=4

// 遅いテストの特定と改善
@SpringBootTest
@Tag("slow") // 遅いテストにタグを付ける
class SlowIntegrationTest {

    @Test
    @Timeout(value = 5, unit = TimeUnit.SECONDS) // タイムアウトを設定
    void 大量データの処理が制限時間内に完了する() {
        // テストデータ1000件を投入
        List<Order> orders = IntStream.rangeClosed(1, 1000)
            .mapToObj(i -> new Order("ORDER-" + i, 1000 * i))
            .toList();

        // バッチ処理の実行時間を計測
        long start = System.currentTimeMillis();
        orderService.processBatch(orders);
        long elapsed = System.currentTimeMillis() - start;

        // 処理時間が基準値以内であることを検証
        assertThat(elapsed).isLessThan(5000L);
        System.out.println("処理時間: " + elapsed + "ms");
    }
}

// Gradle で遅いテストを除外して実行
// ./gradlew test -PexcludeTags=slow`,
      },
    ],
  },
  {
    id: "api-integration-test",
    title: "REST API 統合テスト",
    category: "integration",
    description:
      "APIの結合テスト、コントラクトテスト、E2Eテスト",
    sections: [
      {
        title: "REST API テストの全体像",
        content:
          "REST APIのテストは3つのレベルに分けられます。単体テスト（@WebMvcTest）ではコントローラー単体のリクエスト/レスポンスを検証し、統合テスト（@SpringBootTest）ではアプリケーション全体を起動して実際のHTTPリクエストで検証します。E2Eテストでは本番に近い環境で外部依存も含めた全体の動作を検証します。各レベルで何を確認するかを明確にし、テストピラミッドのバランスを保つことが重要です。",
      },
      {
        title: "Spring Boot での API 統合テスト",
        content:
          "@SpringBootTest(webEnvironment = RANDOM_PORT) を使うと、アプリケーション全体を起動し、ランダムなポートで実際のHTTPリクエストを送信してテストできます。TestRestTemplate や WebTestClient を使い、実際のネットワーク通信を通じたエンドツーエンドの動作を検証します。",
        code: `// REST API の統合テスト（フルスタック）
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void ユーザー作成からの取得までの一連のフローを検証する() {
        // ユーザー作成リクエスト
        CreateUserRequest request = new CreateUserRequest("田中太郎", "tanaka@example.com");
        ResponseEntity<UserResponse> createResponse = restTemplate.postForEntity(
            "/api/users", request, UserResponse.class
        );

        // 作成結果の検証
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(createResponse.getBody().getName()).isEqualTo("田中太郎");
        Long userId = createResponse.getBody().getId();

        // 作成したユーザーを取得
        ResponseEntity<UserResponse> getResponse = restTemplate.getForEntity(
            "/api/users/{id}", UserResponse.class, userId
        );

        // 取得結果の検証
        assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getResponse.getBody().getEmail()).isEqualTo("tanaka@example.com");
    }
}`,
      },
      {
        title: "コントラクトテスト",
        content:
          "Spring Cloud Contract を使うと、マイクロサービス間のAPIコントラクト（契約）を自動検証できます。プロバイダー側でコントラクトを定義し、自動生成されたテストで検証します。コンシューマー側ではスタブを使ってプロバイダーの応答をシミュレートし、インターフェースの整合性を保証します。",
        code: `// Spring Cloud Contract - コントラクト定義（Groovy DSL）
// contracts/shouldReturnUser.groovy
// Contract.make {
//     request {
//         method 'GET'
//         url '/api/users/1'
//     }
//     response {
//         status 200
//         body(id: 1, name: "田中太郎", email: "tanaka@example.com")
//         headers { contentType(applicationJson()) }
//     }
// }

// プロバイダー側の基底テストクラス
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
abstract class ContractTestBase {

    @Autowired
    private WebApplicationContext context;

    @MockBean
    private UserService userService;

    @BeforeEach
    void setup() {
        RestAssuredMockMvc.webAppContextSetup(context);
        // コントラクトで定義されたデータを返すようモック設定
        given(userService.findById(1L))
            .willReturn(new User(1L, "田中太郎", "tanaka@example.com"));
    }
}

// コンシューマー側のテスト（スタブを使用）
@SpringBootTest
@AutoConfigureStubRunner(
    ids = "com.example:user-service:+:stubs:8090",
    stubsMode = StubRunnerProperties.StubsMode.LOCAL
)
class OrderServiceContractTest {

    @Autowired
    private UserClient userClient;

    @Test
    void ユーザーサービスのコントラクトに準拠している() {
        UserResponse user = userClient.getUser(1L);
        assertThat(user.getName()).isEqualTo("田中太郎");
    }
}`,
      },
      {
        title: "レスポンスの詳細検証",
        content:
          "APIテストでは、HTTPステータスコード、レスポンスヘッダー、レスポンスボディを網羅的に検証します。ページネーション、エラーレスポンス、日付フォーマットなど、細部まで確認することで、クライアントとの契約を保証します。",
        code: `// レスポンスの詳細検証
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProductApiResponseTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void 商品一覧のページネーションが正しく動作する() {
        // ページネーション付きリクエスト
        ResponseEntity<String> response = restTemplate.getForEntity(
            "/api/products?page=0&size=10&sort=price,desc", String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        // JSONPathでレスポンスボディを検証
        DocumentContext json = JsonPath.parse(response.getBody());
        assertThat((int) json.read("$.content.length()")).isLessThanOrEqualTo(10);
        assertThat((int) json.read("$.totalElements")).isGreaterThan(0);
        assertThat((int) json.read("$.number")).isEqualTo(0); // 0ページ目
        assertThat((boolean) json.read("$.first")).isTrue();
    }

    @Test
    void 存在しない商品へのリクエストで404が返る() {
        ResponseEntity<String> response = restTemplate.getForEntity(
            "/api/products/99999", String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        DocumentContext json = JsonPath.parse(response.getBody());
        assertThat((String) json.read("$.error")).isEqualTo("NOT_FOUND");
        assertThat((String) json.read("$.message")).contains("商品が見つかりません");
    }
}`,
      },
      {
        title: "認証・認可の統合テスト",
        content:
          "JWT や OAuth2 を使ったAPIの認証・認可テストでは、有効なトークン、無効なトークン、期限切れトークン、権限不足のケースを検証します。Spring Security Test の機能を活用して、様々な認証状態をシミュレートします。",
        code: `// 認証・認可の統合テスト
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class SecurityIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Test
    void 有効なトークンでAPIにアクセスできる() {
        // 有効なJWTトークンを生成
        String token = tokenProvider.generateToken("user01", List.of("ROLE_USER"));

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
            "/api/users/me", HttpMethod.GET, request, String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    void トークンなしでアクセスすると401が返る() {
        ResponseEntity<String> response = restTemplate.getForEntity(
            "/api/users/me", String.class
        );
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    void 管理者権限のないユーザーが管理APIにアクセスすると403が返る() {
        String token = tokenProvider.generateToken("user01", List.of("ROLE_USER"));
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);

        ResponseEntity<String> response = restTemplate.exchange(
            "/api/admin/users", HttpMethod.GET,
            new HttpEntity<>(headers), String.class
        );

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }
}`,
      },
    ],
  },
  // ===== テスト観点 (viewpoint) =====
  {
    id: "viewpoint-functional",
    title: "機能テストの観点",
    category: "viewpoint",
    description:
      "正常系・異常系・境界値・業務ロジックの確認ポイント",
    sections: [
      {
        title: "正常系テストの観点",
        content:
          "正常系テストでは、期待される入力で期待される出力が得られるかを検証します。主要なユースケースのハッピーパスを網羅し、CRUD操作の基本動作を確認します。すべての正常フロー（作成、取得、更新、削除）が正しく動作し、データの整合性が保たれることを確認します。ビジネス要件に基づいた代表的な入力パターンを選び、テストケースを設計します。",
        code: `// 正常系テスト - CRUD操作の検証
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void ユーザーを正常に作成できる() {
        // 準備: 正常な入力データ
        CreateUserRequest request = new CreateUserRequest("田中太郎", "tanaka@example.com");
        given(userRepository.save(any(User.class)))
            .willReturn(new User(1L, "田中太郎", "tanaka@example.com"));

        // 実行
        UserResponse response = userService.createUser(request);

        // 検証: 期待される出力を確認
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("田中太郎");
        assertThat(response.getEmail()).isEqualTo("tanaka@example.com");
        then(userRepository).should().save(any(User.class));
    }

    @Test
    void ユーザーを正常に更新できる() {
        User existing = new User(1L, "田中太郎", "tanaka@example.com");
        given(userRepository.findById(1L)).willReturn(Optional.of(existing));
        given(userRepository.save(any())).willAnswer(inv -> inv.getArgument(0));

        UserResponse response = userService.updateUser(1L,
            new UpdateUserRequest("田中次郎", "jiro@example.com"));

        assertThat(response.getName()).isEqualTo("田中次郎");
        assertThat(response.getEmail()).isEqualTo("jiro@example.com");
    }
}`,
      },
      {
        title: "異常系テストの観点",
        content:
          "異常系テストでは、不正な入力、null や空値、範囲外の値、不正な状態遷移に対して、システムが適切にエラーハンドリングするかを検証します。例外が正しくスローされるか、エラーメッセージが適切か、回復処理が正しく動作するかを確認します。異常系テストは正常系以上に重要で、堅牢なシステムを構築するための基盤です。",
        code: `// 異常系テスト - エラーハンドリングの検証
class OrderServiceErrorTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private InventoryService inventoryService;

    @InjectMocks
    private OrderService orderService;

    @Test
    void 存在しない注文を取得すると例外がスローされる() {
        given(orderRepository.findById(999L)).willReturn(Optional.empty());

        // 例外の型とメッセージを検証
        assertThatThrownBy(() -> orderService.findById(999L))
            .isInstanceOf(OrderNotFoundException.class)
            .hasMessage("注文ID: 999 が見つかりません");
    }

    @Test
    void 在庫不足で注文するとビジネス例外がスローされる() {
        given(inventoryService.checkStock("ITEM-001", 100))
            .willReturn(false);

        OrderRequest request = new OrderRequest("ITEM-001", 100);

        assertThatThrownBy(() -> orderService.placeOrder(request))
            .isInstanceOf(InsufficientStockException.class)
            .hasMessageContaining("在庫が不足しています");
    }

    @Test
    void null入力で注文するとIllegalArgumentExceptionがスローされる() {
        assertThatThrownBy(() -> orderService.placeOrder(null))
            .isInstanceOf(IllegalArgumentException.class);
    }
}`,
      },
      {
        title: "境界値テストの観点",
        content:
          "境界値テストでは、入力値の上限・下限、コレクションの0件・1件・最大件数、文字列の空文字・最大長、日付の月末・年末・うるう年など、境界条件での動作を検証します。バグは境界値付近で発生しやすいため、境界値±1のテストを確実に行うことが重要です。",
        code: `// 境界値テスト - 限界値付近の動作を検証
class BoundaryValueTest {

    private final PriceCalculator calculator = new PriceCalculator();
    private final Validator validator = new StringValidator();

    @ParameterizedTest
    @CsvSource({
        "0, 0",         // 最小値: 金額0円
        "1, 1",         // 最小値+1: 1円
        "999999, 999999", // 最大値-1
        "1000000, 1000000" // 最大値: 100万円
    })
    void 金額の境界値で正しく計算される(int input, int expected) {
        assertThat(calculator.calculate(input)).isEqualTo(expected);
    }

    @Test
    void 最大金額を超えるとエラーになる() {
        assertThatThrownBy(() -> calculator.calculate(1000001))
            .isInstanceOf(IllegalArgumentException.class)
            .hasMessage("金額は1,000,000円以下にしてください");
    }

    @ParameterizedTest
    @ValueSource(strings = {"", " ", "a", "あ"})
    void 文字列の最小長でバリデーションされる(String input) {
        // 最低2文字必要なフィールド
        assertThat(validator.validate(input, 2, 100)).isFalse();
    }

    @Test
    void うるう年の2月29日を正しく処理する() {
        LocalDate leapDay = LocalDate.of(2024, 2, 29);
        assertThat(DateUtils.isValidBusinessDay(leapDay)).isTrue();
    }
}`,
      },
      {
        title: "業務ロジックの観点",
        content:
          "業務ロジックのテストでは、計算ロジックの正確性（消費税計算、割引計算、ポイント計算）、条件分岐の網羅、業務ルールの適用順序を検証します。特に金額に関わる計算は、丸め処理や端数処理のルールを正確にテストする必要があります。ビジネス要件書に基づいた具体的な数値でテストケースを設計します。",
        code: `// 業務ロジックテスト - 消費税・割引計算の検証
class PricingServiceTest {

    private final PricingService pricingService = new PricingService();

    @ParameterizedTest
    @CsvSource({
        "1000, 10, 100, 990",   // 税込1100円、割引100円 → 990円
        "500,  8,  0,   540",   // 軽減税率8%、割引なし → 540円
        "100,  10, 50,  60",    // 税込110円、割引50円 → 60円
        "1,    10, 0,   1"      // 最小金額: 1円（税込1.1→切り捨て1円）
    })
    void 税込金額と割引を正しく計算する(int price, int taxRate, int discount, int expected) {
        // 業務ルール: 税込金額を計算後、割引を適用
        int result = pricingService.calculateFinalPrice(price, taxRate, discount);
        assertThat(result).isEqualTo(expected);
    }

    @Test
    void ポイント計算が業務ルールに従う() {
        // 業務ルール: 100円につき1ポイント、端数切り捨て
        assertThat(pricingService.calculatePoints(980)).isEqualTo(9);
        assertThat(pricingService.calculatePoints(1000)).isEqualTo(10);
        assertThat(pricingService.calculatePoints(99)).isEqualTo(0);

        // ゴールド会員は2倍
        assertThat(pricingService.calculatePoints(1000, MemberRank.GOLD))
            .isEqualTo(20);
    }
}`,
      },
      {
        title: "データ変換・マッピングの観点",
        content:
          "データ変換テストでは、Entity から DTO、DTO から Response への変換が正しく行われるかを検証します。日付フォーマット（ISO 8601）、通貨フォーマット、null や Optional のハンドリングが特に注意が必要なポイントです。変換漏れやフィールドの対応ミスを防ぐため、全フィールドの変換を確認します。",
        code: `// データ変換・マッピングの検証
class UserMapperTest {

    private final UserMapper mapper = new UserMapper();

    @Test
    void EntityからDTOへの変換が正しく行われる() {
        // 準備: 全フィールドが設定されたEntity
        User entity = new User(1L, "田中太郎", "tanaka@example.com",
            LocalDateTime.of(2025, 6, 15, 10, 30, 0));

        // 実行
        UserDto dto = mapper.toDto(entity);

        // 検証: 全フィールドが正しく変換されている
        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getName()).isEqualTo("田中太郎");
        assertThat(dto.getEmail()).isEqualTo("tanaka@example.com");
        // ISO 8601形式で変換されている
        assertThat(dto.getCreatedAt()).isEqualTo("2025-06-15T10:30:00");
    }

    @Test
    void nullフィールドの変換が安全に行われる() {
        // メールアドレスがnullのEntity
        User entity = new User(2L, "佐藤花子", null, null);

        UserDto dto = mapper.toDto(entity);

        assertThat(dto.getEmail()).isNull();
        assertThat(dto.getCreatedAt()).isNull();
    }

    @Test
    void Optionalフィールドのマッピングが正しい() {
        User entity = new User(3L, "鈴木一郎", "suzuki@example.com", null);
        entity.setNickname(Optional.of("イチロー"));

        UserDto dto = mapper.toDto(entity);
        assertThat(dto.getNickname()).isEqualTo("イチロー");
    }
}`,
      },
    ],
  },
  {
    id: "viewpoint-nonfunctional",
    title: "非機能テストの観点",
    category: "viewpoint",
    description:
      "パフォーマンス、セキュリティ、信頼性、ユーザビリティ",
    sections: [
      {
        title: "パフォーマンステストの観点",
        content:
          "パフォーマンステストでは、レスポンスタイム、スループット、リソース使用率を検証します。大量データでの処理時間、N+1問題の検出、メモリ使用量の確認が重要なポイントです。JMH（Java Microbenchmark Harness）を使ったマイクロベンチマークで、特定の処理のパフォーマンスを定量的に計測します。",
        code: `// JMH マイクロベンチマーク - パフォーマンス計測
@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 5, time = 1)
public class SearchPerformanceBenchmark {

    private List<Product> products;
    private ProductService service;

    @Setup
    public void setUp() {
        // 10万件のテストデータを準備
        products = IntStream.rangeClosed(1, 100_000)
            .mapToObj(i -> new Product("PROD-" + i, "商品" + i, i * 100))
            .toList();
        service = new ProductService(products);
    }

    @Benchmark
    public List<Product> 線形探索で商品を検索する() {
        return service.searchByLinear("商品50000");
    }

    @Benchmark
    public List<Product> インデックス付き検索で商品を検索する() {
        return service.searchByIndex("商品50000");
    }
}
// 実行: java -jar benchmarks.jar SearchPerformanceBenchmark`,
      },
      {
        title: "セキュリティテストの観点",
        content:
          "セキュリティテストでは、SQLインジェクション、XSS（クロスサイトスクリプティング）、CSRF（クロスサイトリクエストフォージェリ）への耐性を検証します。認証バイパス、権限昇格、セッション管理の脆弱性、入力値のサニタイズが正しく行われているかを確認します。",
        code: `// セキュリティテスト - SQLインジェクション対策の検証
@SpringBootTest
class SqlInjectionPreventionTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

    @BeforeEach
    void setUp() {
        entityManager.persist(new User("正常ユーザー", "normal@example.com"));
        entityManager.flush();
    }

    @ParameterizedTest
    @ValueSource(strings = {
        "' OR '1'='1",           // 基本的なSQLインジェクション
        "'; DROP TABLE users;--", // テーブル削除攻撃
        "' UNION SELECT * FROM users--", // UNION攻撃
        "1; DELETE FROM users"    // DELETE攻撃
    })
    void SQLインジェクション文字列で不正なデータが取得されない(String maliciousInput) {
        // PreparedStatementにより安全にクエリが実行される
        List<User> results = userRepository.findByName(maliciousInput);

        // 不正な入力では結果が返らないことを確認
        assertThat(results).isEmpty();
    }

    @Test
    void SQLインジェクション後もデータが破壊されていない() {
        // 攻撃的な入力を実行
        userRepository.findByName("'; DROP TABLE users;--");

        // テーブルとデータが無事であることを確認
        List<User> allUsers = userRepository.findAll();
        assertThat(allUsers).isNotEmpty();
    }
}`,
      },
      {
        title: "信頼性テストの観点",
        content:
          "信頼性テストでは、障害時の挙動を検証します。データベース切断、ネットワーク断、タイムアウト発生時にシステムが適切に対応できるかを確認します。リトライ処理やサーキットブレーカーが正しく機能し、障害から回復できることを検証します。",
        code: `// 信頼性テスト - リトライとサーキットブレーカーの検証
@SpringBootTest
class ResilienceTest {

    @Autowired
    private PaymentService paymentService;

    @MockBean
    private ExternalPaymentApi externalApi;

    @Test
    void 一時的な障害時にリトライが実行される() {
        // 最初の2回は失敗、3回目で成功
        given(externalApi.processPayment(any()))
            .willThrow(new ConnectionException("接続タイムアウト"))
            .willThrow(new ConnectionException("接続タイムアウト"))
            .willReturn(new PaymentResult("TXN-001", "SUCCESS"));

        PaymentResult result = paymentService.pay(new PaymentRequest(5000));

        // 3回目のリトライで成功
        assertThat(result.getStatus()).isEqualTo("SUCCESS");
        then(externalApi).should(times(3)).processPayment(any());
    }

    @Test
    void 連続障害時にサーキットブレーカーが開く() {
        // すべてのリクエストが失敗
        given(externalApi.processPayment(any()))
            .willThrow(new ConnectionException("サービス停止中"));

        // 一定回数失敗するとサーキットブレーカーが開く
        for (int i = 0; i < 5; i++) {
            assertThatThrownBy(() -> paymentService.pay(new PaymentRequest(1000)))
                .isInstanceOf(ServiceUnavailableException.class);
        }

        // サーキットブレーカーが開いた状態では即座にエラーが返る
        assertThatThrownBy(() -> paymentService.pay(new PaymentRequest(1000)))
            .isInstanceOf(CircuitBreakerOpenException.class)
            .hasMessageContaining("サービスは一時的に利用できません");
    }
}`,
      },
      {
        title: "排他制御テストの観点",
        content:
          "排他制御テストでは、楽観的ロックと悲観的ロックの動作確認、同時更新の競合処理、デッドロック検出を検証します。複数スレッドから同時にデータを更新した場合に、データの整合性が保たれることを確認します。",
        code: `// 排他制御テスト - 楽観的ロックの競合検証
@SpringBootTest
class OptimisticLockTest {

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountRepository accountRepository;

    @Test
    void 同時更新で楽観的ロック例外が発生する() throws Exception {
        // テストデータ: 残高10000円の口座
        Account account = accountRepository.save(
            new Account("ACC-001", 10000, 0L) // version=0
        );

        // 2つのスレッドが同時に更新を試みる
        ExecutorService executor = Executors.newFixedThreadPool(2);
        CountDownLatch latch = new CountDownLatch(1);

        Future<?> thread1 = executor.submit(() -> {
            latch.await();
            accountService.withdraw("ACC-001", 3000); // 3000円引き出し
            return null;
        });
        Future<?> thread2 = executor.submit(() -> {
            latch.await();
            accountService.withdraw("ACC-001", 5000); // 5000円引き出し
            return null;
        });

        latch.countDown(); // 同時に開始

        // どちらか一方が OptimisticLockException で失敗する
        assertThatThrownBy(() -> {
            thread1.get();
            thread2.get();
        }).hasCauseInstanceOf(OptimisticLockingFailureException.class);

        executor.shutdown();
    }
}`,
      },
      {
        title: "可用性テストの観点",
        content:
          "可用性テストでは、ヘルスチェックエンドポイントの正常動作、グレースフルシャットダウン、設定の動的変更、メモリリーク検出を検証します。システムが高可用性を維持できるかを確認し、障害検知と自動復旧の仕組みが正しく機能することを保証します。",
      },
    ],
  },
  {
    id: "viewpoint-data",
    title: "データテストの観点",
    category: "viewpoint",
    description:
      "DB操作、データ整合性、マイグレーション、バッチ処理",
    sections: [
      {
        title: "CRUD操作の観点",
        content:
          "データベースのCRUD操作テストでは、INSERT（一意制約、NOT NULL制約）、SELECT（存在/不在、ソート順）、UPDATE（部分更新、楽観的ロック）、DELETE（カスケード、ソフトデリート）を検証します。各操作で制約違反時の挙動も確認し、データの整合性が保たれることを保証します。",
        code: `// CRUD操作テスト - データベース制約の検証
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ProductRepositoryTest {

    @Autowired
    private TestEntityManager em;

    @Autowired
    private ProductRepository repository;

    @Test
    void INSERT_一意制約違反で例外がスローされる() {
        em.persist(new Product("SKU-001", "商品A", 1000));
        em.flush();

        // 同じSKUで登録するとユニーク制約違反
        Product duplicate = new Product("SKU-001", "商品B", 2000);
        assertThatThrownBy(() -> {
            em.persist(duplicate);
            em.flush();
        }).isInstanceOf(PersistenceException.class);
    }

    @Test
    void SELECT_ソート順が正しい() {
        em.persist(new Product("SKU-003", "商品C", 3000));
        em.persist(new Product("SKU-001", "商品A", 1000));
        em.persist(new Product("SKU-002", "商品B", 2000));
        em.flush();

        List<Product> products = repository.findAllByOrderByPriceAsc();

        assertThat(products).extracting(Product::getPrice)
            .containsExactly(1000, 2000, 3000);
    }

    @Test
    void DELETE_ソフトデリートで論理削除される() {
        Product product = em.persist(new Product("SKU-001", "商品A", 1000));
        em.flush();

        repository.softDelete(product.getId());
        em.clear(); // キャッシュをクリア

        Product deleted = em.find(Product.class, product.getId());
        assertThat(deleted.isDeleted()).isTrue();
        // 論理削除されたデータは通常の検索に含まれない
        assertThat(repository.findByDeletedFalse()).isEmpty();
    }
}`,
      },
      {
        title: "データ整合性の観点",
        content:
          "データ整合性テストでは、外部キー制約、一意制約、チェック制約が正しく機能するかを検証します。トランザクション境界でのデータの一貫性、ロールバック後のデータ状態も重要な確認ポイントです。",
        code: `// データ整合性テスト - 参照整合性の検証
@DataJpaTest
class ReferentialIntegrityTest {

    @Autowired
    private TestEntityManager em;

    @Test
    void 外部キー制約により存在しない親データへの参照が拒否される() {
        // 存在しないカテゴリIDを持つ商品を登録
        Product product = new Product("SKU-001", "商品A", 1000);
        product.setCategoryId(99999L); // 存在しないカテゴリ

        assertThatThrownBy(() -> {
            em.persist(product);
            em.flush();
        }).isInstanceOf(PersistenceException.class);
    }

    @Test
    void トランザクションのロールバック後にデータが元に戻る() {
        // 初期データを確認
        long initialCount = em.getEntityManager()
            .createQuery("SELECT COUNT(p) FROM Product p", Long.class)
            .getSingleResult();

        // トランザクション内でデータを追加（ロールバックされる）
        em.persist(new Product("SKU-NEW", "新商品", 5000));
        em.flush();
        em.clear();

        // @DataJpaTest は @Transactional なので各テスト後にロールバック
        // この検証はロールバック前の状態を確認
        long currentCount = em.getEntityManager()
            .createQuery("SELECT COUNT(p) FROM Product p", Long.class)
            .getSingleResult();

        assertThat(currentCount).isEqualTo(initialCount + 1);
    }
}`,
      },
      {
        title: "マイグレーションテストの観点",
        content:
          "マイグレーションテストでは、DDL変更の前方互換性、データ移行の正確性、ロールバック可能性、既存データへの影響を検証します。Flyway や Liquibase を使ったマイグレーションスクリプトが正しく動作し、本番データに影響を与えないことを確認します。",
        code: `// マイグレーションテスト - Flyway の動作検証
@SpringBootTest
@TestPropertySource(properties = {
    "spring.flyway.locations=classpath:db/migration,classpath:db/testdata"
})
class FlywayMigrationTest {

    @Autowired
    private Flyway flyway;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void 全マイグレーションが正常に適用される() {
        // マイグレーション情報を取得
        MigrationInfo[] migrations = flyway.info().applied();

        // すべてのマイグレーションが成功していることを確認
        assertThat(migrations).isNotEmpty();
        Arrays.stream(migrations).forEach(info -> {
            assertThat(info.getState()).isEqualTo(MigrationState.SUCCESS);
            System.out.println("適用済み: " + info.getVersion()
                + " - " + info.getDescription());
        });
    }

    @Test
    void カラム追加後も既存データが保持される() {
        // マイグレーション V3 でemailカラムを追加した後
        // 既存のユーザーデータが保持されていることを確認
        Integer count = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM users WHERE email IS NULL", Integer.class
        );

        // 既存データはemail=NULLのまま残っている
        assertThat(count).isGreaterThanOrEqualTo(0);
    }
}`,
      },
      {
        title: "バッチ処理テストの観点",
        content:
          "バッチ処理テストでは、大量データの処理完了、エラー時の中断と再開、チャンクサイズの影響、処理前後のデータ件数を検証します。Spring Batch を使ったジョブの正常完了と異常時のリカバリー動作を確認します。",
        code: `// バッチ処理テスト - Spring Batch ジョブの検証
@SpringBatchTest
@SpringBootTest
class MonthlyReportBatchTest {

    @Autowired
    private JobLauncherTestUtils jobLauncherTestUtils;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Test
    void 月次レポートバッチが正常に完了する() throws Exception {
        // テストデータ: 1000件の売上データを投入
        IntStream.rangeClosed(1, 1000).forEach(i ->
            jdbcTemplate.update(
                "INSERT INTO sales (item_name, amount, sale_date) VALUES (?, ?, ?)",
                "商品" + i, 1000 * i, LocalDate.of(2025, 6, 1)
            )
        );

        // バッチジョブを実行
        JobExecution execution = jobLauncherTestUtils.launchJob(
            new JobParametersBuilder()
                .addString("targetMonth", "2025-06")
                .toJobParameters()
        );

        // ジョブが正常完了したことを確認
        assertThat(execution.getStatus()).isEqualTo(BatchStatus.COMPLETED);
        assertThat(execution.getExitStatus()).isEqualTo(ExitStatus.COMPLETED);

        // レポートデータが生成されたことを確認
        Integer reportCount = jdbcTemplate.queryForObject(
            "SELECT COUNT(*) FROM monthly_reports WHERE report_month = '2025-06'",
            Integer.class
        );
        assertThat(reportCount).isGreaterThan(0);
    }
}`,
      },
      {
        title: "キャッシュテストの観点",
        content:
          "キャッシュテストでは、キャッシュヒット/ミス、キャッシュの無効化（eviction）、TTL（有効期限）、キャッシュとDBの整合性を検証します。キャッシュを使うことで期待通りの性能改善が得られ、データの一貫性が損なわれないことを確認します。",
        code: `// キャッシュテスト - Spring Cache の動作検証
@SpringBootTest
class CacheIntegrationTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CacheManager cacheManager;

    @Test
    void キャッシュヒットでDBアクセスが省略される() {
        // 1回目の呼び出し: DBにアクセス（キャッシュミス）
        Product first = productService.findById(1L);

        // 2回目の呼び出し: キャッシュから取得（DBアクセスなし）
        Product second = productService.findById(1L);

        assertThat(first).isEqualTo(second);
        // ProductRepository.findById が1回しか呼ばれていないことを検証
        then(productRepository).should(times(1)).findById(1L);
    }

    @Test
    void データ更新時にキャッシュが無効化される() {
        // キャッシュに格納
        productService.findById(1L);
        assertThat(cacheManager.getCache("products").get(1L)).isNotNull();

        // 更新処理（@CacheEvict でキャッシュを無効化）
        productService.updatePrice(1L, 5000);

        // キャッシュが無効化されていることを確認
        assertThat(cacheManager.getCache("products").get(1L)).isNull();

        // 次の取得ではDBから最新データを取得
        Product updated = productService.findById(1L);
        assertThat(updated.getPrice()).isEqualTo(5000);
    }
}`,
      },
    ],
  },
  {
    id: "viewpoint-api",
    title: "API テストの観点",
    category: "viewpoint",
    description:
      "リクエスト/レスポンス検証、エラーハンドリング、バージョニング",
    sections: [
      {
        title: "リクエスト検証の観点",
        content:
          "リクエスト検証テストでは、必須パラメータの欠如、型不一致、サイズ超過、Content-Type の不正、認証ヘッダーの欠如、パスパラメータの不正値など、不正なリクエストに対する挙動を検証します。APIが堅牢であるためには、あらゆる不正入力を適切に拒否し、わかりやすいエラーメッセージを返す必要があります。",
        code: `// リクエスト検証テスト - バリデーションの網羅的検証
@WebMvcTest(UserController.class)
class RequestValidationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void 必須パラメータが欠如すると400エラーが返る() throws Exception {
        // nameフィールドが欠落したリクエスト
        String invalidJson = "{\\"email\\": \\"test@example.com\\"}";

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors[0].field").value("name"))
            .andExpect(jsonPath("$.errors[0].message").value("名前は必須です"));
    }

    @Test
    void 文字列長が上限を超えると400エラーが返る() throws Exception {
        String longName = "あ".repeat(256); // 最大255文字
        String json = "{\\"name\\": \\"" + longName + "\\", \\"email\\": \\"t@example.com\\"}";

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors[0].field").value("name"));
    }

    @Test
    void 不正なContent_Typeで415エラーが返る() throws Exception {
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.TEXT_PLAIN)
                .content("invalid"))
            .andExpect(status().isUnsupportedMediaType());
    }
}`,
      },
      {
        title: "レスポンス検証の観点",
        content:
          "レスポンス検証テストでは、HTTPステータスコードの適切性（200/201/204/400/401/403/404/500）、レスポンスボディの構造、ページネーション情報（page, size, totalElements）、HATEOASリンクを検証します。クライアントが正しくレスポンスを処理できることを保証します。",
        code: `// レスポンス検証テスト - ステータスコードとボディの検証
@WebMvcTest(ProductController.class)
class ResponseValidationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @Test
    void 新規作成で201_CREATEDとLocationヘッダーが返る() throws Exception {
        given(productService.create(any()))
            .willReturn(new ProductResponse(1L, "新商品", 3000));

        mockMvc.perform(post("/api/products")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"name\\": \\"新商品\\", \\"price\\": 3000}"))
            .andExpect(status().isCreated())
            .andExpect(header().string("Location", containsString("/api/products/1")))
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("新商品"));
    }

    @Test
    void 削除で204_NO_CONTENTが返りボディが空() throws Exception {
        mockMvc.perform(delete("/api/products/1"))
            .andExpect(status().isNoContent())
            .andExpect(content().string(""));
    }

    @Test
    void ページネーション情報が正しく返る() throws Exception {
        Page<ProductResponse> page = new PageImpl<>(
            List.of(new ProductResponse(1L, "商品A", 1000)),
            PageRequest.of(0, 10), 50
        );
        given(productService.findAll(any())).willReturn(page);

        mockMvc.perform(get("/api/products?page=0&size=10"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content").isArray())
            .andExpect(jsonPath("$.totalElements").value(50))
            .andExpect(jsonPath("$.totalPages").value(5))
            .andExpect(jsonPath("$.number").value(0));
    }
}`,
      },
      {
        title: "エラーレスポンスの観点",
        content:
          "エラーレスポンステストでは、エラーレスポンスの統一フォーマット、エラーコード体系、バリデーションエラーのフィールド別メッセージ、内部エラー情報の隠蔽を検証します。ユーザーにわかりやすいエラーメッセージを返しつつ、セキュリティ上の情報漏洩を防ぎます。",
        code: `// エラーレスポンスの統一フォーマット検証
@WebMvcTest(OrderController.class)
class ErrorResponseTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    @Test
    void バリデーションエラーでフィールド別メッセージが返る() throws Exception {
        String invalidJson = "{\\"quantity\\": -1, \\"itemId\\": null}";

        mockMvc.perform(post("/api/orders")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidJson))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("VALIDATION_ERROR"))
            .andExpect(jsonPath("$.errors").isArray())
            .andExpect(jsonPath("$.errors[?(@.field=='quantity')].message")
                .value("数量は1以上を指定してください"))
            .andExpect(jsonPath("$.errors[?(@.field=='itemId')].message")
                .value("商品IDは必須です"));
    }

    @Test
    void 内部エラー時にスタックトレースが隠蔽される() throws Exception {
        given(orderService.findById(any()))
            .willThrow(new RuntimeException("DBコネクションプール枯渇"));

        mockMvc.perform(get("/api/orders/1"))
            .andExpect(status().isInternalServerError())
            .andExpect(jsonPath("$.code").value("INTERNAL_ERROR"))
            .andExpect(jsonPath("$.message").value("システムエラーが発生しました"))
            // 内部エラーの詳細はレスポンスに含めない
            .andExpect(jsonPath("$.stackTrace").doesNotExist())
            .andExpect(jsonPath("$.cause").doesNotExist());
    }
}`,
      },
      {
        title: "べき等性の観点",
        content:
          "べき等性テストでは、PUT と DELETE が何度実行しても同じ結果になること、POST の二重送信対策、リトライ安全性を検証します。ネットワーク障害による再送が発生しても、データの整合性が保たれることを確認します。",
        code: `// べき等性テスト - 同一リクエストの繰り返し検証
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IdempotencyTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void PUT操作は何度実行しても同じ結果になる() {
        // 注文を作成
        OrderRequest createReq = new OrderRequest("ITEM-001", 3);
        ResponseEntity<OrderResponse> created = restTemplate.postForEntity(
            "/api/orders", createReq, OrderResponse.class
        );
        Long orderId = created.getBody().getId();

        // 同じPUT操作を3回実行
        OrderUpdateRequest updateReq = new OrderUpdateRequest(5);
        for (int i = 0; i < 3; i++) {
            restTemplate.put("/api/orders/" + orderId, updateReq);
        }

        // 結果は1回実行した場合と同じ
        ResponseEntity<OrderResponse> result = restTemplate.getForEntity(
            "/api/orders/" + orderId, OrderResponse.class
        );
        assertThat(result.getBody().getQuantity()).isEqualTo(5);
    }

    @Test
    void POST二重送信がべき等性キーで防止される() {
        String idempotencyKey = UUID.randomUUID().toString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Idempotency-Key", idempotencyKey);
        OrderRequest request = new OrderRequest("ITEM-001", 1);

        // 同じべき等性キーで2回POST
        HttpEntity<OrderRequest> entity = new HttpEntity<>(request, headers);
        restTemplate.postForEntity("/api/orders", entity, OrderResponse.class);
        restTemplate.postForEntity("/api/orders", entity, OrderResponse.class);

        // 注文は1件のみ作成される
        long count = orderRepository.count();
        assertThat(count).isEqualTo(1);
    }
}`,
      },
      {
        title: "APIバージョニングの観点",
        content:
          "APIバージョニングテストでは、URLパス、ヘッダー、クエリパラメータでのバージョン指定、後方互換性、非推奨APIの移行テストを検証します。新しいバージョンのAPIを追加しても、既存のクライアントが影響を受けないことを確認します。",
      },
    ],
  },
  {
    id: "viewpoint-checklist",
    title: "テスト観点チェックリスト",
    category: "viewpoint",
    description:
      "実務で使えるテスト観点の網羅的チェックリスト",
    sections: [
      {
        title: "入力値チェックリスト",
        content:
          "入力値テストのチェックリストは、null/空文字/空白のみ、最小値/最大値、境界値±1、特殊文字（<>&\"'）、マルチバイト文字、制御文字、SQLインジェクション文字列、XSSスクリプト、超長文字列、数値の0/負数/最大値を網羅します。このチェックリストを使って、入力値に関するバグを事前に防止します。",
        code: `// 入力値の網羅的テスト - チェックリストに基づくテストクラス
class InputValidationChecklistTest {

    @ParameterizedTest(name = "入力値: [{0}] → バリデーション失敗")
    @NullSource
    @EmptySource
    @ValueSource(strings = {
        " ",           // 空白のみ
        "  \\t\\n",       // 空白文字のみ
        "<script>alert('XSS')</script>",  // XSS攻撃
        "' OR 1=1 --", // SQLインジェクション
        "\\u0000",       // NULL文字（制御文字）
        "あ".repeat(256) // 最大長超過（仮想的に表現）
    })
    void 不正な入力値でバリデーションエラーになる(String input) {
        CreateUserRequest request = new CreateUserRequest(input, "test@example.com");

        Set<ConstraintViolation<CreateUserRequest>> violations =
            validator.validate(request);

        assertThat(violations).isNotEmpty();
    }

    @ParameterizedTest(name = "数値入力: {0}")
    @ValueSource(ints = {Integer.MIN_VALUE, -1, 0})
    void 不正な数値でバリデーションエラーになる(int input) {
        OrderRequest request = new OrderRequest("ITEM-001", input);

        Set<ConstraintViolation<OrderRequest>> violations =
            validator.validate(request);

        assertThat(violations).isNotEmpty();
        assertThat(violations.iterator().next().getMessage())
            .contains("1以上");
    }

    @ParameterizedTest(name = "メールアドレス: [{0}] → 無効")
    @ValueSource(strings = {
        "invalid",       // @なし
        "@example.com",  // ローカル部なし
        "user@",         // ドメインなし
        "user@.com",     // ドメイン不正
        "user space@example.com" // スペース含む
    })
    void 不正なメールアドレスでバリデーションエラーになる(String email) {
        CreateUserRequest request = new CreateUserRequest("テスト", email);

        Set<ConstraintViolation<CreateUserRequest>> violations =
            validator.validate(request);

        assertThat(violations).isNotEmpty();
    }
}`,
      },
      {
        title: "出力値チェックリスト",
        content:
          "出力値テストのチェックリストでは、正しいHTTPステータスコード、レスポンスヘッダー（Content-Type, Cache-Control）、JSONフィールドの存在と型、日付フォーマット（ISO 8601）、金額の丸め処理、ソート順、ページネーション情報を検証します。クライアントが期待する形式でデータが返されることを保証します。",
      },
      {
        title: "状態遷移チェックリスト",
        content:
          "状態遷移テストのチェックリストでは、全ての有効な遷移パス、無効な遷移の拒否、同時遷移の排他制御、遷移時のイベント発行、遷移後のデータ整合性を検証します。ステートマシンのすべての状態とイベントの組み合わせを網羅的にテストすることで、不正な状態遷移によるバグを防止します。",
        code: `// 状態遷移テスト - 注文ステータスの遷移を検証
class OrderStatusTransitionTest {

    private final OrderStateMachine stateMachine = new OrderStateMachine();

    // 有効な遷移パスの検証
    @ParameterizedTest(name = "{0} → {1} は遷移可能")
    @CsvSource({
        "CREATED,    CONFIRMED",   // 作成→確認済
        "CONFIRMED,  SHIPPED",     // 確認済→発送済
        "SHIPPED,    DELIVERED",   // 発送済→配達済
        "CREATED,    CANCELLED",   // 作成→キャンセル
        "CONFIRMED,  CANCELLED"    // 確認済→キャンセル
    })
    void 有効な状態遷移が成功する(OrderStatus from, OrderStatus to) {
        Order order = new Order(from);
        assertThat(stateMachine.canTransition(order, to)).isTrue();

        stateMachine.transition(order, to);
        assertThat(order.getStatus()).isEqualTo(to);
    }

    // 無効な遷移パスの検証
    @ParameterizedTest(name = "{0} → {1} は遷移不可")
    @CsvSource({
        "DELIVERED,  CREATED",    // 配達済→作成（逆戻り不可）
        "CANCELLED,  CONFIRMED",  // キャンセル→確認済（終了状態）
        "SHIPPED,    CREATED",    // 発送済→作成（逆戻り不可）
        "DELIVERED,  CANCELLED"   // 配達済→キャンセル（配達後は不可）
    })
    void 無効な状態遷移が拒否される(OrderStatus from, OrderStatus to) {
        Order order = new Order(from);
        assertThat(stateMachine.canTransition(order, to)).isFalse();

        assertThatThrownBy(() -> stateMachine.transition(order, to))
            .isInstanceOf(InvalidStateTransitionException.class);
    }
}`,
      },
      {
        title: "並行処理チェックリスト",
        content:
          "並行処理テストのチェックリストでは、同時リクエスト（Thread/ExecutorService）、デッドロック検出、レースコンディション、アトミック操作の検証、リソースの排他制御を検証します。マルチスレッド環境でのデータ整合性を保証します。",
        code: `// 並行処理テスト - 同時リクエストの競合検証
class ConcurrentAccessTest {

    private final CounterService counterService = new CounterService();

    @Test
    void 同時アクセスでもカウンターが正確に加算される() throws Exception {
        int threadCount = 100;
        int incrementsPerThread = 1000;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);
        CountDownLatch startLatch = new CountDownLatch(1);
        CountDownLatch endLatch = new CountDownLatch(threadCount);

        // 100スレッドが同時に1000回ずつインクリメント
        for (int i = 0; i < threadCount; i++) {
            executor.submit(() -> {
                try {
                    startLatch.await(); // 全スレッド同時に開始
                    for (int j = 0; j < incrementsPerThread; j++) {
                        counterService.increment();
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                } finally {
                    endLatch.countDown();
                }
            });
        }

        startLatch.countDown(); // 全スレッドを一斉に開始
        endLatch.await(30, TimeUnit.SECONDS); // 完了を待つ

        // 100 × 1000 = 100,000 であることを確認
        assertThat(counterService.getCount())
            .isEqualTo(threadCount * incrementsPerThread);

        executor.shutdown();
    }
}`,
      },
      {
        title: "外部連携チェックリスト",
        content:
          "外部連携テストのチェックリストでは、外部APIのタイムアウト、接続エラー、レスポンス遅延、不正レスポンス形式、レート制限、リトライ時の指数バックオフを検証します。外部サービスの障害がシステム全体に波及しないことを確認します。",
      },
    ],
  },
  // ===== 品質・カバレッジ (quality) =====
  {
    id: "code-coverage",
    title: "コードカバレッジと品質指標",
    category: "quality",
    description:
      "JaCoCo、カバレッジ基準、ミューテーションテスト",
    sections: [
      {
        title: "カバレッジの種類",
        content:
          "コードカバレッジには主に3つの種類があります。行カバレッジ（C0）はテストで実行されたコード行の割合、分岐カバレッジ（C1）は if/else や switch の各分岐が実行された割合、条件カバレッジ（C2）は複合条件（A && B）の各条件の真偽がテストされた割合です。カバレッジが100%であってもバグが0であることは保証されません。カバレッジはテストの「不足」を示す指標であり、テストの「品質」を示す指標ではないことを理解することが重要です。",
      },
      {
        title: "JaCoCo の設定と使い方",
        content:
          "JaCoCo（Java Code Coverage）は、Java で最も広く使われるコードカバレッジツールです。Gradle や Maven で簡単に設定でき、HTML、XML、CSV 形式でレポートを出力できます。最小カバレッジを設定して、基準を満たさない場合にビルドを失敗させることも可能です。",
        code: `// build.gradle - JaCoCo の設定
plugins {
    id 'jacoco'
}

jacoco {
    toolVersion = "0.8.11"
}

// カバレッジレポートの出力設定
jacocoTestReport {
    dependsOn test
    reports {
        xml.required = true  // CI/CDツール連携用
        html.required = true // 人間が確認する用
        csv.required = false
    }
    // 除外設定（テスト対象外のクラス）
    afterEvaluate {
        classDirectories.setFrom(files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                '**/dto/**',        // DTOクラスは除外
                '**/config/**',     // 設定クラスは除外
                '**/Application.class' // メインクラスは除外
            ])
        }))
    }
}

// 最小カバレッジの強制
jacocoTestCoverageVerification {
    violationRules {
        rule {
            limit {
                // 行カバレッジ80%以上を必須
                counter = 'LINE'
                value = 'COVEREDRATIO'
                minimum = 0.80
            }
        }
        rule {
            // 分岐カバレッジ70%以上を必須
            limit {
                counter = 'BRANCH'
                value = 'COVEREDRATIO'
                minimum = 0.70
            }
        }
    }
}
// ./gradlew test jacocoTestReport jacocoTestCoverageVerification`,
      },
      {
        title: "カバレッジの目標設定",
        content:
          "一般的なカバレッジ目標は、新規コードで80%以上です。ただし、すべてのコードに同じ基準を適用するのではなく、重要度に応じた基準設定が必要です。ビジネスロジック層は90%以上、コントローラー層は70%以上、DTO やエンティティクラスはカバレッジ対象外とするなど、柔軟な運用が推奨されます。カバレッジの数値を追うのではなく、重要なロジックが十分にテストされているかに注目しましょう。",
      },
      {
        title: "ミューテーションテスト",
        content:
          "ミューテーションテストは、ソースコードに意図的な変異（ミュータント）を加え、テストがその変異を検出できるかを検証する手法です。PIT（PITest）は Java で最も広く使われるミューテーションテストツールです。変異スコア（killed mutants / total mutants）が高いほど、テストの品質が高いことを意味します。",
        code: `// build.gradle - PIT ミューテーションテストの設定
plugins {
    id 'info.solidsoft.pitest' version '1.15.0'
}

pitest {
    targetClasses = ['com.example.service.*']  // テスト対象クラス
    targetTests = ['com.example.service.*Test'] // テストクラス
    mutators = ['DEFAULTS']  // デフォルトの変異オペレーター
    outputFormats = ['HTML', 'XML']
    timestampedReports = false
    // 変異スコアの最低基準
    mutationThreshold = 70
    coverageThreshold = 80
}

// ミューテーションテストで検出される変異の例:
// 元のコード:
//   if (age >= 18) return "成人";
//
// 変異1: if (age > 18)   → 境界値テストがなければ検出されない
// 変異2: if (age <= 18)  → 条件の反転
// 変異3: if (age >= 19)  → 定数の変更
// 変異4: return "";      → 戻り値の変更
//
// 実行: ./gradlew pitest`,
      },
      {
        title: "静的解析との組み合わせ",
        content:
          "SonarQube、SpotBugs、PMD などの静的解析ツールをテストと組み合わせることで、コード品質を多角的に評価できます。テストでは実行時の動作を検証し、静的解析ではコーディング規約違反、潜在的バグ、セキュリティ脆弱性を検出します。品質ゲートを設定して、基準を満たさないコードのマージを防止します。",
      },
    ],
  },
  {
    id: "test-maintenance",
    title: "テストの保守性",
    category: "quality",
    description:
      "テストの可読性、テストヘルパー、テストデータビルダー",
    sections: [
      {
        title: "テストの可読性",
        content:
          "テストコードの可読性は、保守性に直結します。テスト名で意図を伝え、不要なセットアップを排除し、1テスト1検証（原則）を守ります。コメントよりもテスト名で説明する方が、テストの目的が明確になります。日本語のテスト名を使うことで、テストレポートがそのまま仕様書として機能します。",
      },
      {
        title: "テストヘルパーとファクトリ",
        content:
          "テストデータ生成を共通化することで、テストコードの重複を排除し、保守性を向上させます。TestFixture パターンではテストに必要なオブジェクト群を一括で用意し、ObjectMother パターンではよく使うテストデータの生成メソッドを集約します。",
        code: `// テストヘルパー - ObjectMother パターン
public class TestUsers {

    // 基本的なユーザーデータを生成
    public static User createDefaultUser() {
        return new User(1L, "田中太郎", "tanaka@example.com",
            LocalDateTime.of(2025, 1, 1, 0, 0));
    }

    // 管理者ユーザーを生成
    public static User createAdmin() {
        User user = createDefaultUser();
        user.setRole(Role.ADMIN);
        user.setName("管理者");
        return user;
    }

    // 指定された件数のユーザーリストを生成
    public static List<User> createUsers(int count) {
        return IntStream.rangeClosed(1, count)
            .mapToObj(i -> new User((long) i,
                "ユーザー" + i,
                "user" + i + "@example.com",
                LocalDateTime.now()))
            .toList();
    }
}

// テストでの使用例
class UserServiceTest {

    @Test
    void ユーザー一覧を取得できる() {
        // ヘルパーで簡潔にテストデータを準備
        List<User> users = TestUsers.createUsers(5);
        given(userRepository.findAll()).willReturn(users);

        List<UserResponse> result = userService.findAll();

        assertThat(result).hasSize(5);
    }
}`,
      },
      {
        title: "テストデータビルダー",
        content:
          "Builder パターンでテストデータを構築すると、デフォルト値を設定しつつ、テストケースに必要な部分だけをカスタマイズできます。テストの意図が明確になり、テストデータの準備コードが読みやすくなります。",
        code: `// テストデータビルダー - Builder パターンで柔軟に構築
public class OrderBuilder {

    private Long id = 1L;
    private String customerId = "C001";
    private List<OrderItem> items = List.of(
        new OrderItem("ITEM-001", "商品A", 1000, 1)
    );
    private OrderStatus status = OrderStatus.CREATED;
    private LocalDateTime orderDate = LocalDateTime.now();

    // 各フィールドのカスタマイズメソッド
    public OrderBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public OrderBuilder withCustomerId(String customerId) {
        this.customerId = customerId;
        return this;
    }

    public OrderBuilder withItems(OrderItem... items) {
        this.items = List.of(items);
        return this;
    }

    public OrderBuilder withStatus(OrderStatus status) {
        this.status = status;
        return this;
    }

    public Order build() {
        return new Order(id, customerId, items, status, orderDate);
    }
}

// テストでの使用例 - 必要な部分だけカスタマイズ
class OrderServiceTest {

    @Test
    void キャンセル済み注文は更新できない() {
        // 意図が明確: キャンセル済みのステータスだけが重要
        Order cancelledOrder = new OrderBuilder()
            .withStatus(OrderStatus.CANCELLED)
            .build();

        assertThatThrownBy(() -> orderService.update(cancelledOrder))
            .isInstanceOf(IllegalStateException.class);
    }
}`,
      },
      {
        title: "フラジャイルテストの回避",
        content:
          "フラジャイル（壊れやすい）テストは、実装の変更に過度に敏感で、プロダクションコードの正しい変更でも頻繁に失敗するテストです。原因として、実装の詳細（privateメソッドの呼び出し順序など）への依存、テスト間の依存関係、時刻や外部リソースへの依存があります。テストは「何を検証するか」を明確にし、「どのように実装されているか」に依存しないようにします。",
      },
      {
        title: "テストコードのリファクタリング",
        content:
          "テストコードにも DRY（Don't Repeat Yourself）原則を適用しますが、過度な共通化はテストの可読性を損ないます。テストの独立性を保ちつつ、適度にヘルパーメソッドやビルダーを活用します。テストコードのリファクタリングでは、テストの意図が失われないよう注意が必要です。共有フィクスチャが多すぎると、テストの理解が困難になります。",
      },
    ],
  },
  // ===== 高度なテスト技法 (advanced) =====
  {
    id: "tdd-bdd",
    title: "TDD と BDD",
    category: "advanced",
    description:
      "テスト駆動開発、振る舞い駆動開発、実践的な進め方",
    sections: [
      {
        title: "TDD のサイクル",
        content:
          "TDD（テスト駆動開発）は Red→Green→Refactor の3ステップで進めます。まず失敗するテスト（Red）を書き、テストを通す最小限のコード（Green）を書き、テストを維持しながらコードを改善（Refactor）します。最初に失敗するテストを書くことで、テストが正しく動作していることを確認でき、仕様を明確にしてから実装に入れます。",
        code: `// TDD サイクルの例: 消費税計算機の実装
// ステップ1: Red - まず失敗するテストを書く
class TaxCalculatorTest {

    private TaxCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new TaxCalculator();
    }

    // Red: このテストが失敗することを確認
    @Test
    void 税率10パーセントで100円の税込金額は110円() {
        int result = calculator.calculateWithTax(100, 10);
        assertThat(result).isEqualTo(110);
    }
}

// ステップ2: Green - テストを通す最小限の実装
class TaxCalculator {
    public int calculateWithTax(int price, int taxRate) {
        return price + (price * taxRate / 100);
    }
}

// ステップ3: 次のテストを追加（Red）
// @Test
// void 端数は切り捨てる() {
//     assertThat(calculator.calculateWithTax(99, 10)).isEqualTo(108);
//     // 99 * 1.1 = 108.9 → 切り捨て 108
// }
//
// ステップ4: Green - 端数処理を追加
// public int calculateWithTax(int price, int taxRate) {
//     return (int) Math.floor(price * (1 + taxRate / 100.0));
// }
//
// ステップ5: Refactor - コードを改善`,
      },
      {
        title: "TDD の実践",
        content:
          "TDD の実践では、ユースケースからテストを導出します。アプローチには Outside-In（外から内へ：コントローラーからサービス、リポジトリへ）と Inside-Out（内から外へ：ドメインモデルからサービス、コントローラーへ）の2つがあります。Outside-In はモックを多用し、Inside-Out は実際のオブジェクトを使う傾向があります。",
        code: `// TDD 実践例: Outside-In アプローチ
// ユースケース: 「ユーザーがカートに商品を追加する」

// 1. コントローラーのテストから始める（外側）
@WebMvcTest(CartController.class)
class CartControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CartService cartService;

    @Test
    void 商品をカートに追加すると200が返る() throws Exception {
        given(cartService.addItem("user01", "ITEM-001", 2))
            .willReturn(new CartResponse(List.of(
                new CartItem("ITEM-001", "商品A", 1000, 2)
            ), 2000));

        mockMvc.perform(post("/api/cart/items")
                .header("X-User-Id", "user01")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"itemId\\": \\"ITEM-001\\", \\"quantity\\": 2}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalAmount").value(2000));
    }
}

// 2. サービスのテストを書く（内側へ）
class CartServiceTest {

    @Mock
    private CartRepository cartRepository;
    @Mock
    private ProductRepository productRepository;
    @InjectMocks
    private CartService cartService;

    @Test
    void カートに商品を追加すると合計金額が更新される() {
        given(productRepository.findById("ITEM-001"))
            .willReturn(Optional.of(new Product("ITEM-001", "商品A", 1000)));
        given(cartRepository.findByUserId("user01"))
            .willReturn(Optional.of(new Cart("user01")));

        CartResponse result = cartService.addItem("user01", "ITEM-001", 2);

        assertThat(result.getTotalAmount()).isEqualTo(2000);
    }
}`,
      },
      {
        title: "BDD と Given-When-Then",
        content:
          "BDD（振る舞い駆動開発）は、ビジネスの振る舞いをテストで記述するアプローチです。Given（前提条件）-When（操作）-Then（期待結果）の構造で記述し、ビジネス用語でテストを表現します。Cucumber や JBehave を使うと、自然言語に近い形式でテストシナリオを記述できます。",
        code: `// Cucumber - BDD テストシナリオ
// features/order.feature
// Feature: 注文管理
//   Scenario: 在庫がある商品を注文する
//     Given 商品「Java入門書」の在庫が10冊ある
//     When ユーザーが「Java入門書」を3冊注文する
//     Then 注文が確定される
//     And 在庫が7冊に減る

// ステップ定義（Java）
public class OrderStepDefinitions {

    private ProductInventory inventory;
    private OrderService orderService;
    private OrderResult result;

    @Given("商品{string}の在庫が{int}冊ある")
    public void 商品の在庫がある(String productName, int stock) {
        inventory = new ProductInventory(productName, stock);
    }

    @When("ユーザーが{string}を{int}冊注文する")
    public void ユーザーが注文する(String productName, int quantity) {
        result = orderService.placeOrder(productName, quantity);
    }

    @Then("注文が確定される")
    public void 注文が確定される() {
        assertThat(result.getStatus()).isEqualTo(OrderStatus.CONFIRMED);
    }

    @And("在庫が{int}冊に減る")
    public void 在庫が減る(int expectedStock) {
        assertThat(inventory.getStock()).isEqualTo(expectedStock);
    }
}`,
      },
      {
        title: "TDD のメリットと課題",
        content:
          "TDD のメリットには、設計の改善（テストしやすい＝疎結合な設計になる）、リグレッション防止（変更による既存機能への影響を即座に検出）、ドキュメント効果（テストがそのまま仕様書になる）があります。一方、課題として学習コスト、モック過多の問題（テストが実装詳細に依存しすぎる）、既存コードへの適用の難しさがあります。チーム全体で取り組み、段階的に導入することが重要です。",
      },
      {
        title: "レガシーコードへのテスト追加",
        content:
          "レガシーコード（テストのないコード）にテストを追加する際は、仕様化テスト（Characterization Test）から始めます。仕様化テストとは、現在のコードの動作を「そのまま」記録するテストで、リファクタリングの安全網として機能します。段階的にテストカバレッジを上げ、テストがある部分からリファクタリングを進めます。Michael Feathers の『レガシーコード改善ガイド』が参考になります。",
      },
    ],
  },
  {
    id: "property-based-test",
    title: "プロパティベーステスト",
    category: "advanced",
    description:
      "jqwik によるランダムテスト、不変条件の検証",
    sections: [
      {
        title: "プロパティベーステストとは",
        content:
          "プロパティベーステストは、具体的な入力値ではなく、入力の「性質（プロパティ）」を検証するテスト手法です。大量のランダム値で自動テストを行い、開発者が想定していなかった境界ケースを自動的に発見します。従来の Example-based test（具体例によるテスト）と組み合わせることで、テストの網羅性を大幅に向上させます。",
      },
      {
        title: "jqwik の基本",
        content:
          "jqwik は Java 向けのプロパティベーステストフレームワークです。@Property アノテーションでプロパティテストを定義し、@ForAll で入力値を自動生成します。Arbitrary でカスタムジェネレータを定義し、ドメインに適した入力値を生成できます。",
        code: `// jqwik - プロパティベーステストの基本
class SortPropertyTest {

    @Property
    void ソート結果の要素数は入力と同じ(@ForAll List<Integer> list) {
        // プロパティ: ソートしても要素数は変わらない
        List<Integer> sorted = new ArrayList<>(list);
        Collections.sort(sorted);

        assertThat(sorted).hasSameSizeAs(list);
    }

    @Property
    void ソート結果は昇順に並んでいる(@ForAll List<Integer> list) {
        // プロパティ: ソート後は全要素が昇順
        List<Integer> sorted = new ArrayList<>(list);
        Collections.sort(sorted);

        for (int i = 0; i < sorted.size() - 1; i++) {
            assertThat(sorted.get(i)).isLessThanOrEqualTo(sorted.get(i + 1));
        }
    }

    @Property
    void ソート結果は入力と同じ要素を含む(@ForAll List<Integer> list) {
        // プロパティ: ソートしても要素の集合は同じ
        List<Integer> sorted = new ArrayList<>(list);
        Collections.sort(sorted);

        assertThat(sorted).containsExactlyInAnyOrderElementsOf(list);
    }
}`,
      },
      {
        title: "実践的なプロパティ",
        content:
          "実践的なプロパティテストでは、逆操作の性質（エンコード→デコードで元に戻る）、べき等性（同じ操作を何度実行しても結果が変わらない）、不変条件（どんな入力でも成り立つ条件）を検証します。これらの性質を見つけることが、プロパティベーステストの核心です。",
        code: `// 実践的なプロパティテスト
class PracticalPropertyTest {

    // 逆操作の性質: エンコード→デコードで元に戻る
    @Property
    void Base64エンコードとデコードは逆操作である(
            @ForAll @StringLength(max = 1000) String original) {
        String encoded = Base64.getEncoder()
            .encodeToString(original.getBytes(StandardCharsets.UTF_8));
        String decoded = new String(
            Base64.getDecoder().decode(encoded), StandardCharsets.UTF_8);

        assertThat(decoded).isEqualTo(original);
    }

    // べき等性: 同じ操作を2回実行しても結果が同じ
    @Property
    void 文字列のトリムはべき等である(
            @ForAll @StringLength(max = 100) String input) {
        String onceTrimmed = input.trim();
        String twiceTrimmed = onceTrimmed.trim();

        assertThat(twiceTrimmed).isEqualTo(onceTrimmed);
    }

    // 不変条件: 絶対値は常に0以上
    @Property
    void 絶対値は常に0以上である(@ForAll int value) {
        // Integer.MIN_VALUE は除外（オーバーフローするため）
        Assume.that(value != Integer.MIN_VALUE);

        assertThat(Math.abs(value)).isGreaterThanOrEqualTo(0);
    }
}`,
      },
      {
        title: "シュリンキング",
        content:
          "シュリンキングは、テスト失敗時に最小の反例を自動的に探索する機能です。例えば、長さ100のリストで失敗した場合、jqwik は自動的にリストを縮小し、失敗を再現する最小のリスト（例: 長さ2）を見つけます。これにより、バグの原因を素早く特定できます。デバッグの効率が大幅に向上します。",
      },
      {
        title: "既存テストとの組み合わせ",
        content:
          "Example-based test（具体例によるテスト）と Property-based test は補完的な関係にあります。Example-based test はビジネス要件の具体的なシナリオを検証するのに適し、Property-based test は一般的な性質を広範な入力で検証するのに適しています。重要なビジネスロジックには両方を適用し、エッジケースの発見と仕様の明確化を両立させます。",
      },
    ],
  },
  {
    id: "performance-test",
    title: "パフォーマンステスト",
    category: "advanced",
    description:
      "JMH、負荷テスト、メモリリーク検出",
    sections: [
      {
        title: "JMH マイクロベンチマーク",
        content:
          "JMH（Java Microbenchmark Harness）は、OpenJDK が提供するマイクロベンチマークフレームワークです。@Benchmark でベンチマーク対象のメソッドを定義し、ウォームアップとイテレーションの回数を指定して、JIT コンパイラの影響を排除した正確な計測を行います。@State でベンチマーク間で共有する状態を管理し、@Setup で初期化処理を行います。",
        code: `// JMH - ArrayList vs LinkedList のパフォーマンス比較
@State(Scope.Benchmark)
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 5, time = 1)
@Fork(1)
public class ListBenchmark {

    private static final int SIZE = 10_000;
    private ArrayList<Integer> arrayList;
    private LinkedList<Integer> linkedList;

    @Setup
    public void setUp() {
        arrayList = new ArrayList<>(IntStream.range(0, SIZE)
            .boxed().toList());
        linkedList = new LinkedList<>(arrayList);
    }

    @Benchmark
    public Integer ArrayListの先頭に挿入() {
        arrayList.add(0, 999); // O(n) - 全要素シフト
        return arrayList.remove(0);
    }

    @Benchmark
    public Integer LinkedListの先頭に挿入() {
        linkedList.addFirst(999); // O(1) - ポインタ変更のみ
        return linkedList.removeFirst();
    }

    @Benchmark
    public Integer ArrayListのランダムアクセス() {
        return arrayList.get(SIZE / 2); // O(1) - インデックスアクセス
    }

    @Benchmark
    public Integer LinkedListのランダムアクセス() {
        return linkedList.get(SIZE / 2); // O(n) - 順次走査
    }
}
// 実行: java -jar benchmarks.jar ListBenchmark`,
      },
      {
        title: "負荷テスト",
        content:
          "負荷テストでは、Gatling や JMeter を使って実際のユーザーアクセスをシミュレートし、同時接続数、スループット（リクエスト/秒）、レスポンスタイム（平均、95パーセンタイル、99パーセンタイル）を計測します。ボトルネックを特定し、システムの限界を把握します。",
        code: `// Gatling - 負荷テストシナリオ（Scala DSL）
// src/test/scala/LoadSimulation.scala

// class ApiLoadSimulation extends Simulation {
//
//   val httpProtocol = http
//     .baseUrl("http://localhost:8080")
//     .acceptHeader("application/json")
//
//   // シナリオ: 商品検索→詳細表示→カート追加
//   val userScenario = scenario("一般ユーザーシナリオ")
//     .exec(
//       http("商品一覧取得")
//         .get("/api/products")
//         .check(status.is(200))
//         .check(jsonPath("$.content[0].id").saveAs("productId"))
//     )
//     .pause(1, 3) // 1〜3秒の思考時間
//     .exec(
//       http("商品詳細取得")
//         .get("/api/products/#{productId}")
//         .check(status.is(200))
//     )
//     .pause(2, 5)
//     .exec(
//       http("カートに追加")
//         .post("/api/cart/items")
//         .body(StringBody("{\\"itemId\\": \\"#{productId}\\", \\"quantity\\": 1}"))
//         .check(status.is(200))
//     )
//
//   // 負荷パターン: 段階的に同時接続数を増加
//   setUp(
//     userScenario.inject(
//       nothingFor(5),           // 5秒待機
//       rampUsers(50).during(30), // 30秒で50ユーザーまで増加
//       constantUsersPerSec(10).during(60) // 60秒間 毎秒10ユーザー
//     )
//   ).protocols(httpProtocol)
//     .assertions(
//       global.responseTime.percentile3.lt(3000), // 95%が3秒以内
//       global.successfulRequests.percent.gt(99)   // 成功率99%以上
//     )
// }`,
      },
      {
        title: "メモリリーク検出",
        content:
          "メモリリークは、不要になったオブジェクトがガベージコレクションで回収されず、メモリを消費し続ける問題です。VisualVM や MAT（Memory Analyzer Tool）でヒープダンプを分析し、リークの原因を特定します。static なコレクション、イベントリスナーの登録解除忘れ、キャッシュの無制限な成長が主な原因です。WeakReference の活用や、AutoCloseable の適切な実装で防止できます。",
      },
      {
        title: "DBクエリのパフォーマンス",
        content:
          "DBクエリのパフォーマンステストでは、スロークエリの検出、実行計画（EXPLAIN）の確認、N+1問題の自動検出を行います。N+1問題は、関連エンティティを1件ずつ取得するために大量のクエリが発生する問題で、JPA を使う際に特に注意が必要です。",
        code: `// N+1問題の検出テスト
@SpringBootTest
class QueryPerformanceTest {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    void 注文一覧取得でN_plus_1問題が発生しない() {
        // テストデータ: 10件の注文（各注文に5つの明細）
        createTestOrders(10, 5);

        // SQLログをカウントする仕組み
        QueryCountHolder.clear();

        // 注文一覧を取得（明細も含む）
        List<Order> orders = orderRepository.findAllWithItems();

        // N+1問題がない場合: 1回のクエリで取得できる
        // N+1問題がある場合: 1 + 10 = 11回のクエリが発生
        long queryCount = QueryCountHolder.getCount();
        System.out.println("実行されたクエリ数: " + queryCount);

        // クエリ数が2以下であることを検証（JOINで取得）
        assertThat(queryCount).isLessThanOrEqualTo(2);
        assertThat(orders).hasSize(10);
        // 明細も取得されていることを確認
        assertThat(orders.get(0).getItems()).hasSize(5);
    }
}`,
      },
      {
        title: "プロファイリングとボトルネック特定",
        content:
          "プロファイリングツール（JProfiler、async-profiler）を使って、CPU使用率、メモリ使用率、I/O待ち時間のボトルネックを特定します。フレームグラフ（Flame Graph）は、メソッド呼び出しの階層と実行時間を視覚的に表示し、どのメソッドが最も時間を消費しているかを一目で把握できます。ボトルネックを特定したら、アルゴリズムの改善、キャッシュの導入、非同期処理への変更などの最適化を行います。",
      },
    ],
  },
];

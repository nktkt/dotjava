export interface SpringBootTestingSection {
  title: string;
  content: string;
  code?: string;
}

export interface SpringBootTestingChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: SpringBootTestingSection[];
}

export interface SpringBootTestingCategory {
  id: string;
  name: string;
  color: string;
}

export const springBootTestingCategories: SpringBootTestingCategory[] = [
  { id: "unit", name: "ユニットテスト", color: "#2563EB" },
  { id: "integration", name: "統合テスト", color: "#059669" },
  { id: "advanced", name: "テスト応用", color: "#D97706" },
];

export const springBootTestingChapters: SpringBootTestingChapter[] = [
  // ===== ユニットテスト =====
  {
    id: "junit5-basics",
    title: "JUnit 5基礎",
    description:
      "JUnit 5のテストライフサイクル、アサーション、パラメータ化テスト、命名規則を学ぶ",
    category: "unit",
    sections: [
      {
        title: "テストライフサイクル（@BeforeEach / @AfterEach）",
        content:
          "JUnit 5ではテストメソッドの前後に処理を挟むためのライフサイクルアノテーションが用意されています。@BeforeEachはテストメソッドごとに実行前に呼ばれ、テストデータの初期化やオブジェクトの生成に使います。@AfterEachはテストメソッドごとに実行後に呼ばれ、リソースの解放に使います。クラス全体で一度だけ実行したい場合は@BeforeAll/@AfterAllを使いますが、staticメソッドにする必要があります。テストクラスはデフォルトでメソッドごとにインスタンスが再生成されるため、テスト間の状態汚染を防ぐことができます。",
        code: `import org.junit.jupiter.api.*;

class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;

    @BeforeAll
    static void setUpClass() {
        // クラス全体で一度だけ実行（staticメソッド必須）
        System.out.println("テストクラス開始");
    }

    @BeforeEach
    void setUp() {
        // 各テストメソッドの前に実行
        userRepository = new InMemoryUserRepository();
        userService = new UserService(userRepository);
    }

    @Test
    void ユーザーを作成できる() {
        User user = userService.createUser("田中太郎", "tanaka@example.com");
        Assertions.assertNotNull(user.getId());
    }

    @Test
    void 重複メールで例外が発生する() {
        userService.createUser("田中太郎", "tanaka@example.com");
        Assertions.assertThrows(DuplicateEmailException.class, () -> {
            userService.createUser("山田花子", "tanaka@example.com");
        });
    }

    @AfterEach
    void tearDown() {
        // 各テストメソッドの後に実行
        userRepository.clear();
    }

    @AfterAll
    static void tearDownClass() {
        System.out.println("テストクラス終了");
    }
}`,
      },
      {
        title: "アサーション（assertEquals / assertTrue / assertThrows）",
        content:
          "JUnit 5のAssertionsクラスには豊富なアサーションメソッドが用意されています。assertEqualsは値の等価性、assertTrueは条件の真偽、assertThrowsは例外の発生を検証します。assertAllを使うと複数のアサーションをまとめて実行し、すべての失敗を一度に確認できます。第3引数にメッセージを指定すると、失敗時にわかりやすい説明が表示されます。assertTimeoutでタイムアウトの検証も可能です。",
        code: `import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AssertionExamplesTest {

    @Test
    void 基本的なアサーション() {
        // 値の等価性
        assertEquals(4, Calculator.add(2, 2), "2 + 2 は 4 であるべき");

        // 真偽値の検証
        assertTrue(Calculator.isPositive(5), "5 は正の数であるべき");
        assertFalse(Calculator.isPositive(-1), "-1 は正の数ではない");

        // null検証
        assertNotNull(new User("田中"));
        assertNull(userRepository.findByEmail("存在しない@example.com"));
    }

    @Test
    void 例外の検証() {
        // 特定の例外がスローされることを検証
        IllegalArgumentException exception = assertThrows(
            IllegalArgumentException.class,
            () -> Calculator.divide(10, 0)
        );
        // 例外メッセージも検証できる
        assertEquals("0で割ることはできません", exception.getMessage());
    }

    @Test
    void 複数アサーションをまとめて検証() {
        User user = new User("田中太郎", "tanaka@example.com", 30);

        // assertAll で全てのアサーションを実行（途中で止まらない）
        assertAll("ユーザー情報の検証",
            () -> assertEquals("田中太郎", user.getName()),
            () -> assertEquals("tanaka@example.com", user.getEmail()),
            () -> assertEquals(30, user.getAge()),
            () -> assertTrue(user.isActive())
        );
    }

    @Test
    void タイムアウトの検証() {
        // 処理が指定時間内に完了することを検証
        assertTimeout(Duration.ofSeconds(2), () -> {
            heavyProcess();
        });
    }
}`,
      },
      {
        title: "パラメータ化テスト",
        content:
          "パラメータ化テストを使うと、同じテストロジックを異なる入力データで繰り返し実行できます。@ParameterizedTestアノテーションと各種ソースアノテーションを組み合わせて使います。@ValueSourceは単一の値リスト、@CsvSourceはCSV形式で複数パラメータを指定でき、@MethodSourceはメソッドからStreamでテストデータを供給します。テストケースの網羅性を高めつつ、コードの重複を削減できるため、境界値テストや同値分割テストに特に有効です。",
        code: `import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.*;
import java.util.stream.Stream;

class ParameterizedTestExamplesTest {

    // @ValueSource: 単一パラメータのリスト
    @ParameterizedTest(name = "{0} は正の数")
    @ValueSource(ints = {1, 5, 100, Integer.MAX_VALUE})
    void 正の数を検証(int number) {
        assertTrue(Calculator.isPositive(number));
    }

    // @NullAndEmptySource: null と空文字のテスト
    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {"  ", "\\t", "\\n"})
    void ブランク文字列の検証(String input) {
        assertTrue(StringUtils.isBlank(input));
    }

    // @CsvSource: 複数パラメータをCSV形式で指定
    @ParameterizedTest(name = "{0} + {1} = {2}")
    @CsvSource({
        "1, 2, 3",
        "0, 0, 0",
        "-1, 1, 0",
        "100, 200, 300"
    })
    void 足し算の検証(int a, int b, int expected) {
        assertEquals(expected, Calculator.add(a, b));
    }

    // @MethodSource: メソッドからテストデータを供給
    @ParameterizedTest(name = "ユーザー {0} のメール {1} は有効")
    @MethodSource("validUserProvider")
    void 有効なユーザーの検証(String name, String email) {
        User user = new User(name, email);
        assertTrue(user.isValid());
    }

    static Stream<Arguments> validUserProvider() {
        return Stream.of(
            Arguments.of("田中太郎", "tanaka@example.com"),
            Arguments.of("山田花子", "yamada@example.com"),
            Arguments.of("佐藤一郎", "sato@example.co.jp")
        );
    }

    // @EnumSource: Enum値でテスト
    @ParameterizedTest
    @EnumSource(value = UserRole.class, names = {"ADMIN", "MANAGER"})
    void 管理権限を持つロールの検証(UserRole role) {
        assertTrue(role.hasAdminAccess());
    }
}`,
      },
      {
        title: "テストの命名規則とベストプラクティス",
        content:
          "テストメソッドの命名は可読性と保守性に直結します。日本語メソッド名を使う方法（例: ユーザーを作成できる()）と、英語で記述する方法（例: shouldCreateUser_whenValidInput()）があります。@DisplayNameアノテーションを使えば表示名を自由に設定できます。@Nestedクラスでテストをグループ化すると、テストの意図が明確になります。1テスト1検証の原則を守り、テストメソッドはArrange（準備）・Act（実行）・Assert（検証）のAAAパターンで構成するのが推奨されます。",
        code: `import org.junit.jupiter.api.*;

// テストクラスの表示名
@DisplayName("UserService のテスト")
class UserServiceTest {

    private UserService sut; // System Under Test

    @BeforeEach
    void setUp() {
        sut = new UserService(new InMemoryUserRepository());
    }

    // --- 方法1: 日本語メソッド名 ---
    @Test
    void ユーザーを正常に作成できる() {
        // Arrange（準備）
        String name = "田中太郎";
        String email = "tanaka@example.com";

        // Act（実行）
        User result = sut.createUser(name, email);

        // Assert（検証）
        assertNotNull(result.getId());
        assertEquals(name, result.getName());
    }

    // --- 方法2: @DisplayName で表示名を指定 ---
    @Test
    @DisplayName("メールアドレスが重複する場合は例外をスロー")
    void throwsExceptionWhenDuplicateEmail() {
        sut.createUser("田中", "test@example.com");
        assertThrows(DuplicateEmailException.class,
            () -> sut.createUser("山田", "test@example.com"));
    }

    // --- @Nested でグループ化 ---
    @Nested
    @DisplayName("ユーザー検索")
    class FindUser {

        @Test
        @DisplayName("IDで検索できる")
        void byId() {
            User created = sut.createUser("田中", "tanaka@example.com");
            User found = sut.findById(created.getId());
            assertEquals(created.getId(), found.getId());
        }

        @Test
        @DisplayName("存在しないIDはnullを返す")
        void byNonExistentId() {
            assertNull(sut.findById(999L));
        }
    }

    @Nested
    @DisplayName("ユーザー削除")
    class DeleteUser {

        @Test
        @DisplayName("削除後は検索できない")
        void deletedUserNotFound() {
            User user = sut.createUser("田中", "tanaka@example.com");
            sut.deleteUser(user.getId());
            assertNull(sut.findById(user.getId()));
        }
    }

    // --- 無効にするテスト ---
    @Test
    @Disabled("Issue #123 の修正待ち")
    void 将来実装予定のテスト() {
        // TODO: 実装予定
    }
}`,
      },
    ],
  },
  {
    id: "mockito",
    title: "Mockitoによるモック",
    description:
      "Mockitoを使った依存関係のモック化、振る舞いの定義、呼び出し検証を学ぶ",
    category: "unit",
    sections: [
      {
        title: "@Mock と @InjectMocks",
        content:
          "Mockitoはテスト対象クラスの依存関係をモック（偽物）に差し替えるためのフレームワークです。@Mockアノテーションでモックオブジェクトを生成し、@InjectMocksでテスト対象クラスにモックを自動注入します。@ExtendWith(MockitoExtension.class)をクラスに付与することで、アノテーションベースのモック初期化が有効になります。モックを使うことで、データベースや外部APIに依存せず高速にテストを実行できます。",
        code: `import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    // モックオブジェクトを生成
    @Mock
    private OrderRepository orderRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private InventoryService inventoryService;

    // テスト対象に @Mock を自動注入
    @InjectMocks
    private OrderService orderService;

    @Test
    void 注文を正常に作成できる() {
        // Arrange: モックの振る舞いを定義
        when(inventoryService.isAvailable("ITEM-001", 2)).thenReturn(true);
        when(orderRepository.save(any(Order.class)))
            .thenAnswer(invocation -> {
                Order order = invocation.getArgument(0);
                order.setId(1L);
                return order;
            });

        // Act: テスト対象を実行
        Order order = orderService.createOrder("ITEM-001", 2);

        // Assert: 結果を検証
        assertNotNull(order.getId());
        assertEquals("ITEM-001", order.getItemCode());
    }
}`,
      },
      {
        title: "when / thenReturn / thenThrow",
        content:
          "Mockitoではwhen().thenReturn()でモックメソッドの戻り値を定義します。thenThrow()を使えば例外をスローするケースもシミュレートできます。連続する呼び出しで異なる結果を返すことも可能です。thenAnswer()を使えば引数に応じた動的な戻り値を定義できます。void型メソッドのモック化にはdoNothing()、doThrow()を使います。",
        code: `@ExtendWith(MockitoExtension.class)
class MockitoBehaviorTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void thenReturnで戻り値を定義() {
        // 指定した引数で呼ばれたときの戻り値を定義
        User mockUser = new User(1L, "田中太郎", "tanaka@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        User result = userService.getUser(1L);
        assertEquals("田中太郎", result.getName());
    }

    @Test
    void thenThrowで例外をシミュレート() {
        // データベース接続エラーをシミュレート
        when(userRepository.findById(anyLong()))
            .thenThrow(new DataAccessException("DB接続エラー"));

        assertThrows(ServiceException.class,
            () -> userService.getUser(1L));
    }

    @Test
    void 連続呼び出しで異なる結果を返す() {
        when(userRepository.count())
            .thenReturn(0L)    // 1回目の呼び出し
            .thenReturn(1L)    // 2回目の呼び出し
            .thenReturn(2L);   // 3回目以降

        assertEquals(0L, userRepository.count());
        assertEquals(1L, userRepository.count());
        assertEquals(2L, userRepository.count());
    }

    @Test
    void thenAnswerで動的な戻り値を定義() {
        when(userRepository.save(any(User.class)))
            .thenAnswer(invocation -> {
                User user = invocation.getArgument(0);
                user.setId(100L); // IDを自動採番
                return user;
            });

        User saved = userRepository.save(new User("山田花子"));
        assertEquals(100L, saved.getId());
    }

    @Test
    void voidメソッドのモック化() {
        // void メソッドで例外をスローする場合
        doThrow(new MailSendException("送信失敗"))
            .when(notificationService).sendEmail(anyString(), anyString());

        assertThrows(MailSendException.class,
            () -> notificationService.sendEmail("test@example.com", "件名"));

        // void メソッドを何もしないようにする
        doNothing().when(notificationService).sendEmail(anyString(), anyString());
    }
}`,
      },
      {
        title: "verify による呼び出し検証",
        content:
          "verifyメソッドを使うと、モックメソッドが期待通りに呼び出されたかを検証できます。呼び出し回数の検証（times/never/atLeastOnce）、呼び出し順序の検証（InOrder）、引数の検証が可能です。verifyNoMoreInteractions()で余分な呼び出しがないことも確認できます。これにより、テスト対象が正しく依存先と連携しているかを保証できます。",
        code: `@ExtendWith(MockitoExtension.class)
class VerifyExamplesTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private AuditLogService auditLogService;

    @InjectMocks
    private OrderService orderService;

    @Test
    void メソッドの呼び出し回数を検証() {
        when(orderRepository.save(any())).thenReturn(new Order(1L));

        orderService.createOrder("ITEM-001", 3);

        // 1回だけ呼ばれたことを検証
        verify(orderRepository, times(1)).save(any(Order.class));

        // 通知が送信されたことを検証
        verify(notificationService).sendOrderConfirmation(any());

        // キャンセル処理は呼ばれていないことを検証
        verify(orderRepository, never()).delete(any());
    }

    @Test
    void 呼び出し順序を検証() {
        when(orderRepository.save(any())).thenReturn(new Order(1L));

        orderService.createOrder("ITEM-001", 1);

        // 呼び出し順序の検証
        InOrder inOrder = inOrder(orderRepository, notificationService,
                                  auditLogService);
        inOrder.verify(orderRepository).save(any());
        inOrder.verify(notificationService).sendOrderConfirmation(any());
        inOrder.verify(auditLogService).log(anyString());
    }

    @Test
    void 引数の値を検証() {
        when(orderRepository.save(any())).thenReturn(new Order(1L));

        orderService.createOrder("ITEM-001", 5);

        // 特定の引数で呼ばれたことを検証
        verify(orderRepository).save(argThat(order ->
            order.getItemCode().equals("ITEM-001") &&
            order.getQuantity() == 5
        ));
    }

    @Test
    void 余分な呼び出しがないことを検証() {
        when(orderRepository.findById(1L))
            .thenReturn(Optional.of(new Order(1L)));

        orderService.getOrder(1L);

        verify(orderRepository).findById(1L);
        // これ以外の呼び出しがないことを検証
        verifyNoMoreInteractions(orderRepository);
    }
}`,
      },
      {
        title: "ArgumentCaptor",
        content:
          "ArgumentCaptorはモックメソッドに渡された引数をキャプチャ（捕捉）して後から検証するための機能です。メソッド内部で生成されるオブジェクトの値を検証したい場合に特に有効です。@Captorアノテーションで宣言することもできます。captureしたオブジェクトの各フィールドを詳細に検証でき、複数回呼び出された場合は getAllValues() で全引数を取得できます。",
        code: `@ExtendWith(MockitoExtension.class)
class ArgumentCaptorTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private EmailService emailService;

    // @Captor アノテーションで宣言
    @Captor
    private ArgumentCaptor<Order> orderCaptor;

    @InjectMocks
    private OrderService orderService;

    @Test
    void 保存される注文の内容を検証() {
        when(orderRepository.save(any())).thenReturn(new Order(1L));

        orderService.createOrder("ITEM-001", 3);

        // 引数をキャプチャ
        verify(orderRepository).save(orderCaptor.capture());

        // キャプチャした値を詳細に検証
        Order captured = orderCaptor.getValue();
        assertEquals("ITEM-001", captured.getItemCode());
        assertEquals(3, captured.getQuantity());
        assertEquals(OrderStatus.CREATED, captured.getStatus());
        assertNotNull(captured.getCreatedAt());
    }

    @Test
    void メール送信の引数を検証() {
        // ArgumentCaptor を直接生成する方法
        ArgumentCaptor<String> toCaptor =
            ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> subjectCaptor =
            ArgumentCaptor.forClass(String.class);
        ArgumentCaptor<String> bodyCaptor =
            ArgumentCaptor.forClass(String.class);

        when(orderRepository.save(any())).thenReturn(new Order(1L));

        orderService.createOrder("ITEM-001", 1);

        verify(emailService).send(
            toCaptor.capture(),
            subjectCaptor.capture(),
            bodyCaptor.capture()
        );

        assertEquals("admin@example.com", toCaptor.getValue());
        assertTrue(subjectCaptor.getValue().contains("注文確認"));
    }

    @Test
    void 複数回の呼び出しを全てキャプチャ() {
        when(orderRepository.save(any()))
            .thenAnswer(inv -> inv.getArgument(0));

        orderService.createBulkOrders(List.of("ITEM-001", "ITEM-002", "ITEM-003"));

        verify(orderRepository, times(3)).save(orderCaptor.capture());

        // 全てのキャプチャ値を取得
        List<Order> allOrders = orderCaptor.getAllValues();
        assertEquals(3, allOrders.size());
        assertEquals("ITEM-001", allOrders.get(0).getItemCode());
        assertEquals("ITEM-002", allOrders.get(1).getItemCode());
        assertEquals("ITEM-003", allOrders.get(2).getItemCode());
    }
}`,
      },
    ],
  },
  {
    id: "service-testing",
    title: "Service層のテスト",
    description:
      "ビジネスロジックのテスト設計、例外ケース、テストデータの準備、カバレッジの考え方",
    category: "unit",
    sections: [
      {
        title: "ビジネスロジックのテスト設計",
        content:
          "Service層のテストは、ビジネスロジックが正しく動作することを検証する最も重要なテストです。テスト設計では、まず正常系（ハッピーパス）を検証し、次に境界値や異常系を網羅します。テスト対象のServiceクラスはMockitoで依存関係をモック化し、純粋なビジネスロジックだけをテストします。1テストメソッドにつき1つの振る舞いを検証し、テスト名でその振る舞いが明確にわかるようにします。",
        code: `@ExtendWith(MockitoExtension.class)
class PaymentServiceTest {

    @Mock
    private PaymentGateway paymentGateway;

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentService paymentService;

    // --- 正常系テスト ---
    @Test
    void 支払いを正常に処理できる() {
        // Arrange
        Order order = createTestOrder(1L, new BigDecimal("1000"));
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(paymentGateway.charge(any())).thenReturn(
            new PaymentResult("PAY-001", PaymentStatus.SUCCESS));
        when(paymentRepository.save(any())).thenAnswer(
            inv -> inv.getArgument(0));

        // Act
        Payment result = paymentService.processPayment(1L, PaymentMethod.CREDIT_CARD);

        // Assert
        assertEquals(PaymentStatus.SUCCESS, result.getStatus());
        assertEquals(new BigDecimal("1000"), result.getAmount());
        assertEquals("PAY-001", result.getTransactionId());
    }

    // --- 境界値テスト ---
    @Test
    void 最低金額での支払い() {
        Order order = createTestOrder(2L, new BigDecimal("1")); // 最低1円
        when(orderRepository.findById(2L)).thenReturn(Optional.of(order));
        when(paymentGateway.charge(any())).thenReturn(
            new PaymentResult("PAY-002", PaymentStatus.SUCCESS));
        when(paymentRepository.save(any())).thenAnswer(
            inv -> inv.getArgument(0));

        Payment result = paymentService.processPayment(2L, PaymentMethod.CREDIT_CARD);
        assertEquals(PaymentStatus.SUCCESS, result.getStatus());
    }

    private Order createTestOrder(Long id, BigDecimal amount) {
        Order order = new Order();
        order.setId(id);
        order.setTotalAmount(amount);
        order.setStatus(OrderStatus.CONFIRMED);
        return order;
    }
}`,
      },
      {
        title: "例外ケースのテスト",
        content:
          "例外ケースのテストはシステムの堅牢性を保証するために不可欠です。業務例外（ビジネスルール違反）とシステム例外（インフラ障害）の両方をテストします。assertThrowsで例外の型を検証し、例外メッセージやエラーコードも合わせて確認します。外部サービスの障害をthenThrowでシミュレートし、リトライやフォールバック処理が正しく動作することも検証します。",
        code: `@ExtendWith(MockitoExtension.class)
class PaymentServiceExceptionTest {

    @Mock
    private PaymentGateway paymentGateway;
    @Mock
    private OrderRepository orderRepository;
    @Mock
    private PaymentRepository paymentRepository;
    @InjectMocks
    private PaymentService paymentService;

    @Test
    void 存在しない注文で例外をスロー() {
        when(orderRepository.findById(999L)).thenReturn(Optional.empty());

        OrderNotFoundException ex = assertThrows(
            OrderNotFoundException.class,
            () -> paymentService.processPayment(999L, PaymentMethod.CREDIT_CARD)
        );
        assertEquals("注文が見つかりません: ID=999", ex.getMessage());
    }

    @Test
    void 既にキャンセル済みの注文は支払いできない() {
        Order cancelledOrder = createTestOrder(1L, OrderStatus.CANCELLED);
        when(orderRepository.findById(1L))
            .thenReturn(Optional.of(cancelledOrder));

        InvalidOrderStateException ex = assertThrows(
            InvalidOrderStateException.class,
            () -> paymentService.processPayment(1L, PaymentMethod.CREDIT_CARD)
        );
        assertEquals("CANCELLED", ex.getCurrentState());
    }

    @Test
    void 決済ゲートウェイ障害時にServiceExceptionをスロー() {
        Order order = createTestOrder(1L, OrderStatus.CONFIRMED);
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(paymentGateway.charge(any()))
            .thenThrow(new GatewayConnectionException("タイムアウト"));

        ServiceException ex = assertThrows(
            ServiceException.class,
            () -> paymentService.processPayment(1L, PaymentMethod.CREDIT_CARD)
        );
        assertEquals("PAYMENT_GATEWAY_ERROR", ex.getErrorCode());
        // 元の例外がラップされていることを検証
        assertInstanceOf(GatewayConnectionException.class, ex.getCause());
    }

    @Test
    void 金額が0以下の場合は例外をスロー() {
        Order order = createTestOrder(1L, OrderStatus.CONFIRMED);
        order.setTotalAmount(BigDecimal.ZERO);
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        assertThrows(InvalidAmountException.class,
            () -> paymentService.processPayment(1L, PaymentMethod.CREDIT_CARD));
    }
}`,
      },
      {
        title: "テストデータの準備",
        content:
          "テストデータの準備はテストの可読性と保守性に大きく影響します。テストデータの生成にはBuilderパターンやファクトリメソッドを活用し、テストごとに必要最小限のデータを設定します。テストフィクスチャクラスを作成して共通のテストデータ生成ロジックを集約すると、データ変更時の修正箇所を最小限に抑えられます。テストデータは本番データに近い現実的な値を使い、マジックナンバーは避けましょう。",
        code: `// テストデータのファクトリクラス
class TestDataFactory {

    // Builderパターンでテストデータを生成
    static UserBuilder aUser() {
        return new UserBuilder()
            .withName("テスト太郎")
            .withEmail("test@example.com")
            .withAge(30)
            .withRole(UserRole.MEMBER);
    }

    static OrderBuilder anOrder() {
        return new OrderBuilder()
            .withItemCode("ITEM-001")
            .withQuantity(1)
            .withUnitPrice(new BigDecimal("1000"))
            .withStatus(OrderStatus.CREATED);
    }

    // Builder クラスの例
    static class UserBuilder {
        private String name = "テスト太郎";
        private String email = "test@example.com";
        private int age = 30;
        private UserRole role = UserRole.MEMBER;

        UserBuilder withName(String name) { this.name = name; return this; }
        UserBuilder withEmail(String email) { this.email = email; return this; }
        UserBuilder withAge(int age) { this.age = age; return this; }
        UserBuilder withRole(UserRole role) { this.role = role; return this; }

        User build() { return new User(name, email, age, role); }
    }
}

// テストクラスでの使用例
@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @Test
    void 管理者ユーザーは全ユーザーを取得できる() {
        // テストに必要な属性だけ明示的に設定
        User admin = TestDataFactory.aUser()
            .withName("管理者")
            .withRole(UserRole.ADMIN)
            .build();

        User user1 = TestDataFactory.aUser().withName("田中太郎").build();
        User user2 = TestDataFactory.aUser().withName("山田花子").build();

        when(userRepository.findAll()).thenReturn(List.of(user1, user2));

        List<User> result = userService.getAllUsers(admin);
        assertEquals(2, result.size());
    }

    @Test
    void 一般ユーザーは自分の情報のみ取得できる() {
        User member = TestDataFactory.aUser()
            .withRole(UserRole.MEMBER)
            .build();

        assertThrows(AccessDeniedException.class,
            () -> userService.getAllUsers(member));
    }
}`,
      },
      {
        title: "カバレッジの考え方",
        content:
          "テストカバレッジはコードがどの程度テストされているかの指標です。行カバレッジ（C0）は実行された行の割合、分岐カバレッジ（C1）は条件分岐の網羅率を示します。JaCoCoはJavaで最も広く使われるカバレッジツールです。カバレッジ100%を目指すのではなく、ビジネスロジックの重要な部分を優先的にカバーすることが重要です。一般的には行カバレッジ80%以上を目標とし、getter/setterや設定クラスはカバレッジ対象から除外するのが現実的です。",
        code: `// build.gradle - JaCoCo設定
/*
plugins {
    id 'jacoco'
}

jacoco {
    toolVersion = "0.8.11"
}

jacocoTestReport {
    reports {
        xml.required = true
        html.required = true
    }

    // カバレッジ対象から除外
    afterEvaluate {
        classDirectories.setFrom(files(classDirectories.files.collect {
            fileTree(dir: it, exclude: [
                '**/config/**',
                '**/dto/**',
                '**/entity/**',
                '**/*Application*'
            ])
        }))
    }
}

jacocoTestCoverageVerification {
    violationRules {
        rule {
            limit {
                // 行カバレッジ 80% 以上を要求
                minimum = 0.80
            }
        }
        rule {
            element = 'CLASS'
            includes = ['com.example.service.*']
            limit {
                counter = 'BRANCH'
                // Service層は分岐カバレッジ 90% 以上
                minimum = 0.90
            }
        }
    }
}

// test タスクの後にレポートを生成
test {
    finalizedBy jacocoTestReport
}

// check タスクでカバレッジ検証
jacocoTestReport {
    finalizedBy jacocoTestCoverageVerification
}
*/

// カバレッジを意識したテスト設計の例
class DiscountServiceTest {

    private DiscountService discountService = new DiscountService();

    // 全ての分岐をカバーするテスト
    @Test
    void ゴールド会員は20パーセント割引() {
        BigDecimal result = discountService.calculate(
            MembershipLevel.GOLD, new BigDecimal("10000"));
        assertEquals(new BigDecimal("8000"), result);
    }

    @Test
    void シルバー会員は10パーセント割引() {
        BigDecimal result = discountService.calculate(
            MembershipLevel.SILVER, new BigDecimal("10000"));
        assertEquals(new BigDecimal("9000"), result);
    }

    @Test
    void 一般会員は割引なし() {
        BigDecimal result = discountService.calculate(
            MembershipLevel.REGULAR, new BigDecimal("10000"));
        assertEquals(new BigDecimal("10000"), result);
    }

    // 境界値テストも忘れずに
    @Test
    void 金額が0の場合は0を返す() {
        BigDecimal result = discountService.calculate(
            MembershipLevel.GOLD, BigDecimal.ZERO);
        assertEquals(BigDecimal.ZERO, result);
    }
}`,
      },
    ],
  },

  // ===== 統合テスト =====
  {
    id: "spring-boot-test",
    title: "@SpringBootTest",
    description:
      "Spring Bootの統合テスト機能、テストコンテキスト、@MockBean、プロファイル設定を学ぶ",
    category: "integration",
    sections: [
      {
        title: "テストコンテキスト",
        content:
          "@SpringBootTestアノテーションはSpringのApplicationContextを完全に起動してテストを実行します。これにより、DI（依存性注入）、AOP、設定ファイルの読み込みなど、実際のSpring環境に近い状態でテストできます。webEnvironment属性でサーバーの起動方式を制御でき、MOCK（デフォルト）ではサーバーを起動せずMockMvcを使い、RANDOM_PORTでは実際にHTTPサーバーを起動します。テストコンテキストはキャッシュされるため、同じ設定のテストクラス間でコンテキストが再利用されます。",
        code: `import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.beans.factory.annotation.Autowired;

// デフォルト: サーバーを起動しない（MockMvc向け）
@SpringBootTest
class ApplicationContextTest {

    @Autowired
    private UserService userService;

    @Test
    void コンテキストが正常にロードされる() {
        // ApplicationContext の起動を検証
        assertNotNull(userService);
    }
}

// ランダムポートでHTTPサーバーを起動
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class UserApiIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void ユーザー一覧APIが動作する() {
        ResponseEntity<List<UserDto>> response = restTemplate.exchange(
            "http://localhost:" + port + "/api/users",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<>() {}
        );

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}

// 特定のクラスだけロードして高速化
@SpringBootTest(classes = {UserService.class, UserRepository.class})
class LightweightTest {

    @Autowired
    private UserService userService;

    @Test
    void 限定されたコンテキストでテスト() {
        // 必要なBeanのみロードして高速に実行
        assertNotNull(userService);
    }
}`,
      },
      {
        title: "@MockBean と @SpyBean",
        content:
          "@MockBeanはSpringのApplicationContext内のBeanをモックに置き換えるアノテーションです。@Mockとの違いは、Springコンテキスト内のBeanを差し替える点です。@SpyBeanは実際のBeanをラップして、特定のメソッドだけモック化できます。テスト終了後にモックは自動的にリセットされます。注意点として、@MockBeanを使うとテストコンテキストが再生成されるため、異なるモック構成のテストクラスが多いとテスト全体が遅くなります。",
        code: `@SpringBootTest
class OrderServiceIntegrationTest {

    // Spring コンテキスト内の PaymentGateway を モックに置き換え
    @MockBean
    private PaymentGateway paymentGateway;

    // 実際の Bean を使う
    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void 外部決済サービスをモック化してテスト() {
        // 外部APIの呼び出しだけモック化
        when(paymentGateway.charge(any()))
            .thenReturn(new PaymentResult("TXN-001", true));

        Order order = orderService.createAndPay("ITEM-001", 2);

        assertEquals(OrderStatus.PAID, order.getStatus());
        // 実際のDBに保存されたことを検証
        assertTrue(orderRepository.findById(order.getId()).isPresent());
    }
}

@SpringBootTest
class NotificationServiceIntegrationTest {

    // 実際のBeanをラップ（一部だけモック化）
    @SpyBean
    private EmailService emailService;

    @Autowired
    private NotificationService notificationService;

    @Test
    void メール送信処理を部分的にモック化() {
        // 実際の送信処理だけスキップ
        doNothing().when(emailService).sendMail(any(MailMessage.class));

        notificationService.notifyOrderComplete(1L);

        // メール送信メソッドが呼ばれたことを検証
        verify(emailService).sendMail(argThat(mail ->
            mail.getSubject().contains("注文完了")
        ));
    }

    @Test
    void SpyBeanは元の実装も呼べる() {
        // テンプレートの生成は実際の処理を使用
        // 送信だけモック化
        doNothing().when(emailService).sendMail(any());

        notificationService.notifyOrderComplete(1L);

        // テンプレートの内容も検証できる
        ArgumentCaptor<MailMessage> captor =
            ArgumentCaptor.forClass(MailMessage.class);
        verify(emailService).sendMail(captor.capture());
        assertTrue(captor.getValue().getBody().contains("ご注文ありがとう"));
    }
}`,
      },
      {
        title: "プロファイル設定（@ActiveProfiles）",
        content:
          "@ActiveProfilesアノテーションでテスト実行時に有効にするSpringプロファイルを指定できます。テスト用の設定ファイル（application-test.yml）を用意し、本番環境とは異なるデータベースや外部サービスの設定を使い分けます。プロファイルを活用することで、テスト環境に特化した設定（H2データベース、モックサーバーのURL等）を安全に管理できます。",
        code: `// テスト用プロファイルを有効化
@SpringBootTest
@ActiveProfiles("test")
class UserServiceWithProfileTest {

    @Autowired
    private UserService userService;

    @Autowired
    private Environment environment;

    @Test
    void テストプロファイルが有効() {
        assertTrue(
            List.of(environment.getActiveProfiles()).contains("test")
        );
    }

    @Test
    void テスト用DBに接続されている() {
        // application-test.yml の設定が使われる
        User user = userService.createUser("テスト太郎", "test@example.com");
        assertNotNull(user.getId());
    }
}

/*
 * src/test/resources/application-test.yml
 *
 * spring:
 *   datasource:
 *     url: jdbc:h2:mem:testdb
 *     driver-class-name: org.h2.Driver
 *   jpa:
 *     hibernate:
 *       ddl-auto: create-drop
 *     database-platform: org.hibernate.dialect.H2Dialect
 *   mail:
 *     host: localhost
 *     port: 25
 *
 * app:
 *   external-api:
 *     base-url: http://localhost:8089/mock
 *   feature:
 *     new-ui: true
 */

// 複数プロファイルの組み合わせ
@SpringBootTest
@ActiveProfiles({"test", "local"})
class MultiProfileTest {
    // "test" と "local" の両方のプロファイルが有効
}`,
      },
      {
        title: "テストプロパティ",
        content:
          "@TestPropertySourceや@SpringBootTest(properties=...)を使って、テスト固有のプロパティを設定できます。設定ファイルを丸ごと差し替えることも、個別のプロパティだけオーバーライドすることも可能です。@DynamicPropertySourceを使えば、テスト実行時に動的にプロパティを設定でき、Testcontainersで起動したデータベースの接続先URLを注入するのに便利です。",
        code: `// 個別のプロパティをオーバーライド
@SpringBootTest(properties = {
    "app.max-retry-count=3",
    "app.timeout-seconds=5"
})
class PropertyOverrideTest {

    @Value("\${app.max-retry-count}")
    private int maxRetryCount;

    @Value("\${app.timeout-seconds}")
    private int timeoutSeconds;

    @Test
    void プロパティがオーバーライドされている() {
        assertEquals(3, maxRetryCount);
        assertEquals(5, timeoutSeconds);
    }
}

// テスト用プロパティファイルを指定
@SpringBootTest
@TestPropertySource(locations = "classpath:test-config.properties")
class ExternalPropertyTest {

    @Value("\${app.api-key}")
    private String apiKey;

    @Test
    void 外部プロパティファイルが読み込まれる() {
        assertEquals("test-api-key-12345", apiKey);
    }
}

// 動的にプロパティを設定（Testcontainersとの連携に便利）
@SpringBootTest
class DynamicPropertyTest {

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        // テスト実行時に動的にプロパティを設定
        registry.add("spring.datasource.url",
            () -> "jdbc:h2:mem:dynamic-test-db");
        registry.add("spring.datasource.username", () -> "sa");
        registry.add("spring.datasource.password", () -> "");
        registry.add("app.external-api.url",
            () -> "http://localhost:" + wireMockPort);
    }

    @Autowired
    private DataSource dataSource;

    @Test
    void 動的プロパティでDB接続できる() throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            assertFalse(conn.isClosed());
        }
    }
}`,
      },
    ],
  },
  {
    id: "web-layer-test",
    title: "Web層テスト",
    description:
      "@WebMvcTestとMockMvcを使ったコントローラーのテスト、バリデーション、セキュリティテスト",
    category: "integration",
    sections: [
      {
        title: "@WebMvcTest と MockMvc",
        content:
          "@WebMvcTestはWeb層（Controller、Filter、ControllerAdvice等）のみをロードする軽量なテストアノテーションです。Service層やRepository層はロードされないため、@MockBeanで依存関係をモック化します。MockMvcを使うと、HTTPリクエストをシミュレートしてレスポンスのステータスコード、ヘッダー、ボディを検証できます。@SpringBootTestと比べて起動が高速で、コントローラーのロジックに集中してテストできます。",
        code: `import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Test
    void ユーザー一覧を取得できる() throws Exception {
        // Arrange
        List<UserDto> users = List.of(
            new UserDto(1L, "田中太郎", "tanaka@example.com"),
            new UserDto(2L, "山田花子", "yamada@example.com")
        );
        when(userService.findAll()).thenReturn(users);

        // Act & Assert
        mockMvc.perform(get("/api/users"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].name").value("田中太郎"))
            .andExpect(jsonPath("$[1].email").value("yamada@example.com"));
    }

    @Test
    void IDでユーザーを取得できる() throws Exception {
        UserDto user = new UserDto(1L, "田中太郎", "tanaka@example.com");
        when(userService.findById(1L)).thenReturn(user);

        mockMvc.perform(get("/api/users/{id}", 1L))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("田中太郎"));
    }

    @Test
    void 存在しないユーザーで404を返す() throws Exception {
        when(userService.findById(999L))
            .thenThrow(new UserNotFoundException(999L));

        mockMvc.perform(get("/api/users/{id}", 999L))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.message").value("ユーザーが見つかりません"));
    }
}`,
      },
      {
        title: "JSONリクエスト / レスポンスの検証",
        content:
          "MockMvcではPOST/PUT/PATCHリクエストでJSONボディを送信し、レスポンスのJSON構造を詳細に検証できます。ObjectMapperでオブジェクトをJSON文字列に変換し、content()でリクエストボディに設定します。レスポンスはjsonPath()でJSONPathを使って個別のフィールドを検証するほか、andReturn()で結果全体を取得して詳細に検証することも可能です。",
        code: `@WebMvcTest(UserController.class)
class UserControllerJsonTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    void ユーザーをJSONで作成できる() throws Exception {
        // リクエストボディの準備
        CreateUserRequest request = new CreateUserRequest();
        request.setName("田中太郎");
        request.setEmail("tanaka@example.com");
        request.setAge(30);

        UserDto response = new UserDto(1L, "田中太郎", "tanaka@example.com");
        when(userService.create(any())).thenReturn(response);

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(header().exists("Location"))
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.name").value("田中太郎"))
            .andExpect(jsonPath("$.email").value("tanaka@example.com"));
    }

    @Test
    void ユーザーを更新できる() throws Exception {
        UpdateUserRequest request = new UpdateUserRequest();
        request.setName("田中太郎（更新）");
        request.setAge(31);

        UserDto updated = new UserDto(1L, "田中太郎（更新）", "tanaka@example.com");
        when(userService.update(eq(1L), any())).thenReturn(updated);

        mockMvc.perform(put("/api/users/{id}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.name").value("田中太郎（更新）"));
    }

    @Test
    void レスポンス全体を検証() throws Exception {
        UserDto user = new UserDto(1L, "田中太郎", "tanaka@example.com");
        when(userService.findById(1L)).thenReturn(user);

        MvcResult result = mockMvc.perform(get("/api/users/1"))
            .andExpect(status().isOk())
            .andReturn();

        // レスポンスボディを文字列として取得
        String json = result.getResponse().getContentAsString();
        UserDto actual = objectMapper.readValue(json, UserDto.class);
        assertEquals("田中太郎", actual.getName());
    }
}`,
      },
      {
        title: "バリデーションテスト",
        content:
          "コントローラーに設定したバリデーション（@Valid, @NotBlank, @Size等）が正しく動作するかをテストします。無効なリクエストを送信してステータスコード400（Bad Request）が返ること、エラーメッセージが適切であることを検証します。フィールドごとにバリデーションエラーの内容を確認し、複数のバリデーション違反が同時に返されることも検証できます。",
        code: `@WebMvcTest(UserController.class)
class UserValidationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    void 名前が空の場合は400エラー() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("");  // @NotBlank 違反
        request.setEmail("test@example.com");

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors[0].field").value("name"))
            .andExpect(jsonPath("$.errors[0].message")
                .value("名前は必須です"));
    }

    @Test
    void メール形式が不正な場合は400エラー() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("田中太郎");
        request.setEmail("invalid-email");  // @Email 違反

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors[0].field").value("email"));
    }

    @Test
    void 複数のバリデーションエラーを同時に返す() throws Exception {
        // 全フィールドが空のリクエスト
        CreateUserRequest request = new CreateUserRequest();

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors", hasSize(greaterThanOrEqualTo(2))));
    }

    @Test
    void 名前が100文字を超える場合は400エラー() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("あ".repeat(101));  // @Size(max=100) 違反
        request.setEmail("test@example.com");

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.errors[0].field").value("name"));
    }

    @Test
    void 年齢が負の数の場合は400エラー() throws Exception {
        CreateUserRequest request = new CreateUserRequest();
        request.setName("田中太郎");
        request.setEmail("test@example.com");
        request.setAge(-1);  // @Min(0) 違反

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest());
    }
}`,
      },
      {
        title: "セキュリティテスト（@WithMockUser）",
        content:
          "Spring Securityが有効な場合、@WithMockUserで認証済みユーザーをシミュレートしてテストできます。ロールや権限を指定して、アクセス制御が正しく動作するか検証します。未認証の場合のレスポンス（401 Unauthorized）、権限不足の場合のレスポンス（403 Forbidden）も確認します。カスタム認証の場合は@WithSecurityContextを使って独自のセキュリティコンテキストを設定できます。",
        code: `import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithAnonymousUser;

@WebMvcTest(AdminController.class)
class AdminControllerSecurityTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdminService adminService;

    // 管理者ロールでアクセス
    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void 管理者は管理画面にアクセスできる() throws Exception {
        when(adminService.getDashboard())
            .thenReturn(new DashboardData(100, 50));

        mockMvc.perform(get("/api/admin/dashboard"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.totalUsers").value(100));
    }

    // 一般ユーザーは管理画面にアクセスできない
    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void 一般ユーザーは管理画面にアクセスできない() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard"))
            .andExpect(status().isForbidden());
    }

    // 未認証ユーザーは401
    @Test
    @WithAnonymousUser
    void 未認証ユーザーは401を返す() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard"))
            .andExpect(status().isUnauthorized());
    }

    // カスタムユーザー詳細でテスト
    @Test
    @WithMockUser(username = "manager@example.com",
                  authorities = {"USER_READ", "USER_WRITE"})
    void 特定の権限を持つユーザーのテスト() throws Exception {
        mockMvc.perform(get("/api/admin/users"))
            .andExpect(status().isOk());
    }

    // CSRFトークンのテスト
    @Test
    @WithMockUser(roles = {"ADMIN"})
    void CSRF保護が有効な場合のPOSTテスト() throws Exception {
        mockMvc.perform(post("/api/admin/users")
                .with(csrf())  // CSRFトークンを付与
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"name\\": \\"新規ユーザー\\"}"))
            .andExpect(status().isCreated());
    }

    @Test
    @WithMockUser(roles = {"ADMIN"})
    void CSRFトークンなしのPOSTは403() throws Exception {
        mockMvc.perform(post("/api/admin/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"name\\": \\"新規ユーザー\\"}"))
            .andExpect(status().isForbidden());
    }
}`,
      },
    ],
  },
  {
    id: "data-layer-test",
    title: "データ層テスト",
    description:
      "@DataJpaTest、TestEntityManager、H2データベース、@Sqlアノテーションを使ったデータ層のテスト",
    category: "integration",
    sections: [
      {
        title: "@DataJpaTest",
        content:
          "@DataJpaTestはJPA関連のコンポーネント（Entity、Repository、EntityManager等）のみをロードする軽量なテストアノテーションです。デフォルトでインメモリデータベース（H2）を使用し、各テストメソッドの後にトランザクションが自動ロールバックされるため、テスト間のデータ汚染を防ぎます。@AutoConfigureTestDatabaseで実際のデータベースを使うように切り替えることも可能です。",
        code: `import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void ユーザーを保存して取得できる() {
        // Arrange
        User user = new User("田中太郎", "tanaka@example.com", 30);

        // Act
        User saved = userRepository.save(user);
        Optional<User> found = userRepository.findById(saved.getId());

        // Assert
        assertTrue(found.isPresent());
        assertEquals("田中太郎", found.get().getName());
        assertEquals("tanaka@example.com", found.get().getEmail());
    }

    @Test
    void メールアドレスでユーザーを検索できる() {
        userRepository.save(new User("田中太郎", "tanaka@example.com", 30));
        userRepository.save(new User("山田花子", "yamada@example.com", 25));

        Optional<User> result =
            userRepository.findByEmail("tanaka@example.com");

        assertTrue(result.isPresent());
        assertEquals("田中太郎", result.get().getName());
    }

    @Test
    void カスタムクエリのテスト() {
        userRepository.save(new User("田中", "tanaka@example.com", 30));
        userRepository.save(new User("山田", "yamada@example.com", 25));
        userRepository.save(new User("佐藤", "sato@example.com", 35));

        // 年齢範囲で検索するカスタムクエリ
        List<User> result = userRepository.findByAgeBetween(26, 40);

        assertEquals(2, result.size());
    }

    @Test
    void ページネーションのテスト() {
        for (int i = 1; i <= 25; i++) {
            userRepository.save(
                new User("ユーザー" + i, "user" + i + "@example.com", 20 + i));
        }

        Page<User> page = userRepository.findAll(PageRequest.of(0, 10));
        assertEquals(10, page.getContent().size());
        assertEquals(25, page.getTotalElements());
        assertEquals(3, page.getTotalPages());
    }
}`,
      },
      {
        title: "TestEntityManager",
        content:
          "TestEntityManagerはJPAテスト用に最適化されたEntityManagerのラッパーです。persist()でエンティティを直接保存し、find()でIDから取得できます。flush()とclear()を使ってJPAのキャッシュをクリアすることで、実際にデータベースに書き込まれたデータを検証できます。Repositoryのテストでは、TestEntityManagerでテストデータを投入し、テスト対象のRepositoryメソッドで検索する形が一般的です。",
        code: `@DataJpaTest
class OrderRepositoryWithEntityManagerTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private OrderRepository orderRepository;

    @Test
    void TestEntityManagerでデータを準備() {
        // TestEntityManager でテストデータを投入
        User user = entityManager.persistAndFlush(
            new User("田中太郎", "tanaka@example.com", 30));

        Order order1 = new Order(user, "ITEM-001", 2, OrderStatus.CREATED);
        Order order2 = new Order(user, "ITEM-002", 1, OrderStatus.PAID);
        entityManager.persist(order1);
        entityManager.persist(order2);
        entityManager.flush();
        entityManager.clear(); // 1次キャッシュをクリア

        // テスト対象の Repository メソッドを呼び出し
        List<Order> orders = orderRepository.findByUserId(user.getId());

        assertEquals(2, orders.size());
    }

    @Test
    void エンティティの永続化を検証() {
        Order order = new Order();
        order.setItemCode("ITEM-001");
        order.setQuantity(3);
        order.setStatus(OrderStatus.CREATED);

        // persist で保存
        Order saved = entityManager.persistAndFlush(order);

        // clear でキャッシュクリア後に再取得
        entityManager.clear();

        // find で直接取得して検証
        Order found = entityManager.find(Order.class, saved.getId());
        assertNotNull(found);
        assertEquals("ITEM-001", found.getItemCode());
        assertEquals(3, found.getQuantity());
    }

    @Test
    void カスケード保存の検証() {
        User user = new User("田中太郎", "tanaka@example.com", 30);
        user.addAddress(new Address("東京都", "渋谷区", "123-4567"));
        user.addAddress(new Address("大阪府", "中央区", "456-7890"));

        entityManager.persistAndFlush(user);
        entityManager.clear();

        User found = entityManager.find(User.class, user.getId());
        assertEquals(2, found.getAddresses().size());
    }
}`,
      },
      {
        title: "H2でのテスト",
        content:
          "H2はJavaで動作するインメモリデータベースで、テスト環境で広く使われています。@DataJpaTestではデフォルトでH2が使用されるため、追加設定なしにデータベーステストを高速に実行できます。H2はMySQL互換モードやPostgreSQL互換モードを持っており、本番環境に近いSQL方言でテストできます。ただし、一部のDB固有機能（ストアドプロシージャ、ウィンドウ関数等）はH2では完全に再現できないため、そのような場合はTestcontainersの使用を検討します。",
        code: `/*
 * build.gradle の設定
 *
 * dependencies {
 *     // テスト用のH2データベース
 *     testRuntimeOnly 'com.h2database:h2'
 * }
 */

/*
 * src/test/resources/application-test.yml
 *
 * spring:
 *   datasource:
 *     # MySQL互換モードで動作
 *     url: jdbc:h2:mem:testdb;MODE=MySQL;DB_CLOSE_DELAY=-1
 *     driver-class-name: org.h2.Driver
 *     username: sa
 *     password:
 *   jpa:
 *     hibernate:
 *       ddl-auto: create-drop
 *     show-sql: true
 *     properties:
 *       hibernate:
 *         format_sql: true
 */

@DataJpaTest
@ActiveProfiles("test")
class H2DatabaseTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DataSource dataSource;

    @Test
    void H2データベースに接続できる() throws Exception {
        try (Connection conn = dataSource.getConnection()) {
            DatabaseMetaData meta = conn.getMetaData();
            assertTrue(meta.getURL().contains("h2:mem"));
        }
    }

    @Test
    void JPQL_カスタムクエリが正しく動作する() {
        userRepository.save(new User("田中太郎", "tanaka@example.com", 30));
        userRepository.save(new User("田中花子", "hanako@example.com", 25));
        userRepository.save(new User("山田一郎", "yamada@example.com", 35));

        // @Query で定義したカスタムJPQL
        List<User> result = userRepository.searchByName("田中");
        assertEquals(2, result.size());
    }

    @Test
    void ネイティブクエリのテスト() {
        userRepository.save(new User("田中", "tanaka@example.com", 30));
        userRepository.save(new User("山田", "yamada@example.com", 20));

        // ネイティブSQLクエリ
        List<User> adults = userRepository.findAdultUsers(25);
        assertEquals(1, adults.size());
        assertEquals("田中", adults.get(0).getName());
    }
}

// 実際のDBを使う場合は AutoConfigureTestDatabase を設定
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test-postgres")
class RealDatabaseTest {
    // application-test-postgres.yml に実DBの接続情報を設定
}`,
      },
      {
        title: "@Sql でテストデータ投入",
        content:
          "@Sqlアノテーションを使うと、SQLスクリプトファイルを指定してテストデータを投入できます。テストクラスまたはテストメソッドに付与でき、実行タイミング（BEFORE_TEST_METHOD / AFTER_TEST_METHOD）も制御できます。大量のテストデータや複雑なデータ構造の場合、SQLファイルで管理する方がJavaコードで作成するよりも可読性が高くなります。@SqlGroupで複数のSQLファイルをグループ化することも可能です。",
        code: `// --- src/test/resources/sql/insert-users.sql ---
/*
INSERT INTO users (id, name, email, age, status)
VALUES (1, '田中太郎', 'tanaka@example.com', 30, 'ACTIVE');
INSERT INTO users (id, name, email, age, status)
VALUES (2, '山田花子', 'yamada@example.com', 25, 'ACTIVE');
INSERT INTO users (id, name, email, age, status)
VALUES (3, '佐藤一郎', 'sato@example.com', 40, 'INACTIVE');
*/

// --- src/test/resources/sql/cleanup.sql ---
/*
DELETE FROM orders;
DELETE FROM users;
*/

@DataJpaTest
@ActiveProfiles("test")
class SqlAnnotationTest {

    @Autowired
    private UserRepository userRepository;

    // テストメソッドの前にSQLを実行
    @Test
    @Sql("/sql/insert-users.sql")
    void SQLファイルでデータを投入してテスト() {
        List<User> users = userRepository.findAll();
        assertEquals(3, users.size());
    }

    // 複数SQLファイルの実行と後処理
    @Test
    @Sql(scripts = "/sql/insert-users.sql",
         executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
    @Sql(scripts = "/sql/cleanup.sql",
         executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
    void 前処理と後処理のSQLを指定() {
        List<User> activeUsers =
            userRepository.findByStatus(UserStatus.ACTIVE);
        assertEquals(2, activeUsers.size());
    }

    // @SqlGroup で複数ファイルをグループ化
    @Test
    @SqlGroup({
        @Sql("/sql/insert-users.sql"),
        @Sql("/sql/insert-orders.sql")
    })
    void 複数テーブルにデータを投入() {
        // users と orders の両テーブルにデータが投入される
        List<User> users = userRepository.findAll();
        assertEquals(3, users.size());
    }

    // インラインSQLの実行
    @Test
    @Sql(statements = {
        "INSERT INTO users (name, email, age, status) VALUES ('テスト', 'test@example.com', 20, 'ACTIVE')"
    })
    void インラインSQLでデータ投入() {
        Optional<User> user =
            userRepository.findByEmail("test@example.com");
        assertTrue(user.isPresent());
    }

    // SQL設定のカスタマイズ
    @Test
    @Sql(scripts = "/sql/insert-users.sql",
         config = @SqlConfig(
             encoding = "UTF-8",
             separator = ";",
             commentPrefix = "--",
             errorMode = SqlConfig.ErrorMode.CONTINUE_ON_ERROR
         ))
    void SQL設定をカスタマイズ() {
        assertFalse(userRepository.findAll().isEmpty());
    }
}`,
      },
    ],
  },

  // ===== テスト応用 =====
  {
    id: "testcontainers",
    title: "Testcontainers",
    description:
      "Testcontainersを使った本番環境に近いデータベース・ミドルウェアのテスト",
    category: "advanced",
    sections: [
      {
        title: "PostgreSQL / MySQL / Redis コンテナ",
        content:
          "TestcontainersはDockerコンテナをテストのライフサイクルに統合するライブラリです。本番環境と同じデータベース（PostgreSQL、MySQL等）やミドルウェア（Redis、Kafka等）をテスト時に自動起動し、テスト終了後に自動削除します。H2では再現できないDB固有機能のテストや、より本番に近い環境での統合テストに最適です。コンテナの起動にはDockerが必要ですが、テストの信頼性を大幅に向上させます。",
        code: `import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

/*
 * build.gradle の設定
 *
 * dependencies {
 *     testImplementation 'org.testcontainers:testcontainers:1.19.3'
 *     testImplementation 'org.testcontainers:junit-jupiter:1.19.3'
 *     testImplementation 'org.testcontainers:postgresql:1.19.3'
 *     testImplementation 'org.testcontainers:mysql:1.19.3'
 * }
 */

@Testcontainers
@SpringBootTest
class PostgreSQLContainerTest {

    // PostgreSQL コンテナを定義
    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass")
            .withInitScript("sql/init-schema.sql");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    void PostgreSQLでリポジトリが動作する() {
        User user = new User("田中太郎", "tanaka@example.com", 30);
        User saved = userRepository.save(user);

        assertNotNull(saved.getId());
        assertTrue(postgres.isRunning());
    }
}

// Redis コンテナの例
@Testcontainers
@SpringBootTest
class RedisContainerTest {

    @Container
    static GenericContainer<?> redis =
        new GenericContainer<>("redis:7-alpine")
            .withExposedPorts(6379);

    @DynamicPropertySource
    static void configureRedis(DynamicPropertyRegistry registry) {
        registry.add("spring.data.redis.host", redis::getHost);
        registry.add("spring.data.redis.port",
            () -> redis.getMappedPort(6379));
    }

    @Autowired
    private CacheService cacheService;

    @Test
    void Redisキャッシュが動作する() {
        cacheService.put("key1", "value1");
        assertEquals("value1", cacheService.get("key1"));
    }
}`,
      },
      {
        title: "@Container と @Testcontainers",
        content:
          "@Testcontainersアノテーションはテストクラスでコンテナのライフサイクル管理を有効にします。@Containerを付けたフィールドのコンテナが自動的に起動・停止されます。staticフィールドに付与するとクラス単位で共有（高速）、インスタンスフィールドに付与するとメソッド単位で再作成（独立性が高い）されます。共通のコンテナ設定は抽象テストクラスにまとめて再利用すると効率的です。",
        code: `// 基底テストクラスにコンテナ設定を集約
@Testcontainers
@SpringBootTest
abstract class AbstractIntegrationTest {

    // クラス間で共有される static コンテナ
    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @Container
    static GenericContainer<?> redis =
        new GenericContainer<>("redis:7-alpine")
            .withExposedPorts(6379);

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        // PostgreSQL
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        // Redis
        registry.add("spring.data.redis.host", redis::getHost);
        registry.add("spring.data.redis.port",
            () -> redis.getMappedPort(6379));
    }
}

// 基底クラスを継承して使用
class UserServiceIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private UserService userService;

    @Test
    void ユーザーのCRUDが正しく動作する() {
        User created = userService.createUser("田中", "tanaka@example.com");
        assertNotNull(created.getId());

        User found = userService.findById(created.getId());
        assertEquals("田中", found.getName());
    }
}

class OrderServiceIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private OrderService orderService;

    @Test
    void 注文のCRUDが正しく動作する() {
        Order order = orderService.createOrder("ITEM-001", 3);
        assertNotNull(order.getId());
    }
}

// メソッド単位でコンテナを再作成する場合（非static）
@Testcontainers
@SpringBootTest
class IsolatedContainerTest {

    // 各テストメソッドで新しいコンテナが起動（遅いが独立性が高い）
    @Container
    PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:16-alpine");

    @Test
    void 独立したDBでテスト1() {
        assertTrue(postgres.isRunning());
    }

    @Test
    void 独立したDBでテスト2() {
        assertTrue(postgres.isRunning());
    }
}`,
      },
      {
        title: "Docker Compose連携",
        content:
          "Testcontainersはdocker-compose.ymlを直接読み込んでテスト環境を構築する機能を提供しています。複数のサービス（DB + Redis + メッセージキュー等）をまとめて起動でき、既存のDocker Compose設定を流用できるため、本番環境との差異を最小限に抑えられます。サービスの起動順序や依存関係もDocker Composeの設定に従って自動管理されます。",
        code: `import org.testcontainers.containers.DockerComposeContainer;
import org.testcontainers.containers.wait.strategy.Wait;

/*
 * src/test/resources/docker-compose-test.yml
 *
 * services:
 *   postgres:
 *     image: postgres:16-alpine
 *     environment:
 *       POSTGRES_DB: testdb
 *       POSTGRES_USER: testuser
 *       POSTGRES_PASSWORD: testpass
 *     ports:
 *       - "5432:5432"
 *
 *   redis:
 *     image: redis:7-alpine
 *     ports:
 *       - "6379:6379"
 */

@Testcontainers
@SpringBootTest
class DockerComposeTest {

    @Container
    static DockerComposeContainer<?> environment =
        new DockerComposeContainer<>(
            new File("src/test/resources/docker-compose-test.yml"))
            .withExposedService("postgres", 5432,
                Wait.forListeningPort())
            .withExposedService("redis", 6379,
                Wait.forListeningPort());

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        String pgHost = environment.getServiceHost("postgres", 5432);
        int pgPort = environment.getServicePort("postgres", 5432);

        registry.add("spring.datasource.url",
            () -> String.format("jdbc:postgresql://%s:%d/testdb",
                                pgHost, pgPort));
        registry.add("spring.datasource.username", () -> "testuser");
        registry.add("spring.datasource.password", () -> "testpass");

        String redisHost = environment.getServiceHost("redis", 6379);
        int redisPort = environment.getServicePort("redis", 6379);
        registry.add("spring.data.redis.host", () -> redisHost);
        registry.add("spring.data.redis.port", () -> redisPort);
    }

    @Autowired
    private UserService userService;

    @Autowired
    private CacheService cacheService;

    @Test
    void DBとRedisの連携テスト() {
        // PostgreSQL にユーザーを保存
        User user = userService.createUser("田中太郎", "tanaka@example.com");

        // Redis にキャッシュ
        cacheService.cacheUser(user);

        // キャッシュから取得
        User cached = cacheService.getCachedUser(user.getId());
        assertEquals("田中太郎", cached.getName());
    }
}`,
      },
      {
        title: "CI環境での実行",
        content:
          "Testcontainersを使ったテストをCI環境（GitHub Actions、GitLab CI等）で実行するには、DockerデーモンへのアクセスとDocker-in-Docker（DinD）またはDockerソケットのマウントが必要です。GitHub ActionsではubuntuランナーにデフォルトでDockerが利用可能なため、特別な設定なしにTestcontainersを使えます。テスト実行時間を短縮するために、コンテナイメージのキャッシュやシングルトンコンテナパターンの活用が推奨されます。",
        code: `/*
 * .github/workflows/test.yml
 *
 * name: Test with Testcontainers
 *
 * on: [push, pull_request]
 *
 * jobs:
 *   test:
 *     runs-on: ubuntu-latest
 *
 *     steps:
 *       - uses: actions/checkout@v4
 *
 *       - name: Set up JDK 21
 *         uses: actions/setup-java@v4
 *         with:
 *           java-version: '21'
 *           distribution: 'temurin'
 *           cache: gradle
 *
 *       - name: Run tests
 *         run: ./gradlew test
 *
 *       - name: Upload test results
 *         uses: actions/upload-artifact@v4
 *         if: always()
 *         with:
 *           name: test-results
 *           path: build/reports/tests/
 */

// シングルトンコンテナパターン（CI高速化）
// テスト全体で1つのコンテナを共有
abstract class SingletonContainerBase {

    static final PostgreSQLContainer<?> POSTGRES;
    static final GenericContainer<?> REDIS;

    static {
        POSTGRES = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test")
            .withReuse(true); // コンテナの再利用を有効化

        REDIS = new GenericContainer<>("redis:7-alpine")
            .withExposedPorts(6379)
            .withReuse(true);

        // 全テストクラスで共有するため手動で起動
        POSTGRES.start();
        REDIS.start();
    }

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
        registry.add("spring.data.redis.host", REDIS::getHost);
        registry.add("spring.data.redis.port",
            () -> REDIS.getMappedPort(6379));
    }
}

// CI環境でTestcontainersが利用不可の場合にスキップ
@SpringBootTest
class ConditionalContainerTest extends SingletonContainerBase {

    @Test
    @EnabledIfEnvironmentVariable(named = "CI", matches = "true")
    void CI環境でのみ実行されるテスト() {
        // CI環境限定のテスト
    }

    @Test
    void 通常のテスト() {
        // Docker利用可能時に実行
        assertTrue(POSTGRES.isRunning());
    }
}`,
      },
    ],
  },
  {
    id: "test-strategy",
    title: "テスト戦略",
    description:
      "テストピラミッド、カバレッジ目標、TDD/BDD、CI/CDでのテスト自動化の戦略を学ぶ",
    category: "advanced",
    sections: [
      {
        title: "テストピラミッド",
        content:
          "テストピラミッドはMike Cohnが提唱したテスト分類モデルで、テストを3階層（単体テスト・統合テスト・E2Eテスト）に分類します。下層ほど高速・安価・大量に実行し、上層ほど低速・高価・少量にするのが原則です。Spring Bootプロジェクトでは、Service層のユニットテストを最も厚くし、次にRepository・Controller層の統合テスト、最後にエンドツーエンドのシナリオテストという構成が推奨されます。アンチパターンとして、E2Eテストに偏重する「アイスクリームコーン」型があります。",
        code: `/*
 * テストピラミッドの構成例（Spring Boot プロジェクト）
 *
 * ┌─────────────────────────┐
 * │   E2E テスト (5-10%)     │  Selenium / Playwright
 * │   ・ユーザーシナリオ      │  実行時間: 数分〜数十分
 * ├─────────────────────────┤
 * │   統合テスト (20-30%)    │  @SpringBootTest
 * │   ・API テスト           │  @WebMvcTest
 * │   ・DB テスト            │  @DataJpaTest
 * │   ・外部連携テスト        │  Testcontainers
 * ├─────────────────────────┤
 * │   単体テスト (60-70%)    │  JUnit 5 + Mockito
 * │   ・Service 層           │  実行時間: ミリ秒
 * │   ・ビジネスロジック       │
 * │   ・ユーティリティ        │
 * └─────────────────────────┘
 */

// テスト分類をアノテーションで管理
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Tag("unit")
@ExtendWith(MockitoExtension.class)
@interface UnitTest {}

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Tag("integration")
@SpringBootTest
@ActiveProfiles("test")
@interface IntegrationTest {}

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Tag("e2e")
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@interface E2ETest {}

// 使用例
@UnitTest
class CalculatorServiceTest {
    // 高速な単体テスト
}

@IntegrationTest
class UserApiTest {
    // Spring コンテキストを使う統合テスト
}

/*
 * build.gradle でタグごとにテスト実行を制御
 *
 * tasks.named('test') {
 *     useJUnitPlatform {
 *         includeTags 'unit'  // 通常は単体テストのみ実行
 *     }
 * }
 *
 * tasks.register('integrationTest', Test) {
 *     useJUnitPlatform {
 *         includeTags 'integration'
 *     }
 * }
 *
 * tasks.register('e2eTest', Test) {
 *     useJUnitPlatform {
 *         includeTags 'e2e'
 *     }
 * }
 */`,
      },
      {
        title: "テストカバレッジ目標",
        content:
          "テストカバレッジは品質の指標の一つですが、数値だけを追い求めるのは危険です。重要なのは「何をテストするか」の選択です。ビジネスロジック（Service層）は90%以上、データアクセス（Repository層）は80%以上、コントローラー（Web層）は70%以上を目安とし、DTO・設定クラス・定数クラスはカバレッジ対象から除外するのが現実的です。ミューテーションテスト（PIT）を導入すると、テストの品質自体を測定できます。",
        code: `/*
 * build.gradle - JaCoCo + カバレッジゲート設定
 *
 * plugins {
 *     id 'jacoco'
 * }
 *
 * jacocoTestCoverageVerification {
 *     violationRules {
 *         // 全体の行カバレッジ
 *         rule {
 *             limit {
 *                 counter = 'LINE'
 *                 minimum = 0.80
 *             }
 *         }
 *
 *         // Service層は高いカバレッジを要求
 *         rule {
 *             element = 'CLASS'
 *             includes = ['com.example.service.*']
 *             limit {
 *                 counter = 'BRANCH'
 *                 minimum = 0.90
 *             }
 *         }
 *
 *         // Controller層
 *         rule {
 *             element = 'CLASS'
 *             includes = ['com.example.controller.*']
 *             limit {
 *                 counter = 'LINE'
 *                 minimum = 0.70
 *             }
 *         }
 *     }
 * }
 */

// カバレッジを意識した効果的なテスト設計例
@UnitTest
class PriceCalculatorTest {

    private PriceCalculator calculator = new PriceCalculator();

    // 正常系: すべての割引パターンをカバー
    @ParameterizedTest
    @CsvSource({
        "REGULAR, 10000, 10000",    // 割引なし
        "SILVER,  10000,  9500",    // 5% 割引
        "GOLD,    10000,  9000",    // 10% 割引
        "PLATINUM,10000,  8500"     // 15% 割引
    })
    void 会員ランクに応じた割引計算(
            MemberRank rank, int price, int expected) {
        assertEquals(expected,
            calculator.calculatePrice(rank, price));
    }

    // 境界値テスト
    @Test
    void 割引適用の最低金額は1000円() {
        // 999円以下は割引なし
        assertEquals(999,
            calculator.calculatePrice(MemberRank.GOLD, 999));
        // 1000円から割引適用
        assertEquals(900,
            calculator.calculatePrice(MemberRank.GOLD, 1000));
    }

    // 異常系
    @Test
    void 負の金額で例外をスロー() {
        assertThrows(IllegalArgumentException.class,
            () -> calculator.calculatePrice(MemberRank.REGULAR, -1));
    }

    @Test
    void nullランクで例外をスロー() {
        assertThrows(NullPointerException.class,
            () -> calculator.calculatePrice(null, 1000));
    }
}`,
      },
      {
        title: "TDD / BDD",
        content:
          "TDD（テスト駆動開発）は「テストを先に書いてからプロダクションコードを実装する」手法で、Red（失敗するテスト作成）→ Green（テストを通す最小実装）→ Refactor（リファクタリング）のサイクルを繰り返します。BDD（振る舞い駆動開発）はGiven-When-Then形式でテストを記述し、ビジネス要件に近い形でテストを表現します。Spring Bootプロジェクトでは、Service層の開発にTDDを適用し、受け入れテストにBDDスタイルを採用する組み合わせが効果的です。",
        code: `// ====== TDD の実践例 ======
// Step 1: Red - 失敗するテストを書く
@UnitTest
class ShoppingCartTest {

    private ShoppingCart cart;

    @BeforeEach
    void setUp() {
        cart = new ShoppingCart();
    }

    // Red: まず失敗するテストを書く
    @Test
    void 空のカートの合計は0円() {
        assertEquals(BigDecimal.ZERO, cart.getTotal());
    }

    @Test
    void 商品を1つ追加すると合計が更新される() {
        cart.addItem(new CartItem("りんご", new BigDecimal("150"), 1));
        assertEquals(new BigDecimal("150"), cart.getTotal());
    }

    @Test
    void 同じ商品を複数追加すると数量が増える() {
        cart.addItem(new CartItem("りんご", new BigDecimal("150"), 1));
        cart.addItem(new CartItem("りんご", new BigDecimal("150"), 2));
        assertEquals(3, cart.getItemQuantity("りんご"));
        assertEquals(new BigDecimal("450"), cart.getTotal());
    }

    @Test
    void 合計が5000円以上で送料無料() {
        cart.addItem(new CartItem("商品A", new BigDecimal("5000"), 1));
        assertEquals(BigDecimal.ZERO, cart.getShippingFee());
    }

    @Test
    void 合計が5000円未満は送料500円() {
        cart.addItem(new CartItem("商品A", new BigDecimal("4999"), 1));
        assertEquals(new BigDecimal("500"), cart.getShippingFee());
    }
}

// ====== BDD スタイルのテスト ======
// AssertJを使ったGiven-When-Then形式
@UnitTest
class OrderProcessBDDTest {

    @Mock
    private OrderRepository orderRepository;
    @Mock
    private InventoryService inventoryService;
    @InjectMocks
    private OrderService orderService;

    @Test
    @DisplayName("在庫がある場合、注文が正常に作成される")
    void shouldCreateOrderWhenItemIsInStock() {
        // Given（前提条件）
        String itemCode = "ITEM-001";
        int quantity = 3;
        when(inventoryService.isAvailable(itemCode, quantity))
            .thenReturn(true);
        when(orderRepository.save(any()))
            .thenAnswer(inv -> {
                Order o = inv.getArgument(0);
                o.setId(1L);
                return o;
            });

        // When（実行）
        Order result = orderService.createOrder(itemCode, quantity);

        // Then（検証）
        assertThat(result)
            .isNotNull()
            .satisfies(order -> {
                assertThat(order.getId()).isEqualTo(1L);
                assertThat(order.getItemCode()).isEqualTo(itemCode);
                assertThat(order.getQuantity()).isEqualTo(quantity);
                assertThat(order.getStatus()).isEqualTo(OrderStatus.CREATED);
            });
        verify(inventoryService).decreaseStock(itemCode, quantity);
    }
}`,
      },
      {
        title: "CI/CD でのテスト自動化",
        content:
          "CI/CDパイプラインにテストを組み込むことで、コードの品質を継続的に保証できます。プルリクエスト時に単体テストと統合テストを実行し、mainブランチへのマージ後にE2Eテストと性能テストを実行する構成が一般的です。テスト結果のレポートをアーティファクトとして保存し、カバレッジレポートをPRにコメントとして投稿する自動化も有効です。テストの並列実行やキャッシュの活用でCI時間を短縮することも重要です。",
        code: `/*
 * .github/workflows/ci.yml - 多段テストパイプライン
 *
 * name: CI Pipeline
 *
 * on:
 *   pull_request:
 *     branches: [main, develop]
 *   push:
 *     branches: [main]
 *
 * jobs:
 *   # Stage 1: 単体テスト（高速）
 *   unit-test:
 *     runs-on: ubuntu-latest
 *     steps:
 *       - uses: actions/checkout@v4
 *       - uses: actions/setup-java@v4
 *         with:
 *           java-version: '21'
 *           distribution: 'temurin'
 *           cache: gradle
 *       - name: Run unit tests
 *         run: ./gradlew test -PincludeTags=unit
 *       - name: Upload coverage
 *         uses: actions/upload-artifact@v4
 *         with:
 *           name: coverage-report
 *           path: build/reports/jacoco/
 *
 *   # Stage 2: 統合テスト（Docker必要）
 *   integration-test:
 *     runs-on: ubuntu-latest
 *     needs: unit-test
 *     steps:
 *       - uses: actions/checkout@v4
 *       - uses: actions/setup-java@v4
 *         with:
 *           java-version: '21'
 *           distribution: 'temurin'
 *           cache: gradle
 *       - name: Run integration tests
 *         run: ./gradlew integrationTest
 *
 *   # Stage 3: E2Eテスト（mainブランチのみ）
 *   e2e-test:
 *     if: github.ref == 'refs/heads/main'
 *     runs-on: ubuntu-latest
 *     needs: integration-test
 *     steps:
 *       - uses: actions/checkout@v4
 *       - name: Run E2E tests
 *         run: ./gradlew e2eTest
 */

/*
 * build.gradle - テスト並列実行の設定
 *
 * test {
 *     useJUnitPlatform()
 *
 *     // テストを並列実行
 *     maxParallelForks = Runtime.runtime.availableProcessors().intdiv(2) ?: 1
 *
 *     // フォークごとのメモリ設定
 *     forkEvery = 100
 *     maxHeapSize = '1g'
 *
 *     // テスト結果のレポート
 *     reports {
 *         junitXml.required = true
 *         html.required = true
 *     }
 *
 *     // 失敗時にスタックトレースを表示
 *     testLogging {
 *         events 'passed', 'skipped', 'failed'
 *         exceptionFormat 'full'
 *         showStandardStreams = false
 *     }
 *
 *     // テスト完了後にカバレッジレポートを生成
 *     finalizedBy jacocoTestReport
 * }
 */

// テスト設定クラス: プロファイルごとのテスト構成
@TestConfiguration
class TestConfig {

    @Bean
    @Profile("ci")
    public DataSource ciDataSource() {
        // CI環境用のデータソース設定
        return DataSourceBuilder.create()
            .url("jdbc:h2:mem:cidb;MODE=PostgreSQL")
            .driverClassName("org.h2.Driver")
            .build();
    }

    @Bean
    @Profile("ci")
    public TestRestTemplate testRestTemplate() {
        return new TestRestTemplate(
            new RestTemplateBuilder()
                .rootUri("http://localhost:8080")
                .setConnectTimeout(Duration.ofSeconds(5))
                .setReadTimeout(Duration.ofSeconds(10))
        );
    }
}`,
      },
    ],
  },
];

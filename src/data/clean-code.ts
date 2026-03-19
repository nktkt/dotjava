export interface CleanCodeSection {
  title: string;
  content: string;
  code?: string;
}

export interface CleanCodeChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: CleanCodeSection[];
}

export const cleanCodeCategories = [
  { id: "naming", name: "命名・可読性", color: "#2563EB" },
  { id: "design", name: "設計原則", color: "#059669" },
  { id: "refactoring", name: "リファクタリング", color: "#DC2626" },
  { id: "practice", name: "実践", color: "#D97706" },
] as const;

export const cleanCodeChapters: CleanCodeChapter[] = [
  // ===== 命名・可読性 (naming) =====
  {
    id: "naming-conventions",
    title: "命名規則",
    category: "naming",
    description:
      "Javaにおける命名規則を理解し、意図が伝わるコードを書くための基礎を学ぶ",
    sections: [
      {
        title: "クラス名は名詞にする",
        content:
          "クラスはオブジェクトの「もの」を表すため、名詞または名詞句で命名します。動詞や曖昧な名前は避け、そのクラスが何を表現しているかを明確にしましょう。PascalCase（先頭大文字）を使い、略語は避けます。適切な命名はコードを読む人への最大のドキュメントです。",
        code: `// ❌ 悪い例: 曖昧・動詞的なクラス名
class Data { }
class Process { }
class Manage { }
class Info { }

// ✅ 良い例: 具体的な名詞のクラス名
class Customer { }
class OrderRepository { }
class PaymentService { }
class InvoiceValidator { }
class ShippingAddress { }

// ✅ 良い例: ドメインを反映した具体的な命名
class TaxCalculator { }
class EmailNotificationSender { }
class InventoryStockChecker { }`,
      },
      {
        title: "メソッド名は動詞にする",
        content:
          "メソッドは「振る舞い」を表すため、動詞または動詞句で命名します。何をするメソッドなのかが名前だけで分かるようにしましょう。boolean を返すメソッドには is/has/can などのプレフィックスを付けると意図が明確になります。get/set は JavaBeans 規約に従い、ファクトリメソッドには of/from/create を使います。",
        code: `// ❌ 悪い例: 意図が不明なメソッド名
public int calc(int a, int b) { return a + b; }
public boolean check(Order order) { return order != null; }
public List<User> data() { return users; }

// ✅ 良い例: 動詞で始まる明確なメソッド名
public int calculateTotalPrice(List<Item> items) {
    return items.stream()
            .mapToInt(Item::getPrice)
            .sum();
}

public boolean isEligibleForDiscount(Order order) {
    return order != null && order.getTotalAmount() >= 10000;
}

public List<User> findActiveUsers() {
    return users.stream()
            .filter(User::isActive)
            .toList();
}

// ✅ ファクトリメソッドの命名
public static Money of(int amount, Currency currency) {
    return new Money(amount, currency);
}`,
      },
      {
        title: "変数名の付け方",
        content:
          "変数名はその値が何を表しているかを説明する名前にします。1文字の変数名（i, j を除く）や型名をそのまま使った名前は避けましょう。スコープが狭い変数は短く、スコープが広い変数はより説明的な名前にするのが基本です。コレクション変数は複数形にして内容を明示します。",
        code: `// ❌ 悪い例: 意味のない変数名
int d; // 経過日数？距離？
String s; // 何の文字列？
List<String> list; // 何のリスト？
Map<String, Object> map; // 何のマップ？
boolean flag; // 何のフラグ？

// ✅ 良い例: 意図が伝わる変数名
int elapsedDays;
String customerName;
List<String> activeUserEmails;
Map<String, BigDecimal> productPriceMap;
boolean isVerified;

// ✅ ループ変数もできるだけ意味を持たせる
// ❌
for (int i = 0; i < users.size(); i++) { ... }

// ✅
for (User user : users) {
    sendNotification(user);
}
// または
users.forEach(this::sendNotification);`,
      },
      {
        title: "定数・パッケージの命名",
        content:
          "定数は UPPER_SNAKE_CASE で記述し、マジックナンバーやマジックストリングを排除します。パッケージ名は小文字のみで、ドメインの逆順から始めます。enum 定数も UPPER_SNAKE_CASE が標準です。定数名はその値が「なぜその値なのか」を表現するようにしましょう。",
        code: `// ❌ 悪い例: マジックナンバー・曖昧な定数名
if (age >= 18) { ... }
if (status.equals("A")) { ... }
private static final int NUM = 3;

// ✅ 良い例: 意味のある定数名
private static final int LEGAL_VOTING_AGE = 18;
private static final int MAX_LOGIN_ATTEMPTS = 3;
private static final String DEFAULT_CHARSET = "UTF-8";
private static final Duration SESSION_TIMEOUT = Duration.ofMinutes(30);

// ✅ enum で状態を表現する
public enum OrderStatus {
    PENDING,        // 保留中
    CONFIRMED,      // 確認済み
    SHIPPED,        // 発送済み
    DELIVERED,      // 配達完了
    CANCELLED       // キャンセル
}

// ✅ パッケージ名の規約
// com.example.myapp.domain.model
// com.example.myapp.application.service
// com.example.myapp.infrastructure.repository`,
      },
      {
        title: "悪い命名の例と改善",
        content:
          "命名のアンチパターンを知ることで、より良い名前を付けられるようになります。略語の乱用、型名の繰り返し、否定形のboolean、紛らわしい名前は可読性を大きく下げます。コードレビューで最も指摘が多いのは命名に関する問題です。名前を変えるだけでコメントが不要になることも多くあります。",
        code: `// ❌ 悪い例と ✅ 改善例

// 1. 略語の乱用
// ❌ String custNm;     → ✅ String customerName;
// ❌ int calcAmtInclTax; → ✅ int totalAmountWithTax;
// ❌ UserDto usrDto;     → ✅ UserDto userDto;

// 2. 否定形のboolean（二重否定が発生しやすい）
// ❌ boolean isNotEmpty → ✅ boolean isEmpty (反転して使う)
// ❌ boolean disableFlag → ✅ boolean isEnabled
// ❌ if (!isNotValid())  → ✅ if (isValid())

// 3. 型名の繰り返し
// ❌ String nameString;  → ✅ String name;
// ❌ List<User> userList; → ✅ List<User> users;

// 4. 総合改善例
// ❌ Before
public class Util {
    public static boolean chk(String s, int n) {
        return s != null && s.length() <= n;
    }
}

// ✅ After
public class InputValidator {
    public static boolean isWithinMaxLength(String input,
                                            int maxLength) {
        return input != null && input.length() <= maxLength;
    }
}`,
      },
    ],
  },
  {
    id: "readability",
    title: "可読性の高いコード",
    category: "naming",
    description:
      "読みやすく保守しやすいコードを書くためのテクニックを学ぶ",
    sections: [
      {
        title: "メソッドの長さを短く保つ",
        content:
          "1つのメソッドは1つのことだけを行うべきです。20行を超えるメソッドは分割を検討しましょう。メソッドが長くなる原因は、複数の責務を1つのメソッドに詰め込んでいることがほとんどです。適切な粒度に分割することで、テストもしやすくなり、再利用性も向上します。",
        code: `// ❌ 悪い例: 1つのメソッドに複数の責務
public void processOrder(Order order) {
    // バリデーション (責務1)
    if (order.getItems().isEmpty()) throw new IllegalArgumentException();
    if (order.getCustomer() == null) throw new IllegalArgumentException();
    // 合計計算 (責務2)
    int total = 0;
    for (var item : order.getItems()) { total += item.getPrice(); }
    // 割引適用 (責務3)
    if (total >= 10000) { total = (int)(total * 0.9); }
    // DB保存 (責務4)
    repository.save(order);
    // メール送信 (責務5)
    emailService.send(order.getCustomer().getEmail(), "注文確定");
}

// ✅ 良い例: 責務ごとにメソッドを分割
public void processOrder(Order order) {
    validateOrder(order);
    int total = calculateTotal(order);
    total = applyDiscount(total);
    repository.save(order);
    notifyCustomer(order);
}

private void validateOrder(Order order) {
    Objects.requireNonNull(order.getCustomer(), "顧客が未設定です");
    if (order.getItems().isEmpty()) {
        throw new IllegalArgumentException("注文明細が空です");
    }
}`,
      },
      {
        title: "早期リターンとガード節",
        content:
          "メソッドの先頭で異常系・境界条件をチェックし、早期に return する「ガード節」パターンを使いましょう。これにより正常系のロジックがネストの浅い位置に来て、読みやすくなります。else を使わずに済むケースが多くなり、メソッドの見通しが格段に良くなります。",
        code: `// ❌ 悪い例: ネストが深い条件分岐
public String getDiscountLabel(Customer customer) {
    String label = "";
    if (customer != null) {
        if (customer.isActive()) {
            if (customer.getPurchaseCount() >= 10) {
                label = "ゴールド会員割引";
            } else if (customer.getPurchaseCount() >= 5) {
                label = "シルバー会員割引";
            } else {
                label = "通常会員";
            }
        } else {
            label = "無効な会員";
        }
    } else {
        label = "不明";
    }
    return label;
}

// ✅ 良い例: ガード節で早期リターン
public String getDiscountLabel(Customer customer) {
    if (customer == null) return "不明";
    if (!customer.isActive()) return "無効な会員";
    if (customer.getPurchaseCount() >= 10) return "ゴールド会員割引";
    if (customer.getPurchaseCount() >= 5) return "シルバー会員割引";
    return "通常会員";
}`,
      },
      {
        title: "ネストの削減",
        content:
          "ネストが深くなると認知的な負荷が高まり、バグが発生しやすくなります。ネスト3段以上は要注意です。ガード節、Stream API、メソッド抽出、Map の活用などでネストを浅くできます。条件を反転させて早期に抜けるテクニックを習得しましょう。",
        code: `// ❌ 悪い例: ネストが深い処理
public List<String> getEligibleEmails(List<User> users) {
    List<String> emails = new ArrayList<>();
    for (User user : users) {
        if (user != null) {
            if (user.isActive()) {
                if (user.getEmail() != null) {
                    if (user.getEmail().contains("@")) {
                        emails.add(user.getEmail());
                    }
                }
            }
        }
    }
    return emails;
}

// ✅ 良い例: Stream APIでフラットに
public List<String> getEligibleEmails(List<User> users) {
    return users.stream()
            .filter(Objects::nonNull)
            .filter(User::isActive)
            .map(User::getEmail)
            .filter(Objects::nonNull)
            .filter(email -> email.contains("@"))
            .toList();
}`,
      },
      {
        title: "コメントの書き方",
        content:
          "最良のコメントは「コード自体が説明的であること」で不要にできるコメントです。WHY（なぜそうしたか）を書き、WHAT（何をしているか）は避けましょう。Javadoc は public API に必ず付けます。TODO/FIXME は一時的なものとして定期的に整理し、放置しないようにします。",
        code: `// ❌ 悪い例: コードを日本語に訳しただけのコメント
// ユーザーを取得する
User user = userRepository.findById(id);
// nullチェック
if (user == null) {
    // 例外をスローする
    throw new NotFoundException("ユーザーが見つかりません");
}
// 年齢に1を足す
user.setAge(user.getAge() + 1);

// ✅ 良い例: WHYを説明するコメント
// 消費税法改正(2024年)に対応し、軽減税率対象かで税率を分岐
BigDecimal taxRate = item.isReducedTaxTarget()
        ? REDUCED_TAX_RATE
        : STANDARD_TAX_RATE;

/**
 * 注文の合計金額を計算する。
 * <p>税込価格は四捨五入で端数処理を行う（経理部の要件に準拠）。</p>
 *
 * @param items 注文明細のリスト（空リスト不可）
 * @return 税込合計金額
 * @throws IllegalArgumentException 明細が空の場合
 */
public BigDecimal calculateTotal(List<OrderItem> items) {
    // ...
}`,
      },
      {
        title: "フォーマットとコーディング規約",
        content:
          "チーム全体で統一されたフォーマットを使うことで、差分ノイズが減りコードレビューに集中できます。Google Java Style Guide や標準的なフォーマッタを導入しましょう。インデントはスペース4つ、行の長さは100〜120文字が一般的です。IDEの自動フォーマット機能を活用し、手動で整形する手間を省きましょう。",
        code: `// ❌ 悪い例: 一貫性のないフォーマット
public class OrderService{
  private final OrderRepository repo;
    public OrderService(OrderRepository repo){this.repo=repo;}
public Order findById(long id){
        return repo.findById(id).orElseThrow(()->new NotFoundException("ID: "+id));
    }
  }

// ✅ 良い例: 統一されたフォーマット
public class OrderService {

    private final OrderRepository repo;

    public OrderService(OrderRepository repo) {
        this.repo = repo;
    }

    public Order findById(long id) {
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        "注文が見つかりません: ID=" + id));
    }
}

// ✅ メソッドチェーンの改行ルール
List<String> result = items.stream()
        .filter(item -> item.getPrice() > 0)
        .map(Item::getName)
        .sorted()
        .toList();`,
      },
    ],
  },

  // ===== 設計原則 (design) =====
  {
    id: "solid-principles",
    title: "SOLID原則",
    category: "design",
    description:
      "オブジェクト指向設計の5つの基本原則を理解し、変更に強いコードを書く",
    sections: [
      {
        title: "SRP — 単一責任の原則",
        content:
          "Single Responsibility Principleは「クラスを変更する理由は1つだけであるべき」という原則です。1つのクラスが複数の責務を持つと、ある変更が無関係な機能にまで影響を及ぼします。責務ごとにクラスを分離することで、変更の影響範囲を最小限に抑えられます。",
        code: `// ❌ Before: 1クラスに複数の責務
public class Employee {
    private String name;
    private BigDecimal salary;

    public BigDecimal calculatePay() {
        // 給与計算ロジック（経理部の要件）
        return salary.multiply(BigDecimal.valueOf(1.1));
    }

    public String generateReport() {
        // レポート生成（人事部の要件）
        return name + ": " + salary;
    }

    public void saveToDatabase() {
        // DB永続化（技術部の要件）
        // JDBC処理...
    }
}

// ✅ After: 責務ごとにクラスを分離
public record Employee(String name, BigDecimal salary) {}

public class PayCalculator {
    public BigDecimal calculatePay(Employee emp) {
        return emp.salary().multiply(BigDecimal.valueOf(1.1));
    }
}

public class EmployeeReportGenerator {
    public String generate(Employee emp) {
        return emp.name() + ": " + emp.salary();
    }
}

public class EmployeeRepository {
    public void save(Employee emp) { /* DB保存 */ }
}`,
      },
      {
        title: "OCP — 開放閉鎖の原則",
        content:
          "Open/Closed Principleは「拡張に対して開き、修正に対して閉じるべき」という原則です。新しい機能を追加するときに既存のコードを修正するのではなく、新しいコードを追加するだけで対応できるように設計します。インターフェースやポリモーフィズムを活用するのが定石です。",
        code: `// ❌ Before: 新しい割引を追加するたびに修正が必要
public class DiscountCalculator {
    public BigDecimal calculate(Order order, String type) {
        return switch (type) {
            case "MEMBER" -> order.getTotal()
                    .multiply(BigDecimal.valueOf(0.1));
            case "SEASONAL" -> order.getTotal()
                    .multiply(BigDecimal.valueOf(0.15));
            // 新しい割引追加のたびにここを修正...
            default -> BigDecimal.ZERO;
        };
    }
}

// ✅ After: 新しい割引はクラスを追加するだけ
public sealed interface DiscountPolicy
        permits MemberDiscount, SeasonalDiscount, CouponDiscount {
    BigDecimal calculate(Order order);
}

public record MemberDiscount(int memberYears) implements DiscountPolicy {
    public BigDecimal calculate(Order order) {
        var rate = memberYears >= 3 ? 0.15 : 0.10;
        return order.getTotal().multiply(BigDecimal.valueOf(rate));
    }
}

public record SeasonalDiscount(String season) implements DiscountPolicy {
    public BigDecimal calculate(Order order) {
        return order.getTotal().multiply(BigDecimal.valueOf(0.15));
    }
}

// 新しい割引を追加: 既存コードの修正不要!
public record CouponDiscount(String code, double rate)
        implements DiscountPolicy {
    public BigDecimal calculate(Order order) {
        return order.getTotal().multiply(BigDecimal.valueOf(rate));
    }
}`,
      },
      {
        title: "LSP — リスコフの置換原則",
        content:
          "Liskov Substitution Principleは「派生クラスは基底クラスと置き換え可能でなければならない」という原則です。サブクラスがスーパークラスの契約（事前条件・事後条件）を破ると、呼び出し側で予期しない動作が発生します。「正方形は長方形の一種」のような直感的だが誤った継承は避けるべきです。",
        code: `// ❌ Before: LSP違反 — 子クラスが親の契約を破る
public class Rectangle {
    protected int width, height;
    public void setWidth(int w)  { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int area() { return width * height; }
}

public class Square extends Rectangle {
    @Override
    public void setWidth(int w) {
        this.width = w;
        this.height = w; // 予期しない副作用!
    }
    @Override
    public void setHeight(int h) {
        this.width = h;  // 予期しない副作用!
        this.height = h;
    }
}
// rect.setWidth(5); rect.setHeight(3);
// Rectangleなら15、Squareなら9 → 振る舞いが変わる!

// ✅ After: 共通インターフェースで安全に設計
public sealed interface Shape permits Rectangle, Square {
    int area();
}

public record Rectangle(int width, int height) implements Shape {
    public int area() { return width * height; }
}

public record Square(int side) implements Shape {
    public int area() { return side * side; }
}

// 不変オブジェクトなので副作用の心配がない
Shape rect = new Rectangle(5, 3); // area() = 15
Shape sq   = new Square(5);       // area() = 25`,
      },
      {
        title: "ISP — インターフェース分離の原則",
        content:
          "Interface Segregation Principleは「クライアントが使わないメソッドに依存すべきでない」という原則です。巨大なインターフェースを小さな役割ごとに分割することで、実装クラスが不要なメソッドを持たなくて済みます。「太った」インターフェースはメンテナンスの負担を増大させます。",
        code: `// ❌ Before: 巨大な万能インターフェース
public interface SmartDevice {
    void print(Document doc);
    void scan(Document doc);
    void fax(Document doc);
    void photocopy(Document doc);
}

// シンプルなプリンタでも全メソッドの実装を強制される
public class SimplePrinter implements SmartDevice {
    public void print(Document doc) { /* 実装 */ }
    public void scan(Document doc) {
        throw new UnsupportedOperationException(); // ❌
    }
    public void fax(Document doc) {
        throw new UnsupportedOperationException(); // ❌
    }
    public void photocopy(Document doc) {
        throw new UnsupportedOperationException(); // ❌
    }
}

// ✅ After: 役割ごとにインターフェースを分離
public interface Printable   { void print(Document doc); }
public interface Scannable   { void scan(Document doc); }
public interface Faxable     { void fax(Document doc); }

public class SimplePrinter implements Printable {
    public void print(Document doc) { /* 印刷処理 */ }
}

public class MultiFunctionPrinter
        implements Printable, Scannable, Faxable {
    public void print(Document doc) { /* 印刷 */ }
    public void scan(Document doc)  { /* スキャン */ }
    public void fax(Document doc)   { /* FAX送信 */ }
}`,
      },
      {
        title: "DIP — 依存性逆転の原則",
        content:
          "Dependency Inversion Principleは「上位モジュールは下位モジュールに依存すべきでなく、両者とも抽象に依存すべき」という原則です。具体的なクラスに直接依存すると、実装の変更がシステム全体に波及します。インターフェースを介して依存することで、実装の差し替えやテストが容易になります。",
        code: `// ❌ Before: 上位が具体的な下位クラスに直接依存
public class OrderService {
    private final MySqlOrderRepository repository;
    private final SmtpEmailSender emailSender;

    public OrderService() {
        this.repository = new MySqlOrderRepository(); // 具体クラス
        this.emailSender = new SmtpEmailSender();     // 具体クラス
    }

    public void placeOrder(Order order) {
        repository.save(order);
        emailSender.send(order.getCustomerEmail(), "注文確定");
    }
}

// ✅ After: 抽象（インターフェース）に依存
public interface OrderRepository {
    void save(Order order);
    Optional<Order> findById(long id);
}

public interface NotificationSender {
    void send(String to, String message);
}

public class OrderService {
    private final OrderRepository repository;
    private final NotificationSender notifier;

    // コンストラクタインジェクション
    public OrderService(OrderRepository repository,
                        NotificationSender notifier) {
        this.repository = repository;
        this.notifier = notifier;
    }

    public void placeOrder(Order order) {
        repository.save(order);
        notifier.send(order.getCustomerEmail(), "注文確定");
    }
}
// テスト時はモックに差し替え可能`,
      },
    ],
  },
  {
    id: "dry-kiss-yagni",
    title: "DRY・KISS・YAGNI",
    category: "design",
    description:
      "コードのシンプルさと重複排除のバランスを取るための原則を学ぶ",
    sections: [
      {
        title: "DRY — Don't Repeat Yourself",
        content:
          "DRY原則は「すべての知識はシステム内で一意で曖昧さのない表現を持つべきだ」という考え方です。コピー&ペーストで同じロジックが複数箇所に存在すると、修正漏れやバグの温床になります。ただし、見た目が似ているだけで本質的に異なるロジックまで無理に共通化するのは逆効果です。",
        code: `// ❌ Before: 同じバリデーションロジックが重複
public class UserService {
    public void createUser(String email, String name) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("無効なメール");
        }
        // 作成処理...
    }

    public void updateEmail(long userId, String email) {
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("無効なメール");
        }
        // 更新処理...
    }
}

// ✅ After: バリデーションロジックを共通化
public record Email(String value) {
    public Email {
        if (value == null || !value.contains("@")) {
            throw new IllegalArgumentException(
                    "無効なメールアドレス: " + value);
        }
    }
}

public class UserService {
    public void createUser(Email email, String name) {
        // Emailオブジェクト生成時に検証済み
    }

    public void updateEmail(long userId, Email email) {
        // Emailオブジェクト生成時に検証済み
    }
}`,
      },
      {
        title: "KISS — Keep It Simple, Stupid",
        content:
          "KISS原則は「できる限りシンプルに保て」という考え方です。複雑なコードは理解に時間がかかり、バグが入りやすく、保守コストが高くなります。高度なテクニックを使うこと自体が目的になっていないか常に自問しましょう。シンプルなコードは読みやすく、テストしやすく、変更もしやすいのです。",
        code: `// ❌ Before: 不必要に複雑な実装
public <T extends Comparable<T>> Optional<T> findMax(
        Collection<T> items,
        Predicate<? super T> filter,
        Function<? super T, ? extends T> mapper) {
    return items.stream()
            .filter(filter)
            .map(mapper)
            .reduce((a, b) -> a.compareTo(b) >= 0 ? a : b);
}

// 呼び出し側も複雑に…
Optional<Integer> max = findMax(
    numbers,
    n -> n > 0,
    Function.identity()
);

// ✅ After: 必要十分なシンプルな実装
public int findMaxPositive(List<Integer> numbers) {
    return numbers.stream()
            .filter(n -> n > 0)
            .max(Integer::compareTo)
            .orElse(0);
}

// 呼び出し側も明快
int max = findMaxPositive(numbers);`,
      },
      {
        title: "YAGNI — You Aren't Gonna Need It",
        content:
          "YAGNI原則は「今必要でない機能は作るな」という考え方です。将来必要になるかもしれない機能を先回りして実装すると、コードが複雑になり、保守コストが増えます。実際には使われない機能のために貴重な開発時間を費やすことになりかねません。必要になった時点で実装するのが最善です。",
        code: `// ❌ Before: まだ不要な汎用フレームワークを作ってしまう
public abstract class AbstractBaseRepository<T, ID> {
    abstract T findById(ID id);
    abstract List<T> findAll();
    abstract List<T> findByCondition(Map<String, Object> params);
    abstract T save(T entity);
    abstract void delete(ID id);
    abstract void deleteAll();
    abstract long count();
    abstract boolean exists(ID id);
    abstract List<T> findWithPagination(int page, int size);
    abstract List<T> findWithSorting(String field, String dir);
    // 今必要なのは save と findById だけなのに...
}

// ✅ After: 今必要な機能だけを実装
public class UserRepository {
    private final JdbcTemplate jdbc;

    public UserRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void save(User user) {
        jdbc.update("INSERT INTO users ...", user.name());
    }

    public Optional<User> findById(long id) {
        return jdbc.queryForOptional(
                "SELECT * FROM users WHERE id = ?", id);
    }
    // 他のメソッドは必要になった時に追加する
}`,
      },
      {
        title: "過度な抽象化の弊害",
        content:
          "DRY原則を過剰に適用すると、かえってコードが理解しにくくなります。見た目が似ているだけで意味が異なるロジックを無理に共通化すると、条件分岐やパラメータが増えて複雑化します。「Wrong Abstraction（間違った抽象化）」は重複よりも危険です。共通化の判断は3回同じコードが現れてからでも遅くありません。",
        code: `// ❌ Before: 無理な共通化で複雑に
public String formatOutput(Object data, String type,
                           boolean includeHeader,
                           boolean useComma,
                           String dateFormat) {
    var sb = new StringBuilder();
    if (includeHeader && type.equals("CSV")) {
        sb.append("name,age,date\\n");
    } else if (includeHeader && type.equals("TSV")) {
        sb.append("name\\tage\\tdate\\n");
    }
    // type分岐がどんどん増えて制御不能に...
    return sb.toString();
}

// ✅ After: 別の関心事は別のクラスに
public class CsvExporter {
    public String export(List<Employee> employees) {
        var sb = new StringBuilder("name,age,joinDate\\n");
        for (var emp : employees) {
            sb.append("%s,%d,%s%n".formatted(
                    emp.name(), emp.age(), emp.joinDate()));
        }
        return sb.toString();
    }
}

public class TsvExporter {
    public String export(List<Employee> employees) {
        var sb = new StringBuilder("name\\tage\\tjoinDate\\n");
        for (var emp : employees) {
            sb.append("%s\\t%d\\t%s%n".formatted(
                    emp.name(), emp.age(), emp.joinDate()));
        }
        return sb.toString();
    }
}
// 本当に共通化が必要なら後からリファクタリングすればよい`,
      },
      {
        title: "適切な複雑さの判断",
        content:
          "KISS・YAGNI・DRY は相互にトレードオフの関係にあります。重複を排除しすぎると複雑になり(KISSに反する)、シンプルにしすぎると重複が生まれます(DRYに反する)。チームの習熟度やプロジェクトのフェーズに応じて適切なバランスを見つけることが重要です。迷ったときは「最もシンプルな実装」を選び、必要に応じてリファクタリングしましょう。",
        code: `// 判断基準の例

// 1. 同じコードが3箇所以上 → 共通化を検討 (Rule of Three)
// 2. 変更理由が同じ → 共通化する
// 3. 変更理由が異なる → 分離したまま維持する

// ✅ 適切な判断の例
// ケース: UserValidator と OrderValidator で似た null チェック

// 共通化しない方がよい場合（変更理由が異なる）
public class UserValidator {
    public boolean isValid(User user) {
        return user != null
                && user.name() != null
                && user.email() != null;
    }
}

public class OrderValidator {
    public boolean isValid(Order order) {
        return order != null
                && order.items() != null
                && !order.items().isEmpty();
    }
}

// 共通化する場合（同じビジネスルール）
public record Money(BigDecimal amount, Currency currency) {
    public Money {
        Objects.requireNonNull(amount, "金額は必須です");
        Objects.requireNonNull(currency, "通貨は必須です");
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("金額は0以上");
        }
    }
}
// Money はどこで使っても同じルール → 共通化が正解`,
      },
    ],
  },
  {
    id: "immutability-design",
    title: "不変設計",
    category: "design",
    description:
      "不変オブジェクトを活用して安全で予測可能なコードを書く手法を学ぶ",
    sections: [
      {
        title: "不変オブジェクトの利点",
        content:
          "不変オブジェクト(Immutable Object)は一度生成されたら状態が変わらないオブジェクトです。スレッドセーフであり、副作用がなく、コードの予測可能性を高めます。Javaの String や BigDecimal も不変オブジェクトです。可変オブジェクトは状態の変化を追跡する必要があり、バグの原因になりやすいのです。",
        code: `// ❌ Before: 可変オブジェクト（どこで変更されるか追跡困難）
public class MutableUser {
    private String name;
    private String email;
    private int age;

    public void setName(String name)   { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setAge(int age)        { this.age = age; }
    // setter で外部からいつでも変更可能 → 予測困難
}

// ✅ After: 不変オブジェクト
public final class ImmutableUser {
    private final String name;
    private final String email;
    private final int age;

    public ImmutableUser(String name, String email, int age) {
        this.name = Objects.requireNonNull(name);
        this.email = Objects.requireNonNull(email);
        this.age = age;
    }

    public String name()  { return name; }
    public String email() { return email; }
    public int age()      { return age; }

    // 変更が必要な場合は新しいインスタンスを返す
    public ImmutableUser withEmail(String newEmail) {
        return new ImmutableUser(this.name, newEmail, this.age);
    }
}`,
      },
      {
        title: "record を活用した不変設計",
        content:
          "Java 16以降の record はイミュータブルなデータキャリアを簡潔に定義できます。フィールドは自動的に private final になり、コンストラクタ・アクセサ・equals・hashCode・toString が自動生成されます。コンパクトコンストラクタでバリデーションも記述でき、値オブジェクトの実装に最適です。",
        code: `// ❌ Before: ボイラープレートだらけの不変クラス
public final class Money {
    private final BigDecimal amount;
    private final String currency;

    public Money(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }
    public BigDecimal getAmount() { return amount; }
    public String getCurrency() { return currency; }
    @Override public boolean equals(Object o) { /* ... */ }
    @Override public int hashCode() { /* ... */ }
    @Override public String toString() { /* ... */ }
}

// ✅ After: record で簡潔に
public record Money(BigDecimal amount, String currency) {
    // コンパクトコンストラクタでバリデーション
    public Money {
        Objects.requireNonNull(amount, "金額は必須");
        Objects.requireNonNull(currency, "通貨は必須");
        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("金額は0以上");
        }
    }

    public Money add(Money other) {
        if (!this.currency.equals(other.currency)) {
            throw new IllegalArgumentException("通貨が異なります");
        }
        return new Money(this.amount.add(other.amount),
                         this.currency);
    }
}
// 使用例: var total = price.add(tax);`,
      },
      {
        title: "防御的コピー",
        content:
          "不変オブジェクトであっても、可変なフィールド（List, Date, 配列など）を持つ場合は防御的コピーが必要です。コンストラクタでの受け取り時とアクセサでの返却時の両方でコピーを行い、外部からの意図しない変更を防ぎます。Java のコレクションでは List.copyOf() や Collections.unmodifiableList() を活用しましょう。",
        code: `// ❌ Before: 可変コレクションをそのまま保持
public class Order {
    private final List<Item> items;

    public Order(List<Item> items) {
        this.items = items; // 外部の参照と共有!
    }

    public List<Item> getItems() {
        return items; // 外部から変更可能!
    }
}

// 問題の例
List<Item> items = new ArrayList<>();
items.add(new Item("商品A", 1000));
Order order = new Order(items);
items.add(new Item("商品B", 2000)); // Orderの中身まで変わる!

// ✅ After: 防御的コピーで安全に
public class Order {
    private final List<Item> items;

    public Order(List<Item> items) {
        this.items = List.copyOf(items); // 不変コピー
    }

    public List<Item> getItems() {
        return items; // List.copyOf の結果は不変
    }
}

// record + 防御的コピー
public record ShoppingCart(List<Item> items) {
    public ShoppingCart {
        items = List.copyOf(items); // コンパクトコンストラクタ内
    }
}`,
      },
      {
        title: "Builderパターン",
        content:
          "不変オブジェクトのコンストラクタの引数が多くなる場合、Builderパターンが有効です。可読性の高いメソッドチェーンでオブジェクトを組み立て、build() で不変オブジェクトを生成します。必須パラメータと任意パラメータを明確に分離でき、テレスコーピングコンストラクタの問題を解決します。",
        code: `// ❌ Before: 引数が多すぎるコンストラクタ
var config = new ServerConfig(
    "localhost", 8080, true, 100, 30, "/api", "v2",
    true, false, "UTF-8"
); // 何がどの引数なのか分からない

// ✅ After: Builderパターン
public record ServerConfig(
        String host, int port, boolean ssl,
        int maxConnections, int timeout,
        String contextPath, String apiVersion) {

    public static Builder builder(String host, int port) {
        return new Builder(host, port);
    }

    public static class Builder {
        private final String host;
        private final int port;
        private boolean ssl = false;
        private int maxConnections = 50;
        private int timeout = 30;
        private String contextPath = "/";
        private String apiVersion = "v1";

        private Builder(String host, int port) {
            this.host = host;
            this.port = port;
        }

        public Builder ssl(boolean ssl)
            { this.ssl = ssl; return this; }
        public Builder maxConnections(int n)
            { this.maxConnections = n; return this; }
        public Builder timeout(int sec)
            { this.timeout = sec; return this; }
        public Builder contextPath(String p)
            { this.contextPath = p; return this; }
        public Builder apiVersion(String v)
            { this.apiVersion = v; return this; }

        public ServerConfig build() {
            return new ServerConfig(host, port, ssl,
                maxConnections, timeout, contextPath, apiVersion);
        }
    }
}

// 使用例: 何がどの値か一目瞭然
var config = ServerConfig.builder("localhost", 8080)
        .ssl(true)
        .maxConnections(100)
        .contextPath("/api")
        .build();`,
      },
      {
        title: "Optional の活用",
        content:
          "Optional は「値が存在しないかもしれない」ことを型で表現する手段です。null を返す代わりに Optional を使うことで、NullPointerException を防ぎ、呼び出し側に null チェックを強制できます。ただし、フィールドやメソッド引数には使わず、戻り値のみに使うのが推奨です。Optional.of/ofNullable/empty を正しく使い分けましょう。",
        code: `// ❌ Before: null を返す設計
public User findByEmail(String email) {
    // 見つからない場合 null → 呼び出し側が忘れやすい
    return userMap.get(email); // null かもしれない
}

// 呼び出し側: NullPointerException のリスク
User user = findByEmail("test@example.com");
String name = user.getName(); // user が null なら NPE!

// ✅ After: Optional で null 安全に
public Optional<User> findByEmail(String email) {
    return Optional.ofNullable(userMap.get(email));
}

// 呼び出し側: 値の有無を明示的に処理
String name = findByEmail("test@example.com")
        .map(User::getName)
        .orElse("不明なユーザー");

// パターンマッチング的な使い方
findByEmail("test@example.com").ifPresentOrElse(
    user -> sendWelcomeEmail(user),
    () -> log.warn("ユーザーが見つかりません")
);

// ❌ やってはいけない Optional の使い方
// Optional をフィールドに使わない（Serializable でない）
// Optional.get() を安易に呼ばない
// Optional を引数に渡さない`,
      },
    ],
  },

  // ===== リファクタリング (refactoring) =====
  {
    id: "code-smells",
    title: "コードスメル",
    category: "refactoring",
    description:
      "リファクタリングが必要なコードの兆候（コードスメル）を見抜く力を養う",
    sections: [
      {
        title: "長いメソッド（Long Method）",
        content:
          "メソッドが長くなると理解が困難になり、テストも書きにくくなります。コメントで区切りを入れたくなったら、それは分割のサインです。各ブロックを説明的な名前のメソッドに抽出することで、コード自体がドキュメントになります。目安として1メソッド20行以内を心がけましょう。",
        code: `// ❌ コードスメル: 長いメソッド
public Invoice createInvoice(Order order) {
    // --- バリデーション ---
    if (order == null) throw new IllegalArgumentException();
    if (order.getItems().isEmpty()) throw new IllegalArgumentException();
    // ... バリデーション10行 ...

    // --- 小計計算 ---
    BigDecimal subtotal = BigDecimal.ZERO;
    for (var item : order.getItems()) {
        subtotal = subtotal.add(item.getPrice()
                .multiply(BigDecimal.valueOf(item.getQty())));
    }
    // --- 税計算 ---
    BigDecimal tax = subtotal.multiply(TAX_RATE);
    // --- 割引適用 ---
    // ... 20行の割引ロジック ...
    // --- 請求書生成 ---
    // ... 10行の生成処理 ...
    return invoice;
}

// ✅ リファクタリング後
public Invoice createInvoice(Order order) {
    validateOrder(order);
    BigDecimal subtotal = calculateSubtotal(order);
    BigDecimal tax = calculateTax(subtotal);
    BigDecimal discount = calculateDiscount(order, subtotal);
    return buildInvoice(order, subtotal, tax, discount);
}`,
      },
      {
        title: "巨大クラス（Large Class / God Class）",
        content:
          "1つのクラスがあまりにも多くの責務を持つ状態を「神クラス」と呼びます。フィールド数が多い、メソッド数が多い、異なる関心事のメソッドが混在している場合は要注意です。SRP（単一責任の原則）に違反しており、クラス抽出で責務を分離すべきです。1000行を超えるクラスは分割を検討しましょう。",
        code: `// ❌ コードスメル: 巨大クラス（責務が多すぎる）
public class UserManager {
    public void createUser() { /* ... */ }
    public void deleteUser() { /* ... */ }
    public void sendEmail() { /* ... */ }
    public void generateReport() { /* ... */ }
    public void calculateSalary() { /* ... */ }
    public void exportToCsv() { /* ... */ }
    public void validateInput() { /* ... */ }
    public void logAction() { /* ... */ }
    // 全部入りの神クラス...
}

// ✅ リファクタリング後: 責務ごとに分割
public class UserService {
    public void create(User user) { /* ... */ }
    public void delete(long userId) { /* ... */ }
}

public class UserNotificationService {
    public void sendWelcomeEmail(User user) { /* ... */ }
}

public class SalaryCalculator {
    public BigDecimal calculate(Employee emp) { /* ... */ }
}

public class UserReportExporter {
    public void exportToCsv(List<User> users) { /* ... */ }
}`,
      },
      {
        title: "プリミティブ執着（Primitive Obsession）",
        content:
          "String や int などのプリミティブ型で何でも表現してしまうアンチパターンです。メールアドレス、電話番号、金額などをただの String や int で扱うと、バリデーションが散在し、取り違えのバグも発生しやすくなります。値オブジェクト（Value Object）として専用の型を作ることで、型安全性とドメイン知識のカプセル化を実現できます。",
        code: `// ❌ コードスメル: プリミティブ型の乱用
public class Customer {
    private String name;
    private String email;        // バリデーションはどこ？
    private String phoneNumber;  // フォーマットは？
    private int age;             // 負の数もOK？
}

// メソッドの引数も紛らわしい
public void register(String name, String email, String phone) {
    // email と phone を間違えても型エラーにならない!
}

// ✅ リファクタリング後: 値オブジェクトを導入
public record Email(String value) {
    public Email {
        if (!value.matches("^[\\\\w.+-]+@[\\\\w-]+\\\\.[\\\\w.]+$")) {
            throw new IllegalArgumentException("無効: " + value);
        }
    }
}

public record PhoneNumber(String value) {
    public PhoneNumber {
        if (!value.matches("^0\\\\d{9,10}$")) {
            throw new IllegalArgumentException("無効: " + value);
        }
    }
}

public record Age(int value) {
    public Age {
        if (value < 0 || value > 150) {
            throw new IllegalArgumentException("無効: " + value);
        }
    }
}

// 引数の取り違えがコンパイルエラーになる
public void register(String name, Email email, PhoneNumber phone) {
    // 型で守られている
}`,
      },
      {
        title: "switch文の乱用",
        content:
          "同じ条件に対する switch 文がコードのあちこちに散在するのは、ポリモーフィズムの不足を示す典型的なスメルです。新しい分岐を追加するたびに全箇所を修正する必要があり、修正漏れのリスクが高まります。Java 17+ の sealed interface とパターンマッチングを活用すれば、コンパイラが網羅性を保証してくれます。",
        code: `// ❌ コードスメル: switch文が複数箇所に散在
public BigDecimal calculateShipping(String type, int weight) {
    return switch (type) {
        case "STANDARD" -> BigDecimal.valueOf(weight * 10);
        case "EXPRESS"  -> BigDecimal.valueOf(weight * 25);
        case "OVERNIGHT"-> BigDecimal.valueOf(weight * 50);
        default -> throw new IllegalArgumentException(type);
    };
}

public int estimateDeliveryDays(String type) {
    return switch (type) {
        case "STANDARD" -> 5;
        case "EXPRESS"  -> 2;
        case "OVERNIGHT"-> 1;
        default -> throw new IllegalArgumentException(type);
    };
    // 新しい配送タイプ追加で全switch修正が必要...
}

// ✅ リファクタリング後: ポリモーフィズムで解決
public sealed interface ShippingMethod
        permits Standard, Express, Overnight {
    BigDecimal calculateCost(int weight);
    int estimateDeliveryDays();
}

public record Standard() implements ShippingMethod {
    public BigDecimal calculateCost(int w)
        { return BigDecimal.valueOf(w * 10); }
    public int estimateDeliveryDays() { return 5; }
}

public record Express() implements ShippingMethod {
    public BigDecimal calculateCost(int w)
        { return BigDecimal.valueOf(w * 25); }
    public int estimateDeliveryDays() { return 2; }
}

public record Overnight() implements ShippingMethod {
    public BigDecimal calculateCost(int w)
        { return BigDecimal.valueOf(w * 50); }
    public int estimateDeliveryDays() { return 1; }
}`,
      },
      {
        title: "特性の横恋慕（Feature Envy）",
        content:
          "あるクラスのメソッドが、自分自身のデータよりも他のクラスのデータに頻繁にアクセスする場合、「特性の横恋慕」というスメルです。このようなメソッドは、アクセス先のクラスに移動すべきです。データとそれを操作するロジックは同じクラスにまとめるのがオブジェクト指向の基本です。",
        code: `// ❌ コードスメル: OrderPrinter が Order の内部を覗きすぎ
public class OrderPrinter {
    public String format(Order order) {
        // Order のデータばかり使っている → Feature Envy
        return "注文: " + order.getId()
            + " / 顧客: " + order.getCustomer().getName()
            + " / 合計: " + order.getItems().stream()
                .mapToInt(i -> i.getPrice() * i.getQuantity())
                .sum()
            + "円 / 送料: "
            + (order.getItems().stream()
                .mapToInt(i -> i.getPrice() * i.getQuantity())
                .sum() >= 5000 ? "無料" : "500円");
    }
}

// ✅ リファクタリング後: ロジックをデータの持ち主に移動
public class Order {
    private final long id;
    private final Customer customer;
    private final List<OrderItem> items;

    public int totalAmount() {
        return items.stream()
                .mapToInt(OrderItem::subtotal)
                .sum();
    }

    public boolean isFreeShipping() {
        return totalAmount() >= 5000;
    }

    public String summary() {
        return "注文: %d / 顧客: %s / 合計: %d円 / 送料: %s"
            .formatted(id, customer.getName(), totalAmount(),
                       isFreeShipping() ? "無料" : "500円");
    }
}`,
      },
    ],
  },
  {
    id: "refactoring-techniques",
    title: "リファクタリング手法",
    category: "refactoring",
    description:
      "Martin Fowler のリファクタリングカタログから主要な手法を学び、実践する",
    sections: [
      {
        title: "メソッド抽出（Extract Method）",
        content:
          "最も頻繁に使われるリファクタリング手法です。長いメソッドの一部を別のメソッドに切り出し、その処理を説明する名前を付けます。コメントを書きたくなった箇所は、そのコメントをメソッド名にして抽出するのが定石です。IDEのリファクタリング機能を使えば安全に実行できます。",
        code: `// ❌ Before: コメントで区切った長いメソッド
public void printReport(List<Employee> employees) {
    // ヘッダーを出力
    System.out.println("====== 社員レポート ======");
    System.out.println("出力日: " + LocalDate.now());
    System.out.println("========================");

    // 各社員の情報を出力
    for (var emp : employees) {
        System.out.printf("%s (%s) - %,d円%n",
            emp.name(), emp.department(), emp.salary());
    }

    // フッターに統計情報を出力
    int total = employees.stream()
            .mapToInt(Employee::salary).sum();
    double avg = employees.stream()
            .mapToInt(Employee::salary).average().orElse(0);
    System.out.printf("合計: %,d円 / 平均: %,.0f円%n", total, avg);
}

// ✅ After: メソッド抽出
public void printReport(List<Employee> employees) {
    printHeader();
    printEmployeeDetails(employees);
    printSalarySummary(employees);
}

private void printHeader() {
    System.out.println("====== 社員レポート ======");
    System.out.println("出力日: " + LocalDate.now());
    System.out.println("========================");
}

private void printEmployeeDetails(List<Employee> employees) {
    employees.forEach(emp ->
        System.out.printf("%s (%s) - %,d円%n",
            emp.name(), emp.department(), emp.salary()));
}

private void printSalarySummary(List<Employee> employees) {
    var stats = employees.stream()
            .mapToInt(Employee::salary).summaryStatistics();
    System.out.printf("合計: %,d円 / 平均: %,.0f円%n",
            stats.getSum(), stats.getAverage());
}`,
      },
      {
        title: "クラス抽出（Extract Class）",
        content:
          "1つのクラスが複数の関心事を持っている場合、関連するフィールドとメソッドをまとめて新しいクラスに抽出します。フィールドの一部が常にセットで使われている場合や、メソッドがフィールドの一部だけを使っている場合が抽出のサインです。責務が明確になり、テストもしやすくなります。",
        code: `// ❌ Before: 住所関連のフィールドが Customer に混在
public class Customer {
    private String name;
    private String email;
    private String zipCode;
    private String prefecture;
    private String city;
    private String street;
    private String building;

    public String getFullAddress() {
        return zipCode + " " + prefecture + city
                + street + " " + building;
    }
}

// ✅ After: 住所をクラスとして抽出
public record Address(
        String zipCode,
        String prefecture,
        String city,
        String street,
        String building) {

    public String full() {
        return "%s %s%s%s %s".formatted(
            zipCode, prefecture, city, street,
            building != null ? building : "");
    }
}

public class Customer {
    private final String name;
    private final String email;
    private final Address address;

    public Customer(String name, String email, Address address) {
        this.name = name;
        this.email = email;
        this.address = address;
    }

    public String getFullAddress() {
        return address.full();
    }
}`,
      },
      {
        title: "ポリモーフィズムによる条件分岐の置換",
        content:
          "型に基づく条件分岐（if-else や switch）が繰り返し現れる場合、ポリモーフィズムで置き換えることで、新しい型の追加時に既存コードを修正する必要がなくなります。Java 17+ の sealed interface を使えば、コンパイラが全ケースの網羅をチェックしてくれるため安全です。",
        code: `// ❌ Before: 型による条件分岐の繰り返し
public class PaymentProcessor {
    public void process(Payment payment) {
        if (payment.getType().equals("CREDIT_CARD")) {
            validateCard(payment);
            chargeCard(payment);
        } else if (payment.getType().equals("BANK_TRANSFER")) {
            validateBankAccount(payment);
            initiateTransfer(payment);
        } else if (payment.getType().equals("E_MONEY")) {
            validateEMoney(payment);
            deductBalance(payment);
        }
    }
    // 手数料計算にも同じ分岐が...
    // 返金処理にも同じ分岐が...
}

// ✅ After: ポリモーフィズムで統一
public sealed interface PaymentMethod {
    void validate();
    void execute(BigDecimal amount);
    BigDecimal calculateFee(BigDecimal amount);
}

public record CreditCard(String cardNumber, String expiry)
        implements PaymentMethod {
    public void validate() { /* カード検証 */ }
    public void execute(BigDecimal amount) { /* カード決済 */ }
    public BigDecimal calculateFee(BigDecimal amount) {
        return amount.multiply(BigDecimal.valueOf(0.03));
    }
}

public record BankTransfer(String bankCode, String accountNo)
        implements PaymentMethod {
    public void validate() { /* 口座検証 */ }
    public void execute(BigDecimal amount) { /* 振込実行 */ }
    public BigDecimal calculateFee(BigDecimal amount) {
        return BigDecimal.valueOf(330);
    }
}`,
      },
      {
        title: "値オブジェクトの導入（Introduce Value Object）",
        content:
          "プリミティブ型やStringで表現されているドメインの概念を、専用の値オブジェクトに置き換えます。バリデーションを値オブジェクト内に閉じ込め、不正な値の生成をコンパイル時や生成時に防止します。record を使うと、equals/hashCode が値に基づいて自動生成されるため、値オブジェクトの実装に最適です。",
        code: `// ❌ Before: プリミティブ型で金額を表現
public class OrderService {
    public int applyDiscount(int price, int discountPercent) {
        return price - (price * discountPercent / 100);
    }

    // 呼び出し側: 引数の順序を間違えやすい
    // applyDiscount(10, 1000) → price と percent が逆!
}

// ✅ After: 値オブジェクトを導入
public record Price(int value) {
    public Price {
        if (value < 0) {
            throw new IllegalArgumentException(
                "価格は0以上: " + value);
        }
    }

    public Price applyDiscount(DiscountRate rate) {
        int discounted = value - (value * rate.percent() / 100);
        return new Price(discounted);
    }

    public Price add(Price other) {
        return new Price(this.value + other.value);
    }
}

public record DiscountRate(int percent) {
    public DiscountRate {
        if (percent < 0 || percent > 100) {
            throw new IllegalArgumentException(
                "割引率は0-100: " + percent);
        }
    }
}

// 使用例: 型安全で意図が明確
var price = new Price(1000);
var rate = new DiscountRate(10);
var discounted = price.applyDiscount(rate); // 900円`,
      },
      {
        title: "ストラテジーパターンの適用",
        content:
          "アルゴリズムや振る舞いを切り替える条件分岐が複雑な場合、ストラテジーパターンで分離します。各戦略を独立したクラスとして実装し、実行時に切り替え可能にします。Java では関数型インターフェースやラムダ式と組み合わせることで、より簡潔に実装できます。",
        code: `// ❌ Before: 条件分岐でソート方法を切り替え
public class ProductSorter {
    public List<Product> sort(List<Product> products,
                              String sortType) {
        return switch (sortType) {
            case "price_asc" -> products.stream()
                .sorted(Comparator.comparing(Product::price))
                .toList();
            case "price_desc" -> products.stream()
                .sorted(Comparator.comparing(Product::price)
                    .reversed()).toList();
            case "name" -> products.stream()
                .sorted(Comparator.comparing(Product::name))
                .toList();
            case "newest" -> products.stream()
                .sorted(Comparator.comparing(Product::createdAt)
                    .reversed()).toList();
            default -> products;
        };
    }
}

// ✅ After: ストラテジーパターン + enum
public enum SortStrategy {
    PRICE_ASC(Comparator.comparing(Product::price)),
    PRICE_DESC(Comparator.comparing(Product::price).reversed()),
    NAME(Comparator.comparing(Product::name)),
    NEWEST(Comparator.comparing(Product::createdAt).reversed());

    private final Comparator<Product> comparator;

    SortStrategy(Comparator<Product> comparator) {
        this.comparator = comparator;
    }

    public List<Product> apply(List<Product> products) {
        return products.stream()
                .sorted(comparator)
                .toList();
    }
}

// 使用例
List<Product> sorted = SortStrategy.PRICE_ASC.apply(products);`,
      },
    ],
  },

  // ===== 実践 (practice) =====
  {
    id: "code-review",
    title: "コードレビュー",
    category: "practice",
    description:
      "効果的なコードレビューを行い、チーム全体のコード品質を向上させる",
    sections: [
      {
        title: "レビュー観点チェックリスト",
        content:
          "コードレビューでは、正確性・可読性・保守性・パフォーマンス・セキュリティの5つの観点で確認します。すべてを一度にチェックしようとせず、1回のレビューでは特定の観点に集中するのが効果的です。チームで共通のチェックリストを持つことで、レビューの品質が安定します。レビューは批判ではなく、チームの学習機会と捉えましょう。",
        code: `// レビュー観点の例

// 1. 正確性: ロジックは正しいか
// ❌ 境界値の見落とし
if (age > 18) { /* 18歳は含まれない */ }
// ✅ 要件に応じた正しい比較
if (age >= 18) { /* 18歳以上 */ }

// 2. 可読性: 意図が伝わるか
// ❌ マジックナンバー
if (status == 3) { ... }
// ✅ 定数または enum
if (status == OrderStatus.SHIPPED) { ... }

// 3. 保守性: 変更しやすいか
// ❌ ハードコーディング
String url = "https://api.example.com/v1/users";
// ✅ 設定外出し
@Value("\${api.base-url}") String baseUrl;

// 4. パフォーマンス: N+1問題はないか
// ❌ ループ内でDBアクセス
for (var id : ids) { repo.findById(id); }
// ✅ 一括取得
repo.findAllById(ids);

// 5. セキュリティ: SQLインジェクション等
// ❌ 文字列結合
"SELECT * FROM users WHERE id = " + id;
// ✅ プレースホルダ
"SELECT * FROM users WHERE id = ?";`,
      },
      {
        title: "レビューコメントの書き方",
        content:
          "レビューコメントは具体的で建設的であるべきです。「ダメ」ではなく「こうすると良い」と代替案を示しましょう。指摘の重要度（Must/Should/Nit）を明記すると、対応の優先順位が明確になります。良い点も積極的に褒めることで、ポジティブなレビュー文化が育ちます。",
        code: `// レビューコメントの良い例・悪い例

// ❌ 悪いコメント
// "これは間違っている"
// "なぜこう書いたのか意味不明"
// "こんな書き方は普通しない"

// ✅ 良いコメント（指摘）
// [Must] ここは null チェックが必要です。
// findById() は null を返す可能性があり、
// 次の行で NPE が発生します。
// 例: Optional を使った書き方
// var user = repo.findById(id)
//     .orElseThrow(() -> new NotFoundException(id));

// ✅ 良いコメント（提案）
// [Should] Stream API を使うとより簡潔になります。
// 現在のコードでも動作しますが、以下のように書くと
// 意図が明確になります:
// users.stream()
//      .filter(User::isActive)
//      .map(User::getEmail)
//      .toList();

// ✅ 良いコメント（軽微な指摘）
// [Nit] Java の命名規約では定数は
// UPPER_SNAKE_CASE です: maxRetry → MAX_RETRY

// ✅ 良いコメント（称賛）
// このバリデーションの設計、とても良いですね!
// 値オブジェクトで不正な状態を防いでいるのが素晴らしい。`,
      },
      {
        title: "静的解析ツール（Checkstyle / SpotBugs / PMD）",
        content:
          "静的解析ツールを導入すると、コーディング規約違反やバグの可能性を自動検出でき、レビューの負担を軽減できます。Checkstyle はスタイルチェック、SpotBugs はバグパターン検出、PMD は不要コードや複雑度の警告に特化しています。CI/CDパイプラインに組み込むことで、品質ゲートとして機能させましょう。",
        code: `// build.gradle での設定例

plugins {
    id 'java'
    id 'checkstyle'
    id 'pmd'
    id 'com.github.spotbugs' version '6.0.7'
}

// Checkstyle: コーディング規約チェック
checkstyle {
    toolVersion = '10.12.5'
    configFile = file('config/checkstyle/google_checks.xml')
    maxWarnings = 0 // 警告もエラーとして扱う
}

// SpotBugs: バグパターン検出
spotbugs {
    effort = 'max'
    reportLevel = 'medium'
}

// PMD: 不要コード・複雑度チェック
pmd {
    toolVersion = '7.0.0'
    rulesets = [
        'category/java/bestpractices.xml',
        'category/java/codestyle.xml',
        'category/java/errorprone.xml'
    ]
}

// 検出される問題の例:
// Checkstyle → インデント不統一、Javadoc不足
// SpotBugs  → null参照、リソースリーク、無限ループ
// PMD       → 未使用変数、空のcatchブロック、高い循環的複雑度`,
      },
      {
        title: "SonarQube によるコード品質管理",
        content:
          "SonarQube はコードの品質を継続的に測定・可視化するプラットフォームです。バグ、脆弱性、コードスメル、テストカバレッジ、重複コードを総合的に分析します。品質ゲートを設定してマージ前に品質基準を満たすことを必須にすることで、技術的負債の蓄積を防げます。",
        code: `// SonarQube が検出する主な問題カテゴリ

// 1. Bug（バグ）: 実行時エラーになりうるコード
// ❌ リソースリーク
InputStream is = new FileInputStream("data.txt");
// close されない → SonarQube が警告

// ✅ try-with-resources を使う
try (var is = new FileInputStream("data.txt")) {
    // 自動的に close される
}

// 2. Vulnerability（脆弱性）
// ❌ ハードコードされた認証情報
String password = "admin123";
// SonarQube が Critical として検出

// 3. Code Smell（コードスメル）
// ❌ 認知的複雑度が高いメソッド
// SonarQube は Cognitive Complexity を計測
// デフォルト閾値: メソッドあたり15

// 4. 品質ゲートの設定例（sonar-project.properties）
// sonar.projectKey=my-java-app
// sonar.sources=src/main/java
// sonar.tests=src/test/java
// sonar.java.binaries=build/classes
// sonar.coverage.jacoco.xmlReportPaths=
//     build/reports/jacoco/test/jacocoTestReport.xml

// 品質ゲート条件の例:
// - 新規コードのカバレッジ >= 80%
// - 新規コードの重複率 <= 3%
// - 新規バグ = 0
// - 新規脆弱性 = 0`,
      },
      {
        title: "Google のコードレビュープラクティス",
        content:
          "Google のエンジニアリングプラクティスでは、レビュアーは「コードベースの健全性を向上させるか」を基準に判断します。完璧を求めすぎず、全体として改善されていれば承認するのが原則です。レビュー依頼から24時間以内に最初のフィードバックを返し、小さなCL(チェンジリスト)で頻繁にレビューすることで、レビューの効率と品質を両立させます。",
        code: `// Google のレビュー原則まとめ

// 1. CLは小さく保つ（目安: 変更200行以下）
// ❌ 3000行の巨大PR → レビューが雑になる
// ✅ 機能単位で小さく分割 → 丁寧なレビューが可能

// 2. レビュアーの責務
// - 設計: 適切な抽象化・責務分離がされているか
// - 機能: 意図通りに動作するか
// - 複雑さ: 将来の開発者が理解できるか
// - テスト: 十分なテストがあるか
// - 命名: 明確で一貫性のある命名か
// - コメント: 必要十分なコメントがあるか

// 3. レビューの速度
// - 24時間以内に初回フィードバック
// - 即日対応できなくても、いつ見るかを伝える
// - 緊急修正は最優先でレビュー

// 4. コメントには LGTM の明確な基準を持つ
// LGTM (Looks Good To Me) = マージ承認
// LGTM with nits = 軽微な指摘ありだがマージ可
// Request Changes = 修正必須

// 5. 建設的なフィードバックの例
// "なぜ X にしたか教えてください" (質問形式)
// "Y のパターンだとテストしやすくなります" (提案形式)
// "Z の箇所、良い設計ですね！" (称賛)`,
      },
    ],
  },
];

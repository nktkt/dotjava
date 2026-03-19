export interface JpaSection {
  title: string;
  content: string;
  code?: string;
}

export interface JpaChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: JpaSection[];
}

export const jpaCategories = [
  { id: "basics", name: "JPA基礎", color: "#59666C" },
  { id: "entity", name: "エンティティ設計", color: "#2563EB" },
  { id: "query", name: "クエリ", color: "#059669" },
  { id: "advanced", name: "応用・最適化", color: "#DC2626" },
] as const;

export const jpaChapters: JpaChapter[] = [
  // ===== JPA基礎 =====
  {
    id: "jpa-overview",
    title: "JPAとは",
    category: "basics",
    description:
      "ORMの概念、Hibernate、EntityManager、永続性コンテキストなどJPAの全体像を学ぶ",
    sections: [
      {
        title: "ORM（Object-Relational Mapping）の概念",
        content:
          "ORMとは、オブジェクト指向プログラミングのオブジェクトとリレーショナルデータベースのテーブルを自動的にマッピングする技術です。JavaのクラスをDBのテーブルに、フィールドをカラムに対応させることで、SQLを直接書かずにデータベース操作を行えます。これにより「インピーダンスミスマッチ」（オブジェクトとRDBの構造的な不一致）を解消し、開発生産性を大幅に向上させます。",
        code: `// ORMなし: JDBCで直接SQLを記述
String sql = "SELECT id, name, email FROM users WHERE id = ?";
PreparedStatement ps = connection.prepareStatement(sql);
ps.setLong(1, userId);
ResultSet rs = ps.executeQuery();
if (rs.next()) {
    User user = new User();
    user.setId(rs.getLong("id"));
    user.setName(rs.getString("name"));
    user.setEmail(rs.getString("email"));
}

// ORMあり: JPAでオブジェクトとして取得
User user = entityManager.find(User.class, userId);
// → SQLの記述不要、型安全、リファクタリングに強い`,
      },
      {
        title: "JPAとは何か",
        content:
          "JPA（Java Persistence API）は、Java EE（現Jakarta EE）で定義されたORMの標準仕様です。JPA自体は「仕様（インターフェース）」であり、実装は含みません。Hibernate、EclipseLink、OpenJPAなどが実装（プロバイダ）を提供しています。JPAを使うことで、特定のORM実装に依存しない移植性の高いコードが書けます。",
        code: `// JPA は仕様（インターフェース）
// javax.persistence / jakarta.persistence パッケージで定義

// 主要なJPA実装プロバイダ
// 1. Hibernate（最も広く使われている、Spring Boot のデフォルト）
// 2. EclipseLink（Jakarta EE リファレンス実装）
// 3. OpenJPA（Apache）

// Spring Boot での依存関係設定（build.gradle）
dependencies {
    // spring-boot-starter-data-jpa に Hibernate が含まれる
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'org.postgresql:postgresql'
}

// application.yml での JPA 設定
// spring:
//   jpa:
//     hibernate:
//       ddl-auto: validate
//     show-sql: true
//     properties:
//       hibernate:
//         format_sql: true
//         dialect: org.hibernate.dialect.PostgreSQLDialect`,
      },
      {
        title: "Hibernateの特徴",
        content:
          "HibernateはJPAの最も広く使われている実装で、Spring Bootのデフォルトプロバイダです。遅延ロード（Lazy Loading）、キャッシュ機構（1次・2次キャッシュ）、HQL（Hibernate Query Language）、自動DDL生成など多数の機能を提供します。JPAの標準仕様を超えた独自拡張機能も豊富で、@Where、@Formula、@NaturalId などが利用できます。",
        code: `// Hibernate 独自のアノテーション例

@Entity
@Table(name = "users")
@Where(clause = "deleted = false")  // Hibernate独自: 論理削除フィルタ
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId  // Hibernate独自: ビジネスキー
    private String email;

    @Formula("(SELECT COUNT(*) FROM orders o WHERE o.user_id = id)")
    private int orderCount;  // Hibernate独自: 計算プロパティ

    @CreationTimestamp   // Hibernate独自
    private LocalDateTime createdAt;

    @UpdateTimestamp     // Hibernate独自
    private LocalDateTime updatedAt;

    private boolean deleted = false;
}`,
      },
      {
        title: "EntityManagerの役割",
        content:
          "EntityManagerはJPAの中核となるインターフェースで、エンティティのCRUD操作を行う窓口です。persist()で新規保存、find()で検索、merge()で更新、remove()で削除を行います。Spring Data JPAを使う場合は直接触れる機会は少ないですが、内部では常にEntityManagerが動作しています。複雑なクエリやバッチ処理では直接利用することもあります。",
        code: `// EntityManager を使った基本的な CRUD 操作

@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl {

    // Spring が EntityManager を注入
    private final EntityManager em;

    // 新規作成（INSERT）
    public void save(User user) {
        em.persist(user);  // managed 状態にする
    }

    // 主キーで検索（SELECT）
    public User findById(Long id) {
        return em.find(User.class, id);  // null if not found
    }

    // 更新（UPDATE）
    public User update(User detachedUser) {
        return em.merge(detachedUser);  // managed 状態のコピーを返す
    }

    // 削除（DELETE）
    public void delete(Long id) {
        User user = em.find(User.class, id);
        if (user != null) {
            em.remove(user);
        }
    }

    // JPQL クエリ
    public List<User> findByName(String name) {
        return em.createQuery(
                "SELECT u FROM User u WHERE u.name = :name", User.class)
            .setParameter("name", name)
            .getResultList();
    }
}`,
      },
      {
        title: "永続性コンテキスト（Persistence Context）",
        content:
          "永続性コンテキストは、EntityManagerが管理するエンティティの「キャッシュ領域」です。同一トランザクション内で同じ主キーのエンティティを取得すると、DBへのアクセスなしにキャッシュからオブジェクトが返されます（1次キャッシュ）。これにより同一性（identity）が保証され、同じ主キーのエンティティは常に同じJavaオブジェクトを参照します。またダーティチェッキング機能により、managed状態のエンティティのフィールド変更は自動的にDBに反映されます。",
        code: `// 永続性コンテキストの動作を確認

@Transactional
public void demonstratePersistenceContext() {
    // 1. 1次キャッシュ: 同じエンティティは1回だけ SELECT される
    User user1 = em.find(User.class, 1L);  // → SELECT 発行
    User user2 = em.find(User.class, 1L);  // → SELECT なし（キャッシュ）
    assert user1 == user2;  // true（同一オブジェクト）

    // 2. ダーティチェッキング: setterだけでUPDATEが発行される
    user1.setName("新しい名前");
    // em.merge() や em.persist() は不要！
    // トランザクションcommit時に自動的にUPDATEが発行される

    // 3. flush: 永続性コンテキストの変更をDBに同期
    em.flush();  // この時点でUPDATEのSQLが発行される

    // 4. clear: 1次キャッシュをクリア（バッチ処理で重要）
    em.clear();
    User user3 = em.find(User.class, 1L);  // → 再度 SELECT 発行
    assert user1 != user3;  // true（別オブジェクト）
}`,
      },
    ],
  },
  {
    id: "entity-basics",
    title: "エンティティの基本マッピング",
    category: "basics",
    description:
      "@Entity、@Table、@Id、@GeneratedValue、@Columnによる基本的なマッピングを学ぶ",
    sections: [
      {
        title: "@Entityと@Table",
        content:
          "@Entityアノテーションは、そのクラスがJPAエンティティ（DBテーブルに対応するクラス）であることを宣言します。@Tableアノテーションで対応するテーブル名を指定できます。省略した場合はクラス名がそのままテーブル名として使われます。エンティティクラスにはデフォルトコンストラクタ（引数なし）が必須で、finalクラスにはできません。",
        code: `import jakarta.persistence.*;

// @Entity: このクラスがJPAエンティティであることを宣言
@Entity
// @Table: テーブル名を明示的に指定（省略するとクラス名 "User" がテーブル名）
@Table(
    name = "users",
    schema = "public",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_users_email",
            columnNames = {"email"}
        )
    },
    indexes = {
        @Index(
            name = "idx_users_name",
            columnList = "last_name, first_name"
        )
    }
)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String firstName;
    private String lastName;

    // JPA はデフォルトコンストラクタが必須
    protected User() {}

    public User(String email, String firstName, String lastName) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}`,
      },
      {
        title: "@Idと@GeneratedValue",
        content:
          "@Idはエンティティの主キーフィールドを指定します。@GeneratedValueで主キーの生成戦略を定義します。主な戦略は、IDENTITY（DBの自動インクリメント）、SEQUENCE（シーケンスオブジェクト）、TABLE（別テーブルで管理）、UUID（Java 21+）です。PostgreSQLではSEQUENCE、MySQLではIDENTITYが一般的です。バッチINSERTのパフォーマンスを重視する場合はSEQUENCEが推奨されます。",
        code: `// 主キー生成戦略の比較

// 1. IDENTITY: DBの自動インクリメント（MySQL向き）
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // 注意: バッチINSERTが効かない（INSERT後にIDを取得する必要があるため）
}

// 2. SEQUENCE: シーケンスオブジェクト（PostgreSQL向き、推奨）
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "order_seq_gen")
    @SequenceGenerator(
        name = "order_seq_gen",
        sequenceName = "order_seq",
        allocationSize = 50  // まとめて50個のIDを確保（パフォーマンス向上）
    )
    private Long id;
}

// 3. UUID: ユニバーサル一意識別子
@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    // 分散環境でもユニーク、ただしインデックスサイズが大きい
}`,
      },
      {
        title: "@Columnによるカラムマッピング",
        content:
          "@Columnアノテーションで、フィールドとDBカラムの対応を詳細に制御できます。カラム名、長さ制限、NULL許可、ユニーク制約、デフォルト値などを指定可能です。省略した場合はフィールド名がカラム名（キャメルケース→スネークケース変換はSpring Bootのデフォルト設定）として使われます。",
        code: `@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // name → "name" カラム（長さ100、NOT NULL）
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    // unique制約 + NOT NULL
    @Column(unique = true, nullable = false, length = 255)
    private String email;

    // precision, scale で小数の精度を指定
    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    // updatable = false: INSERT後は更新不可
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // insertable = false: INSERT時に値をセットしない（DBデフォルト値を使う）
    @Column(insertable = false, columnDefinition = "boolean default true")
    private Boolean active;

    // @Lob: 大きなデータ（CLOB/BLOB）
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    // @Transient: DBに保存しないフィールド
    @Transient
    private String temporaryData;
}`,
      },
      {
        title: "基本型のマッピング",
        content:
          "JPAはJavaの基本型（String、Integer、Long、Boolean、BigDecimalなど）を自動的にDBカラムにマッピングします。日付型はjava.time APIのLocalDate、LocalDateTime、Instantなどがそのまま使えます。列挙型は@Enumeratedで文字列（STRING）または序数（ORDINAL）としてマッピングしますが、安全性の観点からSTRINGが強く推奨されます。",
        code: `@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;           // → VARCHAR
    private Integer priority;       // → INTEGER
    private Long estimatedMinutes;  // → BIGINT
    private Boolean completed;      // → BOOLEAN
    private BigDecimal cost;        // → DECIMAL
    private Double progress;        // → DOUBLE

    // 日付型（java.time API がそのまま使える）
    private LocalDate dueDate;          // → DATE
    private LocalDateTime createdAt;    // → TIMESTAMP
    private Instant updatedAt;          // → TIMESTAMP WITH TIMEZONE

    // 列挙型: STRING を使う（ORDINAL は順番変更で壊れるため危険）
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TaskStatus status;

    public enum TaskStatus {
        TODO, IN_PROGRESS, DONE, CANCELLED
    }
    // ORDINAL → 0, 1, 2, 3（enumの順番を変えるとデータ不整合）
    // STRING  → "TODO", "IN_PROGRESS"...（安全、推奨）
}`,
      },
      {
        title: "命名戦略とSpring Bootの設定",
        content:
          "Spring Bootでは、デフォルトの命名戦略（SpringPhysicalNamingStrategy）により、Javaのキャメルケース（firstName）がDBのスネークケース（first_name）に自動変換されます。この動作はapplication.ymlで変更可能です。また、JPAの基本設定（DDL自動生成、SQLログ出力、方言指定）はSpring Bootの設定ファイルで簡単に制御できます。",
        code: `// application.yml でのJPA設定

// spring:
//   jpa:
//     # DDL自動生成（本番では validate を使用）
//     hibernate:
//       ddl-auto: validate   # none / validate / update / create / create-drop
//
//     # SQLログ出力（開発時に有効）
//     show-sql: true
//     properties:
//       hibernate:
//         format_sql: true
//
//     # 命名戦略のカスタマイズ
//     hibernate:
//       naming:
//         # キャメルケース → スネークケース（デフォルト）
//         physical-strategy: org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy

// ddl-auto の各モードの違い:
// none:        何もしない（本番推奨、Flyway/Liquibaseと併用）
// validate:    エンティティとテーブルの整合性をチェック（本番推奨）
// update:      差分だけ ALTER TABLE（開発時のみ、カラム削除はしない）
// create:      起動時に DROP → CREATE
// create-drop: 起動時にCREATE、終了時にDROP（テスト向き）

// Flyway との併用例（推奨）
// spring:
//   flyway:
//     enabled: true
//     locations: classpath:db/migration`,
      },
    ],
  },
  {
    id: "entity-lifecycle",
    title: "エンティティのライフサイクル",
    category: "basics",
    description:
      "エンティティの状態遷移（new/managed/detached/removed）、flush、persist/merge/removeの動作を学ぶ",
    sections: [
      {
        title: "エンティティの4つの状態",
        content:
          "JPAのエンティティは4つの状態を持ちます。New（新規）：まだ永続化されていない新規オブジェクト。Managed（管理状態）：永続性コンテキストで管理されており、変更が自動追跡される。Detached（分離状態）：かつてManagedだったが、永続性コンテキストから切り離された。Removed（削除状態）：削除が予約された状態。これらの状態遷移を正しく理解することが、JPAを使いこなす鍵です。",
        code: `// エンティティの4つの状態と遷移

@Transactional
public void entityLifecycleDemo() {

    // 1. New（新規）: new でインスタンスを作成した直後
    User user = new User("tanaka@example.com", "田中");
    // → DB と無関係、永続性コンテキストにも含まれない

    // 2. Managed（管理状態）: persist() で永続化
    em.persist(user);
    // → 永続性コンテキストに追加、トランザクション終了時にINSERT
    // → この状態ではフィールド変更が自動的にDBに反映される
    user.setName("田中太郎");  // UPDATE が自動発行される

    // 3. Detached（分離状態）: トランザクション終了後 or clear()
    em.detach(user);
    // → 永続性コンテキストから切り離される
    // → フィールドを変更しても DB に反映されない
    user.setName("変更しても反映されない");

    // 4. Removed（削除状態）: remove() を呼んだ後
    User managed = em.merge(user);  // 再度 Managed にする
    em.remove(managed);
    // → トランザクション終了時に DELETE が発行される
}`,
      },
      {
        title: "persist()の動作",
        content:
          "persist()はNew状態のエンティティをManaged状態にし、永続性コンテキストに登録します。トランザクションのコミット時（またはflush時）にINSERT文が発行されます。すでにManaged状態のエンティティにpersist()を呼んでも何も起きません。Detached状態のエンティティにpersist()を呼ぶとEntityExistsExceptionが発生するので注意が必要です。",
        code: `@Service
@RequiredArgsConstructor
public class UserService {

    private final EntityManager em;

    // persist() の正しい使い方
    @Transactional
    public User createUser(String email, String name) {
        User user = new User(email, name);  // New 状態

        em.persist(user);  // → Managed 状態に遷移
        // この時点では INSERT は発行されていない

        // Managed なのでフィールド変更は自動反映される
        user.setCreatedAt(LocalDateTime.now());

        return user;
        // トランザクション終了時に INSERT が発行される
    }

    // persist() の注意点
    @Transactional
    public void persistCaution() {
        // NG: Detached エンティティに persist() → 例外
        User detached = new User("a@test.com", "A");
        detached.setId(999L);  // IDがセットされている
        // em.persist(detached);
        // → EntityExistsException or PersistentObjectException

        // OK: Detached → Managed にするには merge() を使う
        User managed = em.merge(detached);

        // 注意: persist() は void、merge() は新しいManaged参照を返す
        // merge後は返り値のオブジェクトを使うこと！
    }
}`,
      },
      {
        title: "merge()とdetach()",
        content:
          "merge()はDetached状態のエンティティをManaged状態に再統合します。重要な点は、merge()は引数のオブジェクト自体をManagedにするのではなく、新しいManagedオブジェクトのコピーを返すことです。したがって、merge後は返り値のオブジェクトを使用する必要があります。detach()はManagedエンティティを永続性コンテキストから切り離し、Detached状態にします。",
        code: `@Transactional
public void mergeAndDetachDemo() {

    // === merge() の動作 ===
    // 1. Detached エンティティを準備
    User detached = new User();
    detached.setId(1L);
    detached.setName("更新された名前");

    // 2. merge() で Managed に統合
    User managed = em.merge(detached);

    // 重要: detached と managed は別オブジェクト！
    assert detached != managed;           // true
    assert detached.getId().equals(managed.getId());  // true

    // managed への変更は DB に反映される
    managed.setEmail("new@example.com");  // OK: 自動反映

    // detached への変更は DB に反映されない
    detached.setEmail("ignored@example.com");  // 無視される

    // === detach() の動作 ===
    User user = em.find(User.class, 2L);  // Managed
    em.detach(user);                       // → Detached

    user.setName("この変更は反映されない");

    // === clear() で全エンティティをDetachにする ===
    em.clear();
    // → 永続性コンテキスト内の全エンティティが Detached になる
    // → バッチ処理でメモリ解放に使用
}`,
      },
      {
        title: "flush()とトランザクション",
        content:
          "flush()は永続性コンテキストの変更をデータベースに同期（SQLを発行）します。通常はトランザクションのコミット時に自動的にflushが実行されますが、明示的にflush()を呼ぶこともできます。JPQLクエリ実行前にも自動flushが行われます（FlushMode.AUTO）。バッチ処理では、定期的にflush()とclear()を呼ぶことでOutOfMemoryErrorを防ぎます。",
        code: `// flush のタイミングと制御

@Transactional
public void flushDemo() {

    // 1. 自動 flush: トランザクションcommit時
    User user = new User("a@test.com", "A");
    em.persist(user);
    // → commit 時に INSERT が自動発行

    // 2. 自動 flush: JPQL クエリ実行前
    em.persist(new User("b@test.com", "B"));
    // ↓ JPQL実行前に flush が走り、上の persist が反映される
    List<User> users = em.createQuery(
        "SELECT u FROM User u", User.class).getResultList();

    // 3. 手動 flush
    em.persist(new User("c@test.com", "C"));
    em.flush();  // この時点でINSERTのSQLが発行される

    // 4. FlushMode の設定
    em.setFlushMode(FlushModeType.COMMIT);
    // → JPQL実行前の自動flushを無効化（パフォーマンス向上）
}

// バッチ処理での flush + clear パターン
@Transactional
public void batchInsert(List<UserDto> dtos) {
    int batchSize = 50;
    for (int i = 0; i < dtos.size(); i++) {
        em.persist(dtos.get(i).toEntity());
        if (i % batchSize == 0 && i > 0) {
            em.flush();  // SQL 発行
            em.clear();  // メモリ解放
        }
    }
}`,
      },
      {
        title: "ライフサイクルコールバック",
        content:
          "JPAでは、エンティティの状態遷移時に自動的に呼び出されるコールバックメソッドを定義できます。@PrePersist、@PostPersist、@PreUpdate、@PostUpdate、@PreRemove、@PostRemove、@PostLoadの7つのイベントがあります。これらを使って、作成日時の自動設定、監査ログの記録、バリデーションなどを実装できます。",
        code: `// ライフサイクルコールバックの活用

@Entity
@Table(name = "articles")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // INSERT 前に自動実行
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // UPDATE 前に自動実行
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}

// 共通の監査フィールドを持つ基底クラス（推奨パターン）
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)  // Spring Data JPA
public abstract class BaseEntity {

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @CreatedBy
    @Column(updatable = false)
    private String createdBy;

    @LastModifiedBy
    private String updatedBy;
}

// 利用側: BaseEntity を継承するだけ
@Entity
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal price;
}`,
      },
    ],
  },

  // ===== エンティティ設計 =====
  {
    id: "relationship-mapping",
    title: "関連マッピング",
    category: "entity",
    description:
      "@OneToMany、@ManyToOne、@ManyToMany、カスケード、orphanRemovalによる関連マッピングを学ぶ",
    sections: [
      {
        title: "@ManyToOneと@OneToMany",
        content:
          "@ManyToOneは多対一の関連を表し、外部キーを持つ側（子テーブル側）に定義します。@OneToManyは一対多の関連を表し、親テーブル側に定義します。JPA で最も頻繁に使う関連マッピングです。双方向の場合、@OneToMany側にmappedByを指定して「関連の所有者」を@ManyToOne側にします。所有者側の変更だけがDBに反映されるため、この概念の理解は非常に重要です。",
        code: `// 双方向 @OneToMany / @ManyToOne の例
// 1つの Order に複数の OrderItem がある

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime orderDate;

    // mappedBy = "order" → OrderItem.order が関連の所有者
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL,
               orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderItem> items = new ArrayList<>();

    // 便利メソッド: 双方向の整合性を保つ
    public void addItem(OrderItem item) {
        items.add(item);
        item.setOrder(this);  // 所有者側にもセット
    }

    public void removeItem(OrderItem item) {
        items.remove(item);
        item.setOrder(null);
    }
}

@Entity
@Table(name = "order_items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 関連の所有者（外部キー order_id を持つ側）
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    private String productName;
    private int quantity;
    private BigDecimal price;
}`,
      },
      {
        title: "@OneToOneマッピング",
        content:
          "@OneToOneは一対一の関連を表します。外部キーを持つ側を所有者側とします。注意点として、@OneToOneの非所有者側にLazy Loadingは効きません（Hibernateの制約）。そのため、非所有者側では@OneToOneの使用を避けるか、@MapsIdを使って主キーを共有する方法が推奨されます。",
        code: `// @OneToOne の推奨パターン: @MapsId で主キー共有

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // 非所有者側（Lazy が効かない問題あり）
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL,
              fetch = FetchType.LAZY)
    private UserProfile profile;
}

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id  // user_id が PK かつ FK（主キー共有）
    private Long id;

    // @MapsId: User の主キーをそのまま UserProfile の主キーにする
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "id")
    private User user;

    private String bio;
    private String avatarUrl;

    // @MapsId により、user_profiles.id = users.id
    // 別途外部キーカラムが不要 → テーブル設計がシンプル
}

// 使用例
@Transactional
public void createUserWithProfile() {
    User user = new User("田中太郎");
    UserProfile profile = new UserProfile();
    profile.setBio("Java開発者です");
    profile.setUser(user);
    user.setProfile(profile);
    em.persist(user);  // cascade で profile も保存される
}`,
      },
      {
        title: "@ManyToManyマッピング",
        content:
          "@ManyToManyは多対多の関連を表し、中間テーブルが自動生成されます。しかし、実務では中間テーブルに追加カラム（登録日時など）が必要になることが多いため、@ManyToManyの直接使用は避け、中間エンティティを明示的に作成するパターンが推奨されます。",
        code: `// 推奨: 中間エンティティを明示的に作成するパターン

// NG: @ManyToMany の直接使用（中間テーブルにカラムを追加できない）
// @ManyToMany
// @JoinTable(name = "student_course", ...)
// private Set<Course> courses;

// OK: 中間エンティティ Enrollment を作成
@Entity
@Table(name = "students")
public class Student {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Enrollment> enrollments = new ArrayList<>();
}

@Entity
@Table(name = "courses")
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;

    @OneToMany(mappedBy = "course")
    private List<Enrollment> enrollments = new ArrayList<>();
}

// 中間エンティティ: 追加カラムを自由に定義できる
@Entity
@Table(name = "enrollments")
public class Enrollment {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    private LocalDate enrolledDate;  // 追加カラム
    private String grade;            // 追加カラム
}`,
      },
      {
        title: "カスケード（Cascade）",
        content:
          "カスケードは、親エンティティへの操作を関連する子エンティティに自動的に伝播させる仕組みです。CascadeType.ALL、PERSIST、MERGE、REMOVE、REFRESH、DETACHの6種類があります。実務ではALLまたはPERSIST + MERGEの組み合わせが多く使われます。カスケードREMOVEは親削除時に子も削除するため、意図しない大量削除に注意が必要です。",
        code: `// カスケードの種類と使い分け

@Entity
public class BlogPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    // CascadeType.ALL: 全操作を伝播（親と子のライフサイクルが完全に一致する場合）
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL,
               orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    // CascadeType.PERSIST + MERGE: 保存・更新のみ伝播（削除は伝播しない）
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "post_tags",
        joinColumns = @JoinColumn(name = "post_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();
}

// 使用例
@Transactional
public void cascadeDemo() {
    BlogPost post = new BlogPost("JPA入門");

    // cascade = ALL なので、persist(post) で comments も保存される
    Comment c1 = new Comment("とても参考になりました");
    Comment c2 = new Comment("分かりやすいです");
    post.addComment(c1);
    post.addComment(c2);

    em.persist(post);
    // → INSERT into blog_posts ...
    // → INSERT into comments ... (c1)
    // → INSERT into comments ... (c2)

    // orphanRemoval = true: リストから除外するとDELETEが発行される
    post.getComments().remove(c1);
    // → DELETE from comments WHERE id = ?
}`,
      },
      {
        title: "orphanRemovalとFetchType",
        content:
          "orphanRemoval=trueは、親のコレクションから除外された子エンティティを自動的にDBから削除する機能です。CascadeType.REMOVEとの違いは、REMOVEは親エンティティ自体の削除時に子を削除するのに対し、orphanRemovalはコレクションからの除外時にも削除する点です。FetchTypeはLAZY（遅延ロード）とEAGER（即時ロード）があり、パフォーマンスの観点からLAZYがデフォルト推奨です。",
        code: `// orphanRemoval と FetchType の使い分け

@Entity
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // FetchType.LAZY（推奨）: employees を実際にアクセスするまで SELECT しない
    // orphanRemoval = true: リストから外れた Employee を DB から削除
    @OneToMany(mappedBy = "department", fetch = FetchType.LAZY,
               cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Employee> employees = new ArrayList<>();
}

@Entity
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // @ManyToOne は FetchType.EAGER がデフォルト
    // → LAZY に変更することを強く推奨
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}

// FetchType の注意点
@Transactional
public void fetchTypeDemo() {
    Department dept = em.find(Department.class, 1L);
    // → SELECT * FROM departments WHERE id = 1

    // LAZY: ここでは employees はロードされていない（プロキシ）
    // 実際にアクセスした時に SELECT が発行される
    List<Employee> employees = dept.getEmployees();
    // → この時点で SELECT * FROM employees WHERE department_id = 1

    // 注意: トランザクション外で LAZY コレクションにアクセスすると
    //       LazyInitializationException が発生する！
}`,
      },
    ],
  },
  {
    id: "inheritance-mapping",
    title: "継承マッピング",
    category: "entity",
    description:
      "SINGLE_TABLE、JOINED、TABLE_PER_CLASS、@MappedSuperclassによる継承マッピング戦略を学ぶ",
    sections: [
      {
        title: "継承マッピングの概要",
        content:
          "Javaのクラス継承をRDBのテーブル構造にマッピングするのが継承マッピングです。JPAでは3つの戦略（SINGLE_TABLE、JOINED、TABLE_PER_CLASS）と、テーブルにマッピングしない@MappedSuperclassの計4つのアプローチがあります。選択の基準は、パフォーマンス、データの正規化、ポリモーフィッククエリの必要性です。",
        code: `// 継承マッピング戦略の比較

// 共通の親クラス: Payment（支払い）
// サブクラス: CreditCardPayment, BankTransferPayment, CashPayment

// 1. SINGLE_TABLE（デフォルト）
//    1つのテーブルに全サブクラスのカラムを格納
//    ★ パフォーマンス最良、ポリモーフィッククエリ高速
//    ✕ 多くの NULL カラムが発生

// 2. JOINED
//    親テーブル + サブクラスごとのテーブル（JOIN で結合）
//    ★ 正規化されたデータ構造
//    ✕ SELECT 時に JOIN が必要（パフォーマンス劣化）

// 3. TABLE_PER_CLASS
//    サブクラスごとに独立したテーブル
//    ★ 各テーブルが完結
//    ✕ ポリモーフィッククエリが UNION になり遅い

// 4. @MappedSuperclass（JPAの継承戦略ではない）
//    共通フィールドを継承するだけ（親クラスのテーブルは作らない）
//    ★ 最もシンプル
//    ✕ ポリモーフィッククエリ不可

// 選択ガイドライン:
// - ほとんどの場合: SINGLE_TABLE（シンプルで高速）
// - NULLカラムが許容できない場合: JOINED
// - 共通フィールドだけ共有したい場合: @MappedSuperclass`,
      },
      {
        title: "SINGLE_TABLE戦略",
        content:
          "SINGLE_TABLE戦略は、継承ツリー全体を1つのテーブルにマッピングします。@DiscriminatorColumnで識別カラムを定義し、@DiscriminatorValueでサブクラスごとの値を指定します。JOINが不要なためクエリが高速で、JPAのデフォルト戦略です。欠点はサブクラス固有のカラムにNOT NULL制約を付けられないことです。",
        code: `// SINGLE_TABLE戦略: 1つのテーブルに全データを格納

@Entity
@Table(name = "payments")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(
    name = "payment_type",           // 識別カラム名
    discriminatorType = DiscriminatorType.STRING
)
public abstract class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal amount;

    private LocalDateTime paidAt;
}

@Entity
@DiscriminatorValue("CREDIT_CARD")
public class CreditCardPayment extends Payment {
    private String cardNumber;    // NULL許容（他タイプでは使わない）
    private String expiryDate;
}

@Entity
@DiscriminatorValue("BANK_TRANSFER")
public class BankTransferPayment extends Payment {
    private String bankName;
    private String accountNumber;
}

// 生成されるテーブル:
// payments (id, payment_type, amount, paid_at,
//           card_number, expiry_date,
//           bank_name, account_number)
//
// payment_type = "CREDIT_CARD" の行は bank_name, account_number が NULL
// payment_type = "BANK_TRANSFER" の行は card_number, expiry_date が NULL

// ポリモーフィッククエリ: JOINなしで全支払いを取得
// SELECT * FROM payments  （1テーブルだけ）
List<Payment> all = em.createQuery(
    "SELECT p FROM Payment p", Payment.class).getResultList();`,
      },
      {
        title: "JOINED戦略",
        content:
          "JOINED戦略は、親クラスのテーブルとサブクラスごとのテーブルを作成し、JOINで結合します。各テーブルはそのクラス固有のカラムだけを持つため、正規化されたデータ構造になります。NOT NULL制約もサブクラスのカラムに適用できます。欠点はSELECT時にJOINが必要なためパフォーマンスが劣化する点です。",
        code: `// JOINED戦略: 親テーブル + サブクラステーブル

@Entity
@Table(name = "vehicles")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String manufacturer;

    private int year;
}

@Entity
@Table(name = "cars")
public class Car extends Vehicle {
    @Column(nullable = false)  // NOT NULL制約が使える！
    private int numberOfDoors;
    private String fuelType;
}

@Entity
@Table(name = "trucks")
public class Truck extends Vehicle {
    @Column(nullable = false)
    private double payloadCapacity;
    private int numberOfAxles;
}

// 生成されるテーブル:
// vehicles (id, manufacturer, year)      ← 共通カラム
// cars     (id, number_of_doors, fuel_type) ← Car固有（id は vehicles の FK）
// trucks   (id, payload_capacity, number_of_axles)

// ポリモーフィッククエリ: JOINが発生
// SELECT v.*, c.*, t.*
// FROM vehicles v
// LEFT JOIN cars c ON v.id = c.id
// LEFT JOIN trucks t ON v.id = t.id
List<Vehicle> all = em.createQuery(
    "SELECT v FROM Vehicle v", Vehicle.class).getResultList();

// 特定のサブクラスだけ取得（JOINは1つだけ）
List<Car> cars = em.createQuery(
    "SELECT c FROM Car c", Car.class).getResultList();`,
      },
      {
        title: "TABLE_PER_CLASS戦略",
        content:
          "TABLE_PER_CLASS戦略は、サブクラスごとに独立した完全なテーブルを作成します。各テーブルは親クラスのカラムも含むため、テーブル単体で完結します。特定のサブクラスだけを扱う場合は高速ですが、ポリモーフィッククエリ（親クラスでの検索）はUNION ALLが必要となり、パフォーマンスが大きく劣化します。実務ではあまり使用されません。",
        code: `// TABLE_PER_CLASS戦略: サブクラスごとに独立テーブル

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    // 注意: IDENTITY は使えない（テーブル間でID重複を避ける必要がある）
    private Long id;

    private String message;
    private LocalDateTime sentAt;
    private boolean read;
}

@Entity
@Table(name = "email_notifications")
public class EmailNotification extends Notification {
    private String toAddress;
    private String subject;
}

@Entity
@Table(name = "sms_notifications")
public class SmsNotification extends Notification {
    private String phoneNumber;
}

// 生成されるテーブル:
// email_notifications (id, message, sent_at, read, to_address, subject)
// sms_notifications   (id, message, sent_at, read, phone_number)
// ※ 親クラスのテーブルは作られない

// ポリモーフィッククエリ: UNION ALL が発生（遅い！）
// SELECT id, message, sent_at, read, ... FROM email_notifications
// UNION ALL
// SELECT id, message, sent_at, read, ... FROM sms_notifications
List<Notification> all = em.createQuery(
    "SELECT n FROM Notification n", Notification.class).getResultList();

// 特定サブクラスの検索は高速（1テーブルだけ）
List<EmailNotification> emails = em.createQuery(
    "SELECT e FROM EmailNotification e", EmailNotification.class)
    .getResultList();`,
      },
      {
        title: "@MappedSuperclass",
        content:
          "@MappedSuperclassは、共通フィールドを複数のエンティティで共有するためのアノテーションです。継承マッピング戦略（SINGLE_TABLE等）とは異なり、親クラスはエンティティではなく、テーブルにもマッピングされません。ポリモーフィッククエリはできませんが、最もシンプルで実務で最も多く使われるパターンです。監査フィールド（作成日時、更新日時など）の共通化に最適です。",
        code: `// @MappedSuperclass: 共通フィールドの共有（最もよく使うパターン）

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

    @Version  // 楽観的ロック用
    private Long version;

    // getter/setter 省略
}

// 利用側: 共通フィールドを自動的に継承
@Entity
@Table(name = "products")
public class Product extends BaseEntity {
    // id, createdAt, updatedAt, version は BaseEntity から継承
    private String name;
    private BigDecimal price;
    private String category;
}

@Entity
@Table(name = "customers")
public class Customer extends BaseEntity {
    // id, createdAt, updatedAt, version は BaseEntity から継承
    private String name;
    private String email;
    private String phone;
}

// 生成されるテーブル:
// products  (id, created_at, updated_at, version, name, price, category)
// customers (id, created_at, updated_at, version, name, email, phone)
// ※ base_entity テーブルは作られない

// 注意: ポリモーフィッククエリはできない
// em.createQuery("SELECT b FROM BaseEntity b") → コンパイルエラー`,
      },
    ],
  },
  {
    id: "embedded-converter",
    title: "@Embeddable・@Converter",
    category: "entity",
    description:
      "@Embeddable/@Embedded、@AttributeConverter、複合キー、値オブジェクトのマッピングを学ぶ",
    sections: [
      {
        title: "@Embeddableと@Embedded",
        content:
          "@Embeddableは、独自のテーブルを持たず別のエンティティのテーブルに埋め込まれるクラスを定義します。@Embeddedで埋め込みフィールドを宣言します。DDDの値オブジェクト（Value Object）を表現するのに最適です。住所、金額、期間など、複数のフィールドをまとめた意味のある単位をオブジェクトとして扱えます。",
        code: `// @Embeddable で値オブジェクトを定義

@Embeddable
public class Address {
    @Column(length = 10)
    private String postalCode;

    @Column(length = 100)
    private String prefecture;

    @Column(length = 200)
    private String city;

    @Column(length = 500)
    private String street;

    protected Address() {}  // JPA用

    public Address(String postalCode, String prefecture,
                   String city, String street) {
        this.postalCode = postalCode;
        this.prefecture = prefecture;
        this.city = city;
        this.street = street;
    }
}

@Embeddable
public class Money {
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private Currency currency;

    public enum Currency { JPY, USD, EUR }
}

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Address のフィールドが companies テーブルに埋め込まれる
    @Embedded
    private Address headOffice;

    // 同じ型を複数埋め込む場合は @AttributeOverride で区別
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "postalCode",
            column = @Column(name = "branch_postal_code")),
        @AttributeOverride(name = "prefecture",
            column = @Column(name = "branch_prefecture")),
        @AttributeOverride(name = "city",
            column = @Column(name = "branch_city")),
        @AttributeOverride(name = "street",
            column = @Column(name = "branch_street"))
    })
    private Address branchOffice;

    @Embedded
    private Money capital;
}`,
      },
      {
        title: "@AttributeConverter",
        content:
          "@AttributeConverterは、Javaの型とDBのカラム型の間のカスタム変換ロジックを定義します。autoApply=trueにすると、その型のフィールド全てに自動適用されます。JSON文字列とオブジェクトの変換、暗号化/復号化、カスタム列挙型の変換などに活用できます。",
        code: `// @AttributeConverter でカスタム型変換を実装

// 1. List<String> を JSON 文字列として保存するコンバータ
@Converter(autoApply = false)
public class StringListConverter
        implements AttributeConverter<List<String>, String> {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(List<String> attribute) {
        if (attribute == null) return null;
        try {
            return mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("JSON変換エラー", e);
        }
    }

    @Override
    public List<String> convertToEntityAttribute(String dbData) {
        if (dbData == null) return new ArrayList<>();
        try {
            return mapper.readValue(dbData,
                new TypeReference<List<String>>() {});
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("JSON解析エラー", e);
        }
    }
}

// 2. 暗号化コンバータ
@Converter
public class EncryptConverter
        implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return AesEncryptor.encrypt(attribute);  // 暗号化して保存
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return AesEncryptor.decrypt(dbData);  // 復号化して返す
    }
}

// 使用例
@Entity
public class UserProfile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "TEXT")
    private List<String> hobbies;  // DBには ["読書","旅行"] と保存

    @Convert(converter = EncryptConverter.class)
    private String phoneNumber;  // DBには暗号化文字列で保存
}`,
      },
      {
        title: "複合キー（@EmbeddedId）",
        content:
          "複合主キー（複数カラムで構成される主キー）は、@EmbeddedIdまたは@IdClassで実装できます。@EmbeddedIdは複合キーを@Embeddableクラスとして定義し、エンティティに埋め込む方法です。キークラスはSerializableを実装し、equals()とhashCode()を正しくオーバーライドする必要があります。中間テーブルのエンティティなどで使われます。",
        code: `// @EmbeddedId による複合主キーの実装

// 複合キークラス
@Embeddable
public class EnrollmentId implements Serializable {

    @Column(name = "student_id")
    private Long studentId;

    @Column(name = "course_id")
    private Long courseId;

    protected EnrollmentId() {}

    public EnrollmentId(Long studentId, Long courseId) {
        this.studentId = studentId;
        this.courseId = courseId;
    }

    // equals() と hashCode() は必須！
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EnrollmentId that)) return false;
        return Objects.equals(studentId, that.studentId)
            && Objects.equals(courseId, that.courseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(studentId, courseId);
    }
}

// エンティティで @EmbeddedId を使用
@Entity
@Table(name = "enrollments")
public class Enrollment {

    @EmbeddedId
    private EnrollmentId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("studentId")  // EnrollmentId.studentId にマッピング
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("courseId")
    @JoinColumn(name = "course_id")
    private Course course;

    private LocalDate enrolledDate;
    private String grade;
}

// 検索
Enrollment e = em.find(Enrollment.class,
    new EnrollmentId(studentId, courseId));`,
      },
      {
        title: "値オブジェクトパターン",
        content:
          "DDD（ドメイン駆動設計）の値オブジェクトは、@Embeddableで自然に表現できます。値オブジェクトは不変（immutable）であり、同一性ではなく値の等価性で比較されます。Email、PhoneNumber、Moneyなどのドメイン固有型を値オブジェクトとして定義することで、型安全性が向上し、バリデーションロジックをカプセル化できます。",
        code: `// DDD 値オブジェクトを JPA で実装

@Embeddable
public class Email {
    @Column(name = "email", nullable = false, length = 255)
    private String value;

    protected Email() {}

    public Email(String value) {
        if (value == null || !value.matches("^[\\w.+-]+@[\\w-]+\\.[\\w.]+$")) {
            throw new IllegalArgumentException("不正なメールアドレス: " + value);
        }
        this.value = value.toLowerCase();
    }

    public String getValue() { return value; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Email email)) return false;
        return Objects.equals(value, email.value);
    }

    @Override
    public int hashCode() { return Objects.hash(value); }
}

@Embeddable
public class PhoneNumber {
    @Column(name = "phone_number", length = 20)
    private String value;

    protected PhoneNumber() {}

    public PhoneNumber(String value) {
        String cleaned = value.replaceAll("[\\s-()]", "");
        if (!cleaned.matches("^\\+?\\d{10,15}$")) {
            throw new IllegalArgumentException("不正な電話番号: " + value);
        }
        this.value = cleaned;
    }

    public String getValue() { return value; }
}

// エンティティで値オブジェクトを使用
@Entity
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Embedded
    private Email email;  // String ではなく Email 型 → 型安全！

    @Embedded
    private PhoneNumber phone;

    // new Member("田中", new Email("invalid")) → 即座に例外！
}`,
      },
      {
        title: "コレクションの埋め込み（@ElementCollection）",
        content:
          "@ElementCollectionは、値型のコレクション（List、Set、Map）をエンティティに持たせる機能です。@Embeddableのコレクションや、基本型（String、Integerなど）のコレクションに使用します。別テーブルに保存されますが、エンティティではなく値型として扱われるため、独自の主キーやライフサイクルを持ちません。",
        code: `// @ElementCollection でコレクションを埋め込む

@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // 1. 基本型のコレクション
    @ElementCollection
    @CollectionTable(
        name = "employee_skills",       // テーブル名
        joinColumns = @JoinColumn(name = "employee_id")  // FK
    )
    @Column(name = "skill")
    private Set<String> skills = new HashSet<>();

    // 2. @Embeddable のコレクション
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
        name = "employee_careers",
        joinColumns = @JoinColumn(name = "employee_id")
    )
    private List<Career> careers = new ArrayList<>();

    // 3. Map 型
    @ElementCollection
    @CollectionTable(name = "employee_properties",
        joinColumns = @JoinColumn(name = "employee_id"))
    @MapKeyColumn(name = "property_key")
    @Column(name = "property_value")
    private Map<String, String> properties = new HashMap<>();
}

@Embeddable
public class Career {
    private String companyName;
    private String position;
    private LocalDate startDate;
    private LocalDate endDate;
}

// 生成されるテーブル:
// employees          (id, name)
// employee_skills    (employee_id, skill)
// employee_careers   (employee_id, company_name, position, start_date, end_date)
// employee_properties(employee_id, property_key, property_value)

// 注意: @ElementCollection は全件 DELETE → 全件 INSERT で更新される
// 大量データには不向き → その場合は別エンティティを作成する`,
      },
    ],
  },

  // ===== クエリ =====
  {
    id: "jpql-criteria",
    title: "JPQLとCriteria API",
    category: "query",
    description:
      "JPQL、Criteria APIによる型安全クエリ、動的クエリ構築の方法を学ぶ",
    sections: [
      {
        title: "JPQLの基本",
        content:
          "JPQL（Java Persistence Query Language）は、エンティティオブジェクトに対するクエリ言語です。SQLに似ていますが、テーブル名ではなくエンティティ名、カラム名ではなくフィールド名を使います。SELECT、WHERE、JOIN、GROUP BY、ORDER BY、サブクエリなどSQLの主要機能をサポートしています。パラメータバインディングにより、SQLインジェクションを防止します。",
        code: `// JPQL の基本的な使い方

@Repository
@RequiredArgsConstructor
public class UserQueryRepository {

    private final EntityManager em;

    // 1. 基本的な SELECT
    public List<User> findAll() {
        return em.createQuery(
            "SELECT u FROM User u ORDER BY u.name", User.class)
            .getResultList();
    }

    // 2. パラメータバインディング（:name 形式）
    public List<User> findByName(String name) {
        return em.createQuery(
            "SELECT u FROM User u WHERE u.name = :name", User.class)
            .setParameter("name", name)
            .getResultList();
    }

    // 3. JOIN と WHERE
    public List<Order> findOrdersByUser(Long userId) {
        return em.createQuery("""
            SELECT o FROM Order o
            JOIN o.user u
            WHERE u.id = :userId
            AND o.status = :status
            ORDER BY o.orderDate DESC
            """, Order.class)
            .setParameter("userId", userId)
            .setParameter("status", OrderStatus.COMPLETED)
            .getResultList();
    }

    // 4. 集約関数と GROUP BY
    public List<Object[]> getOrderSummary() {
        return em.createQuery("""
            SELECT u.name, COUNT(o), SUM(o.totalAmount)
            FROM Order o
            JOIN o.user u
            GROUP BY u.name
            HAVING COUNT(o) >= :minOrders
            """, Object[].class)
            .setParameter("minOrders", 3L)
            .getResultList();
    }

    // 5. ページネーション
    public List<User> findWithPaging(int page, int size) {
        return em.createQuery(
            "SELECT u FROM User u ORDER BY u.id", User.class)
            .setFirstResult(page * size)  // OFFSET
            .setMaxResults(size)           // LIMIT
            .getResultList();
    }
}`,
      },
      {
        title: "JPQLの応用",
        content:
          "JPQLでは、DTOプロジェクション（new演算子）、サブクエリ、CASE式、関数呼び出しなど高度な機能が使えます。DTOプロジェクションは必要なカラムだけを取得するため、パフォーマンスの向上に効果的です。サブクエリはWHERE句やSELECT句で使用できます。",
        code: `// JPQL の応用テクニック

// 1. DTO プロジェクション（new 演算子）
public record UserSummaryDto(String name, String email, long orderCount) {}

public List<UserSummaryDto> getUserSummaries() {
    return em.createQuery("""
        SELECT new com.example.dto.UserSummaryDto(
            u.name, u.email, COUNT(o)
        )
        FROM User u
        LEFT JOIN u.orders o
        GROUP BY u.name, u.email
        """, UserSummaryDto.class)
        .getResultList();
}

// 2. サブクエリ
public List<User> findUsersWithHighOrders() {
    return em.createQuery("""
        SELECT u FROM User u
        WHERE u.id IN (
            SELECT o.user.id FROM Order o
            WHERE o.totalAmount > :threshold
        )
        """, User.class)
        .setParameter("threshold", new BigDecimal("100000"))
        .getResultList();
}

// 3. CASE 式
public List<Object[]> categorizeUsers() {
    return em.createQuery("""
        SELECT u.name,
            CASE
                WHEN SIZE(u.orders) >= 10 THEN 'ゴールド'
                WHEN SIZE(u.orders) >= 5  THEN 'シルバー'
                ELSE 'ブロンズ'
            END
        FROM User u
        """, Object[].class)
        .getResultList();
}

// 4. FETCH JOIN（N+1問題の解決）
public List<Order> findOrdersWithItems() {
    return em.createQuery("""
        SELECT DISTINCT o FROM Order o
        JOIN FETCH o.items
        JOIN FETCH o.user
        WHERE o.status = :status
        """, Order.class)
        .setParameter("status", OrderStatus.COMPLETED)
        .getResultList();
}`,
      },
      {
        title: "Criteria APIの基本",
        content:
          "Criteria APIは、JPQLをJavaコードで型安全に構築するAPIです。文字列ベースのJPQLと異なり、コンパイル時に型チェックが行われるため、タイプミスやフィールド名の変更に強いです。動的クエリ（条件の有無によってWHERE句が変わるクエリ）の構築に特に適しています。ただし、記述が冗長になるため、単純なクエリにはJPQLの方が読みやすいです。",
        code: `// Criteria API の基本的な使い方

@Repository
@RequiredArgsConstructor
public class UserCriteriaRepository {

    private final EntityManager em;

    // 1. 基本的な Criteria クエリ
    public List<User> findByName(String name) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> user = cq.from(User.class);

        cq.select(user)
          .where(cb.equal(user.get("name"), name))
          .orderBy(cb.asc(user.get("email")));

        return em.createQuery(cq).getResultList();
    }

    // 2. Metamodel を使った型安全クエリ（推奨）
    // ※ hibernate-jpamodelgen で自動生成される User_ クラスを使用
    public List<User> findByNameTypeSafe(String name) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> user = cq.from(User.class);

        cq.select(user)
          .where(cb.equal(user.get(User_.name), name))  // 型安全！
          .orderBy(cb.asc(user.get(User_.email)));

        return em.createQuery(cq).getResultList();
    }

    // 3. 複数条件
    public List<User> findByConditions(String name, String email) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> user = cq.from(User.class);

        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.equal(user.get("name"), name));
        predicates.add(cb.like(user.get("email"), "%" + email + "%"));

        cq.where(cb.and(predicates.toArray(new Predicate[0])));

        return em.createQuery(cq).getResultList();
    }
}`,
      },
      {
        title: "動的クエリの構築",
        content:
          "動的クエリは、検索条件の有無によってWHERE句が変化するクエリです。例えば検索フォームで、入力された項目だけを条件に含めるようなケースです。Criteria APIは動的クエリの構築に最適です。条件をPredicateのリストに追加し、最後にまとめてWHERE句に適用するパターンが一般的です。",
        code: `// 動的クエリの実装パターン

// 検索条件 DTO
public record UserSearchCriteria(
    String name,           // null なら条件に含めない
    String email,          // null なら条件に含めない
    Integer minAge,        // null なら条件に含めない
    Integer maxAge,        // null なら条件に含めない
    UserStatus status      // null なら条件に含めない
) {}

@Repository
@RequiredArgsConstructor
public class UserSearchRepository {

    private final EntityManager em;

    // 動的検索: 入力された条件だけを WHERE に含める
    public List<User> search(UserSearchCriteria criteria) {
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> user = cq.from(User.class);

        // 条件を動的に組み立てる
        List<Predicate> predicates = new ArrayList<>();

        if (criteria.name() != null && !criteria.name().isBlank()) {
            predicates.add(
                cb.like(user.get("name"), "%" + criteria.name() + "%"));
        }
        if (criteria.email() != null && !criteria.email().isBlank()) {
            predicates.add(
                cb.equal(user.get("email"), criteria.email()));
        }
        if (criteria.minAge() != null) {
            predicates.add(
                cb.greaterThanOrEqualTo(user.get("age"), criteria.minAge()));
        }
        if (criteria.maxAge() != null) {
            predicates.add(
                cb.lessThanOrEqualTo(user.get("age"), criteria.maxAge()));
        }
        if (criteria.status() != null) {
            predicates.add(
                cb.equal(user.get("status"), criteria.status()));
        }

        // 条件がある場合だけ WHERE を設定
        if (!predicates.isEmpty()) {
            cq.where(cb.and(predicates.toArray(new Predicate[0])));
        }

        cq.orderBy(cb.asc(user.get("name")));

        return em.createQuery(cq).getResultList();
    }
}`,
      },
      {
        title: "ネイティブクエリ",
        content:
          "ネイティブクエリは、データベース固有のSQL文を直接実行する機能です。JPA/JPQLでは表現できないDB固有の機能（ウィンドウ関数、CTE、全文検索など）を使いたい場合に利用します。ただし、DB移植性が失われるため、使用は最小限にとどめるべきです。@SqlResultSetMappingでエンティティへのマッピングを定義できます。",
        code: `// ネイティブクエリの使い方

@Repository
@RequiredArgsConstructor
public class NativeQueryRepository {

    private final EntityManager em;

    // 1. エンティティにマッピング
    @SuppressWarnings("unchecked")
    public List<User> findActiveUsers() {
        return em.createNativeQuery(
            "SELECT * FROM users WHERE active = true ORDER BY name",
            User.class)
            .getResultList();
    }

    // 2. ウィンドウ関数（JPQLでは使えない）
    @SuppressWarnings("unchecked")
    public List<Object[]> getUserRanking() {
        return em.createNativeQuery("""
            SELECT name, total_purchases,
                   RANK() OVER (ORDER BY total_purchases DESC) as ranking,
                   PERCENT_RANK() OVER (ORDER BY total_purchases DESC) as percentile
            FROM users
            WHERE total_purchases > 0
            """)
            .getResultList();
    }

    // 3. CTE（Common Table Expression）
    @SuppressWarnings("unchecked")
    public List<Object[]> getRecursiveCategories(Long parentId) {
        return em.createNativeQuery("""
            WITH RECURSIVE category_tree AS (
                SELECT id, name, parent_id, 0 as depth
                FROM categories WHERE id = :parentId
                UNION ALL
                SELECT c.id, c.name, c.parent_id, ct.depth + 1
                FROM categories c
                JOIN category_tree ct ON c.parent_id = ct.id
            )
            SELECT * FROM category_tree ORDER BY depth, name
            """)
            .setParameter("parentId", parentId)
            .getResultList();
    }

    // 4. Spring Data JPA での @Query(nativeQuery)
    // @Query(value = "SELECT * FROM users WHERE email LIKE %:domain",
    //        nativeQuery = true)
    // List<User> findByEmailDomain(@Param("domain") String domain);
}`,
      },
    ],
  },
  {
    id: "spring-data-query",
    title: "Spring Data JPAのクエリ",
    category: "query",
    description:
      "クエリメソッド、@Query、Specification、Querydsl、ページネーションを学ぶ",
    sections: [
      {
        title: "クエリメソッド（命名規則ベース）",
        content:
          "Spring Data JPAのクエリメソッドは、メソッド名の命名規則に従うだけで自動的にJPQLが生成される機能です。findBy、countBy、deleteByなどのプレフィックスに続けて、エンティティのプロパティ名と条件キーワードを組み合わせます。シンプルなクエリはこの方法で十分対応でき、コード量を大幅に削減できます。",
        code: `// Spring Data JPA のクエリメソッド

public interface UserRepository extends JpaRepository<User, Long> {

    // 名前で検索: SELECT * FROM users WHERE name = ?
    List<User> findByName(String name);

    // LIKE検索: SELECT * FROM users WHERE email LIKE ?
    List<User> findByEmailContaining(String keyword);

    // AND 条件
    List<User> findByNameAndStatus(String name, UserStatus status);

    // OR 条件
    List<User> findByNameOrEmail(String name, String email);

    // 比較演算子
    List<User> findByAgeGreaterThanEqual(int age);
    List<User> findByAgeBetween(int min, int max);

    // NULL チェック
    List<User> findByEmailIsNotNull();

    // IN句
    List<User> findByStatusIn(Collection<UserStatus> statuses);

    // 並び替え
    List<User> findByStatusOrderByNameAsc(UserStatus status);

    // 件数制限
    List<User> findTop5ByOrderByCreatedAtDesc();
    Optional<User> findFirstByEmail(String email);

    // 件数カウント
    long countByStatus(UserStatus status);

    // 存在チェック
    boolean existsByEmail(String email);

    // 削除
    void deleteByStatus(UserStatus status);
}`,
      },
      {
        title: "@Queryアノテーション",
        content:
          "@Queryアノテーションは、メソッドに直接JPQL（またはネイティブSQL）を記述する方法です。命名規則ベースのクエリメソッドでは表現が難しい複雑なクエリに使用します。DTOプロジェクション、JOIN、サブクエリ、集約関数なども自由に記述できます。更新・削除クエリは@Modifyingを併用します。",
        code: `public interface OrderRepository extends JpaRepository<Order, Long> {

    // 1. JPQL クエリ
    @Query("SELECT o FROM Order o WHERE o.user.id = :userId " +
           "AND o.status = :status ORDER BY o.orderDate DESC")
    List<Order> findByUserAndStatus(
        @Param("userId") Long userId,
        @Param("status") OrderStatus status);

    // 2. DTO プロジェクション
    @Query("""
        SELECT new com.example.dto.OrderSummaryDto(
            o.id, o.orderDate, o.totalAmount, u.name
        )
        FROM Order o JOIN o.user u
        WHERE o.orderDate >= :from
        """)
    List<OrderSummaryDto> findOrderSummaries(
        @Param("from") LocalDateTime from);

    // 3. インターフェースプロジェクション（簡易DTO）
    @Query("SELECT u.name as name, COUNT(o) as orderCount " +
           "FROM Order o JOIN o.user u GROUP BY u.name")
    List<UserOrderCount> getUserOrderCounts();

    interface UserOrderCount {
        String getName();
        Long getOrderCount();
    }

    // 4. 更新クエリ（@Modifying必須）
    @Modifying
    @Query("UPDATE Order o SET o.status = :status WHERE o.id = :id")
    int updateStatus(@Param("id") Long id,
                     @Param("status") OrderStatus status);

    // 5. 削除クエリ
    @Modifying
    @Query("DELETE FROM Order o WHERE o.status = :status " +
           "AND o.orderDate < :before")
    int deleteOldOrders(@Param("status") OrderStatus status,
                        @Param("before") LocalDateTime before);

    // 6. ネイティブクエリ
    @Query(value = "SELECT * FROM orders WHERE total_amount > :amount",
           nativeQuery = true)
    List<Order> findExpensiveOrders(@Param("amount") BigDecimal amount);
}`,
      },
      {
        title: "Specificationによる動的クエリ",
        content:
          "Spring Data JPAのSpecificationは、Criteria APIをラップした動的クエリ構築の仕組みです。各検索条件をSpecificationオブジェクトとして定義し、and()、or()で組み合わせます。リポジトリでJpaSpecificationExecutorを継承するだけで使用可能です。条件の再利用性が高く、Criteria APIよりも簡潔に記述できます。",
        code: `// Specification による動的検索

// 1. リポジトリに JpaSpecificationExecutor を追加
public interface ProductRepository
        extends JpaRepository<Product, Long>,
                JpaSpecificationExecutor<Product> {
}

// 2. Specification を定義するクラス
public class ProductSpecs {

    public static Specification<Product> hasName(String name) {
        return (root, query, cb) ->
            name == null ? null :
            cb.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Product> hasCategory(String category) {
        return (root, query, cb) ->
            category == null ? null :
            cb.equal(root.get("category"), category);
    }

    public static Specification<Product> priceBetween(
            BigDecimal min, BigDecimal max) {
        return (root, query, cb) -> {
            if (min == null && max == null) return null;
            if (min != null && max != null)
                return cb.between(root.get("price"), min, max);
            if (min != null)
                return cb.greaterThanOrEqualTo(root.get("price"), min);
            return cb.lessThanOrEqualTo(root.get("price"), max);
        };
    }

    public static Specification<Product> isActive() {
        return (root, query, cb) ->
            cb.isTrue(root.get("active"));
    }
}

// 3. サービスで組み合わせて使用
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repo;

    public Page<Product> search(ProductSearchForm form, Pageable pageable) {
        Specification<Product> spec = Specification
            .where(ProductSpecs.hasName(form.getName()))
            .and(ProductSpecs.hasCategory(form.getCategory()))
            .and(ProductSpecs.priceBetween(form.getMinPrice(), form.getMaxPrice()))
            .and(ProductSpecs.isActive());

        return repo.findAll(spec, pageable);
    }
}`,
      },
      {
        title: "Querydslによる型安全クエリ",
        content:
          "Querydslは、JPAクエリを型安全かつ流暢なAPIで記述できるライブラリです。エンティティからQクラス（QUser、QOrderなど）を自動生成し、フィールドアクセスでクエリを構築します。Criteria APIより読みやすく、JPQLのような文字列ミスもありません。Spring Data JPAとの統合も容易です。",
        code: `// Querydsl の使い方

// build.gradle での設定
// implementation 'com.querydsl:querydsl-jpa:5.0.0:jakarta'
// annotationProcessor 'com.querydsl:querydsl-apt:5.0.0:jakarta'

// リポジトリに QuerydslPredicateExecutor を追加
public interface UserRepository
        extends JpaRepository<User, Long>,
                QuerydslPredicateExecutor<User> {
}

// カスタムリポジトリでの使用
@Repository
@RequiredArgsConstructor
public class UserQueryRepository {

    private final JPAQueryFactory queryFactory;

    // 自動生成された Q クラスを使用
    private final QUser user = QUser.user;
    private final QOrder order = QOrder.order;

    // 1. 基本的な検索
    public List<User> findActiveUsers() {
        return queryFactory
            .selectFrom(user)
            .where(user.status.eq(UserStatus.ACTIVE))
            .orderBy(user.name.asc())
            .fetch();
    }

    // 2. JOIN + 条件
    public List<User> findUsersWithRecentOrders() {
        return queryFactory
            .selectFrom(user)
            .join(user.orders, order)
            .where(
                order.orderDate.after(LocalDateTime.now().minusDays(30)),
                order.totalAmount.goe(new BigDecimal("10000"))
            )
            .distinct()
            .fetch();
    }

    // 3. DTO プロジェクション
    public List<UserDto> getUserDtos() {
        return queryFactory
            .select(Projections.constructor(UserDto.class,
                user.name, user.email, user.orders.size()))
            .from(user)
            .fetch();
    }

    // 4. 動的検索
    public List<User> search(String name, UserStatus status) {
        BooleanBuilder builder = new BooleanBuilder();
        if (name != null) builder.and(user.name.contains(name));
        if (status != null) builder.and(user.status.eq(status));

        return queryFactory
            .selectFrom(user)
            .where(builder)
            .fetch();
    }
}`,
      },
      {
        title: "ページネーションとソート",
        content:
          "Spring Data JPAは、Pageable/Sortインターフェースを使った簡単なページネーション機能を提供します。リポジトリメソッドの引数にPageableを追加するだけで、ページネーション対応のクエリが自動生成されます。Page<T>は合計件数を含むため追加のCOUNTクエリが発行されますが、Slice<T>はCOUNTなしで「次のページがあるか」だけを判定します。",
        code: `// ページネーションとソート

// リポジトリ
public interface ArticleRepository extends JpaRepository<Article, Long> {

    Page<Article> findByCategory(String category, Pageable pageable);

    Slice<Article> findByAuthorId(Long authorId, Pageable pageable);

    // @Query でもページネーション対応
    @Query("SELECT a FROM Article a WHERE a.publishedAt IS NOT NULL")
    Page<Article> findPublished(Pageable pageable);

    // countQuery を指定してパフォーマンス最適化
    @Query(value = "SELECT a FROM Article a JOIN FETCH a.author",
           countQuery = "SELECT COUNT(a) FROM Article a")
    Page<Article> findAllWithAuthor(Pageable pageable);
}

// コントローラーでの使用
@RestController
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleRepository articleRepo;

    @GetMapping("/articles")
    public Page<ArticleDto> getArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "publishedAt,desc") String sort) {

        // PageRequest でページング条件を作成
        Pageable pageable = PageRequest.of(page, size,
            Sort.by(Sort.Direction.DESC, "publishedAt"));

        Page<Article> articles = articleRepo.findPublished(pageable);

        // Page.map() で DTO に変換
        return articles.map(ArticleDto::from);
    }
}

// Page<T> のレスポンス例（JSONの場合自動的にこの形式になる）:
// {
//   "content": [...],          // データ
//   "totalElements": 150,      // 総件数
//   "totalPages": 8,           // 総ページ数
//   "number": 0,               // 現在のページ番号
//   "size": 20,                // 1ページの件数
//   "first": true,             // 最初のページか
//   "last": false              // 最後のページか
// }`,
      },
    ],
  },

  // ===== 応用・最適化 =====
  {
    id: "performance-optimization",
    title: "パフォーマンス最適化",
    category: "advanced",
    description:
      "N+1問題、JOIN FETCH、@EntityGraph、バッチフェッチ、2次キャッシュによるパフォーマンス最適化を学ぶ",
    sections: [
      {
        title: "N+1問題とは",
        content:
          "N+1問題は、JPAで最も頻繁に遭遇するパフォーマンス問題です。親エンティティをN件取得した後、関連する子エンティティを取得するために追加でN回のSQLが発行される現象です。例えば、10件の注文を取得した後、各注文の商品一覧を1件ずつ取得すると、合計11回（1+10）のSQLが発行されます。データ量が増えるとレスポンスが急激に悪化します。",
        code: `// N+1 問題の具体例

@Entity
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> items;  // LAZY ロード
}

// NG: N+1 問題が発生するコード
@Transactional(readOnly = true)
public void n1ProblemDemo() {
    // 1回目の SQL: 全注文を取得
    List<Order> orders = orderRepo.findAll();
    // → SELECT * FROM orders  （1回）

    // N回の SQL: 各注文の items にアクセスするたびにクエリ発行
    for (Order order : orders) {
        List<OrderItem> items = order.getItems();
        // → SELECT * FROM order_items WHERE order_id = ?  （N回）
        System.out.println("注文 " + order.getId()
            + ": " + items.size() + "件");
    }
    // 合計: 1 + N 回の SQL（orders が100件なら101回！）
}

// ログで確認（show-sql=true にすると大量の SQL が出力される）
// Hibernate: select o1_0.id, ... from orders o1_0
// Hibernate: select i1_0.id, ... from order_items i1_0 where i1_0.order_id=?
// Hibernate: select i1_0.id, ... from order_items i1_0 where i1_0.order_id=?
// Hibernate: select i1_0.id, ... from order_items i1_0 where i1_0.order_id=?
// ... (N回繰り返し)`,
      },
      {
        title: "JOIN FETCHによる解決",
        content:
          "JOIN FETCHは、N+1問題を解決する最も基本的な方法です。JPQLのJOIN FETCH句を使うと、親エンティティと関連エンティティを1回のSQLで同時に取得できます。INNER JOIN FETCH（関連が必須）とLEFT JOIN FETCH（関連がない場合も親を返す）があります。注意点として、複数のコレクションを同時にJOIN FETCHするとCartesian Productが発生するため避ける必要があります。",
        code: `// JOIN FETCH で N+1 問題を解決

public interface OrderRepository extends JpaRepository<Order, Long> {

    // 1. JOIN FETCH（1回のSQLで注文 + 商品を同時取得）
    @Query("""
        SELECT DISTINCT o FROM Order o
        JOIN FETCH o.items
        WHERE o.status = :status
        """)
    List<Order> findWithItems(@Param("status") OrderStatus status);

    // 2. LEFT JOIN FETCH（商品がない注文も含む）
    @Query("""
        SELECT DISTINCT o FROM Order o
        LEFT JOIN FETCH o.items
        LEFT JOIN FETCH o.user
        ORDER BY o.orderDate DESC
        """)
    List<Order> findAllWithItemsAndUser();

    // 3. ページネーションとの併用（countQuery が必要）
    @Query(value = """
        SELECT DISTINCT o FROM Order o
        LEFT JOIN FETCH o.items
        """,
        countQuery = "SELECT COUNT(o) FROM Order o")
    Page<Order> findAllWithItems(Pageable pageable);
}

// 実行結果: 1回の SQL で全データ取得
// SELECT DISTINCT o.*, i.*
// FROM orders o
// JOIN order_items i ON o.id = i.order_id
// WHERE o.status = 'COMPLETED'

// NG: 複数コレクションの同時 JOIN FETCH（MultipleBagFetchException）
// @Query("SELECT o FROM Order o " +
//        "JOIN FETCH o.items JOIN FETCH o.payments")  // 例外！

// 解決策: 1つはJOIN FETCH、もう1つは @BatchSize で対応
// または、2回のクエリに分割する`,
      },
      {
        title: "@EntityGraphによる解決",
        content:
          "@EntityGraphは、エンティティ取得時にどの関連を一緒に読み込むかをグラフとして定義する機能です。JPQLにJOIN FETCHを書く代わりに、宣言的に関連のフェッチ戦略を制御できます。@NamedEntityGraphでエンティティクラスに定義する方法と、@EntityGraphでリポジトリメソッドに直接指定する方法があります。",
        code: `// @EntityGraph で関連のフェッチを制御

// 1. エンティティに @NamedEntityGraph を定義
@Entity
@NamedEntityGraph(
    name = "Order.withItemsAndUser",
    attributeNodes = {
        @NamedAttributeNode("items"),
        @NamedAttributeNode("user")
    }
)
@NamedEntityGraph(
    name = "Order.withItemsDetail",
    attributeNodes = {
        @NamedAttributeNode(value = "items",
            subgraph = "items-with-product")
    },
    subgraphs = {
        @NamedSubgraph(
            name = "items-with-product",
            attributeNodes = @NamedAttributeNode("product")
        )
    }
)
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> items;
}

// 2. リポジトリで @EntityGraph を使用
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 定義済みの NamedEntityGraph を参照
    @EntityGraph(value = "Order.withItemsAndUser")
    List<Order> findByStatus(OrderStatus status);

    // メソッドに直接フェッチ対象を指定（アドホック）
    @EntityGraph(attributePaths = {"items", "user"})
    List<Order> findAll();

    // 同じメソッドシグネチャで異なるフェッチ戦略
    @EntityGraph(attributePaths = {"items"})
    @Query("SELECT o FROM Order o WHERE o.id = :id")
    Optional<Order> findByIdWithItems(@Param("id") Long id);

    @EntityGraph(attributePaths = {"items", "user", "items.product"})
    @Query("SELECT o FROM Order o WHERE o.id = :id")
    Optional<Order> findByIdWithFullDetails(@Param("id") Long id);
}`,
      },
      {
        title: "バッチフェッチとIN句最適化",
        content:
          "@BatchSizeは、遅延ロードのコレクションをまとめてIN句で取得する機能です。N+1問題を完全に解消するわけではありませんが、N回のクエリをN/batchSize回に削減できます。JOIN FETCHが使えない場合（複数コレクション、ページネーションとの組み合わせなど）の代替手段として有効です。グローバル設定でデフォルトのバッチサイズを指定することも可能です。",
        code: `// @BatchSize でまとめてフェッチ

@Entity
public class Author {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    // @BatchSize: books をアクセスした時にまとめて取得
    @BatchSize(size = 20)  // 20件ずつ IN 句で取得
    @OneToMany(mappedBy = "author", fetch = FetchType.LAZY)
    private List<Book> books;
}

// @BatchSize の効果
// N+1問題: SELECT ... FROM books WHERE author_id = ?  × N回
// @BatchSize(20): SELECT ... FROM books WHERE author_id IN (?,?,?,...,?)
//                 → N/20 回に削減

// グローバル設定（application.yml）
// spring:
//   jpa:
//     properties:
//       hibernate:
//         default_batch_fetch_size: 100  # 全エンティティに適用

// バッチ INSERT 最適化（Hibernate 設定）
// spring:
//   jpa:
//     properties:
//       hibernate:
//         jdbc:
//           batch_size: 50        # INSERT を50件ずつバッチ実行
//           batch_versioned_data: true
//         order_inserts: true      # INSERT をテーブルごとにまとめる
//         order_updates: true      # UPDATE をテーブルごとにまとめる

// バッチ INSERT のコード例
@Transactional
public void batchInsert(List<ProductDto> dtos) {
    int batchSize = 50;
    for (int i = 0; i < dtos.size(); i++) {
        Product product = dtos.get(i).toEntity();
        em.persist(product);

        if (i > 0 && i % batchSize == 0) {
            em.flush();  // SQL発行
            em.clear();  // 1次キャッシュクリア（メモリ節約）
        }
    }
    em.flush();
}`,
      },
      {
        title: "2次キャッシュ",
        content:
          "2次キャッシュ（L2キャッシュ）は、EntityManager（1次キャッシュ）を超えてアプリケーション全体で共有されるキャッシュです。頻繁に読み取られるが更新頻度が低いエンティティ（マスターデータなど）に対して有効です。Ehcache、Hazelcast、Infinispanなどのキャッシュプロバイダを使用します。キャッシュの整合性管理が必要なため、更新頻度の高いデータには不向きです。",
        code: `// 2次キャッシュの設定と使い方

// 1. 依存関係（build.gradle）
// implementation 'org.hibernate.orm:hibernate-jcache'
// implementation 'org.ehcache:ehcache:3.10.8'

// 2. application.yml
// spring:
//   jpa:
//     properties:
//       hibernate:
//         cache:
//           use_second_level_cache: true
//           use_query_cache: true
//           region.factory_class: jcache
//       jakarta:
//         cache:
//           provider: org.ehcache.jsr107.EhcacheCachingProvider

// 3. エンティティにキャッシュを設定
@Entity
@Table(name = "categories")
@Cacheable                                    // JPA標準
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)  // Hibernate
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @OneToMany(mappedBy = "category")
    private List<Product> products;
}

// 4. クエリキャッシュ
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @QueryHints(@QueryHint(
        name = org.hibernate.jpa.HibernateHints.HINT_CACHEABLE,
        value = "true"))
    List<Category> findAll();
}

// キャッシュ戦略の選択:
// READ_ONLY:       読み取り専用（最高パフォーマンス、更新不可）
// READ_WRITE:      読み書き可能（ソフトロック方式）
// NONSTRICT_READ_WRITE: 結果整合性でOKの場合
// TRANSACTIONAL:   完全なトランザクション保証（JTA必要）`,
      },
    ],
  },
  {
    id: "transaction-locking",
    title: "トランザクションとロック",
    category: "advanced",
    description:
      "トランザクション管理、楽観的ロック（@Version）、悲観的ロック、分離レベル、デッドロック対策を学ぶ",
    sections: [
      {
        title: "トランザクション管理",
        content:
          "トランザクションは、一連のDB操作をアトミック（全て成功 or 全て失敗）に実行する仕組みです。Spring では@Transactionalアノテーションで宣言的にトランザクション管理を行います。@Transactionalはクラスレベルまたはメソッドレベルに付与でき、メソッドの開始時にトランザクションを開始し、正常終了時にコミット、例外発生時にロールバックします。",
        code: `// @Transactional の基本的な使い方

@Service
@RequiredArgsConstructor
public class TransferService {

    private final AccountRepository accountRepo;

    // 基本: メソッド全体がトランザクション
    @Transactional
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        Account from = accountRepo.findById(fromId)
            .orElseThrow(() -> new AccountNotFoundException(fromId));
        Account to = accountRepo.findById(toId)
            .orElseThrow(() -> new AccountNotFoundException(toId));

        from.withdraw(amount);   // 残高不足なら例外 → ロールバック
        to.deposit(amount);
        // 正常終了 → コミット
    }

    // 読み取り専用（パフォーマンス最適化）
    @Transactional(readOnly = true)
    public Account getAccount(Long id) {
        return accountRepo.findById(id).orElseThrow();
        // readOnly = true: ダーティチェック無効、flush 不要
    }

    // ロールバック制御
    @Transactional(
        rollbackFor = BusinessException.class,       // この例外でロールバック
        noRollbackFor = WarningException.class       // この例外ではロールバックしない
    )
    public void processOrder(OrderDto dto) {
        // デフォルト: RuntimeException → ロールバック
        //            checked Exception → コミット
        // rollbackFor で checked Exception もロールバック対象にできる
    }

    // タイムアウト設定
    @Transactional(timeout = 30)  // 30秒でタイムアウト
    public void longRunningTask() {
        // ...
    }
}`,
      },
      {
        title: "楽観的ロック（@Version）",
        content:
          "楽観的ロック（Optimistic Locking）は、同時更新の衝突を検知する仕組みです。@Versionフィールドをエンティティに追加すると、UPDATE文のWHERE句にバージョン番号が自動的に含まれます。別のトランザクションが先に更新していた場合、バージョン不一致によりOptimisticLockExceptionが発生します。DBのロックを取得しないため、高い並行性が実現できます。",
        code: `// 楽観的ロック: @Version によるバージョン管理

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private int stock;

    @Version  // 楽観的ロック用バージョンカラム
    private Long version;
}

// Hibernate が生成する UPDATE:
// UPDATE products SET name=?, stock=?, version=? + 1
// WHERE id=? AND version=?
// → version が一致しない場合は更新件数 0 → OptimisticLockException

// 楽観的ロック例外のハンドリング
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;

    @Transactional
    public void updateStock(Long productId, int quantity) {
        Product product = productRepo.findById(productId).orElseThrow();
        product.setStock(product.getStock() - quantity);
        // トランザクション終了時に UPDATE + version チェック
    }

    // リトライパターン
    @Retryable(
        retryFor = OptimisticLockingFailureException.class,
        maxAttempts = 3,
        backoff = @Backoff(delay = 100)
    )
    @Transactional
    public void updateStockWithRetry(Long productId, int quantity) {
        Product product = productRepo.findById(productId).orElseThrow();
        product.setStock(product.getStock() - quantity);
    }

    // コントローラーでの例外ハンドリング
    // @ExceptionHandler(OptimisticLockingFailureException.class)
    // public ResponseEntity<String> handleConflict() {
    //     return ResponseEntity.status(HttpStatus.CONFLICT)
    //         .body("他のユーザーがデータを更新しました。再読込してください。");
    // }
}`,
      },
      {
        title: "悲観的ロック",
        content:
          "悲観的ロック（Pessimistic Locking）は、データ読み取り時にDBレベルのロック（SELECT ... FOR UPDATE）を取得し、他のトランザクションからの変更をブロックする仕組みです。在庫管理や座席予約など、確実に排他制御が必要な場合に使用します。ロック待ちが発生するため、デッドロックのリスクとパフォーマンスへの影響に注意が必要です。",
        code: `// 悲観的ロックの実装

public interface ProductRepository extends JpaRepository<Product, Long> {

    // PESSIMISTIC_WRITE: 排他ロック（SELECT ... FOR UPDATE）
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findByIdForUpdate(@Param("id") Long id);

    // PESSIMISTIC_READ: 共有ロック（SELECT ... FOR SHARE）
    @Lock(LockModeType.PESSIMISTIC_READ)
    @Query("SELECT p FROM Product p WHERE p.id = :id")
    Optional<Product> findByIdWithSharedLock(@Param("id") Long id);
}

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final ProductRepository productRepo;

    // 在庫減算（悲観的ロックで排他制御）
    @Transactional
    public void decreaseStock(Long productId, int quantity) {
        // SELECT * FROM products WHERE id = ? FOR UPDATE
        // → 他のトランザクションはこの行の更新をブロックされる
        Product product = productRepo.findByIdForUpdate(productId)
            .orElseThrow(() ->
                new ProductNotFoundException(productId));

        if (product.getStock() < quantity) {
            throw new InsufficientStockException(
                product.getName(), product.getStock(), quantity);
        }

        product.setStock(product.getStock() - quantity);
        // トランザクション終了時にロック解放
    }

    // EntityManager での悲観的ロック
    @Transactional
    public void lockWithEntityManager(Long productId) {
        Product product = em.find(
            Product.class, productId,
            LockModeType.PESSIMISTIC_WRITE,
            Map.of(
                "jakarta.persistence.lock.timeout", 5000  // 5秒タイムアウト
            )
        );
    }
}`,
      },
      {
        title: "トランザクション分離レベル",
        content:
          "トランザクション分離レベルは、並行トランザクション間のデータの見え方を制御します。READ_UNCOMMITTED（最も緩い）、READ_COMMITTED（PostgreSQLのデフォルト）、REPEATABLE_READ（MySQLのデフォルト）、SERIALIZABLE（最も厳しい）の4段階があります。分離レベルが低いほどパフォーマンスが良く、高いほどデータの一貫性が保証されます。",
        code: `// トランザクション分離レベルの設定

@Service
public class ReportService {

    // 分離レベルを指定
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public Report generateReport() {
        // READ_COMMITTED: コミット済みのデータだけ読む
        // → ダーティリードは防止、ノンリピータブルリードは発生しうる
        return createReport();
    }

    @Transactional(isolation = Isolation.REPEATABLE_READ)
    public BigDecimal calculateTotal() {
        // REPEATABLE_READ: トランザクション中は同じデータが読める
        // → ノンリピータブルリードも防止
        BigDecimal total1 = getTotal();
        // ... 何か処理 ...
        BigDecimal total2 = getTotal();
        // total1 == total2 が保証される
        return total1;
    }

    @Transactional(isolation = Isolation.SERIALIZABLE)
    public void criticalOperation() {
        // SERIALIZABLE: 完全な直列化
        // → ファントムリードも防止、最も安全だがパフォーマンス最低
    }
}

// 分離レベルと問題の対応表:
// ┌──────────────────┬────────────┬──────────────────┬──────────────┐
// │ 分離レベル        │ ダーティ    │ ノンリピータブル  │ ファントム    │
// │                  │ リード      │ リード           │ リード       │
// ├──────────────────┼────────────┼──────────────────┼──────────────┤
// │ READ_UNCOMMITTED │ 発生する    │ 発生する         │ 発生する      │
// │ READ_COMMITTED   │ 防止       │ 発生する         │ 発生する      │
// │ REPEATABLE_READ  │ 防止       │ 防止            │ 発生する      │
// │ SERIALIZABLE     │ 防止       │ 防止            │ 防止         │
// └──────────────────┴────────────┴──────────────────┴──────────────┘
// 推奨: ほとんどのケースで READ_COMMITTED で十分`,
      },
      {
        title: "デッドロック対策",
        content:
          "デッドロックは、2つ以上のトランザクションが互いにロック解放を待ち合う状態です。デッドロックが検知されるとDBが一方のトランザクションを強制ロールバックします。対策として、ロック取得順序の統一、トランザクション時間の短縮、タイムアウトの設定、リトライ機構の実装が重要です。",
        code: `// デッドロック対策のベストプラクティス

// 1. ロック取得順序を統一する
@Service
@RequiredArgsConstructor
public class TransferService {

    private final AccountRepository accountRepo;

    @Transactional
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        // NG: from → to の順でロック（逆方向の送金とデッドロック）
        // Account from = accountRepo.findByIdForUpdate(fromId);
        // Account to = accountRepo.findByIdForUpdate(toId);

        // OK: ID の小さい順にロック（常に同じ順序）
        Long firstId = Math.min(fromId, toId);
        Long secondId = Math.max(fromId, toId);

        Account first = accountRepo.findByIdForUpdate(firstId).orElseThrow();
        Account second = accountRepo.findByIdForUpdate(secondId).orElseThrow();

        Account from = fromId.equals(firstId) ? first : second;
        Account to = toId.equals(firstId) ? first : second;

        from.withdraw(amount);
        to.deposit(amount);
    }
}

// 2. タイムアウト付きロック
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @QueryHints(@QueryHint(
        name = "jakarta.persistence.lock.timeout",
        value = "3000"  // 3秒でタイムアウト
    ))
    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Optional<Account> findByIdForUpdate(@Param("id") Long id);
}

// 3. デッドロック時のリトライ
@Retryable(
    retryFor = {
        CannotAcquireLockException.class,
        PessimisticLockException.class,
        DeadlockLoserDataAccessException.class
    },
    maxAttempts = 3,
    backoff = @Backoff(delay = 200, multiplier = 2)
)
@Transactional
public void updateWithRetry(Long id, UpdateDto dto) {
    // デッドロックで失敗しても最大3回リトライ
}`,
      },
    ],
  },
];

export type JpaLevel = "basics" | "entity" | "query" | "advanced";

export interface JpaQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: JpaLevel;
  chapter: string;
}

export const jpaQuizQuestions: JpaQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: JPA基礎 (jpa-basics) 4問
  // ════════════════════════════════════════
  {
    id: "jpa-basics-q01",
    question: "JPA（Jakarta Persistence API）とHibernateの関係として正しいものはどれですか？",
    choices: [
      { label: "A", text: "JPAとHibernateは同じライブラリである" },
      { label: "B", text: "JPAは仕様（API）で、Hibernateはその実装の一つである" },
      { label: "C", text: "HibernateはJPAの上位互換であり、JPAを含む" },
      { label: "D", text: "JPAはHibernateの後継ライブラリである" },
    ],
    correctLabel: "B",
    explanation:
      "JPAはJava EE/Jakarta EEのORM仕様（インターフェース）です。HibernateはJPA仕様の最も広く使われている実装です。他にEclipseLink等の実装もあります。JPAを使うことで実装の切り替えが容易になります。",
    level: "basics",
    chapter: "jpa-basics",
  },
  {
    id: "jpa-basics-q02",
    question: "JPAのEntityManagerの役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "データベースの接続プールを管理する" },
      { label: "B", text: "エンティティのライフサイクル（永続化、検索、削除等）を管理する" },
      { label: "C", text: "SQLの構文チェックを行う" },
      { label: "D", text: "テーブルのスキーマ定義を行う" },
    ],
    correctLabel: "B",
    explanation:
      "EntityManagerはJPAの中核となるインターフェースで、エンティティの永続化（persist）、検索（find）、更新（merge）、削除（remove）等のライフサイクル管理を行います。永続化コンテキストを通じてエンティティの状態を追跡します。",
    level: "basics",
    chapter: "jpa-basics",
  },
  {
    id: "jpa-basics-q03",
    question: "JPAの永続化コンテキスト（Persistence Context）の特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "エンティティのキャッシュ機能はない" },
      { label: "B", text: "同一トランザクション内で同じIDのエンティティは同一インスタンスを返す（1次キャッシュ）" },
      { label: "C", text: "トランザクション終了後もエンティティの変更を追跡する" },
      { label: "D", text: "複数のEntityManagerで共有される" },
    ],
    correctLabel: "B",
    explanation:
      "永続化コンテキストは1次キャッシュとして機能し、同一トランザクション内でfindを複数回呼んでも同じIDのエンティティは同一のJavaオブジェクトを返します。これによりDBアクセスを減らし、一貫性を保ちます。",
    level: "basics",
    chapter: "jpa-basics",
  },
  {
    id: "jpa-basics-q04",
    question: "JPAでエンティティの状態として存在しないものはどれですか？",
    choices: [
      { label: "A", text: "New（新規）" },
      { label: "B", text: "Managed（管理状態）" },
      { label: "C", text: "Detached（分離状態）" },
      { label: "D", text: "Locked（ロック状態）" },
    ],
    correctLabel: "D",
    explanation:
      "JPAのエンティティは New（未永続化）、Managed（永続化コンテキストで管理中）、Detached（永続化コンテキストから分離）、Removed（削除予定）の4つの状態を持ちます。Locked（ロック状態）というライフサイクル状態は存在しません。",
    level: "basics",
    chapter: "jpa-basics",
  },
  // ════════════════════════════════════════
  // entity: エンティティマッピング (jpa-entity) 4問
  // ════════════════════════════════════════
  {
    id: "jpa-entity-q01",
    question: "JPAの@ManyToOneアノテーションでfetch属性のデフォルト値はどれですか？",
    choices: [
      { label: "A", text: "FetchType.LAZY" },
      { label: "B", text: "FetchType.EAGER" },
      { label: "C", text: "FetchType.AUTO" },
      { label: "D", text: "FetchType.NONE" },
    ],
    correctLabel: "B",
    explanation:
      "@ManyToOneと@OneToOneのデフォルトフェッチタイプはEAGER（即時読み込み）です。@OneToManyと@ManyToManyのデフォルトはLAZY（遅延読み込み）です。パフォーマンスの観点から@ManyToOneもLAZYに設定するのが推奨プラクティスです。",
    code: "@ManyToOne(fetch = FetchType.LAZY)\n@JoinColumn(name = \"department_id\")\nprivate Department department;",
    level: "entity",
    chapter: "jpa-entity",
  },
  {
    id: "jpa-entity-q02",
    question: "JPAの@Embeddableと@Embeddedの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "テーブルの結合に使用する" },
      { label: "B", text: "値オブジェクト（住所等）を別テーブルではなく同一テーブルの列としてマッピングする" },
      { label: "C", text: "エンティティの継承関係を定義する" },
      { label: "D", text: "複合主キーの定義にのみ使用する" },
    ],
    correctLabel: "B",
    explanation:
      "@Embeddableクラスは独自のテーブルを持たず、埋め込み先エンティティのテーブルの列としてマッピングされます。住所（Address）や金額（Money）などのValueObjectを表現するのに適しています。DDD的な設計で活用されます。",
    code: "@Embeddable\npublic class Address {\n    private String city;\n    private String street;\n    private String zipCode;\n}\n\n@Entity\npublic class User {\n    @Embedded\n    private Address address;\n}",
    level: "entity",
    chapter: "jpa-entity",
  },
  {
    id: "jpa-entity-q03",
    question: "JPAのカスケード（CascadeType.ALL）の動作として正しいものはどれですか？",
    choices: [
      { label: "A", text: "親エンティティの操作（保存、削除等）が子エンティティにも自動的に伝播する" },
      { label: "B", text: "子エンティティの操作が親エンティティに伝播する" },
      { label: "C", text: "データベースの外部キー制約が自動設定される" },
      { label: "D", text: "トランザクションが自動的にコミットされる" },
    ],
    correctLabel: "A",
    explanation:
      "CascadeType.ALLは親エンティティに対するpersist、merge、remove等の全操作を関連する子エンティティにも自動的に伝播します。例えば注文（Order）を保存すると注文明細（OrderItem）も自動保存されます。ただしCascadeType.REMOVEは慎重に使う必要があります。",
    code: "@OneToMany(mappedBy = \"order\", cascade = CascadeType.ALL, orphanRemoval = true)\nprivate List<OrderItem> items = new ArrayList<>();",
    level: "entity",
    chapter: "jpa-entity",
  },
  {
    id: "jpa-entity-q04",
    question: "JPAの楽観的ロック（Optimistic Locking）を実装するアノテーションはどれですか？",
    choices: [
      { label: "A", text: "@Lock" },
      { label: "B", text: "@Version" },
      { label: "C", text: "@OptimisticLock" },
      { label: "D", text: "@ConcurrencyControl" },
    ],
    correctLabel: "B",
    explanation:
      "@Versionをエンティティのフィールドに付与すると楽観的ロックが有効になります。更新時にバージョン番号を比較し、他のトランザクションが先に更新していた場合はOptimisticLockExceptionがスローされます。同時更新の競合を検出できます。",
    code: "@Entity\npublic class Product {\n    @Id\n    private Long id;\n    @Version\n    private Long version;\n    private String name;\n    private int stock;\n}",
    level: "entity",
    chapter: "jpa-entity",
  },
  // ════════════════════════════════════════
  // query: JPQL・クエリ (jpa-query) 4問
  // ════════════════════════════════════════
  {
    id: "jpa-query-q01",
    question: "JPQLとネイティブSQLの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "JPQLはテーブル名を使い、ネイティブSQLはエンティティ名を使う" },
      { label: "B", text: "JPQLはエンティティとプロパティ名を使い、ネイティブSQLはテーブルとカラム名を使う" },
      { label: "C", text: "両者は完全に同じ構文である" },
      { label: "D", text: "JPQLはSELECT文のみ使用可能" },
    ],
    correctLabel: "B",
    explanation:
      "JPQL（Jakarta Persistence Query Language）はエンティティクラス名とプロパティ名を使ってクエリを記述します。データベースに依存しないため移植性が高いです。ネイティブSQLはデータベース固有のSQLを直接記述するため、複雑なクエリに対応できます。",
    code: "// JPQL\n@Query(\"SELECT u FROM User u WHERE u.email = :email\")\nUser findByEmail(@Param(\"email\") String email);\n\n// ネイティブSQL\n@Query(value = \"SELECT * FROM users WHERE email = :email\", nativeQuery = true)\nUser findByEmailNative(@Param(\"email\") String email);",
    level: "query",
    chapter: "jpa-query",
  },
  {
    id: "jpa-query-q02",
    question: "N+1問題の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "N個のテーブルを結合する際にN+1個のインデックスが必要になる" },
      { label: "B", text: "1回のクエリでリストを取得後、各要素の関連エンティティを個別にN回取得してしまう" },
      { label: "C", text: "N+1個のトランザクションが必要になる" },
      { label: "D", text: "データベースのコネクション数がN+1個必要になる" },
    ],
    correctLabel: "B",
    explanation:
      "N+1問題は、親エンティティをN件取得する1回目のクエリの後、各親の関連エンティティを個別にN回クエリで取得してしまう問題です。合計N+1回のSQLが発行され、パフォーマンスが大幅に低下します。",
    level: "query",
    chapter: "jpa-query",
  },
  {
    id: "jpa-query-q03",
    question: "N+1問題の解決策として最も一般的な方法はどれですか？",
    choices: [
      { label: "A", text: "FetchType.EAGERに全て変更する" },
      { label: "B", text: "JPQL の JOIN FETCH で関連エンティティを一括取得する" },
      { label: "C", text: "トランザクション分離レベルを変更する" },
      { label: "D", text: "インデックスを追加する" },
    ],
    correctLabel: "B",
    explanation:
      "JOIN FETCHを使うとJPQLで関連エンティティを1回のクエリで一括取得できます。EAGERに変更するとすべての場面で即時読み込みされるため推奨されません。@EntityGraphやBatch Fetchも有効な対策です。",
    code: "@Query(\"SELECT o FROM Order o JOIN FETCH o.items WHERE o.userId = :userId\")\nList<Order> findOrdersWithItems(@Param(\"userId\") Long userId);",
    level: "query",
    chapter: "jpa-query",
  },
  {
    id: "jpa-query-q04",
    question: "Spring Data JPAの@Queryで更新系のJPQLを実行する際に必要なアノテーションはどれですか？",
    choices: [
      { label: "A", text: "@Query のみで十分" },
      { label: "B", text: "@Query + @Modifying + @Transactional" },
      { label: "C", text: "@Update" },
      { label: "D", text: "@Query + @Commit" },
    ],
    correctLabel: "B",
    explanation:
      "更新・削除系のJPQL（UPDATE、DELETE文）には@Queryに加えて@Modifyingが必要です。また@Transactionalでトランザクション内での実行を保証します。@Modifying(clearAutomatically = true)を指定すると、実行後に永続化コンテキストがクリアされます。",
    code: "@Modifying\n@Transactional\n@Query(\"UPDATE User u SET u.status = :status WHERE u.lastLogin < :date\")\nint deactivateInactiveUsers(@Param(\"status\") String status, @Param(\"date\") LocalDate date);",
    level: "query",
    chapter: "jpa-query",
  },
  // ════════════════════════════════════════
  // advanced: JPA応用 (jpa-advanced) 3問
  // ════════════════════════════════════════
  {
    id: "jpa-advanced-q01",
    question: "Hibernateの2次キャッシュについて正しい説明はどれですか？",
    choices: [
      { label: "A", text: "1次キャッシュと同じくEntityManager単位で管理される" },
      { label: "B", text: "SessionFactory（アプリケーション）単位で管理され、複数トランザクション間で共有される" },
      { label: "C", text: "デフォルトで有効になっている" },
      { label: "D", text: "クエリ結果はキャッシュできない" },
    ],
    correctLabel: "B",
    explanation:
      "2次キャッシュはSessionFactory（アプリケーション）レベルで管理され、複数のトランザクション・セッション間で共有されます。1次キャッシュはEntityManager/Session単位です。2次キャッシュはデフォルト無効で、明示的に設定が必要です。EhcacheやRedisなどのプロバイダを使います。",
    level: "advanced",
    chapter: "jpa-advanced",
  },
  {
    id: "jpa-advanced-q02",
    question: "JPAのペシミスティックロック（悲観的ロック）を使うべき場面はどれですか？",
    choices: [
      { label: "A", text: "読み取りが多く更新が少ない場合" },
      { label: "B", text: "データの競合が頻繁に発生し、ロールバックのコストが高い場合" },
      { label: "C", text: "ロックは不要な場合" },
      { label: "D", text: "分散システムでの通信" },
    ],
    correctLabel: "B",
    explanation:
      "悲観的ロック（PESSIMISTIC_WRITE等）はデータの競合が頻繁に発生する場面で使います。トランザクション開始時にDBレベルでロックを取得し、他のトランザクションのアクセスをブロックします。楽観的ロックより競合発生時のリトライコストを回避できます。",
    code: "@Lock(LockModeType.PESSIMISTIC_WRITE)\n@Query(\"SELECT p FROM Product p WHERE p.id = :id\")\nProduct findByIdForUpdate(@Param(\"id\") Long id);",
    level: "advanced",
    chapter: "jpa-advanced",
  },
  {
    id: "jpa-advanced-q03",
    question: "JPAのDTOプロジェクションの利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "エンティティの全カラムを取得するためデータの欠損がない" },
      { label: "B", text: "必要なカラムのみ取得でき、永続化コンテキストの管理対象外のため軽量" },
      { label: "C", text: "DTOは自動的にキャッシュされる" },
      { label: "D", text: "DTOは更新操作にも使用できる" },
    ],
    correctLabel: "B",
    explanation:
      "DTOプロジェクションはSELECT句で必要なカラムのみを取得するため、ネットワーク転送量とメモリ使用量が削減されます。またDTOはManaged状態にならないため、永続化コンテキストによるダーティチェックのオーバーヘッドもありません。読み取り専用のクエリに最適です。",
    code: "@Query(\"SELECT new com.example.dto.UserSummary(u.name, u.email) FROM User u WHERE u.active = true\")\nList<UserSummary> findActiveUserSummaries();",
    level: "advanced",
    chapter: "jpa-advanced",
  },
];

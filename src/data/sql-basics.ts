export interface SqlBasicsSection {
  title: string;
  content: string;
  code?: string;
}

export interface SqlBasicsChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: SqlBasicsSection[];
}

export interface SqlBasicsCategory {
  id: string;
  name: string;
  color: string;
}

export const sqlBasicsCategories = [
  { id: "ddl", name: "データ定義", color: "#2563EB" },
  { id: "dml", name: "データ操作", color: "#059669" },
  { id: "advanced", name: "応用SQL", color: "#D97706" },
  { id: "practice", name: "実践", color: "#7C3AED" },
] as const;

export const sqlBasicsChapters: SqlBasicsChapter[] = [
  // ===== データ定義 (DDL) =====
  {
    id: "create-table",
    title: "テーブル作成と型",
    category: "ddl",
    description:
      "CREATE TABLE文によるテーブル定義、主要なデータ型、制約の設定方法を学ぶ",
    sections: [
      {
        title: "CREATE TABLE の基本構文",
        content:
          "CREATE TABLE文はリレーショナルデータベースにおけるテーブルの定義を行うSQL文です。テーブル名、カラム名、データ型、制約を指定して、データを格納する構造を作成します。テーブル名やカラム名には命名規則があり、予約語を避け、スネークケース（例: user_name）を使用するのが一般的です。IF NOT EXISTS を付けることで、既にテーブルが存在する場合のエラーを回避できます。",
        code: `-- 基本的なテーブル作成
CREATE TABLE users (
    id          BIGINT       PRIMARY KEY AUTO_INCREMENT,
    username    VARCHAR(50)  NOT NULL UNIQUE,
    email       VARCHAR(255) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- IF NOT EXISTS を使った安全な作成
CREATE TABLE IF NOT EXISTS departments (
    id          INT          PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(100) NOT NULL,
    description TEXT
);`,
      },
      {
        title: "主要なデータ型",
        content:
          "SQLのデータ型はデータベース製品ごとに多少異なりますが、標準的な型は共通しています。数値型にはINT（整数）、BIGINT（大きな整数）、DECIMAL（固定小数点）、FLOAT/DOUBLE（浮動小数点）があります。文字列型にはCHAR（固定長）、VARCHAR（可変長）、TEXT（長文）があり、VARCHARは最大長を指定します。日時型にはDATE（日付）、TIME（時刻）、TIMESTAMP（日時）、DATETIME（日時）があります。BOOLEAN型は真偽値を扱います。適切なデータ型を選択することで、ストレージの最適化とデータの整合性を保つことができます。",
        code: `-- 数値型の例
CREATE TABLE products (
    id          BIGINT        PRIMARY KEY AUTO_INCREMENT,
    name        VARCHAR(200)  NOT NULL,
    price       DECIMAL(10,2) NOT NULL,        -- 小数点以下2桁の金額
    weight      DOUBLE,                         -- 浮動小数点
    stock       INT           NOT NULL DEFAULT 0,
    is_active   BOOLEAN       NOT NULL DEFAULT TRUE
);

-- 日時型の例
CREATE TABLE events (
    id          INT           PRIMARY KEY AUTO_INCREMENT,
    title       VARCHAR(200)  NOT NULL,
    event_date  DATE          NOT NULL,         -- 日付のみ (2026-03-20)
    start_time  TIME          NOT NULL,         -- 時刻のみ (14:30:00)
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- 文字列型の比較
-- CHAR(10)    : 固定長10文字（空きはスペース埋め）
-- VARCHAR(255): 可変長最大255文字
-- TEXT         : 長い文字列（最大長は製品依存）`,
      },
      {
        title: "PRIMARY KEY と FOREIGN KEY",
        content:
          "PRIMARY KEY（主キー）はテーブル内の各行を一意に識別するカラムまたはカラムの組み合わせです。主キーにはNULL値が許可されず、重複も許されません。AUTO_INCREMENTを付けると、INSERT時に自動で連番が振られます。FOREIGN KEY（外部キー）は他のテーブルの主キーを参照し、テーブル間のリレーションシップを定義します。外部キーによって参照整合性が保証され、親テーブルに存在しない値を子テーブルに挿入しようとするとエラーになります。ON DELETE CASCADE を指定すると、親レコード削除時に子レコードも自動削除されます。",
        code: `-- 主キーと外部キーの定義
CREATE TABLE orders (
    id          BIGINT    PRIMARY KEY AUTO_INCREMENT,
    user_id     BIGINT    NOT NULL,
    order_date  DATE      NOT NULL DEFAULT (CURRENT_DATE),
    total       DECIMAL(12,2) NOT NULL,
    status      VARCHAR(20)   NOT NULL DEFAULT 'PENDING',

    -- 外部キー制約
    CONSTRAINT fk_orders_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE order_items (
    id          BIGINT        PRIMARY KEY AUTO_INCREMENT,
    order_id    BIGINT        NOT NULL,
    product_id  BIGINT        NOT NULL,
    quantity    INT           NOT NULL,
    unit_price  DECIMAL(10,2) NOT NULL,

    -- 複数の外部キー
    CONSTRAINT fk_items_order
        FOREIGN KEY (order_id) REFERENCES orders(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_items_product
        FOREIGN KEY (product_id) REFERENCES products(id)
        ON DELETE RESTRICT
);

-- 複合主キー（中間テーブル）
CREATE TABLE user_roles (
    user_id  BIGINT NOT NULL,
    role_id  INT    NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (role_id) REFERENCES roles(id)
);`,
      },
      {
        title: "NOT NULL・UNIQUE・DEFAULT 制約",
        content:
          "制約（Constraint）はカラムに格納できる値にルールを設定し、データの整合性を保つ仕組みです。NOT NULLはNULL値の挿入を禁止し、必須入力を強制します。UNIQUEは重複値を禁止し、一意性を保証します（NULLは許可される場合があります）。DEFAULTはINSERT時に値が指定されなかった場合のデフォルト値を設定します。CHECK制約はカラムの値が特定の条件を満たすことを検証します。これらの制約を適切に組み合わせることで、アプリケーションコードに頼らずデータベースレベルで品質を担保できます。",
        code: `-- 各種制約の例
CREATE TABLE employees (
    id          BIGINT       PRIMARY KEY AUTO_INCREMENT,
    first_name  VARCHAR(50)  NOT NULL,
    last_name   VARCHAR(50)  NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE,
    age         INT          CHECK (age >= 18 AND age <= 100),
    salary      DECIMAL(10,2) CHECK (salary > 0),
    department  VARCHAR(50)  NOT NULL DEFAULT 'GENERAL',
    hire_date   DATE         NOT NULL DEFAULT (CURRENT_DATE),
    status      VARCHAR(20)  NOT NULL DEFAULT 'ACTIVE'
                             CHECK (status IN ('ACTIVE', 'INACTIVE', 'ON_LEAVE'))
);

-- テーブルレベルの制約（名前付き）
CREATE TABLE reservations (
    id         BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id    INT    NOT NULL,
    start_date DATE   NOT NULL,
    end_date   DATE   NOT NULL,
    guest_name VARCHAR(100) NOT NULL,

    -- 名前付き制約（エラーメッセージが分かりやすくなる）
    CONSTRAINT chk_date_range
        CHECK (end_date > start_date),
    CONSTRAINT uq_room_date
        UNIQUE (room_id, start_date)
);`,
      },
      {
        title: "ALTER TABLE によるテーブル変更",
        content:
          "ALTER TABLE文は既存のテーブル構造を変更するために使用します。カラムの追加（ADD COLUMN）、削除（DROP COLUMN）、変更（MODIFY / ALTER COLUMN）、制約の追加・削除が可能です。本番環境でALTER TABLEを実行する際は、テーブルのロックやダウンタイムに注意が必要です。大規模なテーブルではオンラインDDL（pt-online-schema-change等）の使用を検討してください。DROP TABLE文はテーブル自体を削除します。TRUNCATE TABLEはテーブルの全データを高速に削除しますが、ロールバックできない点に注意してください。",
        code: `-- カラムの追加
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
ALTER TABLE users ADD COLUMN bio TEXT AFTER email;

-- カラムの変更
ALTER TABLE users MODIFY COLUMN phone VARCHAR(30) NOT NULL;

-- カラム名の変更
ALTER TABLE users RENAME COLUMN phone TO phone_number;

-- カラムの削除
ALTER TABLE users DROP COLUMN bio;

-- 制約の追加
ALTER TABLE users ADD CONSTRAINT chk_email
    CHECK (email LIKE '%@%.%');

-- インデックスの追加
ALTER TABLE users ADD INDEX idx_username (username);

-- 外部キーの追加
ALTER TABLE orders ADD CONSTRAINT fk_user
    FOREIGN KEY (user_id) REFERENCES users(id);

-- 外部キーの削除
ALTER TABLE orders DROP FOREIGN KEY fk_user;

-- テーブルの削除
DROP TABLE IF EXISTS temp_data;

-- 全データの高速削除（DDL扱い・ロールバック不可）
TRUNCATE TABLE log_entries;`,
      },
    ],
  },
  {
    id: "index-view",
    title: "インデックスとビュー",
    category: "ddl",
    description:
      "CREATE INDEXによるインデックス作成、CREATE VIEWによるビュー定義、パフォーマンスの基礎を学ぶ",
    sections: [
      {
        title: "インデックスの基本と種類",
        content:
          "インデックスはテーブルのデータ検索を高速化するためのデータ構造です。書籍の索引のように、特定の値を持つ行を素早く見つけることができます。B-Treeインデックスが最も一般的で、等価検索と範囲検索の両方に有効です。ハッシュインデックスは等価検索のみに特化しています。インデックスは検索を高速化しますが、INSERT/UPDATE/DELETE時にインデックスの更新コストが発生するため、むやみに作成すべきではありません。主キーにはクラスタインデックスが自動作成され、テーブルのデータそのものがそのインデックス順に物理的に格納されます。",
        code: `-- 基本的なインデックス作成
CREATE INDEX idx_users_email ON users(email);

-- ユニークインデックス（重複を許可しない）
CREATE UNIQUE INDEX uq_users_username ON users(username);

-- 複合インデックス（複数カラム）
CREATE INDEX idx_orders_user_date ON orders(user_id, order_date);

-- 部分インデックス（条件付き、PostgreSQL）
CREATE INDEX idx_active_users ON users(email)
    WHERE status = 'ACTIVE';

-- 降順インデックス
CREATE INDEX idx_orders_date_desc ON orders(order_date DESC);

-- カバリングインデックス（INCLUDE、PostgreSQL）
CREATE INDEX idx_orders_covering ON orders(user_id)
    INCLUDE (total, status);

-- インデックスの削除
DROP INDEX idx_users_email ON users;

-- インデックスの一覧確認（MySQL）
SHOW INDEX FROM users;`,
      },
      {
        title: "複合インデックスの設計",
        content:
          "複合インデックスは複数のカラムを組み合わせたインデックスで、カラムの順序が非常に重要です。左端のカラムから順にインデックスが利用され、途中のカラムをスキップすると、それ以降のカラムはインデックスが効きません（最左プレフィックスルール）。例えば、(a, b, c) の複合インデックスでは、WHERE a=1、WHERE a=1 AND b=2、WHERE a=1 AND b=2 AND c=3 はインデックスが効きますが、WHERE b=2 や WHERE c=3 では効きません。カーディナリティ（値の種類の多さ）が高いカラムを先頭に配置するのが基本的な設計指針です。",
        code: `-- 複合インデックスの例
CREATE INDEX idx_emp_dept_name ON employees(department, last_name, first_name);

-- ◎ インデックスが効くクエリ
SELECT * FROM employees WHERE department = 'SALES';
SELECT * FROM employees WHERE department = 'SALES' AND last_name = 'Tanaka';
SELECT * FROM employees WHERE department = 'SALES' AND last_name = 'Tanaka' AND first_name = 'Taro';

-- × インデックスが効かないクエリ
SELECT * FROM employees WHERE last_name = 'Tanaka';              -- 先頭カラムがない
SELECT * FROM employees WHERE department = 'SALES' AND first_name = 'Taro'; -- last_nameスキップ

-- ORDER BY でもインデックスが活用される
SELECT * FROM employees
    WHERE department = 'SALES'
    ORDER BY last_name, first_name;  -- インデックス順なのでソート不要

-- インデックスの使用状況の確認
EXPLAIN SELECT * FROM employees WHERE department = 'SALES' AND last_name = 'Tanaka';`,
      },
      {
        title: "ビューの作成と利用",
        content:
          "ビュー（VIEW）は保存されたSELECT文であり、仮想的なテーブルとして扱えます。ビュー自体はデータを保持せず、参照されるたびに元のクエリが実行されます。複雑なクエリを名前付きで保存でき、SQLの可読性が向上します。また、ビューを通じてアクセスを制限することでセキュリティを強化できます。ビューに対してSELECTだけでなく、条件を満たせばINSERT/UPDATE/DELETEも可能です（更新可能ビュー）。ただし、集約関数やJOINを含むビューは通常更新できません。",
        code: `-- 基本的なビュー作成
CREATE VIEW active_users AS
SELECT id, username, email, created_at
FROM users
WHERE status = 'ACTIVE';

-- ビューの使用（通常のテーブルと同様）
SELECT * FROM active_users WHERE username LIKE 'tanaka%';

-- 集約を含むビュー
CREATE VIEW department_stats AS
SELECT
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    AVG(e.salary) AS avg_salary,
    MAX(e.salary) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.id, d.name;

-- ビューの更新（OR REPLACE で既存を上書き）
CREATE OR REPLACE VIEW active_users AS
SELECT id, username, email, created_at, phone_number
FROM users
WHERE status = 'ACTIVE';

-- ビューの削除
DROP VIEW IF EXISTS active_users;`,
      },
      {
        title: "マテリアライズドビュー",
        content:
          "マテリアライズドビュー（MATERIALIZED VIEW）は通常のビューと異なり、クエリの実行結果をテーブルとして実体化し、データを物理的に保持します。そのため、参照時にクエリを再実行する必要がなく、高速にデータを取得できます。集計処理など重いクエリの結果をキャッシュするのに適しています。ただし、元テーブルが更新されても自動では反映されないため、定期的にREFRESHを実行する必要があります。PostgreSQLではCONCURRENTLYオプションを使うことで、リフレッシュ中も読み取りアクセスを維持できます。MySQLにはマテリアライズドビューの組み込み機能はありませんが、テーブルとトリガーで同等の機能を実現できます。",
        code: `-- マテリアライズドビューの作成（PostgreSQL）
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT
    DATE_TRUNC('month', order_date) AS month,
    COUNT(*) AS order_count,
    SUM(total) AS total_sales,
    AVG(total) AS avg_order_value
FROM orders
WHERE status = 'COMPLETED'
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- マテリアライズドビューへのインデックス
CREATE INDEX idx_mv_monthly_sales ON monthly_sales(month);

-- データの参照（通常のテーブルと同じ）
SELECT * FROM monthly_sales WHERE month >= '2026-01-01';

-- データの更新（リフレッシュ）
REFRESH MATERIALIZED VIEW monthly_sales;

-- 読み取りロックなしのリフレッシュ（ユニークインデックスが必要）
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;

-- マテリアライズドビューの削除
DROP MATERIALIZED VIEW IF EXISTS monthly_sales;`,
      },
      {
        title: "インデックスとパフォーマンスの基本指針",
        content:
          "インデックスの設計はデータベースパフォーマンスに直結する重要な要素です。基本的な指針として、WHERE句、JOIN条件、ORDER BY句で頻繁に使用されるカラムにインデックスを作成します。ただし、カーディナリティが低いカラム（例: 性別やフラグ）には効果が薄い場合があります。更新頻度が高いテーブルではインデックスの数を最小限に抑えることが重要です。テーブルの行数が少ない場合はフルテーブルスキャンの方が速いこともあります。定期的にEXPLAINで実行計画を確認し、不要なインデックスは削除しましょう。",
        code: `-- インデックスが効果的なケース
-- 1. WHERE句の検索条件
CREATE INDEX idx_orders_status ON orders(status);
SELECT * FROM orders WHERE status = 'PENDING';

-- 2. JOIN条件のカラム（外部キー）
CREATE INDEX idx_orders_user_id ON orders(user_id);
SELECT u.username, o.total
FROM users u JOIN orders o ON u.id = o.user_id;

-- 3. ORDER BY + LIMIT の組み合わせ
CREATE INDEX idx_orders_date ON orders(order_date DESC);
SELECT * FROM orders ORDER BY order_date DESC LIMIT 10;

-- インデックスが効かないケース
-- 関数を適用した場合
SELECT * FROM users WHERE UPPER(email) = 'TEST@EXAMPLE.COM';  -- ×
-- → 関数インデックスを使う（PostgreSQL）
CREATE INDEX idx_users_email_upper ON users(UPPER(email));

-- LIKE の前方一致以外
SELECT * FROM users WHERE email LIKE '%@gmail.com';  -- × インデックス効かない
SELECT * FROM users WHERE email LIKE 'tanaka%';      -- ◎ インデックス効く

-- 否定条件
SELECT * FROM orders WHERE status != 'COMPLETED';    -- × 効果が薄い`,
      },
    ],
  },

  // ===== データ操作 (DML) =====
  {
    id: "select-basics",
    title: "SELECT基礎",
    category: "dml",
    description:
      "SELECT文の基本構文、WHERE条件、ORDER BY、LIMIT、DISTINCTの使い方を学ぶ",
    sections: [
      {
        title: "SELECT の基本構文",
        content:
          "SELECT文はデータベースからデータを取得するための最も基本的なSQL文です。SELECT句で取得するカラムを指定し、FROM句でテーブルを指定します。* を使うと全カラムを取得できますが、本番環境では必要なカラムのみを明示的に指定するのがベストプラクティスです。AS キーワードでカラムに別名（エイリアス）を付けることができ、結果セットの可読性が向上します。SELECT句では算術演算や文字列結合、関数の適用も可能です。",
        code: `-- 全カラムの取得（開発時のみ推奨）
SELECT * FROM users;

-- 特定カラムの取得（推奨）
SELECT id, username, email FROM users;

-- エイリアスの使用
SELECT
    id AS user_id,
    username AS "ユーザー名",
    email AS "メールアドレス"
FROM users;

-- 計算カラムの追加
SELECT
    name,
    price,
    stock,
    price * stock AS total_value
FROM products;

-- 文字列結合（MySQL: CONCAT / PostgreSQL: ||）
SELECT
    CONCAT(last_name, ' ', first_name) AS full_name,
    last_name || ' ' || first_name AS full_name_pg  -- PostgreSQL
FROM employees;`,
      },
      {
        title: "WHERE 句による条件指定",
        content:
          "WHERE句はSELECT文の結果を特定の条件で絞り込むために使用します。比較演算子（=, !=, <, >, <=, >=）、論理演算子（AND, OR, NOT）を組み合わせて複雑な条件を構築できます。BETWEEN演算子は範囲指定、IN演算子は値のリストとの一致判定、LIKE演算子はパターンマッチングに使用します。IS NULLとIS NOT NULLはNULL値の判定に使用し、= NULL は正しく動作しない点に注意してください。",
        code: `-- 比較演算子
SELECT * FROM products WHERE price >= 1000;
SELECT * FROM employees WHERE department != 'SALES';

-- AND / OR / NOT
SELECT * FROM products
WHERE price >= 500 AND price <= 2000 AND is_active = TRUE;

SELECT * FROM users
WHERE status = 'ACTIVE' OR status = 'PENDING';

SELECT * FROM users WHERE NOT (status = 'INACTIVE');

-- BETWEEN（範囲指定、両端を含む）
SELECT * FROM orders
WHERE order_date BETWEEN '2026-01-01' AND '2026-03-31';

-- IN（リスト内一致）
SELECT * FROM employees
WHERE department IN ('SALES', 'MARKETING', 'ENGINEERING');

-- LIKE（パターンマッチ）
SELECT * FROM users WHERE email LIKE '%@gmail.com';   -- 後方一致
SELECT * FROM users WHERE username LIKE 'tanaka%';     -- 前方一致
SELECT * FROM users WHERE username LIKE '_a%';         -- 2文字目がa

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE phone_number IS NULL;
SELECT * FROM employees WHERE phone_number IS NOT NULL;`,
      },
      {
        title: "ORDER BY と LIMIT",
        content:
          "ORDER BY句は結果セットの並び順を指定します。ASC（昇順、デフォルト）とDESC（降順）を指定でき、複数カラムでのソートも可能です。LIMIT句（MySQLとPostgreSQL）は取得する行数を制限し、OFFSET（またはMySQL の LIMIT offset, count 構文）と組み合わせることでページネーションを実装できます。ただし、OFFSETが大きくなるとパフォーマンスが劣化するため、大量データではカーソルベースのページネーション（WHERE id > last_id）が推奨されます。",
        code: `-- 昇順ソート（デフォルト）
SELECT * FROM products ORDER BY price ASC;

-- 降順ソート
SELECT * FROM products ORDER BY price DESC;

-- 複数カラムでソート
SELECT * FROM employees
ORDER BY department ASC, salary DESC;

-- LIMIT で件数制限
SELECT * FROM products ORDER BY price DESC LIMIT 10;

-- OFFSET でページネーション
-- 1ページ目（1-20件目）
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 0;
-- 2ページ目（21-40件目）
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 20;
-- 3ページ目（41-60件目）
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 40;

-- カーソルベースのページネーション（推奨）
-- 最初のページ
SELECT * FROM products ORDER BY id LIMIT 20;
-- 次のページ（前ページの最後のidを指定）
SELECT * FROM products WHERE id > 20 ORDER BY id LIMIT 20;

-- NULLの並び順制御（PostgreSQL）
SELECT * FROM employees ORDER BY phone_number NULLS LAST;`,
      },
      {
        title: "DISTINCT と集約関数の基本",
        content:
          "DISTINCTキーワードは結果セットから重複行を除去します。SELECT DISTINCT はすべてのカラムの組み合わせが一致する行を重複と判定します。集約関数はグループ全体に対して計算を行い、単一の値を返します。COUNT()は行数、SUM()は合計、AVG()は平均、MAX()は最大値、MIN()は最小値を計算します。COUNT(*)はNULLを含む全行を、COUNT(column)はNULL以外の行をカウントします。DISTINCT を集約関数内で使用することもできます。",
        code: `-- 重複除去
SELECT DISTINCT department FROM employees;

-- 複数カラムの組み合わせで重複除去
SELECT DISTINCT department, status FROM employees;

-- 集約関数
SELECT
    COUNT(*) AS total_count,              -- 全行数
    COUNT(phone_number) AS has_phone,     -- NULLでない行数
    COUNT(DISTINCT department) AS dept_count, -- ユニークな部署数
    SUM(salary) AS total_salary,          -- 給与合計
    AVG(salary) AS avg_salary,            -- 給与平均
    MAX(salary) AS max_salary,            -- 最高給与
    MIN(salary) AS min_salary             -- 最低給与
FROM employees;

-- 条件付きカウント（CASE式と組み合わせ）
SELECT
    COUNT(*) AS total,
    COUNT(CASE WHEN status = 'ACTIVE' THEN 1 END) AS active_count,
    COUNT(CASE WHEN status = 'INACTIVE' THEN 1 END) AS inactive_count
FROM employees;`,
      },
      {
        title: "CASE 式と条件分岐",
        content:
          "CASE式はSQLで条件分岐を実現する構文で、SELECT句、WHERE句、ORDER BY句など多くの場所で使用できます。単純CASE式（CASE column WHEN value THEN ...）と検索CASE式（CASE WHEN condition THEN ...）の2種類があります。CASE式はNULLの変換にも便利で、COALESCE関数やIFNULL（MySQL）/ NVL（Oracle）と同様の目的で使用できます。データの分類やラベル付け、条件付き集計など、さまざまな場面で活用されます。",
        code: `-- 検索CASE式
SELECT
    name,
    price,
    CASE
        WHEN price >= 10000 THEN '高額'
        WHEN price >= 5000  THEN '中額'
        WHEN price >= 1000  THEN '低額'
        ELSE '格安'
    END AS price_category
FROM products;

-- 単純CASE式
SELECT
    username,
    status,
    CASE status
        WHEN 'ACTIVE'   THEN '有効'
        WHEN 'INACTIVE' THEN '無効'
        WHEN 'PENDING'  THEN '保留'
        ELSE '不明'
    END AS status_label
FROM users;

-- NULLの変換
SELECT
    name,
    COALESCE(phone_number, '未登録') AS phone,  -- NULLを置換
    COALESCE(nickname, username, 'Anonymous') AS display_name  -- 最初の非NULL値
FROM users;

-- ORDER BY でのCASE式（カスタム並び順）
SELECT * FROM orders
ORDER BY
    CASE status
        WHEN 'URGENT'    THEN 1
        WHEN 'PENDING'   THEN 2
        WHEN 'SHIPPING'  THEN 3
        WHEN 'COMPLETED' THEN 4
        ELSE 5
    END;`,
      },
    ],
  },
  {
    id: "join-operations",
    title: "JOIN操作",
    category: "dml",
    description:
      "INNER JOIN、LEFT JOIN、RIGHT JOIN、CROSS JOINの種類と使い分け、結合条件の書き方を学ぶ",
    sections: [
      {
        title: "INNER JOIN（内部結合）",
        content:
          "INNER JOINは2つのテーブルで結合条件に一致する行のみを返します。どちらかのテーブルに一致する行がない場合、その行は結果に含まれません。最も基本的で一般的に使用される結合方法です。ON句で結合条件を指定します。USING句はカラム名が同じ場合に簡潔に記述できます。JOINのデフォルトはINNER JOINなので、INNERキーワードは省略可能です。",
        code: `-- 基本的なINNER JOIN
SELECT
    u.id,
    u.username,
    o.id AS order_id,
    o.total,
    o.order_date
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- 3テーブルの結合
SELECT
    u.username,
    o.id AS order_id,
    p.name AS product_name,
    oi.quantity,
    oi.unit_price
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN order_items oi ON o.id = oi.order_id
INNER JOIN products p ON oi.product_id = p.id
WHERE o.order_date >= '2026-01-01';

-- USING句（カラム名が同じ場合）
SELECT u.username, o.total
FROM users u
INNER JOIN orders o USING (id);  -- users.id = orders.id

-- JOINに追加条件を付ける
SELECT u.username, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id AND o.status = 'COMPLETED';`,
      },
      {
        title: "LEFT JOIN（左外部結合）",
        content:
          "LEFT JOIN（LEFT OUTER JOIN）は左テーブルの全行を返し、右テーブルに一致する行がない場合はNULLで埋めます。「注文していないユーザーも含めて一覧表示したい」といった場合に使用します。LEFT JOINの結果に対してWHERE句で右テーブルのカラムに条件を付けると、事実上INNER JOINと同じ結果になることがあるため注意が必要です。右テーブルに該当がないことを確認するには WHERE right_table.id IS NULL を使います。",
        code: `-- 基本的なLEFT JOIN
-- 注文の有無に関わらず全ユーザーを表示
SELECT
    u.username,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.total), 0) AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username;

-- 一致しない行を見つける（注文がないユーザー）
SELECT u.username, u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;

-- 複数テーブルのLEFT JOIN
SELECT
    d.name AS department_name,
    e.first_name,
    e.last_name,
    p.title AS project_title
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
LEFT JOIN projects p ON e.id = p.lead_id;

-- LEFT JOINでの注意点
-- × これはINNER JOINと同じ結果になる
SELECT u.*, o.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.status = 'COMPLETED';  -- NULLの行が除外される

-- ◎ 正しい書き方（ON句に条件を入れる）
SELECT u.*, o.*
FROM users u
LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'COMPLETED';`,
      },
      {
        title: "RIGHT JOIN と FULL OUTER JOIN",
        content:
          "RIGHT JOIN（RIGHT OUTER JOIN）はLEFT JOINの逆で、右テーブルの全行を返し、左テーブルに一致しない場合はNULLで埋めます。LEFT JOINでテーブルの順序を入れ替えれば同じ結果が得られるため、実務ではLEFT JOINの方が多く使われます。FULL OUTER JOINは両方のテーブルの全行を返し、一致しない行はNULLで埋めます。MySQL はFULL OUTER JOINをサポートしていないため、LEFT JOINとRIGHT JOINのUNIONで代替します。",
        code: `-- RIGHT JOIN
-- 全部署を表示（従業員がいない部署も含む）
SELECT
    e.first_name,
    e.last_name,
    d.name AS department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- 上記は以下のLEFT JOINと同じ結果
SELECT
    e.first_name,
    e.last_name,
    d.name AS department_name
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id;

-- FULL OUTER JOIN（PostgreSQL）
SELECT
    u.username,
    p.title AS profile_title
FROM users u
FULL OUTER JOIN profiles p ON u.id = p.user_id;

-- MySQLでFULL OUTER JOINを模倣
SELECT u.username, p.title AS profile_title
FROM users u
LEFT JOIN profiles p ON u.id = p.user_id
UNION
SELECT u.username, p.title AS profile_title
FROM users u
RIGHT JOIN profiles p ON u.id = p.user_id;`,
      },
      {
        title: "CROSS JOIN と自己結合",
        content:
          "CROSS JOIN（交差結合）は2つのテーブルのすべての行の組み合わせ（直積）を返します。結合条件を指定しないため、左テーブルがM行、右テーブルがN行の場合、結果はM×N行になります。組み合わせの生成やカレンダーテーブルの作成などに使用します。自己結合（Self Join）は同じテーブル同士を結合する手法で、階層構造のデータ（例: 上司と部下）を扱う際に使用します。エイリアスの使用が必須です。",
        code: `-- CROSS JOIN（全組み合わせ）
SELECT
    s.name AS size,
    c.name AS color
FROM sizes s
CROSS JOIN colors c;
-- sizes: S, M, L × colors: Red, Blue → 6行

-- CROSS JOINでカレンダー生成
SELECT
    y.year,
    m.month
FROM
    (SELECT 2025 AS year UNION ALL SELECT 2026) y
CROSS JOIN
    (SELECT 1 AS month UNION ALL SELECT 2 UNION ALL SELECT 3
     UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6
     UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
     UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) m
ORDER BY y.year, m.month;

-- 自己結合（上司-部下の関係）
SELECT
    e.first_name AS employee_name,
    m.first_name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- 自己結合（同じ部署の従業員ペア）
SELECT
    e1.first_name AS employee1,
    e2.first_name AS employee2
FROM employees e1
INNER JOIN employees e2 ON e1.department_id = e2.department_id
WHERE e1.id < e2.id;  -- 重複ペアを除外`,
      },
      {
        title: "JOINのパフォーマンスと最適化",
        content:
          "JOINのパフォーマンスはインデックスの有無に大きく依存します。結合条件に使用するカラム（特に外部キー）にはインデックスを作成しておくことが重要です。テーブルの結合順序はオプティマイザが最適な順序を決定しますが、統計情報が古いと不適切な実行計画が選ばれることがあります。大量のデータを結合する場合は、必要なカラムのみをSELECTし、WHERE句で事前に行を絞り込むことが効果的です。EXPLAINで結合方式（Nested Loop, Hash Join, Merge Join）を確認できます。",
        code: `-- JOINパフォーマンスの基本：外部キーにインデックスを作成
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- 悪い例：不要なカラムの取得と不要な結合
SELECT *
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;

-- 良い例：必要なカラムのみ取得、条件で絞り込み
SELECT
    u.username,
    o.order_date,
    p.name AS product_name,
    oi.quantity
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE o.order_date >= '2026-01-01'
  AND u.status = 'ACTIVE';

-- 実行計画の確認
EXPLAIN ANALYZE
SELECT u.username, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.username;`,
      },
    ],
  },
  {
    id: "aggregation-group",
    title: "集約とグループ化",
    category: "dml",
    description:
      "GROUP BY、HAVING句、各種集約関数（COUNT/SUM/AVG/MAX/MIN）の使い方を学ぶ",
    sections: [
      {
        title: "GROUP BY の基本",
        content:
          "GROUP BY句は指定したカラムの値が同じ行をグループにまとめ、集約関数で各グループの統計を計算します。GROUP BYを使用する場合、SELECT句に記載できるのはGROUP BYで指定したカラムと集約関数のみです。GROUP BYに含まれていないカラムをSELECT句に記載するとエラーになります（MySQLのsql_mode=ONLY_FULL_GROUP_BY の場合）。複数カラムでのグループ化も可能で、すべての組み合わせごとにグループが作成されます。",
        code: `-- 部署ごとの従業員数
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department;

-- 部署ごとの給与統計
SELECT
    department,
    COUNT(*) AS count,
    SUM(salary) AS total_salary,
    AVG(salary) AS avg_salary,
    MAX(salary) AS max_salary,
    MIN(salary) AS min_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- 複数カラムでのグループ化
SELECT
    department,
    status,
    COUNT(*) AS count
FROM employees
GROUP BY department, status
ORDER BY department, status;

-- 日付でのグループ化（月別集計）
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,  -- MySQL
    -- TO_CHAR(order_date, 'YYYY-MM') AS month, -- PostgreSQL
    COUNT(*) AS order_count,
    SUM(total) AS monthly_total
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month;`,
      },
      {
        title: "HAVING 句によるグループの絞り込み",
        content:
          "HAVING句はGROUP BYで集約した結果に対して条件を適用し、グループを絞り込みます。WHERE句が個々の行に対する条件であるのに対し、HAVING句はグループに対する条件です。WHERE句はGROUP BYの前に評価され、HAVING句はGROUP BYの後に評価されます。集約関数を含む条件はHAVING句に記述し、集約前に行を絞り込める条件はパフォーマンスのためにWHERE句に記述するのがベストプラクティスです。",
        code: `-- 5人以上の従業員がいる部署
SELECT
    department,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department
HAVING COUNT(*) >= 5;

-- 平均給与が50万以上の部署
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) >= 500000
ORDER BY avg_salary DESC;

-- WHERE と HAVING の組み合わせ
SELECT
    department,
    COUNT(*) AS active_count,
    AVG(salary) AS avg_salary
FROM employees
WHERE status = 'ACTIVE'        -- 個々の行の条件（GROUP BY前）
GROUP BY department
HAVING COUNT(*) >= 3           -- グループの条件（GROUP BY後）
ORDER BY avg_salary DESC;

-- 注文回数が3回以上のユーザー
SELECT
    u.username,
    COUNT(o.id) AS order_count,
    SUM(o.total) AS total_spent
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.order_date >= '2026-01-01'
GROUP BY u.id, u.username
HAVING COUNT(o.id) >= 3
ORDER BY total_spent DESC;`,
      },
      {
        title: "集約関数の応用",
        content:
          "集約関数はGROUP BYと組み合わせるだけでなく、さまざまな応用が可能です。GROUP_CONCAT（MySQL）やSTRING_AGG（PostgreSQL）はグループ内の値を文字列として連結します。条件付き集約はCASE式と組み合わせてピボットテーブルのような出力を実現します。NULLの扱いにも注意が必要で、SUM、AVG、MIN、MAXはNULLを無視しますが、全行がNULLの場合はNULLを返します。",
        code: `-- GROUP_CONCAT（MySQL）/ STRING_AGG（PostgreSQL）
-- 部署ごとの従業員名一覧
SELECT
    department,
    GROUP_CONCAT(first_name ORDER BY first_name SEPARATOR ', ') AS members  -- MySQL
    -- STRING_AGG(first_name, ', ' ORDER BY first_name) AS members          -- PostgreSQL
FROM employees
GROUP BY department;

-- 条件付き集約（ピボットテーブル風）
SELECT
    department,
    COUNT(CASE WHEN status = 'ACTIVE' THEN 1 END) AS active,
    COUNT(CASE WHEN status = 'INACTIVE' THEN 1 END) AS inactive,
    COUNT(CASE WHEN status = 'ON_LEAVE' THEN 1 END) AS on_leave
FROM employees
GROUP BY department;

-- 月別・ステータス別の集計
SELECT
    DATE_FORMAT(order_date, '%Y-%m') AS month,
    SUM(CASE WHEN status = 'COMPLETED' THEN total ELSE 0 END) AS completed_total,
    SUM(CASE WHEN status = 'CANCELLED' THEN total ELSE 0 END) AS cancelled_total,
    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS completed_count,
    COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END) AS cancelled_count
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m')
ORDER BY month;`,
      },
      {
        title: "ROLLUP と CUBE",
        content:
          "ROLLUP はGROUP BYの拡張で、指定したカラムの階層的な小計と総計を自動的に生成します。例えば GROUP BY ROLLUP(department, status) は、部署+ステータスごと、部署ごと、全体の3レベルの集計行を出力します。CUBEは指定したすべてのカラムの組み合わせに対する集計行を生成します。GROUPING関数を使用すると、集計行とデータ行を区別できます。これらは帳票やレポートの作成に便利です。",
        code: `-- ROLLUP（階層的な小計・総計）
SELECT
    COALESCE(department, '【全社合計】') AS department,
    COALESCE(status, '【小計】') AS status,
    COUNT(*) AS count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY ROLLUP(department, status);

-- 結果例:
-- SALES     | ACTIVE   | 10 | 5000000
-- SALES     | INACTIVE |  3 | 1200000
-- SALES     | 【小計】  | 13 | 6200000  ← 部署の小計
-- ENGINEERING| ACTIVE   | 15 | 9000000
-- ENGINEERING| 【小計】  | 15 | 9000000  ← 部署の小計
-- 【全社合計】| 【小計】  | 28 | 15200000 ← 全体の総計

-- GROUPING関数で集計行を判定
SELECT
    CASE WHEN GROUPING(department) = 1 THEN '全社合計' ELSE department END AS department,
    CASE WHEN GROUPING(status) = 1 THEN '小計' ELSE status END AS status,
    COUNT(*) AS count,
    SUM(salary) AS total_salary
FROM employees
GROUP BY ROLLUP(department, status);

-- CUBE（全組み合わせの集計、PostgreSQL）
SELECT
    department,
    status,
    COUNT(*) AS count
FROM employees
GROUP BY CUBE(department, status);`,
      },
      {
        title: "集約のパフォーマンスと注意点",
        content:
          "集約クエリのパフォーマンスを最適化するには、GROUP BY対象カラムにインデックスを作成し、WHERE句で集約前に行数を削減することが重要です。DISTINCT とGROUP BYは類似の結果を返しますが、集約関数が不要な場合はDISTINCT、集約関数と組み合わせる場合はGROUP BYを使用します。COUNT(*)とCOUNT(1)のパフォーマンスは現代のDBMSでは同等です。大量データの集約ではメモリ使用量に注意し、必要に応じてバッチ処理を検討してください。",
        code: `-- インデックスを活用した集約
CREATE INDEX idx_emp_dept_status ON employees(department, status);

-- WHERE句で事前に絞り込み（重要）
SELECT
    department,
    COUNT(*) AS count,
    AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2025-01-01'  -- 集約前に行を削減
GROUP BY department;

-- DISTINCTとGROUP BYの使い分け
-- 重複除去のみ → DISTINCT
SELECT DISTINCT department FROM employees;
-- 集約が必要 → GROUP BY
SELECT department, COUNT(*) FROM employees GROUP BY department;

-- 大量データの効率的な集計例
-- 日別の注文統計（インデックスとWHEREで最適化）
CREATE INDEX idx_orders_date_status ON orders(order_date, status);

SELECT
    order_date,
    COUNT(*) AS total_orders,
    SUM(total) AS daily_total,
    AVG(total) AS avg_order_value
FROM orders
WHERE order_date BETWEEN '2026-03-01' AND '2026-03-31'
  AND status = 'COMPLETED'
GROUP BY order_date
ORDER BY order_date;`,
      },
    ],
  },

  // ===== 応用SQL (Advanced) =====
  {
    id: "subquery",
    title: "サブクエリ",
    category: "advanced",
    description:
      "EXISTS、IN、相関サブクエリ、WITH句（CTE）によるサブクエリの活用を学ぶ",
    sections: [
      {
        title: "スカラサブクエリと導出テーブル",
        content:
          "サブクエリ（副問い合わせ）はクエリの中に埋め込まれたSELECT文です。スカラサブクエリは単一の値を返すサブクエリで、SELECT句やWHERE句の値として使用できます。導出テーブル（インラインビュー）はFROM句に記述するサブクエリで、一時的なテーブルとして扱えます。サブクエリは可読性を高めますが、パフォーマンスに影響する場合があるため、JOINで代替できるケースではJOINを検討してください。",
        code: `-- スカラサブクエリ（WHERE句内）
-- 平均給与より高い従業員
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- スカラサブクエリ（SELECT句内）
SELECT
    e.first_name,
    e.salary,
    (SELECT AVG(salary) FROM employees) AS company_avg,
    e.salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees e;

-- 導出テーブル（FROM句内のサブクエリ）
SELECT
    dept_stats.department,
    dept_stats.avg_salary,
    dept_stats.employee_count
FROM (
    SELECT
        department,
        AVG(salary) AS avg_salary,
        COUNT(*) AS employee_count
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE dept_stats.employee_count >= 5
ORDER BY dept_stats.avg_salary DESC;`,
      },
      {
        title: "IN と NOT IN サブクエリ",
        content:
          "INサブクエリは内部クエリが返すリストに値が含まれるかを判定します。「注文したことがあるユーザー」のように、別テーブルの条件に基づく検索に使用します。NOT INはリストに含まれないことを判定しますが、サブクエリの結果にNULLが含まれると想定外の結果になる問題があります。NOT INの代わりにNOT EXISTSを使用するのが安全です。ANY/ALL修飾子を使うと、サブクエリの結果に対して比較演算子を適用できます。",
        code: `-- IN サブクエリ
-- 注文したことがあるユーザー
SELECT username, email
FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- NOT IN サブクエリ
-- 注文したことがないユーザー
SELECT username, email
FROM users
WHERE id NOT IN (
    SELECT user_id FROM orders WHERE user_id IS NOT NULL  -- NULLに注意
);

-- NOT IN の問題点
-- ordersのuser_idにNULLが1つでもあると結果が空になる！
-- → NOT EXISTS を使うのが安全

-- ANY / ALL
-- いずれかの部署の平均給与より高い従業員
SELECT first_name, salary
FROM employees
WHERE salary > ANY (
    SELECT AVG(salary) FROM employees GROUP BY department
);

-- すべての部署の平均給与より高い従業員
SELECT first_name, salary
FROM employees
WHERE salary > ALL (
    SELECT AVG(salary) FROM employees GROUP BY department
);`,
      },
      {
        title: "EXISTS と相関サブクエリ",
        content:
          "EXISTS演算子はサブクエリが1行以上の結果を返すかどうかを判定します。相関サブクエリは外部クエリの各行に対してサブクエリが実行される形式で、外部クエリのカラムをサブクエリ内で参照します。EXISTSは一致する行が見つかった時点で評価を終了するため、大量データではINよりも効率的な場合があります。NOT EXISTSはNULLの問題がないため、NOT INよりも安全で推奨されます。",
        code: `-- EXISTS（注文がある顧客）
SELECT u.username, u.email
FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- NOT EXISTS（注文がない顧客・NOT INより安全）
SELECT u.username, u.email
FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- 相関サブクエリ（各部署で最高給与の従業員）
SELECT e1.first_name, e1.department, e1.salary
FROM employees e1
WHERE e1.salary = (
    SELECT MAX(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department  -- 外部クエリを参照
);

-- 相関サブクエリ（各ユーザーの最新注文）
SELECT u.username, o.order_date, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.order_date = (
    SELECT MAX(o2.order_date)
    FROM orders o2
    WHERE o2.user_id = u.id
);`,
      },
      {
        title: "WITH句（CTE: 共通テーブル式）",
        content:
          "WITH句（Common Table Expression / CTE）はサブクエリに名前を付けて定義し、メインクエリで参照できる構文です。複雑なクエリの可読性を大幅に向上させ、同じサブクエリを複数回参照する場合にコードの重複を防げます。複数のCTEをカンマ区切りで定義でき、後のCTEは先に定義されたCTEを参照できます。再帰CTE（WITH RECURSIVE）は階層データの探索やシーケンスの生成に利用されます。",
        code: `-- 基本的なCTE
WITH active_users AS (
    SELECT id, username, email
    FROM users
    WHERE status = 'ACTIVE'
)
SELECT au.username, COUNT(o.id) AS order_count
FROM active_users au
LEFT JOIN orders o ON au.id = o.user_id
GROUP BY au.id, au.username;

-- 複数CTEの定義
WITH
monthly_sales AS (
    SELECT
        DATE_FORMAT(order_date, '%Y-%m') AS month,
        SUM(total) AS total_sales
    FROM orders
    WHERE status = 'COMPLETED'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
),
avg_sales AS (
    SELECT AVG(total_sales) AS avg_monthly_sales
    FROM monthly_sales
)
SELECT
    ms.month,
    ms.total_sales,
    avs.avg_monthly_sales,
    CASE
        WHEN ms.total_sales >= avs.avg_monthly_sales THEN '平均以上'
        ELSE '平均以下'
    END AS evaluation
FROM monthly_sales ms
CROSS JOIN avg_sales avs
ORDER BY ms.month;

-- 再帰CTE（組織階層の探索）
WITH RECURSIVE org_tree AS (
    -- ベースケース（最上位の管理者）
    SELECT id, first_name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- 再帰ケース（部下を探索）
    SELECT e.id, e.first_name, e.manager_id, ot.level + 1
    FROM employees e
    INNER JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT * FROM org_tree ORDER BY level, id;`,
      },
      {
        title: "サブクエリとJOINの使い分け",
        content:
          "サブクエリとJOINは多くの場合で同じ結果を得られますが、特性が異なります。JOINは複数テーブルの結合に最適化されており、一般的にパフォーマンスが優れています。EXISTS/IN サブクエリは条件判定に、スカラサブクエリは単一値の取得に適しています。CTEは可読性の向上と複雑なロジックの分割に有効です。データベースのオプティマイザはサブクエリをJOINに書き換えることがありますが、意図を明確にするために適切な方を選ぶことが重要です。",
        code: `-- 同じ結果を得る3つの書き方

-- 1. JOIN
SELECT DISTINCT u.username
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 10000;

-- 2. IN サブクエリ
SELECT username
FROM users
WHERE id IN (
    SELECT user_id FROM orders WHERE total > 10000
);

-- 3. EXISTS サブクエリ
SELECT username
FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id AND o.total > 10000
);

-- CTEで段階的に処理を組み立てる
WITH
-- Step 1: 高額注文のユーザーID
high_value_users AS (
    SELECT user_id, SUM(total) AS total_spent
    FROM orders
    WHERE status = 'COMPLETED'
    GROUP BY user_id
    HAVING SUM(total) > 100000
),
-- Step 2: ユーザー情報と結合
user_details AS (
    SELECT
        u.username,
        u.email,
        hvu.total_spent
    FROM users u
    INNER JOIN high_value_users hvu ON u.id = hvu.user_id
)
-- Step 3: 最終結果
SELECT * FROM user_details ORDER BY total_spent DESC;`,
      },
    ],
  },
  {
    id: "window-functions",
    title: "ウィンドウ関数",
    category: "advanced",
    description:
      "ROW_NUMBER、RANK、PARTITION BY、LAG/LEADなどのウィンドウ関数を学ぶ",
    sections: [
      {
        title: "ウィンドウ関数の基本構文",
        content:
          "ウィンドウ関数（分析関数）は集約関数と異なり、行をグループにまとめずに各行に対して計算を行います。OVER句でウィンドウ（計算の対象範囲）を定義し、PARTITION BYでグループ化、ORDER BYで順序を指定します。GROUP BYが行をまとめて1行にするのに対し、ウィンドウ関数は元の行数を維持したまま計算結果を付加します。これにより、各行の詳細データと集計値を同時に取得できます。",
        code: `-- 集約関数との違い
-- GROUP BY: 行がまとまる（部署ごとに1行）
SELECT department, AVG(salary) FROM employees GROUP BY department;

-- ウィンドウ関数: 行はそのまま、計算結果が追加される
SELECT
    first_name,
    department,
    salary,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary,
    salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg
FROM employees;

-- PARTITION BY なし（全体が1つのウィンドウ）
SELECT
    first_name,
    salary,
    SUM(salary) OVER () AS total_salary,
    ROUND(salary * 100.0 / SUM(salary) OVER (), 2) AS salary_percentage
FROM employees;

-- 複数のウィンドウ関数を同時に使用
SELECT
    first_name,
    department,
    salary,
    COUNT(*) OVER (PARTITION BY department) AS dept_count,
    SUM(salary) OVER (PARTITION BY department) AS dept_total,
    MAX(salary) OVER (PARTITION BY department) AS dept_max,
    MIN(salary) OVER (PARTITION BY department) AS dept_min
FROM employees;`,
      },
      {
        title: "ROW_NUMBER、RANK、DENSE_RANK",
        content:
          "番号付け関数はORDER BYで指定した順序に基づいて各行に番号を割り振ります。ROW_NUMBER()は一意の連番を振り、同順位でも異なる番号になります。RANK()は同順位に同じ番号を振り、次の順位を飛ばします（1,2,2,4）。DENSE_RANK()は同順位に同じ番号を振りますが、次の順位を飛ばしません（1,2,2,3）。NTILE(n)は結果をn個のグループに均等分割します。これらはランキング、ページネーション、重複除去に広く使用されます。",
        code: `-- ROW_NUMBER: 一意の連番
SELECT
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
    first_name,
    salary
FROM employees;

-- RANK vs DENSE_RANK
SELECT
    first_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank_num,        -- 1,2,2,4
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_num  -- 1,2,2,3
FROM employees;

-- 部署ごとのランキング（PARTITION BY）
SELECT
    department,
    first_name,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;

-- 部署ごとのTop3を取得
SELECT * FROM (
    SELECT
        department,
        first_name,
        salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM employees
) ranked
WHERE rn <= 3;

-- NTILE: 4分位に分割
SELECT
    first_name,
    salary,
    NTILE(4) OVER (ORDER BY salary) AS quartile
FROM employees;`,
      },
      {
        title: "LAG、LEAD、FIRST_VALUE、LAST_VALUE",
        content:
          "LAG関数は現在の行より前の行の値を、LEAD関数は後の行の値を取得します。時系列データの前月比や前日比の計算に便利です。第2引数でオフセット（何行前/後か）、第3引数でデフォルト値を指定できます。FIRST_VALUE()はウィンドウの最初の値、LAST_VALUE()は最後の値を返します。NTH_VALUE(column, n)はn番目の値を返します。これらの関数を使うことで、自己結合なしに前後の行との比較が可能になります。",
        code: `-- LAG: 前の行の値を取得（前月比の計算）
SELECT
    month,
    total_sales,
    LAG(total_sales, 1) OVER (ORDER BY month) AS prev_month_sales,
    total_sales - LAG(total_sales, 1) OVER (ORDER BY month) AS month_diff,
    ROUND(
        (total_sales - LAG(total_sales, 1) OVER (ORDER BY month))
        * 100.0 / LAG(total_sales, 1) OVER (ORDER BY month), 2
    ) AS growth_rate_pct
FROM monthly_sales;

-- LEAD: 次の行の値を取得
SELECT
    first_name,
    hire_date,
    LEAD(hire_date, 1) OVER (ORDER BY hire_date) AS next_hire_date,
    LEAD(hire_date, 1) OVER (ORDER BY hire_date) - hire_date AS days_until_next
FROM employees;

-- FIRST_VALUE / LAST_VALUE
SELECT
    department,
    first_name,
    salary,
    FIRST_VALUE(first_name) OVER (
        PARTITION BY department ORDER BY salary DESC
    ) AS highest_paid,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department ORDER BY salary DESC
    ) AS max_salary_in_dept
FROM employees;

-- LAGのデフォルト値指定
SELECT
    order_date,
    total,
    LAG(total, 1, 0) OVER (ORDER BY order_date) AS prev_total  -- NULLの代わりに0
FROM orders;`,
      },
      {
        title: "ウィンドウフレームの指定",
        content:
          "ウィンドウフレームはウィンドウ関数が参照する行の範囲を詳細に制御する機能です。ROWS BETWEENは物理的な行数で範囲を指定し、RANGE BETWEENは値の範囲で指定します。UNBOUNDED PRECEDINGはウィンドウの先頭から、UNBOUNDED FOLLOWINGは末尾まで、CURRENT ROWは現在行を指します。移動平均の計算や累積合計の算出に使用します。フレームを指定しない場合のデフォルトは RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW です。",
        code: `-- 累積合計（Running Total）
SELECT
    order_date,
    total,
    SUM(total) OVER (
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;

-- 3行の移動平均
SELECT
    order_date,
    total,
    AVG(total) OVER (
        ORDER BY order_date
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING  -- 前後1行 = 3行
    ) AS moving_avg_3
FROM orders;

-- 7日移動平均（RANGE を使用）
SELECT
    order_date,
    daily_total,
    AVG(daily_total) OVER (
        ORDER BY order_date
        RANGE BETWEEN INTERVAL '6' DAY PRECEDING AND CURRENT ROW
    ) AS moving_avg_7day
FROM daily_sales;

-- 部署内での累積給与割合
SELECT
    department,
    first_name,
    salary,
    SUM(salary) OVER (
        PARTITION BY department
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_salary,
    ROUND(
        SUM(salary) OVER (
            PARTITION BY department
            ORDER BY salary DESC
            ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
        ) * 100.0 / SUM(salary) OVER (PARTITION BY department), 2
    ) AS cumulative_pct
FROM employees;`,
      },
      {
        title: "NAMED WINDOW と実践的な活用例",
        content:
          "WINDOW句（名前付きウィンドウ）を使うと、同じウィンドウ定義を複数の関数で再利用でき、クエリの可読性が向上します。ウィンドウ関数はSELECT句とORDER BY句でのみ使用可能で、WHERE句やGROUP BY句、HAVING句では使用できません。ウィンドウ関数の結果をフィルタリングするにはサブクエリやCTEで包む必要があります。実務では、ランキング、移動平均、累積計算、重複排除など幅広く活用されます。",
        code: `-- WINDOW句で名前付きウィンドウを定義
SELECT
    department,
    first_name,
    salary,
    ROW_NUMBER() OVER w AS row_num,
    RANK() OVER w AS rank_num,
    SUM(salary) OVER w AS running_total
FROM employees
WINDOW w AS (PARTITION BY department ORDER BY salary DESC);

-- 重複排除（最新の行だけ残す）
WITH ranked AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY email
            ORDER BY updated_at DESC
        ) AS rn
    FROM user_logs
)
SELECT * FROM ranked WHERE rn = 1;

-- 前月比の成長率レポート
WITH monthly AS (
    SELECT
        DATE_FORMAT(order_date, '%Y-%m') AS month,
        COUNT(*) AS order_count,
        SUM(total) AS total_sales
    FROM orders
    WHERE status = 'COMPLETED'
    GROUP BY DATE_FORMAT(order_date, '%Y-%m')
)
SELECT
    month,
    order_count,
    total_sales,
    LAG(total_sales) OVER (ORDER BY month) AS prev_sales,
    ROUND(
        (total_sales - LAG(total_sales) OVER (ORDER BY month))
        * 100.0 / LAG(total_sales) OVER (ORDER BY month), 1
    ) AS growth_pct
FROM monthly
ORDER BY month;`,
      },
    ],
  },
  {
    id: "transactions",
    title: "トランザクション",
    category: "advanced",
    description:
      "BEGIN/COMMIT/ROLLBACK、ACID特性、分離レベルによるトランザクション制御を学ぶ",
    sections: [
      {
        title: "トランザクションの基本とACID特性",
        content:
          "トランザクションは一連のSQL操作をひとまとまりとして扱い、すべて成功するか、すべて取り消すかのどちらかを保証する仕組みです。ACID特性はトランザクションが満たすべき4つの性質です。Atomicity（原子性）は操作がすべて実行されるか全く実行されないことを保証します。Consistency（一貫性）はトランザクション前後でデータベースの整合性が保たれることを保証します。Isolation（独立性）は同時実行されるトランザクションが互いに干渉しないことを保証します。Durability（永続性）はコミットされたデータが失われないことを保証します。",
        code: `-- トランザクションの基本構文
BEGIN;  -- またはSTART TRANSACTION（MySQL）

-- 送金処理の例
-- Aさんの口座から10,000円引き出し
UPDATE accounts SET balance = balance - 10000 WHERE user_id = 1;

-- Bさんの口座に10,000円入金
UPDATE accounts SET balance = balance + 10000 WHERE user_id = 2;

-- すべて成功したらコミット
COMMIT;

-- エラーが発生した場合はロールバック
-- ROLLBACK;

-- 自動コミットモードの確認と変更（MySQL）
SELECT @@autocommit;       -- 1: 自動コミットON
SET autocommit = 0;        -- 自動コミットOFF（手動でCOMMIT必要）
SET autocommit = 1;        -- 自動コミットON（デフォルト）

-- PostgreSQLでは各SQL文が自動的にトランザクション内で実行される
-- BEGIN/COMMITを明示しない場合、各文が個別にコミットされる`,
      },
      {
        title: "SAVEPOINT とエラーハンドリング",
        content:
          "SAVEPOINTはトランザクション内に中間的な保存ポイントを設定し、部分的なロールバックを可能にします。ROLLBACK TO SAVEPOINTで特定のポイントまで戻すことができ、トランザクション全体をロールバックする必要がありません。複雑な一連の処理で一部だけやり直したい場合に有効です。MySQLのストアドプロシージャではDECLARE HANDLERでエラーハンドリングを行い、PostgreSQLではEXCEPTIONブロックを使用します。",
        code: `-- SAVEPOINTの使用
BEGIN;

INSERT INTO orders (user_id, total, status)
VALUES (1, 5000, 'PENDING');

SAVEPOINT after_order;

INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (LAST_INSERT_ID(), 101, 2, 2500);

-- 商品の在庫チェック
-- 在庫不足の場合、order_itemsだけロールバック
ROLLBACK TO SAVEPOINT after_order;

-- 別の商品で再試行
INSERT INTO order_items (order_id, product_id, quantity, unit_price)
VALUES (LAST_INSERT_ID(), 102, 1, 5000);

COMMIT;

-- PostgreSQLでのエラーハンドリング
DO \$\$
BEGIN
    INSERT INTO users (username, email) VALUES ('test', 'test@example.com');
    INSERT INTO profiles (user_id, bio) VALUES (currval('users_id_seq'), 'Hello');
EXCEPTION
    WHEN unique_violation THEN
        RAISE NOTICE 'ユーザーは既に存在します';
    WHEN OTHERS THEN
        RAISE NOTICE 'エラーが発生しました: %', SQLERRM;
END;
\$\$;`,
      },
      {
        title: "分離レベル（Isolation Level）",
        content:
          "分離レベルはトランザクション間の可視性を制御し、同時実行性とデータの一貫性のトレードオフを調整します。READ UNCOMMITTED（未コミット読み取り）は最も低い分離レベルで、ダーティリードが発生します。READ COMMITTED（コミット済み読み取り）はコミットされたデータのみ読み取れますが、ファジーリードが発生します。REPEATABLE READ（反復可能読み取り）はトランザクション開始時点のデータを一貫して読めますが、ファントムリードが発生する可能性があります。SERIALIZABLE（直列化可能）は最も高い分離レベルで、完全な整合性を保証しますが、パフォーマンスが最も低くなります。",
        code: `-- 現在の分離レベルの確認
-- MySQL
SELECT @@transaction_isolation;
-- PostgreSQL
SHOW transaction_isolation;

-- セッションの分離レベルを変更
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET SESSION TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- トランザクションごとに分離レベルを指定
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
SELECT * FROM accounts WHERE user_id = 1;
UPDATE accounts SET balance = balance - 1000 WHERE user_id = 1;
COMMIT;

-- 分離レベルと発生する問題のまとめ
-- ┌─────────────────────┬───────────┬───────────┬───────────┐
-- │ 分離レベル          │ダーティ   │ファジー   │ファントム │
-- │                     │リード     │リード     │リード     │
-- ├─────────────────────┼───────────┼───────────┼───────────┤
-- │ READ UNCOMMITTED    │ 発生する  │ 発生する  │ 発生する  │
-- │ READ COMMITTED      │ 防止      │ 発生する  │ 発生する  │
-- │ REPEATABLE READ     │ 防止      │ 防止      │ 発生する* │
-- │ SERIALIZABLE        │ 防止      │ 防止      │ 防止      │
-- └─────────────────────┴───────────┴───────────┴───────────┘
-- * MySQL(InnoDB)ではREPEATABLE READでもファントムリードを防止`,
      },
      {
        title: "デッドロックとロック制御",
        content:
          "デッドロックは2つ以上のトランザクションが互いのロック解放を待ち続ける状態です。データベースはデッドロックを検出すると、一方のトランザクションを自動的にロールバックします。デッドロックを防ぐには、テーブルやレコードのロック順序を統一する、トランザクションを短く保つ、必要最小限のロックを取得する、といった対策が有効です。行ロック（SELECT ... FOR UPDATE）は指定した行を他のトランザクションから更新できなくするため、在庫の減算や口座の残高更新など、競合が発生しやすい処理で使用します。",
        code: `-- 行ロック（SELECT FOR UPDATE）
BEGIN;
-- 在庫を確認しつつロック
SELECT stock FROM products WHERE id = 1 FOR UPDATE;
-- 在庫があればUPDATE
UPDATE products SET stock = stock - 1 WHERE id = 1;
COMMIT;

-- SKIP LOCKED（ロック済み行をスキップ、キュー処理に有効）
SELECT * FROM tasks
WHERE status = 'PENDING'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;

-- NOWAIT（ロック待ちせずエラーを返す）
SELECT * FROM accounts WHERE id = 1 FOR UPDATE NOWAIT;

-- デッドロックの例
-- トランザクション1:
BEGIN;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;  -- id=1をロック
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;  -- id=2の待ち

-- トランザクション2（同時に実行）:
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 2;   -- id=2をロック
UPDATE accounts SET balance = balance + 500 WHERE id = 1;   -- id=1の待ち → デッドロック!

-- 防止策: ロック順序を統一（常にidの小さい方から）
BEGIN;
SELECT * FROM accounts WHERE id IN (1, 2) ORDER BY id FOR UPDATE;
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
UPDATE accounts SET balance = balance + 1000 WHERE id = 2;
COMMIT;`,
      },
      {
        title: "トランザクション設計のベストプラクティス",
        content:
          "トランザクションの設計はアプリケーションの信頼性に直結します。トランザクションは可能な限り短くし、必要な操作のみを含めることが重要です。長時間のトランザクションはロックの保持時間を増やし、他のトランザクションのパフォーマンスに影響します。外部API呼び出しやファイル操作はトランザクション外で行い、データベース操作のみをトランザクション内に含めてください。楽観的ロック（バージョン番号やタイムスタンプによる更新制御）はWebアプリケーションで広く使われるパターンで、ロックの保持時間を最小化できます。",
        code: `-- 楽観的ロック（Optimistic Locking）の実装
-- テーブルにバージョンカラムを追加
ALTER TABLE products ADD COLUMN version INT NOT NULL DEFAULT 0;

-- 読み取り時にバージョンを取得
SELECT id, name, stock, version FROM products WHERE id = 1;
-- → stock=10, version=3

-- 更新時にバージョンをチェック
UPDATE products
SET stock = stock - 1, version = version + 1
WHERE id = 1 AND version = 3;  -- バージョンが変わっていたら0行更新

-- 更新行数が0の場合は他のトランザクションが先に更新済み
-- → アプリケーション側でリトライする

-- 悪い例: トランザクション内で外部処理
BEGIN;
UPDATE orders SET status = 'PROCESSING' WHERE id = 100;
-- × 外部API呼び出し（ネットワーク遅延でロック長期化）
-- × メール送信
-- × ファイル書き込み
COMMIT;

-- 良い例: データベース操作のみをトランザクション内に
BEGIN;
UPDATE orders SET status = 'PROCESSING' WHERE id = 100;
UPDATE inventory SET stock = stock - 1 WHERE product_id = 50;
INSERT INTO order_history (order_id, status) VALUES (100, 'PROCESSING');
COMMIT;
-- トランザクション外で外部処理を実行
-- → 外部API呼び出し、メール送信など`,
      },
    ],
  },

  // ===== 実践 (Practice) =====
  {
    id: "sql-tuning",
    title: "SQLチューニング",
    category: "practice",
    description:
      "EXPLAINによる実行計画の分析、インデックス設計、SQLの最適化手法を学ぶ",
    sections: [
      {
        title: "EXPLAIN で実行計画を読む",
        content:
          "EXPLAINはSQLの実行計画を表示し、クエリがどのように実行されるかを確認するためのコマンドです。テーブルのスキャン方法（フルスキャン、インデックススキャン）、結合方式、行の推定数、ソートの有無などを確認できます。MySQL ではEXPLAIN、PostgreSQL ではEXPLAIN ANALYZEで実際の実行時間と行数も取得できます。type列（MySQL）はアクセス方式を示し、const > eq_ref > ref > range > index > ALL の順に高速です。ALL（フルテーブルスキャン）が表示された場合はインデックスの追加を検討してください。",
        code: `-- MySQL の EXPLAIN
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
-- 主要な列:
-- type: アクセスタイプ（const, eq_ref, ref, range, index, ALL）
-- key: 使用されるインデックス
-- rows: 走査される推定行数
-- Extra: 追加情報（Using index, Using filesort など）

-- EXPLAIN FORMAT=JSON（詳細情報）
EXPLAIN FORMAT=JSON
SELECT u.username, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;

-- PostgreSQL の EXPLAIN ANALYZE（実際に実行される）
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'test@example.com';
-- 出力例:
-- Index Scan using idx_users_email on users (cost=0.29..8.30 rows=1)
--   Index Cond: (email = 'test@example.com')
-- Planning Time: 0.1 ms
-- Execution Time: 0.05 ms

-- EXPLAIN ANALYZE BUFFERS（I/O情報も表示、PostgreSQL）
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders WHERE order_date >= '2026-01-01';`,
      },
      {
        title: "スロークエリの特定と分析",
        content:
          "スロークエリはデータベースのパフォーマンス低下の主な原因です。MySQLではスロークエリログを有効化して、実行に時間がかかるクエリを記録できます。PostgreSQLではpg_stat_statementsエクステンションで統計情報を取得できます。スロークエリの主な原因は、インデックスの欠如、不要なフルテーブルスキャン、非効率なJOIN、大量のデータ取得（SELECT *）、N+1問題などです。スロークエリの分析は、まずEXPLAINで実行計画を確認し、ボトルネックを特定してから対策を行います。",
        code: `-- MySQL スロークエリログの設定
SET GLOBAL slow_query_log = ON;
SET GLOBAL long_query_time = 1;  -- 1秒以上をスロークエリとして記録
SET GLOBAL log_queries_not_using_indexes = ON;

-- スロークエリログの確認
-- /var/log/mysql/slow.log

-- PostgreSQL のスロークエリ設定（postgresql.conf）
-- log_min_duration_statement = 1000  -- 1000ms以上をログ出力

-- pg_stat_statements で統計情報を取得（PostgreSQL）
SELECT
    query,
    calls,
    total_exec_time / 1000 AS total_seconds,
    mean_exec_time / 1000 AS avg_seconds,
    rows
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10;

-- MySQL のプロセスリスト（実行中クエリの確認）
SHOW PROCESSLIST;

-- MySQL のステータス変数でフルスキャンを検出
SHOW GLOBAL STATUS LIKE 'Select_scan';
SHOW GLOBAL STATUS LIKE 'Handler_read_rnd_next';`,
      },
      {
        title: "インデックス設計の戦略",
        content:
          "効果的なインデックス設計はSQLチューニングの核心です。カバリングインデックスはクエリに必要なすべてのカラムを含むインデックスで、テーブルへのアクセスを不要にします。複合インデックスの列順は、等価条件のカラムを先頭に、範囲条件のカラムを後ろに配置するのが原則です（Equal-Range ルール）。インデックスの数が多すぎるとINSERT/UPDATE/DELETEのパフォーマンスが低下するため、重複・未使用インデックスは定期的に見直しましょう。",
        code: `-- カバリングインデックスの例
-- このクエリに対して：
SELECT user_id, order_date, total
FROM orders
WHERE user_id = 1 AND order_date >= '2026-01-01';

-- カバリングインデックス（テーブルアクセス不要）
CREATE INDEX idx_orders_covering
ON orders(user_id, order_date, total);

-- Equal-Range ルール
-- 等価条件（=）のカラムを先に、範囲条件（>, <, BETWEEN）のカラムを後に
-- ◎ 良い設計
CREATE INDEX idx_good ON orders(status, user_id, order_date);
-- WHERE status = 'COMPLETED' AND user_id = 1 AND order_date >= '2026-01-01'
-- → すべてのカラムがインデックスで解決される

-- × 悪い設計
CREATE INDEX idx_bad ON orders(order_date, status, user_id);
-- WHERE order_date >= '2026-01-01' AND status = 'COMPLETED' AND user_id = 1
-- → order_dateの範囲検索後、status/user_idのインデックスが効かない

-- 未使用インデックスの確認（MySQL）
SELECT
    s.table_name,
    s.index_name,
    s.seq_in_index,
    s.column_name
FROM information_schema.statistics s
LEFT JOIN sys.schema_index_statistics sis
    ON s.table_name = sis.table_name AND s.index_name = sis.index_name
WHERE s.table_schema = DATABASE()
  AND sis.rows_selected = 0
  AND s.index_name != 'PRIMARY';`,
      },
      {
        title: "クエリ最適化テクニック",
        content:
          "SQLの書き方を工夫することで、同じ結果でもパフォーマンスが大きく変わります。WHERE句でカラムに関数を適用するとインデックスが効かなくなるため、値の側を変換するか関数インデックスを使用します。OR条件はインデックスの利用を妨げることがあり、UNIONに書き換えると効率的な場合があります。EXISTS vs IN、JOIN vs サブクエリの選択はデータ量や統計情報に依存するため、EXPLAINで確認することが重要です。ページネーションではOFFSETの代わりにWHERE id > last_id（キーセットページネーション）を使用すると大幅に高速化できます。",
        code: `-- 関数の使用を避ける
-- × インデックスが効かない
SELECT * FROM orders WHERE YEAR(order_date) = 2026;
-- ◎ インデックスが効く
SELECT * FROM orders
WHERE order_date >= '2026-01-01' AND order_date < '2027-01-01';

-- × 暗黙の型変換
SELECT * FROM users WHERE id = '123';  -- idがINTの場合、文字列比較になりうる
-- ◎ 型を合わせる
SELECT * FROM users WHERE id = 123;

-- OR条件の最適化
-- × ORはインデックスが効きにくい場合がある
SELECT * FROM products WHERE category = 'FOOD' OR category = 'DRINK';
-- ◎ INを使う
SELECT * FROM products WHERE category IN ('FOOD', 'DRINK');

-- キーセットページネーション
-- × OFFSET が大きいと遅い
SELECT * FROM products ORDER BY id LIMIT 20 OFFSET 100000;
-- ◎ キーセットで高速化
SELECT * FROM products WHERE id > 100000 ORDER BY id LIMIT 20;

-- バルクINSERT
-- × 1行ずつINSERT（遅い）
INSERT INTO logs (message) VALUES ('log1');
INSERT INTO logs (message) VALUES ('log2');
INSERT INTO logs (message) VALUES ('log3');
-- ◎ まとめてINSERT（高速）
INSERT INTO logs (message) VALUES ('log1'), ('log2'), ('log3');`,
      },
      {
        title: "統計情報とメンテナンス",
        content:
          "データベースのオプティマイザは統計情報に基づいて最適な実行計画を選択します。テーブルのデータが大量に変更された後は統計情報が古くなり、不適切な実行計画が選ばれる可能性があります。ANALYZE TABLEで統計情報を更新し、OPTIMIZE TABLE（MySQL）やVACUUM（PostgreSQL）でデータの断片化を解消します。定期的なメンテナンスをcronジョブやpg_cronで自動化することが推奨されます。テーブルサイズやインデックスサイズの監視も重要な運用タスクです。",
        code: `-- 統計情報の更新
-- MySQL
ANALYZE TABLE users;
ANALYZE TABLE orders;

-- PostgreSQL
ANALYZE users;
ANALYZE orders;

-- テーブルの最適化（MySQL）
OPTIMIZE TABLE users;  -- 断片化の解消

-- VACUUM（PostgreSQL）
VACUUM users;           -- 不要領域の回収
VACUUM ANALYZE users;   -- 統計情報の更新も同時に
VACUUM FULL users;      -- テーブルを完全に再構築（排他ロック注意）

-- テーブルサイズの確認（MySQL）
SELECT
    table_name,
    ROUND(data_length / 1024 / 1024, 2) AS data_mb,
    ROUND(index_length / 1024 / 1024, 2) AS index_mb,
    table_rows
FROM information_schema.tables
WHERE table_schema = DATABASE()
ORDER BY data_length + index_length DESC;

-- テーブルサイズの確認（PostgreSQL）
SELECT
    relname AS table_name,
    pg_size_pretty(pg_total_relation_size(relid)) AS total_size,
    pg_size_pretty(pg_relation_size(relid)) AS data_size,
    pg_size_pretty(pg_indexes_size(relid)) AS index_size,
    n_live_tup AS row_count
FROM pg_stat_user_tables
ORDER BY pg_total_relation_size(relid) DESC;`,
      },
    ],
  },
  {
    id: "java-sql",
    title: "JavaからのSQL実行",
    category: "practice",
    description:
      "JDBC、PreparedStatement、Spring JdbcTemplateによるJavaからのSQL実行方法を学ぶ",
    sections: [
      {
        title: "JDBCの基本",
        content:
          "JDBC（Java Database Connectivity）はJavaアプリケーションからデータベースに接続し、SQLを実行するための標準APIです。JDBCドライバを通じて各種データベースに統一的なインタフェースでアクセスできます。基本的な流れは、DriverManagerでコネクションを取得し、Statementを作成してSQLを実行し、ResultSetで結果を取得します。リソースリークを防ぐため、try-with-resources文で確実にクローズすることが重要です。コネクションの取得はコストが高いため、本番環境ではコネクションプールを使用します。",
        code: `// JDBC接続の基本（try-with-resources）
import java.sql.*;

public class JdbcBasicExample {
    private static final String URL = "jdbc:mysql://localhost:3306/mydb";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public void selectUsers() {
        String sql = "SELECT id, username, email FROM users WHERE status = 'ACTIVE'";

        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                long id = rs.getLong("id");
                String username = rs.getString("username");
                String email = rs.getString("email");
                System.out.println(id + ": " + username + " (" + email + ")");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}`,
      },
      {
        title: "PreparedStatement とSQLインジェクション対策",
        content:
          "PreparedStatementはパラメータ化されたSQL文を安全に実行するためのインタフェースです。SQLテンプレートにプレースホルダ（?）を使用し、setXxx()メソッドでパラメータを設定します。これにより、SQLインジェクション攻撃を防止できます。Statementで文字列結合によりSQLを組み立てると、悪意のある入力でSQLが改ざんされる危険があります。パフォーマンス面でも、PreparedStatementはSQL文のパース結果をキャッシュするため、同じSQL文を繰り返し実行する場合に高速です。",
        code: `// × 危険: 文字列結合によるSQL組み立て（SQLインジェクションの脆弱性）
// String sql = "SELECT * FROM users WHERE username = '" + input + "'";
// 入力が "' OR '1'='1" だと全ユーザーが取得されてしまう！

// ◎ 安全: PreparedStatement
public User findByUsername(String username) {
    String sql = "SELECT id, username, email FROM users WHERE username = ?";

    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
         PreparedStatement pstmt = conn.prepareStatement(sql)) {

        pstmt.setString(1, username);  // パラメータの設定（1始まり）

        try (ResultSet rs = pstmt.executeQuery()) {
            if (rs.next()) {
                User user = new User();
                user.setId(rs.getLong("id"));
                user.setUsername(rs.getString("username"));
                user.setEmail(rs.getString("email"));
                return user;
            }
        }
    } catch (SQLException e) {
        throw new RuntimeException("ユーザー検索に失敗しました", e);
    }
    return null;
}

// INSERT文の例
public void createUser(String username, String email) {
    String sql = "INSERT INTO users (username, email, status) VALUES (?, ?, ?)";

    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
         PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

        pstmt.setString(1, username);
        pstmt.setString(2, email);
        pstmt.setString(3, "ACTIVE");
        pstmt.executeUpdate();

        // 自動生成されたキーの取得
        try (ResultSet keys = pstmt.getGeneratedKeys()) {
            if (keys.next()) {
                long generatedId = keys.getLong(1);
                System.out.println("生成されたID: " + generatedId);
            }
        }
    } catch (SQLException e) {
        throw new RuntimeException("ユーザー作成に失敗しました", e);
    }
}`,
      },
      {
        title: "JDBCでのトランザクション制御",
        content:
          "JDBCではConnectionオブジェクトを通じてトランザクションを制御します。デフォルトでは自動コミットが有効（setAutoCommit(true)）ですが、複数のSQL文をまとめてトランザクションとして扱うには自動コミットを無効にし、明示的にcommit()またはrollback()を呼び出します。例外発生時にはfinally句やcatch句でrollback()を呼び出し、データの整合性を保つ必要があります。バッチ処理ではaddBatch()とexecuteBatch()で複数のSQL文をまとめて実行し、パフォーマンスを向上させることができます。",
        code: `// トランザクション制御
public void transferMoney(long fromUserId, long toUserId, int amount) {
    String debitSql = "UPDATE accounts SET balance = balance - ? WHERE user_id = ?";
    String creditSql = "UPDATE accounts SET balance = balance + ? WHERE user_id = ?";

    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD)) {
        conn.setAutoCommit(false);  // 自動コミットを無効化

        try (PreparedStatement debit = conn.prepareStatement(debitSql);
             PreparedStatement credit = conn.prepareStatement(creditSql)) {

            // 出金
            debit.setInt(1, amount);
            debit.setLong(2, fromUserId);
            debit.executeUpdate();

            // 入金
            credit.setInt(1, amount);
            credit.setLong(2, toUserId);
            credit.executeUpdate();

            conn.commit();  // コミット
        } catch (SQLException e) {
            conn.rollback();  // ロールバック
            throw new RuntimeException("送金に失敗しました", e);
        }
    } catch (SQLException e) {
        throw new RuntimeException("DB接続に失敗しました", e);
    }
}

// バッチ処理
public void batchInsert(List<User> users) {
    String sql = "INSERT INTO users (username, email) VALUES (?, ?)";

    try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
         PreparedStatement pstmt = conn.prepareStatement(sql)) {

        conn.setAutoCommit(false);

        for (User user : users) {
            pstmt.setString(1, user.getUsername());
            pstmt.setString(2, user.getEmail());
            pstmt.addBatch();
        }
        pstmt.executeBatch();
        conn.commit();
    } catch (SQLException e) {
        throw new RuntimeException("バッチ挿入に失敗しました", e);
    }
}`,
      },
      {
        title: "Spring JdbcTemplate",
        content:
          "Spring FrameworkのJdbcTemplateはJDBCの煩雑なボイラープレートコード（コネクション管理、例外処理、リソースクローズ）を隠蔽し、シンプルなAPIでデータベース操作を行えるユーティリティクラスです。queryForObject()で単一行を、query()で複数行を、update()でINSERT/UPDATE/DELETEを実行します。RowMapperインタフェースでResultSetからオブジェクトへの変換ロジックを定義し、BeanPropertyRowMapperを使えばカラム名とフィールド名の自動マッピングも可能です。NamedParameterJdbcTemplateは名前付きパラメータを使用でき、可読性が向上します。",
        code: `@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 単一行の取得
    public User findById(Long id) {
        String sql = "SELECT id, username, email, status FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new UserRowMapper(), id);
    }

    // 複数行の取得
    public List<User> findByStatus(String status) {
        String sql = "SELECT id, username, email, status FROM users WHERE status = ?";
        return jdbcTemplate.query(sql, new UserRowMapper(), status);
    }

    // INSERT
    public int create(User user) {
        String sql = "INSERT INTO users (username, email, status) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql,
            user.getUsername(), user.getEmail(), user.getStatus());
    }

    // UPDATE
    public int updateEmail(Long id, String email) {
        String sql = "UPDATE users SET email = ? WHERE id = ?";
        return jdbcTemplate.update(sql, email, id);
    }

    // DELETE
    public int delete(Long id) {
        return jdbcTemplate.update("DELETE FROM users WHERE id = ?", id);
    }

    // RowMapper の定義
    private static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setId(rs.getLong("id"));
            user.setUsername(rs.getString("username"));
            user.setEmail(rs.getString("email"));
            user.setStatus(rs.getString("status"));
            return user;
        }
    }
}`,
      },
      {
        title: "NamedParameterJdbcTemplate とコネクションプール",
        content:
          "NamedParameterJdbcTemplateは?の代わりに:nameの形式で名前付きパラメータを使用でき、パラメータが多いクエリの可読性が大幅に向上します。MapSqlParameterSourceやBeanPropertySqlParameterSourceでパラメータを設定します。本番環境では、コネクションプール（HikariCP、DBCP等）を使用してコネクションの生成コストを削減します。Spring Bootでは application.properties でデータソースを設定するだけで、HikariCPが自動構成されます。コネクションプールのサイズ設定はアプリケーションのパフォーマンスに大きく影響します。",
        code: `@Repository
public class OrderRepository {
    private final NamedParameterJdbcTemplate namedJdbc;

    public OrderRepository(NamedParameterJdbcTemplate namedJdbc) {
        this.namedJdbc = namedJdbc;
    }

    // 名前付きパラメータの使用
    public List<Order> findByConditions(String status, LocalDate fromDate, LocalDate toDate) {
        String sql = """
            SELECT id, user_id, order_date, total, status
            FROM orders
            WHERE status = :status
              AND order_date BETWEEN :fromDate AND :toDate
            ORDER BY order_date DESC
            """;

        MapSqlParameterSource params = new MapSqlParameterSource()
            .addValue("status", status)
            .addValue("fromDate", fromDate)
            .addValue("toDate", toDate);

        return namedJdbc.query(sql, params, new BeanPropertyRowMapper<>(Order.class));
    }

    // IN句での使用（リストを直接渡せる）
    public List<Order> findByStatuses(List<String> statuses) {
        String sql = "SELECT * FROM orders WHERE status IN (:statuses)";
        MapSqlParameterSource params = new MapSqlParameterSource("statuses", statuses);
        return namedJdbc.query(sql, params, new BeanPropertyRowMapper<>(Order.class));
    }
}

// application.properties でのHikariCP設定
// spring.datasource.url=jdbc:mysql://localhost:3306/mydb
// spring.datasource.username=root
// spring.datasource.password=password
// spring.datasource.hikari.maximum-pool-size=10
// spring.datasource.hikari.minimum-idle=5
// spring.datasource.hikari.connection-timeout=30000
// spring.datasource.hikari.idle-timeout=600000
// spring.datasource.hikari.max-lifetime=1800000`,
      },
    ],
  },
];

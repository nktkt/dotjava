export interface DbDesignSection {
  title: string;
  content: string;
  code?: string;
}

export interface DbDesignChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: DbDesignSection[];
}

export interface DbDesignCategory {
  id: string;
  name: string;
  color: string;
}

export const dbDesignCategories: DbDesignCategory[] = [
  { id: "design", name: "設計基礎", color: "#2563EB" },
  { id: "optimization", name: "最適化", color: "#059669" },
  { id: "practice", name: "実践", color: "#D97706" },
];

export const dbDesignChapters: DbDesignChapter[] = [
  // ===== 設計基礎 =====
  {
    id: "normalization",
    title: "正規化",
    description: "データベースの冗長性を排除し、整合性を保つための正規化理論を学ぶ",
    category: "design",
    sections: [
      {
        title: "第1正規形（1NF）",
        content:
          "第1正規形は、すべての列が原子的な値（これ以上分割できない値）を持ち、繰り返しグループが存在しない状態を指します。例えば「電話番号」列に複数の番号をカンマ区切りで格納するのは1NF違反です。各セルには1つの値のみを格納し、同じ種類のデータを複数列（電話番号1、電話番号2...）に持つのも避けるべきです。1NFを満たすことで、SQLの WHERE 句で正確に検索でき、データの一貫性が保たれます。",
        code: `-- 1NF違反: 1つのセルに複数の値が入っている
CREATE TABLE employees_bad (
    emp_id    INT PRIMARY KEY,
    name      VARCHAR(100),
    phones    VARCHAR(200)  -- '090-1234-5678, 080-9876-5432'
);

-- 1NF準拠: 電話番号を別テーブルに分離
CREATE TABLE employees (
    emp_id    INT PRIMARY KEY,
    name      VARCHAR(100)
);

CREATE TABLE employee_phones (
    phone_id  INT PRIMARY KEY,
    emp_id    INT NOT NULL,
    phone     VARCHAR(20) NOT NULL,
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);

-- 検索が容易になる
SELECT e.name, p.phone
FROM employees e
JOIN employee_phones p ON e.emp_id = p.emp_id
WHERE p.phone LIKE '090%';`,
      },
      {
        title: "第2正規形（2NF）と第3正規形（3NF）",
        content:
          "第2正規形は、1NFを満たした上で、すべての非キー属性が主キー全体に完全関数従属している状態です。複合主キーの一部にのみ依存する属性がある場合は2NF違反となり、テーブルを分割する必要があります。第3正規形は、2NFを満たした上で、非キー属性間の推移的関数従属がない状態です。例えば「部署コード→部署名」のように、非キー属性が別の非キー属性を決定する関係がある場合は3NF違反であり、別テーブルに切り出します。",
        code: `-- 2NF違反: 商品名は商品IDのみに依存（複合キーの一部に依存）
CREATE TABLE order_items_bad (
    order_id      INT,
    product_id    INT,
    product_name  VARCHAR(100),  -- product_id のみに依存
    quantity      INT,
    PRIMARY KEY (order_id, product_id)
);

-- 2NF準拠: 商品情報を分離
CREATE TABLE products (
    product_id    INT PRIMARY KEY,
    product_name  VARCHAR(100) NOT NULL
);

CREATE TABLE order_items (
    order_id      INT,
    product_id    INT,
    quantity      INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 3NF違反: dept_name は dept_code に推移的に依存
CREATE TABLE employees_bad (
    emp_id     INT PRIMARY KEY,
    emp_name   VARCHAR(100),
    dept_code  VARCHAR(10),
    dept_name  VARCHAR(100)  -- dept_code → dept_name（推移的従属）
);

-- 3NF準拠: 部署情報を分離
CREATE TABLE departments (
    dept_code  VARCHAR(10) PRIMARY KEY,
    dept_name  VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    emp_id     INT PRIMARY KEY,
    emp_name   VARCHAR(100),
    dept_code  VARCHAR(10),
    FOREIGN KEY (dept_code) REFERENCES departments(dept_code)
);`,
      },
      {
        title: "ボイス・コッド正規形（BCNF）",
        content:
          "ボイス・コッド正規形（BCNF）は、3NFをさらに厳密にしたものです。3NFでは候補キーの一部への関数従属が残る場合がありますが、BCNFではすべての関数従属の決定項が候補キーであることを要求します。BCNFに違反するケースは実務では稀ですが、複合キーが複数存在するテーブルで発生することがあります。BCNFへの分解では、無損失結合性は保証されますが、関数従属性の保存が犠牲になる場合があるため、注意が必要です。",
        code: `-- BCNF違反の例:
-- 学生が科目を受講し、各科目には担当教員がいる
-- 1人の教員は1科目のみ担当するが、1科目に複数教員がいる
-- 関数従属: {学生, 科目} → 教員, 教員 → 科目

CREATE TABLE enrollments_bad (
    student_id   INT,
    subject      VARCHAR(50),
    teacher      VARCHAR(50),
    PRIMARY KEY (student_id, subject)
    -- teacher → subject が存在するが、teacher は候補キーではない → BCNF違反
);

-- BCNF準拠: 分解する
CREATE TABLE teachings (
    teacher      VARCHAR(50) PRIMARY KEY,
    subject      VARCHAR(50) NOT NULL
);

CREATE TABLE enrollments (
    student_id   INT,
    teacher      VARCHAR(50),
    PRIMARY KEY (student_id, teacher),
    FOREIGN KEY (teacher) REFERENCES teachings(teacher)
);

-- 科目を知りたい場合は JOIN する
SELECT e.student_id, t.subject, t.teacher
FROM enrollments e
JOIN teachings t ON e.teacher = t.teacher;`,
      },
      {
        title: "正規化の手順と非正規化の判断",
        content:
          "正規化の手順は、まず繰り返しグループを排除して1NFにし、部分関数従属を除去して2NFにし、推移的関数従属を除去して3NFにします。通常の業務システムでは3NFまで正規化すれば十分です。一方、読み取り性能を重視する場合は意図的に非正規化を行うこともあります。非正規化の判断基準は、JOINコストが高い場合、参照頻度が更新頻度を大幅に上回る場合、レポートや分析用のテーブルなどです。非正規化する場合はトリガーやアプリケーション層で整合性を維持する仕組みが必要です。",
        code: `-- 非正規化の例: 注文テーブルに合計金額を持たせる
-- 正規化された設計では毎回計算が必要
SELECT o.order_id,
       SUM(oi.quantity * oi.unit_price) AS total
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id;

-- 非正規化: 合計金額を事前計算して保持
ALTER TABLE orders ADD COLUMN total_amount DECIMAL(12,2);

-- トリガーで整合性を維持
CREATE OR REPLACE FUNCTION update_order_total()
RETURNS TRIGGER AS \$\$
BEGIN
    UPDATE orders
    SET total_amount = (
        SELECT SUM(quantity * unit_price)
        FROM order_items
        WHERE order_id = NEW.order_id
    )
    WHERE order_id = NEW.order_id;
    RETURN NEW;
END;
\$\$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_total
AFTER INSERT OR UPDATE OR DELETE ON order_items
FOR EACH ROW EXECUTE FUNCTION update_order_total();

-- 非正規化の判断チェックリスト:
-- ✓ JOINが3テーブル以上で頻繁に実行される
-- ✓ 読み取り:書き込み比率が 100:1 以上
-- ✓ データの鮮度に多少の遅延が許容される
-- ✗ データの即時整合性が必須 → 非正規化は避ける`,
      },
    ],
  },
  {
    id: "er-modeling",
    title: "ER図とデータモデリング",
    description: "エンティティ・リレーションシップ図を用いたデータモデリングの手法を学ぶ",
    category: "design",
    sections: [
      {
        title: "エンティティと属性",
        content:
          "エンティティはデータベースで管理する対象（人、物、概念など）を表し、テーブルに対応します。属性はエンティティが持つ特性で、列に対応します。エンティティには強エンティティと弱エンティティがあり、弱エンティティは他のエンティティに依存して存在します。属性は単純属性・複合属性・多値属性・導出属性に分類されます。主キーとなる属性（識別子）を決定することが重要です。ER図ではエンティティを矩形、属性を楕円で表記します。",
        code: `-- 強エンティティ: 独立して存在できる
CREATE TABLE customers (
    customer_id   SERIAL PRIMARY KEY,
    last_name     VARCHAR(50) NOT NULL,
    first_name    VARCHAR(50) NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    birth_date    DATE,
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 弱エンティティ: 親エンティティに依存（親なしでは意味をなさない）
CREATE TABLE customer_addresses (
    address_id    SERIAL PRIMARY KEY,
    customer_id   INT NOT NULL,
    address_type  VARCHAR(10) NOT NULL,  -- 'HOME', 'WORK'
    postal_code   VARCHAR(10),
    prefecture    VARCHAR(10),
    city          VARCHAR(50),
    street        VARCHAR(100),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE
);

-- 導出属性は通常カラムとしては持たずビューで計算
CREATE VIEW customer_summary AS
SELECT c.customer_id,
       c.last_name || ' ' || c.first_name AS full_name,  -- 導出属性
       COUNT(o.order_id) AS order_count                    -- 導出属性
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.last_name, c.first_name;`,
      },
      {
        title: "リレーションシップ（1:1 / 1:N / M:N）",
        content:
          "リレーションシップはエンティティ間の関連を表します。1:1（一対一）は1つのエンティティが他のエンティティと1つだけ関連する場合で、ユーザーとプロフィールの関係などが該当します。1:N（一対多）は最も一般的で、部署と社員、顧客と注文などの関係です。M:N（多対多）は中間テーブルを使って実現します。また、カーディナリティ（多重度）を正確に把握することが設計の品質を左右します。任意参加（0..）か必須参加（1..）かも重要な設計判断です。",
        code: `-- 1:1 リレーションシップ: ユーザーとプロフィール
CREATE TABLE users (
    user_id    SERIAL PRIMARY KEY,
    username   VARCHAR(50) UNIQUE NOT NULL,
    password   VARCHAR(255) NOT NULL
);

CREATE TABLE user_profiles (
    user_id    INT PRIMARY KEY,   -- PKかつFK → 1:1を保証
    bio        TEXT,
    avatar_url VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 1:N リレーションシップ: 部署と社員
CREATE TABLE departments (
    dept_id    SERIAL PRIMARY KEY,
    dept_name  VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    emp_id     SERIAL PRIMARY KEY,
    emp_name   VARCHAR(100) NOT NULL,
    dept_id    INT NOT NULL,   -- FK → 1:N（1つの部署に複数社員）
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

-- M:N リレーションシップ: 学生と講座 → 中間テーブルで実現
CREATE TABLE students (
    student_id  SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL
);

CREATE TABLE courses (
    course_id   SERIAL PRIMARY KEY,
    title       VARCHAR(200) NOT NULL
);

CREATE TABLE enrollments (
    student_id  INT NOT NULL,
    course_id   INT NOT NULL,
    enrolled_at DATE DEFAULT CURRENT_DATE,
    grade       CHAR(1),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);`,
      },
      {
        title: "ER図の書き方",
        content:
          "ER図の記法にはIE記法（鳥の足記法）とIDEF1X記法があります。IE記法は直感的で広く使われており、1側を「|」、N側を鳥の足（三叉の線）で表します。○は任意参加（0以上）、|は必須参加（1以上）を示します。ER図を書く際は、まず主要なエンティティを洗い出し、次にエンティティ間のリレーションシップを定義し、最後に属性を追加します。ツールとしてはdraw.io、PlantUML、MySQL Workbench、A5:SQL Mk-2などが利用できます。",
        code: `-- PlantUML でER図を記述する例
-- @startuml
-- entity "customers" {
--   * customer_id : INT <<PK>>
--   --
--   * name : VARCHAR(100)
--   * email : VARCHAR(255) <<UNIQUE>>
--   created_at : TIMESTAMP
-- }
--
-- entity "orders" {
--   * order_id : INT <<PK>>
--   --
--   * customer_id : INT <<FK>>
--   * order_date : DATE
--   * status : VARCHAR(20)
-- }
--
-- entity "order_items" {
--   * order_id : INT <<PK,FK>>
--   * product_id : INT <<PK,FK>>
--   --
--   * quantity : INT
--   * unit_price : DECIMAL
-- }
--
-- entity "products" {
--   * product_id : INT <<PK>>
--   --
--   * name : VARCHAR(200)
--   * price : DECIMAL
-- }
--
-- customers ||--o{ orders : "places"
-- orders ||--|{ order_items : "contains"
-- products ||--o{ order_items : "included in"
-- @enduml

-- 上記ER図に対応するDDL
CREATE TABLE customers (
    customer_id  SERIAL PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(255) UNIQUE NOT NULL,
    created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    order_id     SERIAL PRIMARY KEY,
    customer_id  INT NOT NULL,
    order_date   DATE NOT NULL DEFAULT CURRENT_DATE,
    status       VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);`,
      },
      {
        title: "論理設計から物理設計",
        content:
          "論理設計はビジネス要件をエンティティとリレーションシップで表現する段階で、特定のDBMS製品に依存しません。物理設計は論理設計を特定のDBMS上に実装する段階で、データ型の選択、インデックスの配置、パーティションの設定、テーブルスペースの配置などを決定します。論理設計から物理設計への変換では、パフォーマンス要件に応じて非正規化やインデックスの追加を行います。命名規則の統一（スネークケースの使用、テーブル名の複数形など）も物理設計の重要な要素です。",
        code: `-- 論理設計（概念レベル）
-- エンティティ: 商品、カテゴリ、在庫
-- リレーション: カテゴリ 1:N 商品、商品 1:1 在庫

-- 物理設計（PostgreSQL向け）
CREATE TABLE categories (
    category_id   SMALLINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    parent_id     SMALLINT,
    sort_order    SMALLINT DEFAULT 0,
    FOREIGN KEY (parent_id) REFERENCES categories(category_id)
);

CREATE TABLE products (
    product_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id   SMALLINT NOT NULL,
    product_code  VARCHAR(20) UNIQUE NOT NULL,
    product_name  VARCHAR(200) NOT NULL,
    description   TEXT,
    price         NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    is_active     BOOLEAN NOT NULL DEFAULT true,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE inventory (
    product_id    BIGINT PRIMARY KEY,
    quantity      INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    warehouse     VARCHAR(10) NOT NULL DEFAULT 'MAIN',
    last_restocked TIMESTAMPTZ,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- 物理設計で追加するインデックス
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('japanese', product_name));

-- 命名規則の例:
-- テーブル名: 複数形スネークケース（products, order_items）
-- カラム名: スネークケース（product_name, created_at）
-- PK: テーブル名単数形_id（product_id）
-- FK: 参照先テーブル名単数形_id（category_id）
-- インデックス: idx_テーブル名_カラム名（idx_products_category）`,
      },
    ],
  },
  {
    id: "table-design",
    title: "テーブル設計",
    description: "主キー戦略、データ型選択、制約など実践的なテーブル設計のベストプラクティスを学ぶ",
    category: "design",
    sections: [
      {
        title: "主キー戦略（サロゲートキー vs ナチュラルキー）",
        content:
          "サロゲートキー（代理キー）はビジネス上の意味を持たない人工的なキー（連番、UUID等）です。ナチュラルキー（自然キー）はメールアドレスや社員番号など業務上の意味を持つキーです。サロゲートキーは変更が不要で結合が高速ですが、ビジネスルールの重複チェックには別途UNIQUE制約が必要です。ナチュラルキーはビジネスの意味が明確ですが、仕様変更時にキー変更のリスクがあります。一般的にはサロゲートキーが推奨されますが、中間テーブルや不変なコードマスタではナチュラルキーも有効です。",
        code: `-- サロゲートキー: 連番（SERIAL/IDENTITY）
CREATE TABLE orders (
    order_id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_code  VARCHAR(20) UNIQUE NOT NULL,  -- ビジネスキーはUNIQUEで保護
    customer_id BIGINT NOT NULL,
    order_date  DATE NOT NULL
);

-- サロゲートキー: UUID（分散システム向け）
CREATE TABLE events (
    event_id    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type  VARCHAR(50) NOT NULL,
    payload     JSONB NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- ナチュラルキー: 不変なコード体系の場合に有効
CREATE TABLE countries (
    country_code CHAR(2) PRIMARY KEY,  -- ISO 3166-1 alpha-2
    country_name VARCHAR(100) NOT NULL
);

CREATE TABLE currencies (
    currency_code CHAR(3) PRIMARY KEY,  -- ISO 4217
    currency_name VARCHAR(50) NOT NULL,
    symbol        VARCHAR(5)
);

-- 中間テーブル: 複合キー（サロゲートキーは不要なことが多い）
CREATE TABLE user_roles (
    user_id  BIGINT NOT NULL,
    role_id  INT NOT NULL,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);`,
      },
      {
        title: "データ型選択",
        content:
          "適切なデータ型の選択はストレージ効率・検索性能・データ整合性に直接影響します。数値型は必要な範囲に応じて SMALLINT/INT/BIGINT を選択し、金額には NUMERIC（DECIMAL）を使用します（浮動小数点のFLOATは誤差があるため不適切）。文字列型は固定長ならCHAR、可変長ならVARCHARを使い、上限が不明な長文にはTEXTを使用します。日時型はタイムゾーン付きのTIMESTAMPTZが推奨です。真偽値にはBOOLEAN、構造化データにはJSONBを活用します。",
        code: `-- 数値型の適切な選択
CREATE TABLE products (
    product_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- 金額: NUMERIC で精度を保証（FLOAT は使わない！）
    price        NUMERIC(10, 2) NOT NULL,  -- 最大99999999.99
    tax_rate     NUMERIC(5, 4) NOT NULL,   -- 最大9.9999（例: 0.1000）
    -- 小さい整数: SMALLINT（-32768 ~ 32767）
    stock_count  SMALLINT NOT NULL DEFAULT 0,
    -- フラグ: BOOLEAN
    is_active    BOOLEAN NOT NULL DEFAULT true
);

-- 文字列型の使い分け
CREATE TABLE customers (
    customer_id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- 固定長コード: CHAR
    gender_code  CHAR(1) CHECK (gender_code IN ('M', 'F', 'O')),
    -- 可変長（上限あり）: VARCHAR
    name         VARCHAR(100) NOT NULL,
    email        VARCHAR(255) NOT NULL,
    -- 上限不明の長文: TEXT
    notes        TEXT
);

-- 日時型の選択
CREATE TABLE audit_logs (
    log_id       BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- タイムゾーン付き推奨: TIMESTAMPTZ
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- 日付のみ: DATE
    target_date  DATE,
    -- 構造化データ: JSONB（検索可能）
    details      JSONB NOT NULL DEFAULT '{}'
);

-- NG例: 金額に FLOAT を使う
-- price FLOAT NOT NULL  ← 0.1 + 0.2 = 0.30000000000000004`,
      },
      {
        title: "NULL許容の設計方針",
        content:
          "NULLは「値が不明」「適用不可」を表しますが、安易にNULL許容にすると比較演算やJOINで予期しない結果を招きます。NULLとの比較は常にUNKNOWNを返し、WHERE col = NULL は機能しません（WHERE col IS NULL を使う必要がある）。設計方針として、基本的にはNOT NULLを付与し、本当にNULLが必要な列のみ許容するアプローチが推奨されます。NULLの代わりにデフォルト値や区分コードを使うことで、クエリの複雑さを軽減できます。",
        code: `-- NULL の罠: 三値論理
-- NULL = NULL  → UNKNOWN（trueではない！）
-- NULL <> 1    → UNKNOWN
-- NULL AND true → UNKNOWN

-- NG: NULLを多用した設計
CREATE TABLE employees_bad (
    emp_id      INT PRIMARY KEY,
    name        VARCHAR(100),  -- NULLable（名前がNULL？）
    department  VARCHAR(50),   -- NULLable（所属不明？）
    salary      INT,           -- NULLable（給与不明？）
    deleted_at  TIMESTAMP      -- 論理削除用
);

-- OK: NOT NULLを基本とし、必要な場合のみNULL許容
CREATE TABLE employees (
    emp_id       INT PRIMARY KEY,
    name         VARCHAR(100) NOT NULL,       -- 必須
    department   VARCHAR(50) NOT NULL,        -- 必須
    salary       INT NOT NULL,                -- 必須
    -- 本当にNULLが適切な場合のみ許容
    middle_name  VARCHAR(50),                 -- 任意（ない人もいる）
    resigned_at  TIMESTAMPTZ,                 -- 退職日（在職中はNULL）
    -- NULLの代わりにデフォルト値を使う例
    phone        VARCHAR(20) NOT NULL DEFAULT '',     -- 空文字で代替
    is_deleted   BOOLEAN NOT NULL DEFAULT false       -- フラグで代替
);

-- NULLを考慮したクエリ
SELECT emp_id, name,
       COALESCE(middle_name, '') AS middle_name,  -- NULL安全な変換
       COALESCE(salary, 0) AS salary
FROM employees
WHERE resigned_at IS NULL;   -- IS NULL で比較（= NULL は不可）`,
      },
      {
        title: "制約（UNIQUE / CHECK / FK）",
        content:
          "制約はデータの整合性をデータベースレベルで保証する仕組みです。UNIQUE制約は列または列の組み合わせの一意性を保証します。CHECK制約は値の範囲や条件を検証します。外部キー制約（FK）は参照整合性を保証し、ON DELETE / ON UPDATE で参照先の変更時の振る舞いを定義します。CASCADE は親の削除時に子も削除、SET NULL は NULLに設定、RESTRICT は削除を拒否します。制約はアプリケーション層でのバリデーションと併用し、最終防衛線として機能させます。",
        code: `-- UNIQUE制約: 単一列・複合列
CREATE TABLE users (
    user_id     SERIAL PRIMARY KEY,
    email       VARCHAR(255) UNIQUE NOT NULL,    -- 単一列ユニーク
    username    VARCHAR(50) UNIQUE NOT NULL
);

-- 複合ユニーク制約
CREATE TABLE team_members (
    team_id     INT NOT NULL,
    user_id     INT NOT NULL,
    role        VARCHAR(20) NOT NULL DEFAULT 'MEMBER',
    PRIMARY KEY (team_id, user_id),
    -- 同じチームに同じロールは1人だけ（例: LEADER）
    UNIQUE (team_id, role)  -- ビジネスルールの制約
);

-- CHECK制約: 値の範囲検証
CREATE TABLE products (
    product_id  SERIAL PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    price       NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    discount    NUMERIC(3,2) CHECK (discount BETWEEN 0 AND 1),
    start_date  DATE NOT NULL,
    end_date    DATE,
    -- 複数列にまたがるCHECK制約
    CHECK (end_date IS NULL OR end_date > start_date)
);

-- 外部キー制約: ON DELETE の挙動制御
CREATE TABLE orders (
    order_id     SERIAL PRIMARY KEY,
    customer_id  INT NOT NULL,
    -- CASCADE: 顧客削除時に注文も削除
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
        ON DELETE CASCADE
);

CREATE TABLE comments (
    comment_id   SERIAL PRIMARY KEY,
    author_id    INT,
    -- SET NULL: ユーザー削除時にNULLに設定
    FOREIGN KEY (author_id) REFERENCES users(user_id)
        ON DELETE SET NULL
);

CREATE TABLE accounts (
    account_id   SERIAL PRIMARY KEY,
    owner_id     INT NOT NULL,
    -- RESTRICT: 関連データがある場合は削除を拒否
    FOREIGN KEY (owner_id) REFERENCES users(user_id)
        ON DELETE RESTRICT
);`,
      },
    ],
  },
  // ===== 最適化 =====
  {
    id: "index-design",
    title: "インデックス設計",
    description: "B-Treeインデックスの仕組みから複合インデックス、アンチパターンまで網羅的に学ぶ",
    category: "optimization",
    sections: [
      {
        title: "B-Treeインデックスの仕組み",
        content:
          "B-Treeインデックスはデータベースで最も広く使われるインデックス構造で、ソートされたツリー構造によりO(log N)でのデータ検索を実現します。ルートノードから中間ノードを経てリーフノードに到達し、リーフノードにはインデックス列の値と対応する行ポインタが格納されています。PostgreSQLではCREATE INDEXのデフォルトがB-Treeです。B-Treeは等価比較（=）と範囲検索（<, >, BETWEEN）の両方に効果的です。また、インデックスはソート済みなのでORDER BYの最適化にも利用されます。",
        code: `-- B-Treeインデックスの基本
CREATE TABLE orders (
    order_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id  BIGINT NOT NULL,
    order_date   DATE NOT NULL,
    status       VARCHAR(20) NOT NULL,
    total_amount NUMERIC(12,2)
);

-- 等価検索用のインデックス
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- 範囲検索用のインデックス
CREATE INDEX idx_orders_date ON orders(order_date);

-- インデックスが使われるクエリ
EXPLAIN ANALYZE
SELECT * FROM orders WHERE customer_id = 12345;
-- → Index Scan using idx_orders_customer

EXPLAIN ANALYZE
SELECT * FROM orders WHERE order_date BETWEEN '2025-01-01' AND '2025-12-31';
-- → Index Scan using idx_orders_date

-- インデックスの情報確認
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'orders';

-- インデックスのサイズ確認
SELECT pg_size_pretty(pg_relation_size('idx_orders_customer')) AS index_size;`,
      },
      {
        title: "複合インデックスの列順序",
        content:
          "複合インデックスは複数列を組み合わせたインデックスで、列の順序が性能に大きく影響します。左端一致の原則により、インデックスは左から順に使用されます。(A, B, C)のインデックスはAのみ、A+B、A+B+Cの検索に有効ですが、BのみやCのみの検索には使えません。列の順序は、等価条件で使う列を先に、範囲条件で使う列を後にします。また、カーディナリティ（値の種類数）が高い列を先に置くと効率的です。ただし、実際のクエリパターンを分析して最適な順序を決定することが重要です。",
        code: `-- 複合インデックスの列順序
CREATE TABLE orders (
    order_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id  BIGINT NOT NULL,
    status       VARCHAR(20) NOT NULL,
    order_date   DATE NOT NULL,
    total_amount NUMERIC(12,2)
);

-- 頻繁なクエリ: 特定顧客の特定ステータスの注文を日付順に取得
SELECT * FROM orders
WHERE customer_id = 100
  AND status = 'SHIPPED'
ORDER BY order_date DESC;

-- 最適な複合インデックス（等価条件を先、範囲/ソートを後）
CREATE INDEX idx_orders_cust_status_date
    ON orders(customer_id, status, order_date DESC);

-- 左端一致の原則
-- ✓ WHERE customer_id = 100                          → インデックス使用
-- ✓ WHERE customer_id = 100 AND status = 'SHIPPED'   → インデックス使用
-- ✓ WHERE customer_id = 100 AND status = 'SHIPPED'
--   ORDER BY order_date DESC                          → インデックス使用
-- ✗ WHERE status = 'SHIPPED'                          → インデックス不使用
-- ✗ WHERE order_date > '2025-01-01'                   → インデックス不使用

-- NG: 範囲条件の列を先にすると、以降の列が使われない
CREATE INDEX idx_bad ON orders(order_date, customer_id, status);
-- WHERE order_date > '2025-01-01' AND customer_id = 100
-- → order_date の範囲スキャン後、customer_id のインデックスは使われない`,
      },
      {
        title: "カバリングインデックス",
        content:
          "カバリングインデックスは、クエリで必要なすべての列をインデックスに含め、テーブル本体へのアクセス（ヒープフェッチ）を不要にする手法です。PostgreSQLではINCLUDE句を使って、検索条件には使わないがSELECTで必要な列をインデックスに追加できます。EXPLAIN結果で「Index Only Scan」と表示されればカバリングインデックスが効いています。ただし、インデックスサイズが増大するため、頻繁に実行される重要なクエリに限定して使用します。",
        code: `-- 通常のインデックス: テーブルへのアクセスが必要
CREATE INDEX idx_orders_customer ON orders(customer_id);

EXPLAIN ANALYZE
SELECT customer_id, order_date, total_amount
FROM orders WHERE customer_id = 100;
-- → Index Scan（テーブルからorder_date, total_amountを取得する必要がある）

-- カバリングインデックス: INCLUDE で追加列を含める
CREATE INDEX idx_orders_cust_covering
    ON orders(customer_id)
    INCLUDE (order_date, total_amount);

EXPLAIN ANALYZE
SELECT customer_id, order_date, total_amount
FROM orders WHERE customer_id = 100;
-- → Index Only Scan（テーブルアクセス不要！）

-- 実用例: ダッシュボードの集計クエリを高速化
CREATE INDEX idx_orders_status_covering
    ON orders(status)
    INCLUDE (total_amount);

-- Index Only Scan で高速に集計
SELECT status, COUNT(*), SUM(total_amount)
FROM orders
GROUP BY status;

-- 部分インデックス + カバリング: 特定条件のみ
CREATE INDEX idx_active_orders_covering
    ON orders(customer_id)
    INCLUDE (order_date, total_amount)
    WHERE status = 'ACTIVE';

-- インデックスサイズの比較
SELECT indexname,
       pg_size_pretty(pg_relation_size(indexname::regclass)) AS size
FROM pg_indexes
WHERE tablename = 'orders'
ORDER BY pg_relation_size(indexname::regclass) DESC;`,
      },
      {
        title: "インデックスのアンチパターン",
        content:
          "インデックスにはよくあるアンチパターンがあります。まず、すべての列にインデックスを作成するのは逆効果で、INSERT/UPDATE/DELETEの性能が低下します。次に、インデックス列に関数を適用するとインデックスが使われません（関数インデックスで対処可能）。低カーディナリティ列（性別など値の種類が少ない列）への単独インデックスも非効率です。また、LIKE '%keyword%'のような前方一致でないパターンや、暗黙の型変換もインデックスを無効化します。定期的に未使用インデックスを確認・削除することも重要です。",
        code: `-- アンチパターン1: インデックス列への関数適用
-- NG: インデックスが使われない
SELECT * FROM employees WHERE UPPER(name) = 'TANAKA';
SELECT * FROM orders WHERE EXTRACT(YEAR FROM order_date) = 2025;

-- OK: 関数インデックスを作成
CREATE INDEX idx_emp_name_upper ON employees(UPPER(name));
CREATE INDEX idx_orders_year ON orders(EXTRACT(YEAR FROM order_date));

-- アンチパターン2: 暗黙の型変換
-- NG: 文字列カラムに数値で検索（型変換でインデックス無効化）
-- phone_number は VARCHAR 型
SELECT * FROM customers WHERE phone_number = 09012345678;  -- 数値リテラル
-- OK: 文字列リテラルで検索
SELECT * FROM customers WHERE phone_number = '09012345678';

-- アンチパターン3: LIKE の前方不一致
-- NG: インデックス不使用
SELECT * FROM products WHERE name LIKE '%キーボード%';
-- OK: 全文検索インデックスを使う
CREATE INDEX idx_products_name_gin
    ON products USING gin(to_tsvector('japanese', name));

-- アンチパターン4: 低カーディナリティ列への単独インデックス
-- NG: 値が2〜3種類しかない列への単独インデックス
CREATE INDEX idx_bad ON users(is_active);  -- true/false のみ
-- OK: 部分インデックスで必要な値のみ
CREATE INDEX idx_active_users ON users(user_id) WHERE is_active = true;

-- 未使用インデックスの検出
SELECT schemaname, relname AS table_name,
       indexrelname AS index_name,
       idx_scan AS times_used,
       pg_size_pretty(pg_relation_size(indexrelid)) AS index_size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;`,
      },
    ],
  },
  {
    id: "query-tuning",
    title: "クエリチューニング",
    description: "EXPLAINの読み方から遅いクエリの改善手法、N+1問題の解決まで実践的に学ぶ",
    category: "optimization",
    sections: [
      {
        title: "EXPLAIN / EXPLAIN ANALYZEの読み方",
        content:
          "EXPLAINはクエリの実行計画を表示し、データベースがクエリをどのように実行するかを可視化します。EXPLAIN ANALYZEは実際にクエリを実行して、推定値と実測値の両方を表示します。実行計画はツリー構造で表示され、下位ノードから上位ノードに向かってデータが流れます。重要な指標は、Seq Scan vs Index Scan（走査方式）、rows（推定行数と実際の行数）、cost（推定コスト）、actual time（実行時間）です。推定行数と実際の行数が大きく乖離している場合は、ANALYZEコマンドで統計情報を更新します。",
        code: `-- EXPLAIN: 実行計画の表示（実行はしない）
EXPLAIN
SELECT o.order_id, c.name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= '2025-01-01'
  AND o.status = 'COMPLETED';

-- EXPLAIN ANALYZE: 実際に実行して実測値も表示
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.order_id, c.name, o.total_amount
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= '2025-01-01'
  AND o.status = 'COMPLETED';

-- 実行計画の読み方の例:
-- Hash Join  (cost=15.00..250.00 rows=100 width=48)
--            (actual time=0.5..3.2 rows=95 loops=1)
--   Hash Cond: (o.customer_id = c.customer_id)
--   -> Index Scan using idx_orders_date on orders o
--            (cost=0.42..200.00 rows=100 width=28)
--            (actual time=0.1..2.0 rows=95 loops=1)
--        Filter: (status = 'COMPLETED')
--        Rows Removed by Filter: 5
--   -> Hash  (cost=10.00..10.00 rows=500 width=24)
--            (actual time=0.3..0.3 rows=500 loops=1)
--        -> Seq Scan on customers c
--              (cost=0.00..10.00 rows=500 width=24)
-- Planning Time: 0.2 ms
-- Execution Time: 3.5 ms

-- 統計情報の更新
ANALYZE orders;
ANALYZE customers;`,
      },
      {
        title: "遅いクエリの改善手法",
        content:
          "遅いクエリを改善する手順として、まずEXPLAIN ANALYZEで実行計画を確認し、ボトルネックを特定します。Seq Scan（全件走査）が大きなテーブルに対して実行されている場合はインデックスの追加を検討します。不要なカラムの取得を避け、SELECT * ではなく必要なカラムのみを指定します。サブクエリをJOINに書き換える、EXISTSをIN句の代わりに使う、DISTINCTの代わりにGROUP BYを使うなどの手法も有効です。また、大量データの処理ではLIMITやページネーションを活用します。",
        code: `-- 改善前: 遅いクエリ
SELECT DISTINCT c.name, c.email,
       (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.customer_id) AS order_count,
       (SELECT MAX(order_date) FROM orders o WHERE o.customer_id = c.customer_id) AS last_order
FROM customers c
WHERE c.customer_id IN (
    SELECT customer_id FROM orders WHERE order_date >= '2025-01-01'
);

-- 改善後: JOINと集約に書き換え
SELECT c.name, c.email,
       COUNT(o.order_id) AS order_count,
       MAX(o.order_date) AS last_order
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
WHERE o.order_date >= '2025-01-01'
GROUP BY c.customer_id, c.name, c.email;

-- EXISTS を使った改善（存在チェックのみの場合）
-- NG: IN句は全行評価
SELECT * FROM customers c
WHERE c.customer_id IN (SELECT customer_id FROM orders);

-- OK: EXISTSは一致が見つかれば即座に終了
SELECT * FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);

-- ページネーション: OFFSET方式とキーセット方式
-- NG: OFFSETは大きいほど遅くなる
SELECT * FROM orders ORDER BY order_id LIMIT 20 OFFSET 10000;

-- OK: キーセットページネーション（前ページの最後のIDを基準にする）
SELECT * FROM orders
WHERE order_id > 10000   -- 前ページ最後のorder_id
ORDER BY order_id
LIMIT 20;`,
      },
      {
        title: "N+1問題の解決",
        content:
          "N+1問題は、親テーブルの全レコード（1回のクエリ）を取得した後、各レコードに対して子テーブルへの個別クエリ（N回）が実行されるパフォーマンス問題です。例えば100件の注文を取得した後、各注文の明細を個別に取得すると101回のクエリが発生します。解決策として、JOINで一括取得する方法、IN句でバッチ取得する方法、アプリケーション側でDataLoaderパターンを使う方法があります。ORMを使用する場合はEager Loading（即時読み込み）を明示的に指定することが重要です。",
        code: `-- N+1問題の例:
-- 1回目: 注文一覧を取得
SELECT * FROM orders WHERE status = 'ACTIVE';
-- → 100件の注文が返る

-- 2〜101回目: 各注文の明細を個別に取得（N回）
SELECT * FROM order_items WHERE order_id = 1;
SELECT * FROM order_items WHERE order_id = 2;
-- ... （100回繰り返し）
-- → 合計101回のクエリ！

-- 解決策1: JOINで一括取得（1回のクエリ）
SELECT o.order_id, o.order_date, o.status,
       oi.product_id, oi.quantity, oi.unit_price
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'ACTIVE'
ORDER BY o.order_id;

-- 解決策2: IN句でバッチ取得（2回のクエリ）
-- 1回目: 注文を取得
SELECT * FROM orders WHERE status = 'ACTIVE';

-- 2回目: 関連する明細をIN句で一括取得
SELECT * FROM order_items
WHERE order_id IN (1, 2, 3, ... , 100);

-- 解決策3: LATERAL JOINで各注文の上位N件を取得
SELECT o.order_id, o.order_date, top_items.*
FROM orders o
CROSS JOIN LATERAL (
    SELECT product_id, quantity, unit_price
    FROM order_items oi
    WHERE oi.order_id = o.order_id
    ORDER BY unit_price DESC
    LIMIT 3
) top_items
WHERE o.status = 'ACTIVE';

-- JPA (Java) での対策例:
-- NG: Lazy Loading → N+1発生
-- @OneToMany(fetch = FetchType.LAZY)
-- OK: Eager Loading または JOIN FETCH
-- @Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.status = 'ACTIVE'")`,
      },
      {
        title: "JOINの最適化",
        content:
          "JOINの最適化はクエリチューニングの中核です。データベースは主に3種類のJOINアルゴリズムを使います。Nested Loop Join（小テーブル同士の結合に最適）、Hash Join（大テーブル同士の等価結合に最適）、Merge Join（ソート済みデータの結合に最適）です。JOIN条件のカラムにはインデックスを作成します。不要なJOINを除去し、JOINの順序を意識します（小さいテーブルを駆動表にする）。OUTER JOINよりINNER JOINの方が最適化の余地が大きいため、必要な場合のみOUTER JOINを使います。",
        code: `-- JOINアルゴリズムの確認
EXPLAIN ANALYZE
SELECT o.order_id, c.name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;
-- → Nested Loop / Hash Join / Merge Join のいずれか

-- JOIN最適化1: 結合列へのインデックス
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- JOIN最適化2: 不要なJOINの除去
-- NG: 使わないテーブルもJOINしている
SELECT o.order_id, o.order_date
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
WHERE o.status = 'ACTIVE';

-- OK: 必要なテーブルのみJOIN
SELECT o.order_id, o.order_date
FROM orders o
WHERE o.status = 'ACTIVE'
  AND EXISTS (SELECT 1 FROM order_items oi WHERE oi.order_id = o.order_id);

-- JOIN最適化3: 駆動表の制御（ヒント句）
-- PostgreSQL: 結合順序の固定
SET join_collapse_limit = 1;  -- オプティマイザの結合順序変更を制限

-- JOIN最適化4: マテリアライズドビューで事前結合
CREATE MATERIALIZED VIEW mv_order_summary AS
SELECT o.order_id,
       c.name AS customer_name,
       o.order_date,
       o.status,
       SUM(oi.quantity * oi.unit_price) AS total
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
JOIN order_items oi ON o.order_id = oi.order_id
GROUP BY o.order_id, c.name, o.order_date, o.status;

-- 定期的にリフレッシュ
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_order_summary;

-- マテリアライズドビューに対するインデックス
CREATE UNIQUE INDEX idx_mv_order_id ON mv_order_summary(order_id);`,
      },
    ],
  },
  {
    id: "partitioning",
    title: "パーティションとシャーディング",
    description: "大規模データを効率的に管理するためのパーティションとシャーディングの手法を学ぶ",
    category: "optimization",
    sections: [
      {
        title: "テーブルパーティション（RANGE / LIST / HASH）",
        content:
          "テーブルパーティションは大きなテーブルを物理的に小さなテーブル（パーティション）に分割する手法です。RANGEパーティションは日付や数値の範囲で分割し、時系列データに最適です。LISTパーティションは特定の値のリストで分割し、地域やカテゴリでの分割に適しています。HASHパーティションはハッシュ値で均等に分割し、特定のパターンがないデータの分散に使います。パーティショニングにより、クエリがアクセスするデータ量を削減（パーティションプルーニング）し、メンテナンス操作（VACUUM、インデックス再構築）を効率化できます。",
        code: `-- RANGEパーティション: 月別に分割
CREATE TABLE sales (
    sale_id      BIGINT GENERATED ALWAYS AS IDENTITY,
    sale_date    DATE NOT NULL,
    customer_id  BIGINT NOT NULL,
    amount       NUMERIC(12,2) NOT NULL
) PARTITION BY RANGE (sale_date);

-- 各月のパーティションを作成
CREATE TABLE sales_2025_01 PARTITION OF sales
    FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
CREATE TABLE sales_2025_02 PARTITION OF sales
    FOR VALUES FROM ('2025-02-01') TO ('2025-03-01');
CREATE TABLE sales_2025_03 PARTITION OF sales
    FOR VALUES FROM ('2025-03-01') TO ('2025-04-01');

-- デフォルトパーティション（該当なしのデータ受け皿）
CREATE TABLE sales_default PARTITION OF sales DEFAULT;

-- LISTパーティション: 地域別に分割
CREATE TABLE customers (
    customer_id  BIGINT GENERATED ALWAYS AS IDENTITY,
    name         VARCHAR(100) NOT NULL,
    region       VARCHAR(20) NOT NULL
) PARTITION BY LIST (region);

CREATE TABLE customers_east PARTITION OF customers
    FOR VALUES IN ('東京', '神奈川', '千葉', '埼玉');
CREATE TABLE customers_west PARTITION OF customers
    FOR VALUES IN ('大阪', '京都', '兵庫', '奈良');

-- HASHパーティション: 均等分散
CREATE TABLE logs (
    log_id       BIGINT GENERATED ALWAYS AS IDENTITY,
    user_id      BIGINT NOT NULL,
    action       VARCHAR(50),
    created_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
) PARTITION BY HASH (user_id);

CREATE TABLE logs_p0 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 0);
CREATE TABLE logs_p1 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 1);
CREATE TABLE logs_p2 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 2);
CREATE TABLE logs_p3 PARTITION OF logs FOR VALUES WITH (MODULUS 4, REMAINDER 3);`,
      },
      {
        title: "シャーディングの考え方",
        content:
          "シャーディングは、データを複数のデータベースサーバーに水平分割する手法です。パーティションが1台のサーバー内での分割であるのに対し、シャーディングは複数サーバーに分散します。シャードキーの選択が最も重要で、均等にデータが分散し、クロスシャードクエリが最小限になるキーを選びます。シャーディングの方式には、レンジベース（キーの範囲で分割）、ハッシュベース（ハッシュ値で分割）、ディレクトリベース（マッピングテーブルで管理）があります。シャーディングは運用の複雑さが大幅に増すため、パーティション、リードレプリカ、キャッシュなど他の手法で対処できないか先に検討すべきです。",
        code: `-- シャーディングの概念（アプリケーション層での実装例）

-- シャードキーの選択例: tenant_id（マルチテナントSaaS）
-- シャード1: tenant_id 1〜1000
-- シャード2: tenant_id 1001〜2000
-- シャード3: tenant_id 2001〜3000

-- 各シャードに同じスキーマを作成
-- シャード1 (shard1.example.com)
CREATE TABLE orders (
    order_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tenant_id    INT NOT NULL,
    customer_id  BIGINT NOT NULL,
    order_date   DATE NOT NULL,
    total_amount NUMERIC(12,2)
);

-- シャードルーティング（疑似コード）
-- shard_number = hash(tenant_id) % total_shards
-- connection = get_shard_connection(shard_number)

-- PostgreSQL: Citus拡張によるシャーディング
-- シャーディングの設定
-- SELECT create_distributed_table('orders', 'tenant_id');

-- クロスシャードクエリを避ける設計
-- NG: 異なるシャードキーでJOIN（全シャードにクエリが飛ぶ）
SELECT o.*, p.name
FROM orders o
JOIN products p ON o.product_id = p.product_id;

-- OK: 同じシャードキー（tenant_id）でJOIN
SELECT o.*, oi.quantity
FROM orders o
JOIN order_items oi ON o.order_id = oi.order_id
    AND o.tenant_id = oi.tenant_id;

-- 参照テーブル（全シャードにコピー）
-- SELECT create_reference_table('countries');
-- SELECT create_reference_table('currencies');`,
      },
      {
        title: "大規模テーブルの管理",
        content:
          "大規模テーブル（数億行以上）の管理では、いくつかの重要な運用観点があります。VACUUMの効率化のためにパーティションを活用し、古いパーティションに対する不要なVACUUMを抑制します。統計情報の更新（ANALYZE）を定期的に実行し、オプティマイザが適切な実行計画を選択できるようにします。テーブルの膨張（Bloat）を監視し、必要に応じてpg_repackやVACUUM FULLで対処します。また、大規模テーブルへのALTER TABLEはロックが長時間かかる可能性があるため、計画的に実施する必要があります。",
        code: `-- テーブルサイズの確認
SELECT relname AS table_name,
       pg_size_pretty(pg_total_relation_size(oid)) AS total_size,
       pg_size_pretty(pg_relation_size(oid)) AS data_size,
       pg_size_pretty(pg_indexes_size(oid)) AS index_size,
       reltuples::BIGINT AS estimated_rows
FROM pg_class
WHERE relkind = 'r'
ORDER BY pg_total_relation_size(oid) DESC
LIMIT 10;

-- テーブル膨張率（Bloat）の確認
SELECT schemaname, relname,
       n_dead_tup,
       n_live_tup,
       ROUND(n_dead_tup * 100.0 / NULLIF(n_live_tup + n_dead_tup, 0), 2)
           AS dead_ratio_pct,
       last_vacuum,
       last_autovacuum
FROM pg_stat_user_tables
WHERE n_live_tup > 0
ORDER BY n_dead_tup DESC
LIMIT 10;

-- 自動VACUUMの調整（大規模テーブル向け）
ALTER TABLE huge_table SET (
    autovacuum_vacuum_scale_factor = 0.01,     -- デフォルト0.2 → 1%で発火
    autovacuum_analyze_scale_factor = 0.005,   -- デフォルト0.1 → 0.5%で発火
    autovacuum_vacuum_cost_delay = 10          -- デフォルト20ms → 高速化
);

-- 大規模テーブルへの安全なカラム追加
-- NG: デフォルト値付きは全行書き換え（古いPostgreSQLの場合）
-- ALTER TABLE huge_table ADD COLUMN new_col INT DEFAULT 0;

-- OK: PostgreSQL 11以降はデフォルト値付きでも即座に完了
ALTER TABLE huge_table ADD COLUMN new_col INT DEFAULT 0;

-- NOT NULL制約の安全な追加
-- 1. CHECK制約をNOT VALIDで追加（ロック最小限）
ALTER TABLE huge_table
    ADD CONSTRAINT chk_new_col CHECK (new_col IS NOT NULL) NOT VALID;

-- 2. バックグラウンドでバリデーション（ShareUpdateExclusiveLockのみ）
ALTER TABLE huge_table VALIDATE CONSTRAINT chk_new_col;`,
      },
      {
        title: "アーカイブ戦略",
        content:
          "アーカイブ戦略は、古いデータを本番テーブルから移動して性能を維持する手法です。パーティションを使ったアーカイブでは、古いパーティションをデタッチして別のテーブルスペースに移動したり、圧縮形式で保存したりします。アーカイブの判断基準は、データの参照頻度、法的保存期間、ストレージコストなどです。段階的なアーカイブ（ホットデータ→ウォームデータ→コールドデータ→削除）を設計し、必要に応じてアーカイブデータを参照できる仕組みも用意します。",
        code: `-- パーティションベースのアーカイブ
-- 1. 古いパーティションのデタッチ
ALTER TABLE sales DETACH PARTITION sales_2023_01;

-- 2. アーカイブテーブルスペースへ移動
ALTER TABLE sales_2023_01
    SET TABLESPACE archive_tablespace;

-- 3. アーカイブテーブルとしてリネーム
ALTER TABLE sales_2023_01 RENAME TO archive_sales_2023_01;

-- 4. 必要ならば圧縮（外部テーブル/pg_dump）
-- pg_dump -t archive_sales_2023_01 -Fc dbname > archive_2023_01.dump

-- バッチ削除によるアーカイブ（パーティション未使用の場合）
-- NG: 一括DELETE（長時間ロック、WAL大量生成）
DELETE FROM logs WHERE created_at < '2024-01-01';

-- OK: バッチ処理で少しずつ削除
DO \$\$
DECLARE
    deleted_count INT;
BEGIN
    LOOP
        DELETE FROM logs
        WHERE ctid IN (
            SELECT ctid FROM logs
            WHERE created_at < '2024-01-01'
            LIMIT 10000
        );
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        EXIT WHEN deleted_count = 0;
        COMMIT;
        PERFORM pg_sleep(0.1);  -- 負荷軽減のための待機
    END LOOP;
END \$\$;

-- アーカイブデータへの透過的アクセス（ビュー）
CREATE VIEW all_sales AS
    SELECT * FROM sales             -- 現在のデータ
    UNION ALL
    SELECT * FROM archive_sales_2023_01  -- アーカイブデータ
    UNION ALL
    SELECT * FROM archive_sales_2023_02;

-- データライフサイクルポリシーの例:
-- ホット（0〜3ヶ月）  : SSD、フルインデックス
-- ウォーム（3〜12ヶ月）: HDD、最小限インデックス
-- コールド（1〜5年）   : 圧縮保存、必要時のみアクセス
-- 削除（5年超）        : 法定保存期間終了後に完全削除`,
      },
    ],
  },
  // ===== 実践 =====
  {
    id: "transaction-lock",
    title: "トランザクションとロック",
    description: "ACID特性、分離レベル、デッドロック対策、楽観的/悲観的ロックを学ぶ",
    category: "practice",
    sections: [
      {
        title: "ACID特性",
        content:
          "ACIDはトランザクションが満たすべき4つの特性です。原子性（Atomicity）はトランザクション内の操作がすべて成功するかすべて失敗するかのいずれかであることを保証します。一貫性（Consistency）はトランザクション前後でデータベースの整合性制約が維持されることを保証します。分離性（Isolation）は同時実行されるトランザクションが互いに干渉しないことを保証します。永続性（Durability）はコミットされたトランザクションの結果が永続的に保存されることを保証します。これらはリレーショナルデータベースの信頼性の基盤です。",
        code: `-- 原子性（Atomicity）: 全て成功 or 全て失敗
BEGIN;
    -- 送金元から引き落とし
    UPDATE accounts SET balance = balance - 10000
    WHERE account_id = 'A001';

    -- 送金先に入金
    UPDATE accounts SET balance = balance + 10000
    WHERE account_id = 'B001';

    -- 送金履歴を記録
    INSERT INTO transfers (from_account, to_account, amount, transferred_at)
    VALUES ('A001', 'B001', 10000, CURRENT_TIMESTAMP);
COMMIT;  -- 3つの操作がすべて成功して初めて確定
-- エラーが発生した場合は ROLLBACK で全て取り消し

-- 一貫性（Consistency）: 制約を常に満たす
ALTER TABLE accounts
    ADD CONSTRAINT chk_balance CHECK (balance >= 0);
-- 残高がマイナスになる操作はCHECK制約で拒否される

-- セーブポイント: トランザクション内の部分的なロールバック
BEGIN;
    INSERT INTO orders (customer_id, order_date) VALUES (1, CURRENT_DATE);

    SAVEPOINT sp1;

    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (currval('orders_order_id_seq'), 999, 1);
    -- エラーが発生した場合
    ROLLBACK TO SAVEPOINT sp1;  -- この操作だけ取り消し

    -- 別の操作を続行
    INSERT INTO order_items (order_id, product_id, quantity)
    VALUES (currval('orders_order_id_seq'), 100, 2);
COMMIT;`,
      },
      {
        title: "分離レベル（Read Uncommitted〜Serializable）",
        content:
          "分離レベルは同時実行トランザクション間の干渉度合いを定義します。Read Uncommittedは他のトランザクションの未コミットデータを読めるため、ダーティリードが発生します（PostgreSQLでは実質Read Committed）。Read Committedはコミット済みデータのみ読み取り、最も一般的に使われます。Repeatable Readはトランザクション内で同じクエリが同じ結果を返すことを保証します。Serializableは完全な分離を提供し、直列実行と同じ結果を保証しますが、性能コストが高くなります。",
        code: `-- 分離レベルの設定
-- トランザクション単位で設定
BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;
-- または
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- セッション単位で設定
SET SESSION CHARACTERISTICS AS TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- 現在の分離レベルを確認
SHOW transaction_isolation;

-- Read Committed（デフォルト）: ノンリピータブルリードが発生しうる
-- トランザクション1                 | トランザクション2
-- BEGIN;                            |
-- SELECT balance FROM accounts      |
--   WHERE id=1; → 10000            |
--                                   | BEGIN;
--                                   | UPDATE accounts SET balance=5000
--                                   |   WHERE id=1;
--                                   | COMMIT;
-- SELECT balance FROM accounts      |
--   WHERE id=1; → 5000 (変わった!) |
-- COMMIT;                           |

-- Repeatable Read: 同じ結果を保証
-- トランザクション1                 | トランザクション2
-- BEGIN ISOLATION LEVEL              |
--   REPEATABLE READ;                |
-- SELECT balance FROM accounts      |
--   WHERE id=1; → 10000            |
--                                   | BEGIN;
--                                   | UPDATE accounts SET balance=5000
--                                   |   WHERE id=1;
--                                   | COMMIT;
-- SELECT balance FROM accounts      |
--   WHERE id=1; → 10000 (変わらない)|
-- COMMIT;                           |

-- Serializable: 直列化異常を検出
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;
-- 競合が検出されるとエラー:
-- ERROR: could not serialize access due to concurrent update
-- → アプリケーション側でリトライが必要`,
      },
      {
        title: "デッドロックの原因と対策",
        content:
          "デッドロックは2つ以上のトランザクションが互いにロックの解放を待ち合う状態です。トランザクション1がテーブルAをロックしてテーブルBを待ち、トランザクション2がテーブルBをロックしてテーブルAを待つと発生します。データベースはデッドロックを検出すると、一方のトランザクションを強制ロールバックします。対策として、テーブルやレコードのアクセス順序を統一する、トランザクションを短くする、必要最小限のロックを取得する、タイムアウトを設定するなどがあります。",
        code: `-- デッドロックの発生例
-- トランザクション1                 | トランザクション2
-- BEGIN;                            | BEGIN;
-- UPDATE accounts SET balance=900   |
--   WHERE id=1; -- id=1をロック     |
--                                   | UPDATE accounts SET balance=900
--                                   |   WHERE id=2; -- id=2をロック
-- UPDATE accounts SET balance=1100  |
--   WHERE id=2; -- id=2を待機...    |
--                                   | UPDATE accounts SET balance=1100
--                                   |   WHERE id=1; -- id=1を待機...
-- → デッドロック発生！              |

-- 対策1: アクセス順序を統一（常にid昇順でロック）
BEGIN;
    -- 必ず小さいIDから順にロック
    SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
    SELECT * FROM accounts WHERE id = 2 FOR UPDATE;
    UPDATE accounts SET balance = balance - 100 WHERE id = 1;
    UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;

-- 対策2: ロックタイムアウトの設定
SET lock_timeout = '5s';  -- 5秒でタイムアウト

-- 対策3: NOWAIT でロック待ちをしない
SELECT * FROM accounts WHERE id = 1 FOR UPDATE NOWAIT;
-- ロックが取得できない場合は即座にエラー

-- 対策4: SKIP LOCKED でロック済み行をスキップ
-- キュー処理パターンで有効
SELECT * FROM task_queue
WHERE status = 'PENDING'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;

-- デッドロックのログ確認
-- log_lock_waits = on に設定すると詳細ログが出力される
-- PostgreSQLのログ例:
-- ERROR: deadlock detected
-- DETAIL: Process 1234 waits for ShareLock on transaction 5678;
--         blocked by process 9012.`,
      },
      {
        title: "楽観的ロックと悲観的ロック",
        content:
          "悲観的ロック（Pessimistic Locking）はデータ読み取り時にロックを取得し、他のトランザクションのアクセスを防ぎます。SELECT ... FOR UPDATEで実現し、競合が頻繁に発生する場合に適しています。楽観的ロック（Optimistic Locking）はロックを取得せず、更新時にバージョン番号やタイムスタンプを確認して競合を検出します。競合が稀な場合に適しており、読み取りが多いWebアプリケーションで広く使われます。楽観的ロックは競合時にアプリケーション側でリトライ処理を実装する必要があります。",
        code: `-- 悲観的ロック: SELECT ... FOR UPDATE
BEGIN;
    -- 行ロックを取得（他のトランザクションは待機する）
    SELECT * FROM products
    WHERE product_id = 100
    FOR UPDATE;

    -- 在庫の確認と更新（ロック中は他からの変更不可）
    UPDATE products
    SET stock_count = stock_count - 1
    WHERE product_id = 100
      AND stock_count > 0;
COMMIT;

-- 楽観的ロック: バージョン番号方式
CREATE TABLE products (
    product_id   BIGINT PRIMARY KEY,
    name         VARCHAR(200) NOT NULL,
    price        NUMERIC(10,2) NOT NULL,
    stock_count  INT NOT NULL DEFAULT 0,
    version      INT NOT NULL DEFAULT 1  -- バージョン番号
);

-- 1. データを読み取り（ロックなし）
SELECT product_id, name, price, stock_count, version
FROM products WHERE product_id = 100;
-- → version = 5 を取得

-- 2. 更新時にバージョンを確認
UPDATE products
SET price = 2980,
    version = version + 1     -- バージョンをインクリメント
WHERE product_id = 100
  AND version = 5;            -- 読み取り時のバージョンと一致するか確認

-- 更新行数が0の場合は競合が発生 → リトライまたはエラー
-- GET DIAGNOSTICS row_count = ROW_COUNT;
-- IF row_count = 0 THEN
--     RAISE EXCEPTION '楽観的ロックエラー: 他のユーザーがデータを更新しました';
-- END IF;

-- 楽観的ロック: タイムスタンプ方式
CREATE TABLE articles (
    article_id   BIGINT PRIMARY KEY,
    title        VARCHAR(200) NOT NULL,
    content      TEXT,
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

UPDATE articles
SET title = '新しいタイトル',
    updated_at = CURRENT_TIMESTAMP
WHERE article_id = 1
  AND updated_at = '2025-06-15 10:30:00+09';  -- 読み取り時の値と比較`,
      },
    ],
  },
  {
    id: "migration",
    title: "マイグレーション管理",
    description: "Flyway/Liquibaseを使ったスキーマ管理とゼロダウンタイムマイグレーションを学ぶ",
    category: "practice",
    sections: [
      {
        title: "Flyway / Liquibase",
        content:
          "FlywayとLiquibaseはデータベースマイグレーションツールの代表的な選択肢です。Flywayはシンプルさが特徴で、SQLファイルをバージョン番号付きで管理します（V1__create_users.sql）。Liquibaseはより柔軟で、XML/YAML/JSON/SQLの複数形式に対応し、ロールバック機能も充実しています。どちらもCI/CDパイプラインに組み込み、スキーマ変更を自動適用できます。マイグレーションファイルは一度適用したら変更せず、新しいバージョンで修正するのが原則です。",
        code: `-- Flyway: マイグレーションファイルの命名規則
-- V{version}__{description}.sql（バージョン付きマイグレーション）
-- R__{description}.sql（リピータブルマイグレーション）

-- V1__create_users_table.sql
CREATE TABLE users (
    user_id      BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username     VARCHAR(50) UNIQUE NOT NULL,
    email        VARCHAR(255) UNIQUE NOT NULL,
    password     VARCHAR(255) NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- V2__add_user_profile.sql
CREATE TABLE user_profiles (
    user_id      BIGINT PRIMARY KEY,
    display_name VARCHAR(100),
    bio          TEXT,
    avatar_url   VARCHAR(500),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- V3__add_status_to_users.sql
ALTER TABLE users ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE';
CREATE INDEX idx_users_status ON users(status);

-- flyway.conf の設定例
-- flyway.url=jdbc:postgresql://localhost:5432/mydb
-- flyway.user=myuser
-- flyway.password=mypass
-- flyway.locations=filesystem:src/main/resources/db/migration

-- Flywayコマンド:
-- flyway migrate   : マイグレーション実行
-- flyway info      : 適用状況の確認
-- flyway validate  : 整合性チェック
-- flyway repair    : メタデータテーブルの修復`,
      },
      {
        title: "スキーマ変更の安全な手順",
        content:
          "本番環境でのスキーマ変更は慎重に行う必要があります。カラム追加は比較的安全ですが、カラム削除やリネームはアプリケーションとの互換性を考慮する必要があります。大きなテーブルへのインデックス追加はCONCURRENTLYオプションを使い、テーブルロックを避けます。NOT NULL制約の追加は、まずデフォルト値を設定してからデータを埋め、その後で制約を追加する段階的なアプローチが安全です。変更前にはステージング環境での検証と、ロールバック手順の準備が必須です。",
        code: `-- 安全なカラム追加（PostgreSQL 11+ではデフォルト値付きでも即座に完了）
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- 安全なインデックス追加: CONCURRENTLY（テーブルロックなし）
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
-- 注意: トランザクション内では使えない。失敗時は INVALID インデックスが残る
-- DROP INDEX CONCURRENTLY idx_users_email;  -- 失敗時のクリーンアップ

-- 安全なカラムリネーム（3段階デプロイ）
-- Step 1: 新カラム追加 + データコピー
ALTER TABLE users ADD COLUMN full_name VARCHAR(100);
UPDATE users SET full_name = name;

-- Step 2: アプリケーションを新旧両方のカラムに対応させてデプロイ
-- アプリ側で name と full_name の両方に書き込み

-- Step 3: 旧カラム削除（全コンポーネントが新カラムを使用確認後）
ALTER TABLE users DROP COLUMN name;

-- 安全なNOT NULL制約の追加
-- Step 1: デフォルト値を設定
ALTER TABLE users ALTER COLUMN phone SET DEFAULT '';

-- Step 2: 既存のNULLデータを埋める（バッチ処理）
UPDATE users SET phone = '' WHERE phone IS NULL;

-- Step 3: NOT VALID で制約追加（既存データはチェックしない）
ALTER TABLE users
    ADD CONSTRAINT chk_phone_not_null CHECK (phone IS NOT NULL) NOT VALID;

-- Step 4: バリデーション（バックグラウンドで実行）
ALTER TABLE users VALIDATE CONSTRAINT chk_phone_not_null;

-- Step 5: 正式にNOT NULL制約に変換
ALTER TABLE users ALTER COLUMN phone SET NOT NULL;
ALTER TABLE users DROP CONSTRAINT chk_phone_not_null;`,
      },
      {
        title: "ゼロダウンタイムマイグレーション",
        content:
          "ゼロダウンタイムマイグレーションは、サービスを停止せずにスキーマ変更を行う手法です。基本原則は後方互換性を保つことで、Expand-Contract（拡張-縮小）パターンが基本戦略です。Expandフェーズでは新しい構造を追加（カラム追加、新テーブル作成）し、旧構造との互換性を維持します。Contractフェーズではすべてのコンポーネントが新構造に移行した後、旧構造を削除します。各フェーズ間にはアプリケーションのデプロイが挟まるため、複数回のリリースにまたがることが一般的です。",
        code: `-- Expand-Contractパターンの実例: テーブル分割

-- 現状: users テーブルにアドレス情報が含まれている
-- 目標: addresses テーブルに分離する

-- === Expand フェーズ（リリース1） ===
-- 新テーブルを作成
CREATE TABLE addresses (
    address_id   BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id      BIGINT NOT NULL UNIQUE,
    postal_code  VARCHAR(10),
    prefecture   VARCHAR(10),
    city         VARCHAR(50),
    street       VARCHAR(100),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- 既存データを移行
INSERT INTO addresses (user_id, postal_code, prefecture, city, street)
SELECT user_id, postal_code, prefecture, city, street
FROM users
WHERE postal_code IS NOT NULL;

-- トリガーで両方を同期（移行期間中）
CREATE OR REPLACE FUNCTION sync_address()
RETURNS TRIGGER AS \$\$
BEGIN
    INSERT INTO addresses (user_id, postal_code, prefecture, city, street)
    VALUES (NEW.user_id, NEW.postal_code, NEW.prefecture, NEW.city, NEW.street)
    ON CONFLICT (user_id) DO UPDATE SET
        postal_code = EXCLUDED.postal_code,
        prefecture = EXCLUDED.prefecture,
        city = EXCLUDED.city,
        street = EXCLUDED.street;
    RETURN NEW;
END;
\$\$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_address
AFTER INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION sync_address();

-- === アプリケーションデプロイ（リリース2） ===
-- 全コンポーネントが addresses テーブルを参照するように変更

-- === Contract フェーズ（リリース3） ===
-- トリガーを削除
DROP TRIGGER trg_sync_address ON users;
DROP FUNCTION sync_address();

-- 旧カラムを削除
ALTER TABLE users DROP COLUMN postal_code;
ALTER TABLE users DROP COLUMN prefecture;
ALTER TABLE users DROP COLUMN city;
ALTER TABLE users DROP COLUMN street;`,
      },
      {
        title: "データ移行のベストプラクティス",
        content:
          "データ移行は計画的に実施する必要があります。大量データの移行はバッチ処理で分割して実行し、本番環境への影響を最小限に抑えます。移行前にはデータのバリデーション計画を立て、移行後のデータ件数・整合性の確認手順を用意します。ロールバック計画は必須で、問題発生時に即座に元の状態に戻せるようにします。移行の進捗は可視化し、長時間の移行ではログテーブルに進捗を記録します。また、移行スクリプトはステージング環境で十分にテストし、本番と同等のデータ量で性能を検証します。",
        code: `-- バッチ処理による大量データ移行
CREATE TABLE migration_log (
    batch_id     SERIAL PRIMARY KEY,
    table_name   VARCHAR(100) NOT NULL,
    start_id     BIGINT NOT NULL,
    end_id       BIGINT NOT NULL,
    row_count    INT NOT NULL,
    status       VARCHAR(20) NOT NULL DEFAULT 'RUNNING',
    started_at   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMPTZ,
    error_msg    TEXT
);

-- バッチ移行プロシージャ
CREATE OR REPLACE PROCEDURE migrate_orders_batch(
    p_batch_size INT DEFAULT 10000
) LANGUAGE plpgsql AS \$\$
DECLARE
    v_min_id BIGINT;
    v_max_id BIGINT;
    v_current_id BIGINT;
    v_batch_id INT;
    v_count INT;
BEGIN
    SELECT MIN(order_id), MAX(order_id)
    INTO v_min_id, v_max_id
    FROM orders_old;

    v_current_id := v_min_id;

    WHILE v_current_id <= v_max_id LOOP
        INSERT INTO migration_log (table_name, start_id, end_id, row_count)
        VALUES ('orders', v_current_id, v_current_id + p_batch_size - 1, 0)
        RETURNING batch_id INTO v_batch_id;

        INSERT INTO orders_new (order_id, customer_id, order_date, status, total_amount)
        SELECT order_id, customer_id, order_date,
               COALESCE(status, 'UNKNOWN'),  -- データクレンジング
               ROUND(total_amount, 2)
        FROM orders_old
        WHERE order_id >= v_current_id
          AND order_id < v_current_id + p_batch_size;

        GET DIAGNOSTICS v_count = ROW_COUNT;

        UPDATE migration_log
        SET row_count = v_count,
            status = 'COMPLETED',
            completed_at = CURRENT_TIMESTAMP
        WHERE batch_id = v_batch_id;

        COMMIT;
        v_current_id := v_current_id + p_batch_size;
    END LOOP;
END \$\$;

-- データ整合性の検証
SELECT 'orders_old' AS source, COUNT(*) AS cnt FROM orders_old
UNION ALL
SELECT 'orders_new' AS source, COUNT(*) AS cnt FROM orders_new;

-- 合計金額の一致確認
SELECT 'orders_old' AS source, SUM(total_amount) AS total FROM orders_old
UNION ALL
SELECT 'orders_new' AS source, SUM(total_amount) AS total FROM orders_new;`,
      },
    ],
  },
];

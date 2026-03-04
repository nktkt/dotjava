export interface PostgresqlSection {
  title: string;
  content: string;
  code?: string;
}

export interface PostgresqlChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: PostgresqlSection[];
}

export const postgresqlCategories = [
  { id: "basics", name: "基礎・導入", color: "var(--color-dads-blue)" },
  { id: "sql", name: "SQL操作", color: "var(--color-dads-cyan)" },
  { id: "advanced-sql", name: "高度なSQL", color: "var(--color-dads-purple)" },
  { id: "functions", name: "関数・手続き", color: "var(--color-dads-success)" },
  { id: "design", name: "設計・制約", color: "var(--color-dads-warning)" },
  { id: "performance", name: "パフォーマンス", color: "var(--color-dads-error)" },
  { id: "admin", name: "管理・運用", color: "var(--color-dads-navy)" },
] as const;

export const postgresqlChapters: PostgresqlChapter[] = [
  // ===== 基礎・導入 =====
  {
    id: "introduction",
    title: "PostgreSQLの基礎",
    category: "basics",
    description:
      "PostgreSQLの特徴、インストール、psqlの基本操作、データベースとスキーマの作成を学ぶ",
    sections: [
      {
        title: "PostgreSQLとは",
        content:
          "PostgreSQL は世界で最も先進的なオープンソースのリレーショナルデータベースです。ACID 準拠、MVCC（多版型同時実行制御）、豊富なデータ型、JSON サポート、全文検索、地理情報（PostGIS）など高度な機能を備えています。MySQL と比較して SQL 標準への準拠度が高く、ウィンドウ関数、CTE、JSONB などの高度な機能をフルサポートしています。",
        code: `-- PostgreSQL のバージョン確認
SELECT version();

-- データベース一覧
\\l

-- データベースの作成
CREATE DATABASE myapp;

-- データベースへの接続
\\c myapp

-- スキーマの作成
CREATE SCHEMA app;

-- 現在の接続情報
SELECT current_database(), current_user, current_schema();

-- psql の基本コマンド
-- \\l     データベース一覧
-- \\dt    テーブル一覧
-- \\d テーブル名  テーブル定義
-- \\dn    スキーマ一覧
-- \\df    関数一覧
-- \\q     終了
-- \\?     ヘルプ`,
      },
      {
        title: "データ型",
        content:
          "PostgreSQL は非常に豊富なデータ型を提供します。数値型（integer, bigint, numeric, real, double precision）、文字型（varchar, text, char）、日付時刻型（date, time, timestamp, interval）に加え、UUID、JSON/JSONB、配列、範囲型、幾何学型などの特殊な型もサポートしています。適切なデータ型を選択することがパフォーマンスとデータ整合性の鍵となります。",
        code: `-- 数値型
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,        -- 自動採番（4バイト）
  big_id      BIGSERIAL,                 -- 自動採番（8バイト）
  price       NUMERIC(10, 2),            -- 精密小数（10桁、小数2桁）
  weight      REAL,                      -- 単精度浮動小数
  rating      DOUBLE PRECISION           -- 倍精度浮動小数
);

-- 文字型
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(50) NOT NULL,      -- 可変長（最大50文字）
  email       TEXT NOT NULL,             -- 可変長（制限なし）
  code        CHAR(10)                   -- 固定長（10文字）
);

-- 日付時刻型
CREATE TABLE events (
  id          SERIAL PRIMARY KEY,
  event_date  DATE,                      -- 日付のみ
  start_time  TIME,                      -- 時刻のみ
  created_at  TIMESTAMP DEFAULT NOW(),   -- 日付+時刻
  updated_at  TIMESTAMPTZ DEFAULT NOW(), -- タイムゾーン付き
  duration    INTERVAL                   -- 期間
);

-- 特殊な型
CREATE TABLE metadata (
  id          UUID DEFAULT gen_random_uuid(),  -- UUID
  tags        TEXT[],                          -- 配列
  settings    JSONB,                           -- JSON（バイナリ）
  is_active   BOOLEAN DEFAULT true             -- 真偽値
);`,
      },
      {
        title: "テーブルの作成と管理",
        content:
          "CREATE TABLE でテーブルを作成し、ALTER TABLE で構造を変更、DROP TABLE で削除します。SERIAL / BIGSERIAL は自動採番カラム、GENERATED ALWAYS AS IDENTITY は SQL 標準の自動採番です。IF NOT EXISTS で存在確認付きの作成、CASCADE で依存オブジェクトを含めた削除が可能です。COMMENT ON でテーブルやカラムにコメントを付けるとドキュメント化に役立ちます。",
        code: `-- テーブル作成
CREATE TABLE IF NOT EXISTS employees (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name  VARCHAR(50) NOT NULL,
  last_name   VARCHAR(50) NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  department  VARCHAR(100),
  salary      NUMERIC(12, 2),
  hire_date   DATE DEFAULT CURRENT_DATE,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- カラムの追加
ALTER TABLE employees ADD COLUMN phone VARCHAR(20);

-- カラムの変更
ALTER TABLE employees ALTER COLUMN phone TYPE TEXT;
ALTER TABLE employees ALTER COLUMN department SET NOT NULL;

-- カラムの削除
ALTER TABLE employees DROP COLUMN phone;

-- カラム名の変更
ALTER TABLE employees RENAME COLUMN first_name TO given_name;

-- テーブル名の変更
ALTER TABLE employees RENAME TO staff;

-- コメント
COMMENT ON TABLE employees IS '従業員マスタ';
COMMENT ON COLUMN employees.salary IS '月額給与（税込）';

-- テーブル削除
DROP TABLE IF EXISTS employees CASCADE;`,
      },
    ],
  },
  {
    id: "data-types-special",
    title: "特殊データ型",
    category: "basics",
    description:
      "JSONB、配列、UUID、列挙型、範囲型など PostgreSQL 固有の強力なデータ型を活用する",
    sections: [
      {
        title: "JSONB",
        content:
          "JSONB はバイナリ形式で格納される JSON 型で、高速な検索とインデックス作成が可能です。-> で JSON オブジェクトを取得、->> でテキストとして取得、#> でネストされたパスを指定できます。@>（包含）、?（キー存在確認）などの演算子でクエリを記述し、GIN インデックスで高速化できます。",
        code: `-- JSONB カラムの作成
CREATE TABLE orders (
  id       SERIAL PRIMARY KEY,
  customer TEXT NOT NULL,
  details  JSONB NOT NULL
);

-- データ挿入
INSERT INTO orders (customer, details) VALUES
('田中', '{"items": [{"name": "本", "price": 1500}, {"name": "ペン", "price": 200}], "total": 1700}'),
('鈴木', '{"items": [{"name": "PC", "price": 80000}], "total": 80000, "priority": true}');

-- JSON の値を取得
SELECT customer,
       details -> 'total' AS total_json,        -- JSONB型で取得
       details ->> 'total' AS total_text,        -- テキストで取得
       details -> 'items' -> 0 ->> 'name' AS first_item, -- ネスト
       details #>> '{items,0,name}' AS first_item2       -- パス指定
FROM orders;

-- JSONB 演算子でフィルタ
SELECT * FROM orders WHERE details @> '{"priority": true}';  -- 包含
SELECT * FROM orders WHERE details ? 'priority';             -- キー存在
SELECT * FROM orders WHERE (details ->> 'total')::int > 5000; -- 比較

-- JSONB の更新
UPDATE orders SET details = details || '{"status": "shipped"}'
WHERE id = 1;  -- キーの追加/更新

UPDATE orders SET details = details - 'priority'
WHERE id = 2;  -- キーの削除

-- GIN インデックス
CREATE INDEX idx_orders_details ON orders USING GIN (details);`,
      },
      {
        title: "配列型",
        content:
          "PostgreSQL は配列型をネイティブサポートしています。TEXT[]、INTEGER[] のように定義し、ARRAY コンストラクタや {} リテラルで値を指定します。ANY / ALL で配列内の検索、array_agg で集約、unnest で配列を行に展開できます。@>（包含）、&&（重複）演算子で配列同士の比較が可能です。",
        code: `-- 配列カラム
CREATE TABLE articles (
  id    SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  tags  TEXT[] DEFAULT '{}'
);

-- 挿入
INSERT INTO articles (title, tags) VALUES
('PostgreSQL入門', ARRAY['database', 'postgresql', 'sql']),
('React入門', '{"frontend", "react", "javascript"}'),
('フルスタック開発', ARRAY['frontend', 'backend', 'database']);

-- 配列の要素アクセス（1始まり）
SELECT title, tags[1] AS first_tag FROM articles;

-- 配列の検索
SELECT * FROM articles WHERE 'database' = ANY(tags);    -- 含む
SELECT * FROM articles WHERE tags @> ARRAY['sql'];      -- 包含
SELECT * FROM articles WHERE tags && ARRAY['react', 'sql']; -- 重複あり

-- 配列の操作
UPDATE articles SET tags = array_append(tags, 'new-tag') WHERE id = 1;
UPDATE articles SET tags = array_remove(tags, 'sql') WHERE id = 1;

-- 配列の集約
SELECT array_agg(title) FROM articles WHERE 'database' = ANY(tags);

-- 配列を行に展開
SELECT title, unnest(tags) AS tag FROM articles;

-- 配列の長さ
SELECT title, array_length(tags, 1) AS tag_count FROM articles;

-- GIN インデックス
CREATE INDEX idx_articles_tags ON articles USING GIN (tags);`,
      },
      {
        title: "列挙型・UUID・範囲型",
        content:
          "ENUM（列挙型）は取りうる値を限定する型で、データの整合性を保証します。UUID は一意識別子の生成に使い、gen_random_uuid() で自動生成できます。範囲型（int4range, tsrange, daterange）は値の範囲を1つの値として扱い、予約システムやスケジュール管理に便利です。",
        code: `-- 列挙型（ENUM）
CREATE TYPE order_status AS ENUM (
  'pending', 'processing', 'shipped', 'delivered', 'cancelled'
);

CREATE TABLE shop_orders (
  id     SERIAL PRIMARY KEY,
  status order_status DEFAULT 'pending'
);

INSERT INTO shop_orders (status) VALUES ('processing');
SELECT * FROM shop_orders WHERE status = 'processing';
-- 列挙型の値追加
ALTER TYPE order_status ADD VALUE 'refunded' AFTER 'cancelled';

-- UUID
CREATE EXTENSION IF NOT EXISTS pgcrypto;  -- 古いバージョン用

CREATE TABLE sessions (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO sessions (user_id) VALUES (1);
SELECT * FROM sessions;
-- id: a1b2c3d4-e5f6-7890-abcd-ef1234567890

-- 範囲型
CREATE TABLE reservations (
  id       SERIAL PRIMARY KEY,
  room     TEXT NOT NULL,
  period   TSRANGE NOT NULL,  -- タイムスタンプ範囲
  EXCLUDE USING GIST (room WITH =, period WITH &&)
  -- 同じ部屋の期間重複を排除
);

INSERT INTO reservations (room, period) VALUES
('A101', '[2025-04-01 09:00, 2025-04-01 12:00)');

-- 範囲の検索
SELECT * FROM reservations
WHERE period @> '2025-04-01 10:00'::timestamp;  -- 含む
SELECT * FROM reservations
WHERE period && '[2025-04-01 11:00, 2025-04-01 14:00)'; -- 重複`,
      },
    ],
  },

  // ===== SQL操作 =====
  {
    id: "crud",
    title: "CRUD操作",
    category: "sql",
    description:
      "SELECT、INSERT、UPDATE、DELETE の基本操作、RETURNING句、UPSERT を学ぶ",
    sections: [
      {
        title: "INSERT とデータ挿入",
        content:
          "INSERT INTO でデータを挿入します。VALUES で複数行を一括挿入でき、RETURNING 句で挿入されたデータを返却できます。ON CONFLICT で重複時の動作（UPSERT）を指定でき、DO UPDATE で更新、DO NOTHING で無視ができます。INSERT INTO ... SELECT で他のテーブルからデータをコピーすることも可能です。",
        code: `-- 基本の INSERT
INSERT INTO employees (given_name, last_name, email, department, salary)
VALUES ('太郎', '田中', 'tanaka@example.com', '開発部', 450000);

-- 複数行の一括挿入
INSERT INTO employees (given_name, last_name, email, department, salary)
VALUES
  ('花子', '鈴木', 'suzuki@example.com', '営業部', 400000),
  ('次郎', '佐藤', 'sato@example.com', '開発部', 480000),
  ('美咲', '高橋', 'takahashi@example.com', '人事部', 420000);

-- RETURNING — 挿入されたデータを返す
INSERT INTO employees (given_name, last_name, email, department, salary)
VALUES ('健一', '伊藤', 'ito@example.com', '開発部', 500000)
RETURNING id, email, created_at;

-- UPSERT（ON CONFLICT）
INSERT INTO employees (email, given_name, last_name, department, salary)
VALUES ('tanaka@example.com', '太郎', '田中', '開発部', 470000)
ON CONFLICT (email)
DO UPDATE SET
  salary = EXCLUDED.salary,
  department = EXCLUDED.department;

-- 重複時は何もしない
INSERT INTO employees (email, given_name, last_name)
VALUES ('tanaka@example.com', '太郎', '田中')
ON CONFLICT (email) DO NOTHING;

-- 他テーブルからのコピー
INSERT INTO employees_archive
SELECT * FROM employees WHERE is_active = false;`,
      },
      {
        title: "SELECT とフィルタリング",
        content:
          "SELECT でデータを取得します。WHERE で条件指定、ORDER BY でソート、LIMIT / OFFSET でページネーションを行います。DISTINCT で重複排除、IN / BETWEEN / LIKE / ILIKE（大文字小文字無視）でフィルタリングします。NULLS FIRST / NULLS LAST でNULL値のソート位置を制御でき、FETCH FIRST は SQL 標準の LIMIT 代替です。",
        code: `-- 基本の SELECT
SELECT * FROM employees;
SELECT given_name, last_name, salary FROM employees;

-- エイリアス
SELECT given_name AS "名", last_name AS "姓",
       salary AS "給与" FROM employees;

-- WHERE 条件
SELECT * FROM employees WHERE department = '開発部';
SELECT * FROM employees WHERE salary >= 450000;
SELECT * FROM employees WHERE department IN ('開発部', '営業部');
SELECT * FROM employees WHERE salary BETWEEN 400000 AND 500000;
SELECT * FROM employees WHERE email LIKE '%@example.com';
SELECT * FROM employees WHERE given_name ILIKE '%taro%'; -- 大文字小文字無視

-- NULL の扱い
SELECT * FROM employees WHERE department IS NULL;
SELECT * FROM employees WHERE department IS NOT NULL;
SELECT COALESCE(department, '未配属') FROM employees;

-- ソート
SELECT * FROM employees ORDER BY salary DESC;
SELECT * FROM employees ORDER BY department ASC, salary DESC;
SELECT * FROM employees ORDER BY salary DESC NULLS LAST;

-- ページネーション
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 20;
-- SQL標準の構文
SELECT * FROM employees ORDER BY id
FETCH FIRST 10 ROWS ONLY;

-- DISTINCT
SELECT DISTINCT department FROM employees;
SELECT DISTINCT ON (department) * FROM employees
ORDER BY department, salary DESC; -- 部署ごとに最高給与の人`,
      },
      {
        title: "UPDATE と DELETE",
        content:
          "UPDATE でデータを更新し、DELETE でデータを削除します。どちらも WHERE 句で対象を絞り込み、RETURNING 句で影響を受けた行を返せます。UPDATE では SET 句で複数カラムを同時に更新でき、サブクエリや他テーブルとの結合（FROM 句）を使った更新も可能です。TRUNCATE はテーブル全体を高速に空にします。",
        code: `-- 基本の UPDATE
UPDATE employees SET salary = 500000 WHERE id = 1;

-- 複数カラムの更新
UPDATE employees
SET salary = salary * 1.1,
    department = '技術部'
WHERE department = '開発部';

-- RETURNING 付き UPDATE
UPDATE employees SET salary = salary + 50000
WHERE department = '営業部'
RETURNING id, given_name, salary;

-- サブクエリを使った更新
UPDATE employees SET salary = (
  SELECT AVG(salary) FROM employees WHERE department = '開発部'
) WHERE id = 5;

-- FROM 句を使った他テーブル参照の更新
UPDATE employees e
SET department = d.new_name
FROM department_changes d
WHERE e.department = d.old_name;

-- 基本の DELETE
DELETE FROM employees WHERE id = 10;
DELETE FROM employees WHERE is_active = false;

-- RETURNING 付き DELETE
DELETE FROM employees WHERE hire_date < '2020-01-01'
RETURNING id, email;

-- TRUNCATE — テーブルの全データを高速に削除
TRUNCATE TABLE employees;
TRUNCATE TABLE employees RESTART IDENTITY CASCADE;
-- RESTART IDENTITY: シーケンスもリセット
-- CASCADE: 外部キーで参照されるテーブルも空にする`,
      },
    ],
  },
  {
    id: "joins-subqueries",
    title: "結合とサブクエリ",
    category: "sql",
    description:
      "INNER/LEFT/RIGHT/FULL JOIN、CROSS JOIN、自己結合、サブクエリ、EXISTS を使いこなす",
    sections: [
      {
        title: "テーブル結合（JOIN）",
        content:
          "JOIN は複数のテーブルを関連付けてデータを取得する操作です。INNER JOIN は両方に存在する行のみ、LEFT JOIN は左テーブルの全行を保持、RIGHT JOIN は右テーブルの全行を保持、FULL OUTER JOIN は両方の全行を保持します。USING 句はカラム名が同じ場合の簡略記法です。",
        code: `-- サンプルテーブル
CREATE TABLE departments (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE staff (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  department_id INT REFERENCES departments(id),
  salary        NUMERIC(10, 2)
);

-- INNER JOIN — 両方に存在する行のみ
SELECT s.name, d.name AS department, s.salary
FROM staff s
INNER JOIN departments d ON s.department_id = d.id;

-- LEFT JOIN — 左テーブルの全行を保持
SELECT s.name, d.name AS department
FROM staff s
LEFT JOIN departments d ON s.department_id = d.id;
-- department_id が NULL のスタッフも表示される

-- RIGHT JOIN — 右テーブルの全行を保持
SELECT s.name, d.name AS department
FROM staff s
RIGHT JOIN departments d ON s.department_id = d.id;
-- スタッフがいない部署も表示される

-- FULL OUTER JOIN — 両方の全行
SELECT s.name, d.name AS department
FROM staff s
FULL OUTER JOIN departments d ON s.department_id = d.id;

-- USING — カラム名が同じ場合の簡略記法
SELECT * FROM orders JOIN customers USING (customer_id);

-- 複数テーブルの結合
SELECT s.name, d.name AS dept, p.name AS project
FROM staff s
JOIN departments d ON s.department_id = d.id
JOIN project_members pm ON s.id = pm.staff_id
JOIN projects p ON pm.project_id = p.id;`,
      },
      {
        title: "CROSS JOIN と自己結合",
        content:
          "CROSS JOIN は2つのテーブルの直積（すべての組み合わせ）を生成します。自己結合は同じテーブルをエイリアスで区別して結合し、階層データ（上司-部下など）の取得に使います。LATERAL JOIN は相関サブクエリのように、各行ごとにサブクエリを実行する強力な結合方法です。",
        code: `-- CROSS JOIN — 直積（すべての組み合わせ）
SELECT s.name AS size, c.name AS color
FROM sizes s CROSS JOIN colors c;

-- 自己結合 — 同じテーブル内の関係
CREATE TABLE employees_tree (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100),
  manager_id INT REFERENCES employees_tree(id)
);

-- 上司の名前を取得
SELECT e.name AS employee, m.name AS manager
FROM employees_tree e
LEFT JOIN employees_tree m ON e.manager_id = m.id;

-- 同じ部署の同僚を取得
SELECT a.name, b.name AS colleague
FROM staff a
JOIN staff b ON a.department_id = b.department_id AND a.id < b.id;

-- LATERAL JOIN — 各行に対してサブクエリを実行
SELECT d.name AS department, top.name, top.salary
FROM departments d
CROSS JOIN LATERAL (
  SELECT s.name, s.salary
  FROM staff s
  WHERE s.department_id = d.id
  ORDER BY s.salary DESC
  LIMIT 3
) top;
-- 各部署の給与トップ3を取得`,
      },
      {
        title: "サブクエリと EXISTS",
        content:
          "サブクエリは SELECT 文の中に別の SELECT を埋め込む構文です。WHERE 句、FROM 句、SELECT 句のどこでも使用できます。EXISTS は相関サブクエリで「存在するかどうか」を効率的にチェックし、IN よりもパフォーマンスが良い場合があります。ANY / ALL は集合との比較に使います。",
        code: `-- WHERE 句のサブクエリ
SELECT * FROM staff
WHERE salary > (SELECT AVG(salary) FROM staff);

-- IN サブクエリ
SELECT * FROM staff
WHERE department_id IN (
  SELECT id FROM departments WHERE name LIKE '%開発%'
);

-- EXISTS — 存在チェック（効率的）
SELECT d.name
FROM departments d
WHERE EXISTS (
  SELECT 1 FROM staff s WHERE s.department_id = d.id
);
-- スタッフが1人以上いる部署

-- NOT EXISTS
SELECT d.name
FROM departments d
WHERE NOT EXISTS (
  SELECT 1 FROM staff s WHERE s.department_id = d.id
);
-- スタッフがいない部署

-- ANY / ALL
SELECT * FROM staff
WHERE salary > ALL (
  SELECT salary FROM staff WHERE department_id = 1
);
-- 部署1の全員より高い給与

SELECT * FROM staff
WHERE salary > ANY (
  SELECT salary FROM staff WHERE department_id = 1
);
-- 部署1の誰かより高い給与

-- FROM 句のサブクエリ（導出テーブル）
SELECT department, avg_salary
FROM (
  SELECT department_id, AVG(salary) AS avg_salary
  FROM staff GROUP BY department_id
) sub
JOIN departments d ON sub.department_id = d.id;`,
      },
    ],
  },

  // ===== 高度なSQL =====
  {
    id: "aggregation",
    title: "集約とグループ化",
    category: "advanced-sql",
    description:
      "GROUP BY、HAVING、集約関数、GROUPING SETS、ROLLUP、CUBE を活用する",
    sections: [
      {
        title: "集約関数と GROUP BY",
        content:
          "集約関数は複数行をまとめて1つの値を返します。COUNT、SUM、AVG、MIN、MAX が基本です。GROUP BY でグループ化し、HAVING でグループに対する条件を指定します。FILTER 句で集約対象を絞り込むことができ、CASE 式と組み合わせた条件付き集約も強力です。",
        code: `-- 基本の集約関数
SELECT
  COUNT(*) AS total,
  COUNT(DISTINCT department_id) AS dept_count,
  SUM(salary) AS total_salary,
  AVG(salary) AS avg_salary,
  MIN(salary) AS min_salary,
  MAX(salary) AS max_salary
FROM staff;

-- GROUP BY
SELECT d.name AS department,
       COUNT(*) AS staff_count,
       AVG(s.salary)::NUMERIC(10,0) AS avg_salary
FROM staff s
JOIN departments d ON s.department_id = d.id
GROUP BY d.name
ORDER BY avg_salary DESC;

-- HAVING — グループに対する条件
SELECT department_id, COUNT(*) AS cnt
FROM staff
GROUP BY department_id
HAVING COUNT(*) >= 3;

-- FILTER — 条件付き集約（PostgreSQL固有）
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE salary >= 500000) AS high_salary,
  COUNT(*) FILTER (WHERE salary < 500000) AS low_salary,
  AVG(salary) FILTER (WHERE is_active) AS active_avg
FROM staff;

-- CASE式で条件付き集約
SELECT department_id,
  SUM(CASE WHEN salary >= 500000 THEN 1 ELSE 0 END) AS high,
  SUM(CASE WHEN salary < 500000 THEN 1 ELSE 0 END) AS low
FROM staff GROUP BY department_id;`,
      },
      {
        title: "GROUPING SETS・ROLLUP・CUBE",
        content:
          "GROUPING SETS は複数のグループ化を1つのクエリで実行します。ROLLUP は階層的な小計・合計を生成し、レポート作成に便利です。CUBE はすべての組み合わせの集計を生成します。GROUPING() 関数で小計行と通常行を区別できます。",
        code: `-- GROUPING SETS — 複数のグループ化を同時に
SELECT department_id, EXTRACT(YEAR FROM hire_date) AS year,
       COUNT(*), SUM(salary)
FROM staff
GROUP BY GROUPING SETS (
  (department_id),           -- 部署別
  (EXTRACT(YEAR FROM hire_date)),  -- 年別
  ()                          -- 全体合計
);

-- ROLLUP — 階層的な小計・合計
SELECT
  COALESCE(d.name, '== 合計 ==') AS department,
  COUNT(*) AS staff_count,
  SUM(s.salary) AS total_salary
FROM staff s
JOIN departments d ON s.department_id = d.id
GROUP BY ROLLUP (d.name)
ORDER BY d.name NULLS LAST;
-- 各部署の集計 + 全体合計

-- CUBE — すべての組み合わせ
SELECT department_id, is_active,
       COUNT(*), AVG(salary)::INT
FROM staff
GROUP BY CUBE (department_id, is_active);

-- GROUPING() — 小計行を識別
SELECT
  CASE WHEN GROUPING(d.name) = 1 THEN '合計'
       ELSE d.name END AS department,
  COUNT(*),
  SUM(s.salary)
FROM staff s
JOIN departments d ON s.department_id = d.id
GROUP BY ROLLUP (d.name);`,
      },
      {
        title: "文字列集約と配列集約",
        content:
          "string_agg はグループ内の文字列を区切り文字で連結します。array_agg は値を配列に集約し、json_agg / jsonb_agg は JSON 配列に変換します。json_object_agg でキーと値のペアから JSON オブジェクトを構築できます。これらは API レスポンスの構築やレポート生成に非常に便利です。",
        code: `-- string_agg — 文字列の連結
SELECT department_id,
       string_agg(name, ', ' ORDER BY name) AS members
FROM staff
GROUP BY department_id;
-- 開発部: 佐藤, 田中, 伊藤

-- array_agg — 配列に集約
SELECT department_id,
       array_agg(name ORDER BY salary DESC) AS members
FROM staff
GROUP BY department_id;
-- {伊藤, 佐藤, 田中}

-- json_agg / jsonb_agg — JSON配列に集約
SELECT d.name AS department,
       json_agg(json_build_object(
         'name', s.name,
         'salary', s.salary
       )) AS staff_list
FROM staff s
JOIN departments d ON s.department_id = d.id
GROUP BY d.name;
-- [{"name": "田中", "salary": 450000}, ...]

-- json_object_agg — JSONオブジェクト
SELECT json_object_agg(name, salary) FROM staff;
-- {"田中": 450000, "鈴木": 400000, ...}

-- DISTINCT 付き集約
SELECT department_id,
       array_agg(DISTINCT department_id) AS unique_ids
FROM staff GROUP BY department_id;

-- bool_and / bool_or — 論理集約
SELECT department_id,
       bool_and(is_active) AS all_active,
       bool_or(is_active) AS any_active
FROM staff GROUP BY department_id;`,
      },
    ],
  },
  {
    id: "window-functions",
    title: "ウィンドウ関数",
    category: "advanced-sql",
    description:
      "ROW_NUMBER、RANK、DENSE_RANK、LAG/LEAD、累積計算、フレーム指定を学ぶ",
    sections: [
      {
        title: "順位付け関数",
        content:
          "ウィンドウ関数は GROUP BY と異なり、元の行を保持しながら集約計算を行います。ROW_NUMBER() は連番、RANK() は同順位あり（飛び番あり）、DENSE_RANK() は同順位あり（飛び番なし）、NTILE(n) はn等分グループを割り当てます。PARTITION BY でグループごとに計算し、ORDER BY で順序を指定します。",
        code: `-- ROW_NUMBER — 連番（同値でも連番）
SELECT name, department_id, salary,
  ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM staff;

-- RANK — 同順位あり（飛び番あり: 1,2,2,4）
SELECT name, salary,
  RANK() OVER (ORDER BY salary DESC) AS rank
FROM staff;

-- DENSE_RANK — 同順位あり（飛び番なし: 1,2,2,3）
SELECT name, salary,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM staff;

-- PARTITION BY — グループごとに順位
SELECT name, department_id, salary,
  ROW_NUMBER() OVER (
    PARTITION BY department_id ORDER BY salary DESC
  ) AS dept_rank
FROM staff;

-- 部署ごとのトップ3
SELECT * FROM (
  SELECT name, department_id, salary,
    ROW_NUMBER() OVER (
      PARTITION BY department_id ORDER BY salary DESC
    ) AS rn
  FROM staff
) sub WHERE rn <= 3;

-- NTILE — n等分グループ
SELECT name, salary,
  NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM staff;
-- 給与の四分位`,
      },
      {
        title: "LAG・LEAD と前後行参照",
        content:
          "LAG() は前の行、LEAD() は次の行の値を参照します。時系列データの前月比較、差分計算、変化率の算出に非常に便利です。FIRST_VALUE() / LAST_VALUE() / NTH_VALUE() でウィンドウ内の特定位置の値を取得できます。",
        code: `-- 売上テーブル
CREATE TABLE monthly_sales (
  month DATE, amount NUMERIC(12, 2)
);

-- LAG — 前の行の値
SELECT month,
  amount,
  LAG(amount) OVER (ORDER BY month) AS prev_month,
  amount - LAG(amount) OVER (ORDER BY month) AS diff
FROM monthly_sales;

-- LEAD — 次の行の値
SELECT month, amount,
  LEAD(amount) OVER (ORDER BY month) AS next_month
FROM monthly_sales;

-- LAG の第2引数（n行前）と第3引数（デフォルト値）
SELECT month, amount,
  LAG(amount, 12, 0) OVER (ORDER BY month) AS same_month_last_year
FROM monthly_sales;

-- 前月比（%）
SELECT month, amount,
  ROUND(
    (amount - LAG(amount) OVER (ORDER BY month))
    / LAG(amount) OVER (ORDER BY month) * 100, 1
  ) AS growth_rate
FROM monthly_sales;

-- FIRST_VALUE / LAST_VALUE
SELECT name, department_id, salary,
  FIRST_VALUE(name) OVER (
    PARTITION BY department_id ORDER BY salary DESC
  ) AS highest_paid,
  LAST_VALUE(name) OVER (
    PARTITION BY department_id ORDER BY salary DESC
    RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) AS lowest_paid
FROM staff;`,
      },
      {
        title: "累積計算とフレーム指定",
        content:
          "ウィンドウ関数のフレーム指定で計算対象の範囲を制御できます。ROWS BETWEEN で物理的な行数、RANGE BETWEEN で論理的な値の範囲を指定します。累積合計（running total）、移動平均、累積最大値などの計算が可能です。WINDOW 句で名前付きウィンドウを定義すると、同じ定義を再利用できます。",
        code: `-- 累積合計（Running Total）
SELECT month, amount,
  SUM(amount) OVER (ORDER BY month) AS running_total
FROM monthly_sales;

-- 移動平均（3ヶ月移動平均）
SELECT month, amount,
  AVG(amount) OVER (
    ORDER BY month
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ) AS moving_avg_3
FROM monthly_sales;

-- 累積最大値
SELECT month, amount,
  MAX(amount) OVER (ORDER BY month) AS cumulative_max
FROM monthly_sales;

-- パーセント順位
SELECT name, salary,
  PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,
  CUME_DIST() OVER (ORDER BY salary) AS cume_dist
FROM staff;

-- フレーム指定の種類
-- ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW（デフォルト）
-- ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING（前後2行）
-- RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING（全体）

-- 名前付きウィンドウ（WINDOW句）
SELECT name, department_id, salary,
  ROW_NUMBER() OVER w AS row_num,
  RANK() OVER w AS rank,
  SUM(salary) OVER w AS running_total
FROM staff
WINDOW w AS (PARTITION BY department_id ORDER BY salary DESC);`,
      },
    ],
  },
  {
    id: "cte-recursive",
    title: "CTE と再帰クエリ",
    category: "advanced-sql",
    description:
      "WITH句（CTE）、再帰CTE、階層データの探索、グラフ探索を実装する",
    sections: [
      {
        title: "CTE（共通テーブル式）",
        content:
          "CTE（Common Table Expression）は WITH 句で定義する一時的な名前付き結果セットです。複雑なクエリを段階的に分解して可読性を高めます。複数の CTE を定義でき、後の CTE が前の CTE を参照できます。PostgreSQL 12 以降では CTE がデフォルトでインライン化され、パフォーマンスも優れています。",
        code: `-- 基本の CTE
WITH dept_stats AS (
  SELECT department_id,
         COUNT(*) AS staff_count,
         AVG(salary) AS avg_salary
  FROM staff
  GROUP BY department_id
)
SELECT d.name, ds.staff_count, ds.avg_salary::INT
FROM dept_stats ds
JOIN departments d ON ds.department_id = d.id
WHERE ds.staff_count >= 3;

-- 複数 CTE の連鎖
WITH
high_salary AS (
  SELECT * FROM staff WHERE salary >= 500000
),
dept_high AS (
  SELECT department_id, COUNT(*) AS high_count
  FROM high_salary
  GROUP BY department_id
)
SELECT d.name, dh.high_count
FROM dept_high dh
JOIN departments d ON dh.department_id = d.id;

-- CTE を使った INSERT / UPDATE / DELETE
WITH inactive AS (
  DELETE FROM staff WHERE is_active = false
  RETURNING *
)
INSERT INTO staff_archive SELECT * FROM inactive;

-- MATERIALIZED / NOT MATERIALIZED（最適化ヒント）
WITH active_staff AS MATERIALIZED (
  SELECT * FROM staff WHERE is_active = true
)
SELECT * FROM active_staff WHERE salary > 500000;`,
      },
      {
        title: "再帰CTE",
        content:
          "WITH RECURSIVE で再帰クエリを記述し、階層データ（組織図、カテゴリツリー、ファイルシステムなど）の探索ができます。再帰 CTE は非再帰項（初期行）と再帰項（繰り返し部分）を UNION ALL で結合して構成します。無限ループ防止のため、PostgreSQL 14 以降では CYCLE 句も使えます。",
        code: `-- 組織階層テーブル
CREATE TABLE org (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  manager_id INT REFERENCES org(id)
);

INSERT INTO org (id, name, manager_id) VALUES
(1, '社長', NULL),
(2, '開発部長', 1),
(3, '営業部長', 1),
(4, 'チームリーダーA', 2),
(5, 'チームリーダーB', 2),
(6, '開発者1', 4),
(7, '開発者2', 4),
(8, '営業1', 3);

-- 再帰CTE — 階層を展開
WITH RECURSIVE org_tree AS (
  -- 非再帰項（ルート: 社長）
  SELECT id, name, manager_id, 1 AS depth,
         name::TEXT AS path
  FROM org WHERE manager_id IS NULL

  UNION ALL

  -- 再帰項（子ノードを辿る）
  SELECT o.id, o.name, o.manager_id, t.depth + 1,
         t.path || ' > ' || o.name
  FROM org o
  JOIN org_tree t ON o.manager_id = t.id
)
SELECT depth, REPEAT('  ', depth - 1) || name AS org_chart, path
FROM org_tree
ORDER BY path;

-- 結果:
-- 1 社長                    社長
-- 2   開発部長              社長 > 開発部長
-- 3     チームリーダーA     社長 > 開発部長 > チームリーダーA
-- 4       開発者1           社長 > 開発部長 > チームリーダーA > 開発者1`,
      },
      {
        title: "再帰CTEの応用",
        content:
          "再帰CTE は連番生成、日付系列の作成、グラフ探索、経路探索など多様な用途に使えます。generate_series() 関数で連番や日付系列を簡潔に生成することもできますが、再帰CTE はより複雑なパターンに対応できます。CYCLE 句（PostgreSQL 14+）で循環参照を安全に検出できます。",
        code: `-- 連番生成（再帰CTE）
WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 100
)
SELECT n FROM nums;

-- generate_series の方が簡潔
SELECT generate_series(1, 100) AS n;

-- 日付系列の生成
SELECT d::DATE
FROM generate_series('2025-01-01', '2025-12-31', '1 day'::INTERVAL) d;

-- 欠損日の補完
WITH dates AS (
  SELECT d::DATE AS date
  FROM generate_series('2025-01-01', '2025-01-31', '1 day') d
)
SELECT dates.date, COALESCE(s.amount, 0) AS amount
FROM dates
LEFT JOIN daily_sales s ON dates.date = s.sale_date;

-- フィボナッチ数列
WITH RECURSIVE fib AS (
  SELECT 1 AS n, 1::BIGINT AS val, 0::BIGINT AS prev
  UNION ALL
  SELECT n + 1, val + prev, val FROM fib WHERE n < 20
)
SELECT n, val FROM fib;

-- CYCLE 句（PostgreSQL 14+）— 循環検出
WITH RECURSIVE tree AS (
  SELECT id, name, manager_id FROM org WHERE id = 1
  UNION ALL
  SELECT o.id, o.name, o.manager_id
  FROM org o JOIN tree t ON o.manager_id = t.id
) CYCLE id SET is_cycle USING path
SELECT * FROM tree WHERE NOT is_cycle;`,
      },
    ],
  },

  // ===== 関数・手続き =====
  {
    id: "built-in-functions",
    title: "組み込み関数",
    category: "functions",
    description:
      "文字列関数、日付関数、数学関数、条件式、型変換など頻出の組み込み関数を学ぶ",
    sections: [
      {
        title: "文字列関数",
        content:
          "PostgreSQL は豊富な文字列関数を提供します。concat / || で連結、length で長さ、upper / lower で大文字小文字変換、trim / ltrim / rtrim で空白除去、substring / left / right で部分文字列を取得します。regexp_replace で正規表現置換、split_part で文字列分割、format でフォーマット出力ができます。",
        code: `-- 文字列連結
SELECT 'Hello' || ' ' || 'World';    -- Hello World
SELECT concat('Hello', ' ', 'World'); -- Hello World
SELECT concat_ws(', ', '田中', '太郎'); -- 田中, 太郎

-- 長さ・大文字小文字
SELECT length('PostgreSQL');  -- 10
SELECT upper('hello');        -- HELLO
SELECT lower('HELLO');        -- hello
SELECT initcap('hello world'); -- Hello World

-- トリム
SELECT trim('  hello  ');      -- 'hello'
SELECT ltrim('  hello');       -- 'hello'
SELECT btrim('xxhelloxx', 'x'); -- 'hello'

-- 部分文字列
SELECT substring('PostgreSQL' FROM 1 FOR 4);  -- Post
SELECT left('PostgreSQL', 4);                  -- Post
SELECT right('PostgreSQL', 3);                 -- SQL

-- 検索・置換
SELECT position('SQL' IN 'PostgreSQL');  -- 8
SELECT replace('Hello World', 'World', 'PostgreSQL');
SELECT regexp_replace('abc123', '[0-9]+', 'NUM'); -- abcNUM

-- 分割
SELECT split_part('2025-04-01', '-', 2); -- 04

-- フォーマット
SELECT format('Hello %s, you are %s years old', '太郎', 25);

-- リピート・パディング
SELECT repeat('ab', 3);            -- ababab
SELECT lpad('42', 5, '0');         -- 00042
SELECT rpad('hello', 10, '.');     -- hello.....`,
      },
      {
        title: "日付・時刻関数",
        content:
          "NOW() で現在日時、CURRENT_DATE で今日の日付を取得します。EXTRACT で年月日などの要素を取り出し、date_trunc で指定単位に切り捨てます。INTERVAL で日付の加減算、AGE で日付差の計算ができます。to_char でフォーマット変換、make_date / make_timestamp で日付を構築します。",
        code: `-- 現在日時
SELECT NOW();                    -- 2025-04-01 10:30:00+09
SELECT CURRENT_TIMESTAMP;       -- タイムゾーン付き
SELECT CURRENT_DATE;             -- 2025-04-01
SELECT CURRENT_TIME;             -- 10:30:00+09

-- EXTRACT — 要素の取り出し
SELECT EXTRACT(YEAR FROM NOW());    -- 2025
SELECT EXTRACT(MONTH FROM NOW());   -- 4
SELECT EXTRACT(DOW FROM NOW());     -- 曜日（0=日, 6=土）
SELECT EXTRACT(EPOCH FROM NOW());   -- Unix timestamp

-- date_trunc — 切り捨て
SELECT date_trunc('month', NOW());  -- 2025-04-01 00:00:00
SELECT date_trunc('week', NOW());   -- 週の開始日
SELECT date_trunc('hour', NOW());   -- 時の開始

-- INTERVAL — 日付の加減算
SELECT NOW() + INTERVAL '7 days';
SELECT NOW() - INTERVAL '3 months';
SELECT NOW() + INTERVAL '1 year 6 months';

-- AGE — 日付差
SELECT AGE(NOW(), '1990-05-15'); -- 34 years 10 mons 17 days

-- to_char — フォーマット
SELECT to_char(NOW(), 'YYYY年MM月DD日 HH24:MI:SS');
SELECT to_char(NOW(), 'YYYY/MM/DD (Day)');

-- 日付の生成
SELECT make_date(2025, 4, 1);  -- 2025-04-01
SELECT generate_series(
  '2025-01-01'::DATE,
  '2025-12-31'::DATE,
  '1 month'::INTERVAL
);`,
      },
      {
        title: "条件式と型変換",
        content:
          "CASE 式は条件分岐に使い、単純 CASE と検索 CASE の2形式があります。COALESCE は NULL でない最初の値を返し、NULLIF は2つの値が等しい場合に NULL を返します。GREATEST / LEAST で最大/最小値を選択し、CAST または :: で型変換を行います。",
        code: `-- CASE 式（検索 CASE）
SELECT name, salary,
  CASE
    WHEN salary >= 600000 THEN 'S'
    WHEN salary >= 500000 THEN 'A'
    WHEN salary >= 400000 THEN 'B'
    ELSE 'C'
  END AS grade
FROM staff;

-- CASE 式（単純 CASE）
SELECT name,
  CASE department_id
    WHEN 1 THEN '開発部'
    WHEN 2 THEN '営業部'
    WHEN 3 THEN '人事部'
    ELSE 'その他'
  END AS department
FROM staff;

-- COALESCE — NULL でない最初の値
SELECT COALESCE(phone, email, '連絡先なし') AS contact
FROM users;

-- NULLIF — 等しければ NULL
SELECT NULLIF(department, '未配属') FROM staff;
-- 0除算回避: salary / NULLIF(hours, 0)

-- GREATEST / LEAST
SELECT GREATEST(10, 20, 30);  -- 30
SELECT LEAST(10, 20, 30);     -- 10

-- 型変換
SELECT '42'::INTEGER;
SELECT 42::TEXT;
SELECT '2025-04-01'::DATE;
SELECT CAST('3.14' AS NUMERIC);
SELECT to_number('1,234,567', '9,999,999');
SELECT to_date('2025/04/01', 'YYYY/MM/DD');`,
      },
    ],
  },
  {
    id: "plpgsql",
    title: "PL/pgSQL",
    category: "functions",
    description:
      "ユーザー定義関数、ストアドプロシージャ、変数、制御構文、例外処理を実装する",
    sections: [
      {
        title: "ユーザー定義関数",
        content:
          "CREATE FUNCTION でユーザー定義関数を作成します。PL/pgSQL は PostgreSQL の手続き型言語で、変数宣言、制御構文、例外処理を使ったロジックを記述できます。RETURNS で戻り値の型を指定し、LANGUAGE plpgsql で言語を指定します。IMMUTABLE / STABLE / VOLATILE で関数の特性を示し、オプティマイザのヒントになります。",
        code: `-- 基本的な関数
CREATE OR REPLACE FUNCTION calc_tax(price NUMERIC, rate NUMERIC DEFAULT 0.10)
RETURNS NUMERIC AS $$
BEGIN
  RETURN ROUND(price * rate, 0);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

SELECT calc_tax(1000);       -- 100
SELECT calc_tax(1000, 0.08); -- 80

-- 変数を使った関数
CREATE OR REPLACE FUNCTION get_employee_info(emp_id INT)
RETURNS TABLE(name TEXT, dept TEXT, salary NUMERIC) AS $$
DECLARE
  v_name TEXT;
  v_dept TEXT;
  v_salary NUMERIC;
BEGIN
  SELECT s.name, d.name, s.salary
  INTO v_name, v_dept, v_salary
  FROM staff s
  JOIN departments d ON s.department_id = d.id
  WHERE s.id = emp_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION '従業員ID % が見つかりません', emp_id;
  END IF;

  RETURN QUERY SELECT v_name, v_dept, v_salary;
END;
$$ LANGUAGE plpgsql STABLE;

SELECT * FROM get_employee_info(1);

-- SQL関数（シンプルな場合はこちらが高速）
CREATE OR REPLACE FUNCTION active_count()
RETURNS BIGINT AS $$
  SELECT COUNT(*) FROM staff WHERE is_active = true;
$$ LANGUAGE sql STABLE;`,
      },
      {
        title: "制御構文とループ",
        content:
          "PL/pgSQL では IF/ELSIF/ELSE で条件分岐、FOR / WHILE / LOOP でループ、RETURN NEXT / RETURN QUERY で複数行を返す関数を作成できます。FOR IN SELECT でクエリ結果のループ、FOREACH でBUILT-IN配列のループが可能です。EXIT / CONTINUE でループを制御します。",
        code: `-- IF/ELSIF/ELSE
CREATE OR REPLACE FUNCTION salary_grade(s NUMERIC)
RETURNS TEXT AS $$
BEGIN
  IF s >= 600000 THEN RETURN 'S';
  ELSIF s >= 500000 THEN RETURN 'A';
  ELSIF s >= 400000 THEN RETURN 'B';
  ELSE RETURN 'C';
  END IF;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- FOR ループ（連番）
CREATE OR REPLACE FUNCTION sum_to(n INT)
RETURNS BIGINT AS $$
DECLARE
  total BIGINT := 0;
BEGIN
  FOR i IN 1..n LOOP
    total := total + i;
  END LOOP;
  RETURN total;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- FOR IN SELECT（クエリ結果のループ）
CREATE OR REPLACE FUNCTION dept_report()
RETURNS TABLE(dept TEXT, cnt BIGINT) AS $$
DECLARE
  rec RECORD;
BEGIN
  FOR rec IN
    SELECT d.name, COUNT(*) AS staff_count
    FROM staff s JOIN departments d ON s.department_id = d.id
    GROUP BY d.name
  LOOP
    dept := rec.name;
    cnt := rec.staff_count;
    RETURN NEXT;
  END LOOP;
END;
$$ LANGUAGE plpgsql STABLE;

SELECT * FROM dept_report();

-- WHILE ループ
-- LOOP + EXIT WHEN（do-while相当）
-- CONTINUE WHEN（スキップ）`,
      },
      {
        title: "例外処理とトリガー",
        content:
          "EXCEPTION ブロックで実行時エラーをキャッチし、エラーに応じた処理を記述できます。RAISE で任意のメッセージやエラーを発生させます。トリガーは INSERT / UPDATE / DELETE の前後に自動的に関数を実行する仕組みで、監査ログ、自動更新、データ検証などに活用されます。",
        code: `-- 例外処理
CREATE OR REPLACE FUNCTION safe_divide(a NUMERIC, b NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  RETURN a / b;
EXCEPTION
  WHEN division_by_zero THEN
    RAISE NOTICE '0で割ることはできません';
    RETURN NULL;
  WHEN OTHERS THEN
    RAISE NOTICE 'エラー: %', SQLERRM;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- RAISE のレベル
-- RAISE DEBUG   'メッセージ';
-- RAISE NOTICE  'メッセージ';   -- 情報通知
-- RAISE WARNING 'メッセージ';   -- 警告
-- RAISE EXCEPTION 'メッセージ'; -- エラー（ロールバック）

-- トリガー関数
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- トリガーの作成
CREATE TRIGGER trg_update_timestamp
BEFORE UPDATE ON staff
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- 監査ログトリガー
CREATE OR REPLACE FUNCTION audit_log()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_logs (table_name, action, old_data, new_data, changed_at)
  VALUES (TG_TABLE_NAME, TG_OP, row_to_json(OLD), row_to_json(NEW), NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit
AFTER UPDATE OR DELETE ON staff
FOR EACH ROW EXECUTE FUNCTION audit_log();`,
      },
    ],
  },

  // ===== 設計・制約 =====
  {
    id: "constraints",
    title: "制約と正規化",
    category: "design",
    description:
      "PRIMARY KEY、FOREIGN KEY、UNIQUE、CHECK、NOT NULL制約と正規化の基本を学ぶ",
    sections: [
      {
        title: "制約の種類",
        content:
          "制約はデータの整合性を保証する仕組みです。PRIMARY KEY（主キー）は一意かつNOT NULL、UNIQUE は一意（NULLは複数可）、NOT NULL は NULL 禁止、CHECK は条件チェック、FOREIGN KEY は外部キー参照です。制約はテーブル作成時またはALTER TABLEで追加でき、名前を付けるとエラーメッセージの理解やメンテナンスに便利です。",
        code: `-- 制約の定義
CREATE TABLE products (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(200) NOT NULL,
  sku         VARCHAR(50) UNIQUE,
  price       NUMERIC(10, 2) NOT NULL
              CONSTRAINT positive_price CHECK (price > 0),
  stock       INT DEFAULT 0
              CONSTRAINT non_negative_stock CHECK (stock >= 0),
  category_id INT REFERENCES categories(id)
              ON DELETE SET NULL
              ON UPDATE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 複合主キー
CREATE TABLE order_items (
  order_id   INT REFERENCES orders(id),
  product_id INT REFERENCES products(id),
  quantity   INT NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (order_id, product_id)
);

-- 複合ユニーク
ALTER TABLE staff
ADD CONSTRAINT uq_staff_email_dept
UNIQUE (email, department_id);

-- CHECK 制約の追加
ALTER TABLE products
ADD CONSTRAINT chk_price_range
CHECK (price BETWEEN 0 AND 10000000);

-- FOREIGN KEY の動作オプション
-- ON DELETE CASCADE    — 親削除時に子も削除
-- ON DELETE SET NULL   — 親削除時にNULLに設定
-- ON DELETE RESTRICT   — 子がある場合は削除拒否
-- ON UPDATE CASCADE    — 親更新時に子も更新

-- 制約の削除
ALTER TABLE products DROP CONSTRAINT positive_price;`,
      },
      {
        title: "EXCLUDE制約とドメイン",
        content:
          "EXCLUDE 制約は PostgreSQL 固有の制約で、指定した条件で行の重複を排除します。予約の時間帯重複防止などに最適です。ドメインはカスタムデータ型を定義し、制約を再利用可能にします。CHECK 制約の共通化やカラム定義の標準化に活用できます。",
        code: `-- EXCLUDE 制約 — 時間帯の重複防止
CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE TABLE meeting_rooms (
  id     SERIAL PRIMARY KEY,
  room   TEXT NOT NULL,
  period TSRANGE NOT NULL,
  EXCLUDE USING GIST (
    room WITH =,     -- 同じ部屋で
    period WITH &&    -- 期間が重複する場合を排除
  )
);

INSERT INTO meeting_rooms (room, period) VALUES
('A101', '[2025-04-01 09:00, 2025-04-01 12:00)');

-- 重複する予約はエラーになる
-- INSERT INTO meeting_rooms (room, period) VALUES
-- ('A101', '[2025-04-01 11:00, 2025-04-01 14:00)'); -- ERROR!

-- ドメイン — 再利用可能なカスタム型
CREATE DOMAIN email_address AS TEXT
CHECK (VALUE ~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');

CREATE DOMAIN positive_int AS INT
CHECK (VALUE > 0);

CREATE DOMAIN japanese_phone AS VARCHAR(13)
CHECK (VALUE ~ '^0[0-9]{1,4}-[0-9]{1,4}-[0-9]{4}$');

-- ドメインの使用
CREATE TABLE contacts (
  id    SERIAL PRIMARY KEY,
  email email_address NOT NULL,
  phone japanese_phone,
  age   positive_int
);`,
      },
      {
        title: "正規化の基本",
        content:
          "正規化はデータの冗長性を排除し、整合性を保つためのデータベース設計手法です。第1正規形（繰り返し項目の排除）、第2正規形（部分関数従属の排除）、第3正規形（推移的関数従属の排除）が基本です。実務では第3正規形を目指しつつ、パフォーマンスのために意図的に非正規化することもあります。",
        code: `-- ❌ 非正規形（繰り返し項目）
CREATE TABLE orders_bad (
  id        INT,
  customer  TEXT,
  product1  TEXT, price1 NUMERIC,
  product2  TEXT, price2 NUMERIC
);

-- ✅ 第1正規形（繰り返し項目の排除）
CREATE TABLE customers (
  id   SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);

CREATE TABLE orders_1nf (
  id          SERIAL PRIMARY KEY,
  customer_id INT REFERENCES customers(id),
  order_date  DATE DEFAULT CURRENT_DATE
);

CREATE TABLE order_items_1nf (
  id         SERIAL PRIMARY KEY,
  order_id   INT REFERENCES orders_1nf(id),
  product_id INT REFERENCES products(id),
  quantity   INT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL
);

-- ✅ 第3正規形（推移的関数従属の排除）
-- staff.department_name → departments テーブルに分離

-- 意図的な非正規化の例（パフォーマンス最適化）
-- orders テーブルに total_amount を持たせる
-- （本来は order_items から計算可能だが、集計クエリ高速化のため）
ALTER TABLE orders_1nf ADD COLUMN total_amount NUMERIC(12, 2);

-- マテリアライズドビューで非正規化データを管理
CREATE MATERIALIZED VIEW order_summary AS
SELECT o.id, c.name AS customer, SUM(oi.quantity * oi.unit_price) AS total
FROM orders_1nf o
JOIN customers c ON o.customer_id = c.id
JOIN order_items_1nf oi ON o.id = oi.order_id
GROUP BY o.id, c.name;

REFRESH MATERIALIZED VIEW order_summary;`,
      },
    ],
  },
  {
    id: "views-materialized",
    title: "ビューとマテリアライズドビュー",
    category: "design",
    description:
      "通常ビュー、マテリアライズドビュー、更新可能ビュー、セキュリティ活用を学ぶ",
    sections: [
      {
        title: "ビューの基本",
        content:
          "ビューは保存されたクエリで、テーブルのように参照できます。複雑なクエリをカプセル化し、アクセス制御やデータ抽象化に活用します。ビューはデータを持たず、参照時に毎回クエリが実行されます。単純なビューは自動的に更新可能で、WITH CHECK OPTION で挿入/更新時の条件チェックも可能です。",
        code: `-- ビューの作成
CREATE OR REPLACE VIEW active_staff AS
SELECT s.id, s.name, d.name AS department, s.salary
FROM staff s
JOIN departments d ON s.department_id = d.id
WHERE s.is_active = true;

-- ビューの使用（テーブルと同じように）
SELECT * FROM active_staff;
SELECT * FROM active_staff WHERE department = '開発部';

-- 更新可能ビュー
CREATE VIEW dev_staff AS
SELECT * FROM staff WHERE department_id = 1
WITH CHECK OPTION;
-- WITH CHECK OPTION: このビューを通じた INSERT/UPDATE が
-- WHERE条件を満たすことを保証

-- ビューへの INSERT（更新可能な場合）
INSERT INTO dev_staff (name, department_id, salary, is_active)
VALUES ('新人', 1, 350000, true);
-- department_id != 1 の場合はエラー

-- ビューの確認
SELECT * FROM information_schema.views
WHERE table_schema = 'public';

-- ビューの削除
DROP VIEW IF EXISTS active_staff CASCADE;`,
      },
      {
        title: "マテリアライズドビュー",
        content:
          "マテリアライズドビューはクエリ結果を物理的に保存し、高速な読み取りを実現します。集計や結合が重いクエリの結果をキャッシュするのに最適です。REFRESH MATERIALIZED VIEW で最新データに更新し、CONCURRENTLY オプションで更新中も読み取りを許可できます。インデックスも作成可能です。",
        code: `-- マテリアライズドビューの作成
CREATE MATERIALIZED VIEW monthly_report AS
SELECT
  date_trunc('month', o.order_date) AS month,
  d.name AS department,
  COUNT(DISTINCT o.id) AS order_count,
  SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM orders_1nf o
JOIN customers c ON o.customer_id = c.id
JOIN order_items_1nf oi ON o.id = oi.order_id
JOIN staff s ON o.staff_id = s.id
JOIN departments d ON s.department_id = d.id
GROUP BY date_trunc('month', o.order_date), d.name
WITH DATA;  -- 作成時にデータを投入（WITH NO DATA で空作成）

-- インデックスの作成（高速検索用）
CREATE UNIQUE INDEX idx_monthly_report
ON monthly_report (month, department);

-- 参照（通常テーブルと同じ速度）
SELECT * FROM monthly_report
WHERE month >= '2025-01-01'
ORDER BY month, total_revenue DESC;

-- データの更新
REFRESH MATERIALIZED VIEW monthly_report;

-- CONCURRENTLY — 更新中も読み取り可能（UNIQUE INDEX必須）
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_report;

-- 定期更新（pg_cron 拡張など）
-- SELECT cron.schedule('refresh_report',
--   '0 * * * *',  -- 毎時
--   'REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_report'
-- );`,
      },
      {
        title: "ビューのセキュリティ活用",
        content:
          "ビューはセキュリティの観点で重要です。機密カラムを除外したビューを提供し、ユーザーにはビューのみアクセスを許可することで、データの制限付き公開が実現できます。security_barrier オプションで行レベルのセキュリティリークを防止し、Row Level Security（RLS）と組み合わせた多層防御も可能です。",
        code: `-- 機密情報を除外したビュー
CREATE VIEW public_staff AS
SELECT id, name, department_id
FROM staff;
-- salary, email は除外

-- ビューに対するアクセス権限
GRANT SELECT ON public_staff TO readonly_user;
REVOKE ALL ON staff FROM readonly_user;

-- security_barrier — セキュリティリーク防止
CREATE VIEW secure_staff WITH (security_barrier = true) AS
SELECT id, name, department_id FROM staff
WHERE is_active = true;

-- Row Level Security（RLS）
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY staff_dept_policy ON staff
FOR SELECT
USING (department_id = current_setting('app.department_id')::INT);

-- 使用例:
-- SET app.department_id = '1';
-- SELECT * FROM staff;  -- 部署1のデータのみ表示

-- 管理者はすべてのデータを見れる
CREATE POLICY staff_admin_policy ON staff
FOR ALL
TO admin_role
USING (true);`,
      },
    ],
  },

  // ===== パフォーマンス =====
  {
    id: "indexes",
    title: "インデックス",
    category: "performance",
    description:
      "B-tree、GIN、GiST、BRIN インデックスの種類と使い分け、複合インデックス、部分インデックスを学ぶ",
    sections: [
      {
        title: "インデックスの基本",
        content:
          "インデックスはデータの検索を高速化するデータ構造です。B-tree がデフォルトで、等価・範囲検索に最適です。CREATE INDEX で作成し、CONCURRENTLY オプションでテーブルロックなしに構築できます。ただしインデックスは INSERT / UPDATE / DELETE のコストを増加させるため、必要な箇所にのみ作成します。",
        code: `-- 基本のインデックス（B-tree）
CREATE INDEX idx_staff_department ON staff (department_id);
CREATE INDEX idx_staff_email ON staff (email);

-- ユニークインデックス
CREATE UNIQUE INDEX idx_staff_email_unique ON staff (email);

-- 複合インデックス（カラム順が重要）
CREATE INDEX idx_staff_dept_salary
ON staff (department_id, salary DESC);
-- department_id の検索 → ✅ 使われる
-- salary のみの検索 → ❌ 使われない（先頭カラムが必要）

-- CONCURRENTLY — ロックなしで作成（本番推奨）
CREATE INDEX CONCURRENTLY idx_staff_name ON staff (name);

-- 部分インデックス — 条件付き
CREATE INDEX idx_active_staff ON staff (name)
WHERE is_active = true;
-- is_active = true の検索のみ高速化、サイズも小さい

-- 式インデックス
CREATE INDEX idx_staff_lower_email ON staff (lower(email));
-- WHERE lower(email) = 'tanaka@example.com' が高速に

-- インデックスの確認
SELECT indexname, indexdef FROM pg_indexes
WHERE tablename = 'staff';

-- インデックスの削除
DROP INDEX IF EXISTS idx_staff_name;`,
      },
      {
        title: "インデックスの種類と使い分け",
        content:
          "PostgreSQL は B-tree 以外にも用途に応じた複数のインデックス型をサポートします。GIN（Generalized Inverted Index）は配列・JSONB・全文検索に、GiST（Generalized Search Tree）は幾何学・範囲型に、BRIN（Block Range Index）は時系列データなど物理的にソートされた大規模テーブルに最適です。Hash インデックスは等価検索専用です。",
        code: `-- GIN — JSONB、配列、全文検索向け
CREATE INDEX idx_orders_details ON orders USING GIN (details);
CREATE INDEX idx_articles_tags ON articles USING GIN (tags);

-- 全文検索用 GIN
CREATE INDEX idx_fts ON articles
USING GIN (to_tsvector('japanese', title || ' ' || body));

-- GiST — 範囲型、幾何学型向け
CREATE INDEX idx_reservations_period
ON reservations USING GIST (period);

-- 空間データ（PostGIS）
-- CREATE INDEX idx_locations_geom
-- ON locations USING GIST (geom);

-- BRIN — 大規模テーブルの物理的順序に基づくインデックス
CREATE INDEX idx_logs_created ON access_logs USING BRIN (created_at);
-- 時系列データに最適。B-tree より遥かに小さいサイズ

-- Hash — 等価検索のみ（使用頻度は低い）
CREATE INDEX idx_sessions_token ON sessions USING HASH (token);

-- カバリングインデックス（INCLUDE）
CREATE INDEX idx_staff_dept_covering
ON staff (department_id) INCLUDE (name, salary);
-- department_id で検索し name, salary も返す場合
-- テーブル本体へのアクセスが不要に（Index Only Scan）

-- インデックスの使用状況確認
SELECT indexrelname, idx_scan, idx_tup_read
FROM pg_stat_user_indexes
WHERE schemaname = 'public';`,
      },
      {
        title: "インデックス設計のベストプラクティス",
        content:
          "効果的なインデックス設計にはクエリパターンの分析が重要です。WHERE 句、JOIN 条件、ORDER BY で頻繁に使われるカラムにインデックスを作成します。選択性の高い（重複が少ない）カラムほどインデックスの効果が大きいです。pg_stat_user_tables で使用状況を監視し、未使用インデックスは削除してメンテナンスコストを削減します。",
        code: `-- EXPLAIN ANALYZE でインデックスの効果を確認
EXPLAIN ANALYZE
SELECT * FROM staff WHERE department_id = 1;
-- Seq Scan: 全件スキャン（インデックスなし）
-- Index Scan: インデックス使用 ✅
-- Index Only Scan: インデックスのみで完結 ✅✅

-- インデックスが使われない場合
-- 1. テーブルが小さい（Seq Scan の方が速い）
-- 2. 選択性が低い（大部分の行がヒット）
-- 3. 関数でラップされている → 式インデックスが必要
-- 4. 型が一致しない（暗黙の型変換）

-- 未使用インデックスの検出
SELECT indexrelname, idx_scan
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND indexrelname NOT LIKE '%pkey%'
  AND indexrelname NOT LIKE '%unique%';

-- テーブルの統計情報
SELECT relname, seq_scan, idx_scan,
       n_tup_ins, n_tup_upd, n_tup_del
FROM pg_stat_user_tables
WHERE schemaname = 'public';

-- インデックスのサイズ
SELECT indexrelname,
  pg_size_pretty(pg_relation_size(indexrelid)) AS size
FROM pg_stat_user_indexes
ORDER BY pg_relation_size(indexrelid) DESC;

-- 統計情報の更新
ANALYZE staff;`,
      },
    ],
  },
  {
    id: "query-optimization",
    title: "クエリ最適化",
    category: "performance",
    description:
      "EXPLAIN ANALYZE、実行計画の読み方、クエリチューニング、VACUUM/ANALYZE を学ぶ",
    sections: [
      {
        title: "EXPLAIN ANALYZE",
        content:
          "EXPLAIN はクエリの実行計画を表示し、ANALYZE を付けると実際に実行して実測値も表示します。Seq Scan（全件スキャン）、Index Scan（インデックス使用）、Nested Loop / Hash Join / Merge Join（結合方法）などのノードを読み取り、ボトルネックを特定します。cost は推定コスト、actual time は実測時間、rows は行数です。",
        code: `-- 実行計画の表示
EXPLAIN SELECT * FROM staff WHERE department_id = 1;

-- 実測値付き（実際に実行される）
EXPLAIN ANALYZE SELECT * FROM staff WHERE department_id = 1;

-- より詳細な情報
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM staff WHERE department_id = 1;

-- 実行計画の読み方:
-- Seq Scan on staff  (cost=0.00..1.50 rows=5 width=100)
--                          ↑起動cost ↑総cost ↑推定行数 ↑行幅
--   (actual time=0.01..0.03 rows=5 loops=1)
--                    ↑実測時間(ms)   ↑実際行数 ↑繰り返し数

-- JOIN の実行計画
EXPLAIN ANALYZE
SELECT s.name, d.name
FROM staff s
JOIN departments d ON s.department_id = d.id
WHERE s.salary > 500000;

-- 結合アルゴリズム:
-- Nested Loop  — 小さいテーブル同士（インデックスあり）
-- Hash Join    — 中〜大テーブル（メモリに載る場合）
-- Merge Join   — 大テーブル同士（ソート済み）

-- JSON形式で見やすく
EXPLAIN (ANALYZE, FORMAT JSON)
SELECT * FROM staff ORDER BY salary DESC LIMIT 10;`,
      },
      {
        title: "クエリチューニング",
        content:
          "クエリの最適化は適切なインデックスの作成、クエリの書き換え、テーブル設計の見直しで行います。N+1 問題の回避、不要なカラムの SELECT 除外、サブクエリの CTE/JOIN への置換、LIMIT の活用などが基本テクニックです。pg_stat_statements で遅いクエリを特定し、優先的に改善します。",
        code: `-- ❌ 遅いクエリの例
-- SELECT * は不要なカラムも読み込む
SELECT * FROM staff WHERE department_id = 1;

-- ✅ 必要なカラムのみ
SELECT name, salary FROM staff WHERE department_id = 1;

-- ❌ 相関サブクエリ（行ごとに実行）
SELECT name, (
  SELECT COUNT(*) FROM orders o WHERE o.staff_id = s.id
) AS order_count
FROM staff s;

-- ✅ JOIN に書き換え
SELECT s.name, COUNT(o.id) AS order_count
FROM staff s
LEFT JOIN orders o ON o.staff_id = s.id
GROUP BY s.id, s.name;

-- ❌ OR は Index Scan が効きにくい
SELECT * FROM staff WHERE name = '田中' OR email = 'tanaka@ex.com';

-- ✅ UNION に書き換え
SELECT * FROM staff WHERE name = '田中'
UNION
SELECT * FROM staff WHERE email = 'tanaka@ex.com';

-- ページネーション最適化
-- ❌ OFFSET が大きいと遅い
SELECT * FROM staff ORDER BY id LIMIT 20 OFFSET 10000;

-- ✅ キーセットページネーション
SELECT * FROM staff WHERE id > 10000 ORDER BY id LIMIT 20;

-- 遅いクエリの検出（pg_stat_statements）
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC LIMIT 10;`,
      },
      {
        title: "VACUUMとメンテナンス",
        content:
          "PostgreSQL は MVCC により更新・削除された行が即座には物理的に消えず「デッドタプル」として残ります。VACUUM はこのデッドタプルを回収し、ディスク空間を再利用可能にします。VACUUM FULL はテーブルを完全に再構築しますが、排他ロックがかかるため通常は VACUUM（通常版）を使います。autovacuum が自動的にメンテナンスを行いますが、設定の調整が必要な場合もあります。",
        code: `-- VACUUM — デッドタプルの回収
VACUUM staff;

-- VACUUM VERBOSE — 詳細表示
VACUUM VERBOSE staff;

-- VACUUM FULL — テーブルの完全再構築（排他ロック注意）
VACUUM FULL staff;

-- ANALYZE — 統計情報の更新（クエリプランナー用）
ANALYZE staff;

-- VACUUM + ANALYZE を同時に
VACUUM ANALYZE staff;

-- テーブルのデッドタプル確認
SELECT relname,
  n_live_tup AS live_rows,
  n_dead_tup AS dead_rows,
  last_vacuum,
  last_autovacuum,
  last_analyze
FROM pg_stat_user_tables
WHERE schemaname = 'public';

-- テーブルサイズの確認
SELECT pg_size_pretty(pg_total_relation_size('staff')) AS total,
       pg_size_pretty(pg_table_size('staff')) AS table,
       pg_size_pretty(pg_indexes_size('staff')) AS indexes;

-- autovacuum の設定確認
SHOW autovacuum;
SHOW autovacuum_vacuum_threshold;
SHOW autovacuum_vacuum_scale_factor;

-- テーブル単位のautovacuum設定
ALTER TABLE access_logs SET (
  autovacuum_vacuum_threshold = 1000,
  autovacuum_vacuum_scale_factor = 0.01
);`,
      },
    ],
  },

  // ===== 管理・運用 =====
  {
    id: "transactions",
    title: "トランザクションとロック",
    category: "admin",
    description:
      "BEGIN/COMMIT/ROLLBACK、分離レベル、デッドロック、楽観的ロックを理解する",
    sections: [
      {
        title: "トランザクションの基本",
        content:
          "トランザクションは複数の操作をアトミック（不可分）に実行する仕組みです。BEGIN で開始し、COMMIT で確定、ROLLBACK で取り消します。SAVEPOINT で部分的なロールバックポイントを設定できます。PostgreSQL はデフォルトでオートコミットモード（各文が個別のトランザクション）で動作します。",
        code: `-- 基本的なトランザクション
BEGIN;
  UPDATE accounts SET balance = balance - 10000
  WHERE id = 1;

  UPDATE accounts SET balance = balance + 10000
  WHERE id = 2;

  -- 両方成功したら確定
COMMIT;

-- エラー時はロールバック
BEGIN;
  UPDATE accounts SET balance = balance - 10000
  WHERE id = 1;

  -- エラーが発生した場合
ROLLBACK;  -- すべて取り消し

-- SAVEPOINT — 部分的なロールバック
BEGIN;
  INSERT INTO orders (...) VALUES (...);

  SAVEPOINT sp1;

  INSERT INTO order_items (...) VALUES (...);
  -- ここでエラー

  ROLLBACK TO SAVEPOINT sp1;
  -- order_items の INSERT のみ取り消し
  -- orders の INSERT は維持

  INSERT INTO order_items (...) VALUES (...);  -- 再試行
COMMIT;`,
      },
      {
        title: "分離レベル",
        content:
          "トランザクション分離レベルは同時実行時のデータ一貫性を制御します。READ COMMITTED（デフォルト）は他のトランザクションが COMMIT したデータを読めます。REPEATABLE READ はトランザクション開始時のスナップショットを維持し、SERIALIZABLE は完全な直列化可能性を保証します。PostgreSQL は READ UNCOMMITTED を受け付けますが、実際には READ COMMITTED として動作します。",
        code: `-- 分離レベルの設定
BEGIN ISOLATION LEVEL READ COMMITTED;    -- デフォルト
BEGIN ISOLATION LEVEL REPEATABLE READ;
BEGIN ISOLATION LEVEL SERIALIZABLE;

-- セッション単位で設定
SET SESSION CHARACTERISTICS AS TRANSACTION
  ISOLATION LEVEL REPEATABLE READ;

-- 現在の分離レベル確認
SHOW transaction_isolation;

-- READ COMMITTED（デフォルト）
-- ✅ ダーティリード防止
-- ❌ ファントムリード発生可能
-- ❌ 非再現リード発生可能

-- REPEATABLE READ
-- ✅ ダーティリード防止
-- ✅ 非再現リード防止
-- ✅ ファントムリード防止（PostgreSQLの場合）
-- ⚠️ 直列化エラーが発生する可能性

-- SERIALIZABLE
-- ✅ 完全な直列化可能性
-- ⚠️ 直列化エラー → リトライが必要

-- 直列化エラーのリトライパターン
-- BEGIN ISOLATION LEVEL SERIALIZABLE;
-- ... SQL ...
-- COMMIT;
-- ERROR: could not serialize access
-- → トランザクション全体をリトライ`,
      },
      {
        title: "ロックとデッドロック",
        content:
          "PostgreSQL は行レベルロックとテーブルレベルロックをサポートします。SELECT FOR UPDATE で明示的な行ロック、NOWAIT / SKIP LOCKED でロック待ちの制御ができます。デッドロックは2つのトランザクションが互いのリソースを待つ状況で、PostgreSQL は自動的に検出して一方をアボートします。楽観的ロック（バージョン番号）はロック競合が少ない場合に効果的です。",
        code: `-- 行ロック（SELECT FOR UPDATE）
BEGIN;
SELECT * FROM accounts WHERE id = 1 FOR UPDATE;
-- この行は他のトランザクションから更新・削除できない
UPDATE accounts SET balance = balance - 1000 WHERE id = 1;
COMMIT;

-- NOWAIT — ロックが取れなければ即座にエラー
SELECT * FROM accounts WHERE id = 1 FOR UPDATE NOWAIT;

-- SKIP LOCKED — ロック中の行をスキップ
-- キュー処理に便利
SELECT * FROM job_queue
WHERE status = 'pending'
ORDER BY created_at
LIMIT 1
FOR UPDATE SKIP LOCKED;

-- デッドロックの例:
-- TX1: UPDATE accounts SET ... WHERE id = 1; -- ロック取得
-- TX2: UPDATE accounts SET ... WHERE id = 2; -- ロック取得
-- TX1: UPDATE accounts SET ... WHERE id = 2; -- TX2待ち
-- TX2: UPDATE accounts SET ... WHERE id = 1; -- TX1待ち → デッドロック!
-- → PostgreSQL が一方を自動アボート

-- 楽観的ロック（バージョン番号方式）
ALTER TABLE products ADD COLUMN version INT DEFAULT 1;

UPDATE products
SET name = '新しい名前', version = version + 1
WHERE id = 1 AND version = 3;
-- 更新件数が0なら他のトランザクションが先に更新した`,
      },
    ],
  },
  {
    id: "backup-security",
    title: "バックアップとセキュリティ",
    category: "admin",
    description:
      "pg_dump/pg_restore、権限管理、ロール、接続制御、暗号化を学ぶ",
    sections: [
      {
        title: "バックアップとリストア",
        content:
          "pg_dump は論理バックアップツールで、SQL形式やカスタム形式でエクスポートできます。pg_restore はカスタム形式のバックアップからリストアし、並列リストアにも対応します。pg_dumpall はすべてのデータベースとロールをまとめてバックアップします。定期的なバックアップと WAL（Write-Ahead Log）アーカイブでポイントインタイムリカバリ（PITR）も可能です。",
        code: `# 論理バックアップ（SQL形式）
pg_dump -U postgres myapp > backup.sql

# カスタム形式（圧縮・並列リストア対応）
pg_dump -U postgres -Fc myapp > backup.dump

# 特定テーブルのみ
pg_dump -U postgres -t staff -t departments myapp > tables.sql

# スキーマのみ（データなし）
pg_dump -U postgres --schema-only myapp > schema.sql

# データのみ（スキーマなし）
pg_dump -U postgres --data-only myapp > data.sql

# リストア（SQL形式）
psql -U postgres myapp < backup.sql

# リストア（カスタム形式）
pg_restore -U postgres -d myapp backup.dump

# 並列リストア（高速）
pg_restore -U postgres -d myapp -j 4 backup.dump

# 全データベースのバックアップ
pg_dumpall -U postgres > all_databases.sql

# リストア
psql -U postgres < all_databases.sql`,
      },
      {
        title: "ロールと権限管理",
        content:
          "PostgreSQL ではロール（ユーザーとグループの統合概念）で権限を管理します。CREATE ROLE でロールを作成し、GRANT / REVOKE で権限を付与・取消します。テーブル、スキーマ、データベースレベルの権限設定が可能で、ロールの継承（INHERIT）により柔軟な権限体系を構築できます。",
        code: `-- ロール（ユーザー）の作成
CREATE ROLE app_user WITH LOGIN PASSWORD 'secure_password';
CREATE ROLE readonly_user WITH LOGIN PASSWORD 'readonly_pass';

-- グループロール
CREATE ROLE developers;
CREATE ROLE admins;

-- グループにメンバーを追加
GRANT developers TO app_user;
GRANT admins TO app_user;

-- テーブル権限
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON staff TO app_user;
GRANT ALL PRIVILEGES ON staff TO admins;

-- シーケンス権限（SERIAL カラムの INSERT に必要）
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_user;

-- スキーマ権限
GRANT USAGE ON SCHEMA public TO readonly_user;
GRANT CREATE ON SCHEMA public TO developers;

-- デフォルト権限（今後作成されるオブジェクトにも適用）
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO readonly_user;

-- 権限の取消
REVOKE INSERT ON staff FROM app_user;

-- 権限の確認
\\dp staff
SELECT grantee, privilege_type
FROM information_schema.role_table_grants
WHERE table_name = 'staff';`,
      },
      {
        title: "接続制御と設定",
        content:
          "pg_hba.conf で接続元のIPアドレス、認証方法を制御します。postgresql.conf でサーバーの動作パラメータ（メモリ、接続数、ログなど）を設定します。SSL/TLS 接続の設定で通信を暗号化し、pgbouncer などのコネクションプーラーで接続管理を効率化できます。定期的なログ監視とアクセス管理が運用の要です。",
        code: `# pg_hba.conf — 接続認証の設定
# TYPE  DATABASE  USER       ADDRESS       METHOD
local   all       postgres                 peer
host    all       all        127.0.0.1/32  scram-sha-256
host    myapp     app_user   10.0.0.0/24   scram-sha-256
host    all       all        0.0.0.0/0     reject

# postgresql.conf — 主要設定
# 接続
max_connections = 200
listen_addresses = 'localhost'

# メモリ
shared_buffers = 256MB          # 総メモリの25%程度
effective_cache_size = 768MB    # 総メモリの75%程度
work_mem = 4MB                  # ソート/ハッシュ操作用
maintenance_work_mem = 64MB     # VACUUM等のメンテナンス用

# ログ
logging_collector = on
log_directory = 'log'
log_min_duration_statement = 1000  # 1秒以上のクエリをログ

# SSL設定
ssl = on
ssl_cert_file = '/path/to/server.crt'
ssl_key_file = '/path/to/server.key'

-- 設定の確認（SQL）
SHOW max_connections;
SHOW shared_buffers;
SHOW work_mem;

-- 現在の接続一覧
SELECT pid, usename, datname, client_addr, state
FROM pg_stat_activity;`,
      },
    ],
  },
];

export interface OracleSection {
  title: string;
  content: string;
  code?: string;
}

export interface OracleChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: OracleSection[];
}

export const oracleCategories = [
  { id: "sql-basic", name: "SQL基礎", color: "var(--color-dads-blue)" },
  { id: "join-sub", name: "結合・サブクエリ", color: "var(--color-dads-success)" },
  { id: "dml", name: "データ操作", color: "var(--color-dads-warning)" },
  { id: "ddl", name: "テーブル設計・DDL", color: "var(--color-dads-purple)" },
  { id: "function", name: "組み込み関数", color: "var(--color-dads-cyan)" },
  { id: "plsql", name: "PL/SQL", color: "var(--color-dads-success)" },
  { id: "performance", name: "パフォーマンス", color: "var(--color-dads-error)" },
  { id: "admin", name: "管理・運用", color: "var(--color-dads-gray)" },
  { id: "sqlplus", name: "SQL*Plus", color: "var(--color-dads-amber)" },
] as const;

export const oracleChapters: OracleChapter[] = [
  // ===== SQL基礎 =====
  {
    id: "select-basics",
    title: "SELECT文の基本",
    category: "sql-basic",
    description:
      "データ取得の基本であるSELECT文の構文と、列の選択・別名・リテラル・DISTINCT の使い方を学ぶ",
    sections: [
      {
        title: "SELECT文の基本構文",
        content:
          "SELECT文はデータベースからデータを取得する最も基本的なSQL文です。SELECT句で取得する列を指定し、FROM句でテーブルを指定します。全列を取得するにはアスタリスク(*)を使いますが、本番コードでは必要な列だけを明示的に指定することが推奨されます。",
        code: `-- 全列を取得
SELECT * FROM employees;

-- 特定の列を取得
SELECT employee_id, first_name, last_name, salary
FROM employees;

-- 列の別名（エイリアス）
SELECT employee_id AS "社員番号",
       first_name || ' ' || last_name AS "氏名",
       salary AS "給与"
FROM employees;

-- リテラルの追加と文字列結合
SELECT first_name || 'さんの給与は' || salary || '円です' AS "メッセージ"
FROM employees;`,
      },
      {
        title: "DISTINCT と重複排除",
        content:
          "DISTINCT キーワードを使うと、重複する行を除いた結果を取得できます。複数列を指定した場合は、指定した列の組み合わせで一意な行が返されます。NULL 値同士は同じ値として扱われます。",
        code: `-- 部門IDの一覧（重複なし）
SELECT DISTINCT department_id FROM employees;

-- 複数列の組み合わせで重複排除
SELECT DISTINCT department_id, job_id FROM employees;

-- 重複を含む件数と一意な件数の比較
SELECT COUNT(department_id) AS "全件数",
       COUNT(DISTINCT department_id) AS "一意な部門数"
FROM employees;`,
      },
      {
        title: "NULL の扱いと NVL 関数",
        content:
          "Oracle では値が存在しないことを NULL で表します。NULL は未知の値であり、算術演算や比較では特別な挙動をします。NVL 関数を使うと NULL を別の値に置き換えることができます。NVL2 はより細かい制御が可能です。",
        code: `-- NULLを含む計算（結果はNULLになる）
SELECT employee_id, salary, commission_pct,
       salary * commission_pct AS "歩合額（NULL注意）"
FROM employees;

-- NVL で NULL を 0 に置換
SELECT employee_id, salary, commission_pct,
       salary * NVL(commission_pct, 0) AS "歩合額"
FROM employees;

-- NVL2: NULLでない場合と NULL の場合で異なる値を返す
SELECT employee_id,
       NVL2(commission_pct, '歩合あり', '歩合なし') AS "歩合区分"
FROM employees;

-- COALESCE: 最初にNULLでない値を返す
SELECT COALESCE(commission_pct, 0) AS "歩合率" FROM employees;`,
      },
    ],
  },
  {
    id: "where-filter",
    title: "WHERE句と条件絞り込み",
    category: "sql-basic",
    description:
      "WHERE句による行の絞り込み、比較演算子、BETWEEN、IN、LIKE、IS NULLなどの条件式を学ぶ",
    sections: [
      {
        title: "比較演算子と基本条件",
        content:
          "WHERE句はSELECT文で取得する行を条件で絞り込みます。等価(=)、不等価(<>, !=)、大小比較(>, >=, <, <=)の各演算子を使ってデータを条件指定します。文字列の比較では大文字・小文字が区別される点に注意してください。",
        code: `-- 等価条件
SELECT * FROM employees WHERE department_id = 90;

-- 不等価条件
SELECT * FROM employees WHERE department_id <> 90;

-- 大小比較
SELECT * FROM employees WHERE salary >= 10000;

-- 文字列の条件
SELECT * FROM employees WHERE last_name = 'King';`,
      },
      {
        title: "BETWEEN, IN, LIKE, IS NULL",
        content:
          "範囲指定にはBETWEEN、複数値の一致判定にはIN、パターンマッチにはLIKE、NULLの判定にはIS NULLを使用します。これらの条件式はNOTと組み合わせて否定条件としても利用できます。LIKE のワイルドカードは % (任意の0文字以上) と _ (任意の1文字) です。",
        code: `-- BETWEEN: 範囲指定（両端を含む）
SELECT * FROM employees WHERE salary BETWEEN 5000 AND 10000;

-- IN: 複数値のいずれかに一致
SELECT * FROM employees WHERE department_id IN (10, 20, 30);

-- LIKE: パターンマッチ
SELECT * FROM employees WHERE last_name LIKE 'K%';      -- Kで始まる
SELECT * FROM employees WHERE last_name LIKE '_i%';     -- 2文字目がi

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE commission_pct IS NULL;
SELECT * FROM employees WHERE commission_pct IS NOT NULL;

-- NOT の組み合わせ
SELECT * FROM employees WHERE department_id NOT IN (10, 20);
SELECT * FROM employees WHERE salary NOT BETWEEN 5000 AND 10000;`,
      },
      {
        title: "AND, OR, NOT と優先順位",
        content:
          "複数の条件を組み合わせるにはAND（かつ）、OR（または）、NOT（否定）を使います。ANDはORより優先順位が高いため、OR条件を先に評価したい場合は括弧()を使って明示的に優先順位を指定します。",
        code: `-- AND: 両方の条件を満たす
SELECT * FROM employees
WHERE department_id = 90 AND salary >= 10000;

-- OR: いずれかの条件を満たす
SELECT * FROM employees
WHERE department_id = 60 OR department_id = 90;

-- 括弧で優先順位を制御
SELECT * FROM employees
WHERE (department_id = 60 OR department_id = 90)
  AND salary >= 10000;

-- NOT と組み合わせ
SELECT * FROM employees
WHERE NOT (department_id = 60 AND salary < 5000);`,
      },
    ],
  },
  {
    id: "orderby-rownum",
    title: "ORDER BY とソート・行制限",
    category: "sql-basic",
    description:
      "検索結果の並べ替え、複数列ソート、NULLS FIRST/LAST、FETCH FIRSTによる行数制限を学ぶ",
    sections: [
      {
        title: "ORDER BY の基本",
        content:
          "ORDER BY句はSELECT文の結果を指定した列で並べ替えます。ASC（昇順、デフォルト）またはDESC（降順）を指定できます。複数の列を指定すると、第1キー、第2キーの順にソートされます。ORDER BYがないSELECTの結果順序は保証されません。",
        code: `-- 昇順ソート（デフォルト）
SELECT * FROM employees ORDER BY salary;

-- 降順ソート
SELECT * FROM employees ORDER BY salary DESC;

-- 複数列でソート
SELECT * FROM employees
ORDER BY department_id ASC, salary DESC;

-- 列の別名でソート
SELECT first_name || ' ' || last_name AS full_name, salary
FROM employees
ORDER BY full_name;

-- 列番号でソート（位置指定）
SELECT employee_id, first_name, salary
FROM employees
ORDER BY 3 DESC;  -- 3番目の列（salary）で降順`,
      },
      {
        title: "NULLS FIRST / LAST",
        content:
          "Oracle では ORDER BY のソート順でNULL値の位置を NULLS FIRST（先頭）または NULLS LAST（末尾）で制御できます。デフォルトでは昇順の場合NULLは最後に、降順の場合NULLは最初に配置されます。",
        code: `-- NULLを先頭に配置
SELECT employee_id, commission_pct
FROM employees
ORDER BY commission_pct NULLS FIRST;

-- NULLを末尾に配置（降順時）
SELECT employee_id, commission_pct
FROM employees
ORDER BY commission_pct DESC NULLS LAST;`,
      },
      {
        title: "FETCH FIRST と ROWNUM による行数制限",
        content:
          "取得する行数を制限するには、Oracle 12c以降では FETCH FIRST 構文、それ以前では ROWNUM 擬似列を使います。ページネーション処理にも活用できます。OFFSET句を使うと先頭からスキップする行数を指定できます。",
        code: `-- FETCH FIRST（Oracle 12c以降、推奨）
SELECT * FROM employees
ORDER BY salary DESC
FETCH FIRST 10 ROWS ONLY;

-- パーセント指定
SELECT * FROM employees
ORDER BY salary DESC
FETCH FIRST 10 PERCENT ROWS ONLY;

-- ページネーション（OFFSET + FETCH）
SELECT * FROM employees
ORDER BY employee_id
OFFSET 20 ROWS FETCH NEXT 10 ROWS ONLY;  -- 21件目から10件

-- ROWNUM（従来方式）
SELECT * FROM (
    SELECT * FROM employees ORDER BY salary DESC
) WHERE ROWNUM <= 10;

-- ROWNUM でページネーション（従来方式）
SELECT * FROM (
    SELECT a.*, ROWNUM AS rn FROM (
        SELECT * FROM employees ORDER BY salary DESC
    ) a WHERE ROWNUM <= 30
) WHERE rn > 20;  -- 21～30件目`,
      },
    ],
  },

  // ===== 結合・サブクエリ =====
  {
    id: "join-tables",
    title: "テーブル結合（JOIN）",
    category: "join-sub",
    description:
      "INNER JOIN、LEFT/RIGHT/FULL OUTER JOIN、CROSS JOIN、自己結合によるテーブル結合を学ぶ",
    sections: [
      {
        title: "INNER JOIN（内部結合）",
        content:
          "INNER JOIN は2つのテーブルから結合条件に一致する行のみを返します。一致しない行は結果に含まれません。ON句で結合条件を指定します。Oracle固有の旧構文（WHERE句での結合）もありますが、ANSI標準のJOIN構文が推奨されます。",
        code: `-- ANSI標準の INNER JOIN
SELECT e.employee_id, e.first_name, e.last_name,
       d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- 複数テーブルの結合
SELECT e.first_name, e.last_name,
       d.department_name,
       l.city, l.country_id
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN locations l ON d.location_id = l.location_id;

-- Oracle旧構文（非推奨だが既存コードで頻出）
SELECT e.first_name, d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id;`,
      },
      {
        title: "OUTER JOIN（外部結合）",
        content:
          "OUTER JOIN は結合条件に一致しない行も結果に含めます。LEFT OUTER JOIN は左テーブルの全行を保持し、RIGHT OUTER JOIN は右テーブルの全行を保持します。FULL OUTER JOIN は両方のテーブルの全行を保持します。",
        code: `-- LEFT OUTER JOIN: 部門に所属しない社員も含む
SELECT e.employee_id, e.first_name, d.department_name
FROM employees e
LEFT OUTER JOIN departments d ON e.department_id = d.department_id;

-- RIGHT OUTER JOIN: 社員がいない部門も含む
SELECT e.first_name, d.department_name
FROM employees e
RIGHT OUTER JOIN departments d ON e.department_id = d.department_id;

-- FULL OUTER JOIN: 双方の不一致行を含む
SELECT e.first_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.department_id;

-- Oracle旧構文の外部結合（(+)記号）
SELECT e.first_name, d.department_name
FROM employees e, departments d
WHERE e.department_id = d.department_id(+);  -- LEFT JOIN相当`,
      },
      {
        title: "CROSS JOIN と自己結合",
        content:
          "CROSS JOIN は2つのテーブルの全組み合わせ（直積）を生成します。自己結合は同じテーブルを異なる別名で結合する手法で、階層データや同一テーブル内の比較に使用します。",
        code: `-- CROSS JOIN（直積）
SELECT d.department_name, j.job_title
FROM departments d
CROSS JOIN jobs j;

-- 自己結合: 上司と部下の一覧
SELECT e.first_name || ' ' || e.last_name AS "社員名",
       m.first_name || ' ' || m.last_name AS "上司名"
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;

-- 自己結合: 同じ部門の社員ペア
SELECT a.first_name AS "社員A",
       b.first_name AS "社員B",
       a.department_id
FROM employees a
INNER JOIN employees b ON a.department_id = b.department_id
                       AND a.employee_id < b.employee_id;`,
      },
    ],
  },
  {
    id: "subquery",
    title: "サブクエリと WITH 句",
    category: "join-sub",
    description:
      "単一行・複数行サブクエリ、相関サブクエリ、EXISTS、WITH句（CTE）の活用方法を学ぶ",
    sections: [
      {
        title: "単一行・複数行サブクエリ",
        content:
          "サブクエリ（副問い合わせ）は SQL 文の中に埋め込まれた SELECT 文です。単一行サブクエリは1つの値を返し、比較演算子(=, >, < 等)と使います。複数行サブクエリは複数の値を返し、IN, ANY, ALL などの演算子と使います。",
        code: `-- 単一行サブクエリ: 平均給与以上の社員
SELECT first_name, salary
FROM employees
WHERE salary >= (SELECT AVG(salary) FROM employees);

-- 複数行サブクエリ（IN）: 管理職の社員一覧
SELECT first_name, last_name
FROM employees
WHERE employee_id IN (
    SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL
);

-- ANY: いずれかの値より大きい
SELECT first_name, salary
FROM employees
WHERE salary > ANY (
    SELECT salary FROM employees WHERE department_id = 60
);

-- ALL: すべての値より大きい
SELECT first_name, salary
FROM employees
WHERE salary > ALL (
    SELECT salary FROM employees WHERE department_id = 60
);

-- スカラーサブクエリ（SELECT句内）
SELECT e.first_name, e.salary,
       (SELECT AVG(salary) FROM employees) AS "全社平均",
       e.salary - (SELECT AVG(salary) FROM employees) AS "平均との差"
FROM employees e;`,
      },
      {
        title: "相関サブクエリと EXISTS",
        content:
          "相関サブクエリは外側のクエリの各行を参照するサブクエリです。行ごとに評価されるため、外側のクエリに依存します。EXISTS は相関サブクエリの結果が1行以上あるかどうかを判定し、大量データではIN より効率的な場合があります。",
        code: `-- 相関サブクエリ: 所属部門の平均給与以上の社員
SELECT e.first_name, e.salary, e.department_id
FROM employees e
WHERE e.salary >= (
    SELECT AVG(salary) FROM employees WHERE department_id = e.department_id
);

-- EXISTS: 部下がいる管理職
SELECT m.employee_id, m.first_name, m.last_name
FROM employees m
WHERE EXISTS (
    SELECT 1 FROM employees e WHERE e.manager_id = m.employee_id
);

-- NOT EXISTS: 注文のない顧客（実務でよく使うパターン）
SELECT c.customer_id, c.customer_name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id
);`,
      },
      {
        title: "WITH句（共通テーブル式・CTE）",
        content:
          "WITH句（Common Table Expression）は一時的な名前付き結果セットを定義します。複雑なクエリを分割して読みやすくでき、同じサブクエリの繰り返しも避けられます。再帰CTEを使えば階層データの探索も可能です。",
        code: `-- 基本的なCTE
WITH dept_avg AS (
    SELECT department_id,
           AVG(salary) AS avg_salary,
           COUNT(*) AS emp_count
    FROM employees
    GROUP BY department_id
)
SELECT d.department_name, da.avg_salary, da.emp_count
FROM dept_avg da
INNER JOIN departments d ON da.department_id = d.department_id
ORDER BY da.avg_salary DESC;

-- 複数のCTE
WITH high_salary AS (
    SELECT * FROM employees WHERE salary >= 10000
),
dept_summary AS (
    SELECT department_id, COUNT(*) AS cnt
    FROM high_salary
    GROUP BY department_id
)
SELECT d.department_name, ds.cnt
FROM dept_summary ds
INNER JOIN departments d ON ds.department_id = d.department_id;

-- 再帰CTE: 組織階層の展開
WITH org_tree (employee_id, first_name, manager_id, lvl) AS (
    -- アンカー: 最上位（社長）
    SELECT employee_id, first_name, manager_id, 1
    FROM employees WHERE manager_id IS NULL
    UNION ALL
    -- 再帰: 部下をたどる
    SELECT e.employee_id, e.first_name, e.manager_id, t.lvl + 1
    FROM employees e
    INNER JOIN org_tree t ON e.manager_id = t.employee_id
)
SELECT LPAD(' ', (lvl - 1) * 4) || first_name AS "組織図",
       lvl AS "階層"
FROM org_tree
ORDER BY lvl, employee_id;`,
      },
    ],
  },

  // ===== データ操作 =====
  {
    id: "insert-update-delete",
    title: "INSERT / UPDATE / DELETE",
    category: "dml",
    description:
      "データの追加・更新・削除の基本操作と、複数行INSERT、条件付きUPDATEの実践パターンを学ぶ",
    sections: [
      {
        title: "INSERT文（データ追加）",
        content:
          "INSERT文はテーブルにデータを追加します。列リストを省略すると全列に値を指定する必要がありますが、列リストを明示する方が安全です。SELECT文の結果を一括挿入する INSERT INTO ... SELECT も実務では頻繁に使われます。",
        code: `-- 基本的なINSERT（列リスト指定、推奨）
INSERT INTO departments (department_id, department_name, manager_id, location_id)
VALUES (280, '新規事業部', 100, 1700);

-- 列リスト省略（全列を順番通りに指定、非推奨）
INSERT INTO departments VALUES (290, 'データ分析部', NULL, 1700);

-- SELECT結果を一括INSERT
INSERT INTO dept_backup (department_id, department_name, manager_id)
SELECT department_id, department_name, manager_id
FROM departments
WHERE location_id = 1700;

-- 複数行INSERT（Oracle固有の INSERT ALL）
INSERT ALL
    INTO sales_log (log_date, product_id, amount) VALUES (SYSDATE, 101, 5000)
    INTO sales_log (log_date, product_id, amount) VALUES (SYSDATE, 102, 3000)
    INTO sales_log (log_date, product_id, amount) VALUES (SYSDATE, 103, 7000)
SELECT 1 FROM DUAL;

-- シーケンスを使ったID自動採番
INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, job_id)
VALUES (emp_seq.NEXTVAL, '太郎', '山田', 'tyamada', SYSDATE, 'IT_PROG');`,
      },
      {
        title: "UPDATE文（データ更新）",
        content:
          "UPDATE文は既存のデータを更新します。WHERE句を省略すると全行が更新されるため、必ず条件を指定してください。サブクエリを使った条件付き更新や、複数列の同時更新も可能です。",
        code: `-- 基本的なUPDATE
UPDATE employees
SET salary = 15000
WHERE employee_id = 100;

-- 複数列の同時更新
UPDATE employees
SET salary = salary * 1.1,
    commission_pct = NVL(commission_pct, 0) + 0.05
WHERE department_id = 60;

-- サブクエリを使った更新
UPDATE employees e
SET salary = (
    SELECT AVG(salary) FROM employees WHERE department_id = e.department_id
)
WHERE e.salary < (
    SELECT AVG(salary) * 0.8 FROM employees WHERE department_id = e.department_id
);

-- CASE式を使った条件分岐更新
UPDATE employees
SET salary = CASE
    WHEN department_id = 60 THEN salary * 1.15
    WHEN department_id = 90 THEN salary * 1.10
    ELSE salary * 1.05
END;`,
      },
      {
        title: "DELETE文とTRUNCATE",
        content:
          "DELETE文はテーブルからデータを削除します。WHERE句を省略すると全行が削除されます。TRUNCATE TABLE はテーブル全行を高速に削除しますが、ロールバックできません。外部キー制約がある場合の削除順序にも注意が必要です。",
        code: `-- 基本的なDELETE
DELETE FROM employees WHERE employee_id = 207;

-- 条件付きDELETE
DELETE FROM job_history
WHERE end_date < ADD_MONTHS(SYSDATE, -120);  -- 10年以上前

-- サブクエリを使ったDELETE
DELETE FROM employees
WHERE department_id IN (
    SELECT department_id FROM departments WHERE location_id = 1700
);

-- TRUNCATE（全行削除、ロールバック不可、高速）
TRUNCATE TABLE temp_data;

-- DELETE vs TRUNCATE
-- DELETE: ロールバック可、WHERE指定可、トリガー起動、低速
-- TRUNCATE: ロールバック不可、全行のみ、トリガー不起動、高速`,
      },
    ],
  },
  {
    id: "merge-transaction",
    title: "MERGE文とトランザクション制御",
    category: "dml",
    description:
      "MERGE文によるUPSERT処理と、COMMIT/ROLLBACK/SAVEPOINTによるトランザクション管理を学ぶ",
    sections: [
      {
        title: "MERGE文（UPSERT）",
        content:
          "MERGE文はUPSERT（存在すれば更新、なければ挿入）を1つのSQL文で実行できます。ETL処理やマスタデータ同期で頻繁に使われる強力な構文です。WHEN MATCHED と WHEN NOT MATCHED で更新と挿入の処理を分けて記述します。",
        code: `-- 基本的なMERGE（UPSERT）
MERGE INTO employees_target t
USING employees_source s
ON (t.employee_id = s.employee_id)
WHEN MATCHED THEN
    UPDATE SET
        t.first_name = s.first_name,
        t.last_name = s.last_name,
        t.salary = s.salary
WHEN NOT MATCHED THEN
    INSERT (employee_id, first_name, last_name, salary, hire_date, job_id, email)
    VALUES (s.employee_id, s.first_name, s.last_name, s.salary, s.hire_date, s.job_id, s.email);

-- DELETE条件付きMERGE
MERGE INTO products t
USING staging_products s
ON (t.product_id = s.product_id)
WHEN MATCHED THEN
    UPDATE SET t.price = s.price, t.stock = s.stock
    DELETE WHERE t.stock = 0
WHEN NOT MATCHED THEN
    INSERT (product_id, product_name, price, stock)
    VALUES (s.product_id, s.product_name, s.price, s.stock);

-- 条件付きUPDATE/INSERT
MERGE INTO monthly_sales t
USING daily_sales s
ON (t.product_id = s.product_id AND t.sales_month = TRUNC(s.sales_date, 'MM'))
WHEN MATCHED THEN
    UPDATE SET t.total_amount = t.total_amount + s.amount
    WHERE s.amount > 0
WHEN NOT MATCHED THEN
    INSERT (product_id, sales_month, total_amount)
    VALUES (s.product_id, TRUNC(s.sales_date, 'MM'), s.amount)
    WHERE s.amount > 0;`,
      },
      {
        title: "トランザクション制御",
        content:
          "トランザクションは一連のDML操作をまとめて管理する仕組みです。COMMIT で変更を確定し、ROLLBACK で変更を取り消します。SAVEPOINT を使うと部分的なロールバックも可能です。Oracle では DDL文の実行時に暗黙的なCOMMITが発生する点に注意が必要です。",
        code: `-- 基本的なトランザクション制御
UPDATE accounts SET balance = balance - 10000 WHERE account_id = 1001;
UPDATE accounts SET balance = balance + 10000 WHERE account_id = 1002;
COMMIT;  -- 両方の更新を確定

-- エラー時のロールバック
UPDATE accounts SET balance = balance - 50000 WHERE account_id = 1001;
-- エラーが発生した場合
ROLLBACK;  -- 更新を取り消し

-- SAVEPOINT を使った部分ロールバック
INSERT INTO orders VALUES (order_seq.NEXTVAL, 1001, SYSDATE, 'PENDING');
SAVEPOINT after_order;

INSERT INTO order_items VALUES (item_seq.NEXTVAL, order_seq.CURRVAL, 'A001', 3);
INSERT INTO order_items VALUES (item_seq.NEXTVAL, order_seq.CURRVAL, 'B002', 1);
-- 明細だけ取り消して注文は残す
ROLLBACK TO after_order;

COMMIT;  -- 注文のみ確定

-- 注意: DDL（CREATE, ALTER, DROP等）は暗黙的にCOMMITされる
-- DDL実行前に未コミットのDMLがあると自動的にCOMMITされる`,
      },
      {
        title: "ロック制御と同時実行",
        content:
          "Oracle は行レベルロックにより高い同時実行性を提供します。SELECT ... FOR UPDATE で明示的にロックを取得でき、NOWAIT や WAIT オプションでロック待ちの動作を制御できます。デッドロックの回避策も理解しておきましょう。",
        code: `-- SELECT FOR UPDATE: 行ロックの取得
SELECT * FROM employees
WHERE department_id = 60
FOR UPDATE;  -- 選択した行をロック

-- NOWAIT: ロック待ちしない（ロック中ならエラー）
SELECT * FROM employees
WHERE employee_id = 100
FOR UPDATE NOWAIT;

-- WAIT: 指定秒数だけロック待ち
SELECT * FROM employees
WHERE employee_id = 100
FOR UPDATE WAIT 5;  -- 5秒待ってもロック取得できなければエラー

-- SKIP LOCKED: ロック中の行をスキップ（キュー処理向け）
SELECT * FROM task_queue
WHERE status = 'PENDING'
ORDER BY created_at
FETCH FIRST 1 ROWS ONLY
FOR UPDATE SKIP LOCKED;`,
      },
    ],
  },

  // ===== テーブル設計・DDL =====
  {
    id: "create-table",
    title: "テーブル作成と制約",
    category: "ddl",
    description:
      "CREATE TABLE によるテーブル定義、データ型の選択、主キー・外部キー・CHECK制約の設定方法を学ぶ",
    sections: [
      {
        title: "CREATE TABLE とデータ型",
        content:
          "CREATE TABLE でテーブルを作成します。Oracle の主要なデータ型には、文字列型（VARCHAR2, CHAR, CLOB）、数値型（NUMBER）、日付型（DATE, TIMESTAMP）があります。適切なデータ型とサイズの選択がパフォーマンスとデータ品質に直結します。",
        code: `-- 基本的なCREATE TABLE
CREATE TABLE employees_new (
    employee_id   NUMBER(6)     NOT NULL,
    first_name    VARCHAR2(50),
    last_name     VARCHAR2(50)  NOT NULL,
    email         VARCHAR2(100) NOT NULL,
    phone_number  VARCHAR2(20),
    hire_date     DATE          NOT NULL,
    salary        NUMBER(10, 2),
    department_id NUMBER(4),
    created_at    TIMESTAMP     DEFAULT SYSTIMESTAMP,
    is_active     NUMBER(1)     DEFAULT 1
);

-- 主要なデータ型一覧
-- VARCHAR2(n)    : 可変長文字列（最大4000バイト）
-- CHAR(n)        : 固定長文字列
-- NUMBER(p, s)   : 数値（精度p, スケールs）
-- DATE           : 日付と時刻（秒まで）
-- TIMESTAMP      : 日付と時刻（小数秒あり）
-- CLOB           : 大容量テキスト（最大4GB）
-- BLOB           : バイナリデータ（最大4GB）`,
      },
      {
        title: "制約（PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK）",
        content:
          "制約はデータの整合性を保証する仕組みです。主キー（PRIMARY KEY）は行を一意に識別し、外部キー（FOREIGN KEY）は参照整合性を保証します。UNIQUE は重複を防ぎ、CHECK は値の範囲を制限します。制約には名前を付けてエラーメッセージの特定を容易にしましょう。",
        code: `-- 制約付きテーブル作成
CREATE TABLE orders (
    order_id      NUMBER(10)    CONSTRAINT pk_orders PRIMARY KEY,
    customer_id   NUMBER(10)    NOT NULL
                                CONSTRAINT fk_orders_customer
                                REFERENCES customers(customer_id),
    order_date    DATE          NOT NULL,
    status        VARCHAR2(20)  DEFAULT 'PENDING'
                                CONSTRAINT ck_orders_status
                                CHECK (status IN ('PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED')),
    total_amount  NUMBER(12, 2) CONSTRAINT ck_orders_amount CHECK (total_amount >= 0),
    email         VARCHAR2(100) CONSTRAINT uq_orders_email UNIQUE
);

-- 複合主キーと外部キー（テーブルレベル制約）
CREATE TABLE order_items (
    order_id      NUMBER(10),
    item_seq      NUMBER(5),
    product_id    NUMBER(10)    NOT NULL,
    quantity      NUMBER(5)     NOT NULL CHECK (quantity > 0),
    unit_price    NUMBER(10, 2) NOT NULL,
    CONSTRAINT pk_order_items PRIMARY KEY (order_id, item_seq),
    CONSTRAINT fk_oi_order FOREIGN KEY (order_id)
               REFERENCES orders(order_id) ON DELETE CASCADE,
    CONSTRAINT fk_oi_product FOREIGN KEY (product_id)
               REFERENCES products(product_id)
);`,
      },
      {
        title: "シーケンスとIDENTITY列",
        content:
          "シーケンスは一意な連番を生成するオブジェクトです。主キーの自動採番に使われます。Oracle 12c 以降ではIDENTITY列も利用でき、よりシンプルに自動採番が可能になりました。",
        code: `-- シーケンスの作成
CREATE SEQUENCE emp_seq
    START WITH 1000
    INCREMENT BY 1
    NOCACHE
    NOCYCLE;

-- シーケンスの使用
INSERT INTO employees (employee_id, first_name, last_name, email, hire_date, job_id)
VALUES (emp_seq.NEXTVAL, '花子', '鈴木', 'hsuzuki', SYSDATE, 'IT_PROG');

-- 現在値の確認
SELECT emp_seq.CURRVAL FROM DUAL;

-- IDENTITY列（Oracle 12c以降）
CREATE TABLE products (
    product_id    NUMBER GENERATED ALWAYS AS IDENTITY
                  CONSTRAINT pk_products PRIMARY KEY,
    product_name  VARCHAR2(200) NOT NULL,
    price         NUMBER(10, 2),
    created_at    TIMESTAMP DEFAULT SYSTIMESTAMP
);

-- IDENTITY列へのINSERT（IDを指定しない）
INSERT INTO products (product_name, price)
VALUES ('ノートPC', 120000);

-- GENERATED BY DEFAULT: 明示的な指定も許可
CREATE TABLE categories (
    category_id   NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    category_name VARCHAR2(100) NOT NULL
);`,
      },
    ],
  },
  {
    id: "alter-index",
    title: "ALTER TABLE / インデックス / ビュー",
    category: "ddl",
    description:
      "テーブル構造の変更、インデックスの作成と管理、ビューの活用方法を学ぶ",
    sections: [
      {
        title: "ALTER TABLE（テーブル構造の変更）",
        content:
          "ALTER TABLE で既存のテーブルに列の追加・変更・削除や、制約の追加・削除ができます。本番環境ではデータ移行やアプリケーション互換性に注意しながら実施する必要があります。",
        code: `-- 列の追加
ALTER TABLE employees ADD (
    middle_name VARCHAR2(50),
    birth_date  DATE
);

-- 列のデータ型・サイズ変更
ALTER TABLE employees MODIFY (
    email VARCHAR2(200)
);

-- 列のデフォルト値設定
ALTER TABLE employees MODIFY (
    is_active NUMBER(1) DEFAULT 1
);

-- 列名の変更
ALTER TABLE employees RENAME COLUMN phone_number TO mobile_number;

-- 列の削除（本番では慎重に）
ALTER TABLE employees DROP COLUMN middle_name;

-- 制約の追加
ALTER TABLE employees ADD CONSTRAINT uq_emp_email UNIQUE (email);

-- 制約の削除
ALTER TABLE employees DROP CONSTRAINT uq_emp_email;

-- 制約の無効化 / 有効化（大量データロード時に便利）
ALTER TABLE order_items DISABLE CONSTRAINT fk_oi_order;
-- データロード後
ALTER TABLE order_items ENABLE CONSTRAINT fk_oi_order;

-- テーブル名の変更
ALTER TABLE employees RENAME TO staff;`,
      },
      {
        title: "インデックスの作成と管理",
        content:
          "インデックスは検索性能を向上させるデータベースオブジェクトです。WHERE句、JOIN条件、ORDER BY で使われる列にインデックスを作成します。ただしINSERT/UPDATE/DELETEのオーバーヘッドが増えるため、必要な箇所にのみ作成しましょう。",
        code: `-- 基本的なインデックス作成
CREATE INDEX idx_emp_dept ON employees(department_id);

-- 複合インデックス（カーディナリティが高い列を先に）
CREATE INDEX idx_emp_dept_salary ON employees(department_id, salary);

-- 一意インデックス
CREATE UNIQUE INDEX idx_emp_email ON employees(email);

-- 関数ベースインデックス
CREATE INDEX idx_emp_upper_name ON employees(UPPER(last_name));
-- 使用例: WHERE UPPER(last_name) = 'KING'

-- インデックスの再構築（断片化解消）
ALTER INDEX idx_emp_dept REBUILD;

-- インデックスの削除
DROP INDEX idx_emp_dept;

-- インデックス情報の確認
SELECT index_name, column_name, column_position
FROM user_ind_columns
WHERE table_name = 'EMPLOYEES'
ORDER BY index_name, column_position;`,
      },
      {
        title: "ビューとマテリアライズドビュー",
        content:
          "ビューは保存されたSELECT文で、仮想的なテーブルとしてアクセスできます。複雑なクエリの簡略化やセキュリティ制御に使われます。マテリアライズドビューは結果を物理的に保存し、集計処理の高速化に利用されます。",
        code: `-- ビューの作成
CREATE OR REPLACE VIEW v_emp_dept AS
SELECT e.employee_id, e.first_name, e.last_name,
       e.salary, d.department_name, l.city
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN locations l ON d.location_id = l.location_id;

-- ビューの使用（テーブルと同じように使える）
SELECT * FROM v_emp_dept WHERE city = 'Seattle';

-- WITH CHECK OPTION（ビュー経由の更新を制限）
CREATE OR REPLACE VIEW v_dept60_emp AS
SELECT * FROM employees WHERE department_id = 60
WITH CHECK OPTION CONSTRAINT ck_dept60;
-- department_id を 60 以外に更新しようとするとエラー

-- マテリアライズドビュー（集計結果の物理保存）
CREATE MATERIALIZED VIEW mv_dept_salary_summary
REFRESH ON DEMAND
AS
SELECT department_id,
       COUNT(*) AS emp_count,
       AVG(salary) AS avg_salary,
       SUM(salary) AS total_salary
FROM employees
GROUP BY department_id;

-- マテリアライズドビューの手動リフレッシュ
BEGIN
    DBMS_MVIEW.REFRESH('MV_DEPT_SALARY_SUMMARY');
END;
/`,
      },
    ],
  },

  // ===== 組み込み関数 =====
  {
    id: "string-number-func",
    title: "文字列関数・数値関数",
    category: "function",
    description:
      "SUBSTR, INSTR, REPLACE, TRIM などの文字列関数と、ROUND, TRUNC, MOD などの数値関数を学ぶ",
    sections: [
      {
        title: "文字列関数",
        content:
          "Oracle には豊富な文字列関数が用意されています。文字列の切り出し(SUBSTR)、検索(INSTR)、置換(REPLACE)、変換(UPPER/LOWER/INITCAP)、パディング(LPAD/RPAD)、トリム(TRIM)などを使いこなすことで、データの加工・整形が効率的に行えます。",
        code: `-- 文字列の切り出し
SELECT SUBSTR('Oracle Database', 1, 6) FROM DUAL;     -- 'Oracle'
SELECT SUBSTR('Oracle Database', 8) FROM DUAL;         -- 'Database'
SELECT SUBSTR('Oracle Database', -8) FROM DUAL;        -- 'Database'（末尾から）

-- 文字列の検索
SELECT INSTR('Hello World', 'o') FROM DUAL;            -- 5（最初のo）
SELECT INSTR('Hello World', 'o', 1, 2) FROM DUAL;      -- 8（2番目のo）

-- 文字列の置換
SELECT REPLACE('2024-01-15', '-', '/') FROM DUAL;      -- '2024/01/15'

-- 大文字・小文字変換
SELECT UPPER('hello') FROM DUAL;      -- 'HELLO'
SELECT LOWER('HELLO') FROM DUAL;      -- 'hello'
SELECT INITCAP('hello world') FROM DUAL; -- 'Hello World'

-- パディング
SELECT LPAD(42, 8, '0') FROM DUAL;    -- '00000042'
SELECT RPAD('AB', 5, '*') FROM DUAL;  -- 'AB***'

-- トリム
SELECT TRIM('  hello  ') FROM DUAL;                -- 'hello'
SELECT TRIM(LEADING '0' FROM '00042') FROM DUAL;   -- '42'

-- 文字列結合
SELECT 'Hello' || ' ' || 'World' FROM DUAL;   -- 'Hello World'
SELECT CONCAT('Hello', ' World') FROM DUAL;    -- 'Hello World'

-- 長さ
SELECT LENGTH('Oracle') FROM DUAL;       -- 6
SELECT LENGTHB('Oracle') FROM DUAL;      -- 6（バイト数）
SELECT LENGTH('日本語') FROM DUAL;        -- 3
SELECT LENGTHB('日本語') FROM DUAL;       -- 9（UTF-8の場合）`,
      },
      {
        title: "数値関数",
        content:
          "数値の端数処理や数学計算に使う関数です。ROUND（四捨五入）、TRUNC（切り捨て）、CEIL/FLOOR（切り上げ・切り下げ）、MOD（剰余）は実務で頻繁に使われます。",
        code: `-- 四捨五入
SELECT ROUND(45.926, 2) FROM DUAL;     -- 45.93
SELECT ROUND(45.926, 0) FROM DUAL;     -- 46
SELECT ROUND(45.926, -1) FROM DUAL;    -- 50（10の位で丸め）

-- 切り捨て
SELECT TRUNC(45.926, 2) FROM DUAL;     -- 45.92
SELECT TRUNC(45.926) FROM DUAL;        -- 45

-- 切り上げ・切り下げ
SELECT CEIL(45.1) FROM DUAL;           -- 46
SELECT FLOOR(45.9) FROM DUAL;          -- 45

-- 剰余
SELECT MOD(10, 3) FROM DUAL;           -- 1

-- 絶対値・符号
SELECT ABS(-42) FROM DUAL;             -- 42
SELECT SIGN(-42) FROM DUAL;            -- -1

-- べき乗・平方根
SELECT POWER(2, 10) FROM DUAL;         -- 1024
SELECT SQRT(144) FROM DUAL;            -- 12

-- 実務例: 税込金額計算
SELECT product_name,
       price,
       ROUND(price * 1.10) AS "税込価格（四捨五入）",
       TRUNC(price * 1.10) AS "税込価格（切り捨て）",
       CEIL(price * 1.10)  AS "税込価格（切り上げ）"
FROM products;`,
      },
    ],
  },
  {
    id: "date-convert-func",
    title: "日付関数・変換関数",
    category: "function",
    description:
      "SYSDATE, ADD_MONTHS, MONTHS_BETWEEN などの日付関数と、TO_CHAR, TO_DATE, TO_NUMBER の変換関数を学ぶ",
    sections: [
      {
        title: "日付関数",
        content:
          "Oracle の DATE 型は日付と時刻（秒まで）を保持します。SYSDATE（現在日時）、ADD_MONTHS（月の加減算）、MONTHS_BETWEEN（月数差）、TRUNC/ROUND（日付の丸め）、NEXT_DAY/LAST_DAY（特定日の取得）など、業務処理で欠かせない日付関数を解説します。",
        code: `-- 現在日時
SELECT SYSDATE FROM DUAL;                -- 現在日時
SELECT SYSTIMESTAMP FROM DUAL;            -- 現在日時（小数秒・タイムゾーン付）

-- 日付の加減算（日数単位）
SELECT SYSDATE + 7 FROM DUAL;            -- 7日後
SELECT SYSDATE - 30 FROM DUAL;           -- 30日前
SELECT hire_date + 90 AS "試用期間終了" FROM employees;

-- 月の加減算
SELECT ADD_MONTHS(SYSDATE, 3) FROM DUAL;     -- 3か月後
SELECT ADD_MONTHS(SYSDATE, -6) FROM DUAL;    -- 6か月前

-- 月数の差
SELECT MONTHS_BETWEEN(SYSDATE, hire_date) AS "在籍月数"
FROM employees;

-- 日付の丸め
SELECT TRUNC(SYSDATE, 'MM') FROM DUAL;   -- 月初日
SELECT TRUNC(SYSDATE, 'YY') FROM DUAL;   -- 年初日
SELECT LAST_DAY(SYSDATE) FROM DUAL;       -- 月末日

-- 特定曜日
SELECT NEXT_DAY(SYSDATE, '月曜日') FROM DUAL;  -- 次の月曜日

-- 日付の差分（日数）
SELECT SYSDATE - hire_date AS "在籍日数" FROM employees;

-- 年齢計算（実務パターン）
SELECT TRUNC(MONTHS_BETWEEN(SYSDATE, birth_date) / 12) AS "年齢"
FROM members;`,
      },
      {
        title: "変換関数（TO_CHAR, TO_DATE, TO_NUMBER）",
        content:
          "変換関数は異なるデータ型間の変換を行います。TO_CHAR は日付や数値を文字列に、TO_DATE は文字列を日付に、TO_NUMBER は文字列を数値に変換します。書式モデルを正しく使うことが重要です。",
        code: `-- TO_CHAR: 日付 → 文字列
SELECT TO_CHAR(SYSDATE, 'YYYY/MM/DD') FROM DUAL;        -- '2024/03/15'
SELECT TO_CHAR(SYSDATE, 'YYYY"年"MM"月"DD"日"') FROM DUAL; -- '2024年03月15日'
SELECT TO_CHAR(SYSDATE, 'DY') FROM DUAL;                 -- '金'（曜日）
SELECT TO_CHAR(SYSDATE, 'HH24:MI:SS') FROM DUAL;         -- '14:30:00'

-- TO_CHAR: 数値 → 文字列
SELECT TO_CHAR(1234567, '9,999,999') FROM DUAL;    -- ' 1,234,567'
SELECT TO_CHAR(1234.5, '9999.00') FROM DUAL;        -- ' 1234.50'
SELECT TO_CHAR(0.75, '0.00') FROM DUAL;              -- ' 0.75'
SELECT TO_CHAR(1234567, 'L9,999,999') FROM DUAL;    -- '¥1,234,567'

-- TO_DATE: 文字列 → 日付
SELECT TO_DATE('2024/03/15', 'YYYY/MM/DD') FROM DUAL;
SELECT TO_DATE('20240315', 'YYYYMMDD') FROM DUAL;
SELECT TO_DATE('2024年3月15日', 'YYYY"年"MM"月"DD"日"') FROM DUAL;

-- TO_NUMBER: 文字列 → 数値
SELECT TO_NUMBER('1,234,567', '9,999,999') FROM DUAL;    -- 1234567
SELECT TO_NUMBER('$1,234.50', '$9,999.99') FROM DUAL;    -- 1234.5

-- 暗黙的な型変換（非推奨、明示的に変換すべき）
SELECT * FROM employees WHERE employee_id = TO_NUMBER('100');  -- 推奨`,
      },
      {
        title: "CASE式とDECODE",
        content:
          "CASE式は条件に応じた値を返す式で、SELECT句、WHERE句、ORDER BY句など様々な場所で使えます。単純CASE式と検索CASE式の2種類があります。DECODE は Oracle 固有の関数で単純な条件分岐に使えますが、CASE式のほうが標準的で柔軟性があります。",
        code: `-- 検索CASE式（一般的な条件分岐）
SELECT first_name, salary,
       CASE
           WHEN salary >= 15000 THEN 'S'
           WHEN salary >= 10000 THEN 'A'
           WHEN salary >= 5000  THEN 'B'
           ELSE 'C'
       END AS "給与ランク"
FROM employees;

-- 単純CASE式（値の比較）
SELECT employee_id, department_id,
       CASE department_id
           WHEN 10 THEN '管理部'
           WHEN 20 THEN '研究開発部'
           WHEN 60 THEN 'IT部'
           WHEN 90 THEN '経営企画部'
           ELSE 'その他'
       END AS "部門名"
FROM employees;

-- DECODE（Oracle固有、単純比較のみ）
SELECT employee_id,
       DECODE(department_id,
           10, '管理部',
           20, '研究開発部',
           60, 'IT部',
           'その他') AS "部門名"
FROM employees;

-- CASE式をORDER BYで活用
SELECT * FROM employees
ORDER BY CASE department_id
             WHEN 90 THEN 1
             WHEN 60 THEN 2
             ELSE 3
         END, salary DESC;`,
      },
    ],
  },

  // ===== PL/SQL =====
  {
    id: "plsql-basics",
    title: "PL/SQL の基礎",
    category: "plsql",
    description:
      "PL/SQLブロック構造、変数・定数・データ型、制御構文（IF, LOOP, FOR）の基本を学ぶ",
    sections: [
      {
        title: "PL/SQL ブロック構造と変数",
        content:
          "PL/SQL は Oracle の手続き型拡張言語です。DECLARE（宣言部）、BEGIN...END（実行部）、EXCEPTION（例外処理部）の3つのセクションで構成されるブロック構造を持ちます。変数には %TYPE や %ROWTYPE を使うとテーブル列の型に自動的に合わせることができ、保守性が向上します。",
        code: `-- 基本的な無名ブロック
DECLARE
    v_name    VARCHAR2(100);
    v_salary  NUMBER(10, 2);
    v_count   PLS_INTEGER := 0;
    c_tax_rate CONSTANT NUMBER := 0.10;
BEGIN
    SELECT first_name, salary
    INTO v_name, v_salary
    FROM employees
    WHERE employee_id = 100;

    DBMS_OUTPUT.PUT_LINE(v_name || 'の給与: ' || v_salary);
    DBMS_OUTPUT.PUT_LINE('税込: ' || v_salary * (1 + c_tax_rate));
END;
/

-- %TYPE: テーブル列と同じデータ型を使う
DECLARE
    v_emp_id    employees.employee_id%TYPE;
    v_name      employees.first_name%TYPE;
    v_salary    employees.salary%TYPE;
BEGIN
    SELECT employee_id, first_name, salary
    INTO v_emp_id, v_name, v_salary
    FROM employees
    WHERE employee_id = 100;

    DBMS_OUTPUT.PUT_LINE(v_emp_id || ': ' || v_name || ' (' || v_salary || ')');
END;
/

-- %ROWTYPE: テーブル行全体の型
DECLARE
    v_emp employees%ROWTYPE;
BEGIN
    SELECT * INTO v_emp FROM employees WHERE employee_id = 100;
    DBMS_OUTPUT.PUT_LINE(v_emp.first_name || ' ' || v_emp.last_name);
END;
/`,
      },
      {
        title: "制御構文（IF, CASE, LOOP）",
        content:
          "PL/SQL の制御構文は、条件分岐（IF-THEN-ELSIF-ELSE, CASE）と繰り返し（LOOP, WHILE LOOP, FOR LOOP）で構成されます。FOR LOOP はカウンタ変数の宣言が不要で簡潔に書けます。CONTINUE と EXIT でループの制御が可能です。",
        code: `-- IF-THEN-ELSIF-ELSE
DECLARE
    v_salary employees.salary%TYPE;
    v_rank   VARCHAR2(10);
BEGIN
    SELECT salary INTO v_salary
    FROM employees WHERE employee_id = 100;

    IF v_salary >= 15000 THEN
        v_rank := 'S';
    ELSIF v_salary >= 10000 THEN
        v_rank := 'A';
    ELSIF v_salary >= 5000 THEN
        v_rank := 'B';
    ELSE
        v_rank := 'C';
    END IF;

    DBMS_OUTPUT.PUT_LINE('ランク: ' || v_rank);
END;
/

-- FOR LOOP
BEGIN
    FOR i IN 1..10 LOOP
        DBMS_OUTPUT.PUT_LINE('i = ' || i);
    END LOOP;

    -- 逆順
    FOR i IN REVERSE 1..10 LOOP
        DBMS_OUTPUT.PUT_LINE('i = ' || i);
    END LOOP;
END;
/

-- WHILE LOOP
DECLARE
    v_count PLS_INTEGER := 1;
BEGIN
    WHILE v_count <= 5 LOOP
        DBMS_OUTPUT.PUT_LINE('count = ' || v_count);
        v_count := v_count + 1;
    END LOOP;
END;
/

-- EXIT と CONTINUE
BEGIN
    FOR i IN 1..100 LOOP
        CONTINUE WHEN MOD(i, 2) = 0;  -- 偶数はスキップ
        EXIT WHEN i > 20;               -- 20超で終了
        DBMS_OUTPUT.PUT_LINE('i = ' || i);
    END LOOP;
END;
/`,
      },
      {
        title: "カーソル",
        content:
          "カーソルは SELECT 文の結果セットを1行ずつ処理するための仕組みです。暗黙カーソル（単一行SELECT）と明示カーソル（複数行処理）があります。カーソル FOR LOOP を使うと OPEN/FETCH/CLOSE を自動化でき、最も簡潔に記述できます。",
        code: `-- 暗黙カーソルの属性
BEGIN
    UPDATE employees SET salary = salary * 1.1 WHERE department_id = 60;
    DBMS_OUTPUT.PUT_LINE(SQL%ROWCOUNT || '件更新しました');

    IF SQL%NOTFOUND THEN
        DBMS_OUTPUT.PUT_LINE('対象データなし');
    END IF;
    COMMIT;
END;
/

-- 明示カーソル（基本形）
DECLARE
    CURSOR c_emp IS
        SELECT employee_id, first_name, salary
        FROM employees
        WHERE department_id = 60;
    v_emp c_emp%ROWTYPE;
BEGIN
    OPEN c_emp;
    LOOP
        FETCH c_emp INTO v_emp;
        EXIT WHEN c_emp%NOTFOUND;
        DBMS_OUTPUT.PUT_LINE(v_emp.first_name || ': ' || v_emp.salary);
    END LOOP;
    CLOSE c_emp;
END;
/

-- カーソル FOR LOOP（推奨、最も簡潔）
BEGIN
    FOR rec IN (
        SELECT employee_id, first_name, salary
        FROM employees
        WHERE department_id = 60
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(rec.first_name || ': ' || rec.salary);
    END LOOP;
END;
/

-- パラメータ付きカーソル
DECLARE
    CURSOR c_emp(p_dept_id NUMBER) IS
        SELECT first_name, salary
        FROM employees
        WHERE department_id = p_dept_id;
BEGIN
    DBMS_OUTPUT.PUT_LINE('--- 部門60 ---');
    FOR rec IN c_emp(60) LOOP
        DBMS_OUTPUT.PUT_LINE(rec.first_name || ': ' || rec.salary);
    END LOOP;

    DBMS_OUTPUT.PUT_LINE('--- 部門90 ---');
    FOR rec IN c_emp(90) LOOP
        DBMS_OUTPUT.PUT_LINE(rec.first_name || ': ' || rec.salary);
    END LOOP;
END;
/`,
      },
    ],
  },
  {
    id: "plsql-exception",
    title: "例外処理",
    category: "plsql",
    description:
      "PL/SQL の例外処理機構、定義済み例外、ユーザー定義例外、RAISE_APPLICATION_ERROR を学ぶ",
    sections: [
      {
        title: "例外処理の基本",
        content:
          "PL/SQL の例外処理は EXCEPTION セクションで行います。代表的な定義済み例外には NO_DATA_FOUND（データなし）、TOO_MANY_ROWS（複数行返却）、DUP_VAL_ON_INDEX（一意制約違反）、ZERO_DIVIDE（ゼロ除算）などがあります。WHEN OTHERS はすべての例外をキャッチしますが、最後に記述する必要があります。",
        code: `-- 基本的な例外処理
DECLARE
    v_name employees.first_name%TYPE;
BEGIN
    SELECT first_name INTO v_name
    FROM employees
    WHERE employee_id = 99999;  -- 存在しないID

    DBMS_OUTPUT.PUT_LINE('名前: ' || v_name);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('社員が見つかりません');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('複数の社員が該当しました');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('エラー: ' || SQLCODE || ' - ' || SQLERRM);
END;
/

-- 一意制約違反のハンドリング
BEGIN
    INSERT INTO departments (department_id, department_name)
    VALUES (10, 'テスト部');
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('部門IDが重複しています');
END;
/`,
      },
      {
        title: "ユーザー定義例外と RAISE",
        content:
          "ビジネスロジックに固有のエラー条件を表現するために、ユーザー定義例外を宣言して RAISE で発生させることができます。RAISE_APPLICATION_ERROR はクライアントにカスタムエラーを返すための手続きで、エラー番号（-20000 から -20999）とメッセージを指定します。",
        code: `-- ユーザー定義例外
DECLARE
    e_salary_too_high EXCEPTION;
    v_salary employees.salary%TYPE;
    c_max_salary CONSTANT NUMBER := 50000;
BEGIN
    SELECT salary INTO v_salary
    FROM employees WHERE employee_id = 100;

    IF v_salary > c_max_salary THEN
        RAISE e_salary_too_high;
    END IF;

    DBMS_OUTPUT.PUT_LINE('給与: ' || v_salary);
EXCEPTION
    WHEN e_salary_too_high THEN
        DBMS_OUTPUT.PUT_LINE('給与が上限を超えています: ' || v_salary);
END;
/

-- RAISE_APPLICATION_ERROR（クライアントにエラーを返す）
CREATE OR REPLACE PROCEDURE update_salary(
    p_emp_id  IN NUMBER,
    p_new_salary IN NUMBER
) AS
    v_current_salary employees.salary%TYPE;
BEGIN
    SELECT salary INTO v_current_salary
    FROM employees WHERE employee_id = p_emp_id;

    IF p_new_salary < 0 THEN
        RAISE_APPLICATION_ERROR(-20001, '給与は0以上でなければなりません');
    END IF;

    IF p_new_salary > v_current_salary * 2 THEN
        RAISE_APPLICATION_ERROR(-20002, '一度に2倍を超える昇給はできません');
    END IF;

    UPDATE employees SET salary = p_new_salary WHERE employee_id = p_emp_id;
    COMMIT;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RAISE_APPLICATION_ERROR(-20003, '社員ID ' || p_emp_id || ' は存在しません');
END;
/`,
      },
      {
        title: "PRAGMA EXCEPTION_INIT とログ記録",
        content:
          "PRAGMA EXCEPTION_INIT を使うと Oracle のエラー番号にユーザー定義例外を紐付けることができます。本番環境では例外をログテーブルに記録する仕組みを整備しておくことが重要です。",
        code: `-- PRAGMA EXCEPTION_INIT: Oracleエラー番号と紐付け
DECLARE
    e_child_record_found EXCEPTION;
    PRAGMA EXCEPTION_INIT(e_child_record_found, -2292);
    -- ORA-02292: 子レコードがあるため削除不可
BEGIN
    DELETE FROM departments WHERE department_id = 60;
EXCEPTION
    WHEN e_child_record_found THEN
        DBMS_OUTPUT.PUT_LINE('この部門には社員が所属しているため削除できません');
END;
/

-- エラーログテーブルへの記録パターン
CREATE TABLE error_log (
    log_id      NUMBER GENERATED ALWAYS AS IDENTITY,
    error_date  TIMESTAMP DEFAULT SYSTIMESTAMP,
    error_code  NUMBER,
    error_msg   VARCHAR2(4000),
    proc_name   VARCHAR2(200),
    remarks     VARCHAR2(4000)
);

CREATE OR REPLACE PROCEDURE log_error(
    p_proc_name IN VARCHAR2,
    p_remarks   IN VARCHAR2 DEFAULT NULL
) AS
    PRAGMA AUTONOMOUS_TRANSACTION;  -- 独立トランザクション
BEGIN
    INSERT INTO error_log (error_code, error_msg, proc_name, remarks)
    VALUES (SQLCODE, SQLERRM, p_proc_name, p_remarks);
    COMMIT;
END;
/

-- 使用例
BEGIN
    -- 何らかの処理
    NULL;
EXCEPTION
    WHEN OTHERS THEN
        log_error('BATCH_PROCESS', 'バッチ処理中のエラー');
        RAISE;  -- 例外を再送出
END;
/`,
      },
    ],
  },
  {
    id: "plsql-procedure-package",
    title: "プロシージャ・ファンクション・パッケージ",
    category: "plsql",
    description:
      "ストアドプロシージャ、ファンクション、パッケージによるPL/SQLプログラムのモジュール化を学ぶ",
    sections: [
      {
        title: "ストアドプロシージャ",
        content:
          "ストアドプロシージャはデータベースに保存される名前付きPL/SQLブロックです。IN（入力）、OUT（出力）、IN OUT（入出力）パラメータを持つことができます。ビジネスロジックをデータベース側に集約でき、ネットワーク通信の削減やセキュリティ向上に寄与します。",
        code: `-- 基本的なプロシージャ
CREATE OR REPLACE PROCEDURE raise_salary(
    p_emp_id    IN  employees.employee_id%TYPE,
    p_percent   IN  NUMBER,
    p_new_salary OUT employees.salary%TYPE
) AS
BEGIN
    UPDATE employees
    SET salary = salary * (1 + p_percent / 100)
    WHERE employee_id = p_emp_id
    RETURNING salary INTO p_new_salary;

    IF SQL%ROWCOUNT = 0 THEN
        RAISE_APPLICATION_ERROR(-20001, '社員が見つかりません');
    END IF;

    COMMIT;
END raise_salary;
/

-- プロシージャの呼び出し
DECLARE
    v_new_salary NUMBER;
BEGIN
    raise_salary(100, 10, v_new_salary);
    DBMS_OUTPUT.PUT_LINE('新しい給与: ' || v_new_salary);
END;
/

-- デフォルト値付きパラメータ
CREATE OR REPLACE PROCEDURE add_employee(
    p_first_name IN VARCHAR2,
    p_last_name  IN VARCHAR2,
    p_email      IN VARCHAR2,
    p_job_id     IN VARCHAR2 DEFAULT 'IT_PROG',
    p_dept_id    IN NUMBER   DEFAULT 60
) AS
BEGIN
    INSERT INTO employees (employee_id, first_name, last_name, email,
                           hire_date, job_id, department_id)
    VALUES (emp_seq.NEXTVAL, p_first_name, p_last_name, p_email,
            SYSDATE, p_job_id, p_dept_id);
    COMMIT;
END;
/

-- 名前付きパラメータで呼び出し
BEGIN
    add_employee(
        p_first_name => '太郎',
        p_last_name  => '山田',
        p_email      => 'tyamada'
    );
END;
/`,
      },
      {
        title: "ファンクション",
        content:
          "ファンクションは値を返すサブプログラムです。プロシージャと異なり RETURN 句で戻り値の型を指定し、SQL 文の中でも呼び出せます。ただし SQL 内で使用する場合はDML を含まないなどの制約があります。",
        code: `-- 基本的なファンクション
CREATE OR REPLACE FUNCTION get_annual_salary(
    p_emp_id IN employees.employee_id%TYPE
) RETURN NUMBER AS
    v_salary employees.salary%TYPE;
BEGIN
    SELECT salary * 12 + salary * 12 * NVL(commission_pct, 0)
    INTO v_salary
    FROM employees
    WHERE employee_id = p_emp_id;

    RETURN v_salary;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL;
END get_annual_salary;
/

-- SQL文内での使用
SELECT employee_id, first_name,
       get_annual_salary(employee_id) AS "年収"
FROM employees
WHERE department_id = 60;

-- テーブル関数（パイプライン関数）
CREATE OR REPLACE TYPE emp_summary_type AS OBJECT (
    department_name VARCHAR2(100),
    emp_count       NUMBER,
    avg_salary      NUMBER
);
/
CREATE OR REPLACE TYPE emp_summary_table AS TABLE OF emp_summary_type;
/

CREATE OR REPLACE FUNCTION get_dept_summary
RETURN emp_summary_table PIPELINED AS
BEGIN
    FOR rec IN (
        SELECT d.department_name,
               COUNT(*) AS emp_count,
               ROUND(AVG(e.salary), 2) AS avg_salary
        FROM employees e
        INNER JOIN departments d ON e.department_id = d.department_id
        GROUP BY d.department_name
    ) LOOP
        PIPE ROW(emp_summary_type(rec.department_name, rec.emp_count, rec.avg_salary));
    END LOOP;
    RETURN;
END;
/

-- パイプライン関数の使用
SELECT * FROM TABLE(get_dept_summary()) ORDER BY avg_salary DESC;`,
      },
      {
        title: "パッケージ",
        content:
          "パッケージは関連するプロシージャ、ファンクション、変数、型をグループ化するための仕組みです。仕様部（SPECIFICATION）でインターフェースを公開し、本体（BODY）に実装を記述します。パッケージ変数はセッション中保持されるため、状態管理にも利用できます。",
        code: `-- パッケージ仕様部
CREATE OR REPLACE PACKAGE emp_pkg AS
    -- 定数
    c_max_salary CONSTANT NUMBER := 100000;

    -- プロシージャ
    PROCEDURE hire_employee(
        p_first_name IN VARCHAR2,
        p_last_name  IN VARCHAR2,
        p_email      IN VARCHAR2,
        p_job_id     IN VARCHAR2,
        p_dept_id    IN NUMBER
    );

    -- ファンクション
    FUNCTION get_dept_count(p_dept_id IN NUMBER) RETURN NUMBER;

    -- カーソル型
    TYPE emp_cursor_type IS REF CURSOR;
    PROCEDURE get_employees_by_dept(
        p_dept_id IN  NUMBER,
        p_cursor  OUT emp_cursor_type
    );
END emp_pkg;
/

-- パッケージ本体
CREATE OR REPLACE PACKAGE BODY emp_pkg AS

    -- プライベート変数（パッケージ外からアクセス不可）
    g_hire_count PLS_INTEGER := 0;

    PROCEDURE hire_employee(
        p_first_name IN VARCHAR2,
        p_last_name  IN VARCHAR2,
        p_email      IN VARCHAR2,
        p_job_id     IN VARCHAR2,
        p_dept_id    IN NUMBER
    ) AS
    BEGIN
        INSERT INTO employees (
            employee_id, first_name, last_name, email,
            hire_date, job_id, department_id
        ) VALUES (
            emp_seq.NEXTVAL, p_first_name, p_last_name, p_email,
            SYSDATE, p_job_id, p_dept_id
        );
        g_hire_count := g_hire_count + 1;
        COMMIT;
    END hire_employee;

    FUNCTION get_dept_count(p_dept_id IN NUMBER) RETURN NUMBER AS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_count
        FROM employees WHERE department_id = p_dept_id;
        RETURN v_count;
    END get_dept_count;

    PROCEDURE get_employees_by_dept(
        p_dept_id IN  NUMBER,
        p_cursor  OUT emp_cursor_type
    ) AS
    BEGIN
        OPEN p_cursor FOR
            SELECT employee_id, first_name, last_name, salary
            FROM employees
            WHERE department_id = p_dept_id
            ORDER BY salary DESC;
    END get_employees_by_dept;

END emp_pkg;
/

-- パッケージの使用
BEGIN
    emp_pkg.hire_employee('次郎', '田中', 'jtanaka', 'IT_PROG', 60);
    DBMS_OUTPUT.PUT_LINE('IT部の人数: ' || emp_pkg.get_dept_count(60));
END;
/`,
      },
    ],
  },

  // ===== パフォーマンス =====
  {
    id: "execution-plan",
    title: "実行計画の読み方",
    category: "performance",
    description:
      "EXPLAIN PLAN、DBMS_XPLAN によるSQL実行計画の取得方法と、コスト・行数・アクセスパスの読み方を学ぶ",
    sections: [
      {
        title: "実行計画の取得方法",
        content:
          "実行計画はOracle がSQLを実行する際の処理手順です。EXPLAIN PLAN FOR で計画を取得し、DBMS_XPLAN.DISPLAY で表示します。AUTOTRACE や SQL Developer のGUI でも確認できます。SQLのパフォーマンス問題を解決するために、まず実行計画を読む能力が不可欠です。",
        code: `-- EXPLAIN PLAN で実行計画を取得
EXPLAIN PLAN FOR
SELECT e.first_name, e.salary, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 10000;

-- 実行計画の表示
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

-- 実行後の実際の統計情報も含めて表示
SELECT /*+ GATHER_PLAN_STATISTICS */ e.first_name, e.salary
FROM employees e
WHERE e.salary > 10000;

SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(NULL, NULL, 'ALLSTATS LAST'));

-- SQL*Plus の AUTOTRACE
-- SET AUTOTRACE ON          -- 結果 + 実行計画 + 統計
-- SET AUTOTRACE ON EXPLAIN  -- 結果 + 実行計画
-- SET AUTOTRACE TRACEONLY   -- 実行計画 + 統計のみ`,
      },
      {
        title: "実行計画の読み方",
        content:
          "実行計画は木構造（ツリー）で表現され、インデントが深い行から順に実行されます。主要なアクセスパスには TABLE ACCESS FULL（全件走査）、INDEX RANGE SCAN（インデックス範囲検索）、INDEX UNIQUE SCAN（一意検索）があります。Cost（コスト）、Rows（推定行数）、Bytes を見てボトルネックを特定します。",
        code: `-- 実行計画の例と読み方
/*
---------------------------------------------------------------
| Id  | Operation                    | Name        | Rows | Cost|
---------------------------------------------------------------
|   0 | SELECT STATEMENT             |             |    5 |   4 |
|*  1 |  HASH JOIN                   |             |    5 |   4 |
|*  2 |   TABLE ACCESS FULL          | EMPLOYEES   |    5 |   3 |
|   3 |   TABLE ACCESS FULL          | DEPARTMENTS |   27 |   1 |
---------------------------------------------------------------
Predicate Information:
  1 - access("E"."DEPARTMENT_ID"="D"."DEPARTMENT_ID")
  2 - filter("E"."SALARY">10000)
*/

-- 読み方のポイント:
-- 1. インデントが深い行（Id=2,3）から先に実行される
-- 2. TABLE ACCESS FULL = テーブル全件走査（大きいテーブルでは要注意）
-- 3. HASH JOIN = ハッシュ結合（大量データの結合に効率的）
-- 4. * マークは WHERE 条件（Predicate）が適用される行
-- 5. Rows は推定行数、実際と大きく異なる場合は統計情報の更新が必要

-- 統計情報の更新
BEGIN
    DBMS_STATS.GATHER_TABLE_STATS(
        ownname => USER,
        tabname => 'EMPLOYEES',
        estimate_percent => DBMS_STATS.AUTO_SAMPLE_SIZE
    );
END;
/`,
      },
      {
        title: "主要なアクセスパスと結合方式",
        content:
          "Oracle のオプティマイザが選択する代表的なアクセスパスと結合方式を理解しましょう。テーブルアクセス（FULL / BY INDEX ROWID）、インデックスアクセス（UNIQUE SCAN / RANGE SCAN / FULL SCAN / SKIP SCAN）、結合方式（NESTED LOOPS / HASH JOIN / SORT MERGE JOIN）の特徴を知ることで、適切なチューニング方針を立てられます。",
        code: `-- アクセスパスの比較

-- INDEX UNIQUE SCAN: 主キーや一意インデックスで1行を特定
SELECT * FROM employees WHERE employee_id = 100;

-- INDEX RANGE SCAN: 範囲条件でインデックスを使用
SELECT * FROM employees WHERE department_id = 60;

-- TABLE ACCESS FULL: インデックスがない、または使えない場合
SELECT * FROM employees WHERE salary * 12 > 100000;
-- 列に関数を適用するとインデックスが使えない

-- 結合方式の特徴:
-- NESTED LOOPS: 少量データ同士の結合、インデックスが効く場合に最速
-- HASH JOIN: 大量データ同士の結合、等価結合で効率的
-- SORT MERGE JOIN: ソート済みデータや非等価結合で使用

-- ヒント句で結合方式を強制（チューニング時）
SELECT /*+ USE_NL(e d) */
       e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

SELECT /*+ USE_HASH(e d) */
       e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;`,
      },
    ],
  },
  {
    id: "sql-tuning",
    title: "SQL チューニングの実践",
    category: "performance",
    description:
      "インデックス設計、ヒント句、よくあるパフォーマンス問題のパターンと対策を学ぶ",
    sections: [
      {
        title: "インデックス設計のベストプラクティス",
        content:
          "インデックスはSQLパフォーマンスに最も大きな影響を与える要素です。WHERE句やJOIN条件で使われる列、カーディナリティ（値の種類数）が高い列にインデックスを作成します。複合インデックスではカーディナリティが高い列を先頭に配置し、カバリングインデックスによりテーブルアクセスを省略できる場合もあります。",
        code: `-- 効果的なインデックス設計

-- 1. 単一列インデックス: 頻繁にWHEREで使われる列
CREATE INDEX idx_emp_dept ON employees(department_id);

-- 2. 複合インデックス: 複数条件の検索に対応
CREATE INDEX idx_emp_dept_job ON employees(department_id, job_id);

-- 3. カバリングインデックス: テーブルアクセス不要
CREATE INDEX idx_emp_dept_sal ON employees(department_id, salary);

-- 4. 関数ベースインデックス
CREATE INDEX idx_emp_upper_name ON employees(UPPER(last_name));

-- インデックスが使われない主なケース:
-- (a) 列に関数を適用
SELECT * FROM employees WHERE UPPER(last_name) = 'KING';

-- (b) 暗黙の型変換
SELECT * FROM employees WHERE employee_id = '100';

-- (c) NOT条件、IS NULL（B-treeインデックスの場合）
SELECT * FROM employees WHERE department_id IS NULL;

-- (d) LIKE の前方ワイルドカード
SELECT * FROM employees WHERE last_name LIKE '%ing';`,
      },
      {
        title: "ヒント句の活用",
        content:
          "ヒント句はオプティマイザに実行計画の指示を与えるコメント形式の記法です。通常はオプティマイザの判断に任せるべきですが、統計情報が不正確な場合や特定のパフォーマンス問題を解決する場合に有効です。使用する場合は理由をコメントで残しましょう。",
        code: `-- 主要なヒント句

-- FULL: 全表スキャンを強制
SELECT /*+ FULL(e) */ * FROM employees e WHERE department_id = 60;

-- INDEX: 特定のインデックスの使用を指示
SELECT /*+ INDEX(e idx_emp_dept) */
       * FROM employees e WHERE department_id = 60;

-- PARALLEL: パラレル実行（大量データ処理の高速化）
SELECT /*+ PARALLEL(e, 4) */ COUNT(*) FROM large_table e;

-- LEADING: 結合順序の指定
SELECT /*+ LEADING(d e) */
       e.first_name, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- NO_MERGE: ビューやサブクエリのマージを抑止
SELECT /*+ NO_MERGE(v) */
       v.department_name, v.avg_salary
FROM (
    SELECT d.department_name, AVG(e.salary) AS avg_salary
    FROM employees e
    JOIN departments d ON e.department_id = d.department_id
    GROUP BY d.department_name
) v
WHERE v.avg_salary > 10000;

-- FIRST_ROWS: 最初のn行を素早く返すことを優先
SELECT /*+ FIRST_ROWS(10) */
       * FROM employees ORDER BY salary DESC;`,
      },
      {
        title: "よくあるパフォーマンス問題と対策",
        content:
          "SQLパフォーマンス問題にはパターンがあります。代表的な問題として、不要な全表スキャン、N+1問題、暗黙の型変換、SELECT * の多用、大量データの不要なソートなどがあります。それぞれの原因と対策を理解しておきましょう。",
        code: `-- 問題1: SELECT * による不要なデータ取得
-- BAD
SELECT * FROM employees WHERE department_id = 60;
-- GOOD（必要な列だけ取得）
SELECT employee_id, first_name, last_name FROM employees WHERE department_id = 60;

-- 問題2: WHERE句での関数適用（インデックス無効化）
-- BAD
SELECT * FROM orders WHERE TO_CHAR(order_date, 'YYYY') = '2024';
-- GOOD（範囲指定に書き換え）
SELECT * FROM orders
WHERE order_date >= DATE '2024-01-01'
  AND order_date < DATE '2025-01-01';

-- 問題3: IN句のサブクエリ → EXISTS に書き換え
-- BAD（大量データでは遅い場合がある）
SELECT * FROM departments
WHERE department_id IN (SELECT department_id FROM employees WHERE salary > 10000);
-- GOOD
SELECT * FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e
    WHERE e.department_id = d.department_id AND e.salary > 10000
);

-- 問題4: UNION → UNION ALL（重複排除不要なら）
-- BAD（暗黙のソートが発生）
SELECT first_name FROM employees WHERE department_id = 60
UNION
SELECT first_name FROM employees WHERE department_id = 90;
-- GOOD（ソート不要、高速）
SELECT first_name FROM employees WHERE department_id = 60
UNION ALL
SELECT first_name FROM employees WHERE department_id = 90;

-- 問題5: バインド変数の使用（ハードパース回避）
DECLARE
    v_id NUMBER := 100;
BEGIN
    FOR rec IN (
        SELECT first_name, salary FROM employees WHERE employee_id = v_id
    ) LOOP
        DBMS_OUTPUT.PUT_LINE(rec.first_name);
    END LOOP;
END;
/`,
      },
    ],
  },

  // ===== 管理・運用 =====
  {
    id: "user-privilege",
    title: "ユーザー管理と権限",
    category: "admin",
    description:
      "ユーザーの作成・管理、システム権限・オブジェクト権限、ロールによるアクセス制御を学ぶ",
    sections: [
      {
        title: "ユーザーの作成と管理",
        content:
          "Oracle のユーザー（スキーマ）はデータベースオブジェクトの所有者です。ユーザーを作成し、表領域の割り当てやパスワードポリシーを設定します。マルチテナント環境（CDB/PDB）ではコンテナごとにユーザーが管理されます。",
        code: `-- ユーザーの作成
CREATE USER app_user
IDENTIFIED BY "SecurePass123!"
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 100M ON users;

-- パスワード変更
ALTER USER app_user IDENTIFIED BY "NewPass456!";

-- アカウントのロック / アンロック
ALTER USER app_user ACCOUNT LOCK;
ALTER USER app_user ACCOUNT UNLOCK;

-- 表領域の割当量変更
ALTER USER app_user QUOTA UNLIMITED ON users;

-- ユーザーの削除（所有オブジェクトも削除）
DROP USER app_user CASCADE;

-- ユーザー情報の確認
SELECT username, account_status, default_tablespace,
       created, expiry_date
FROM dba_users
WHERE username = 'APP_USER';`,
      },
      {
        title: "権限の付与（GRANT / REVOKE）",
        content:
          "Oracle の権限にはシステム権限（CREATE TABLE, CREATE SESSIONなど）とオブジェクト権限（SELECT, INSERT, UPDATEなど）があります。GRANT で付与し、REVOKE で取り消します。WITH ADMIN OPTION/WITH GRANT OPTION で他者への権限付与権も委譲できます。",
        code: `-- システム権限の付与
GRANT CREATE SESSION TO app_user;          -- ログイン権限
GRANT CREATE TABLE TO app_user;            -- テーブル作成権限
GRANT CREATE VIEW TO app_user;             -- ビュー作成権限
GRANT CREATE PROCEDURE TO app_user;        -- プロシージャ作成権限
GRANT CREATE SEQUENCE TO app_user;         -- シーケンス作成権限

-- オブジェクト権限の付与
GRANT SELECT ON hr.employees TO app_user;
GRANT SELECT, INSERT, UPDATE ON hr.departments TO app_user;
GRANT EXECUTE ON hr.emp_pkg TO app_user;

-- 列レベルの権限
GRANT UPDATE (salary, commission_pct) ON hr.employees TO app_user;

-- 権限の取り消し
REVOKE SELECT ON hr.employees FROM app_user;
REVOKE CREATE TABLE FROM app_user;

-- 付与された権限の確認
SELECT * FROM dba_sys_privs WHERE grantee = 'APP_USER';
SELECT * FROM dba_tab_privs WHERE grantee = 'APP_USER';`,
      },
      {
        title: "ロールによるアクセス制御",
        content:
          "ロールは権限の集合に名前を付けたもので、複数のユーザーに同じ権限セットを効率的に付与できます。Oracle には事前定義ロール（CONNECT, RESOURCE, DBA等）がありますが、実務ではアプリケーション固有のカスタムロールを作成して使うのが推奨されます。",
        code: `-- カスタムロールの作成
CREATE ROLE app_readonly;
CREATE ROLE app_readwrite;
CREATE ROLE app_admin;

-- ロールに権限を付与
GRANT SELECT ON hr.employees TO app_readonly;
GRANT SELECT ON hr.departments TO app_readonly;
GRANT SELECT ON hr.jobs TO app_readonly;

GRANT app_readonly TO app_readwrite;  -- ロールの継承
GRANT INSERT, UPDATE, DELETE ON hr.employees TO app_readwrite;
GRANT INSERT, UPDATE, DELETE ON hr.departments TO app_readwrite;

GRANT app_readwrite TO app_admin;     -- ロールの継承
GRANT CREATE TABLE, CREATE VIEW, CREATE PROCEDURE TO app_admin;

-- ユーザーにロールを付与
GRANT app_readonly TO report_user;
GRANT app_readwrite TO app_user;
GRANT app_admin TO admin_user;

-- デフォルトロールの設定
ALTER USER app_user DEFAULT ROLE app_readonly;

-- ロール情報の確認
SELECT * FROM dba_role_privs WHERE grantee = 'APP_USER';
SELECT * FROM role_sys_privs WHERE role = 'APP_READWRITE';
SELECT * FROM role_tab_privs WHERE role = 'APP_READONLY';`,
      },
    ],
  },
  {
    id: "backup-tablespace",
    title: "バックアップ・表領域・運用管理",
    category: "admin",
    description:
      "表領域の管理、Data Pump によるエクスポート/インポート、基本的な運用管理タスクを学ぶ",
    sections: [
      {
        title: "表領域（テーブルスペース）の管理",
        content:
          "表領域はデータファイルの論理的なグループで、テーブルやインデックスなどのデータを物理的に格納する場所です。適切な表領域設計はパフォーマンスと運用の基盤となります。表領域の容量監視と拡張は重要な運用タスクです。",
        code: `-- 表領域の作成
CREATE TABLESPACE app_data
DATAFILE '/u01/oradata/mydb/app_data01.dbf'
SIZE 500M
AUTOEXTEND ON NEXT 100M MAXSIZE 10G;

-- 表領域にデータファイルを追加
ALTER TABLESPACE app_data
ADD DATAFILE '/u01/oradata/mydb/app_data02.dbf'
SIZE 500M AUTOEXTEND ON;

-- 一時表領域の作成
CREATE TEMPORARY TABLESPACE app_temp
TEMPFILE '/u01/oradata/mydb/app_temp01.dbf'
SIZE 200M AUTOEXTEND ON;

-- 表領域の使用状況確認
SELECT tablespace_name,
       ROUND(used_space * 8192 / 1024 / 1024) AS "使用量(MB)",
       ROUND(tablespace_size * 8192 / 1024 / 1024) AS "合計(MB)",
       ROUND(used_percent, 1) AS "使用率(%)"
FROM dba_tablespace_usage_metrics
ORDER BY used_percent DESC;

-- オブジェクトごとのサイズ確認
SELECT segment_name, segment_type,
       ROUND(bytes / 1024 / 1024, 1) AS "サイズ(MB)"
FROM user_segments
ORDER BY bytes DESC
FETCH FIRST 20 ROWS ONLY;`,
      },
      {
        title: "Data Pump（エクスポート/インポート）",
        content:
          "Data Pump はOracle のデータ移行・バックアップツールです。expdp（エクスポート）でデータベースオブジェクトやデータをダンプファイルに出力し、impdp（インポート）で読み込みます。従来のexp/impよりも高速で、パラレル実行やフィルタリングなど高度な機能を備えています。",
        code: `-- ディレクトリオブジェクトの作成（ダンプファイルの保存先）
CREATE OR REPLACE DIRECTORY dp_dir AS '/u01/backup/datapump';
GRANT READ, WRITE ON DIRECTORY dp_dir TO app_user;

-- expdp: スキーマ全体のエクスポート（OSコマンドライン）
-- expdp app_user/password@mydb \\
--   DIRECTORY=dp_dir \\
--   DUMPFILE=app_user_%U.dmp \\
--   LOGFILE=exp_app_user.log \\
--   SCHEMAS=app_user \\
--   PARALLEL=4

-- expdp: 特定テーブルのエクスポート
-- expdp app_user/password@mydb \\
--   DIRECTORY=dp_dir \\
--   DUMPFILE=employees.dmp \\
--   TABLES=employees,departments

-- expdp: 条件付きエクスポート
-- expdp app_user/password@mydb \\
--   DIRECTORY=dp_dir \\
--   DUMPFILE=emp_2024.dmp \\
--   TABLES=employees \\
--   QUERY="WHERE hire_date >= DATE '2024-01-01'"

-- impdp: スキーマのインポート
-- impdp app_user/password@mydb \\
--   DIRECTORY=dp_dir \\
--   DUMPFILE=app_user_%U.dmp \\
--   SCHEMAS=app_user \\
--   TABLE_EXISTS_ACTION=REPLACE

-- TABLE_EXISTS_ACTION オプション:
-- SKIP:    テーブルが存在する場合はスキップ
-- APPEND:  既存データに追記
-- REPLACE: テーブルを削除して再作成
-- TRUNCATE: 既存データを削除してからインポート`,
      },
      {
        title: "データディクショナリと監視",
        content:
          "データディクショナリはOracle のメタデータを格納するシステムテーブル群です。DBA_*, ALL_*, USER_* のプレフィックスで参照でき、テーブル定義、インデックス、権限、セッション情報などあらゆるメタ情報を確認できます。日常の運用監視に欠かせないビューを紹介します。",
        code: `-- テーブル一覧
SELECT table_name, num_rows, last_analyzed
FROM user_tables ORDER BY table_name;

-- テーブルの列定義
SELECT column_name, data_type, data_length, nullable
FROM user_tab_columns
WHERE table_name = 'EMPLOYEES'
ORDER BY column_id;

-- 制約一覧
SELECT constraint_name, constraint_type, status
FROM user_constraints
WHERE table_name = 'EMPLOYEES';

-- 現在のセッション情報
SELECT sid, serial#, username, status, program,
       sql_id, last_call_et AS "経過秒数"
FROM v$session
WHERE type = 'USER' AND username IS NOT NULL;

-- ロック待ちの検出
SELECT l.session_id AS "待ちセッション",
       l.oracle_username AS "待ちユーザー",
       o.object_name AS "対象オブジェクト",
       l.locked_mode
FROM v$locked_object l
INNER JOIN dba_objects o ON l.object_id = o.object_id;

-- アクティブSQLの確認
SELECT s.sid, s.serial#, s.username,
       q.sql_text,
       s.last_call_et AS "実行秒数"
FROM v$session s
INNER JOIN v$sql q ON s.sql_id = q.sql_id
WHERE s.status = 'ACTIVE' AND s.username IS NOT NULL;

-- 領域使用量の監視
SELECT tablespace_name,
       ROUND(SUM(bytes) / 1024 / 1024) AS "割当(MB)",
       ROUND(SUM(maxbytes) / 1024 / 1024) AS "最大(MB)"
FROM dba_data_files
GROUP BY tablespace_name;`,
      },
    ],
  },

  // ===== SQL*Plus =====
  {
    id: "sqlplus-basics",
    title: "SQL*Plus の基本操作",
    category: "sqlplus",
    description:
      "SQL*Plus の起動・接続、基本コマンド、画面表示の設定、スクリプト実行の基礎を学ぶ",
    sections: [
      {
        title: "接続と基本コマンド",
        content:
          "SQL*Plus は Oracle Database に付属する標準のコマンドラインツールです。SQL文や PL/SQL ブロックの実行、データベースの管理操作に使用します。CONNECT コマンドで接続先を切り替え、SHOW でセッション情報を確認、DESCRIBE でオブジェクトの構造を表示できます。HELP コマンドで SQL*Plus コマンドのヘルプを参照できます。",
        code: `-- SQL*Plus の起動（OS コマンドライン）
sqlplus username/password@hostname:1521/service_name
sqlplus username/password@tnsname
sqlplus / as sysdba          -- OS 認証で SYSDBA 接続

-- 接続（SQL*Plus 内から）
CONNECT scott/tiger@orcl
CONNECT / AS SYSDBA

-- セッション情報の表示
SHOW USER               -- 現在のユーザー
SHOW CON_NAME           -- 現在のコンテナ（CDB/PDB）
SHOW PARAMETER db_name  -- 初期化パラメータ表示
SHOW ERRORS             -- 直前のコンパイルエラー表示
SHOW RELEASE            -- SQL*Plus のバージョン

-- テーブル構造の確認
DESCRIBE employees
DESC departments

-- SQL*Plus ヘルプ
HELP INDEX              -- コマンド一覧
HELP SET                -- SET コマンドのヘルプ

-- 直前の SQL を再実行 / 編集
RUN                     -- バッファ内の SQL を表示して実行（= /）
LIST                    -- バッファ内容を表示
EDIT                    -- 外部エディタで SQL を編集

-- SQL*Plus の終了
EXIT
QUIT`,
      },
      {
        title: "表示設定",
        content:
          "SQL*Plus の出力はデフォルトでは見づらいことがあります。SET コマンドで行幅・ページサイズ・フォーマットを調整し、COLUMN コマンドで列ごとの書式を設定することで、読みやすい出力が得られます。これらの設定はセッション中のみ有効ですが、login.sql に記述すれば起動時に自動適用されます。",
        code: `-- 行の幅とページサイズ
SET LINESIZE 200         -- 1行の最大文字数
SET PAGESIZE 50          -- ヘッダー再表示までの行数
SET PAGESIZE 0           -- ヘッダーなし（データのみ出力）

-- 表示関連の SET 設定
SET NUMWIDTH 12          -- 数値列のデフォルト幅
SET NULL '(null)'        -- NULL の表示文字列
SET FEEDBACK OFF         -- 「○行が選択されました」を非表示
SET HEADING OFF          -- 列ヘッダーを非表示
SET ECHO ON              -- 実行する SQL 文を表示
SET VERIFY OFF           -- 置換変数の新旧値表示を抑制
SET TIMING ON            -- 実行時間を表示
SET SERVEROUTPUT ON      -- DBMS_OUTPUT を表示

-- COLUMN コマンドで列の書式を設定
COLUMN employee_id   FORMAT 9999        HEADING '社員ID'
COLUMN first_name    FORMAT A15         HEADING '名'
COLUMN last_name     FORMAT A15         HEADING '姓'
COLUMN salary        FORMAT 999,999,999 HEADING '給与'
COLUMN hire_date     FORMAT A12         HEADING '入社日'

-- 設定の確認とクリア
COLUMN employee_id   -- 現在の書式を確認
COLUMN employee_id CLEAR  -- 書式をクリア
CLEAR COLUMNS            -- 全列の書式をクリア

-- クエリ実行（書式設定が適用される）
SELECT employee_id, first_name, last_name, salary, hire_date
FROM employees
WHERE department_id = 50;`,
      },
      {
        title: "スクリプト実行とスプール",
        content:
          "SQL*Plus では SQL スクリプトファイル（.sql）を読み込んで実行できます。@ または START コマンドでスクリプトを実行し、SPOOL コマンドで出力結果をファイルに保存します。DEFINE でユーザー変数を定義し、ACCEPT でユーザーからの入力を受け取ることもできます。",
        code: `-- スクリプトの実行
@script.sql              -- カレントディレクトリの script.sql を実行
@/home/oracle/scripts/report.sql  -- 絶対パス指定
START script.sql         -- @ と同じ
@@sub_script.sql         -- 呼び出し元と同じディレクトリから実行

-- スクリプトに引数を渡す
-- report.sql の中で &1, &2 として参照可能
@report.sql 50 2024

-- スプール（出力のファイル保存）
SPOOL /tmp/report.txt          -- スプール開始
SELECT employee_id, first_name, salary FROM employees;
SPOOL OFF                      -- スプール終了

SPOOL /tmp/report.csv REPLACE  -- 上書きモード
SPOOL /tmp/report.txt APPEND   -- 追記モード

-- CSV 出力の例
SET MARKUP CSV ON DELIMITER ',' QUOTE ON
SPOOL /tmp/employees.csv
SELECT employee_id, first_name, last_name, salary FROM employees;
SPOOL OFF
SET MARKUP CSV OFF

-- DEFINE / UNDEFINE（ユーザー変数）
DEFINE dept_id = 50
SELECT * FROM employees WHERE department_id = &dept_id;
UNDEFINE dept_id

-- ACCEPT（対話的な入力）
ACCEPT v_dept NUMBER PROMPT '部門IDを入力: '
ACCEPT v_name CHAR PROMPT '名前を入力: ' DEFAULT 'Smith'
SELECT * FROM employees
WHERE department_id = &v_dept OR last_name = '&v_name';`,
      },
    ],
  },
  {
    id: "sqlplus-advanced",
    title: "SQL*Plus の実践テクニック",
    category: "sqlplus",
    description:
      "変数の活用、レポート作成、バッチ処理、login.sql によるカスタマイズなど実務向けテクニックを学ぶ",
    sections: [
      {
        title: "置換変数とバインド変数",
        content:
          "SQL*Plus では2種類の変数を使い分けます。置換変数（&, &&）はSQL文のテキストを実行前に置き換えるもので、DEFINE コマンドで定義します。& は毎回入力を求め、&& は一度入力すると以降同じ値を使います。一方、バインド変数は VARIABLE コマンドで宣言し、PL/SQL ブロック内で値を代入して SQL 文から参照できます。バインド変数はパース回数の削減にも有効です。",
        code: `-- 置換変数（&）：毎回入力を求める
SELECT * FROM employees WHERE department_id = &dept_id;
-- 実行時: "dept_idに値を入力: " と表示される

-- 置換変数（&&）：一度だけ入力を求める
SELECT * FROM employees WHERE department_id = &&dept_id;
SELECT * FROM departments WHERE department_id = &&dept_id;
-- 2つ目の SQL では再入力不要

-- DEFINE で事前に値を設定
DEFINE dept_id = 50
DEFINE start_date = '2024-01-01'
SELECT * FROM employees WHERE department_id = &dept_id;
-- 入力を求めずに 50 が使われる

-- 現在の DEFINE 変数を確認
DEFINE              -- すべて表示
DEFINE dept_id      -- 特定の変数を確認

-- バインド変数の宣言と使用
VARIABLE v_count NUMBER
VARIABLE v_name VARCHAR2(50)

BEGIN
  SELECT COUNT(*), MAX(last_name)
  INTO :v_count, :v_name
  FROM employees
  WHERE department_id = 50;
END;
/

-- バインド変数の値を表示
PRINT v_count
PRINT v_name

-- バインド変数を SQL で使用
SELECT * FROM employees
WHERE last_name = :v_name;

-- 新旧値の表示制御
SET VERIFY ON    -- 置換前後の SQL を表示（デバッグ用）
SET VERIFY OFF   -- 表示しない（本番用）`,
      },
      {
        title: "レポート作成",
        content:
          "SQL*Plus にはレポート作成用のコマンドが用意されています。BREAK でグループ化の区切りを定義し、COMPUTE でグループごとの集計を自動計算します。TTITLE / BTITLE でページのヘッダー・フッターを設定し、COLUMN FORMAT と組み合わせることで、整形されたレポートを出力できます。",
        code: `-- レポート用の表示設定
SET LINESIZE 100
SET PAGESIZE 50
SET FEEDBACK OFF

-- 列の書式設定
COLUMN department_name FORMAT A20      HEADING '部門名'
COLUMN last_name       FORMAT A15      HEADING '社員名'
COLUMN salary          FORMAT 999,999  HEADING '給与'
COLUMN hire_date       FORMAT A10      HEADING '入社日'

-- ブレーク（グループ区切り）の設定
BREAK ON department_name SKIP 1 ON REPORT
-- department_name が変わるたびに空行を挿入
-- REPORT は全体の最後に区切りを設定

-- 集計の設定
COMPUTE SUM LABEL '部門計' OF salary ON department_name
COMPUTE SUM LABEL '総計'   OF salary ON REPORT
COMPUTE AVG LABEL '平均'   OF salary ON REPORT
COMPUTE COUNT LABEL '人数' OF last_name ON department_name

-- ページタイトル（ヘッダー / フッター）
TTITLE CENTER '社員給与レポート' SKIP 1 -
       CENTER '========================' SKIP 2
BTITLE CENTER 'ページ: ' FORMAT 999 SQL.PNO

-- レポート用クエリの実行
SELECT d.department_name,
       e.last_name,
       e.salary,
       TO_CHAR(e.hire_date, 'YYYY-MM-DD') AS hire_date
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
ORDER BY d.department_name, e.salary DESC;

-- レポート設定のクリア
CLEAR BREAKS
CLEAR COMPUTES
CLEAR COLUMNS
TTITLE OFF
BTITLE OFF`,
      },
      {
        title: "バッチ処理と login.sql",
        content:
          "SQL*Plus はバッチ処理にも広く使われます。シェルスクリプトから SQL*Plus を呼び出し、処理結果に応じた終了コードを返すことで、ジョブスケジューラとの連携が可能です。WHENEVER コマンドでエラー発生時の動作を制御できます。また、login.sql（または glogin.sql）に初期設定を記述しておけば、SQL*Plus 起動時に自動的に適用されます。",
        code: `-- login.sql の例（$ORACLE_HOME/sqlplus/admin/ または カレントディレクトリに配置）
-- SQL*Plus 起動時に自動実行される
SET LINESIZE 200
SET PAGESIZE 50
SET SERVEROUTPUT ON SIZE 1000000
SET TIMING ON
SET SQLPROMPT "&_USER@&_CONNECT_IDENTIFIER> "
SET NULL '(null)'
DEFINE _EDITOR = vi
ALTER SESSION SET NLS_DATE_FORMAT = 'YYYY-MM-DD HH24:MI:SS';

-- WHENEVER コマンド（エラー制御）
WHENEVER SQLERROR EXIT SQL.SQLCODE   -- SQLエラー時にエラーコードで終了
WHENEVER SQLERROR CONTINUE NONE     -- SQLエラーを無視して続行
WHENEVER OSERROR EXIT FAILURE        -- OSエラー時に終了

-- バッチ処理スクリプトの例（batch_job.sql）
WHENEVER SQLERROR EXIT SQL.SQLCODE ROLLBACK
SET FEEDBACK OFF
SET HEADING OFF

SPOOL /tmp/batch_result.log

INSERT INTO batch_log (job_name, start_time)
VALUES ('DAILY_UPDATE', SYSDATE);

UPDATE employees SET salary = salary * 1.05
WHERE department_id = 50;

COMMIT;

SELECT 'Updated ' || SQL%ROWCOUNT || ' rows.' FROM dual;

SPOOL OFF
EXIT 0

-- シェルスクリプトからの呼び出し
-- #!/bin/bash
-- sqlplus -s user/pass@db @batch_job.sql
-- RC=$?
-- if [ $RC -ne 0 ]; then
--   echo "エラー発生: 終了コード=$RC"
--   # アラート通知
-- fi

-- ヒアドキュメントで直接 SQL を渡す
-- sqlplus -s user/pass@db <<EOF
-- SET PAGESIZE 0 FEEDBACK OFF
-- SELECT COUNT(*) FROM employees;
-- EXIT
-- EOF

-- EXIT コマンドのバリエーション
EXIT                 -- 正常終了（コード 0）
EXIT 0               -- 明示的に正常終了
EXIT SQL.SQLCODE     -- 直前の SQL エラーコードで終了
EXIT SUCCESS         -- 成功（= EXIT 0）
EXIT FAILURE         -- 失敗（= EXIT 1）
EXIT :bind_var       -- バインド変数の値を終了コードに使用`,
      },
    ],
  },
];

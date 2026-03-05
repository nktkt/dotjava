export interface OracleCertSection {
  title: string;
  content: string;
  code?: string;
}

export interface OracleCertChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: OracleCertSection[];
}

export interface OracleCertCategory {
  id: string;
  name: string;
  color: string;
}

export const oracleCertCategories: OracleCertCategory[] = [
  { id: "silver-sql", name: "Silver SQL (1Z0-071)", color: "#2196F3" },
  { id: "bronze-dba", name: "Bronze DBA", color: "#CD7F32" },
  { id: "silver-dba", name: "Silver DBA", color: "#9E9E9E" },
  { id: "gold-dba", name: "Gold DBA", color: "#FFC107" },
];

export const oracleCertChapters: OracleCertChapter[] = [
  // ── Silver SQL (1Z0-071) ──
  {
    id: "sql-select",
    title: "SELECT文とデータの取得",
    description:
      "SELECT, FROM, WHERE, ORDER BY, DISTINCT, ROWNUM/FETCHを使ったデータ取得の基礎",
    category: "silver-sql",
    sections: [
      {
        title: "SELECT文の基本",
        content:
          "SELECT文はデータベースからデータを取得する最も基本的なSQL文です。SELECT句で取得する列を指定し、FROM句で対象テーブルを指定します。WHERE句で行の絞り込み、ORDER BY句でソートを行います。ORDER BYはASC（昇順・デフォルト）とDESC（降順）を指定でき、複数列でのソートも可能です。列の別名はASキーワードまたはダブルクォーテーションで指定します。SELECT句で*を指定すると全列を取得しますが、本番環境では必要な列だけを明示的に指定することが推奨されます。試験では列別名やNULLを含む演算の結果が頻出です。",
        code: `-- 基本的なSELECT文
SELECT employee_id, first_name, salary
FROM employees
WHERE department_id = 10
ORDER BY salary DESC;

-- 列の別名（エイリアス）
SELECT first_name AS "社員名",
       salary * 12 AS "年収",
       commission_pct
FROM employees;

-- NULLを含む演算（結果はNULLになる）
SELECT first_name,
       salary + salary * commission_pct AS "総報酬"
FROM employees;
-- commission_pctがNULLの場合、結果もNULL

-- 文字列連結演算子 ||
SELECT first_name || ' ' || last_name AS "氏名"
FROM employees;`,
      },
      {
        title: "DISTINCT・ROWNUM・FETCH",
        content:
          "DISTINCTキーワードはSELECT句に指定し、重複行を排除して一意な結果を返します。DISTINCTはSELECTの直後に1回だけ指定でき、すべての選択列の組み合わせで重複判定されます。行数制限にはROWNUM疑似列とFETCH FIRST句の2つの方法があります。ROWNUMはOracle独自の古い構文で、WHERE ROWNUM <= nで使用します。12c以降ではFETCH FIRST n ROWS ONLYが標準的です。OFFSET句と組み合わせてページネーションも実現できます。試験ではROWNUMの動作（WHERE ROWNUM > 1が0件になる理由）が頻出です。",
        code: `-- DISTINCTで重複排除
SELECT DISTINCT department_id
FROM employees;

-- 複数列のDISTINCT（組み合わせで重複判定）
SELECT DISTINCT department_id, job_id
FROM employees;

-- ROWNUM（Oracle従来方式）
SELECT employee_id, first_name, salary
FROM employees
WHERE ROWNUM <= 5
ORDER BY salary DESC;
-- 注意: この書き方ではソート前に5行が選ばれる

-- 正しいTop-N: サブクエリを使う
SELECT * FROM (
  SELECT employee_id, first_name, salary
  FROM employees
  ORDER BY salary DESC
)
WHERE ROWNUM <= 5;

-- FETCH FIRST（12c以降の標準構文）
SELECT employee_id, first_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 5 ROWS ONLY;

-- OFFSETでページネーション（6行目～10行目）
SELECT employee_id, first_name, salary
FROM employees
ORDER BY salary DESC
OFFSET 5 ROWS FETCH NEXT 5 ROWS ONLY;`,
      },
      {
        title: "WHERE句の条件指定",
        content:
          "WHERE句では比較演算子（=, <>, <, >, <=, >=）に加え、BETWEEN、IN、LIKE、IS NULLなどの演算子を使って条件を指定します。BETWEENは範囲指定で境界値を含みます。INはリスト内の値との一致を判定します。LIKEはパターンマッチで、%は0文字以上、_は1文字を表します。NULLの判定には必ずIS NULL/IS NOT NULLを使い、= NULLは使えません。AND/ORで複数条件を組み合わせ、NOTで否定できます。ANDはORより優先されるため、括弧で明示的にグループ化することが推奨されます。",
        code: `-- BETWEEN（範囲検索・境界値を含む）
SELECT first_name, salary
FROM employees
WHERE salary BETWEEN 5000 AND 10000;
-- salary >= 5000 AND salary <= 10000 と同じ

-- IN（リスト内の値と一致）
SELECT first_name, department_id
FROM employees
WHERE department_id IN (10, 20, 30);

-- LIKE（パターンマッチ）
SELECT first_name
FROM employees
WHERE first_name LIKE 'A%';    -- Aで始まる
-- WHERE first_name LIKE '_a%'; -- 2文字目がa
-- WHERE first_name LIKE '%son'; -- sonで終わる

-- ESCAPE句（%や_自体を検索する場合）
SELECT product_name
FROM products
WHERE product_name LIKE '%\\%%' ESCAPE '\\';

-- IS NULL / IS NOT NULL
SELECT first_name, commission_pct
FROM employees
WHERE commission_pct IS NULL;
-- WHERE commission_pct = NULL は常にFALSE（誤り）

-- AND / OR の優先順位（ANDが先に評価される）
SELECT first_name, salary, department_id
FROM employees
WHERE department_id = 10
   OR department_id = 20
  AND salary > 5000;
-- 上記は department_id=10 OR (department_id=20 AND salary>5000)
-- 括弧で明示: (department_id = 10 OR department_id = 20) AND salary > 5000`,
      },
    ],
  },
  {
    id: "sql-function",
    title: "関数と式",
    description:
      "単一行関数、変換関数、条件式CASE/DECODE、NULL関数NVL/COALESCEの活用",
    category: "silver-sql",
    sections: [
      {
        title: "単一行関数",
        content:
          "単一行関数は行ごとに1つの結果を返す関数です。文字関数にはUPPER（大文字変換）、LOWER（小文字変換）、INITCAP（先頭大文字）、SUBSTR（部分文字列）、LENGTH（文字数）、LPAD/RPAD（パディング）、TRIM（空白除去）、REPLACE（置換）、INSTR（位置検索）があります。数値関数にはROUND（四捨五入）、TRUNC（切り捨て）、MOD（剰余）、CEIL（切り上げ）、FLOOR（切り下げ）があります。日付関数にはSYSDATE（現在日時）、ADD_MONTHS、MONTHS_BETWEEN、NEXT_DAY、LAST_DAYなどがあります。試験ではSUBSTRの開始位置が1始まりである点に注意が必要です。",
        code: `-- 文字関数
SELECT UPPER('hello')          AS upper_val,   -- HELLO
       LOWER('HELLO')          AS lower_val,   -- hello
       INITCAP('hello world')  AS initcap_val, -- Hello World
       SUBSTR('Oracle', 2, 3)  AS substr_val,  -- rac（2文字目から3文字）
       LENGTH('Oracle')        AS len_val,     -- 6
       LPAD('42', 5, '0')     AS lpad_val,    -- 00042
       TRIM('  hello  ')      AS trim_val,    -- hello
       REPLACE('JACK','J','BL') AS replace_val -- BLACK
FROM dual;

-- 数値関数
SELECT ROUND(45.926, 2)  AS round_val,  -- 45.93
       TRUNC(45.926, 2)  AS trunc_val,  -- 45.92
       MOD(10, 3)        AS mod_val,    -- 1
       CEIL(45.1)        AS ceil_val,   -- 46
       FLOOR(45.9)       AS floor_val   -- 45
FROM dual;

-- 日付関数
SELECT SYSDATE                          AS "現在日時",
       ADD_MONTHS(SYSDATE, 3)           AS "3ヶ月後",
       MONTHS_BETWEEN('2024-06-01', '2024-01-01') AS "月数差",
       NEXT_DAY(SYSDATE, '月曜日')       AS "次の月曜",
       LAST_DAY(SYSDATE)                AS "月末日"
FROM dual;`,
      },
      {
        title: "変換関数",
        content:
          "変換関数はデータ型を変換する関数です。TO_CHAR関数は数値や日付を文字列に変換し、書式モデルを指定できます。日付の書式にはYYYY（年）、MM（月）、DD（日）、HH24（時）、MI（分）、SS（秒）、DAY（曜日名）などがあります。数値の書式には9（数字）、0（ゼロ埋め）、L（通貨記号）、カンマ（桁区切り）があります。TO_NUMBER関数は文字列を数値に、TO_DATE関数は文字列を日付に変換します。暗黙の型変換も行われますが、明示的な変換が推奨されます。試験ではTO_CHARの書式モデルとTO_DATEの書式不一致によるエラーが頻出です。",
        code: `-- TO_CHAR: 日付 → 文字列
SELECT TO_CHAR(SYSDATE, 'YYYY/MM/DD HH24:MI:SS') AS "日時",
       TO_CHAR(SYSDATE, 'YYYY"年"MM"月"DD"日"')   AS "日本語日付",
       TO_CHAR(SYSDATE, 'DAY')                     AS "曜日"
FROM dual;

-- TO_CHAR: 数値 → 文字列
SELECT TO_CHAR(1234567, '9,999,999')   AS "桁区切り",
       TO_CHAR(1234.5, '0000.00')      AS "ゼロ埋め",
       TO_CHAR(1234.5, 'L9,999.99')    AS "通貨付き"
FROM dual;

-- TO_NUMBER: 文字列 → 数値
SELECT TO_NUMBER('1,234.56', '9,999.99') AS num_val
FROM dual;

-- TO_DATE: 文字列 → 日付
SELECT TO_DATE('2024-04-15', 'YYYY-MM-DD') AS date_val
FROM dual;

-- 暗黙の型変換（推奨されない）
SELECT * FROM employees
WHERE employee_id = '100';  -- 文字列→数値の暗黙変換
-- 推奨: WHERE employee_id = 100`,
      },
      {
        title: "条件式とNULL関数",
        content:
          "CASE式はSQLの条件分岐で、単純CASE式と検索CASE式の2種類があります。単純CASE式はCASE expr WHEN val THEN result形式、検索CASE式はCASE WHEN condition THEN result形式です。DECODE関数はOracle独自の条件分岐関数で、CASE式への書き換えが推奨されます。NULL関数にはNVL（NULLを別の値に置換）、NVL2（NULLかどうかで異なる値を返す）、NULLIF（2つの値が等しければNULLを返す）、COALESCE（最初のNULLでない値を返す）があります。NVLは引数のデータ型を揃える必要がある点が試験の頻出ポイントです。",
        code: `-- 検索CASE式
SELECT first_name, salary,
  CASE
    WHEN salary >= 15000 THEN '高給'
    WHEN salary >= 10000 THEN '中給'
    ELSE '標準'
  END AS "給与レベル"
FROM employees;

-- 単純CASE式
SELECT department_id,
  CASE department_id
    WHEN 10 THEN '管理部'
    WHEN 20 THEN '研究部'
    WHEN 30 THEN '営業部'
    ELSE 'その他'
  END AS "部門名"
FROM employees;

-- DECODE（Oracle独自・CASE式推奨）
SELECT department_id,
  DECODE(department_id, 10, '管理部', 20, '研究部', 'その他') AS "部門名"
FROM employees;

-- NVL: NULLを置換
SELECT first_name,
       NVL(commission_pct, 0) AS "歩合"
FROM employees;

-- NVL2: NULLかどうかで分岐
SELECT first_name,
       NVL2(commission_pct, '歩合あり', '歩合なし') AS "歩合状況"
FROM employees;

-- COALESCE: 最初のNULLでない値を返す
SELECT COALESCE(commission_pct, bonus_rate, 0) AS "報酬率"
FROM employees;

-- NULLIF: 等しければNULLを返す
SELECT NULLIF(salary, 0) AS "給与" -- 0ならNULLに
FROM employees;`,
      },
    ],
  },
  {
    id: "sql-join-group",
    title: "結合とグループ化",
    description:
      "JOIN、サブクエリ、GROUP BY/HAVING、集合演算子の使い方",
    category: "silver-sql",
    sections: [
      {
        title: "結合（JOIN）",
        content:
          "テーブル結合は複数テーブルのデータを関連付けて取得する機能です。INNER JOINは両テーブルに一致する行のみ返します。LEFT OUTER JOINは左テーブルの全行と右テーブルの一致行を返し、一致しない場合はNULLになります。RIGHT OUTER JOINは右テーブル基準、FULL OUTER JOINは両テーブルの全行を返します。CROSS JOINはデカルト積（全組み合わせ）を生成します。自己結合は同一テーブルを別名で結合し、階層関係の表現に使います。USING句は結合列名が同じ場合に簡潔に書けますが、ON句の方が柔軟性があります。試験ではOUTER JOINの結果行数の問題が頻出です。",
        code: `-- INNER JOIN（等価結合）
SELECT e.first_name, d.department_name
FROM employees e
INNER JOIN departments d
  ON e.department_id = d.department_id;

-- USING句（結合列名が同じ場合）
SELECT first_name, department_name
FROM employees
JOIN departments USING (department_id);

-- LEFT OUTER JOIN
SELECT e.first_name, d.department_name
FROM employees e
LEFT OUTER JOIN departments d
  ON e.department_id = d.department_id;
-- 部門未所属の社員もNULLで表示される

-- FULL OUTER JOIN
SELECT e.first_name, d.department_name
FROM employees e
FULL OUTER JOIN departments d
  ON e.department_id = d.department_id;

-- CROSS JOIN（デカルト積）
SELECT e.first_name, d.department_name
FROM employees e
CROSS JOIN departments d;

-- 自己結合（上司と部下の関係）
SELECT e.first_name AS "社員",
       m.first_name AS "上司"
FROM employees e
LEFT JOIN employees m
  ON e.manager_id = m.employee_id;`,
      },
      {
        title: "サブクエリとGROUP BY",
        content:
          "サブクエリはSQL文の中にネストされたSELECT文です。単一行サブクエリは=、<、>などの比較演算子と使用し、複数行サブクエリはIN、ANY、ALLと使用します。相関サブクエリは外部クエリの値を参照し、行ごとに評価されます。GROUP BY句はデータをグループ化し、集約関数（COUNT、SUM、AVG、MAX、MIN）で集計します。HAVING句はグループ化後の条件指定で、WHERE句はグループ化前の絞り込みです。GROUP BYに含まれない列をSELECT句に直接記述するとエラーになります。試験ではWHEREとHAVINGの違い、集約関数のNULL除外の挙動が頻出です。",
        code: `-- 単一行サブクエリ
SELECT first_name, salary
FROM employees
WHERE salary > (
  SELECT AVG(salary) FROM employees
);

-- 複数行サブクエリ（IN）
SELECT first_name, department_id
FROM employees
WHERE department_id IN (
  SELECT department_id FROM departments
  WHERE location_id = 1700
);

-- ANY / ALL
SELECT first_name, salary
FROM employees
WHERE salary > ALL (
  SELECT salary FROM employees
  WHERE department_id = 30
);

-- GROUP BY と集約関数
SELECT department_id,
       COUNT(*) AS "人数",
       AVG(salary) AS "平均給与",
       MAX(salary) AS "最高給与",
       MIN(salary) AS "最低給与",
       SUM(salary) AS "給与合計"
FROM employees
GROUP BY department_id
ORDER BY department_id;

-- HAVINGでグループの絞り込み
SELECT department_id, COUNT(*) AS cnt
FROM employees
GROUP BY department_id
HAVING COUNT(*) >= 5
ORDER BY cnt DESC;
-- 注意: WHERE COUNT(*) >= 5 はエラー`,
      },
      {
        title: "集合演算子",
        content:
          "集合演算子は複数のSELECT文の結果を結合します。UNIONは和集合で重複を排除し、UNION ALLは重複を含めてすべての行を返します。INTERSECTは積集合（共通行）を返し、MINUSは差集合（最初のクエリにあり2番目にない行）を返します。集合演算子を使う場合、各SELECT文の列数と対応するデータ型が一致している必要があります。ORDER BY句は最後のSELECT文の末尾にのみ指定でき、列名は最初のSELECT文の列名を使用します。パフォーマンス面ではUNION ALLがUNIONより高速です（ソート不要）。",
        code: `-- UNION（重複排除・ソートあり）
SELECT department_id, job_id FROM employees
WHERE department_id = 10
UNION
SELECT department_id, job_id FROM employees
WHERE department_id = 20;

-- UNION ALL（重複含む・高速）
SELECT department_id FROM employees
UNION ALL
SELECT department_id FROM departments;

-- INTERSECT（共通行のみ）
SELECT employee_id FROM employees
WHERE department_id = 10
INTERSECT
SELECT employee_id FROM employees
WHERE salary > 10000;

-- MINUS（差集合）
SELECT department_id FROM departments
MINUS
SELECT department_id FROM employees;
-- 社員が所属していない部門のみ取得

-- 集合演算子の注意点
-- ・列数とデータ型を一致させる必要がある
-- ・ORDER BYは最後のSELECTの末尾に記述
SELECT first_name, hire_date FROM employees
WHERE department_id = 10
UNION
SELECT first_name, hire_date FROM employees
WHERE department_id = 20
ORDER BY first_name;  -- 最後にのみ指定可`,
      },
    ],
  },
  {
    id: "sql-dml-ddl",
    title: "DML・DDL・DCL",
    description:
      "INSERT/UPDATE/DELETE/MERGE、CREATE/ALTER/DROP、制約、GRANT/REVOKE、トランザクション制御",
    category: "silver-sql",
    sections: [
      {
        title: "DML操作",
        content:
          "DML（Data Manipulation Language）はデータの追加・更新・削除を行う文です。INSERT文はテーブルに行を追加し、列リストの省略時は全列に値を指定する必要があります。UPDATE文は既存行のデータを変更し、WHERE句を省略すると全行が更新されます。DELETE文は行を削除し、WHERE句省略で全行削除になります。MERGE文はINSERTとUPDATEを1文で条件分岐実行するUPSERT操作です。INSERT ALL/INSERT FIRSTで複数テーブルへの一括挿入も可能です。DML文は自動コミットされず、明示的なCOMMITが必要です。",
        code: `-- INSERT: 1行挿入
INSERT INTO employees (employee_id, first_name, last_name, hire_date, salary, department_id)
VALUES (300, '太郎', '山田', SYSDATE, 50000, 10);

-- INSERT: SELECT結果を挿入
INSERT INTO emp_archive
SELECT * FROM employees WHERE hire_date < '2020-01-01';

-- UPDATE: 条件付き更新
UPDATE employees
SET salary = salary * 1.1,
    commission_pct = 0.05
WHERE department_id = 20;

-- DELETE: 条件付き削除
DELETE FROM employees
WHERE employee_id = 300;

-- MERGE（UPSERT操作）
MERGE INTO employees_target t
USING employees_source s
ON (t.employee_id = s.employee_id)
WHEN MATCHED THEN
  UPDATE SET t.salary = s.salary,
             t.department_id = s.department_id
WHEN NOT MATCHED THEN
  INSERT (employee_id, first_name, last_name, salary)
  VALUES (s.employee_id, s.first_name, s.last_name, s.salary);

-- INSERT ALL（複数テーブルへの一括挿入）
INSERT ALL
  INTO sales_daily (sale_date, amount) VALUES (sale_dt, amt)
  INTO sales_monthly (sale_month, amount) VALUES (sale_dt, amt)
SELECT sale_dt, amt FROM new_sales;`,
      },
      {
        title: "DDLと制約",
        content:
          "DDL（Data Definition Language）はデータベースオブジェクトの作成・変更・削除を行う文です。CREATE TABLEでテーブルを作成し、ALTER TABLEで構造を変更、DROP TABLEで削除します。制約にはPRIMARY KEY（主キー・一意かつNOT NULL）、FOREIGN KEY（外部キー・参照整合性）、UNIQUE（一意制約・NULLは許可）、NOT NULL（NULL禁止）、CHECK（条件制約）があります。制約は列レベルとテーブルレベルで定義でき、複合主キーはテーブルレベルのみです。DDL文は自動コミットされるため、実行前のDMLも暗黙的にコミットされる点に注意が必要です。",
        code: `-- CREATE TABLE（制約付き）
CREATE TABLE employees_new (
  employee_id  NUMBER(6)    PRIMARY KEY,
  first_name   VARCHAR2(50) NOT NULL,
  last_name    VARCHAR2(50) NOT NULL,
  email        VARCHAR2(100) UNIQUE,
  salary       NUMBER(8,2)  CHECK (salary > 0),
  department_id NUMBER(4)   REFERENCES departments(department_id),
  hire_date    DATE DEFAULT SYSDATE
);

-- テーブルレベルの制約（複合主キー）
CREATE TABLE order_items (
  order_id   NUMBER(6),
  item_id    NUMBER(6),
  quantity   NUMBER(4) NOT NULL,
  CONSTRAINT pk_order_items PRIMARY KEY (order_id, item_id),
  CONSTRAINT fk_order FOREIGN KEY (order_id)
    REFERENCES orders(order_id) ON DELETE CASCADE
);

-- ALTER TABLE
ALTER TABLE employees_new ADD (phone VARCHAR2(20));
ALTER TABLE employees_new MODIFY (email VARCHAR2(150));
ALTER TABLE employees_new DROP COLUMN phone;
ALTER TABLE employees_new RENAME COLUMN email TO email_address;

-- DROP TABLE
DROP TABLE employees_new;          -- テーブル削除
DROP TABLE employees_new PURGE;    -- ごみ箱を経由せず完全削除

-- TRUNCATE（全行削除・DDLのため自動コミット・ロールバック不可）
TRUNCATE TABLE temp_data;`,
      },
      {
        title: "DCLとトランザクション",
        content:
          "DCL（Data Control Language）はデータベースのアクセス権限を制御する文です。GRANT文で権限を付与し、REVOKE文で権限を取り消します。システム権限（CREATE TABLE、CREATE SESSIONなど）とオブジェクト権限（SELECT、INSERT、UPDATEなど）があります。WITH GRANT OPTIONを付けると、付与された側がさらに他のユーザーに権限を付与できます。トランザクション制御にはCOMMIT（確定）、ROLLBACK（取消）、SAVEPOINT（中間保存点）があります。DDL文は暗黙コミットを発生させるため、DDL実行前に未コミットのDMLがあると自動的にコミットされます。",
        code: `-- GRANT: システム権限の付与
GRANT CREATE SESSION, CREATE TABLE
TO new_user;

-- GRANT: オブジェクト権限の付与
GRANT SELECT, INSERT, UPDATE
ON employees
TO analyst_user;

-- WITH GRANT OPTION（権限の再付与を許可）
GRANT SELECT ON employees
TO team_lead
WITH GRANT OPTION;

-- REVOKE: 権限の取り消し
REVOKE INSERT, UPDATE ON employees
FROM analyst_user;

-- トランザクション制御
INSERT INTO employees (employee_id, first_name, last_name)
VALUES (301, '花子', '佐藤');
SAVEPOINT sp1;  -- セーブポイント設定

UPDATE employees SET salary = 60000
WHERE employee_id = 301;
SAVEPOINT sp2;

DELETE FROM employees WHERE employee_id = 200;

ROLLBACK TO sp2;  -- DELETE のみ取り消し（sp2以降）
-- INSERT と UPDATE は残る

COMMIT;  -- 確定（以後ROLLBACKできない）

-- DDLの暗黙コミット
INSERT INTO temp_data VALUES (1, 'test');  -- 未コミット
CREATE TABLE dummy (id NUMBER);  -- DDL実行 → 暗黙COMMIT発生
-- INSERT も自動的にコミットされている
ROLLBACK;  -- INSERT はロールバックできない`,
      },
    ],
  },

  // ── Bronze DBA ──
  {
    id: "bronze-rdb",
    title: "リレーショナルDB基礎",
    description: "RDBの概念、正規化、ER図、キー制約の理解",
    category: "bronze-dba",
    sections: [
      {
        title: "リレーショナルモデルの基本",
        content:
          "リレーショナルデータベース（RDB）は、データをテーブル（リレーション）の集合として管理するモデルです。テーブルは行（タプル/レコード）と列（属性/カラム）で構成され、各列にはドメイン（取りうる値の範囲）が定義されます。リレーショナル代数の基本操作には、選択（σ：行の絞り込み）、射影（π：列の選択）、結合（⋈：テーブルの結合）、和・差・積の集合演算があります。E.F.コッドが1970年に提唱したリレーショナルモデルは、データの独立性と整合性を保証する理論的基盤です。",
        code: `-- テーブルの作成（リレーショナルモデルの実装）
CREATE TABLE departments (
  department_id   NUMBER(4)    PRIMARY KEY,
  department_name VARCHAR2(30) NOT NULL,
  location_id     NUMBER(4)
);

CREATE TABLE employees (
  employee_id   NUMBER(6)    PRIMARY KEY,
  first_name    VARCHAR2(50),
  last_name     VARCHAR2(50) NOT NULL,
  department_id NUMBER(4)    REFERENCES departments(department_id)
);

-- リレーショナル代数の対応
-- 選択（σ）→ WHERE句
SELECT * FROM employees WHERE salary > 50000;

-- 射影（π）→ SELECT句での列指定
SELECT first_name, last_name FROM employees;

-- 結合（⋈）→ JOIN
SELECT e.first_name, d.department_name
FROM employees e JOIN departments d
ON e.department_id = d.department_id;`,
      },
      {
        title: "正規化",
        content:
          "正規化はデータの冗長性を排除し、整合性を保つためのテーブル設計手法です。第1正規形（1NF）は繰り返し項目を排除し、すべての列が原子値（分割不可能な値）を持つ状態です。第2正規形（2NF）は1NFを満たし、部分関数従属を排除した状態です（すべての非キー列が主キー全体に完全関数従属）。第3正規形（3NF）は2NFを満たし、推移的関数従属を排除した状態です。BCNF（ボイスコッド正規形）はすべての決定項が候補キーである状態です。実務では3NFまでの正規化が一般的で、パフォーマンスのために意図的に非正規化することもあります。",
        code: `-- 非正規形（繰り返し項目がある）
-- 注文テーブル: 注文ID, 顧客名, 商品1, 商品2, 商品3 ...

-- 第1正規形（1NF）: 繰り返し項目を排除
CREATE TABLE orders_1nf (
  order_id     NUMBER,
  customer_name VARCHAR2(50),
  product_name  VARCHAR2(50),
  quantity      NUMBER,
  unit_price    NUMBER
);

-- 第2正規形（2NF）: 部分関数従属を排除
CREATE TABLE orders_2nf (
  order_id   NUMBER,
  product_id NUMBER,
  quantity   NUMBER,
  PRIMARY KEY (order_id, product_id)
);
CREATE TABLE products (
  product_id   NUMBER PRIMARY KEY,
  product_name VARCHAR2(50),
  unit_price   NUMBER
);

-- 第3正規形（3NF）: 推移的関数従属を排除
-- 例: 社員テーブルに部門名があると
-- 社員ID → 部門ID → 部門名 という推移的従属がある
-- 部門名を別テーブルに分離する
CREATE TABLE emp_3nf (
  employee_id   NUMBER PRIMARY KEY,
  employee_name VARCHAR2(50),
  department_id NUMBER REFERENCES departments(department_id)
);`,
      },
      {
        title: "キー制約とER図",
        content:
          "キー制約はデータの一意性と参照整合性を保証する仕組みです。主キー（PRIMARY KEY）はテーブル内で行を一意に識別し、NULLを許可しません。外部キー（FOREIGN KEY）は他テーブルの主キーを参照し、参照整合性を保証します。候補キー（CANDIDATE KEY）は主キーの候補となる一意な列の組み合わせです。代替キー（ALTERNATE KEY）は候補キーのうち主キーに選ばれなかったものです。ER図（Entity-Relationship Diagram）はテーブル間の関係を視覚的に表現し、1対1、1対多、多対多のカーディナリティを示します。多対多は中間テーブルで解消します。",
        code: `-- 主キー制約（テーブル内で一意・NULL不可）
CREATE TABLE customers (
  customer_id NUMBER PRIMARY KEY,
  email       VARCHAR2(100) UNIQUE,  -- 候補キー
  name        VARCHAR2(100) NOT NULL
);

-- 外部キー制約（参照整合性）
CREATE TABLE orders (
  order_id    NUMBER PRIMARY KEY,
  customer_id NUMBER NOT NULL,
  order_date  DATE DEFAULT SYSDATE,
  CONSTRAINT fk_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
    ON DELETE CASCADE  -- 親削除時に子も削除
);

-- 多対多の関係を中間テーブルで解消
-- 学生 ←→ 講座（多対多）
CREATE TABLE students (
  student_id NUMBER PRIMARY KEY,
  name       VARCHAR2(50)
);
CREATE TABLE courses (
  course_id  NUMBER PRIMARY KEY,
  title      VARCHAR2(100)
);
-- 中間テーブル（多対多の解消）
CREATE TABLE enrollments (
  student_id NUMBER REFERENCES students(student_id),
  course_id  NUMBER REFERENCES courses(course_id),
  enrolled_date DATE DEFAULT SYSDATE,
  PRIMARY KEY (student_id, course_id)
);`,
      },
    ],
  },
  {
    id: "bronze-arch",
    title: "Oracleアーキテクチャ基礎",
    description:
      "インスタンスとDB構造、SGA/PGA、バックグラウンドプロセスの基本",
    category: "bronze-dba",
    sections: [
      {
        title: "インスタンスとデータベース",
        content:
          "Oracleではインスタンスとデータベースは明確に区別されます。インスタンスはメモリ構造（SGA）とバックグラウンドプロセスの集合で、データベースは物理的なファイル群（データファイル、REDOログファイル、制御ファイル）です。起動はNOMOUNT（インスタンス起動）→MOUNT（制御ファイル読込）→OPEN（データファイルとREDOログをオープン）の3段階で行われます。停止にはNORMAL（新規接続拒否・既存セッション待ち）、TRANSACTIONAL（トランザクション完了待ち）、IMMEDIATE（即座にロールバック）、ABORT（強制停止）の4モードがあります。",
        code: `-- データベースの起動（3段階）
-- 1. NOMOUNT: インスタンス（SGA＋プロセス）を起動
STARTUP NOMOUNT;
-- → 初期化パラメータファイル(spfile/pfile)を読み込み
-- → SGAを割り当て、バックグラウンドプロセスを起動

-- 2. MOUNT: 制御ファイルをオープン
ALTER DATABASE MOUNT;
-- → 制御ファイルからDB構造情報を取得
-- → データファイル・REDOログの場所を特定

-- 3. OPEN: データファイルとREDOログをオープン
ALTER DATABASE OPEN;
-- → ユーザーがアクセス可能になる

-- 一括起動
STARTUP;  -- NOMOUNT → MOUNT → OPEN を自動実行

-- データベースの停止
SHUTDOWN IMMEDIATE;  -- 最もよく使用される
-- SHUTDOWN NORMAL;       -- 全セッション切断を待つ
-- SHUTDOWN TRANSACTIONAL; -- 進行中のトランザクション完了を待つ
-- SHUTDOWN ABORT;         -- 強制停止（インスタンスリカバリが必要）

-- 現在の状態を確認
SELECT STATUS FROM V$INSTANCE;`,
      },
      {
        title: "SGA（System Global Area）",
        content:
          "SGA（System Global Area）は全ユーザーで共有されるメモリ領域です。共有プール（Shared Pool）はSQL文の解析結果やデータディクショナリ情報をキャッシュし、ハードパース（解析）を減らします。バッファキャッシュ（Database Buffer Cache）はデータファイルから読み込んだデータブロックをキャッシュし、ディスクI/Oを削減します。REDOログバッファはコミット前のREDOエントリを一時保管します。ラージプールはRMANバックアップや共有サーバー構成で使用され、Javaプールはサーバー内JVMが使用します。SGAのサイズは自動メモリ管理（AMM）で動的に調整できます。",
        code: `-- SGAの情報を確認
SHOW SGA;

-- SGAの詳細情報を確認
SELECT component, current_size/1024/1024 AS "サイズ(MB)"
FROM V$SGA_DYNAMIC_COMPONENTS;

-- SGAの各コンポーネント確認
SELECT name, bytes/1024/1024 AS "サイズ(MB)"
FROM V$SGASTAT
WHERE pool IS NOT NULL
ORDER BY bytes DESC;

-- バッファキャッシュのヒット率確認
SELECT 1 - (physical_reads / (db_block_gets + consistent_gets)) AS "ヒット率"
FROM (
  SELECT SUM(CASE WHEN name = 'physical reads' THEN value END) AS physical_reads,
         SUM(CASE WHEN name = 'db block gets' THEN value END) AS db_block_gets,
         SUM(CASE WHEN name = 'consistent gets' THEN value END) AS consistent_gets
  FROM V$SYSSTAT
);

-- 自動メモリ管理（AMM）の設定確認
SHOW PARAMETER memory_target;
SHOW PARAMETER sga_target;
SHOW PARAMETER pga_aggregate_target;`,
      },
      {
        title: "バックグラウンドプロセス",
        content:
          "Oracleのバックグラウンドプロセスはインスタンスの維持管理を担当します。DBWR（Database Writer）はバッファキャッシュの変更済みブロックをデータファイルに書き込みます。LGWR（Log Writer）はREDOログバッファの内容をREDOログファイルに書き込み、コミット時に必ず実行されます。CKPT（Checkpoint）はチェックポイントイベントを発生させ、DBWRに書き込みを指示します。SMON（System Monitor）はインスタンスリカバリや一時セグメントの解放を行います。PMON（Process Monitor）は異常終了したプロセスのクリーンアップを行います。ARCn（Archiver）はアーカイブログモード時にREDOログをアーカイブします。",
        code: `-- バックグラウンドプロセスの一覧確認
SELECT pname, description
FROM V$BGPROCESS
WHERE paddr <> '00'
ORDER BY pname;

-- 主要プロセスの確認
SELECT pname AS "プロセス名",
       description AS "説明"
FROM V$BGPROCESS
WHERE pname IN ('DBW0','LGWR','CKPT','SMON','PMON','ARC0')
  AND paddr <> '00';

-- プロセスの統計情報
SELECT name, value
FROM V$SYSSTAT
WHERE name IN (
  'physical writes',       -- DBWR関連
  'redo writes',           -- LGWR関連
  'background checkpoints started' -- CKPT関連
);

-- アーカイブログモードの確認
ARCHIVE LOG LIST;

-- 現在のインスタンスプロセス一覧（OS上で確認）
-- $ ps -ef | grep ora_
-- ora_pmon_ORCL  ... PMON プロセス
-- ora_smon_ORCL  ... SMON プロセス
-- ora_dbw0_ORCL  ... DBWR プロセス
-- ora_lgwr_ORCL  ... LGWR プロセス`,
      },
    ],
  },
  {
    id: "bronze-sql",
    title: "SQL基礎と操作",
    description:
      "SELECT/INSERT/UPDATE/DELETE、データ型、NULL処理、結合の基礎",
    category: "bronze-dba",
    sections: [
      {
        title: "データ型とNULL",
        content:
          "Oracleの主要データ型にはVARCHAR2（可変長文字列・最大4000バイト）、CHAR（固定長文字列）、NUMBER（数値・精度と位取りを指定可能）、DATE（日付と時刻）、TIMESTAMP（高精度日時）、CLOB（大量テキスト）、BLOB（バイナリデータ）があります。NULLは「値が不明」を表す特殊な状態で、NULLとの演算はすべてNULLになります。NULLとの比較は常にUNKNOWNとなり、WHERE句ではTRUEの行のみ返されます。NULLの判定にはIS NULL / IS NOT NULLを使用します。集約関数（SUM、AVGなど）はNULLを除外して計算しますが、COUNT(*)はNULLを含む全行を数えます。",
        code: `-- Oracleの主要データ型
CREATE TABLE sample_types (
  id         NUMBER(10)       PRIMARY KEY,   -- 整数10桁
  name       VARCHAR2(100)    NOT NULL,       -- 可変長文字列
  code       CHAR(5),                         -- 固定長（5文字に空白パディング）
  price      NUMBER(8,2),                     -- 数値（整数6桁＋小数2桁）
  created_at DATE             DEFAULT SYSDATE,-- 日付
  updated_at TIMESTAMP,                       -- 高精度日時
  memo       CLOB                             -- 大量テキスト
);

-- NULLの演算（結果はNULL）
SELECT 100 + NULL   AS result1,  -- NULL
       'ABC' || NULL AS result2, -- NULL（※Oracleでは'ABC'）
       NULL = NULL   AS result3  -- NULL（TRUEではない）
FROM dual;

-- NULLの比較
SELECT * FROM employees
WHERE commission_pct IS NULL;      -- NULL判定（正しい）
-- WHERE commission_pct = NULL;    -- 常に結果なし（誤り）

-- 集約関数のNULL処理
SELECT COUNT(*)            AS "全行数",        -- NULLを含む
       COUNT(commission_pct) AS "歩合ありの人数", -- NULLを除外
       AVG(commission_pct)   AS "歩合の平均"     -- NULLを除外して計算
FROM employees;`,
      },
      {
        title: "SELECT文の基本操作",
        content:
          "SELECT文はDBAにとっても最も頻繁に使用するSQL文です。FROM句でテーブルを指定し、WHERE句で条件絞り込み、ORDER BY句でソートします。DUAL表はOracle固有の1行1列のダミーテーブルで、関数や式の結果を確認するのに使います。列の別名にはASキーワードまたはダブルクォーテーションを使用します。文字列リテラルはシングルクォーテーションで囲み、日付リテラルはNLS_DATE_FORMATに依存します。算術演算子の優先順位は通常の数学と同じで、括弧で明示的に制御できます。WHERE句の条件ではワイルドカード文字%と_をLIKE演算子と組み合わせてパターン検索が可能です。",
        code: `-- DUAL表を使った式の確認
SELECT 2 + 3         AS "計算結果",
       SYSDATE       AS "現在日時",
       USER          AS "接続ユーザー"
FROM dual;

-- 基本的なSELECT（条件付き・ソート付き）
SELECT employee_id   AS "社員ID",
       first_name    AS "名前",
       salary        AS "給与",
       hire_date     AS "入社日"
FROM employees
WHERE salary >= 10000
  AND hire_date >= TO_DATE('2020-01-01', 'YYYY-MM-DD')
ORDER BY salary DESC, hire_date ASC;

-- 算術演算と列の別名
SELECT first_name,
       salary,
       salary * 12          AS "年収",
       salary * 12 * 1.1    AS "年収（10%増）"
FROM employees
WHERE department_id = 10;

-- LIKE演算子（パターン検索）
SELECT first_name FROM employees
WHERE first_name LIKE 'S%';    -- Sで始まる名前

-- IN演算子（リスト内の値に一致）
SELECT first_name, department_id
FROM employees
WHERE department_id IN (10, 20, 30);`,
      },
      {
        title: "DML操作の基本",
        content:
          "DML（Data Manipulation Language）はデータの変更を行うSQL文の総称です。INSERT文はテーブルに新しい行を追加します。列リストを省略した場合は全列の値を定義順で指定する必要があります。UPDATE文は既存のデータを変更し、SET句で更新する列と値を指定します。WHERE句を省略すると全行が更新されるため注意が必要です。DELETE文はテーブルから行を削除し、同様にWHERE句の省略で全行削除となります。DML文はトランザクション内で実行され、COMMITで確定、ROLLBACKで取り消しが可能です。DDL文（CREATE、ALTER、DROPなど）は暗黙コミットを発生させるため、DML実行後にDDLを発行すると未コミットのDMLも確定されます。",
        code: `-- INSERT: 列リストを指定した挿入
INSERT INTO departments (department_id, department_name, location_id)
VALUES (50, '開発部', 1700);

-- INSERT: 列リスト省略（全列を定義順で指定）
INSERT INTO departments
VALUES (60, 'マーケティング部', 1800);

-- UPDATE: 条件付き更新
UPDATE employees
SET salary = salary * 1.05
WHERE department_id = 50;

-- UPDATE: 複数列の同時更新
UPDATE employees
SET salary = 70000,
    department_id = 20
WHERE employee_id = 100;

-- DELETE: 条件付き削除
DELETE FROM employees
WHERE hire_date < TO_DATE('2010-01-01', 'YYYY-MM-DD');

-- トランザクション制御
INSERT INTO departments VALUES (70, 'テスト部', 1700);
SAVEPOINT before_update;
UPDATE departments SET department_name = 'QA部' WHERE department_id = 70;
ROLLBACK TO before_update;  -- UPDATE のみ取り消し
COMMIT;  -- INSERT のみ確定`,
      },
    ],
  },
  {
    id: "bronze-manage",
    title: "データベース基本管理",
    description:
      "ユーザー・権限、表領域、バックアップ概要、Oracle Net基礎",
    category: "bronze-dba",
    sections: [
      {
        title: "ユーザーと権限",
        content:
          "Oracle DatabaseではユーザーはCREATE USER文で作成し、認証方式にはパスワード認証、OS認証、外部認証があります。権限にはシステム権限（CREATE SESSION、CREATE TABLE、CREATE VIEWなど、データベース操作に関する権限）とオブジェクト権限（SELECT、INSERT、UPDATE、DELETEなど、特定オブジェクトに対する権限）があります。ロールは複数の権限をグループ化したもので、CONNECT、RESOURCE、DBAなどの事前定義ロールがあります。GRANT文で権限を付与し、REVOKE文で取り消します。最小権限の原則に従い、必要最小限の権限のみを付与することが推奨されます。",
        code: `-- ユーザーの作成
CREATE USER app_user
IDENTIFIED BY "SecurePass123"
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 100M ON users;

-- システム権限の付与
GRANT CREATE SESSION TO app_user;
GRANT CREATE TABLE, CREATE VIEW TO app_user;

-- ロールの作成と権限付与
CREATE ROLE app_role;
GRANT SELECT, INSERT, UPDATE ON hr.employees TO app_role;
GRANT app_role TO app_user;

-- 事前定義ロール
GRANT CONNECT, RESOURCE TO app_user;
-- CONNECT: CREATE SESSION を含む
-- RESOURCE: CREATE TABLE, CREATE SEQUENCE 等を含む

-- 権限の確認
SELECT * FROM DBA_SYS_PRIVS WHERE GRANTEE = 'APP_USER';
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE = 'APP_USER';
SELECT * FROM DBA_ROLE_PRIVS WHERE GRANTEE = 'APP_USER';

-- 権限の取り消し
REVOKE CREATE TABLE FROM app_user;`,
      },
      {
        title: "表領域の基本",
        content:
          "表領域（Tablespace）はデータを格納する論理的なストレージ単位で、1つ以上のデータファイルで構成されます。SYSTEM表領域はデータディクショナリを格納し、SYSAUX表領域はオプションコンポーネントのデータを格納します。USERS表領域はユーザーデータのデフォルト格納先です。TEMP表領域はソートや一時的な処理の作業領域で、UNDO表領域はトランザクションのロールバック情報を保管します。表領域には永続表領域と一時表領域があり、永続表領域にはローカル管理とディクショナリ管理の2つの管理方式があります。ローカル管理方式がデフォルトで推奨されます。",
        code: `-- 表領域の作成
CREATE TABLESPACE app_data
DATAFILE '/u01/app/oracle/oradata/ORCL/app_data01.dbf'
SIZE 500M
AUTOEXTEND ON NEXT 100M MAXSIZE 2G
EXTENT MANAGEMENT LOCAL
SEGMENT SPACE MANAGEMENT AUTO;

-- 一時表領域の作成
CREATE TEMPORARY TABLESPACE app_temp
TEMPFILE '/u01/app/oracle/oradata/ORCL/app_temp01.dbf'
SIZE 200M;

-- 表領域の情報確認
SELECT tablespace_name,
       status,
       contents,
       extent_management
FROM DBA_TABLESPACES;

-- データファイルの情報確認
SELECT file_name,
       tablespace_name,
       bytes/1024/1024 AS "サイズ(MB)",
       autoextensible
FROM DBA_DATA_FILES;

-- 表領域の使用状況確認
SELECT tablespace_name,
       ROUND(used_space * 8192 / 1024 / 1024) AS "使用量(MB)",
       ROUND(tablespace_size * 8192 / 1024 / 1024) AS "合計(MB)"
FROM DBA_TABLESPACE_USAGE_METRICS;

-- 表領域の拡張
ALTER TABLESPACE app_data
ADD DATAFILE '/u01/app/oracle/oradata/ORCL/app_data02.dbf'
SIZE 500M AUTOEXTEND ON;`,
      },
      {
        title: "Oracle Net基礎",
        content:
          "Oracle Netはクライアントとデータベースサーバー間のネットワーク通信を管理するコンポーネントです。リスナー（Listener）はサーバー側で接続要求を受け付けるプロセスで、listener.oraファイルで構成されます。クライアント側ではtnsnames.oraファイルで接続先の情報（ネットサービス名）を定義します。接続文字列にはホスト名、ポート番号（デフォルト1521）、サービス名を含めます。Easy Connect構文（host:port/service_name）を使えばtnsnames.oraなしで直接接続できます。lsnrctlコマンドでリスナーの起動・停止・状態確認を行います。",
        code: `-- tnsnames.ora の設定例
-- $ORACLE_HOME/network/admin/tnsnames.ora
/*
ORCL =
  (DESCRIPTION =
    (ADDRESS = (PROTOCOL = TCP)(HOST = dbserver01)(PORT = 1521))
    (CONNECT_DATA =
      (SERVER = DEDICATED)
      (SERVICE_NAME = orcl.example.com)
    )
  )
*/

-- listener.ora の設定例
-- $ORACLE_HOME/network/admin/listener.ora
/*
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = dbserver01)(PORT = 1521))
    )
  )
SID_LIST_LISTENER =
  (SID_LIST =
    (SID_DESC =
      (GLOBAL_DBNAME = orcl.example.com)
      (ORACLE_HOME = /u01/app/oracle/product/19c)
      (SID_NAME = ORCL)
    )
  )
*/

-- リスナーの管理コマンド
-- $ lsnrctl start     -- リスナー起動
-- $ lsnrctl stop      -- リスナー停止
-- $ lsnrctl status    -- リスナー状態確認
-- $ lsnrctl reload    -- 設定の再読み込み

-- Easy Connect構文での接続
-- $ sqlplus hr/password@dbserver01:1521/orcl.example.com

-- SQL*Plusでの接続
-- $ sqlplus hr/password@ORCL`,
      },
    ],
  },

  // ── Silver DBA ──
  {
    id: "silver-arch",
    title: "アーキテクチャ詳細",
    description:
      "メモリ構造SGA/PGA詳細、プロセスアーキテクチャ、REDOログの仕組み",
    category: "silver-dba",
    sections: [
      {
        title: "SGA詳細",
        content:
          "SGAの共有プール（Shared Pool）はライブラリキャッシュとデータディクショナリキャッシュで構成されます。ライブラリキャッシュはSQL文の解析済み実行計画やPL/SQLのコンパイル済みコードを格納し、ハードパースを回避します。データディクショナリキャッシュはテーブル定義やユーザー情報などのメタデータを保持します。バッファキャッシュはDB_CACHE_SIZEで設定し、LRUアルゴリズムで管理されます。ラージプールはRMANバックアップのI/Oバッファや共有サーバー構成のセッションメモリに使用されます。Javaプールはサーバー側Javaの実行に、Streamsプールはレプリケーション機能に使用されます。",
        code: `-- 共有プールの詳細情報
SELECT pool, name, bytes/1024/1024 AS "サイズ(MB)"
FROM V$SGASTAT
WHERE pool = 'shared pool'
ORDER BY bytes DESC
FETCH FIRST 10 ROWS ONLY;

-- ライブラリキャッシュのヒット率
SELECT namespace,
       gets,
       gethits,
       ROUND(gethitratio * 100, 2) AS "ヒット率(%)"
FROM V$LIBRARYCACHE
WHERE namespace IN ('SQL AREA', 'TABLE/PROCEDURE');

-- バッファキャッシュの詳細
SELECT name, block_size, current_size/1024/1024 AS "サイズ(MB)"
FROM V$BUFFER_POOL;

-- SGA自動チューニングの確認
SELECT component,
       current_size/1024/1024 AS "現在(MB)",
       min_size/1024/1024     AS "最小(MB)",
       max_size/1024/1024     AS "最大(MB)",
       oper_count             AS "調整回数"
FROM V$SGA_DYNAMIC_COMPONENTS
WHERE current_size > 0;

-- SGAの推奨サイズ
SELECT SGA_SIZE AS "SGA(MB)",
       ESTD_DB_TIME_FACTOR AS "DB時間係数"
FROM V$SGA_TARGET_ADVICE
ORDER BY SGA_SIZE;`,
      },
      {
        title: "PGAとプロセスアーキテクチャ",
        content:
          "PGA（Program Global Area）は各サーバープロセスに個別に割り当てられるメモリ領域です。PGAにはソート領域（ソートやハッシュ結合の作業メモリ）、セッション情報、カーソル状態が含まれます。専用サーバー構成（Dedicated Server）ではクライアントごとに1つのサーバープロセスが割り当てられ、PGAはサーバープロセス内に確保されます。共有サーバー構成（Shared Server）ではディスパッチャが接続を受け、共有サーバープロセスのプールで処理します。この場合UGA（User Global Area）は共有プールまたはラージプールに配置されます。PGA_AGGREGATE_TARGETで全PGAの合計上限を設定できます。",
        code: `-- PGAの使用状況確認
SELECT name, value/1024/1024 AS "値(MB)"
FROM V$PGASTAT
WHERE name IN (
  'aggregate PGA target parameter',
  'aggregate PGA auto target',
  'total PGA allocated',
  'total PGA used for auto workareas',
  'maximum PGA allocated'
);

-- セッションごとのPGA使用量
SELECT s.sid, s.serial#, s.username,
       p.pga_used_mem/1024/1024   AS "PGA使用(MB)",
       p.pga_alloc_mem/1024/1024  AS "PGA割当(MB)",
       p.pga_max_mem/1024/1024    AS "PGA最大(MB)"
FROM V$SESSION s
JOIN V$PROCESS p ON s.paddr = p.addr
WHERE s.username IS NOT NULL
ORDER BY p.pga_used_mem DESC;

-- PGAの自動管理パラメータ
SHOW PARAMETER pga_aggregate_target;
SHOW PARAMETER workarea_size_policy;
-- workarea_size_policy = AUTO が推奨

-- PGA推奨サイズ
SELECT PGA_TARGET_FOR_ESTIMATE/1024/1024 AS "PGA(MB)",
       ESTD_PGA_CACHE_HIT_PERCENTAGE    AS "キャッシュヒット率(%)"
FROM V$PGA_TARGET_ADVICE;

-- 専用サーバー/共有サーバーの確認
SHOW PARAMETER shared_servers;
-- 0 = 専用サーバー構成`,
      },
      {
        title: "REDOログの仕組み",
        content:
          "REDOログはデータベースへのすべての変更を記録し、障害時のリカバリに使用されます。REDOログはグループとメンバーで構成され、各グループに複数のメンバー（ミラーコピー）を持つことが推奨されます。LGWRプロセスがREDOログバッファからREDOログファイルに書き込みます。ログスイッチは現在のグループが満杯になると次のグループに切り替わるイベントです。アーカイブログモード（ARCHIVELOG）ではログスイッチ時にARCnプロセスがREDOログをアーカイブファイルにコピーし、ポイントインタイムリカバリが可能になります。NOARCHIVELOGモードではメディアリカバリができないため、本番環境ではARCHIVELOGモードが必須です。",
        code: `-- REDOログの構成確認
SELECT group#, thread#, bytes/1024/1024 AS "サイズ(MB)",
       members, status
FROM V$LOG;

-- REDOログメンバー（物理ファイル）
SELECT group#, member, status
FROM V$LOGFILE
ORDER BY group#;

-- REDOログの追加
ALTER DATABASE ADD LOGFILE GROUP 4 (
  '/u01/app/oracle/oradata/ORCL/redo04a.log',
  '/u01/app/oracle/oradata/ORCL/redo04b.log'
) SIZE 200M;

-- 手動ログスイッチ
ALTER SYSTEM SWITCH LOGFILE;

-- アーカイブログモードへの変更
-- 1. データベースを停止
SHUTDOWN IMMEDIATE;
-- 2. MOUNT状態で起動
STARTUP MOUNT;
-- 3. アーカイブログモードに変更
ALTER DATABASE ARCHIVELOG;
-- 4. データベースをオープン
ALTER DATABASE OPEN;

-- アーカイブログモードの確認
SELECT LOG_MODE FROM V$DATABASE;  -- ARCHIVELOG or NOARCHIVELOG
ARCHIVE LOG LIST;

-- アーカイブログの出力先確認
SHOW PARAMETER log_archive_dest;`,
      },
    ],
  },
  {
    id: "silver-storage",
    title: "ストレージ管理",
    description:
      "表領域管理、セグメント/エクステント/ブロック、UNDO管理、一時表領域",
    category: "silver-dba",
    sections: [
      {
        title: "表領域管理",
        content:
          "表領域は論理的なストレージの管理単位で、物理的な1つ以上のデータファイルにマッピングされます。ローカル管理表領域はエクステントの割り当て情報をデータファイルのヘッダに保持し、ディクショナリ管理表領域より高性能です。ビッグファイル表領域は1つの巨大なデータファイルで構成され、超大規模データベースに適しています。スモールファイル表領域は複数のデータファイルを持てる従来型です。表領域はREAD ONLY/READ WRITEの切り替え、OFFLINE/ONLINEの状態管理が可能です。データファイルの自動拡張（AUTOEXTEND）を設定することで、容量不足時に自動的にファイルを拡張できます。",
        code: `-- ローカル管理表領域の作成（デフォルト）
CREATE TABLESPACE sales_data
DATAFILE '/u01/oradata/ORCL/sales01.dbf' SIZE 1G
AUTOEXTEND ON NEXT 256M MAXSIZE 5G
EXTENT MANAGEMENT LOCAL AUTOALLOCATE
SEGMENT SPACE MANAGEMENT AUTO;

-- ビッグファイル表領域
CREATE BIGFILE TABLESPACE big_data
DATAFILE '/u01/oradata/ORCL/bigdata01.dbf' SIZE 10G
AUTOEXTEND ON NEXT 1G MAXSIZE 32T;

-- 表領域をREAD ONLYに変更
ALTER TABLESPACE sales_data READ ONLY;
-- 読み取り専用（バックアップ後に変更不要）

-- 表領域をREAD WRITEに戻す
ALTER TABLESPACE sales_data READ WRITE;

-- 表領域のオフライン/オンライン
ALTER TABLESPACE sales_data OFFLINE;
ALTER TABLESPACE sales_data ONLINE;

-- データファイルのリサイズ
ALTER DATABASE DATAFILE '/u01/oradata/ORCL/sales01.dbf'
RESIZE 2G;

-- 表領域の使用率確認
SELECT t.tablespace_name,
       ROUND((t.total - NVL(f.free, 0)) / t.total * 100, 1) AS "使用率(%)"
FROM (SELECT tablespace_name, SUM(bytes)/1024/1024 AS total
      FROM DBA_DATA_FILES GROUP BY tablespace_name) t
LEFT JOIN (SELECT tablespace_name, SUM(bytes)/1024/1024 AS free
           FROM DBA_FREE_SPACE GROUP BY tablespace_name) f
ON t.tablespace_name = f.tablespace_name;`,
      },
      {
        title: "セグメント・エクステント・ブロック",
        content:
          "Oracleのストレージ階層は上位からテーブルスペース→セグメント→エクステント→データブロックです。セグメントはテーブルやインデックスなどのデータベースオブジェクトに対応する物理的な格納領域です。エクステントは連続したデータブロックの集まりで、セグメントに容量が必要になると新しいエクステントが割り当てられます。データブロック（DB_BLOCK_SIZE、通常8KB）はOracleのI/Oの最小単位です。ブロック内にはヘッダ、行データ、空き領域があり、PCTFREEパラメータでUPDATE用の空き領域を予約します。ハイウォーターマーク（HWM）はセグメント内でデータが書き込まれた最大位置を示し、フルテーブルスキャンはHWMまでの全ブロックを読みます。",
        code: `-- セグメントの情報確認
SELECT segment_name, segment_type,
       tablespace_name,
       bytes/1024/1024 AS "サイズ(MB)",
       extents AS "エクステント数",
       blocks AS "ブロック数"
FROM DBA_SEGMENTS
WHERE owner = 'HR'
ORDER BY bytes DESC;

-- エクステントの情報
SELECT segment_name, extent_id,
       bytes/1024 AS "サイズ(KB)",
       blocks AS "ブロック数"
FROM DBA_EXTENTS
WHERE owner = 'HR' AND segment_name = 'EMPLOYEES';

-- データブロックサイズの確認
SHOW PARAMETER db_block_size;
-- デフォルト: 8192 (8KB)

-- テーブルの物理格納パラメータ
SELECT table_name, pct_free, pct_used,
       num_rows, blocks, empty_blocks
FROM DBA_TABLES
WHERE owner = 'HR' AND table_name = 'EMPLOYEES';

-- PCTFREEの変更（UPDATE用の空き領域予約）
ALTER TABLE hr.employees PCTFREE 20;
-- デフォルトは10%（UPDATEが多いテーブルは大きめに）

-- セグメントの縮小（HWMのリセット）
ALTER TABLE hr.employees ENABLE ROW MOVEMENT;
ALTER TABLE hr.employees SHRINK SPACE;`,
      },
      {
        title: "UNDOと一時表領域",
        content:
          "UNDO表領域はトランザクションのロールバック情報を格納し、読み取り一貫性の保証、ロールバック処理、インスタンスリカバリに使用されます。自動UNDO管理（AUM）が推奨で、UNDO_RETENTIONパラメータでUNDOデータの保持期間（秒）を指定します。UNDO_RETENTIONはGUARANTEED指定がない場合はベストエフォートで、領域不足時は期限前でも上書きされます。ORA-01555（Snapshot too old）エラーはUNDO領域不足で読み取り一貫性が保てない場合に発生します。一時表領域はソート、ハッシュ結合、一時テーブルの作業領域として使用され、一時表領域グループで複数の一時表領域を束ねて使うことも可能です。",
        code: `-- UNDO表領域の確認
SELECT tablespace_name, status,
       contents, retention
FROM DBA_TABLESPACES
WHERE contents = 'UNDO';

-- UNDO管理パラメータ
SHOW PARAMETER undo_tablespace;
SHOW PARAMETER undo_retention;    -- 保持期間（秒）
SHOW PARAMETER undo_management;   -- AUTO が推奨

-- UNDOの使用状況
SELECT status, COUNT(*) AS "セグメント数",
       SUM(bytes)/1024/1024 AS "合計(MB)"
FROM DBA_UNDO_EXTENTS
GROUP BY status;
-- ACTIVE: 進行中のトランザクション
-- UNEXPIRED: 保持期間内
-- EXPIRED: 再利用可能

-- UNDO保持をGUARANTEEDに設定
ALTER TABLESPACE undotbs1 RETENTION GUARANTEE;

-- 一時表領域の作成
CREATE TEMPORARY TABLESPACE temp_grp1
TEMPFILE '/u01/oradata/ORCL/temp_grp1_01.dbf' SIZE 500M
AUTOEXTEND ON NEXT 100M MAXSIZE 2G;

-- 一時表領域グループ
ALTER TABLESPACE temp_grp1 TABLESPACE GROUP temp_group;
ALTER TABLESPACE temp02    TABLESPACE GROUP temp_group;

-- デフォルト一時表領域の変更
ALTER DATABASE DEFAULT TEMPORARY TABLESPACE temp_grp1;

-- 一時表領域の使用状況
SELECT tablespace_name,
       allocated_space/1024/1024 AS "割当(MB)",
       free_space/1024/1024      AS "空き(MB)"
FROM DBA_TEMP_FREE_SPACE;`,
      },
    ],
  },
  {
    id: "silver-user",
    title: "ユーザーセキュリティ管理",
    description:
      "ユーザー作成、権限・ロール、プロファイル、監査の設定",
    category: "silver-dba",
    sections: [
      {
        title: "ユーザー管理",
        content:
          "Oracle Databaseのユーザー管理では、CREATE USER文でユーザーを作成し、認証方式を指定します。パスワード認証が最も一般的で、データベース内にハッシュ化されたパスワードが保存されます。外部認証（OS認証）ではOS_AUTHENT_PREFIX（デフォルトOPS$）付きのユーザー名でOS認証を行います。デフォルト表領域とデフォルト一時表領域を指定し、QUOTA句で使用可能な容量を制限します。QUOTA UNLIMITEDは無制限を意味しますが、セキュリティ上推奨されません。アカウントのロック（ACCOUNT LOCK）とパスワード期限切れ（PASSWORD EXPIRE）で即座にアクセスを制限できます。",
        code: `-- ユーザーの作成（詳細設定付き）
CREATE USER report_user
IDENTIFIED BY "Rep0rt#2024"
DEFAULT TABLESPACE users
TEMPORARY TABLESPACE temp
QUOTA 500M ON users
QUOTA 100M ON app_data
ACCOUNT UNLOCK
PASSWORD EXPIRE;  -- 初回ログイン時にパスワード変更を強制

-- 外部認証（OS認証）ユーザー
CREATE USER OPS$osuser
IDENTIFIED EXTERNALLY;

-- ユーザーの変更
ALTER USER report_user
IDENTIFIED BY "NewP@ss2024"   -- パスワード変更
QUOTA UNLIMITED ON users      -- クォータ変更
ACCOUNT UNLOCK;               -- ロック解除

-- ユーザーのロック
ALTER USER report_user ACCOUNT LOCK;

-- ユーザー情報の確認
SELECT username, account_status, default_tablespace,
       temporary_tablespace, created, expiry_date
FROM DBA_USERS
WHERE username = 'REPORT_USER';

-- クォータの確認
SELECT tablespace_name,
       bytes/1024/1024 AS "使用量(MB)",
       max_bytes/1024/1024 AS "上限(MB)"
FROM DBA_TS_QUOTAS
WHERE username = 'REPORT_USER';

-- ユーザーの削除（オブジェクトも含めて）
DROP USER report_user CASCADE;`,
      },
      {
        title: "権限とロール",
        content:
          "Oracle Databaseの権限体系はシステム権限とオブジェクト権限の2種類です。システム権限はCREATE SESSION、CREATE TABLE、CREATE VIEW、ALTER SYSTEM、DROP ANY TABLEなど200種類以上あります。オブジェクト権限はSELECT、INSERT、UPDATE、DELETE、EXECUTE、REFERENCESなど特定オブジェクトに対する操作権限です。ロールは複数の権限を束ねた名前付きグループで、権限管理を簡素化します。事前定義ロールにはCONNECT（CREATE SESSION）、RESOURCE（CREATE TABLE等）、DBA（ほぼ全権限）があります。WITH ADMIN OPTIONはシステム権限の再付与を許可し、WITH GRANT OPTIONはオブジェクト権限の再付与を許可します。",
        code: `-- カスタムロールの作成
CREATE ROLE app_readonly;
CREATE ROLE app_readwrite;

-- ロールに権限を付与
GRANT SELECT ON hr.employees TO app_readonly;
GRANT SELECT ON hr.departments TO app_readonly;

GRANT app_readonly TO app_readwrite;  -- ロールにロールを付与
GRANT INSERT, UPDATE, DELETE ON hr.employees TO app_readwrite;

-- ユーザーにロールを付与
GRANT app_readonly TO report_user;
GRANT app_readwrite TO app_user;

-- WITH ADMIN OPTION（システム権限の再付与可能）
GRANT CREATE TABLE TO team_lead WITH ADMIN OPTION;

-- 権限の確認
SELECT * FROM DBA_SYS_PRIVS WHERE GRANTEE = 'APP_USER';
SELECT * FROM DBA_TAB_PRIVS WHERE GRANTEE = 'APP_READONLY';
SELECT * FROM DBA_ROLE_PRIVS WHERE GRANTEE = 'APP_USER';

-- ロールの有効化/無効化（セッション内）
SET ROLE app_readonly;
SET ROLE ALL;
SET ROLE ALL EXCEPT app_readwrite;

-- パスワード付きロール（セキュリティ強化）
CREATE ROLE secure_role IDENTIFIED BY "RoleP@ss1";
SET ROLE secure_role IDENTIFIED BY "RoleP@ss1";

-- 権限の取り消し
REVOKE app_readwrite FROM app_user;
DROP ROLE app_readwrite;`,
      },
      {
        title: "プロファイルと監査",
        content:
          "プロファイルはパスワードポリシーとリソース制限を定義する名前付きの設定です。パスワードポリシーにはFAILED_LOGIN_ATTEMPTS（ロックまでの失敗回数）、PASSWORD_LIFE_TIME（有効期間）、PASSWORD_REUSE_TIME/MAX（再利用制限）、PASSWORD_VERIFY_FUNCTION（複雑さの検証）があります。リソース制限にはSESSIONS_PER_USER（最大セッション数）、CPU_PER_SESSION/CALL、IDLE_TIME（アイドルタイムアウト）があります。統合監査（Unified Auditing）は12c以降の標準監査方式で、監査ポリシーを作成し有効化します。監査証跡はUNIFIED_AUDIT_TRAILビューで確認できます。",
        code: `-- プロファイルの作成
CREATE PROFILE secure_profile LIMIT
  -- パスワードポリシー
  FAILED_LOGIN_ATTEMPTS  5        -- 5回失敗でロック
  PASSWORD_LOCK_TIME     1/24     -- 1時間後に自動解除
  PASSWORD_LIFE_TIME     90       -- 90日で期限切れ
  PASSWORD_REUSE_TIME    365      -- 365日間は再利用不可
  PASSWORD_REUSE_MAX     12       -- 12回変更後に再利用可
  PASSWORD_GRACE_TIME    7        -- 期限切れ後7日の猶予
  PASSWORD_VERIFY_FUNCTION ora12c_verify_function
  -- リソース制限
  SESSIONS_PER_USER      5        -- 最大同時セッション数
  IDLE_TIME              30       -- 30分アイドルで切断
  CPU_PER_SESSION        UNLIMITED;

-- プロファイルをユーザーに割り当て
ALTER USER app_user PROFILE secure_profile;

-- 統合監査ポリシーの作成
CREATE AUDIT POLICY login_audit_policy
  ACTIONS LOGON, LOGOFF;

CREATE AUDIT POLICY dml_audit_policy
  ACTIONS INSERT ON hr.employees,
          UPDATE ON hr.employees,
          DELETE ON hr.employees;

-- 監査ポリシーの有効化
AUDIT POLICY login_audit_policy;
AUDIT POLICY dml_audit_policy BY app_user;

-- 監査ログの確認
SELECT event_timestamp, dbusername, action_name,
       object_schema, object_name, sql_text
FROM UNIFIED_AUDIT_TRAIL
WHERE dbusername = 'APP_USER'
ORDER BY event_timestamp DESC
FETCH FIRST 20 ROWS ONLY;`,
      },
    ],
  },
  {
    id: "silver-backup",
    title: "バックアップとリカバリ",
    description:
      "RMAN基礎、バックアップ戦略、リカバリシナリオ、フラッシュバック",
    category: "silver-dba",
    sections: [
      {
        title: "RMAN基礎",
        content:
          "RMAN（Recovery Manager）はOracleの標準バックアップ・リカバリツールです。RMANはデータベースのブロックレベルでバックアップを行い、使用済みブロックのみをバックアップするため効率的です。バックアップにはフルバックアップ（全データ）と増分バックアップ（変更分のみ）があります。バックアップセット（RMAN独自形式・圧縮可能）とイメージコピー（データファイルの完全コピー）の2種類の出力形式があります。RMANはFRA（Fast Recovery Area）をバックアップ先として使用でき、自動的な領域管理と保持ポリシーに基づく自動削除が可能です。制御ファイルの自動バックアップを有効にすることが強く推奨されます。",
        code: `-- RMAN への接続
-- $ rman target /
-- $ rman target sys/password@ORCL

-- 基本設定の確認
RMAN> SHOW ALL;

-- FRA（Fast Recovery Area）の設定
ALTER SYSTEM SET db_recovery_file_dest_size = 50G;
ALTER SYSTEM SET db_recovery_file_dest = '/u01/fra';

-- 制御ファイルの自動バックアップを有効化
RMAN> CONFIGURE CONTROLFILE AUTOBACKUP ON;

-- フルバックアップ（データベース全体）
RMAN> BACKUP DATABASE PLUS ARCHIVELOG;

-- 表領域のバックアップ
RMAN> BACKUP TABLESPACE users, app_data;

-- データファイルのバックアップ
RMAN> BACKUP DATAFILE 4;

-- 圧縮バックアップ
RMAN> BACKUP AS COMPRESSED BACKUPSET DATABASE;

-- イメージコピー（ファイルのコピー）
RMAN> BACKUP AS COPY DATABASE;

-- バックアップの確認
RMAN> LIST BACKUP SUMMARY;
RMAN> LIST BACKUP OF DATABASE;

-- 古いバックアップの削除
RMAN> DELETE OBSOLETE;`,
      },
      {
        title: "リカバリシナリオ",
        content:
          "リカバリには完全リカバリ（最新時点までの復旧）と不完全リカバリ（特定時点までの復旧・ポイントインタイムリカバリ）があります。完全リカバリはARCHIVELOGモードでバックアップとアーカイブログを使用して最新状態まで復旧します。データファイルの損失時はRESTORE（バックアップからファイルを復元）してRECOVER（REDOログを適用）します。不完全リカバリではRESET LOGSでデータベースをオープンし、新しいログシーケンスを開始します。制御ファイルの損失時は自動バックアップから復旧するか、残りのコピーから再作成します。RMAN DUPLICATEコマンドでテスト環境にデータベースを複製することも可能です。",
        code: `-- データファイルのリカバリ（完全リカバリ）
-- 1. 損傷したデータファイルをオフラインにする
ALTER DATABASE DATAFILE '/u01/oradata/ORCL/users01.dbf' OFFLINE;

-- 2. RMANでリストアとリカバリ
RMAN> RESTORE DATAFILE '/u01/oradata/ORCL/users01.dbf';
RMAN> RECOVER DATAFILE '/u01/oradata/ORCL/users01.dbf';

-- 3. データファイルをオンラインにする
ALTER DATABASE DATAFILE '/u01/oradata/ORCL/users01.dbf' ONLINE;

-- 表領域のリカバリ
RMAN> RESTORE TABLESPACE users;
RMAN> RECOVER TABLESPACE users;

-- ポイントインタイムリカバリ（不完全リカバリ）
RMAN> SHUTDOWN IMMEDIATE;
RMAN> STARTUP MOUNT;
RMAN> RESTORE DATABASE UNTIL TIME "TO_DATE('2024-03-15 10:00:00','YYYY-MM-DD HH24:MI:SS')";
RMAN> RECOVER DATABASE UNTIL TIME "TO_DATE('2024-03-15 10:00:00','YYYY-MM-DD HH24:MI:SS')";
RMAN> ALTER DATABASE OPEN RESETLOGS;

-- 制御ファイルのリカバリ（自動バックアップから）
RMAN> STARTUP NOMOUNT;
RMAN> RESTORE CONTROLFILE FROM AUTOBACKUP;
RMAN> ALTER DATABASE MOUNT;
RMAN> RESTORE DATABASE;
RMAN> RECOVER DATABASE;
RMAN> ALTER DATABASE OPEN RESETLOGS;`,
      },
      {
        title: "フラッシュバック技術",
        content:
          "フラッシュバック技術はデータの論理的な誤操作（誤DELETE、誤UPDATEなど）からの迅速な復旧手段です。Flashback QueryはAS OF句で過去の特定時点のデータを参照でき、UNDOデータを使用します。Flashback Tableはテーブル全体を過去の状態に戻し、ROW MOVEMENTが有効な必要があります。Flashback DropはDROP TABLEの取り消しで、ごみ箱（Recyclebin）からテーブルを復元します。Flashback Databaseはデータベース全体を過去の時点に戻す機能で、FRA上のフラッシュバックログを使用します。フラッシュバックデータベースは事前にdb_flashback_retention_targetの設定とフラッシュバックの有効化が必要です。",
        code: `-- Flashback Query（過去のデータを参照）
SELECT * FROM employees
AS OF TIMESTAMP (SYSTIMESTAMP - INTERVAL '1' HOUR);

-- SCN指定でのFlashback Query
SELECT * FROM employees
AS OF SCN 123456789;

-- Flashback Versions Query（変更履歴の確認）
SELECT employee_id, salary,
       versions_operation, versions_starttime, versions_endtime
FROM employees
VERSIONS BETWEEN TIMESTAMP
  (SYSTIMESTAMP - INTERVAL '2' HOUR)
  AND SYSTIMESTAMP
WHERE employee_id = 100;

-- Flashback Table（テーブルを過去の状態に復元）
ALTER TABLE employees ENABLE ROW MOVEMENT;
FLASHBACK TABLE employees
TO TIMESTAMP (SYSTIMESTAMP - INTERVAL '30' MINUTE);

-- Flashback Drop（DROP TABLEの取り消し）
DROP TABLE temp_data;  -- ごみ箱へ
SELECT object_name, original_name FROM RECYCLEBIN;
FLASHBACK TABLE temp_data TO BEFORE DROP;

-- Flashback Database（DB全体を過去に戻す）
-- 事前設定
ALTER SYSTEM SET db_flashback_retention_target = 1440;  -- 24時間
ALTER DATABASE FLASHBACK ON;

-- 実行
SHUTDOWN IMMEDIATE;
STARTUP MOUNT;
FLASHBACK DATABASE TO TIMESTAMP
  (SYSDATE - INTERVAL '2' HOUR);
ALTER DATABASE OPEN RESETLOGS;`,
      },
    ],
  },
  {
    id: "silver-network",
    title: "ネットワークと監視",
    description:
      "Oracle Net構成、リスナー、パフォーマンス監視、AWR/ADDM",
    category: "silver-dba",
    sections: [
      {
        title: "Oracle Net構成",
        content:
          "Oracle Netはクライアントとサーバー間の通信を管理するネットワーク層です。ネーミングメソッドにはローカルネーミング（tnsnames.ora）、ディレクトリネーミング（LDAP）、Easy Connect（接続文字列直接指定）があります。tnsnames.oraはクライアント側に配置し、ネットサービス名をTNS記述子（ホスト、ポート、サービス名）にマッピングします。sqlnet.oraはネットワークの一般設定で、ネーミングメソッドの優先順位（NAMES.DIRECTORY_PATH）やSQL*Netの暗号化・認証設定を行います。Oracle Net Configuration Assistantや Net Managerで GUI設定も可能ですが、本番環境ではテキスト直接編集が一般的です。",
        code: `-- tnsnames.ora（クライアント側接続定義）
/*
PROD_DB =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = prod-db01)(PORT = 1521))
      (ADDRESS = (PROTOCOL = TCP)(HOST = prod-db02)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SERVICE_NAME = prod.example.com)
      (FAILOVER_MODE =
        (TYPE = SELECT)(METHOD = BASIC)(RETRIES = 3)(DELAY = 5)
      )
    )
  )
*/

-- sqlnet.ora（ネットワーク一般設定）
/*
NAMES.DIRECTORY_PATH = (TNSNAMES, LDAP, EZCONNECT)
SQLNET.AUTHENTICATION_SERVICES = (NTS)
SQLNET.ENCRYPTION_CLIENT = REQUIRED
SQLNET.ENCRYPTION_TYPES_CLIENT = (AES256)
*/

-- Easy Connect構文での接続
-- sqlplus hr/password@prod-db01:1521/prod.example.com

-- TNS接続のテスト
-- $ tnsping PROD_DB

-- 接続テスト（SQL*Plus）
-- $ sqlplus hr/password@PROD_DB

-- 現在の接続情報確認
SELECT SYS_CONTEXT('USERENV', 'HOST') AS "クライアントホスト",
       SYS_CONTEXT('USERENV', 'IP_ADDRESS') AS "IPアドレス",
       SYS_CONTEXT('USERENV', 'SERVICE_NAME') AS "サービス名",
       SYS_CONTEXT('USERENV', 'INSTANCE_NAME') AS "インスタンス"
FROM dual;`,
      },
      {
        title: "リスナー管理",
        content:
          "リスナーはOracle Databaseサーバー上で動作し、クライアントからの接続要求を受け付けるプロセスです。listener.oraで静的登録（SID_LIST_LISTENER）と動的登録（LREG/PMONプロセスによる自動登録）を設定します。動的登録ではデータベースインスタンスが起動時に自動的にリスナーにサービスを登録するため、listener.oraの設定が不要です。LOCAL_LISTENERパラメータでリスナーのアドレスを指定します。lsnrctlコマンドラインツールでリスナーの起動・停止・状態確認・サービス一覧表示を行います。複数リスナーの構成やSCANリスナー（RAC環境）も設定可能です。接続集中時のリスナーログ解析はトラブルシューティングに重要です。",
        code: `-- listener.ora（サーバー側リスナー設定）
/*
LISTENER =
  (DESCRIPTION_LIST =
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = TCP)(HOST = dbserver)(PORT = 1521))
    )
    (DESCRIPTION =
      (ADDRESS = (PROTOCOL = IPC)(KEY = EXTPROC1521))
    )
  )

LOGGING_LISTENER = ON
LOG_DIRECTORY_LISTENER = /u01/app/oracle/diag/tnslsnr/dbserver/listener/trace
*/

-- lsnrctlコマンド
-- $ lsnrctl start        -- リスナー起動
-- $ lsnrctl stop         -- リスナー停止
-- $ lsnrctl status       -- 状態確認
-- $ lsnrctl services     -- サービス一覧
-- $ lsnrctl reload       -- 設定の再読み込み

-- 動的登録の確認
ALTER SYSTEM REGISTER;  -- 手動で即座にリスナーに登録

-- LOCAL_LISTENERの設定（動的登録先の指定）
ALTER SYSTEM SET LOCAL_LISTENER =
  '(ADDRESS=(PROTOCOL=TCP)(HOST=dbserver)(PORT=1521))';

-- リスナーの登録済みサービス確認
SELECT instance_name, service_name
FROM V$ACTIVE_SERVICES;

-- リスナーログの場所確認
-- $ORACLE_BASE/diag/tnslsnr/<hostname>/listener/trace/listener.log

-- 接続セッション数の確認
SELECT service_name, COUNT(*) AS "接続数"
FROM V$SESSION
WHERE service_name IS NOT NULL
GROUP BY service_name;`,
      },
      {
        title: "パフォーマンス監視",
        content:
          "Oracle Databaseのパフォーマンス監視にはAWR（Automatic Workload Repository）、ADDM（Automatic Database Diagnostic Monitor）、ASH（Active Session History）が重要です。AWRは一定間隔（デフォルト60分）でデータベースの統計スナップショットを自動収集し、パフォーマンスの傾向分析に使用します。ADDMはAWRデータを分析し、パフォーマンス問題の根本原因と改善推奨事項を自動生成します。ASHはアクティブなセッションの情報を毎秒サンプリングし、リアルタイムのパフォーマンス分析に使用します。V$ビュー（V$SESSION、V$SQL、V$SYSSTAT等）はインスタンスの動的パフォーマンス情報を提供し、リアルタイム監視に欠かせません。",
        code: `-- AWRスナップショットの手動取得
EXEC DBMS_WORKLOAD_REPOSITORY.CREATE_SNAPSHOT();

-- AWRレポートの生成
-- SQL*Plusで実行
-- @$ORACLE_HOME/rdbms/admin/awrrpt.sql

-- AWRスナップショットの一覧
SELECT snap_id, begin_interval_time, end_interval_time
FROM DBA_HIST_SNAPSHOT
ORDER BY snap_id DESC
FETCH FIRST 10 ROWS ONLY;

-- ADDMレポートの確認
SELECT finding_name, type, message
FROM DBA_ADVISOR_FINDINGS
WHERE task_name LIKE 'ADDM%'
ORDER BY task_name DESC
FETCH FIRST 20 ROWS ONLY;

-- ASH（Active Session History）でリアルタイム分析
SELECT session_id, sql_id, event,
       wait_class, session_state
FROM V$ACTIVE_SESSION_HISTORY
WHERE sample_time > SYSDATE - INTERVAL '10' MINUTE
ORDER BY sample_time DESC;

-- 待機イベントのTOP 10
SELECT event, total_waits, time_waited_micro/1000000 AS "待機時間(秒)"
FROM V$SYSTEM_EVENT
WHERE wait_class <> 'Idle'
ORDER BY time_waited_micro DESC
FETCH FIRST 10 ROWS ONLY;

-- SQL文の実行統計TOP 10（経過時間順）
SELECT sql_id, executions,
       elapsed_time/1000000 AS "経過時間(秒)",
       buffer_gets, disk_reads
FROM V$SQL
ORDER BY elapsed_time DESC
FETCH FIRST 10 ROWS ONLY;`,
      },
    ],
  },

  // ── Gold DBA ──
  {
    id: "gold-multitenant",
    title: "マルチテナント・アーキテクチャ",
    description:
      "CDB/PDB、PDB作成・管理、クローニング、リソース管理",
    category: "gold-dba",
    sections: [
      {
        title: "CDB/PDBアーキテクチャ",
        content:
          "マルチテナント・アーキテクチャ（12c以降）では、1つのCDB（Container Database）内に複数のPDB（Pluggable Database）を格納します。CDB$ROOTはCDB全体のメタデータとOracle提供オブジェクトを格納するルートコンテナです。PDB$SEEDは新しいPDBを作成する際のテンプレートとなるシードPDBで、読み取り専用です。各PDBは独立したスキーマ、データ、セキュリティを持つ論理的に独立したデータベースです。CDB管理者（共通ユーザー C##prefix）はCDB全体を管理し、PDB管理者（ローカルユーザー）は個々のPDBを管理します。V$CONTAINERSビューでコンテナ情報を確認できます。",
        code: `-- CDBか確認
SELECT CDB FROM V$DATABASE;  -- YES = CDB, NO = 非CDB

-- コンテナの一覧
SELECT con_id, name, open_mode, restricted
FROM V$CONTAINERS
ORDER BY con_id;

-- 現在のコンテナを確認
SHOW CON_NAME;
SHOW CON_ID;

-- コンテナの切り替え
ALTER SESSION SET CONTAINER = PDB1;
ALTER SESSION SET CONTAINER = CDB$ROOT;

-- 共通ユーザーの作成（CDB$ROOTで実行）
CREATE USER C##admin
IDENTIFIED BY "Admin#2024"
CONTAINER = ALL;
GRANT DBA TO C##admin CONTAINER = ALL;

-- ローカルユーザーの作成（PDB内で実行）
ALTER SESSION SET CONTAINER = PDB1;
CREATE USER app_user
IDENTIFIED BY "App#2024";
GRANT CONNECT, RESOURCE TO app_user;

-- PDBの一覧確認
SELECT pdb_name, status, con_id
FROM CDB_PDBS
ORDER BY con_id;

-- すべてのPDBを一括オープン
ALTER PLUGGABLE DATABASE ALL OPEN;`,
      },
      {
        title: "PDB作成と管理",
        content:
          "PDBの作成はCREATE PLUGGABLE DATABASE文で行い、PDB$SEEDからのクローン作成が基本です。PDBは作成直後はMOUNTED状態のため、ALTER PLUGGABLE DATABASE ... OPENでオープンする必要があります。データベース起動時にPDBを自動オープンするにはSAVE STATE句を使用します。PDBのアンプラグ（UNPLUG）はPDBをXMLメタデータファイルとしてエクスポートし、プラグ（PLUG）は別のCDBにインポートする操作です。これによりPDBの移行やクローニングが容易になります。PDBの削除はDROP PLUGGABLE DATABASE文で行い、データファイルも含めて削除するにはINCLUDING DATAFILESを指定します。",
        code: `-- PDB$SEEDからPDBを作成
CREATE PLUGGABLE DATABASE pdb_sales
ADMIN USER pdb_admin IDENTIFIED BY "PdbAdmin#1"
FILE_NAME_CONVERT = (
  '/u01/oradata/ORCL/pdbseed/',
  '/u01/oradata/ORCL/pdb_sales/'
);

-- PDBのオープン
ALTER PLUGGABLE DATABASE pdb_sales OPEN;

-- PDBの自動オープン設定（再起動後もオープン）
ALTER PLUGGABLE DATABASE pdb_sales SAVE STATE;

-- PDBのクローズ
ALTER PLUGGABLE DATABASE pdb_sales CLOSE IMMEDIATE;

-- PDBのアンプラグ（XMLメタデータの生成）
ALTER PLUGGABLE DATABASE pdb_sales CLOSE IMMEDIATE;
ALTER PLUGGABLE DATABASE pdb_sales
UNPLUG INTO '/u01/export/pdb_sales.xml';

-- PDBの削除
DROP PLUGGABLE DATABASE pdb_sales INCLUDING DATAFILES;

-- 別のCDBにPDBをプラグイン
CREATE PLUGGABLE DATABASE pdb_sales
USING '/u01/export/pdb_sales.xml'
FILE_NAME_CONVERT = (
  '/u01/oradata/ORCL1/pdb_sales/',
  '/u01/oradata/ORCL2/pdb_sales/'
);

-- PDBの名前変更
ALTER PLUGGABLE DATABASE pdb_sales CLOSE IMMEDIATE;
ALTER PLUGGABLE DATABASE pdb_sales
OPEN RESTRICTED;
ALTER PLUGGABLE DATABASE pdb_sales
RENAME GLOBAL_NAME TO pdb_sales_new;`,
      },
      {
        title: "クローニングとリソース管理",
        content:
          "PDBクローニングは既存のPDBから新しいPDBを作成する機能で、ローカルクローン（同じCDB内）とリモートクローン（DBリンク経由で別CDBから）があります。ホットクローン（12.2以降）はソースPDBがオープン中でもクローン作成が可能です。リフレッシャブルPDBはソースPDBとの定期的な同期が可能なクローンです。CDBリソース管理はPDB間のリソース（CPU、メモリ、I/O）配分を制御します。CDBリソースプランでPDBごとのCPUシェアやリソース上限を設定し、PDB内ではPDB固有のリソースプランでユーザー間のリソース配分を制御します。",
        code: `-- ローカルクローン（同じCDB内でPDBを複製）
CREATE PLUGGABLE DATABASE pdb_sales_clone
FROM pdb_sales
FILE_NAME_CONVERT = (
  '/u01/oradata/ORCL/pdb_sales/',
  '/u01/oradata/ORCL/pdb_sales_clone/'
);
ALTER PLUGGABLE DATABASE pdb_sales_clone OPEN;

-- リモートクローン（DBリンク経由）
CREATE DATABASE LINK remote_cdb
CONNECT TO C##clone_user IDENTIFIED BY "Clone#1"
USING 'REMOTE_CDB';

CREATE PLUGGABLE DATABASE pdb_remote_clone
FROM pdb_sales@remote_cdb
FILE_NAME_CONVERT = (
  '/u01/oradata/REMOTE/pdb_sales/',
  '/u01/oradata/ORCL/pdb_remote_clone/'
);

-- CDBリソースプランの作成
BEGIN
  DBMS_RESOURCE_MANAGER.CREATE_CDB_PLAN(
    plan => 'cdb_resource_plan',
    comment => 'CDBリソース配分プラン'
  );
  -- PDBごとのシェア設定
  DBMS_RESOURCE_MANAGER.CREATE_CDB_PLAN_DIRECTIVE(
    plan => 'cdb_resource_plan',
    pluggable_database => 'PDB_SALES',
    shares => 3,                -- CPUシェア
    utilization_limit => 80,    -- CPU上限80%
    parallel_server_limit => 50 -- パラレル実行上限50%
  );
  DBMS_RESOURCE_MANAGER.VALIDATE_PENDING_AREA();
  DBMS_RESOURCE_MANAGER.SUBMIT_PENDING_AREA();
END;
/

-- PDBのメモリ上限設定
ALTER SYSTEM SET SGA_MIN_SIZE = 256M SCOPE = BOTH;
ALTER SYSTEM SET DB_CACHE_SIZE = 512M SCOPE = BOTH;`,
      },
    ],
  },
  {
    id: "gold-rman",
    title: "高度なバックアップ/リカバリ",
    description:
      "RMAN詳細、増分バックアップ、ブロックチェンジトラッキング、重複DB",
    category: "gold-dba",
    sections: [
      {
        title: "増分バックアップ",
        content:
          "増分バックアップは前回のバックアップ以降に変更されたブロックのみをバックアップする方式です。レベル0は全ブロックのバックアップ（増分バックアップのベースライン）で、レベル1は変更ブロックのみです。差分増分（DIFFERENTIAL・デフォルト）はレベル0または直前のレベル1以降の変更を取得し、累積増分（CUMULATIVE）はレベル0以降の全変更を取得します。累積増分はリカバリ時間が短いですがバックアップサイズが大きくなります。ブロックチェンジトラッキング（BCT）を有効にすると、変更ブロックをビットマップで追跡し、増分バックアップの速度が大幅に向上します。BCTファイルはFRAまたは指定のディレクトリに配置します。",
        code: `-- ブロックチェンジトラッキングの有効化
ALTER DATABASE ENABLE BLOCK CHANGE TRACKING
USING FILE '/u01/fra/ORCL/bct/change_tracking.ctf';

-- BCTの状態確認
SELECT filename, status, bytes/1024/1024 AS "サイズ(MB)"
FROM V$BLOCK_CHANGE_TRACKING;

-- レベル0（ベースライン）バックアップ
RMAN> BACKUP INCREMENTAL LEVEL 0 DATABASE
      TAG 'WEEKLY_FULL'
      PLUS ARCHIVELOG;

-- レベル1差分増分バックアップ（デフォルト）
RMAN> BACKUP INCREMENTAL LEVEL 1 DATABASE
      TAG 'DAILY_DIFF';

-- レベル1累積増分バックアップ
RMAN> BACKUP INCREMENTAL LEVEL 1 CUMULATIVE DATABASE
      TAG 'DAILY_CUM';

-- 増分更新バックアップ戦略（推奨）
-- イメージコピーにレベル1増分を適用して最新化
RMAN> RECOVER COPY OF DATABASE WITH TAG 'incr_update';
RMAN> BACKUP INCREMENTAL LEVEL 1
      FOR RECOVER OF COPY WITH TAG 'incr_update' DATABASE;

-- バックアップの検証（リストアテスト）
RMAN> RESTORE DATABASE VALIDATE;
RMAN> RESTORE TABLESPACE users VALIDATE;`,
      },
      {
        title: "RMANカタログと設定",
        content:
          "RMANリカバリカタログは専用のデータベースにバックアップメタデータを一元管理する仕組みです。制御ファイルの自動バックアップ情報に依存しないため、制御ファイルの完全消失時にも対応できます。カタログデータベースにRCATユーザーを作成し、REGISTER DATABASEで対象データベースを登録します。CONFIGURE設定はバックアップのデフォルト動作を定義し、保持ポリシー（RETENTION POLICY）でバックアップの自動期限管理を行います。保持ポリシーにはリカバリウィンドウ方式（指定日数以内のリカバリを保証）と冗長性方式（指定コピー数を保持）があります。暗号化設定でバックアップのセキュリティを強化できます。",
        code: `-- リカバリカタログの作成
-- カタログDBでカタログユーザーを作成
CREATE USER rcat IDENTIFIED BY "Rcat#2024"
DEFAULT TABLESPACE rcat_ts QUOTA UNLIMITED ON rcat_ts;
GRANT RECOVERY_CATALOG_OWNER TO rcat;

-- カタログの作成とDB登録
-- $ rman catalog rcat/Rcat#2024@catdb
RMAN> CREATE CATALOG;
-- $ rman target / catalog rcat/Rcat#2024@catdb
RMAN> REGISTER DATABASE;

-- 保持ポリシーの設定（リカバリウィンドウ方式）
RMAN> CONFIGURE RETENTION POLICY TO RECOVERY WINDOW OF 7 DAYS;

-- 保持ポリシー（冗長性方式）
RMAN> CONFIGURE RETENTION POLICY TO REDUNDANCY 2;

-- デフォルトデバイスの設定
RMAN> CONFIGURE DEFAULT DEVICE TYPE TO DISK;
RMAN> CONFIGURE DEVICE TYPE DISK PARALLELISM 4;

-- バックアップの最適化（同一ファイルの重複を回避）
RMAN> CONFIGURE BACKUP OPTIMIZATION ON;

-- バックアップ暗号化の設定
RMAN> CONFIGURE ENCRYPTION FOR DATABASE ON;
RMAN> SET ENCRYPTION ON IDENTIFIED BY "BackupKey#1" ONLY;

-- 圧縮設定
RMAN> CONFIGURE COMPRESSION ALGORITHM 'MEDIUM';

-- 全設定の表示
RMAN> SHOW ALL;

-- 設定のリセット
RMAN> CONFIGURE RETENTION POLICY CLEAR;`,
      },
      {
        title: "重複データベース",
        content:
          "RMAN DUPLICATEコマンドはバックアップからデータベースの完全なコピー（重複データベース）を作成します。テスト環境やDR（災害復旧）環境の構築に使用されます。アクティブ重複（FROM ACTIVE DATABASE）はネットワーク経由でソースDBから直接データを転送し、バックアップを経由しません。バックアップベースの重複はRMANバックアップから復元して重複を作成します。重複時にDBID、DB名、データファイルの場所を変更でき、NOFILENAMECHECK句で同一サーバーへの重複も可能です。SPFILEパラメータの変更もDUPLICATE文内で指定できます。Data Guard環境のスタンバイデータベース作成もDUPLICATE FOR STANDBY文で実行できます。",
        code: `-- アクティブ重複（ネットワーク経由）
-- 補助インスタンスを起動（pfile使用）
-- $ rman target sys/pass@PROD auxiliary sys/pass@TEST

RMAN> DUPLICATE TARGET DATABASE TO testdb
FROM ACTIVE DATABASE
DB_FILE_NAME_CONVERT = (
  '/u01/oradata/PROD/', '/u01/oradata/TEST/'
)
SPFILE
  PARAMETER_VALUE_CONVERT = (
    'PROD', 'TEST'
  )
  SET DB_UNIQUE_NAME = 'TESTDB'
  SET LOG_ARCHIVE_DEST_1 = 'LOCATION=/u01/fra/TEST'
  SET CONTROL_FILES = '/u01/oradata/TEST/control01.ctl';

-- バックアップベースの重複
RMAN> DUPLICATE TARGET DATABASE TO testdb
BACKUP LOCATION '/u01/backup/'
DB_FILE_NAME_CONVERT = (
  '/u01/oradata/PROD/', '/u01/oradata/TEST/'
)
NOFILENAMECHECK;

-- 特定時点への重複（ポイントインタイム）
RMAN> DUPLICATE TARGET DATABASE TO testdb
UNTIL TIME "TO_DATE('2024-03-20 12:00:00','YYYY-MM-DD HH24:MI:SS')"
DB_FILE_NAME_CONVERT = (
  '/u01/oradata/PROD/', '/u01/oradata/TEST/'
);

-- スタンバイデータベースの作成
RMAN> DUPLICATE TARGET DATABASE
FOR STANDBY
FROM ACTIVE DATABASE
DORECOVER
DB_FILE_NAME_CONVERT = (
  '/u01/oradata/PROD/', '/u01/oradata/STBY/'
);`,
      },
    ],
  },
  {
    id: "gold-dataguard",
    title: "Data Guard",
    description:
      "フィジカル/ロジカルスタンバイ、スイッチオーバー/フェイルオーバー、Active Data Guard",
    category: "gold-dba",
    sections: [
      {
        title: "Data Guard基礎",
        content:
          "Oracle Data Guardは災害復旧（DR）とデータ保護のためのソリューションで、プライマリDBのREDOデータをスタンバイDBに転送・適用します。フィジカルスタンバイはREDOの物理的な適用（ブロックレベル）でプライマリと完全に同一のデータを維持し、最も一般的に使用されます。ロジカルスタンバイはREDOをSQLに変換して適用するため、スタンバイ側で追加の表やインデックスを作成できます。REDO転送モードには同期転送（SYNC・データ損失ゼロ）と非同期転送（ASYNC・パフォーマンス重視）があります。保護モードは最大保護、最大可用性、最大パフォーマンスの3つがあります。",
        code: `-- Data Guard構成の確認
SELECT DATABASE_ROLE, PROTECTION_MODE, PROTECTION_LEVEL,
       SWITCHOVER_STATUS
FROM V$DATABASE;

-- プライマリDBの設定
ALTER SYSTEM SET LOG_ARCHIVE_CONFIG =
  'DG_CONFIG=(PROD,STBY)';
ALTER SYSTEM SET LOG_ARCHIVE_DEST_2 =
  'SERVICE=STBY ASYNC NOAFFIRM
   VALID_FOR=(ONLINE_LOGFILE,PRIMARY_ROLE)
   DB_UNIQUE_NAME=STBY';
ALTER SYSTEM SET FAL_SERVER = 'STBY';
ALTER SYSTEM SET FAL_CLIENT = 'PROD';

-- スタンバイREDOログの追加（プライマリとスタンバイ両方）
ALTER DATABASE ADD STANDBY LOGFILE GROUP 4 SIZE 200M;
ALTER DATABASE ADD STANDBY LOGFILE GROUP 5 SIZE 200M;
ALTER DATABASE ADD STANDBY LOGFILE GROUP 6 SIZE 200M;

-- REDO適用の開始（フィジカルスタンバイ）
ALTER DATABASE RECOVER MANAGED STANDBY DATABASE DISCONNECT;

-- REDO適用の停止
ALTER DATABASE RECOVER MANAGED STANDBY DATABASE CANCEL;

-- 保護モードの変更
ALTER DATABASE SET STANDBY DATABASE TO MAXIMIZE AVAILABILITY;
-- MAXIMIZE PROTECTION: データ損失ゼロ・SYNC必須
-- MAXIMIZE AVAILABILITY: 通常はSYNC・障害時は非同期にフォールバック
-- MAXIMIZE PERFORMANCE: 非同期・パフォーマンス最優先（デフォルト）

-- アーカイブログの転送状況確認
SELECT DEST_ID, STATUS, DESTINATION, ERROR
FROM V$ARCHIVE_DEST WHERE DEST_ID <= 3;`,
      },
      {
        title: "スイッチオーバーとフェイルオーバー",
        content:
          "スイッチオーバーはプライマリとスタンバイの役割を計画的に交換する操作で、データ損失なしで実行されます。メンテナンスやDR訓練に使用され、元に戻すことも容易です。フェイルオーバーはプライマリDBの障害時にスタンバイをプライマリに昇格させる緊急操作で、非同期転送の場合はデータ損失の可能性があります。Data Guard Brokerはdgmgrlコマンドラインツールで、スイッチオーバー/フェイルオーバーを簡単に実行できます。ファストスタートフェイルオーバー（FSFO）は障害検出時の自動フェイルオーバーを実現し、Observer（監視プロセス）が障害を検知して自動的にスタンバイを昇格させます。",
        code: `-- Data Guard Brokerの設定
ALTER SYSTEM SET DG_BROKER_START = TRUE;

-- dgmgrlでの接続と構成
-- $ dgmgrl sys/password@PROD
-- DGMGRL> CREATE CONFIGURATION 'dg_config'
--   AS PRIMARY DATABASE IS 'PROD'
--   CONNECT IDENTIFIER IS 'PROD';
-- DGMGRL> ADD DATABASE 'STBY'
--   AS CONNECT IDENTIFIER IS 'STBY';
-- DGMGRL> ENABLE CONFIGURATION;

-- 構成の確認
-- DGMGRL> SHOW CONFIGURATION;
-- DGMGRL> SHOW DATABASE 'PROD';
-- DGMGRL> SHOW DATABASE 'STBY';

-- Brokerによるスイッチオーバー
-- DGMGRL> SWITCHOVER TO 'STBY';
-- → PRODがスタンバイに、STBYがプライマリになる

-- Brokerによるフェイルオーバー（プライマリ障害時）
-- DGMGRL> FAILOVER TO 'STBY';

-- ファストスタートフェイルオーバーの設定
-- DGMGRL> ENABLE FAST_START FAILOVER;
-- Observerの起動（第三のサーバーで実行）
-- $ dgmgrl sys/password@PROD
-- DGMGRL> START OBSERVER;

-- 手動スイッチオーバー（Brokerなし）
-- プライマリ側
ALTER DATABASE COMMIT TO SWITCHOVER TO STANDBY WITH SESSION SHUTDOWN;
-- スタンバイ側
ALTER DATABASE COMMIT TO SWITCHOVER TO PRIMARY;
ALTER DATABASE OPEN;`,
      },
      {
        title: "Active Data Guard",
        content:
          "Active Data Guardはフィジカルスタンバイデータベースをリアルタイムでクエリ可能にするオプションです。通常のフィジカルスタンバイはリカバリ中に読み取り専用でオープンできませんが、Active Data GuardではREDO適用を続けながら読み取り専用でオープンでき、レポート処理やバックアップの負荷分散に使用されます。Far Sync インスタンスはプライマリとスタンバイの中間に配置し、同期転送の距離制限を克服します。カスケードスタンバイは別のスタンバイからREDOを受信する構成で、プライマリの負荷を軽減します。Active Data Guard DMLリダイレクト（19c以降）はスタンバイでのDMLを自動的にプライマリに転送する機能です。",
        code: `-- Active Data Guard: REDO適用中に読み取り専用オープン
-- スタンバイDBで実行
ALTER DATABASE OPEN READ ONLY;
ALTER DATABASE RECOVER MANAGED STANDBY DATABASE DISCONNECT;
-- → REDO適用しながら読み取り専用クエリが可能

-- リアルタイムクエリの確認
SELECT OPEN_MODE FROM V$DATABASE;
-- READ ONLY WITH APPLY（Active Data Guard状態）

-- データの遅延確認
SELECT name, value, datum_time
FROM V$DATAGUARD_STATS
WHERE name IN ('transport lag', 'apply lag');

-- Far Syncインスタンスの作成
-- Far Sync用の制御ファイルを作成
-- RMAN> DUPLICATE TARGET DATABASE FOR FARSYNC
--   STANDBY CONTROLFILE;

-- カスケードスタンバイの構成
-- スタンバイ1がプライマリからREDOを受信
-- スタンバイ2がスタンバイ1からREDOを受信
-- スタンバイ1の設定:
ALTER SYSTEM SET LOG_ARCHIVE_DEST_2 =
  'SERVICE=STBY2 ASYNC
   VALID_FOR=(STANDBY_LOGFILE,STANDBY_ROLE)
   DB_UNIQUE_NAME=STBY2';

-- Active Data Guard DMLリダイレクト（19c以降）
-- スタンバイ側で有効化
ALTER SYSTEM SET ADG_REDIRECT_DML = TRUE;
-- スタンバイに接続してDML実行 → 自動的にプライマリに転送
INSERT INTO hr.employees (employee_id, first_name, last_name)
VALUES (999, 'Test', 'User');
-- → プライマリで実行され、REDOでスタンバイに反映

-- スタンバイDBでのバックアップ（プライマリの負荷軽減）
-- $ rman target /
RMAN> BACKUP DATABASE PLUS ARCHIVELOG;`,
      },
    ],
  },
  {
    id: "gold-tuning",
    title: "パフォーマンス管理",
    description:
      "SQLチューニング、実行計画、SQL Tuning Advisor、Resource Manager、ASM",
    category: "gold-dba",
    sections: [
      {
        title: "実行計画とSQLチューニング",
        content:
          "SQL実行計画はオプティマイザがSQL文の最適な実行方法を決定した結果で、パフォーマンスチューニングの基本です。EXPLAIN PLANコマンドで実行計画を取得し、DBMS_XPLAN.DISPLAY関数で表示します。実行計画にはアクセスパス（TABLE ACCESS FULL、INDEX RANGE SCAN等）、結合方法（NESTED LOOPS、HASH JOIN、MERGE JOIN）、操作順序が含まれます。コストベースオプティマイザ（CBO）は統計情報に基づいて最適な計画を選択します。オプティマイザヒントでCBOの判断を上書きできますが、統計情報の最新化が先決です。AUTOTRACE機能やV$SQL_PLANビューでも実行計画を確認できます。",
        code: `-- EXPLAIN PLANで実行計画を取得
EXPLAIN PLAN FOR
SELECT e.first_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 10000;

-- 実行計画の表示
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY());

-- 実際の実行統計を含む実行計画
SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY_CURSOR(
  sql_id => 'abc123def456',
  format => 'ALLSTATS LAST'
));

-- オプティマイザヒントの使用
SELECT /*+ INDEX(e emp_salary_idx) */ first_name, salary
FROM employees e
WHERE salary > 10000;

SELECT /*+ FULL(e) PARALLEL(e, 4) */ COUNT(*)
FROM employees e;

SELECT /*+ USE_HASH(e d) */ e.first_name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.department_id;

-- 統計情報の収集（チューニングの前提条件）
EXEC DBMS_STATS.GATHER_TABLE_STATS('HR', 'EMPLOYEES');
EXEC DBMS_STATS.GATHER_SCHEMA_STATS('HR');

-- SQL*PlusでAUTOTRACE
SET AUTOTRACE ON;
SELECT * FROM employees WHERE department_id = 10;
SET AUTOTRACE OFF;

-- V$SQL_PLANで実行中SQLの計画確認
SELECT operation, options, object_name, cost, cardinality
FROM V$SQL_PLAN
WHERE sql_id = 'abc123def456'
ORDER BY id;`,
      },
      {
        title: "SQL Tuning Advisor",
        content:
          "SQL Tuning Advisor（STA）はOracle Databaseの自動SQLチューニング機能で、問題のあるSQL文を分析し改善推奨事項を生成します。STAは統計分析、アクセスパス分析、SQL構造分析、SQLプロファイル作成の4つの分析を行います。SQLプロファイルはCBOに追加の統計情報を提供し、より良い実行計画を選択させる補助情報です。SQL計画ベースラインは特定の実行計画を固定し、計画の変動（プランリグレッション）を防止します。自動SQLチューニングタスクはメンテナンスウィンドウ中に自動実行され、高負荷SQLに対する推奨を生成します。DBMS_SQLTUNEパッケージでSQLチューニングアドバイザをプログラム的に操作できます。",
        code: `-- SQLチューニングアドバイザの手動実行
DECLARE
  l_task_name VARCHAR2(30);
BEGIN
  -- チューニングタスクの作成
  l_task_name := DBMS_SQLTUNE.CREATE_TUNING_TASK(
    sql_id    => 'abc123def456',
    scope     => DBMS_SQLTUNE.SCOPE_COMPREHENSIVE,
    time_limit => 300,  -- 最大300秒
    task_name => 'tune_slow_query'
  );
  -- タスクの実行
  DBMS_SQLTUNE.EXECUTE_TUNING_TASK('tune_slow_query');
END;
/

-- 推奨結果の確認
SELECT DBMS_SQLTUNE.REPORT_TUNING_TASK('tune_slow_query')
FROM dual;

-- SQLプロファイルの承認（推奨された場合）
EXEC DBMS_SQLTUNE.ACCEPT_SQL_PROFILE(
  task_name => 'tune_slow_query',
  name      => 'profile_slow_query'
);

-- SQL計画ベースラインの作成
DECLARE
  l_plans PLS_INTEGER;
BEGIN
  l_plans := DBMS_SPM.LOAD_PLANS_FROM_CURSOR_CACHE(
    sql_id => 'abc123def456'
  );
END;
/

-- ベースラインの確認
SELECT sql_handle, plan_name, enabled, accepted, fixed
FROM DBA_SQL_PLAN_BASELINES;

-- 自動SQLチューニングレポート
SELECT DBMS_AUTO_SQLTUNE.REPORT_AUTO_TUNING_TASK()
FROM dual;`,
      },
      {
        title: "Resource ManagerとASM",
        content:
          "Oracle Resource Managerはデータベース内のリソース（CPU、パラレル実行、アクティブセッション数）を消費者グループ間で公平に配分する機能です。リソースプランはリソース配分のルール集合で、プランディレクティブで各消費者グループへの配分比率や上限を定義します。消費者グループにユーザーをマッピングし、自動切り替えルールで長時間クエリを低優先度グループに移動できます。ASM（Automatic Storage Management）はOracle専用のストレージ管理で、ディスクグループ単位でストレージを管理します。ASMはミラーリング（NORMAL/HIGH/EXTERNAL）、自動リバランス、ストライピングを提供し、DBAのストレージ管理を簡素化します。",
        code: `-- Resource Managerの構成
BEGIN
  -- ペンディングエリアの作成
  DBMS_RESOURCE_MANAGER.CREATE_PENDING_AREA();

  -- 消費者グループの作成
  DBMS_RESOURCE_MANAGER.CREATE_CONSUMER_GROUP(
    consumer_group => 'OLTP_GROUP',
    comment => 'OLTPアプリケーション用'
  );
  DBMS_RESOURCE_MANAGER.CREATE_CONSUMER_GROUP(
    consumer_group => 'BATCH_GROUP',
    comment => 'バッチ処理用'
  );

  -- リソースプランの作成
  DBMS_RESOURCE_MANAGER.CREATE_PLAN(
    plan => 'BUSINESS_PLAN',
    comment => '業務用リソースプラン'
  );

  -- プランディレクティブ
  DBMS_RESOURCE_MANAGER.CREATE_PLAN_DIRECTIVE(
    plan => 'BUSINESS_PLAN',
    group_or_subplan => 'OLTP_GROUP',
    mgmt_p1 => 70,         -- CPU 70%
    parallel_server_limit => 50
  );
  DBMS_RESOURCE_MANAGER.CREATE_PLAN_DIRECTIVE(
    plan => 'BUSINESS_PLAN',
    group_or_subplan => 'BATCH_GROUP',
    mgmt_p1 => 20,         -- CPU 20%
    parallel_server_limit => 80
  );

  DBMS_RESOURCE_MANAGER.VALIDATE_PENDING_AREA();
  DBMS_RESOURCE_MANAGER.SUBMIT_PENDING_AREA();
END;
/

-- リソースプランの有効化
ALTER SYSTEM SET RESOURCE_MANAGER_PLAN = 'BUSINESS_PLAN';

-- ASMディスクグループの確認
SELECT name, type, total_mb, free_mb, state
FROM V$ASM_DISKGROUP;

-- ASMディスクグループの作成（ASMインスタンスで実行）
CREATE DISKGROUP DATA_DG
NORMAL REDUNDANCY
DISK '/dev/oracleasm/disk1', '/dev/oracleasm/disk2',
     '/dev/oracleasm/disk3', '/dev/oracleasm/disk4';`,
      },
    ],
  },
  {
    id: "gold-security",
    title: "セキュリティと高度な管理",
    description:
      "TDE、VPD、監査統合、Scheduler、データポンプの活用",
    category: "gold-dba",
    sections: [
      {
        title: "TDE（透過的データ暗号化）",
        content:
          "TDE（Transparent Data Encryption）はデータファイルとバックアップを暗号化し、物理メディアの盗難からデータを保護する機能です。列暗号化は特定の列を暗号化し、表領域暗号化は表領域内の全データを暗号化します。表領域暗号化はパフォーマンスへの影響が小さく推奨されます。TDEはキーストア（旧称Oracle Wallet）でマスター暗号化キーを管理します。ソフトウェアキーストア（ファイルベース）とハードウェアキーストア（HSM）があります。TDEで暗号化されたデータはSGA内では復号化された状態で処理されるため、アプリケーションの変更は不要です。マスターキーの定期的なローテーションがセキュリティのベストプラクティスです。",
        code: `-- キーストアの設定（sqlnet.oraに追加）
/*
ENCRYPTION_WALLET_LOCATION =
  (SOURCE = (METHOD = FILE)
    (METHOD_DATA =
      (DIRECTORY = /u01/app/oracle/admin/ORCL/wallet)
    )
  )
*/

-- キーストアの作成とオープン
ADMINISTER KEY MANAGEMENT
CREATE KEYSTORE '/u01/app/oracle/admin/ORCL/wallet'
IDENTIFIED BY "WalletP@ss1";

ADMINISTER KEY MANAGEMENT
SET KEYSTORE OPEN IDENTIFIED BY "WalletP@ss1";

-- マスター暗号化キーの設定
ADMINISTER KEY MANAGEMENT
SET KEY IDENTIFIED BY "WalletP@ss1"
WITH BACKUP USING 'master_key_backup';

-- 自動ログインキーストアの作成（起動時にパスワード不要）
ADMINISTER KEY MANAGEMENT
CREATE AUTO_LOGIN KEYSTORE
FROM KEYSTORE '/u01/app/oracle/admin/ORCL/wallet'
IDENTIFIED BY "WalletP@ss1";

-- 表領域暗号化（推奨）
CREATE TABLESPACE secure_data
DATAFILE '/u01/oradata/ORCL/secure01.dbf' SIZE 500M
ENCRYPTION USING 'AES256'
DEFAULT STORAGE(ENCRYPT);

-- 列暗号化
ALTER TABLE hr.employees
MODIFY (salary ENCRYPT USING 'AES256' NO SALT);

-- キーのローテーション
ADMINISTER KEY MANAGEMENT
SET KEY IDENTIFIED BY "WalletP@ss1"
WITH BACKUP;`,
      },
      {
        title: "VPDとScheduler",
        content:
          "VPD（Virtual Private Database）は行レベルのセキュリティを実現する機能で、ユーザーのコンテキストに基づいてSELECT/INSERT/UPDATE/DELETEに自動的にWHERE句を追加します。DBMS_RLSパッケージでポリシー関数を登録し、アクセス時にWHERE述語を動的に生成します。アプリケーションの変更なしに行レベルアクセス制御を実現できます。Oracle Scheduler（DBMS_SCHEDULER）はジョブの自動実行を管理する機能で、旧DBMS_JOBの後継です。ジョブ（実行するプログラム）、プログラム（実行内容の定義）、スケジュール（実行タイミング）の3要素で構成されます。ジョブチェーンで複数ジョブを依存関係付きで順序実行できます。",
        code: `-- VPDポリシー関数の作成
CREATE OR REPLACE FUNCTION dept_security_policy (
  p_schema IN VARCHAR2,
  p_table  IN VARCHAR2
) RETURN VARCHAR2 AS
BEGIN
  -- DBA権限を持つユーザーは全データにアクセス可能
  IF SYS_CONTEXT('USERENV', 'SESSION_USER') = 'HR_ADMIN' THEN
    RETURN NULL;  -- 制限なし
  END IF;
  -- 一般ユーザーは自部門のデータのみ
  RETURN 'department_id = SYS_CONTEXT(''hr_ctx'', ''dept_id'')';
END;
/

-- VPDポリシーの登録
BEGIN
  DBMS_RLS.ADD_POLICY(
    object_schema   => 'HR',
    object_name     => 'EMPLOYEES',
    policy_name     => 'EMP_DEPT_POLICY',
    function_schema => 'HR',
    policy_function => 'DEPT_SECURITY_POLICY',
    statement_types => 'SELECT, UPDATE, DELETE'
  );
END;
/

-- Oracle Schedulerでジョブ作成
BEGIN
  DBMS_SCHEDULER.CREATE_JOB(
    job_name        => 'NIGHTLY_STATS_JOB',
    job_type        => 'PLSQL_BLOCK',
    job_action      => 'BEGIN DBMS_STATS.GATHER_SCHEMA_STATS(''HR''); END;',
    start_date      => SYSTIMESTAMP,
    repeat_interval => 'FREQ=DAILY;BYHOUR=2;BYMINUTE=0',
    enabled         => TRUE,
    comments        => '毎日2:00にHRスキーマの統計情報を収集'
  );
END;
/

-- ジョブの確認
SELECT job_name, state, last_start_date, next_run_date
FROM DBA_SCHEDULER_JOBS WHERE owner = 'HR';`,
      },
      {
        title: "データポンプと監査",
        content:
          "Data Pump（expdp/impdp）はOracleの高速データ移行ツールで、従来のexp/impの後継です。サーバー側で実行されるため高速で、パラレル処理、圧縮、暗号化、フィルタリング機能をサポートします。ディレクトリオブジェクトでエクスポート/インポート先を指定します。スキーマモード、テーブルモード、フルデータベースモードで柔軟にデータを移行できます。統合監査（Unified Auditing）は12c以降の統一的な監査フレームワークで、従来の複数の監査方式を一元化しました。監査ポリシーを作成してユーザーやアクション別に監査を有効化し、UNIFIED_AUDIT_TRAILビューで監査ログを一元的に確認します。FGA（Fine-Grained Auditing）で特定条件のアクセスのみを監査することも可能です。",
        code: `-- ディレクトリオブジェクトの作成
CREATE OR REPLACE DIRECTORY dp_dir AS '/u01/export';
GRANT READ, WRITE ON DIRECTORY dp_dir TO hr;

-- Data Pump エクスポート（スキーマ単位）
-- $ expdp hr/password@ORCL \
--   directory=DP_DIR \
--   dumpfile=hr_export_%U.dmp \
--   logfile=hr_export.log \
--   schemas=HR \
--   parallel=4 \
--   compression=ALL

-- Data Pump インポート
-- $ impdp system/password@ORCL \
--   directory=DP_DIR \
--   dumpfile=hr_export_%U.dmp \
--   logfile=hr_import.log \
--   schemas=HR \
--   remap_schema=HR:HR_TEST \
--   remap_tablespace=USERS:TEST_DATA \
--   table_exists_action=REPLACE

-- テーブル単位のエクスポート（フィルタ付き）
-- $ expdp hr/password@ORCL \
--   directory=DP_DIR \
--   dumpfile=emp_2024.dmp \
--   tables=HR.EMPLOYEES \
--   query=HR.EMPLOYEES:'"WHERE hire_date >= TO_DATE(''2024-01-01'',''YYYY-MM-DD'')"'

-- 統合監査ポリシーの作成（詳細）
CREATE AUDIT POLICY sensitive_data_policy
  ACTIONS SELECT ON hr.employees,
          UPDATE ON hr.employees
  WHEN 'SYS_CONTEXT(''USERENV'',''SESSION_USER'') NOT IN (''HR_ADMIN'')'
  EVALUATE PER SESSION;

AUDIT POLICY sensitive_data_policy;

-- 監査ログの確認
SELECT event_timestamp, dbusername, action_name,
       object_schema, object_name, sql_text,
       return_code
FROM UNIFIED_AUDIT_TRAIL
ORDER BY event_timestamp DESC
FETCH FIRST 50 ROWS ONLY;`,
      },
    ],
  },
];

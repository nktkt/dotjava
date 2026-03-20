export type SqlLevel = "ddl" | "dml" | "advanced" | "practice";

export interface SqlQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: SqlLevel;
  chapter: string;
}

export const sqlQuizQuestions: SqlQuizQuestion[] = [
  // ════════════════════════════════════════
  // ddl: テーブル定義・制約 (sql-ddl) 4問
  // ════════════════════════════════════════
  {
    id: "sql-ddl-q01",
    question: "RDBMSで主キー（PRIMARY KEY）の特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "NULL値を許容し、重複も許可する" },
      { label: "B", text: "NULL値を許容するが、重複は許可しない" },
      { label: "C", text: "NULL値を許容せず、重複も許可しない" },
      { label: "D", text: "NULL値を許容しないが、重複は許可する" },
    ],
    correctLabel: "C",
    explanation:
      "主キー（PRIMARY KEY）はNOT NULL制約とUNIQUE制約を同時に持ちます。テーブル内の各行を一意に識別するために使用され、NULLも重複も許可しません。テーブルには1つの主キーのみ定義できます。",
    level: "ddl",
    chapter: "sql-ddl",
  },
  {
    id: "sql-ddl-q02",
    question: "外部キー（FOREIGN KEY）制約でON DELETE CASCADEを指定した場合の動作はどれですか？",
    choices: [
      { label: "A", text: "親テーブルのレコード削除時にエラーが発生する" },
      { label: "B", text: "親テーブルのレコード削除時に子テーブルの関連レコードも自動削除される" },
      { label: "C", text: "子テーブルのレコード削除時に親テーブルのレコードも削除される" },
      { label: "D", text: "親テーブルのレコード削除時に子テーブルの外部キーがNULLになる" },
    ],
    correctLabel: "B",
    explanation:
      "ON DELETE CASCADEは親テーブルのレコードが削除された際、参照している子テーブルのレコードも自動的に削除する設定です。ON DELETE SET NULLは外部キーをNULLにし、ON DELETE RESTRICTは削除を禁止します。",
    level: "ddl",
    chapter: "sql-ddl",
  },
  {
    id: "sql-ddl-q03",
    question: "インデックスの作成が効果的でないケースはどれですか？",
    choices: [
      { label: "A", text: "WHERE句で頻繁に検索される列" },
      { label: "B", text: "JOIN条件で使用される列" },
      { label: "C", text: "カーディナリティが極端に低い列（例: 性別）" },
      { label: "D", text: "ORDER BY句で頻繁にソートされる列" },
    ],
    correctLabel: "C",
    explanation:
      "カーディナリティ（値の種類数）が低い列ではインデックスの効果が薄く、フルテーブルスキャンのほうが効率的な場合があります。例えば性別のように2種類しかない列はインデックスの恩恵を受けにくいです。WHERE、JOIN、ORDER BYで使われる高カーディナリティの列にインデックスを作成するのが効果的です。",
    level: "ddl",
    chapter: "sql-ddl",
  },
  {
    id: "sql-ddl-q04",
    question: "ALTER TABLE文で既存テーブルにNOT NULL制約を追加する際の注意点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "既存データに影響はないため、いつでも安全に追加できる" },
      { label: "B", text: "対象列にNULL値が存在するとエラーになる" },
      { label: "C", text: "テーブルを再作成する必要がある" },
      { label: "D", text: "NOT NULL制約は後から追加できない" },
    ],
    correctLabel: "B",
    explanation:
      "既存テーブルの列にNOT NULL制約を追加する場合、その列にNULL値を持つ行が存在するとエラーになります。事前にNULLデータをUPDATEでデフォルト値に変更するか、DEFAULT値を設定してからNOT NULL制約を追加する必要があります。",
    level: "ddl",
    chapter: "sql-ddl",
  },
  // ════════════════════════════════════════
  // dml: SELECT・JOIN・サブクエリ (sql-dml) 4問
  // ════════════════════════════════════════
  {
    id: "sql-dml-q01",
    question: "LEFT JOINについて正しい説明はどれですか？",
    choices: [
      { label: "A", text: "両方のテーブルに一致するレコードのみ返す" },
      { label: "B", text: "左テーブルの全レコードと、右テーブルの一致するレコードを返す" },
      { label: "C", text: "右テーブルの全レコードと、左テーブルの一致するレコードを返す" },
      { label: "D", text: "両方のテーブルの全レコードを返す" },
    ],
    correctLabel: "B",
    explanation:
      "LEFT JOIN（LEFT OUTER JOIN）は左テーブルの全レコードを保持し、右テーブルに一致するレコードがある場合は結合、ない場合はNULLで埋めて返します。INNER JOINは一致するレコードのみ、RIGHT JOINは右テーブル基準、FULL JOINは両テーブルの全レコードを返します。",
    code: "SELECT e.name, d.dept_name\nFROM employees e\nLEFT JOIN departments d ON e.dept_id = d.id;",
    level: "dml",
    chapter: "sql-dml",
  },
  {
    id: "sql-dml-q02",
    question: "GROUP BYとHAVINGの関係について正しいものはどれですか？",
    choices: [
      { label: "A", text: "HAVINGはGROUP BYなしでも使用できる" },
      { label: "B", text: "WHEREはグループ化後、HAVINGはグループ化前に評価される" },
      { label: "C", text: "WHEREはグループ化前、HAVINGはグループ化後に評価される" },
      { label: "D", text: "HAVINGとWHEREは完全に同じ機能である" },
    ],
    correctLabel: "C",
    explanation:
      "SQLの評価順序はFROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BYです。WHEREは個々の行に対してグループ化前にフィルタし、HAVINGはグループ化された結果に対して集計関数の条件でフィルタします。",
    code: "SELECT dept_id, COUNT(*) as cnt\nFROM employees\nWHERE status = 'active'\nGROUP BY dept_id\nHAVING COUNT(*) >= 5;",
    level: "dml",
    chapter: "sql-dml",
  },
  {
    id: "sql-dml-q03",
    question: "相関サブクエリの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "外側のクエリとは独立して1回だけ実行される" },
      { label: "B", text: "外側のクエリの各行について繰り返し実行される" },
      { label: "C", text: "常にIN句の中でのみ使用される" },
      { label: "D", text: "結合（JOIN）より必ず高速である" },
    ],
    correctLabel: "B",
    explanation:
      "相関サブクエリは外側のクエリの値を参照するため、外側の各行に対して繰り返し実行されます。独立サブクエリと異なりパフォーマンスに注意が必要です。EXISTSやスカラーサブクエリでよく使われます。",
    code: "SELECT e.name, e.salary\nFROM employees e\nWHERE e.salary > (\n    SELECT AVG(e2.salary)\n    FROM employees e2\n    WHERE e2.dept_id = e.dept_id\n);",
    level: "dml",
    chapter: "sql-dml",
  },
  {
    id: "sql-dml-q04",
    question: "EXISTSとINの使い分けとして適切なものはどれですか？",
    choices: [
      { label: "A", text: "EXISTSは常にINより遅い" },
      { label: "B", text: "サブクエリの結果が大量の場合、EXISTSのほうが効率的なことが多い" },
      { label: "C", text: "INは相関サブクエリでのみ使用できる" },
      { label: "D", text: "EXISTSとINは常に同じ実行計画になる" },
    ],
    correctLabel: "B",
    explanation:
      "EXISTSは一致するレコードが見つかった時点で評価を終了するため、サブクエリの結果セットが大きい場合に効率的です。INはサブクエリの全結果をメモリに展開するため、結果が少量の場合に適しています。ただし最新のオプティマイザは最適化する場合もあります。",
    level: "dml",
    chapter: "sql-dml",
  },
  // ════════════════════════════════════════
  // advanced: ウィンドウ関数・トランザクション (sql-advanced) 4問
  // ════════════════════════════════════════
  {
    id: "sql-advanced-q01",
    question: "ウィンドウ関数ROW_NUMBER()とRANK()の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "両者は全く同じ動作をする" },
      { label: "B", text: "ROW_NUMBERは連番を振り、RANKは同じ値に同じ順位を付けて次の順位を飛ばす" },
      { label: "C", text: "RANKは連番を振り、ROW_NUMBERは同じ値に同じ順位を付ける" },
      { label: "D", text: "ROW_NUMBERはGROUP BYと一緒にのみ使える" },
    ],
    correctLabel: "B",
    explanation:
      "ROW_NUMBER()は常に一意の連番（1,2,3,4...）を付けます。RANK()は同じ値に同じ順位を付け、次の順位を飛ばします（1,2,2,4...）。DENSE_RANK()は同順位の後も順位を飛ばしません（1,2,2,3...）。",
    code: "SELECT name, score,\n    ROW_NUMBER() OVER (ORDER BY score DESC) as row_num,\n    RANK() OVER (ORDER BY score DESC) as rank\nFROM students;",
    level: "advanced",
    chapter: "sql-advanced",
  },
  {
    id: "sql-advanced-q02",
    question: "トランザクションの分離レベルでダーティリードを防止できる最低レベルはどれですか？",
    choices: [
      { label: "A", text: "READ UNCOMMITTED" },
      { label: "B", text: "READ COMMITTED" },
      { label: "C", text: "REPEATABLE READ" },
      { label: "D", text: "SERIALIZABLE" },
    ],
    correctLabel: "B",
    explanation:
      "READ COMMITTEDはコミット済みのデータのみ読み取るため、ダーティリード（未コミットデータの読み取り）を防止できます。READ UNCOMMITTEDではダーティリードが発生します。REPEATABLE READは反復不能読み取りも防止し、SERIALIZABLEは最も厳格です。",
    level: "advanced",
    chapter: "sql-advanced",
  },
  {
    id: "sql-advanced-q03",
    question: "次のウィンドウ関数の結果として各行のrunning_totalに入る値はどれですか？",
    choices: [
      { label: "A", text: "各行の売上金額のみ" },
      { label: "B", text: "月ごとの累計売上（ランニングトータル）" },
      { label: "C", text: "全体の合計金額が全行に同じ値で入る" },
      { label: "D", text: "前月との差分" },
    ],
    correctLabel: "B",
    explanation:
      "SUM() OVER (ORDER BY ...)は累計（ランニングトータル）を計算します。ORDER BYで指定した順序で、先頭から現在行までの合計を各行に返します。PARTITION BYを追加するとグループごとにリセットされます。",
    code: "SELECT month, amount,\n    SUM(amount) OVER (ORDER BY month) as running_total\nFROM monthly_sales;",
    level: "advanced",
    chapter: "sql-advanced",
  },
  {
    id: "sql-advanced-q04",
    question: "デッドロックが発生する条件として正しいものはどれですか？",
    choices: [
      { label: "A", text: "1つのトランザクションが複数のテーブルにアクセスする" },
      { label: "B", text: "2つのトランザクションが互いに相手のロックしたリソースを待っている" },
      { label: "C", text: "トランザクションが長時間実行されている" },
      { label: "D", text: "SELECT文のみのトランザクションが並行実行される" },
    ],
    correctLabel: "B",
    explanation:
      "デッドロックは2つ以上のトランザクションが互いに相手がロックしているリソースを待ち合う状態です。例えばTx1がテーブルAをロックしてBを待ち、Tx2がテーブルBをロックしてAを待つ状態です。RDBMSは通常デッドロックを検出し、一方のトランザクションをロールバックします。",
    level: "advanced",
    chapter: "sql-advanced",
  },
  // ════════════════════════════════════════
  // practice: SQL実践問題 (sql-practice) 3問
  // ════════════════════════════════════════
  {
    id: "sql-practice-q01",
    question: "次のSQLの実行結果として正しいものはどれですか？",
    choices: [
      { label: "A", text: "NULLを含む全従業員が表示される" },
      { label: "B", text: "bonus列がNULLの従業員のみ表示される" },
      { label: "C", text: "bonus列がNULLでない従業員のみ表示される" },
      { label: "D", text: "エラーが発生する" },
    ],
    correctLabel: "C",
    explanation:
      "NULLとの比較は= NULLではなくIS NULLまたはIS NOT NULLを使う必要があります。COALESCE(bonus, 0)はbonusがNULLの場合に0を返しますが、WHERE bonus IS NOT NULLが先に評価されるため、NULLの行は除外されます。",
    code: "SELECT name, COALESCE(bonus, 0) as bonus\nFROM employees\nWHERE bonus IS NOT NULL;",
    level: "practice",
    chapter: "sql-practice",
  },
  {
    id: "sql-practice-q02",
    question: "大量データのINSERTでパフォーマンスを改善する方法として最も効果的なものはどれですか？",
    choices: [
      { label: "A", text: "1行ずつINSERT文を実行する" },
      { label: "B", text: "バルクINSERTを使い、1つのINSERT文で複数行を挿入する" },
      { label: "C", text: "各INSERTごとにCOMMITする" },
      { label: "D", text: "インデックスを増やしてから挿入する" },
    ],
    correctLabel: "B",
    explanation:
      "バルクINSERTは1つのSQL文で複数行を挿入するため、ネットワークラウンドトリップやトランザクションのオーバーヘッドを大幅に削減できます。大量データ投入時はインデックスを一時的に無効化し、挿入後に再構築する方法も効果的です。",
    code: "INSERT INTO users (name, email) VALUES\n    ('田中', 'tanaka@example.com'),\n    ('佐藤', 'sato@example.com'),\n    ('鈴木', 'suzuki@example.com');",
    level: "practice",
    chapter: "sql-practice",
  },
  {
    id: "sql-practice-q03",
    question: "SQLのEXPLAIN（実行計画）で確認すべき重要なポイントとして最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "テーブルの文字コードが正しいか" },
      { label: "B", text: "フルテーブルスキャンが発生していないか、インデックスが使用されているか" },
      { label: "C", text: "テーブルの作成日時" },
      { label: "D", text: "カラムのデータ型" },
    ],
    correctLabel: "B",
    explanation:
      "EXPLAINは実行計画を表示し、クエリの最適化に役立ちます。特にフルテーブルスキャン（全行読み取り）の有無、インデックスの使用状況、結合方法（Nested Loop, Hash Join等）、推定行数などを確認してパフォーマンスチューニングを行います。",
    level: "practice",
    chapter: "sql-practice",
  },
];

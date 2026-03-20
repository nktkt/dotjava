export type CleanCodeLevel = "naming" | "design" | "refactoring" | "practice";

export interface CleanCodeQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: CleanCodeLevel;
  chapter: string;
}

export const cleanCodeQuizQuestions: CleanCodeQuizQuestion[] = [
  // ════════════════════════════════════════
  // naming: 命名規則とコーディング規約 4問
  // ════════════════════════════════════════
  {
    id: "naming-q01",
    question: "Javaの命名規則として正しいものはどれですか？",
    choices: [
      { label: "A", text: "クラス名はcamelCase、メソッド名はPascalCase" },
      { label: "B", text: "クラス名はPascalCase、メソッド名はcamelCase" },
      { label: "C", text: "定数はcamelCase、変数はSNAKE_CASE" },
      { label: "D", text: "パッケージ名はPascalCase" },
    ],
    correctLabel: "B",
    explanation:
      "Javaの標準的な命名規則では、クラス名はPascalCase（例：UserService）、メソッド名と変数名はcamelCase（例：getUserName）、定数はSNAKE_CASE（例：MAX_RETRY_COUNT）、パッケージ名はすべて小文字（例：com.example.service）です。",
    level: "naming",
    chapter: "naming",
  },
  {
    id: "naming-q02",
    question: "次のメソッド名のうち、クリーンコードの原則に最も沿っているものはどれですか？",
    choices: [
      { label: "A", text: "process()" },
      { label: "B", text: "doStuff()" },
      { label: "C", text: "calculateMonthlyRevenue()" },
      { label: "D", text: "func1()" },
    ],
    correctLabel: "C",
    explanation:
      "クリーンコードでは、メソッド名はその処理内容を明確に表現するべきです。calculateMonthlyRevenue()は「月次売上を計算する」という意図が明確です。process()やdoStuff()は曖昧で、func1()は意味を持ちません。名前は検索可能で、意図を明らかにするものが良いです。",
    level: "naming",
    chapter: "naming",
  },
  {
    id: "naming-q03",
    question: "マジックナンバーの問題点と対処法として正しいものはどれですか？",
    code: `// 修正前
if (user.getAge() >= 18) { ... }

// 修正後
private static final int LEGAL_ADULT_AGE = 18;
if (user.getAge() >= LEGAL_ADULT_AGE) { ... }`,
    choices: [
      { label: "A", text: "マジックナンバーはパフォーマンスを低下させるため、定数に置き換える" },
      { label: "B", text: "マジックナンバーは意味が不明確なため、名前付き定数に置き換えて意図を明確にする" },
      { label: "C", text: "マジックナンバーはコンパイルエラーの原因になるため、定数に置き換える" },
      { label: "D", text: "マジックナンバーは問題ないが、コーディング規約で禁止されている" },
    ],
    correctLabel: "B",
    explanation:
      "マジックナンバー（コード中に直接書かれた数値リテラル）は、その数値が何を意味するのか読み手に伝わりません。名前付き定数に置き換えることで、意図が明確になり、変更時に一箇所の修正で済むようになります。保守性と可読性の両方が向上します。",
    level: "naming",
    chapter: "naming",
  },
  {
    id: "naming-q04",
    question: "boolean型の変数やメソッドの命名として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "flag, check()" },
      { label: "B", text: "isActive, hasPermission()" },
      { label: "C", text: "active_status, do_check()" },
      { label: "D", text: "boolVal, ret()" },
    ],
    correctLabel: "B",
    explanation:
      "boolean型の変数やメソッドは、is/has/can/shouldなどのプレフィックスを付けて、真偽値であることを明示するのがベストプラクティスです。isActive（アクティブかどうか）、hasPermission（権限があるかどうか）のように、Yes/Noで答えられる名前にします。",
    level: "naming",
    chapter: "naming",
  },
  // ════════════════════════════════════════
  // design: 設計原則（SOLID） 4問
  // ════════════════════════════════════════
  {
    id: "design-q01",
    question: "SOLID原則の「S」（単一責任の原則）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "クラスは1つのメソッドのみを持つべきである" },
      { label: "B", text: "クラスは変更する理由がただ1つだけであるべきである" },
      { label: "C", text: "クラスは1つのインタフェースのみを実装すべきである" },
      { label: "D", text: "クラスは1つのフィールドのみを持つべきである" },
    ],
    correctLabel: "B",
    explanation:
      "単一責任の原則（SRP: Single Responsibility Principle）は「クラスを変更する理由は1つだけであるべき」という原則です。1つのクラスが複数の責務を持つと、一方の変更が他方に影響を与える可能性があります。例えば、ユーザー管理とメール送信は別のクラスに分離すべきです。",
    level: "design",
    chapter: "design",
  },
  {
    id: "design-q02",
    question: "SOLID原則の「O」（開放閉鎖の原則）を実現する方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "すべてのクラスをfinalにする" },
      { label: "B", text: "既存コードを変更せずに、拡張（継承やインタフェース実装）で機能追加できるようにする" },
      { label: "C", text: "すべてのメソッドをpublicにする" },
      { label: "D", text: "グローバル変数を使って設定を変更可能にする" },
    ],
    correctLabel: "B",
    explanation:
      "開放閉鎖の原則（OCP: Open/Closed Principle）は「拡張に対して開いて、修正に対して閉じている」べきという原則です。Strategyパターンやテンプレートメソッドパターンを使い、既存コードを変更せずに新しい振る舞いを追加できる設計にします。",
    level: "design",
    chapter: "design",
  },
  {
    id: "design-q03",
    question: "依存性逆転の原則（DIP）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "上位モジュールが下位モジュールの具体的な実装に依存する" },
      { label: "B", text: "上位モジュールも下位モジュールも抽象（インタフェース）に依存するべきである" },
      { label: "C", text: "依存関係を完全に排除すべきである" },
      { label: "D", text: "循環依存を許容する" },
    ],
    correctLabel: "B",
    explanation:
      "依存性逆転の原則（DIP: Dependency Inversion Principle）は、上位モジュールが下位モジュールの具体的な実装ではなく、両者が抽象（インタフェース）に依存すべきという原則です。これにより疎結合な設計となり、実装の差し替えやテストが容易になります。DIコンテナはこの原則の実現手段の一つです。",
    level: "design",
    chapter: "design",
  },
  {
    id: "design-q04",
    question: "インタフェース分離の原則（ISP）に違反しているコードはどれですか？",
    code: `interface Worker {
    void work();
    void eat();
    void sleep();
}`,
    choices: [
      { label: "A", text: "このインタフェースは問題ない" },
      { label: "B", text: "ロボットのような「食事も睡眠もしない」実装者にも不要なメソッドの実装を強制する" },
      { label: "C", text: "メソッドが3つあるのでSRPに違反している" },
      { label: "D", text: "インタフェースにフィールドがないため不適切" },
    ],
    correctLabel: "B",
    explanation:
      "インタフェース分離の原則（ISP: Interface Segregation Principle）は、クライアントが使用しないメソッドへの依存を強制されるべきではないという原則です。Workable、Eatable、Sleepableなど、役割ごとにインタフェースを分離することで、実装者は必要なインタフェースのみを実装できます。",
    level: "design",
    chapter: "design",
  },
  // ════════════════════════════════════════
  // refactoring: リファクタリング 4問
  // ════════════════════════════════════════
  {
    id: "refactoring-q01",
    question: "次のコードに対する最も適切なリファクタリングはどれですか？",
    code: `public double calculatePrice(double price, String type) {
    if (type.equals("member")) {
        return price * 0.9;
    } else if (type.equals("vip")) {
        return price * 0.8;
    } else if (type.equals("employee")) {
        return price * 0.7;
    }
    return price;
}`,
    choices: [
      { label: "A", text: "if文をswitch文に置き換える" },
      { label: "B", text: "Strategyパターンまたはポリモーフィズムを使い、各タイプごとにクラスを定義する" },
      { label: "C", text: "すべての条件を1行にまとめる" },
      { label: "D", text: "コメントを追加して可読性を上げる" },
    ],
    correctLabel: "B",
    explanation:
      "条件分岐を文字列で行うコードは、新しいタイプ追加時に既存コードの修正が必要（OCP違反）です。Strategyパターンやポリモーフィズムを使い、DiscountStrategy インタフェースと各タイプの実装クラスを作ることで、拡張性と保守性が向上します。",
    level: "refactoring",
    chapter: "refactoring",
  },
  {
    id: "refactoring-q02",
    question: "「コードの臭い」（Code Smell）に該当しないものはどれですか？",
    choices: [
      { label: "A", text: "1つのメソッドが200行以上ある（Long Method）" },
      { label: "B", text: "同じコードが3箇所にコピーされている（Duplicated Code）" },
      { label: "C", text: "適切な名前の短いメソッドに処理を分割している" },
      { label: "D", text: "1つのクラスが10以上の責務を持っている（God Class）" },
    ],
    correctLabel: "C",
    explanation:
      "「コードの臭い」はリファクタリングが必要なコードの兆候です。Long Method、Duplicated Code、God Classは代表的なコードの臭いです。一方、適切に命名された短いメソッドへの分割は、クリーンコードの良い実践であり、コードの臭いではありません。",
    level: "refactoring",
    chapter: "refactoring",
  },
  {
    id: "refactoring-q03",
    question: "Extract Methodリファクタリングの利点として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "実行速度が向上する" },
      { label: "B", text: "メモリ使用量が削減される" },
      { label: "C", text: "コードの可読性が向上し、メソッドの意図が名前で伝わるようになる" },
      { label: "D", text: "スレッドセーフになる" },
    ],
    correctLabel: "C",
    explanation:
      "Extract Method（メソッドの抽出）は、長いメソッドの一部を意味のある名前を持つ新しいメソッドとして抽出するリファクタリングです。コードの可読性が向上し、抽出されたメソッドの再利用も可能になります。パフォーマンスやスレッドセーフ性とは直接関係ありません。",
    level: "refactoring",
    chapter: "refactoring",
  },
  {
    id: "refactoring-q04",
    question: "リファクタリングを行う際の最も重要な前提条件はどれですか？",
    choices: [
      { label: "A", text: "パフォーマンスプロファイリングの結果があること" },
      { label: "B", text: "十分なテストカバレッジがあり、動作の正しさを検証できること" },
      { label: "C", text: "チームリーダーの承認があること" },
      { label: "D", text: "設計ドキュメントが最新であること" },
    ],
    correctLabel: "B",
    explanation:
      "リファクタリングは外部的な振る舞いを変えずにコードの内部構造を改善する作業です。そのため、リファクタリング前後で振る舞いが変わっていないことを確認するテストが不可欠です。テストがない状態でのリファクタリングは、意図しないバグの混入リスクが高くなります。",
    level: "refactoring",
    chapter: "refactoring",
  },
  // ════════════════════════════════════════
  // practice: コードレビューと実践 3問
  // ════════════════════════════════════════
  {
    id: "practice-q01",
    question: "効果的なコードレビューの観点として最も重要でないものはどれですか？",
    choices: [
      { label: "A", text: "ロジックの正確性" },
      { label: "B", text: "コーディングスタイルの一貫性" },
      { label: "C", text: "コードの行数が少ないこと" },
      { label: "D", text: "エラーハンドリングの適切さ" },
    ],
    correctLabel: "C",
    explanation:
      "コードレビューではロジックの正確性、コーディングスタイル、エラーハンドリング、セキュリティ、パフォーマンスなどを確認します。コードの行数の少なさ自体は品質の指標ではありません。可読性を犠牲にして無理にコードを短くすることはかえって品質を低下させます。",
    level: "practice",
    chapter: "practice",
  },
  {
    id: "practice-q02",
    question: "次のうち、DRY原則（Don't Repeat Yourself）に違反しているケースはどれですか？",
    choices: [
      { label: "A", text: "共通のバリデーションロジックを複数のサービスクラスにコピー＆ペーストしている" },
      { label: "B", text: "共通処理をユーティリティクラスに抽出して各所から呼び出している" },
      { label: "C", text: "テンプレートメソッドパターンで共通フローを親クラスに定義している" },
      { label: "D", text: "インタフェースを定義して複数のクラスで実装している" },
    ],
    correctLabel: "A",
    explanation:
      "DRY原則は「同じ知識やロジックを複数の場所に重複させない」という原則です。コピー＆ペーストによるコードの重複はDRY違反の典型例です。修正時にすべての箇所を変更する必要があり、変更漏れによるバグの原因になります。共通処理はユーティリティクラスやテンプレートメソッドパターンで一元化すべきです。",
    level: "practice",
    chapter: "practice",
  },
  {
    id: "practice-q03",
    question: "YAGNI原則（You Ain't Gonna Need It）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "すべての機能に対してテストを書くべきである" },
      { label: "B", text: "将来必要になるかもしれない機能を事前に実装すべきではない" },
      { label: "C", text: "コードの最適化を常に行うべきである" },
      { label: "D", text: "ドキュメントは不要である" },
    ],
    correctLabel: "B",
    explanation:
      "YAGNI原則は「現時点で必要のない機能を実装してはならない」という原則です。将来の要件を推測して先行実装すると、不要なコードの保守コストが増え、設計が複雑になります。実際に必要になった時点で実装するのがアジャイル開発の基本方針です。",
    level: "practice",
    chapter: "practice",
  },
];

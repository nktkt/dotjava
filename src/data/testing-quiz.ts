export type TestingLevel = "junit" | "mockito" | "spring" | "practice";

export interface TestingQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: TestingLevel;
  chapter: string;
}

export const testingQuizQuestions: TestingQuizQuestion[] = [
  // ════════════════════════════════════════
  // junit: JUnit 5 (junit5) 4問
  // ════════════════════════════════════════
  {
    id: "junit5-q01",
    question: "JUnit 5で@BeforeEachと@BeforeAllの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "@BeforeEachはクラスで1回、@BeforeAllは各テストメソッド前に実行" },
      { label: "B", text: "@BeforeEachは各テストメソッド前に実行、@BeforeAllはクラスで1回実行" },
      { label: "C", text: "両者は同じタイミングで実行される" },
      { label: "D", text: "@BeforeAllはJUnit 5では廃止された" },
    ],
    correctLabel: "B",
    explanation:
      "@BeforeEachは各テストメソッドの実行前に毎回呼ばれ、テストの独立性を保つための初期化に使います。@BeforeAllはクラス内で1回だけ実行され、staticメソッドに付与します。DB接続などコストの高い初期化に適しています。",
    level: "junit",
    chapter: "junit5",
  },
  {
    id: "junit5-q02",
    question: "JUnit 5のパラメタライズドテストで正しい記述はどれですか？",
    choices: [
      { label: "A", text: "@Testアノテーションと一緒に使う必要がある" },
      { label: "B", text: "@ParameterizedTestと@ValueSourceなどのソースアノテーションを組み合わせる" },
      { label: "C", text: "パラメータは常にString型のみ" },
      { label: "D", text: "1つのテストメソッドに1つのパラメータしか渡せない" },
    ],
    correctLabel: "B",
    explanation:
      "@ParameterizedTestは@Testの代わりに使用し、@ValueSource, @CsvSource, @MethodSourceなどでパラメータを供給します。同じテストロジックを異なる入力値で繰り返し実行でき、テストの網羅性が向上します。",
    code: "@ParameterizedTest\n@ValueSource(ints = {1, 2, 3, 4, 5})\nvoid isPositive(int number) {\n    assertTrue(number > 0);\n}",
    level: "junit",
    chapter: "junit5",
  },
  {
    id: "junit5-q03",
    question: "JUnit 5のassertAllの利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "最初のアサーションが失敗したら残りをスキップする" },
      { label: "B", text: "全てのアサーションを実行し、失敗を一括で報告する" },
      { label: "C", text: "アサーションを非同期で並列実行する" },
      { label: "D", text: "テストの実行速度が向上する" },
    ],
    correctLabel: "B",
    explanation:
      "assertAllは複数のアサーションをグループ化し、全てを実行した後に失敗を一括報告します。通常のassertは最初の失敗で停止するため、複数の検証項目がある場合にassertAllを使うと全ての問題を一度に把握できます。",
    code: "assertAll(\n    () -> assertEquals(\"田中\", user.getName()),\n    () -> assertEquals(30, user.getAge()),\n    () -> assertNotNull(user.getEmail())\n);",
    level: "junit",
    chapter: "junit5",
  },
  {
    id: "junit5-q04",
    question: "JUnit 5で例外がスローされることを検証する正しい方法はどれですか？",
    choices: [
      { label: "A", text: "try-catchで囲んでfailを呼ぶ" },
      { label: "B", text: "@Test(expected = Exception.class)を指定する" },
      { label: "C", text: "assertThrowsを使用する" },
      { label: "D", text: "例外のテストはJUnit 5ではできない" },
    ],
    correctLabel: "C",
    explanation:
      "JUnit 5ではassertThrowsメソッドで例外の検証を行います。JUnit 4の@Test(expected=...)は廃止されました。assertThrowsはスローされた例外オブジェクトを返すため、例外メッセージの検証も可能です。",
    code: "IllegalArgumentException ex = assertThrows(\n    IllegalArgumentException.class,\n    () -> service.validate(null)\n);\nassertEquals(\"入力値がnullです\", ex.getMessage());",
    level: "junit",
    chapter: "junit5",
  },
  // ════════════════════════════════════════
  // mockito: Mockito (mockito) 4問
  // ════════════════════════════════════════
  {
    id: "mockito-q01",
    question: "Mockitoの@Mockと@Spyの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "@Mockは実際のメソッドを呼び出し、@Spyはスタブのみ" },
      { label: "B", text: "@Mockは全メソッドがスタブ化され、@Spyは実際のメソッドを呼びつつ一部をスタブ化できる" },
      { label: "C", text: "両者は完全に同じ機能である" },
      { label: "D", text: "@SpyはJUnit 5では使用できない" },
    ],
    correctLabel: "B",
    explanation:
      "@Mockは全メソッドがデフォルト値（null, 0, false等）を返すモックオブジェクトを生成します。@Spyは実オブジェクトのラッパーで、スタブ化したメソッド以外は実際の実装が呼ばれます。部分的なモック化が必要な場合にSpyを使います。",
    level: "mockito",
    chapter: "mockito",
  },
  {
    id: "mockito-q02",
    question: "Mockitoでメソッドの戻り値をモック化する正しい記述はどれですか？",
    choices: [
      { label: "A", text: "mock(repository.findById(1)).returns(user)" },
      { label: "B", text: "when(repository.findById(1L)).thenReturn(Optional.of(user))" },
      { label: "C", text: "stub(repository.findById(1)).withReturn(user)" },
      { label: "D", text: "doReturn(user).on(repository).findById(1)" },
    ],
    correctLabel: "B",
    explanation:
      "Mockitoでは when(...).thenReturn(...) の形式でメソッドの戻り値を設定します。voidメソッドの場合は doNothing().when(mock).method() を使います。BDDスタイルでは given(...).willReturn(...) も利用できます。",
    code: "@Mock\nUserRepository repository;\n\n@Test\nvoid findUser() {\n    when(repository.findById(1L)).thenReturn(Optional.of(user));\n    // テスト実行\n}",
    level: "mockito",
    chapter: "mockito",
  },
  {
    id: "mockito-q03",
    question: "Mockitoのverifyメソッドの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "メソッドの戻り値を検証する" },
      { label: "B", text: "モックのメソッドが特定の引数で呼び出されたことを検証する" },
      { label: "C", text: "テストの前提条件を設定する" },
      { label: "D", text: "例外がスローされたことを検証する" },
    ],
    correctLabel: "B",
    explanation:
      "verifyはモックオブジェクトのメソッドが期待通りに呼び出されたかを検証します。呼び出し回数（times）、呼び出されていないこと（never）、引数の検証も可能です。状態の検証（assert）ではなく振る舞いの検証に使います。",
    code: "service.deleteUser(1L);\n\nverify(repository, times(1)).deleteById(1L);\nverify(emailService, never()).sendEmail(any());",
    level: "mockito",
    chapter: "mockito",
  },
  {
    id: "mockito-q04",
    question: "MockitoのArgumentCaptorの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "テストメソッドの引数を取得する" },
      { label: "B", text: "モックメソッドに渡された引数をキャプチャして検証する" },
      { label: "C", text: "テスト結果をファイルに出力する" },
      { label: "D", text: "テストの実行順序を制御する" },
    ],
    correctLabel: "B",
    explanation:
      "ArgumentCaptorはモックメソッドに渡された引数をキャプチャし、後から詳細に検証できます。複雑なオブジェクトが引数として渡される場合に、そのオブジェクトのプロパティを個別に検証する際に有用です。",
    code: "@Captor\nArgumentCaptor<User> userCaptor;\n\nservice.register(\"田中\", \"tanaka@example.com\");\n\nverify(repository).save(userCaptor.capture());\nUser captured = userCaptor.getValue();\nassertEquals(\"田中\", captured.getName());",
    level: "mockito",
    chapter: "mockito",
  },
  // ════════════════════════════════════════
  // spring: Spring Boot Test (spring-test) 4問
  // ════════════════════════════════════════
  {
    id: "spring-test-q01",
    question: "@SpringBootTestと@WebMvcTestの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "両者は同じ範囲のBeanをロードする" },
      { label: "B", text: "@SpringBootTestは全コンテキストをロード、@WebMvcTestはWebレイヤーのみロードする" },
      { label: "C", text: "@WebMvcTestはデータベースアクセスも含む" },
      { label: "D", text: "@SpringBootTestはユニットテスト専用である" },
    ],
    correctLabel: "B",
    explanation:
      "@SpringBootTestはアプリケーション全体のSpringコンテキストをロードする統合テスト用です。@WebMvcTestはController層のみをロードし、Service/Repository等は@MockBeanでモック化します。テスト範囲を限定することで実行速度が向上します。",
    level: "spring",
    chapter: "spring-test",
  },
  {
    id: "spring-test-q02",
    question: "Spring Boot TestのMockMvcを使ったREST APIテストで正しい記述はどれですか？",
    choices: [
      { label: "A", text: "実際のHTTPサーバーを起動してリクエストを送信する" },
      { label: "B", text: "サーバーを起動せずにHTTPリクエスト・レスポンスをシミュレートする" },
      { label: "C", text: "ブラウザを使ってテストする" },
      { label: "D", text: "外部APIとの通信をテストする" },
    ],
    correctLabel: "B",
    explanation:
      "MockMvcはサーバーを起動せずにSpring MVCの動作をシミュレートします。HTTPリクエストの送信、レスポンスのステータスコード、ヘッダー、ボディの検証が可能です。軽量で高速なため、Controller層の単体テストに適しています。",
    code: "mockMvc.perform(get(\"/api/users/1\")\n    .contentType(MediaType.APPLICATION_JSON))\n    .andExpect(status().isOk())\n    .andExpect(jsonPath(\"\\$.name\").value(\"田中\"));",
    level: "spring",
    chapter: "spring-test",
  },
  {
    id: "spring-test-q03",
    question: "@DataJpaTestの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "全てのSpring Beanをロードする" },
      { label: "B", text: "JPA関連のコンポーネントのみロードし、デフォルトで組み込みDBを使用する" },
      { label: "C", text: "Controller層のテストに使用する" },
      { label: "D", text: "トランザクションが自動ロールバックされない" },
    ],
    correctLabel: "B",
    explanation:
      "@DataJpaTestはEntity、Repository、JPA設定のみロードする軽量なテストアノテーションです。デフォルトで組み込みデータベース（H2等）を使用し、各テストメソッド後にトランザクションが自動ロールバックされます。Repositoryの単体テストに最適です。",
    level: "spring",
    chapter: "spring-test",
  },
  {
    id: "spring-test-q04",
    question: "@MockBeanと@Mockの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "両者は完全に同じ機能である" },
      { label: "B", text: "@MockBeanはSpringコンテキストのBeanを置換し、@MockはMockitoのモックを作成する" },
      { label: "C", text: "@MockはSpringコンテキストのBeanを置換する" },
      { label: "D", text: "@MockBeanはJUnit 5では非推奨である" },
    ],
    correctLabel: "B",
    explanation:
      "@MockBeanはSpringのApplicationContext内のBeanをモックで置換するため、統合テストでDI対象をモック化する際に使います。@MockはMockito単体の機能でSpringコンテキストとは無関係です。Spring Boot 3.4以降では@MockitoBean が推奨です。",
    level: "spring",
    chapter: "spring-test",
  },
  // ════════════════════════════════════════
  // practice: テスト実践 (testing-practice) 3問
  // ════════════════════════════════════════
  {
    id: "testing-practice-q01",
    question: "テスト駆動開発（TDD）のサイクルとして正しい順番はどれですか？",
    choices: [
      { label: "A", text: "実装 → テスト → リファクタリング" },
      { label: "B", text: "テスト（Red）→ 実装（Green）→ リファクタリング（Refactor）" },
      { label: "C", text: "リファクタリング → テスト → 実装" },
      { label: "D", text: "設計 → 実装 → テスト" },
    ],
    correctLabel: "B",
    explanation:
      "TDDは「Red-Green-Refactor」のサイクルで進めます。まず失敗するテストを書き（Red）、テストを通す最小限のコードを実装し（Green）、コードを改善します（Refactor）。このサイクルにより設計品質と信頼性が向上します。",
    level: "practice",
    chapter: "testing-practice",
  },
  {
    id: "testing-practice-q02",
    question: "テストカバレッジ100%を目指すことの問題点として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "カバレッジ100%は技術的に不可能である" },
      { label: "B", text: "コストが高く、意味のないテストが増え、重要なテストケースの見落としにつながりうる" },
      { label: "C", text: "カバレッジが高いとテストの実行速度が遅くなる" },
      { label: "D", text: "カバレッジ100%はバグがないことを保証するため常に目指すべき" },
    ],
    correctLabel: "B",
    explanation:
      "カバレッジ100%を目指すと、getter/setterなど自明なコードのテストに時間を費やし、エッジケースや統合テストなど重要なテストが疎かになりがちです。カバレッジは指標の一つですが、テストの質と重要なビジネスロジックの網羅を優先すべきです。",
    level: "practice",
    chapter: "testing-practice",
  },
  {
    id: "testing-practice-q03",
    question: "テストピラミッドにおいて、最も多く書くべきテストの種類はどれですか？",
    choices: [
      { label: "A", text: "E2E（エンドツーエンド）テスト" },
      { label: "B", text: "統合テスト" },
      { label: "C", text: "ユニットテスト" },
      { label: "D", text: "手動テスト" },
    ],
    correctLabel: "C",
    explanation:
      "テストピラミッドでは、底辺にユニットテスト（最多）、中間に統合テスト、頂点にE2Eテスト（最少）を配置します。ユニットテストは実行速度が速くフィードバックが早いため、最も多く書くべきです。E2Eテストは遅くメンテナンスコストが高いため最小限にします。",
    level: "practice",
    chapter: "testing-practice",
  },
];

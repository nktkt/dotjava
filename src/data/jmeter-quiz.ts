export type JmeterLevel = "basics" | "components" | "testing" | "advanced";

export interface JmeterQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: JmeterLevel;
  chapter: string;
}

export const jmeterQuizQuestions: JmeterQuizQuestion[] = [
  {
    id: "basics-q01",
    question: "Apache JMeterは主にどのような目的で使用されるツールですか？",
    choices: [
      { label: "A", text: "Webアプリケーションのデザインツール" },
      { label: "B", text: "負荷テスト・パフォーマンス測定ツール" },
      { label: "C", text: "データベース管理ツール" },
      { label: "D", text: "ソースコード静的解析ツール" },
    ],
    correctLabel: "B",
    explanation:
      "Apache JMeterはJava製のオープンソース負荷テストツールで、Webアプリケーション、REST API、データベースなど様々なプロトコルの性能テストを実施するために使用されます。",
    level: "basics",
    chapter: "jmeter-intro",
  },
  {
    id: "basics-q02",
    question: "JMeterをCLIモード（ノンGUIモード）で実行するコマンドとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "jmeter --run test.jmx" },
      { label: "B", text: "jmeter -n -t test.jmx -l result.jtl" },
      { label: "C", text: "jmeter -gui false -f test.jmx" },
      { label: "D", text: "jmeter start test.jmx --no-gui" },
    ],
    correctLabel: "B",
    explanation:
      "JMeterのCLIモードは -n オプションで起動します。-t でテストプランファイル、-l で結果出力ファイルを指定します。本番の負荷テストではGUIモードよりCLIモードが推奨されます。",
    code: "jmeter -n -t test.jmx -l result.jtl -e -o report/",
    level: "basics",
    chapter: "jmeter-intro",
  },
  {
    id: "basics-q03",
    question: "JMeterのスレッドグループで「Ramp-Up期間」を30秒、スレッド数を30に設定した場合、どのようにスレッドが起動しますか？",
    choices: [
      { label: "A", text: "30秒後に全30スレッドが同時に起動する" },
      { label: "B", text: "1秒ごとに1スレッドずつ起動し、30秒で全スレッドが起動する" },
      { label: "C", text: "30秒間ランダムなタイミングでスレッドが起動する" },
      { label: "D", text: "最初の1秒で全スレッドが起動し、30秒間実行する" },
    ],
    correctLabel: "B",
    explanation:
      "Ramp-Up期間は全スレッドが起動するまでの時間です。30スレッド/30秒の場合、1秒に1スレッドずつ段階的に起動します。これにより急激な負荷集中を避け、現実的な負荷パターンをシミュレートできます。",
    level: "basics",
    chapter: "thread-group",
  },
  {
    id: "basics-q04",
    question: "JMeterの実行に必要な前提条件はどれですか？",
    choices: [
      { label: "A", text: "Python 3.x以上がインストールされていること" },
      { label: "B", text: "Java 8以上（JRE/JDK）がインストールされていること" },
      { label: "C", text: "Node.js 16以上がインストールされていること" },
      { label: "D", text: "特別な前提条件はない" },
    ],
    correctLabel: "B",
    explanation:
      "Apache JMeterはJavaで開発されているため、実行にはJava 8以上のJREまたはJDKが必要です。JAVA_HOME環境変数の設定も推奨されます。",
    level: "basics",
    chapter: "jmeter-intro",
  },
  {
    id: "basics-q05",
    question: "スレッドグループの「ループ回数」を5に設定した場合の動作として正しいものはどれですか？",
    choices: [
      { label: "A", text: "5つのスレッドグループが作成される" },
      { label: "B", text: "各スレッドがテスト計画を5回繰り返し実行する" },
      { label: "C", text: "5秒間テストが実行される" },
      { label: "D", text: "5つのHTTPリクエストが送信される" },
    ],
    correctLabel: "B",
    explanation:
      "ループ回数は各スレッドがスレッドグループ内のサンプラーを何回繰り返すかを指定します。例えばスレッド数10×ループ回数5の場合、合計50回のリクエストが実行されます。",
    level: "basics",
    chapter: "thread-group",
  },
  {
    id: "components-q01",
    question: "JMeterでHTTPリクエストにカスタムヘッダー（Content-Typeなど）を追加するために使用するコンポーネントはどれですか？",
    choices: [
      { label: "A", text: "HTTP Cookie マネージャ" },
      { label: "B", text: "HTTP ヘッダマネージャ" },
      { label: "C", text: "HTTP リクエストデフォルト" },
      { label: "D", text: "HTTP 認証マネージャ" },
    ],
    correctLabel: "B",
    explanation:
      "HTTPヘッダマネージャは、リクエストにカスタムHTTPヘッダーを追加するためのコンポーネントです。Content-Type、Authorization、Accept などのヘッダーを設定できます。",
    level: "components",
    chapter: "http-sampler",
  },
  {
    id: "components-q02",
    question: "JMeterで個々のリクエストの詳細（リクエスト/レスポンスデータ）を確認できるリスナーはどれですか？",
    choices: [
      { label: "A", text: "集約レポート（Summary Report）" },
      { label: "B", text: "結果をツリーで表示（View Results Tree）" },
      { label: "C", text: "グラフ表示（Graph Results）" },
      { label: "D", text: "統計レポート（Aggregate Report）" },
    ],
    correctLabel: "B",
    explanation:
      "View Results Tree（結果をツリーで表示）は各リクエスト/レスポンスの詳細データを個別に確認できるリスナーです。デバッグ時に有用ですが、負荷テスト本番ではメモリ消費が大きいため無効化が推奨されます。",
    level: "components",
    chapter: "listeners",
  },
  {
    id: "components-q03",
    question: "JMeterのJSONアサーションで、レスポンスボディの特定のJSONフィールド値を検証するために使用する式はどれですか？",
    choices: [
      { label: "A", text: "XPath式" },
      { label: "B", text: "JSONPath式" },
      { label: "C", text: "CSS セレクタ" },
      { label: "D", text: "正規表現" },
    ],
    correctLabel: "B",
    explanation:
      "JMeterのJSONアサーションではJSONPath式（例: $.data.name）を使用してJSONレスポンスの特定フィールド値を検証します。JSONPathはJSONデータのXPathに相当する記法です。",
    level: "components",
    chapter: "assertions",
  },
  {
    id: "components-q04",
    question: "JMeterのTransaction Controllerの主な目的はどれですか？",
    choices: [
      { label: "A", text: "データベーストランザクションを管理する" },
      { label: "B", text: "複数のサンプラーをグループ化し、全体のレスポンスタイムを計測する" },
      { label: "C", text: "条件分岐を実現する" },
      { label: "D", text: "ループ処理を制御する" },
    ],
    correctLabel: "B",
    explanation:
      "Transaction Controllerは複数のサンプラーを1つのトランザクションとしてグループ化し、合計のレスポンスタイムを計測します。例えば「ログイン→商品検索→購入」を1つのユーザーフローとして計測できます。",
    level: "components",
    chapter: "logic-controllers",
  },
  {
    id: "components-q05",
    question: "JMeterでリクエスト間に一定の待機時間を入れるために使用するコンポーネントはどれですか？",
    choices: [
      { label: "A", text: "Constant Timer" },
      { label: "B", text: "Loop Controller" },
      { label: "C", text: "View Results Tree" },
      { label: "D", text: "HTTP Request Defaults" },
    ],
    correctLabel: "A",
    explanation:
      "Constant Timer（固定タイマー）はリクエスト間に一定のミリ秒数の待機時間を追加します。実際のユーザーの思考時間をシミュレートし、より現実的な負荷パターンを再現するために使用します。",
    level: "components",
    chapter: "timers-processors",
  },
  {
    id: "testing-q01",
    question: "負荷テストにおいて「スパイクテスト」とはどのようなテストですか？",
    choices: [
      { label: "A", text: "長時間一定の負荷をかけ続けるテスト" },
      { label: "B", text: "段階的に負荷を増加させるテスト" },
      { label: "C", text: "短時間に急激な負荷をかけてシステムの耐性を確認するテスト" },
      { label: "D", text: "最小限の負荷で機能確認を行うテスト" },
    ],
    correctLabel: "C",
    explanation:
      "スパイクテストは突然の負荷急増に対するシステムの耐性を確認するテストです。セールイベントや突発的なアクセス集中をシミュレートし、システムがクラッシュせず適切に対応できるかを検証します。",
    level: "testing",
    chapter: "load-testing",
  },
  {
    id: "testing-q02",
    question: "JMeterでCSVファイルからテストデータを読み込むために使用するコンポーネントはどれですか？",
    choices: [
      { label: "A", text: "CSV Output Writer" },
      { label: "B", text: "CSV Data Set Config" },
      { label: "C", text: "File Upload Sampler" },
      { label: "D", text: "CSV Reader Listener" },
    ],
    correctLabel: "B",
    explanation:
      "CSV Data Set Configは外部CSVファイルからテストデータを読み込み、変数として使用できるようにするコンポーネントです。ユーザー名/パスワードや検索キーワードなど、テストデータのパラメータ化に広く使用されます。",
    level: "testing",
    chapter: "api-testing",
  },
  {
    id: "testing-q03",
    question: "REST APIのテストで、レスポンスから特定のJSON値を抽出して後続リクエストで使用するために使うコンポーネントはどれですか？",
    choices: [
      { label: "A", text: "Regular Expression Extractor" },
      { label: "B", text: "JSON Extractor" },
      { label: "C", text: "HTTP Header Manager" },
      { label: "D", text: "BeanShell Sampler" },
    ],
    correctLabel: "B",
    explanation:
      "JSON ExtractorはJSONPath式を使用してレスポンスから特定の値を抽出し、JMeter変数に格納します。例えばログインAPIからトークンを取得し、後続リクエストのAuthorizationヘッダーで使用できます。",
    level: "testing",
    chapter: "api-testing",
  },
  {
    id: "advanced-q01",
    question: "JMeterの分散テストで、テストを実行する各リモートマシンで起動するプロセスはどれですか？",
    choices: [
      { label: "A", text: "jmeter-master" },
      { label: "B", text: "jmeter-server" },
      { label: "C", text: "jmeter-agent" },
      { label: "D", text: "jmeter-worker" },
    ],
    correctLabel: "B",
    explanation:
      "分散テストでは各スレーブマシンで jmeter-server を起動します。マスターマシンの jmeter.properties で remote_hosts にスレーブのIPアドレスを設定し、マスターから一括制御してテストを実行します。",
    level: "advanced",
    chapter: "distributed-testing",
  },
  {
    id: "advanced-q02",
    question: "JMeterでHTMLダッシュボードレポートを生成するためのコマンドラインオプションはどれですか？",
    choices: [
      { label: "A", text: "-r -o report/" },
      { label: "B", text: "-e -o report/" },
      { label: "C", text: "--html-report report/" },
      { label: "D", text: "-g report/ --dashboard" },
    ],
    correctLabel: "B",
    explanation:
      "JMeterの -e オプションはテスト終了後にレポートを生成し、-o オプションで出力ディレクトリを指定します。生成されるHTMLレポートにはスループット、レスポンスタイム、エラー率などのグラフが含まれます。",
    code: "jmeter -n -t test.jmx -l result.jtl -e -o report/",
    level: "advanced",
    chapter: "distributed-testing",
  },
];
